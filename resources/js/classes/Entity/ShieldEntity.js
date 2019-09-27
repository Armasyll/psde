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

        Game.setShieldEntity(this.id, this);
    }

    /**
     * Overrides ClothingEntity.clone
     * @param  {string} id ID
     * @return {ShieldEntity}     new ShieldEntity
     */
    clone(id = undefined) {
        let shieldEntity = new ShieldEntity(id, this.name, this.description, this.icon);
        // variables from AbstractEntity
        shieldEntity.availableActions = Object.assign({}, this.availableActions);
        shieldEntity.hiddenAvailableActions = Object.assign({}, this.hiddenAvailableActions);
        shieldEntity.specialProperties = new Set(this.specialProperties);
        shieldEntity.defaultAction = this.defaultAction;
        // variables from Entity
        shieldEntity.weight.copyFrom(this.weight);
        shieldEntity.price.copyFrom(this.price);
        shieldEntity.health.copyFrom(this.health);
        return shieldEntity;
    }
    /**
     * Overrides ClothingEntity.createInstance
     * @param  {string} id ID
     * @return {InstancedShieldEntity}     new InstancedShieldEntity
     */
    createInstance(id = undefined) {
        let instance = new InstancedShieldEntity(id, this);
        this.instances[instance.getID()] = instance;
        return instance;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        Game.removeShieldEntity(this.id);
        super.dispose();
        return undefined;
    }
}