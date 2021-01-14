/**
 * Compound Controller
 * @class
 * @typedef {Object} CompoundController
 * @property {string} id 
 * @property {Object[]} entities
 * @property {string} entities[].entityID
 * @property {BABYLON.Vector3} entities[].position
 * @property {BABYLON.Vector3} entities[].rotation
 * @property {BABYLON.Vector3} entities[].scaling
 * @property {Object} entities[].options
 * @property {boolean} entities[].options.bindToParent
 * @property {boolean} entities[].options.disposeWithParent
 * @property {Object<string, InstancedCompoundController>} instances
 */
class CompoundController {
    /**
     * Creates a Compound Controller
     * @param {string} id 
     */
    constructor(id = "") {
        this.id = Tools.filterID(id, Tools.genUUIDv4());
        this.entities = [];
        this.instances = {};
        
        CompoundController.set(this.id, this);
    }

    /**
     * 
     * @param {string} entityID 
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} rotation 
     * @param {BABYLON.Vector3} scaling 
     * @param {object} options 
     */
    addEntity(entityID, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        position = Game.filterVector3(position);
        rotation = Game.filterVector3(rotation);
        scaling = Game.filterVector3(scaling);
        if (scaling.equals(BABYLON.Vector3.Zero())) {
            scaling = BABYLON.Vector3.One();
        }
        options = this.filterEntityOptions(options);
        let entityObject = {
            "entityID": entityID,
            "position": position,
            "rotation": rotation,
            "scaling": scaling,
            "options": options
        };
        this.entities.push(entityObject);
        return 0;
    }
    /**
     * 
     * @param {InstancedCompoundController} instance 
     */
    removeInstance(instance) {
        // INFO: just in case the object is gone
        if (typeof instance == "string" && this.instances.hasOwnProperty(instance)) {
            delete this.instances[instance];
            return 0;
        }
        instance = Tools.filterClass(instance, InstancedCompoundController, null);
        if (instance == null) {
            return 1;
        }
        delete this.instances[instance.id];
        return 0;
    }
    addInstance(instance) {
        instance = Tools.filterClass(instance, InstancedCompoundController, null);
        if (instance == null) {
            return 1;
        }
        this.instances[instance.id] = instance;
        return 0;
    }
    filterEntityOptions(options) {
        if (!(options instanceof Object)) {
            options = {};
        }
        let tempOptions = {};
        // bindToParent
        if (options.hasOwnProperty("bindToParent")) {
            tempOptions["bindToParent"] = options["bindToParent"] !== false;
        }
        else {
            tempOptions["bindToParent"] = true;
        }
        // disposeWithParent
        if (options.hasOwnProperty("disposeWithParent")) {
            tempOptions["disposeWithParent"] = options["disposeWithParent"] !== false;
        }
        else {
            tempOptions["disposeWithParent"] = true;
        }
        tempOptions["filtered"] = true;
        return tempOptions;
    }

    /**
     * 
     * @param {string} id 
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} rotation 
     * @param {BABYLON.Vector3} scaling 
     * @param {object} options 
     */
    createInstance(id, position, rotation, scaling, options) {
        return new InstancedCompoundController(id, this, position, rotation, scaling, options);
    }

    dispose() {
        return null;
    }
    getClassName() {
        return "CompoundController";
    }

    static initialize() {
        CompoundController.compoundControllerList = {};
    }
    static get(id) {
        if (CompoundController.has(id)) {
            return CompoundController.compoundControllerList[id];
        }
        return 1;
    }
    static has(id) {
        return CompoundController.compoundControllerList.hasOwnProperty(id);
    }
    static set(id, compoundControllerList) {
        CompoundController.compoundControllerList[id] = compoundControllerList;
        return 0;
    }
    static remove(id) {
        delete CompoundController.compoundControllerList[id];
        return 0;
    }
    static list() {
        return CompoundController.compoundControllerList;
    }
    static clear() {
        for (let i in CompoundController.compoundControllerList) {
            CompoundController.compoundControllerList[i].dispose();
        }
        CompoundController.compoundControllerList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!CompoundController.has(oldID)) {
            return 1;
        }
        CompoundController.set(newID, CompoundController.get(oldID));
        CompoundController.remove(oldID);
        return 0;
    }
}
CompoundController.initialize();