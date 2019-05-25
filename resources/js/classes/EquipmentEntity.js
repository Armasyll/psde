class EquipmentEntity extends ItemEntity {
    /**
     * Creats Equipment
     * @param  {String}  _id          Unique ID
     * @param  {String}  _name        Name
     * @param  {String}  _description Description
     * @param  {String}  _icon       Image ID
     * @param  {String}  _equipmentSlot  Apparel slot enum
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _icon = undefined, _equipmentSlot = ApparelSlotEnum.NONE) {
        super(_id, _name, _description, _icon);

        this.equipmentSlot = ApparelSlotEnum.NONE;

        this.addAvailableAction(ActionEnum.EQUIP);
        this.addAvailableAction(ActionEnum.UNEQUIP);
        this.setEquipmentSlot(_equipmentSlot);
    }

    setEquipmentSlot(_equipmentSlot) {
        if (isNaN(_equipmentSlot)) {
            if (ApparelSlotEnum.hasOwnProperty(_equipmentSlot)) {
                return this.setEquipmentSlot(ApparelSlotEnum[_equipmentSlot]);
            }
            return this;
        }
        if (ApparelSlotEnum.properties.hasOwnProperty(_equipmentSlot)) {
            this.equipmentSlot = _equipmentSlot;
        }
        else {
            this.equipmentSlot = ApparelSlotEnum.NONE;
        }
        return this;
    }
    getEquipmentSlot() {
        return this.equipmentSlot;
    }

    /**
     * Overrides ItemEntity.clone; not meant to be run.
     * @param  {string} _id ID
     * @return {EquipmentEntity}     new EquipmentEntity
     */
    clone(_id = undefined) {
        _id = Tools.filterID(_id);
        if (typeof _id != "string") {
            _id = Tools.genUUIDv4();
        }
        var _itemEntity = new EquipmentEntity(_id, this.name, this.description, this.icon, this.equipmentSlot);
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
        _itemType.itemType = this.itemType;
        return _itemEntity;
    }
    /**
     * Overrides ItemEntity.createInstance; not meant to be run.
     * @param  {string} _id ID
     * @return {InstancedEquipmentEntity}     new InstancedEquipmentEntity
     */
    createInstance(_id = undefined) {
        _id = Tools.filterID(_id);
        if (typeof _id != "string") {
            _id = Tools.genUUIDv4();
        }
        return new InstancedEquipmentEntity(_id, this);
    }
    dispose() {
        this.equipmentSlot = undefined;
        super.dispose();
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}