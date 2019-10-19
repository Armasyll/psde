class CharacterControllerRigidBody extends CharacterController {
    constructor(id, mesh, entity) {
        super(id, mesh, entity);
        this.gravity = -9.8;
        this.velocity = new BABYLON.Vector3();
        this.turnSpeed = Game.RAD_90; // degrees per second
        this.moving = false;
        this.turning = false;
        this.intendedDirection = 0.0;
    }

    moveAV() {
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
                    let difference = (this.intendedDirection - this.mesh.rotation.y + BABYLON.Tools.ToRadians(180)) - BABYLON.Tools.ToRadians(180);
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
                this.moving = false;
            }
        }
    }
    /**
     * Rotates character from this.mesh.rotation.y towards intendedDirection
     * @param {*} intendedDirection 
     */
    tempRotatePerFrame(intendedDirection) {
        /*let rotation = Game.Tools.moduloRadians(((intendedDirection - this.mesh.rotation.y + Game.RAD_180) % Game.RAD_360) - Game.RAD_180);
        if (rotation > 0) {
            this.mesh.rotation.y += rotation / this.turnSpeed / Game.engine._deltaTime;
        }
        else {
            this.mesh.rotation.y -= rotation / this.turnSpeed / Game.engine._deltaTime;
        }*/
        let difference = (intendedDirection - this.mesh.rotation.y + Game.RAD_180) - Game.RAD_180;
        this.mesh.rotation.y += difference * (this.turnSpeed / Game.engine._deltaTime);
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