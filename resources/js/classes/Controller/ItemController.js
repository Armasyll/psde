/**
 * Item Controller
 */
class ItemController extends EntityController {
    /**
     * Creates an Item Controller
     * @param {string} id 
     * @param {BABYLON.AbstractMesh} mesh 
     * @param {object} entityObject 
     */
    constructor(id = "", mesh = null, entityObject = {}) {
        super(id, mesh, entityObject);
        if (!this.hasMesh()) {
            return undefined;
        }
        this.bHasRunPostConstructItem = false;
        ItemController.set(this.id, this);
        this.postConstruct();
    }
    postConstruct() {
        if (this.bHasRunPostConstructItem) {
            return 0;
        }
        super.postConstruct();
        this.bHasRunPostConstructItem = true;
        this.setDefaultAction(ActionEnum.TAKE);
        return 0;
    }

    createCollisionMesh() {
        this.collisionMesh = Game.createAreaMesh(String(this.id).concat("-collisionMesh"), "CUBE", this.meshes[0].getBoundingInfo().boundingBox.extendSize.x * 2, this.meshes[0].getBoundingInfo().boundingBox.extendSize.y * 2, this.meshes[0].getBoundingInfo().boundingBox.extendSize.z * 2, this.meshes[0].position, this.meshes[0].rotation);
        return this;
    }
    createMesh(id = "", stageIndex = this.currentMeshStage, position = this.getPosition(), rotation = this.getRotation(), scaling = this.getScaling()) {
        if (this.meshes[0] instanceof BABYLON.AbstractMesh) {
            return 1;
        }
        id = Tools.filterID(id);
        if (typeof id != "string") {
            id = Tools.genUUIDv4();
        }
        return Game.createItemMesh(id, this.meshStages[stageIndex], this.materialStages[stageIndex], position, rotation, scaling);
    }

    updateID(newID) {
        super.updateID(newID);
        ItemController.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        ItemController.remove(this.id);
        super.dispose();
        return null;
    }
    getClassName() {
        return "ItemController";
    }

    static initialize() {
        ItemController.itemControllerList = {};
    }
    static get(id) {
        if (ItemController.has(id)) {
            return ItemController.itemControllerList[id];
        }
        return 1;
    }
    static has(id) {
        return ItemController.itemControllerList.hasOwnProperty(id);
    }
    static set(id, itemController) {
        ItemController.itemControllerList[id] = itemController;
        return 0;
    }
    static remove(id) {
        delete ItemController.itemControllerList[id];
        return 0;
    }
    static list() {
        return ItemController.itemControllerList;
    }
    static clear() {
        for (let i in ItemController.itemControllerList) {
            ItemController.itemControllerList[i].dispose();
        }
        ItemController.itemControllerList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!ItemController.has(oldID)) {
            return 1;
        }
        ItemController.set(newID, ItemController.get(oldID));
        ItemController.remove(oldID);
        return 0;
    }
}
ItemController.initialize();