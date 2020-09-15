/**
 * Furniture Entity
 */
class FurnitureEntity extends Entity {
    /**
     * Creates a Furniture Entity
     * @param  {string}  id Unique ID
     * @param  {string}  name Name
     * @param  {string}  description Description
     * @param  {string}  iconID Image ID
     * @param  {FurnitureEnum}  furnitureType furnitureType
     */
    constructor(id = "", name = "", description = "", iconID = "", furnitureType = FurnitureEnum.CHAIR) {
        super(id, name, description, iconID);

        this.entityType = EntityEnum.FURNITURE;
        this.furnitureType = FurnitureEnum.NONE;
        this.entityLocked = false;
        this.key = null;
        this.open = false;
        this.availableSeats = 0;

        this.setFurnitureType(furnitureType);

        FurnitureEntity.set(this.id, this);
    }

    setFurnitureType(furnitureType) {
        if (!FurnitureEnum.properties.hasOwnProperty(furnitureType)) {
            furnitureType = FurnitureEnum.NONE;
        }
        switch(furnitureType) {
            case FurnitureEnum.BED: {
                this.addAvailableAction(ActionEnum.SLEEP);
                this.addAvailableAction(ActionEnum.LAY);
                this.addAvailableAction(ActionEnum.SIT);
                this.setDefaultAction(ActionEnum.LAY);
                break;
            }
            case FurnitureEnum.CHAIR: {
                this.addAvailableAction(ActionEnum.SIT);
                this.addAvailableAction(ActionEnum.SLEEP);
                this.setDefaultAction(ActionEnum.SIT);
                break;
            }
            case FurnitureEnum.LOVESEAT: {
                this.addAvailableAction(ActionEnum.SLEEP);
                this.addAvailableAction(ActionEnum.LAY);
                this.addAvailableAction(ActionEnum.SIT);
                this.setDefaultAction(ActionEnum.SIT);
                break;
            }
            case FurnitureEnum.COUCH: {
                this.addAvailableAction(ActionEnum.SLEEP);
                this.addAvailableAction(ActionEnum.LAY);
                this.addAvailableAction(ActionEnum.SIT);
                this.setDefaultAction(ActionEnum.SIT);
                break;
            }
            case FurnitureEnum.TABLE: {
                break;
            }
            case FurnitureEnum.DESK: {
                this.addAvailableAction(ActionEnum.OPEN);
                this.addAvailableAction(ActionEnum.CLOSE);
                this.setDefaultAction(ActionEnum.OPEN);
                break;
            }
            case FurnitureEnum.SHELF: {
                this.addAvailableAction(ActionEnum.OPEN);
                this.addAvailableAction(ActionEnum.CLOSE);
                this.setDefaultAction(ActionEnum.OPEN);
                break;
            }
            case FurnitureEnum.CUPBOARD: {
                this.addAvailableAction(ActionEnum.OPEN);
                this.addAvailableAction(ActionEnum.CLOSE);
                this.setDefaultAction(ActionEnum.OPEN);
                break;
            }
            case FurnitureEnum.CABINET: {
                this.addAvailableAction(ActionEnum.OPEN);
                this.addAvailableAction(ActionEnum.CLOSE);
                this.setDefaultAction(ActionEnum.OPEN);
                break;
            }
            case FurnitureEnum.BUREAU: {
                this.addAvailableAction(ActionEnum.OPEN);
                this.addAvailableAction(ActionEnum.CLOSE);
                this.setDefaultAction(ActionEnum.OPEN);
                break;
            }
            case FurnitureEnum.TELEVISION : {
                this.addAvailableAction(ActionEnum.USE);
                this.addAvailableAction(ActionEnum.LOOK);
                this.setDefaultAction(ActionEnum.USE);
                break;
            }
            case FurnitureEnum.REFRIGERATOR : {
                this.addAvailableAction(ActionEnum.OPEN);
                this.addAvailableAction(ActionEnum.CLOSE);
                this.setDefaultAction(ActionEnum.OPEN);
                break;
            }
            case FurnitureEnum.OVEN : {
                this.addAvailableAction(ActionEnum.USE);
                this.addAvailableAction(ActionEnum.OPEN);
                this.addAvailableAction(ActionEnum.CLOSE);
                this.setDefaultAction(ActionEnum.OPEN);
                break;
            }
            case FurnitureEnum.MICROWAVE : {
                this.addAvailableAction(ActionEnum.USE);
                this.addAvailableAction(ActionEnum.OPEN);
                this.addAvailableAction(ActionEnum.CLOSE);
                this.setDefaultAction(ActionEnum.OPEN);
                break;
            }
            case FurnitureEnum.TOASTER : {
                this.addAvailableAction(ActionEnum.USE);
                this.addAvailableAction(ActionEnum.OPEN);
                this.addAvailableAction(ActionEnum.CLOSE);
                this.setDefaultAction(ActionEnum.OPEN);
                break;
            }
            case FurnitureEnum.TUB : {
                this.addAvailableAction(ActionEnum.USE);
                this.addAvailableAction(ActionEnum.SLEEP);
                this.addAvailableAction(ActionEnum.LAY);
                this.addAvailableAction(ActionEnum.SIT);
                this.setDefaultAction(ActionEnum.USE);
                break;
            }
            case FurnitureEnum.SHOWER : {
                this.addAvailableAction(ActionEnum.USE);
                this.addAvailableAction(ActionEnum.SIT);
                this.setDefaultAction(ActionEnum.USE);
                break;
            }
            case FurnitureEnum.SINK : {
                this.addAvailableAction(ActionEnum.USE);
                this.setDefaultAction(ActionEnum.USE);
                break;
            }
            case FurnitureEnum.TOILET : {
                this.addAvailableAction(ActionEnum.USE);
                this.addAvailableAction(ActionEnum.SIT);
                this.addAvailableAction(ActionEnum.OPEN);
                this.addAvailableAction(ActionEnum.CLOSE);
                this.setDefaultAction(ActionEnum.OPEN);
                break;
            }
            case FurnitureEnum.MIRROR : {
                this.addAvailableAction(ActionEnum.LOOK);
                this.addAvailableAction(ActionEnum.USE);
                this.setDefaultAction(ActionEnum.LOOK);
                break;
            }
            case FurnitureEnum.BASKET : {
                this.addAvailableAction(ActionEnum.OPEN);
                this.setDefaultAction(ActionEnum.OPEN);
                break;
            }
            case FurnitureEnum.LAMP : {
                this.addAvailableAction(ActionEnum.USE);
                this.setDefaultAction(ActionEnum.USE);
                break;
            }
            default : {
                furnitureType = FurnitureEnum.NONE;
            }
        }
        this.furnitureType = furnitureType;
        return 0;
    }
    getFurnitureType() {
        return this.furnitureType;
    }
    setAvailableSeats(availableSeats) {
        this.availableSeats = Number.parseInt(availableSeats) || 0;
        return 0;
    }
    getAvailableSeats() {
        return this.availableSeats;
    }
    /**
     * Entity lock, not to be confused with the functionality lock.
     * @param {boolean} entityLocked 
     */
    setEntityLocked(entityLocked) {
        this.entityLocked = entityLocked == true;
    }
    isEntityLocked() {
        return this.entityLocked;
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
    setOpen(open = true) {
        this.open = open == true;
        if (this.open) {
            this.removeHiddenAvailableAction(ActionEnum.CLOSE);
            this.setDefaultAction(ActionEnum.CLOSE);
            this.addHiddenAvailableAction(ActionEnum.OPEN);
        }
        else {
            this.removeHiddenAvailableAction(ActionEnum.OPEN);
            this.setDefaultAction(ActionEnum.OPEN);
            this.addHiddenAvailableAction(ActionEnum.CLOSE);
        }
    }
    setClose() {
        this.open = false;
        this.setDefaultAction(ActionEnum.OPEN);
        this.addHiddenAvailableAction(ActionEnum.CLOSE);
    }
    getOpen() {
        return this.open;
    }

    objectifyMinimal() {
        let obj = super.objectifyMinimal();
        obj["entityLocked"] = this.entityLocked;
        obj["key"] = this.key;
        obj["open"] = this.open;
        return obj;
    }
    /**
     * Overrides Entity.clone
     * @param  {string} id ID
     * @returns {FurnitureEntity} new FurnitureEntity
     */
    clone(id = "") {
        let clone = new FurnitureEntity(id, this.name, this.description, this.icon, this.furnitureType);
        if (this.hasContainer()) {
            clone.setContainer(this.container.clone(String(clone.id).concat("Container")));
        }
        clone.assign(this);
        return clone;
    }
    createInstance(id = "") {
        return new InstancedFurnitureEntity(id, this);
    }
    /**
     * Clones the entity's values over this
     * @param {Entity} entity 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(entity, verify = true) {
        if (verify && !(entity instanceof FurnitureEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        if (entity.hasOwnProperty("availableSeats")) this.availableSeats = entity.availableSeats;
        if (entity.hasOwnProperty("entityLocked")) this.setEntityLocked(entity.entityLocked);
        if (entity.hasOwnProperty("furnitureType")) this.setFurnitureType(entity.furnitureType);
        if (entity.hasOwnProperty("key")) this.setKey(entity.key);
        if (entity.hasOwnProperty("open")) this.setOpen(entity.open);
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        FurnitureEntity.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        FurnitureEntity.remove(this.id);
        delete this.furnitureType;
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "FurnitureEntity";
    }

    static initialize() {
        FurnitureEntity.furnitureEntityList = {};
    }
    static get(id) {
        if (FurnitureEntity.has(id)) {
            return FurnitureEntity.furnitureEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return FurnitureEntity.furnitureEntityList.hasOwnProperty(id);
    }
    static set(id, furnitureEntity) {
        FurnitureEntity.furnitureEntityList[id] = furnitureEntity;
        return 0;
    }
    static remove(id) {
        delete FurnitureEntity.furnitureEntityList[id];
        return 0;
    }
    static list() {
        return FurnitureEntity.furnitureEntityList;
    }
    static clear() {
        for (let i in FurnitureEntity.furnitureEntityList) {
            FurnitureEntity.furnitureEntityList[i].dispose();
        }
        FurnitureEntity.furnitureEntityList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!FurnitureEntity.has(oldID)) {
            return 1;
        }
        FurnitureEntity.set(newID, FurnitureEntity.get(oldID));
        FurnitureEntity.remove(oldID);
        return 0;
    }
}
FurnitureEntity.initialize();