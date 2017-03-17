window.app = window.app || {};
window.app.view = window.app.view || {};
window.app.view.widgets = window.app.view.widgets || {};

window.app.view.widgets.Widget = window.app.mvr.View.extend({
  template : window.app.templates.widgets.widget,

  childViewDefinitions : [],

  renderInitial : function() {

    this.childViewDefinitions = [{
      selector : ".box__inner",
      viewClass : this.getWidgetInnerClassByType(this.model.json.type),
      model : this.model
    }];

    window.app.mvr.View.renderInitial.call(this);
  },

  getWidgetInnerClassByType : function (type) {
    switch (type) {
      case "pi":
        return window.app.view.widgets.WidgetInnerPi;
        break;
      case "weather":
        return window.app.view.widgets.WidgetInnerWeather;
        break;
      default:
      this.error("Tried creating unknown widget of type " + type);
        break;
    }
  }

});
