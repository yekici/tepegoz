// name:items.Text
// require:items.Element

(function () {

    Element.Text = Element.extend('Text' , function (scene , opt) {
        Transformation.call(this , opt);
        Element.call(this , scene, opt);


        this.baseLine = opt.baseLine || 'top';
        this.font = opt.font || '14px Arial, Helvetica, sans-serif';

        this.setText(opt.text || opt._text || '');


        this.inputVisible = false;
    }, [Transformation] , {

        clone: function () {
            return new Element.Text(this);
        },

        draw: function (context) {
            context.textBaseline = this.baseLine;
            context.font = this.font;
            if (this.fill) {
                context.fillText(this._text , 0 , 0);
            } else if (this.stroke) {
                context.strokeStyleText(this._text , 0 , 0);
            }
        },

        setText: function (text) {
            this._text = text;
            this.emit('change:text');
        },

        measureText: function (ts) {
            _context.textBaseline = this.baseLine;
            _context.font = this.font;
            if (!ts)
                return _context.measureText(this._text).width;
            return this.getTSMatrix().point(_context.measureText(this._text).width , 0).x;
        }


    })


    var _context = document.createElement('canvas').getContext('2d');

})();