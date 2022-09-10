/**
 * Instanced Weapon Entity
 */
class InstancedWeaponEntity extends InstancedEquipmentEntity {
    /**
     * Creates an Instanced Weapon Entity
     * @param {string} id 
     * @param {WeaponEntity} entity 
     * @param {(CreatureEntity|null)} [owner] 
     */
    constructor(id = "", entity = null, owner = null) {
        super(id, entity, owner);
        if (!(this.entity instanceof WeaponEntity)) {
            this.dispose();
            return null;
        }
        this.holdable = true;

        this.silveredModifier = false;

        InstancedWeaponEntity.set(this.id, this);
    }

    getWeaponCategory() {
        return this.entity.getWeaponCategory();
    }
    getRange() {
        return this.entity.getRange();
    }
    getDamageType() {
        return this.entity.getDamageType();
    }
    getDamageRoll() {
        return this.entity.getDamageRoll();
    }
    getDamageRollCount() {
        return this.entity.getDamageRollCount();
    }
    getWeaponType() {
        return this.entity.getWeaponType();
    }
    isAmmunition() {
        return this.entity.isAmmunition();
    }
    isFinesse() {
        return this.entity.isFinesse();
    }
    isHeavy() {
        return this.entity.isHeavy();
    }
    isLight() {
        return this.entity.isLight();
    }
    isLoading() {
        return this.entity.isLoading();
    }
    isRange() {
        return this.entity.isRange();
    }
    isReach() {
        return this.entity.isReach();
    }
    isSpecial() {
        return this.entity.isSpecial();
    }
    isThrown() {
        return this.entity.isThrown();
    }
    isTwoHanded() {
        return this.entity.isTwoHanded();
    }
    isVersatile() {
        return this.entity.isVersatile();
    }
    isSilvered() {
        return (this.entity.isSilvered() || this.silveredModifier);
    }

    /**
     * Overrides InstancedEquipmentEntity.clone
     * @param  {string} id ID
     * @return {InstancedWeaponEntity} new InstancedWeaponEntity
     */
    clone(id = "") {
        if (!this.hasEntity()) {
            return 2;
        }
        let clone = new InstancedWeaponEntity(id, this.entity, this.owner);
        clone.assign(this);
        return clone;
    }
    assign(entity, verify = true) {
        if (verify && !(entity instanceof InstancedWeaponEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        InstancedWeaponEntity.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        InstancedWeaponEntity.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "InstancedWeaponEntity";
    }

    static initialize() {
        InstancedWeaponEntity.instancedWeaponEntityList = {};
        new InstancedWeaponEntity("weaponHandInstance", WeaponEntity.get("weaponHand"));
        new InstancedWeaponEntity("weaponClawInstance", WeaponEntity.get("weaponClaw"));
        new InstancedWeaponEntity("weaponPawInstance", WeaponEntity.get("weaponPaw"));
        new InstancedWeaponEntity("weaponHoofInstance", WeaponEntity.get("weaponHoof"));
    }
    static get(id) {
        if (InstancedWeaponEntity.has(id)) {
            return InstancedWeaponEntity.instancedWeaponEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return InstancedWeaponEntity.instancedWeaponEntityList.hasOwnProperty(id);
    }
    static set(id, instancedWeaponEntity) {
        InstancedWeaponEntity.instancedWeaponEntityList[id] = instancedWeaponEntity;
        return 0;
    }
    static remove(id) {
        delete InstancedWeaponEntity.instancedWeaponEntityList[id];
        return 0;
    }
    static list() {
        return InstancedWeaponEntity.instancedWeaponEntityList;
    }
    static clear() {
        for (let i in InstancedWeaponEntity.instancedWeaponEntityList) {
            InstancedWeaponEntity.instancedWeaponEntityList[i].dispose();
        }
        InstancedWeaponEntity.instancedWeaponEntityList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!InstancedWeaponEntity.has(oldID)) {
            return 1;
        }
        InstancedWeaponEntity.set(newID, InstancedWeaponEntity.get(oldID));
        InstancedWeaponEntity.remove(oldID);
        return 0;
    }
}
InstancedWeaponEntity.initialize();