// Mask tokens: 9=digit, A=letter, *=any
var TOKENS = { '9': /\d/, 'A': /[a-zA-Z]/, '*': /[\w]/ };

var PRESETS = {
  phone:    { mask: '(999) 999-9999',   placeholder: '(___) ___-____' },
  phone_co: { mask: '999 999 9999',     placeholder: '___ ___ ____' },
  card:     { mask: '9999 9999 9999 9999', placeholder: '____ ____ ____ ____' },
  cvv:      { mask: '999',              placeholder: '___' },
  date_exp: { mask: '99/99',            placeholder: 'MM/AA' },
  zip:      { mask: '99999',            placeholder: '_____' },
  ssn:      { mask: '999-99-9999',      placeholder: '___-__-____' },
};

function applyMask(raw, mask) {
  var out   = '';
  var rawI  = 0;
  for (var maskI = 0; maskI < mask.length && rawI < raw.length; maskI++) {
    var ch  = mask[maskI];
    var tok = TOKENS[ch];
    if (tok) {
      while (rawI < raw.length && !tok.test(raw[rawI])) rawI++;
      if (rawI < raw.length) { out += raw[rawI]; rawI++; }
    } else {
      out += ch;
      if (raw[rawI] === ch) rawI++;
    }
  }
  return out;
}

function stripLiterals(masked, mask) {
  var raw = '';
  for (var i = 0; i < masked.length && i < mask.length; i++) {
    if (TOKENS[mask[i]] && masked[i] && masked[i] !== '_') raw += masked[i];
  }
  return raw;
}

export function wireMask(input) {
  if (input.__dgMask) return;
  input.__dgMask = true;

  var preset  = input.dataset.mask;
  var maskStr = preset && PRESETS[preset] ? PRESETS[preset].mask : (input.dataset.maskPattern || '');
  if (!maskStr) return;

  var phChar = input.dataset.maskChar || '_';
  var ph     = maskStr.replace(/[9A*]/g, phChar);
  if (!input.placeholder) input.placeholder = ph;
  input.setAttribute('inputmode', /^[9]/.test(maskStr) ? 'numeric' : 'text');
  input.setAttribute('autocomplete', 'off');

  function update(e) {
    var raw    = stripLiterals(input.value, maskStr);
    // Add just-typed char to raw if it came via keypress
    if (e && e.data) {
      var last = e.data;
      // already included via input.value
    }
    var masked = applyMask(raw, maskStr);
    var oldVal = input.value;
    input.value = masked;

    // Restore caret after literal insertion
    if (e && e.type === 'input' && input.setSelectionRange) {
      var pos = masked.length;
      input.setSelectionRange(pos, pos);
    }

    if (masked !== oldVal) {
      input.dispatchEvent(new Event('dg:masked', { bubbles: true }));
    }
  }

  input.addEventListener('input', update);
  input.addEventListener('focus', function() {
    if (!input.value) input.value = '';
  });
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Backspace') {
      var pos = input.selectionStart;
      // Skip over trailing literals
      if (pos > 0 && !TOKENS[maskStr[pos - 1]]) {
        e.preventDefault();
        input.setSelectionRange(pos - 1, pos - 1);
      }
    }
  });

  // Format initial value
  if (input.value) update(null);
}

// Currency mask (special: right-aligned, decimal)
export function wireCurrency(input) {
  if (input.__dgCurrency) return;
  input.__dgCurrency = true;

  var symbol  = input.dataset.symbol  || '$';
  var decimal = input.dataset.decimal || '.';
  var sep     = input.dataset.sep     || ',';
  var places  = parseInt(input.dataset.places || '2', 10);

  function format(cents) {
    var s = String(cents).padStart(places + 1, '0');
    var intPart = s.slice(0, s.length - places);
    var decPart = s.slice(s.length - places);
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
    return symbol + intPart + decimal + decPart;
  }

  function getDigits() {
    return input.value.replace(/\D/g, '');
  }

  input.addEventListener('input', function() {
    var digits = getDigits();
    if (!digits) { input.value = ''; return; }
    var cents  = parseInt(digits, 10);
    input.value = format(cents);
  });

  input.addEventListener('focus', function() {
    if (!input.value) input.placeholder = symbol + '0' + decimal + '0'.repeat(places);
  });

  if (input.value) {
    var digits = getDigits();
    if (digits) input.value = format(parseInt(digits, 10));
  }
}

export { PRESETS };
