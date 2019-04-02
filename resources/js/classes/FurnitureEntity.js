class FurnitureEntity extends EntityWithStorage {
    /**
     * Creats Furniture
     * @param  {String}  _id            Unique ID
     * @param  {String}  _name          Name
     * @param  {String}  _description   Description
     * @param  {String}  _image         Image ID
     * @param  {Number}  _type          furnitureType
     * @param  {Number}  _seatingSpace  Seating Space
     * @param  {Number}  _storageSpace  Storage Space
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _type = FurnitureEnum.CHAIR) {
        super(_id, _name, _description, _image);

        this.entityType = EntityEnum.FURNITURE;
        this.furnitureType = 0;
        this.setFurnitureType(_type);

        Game.setFurnitureEntity(this.id, this);
    }

    setFurnitureType(_type) {
        _type = Game.filterNumber(_type);
        switch(_type) {
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
                _type = FurnitureEnum.NONE;
            }
        }
        this.type = _type;
        return this;
    }
    getFurnitureType() {
        return this.type;
    }

    clone(_id = undefined) {
        _id = Game.filterID(_id);
        if (typeof _id != "string") {
            _id = genUUIDv4();
        }
        return new FurnitureEntity(_id, this.name, this.description, this.image, this.furnitureType);
    }
    createInstance(_id = undefined) {
        _id = Game.filterID(_id);
        if (typeof _id != "string") {
            _id = genUUIDv4();
        }
        return new InstancedFurnitureEntity(_id, this);
    }
    dispose() {
        Game.removeFurnitureEntity(this.id);
        super.dispose();
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}