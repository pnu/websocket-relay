define( 'app/lib/Scene', [
    'app/lib/Point',
    'app/lib/Worm'
], function(Point,Worm) {

var Scene = function(paper) {
    var raphael = paper.raphael;
    this.raphael = raphael;
    this.me = new Worm(20);
    this.others = new Array();
    this.path = raphael.path();
};

Scene.prototype = {
    moveme: function(x,y) {
        var raphael = this.raphael;
        var me = this.me;
        var p = new Point(raphael,x,y,0.01);
        this.me.move(p);
        var path = raphael.path(me.getpathstr());
        path.attr("stroke-width",200);
        path.attr("stroke-dasharray","- ");
        $(path.node).css({'vector-effect':'non-scaling-stroke'});
        this.path.remove();
        this.path = path;
    },
    movehim: function(color,x,y) {
        var raphael = this.raphael;
        var others = this.others;
        var p = new Point(raphael,x,y,0.02,color);
        if (!others[color]) others[color] = new Worm(20);
        others[color].move(p);
    }
};

return Scene;

});
