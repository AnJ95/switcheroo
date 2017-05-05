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




// var x = 0;
//
// setInterval(function () {
//
//   r = (1 + Math.sin(x * 0.1 * Math.PI * 2)) / 2;
//   g = (1 + Math.sin(x * 0.1 * Math.PI * 2 +(Math.PI * 2 *0.333))) / 2;
//   b = (1 + Math.sin(x * 0.1 * Math.PI * 2 +(Math.PI * 2 *0.666))) / 2;
//
//   innerPins[16].writePwm(r);
//   innerPins[20].writePwm(g);
//   innerPins[21].writePwm(b);
//
//   console.log(r + " " + g + " " + b);
//
//
//   x += 0.01;
// }, 10);



// PHI-MULTIPLIER
// var r = Math.random();
// var g = Math.random();
// var b = Math.random();
//
// var multiplier = 1.61803398875;
// setInterval(function () {
//
//   r = (r * multiplier) % 1;
//   g = (g * multiplier) % 1;
//   b = (b * multiplier) % 1;
//
//   innerPins[16].writePwm(r);
//   innerPins[20].writePwm(g);
//   innerPins[21].writePwm(b);
//
//   console.log(r + " " + g + " " + b);
// }, 200);


// FULLY RANDOM
// window.setInterval(function () {
//   innerPins[16].writePwm(Math.random());
//   innerPins[20].writePwm(Math.random());
//   innerPins[21].writePwm(Math.random());
// }, 100);

module.exports = Pins;
