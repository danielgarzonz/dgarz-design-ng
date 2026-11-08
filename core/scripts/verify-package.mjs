import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';
import { spawnSync } from 'node:child_process';
import { cp, mkdir, mkdtemp, readFile, readdir, rm, stat, symlink, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const core = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const temporary = await mkdtemp(join(tmpdir(), 'dgarz-package-'));
const snapshot = join(temporary, 'source');
const consumer = join(temporary, 'consumer');
let successful = false;

function run(command, args, cwd, capture = false) {
  const result = spawnSync(command, args, {
    cwd, encoding: 'utf8',
    env: { ...process.env, NODE_ENV: 'production', npm_config_update_notifier: 'false' },
    stdio: capture ? 'pipe' : 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed (${result.status})\n${result.stdout ?? ''}\n${result.stderr ?? ''}`);
  }
  return result.stdout;
}

async function fingerprints(directory, prefix = '') {
  const files = {};
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const name = `${prefix}${entry.name}`;
    if (entry.isDirectory()) Object.assign(files, await fingerprints(join(directory, entry.name), `${name}/`));
    else files[name] = createHash('sha256').update(await readFile(join(directory, entry.name))).digest('hex');
  }
  return files;
}

function exportPaths(value) {
  return typeof value === 'string' ? [value] : Object.values(value).flatMap(exportPaths);
}

try {
  console.log(`[package] Isolated workspace: ${temporary}`);
  await cp(core, snapshot, {
    recursive: true,
    filter: path => !['node_modules', 'dist', '.stencil', 'storybook-static'].includes(relative(core, path).split(sep)[0]),
  });
  // Build tools are shared; the source, output and installed consumer are isolated.
  await symlink(resolve(core, '../node_modules'), join(temporary, 'node_modules'), 'dir');
  try {
    await stat(join(core, 'node_modules'));
    await symlink(join(core, 'node_modules'), join(snapshot, 'node_modules'), 'dir');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  run('npm', ['run', 'build'], snapshot);
  const first = await fingerprints(join(snapshot, 'dist'));
  const firstWrappers = await fingerprints(join(temporary, 'packages'));
  run('npm', ['run', 'build'], snapshot);
  assert.deepEqual(await fingerprints(join(snapshot, 'dist')), first, 'Two clean production builds must match');
  assert.deepEqual(await fingerprints(join(temporary, 'packages')), firstWrappers, 'Generated wrapper sources must be reproducible');
  console.log('[package] Production builds are reproducible');

  const packed = JSON.parse(run('npm', ['pack', '--json', '--ignore-scripts', '--cache', join(temporary, 'cache')], snapshot, true))[0];
  assert(packed.files.some(file => file.path === 'dist/components/index.js'), 'Missing compiled components');
  assert(!packed.files.some(file => file.path.startsWith('src/') || file.path.endsWith('.tsx')), 'Source leaked into package');
  await mkdir(consumer);
  await writeFile(join(consumer, 'package.json'), JSON.stringify({ name: 'dgarz-package-consumer', private: true, type: 'module' }));
  run('npm', ['install', join(snapshot, packed.filename), '--offline', '--ignore-scripts', '--no-audit', '--no-fund', '--cache', join(temporary, 'cache')], consumer);
  const installed = join(consumer, 'node_modules/dgarz-design');
  assert(!(await stat(installed)).isFile());
  const manifest = JSON.parse(await readFile(join(installed, 'package.json'), 'utf8'));
  assert(!manifest.dependencies?.lit, 'Lit must not be a runtime dependency');
  for (const target of exportPaths(manifest.exports).filter(target => !target.includes('*'))) {
    assert(target.startsWith('./dist/'), `Unexpected export: ${target}`);
    assert((await stat(resolve(installed, target))).isFile(), `Missing export: ${target}`);
  }
  for (const name of await readdir(join(installed, 'dist/components'))) {
    if (!name.endsWith('.js')) continue;
    const source = await readFile(join(installed, 'dist/components', name), 'utf8');
    assert(!/\b(?:isDev|hotModuleReplacement)\s*:\s*true/.test(source), `Development runtime in ${name}`);
    assert(!/\bfrom\s*['"](?:lit(?:\/|['"])|@stencil\/core)/.test(source), `External runtime in ${name}`);
  }
  run(process.execPath, ['--input-type=module', '-e', `
    import assert from 'node:assert/strict';
    const core = await import('dgarz-design');
    assert.equal(typeof core.defineCustomElements, 'function');
    for (const path of ${JSON.stringify(Object.keys(manifest.exports).filter(path => !path.includes('*')))}) {
      import.meta.resolve(path === '.' ? 'dgarz-design' : 'dgarz-design' + path.slice(1));
    }
    core.defineCustomElements();
  `], consumer);
  await writeFile(join(consumer, 'check.mts'), `
    import type { Components } from 'dgarz-design';
    const button: HTMLDgarzButtonElement = document.createElement('dgarz-button');
    const variant: Components.DgarzButton['variant'] = 'secondary';
    button.variant = variant;
    button.addEventListener('dgarz-click', event => { const detail: void = event.detail; });
    // @ts-expect-error Unsupported variants must be rejected.
    button.variant = 'unsupported';
    // @ts-expect-error Boolean properties must remain typed.
    button.disabled = 'false';
  `);
  run(process.execPath, [require.resolve('typescript/bin/tsc'), 'check.mts', '--noEmit', '--strict', '--module', 'NodeNext', '--moduleResolution', 'NodeNext', '--target', 'ES2022', '--lib', 'ES2022,DOM', '--types', 'dgarz-design'], consumer);
  console.log('[package] Installed exports, Node import and consumer types OK');

  await writeFile(join(consumer, 'index.html'), `<!doctype html><html lang="es"><head>
    <link rel="stylesheet" href="/node_modules/dgarz-design/${manifest.exports['./tokens'].slice(2)}">
    <style>button { background: red !important; }</style>
    <script type="importmap">${JSON.stringify({ imports: {
      'dgarz-design': '/node_modules/dgarz-design/' + manifest.exports['.'].import.slice(2),
      'dgarz-design/legacy': '/node_modules/dgarz-design/' + manifest.exports['./legacy'].import.slice(2),
    } })}</script></head><body>
    <dgarz-button>Guardar</dgarz-button>
    <script type="module">
      import 'dgarz-design';
      import legacy from 'dgarz-design/legacy';
      if (typeof legacy.toast !== 'function') throw new Error('Missing legacy API');
      window.activations = 0;
      document.body.addEventListener('dgarz-click', () => window.activations++);
      window.packageReady = true;
    </script></body></html>`);
  const mime = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css' };
  const server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      const file = resolve(consumer, '.' + (pathname === '/' ? '/index.html' : pathname));
      if (!file.startsWith(consumer + sep)) { response.writeHead(403).end(); return; }
      response.setHeader('Content-Type', mime[extname(file)] ?? 'application/octet-stream');
      response.end(await readFile(file));
    } catch { response.writeHead(404).end(); }
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`http://127.0.0.1:${server.address().port}`);
    await page.waitForFunction(() => window.packageReady);
    const button = page.getByRole('button', { name: 'Guardar' });
    await button.click();
    await page.waitForFunction(() => window.activations === 1);
    await button.focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => window.activations === 2);
    await page.locator('dgarz-button').evaluate(element => { element.loading = true; });
    await page.waitForFunction(() => document.querySelector('dgarz-button').shadowRoot.querySelector('button').disabled);
    assert.equal(await button.getAttribute('aria-busy'), 'true');
    await button.evaluate(element => element.click());
    assert.equal(await page.evaluate(() => window.activations), 2);
    await page.locator('dgarz-button').evaluate(element => { element.loading = false; });
    await page.waitForFunction(() => !document.querySelector('dgarz-button').shadowRoot.querySelector('button').disabled);
    await page.evaluate(() => document.documentElement.style.setProperty('--dgarz-color-primary', 'rgb(12, 34, 56)'));
    // The button eases its background (transition .2s): wait for the final color.
    await page.waitForFunction(() => {
      const inner = document.querySelector('dgarz-button').shadowRoot.querySelector('button');
      return getComputedStyle(inner).backgroundColor === 'rgb(12, 34, 56)';
    }, null, { timeout: 2000 }).catch(() => {});
    assert.equal(await button.evaluate(element => getComputedStyle(element).backgroundColor), 'rgb(12, 34, 56)', 'Tokens must cross Shadow DOM; external button selectors must not');
    assert.deepEqual(errors, [], 'Browser errors');
    console.log(`[package] Chromium ${browser.version()}: label, keyboard, events, loading, tokens, Shadow DOM and legacy OK`);
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
  successful = true;
  console.log('[package] PASS — package verified without publishing');
} finally {
  if (successful && !process.env.DGARZ_KEEP_PACKAGE_CHECK) await rm(temporary, { recursive: true, force: true });
  else console.log(`[package] Evidence retained at: ${temporary}`);
}
