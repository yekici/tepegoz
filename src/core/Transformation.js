// name:core.Transformation
// require:core.Flag


var Transformation,TS;

(function () {


    /**
     * Genelleştirilmiş transform işlemleri
     * @class Transformation
     */
    t.Transformation = t.TS = Transformation = TS = t.class(function (opt) {


        this._matrix2D = new Matrix2D;

        opt = opt || {};

        this._bindingTSList = [];
        this._boundTS = null;


        /**
         * Ölçeklendirme
         * @name Transformation#scale
         * @type {Vector}
         * @default 1 , 1
         */
        this.scale = opt.scale ? t.isArray(opt.scale) ? new OV(opt.scale[0] || 0, opt.scale[1] || 0 , this._changeTS , this)
            : opt.scale.clone(this._changeTS , this)
            : new OV(1 , 1 , this._changeTS , this);

        /**
         * Ölçeklendirme Konumu
         * @name Transformation#origin
         * @type {Vector}
         * @default 0 , 0
         */
        this.origin = opt.origin ? t.isArray(opt.origin) ? new OV(opt.origin[0] || 0, opt.origin[1] || 0 , this._changeTS , this)
            : opt.origin.clone(this._changeTS , this)
            : new OV(0 , 0 , this._changeTS , this);

        /**
         * Konumlandırma
         * @name Transformation#offset
         * @type {Vector}
         * @default 0 , 0
         */
        this.offset = opt.offset ?  t.isArray(opt.offset) ? new OV(opt.offset[0] || 0, opt.offset[1] || 0 , this._changeTS , this)
            : opt.offset.clone(this._changeTS , this)
            : new OV(0 , 0 , this._changeTS , this);


        /**
         * Eğme
         * @name Transformation#skew
         * @type {Vector}
         * @default 0 , 0
         */
        this.skew = opt.skew ? t.isArray(opt.skew) ? new OV(opt.skew[0] || 0, opt.skew[1] || 0 , this._changeTS , this)
            : opt.skew.clone(this._changeTS , this)
            : new OV(0 , 0 , this._changeTS , this);


        /**
         * Döndürme (Derece)
         * @name Transformation#rotation
         * @type {number} Degree
         * @default 0
         */
        this.rotation = opt.rotation || 0;

        /**
         * Döndürme Konumu
         * @name Transformation#anchor
         * @type {Vector}
         * @default 0 , 0
         */
        this.anchor = opt.anchor ? t.isArray(opt.anchor) ? new OV(opt.anchor[0] || 0, opt.anchor[1] || 0 , this._changeTS , this)
            : opt.anchor.clone(this._changeTS , this)
            : new OV(0 , 0 , this._changeTS , this);



        this.updateTS();


    } , /**@lends Transformation.prototype*/{


        _changeTS: function () {
            var i , _temp;

            this._changeInTS = true;

            i = this._bindingTSList.length

            if (i) {

                _temp = this._bindingTSList;

                while (i--) {
                    _temp[i]._changeTS();
                }

            }

        },

        /**
         * Mevcut Konumlandırma , Ölçeklendirme , Eğme değerlerine göre transformu hesaplar
         * @return {Transform}
         */
        updateTS: function () {

            var matrix = this._matrix2D,
                scale = this.scale,
                skew = this.skew,
                offset = this.offset,
                rotation = this._rotation,
                anchor = this.anchor,
                origin = this.origin;


            matrix.id = t.gid();


            if (this._boundTS) {
                matrix.set(this._boundTS.getTSMatrix());
            } else {
                matrix.reset();
            }


            /**
             * Konumlandırma
             */
            if (offset._x || offset._y) {
                matrix.translate(offset._x , offset._y);
            }

            /**
             * Döndürme
             */
            if (rotation) {

                if (anchor._x || anchor._y) {
                    matrix.translate(anchor._x , anchor._y);
                    matrix.rotate(t.degreeToRadian(rotation));
                    matrix.translate(-anchor._x , -anchor._y);
                } else {
                    matrix.rotate(t.degreeToRadian(rotation));
                }

            }

            /**
             * Eğme
             */
            if (skew._x || skew._y) {
                matrix.skew(skew._x , skew._y);
            }

            /**
             * Ölçeklendirme
             */
            if (scale.x || scale.y) {

                if (origin._x || origin._y) {
                    matrix.translate(origin._x , origin._y);
                    matrix.scale(scale._x , scale._y);
                    matrix.translate(-origin._x , -origin._y);
                } else {
                    matrix.scale(scale._x , scale._y);
                }


            }

            this._changeTS();

            return this._matrix2D;
        },

        /**
         * Transformation güncel olup olmadığını döndürür
         * @returns {boolean}
         */
        TSIsUpdated: function () {
            return !this._changeInTS;
        },

        /**
         * Hesaplanmış matrisi döndürür
         */
        getTSMatrix: function () {
            if (!this.TSIsUpdated()) {
                this.updateTS();
            }
            return this._matrix2D;
        },


        /**
         * Belirtilen ts ye ile kendi ts ini bağlar
         * Aslında belirtilen matris ile kendi mantrisini çarpar ve kendi değerini elde eder
         * @param {Transformation|null} ts null gelirse bağlantı kopar(unbind)
         */
        bindTS: function (ts) {

            if (ts) {
                this._boundTS = ts;
                if (ts._bindingTSList.indexOf(this) < 0) {
                    ts._bindingTSList.push(this);
                    this._changeTS();
                }
            } else {
                if (!this._boundTS) return;
                //unbind
                var index;
                ts = this._boundTS;
                this._boundTS = null;
                if ((index = ts._bindingTSList.indexOf(this)) >= 0) {
                    ts._bindingTSList.splice(index , 1);
                    this._changeTS();
                }
            }

        },


        /**
         * Kendi kopyasını üretir
         * @return {Transformation}
         */
        clone: function () {
            return new Transformation(this);
        }
    });

    Object.defineProperties(Transformation.prototype , {
        rotation: {
            get: function () {
                return this._rotation;
            },

            set: function (val) {
                this._rotation = val;
                this._changeTS();
            }
        }
    })




})();