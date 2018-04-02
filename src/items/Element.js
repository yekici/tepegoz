// name:items.Element
// require:core.EventEmitter
// require:core.Transformation
// require:core.Scene
// require:shape.Polygon
// require:shape.ShapeBox
// require:items.Item

var Element;

(function () {

    t.Element = Element = t.Item.extend('Element' , function (scene , opt) {
        Item.call(this , scene);

        !opt && (opt = {});

        Attributes.call(this , Attributes.ELEMENT , opt);


        //this.inputBox = new t.ShapeBox(scene);
        //this.collisonBox = new t.ShapeBox(scene);

        this.inputBox = this;
        this.collisonBox = this;


    } , [Attributes] , /**@lends Element.prototype*/{

        // zorunlu
        draw: function () {},
        clone: function () {},
        containsPoint: function () {return false}


    });


})();