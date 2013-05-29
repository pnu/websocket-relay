define('app/start', [
    'app/lib/Scene',
    'app/lib/Paper',
    'jquery',
    'socket.io'
], function(Scene,Paper,$,io) { return {

start: function() {
    var socket = io.connect(window.location.hostname);
    var paper = new Paper('svg');
    var scene = new Scene(paper);

    $(paper.node).mousemove( function(e) {
        var p = paper.pointerInverse(e.clientX,e.clientY);
        var color = $('#color').val();
        scene.moveme(p.x,p.y);
        if (!color) return;
        socket.emit('send', {
            color: color,
            x: p.x,
            y: p.y
        });
    });

    socket.on('message', function (data) {
        var x = data.x;
        var y = data.y;
        var color = data.color;
        scene.movehim(color,x,y);
    });

    $('#subscribe').click(function() {
        var ch = $('#receive-channel').val();
        socket.emit('subscribe', ch);
    });
}

}});
