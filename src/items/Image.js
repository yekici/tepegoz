// name:items.Image
// require:items.Element
// require:shape.Rectangle




(function () {

    t.Element.Image = t.Element.extend('Image' , function (game , opt) {
        Element.call(this , game , opt);


        Rectangle.call(this);



    } , [Rectangle] , {



    });

})();