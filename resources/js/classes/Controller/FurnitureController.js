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

        FurnitureController.set(this.id, this);
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
        FurnitureController.remove(this.id);
        super.dispose();
        return undefined;
    }

    static initialize() {
        FurnitureController.furnitureControllerList = {};
    }
    static get(id) {
        if (FurnitureController.has(id)) {
            return FurnitureController.furnitureControllerList[id];
        }
        return 1;
    }
    static has(id) {
        return FurnitureController.furnitureControllerList.hasOwnProperty(id);
    }
    static set(id, furnitureController) {
        FurnitureController.furnitureControllerList[id] = furnitureController;
        return 0;
    }
    static remove(id) {
        delete FurnitureController.furnitureControllerList[id];
        return 0;
    }
    static list() {
        return FurnitureController.furnitureControllerList;
    }
    static clear() {
        for (let i in FurnitureController.furnitureControllerList) {
            FurnitureController.furnitureControllerList[i].dispose();
        }
        FurnitureController.furnitureControllerList = {};
        return 0;
    }
}
FurnitureController.initialize();