import { $, $all } from './utils.js';

export function wireAccordion(acc) {
  if (acc.__dg) return; acc.__dg = true;
  var single = acc.getAttribute("data-dg-accordion") === "single";
  $all(".dg-accordion-trigger", acc).forEach(function (trig) {
    var item = trig.closest(".dg-accordion-item");
    trig.setAttribute("aria-expanded", item.classList.contains("is-open") ? "true" : "false");
    trig.addEventListener("click", function () {
      var willOpen = !item.classList.contains("is-open");
      if (single) $all(".dg-accordion-item", acc).forEach(function (it) {
        it.classList.remove("is-open"); var t = $(".dg-accordion-trigger", it); if (t) t.setAttribute("aria-expanded", "false");
      });
      item.classList.toggle("is-open", willOpen);
      trig.setAttribute("aria-expanded", String(willOpen));
    });
  });
}
