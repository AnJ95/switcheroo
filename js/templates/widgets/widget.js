window.app = window.app || {};
window.app.templates = window.app.templates || {};
window.app.templates.widgets = window.app.templates.widgets || {};


window.app.templates.widgets.widget = function (model) {
  return `<div class="half box widget--${model.json.type}"><div class="box__inner">${model.json.type}</div></div>`;
}
