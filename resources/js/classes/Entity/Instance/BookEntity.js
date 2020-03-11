class InstancedBookEntity extends InstancedItemEntity {
    constructor(id = undefined, bookEntity = undefined, owner = undefined) {
        super(id, bookEntity, owner);
        if (!(this.entity instanceof Entity)) {
            this.dispose();
            return undefined;
        }

        InstancedBookEntity.set(this.id, this);
    }

    getBackgroundImage(nth = 0) {
        return this.entity.getBackgroundImage(nth);
    }
    getAuthor() {
        return this.entity.getAuthor();
    }
    getContent() {
        return this.entity.getContent();
    }

    /**
     * Overrides InstancedBookEntity.clone
     * @param  {string} id ID
     * @return {InstancedBookEntity} new InstancedBookEntity
     */
    clone(id = "") {
        if (!this.hasEntity()) {
            return this;
        }
        let clone = new InstancedBookEntity(id, this.entity, this.owner);
        clone.assign(this);
        return clone;
    }
    assign(entity, verify = true) {
        if (verify && !(entity instanceof InstancedBookEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        return 0;
    }
    dispose() {
        InstancedBookEntity.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "InstancedBookEntity";
    }

    static initialize() {
        InstancedBookEntity.instancedBookEntityList = {};
    }
    static get(id) {
        if (InstancedBookEntity.has(id)) {
            return InstancedBookEntity.instancedBookEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return InstancedBookEntity.instancedBookEntityList.hasOwnProperty(id);
    }
    static set(id, instancedConsumableEntity) {
        InstancedBookEntity.instancedBookEntityList[id] = instancedConsumableEntity;
        return 0;
    }
    static remove(id) {
        delete InstancedBookEntity.instancedBookEntityList[id];
        return 0;
    }
    static list() {
        return InstancedBookEntity.instancedBookEntityList;
    }
    static clear() {
        for (let i in InstancedBookEntity.instancedBookEntityList) {
            InstancedBookEntity.instancedBookEntityList[i].dispose();
        }
        InstancedBookEntity.instancedBookEntityList = {};
        return 0;
    }
}
InstancedBookEntity.initialize();