export function wirePasswordToggle(wrap) {
  if (wrap.__dgPwToggle) return;
  wrap.__dgPwToggle = true;

  var input = wrap.querySelector("input");
  var btn = wrap.querySelector(".dg-password-toggle");
  if (!input || !btn) return;

  btn.addEventListener("click", function () {
    var hidden = input.type === "password";
    input.type = hidden ? "text" : "password";
    btn.setAttribute("aria-label", hidden ? "Ocultar contraseña" : "Mostrar contraseña");
    var use = btn.querySelector("use");
    if (use) use.setAttribute("href", hidden ? "#dg-eye-off" : "#dg-eye");
  });
}

export function wirePureFloatField(field) {
  if (field.__dgPureFloat) return;
  field.__dgPureFloat = true;

  var label = field.querySelector("label");
  var ctrl  = field.querySelector(".dg-input, .dg-textarea, .dg-select");
  if (!label || !ctrl) return;

  var isSelect = ctrl.tagName === "SELECT";

  function hasValue() {
    return (ctrl.value !== "" && ctrl.value !== null) || (ctrl.validity && ctrl.validity.badInput);
  }

  function update() {
    var active = document.activeElement === ctrl;
    if (active || hasValue() || isSelect) label.classList.add("is-floated");
    else label.classList.remove("is-floated");
  }

  ctrl.addEventListener("focus", update);
  ctrl.addEventListener("blur", update);
  ctrl.addEventListener("input", update);
  ctrl.addEventListener("change", update);

  requestAnimationFrame(update);
}
