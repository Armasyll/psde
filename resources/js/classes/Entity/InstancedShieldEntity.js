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
     * Overrides InstancedClothingEntity.clone
     * @param  {string} id ID
     * @return {InstancedShieldEntity} new InstancedShieldEntity
     */
    clone(id) {
        if (!this.hasEntity()) {
            return this;
        }
        let clone = new InstancedShieldEntity(id, this.entity, this.owner);
        clone.assign(this);
        return clone;
    }
    assign(entity, verify = true) {
        if (verify && !(entity instanceof InstancedShieldEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        return 0;
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