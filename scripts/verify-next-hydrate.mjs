/**
 * Phase 5: Next.js App Router consumer with dgarz-design/hydrate DSD + client CE.
 * Does not use React adapter SSR; validates the Core hydrate path in Next.
 */
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm, realpath, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const temporary = await realpath(await mkdtemp(join(tmpdir(), 'dgarz-next-')));
let successful = false;
let child;

function run(command, args, cwd, capture = false) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    stdio: capture ? 'pipe' : 'inherit',
    env: { ...process.env, NODE_ENV: 'production', npm_config_update_notifier: 'false' },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed (${result.status})\n${result.stdout ?? ''}\n${result.stderr ?? ''}`);
  }
  return result.stdout;
}

try {
  console.log(`[next-hydrate] Consumer: ${temporary}`);
  const packed = JSON.parse(run('npm', ['pack', '--json', '--ignore-scripts', '--pack-destination', temporary], join(root, 'core'), true))[0];
  const tarball = join(temporary, packed.filename);

  await writeFile(join(temporary, 'package.json'), JSON.stringify({
    name: 'dgarz-next-consumer',
    private: true,
    type: 'module',
    scripts: {
      build: 'next build',
      start: 'next start -H 127.0.0.1 -p 3210',
    },
    dependencies: {
      next: '^15.5.0',
      react: '^19.0.0',
      'react-dom': '^19.0.0',
      'dgarz-design': `file:${tarball}`,
    },
  }, null, 2));

  await writeFile(join(temporary, 'next.config.mjs'), `/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['dgarz-design'],
  transpilePackages: [],
};
export default nextConfig;
`);

  await writeFile(join(temporary, 'jsconfig.json'), JSON.stringify({
    compilerOptions: { jsx: 'preserve', module: 'ESNext', moduleResolution: 'Bundler', target: 'ES2022' },
  }));

  await mkdir(join(temporary, 'app'), { recursive: true });
  await writeFile(join(temporary, 'app/layout.js'), `import 'dgarz-design/tokens';

export const metadata = { title: 'dgarz next hydrate' };

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
`);

  await writeFile(join(temporary, 'app/hydrate-client.js'), `'use client';

import { useEffect } from 'react';

export function HydrateClient({ rootId }) {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mod = await import('dgarz-design/core');
      mod.defineCustomElements();
      await customElements.whenDefined('dgarz-button');
      if (cancelled) return;
      const root = document.getElementById(rootId);
      const primary = document.getElementById('next-primary');
      let clicks = 0;
      primary?.addEventListener('dgarz-click', () => {
        clicks += 1;
        if (root) root.dataset.clicks = String(clicks);
      });
      if (root) root.dataset.ready = 'true';
    })().catch((error) => {
      const root = document.getElementById(rootId);
      if (root) root.dataset.ready = 'error';
      console.error(error);
    });
    return () => { cancelled = true; };
  }, [rootId]);
  return null;
}
`);

  await writeFile(join(temporary, 'app/page.js'), `import { renderToString } from 'dgarz-design/hydrate';
import { HydrateClient } from './hydrate-client.js';

export default async function Page() {
  const markup = \`
    <div id="next-core" data-ready="false">
      <dgarz-button id="next-primary">Continuar</dgarz-button>
      <dgarz-button id="next-disabled" disabled>No disponible</dgarz-button>
      <dgarz-button id="next-loading" loading>Guardando</dgarz-button>
    </div>
  \`;
  const { html, diagnostics, hydratedCount } = await renderToString(markup, {
    fullDocument: false,
    prettyHtml: false,
    serializeShadowRoot: 'declarative-shadow-dom',
  });
  const errors = (diagnostics ?? []).filter((item) => item.level === 'error');
  if (errors.length) throw new Error(JSON.stringify(errors));
  if ((hydratedCount ?? 0) < 3) throw new Error('Expected at least 3 hydrated components');

  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <HydrateClient rootId="next-core" />
    </main>
  );
}
`);

  const installArgs = [
    'install',
    process.env.DGARZ_OFFLINE ? '--offline' : '--prefer-offline',
    '--fetch-retries=2',
    '--no-audit',
    '--no-fund',
  ];
  run('npm', installArgs, temporary);
  run('npm', ['run', 'build'], temporary);

  const built = await readFile(join(temporary, '.next/server/app/page.js'), 'utf8').catch(() => '');
  // RSC payload / HTML may live elsewhere; also check prerendered HTML if present
  const htmlCandidates = [
    join(temporary, '.next/server/app/index.html'),
    join(temporary, '.next/server/app/page.html'),
  ];
  let staticHtml = built;
  for (const candidate of htmlCandidates) {
    try { staticHtml += await readFile(candidate, 'utf8'); } catch {}
  }

  child = spawn('npm', ['run', 'start'], {
    cwd: temporary,
    env: { ...process.env, PORT: '3210' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let boot = '';
  await new Promise((resolveBoot, rejectBoot) => {
    const timer = setTimeout(() => rejectBoot(new Error(`Next start timeout\n${boot}`)), 60000);
    const onData = (chunk) => {
      boot += chunk.toString();
      if (/Ready|started server|Local:/i.test(boot)) {
        clearTimeout(timer);
        resolveBoot();
      }
    };
    child.stdout.on('data', onData);
    child.stderr.on('data', onData);
    child.on('exit', (code) => {
      clearTimeout(timer);
      rejectBoot(new Error(`Next exited early (${code})\n${boot}`));
    });
  });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(String(error)));

  // Raw document before client JS: DSD must be present (browsers later upgrade
  // <template shadowrootmode> into a live shadow root, so page.content() loses it).
  const raw = await page.request.get('http://127.0.0.1:3210/').then((response) => response.text());
  assert.match(raw, /shadowrootmode=["']open["']|shadowrootmode=\\"open\\"/i, 'Next response missing Declarative Shadow DOM');
  assert.match(raw, /Continuar/, 'Next response missing Continuar label');

  await page.goto('http://127.0.0.1:3210/', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.getElementById('next-core')?.dataset.ready === 'true', null, { timeout: 15000 });
  const before = await page.evaluate(() => {
    const primary = document.getElementById('next-primary');
    return {
      hasShadow: !!primary?.shadowRoot,
      buttons: primary?.shadowRoot?.querySelectorAll('button').length ?? 0,
      labels: (document.body.innerText.match(/Continuar/g) || []).length,
    };
  });
  assert.equal(before.hasShadow, true);
  assert.equal(before.buttons, 1);
  assert.equal(before.labels, 1);

  await page.locator('#next-primary').click();
  await page.waitForFunction(() => document.getElementById('next-core')?.dataset.clicks === '1');
  await page.locator('#next-disabled').click({ force: true });
  await page.locator('#next-loading').click({ force: true });
  assert.equal(await page.evaluate(() => document.getElementById('next-core')?.dataset.clicks), '1');
  assert.equal(pageErrors.length, 0, `Page errors:\n${pageErrors.join('\n')}`);
  console.log('[next-hydrate] Next.js App Router DSD + hydration approved');

  await browser.close();
  successful = true;
} finally {
  if (child && !child.killed) {
    child.kill('SIGTERM');
  }
  if (!successful || process.env.DGARZ_KEEP_PACKAGE_CHECK === '1') {
    console.log(`[next-hydrate] Evidence kept at ${temporary}`);
  } else {
    await rm(temporary, { recursive: true, force: true });
  }
}

void require;
process.exit(successful ? 0 : 1);
