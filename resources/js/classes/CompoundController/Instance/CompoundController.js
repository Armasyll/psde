class InstancedCompoundController {
    constructor(id, compoundController, position, rotation, scaling, options) {
        this.id = Tools.filterID(id, Tools.genUUIDv4());
        if (!(compoundController instanceof CompoundController)) {
            compoundController = Tools.filterClass(compoundController, CompoundController, null);
            if (compoundController == null) {
                return null;
            }
        }
        this.compoundController = compoundController;
        this.collisionMesh = Game.createAreaMesh(
            String(this.id).concat("-collisionMesh"),
            "CUBE",
            0.0125, 0.0125, 0.0125,
            position,
            rotation
        );
        this.controllers = {};

        InstancedCompoundController.set(this.id, this);
        this.compoundController.addInstance(this);
    }

    addController(controller, updateChild = true) {
        controller = Tools.filterClass(controller, EntityController, null);
        if (controller == null) {
            return 1;
        }
        if (updateChild) {
            controller.addCompoundController(this, false);
        }
        this.controllers[controller.id] = controller;
        return 0;
    }
    removeController(controller, updateChild = true) {
        // INFO: just in case the object is gone
        if (typeof controller == "string" && this.controllers.hasOwnProperty(controller)) {
            if (this.controllers[controller] instanceof EntityController) {
                this.controllers[controller].removeCompoundController(this, false);
            }
            delete this.controllers[controller];
            return 0;
        }
        controller = Tools.filterClass(controller, EntityController, null);
        if (controller == null) {
            return 1;
        }
        if (updateChild) {
            controller.removeCompoundController(this, false);
        }
        delete this.controllers[controller.id];
        return 0;
    }
    hasController(controller) {
        controller = Tools.filterClass(controller, EntityController, null);
        if (controller == null) {
            return false;
        }
        return this.controllers.hasOwnProperty(controller.id);
    }

    dispose() {
        for (let controllerID in this.controllers) {
            this.controllers[controllerID].removeCompoundController(this, false);
        }
        this.compoundController.removeInstance(this);
        InstancedCompoundController.remove(this.id);
        return null;
    }
    getClassName() {
        return "InstancedCompoundController";
    }

    static initialize() {
        InstancedCompoundController.instancedCompoundControllerList = {};
    }
    static get(id) {
        if (InstancedCompoundController.has(id)) {
            return InstancedCompoundController.instancedCompoundControllerList[id];
        }
        return 1;
    }
    static has(id) {
        return InstancedCompoundController.instancedCompoundControllerList.hasOwnProperty(id);
    }
    static set(id, instancedCompoundControllerList) {
        InstancedCompoundController.instancedCompoundControllerList[id] = instancedCompoundControllerList;
        return 0;
    }
    static remove(id) {
        delete InstancedCompoundController.instancedCompoundControllerList[id];
        return 0;
    }
    static list() {
        return InstancedCompoundController.instancedCompoundControllerList;
    }
    static clear() {
        for (let i in InstancedCompoundController.instancedCompoundControllerList) {
            InstancedCompoundController.instancedCompoundControllerList[i].dispose();
        }
        InstancedCompoundController.instancedCompoundControllerList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!InstancedCompoundController.has(oldID)) {
            return 1;
        }
        InstancedCompoundController.set(newID, InstancedCompoundController.get(oldID));
        InstancedCompoundController.remove(oldID);
        return 0;
    }
}
InstancedCompoundController.initialize();