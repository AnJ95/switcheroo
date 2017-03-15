window.app = window.app || {};
window.app.view = window.app.view || {};

window.app.view.View = {

  template : function (model) {
    return "If you see this, then a view did not overwrite the template function";
  },
  $el : undefined,
  model : undefined,

  renderInitial : function () {
    this.$el.html(this.template(this.model));

    return this;
  },
  renderUpdate : function () {
    this.renderInitial(this.model);

    return this;
  },

  extend : function (extension) {
    // copy this first
    var deepCopy = jQuery.extend(true, {}, this);

    // Add/replace extensions methods/attributes
    $.each(extension, function (key, val) {
      if (typeof val === 'object') {
        deepCopy[key] = jQuery.extend(true, {}, val);
      } else {
        deepCopy[key] = val;
      }
    });

    return deepCopy;
  },

  new : function ($el) {
    // copy this first
    var deepCopy = jQuery.extend(true, {}, this);

    deepCopy.$el = $el;

    return deepCopy;
  }
}
