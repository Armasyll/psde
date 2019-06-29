class FurnitureController extends EntityController {
    constructor(id, mesh, entity) {
        super(id, mesh, entity);

        // containers, doors: opening, opened, closing, closed
        // maybe make 90_idle01 closed
        if (this.skeleton instanceof BABYLON.Skeleton) {
            this.closed = new AnimData("closed");
            this.open = new AnimData("open");
            this.opened = new AnimData("opened");
            this.close = new AnimData("close");
            this.animations = this.animations.concat([this.closed, this.open, this.opened, this.close]);

            this.setAnimData(this.closed, "10_closed01", 1, true);
            this.setAnimData(this.open, "80_open01", 1, false);
            this.setAnimData(this.opened, "10_opened01", 1, true);
            this.setAnimData(this.close, "80_close01", 1, false);

            this.checkAnims(this.skeleton);
            this._isAnimated = true;
        }

        Game.setFurnitureController(this.id, this);
    }

    moveAV() { // animate it :V
        /*var anim = null;
        var dt = Game.engine.getDeltaTime() / 1000;
        anim = this.doIdle(dt);
        this.beginAnimation(anim);*/
        return this;
    }

    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        super.dispose();
        Game.removeFurnitureController(this.id);
        return undefined;
    }
}