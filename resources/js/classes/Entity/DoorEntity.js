/**
 * Door Entity
 */
class DoorEntity extends Entity {
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
        this.teleportMarker = null;
        this.locked = false;
        this.key = null;
        this.open = false;

        this.addAvailableAction(ActionEnum.CLOSE);
        this.addAvailableAction(ActionEnum.OPEN);
        this.addHiddenAvailableAction(ActionEnum.CLOSE);
        this.setDefaultAction(ActionEnum.OPEN);
        this.setEntityLocked(locked);
        this.setKey(key);
        if (open === true) {
            this.setOpen();
        }
        else {
            this.setClose();
        }
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
    hasTeleportMarker() {
        return this.teleportMarker instanceof TeleportMarker;
    }
    setTeleportMarker(teleportMarker) {
        this.teleportMarker = Tools.filterClass(teleportMarker, TeleportMarker, null);
        return 0;
    }
    getTeleportMarker() {
        return this.teleportMarker;
    }
    /**
     * Entity lock, not to be confused with the functionality lock.
     * @param {boolean} locked 
     */
    setEntityLocked(locked) {
        this.locked = locked == true;
    }
    isEntityLocked() {
        return this.locked;
    }
    setKey(itemEntity) {
        if (!(itemEntity instanceof ItemEntity)) {
            if (ItemEntity.has(itemEntity)) {
                itemEntity = ItemEntity.get(itemEntity);
            }
            else {
                return 2;
            }
        }
        this.key = itemEntity;
        return 0;
    }
    getKey() {
        return this.key;
    }
    setOpen() {
        this.open = true;
        this.removeHiddenAvailableAction(ActionEnum.CLOSE);
        this.setDefaultAction(ActionEnum.CLOSE);
        this.addHiddenAvailableAction(ActionEnum.OPEN);
    }
    setClose() {
        this.open = false;
        this.setDefaultAction(ActionEnum.OPEN);
        this.removeHiddenAvailableAction(ActionEnum.OPEN);
        this.addHiddenAvailableAction(ActionEnum.CLOSE);
    }
    getOpen() {
        return this.open;
    }

    objectifyMinimal() {
        let obj = super.objectifyMinimal();
        obj["key"] = AbstractEntity.objectifyProperty(this.key);
        obj["opensInward"] = this.opensInward;
        obj["teleportMarker"] = this.teleportMarker;
        obj["entityLocked"] = this.locked;
        obj["key"] = this.key;
        obj["open"] = this.open;
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
        return this.clone(id);
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
        if (entity.hasOwnProperty("open")) {
            if (entity.open === true) {
                this.setOpen();
            }
            else {
                this.setClose();
            }
        }
        if (entity.hasOwnProperty("opensInward")) this.setOpensInward(entity.opensInward);
        if (entity.hasOwnProperty("teleportMarker")) this.setTeleportMarker(entity.teleportMarker);
        if (entity.hasOwnProperty("locked")) this.setEntityLocked(entity.locked);
        if (entity.hasOwnProperty("key")) this.setKey(entity.key);
        if (entity.hasOwnProperty("open") && entity.open == true) {
            this.setOpen();
        }
        else {
            this.setClose();
        }
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