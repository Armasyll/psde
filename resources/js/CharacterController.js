class CharacterController {
    constructor(_mesh, _meshID) {
        _meshID = Game.filterID(_meshID);
        if (_meshID == null || !(Game.scene.getMeshByID(_meshID) instanceof BABYLON.Mesh)) return null;
        if (!_mesh instanceof BABYLON.Mesh || !_mesh.skeleton instanceof BABYLON.Skeleton) return null;

        this.meshID = _meshID;
        this.mesh = _mesh;
        this.id = this.mesh.id;
        this.name = "";

        this.moveDistance = 0;
        this.moveVector = new BABYLON.Vector3();
        this.moveFallTime = 0;
        this.freeFallDistance = 0;
        this.dt = 0;
        this.u = 0;

        this.moveForward = false;
        this.moveBackward = false;
        this.runForward = false;
        this.strafeRight = false;
        this.strafeLeft = false;
        this.turnRight = false;
        this.turnLeft = false;
        this.jump = false;
        this.animations = {};
        this._populateAnimations();

        this.attachedMeshes = {};
    }
    setID(_id) {
        this.id = _id;
        this.mesh.id = _id;
    }
    setName(_name) {
        this.name = _name;
        this.mesh.name = _name;
    }
    setNetworkID(_id) {
        this.networkID = _id;
    }
    getNetworkID() {
        return this.networkID;
    }
    setMovementStatus(_moveForward = false, _moveBackward = false, _runForward = false, _strafeRight = false, _strafeLeft = false, _turnRight = false, _turnLeft = false, _jump = false) {
        this.moveForward = _moveForward;
        this.moveBackward = _moveBackward;
        this.runForward = _runForward;
        this.strafeRight = _strafeRight;
        this.strafeLeft = _strafeLeft;
        this.turnRight = _turnRight;
        this.turnLeft = _turnLeft;
        this.jump = _jump;
    }
    getBone(_bone) {
        if (Game.debugEnabled) console.log("Running getBone");
        if (_bone instanceof BABYLON.Bone) {
            return _bone;
        }
        else if (typeof _bone == "string") {
            return this.getBoneByName(_bone);
        }
        else if (typeof _bone == "number") {
            return this.getBoneByID(_bone);
        }
        else {
            return null;
        }
    }
    getBoneByName(_string) {
        return this.mesh.skeleton.bones[this.mesh.skeleton.getBoneIndexByName(_string)];
    }
    getBoneByID(_int) {
        return this.mesh.skeleton.bones[_int];
    }
    attachToBone(_mesh, _bone, _position = {x:0, y:0, z:0}, _rotation = {x:0, y:0, z:0}, _scale = {x:0, y:0, z:0}) {
        if (Game.debugEnabled) console.log("Running attachToBone");
        if (typeof _mesh == "string") {_mesh = Game.filterID(_mesh);}
        _mesh = Game.getMesh(_mesh);
        if (_mesh instanceof BABYLON.Mesh) {_mesh = _mesh.clone();}
        else if (_mesh == null) {return null;}
        _bone = this.getBone(_bone); if (_bone == null) {return null;}
        _mesh.attachToBone(_bone, this.mesh);
        _mesh.position.set(_position.x, _position.y, _position.z);
        _mesh.rotation.set(_rotation.x, _rotation.y, _rotation.z);
        if (_scale == 0) {
            _mesh.scaling.copyFrom(this.mesh.scaling);
        }
        if (this.attachedMeshes[_bone.id] != undefined) {
            this.detachFromBone(_bone.id);
        }
        this.attachedMeshes[_bone.id] = _mesh;
        return _mesh;
    }
    detachFromBone(_bone) {
        _bone = this.getBone(_bone);
        if (_bone instanceof BABYLON.Bone) {
            this.attachedMeshes[_bone.id].dispose();
            this.attachedMeshes[_bone.id] = undefined;
        }
    }
    detachMeshFromBone(_mesh) {
        for (var _bone in this.attachedMeshes) {
            if (_bone == "ROOT" || _bone == "FOCUS") {
                return undefined;
            }
            if ((this.attachedMeshes[_bone] instanceof BABYLON.Mesh || this.attachedMeshes[_bone] instanceof BABYLON.InstancedMesh) && this.attachedMeshes[_bone].name == _mesh.name) {
                this.detachFromBone(_bone);
            }
        }
    }
    detachFromAllBones() {
        for (var _bone in this.attachedMeshes) {
            if (_bone == "ROOT" || _bone == "FOCUS") {
                return undefined;
            }
            if (this.attachedMeshes[_bone] instanceof BABYLON.Mesh || this.attachedMeshes[_bone] instanceof BABYLON.InstancedMesh) {
                this.detachFromBone(_bone);
            }
        }
    }
    getMeshAttachedToBone(_bone) {
        _bone = this.getBone(_bone);
        if (_bone instanceof BABYLON.Bone) {
            return this.attachedMeshes[_bone.id];
        }
        else {
            return undefined;
        }
    }
    attachToLeftEye(_mesh) {
        return this.attachToBone(_mesh, "eye.l", {x:0, y:0, z:0}, {x:BABYLON.Tools.ToRadians(90), y:0, z:0});
    }
    attachToRightEye(_mesh) {
        return this.attachToBone(_mesh, "eye.r", {x:0, y:0, z:0}, {x:BABYLON.Tools.ToRadians(90), y:0, z:0});
    }
    attachToThirdEye(_mesh) {
        return this.attachToBone(_mesh, "thirdEye", {x:0, y:0, z:0}, {x:BABYLON.Tools.ToRadians(90), y:0, z:0});
    }
    attachToHead(_mesh) {
        return this.attachToBone(_mesh, "head", {x:0, y:0, z:0}, {x:0, y:BABYLON.Tools.ToRadians(180), z:0});
    }
    attachToFOCUS(_mesh) {
        var _focus = this.attachToBone(_mesh, "FOCUS");
        _focus.material = Game._collisionMaterial;
        return _focus;
    }
    detachFromThirdEye(_mesh) {
    }
    attachToLeftHand(_mesh) {
        return this.attachToBone(_mesh, "hand.l", {x:0, y:0, z:0}, {x:0, y:BABYLON.Tools.ToRadians(90), z:BABYLON.Tools.ToRadians(-90)});
    }
    attachToRightHand(_mesh) {
        return this.attachToBone(_mesh, "hand.r", {x:0, y:0, z:0}, {x:0, y:BABYLON.Tools.ToRadians(90), z:BABYLON.Tools.ToRadians(-90)});
    }
    _populateAnimations() {
        for (var _key in this.mesh.skeleton.getAnimationRanges()) {
            var _animationRange = this.mesh.skeleton.getAnimationRanges()[_key];
            this.animations[_animationRange.name] = Game.scene.beginWeightedAnimation(this.mesh.skeleton, _animationRange.from + 1, _animationRange.to - 1, 0.0, true);
        }
    }
    runAnimation(_animation, _weight = 1.0, _speedRatio = 1) {
        this.animations[_animation].weight = _weight;
        this.animations[_animation].speedRatio = _speedRatio;
    }
    /*runAnimationOnce(_animation, _weight = 1.0) {
        this.animations[_animation].weight = _weight;
    }*/
    stopAnimation(_animation) {
        this.animations[_animation].weight = 0.0;
    }
    doAttackLeftHand() {

    }
    doAttachRightHand() {

    }
    _doMoveForwardPhysics(_multiplier = 1.2) {
        this.mesh.physicsImposter.setLinearVelocity(new BABYLON.Vector3(
            -Math.sin(this.mesh.physicsImposter.physicsBody.getQuaternion().y),
            Game.scene.gravity.y,
            -Math.cos(this.mesh.physicsImposter.physicsBody.getQuaternion().y))
        );
    }
    _doMoveForwardCollisions(_multiplier = 1.2) {
        this.u = this.moveFallTime * -Game.scene.gravity.y;
        this.dt = Game.scene.getEngine().getDeltaTime() / 1000;
        this.freeFallDistance = this.u * this.dt + -Game.scene.gravity.y * this.dt * this.dt / 2;
        this.moveFallTime = this.moveFallTime + this.dt;
        this.moveDistance = this.mesh.getBoundingInfo().boundingBox.extendSize.y * _multiplier * this.dt;
        this.moveVector = this.mesh.calcMovePOV(0, -this.freeFallDistance, -this.moveDistance);
        if (this.moveVector.length() > 0.001) {
            this.mesh.moveWithCollisions(this.moveVector);
        }
    }
    doMoveForward(_multiplier = 1.2) {
        if (Game.debugEnabled) console.log("Running doMoveForward");
        if (Game.physicsEnabled) {this._doMoveForwardPhysics(_multiplier);}
        else {this._doMoveForwardCollisions(_multiplier);}
        this.moveForward = true;
        this.moveBackward = false;
        this.runForward = false;
        if (this.networkID != undefined) {Client.updateLocRotSelf();}
    }
    doRunForward() {
        if (Game.debugEnabled) console.log("Running doRunForward");
        if (Game.physicsEnabled) {this._doMoveForwardPhysics(2.4);}
        else {this._doMoveForwardCollisions(2.4);}
        this.moveForward = false;
        this.moveBackward = false;
        this.runForward = true;
        if (this.networkID != undefined) {Client.updateLocRotSelf();}
    }
    _doMoveBackwardPhysics(_multiplier = 0.7) {
        this.mesh.physicsImposter.setLinearVelocity(new BABYLON.Vector3(
            -Math.sin(this.mesh.physicsImposter.physicsBody.getQuaternion().y),
            Game.scene.gravity.y,
            -Math.cos(this.mesh.physicsImposter.physicsBody.getQuaternion().y))
        );
    }
    _doMoveBackwardCollisions(_multiplier = 0.7) {
        this.u = this.moveFallTime * -Game.scene.gravity.y;
        this.dt = Game.scene.getEngine().getDeltaTime() / 1000;
        this.freeFallDistance = this.u * this.dt + -Game.scene.gravity.y * this.dt * this.dt / 2;
        this.moveFallTime = this.freeFallDistance + this.dt;
        this.moveDistance = this.mesh.getBoundingInfo().boundingBox.extendSize.y * _multiplier * this.dt;
        this.moveVector = this.mesh.calcMovePOV(0, -this.freeFallDistance, this.moveDistance);
        if (this.moveVector.length() > 0.001) {
            this.mesh.moveWithCollisions(this.moveVector);
        }
    }
    doMoveBackward(_multiplier = 0.7) {
        if (Game.debugEnabled) console.log("Running doMoveBackward");
        if (Game.physicsEnabled) {this._doMoveBackwardPhysics();}
        else {this._doMoveBackwardCollisions();}
        this.moveBackward = true;
        this.moveForward = false;
        this.runForward = false;
        if (this.networkID != undefined) {Client.updateLocRotSelf();}
    }
    _doTurnLeftPhysics(_multiplier = 1.0) {
        this.mesh.physicsImposter.setAngularVelocity(new BABYLON.Quaternion(0,-6,0,0));
    }
    _doTurnLeftCollisions(_multiplier = 1.0) {
        this.mesh.addRotation(0, -this.mesh.scaling.y * 0.025, 0);
    }
    doTurnLeft(_multiplier = 1.0) {
        if (Game.debugEnabled) console.log("Running doTurnLeft");
        if (Game.physicsEnabled) {this._doTurnLeftPhysics();}
        else {this._doTurnLeftCollisions();}
        this.turnLeft = true;
        this.turnRight = false;
        if (this.networkID != undefined) {Client.updateLocRotSelf();}
    }
    _doTurnRightPhysics(_multiplier = 1.0) {
        this.mesh.physicsImposter.setAngularVelocity(new BABYLON.Quaternion(0,6,0,0));
    }
    _doTurnRightCollisions(_multiplier = 1.0) {
        this.mesh.addRotation(0, this.mesh.scaling.y * 0.025, 0);
    }
    doTurnRight(_multiplier = 1.0) {
        if (Game.debugEnabled) console.log("Running doTurnRight");
        if (Game.physicsEnabled) {this._doTurnRightPhysics();}
        else {this._doTurnRightCollisions();}
        this.turnRight = true;
        this.turnLeft = false;
        if (this.networkID != undefined) {Client.updateLocRotSelf();}
    }
    doJump() {
        if (Game.debugEnabled) console.log("Running doJump");
        this.mesh.physicsImposter.setLinearVelocity(new BABYLON.Quaternion(0,3,0,0));
        this.jump = true;
        if (this.networkID != undefined) {Client.updateLocRotSelf();}
    }
    dispose() {
        this.detachFromAllBones();
        this.mesh.characterController = null;
        for (var _var in this) {
            this[_var] = null;
        }
    }
}