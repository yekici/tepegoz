// name:input.Controller
// require:input.Input
// require:input.Pointer

(function () {

    /**
     *
     * @class {Input.Controller}
     */
    t.Input.Controller = t.Input.extend('Controller' , function (scene) {

        this.scene = scene;

        this._htmlElement = scene.canvas.getCanvas();


        this._events = {};

        this._blocked = false;

        this._lastEvent = false;

        var self = this;

        this.__eventDistributor = function (e) {
            self._eventDistributor(e);
        };

    } , [] , {/**@lends t.Input.Controller.prototype */

        /**
         * Olayı  kontrolcüye bağlar
         * @param {t.Input.Event} iEvent
         */
        bind: function (iEvent) {
            if (!iEvent._binding) {

                var efEvents = iEvent._effectedEvents,
                    events = this._events,
                    length = efEvents.length,
                    i = 0,
                    eName , name , global;


                iEvent._binding = this;

                for ( ; i < length ; i++) {
                    eName = efEvents[i];
                    name = eName[0] == '*' ? eName.slice(1) : eName;
                    global = eName != name;

                    if (eName[0] == '-') {

                        eName = name = eName.slice(1);
                        !iEvent._localEvent && (iEvent._localEvent = []);
                        iEvent._localEvent.push(name);
                    }

                    if (!events[eName]) {
                        events[eName] = [];
                        this._attach(name , global);
                    }

                    events[eName].push(iEvent);
                }


            }
        },

        /**
         *
         * @param {t.Input.Event} iEvent
         */
        unbind: function (iEvent) {
            if (iEvent._binding == this) {
                var events = this._events,
                    eName , index , global;

                for (eName in events) {


                    if ((index = events[eName].indexOf(iEvent)) > -1) {
                        events[eName].splice(index , 1);

                        if (!events[eName].length) {
                            global = eName[0] == '*';
                            this._detach(global ? eName.slice(1) : eName , global);
                            delete events[eName];
                        }

                    }

                }

                iEvent._binding = null;
            }
        },



        /**
         *
         * @param e
         * @private
         */
        _eventDistributor: function (event) {

            if (!this._blocked) {

                var htmlElement = this._htmlElement,
                    eType = event.type,
                    effected = false,
                    eventId = t.gid(),
                    global , eName, events , i , j , iEvent,
                    result , temp , x , y , _max , item,
                    order , parent , elements , success,
                    localEvent;



                global = event == this._lastEvent || event.target != this._htmlElement;
                eName = global ? '*' + eType : eType;
                events = this._events[eName];


                if (events) {

                    events.sort(function (a , b) {
                        return b._owner._drawingOrder || 0 - a._owner._drawingOrder || 0;
                    });


                    x = event.offsetX || event.layerX;
                    y = event.offsetY || event.layerY;


                    for ( i = 0 ; i < events.length ; i++) {
                        iEvent = events[i];
                        temp = null;
                        localEvent = null;


                        if (global || iEvent instanceof t.Input.Event.Key) {
                            iEvent.checkEnable() && iEvent._handler(event , global);
                        } else if (iEvent instanceof t.Input.Event.Pointer) {

                            localEvent = (iEvent._localEvent && iEvent._localEvent.indexOf(eType) > -1) || iEvent._local;


                            //if (!effected || (effected && iEvent._needle) || localEvent)
                                temp = iEvent.ownerContainsPoint(x , y , eventId);

                            if (temp) {

                                if (!t.isArray(temp))
                                    temp = [temp];

                                if (temp.length > 1) {
                                    temp.sort(function (a , b) {
                                        return b._drawingOrder || 0 - a._drawingOrder || 0;
                                    });
                                }


                                if (iEvent._needle) {
                                    !localEvent && iEvent.checkEnable() && iEvent._handler(event , global , temp);
                                //} else if (!effected) {
                                } else {

                                    // hep sağa bak
                                    item = temp[0]; // en son çizilen
                                    parent = item._parent;
                                    order = item._order;
                                    result = true;

                                    while (parent) {
                                        elements = parent.getElements();
                                        for (j = order + 1 ; j < elements.length ; j++) {

                                            if (elements[j].inputVisible) {
                                                if (elements[j] instanceof Group) {
                                                    if (Pointer.prototype._groupContainsPoint(elements[j] , null , x , y , eventId)) {
                                                        result = false;
                                                        break;
                                                    }
                                                } else if (elements[j].inputBox.containsPoint(x , y)) {
                                                    result = false;
                                                    break;
                                                }
                                            }


                                        }

                                        parent = parent._parent;
                                        order = parent && parent._order;
                                    }

                                    if (result) { // işlem tamam bulundu ve tetiklendi
                                        success = item;
                                        !localEvent && iEvent.checkEnable() && iEvent._handler(event , global , temp);
                                    }

                                }

                                effected = true;
                            }


                            if (localEvent) {
                                iEvent.checkEnable() && iEvent._handler(event , global , temp , result);
                            }

                        }

                    }

                }



            }

            this._lastEvent = event;
        },

        /**
         *
         * @private
         */
        _attach: function (name , global) {
            (global ? window : this._htmlElement).addEventListener(name , this.__eventDistributor);
        },

        /**
         *
         * @private
         */
        _detach: function (name , global) {
            (global ? window : this._htmlElement).removeEventListener(name , this.__eventDistributor);
        }

    });

})();