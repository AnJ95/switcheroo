var
  c = require('../../config.json');

/* ####################################################### */

function RequestHandler() {}

/* ####################################################### */

RequestHandler.prototype.initConnection = function(request, app, socket) {
  app.debug.socket("Initializing socket receive for " + request.getRequestName());

  request.app = app;
  request.socket = socket;

  // initialize request
  request.init();

  // add receive -> send handler
  socket.on(request.getRequestName(), function(data) {
    app.debug.socket("Received request for " + request.getRequestName());
    request.requestHandler(data);
  });
};

/* ####################################################### */

module.exports = new RequestHandler();
