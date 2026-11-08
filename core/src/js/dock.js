import { $all } from './utils.js';
import { syncIndicator, wireIndicator } from './indicator.js';

// Dock: one active item at a time. Buttons expose aria-pressed; links use
// aria-current="page". Arrow keys move focus; Enter/Space (or click) activates.
// Emits dg:change { value, index } on the dock.
export function wireDock(dock) {
  if (dock.__dg) return; dock.__dg = true;
  var items = $all('.dg-dock-item', dock);

  function activate(item) {
    items.forEach(function (i) {
      var on = i === item;
      i.classList.toggle('is-active', on);
      if (i.tagName === 'A') {
        if (on) i.setAttribute('aria-current', 'page'); else i.removeAttribute('aria-current');
      } else {
        i.setAttribute('aria-pressed', String(on));
      }
    });
    syncIndicator(dock);
    dock.dispatchEvent(new CustomEvent('dg:change', {
      detail: { value: item.getAttribute('data-value') || item.getAttribute('aria-label') || item.textContent.trim(), index: items.indexOf(item) }
    }));
  }

  items.forEach(function (item, index) {
    if (item.tagName !== 'A') item.setAttribute('aria-pressed', String(item.classList.contains('is-active')));
    item.addEventListener('click', function () {
      if (!item.classList.contains('is-active')) activate(item);
    });
    item.addEventListener('keydown', function (e) {
      var dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      items[(index + dir + items.length) % items.length].focus();
    });
  });
  wireIndicator(dock);
}
