/**
 * Weapon Entity
 */
class WeaponEntity extends EquipmentEntity {
    /**
     * Creates a Weapon Entity
     * @param  {string}  id Unique ID
     * @param  {string}  name Name
     * @param  {string}  [description] Description
     * @param  {string}  [iconID] Image ID
     * @param  {WeaponEnum}  weaponType WeaponEnum
     */
    constructor(id = "", name = "", description = "", iconID = "", weaponType = WeaponEnum.CLUB) {
        super(id, name, description, iconID);
        this.holdable = true;
        this.itemType = ItemEnum.WEAPON;

        this.equipmentSlot = ApparelSlotEnum.HANDS;
        this.weaponCategory = WeaponCategoryEnum.SIMPLE_MELEE;
        this.weaponType = WeaponEnum.NONE;
        this.damageRollCount = 1;
        this.damageRollCountModifier = 0;
        this.damageRoll = 1;
        this.damageRollModifier = 0;
        this.damageType = DamageEnum.NONE;
        this.silvered = false;
        this.silveredModifier = false;
        this.range = [0,0];
        this.versatileRollCount = 1;
        this.versatileRoll = 0;
        this.weaponProperties = {};

        this.setWeaponType(weaponType);

        this.generateProperties();

        WeaponEntity.set(this.id, this);
    }

    generateProperties() {
        switch (this.weaponType) {
            case WeaponEnum.CLUB: {
                this.weaponCategory = WeaponCategoryEnum.SIMPLE_MELEE;
                this.price = 1;
                this.damageRoll = 4;
                this.damageType = DamageEnum.BLUDGEONING;
                this.addWeaponProperty(WeaponPropertyEnum.LIGHT);
                break;
            }
            case WeaponEnum.DAGGER: {
                this.weaponCategory = WeaponCategoryEnum.SIMPLE_MELEE;
                this.price = 20;
                this.damageRoll = 4;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.LIGHT);
                this.addWeaponProperty(WeaponPropertyEnum.THROWN);
                this.addWeaponProperty(WeaponPropertyEnum.FINESSE);
                this.setRange(6, 18);
                break;
            }
            case WeaponEnum.GREATCLUB: {
                this.weaponCategory = WeaponCategoryEnum.SIMPLE_MELEE;
                this.price = 2;
                this.damageRoll = 8;
                this.damageType = DamageEnum.BLUDGEONING;
                this.addWeaponProperty(WeaponPropertyEnum.TWOHANDED);
                break;
            }
            case WeaponEnum.HANDAXE: {
                this.weaponCategory = WeaponCategoryEnum.SIMPLE_MELEE;
                this.price = 50;
                this.damageRoll = 6;
                this.damageType = DamageEnum.SLASHING;
                this.addWeaponProperty(WeaponPropertyEnum.LIGHT);
                this.addWeaponProperty(WeaponPropertyEnum.THROWN);
                this.setRange(6, 18);
                break;
            }
            case WeaponEnum.JAVELIN: {
                this.weaponCategory = WeaponCategoryEnum.SIMPLE_MELEE;
                this.price = 5;
                this.damageRoll = 6;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.THROWN);
                this.setRange(18, 36);
                break;
            }
            case WeaponEnum.LIGHTHAMMER: {
                this.weaponCategory = WeaponCategoryEnum.SIMPLE_MELEE;
                this.price = 20;
                this.damageRoll = 4;
                this.damageType = DamageEnum.BLUDGEONING;
                this.addWeaponProperty(WeaponPropertyEnum.LIGHT);
                this.addWeaponProperty(WeaponPropertyEnum.THROWN);
                this.setRange(6, 48);
                break;
            }
            case WeaponEnum.MACE: {
                this.weaponCategory = WeaponCategoryEnum.SIMPLE_MELEE;
                this.price = 50;
                this.damageRoll = 6;
                this.damageType = DamageEnum.BLUDGEONING;
                break;
            }
            case WeaponEnum.QUARTERSTAFF: {
                this.weaponCategory = WeaponCategoryEnum.SIMPLE_MELEE;
                this.price = 2;
                this.damageRoll = 6;
                this.damageType = DamageEnum.BLUDGEONING;
                this.addWeaponProperty(WeaponPropertyEnum.VERSATILE);
                this.versatileRoll = 8;
                break;
            }
            case WeaponEnum.SICKLE: {
                this.weaponCategory = WeaponCategoryEnum.SIMPLE_MELEE;
                this.price = 10;
                this.damageRoll = 4;
                this.damageType = DamageEnum.SLASHING;
                this.addWeaponProperty(WeaponPropertyEnum.LIGHT);
                break;
            }
            case WeaponEnum.SPEAR: {
                this.weaponCategory = WeaponCategoryEnum.SIMPLE_MELEE;
                this.price = 10;
                this.damageRoll = 6;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.THROWN);
                this.addWeaponProperty(WeaponPropertyEnum.VERSATILE);
                this.versatileRoll = 8;
                this.setRange(6, 18);
                break;
            }
            case WeaponEnum.LIGHTCROSSBOW: {
                this.weaponCategory = WeaponCategoryEnum.SIMPLE_RANGED;
                this.price = 250;
                this.damageRoll = 8;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.AMMUNITION);
                this.addWeaponProperty(WeaponPropertyEnum.LOADING);
                this.addWeaponProperty(WeaponPropertyEnum.TWOHANDED);
                this.setRange(24, 97);
                break;
            }
            case WeaponEnum.DART: {
                this.weaponCategory = WeaponCategoryEnum.SIMPLE_RANGED;
                this.price = .5;
                this.damageRoll = 4;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.FINESSE);
                this.addWeaponProperty(WeaponPropertyEnum.THROWN);
                this.setRange(6, 18);
                break;
            }
            case WeaponEnum.SHORTBOW: {
                this.weaponCategory = WeaponCategoryEnum.SIMPLE_RANGED;
                this.price = 250;
                this.damageRoll = 6;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.AMMUNITION);
                this.addWeaponProperty(WeaponPropertyEnum.TWOHANDED);
                this.setRange(24, 97);
                break;
            }
            case WeaponEnum.SLING: {
                this.weaponCategory = WeaponCategoryEnum.SIMPLE_RANGED;
                this.price = 1;
                this.damageRoll = 4;
                this.damageType = DamageEnum.BLUDGEONING;
                this.addWeaponProperty(WeaponPropertyEnum.AMMUNITION);
                this.setRange(18, 36);
                break;
            }
            case WeaponEnum.HANDGUN: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_RANGED;
                this.price = 400;
                this.damageRoll = 20;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.AMMUNITION);
                this.setRange(0, 100);
                break;
            }
            case WeaponEnum.BATTLEAXE: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_MELEE;
                this.price = 100;
                this.damageRoll = 8;
                this.damageType = DamageEnum.SLASHING;
                this.addWeaponProperty(WeaponPropertyEnum.VERSATILE);
                this.versatileRoll = 10;
                break;
            }
            case WeaponEnum.FLAIL: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_MELEE;
                this.price = 100;
                this.damageRoll = 8;
                this.damageType = DamageEnum.BLUDGEONING;
                break;
            }
            case WeaponEnum.GLAIVE: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_MELEE;
                this.price = 200;
                this.damageRoll = 10;
                this.damageType = DamageEnum.SLASHING;
                this.addWeaponProperty(WeaponPropertyEnum.HEAVY);
                this.addWeaponProperty(WeaponPropertyEnum.REACH);
                this.addWeaponProperty(WeaponPropertyEnum.TWOHANDED);
                break;
            }
            case WeaponEnum.GREATAXE: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_MELEE;
                this.price = 300;
                this.damageRoll = 12;
                this.damageType = DamageEnum.SLASHING;
                this.addWeaponProperty(WeaponPropertyEnum.HEAVY);
                this.addWeaponProperty(WeaponPropertyEnum.TWOHANDED);
                break;
            }
            case WeaponEnum.GREATSWORD: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_MELEE;
                this.price = 500;
                this.damageRoll = 6;
                this.damageType = DamageEnum.SLASHING;
                this.addWeaponProperty(WeaponPropertyEnum.HEAVY);
                this.addWeaponProperty(WeaponPropertyEnum.TWOHANDED);
                break;
            }
            case WeaponEnum.HALBERD: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_MELEE;
                this.price = 200;
                this.damageRoll = 10;
                this.damageType = DamageEnum.SLASHING;
                this.addWeaponProperty(WeaponPropertyEnum.HEAVY);
                this.addWeaponProperty(WeaponPropertyEnum.REACH);
                this.addWeaponProperty(WeaponPropertyEnum.TWOHANDED);
                break;
            }
            case WeaponEnum.LANCE: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_MELEE;
                this.price = 100;
                this.damageRoll = 12;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.REACH);
                this.addWeaponProperty(WeaponPropertyEnum.SPECIAL);
                break;
            }
            case WeaponEnum.LONGSWORD: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_MELEE;
                this.price = 150;
                this.damageRoll = 8;
                this.damageType = DamageEnum.SLASHING;
                this.addWeaponProperty(WeaponPropertyEnum.VERSATILE);
                this.versatileRoll = 10;
                break;
            }
            case WeaponEnum.MAUL: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_MELEE;
                this.price = 100;
                this.damageRoll = 6;
                this.damageType = DamageEnum.BLUDGEONING;
                this.addWeaponProperty(WeaponPropertyEnum.HEAVY);
                this.addWeaponProperty(WeaponPropertyEnum.TWOHANDED);
                break;
            }
            case WeaponEnum.MORNINGSTAR: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_MELEE;
                this.price = 159;
                this.damageRoll = 8;
                this.damageType = DamageEnum.PIERCING;
                break;
            }
            case WeaponEnum.PIKE: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_MELEE;
                this.price = 50;
                this.damageRoll = 10;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.HEAVY);
                this.addWeaponProperty(WeaponPropertyEnum.REACH);
                this.addWeaponProperty(WeaponPropertyEnum.TWOHANDED);
                break;
            }
            case WeaponEnum.RAPIER: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_MELEE;
                this.price = 250;
                this.damageRoll = 8;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.FINESSE);
                break;
            }
            case WeaponEnum.SCIMITAR: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_MELEE;
                this.price = 250;
                this.damageRoll = 6;
                this.damageType = DamageEnum.SLASHING;
                this.addWeaponProperty(WeaponPropertyEnum.FINESSE);
                this.addWeaponProperty(WeaponPropertyEnum.LIGHT);
                break;
            }
            case WeaponEnum.SHORTSWORD: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_MELEE;
                this.price = 100;
                this.damageRoll = 6;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.FINESSE);
                this.addWeaponProperty(WeaponPropertyEnum.LIGHT);
                break;
            }
            case WeaponEnum.TRIDENT: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_MELEE;
                this.price = 50;
                this.damageRoll = 6;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.THROWN);
                this.addWeaponProperty(WeaponPropertyEnum.VERSATILE);
                this.versatileRoll = 8;
                this.setRange(6, 18);
                break;
            }
            case WeaponEnum.WARPICK: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_MELEE;
                this.price = 50;
                this.damageRoll = 8;
                this.damageType = DamageEnum.PIERCING;
                break;
            }
            case WeaponEnum.WARHAMMER: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_MELEE;
                this.price = 150;
                this.damageRoll = 8;
                this.damageType = DamageEnum.BLUDGEONING;
                this.addWeaponProperty(WeaponPropertyEnum.VERSATILE);
                this.versatileRoll = 10;
                break;
            }
            case WeaponEnum.WHIP: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_MELEE;
                this.price = 20;
                this.damageRoll = 4;
                this.damageType = DamageEnum.SLASHING;
                this.addWeaponProperty(WeaponPropertyEnum.FINESSE);
                this.addWeaponProperty(WeaponPropertyEnum.REACH);
                break;
            }
            case WeaponEnum.BLOWGUN: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_RANGED;
                this.price = 100;
                this.damageRoll = 1;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.LOADING);
                this.setRange(7, 30);
                break;
            }
            case WeaponEnum.HANDCROSSBOW: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_RANGED;
                this.price = 750;
                this.damageRoll = 6;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.LIGHT);
                this.addWeaponProperty(WeaponPropertyEnum.LOADING);
                this.setRange(9, 36);
                break;
            }
            case WeaponEnum.HEAVYCROSSBOW: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_RANGED;
                this.price = 500;
                this.damageRoll = 10;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.HEAVY);
                this.addWeaponProperty(WeaponPropertyEnum.LOADING);
                this.addWeaponProperty(WeaponPropertyEnum.TWOHANDED);
                this.setRange(30, 122);
                break;
            }
            case WeaponEnum.LONGBOW: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_RANGED;
                this.price = 500;
                this.damageRoll = 8;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.HEAVY);
                this.addWeaponProperty(WeaponPropertyEnum.TWOHANDED);
                this.setRange(45, 183);
                break;
            }
            case WeaponEnum.NET: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_RANGED;
                this.price = 10;
                this.damageRoll = 0;
                this.damageType = DamageEnum.NONE;
                this.addWeaponProperty(WeaponPropertyEnum.SPECIAL);
                this.addWeaponProperty(WeaponPropertyEnum.THROWN);
                this.setRange(1, 4);
                break;
            }
            case WeaponEnum.RIFLE: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_RANGED;
                this.price = 1400;
                this.damageRoll = 50;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.LOADING);
                this.addWeaponProperty(WeaponPropertyEnum.HEAVY);
                this.addWeaponProperty(WeaponPropertyEnum.TWOHANDED);
                this.setRange(1, 600);
                break;
            }
            case WeaponEnum.SHOTGUN: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_RANGED;
                this.price = 500;
                this.damageRoll = 25;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.HEAVY);
                this.addWeaponProperty(WeaponPropertyEnum.LOADING);
                this.addWeaponProperty(WeaponPropertyEnum.TWOHANDED);
                this.setRange(1, 45);
                break;
            }
            default: {
                this.weaponType = WeaponEnum.NONE;
                this.weaponCategory = WeaponCategoryEnum.SIMPLE_MELEE;
                this.damageType = DamageEnum.BLUDGEONING;
                this.damageRoll = 1;
            }
        }
    }
    setWeaponCategory(weaponCategory) {
        if (!WeaponCategoryEnum.properties.hasOwnProperty(weaponCategory)) {
            weaponCategory = WeaponEnum.SIMPLE_MELEE;
        }
        this.weaponCategory = weaponCategory;
    }
    getWeaponCategory() {
        return this.weaponCategory;
    }
    setRange(min = 0, max = 0) {
        this.range[0] = min;
        this.range[1] = max;
        return this;
    }
    getRange() {
        return this.range;
    }

    getDamageType() {
        return this.damageType;
    }
    getDamageRoll() {
        return (this.damageRoll + this.damageRollModifier);
    }
    getDamageRollCount() {
        return (this.damageRollCount + this.damageRollCountModifier);
    }

    setWeaponType(weaponType) {
        if (!WeaponEnum.properties.hasOwnProperty(weaponType)) {
            weaponType = WeaponEnum.CLUB; // Everything can be a club :v
        }
        this.weaponType = weaponType;
    }
    getWeaponType() {
        return this.weaponType;
    }

    addWeaponProperty(weaponProperty) {
        weaponProperty = Tools.filterEnum(weaponProperty, WeaponPropertyEnum, true);
        if (weaponProperty == -1) {
            return 1;
        }
        this.weaponProperties[weaponProperty] = true;
        return 0;
    }
    removeWeaponProperty(weaponProperty) {
        weaponProperty = Tools.filterEnum(weaponProperty, WeaponPropertyEnum, true);
        if (weaponProperty == -1) {
            return 1;
        }
        delete this.weaponProperties[weaponProperty];
        return 0;
    }
    hasWeaponProperty(weaponProperty) {
        return this.weaponProperties.hasOwnProperty(weaponProperty);
    }
    getWeaponProperties() {
        return this.weaponProperties;
    }
    clearWeaponProperties() {
        for (weaponProperty in this.weaponProperties) {
            this.removeWeaponProperty(weaponProperty);
        }
        return 0;
    }

    isAmmunition() {
        return this.hasWeaponProperty(WeaponPropertyEnum.AMMUNITION);
    }
    isFinesse() {
        return this.hasWeaponProperty(WeaponPropertyEnum.FINESSE);
    }
    isHeavy() {
        return this.hasWeaponProperty(WeaponPropertyEnum.HEAVY);
    }
    isLight() {
        return this.hasWeaponProperty(WeaponPropertyEnum.LIGHT);
    }
    isLoading() {
        return this.hasWeaponProperty(WeaponPropertyEnum.LOADING);
    }
    isRange() {
        return this.isAmmunition() || this.isThrown();
    }
    isReach() {
        return this.hasWeaponProperty(WeaponPropertyEnum.REACH);
    }
    isSpecial() {
        return this.hasWeaponProperty(WeaponPropertyEnum.SPECIAL);
    }
    isThrown() {
        return this.hasWeaponProperty(WeaponPropertyEnum.THROWN);
    }
    isTwoHanded() {
        return this.hasWeaponProperty(WeaponPropertyEnum.TWOHANDED);
    }
    isVersatile() {
        return this.hasWeaponProperty(WeaponPropertyEnum.VERSATILE);
    }
    isSilvered() {
        return (this.silvered || this.silveredModifier);
    }

    resetModifiers() {
        super.resetModifiers();
        this.damageRollCountModifier = 0;
        this.damageRollModifier = 0;
        this.silveredModifier = false;
    }

    /**
     * Overrides EquipmentEntity.clone
     * @param  {string} id ID
     * @return {WeaponEntity} new WeaponEntity
     */
    clone(id = "") {
        let clone = new WeaponEntity(id, this.name, this.description, this.icon, this.equipmentSlot);
        clone.assign(this);
        return clone;
    }
    /**
     * Overrides EquipmentEntity.createInstance
     * @param  {string} id ID
     * @return {InstancedWeaponEntity} new InstancedWeaponEntity
     */
    createInstance(id = "") {
        return new InstancedWeaponEntity(id, this);
    }
    /**
     * Clones the entity's values over this
     * @param {WeaponEntity} entity 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(entity, verify = true) {
        if (verify && !(entity instanceof WeaponEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        if (entity.hasOwnProperty("equipmentSlot")) this.equipmentSlot = entity.equipmentSlot;
        if (entity.hasOwnProperty("weaponCategory")) this.weaponCategory = entity.weaponCategory;
        if (entity.hasOwnProperty("weaponType")) this.weaponType = entity.weaponType;
        if (entity.hasOwnProperty("damageRollCount")) this.damageRollCount = entity.damageRollCount;
        if (entity.hasOwnProperty("damageRollCountModifier")) this.damageRollCountModifier = entity.damageRollCountModifier;
        if (entity.hasOwnProperty("damageRoll")) this.damageRoll = entity.damageRoll;
        if (entity.hasOwnProperty("damageRollModifier")) this.damageRollModifier = entity.damageRollModifier;
        if (entity.hasOwnProperty("damageType")) this.damageType = entity.damageType;
        if (entity.hasOwnProperty("silvered")) this.silvered = entity.silvered;
        if (entity.hasOwnProperty("silveredModifier")) this.silveredModifier = entity.silveredModifier;
        if (entity.hasOwnProperty("range")) this.range = entity.range;
        if (entity.hasOwnProperty("versatileRollCount")) this.versatileRollCount = entity.versatileRollCount;
        if (entity.hasOwnProperty("versatileRoll")) this.versatileRoll = entity.versatileRoll;
        if (entity.hasOwnProperty("weaponProperties")) {
            
        }
        
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        WeaponEntity.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        WeaponEntity.remove(this.id);
        return undefined;
    }
    getClassName() {
        return "WeaponEntity";
    }

    static initialize() {
        WeaponEntity.weaponEntityList = {};
        let weaponHand = new WeaponEntity("weaponHand", "Hand", "A hand.", "missingIcon", WeaponEnum.NONE);
        weaponHand.setMeshIDs(["missingMesh"]);
        weaponHand.setMaterialID("collisionMaterial");
        let weaponClaw = new WeaponEntity("weaponClaw", "Claw", "A clawed hand.", "missingIcon", WeaponEnum.DAGGER);
        weaponClaw.setMeshIDs(["missingMesh"]);
        weaponClaw.setMaterialID("collisionMaterial");
        let weaponPaw = new WeaponEntity("weaponPaw", "Paw", "A paw.", "missingIcon", WeaponEnum.NONE);
        weaponPaw.setMeshIDs(["missingMesh"]);
        weaponPaw.setMaterialID("collisionMaterial");
        let weaponHoof = new WeaponEntity("weaponHoof", "Hoof", "A hoof.", "missingIcon", WeaponEnum.GREATCLUB);
        weaponHoof.setMeshIDs(["missingMesh"]);
        weaponHoof.setMaterialID("collisionMaterial");
    }
    static get(id) {
        if (WeaponEntity.has(id)) {
            return WeaponEntity.weaponEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return WeaponEntity.weaponEntityList.hasOwnProperty(id);
    }
    static set(id, weaponEntity) {
        WeaponEntity.weaponEntityList[id] = weaponEntity;
        return 0;
    }
    static remove(id) {
        delete WeaponEntity.weaponEntityList[id];
        return 0;
    }
    static list() {
        return WeaponEntity.weaponEntityList;
    }
    static clear() {
        for (let i in WeaponEntity.weaponEntityList) {
            WeaponEntity.weaponEntityList[i].dispose();
        }
        WeaponEntity.weaponEntityList = {};
        return 0;
    }
    static toJSON(entity) {
        if (entity instanceof WeaponEntity) {}
        else if (WeaponEntity.has(entity)) {
            entity = WeaponEntity.get(entity);
        }
        else {
            return null;
        }
        let jsonObject = JSON.parse(JSON.stringify(entity));
        return JSON.stringify(jsonObject);
    }
    static fromJSON(json) {
        if (typeof json == "string") {
            console.group(`Running WeaponEntity.fromJSON(${json.slice(0,12)}...)`);
            json = JSON.parse(json);
        }
        else {
            console.group("Running WeaponEntity.fromJSON(...)");
        }
        if (!(json instanceof Object) || !json.hasOwnProperty("id") || !json.hasOwnProperty("name")) {
            console.warn(`Supplied JSON was not valid.`);
            console.groupEnd();
            return 2;
        }
        console.info("Supplied JSON was valid.");
        let entity = new WeaponEntity(json.id, json.name, json.description, json.iconID, json.weaponType);
        if (!(entity instanceof WeaponEntity)) {
            console.warn(`Could not create a new WeaponEntity`);
            console.groupEnd();
            return 1;
        }
        entity.assign(json);
        console.info(`WeaponEntity (${entity.getID()}) has been created.`);
        console.groupEnd();
        return entity;
    }
    static updateID(oldID, newID) {
        if (!WeaponEntity.has(oldID)) {
            return 1;
        }
        WeaponEntity.set(newID, WeaponEntity.get(oldID));
        WeaponEntity.remove(oldID);
        return 0;
    }
}
WeaponEntity.initialize();