class InstancedConsumableEntity extends InstancedItemEntity {
    constructor(id = undefined, consumableEntity = undefined, owner = undefined) {
        super(id, consumableEntity, owner);
        if (!(this.entity instanceof Entity)) {
            this.dispose();
            return undefined;
        }

        InstancedConsumableEntity.set(this.id, this);
    }

    getConsumableType() {
        return this.entity.getConsumableType();
    }
    hasConsumableEffect(effect) {
        return this.entity.hasConsumableEffect(effect);
    }
    getConsumableEffects() {
        return this.entity.getConsumableEffects();
    }

    /**
     * Overrides InstancedConsumableEntity.clone
     * @param  {string} id ID
     * @return {InstancedConsumableEntity} new InstancedConsumableEntity
     */
    clone(id = "") {
        if (!this.hasEntity()) {
            return this;
        }
        let clone = new InstancedConsumableEntity(id, this.entity, this.owner);
        clone.assign(this);
        return clone;
    }
    assign(entity, verify = true) {
        if (verify && !(entity instanceof InstancedConsumableEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        return 0;
    }
    dispose() {
        InstancedConsumableEntity.remove(this.id);
        super.dispose();
        return undefined;
    }

    static initialize() {
        InstancedConsumableEntity.instancedConsumableEntityList = {};
    }
    static get(id) {
        if (InstancedConsumableEntity.has(id)) {
            return InstancedConsumableEntity.instancedConsumableEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return InstancedConsumableEntity.instancedConsumableEntityList.hasOwnProperty(id);
    }
    static set(id, instancedConsumableEntity) {
        InstancedConsumableEntity.instancedConsumableEntityList[id] = instancedConsumableEntity;
        return 0;
    }
    static remove(id) {
        delete InstancedConsumableEntity.instancedConsumableEntityList[id];
        return 0;
    }
    static list() {
        return InstancedConsumableEntity.instancedConsumableEntityList;
    }
    static clear() {
        for (let i in InstancedConsumableEntity.instancedConsumableEntityList) {
            InstancedConsumableEntity.instancedConsumableEntityList[i].dispose();
        }
        InstancedConsumableEntity.instancedConsumableEntityList = {};
        return 0;
    }
}
InstancedConsumableEntity.initialize();