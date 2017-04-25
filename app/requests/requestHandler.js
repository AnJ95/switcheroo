var
  c = require('../../config.json');

/* ####################################################### */

function RequestHandler() {}

/* ####################################################### */

RequestHandler.prototype.addRequest = function(request, app, socket) {
  app.debug.socket("Initializing socket receive for " + request.getRequestName());

  request.app = app;
  request.socket = socket;

  socket.on(request.getRequestName(), function(data) {
    request.requestHandler(data);
  });
};

/* ####################################################### */

module.exports = new RequestHandler();
