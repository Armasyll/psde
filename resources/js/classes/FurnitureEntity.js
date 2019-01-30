class FurnitureEntity extends EntityWithStorage {
    /**
     * Creats Furniture
     * @param  {String}  _id            Unique ID
     * @param  {String}  _name          Name
     * @param  {String}  _description   Description
     * @param  {Number}  _type          furnitureType
     * @param  {Number}  _seatingSpace  Seating Space
     * @param  {Number}  _storageSpace  Storage Space
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _type = Game.FurnitureEnum.CHAIR) {
        super(_id, _name, _description, _image);

        this.type = 0;
        this.setType(_type);

        Game.furnitureEntities[this.id] = this;
    }

    setType(_type) {
        this.type = Game.filterNumber(_type);
        switch(this.type) {
            case Game.FurnitureEnum.BED: {
                this.addAvailableAction("open");
                this.addAvailableAction("sleep");
                this.addAvailableAction("lay");
                this.addAvailableAction("sit");
                this.setDefaultAction("lay");
                break;
            }
            case Game.FurnitureEnum.CHAIR: {
                this.addAvailableAction("sit");
                this.addAvailableAction("sleep");
                this.setDefaultAction("sit");
                break;
            }
            case Game.FurnitureEnum.LOVESEAT: {
                this.addAvailableAction("open");
                this.addAvailableAction("sleep");
                this.addAvailableAction("lay");
                this.addAvailableAction("sit");
                this.setDefaultAction("sit");
                break;
            }
            case Game.FurnitureEnum.COUCH: {
                this.addAvailableAction("open");
                this.addAvailableAction("sleep");
                this.addAvailableAction("lay");
                this.addAvailableAction("sit");
                this.setDefaultAction("sit");
                break;
            }
            case Game.FurnitureEnum.TABLE: {
                this.addAvailableAction("open");
                this.addAvailableAction("sleep");
                this.addAvailableAction("sit");
                break;
            }
            case Game.FurnitureEnum.DESK: {
                this.addAvailableAction("open");
                this.addAvailableAction("sleep");
                this.addAvailableAction("sit");
                this.setDefaultAction("open");
                break;
            }
            case Game.FurnitureEnum.SHELF: {
                this.addAvailableAction("open");
                this.setDefaultAction("open");
                break;
            }
            case Game.FurnitureEnum.CUPBOARD: {
                this.addAvailableAction("open");
                this.setDefaultAction("open");
                break;
            }
            case Game.FurnitureEnum.CABINET: {
                this.addAvailableAction("open");
                this.setDefaultAction("open");
                break;
            }
            case Game.FurnitureEnum.BUREAU: {
                this.addAvailableAction("open");
                this.setDefaultAction("open");
                break;
            }
            case Game.FurnitureEnum.TELEVISION : {
                this.addAvailableAction("use");
                this.addAvailableAction("look");
                this.setDefaultAction("use");
                break;
            }
            case Game.FurnitureEnum.REFRIGERATOR : {
                this.addAvailableAction("open");
                this.setDefaultAction("open");
                break;
            }
            case Game.FurnitureEnum.OVEN : {
                this.addAvailableAction("use");
                this.addAvailableAction("open");
                this.setDefaultAction("open");
                break;
            }
            case Game.FurnitureEnum.MICROWAVE : {
                this.addAvailableAction("use");
                this.addAvailableAction("open");
                this.setDefaultAction("open");
                break;
            }
            case Game.FurnitureEnum.TOASTER : {
                this.addAvailableAction("use");
                this.addAvailableAction("open");
                this.setDefaultAction("open");
                break;
            }
            case Game.FurnitureEnum.TUB : {
                this.addAvailableAction("use");
                this.addAvailableAction("sleep");
                this.addAvailableAction("lay");
                this.addAvailableAction("sit");
                this.setDefaultAction("use");
                break;
            }
            case Game.FurnitureEnum.SHOWER : {
                this.addAvailableAction("use");
                this.addAvailableAction("sit");
                this.setDefaultAction("use");
                break;
            }
            case Game.FurnitureEnum.SINK : {
                this.addAvailableAction("use");
                this.setDefaultAction("use");
                break;
            }
            case Game.FurnitureEnum.TOILET : {
                this.addAvailableAction("use");
                this.addAvailableAction("sit");
                this.setDefaultAction("use");
                break;
            }
            case Game.FurnitureEnum.MIRROR : {
                this.addAvailableAction("look");
                this.addAvailableAction("use");
                this.setDefaultAction("look");
                break;
            }
            case Game.FurnitureEnum.BASKET : {
                this.addAvailableAction("open");
                this.setDefaultAction("open");
                break;
            }
            default : {
                this.addAvailableAction("look");
                this.setDefaultAction("look");
            }
        }
        return this;
    }
    getType() {
        return this.type;
    }
    dispose() {
        delete Game.furnitureEntities[this.id];
        super.dispose();
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}