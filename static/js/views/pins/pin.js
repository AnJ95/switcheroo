window.app = window.app || {};
window.app.views = window.app.views || {};
window.app.views.pins = window.app.views.pins || {};

window.app.views.pins.Pin = window.app.mvr.View.extend({
  template : window.app.templates.pins.pin
});
