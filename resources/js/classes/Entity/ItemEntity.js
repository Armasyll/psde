class ItemEntity extends Entity {
    /**
     * Creates an Item
     * @param  {string}  id          Unique ID
     * @param  {string}  name        Name
     * @param  {string}  description Description
     * @param  {string}  iconID       Image ID
     * @param  {ItemEnum} itemType   ItemEnum
     */
    constructor(id = undefined, name = undefined, description = undefined, iconID = "genericItemIcon", itemType = ItemEnum.GENERAL) {
        super(id, name, description, iconID, EntityEnum.ITEM);

        this.itemType = ItemEnum.GENERAL;

        this.addAvailableAction(ActionEnum.DROP);
        this.addAvailableAction(ActionEnum.HOLD);
        this.addAvailableAction(ActionEnum.TAKE);
        this.setItemType(itemType);

        Game.setItemEntity(this.id, this);
    }

    setItemType(itemType) {
        if (!ItemEnum.properties.hasOwnProperty(itemType)) {
            itemType = ItemEnum.GENERAL;
        }
        this.itemType = itemType;
        return this;
    }
    getItemType() {
        return this.itemType;
    }

    clone(id = undefined) {
        id = Tools.filterID(id);
        if (typeof id != "string") {
            id = Tools.genUUIDv4();
        }
        let itemEntity = new ItemEntity(id, this.name, this.description, this.icon, this.itemType);
        // variables from AbstractEntity
        itemEntity.availableActions = Object.assign({}, this.availableActions);
        itemEntity.hiddenAvailableActions = Object.assign({}, this.hiddenAvailableActions);
        itemEntity.specialProperties = new Set(this.specialProperties);
        itemEntity.defaultAction = this.defaultAction;
        // variables from Entity
        itemEntity.weight.copyFrom(this.weight);
        itemEntity.price.copyFrom(this.price);
        itemEntity.health.copyFrom(this.health);
        return itemEntity;
    }
    createInstance(id = undefined) {
        id = Tools.filterID(id);
        if (typeof id != "string") {
            id = Tools.genUUIDv4();
        }
        return new InstancedItemEntity(id, this);
    }
    dispose() { // TODO: what about the instances :v
        Game.removeItemEntity(this.id);
        super.dispose();
        return undefined;
	}
}