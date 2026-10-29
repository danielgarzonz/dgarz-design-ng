export function wireTooltip(el) {
  if (el.__dgTip) return;
  el.__dgTip = true;

  var content  = el.dataset.tip || el.getAttribute('aria-label') || '';
  var placement = el.dataset.tipPlacement || 'top'; // top | bottom | left | right
  if (!content) return;

  var tip = null;

  function create() {
    tip = document.createElement('div');
    tip.className = 'dg-tooltip-pop dg-tooltip-pop-' + placement;
    tip.setAttribute('role', 'tooltip');
    tip.textContent = content;
    document.body.appendChild(tip);
  }

  function position() {
    if (!tip) return;
    var r   = el.getBoundingClientRect();
    var tw  = tip.offsetWidth;
    var th  = tip.offsetHeight;
    var sy  = window.scrollY || document.documentElement.scrollTop;
    var sx  = window.scrollX || document.documentElement.scrollLeft;
    var gap = 8;
    var top, left;

    switch (placement) {
      case 'bottom':
        top  = r.bottom + sy + gap;
        left = r.left + sx + (r.width - tw) / 2;
        break;
      case 'left':
        top  = r.top + sy + (r.height - th) / 2;
        left = r.left + sx - tw - gap;
        break;
      case 'right':
        top  = r.top + sy + (r.height - th) / 2;
        left = r.right + sx + gap;
        break;
      default: // top
        top  = r.top + sy - th - gap;
        left = r.left + sx + (r.width - tw) / 2;
    }

    // Clamp to viewport
    left = Math.max(sx + 4, Math.min(left, sx + window.innerWidth - tw - 4));
    top  = Math.max(sy + 4, Math.min(top,  sy + window.innerHeight - th - 4));

    tip.style.top  = top + 'px';
    tip.style.left = left + 'px';
  }

  function show() {
    if (!tip) create();
    tip.classList.add('is-visible');
    position();
  }

  function hide() {
    if (tip) tip.classList.remove('is-visible');
  }

  el.addEventListener('mouseenter', show);
  el.addEventListener('mouseleave', hide);
  el.addEventListener('focusin',    show);
  el.addEventListener('focusout',   hide);

  el.setAttribute('aria-describedby', '');
}
