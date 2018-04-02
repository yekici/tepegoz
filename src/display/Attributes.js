// name:display.Attributes

var Attributes;

(function () {

    /**
     *
     * @class Attributes
     */
    t.Attributes = Attributes = t.class('Attributes' , function (type , opt) {

        !opt && (opt = {});

        /**
         * ELEMENT veya GROUP
         */
        this._attributes = type;

        if (type <= Attributes.GROUP) { // ortak

            /**
             * False ise çizilmez
             * @type {boolean}
             */
            this.visible = opt.visible != null ? opt.visible : true;

            /**
             * Şimdilik sadece kalıtım şekilli lazım
             * @type {number}
             */
            this.position = Attributes.INHERITANCE;

            /**
             * Opaklık
             * @type {number}
             */
            this.alpha = opt.alpha != null ? opt.alpha : 1;
        }

        if (type == Attributes.ELEMENT) {
            /**
             *
             * @type {boolean}
             */
            this.closed = opt.closed != null ? opt.closed : true;

            /**
             *
             * @type {boolean|Color}
             */
            this.fill = opt.fill != null ? (opt.fill instanceof Color ? opt.fill : new Color(opt.fill))  : false;

            /**
             *
             * @type {boolean|Color}
             */
            this.stroke = opt.stroke != null ? (opt.stroke instanceof Color ? opt.stroke : new Color(opt.stroke)) : false;


            /**
             * Çerçeve kalınlığı
             * @type {number}
             */
            this.borderWidth = opt.borderWidth != null ? opt.borderWidth : 1;

        }




    } , [] , {

        applyAttributes: function (context , inheritance) {

            var type = this._attributes;


            if (type == Attributes.ELEMENT) {

                if (this.fill) {
                    context.fillStyle = this.fill.toCanvas();
                }

                if (this.stroke) {
                    context.strokeStyle = this.stroke.toCanvas();
                }

                context.globalAlpha = this.alpha * inheritance.alpha;

                context.lineWidth = this.borderWidth;

            } else if (type == Attributes.GROUP) {


                inheritance.alpha = context.globalAlpha = this.alpha * inheritance.alpha;


            }

            if (type <= Attributes.GROUP) { // ortak


            }

        }


    });

    t.assign(t.Attributes , {
        ELEMENT: 1,
        GROUP: 2,


        //Positions
        INDEPENDENT: 301,
        INHERITANCE: 302,
        FIXED: 303,
    });

    /**
     *
     * @param inheritance
     * @class {Attributes.Inheritance}
     */
    Attributes.Inheritance = function (inheritance) {
        this.alpha = inheritance ? inheritance.alpha : 1;
    }

})();