define( 'app/lib/Worm', [
], function() {

return function(length) {
    this.points = new Array(length);
    this.move = function(point) {
        this.points.push(point);
        var rm = this.points.shift();
        if (rm) rm.remove();
    };
    this.getpathstr = function() {
        var points = this.points;
        var pathstr = "";
        for( i in points ) {
            var cmd = (pathstr == "") ? "M" : "L";
            pathstr = pathstr + cmd + points[i].x + "," + points[i].y;
        }
        return pathstr;
    }
};

});
