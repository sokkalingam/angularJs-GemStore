var http = require("http");

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(5000, function(){
    console.log('Server running on localhost:5000...');
});