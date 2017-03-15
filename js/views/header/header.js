window.app = window.app || {};
window.app.view = window.app.view || {};
window.app.view.header = window.app.view.header || {};

window.app.view.header.Header = window.app.mvr.View.extend({
  template : window.app.templates.header.header,

  childViewDefinitions : [
    {
      selector : ".hook--header__logout",
      viewClass : window.app.view.header.headerBtns.HeaderBtnLogout,
      renderStyle : "replace"
    },
    {
      selector : ".hook--header__pins",
      viewClass : window.app.view.header.headerBtns.HeaderBtnPins,
      renderStyle : "replace"
    }
  ]
});
