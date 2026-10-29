import { $all } from './utils.js';

export function wireReveal(ctx) {
  var els = $all(".dg-reveal", ctx);
  if (!els.length || !window.IntersectionObserver) {
    els.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  els.forEach(function (el) { obs.observe(el); });
}
