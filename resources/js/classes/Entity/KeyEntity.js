/**
 * Key Entity
 */
class KeyEntity extends ItemEntity {
    /**
     * Creates a Key Entity
     * @param  {string}  id 
     * @param  {string}  name 
     * @param  {string}  [description] 
     * @param  {string}  [iconID] 
     */
    constructor(id = "", name = "", description = "", iconID = "") {
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
     * @param  {string} id ID
     * @returns {KeyEntity} new KeyEntity
     */
    clone(id = "") {
        let clone = new KeyEntity(id, this.name, this.description, this.icon);
        clone.assign(this);
        return clone;
    }
    /**
     * Overrides EquipmentEntity.createInstance
     * @param  {string} id ID
     * @returns {InstancedWeaponEntity}     new InstancedWeaponEntity
     */
    createInstance(id = "") {
        return new InstancedKeyEntity(id, this);
    }
    assign(entity) {
        if (verify && !(entity instanceof KeyEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        if (entity.hasOwnProperty("skeletonKey")) this.setSkeletonKey(entity.skeletonKey);
        if (entity.hasOwnProperty("skeletonKeyModifier")) this.setSkeletonKeyModifier(entity.skeletonKeyModifier);
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        KeyEntity.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        KeyEntity.remove(this.id);
        delete this.itemType;
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "KeyEntity";
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
    static updateID(oldID, newID) {
        if (!KeyEntity.has(oldID)) {
            return 1;
        }
        KeyEntity.set(newID, KeyEntity.get(oldID));
        KeyEntity.remove(oldID);
        return 0;
    }
}
KeyEntity.initialize();