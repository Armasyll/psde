/**
 * Equipment Entity
 * @class
 * @typedef {Object} EquipmentEntity
 * @extends ItemEntity
 * @property {ApparelSlotEnum} equipmentSlot
 * @property {Object} abilityRequirements
 * @property {Object} abilityRequirementsModifier
 * @property {boolean} equipable
 */
class EquipmentEntity extends ItemEntity {
    /**
     * Creates an Equipment Entity
     * @param  {string}  id Unique ID
     * @param  {string}  name Name
     * @param  {string}  [description] Description
     * @param  {string}  [iconID] Image ID
     * @param  {ApparelSlotEnum}  equipmentSlot Apparel slot enum
     */
    constructor(id = "", name = "", description = "", iconID = "", equipmentSlot = ApparelSlotEnum.NONE) {
        super(id, name, description, iconID);
        /** @type {ApparelSlotEnum} */
        this.equipmentSlot = ApparelSlotEnum.NONE;
        /** @type {Object.<AbilityEnum, number>} */
        this.abilityRequirements = {};
        /** @type {Object.<AbilityEnum, number>} */
        this.abilityRequirementsModifier = {};
        /** @type {boolean} */
        this.equipable = true;

        this.addAvailableAction(ActionEnum.EQUIP);
        this.addAvailableAction(ActionEnum.UNEQUIP);
        this.setEquipmentSlot(equipmentSlot);
    }

    setEquipmentSlot(equipmentSlot) {
        equipmentSlot = Tools.filterEnum(equipmentSlot, ApparelSlotEnum, true);
        this.equipmentSlot = equipmentSlot;
        return 0;
    }
    getEquipmentSlot() {
        return this.equipmentSlot;
    }

    hasAbilityScoreRequirement(abilityScoreEnum = -1) {
        if (this.abilityRequirements.hasOwnProperty(abilityScoreEnum) || this.abilityRequirementsModifier.hasOwnProperty(abilityScoreEnum)) {
            return true;
        }
        else if (abilityScoreEnum == -1) {
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

    resetModifiers() {
        super.resetModifiers();
        this.abilityRequirementsModifier = {};
    }

    /**
     * Overrides ItemEntity.clone
     * @param  {string} id ID
     * @returns {EquipmentEntity} new EquipmentEntity
     */
    clone(id = "") {
        let clone = new EquipmentEntity(id, this.name, this.description, this.icon, this.equipmentSlot);
        clone.assign(this);
        return clone;
    }
    /**
     * Overrides ItemEntity.createInstance; not meant to be run.
     * @param  {string} id ID
     * @returns {InstancedEquipmentEntity} new InstancedEquipmentEntity
     */
    createInstance(id = "") {
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
        if (entity.hasOwnProperty("equipmentSlot")) this.setEquipmentSlot(entity.equipmentSlot);
        if (entity.hasOwnProperty("abilityRequirements")) {
            for (let abilityEnum in entity.abilityRequirements) {
                this.addAbilityRequirement(abilityEnum, entity.abilityRequirements[abilityEnum]);
            }
        }
        if (entity.hasOwnProperty("abilityRequirementsModifier")) {
            for (let abilityEnum in entity.abilityRequirementsModifier) {
                this.addAbilityRequirementModifier(abilityEnum, entity.abilityRequirementsModifier[abilityEnum]);
            }
        }
        if (entity.hasOwnProperty("advantageOn")) {
            for (let proficiencyEnum in entity.advantageOn) {
                this.addAdvantageOn(proficiencyEnum);
            }
        }
        if (entity.hasOwnProperty("disadvantageOn")) {
            for (let proficiencyEnum in entity.disadvantageOn) {
                this.addDisadvantageOn(proficiencyEnum);
            }
        }
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "EquipmentEntity";
    }
}