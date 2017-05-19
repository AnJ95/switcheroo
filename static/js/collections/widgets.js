window.app = window.app || {};
window.app.collections = window.app.collections || {};
window.app.collections.widgets = window.app.collections.widgets || {};

window.app.collections.Widgets = window.app.mvr.Collection.extend({
  fetchRequestName : function() {return "GetWidgets";},
  fetchRequestData : function() {return [];},

  getModelClassByKey : function(key) {
    switch (key) {
      case "pi":
        return window.app.models.widgets.WidgetInnerPi;
      case "weather":
        return window.app.models.widgets.WidgetInnerWeather;
      default:
        this.error("Tried creating unknown widget model with key " + key);
      break;
    }
  }
});
