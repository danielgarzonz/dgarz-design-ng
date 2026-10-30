export var FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
export var DUR = 240;
export var openStack = [];

export function $(sel, ctx) { return (ctx || document).querySelector(sel); }
export function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
export function target(el, attr) { var s = el.getAttribute(attr); return s ? $(s) : null; }

export function trapFocus(container, e) {
  var f = $all(FOCUSABLE, container).filter(function (n) { return n.offsetParent !== null; });
  if (!f.length) return;
  var first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}
