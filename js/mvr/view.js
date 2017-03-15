window.app = window.app || {};
window.app.view = window.app.view || {};

window.app.mvr.View = window.app.mvr.Extendable.extend({

  template : function (model) {
    return "If you see this, a view did not overwrite the template function";
  },
  $el : undefined,
  model : undefined,

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
    this.$el.html(this.template(this.model));

    return this;
  },

  renderUpdate : function () {
    this.renderInitial();

    return this;
  }
});
