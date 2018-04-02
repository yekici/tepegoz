// name:core.Scene

var Scene;

(function () {

    t.Scene = Scene = t.class(function (container , width , height , opt) {

        if (!opt || !t.isObject(opt))
            opt = {};


        this.main = new Group(this);

        this.canvas = new Canvas(container , width , height );

        this.drawing = new Drawing(this);

        this.inputController = new Input.Controller(this);

        this.add = this.main.add;
    } , [] , {

        /**
         * Mainin transform unu kontrol eder
         */
        enableZoomController: function (min , max , interval , phrases) {
            if (min < 0) min = 0;
            if (max < 0) max = 0;
            if (interval < 0) interval = 0;
            if (!phrases) phrases = '';

            var self = this;

            return this.main.input('wheel' + phrases + '[id=0zoom][capture][local]' , {
                onWheel: function (e) {
                    var currentZoom = self.zoom,
                        nextZoom = currentZoom + (-1 * e.deltaY * interval),
                        o = new V(e.offsetX , e.offsetY),
                        p , k;


                    k = this.getTSMatrix().clone().invert().point(o.x , o.y);

                    self.zoom = t.clamp(nextZoom , min , max);

                    this.offset.set(0 , 0);

                    p = this.getTSMatrix().point(k.x , k.y);

                    this.offset.set(o.x - p.x, o.y - p.y);

                    this.emit('zoom');
                }
            });

        },

        disableZoomController: function () {
            this.main.inputOff('0zoom');
        },

        enableDrag: function (withEl , phrases) {
            if (!phrases) phrases = '';

            this._enableDrag = new V;
            this._enableDrag.drag = false;


            var self = this;

            this.main.input('move[local][id=0move]' , {
                onMove: function (e) {
                    if (!self._enableDrag.drag) return;
                    var p = self._enableDrag,
                        diff = new V(e.offsetX - p.x , e.offsetY - p.y);

                    this.offset.sum(diff.x , diff.y);
                    p.set(e.offsetX , e.offsetY);
                }
            });


            return this.main.input('button' + phrases + '[local][id=0button]' , {
                onDown: function (e) {
                    if (withEl && !e.target) return;
                    self._enableDrag.set(e.offsetX , e.offsetY);
                    self._enableDrag.drag = true;
                } ,
                onUp: function (e) {
                    self._enableDrag.drag = false;
                }
            });
        }



    });


    Object.defineProperties(Scene.prototype , {

        zoom: {
            get: function () {
                return this.main.scale.x;
            },
            set: function (val) {
                val < 0 && (val = 0);
                this.main.scale.set(val , val);
            }
        }

    });


})();