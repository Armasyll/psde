class ShieldEntity extends ClothingEntity {
    /**
     * Creats Shield
     * @param  {string}  id          Unique ID
     * @param  {string}  name        Name
     * @param  {string}  description Description
     * @param  {string}  iconID      Image ID
     */
    constructor(id = undefined, name = undefined, description = undefined, iconID = undefined) {
        super(id, name, description, iconID, ApparelSlotEnum.HANDS, ArmourPropertyEnum.SHIELDS);
        this.itemType = ItemEnum.SHIELDS;

        ShieldEntity.set(this.id, this);
    }

    /**
     * Overrides EquipmentEntity.clone
     * @param  {string} id ID
     * @return {ShieldEntity} new ShieldEntity
     */
    clone(id = undefined) {
        let clone = new ShieldEntity(id, this.name, this.description, this.icon);
        clone.assign(this);
        return clone;
    }
    /**
     * Overrides ClothingEntity.createInstance
     * @param  {string} id ID
     * @return {InstancedShieldEntity} new InstancedShieldEntity
     */
    createInstance(id = undefined) {
        return new InstancedShieldEntity(id, this);
    }
    /**
     * Clones the entity's values over this
     * @param {ShieldEntity} entity 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(entity, verify = true) {
        if (verify && !(entity instanceof ShieldEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        ShieldEntity.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "ShieldEntity";
    }

    static initialize() {
        ShieldEntity.shieldEntityList = {};
    }
    static get(id) {
        if (ShieldEntity.has(id)) {
            return ShieldEntity.shieldEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return ShieldEntity.shieldEntityList.hasOwnProperty(id);
    }
    static set(id, shieldEntity) {
        ShieldEntity.shieldEntityList[id] = shieldEntity;
        return 0;
    }
    static remove(id) {
        delete ShieldEntity.shieldEntityList[id];
        return 0;
    }
    static list() {
        return ShieldEntity.shieldEntityList;
    }
    static clear() {
        for (let i in ShieldEntity.shieldEntityList) {
            ShieldEntity.shieldEntityList[i].dispose();
        }
        ShieldEntity.shieldEntityList = {};
        return 0;
    }
    static toJSON(entity) {
        if (entity instanceof ShieldEntity) {}
        else if (ShieldEntity.has(entity)) {
            entity = ShieldEntity.get(entity);
        }
        else {
            return null;
        }
        let jsonObject = JSON.parse(JSON.stringify(entity));
        return JSON.stringify(jsonObject);
    }
    static fromJSON(json) {
        if (typeof json == "string") {
            console.group(`Running ShieldEntity.fromJSON(${json.slice(0,12)}...)`);
            json = JSON.parse(json);
        }
        else {
            console.group("Running ShieldEntity.fromJSON(...)");
        }
        if (!(json instanceof Object) || !json.hasOwnProperty("id") || !json.hasOwnProperty("name")) {
            console.warn(`Supplied JSON was not valid.`);
            console.groupEnd();
            return 2;
        }
        console.info("Supplied JSON was valid.");
        let entity = new ShieldEntity(json.id, json.name, json.description, json.iconID);
        if (!(entity instanceof ShieldEntity)) {
            console.warn(`Could not create a new ShieldEntity`);
            console.groupEnd();
            return 1;
        }
        entity.assign(json);
        console.info(`ShieldEntity (${entity.getID()}) has been created.`);
        console.groupEnd();
        return entity;
    }
}
ShieldEntity.initialize();