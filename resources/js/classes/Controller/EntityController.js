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
         * @type {Object} <string:Array>
         */
        this.animationBones = {};
        this._isEnabled = true;
        this._isLocked = false;
        this._isAnimated = false;
        this.setMesh(_mesh);
        this.setEntity(_entity);
        this.entity.setController(this);
        if (this.entity instanceof Entity) {
            this.entity.setMeshID(this.mesh.name);
        }
        Game.entityLocRotWorker.postMessage({
            cmd:"set",
            msg:[
                this.entity.getID(),
                new Date().getTime(),
                this.mesh.position.asArray(),
                this.mesh.rotation.asArray()
            ]
        });
        this.mesh.alwaysSelectAsActiveMesh = true;
        this.currentCell = null;
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
    setTexture(texture) {
        if (texture instanceof BABYLON.Texture) {
            this.texture = texture;
        }
        return this;
    }
    getTexture() {
        return this.texture;
    }
    setMaterial(material) {
        if (material instanceof BABYLON.Material) {
            this.material = material;
        }
        return this;
    }
    getMaterial() {
        return this.material;
    }
    setMesh(mesh) {
        if (mesh instanceof BABYLON.AbstractMesh) {
            this.mesh = mesh;
            if (this.mesh.material instanceof BABYLON.Material) {
                this.setMaterial(this.mesh.material);
                this.setTexture(this.mesh.material.diffuseTexture);
            }
            if (this.mesh.skeleton instanceof BABYLON.Skeleton) {
                this.setSkeleton(this.mesh.skeleton);
            }
            this.mesh.isPickable = true;
            this.propertiesChanged = true;
            Game.setMeshToEntityController(this.mesh.id, this);
        }
        return this;
    }
    /**
     * Returns the primary mesh associated with this controller.
     * @returns {BABYLON.AbstractMesh}
     */
    getMesh() {
        return this.mesh;
    }
    hasMesh() {
        return this.mesh instanceof BABYLON.AbstractMesh;
    }
    setSkeleton(skeleton) {
        this.skeleton = skeleton;
        for (let boneGroup in Game.entityAnimationBones) {
            this.animationBones[boneGroup] = new Array();
            for (let i = 0; i < Game.entityAnimationBones[boneGroup].length; i++) {
                this.animationBones[boneGroup].push(this.skeleton.getBoneIndexByName(Game.entityAnimationBones[boneGroup][i]));
            }
        }
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
        this.propertiesChanged = false;
        return this;
    }
    setParent(_mesh) {
        if (!(_mesh instanceof BABYLON.AbstractMesh)) {
            if (_mesh == undefined) {}
            else if (Game.hasLoadedMesh(_mesh)) {
                _mesh = Game.getMesh(_mesh);
            }
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
    beginAnimation(_animData, callback = null) {
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
                Game.scene.beginAnimation(_bone, _animData.from, _animData.to, _animData.loop, _animData.rate, callback);
            });
        }
        else {
            this.skeleton.beginAnimation(_animData.name, _animData.loop, _animData.rate, callback);
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
    /**
     * Returns all meshes associated with this controller.
     * @returns {Set<BABYLON.AbstractMesh>}
     */
    getMeshes() {
        return [this.mesh];
    }
    setCell(cell) {
        if (cell instanceof Cell) {
            this.cell = cell;
        }
        else if (Game.hasCell(cell)) {
            this.cell = Game.getCell(cell);
        }
        else {
            return 2;
        }
        return 0;
    }
    getCell() {
        return this.cell;
    }
    hasCell() {
        return this.cell instanceof Cell;
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
        this.setLocked(true);
        this.setEnabled(false);
        this.propertiesChanged = false;
        this.animations.clear();
        if (Game.player.getController().targetController == this) {
            Game.clearPlayerTarget()
        }
        this.clearTargetedBy();
        if (this.hasEntity) {
            this.entity.removeController();
        }
        /*if (this.mesh instanceof BABYLON.AbstractMesh) {
            Game.removeMeshToEntityController(this.mesh.id);
            Game.removeMesh(this.mesh);
        }
        else {
            Game.removeMeshToEntityController(this.entity.getMeshID());
            Game.removeMesh(this.mesh);
        }*/
        for (let val in this) {
            this[val] = null;
        }
        Game.removeEntityController(this.id);
        return null;
    }
}
