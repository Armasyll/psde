class DisplayEntity extends FurnitureEntity {
    constructor(id = undefined, name = undefined, description = undefined, iconID = undefined) {
        super(id, name, description, iconID, FurnitureEnum.TELEVISION);

        DisplayEntity.set(this.id, this);
    }

    /**
     * Overrides FurnitureEntity.clone
     * @param  {string} id ID
     * @return {DisplayEntity} new DisplayEntity
     */
    clone(id = "") {
        return new DisplayEntity(id, this.name, this.description, this.icon, this.displayType);
    }
    createInstance(id = "") {
        return new InstancedDisplayEntity(id, this);
    }
    assign(entity, verify = true) {
        if (verify && !(entity instanceof DisplayEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        DisplayEntity.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "DisplayEntity";
    }

    static initialize() {
        DisplayEntity.displayEntityList = {};
    }
    static get(id) {
        if (DisplayEntity.has(id)) {
            return DisplayEntity.displayEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return DisplayEntity.displayEntityList.hasOwnProperty(id);
    }
    static set(id, displayEntity) {
        DisplayEntity.displayEntityList[id] = displayEntity;
        return 0;
    }
    static remove(id) {
        delete DisplayEntity.displayEntityList[id];
        return 0;
    }
    static list() {
        return DisplayEntity.displayEntityList;
    }
    static clear() {
        for (let i in DisplayEntity.displayEntityList) {
            DisplayEntity.displayEntityList[i].dispose();
        }
        DisplayEntity.displayEntityList = {};
        return 0;
    }
}
DisplayEntity.initialize();