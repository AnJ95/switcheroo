window.app = window.app || {};
window.app.view = window.app.view || {};
window.app.view.widgets = window.app.view.widgets || {};

window.app.view.widgets.Widget = window.app.mvr.View.extend({
  template : window.app.templates.widgets.widget,

  childViewDefinitions : []

});
