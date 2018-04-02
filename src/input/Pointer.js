// name:input.Event.Pointer
// require:input.Input
// require:input.Event

var Pointer;

(function () {


    /**
     * Tek Başına Çalışmaz
     * phrases - ifadeler
     * [needle] -> Üstünde başka çizilmiş nesne dahi olsa olay tetiklenir
     * @class {t.Input.Event.Pointer}
     */
    t.Input.Event.Pointer = Pointer = t.Input.Event.extend('Pointer' , function (opt) {
        t.Input.Event.call(this , opt);

        var phrases = this._query.phrases;


        this._needle = !!phrases.needle;

        this._local = !!phrases.local;

    } , [] , {/**@lends t.Input.Event.Pointer.prototype */

        _handler: function (event , global , effected) {
            t.Input.Event.prototype._handler.call(this , event , global , effected);

            this.target = t.isArray(effected) ? effected[0] : effected;
            this.targets = effected;
            this.targetX = null;
            this.targetY = null;

        },
        
        _eventHandler: function (event , global) {
            !event && (event = {});

            t.Input.Event.prototype._eventHandler(event , global);
            
            this.offsetX = event.offsetX || event.layerX;
            this.offsetY = event.offsetY || event.layerY;

            this.pageX = event.clientX && event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft || 0);
            this.pageY = event.clientY && event.clientY + (document.documentElement.scrollTop || document.body.scrollTop || 0);

            if (this.target && this.target.getTSMatrix) {
                var p = this.target.getTSMatrix().clone().invert().point(this.offsetX , this.offsetY);

                this.targetX = p.x;
                this.targetY = p.y;

            }
        },

        _elementContainsPoint: function (owner , x , y , eid) {

            x = x != null ? x : this.offsetX;
            y = y != null ? y : this.offsetY;

            var etd = owner._etd;

            if (eid && eid == etd.id) return etd.result;

            etd.id = eid;
            etd.result = owner.inputBox.containsPoint(x , y) && owner;

            return etd.result;
        },

        _groupContainsPoint: function (group , result , x , y , eid) {
            var elements = group.getElements(),
                length = elements.length,
                i = 0,
                element;

            !result && (result = [])

            for ( ; i < length ; i++) {
                element = elements[i];

                if (element instanceof Element) {
                    this._elementContainsPoint(element , x , y , eid) && result.push(element)
                } else if (element instanceof Group) {
                    this._groupContainsPoint(element , result , x , y , eid);
                }

            }


            return result.length ? result : false;
        },

        /**
         * Event owner ı kapsamıyorsa false kapsıyorsa id si
         * @return {Boolean|Number}
         */
        ownerContainsPoint: function (x , y , eid) {
            var owner = this._owner;

            if (owner instanceof Element) {
                return this._elementContainsPoint(owner , x , y , eid);
            } else if (owner instanceof Group) {
                return this._groupContainsPoint(owner , null , x , y , eid);
            }

            return false;
        },

    });

    Pointer.ButtonCode = {
        LEFT: 1,
        MIDDLE: 2,
        RIGHT: 3
    };

})();