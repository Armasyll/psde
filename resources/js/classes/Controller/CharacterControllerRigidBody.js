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

        this.turnSpeed = Tools.RAD_90;
        this.moving = false;
        this.startPosition = this.collisionMesh.position.clone();
        this.intendedDirection = 0.0;
        this.intendedMovement = new BABYLON.Vector3();
        this.walkSpeed = 1.0;
        this.ambleSpeed = this.walkSpeed * 0.5;
        this.runSpeed = this.walkSpeed * 2;

        this.fallTime = 0;
        this.minSlopeLimit = BABYLON.Tools.ToRadians(30);
        this.maxSlopeLimit = BABYLON.Tools.ToRadians(50);
        this.stepOffset = 0.25;
        this.yDifference = 0;
        this.yDifferencePosition = new BABYLON.Vector3.Zero();
        this.fallFrameCount = 0;
        this.fallDistance = 0;
        this.iRotationThreshold = BABYLON.Tools.ToRadians(0.5);
        this.iGroundDetectionTolerance = 0.0195;
        this.iMovementComparisonTolerance = 0.0125;
        this.iFallFrameCountMax = 60;
        this.bHasRunPostConstructCharacterRigid = false;
        this.bHasRunAssignCharacterRigidBody = false;
        this.postConstruct();
    }
    postConstruct() {
        if (this.bHasRunPostConstructCharacterRigid) {
            return 0;
        }
        this.bHasRunPostConstructCharacterRigid = true;
        super.postConstruct();
        // TODO: match speeds with mesh' species
        this.ambleSpeed = 0.05 * this.getScaling().z;
        this.walkSpeed = 0.4 * this.getScaling().z;
        this.runSpeed = 1.3 * this.getScaling().z;
        return 0;
    }

    setMovementSpeed(iSpeed) {
        this.walkSpeed = iSpeed;
        this.ambleSpeed = this.walkSpeed * 0.5;
        this.runSpeed = this.walkSpeed * 2;
        return 0;
    }
    setAnimationSpeed(iSpeed) {
        return 0;
    }
    moveAV() {
        if (this._locked) {
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
        if (this._locked) {
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
        const deltaTimeSeconds = Game.engine.getDeltaTime() / 1000;
        const u = this.fallTime * -Game.scene.gravity.y;
        this.fallDistance = u * deltaTimeSeconds + -Game.scene.gravity.y * deltaTimeSeconds * deltaTimeSeconds / 2;
        this.fallTime = this.fallTime + deltaTimeSeconds;

        this.updatePlayerIntendedMovement();

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
                    this.groundedState = GroundedStateEnum.GROUND;
                }
                else {
                    this.endFreeFall();
                }
            }
        }
        else if (this.collisionMesh.position.y < this.startPosition.y) {
            let actDisp = this.collisionMesh.position.subtract(this.startPosition);
            if (!(Tools.arePointsEqual(actDisp.y, this.intendedMovement.y, this.iMovementComparisonTolerance))) {
                if (Tools.verticalSlope(actDisp) <= this.minSlopeLimit) {
                    this.endFreeFall();
                }
                else {
                    this.fallFrameCount = 0;
                    this.groundedState = GroundedStateEnum.GROUND;
                }
            }
            else {
                this.fallFrameCount++;
                if (this.fallFrameCount > this.iFallFrameCountMax) {
                    this.groundedState = GroundedStateEnum.FALL;
                }
            }
        }
        else {
            this.endFreeFall();
        }
        if (EntityController.debugMode && EntityController.debugVerbosity > 3) console.groupEnd();
        return 0;
    }
    updatePlayerIntendedMovement() {
        if (this.groundedState == GroundedStateEnum.FALL) {
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
            this.alpha = this.getAlpha();
            this.beta = this.getBeta();
            if (this.key.forward) {
                if (this.key.strafeRight) {
                    this.intendedDirection = this.alpha + Tools.RAD_45;
                }
                else if (this.key.strafeLeft) {
                    this.intendedDirection = this.alpha - Tools.RAD_45;
                }
                else {
                    this.intendedDirection = this.alpha;
                }
                this.moving = true;
            }
            else if (this.key.backward) {
                if (this.key.strafeRight) {
                    this.intendedDirection = this.alpha + Tools.RAD_135;
                }
                else if (this.key.strafeLeft) {
                    this.intendedDirection = this.alpha + Tools.RAD_225;
                }
                else {
                    this.intendedDirection = this.alpha + Tools.RAD_180;
                }
                this.moving = true;
            }
            else if (this.key.strafeRight) {
                this.intendedDirection = this.alpha + Tools.RAD_90;
                this.moving = true;
            }
            else if (this.key.strafeLeft) {
                this.intendedDirection = this.alpha - Tools.RAD_90;
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
            let rotationDifference = this.intendedDirection - this.collisionMesh.rotation.y;
            if (Math.abs(rotationDifference) > this.iRotationThreshold) {
                /*
                Anon_11487
                */
                if (Math.abs(rotationDifference) > Tools.RAD_180) {
                    rotationDifference -= Math.sign(rotationDifference) * Tools.RAD_360;
                }
                this.collisionMesh.rotation.y += rotationDifference * (this.turnSpeed / Game.engine.getDeltaTime());
                this.collisionMesh.rotation.y %= Tools.RAD_360;
            }
            else {
                this.collisionMesh.rotation.y = this.intendedDirection;
            }
            this.collisionMesh.rotation.y = Tools.moduloRadians(this.collisionMesh.rotation.y);
            if (this.movementPace == MovementPaceEnum.WALK) {
                this.intendedMovement.copyFrom(this.collisionMesh.calcMovePOV(0, -this.fallDistance, this.walkSpeed * (Game.engine.getDeltaTime() / 1000)));
            }
            else if (this.movementPace == MovementPaceEnum.RUN) {
                this.intendedMovement.copyFrom(this.collisionMesh.calcMovePOV(0, -this.fallDistance, this.runSpeed * (Game.engine.getDeltaTime() / 1000)));
            }
            else if (this.movementPace == MovementPaceEnum.AMBLE) {
                this.intendedMovement.copyFrom(this.collisionMesh.calcMovePOV(0, -this.fallDistance, this.ambleSpeed * (Game.engine.getDeltaTime() / 1000)));
            }
        }
                
        if (Game.bUseControllerGroundRay) {
            this._fixYJitter();
        }
        
        return 0;
    }
    /**
     * Fix jittering in Y direction
     * @returns {number} 0
     */
    _fixYJitter() {
        this.updateGroundRay();
        let hit = Game.scene.pickWithRay(this.groundRay, (mesh) => {
            if (mesh.isPickable && mesh.checkCollisions && mesh.controller != this) {
                return true;
            }
            return false;
        });
        if (hit.hit) {
            if (Tools.arePointsEqual(this.collisionMesh.position.y + this.intendedMovement.y, hit.pickedMesh.position.y, this.iGroundDetectionTolerance)) {
                this.intendedMovement.y = 0;
            }
        }
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

    update(objectBlob) {
        super.update(objectBlob);
        this.bHasRunAssignCharacterRigidBody = false;
        return 0;
    }
    assign(objectBlob) {
        if (!(objectBlob instanceof Object)) {
            return 1;
        }
        super.assign(objectBlob);
        if (this.bHasRunAssignCharacter == true) {
            return 0;
        }
        this.bHasRunAssignCharacter = true;
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