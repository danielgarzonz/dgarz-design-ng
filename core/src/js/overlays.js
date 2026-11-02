import { $, $all, FOCUSABLE, DUR, openStack, target } from './utils.js';

var themeColorPrev = null;

function cssColorToHex(color) {
  var value = String(color || '').trim();
  if (!value) return '#ececee';
  if (value.charAt(0) === '#' && (value.length === 4 || value.length === 7)) return value;
  var match = value.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (!match) return value;
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
  if (el.classList && el.classList.contains('dg-modal-full')) return el;
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
  var header = modal && $('.dg-modal-header', modal);
  if (header) {
    var bg = getComputedStyle(header).backgroundColor;
    if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') return bg;
  }
  var probe = document.createElement('span');
  probe.style.cssText = 'position:absolute;left:-9999px;background:var(--dg-surface-3)';
  (modal || document.body).appendChild(probe);
  var resolved = getComputedStyle(probe).backgroundColor;
  probe.parentNode.removeChild(probe);
  return resolved || '#ececee';
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
  if (focusEl && focusEl.focus) focusEl.focus();
  openStack.push({ el: el, backdrop: backdrop, prevFocus: prevFocus });
  document.body.style.overflow = "hidden";
  syncModalPhoneBar();
}

export function closeOverlay(el) {
  var idx = el ? indexOf(el) : openStack.length - 1;
  if (idx < 0) return;
  var o = openStack[idx];
  o.el.setAttribute("aria-hidden", "true");
  openStack.splice(idx, 1);
  if (!openStack.length) document.body.style.overflow = "";
  if (o.prevFocus && o.prevFocus.focus) o.prevFocus.focus();
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
        }).catch(function () { /* A repeated click or closing can interrupt resizing. */ });
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
