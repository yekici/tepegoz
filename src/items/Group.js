// name:items.Group
// require:core.Scene
// require:items.Element
// require:items.Item
// require:core.EventEmitter

var Group;

(function () {

    /**
     *
     * @class Group
     * @param {Scene}
     */
    t.Group = Group = t.Item.extend('Group' , function (scene) {
        Item.call(this , scene);

        Transformation.call(this)
        Attributes.call(this , Attributes.GROUP);

        
        this._elements = [];

        this.add = new t.Creator(scene , this);

    } , [Transformation , Attributes] , /**@lends Group.prototype*/{

        /**
         * 
         * @returns {Array}
         */
        getElements: function () {
            return this._elements;
        },

        /**
         *
         * @returns {Number}
         */
        getElementsLength: function () {
            return this._elements.length;
        },

        /**
         * Ekli Olup Olmadığına Bakar
         * @param {Element|Group} element
         * @return {Boolean|Number} Varsa indisi yoksa false
         */
        has: function (element , index) {

            var index = 0;

            if ((index = this._elements.indexOf(element)) >= 0) {
                return index;
            }

            return false
        },

        /**
         * Gruba yeni eleman ekler
         * @param element
         * @param index
         */
        addItem: function (element , index) {
            if (this.has(element) !== false || !((element instanceof Element) || (element instanceof Group)) || element._parent) {
                return false
            }

            var length = this.getElementsLength(),
                elements = this._elements;

            
            index != null ? elements.splice(index , 0 , element) : elements.push(element);
            element._parent = this;

            //position
            element.bindTS(this);

            element._order = index != null ? index : length;
            element._drawingOrder = null;

            this.emit('elementAdded' , element , index != null ? index : length);

            return element
        },

        /**
         * Grubdan belirtilen elamanı kaldırır
         * @param element
         * @returns {Boolean|Group}
         */
        removeItem: function (element) {
            var elements = this._elements,
                index;

            if ((index = this.has(element)) === false) {
                return false
            }

            elements.splice(index , 1);
            element._parent = null;
            element.bindTS();
            element.disableDrag();
            this.emit('elementRemoved' , element , index);

            return this
        }

    });

    /**
     * Gruba yeni eleman eklenince
     * @event Group#addedElement
     * @param {Element} element Eklenen eleman
     * @param {number} index Eklenen elemanın indis numarası
     */

    /**
     * Grubdan eleman kaldırılınca
     * @event Group#removedElement
     * @param {Element} element Eklenen eleman
     * @param {number} index Eklenen elemanın indis numarası
     */


})();