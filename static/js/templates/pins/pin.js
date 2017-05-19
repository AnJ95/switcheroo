window.app = window.app || {};
window.app.templates = window.app.templates || {};
window.app.templates.pins = window.app.templates.pins || {};

window.app.templates.pins.pin = function (model) {
  return `<div class="half${model.classAddition()}">
    <div class="pin-line">
      <div class="pin-line__id">${model.getBcm()}</div>
      <div class="pin-line__name">${model.json.name}</div>
      <div class="pin-line__dir">${model.mode()}</div>
      <div class="pin-line__val btn__toggle"><span class="btn__toggle__icon"></span></div>
    </div>
  </div>`;
};
