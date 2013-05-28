var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

if ( process.env.FORCE_XHR ) {
    io.configure(function () {
        io.set("transports", ["xhr-polling"]);
        io.set("polling duration", 10);
    });
}

app.use('/assets',express.static(__dirname+'/assets'));
app.use('/jam',express.static(__dirname+'/jam'));
app.use('/app',express.static(__dirname+'/app'));

server.listen(process.env.PORT || 5000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
    socket.on('subscribe', function(room) {
        socket.join(room);
    })
    socket.on('unsubscribe', function(room) {
        socket.leave(room);
    })
    socket.on('send', function(data) {
        io.sockets.in(data.channel).emit('message', data);
    });
});

