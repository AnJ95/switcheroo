window.app = window.app || {};
window.app.templates = window.app.templates || {};
window.app.templates.widgets = window.app.templates.widgets || {};


window.app.templates.widgets.widgetInnerWeather = function (model) {
  return `<div class="widget--weather__top">
    <div class="widget--weather__status">
      <img src="${model.conditionImage()}"/>
      <b>${model.temperature()}&#176;C</b>
    </div>
    <table class="widget--weather__top__right">
      <tr><td><b>Humidity</b></td><td>${model.humidity()}</td></tr>
      <tr><td><b>Pressure</b></td><td>${model.pressure()}</td></tr>
      <tr><td><b>Wind</b></td><td>${model.windSpeed()}</td></tr>
    </table>
  </div>

  <div class="widget--weather__bottom">
    <div class="widget--weather__status">
      <img src="${model.forecastConditionImage(0)}"/>
      <b>${model.forecastTemperature(0)}&#176;C</b>
    </div>
    <div class="widget--weather__status">
      <img src="${model.forecastConditionImage(1)}"/>
      <b>${model.forecastTemperature(1)}&#176;C</b>
    </div>
    <div class="widget--weather__status">
      <img src="${model.forecastConditionImage(2)}"/>
      <b>${model.forecastTemperature(2)}&#176;C</b>
    </div>
    <div class="widget--weather__status">
      <img src="${model.forecastConditionImage(3)}"/>
      <b>${model.forecastTemperature(3)}&#176;C</b>
    </div>
  </div>`;
}
