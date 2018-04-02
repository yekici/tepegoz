// name:input.Event.Pointer.Move


(function () {

    /**
     *
     * @type {t.Input.Event.Pointer.Move}
     */
    t.Input.Event.Pointer.Move = t.Input.Event.Pointer.extend('Move' , function (opt) {
        t.Input.Event.Pointer.call(this , opt);

        /**
         *
         */
        this.onMove = opt.onMove;

    } , [] , {
        _effectedEvents: ['mousemove'],

        _handler: function (event , global , effected) {
            t.Input.Event.Pointer.prototype._handler.call(this , event , global , effected);

            this._eventHandler(event , global , effected);
            this._capture && this.preventDefault();

            this.dispatch(this.onMove);
        },

        _eventHandler: function (event , global) {
            t.Input.Event.Pointer.prototype._eventHandler.call(this , event , global);

            this.type = 'move';
        }

    });

})();