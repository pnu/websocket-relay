define( 'app/lib/Worm', [
], function() {

var Worm = function(length) {
    this.points = new Array(length);
};

Worm.prototype = {
    move: function(point) {
        var points = this.points;
        points.push(point);
        var rm = points.shift();
        if (rm) rm.remove();
    },
    getpathstr: function() {
        var points = this.points;
        var pathstr = "";
        for( i in points ) {
            var cmd = (pathstr == "") ? "M" : "L";
            pathstr = pathstr + cmd + points[i].x + "," + points[i].y;
        }
        return pathstr;
    }
};

return Worm;

});
