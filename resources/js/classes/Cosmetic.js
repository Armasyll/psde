class Cosmetic {
    constructor(id, name = "", description = "", icon = "genericItemIcon", mesh = "", material = undefined, equipmentSlot = ApparelSlotEnum.HEAD) {
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
        this.setIcon(icon);
        this.setMeshID(mesh);
        this.setMaterialID(material);
        this.setApparelSlot(equipmentSlot);

        Game.setCosmetic(this);
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
    setMeshID(mesh) {
        let loadedMesh = Game.loadMesh(mesh);
        if (loadedMesh instanceof BABYLON.AbstractMesh) {
            if (loadedMesh.id == "loadingMesh") {
                if (mesh instanceof BABYLON.AbstractMesh) {
                    this.meshID = mesh.id;
                }
                else {
                    this.meshID = mesh;
                }
            }
            else if (loadedMesh.id == "missingMesh") {
                this.meshID = "missingMesh";
            }
            else {
                this.meshID = loadedMesh.name;
            }
        }
        else {
            this.meshID = "missingMesh";
        }
        return this;
    }
    getMeshID() {
        return this.meshID;
    }
    setMaterialID(material) {
        material = Game.loadMaterial(material);
        if (material instanceof BABYLON.Material) {
            this.materialID = material.name;
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
        Game.removeCosmetic(this);
        return 0;
    }
}