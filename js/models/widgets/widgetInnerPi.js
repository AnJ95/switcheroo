window.app = window.app || {};
window.app.models = window.app.models || {};
window.app.models.widgets = window.app.models.widgets || {};

window.app.models.widgets.WidgetInnerPi = window.app.models.widgets.Widget.extend({
  currentTime :   function() {return this.json.currentTime;},
  currentDate :   function() {return this.json.currentDate;},
  coreTemp :      function() {return this.json.coreTemp;},
  upTime :        function() {return this.json.upTime;},

  coreColor : function() {
    var startCol = new Array(17, 176, 17);
    var endCol = new Array(176, 17, 17);

    var startTemp = 45;
    var endTemp = 80;

    var color = new Array();

    var prog = (this.json.coreTemp - startTemp) / (endTemp - startTemp);

    if (prog > 1) {
      color = endCol;
    } else if (prog < 0) {
      color = startCol;
    } else {
      for (var i = 0; i <= 2; i++) {
        color[i] = Math.round(startCol[i] + prog * (endCol[i] - startCol[i]));
      }
    }
    return "rgb("+color[0]+","+color[1]+","+color[2]+")";
  }
});
