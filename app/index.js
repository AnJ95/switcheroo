const STATIC_DIR      = __dirname + "/..";
const STATIC_PORT     = 8080;


var connect = require('connect');
var serveStatic = require('serve-static');

console.log('Starting server...');
connect().use(serveStatic(STATIC_DIR)).listen(STATIC_PORT, function(){
    console.log(STATIC_DIR + ":" + STATIC_PORT);
    console.log('Done.');
});
