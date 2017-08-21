var path = require('path');
var bodyParser = require('body-parser');

module.exports = function(app, io) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.get('/', function(req, res) {
        res.sendFile(path.resolve(__dirname + "/../../Client/index.html"));
    });

    var handle = null;
    var private = null;
    var users = {};
    var keys = {};

    app.post('/login', function(req, res) {
        console.log(req.body.handle);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Method", "'GET, POST, OPTIONS, PUT, PATCH, DELETE'");
        handle = req.body.handle;
        models.user.findOne({ "handle": req.body.handle, "password": req.body.password }, function(err, doc) {
            if (err) {
                res.send(err);
            }
            if (doc == null) {
                res.send("User has not registered");
            } else {
                console.log("Asas" + __dirname);
                //                res.sendFile(path.resolve(__dirname+"/../views/chat1.html"));
                res.send("success");
            }

        });
    });

    io.on('connection', function(socket) {
        console.log('a user connected');
        socket.on('disconnect', function() {
            console.log('user disconnected');
        });

        socket.on('chat', function(msg) {
            socket.broadcast.emit('chat', msg);
        });
    });
}