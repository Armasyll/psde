/**
 * Instanced Display Entity
 */
class InstancedDisplayEntity extends InstancedFurnitureEntity {
    /**
     * Creates an Instanced Display Entity
     * @param {string} id 
     * @param {DisplayEntity} entity 
     * @param {(CreatureEntity|null)} [owner] 
     */
    constructor(id = "", entity = null, owner = null) {
        super(id, entity);
        if (!(this.entity instanceof Entity)) {
            this.dispose();
            return null;
        }

        this.powered = false;
        this.videoID = "missingVideo";

        this.setOwner(owner);

        InstancedDisplayEntity.set(this.id, this);
    }

    setVideo(videoID) {
        this.videoID = Tools.filterID(videoID);
        return 0;
    }
    getVideo() {
        return this.videoID;
    }
    on() {
        if (this.locked) {
            return this.powered;
        }
        this.powered = true;
    }
    off() {
        if (this.locked) {
            return this.powered;
        }
        this.powered = false;
    }
    toggle() {
        if (this.locked) {
            return this.powered;
        }
        if (this.powered) {
            this.off();
            return false;
        }
        else {
            this.on();
            return true;
        }
    }

    objectify() {
        let obj = super.objectify();
        obj["powered"] = this.powered;
        obj["videoID"] = this.videoID;
        return obj;
    }
    objectifyMinimal() {
        let obj = super.objectifyMinimal();
        obj["powered"] = this.powered;
        obj["videoID"] = this.videoID;
        return obj;
    }
    /**
     * Overrides InstancedFurnitureEntity.clone
     * @param  {string} id ID
     * @return {InstancedDisplayEntity} new InstancedDisplayEntity
     */
    clone(id = "") {
        if (!this.hasEntity()) {
            return 2;
        }
        let clone = new InstancedDisplayEntity(id, this.entity, this.owner);
        clone.assign(this);
        if (this.hasContainer()) {
            clone.setContainer(this.container.clone(String(clone.id).concat("Container")));
        }
        return clone;
    }
    assign(entity, verify = true) {
        if (verify && !(entity instanceof InstancedDisplayEntity)) {
            return 2;
        }
        super.assign(entity);
        if (entity.hasOwnProperty("powered")) this.setPowered(entity.powered);
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        InstancedDisplayEntity.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        InstancedDisplayEntity.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "InstancedDisplayEntity";
    }

    static initialize() {
        InstancedDisplayEntity.instancedDisplayEntityList = {};
    }
    static get(id) {
        if (InstancedDisplayEntity.has(id)) {
            return InstancedDisplayEntity.instancedDisplayEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return InstancedDisplayEntity.instancedDisplayEntityList.hasOwnProperty(id);
    }
    static set(id, instancedFurnitureEntity) {
        InstancedDisplayEntity.instancedDisplayEntityList[id] = instancedFurnitureEntity;
        return 0;
    }
    static remove(id) {
        delete InstancedDisplayEntity.instancedDisplayEntityList[id];
        return 0;
    }
    static list() {
        return InstancedDisplayEntity.instancedDisplayEntityList;
    }
    static clear() {
        for (let i in InstancedDisplayEntity.instancedDisplayEntityList) {
            InstancedDisplayEntity.instancedDisplayEntityList[i].dispose();
        }
        InstancedDisplayEntity.instancedDisplayEntityList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!InstancedDisplayEntity.has(oldID)) {
            return 1;
        }
        InstancedDisplayEntity.set(newID, InstancedDisplayEntity.get(oldID));
        InstancedDisplayEntity.remove(oldID);
        return 0;
    }
}
InstancedDisplayEntity.initialize();