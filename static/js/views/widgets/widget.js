window.app = window.app || {};
window.app.views = window.app.views || {};
window.app.views.widgets = window.app.views.widgets || {};

window.app.views.widgets.Widget = window.app.mvr.View.extend({
  template : window.app.templates.widgets.widget,

  childViewDefinitions : [],

  renderInitial : function() {

    this.childViewDefinitions = [{
      selector : ".box__inner",
      viewClass : this.getWidgetInnerClassByType(this.model.json.type),
      model : this.model
    }];

    var that = this;
    window.setTimeout(function() {
        window.app.mvr.View.renderInitial.call(that);
    }, 1);

  },

  getWidgetInnerClassByType : function (type) {
    switch (type) {
      case "pi":
        return window.app.views.widgets.WidgetInnerPi;
        break;
      case "weather":
        return window.app.views.widgets.WidgetInnerWeather;
        break;
      default:
      this.error("Tried creating unknown widget of type " + type);
        break;
    }
  }

});
