define('app/start', [ 'raphael' ], function() { return {
start: function(socket) {
    var paper = Raphael(100,100,320,200);
    var circle = paper.circle(50,50,10);
    circle.attr("fill","blue");
    circle.attr("stroke","black");

    var Point = function(x,y) {
        this.x = x;
        this.y = y;
        this.alpha = 1;
    };

    var Worm = function(length,width,color) {
        this.color = color;
        this.width = width;
        this.points = new Array(length);
        this.add = function(point) {
            this.points.push(point);
            this.points.shift();
        };
        this.fade = function() {
            var i;
            var points = this.points;
            for (i=0; i<points.length; i++) {
                points[i].alpha *= 0.85;
            }
        }
        this.draw = function(cb) {
            var i;
            var points = this.points;
            for (i=0; i<points.length; i++) {
                if (points[i])
                    cb(points[i],width,color);
            }
        }
    };

    var Scene = function() {
        this.me = new Worm(20,5);
        this.others = new Array();
        this.fade = function() {
            this.me.fade();
            for ( i in this.others ) {
                var he = this.others[i];
                he.fade();
            }
        };
        this.moveme = function(x,y) {
            var p = new Point(x,y);
            this.me.add(p);
        };
        this.movehim = function(color,x,y) {
            var p = new Point(x,y);
            if (!this.others[color])
                this.others[color] = new Worm(20,10,color);
            this.others[color].add(p);
        };
        this.draw = function(canvas) {
            var context = canvas.getContext('2d');
            context.clearRect(0,0,canvas.width,canvas.height);
            this.me.draw( function(p,size,color) {
                arc(context,p.x,p.y,size,color,p.alpha);
            });
            for ( i in this.others ) {
                var he = this.others[i];
                he.draw( function(p,size,color) {
                    arc(context,p.x,p.y,size,color,p.alpha);
                });
            }
        };
        function arc(context,centerX,centerY,radius,color,alpha) {
            context.globalAlpha = alpha;
            context.beginPath();
            context.arc(centerX, centerY, radius||10, 0, 2 * Math.PI, false);
            if (color) {
                context.fillStyle = color;
                context.fill();
            }
            context.lineWidth = 2;
            context.strokeStyle = '#003300';
            context.stroke();
        };
    };

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
    var canvas = $('#canvas')[0];
    setInterval( function() {
        scene.draw(canvas);
    }, 1);
    //setInterval( function() {
    //    scene.fade();
    //}, 100);

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
