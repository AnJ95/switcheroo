window.app = window.app || {};
window.app.view = window.app.view || {};
window.app.view.widgets = window.app.view.widgets || {};

window.app.view.widgets.Widgets = window.app.mvr.CompositeView.extend({
  template : window.app.templates.widgets.widgets,

  requireModel : "widgets",

  childrenParentSelector : ".flow",

  getChildrenViewClassByModel : function(model) {
    return window.app.view.widgets.Widget
  }
});
