/**
 * Display Entity
 */
class DisplayEntity extends FurnitureEntity {
    /**
     * Creates a Display Entity
     * @param  {string}  id 
     * @param  {string}  name 
     * @param  {string}  [description] 
     * @param  {string}  [iconID] 
     */
    constructor(id = "", name = "", description = "", iconID = "") {
        super(id, name, description, iconID, FurnitureEnum.TELEVISION);
        
        this.videoID = "missingVideo";

        DisplayEntity.set(this.id, this);
    }

    setVideo(videoID) {
        this.videoID = Tools.filterID(videoID);
        return 0;
    }
    getVideo() {
        return this.videoID;
    }

    /**
     * Overrides FurnitureEntity.clone
     * @param  {string} id ID
     * @returns {DisplayEntity} new DisplayEntity
     */
    clone(id = "") {
        let clone = new DisplayEntity(id, this.name, this.description, this.icon, this.displayType);
        clone.assign(this);
        return clone;
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
    updateID(newID) {
        super.updateID(newID);
        DisplayEntity.updateID(this.id, newID);
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
    static updateID(oldID, newID) {
        if (!DisplayEntity.has(oldID)) {
            return 1;
        }
        DisplayEntity.set(newID, DisplayEntity.get(oldID));
        DisplayEntity.remove(oldID);
        return 0;
    }
}
DisplayEntity.initialize();