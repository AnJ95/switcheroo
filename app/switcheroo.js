var
  c = require('../config.json'),
  sha1 = require('sha1'),
  reqHandler = require('./requests/requestHandler.js'),
  reqGetPinActions = require('./requests/getPinActions.js');

/* ####################################################### */

function Switcheroo() {}

/* ####################################################### */

Switcheroo.prototype.init = function(socket) {

  var that = this;
  socket.on('auth', function (data) {
    var result = that.tryAuth(data.pwd);
    socket.emit('auth', {success : result});
  });

  reqHandler.addRequest(reqGetPinActions, this, socket);

}

/* ####################################################### */

Switcheroo.prototype.authLevel = 0;

Switcheroo.prototype.getAuthLevel = function(){
  return this.authLevel;
};

Switcheroo.prototype.doLogin = function(){
  this.authLevel = 1;
};

Switcheroo.prototype.tryAuth = function(authHash){
  var requiredHash = c.webInterface.authHash;
  var hash = sha1(authHash);

  if (hash == requiredHash) {
    this.doLogin();
    return true;
  }

  return false;
};

Switcheroo.prototype.debug = {
  server : function (msg) {
    console.log(c.nodejs.debug_server_prefix + msg);
  },
  socket : function (msg) {
    console.log(c.nodejs.debug_socket_prefix + msg);
  },
  warn : function (msg) {
    console.warn(msg);
  }
}

/* ####################################################### */



module.exports = new Switcheroo();
