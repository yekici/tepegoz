// name:input.Manager


(function () {

    Input.Manager = Input.extend('Manager' , function () {
        Input.call(this);

        // event Test Data
        this._etd = {id: 0 , result: 0};

        this.inputVisible = true;
    } , {


        input: function (query , opt) {
            !opt && (opt = {});

            query = new Input.Query(query);

            opt.controller = this.scene.inputController;
            opt.owner = this;
            opt._iq = query;
            
            switch (query.name) {
                case 'wheel':
                    return new Input.Event.Pointer.Wheel(opt);
                case 'button':
                    return new Input.Event.Pointer.Button(opt);
                case 'move':
                    return new Input.Event.Pointer.Move(opt);
                case 'key':
                    return new Input.Event.Key(opt);
                case 'enter':
                    return new Input.Event.Pointer.Enter(opt);
            }

        },

        inputOff: function (event) {
            return Input.Event.remove(event);
        },

        /**
         *
         * @param {Boolean} elByEl Grublarda ayrı ayrımı birlikte sürükleceğimi
         * @param {String} phrases Kaydırma işlemi için şartlar [double][right] çift tıklamada ve sağ clickte kaydırma
         * @returns {Input.Event.Button}
         */
        enableDrag: function (elByEl , phrases) {
            if (this._enableDrag) return true;

            var id = this.id;

            this._enableDrag = new V;

            !phrases && (phrases = '')

            this.input('move[local][id=' + (id + 'move') + ']' , {
                onMove: function (e) {
                    if (!this._enableDrag.drag) return;
                    var x = e.offsetX,
                        y = e.offsetY,
                        dOffset = this._enableDrag,
                        ts = ((dOffset.target._boundTS ? dOffset.target._boundTS : dOffset.target) || this).getTSMatrix().clone().invert(),
                        p = ts.point(x, y);

                    dOffset.target.offset.set(p.x - dOffset.x, p.y - dOffset.y);

                    this.emit('drag' , dOffset.target);
                }
            });

            return this.input('button' + phrases + '[id=' + (id + 'button') + ']' , {
                onDown: function (e) {
                    var dOffset = this._enableDrag;
                    dOffset.drag = true;
                    dOffset.target = elByEl ? e.target || this : this;

                    if (this instanceof Element || elByEl) {
                        dOffset.set(e.targetX , e.targetY);
                    } else {
                        var p = this.getTSMatrix().clone().invert().point(e.offsetX , e.offsetY);
                        dOffset.set(p.x , p.y);
                    }

                    this.emit('drag:start');
                },
                onUp: function () {
                    this._enableDrag.drag = false;
                    this.emit('drag:end');
                }
            });
        },

        disableDrag: function () {
            if (!this._enableDrag) return true;
            var id = this.id;
            this.inputOff(id + 'move');
            this.inputOff(id + 'button');
            this._enableDrag = null;
        }

    });

})();