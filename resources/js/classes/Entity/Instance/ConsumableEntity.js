/**
 * Instanced Consumable Entity
 */
class InstancedConsumableEntity extends InstancedItemEntity {
    /**
     * Creates an Instanced Consumable Entity
     * @param {string} id 
     * @param {ConsumableEntity} entity 
     * @param {(CreatureEntity|null)} [owner] 
     */
    constructor(id = "", entity = null, owner = null) {
        super(id, entity, owner);
        if (!(this.entity instanceof Entity)) {
            this.dispose();
            return null;
        }
        this.holdable = true;

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
            return 2;
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
    updateID(newID) {
        super.updateID(newID);
        InstancedConsumableEntity.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        InstancedConsumableEntity.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "InstancedConsumableEntity";
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
    static updateID(oldID, newID) {
        if (!InstancedConsumableEntity.has(oldID)) {
            return 1;
        }
        InstancedConsumableEntity.set(newID, InstancedConsumableEntity.get(oldID));
        InstancedConsumableEntity.remove(oldID);
        return 0;
    }
}
InstancedConsumableEntity.initialize();