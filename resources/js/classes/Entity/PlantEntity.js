/**
 * PlantEntity
 */
class PlantEntity extends Entity {
    /**
     * Creates an Entity
     * @param  {string} id Unique ID
     * @param  {string} name Name
     * @param  {string} description Description
     * @param  {string} iconID Icon ID
     */
    constructor(id, name, description, iconID) {
        super(id, name, description, iconID);
        this.entityType = EntityEnum.PLANT;

        PlantEntity.set(this.id, this);
    }

    /**
     * Overrides Entity.clone
     * @param  {string} id ID
     * @return {PlantEntity} new PlantEntity
     */
    clone(id = undefined) {
        let clone = new PlantEntity(id, this.name, this.description, this.icon);
        clone.assign(this);
        return clone;
    }
    createInstance(id = "") {
        return new InstancedPlantEntity(id, this);
    }
    addInstance(instancedEntity) {
        if (!(instancedEntity instanceof InstancedPlantEntity)) {
            if (InstancedPlantEntity.has(instancedEntity)) {
                instancedEntity = InstancedPlantEntity.get(instancedEntity);
            }
            else {
                return 1;
            }
        }
        this.instances[instancedEntity.getID()] = instancedEntity;
        return 0;
    }
    removeInstance(instancedEntity) {
        if (!(instancedEntity instanceof InstancedPlantEntity)) {
            if (InstancedPlantEntity.has(instancedEntity)) {
                instancedEntity = InstancedPlantEntity.get(instancedEntity);
            }
            else {
                return 1;
            }
        }
        delete this.instances[instancedEntity.getID()];
        return 0;
    }
    getInstances() {
        return this.instances;
    }
    /**
     * Clones the entity's values over this
     * @param {Entity} entity 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(entity, verify = true) {
        if (verify && !(entity instanceof PlantEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        PlantEntity.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "PlantEntity";
    }

    static initialize() {
        PlantEntity.plantEntityList = {};
    }
    static get(id) {
        if (PlantEntity.has(id)) {
            return PlantEntity.plantEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return PlantEntity.plantEntityList.hasOwnProperty(id);
    }
    static set(id, entity) {
        PlantEntity.plantEntityList[id] = entity;
        return 0;
    }
    static remove(id) {
        delete PlantEntity.plantEntityList[id];
        return 0;
    }
    static list() {
        return PlantEntity.plantEntityList;
    }
    static clear() {
        for (let i in PlantEntity.plantEntityList) {
            PlantEntity.plantEntityList[i].dispose();
        }
        PlantEntity.plantEntityList = {};
        return 0;
    }
}
PlantEntity.initialize();