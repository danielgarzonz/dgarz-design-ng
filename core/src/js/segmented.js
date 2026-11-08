import { $all } from './utils.js';
import { syncIndicator, wireIndicator } from './indicator.js';

export function wireSegmented(group) {
  if (group.__dg) return; group.__dg = true;
  wireIndicator(group);
  group.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    $all("button", group).forEach(function (x) { x.classList.remove("is-active"); });
    b.classList.add("is-active");
    syncIndicator(group);
    group.dispatchEvent(new CustomEvent("dg:change", { detail: { value: b.textContent.trim() } }));
  });
}
