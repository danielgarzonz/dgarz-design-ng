import { $, $all } from './utils.js';

export function wireCarousel(el) {
  if (el.__dg) return; el.__dg = true;
  var inner = $(".dg-carousel-inner", el);
  if (!inner) return;
  var items = $all(".dg-carousel-item", el);
  if (!items.length) return;
  var dots = $all("[data-dg-carousel-go]", el);
  var total = items.length;
  var vertical = el.classList.contains("dg-carousel-vertical");
  function visibleCount() {
    return Math.min(total, Math.max(1, parseInt(getComputedStyle(el).getPropertyValue('--dg-carousel-visible')) || 1));
  }
  el.setAttribute('role', 'region');
  el.setAttribute('aria-roledescription', 'carrusel');
  if (!el.hasAttribute('aria-label')) el.setAttribute('aria-label', 'Diapositivas');
  var current = 0;

  function goTo(n) {
    var visible = visibleCount();
    var positions = total - visible + 1;
    current = ((n % positions) + positions) % positions;
    inner.style.transform = (vertical ? "translateY(-" : "translateX(-") + current * (100 / visible) + "%)";
    items.forEach(function (it, i) {
      var active = i >= current && i < current + visible;
      it.classList.toggle("is-active", active);
      it.inert = !active;
      it.setAttribute('aria-hidden', String(!active));
      it.setAttribute('role', 'group');
      it.setAttribute('aria-label', (i + 1) + ' de ' + total);
    });
    dots.forEach(function (d, i) {
      d.hidden = i >= positions;
      d.classList.toggle("is-active", i === current);
      d.setAttribute('aria-current', String(i === current));
    });
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
    if (e.target !== el) return;
    if (e.key === (vertical ? "ArrowUp" : "ArrowLeft")) { e.preventDefault(); goTo(current - 1); }
    if (e.key === (vertical ? "ArrowDown" : "ArrowRight")) { e.preventDefault(); goTo(current + 1); }
  });

  var startX = 0, startY = 0;
  el.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }, { passive: true });
  el.addEventListener("touchend", function (e) {
    var dx = startX - e.changedTouches[0].clientX;
    var dy = Math.abs(startY - e.changedTouches[0].clientY);
    if (!vertical && Math.abs(dx) > 40 && dy < 60) goTo(dx > 0 ? current + 1 : current - 1);
  });

  var delay = +el.getAttribute("data-dg-carousel-autoplay");
  if (delay > 0) {
    var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var paused = motion.matches, hovered = false, focused = false, timer;
    var pause = document.createElement('button');
    pause.type = 'button';
    pause.className = 'dg-btn dg-btn-sm dg-carousel-pause';
    el.appendChild(pause);
    function syncTimer() {
      clearInterval(timer);
      pause.textContent = paused ? 'Reanudar' : 'Pausar';
      pause.setAttribute('aria-label', paused ? 'Reanudar carrusel' : 'Pausar carrusel');
      if (!paused && !hovered && !focused && !document.hidden && !motion.matches)
        timer = setInterval(function () { goTo(current + 1); }, delay);
    }
    pause.addEventListener('click', function () { paused = !paused; syncTimer(); });
    el.addEventListener('mouseenter', function () { hovered = true; syncTimer(); });
    el.addEventListener('mouseleave', function () { hovered = false; syncTimer(); });
    el.addEventListener('focusin', function () { focused = true; syncTimer(); });
    el.addEventListener('focusout', function (e) { focused = el.contains(e.relatedTarget); syncTimer(); });
    document.addEventListener('visibilitychange', syncTimer);
    motion.addEventListener('change', syncTimer);
    syncTimer();
  }
  window.addEventListener('resize', function () { goTo(current); });

  el.__dgGoTo = goTo;
  goTo(0);
}
