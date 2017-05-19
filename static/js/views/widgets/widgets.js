window.app = window.app || {};
window.app.views = window.app.views || {};
window.app.views.widgets = window.app.views.widgets || {};

window.app.views.widgets.Widgets = window.app.mvr.CompositeView.extend({
  template : window.app.templates.widgets.widgets,

  requireModel : "widgets",

  childrenParentSelector : ".flow",

  getChildrenViewClassByModel : function(model) {
    return window.app.views.widgets.Widget;
  }
});
