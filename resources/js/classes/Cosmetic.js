class Cosmetic {
    constructor(_id, _name = "", _description = "", _image = "genericItem", _mesh = "", _material = undefined, _equipmentSlot = ApparelSlotEnum.HEAD) {
        _id = Game.filterID(_id);
        if (typeof _id != "string") {
            _id = genUUIDv4();
        }
        this.id = _id;
        this.name = "";
        this.description = "";
        this.image = "";
        this.meshID = "";
        this.materialID = "";
        this.equipmentSlot = ApparelSlotEnum.HEAD;

        this.setName(_name);
        this.setDescription(_description);
        this.setImage(_image);
        this.setMeshID(_mesh);
        this.setMaterialID(_material);
        this.setApparelSlot(_equipmentSlot);

        Game.setCosmetic(this.id, this);
    }

    getID() {
        return this.id;
    }
    setName(_name) {
        this.name = Game.filterName(_name);
    }
    getName() {
        return this.name;
    }
    setDescription(_description) {
        this.description = Game.filterName(_description);
    }
    getDescription() {
        return this.description;
    }
    setImage(_image) {
        if (Game.hasIcon(_image)) {
            this.image = _image;
        }
        else {
            this.image = "missingIcon";
        }
        return this;
    }
    getImage() {
        return this.image;
    }
    setMeshID(_mesh) {
        var _loadedMesh = Game.loadMesh(_mesh);
        if (_loadedMesh instanceof BABYLON.AbstractMesh) {
            if (_loadedMesh.id == "loadingMesh") {
                if (_mesh instanceof BABYLON.AbstractMesh) {
                    this.meshID = _mesh.id;
                }
                else {
                    this.meshID = _mesh;
                }
            }
            else if (_loadedMesh.id == "missingMesh") {
                this.meshID = "missingMesh";
            }
            else {
                this.meshID = _loadedMesh.name;
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
    setMaterialID(_material) {
        _material = Game.loadMaterial(_material);
        if (_material instanceof BABYLON.Material) {
            this.materialID = _material.name;
        }
        else {
            this.materialID = "missingMaterial";
        }
        return this;
    }
    getMaterialID() {
        return this.materialID;
    }
    setApparelSlot(_type) {
        if (isNaN(_type)) {
            return this;
        }
        if (ApparelSlotEnum.properties.hasOwnProperty(_type)) {
            this.equipmentSlot = _type;
        }
        else {
            this.equipmentSlot = ApparelSlotEnum.HEAD;
        }
        return this;
    }
    getApparelSlot() {
        return this.equipmentType;
    }

    dispose() {
        Game.removeEntity(this.id);
        return undefined;
    }
}