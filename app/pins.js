var
  c = require('../config.json'),
  Pin = require('./pin.js');

var innerPins = [];

var Pins = function(app) {
  this.app = app;
  for (var i = 0; i < 32; i++) {
    innerPins.push(new Pin(this.app, i, c.pi.pinModes[i]));
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

Pins.prototype.toJSON = function() {
  var result = {};
  for (var i = 0; i < 32; i++) {
    result[i] = this.get(i).toJSON();
  }
  return result;
}

module.exports = Pins;
