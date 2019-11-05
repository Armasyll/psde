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
    }

    moveAV() {
        if (!(this.mesh instanceof BABYLON.Mesh)) {
            return this;
        }
        if (this._isLocked) {
            return this;
        }
        let anim = this.idle;
        if (this.anyMovement() || this.falling) {
            this.startPosition.copyFrom(this.mesh.position);
            anim = this.doMove();
        }
        this.lookAtCtl.target = this.targetRay.origin.add(this.targetRay.direction);
        this.lookAtCtl.update();
        this.beginAnimation(anim);
        if (Game.player == this.entity) {
            Game.updateCameraTarget();
        }
        return this;
    }
    doMove() {
        let anim = this.idle;
        if (this.anyMovement()) {
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
            if (this.moving) {
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
                this.intendedMovement.copyFrom(this.mesh.calcMovePOV(0, -9.8, this.runSpeed * Game.scene.getEngine().getDeltaTime() / 1000));
                this.mesh.moveWithCollisions(this.intendedMovement);
                if (!Game.Tools.areVectorsEqual(this.mesh.position, this.startPosition, 0.001)) {
                    anim = this.run;
                }
                this.moving = false;
            }
        }
        return anim;
    }
    getAlpha() {
        if (this == Game.playerController) {
            return Game.Tools.moduloRadians(Game.RAD_90 - Game.camera.alpha); // Anon_11487
        }
        else {
            return 0;
        }
    }
    getBeta() {
        if (this == Game.playerController) {
            return Game.Tools.moduloRadians(Game.camera.beta - Game.RAD_90);
        }
        else {
            return 0;
        }
    }

    dispose() {
        super.dispose();
        return undefined;
    }
}