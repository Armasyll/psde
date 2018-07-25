class EntityController {
    constructor(_id, _avatar, _entity) {
        if (!(_avatar instanceof BABYLON.Mesh || _avatar instanceof BABYLON.InstancedMesh) || !_avatar.skeleton instanceof BABYLON.Skeleton) return null;
        if (!_entity instanceof Character) return null;
        this.id = _id;
        this.avatar = _avatar;
        this.entity = _entity;
        this.networkID = null;
        this.skin = null;
        this.avatar.controller = this;
        this.avatar.isPickable = true;

        this.targetController = null;
        this.targetedByControllers = new Set();

        Game.entityControllers[this.id] = this;
    }
    setID(_id) {
        this.id = _id;
    }
    getID() {
        return this.id;
    }
    setNetworkID(_id) {
        this.networkID = _id;
    }
    getNetworkID() {
        return this.networkID;
    }
    setAvatar(_mesh) {
        if (_mesh instanceof BABYLON.Mesh || _mesh instanceof BABYLON.InstancedMesh) {
            this.avatar = _mesh;
        }
    }
    geAvatar() {
        return this.avatar;
    }
    setEntity(_entity) {
        if (_entity instanceof Entity || _entity instanceof InstancedEntity) {
            this.entity = _entity;
        }
    }
    setAvatarSkeleton(_skeleton) {
        this.skeleton = _skeleton;
        this.checkAnimations(this.skeleton);
    }
    getAvatarSkeleton() {
        return this.skeleton;
    }
    setAvatarSkin(_skin = undefined) {
        var _result = undefined;
        if (_skin == undefined) {
            _result = this._setAvatarSkinFromAvatar(this.avatar);
        }
        else if (typeof _skin == BABYLON.Texture) {
            _result = this._setAvatarSkinFromString(_skin.name);
        }
        else if (typeof _skin == BABYLON.Material) {
            _result = this._setAvatarSkinFromString(_skin.diffuseTexture.name);
        }
        else if (typeof _skin == "string") {
            _result = this._setAvatarSkinFromString(_skin);
        }
        else if ((_skin instanceof BABYLON.Mesh || _skin instanceof BABYLON.InstancedMesh) && _skin.material instanceof BABYLON.Material) {
            _result = this._setAvatarSkinFromAvatar(_skin);
        }
        else if (_skin instanceof CharacterController) {
            _result = this._setAvatarSkinFromAvatar(_skin.avatar);
        }
        return _result;
    }
    _setAvatarSkinFromAvatar(_mesh) {
        if (!(_mesh instanceof BABYLON.Mesh && _mesh instanceof BABYLON.InstancedMesh) || !(_mesh.material instanceof BABYLON.Material)) {
            return false;
        }
        if (!Game.hasSkin(_mesh.material.diffuseTexture.name)) {
            return false;
        }
        this.skin = _mesh.material.diffuseTexture.name;
        this.avatar.material = _mesh.material.clone();
        return true;
    }
    _setAvatarSkinFromString(_string) {
        if (!Game.hasSkin(_string)) {
            return false;
        }
        this.skin = _string;
        this.avatar.material = new BABYLON.StandardMaterial();
        this.avatar.material.diffuseTexture = new BABYLON.Texture("resources/data/" + _string);
        this.avatar.material.specularColor.set(0,0,0);
        return true;
    }
    getAvatarSkin() {
        return this.skin;
    }
    addTargetedBy(_controller, _updateChild = true) {
        if (!(_controller instanceof EntityController)) {
            return undefined;
        }
        this.targetedByControllers.add(_controller);
        if (_updateChild) {
            _controller.setTarget(this, false);
        }
    }
    deleteTargetedBy(_controller, _updateChild = true) {
        if (!(_controller instanceof EntityController)) {
            return undefined;
        }
        this.targetedByControllers.delete(_controller);
        if (_updateChild) {
            _controller.deleteTarget(this, false);
        }
    }
    clearTargetedBy() {
        this.targetedByControllers.forEach(function(_controller) {
            if (_controller.targetController == this) {
                _controller.targetController.deleteTarget(false);
            }
        }, this);
        this.targetedByControllers = null;
    }
    getTargetedBy() {
        return this.targetedByControllers;
    }
    dispose() {
        delete Game.entityControllers[this.id];
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}