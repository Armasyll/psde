class EntityController {
    constructor(_id, _mesh, _entity) {
        _id = Tools.filterID(_id);
        if (typeof _id != "string") {
            _id = Tools.genUUIDv4();
        }
        if (!(_mesh instanceof BABYLON.AbstractMesh)) {
            return null;
        }
        if (!(_entity instanceof AbstractEntity)) {
            return null;
        }
        this.id = _id;
        this.entity = undefined;
        this.texture = null;
        this.material = null;
        this.mesh = undefined;
        this.networkID = null;
        this.propertiesChanged = true;
        this.targetController = null;
        this.targetedByControllers = new Set();
        this.animations = new Array();
        this.started = false;
        this._stopAnim = false;
        this.currAnim = null;
        this.prevAnim = null;
        this.skeleton = null;
        this.bonesInUse = [];
        /**
         * Array of bones per animation
         * @type {Object} <String:Array>
         */
        this.animationBones = {};
        this._isEnabled = true;
        this._isLocked = false;
        this._isAnimated = false;
        this.setMesh(_mesh);
        this.setEntity(_entity);
        Game.setEntityController(this.id, this);
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
        _mesh = Game.getMesh(_mesh);
        if (_mesh instanceof BABYLON.AbstractMesh) {
            this.mesh = _mesh;
            if (this.mesh.material instanceof BABYLON.Material) {
                this.setMaterial(this.mesh.material);
                this.setTexture(this.mesh.material.diffuseTexture);
            }
            if (this.mesh.skeleton instanceof BABYLON.Skeleton) {
                this.skeleton = this.mesh.skeleton;
            }
            this.mesh.isPickable = true;
            this.propertiesChanged = true;
            if (this.entity instanceof Entity) {
                this.entity.setMeshID(_mesh);
            }
            Game.setMeshToEntityController(this.mesh, this);
        }
        return this;
    }
    getMesh() {
        return this.mesh;
    }
    hasMesh() {
        return this.mesh instanceof BABYLON.AbstractMesh;
    }
    setSkeleton(_mesh) { // lolno
        return this;
    }
    getSkeleton() {
        return this.skeleton;
    }
    hasSkeleton() {
        return this.skeleton instanceof BABYLON.Skeleton;
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
    hasEntity() {
        return this.entity instanceof AbstractEntity;
    }
    setMeshSkeleton(_skeleton) {
        if (_skeleton instanceof BABYLON.Skeleton) {
            this.skeleton = _skeleton;
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
            this.entity.setTextureID(this.texture);
        }
        this.propertiesChanged = false;
        return this;
    }
    setParent(_mesh) {
        if (!(_mesh instanceof BABYLON.AbstractMesh)) {
            _mesh = Game.getMesh(_mesh);
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

    setAnimData(_anim, _rangeName, _rate = 1, _loop = true, _standalone = true) {
        if (this.skeleton == null) {
            return;
        }
        _anim.name = _rangeName;
        _anim.rate = _rate;
        _anim.loop = _loop;
        _anim.standalone = _standalone;
        if (this.skeleton.getAnimationRange(_anim.name) != null) {
            _anim.exist = true;
            this.skeleton.getAnimationRange(_rangeName).from += 1;
            _anim.from = this.skeleton.getAnimationRange(_rangeName).from;
            _anim.to = this.skeleton.getAnimationRange(_rangeName).to;
            if (Game.entityAnimationBones.hasOwnProperty(_rangeName)) {
                this.animationBones[_rangeName] = new Array();
                for (var _i = 0; _i < Game.entityAnimationBones[_rangeName].length; _i++) {
                    this.animationBones[_rangeName].push(this.skeleton.getBoneIndexByName(Game.entityAnimationBones[_rangeName][_i]));
                }
            }
        }
        else {
            _anim.exist = false;
        }
    }
    checkAnims(_skel) {
        for (var _i = 0; _i < this.animations.length; _i++) {
            var anim = this.animations[_i];
            if (_skel.getAnimationRange(anim.name) != null) {
                anim.exist = true;
            }
        }
    }
    beginAnimation(_animData) {
        if (this._stopAnim) {
            return false;
        }
        else if (!(_animData instanceof AnimData)) {
            return false;
        }
        else if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return false;
        }
        else if (this.prevAnim == _animData) {
            return false;
        }
        else if (!_animData.exist) {
            return false;
        }
        if (this.bonesInUse.length > 0) {
            /*
            Have to cycle through all the bones just so I don't have to animate a handful :L
             */
            this.skeleton.bones.difference(this.bonesInUse).forEach(function(_bone) {
                Game.scene.beginAnimation(_bone, _animData.from, _animData.to, _animData.loop, _animData.rate);
            });
        }
        else {
            this.skeleton.beginAnimation(_animData.name, _animData.loop, _animData.rate);
        }
        this.prevAnim = _animData;
        return true;
    }
    pauseAnim() {
        this._stopAnim = true;
    }
    resumeAnim() {
        this._stopAnim = false;
    }
    start() {
        if (this.started) {
            return;
        }
        this.started = true;
    }
    stop() {
        if (!this.started) {
            return;
        }
        this.started = false;
        this.prevAnim = null;
    }
    moveAV() {
        return this;
    }

    isEnabled() {
        return this._isEnabled;
    }
    setEnabled(_bool = true) {
        this._isEnabled = _bool == true;
        return this;
    }
    isAnimated() {
        return this._isAnimated;
    }
    setAnimated(_bool = true) {
        this._isAnimated = _bool == true;
        return this;
    }
    isLocked() {
        return this._isLocked;
    }
    setLocked(_bool = true) {
        this._isLocked = _bool == true;
        return this;
    }
    dispose() {
        this._isEnabled = false;
        if (Game.player.getController().targetController == this) {
            Game.clearPlayerTarget()
        }
        this.clearTargetedBy();
        if (this.mesh instanceof BABYLON.AbstractMesh) {
            Game.removeMeshToEntityController(this.mesh.id);
        }
        else {
            Game.removeMeshToEntityController(this.entity.getMeshID());
        }
        this.entity.removeController();
        for (var _var in this) {
            this[_var] = null;
        }
        this.propertiesChanged = false;
        Game.removeEntityController(this.id);
        return null;
    }
}
