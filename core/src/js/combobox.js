export function wireCombobox(el) {
  if (el.__dgCombo) return;
  el.__dgCombo = true;

  var control  = el.querySelector('.dg-combobox-control');
  var input    = el.querySelector('.dg-combobox-input');
  var dropdown = el.querySelector('.dg-combobox-dropdown');
  var list     = el.querySelector('.dg-combobox-list');
  var options  = Array.prototype.slice.call(el.querySelectorAll('.dg-combobox-option'));
  var isMulti  = !el.hasAttribute('data-single');
  var selected = [];
  var focused  = -1;

  if (!control || !input || !dropdown || !list) return;

  // Hidden native select for form integration
  var nativeId = el.dataset.name;
  var native   = nativeId ? document.getElementById(nativeId) : null;

  /* ---- Open / Close ---- */
  function open() {
    el.classList.add('is-open');
    dropdown.removeAttribute('hidden');
    filterOptions('');
    input.value = '';
    focused = -1;
    setFocus(-1);
  }
  function close() {
    el.classList.remove('is-open');
    dropdown.setAttribute('hidden', '');
    input.blur();
  }
  function toggle() { el.classList.contains('is-open') ? close() : open(); }

  /* ---- Selection ---- */
  function selectOption(opt) {
    var val   = opt.dataset.value;
    var label = opt.querySelector('.dg-combobox-label') ? opt.querySelector('.dg-combobox-label').textContent : opt.textContent.trim();

    if (!isMulti) {
      selected = [{ val: val, label: label }];
      options.forEach(function(o) { o.classList.remove('is-selected'); });
      opt.classList.add('is-selected');
      renderTags();
      syncNative();
      el.dispatchEvent(new CustomEvent('dg:change', { bubbles: true, detail: { value: selected } }));
      close();
      return;
    }

    var idx = selected.findIndex(function(s) { return s.val === val; });
    if (idx >= 0) {
      selected.splice(idx, 1);
      opt.classList.remove('is-selected');
    } else {
      selected.push({ val: val, label: label });
      opt.classList.add('is-selected');
    }
    renderTags();
    syncNative();
    el.dispatchEvent(new CustomEvent('dg:change', { bubbles: true, detail: { value: selected } }));
  }

  function removeTag(val) {
    selected = selected.filter(function(s) { return s.val !== val; });
    var opt  = options.find(function(o) { return o.dataset.value === val; });
    if (opt) opt.classList.remove('is-selected');
    renderTags();
    syncNative();
    el.dispatchEvent(new CustomEvent('dg:change', { bubbles: true, detail: { value: selected } }));
  }

  /* ---- Render tags ---- */
  function renderTags() {
    control.querySelectorAll('.dg-combobox-tag').forEach(function(t) { t.remove(); });
    var placeholder = el.dataset.placeholder || 'Selecciona…';
    input.placeholder = selected.length ? '' : placeholder;

    selected.forEach(function(s) {
      var tag = document.createElement('div');
      tag.className = 'dg-combobox-tag';
      tag.dataset.val = s.val;
      tag.innerHTML =
        '<span>' + escHtml(s.label) + '</span>' +
        '<span class="dg-combobox-tag-remove" role="button" aria-label="Eliminar ' + escHtml(s.label) + '">✕</span>';
      tag.querySelector('.dg-combobox-tag-remove').addEventListener('click', function(e) {
        e.stopPropagation();
        removeTag(s.val);
      });
      control.insertBefore(tag, input);
    });

    // Single mode: show label in input
    if (!isMulti && selected.length) {
      input.placeholder = selected[0].label;
    }
  }

  /* ---- Filter ---- */
  function filterOptions(query) {
    var q     = query.toLowerCase().trim();
    var count = 0;
    options.forEach(function(opt) {
      var text = opt.textContent.toLowerCase();
      var show = !q || text.includes(q);
      opt.classList.toggle('is-hidden', !show);
      if (show) count++;
    });
    var empty = list.querySelector('.dg-combobox-empty');
    if (count === 0) {
      if (!empty) {
        var em = document.createElement('div');
        em.className = 'dg-combobox-empty';
        em.textContent = 'Sin resultados';
        list.appendChild(em);
      }
    } else {
      if (empty) empty.remove();
    }
    focused = -1;
    setFocus(-1);
  }

  /* ---- Keyboard focus ---- */
  function visibleOptions() {
    return options.filter(function(o) { return !o.classList.contains('is-hidden'); });
  }
  function setFocus(idx) {
    options.forEach(function(o) { o.classList.remove('is-focused'); });
    var vis = visibleOptions();
    if (idx >= 0 && idx < vis.length) {
      vis[idx].classList.add('is-focused');
      vis[idx].scrollIntoView({ block: 'nearest' });
    }
    focused = idx;
  }

  /* ---- Native select sync ---- */
  function syncNative() {
    if (!native) return;
    Array.prototype.forEach.call(native.options, function(opt) {
      opt.selected = selected.some(function(s) { return s.val === opt.value; });
    });
    native.dispatchEvent(new Event('change', { bubbles: true }));
  }

  /* ---- Pre-select from native ---- */
  function initFromNative() {
    if (!native) return;
    Array.prototype.forEach.call(native.options, function(nOpt) {
      if (!nOpt.selected) return;
      var match = options.find(function(o) { return o.dataset.value === nOpt.value; });
      if (match) {
        match.classList.add('is-selected');
        selected.push({ val: nOpt.value, label: nOpt.textContent.trim() });
      }
    });
    renderTags();
  }

  /* ---- Events ---- */
  control.addEventListener('click', function(e) {
    if (e.target.closest('.dg-combobox-tag-remove')) return;
    toggle();
    if (el.classList.contains('is-open')) input.focus();
  });

  input.addEventListener('input', function() {
    filterOptions(input.value);
    if (!el.classList.contains('is-open')) open();
  });

  input.addEventListener('keydown', function(e) {
    var vis = visibleOptions();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocus(Math.min(focused + 1, vis.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocus(Math.max(focused - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (focused >= 0 && vis[focused]) selectOption(vis[focused]);
    } else if (e.key === 'Escape') {
      close();
    } else if (e.key === 'Backspace' && !input.value && selected.length) {
      removeTag(selected[selected.length - 1].val);
    }
  });

  list.addEventListener('click', function(e) {
    var opt = e.target.closest('.dg-combobox-option');
    if (opt) selectOption(opt);
  });

  document.addEventListener('click', function(e) {
    if (!el.contains(e.target)) close();
  });

  function escHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  /* ---- Init ---- */
  dropdown.setAttribute('hidden', '');
  renderTags();
  initFromNative();
}
