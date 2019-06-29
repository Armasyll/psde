class KeyEntity extends ItemEntity {
    constructor(id, name, description, iconID) {
        super(id, name, description, iconID);

        this.itemType = ItemEnum.KEY;

        Game.setKeyEntity(this.id, this);
    }
    
    dispose() {
        delete Game.keyEntities[this.id];
        super.dispose();
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}