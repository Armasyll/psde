class KeyEntity extends ItemEntity {
    constructor(_id, _name, _description, _image) {
        super(_id, _name, _description, _image);

        this.itemType = Game.ItemEnum.KEY;

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