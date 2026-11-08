import { $, $all, FOCUSABLE, DUR, openStack, target } from './utils.js';

var themeColorPrev = null;

var colorCtx = null;
function cssColorToHex(color) {
  var value = String(color || '').trim();
  if (!value) return '#f8f8f8';
  if (value.charAt(0) === '#' && (value.length === 4 || value.length === 7)) return value;
  // Let the browser normalize any CSS color (oklab, color-mix, color()…) to sRGB.
  if (!/^rgba?\(/i.test(value)) {
    try {
      colorCtx = colorCtx || document.createElement('canvas').getContext('2d');
      colorCtx.fillStyle = '#f8f8f8';
      colorCtx.fillStyle = value;
      var normalized = String(colorCtx.fillStyle);
      if (normalized.charAt(0) === '#') return normalized;
      value = normalized;
    } catch (e) { return '#f8f8f8'; }
  }
  var match = value.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (!match) return '#f8f8f8';
  return '#' + [match[1], match[2], match[3]].map(function (part) {
    return ('0' + Number(part).toString(16)).slice(-2);
  }).join('');
}

/** iOS Safari often ignores in-place theme-color updates — remount as hex. */
function setThemeColor(color) {
  var hex = cssColorToHex(color);
  var old = document.getElementById('docThemeColor') || document.querySelector('meta[name="theme-color"]');
  var id = old && old.id ? old.id : 'docThemeColor';
  if (old) old.parentNode.removeChild(old);
  var meta = document.createElement('meta');
  meta.setAttribute('name', 'theme-color');
  meta.setAttribute('content', hex);
  meta.id = id;
  document.head.appendChild(meta);
  return meta;
}

function fullModalFrom(el) {
  if (!el) return null;
  // Full-screen modals and the top drawer both own the top edge of the screen.
  if (el.classList && (el.classList.contains('dg-modal-full') || el.classList.contains('dg-drawer-top'))) return el;
  return $('.dg-modal-full', el);
}

function activeFullModal() {
  for (var i = openStack.length - 1; i >= 0; i--) {
    var modal = fullModalFrom(openStack[i].el);
    if (modal) return modal;
  }
  return null;
}

function headerPhoneBarColor(modal) {
  var header = modal && $('.dg-modal-header, .dg-drawer-header', modal);
  if (header) {
    var bg = getComputedStyle(header).backgroundColor;
    if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') return bg;
  }
  var probe = document.createElement('span');
  probe.style.cssText = 'position:absolute;left:-9999px;background:var(--dg-modal-section-solid, #f8f8f8)';
  (modal || document.body).appendChild(probe);
  var resolved = getComputedStyle(probe).backgroundColor;
  probe.parentNode.removeChild(probe);
  return resolved || '#f8f8f8';
}

/** Keep the phone status bar in sync with the full-modal header. */
export function syncModalPhoneBar() {
  var modal = activeFullModal();
  if (modal) {
    if (themeColorPrev === null) {
      var current = document.getElementById('docThemeColor') || document.querySelector('meta[name="theme-color"]');
      themeColorPrev = current ? current.getAttribute('content') : '#ffffff';
    }
    // After paint so header background is resolved (not mid-animation setup).
    requestAnimationFrame(function () {
      setThemeColor(headerPhoneBarColor(modal));
    });
    return;
  }
  if (themeColorPrev !== null) {
    setThemeColor(themeColorPrev);
    themeColorPrev = null;
  }
}

/* Header titles stay on one line: when a title does not fit, shrink its font
   (down to 60% of its size, never below 14px) instead of truncating it. The
   CSS ellipsis remains only as a last resort for extremely long titles. */
export function fitModalTitles(root) {
  $all('.dg-modal-header .dg-modal-title', root || document).forEach(function (title) {
    title.style.fontSize = '';
    if (!title.clientWidth) return;
    var base = parseFloat(getComputedStyle(title).fontSize);
    if (title.scrollWidth <= title.clientWidth + 0.5) return;
    var min = Math.max(14, base * 0.6);
    var size = Math.max(min, Math.floor(base * title.clientWidth / title.scrollWidth * 2) / 2);
    title.style.fontSize = size + 'px';
    while (title.scrollWidth > title.clientWidth + 0.5 && size > min) {
      size = Math.max(min, size - 0.5);
      title.style.fontSize = size + 'px';
    }
  });
}

var fitTimer = null;
function refitOpenTitles() {
  clearTimeout(fitTimer);
  fitTimer = setTimeout(function () {
    openStack.forEach(function (o) { fitModalTitles(o.el); });
  }, 80);
}
if (typeof window !== 'undefined') {
  window.addEventListener('resize', refitOpenTitles);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refitOpenTitles);
}

export function openOverlay(el) {
  if (!el || !openStack.every(function (o) { return o.el !== el; })) return;
  var backdrop = target(el, "data-dg-backdrop");
  var prevFocus = document.activeElement;
  var dialog = $(".dg-modal", el);
  if (dialog) dialog.classList.remove("has-resized");
  // Reopening during the exit animation cancels the pending hide.
  clearTimeout(el.__dgCloseTimer);
  if (dialog) dialog.classList.remove("is-closing");
  el.classList.remove("is-closing");
  if (backdrop) backdrop.classList.remove("is-closing");
  el.hidden = false;
  if (backdrop) backdrop.hidden = false;
  el.setAttribute("aria-hidden", "false");
  var focusEl = $("[autofocus]", el) || $(FOCUSABLE, el) || el;
  // preventScroll: focusing must never move the page behind the overlay.
  if (focusEl && focusEl.focus) focusEl.focus({ preventScroll: true });
  openStack.push({ el: el, backdrop: backdrop, prevFocus: prevFocus });
  document.body.style.overflow = "hidden";
  fitModalTitles(el);
  syncModalPhoneBar();
}

export function closeOverlay(el) {
  var idx = el ? indexOf(el) : openStack.length - 1;
  if (idx < 0) return;
  var o = openStack[idx];
  o.el.setAttribute("aria-hidden", "true");
  openStack.splice(idx, 1);
  if (!openStack.length) document.body.style.overflow = "";
  if (o.prevFocus && o.prevFocus.focus) o.prevFocus.focus({ preventScroll: true });
  var inner = o.el.querySelector(".dg-modal") || null;
  if (inner && inner.__dgResizeAnimation) {
    inner.__dgResizeAnimation.cancel();
    inner.__dgResizeAnimation = null;
    inner.classList.remove('is-resizing');
  }
  if (inner) inner.classList.add("is-closing");
  o.el.classList.add("is-closing");
  if (o.backdrop) o.backdrop.classList.add("is-closing");
  syncModalPhoneBar();
  // Modal exit mirrors enter (--dg-dur-motion); drawers/menus use the same window.
  var exitMs = DUR;
  o.el.__dgCloseTimer = setTimeout(function () {
    if (inner) inner.classList.remove("is-closing");
    o.el.classList.remove("is-closing");
    o.el.hidden = true;
    if (o.backdrop) {
      o.backdrop.classList.remove("is-closing");
      o.backdrop.hidden = true;
    }
  }, exitMs);
}

export function indexOf(el) {
  for (var i = 0; i < openStack.length; i++)
    if (openStack[i].el === el || openStack[i].backdrop === el) return i;
  return -1;
}

export function closestOverlay(node) {
  return node.closest(".dg-modal-backdrop, .dg-drawer, [data-dg-overlay]");
}

// Optional control: preserve the same dialog, form values and focus while resizing.
export function wireModalResize(modal) {
  var buttons = $all('[data-dg-modal-resize]', modal);
  buttons.forEach(function (button) {
    if (button.__dgResize) return;
    button.__dgResize = true;
    button.addEventListener('click', function () {
      var before = modal.getBoundingClientRect();
      var beforeRadius = getComputedStyle(modal).borderRadius;
      if (modal.__dgResizeAnimation) modal.__dgResizeAnimation.cancel();
      // Keep entrance keyframes disabled after the temporary resize layer is removed.
      modal.classList.add('has-resized');
      modal.classList.remove('is-resizing');
      var full = modal.classList.toggle('dg-modal-full');
      modal.classList.remove('dg-modal-sm', 'dg-modal-lg');
      modal.classList.add('dg-modal-md');
      sync();
      var after = modal.getBoundingClientRect();
      var afterRadius = getComputedStyle(modal).borderRadius;
      if (modal.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Animate actual bounds, keeping text and controls at their natural scale.
        modal.classList.add('is-resizing');
        var animation = modal.animate([
          { left: before.left + 'px', top: before.top + 'px', width: before.width + 'px', height: before.height + 'px', borderRadius: beforeRadius },
          { left: after.left + 'px', top: after.top + 'px', width: after.width + 'px', height: after.height + 'px', borderRadius: afterRadius }
        ], { duration: 360, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' });
        modal.__dgResizeAnimation = animation;
        animation.finished.then(function () {
          if (modal.__dgResizeAnimation !== animation) return;
          modal.classList.remove('is-resizing');
          modal.__dgResizeAnimation = null;
          animation.cancel();
          fitModalTitles(modal);
        }).catch(function () { /* A repeated click or closing can interrupt resizing. */ });
      } else {
        fitModalTitles(modal);
      }
      syncModalPhoneBar();
      modal.dispatchEvent(new CustomEvent('dg:modal-resize', { bubbles: true, detail: { size: full ? 'full' : 'md' } }));
    });
  });
  function sync() {
    var full = modal.classList.contains('dg-modal-full');
    buttons.forEach(function (button) {
      var label = full ? 'Reducir a mediano' : 'Ampliar a pantalla completa';
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
      button.setAttribute('aria-pressed', String(full));
      var icon = $('[data-dg-modal-size-icon]', button);
      if (icon) icon.setAttribute('d', full
        ? 'M21 3l-7 7m0-6v6h6M3 21l7-7m-6 0h6v6'
        : 'M14 10l7-7m-6 0h6v6M10 14l-7 7m0-6v6h6');
    });
  }
  sync();
}
