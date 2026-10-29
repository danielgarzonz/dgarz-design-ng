/* ---- Gallery / Lightbox ---- */
export function wireGallery(gallery) {
  if (gallery.__dgGallery) return;
  gallery.__dgGallery = true;

  var items   = Array.prototype.slice.call(gallery.querySelectorAll('.dg-gallery-item'));
  var current = 0;

  var backdrop = document.createElement('div');
  backdrop.className = 'dg-lightbox-backdrop';
  backdrop.setAttribute('hidden', '');
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');
  backdrop.setAttribute('aria-label', 'Visor de imagen');
  backdrop.innerHTML =
    '<button class="dg-lightbox-close" aria-label="Cerrar">✕</button>' +
    '<button class="dg-lightbox-nav is-prev" aria-label="Anterior">‹</button>' +
    '<img class="dg-lightbox-img" alt="" />' +
    '<button class="dg-lightbox-nav is-next" aria-label="Siguiente">›</button>' +
    '<div class="dg-lightbox-caption"></div>';
  document.body.appendChild(backdrop);

  var img     = backdrop.querySelector('.dg-lightbox-img');
  var caption = backdrop.querySelector('.dg-lightbox-caption');

  function open(idx) {
    current = idx;
    show();
    backdrop.removeAttribute('hidden');
    backdrop.focus();
  }
  function close() { backdrop.setAttribute('hidden', ''); }
  function show() {
    var item   = items[current];
    var imgEl  = item.querySelector('img');
    img.src    = imgEl ? (imgEl.dataset.src || imgEl.src) : '';
    img.alt    = imgEl ? imgEl.alt : '';
    caption.textContent = item.dataset.caption || img.alt || '';
    backdrop.querySelector('.is-prev').style.display = items.length > 1 ? '' : 'none';
    backdrop.querySelector('.is-next').style.display = items.length > 1 ? '' : 'none';
  }
  function prev() { current = (current - 1 + items.length) % items.length; show(); }
  function next() { current = (current + 1) % items.length; show(); }

  items.forEach(function(item, i) {
    item.addEventListener('click', function() { open(i); });
  });

  backdrop.querySelector('.dg-lightbox-close').addEventListener('click', close);
  backdrop.querySelector('.is-prev').addEventListener('click', function(e) { e.stopPropagation(); prev(); });
  backdrop.querySelector('.is-next').addEventListener('click', function(e) { e.stopPropagation(); next(); });
  backdrop.addEventListener('click', function(e) { if (e.target === backdrop) close(); });
  document.addEventListener('keydown', function(e) {
    if (backdrop.hasAttribute('hidden')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   prev();
    if (e.key === 'ArrowRight')  next();
  });
}

/* ---- FAQ ---- */
export function wireFAQ(faq) {
  if (faq.__dgFaq) return;
  faq.__dgFaq = true;

  var items    = Array.prototype.slice.call(faq.querySelectorAll('.dg-faq-item'));
  var search   = faq.querySelector('.dg-faq-search');

  items.forEach(function(item) {
    var question = item.querySelector('.dg-faq-question');
    var answer   = item.querySelector('.dg-faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', function() {
      var open = item.classList.contains('is-open');
      // Close all
      items.forEach(function(i) { i.classList.remove('is-open'); });
      if (!open) item.classList.add('is-open');
    });
  });

  if (search) {
    search.addEventListener('input', function() {
      var q = search.value.toLowerCase().trim();
      items.forEach(function(item) {
        var text = item.textContent.toLowerCase();
        item.classList.toggle('is-hidden', q.length > 0 && !text.includes(q));
      });
    });
  }
}

/* ---- Nested sidebar nav ---- */
export function wireNavToggle(toggle) {
  if (toggle.__dgNavToggle) return;
  toggle.__dgNavToggle = true;

  var sub = toggle.nextElementSibling;
  if (!sub || !sub.classList.contains('dg-nav-sub')) return;

  toggle.addEventListener('click', function() {
    var open = toggle.classList.contains('is-expanded');
    toggle.classList.toggle('is-expanded', !open);
    sub.classList.toggle('is-open', !open);
    toggle.setAttribute('aria-expanded', String(!open));
  });
  toggle.setAttribute('aria-expanded', 'false');
}

/* ---- Inline table editing ---- */
export function wireTableEditable(table) {
  if (table.__dgTableEdit) return;
  table.__dgTableEdit = true;

  table.addEventListener('dblclick', function(e) {
    var td = e.target.closest('td.is-editable');
    if (!td || td.querySelector('.dg-td-edit')) return;

    var original = td.textContent.trim();
    td.innerHTML =
      '<input class="dg-td-edit" value="' + escHtml(original) + '" />' +
      '<div class="dg-td-actions">' +
        '<button class="dg-td-save" type="button">Guardar</button>' +
        '<button class="dg-td-cancel" type="button">Cancelar</button>' +
      '</div>';

    var input = td.querySelector('.dg-td-edit');
    input.focus();
    input.select();

    td.querySelector('.dg-td-save').addEventListener('click', function() {
      var val = input.value.trim() || original;
      td.textContent = val;
      table.dispatchEvent(new CustomEvent('dg:cell-saved', { bubbles: true, detail: { td: td, value: val, original: original } }));
    });
    td.querySelector('.dg-td-cancel').addEventListener('click', function() { td.textContent = original; });
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter')  td.querySelector('.dg-td-save').click();
      if (e.key === 'Escape') td.querySelector('.dg-td-cancel').click();
    });
  });
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
