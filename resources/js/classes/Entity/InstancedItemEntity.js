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
        clone.assign(this);
        return clone;
    }
    assign(entity, verify = true) {
        if (verify && !(entity instanceof InstancedItemEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        return 0;
    }
    dispose() {
        InstancedItemEntity.remove(this.id);
        super.dispose();
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