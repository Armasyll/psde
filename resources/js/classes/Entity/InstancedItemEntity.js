class InstancedItemEntity extends InstancedEntity {
    constructor(id = undefined, itemEntity = undefined, owner = undefined) {
        super(id, itemEntity);
        if (!(this.entity instanceof Entity)) {
            this.dispose();
            return undefined;
        }

        this.setOwner(owner);

        Game.setItemInstance(this.id, this);
    }

    getItemType() {
        return this.entity.getItemType();
    }

    clone(id = "") {
        return new InstancedItemEntity(id, this.entity, this.owner);
    }
    dispose() {
        Game.removeItemInstance(this.id);
        super.dispose()
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}