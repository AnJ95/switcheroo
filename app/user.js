var
  reqHandler = require('./requests/requestHandler.js'),
  reqGetPinActions = require('./requests/getPinActions.js'),
  reqGetPins = require('./requests/getPins.js'),
  reqGetWidgets = require('./requests/getWidgets.js'),
  reqSendPinAction = require('./requests/sendPinAction.js');

var
  reqs = [reqGetPinActions, reqGetPins, reqGetWidgets, reqSendPinAction];

function User(app, socket) {
  this.app = app;
  this.socket = socket;

  this.awaitAuth();
}

User.prototype.authLevel = 0;

User.prototype.getAuthLevel = function(){
  return this.authLevel;
};

User.prototype.doLogin = function(){
  this.authLevel = 1;
};

User.prototype.awaitAuth = function() {
  var that = this;
  this.socket.on('auth', function (data) {
    var result = that.app.tryAuth(data.pwd);

    if (result) {
      that.awaitRequests();
      that.doLogin();
    }

    that.socket.emit('auth', {success : result});
  });
}

User.prototype.awaitRequests = function() {

  for (var i = 0; i < reqs.length; i++) {
    reqHandler.initConnection(new (reqs[i])(this.app), this.app, this.socket);
  }
}



module.exports = User;
