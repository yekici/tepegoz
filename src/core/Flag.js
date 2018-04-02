// name:core.Flag


// ***********ihtiyaç kalmadı
var Flag;

(function () {

    /**
     * Bayrak
     * @param {int} [length=8] - Bayrak uzunluğu
     * @class Flag
     */
    Flag = t.Flag = t.class(function (length) {

        this._charged = Math.pow(2 ,length || 8) - 1;
        this._value = 0;
        this._flagID = 0;

    } , /**@lends Flag.prototype*/{

        /**
         * Kapasiteyi yeniden düzenler
         * @param {number} length
         */
        capacity: function (length) {
            this._charged = Math.pow(2 ,length || 8) - 1;
        },

        /**
         * Belirtilen sıradaki bayrağın değerini döndürür
         * @param {int} order
         */
        get: function (order) {
            return (this._value >> order) & 1;
        },

        /**
         * Belirtilen sıradaki bayrağın değerini değiştir
         * @param {int} order
         * @param {bool} value
         */
        set: function (order , value) {
            value ? this.fill(order) : this.clear(order);
        },

        /**
         * Belirtilen bayrağı 0 yapar
         * @param {int} order
         */
        clear: function (order) {
            this._value &= ~(1 << order);
        },

        /**
         * Belirtilen bayrağı 1 yapar
         * @param {int} order
         */
        fill: function (order) {
            this._value |= 1 << order;
        },

        /**
         * Bütün bayrakları 1 yapar
         */
        charge: function () {
            this._value = this._charged;
        },

        /**
         * Bütün bayrakları 0 yapar
         */
        reset: function () {
            this._value = 0;
        },

        /**
         * Full şarj mı?
         * @returns {boolean}
         */
        isCharged: function () {
            return this._value === this._charged;
        }

    });

    Flag._data = {};

    /**
     * Bayrak ismine göre order ı  döndürür
     * @param {String} name
     * @memberof Flag
     */
    Flag.getID = function (name) {
        if (!Flag._data[name]) {
            Flag._data[name] = 0;
        }
        return Flag._data[name]++;
    };

})();