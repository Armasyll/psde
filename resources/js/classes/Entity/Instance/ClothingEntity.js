/**
 * Instanced Clothing Entity
 */
class InstancedClothingEntity extends InstancedEquipmentEntity {
    /**
     * Creates an Instanced Clothing Entity
     * @param {string} id 
     * @param {ClothingEntity} entity 
     * @param {(CreatureEntity|null)} [owner] 
     */
    constructor(id = "", entity = null, owner = null) {
        super(id, entity, owner);
        if (!(this.entity instanceof ClothingEntity)) {
            this.dispose();
            return null;
        }

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

    /**
     * Overrides InstancedEquipmentEntity.clone
     * @param  {string} id ID
     * @return {InstancedClothingEntity} new InstancedClothingEntity
     */
    clone(id = "") {
        if (!this.hasEntity()) {
            return 2;
        }
        let clone = new InstancedClothingEntity(id, this.entity, this.owner);
        clone.assign(this);
        return clone;
    }
    assign(entity, verify = true) {
        if (verify && !(entity instanceof InstancedClothingEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        InstancedClothingEntity.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        InstancedClothingEntity.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "InstancedClothingEntity";
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
    static updateID(oldID, newID) {
        if (!InstancedClothingEntity.has(oldID)) {
            return 1;
        }
        InstancedClothingEntity.set(newID, InstancedClothingEntity.get(oldID));
        InstancedClothingEntity.remove(oldID);
        return 0;
    }
}
InstancedClothingEntity.initialize();