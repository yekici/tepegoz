// name:display.Bounds
// require:core.Util

var Bounds;

(function (){


    /**
     *
     * @class Bounds
     * @param {number} x En küçük x değeri
     * @param {number} y En küçük y değeri
     * @param {number} mx En büyük x değeri
     * @param {number} my En büyük y değeri
     */
    t.Bounds = Bounds = t.class(function (x , y , mx , my) {


        /**
         * X Değeri
         * @type {number}
         */
        this.x = x || Infinity;

        /**
         * Y Değeri
         * @type {number}
         */
        this.y = y || Infinity;

        /**
         * Max X Değeri
         * @type {number}
         */
        this.mx = mx || -Infinity;

        /**
         * Max Y Değeri
         * @type {number}
         */
        this.my = my || -Infinity;

        /**
         * Width Değeri
         * @type {number}
         */
        this.width = 0;

        /**
         * Height Değeri
         * @type {number}
         */
        this.height = 0;

        if (isFinite(this.x) && isFinite(this.y)) {
            this.calcSize();
        }


    } , {

        /**
         * width ve height değerlerini hesaplar
         * @returns {Bounds}
         */
        calcSize: function () {
            this.width = this.mx - this.x;
            this.height = this.my - this.y;
            return this;
        },

        /**
         *
         * @returns {Bounds}
         */
        reset: function () {
            this.x = Infinity;
            this.y = Infinity;
            this.mx = -Infinity;
            this.my = -Infinity;
            this.height = 0;
            this.width = 0;

            return this;
        },

        /**
         * x, y değerlerine göre sınırları belirler
         * @param {number} x
         * @param {number} y
         * @returns {Bounds}
         */
        handle: function (x , y) {


            if (x < this.x) this.x = x;
            if (y < this.y) this.y = y
            if (x > this.mx) this.mx = x;
            if (y > this.my) this.my = y;

            this.calcSize();

            return this;
        },

        /**
         * dizideki sıralı noktalara göre sınırları belirler
         * @param {array} list Sıralı nokta dizisi
         * @param {boolean} reset True ise önce sınırları sıfırlar
         * @returns {Bounds}
         */
        handleArray: function (list , reset) {
            if (reset) {
                this.reset();
            }

            for (var i = 0 ; i < list.length ; i+=2) {
                this.handle(list[i] , list[i + 1]);
            }

            return this;
        },

        /**
         * Noktanın sınırlar içerisinde kalıp kalmadığını kontrol eder
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


        /**
         * Sınırın orta noktasını döndürür
         * @return {Vector}
         */
        center: function () {
            return new V(this.x + this.width * 0.5  , this.y + this.height * 0.5);
        },

        /**
         * Belirtilen x , y değerine göre o sınırın noktasını döndürür
         * point(0, 0) sol üst köşe
         * point(1, 0) sağ üst köşe gibi
         * point(0.5, 0.5) merkez
         * @param {number} x
         * @param {number} y
         */
        point: function (x , y) {
            return new V(this.x + this.width * x  , this.y + this.height * y);
        }

    });

})();