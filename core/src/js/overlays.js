import { $, $all, FOCUSABLE, DUR, openStack, target } from './utils.js';

export function openOverlay(el) {
  if (!el || !openStack.every(function (o) { return o.el !== el; })) return;
  var backdrop = target(el, "data-dg-backdrop");
  var prevFocus = document.activeElement;
  var dialog = $(".dg-modal", el);
  if (dialog) dialog.classList.remove("has-resized");
  // Reopening during the exit animation cancels the pending hide.
  clearTimeout(el.__dgCloseTimer);
  if (dialog) dialog.classList.remove("is-closing");
  el.classList.remove("is-closing");
  if (backdrop) backdrop.classList.remove("is-closing");
  el.hidden = false;
  if (backdrop) backdrop.hidden = false;
  el.setAttribute("aria-hidden", "false");
  var focusEl = $("[autofocus]", el) || $(FOCUSABLE, el) || el;
  if (focusEl && focusEl.focus) focusEl.focus();
  openStack.push({ el: el, backdrop: backdrop, prevFocus: prevFocus });
  document.body.style.overflow = "hidden";
}

export function closeOverlay(el) {
  var idx = el ? indexOf(el) : openStack.length - 1;
  if (idx < 0) return;
  var o = openStack[idx];
  o.el.setAttribute("aria-hidden", "true");
  openStack.splice(idx, 1);
  if (!openStack.length) document.body.style.overflow = "";
  if (o.prevFocus && o.prevFocus.focus) o.prevFocus.focus();
  var inner = o.el.querySelector(".dg-modal") || null;
  if (inner && inner.__dgResizeAnimation) {
    inner.__dgResizeAnimation.cancel();
    inner.__dgResizeAnimation = null;
    inner.classList.remove('is-resizing');
  }
  if (inner) inner.classList.add("is-closing");
  o.el.classList.add("is-closing");
  if (o.backdrop) o.backdrop.classList.add("is-closing");
  o.el.__dgCloseTimer = setTimeout(function () {
    if (inner) inner.classList.remove("is-closing");
    o.el.classList.remove("is-closing");
    o.el.hidden = true;
    if (o.backdrop) {
      o.backdrop.classList.remove("is-closing");
      o.backdrop.hidden = true;
    }
  }, DUR);
}

export function indexOf(el) {
  for (var i = 0; i < openStack.length; i++)
    if (openStack[i].el === el || openStack[i].backdrop === el) return i;
  return -1;
}

export function closestOverlay(node) {
  return node.closest(".dg-modal-backdrop, .dg-drawer, [data-dg-overlay]");
}

// Optional control: preserve the same dialog, form values and focus while resizing.
export function wireModalResize(modal) {
  var buttons = $all('[data-dg-modal-resize]', modal);
  buttons.forEach(function (button) {
    if (button.__dgResize) return;
    button.__dgResize = true;
    button.addEventListener('click', function () {
      var before = modal.getBoundingClientRect();
      var beforeRadius = getComputedStyle(modal).borderRadius;
      if (modal.__dgResizeAnimation) modal.__dgResizeAnimation.cancel();
      // Keep entrance keyframes disabled after the temporary resize layer is removed.
      modal.classList.add('has-resized');
      modal.classList.remove('is-resizing');
      var full = modal.classList.toggle('dg-modal-full');
      modal.classList.remove('dg-modal-sm', 'dg-modal-lg');
      modal.classList.add('dg-modal-md');
      sync();
      var after = modal.getBoundingClientRect();
      var afterRadius = getComputedStyle(modal).borderRadius;
      if (modal.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Animate actual bounds, keeping text and controls at their natural scale.
        modal.classList.add('is-resizing');
        var animation = modal.animate([
          { left: before.left + 'px', top: before.top + 'px', width: before.width + 'px', height: before.height + 'px', borderRadius: beforeRadius },
          { left: after.left + 'px', top: after.top + 'px', width: after.width + 'px', height: after.height + 'px', borderRadius: afterRadius }
        ], { duration: 360, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' });
        modal.__dgResizeAnimation = animation;
        animation.finished.then(function () {
          if (modal.__dgResizeAnimation !== animation) return;
          modal.classList.remove('is-resizing');
          modal.__dgResizeAnimation = null;
          animation.cancel();
        }).catch(function () { /* A repeated click or closing can interrupt resizing. */ });
      }
      modal.dispatchEvent(new CustomEvent('dg:modal-resize', { bubbles: true, detail: { size: full ? 'full' : 'md' } }));
    });
  });
  function sync() {
    var full = modal.classList.contains('dg-modal-full');
    buttons.forEach(function (button) {
      var label = full ? 'Reducir a mediano' : 'Ampliar a pantalla completa';
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
      button.setAttribute('aria-pressed', String(full));
      var icon = $('[data-dg-modal-size-icon]', button);
      if (icon) icon.setAttribute('d', full
        ? 'M21 3l-7 7m0-6v6h6M3 21l7-7m-6 0h6v6'
        : 'M14 10l7-7m-6 0h6v6M10 14l-7 7m0-6v6h6');
    });
  }
  sync();
}
