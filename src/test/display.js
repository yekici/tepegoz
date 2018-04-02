// name:test.Display
// require:display.Color
// require:display.Drawing


(function () {

    t.test('display.Color' , function () {

        var color = new Color;


        t.assert(color.set(100 , 100 , 100).equals(100 , 100 , 100));
        t.assert(color.equals(100 , 100 , 100 , 1));
        t.assert(!color.equals(100 , 100 , 100 , 0.5));
        t.assert(color.set('#333').equals(51 , 51 , 51));
        t.assert(color.set('red').equals(255 , 0 , 0));
        t.assert(color.save('test').shade(20).restore('test').equals(255 , 0 , 0));
        t.assert(color.save().shade(20).restore().equals(255 , 0 , 0));
        t.assert(color.toString() == 'RGBA(255,0,0,1)');
        t.assert(color.set(0x333333).equals(51 , 51 , 51));
        t.assert(color.set('#4F1D3D').equals(79 , 29 , 61));
        t.assert(color.set(0x4F1D3D).equals(79 , 29 , 61));
        t.assert(!color.set(0x4F1D3D).equals(79 , 29 , 61 , 0.5));
        t.assert(color.set(79 , 29 , 61).equals(79 , 29 , 61));

        var color2 = color.clone();

        t.assert(color2.equals(color));
        t.assert(color2.equals(79 , 29 , 61));
        t.assert(color2.restore('test').equals(255 , 0 , 0));


    });


    t.test('display.Drawing' , function () {

        if (!t.testMode) return false;

        var scene = new Scene('scene' , 1300 , 300),
            element = new Element.Polygon(scene , {
                points: [10,10 , 200,10 , 200,100 , 10,100],
                fill: 'white',
                stroke: 'black',
                borderWidth: 2,
                anchor: [10 ,10],//[105 , 55],
                offset: [200 , 50]
            });

        //element.stroke.alpha = 0.9



        scene.main.add(element);

        scene.drawing.render();

        setInterval(function () {
            element.rotation += 0.05;
            scene.drawing.render();
        } , 10);

    });

})();
