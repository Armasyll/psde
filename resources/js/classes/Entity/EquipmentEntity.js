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
        this.advantageOn = new Set();
        this.disadvantageOn = new Set();

        this.addAvailableAction(ActionEnum.EQUIP);
        this.addAvailableAction(ActionEnum.UNEQUIP);
        this.setEquipmentSlot(equipmentSlot);
    }

    setEquipmentSlot(equipmentSlot) {
        if (ApparelSlotEnum.properties.hasOwnProperty(equipmentSlot)) {
            this.equipmentSlot = equipmentSlot;
        }
        else {
            this.equipmentSlot = ApparelSlotEnum.NONE;
        }
        return this;
    }
    getEquipmentSlot() {
        return this.equipmentSlot;
    }

    hasAbilityScoreRequirement(abilityScoreEnum = undefined) {
        if (this.abilityRequirements.hasOwnProperty(abilityScoreEnum)) {
            return true;
        }
        else if (abilityScoreEnum == undefined) {
            return Object.keys(this.abilityRequirements).length > 0;
        }
        return false;
    }
    getAbilityScoreRequirement(abilityScoreEnum) {
        if (this.abilityRequirements.hasOwnProperty(abilityScoreEnum)) {
            return this.abilityRequirements[abilityScoreEnum];
        }
        return 0;
    }
    addAbilityScoreRequirement(abilityScoreEnum, number) {
        if (abilityScoreEnum.properties.hasOwnProperty(abilityScoreEnum)) {
            if (typeof number != "number") {number = Number.parseInt(number) || 0;}
            else {number = number|0}
            this.abilityRequirements[abilityScoreEnum] = number;
        }
        return this;
    }
    removeAbilityScoreRequirement(abilityScoreEnum) {
        if (this.abilityRequirements.hasOwnProperty(abilityScoreEnum)) {
            delete this.abilityRequirements[abilityScoreEnum];
        }
        return this;
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
        }
        return this;
    }
    removeAdvantageOn(proficiencyEnum) {
        if (this.advantageOn.has(proficiencyEnum)) {
            this.advantageOn.remove(proficiencyEnum);
        }
        return this;
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
        }
        return this;
    }
    removeDisadvantageOn(proficiencyEnum) {
        if (this.disadvantageOn.has(proficiencyEnum)) {
            this.disadvantageOn.remove(proficiencyEnum);
        }
        return this;
    }

    /**
     * Overrides ItemEntity.clone; not meant to be run.
     * @param  {string} id ID
     * @return {EquipmentEntity}     new EquipmentEntity
     */
    clone(id = "") {
        let itemEntity = new EquipmentEntity(id, this.name, this.description, this.icon, this.equipmentSlot);
        // variables from AbstractEntity
        itemEntity.availableActions = Object.assign({}, this.availableActions);
        itemEntity.hiddenAvailableActions = Object.assign({}, this.hiddenAvailableActions);
        itemEntity.specialProperties = new Set(this.specialProperties);
        itemEntity.defaultAction = this.defaultAction;
        // variables from Entity
        itemEntity.weight.copyFrom(this.weight);
        itemEntity.price.copyFrom(this.price);
        itemEntity.health.copyFrom(this.health);
        // variables from ItemEntity
        itemEntity.itemType = this.itemType;
        return itemEntity;
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