window.app = window.app || {};
window.app.views = window.app.views || {};

window.app.mvr.CompositeView = window.app.mvr.View.extend({

  /*
  Selector to an element inside this $el that will serve
  as a parent for every childView
  */
  childrenParentSelector : "",

  clearedChildrenParentSelector : false,

  /*
  Updates the standard renderUpdate to add behavior to:
    -define childViews by the given model
    -creates an element for every child
    -renders every child (in replace-mode)
  */
  renderUpdate : function() {
    var that = this;

    if (!this.clearedChildrenParentSelector) {
      this.$el.find(this.childrenParentSelector).html("");
      this.clearedChildrenParentSelector = true;
    }


    $.each(this.model.models, function(modelName, model) {
      var viewClass = that.getChildrenViewClassByModel(model);
      if (viewClass == undefined) {
        that.error("CompositeView: Could not determine ChildViews class by model: ", model);
      }
      if (that.childViewDefinitions[modelName] == undefined) {

        that.childViewDefinitions[modelName] = {
          selector : ".hook--" + modelName,
          viewClass : viewClass,
          renderStyle : "replace",
          model : model
        }

        var $parent = that.$el.find(that.childrenParentSelector);
        if ($parent.find('.hook--' + modelName).length == 0) {
          $parent.append('<div class="hook--' + modelName + '"></div>');
        }
      }

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
