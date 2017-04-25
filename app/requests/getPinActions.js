var
  c = require('../../config.json');


function GetPinActions () {};

// will be set by RequestHandler
GetPinActions.prototype.app = null;

// will be set by RequestHandler
GetPinActions.prototype.socket = null;

GetPinActions.prototype.getRequestName = function() {
  return 'GetPinActions';
};

GetPinActions.prototype.requestHandler = function (data) {
  this.socket.emit(this.getRequestName(), {
    success : true,
    result : c.pinActions
  });
};

/* ####################################################### */

module.exports = new GetPinActions();
