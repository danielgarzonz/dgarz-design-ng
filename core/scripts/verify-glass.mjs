// Verifies the opt-in glass modifier (.is-glass) on non-button components:
// solid (no blur) by default, translucent + blurred with .is-glass, same text
// color, more opaque on focus/hover, and solid under prefers-reduced-transparency.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const cases = [
  ['badge', '<span class="dg-badge{g}">Badge</span>'],
  ['badge-solid', '<span class="dg-badge dg-badge-solid{g}">Badge</span>'],
  ['badge-outline', '<span class="dg-badge dg-badge-outline{g}">Badge</span>'],
  ...['success', 'warning', 'danger', 'info'].map(tone => [`badge-${tone}`, `<span class="dg-badge dg-badge-${tone}{g}">Badge</span>`]),
  ['alert', '<div class="dg-alert{g}">Alerta</div>'],
  ...['success', 'warning', 'danger', 'info'].map(tone => [`alert-${tone}`, `<div class="dg-alert dg-alert-${tone}{g}">Alerta</div>`]),
  ['callout', '<div class="dg-callout{g}">Callout</div>'],
  ['callout-info', '<div class="dg-callout dg-callout-info{g}">Callout</div>'],
  ['card', '<div class="dg-card dg-card-hover{g}"><div class="dg-card-body">Card</div></div>'],
  ['tabs', '<div class="dg-tabs{g}"><button class="dg-tab is-active">Uno</button><button class="dg-tab">Dos</button></div>'],
  ['tabs-pill', '<div class="dg-tabs dg-tabs-pill{g}"><button class="dg-tab is-active">Uno</button><button class="dg-tab">Dos</button></div>'],
  ['segmented', '<div class="dg-segmented{g}"><button class="is-active">Uno</button><button>Dos</button></div>'],
  ['toast', '<div class="dg-toast{g}">Toast</div>'],
  ...['success', 'warning', 'danger', 'info'].map(tone => [`toast-${tone}`, `<div class="dg-toast dg-toast-${tone}{g}">Toast</div>`]),
  ['input', '<input class="dg-input{g}" placeholder="Buscar">'],
  ['textarea', '<textarea class="dg-textarea{g}"></textarea>'],
  ['select', '<select class="dg-select{g}"><option>Uno</option></select>'],
  ['input-group', '<div class="dg-input-group{g}"><input class="dg-input" placeholder="Correo"><span class="dg-input-addon">@</span></div>'],
  ['chip', '<span class="dg-chip{g}">Chip</span>'],
];

let html = '<div style="padding:2rem;background:linear-gradient(135deg,#ff7a1a,#247cff)">';
for (const [name, markup] of cases) {
  for (const glass of [false, true]) {
    const id = `${glass ? 'glass' : 'solid'}-${name}`;
    html += markup.replace('{g}', glass ? ' is-glass' : '').replace(/^<(\w+)/, `<$1 id="${id}"`);
  }
}
html += '</div>';

// Floating components: solid by default, glass via .is-glass or a
// [data-surface="glass"] scope, and .is-solid opts out inside that scope.
// Modal/drawer paint glass on ::after; the element itself must stay transparent.
const floating = [
  ['navbar', '<nav class="dg-navbar{c}">Nav</nav>'],
  ['menu', '<div class="dg-menu{c}" style="position:static">Menú</div>'],
  ['combobox', '<div class="dg-combobox-dropdown{c}" style="position:static">Lista</div>'],
  ['cal', '<div class="dg-cal{c}" style="position:static">Calendario</div>'],
  ['popover', '<div class="dg-popover{c}" style="position:static">Popover</div>'],
  ['app-aside', '<aside class="dg-app-aside{c}" style="position:static;height:auto">Aside</aside>'],
  ['app-header', '<header class="dg-app-header{c}" style="position:static">Header</header>'],
  ['dock', '<nav class="dg-dock{c}"><button class="dg-dock-item is-active">A</button><button class="dg-dock-item">B</button></nav>'],
  ['modal', '<div class="dg-modal{c}" style="position:relative">Modal</div>', 'layer'],
  ['drawer', '<div class="dg-drawer{c}" style="position:relative;height:120px">Drawer</div>', 'layer'],
];
const modes = [['default', '', false], ['class', ' is-glass', false], ['scope', '', true], ['opt-out', ' is-solid', true]];
html += '<div>';
for (const [name, markup] of floating) {
  for (const [mode, extra, scoped] of modes) {
    const element = markup.replace('{c}', extra).replace(/^<(\w+)/, `<$1 id="float-${mode}-${name}"`);
    html += scoped ? `<div data-surface="glass">${element}</div>` : element;
  }
}
html += '<nav class="dg-navbar dg-navbar-shadow" id="navbar-with-shadow">Nav</nav>';
html += '<div class="dg-carousel" id="carousel-default"><button class="dg-carousel-prev" id="arrow-default">‹</button></div>';
html += '<div class="dg-carousel is-solid"><button class="dg-carousel-prev" id="arrow-solid">‹</button></div>';
for (const glass of [false, true]) {
  const extra = glass ? ' is-glass' : '';
  const kind = glass ? 'glass' : 'solid';
  html += `<div class="dg-modal${extra}" style="position:relative"><div class="dg-modal-header" id="section-modal-header-${kind}">H</div><div class="dg-modal-footer" id="section-modal-footer-${kind}">F</div></div>`;
  html += `<div class="dg-drawer${extra}" style="position:relative;height:160px"><div class="dg-drawer-header" id="section-drawer-header-${kind}">H</div><div class="dg-drawer-footer" id="section-drawer-footer-${kind}">F</div></div>`;
}
html += '<div data-surface="glass"><div class="dg-pos-top"><div class="dg-modal" id="modal-pos" style="position:relative">Pos</div></div></div>';
html += '</div>';

const css = (await Promise.all(['dgarz.full.css', 'dgarz-app.css'].map(file => readFile(new URL(`../dist/${file}`, import.meta.url), 'utf8')))).join('\n');
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setContent(`<style>${css}</style><style id="freeze">*,*::after{transition:none!important;animation:none!important}</style>${html}`);
  await page.mouse.move(-100, -100);

  const read = id => page.locator(`[id="${id}"]`).evaluate(element => {
    const style = getComputedStyle(element);
    const color = style.backgroundColor;
    const slash = color.match(/\/\s*([\d.]+)\s*\)$/);
    const rgba = color.match(/^rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)$/);
    return {
      alpha: slash ? Number(slash[1]) : rgba ? Number(rgba[1]) : 1,
      filter: style.backdropFilter,
      color: style.color,
      image: style.backgroundImage,
    };
  });

  const check = async (label, expectSolid) => {
    for (const [name] of cases) {
      const solid = await read(`solid-${name}`);
      const glass = await read(`glass-${name}`);
      assert.equal(solid.filter, 'none', `${label}: ${name} has no blur by default`);
      assert.equal(glass.color, solid.color, `${label}: ${name} glass keeps its text color`);
      if (expectSolid) {
        assert.equal(glass.alpha, 1, `${label}: ${name} falls back to an opaque fill (${glass.alpha})`);
        assert.equal(glass.filter, 'none', `${label}: ${name} falls back without blur`);
      } else {
        assert(glass.alpha > 0.3 && glass.alpha < 1, `${label}: ${name} glass alpha ${glass.alpha}`);
        assert.match(glass.filter, /blur/, `${label}: ${name} glass blur`);
      }
    }
    const select = await read('glass-select');
    assert.match(select.image, /svg/, `${label}: glass select keeps its chevron`);
  };

  const surface = (id, pseudo = null) => page.locator(`[id="${id}"]`).evaluate((element, pseudo) => {
    const style = getComputedStyle(element, pseudo);
    const color = style.backgroundColor;
    const slash = color.match(/\/\s*([\d.]+)\s*\)$/);
    const rgba = color.match(/^rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)$/);
    return { alpha: slash ? Number(slash[1]) : rgba ? Number(rgba[1]) : 1, filter: style.backdropFilter, content: style.content, animation: getComputedStyle(element).animationName };
  }, pseudo);
  const checkFloating = async (label, expectSolid) => {
    for (const [name, , kind] of floating) {
      for (const [mode, , scoped] of modes) {
        const glassWanted = !expectSolid && (mode === 'class' || mode === 'scope');
        const id = `float-${mode}-${name}`;
        const own = await surface(id);
        if (kind === 'layer') {
          const layer = await surface(id, '::after');
          const hasLayer = layer.content !== 'none' && /blur/.test(layer.filter);
          if (glassWanted) {
            assert(hasLayer && layer.alpha < 1, `${label}: ${name} ${mode} has a glass layer`);
            assert.equal(own.alpha, 0, `${label}: ${name} ${mode} surface is transparent under the glass layer`);
          } else if (expectSolid && (mode === 'class' || mode === 'scope')) {
            assert(!/blur/.test(layer.filter) && layer.alpha === 1 || layer.content === 'none', `${label}: ${name} ${mode} glass layer falls back to solid`);
          } else {
            assert(!hasLayer, `${label}: ${name} ${mode} has no glass layer`);
            assert.equal(own.alpha, 1, `${label}: ${name} ${mode} is an opaque surface`);
          }
        } else if (glassWanted) {
          assert(own.alpha > 0.3 && own.alpha < 1 && /blur/.test(own.filter), `${label}: ${name} ${mode} is glass (${own.alpha}, ${own.filter})`);
        } else {
          assert.equal(own.alpha, 1, `${label}: ${name} ${mode} is solid (${own.alpha})`);
          assert.equal(own.filter, 'none', `${label}: ${name} ${mode} has no blur`);
        }
      }
    }
    // Carousel controls are the exception: glass by default, .is-solid opts out.
    const arrowDefault = await surface('arrow-default');
    const arrowSolid = await surface('arrow-solid');
    if (expectSolid) assert.equal(arrowDefault.alpha, 1, `${label}: carousel arrows fall back to solid`);
    else assert(arrowDefault.alpha < 1 && /blur/.test(arrowDefault.filter), `${label}: carousel arrows are glass by default`);
    assert(arrowSolid.alpha === 1 && arrowSolid.filter === 'none', `${label}: .is-solid carousel arrows are opaque`);
  };

  // Drawer header/footer must match the modal's section contrast in both modes.
  const checkSections = async (label, expectSolid) => {
    for (const kind of ['solid', 'glass']) {
      for (const part of ['header', 'footer']) {
        const modal = await page.locator(`[id="section-modal-${part}-${kind}"]`).evaluate(element => getComputedStyle(element).backgroundColor);
        const drawer = await page.locator(`[id="section-drawer-${part}-${kind}"]`).evaluate(element => getComputedStyle(element).backgroundColor);
        assert.equal(drawer, modal, `${label}: drawer ${part} matches modal (${kind})`);
        const state = await surface(`section-drawer-${part}-${kind}`);
        if (kind === 'glass' && !expectSolid) assert(state.alpha < 1 && /blur/.test(state.filter), `${label}: drawer ${part} is glass`);
        else assert(state.alpha === 1 && state.filter === 'none', `${label}: drawer ${part} is solid (${kind})`);
      }
    }
  };
  for (const theme of ['light', 'dark']) {
    await page.locator('html').evaluate((element, value) => element.dataset.theme = value, theme);
    await check(theme, false);
    await checkFloating(theme, false);
    await checkSections(theme, false);
  }
  // Shape and elevation: square drawer, top menu bars cast a shadow, modal headers never do.
  const box = id => page.locator(`[id="${id}"]`).evaluate(element => { const style = getComputedStyle(element); return { radius: style.borderTopLeftRadius + ' ' + style.borderTopRightRadius + ' ' + style.borderBottomLeftRadius + ' ' + style.borderBottomRightRadius, shadow: style.boxShadow }; });
  for (const id of ['float-default-drawer', 'float-class-drawer']) assert.equal((await box(id)).radius, '0px 0px 0px 0px', `${id} is square`);
  // Navbar is solid and flat by default; .dg-navbar-shadow opts into the top-bar shadow.
  assert.equal((await box('float-default-navbar')).shadow, 'none', 'navbar has no shadow by default');
  for (const id of ['navbar-with-shadow', 'float-default-app-header']) assert.notEqual((await box(id)).shadow, 'none', `${id} casts a shadow`);
  for (const id of ['section-modal-header-solid', 'section-modal-header-glass']) assert.equal((await box(id)).shadow, 'none', `${id} has no shadow`);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.locator('#freeze').evaluate(element => element.disabled = true);
  assert.equal((await surface('float-default-modal')).animation, 'dg-modal-solid-in', 'Solid modal fades in');
  assert.equal((await surface('float-class-modal')).animation, 'dg-modal-in', 'Glass modal rises while its blur animates');
  assert.equal((await surface('float-opt-out-modal')).animation, 'dg-modal-solid-in', 'is-solid opts out of the glass scope');
  assert.equal((await surface('modal-pos')).animation, 'dg-modal-down', 'Positioned modals keep their own motion inside a glass scope');
  await page.locator('#freeze').evaluate(element => element.disabled = false);
  await page.emulateMedia({ reducedMotion: 'reduce' });

  const resting = (await read('glass-input')).alpha;
  await page.locator('#glass-input').focus();
  assert((await read('glass-input')).alpha > resting, 'Focused glass input becomes more opaque');
  await page.locator('#glass-input').blur();
  const cardResting = (await read('glass-card')).alpha;
  await page.locator('#glass-card').hover();
  assert((await read('glass-card')).alpha > cardResting, 'Hovered glass card becomes more opaque');
  await page.mouse.move(-100, -100);

  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-transparency', value: 'reduce' }] });
  assert(await page.evaluate(() => matchMedia('(prefers-reduced-transparency: reduce)').matches), 'Reduced transparency emulation is active');
  await check('reduced-transparency', true);
  await checkFloating('reduced-transparency', true);
  await checkSections('reduced-transparency', true);

  assert.deepEqual(errors, []);
  console.log(`PASS: glass on ${cases.length} component variants and ${floating.length} floating components (default solid, .is-glass, data-surface scope, .is-solid opt-out) in light/dark, modal motion, focus/hover boost, select chevron and reduced-transparency fallback`);
} finally {
  await browser.close();
}
