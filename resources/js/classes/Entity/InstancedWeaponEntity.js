class InstancedWeaponEntity extends InstancedEquipmentEntity {
    constructor(id = undefined, weaponEntity = undefined, owner = undefined) {
        super(id, weaponEntity);
        if (!(this.entity instanceof WeaponEntity)) {
            this.dispose();
            return undefined;
        }

        this.setOwner(owner);

        InstancedWeaponEntity.set(this.id, this);
    }

    getWeaponCategory() {
        return this.entity.getWeaponCategory();
    }
    getThrownRange() {
        return this.entity.getThrownRange();
    }
    getAmmunitionRange() {
        return this.entity.getAmmunitionRange();
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
    getWeaponProperties() {
        return this.entity.getWeaponProperties();
    }

    clone(id = "") {
        return new InstancedWeaponEntity(id, this.entity, this.owner);
    }
    dispose() {
        InstancedWeaponEntity.remove(this.id);
        super.dispose()
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }

    static initialize() {
        InstancedWeaponEntity.instancedWeaponEntityList = {};
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
    static clear() {
        for (let i in InstancedWeaponEntity.instancedWeaponEntityList) {
            InstancedWeaponEntity.instancedWeaponEntityList[i].dispose();
        }
        InstancedWeaponEntity.instancedWeaponEntityList = {};
        return 0;
    }
}
InstancedWeaponEntity.initialize();