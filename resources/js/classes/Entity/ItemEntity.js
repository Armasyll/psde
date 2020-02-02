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

        ItemEntity.set(this.id, this);
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

    resetModifiers() {
        super.resetModifiers();
    }

    /**
     * Overrides Entity.clone
     * @param  {string} id          ID
     * @return {ItemEntity}         new ItemEntity
     */
    clone(id = "") {
        let clone = new ItemEntity(id, this.name, this.description, this.icon, this.itemType);
        // variables from AbstractEntity
        clone.availableActions = Object.assign({}, this.availableActions);
        clone.hiddenAvailableActions = Object.assign({}, this.hiddenAvailableActions);
        clone.specialProperties = new Set(this.specialProperties);
        clone.defaultAction = this.defaultAction;
        clone.health = this.health;
        clone.healthModifier = this.healthModifier;
        clone.maxHealth = this.maxHealth;
        clone.maxHealthModifier = this.maxHealthModifier;
        for (effect in this.effects) {
            clone.addEffect(effect);
        }
        // variables from Entity
        clone.weight = this.weight;
        clone.price = this.price;
        // variables from ItemEntity
        clone.setItemType(this.itemType);
        return clone;
    }
    createInstance(id = undefined) {
        let instance = new InstancedItemEntity(id, this);
        this.instances[instance.getID()] = instance;
        return instance;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        ItemEntity.remove(this.id);
        super.dispose();
        return undefined;
    }

    static initialize() {
        ItemEntity.itemEntityList = {};
    }
    static get(id) {
        if (ItemEntity.has(id)) {
            return ItemEntity.itemEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return ItemEntity.itemEntityList.hasOwnProperty(id);
    }
    static set(id, itemEntity) {
        ItemEntity.itemEntityList[id] = itemEntity;
        return 0;
    }
    static remove(id) {
        delete ItemEntity.itemEntityList[id];
        return 0;
    }
    static list() {
        return ItemEntity.itemEntityList;
    }
    static clear() {
        for (let i in ItemEntity.itemEntityList) {
            ItemEntity.itemEntityList[i].dispose();
        }
        ItemEntity.itemEntityList = {};
        return 0;
    }
}
ItemEntity.initialize();