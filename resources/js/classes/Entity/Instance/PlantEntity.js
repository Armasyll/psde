class InstancedPlantEntity extends InstancedEntity {
    constructor(id = undefined, entity = undefined) {
        super(id, entity);
        if (!(this.entity instanceof Entity)) {
            this.dispose();
            return undefined;
        }

        InstancedPlantEntity.set(this.id, this);
    }

    getPlantType() {
        return this.entity.getPlantType();
    }

    /**
     * Overrides InstancedEntity.clone
     * @param  {string} id ID
     * @return {InstancedPlantEntity} new InstancedPlantEntity
     */
    clone(id = "") {
        let clone = new InstancedPlantEntity(id, this.entity, this.owner);
        return clone;
    }
    assign(entity) {
        if (verify && !(entity instanceof InstancedPlantEntity)) {
            return 2;
        }
        super.assign(entity);
        return 0;
    }
    dispose() {
        InstancedPlantEntity.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "InstancedPlantEntity";
    }

    static initialize() {
        InstancedPlantEntity.instancedPlantEntityList = {};
    }
    static get(id) {
        if (InstancedPlantEntity.has(id)) {
            return InstancedPlantEntity.instancedPlantEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return InstancedPlantEntity.instancedPlantEntityList.hasOwnProperty(id);
    }
    static set(id, instancedPlantEntity) {
        InstancedPlantEntity.instancedPlantEntityList[id] = instancedPlantEntity;
        return 0;
    }
    static remove(id) {
        delete InstancedPlantEntity.instancedPlantEntityList[id];
        return 0;
    }
    static list() {
        return InstancedPlantEntity.instancedPlantEntityList;
    }
    static clear() {
        for (let i in InstancedPlantEntity.instancedPlantEntityList) {
            InstancedPlantEntity.instancedPlantEntityList[i].dispose();
        }
        InstancedPlantEntity.instancedPlantEntityList = {};
        return 0;
    }
}
InstancedPlantEntity.initialize();