function initHeader() {
  $("header").click(function() {
    closeWindow();
  });

  $("#header__logout").click(function() {
    $.ajax({
      url: "php/auth.php",
      method: "post",
      data: {
        logout : true
      },
      success: function (data) {
        //window.location.reload();
        $(".login-section").removeClass("active");
      },
      error: function () {
        console.log("Could not logout");
      },
    });
  });


  $("#header__pins").click(function() {
    $.ajax({
      url: "php/getPins.php",
      data: {},
      success: function (data) {
        if (data.success) {

          var html = '';

          $.each(data.text, function (x, column) {
            html += '<div class="half">';
            $.each(column, function (y, cell) {
                html += '<div class="pin-line' + ((cell.val == "1") ? " btn--active" : "") + '">';
                if (cell.id != "")
                  {html += '<div class="pin-line__id">' + cell.id +  '</div>';}
                else
                  {html += '<div class="pin-line__nothing">' + cell.id +  '</div>';}
                html += '<div class="pin-line__name">' + cell.name +  '</div>';
                html += '<div class="pin-line__dir">' + cell.dir +  '</div>';
                html += '<div class="pin-line__val btn__toggle"><span class="btn__toggle__icon"></span></div>';
                html += '</div>';
            });
            html += '</div>';
          });
          html += '<div class="clear"></div>';

          openWindow(html);
        } else {
          console.log("Could not load pins: " + data.error);
        }
      },
      error: function () {
        console.log("Could not load getPins.php");
      },
      dataType: "json"
    });
  });

}
