class InstancedClothingEntity extends InstancedEquipmentEntity {
    constructor(id = undefined, clothingEntity = undefined, owner = undefined) {
        super(id, clothingEntity);
        if (!(this.entity instanceof ClothingEntity)) {
            this.dispose();
            return undefined;
        }

        this.setOwner(owner);

        InstancedClothingEntity.set(this.id, this);
    }

    getArmourCategory() {
        return this.entity.getArmourCategory();
    }
    getArmourType() {
        return this.entity.getArmourType();
    }
    getArmourClass() {
        return this.entity.getArmourClass();
    }
    getPortionMultiplier() {
        return this.entity.getPortionMultiplier();
    }

    clone(id) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        return new InstancedClothingEntity(id, this.entity, owner);
    }
    dispose() {
        InstancedClothingEntity.remove(this.id);
        super.dispose();
        return undefined;
    }

    static initialize() {
        InstancedClothingEntity.instancedClothingEntityList = {};
    }
    static get(id) {
        if (InstancedClothingEntity.has(id)) {
            return InstancedClothingEntity.instancedClothingEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return InstancedClothingEntity.instancedClothingEntityList.hasOwnProperty(id);
    }
    static set(id, instancedClothingEntity) {
        InstancedClothingEntity.instancedClothingEntityList[id] = instancedClothingEntity;
        return 0;
    }
    static remove(id) {
        delete InstancedClothingEntity.instancedClothingEntityList[id];
        return 0;
    }
    static list() {
        return InstancedClothingEntity.instancedClothingEntityList;
    }
    static clear() {
        for (let i in InstancedClothingEntity.instancedClothingEntityList) {
            InstancedClothingEntity.instancedClothingEntityList[i].dispose();
        }
        InstancedClothingEntity.instancedClothingEntityList = {};
        return 0;
    }
}
InstancedClothingEntity.initialize();