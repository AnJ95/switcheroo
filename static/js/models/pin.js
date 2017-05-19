window.app = window.app || {};
window.app.models = window.app.models || {};

window.app.models.Pin = window.app.mvr.Model.extend({
  getId : function() {
    return this.json.id;
  },
  isOn : function() {
    return this.json.val == "1";
  },
  pwm : function() {
    if (arguments !== undefined && arguments.length >= 1) {
      this.json.val = arguments[0];
      this.json.val = (this.json.val < 0) ? 0 : this.json.val;
      this.json.val = (this.json.val > 1) ? 1 : this.json.val;
      return this;
    }
    return this.json.val || 0;
  },

  classAddition : function() {
    console.log(this.json);
    return this.isOn() ? " btn--active" : "";
  }
});
