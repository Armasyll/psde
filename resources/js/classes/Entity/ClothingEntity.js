/**
 * Clothing Entity
 */
class ClothingEntity extends EquipmentEntity {
    /**
     * Creates a Clothing Entity
     * @param  {string}  id Unique ID
     * @param  {string}  name Name
     * @param  {string}  [description] 
     * @param  {string}  [iconID] Image ID
     * @param  {ApparelSlotEnum}  equipmentSlot Apparel slot enum
     */
    constructor(id = "", name = "", description = "", iconID = "", equipmentSlot = ApparelSlotEnum.NONE, armourType = ArmourPropertyEnum.NONE) {
        super(id, name, description, iconID, equipmentSlot);
        this.itemType = ItemEnum.APPAREL;

        this.armourCategory = ArmourCategoryEnum.LIGHT_ARMOUR;
        this.armourType = ArmourPropertyEnum.NONE;
        this.armourClass = 0;
        this.armourClassModifier = 0;
        this.portionMultiplier = 0.1;

        this.setEquipmentSlot(equipmentSlot);
        this.setArmourType(armourType);
        this.generateProperties();

        ClothingEntity.set(this.id, this);
    }

    setArmourType(armourType = ArmourPropertyEnum.NONE) {
        if (!ArmourPropertyEnum.properties.hasOwnProperty(armourType)) {
            armourType = ArmourPropertyEnum.NONE;
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
            case ArmourPropertyEnum.PADDED: {
                this.armourCategory = ArmourCategoryEnum.LIGHT_ARMOUR;
                this.armourClass = 11 * this.portionMultiplier;
                this.price = 50 * this.portionMultiplier;
                this.disadvantageOn.add(ProficiencyEnum.STEALTH);
                break;
            }
            case ArmourPropertyEnum.LEATHER: {
                this.armourCategory = ArmourCategoryEnum.LIGHT_ARMOUR;
                this.armourClass = 11 * this.portionMultiplier;
                this.price = 100 * this.portionMultiplier;
                break;
            }
            case ArmourPropertyEnum.STUDDEDLEATHER: {
                this.armourCategory = ArmourCategoryEnum.LIGHT_ARMOUR;
                this.armourClass = 12 * this.portionMultiplier;
                this.price = 450 * this.portionMultiplier;
                break;
            }
            case ArmourPropertyEnum.HIDE: {
                this.armourCategory = ArmourCategoryEnum.MEDIUM_ARMOUR;
                this.armourClass = 12 * this.portionMultiplier;
                this.price = 100 * this.portionMultiplier;
                break;
            }
            case ArmourPropertyEnum.CHAINSHIRT: {
                this.armourCategory = ArmourCategoryEnum.MEDIUM_ARMOUR;
                this.armourClass = 13 * this.portionMultiplier;
                this.price = 500 * this.portionMultiplier;
                break;
            }
            case ArmourPropertyEnum.SCALEMAIL: {
                this.armourCategory = ArmourCategoryEnum.MEDIUM_ARMOUR;
                this.armourClass = 14 * this.portionMultiplier;
                this.price = 500 * this.portionMultiplier;
                this.disadvantageOn.add(ProficiencyEnum.STEALTH);
                break;
            }
            case ArmourPropertyEnum.BREASTPLATE: {
                this.armourCategory = ArmourCategoryEnum.MEDIUM_ARMOUR;
                this.armourClass = 14 * this.portionMultiplier;
                this.price = 4000 * this.portionMultiplier;
                break;
            }
            case ArmourPropertyEnum.HALFPLATE: {
                this.armourCategory = ArmourCategoryEnum.MEDIUM_ARMOUR;
                this.armourClass = 15 * this.portionMultiplier;
                this.price = 7500 * this.portionMultiplier;
                this.disadvantageOn.add(ProficiencyEnum.STEALTH);
                break;
            }
            case ArmourPropertyEnum.RINGMAIL: {
                this.armourCategory = ArmourCategoryEnum.HEAVY_ARMOUR;
                this.armourClass = 14 * this.portionMultiplier;
                this.price = 300 * this.portionMultiplier;
                this.disadvantageOn.add(ProficiencyEnum.STEALTH);
                break;
            }
            case ArmourPropertyEnum.CHAINMAIL: {
                this.armourCategory = ArmourCategoryEnum.HEAVY_ARMOUR;
                this.armourClass = 16 * this.portionMultiplier;
                this.price = 750 * this.portionMultiplier;
                this.abilityScoreRequirements[AbilityEnum.STRENGTH] = 13;
                this.disadvantageOn.add(ProficiencyEnum.STEALTH);
                break;
            }
            case ArmourPropertyEnum.SPLINT: {
                this.armourCategory = ArmourCategoryEnum.HEAVY_ARMOUR;
                this.armourClass = 17 * this.portionMultiplier;
                this.price = 2000 * this.portionMultiplier;
                this.abilityScoreRequirements[AbilityEnum.STRENGTH] = 15;
                this.disadvantageOn.add(ProficiencyEnum.STEALTH);
                break;
            }
            case ArmourPropertyEnum.PLATE: {
                this.armourCategory = ArmourCategoryEnum.HEAVY_ARMOUR;
                this.armourClass = 18 * this.portionMultiplier;
                this.price = 15000 * this.portionMultiplier;
                this.abilityScoreRequirements[AbilityEnum.STRENGTH] = 15;
                this.disadvantageOn.add(ProficiencyEnum.STEALTH);
                break;
            }
            case ArmourPropertyEnum.SHIELDS: {
                this.armourCategory = ArmourCategoryEnum.SHIELDS;
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
     * @returns {ClothingEntity} new ClothingEntity
     */
    clone(id = "") {
        let clone = new ClothingEntity(id, this.name, this.description, this.icon, this.equipmentSlot, this.armourType);
        clone.assign(this);
        return clone;
    }
    /**
     * Overrides EquipmentEntity.createInstance
     * @param  {string} id ID
     * @returns {InstancedClothingEntity} new InstancedClothingEntity
     */
    createInstance(id = "") {
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
        if (entity.hasOwnProperty("armourClass")) this.setArmourClass(entity.armourClass);
        if (entity.hasOwnProperty("armourClassModifier")) this.setArmourClassModifier(entity.armourClassModifier);
        if (entity.hasOwnProperty("portionMultiplier")) this.setPortionMultiplier(entity.portionMultiplier);
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        ClothingEntity.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
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
    static updateID(oldID, newID) {
        if (!ClothingEntity.has(oldID)) {
            return 1;
        }
        ClothingEntity.set(newID, ClothingEntity.get(oldID));
        ClothingEntity.remove(oldID);
        return 0;
    }
}
ClothingEntity.initialize();