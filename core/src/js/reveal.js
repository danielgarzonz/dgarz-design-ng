import { $all } from './utils.js';

var SKIP = ".dg-reveal, [hidden], [data-dg-no-reveal], style, script, .dg-modal-backdrop, .dg-drawer, .dg-drawer-backdrop";

export function wireReveal(ctx) {
  // JS tags the children, so content stays visible if this script never runs.
  $all("[data-dg-reveal-children]", ctx).forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (el) {
      if (!el.matches(SKIP)) el.classList.add("dg-reveal");
    });
  });
  var els = $all(".dg-reveal:not(.is-visible)", ctx);
  if (!els.length || !window.IntersectionObserver) {
    els.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }
  // No threshold: a block taller than the viewport could never reach one.
  var obs = new IntersectionObserver(function (entries) {
    entries.filter(function (entry) { return entry.isIntersecting; }).forEach(function (entry, i) {
      var el = entry.target;
      el.style.transitionDelay = Math.min(i, 5) * 70 + "ms";
      el.classList.add("is-visible");
      obs.unobserve(el);
      setTimeout(function () { el.style.transitionDelay = ""; }, 1100);
    });
  });
  els.forEach(function (el) { obs.observe(el); });
}
