define( 'app/lib/Scene', [
    'app/lib/Point',
    'app/lib/Worm'
], function(Point,Worm) {

return function() {
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
    this.draw = function(canvas,paper) {
        var context = canvas.getContext('2d');
        context.clearRect(0,0,canvas.width,canvas.height);
        paper.clear();
        var draw_cb = function(p,size,color) {
            //arc(context,p.x,p.y,size,color,p.alpha);
            var circle = paper.circle(p.x,p.y,size);
            circle.attr("fill",color);
            circle.attr("stroke","black");
        };
        this.me.draw( draw_cb );
        for ( i in this.others ) {
            var he = this.others[i];
            he.draw( draw_cb );
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

});
