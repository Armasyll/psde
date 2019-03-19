class ItemEntity extends Entity {
    /**
     * Creates an Item
     * @param  {String}  _id          Unique ID
     * @param  {String}  _name        Name
     * @param  {String}  _description Description
     * @param  {String}  _image       Image ID
     * @param  {ItemEnum} _itemType   ItemEnum
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = "genericItemIcon", _itemType = ItemEnum.GENERAL) {
        super(_id, _name, _description, _image, EntityEnum.ITEM);

        this.itemType = _itemType;

        this.addAvailableAction(ActionEnum.DROP);
        this.addAvailableAction(ActionEnum.HOLD);
        this.addAvailableAction(ActionEnum.TAKE);

        Game.setItemEntity(this.id, this);
    }

    clone(_id = undefined) {
        _id = Game.filterID(_id);
        if (typeof _id != "string") {
            _id = genUUIDv4();
        }
        var _itemEntity = new ItemEntity(_id, this.name, this.description, this.image, this.itemType);
        // variables from AbstractEntity
        _itemEntity.availableActions = Object.assign({}, this.availableActions);
        _itemEntity.hiddenAvailableActions = Object.assign({}, this.hiddenAvailableActions);
        _itemEntity.specialProperties = new Set(this.specialProperties);
        _itemEntity.defaultAction = this.defaultAction;
        // variables from Entity
        _itemEntity.mass.copyFrom(this.mass);
        _itemEntity.price.copyFrom(this.price);
        _itemEntity.durability.copyFrom(this.durability);
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