// name:input.Event.Pointer.Button
// require:input.Input
// require:input.Event
// require:input.Pointer


(function () {

    var _wheelType = t.getWheelType();

    /**
     *
     * @type {t.Input.Event.Pointer.Wheel}
     */
    t.Input.Event.Pointer.Wheel = t.Input.Event.Pointer.extend('Wheel' , function (opt) {
        t.Input.Event.Pointer.call(this , opt);

        /**
         *
         */
        this.onWheel = opt.onWheel;

    } , [] , {
        _effectedEvents: [_wheelType],

        _handler: function (event , global , effected) {
            t.Input.Event.Pointer.prototype._handler.call(this , event , global , effected);

            this._eventHandler(event , global , effected);
            if (!this.checkSpecielKeys()) return;
            this._capture && this.preventDefault();
            this.dispatch(this.onWheel);
        },

        _eventHandler: function (event , global) {
            t.Input.Event.Pointer.prototype._eventHandler.call(this , event , global);

            // https://developer.mozilla.org/en-US/docs/Web/Events/wheel

            this.type = 'wheel';
            this.deltaY = event.deltaY;
            this.deltaX = 0;
            this.deltaZ = 0;


            if (_wheelType != 'wheel') {
                if (_wheelType == "mousewheel") {
                    this.deltaY = - 1/40 * event.wheelDelta;
                    event.wheelDeltaX && ( this.deltaX = - 1/40 * event.wheelDeltaX );
                } else {
                    this.deltaY = event.detail;
                }
            }
        }

    });

})();