var
  express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  c = require('../config.json'),
  switcheroo = require('./switcheroo.js'),
  Pins = new (require('./pins.js'))(switcheroo);


switcheroo.debug.server('Starting server...')

server.listen(c.nodejs.port);


app.use(express.static(__dirname + c.nodejs.dir));


io.sockets.on('connection', function (socket) {
  switcheroo.debug.socket('new socket connection established');
	switcheroo.initConnection(socket);
});


switcheroo.debug.server(__dirname + c.nodejs.dir)
switcheroo.debug.server(c.nodejs.port);
switcheroo.debug.server('Done.')
