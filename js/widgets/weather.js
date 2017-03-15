
var widgets = widgets || new Array();

var weatherIds = {
  0:    "tornado_day_night",//"tornado",
  1:    "thunderstorm_day_night",//"tropical storm",
  2:    "hurricane_day_night",//"hurricane",
  3:    "thunderstorm_day_night",//"severe thunderstorms",
  4:    "thunderstorm_day_night",//"thunderstorms",
  5:    "snow_day_night",//"mixed rain and snow",
  6:    "",//"mixed rain and sleet",
  7:    "",//"mixed snow and sleet",
  8:    "",//"freezing drizzle",
  9:    "",//"drizzle",
  10:   "",//"freezing rain",
  11:   "rain_day_night",//"shower",
  12:   "",//"showers",
  13:   "flurries_day_night",//"snow flurries",
  14:   "",//"light snow showers",
  15:   "",//"blowing snow",
  16:   "",//"snow",
  17:   "",//"hail",
  18:   "",//"sleet",
  19:   "",//"dust",
  20:   "",//"foggy",
  21:   "",//"haze",
  22:   "",//"smoky",
  23:   "windy_day_night",//"blustery",
  24:   "windy_day_night",//"windy",
  25:   "",//"cold",
  26:   "cloudy_day_night",//"cloudy",
  27:   "mostly_cloudy_day_night",//"mostly cloudy",
  28:   "mostly_cloudy_day_night",//"mostly cloudy",
  29:   "partly_cloudy_night",//"partly cloudy",
  30:   "partly_cloudy_day",//"partly cloudy",
  31:   "clear_night",//"clear",
  32:   "clear_day",//"sunny",
  33:   "fair_night",//"fair (night)",
  34:   "fair_day",//"fair (day)",
  35:   "",//"mixed rain and hail",
  36:   "",//"hot",
  37:   "",//"isolated thunderstorms",
  38:   "scattered_showers_day_night",//"scattered thunderstorms",
  39:   "scattered_showers_day_night",//"scattered thunderstorms",
  40:   "scattered_showers_day_night",//"scattered showers",
  41:   "",//"heavy snow",
  42:   "",//"scattered snow showers",
  43:   "",//"heavy snow",
  44:   "",//"partly cloudy",
  45:   "",//"thundershowers",
  46:   "",//"snow showers",
  47:   "",//"isolated thundershowers",
  3200: "not available"
};

widgets.weather = function($el, info) {
  var html = '';
  /*
  for (var i = 0; i <= 47; i++) {
    var text = weatherIds[i].replace(/ /g, "_", 100);
    html += i + ': ' + text + '<br><img src="https://www.yahoo.com/sy/os/weather/1.0.1/shadow_icon/60x60/' + text + '@2x.png"/><br>';
  }*/



  html += '<div class="widget--weather__top">';
    html += '<div class="widget--weather__status">';
      html += '<img src="https://www.yahoo.com/sy/os/weather/1.0.1/shadow_icon/60x60/' + weatherIds[info.condition] +'@2x.png"/>';
      html += '<b>' + info.temperature + '</b>';
    html += '</div>';
    html += '<table class="widget--weather__top__right">';
      html += '<tr><td><b>Humidity</b></td><td>' + info.humidity + '</td></tr>';
      html += '<tr><td><b>Pressure</b></td><td>' + info.pressure + '</td></tr>';
      html += '<tr><td><b>Wind</b></td><td>' + info.windSpeed + '</td></tr>';
    html += '</table>';
  html += '</div>';

  html += '<div class="widget--weather__bottom">';

  for (var i = 0; i < 4; ++i) {
    var forecast = info["forecast"][i];
    html += '<div class="widget--weather__status">';
      html += '<img src="https://www.yahoo.com/sy/os/weather/1.0.1/shadow_icon/60x60/' + weatherIds[forecast.condition] +'@2x.png"/>';
      html += '<b>' + forecast.temperature + '</b>';
    html += '</div>';
  }

  $el.html(html);
}
