class ItemEntity extends Entity {
    /**
     * Creates an Item
     * @param  {String}  _id          Unique ID
     * @param  {String}  _name        Name
     * @param  {String}  _description Description
     * @param  {String}  _image       Image path or base64
     */
	constructor(_id = undefined, _name = undefined, _description = undefined, _image = "genericItem") {
        super(_id, _name, _description, _image);

        this.addAvailableAction("drop");
        this.addAvailableAction("hold");
        this.addAvailableAction("take");

        this.mass = 0.001;
        this.price = 0;

        this.itemType = Game.ItemEnum.GENERAL;

        Game.setItemEntity(this.id, this);
	}
	setPrice(_int) {
		if (isNaN(_int)) {
			return;
		}
		this.price = _int;
	}
	getPrice() {
		return this.price;
	}
    createInstance(_id = undefined) {
        _id = Game.filterID(_id);
        if (typeof _id != "string") {
            _id = genUUIDv4();
        }
        return new InstancedItemEntity(_id, this);
    }
	dispose() {
        Game.removeItemEntity(this.id);
        super.dispose();
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
	}
}