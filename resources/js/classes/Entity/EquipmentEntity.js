class EquipmentEntity extends ItemEntity {
    /**
     * Creats Equipment
     * @param  {string}  id          Unique ID
     * @param  {string}  name        Name
     * @param  {string}  description Description
     * @param  {string}  iconID       Image ID
     * @param  {ApparelSlotEnum}  equipmentSlot  Apparel slot enum
     */
    constructor(id = undefined, name = undefined, description = undefined, iconID = undefined, equipmentSlot = ApparelSlotEnum.NONE) {
        super(id, name, description, iconID);

        this.equipmentSlot = ApparelSlotEnum.NONE;

        this.abilityRequirements = {};
        this.abilityRequirementsModifier = {};
        this.advantageOn = new Set();
        this.disadvantageOn = new Set();

        this.addAvailableAction(ActionEnum.EQUIP);
        this.addAvailableAction(ActionEnum.UNEQUIP);
        this.setEquipmentSlot(equipmentSlot);
    }

    setEquipmentSlot(equipmentSlot) {
        if (ApparelSlotEnum.properties.hasOwnProperty(equipmentSlot)) {
            this.equipmentSlot = equipmentSlot;
            return 0;
        }
        this.equipmentSlot = ApparelSlotEnum.NONE;
        return 1;
    }
    getEquipmentSlot() {
        return this.equipmentSlot;
    }

    hasAbilityScoreRequirement(abilityScoreEnum = undefined) {
        if (this.abilityRequirements.hasOwnProperty(abilityScoreEnum) || this.abilityRequirementsModifier.hasOwnProperty(abilityScoreEnum)) {
            return true;
        }
        else if (abilityScoreEnum == undefined) {
            return Object.keys(this.abilityRequirements).length > 0;
        }
        return false;
    }
    getAbilityScoreRequirement(abilityScoreEnum) {
        let score = 0;
        if (this.abilityRequirements.hasOwnProperty(abilityScoreEnum)) {
            score = this.abilityRequirements[abilityScoreEnum];
        }
        if (this.abilityRequirementsModifier.hasOwnProperty(abilityScoreEnum)) {
            score += this.abilityRequirementsModifier[abilityScoreEnum];
        }
        return score;
    }
    addAbilityScoreRequirement(abilityScoreEnum, number) {
        if (abilityScoreEnum.properties.hasOwnProperty(abilityScoreEnum)) {
            if (typeof number != "number") {number = Number.parseInt(number) || 0;}
            else {number = number|0}
            this.abilityRequirements[abilityScoreEnum] = number;
            return 0;
        }
        return 1;
    }
    removeAbilityScoreRequirement(abilityScoreEnum) {
        if (this.abilityRequirements.hasOwnProperty(abilityScoreEnum)) {
            delete this.abilityRequirements[abilityScoreEnum];
            return 0;
        }
        return 1;
    }

    hasAdvantageOn(proficiencyEnum) {
        return this.advantageOn.has(proficiencyEnum);
    }
    getAdvantageOn() {
        return this.advantageOn;
    }
    addAdvantageOn(proficiencyEnum) {
        if (ProficiencyEnum.properties.hasOwnProperty(proficiencyEnum)) {
            this.advantageOn.add(proficiencyEnum);
            return 0;
        }
        return 1;
    }
    removeAdvantageOn(proficiencyEnum) {
        if (this.advantageOn.has(proficiencyEnum)) {
            this.advantageOn.remove(proficiencyEnum);
            return 0;
        }
        return 1;
    }

    hasDisadvantageOn(proficiencyEnum) {
        return this.disadvantageOn.has(proficiencyEnum);
    }
    getDisadvantageOn() {
        return this.disadvantageOn;
    }
    addDisadvantageOn(proficiencyEnum) {
        if (ProficiencyEnum.properties.hasOwnProperty(proficiencyEnum)) {
            this.disadvantageOn.add(proficiencyEnum);
            return 0;
        }
        return 1;
    }
    removeDisadvantageOn(proficiencyEnum) {
        if (this.disadvantageOn.has(proficiencyEnum)) {
            this.disadvantageOn.remove(proficiencyEnum);
            return 0;
        }
        return 1;
    }

    resetModifiers() {
        super.resetModifiers();
        this.abilityRequirementsModifier = {};
    }

    /**
     * Overrides ItemEntity.clone
     * @param  {string} id          ID
     * @return {EquipmentEntity}    new EquipmentEntity
     */
    clone(id = "") {
        let clone = new EquipmentEntity(id, this.name, this.description, this.icon, this.equipmentSlot);
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
     * Overrides ItemEntity.createInstance; not meant to be run.
     * @param  {string} id ID
     * @return {InstancedEquipmentEntity}     new InstancedEquipmentEntity
     */
    createInstance(id = undefined) {
        let instance = new InstancedEquipmentEntity(id, this);
        this.instances[instance.getID()] = instance;
        return instance;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        delete this.equipmentSlot;
        super.dispose();
        return undefined;
    }
}