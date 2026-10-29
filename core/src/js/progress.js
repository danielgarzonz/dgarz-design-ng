import { $all } from './utils.js';

export function wireProgressBars(ctx) {
  var bars = $all(".dg-progress-bar", ctx);
  if (!bars.length || !window.IntersectionObserver) return;
  bars.forEach(function (bar) {
    var w = bar.style.width;
    var pct = parseFloat(w) || 0;
    var wrap = bar.closest('.dg-progress');
    if (wrap && !wrap.hasAttribute('role')) {
      wrap.setAttribute('role', 'progressbar');
      wrap.setAttribute('aria-valuemin', '0');
      wrap.setAttribute('aria-valuemax', '100');
      wrap.setAttribute('aria-valuenow', String(pct));
    }
    if (!w || w === "0" || w === "0%") return;
    bar._pgTarget = w;
    bar.style.transition = "none";
    bar.style.width = "0";
  });
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var bar = entry.target;
      if (!bar._pgTarget) return;
      requestAnimationFrame(function () { bar.style.transition = ""; bar.style.width = bar._pgTarget; });
      obs.unobserve(bar);
    });
  }, { threshold: 0.4 });
  bars.forEach(function (bar) { if (bar._pgTarget) obs.observe(bar); });
}
