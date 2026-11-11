/**
 * After `astro build`, confirm the Core SSR page ships DSD markup and hydrates
 * in Chromium without duplicating the pilot label or listeners.
 */
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const docs = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(docs, 'dist');
const pagePath = join(dist, 'getting-started/core/index.html');
const html = await readFile(pagePath, 'utf8');

assert.match(html, /shadowrootmode=["']open["']/i, 'Built page missing Declarative Shadow DOM');
assert.match(html, /<dgarz-button[^>]*>[\s\S]*Continuar/i, 'Built page missing dgarz-button Continuar');
assert.match(html, /<dgarz-input[\s\S]*Correo/i, 'Built page missing dgarz-input Correo');
assert.match(html, /data-core-entry=["']\/dist\/index\.mjs["']/, 'Built page missing client core entry');
assert.match(html, /\/dist\/tokens\.css/, 'Built page missing tokens stylesheet');
console.log('[astro-hydrate] Static DSD markup approved');

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
};

const server = createServer(async (req, res) => {
  try {
    let url = decodeURIComponent(req.url.split('?')[0]);
    if (url.endsWith('/')) url += 'index.html';
    const file = join(dist, url);
    if (!file.startsWith(dist) || !(await stat(file)).isFile()) {
      res.writeHead(404); res.end('missing'); return;
    }
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream' });
    res.end(await readFile(file));
  } catch (error) {
    res.writeHead(500); res.end(String(error));
  }
});

await new Promise((resolveListen) => server.listen(0, '127.0.0.1', resolveListen));
const { port } = server.address();
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const pageErrors = [];
page.on('pageerror', (error) => pageErrors.push(String(error)));

await page.goto(`http://127.0.0.1:${port}/getting-started/core/`, { waitUntil: 'networkidle' });
await page.waitForFunction(() => document.querySelector('#astro-core')?.dataset.ready === 'true');

const before = await page.evaluate(() => {
  const root = document.querySelector('#astro-core');
  const primary = document.getElementById('astro-core-primary');
  return {
    hasShadow: !!primary?.shadowRoot,
    buttons: primary?.shadowRoot?.querySelectorAll('button').length ?? 0,
    labels: (root?.innerText.match(/Continuar/g) || []).length,
    ready: root?.dataset.ready,
  };
});

assert.equal(before.hasShadow, true);
assert.equal(before.buttons, 1);
assert.equal(before.labels, 1);

await page.locator('#astro-core-primary').click();
await page.waitForFunction(() => document.querySelector('#astro-core')?.dataset.clicks === '1');
await page.locator('#astro-core-disabled').click({ force: true });
await page.locator('#astro-core-loading').click({ force: true });
const clicks = await page.evaluate(() => document.querySelector('#astro-core')?.dataset.clicks);
assert.equal(clicks, '1');
assert.equal(pageErrors.length, 0, `Page errors:\n${pageErrors.join('\n')}`);
console.log('[astro-hydrate] Chromium hydration approved');

await browser.close();
server.close();
