window.app = window.app || {};
window.app.collections = window.app.collections || {};
window.app.collections.widgets = window.app.collections.widgets || {};

window.app.collections.Pins = window.app.mvr.Collection.extend({
  fetchRequestName : function() {return "GetPins";},
  fetchRequestData : function() {return [];},

  getPinById : function(id) {
    var resultingPin = undefined;
    $.each(this.models, function(id, pin) {
        if (pin.getId() == id) {
          resultingPin = pin;
        }
    });

    return resultingPin;
  },

  getModelClassByKey : function(key) {
    return window.app.models.Pin;
  }
});
