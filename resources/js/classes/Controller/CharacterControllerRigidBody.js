class CharacterControllerRigidBody extends CharacterController {
    constructor(id, mesh, entity) {
        super(id, mesh, entity);
        this.turnSpeed = Game.RAD_90; // degrees per second
        this.moving = false;
        this.turning = false;
        this.startPosition = this.mesh.position.clone();
        this.intendedDirection = 0.0;
        this.intendedMovement = new BABYLON.Vector3();
        this.crawlspeed = 1.0 * this.getScaling().z;
        this.walkSpeed = 1.4 * this.getScaling().z;
        this.runSpeed = 3.2 * this.getScaling().z; // if it's a fox mesh
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
        if (CharacterController.debugMode) console.group(`<CharacterControllerRigidBody>${this.id}.moveAV()`)
        if (!(this.mesh instanceof BABYLON.Mesh)) {
            if (CharacterController.debugMode) {
                console.error("missing mesh")
                console.groupEnd();
            }
            return this;
        }
        if (this.locked) {
            if (CharacterController.debugMode) {
                console.info("locked")
                console.groupEnd();
            }
            return this;
        }
        this.updateTargetRayOrigin();
        this.moving = false;
        if (this.anyMovement() || this.falling) {
            this.startPosition.copyFrom(this.mesh.position);
            this.doMove();
        }
        if (Game.playerController != this && this.targetController == null) {
            this.targetRay.direction.y = 0; // up-down
            this.targetRay.direction.z = -this.mesh.forward.z;
        }
        this.lookAtCtl.target = this.targetRay.origin.add(this.targetRay.direction);
        this.lookAtCtl.update();
        this.updateAnimation();
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
        if (CharacterController.debugMode) {
            console.groupEnd();
        }
        return this;
    }
    doMove() {
        if (CharacterController.debugMode) console.group(`${this.id}.doMove()`)
        let dt = Game.engine.getDeltaTime() / 1000;
        let u = this.fallTime * -Game.scene.gravity.y;
        this.mesh.setParent(null);
        this.fallDistance = u * dt + -Game.scene.gravity.y * dt * dt / 2;
        this.fallTime = this.fallTime + dt;
        if (this.falling) {
            this.intendedMovement.y = -this.fallDistance;
            this.moving = true;
            if (CharacterController.debugMode) {
                console.info("not trying to move, falling")
            }
        }
        else if (this.anyMovement()) {
            if (CharacterController.debugMode) {
                console.info("not falling, trying to move")
            }
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
            if (CharacterController.debugMode) {
                console.info("moving")
            }
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
                this.walking = true;
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
            if (this.walking) {
                this.intendedMovement.copyFrom(this.mesh.calcMovePOV(0, -this.fallDistance, this.walkSpeed * Game.scene.getEngine().getDeltaTime() / 1000));
            }
            else if (this.running) {
                this.intendedMovement.copyFrom(this.mesh.calcMovePOV(0, -this.fallDistance, this.runSpeed * Game.scene.getEngine().getDeltaTime() / 1000));
            }
            else if (this.crawling) {
                this.intendedMovement.copyFrom(this.mesh.calcMovePOV(0, -this.fallDistance, this.crawlSpeed * Game.scene.getEngine().getDeltaTime() / 1000));
            }
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
                    if (Game.Tools.arePointsEqual(this.mesh.position.y + this.intendedMovement.y, hit.pickedMesh.position.y+0.06125, 0.0125)) {
                        this.intendedMovement.y = 0;
                    }
                }
            }
            // End Mitigate jittering in Y direction
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
                }
            }
            else {
                this.endFreeFall();
            }
        }
        if (CharacterController.debugMode) console.groupEnd();
        return 0;
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
    getClassName() {
        return "CharacterControllerRigidBody";
    }
}