function initHeader() {
  $("header").click(function() {
    closeWindow();
  });

  $("#header__logout").click(function() {
    request("Logout", [], function (result) {
      $(".login-section").removeClass("active");
    });
  });


  $("#header__pins").click(function() {

    request("GetPins", [], function (result) {
      var html = '';

      $.each(result, function (x, column) {
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
    });

  });

}
