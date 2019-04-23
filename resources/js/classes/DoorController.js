class DoorController extends EntityController {
    constructor(_id, _mesh, _entity) {
        super(_id, _mesh, _entity);
        this.mesh = _mesh;
        this.entity = _entity;
        this.mesh.checkCollisions = true;
        this.avStartRot = this.mesh.rotation.clone();
        this.avEndRot = null;
        this._isAnimated = true;

        if (this.entity.getOpensInward()) {
            this.setOpensInward();
        }
        else {
            this.setOpensOutward();
        }
        if (this.entity.getOpen()) {
            this.doOpen();
        }
        else {
            this.doClose();
        }

        Game.doorControllers[this.id] = this;
    }
    setOpensOutward() {
        this.avEndRot = this.avStartRot.add(new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), 0));
    }
    setOpensInward() {
        this.avEndRot = this.avStartRot.subtract(new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), 0));
    }
    doOpen() {
        this.mesh.rotation = this.avEndRot;
    }
    doClose() {
        this.mesh.rotation = this.avStartRot;
    }
    dispose() {
        delete Game.doorControllers[this.id];
        super.dispose();
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}