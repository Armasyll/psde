class KeyEntity extends ItemEntity {
    constructor(_id, _name, _description, _icon) {
        super(_id, _name, _description, _icon);

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