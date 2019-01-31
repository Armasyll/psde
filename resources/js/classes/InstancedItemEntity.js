class InstancedItemEntity extends InstancedEntity {
    constructor(_id = undefined, _entity = undefined, _owner = undefined) {
        super(_id, _entity);
        if (!(this.entity instanceof Entity)) {
            this.dispose();
            return undefined;
        }

        this.setOwner(_owner);

        Game.setInstancedItemEntity(this.id, this);
    }

    getPrice() {
        return this.entity.getPrice();
    }

    clone(_id) {
        _id = Game.filterID(_id);
        if (typeof _id != "string") {
            _id = genUUIDv4();
        }
        return new InstancedItemEntity(_id, this.entity);
    }
    dispose() {
        Game.removeInstancedItemEntity(this.id);
        super.dispose()
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}