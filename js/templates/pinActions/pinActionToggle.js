window.app = window.app || {};
window.app.templates = window.app.templates || {};
window.app.templates.pinActions = window.app.templates.pinActions || {};

window.app.templates.pinActions.pinActionToggle = function (model) {
  return `<button class="half btn btn--toggle" style="background-color: ${model.color()}">
    <div class="btn__icon" style="box-shadow: 0 3px 0 0 ${model.color()};">
      <div style="background-image: url(${model.icon()});"></div>
    </div>
    <div class="btn__toggle">
      <span class="btn__toggle__icon"></span>
    </div>
  </button>`;
}
