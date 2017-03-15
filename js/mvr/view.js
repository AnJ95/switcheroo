window.app = window.app || {};
window.app.view = window.app.view || {};

window.app.mvr.View = window.app.mvr.Extendable.extend({

  template : function (model) {
    return "If you see this, a view did not overwrite the template function";
  },

  children : {},

  $el : undefined,

  isRendered : false,

  model : undefined,
  setModel : function(model) {
    this.model = model;
    return this;
  },

  renderStyle : "insert",
  setRenderStyle : function(renderStyle) {
    this.renderStyle = renderStyle;
    return this;
  },

  requireModel : undefined,

  childViewDefinitions : [],

  new : function ($el) {
    // Use default new-method
    var instance = window.app.mvr.Extendable.new.call(this);
    if (this.requireModel != undefined) {
      // Get Model/Collection from ModelManager
      // Data will be asynchronously populated
      // Start listening to Models/Collections changes
      window.app.ModelManager.require(instance.requireModel).attachObserver(instance);
    }

    // Attach $el & return
    instance.$el = $el;
    return instance;
  },

  notify : function () {
    this.renderUpdate();
  },

  renderInitial : function () {
    var resultingHtml = this.template(this.model);

    switch (this.renderStyle) {
      case "insert":
        this.$el.html(resultingHtml);
        break;
      case "replace":
        // ASSERT: There is one parenting object!
        var resultingDom = $.parseHTML(resultingHtml)[0];
        var resulting$ = $(resultingDom);
        this.$el.replaceWith(resulting$);
        this.$el = resulting$;

        break;
      default:
        this.error("Invalid renderStyle: " + this.renderStyle);
    }

    this.renderInitialChildren();

    return this;
  },

  renderInitialChildren : function () {
    var that = this;
    $.each(this.childViewDefinitions, function(i, def) {
      var view = def.viewClass
        .new(that.$el.find(def.selector))
        .setRenderStyle(def.renderStyle || "insert");

      if (def.model != undefined) {
        view.setModel(def.model)
      }

      that.children[i] = view;
      
      view.renderInitial();
    });
  },

  renderUpdate : function () {
    this.renderInitial();
    return this;
  }

});
