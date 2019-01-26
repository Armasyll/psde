class ClothingEntity extends ItemEntity {
    /**
     * Creats Clothing
     * @param  {String}  _id          Unique ID
     * @param  {String}  _name        Name
     * @param  {String}  _description Description
     * @param  {String}  _image       Image path or base64
     * @param  {String}  _type        clothingType
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _type = "shirt") {
        super(_id, _name, _description, _image);

        this.addAvailableAction("equip");
        this.addAvailableAction("unequip");
        this.setType(_type);

        this.itemType = Game.ITEM_CLOTHING;

        Game.setClothingEntity(this.id, this);
    }
    setType(_type) {
        if (Game.kClothingTypes.has(_type)) {
            this.type = _type;
        }
        else {
            this.type = "shirt";
        }
        return this;
    }
    /**
     * Overrides ItemEntity.createInstance
     * @param  {[type]} _id [description]
     * @return {[type]}     [description]
     */
    createInstance(_id = undefined) {
        _id = Game.filterID(_id);
        if (typeof _id != "string") {
            _id = genUUIDv4();
        }
        return new InstancedClothingEntity(_id, this);
    }
	dispose() {
        Game.removeClothingEntity(this.id);
        super.dispose();
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
	}
}