window.app = window.app || {};
window.app.views = window.app.views || {};
window.app.views.header = window.app.views.header || {};

window.app.views.header.Header = window.app.mvr.View.extend({
  template : window.app.templates.header.header,

  childViewDefinitions : [
    {
      selector : ".hook--header__logout",
      viewClass : window.app.views.header.headerBtns.HeaderBtnLogout,
      renderStyle : "replace"
    },
    {
      selector : ".hook--header__pins",
      viewClass : window.app.views.header.headerBtns.HeaderBtnPins,
      renderStyle : "replace"
    }
  ]
});
