var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ip = require('ip');
var path = require('path');

app.use(express.static('Client'));

require("./Server/controller/chat.js")(app, io);

http.listen(8080, function() {
    console.log("Node Server is setup and it is listening on http://" + ip.address() + ":8080");
})