
function preloadSound(src) {
  var sound = document.createElement("audio");
  if ("src" in sound) {
      sound.autoPlay = false;
  }
  else {
      sound = document.createElement("bgsound");
      sound.volume = -10000;
  }
  sound.src = src;
  document.body.appendChild(sound);
  return sound;
}

function sendCommand(btn) {
  $.ajax({
		url: "php/cmd.php",
    method: "post",
		data: {cmd: btn.action},
		success: function (response) {
      btn.$el.removeClass("btn--loading");

      if (!response.success) {
        btn.$el.addClass("btn--error");
        window.setTimeout(function(){btn.$el.removeClass("btn--error");}, 500);
        return;
      }

      btn.$el.addClass("btn--complete");
      window.setTimeout(function(){btn.$el.removeClass("btn--complete");}, 500);

      if (btn.action.type == "toggle") {
        if (btn.action.value == true) {
          btn.action.value = false;
          btn.$el.removeClass("btn--active");
        } else {
          btn.action.value = true;
          btn.$el.addClass("btn--active");
        }
      }
    },
		error: function () {
      btn.$el.removeClass("btn--loading");
			btn.$el.addClass("btn--error");
      window.setTimeout(function(){btn.$el.removeClass("btn--error");}, 500);
		},
		dataType: "json"
	});
}
