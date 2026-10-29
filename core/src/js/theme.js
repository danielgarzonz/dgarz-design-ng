export function applySavedTheme() {
  try { var s = localStorage.getItem("dg-theme"); if (s) document.documentElement.setAttribute("data-theme", s); } catch (e) {}
}

export function toggleTheme() {
  var d = document.documentElement.getAttribute("data-theme") === "dark";
  var next = d ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try { localStorage.setItem("dg-theme", next); } catch (e) {}
  document.dispatchEvent(new CustomEvent("dg:themechange", { detail: { theme: next } }));
}
