var
  c = require('../config.json'),
  sha1 = require('sha1'),
  colors = require('colors'),
  User = require('./user.js');


colors.setTheme({
  server: 'green',
  socket: 'blue',
  warn: 'yellow',
  error: 'red'
});

var
  users = [];

/* ####################################################### */

function Switcheroo(io) {
  this.io = io;
  this.pins = new (require('./pins.js'))(this);
}

Switcheroo.prototype.emit = function(name, data) {
  this.io.sockets.emit(name, data, arguments[2] || undefined);
}

/* ####################################################### */

Switcheroo.prototype.initConnection = function(socket) {
  var newUser = new User(this, socket);
  users.push(newUser);
}

/* ####################################################### */

Switcheroo.prototype.tryAuth = function(authHash){
  var requiredHash = c.webInterface.authHash;
  var hash = sha1(authHash);

  return hash == requiredHash;
};

Switcheroo.prototype.debug = {
  server : function (msg) {
    console.log((c.nodejs.debug_server_prefix + msg).server);
  },
  socket : function (msg) {
    console.log((c.nodejs.debug_socket_prefix + msg).socket);
  },
  warn : function (msg) {
    console.warn(msg.warn);
  },
  error : function (msg) {
    console.error(msg.error);
  }
}

/* ####################################################### */



module.exports = Switcheroo;
