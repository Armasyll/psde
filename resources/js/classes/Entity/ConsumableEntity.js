/**
 * Consumable Entity
 */
class ConsumableEntity extends ItemEntity {
    /**
     * Creates a Consumable Entity
     * @param  {string}  id Unique ID
     * @param  {string}  name Name
     * @param  {string}  [description] Description
     * @param  {string}  [iconID] Image ID
     * @param  {ConsumableEnum}  consumableType ConsumableEnum
     */
    constructor(id = "", name = "", description = "", iconID = "genericItemIcon", consumableType = ConsumableEnum.FOOD) {
        super(id, name, description, iconID, ItemEnum.CONSUMABLE);
        this.holdable = true;

        this.consumableType = ConsumableEnum.FOOD;

        this.addAvailableAction(ActionEnum.CONSUME);
        this.setConsumableType(consumableType);

        ConsumableEntity.set(this.id, this);
    }

    setConsumableType(consumableType) {
        if (!ConsumableEnum.properties.hasOwnProperty(consumableType)) {
            consumableType = ConsumableEnum.FOOD;
        }
        this.consumableType = consumableType;
        return this;
    }
    getConsumableType() {
        return this.consumableType;
    }

    resetModifiers() {
        super.resetModifiers();
    }

    /**
     * Overrides Entity.clone
     * @param  {string} id ID
     * @returns {ConsumableEntity} new ConsumableEntity
     */
    clone(id = "") {
        let clone = new ConsumableEntity(id, this.name, this.description, this.icon, this.consumableType);
        clone.assign(this);
        return clone;
    }
    createInstance(id = "") {
        return new InstancedConsumableEntity(id, this);
    }
    /**
     * Clones the entity's values over this
     * @param {ConsumableEntity} entity 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(entity, verify = true) {
        if (verify && !(entity instanceof ConsumableEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        if (entity.hasOwnProperty("consumableType")) this.setConsumableType(entity.consumableType);
    }
    updateID(newID) {
        super.updateID(newID);
        ConsumableEntity.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        ConsumableEntity.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "ConsumableEntity";
    }

    static initialize() {
        ConsumableEntity.consumableEntityList = {};
    }
    static get(id) {
        if (ConsumableEntity.has(id)) {
            return ConsumableEntity.consumableEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return ConsumableEntity.consumableEntityList.hasOwnProperty(id);
    }
    static set(id, consumableEntity) {
        ConsumableEntity.consumableEntityList[id] = consumableEntity;
        return 0;
    }
    static remove(id) {
        delete ConsumableEntity.consumableEntityList[id];
        return 0;
    }
    static list() {
        return ConsumableEntity.consumableEntityList;
    }
    static clear() {
        for (let i in ConsumableEntity.consumableEntityList) {
            ConsumableEntity.consumableEntityList[i].dispose();
        }
        ConsumableEntity.consumableEntityList = {};
        return 0;
    }
    static toJSON(entity) {
        if (entity instanceof ConsumableEntity) {}
        else if (ConsumableEntity.has(entity)) {
            entity = ConsumableEntity.get(entity);
        }
        else {
            return null;
        }
        let jsonObject = JSON.parse(JSON.stringify(entity));
        return JSON.stringify(jsonObject);
    }
    static fromJSON(json) {
        if (typeof json == "string") {
            console.group(`Running ConsumableEntity.fromJSON(${json.slice(0,12)}...)`);
            json = JSON.parse(json);
        }
        else {
            console.group("Running ConsumableEntity.fromJSON(...)");
        }
        if (!(json instanceof Object) || !json.hasOwnProperty("id") || !json.hasOwnProperty("name")) {
            console.warn(`Supplied JSON was not valid.`);
            console.groupEnd();
            return 2;
        }
        console.info("Supplied JSON was valid.");
        let entity = new ConsumableEntity(json.id, json.name, json.description, json.iconID);
        if (!(entity instanceof ConsumableEntity)) {
            console.warn(`Could not create a new ConsumableEntity`);
            console.groupEnd();
            return 1;
        }
        entity.assign(json);
        console.info(`ConsumableEntity (${entity.getID()}) has been created.`);
        console.groupEnd();
        return entity;
    }
    static updateID(oldID, newID) {
        if (!ConsumableEntity.has(oldID)) {
            return 1;
        }
        ConsumableEntity.set(newID, ConsumableEntity.get(oldID));
        ConsumableEntity.remove(oldID);
        return 0;
    }
}
ConsumableEntity.initialize();