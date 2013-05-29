define( 'app/lib/Worm', [
], function() {

return function(length,width,color) {
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

});
