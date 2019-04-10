class InstancedFurnitureEntity extends InstancedEntity {
    constructor(_id = undefined, _entity = undefined, _owner = undefined) {
        super(_id, _entity);
        if (!(this.entity instanceof Entity)) {
            this.dispose();
            return undefined;
        }

        this.setOwner(_owner);

        Game.setInstancedFurnitureEntity(this.id, this);
    }

    clone(_id) {
        _id = Tools.filterID(_id);
        if (typeof _id != "string") {
            _id = Tools.genUUIDv4();
        }
        return new InstancedFurnitureEntity(_id, this.entity);
    }
    dispose() {
        Game.removeInstancedFurnitureEntity(this.id);
        super.dispose()
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}