var IMAGE_TYPES = ['image/jpeg','image/png','image/gif','image/webp','image/svg+xml'];

function formatBytes(bytes) {
  if (bytes < 1024)       return bytes + ' B';
  if (bytes < 1048576)    return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function extOf(name) {
  var parts = name.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase().slice(0, 4) : 'FILE';
}

export function wireDropzone(zone) {
  if (zone.__dgDrop) return;
  zone.__dgDrop = true;

  var fileInput  = zone.querySelector('input[type="file"]');
  var listTarget = zone.dataset.list ? document.getElementById(zone.dataset.list) : null;
  var maxSizeMB  = parseFloat(zone.dataset.maxSize) || 0;
  var accept     = (zone.dataset.accept || '').split(',').map(function(s) { return s.trim().toLowerCase(); }).filter(Boolean);

  if (!listTarget) {
    listTarget = document.createElement('div');
    listTarget.className = 'dg-file-list';
    zone.insertAdjacentElement('afterend', listTarget);
  }

  /* ---- Drag events ---- */
  zone.addEventListener('dragover', function(e) {
    e.preventDefault();
    zone.classList.add('is-over');
  });
  zone.addEventListener('dragleave', function() { zone.classList.remove('is-over'); });
  zone.addEventListener('drop', function(e) {
    e.preventDefault();
    zone.classList.remove('is-over');
    addFiles(e.dataTransfer.files);
  });

  if (fileInput) {
    fileInput.addEventListener('change', function() {
      addFiles(fileInput.files);
      fileInput.value = '';
    });
  }

  /* ---- File processing ---- */
  function addFiles(fileList) {
    Array.prototype.forEach.call(fileList, function(file) {
      if (!validateFile(file)) return;
      appendItem(file);
    });
  }

  function validateFile(file) {
    if (accept.length) {
      var ext  = '.' + file.name.split('.').pop().toLowerCase();
      var type = file.type.toLowerCase();
      var ok   = accept.some(function(a) { return a === ext || a === type || a === type.split('/')[0] + '/*'; });
      if (!ok) { showError(file.name, 'Tipo de archivo no permitido'); return false; }
    }
    if (maxSizeMB && file.size > maxSizeMB * 1048576) {
      showError(file.name, 'El archivo supera ' + maxSizeMB + ' MB');
      return false;
    }
    return true;
  }

  function showError(name, msg) {
    var item = buildItem(name, null, 0);
    item.classList.add('is-error');
    var sizeEl = item.querySelector('.dg-file-size');
    if (sizeEl) sizeEl.textContent = msg;
    var bar = item.querySelector('.dg-file-progress-bar');
    if (bar) bar.style.width = '100%';
    listTarget.appendChild(item);
  }

  function appendItem(file) {
    var item = buildItem(file.name, file.type, file.size);
    listTarget.appendChild(item);

    // Preview image thumbnail
    if (IMAGE_TYPES.indexOf(file.type) >= 0) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var iconEl = item.querySelector('.dg-file-icon');
        if (iconEl) {
          var img = document.createElement('img');
          img.src = e.target.result;
          img.alt = file.name;
          iconEl.innerHTML = '';
          iconEl.appendChild(img);
        }
      };
      reader.readAsDataURL(file);
    }

    // Simulate upload progress (replace with real XHR/fetch in production)
    simulateProgress(item);
  }

  function buildItem(name, type, size) {
    var item = document.createElement('div');
    item.className = 'dg-file-item';
    item.innerHTML =
      '<div class="dg-file-icon">' + extOf(name) + '</div>' +
      '<div class="dg-file-info">' +
        '<div class="dg-file-name">' + escHtml(name) + '</div>' +
        '<div class="dg-file-size">' + (size ? formatBytes(size) : '') + '</div>' +
        '<div class="dg-file-progress"><div class="dg-file-progress-bar" style="width:0%"></div></div>' +
      '</div>' +
      '<div class="dg-file-remove" role="button" aria-label="Eliminar archivo" tabindex="0">✕</div>';

    item.querySelector('.dg-file-remove').addEventListener('click', function() {
      item.remove();
      zone.dispatchEvent(new CustomEvent('dg:file-removed', { bubbles: true, detail: { name: name } }));
    });

    return item;
  }

  function simulateProgress(item) {
    var bar  = item.querySelector('.dg-file-progress-bar');
    var prog = 0;
    var iv   = setInterval(function() {
      prog = Math.min(100, prog + Math.random() * 18 + 4);
      if (bar) bar.style.width = prog.toFixed(0) + '%';
      if (prog >= 100) {
        clearInterval(iv);
        item.classList.add('is-done');
        zone.dispatchEvent(new CustomEvent('dg:file-done', { bubbles: true }));
      }
    }, 120);
  }

  function escHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
}
