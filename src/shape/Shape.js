// name:shape.Shape

var Shape;

(function () {

    /**
     *
     * @class {Shape}
     */
    t.Shape = Shape = t.class('Shape' , function (opt) {
        Transformation.call(this , opt || {});

        /**
         * Zorunlu
         * @type {Bounds}
         */
        this.bounds = new Bounds;

        if (this.containsPoint == Shape.prototype.containsPoint) {
            t.warn('this.containsPoint == Shape.prototype.containsPoint');
        }

        if (this.clone == Shape.prototype.clone) {
            t.warn('this.clone == Shape.prototype.clone');
        }

    } , [Transformation] , {

        // zorunlu
        containsPoint: function (x , y , without) {},
        clone: function () {}

    });

})();