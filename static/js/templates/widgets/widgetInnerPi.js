window.app = window.app || {};
window.app.templates = window.app.templates || {};
window.app.templates.widgets = window.app.templates.widgets || {};


window.app.templates.widgets.widgetInnerPi = function (model) {
  return `<div class="widget--pi__dateTime">
    <span class="widget--pi__dateTime__time">${model.currentTime()}</span>
    <span class="widget--pi__dateTime__date">${model.currentDate()}</span>
  </div>

  <div class="widget--pi__coreTemp">
    <img src="img/icon/cpu.png" style="background-color: ${model.coreColor()}" />
    <span>${model.coreTemp()}&#176;C</span>
  </div>

  <div class="clear"></div><div style="height: 10px;">

  <div class="widget--pi__upTime">
    <span>${model.upTime()}</span>
  </div>`;
}
