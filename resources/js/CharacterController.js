/**
 * Heavily referenced, borderline copied, Ssatguru's BabylonJS-CharacterController https://github.com/ssatguru/BabylonJS-CharacterController
 * It's great :v you should check it out.
 */
class CharacterController extends EntityController {
    constructor(_id, _avatar, _entity) {
        super (_id, _avatar, _entity);

        this.focus = undefined;
        this.targetController = null;
        this.targetedByControllers = new Set();
        this.targetRay = undefined;

        this.walkSpeed = 0.68 * this.avatar.scaling.z;
        this.runSpeed = this.walkSpeed * 5;
        this.backSpeed = this.walkSpeed * 0.5;
        this.jumpSpeed = this.avatar.scaling.y * 4;
        this.strafeSpeed = this.walkSpeed * 0.75;
        this.gravity = -Game.scene.gravity.y;
        this.minSlopeLimit = 30;
        this.maxSlopeLimit = 50;
        this.minSlopeLimitRads = BABYLON.Tools.ToRadians(this.minSlopeLimit);
        this.maxSlopeLimitRads = BABYLON.Tools.ToRadians(this.maxSlopeLimit);
        this._stepOffset = 0.25;
        this._vMoveTot = 0;
        this._vMovStartPos = new BABYLON.Vector3(0, 0, 0);
        this.walk = new AnimData("walk");
        this.walkBack = new AnimData("walkBack");
        this.idle = new AnimData("idle");
        this.idleJump = new AnimData("idleJump");
        this.run = new AnimData("run");
        this.runJump = new AnimData("runJump");
        this.fall = new AnimData("fall");
        this.turnLeft = new AnimData("turnLeft");
        this.turnRight = new AnimData("turnRight");
        this.strafeLeft = new AnimData("strafeLeft");
        this.strafeRight = new AnimData("strafeRight");
        this.slideBack = new AnimData("slideBack");
        this.animations = [this.walk, this.walkBack, this.idle, this.idleJump, this.run, this.runJump, this.fall, this.turnLeft, this.turnRight, this.strafeLeft, this.strafeRight, this.slideBack];

        this._ellipsoid = this.avatar.ellipsoid.clone();
        this.started = false;
        this._stopAnim = false;
        this.prevAnim = null;
        this.moveVector = new BABYLON.Vector3();
        this.avStartPos = new BABYLON.Vector3(0, 0, 0);
        this.grounded = false;
        this.freeFallDist = 0;
        this.fallFrameCountMin = 50;
        this.fallFrameCount = 0;
        this.inFreeFall = false;
        this.wasWalking = false;
        this.wasRunning = false;
        this.jumpStartPosY = 0;
        this.jumpTime = 0;
        this.movFallTime = 0;
        this.idleFallTime = 0;
        this.groundFrameCount = 0;
        this.groundFrameMax = 10;

        this.skip = 0;
        this.move = false;
        this.skeleton = this.avatar.skeleton;
        if (this.skeleton != null) {
            this.checkAnims(this.skeleton);
        }
        this.key = new ControllerMovementKey();
        this.prevKey = this.key.clone();
        var _this = this;
        this.renderer = function () { _this.moveAV(); };

        this.setWalkAnim("93_walkingKneesBent", 1.2, true);
        this.setRunAnim("94_runningKneesBent", 2, true);
        this.setWalkBackAnim("93_walkingBackwardKneesBent", 1, true);
        this.setIdleAnim("80_idle01", 1, true);
        this.setTurnLeftAnim("93_walkingKneesBent", 1, true);
        this.setTurnRightAnim("93_walkingKneesBent", 1, true);
        this.setIdleJumpAnim("95_jump", 1, false);
        this.setRunJumpAnim("95_jump", 1, false);

        this.setDefaultAction("talk");

        this.attachedMeshes = {};
        Game.characterControllers[this.id] = this;
    }

    setTarget(_controller, _updateChild = true) {
        if (!(_controller instanceof EntityController)) {
            return undefined;
        }
        this.targetController = _controller;
        if (_updateChild) {
            _controller.addTargetedBy(this, false);
        }
    }
    removeTarget(_updateChild = true) {
        if (_updateChild) {
            this.targetController.removeTargetedBy(this, false);
        }
        this.targetController = null;
    }
    clearTarget(_updateChild = true) {
        this.removeTarget();
    }
    getTarget() {
        return this.targetController;
    }

    setSlopeLimit(minSlopeLimit, maxSlopeLimit) {
        this.minSlopeLimit = minSlopeLimit;
        this.maxSlopeLimit = maxSlopeLimit;
        this.minSlopeLimitRads = Math.PI * minSlopeLimit / 180;
        this.maxSlopeLimitRads = Math.PI * this.maxSlopeLimit / 180;
    }
    setStepOffset(stepOffset) {
        this._stepOffset = stepOffset;
    }
    setWalkSpeed(_n) {
        this.walkSpeed = _n;
    }
    setRunSpeed(_n) {
        this.runSpeed = _n;
    }
    setBackSpeed(_n) {
        this.backSpeed = _n;
    }
    setJumpSpeed(_n) {
        this.jumpSpeed = _n;
    }
    setStrafeSpeed(_n) {
        this.strafeSpeed = _n;
    }
    setGravity(_n) {
        this.gravity = _n;
    }
    setAnim(_anim, _rangeName, _rate, _loop) {
        if (this.skeleton == null)
            return;
        _anim.name = _rangeName;
        _anim.rate = _rate;
        _anim.loop = _loop;
        if (this.skeleton.getAnimationRange(_anim.name) != null) {
            _anim.exist = true;
        }
        else {
            _anim.exist = false;
        }
    }
    setWalkAnim(_rangeName, _rate, _loop) {
        this.setAnim(this.walk, _rangeName, _rate, _loop);
    }
    setRunAnim(_rangeName, _rate, _loop) {
        this.setAnim(this.run, _rangeName, _rate, _loop);
    }
    setWalkBackAnim(_rangeName, _rate, _loop) {
        this.setAnim(this.walkBack, _rangeName, _rate, _loop);
    }
    setSlideBackAnim(_rangeName, _rate, _loop) {
        this.setAnim(this.slideBack, _rangeName, _rate, _loop);
    }
    setIdleAnim(_rangeName, _rate, _loop) {
        this.setAnim(this.idle, _rangeName, _rate, _loop);
    }
    setIdleJumpAnim(_rangeName, _rate, _loop) {
        this.setAnim(this.idleJump, _rangeName, _rate, _loop);
    }
    setTurnRightAnim(_rangeName, _rate, _loop) {
        this.setAnim(this.turnRight, _rangeName, _rate, _loop);
    }
    setTurnLeftAnim(_rangeName, _rate, _loop) {
        this.setAnim(this.turnLeft, _rangeName, _rate, _loop);
    }
    setStrafeRightAnim(_rangeName, _rate, _loop) {
        this.setAnim(this.strafeRight, _rangeName, _rate, _loop);
    }
    setSrafeLeftAnim(_rangeName, _rate, _loop) {
        this.setAnim(this.strafeLeft, _rangeName, _rate, _loop);
    }
    setRunJumpAnim(_rangeName, _rate, _loop) {
        this.setAnim(this.runJump, _rangeName, _rate, _loop);
    }
    setFallAnim(_rangeName, _rate, _loop) {
        this.setAnim(this.fall, _rangeName, _rate, _loop);
    }
    checkAnims(_skel) {
        for (var _i = 0; _i < this.animations.length; _i++) {
            var anim = this.animations[_i];
            if (_skel.getAnimationRange(anim.name) != null)
                anim.exist = true;
        }
    }
    start() {
        if (this.started)
            return;
        this.started = true;
        this.key.reset();
        this.movFallTime = 0;
        this.idleFallTime = 0.001;
        this.grounded = false;
    }
    stop() {
        if (!this.started)
            return;
        this.started = false;
        this.prevAnim = null;
    }
    pauseAnim() {
        this._stopAnim = true;
    }
    resumeAnim() {
        this._stopAnim = false;
    }
    moveAV() {
        if (!(this.avatar instanceof BABYLON.Mesh)) {
            return undefined;
        }
        this.avatar.position.y = Number(this.avatar.position.y.toFixed(4));
        this.avStartPos.copyFrom(this.avatar.position);
        var anim = null;
        var dt = Game.engine.getDeltaTime() / 1000;
        if (this.key.jump && !this.inFreeFall) {
            this.grounded = false;
            this.idleFallTime = 0;
            anim = this.doJump(dt);
        }
        else if (this.anyMovement() || this.inFreeFall) {
            this.grounded = false;
            this.idleFallTime = 0;
            anim = this.doMove(dt);
        }
        else if (!this.inFreeFall) {
            anim = this.doIdle(dt);
        }
        if (!this._stopAnim) {
            if (anim != null) {
                if (this.skeleton !== null) {
                    if (this.prevAnim !== anim) {
                        if (anim.exist) {
                            this.skeleton.beginAnimation(anim.name, anim.loop, anim.rate);
                        }
                        this.prevAnim = anim;
                    }
                }
            }
        }
    }
    doJump(dt) {
        var anim = null;
        anim = this.runJump;
        if (this.jumpTime === 0) {
            this.jumpStartPosY = this.avatar.position.y;
        }
        var js = this.jumpSpeed - this.gravity * this.jumpTime;
        var jumpDist = js * dt - 0.5 * this.gravity * dt * dt;
        this.jumpTime = this.jumpTime + dt;
        var forwardDist = 0;
        var disp;
        if (this.wasRunning || this.wasWalking) {
            if (this.wasRunning) {
                forwardDist = this.runSpeed * dt;
            }
            else if (this.wasWalking) {
                forwardDist = this.walkSpeed * dt;
            }
            disp = this.moveVector.clone();
            disp.y = 0;
            disp = disp.normalize();
            disp.scaleToRef(forwardDist, disp);
            disp.y = jumpDist;
        }
        else {
            disp = new BABYLON.Vector3(0, jumpDist, 0);
            anim = this.idleJump;
        }
        this.avatar.moveWithCollisions(disp);
        if (jumpDist < 0) {
            if ((this.avatar.position.y > this.avStartPos.y) || ((this.avatar.position.y === this.avStartPos.y) && (disp.length() > 0.001))) {
                this.endJump();
            }
            else if (this.avatar.position.y < this.jumpStartPosY) {
                var actDisp = this.avatar.position.subtract(this.avStartPos);
                if (!(this.areVectorsEqual(actDisp, disp, 0.001))) {
                    if (this.verticalSlope(actDisp) <= this.minSlopeLimitRads) {
                        this.endJump();
                    }
                }
            }
        }
        return anim;
    }
    endJump() {
        this.key.jump = false;
        this.jumpTime = 0;
        this.wasWalking = false;
        this.wasRunning = false;
    }
    areVectorsEqual(v1, v2, p) {
        return ((Math.abs(v1.x - v2.x) < p) && (Math.abs(v1.y - v2.y) < p) && (Math.abs(v1.z - v2.z) < p));
    }
    arePointsEqual(p1, p2, p) {
        return Math.abs(p1 - p2) < p;
    }
    verticalSlope(v) {
        return Math.atan(Math.abs(v.y / Math.sqrt(v.x * v.x + v.z * v.z)));
    }
    doMove(dt) {
        var u = this.movFallTime * this.gravity;
        this.freeFallDist = u * dt + this.gravity * dt * dt / 2;
        this.movFallTime = this.movFallTime + dt;
        var moving = false;
        var anim = null;
        if (this.inFreeFall) {
            this.moveVector.y = -this.freeFallDist;
            moving = true;
        }
        else {
            this.wasWalking = false;
            this.wasRunning = false;
            if (this.key.forward) {
                var forwardDist = 0;
                if (this.key.shift) {
                    this.wasRunning = true;
                    forwardDist = this.runSpeed * dt;
                    anim = this.run;
                }
                else {
                    this.wasWalking = true;
                    forwardDist = this.walkSpeed * dt;
                    anim = this.walk;
                }
                this.moveVector = this.avatar.calcMovePOV(0, -this.freeFallDist, forwardDist);
                moving = true;
            }
            else if (this.key.backward) {
                this.moveVector = this.avatar.calcMovePOV(0, -this.freeFallDist, -(this.backSpeed * dt));
                anim = this.walkBack;
                moving = true;
            }
            else if (this.key.strafeLeft) {
                anim = this.strafeLeft;
                this.moveVector = this.avatar.calcMovePOV(-(this.strafeSpeed * dt), -this.freeFallDist, 0);
                moving = true;
            }
            else if (this.key.strafeRight) {
                anim = this.strafeRight;
                this.moveVector = this.avatar.calcMovePOV((this.strafeSpeed * dt), -this.freeFallDist, 0);
                moving = true;
            }
        }
        if (!this.key.strafeLeft && !this.key.strafeRight) {
            if (this.key.turnLeft) {
                this.avatar.addRotation(0, -this.avatar.scaling.y * 0.05, 0);
                if (!moving) {
                    anim = this.turnLeft;
                }
            }
            else if (this.key.turnRight) {
                this.avatar.addRotation(0, this.avatar.scaling.y * 0.05, 0);
                if (!moving) {
                    anim = this.turnRight;
                }
            }
        }
        if (moving) {
            this.avatar.position.y = this.avatar.position.y.toFixed(4);
            if (this.moveVector.length() > 0.001) {
                if (this.arePointsEqual(this.avStartPos.y, this.avatar.position.y, 0.075)) {
                    this.avatar.position.y = this.avStartPos.y;
                }
                this.avatar.moveWithCollisions(this.moveVector);
                if (this.avatar.position.y > this.avStartPos.y) {
                    var actDisp = this.avatar.position.subtract(this.avStartPos);
                    var _sl = this.verticalSlope(actDisp);
                    if (_sl >= this.maxSlopeLimitRads) {
                        if (this._stepOffset > 0) {
                            if (this._vMoveTot == 0) {
                                this._vMovStartPos.copyFrom(this.avStartPos);
                            }
                            this._vMoveTot = this._vMoveTot + (this.avatar.position.y - this.avStartPos.y);
                            if (this._vMoveTot > this._stepOffset) {
                                this._vMoveTot = 0;
                                this.avatar.position.copyFrom(this._vMovStartPos);
                                this.endFreeFall();
                            }
                        }
                        else {
                            this.avatar.position.copyFrom(this.avStartPos);
                            this.endFreeFall();
                        }
                    }
                    else {
                        this._vMoveTot = 0;
                        if (_sl > this.minSlopeLimitRads) {
                            this.fallFrameCount = 0;
                            this.inFreeFall = false;
                        }
                        else {
                            this.endFreeFall();
                        }
                    }
                }
                else if ((this.avatar.position.y) < this.avStartPos.y) {
                    var actDisp = this.avatar.position.subtract(this.avStartPos);
                    if (!(this.areVectorsEqual(actDisp, this.moveVector, 0.001))) {
                        if (this.verticalSlope(actDisp) <= this.minSlopeLimitRads) {
                            this.endFreeFall();
                        }
                        else {
                            this.fallFrameCount = 0;
                            this.inFreeFall = false;
                        }
                    }
                    else {
                        this.inFreeFall = true;
                        this.fallFrameCount++;
                        if (this.fallFrameCount > this.fallFrameCountMin) {
                            anim = this.fall;
                        }
                    }
                }
                else {
                    this.endFreeFall();
                }
            }
        }
        return anim;
    }
    endFreeFall() {
        this.movFallTime = 0;
        this.fallFrameCount = 0;
        this.inFreeFall = false;
    }
    doIdle(dt) {
        if (this.grounded) {
            return this.idle;
        }
        this.wasWalking = false;
        this.wasRunning = false;
        this.movFallTime = 0;
        var anim = this.idle;
        this.fallFrameCount = 0;
        if (dt === 0) {
            this.freeFallDist = 5;
        }
        else {
            var u = this.idleFallTime * this.gravity;
            this.freeFallDist = u * dt + this.gravity * dt * dt / 2;
            this.idleFallTime = this.idleFallTime + dt;
        }
        if (this.freeFallDist < 0.01)
            return anim;
        var disp = new BABYLON.Vector3(0, -this.freeFallDist, 0);
        ;
        this.avatar.moveWithCollisions(disp);
        if ((this.avatar.position.y > this.avStartPos.y) || (this.avatar.position.y === this.avStartPos.y)) {
            this.groundIt();
        }
        else if (this.avatar.position.y < this.avStartPos.y) {
            var actDisp = this.avatar.position.subtract(this.avStartPos);
            if (!(this.areVectorsEqual(actDisp, disp, 0.001))) {
                if (this.verticalSlope(actDisp) <= this.minSlopeLimitRads) {
                    this.groundIt();
                    this.avatar.position.copyFrom(this.avStartPos);
                }
                else {
                    this.unGroundIt();
                    anim = this.slideBack;
                }
            }
        }
        return anim;
    }
    groundIt() {
        this.groundFrameCount++;
        if (this.groundFrameCount > this.groundFrameMax) {
            this.grounded = true;
            this.idleFallTime = 0;
        }
    }
    unGroundIt() {
        this.grounded = false;
        this.groundFrameCount = 0;
    }
    anyMovement() {
        return (this.key.forward || this.key.backward || this.key.turnLeft || this.key.turnRight || this.key.strafeLeft || this.key.strafeRight);
    }
    getMovementKey() {
        return {
            forward:this.key.forward
        };
    }
    setMovementKey(_key) {
        if (typeof _key[0] == "boolean" && typeof _key[7] == "boolean") {
            this.key.forward = _key[0];
            this.key.shift = _key[1];
            this.key.backward = _key[2];
            this.key.strafeLeft = _key[3];
            this.key.strafeRight = _key[4];
            this.key.turnLeft = _key[5];
            this.key.turnRight = _key[6];
            this.key.jump = _key[7];
        }
    }
    setMovementKeys(_forward = false, _shift = false, _backward = false, _strafeLeft = false, _strafeRight = false, _turnLeft = false, _turnRight = false, _jump = false) {
        this.key.forward = _forward;
        this.key.shift = _shift;
        this.key.backward = _backward;
        this.key.strafeLeft = _strafeLeft;
        this.key.strafeRight = _strafeRight;
        this.key.turnLeft = _turnLeft;
        this.key.turnRight = _turnRight;
        this.key.jump = _jump;
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
        return this.avatar.skeleton.bones[this.avatar.skeleton.getBoneIndexByName(_string)];
    }
    getBoneByID(_int) {
        return this.avatar.skeleton.bones[_int];
    }
    attachToBone(_mesh, _bone, _position = {x:0, y:0, z:0}, _rotation = {x:0, y:0, z:0}, _scale = {x:0, y:0, z:0}) {
        if (Game.debugEnabled) console.log("Running attachToBone");
        if (typeof _mesh == "string") {_mesh = Game.filterID(_mesh);}
        _mesh = Game.getMesh(_mesh);
        if (_mesh instanceof BABYLON.Mesh) {_mesh = _mesh.clone();}
        else if (_mesh == null) {return null;}
        _bone = this.getBone(_bone); if (_bone == null) {return null;}
        _mesh.attachToBone(_bone, this.avatar);
        _mesh.position.set(_position.x, _position.y, _position.z);
        _mesh.rotation.set(_rotation.x, _rotation.y, _rotation.z);
        if (_scale == 0) {
            _mesh.scaling.copyFrom(this.avatar.scaling);
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
    attachToHead(_mesh) {
        return this.attachToBone(_mesh, "head", {x:0, y:0, z:0}, {x:0, y:BABYLON.Tools.ToRadians(180), z:0});
    }
    attachToFOCUS(_mesh) {
        var _focus = this.attachToBone(_mesh, "FOCUS");
        _focus.material = Game._collisionMaterial;
        this.focus = _focus;
        return _focus;
    }
    attachToLeftHand(_mesh) {
        return this.attachToBone(_mesh, "hand.l", {x:0, y:0, z:0}, {x:0, y:BABYLON.Tools.ToRadians(90), z:BABYLON.Tools.ToRadians(-90)});
    }
    attachToRightHand(_mesh) {
        return this.attachToBone(_mesh, "hand.r", {x:0, y:0, z:0}, {x:0, y:BABYLON.Tools.ToRadians(90), z:BABYLON.Tools.ToRadians(-90)});
    }
    keyMoveForward(_pressed = false) {
        if (_pressed === true) {
            this.key.forward = true;
            this.key.backward = false;
        }
        else {
            this.key.forward = false;
        }
    }
    keyShift(_pressed = false) {
        if (_pressed === true) {
            this.key.shift = true;
        }
        else {
            this.key.shift = false;
        }
    }
    keyMoveBackward(_pressed = false) {
        if (_pressed === true) {
            this.key.backward = true;
            this.key.forward = false;
        }
        else {
            this.key.backward = false;
        }
    }
    keyTurnLeft(_pressed = false) {
        if (_pressed === true) {
            this.key.turnLeft = true;
            this.key.turnRight = false;
        }
        else {
            this.key.turnLeft = false;
        }
    }
    keyTurnRight(_pressed = false) {
        if (_pressed === true) {
            this.key.turnRight = true;
            this.key.turnLeft = false;
        }
        else {
            this.key.turnRight = false;
        }
    }
    keyStrafeLeft(_pressed = false) {
        if (_pressed === true) {
            this.key.strafeLeft = true;
            this.key.strafeRight = false;
        }
        else {
            this.key.strafeLeft = false;
        }
    }
    keyStrafeRight(_pressed = false) {
        if (_pressed === true) {
            this.key.strafeLeft = false;
            this.key.strafeRight = true;
        }
        else {
            this.key.strafeRight = false;
        }
    }
    keyJump(_pressed = false) {
        if (_pressed === true) {
            this.key.jump = true;
        }
        else {
            this.key.jump = false;
        }
    }
    dispose() {
        if (this == Game.player) {
            return false;
        }
        this.detachFromAllBones();
        this.avatar.controller = null;
        delete Game.characterControllers[this.id];
        super.dispose();
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}
class AnimData {
    constructor(_name) {
        this.loop = true;
        this.rate = 1;
        this.exist = false;
        this.name = _name;
    }
}
class ControllerMovementKey {
    constructor(_forward = false, _shift = false, _backward = false, _turnRight = false, _turnLeft = false, _strafeRight = false, _strafeLeft = false, _jump = false) {
        this.forward = _forward;
        this.shift = _shift;
        this.backward = _backward;
        this.turnRight = _turnRight;
        this.turnLeft = _turnLeft;
        this.strafeRight = _strafeRight;
        this.strafeLeft = _strafeLeft;
        this.jump = _jump;
    }
    reset() {
        this.forward = false;
        this.shift = false;
        this.backward = false;
        this.turnRight = false;
        this.turnLeft = false;
        this.strafeRight = false;
        this.strafeLeft = false;
        this.jump = false;
    }
    copyFrom(_key) {
        if (!(_key.hasOwnProperty("forward"))) {
            return undefined;
        }
        this.forward = _key.forward;
        this.shift = _key.shift;
        this.backward = _key.backward;
        this.turnRight = _key.turnRight;
        this.turnLeft = _key.turnLeft;
        this.strafeRight = _key.strafeRight;
        this.strafeLeft = _key.strafeLeft;
        this.jump = _key.jump;
    }
    clone() {
        return new ControllerMovementKey(this.forward, this.shift, this.backward, this.turnRight, this.turnLeft, this.strafeRight, this.strafeLeft, this.jump);
    }
    equals(_key) {
        if (!(_key.hasOwnProperty("forward"))) {
            return undefined;
        }
        return (
            this.forward == _key.forward &&
            this.shift == _key.shift &&
            this.backward == _key.backward &&
            this.turnRight == _key.turnRight &&
            this.turnLeft == _key.turnLeft &&
            this.strafeRight == _key.strafeRight &&
            this.strafeLeft == _key.strafeLeft &&
            this.jump == _key.jump
        )
    }
}