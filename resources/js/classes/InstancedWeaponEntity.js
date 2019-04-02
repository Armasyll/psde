class InstancedWeaponEntity extends InstancedEquipmentEntity {
    constructor(_id = undefined, _entity = undefined, _owner = undefined) {
        super(_id, _entity);
        if (!(this.entity instanceof WeaponEntity)) {
            this.dispose();
            return undefined;
        }

        this.setOwner(_owner);

        Game.setInstancedWeaponEntity(this.id, this);
    }

    getPhysicalDamage() {
        return this.entity.getPhysicalDamage();
    }
    getMagickDamage() {
        return this.entity.getMagickDamage();
    }

    clone(_id) {
        _id = Game.filterID(_id);
        if (typeof _id != "string") {
            _id = genUUIDv4();
        }
        return new InstancedWeaponEntity(_id, this.entity);
    }
    dispose() {
        Game.removeInstancedWeaponEntity(this.id);
        super.dispose()
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}