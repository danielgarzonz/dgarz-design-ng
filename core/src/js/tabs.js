import { $all, target } from './utils.js';
import { syncIndicator, wireIndicator } from './indicator.js';

export function wireTabs(group) {
  if (group.__dg) return; group.__dg = true;
  var tabs = $all(".dg-tab", group);
  group.setAttribute("role", "tablist");
  tabs.forEach(function (tab, i) {
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", tab.classList.contains("is-active") ? "true" : "false");
    tab.tabIndex = tab.classList.contains("is-active") ? 0 : -1;
    tab.addEventListener("click", function () { activateTab(tabs, tab); });
    tab.addEventListener("keydown", function (e) {
      var dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!dir) return; e.preventDefault();
      var next = tabs[(i + dir + tabs.length) % tabs.length];
      activateTab(tabs, next); next.focus();
    });
  });
  if (tabs.length) wireIndicator(tabs[0].closest(".dg-tabs"));
}

export function activateTab(tabs, tab) {
  var bar = tab.closest(".dg-tabs");
  tabs.forEach(function (t) {
    var on = t === tab;
    t.classList.toggle("is-active", on);
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    var p = target(t, "data-dg-panel");
    if (p) {
      p.hidden = !on;
      if (on) {
        p.classList.remove("dg-is-entering");
        void p.offsetWidth;
        p.classList.add("dg-is-entering");
        p.addEventListener("animationend", function () { p.classList.remove("dg-is-entering"); }, { once: true });
      }
    }
  });
  syncIndicator(bar);
}
