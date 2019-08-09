class KeyEntity extends ItemEntity {
    constructor(id, name, description, iconID) {
        super(id, name, description, iconID);

        this.itemType = ItemEnum.KEY;

        Game.setKeyEntity(this.id, this);
    }

    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        Game.removeKeyEntity(this.id);
        delete this.itemType;
        super.dispose();
        return undefined;
    }
}