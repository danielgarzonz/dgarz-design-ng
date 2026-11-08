// Sliding indicator for option groups (.dg-tabs, .dg-tabs-pill, .dg-segmented).
// One ::before per group follows the active option (pill or underline), so the
// change between options is a smooth slide instead of a jump. The group only
// gets .has-indicator once JS has measured it; without JS each option keeps its
// own static active style.

var observed = typeof WeakSet === 'function' ? new WeakSet() : null;

export function syncIndicator(group, instant) {
  if (!group) return;
  var active = group.querySelector('.dg-tab.is-active, .dg-dock-item.is-active, :scope > button.is-active');
  if (!active || !active.offsetWidth) return;
  group.style.setProperty('--dg-ind-x', active.offsetLeft + 'px');
  group.style.setProperty('--dg-ind-y', active.offsetTop + 'px');
  group.style.setProperty('--dg-ind-w', active.offsetWidth + 'px');
  group.style.setProperty('--dg-ind-h', active.offsetHeight + 'px');
  if (!instant && group.classList.contains('is-indicator-ready')) {
    // Restart the grow-and-settle pulse for this move.
    group.classList.remove('is-moving');
    void group.offsetWidth;
    group.classList.add('is-moving');
  }
  if (instant || !group.classList.contains('has-indicator')) {
    // First placement: appear in place, then enable the slide transition.
    group.classList.remove('is-indicator-ready');
    group.classList.add('has-indicator');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { group.classList.add('is-indicator-ready'); });
    });
  }
}

export function wireIndicator(group) {
  if (!group || (observed && observed.has(group))) return;
  if (observed) observed.add(group);
  syncIndicator(group, true);
  // Re-measure without animating when the layout changes (resize, fonts).
  if (typeof ResizeObserver === 'function') {
    new ResizeObserver(function () { syncIndicator(group, true); }).observe(group);
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { syncIndicator(group, true); });
  }
}
