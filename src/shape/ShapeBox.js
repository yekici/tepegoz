// name:shape.ShapeBox
// require:shape.Shape
// require:core.Bounds


var ShapeBox;

(function () {

    /**
     *
     * @class {ShapeBox}
     */
    t.ShapeBox = ShapeBox = t.class('ShapeBox' , function (game) {

        this.game = game;//lazım olursa

        /**
         *
         * @type {Array}
         * @private
         */
        this._shapes = [];

        /**
         *
         */
        this.bounds = new ShapeBoxBounds(this);

    } , [] , {

        /**
         *
         * @returns {Array}
         */
        getShapes: function () {
            return this._shapes;
        },

        /**
         *
         * @returns {Number}
         */
        getShapesLength: function () {
            return this._shapes.length;
        },

        /**
         * Shape ekli ise indis numarasını deilse false  döndürür
         * @param shape
         * @returns {boolean|number}
         */
        has: function (shape) {
            var i = this._shapes.indexOf(shape);
            return i < 0 ? false : i;
        },

        /**
         * Shape i ekler
         * @param shape
         */
        add: function (shape) {
            if (shape instanceof Shape && !this.has(shape)) {
                this._shapes.push(shape);
            }
        },

        /**
         * Belirtilen Shape i  kaldırır
         * @param shape
         */
        remove: function (shape) {
            var i = this.has(shape);
            if (i) {
                this._shapes.splice(i , 1);
            }
        },

        //zorunlu fonksiyon atamaları

        bindTS: function (ts) {
            var shapes = this._shapes,
                i = shapes.length;

            if (i) {

                if (i == 1) {
                    shapes[0].bindTS(ts);
                } else {
                    while (i--) {
                        shapes[i].bindTS(ts);
                    }
                }

            }

        },

        /**
         *
         * @param x
         * @param y
         * @param without
         */
        containsPoint: function (x , y , without) {
            var shapes = this._shapes,
                i = shapes.length;

            if (i) {
                if (i == 1) {
                    return shapes[0].containsPoint(x , y , without);
                } else {
                    while (i--) {
                        if (shapes[i].containsPoint(x , y , without)) {
                            return true;
                        }
                    }
                }
            }

            return false;
        }

    });

    var ShapeBoxBounds = t.Bounds.extend('ShapeBoxBounds' , function (shapebox) {

        this.shapebox = shapebox;

    } , {


        /**
         * Noktanın sınırlar içerisinde kalıp kalmadığını kontrol eder.(çok ağır çalışır önerilmez)
         * @param {number} x
         * @param {number} y
         * @return {boolean}
         */
        containsPoint: function (x , y) {

            if (x < this.x || x > this.mx || y < this.y  || y > this.my) {
                return false;
            }

            return true;

        },


        //bypass

        calcSize: function () {},
        reset: function () {},
        handle: function () {},
        handleArray: function () {}
    });

    Object.defineProperties(ShapeBoxBounds.prototype , {

        x: {
            get: function () {
                var shapebox = this.shapebox,
                    shapes = shapebox.getShapes(),
                    i = shapes.length;

                if (i) {
                    if (i == 1) {
                        return shapes[0].bounds.x;
                    } else {

                        var x = Infinity;

                        while (i--) {
                            if (shapes[i].bounds.x < x)
                                x = shapes[i].bounds.x;

                        }

                        return x;
                    }

                }


                return -Infinity;
            },
            set: function () {}
        },

        y: {
            get: function () {
                var shapebox = this.shapebox,
                    shapes = shapebox.getShapes(),
                    i = shapes.length;

                if (i) {
                    if (i == 1) {
                        return shapes[0].bounds.y;
                    } else {

                        var y = Infinity;

                        while (i--) {
                            if (shapes[i].bounds.y < y)
                                y = shapes[i].bounds.y;

                        }

                        return y;
                    }

                }


                return -Infinity;
            },
            set: function () {}
        },

        mx: {
            get: function () {
                var shapebox = this.shapebox,
                    shapes = shapebox.getShapes(),
                    i = shapes.length;

                if (i) {
                    if (i == 1) {
                        return shapes[0].bounds.mx;
                    } else {

                        var x = -Infinity;

                        while (i--) {
                            if (shapes[i].bounds.mx > x)
                                x = shapes[i].bounds.mx;

                        }

                        return x;
                    }

                }


                return Infinity;
            },
            set: function () {}
        },

        my: {
            get: function () {
                var shapebox = this.shapebox,
                    shapes = shapebox.getShapes(),
                    i = shapes.length;

                if (i) {
                    if (i == 1) {
                        return shapes[0].bounds.my;
                    } else {

                        var y = -Infinity;

                        while (i--) {
                            if (shapes[i].bounds.my > y)
                                y = shapes[i].bounds.my;

                        }

                        return y;
                    }

                }


                return Infinity;
            },
            set: function () {}
        },

        width: {
            get: function () {
                return this.mx - this.x;
            },
            set: function () {}
        },

        height: {
            get: function () {
                return this.my - this.y;
            },
            set: function () {}
        }

    })

})();