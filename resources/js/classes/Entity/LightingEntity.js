/**
 * Lighting Entity
 */
class LightingEntity extends FurnitureEntity {
    /**
     * Creates a Lighting Entity
     * @param  {string}  id Unique ID
     * @param  {string}  name Name
     * @param  {string}  [description] Description
     * @param  {string}  [iconID] Icon ID
     * @param  {null}  lightingType
     * @param  {Array<number>}  lightingPositionOffset
     */
    constructor(id = "", name = "", description = "", iconID = "", lightingType = null, lightingPositionOffset = [0, 0, 0]) {
        super(id, name, description, iconID, FurnitureEnum.LAMP);

        this.lightOn = false;
        this.lightingPositionOffset = [0,0,0];

        this.setLightingPositionOffset(lightingPositionOffset);

        this.addAvailableAction(ActionEnum.USE);
        this.setDefaultAction(ActionEnum.USE);

        LightingEntity.set(this.id, this);
    }

    setLightOn(lightOn = true) {
        this.lightOn = (lightOn === true);
        return 0;
    }
    getLightOn() {
        return this.lightOn;
    }
    setLightingPositionOffset(x = 0, y = 0, z = 0) {
        if (x instanceof Array) {
            y = x[1] || 0;
            z = x[2] || 0;
            x = x[0] || 0;
        }
        this.lightingPositionOffset = [x, y, z];
        return 0;
    }
    getLightingPositionOffset() {
        return this.lightingPositionOffset;
    }

    /**
     * Overrides FurnitureEntity.clone
     * @param  {string} id ID
     * @returns {LightingEntity} new LightingEntity
     */
    clone(id = "") {
        let clone = new LightingEntity(id, this.name, this.description, this.icon);
        if (this.hasContainer()) {
            clone.setContainer(this.container.clone(String(clone.id).concat("Container")));
        }
        clone.assign(this);
        return clone;
    }
    createInstance(id = "") {
        return new InstancedLightingEntity(id, this);
    }
    /**
     * Clones the entity's values over this
     * @param {Entity} entity 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(entity, verify = true) {
        if (verify && !(entity instanceof LightingEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        if (entity.hasOwnProperty("lightOn")) this.setLightOn(entity.lightOn);
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        LightingEntity.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.off();
        this.setLocked(true);
        this.setEnabled(false);
        LightingEntity.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "LightingEntity";
    }

    static initialize() {
        LightingEntity.lightingEntityList = {};
    }
    static get(id) {
        if (LightingEntity.has(id)) {
            return LightingEntity.lightingEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return LightingEntity.lightingEntityList.hasOwnProperty(id);
    }
    static set(id, lightEntity) {
        LightingEntity.lightingEntityList[id] = lightEntity;
        return 0;
    }
    static remove(id) {
        delete LightingEntity.lightingEntityList[id];
        return 0;
    }
    static list() {
        return LightingEntity.lightingEntityList;
    }
    static clear() {
        for (let i in LightingEntity.lightingEntityList) {
            LightingEntity.lightingEntityList[i].dispose();
        }
        LightingEntity.lightingEntityList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!LightingEntity.has(oldID)) {
            return 1;
        }
        LightingEntity.set(newID, LightingEntity.get(oldID));
        LightingEntity.remove(oldID);
        return 0;
    }
}
LightingEntity.initialize();