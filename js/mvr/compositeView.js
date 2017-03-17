window.app = window.app || {};
window.app.view = window.app.view || {};

window.app.mvr.CompositeView = window.app.mvr.View.extend({

  /*
  Selector to an element inside this $el that will serve
  as a parent for every childView
  */
  childrenParentSelector : "",

  /*
  Updates the standard renderUpdate to add behavior to:
    -define childViews by the given model
    -creates an element for every child
    -renders every child (in replace-mode)
  */
  renderUpdate : function() {
    var that = this;

    $.each(this.model.models, function(modelName, model) {
      var viewClass = that.getChildrenViewClassByModel(model);
      if (viewClass == undefined) {
        that.error("CompositeView: Could not determine ChildViews class by model: ", model);
      }
      that.childViewDefinitions[modelName] = {
        selector : ".hook--" + modelName,
        viewClass : viewClass,
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
  },

  /*
  Must return a ViewClass for the ChildViews, determined by a given model.
  */
  getChildrenViewClassByModel : function(model) {
    return undefined;
  }

});
