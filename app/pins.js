var
  c = require('../config.json'),
  Pin = require('./pin.js');

var innerPins = [];

var Pins = function(app) {
  this.app = app;
  for (var i = 0; i < 32; i++) {
    innerPins.push(new Pin(app, i, Pin.OUT));
  }
}

Pins.prototype.get = function(pinId) {
  if (pinId >= 0 && pinId < innerPins.length) {
    return innerPins[pinId];
  } else {
    this.app.debug.error("Tried getting Pin with invalid id " + pinId);
    return null;
  }
}

module.exports = Pins;


/*
var
  r = new Gpio(16, {mode: Gpio.OUTPUT}),
  g = new Gpio(20, {mode: Gpio.OUTPUT}),
  b = new Gpio(21, {mode: Gpio.OUTPUT});

setInterval(function () {
  r.pwmWrite(dutyCycle);
  g.pwmWrite(dutyCycle);
  b.pwmWrite(dutyCycle);
  dutyCycle += 5;
  if (dutyCycle > 255) {
    dutyCycle = 0;
  }
}, 20);
*/
