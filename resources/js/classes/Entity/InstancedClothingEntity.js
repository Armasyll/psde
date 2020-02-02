class InstancedClothingEntity extends InstancedEquipmentEntity {
    constructor(id = undefined, clothingEntity = undefined, owner = undefined) {
        super(id, clothingEntity);
        if (!(this.entity instanceof ClothingEntity)) {
            this.dispose();
            return undefined;
        }

        this.setOwner(owner);

        InstancedClothingEntity.set(this.id, this);
    }

    getArmourCategory() {
        return this.entity.getArmourCategory();
    }
    getArmourType() {
        return this.entity.getArmourType();
    }
    getArmourClass() {
        return this.entity.getArmourClass();
    }
    getPortionMultiplier() {
        return this.entity.getPortionMultiplier();
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
        let clone = new InstancedClothingEntity(id, this.entity, this.owner);
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
        InstancedClothingEntity.remove(this.id);
        super.dispose();
        return undefined;
    }

    static initialize() {
        InstancedClothingEntity.instancedClothingEntityList = {};
    }
    static get(id) {
        if (InstancedClothingEntity.has(id)) {
            return InstancedClothingEntity.instancedClothingEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return InstancedClothingEntity.instancedClothingEntityList.hasOwnProperty(id);
    }
    static set(id, instancedClothingEntity) {
        InstancedClothingEntity.instancedClothingEntityList[id] = instancedClothingEntity;
        return 0;
    }
    static remove(id) {
        delete InstancedClothingEntity.instancedClothingEntityList[id];
        return 0;
    }
    static list() {
        return InstancedClothingEntity.instancedClothingEntityList;
    }
    static clear() {
        for (let i in InstancedClothingEntity.instancedClothingEntityList) {
            InstancedClothingEntity.instancedClothingEntityList[i].dispose();
        }
        InstancedClothingEntity.instancedClothingEntityList = {};
        return 0;
    }
}
InstancedClothingEntity.initialize();