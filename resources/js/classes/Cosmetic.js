class Cosmetic {
    constructor(id, name = "", description = "", iconID = "genericItemIcon", meshID = "", materialID = undefined, equipmentSlot = ApparelSlotEnum.HEAD) {
        id = Tools.filterID(id);
        if (typeof id != "string") {
            id = Tools.genUUIDv4();
        }
        this.id = id;
        this.name = "";
        this.description = "";
        this.icon = "";
        this.meshID = "";
        this.materialID = "";
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
        if (Game.hasIcon(icon)) {
            this.icon = icon;
        }
        else {
            this.icon = "missingIcon";
        }
        return this;
    }
    getIcon() {
        return this.icon;
    }
    setMeshID(meshID) {
        if (Game.hasLoadedMesh(meshID)) {
            this.meshID = meshID;
        }
        else {
            this.meshID = "missingMesh";
        }
        return this;
    }
    getMeshID() {
        return this.meshID;
    }
    setMaterialID(materialID) {
        if (Game.hasLoadedMaterial(materialID)) {
            this.materialID = materialID;
        }
        else {
            this.materialID = "missingMaterial";
        }
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