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

    clone(id) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        return new InstancedShieldEntity(id, this.entity, owner);
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