/**
 * Abstract Controller
 * @class
 * @typedef {Object} AbstractController
 */
class AbstractController {
    constructor(id, mesh, entityObject) {
        if (AbstractController.debugMode) console.group(`Creating new AbstractController(${id}, meshObject, entityObject)`);
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            if (AbstractController.debugMode) console.error(`Failed to create AbstractController ${id} due to invalid mesh`);
            if (AbstractController.debugMode) console.groupEnd();
            return null;
        }
        if (!(entityObject.hasOwnProperty("id"))) {
            if (AbstractController.debugMode) console.error(`Failed to create AbstractController ${id} due to invalid entityObject`);
            if (AbstractController.debugMode) console.groupEnd();
            return null;
        }
        this.id = Tools.filterID(id);
        this.entityID = entityObject.id;
        this.mesh = null;

        this.height = 0.0;
        this.width = 0.0;
        this.depth = 0.0;
        this.enabled = true;
        this.locked = false;
        this.disposing = false;
        this.targetRay = null;
        this.targetRayHelper = null;
        this.groundRay = null;
        this.groundRayHelper = null;
        this.bHasRunPostConstructAbstract = false;
        AbstractController.set(this.id, this);
        this.postConstruct();
    }
    postConstruct() {
        if (this.bHasRunPostConstructAbstract) {
            return 0;
        }
        this.bHasRunPostConstructAbstract = true;
        return 0;
    }
    getID() {
        return this.id;
    }
    getEntityID() {
        return this.entityID;
    }
    hasEntityID() {
        return this.entityID != null;
    }
    getPosition() {
        if (this.mesh instanceof BABYLON.AbstractMesh) {
            return this.mesh.position;
        }
        return BABYLON.Vector3.Zero();
    }
    getRotation() {
        if (this.mesh instanceof BABYLON.AbstractMesh) {
            return this.mesh.rotation;
        }
        return BABYLON.Vector3.Zero();
    }
    getScaling() {
        if (this.mesh instanceof BABYLON.AbstractMesh) {
            return this.mesh.scaling;
        }
        return BABYLON.Vector3.One();
    }
    hasMesh() {
        return this.mesh instanceof BABYLON.AbstractMesh;
    }
    setMesh(mesh, updateChild = false) {
        if (AbstractController.debugMode) console.group(`Running {AbstractController} ${this.id}.setMesh(meshObject, ${updateChild})`);
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            if (AbstractController.debugMode) console.error(`meshObject wasn't an instance of BABYLON.AbstractMesh`);
            if (AbstractController.debugMode) console.groupEnd();
            return 2;
        }
        if (this.mesh instanceof BABYLON.AbstractMesh && this.mesh != mesh) {
            this.unsetMesh(this.mesh);
        }
        this.mesh = mesh;
        this.mesh.isPickable = false;
        this.mesh.alwaysSelectAsActiveMesh = false;
        this.mesh.controller = this;
        this.height = this.mesh.getBoundingInfo().boundingBox.extendSize.y * 2;
        this.width = this.mesh.getBoundingInfo().boundingBox.extendSize.x * 2;
        this.width = this.mesh.getBoundingInfo().boundingBox.extendSize.z * 2;
        if (AbstractController.debugMode) console.groupEnd();
        return 0;
    }
    unsetMesh(mesh = this.mesh) {
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            return 0;
        }
        if (!(this.mesh instanceof BABYLON.AbstractMesh)) {
            return 0;
        }
        mesh.controller = null;
        mesh.setParent(null);
        return 0;
    }
    getMesh() {
        return this.mesh;
    }
    getTexture() {
        if (!(this.mesh instanceof BABYLON.AbstractMesh)) {
            return null;
        }
        if (this.mesh.material instanceof BABYLON.Material && this.mesh.material.hasOwnProperty("diffuseTexture")) {
            return this.mesh.material.diffuseTexture;
        }
        return null;
    }
    getMaterial() {
        if (!(this.mesh instanceof BABYLON.AbstractMesh)) {
            return null;
        }
        if (this.mesh.hasOwnProperty("material")) {
            return this.mesh.material;
        }
        return null;
    }

    generateHitboxes() {
        return 0;
    }

    updateTargetRay() {
        if (AbstractController.debugMode && AbstractController.debugVerbosity > 3) console.info(`${this.id}.updateTargetRay()`);
        if (this.locked || !this.enabled) {
            return 0;
        }
        if (!(this.targetRay instanceof BABYLON.Ray)) {
            this.targetRay = new BABYLON.Ray(this.mesh.position, this.mesh.getDirection(this.mesh.forward), 1.524 * this.mesh.scaling.y);
        }
        this.targetRay.origin.copyFrom(this.mesh.position);
        return 0;
    }
    hasTargetRay() {
        if (!this.enabled) {
            return false;
        }
        return this.targetRay instanceof BABYLON.Ray;
    }
    setTargetRayLength(length = 1.524) {
        if (this.hasTargetRay()) {
            this.targetRay.length = length;
        }
        return 0;
    }
    getTargetRayLength() {
        if (this.hasTargetRay()) {
            return this.targetRay.length;
        }
        return 0;
    }

    doDeath() {
        return 0;
    }
    doSpawn() {
        return 0;
    }

    isEnabled() {
        return this.enabled;
    }
    setEnabled(enabled = true) {
        this.enabled = enabled == true;
        return 0;
    }
    isLocked() {
        return this.locked;
    }
    setLocked(locked = true) {
        this.locked = locked == true;
        return 0;
    }

    /**
     * Clones the controller's values over this; but not really anything important :v
     * @param {(AbstractController|object)} controller 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(controller, verify = true) {
        if (verify && !(controller instanceof AbstractController)) {
            return 2;
        }
        if (AbstractController.debugMode) console.group(`Running {AbstractController} ${this.id}.assign(controllerObject, ${verify})`);
        if (controller.hasOwnProperty("height")) this.height = controller.height;
        if (controller.hasOwnProperty("width")) this.width = controller.width;
        if (controller.hasOwnProperty("depth")) this.depth = controller.depth;
        if (AbstractController.debugMode) console.groupEnd();
        return 0;
    }
    updateID(newID) {
        AbstractController.updateID(this.id, newID);
        this.id = newID;
        return 0;
    }
    dispose(updateChild = false) {
        this.setLocked(true);
        this.setEnabled(false);
        if (this.disposing) {
            return null;
        }
        else {
            this.disposing = true;
        }
        if (Game.playerController == this) {
            Game.playerController = null;
        }
        if (updateChild) {
            if (this.hasEntityID()) {
                this.removeEntityID();
            }
        }
        Game.removeMesh(this.collisionMesh, !updateChild);
        Game.removeMesh(this.mesh, !updateChild);
        return null;
    }
    getClassName() {
        return "AbstractController";
    }

    static initialize() {
        AbstractController.abstractControllerList = {};
        AbstractController.debugMode = false;
        AbstractController.debugVerbosity = 2;
    }
    static get(id) {
        if (AbstractController.has(id)) {
            return AbstractController.abstractControllerList[id];
        }
        return 1;
    }
    static has(id) {
        return AbstractController.abstractControllerList.hasOwnProperty(id);
    }
    static set(id, abstractController) {
        AbstractController.abstractControllerList[id] = abstractController;
        return 0;
    }
    static remove(id) {
        delete AbstractController.abstractControllerList[id];
        return 0;
    }
    static list() {
        return AbstractController.abstractControllerList;
    }
    static clear() {
        for (let i in AbstractController.abstractControllerList) {
            AbstractController.abstractControllerList[i].dispose();
        }
        AbstractController.abstractControllerList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!AbstractController.has(oldID)) {
            return 1;
        }
        AbstractController.set(newID, AbstractController.get(oldID));
        AbstractController.remove(oldID);
        return 0;
    }
    static setDebugMode(debugMode) {
        if (debugMode == true) {
            AbstractController.debugMode = true;
            for (let abstractController in AbstractController.abstractControllerList) {
                AbstractController.abstractControllerList[abstractController].debugMode = true;
            }
        }
        else if (debugMode == false) {
            AbstractController.debugMode = false;
            for (let abstractController in AbstractController.abstractControllerList) {
                AbstractController.abstractControllerList[abstractController].debugMode = false;
            }
        }
        return 0;
    }
    static getDebugMode() {
        return AbstractController.debugMode === true;
    }
}
AbstractController.initialize();