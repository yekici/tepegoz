// name:display.Drawing

var Drawing;

(function () {

    /**
     *
     * @class {Drawing}
     */
    Drawing = t.class('Drawing' , function (scene) {
        EventEmitter.call(this);

        this.scene = scene;
        
        this.context = scene.canvas.getContext();

        this.canvas = scene.canvas.getCanvas();

        this.group = scene.main;

        /**
         * Son render işleminin ne kadar zaman aldığı
         * @type {null}
         */
        this.lastRenderingTime = null;

        /**
         * Son Render (olaylarla beraber) işlem zamanı
         * @type {null}
         */
        this.lastProcessingTime = null;
    } , [EventEmitter] , {

        /**
         *
         */
        render: function () {
            var context = this.context,
                group = this.group,
                canvas = this.canvas,
                time , pTime;

            pTime = t.now();

            this.emit('render:begin');

            time = t.now();

            Drawing.clear(context , 0 , 0 , canvas.width , canvas.height);
            Drawing.renderGroup(context , group , new Attributes.Inheritance);

            this.lastRenderingTime = t.now() - time;

            this.emit('render');

            this.lastProcessingTime = t.now() - pTime;
        }




    });

    /**
     *
     * @memberof Drawing
     * @param {Context} context
     * @param {Element} element
     * @param {Attirbutes.Inheritance} inheritance
     */
    Drawing.renderElement = function (context , element , inheritance , drawingOrder) {
        if (!element.visible) return true;
        if (!element.draw) return false;
        !drawingOrder && (drawingOrder = 0);

        var m = element.getTSMatrix();

        context.save();
        context.beginPath();
        context.setTransform(m[0] , m[1] , m[2] , m[3] , m[4] , m[5]);

        element._drawingOrder = drawingOrder;
        element.applyAttributes(context , inheritance);
        element.draw(context);

        if (element.closed)
            context.closePath();

        if (element.stroke)
            context.stroke();

        if (element.stroke && element.fill) {
            context.shadowColor = 0;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowBlur = 0;
        }

        if (element.fill)
            context.fill();

        context.restore();
        return true;
    };


    /**
     *
     * @memberof Drawing
     * @param {Context} context
     * @param {Element} element
     * @param {Attirbutes.Inheritance} inheritance
     */
    Drawing.renderGroup = function (context , group , inheritance , drawingOrder) {
        if (!group.visible || !group.getElementsLength()) return true;
        !drawingOrder && (drawingOrder = 0);

        var elements = group.getElements(),
            length = elements.length,
            i = 0,
            item;

        group._drawingOrder = drawingOrder;

        context.save();

        group.applyAttributes(context , inheritance);

        for ( ; i < length ; i++) {
            item = elements[i];
            if (item instanceof Group) {
                Drawing.renderGroup(context , item , new Attributes.Inheritance(inheritance) , ++drawingOrder);
            } else { // element
                Drawing.renderElement(context , item , inheritance , ++drawingOrder);
            }
        }

        context.restore();

        return true;
    }

    /**
     *
     * @param {Context} context
     * @param {Number} x
     * @param {Number} y
     * @param {Number} width
     * @param {Number} height
     */
    Drawing.clear = function (context , x , y , width , height) {
        context.clearRect(x , y, width , height);
    }

})();