class InstancedEquipmentEntity extends InstancedItemEntity {
    constructor(_id = undefined, _entity = undefined, _owner = undefined) {
        super(_id, _entity);
        if (!(this.entity instanceof EquipmentEntity)) {
            this.dispose();
            return undefined;
        }

        this.setOwner(_owner);
    }

    getEquipmentSlot() {
        return this.entity.getEquipmentSlot();
    }

    clone(_id) {
        _id = Tools.filterID(_id);
        if (typeof _id != "string") {
            _id = Tools.genUUIDv4();
        }
        return new InstancedEquipmentEntity(_id, this.entity, this.owner);
    }
    dispose() {
        super.dispose()
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}