// name:items.Creator
// require:item.Polygon
// require:item.Group

(function () {

    t.Creator = t.class('Creator' , function (scene , group) {
        this.scene = scene;
        this._group = group;
    } , {
        polygon: function (opt) {
            return this._group.addItem(new Element.Polygon(this.scene , opt));
        },
        group: function () {
            return this._group.addItem(new Group(this.scene));
        },
        text: function (opt) {
            return this._group.addItem(new Element.Text(this.scene , opt));
        }
    })

})();