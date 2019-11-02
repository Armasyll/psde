class WeaponEntity extends EquipmentEntity {
    /**
     * Creats Weapon
     * @param  {string}  id          Unique ID
     * @param  {string}  name        Name
     * @param  {string}  description Description
     * @param  {string}  iconID       Image ID
     * @param  {WeaponEnum}  weaponType        weaponType
     */
    constructor(id = undefined, name = undefined, description = undefined, iconID = undefined, weaponType = WeaponEnum.CLUB) {
        super(id, name, description, iconID);
        this.itemType = ItemEnum.WEAPON;

        this.equipmentSlot = ApparelSlotEnum.HANDS;
        this.weaponCategory = WeaponCategoryEnum.SIMPLE_MELEE;
        this.weaponType = WeaponEnum.CLUB;
        this.damageRollCount = 1;
        this.damageRollCountOffset = 0;
        this.damageRoll = 1;
        this.damageRollOffset = 0;
        this.damageType = DamageEnum.NONE;
        this.weaponProperties = new Set();
        this.silvered = false;
        this.silveredOffset = false;
        this.thrownRange = [0,0];
        this.ammunitionRange = [0,0]
        this.versatileRollCount = 1;
        this.versatileRoll = 0;

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
                this.setThrownRange(6, 18);
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
                this.setThrownRange(6, 18);
                break;
            }
            case WeaponEnum.JAVELIN: {
                this.weaponCategory = WeaponCategoryEnum.SIMPLE_MELEE;
                this.price = 5;
                this.damageRoll = 6;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.THROWN);
                this.setThrownRange(18, 36);
                break;
            }
            case WeaponEnum.LIGHTHAMMER: {
                this.weaponCategory = WeaponCategoryEnum.SIMPLE_MELEE;
                this.price = 20;
                this.damageRoll = 4;
                this.damageType = DamageEnum.BLUDGEONING;
                this.addWeaponProperty(WeaponPropertyEnum.LIGHT);
                this.addWeaponProperty(WeaponPropertyEnum.THROWN);
                this.setThrownRange(6, 48);
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
                this.setThrownRange(6, 18);
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
                this.setThrownRange(24, 97);
                break;
            }
            case WeaponEnum.DART: {
                this.weaponCategory = WeaponCategoryEnum.SIMPLE_RANGED;
                this.price = .5;
                this.damageRoll = 4;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.FINESSE);
                this.addWeaponProperty(WeaponPropertyEnum.THROWN);
                this.setThrownRange(6, 18);
                break;
            }
            case WeaponEnum.SHORTBOW: {
                this.weaponCategory = WeaponCategoryEnum.SIMPLE_RANGED;
                this.price = 250;
                this.damageRoll = 6;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.AMMUNITION);
                this.addWeaponProperty(WeaponPropertyEnum.TWOHANDED);
                this.setThrownRange(24, 97);
                break;
            }
            case WeaponEnum.SLING: {
                this.weaponCategory = WeaponCategoryEnum.SIMPLE_RANGED;
                this.price = 1;
                this.damageRoll = 4;
                this.damageType = DamageEnum.BLUDGEONING;
                this.addWeaponProperty(WeaponPropertyEnum.AMMUNITION);
                this.setThrownRange(18, 36);
                break;
            }
            case WeaponEnum.HANDGUN: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_RANGED;
                this.price = 400;
                this.damageRoll = 20;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.AMMUNITION);
                this.setAmmunitionRange(0, 100);
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
                this.setThrownRange(6, 18);
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
                this.setAmmunitionRange(7, 30);
                break;
            }
            case WeaponEnum.HANDCROSSBOW: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_RANGED;
                this.price = 750;
                this.damageRoll = 6;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.LIGHT);
                this.addWeaponProperty(WeaponPropertyEnum.LOADING);
                this.setAmmunitionRange(9, 36);
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
                this.setAmmunitionRange(30, 122);
                break;
            }
            case WeaponEnum.LONGBOW: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_RANGED;
                this.price = 500;
                this.damageRoll = 8;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponPropertyEnum.HEAVY);
                this.addWeaponProperty(WeaponPropertyEnum.TWOHANDED);
                this.setAmmunitionRange(45, 183);
                break;
            }
            case WeaponEnum.NET: {
                this.weaponCategory = WeaponCategoryEnum.MARTIAL_RANGED;
                this.price = 10;
                this.damageRoll = 0;
                this.damageType = DamageEnum.NONE;
                this.addWeaponProperty(WeaponPropertyEnum.SPECIAL);
                this.addWeaponProperty(WeaponPropertyEnum.THROWN);
                this.setThrownRange(1, 4);
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
                this.setAmmunitionRange(1, 600);
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
                this.setAmmunitionRange(1, 45);
                break;
            }
            default: {
                this.weaponType = WeaponEnum.CLUB;
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
    setThrownRange(min = 0, max = 0) {
        this.thrownRange[0] = min;
        this.thrownRange[1] = max;
        return this;
    }
    getThrownRange() {
        return this.thrownRange;
    }
    setAmmunitionRange(min = 0, max = 0) {
        this.ammunitionRange[0] = min;
        this.ammunitionRange[1] = max;
        return this;
    }
    getAmmunitionRange() {
        return this.ammunitionRange;
    }

    getDamageType() {
        return this.damageType;
    }
    getDamageRoll() {
        return (this.damageRoll + this.damageRollOffset);
    }
    getDamageRollCount() {
        return (this.damageRollCount + this.damageRollCountOffset);
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
        if (!WeaponPropertyEnum.properties.hasOwnProperty(weaponProperty)) {
            return 2;
        }
        this.weaponProperties.add(weaponProperty);
        return 0;
    }
    addWeaponProperty(weaponProperty) {
        if (!WeaponPropertyEnum.properties.hasOwnProperty(weaponProperty)) {
            return 2;
        }
        this.weaponProperties.delete(weaponProperty);
        return 0;
    }
    getWeaponProperties() {
        return Array.from(this.weaponProperties);
    }
    isSilvered() {
        return (this.silvered || this.silveredOffset);
    }

    resetOffsets() {
        super.resetOffsets();
        this.damageRollCountOffset = 0;
        this.damageRollOffset = 0;
        this.silveredOffset = false;
    }

    /**
     * Overrides EquipmentEntity.clone
     * @param  {string} id ID
     * @return {ClothingEntity}     new WeaponEntity
     */
    clone(id = "") {
        let weaponEntity = new WeaponEntity(id, this.name, this.description, this.icon, this.equipmentSlot);
        // variables from AbstractEntity
        weaponEntity.availableActions = Object.assign({}, this.availableActions);
        weaponEntity.hiddenAvailableActions = Object.assign({}, this.hiddenAvailableActions);
        weaponEntity.specialProperties = new Set(this.specialProperties);
        weaponEntity.defaultAction = this.defaultAction;
        // variables from Entity
        weaponEntity.weight.copyFrom(this.weight);
        weaponEntity.price.copyFrom(this.price);
        weaponEntity.health.copyFrom(this.health);
        // variables from ItemEntity
        weaponEntity.setItemType(this.itemType);
        // variables from EquipmentEntity
        weaponEntity.setEquipmentSlot(this.equipmentSlot);
        return weaponEntity;
    }
    /**
     * Overrides EquipmentEntity.createInstance
     * @param  {string} id ID
     * @return {InstancedWeaponEntity}     new InstancedWeaponEntity
     */
    createInstance(id = "") {
        let instance = new InstancedWeaponEntity(id, this);
        this.instances[instance.getID()] = instance;
        return instance;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        this.weaponProperties.clear();
        WeaponEntity.remove(this.id);
        return undefined;
    }

    static initialize() {
        WeaponEntity.weaponEntityList = {};
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
    static clear() {
        for (let i in WeaponEntity.weaponEntityList) {
            WeaponEntity.weaponEntityList[i].dispose();
        }
        WeaponEntity.weaponEntityList = {};
        return 0;
    }
}
WeaponEntity.initialize();