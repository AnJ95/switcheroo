window.app = window.app || {};
window.app.templates = window.app.templates || {};
window.app.templates.pinActions = window.app.templates.pinActions || {};

window.app.templates.pinActions.pinActionRGB = function (model) {
  return `<div class="half btn btn--rgb" style="background-color: ${model.color()}">
  <div class="btn--rgb__half btn--rgb-static">
    <div class="btn btn--rgb__indicator">
    </div>
  </div>
  <div class="btn--rgb__half btn--rgb-dynamic">
    <div class="btn btn--rgb__indicator">
    </div>
  </div>
  <div class="btn--rgb__invisible-trigger"></div>
  </div>`;
}
