function Pin(pinId, options) {
  this.pinId = pinId;
}
Pin.prototype.pwmWrite = function(pwmVal) {
  console.log("PWM: Setting pin " + this.pinId + " to value " + pwmVal);
}
Pin.prototype.digitalWrite = function(val) {
  console.log("Write: Setting pin " + this.pinId + " to value " + val);
}

module.exports.Gpio = Pin;
