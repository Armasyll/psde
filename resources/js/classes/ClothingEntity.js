class ClothingEntity extends EquipmentEntity {
    /**
     * Creats Clothing
     * @param  {String}  _id          Unique ID
     * @param  {String}  _name        Name
     * @param  {String}  _description Description
     * @param  {String}  _image       Image ID
     * @param  {String}  _equipmentSlot  Apparel slot enum
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _equipmentSlot = ApparelSlotEnum.NONE) {
        super(_id, _name, _description, _image, _equipmentSlot);
        this.itemType = ItemEnum.APPAREL;

        this.physicalProtection = new BoundedNumber(0, 0, Number.MAX_SAFE_INTEGER - 1);
        this.magickProtection = new BoundedNumber(0, 0, Number.MAX_SAFE_INTEGER - 1);

        this.setEquipmentSlot(_equipmentSlot);

        Game.setClothingEntity(this.id, this);
    }

    getPhysicalProtection() {
        return this.physicalProtection.getValue();
    }
    setPhysicalProtection(_int) {
        this.physicalProtection.setValue(_int);
        return this;
    }
    getMagickProtection() {
        return this.magickProtection.getValue();
    }
    setMagickProtection(_int) {
        this.magickProtection.setValue(_int);
        return this;
    }

    /**
     * Overrides EquipmentEntity.clone
     * @param  {string} _id ID
     * @return {ClothingEntity}     new ClothingEntity
     */
    clone(_id = undefined) {
        _id = Game.filterID(_id);
        if (typeof _id != "string") {
            _id = genUUIDv4();
        }
        var _itemEntity = new ClothingEntity(_id, this.name, this.description, this.image, this.equipmentSlot);
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
     * @return {InstancedClothingEntity}     new InstancedClothingEntity
     */
    createInstance(_id = undefined) {
        _id = Game.filterID(_id);
        if (typeof _id != "string") {
            _id = genUUIDv4();
        }
        return new InstancedClothingEntity(_id, this);
    }
	dispose() {
        Game.removeClothingEntity(this.id);
        super.dispose();
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
	}
}