// name:test.items
// require:items.Polygon
// require:items.Group


(function () {

    t.test('items.Group' , function () {

        var group = new Group,
            element = new Element.Polygon,
            confirm = false;


        group.on('elementAdded' , function () {
            confirm = true;
        });

        group.addItem(element);

        t.assert(confirm);

        element.offset.set(10 , 10);


        group.scale.x = 2;
        group.offset.x = 15;

        t.assert(element.getTSMatrix()[4] == 35);

        
    });


})();