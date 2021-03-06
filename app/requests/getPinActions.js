var
  c = require('../../config.json');


function GetPinActions (app) {
  this.app = app;
};

// will be set by RequestHandler
GetPinActions.prototype.app = null;
GetPinActions.prototype.socket = null;

GetPinActions.prototype.getRequestName = function() {
  return 'GetPinActions';
};

GetPinActions.prototype.init = function () {

};

GetPinActions.prototype.requestHandler = function (data) {
  this.socket.emit(this.getRequestName(), {
    success : true,
    result : c.pinActions
  });
};

/* ####################################################### */

module.exports = GetPinActions;
