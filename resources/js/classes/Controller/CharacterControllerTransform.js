class CharacterControllerTransform extends CharacterController {
    constructor(id, mesh, entity) {
        super(id, mesh, entity);
        this.groundRay = new BABYLON.Ray(mesh.position, mesh.position.add(BABYLON.Vector3.Down()), 0.01);
        this.gravity = -Game.scene.gravity.y;
        this.minSlopeLimit = BABYLON.Tools.ToRadians(30);
        this.maxSlopeLimit = BABYLON.Tools.ToRadians(50);
        this._stepOffset = 0.25;
        this._vMoveTot = 0;
        this._vMovStartPos = BABYLON.Vector3.Zero();
        this.walkSpeed = 0.68 * this.mesh.scaling.z;
        this.runSpeed = 3.2 * this.mesh.scaling.z;
        this.sprintSpeed = this.runSpeed * 2;
        this.jumpSpeed = this.mesh.scaling.y * 4;
        this.moveVector = new BABYLON.Vector3();
        this.avStartPos = BABYLON.Vector3.Zero();
        this.freeFallDist = 0;
        this.fallFrameCountMin = 50;
        this.fallFrameCount = 0;
        this.jumpStartPosY = 0;
        this.jumpTime = 0;
        this.movFallTime = 0;
        this.idleFallTime = 0;
        this.groundFrameCount = 0;
        this.groundFrameMax = 10;
    }
    moveAV() {
        if (!(this.mesh instanceof BABYLON.Mesh)) {
            return this;
        }
        if (this._isLocked) {
            return this;
        }
        if (!this.entity.living) {
            return this;
        }
        if (this.getParent() != undefined) {
            this.removeParent();
        }
        let anim = this.idle;
        if (this.key.jump && !this.isFalling) {
            this.avStartPos.copyFrom(this.mesh.position);
            this.entity.removeFurniture();
            this.entity.setStance(StanceEnum.STAND);
            this.isGrounded = false;
            this.idleFallTime = 0;
            anim = this.doJump();
        }
        else if (this.anyMovement() || this.isFalling) {
            this.avStartPos.copyFrom(this.mesh.position);
            this.entity.removeFurniture();
            this.entity.setStance(StanceEnum.STAND);
            this.isGrounded = false;
            this.idleFallTime = 0;
            anim = this.doMove();
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
            this.avStartPos.copyFrom(this.mesh.position);
            this.entity.removeFurniture();
            anim = this.doIdle();
        }
        /*if (anim == this.idle) {
            if (this.idleAnim != null) {
                this.idleAnim.weight = 1.0;
            }
            if (this.walkAnim != null) {
                this.walkAnim.weight = 0.0;
            }
            if (this.runAnim != null) {
                this.runAnim.weight = 0.0;
            }
            this.prevAnim = this.idle;
        }
        else if (anim == this.walk) {
            if (this.idleAnim != null) {
                this.idleAnim.weight = 0.0001;
            }
            if (this.walkAnim != null) {
                this.walkAnim.weight = 1.0;
            }
            if (this.runAnim != null) {
                this.runAnim.weight = 0.0;
            }
            this.prevAnim = this.walk;
        }
        else if (anim == this.run) {
            if (this.idleAnim != null) {
                this.idleAnim.weight = 0.0001;
            }
            if (this.walkAnim != null) {
                this.walkAnim.weight = 0.0;
            }
            if (this.runAnim != null) {
                this.runAnim.weight = 1.0;
            }
            this.prevAnim = this.run;
        }
        else {
            this.beginAnimation(anim);
        }*/
        this.beginAnimation(anim);
        if (Game.player == this.entity) {
            Game.updateCameraTarget();
        }
        return this;
    }
    doJump(power = 1.0) {
        let dt = Game.engine.getDeltaTime() / 1000;
        let anim = this.runJump;
        if (this.jumpTime === 0) {
            this.jumpStartPosY = this.mesh.position.y;
        }
        let js = this.jumpSpeed - this.gravity * this.jumpTime;
        let jumpDist = js * dt * power - 0.5 * this.gravity * dt * dt;
        this.jumpTime += dt;
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
        this.mesh.moveWithCollisions(disp);
        if (jumpDist < 0) {
            if ((this.mesh.position.y > this.avStartPos.y) || ((this.mesh.position.y === this.avStartPos.y) && (disp.length() > 0.001))) {
                this.endJump();
            }
            else if (this.mesh.position.y < this.jumpStartPosY) {
                let actDisp = this.mesh.position.subtract(this.avStartPos);
                if (!(Tools.areVectorsEqual(actDisp, disp, 0.001))) {
                    if (Tools.verticalSlope(actDisp) <= this.minSlopeLimit) {
                        this.endJump();
                    }
                }
            }
        }
        if (!this.entity.living) {
            return null;
        }
        return anim;
    }
    endJump() {
        this.key.jump = false;
        this.jumpTime = 0;
        this.isWalking = false;
        this.isRunning = false;
        this.isSprinting = false;
    }
    doMove() {
        let dt = Game.engine.getDeltaTime() / 1000;
        let anim = this.idle;
        let u = this.movFallTime * this.gravity;
        this.freeFallDist = u * dt + this.gravity * dt * dt / 2;
        this.movFallTime = this.movFallTime + dt;
        let moving = false;
        let direction = 0;
        if (this.isFalling) {
            this.moveVector.y = -this.freeFallDist;
            moving = true;
            anim = this.fall;
        }
        else {
            this.moveVector.set(0,0,0);
            let dist = 0;
            if (this.isStanding) {
                if (this.key.shift) {
                    dist = this.sprintSpeed * dt;
                    this.isWalking = false;
                    this.isRunning = false;
                    this.isSprinting = true;
                    moving = true;
                }
                else {
                    dist = this.runSpeed * dt;
                    anim = this.run;
                    this.isWalking = false;
                    this.isRunning = true;
                    this.isSprinting = false;
                    moving = true;
                }
            }
            else if (this.isCrouching) {
                dist = this.crouchSpeed * dt;
                anim = this.crouch;
                this.isWalking = true;
                this.isRunning = false;
                this.isSprinting = false;
            }
            if (this.key.forward) {
                if (this.key.strafeRight && !this.key.strafeLeft) {
                    direction = BABYLON.Tools.ToRadians(45);
                }
                else if (this.key.strafeLeft && !this.key.strafeRight) {
                    direction = BABYLON.Tools.ToRadians(315);
                }
                else {
                    direction = 0;
                }
            }
            else if (this.key.backward) {
                if (this.key.strafeRight && !this.key.strafeLeft) {
                    direction = BABYLON.Tools.ToRadians(135);
                }
                else if (this.key.strafeLeft && !this.key.strafeRight) {
                    direction = BABYLON.Tools.ToRadians(225);
                }
                else {
                    direction = BABYLON.Tools.ToRadians(180);
                }
            }
            else if (this.key.strafeRight && !this.key.strafeLeft) {
                direction = BABYLON.Tools.ToRadians(90);
            }
            else if (this.key.strafeLeft && !this.key.strafeRight) {
                direction = BABYLON.Tools.ToRadians(270);
            }
            else {
                moving = false;
                dist = 0;
            }
            this.moveVector = this.mesh.calcMovePOV(0, -this.freeFallDist, dist);
        }
        this.mesh.rotation.y = direction + (-Math.atan2((this.mesh.position.z - Game.camera.position.z), (this.mesh.position.x - Game.camera.position.x)) - BABYLON.Tools.ToRadians(90));
        /*
         *  Jittering in the Y direction caused by _moveVector
         */
        if (moving && this.moveVector.length() > 0.001) {
            this.updateGroundRay();
            let hit = Game.scene.pickWithRay(this.groundRay, function(_mesh) {
                if (_mesh.isPickable && _mesh.checkCollisions) {
                    return true;
                }
                return false;
            });
            if (hit.hit) {
                if (Game.Tools.arePointsEqual(this.mesh.position.y + this.moveVector.y, hit.pickedMesh.position.y+0.06125, 0.0125)) {
                    this.moveVector.y = 0;
                }
            }
            this.mesh.moveWithCollisions(this.moveVector);
            if (this.mesh.position.y > this.avStartPos.y) {
                let actDisp = this.mesh.position.subtract(this.avStartPos);
                let slope = Tools.verticalSlope(actDisp);
                if (slope >= this.maxSlopeLimit) {
                    if (this._stepOffset > 0) {
                        if (this._vMoveTot == 0) {
                            this._vMovStartPos.copyFrom(this.avStartPos);
                        }
                        this._vMoveTot = this._vMoveTot + (this.mesh.position.y - this.avStartPos.y);
                        if (this._vMoveTot > this._stepOffset) {
                            this._vMoveTot = 0;
                            this.mesh.position.copyFrom(this._vMovStartPos);
                            this.endFreeFall();
                        }
                    }
                    else {
                        this.mesh.position.copyFrom(this.avStartPos);
                        this.endFreeFall();
                    }
                }
                else {
                    this._vMoveTot = 0;
                    if (slope > this.minSlopeLimit) {
                        this.fallFrameCount = 0;
                        this.isFalling = false;
                    }
                    else {
                        this.endFreeFall();
                    }
                }
            }
            else if ((this.mesh.position.y) < this.avStartPos.y) {
                let actDisp = this.mesh.position.subtract(this.avStartPos);
                if (!(Tools.areVectorsEqual(actDisp, this.moveVector, 0.001))) {
                    if (Tools.verticalSlope(actDisp) <= this.minSlopeLimit) {
                        this.endFreeFall();
                    }
                    else {
                        this.fallFrameCount = 0;
                        this.isFalling = false;
                    }
                }
                else {
                    this.isFalling = true;
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
        if (!this.entity.living) {
            return null;
        }
        return anim;
    }
    endFreeFall() {
        this.movFallTime = 0;
        this.fallFrameCount = 0;
        this.isFalling = false;
    }
    doIdle() {
        if (this.isGrounded) {
            return this.idle;
        }
        let dt = Game.engine.getDeltaTime() / 1000;
        let anim = this.idle;
        this.isWalking = false;
        this.isRunning = false;
        this.isSprinting = false;
        this.movFallTime = 0;
        this.fallFrameCount = 0;
        if (dt === 0) {
            this.freeFallDist = 5;
        }
        else {
            let u = this.idleFallTime * this.gravity;
            this.freeFallDist = u * dt + this.gravity * dt * dt / 2;
            this.idleFallTime = this.idleFallTime + dt;
        }
        if (this.freeFallDist < 0.01) {
            return anim;
        }
        let disp = new BABYLON.Vector3(0, -this.freeFallDist, 0);
        this.mesh.moveWithCollisions(disp);
        if ((this.mesh.position.y > this.avStartPos.y) || (this.mesh.position.y === this.avStartPos.y)) {
            this.groundIt();
        }
        else if (this.mesh.position.y < this.avStartPos.y) {
            let actDisp = this.mesh.position.subtract(this.avStartPos);
            if (!(Tools.areVectorsEqual(actDisp, disp, 0.001))) {
                if (Tools.verticalSlope(actDisp) <= this.minSlopeLimit) {
                    this.groundIt();
                    this.mesh.position.copyFrom(this.avStartPos);
                }
                else {
                    this.unGroundIt();
                    anim = this.slideBack;
                }
            }
        }
        if (!this.entity.living) {
            return null;
        }
        return anim;
    }
    groundIt() {
        this.groundFrameCount++;
        if (this.groundFrameCount > this.groundFrameMax) {
            this.isGrounded = true;
            this.idleFallTime = 0;
        }
    }
    unGroundIt() {
        this.isGrounded = false;
        this.groundFrameCount = 0;
    }
    updateGroundRay() {
        if (!(this.groundRay instanceof BABYLON.Ray)) {
            return this;
        }
        this.groundRay.origin = this.mesh.position;
        this.groundRay.direction = this.mesh.position.add(BABYLON.Vector3.Down());
        return this;
    }

    dispose() {
        super.dispose();
        return undefined;
    }
}