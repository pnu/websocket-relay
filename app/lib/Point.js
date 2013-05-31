define( 'app/lib/Point', [
], function() {

var Point = function(raphael,x,y,size,color) {
    this.x = x;
    this.y = y;
    this.circle = raphael.circle(x,y,size);
    this.circle.attr("fill",color);
    this.circle.attr("stroke","black");
    $(this.circle.node).css({'vector-effect':'non-scaling-stroke'});
};

Point.prototype = {
    remove: function() {
        this.circle.remove();
    }
};

return Point;

});
