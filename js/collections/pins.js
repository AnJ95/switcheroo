window.app = window.app || {};
window.app.collections = window.app.collections || {};
window.app.collections.widgets = window.app.collections.widgets || {};

window.app.collections.Pins = window.app.mvr.Collection.extend({
  fetchRequestName : function() {return "GetPins";},
  fetchRequestData : function() {return [];},

  getModelClassByKey : function(key) {
    return window.app.models.Pin;
  }
});
