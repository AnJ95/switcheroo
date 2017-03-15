window.app = window.app || {};
window.app.view = window.app.view || {};

window.app.mvr.CompositeView = window.app.mvr.View.extend({

  childViewDefinitions : [],

  childrenParentSelector : "",

  renderUpdate : function() {
    var that = this;

    $.each(this.model.models, function(modelName, model) {
        that.childViewDefinitions[modelName] = {
          selector : ".hook--" + modelName,
          viewClass : window.app.view.widgets.Widget,
          renderStyle : "replace",
          model : model
        }
    });

    this.$el.find(this.childrenParentSelector).html("");

    var that = this;
    $.each(this.model.json, function(widgetType, widgetData) {
        that.$el.find(that.childrenParentSelector).append('<div class="hook--' + widgetType + '"></div>');
    });

    this.renderInitialChildren();
  }

});
