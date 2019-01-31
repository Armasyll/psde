class ClothingEntity extends ItemEntity {
    /**
     * Creats Clothing
     * @param  {String}  _id          Unique ID
     * @param  {String}  _name        Name
     * @param  {String}  _description Description
     * @param  {String}  _image       Image path or base64
     * @param  {String}  _equipmentSlot        Equipment slot enum
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _equipmentSlot = Game.EquipmentSlotEnum.HEAD) {
        super(_id, _name, _description, _image);
        this.itemType = Game.ItemEnum.CLOTHING;

        this.equipmentSlot = Game.EquipmentSlotEnum.HEAD;

        this.addAvailableAction("equip");
        this.addAvailableAction("unequip");
        this.setEquipmentSlot(_equipmentSlot);

        Game.setClothingEntity(this.id, this);
    }

    setEquipmentSlot(_type) {
        if (isNaN(_type)) {
            return this;
        }
        if (Game.EquipmentSlotEnum.properties.hasOwnProperty(_type)) {
            this.equipmentSlot = _type;
        }
        else {
            this.equipmentSlot = Game.EquipmentSlotEnum.HEAD;
        }
        return this;
    }
    getEquipmentSlot() {
        return this.equipmentType;
    }

    /**
     * Overrides ItemEntity.createInstance
     * @param  {[type]} _id [description]
     * @return {[type]}     [description]
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