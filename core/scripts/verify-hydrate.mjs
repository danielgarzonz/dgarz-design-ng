/**
 * Phase 5 step 1: server-render dgarz-button with Declarative Shadow DOM,
 * then hydrate in Chromium without duplicating content or listeners.
 */
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { dirname, extname, join, resolve } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { readFile, stat } from 'node:fs/promises';
import { chromium } from 'playwright';

const core = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(core, 'dist');
const mime = {
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
};

const { renderToString } = await import(pathToFileURL(join(dist, 'hydrate/index.mjs')).href);

const markup = `
  <dgarz-button id="primary">Continuar</dgarz-button>
  <dgarz-button id="secondary" variant="secondary">Cancelar</dgarz-button>
  <dgarz-button id="loading" loading>Guardando</dgarz-button>
  <dgarz-button id="disabled" disabled>No disponible</dgarz-button>
  <dgarz-input id="email" label="Correo" type="email" placeholder="nombre@empresa.com"></dgarz-input>
`;

const { html, diagnostics, hydratedCount } = await renderToString(markup, {
  fullDocument: false,
  prettyHtml: false,
  serializeShadowRoot: 'declarative-shadow-dom',
});

const errors = (diagnostics ?? []).filter((item) => item.level === 'error');
assert.equal(errors.length, 0, `Hydrate diagnostics failed: ${JSON.stringify(errors, null, 2)}`);
assert.ok(hydratedCount >= 5, `Expected at least 5 hydrated components, got ${hydratedCount}`);
assert.match(html, /<template[^>]*shadowrootmode=["']open["']/i, 'Missing Declarative Shadow DOM template');
assert.match(html, /Continuar/, 'Primary label missing from SSR output');
assert.match(html, /Correo/, 'Input label missing from SSR output');
assert.doesNotMatch(html, /Continuar[\s\S]*Continuar/, 'Primary label appears duplicated in SSR HTML');
console.log(`[hydrate] SSR DSD approved (${hydratedCount} components)`);

const pageHtml = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>dgarz hydrate check</title>
  <link rel="stylesheet" href="/tokens.css" />
</head>
<body>
  <main id="app">${html}</main>
  <script type="module">
    import { defineCustomElements } from '/index.mjs';
    defineCustomElements();
    const primary = document.getElementById('primary');
    window.__dgarz = { clicks: 0, ready: false };
    primary?.addEventListener('dgarz-click', () => { window.__dgarz.clicks += 1; });
    await customElements.whenDefined('dgarz-button');
    window.__dgarz.ready = true;
  </script>
</body>
</html>`;

const server = createServer(async (req, res) => {
  try {
    const url = decodeURIComponent(req.url.split('?')[0]);
    if (url === '/' || url === '/index.html') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(pageHtml);
      return;
    }
    const file = join(dist, url === '/index.mjs' ? 'index.mjs' : url.slice(1));
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

await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle' });
await page.waitForFunction(() => window.__dgarz?.ready === true);

const before = await page.evaluate(() => {
  const primary = document.getElementById('primary');
  const slotText = [...primary.childNodes]
    .filter((node) => node.nodeType === Node.TEXT_NODE || node.nodeName === '#text' || !(node instanceof HTMLTemplateElement))
    .map((node) => node.textContent ?? '')
    .join('')
    .trim() || primary.textContent.trim();
  const lightText = [...primary.childNodes]
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.textContent ?? '')
    .join('')
    .trim();
  const buttons = [...primary.shadowRoot?.querySelectorAll('button') ?? []];
  const templates = [...primary.querySelectorAll(':scope > template')];
  return {
    hasShadow: !!primary.shadowRoot,
    lightText,
    slotText,
    nativeButtons: buttons.length,
    templateCount: templates.length,
    labelCount: (document.getElementById('app').innerText.match(/Continuar/g) || []).length,
    loadingBusy: document.getElementById('loading')?.shadowRoot?.querySelector('button')?.getAttribute('aria-busy'),
    clicks: window.__dgarz.clicks,
  };
});

assert.equal(before.hasShadow, true, 'Client shadow root missing after hydrate');
assert.equal(before.nativeButtons, 1, 'Native button duplicated inside shadow root');
assert.equal(before.labelCount, 1, 'Visible Continuar label duplicated after hydrate');
assert.equal(before.loadingBusy, 'true');

await page.locator('#primary').click();
const afterClick = await page.evaluate(() => window.__dgarz.clicks);
assert.equal(afterClick, 1, 'dgarz-click did not fire once after hydrate');

await page.locator('#disabled').click({ force: true });
await page.locator('#loading').click({ force: true });
const ignored = await page.evaluate(() => window.__dgarz.clicks);
assert.equal(ignored, 1, 'disabled/loading buttons should not emit extra clicks');
const minimumWidth = await page.evaluate(() => {
  const primary = document.getElementById('primary');
  primary.textContent = 'OK';
  const button = primary.shadowRoot.querySelector('button');
  const initial = button.getBoundingClientRect().width;
  primary.style.setProperty('--dgarz-button-min-width', '8rem');
  return { initial, customized: button.getBoundingClientRect().width };
});
assert(minimumWidth.initial >= 96, 'Stencil button must reserve its default minimum');
assert(minimumWidth.customized >= 128, 'Stencil minimum-width token must cross Shadow DOM');

assert.equal(pageErrors.length, 0, `Page errors: ${pageErrors.join('\n')}`);
console.log('[hydrate] Chromium hydration approved (no duplication, events intact)');

await browser.close();
server.close();
process.exit(0);
