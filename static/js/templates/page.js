window.app = window.app || {};
window.app.templates = window.app.templates || {};


window.app.templates.page = function (model) {
  return `
  <audio id="sound--up" preload="auto">
    <source src="sound/sound--c.mp3">
    <source src="sound/sound--c.ogg">
  </audio>
  <audio id="sound--right" preload="auto">
    <source src="sound/sound--a.mp3">
    <source src="sound/sound--a.ogg">
  </audio>
  <audio id="sound--down" preload="auto">
    <source src="sound/sound--f.mp3">
    <source src="sound/sound--f.ogg">
  </audio>
  <audio id="sound--left" preload="auto">
    <source src="sound/sound--b.mp3">
    <source src="sound/sound--b.ogg">
  </audio>
  <audio id="sound--a" preload="auto">
    <source src="sound/sound--d.mp3">
    <source src="sound/sound--d.ogg">
  </audio>

  <div class="login-section">
    <section>
      <div class="flow">
        <div class="half btn" style="visibility: hidden"></div>
        <div class="half btn btn--sound--1 btn--yellow" data-code="up" data-sound="sound--up">
          <div style="background-image: url(img/key/up.png);"></div>
        </div>
        <div class="half btn btn--sound--2 btn--yellow" data-code="left" data-sound="sound--left">
          <div style="background-image: url(img/key/left.png);"></div>
        </div>
        <div class="half btn btn--sound--3 btn--yellow" data-code="right" data-sound="sound--right">
          <div style="background-image: url(img/key/right.png);"></div>
        </div>
        <div class="half btn btn--sound--2 btn--blue" data-code="a" data-sound="sound--a">
          <div style="background-image: url(img/key/a.png);"></div>
        </div>
        <div class="half btn btn--sound--4 btn--yellow" data-code="down" data-sound="sound--down">
          <div style="background-image: url(img/key/down.png);"></div>
        </div>


      </div>
    </section>
  </div>
  <div class="wrapper">

  </div>
  `;
}
