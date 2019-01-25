class FurnitureEntity extends EntityWithStorage {
    /**
     * Creats Furniture
     * @param  {String}  _id            Unique ID
     * @param  {String}  _name          Name
     * @param  {String}  _description   Description
     * @param  {String}  _type          furnitureType
     * @param  {Number}  _seatingSpace  Seating Space
     * @param  {Number}  _storageSpace  Storage Space
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _type = "chair") {
        super(_id, _name, _description, _image);

        this.type = undefined;
        this.setType(_type);

        Game.furnitureEntities[this.id] = this;
    }

    setType(_type) {
        _type = Game.filterID(_type);
        switch(this.type) {
            case "bed" : {
                this.addAvailableAction("open");
                this.addAvailableAction("sleep");
                this.addAvailableAction("lay");
                this.addAvailableAction("sit");
                break;
            }
            case "chair" : {
                this.addAvailableAction("sit");
                this.addAvailableAction("sleep");
                break;
            }
            case "loveseat" : {
                this.addAvailableAction("open");
                this.addAvailableAction("sleep");
                this.addAvailableAction("lay");
                this.addAvailableAction("sit");
                break;
            }
            case "couch" : {
                this.addAvailableAction("open");
                this.addAvailableAction("sleep");
                this.addAvailableAction("lay");
                this.addAvailableAction("sit");
                break;
            }
            case "table" : {
                this.addAvailableAction("open");
                this.addAvailableAction("sleep");
                this.addAvailableAction("sit");
                break;
            }
            case "desk" : {
                this.addAvailableAction("open");
                this.addAvailableAction("sleep");
                this.addAvailableAction("sit");
                break;
            }
            case "shelf" : {
                this.addAvailableAction("open");
                break;
            }
            case "cupboard" : {
                this.addAvailableAction("open");
                break;
            }
            case "cabinet" : {
                this.addAvailableAction("open");
                break;
            }
            case "bureau" : {
                this.addAvailableAction("open");
                break;
            }
            case "tv" : {
                this.addAvailableAction("use");
                this.addAvailableAction("look");
                break;
            }
            case "refrigerator" : {
                this.addAvailableAction("open");
                break;
            }
            case "oven" : {
                this.addAvailableAction("use");
                this.addAvailableAction("open");
                break;
            }
            case "microwave" : {
                this.addAvailableAction("use");
                this.addAvailableAction("open");
                break;
            }
            case "toaster" : {
                this.addAvailableAction("use");
                this.addAvailableAction("open");
                break;
            }
            case "tub" : {
                this.addAvailableAction("use");
                this.addAvailableAction("sleep");
                this.addAvailableAction("lay");
                this.addAvailableAction("sit");
                break;
            }
            case "shower" : {
                this.addAvailableAction("use");
                this.addAvailableAction("sit");
                break;
            }
            case "sink" : {
                this.addAvailableAction("use");
                break;
            }
            case "toilet" : {
                this.addAvailableAction("use");
                this.addAvailableAction("sit");
                break;
            }
            case "mirror" : {
                this.addAvailableAction("look");
                this.addAvailableAction("use");
                break;
            }
            case "basket" : {
                this.addAvailableAction("open");
                break;
            }
            default : {
                
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