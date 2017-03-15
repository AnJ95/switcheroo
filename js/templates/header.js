window.app = window.app || {};
window.app.templates = window.app.templates || {};


window.app.templates.header = function (model) {
  return `
    <div class="header__logo"><img src="img/logo.png" /></div>
    <div class="header__btn" id="header__logout"><img src="img/icon/logout.png" /></div>
    <div class="header__btn" id="header__pins"><img src="img/icon/pins.png" /></div>
  `;
}
