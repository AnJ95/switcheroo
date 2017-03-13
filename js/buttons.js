function initButtons() {

  var buttonData;

  request("GetPinActions", [], function (result) {
    buttonData = result;
    refresh(result);
  });

  function buttonHandler(index) {
    var btn = buttonData[index];
    btn.$el.addClass("btn--loading");

    request("SendPinAction", btn.action,
    // SUCCESS HANDLER
    function (result) {
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
    // ERROR HANDLER
    function () {
      btn.$el.addClass("btn--error");
      window.setTimeout(function(){btn.$el.removeClass("btn--error");}, 500);
      return;
    },
    // GENERAL HANDLER
    function () {
      btn.$el.removeClass("btn--loading");
    });
  }

  function refresh(buttonData) {

  	$(".btn-section .flow").html("");
  	$.each(buttonData, function(index, btn) {
  		var html = '';
      var color = "rgb(" + btn.color[0] + "," + btn.color[1] + "," + btn.color[2] + ")";
      var darkColor = "rgb(" + Math.round(btn.color[0]*0.8) + "," + Math.round(btn.color[1]*0.8) + "," + Math.round(btn.color[2]*0.8) + ")";

  		html += '<button class="half btn btn--' + index + ' btn--' + btn.action.type + ' ' + ((btn.action.default == true) ? 'btn--active'  : '') + '" style="background-color: ' + color + '">';
  			html += '<div class="btn__icon" style="box-shadow: 0 3px 0 0 ' + darkColor + ';"><div style="background-image: url(' + btn.icon + ');"></div></div>';
  			if (btn.action.type == "toggle") {
  				html += '<div class="btn__toggle"><span class="btn__toggle__icon"></span></div>';
          btn.action.value = btn.action.default;
  			}

  		html += '</button>';

  		$(".btn-section .flow").append(html);

      buttonData[index]["$el"] = $(".btn--" + index);
      $(".btn--" + index).click(function () {buttonHandler(index);});
  	});
  }


}
