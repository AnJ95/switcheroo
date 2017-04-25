var
  app = null,
  cmd = require('./../cmd.js');



String.prototype.allReplace = function(obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
};



function formatCurrentDate (raw) {
  var date = raw.trim();

  // error handling
  if (date == "") {
    date = "Mon 00.00.0000";
    app.debug.warn("Could not get date via command");
  }

  return date;
}

function formatCurrentTime (raw) {
  var time = raw.trim();

  // error handling
  if (time == "") {
    time = "00:00";
    app.debug.warn("Could not get time via command");
  }

  return time;
}

function formatUpTime (raw) {
  upTime = raw.trim();

  // error handling
  if (upTime == "") {
    upTime = "up 0 minutes";
    app.debug.warn("Could not get uptime via command");
  }

  return upTime.allReplace({
    "up " : "",
    " years" : "y",
    " year" : "y",
    " months" : "m",
    " month" : "m",
    " weeks" : "w",
    " week" : "w",
    " days" : "d",
    " day" : "d",
    " hours" : "h",
    " hour" : "h",
    " minutes" : "min",
    " minute" : "min",
    "," : ""
  });
}

function formatCoreTemp (raw) {
  var coreTemp = raw.trim();

  // error handling
  if (coreTemp == "") {
    coreTemp = "temp=0'C";
    app.debug.warn("Could not get coreTemp via command");
  }

  coreTemp = coreTemp.split("=");
  coreTemp = coreTemp[1];
  coreTemp = coreTemp.split("'");
  return coreTemp[0];
}

module.exports = function(_app, handler) {
  app = _app;

  cmd(app, [
    'date +"%a %d.%m.%y"',
    'date +"%H:%M"',
    'uptime --pretty',
    'vcgencmd measure_temp'
  ], function (r) {

    handler({
      type : "pi",
      currentDate : formatCurrentDate(r[0]),
      currentTime : formatCurrentTime(r[1]),
      upTime : formatUpTime(r[2]),
      coreTemp : formatCoreTemp(r[3])
    });

  });
}
