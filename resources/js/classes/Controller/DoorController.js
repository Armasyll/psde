class DoorController extends EntityController {
    constructor(id, mesh, entity) {
        super(id, mesh, entity);
        this.mesh = mesh;
        this.entity = entity;
        this.mesh.checkCollisions = true;
        this.avStartRot = this.mesh.rotation.clone();
        this.avEndRot = BABYLON.Vector3.Zero();
        this.animated = true;

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

        DoorController.set(this.id, this);
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
        delete this.avStartRot;
        delete this.avEndRot;
        DoorController.remove(this.id);
        super.dispose();
        return undefined;
    }

    static initialize() {
        DoorController.doorControllerList = {};
    }
    static get(id) {
        if (DoorController.has(id)) {
            return DoorController.doorControllerList[id];
        }
        return 1;
    }
    static has(id) {
        return DoorController.doorControllerList.hasOwnProperty(id);
    }
    static set(id, doorController) {
        DoorController.doorControllerList[id] = doorController;
        return 0;
    }
    static remove(id) {
        delete DoorController.doorControllerList[id];
        return 0;
    }
    static list() {
        return DoorController.doorControllerList;
    }
    static clear() {
        for (let i in DoorController.doorControllerList) {
            DoorController.doorControllerList[i].dispose();
        }
        DoorController.doorControllerList = {};
        return 0;
    }
}
DoorController.initialize();