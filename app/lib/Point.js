define( 'app/lib/Point', [
], function() {

return function(raphael,x,y,size,color) {
    this.x = x;
    this.y = y;
    this.circle = raphael.circle(x,y,size);
    this.circle.attr("fill",color);
    this.circle.attr("stroke","black");
    $(this.circle.node).css({'vector-effect':'non-scaling-stroke'});
    this.remove = function() {
        this.circle.remove();
    };
};

});
