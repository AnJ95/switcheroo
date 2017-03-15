<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <script type="text/javascript" src="js/jquery-3.1.1.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="js/header.js"></script>
    <script type="text/javascript" src="js/login.js"></script>
    <script type="text/javascript" src="js/request.js"></script>
    <script type="text/javascript" src="js/buttons.js"></script>
    <script type="text/javascript" src="js/window.js"></script>

    <script type="text/javascript" src="js/widgets.js"></script>
    <script type="text/javascript" src="js/widgets/pi.js"></script>
    <script type="text/javascript" src="js/widgets/weather.js"></script>

    <script type="text/javascript" src="js/init.js"></script>

    <!-- MVR Framework -->
    <script type="text/javascript" src="js/mvr/extendable.js"></script>
    <script type="text/javascript" src="js/mvr/view.js"></script>
    <script type="text/javascript" src="js/mvr/model.js"></script>

    <!-- Views -->
    <script type="text/javascript" src="js/views/exampleView.js"></script>

    <link rel="stylesheet" type="text/css" href="css/central.css">
    <title>Switcheroo</title>
    <link rel="icon" type="image/png" href="img/favicon.png" sizes="128x128">
  </head>
  <body>

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

      <!-- Header -->
      <header>
        <div class="header__logo"><img src="img/logo.png" /></div>
        <div class="header__btn" id="header__logout"><img src="img/icon/logout.png" /></div>
        <div class="header__btn" id="header__pins"><img src="img/icon/pins.png" /></div>
      </header>

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

	  </div>
  </body>
</html>
