// name:test.shape
// require:shape.Polygon

(function () {

    t.test('shape.Polygon' , function () {

        var polygon = new Polygon;

        polygon.offset.x = 15;

        polygon.addPoint(15 , 15);

        t.assert(polygon.getTransformedPoint(0).x == 30);

        polygon.addPoint(30 , 15);
        polygon.addPoint(30 , 30);
        polygon.addPoint(15 , 30);

        polygon.offset.x = 0;

        //t.assert(!polygon.containsPoint(15 , 15));
        t.assert(!polygon.containsPoint(30 , 30));
        t.assert(polygon.containsPoint(20 , 20));
        t.assert(polygon.containsPoint(15 , 15));
        t.assert(!polygon.containsPoint(0 , 0));


        polygon.offset.x = 30;

        t.assert(!polygon.containsPoint(15 , 15));
        t.assert(!polygon.containsPoint(30 , 30));
        t.assert(!polygon.containsPoint(20 , 20));
        t.assert(!polygon.containsPoint(15 , 15));
        t.assert(!polygon.containsPoint(0 , 0));


    });

    t.test('shape.Rectangle' , function () {
        var rect = new Rectangle;


        rect.width = 150;
        rect.height = 150;

        rect.x = 15;
        rect.y = 15;

        t.assert(rect.width == 150);
        t.assert(rect.height == 150);
        t.assert(rect.x == 15);
        t.assert(rect.y == 15);

    });

})();
