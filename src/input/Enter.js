// name:input.Event.Pointer.Enter


(function () {

    /**
     *
     * @type {t.Input.Event.Pointer.Enter}
     */
    t.Input.Event.Pointer.Enter = t.Input.Event.Pointer.extend('Enter' , function (opt) {
        t.Input.Event.Pointer.call(this , opt);

        /**
         *
         */
        this.onEnter = opt.onEnter;

        /**
         *
         */
        this.onLeave = opt.onLeave;


        this._entered = [];

    } , [] , {
        _effectedEvents: ['-mousemove'],


        _handler: function (event , global , effected , result) {

            t.Input.Event.Pointer.prototype._handler.call(this , event , global , effected);

            this._eventHandler(event , global , effected);
            this._capture && this.preventDefault();

            var changed = false,
                entered = this._entered,
                targets = !this._needle ? this.target ? [this.target] : [] : this.targets ? this.targets.slice() : [],
                i = 0,
                item , index;


            if (!this._needle && !result && effected) {
                targets = [];
            }


            for ( ; i < entered.length ; i++) {
                item = entered[i];
                if ((index = targets.indexOf(item)) < 0) {
                    entered.splice(i-- , 1);
                    this.target = item;
                    this.dispatch(this.onLeave);
                } else {
                    targets.splice(index , 1);
                }
            }


            if (targets && targets.length) {
                for (i = 0 ; i < targets.length; i++) {
                    this.target = targets[i];
                    entered.push(this.target);
                    this.dispatch(this.onEnter);
                }
            }

            this._enable = this.isEntered();
        },

        release: function () {
            if (this.isEntered()) {
                var entered = this._entered;
                for (var i = 0 ; i < entered.length;i++) {
                    this.target = entered[i];
                    entered.splice(i-- , 1);
                    this.dispatch(this.onLeave , true);
                }
            } 
        },

        _eventHandler: function (event , global) {
            t.Input.Event.Pointer.prototype._eventHandler.call(this , event , global);

            this.type = 'move';
        },

        /**
         *
         * @param {Element=} element
         * @returns {boolean}
         */
        isEntered: function (element) {
            if (!element) {
                return !!this._entered.length;
            }
            return this._entered.indexOf(element) > -1;
        }

    });

})();