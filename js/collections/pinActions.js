window.app = window.app || {};
window.app.collections = window.app.collections || {};

window.app.collections.PinActions = window.app.mvr.Collection.extend({
  fetchRequestName : function() {return "GetPinActions";},
  fetchRequestData : function() {return [];},

  getModelClassByKey : function(key) {
    return window.app.models.pinAction;
  }
});
