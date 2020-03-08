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
        this.armourClassModifier = 0;
        this.portionMultiplier = 0.1;

        this.setEquipmentSlot(equipmentSlot);
        this.setArmourType(armourType);
        this.generateProperties();

        ClothingEntity.set(this.id, this);
    }

    setArmourType(armourType = ArmourEnum.NONE) {
        if (!ArmourEnum.properties.hasOwnProperty(armourType)) {
            armourType = ArmourEnum.NONE;
        }
        this.armourType = armourType;
    }
    getArmourType() {
        return this.armourType;
    }
    setArmourCategory(armourCategory = ArmourCategoryEnum.LIGHT_ARMOUR) {
        if (!ArmourCategoryEnum.properties.hasOwnProperty(armourCategory)) {
            armourCategory = ArmourCategoryEnum.LIGHT_ARMOUR;
        }
        this.armourCategory = armourCategory;
    }
    getArmourCategory() {
        return this.armourCategory;
    }
    setArmourClass(armourClass) {
        if (typeof armourClass != "number") {armourClass = Number.parseInt(armourClass) || 0;}
        else {armourClass = armourClass|0}
        this.armourClass = armourClass;
        return 0;
    }
    getArmourClass() {
        return this.armourClass + this.armourClassModifier;
    }
    setArmourClassModifier(armourClassModifier) {
        if (typeof armourClassModifier != "number") {armourClassModifier = Number.parseInt(armourClassModifier) || 0;}
        else {armourClassModifier = armourClassModifier|0}
        this.armourClassModifier = armourClassModifier;
        return 0;
    }
    setPortionMultiplier(portionMultiplier) {
        if (typeof portionMultiplier != "number") {portionMultiplier = Number.parseFloat(portionMultiplier) || 0.1;}
        else {portionMultiplier = portionMultiplier}
        this.portionMultiplier = portionMultiplier;
        return 0;
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
                this.abilityScoreRequirements[AbilityEnum.STRENGTH] = 13;
                this.disadvantageOn.add(ProficiencyEnum.STEALTH);
                break;
            }
            case ArmourEnum.SPLINT: {
                this.armourCategory = ArmourCategoryEnum.HEAVY_ARMOUR;
                this.armourClass = 17 * this.portionMultiplier;
                this.price = 2000 * this.portionMultiplier;
                this.abilityScoreRequirements[AbilityEnum.STRENGTH] = 15;
                this.disadvantageOn.add(ProficiencyEnum.STEALTH);
                break;
            }
            case ArmourEnum.PLATE: {
                this.armourCategory = ArmourCategoryEnum.HEAVY_ARMOUR;
                this.armourClass = 18 * this.portionMultiplier;
                this.price = 15000 * this.portionMultiplier;
                this.abilityScoreRequirements[AbilityEnum.STRENGTH] = 15;
                this.disadvantageOn.add(ProficiencyEnum.STEALTH);
                break;
            }
            case ArmourEnum.SHIELD: {
                this.armourCategory = ArmourCategoryEnum.SHIELD;
                this.armourClass = 2;
                this.price = 100;
                this.portionMultiplier = 1.0;
                break;
            }
        }
    }

    resetModifiers() {
        super.resetModifiers();
        this.armourClassModifier = 0;
    }

    /**
     * Overrides EquipmentEntity.clone
     * @param  {string} id ID
     * @return {ClothingEntity} new ClothingEntity
     */
    clone(id = undefined) {
        let clone = new ClothingEntity(id, this.name, this.description, this.icon, this.equipmentSlot, this.armourType);
        clone.assign(this);
        return clone;
    }
    /**
     * Overrides EquipmentEntity.createInstance
     * @param  {string} id ID
     * @return {InstancedClothingEntity} new InstancedClothingEntity
     */
    createInstance(id = undefined) {
        return new InstancedClothingEntity(id, this);
    }
    /**
     * Clones the entity's values over this
     * @param {ClothingEntity} entity 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(entity, verify = true) {
        if (verify && !(entity instanceof ClothingEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        this.setArmourClass(entity.armourClass);
        this.setArmourClassModifier(entity.armourClassModifier);
        this.setPortionMultiplier(entity.portionMultiplier);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        this.physicalProtection.dispose();
        this.magickProtection.dispose();
        ClothingEntity.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "ClothingEntity";
    }

    static initialize() {
        ClothingEntity.clothingEntityList = {};
    }
    static get(id) {
        if (ClothingEntity.has(id)) {
            return ClothingEntity.clothingEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return ClothingEntity.clothingEntityList.hasOwnProperty(id);
    }
    static set(id, clothingEntity) {
        ClothingEntity.clothingEntityList[id] = clothingEntity;
        return 0;
    }
    static remove(id) {
        delete ClothingEntity.clothingEntityList[id];
        return 0;
    }
    static list() {
        return ClothingEntity.clothingEntityList;
    }
    static clear() {
        for (let i in ClothingEntity.clothingEntityList) {
            ClothingEntity.clothingEntityList[i].dispose();
        }
        ClothingEntity.clothingEntityList = {};
        return 0;
    }
    static toJSON(entity) {
        if (entity instanceof ClothingEntity) {}
        else if (ClothingEntity.has(entity)) {
            entity = ClothingEntity.get(entity);
        }
        else {
            return null;
        }
        let jsonObject = JSON.parse(JSON.stringify(entity));
        return JSON.stringify(jsonObject);
    }
    static fromJSON(json) {
        if (typeof json == "string") {
            console.group(`Running ClothingEntity.fromJSON(${json.slice(0,12)}...)`);
            json = JSON.parse(json);
        }
        else {
            console.group("Running ClothingEntity.fromJSON(...)");
        }
        if (!(json instanceof Object) || !json.hasOwnProperty("id") || !json.hasOwnProperty("name")) {
            console.warn(`Supplied JSON was not valid.`);
            console.groupEnd();
            return 2;
        }
        console.info("Supplied JSON was valid.");
        let entity = new ClothingEntity(json.id, json.name, json.description, json.iconID, json.equipmentSlot, json.armourType);
        if (!(entity instanceof ClothingEntity)) {
            console.warn(`Could not create a new ClothingEntity`);
            console.groupEnd();
            return 1;
        }
        entity.assign(json, false);
        console.info(`ClothingEntity (${entity.getID()}) has been created.`);
        console.groupEnd();
        return entity;
    }
}
ClothingEntity.initialize();