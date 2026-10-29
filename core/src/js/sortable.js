import { $, $all } from './utils.js';

export function wireSortable(table) {
  if (table.__dg) return; table.__dg = true;
  var ths = $all("th.dg-sortable", table);
  ths.forEach(function (th, col) {
    th.addEventListener("click", function () {
      var asc = th.getAttribute("aria-sort") !== "ascending";
      ths.forEach(function (o) { o.removeAttribute("aria-sort"); });
      th.setAttribute("aria-sort", asc ? "ascending" : "descending");
      var body = $("tbody", table); if (!body) return;
      var rows = $all("tr", body);
      rows.sort(function (a, b) {
        var x = cellVal(a, col), y = cellVal(b, col);
        if (typeof x === "number" && typeof y === "number") return asc ? x - y : y - x;
        return asc ? String(x).localeCompare(String(y)) : String(y).localeCompare(String(x));
      });
      rows.forEach(function (r) { body.appendChild(r); });
      table.dispatchEvent(new CustomEvent("dg:sort", { detail: { column: col, ascending: asc } }));
    });
  });
}

export function cellVal(row, col) {
  var cell = row.children[col]; if (!cell) return "";
  var raw = cell.getAttribute("data-sort");
  var txt = raw != null ? raw : cell.textContent.trim();
  var num = parseFloat(txt.replace(/[^0-9.\-]/g, ""));
  return (txt !== "" && !isNaN(num) && /[0-9]/.test(txt)) ? num : txt.toLowerCase();
}
