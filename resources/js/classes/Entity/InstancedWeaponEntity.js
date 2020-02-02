class InstancedWeaponEntity extends InstancedEquipmentEntity {
    constructor(id = undefined, weaponEntity = undefined, owner = undefined) {
        super(id, weaponEntity);
        if (!(this.entity instanceof WeaponEntity)) {
            this.dispose();
            return undefined;
        }

        this.silvered = this.entity.silvered;
        this.silveredModifier = this.entity.silveredModifier;

        this.setOwner(owner);

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
        return (this.silvered || this.silveredModifier);
    }

    /**
     * Overrides InstancedEquipmentEntity.clone
     * @param  {string} id          ID
     * @return {Entity}             new InstancedShieldEntity
     */
    clone(id = "") {
        if (!this.hasEntity()) {
            return this;
        }
        let clone = new InstancedWeaponEntity(id, this.entity, this.owner);
        // variables from AbstractEntity
        if (this._useOwnAvailableActions) {
            clone.availableActions = Object.assign({}, this.availableActions);
        }
        if (this._useOwnHiddenAvailableActions) {
            clone.hiddenAvailableActions = Object.assign({}, this.hiddenAvailableActions);
        }
        if (this._useOwnSpecialProperties) {
            clone.specialProperties = new Set(this.specialProperties);
        }
        if (this._useOwnDefaultAction) {
            clone.defaultAction = this.defaultAction;
        }
        if (this._useOwnEffects) {
            clone.effects = this.cloneEffects();
        }
        clone.health = this.health;
        clone.healthModifier = this.healthModifier;
        clone.maxHealth = this.maxHealth;
        clone.maxHealthModifier = this.maxHealthModifier;
        for (effect in this.effects) {
            clone.addEffect(effect);
        }
        clone.actionEffects = Object.assign({}, this.actionEffects);
        // variables from InstancedItemEntity
        clone.setOwner(this.owner);
        return clone;
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
}
InstancedWeaponEntity.initialize();