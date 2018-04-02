// name:display.Color
// require:core.Util
var Color;

(function () {

    /**
     *
     * @param {Number|Color|String|Hex} red
     * @param {Number} green
     * @param {Number} blue
     * @param {Number} alpha
     * @class Color
     */
    t.Color = Color = t.class('Color' , function (red , green , blue , alpha) {

        this.set(red , green , blue , alpha);

        this._palette = {};
    } , [] , /**@lends Color.prototype*/{

        set: function (red , green , blue , alpha) {

            if (t.isString(red)) {

                var data;

                if (!(data = Color.palet.get(red))) {
                    paletContext.fillStyle = red;
                    paletContext.fillRect(0 , 0 , 1 , 1);

                    data = paletContext.getImageData(0 , 0 , 1 , 1).data;

                    Color.palet.set(red , data);
                }


                this._red = data[0];
                this._green = data[1];
                this._blue = data[2];
                this._alpha = 1;

            } else if (t.isNumber(red) && green == null) {

                this._red = (red & 0xFF0000) >>> 16;
                this._green = (red & 0x00FF00) >>> 8;
                this._blue = (red & 0x0000FF) >>> 0;
                this._alpha = 1;

            } else if (red instanceof Color) {

                this._red = red._red;
                this._green = red._green;
                this._blue = red._blue;
                this._alpha = red._alpha;

            } else {

                this._red = red || 0;
                this._blue = blue || 0;
                this._green = green || 0;
                this._alpha = alpha == null ? 1 : alpha;

            }

            this._cache = false;

            return this;
        },

        /**
         * http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
         * @param {Number} value 0 - 100 negatif ise koyulaştırır, pozitifse rengi açar
         */
        shade: function (percent) {

            var val = 255;

            if (percent < 0) {
                percent *= -1;
                val = 0;
            }

            percent /= 100;

            this._red += (val - this._red) * percent;
            this._green += (val - this._green) * percent;
            this._blue += (val - this._blue) * percent;

            this._cache = false;
            return this;
        },

        /**
         * Rengi kaydeder
         * @param {String} name
         */
        save: function (name) {
            this._palette[name] = [this._red , this._green , this._blue , this._alpha];
            return this;
        },

        /**
         * Kaydedilmiş rengi uygular
         * @param {String} name
         */
        restore: function (name) {

            if (this._palette[name]) {
                Color.prototype.set.apply(this , this._palette[name]);
                this._cache = false;
            }

            return this;
        },

        /**
         *
         * @param {Number|Color|String|Hex} red
         * @param {Number} green
         * @param {Number} blue
         * @param {Number} alpha
         * @returns {boolean}
         */
        equals: function (red , green , blue , alpha) {

            var _temp = red instanceof Color ? red : _tempColor.set(red , green , blue , alpha);

            return !!(
            this._red == _temp._red
            && this._green == _temp._green
            && this._blue == _temp._blue
            && (alpha != null ? this._alpha == _temp._alpha : true)
            )

        },

        /**
         *
         */
        toString: function () {
            if (this._cache) {
                return this._cache;
            }

            return (this._cache = 'RGBA(' + this._red+ ',' + this._green + ',' + this._blue + ',' + this._alpha + ')');
        },

        toCanvas: function () {
            return this.toString();
        },

        /**
         *
         */
        clone: function () {
            var color = new Color(this._red , this._green , this._blue , this._alpha);
            color._palette = t.assign({} , this._palette);
            return color;
        }
    });



    t.assign(t.Color , {

        palet: {
            has: function (key) {
                return !!palet[key];
            },
            get: function (key) {
                return palet[key];
            },
            set: function (key , color) {
                palet[key] = color;
            }
        }

    });



    Object.defineProperties(t.Color.prototype , {

        red: {
            get: function () {
                return this._red
            },
            set: function (val) {
                this._red = val;
                this._cache = false;
            }
        },

        green: {
            get: function () {
                return this._green;
            },
            set: function (val) {
                this._green = val;
                this._cache = false;
            }
        },

        blue: {
            get: function () {
                return this._blue;
            },
            set: function (val) {
                this._blue = val;
                this._cache = false;
            }
        },

        alpha: {
            get: function () {
                return this._alpha;
            },
            set: function (val) {
                this._alpha = val;
                this._cache = false;
            }
        }

    });



    var _canvas = document.createElement('Canvas'),
        _tempColor = new Color,
        palet = {},
        paletContext;

    _canvas.width = 1;
    _canvas.height = 1;

    paletContext = _canvas.getContext('2d');

    /**
     * @name Color.prototype#red
     * @property {number} red Kırmızı Değeri
     */

    /**
     * @name Color.prototype#green
     * @property {number} green Yeşil Değeri
     */

    /**
     * @name Color.prototype#blue
     * @property {number} blue Mavi Değeri
     */


    /**
     * @name Color.prototype#alpha
     * @property {number} alpha Alpha değeri
     */
})();