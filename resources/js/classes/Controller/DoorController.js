class DoorController extends EntityController {
    constructor(id, mesh, entity) {
        super(id, mesh, entity);
        this.mesh = mesh;
        this.entity = entity;
        this.mesh.checkCollisions = true;
        this.avStartRot = this.mesh.rotation.clone();
        this.avEndRot = BABYLON.Vector3.Zero();
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

        Game.setDoorController(this.id, this);
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
        this.setLocked(true);
        this.setEnabled(false);
        this.avStartRot.dispose();
        this.avEndRot.dispose();
        Game.removeDoorController(this.id);
        super.dispose();
        return undefined;
    }
}