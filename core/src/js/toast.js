import { $ } from './utils.js';

export function toast(msg, opts) {
  opts = opts || {};
  var stack = $(".dg-toast-stack");
  if (!stack) { stack = document.createElement("div"); stack.className = "dg-toast-stack"; document.body.appendChild(stack); }
  var t = document.createElement("div");
  t.className = "dg-toast" + (opts.variant ? " dg-toast-" + opts.variant : "");
  t.setAttribute("role", "status");
  t.textContent = msg;
  stack.appendChild(t);
  var dur = opts.duration == null ? 2800 : opts.duration;
  if (dur > 0) setTimeout(function () {
    t.style.animation = "dg-toast-out .22s var(--dg-ease) forwards";
    setTimeout(function () { t.remove(); }, 220);
  }, dur);
  return t;
}
