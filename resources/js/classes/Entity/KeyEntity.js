class KeyEntity extends ItemEntity {
    constructor(id, name, description, iconID) {
        super(id, name, description, iconID);

        this.skeletonKey = false;
        this.skeletonKeyModifier = false;
        this.itemType = ItemEnum.KEY;

        KeyEntity.set(this.id, this);
    }

    setSkeletonKey(skeletonKey) {
        this.skeletonKey = skeletonKey == true;
        return 0;
    }
    setSkeletonKeyModifier(skeletonKeyModifier) {
        this.skeletonKeyModifier = skeletonKeyModifier == true;
        return 0;
    }
    isSkeletonKey() {
        return this.skeletonKey || this.skeletonKeyModifier;
    }

    resetModifiers() {
        super.resetModifiers();
        this.damageRollCountModifier = 0;
        this.damageRollModifier = 0;
        this.silveredModifier = false;
    }

    /**
     * Overrides ItemEntity.clone
     * @param  {string} id          ID
     * @return {KeyEntity}          new KeyEntity
     */
    clone(id = "") {
        let clone = new KeyEntity(id, this.name, this.description, this.icon);
        // variables from AbstractEntity
        clone.availableActions = Object.assign({}, this.availableActions);
        clone.hiddenAvailableActions = Object.assign({}, this.hiddenAvailableActions);
        clone.specialProperties = new Set(this.specialProperties);
        clone.defaultAction = this.defaultAction;
        clone.health = this.health;
        clone.healthModifier = this.healthModifier;
        clone.maxHealth = this.maxHealth;
        clone.maxHealthModifier = this.maxHealthModifier;
        // variables from Entity
        clone.weight = this.weight;
        clone.price = this.price;
        // variables from ItemEntity
        clone.setItemType(this.itemType);
        // variables from EquipmentEntity
        clone.setSkeletonKey(this.skeletonKey);
        clone.setSkeletonKeyModifier(this.skeletonKeyModifier);
        return clone;
    }
    /**
     * Overrides EquipmentEntity.createInstance
     * @param  {string} id ID
     * @return {InstancedWeaponEntity}     new InstancedWeaponEntity
     */
    createInstance(id = "") {
        let instance = new InstancedKeyEntity(id, this);
        instance.skeletonKey = this.skeletonKey;
        instance.skeletonKeyModifier = this.skeletonKeyModifier;
        this.instances[instance.getID()] = instance;
        return instance;
    }

    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        KeyEntity.remove(this.id);
        delete this.itemType;
        super.dispose();
        return undefined;
    }

    static initialize() {
        KeyEntity.keyEntityList = {};
    }
    static get(id) {
        if (KeyEntity.has(id)) {
            return KeyEntity.keyEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return KeyEntity.keyEntityList.hasOwnProperty(id);
    }
    static set(id, keyEntity) {
        KeyEntity.keyEntityList[id] = keyEntity;
        return 0;
    }
    static remove(id) {
        delete KeyEntity.keyEntityList[id];
        return 0;
    }
    static list() {
        return KeyEntity.keyEntityList;
    }
    static clear() {
        for (let i in KeyEntity.keyEntityList) {
            KeyEntity.keyEntityList[i].dispose();
        }
        KeyEntity.keyEntityList = {};
        return 0;
    }
}
KeyEntity.initialize();