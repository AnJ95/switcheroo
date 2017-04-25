window.app = window.app || {};
window.app.templates = window.app.templates || {};
window.app.templates.header = window.app.templates.header || {};


window.app.templates.header.header = function (model) {
  return `
    <div class="header__logo"><img src="img/logo.png" /></div>
    <div class="hook--header__logout"></div>
    <div class="hook--header__pins"></div>
  `;
}
