// name:t.Core.Vector

var V,Vector;

(function () {


    /**
     * 2d Vector
     * @class Vector
     * @param {number} x=0 X Değeri
     * @param {number} y=0 Y Değeri
     */
    t.Vector = t.V = V = Vector = t.class(function (x , y) {

        if (x instanceof V) {
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x || 0;
            this.y = y || 0;
        }


    } , /**@lends Vector.prototype*/{

        /**
         * Kendi kopyasını döndürür
         * @return {Point}
         */
        clone: function () {
            return new V(this.x , this.y);
        },

        /**
         * Belirtilen nokta ile arasındaki mesafeyi döndürür
         * @param {number} x=0 X Değeri
         * @param {number} y=0 Y Değeri
         * @return {number} Mesafe
         */
        distance: function (x , y) {
            x = this.x - (x || 0);
            y = this.y - (y || 0);
            return Math.sqrt(x * x + y * y);
        },

        /**
         * Noktanın x , y değerlerini değiştiri
         * @param {number} x=0 X Değeri
         * @param {number} y=0 Y Değeri (yok ise x in değerini alır)
         */
        set: function (x , y) {
            this.x = x;
            this.y = y == null ? x : y;
            return this;
        },

        /**
         * Noktanın x , y değerlerine belirtilen noktanın x , y değerleri eklenir(toplanır)
         * @param {number} x=0 X Değeri
         * @param {number} y=0 Y Değeri
         */
        sum: function (x , y) {
            this.x += x;
            this.y += y;
            return this;
        },

        /**
         * Noktanın x , y değerlerinden belirtilen noktanın x , y değerleri çıkarılır
         * @param {number} x=0 X Değeri
         * @param {number} y=0 Y Değeri
         */
        sub: function (x , y) {
            this.x -= x;
            this.y -= y;
            return this;
        },

        /**
         * Kendi değerlerini belirtlen değerlere böler
         * @param {number} x=0 X Değeri
         * @param {number} y=0 Y Değeri
         */
        div: function (x , y) {
            this.x /= x;
            this.y /= y;
            return this;
        },

        /**
         * Kendi değerlerini belirtlen değerlerle çarpar
         * @param {number} x=0 X Değeri
         * @param {number} y=0 Y Değeri
         */
        mul: function (x , y) {
            this.x *= x;
            this.y *= y;
            return this;
        },

        /**
         * Skaler çarpım yapar
         * @param {number} x=0 X Değeri
         * @param {number} y=0 Y Değeri
         * @return {Vector} sonuç
         */
        dot: function (x , y) {
            return this.x * x + this.y * y;
        },

        /**
         * Noktayı saat yönünün tersine 90 derece çevirir
         * @return {Point}
         */
        perp: function () {
            var x = this.x;
            this.x = this.y;
            this.y = -x;
            return this;
        },

        /**
         * X ve y değerlerini karşılıklı değiştirir
         */
        reverse: function () {
            var temp = this.x;
            this.x = this.y;
            this.y = temp;
            return this;
        },

        /**
         * Görüntü matrsini noktaya uygular
         * @param {array} matris Görüntü matrisi
         */
        atr: function (m) {
            var x = this.x,
                y = this.y;

            this.x = m[0] * x + m[2] * y + m[4];
            this.y = m[1] * x + m[3] * y + m[5];
            return this;
        },


        /**
         *
         * @param {Vector|number} vector
         * @paran {number=} y
         * @returns {boolean}
         */
        equals: function (vector , y) {
            if (vector instanceof Vector) {
                return this.x === vector.x && this.y === vector.y;
            }


            return this.x === vector && this.y === y;

        }

    });



})();