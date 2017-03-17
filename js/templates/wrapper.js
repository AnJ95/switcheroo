window.app = window.app || {};
window.app.templates = window.app.templates || {};


window.app.templates.wrapper = function (model) {
  return `
    <!-- Header -->
    <header></header>

    <!-- Window -->
    <div class="window"><div class="window__inner"></div></div>

    <!-- Widgets Section -->
    <div class="hook--widgets"></div>

    <div class="clear"></div>

    <!-- Btn Section -->
    <div class="hook--pinActions"></div>
  `;
}
