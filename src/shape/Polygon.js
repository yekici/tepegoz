// name:shape.Polygon
// require:core.Transformation
// require:shape.Shape


var Polygon;

(function () {

    /**
     * Çokgen
     * @param {Array} points [5,5 , 10,10 , 11,11] sıralı
     * @class {Polygon}
     */
    t.Polygon = Polygon = t.Shape.extend('Polygon' , function (points , opt) {

        Shape.call(this , opt);



        /**
         * Sıralı ikili şeklinde tutulacak
         * x,y , x,y
         * @type {Array}
         * @private
         */
        this._points = new Points;

        /**
         * Transformation uygulanmış noktalar
         * @type {Array}
         * @private
         */
        this._tPoints = new Points;


        this._tsuid = -1;

        if (points && points.getPoints)
            points = points.getPoints();

        if (t.isArray(points)) {
            for (var i = 0 ; i < points.length ; i+=2) {
                this.addPoint(points[i] , points[i + 1]);
            }
        }

    } , [] , /**@lends Polygon.prototype*/{

        clone: function () {
            var pl = new Polygon;
            Transformation.call(pl , this);
            pl._points = this._points.clone();
            pl._tPoints = this._tPoints.clone();
            pl.bounds.handleArray(pl.getTransformedPoints() , true);
            return pl;
        },

        /**
         *
         * @returns {*}
         */
        getPoints: function () {
            return this._points.getPoints();
        },

        /**
         *
         * @returns {*}
         */
        getTransformedPoints: function () {

            var _matrix = this.getTSMatrix(),
                _tps = this._tPoints.getPoints();

            if (this._tsuid != _matrix.id) {
                this._tPoints.transform(_matrix , null , this._points.getPoints());
                this.bounds.handleArray(_tps , true);
                this._tsuid = _matrix.id;
            }

            return _tps;
        },


        /**
         * Nokta sayısını döndürür
         * @returns {number}
         */
        getPointsLength: function () {
            return this._points.getLength() / 2;
        },

        /**
         *
         * @param {number} x
         * @param {number} y
         * @param {number} [index=0]
         * @returns {Polygon}
         */
        addPoint: function (x , y , index) {

            var points = this._points,
                tPoints = this._tPoints,
                matrix = this.getTSMatrix(),
                list = tPoints.getPoints();

            points.add(x , y , index);

            tPoints.add(x , y , index);

            if (index == null) {
                index = tPoints.getLastIndex();
            }

            tPoints.transform(matrix , index);

            this.bounds.handle(list[index * 2] , list[index * 2 + 1]);

            return this;
        },

        /**
         *
         * @param {number} x
         * @param {number} y
         * @param {number} [index=0] Belirtilen index ten itibaren aramaya başlar
         * @return {number|boolean} Bulunursa index sini yoksa false döndürür
         */
        searchPoint: function (x , y , index) {
            return this._points.search(x , y , index);
        },


        /**
         * Transformed noktalarda arama yapar
         * @param {number} x
         * @param {number} y
         * @param {number} [index=0] Belirtilen index ten itibaren aramaya başlar
         * @return {number|boolean} Bulunursa index sini yoksa false döndürür
         */
        searchTransformedPoint: function (x , y , index) {
            this.getTransformedPoints(); // değişilik varsa uygulasın diye
            return this._tPoints.search(x , y , index);
        },

        /**
         *
         * @param {number} index
         */
        delete: function (index) {
            this._points.delete(index);
            this._tPoints.delete(index);
            this.bounds.handleArray(this.getTransformedPoints() , true);
        },

        /**
         *
         * @param {number} index
         * @param {Vector=} vector Gönderilerse noktayı bu vektöre yazar
         */
        getPoint: function (index , vector) {
            return this._points.get(index , vector);
        },

        /**
         *
         * @param {number} index
         * @param {Vector=} vector Gönderilerse noktayı bu vektöre yazar
         */
        getTransformedPoint: function (index , vector) {
            return this._tPoints.get(index , vector);
        },


        /**
         *
         * @param {number} x
         * @param {number} y
         * @param {number} index
         */
        setPoint: function (x , y , index) {
            this._points.set(x , y , index);
            this._tPoints.set(x , y , index);
            this._tPoints.transform(this.getTSMatrix() , index);
            this.bounds.handleArray(this.getTransformedPoints() , true);
            return this;
        },

        /**
         * Çokgenin belirtilen noktayı içerip içermediğini konrol eder
         * @param {number} x
         * @param {number} y
         * @param {boolean} without True ise ts uygulanmamış noktalara göre sonuç döndürür
         */
        containsPoint: function (x , y , without) {



            if (this.getTransformedPoints() && !this.bounds.containsPoint(x , y)) {
                return false;
            }


            var points = without ? this.getPoints() : this.getTransformedPoints(),
                length = points.length,
                inside = false,
                i , j,
                pix, piy, pjx, pjy;


            // https://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
            for (i = 0 , j = length - 2 ; i < length ; j = i , i+=2) {
                pix = points[i];
                piy = points[i + 1];
                pjx = points[j];
                pjy = points[j + 1];

                if (((piy > y) != (pjy > y)) && (x < (pjx - pix) * (y - piy) / (pjy - piy) + pix)) {
                    inside = !inside;
                }

            }

            return inside;

        }

    });


})();