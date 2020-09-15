/**
 * Character Controller with Transformative Physics
 * Heavily referenced, borderline copied, Ssatguru's BabylonJS-CharacterController https://github.com/ssatguru/BabylonJS-CharacterController
 * It's great :v you should check it out.
 * 
 * TODO: Rotate towards velocity
 */
class CharacterControllerTransform extends CharacterController {
    /**
     * Creates a Character Controller with a Transformative Body
     * @param {string} id 
     * @param {BABYLON.AbstractMesh} mesh 
     * @param {object} entityObject 
     */
    constructor(id = "", mesh = null, entityObject = {}) {
        super(id, mesh, entityObject);
        if (!this.hasMesh()) {
            return null;
        }

        this.gravity = -Game.scene.gravity.y;
        this.minSlopeLimit = BABYLON.Tools.ToRadians(30);
        this.maxSlopeLimit = BABYLON.Tools.ToRadians(50);
        this.stepOffset = 0.25;
        this.vMoveTot = 0;
        this.vMovStartPos = BABYLON.Vector3.Zero();
        this.walkSpeed = 0.68 * this.collisionMesh.scaling.z;
        this.runSpeed = 3.2 * this.collisionMesh.scaling.z;
        this.sprintSpeed = this.runSpeed * 2;
        this.jumpSpeed = this.collisionMesh.scaling.y * 4;
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
        if (!(this.collisionMesh instanceof BABYLON.Mesh)) {
            return this;
        }
        if (this.locked) {
            return this;
        }
        if (this.getParent() != undefined) {
            this.removeParent();
        }
        if (this.key.jump && !this.falling) {
            this.avStartPos.copyFrom(this.collisionMesh.position);
            this.grounded = false;
            this.idleFallTime = 0;
            this.doJump();
        }
        else if (this.anyMovement() || this.falling) {
            this.avStartPos.copyFrom(this.collisionMesh.position);
            this.grounded = false;
            this.idleFallTime = 0;
            this.doMove();
            Game.transformsWorkerPostMessage(
                "updateEntity",
                0,
                [this.id, new Date().getTime(), this.getPosition().toOtherArray(), this.getRotation().toOtherArray()]
            );
        }
        else if (!this.falling) {
            this.avStartPos.copyFrom(this.collisionMesh.position);
            this.doIdle();
        }
        this.updateAnimation();
        return this;
    }
    doJump(power = 1.0) {
        let dt = Game.engine.getDeltaTime() / 1000;
        if (this.jumpTime === 0) {
            this.jumpStartPosY = this.collisionMesh.position.y;
        }
        let js = this.jumpSpeed - this.gravity * this.jumpTime;
        let jumpDist = js * dt * power - 0.5 * this.gravity * dt * dt;
        this.jumpTime += dt;
        let forwardDist = 0;
        let disp = BABYLON.Vector3.Zero();
        if (this == Game.player.getController() && Game.enableCameraAvatarRotation) {
            this.collisionMesh.rotation.y = -4.69 - Game.camera.alpha;
        }
        if (this.sprinting || this.running || this.walking) {
            if (this.running) {
                forwardDist = this.runSpeed * dt;
            }
            else if (this.walking) {
                forwardDist = this.walkSpeed * dt;
            }
            else if (this.sprinting) {
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
        }
        this.collisionMesh.moveWithCollisions(disp);
        if (jumpDist < 0) {
            if ((this.collisionMesh.position.y > this.avStartPos.y) || ((this.collisionMesh.position.y === this.avStartPos.y) && (disp.length() > 0.001))) {
                this.endJump();
            }
            else if (this.collisionMesh.position.y < this.jumpStartPosY) {
                let actDisp = this.collisionMesh.position.subtract(this.avStartPos);
                if (!(Tools.areVectorsEqual(actDisp, disp, 0.001))) {
                    if (Tools.verticalSlope(actDisp) <= this.minSlopeLimit) {
                        this.endJump();
                    }
                }
            }
        }
        return 0;
    }
    endJump() {
        this.key.jump = false;
        this.jumpTime = 0;
        this.walking = false;
        this.running = false;
        this.sprinting = false;
    }
    doMove() {
        let dt = Game.engine.getDeltaTime() / 1000;
        let u = this.movFallTime * this.gravity;
        this.freeFallDist = u * dt + this.gravity * dt * dt / 2;
        this.movFallTime = this.movFallTime + dt;
        let moving = false;
        let direction = 0;
        if (this.falling) {
            this.moveVector.y = -this.freeFallDist;
            moving = true;
        }
        else {
            this.moveVector.set(0,0,0);
            let dist = 0;
            if (this.standing) {
                if (this.key.shift) {
                    dist = this.sprintSpeed * dt;
                    this.walking = false;
                    this.running = false;
                    this.sprinting = true;
                    moving = true;
                }
                else {
                    dist = this.runSpeed * dt;
                    this.walking = false;
                    this.running = true;
                    this.sprinting = false;
                    moving = true;
                }
            }
            else if (this.crouching) {
                dist = this.crouchSpeed * dt;
                this.walking = true;
                this.running = false;
                this.sprinting = false;
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
            this.moveVector = this.collisionMesh.calcMovePOV(0, -this.freeFallDist, dist);
        }
        this.collisionMesh.rotation.y = direction + (-Math.atan2((this.collisionMesh.position.z - Game.camera.position.z), (this.collisionMesh.position.x - Game.camera.position.x)) - BABYLON.Tools.ToRadians(90));
        
        if (moving) {
            if (this.moveVector.length() > 0.001) {
                this.collisionMesh.moveWithCollisions(this.moveVector);
                if (this.collisionMesh.position.y > this.avStartPos.y) {
                    var actDisp = this.collisionMesh.position.subtract(this.avStartPos);
                    var _sl = Tools.verticalSlope(actDisp);
                    if (_sl >= this.maxSlopeLimit) {
                        if (this.stepOffset > 0) {
                            if (this.vMoveTot == 0) {
                                this.vMovStartPos.copyFrom(this.avStartPos);
                            }
                            this.vMoveTot = this.vMoveTot + (this.collisionMesh.position.y - this.avStartPos.y);
                            if (this.vMoveTot > this.stepOffset) {
                                this.vMoveTot = 0;
                                this.collisionMesh.position.copyFrom(this.vMovStartPos);
                                this.endFreeFall();
                            }
                        }
                        else {
                            this.collisionMesh.position.copyFrom(this.avStartPos);
                            this.endFreeFall();
                        }
                    }
                    else {
                        this.vMoveTot = 0;
                        if (_sl > this.minSlopeLimit) {
                            this.fallFrameCount = 0;
                            this.falling = false;
                        }
                        else {
                            this.endFreeFall();
                        }
                    }
                }
                else if ((this.collisionMesh.position.y) < this.avStartPos.y) {
                    var actDisp = this.collisionMesh.position.subtract(this.avStartPos);
                    if (!(Tools.areVectorsEqual(actDisp, this.moveVector, 0.001))) {
                        if (Tools.verticalSlope(actDisp) <= this.minSlopeLimit) {
                            this.endFreeFall();
                        }
                        else {
                            this.fallFrameCount = 0;
                            this.falling = false;
                        }
                    }
                    else {
                        this.falling = true;
                        this.fallFrameCount++;
                    }
                }
                else {
                    this.endFreeFall();
                }
            }
        }
        /*if (moving && this.moveVector.length() > 0.001) {
            // Start Mitigate jittering in Y direction
            if (Game.useControllerGroundRay) {
                this.updateGroundRay();
                let hit = Game.scene.pickWithRay(this.groundRay, function(mesh) {
                    if (mesh.isPickable && mesh.checkCollisions) {
                        return true;
                    }
                    return false;
                });
                if (hit.hit) {
                    if (Tools.arePointsEqual(this.collisionMesh.position.y + this.moveVector.y, hit.pickedMesh.position.y+0.06125, 0.0125)) {
                        this.moveVector.y = 0;
                    }
                }
            }
            // End Mitigate jittering in Y direction
            this.collisionMesh.moveWithCollisions(this.moveVector);
            if (this.collisionMesh.position.y > this.avStartPos.y) {
                let actDisp = this.collisionMesh.position.subtract(this.avStartPos);
                let slope = Tools.verticalSlope(actDisp);
                if (slope >= this.maxSlopeLimit) {
                    if (this.stepOffset > 0) {
                        if (this.vMoveTot == 0) {
                            this.vMovStartPos.copyFrom(this.avStartPos);
                        }
                        this.vMoveTot = this.vMoveTot + (this.collisionMesh.position.y - this.avStartPos.y);
                        if (this.vMoveTot > this.stepOffset) {
                            this.vMoveTot = 0;
                            this.collisionMesh.position.copyFrom(this.vMovStartPos);
                            this.endFreeFall();
                        }
                    }
                    else {
                        this.collisionMesh.position.copyFrom(this.avStartPos);
                        this.endFreeFall();
                    }
                }
                else {
                    this.vMoveTot = 0;
                    if (slope > this.minSlopeLimit) {
                        this.fallFrameCount = 0;
                        this.falling = false;
                    }
                    else {
                        this.endFreeFall();
                    }
                }
            }
            else if ((this.collisionMesh.position.y) < this.avStartPos.y) {
                let actDisp = this.collisionMesh.position.subtract(this.avStartPos);
                if (!(Tools.areVectorsEqual(actDisp, this.moveVector, 0.001))) {
                    if (Tools.verticalSlope(actDisp) <= this.minSlopeLimit) {
                        this.endFreeFall();
                    }
                    else {
                        this.fallFrameCount = 0;
                        this.falling = false;
                    }
                }
                else {
                    this.falling = true;
                    this.fallFrameCount++;
                }
            }
            else {
                this.endFreeFall();
            }
        }*/
        return 0;
    }
    endFreeFall() {
        this.movFallTime = 0;
        this.fallFrameCount = 0;
        this.falling = false;
    }
    doIdle() {
        if (this.grounded) {
            return this.idle;
        }
        let dt = Game.engine.getDeltaTime() / 1000;
        this.walking = false;
        this.running = false;
        this.sprinting = false;
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
            return 0;
        }
        let disp = new BABYLON.Vector3(0, -this.freeFallDist, 0);
        this.collisionMesh.moveWithCollisions(disp);
        if ((this.collisionMesh.position.y > this.avStartPos.y) || (this.collisionMesh.position.y === this.avStartPos.y)) {
            this.groundIt();
        }
        else if (this.collisionMesh.position.y < this.avStartPos.y) {
            let actDisp = this.collisionMesh.position.subtract(this.avStartPos);
            if (!(Tools.areVectorsEqual(actDisp, disp, 0.001))) {
                if (Tools.verticalSlope(actDisp) <= this.minSlopeLimit) {
                    this.groundIt();
                    this.collisionMesh.position.copyFrom(this.avStartPos);
                }
                else {
                    this.unGroundIt();
                }
            }
        }
        return 0;
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

    updateID(newID) {
        super.updateID(newID);
        return 0;
    }
    dispose() {
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "CharacterControllerTransform";
    }
}