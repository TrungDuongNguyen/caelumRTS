game.moveIcon = me.Entity.extend({
    /**
     * constructor
     */
    init : function (x, y) {
        // call the constructor
        this._super(game.playerObject, 'init', [x, y, {
            image : "iconCross_brown",
            name : "moveIcon",
            width : 16,
            height : 15,
            framewidth : 16
        }]);

        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;
        this.anchorPoint.set(0, 0);
        this.float = true;

    },
    onActivateEvent: function () {
        //register on mouse/touch event
        me.input.registerPointerEvent("pointerdown", this, this.onClick.bind(this));
    },

    update : function (dt) {
        var x = me.game.viewport.localToWorld(me.input.pointer.pos.x,me.input.pointer.pos.y);
        this.pos.x = x.x;
        this.pos.y = x.y;
        return true;
    },

    onClick : function (event) {
        var moveButton = me.game.world.getChildByName("moveButton")[0];
        var x = me.game.viewport.localToWorld(me.input.pointer.pos.x,me.input.pointer.pos.y);
        //not sure why but melon likes it better when I pass these as variables
        var xvar = x.x;
        var yvar = x.y;
        moveButton.movePlayer(xvar, yvar);
        me.game.world.removeChild(this);
        me.game.repaint();

    },
    onDestroyEvent : function() {
        me.game.world.updateChildBounds();
    },

    /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
        return false;
    }

});
