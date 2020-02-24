class ShieldEntity extends ClothingEntity {
    /**
     * Creats Shield
     * @param  {string}  id          Unique ID
     * @param  {string}  name        Name
     * @param  {string}  description Description
     * @param  {string}  iconID      Image ID
     */
    constructor(id = undefined, name = undefined, description = undefined, iconID = undefined) {
        super(id, name, description, iconID, ApparelSlotEnum.HANDS, ArmourEnum.SHIELD);
        this.itemType = ItemEnum.SHIELD;

        ShieldEntity.set(this.id, this);
    }

    /**
     * Overrides EquipmentEntity.clone
     * @param  {string} id          ID
     * @return {ShieldEntity}       new ShieldEntity
     */
    clone(id = undefined) {
        let clone = new ShieldEntity(id, this.name, this.description, this.icon);
        clone.assign(this);
        return clone;
    }
    /**
     * Overrides ClothingEntity.createInstance
     * @param  {string} id ID
     * @return {InstancedShieldEntity}     new InstancedShieldEntity
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
}
ShieldEntity.initialize();