class ClothingEntity extends EquipmentEntity {
    /**
     * Creats Clothing
     * @param  {string}  id          Unique ID
     * @param  {string}  name        Name
     * @param  {string}  description Description
     * @param  {string}  iconID       Image ID
     * @param  {ApparelSlotEnum}  equipmentSlot  Apparel slot enum
     */
    constructor(id = undefined, name = undefined, description = undefined, iconID = undefined, equipmentSlot = ApparelSlotEnum.NONE) {
        super(id, name, description, iconID, equipmentSlot);
        this.itemType = ItemEnum.APPAREL;

        this.physicalProtection = new BoundedNumber(0, 0, Number.MAX_SAFE_INTEGER - 1);
        this.magickProtection = new BoundedNumber(0, 0, Number.MAX_SAFE_INTEGER - 1);

        this.setEquipmentSlot(equipmentSlot);

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
     * @param  {string} id ID
     * @return {ClothingEntity}     new ClothingEntity
     */
    clone(id = undefined) {
        id = Tools.filterID(id);
        if (typeof id != "string") {
            id = Tools.genUUIDv4();
        }
        let clothingEntity = new ClothingEntity(id, this.name, this.description, this.icon, this.equipmentSlot);
        // variables from AbstractEntity
        clothingEntity.availableActions = Object.assign({}, this.availableActions);
        clothingEntity.hiddenAvailableActions = Object.assign({}, this.hiddenAvailableActions);
        clothingEntity.specialProperties = new Set(this.specialProperties);
        clothingEntity.defaultAction = this.defaultAction;
        // variables from Entity
        clothingEntity.weight.copyFrom(this.weight);
        clothingEntity.price.copyFrom(this.price);
        clothingEntity.health.copyFrom(this.health);
        // variables from ItemEntity
        clothingEntity.setItemType(this.itemType);
        // variables from EquipmentEntity
        clothingEntity.setEquipmentSlot(this.equipmentSlot);
        return clothingEntity;
    }
    /**
     * Overrides EquipmentEntity.createInstance
     * @param  {string} id ID
     * @return {InstancedClothingEntity}     new InstancedClothingEntity
     */
    createInstance(id = undefined) {
        id = Tools.filterID(id);
        if (typeof id != "string") {
            id = Tools.genUUIDv4();
        }
        return new InstancedClothingEntity(id, this);
    }
	dispose() {
        this.physicalProtection.dispose();
        this.magickProtection.dispose();
        Game.removeClothingEntity(this.id);
        super.dispose();
        return undefined;
	}
}