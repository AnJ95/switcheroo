window.app = window.app || {};
window.app.views = window.app.views || {};
window.app.views.header = window.app.views.header || {};
window.app.views.header.headerBtns = window.app.views.header.headerBtns || {};

window.app.views.header.headerBtns.HeaderBtn = window.app.mvr.View.extend({
  template : window.app.templates.header.headerBtns.headerBtn
});
