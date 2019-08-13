class InstancedClothingEntity extends InstancedEquipmentEntity {
    constructor(id = undefined, clothingEntity = undefined, owner = undefined) {
        super(id, clothingEntity);
        if (!(this.entity instanceof ClothingEntity)) {
            this.dispose();
            return undefined;
        }

        this.setOwner(owner);

        Game.setClothingInstance(this.id, this);
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
        Game.removeClothingInstance(this.id);
        super.dispose();
        return undefined;
    }
}