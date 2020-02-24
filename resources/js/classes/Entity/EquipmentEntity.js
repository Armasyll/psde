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
        this.advantageOn = {};
        this.disadvantageOn = {};

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
    getAbilityRequirement(abilityEnum) {
        let score = 0;
        if (this.abilityRequirements.hasOwnProperty(abilityEnum)) {
            score = this.abilityRequirements[abilityEnum];
        }
        if (this.abilityRequirementsModifier.hasOwnProperty(abilityEnum)) {
            score += this.abilityRequirementsModifier[abilityEnum];
        }
        return score;
    }
    addAbilityRequirement(abilityEnum, number) {
        if (AbilityEnum.properties.hasOwnProperty(abilityEnum)) {
            if (typeof number != "number") {number = Number.parseInt(number) || 0;}
            else {number = number|0}
            this.abilityRequirements[abilityEnum] = number;
            return 0;
        }
        return 1;
    }
    removeAbilityRequirement(abilityEnum) {
        if (this.abilityRequirements.hasOwnProperty(abilityEnum)) {
            delete this.abilityRequirements[abilityEnum];
            return 0;
        }
        return 1;
    }

    addAbilityRequirementModifier(abilityEnum, number) {
        if (AbilityEnum.properties.hasOwnProperty(abilityEnum)) {
            if (typeof number != "number") {number = Number.parseInt(number) || 0;}
            else {number = number|0}
            this.abilityRequirementsModifier[abilityEnum] = number;
            return 0;
        }
    }
    removeAbilityRequirementModifier(abilityEnum) {
        if (this.abilityRequirementsModifier.hasOwnProperty(abilityEnum)) {
            delete this.abilityRequirementsModifier[abilityEnum];
            return 0;
        }
        return 1;
    }

    hasAdvantageOn(proficiencyEnum) {
        return this.advantageOn.hasOwnProperty(proficiencyEnum);
    }
    getAdvantageOn() {
        return this.advantageOn;
    }
    addAdvantageOn(proficiencyEnum) {
        if (ProficiencyEnum.properties.hasOwnProperty(proficiencyEnum)) {
            this.advantageOn[proficiencyEnum] = true;
            return 0;
        }
        return 1;
    }
    removeAdvantageOn(proficiencyEnum) {
        if (this.advantageOn.hasOwnProperty(proficiencyEnum)) {
            delete this.advantageOn[proficiencyEnum];
            return 0;
        }
        return 1;
    }

    hasDisadvantageOn(proficiencyEnum) {
        return this.disadvantageOn.hasOwnProperty(proficiencyEnum);
    }
    getDisadvantageOn() {
        return this.disadvantageOn;
    }
    addDisadvantageOn(proficiencyEnum) {
        if (ProficiencyEnum.properties.hasOwnProperty(proficiencyEnum)) {
            this.disadvantageOn[proficiencyEnum] = true;
            return 0;
        }
        return 1;
    }
    removeDisadvantageOn(proficiencyEnum) {
        if (this.disadvantageOn.hasOwnProperty(proficiencyEnum)) {
            delete this.disadvantageOn[proficiencyEnum];
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
     * @param  {string} id ID
     * @return {EquipmentEntity} new EquipmentEntity
     */
    clone(id = "") {
        let clone = new EquipmentEntity(id, this.name, this.description, this.icon, this.equipmentSlot);
        clone.assign(this);
        return clone;
    }
    /**
     * Overrides ItemEntity.createInstance; not meant to be run.
     * @param  {string} id ID
     * @return {InstancedEquipmentEntity} new InstancedEquipmentEntity
     */
    createInstance(id = undefined) {
        return new InstancedEquipmentEntity(id, this);
    }
    /**
     * Clones the entity's values over this
     * @param {EquipmentEntity} entity 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(entity, verify = true) {
        if (verify && !(entity instanceof EquipmentEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        this.setEquipmentSlot(entity.equipmentSlot);
        for (let abilityEnum in entity.abilityRequirements) {
            this.addAbilityRequirement(abilityEnum, entity.abilityRequirements[abilityEnum]);
        }
        for (let abilityEnum in entity.abilityRequirementsModifier) {
            this.addAbilityRequirementModifier(abilityEnum, entity.abilityRequirementsModifier[abilityEnum]);
        }
        for (let proficiencyEnum in entity.advantageOn) {
            this.addAdvantageOn(proficiencyEnum);
        }
        for (let proficiencyEnum in entity.disadvantageOn) {
            this.addDisadvantageOn(proficiencyEnum);
        }
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        delete this.equipmentSlot;
        super.dispose();
        return undefined;
    }
}