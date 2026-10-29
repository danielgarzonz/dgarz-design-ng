import { $, $all, FOCUSABLE, DUR, openStack, target } from './utils.js';

export function openOverlay(el) {
  if (!el || !openStack.every(function (o) { return o.el !== el; })) return;
  var backdrop = target(el, "data-dg-backdrop");
  var prevFocus = document.activeElement;
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
  if (inner) inner.classList.add("is-closing");
  o.el.classList.add("is-closing");
  if (o.backdrop) o.backdrop.classList.add("is-closing");
  setTimeout(function () {
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
