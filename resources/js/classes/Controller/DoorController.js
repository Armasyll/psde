/**
 * Door Controller
 */
class DoorController extends EntityController {
    /**
     * Creates a Door Controller
     * @param {string} id 
     * @param {BABYLON.AbstractMesh} aMeshes 
     * @param {object} entityObject 
     */
    constructor(id = "", aMeshes = [], entityObject = {}) {
        super(id, aMeshes, entityObject);
        if (!this.hasMesh()) {
            return undefined;
        }
        this.turnSpeed = Tools.RAD_90/60; // radians per second
        this.moving = false;
        this.startRotation = this.meshes[0].rotation.clone();
        this.endRotation = BABYLON.Vector3.Zero();
        //this.currentRotation = this.meshes[0].rotation.clone();
        this.intendedRotation = BABYLON.Vector3.Zero();
        this.animated = true;
        this.open = false;
        this.opening = false;
        
        if (entityObject.opensInward === true)
            this.setOpensInward();
        else
            this.setOpensOutward();
        if (entityObject.open === true)
            this.forceOpen();
        else
            this.forceClose();
        DoorController.set(this.id, this);
        this.postConstruct();
    }
    postConstruct() {
        super.postConstruct();
        return 0;
    }
    createCollisionMesh() {
        for (let i = 0; i < this.meshes.length; i++) {
            this.meshes[i].checkCollisions = true;
        }
        return 0;
    }

    setOpensOutward(byDegrees = 90) {
        this.endRotation = this.startRotation.add(new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(byDegrees), 0));
        return 0;
    }
    setOpensInward(byDegrees = 90) {
        this.endRotation = this.startRotation.subtract(new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(byDegrees), 0));
        return 0;
    }
    moveAV() {
        if (this._locked) {
            return 0;
        }
        this.doMove();
        return 0;
    }
    doMove() {
        if (!this.moving) {
            return 0;
        }
        let difference = Math.abs(this.meshes[0].rotation.y - this.intendedRotation.y);
        if (!this.opening && difference <= 0.025) {
            this.meshes[0].rotation.copyFrom(this.intendedRotation);
            this.moving = false;
            this.opening = false;
            this.open = false;
            return 0;
        }
        else if (this.opening && difference <= 0.025) {
            this.meshes[0].rotation.copyFrom(this.intendedRotation);
            this.moving = false;
            this.opening = false;
            this.open = true;
            return 0;
        }
        if (this.opening) {
            if (this.meshes[0].rotation.y < this.intendedRotation.y) {
                this.meshes[0].rotation.y += this.turnSpeed;
            }
            else {
                this.meshes[0].rotation.y -= this.turnSpeed;
            }
        }
        else {
            if (this.meshes[0].rotation.y > this.intendedRotation.y) {
                this.meshes[0].rotation.y -= this.turnSpeed;
            }
            else {
                this.meshes[0].rotation.y += this.turnSpeed;
            }
        }
        return 0;
    }
    doOpen() {
        this.moving = true;
        this.opening = true;
        this.intendedRotation = this.endRotation;
        this.removeHiddenAvailableAction(ActionEnum.CLOSE);
        this.setDefaultAction(ActionEnum.CLOSE);
        this.addHiddenAvailableAction(ActionEnum.OPEN);
        return 0;
    }
    doClose() {
        this.moving = true;
        this.opening = false;
        this.intendedRotation = this.startRotation;
        this.setDefaultAction(ActionEnum.OPEN);
        this.removeHiddenAvailableAction(ActionEnum.OPEN);
        this.addHiddenAvailableAction(ActionEnum.CLOSE);
        return 0;
    }
    forceOpen() {
        this.moving = false;
        this.opening = false;
        this.open = true;
        this.meshes[0].rotation.copyFrom(this.endRotation);
        this.removeHiddenAvailableAction(ActionEnum.CLOSE);
        this.setDefaultAction(ActionEnum.CLOSE);
        this.addHiddenAvailableAction(ActionEnum.OPEN);
        return 0;
    }
    forceClose() {
        this.moving = false;
        this.opening = false;
        this.open = false;
        this.meshes[0].rotation.copyFrom(this.startRotation);
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
        delete this.startRotation;
        delete this.endRotation;
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