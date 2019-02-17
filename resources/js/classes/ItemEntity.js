class ItemEntity extends Entity {
    /**
     * Creates an Item
     * @param  {String}  _id          Unique ID
     * @param  {String}  _name        Name
     * @param  {String}  _description Description
     * @param  {String}  _image       Image path or base64
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = "genericItemIcon") {
        super(_id, _name, _description, _image);

        this.price = 0;
        this.entityType = EntityEnum.ITEM;
        this.itemType = ItemEnum.GENERAL;

        this.addAvailableAction(ActionEnum.DROP);
        this.addAvailableAction(ActionEnum.HOLD);
        this.addAvailableAction(ActionEnum.TAKE);

        Game.setItemEntity(this.id, this);
    }

    /**
     * Sets Price
     * @param {Number} _int Integer
     */
    setPrice(_int) {
        _int = Number.parseInt(_int);
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > Number.MAX_SAFE_INTEGER)
            _int = Number.MAX_SAFE_INTEGER;
        this.price = _int;
        return this;
    }
    getPrice() {
        return this.price;
    }

    clone(_id = undefined) {
        _id = Game.filterID(_id);
        if (typeof _id != "string") {
            _id = genUUIDv4();
        }
        var _itemEntity = new ItemEntity(_id, this.name, this.description, this.image);
        _itemEntity.price = this.price;
        return _itemEntity;
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