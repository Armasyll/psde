class PlantController extends EntityController {
    constructor(id, mesh, entity) {
        super(id, mesh, entity);

        PlantController.set(this.id, this);
    }

    createCollisionMesh() {
        this.collisionMesh = Game.createAreaMesh(String(this.id).concat("-collisionMesh"), "CUBE", this.mesh.getBoundingInfo().boundingBox.extendSize.x * 2, this.mesh.getBoundingInfo().boundingBox.extendSize.y * 2, this.mesh.getBoundingInfo().boundingBox.extendSize.z * 2, this.mesh.position, this.mesh.rotation);
        return this;
    }
    createMesh(id = "", stageIndex = this.currentMeshStage, position = this.getPosition(), rotation = this.getRotation(), scaling = this.getScaling()) {
        if (this.mesh instanceof BABYLON.AbstractMesh) {
            return 1;
        }
        id = Tools.filterID(id);
        if (typeof id != "string") {
            id = Tools.genUUIDv4();
        }
        return Game.createPlantMesh(id, this.meshStages[stageIndex], this.materialStages[stageIndex], position, rotation, scaling);
    }

    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        PlantController.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "PlantController";
    }

    static initialize() {
        PlantController.plantControllerList = {};
    }
    static get(id) {
        if (PlantController.has(id)) {
            return PlantController.plantControllerList[id];
        }
        return 1;
    }
    static has(id) {
        return PlantController.plantControllerList.hasOwnProperty(id);
    }
    static set(id, plantController) {
        PlantController.plantControllerList[id] = plantController;
        return 0;
    }
    static remove(id) {
        delete PlantController.plantControllerList[id];
        return 0;
    }
    static list() {
        return PlantController.plantControllerList;
    }
    static clear() {
        for (let i in PlantController.plantControllerList) {
            PlantController.plantControllerList[i].dispose();
        }
        PlantController.plantControllerList = {};
        return 0;
    }
}
PlantController.initialize();