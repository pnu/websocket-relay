define( 'app/main', [
    'app/lib/Scene',
    'app/lib/Paper',
    'jquery',
    'socket.io'
], function(Scene,Paper,$,io) {

var App = function() {
    var app = this;
    $(document).ready(function(){
        app.start();
    });
};

App.prototype = {
    start: function() {
        var sres = 10000;
        var socket = io.connect(window.location.hostname);
        var paper = new Paper('svg');
        var scene = new Scene(paper);
        var p, color;

        $(paper.node).mousemove( function(e) {
            var point = paper.pointerInverse(e.clientX,e.clientY);
            p = { x: Math.round(point.x*sres)/sres, y: Math.round(point.y*sres)/sres };
            color = $('#color').val();
            scene.moveme(p.x,p.y);
            if (color)
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
};

return App;

});
