/**
 * Door Controller
 */
class DoorController extends EntityController {
    /**
     * Creates a Door Controller
     * @param {string} id 
     * @param {BABYLON.AbstractMesh} mesh 
     * @param {object} entityObject 
     */
    constructor(id = "", mesh = null, entityObject = {}) {
        super(id, mesh, entityObject);
        if (!this.hasMesh()) {
            return null;
        }

        this.mesh.checkCollisions = true;
        this.avStartRot = this.mesh.rotation.clone();
        this.avEndRot = BABYLON.Vector3.Zero();
        this.animated = true;

        if (entityObject.opensInward) {
            this.setOpensInward();
        }
        else {
            this.setOpensOutward();
        }
        if (entityObject.open === true) {
            this.doOpen();
        }
        else {
            this.doClose();
        }

        DoorController.set(this.id, this);
    }
    setOpensOutward() {
        this.avEndRot = this.avStartRot.add(new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), 0));
        return 0;
    }
    setOpensInward() {
        this.avEndRot = this.avStartRot.subtract(new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), 0));
        return 0;
    }
    doOpen() {
        this.mesh.rotation = this.avEndRot;
        this.removeHiddenAvailableAction(ActionEnum.CLOSE);
        this.setDefaultAction(ActionEnum.CLOSE);
        this.addHiddenAvailableAction(ActionEnum.OPEN);
        return 0;
    }
    doClose() {
        this.mesh.rotation = this.avStartRot;
        this.setDefaultAction(ActionEnum.OPEN);
        this.removeHiddenAvailableAction(ActionEnum.OPEN);
        this.addHiddenAvailableAction(ActionEnum.CLOSE);
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        DoorController.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        delete this.avStartRot;
        delete this.avEndRot;
        DoorController.remove(this.id);
        super.dispose();
        return null;
    }
    getClassName() {
        return "DoorController";
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
    static updateID(oldID, newID) {
        if (!DoorController.has(oldID)) {
            return 1;
        }
        DoorController.set(newID, DoorController.get(oldID));
        DoorController.remove(oldID);
        return 0;
    }
}
DoorController.initialize();