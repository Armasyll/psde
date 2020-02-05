class InstancedKeyEntity extends InstancedKeyEntity {
    constructor(id = undefined, entity = undefined, owner = undefined) {
        super(id, entity);
        if (!(this.entity instanceof KeyEntity)) {
            this.dispose();
            return undefined;
        }

        this.setOwner(owner);
        InstancedKeyEntity.set(this.id, this);
    }
    dispose() {
        InstancedKeyEntity.remove(this.id);
        super.dispose()
        return undefined;
    }

    static initialize() {
        InstancedKeyEntity.instancedKeyEntityList = {};
    }
    static get(id) {
        if (InstancedKeyEntity.has(id)) {
            return InstancedKeyEntity.instancedKeyEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return InstancedKeyEntity.instancedKeyEntityList.hasOwnProperty(id);
    }
    static set(id, instancedKeyEntity) {
        InstancedKeyEntity.instancedKeyEntityList[id] = instancedKeyEntity;
        return 0;
    }
    static remove(id) {
        delete InstancedKeyEntity.instancedKeyEntityList[id];
        return 0;
    }
    static list() {
        return InstancedKeyEntity.instancedKeyEntityList;
    }
    static clear() {
        for (let i in InstancedKeyEntity.instancedKeyEntityList) {
            InstancedKeyEntity.instancedKeyEntityList[i].dispose();
        }
        InstancedKeyEntity.instancedKeyEntityList = {};
        return 0;
    }
}
InstancedKeyEntity.initialize();