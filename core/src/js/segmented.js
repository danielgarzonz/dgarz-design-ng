import { $all } from './utils.js';

export function wireSegmented(group) {
  if (group.__dg) return; group.__dg = true;
  group.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    $all("button", group).forEach(function (x) { x.classList.remove("is-active"); });
    b.classList.add("is-active");
    group.dispatchEvent(new CustomEvent("dg:change", { detail: { value: b.textContent.trim() } }));
  });
}
