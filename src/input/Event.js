// name:input.Event
// require:input.Input


(function () {


    var _eventList = {};

    /**
     *
     * Tek Başına Çalışmaz
     * phrases - ifadeler
     * [capture] -> preventDefault
     * [alt] -> alt tuşuna basılımı
     * [shift] -> shift tuşuna basılımı
     * [ctrl] -> ctrl tuşuna basılımı
     *
     * opt.enable -> [true , false , func() , func()] dizi içeriği kontrol edilir
     * ve bir adet false sonuç varsa olaylar tetiklenmez
     * @class {t.Input.Event}
     */
    t.Input.Event = t.class('Event' , function (opt) {



        this._controller = opt.controller;
        this._query = opt._iq || new Input.Query(opt.query);

        var phrases = this._query.phrases;

        this.id = phrases.id ? 'u' + phrases.id.value :  t.gid();

        if (_eventList[this.id]) {
            throw new Error('event id must be unique');
        }

        _eventList[this.id] = this;

        /**
         * Olayın sahibi
         * @type {*}
         */
        this._owner = opt.owner;

        /**
         * Olayın etkinleştirme şartları
         * @type {*}
         */
        this.enable = opt.enable == null ? true : opt.enable;

        /**
         * Zincirleme için etkinmi
         */
        this._enable = false;


        /**
         * preventDefault
         * @type {boolean}
         * @private
         */
        this._capture = !!phrases.capture;

        /**
         * İstenen Özel Tuşlar
         * @type {{alt: boolean, shift: boolean, ctrl: boolean}}
         * @private
         */
        this._special = {
            alt: !!phrases.alt,
            shift: !!phrases.shift,
            ctrl: !!phrases.ctrl
        };


        this._controller.bind(this);
    } , [] , {/**@lends t.Input.Event.prototype */

        /**
         * Etkilenilen olaylar,
         * Başında * varsa global
         */
        _effectedEvents: [],

        /**
         * Etkileninlen olaylar çalışınca çalışacak
         */
        _handler: function () {},

        _eventHandler: function (event , global) {
            !event && (event = {});

            this.ehid = t.gid();

            this.originalEvent = event;

            this.altKey = event.altKey || false;
            this.ctrlKey = event.ctrlKey || false;
            this.shiftKey = event.shiftKey || false;

            this.global = global;
        },

        /**
         *
         */
        release: function () {},


        preventDefault: function () {
            this.originalEvent && this.originalEvent.preventDefault();
        },

        /**
         *
         * @returns {boolean}
         */
        checkEnable: function () {
            if (this.enable == null || this.enable === true)
                return true;

            var enable = t.isArray(this.enable) ? this.enable : [this.enable],
                i , item , state = true;

            for (i = 0 ;  i < enable.length ; i++) {
                item = enable[i];

                if ((t.isBool(item) && item === false) || (t.isFunction(item) && item() === false) || (t.isObject(item) && !item._enable)) {
                    state = false;
                    break;
                }

            }

            !state && this.release();

            return state;
        },

        /**
         *
         * @returns {boolean}
         */
        checkSpecielKeys: function () {
            var special = this._special;

            if (this.altKey == special.alt && this.shiftKey == special.shift && this.ctrlKey == special.ctrl) {
                return true;
            }

            return false;
        },

        /**
         *
         * @param callback
         */
        dispatch: function (callback , release) {
            callback && callback.call(this._owner , this , release);
        },


        remove: function () {
            return t.Input.Event.remove(this);
        }


    });


    /**
     * Olayı kaldırır
     * @param {String|t.Input.Event} id veya kendisi
     * @name t.Input.Event.remove
     * @memberof {t.Input.Event}
     */
    t.Input.Event.remove = function (event) {
        if (t.isString(event) || t.isNumber(event)) {
            if (_eventList['u' + event]) {
                event = _eventList['u' + event];
            } else {
                return false;
            }
        }

        if (_eventList[event.id]) {
            event._controller.unbind(event);
            delete _eventList[event.id];
            return true;
        }


        return false;
    };

    /**
     *
     * @param eventId
     */
    t.Input.Event.get = function (eventId) {
        return _eventList[eventId];
    };


})();