/**
 * Character Controller for Rigid Bodies
 */
class CharacterControllerRigidBody extends CharacterController {
    /**
     * Creates a Character Controller with a Rigid Body
     * @param {string} id 
     * @param {BABYLON.AbstractMesh} mesh 
     * @param {object} entityObject 
     */
    constructor(id = "", mesh = null, entityObject = {}) {
        super(id, mesh, entityObject);
        if (!this.hasMesh()) {
            return null;
        }

        this.turnSpeed = Tools.RAD_90; // degrees per second
        this.moving = false;
        this.turning = false;
        this.startPosition = this.collisionMesh.position.clone();
        this.intendedDirection = 0.0;
        this.intendedMovement = new BABYLON.Vector3();
        this.crawlspeed = 1.0 * this.getScaling().z;
        this.walkSpeed = 1.4 * this.getScaling().z;
        this.runSpeed = 3.2 * this.getScaling().z; // if it's a fox mesh
        this.lookController = this.createLookController();

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
        if (EntityController.debugMode && EntityController.debugVerbosity > 3) console.group(`<CharacterControllerRigidBody>${this.id}.moveAV()`)
        if (!(this.collisionMesh instanceof BABYLON.Mesh)) {
            if (EntityController.debugMode) {
                console.error("missing mesh");
                console.groupEnd();
            }
            return 2;
        }
        if (this.locked) {
            if (EntityController.debugMode && EntityController.debugVerbosity > 3) {
                console.info("locked");
                console.groupEnd();
            }
            return 0;
        }
        this.updateTargetRay();
        this.moving = false;
        if (this.anyMovement() || this.falling) {
            this.startPosition.copyFrom(this.collisionMesh.position);
            this.doMove();
        }
        if (this.targetRay != null) {
            if (Game.playerController != this && this.targetController == null) {
                this.targetRay.direction.y = 0; // up-down
                this.targetRay.direction.z = -this.collisionMesh.forward.z;
            }
        }
        if (this.hasLookController()) {
            this.lookController.update();
        }
        this.updateAnimation();
        if (this.moving) {
            Game.transformsWorkerPostMessage(
                "updateEntity",
                0,
                [this.id, new Date().getTime(), this.getPosition().toOtherArray(), this.getRotation().toOtherArray()]
            );
        }
        if (EntityController.debugMode && EntityController.debugVerbosity > 3) {
            console.groupEnd();
        }
        return 0;
    }
    doMove() {
        if (EntityController.debugMode && EntityController.debugVerbosity > 3) console.group(`${this.id}.doMove()`)
        let dt = Game.engine.getDeltaTime() / 1000;
        let u = this.fallTime * -Game.scene.gravity.y;
        this.collisionMesh.setParent(null);
        this.fallDistance = u * dt + -Game.scene.gravity.y * dt * dt / 2;
        this.fallTime = this.fallTime + dt;
        if (this.falling) {
            this.intendedMovement.y = -this.fallDistance;
            this.moving = true;
            if (EntityController.debugMode && EntityController.debugVerbosity > 3) {
                console.info("not trying to move, falling")
            }
        }
        else if (this.anyMovement()) {
            if (EntityController.debugMode && EntityController.debugVerbosity > 3) {
                console.info("not falling, trying to move")
            }
            if (this.key.forward) {
                if (this.key.strafeRight) {
                    this.intendedDirection = this.getAlpha() + Tools.RAD_45;
                }
                else if (this.key.strafeLeft) {
                    this.intendedDirection = this.getAlpha() - Tools.RAD_45;
                }
                else {
                    this.intendedDirection = this.getAlpha();
                }
                this.moving = true;
            }
            else if (this.key.backward) {
                if (this.key.strafeRight) {
                    this.intendedDirection = this.getAlpha() + Tools.RAD_135;
                }
                else if (this.key.strafeLeft) {
                    this.intendedDirection = this.getAlpha() + Tools.RAD_225;
                }
                else {
                    this.intendedDirection = this.getAlpha() + Tools.RAD_180;
                }
                this.moving = true;
            }
            else if (this.key.strafeRight) {
                this.intendedDirection = this.getAlpha() + Tools.RAD_90;
                this.moving = true;
            }
            else if (this.key.strafeLeft) {
                this.intendedDirection = this.getAlpha() - Tools.RAD_90;
                this.moving = true;
            }
            else {
                this.moving = false;
            }
        }
        if (this.moving) {
            if (EntityController.debugMode && EntityController.debugVerbosity > 3) {
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
            if (Math.abs(this.intendedDirection - this.collisionMesh.rotation.y) > BABYLON.Tools.ToRadians(0.5)) {
                /*
                Anon_11487
                */
                let difference = this.intendedDirection - this.collisionMesh.rotation.y;
                if (Math.abs(difference) > BABYLON.Tools.ToRadians(180)) {
                    difference -= Math.sign(difference) * BABYLON.Tools.ToRadians(360);
                }
                this.collisionMesh.rotation.y += difference * (this.turnSpeed / Game.scene.getEngine().getDeltaTime()) + BABYLON.Tools.ToRadians(180);
                this.collisionMesh.rotation.y %= BABYLON.Tools.ToRadians(360);
                this.collisionMesh.rotation.y -= BABYLON.Tools.ToRadians(180);
            }
            else {
                this.collisionMesh.rotation.y = this.intendedDirection;
            }
            this.collisionMesh.rotation.y = Tools.moduloRadians(this.collisionMesh.rotation.y);
            if (this.walking) {
                this.intendedMovement.copyFrom(this.collisionMesh.calcMovePOV(0, -this.fallDistance, this.walkSpeed * Game.scene.getEngine().getDeltaTime() / 1000));
            }
            else if (this.running) {
                this.intendedMovement.copyFrom(this.collisionMesh.calcMovePOV(0, -this.fallDistance, this.runSpeed * Game.scene.getEngine().getDeltaTime() / 1000));
            }
            else if (this.crawling) {
                this.intendedMovement.copyFrom(this.collisionMesh.calcMovePOV(0, -this.fallDistance, this.crawlSpeed * Game.scene.getEngine().getDeltaTime() / 1000));
            }
            // Start Mitigate jittering in Y direction
            if (Game.useControllerGroundRay) {
                this.updateGroundRay();
                let hit = Game.scene.pickWithRay(this.groundRay, (mesh) => {
                    if (mesh.isPickable && mesh.checkCollisions && mesh.controller != this) {
                        return true;
                    }
                    return false;
                });
                if (hit.hit) {
                    if (hit.pickedMesh.id == "wall") {
                        console.log(hit.pickedMesh);
                    }
                    if (Tools.arePointsEqual(this.collisionMesh.position.y + this.intendedMovement.y, hit.pickedMesh.position.y, 0.0195)) {
                        this.intendedMovement.y = 0;
                    }
                }
            }
            // End Mitigate jittering in Y direction
            this.collisionMesh.moveWithCollisions(this.intendedMovement);
            if (this.collisionMesh.position.y > this.startPosition.y) {
                let actDisp = this.collisionMesh.position.subtract(this.startPosition);
                let slope = Tools.verticalSlope(actDisp);
                if (slope >= this.maxSlopeLimit) {
                    if (this.yDifference == 0) {
                        this.yDifferencePosition.copyFrom(this.startPosition);
                    }
                    this.yDifference = this.yDifference + (this.collisionMesh.position.y - this.startPosition.y);
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
            else if (this.collisionMesh.position.y < this.startPosition.y) {
                let actDisp = this.collisionMesh.position.subtract(this.startPosition);
                if (!(Tools.arePointsEqual(actDisp.y, this.intendedMovement.y, 0.0125))) {
                    if (Tools.verticalSlope(actDisp) <= this.minSlopeLimit) {
                        this.endFreeFall();
                    }
                    else {
                        this.fallFrameCount = 0;
                        this.falling = false;
                    }
                }
                else {
                    this.fallFrameCount++;
                    if (this.fallFrameCount > 60) {
                        this.falling = true;
                    }
                }
            }
            else {
                this.endFreeFall();
            }
        }
        if (EntityController.debugMode && EntityController.debugVerbosity > 3) console.groupEnd();
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
            return Tools.moduloRadians(Tools.RAD_90 - Game.camera.alpha); // Anon_11487
        }
        else {
            return Tools.RAD_90;
        }
    }
    getBeta() {
        if (this == Game.playerController) {
            return Tools.moduloRadians(Game.camera.beta - Tools.RAD_90);
        }
        else {
            return Tools.RAD_270;
        }
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
        return "CharacterControllerRigidBody";
    }
}