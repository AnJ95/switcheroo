var
  c = require('../config.json'),
  Pin = require('./pin.js');

var innerPins = [];

var Pins = function(app) {
  console.log(app);
  this.app = app;
  for (var i = 0; i < 32; i++) {
    innerPins.push(new Pin(this.app, i, Pin.OUT));
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
