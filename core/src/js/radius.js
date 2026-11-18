/* Corner style, like the color theme: data-radius on <html> (or on any
   container) switches every component at once. "semi" is the default,
   "full" is rounded, "none" is square. On <html> the choice is remembered
   (localStorage "dg-radius") and restored on the next visit. */
var MODES = ['semi', 'full', 'none'];
var KEY = 'dg-radius';

export function applySavedRadius() {
  try {
    var s = localStorage.getItem(KEY);
    if (MODES.indexOf(s) > -1) document.documentElement.setAttribute('data-radius', s);
  } catch (e) {}
}

export function getRadius(el) {
  el = el || document.documentElement;
  var v = el.getAttribute('data-radius');
  return MODES.indexOf(v) > -1 ? v : 'semi';
}

export function setRadius(value, el) {
  if (MODES.indexOf(value) < 0) return;
  el = el || document.documentElement;
  // Corners morph instead of jumping (see [data-dg-radius-morph] in _tokens.scss).
  if (!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    el.setAttribute('data-dg-radius-morph', '');
    clearTimeout(el.__dgRadiusMorph);
    el.__dgRadiusMorph = setTimeout(function () { el.removeAttribute('data-dg-radius-morph'); }, 600);
  }
  el.setAttribute('data-radius', value);
  if (el === document.documentElement) { try { localStorage.setItem(KEY, value); } catch (e) {} }
  el.dispatchEvent(new CustomEvent('dg:radiuschange', { bubbles: true, detail: { radius: value } }));
}

export function toggleRadius(el) {
  var next = MODES[(MODES.indexOf(getRadius(el)) + 1) % MODES.length];
  setRadius(next, el);
  return next;
}
