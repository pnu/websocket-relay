define( 'app/lib/Worm', [
], function() {

return function(length) {
    this.points = new Array(length);
    this.move = function(point) {
        this.points.push(point);
        var rm = this.points.shift();
        if (rm) rm.remove();
    };
};

});
