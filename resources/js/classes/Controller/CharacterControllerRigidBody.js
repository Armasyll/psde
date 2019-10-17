class CharacterControllerRigidBody extends CharacterController {
    constructor(id, mesh, entity) {
        super(id, mesh, entity);
        this.gravity = -9.8;
        this.velocity = new BABYLON.Vector3();
        this.turnSpeed = Game.RAD_90; // degrees per second
    }

    moveAV() {
        if (this.anyMovement()) {
            let moving = true;
            let yDirection = this.getAlpha();
            if (this.key.forward) {
                if (this.key.strafeRight) {
                    yDirection += Game.RAD_45;
                }
                else if (this.key.strafeLeft) {
                    yDirection -= Game.RAD_45;
                }
            }
            else if (this.key.backward) {
                yDirection += Game.RAD_180;
                if (this.key.strafeRight) {
                    yDirection -= Game.RAD_45;
                }
                else if (this.key.strafeLeft) {
                    yDirection += Game.RAD_45;
                }
            }
            else if (this.key.strafeRight) {
                yDirection += Game.RAD_90;
            }
            else if (this.key.strafeLeft) {
                yDirection -= Game.RAD_90;
            }
            else {
                moving = false;
            }
            if (moving) {
                let pointDifference = Math.abs(yDirection - this.mesh.rotation.y);
                if (pointDifference > BABYLON.Tools.ToRadians(2)) {
                    let difference = (yDirection - this.mesh.rotation.y + BABYLON.Tools.ToRadians(180)) - BABYLON.Tools.ToRadians(180);
                    if (Math.abs(difference) > BABYLON.Tools.ToRadians(180)) {
                        difference -= Math.sign(difference) * BABYLON.Tools.ToRadians(360);
                    }
                    this.mesh.rotation.y += difference * (this.turnSpeed / Game.scene.getEngine().getDeltaTime()) + BABYLON.Tools.ToRadians(180);
                    this.mesh.rotation.y %= BABYLON.Tools.ToRadians(360);
                    this.mesh.rotation.y -= BABYLON.Tools.ToRadians(180);
                }
                else {
                    this.mesh.rotation.y = yDirection;
                }
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
            return Game.Tools.moduloRadians(Game.camera.alpha + Game.RAD_270);
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