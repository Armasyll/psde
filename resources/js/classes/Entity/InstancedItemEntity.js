class InstancedItemEntity extends InstancedEntity {
    constructor(id = undefined, itemEntity = undefined, owner = undefined) {
        super(id, itemEntity);
        if (!(this.entity instanceof Entity)) {
            this.dispose();
            return undefined;
        }

        this.setOwner(owner);

        InstancedItemEntity.set(this.id, this);
    }

    getItemType() {
        return this.entity.getItemType();
    }

    /**
     * Overrides InstancedEntity.clone
     * @param  {string} id          ID
     * @return {Entity}             new InstancedItemEntity
     */
    clone(id = "") {
        if (!this.hasEntity()) {
            return this;
        }
        let clone = new InstancedItemEntity(id, this.entity, this.owner);
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
        InstancedItemEntity.remove(this.id);
        super.dispose()
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }

    static initialize() {
        InstancedItemEntity.instancedItemEntityList = {};
    }
    static get(id) {
        if (InstancedItemEntity.has(id)) {
            return InstancedItemEntity.instancedItemEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return InstancedItemEntity.instancedItemEntityList.hasOwnProperty(id);
    }
    static set(id, instancedItemEntity) {
        InstancedItemEntity.instancedItemEntityList[id] = instancedItemEntity;
        return 0;
    }
    static remove(id) {
        delete InstancedItemEntity.instancedItemEntityList[id];
        return 0;
    }
    static list() {
        return InstancedItemEntity.instancedItemEntityList;
    }
    static clear() {
        for (let i in InstancedItemEntity.instancedItemEntityList) {
            InstancedItemEntity.instancedItemEntityList[i].dispose();
        }
        InstancedItemEntity.instancedItemEntityList = {};
        return 0;
    }
}
InstancedItemEntity.initialize();