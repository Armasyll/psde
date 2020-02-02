class InstancedShieldEntity extends InstancedClothingEntity {
    constructor(id = undefined, shieldEntity = undefined, owner = undefined) {
        super(id, shieldEntity);
        if (!(this.entity instanceof ShieldEntity)) {
            this.dispose();
            return undefined;
        }

        this.setOwner(owner);

        InstancedShieldEntity.set(this.id, this);
    }

    /**
     * Overrides InstancedEquipmentEntity.clone
     * @param  {string} id          ID
     * @return {Entity}             new InstancedShieldEntity
     */
    clone(id) {
        if (!this.hasEntity()) {
            return this;
        }
        let clone = new InstancedShieldEntity(id, this.entity, this.owner);
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
        InstancedShieldEntity.remove(this.id);
        super.dispose();
        return undefined;
    }

    static initialize() {
        InstancedShieldEntity.instancedShieldEntityList = {};
    }
    static get(id) {
        if (InstancedShieldEntity.has(id)) {
            return InstancedShieldEntity.instancedShieldEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return InstancedShieldEntity.instancedShieldEntityList.hasOwnProperty(id);
    }
    static set(id, instancedShieldEntity) {
        InstancedShieldEntity.instancedShieldEntityList[id] = instancedShieldEntity;
        return 0;
    }
    static remove(id) {
        delete InstancedShieldEntity.instancedShieldEntityList[id];
        return 0;
    }
    static list() {
        return InstancedShieldEntity.instancedShieldEntityList;
    }
    static clear() {
        for (let i in InstancedShieldEntity.instancedShieldEntityList) {
            InstancedShieldEntity.instancedShieldEntityList[i].dispose();
        }
        InstancedShieldEntity.instancedShieldEntityList = {};
        return 0;
    }
}
InstancedShieldEntity.initialize();