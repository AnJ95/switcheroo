var widgets = widgets || new Array();

function loadInfo() {
  var $el = $(".info-section .flow");

  request("GetWidgets", [], function (result) {
    // refresh parent container
    $el.html("");

    $.each(result, function (name, info) {
        // Create new box for each info section
        $el.append('<div class="half box widget--' + name + '"></div>');
        // Fill it with contents
        widgets[name]($('.widget--' + name), info);
    });
  });

}
