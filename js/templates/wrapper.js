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

    <div class="playground"></div>

    <!-- Btn Section -->
    <section class="btn-section">
      <div class="flow"></div>
    </section>
  `;
}
