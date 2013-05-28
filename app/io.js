define('app/io', [ 'socket.io' ], function() {
    return io.connect(window.location.hostname);
});
