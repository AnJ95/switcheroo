window.app = window.app || {};
window.app.views = window.app.views || {};
window.app.views.pins = window.app.views.pins || {};

window.app.views.pins.Pins = window.app.mvr.CompositeView.extend({
  template : window.app.templates.pins.pins,

  requireModel : "pins",

  childrenParentSelector : ".flow",

  getChildrenViewClassByModel : function(model) {
    return window.app.views.pins.Pin;
  }
});
