/**
 * Heavily referenced, borderline copied, Ssatguru's BabylonJS-CharacterController https://github.com/ssatguru/BabylonJS-CharacterController
 * It's great :v you should check it out.
 */
class CharacterController extends EntityController {
    constructor(_id, _mesh, _entity) {
        super(_id, _mesh, _entity);
        if (!this.hasMesh()) {
            return;
        }
        this.focus = undefined;
        this.root = undefined;
        this.targetController = null;
        this.targetedByControllers = new Set();
        this.targetRay = undefined;
        this.targetRayHelper = undefined;
        this.groundRay = new BABYLON.Ray(_mesh.position, _mesh.position.add(BABYLON.Vector3.Down()), 0.01);
        this.gravityScale = 1.0;
        this._gravity = -Game.scene.gravity.y * this.gravityScale;
        this.minSlopeLimit = 30;
        this.maxSlopeLimit = 50;
        this._minSlopeLimitRads = BABYLON.Tools.ToRadians(this.minSlopeLimit);
        this._maxSlopeLimitRads = BABYLON.Tools.ToRadians(this.maxSlopeLimit);
        this._stepOffset = 0.25;
        this._vMoveTot = 0;
        this._vMovStartPos = BABYLON.Vector3.Zero();
        this.walkSpeed = 0.68 * this.mesh.scaling.z;
        this.runSpeed = this.walkSpeed * 5;
        this.sprintSpeed = this.runSpeed * 2;
        this.jumpSpeed = this.mesh.scaling.y * 4;
        this._moveVector = new BABYLON.Vector3();
        this._avStartPos = BABYLON.Vector3.Zero();
        this._fallDist = 0;
        this._fallFrameCountMin = 50;
        this._fallFrameCount = 0;
        this._jumpStartPosY = 0;
        this._jumpTime = 0;
        this._movFallTime = 0;
        this._idleFallTime = 0;
        this._groundFrameCount = 0;
        this._groundFrameMax = 10;
        this.isGrounded = false;
        this.isFalling = false;
        this.isCrouching = false;
        this.isClimbing = false; // Ladder
        this.isProne = false;
        this.isWalking = false;
        this.isRunning = false;
        this.isSprinting = false;
        this.isAttacking = false; // While crouching, walking, or running

        this.walk = new AnimData("walk");
        this.walkBack = new AnimData("walkBack");
        this.idle = new AnimData("idle");
        this.idleJump = new AnimData("idleJump");
        this.fall = new AnimData("fall");
        this.run = new AnimData("run");
        this.runJump = new AnimData("runJump");
        this.turnLeft = new AnimData("turnLeft");
        this.turnRight = new AnimData("turnRight");
        this.strafeLeft = new AnimData("strafeLeft");
        this.strafeRight = new AnimData("strafeRight");
        this.slideBack = new AnimData("slideBack");
        this.punch = new AnimData("punch");
        this.animations = this.animations.concat([this.walk, this.walkBack, this.idleJump, this.run, this.runJump, this.fall, this.turnLeft, this.turnRight, this.strafeLeft, this.strafeRight, this.slideBack]);

        this.setWalkAnim("93_walkingKneesBent", 1.2, true);
        this.setRunAnim("94_runningKneesBent", 2, true);
        this.setWalkBackAnim("93_walkingBackwardKneesBent", 1, true);
        this.setIdleAnim("90_idle01", 1, true);
        this.setTurnLeftAnim("93_walkingKneesBent", 1, true);
        this.setTurnRightAnim("93_walkingKneesBent", 1, true);
        this.setIdleJumpAnim("95_jump", 1, false);
        this.setRunJumpAnim("95_jump", 1, false);
        this.setPunchAnim("71_punch01", 1, false, false);

        if (this.skeleton instanceof BABYLON.Skeleton) {
            this.checkAnims(this.skeleton);
            this._isAnimated = true;
        }
        else {
            this._isAnimated = false;
        }

        this.key = new ControllerMovementKey();
        this.prevKey = this.key.clone();
        this._showHelmet = true;

        /**
         * Map of bone IDs and the mesh attached to them.
         * @type {String, {String, BABYLON.Mesh}}
         */
        this._meshesAttachedToBones = {};
        /**
         * Map of mesh IDs and the bones they're attached to.
         * @type {String, {String, BABYLON.Bone}}
         */
        this._bonesAttachedToMeshes = {};
        this.generateOrganMeshes();
        Game.setCharacterController(this.id, this);
    }

    setSlopeLimit(minSlopeLimit, maxSlopeLimit) {
        this.minSlopeLimit = minSlopeLimit;
        this.maxSlopeLimit = maxSlopeLimit;
        this._minSlopeLimitRads = BABYLON.Tools.ToRadians(this.minSlopeLimit);
        this._maxSlopeLimitRads = BABYLON.Tools.ToRadians(this.maxSlopeLimit);
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
    setJumpSpeed(_n) {
        this.jumpSpeed = _n;
    }
    setGravityScale(_n) {
        this.gravityScale = _n;
        this._gravity = -Game.gravity.y * this.gravityScale;
    }
    setWalkAnim(_rangeName, _rate, _loop, _standalone = true) {
        this.setAnimData(this.walk, _rangeName, _rate, _loop, _standalone);
    }
    setRunAnim(_rangeName, _rate, _loop, _standalone = true) {
        this.setAnimData(this.run, _rangeName, _rate, _loop, _standalone);
    }
    setWalkBackAnim(_rangeName, _rate, _loop, _standalone = true) {
        this.setAnimData(this.walkBack, _rangeName, _rate, _loop, _standalone);
    }
    setSlideBackAnim(_rangeName, _rate, _loop, _standalone = true) {
        this.setAnimData(this.slideBack, _rangeName, _rate, _loop, _standalone);
    }
    setIdleAnim(_rangeName, _rate, _loop, _standalone = true) {
        this.setAnimData(this.idle, _rangeName, _rate, _loop, _standalone);
    }
    setIdleJumpAnim(_rangeName, _rate, _loop, _standalone = true) {
        this.setAnimData(this.idleJump, _rangeName, _rate, _loop, _standalone);
    }
    setTurnRightAnim(_rangeName, _rate, _loop, _standalone = true) {
        this.setAnimData(this.turnRight, _rangeName, _rate, _loop, _standalone);
    }
    setTurnLeftAnim(_rangeName, _rate, _loop, _standalone = true) {
        this.setAnimData(this.turnLeft, _rangeName, _rate, _loop, _standalone);
    }
    setStrafeRightAnim(_rangeName, _rate, _loop, _standalone = true) {
        this.setAnimData(this.strafeRight, _rangeName, _rate, _loop, _standalone);
    }
    setSrafeLeftAnim(_rangeName, _rate, _loop, _standalone = true) {
        this.setAnimData(this.strafeLeft, _rangeName, _rate, _loop, _standalone);
    }
    setRunJumpAnim(_rangeName, _rate, _loop, _standalone = true) {
        this.setAnimData(this.runJump, _rangeName, _rate, _loop, _standalone);
    }
    setFallAnim(_rangeName, _rate, _loop, _standalone = true) {
        this.setAnimData(this.fall, _rangeName, _rate, _loop, _standalone);
    }
    setPunchAnim(_rangeName, _rate, _loop, _standalone = false) {
        this.setAnimData(this.punch, _rangeName, _rate, _loop, _standalone);
    }
    moveAV() {
        if (!(this.mesh instanceof BABYLON.Mesh)) {
            return this;
        }
        if (this._isLocked) {
            return this;
        }
        if (this.getParent() != undefined) {
            this.removeParent();
        }
        this._avStartPos.copyFrom(this.mesh.position);
        var anim = null;
        var dt = Game.engine.getDeltaTime() / 1000;
        if (this.key.jump && !this.isFalling) {
            this.isGrounded = false;
            this._idleFallTime = 0;
            anim = this.doJump(dt);
        }
        else if (this.anyMovement() || this.isFalling) {
            this.isGrounded = false;
            this._idleFallTime = 0;
            anim = this.doMove(dt);
        }
        else if (!this.isFalling) {
            anim = this.doIdle(dt);
        }
        this.beginAnimation(anim);
        if (Game.player == this.entity) {
            Game.updateCameraTarget();
        }
        return this;
    }
    doJump(dt) {
        var anim = null;
        anim = this.runJump;
        if (this._jumpTime === 0) {
            this._jumpStartPosY = this.mesh.position.y;
        }
        var js = this.jumpSpeed - this._gravity * this._jumpTime;
        var jumpDist = js * dt - 0.5 * this._gravity * dt * dt;
        this._jumpTime = this._jumpTime + dt;
        var forwardDist = 0;
        var disp;
        if (this == Game.player.getController() && Game.enableCameraAvatarRotation) {
            this.mesh.rotation.y = -4.69 - Game.camera.alpha;
        }
        if (this.isSprinting || this.isRunning || this.isWalking) {
            if (this.isRunning) {
                forwardDist = this.runSpeed * dt;
            }
            else if (this.isWalking) {
                forwardDist = this.walkSpeed * dt;
            }
            else if (this.isSprinting) {
                forwardDist = this.sprintSpeed * dt;
            }
            disp = this._moveVector.clone();
            disp.y = 0;
            disp = disp.normalize();
            disp.scaleToRef(forwardDist, disp);
            disp.y = jumpDist;
        }
        else {
            disp = new BABYLON.Vector3(0, jumpDist, 0);
            anim = this.idleJump;
        }
        this.mesh.moveWithCollisions(disp);
        if (jumpDist < 0) {
            if ((this.mesh.position.y > this._avStartPos.y) || ((this.mesh.position.y === this._avStartPos.y) && (disp.length() > 0.001))) {
                this.endJump();
            }
            else if (this.mesh.position.y < this._jumpStartPosY) {
                var actDisp = this.mesh.position.subtract(this._avStartPos);
                if (!(Tools.areVectorsEqual(actDisp, disp, 0.001))) {
                    if (Tools.verticalSlope(actDisp) <= this._minSlopeLimitRads) {
                        this.endJump();
                    }
                }
            }
        }
        return anim;
    }
    endJump() {
        this.key.jump = false;
        this._jumpTime = 0;
        this.isWalking = false;
        this.isRunning = false;
        this.isSprinting = false;
    }
    doMove(dt) {
        var u = this._movFallTime * this._gravity;
        this._fallDist = u * dt + this._gravity * dt * dt / 2;
        this._movFallTime = this._movFallTime + dt;
        var moving = false;
        var anim = null;
        if (this.isFalling) {
            this._moveVector.y = -this._fallDist;
            moving = true;
            anim = this.fall;
        }
        else {
            this._moveVector.set(0,0,0);
            this.isWalking = false;
            this.isRunning = false;
            this.isSprinting = false;
            let dist = 0;
            let atan = -Math.atan2((this.mesh.position.z - Game.camera.position.z), (this.mesh.position.x - Game.camera.position.x)) - BABYLON.Tools.ToRadians(90);
            if (this.key.shift) {
                dist = this.sprintSpeed * dt;
            }
            else {
                dist = this.runSpeed * dt;
                anim = this.run;
                this.isRunning = true;
                moving = true;
            }
            if (this.key.forward) {
                if (this.key.strafeRight && !this.key.strafeLeft) {
                    this.mesh.rotation.y = atan + BABYLON.Tools.ToRadians(45);
                }
                else if (this.key.strafeLeft && !this.key.strafeRight) {
                    this.mesh.rotation.y = atan + BABYLON.Tools.ToRadians(315);
                }
                else {
                    this.mesh.rotation.y = atan;
                }
            }
            else if (this.key.backward) {
                if (this.key.strafeRight && !this.key.strafeLeft) {
                    this.mesh.rotation.y = atan + BABYLON.Tools.ToRadians(135);
                }
                else if (this.key.strafeLeft && !this.key.strafeRight) {
                    this.mesh.rotation.y = atan + BABYLON.Tools.ToRadians(225);
                }
                else {
                    this.mesh.rotation.y = atan + BABYLON.Tools.ToRadians(180);
                }
            }
            else if (this.key.strafeRight && !this.key.strafeLeft) {
                    this.mesh.rotation.y = atan + BABYLON.Tools.ToRadians(90);
            }
            else if (this.key.strafeLeft && !this.key.strafeRight) {
                    this.mesh.rotation.y = atan + BABYLON.Tools.ToRadians(270);
            }
            else {
                moving = false;
                dist = 0;
            }
            this._moveVector = this.mesh.calcMovePOV(0, -this._fallDist, dist);
        }
        /*
         *  Jittering in the Y direction caused by _moveVector
         */
        if (moving) {
            if (this._moveVector.length() > 0.001) {
                this.updateGroundRay();
                let _hit = Game.scene.pickWithRay(this.groundRay, function(_mesh) {
                    if (_mesh.isPickable && _mesh.checkCollisions) {
                        return true;
                    }
                    return false;
                });
                if (_hit.hit) {
                    if (Game.Tools.arePointsEqual(this.mesh.position.y + this._moveVector.y, _hit.pickedMesh.position.y+0.06125, 0.0125)) {
                        this._moveVector.y = 0;
                    }
                }
                this.mesh.moveWithCollisions(this._moveVector);
                if (this.mesh.position.y > this._avStartPos.y) {
                    var actDisp = this.mesh.position.subtract(this._avStartPos);
                    var _sl = Tools.verticalSlope(actDisp);
                    if (_sl >= this._maxSlopeLimitRads) {
                        if (this._stepOffset > 0) {
                            if (this._vMoveTot == 0) {
                                this._vMovStartPos.copyFrom(this._avStartPos);
                            }
                            this._vMoveTot = this._vMoveTot + (this.mesh.position.y - this._avStartPos.y);
                            if (this._vMoveTot > this._stepOffset) {
                                this._vMoveTot = 0;
                                this.mesh.position.copyFrom(this._vMovStartPos);
                                this.endFreeFall();
                            }
                        }
                        else {
                            this.mesh.position.copyFrom(this._avStartPos);
                            this.endFreeFall();
                        }
                    }
                    else {
                        this._vMoveTot = 0;
                        if (_sl > this._minSlopeLimitRads) {
                            this._fallFrameCount = 0;
                            this.isFalling = false;
                        }
                        else {
                            this.endFreeFall();
                        }
                    }
                }
                else if ((this.mesh.position.y) < this._avStartPos.y) {
                    var actDisp = this.mesh.position.subtract(this._avStartPos);
                    if (!(Tools.areVectorsEqual(actDisp, this._moveVector, 0.001))) {
                        if (Tools.verticalSlope(actDisp) <= this._minSlopeLimitRads) {
                            this.endFreeFall();
                        }
                        else {
                            this._fallFrameCount = 0;
                            this.isFalling = false;
                        }
                    }
                    else {
                        this.isFalling = true;
                        this._fallFrameCount++;
                        if (this._fallFrameCount > this._fallFrameCountMin) {
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
        this._movFallTime = 0;
        this._fallFrameCount = 0;
        this.isFalling = false;
    }
    doIdle(dt) {
        if (this.isGrounded) {
            return this.idle;
        }
        this.isWalking = false;
        this.isRunning = false;
        this.isSprinting = false;
        this._movFallTime = 0;
        var anim = this.idle;
        this._fallFrameCount = 0;
        if (dt === 0) {
            this._fallDist = 5;
        }
        else {
            var u = this._idleFallTime * this._gravity;
            this._fallDist = u * dt + this._gravity * dt * dt / 2;
            this._idleFallTime = this._idleFallTime + dt;
        }
        if (this._fallDist < 0.01)
            return anim;
        var disp = new BABYLON.Vector3(0, -this._fallDist, 0);
        ;
        this.mesh.moveWithCollisions(disp);
        if ((this.mesh.position.y > this._avStartPos.y) || (this.mesh.position.y === this._avStartPos.y)) {
            this.groundIt();
        }
        else if (this.mesh.position.y < this._avStartPos.y) {
            var actDisp = this.mesh.position.subtract(this._avStartPos);
            if (!(Tools.areVectorsEqual(actDisp, disp, 0.001))) {
                if (Tools.verticalSlope(actDisp) <= this._minSlopeLimitRads) {
                    this.groundIt();
                    this.mesh.position.copyFrom(this._avStartPos);
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
        this._groundFrameCount++;
        if (this._groundFrameCount > this._groundFrameMax) {
            this.isGrounded = true;
            this._idleFallTime = 0;
        }
    }
    unGroundIt() {
        this.isGrounded = false;
        this._groundFrameCount = 0;
    }
    anyMovement() {
        return (this.key.forward || this.key.backward || this.key.turnLeft || this.key.turnRight || this.key.strafeLeft || this.key.strafeRight);
    }
    getMovementKey() {
        return this.key;
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
        return this;
    }
    keyMoveForward(_pressed = true) {
        if (_pressed === true) {
            this.key.forward = true;
            this.key.backward = false;
        }
        else {
            this.key.forward = false;
        }
        return this;
    }
    keyShift(_pressed = true) {
        if (_pressed === true) {
            this.key.shift = true;
        }
        else {
            this.key.shift = false;
        }
        return this;
    }
    keyMoveBackward(_pressed = true) {
        if (_pressed === true) {
            this.key.backward = true;
            this.key.forward = false;
        }
        else {
            this.key.backward = false;
        }
        return this;
    }
    keyTurnLeft(_pressed = true) {
        if (_pressed === true) {
            this.key.turnLeft = true;
            this.key.turnRight = false;
        }
        else {
            this.key.turnLeft = false;
        }
        return this;
    }
    keyTurnRight(_pressed = true) {
        if (_pressed === true) {
            this.key.turnRight = true;
            this.key.turnLeft = false;
        }
        else {
            this.key.turnRight = false;
        }
        return this;
    }
    keyStrafeLeft(_pressed = true) {
        if (_pressed === true) {
            this.key.strafeLeft = true;
            this.key.strafeRight = false;
        }
        else {
            this.key.strafeLeft = false;
        }
        return this;
    }
    keyStrafeRight(_pressed = true) {
        if (_pressed === true) {
            this.key.strafeLeft = false;
            this.key.strafeRight = true;
        }
        else {
            this.key.strafeRight = false;
        }
        return this;
    }
    keyJump(_pressed = true) {
        if (_pressed === true) {
            this.key.jump = true;
        }
        else {
            this.key.jump = false;
        }
        return this;
    }
    doPunch(dt) {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        for (var _i = 0; _i < this.animationBones["71_punch01"].length; _i++) {
            Game.scene.beginAnimation(this.skeleton.bones[this.animationBones["71_punch01"][_i]], this.punch.from, this.punch.to, this.punch.loop, this.punch.rate);
        }
    }

    setTarget(_controller, _updateChild = true) {
        if (!(_controller instanceof EntityController)) {
            return this;
        }
        this.targetController = _controller;
        if (_updateChild) {
            _controller.addTargetedBy(this, false);
        }
        this.entity.setTarget(_controller.getEntity());
        return this;
    }
    removeTarget(_updateChild = true) {
        if (_updateChild && this.targetController instanceof EntityController) {
            this.targetController.removeTargetedBy(this, false);
        }
        this.targetController = null;
        this.entity.removeTarget();
        return this;
    }
    clearTarget(_updateChild = true) {
        this.removeTarget();
        return this;
    }
    getTarget() {
        return this.targetController;
    }
    updateGroundRay() {
        if (!(this.groundRay instanceof BABYLON.Ray)) {
            return this;
        }
        this.groundRay.origin = this.mesh.position;
        this.groundRay.direction = this.mesh.position.add(BABYLON.Vector3.Down());
        return this;
    }

    hideMesh() {
        this.mesh.isVisible = false;
        this.hideAttachedMeshes();
        return this;
    }
    showMesh() {
        this.mesh.isVisible = true;
        this.showAttachedMeshes();
        return this;
    }
    hideAttachedMeshes() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        for (var _bone in this._meshesAttachedToBones) {
            if (_bone == "FOCUS" || _bone == "ROOT") {}
            else if (this._showHelmet && _bone == "head") {}
            for (var _mesh in this._meshesAttachedToBones[_bone]) {
                if (this._meshesAttachedToBones[_bone][_mesh] instanceof BABYLON.AbstractMesh) {
                    this._meshesAttachedToBones[_bone][_mesh].isVisible = false;
                }
            }
        }
        return this;
    }
    showAttachedMeshes() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        for (var _bone in this._meshesAttachedToBones) {
            if (_bone == "FOCUS" || _bone == "ROOT") {}
            else if (!this._showHelmet && _bone == "head") {}
            else {
                for (var _mesh in this._meshesAttachedToBones[_bone]) {
                    if (this._meshesAttachedToBones[_bone][_mesh] instanceof BABYLON.AbstractMesh) {
                        this._meshesAttachedToBones[_bone][_mesh].isVisible = true;
                    }
                }
            }
        }
        return this;
    }
    hideHelmet() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        if (this._meshesAttachedToBones.hasOwnProperty("head")) {
            for (var _mesh in this._meshesAttachedToBones["head"]) {
                if (this._meshesAttachedToBones["head"][_mesh] instanceof BABYLON.AbstractMesh) {
                    this._meshesAttachedToBones["head"][_mesh].isVisible = false;
                }
            }
        }
        this._showHelmet = false;
        return this;
    }
    showHelmet() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        if (this._meshesAttachedToBones.hasOwnProperty("head")) {
            for (var _mesh in this._meshesAttachedToBones["head"]) {
                if (this._meshesAttachedToBones["head"][_mesh] instanceof BABYLON.AbstractMesh) {
                    this._meshesAttachedToBones["head"][_mesh].isVisible = true;
                }
            }
        }
        this._showHelmet = true;
        return this;
    }

    getBone(_bone) {
        if (Game.debugEnabled) console.log("Running getBone");
        if (this.skeleton instanceof BABYLON.Skeleton) {
            if (_bone instanceof BABYLON.Bone) {
                return _bone;
            }
            else if (typeof _bone == "string") {
                return this.getBoneByName(_bone);
            }
            else if (typeof _bone == "number") {
                return this.getBoneByID(_bone);
            }
        }
        return null;
    }
    getBoneByName(_string) {
        if (this.skeleton instanceof BABYLON.Skeleton) {
            return this.skeleton.bones[this.skeleton.getBoneIndexByName(_string)];
        }
        return null;
    }
    getBoneByID(_int) {
        if (this.skeleton instanceof BABYLON.Skeleton) {
            return this.skeleton.bones[_int];
        }
        return null;
    }
    /**
     * Attaches a mesh to a bone
     * @param  {BABYLON.AbstractMesh} _mesh               Mesh, or Mesh ID
     * @param  {BABYLON.Texture} _texture            Texture, or Texture ID
     * @param  {String} _bone               Bone name
     * @param  {BABYLON.Vector3} _position           Mesh position
     * @param  {BABYLON.Vector3} _rotation           Mesh rotation
     * @param  {BABYLON.Vector3} _scaling              Mesh scaling
     * @return {CharacterController}                     This character controller.
     */
    attachToBone(_mesh = "missingMesh", _texture = "missingTexture", _bone, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One()) {
        if (Game.debugEnabled) console.log("Running attachToBone");
        if (!Game.hasMesh(_mesh)) {
            return this;
        }
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        _bone = this.getBone(_bone);
        if (!(_bone instanceof BABYLON.Bone)) {
            return this;
        }
        if (!(_position instanceof BABYLON.Vector3)) {
            _position = Tools.filterVector(_position);
        }
        if (!(_rotation instanceof BABYLON.Vector3)) {
            _rotation = Tools.filterVector(_rotation);
        }
        if (!(_scaling instanceof BABYLON.Vector3)) {
            _scaling = Tools.filterVector(_scaling);
        }
        if (_scaling.equals(BABYLON.Vector3.Zero())) {
            _scaling = BABYLON.Vector3.One();
        }
        if (!(Game.hasLoadedMesh(_mesh))) {
            Game.loadMesh(_mesh);
            Game.addAttachmentToCreate((this.id + _bone + _mesh), this, _mesh, _texture, _bone, _position, _rotation, _scaling);
            return this;
        }
        var _instance = Game.createMesh(undefined, _mesh, _texture, _position, _rotation, _scaling);
        if (!(_instance instanceof BABYLON.AbstractMesh)) {
            if (_mesh instanceof BABYLON.AbstractMesh) {
                console.log("Error creating mesh `" + _mesh.id + "` for Controller `" + this.id + "`");
            }
            else {
                console.log("Error creating mesh `" + _mesh + "` for Controller `" + this.id + "`");
            }
            return this;
        }
        _instance.attachToBone(_bone, this.mesh);
        _instance.position.copyFrom(_position);
        _instance.rotation.copyFrom(_rotation);
        if (!(_scaling instanceof BABYLON.Vector3)) {
            _instance.scaling.copyFrom(this.mesh.scaling);
        }
        if (this.prevAnim == undefined) {
            /*
            Because meshes became inverted when they were attached and scaled before actually being rendered for the first time, or something like that :v
             */
            _instance.scalingDeterminant = -1;
        }
        if (!(this._meshesAttachedToBones.hasOwnProperty(_bone.id))) {
            this._meshesAttachedToBones[_bone.id] = {};
        }
        this._meshesAttachedToBones[_bone.id][_instance.id] = _instance;
        if (!(this._bonesAttachedToMeshes.hasOwnProperty(_instance.id))) {
            this._bonesAttachedToMeshes[_instance.id] = {};
        }
        this._bonesAttachedToMeshes[_instance.id][_bone.id] = _bone;
        if (_bone.id == "FOCUS") {
            this.focus = _instance;
            _instance.isVisible = false;
        }
        else if (_bone.id == "ROOT") {
            this.root = _instance;
            _instance.isVisible = false;
        }
        return this;
    }
    detachFromBone(_bone) {
        return this.detachAllFromBone(_bone);
    }
    detachAllFromBone(_bone) {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        _bone = this.getBone(_bone);
        if (!(_bone instanceof BABYLON.Bone)) {
            return this;
        }
        if (!(this._meshesAttachedToBones.hasOwnProperty(_bone.id))) {
            return this;
        }
        for (var _mesh in this._meshesAttachedToBones[_bone.id]) {
            if (this._meshesAttachedToBones[_bone.id][_mesh] instanceof BABYLON.AbstractMesh) {
                this._meshesAttachedToBones[_bone.id][_mesh].detachFromBone();
                Game.removeMesh(this._meshesAttachedToBones[_bone.id][_mesh]);
                delete this._bonesAttachedToMeshes[_mesh][_bone.id];
            }
        }
        delete this._meshesAttachedToBones[_bone.id];
        return this;
    }
    detachMeshFromBone(_mesh, _bone = undefined) { // TODO: check what happens if we've got 2 of the same meshes on different bones :v
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        _mesh = Game.getMesh(_mesh);
        if (!(_mesh instanceof BABYLON.AbstractMesh)) {
            return this;
        }
        if (!(this._bonesAttachedToMeshes.hasOwnProperty(_mesh.id))) {
            return this;
        }
        _bone = this.getBone(_bone);
        if (_bone instanceof BABYLON.Bone) {
            delete this._meshesAttachedToBones[_bone.id][_mesh.id];
        }
        else {
            for (var _boneWithAttachment in this._bonesAttachedToMeshes[_mesh.id]) {
                if (this._bonesAttachedToMeshes[_mesh.id][_boneWithAttachment] instanceof BABYLON.Bone) {
                    delete this._meshesAttachedToBones[_boneWithAttachment][_mesh.id];
                }
            }
        }
        delete this._bonesAttachedToMeshes[_mesh.id];
        _mesh.detachFromBone();
        Game.removeMesh(_mesh);
        return this;
    }
    detachFromAllBones() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        for (var _bone in this._meshesAttachedToBones) {
            if (_bone == "FOCUS" || _bone == "ROOT") {}
            else {
                for (var _mesh in this._meshesAttachedToBones[_bone]) {
                    if (this._meshesAttachedToBones[_bone][_mesh] instanceof BABYLON.AbstractMesh) {
                        this._meshesAttachedToBones[_bone][_mesh].detachFromBone();
                        Game.removeMesh(this._meshesAttachedToBones[_bone][_mesh]);
                        delete this._bonesAttachedToMeshes[_mesh][_bone];
                    }
                }
                delete this._meshesAttachedToBones[_bone];
            }
        }
        return this;
    }
    attachToFOCUS(_mesh) {
        return this.attachToBone(_mesh, undefined, "FOCUS");
    }
    detachFromFOCUS() {
        return this.detachFromBone("FOCUS");
    }
    attachToHead(_mesh, _texture) {
        this.attachToBone(_mesh, _texture, "head", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0));
        if (this._showHelmet) {
            this.showHelmet();
        }
        else {
            this.hideHelmet();
        }
        return this;
    }
    detachFromHead() {
        return this.detachFromBone("head");
    }
    attachToLeftEye(_mesh, _texture) {
        return this.attachToBone(_mesh, _texture, "eye.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(-90), 0, 0));
    }
    detachFromLeftEye() {
        return this.detachFromBone("eye.l");
    }
    attachToRightEye(_mesh, _texture) {
        return this.attachToBone(_mesh, _texture, "eye.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(-90), 0, 0));
    }
    detachFromRightEye() {
        return this.detachFromBone("eye.r");
    }
    attachToLeftEar(_mesh, _texture) {
        return this.attachToBone(_mesh, _texture, "ear.l");
    }
    detachFromLeftEar() {
        return this.detachFromBone("ear.l");
    }
    attachToRightEar(_mesh, _texture) {
        return this.attachToBone(_mesh, _texture, "ear.r");
    }
    detachFromRightEar() {
        return this.detachFromBone("ear.r");
    }
    attachToNeck(_mesh, _texture) {
        return this.attachToBone(_mesh, _texture, "neck");
    }
    detachFromNeck() {
        return this.detachFromBone("neck");
    }
    attachToLeftShoulder(_mesh, _texture) {
        return this.attachToBone(_mesh, _texture, "shoulder.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(120), BABYLON.Tools.ToRadians(-90)));
    }
    detachFromLeftShoulder() {
        return this.detachFromBone("shoulder.l");
    }
    attachToRightShoulder(_mesh, _texture) {
        return this.attachToBone(_mesh, _texture, "shoulder.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(120), BABYLON.Tools.ToRadians(-90)));
    }
    detachFromRightShoulder() {
        return this.detachFromBone("shoulder.r");
    }
    attachToLeftForearm(_mesh, _texture) {
        return this.attachToBone(_mesh, _texture, "forearm.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)));
    }
    detachFromLeftForearm() {
        return this.detachFromBone("forearm.l");
    }
    attachToRightForearm(_mesh, _texture) {
        return this.attachToBone(_mesh, _texture, "forearm.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(120), BABYLON.Tools.ToRadians(-90)));
    }
    detachFromRightForearm() {
        return this.detachFromBone("forearm.r");
    }
    attachToLeftHand(_mesh, _texture) {
        return this.attachToBone(_mesh, _texture, "hand.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(90)));
    }
    detachFromLeftHand() {
        return this.detachFromBone("hand.l");
    }
    attachToRightHand(_mesh, _texture) {
        return this.attachToBone(_mesh, _texture, "hand.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(90)));
    }
    detachFromRightHand() {
        return this.detachFromBone("hand.r");
    }
    /**
     * Generates attached organ meshes :V
     * @return {null} null
     */
    generateOrganMeshes() {
        if (!this.hasSkeleton()) {
            return;
        }
        let _string = new String();
        switch (this.entity.getEyeType()) {
            case EyeEnum.FERAL: {
                _string = _string.concat("feralEye");
                break;
            }
            case EyeEnum.OBLONG: {
                _string = _string.concat("oblongEye");
                break;
            }
            case EyeEnum.CIRCLE:
            default: {
                _string = _string.concat("circularEye");
            }
        }
        switch (this.entity.getEyeColour()) {
            case "yellow": {
                _string = _string.concat("Yellow");
                break;
            }
            case "brown": {
                _string = _string.concat("Brown");
                break;
            }
            case "blue": {
                _string = _string.concat("Blue");
                break;
            }
            case "green": {
                _string = _string.concat("Green");
                break;
            }
            case "violet": {
                _string = _string.concat("Violet");
                break;
            }
            case "grey":
            case "gray":
            default: {
            }
        }
        this.detachFromRightEye();
        this.detachFromLeftEye();
        this.attachToRightEye("eye01", _string);
        this.attachToLeftEye("eye01", _string);
    }
    /**
     * Generates attached cosmetic meshes according to entity's cosmetics
     * @return {null} null
     */
    generateCosmeticMeshes() { // TODO
        if (!this.hasSkeleton()) {
            return;
        }
    }
    /**
     * Generated attached equipment meshes according to entity's equipment
     * @return {null} null
     */
    generateEquippedMeshes() {
        if (!this.hasSkeleton()) {
            return;
        }
        for (_equipmentIndex in this.entity.getEquipment()) {
            switch (_equipmentIndex) {
                case "HEAD": {
                    this.attachToHead(this.entity.getEquipment()[_equipmentIndex]);
                    break;
                }
                case "EAR_L": {
                    this.attachToLeftEar(this.entity.getEquipment()[_equipmentIndex]);
                    break;
                }
                case "EAR_R": {
                    this.attachToRightEar(this.entity.getEquipment()[_equipmentIndex]);
                    break;
                }
                case "NECK": {
                    this.attachToNeck(this.entity.getEquipment()[_equipmentIndex]);
                    break;
                }
                case "SHOULDER_L": {
                    this.attachToLeftShoulder(this.entity.getEquipment()[_equipmentIndex]);
                    break;
                }
                case "SHOULDER_R": {
                    this.attachToRightShoulder(this.entity.getEquipment()[_equipmentIndex]);
                    break;
                }
                case "FOREARM_L": {
                    this.attachToLeftForearm(this.entity.getEquipment()[_equipmentIndex]);
                    break;
                }
                case "FOREARM_R": {
                    this.attachToRightForearm(this.entity.getEquipment()[_equipmentIndex]);
                    break;
                }
                case "HAND_L": {
                    this.attachToLeftHand(this.entity.getEquipment()[_equipmentIndex]);
                    break;
                }
                case "HAND_R": {
                    this.attachToRightHand(this.entity.getEquipment()[_equipmentIndex]);
                    break;
                }
                default: {
                    
                }
            }
        }
    }

    dispose() {
        if (this == Game.player.getController()) {
            return false;
        }
        this.detachFromAllBones();
        super.dispose();
        for (var _var in this) {
            this[_var] = null;
        }
        Game.removeCharacterController(this.id);
        return undefined;
    }
}