var widgets = widgets || new Array();

function loadInfo() {
  var $el = $(".info-section .flow");


  $.ajax({
    url: "php/info.php",
    data: {},
    success: function (data) {
      if (data.success) {

        // refresh parent container
        $el.html("");

        $.each(data.info, function (name, info) {
            // Create new box for each info section
            $el.append('<div class="half box info--' + name + '"></div>');
            // Fill it with contents
            widgets[name]($('.info--' + name), info);
        });



      } else {
        console.log("Could not load widget: " + data.error);
      }
    },
    error: function () {
      console.log("Could not load widget file");
    },
    dataType: "json"
  });
}
