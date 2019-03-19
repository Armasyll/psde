class ClothingEntity extends ItemEntity {
    /**
     * Creats Clothing
     * @param  {String}  _id          Unique ID
     * @param  {String}  _name        Name
     * @param  {String}  _description Description
     * @param  {String}  _image       Image ID
     * @param  {String}  _slot        Equipment slot enum
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _slot = ApparelSlotEnum.HEAD) {
        super(_id, _name, _description, _image);
        this.itemType = ItemEnum.APPAREL;

        this.equipmentSlot = ApparelSlotEnum.HEAD;

        this.addAvailableAction(ActionEnum.EQUIP);
        this.addAvailableAction(ActionEnum.UNEQUIP);
        this.setApparelSlot(_slot);

        Game.setClothingEntity(this.id, this);
    }

    setApparelSlot(_type) {
        if (isNaN(_type)) {
            return this;
        }
        if (ApparelSlotEnum.properties.hasOwnProperty(_type)) {
            this.equipmentSlot = _type;
        }
        else {
            this.equipmentSlot = ApparelSlotEnum.HEAD;
        }
        return this;
    }
    getApparelSlot() {
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