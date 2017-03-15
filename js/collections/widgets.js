window.app = window.app || {};
window.app.collections = window.app.collections || {};
window.app.collections.widgets = window.app.collections.widgets || {};

window.app.collections.Widgets = window.app.mvr.Collection.extend({
  fetchRequestName : function() {return "GetWidgets";},
  fetchRequestData : function() {return [];},

  getModelClassByKey : function(name) {
    return window.app.models.widgets.widget;
  }
});
