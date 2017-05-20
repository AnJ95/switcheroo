window.app = window.app || {};
window.app.templates = window.app.templates || {};
window.app.templates.pinActions = window.app.templates.pinActions || {};

window.app.templates.pinActions.pinActionPulse = function (model) {
  return `<button class="half btn btn--pulse" style="background-color: ${model.color()}">
    <div class="btn__icon" style="box-shadow: 0 3px 0 0 ${model.darkColor()};">
      <div style="background-image: url(${model.icon()});"></div>
      <p class="btn__name">${model.niceName()}</p>
    </div>
  </button>`;
}
