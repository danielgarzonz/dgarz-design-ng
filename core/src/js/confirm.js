import { DUR } from './utils.js';
import { openOverlay, closeOverlay } from './overlays.js';

var ICON_SYMBOL = { success: '#dg-check', warning: '#dg-alert-tri', danger: '#dg-x', info: '#dg-info' };
var uid = 0;

function escHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildDialog(opts) {
  uid++;
  var titleId = 'dgc-title-' + uid;

  var iconHtml = opts.icon
    ? '<span class="dg-modal-icon is-' + opts.icon + '">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
          '<use href="' + (ICON_SYMBOL[opts.icon] || ICON_SYMBOL.info) + '"></use>' +
        '</svg>' +
      '</span>'
    : '';

  var titleHtml = opts.title
    ? '<div class="dg-modal-header"><h3 class="dg-modal-title" id="' + titleId + '">' + escHtml(opts.title) + '</h3></div>'
    : '';

  var inputHtml = opts.input
    ? '<div class="dg-field dg-mt-3"><input type="' + (opts.inputType || 'text') + '" class="dg-input" data-dgc-input' +
        (opts.inputPlaceholder ? ' placeholder="' + escHtml(opts.inputPlaceholder) + '"' : '') +
        (opts.inputValue ? ' value="' + escHtml(opts.inputValue) + '"' : '') + '></div>'
    : '';

  var bodyHtml =
    '<div class="dg-modal-body">' +
      (opts.text ? '<p>' + escHtml(opts.text) + '</p>' : '') +
      inputHtml +
      '<div class="dg-confirm-error" data-dgc-error hidden aria-live="polite"></div>' +
    '</div>';

  var cancelHtml = opts.cancelText !== null
    ? '<button type="button" class="dg-btn dg-btn-ghost" data-dgc-cancel>' + escHtml(opts.cancelText) + '</button>'
    : '';
  var confirmHtml =
    '<button type="button" class="dg-btn' + (opts.icon === 'danger' ? ' dg-btn-danger' : '') + '" data-dgc-confirm>' +
      escHtml(opts.confirmText) +
    '</button>';

  var backdrop = document.createElement('div');
  backdrop.className = 'dg-modal-backdrop';
  backdrop.setAttribute('data-dg-backdrop', '');
  backdrop.hidden = true;
  backdrop.innerHTML =
    '<div class="dg-modal dg-modal-sm dg-modal-confirm" role="alertdialog" aria-modal="true"' +
        (opts.title ? ' aria-labelledby="' + titleId + '"' : '') + '>' +
      iconHtml + titleHtml + bodyHtml +
      '<div class="dg-modal-footer">' + cancelHtml + confirmHtml + '</div>' +
    '</div>';
  document.body.appendChild(backdrop);
  return backdrop;
}

function run(opts) {
  var backdrop = buildDialog(opts);
  var cancelBtn = backdrop.querySelector('[data-dgc-cancel]');
  var confirmBtn = backdrop.querySelector('[data-dgc-confirm]');
  var errorEl = backdrop.querySelector('[data-dgc-error]');
  var inputEl = backdrop.querySelector('[data-dgc-input]');
  var cancelValue = opts.input ? null : false;

  return new Promise(function (resolve) {
    var settled = false;
    var obs = (typeof MutationObserver !== 'undefined') ? new MutationObserver(function () {
      if (backdrop.getAttribute('aria-hidden') === 'true') settle(cancelValue);
    }) : null;
    if (obs) obs.observe(backdrop, { attributes: true, attributeFilter: ['aria-hidden'] });

    function settle(value) {
      if (settled) return;
      settled = true;
      if (obs) obs.disconnect();
      closeOverlay(backdrop);
      setTimeout(function () { backdrop.remove(); }, DUR);
      resolve(value);
    }

    if (cancelBtn) cancelBtn.addEventListener('click', function () { settle(cancelValue); });

    confirmBtn.addEventListener('click', function () {
      var value = opts.input ? (inputEl ? inputEl.value : '') : true;
      if (!opts.preConfirm) { settle(value); return; }
      errorEl.hidden = true;
      confirmBtn.classList.add('is-loading');
      confirmBtn.disabled = true;
      if (cancelBtn) cancelBtn.disabled = true;
      Promise.resolve()
        .then(function () { return opts.preConfirm(value); })
        .then(function () { settle(value); })
        .catch(function (err) {
          confirmBtn.classList.remove('is-loading');
          confirmBtn.disabled = false;
          if (cancelBtn) cancelBtn.disabled = false;
          errorEl.textContent = (err && err.message) || String(err);
          errorEl.hidden = false;
        });
    });

    openOverlay(backdrop);

    if (inputEl) {
      inputEl.focus();
      if (inputEl.select) inputEl.select();
    } else {
      var focusCancel = opts.focusCancel != null ? opts.focusCancel : (opts.icon === 'danger');
      var focusTarget = (focusCancel && cancelBtn) ? cancelBtn : confirmBtn;
      focusTarget.focus();
    }
  });
}

export function dgConfirm(opts) {
  opts = opts || {};
  return run({
    title: opts.title,
    text: opts.text,
    icon: opts.icon || 'warning',
    confirmText: opts.confirmText || 'Confirmar',
    cancelText: opts.cancelText === null ? null : (opts.cancelText || 'Cancelar'),
    focusCancel: opts.focusCancel,
    preConfirm: opts.preConfirm
  });
}

export function dgAlert(opts) {
  opts = opts || {};
  return run({
    title: opts.title,
    text: opts.text,
    icon: opts.icon || 'info',
    confirmText: opts.confirmText || 'Aceptar',
    cancelText: null,
    focusCancel: false
  }).then(function () {});
}

export function dgPrompt(opts) {
  opts = opts || {};
  return run({
    title: opts.title,
    text: opts.text,
    icon: opts.icon,
    input: true,
    inputType: opts.inputType,
    inputValue: opts.inputValue,
    inputPlaceholder: opts.inputPlaceholder,
    confirmText: opts.confirmText || 'Aceptar',
    cancelText: opts.cancelText === null ? null : (opts.cancelText || 'Cancelar'),
    preConfirm: opts.preConfirm
  });
}
