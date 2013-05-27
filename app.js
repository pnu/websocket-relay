var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

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

