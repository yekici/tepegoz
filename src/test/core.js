// name:test.core
// require:core.Util
// require:core.Vector
// require:core.EventEmitter
// require:core.Matrix2D
// require:core.Bounds


(function () {

    t.test('core.Util' , function () {
        var init = function () {};
        var other = {
            other: function () {}
        };
        var another = {
            another: function () {}
        }
        var cl = t.class(init , [other] , {
            self: function () {}
        });


        t.assert(cl.prototype.constructor === init);

        var obj = new cl;

        t.assert(obj.other);
        t.assert(obj.self);
        t.assert(obj.__proto__.constructor === init);

        var exInit = function () {};
        var extended = cl.extend(exInit, [another] , {
            extended: function () {}
        });

        var exObj = new extended;

        t.assert(exObj instanceof cl);
        t.assert(exObj instanceof extended);
        t.assert(exObj.extended);
        t.assert(exObj.other);
        t.assert(exObj.another);
        t.assert(exObj.self);


        t.assert(t.degreeToRadian(360) == 2 * Math.PI);
        t.assert(t.radianToDegree(2 * Math.PI)  == 360);

    });

    t.test('core.Vector' , function () {
        var v = new V;
        t.assert(v.atr([1,0,0,1,10,10]).x == 10);
        t.assert(v.perp().y == -10);
    });

    t.test('core.ObservableVector' , function () {

        var _status = false;
        var ov = new OV(5 , 5 , function () {
            _status = true;
        });
        ov.y = 10;
        t.assert(_status);

        _status = false;

    });

    t.test('core.EventEmitter' , function () {
        var emitter = new EventEmitter,
            status = false;

        emitter.on('test:event' , function () {
            status = true;
        });

        emitter.emit('test:event');

        t.assert(status);

        status = false;

        emitter.off('test:event');
        emitter.emit('test:event');

        t.assert(!status);


        var context = {};

        emitter.on('argTest' , function (arg1 , arg2) {
            t.assert(arg1);
            t.assert(arg2);
            t.assert(this === context);
        } , context);


        emitter.emit('argTest' , {} , []);

    });

    t.test('core.Matrix2D' , function () {

        var matrix = new Matrix2D([2 , 0 , 0 , 2 , 0 , 0]);


        t.assert(matrix[0] === 2);

        matrix.reset();

        t.assert(matrix[0] === 1);

        var clone = matrix.clone();

        matrix.set([2,2,2,2,2,2]);
        clone.set(matrix);
        t.assert(matrix[5] === clone[5]);

        matrix.reset().multiply([1 , 0, 0 , 1 , 15 , 15]);
        t.assert(matrix[5] === 15);

        matrix.reset();
        matrix.translate(30 , 30);
        var v = matrix.point(0 , 0);
        t.assert(v.x == 30 && v.y == 30);

        matrix.invert();
        t.assert(matrix[4] == -30 && matrix[5] == -30);


        matrix.reset();
        matrix.rotate(1.1);
        t.assert(matrix[1] == 0.8912073600614354);


        matrix.reset();
        matrix.skew(1.1 , 1.1);
        t.assert(matrix[1] == 1.1 && matrix[2] == 1.1);

        matrix.reset();
        matrix.translate(10 , 10);
        matrix.rotate(1.1);
        matrix.invert();
        t.assert(matrix[3] == 0.4535961214255773)


        matrix.reset();
        matrix.rotate(1.1);
        matrix.multiply([1.1,1.1,1.1,1.1,10,10]);
        t.assert(matrix[4] == -4.376112386358581);


    });

    t.test('core.Transformation' , function () {

        var ts = new Transformation;


        ts.scale.x = 3;
        ts.origin.x = 100;

        t.assert(ts.getTSMatrix()[4] === -200);

        var tsWh = new Transformation;

        tsWh.bindTS(ts);

        t.assert(tsWh.getTSMatrix()[4] === -200);

        tsWh.offset.x = 50;

        t.assert(tsWh.getTSMatrix()[4] === -50);

        ts.scale.x = 1;

        t.assert(tsWh.getTSMatrix()[4] === 50);


    });

    t.test('core.Points' , function () {

        var matrix = new Matrix2D,
            points = new Points;

        matrix.translate(10 , 10);

        points.add(15 , 15);
        points.add(44 , 33);
        points.add(11 , 22);

        t.assert(points.getLength() == 3);
        t.assert(points.search(44 , 33 , 4) === false);
        t.assert(points.search(11 , 22 , 2) === 2);
        t.assert(points.remove(44 , 33 , 2) === false);
        t.assert(points.remove(44 , 33 , 1) === true);
        t.assert(points.search(44 , 33) === false);
        t.assert(points.get(1).equals(11 , 22));

        points.transform(matrix);

        t.assert(points.get(1).equals(21 , 32));
    });

    t.test('core.Bounds' , function () {

        var bounds = new Bounds;

        bounds.handleArray([5,5 , 15,5 , 15,15 , 5,15]);

        t.assert(bounds.x == 5);
        t.assert(bounds.y == 5);
        t.assert(bounds.mx == 15);
        t.assert(bounds.mx == 15);
        t.assert(bounds.width == 10);
        t.assert(bounds.height == 10);
        t.assert(bounds.center().equals(10 , 10));
        t.assert(bounds.point(0.2 , 0.2).equals(7 , 7));
        t.assert(bounds.containsPoint(10 , 10));
        t.assert(bounds.containsPoint(7 , 7));
        t.assert(!bounds.containsPoint(4 , 4));

        bounds.reset();

        t.assert(bounds.point(0.3 , 0.3).equals(Infinity , Infinity));
    });

    /*
     new Tween([

     [obj , {
     abc: 400
     }],

     [obj.offset , {
     x: 300,
     y: [300 , 500]
     }]
     ]);
     */

})();