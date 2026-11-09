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

  // Focus variant: the active item sits in the center at full size and the
  // others shrink with their distance (circular, so it loops). Positions are
  // CSS variables (--dg-focus-x / -s / -o / -z) the stylesheet transitions.
  var focus = el.classList.contains("dg-carousel-focus");
  var FOCUS_SCALES = [1, 0.7, 0.5, 0.4];
  function layoutFocus() {
    var w = items[0].offsetWidth;
    var gap = parseFloat(getComputedStyle(el).getPropertyValue("--dg-focus-gap")) || 12;
    items.forEach(function (it, i) {
      var d = ((i - current) % total + total) % total;
      if (d > total / 2) d -= total;
      var a = Math.abs(d);
      var x = 0;
      for (var k = 1; k <= a; k++) {
        x += w * FOCUS_SCALES[Math.min(k - 1, 3)] / 2 + gap + w * FOCUS_SCALES[Math.min(k, 3)] / 2;
      }
      it.style.setProperty("--dg-focus-x", (d < 0 ? -x : x) + "px");
      it.style.setProperty("--dg-focus-s", FOCUS_SCALES[Math.min(a, 3)]);
      it.style.setProperty("--dg-focus-o", a >= 3 ? 0 : 1);
      it.style.setProperty("--dg-focus-z", 10 - a);
      it.classList.toggle("is-active", a === 0);
      it.setAttribute("aria-hidden", String(a !== 0));
      it.setAttribute("role", "group");
      it.setAttribute("aria-label", (i + 1) + " de " + total);
    });
  }

  function goTo(n) {
    if (focus) {
      current = ((n % total) + total) % total;
      layoutFocus();
      el.dispatchEvent(new CustomEvent("dg:slide", { detail: { index: current }, bubbles: true }));
      return;
    }
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
    pause.className = 'dg-carousel-pause';
    el.appendChild(pause);
    // Icon only, thin strokes: pause (two lines) while playing, play (outlined triangle) while paused.
    var ICON_PAUSE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 5v14M15 5v14"/></svg>';
    var ICON_PLAY = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M8 5.5v13l10-6.5z"/></svg>';
    function syncTimer() {
      clearInterval(timer);
      pause.innerHTML = paused ? ICON_PLAY : ICON_PAUSE;
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
  if (focus) {
    // Entrance: every slide starts stacked in the center and then spreads out
    // to its place (slower transition while .is-entering is on).
    items.forEach(function (it, i) {
      it.style.setProperty("--dg-focus-x", "0px");
      it.style.setProperty("--dg-focus-s", "1");
      it.style.setProperty("--dg-focus-o", "1");
      it.style.setProperty("--dg-focus-z", i === 0 ? 10 : 1);
    });
    el.classList.add("is-entering");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        goTo(0);
        setTimeout(function () { el.classList.remove("is-entering"); }, 1700);
      });
    });
  } else {
    goTo(0);
  }
}
