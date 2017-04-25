const STATIC_DIR      = __dirname + "/..";
const STATIC_PORT     = 8080;
const DEBUG_PREFIX    = "### ";

console.log(DEBUG_PREFIX + 'Starting server...');

var
  express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server);


server.listen(STATIC_PORT);

app.configure(function(){
	app.use(express.static(STATIC_DIR));
});


io.sockets.on('connection', function (socket) {
	socket.emit('chat', { zeit: new Date(), text: 'Du bist nun mit dem Server verbunden!' });
	socket.on('chat', function (data) {
		io.sockets.emit('chat', { zeit: new Date(), name: data.name || 'Anonym', text: data.text });
	});
});


console.log(DEBUG_PREFIX + STATIC_DIR + ":" + STATIC_PORT);
console.log(DEBUG_PREFIX + 'Done.');
