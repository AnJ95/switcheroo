var
  c = require('../config.json'),
  Pin = require('./pin.js');

var innerPins = {
  1 : {
    "name" : "3.3v"
  },
  2 : {
    "name" : "5v"
  },
  3 : {
    "name" : "SDA.1",
    "bcm" : 2
  },
  4 : {
    "name" : "5v"
  },
  5 : {
    "name" : "SCL.1",
    "bcm" : 3
  },
  6 : {
    "name" : "0v"
  },
  7 : {
    "name" : "GPIO.7",
    "bcm" : 4
  },
  8 : {
    "name" : "TxD",
    "bcm" : 14
  },
  9 : {
    "name" : "0v"
  },
  10 : {
    "name" : "RxD",
    "bcm" : 15
  },
  11 : {
    "name" : "GPIO.0",
    "bcm" : 17
  },
  12 : {
    "name" : "GPIO.1",
    "bcm" : 18
  },
  13 : {
    "name" : "GPIO.2",
    "bcm" : 27
  },
  14 : {
    "name" : "0v"
  },
  15 : {
    "name" : "GPIO.3",
    "bcm" : 22
  },
  16 : {
    "name" : "GPIO.4",
    "bcm" : 23
  },
  17 : {
    "name" : "3.3v"
  },
  18 : {
    "name" : "GPIO.5",
    "bcm" : 24
  },
  19 : {
    "name" : "MOSI",
    "bcm" : 10
  },
  20 : {
    "name" : "0v"
  },
  21 : {
    "name" : "MISO",
    "bcm" : 9
  },
  22 : {
    "name" : "GPIO.6",
    "bcm" : 25
  },
  23 : {
    "name" : "SCLK",
    "bcm" : 11
  },
  24 : {
    "name" : "CE0",
    "bcm" : 8
  },
  25 : {
    "name" : "0v"
  },
  26 : {
    "name" : "CE1",
    "bcm" : 7
  },
  27 : {
    "name" : "SDA.0",
    "bcm" : 0
  },
  28 : {
    "name" : "SCL.0",
    "bcm" : 1
  },
  29 : {
    "name" : "GPIO.21",
    "bcm" : 5
  },
  30 : {
    "name" : "0v"
  },
  31 : {
    "name" : "GPIO.22",
    "bcm" : 6
  },
  32 : {
    "name" : "GPIO.26",
    "bcm" : 12
  },
  33 : {
    "name" : "GPIO.23",
    "bcm" : 13
  },
  34 : {
    "name" : "0v"
  },
  35 : {
    "name" : "GPIO.24",
    "bcm" : 19
  },
  36 : {
    "name" : "GPIO.27",
    "bcm" : 16
  },
  37 : {
    "name" : "GPIO.25",
    "bcm" : 26
  },
  38 : {
    "name" : "GPIO.28",
    "bcm" : 20
  },
  39 : {
    "name" : "0v"
  },
  40 : {
    "name" : "GPIO.29",
    "bcm" : 21
  }
};

var Pins = function(app) {
  this.app = app;

  for (var physId in innerPins) {
    var curr = innerPins[physId];
    if (curr.bcm !== undefined) {
      innerPins[physId].dynPin = new Pin(this.app, curr.bcm, c.pi.pinModes[curr.bcm]);
    }
  }
};

Pins.prototype.getByBCM = function(bcm) {
  for (var physId in innerPins) {
    var curr = innerPins[physId];
    if (curr.bcm !== undefined && curr.bcm == bcm) {
      return innerPins[physId];
    }
  }
  this.app.debug.error("Tried getting Pin with invalid bcm " + bcm);
  return null;
};

Pins.prototype.toJSON = function() {
  var result = {};
  for (var physId in innerPins) {
    var curr = innerPins[physId];

    result[physId] = {
      id : physId
    };


    for (var dataKey in curr) {
      // add static values
      if (dataKey !== "dynPin") {
        result[physId][dataKey] = curr[dataKey];
      } else { // if this is Pin-Object: add its values
        var dynJson = curr.dynPin.toJSON();
        for (var dynKey in dynJson) {
          result[physId][dynKey] = dynJson[dynKey];
        }
      }
    }
  }

  return result;
};




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
