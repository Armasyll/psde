/**
 * Instanced Key Entity
 */
class InstancedKeyEntity extends InstancedItemEntity {
    /**
     * Creates an Instanced Key Entity
     * @param {string} id 
     * @param {KeyEntity} entity 
     * @param {(CreatureEntity|null)} [owner] 
     */
    constructor(id = "", entity = null, owner = null) {
        super(id, entity, owner);
        if (!(this.entity instanceof KeyEntity)) {
            this.dispose();
            return null;
        }
        this.holdable = true;

        this.skeletonKeyModifier = false;

        InstancedKeyEntity.set(this.id, this);
    }

    isSkeletonKey() {
        return this.entity.isSkeletonKey() || this.skeletonKeyModifier;
    }

    /**
     * Overrides InstancedEntity.clone
     * @param  {string} id ID
     * @return {InstancedKeyEntity} new InstancedItemEntity
     */
    clone(id = "") {
        if (!this.hasEntity()) {
            return 2;
        }
        let clone = new InstancedKeyEntity(id, this.entity, this.owner);
        clone.assign(this);
        return clone;
    }
    assign(entity) {
        if (verify && !(entity instanceof InstancedKeyEntity)) {
            return 2;
        }
        super.assign(entity);
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        InstancedKeyEntity.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        InstancedKeyEntity.remove(this.id);
        super.dispose()
        return undefined;
    }
    getClassName() {
        return "InstancedKeyEntity";
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
    static updateID(oldID, newID) {
        if (!InstancedKeyEntity.has(oldID)) {
            return 1;
        }
        InstancedKeyEntity.set(newID, InstancedKeyEntity.get(oldID));
        InstancedKeyEntity.remove(oldID);
        return 0;
    }
}
InstancedKeyEntity.initialize();