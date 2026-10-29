import { $, $all, FOCUSABLE, DUR } from './utils.js';

export function wireDropdown(dd) {
  if (dd.__dg) return; dd.__dg = true;
  var trigger = $("[data-dg-dropdown-trigger]", dd) || $("button", dd);
  var menu = $(".dg-menu", dd);
  if (!trigger || !menu) return;
  menu.hidden = true;
  trigger.setAttribute("aria-haspopup", "true");
  trigger.setAttribute("aria-expanded", "false");
  trigger.addEventListener("click", function (e) {
    e.stopPropagation();
    var willOpen = menu.hidden;
    closeAllMenus(false);
    if (willOpen) {
      menu.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      var f = $(FOCUSABLE, menu); if (f) f.focus();
    } else {
      menu.classList.add("is-closing");
      trigger.setAttribute("aria-expanded", "false");
      setTimeout(function () { menu.classList.remove("is-closing"); menu.hidden = true; }, DUR);
    }
  });
  menu.addEventListener("click", function (e) {
    e.stopPropagation();
    if (e.target.closest(".dg-menu-item")) {
      menu.classList.add("is-closing");
      trigger.setAttribute("aria-expanded", "false");
      setTimeout(function () { menu.classList.remove("is-closing"); menu.hidden = true; }, DUR);
    }
  });
}

export function closeAllMenus(animate) {
  $all(".dg-dropdown .dg-menu").forEach(function (m) {
    if (!m.hidden && animate) {
      m.classList.add("is-closing");
      setTimeout(function () { m.classList.remove("is-closing"); m.hidden = true; }, DUR);
    } else {
      m.hidden = true;
    }
  });
  $all("[data-dg-dropdown-trigger],.dg-dropdown button[aria-expanded]").forEach(function (t) { t.setAttribute("aria-expanded", "false"); });
}
