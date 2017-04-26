window.app = window.app || {};
window.app.templates = window.app.templates || {};
window.app.templates.pinActions = window.app.templates.pinActions || {};

window.app.templates.pinActions.pinActionRGB = function (model) {
  return `<div class="half btn btn--rgb" style="background-color: ${model.color()}">
  <div class="btn--rgb__third btn--rgb-red">
    <div class="btn--rgb__handle">
    </div>
  </div>
  <div class="btn--rgb__third btn--rgb-green">
    <div class="btn--rgb__handle">
    </div>
  </div>
  <div class="btn--rgb__third btn--rgb-blue">
    <div class="btn--rgb__handle">
    </div>
  </div>
  <div class="btn--rgb__invisible-trigger"></div>
  </div>`;
}
