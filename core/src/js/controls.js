import { $all } from './utils.js';

/* Number with − / + : <div class="dg-number"><button data-step="-1">…<input
   class="dg-input" type="number" min max step>…<button data-step="1">. The
   buttons use the input's own min, max and step, and turn off at the limits. */
export function wireNumber(wrap) {
  if (wrap.__dgNumber) return;
  wrap.__dgNumber = true;
  var input = wrap.querySelector('input');
  var buttons = $all('[data-step]', wrap);
  if (!input) return;
  function sync() {
    var v = parseFloat(input.value);
    var min = input.min === '' ? -Infinity : parseFloat(input.min);
    var max = input.max === '' ? Infinity : parseFloat(input.max);
    buttons.forEach(function (b) {
      var down = parseFloat(b.dataset.step) < 0;
      b.disabled = input.disabled || (!isNaN(v) && (down ? v <= min : v >= max));
    });
  }
  buttons.forEach(function (b) {
    if (!b.hasAttribute('type')) b.type = 'button';
    b.addEventListener('click', function () {
      if (input.value === '' && input.min !== '') input.value = input.min;
      else if (parseFloat(b.dataset.step) < 0) input.stepDown(); else input.stepUp();
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });
  input.addEventListener('input', sync);
  sync();
}

/* One-time code: <div class="dg-otp"> with one .dg-otp-input per character.
   Typing moves forward, Backspace on an empty box goes back, arrows move,
   and a pasted code fills every box. When all are filled the group gets
   data-value and fires "dg:complete" with { value }. */
export function wireOtp(group) {
  if (group.__dgOtp) return;
  group.__dgOtp = true;
  var boxes = $all('.dg-otp-input', group);
  var onlyDigits = group.dataset.otpType !== 'text';
  function clean(v) { return onlyDigits ? v.replace(/\D/g, '') : v.replace(/[^0-9A-Za-z]/g, '').toUpperCase(); }
  function value() { return boxes.map(function (b) { return b.value; }).join(''); }
  function check() {
    var v = value();
    group.dataset.value = v;
    if (v.length === boxes.length) group.dispatchEvent(new CustomEvent('dg:complete', { bubbles: true, detail: { value: v } }));
  }
  function fill(from, text) {
    var chars = clean(text).split('');
    for (var i = from; i < boxes.length && chars.length; i++) boxes[i].value = chars.shift();
    var next = Math.min(from + clean(text).length, boxes.length - 1);
    boxes[next].focus();
    check();
  }
  boxes.forEach(function (box, i) {
    box.setAttribute('maxlength', '1');
    if (onlyDigits) box.setAttribute('inputmode', 'numeric');
    box.setAttribute('autocomplete', i === 0 ? 'one-time-code' : 'off');
    box.addEventListener('input', function () {
      var v = clean(box.value);
      if (v.length > 1) { box.value = ''; fill(i, v); return; }
      box.value = v;
      if (v && i < boxes.length - 1) boxes[i + 1].focus();
      check();
    });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && !box.value && i > 0) { e.preventDefault(); boxes[i - 1].value = ''; boxes[i - 1].focus(); check(); }
      if (e.key === 'ArrowLeft' && i > 0) { e.preventDefault(); boxes[i - 1].focus(); }
      if (e.key === 'ArrowRight' && i < boxes.length - 1) { e.preventDefault(); boxes[i + 1].focus(); }
    });
    box.addEventListener('paste', function (e) {
      var text = (e.clipboardData || window.clipboardData).getData('text');
      if (!text) return;
      e.preventDefault();
      fill(i, text);
    });
    box.addEventListener('focus', function () { box.select(); });
  });
}

/* Character counter: <span class="dg-counter" data-counter-for="id">. The limit
   is the field's maxlength, or data-max when typing past it is allowed.
   is-near from 90 %, is-over past the limit. */
export function wireCounter(counter) {
  if (counter.__dgCounter) return;
  var field = document.getElementById(counter.getAttribute('data-counter-for'));
  if (!field) return;
  counter.__dgCounter = true;
  var max = field.maxLength > 0 ? field.maxLength : +counter.dataset.max || 0;
  function sync() {
    var n = field.value.length;
    counter.textContent = max ? n + ' / ' + max : String(n);
    counter.classList.toggle('is-near', !!max && n >= max * 0.9 && n <= max);
    counter.classList.toggle('is-over', !!max && n > max);
  }
  field.addEventListener('input', sync);
  sync();
}

/* textarea[data-autosize]: CSS field-sizing grows it where supported;
   elsewhere the height follows the content here. */
export function wireAutosize(area) {
  if (area.__dgAutosize) return;
  area.__dgAutosize = true;
  if (window.CSS && CSS.supports && CSS.supports('field-sizing', 'content')) return;
  function fit() {
    area.style.height = 'auto';
    area.style.height = area.scrollHeight + area.offsetHeight - area.clientHeight + 'px';
  }
  area.addEventListener('input', fit);
  fit();
}

/* Free tags: <div class="dg-tags" data-max="5"><input class="dg-tags-input">
   [<input type="hidden" name="…">]</div>. Enter, comma or Tab adds the text,
   Backspace on an empty box removes the last tag, a pasted list is split on
   commas and new lines. Starting tags come from data-value ("a,b"). The value
   goes to the hidden input and data-value; "dg:change" carries { values }. */
export function wireTags(wrap) {
  if (wrap.__dgTags) return;
  var input = wrap.querySelector('.dg-tags-input');
  if (!input) return;
  wrap.__dgTags = true;
  var hidden = wrap.querySelector('input[type="hidden"]');
  var max = +wrap.dataset.max || Infinity;
  var values = [];
  function render() {
    $all('.dg-combobox-tag', wrap).forEach(function (t) { t.remove(); });
    values.forEach(function (v, i) {
      var tag = document.createElement('span');
      tag.className = 'dg-combobox-tag';
      var text = document.createElement('span');
      text.textContent = v;
      var x = document.createElement('button');
      x.type = 'button';
      x.className = 'dg-combobox-tag-remove';
      x.setAttribute('aria-label', 'Quitar ' + v);
      x.textContent = '✕';
      x.addEventListener('click', function (e) { e.stopPropagation(); remove(i); input.focus(); });
      tag.appendChild(text);
      tag.appendChild(x);
      wrap.insertBefore(tag, input);
    });
  }
  function commit(silent) {
    var v = values.join(',');
    wrap.dataset.value = v;
    if (hidden) hidden.value = v;
    wrap.classList.toggle('is-full', values.length >= max);
    if (!silent) wrap.dispatchEvent(new CustomEvent('dg:change', { bubbles: true, detail: { values: values.slice() } }));
  }
  function add(text) {
    var added = false;
    String(text).split(/[,\n]/).forEach(function (raw) {
      var v = raw.trim();
      if (!v || values.length >= max) return;
      var dup = values.findIndex(function (x) { return x.toLowerCase() === v.toLowerCase(); });
      if (dup > -1) {
        var tag = $all('.dg-combobox-tag', wrap)[dup];
        if (tag) { tag.classList.add('is-flash'); setTimeout(function () { tag.classList.remove('is-flash'); }, 600); }
        return;
      }
      values.push(v);
      added = true;
    });
    if (added) { render(); commit(); }
  }
  function remove(i) { values.splice(i, 1); render(); commit(); }
  input.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ',' || (e.key === 'Tab' && input.value.trim())) && !e.isComposing) {
      e.preventDefault();
      add(input.value);
      input.value = '';
    } else if (e.key === 'Backspace' && !input.value && values.length) {
      remove(values.length - 1);
    }
  });
  input.addEventListener('paste', function (e) {
    var text = (e.clipboardData || window.clipboardData).getData('text');
    if (!/[,\n]/.test(text)) return;
    e.preventDefault();
    add(input.value + text);
    input.value = '';
  });
  input.addEventListener('blur', function () { if (input.value.trim()) { add(input.value); input.value = ''; } });
  wrap.addEventListener('click', function (e) { if (e.target === wrap) input.focus(); });
  var start = wrap.dataset.value || (hidden && hidden.value) || '';
  start.split(',').forEach(function (raw) { var v = raw.trim(); if (v && values.length < max && values.indexOf(v) < 0) values.push(v); });
  render();
  commit(true);
}
