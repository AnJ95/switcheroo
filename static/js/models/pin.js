window.app = window.app || {};
window.app.models = window.app.models || {};

window.app.models.Pin = window.app.mvr.Model.extend({
  wPin : function() {
    return this.json.wPin;
  },
  isOn : function() {
    return this.json.val == "1";
  },
  pwm : function() {
    if (arguments != undefined && arguments.length >= 1) {
      this.json.pwm = arguments[0];
      return this;
    }
    return this.json.pwm || 0;
  }
});
