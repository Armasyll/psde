/**
 * Character Controller for Rigid Bodies
 * @class
 * @extends {CharacterController}
 * @typedef {Object} CharacterControllerRigidBody
 */
class CharacterControllerRigidBody extends CharacterController {
    /**
     * Creates a Character Controller with a Rigid Body
     * @param {string} id 
     * @param {BABYLON.AbstractMesh} aMeshes 
     * @param {object} entityObject 
     */
    constructor(id = "", aMeshes = [], entityObject = {}) {
        if (!(super(id, aMeshes, entityObject) instanceof CharacterController)) {
            return undefined;
        }

        this.turnSpeed = Tools.RAD_90; // degrees per second
        this.moving = false;
        this.startPosition = this.collisionMesh.position.clone();
        this.intendedDirection = 0.0;
        this.intendedMovement = new BABYLON.Vector3();
        this.amblespeed = 0.5;
        this.walkSpeed = 1.0;
        this.runSpeed = 2.0;

        this.fallTime = 0;
        this.minSlopeLimit = BABYLON.Tools.ToRadians(30);
        this.maxSlopeLimit = BABYLON.Tools.ToRadians(50);
        this.stepOffset = 0.25;
        this.yDifference = 0;
        this.yDifferencePosition = new BABYLON.Vector3.Zero();
        this.fallFrameCount = 0;
        this.fallDistance = 0;
        this.bHasRunPostConstructCharacterRigid = false;
        this.postConstruct();
    }
    postConstruct() {
        if (this.bHasRunPostConstructCharacterRigid) {
            return 0;
        }
        super.postConstruct();
        this.bHasRunPostConstructCharacterRigid = true;
        // TODO: match speeds with mesh' species
        this.amblespeed = 0.05 * this.getScaling().z;
        this.walkSpeed = 0.4 * this.getScaling().z;
        this.runSpeed = 1.3 * this.getScaling().z;
        return 0;
    }

    moveAV() {
        if (this.locked) {
            return 0;
        }
        if (this.anyMovement() || this.groundedState == GroundedStateEnum.FALL) {
            this.doMove();
        }
        return 0;
    }
    preMoveAV() {
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
        //this.updateTargetRay();
        this.moving = false;
        if (this.anyMovement() || this.groundedState == GroundedStateEnum.FALL) {
            this.doMove();
        }
        else {
            this.setMovementPace(MovementPaceEnum.NONE);
        }
        this.updateAnimation();
        if (this.hasTargetRay() && this != Game.playerController) {
            this.targetRay.direction.y = 0; // up-down
            this.targetRay.direction.z = -this.collisionMesh.forward.z;
        }
        if (this.propertiesChanged) {
            this.updateProperties();
        }
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
        if (EntityController.debugMode && EntityController.debugVerbosity > 3) console.group(`${this.id}.doMove()`);
        this.startPosition.copyFrom(this.collisionMesh.position);
        let dt = Game.engine.getDeltaTime() / 1000;
        let u = this.fallTime * -Game.scene.gravity.y;
        this.fallDistance = u * dt + -Game.scene.gravity.y * dt * dt / 2;
        this.fallTime = this.fallTime + dt;
        if (this.groundedState == GroundedStateEnum.FALL) {
            this.intendedMovement.y = -this.fallDistance;
            this.moving = true;
            if (EntityController.debugMode && EntityController.debugVerbosity > 3) {
                console.info("not trying to move, falling")
            }
        }
        if (this.anyMovement()) {
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
            if (this.key.shift) {
                this.setMovementPace(MovementPaceEnum.RUN);
            }
            else {
                this.setMovementPace(MovementPaceEnum.WALK);
            }
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
            if (this.movementPace == MovementPaceEnum.RUN) {
                this.intendedMovement.copyFrom(this.collisionMesh.calcMovePOV(0, -this.fallDistance, this.runSpeed * dt));
            }
            else if (this.movementPace == MovementPaceEnum.AMBLE) {
                this.intendedMovement.copyFrom(this.collisionMesh.calcMovePOV(0, -this.fallDistance, this.ambleSpeed * dt));
            }
            else {
                this.intendedMovement.copyFrom(this.collisionMesh.calcMovePOV(0, -this.fallDistance, this.walkSpeed * dt));
            }
            if (this.intendedMovement.length() > 0.001) {
                this.collisionMesh.moveWithCollisions(this.intendedMovement);
                if (this.collisionMesh.position.y > this.startPosition.y) {
                    let actDisp = this.collisionMesh.position.subtract(this.startPosition);
                    let slope = Tools.verticalSlope(actDisp);
                    if (slope >= this.maxSlopeLimit) {
                        if (this.stepOffset > 0) {
                            if (this.yDifference == 0) {
                                this.startPosition.copyFrom(this.startPosition);
                            }
                            this.yDifference = this.yDifference + (this.collisionMesh.position.y - this.startPosition.y);
                            if (this.yDifference > this.stepOffset) {
                                this.yDifference = 0;
                                this.collisionMesh.position.copyFrom(this.startPosition);
                                this.endFreeFall();
                            }
                        }
                        else {
                            this.collisionMesh.position.copyFrom(this.startPosition);
                            this.endFreeFall();
                        }
                    }
                    else {
                        this.yDifference = 0;
                        if (slope > this.minSlopeLimit) {
                            this.fallFrameCount = 0;
                            this.groundedState = GroundedStateEnum.GROUND;
                        }
                        else {
                            this.endFreeFall();
                        }
                    }
                }
                else if (this.collisionMesh.position.y < this.startPosition.y) {
                    let actDisp = this.collisionMesh.position.subtract(this.startPosition);
                    if (!(Tools.arePointsEqual(actDisp, this.intendedMovement, 0.001))) {
                        if (Tools.verticalSlope(actDisp) <= this.minSlopeLimit) {
                            this.endFreeFall();
                        }
                        else {
                            this.fallFrameCount = 0;
                            this.groundedState = GroundedStateEnum.GROUND;
                        }
                    }
                    else {
                        this.groundedState = GroundedStateEnum.FALL;
                        this.fallFrameCount++;
                    }
                }
                else {
                    this.endFreeFall();
                }
            }
        }
        if (EntityController.debugMode && EntityController.debugVerbosity > 3) console.groupEnd();
        return 0;
    }
    endFreeFall() {
        this.fallTime = 0;
        this.fallFrameCount = 0;
        this.setGroundedState(GroundedStateEnum.GROUND);
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

    assign(objectBlob) {
        super.assign(objectBlob);
        return 0;
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