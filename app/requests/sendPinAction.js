var
  c = require('../../config.json');


function SendPinAction (app) {
  this.app = app;
}

// will be set by RequestHandler
SendPinAction.prototype.app = null;
SendPinAction.prototype.socket = null;

SendPinAction.prototype.getRequestName = function() {
  return 'SendPinAction';
};

SendPinAction.prototype.init = function () {};

SendPinAction.prototype.requestHandler = function (data) {
  if (data.type === undefined) {
    this.app.debug.error("Tried executing PinAction with no type!");
    return;
  }
  switch (data.type) {
    case "toggle":
      this.app.pins.getByBCM(parseInt(data.pin)).dynPin.write((data.value == true ? 1 : 0));
    break;
    case "pulse":
      this.app.pins.getByBCM(parseInt(data.pin)).dynPin.pulse(100);
    break;
    case "rgbled":
      if (data.done !== undefined && data.done) {
        this.app.pins.getByBCM(parseInt(data.pins.red)).dynPin.contentChanged();
        this.app.pins.getByBCM(parseInt(data.pins.green)).dynPin.contentChanged();
        this.app.pins.getByBCM(parseInt(data.pins.blue)).dynPin.contentChanged();
      } else {
        this.app.pins.getByBCM(parseInt(data.pins.red)).dynPin.writePwm(data.values.red);
        this.app.pins.getByBCM(parseInt(data.pins.green)).dynPin.writePwm(data.values.green);
        this.app.pins.getByBCM(parseInt(data.pins.blue)).dynPin.writePwm(data.values.blue);
      }
    break;

    default:
      this.app.debug.error("Tried executing PinAction with invalid type \"" + data.type + "\"");
    break;
  }
};



/* ####################################################### */

module.exports = SendPinAction;
