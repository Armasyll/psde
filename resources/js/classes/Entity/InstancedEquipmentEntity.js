class InstancedEquipmentEntity extends InstancedItemEntity {
    constructor(_id = undefined, _entity = undefined, _owner = undefined) {
        super(_id, _entity);
        if (!(this.entity instanceof EquipmentEntity)) {
            this.dispose();
            return undefined;
        }

        this.setOwner(_owner);
    }

    getEquipmentSlot() {
        return this.entity.getEquipmentSlot();
    }
    hasAbilityScoreRequirement(...args) {
        return this.entity.hasAbilityScoreRequirement(...args);
    }
    getAbilityScoreRequirement(...args) {
        return this.entity.getAbilityScoreRequirement(...args);
    }
    hasAdvantageOn(...args) {
        return this.entity.hasAdvantageOn(...args);
    }
    getAdvantageOn() {
        return this.entity.getAdvantageOn();
    }
    hasDisadvantageOn(...args) {
        return this.entity.hasDisadvantageOn(...args);
    }
    getDisadvantageOn() {
        return this.entity.getDisadvantageOn();
    }

    /**
     * Overrides InstancedItemEntity.clone
     * @param  {string} id          ID
     * @return {Entity}             new InstancedEquipmentEntity
     */
    clone(id = "") {
        if (!this.hasEntity()) {
            return this;
        }
        let clone = new InstancedEquipmentEntity(id, this.entity, this.owner);
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
        super.dispose()
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}