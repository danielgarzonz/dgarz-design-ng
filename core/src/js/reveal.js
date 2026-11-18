import { $all } from './utils.js';

var SKIP = ".dg-reveal, [hidden], [data-dg-no-reveal], style, script, .dg-modal-backdrop, .dg-drawer, .dg-drawer-backdrop";

// Entrance classes that, like .dg-reveal, wait until they are on screen.
var ENTRANCES = "[class*='dg-fade-in'], .dg-zoom-in, .dg-zoom-out, [class*='dg-blur-in'], " +
  "[class*='dg-rise-in'], .dg-drop-in, .dg-pop-in, .dg-text-in, .dg-text-reveal";
var seen = typeof WeakSet === "function" ? new WeakSet() : null;

// Entrances below the fold start paused (the backwards fill keeps them
// hidden) and play when they scroll into view, so they are seen instead of
// finishing off-screen. Those already on screen play at once, as before.
// Without this script, or with reduced motion, they simply play on mount.
// Opt out with data-dg-no-reveal on the element or an ancestor.
function wireEntrances(ctx) {
  if (!seen || !window.IntersectionObserver) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var below = $all(ENTRANCES, ctx).filter(function (el) {
    if (seen.has(el)) return false;
    seen.add(el);
    if (el.closest("[data-dg-no-reveal], .dg-anim-none, .dg-modal-backdrop, .dg-drawer")) return false;
    var rect = el.getBoundingClientRect();
    return rect.height > 0 && rect.top > window.innerHeight;
  });
  if (!below.length) return;
  // Pause, and restart from 0 in case a few frames already ran before this.
  below.forEach(function (el) { el.classList.add("dg-anim-wait"); el.style.animationName = "none"; });
  void document.body.offsetWidth;
  below.forEach(function (el) { el.style.animationName = ""; });
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove("dg-anim-wait");
      obs.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  below.forEach(function (el) { obs.observe(el); });
}

export function wireReveal(ctx) {
  wireEntrances(ctx);
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
