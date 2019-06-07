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

        this.armourType = ArmourEnum.NONE;
        this.armourClass = 0;

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
    getArmourType() {
        return this.armourType;
    }
    getArmourClass() {
        return this.armourClass;
    }

    generateProperties() {
        let multiplier = 0;
        switch (this.equipmentSlot) {
            case ApparelSlotEnum.CHEST: {
                multiplier = 0.3;
                break;
            }
            case ApparelSlotEnum.HAND_L:
            case ApparelSlotEnum.HAND_R:
            case ApparelSlotEnum.HANDS: {
                multiplier = 0.05;
                break;
            }
            default: {
                multiplier = 0.1;
                break;
            }
        }
        switch (this.armourType) {
            case ArmourEnum.PADDED: {
                this.armourClass = 11 * multiplier;
                this.price = 50 * multiplier;
                break;
            }
            case ArmourEnum.LEATHER: {
                this.armourClass = 11 * multiplier;
                this.price = 100 * multiplier;
                break;
            }
            case ArmourEnum.STUDDEDLEATHER: {
                this.armourClass = 12 * multiplier;
                this.price = 450 * multiplier;
                break;
            }
            case ArmourEnum.HIDE: {
                this.armourClass = 12 * multiplier;
                this.price = 100 * multiplier;
                break;
            }
            case ArmourEnum.CHAINSHIRT: {
                this.armourClass = 13 * multiplier;
                this.price = 500 * multiplier;
                break;
            }
            case ArmourEnum.SCALEMAIL: {
                this.armourClass = 14 * multiplier;
                this.price = 500 * multiplier;
                break;
            }
            case ArmourEnum.BREASTPLATE: {
                this.armourClass = 14 * multiplier;
                this.price = 4000 * multiplier;
                break;
            }
            case ArmourEnum.HALFPLATE: {
                this.armourClass = 15 * multiplier;
                this.price = 7500 * multiplier;
                break;
            }
            case ArmourEnum.RINGMAIL: {
                this.armourClass = 14 * multiplier;
                this.price = 300 * multiplier;
                break;
            }
            case ArmourEnum.CHAINMAIL: {
                this.armourClass = 16 * multiplier;
                this.price = 750 * multiplier;
                break;
            }
            case ArmourEnum.SPLINT: {
                this.armourClass = 17 * multiplier;
                this.price = 2000 * multiplier;
                break;
            }
            case ArmourEnum.PLATE: {
                this.armourClass = 18 * multiplier;
                this.price = 15000 * multiplier;
                break;
            }
            case ArmourEnum.SHIELD: {
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
        id = Tools.filterID(id);
        if (typeof id != "string") {
            id = Tools.genUUIDv4();
        }
        let clothingEntity = new ClothingEntity(id, this.name, this.description, this.icon, this.equipmentSlot);
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
        id = Tools.filterID(id);
        if (typeof id != "string") {
            id = Tools.genUUIDv4();
        }
        return new InstancedClothingEntity(id, this);
    }
	dispose() {
        this.physicalProtection.dispose();
        this.magickProtection.dispose();
        Game.removeClothingEntity(this.id);
        super.dispose();
        return undefined;
	}
}