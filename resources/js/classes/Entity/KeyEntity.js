class KeyEntity extends ItemEntity {
    constructor(id, name, description, iconID) {
        super(id, name, description, iconID);

        this.itemType = ItemEnum.KEY;

        KeyEntity.set(this.id, this);
    }

    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        KeyEntity.remove(this.id);
        delete this.itemType;
        super.dispose();
        return undefined;
    }

    static initialize() {
        KeyEntity.keyEntityList = {};
    }
    static get(id) {
        if (KeyEntity.has(id)) {
            return KeyEntity.keyEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return KeyEntity.keyEntityList.hasOwnProperty(id);
    }
    static set(id, keyEntity) {
        KeyEntity.keyEntityList[id] = keyEntity;
        return 0;
    }
    static remove(id) {
        delete KeyEntity.keyEntityList[id];
        return 0;
    }
    static list() {
        return KeyEntity.keyEntityList;
    }
    static clear() {
        for (let i in KeyEntity.keyEntityList) {
            KeyEntity.keyEntityList[i].dispose();
        }
        KeyEntity.keyEntityList = {};
        return 0;
    }
}
KeyEntity.initialize();