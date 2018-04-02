// name:items.Polygon
// require:shape.Polygon
// require:items.Element

(function () {

    t.Element.Polygon = t.Element.extend('Polygon' , function (scene , opt) {
        Element.call(this , scene , opt);
        Polygon.call(this , opt && opt.points , opt);
        
    } , [Polygon] , {

        clone: function () {
            return new Element.Polygon(this);
        },

        draw: function (context) {
            if (this.getPointsLength()) {

                var points = this.getPoints(),
                    length = points.length,
                    i = 2;

                context.moveTo(points[0] , points[1]);

                while (i < length) {
                    context.lineTo(points[i++] , points[i++]);
                }

            }
        }

    });

})();