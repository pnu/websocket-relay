define( 'app/lib/Paper', [
    'raphael',
], function(Raphael) {

var Paper = function(container) {
    var paper = Raphael(container);
    paper.setViewBox(0,0,1,1,true);
    var box = paper.rect(0,0,1,1);
    box.attr("stroke-dasharray","-");
    $(box.node).css({'vector-effect':'non-scaling-stroke'});
    this.raphael = paper;
    this.node = paper.canvas;
}

Paper.prototype = {
    pointerInverse: function(x,y) {
        var node = this.node;
        var point = node.createSVGPoint();
        var matrix = node.getScreenCTM().inverse();
        point.x = x; point.y = y;
        return point.matrixTransform(matrix);
    }
};

return Paper;

});
