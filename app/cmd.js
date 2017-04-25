var exec = require('child_process').exec;

var exec_cmd = function (app, cmds, successHandler) {
  var args = arguments;

  if (cmds.length == 0) {
    app.debug.warn("Tried executing 0 commands");
  }

  exec(cmds[0], function (error, stdout, stderr) {
    if (stdout !== null) {

      var resultsSoFar = args[3] || [];
      resultsSoFar.push(stdout);

      if (cmds.length == 1) {
        successHandler(resultsSoFar);
      } else {
        cmds.splice(0, 1);
        exec_cmd(app, cmds, successHandler, resultsSoFar)
      }

    } else {
      app.debug.error('exec error: ' + error);
    }

  });
}


module.exports = exec_cmd;
