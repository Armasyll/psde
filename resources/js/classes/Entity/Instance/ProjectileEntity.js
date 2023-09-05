/**
 * Instanced Projectile Entity
 */
class InstancedProjectileEntity extends InstancedItemEntity {
    /**
     * Creates an Instanced Projectile Entity
     * @param {string} id 
     * @param {ProjectileEntity} entity 
     */
    constructor(id = "", entity = null) {
        super(id, entity);
        if (!(this.entity instanceof Entity)) {
            this.dispose();
            return null;
        }

        InstancedProjectileEntity.set(this.id, this);
    }

    getProjectileType() {
        return this.entity.getProjectileType();
    }

    /**
     * Overrides InstancedEntity.clone
     * @param  {string} id ID
     * @return {InstancedProjectileEntity} new InstancedProjectileEntity
     */
    clone(id = "") {
        if (!this.hasEntity()) {
            return 2;
        }
        let clone = new InstancedProjectileEntity(id, this.entity, this.owner);
        clone.assign(this);
        return clone;
    }
    assign(entity, verify = true) {
        if (verify && !(entity instanceof InstancedProjectileEntity)) {
            return 2;
        }
        super.assign(entity);
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        InstancedProjectileEntity.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        InstancedProjectileEntity.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "InstancedProjectileEntity";
    }

    static initialize() {
        InstancedProjectileEntity.instancedProjectileEntityList = {};
    }
    static get(id) {
        if (InstancedProjectileEntity.has(id)) {
            return InstancedProjectileEntity.instancedProjectileEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return InstancedProjectileEntity.instancedProjectileEntityList.hasOwnProperty(id);
    }
    static set(id, instancedProjectileEntity) {
        InstancedProjectileEntity.instancedProjectileEntityList[id] = instancedProjectileEntity;
        return 0;
    }
    static remove(id) {
        delete InstancedProjectileEntity.instancedProjectileEntityList[id];
        return 0;
    }
    static list() {
        return InstancedProjectileEntity.instancedProjectileEntityList;
    }
    static clear() {
        for (let i in InstancedProjectileEntity.instancedProjectileEntityList) {
            InstancedProjectileEntity.instancedProjectileEntityList[i].dispose();
        }
        InstancedProjectileEntity.instancedProjectileEntityList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!InstancedProjectileEntity.has(oldID)) {
            return 1;
        }
        InstancedProjectileEntity.set(newID, InstancedProjectileEntity.get(oldID));
        InstancedProjectileEntity.remove(oldID);
        return 0;
    }
}
InstancedProjectileEntity.initialize();