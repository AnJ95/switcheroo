window.app = window.app || {};
window.app.mvr = window.app.mvr || {};

window.app.mvr.Extendable = {

  /*
  Holds a reference to the super class or undefined if there is none
  */
  super : undefined,


  /*
  Extends a class that can overwrite or add functionality
  */
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


  /*
  Instantiates the class
  */
  new : function () {
    // copy this
    var deepCopy = jQuery.extend(true, {}, this);

    return deepCopy;
  },


  /*
  Outputs a console information
  */
  info : function(text) {
    console.log("Info: " + text, this);
  },


  /*
  Outputs a console warning
  */
  warn : function(text) {
    console.warn("Warning: " + text, this);
  },


  /*
  Outputs a console error
  */
  error : function(text) {
    console.error("Error: " + text, this);
  }
}
