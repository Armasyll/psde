/**
 * Heavily referenced, borderline copied, Ssatguru's BabylonJS-CharacterController https://github.com/ssatguru/BabylonJS-CharacterController
 * It's great :v you should check it out.
 */
class CharacterController extends EntityController {
    constructor(id, mesh, entity) {
        super(id, mesh, entity);
        if (!this.hasMesh()) {
            return;
        }
        this.focus = undefined;
        this.root = undefined;
        this.targetController = null;
        this.targetedByControllers = new Set();
        this.targetRay = undefined;
        this.targetRayHelper = undefined;
        this.groundRay = new BABYLON.Ray(mesh.position, mesh.position.add(BABYLON.Vector3.Down()), 0.01);
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
        this.runSpeed = 3.2 * this.mesh.scaling.z;
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
        this._isAttacking = false; // While crouching, walking, or running
        this.isAlive = true;

        this.walk = new AnimData("walk");
        this.walkBack = new AnimData("walkBack");
        this.idle = new AnimData("idle");
        this.idleJump = new AnimData("idleJump");
        this.fall = new AnimData("fall");
        this.fallLong = new AnimData("fallLong");
        this.land = new AnimData("land");
        this.landHard = new AnimData("landHard");
        this.rollForward = new AnimData("rollForward");
        this.run = new AnimData("run");
        this.runJump = new AnimData("runJump");
        this.turnLeft = new AnimData("turnLeft");
        this.turnRight = new AnimData("turnRight");
        this.strafeLeft = new AnimData("strafeLeft");
        this.strafeRight = new AnimData("strafeRight");
        this.slideBack = new AnimData("slideBack");
        this.attackPunchRH = new AnimData("attachPunchRH");
        this.attackRunningPunchRH = new AnimData("attachPunchRH");
        this.attackThrustRH = new AnimData("attackThrustRH");
        this.attackSlashRH = new AnimData("attackSlashRH");
        this.attackChopRH = new AnimData("attackChopRH");
        this.attackPunchLH = new AnimData("attachPunchLH");
        this.attackThrustLH = new AnimData("attackThrustLH");
        this.attackSlashLH = new AnimData("attackSlashLH");
        this.attackChopLH = new AnimData("attackChopLH");
        this.attackThrust2H = new AnimData("attackThrust2H");
        this.attackSlash2H = new AnimData("attackSlash2H");
        this.attackChop2H = new AnimData("attackChop2H");
        this.lieDown = new AnimData("lieDown");
        this.sitDown = new AnimData("sitDown");
        this.death = new AnimData("death");
        this.animations = this.animations.concat([this.walk, this.walkBack, this.idleJump, this.run, this.runJump, this.fall, this.turnLeft, this.turnRight, this.strafeLeft, this.strafeRight, this.slideBack]);

        this.setWalkAnim("93_walkingKneesBent", 1.2, true);
        this.setRunAnim("94_runningKneesBent", 2, true);
        this.setWalkBackAnim("93_walkingBackwardKneesBent", 1, true);
        this.setIdleAnim("90_idle01", 1, true);
        this.setTurnLeftAnim("93_walkingKneesBent", 1, true);
        this.setTurnRightAnim("93_walkingKneesBent", 1, true);
        this.setIdleJumpAnim("95_jump", 1, false);
        this.setRunJumpAnim("95_jump", 1, false);
        this.setAnimData(this.attackPunchRH, "71_punch01", 1, false, false);
        this.setAnimData(this.attackRunningPunchRH, "71_runningPunch01", 1, false, false);
        this.setAnimData(this.attackThrustRH, "71_stab01", 1, false, false);
        this.setAnimData(this.lieDown, "91_lieDown01", 1, false);
        this.setAnimData(this.sitDown, "91_sitDown01", 1, false);
        this.setDeathAnim("91_death01", 1, false);

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
        this._attachedMeshes = new Set();
        this.generateOrganMeshes();
        this.generateCosmeticMeshes();
        this.generateEquippedMeshes();
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
    setWalkSpeed(number) {
        this.walkSpeed = number;
    }
    setRunSpeed(number) {
        this.runSpeed = number;
    }
    setJumpSpeed(number) {
        this.jumpSpeed = number;
    }
    setGravityScale(number) {
        this.gravityScale = number;
        this._gravity = -Game.gravity.y * this.gravityScale;
    }
    setWalkAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.walk, rangeName, rate, loop, standalone);
    }
    setRunAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.run, rangeName, rate, loop, standalone);
    }
    setWalkBackAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.walkBack, rangeName, rate, loop, standalone);
    }
    setSlideBackAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.slideBack, rangeName, rate, loop, standalone);
    }
    setIdleAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.idle, rangeName, rate, loop, standalone);
    }
    setIdleJumpAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.idleJump, rangeName, rate, loop, standalone);
    }
    setTurnRightAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.turnRight, rangeName, rate, loop, standalone);
    }
    setTurnLeftAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.turnLeft, rangeName, rate, loop, standalone);
    }
    setStrafeRightAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.strafeRight, rangeName, rate, loop, standalone);
    }
    setSrafeLeftAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.strafeLeft, rangeName, rate, loop, standalone);
    }
    setRunJumpAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.runJump, rangeName, rate, loop, standalone);
    }
    setFallAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.fall, rangeName, rate, loop, standalone);
    }
    setDeathAnim(rangeName, rate, loop = false, standalone = false) {
        this.setAnimData(this.death, rangeName, rate, loop, standalone);
    }
    moveAV() {
        if (!(this.mesh instanceof BABYLON.Mesh)) {
            return this;
        }
        if (this._isLocked) {
            return this;
        }
        if (!this.isAlive) {
            return this;
        }
        if (this.getParent() != undefined) {
            this.removeParent();
        }
        this._avStartPos.copyFrom(this.mesh.position);
        let anim = this.idle;
        let dt = Game.engine.getDeltaTime() / 1000;
        if (this.key.jump && !this.isFalling) {
            this.entity.removeFurniture();
            this.entity.setStance(StanceEnum.STAND);
            this.isGrounded = false;
            this._idleFallTime = 0;
            anim = this.doJump(dt);
        }
        else if (this.anyMovement() || this.isFalling) {
            this.entity.removeFurniture();
            this.entity.setStance(StanceEnum.STAND);
            this.isGrounded = false;
            this._idleFallTime = 0;
            anim = this.doMove(dt);
            Game.entityLocRotWorker.postMessage({
                cmd:"setLocRot",
                msg:[
                    this.entity.getID(),
                    new Date().getTime(),
                    this.mesh.position.asArray(),
                    this.mesh.rotation.asArray()
                ]
            });
        }
        else if (!this.isFalling) {
            this.entity.removeFurniture();
            anim = this.doIdle(dt);
        }
        this.beginAnimation(anim);
        if (Game.player == this.entity) {
            Game.updateCameraTarget();
        }
        return this;
    }
    doJump(dt, power = 1.0) {
        let anim = this.runJump;
        if (this._jumpTime === 0) {
            this._jumpStartPosY = this.mesh.position.y;
        }
        let js = this.jumpSpeed - this._gravity * this._jumpTime;
        let jumpDist = js * dt * power - 0.5 * this._gravity * dt * dt;
        this._jumpTime += dt;
        let forwardDist = 0;
        let disp = BABYLON.Vector3.Zero();
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
                let actDisp = this.mesh.position.subtract(this._avStartPos);
                if (!(Tools.areVectorsEqual(actDisp, disp, 0.001))) {
                    if (Tools.verticalSlope(actDisp) <= this._minSlopeLimitRads) {
                        this.endJump();
                    }
                }
            }
        }
        if (!this.isAlive) {
            return null;
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
        let anim = this.idle;
        let u = this._movFallTime * this._gravity;
        this._fallDist = u * dt + this._gravity * dt * dt / 2;
        this._movFallTime = this._movFallTime + dt;
        let moving = false;
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
        if (moving && this._moveVector.length() > 0.001) {
            this.updateGroundRay();
            let hit = Game.scene.pickWithRay(this.groundRay, function(_mesh) {
                if (_mesh.isPickable && _mesh.checkCollisions) {
                    return true;
                }
                return false;
            });
            if (hit.hit) {
                if (Game.Tools.arePointsEqual(this.mesh.position.y + this._moveVector.y, hit.pickedMesh.position.y+0.06125, 0.0125)) {
                    this._moveVector.y = 0;
                }
            }
            this.mesh.moveWithCollisions(this._moveVector);
            if (this.mesh.position.y > this._avStartPos.y) {
                let actDisp = this.mesh.position.subtract(this._avStartPos);
                let slope = Tools.verticalSlope(actDisp);
                if (slope >= this._maxSlopeLimitRads) {
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
                    if (slope > this._minSlopeLimitRads) {
                        this._fallFrameCount = 0;
                        this.isFalling = false;
                    }
                    else {
                        this.endFreeFall();
                    }
                }
            }
            else if ((this.mesh.position.y) < this._avStartPos.y) {
                let actDisp = this.mesh.position.subtract(this._avStartPos);
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
        if (!this.isAlive) {
            return null;
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
        let anim = this.idle;
        this.isWalking = false;
        this.isRunning = false;
        this.isSprinting = false;
        this._movFallTime = 0;
        this._fallFrameCount = 0;
        if (dt === 0) {
            this._fallDist = 5;
        }
        else {
            let u = this._idleFallTime * this._gravity;
            this._fallDist = u * dt + this._gravity * dt * dt / 2;
            this._idleFallTime = this._idleFallTime + dt;
        }
        if (this._fallDist < 0.01) {
            return anim;
        }
        let disp = new BABYLON.Vector3(0, -this._fallDist, 0);
        this.mesh.moveWithCollisions(disp);
        if ((this.mesh.position.y > this._avStartPos.y) || (this.mesh.position.y === this._avStartPos.y)) {
            this.groundIt();
        }
        else if (this.mesh.position.y < this._avStartPos.y) {
            let actDisp = this.mesh.position.subtract(this._avStartPos);
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
        if (!this.isAlive) {
            return null;
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
    setMovementKey(key) {
        if (typeof key[0] == "boolean" && typeof key[7] == "boolean") {
            this.key.forward = key[0];
            this.key.shift = key[1];
            this.key.backward = key[2];
            this.key.strafeLeft = key[3];
            this.key.strafeRight = key[4];
            this.key.turnLeft = key[5];
            this.key.turnRight = key[6];
            this.key.jump = key[7];
        }
        return this;
    }
    keyMoveForward(pressed = true) {
        if (pressed === true) {
            this.key.forward = true;
            this.key.backward = false;
        }
        else {
            this.key.forward = false;
        }
        return this;
    }
    keyShift(pressed = true) {
        if (pressed === true) {
            this.key.shift = true;
        }
        else {
            this.key.shift = false;
        }
        return this;
    }
    keyMoveBackward(pressed = true) {
        if (pressed === true) {
            this.key.backward = true;
            this.key.forward = false;
        }
        else {
            this.key.backward = false;
        }
        return this;
    }
    keyTurnLeft(pressed = true) {
        if (pressed === true) {
            this.key.turnLeft = true;
            this.key.turnRight = false;
        }
        else {
            this.key.turnLeft = false;
        }
        return this;
    }
    keyTurnRight(pressed = true) {
        if (pressed === true) {
            this.key.turnRight = true;
            this.key.turnLeft = false;
        }
        else {
            this.key.turnRight = false;
        }
        return this;
    }
    keyStrafeLeft(pressed = true) {
        if (pressed === true) {
            this.key.strafeLeft = true;
            this.key.strafeRight = false;
        }
        else {
            this.key.strafeLeft = false;
        }
        return this;
    }
    keyStrafeRight(pressed = true) {
        if (pressed === true) {
            this.key.strafeLeft = false;
            this.key.strafeRight = true;
        }
        else {
            this.key.strafeRight = false;
        }
        return this;
    }
    keyJump(pressed = true) {
        if (pressed === true) {
            this.key.jump = true;
        }
        else {
            this.key.jump = false;
        }
        return this;
    }
    doPunchRH(dt) {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return false;
        }
        if (this._isAttacking) {
            return false;
        }
        this._isAttacking = true;
        setTimeout(() => {this._isAttacking = false;}, 800);
        if (this.isRunning) {
            for (let i = 0; i < this.animationBones["rightArm"].length; i++) {
                Game.scene.beginAnimation(this.skeleton.bones[this.animationBones["rightArm"][i]], this.attackRunningPunchRH.from, this.attackRunningPunchRH.to, this.attackRunningPunchRH.loop, this.attackRunningPunchRH.rate);
            }
        }
        else {
            for (let i = 0; i < this.animationBones["rightArm"].length; i++) {
                Game.scene.beginAnimation(this.skeleton.bones[this.animationBones["rightArm"][i]], this.attackPunchRH.from, this.attackPunchRH.to, this.attackPunchRH.loop, this.attackPunchRH.rate);
            }
        }
        return true;
    }
    doThrustRH(dt) {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return false;
        }
        if (this._isAttacking) {
            return false;
        }
        this._isAttacking = true;
        setTimeout(() => {this._isAttacking = false;}, 800);
        for (let i = 0; i < this.animationBones["rightArm"].length; i++) {
            Game.scene.beginAnimation(this.skeleton.bones[this.animationBones["rightArm"][i]], this.attackThrustRH.from, this.attackThrustRH.to, this.attackThrustRH.loop, this.attackThrustRH.rate);
        }
        return true;
    }
    doDeath(dt) {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return false;
        }
        this.isAlive = false;
        this.beginAnimation(this.death);
        return true;
    }
    doLay(dt) {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return false;
        }
        this.setLocked(true);
        this.beginAnimation(this.lieDown, () => {this.setLocked(false)});
        return true;
    }
    doSit(dt) {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return false;
        }
        this.setLocked(true);
        this.beginAnimation(this.sitDown, () => {this.setLocked(false)});
        return true;
    }

    setAttacking(bool = true) {
        this._isAttacking = bool == true;
        console.log(`running setAttacking(${this._isAttacking ? "true" : "false"})`);
    }
    isAttacking() {
        return this._isAttacking;
    }
    hasTarget() {
        return this.targetController instanceof EntityController;
    }
    setTarget(controller, updateChild = true) {
        if (!(controller instanceof EntityController)) {
            return this;
        }
        this.targetController = controller;
        if (updateChild) {
            controller.addTargetedBy(this, false);
        }
        this.entity.setTarget(controller.getEntity());
        return this;
    }
    removeTarget(updateChild = true) {
        if (updateChild && this.targetController instanceof EntityController) {
            this.targetController.removeTargetedBy(this, false);
        }
        this.targetController = null;
        this.entity.removeTarget();
        return this;
    }
    clearTarget(updateChild = true) {
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
        for (let bone in this._meshesAttachedToBones) {
            if (bone == "FOCUS" || bone == "ROOT") {}
            else if (this._showHelmet && bone == "head") {}
            for (let mesh in this._meshesAttachedToBones[bone]) {
                if (this._meshesAttachedToBones[bone][mesh] instanceof BABYLON.AbstractMesh) {
                    this._meshesAttachedToBones[bone][mesh].isVisible = false;
                }
            }
        }
        return this;
    }
    showAttachedMeshes() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        for (let bone in this._meshesAttachedToBones) {
            if (bone == "FOCUS" || bone == "ROOT") {}
            else if (!this._showHelmet && bone == "head") {}
            else {
                for (let mesh in this._meshesAttachedToBones[bone]) {
                    if (this._meshesAttachedToBones[bone][mesh] instanceof BABYLON.AbstractMesh) {
                        this._meshesAttachedToBones[bone][mesh].isVisible = true;
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
            for (let mesh in this._meshesAttachedToBones["head"]) {
                if (this._meshesAttachedToBones["head"][mesh] instanceof BABYLON.AbstractMesh) {
                    this._meshesAttachedToBones["head"][mesh].isVisible = false;
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
            for (let mesh in this._meshesAttachedToBones["head"]) {
                if (this._meshesAttachedToBones["head"][mesh] instanceof BABYLON.AbstractMesh) {
                    this._meshesAttachedToBones["head"][mesh].isVisible = true;
                }
            }
        }
        this._showHelmet = true;
        return this;
    }

    getBone(bone) {
        if (Game.debugMode) console.log("Running getBone");
        if (this.skeleton instanceof BABYLON.Skeleton) {
            if (bone instanceof BABYLON.Bone) {
                return bone;
            }
            else if (typeof bone == "string") {
                return this.getBoneByName(bone);
            }
            else if (typeof bone == "number") {
                return this.getBoneByID(bone);
            }
        }
        return null;
    }
    getBoneByName(string) {
        if (this.skeleton instanceof BABYLON.Skeleton) {
            return this.skeleton.bones[this.skeleton.getBoneIndexByName(string)];
        }
        return null;
    }
    getBoneByID(number) {
        if (this.skeleton instanceof BABYLON.Skeleton) {
            return this.skeleton.bones[number];
        }
        return null;
    }
    /**
     * Attaches a mesh to a bone
     * @param  {string} meshID Mesh ID
     * @param  {string} materialID Texture ID
     * @param  {string} boneID Bone name
     * @param  {BABYLON.Vector3} [position] Mesh position
     * @param  {BABYLON.Vector3} [rotation] Mesh rotation
     * @param  {BABYLON.Vector3} [scaling] Mesh scaling
     * @param  {object} [options] Options
     * @returns {CharacterController} This character controller.
     */
    attachMeshIDToBone(meshID = "missingMesh", materialID = "missingTexture", boneID, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        if (Game.debugMode) console.log("Running attachMeshIDToBone");
        if (!Game.hasAvailableMesh(meshID)) {
            return this;
        }
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        let bone = this.getBone(boneID);
        if (!(bone instanceof BABYLON.Bone)) {
            return this;
        }
        if (!(position instanceof BABYLON.Vector3)) {
            position = Tools.filterVector(position);
        }
        if (!(rotation instanceof BABYLON.Vector3)) {
            rotation = Tools.filterVector(rotation);
        }
        if (!(scaling instanceof BABYLON.Vector3)) {
            scaling = Tools.filterVector(scaling);
        }
        if (scaling.equals(BABYLON.Vector3.Zero())) {
            scaling = BABYLON.Vector3.One();
        }
        if (!(Game.hasLoadedMesh(meshID))) {
            Game.loadMesh(meshID);
            Game.addAttachmentToCreate((this.id + bone.name + meshID), this, meshID, materialID, bone.name, position, rotation, scaling);
            return this;
        }
        let loadedMesh = Game.createMesh(meshID.concat("Attachment").concat(this.id.capitalize()).concat(boneID), meshID, materialID, position, rotation, scaling, options);
        return this.attachMeshToBone(loadedMesh, bone, position, rotation, scaling);
    }
    /**
     * Attaches a collision mesh to a bone
     * @param  {string} meshID Mesh ID
     * @param  {string} materialID Texture ID
     * @param  {string} boneID Bone name
     * @param  {BABYLON.Vector3} [position] Mesh position
     * @param  {BABYLON.Vector3} [rotation] Mesh rotation
     * @param  {BABYLON.Vector3} [scaling] Mesh scaling
     * @param  {object} [options] Options; used
     * @returns {CharacterController} This character controller.
     */
    attachCollisionMeshIDToBone(meshID = "missingMesh", materialID = "missingTexture", boneID, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        if (typeof options != "object") {
            options = {};
        }
        options["checkCollisions"] = true
        this.attachMeshIDToBone(meshID, materialID, boneID, position, rotation, scaling, options);
    }
    /**
     * Attaches a collision mesh to a bone
     * @param  {BABYLON.AbstractMesh} mesh Mesh
     * @param  {BABYLON.Bone} bone Bone
     * @param  {BABYLON.Vector3} [position] Mesh position
     * @param  {BABYLON.Vector3} [rotation] Mesh rotation
     * @param  {BABYLON.Vector3} [scaling] Mesh scaling
     * @param  {object} [options] Options; not used
     * @returns {CharacterController} This character controller.
     */
    attachMeshToBone(mesh, bone, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options) {
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        if (!(bone instanceof BABYLON.Bone)) {
            return 2;
        }
        mesh.attachToBone(bone, this.mesh);
        mesh.position.copyFrom(position);
        mesh.rotation.copyFrom(rotation);
        if (!(scaling instanceof BABYLON.Vector3)) {
            mesh.scaling.copyFrom(this.mesh.scaling);
        }
        if (this.prevAnim == undefined) {
            /*
            Because meshes became inverted when they were attached and scaled before actually being rendered for the first time, or something like that :v
             */
            mesh.scalingDeterminant = -1;
        }
        if (!(this._meshesAttachedToBones.hasOwnProperty(bone.id))) {
            this._meshesAttachedToBones[bone.id] = {};
        }
        this._meshesAttachedToBones[bone.id][mesh.id] = mesh;
        if (!(this._bonesAttachedToMeshes.hasOwnProperty(mesh.id))) {
            this._bonesAttachedToMeshes[mesh.id] = {};
        }
        this._bonesAttachedToMeshes[mesh.id][bone.id] = bone;
        if (bone.id == "FOCUS") {
            this.focus = mesh;
            mesh.isVisible = false;
        }
        else if (bone.id == "ROOT") {
            this.root = mesh;
            mesh.isVisible = false;
        }
        this._attachedMeshes.add(mesh);
        return this;
    }
    attachCollisionMeshToBone(mesh, bone, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {"checkCollisions": false}) {
        this.attachMeshToBone(mesh, bone, position, rotation, scaling, true);
    }
    detachFromBone(bone, destroyMesh = true) {
        return this.detachAllFromBone(bone, destroyMesh);
    }
    detachAllFromBone(bone, destroyMesh = true) {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        bone = this.getBone(bone);
        if (!(bone instanceof BABYLON.Bone)) {
            return this;
        }
        if (!(this._meshesAttachedToBones.hasOwnProperty(bone.id))) {
            return this;
        }
        let meshes = new Array();
        for (let meshID in this._meshesAttachedToBones[bone.id]) {
            if (this._meshesAttachedToBones[bone.id][meshID] instanceof BABYLON.AbstractMesh) {
                this._meshesAttachedToBones[bone.id][meshID].detachFromBone();
                meshes.push(this._meshesAttachedToBones[bone.id][meshID]);
                this._attachedMeshes.delete(this._meshesAttachedToBones[bone.id][meshID]);
                delete this._bonesAttachedToMeshes[meshID][bone.id];
            }
        }
        delete this._meshesAttachedToBones[bone.id];
        if (destroyMesh) {
            meshes.forEach(function(mesh) {
                Game.removeMesh(mesh);
            });
            return [];
        }
        return meshes;
    }
    detachMesh(mesh, destroyMesh = true) {
        return this.detachMeshFromBone(mesh, undefined, destroyMesh);
    }
    detachMeshFromBone(mesh, bone = undefined, destroyMesh = true) { // TODO: check what happens if we've got 2 of the same meshes on different bones :v srsly, what if
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        if (!(mesh instanceof AbstractMesh)) {
            mesh = Game.getMesh(mesh);
            if (!(mesh instanceof BABYLON.AbstractMesh)) {
                return this;
            }
        }
        if (!(this._bonesAttachedToMeshes.hasOwnProperty(mesh.id))) {
            return this;
        }
        bone = this.getBone(bone);
        if (bone instanceof BABYLON.Bone) {
            delete this._meshesAttachedToBones[bone.id][mesh.id];
        }
        else {
            for (let boneWithAttachment in this._bonesAttachedToMeshes[mesh.id]) {
                if (this._bonesAttachedToMeshes[mesh.id][boneWithAttachment] instanceof BABYLON.Bone) {
                    delete this._meshesAttachedToBones[boneWithAttachment][mesh.id];
                }
            }
        }
        mesh.detachFromBone();
        delete this._bonesAttachedToMeshes[mesh.id];
        this._attachedMeshes.delete(mesh);
        if (destroyMesh) {
            Game.removeMesh(mesh);
            return [];
        }
        return new Array(mesh);
    }
    detachFromAllBones(destroyMesh = true) {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        let meshes = new Array();
        for (let bone in this._meshesAttachedToBones) {
            if (bone == "FOCUS" || bone == "ROOT") {}
            else {
                meshes.push(...this.detachAllFromBone(bone, destroyMesh));
            }
        }
        return meshes;
    }
    attachToFOCUS(mesh) {
        if (mesh instanceof BABYLON.AbstractMesh) {
            return this.attachMeshToBone(mesh, this.getBone("FOCUS"));
        }
        return this.attachMeshIDToBone(mesh, undefined, "FOCUS");
    }
    detachFromFOCUS() {
        return this.detachFromBone("FOCUS", false)[0];
    }
    attachToHead(_mesh, _texture, options) {
        this.attachMeshIDToBone(_mesh, _texture, "head", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), options);
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
    attachToLeftEye(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "eye.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(-90), 0, 0), undefined, options);
    }
    detachFromLeftEye() {
        return this.detachFromBone("eye.l");
    }
    attachToRightEye(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "eye.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(-90), 0, 0), undefined, options);
    }
    detachFromRightEye() {
        return this.detachFromBone("eye.r");
    }
    attachToLeftEar(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "ear.l", undefined, undefined, undefined, options);
    }
    detachFromLeftEar() {
        return this.detachFromBone("ear.l");
    }
    attachToRightEar(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "ear.r", undefined, undefined, undefined, options);
    }
    detachFromRightEar() {
        return this.detachFromBone("ear.r");
    }
    attachToNeck(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "neck", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), undefined, options);
    }
    detachFromNeck() {
        return this.detachFromBone("neck");
    }
    attachToLeftShoulder(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "shoulder.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(315), BABYLON.Tools.ToRadians(120)), undefined, options);
    }
    detachFromLeftShoulder() {
        return this.detachFromBone("shoulder.l");
    }
    attachToRightShoulder(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "shoulder.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(225), BABYLON.Tools.ToRadians(60)), undefined, options);
    }
    detachFromRightShoulder() {
        return this.detachFromBone("shoulder.r");
    }
    attachToLeftForearm(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "forearm.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), undefined, options);
    }
    detachFromLeftForearm() {
        return this.detachFromBone("forearm.l");
    }
    attachToRightForearm(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "forearm.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(120), BABYLON.Tools.ToRadians(-90)), undefined, options);
    }
    detachFromRightForearm() {
        return this.detachFromBone("forearm.r");
    }
    attachToLeftHand(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "hand.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(90)), undefined, options);
    }
    detachFromLeftHand() {
        return this.detachFromBone("hand.l");
    }
    attachToRightHand(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "hand.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(90)), undefined, options);
    }
    detachFromRightHand() {
        return this.detachFromBone("hand.r");
    }
    attachToChest(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "chest", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), undefined, options);
    }
    detachFromChest() {
        return this.detachFromBone("chest");
    }
    attachToSpine(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "spine", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), undefined, options);
    }
    detachFromSpine() {
        return this.detachFromBone("spine");
    }
    attachToPelvis(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "pelvis", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), undefined, options);
    }
    detachFromPelvis() {
        return this.detachFromBone("pelvis");
    }
    /**
     * Generates attached organ meshes :V
     * @returns {null} null
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
        return this;
    }
    /**
     * Generates attached cosmetic meshes according to entity's cosmetics
     * @returns {null} null
     */
    generateCosmeticMeshes() { // TODO
        if (!this.hasSkeleton()) {
            return;
        }
        return this;
    }
    /**
     * Generated attached equipment meshes according to entity's equipment
     * @returns {null} null
     */
    generateEquippedMeshes() {
        if (!this.hasSkeleton()) {
            return;
        }
        for (let _equipmentIndex in this.entity.getEquipment()) {
            switch (_equipmentIndex) {
                case "HEAD": {
                    if (this.entity.getEquipment()[_equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromHead();
                        this.attachToHead(this.entity.getEquipment()[_equipmentIndex].getMeshID(), this.entity.getEquipment()[_equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "EAR_L": {
                    if (this.entity.getEquipment()[_equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromLeftEar();
                        this.attachToLeftEar(this.entity.getEquipment()[_equipmentIndex].getMeshID(), this.entity.getEquipment()[_equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "EAR_R": {
                    if (this.entity.getEquipment()[_equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromRightEar();
                        this.attachToRightEar(this.entity.getEquipment()[_equipmentIndex].getMeshID(), this.entity.getEquipment()[_equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "NECK": {
                    if (this.entity.getEquipment()[_equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromNeck();
                        this.attachToNeck(this.entity.getEquipment()[_equipmentIndex].getMeshID(), this.entity.getEquipment()[_equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "SHOULDER_L": {
                    if (this.entity.getEquipment()[_equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromLeftShoulder();
                        this.attachToLeftShoulder(this.entity.getEquipment()[_equipmentIndex].getMeshID(), this.entity.getEquipment()[_equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "SHOULDER_R": {
                    if (this.entity.getEquipment()[_equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromRightShoulder();
                        this.attachToRightShoulder(this.entity.getEquipment()[_equipmentIndex].getMeshID(), this.entity.getEquipment()[_equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "FOREARM_L": {
                    if (this.entity.getEquipment()[_equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromLeftForearm();
                        this.attachToLeftForearm(this.entity.getEquipment()[_equipmentIndex].getMeshID(), this.entity.getEquipment()[_equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "FOREARM_R": {
                    if (this.entity.getEquipment()[_equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromRightForearm();
                        this.attachToRightForearm(this.entity.getEquipment()[_equipmentIndex].getMeshID(), this.entity.getEquipment()[_equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "HAND_L": {
                    if (this.entity.getEquipment()[_equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromLeftHand();
                        this.attachToLeftHand(this.entity.getEquipment()[_equipmentIndex].getMeshID(), this.entity.getEquipment()[_equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "HAND_R": {
                    if (this.entity.getEquipment()[_equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromRightHand();
                        this.attachToRightHand(this.entity.getEquipment()[_equipmentIndex].getMeshID(), this.entity.getEquipment()[_equipmentIndex].getTextureID());
                    }
                    break;
                }
            }
        }
        return this;
    }
    /**
     * Returns all meshes associated with this controller.
     * @returns {Set<BABYLON.AbstractMesh>}
     */
    getMeshes() {
        return this._attachedMeshes;
    }

    dispose() {
        if (this == Game.player.getController()) {
            return false;
        }
        this.setLocked(true);
        this.setEnabled(false);
        this.detachFromAllBones();
        super.dispose();
        for (var _var in this) {
            this[_var] = null;
        }
        Game.removeCharacterController(this.id);
        return undefined;
    }
}