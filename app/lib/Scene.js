define( 'app/lib/Scene', [
    'app/lib/Point',
    'app/lib/Worm'
], function(Point,Worm) {

return function(paper) {
    var raphael = paper.raphael;
    var me = new Worm(20);
    var others = new Array();

    this.moveme = function(x,y) {
        var p = new Point(raphael,x,y,0.01);
        me.move(p);
    };
    this.movehim = function(color,x,y) {
        var p = new Point(raphael,x,y,0.02,color);
        if (!others[color]) others[color] = new Worm(20);
        others[color].move(p);
    };
};

});
