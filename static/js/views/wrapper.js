window.app = window.app || {};
window.app.views = window.app.views || {};

window.app.views.Wrapper = window.app.mvr.View.extend({
  template : window.app.templates.wrapper,

  childViewDefinitions : [
      {
        selector : "header",
        viewClass : window.app.views.header.Header
      },
      {
        selector : ".hook--widgets",
        viewClass : window.app.views.widgets.Widgets,
        renderStyle : "replace"
      },
      {
        selector : ".hook--pinActions",
        viewClass : window.app.views.pinActions.PinActions,
        renderStyle : "replace"
      },
      {
        selector : ".window",
        viewClass : window.app.views.Window
      }

  ]
});
