var MONTHS_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
var MONTHS_SHORT = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
var WEEKDAYS = ['Lu','Ma','Mi','Ju','Vi','Sa','Do'];

function pad(n) { return n < 10 ? '0' + n : '' + n; }

function isSameDay(a, b) {
  return a && b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth()    === b.getMonth()    &&
    a.getDate()     === b.getDate();
}

function isDisabledDate(date, min, max) {
  if (min && date < min) return true;
  if (max && date > max) return true;
  return false;
}

function formatDate(date, fmt, h, m) {
  var d  = pad(date.getDate());
  var mo = pad(date.getMonth() + 1);
  var y  = date.getFullYear();
  return fmt
    .replace('DD', d).replace('MM', mo).replace('YYYY', y)
    .replace('HH', pad(h || 0)).replace('mm', pad(m || 0));
}

function parseInput(str, fmt) {
  var order = [];
  ['DD','MM','YYYY','HH','mm'].forEach(function(p) { if (fmt.indexOf(p) >= 0) order.push(p); });
  var pattern = fmt
    .replace(/DD|MM/g, '(\\d{2})')
    .replace('YYYY', '(\\d{4})')
    .replace(/HH|mm/g, '(\\d{2})');
  var m = str.match(new RegExp('^' + pattern + '$'));
  if (!m) return null;
  var vals = {};
  order.forEach(function(p, i) { vals[p] = +m[i + 1]; });
  var dt = new Date(vals['YYYY'] || 0, (vals['MM'] || 1) - 1, vals['DD'] || 1, vals['HH'] || 0, vals['mm'] || 0);
  return isNaN(dt.getTime()) ? null : dt;
}

export function wireDatePicker(input) {
  if (input.__dgCal) return;
  input.__dgCal = true;

  var withTime = input.hasAttribute('data-time');
  var minDate  = input.dataset.min ? new Date(input.dataset.min) : null;
  var maxDate  = input.dataset.max ? new Date(input.dataset.max) : null;
  var fmt      = input.dataset.format || (withTime ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY');

  var today    = new Date();
  var viewDate = new Date(today.getFullYear(), today.getMonth(), 1);
  var selected = null;
  var selH = today.getHours();
  var selM = today.getMinutes();
  var mode = 'days'; // 'days' | 'months' | 'years'

  if (input.value) {
    var parsed = parseInput(input.value, fmt);
    if (parsed) {
      selected = parsed;
      viewDate = new Date(parsed.getFullYear(), parsed.getMonth(), 1);
      if (withTime) { selH = parsed.getHours(); selM = parsed.getMinutes(); }
    }
  }

  var cal = document.createElement('div');
  cal.className = 'dg-cal';
  cal.setAttribute('hidden', '');
  cal.setAttribute('role', 'dialog');
  cal.setAttribute('aria-modal', 'true');
  cal.setAttribute('aria-label', 'Selector de fecha');
  document.body.appendChild(cal);

  /* ---- Render ---- */
  function render() {
    if (mode === 'months') { renderMonths(); return; }
    if (mode === 'years')  { renderYears();  return; }
    renderDays();
  }

  function renderDays() {
    var month = viewDate.getMonth();
    var year  = viewDate.getFullYear();
    var firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // Mon=0
    var daysInMonth  = new Date(year, month + 1, 0).getDate();
    var daysInPrev   = new Date(year, month, 0).getDate();

    var cells = '';
    for (var p = firstWeekday - 1; p >= 0; p--) {
      cells += '<div class="dg-cal-day is-other-month is-empty">' + (daysInPrev - p) + '</div>';
    }
    for (var d = 1; d <= daysInMonth; d++) {
      var date = new Date(year, month, d);
      var cls  = 'dg-cal-day';
      if (isSameDay(date, today))    cls += ' is-today';
      if (isSameDay(date, selected)) cls += ' is-selected';
      if (isDisabledDate(date, minDate, maxDate)) cls += ' is-disabled';
      cells += '<div class="' + cls + '" data-date="' + year + '/' + (month + 1) + '/' + d + '">' + d + '</div>';
    }
    var filled = firstWeekday + daysInMonth;
    var rem    = filled % 7 === 0 ? 0 : 7 - (filled % 7);
    for (var n = 1; n <= rem; n++) {
      cells += '<div class="dg-cal-day is-other-month is-empty">' + n + '</div>';
    }

    var timeHtml = '';
    if (withTime) {
      timeHtml =
        '<div class="dg-cal-time">' +
          '<div class="dg-cal-time-unit">' +
            '<div class="dg-cal-time-btn" data-ta="h+">▲</div>' +
            '<div class="dg-cal-time-val" id="dgCalH">' + pad(selH) + '</div>' +
            '<div class="dg-cal-time-label">h</div>' +
            '<div class="dg-cal-time-btn" data-ta="h-">▼</div>' +
          '</div>' +
          '<div class="dg-cal-time-sep">:</div>' +
          '<div class="dg-cal-time-unit">' +
            '<div class="dg-cal-time-btn" data-ta="m+">▲</div>' +
            '<div class="dg-cal-time-val" id="dgCalM">' + pad(selM) + '</div>' +
            '<div class="dg-cal-time-label">min</div>' +
            '<div class="dg-cal-time-btn" data-ta="m-">▼</div>' +
          '</div>' +
        '</div>' +
        '<div class="dg-cal-footer">' +
          '<button class="dg-btn dg-btn-sm" data-ca="cancel" type="button">Cancelar</button>' +
          '<button class="dg-btn dg-btn-primary dg-btn-sm" data-ca="apply" type="button">Aplicar</button>' +
        '</div>';
    }

    cal.innerHTML =
      '<div class="dg-cal-header">' +
        '<div class="dg-cal-nav" data-ca="prev">‹</div>' +
        '<div class="dg-cal-title" data-ca="to-months">' + MONTHS_ES[month] + ' ' + year + '</div>' +
        '<div class="dg-cal-nav" data-ca="next">›</div>' +
      '</div>' +
      '<div class="dg-cal-grid">' +
        WEEKDAYS.map(function(w) { return '<div class="dg-cal-weekday">' + w + '</div>'; }).join('') +
        cells +
      '</div>' +
      timeHtml;
  }

  function renderMonths() {
    var year = viewDate.getFullYear();
    var curM = viewDate.getMonth();
    cal.innerHTML =
      '<div class="dg-cal-header">' +
        '<div class="dg-cal-nav" data-ca="prev">‹</div>' +
        '<div class="dg-cal-title" data-ca="to-years">' + year + '</div>' +
        '<div class="dg-cal-nav" data-ca="next">›</div>' +
      '</div>' +
      '<div class="dg-cal-select-grid">' +
        MONTHS_SHORT.map(function(m, i) {
          var cls = 'dg-cal-select-item' + (i === curM ? ' is-selected' : '');
          return '<div class="' + cls + '" data-month="' + i + '">' + m + '</div>';
        }).join('') +
      '</div>';
  }

  function renderYears() {
    var year  = viewDate.getFullYear();
    var start = Math.floor(year / 12) * 12;
    var items = '';
    for (var y = start; y < start + 12; y++) {
      var cls = 'dg-cal-select-item' + (y === year ? ' is-selected' : '');
      items += '<div class="' + cls + '" data-year="' + y + '">' + y + '</div>';
    }
    cal.innerHTML =
      '<div class="dg-cal-header">' +
        '<div class="dg-cal-nav" data-ca="prev">‹</div>' +
        '<div class="dg-cal-title">' + start + ' – ' + (start + 11) + '</div>' +
        '<div class="dg-cal-nav" data-ca="next">›</div>' +
      '</div>' +
      '<div class="dg-cal-select-grid">' + items + '</div>';
  }

  /* ---- Position ---- */
  function position() {
    var r  = input.getBoundingClientRect();
    var sy = window.scrollY || document.documentElement.scrollTop;
    var sx = window.scrollX || document.documentElement.scrollLeft;
    cal.style.left = (r.left + sx) + 'px';
    cal.style.top  = (r.bottom + sy + 6) + 'px';
    // Flip upward if not enough room below
    var ch = cal.offsetHeight || 320;
    if (r.bottom + ch + 6 > window.innerHeight) {
      cal.style.top = (r.top + sy - ch - 6) + 'px';
    }
    // Shift left if overflows right edge
    var cw = cal.offsetWidth || 288;
    if (r.left + cw > window.innerWidth) {
      cal.style.left = (window.innerWidth - cw - 8 + sx) + 'px';
    }
  }

  function open() {
    mode = 'days';
    render();
    cal.removeAttribute('hidden');
    position();
  }

  function close() { cal.setAttribute('hidden', ''); }

  /* ---- Selection ---- */
  function commit() {
    if (!selected) return;
    input.value = formatDate(selected, fmt, selH, selM);
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('input',  { bubbles: true }));
  }

  /* ---- Events ---- */
  cal.addEventListener('click', function(e) {
    var t = e.target;

    // Day cell
    var dayEl = t.closest('.dg-cal-day:not(.is-disabled):not(.is-empty):not(.is-other-month)');
    if (dayEl && dayEl.dataset.date) {
      var parts = dayEl.dataset.date.split('/');
      selected  = new Date(+parts[0], +parts[1] - 1, +parts[2], selH, selM);
      if (!withTime) { commit(); close(); }
      else           { render(); }
      return;
    }

    // Navigation & title
    var nav = t.closest('[data-ca]');
    if (nav) {
      switch (nav.dataset.ca) {
        case 'prev':
          if (mode === 'days')   viewDate.setMonth(viewDate.getMonth() - 1);
          if (mode === 'months') viewDate.setFullYear(viewDate.getFullYear() - 1);
          if (mode === 'years')  viewDate.setFullYear(viewDate.getFullYear() - 12);
          render(); break;
        case 'next':
          if (mode === 'days')   viewDate.setMonth(viewDate.getMonth() + 1);
          if (mode === 'months') viewDate.setFullYear(viewDate.getFullYear() + 1);
          if (mode === 'years')  viewDate.setFullYear(viewDate.getFullYear() + 12);
          render(); break;
        case 'to-months': mode = 'months'; render(); break;
        case 'to-years':  mode = 'years';  render(); break;
        case 'apply':
          if (selected) { selected.setHours(selH, selM); commit(); }
          close(); break;
        case 'cancel': close(); break;
      }
      return;
    }

    // Month selector
    var mEl = t.closest('[data-month]');
    if (mEl) { viewDate.setMonth(+mEl.dataset.month); mode = 'days'; render(); return; }

    // Year selector
    var yEl = t.closest('[data-year]');
    if (yEl) { viewDate.setFullYear(+yEl.dataset.year); mode = 'months'; render(); return; }

    // Time buttons
    var tb = t.closest('[data-ta]');
    if (tb) {
      switch (tb.dataset.ta) {
        case 'h+': selH = (selH + 1) % 24;  break;
        case 'h-': selH = (selH + 23) % 24; break;
        case 'm+': selM = (selM + 1) % 60;  break;
        case 'm-': selM = (selM + 59) % 60; break;
      }
      var hEl = cal.querySelector('#dgCalH');
      var mEl2 = cal.querySelector('#dgCalM');
      if (hEl)  hEl.textContent  = pad(selH);
      if (mEl2) mEl2.textContent = pad(selM);
    }
  });

  input.addEventListener('click', function() {
    if (cal.hasAttribute('hidden')) open(); else close();
  });
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    if (e.key === 'Escape') close();
  });
  input.setAttribute('readonly', '');
  input.setAttribute('aria-haspopup', 'dialog');

  document.addEventListener('click', function(e) {
    if (!cal.hasAttribute('hidden') && !cal.contains(e.target) && e.target !== input) close();
  });
}
