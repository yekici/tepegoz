// name:core.EventEmitter
// require:core.Util


var EventEmitter;

(function () {

    t.EventEmitter = EventEmitter = t.class(function () {

        this._eventListeners = {};

    } , /**@lends Event.prototype*/{
        /**
         * yeni dinleyici ekler
         * @memberof Event
         * @param {string} name Olay adı
         * @param {function} callback Dinleyici
         * @param {object} context Bağlam
         */
        on: function (name , callback , context) {
            if (!this._eventListeners[name])
                this._eventListeners[name] = [];

            if (context)
                callback._evtContext = context;

            this._eventListeners[name].push(callback);
        },


        /**
         * Dinleyici kaldırır
         * @param {string=} name Olay adı
         * @param {function=} callback Dinleyici
         * @example
         * obj.off(); // Bütün olaylar silindi
         * obj.off('myEvent'); // myEvent ait dinleyiciler silindi
         * obj.off('myEvent' , callback); // her iki şartada uyan geribildirimler silindi
         */
        off: function (name , callback) {
            if (name && !callback) {

                delete this._eventListeners[name];

            } else if (name && callback) {

                var list = this._eventListeners[name],
                    i = 0,
                    length;

                if (list) {
                    length = list.length;
                    for ( ; i < length ; i++) {
                        if (list[i] === callback) {
                            list.splice(i , 1);
                            break;
                        }
                    }
                }

            } else {
                this._eventListeners = {};
            }

            return this;
        },

        /**
         * İlgili olayı yayar(tetikler)
         * @memberof Event
         * @param {string} name Olay adı
         * @param {...any=} args Dinleyicilere gönderilecek argümanlar
         */
        emit: function (name) {
            var args = Array.prototype.slice.call(arguments , 1),
                listeners = this._eventListeners,
                list = listeners[name],
                length , i = 0;

            if (list) {
                length = list.length;
                for ( ; i < length ; i++) {
                    list[i].apply(list[i]._evtContext || this , args);
                }
            }
        }

    });

})();