/**
 * Door Entity
 */
class DoorEntity extends FurnitureEntity {
    /**
     * Creates a Door Entity
     * @param  {string}  id 
     * @param  {string}  name 
     * @param  {string}  [description] 
     * @param  {string}  [iconID] 
     * @param  {boolean}  [locked] 
     * @param  {AbstractEntity}  [key] 
     * @param  {boolean}  [opensInward] 
     * @param  {boolean}  [open] 
     */
    constructor(id = "", name = "", description = "", iconID = "plainDoorIcon", locked = false, key = null, opensInward = false, open = false) {
        super(id, name, description, iconID);
        this.entityType = EntityEnum.DOOR;
        this.opensInward = false;

        this.addAvailableAction(ActionEnum.CLOSE);
        this.addAvailableAction(ActionEnum.OPEN);
        this.addHiddenAvailableAction(ActionEnum.CLOSE);
        this.setDefaultAction(ActionEnum.OPEN);
        this.setEntityLocked(locked);
        this.setKey(key);
        this.setOpen(open);
        this.setOpensInward(opensInward);

        DoorEntity.set(this.id, this);
    }

    setOpensInward(opensInward = true) {
        this.opensInward = opensInward == true;
    }
    setOpensOutward() {
        this.opensInward = false;
    }
    getOpensInward() {
        return this.opensInward;
    }

    objectifyMinimal() {
        let obj = super.objectifyMinimal();
        obj["key"] = this._objectifyProperty(this.key);
        obj["opensInward"] = this.opensInward;
        return obj;
    }
    /**
     * Overrides DoorEntity.clone
     * @param  {string} id ID
     * @returns {DoorEntity} new DoorEntity
     */
    clone(id = "") {
        let clone = new DoorEntity(id, this.name, this.description, this.icon, this.furnitureType);
        clone.assign(this);
        return clone;
    }
    createInstance(id = "") {
        return new InstancedFurnitureEntity(id, this); // not really a door instance :v
    }
    /**
     * Clones the entity's values over this
     * @param {Entity} entity 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(entity, verify = true) {
        if (verify && !(entity instanceof DoorEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        if (entity.hasOwnProperty("opensInward")) this.setOpensInward(entity.opensInward);
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        DoorEntity.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        DoorEntity.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "DoorEntity";
    }

    static initialize() {
        DoorEntity.doorEntityList = {};
    }
    static get(id) {
        if (DoorEntity.has(id)) {
            return DoorEntity.doorEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return DoorEntity.doorEntityList.hasOwnProperty(id);
    }
    static set(id, doorEntity) {
        DoorEntity.doorEntityList[id] = doorEntity;
        return 0;
    }
    static remove(id) {
        delete DoorEntity.doorEntityList[id];
        return 0;
    }
    static list() {
        return DoorEntity.doorEntityList;
    }
    static clear() {
        for (let i in DoorEntity.doorEntityList) {
            DoorEntity.doorEntityList[i].dispose();
        }
        DoorEntity.doorEntityList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!DoorEntity.has(oldID)) {
            return 1;
        }
        DoorEntity.set(newID, DoorEntity.get(oldID));
        DoorEntity.remove(oldID);
        return 0;
    }
}
DoorEntity.initialize();