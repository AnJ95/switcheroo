var
  reqHandler = require('./requests/requestHandler.js'),
  reqGetPinActions = require('./requests/getPinActions.js');
  reqGetWidgets = require('./requests/getWidgets.js');

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
  reqHandler.initConnection(reqGetPinActions, this.app, this.socket);
  reqHandler.initConnection(reqGetWidgets, this.app, this.socket);
}



module.exports = User;
