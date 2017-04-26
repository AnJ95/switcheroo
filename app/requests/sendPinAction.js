var
  c = require('../../config.json');


function SendPinAction (app) {
  this.app = app;
};

// will be set by RequestHandler
SendPinAction.prototype.app = null;
SendPinAction.prototype.socket = null;

SendPinAction.prototype.getRequestName = function() {
  return 'SendPinAction';
};

SendPinAction.prototype.init = function () {};

SendPinAction.prototype.requestHandler = function (data) {
  if (data.type == undefined) {
    this.app.debug.error("Tried executing PinAction with no type!");
    return;
  }

  switch (data.type) {
    case "toggle":
      this.app.pins.get(parseInt(data.pin)).write((data.value == true ? 1 : 0));
    break;
    case "pulse":
      this.app.pins.get(parseInt(data.pin)).pulse(100);
    break;
    case "rgbled":
      this.app.pins.get(parseInt(data.pins.red)).writePwm(data.values.red);
      this.app.pins.get(parseInt(data.pins.green)).writePwm(data.values.green);
      this.app.pins.get(parseInt(data.pins.blue)).writePwm(data.values.blue);
    break;

    default:
      this.app.debug.error("Tried executing PinAction with invalid type \"" + data.type + "\"");
    break;
  }
};



/* ####################################################### */

module.exports = SendPinAction;
