window.app = window.app || {};
window.app.mvr = window.app.mvr || {};

window.app.mvr.Extendable = {

  superClass : undefined,

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

    // Add reference to super class
    deepCopy.super = this;

    return deepCopy;
  },


  new : function () {
    // copy this
    var deepCopy = jQuery.extend(true, {}, this);

    return deepCopy;
  },

  info : function(text) {
    console.log("Info: " + text, this);
  },
  warn : function(text) {
    console.warn("Warning: " + text, this);
  },
  error : function(text) {
    console.error("Error: " + text, this);
  }
}
