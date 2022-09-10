/**
 * Furniture Controller
 */
class FurnitureController extends EntityController {
    /**
     * Creates a Furniture Controller
     * @param {string} id 
     * @param {BABYLON.AbstractMesh} aMeshes 
     * @param {object} entityObject 
     */
    constructor(id = "", aMeshes = [], entityObject = {}) {
        super(id, aMeshes, entityObject);
        if (!this.hasMesh()) {
            return undefined;
        }
        this.bHasRunPostConstructFurniture = false;
        FurnitureController.set(this.id, this);
        this.postConstruct();
    }
    postConstruct() {
        if (this.bHasRunPostConstructFurniture) {
            return 0;
        }
        super.postConstruct();
        this.bHasRunPostConstructFurniture = true;
        return 0;
    }

    createCollisionMesh() {
        let collisionMesh = Game.createAreaMesh(
            String(this.id).concat("-collisionMesh"),
            "CUBE",
            this.meshes[0].getBoundingInfo().boundingBox.extendSize.x * 2,
            this.meshes[0].getBoundingInfo().boundingBox.extendSize.y * 2,
            this.meshes[0].getBoundingInfo().boundingBox.extendSize.z * 2,
            this.meshes[0].position,
            this.meshes[0].rotation);
        if (collisionMesh instanceof BABYLON.AbstractMesh) {
            this.collisionMesh = collisionMesh;
            return this.collisionMesh;
        }
        return null;
    }
    createMesh(id = "", stageIndex = this.currentMeshStage, position = this.getPosition(), rotation = this.getRotation(), scaling = this.getScaling()) {
        if (this.meshes[0] instanceof BABYLON.AbstractMesh) {
            return null;
        }
        id = Tools.filterID(id);
        if (typeof id != "string") {
            id = Tools.genUUIDv4();
        }
        return Game.createFurnitureMesh(id, this.meshStages[stageIndex][0], this.materialStages[stageIndex], position, rotation, scaling);
    }

    moveAV() { // animate it :V
        /*var anim = null;
        var dt = Game.engine.getDeltaTime() / 1000;
        anim = this.doIdle(dt);
        this.beginAnimation(anim);*/
        return 0;
    }

    updateID(newID) {
        super.updateID(newID);
        FurnitureController.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        FurnitureController.remove(this.id);
        super.dispose();
        return null;
    }
    getClassName() {
        return "FurnitureController";
    }

    static initialize() {
        FurnitureController.furnitureControllerList = {};
    }
    static get(id) {
        if (FurnitureController.has(id)) {
            return FurnitureController.furnitureControllerList[id];
        }
        return 1;
    }
    static has(id) {
        return FurnitureController.furnitureControllerList.hasOwnProperty(id);
    }
    static set(id, furnitureController) {
        FurnitureController.furnitureControllerList[id] = furnitureController;
        return 0;
    }
    static remove(id) {
        delete FurnitureController.furnitureControllerList[id];
        return 0;
    }
    static list() {
        return FurnitureController.furnitureControllerList;
    }
    static clear() {
        for (let i in FurnitureController.furnitureControllerList) {
            FurnitureController.furnitureControllerList[i].dispose();
        }
        FurnitureController.furnitureControllerList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!FurnitureController.has(oldID)) {
            return 1;
        }
        FurnitureController.set(newID, FurnitureController.get(oldID));
        FurnitureController.remove(oldID);
        return 0;
    }
}
FurnitureController.initialize();