var widgets = widgets || new Array();

widgets.pi = function($el, info) {
  var html = '';

  var startCol = new Array(17, 176, 17);
  var endCol = new Array(176, 17, 17);

  var startTemp = 45;
  var endTemp = 80;

  var color = new Array();

  var prog = (info.coreTemp - startTemp) / (endTemp - startTemp);

  if (prog > 1) {
    color = endCol;
  } else if (prog < 0) {
    color = startCol;
  } else {
    for (var i = 0; i <= 2; i++) {
      color[i] = Math.round(startCol[i] + prog * (endCol[i] - startCol[i]));
    }
  }
  var colorFormat = "rgb("+color[0]+","+color[1]+","+color[2]+")";

  html += '<div class="widget--pi__dateTime">';
    html += '<span class="widget--pi__dateTime__time">' + info.currentTime + '</span>';
    html += '<span class="widget--pi__dateTime__date">' + info.currentDate + '</span>';
  html += '</div>';

  html += '<div class="widget--pi__coreTemp">';
    html += '<img src="img/icon/cpu.png" style="background-color: ' + colorFormat + '" />';
    html += '<span>' + info.coreTemp + '&#176;C</span>';
  html += '</div>';

  html += '<div class="clear"></div><div style="height: 10px;">';

  html += '<div class="widget--pi__upTime">';
    html += '<span>' + info.upTime + '</span>';
  html += '</div>';

  $el.html(html);
}
