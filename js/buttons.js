function initButtons() {

  var buttonData;

  $.ajax({
    url: "php/buttons.php",
    data: {},
    success: function (data) {
      buttonData = data;
      refresh(data)
    },
    error: function () {
      console.log("Could not load buttons.json");
    },
    dataType: "json"
  });

  function buttonHandler(index) {
    var btn = buttonData[index];
    btn.$el.addClass("btn--loading");
    sendCommand(btn);
    //buttonData[index].$el.addClass("btn--complete");
  }

  function refresh(buttonData) {

  	$(".btn-section .flow").html("");
  	$.each(buttonData, function(index, btn) {
  		var html = '';
  		html += '<button class="half btn btn--' + index + ' btn--' + btn.action.type + ' ' + ((btn.action.default == true) ? 'btn--active'  : '') + '" style="background-color: ' + btn.color + '">';
  			html += '<div class="btn__icon"><div style="background-image: url(' + btn.icon + ');"></div></div>';
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
