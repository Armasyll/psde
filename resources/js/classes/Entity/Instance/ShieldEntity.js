/**
 * Instanced Shield Entity
 */
class InstancedShieldEntity extends InstancedClothingEntity {
    /**
     * Creates an Instanced Shield Entity
     * @param {string} id 
     * @param {ShieldEntity} entity 
     * @param {(CreatureEntity|null)} [owner] 
     */
    constructor(id = "", entity = null, owner = null) {
        super(id, entity, owner);
        if (!(this.entity instanceof ShieldEntity)) {
            this.dispose();
            return null;
        }
        this.holdable = true;

        InstancedShieldEntity.set(this.id, this);
    }

    /**
     * Overrides InstancedClothingEntity.clone
     * @param  {string} id ID
     * @return {InstancedShieldEntity} new InstancedShieldEntity
     */
    clone(id = "") {
        if (!this.hasEntity()) {
            return 2;
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
    updateID(newID) {
        super.updateID(newID);
        InstancedShieldEntity.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        InstancedShieldEntity.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "InstancedShieldEntity";
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
    static updateID(oldID, newID) {
        if (!InstancedShieldEntity.has(oldID)) {
            return 1;
        }
        InstancedShieldEntity.set(newID, InstancedShieldEntity.get(oldID));
        InstancedShieldEntity.remove(oldID);
        return 0;
    }
}
InstancedShieldEntity.initialize();