import { $, $all } from './utils.js';

export function wireCarousel(el) {
  if (el.__dg) return; el.__dg = true;
  var inner = $(".dg-carousel-inner", el);
  if (!inner) return;
  var items = $all(".dg-carousel-item", el);
  if (!items.length) return;
  var dots = $all("[data-dg-carousel-go]", el);
  var total = items.length;
  var current = 0;

  function goTo(n) {
    current = ((n % total) + total) % total;
    inner.style.transform = "translateX(-" + current * 100 + "%)";
    items.forEach(function (it, i) { it.classList.toggle("is-active", i === current); });
    dots.forEach(function (d, i) { d.classList.toggle("is-active", i === current); });
    el.dispatchEvent(new CustomEvent("dg:slide", { detail: { index: current }, bubbles: true }));
  }

  var prevBtn = $(".dg-carousel-prev", el);
  var nextBtn = $(".dg-carousel-next", el);
  if (prevBtn) prevBtn.addEventListener("click", function () { goTo(current - 1); });
  if (nextBtn) nextBtn.addEventListener("click", function () { goTo(current + 1); });
  dots.forEach(function (d) {
    d.addEventListener("click", function () { goTo(+d.getAttribute("data-dg-carousel-go")); });
  });

  el.setAttribute("tabindex", "0");
  el.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") goTo(current - 1);
    if (e.key === "ArrowRight") goTo(current + 1);
  });

  var startX = 0, startY = 0;
  el.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }, { passive: true });
  el.addEventListener("touchend", function (e) {
    var dx = startX - e.changedTouches[0].clientX;
    var dy = Math.abs(startY - e.changedTouches[0].clientY);
    if (Math.abs(dx) > 40 && dy < 60) goTo(dx > 0 ? current + 1 : current - 1);
  });

  var delay = +el.getAttribute("data-dg-carousel-autoplay");
  if (delay > 0) {
    var timer = setInterval(function () { goTo(current + 1); }, delay);
    el.addEventListener("mouseenter", function () { clearInterval(timer); });
    el.addEventListener("mouseleave", function () { timer = setInterval(function () { goTo(current + 1); }, delay); });
    el.addEventListener("focusin",   function () { clearInterval(timer); });
    el.addEventListener("focusout",  function () { timer = setInterval(function () { goTo(current + 1); }, delay); });
  }

  el.__dgGoTo = goTo;
  goTo(0);
}
