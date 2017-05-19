var
  c = require('../../config.json');


function GetPins (app) {
  this.app = app;
}

// will be set by RequestHandler
GetPins.prototype.app = null;
GetPins.prototype.socket = null;

GetPins.prototype.getRequestName = function() {
  return 'GetPins';
};

GetPins.prototype.init = function () {};

GetPins.prototype.requestHandler = function (data) {

  this.socket.emit(this.getRequestName(), {
    success : true,
    result : this.app.pins.toJSON()
  });
};

/* ####################################################### */

module.exports = GetPins;
