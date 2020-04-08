class CharacterControllerRigidBody extends CharacterController {
    constructor(id, mesh, entity) {
        super(id, mesh, entity);
        this.turnSpeed = Game.RAD_90; // degrees per second
        this.moving = false;
        this.turning = false;
        this.startPosition = this.mesh.position.clone();
        this.intendedDirection = 0.0;
        this.intendedMovement = new BABYLON.Vector3();
        this.runSpeed = 3.2 * this.mesh.scaling.z; // if it's a fox mesh
        this.lookAtCtl = new BABYLON.BoneLookController(
            this.mesh,
            this.getBoneByName("head"),
            this.targetRay.direction.add(this.targetRay.origin),
            {
                slerpAmount:0.05,
                minPitch:BABYLON.Tools.ToRadians(-45),
                maxPitch:BABYLON.Tools.ToRadians(45),
                minYaw:BABYLON.Tools.ToRadians(-45),
                maxYaw:BABYLON.Tools.ToRadians(45),
            }
        );

        this.fallTime = 0;
        this.minSlopeLimit = BABYLON.Tools.ToRadians(30);
        this.maxSlopeLimit = BABYLON.Tools.ToRadians(50);
        this.stepOffset = 0.25;
        this.yDifference = 0;
        this.yDifferencePosition = new BABYLON.Vector3.Zero();
        this.fallFrameCount = 0;
        this.fallDistance = 0;
    }

    moveAV() {
        if (!(this.mesh instanceof BABYLON.Mesh)) {
            return this;
        }
        if (this._isLocked) {
            return this;
        }
        if (this.standing) {
            this.idle = this.standIdle;
        }
        else if (this.crouching) {
        }
        else if (this.sitting) {
            this.idle = this.sitIdle;
        }
        else if (this.lying) {
            this.idle = this.lieIdle;
        }
        else {
            this.idle = this.standIdle;
        }
        this.updateTargetRayOrigin();
        let anim = this.idle;
        if (this.anyMovement() || this.falling) {
            this.startPosition.copyFrom(this.mesh.position);
            anim = this.doMove();
        }
        if (Game.player != this.entity && this.entity.target == null) {
            this.targetRay.direction.y = 0; // up-down
            this.targetRay.direction.z = -this.mesh.forward.z;
        }
        this.lookAtCtl.target = this.targetRay.origin.add(this.targetRay.direction);
        this.lookAtCtl.update();
        this.beginAnimation(anim);
        if (Game.player == this.entity) {
            Game.updateCameraTarget();
        }
        Game.entityLocRotWorker.postMessage({
            cmd:"setLocRot",
            msg:[
                this.entity.getID(),
                this.mesh.position.asArray(),
                this.mesh.rotation.asArray()
            ]
        });
        return this;
    }
    doMove() {
        console.log(`CharacterControllerRigidBody:${this.id}.doMove()`)
        let anim = this.standIdle;
        let dt = Game.engine.getDeltaTime() / 1000;
        let u = this.fallTime * -Game.scene.gravity.y;
        this.mesh.setParent(null);
        this.fallDistance = u * dt + -Game.scene.gravity.y * dt * dt / 2;
        this.fallTime = this.fallTime + dt;
        if (this.falling) {
            this.intendedMovement.y = -this.fallDistance;
            this.moving = true;
            anim = this.fall;
        }
        else if (this.anyMovement()) {
            if (this.key.forward) {
                if (this.key.strafeRight) {
                    this.intendedDirection = this.getAlpha() + Game.RAD_45;
                }
                else if (this.key.strafeLeft) {
                    this.intendedDirection = this.getAlpha() - Game.RAD_45;
                }
                else {
                    this.intendedDirection = this.getAlpha();
                }
                this.moving = true;
            }
            else if (this.key.backward) {
                if (this.key.strafeRight) {
                    this.intendedDirection = this.getAlpha() + Game.RAD_135;
                }
                else if (this.key.strafeLeft) {
                    this.intendedDirection = this.getAlpha() + Game.RAD_225;
                }
                else {
                    this.intendedDirection = this.getAlpha() + Game.RAD_180;
                }
                this.moving = true;
            }
            else if (this.key.strafeRight) {
                this.intendedDirection = this.getAlpha() + Game.RAD_90;
                this.moving = true;
            }
            else if (this.key.strafeLeft) {
                this.intendedDirection = this.getAlpha() - Game.RAD_90;
                this.moving = true;
            }
            else {
                this.moving = false;
            }
        }
        if (this.moving) {
            this.sitting = false;
            this.lying = false;
            if (!this.crouching) {
                this.standing = true;
            }
            if (this.key.shift) {
                if (!this.standing) { // TODO: stall until transition from crouching/lying/sitting complete
                    return this.doStand();
                }
                this.walking = false;
                this.running = true;
            }
            else {
                this.running = false;
            }
            /*
            lying + walking = crawling
            crouching + walking = spycrabing
            standing + walking = walking
            standing + running = running
            */
            if (Math.abs(this.intendedDirection - this.mesh.rotation.y) > BABYLON.Tools.ToRadians(0.5)) {
                /*
                Anon_11487
                */
                let difference = this.intendedDirection - this.mesh.rotation.y;
                if (Math.abs(difference) > BABYLON.Tools.ToRadians(180)) {
                    difference -= Math.sign(difference) * BABYLON.Tools.ToRadians(360);
                }
                this.mesh.rotation.y += difference * (this.turnSpeed / Game.scene.getEngine().getDeltaTime()) + BABYLON.Tools.ToRadians(180);
                this.mesh.rotation.y %= BABYLON.Tools.ToRadians(360);
                this.mesh.rotation.y -= BABYLON.Tools.ToRadians(180);
            }
            else {
                this.mesh.rotation.y = this.intendedDirection;
            }
            this.intendedMovement.copyFrom(this.mesh.calcMovePOV(0, -this.fallDistance, this.runSpeed * Game.scene.getEngine().getDeltaTime() / 1000));
            this.mesh.moveWithCollisions(this.intendedMovement);
            if (this.mesh.position.y > this.startPosition.y) {
                let actDisp = this.mesh.position.subtract(this.startPosition);
                let slope = Game.Tools.verticalSlope(actDisp);
                if (slope >= this.maxSlopeLimit) {
                    if (this.yDifference == 0) {
                        this.yDifferencePosition.copyFrom(this.startPosition);
                    }
                    this.yDifference = this.yDifference + (this.mesh.position.y - this.startPosition.y);
                }
                else {
                    this.yDifference = 0;
                    if (slope > this.minSlopeLimit) {
                        this.fallFrameCount = 0;
                        this.falling = false;
                    }
                    else {
                        this.endFreeFall();
                    }
                }
            }
            else if ((this.mesh.position.y) < this.startPosition.y) {
                let actDisp = this.mesh.position.subtract(this.startPosition);
                if (!(Game.Tools.areVectorsEqual(actDisp, this.intendedMovement, 0.001))) {
                    if (Game.Tools.verticalSlope(actDisp) <= this.minSlopeLimit) {
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
                    if (this.fallFrameCount > this.fallFrameCountMin) {
                        anim = this.fall;
                    }
                }
            }
            else {
                this.endFreeFall();
            }
            if (!Game.Tools.areVectorsEqual(this.mesh.position, this.startPosition, 0.001)) {
                anim = this.run;
            }
            this.moving = false;
        }
        return anim;
    }
    endFreeFall() {
        this.fallTime = 0;
        this.fallFrameCount = 0;
        this.falling = false;
        return 0;
    }
    getAlpha() {
        if (this == Game.playerController) {
            return Game.Tools.moduloRadians(Game.RAD_90 - Game.camera.alpha); // Anon_11487
        }
        else {
            return Game.RAD_90;
        }
    }
    getBeta() {
        if (this == Game.playerController) {
            return Game.Tools.moduloRadians(Game.camera.beta - Game.RAD_90);
        }
        else {
            return Game.RAD_270;
        }
    }

    dispose() {
        super.dispose();
        return undefined;
    }
}