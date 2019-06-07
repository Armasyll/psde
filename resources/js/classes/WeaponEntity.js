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
        this.weaponType = WeaponEnum.CLUB;
        this.damageRollCount = 1;
        this.damageRoll = 1;
        this.damageType = DamageEnum.NONE;
        this.weaponProperties = new Set();
        this.silvered = false;
        this.thrownRange = [0,0];
        this.ammunitionRange = [0,0]
        this.versatileRollCount = 1;
        this.versatileRoll = 0;

        this.setWeaponType(weaponType);
        this.generateProperties();

        Game.setWeaponEntity(this.id, this);
    }

    generateProperties() {
        switch (this.weaponType) {
            case WeaponEnum.NONE: {
                this.damageType = DamageEnum.NONE;
                break;
            }
            case WeaponEnum.CLUB: {
                this.damageRoll = 4;
                this.damageType = DamageEnum.BLUDGEONING;
                this.addWeaponProperty(WeaponEnum.LIGHT);
                break;
            }
            case WeaponEnum.DAGGER: {
                this.damageRoll = 4;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponEnum.LIGHT);
                this.addWeaponProperty(WeaponEnum.THROWN);
                this.addWeaponProperty(WeaponEnum.FINESSE);
                this.setThrownRange(6, 18);
                break;
            }
            case WeaponEnum.GREATCLUB: {
                this.damageRoll = 8;
                this.damageType = DamageEnum.BLUDGEONING;
                this.addWeaponProperty(WeaponEnum.TWOHANDED);
                break;
            }
            case WeaponEnum.HANDAXE: {
                this.damageRoll = 6;
                this.damageType = DamageEnum.SLASHING;
                this.addWeaponProperty(WeaponEnum.LIGHT);
                this.addWeaponProperty(WeaponEnum.THROWN);
                this.setThrownRange(6, 18);
                break;
            }
            case WeaponEnum.JAVELIN: {
                this.damageRoll = 6;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponEnum.THROWN);
                this.setThrownRange(18, 36);
                break;
            }
            case WeaponEnum.LIGHTHAMMER: {
                this.damageRoll = 4;
                this.damageType = DamageEnum.BLUDGEONING;
                this.addWeaponProperty(WeaponEnum.LIGHT);
                this.addWeaponProperty(WeaponEnum.THROWN);
                this.setThrownRange(6, 48);
                break;
            }
            case WeaponEnum.MACE: {
                this.damageRoll = 6;
                this.damageType = DamageEnum.BLUDGEONING;
                break;
            }
            case WeaponEnum.QUARTERSTAFF: {
                this.damageRoll = 6;
                this.damageType = DamageEnum.BLUDGEONING;
                this.addWeaponProperty(WeaponEnum.VERSATILE);
                this.versatileRoll = 8;
                break;
            }
            case WeaponEnum.SICKLE: {
                this.damageRoll = 4; this.damageType = DamageEnum.SLASHING; this.addWeaponProperty(WeaponEnum.LIGHT);
                break;
            }
            case WeaponEnum.SPEAR: {
                this.damageRoll = 6;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponEnum.THROWN);
                this.addWeaponProperty(WeaponEnum.VERSATILE);
                this.versatileRoll = 8;
                this.setThrownRange(6, 18);
                break;
            }
            case WeaponEnum.LIGHTCROSSBOW: {
                this.damageRoll = 8;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponEnum.AMMUNITION);
                this.addWeaponProperty(WeaponEnum.LOADING);
                this.addWeaponProperty(WeaponEnum.TWOHANDED);
                this.setThrownRange(24, 97);
                break;
            }
            case WeaponEnum.DART: {
                this.damageRoll = 4;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponEnum.FINESSE);
                this.addWeaponProperty(WeaponEnum.THROWN);
                this.setThrownRange(6, 18);
                break;
            }
            case WeaponEnum.SHORTBOW: {
                this.damageRoll = 6;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponEnum.AMMUNITION);
                this.addWeaponProperty(WeaponEnum.TWOHANDED);
                this.setThrownRange(24, 97);
                break;
            }
            case WeaponEnum.SLING: {
                this.damageRoll = 4;
                this.damageType = DamageEnum.BLUDGEONING;
                this.addWeaponProperty(WeaponEnum.AMMUNITION);
                this.setThrownRange(18, 36);
                break;
            }
            case WeaponEnum.HANDGUN: {
                this.damageRoll = 20;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponEnum.AMMUNITION);
                this.setAmmunitionRange(0, 100);
                break;
            }
            case WeaponEnum.BATTLEAXE: {
                this.damageRoll = 8;
                this.damageType = DamageEnum.SLASHING;
                this.addWeaponProperty(WeaponEnum.VERSATILE);
                this.versatileRoll = 10;
                break;
            }
            case WeaponEnum.FLAIL: {
                this.damageRoll = 8;
                this.damageType = DamageEnum.BLUDGEONING;
                break;
            }
            case WeaponEnum.GLAIVE: {
                this.damageRoll = 10;
                this.damageType = DamageEnum.SLASHING;
                this.addWeaponProperty(WeaponEnum.HEAVY);
                this.addWeaponProperty(WeaponEnum.REACH);
                this.addWeaponProperty(WeaponEnum.TWOHANDED);
                break;
            }
            case WeaponEnum.GREATAXE: {
                this.damageRoll = 12;
                this.damageType = DamageEnum.SLASHING;
                this.addWeaponProperty(WeaponEnum.HEAVY);
                this.addWeaponProperty(WeaponEnum.TWOHANDED);
                break;
            }
            case WeaponEnum.GREATSWORD: {
                this.damageRoll = 6;
                this.damageType = DamageEnum.SLASHING;
                this.addWeaponProperty(WeaponEnum.HEAVY);
                this.addWeaponProperty(WeaponEnum.TWOHANDED);
                break;
            }
            case WeaponEnum.HALBERD: {
                this.damageRoll = 10;
                this.damageType = DamageEnum.SLASHING;
                this.addWeaponProperty(WeaponEnum.HEAVY);
                this.addWeaponProperty(WeaponEnum.REACH);
                this.addWeaponProperty(WeaponEnum.TWOHANDED);
                break;
            }
            case WeaponEnum.LANCE: {
                this.damageRoll = 12;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponEnum.REACH);
                this.addWeaponProperty(WeaponEnum.SPECIAL);
                break;
            }
            case WeaponEnum.LONGSWORD: {
                this.damageRoll = 8;
                this.damageType = DamageEnum.SLASHING;
                this.addWeaponProperty(WeaponEnum.VERSATILE);
                this.versatileRoll = 10;
                break;
            }
            case WeaponEnum.MAUL: {
                this.damageRoll = 6;
                this.damageType = DamageEnum.BLUDGEONING;
                this.addWeaponProperty(WeaponEnum.HEAVY);
                this.addWeaponProperty(WeaponEnum.TWOHANDED);
                break;
            }
            case WeaponEnum.MORNINGSTAR: {
                this.damageRoll = 8;
                this.damageType = DamageEnum.PIERCING;
                break;
            }
            case WeaponEnum.PIKE: {
                this.damageRoll = 10;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponEnum.HEAVY);
                this.addWeaponProperty(WeaponEnum.REACH);
                this.addWeaponProperty(WeaponEnum.TWOHANDED);
                break;
            }
            case WeaponEnum.RAPIER: {
                this.damageRoll = 8;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponEnum.FINESSE);
                break;
            }
            case WeaponEnum.SCIMITAR: {
                this.damageRoll = 6;
                this.damageType = DamageEnum.SLASHING;
                this.addWeaponProperty(WeaponEnum.FINESSE);
                this.addWeaponProperty(WeaponEnum.LIGHT);
                break;
            }
            case WeaponEnum.SHORTSWORD: {
                this.damageRoll = 6;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponEnum.FINESSE);
                this.addWeaponProperty(WeaponEnum.LIGHT);
                break;
            }
            case WeaponEnum.TRIDENT: {
                this.damageRoll = 6;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponEnum.THROWN);
                this.addWeaponProperty(WeaponEnum.VERSATILE);
                this.versatileRoll = 8;
                this.setThrownRange(6, 18);
                break;
            }
            case WeaponEnum.WARPICK: {
                this.damageRoll = 8;
                this.damageType = DamageEnum.PIERCING;
                break;
            }
            case WeaponEnum.WARHAMMER: {
                this.damageRoll = 8;
                this.damageType = DamageEnum.BLUDGEONING;
                this.addWeaponProperty(WeaponEnum.VERSATILE);
                this.versatileRoll = 10;
                break;
            }
            case WeaponEnum.WHIP: {
                this.damageRoll = 4;
                this.damageType = DamageEnum.SLASHING;
                this.addWeaponProperty(WeaponEnum.FINESSE);
                this.addWeaponProperty(WeaponEnum.REACH);
                break;
            }
            case WeaponEnum.BLOWGUN: {
                this.damageRoll = 1;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponEnum.LOADING);
                this.setAmmunitionRange(7, 30);
                break;
            }
            case WeaponEnum.HANDCROSSBOW: {
                this.damageRoll = 6;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponEnum.LIGHT);
                this.addWeaponProperty(WeaponEnum.LOADING);
                this.setAmmunitionRange(9, 36);
                break;
            }
            case WeaponEnum.HEAVYCROSSBOW: {
                this.damageRoll = 10;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponEnum.HEAVY);
                this.addWeaponProperty(WeaponEnum.LOADING);
                this.addWeaponProperty(WeaponEnum.TWOHANDED);
                this.setAmmunitionRange(30, 122);
                break;
            }
            case WeaponEnum.LONGBOW: {
                this.damageRoll = 8;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponEnum.HEAVY);
                this.addWeaponProperty(WeaponEnum.TWOHANDED);
                this.setAmmunitionRange(45, 183);
                break;
            }
            case WeaponEnum.NET: {
                this.damageRoll = 0;
                this.damageType = DamageEnum.NONE;
                this.addWeaponProperty(WeaponEnum.SPECIAL);
                this.addWeaponProperty(WeaponEnum.THROWN);
                this.setThrownRange(1, 4);
                break;
            }
            case WeaponEnum.RIFLE: {
                this.damageRoll = 50;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponEnum.LOADING);
                this.addWeaponProperty(WeaponEnum.HEAVY);
                this.addWeaponProperty(WeaponEnum.TWOHANDED);
                this.setAmmunitionRange(1, 600);
                break;
            }
            case WeaponEnum.SHOTGUN: {
                this.damageRoll = 25;
                this.damageType = DamageEnum.PIERCING;
                this.addWeaponProperty(WeaponEnum.HEAVY);
                this.addWeaponProperty(WeaponEnum.LOADING);
                this.addWeaponProperty(WeaponEnum.TWOHANDED);
                this.setAmmunitionRange(1, 45);
                break;
            }
            default: {
                
            }
        }
    }
    setThrownRange(min = 0, max = 0) {
        this.thrownRange[0] = min;
        this.thrownRange[1] = max;
        return this;
    }
    getAmmunitionRange() {
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
        return this.damageRoll;
    }
    getDamageRollCount() {
        return this.damageRollCount;
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
        if (!WeaponPropertiesEnum.properties.hasOwnProperty(weaponProperty)) {
            return 2;
        }
        this.weaponProperties.add(weaponProperty);
        return 0;
    }
    addWeaponProperty(weaponProperty) {
        if (!WeaponPropertiesEnum.properties.hasOwnProperty(weaponProperty)) {
            return 2;
        }
        this.weaponProperties.remove(weaponProperty);
        return 0;
    }
    getWeaponProperties() {
        return Array.from(this.weaponProperties);
    }

    /**
     * Overrides EquipmentEntity.clone
     * @param  {string} id ID
     * @return {ClothingEntity}     new WeaponEntity
     */
    clone(id = undefined) {
        id = Tools.filterID(id);
        if (typeof id != "string") {
            id = Tools.genUUIDv4();
        }
        var weaponEntity = new WeaponEntity(id, this.name, this.description, this.icon, this.equipmentSlot);
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
    createInstance(id = undefined) {
        id = Tools.filterID(id);
        if (typeof id != "string") {
            id = Tools.genUUIDv4();
        }
        return new InstancedWeaponEntity(id, this);
    }
    dispose() { // TODO: what about the instances :v
        this.weaponProperties.clear();
        Game.removeWeaponEntity(this.id);
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}