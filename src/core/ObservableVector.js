// name:core.ObservableVector
// require:core.Vector


var ObservableVector,OV;

(function () {


    /**
     * 2d Takip edilebilir Vector
     * @class Vector
     * @param {number} x=0 X Değeri
     * @param {number} y=0 Y Değeri
     * @param {Flag|function} callback
     */
    t.ObservableVector = t.OV = ObservableVector = OV = Vector.extend(function (x , y , callback , context) {

        this._x = 0;
        this._y = 0;

        this._callback = callback;
        this._context = context || this;


        Vector.call(this , x , y);
    } , /**ObservableVector.prototype*/{
        /**
         * Kendi kopyasını döndürür
         * @returns {ObservableVector}
         */
        clone: function (callback , context) {
            return new OV(this._x , this._y , callback || this._callback , context || this._context);
        },


        /**
         *
         * @param {Vector} vector
         * @returns {boolean}
         */
        equals: function (vector , y) {
            if (vector instanceof Vector) {
                return this._x === vector.x && this._y === vector.y;
            }

            return this.x === vector && this.y === y;
        },


        _emit: function () {
            this._callback.call(this._context);
        }

    });

    Object.defineProperties(ObservableVector.prototype , {
        x: {
            get: function () {
                return this._x;
            },
            set: function (val) {
                this._x = val;
                this._emit();
            }
        },
        y: {
            get: function () {
                return this._y;
            },
            set: function (val) {
                this._y = val;
                this._emit();
            }
        }
    })

})();