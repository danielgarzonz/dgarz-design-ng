import { $, $all, FOCUSABLE, DUR } from './utils.js';

export function wireDropdown(dd) {
  if (dd.__dg) return; dd.__dg = true;
  var trigger = $("[data-dg-dropdown-trigger]", dd) || $("button", dd);
  var menu = $(".dg-menu", dd);
  if (!trigger || !menu) return;
  var floating = typeof menu.showPopover === 'function';
  var closeTimer;
  if (floating) menu.setAttribute('popover', 'manual');
  menu.hidden = true;
  trigger.setAttribute("aria-haspopup", "true");
  trigger.setAttribute("aria-expanded", "false");

  function position() {
    if (!floating || menu.hidden) return;
    var rect = trigger.getBoundingClientRect();
    var viewport = window.visualViewport;
    var leftEdge = viewport ? viewport.offsetLeft : 0;
    var topEdge = viewport ? viewport.offsetTop : 0;
    var width = viewport ? viewport.width : window.innerWidth;
    var height = viewport ? viewport.height : window.innerHeight;
    var below = Math.max(0, topEdge + height - rect.bottom - 14);
    var above = Math.max(0, rect.top - topEdge - 14);
    menu.style.maxWidth = Math.max(0, width - 16) + 'px';
    menu.style.maxHeight = Math.max(below, above) + 'px';
    var size = { width: menu.offsetWidth, height: menu.offsetHeight };
    var opensAbove = size.height > below && above > below;
    var space = opensAbove ? above : below;
    menu.style.maxHeight = space + 'px';
    var x = menu.classList.contains('dg-menu-end') ? rect.right - size.width : rect.left;
    var y = opensAbove ? rect.top - Math.min(size.height, space) - 6 : rect.bottom + 6;
    menu.style.left = Math.max(leftEdge + 8, Math.min(x, leftEdge + width - size.width - 8)) + 'px';
    menu.style.top = Math.max(topEdge + 8, y) + 'px';
    menu.style.transformOrigin = (opensAbove ? 'bottom ' : 'top ') + (menu.classList.contains('dg-menu-end') ? 'right' : 'left');
  }
  function listen(active) {
    var method = active ? 'addEventListener' : 'removeEventListener';
    window[method]('resize', position);
    document[method]('scroll', position, true);
    if (window.visualViewport) {
      window.visualViewport[method]('resize', position);
      window.visualViewport[method]('scroll', position);
    }
  }
  function close(animate) {
    clearTimeout(closeTimer);
    trigger.setAttribute('aria-expanded', 'false');
    listen(false);
    function finish() {
      if (floating && menu.matches(':popover-open')) menu.hidePopover();
      menu.hidden = true;
      menu.classList.remove('is-closing');
    }
    if (!menu.hidden && animate) {
      menu.classList.add('is-closing');
      closeTimer = setTimeout(finish, DUR);
    } else finish();
  }
  menu.__dgClose = close;
  trigger.addEventListener("click", function (e) {
    e.stopPropagation();
    var willOpen = menu.hidden;
    closeAllMenus(false);
    if (!willOpen) return;
    menu.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    // Native popovers escape overflow clipping without moving the menu out of
    // its DOM context (theme inheritance and modal focus trapping are preserved).
    if (floating) menu.showPopover();
    position();
    listen(true);
    var f = $(FOCUSABLE, menu); if (f) f.focus({ preventScroll: true });
  });
  menu.addEventListener("click", function (e) {
    e.stopPropagation();
    if (e.target.closest(".dg-menu-item")) close(true);
  });
}

export function closeAllMenus(animate) {
  $all(".dg-dropdown .dg-menu").forEach(function (menu) {
    if (menu.__dgClose) menu.__dgClose(animate);
    else menu.hidden = true;
  });
  $all("[data-dg-dropdown-trigger],.dg-dropdown button[aria-expanded]").forEach(function (trigger) {
    trigger.setAttribute("aria-expanded", "false");
  });
}
