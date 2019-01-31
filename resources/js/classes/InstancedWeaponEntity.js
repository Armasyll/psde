class InstancedWeaponEntity extends InstancedItemEntity {
    constructor(_id = undefined, _entity = undefined) {
        super(_id, _entity);
        if (!(this.entity instanceof WeaponEntity)) {
            this.dispose();
            return undefined;
        }

        Game.setInstancedWeaponEntity(this.id, this);
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