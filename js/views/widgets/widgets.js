window.app = window.app || {};
window.app.view = window.app.view || {};
window.app.view.widgets = window.app.view.widgets || {};

window.app.view.widgets.Widgets = window.app.mvr.View.extend({


  template : window.app.templates.widgets.widgets,

  childViewDefinitions : [],

  requireModel : "widgets",

  notify : function () {

    var that = this;
    $.each(this.model.json, function(widgetType, widgetData) {
        that.childViewDefinitions[widgetType] = {
          selector : ".hook--widget--" + widgetType,
          viewClass : window.app.view.widgets.Widget,
          renderStyle : "replace",
          model : that.model.getModel(widgetType)
        }
    });

    this.model = window.app.mvr.View.notify.call(this);
  },

  renderUpdate : function() {
    this.$el.find(".flow").html("");

    var that = this;
    $.each(this.model.json, function(widgetType, widgetData) {
        that.$el.find(".flow").append('<div class="hook--widget--' + widgetType + '"></div>');
    });

    this.renderInitialChildren();
  }
});
