class FurnitureEntity extends EntityWithStorage {
    /**
     * Creats Furniture
     * @param  {string}  id            Unique ID
     * @param  {string}  name          Name
     * @param  {string}  description   Description
     * @param  {string}  iconID         Image ID
     * @param  {FurnitureEnum}  furnitureType          furnitureType
     */
    constructor(id = undefined, name = undefined, description = undefined, iconID = undefined, furnitureType = FurnitureEnum.CHAIR) {
        super(id, name, description, iconID);

        this.entityType = EntityEnum.FURNITURE;
        this.furnitureType = FurnitureEnum.NONE;

        this.setFurnitureType(furnitureType);

        Game.setFurnitureEntity(this.id, this);
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
        this.type = furnitureType;
        return this;
    }
    getFurnitureType() {
        return this.type;
    }

    clone(id = undefined) {
        id = Tools.filterID(id);
        if (typeof id != "string") {
            id = Tools.genUUIDv4();
        }
        return new FurnitureEntity(id, this.name, this.description, this.icon, this.furnitureType);
    }
    createInstance(id = undefined) {
        id = Tools.filterID(id);
        if (typeof id != "string") {
            id = Tools.genUUIDv4();
        }
        return new InstancedFurnitureEntity(id, this);
    }
    dispose() { // TODO: what about the instances :v
        Game.removeFurnitureEntity(this.id);
        super.dispose();
        return undefined;
    }
}