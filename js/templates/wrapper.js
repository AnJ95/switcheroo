window.app = window.app || {};
window.app.templates = window.app.templates || {};


window.app.templates.wrapper = function (model) {
  return `
    <!-- Header -->
    <header></header>

    <!-- Window -->
    <div class="window"><div class="window__inner"></div></div>

    <!-- Info Section -->
    <section class="info-section">
      <div class="flow">
        <div class="box">Lade Widgets...  </div>
      </div>
    </section>

    <div class="clear"></div>

    <div class="playground"></div>

    <!-- Btn Section -->
    <section class="btn-section">
      <div class="flow"></div>
    </section>
  `;
}
