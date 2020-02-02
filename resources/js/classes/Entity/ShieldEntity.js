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
        // variables from EquipmentEntity
        clone.setEquipmentSlot(this.equipmentSlot);
        clone.abilityRequirements = Object.assign({}, this.abilityRequirements);
        clone.abilityRequirementsModifier = Object.assign({}, this.abilityRequirementsModifier);
        clone.advantageOn = new Set(this.advantageOn);
        clone.disadvantageOn = new Set(this.disadvantageOn);
        return clone;
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