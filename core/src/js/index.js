import { $all, openStack, target, trapFocus, FOCUSABLE } from './utils.js';
import { openOverlay, closeOverlay, closestOverlay, wireModalResize } from './overlays.js';
import { toast } from './toast.js';
import { dgConfirm, dgAlert, dgPrompt } from './confirm.js';
import { applySavedTheme, toggleTheme } from './theme.js';
import { wireDropdown, closeAllMenus } from './dropdown.js';
import { wireTabs } from './tabs.js';
import { wireAccordion } from './accordion.js';
import { wireSortable, wireTableSelect } from './sortable.js';
import { wirePureFloatField, wirePasswordToggle } from './forms.js';
import { wireCollapse } from './collapse.js';
import { wireCarousel } from './carousel.js';
import { wirePopover } from './popover.js';
import { wireSegmented } from './segmented.js';
import { wireProgressBars } from './progress.js';
import { wireReveal } from './reveal.js';
import { wireSteps } from './steps.js';
import { wireDatePicker } from './datepicker.js';
import { wireDropzone } from './fileupload.js';
import { wireCombobox } from './combobox.js';
import { wireMask, wireCurrency } from './mask.js';
import { wireTooltip } from './tooltip.js';
import { wireGallery, wireFAQ, wireNavToggle, wireTableEditable } from './extras.js';

var bound = false;
function bindGlobal() {
  if (bound) return; bound = true;
  document.addEventListener("click", function (e) {
    var opener = e.target.closest("[data-dg-open]");
    if (opener) { e.preventDefault(); openOverlay(target(opener, "data-dg-open")); return; }
    var closer = e.target.closest("[data-dg-close]");
    if (closer) { e.preventDefault(); closeOverlay(closestOverlay(closer)); return; }
    var bd = e.target;
    if (bd.classList && (bd.classList.contains("dg-modal-backdrop") || bd.classList.contains("dg-drawer-backdrop"))) {
      var top = openStack[openStack.length - 1];
      if (top && (top.el === bd || top.backdrop === bd) && !top.el.hasAttribute("data-dg-static")) closeOverlay(top.el);
      return;
    }
    var tt = e.target.closest("[data-dg-theme-toggle]");
    if (tt) { toggleTheme(); return; }
    var toastBtn = e.target.closest("[data-dg-toast]");
    if (toastBtn) { toast(toastBtn.getAttribute("data-dg-toast"), { variant: toastBtn.getAttribute("data-dg-variant"), duration: +toastBtn.getAttribute("data-dg-duration") || undefined }); return; }
    closeAllMenus(true);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (openStack.length) {
        var topEl = openStack[openStack.length - 1].el;
        if (!topEl.hasAttribute("data-dg-static")) closeOverlay(topEl);
      } else closeAllMenus(true);
    }
    var top = openStack[openStack.length - 1];
    if (e.key === "Tab" && top) trapFocus(top.el, e);
  });
}

function init(ctx) {
  ctx = ctx || document;
  applySavedTheme();
  bindGlobal();
  $all(".dg-modal", ctx).forEach(wireModalResize);
  $all("[data-dg-dropdown]", ctx).forEach(wireDropdown);
  $all("[data-dg-tabs]", ctx).forEach(wireTabs);
  $all("[data-dg-accordion]", ctx).forEach(wireAccordion);
  $all("[data-dg-segmented]", ctx).forEach(wireSegmented);
  $all("[data-dg-sortable]", ctx).forEach(wireSortable);
  $all(".dg-table", ctx).forEach(wireTableSelect);
  $all("[data-dg-collapse]", ctx).forEach(wireCollapse);
  $all("[data-dg-carousel]", ctx).forEach(wireCarousel);
  $all("[data-dg-popover]", ctx).forEach(wirePopover);
  $all(".dg-float-field", ctx).forEach(wirePureFloatField);
  $all(".dg-password-wrap", ctx).forEach(wirePasswordToggle);
  wireProgressBars(ctx);
  wireReveal(ctx);
  wireSteps(ctx);
  $all('.dg-datepicker', ctx).forEach(wireDatePicker);
  $all('.dg-dropzone',   ctx).forEach(wireDropzone);
  $all('.dg-combobox',   ctx).forEach(wireCombobox);
  $all('[data-mask],[data-mask-pattern]', ctx).forEach(wireMask);
  $all('[data-currency]', ctx).forEach(wireCurrency);
  $all('[data-tip]',     ctx).forEach(wireTooltip);
  $all('.dg-gallery',    ctx).forEach(wireGallery);
  $all('.dg-faq',        ctx).forEach(wireFAQ);
  $all('.dg-nav-item-toggle', ctx).forEach(wireNavToggle);
  $all('.dg-table-editable',  ctx).forEach(wireTableEditable);
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { init(); });
else init();

export { init, toast, openOverlay, closeOverlay, toggleTheme, dgConfirm, dgAlert, dgPrompt };
export function goTo(carousel, n) { carousel.__dgGoTo && carousel.__dgGoTo(n); }
export default { init, toast, openOverlay, closeOverlay, toggleTheme, goTo, dgConfirm, dgAlert, dgPrompt };
