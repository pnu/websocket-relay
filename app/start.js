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
    var p, color, p_dirty = false;

    $(paper.node).mousemove( function(e) {
        p = paper.pointerInverse(e.clientX,e.clientY);
        color = $('#color').val();
        p_dirty = true;
    });

    setInterval( function() {
        if (!p_dirty) return;
        p_dirty = false;
        scene.moveme(p.x,p.y);
        if (!color) return;
        socket.emit('send', {
            color: color,
            x: p.x,
            y: p.y
        });
    }, 1000/100 );

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
