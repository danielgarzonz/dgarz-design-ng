import { $ } from './utils.js';

export function wireCollapse(trigger) {
  if (trigger.__dg) return; trigger.__dg = true;
  var id = trigger.getAttribute("data-dg-collapse");
  var panel = $(id);
  if (!panel) return;
  if (panel.id) trigger.setAttribute("aria-controls", panel.id);
  var isOpen = panel.classList.contains("is-open");
  panel.style.maxHeight = isOpen ? panel.scrollHeight + "px" : "0";
  trigger.setAttribute("aria-expanded", String(isOpen));
  trigger.addEventListener("click", function () {
    var open = !panel.classList.contains("is-open");
    panel.classList.toggle("is-open", open);
    panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0";
    trigger.setAttribute("aria-expanded", String(open));
    trigger.dispatchEvent(new CustomEvent("dg:collapse", { detail: { open: open }, bubbles: true }));
  });
}
