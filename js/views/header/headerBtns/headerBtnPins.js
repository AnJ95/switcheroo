window.app = window.app || {};
window.app.view = window.app.view || {};
window.app.view.header = window.app.view.header || {};
window.app.view.header.headerBtns = window.app.view.header.headerBtns || {};

window.app.view.header.headerBtns.HeaderBtnPins = window.app.view.header.headerBtns.HeaderBtn.extend({
  model : {
    name : "pins",
    icon : "img/icon/pins.png"
  }
});
