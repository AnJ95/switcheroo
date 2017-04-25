window.app = window.app || {};
window.app.templates = window.app.templates || {};
window.app.templates.header = window.app.templates.header || {};
window.app.templates.header.headerBtns = window.app.templates.header.headerBtns || {};

window.app.templates.header.headerBtns.headerBtn = function (model) {
  // ASSERT: No whitespace!
  return `<div class="header__btn" id="header__${model.name}"><img src="${model.icon}" /></div>`;
}
