var
  c = require('../../config.json'),
  requestPi = require('./../widgets/pi.js');
  request = require('request');


function GetPinActions () {};

// will be set by RequestHandler
GetPinActions.prototype.app = null;
GetPinActions.prototype.socket = null;

GetPinActions.prototype.getRequestName = function() {
  return 'GetWidgets';
};

GetPinActions.prototype.requestHandler = function (data) {

  var that = this;

  requestPi(this.app, function(result) {

    that.socket.emit(that.getRequestName(), {
      success : true,
      result : {
        pi : result
      }
    });

  })

};



/* ####################################################### */

module.exports = new GetPinActions();
