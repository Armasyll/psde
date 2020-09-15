/**
 * Cosmetic
 */
class Cosmetic {
    /**
     * Creates as Cosmetic
     * @param {string} id 
     * @param {string} name 
     * @param {string} [description] 
     * @param {string} [iconID] 
     * @param {string} meshID 
     * @param {string} materialID 
     * @param {(ApparelSlotEnum|number)} equipmentSlot 
     */
    constructor(id = "", name = "", description = "", iconID = "genericItemIcon", meshID = "missingMesh", materialID = "missingMaterial", equipmentSlot = ApparelSlotEnum.HEAD) {
        id = Tools.filterID(id);
        if (typeof id != "string") {
            id = Tools.genUUIDv4();
        }
        this.id = id;
        this.name = "";
        this.description = "";
        this.iconID = "missingIcon";
        this.meshID = "missingMesh";
        this.materialID = "missingMaterial";
        this.equipmentSlot = ApparelSlotEnum.HEAD;

        this.setName(name);
        this.setDescription(description);
        this.setIcon(iconID);
        this.setMeshID(meshID);
        this.setMaterialID(materialID);
        this.setApparelSlot(equipmentSlot);

        Cosmetic.set(this);
    }
    getID() {
        return this.id;
    }
    setName(name) {
        this.name = Tools.filterName(name);
    }
    getName() {
        return this.name;
    }
    setDescription(description) {
        this.description = Tools.filterName(description);
    }
    getDescription() {
        return this.description;
    }
    setIcon(icon) {
        this.iconID = icon;
        return this;
    }
    getIcon() {
        return this.iconID;
    }
    setMeshID(meshID) {
        this.meshID = meshID;
        return this;
    }
    getMeshID() {
        return this.meshID;
    }
    setMaterialID(materialID) {
        this.materialID = materialID;
        return this;
    }
    getMaterialID() {
        return this.materialID;
    }
    setApparelSlot(apparelSlot) {
        if (isNaN(apparelSlot)) {
            return this;
        }
        if (ApparelSlotEnum.properties.hasOwnProperty(apparelSlot)) {
            this.equipmentSlot = apparelSlot;
        }
        else {
            this.equipmentSlot = ApparelSlotEnum.HEAD;
        }
        return this;
    }
    getApparelSlot() {
        return this.equipmentSlot;
    }
    dispose() {
        Cosmetic.remove(this.id);
        return 0;
    }
    getClassName() {
        return "Cosmetic";
    }

    static initialize() {
        Cosmetic.cosmeticList = {};
    }
    static get(id) {
        if (Cosmetic.has(id)) {
            return Cosmetic.cosmeticList[id];
        }
        return 1;
    }
    static has(id) {
        return Cosmetic.cosmeticList.hasOwnProperty(id);
    }
    static set(id, lightCosmetic) {
        Cosmetic.cosmeticList[id] = lightCosmetic;
        return 0;
    }
    static remove(id) {
        delete Cosmetic.cosmeticList[id];
        return 0;
    }
    static list() {
        return Cosmetic.cosmeticList;
    }
    static clear() {
        for (let i in Cosmetic.cosmeticList) {
            Cosmetic.cosmeticList[i].dispose();
        }
        Cosmetic.cosmeticList = {};
        return 0;
    }
}
Cosmetic.initialize();