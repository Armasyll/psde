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
        this.maxStackCount = 1;

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

    /**
     * Sets maximum stack count; -1 for infinite
     * @param {number} maxStackCount 
     */
    setMaxStackCount(maxStackCount = 1) {
        if (typeof maxStackCount != "number") {maxStackCount = Number.parseInt(maxStackCount) || 1;}
        else {maxStackCount = maxStackCount|0}
        if (maxStackCount < -1 || maxStackCount == 0) {
            maxStackCount = 1;
        }
        this.maxStackCount = maxStackCount;
        return 0;
    }
    getMaxStackCount() {
        return this.maxStackCount;
    }

    resetModifiers() {
        super.resetModifiers();
    }

    /**
     * Overrides Entity.clone
     * @param  {string} id ID
     * @return {ItemEntity} new ItemEntity
     */
    clone(id = "") {
        let clone = new ItemEntity(id, this.name, this.description, this.icon, this.itemType);
        clone.assign(this);
        return clone;
    }
    createInstance(id = undefined) {
        return new InstancedItemEntity(id, this);
    }
    /**
     * Clones the entity's values over this
     * @param {ItemEntity} entity 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(entity, verify = true) {
        if (verify && !(entity instanceof ItemEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        this.setItemType(entity.itemType);
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
    static toJSON(entity) {
        if (entity instanceof ItemEntity) {}
        else if (ItemEntity.has(entity)) {
            entity = ItemEntity.get(entity);
        }
        else {
            return null;
        }
        let jsonObject = JSON.parse(JSON.stringify(entity));
        return JSON.stringify(jsonObject);
    }
    static fromJSON(json) {
        if (typeof json == "string") {
            console.group(`Running ItemEntity.fromJSON(${json.slice(0,12)}...)`);
            json = JSON.parse(json);
        }
        else {
            console.group("Running ItemEntity.fromJSON(...)");
        }
        if (!(json instanceof Object) || !json.hasOwnProperty("id") || !json.hasOwnProperty("name")) {
            console.warn(`Supplied JSON was not valid.`);
            console.groupEnd();
            return 2;
        }
        console.info("Supplied JSON was valid.");
        let entity = new ItemEntity(json.id, json.name, json.description, json.iconID);
        if (!(entity instanceof ItemEntity)) {
            console.warn(`Could not create a new ItemEntity`);
            console.groupEnd();
            return 1;
        }
        entity.assign(json);
        console.info(`ItemEntity (${entity.getID()}) has been created.`);
        console.groupEnd();
        return entity;
    }
}
ItemEntity.initialize();