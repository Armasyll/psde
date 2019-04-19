/**
 * Heavily referenced, borderline copied, Ssatguru's BabylonJS-CharacterController https://github.com/ssatguru/BabylonJS-CharacterController
 * It's great :v you should check it out.
 */
class CharacterControllerV2 extends CharacterController {
    constructor(_id, _mesh, _entity) {
        super (_id, _mesh, _entity);
        if (!this.hasMesh()) {
            return;
        }
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
    doMove(dt) {
        var u = this._movFallTime * this._gravity;
        this._fallDist = u * dt + this._gravity * dt * dt / 2;
        this._movFallTime = this._movFallTime + dt;
        var moving = false;
        var anim = null;
        if (this.isFalling) {
            this._moveVector.y = -this._fallDist;
            moving = true;
        }
        else {
            this._moveVector.set(0,0,0);
            this.isWalking = false;
            this.isRunning = false;
            this.isSprinting = false;
            var dist = 0;
            var atan = -Math.atan2((this.mesh.position.z - Game.camera.position.z), (this.mesh.position.x - Game.camera.position.x)) - BABYLON.Tools.ToRadians(90);
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
    dispose() {
        if (this == Game.player.getController()) {
            return false;
        }
        super.dispose();
        return undefined;
    }
}