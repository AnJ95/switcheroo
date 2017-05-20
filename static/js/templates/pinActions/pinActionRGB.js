window.app = window.app || {};
window.app.templates = window.app.templates || {};
window.app.templates.pinActions = window.app.templates.pinActions || {};

window.app.templates.pinActions.pinActionRGB = function (model) {
  return `<div class="btn btn--rgb" style="background-color: ${model.color()}">
  <div class="btn--rgb__button btn--rgb-static">
    <div class="btn btn--rgb__indicator">
      <p class="btn__name">STATIC</p>
    </div>
  </div>
  <div class="btn--rgb__button btn--rgb-dynamic">
    <div class="btn btn--rgb__indicator">
      <p class="btn__name">REC</p>
    </div>
  </div>
  <div class="btn--rgb__button btn--rgb-off">
    <div class="btn btn--rgb__indicator">
      <p class="btn__name">OFF</p>
    </div>
  </div>
  <div class="btn--rgb__button btn--rgb-red">
    <div class="btn btn--rgb__indicator">
      <p class="btn__name">R</p>
    </div>
  </div>
  <div class="btn--rgb__button btn--rgb-green">
    <div class="btn btn--rgb__indicator">
      <p class="btn__name">G</p>
    </div>
  </div>
  <div class="btn--rgb__button btn--rgb-blue">
    <div class="btn btn--rgb__indicator">
      <p class="btn__name">B</p>
    </div>
  </div>
  <div class="btn--rgb__invisible-trigger trigger-change"></div>
  <div class="btn--rgb__invisible-trigger trigger-done"></div>
  </div>`;
};
