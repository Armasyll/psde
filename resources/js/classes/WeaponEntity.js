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
        this.physicalDamage = new BoundedNumber(0, 0, Number.MAX_SAFE_INTEGER - 1);
        this.magickDamage = new BoundedNumber(0, 0, Number.MAX_SAFE_INTEGER - 1);

        this.setWeaponType(_type);

        Game.setWeaponEntity(this.id, this);
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
            _type = WeaponEnum.CLUB;
        }
        this.weaponType = _type;
    }
    getWeaponType() {
        return this.weaponType;
    }
    getPhysicalDamage() {
        return this.physicalDamage.getValue();
    }
    setPhysicalDamage(_int) {
        this.physicalDamage.setValue(_int);
        return this;
    }
    getMagickDamage() {
        return this.magickDamage.getValue();
    }
    setMagickDamage(_int) {
        this.magickDamage.setValue(_int);
        return this;
    }

    /**
     * Overrides EquipmentEntity.clone
     * @param  {string} _id ID
     * @return {ClothingEntity}     new WeaponEntity
     */
    clone(_id = undefined) {
        _id = Game.filterID(_id);
        if (typeof _id != "string") {
            _id = genUUIDv4();
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
        _id = Game.filterID(_id);
        if (typeof _id != "string") {
            _id = genUUIDv4();
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