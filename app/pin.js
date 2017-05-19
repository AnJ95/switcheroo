var
  c = require('../config.json');
  Gpio = c.nodejs.useActualPigpio ? require('pigpio').Gpio : require('./fakePigpio.js').Gpio;

function Pin(app, pinId) {
  // save parameters
  this.app = app;
  this.pinId = pinId;
  this.mode = arguments[2] || Pin.OUT;

  if (this.mode != Pin.OUT && this.mode != Pin.PWM && this.mode != Pin.IN) {
    this.app.debug.error("Tried instantiating Pin " + pinId + " with invalid mode " + this.mode + ", taking OUT instead");
    this.mode = Pin.OUT;
  }

  this.innerPin = new Gpio(pinId, {
    mode: this.mode == Pin.IN ? Gpio.INPUT : Gpio.OUTPUT
  });

  switch (this.mode) {
    case Pin.OUT:
      this.write(0);
    break;
    case Pin.PWM:
      this.writePwm(0);
    break;
    case Pin.IN:
      // do nothing
    break;
  }

  this.app.debug.error("Instantiated Pin " + pinId + " with mode " + this.mode);
}

Pin.OUT = 0;
Pin.PWM = 1;
Pin.IN = 2;

Pin.prototype.contentChanged = function() {
  if (this.app.pins === undefined) {
    return;
  }
  
  var pin = this.app.pins.populate(this.app.pins.getByBCM(this.pinId));

  var result = {
    success : true,
    result : {}
  };

  result.result[pin.id] = pin;

  this.app.emit("GetPins", result);
};

Pin.prototype.toJSON = function() {
  return {
    bcm : this.pinId,
    mode : this.mode,
    val : this.value
  };
};

Pin.prototype.write = function(val) {
  if (this.mode == Pin.OUT) {
    this.value = val;
    this.innerPin.digitalWrite(val);
    this.contentChanged();
  } else {
    this.app.debug.warn("Tried writing on Pin " + this.pinId + " which is not set to OUT");
  }
};

Pin.prototype.pulse = function(length) {
  if (this.mode == Pin.OUT) {
    this.write(1);
    var that = this;
    setTimeout(function() {
      that.write(0);
    }, length);
  } else {
    this.app.debug.warn("Tried pulsing Pin " + this.pinId + " which is not set to OUT");
  }
};

Pin.prototype.writePwm = function(pwmVal) {
  if (this.mode == Pin.PWM) {
    var calcVal = Math.round(parseFloat(pwmVal) * 255);
    this.value = pwmVal;
    this.innerPin.pwmWrite(calcVal);
    this.contentChanged();
  } else {
    this.app.debug.warn("Tried doing pwm on Pin " + this.pinId + " which is not set to PWM");
  }
};

module.exports = Pin;
