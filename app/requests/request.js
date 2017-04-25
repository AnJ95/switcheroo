var
  c = require('../../config.json');

/* ####################################################### */

function Request() {}

/* ####################################################### */

Request.prototype.init = function(app, socket) {
  app.debug.server("Initializing socket receive for " + this.requestName);

  this.app = app;
  this.socket = socket;

  socket.on(this.requestName, function(data) {
    this.requestHandler(data);
  });
};

/* ####################################################### */

Request.prototype.requestName = 'defaultRequestName';

Request.prototype.requestHandler = function (data) {
  this.app.debug.warn()
};

/* ####################################################### */

module.exports = new Request();
