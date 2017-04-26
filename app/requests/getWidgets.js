var
  c = require('../../config.json'),
  widgetPi = require('./../widgets/pi.js'),
  widgetWeather = require('./../widgets/weather.js');


function GetWidgets () {};

// will be set by RequestHandler
GetWidgets.prototype.app = null;
GetWidgets.prototype.socket = null;

GetWidgets.prototype.getRequestName = function() {
  return 'GetWidgets';
};

GetWidgets.prototype.widgets = [
  {
    widget : widgetPi,
    updateInterval : 1000 * 10 // every 10 seconds
  },
  {
    widget : widgetWeather,
    updateInterval : 1000 * 60 * 60 // once per hour
  },
];

GetWidgets.prototype.init = function () {
  var that = this;
  // send every widget periodically in defined intervals
  for (var i = 0; i < this.widgets.length; ++i) {
    var widgetSpec = this.widgets[i]

    if (widgetSpec.updateInterval != undefined) {
      setInterval(function(w) {
        that.sendWidget(w);
      }, widgetSpec.updateInterval, widgetSpec.widget);
    }
  }
};

GetWidgets.prototype.sendWidget = function (widget) {
  var that = this;
  // Get this specific widgets response
  widget(this.app, function(result) {
    // Prepare answer-json
    var json = {
      success : true,
      result : {}
    };
    json.result[result.type] = result;
    // send json
    that.socket.emit(that.getRequestName(), json);
  });
}

GetWidgets.prototype.requestHandler = function (data) {
  // send every widget
  for (var i = 0; i < this.widgets.length; ++i) {
    this.sendWidget(this.widgets[i].widget);
  }
};



/* ####################################################### */

module.exports = new GetWidgets();
