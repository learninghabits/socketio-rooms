var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

    socket.join('room 1');


    socket.on('disconnect', function () {
        socket.leave('room 1');
        console.log('user disconnected');
    });


    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        io.to('room 1').emit('chat message', msg);
    });
});

var port = process.argv.slice(2)[0] || (process.env.PORT || 8080);
http.listen(port, function () {
	console.log("SERVER IS LISTENING ON PORT: " + port);
	console.log("CTRL+C TO STOP ");
});

process.on('SIGINT', function () {	
	console.log('BYE BYE, STOPPED GRACIOUSLY!');
	process.exit();
});
