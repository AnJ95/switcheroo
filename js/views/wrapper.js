window.app = window.app || {};
window.app.view = window.app.view || {};

window.app.view.Wrapper = window.app.mvr.View.extend({
  template : window.app.templates.wrapper,

  childViewDefinitions : [
      {
        selector : "header",
        viewClass : window.app.view.Header
      }
  ]
});