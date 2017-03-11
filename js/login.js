function initLogin() {

  // Preload sound
  preloadSound("sound/sound--c.mp3");
  preloadSound("sound/sound--d.mp3");
  preloadSound("sound/sound--b.mp3");
  preloadSound("sound/sound--a.mp3");
  preloadSound("sound/sound--f.mp3");

  // Create local var loginAttempt to hold user input so far
  var loginAttempt = new Array();

  // Attach handlers to buttons
  for (var i = 1; i <= 4; i++) {
      $(".btn--sound--" + i).click(function(){buttonPressed($(this));});
  }

  // button handler function
  function buttonPressed($el) {
    // play corresponding sound
    var soundEl = $("#" + $el.data("sound"))[0];
    soundEl.pause();
    soundEl.currentTime = 0;
    soundEl.volume = 1;
    soundEl.play();

    // keep track of entered login phrase
    loginAttempt[loginAttempt.length] = $el.data("code");
    if (loginAttempt.length >= 8) {
      login(loginAttempt.join(" "));
      loginAttempt = new Array();
    }
  }

  // attempt to login with given pwd, may login even with wrong password if already logged in
  function login(pwd) {
    $.ajax({
  		url: "php/auth.php",
      method: "post",
  		data: {
        pwd: pwd
      },
  		success: function (data) {
        if (data.success) {
            initAfterLogin();
            $(".login-section").addClass("active");
        } else {
          console.log("Could not login: " + data.error);
        }
      },
  		error: function () {
  			console.log("Could not load login file");
  		},
  		dataType: "json"
  	});
  }

  // initial login to check whether cookie authenticates already
  login("");

}
