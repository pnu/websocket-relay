define('app/start', [
    'app/lib/Scene',
    'raphael',
    'jquery',
    'socket.io'
], function(Scene,Raphael,$,io) { return {

start: function() {

    var socket = io.connect(window.location.hostname);
    var canvas = $('#canvas')[0];
    var paper = Raphael($('#svg')[0]);

    var circle = paper.circle(50,50,10);
    circle.attr("fill","blue");
    circle.attr("stroke","black");

    var findPos = function(obj) {
        var curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return { x: curleft, y: curtop };
        }
        return undefined;
    };

    var scene = new Scene();
    setInterval( function() {
        scene.draw(canvas,paper);
    }, 1);

    $('#canvas').mousemove( function(e) {
        var pos = findPos(this);
        var x = e.pageX - pos.x;
        var y = e.pageY - pos.y;
        var color = $('#color').val();
        scene.moveme(x,y);
        if (!color) return;
        socket.emit('send', {
            color: color,
            x: x,
            y: y
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
