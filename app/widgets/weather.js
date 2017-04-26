var
  app = null,
  c = require('../../config.json'),
  request = require('request');


function formatCurrentDate (raw) {
  var date = raw.trim();

  // error handling
  if (date == "") {
    date = "Mon 00.00.0000";
    app.debug.warn("Could not get date via command");
  }

  return date;
}

function formatCurrentTime (raw) {
  var time = raw.trim();

  // error handling
  if (time == "") {
    time = "00:00";
    app.debug.warn("Could not get time via command");
  }

  return time;
}

function formatUpTime (raw) {
  upTime = raw.trim();

  // error handling
  if (upTime == "") {
    upTime = "up 0 minutes";
    app.debug.warn("Could not get uptime via command");
  }

  return upTime.allReplace({
    "up " : "",
    " years" : "y",
    " year" : "y",
    " months" : "m",
    " month" : "m",
    " weeks" : "w",
    " week" : "w",
    " days" : "d",
    " day" : "d",
    " hours" : "h",
    " hour" : "h",
    " minutes" : "min",
    " minute" : "min",
    "," : ""
  });
}

function formatCoreTemp (raw) {
  var coreTemp = raw.trim();

  // error handling
  if (coreTemp == "") {
    coreTemp = "temp=0'C";
    app.debug.warn("Could not get coreTemp via command");
  }

  coreTemp = coreTemp.split("=");
  coreTemp = coreTemp[1];
  coreTemp = coreTemp.split("'");
  return coreTemp[0];
}

function f2c(f) {
  var r = arguments[1] || 1;
  return Math.round((f - 32) / 1.8, r);
}

function mph2kmh(mph) {
  var r = arguments[1] || 1;
  return Math.round(1.6093 * mph, r);
}

function formatResult(json) {

  if (json.query == null || json.query.results == null || json.query.results.channel == null) {
    app.debug.error("Could not extract weater data from API result");
    return {};
  }

  var channel = json.query.results.channel;

  var result = {
    type : "weather",
    temperature : f2c(channel.item.condition.temp),
    condition : channel.item.condition.code,
    humidity : channel.atmosphere.humidity,
    pressure : channel.atmosphere.pressure,
    windSpeed : mph2kmh(channel.wind.speed),
    forecast : [],
  }

  for (var i = 0; i < 4; ++i) {
    var item = channel.item.forecast[i];
    result.forecast[i] = {
      temperature : f2c(item.low, 0) + "-" + f2c(item.high, 0),
      condition : item.code
    };
  }

  return result;
}

module.exports = function(_app, handler) {
  app = _app;

  var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + c.widgets.weather.geoLocation.replace(" ", "%20") + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"

  request(url, function (error, response, body) {
    if (response && response.statusCode == 200) {
      handler(formatResult(JSON.parse(body)));
    } else {
      _app.debug.error(
        "Could not get weather data!\n" +
        "response:  " + (response && response.statusCode) + "\n" +
        "url:       " + url
      );
    }
  });

}
