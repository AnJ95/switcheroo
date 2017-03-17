window.app = window.app || {};
window.app.models = window.app.models || {};

window.app.models.Pin = window.app.mvr.Model.extend({
  wPin : function() {
    return this.json.wPin;
  },
  isOn : function() {
    return this.json.val == "1";
  }
});
