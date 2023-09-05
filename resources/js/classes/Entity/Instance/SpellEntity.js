/**
 * Instanced Spell Entity
 */
class InstancedSpellEntity extends InstancedEntity {
    /**
     * Creates an Instanced Spell Entity
     * @param {string} id 
     * @param {SpellEntity} entity 
     */
    constructor(id = "", entity = null) {
        super(id, entity);
        if (!(this.entity instanceof Entity)) {
            this.dispose();
            return null;
        }

        InstancedSpellEntity.set(this.id, this);
    }

    getSpellType() {
        return this.entity.getSpellType();
    }

    /**
     * Overrides InstancedEntity.clone
     * @param  {string} id ID
     * @return {InstancedSpellEntity} new InstancedSpellEntity
     */
    clone(id = "") {
        if (!this.hasEntity()) {
            return 2;
        }
        let clone = new InstancedSpellEntity(id, this.entity, this.owner);
        clone.assign(this);
        return clone;
    }
    assign(entity, verify = true) {
        if (verify && !(entity instanceof InstancedSpellEntity)) {
            return 2;
        }
        super.assign(entity);
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        InstancedSpellEntity.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        InstancedSpellEntity.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "InstancedSpellEntity";
    }

    static initialize() {
        InstancedSpellEntity.instancedSpellEntityList = {};
    }
    static get(id) {
        if (InstancedSpellEntity.has(id)) {
            return InstancedSpellEntity.instancedSpellEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return InstancedSpellEntity.instancedSpellEntityList.hasOwnProperty(id);
    }
    static set(id, instancedSpellEntity) {
        InstancedSpellEntity.instancedSpellEntityList[id] = instancedSpellEntity;
        return 0;
    }
    static remove(id) {
        delete InstancedSpellEntity.instancedSpellEntityList[id];
        return 0;
    }
    static list() {
        return InstancedSpellEntity.instancedSpellEntityList;
    }
    static clear() {
        for (let i in InstancedSpellEntity.instancedSpellEntityList) {
            InstancedSpellEntity.instancedSpellEntityList[i].dispose();
        }
        InstancedSpellEntity.instancedSpellEntityList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!InstancedSpellEntity.has(oldID)) {
            return 1;
        }
        InstancedSpellEntity.set(newID, InstancedSpellEntity.get(oldID));
        InstancedSpellEntity.remove(oldID);
        return 0;
    }
}
InstancedSpellEntity.initialize();