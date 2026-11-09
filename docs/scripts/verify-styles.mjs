// Style regression check: renders every docs page and every Studio hero
// twice — once with a reference build of the framework CSS, once with the
// current one — and compares the computed styles of every element.
//
//   node docs/scripts/verify-styles.mjs --base <dir> [--url http://localhost:4321] [--widths 390,1280] [--pages /a,/b] [--detail]
//   (--detail lists every changed element, not only the first one)
//
// <dir> holds the reference CSS files (dgarz.css, dgarz.full.css, …); a
// request for dgarz.full.min.css is answered with dgarz.full.min.css or, if
// missing, dgarz.full.css (computed styles are the same). In CI the reference
// is the base branch, built in a separate worktree.
//
// Exit code 1 when any element changes; the report lists each page with the
// first changed element and properties. Differences under 0.1px (font
// rounding) are ignored.
import { readFileSync, readdirSync, statSync, existsSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const args = Object.fromEntries(process.argv.slice(2).reduce((pairs, arg, index, all) => {
  if (arg.startsWith('--')) {
    const next = all[index + 1];
    pairs.push([arg.slice(2), next === undefined || next.startsWith('--') ? 'true' : next]);
  }
  return pairs;
}, []));
if (!args.base) { console.error('Missing --base <dir with reference CSS>'); process.exit(2); }
const base = args.base;
const url = (args.url || 'http://localhost:4321').replace(/\/$/, '');
const widths = (args.widths || '390,1280').split(',').map(Number);
const docs = fileURLToPath(new URL('..', import.meta.url));

function listPages() {
  if (args.pages) return args.pages.split(',');
  const root = join(docs, 'src/pages');
  const out = [];
  (function walk(dir) {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (name.endsWith('.astro') && !name.includes('[')) {
        out.push('/' + relative(root, full).replace(/\.astro$/, '').replace(/(^|\/)index$/, ''));
      }
    }
  })(root);
  const heroes = readFileSync(join(docs, 'src/data/heroes.ts'), 'utf8');
  for (const [, id] of heroes.matchAll(/\n\s*id:\s*"([^"]+)"/g)) out.push(`/studio/heroes/${id}/`);
  return out;
}

const props = ['display', 'position', 'top', 'left', 'right', 'bottom', 'width', 'height', 'min-height', 'max-width',
  'margin-top', 'margin-bottom', 'margin-left', 'margin-right', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right',
  'gap', 'row-gap', 'column-gap', 'flex-direction', 'flex-grow', 'flex-shrink', 'flex-basis', 'justify-content', 'align-items',
  'font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing', 'text-align', 'text-transform', 'text-decoration-line',
  'border-top-width', 'border-top-left-radius', 'border-bottom-right-radius', 'box-shadow', 'outline-style',
  'opacity', 'z-index', 'grid-template-columns', 'overflow-x', 'aspect-ratio', 'color', 'background-color', 'background-image',
  'translate', 'scale', 'rotate', 'transform', 'filter', 'visibility'];

const same = (a, b) => {
  if (a === b) return true;
  const x = parseFloat(a), y = parseFloat(b);
  return !Number.isNaN(x) && !Number.isNaN(y) && Math.abs(x - y) < 0.1 && a.replace(/[-\d.]+/g, '') === b.replace(/[-\d.]+/g, '');
};

function referenceCss(file) {
  const exact = join(base, file);
  if (existsSync(exact)) return readFileSync(exact);
  const plain = join(base, file.replace('.min.css', '.css'));
  return existsSync(plain) ? readFileSync(plain) : null;
}

const browser = await chromium.launch();
async function snapshot(useBase, page, width) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  const tab = await context.newPage();
  if (useBase) {
    await tab.route(/\/(__core|dist)\/[^?]*\.css(\?.*)?$/, (route) => {
      const file = route.request().url().split('?')[0].split('/').pop();
      const body = referenceCss(file);
      return body ? route.fulfill({ body, contentType: 'text/css' }) : route.continue();
    });
  }
  let rows = null;
  for (let attempt = 0; attempt < 3 && !rows; attempt++) {
    try {
      await tab.goto(url + page, { waitUntil: 'networkidle' });
      await tab.waitForTimeout(400);
      rows = await tab.evaluate((props) => {
        const out = [];
        document.querySelectorAll('body *').forEach((el) => {
          if (el.closest('svg, .hv-bar, .doc-prevnext')) return;
          const style = getComputedStyle(el);
          out.push([`${el.tagName.toLowerCase()}.${(el.getAttribute('class') || '').trim().replace(/\s+/g, '.')}`, ...props.map((p) => style[p] ?? style.getPropertyValue(p))]);
        });
        return out;
      }, props);
    } catch { /* page navigated while reading (redirect): retry */ }
  }
  await context.close();
  return rows || [];
}

const pages = listPages();
const report = [];
for (const width of widths) {
  for (const page of pages) {
    const before = await snapshot(true, page, width);
    const after = await snapshot(false, page, width);
    if (before.length !== after.length) { report.push(`${width}px ${page}: different number of elements (${before.length} → ${after.length})`); continue; }
    let changed = 0; let example = '';
    before.forEach((row, index) => {
      const next = after[index];
      const diff = props.filter((_, j) => !same(row[j + 1], next[j + 1]));
      if (!diff.length) return;
      changed++;
      const line = `${row[0].slice(0, 80)} — ${diff.map((p) => `${p}: ${row[props.indexOf(p) + 1]} → ${next[props.indexOf(p) + 1]}`).join('; ')}`;
      if (!example) example = line;
      if (args.detail) report.push(`   ${line}`);
    });
    if (changed) report.push(`${width}px ${page}: ${changed} element(s) · e.g. ${example}`);
  }
}
await browser.close();

const text = report.length ? report.join('\n') : `No style changes (${pages.length} pages × ${widths.length} widths).`;
console.log(text);
if (args.out) writeFileSync(args.out, text + '\n');
process.exit(report.length ? 1 : 0);
