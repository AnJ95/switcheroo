var
  c = require('../../config.json'),
  widgetPi = require('./../widgets/pi.js'),
  widgetWeather = require('./../widgets/weather.js');


function GetPinActions () {};

// will be set by RequestHandler
GetPinActions.prototype.app = null;
GetPinActions.prototype.socket = null;

GetPinActions.prototype.getRequestName = function() {
  return 'GetWidgets';
};

GetPinActions.prototype.requestHandler = function (data) {

  var that = this;

  widgetPi(this.app, function(result) {
    that.socket.emit(that.getRequestName(), {
      success : true,
      result : {
        pi : result
      }
    });
  });

  widgetWeather(this.app, function(result) {
    that.socket.emit(that.getRequestName(), {
      success : true,
      result : {
        weather : result
      }
    });
  });

};



/* ####################################################### */

module.exports = new GetPinActions();
