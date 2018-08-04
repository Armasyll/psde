class EntityController {
    constructor(_id, _avatar, _entity) {
        if (typeof _id != "string") {_id = genUUIDv4();}
        _id = Game.filterID(_id);
        if (!(_avatar instanceof BABYLON.Mesh || _avatar instanceof BABYLON.InstancedMesh) || !_avatar.skeleton instanceof BABYLON.Skeleton) return null;
        if (!(_entity instanceof Entity) && !(_entity instanceof InstancedEntity)) return null;
        this.id = _id;
        this.avatar = undefined;
        this.setAvatar(_avatar);
        this.entity = undefined;
        this.setEntity(_entity);
        this.networkID = null;
        this.skin = null;
        this.avatar.controller = this;
        this.avatar.isPickable = true;

        this.propertiesChanged = true;

        this.targetController = null;
        this.targetedByControllers = new Set();

        this.defaultAction = null;
        this.setDefaultAction("look");

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
            this.setAvatarSkin(this.avatar.material);
            this.propertiesChanged = true;
        }
    }
    getAvatar() {
        return this.avatar;
    }
    hasAvatar() {
        return (this.avatar instanceof BABYLON.Mesh || this.avatar instanceof BABYLON.InstancedMesh)
    }
    setEntity(_entity) {
        if (_entity instanceof Entity || _entity instanceof InstancedEntity) {
            this.entity = _entity;
            this.propertiesChanged = true;
        }
    }
    getEntity() {
        return this.entity;
    }
    setAvatarSkeleton(_skeleton) {
        this.skeleton = _skeleton;
        this.checkAnimations(this.skeleton);
        this.propertiesChanged = true;
    }
    getAvatarSkeleton() {
        return this.skeleton;
    }
    setAvatarSkin(_skin = undefined) {
        var _result = undefined;
        if (_skin == undefined) {
            _result = this.setAvatarSkinFromAvatar(this.avatar);
        }
        else if (typeof _skin == BABYLON.Texture) {
            _result = this.setAvatarSkinFromString(_skin.name);
        }
        else if (typeof _skin == BABYLON.Material) {
            _result = this.setAvatarSkinFromString(_skin.diffuseTexture.url);
        }
        else if (typeof _skin == "string") {
            _result = this.setAvatarSkinFromString(_skin);
        }
        else if ((_skin instanceof BABYLON.Mesh || _skin instanceof BABYLON.InstancedMesh) && _skin.material instanceof BABYLON.Material) {
            _result = this.setAvatarSkinFromAvatar(_skin);
        }
        else if (_skin instanceof CharacterController) {
            _result = this.setAvatarSkinFromAvatar(_skin.avatar);
        }
        else {
            return;
        }
        this.propertiesChanged = true;
        return _result;
    }
    setAvatarSkinFromAvatar(_mesh) {
        if (!(_mesh instanceof BABYLON.Mesh && _mesh instanceof BABYLON.InstancedMesh) || !(_mesh.material instanceof BABYLON.Material)) {
            return false;
        }
        this.skin = _mesh.material.diffuseTexture.name;
        this.avatar.material = _mesh.material.clone();
        return true;
    }
    setAvatarSkinFromString(_string) {
        this.skin = _string;
        this.avatar.material = new BABYLON.StandardMaterial();
        this.avatar.material.diffuseTexture = new BABYLON.Texture(_string);
        this.avatar.material.specularColor.set(0,0,0);
        return true;
    }
    getAvatarSkin() {
        return this.skin;
    }
    removeAvatar() {
        this.avatarSkin = undefined;
        this.avatar = undefined;
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
    removeTargetedBy(_controller, _updateChild = true) {
        if (!(_controller instanceof EntityController)) {
            return undefined;
        }
        this.targetedByControllers.delete(_controller);
        if (_updateChild) {
            _controller.removeTarget(this, false);
        }
    }
    clearTargetedBy() {
        this.targetedByControllers.forEach(function(_controller) {
            if (_controller instanceof CharacterController && _controller.targetController == this) {
                _controller.removeTarget(false);
            }
        }, this);
        this.targetedByControllers = null;
    }
    getTargetedBy() {
        return this.targetedByControllers;
    }
    updateProperties() {
        if (this.entity instanceof Entity && (this.avatar instanceof BABYLON.Mesh || this.avatar instanceof BABYLON.InstancedMesh)) {
            this.entity.setAvatarID(this.avatar);
            this.entity.setAvatarSkin(this.avatarSkin);
            this.entity.setAvatarScaling(this.avatar.scaling);
        }
        this.propertiesChanged = false;
    }
    setDefaultAction(_action) {
        if (!(this.entity instanceof Entity) && !(this.entity instanceof InstancedEntity)) {
            return;
        }
        if (this.entity.hasAvailableAction(_action)) {
            this.defaultAction = _action;
        }
    }
    getDefaultAction() {
        return this.defaultAction;
    }
    getAvailableActions() {
        if (!(this.entity instanceof Entity) && !(this.entity instanceof InstancedEntity)) {
            return;
        }
        return this.entity.getAvailableActions();
    }
    setParent(_mesh) {
        if (!(_mesh instanceof BABYLON.Mesh) && !(_mesh instanceof BABYLON.InstancedMesh)) {
            _mesh = Game.getEntityMesh(_mesh);
        }
        this.getAvatar().setParent(_mesh);
    }
    getParent() {
        return this.getAvatar().parent;
    }
    removeParent() {
        this.getAvatar().setParent(null);
    }
    dispose() {
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
        return undefined;
    }
}