class InstancedClothingEntity extends InstancedEquipmentEntity {
    constructor(_id = undefined, _entity = undefined, _owner = undefined) {
        super(_id, _entity);
        if (!(this.entity instanceof ClothingEntity)) {
            this.dispose();
            return undefined;
        }

        this.setOwner(_owner);

        Game.setClothingInstance(this.id, this);
    }

    getPhysicalProtection() {
        return this.entity.getPhysicalProtection();
    }
    getMagickProtection() {
        return this.entity.getMagickProtection();
    }

    clone(_id) {
        _id = Tools.filterID(_id);
        if (typeof _id != "string") {
            _id = Tools.genUUIDv4();
        }
        return new InstancedClothingEntity(_id, this.entity);
    }
    dispose() {
        Game.removeClothingInstance(this.id);
        super.dispose()
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}