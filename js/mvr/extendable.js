window.app = window.app || {};
window.app.mvr = window.app.mvr || {};

window.app.mvr.Extendable = {

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
