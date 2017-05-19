window.app = window.app || {};
window.app.collections = window.app.collections || {};
window.app.collections.widgets = window.app.collections.widgets || {};

window.app.collections.Pins = window.app.mvr.Collection.extend({
  fetchRequestName : function() {return "GetPins";},
  fetchRequestData : function() {return [];},

  getPinByBcm : function(bcm) {
    var resultingPin;
    $.each(this.models, function(i, pin) {
        if (pin.getBcm() == bcm) {
          resultingPin = pin;
        }
    });
    return resultingPin;
  },

  getModelClassByKey : function(key) {
    return window.app.models.Pin;
  }
});
