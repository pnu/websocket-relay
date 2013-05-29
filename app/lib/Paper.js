define( 'app/lib/Paper', [
    'raphael',
], function(Raphael) {

return function(container) {
    var paper = Raphael(container);
    paper.setViewBox(0,0,1,1,true);
    var box = paper.rect(0,0,1,1);
    box.attr("stroke-dasharray","-");
    $(box.node).css({'vector-effect':'non-scaling-stroke'});

    this.raphael = paper;
    this.node = this.raphael.canvas;
    this.pointerInverse = function(x,y) {
        var point = this.node.createSVGPoint();
        var matrix = this.node.getScreenCTM().inverse();
        point.x = x; point.y = y;
        p = point.matrixTransform(matrix);
        return { x: p.x, y: p.y };
    };
};

});
