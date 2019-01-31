class EntityController {
    constructor(_id, _mesh, _entity) {
        _id = Game.filterID(_id);
        if (typeof _id != "string") {
            _id = genUUIDv4();
        }
        if (!(_mesh instanceof BABYLON.AbstractMesh)) {
            return null;
        }
        if (!(_entity instanceof AbstractEntity)) {
            return null;
        }

        this.id = _id;
        this.entity = undefined;
        this.setEntity(_entity);
        this.texture = null;
        this.material = null;
        this.mesh = undefined;
        this.setMesh(_mesh);
        this.networkID = null;
        this.propertiesChanged = true;
        this.targetController = null;
        this.targetedByControllers = new Set();
        this._isEnabled = true;

        Game.entityControllers[this.id] = this;
    }
    setID(_id) {
        this.id = _id;
        return this;
    }
    getID() {
        return this.id;
    }
    setNetworkID(_id) {
        this.networkID = _id;
        return this;
    }
    getNetworkID() {
        return this.networkID;
    }
    setTexture(_texture = undefined) {
        _texture = Game.loadTexture(_texture);
        if (_texture instanceof BABYLON.Texture) {
            this.texture = _texture;
            if (this.entity instanceof Entity) {
                this.entity.setTextureID(_texture);
            }
        }
        return this;
    }
    getTexture() {
        return this.texture;
    }
    setMaterial(_material = undefined) {
        _material = Game.loadMaterial(_material);
        if (_material instanceof BABYLON.Material) {
            this.material = _material;
            if (this.entity instanceof Entity) {
                this.entity.setMaterialID(_material);
            }
        }
        return this;
    }
    getMaterial() {
        return this.material;
    }
    setMesh(_mesh) {
        _mesh = Game.getAbstractMesh(_mesh);
        if (_mesh instanceof BABYLON.AbstractMesh) {
            this.mesh = _mesh;
            if (this.mesh.material instanceof BABYLON.Material) {
                this.setMaterial(this.mesh.material);
                this.setTexture(this.mesh.material.texture);
            }
            this.mesh.controller = this;
            this.mesh.isPickable = true;
            this.propertiesChanged = true;
            if (this.entity instanceof Entity) {
                this.entity.setMeshID(_mesh);
            }
        }
        return this;
    }
    getMesh() {
        return this.mesh;
    }
    hasMesh() {
        return this.mesh instanceof BABYLON.AbstractMesh;
    }
    setEntity(_entity) {
        if (_entity instanceof AbstractEntity) {
            this.entity = _entity;
            this.propertiesChanged = true;
        }
    }
    getEntity() {
        return this.entity;
    }
    setMeshSkeleton(_skeleton) {
        if (_skeleton instanceof BABYLON.Skeleton) {
            this.skeleton = _skeleton;
            this.checkAnimations(this.skeleton);
            this.propertiesChanged = true;
        }
        return this;
    }
    getMeshSkeleton() {
        return this.skeleton;
    }
    addTargetedBy(_controller, _updateChild = true) {
        if (!this._isEnabled) {
            return this;
        }
        if (!(_controller instanceof EntityController)) {
            return this;
        }
        this.targetedByControllers.add(_controller);
        if (_updateChild) {
            _controller.setTarget(this, false);
        }
        return this;
    }
    removeTargetedBy(_controller, _updateChild = true) {
        if (!this._isEnabled) {
            return this;
        }
        if (!(_controller instanceof EntityController)) {
            return this;
        }
        this.targetedByControllers.delete(_controller);
        if (_updateChild) {
            _controller.removeTarget(this, false);
        }
        return this;
    }
    clearTargetedBy() {
        this.targetedByControllers.forEach(function(_controller) {
            if (_controller instanceof CharacterController && _controller.targetController == this) {
                _controller.removeTarget(false);
            }
        }, this);
        if (!this._isEnabled) {
            return this;
        }
        this.targetedByControllers.clear();
        return this;
    }
    getTargetedBy() {
        return this.targetedByControllers;
    }
    updateProperties() {
        if (this.entity instanceof Entity && this.mesh instanceof BABYLON.AbstractMesh) {
            this.entity.setMeshID(this.mesh);
            this.entity.setTexture(this.texture);
            this.entity.setMeshScaling(this.mesh.scaling);
        }
        this.propertiesChanged = false;
        return this;
    }
    setParent(_mesh) {
        if (!(_mesh instanceof BABYLON.AbstractMesh)) {
            _mesh = Game.getAbstractMesh(_mesh);
        }
        this.getMesh().setParent(_mesh);
        return this;
    }
    getParent() {
        return this.getMesh().parent;
    }
    removeParent() {
        this.getMesh().setParent(null);
        return this;
    }
    isEnabled() {
        return this._isEnabled == true;
    }
    setEnabled(_isEnabled = true) {
        this._isEnabled = (_isEnabled == true);
        return this;
    }
    dispose() {
        this._isEnabled = false;
        if (Game.player.targetController == this) {
            Game.clearPlayerTarget()
        }
        this.clearTargetedBy();
        delete Game.entityControllers[this.id];
        this.entity.removeController();
        for (var _var in this) {
            this[_var] = null;
        }
        this.propertiesChanged = false;
        return null;
    }
}
