// name:input.Event.Pointer.Button
// require:input.Input
// require:input.Event
// require:input.Pointer

(function () {

    /**
     * phrases - ifadeler
     * [left] -> olaylar sadece sol tuşta etkileşim varsa çalışır
     * [right] -> olaylar sadece sağ tuşta etkileşim varsa çalışır
     * [middle] -> olaylar sadece orta tuşta etkileşim varsa çalışır
     * [strict] -> mouseup içinde özel tuşlar kontrol edilecekmi
     * [double] -> çift tık
     * @type {t.Input.Event.Pointer.Button}
     */
    t.Input.Event.Pointer.Button = t.Input.Event.Pointer.extend('Button' , function (opt) {
        t.Input.Event.Pointer.call(this , opt);


        /**
         * Butona basılınca
         */
        this.onDown = opt.onDown;

        /**
         * Buton salınınca
         */
        this.onUp = opt.onUp;

        var phrases = this._query.phrases,
            bc = t.Input.Event.Pointer.ButtonCode;

        /**
         *
         * @type {number}
         * @private
         */
        this._button = phrases.right ? bc.RIGHT : phrases.middle ? bc.MIDDLE : phrases.left ?  bc.LEFT : -1;

        /**
         * mouseup içinde özel tuşlar kontrol edilecekmi
         * @type {boolean}
         * @private
         */
        this._strict = !!phrases.strict;

        /**
         * çift tıklama
         * @type {boolean}
         * @private
         */
        this._doubleClick = !!phrases.double;


        this._dtime = t.now();

    } , [] , {

        _effectedEvents: ['mousedown' , '*mouseup' , 'mouseup' , 'contextmenu'],

        _handler: function (event , global , effected) {
            t.Input.Event.Pointer.prototype._handler.call(this , event , global , effected);

            this._eventHandler(event , global);

            var type = event.type,
                typeIsDown = type == 'mousedown',
                typeIsUp = type == 'mouseup',
                typeIsMenu = type = 'contextmenu',
                buttonCode = t.Input.Event.Pointer.ButtonCode,
                special = true,
                strict = this._strict,
                enable = this._enable;



            if (!global && this._capture && !typeIsMenu) {
                this.preventDefault();
            }


            if (typeIsMenu && this._capture && (buttonCode.RIGHT == this._button || this._button == -1)) {
                this.preventDefault();
            }

            if (typeIsDown || typeIsUp) {
                if (this.checkButtonCode()) {
                    if (typeIsDown || strict)
                        special = this.checkSpecielKeys();

                    if (typeIsDown && !enable) {
                        if (this.checkDoubleClick()) {
                            this._enable = true;
                            this.dispatch(this.onDown);
                        }
                    } else if (typeIsUp && enable) {
                        this._enable = false;
                        this.dispatch(this.onUp , global);
                    }

                }
            }

        },

        _eventHandler: function (event , global) {
            t.Input.Event.Pointer.prototype._eventHandler.call(this , event , global);

            this.type = event.type ? event.type == 'mousedown' ? 'down' : 'up' : null;
            this.which = event.which;
        },

        /**
         *
         * @returns {boolean}
         */
        checkButtonCode: function () {
            if (this._button == -1 || this._button == this.which) {
                return true;
            }

            return false;
        },

        /**
         *
         * @returns {boolean}
         */
        checkDoubleClick: function () {
            if (!this._doubleClick) return true;
            if (t.now() - this._dtime < 500) {
                this._dtime = t.now();
                return true;
            }
            this._dtime = t.now();
            return false;
        },

        /**
         *
         */
        release: function () {
            if (this._enable) {
                this._enable = false;
                this.dispatch(this.onUp , true);
            }
        },

        /**
         * Butuna Basılımı
         * @return {Boolean}
         */
        isPressed: function () {
            return this._enable;
        }

    });

})();