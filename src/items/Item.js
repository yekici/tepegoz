// name:items.Item
// require:input.Manager



var Item;

(function () {

    t.Item = Item = t.class('Item' , function (scene) {
        EventEmitter.call(this);
        Input.Manager.call(this);

        this.scene = scene;

        this._parent = null;

        this.id = t.gid();

        this._order = null;

        this._drawingOrder = null;

    } , [EventEmitter , Input.Manager] , {
        
    });

})();
