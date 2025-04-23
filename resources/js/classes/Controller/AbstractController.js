/**
 * Abstract Controller
 * @class
 * @typedef {Object} AbstractController
 * @property {string} id 
 * @property {string} entityID 
 * @property {Array.<Babylon.AbstractMesh} meshes
 * @property {string} controller 
 * @property {number} height 
 * @property {number} width 
 * @property {number} depth 
 * @property {boolean} enabled 
 * @property {boolean} locked 
 * @property {boolean} disposing 
 * @property {Babylon.Ray} targetRay 
 * @property {Babylon.RayHelper} targetRayHelper 
 * @property {Babylon.Ray} groundRay 
 * @property {Babylon.RayHelper} groundRayHelper 
 * @property {boolean} bHasRunPostConstructAbstract 
 * @property {boolean} bHasRunAssignAbstract 
 */
class AbstractController {
    constructor(id, aMeshes, entityObject) {
        if (AbstractController.debugMode) console.group(`Creating new AbstractController(${id}, aMeshes, entityObject)`);
        if (!(entityObject instanceof Object)) {
            return undefined;
        }
        if (!(entityObject.hasOwnProperty("id"))) {
            if (AbstractController.debugMode) console.error(`Failed to create AbstractController ${id} due to invalid entityObject`);
            if (AbstractController.debugMode) console.groupEnd();
            return undefined;
        }
        this.id = Tools.filterID(id, Tools.genUUIDv4());
        this.entityID = "";
        this.meshes = [];

        this.controller = this.id;
        this.height = 1.0;
        this.width = 0.25;
        this.depth = 0.25;
        this.baseScaling = BABYLON.Vector3.One();
        this.enabled = true;
        this._locked = false;
        this.disposing = false;
        this.targetRay = null;
        this.targetRayHelper = null;
        this.groundRay = null;
        this.groundRayHelper = null;
        this.bHasRunPostConstructAbstract = false;
        this.bHasRunAssignAbstract = false;
        this.assign(entityObject);
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
    hasMesh() {
        if (!(this.meshes instanceof Array)) {
            return false;
        }
        return this.meshes[0] instanceof BABYLON.AbstractMesh;
    }
    setMeshes(aMeshes, updateChild = false) {
        if (AbstractController.debugMode) console.group(`Running {AbstractController} ${this.id}.setMesh(meshObject, ${updateChild})`);
        if (aMeshes instanceof BABYLON.AbstractMesh) {
            let array = [];
            array[0] = aMeshes;
            aMeshes = array;
        }
        if (!(aMeshes instanceof Array)) {
            if (AbstractController.debugMode) console.error(`aMeshes isn't an array`);
            if (AbstractController.debugMode) console.groupEnd();
            return 2;
        }
        if (!(aMeshes[0] instanceof BABYLON.AbstractMesh)) {
            if (AbstractController.debugMode) console.error(`aMeshes didn't contain any BABYLON.AbstractMesh(es); using missingMesh`);
            aMeshes[0] = Game.getMesh("missingMesh");
        }
        if (this.meshes[0] instanceof BABYLON.AbstractMesh && this.meshes[0].id != aMeshes[0].id) {
            this.unsetMeshes(true);
        }
        this.meshes = aMeshes;
        for (let i = 0; i < this.meshes.length; i++) {
            this.meshes[i].isPickable = false;
            this.meshes[i].alwaysSelectAsActiveMesh = false;
            this.meshes[i].controller = this;
            if (i > 0) {
                this.meshes[i].setParent(this.meshes[0]);
            }
        }
        /*this.height = this.meshes[0].getBoundingInfo().boundingBox.extendSize.y * 2;
        this.width = this.meshes[0].getBoundingInfo().boundingBox.extendSize.x * 2;
        this.width = this.meshes[0].getBoundingInfo().boundingBox.extendSize.z * 2;*/
        this.baseScaling.copyFrom(this.meshes[0].scaling);
        if (AbstractController.debugMode) console.groupEnd();
        return 0;
    }
    unsetMeshes(destroyMeshes) {
        if (!(this.meshes[0] instanceof BABYLON.AbstractMesh)) {
            return 0;
        }
        for (let i = this.meshes.length - 1; i >= 0; i--) {
            this.meshes[i].controller = null;
            this.meshes[i].setParent(null);
            if (destroyMeshes) {
                this.meshes[i].setEnabled(false);
                Game.removeMesh(this.meshes[i]);
            }
        }
        return 0;
    }
    getMesh() {
        return this.meshes[0];
    }
    getMeshes() {
        return this.meshes;
    }
    getPosition() {
        return this.collisionMesh.position.clone();
    }
    getRotation() {
        return this.collisionMesh.rotation.clone();
    }
    setScaling(vector3) {
        vector3 = Game.filterVector3(vector3);
        for (let i = 0; i < this.meshes.length; i++) {
            this.meshes[i].scaling.copyFrom(vector3);
        }
        return 0;
    }
    getScaling() {
        return this.meshes[0].scaling.clone();
    }

    generateHitboxes() {
        return 0;
    }

    updateTargetRay() {
        if (AbstractController.debugMode && AbstractController.debugVerbosity > 3) console.info(`${this.id}.updateTargetRay()`);
        if (this._locked || !this.enabled) {
            return 0;
        }
        if (!(this.targetRay instanceof BABYLON.Ray)) {
            this.targetRay = new BABYLON.Ray(this.collisionMesh.position, this.collisionMesh.getDirection(this.collisionMesh.forward), 1.524 * this.collisionMesh.scaling.y); // TODO: figure out the last parameter
        }
        this.targetRay.origin.copyFrom(this.collisionMesh.position);
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
        return this._locked;
    }
    setLocked(locked = true) {
        this._locked = locked == true;
        return 0;
    }

    update(objectBlob) {
        this.bHasRunAssignAbstract = false;
        this.assign(objectBlob);
        return 0;
    }
    /**
     * Clones the controller's values over this; but not really anything important :v
     * @param {(AbstractController|object)} objectBlob 
     */
    assign(objectBlob) {
        if (!(objectBlob instanceof Object)) {
            return 1;
        }
        if (this.bHasRunAssignAbstract == true) {
            return 0;
        }
        this.bHasRunAssignAbstract = true;
        if (AbstractController.debugMode) console.group(`Running {AbstractController} ${this.id}.assign(controllerObject)`);
        if (objectBlob.hasOwnProperty("height")) this.height = objectBlob.height;
        if (objectBlob.hasOwnProperty("width")) this.width = objectBlob.width;
        if (objectBlob.hasOwnProperty("depth")) this.depth = objectBlob.depth;
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