window.app = window.app || {};
window.app.view = window.app.view || {};

window.app.mvr.View = window.app.mvr.Extendable.extend({

  template : function (model) {
    return "If you see this, a view did not overwrite the template function";
  },

  $el : undefined,

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

  childViewDefinitions : [],

  new : function ($el) {
    // Use default new-method
    // Not the nicest practice, but
    // this.super.new... produces endless recursion
    var instance = window.app.mvr.Extendable.new.call(this);

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

    var that = this;

    $.each(this.childViewDefinitions, function(i, def) {
      def.viewClass
        .new(that.$el.find(def.selector))
        .setRenderStyle(def.renderStyle || "insert")
        .renderInitial();
    })

    return this;
  },

  renderUpdate : function () {
    this.renderInitial();
    return this;
  }

});
