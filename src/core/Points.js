// name:core.Points
// require:core.Matrix2D

var Points;

(function () {

    /**
     * Sıralı ikili şeklinde noktaları tutar
     * x,y , x,y
     * @param {array} points
     * @class Points
     */
    t.Points = Points = t.class(function (points) {

        this._points = points ? points.slice() : [];

    } , {

        /**
         *
         */
        clone: function () {
            return new Points(this._points);
        },

        /**
         * Nokta sayısını döndürür
         * @returns {number}
         */
        getLength: function () {
            return this._points.length / 2;
        },

        /**
         *
         * @returns {number}
         */
        getLastIndex: function () {
            return (this._points.length / 2) - 1
        },

        /**
         *
         * @param {number} x
         * @param {number} y
         * @param {number} [index=0]
         */
        add: function (x , y , index) {

            if (index == null) {
                this._points.push(x , y);
            } else {
                this._points.splice(2 * index , 0 , x , y);
            }

        },


        /**
         *
         * @param {number} x
         * @param {number} y
         * @param {number} [index=0] Belirtilen index ten itibaren aramaya başlar
         * @param {boolean} Herhangi bir nokta silinirse true yoksa false
         */
        remove: function (x , y , index) {

            var i = index != null ? 2 * index : 0,
                points = this._points,
                length = points.length,
                status = false;

            for ( ; i < length ; i += 2) {

                if (points[i] == x && points[i + 1] == y) {
                    points.splice(i , 2);
                    i-=2;
                    status = true;
                }

            }

            return status;
        },

        /**
         * Belirtilen sıradaki noktayı siler
         * @param {number} index
         * @returns {Array.<T>}
         */
        delete: function (index) {
            return this._points.splice(2 * index , 2);
        },


        /**
         *
         * @param {number} x
         * @param {number} y
         * @param {number} [index=0] Belirtilen index ten itibaren aramaya başlar
         * @return {number|boolean} Bulunursa index sini yoksa false döndürür
         */
        search: function (x , y , index) {
            var i = index != null ? 2 * index : 0,
                points = this._points,
                length = points.length;

            for ( ; i < length ; i += 2) {
                if (points[i] == x && points[i + 1] == y) {
                    return i / 2;
                }
            }

            return false;
        },

        /**
         *
         * @param {number} index
         * @param {Vector=} vector Gönderilerse noktayı bu vektöre yazar
         */
        get: function (i , vector) {

            if (!vector) {
                vector = new V;
            }

            var p = this._points;

            i *= 2;

            vector.set(p[i] , p[i + 1]);

            return vector;
        },

        /**
         *
         * @param {number} x
         * @param {number} y
         * @param {number} index
         */
        set: function (x , y , index) {
            var i = 2 * index,
                points = this._points;

            points[i] = x;
            points[i + 1] = y;

            return this;
        },

        /**
         *
         * @returns {*}
         */
        getPoints: function () {
            return this._points;
        },

        /**
         * Matrisi noktaya uygular
         * @param {Matrix2D} matrix
         * @param {number=} index Yok ise bütün noktalara uygular
         * @param {Points} source Kendi nokta sayısı uzunluğu ile aynı uzunlukta nokta kaynağı
         */
        transform: function (matrix , index , source) {

            var mypoints = this._points,
                points = source || mypoints,
                length = points.length,
                i = 0,
                x , y;

            //this[0] * x + this[2] * y + this[4] , this[1] * x + this[3] * y + this[5]

            if (index != null) {

                i = index * 2;

                x = points[i];
                y = points[i + 1]

                mypoints[i] = matrix[0] * x + matrix[2] * y + matrix[4];
                mypoints[i + 1] = matrix[1] * x + matrix[3] * y + matrix[5];

            } else {

                for ( ; i < length ; i += 2) {
                    x = points[i];
                    y = points[i + 1]

                    mypoints[i] = matrix[0] * x + matrix[2] * y + matrix[4];
                    mypoints[i + 1] = matrix[1] * x + matrix[3] * y + matrix[5];
                }

            }

            return this;

        }

    });

})();