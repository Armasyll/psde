class InstancedItemEntity extends InstancedEntity {
    constructor(_id = undefined, _entity = undefined) {
        super(_id, _entity);
        if (!(this.entity instanceof Entity)) {
            this.dispose();
            return undefined;
        }

        Game.instancedItemEntities[this.id] = this;
    }
    clone(_id) {
        return new InstancedItemEntity(_id, this.entity, this.name, this.description, this.owner, this.price, this.mass, this.durability, this.durabilityMax);
    }
    dispose() {
        delete Game.instancedItemEntities[this.id];
        super.dispose()
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}