window.app = window.app || {};
window.app.views = window.app.views || {};
window.app.views.header = window.app.views.header || {};
window.app.views.header.headerBtns = window.app.views.header.headerBtns || {};

window.app.views.header.headerBtns.HeaderBtnPins = window.app.views.header.headerBtns.HeaderBtn.extend({
  model : {
    name : "pins",
    icon : "img/icon/pins.png"
  },

  clickRequests : [{
    selector : "",
    handler : function() {
      console.log(this);
      window.app.window.open();
    }
  }]
});
