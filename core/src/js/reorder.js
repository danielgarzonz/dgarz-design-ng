import { BUTTON_SELECTOR } from './button-selector.js';
import { $all } from './utils.js';

var EASE = 'cubic-bezier(.2, .6, .2, 1)'; // --dg-ease
var DURATION = 180; // --dg-dur
var THRESHOLD = 6;
var LIFT = ' scale(1.04)';

var status;
function announce(message) {
  if (!status) {
    status = document.createElement('div');
    status.className = 'dg-sr-only';
    status.setAttribute('role', 'status');
    document.body.appendChild(status);
  }
  status.textContent = message;
}

function motionOk() {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function slide(el, keyframes) {
  if (el.animate && motionOk()) el.animate(keyframes, { duration: DURATION, easing: EASE });
}

function slideFrom(el, left) {
  var delta = left - el.offsetLeft;
  if (delta) slide(el, [{ transform: 'translateX(' + delta + 'px)' }, { transform: 'none' }]);
}

export function wireReorder(group) {
  if (group.__dgReorder) return; group.__dgReorder = true;
  var drag = null;
  var suppressClick = false;

  function items() { return $all(BUTTON_SELECTOR, group); }

  function swap(sibling, reference) {
    var left = sibling.offsetLeft;
    group.insertBefore(sibling, reference);
    slideFrom(sibling, left);
  }

  // Moves the neighbor, not the button: the moved button keeps focus and pointer.
  function step(btn, direction) {
    var sibling = direction > 0 ? btn.nextElementSibling : btn.previousElementSibling;
    if (!sibling) return false;
    swap(sibling, direction > 0 ? btn : btn.nextElementSibling);
    return true;
  }

  function changed(btn, from) {
    var list = items();
    var to = list.indexOf(btn);
    if (to === from) return;
    announce(btn.textContent.trim() + ', posición ' + (to + 1) + ' de ' + list.length);
    group.dispatchEvent(new CustomEvent('dg:reorder', {
      detail: { item: btn, from: from, to: to, order: list.map(function (b) { return b.textContent.trim(); }) }
    }));
  }

  function position(event) {
    var btn = drag.btn;
    var width = btn.offsetWidth;
    var visual = drag.left + event.clientX - drag.x;
    visual = Math.max(0, Math.min(visual, group.clientWidth - width));
    var center = visual + width / 2;
    var next = btn.nextElementSibling;
    while (next && center > next.offsetLeft + next.offsetWidth / 2) {
      step(btn, 1);
      next = btn.nextElementSibling;
    }
    var prev = btn.previousElementSibling;
    while (prev && center < prev.offsetLeft + prev.offsetWidth / 2) {
      step(btn, -1);
      prev = btn.previousElementSibling;
    }
    drag.offset = visual - btn.offsetLeft;
    btn.style.transform = 'translateX(' + drag.offset + 'px)' + LIFT;
  }

  function stop() {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onCancel);
    window.removeEventListener('keydown', onKey, true);
    var current = drag;
    drag = null;
    if (!current.moved) return null;
    var btn = current.btn;
    btn.style.transform = '';
    btn.classList.remove('is-dragging');
    group.classList.remove('is-reordering');
    return current;
  }

  function settle(current) {
    slide(current.btn, [{ transform: 'translateX(' + current.offset + 'px)' + LIFT }, { transform: 'none' }]);
  }

  function onMove(event) {
    if (event.pointerId !== drag.id) return;
    if (!drag.moved) {
      if (Math.abs(event.clientX - drag.x) < THRESHOLD) return;
      drag.moved = true;
      drag.btn.classList.add('is-dragging');
      group.classList.add('is-reordering');
    }
    position(event);
  }

  function onUp(event) {
    if (event.pointerId !== drag.id) return;
    var current = stop();
    if (!current) return;
    settle(current);
    // The browser still fires click on the dragged button after pointerup.
    suppressClick = true;
    window.setTimeout(function () { suppressClick = false; }, 100);
    changed(current.btn, current.from);
  }

  function cancel() {
    var current = stop();
    if (!current) return;
    var lefts = current.order.map(function (b) { return b.offsetLeft; });
    current.order.forEach(function (b) { group.appendChild(b); });
    current.order.forEach(function (b, i) { if (b !== current.btn) slideFrom(b, lefts[i]); });
    settle(current);
  }

  function onCancel(event) {
    if (event.pointerId === drag.id) cancel();
  }

  function onKey(event) {
    if (event.key !== 'Escape' || !drag.moved) return;
    event.stopPropagation();
    cancel();
    suppressClick = true;
    window.setTimeout(function () { suppressClick = false; }, 100);
  }

  group.addEventListener('pointerdown', function (event) {
    var btn = event.target.closest(BUTTON_SELECTOR);
    if (drag || !btn || event.button !== 0 || btn.disabled || btn.classList.contains('is-disabled')) return;
    var order = items();
    drag = { btn: btn, id: event.pointerId, x: event.clientX, left: btn.offsetLeft, offset: 0, order: order, from: order.indexOf(btn), moved: false };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onCancel);
    window.addEventListener('keydown', onKey, true);
  });

  group.addEventListener('click', function (event) {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);

  // Links are draggable by default; the native preview would replace ours.
  group.addEventListener('dragstart', function (event) { event.preventDefault(); });

  // Keyboard alternative: Alt + left/right arrow moves the focused button.
  group.addEventListener('keydown', function (event) {
    if (!event.altKey || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
    var btn = event.target.closest(BUTTON_SELECTOR);
    if (!btn) return;
    event.preventDefault();
    var from = items().indexOf(btn);
    var left = btn.offsetLeft;
    if (!step(btn, event.key === 'ArrowRight' ? 1 : -1)) return;
    slideFrom(btn, left);
    changed(btn, from);
  });
}
