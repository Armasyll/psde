class InstancedItemEntity extends InstancedEntity {
    constructor(_id = undefined, _entity = undefined, _owner = undefined, _price = 0, _mass = 1.0, _durability = 1, _durabilityMax = 1) {
        if (!(_entity instanceof ItemEntity)) {
            if (Game.itemEntities.hasOwnProperty(_entity)) {
                _entity = Game.itemEntities[_entity];
            }
            else if (_entity instanceof ItemInstance && _entity.entity instanceof ItemEntity) {
                _entity = _entity.entity;
            }
            else if (Game.instancedItemEntities.hasOwnProperty(_entity)) {
                _entity = Game.instancedItemEntities[_entity].entity;
                if (!(_entity.entity instanceof ItemEntity)) {
                    return undefined;
                }
            }
            else {
                return undefined;
            }
        }

        super(_id, _entity, _owner, _price, _mass, _durability, _durabilityMax);

        Game.instancedItemEntities[this.id] = this;
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