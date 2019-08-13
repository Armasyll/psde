class ClothingEntity extends EquipmentEntity {
    /**
     * Creats Clothing
     * @param  {string}  id          Unique ID
     * @param  {string}  name        Name
     * @param  {string}  description Description
     * @param  {string}  iconID       Image ID
     * @param  {ApparelSlotEnum}  equipmentSlot  Apparel slot enum
     */
    constructor(id = undefined, name = undefined, description = undefined, iconID = undefined, equipmentSlot = ApparelSlotEnum.NONE, armourType = ArmourEnum.NONE) {
        super(id, name, description, iconID, equipmentSlot);
        this.itemType = ItemEnum.APPAREL;

        this.armourCategory = ArmourCategoryEnum.LIGHT_ARMOUR;
        this.armourType = ArmourEnum.NONE;
        this.armourClass = 0;
        this.portionMultiplier = 0.1;

        this.setEquipmentSlot(equipmentSlot);
        this.setArmourType(armourType);
        this.generateProperties();

        Game.setClothingEntity(this.id, this);
    }

    setArmourType(armourType) {
        if (!ArmourEnum.properties.hasOwnProperty(armourType)) {
            armourType = ArmourEnum.NONE;
        }
        this.armourType = armourType;
    }
    getArmourCategory() {
        return this.armourCategory;
    }
    getArmourType() {
        return this.armourType;
    }
    getArmourClass() {
        return this.armourClass;
    }
    getPortionMultiplier() {
        return this.portionMultiplier;
    }

    generateProperties() {
        switch (this.equipmentSlot) {
            case ApparelSlotEnum.CHEST: {
                this.portionMultiplier = 0.3;
                break;
            }
            case ApparelSlotEnum.HAND_L:
            case ApparelSlotEnum.HAND_R:
            case ApparelSlotEnum.HANDS: {
                this.portionMultiplier = 0.05;
                break;
            }
            default: {
                this.portionMultiplier = 0.1;
                break;
            }
        }
        switch (this.armourType) {
            case ArmourEnum.PADDED: {
                this.armourCategory = ArmourCategoryEnum.LIGHT_ARMOUR;
                this.armourClass = 11 * this.portionMultiplier;
                this.price = 50 * this.portionMultiplier;
                this.disadvantageOn.add(ProficiencyEnum.STEALTH);
                break;
            }
            case ArmourEnum.LEATHER: {
                this.armourCategory = ArmourCategoryEnum.LIGHT_ARMOUR;
                this.armourClass = 11 * this.portionMultiplier;
                this.price = 100 * this.portionMultiplier;
                break;
            }
            case ArmourEnum.STUDDEDLEATHER: {
                this.armourCategory = ArmourCategoryEnum.LIGHT_ARMOUR;
                this.armourClass = 12 * this.portionMultiplier;
                this.price = 450 * this.portionMultiplier;
                break;
            }
            case ArmourEnum.HIDE: {
                this.armourCategory = ArmourCategoryEnum.MEDIUM_ARMOUR;
                this.armourClass = 12 * this.portionMultiplier;
                this.price = 100 * this.portionMultiplier;
                break;
            }
            case ArmourEnum.CHAINSHIRT: {
                this.armourCategory = ArmourCategoryEnum.MEDIUM_ARMOUR;
                this.armourClass = 13 * this.portionMultiplier;
                this.price = 500 * this.portionMultiplier;
                break;
            }
            case ArmourEnum.SCALEMAIL: {
                this.armourCategory = ArmourCategoryEnum.MEDIUM_ARMOUR;
                this.armourClass = 14 * this.portionMultiplier;
                this.price = 500 * this.portionMultiplier;
                this.disadvantageOn.add(ProficiencyEnum.STEALTH);
                break;
            }
            case ArmourEnum.BREASTPLATE: {
                this.armourCategory = ArmourCategoryEnum.MEDIUM_ARMOUR;
                this.armourClass = 14 * this.portionMultiplier;
                this.price = 4000 * this.portionMultiplier;
                break;
            }
            case ArmourEnum.HALFPLATE: {
                this.armourCategory = ArmourCategoryEnum.MEDIUM_ARMOUR;
                this.armourClass = 15 * this.portionMultiplier;
                this.price = 7500 * this.portionMultiplier;
                this.disadvantageOn.add(ProficiencyEnum.STEALTH);
                break;
            }
            case ArmourEnum.RINGMAIL: {
                this.armourCategory = ArmourCategoryEnum.HEAVY_ARMOUR;
                this.armourClass = 14 * this.portionMultiplier;
                this.price = 300 * this.portionMultiplier;
                this.disadvantageOn.add(ProficiencyEnum.STEALTH);
                break;
            }
            case ArmourEnum.CHAINMAIL: {
                this.armourCategory = ArmourCategoryEnum.HEAVY_ARMOUR;
                this.armourClass = 16 * this.portionMultiplier;
                this.price = 750 * this.portionMultiplier;
                this.abilityScoreRequirements[AbilityScoreEnum.STRENGTH] = 13;
                this.disadvantageOn.add(ProficiencyEnum.STEALTH);
                break;
            }
            case ArmourEnum.SPLINT: {
                this.armourCategory = ArmourCategoryEnum.HEAVY_ARMOUR;
                this.armourClass = 17 * this.portionMultiplier;
                this.price = 2000 * this.portionMultiplier;
                this.abilityScoreRequirements[AbilityScoreEnum.STRENGTH] = 15;
                this.disadvantageOn.add(ProficiencyEnum.STEALTH);
                break;
            }
            case ArmourEnum.PLATE: {
                this.armourCategory = ArmourCategoryEnum.HEAVY_ARMOUR;
                this.armourClass = 18 * this.portionMultiplier;
                this.price = 15000 * this.portionMultiplier;
                this.abilityScoreRequirements[AbilityScoreEnum.STRENGTH] = 15;
                this.disadvantageOn.add(ProficiencyEnum.STEALTH);
                break;
            }
            case ArmourEnum.SHIELD: {
                this.armourCategory = ArmourCategoryEnum.SHIELD;
                this.armourClass = 2;
                this.price = 100;
                break;
            }
        }
    }

    /**
     * Overrides EquipmentEntity.clone
     * @param  {string} id ID
     * @return {ClothingEntity}     new ClothingEntity
     */
    clone(id = undefined) {
        let clothingEntity = new ClothingEntity(id, this.name, this.description, this.icon, this.equipmentSlot, this.armourType);
        // variables from AbstractEntity
        clothingEntity.availableActions = Object.assign({}, this.availableActions);
        clothingEntity.hiddenAvailableActions = Object.assign({}, this.hiddenAvailableActions);
        clothingEntity.specialProperties = new Set(this.specialProperties);
        clothingEntity.defaultAction = this.defaultAction;
        // variables from Entity
        clothingEntity.weight.copyFrom(this.weight);
        clothingEntity.price.copyFrom(this.price);
        clothingEntity.health.copyFrom(this.health);
        // variables from ItemEntity
        clothingEntity.setItemType(this.itemType);
        // variables from EquipmentEntity
        clothingEntity.setEquipmentSlot(this.equipmentSlot);
        return clothingEntity;
    }
    /**
     * Overrides EquipmentEntity.createInstance
     * @param  {string} id ID
     * @return {InstancedClothingEntity}     new InstancedClothingEntity
     */
    createInstance(id = undefined) {
        let instance = new InstancedClothingEntity(id, this);
        this.instances[instance.getID()] = instance;
        return instance;
    }
	dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        this.physicalProtection.dispose();
        this.magickProtection.dispose();
        Game.removeClothingEntity(this.id);
        super.dispose();
        return undefined;
	}
}