import { $all } from './utils.js';

var MOBILE = '(max-width: 640px)';
var ICON_OPEN = 'M4 9h16M4 15h16';
var ICON_CLOSE = 'M4 4l16 16M20 4L4 20';

export function wireNavbar(nav) {
  var btn = nav.querySelector('[data-dg-navbar-toggle]');
  if (!btn || btn.__dgNavbar) return;
  btn.__dgNavbar = true;
  var mq = window.matchMedia(MOBILE);
  var icon = btn.querySelector('[data-dg-navbar-icon]') || btn.querySelector('path');

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (icon) icon.setAttribute('d', open ? ICON_CLOSE : ICON_OPEN);
  }

  btn.addEventListener('click', function () {
    setOpen(btn.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      btn.focus();
    }
  });

  mq.addEventListener('change', function () {
    if (!mq.matches) setOpen(false);
  });
}

export function wireNavbars(ctx) {
  $all('.dg-navbar', ctx || document).forEach(wireNavbar);
}
