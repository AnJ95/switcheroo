window.app = window.app || {};
window.app.view = window.app.view || {};

window.app.view.View = window.app.mvr.Extendable.extend({

  template : function (model) {
    return "If you see this, then a view did not overwrite the template function";
  },
  $el : undefined,
  model : undefined,

  notify : function() {
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
