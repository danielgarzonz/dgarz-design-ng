import assert from 'node:assert/strict';
import { cp, mkdtemp, mkdir, readFile, rm, writeFile, realpath } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { build, preview } from 'vite';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const temporary = await realpath(await mkdtemp(join(tmpdir(), 'dgarz-wrappers-')));
let successful = false;
function run(command, args, cwd, capture = false) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', stdio: capture ? 'pipe' : 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} failed (${result.status})\n${result.stdout ?? ''}\n${result.stderr ?? ''}`);
  return result.stdout;
}
try {
  console.log(`[wrappers] Consumer: ${temporary}`);
  const tarballs = [];
  for (const path of ['core', 'packages/react', 'packages/vue', 'packages/angular']) {
    const packed = JSON.parse(run('npm', ['pack', '--json', '--ignore-scripts', '--pack-destination', temporary], join(root, path), true))[0];
    tarballs.push(join(temporary, packed.filename));
  }
  await writeFile(join(temporary, 'package.json'), JSON.stringify({ name: 'dgarz-wrapper-consumer', private: true, type: 'module' }));
  const dependencies = ['react', 'react-dom', '@types/react', '@types/react-dom', 'vue', '@angular/core', '@angular/common', '@angular/compiler', '@angular/platform-browser', 'rxjs'];
  const exact = await Promise.all(dependencies.map(async name => {
    const manifest = JSON.parse(await readFile(require.resolve(`${name}/package.json`), 'utf8'));
    return `${name}@${manifest.version}`;
  }));
  run('npm', ['install', ...tarballs, ...exact, process.env.DGARZ_OFFLINE ? '--offline' : '--prefer-offline', '--fetch-retries=0', '--fetch-timeout=20000', '--ignore-scripts', '--no-audit', '--no-fund'], temporary);
  await cp(join(root, 'tests/consumers'), join(temporary, 'src'), { recursive: true });
  const compilerOptions = { target: 'ES2022', module: 'ESNext', moduleResolution: 'Bundler', strict: true, jsx: 'react-jsx', experimentalDecorators: true, useDefineForClassFields: false, skipLibCheck: false, types: ['react', 'react-dom'], lib: ['ES2022', 'DOM'] };
  await writeFile(join(temporary, 'tsconfig.json'), JSON.stringify({ compilerOptions, include: ['src/**/*.ts', 'src/**/*.tsx'] }));
  run(process.execPath, [require.resolve('typescript/bin/tsc'), '-p', 'tsconfig.json', '--noEmit'], temporary);
  await writeFile(join(temporary, 'tsconfig.angular.json'), JSON.stringify({ compilerOptions: { ...compilerOptions, outDir: 'compiled', rootDir: 'src' }, angularCompilerOptions: { strictTemplates: true }, files: ['src/angular.ts'] }));
  run(process.execPath, [require.resolve('@angular/compiler-cli/package.json').replace(/package\.json$/, 'bundles/src/bin/ngc.js'), '-p', 'tsconfig.angular.json'], temporary);
  console.log('[wrappers] Consumer TypeScript and Angular strict templates OK');
  for (const framework of ['react', 'vue', 'angular']) {
    const source = framework === 'angular' ? 'compiled/angular.js' : `src/${framework}.${framework === 'react' ? 'tsx' : 'ts'}`;
    await writeFile(join(temporary, `${framework}.html`), `<!doctype html><html lang="es"><head><title>${framework}</title></head><body><div id="app"></div><app-root></app-root><script type="module" src="/${source}"></script></body></html>`);
  }
  await build({ configFile: false, root: temporary, build: { outDir: 'web', rollupOptions: { input: Object.fromEntries(['react', 'vue', 'angular'].map(framework => [framework, join(temporary, `${framework}.html`)])) } } });
  const server = await preview({ configFile: false, root: temporary, build: { outDir: 'web' }, preview: { host: '127.0.0.1', port: 0, open: false } });
  let browser;
  try {
    browser = await chromium.launch();
    for (const framework of ['react', 'vue', 'angular']) {
      const page = await browser.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/${framework}.html`);
      const button = page.getByRole('button', { name: 'Guardar', exact: true });
      await button.click();
      await page.waitForFunction(() => document.querySelector('#count')?.textContent.trim() === '1');
      assert.equal(await page.locator('dgarz-button').getAttribute('variant'), 'secondary');
      await page.getByRole('button', { name: 'Alternar deshabilitado', exact: true }).click();
      await page.waitForFunction(() => document.querySelector('dgarz-button').shadowRoot.querySelector('button').disabled);
      await button.evaluate(element => element.click());
      assert.equal((await page.locator('#count').textContent()).trim(), '1');
      await page.getByRole('button', { name: 'Alternar deshabilitado', exact: true }).click();
      await page.waitForFunction(() => !document.querySelector('dgarz-button').shadowRoot.querySelector('button').disabled);
      await page.getByRole('button', { name: 'Alternar carga', exact: true }).click();
      await page.waitForFunction(() => document.querySelector('dgarz-button').shadowRoot.querySelector('button').disabled);
      assert.equal(await button.getAttribute('aria-busy'), 'true');
      await button.evaluate(element => element.click());
      assert.equal((await page.locator('#count').textContent()).trim(), '1');
      await page.getByRole('button', { name: 'Alternar carga', exact: true }).click();
      await page.waitForFunction(() => !document.querySelector('dgarz-button').shadowRoot.querySelector('button').disabled);
      await button.focus();
      await page.keyboard.press('Enter');
      await page.waitForFunction(() => document.querySelector('#count')?.textContent.trim() === '2');
      assert.deepEqual(errors, [], `${framework}: browser errors`);
      await page.close();
      console.log(`[wrappers] ${framework}: installed package, props, booleans, events and keyboard OK`);
    }
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.httpServer.close(resolve));
  }
  successful = true;
  console.log('[wrappers] PASS — all generated adapters verified without publishing');
} finally {
  if (successful && !process.env.DGARZ_KEEP_PACKAGE_CHECK) await rm(temporary, { recursive: true, force: true });
  else console.log(`[wrappers] Evidence retained: ${temporary}`);
}
