window.app = window.app || {};
window.app.collections = window.app.collections || {};
window.app.collections.widgets = window.app.collections.widgets || {};

window.app.collections.Pins = window.app.mvr.Collection.extend({
  fetchRequestName : function() {return "GetPins";},
  fetchRequestData : function() {return [];},

  getPinByWPin : function(wPin) {
    var resultingPin = undefined;
    $.each(this.models, function(id, pin) {
        if (pin.wPin() == wPin) {
          resultingPin = pin;
        }
    });

    return resultingPin;
  },

  getModelClassByKey : function(key) {
    return window.app.models.Pin;
  }
});