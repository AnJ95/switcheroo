window.app = window.app || {};
window.app.views = window.app.views || {};

window.app.views.Window = window.app.mvr.View.extend({
  template : window.app.templates.window,

  new : function ($el) {
    // Use default new-method
    var instance = window.app.mvr.View.new.call(this, $el);

    window.app.window = instance;
    instance.innerView = window.app.views.pins.Pins.new();

    return instance;
  },

  renderInitial : function() {
    window.app.mvr.View.renderInitial.call(this);

    this.innerView.$el = this.$el.find(".window__inner");
    this.innerView.renderInitial();

    return this;
  },

  open : function() {
    console.log("THIS",this);
    // visually open window
    this.$el.addClass("active");

    return this;
  },

  close : function() {
    this.$el.removeClass("active");

    return this;
  }

});
