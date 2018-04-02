// name:shape.Rectangle
// require:shape.Polygon

var Rectangle;

(function () {

    /**
     * Dikdörtgen
     * x,y  değerleri dikdörtgenin offsetini değiştirir
     * @class {Rectangle}
     * @param {Number} x
     * @param {Number} y
     * @param {Number} width
     * @param {Number} height
     */
    t.Rectangle = Rectangle = t.Polygon.extend('Rectangle' , function (x , y , width , height) {

        x = x || 0;
        y = y || 0;
        width = width || 100;
        height = height || 100;

        t.Polygon.call(this , [0,0 , width,0 , width,height , 0,height]);

        this.offset.set(x , y);
    } , [] , {

        clone: function () {
            return new Rectangle(this.x , this.y , this.width , this.height);
        }


    });

    Object.defineProperties(t.Rectangle.prototype , /**@lends Rectangle.prototype*/{
        x: {
            get: function () {
                return this.offset.x;
            },
            set: function (x) {
                this.offset.x = x;
            }
        },
        y: {
            get: function () {
                return this.offset.y;
            },
            set: function (y) {
                this.offset.y = y;
            }
        },
        width: {
            get: function () {
                return this.getPoints()[2];
            },
            set: function (width) {
                this.setPoint(width , 0 , 1);
                this.setPoint(width , this.getPoints()[5] , 2);
            }
        },
        height: {
            get: function () {
                return this.getPoints()[5];
            },
            set: function (height) {
                this.setPoint(this.getPoints()[4] , height , 2);
                this.setPoint(0 , height , 3);
            }
        }
    });

})();