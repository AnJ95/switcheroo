function initLogin() {

  // Preload sound
  var notes = new Array("c", "d", "b", "a", "f");
  $.each(notes, function(i, note) {
    preloadSound("sound/sound--" + note + ".mp3");
    preloadSound("sound/sound--" + note + ".ogg");
  });

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
      login(loginAttempt.slice(-8).join(" "));
    }
  }

  // attempt to login with given pwd, may login even with wrong password if already logged in
  function login(pwd) {
    $.ajax({
  		url: "request/auth.php",
      method: "post",
  		data: {
        pwd: pwd
      },
  		success: function (data) {
        if (data.success) {
            initAfterLogin();
            $(".login-section").addClass("active");
        } else {
          console.log("Could not login: " + data.text);
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
