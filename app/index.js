var
  express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  c = require('../config.json'),
  switcheroo = require('./switcheroo.js');

console.log(c.nodejs.debug_server_prefix + 'Starting server...');

server.listen(c.nodejs.port);

app.configure(function(){
	app.use(express.static(__dirname + c.nodejs.dir));
});


io.sockets.on('connection', function (socket) {
  console.log(c.nodejs.debug_socket_prefix + 'new socket connection established');

	switcheroo.init(socket);

});


console.log(c.nodejs.debug_server_prefix + __dirname + c.nodejs.dir + ":" + c.nodejs.port);
console.log(c.nodejs.debug_server_prefix + 'Done.');
