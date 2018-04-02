// name:input.Key

(function () {

    /**
     * phrases - ifadeler
     * [key=A] -> tekli tuş
     * [key=A|B] -> çoklu tuş
     * [key=UP|W]
     * [key=DOWN|S]
     * [key=LEFT|A]
     * [key=RIGHT|D]
     * [strict] -> tuş salınıncada özel tuşları kontrol eder
     * @class {t.Input.Event.Key}
     */
    t.Input.Event.Key = t.Input.Event.extend('Key' , function (opt) {
        t.Input.Event.call(this , opt);

        /**
         * Tuşa basılınca
         * @type {Function}
         */
        this.onDown = opt.onDown;

        /**
         * Tuş salınınca
         * @type {Function}
         */
        this.onUp = opt.onUp;

        /**
         * Kabul edilebilcek tuşlar
         * @type {Array}
         * @private
         */
        this._keys = [];

        var phrases = this._query.phrases;


        this._strict = !!phrases.strict;

        if (phrases.key) {
            var phrase = phrases.key,
                keys = phrase.value ? phrase.value.split('|') : false,
                keyCode = Input.Event.Key.KeyCode,
                key;

            if (keys) {
                for (var i = 0 ; i < keys.length ; i++) {
                    key = keys[i];
                    if (!keyCode[key]) {
                        throw new Error('keyCode for ' + key + ' not found');
                    }
                    this._keys.push(keyCode[key]);
                }
            }

        }

    } , [] , {

        _effectedEvents: ['*keydown' , '*keyup'],


        _handler: function (event , global) {
            t.Input.Event.prototype._handler.call(this , event , global);

            this._eventHandler(event , global);

            var type = event.type,
                typeIsDown = type == 'keydown',
                enable = this._enable,
                strict = this._strict,
                special = true,
                capture = this._capture;


            if (this.checkKeyCode()) {
                if (typeIsDown || strict)
                    special = this.checkSpecielKeys();

                if (special) {
                    this.preventDefault();
                    if (!enable && typeIsDown) {
                        this.dispatch(this.onDown);
                        this._enable = true;
                    } else if (enable && !typeIsDown) {
                        this.dispatch(this.onUp);
                        this._enable = false;
                    }

                }

            }

            this._eventHandler(event , global);
        },

        _eventHandler: function (event , global) {
            t.Input.Event.prototype._eventHandler.call(this , event , global);

            this.type = event.type ? event.type == 'keydown' ? 'down' : 'up' : null;
            this.keyCode = event.keyCode;
        },

        checkKeyCode: function () {
            var keys = this._keys,
                code = this.keyCode;
            return keys.indexOf(code) > -1;
        },

        /**
         *
         * @returns {boolean}
         */
        isPressed: function () {
            return this._enable;
        }


    });

    //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode

    var KeyCode = t.Input.Event.Key.KeyCode = {};

    var code = 0,
        words = ['ZERO' , 'ONE' , 'TWO' , 'THREE' , 'FOUR' , 'FIVE' , 'SIX' , 'SEVEN' , 'EIGHT' , 'NINE'];

    //harfler
    for (code = 65 ; code < 91 ; code++) {
        KeyCode[String.fromCharCode(code)] = code;
    }

    //rakamlar
    for (code = 48 ; code < 58 ; code++) {
        KeyCode[words[code - 48]] = code;
    }

    //numpad rakamları
    for (code = 96 ; code < 105 ; code++) {
        KeyCode['NP_' + words[code - 96]] = code;
    }

    //f tuşları
    for (code = 112 ; code < 124 ; code++) {
        KeyCode['F' + (code - 111)] = code;
    }

    // diğer tuşlar
    Util.assign(KeyCode , {
        ENTER: 13,
        SPACE: 32,
        TAB: 9,
        DELETE: 46,
        END: 35,
        ESCAPE: 27,
        NUMLOCK: 144,

        //yön tuşları
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,

        //special
        SHIFT: 16,
        CONTROL: 17,
        ALT: 18
    });

})();