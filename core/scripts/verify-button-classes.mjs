import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import { BUTTON_SELECTOR } from '../src/js/button-selector.js';

const variants = [...BUTTON_SELECTOR.matchAll(/\.([\w-]+)/g)].map(match => match[1]).filter(name => name !== 'dg-btn');
const sizeNames = new Set(['dg-btn-sm', 'dg-btn-md', 'dg-btn-lg']);
const states = ['', 'dg-btn-sm', 'dg-btn-md', 'dg-btn-lg', 'is-loading', 'dg-btn-block', 'dg-btn-icon', 'disabled', 'is-disabled'];
const pairs = [];
let html = '';
for (const variant of variants) {
  const statesFor = sizeNames.has(variant) ? states.filter(state => !sizeNames.has(state)) : states;
  for (const state of statesFor) {
    const id = pairs.length;
    const attributes = state === 'disabled' ? ' disabled' : '';
    const modifier = state === 'disabled' ? '' : state;
    html += `<div><button id="old-${id}" class="dg-btn ${variant} ${modifier}"${attributes}>Acción</button><button id="new-${id}" class="${variant} ${modifier}"${attributes}>Acción</button></div>`;
    pairs.push([`old-${id}`, `new-${id}`]);
  }
}
for (const container of ['dg-modal-footer', 'dg-input-group', 'dg-drawer-footer']) {
  const id = pairs.length;
  html += `<div class="${container}"><button id="old-${id}" class="dg-btn dg-btn-primary dg-btn-sm">Acción</button><button id="new-${id}" class="dg-btn-primary dg-btn-sm">Acción</button></div>`;
  pairs.push([`old-${id}`, `new-${id}`]);
}
for (const tag of ['a', 'input']) {
  const id = pairs.length;
  const attributes = tag === 'a' ? 'href="#"' : 'type="submit" value="Acción"';
  const close = tag === 'a' ? 'Acción</a>' : '';
  html += `<div><${tag} id="old-${id}" class="dg-btn dg-btn-primary dg-btn-sm" ${attributes}>${close}<${tag} id="new-${id}" class="dg-btn-primary dg-btn-sm" ${attributes}>${close}</div>`;
  pairs.push([`old-${id}`, `new-${id}`]);
}
const grouped = pairs.length;
html += `<div class="dg-btn-group"><button id="old-${grouped}" class="dg-btn dg-btn-primary">Acción</button><button id="old-${grouped + 1}" class="dg-btn dg-btn-danger">Acción</button></div><div class="dg-btn-group"><button id="new-${grouped}" class="dg-btn-primary">Acción</button><button id="new-${grouped + 1}" class="dg-btn-danger">Acción</button></div>`;
pairs.push([`old-${grouped}`, `new-${grouped}`], [`old-${grouped + 1}`, `new-${grouped + 1}`]);
html += '<div><button id="default-button" class="dg-btn">Acción</button><button id="explicit-primary" class="dg-btn-primary">Acción</button></div>';
pairs.push(['default-button', 'explicit-primary']);
html += '<div class="dg-btn-group" data-dg-reorder id="reorder"><button class="dg-btn-primary" id="first">Primero</button><button class="dg-btn-danger">Segundo</button></div><div class="dg-btn-group" id="group-only">Grupo</div>';
html += '<button id="subtle-semantic" class="dg-btn-subtle">Acción sutil</button><button id="subtle-loading" class="dg-btn-subtle is-loading">Cargando</button><div class="dg-modal-footer"><button id="subtle-modal" class="dg-btn-subtle dg-btn-icon"><svg class="dg-icon" viewBox="0 0 24 24"><path d="M4 12h16" /></svg></button></div>';
const coloredTones = ['primary', 'success', 'warning', 'danger', 'info'];
for (const tone of coloredTones) {
  html += `<button id="color-${tone}" class="dg-btn-subtle-${tone}">Acción</button><button id="color-loading-${tone}" class="dg-btn-subtle-${tone} is-loading">Cargando</button><div class="dg-modal-footer"><button class="dg-btn-subtle-${tone} dg-btn-icon"><svg id="color-modal-${tone}" class="dg-icon" viewBox="0 0 24 24"><path d="M4 12h16" /></svg></button></div>`;
}
html += '<div id="responsive-parent" style="width:min(100%,500px)"><button id="mobile-width" class="dg-btn dg-btn-block-mobile">Continuar</button><button id="always-width" class="dg-btn dg-btn-block">Continuar</button></div>';
const minimumCases = [];
const sizeExpected = { 'dg-btn-sm': 80, 'dg-btn-md': 96, 'dg-btn-lg': 112 };
const minimumVariants = ['dg-btn', ...variants].filter(name => !name.startsWith('dg-btn-text'));
for (const variant of minimumVariants) {
  if (sizeNames.has(variant)) {
    const id = `minimum-${minimumCases.length}`;
    html += `<button id="${id}" class="${variant}">OK</button>`;
    minimumCases.push({ id, expected: sizeExpected[variant] });
    continue;
  }
  for (const [size, expected] of [['', 96], ['dg-btn-sm', 80], ['dg-btn-md', 96], ['dg-btn-lg', 112]]) {
    const id = `minimum-${minimumCases.length}`;
    html += `<button id="${id}" class="${variant} ${size}">OK</button>`;
    minimumCases.push({ id, expected });
  }
}
html += '<button id="minimum-long" class="dg-btn">Una etiqueta larga que necesita más espacio</button><button id="minimum-icon" class="dg-btn dg-btn-icon" aria-label="Icono"><svg class="dg-icon" viewBox="0 0 24 24"><path d="M4 12h16" /></svg></button>';
const css = await readFile(new URL('../dist/dgarz.full.css', import.meta.url), 'utf8');
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setContent(`<style>${css}\n*{transition:none!important;animation:none!important}</style>${html}`);
  await page.mouse.move(-100, -100);
  for (const theme of ['light', 'dark']) {
    await page.locator('html').evaluate((element, theme) => element.dataset.theme = theme, theme);
    const results = await page.evaluate(pairs => {
      const properties = ['display', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'padding', 'borderRadius', 'backgroundImage', 'backgroundColor', 'color', 'opacity', 'pointerEvents', 'position', 'borderLeftWidth', 'minWidth'];
      return pairs.map(([oldId, newId]) => [oldId, newId].map(id => {
        const element = document.getElementById(id);
        const style = getComputedStyle(element);
        const result = Object.fromEntries(properties.map(property => [property, style[property]]));
        if (element.classList.contains('is-loading')) {
          const spinner = getComputedStyle(element, '::after');
          result.spinner = [spinner.content, spinner.color, spinner.width, spinner.position];
        }
        return result;
      }));
    }, pairs);
    results.forEach(([oldStyle, newStyle], index) => assert.deepEqual(newStyle, oldStyle, `${theme}: ${pairs[index].join(' / ')}`));
    const subtle = await page.evaluate(() => {
      const probe = document.createElement('span');
      probe.style.cssText = 'color:var(--dg-text);background:var(--dg-surface-3)';
      document.body.append(probe);
      const tokenColor = getComputedStyle(probe).color;
      const tokenSurface = getComputedStyle(probe).backgroundColor;
      const actual = getComputedStyle(document.getElementById('subtle-semantic'));
      const result = { tokenColor, tokenSurface, color: actual.color, background: actual.backgroundColor, primary: getComputedStyle(document.getElementById('default-button')).backgroundColor, spinner: getComputedStyle(document.getElementById('subtle-loading'), '::after').color, modalIcon: getComputedStyle(document.querySelector('#subtle-modal svg')).color };
      probe.remove();
      return result;
    });
    assert.equal(subtle.color, subtle.tokenColor, `${theme}: subtle text`);
    assert.equal(subtle.background, subtle.tokenSurface, `${theme}: subtle surface`);
    assert.notEqual(subtle.background, subtle.primary, `${theme}: subtle must differ from primary`);
    assert.equal(subtle.spinner, subtle.tokenColor, `${theme}: loading contrast`);
    assert.equal(subtle.modalIcon, subtle.tokenColor, `${theme}: modal icon contrast`);
    const colored = await page.evaluate(tones => tones.map(tone => {
      const probe = document.createElement('span');
      probe.style.cssText = `color:var(--dg-${tone})`;
      document.body.append(probe);
      const expectedBorder = getComputedStyle(probe).color;
      const style = getComputedStyle(document.getElementById(`color-${tone}`));
      const result = { tone, expectedBorder, border: style.borderTopColor, width: style.borderTopWidth, borderStyle: style.borderTopStyle, color: style.color, surface: style.backgroundColor, spinner: getComputedStyle(document.getElementById(`color-loading-${tone}`), '::after').color, modalIcon: getComputedStyle(document.getElementById(`color-modal-${tone}`)).color };
      probe.remove();
      return result;
    }), coloredTones);
    for (const color of colored) {
      assert.equal(color.border, color.expectedBorder, `${theme}: ${color.tone} border`);
      assert.equal(color.width, '1px');
      assert.equal(color.borderStyle, 'solid');
      assert.equal(color.color, subtle.tokenColor);
      assert.equal(color.surface, subtle.tokenSurface);
      assert.equal(color.spinner, subtle.tokenColor);
      assert.equal(color.modalIcon, subtle.tokenColor);
    }
    assert.equal(await page.locator('[id="new-0"]').evaluate(element => getComputedStyle(element).display), 'inline-flex');
  }
  const hoverStyle = element => {
    const style = getComputedStyle(element);
    return [style.backgroundColor, style.color, style.opacity, style.boxShadow];
  };
  await page.locator('#old-0').hover();
  const oldHover = await page.locator('#old-0').evaluate(hoverStyle);
  await page.locator('#new-0').hover();
  assert.deepEqual(await page.locator('#new-0').evaluate(hoverStyle), oldHover, 'Standalone hover must match legacy');
  assert.equal(await page.locator('#group-only').evaluate(element => getComputedStyle(element).borderRadius), '30px', 'Group capsule matches modal footer radius');
  assert.equal(await page.locator('#group-only').evaluate(element => getComputedStyle(element).display), 'inline-flex', 'Group remains an inline flex capsule');
  await page.addScriptTag({ content: await readFile(new URL('../dist/dgarz.js', import.meta.url), 'utf8') });
  await page.locator('#first').focus();
  await page.keyboard.press('Alt+ArrowRight');
  assert.equal(await page.locator('#reorder button').last().getAttribute('id'), 'first', 'Reordering must accept standalone variants');
  const minimums = await page.evaluate(cases => cases.map(({ id, expected }) => ({ id, expected, width: document.getElementById(id).getBoundingClientRect().width })), minimumCases);
  for (const item of minimums) assert(item.width >= item.expected - 0.5, `Minimum ${JSON.stringify(item)}`);
  assert(await page.locator('#minimum-long').evaluate(element => element.getBoundingClientRect().width) > 120);
  const iconSize = await page.locator('#minimum-icon').evaluate(element => ({ width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height }));
  assert(Math.abs(iconSize.width - iconSize.height) < 1, 'Icon remains square');
  assert(iconSize.width < 80, 'Icon must not inherit text minimum');
  for (const width of [390, 991, 992, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    const sizes = await page.evaluate(() => ({ parent: document.getElementById('responsive-parent').getBoundingClientRect().width, mobile: document.getElementById('mobile-width').getBoundingClientRect().width, always: document.getElementById('always-width').getBoundingClientRect().width }));
    assert(Math.abs(sizes.always - sizes.parent) < 1, `Always block at ${width}`);
    if (width <= 991) assert(Math.abs(sizes.mobile - sizes.parent) < 1, `Mobile block at ${width}`);
    else assert(sizes.mobile < sizes.parent - 20, `Intrinsic desktop width at ${width}`);
  }
  assert.deepEqual(errors, []);
  console.log(`PASS: ${variants.length} standalone variants, ${pairs.length} style pairs in light/dark, disabled/loading, containers and keyboard reorder`);
} finally { await browser.close(); }
