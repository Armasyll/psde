class WeaponEntity extends EquipmentEntity {
    /**
     * Creats Weapon
     * @param  {String}  _id          Unique ID
     * @param  {String}  _name        Name
     * @param  {String}  _description Description
     * @param  {String}  _image       Image ID
     * @param  {String}  _type        weaponType
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _type = WeaponEnum.CLUB) {
        super(_id, _name, _description, _image);
        this.itemType = ItemEnum.WEAPON;

        this.equipmentSlot = ApparelSlotEnum.HANDS;
        this.weaponType = WeaponEnum.CLUB;
        this.damageRollCount = 1;
        this.damageRoll = 0;
        this.damageType = DamageEnum.NONE;
        this.weaponProperties = new Set();
        this.silvered = false;
        this.thrownRange = [0,0];
        this.ammunitionRange = [0,0]
        this.versatileRollCount = 1;
        this.versatileRoll = 0;

        this.setWeaponType(_type);

        Game.setWeaponEntity(this.id, this);
    }

    _generateProperties() {
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
    setThrownRange(_min = 0, _max = 0) {
        this.thrownRange[0] = _min;
        this.thrownRange[1] = _max;
        return this;
    }
    getAmmunitionRange() {
        return this.thrownRange;
    }
    setAmmunitionRange(_min = 0, _max = 0) {
        this.ammunitionRange[0] = _min;
        this.ammunitionRange[1] = _max;
        return this;
    }
    getAmmunitionRange() {
        return this.ammunitionRange;
    }

    setWeaponType(_type) {
        if (typeof _type == "string") {
            _type = _type.toUpperCase();
            if (!WeaponEnum.hasOwnProperty(_type)) {
                _type = WeaponEnum.CLUB;
            }
            else {
                _type = WeaponEnum[_type];
            }
        }
        else if (!WeaponEnum.properties.hasOwnProperty(_type)) {
            _type = WeaponEnum.CLUB; // Everything can be a club :v
        }
        this.weaponType = _type;
        this._generateProperties();
    }
    getWeaponType() {
        return this.weaponType;
    }
    addWeaponProperty(_int) {
        if (typeof _int == "string") {
            _int = _int.toUpperCase();
            if (!WeaponPropertiesEnum.hasOwnProperty(_int)) {
                return this;
            }
            else {
                _int = WeaponPropertiesEnum[_int];
            }
        }
        else if (!WeaponPropertiesEnum.properties.hasOwnProperty(_int)) {
            return this;
        }
        this.weaponProperties.add(_int);
    }
    getWeaponProperties() {
        return Array.from(this.weaponProperties);
    }

    /**
     * Overrides EquipmentEntity.clone
     * @param  {string} _id ID
     * @return {ClothingEntity}     new WeaponEntity
     */
    clone(_id = undefined) {
        _id = Tools.filterID(_id);
        if (typeof _id != "string") {
            _id = Tools.genUUIDv4();
        }
        var _itemEntity = new WeaponEntity(_id, this.name, this.description, this.image, this.equipmentSlot);
        // variables from AbstractEntity
        _itemEntity.availableActions = Object.assign({}, this.availableActions);
        _itemEntity.hiddenAvailableActions = Object.assign({}, this.hiddenAvailableActions);
        _itemEntity.specialProperties = new Set(this.specialProperties);
        _itemEntity.defaultAction = this.defaultAction;
        // variables from Entity
        _itemEntity.weight.copyFrom(this.weight);
        _itemEntity.price.copyFrom(this.price);
        _itemEntity.health.copyFrom(this.health);
        // variables from ItemEntity
        _itemType.setItemType(this.itemType);
        // variables from EquipmentEntity
        _itemType.setEquipmentSlot(this.equipmentSlot);
        return _itemEntity;
    }
    /**
     * Overrides EquipmentEntity.createInstance
     * @param  {string} _id ID
     * @return {InstancedWeaponEntity}     new InstancedWeaponEntity
     */
    createInstance(_id = undefined) {
        _id = Tools.filterID(_id);
        if (typeof _id != "string") {
            _id = Tools.genUUIDv4();
        }
        return new InstancedWeaponEntity(_id, this);
    }
    dispose() {
        Game.removeWeaponEntity(this.id);
        super.dispose();
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}