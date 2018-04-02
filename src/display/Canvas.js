// name:display.Canvas

var Canvas;

(function () {

    /**
     * @class Canvas
     * @param {String} container kapsayıcı element id
     * @param {Number} width
     * @param {Number} height
     */
    t.Canvas = Canvas = t.class('Canvas' , function (container , width , height) {


        var canvas = document.createElement('Canvas'),
            element = document.getElementById(container);

        if (!element)
            throw new Error('Container is not found')

        canvas.width = width || 640;
        canvas.height = height || 480;


        element.appendChild(canvas);

        this._canvas = canvas;
        this._context = canvas.getContext('2d');

        this.setStyle({
            position: 'relative' ,
            top: '0px' ,
            left: '0px' ,
            padding: '0px' ,
            margin: '0px'
        });

    } , [] , {

        /**
         *
         * @param {Object} properties
         */
        setStyle: function (properties) {
            var canvas = this._canvas;
            for (var key in properties) {
                canvas.style[key] = properties[key];
            }
        },

        /**
         *
         * @returns {Element|*}
         */
        getCanvas: function () {
            return this._canvas;
        },

        /**
         *
         * @returns {*|CanvasRenderingContext2D}
         */
        getContext: function () {
            return this._context;
        }

    })

})();