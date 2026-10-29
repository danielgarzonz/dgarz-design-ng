import { $, $all, FOCUSABLE } from './utils.js';

export function wirePopover(trigger) {
  if (trigger.__dg) return; trigger.__dg = true;
  var id = trigger.getAttribute("data-dg-popover");
  var pop = id ? $(id) : trigger.nextElementSibling;
  if (!pop) return;
  pop.hidden = true;
  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.setAttribute("aria-expanded", "false");
  trigger.addEventListener("click", function (e) {
    e.stopPropagation();
    var willOpen = pop.hidden;
    document.querySelectorAll(".dg-popover").forEach(function (p) { p.hidden = true; });
    pop.hidden = !willOpen;
    trigger.setAttribute("aria-expanded", String(willOpen));
    if (willOpen) { var f = $all(FOCUSABLE, pop)[0]; if (f) f.focus(); }
  });
  document.addEventListener("click", function () { pop.hidden = true; trigger.setAttribute("aria-expanded", "false"); });
  pop.addEventListener("click", function (e) { e.stopPropagation(); });
}
