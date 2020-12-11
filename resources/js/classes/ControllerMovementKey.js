/**
 * Movement keys for EntityControllers
 * @class
 * @typedef {Object} ControllerMovementKey
 */
class ControllerMovementKey {
    /**
     * 
     * @param {boolean} forward 
     * @param {boolean} shift 
     * @param {boolean} backward 
     * @param {boolean} turnRight 
     * @param {boolean} turnLeft 
     * @param {boolean} strafeRight 
     * @param {boolean} strafeLeft 
     * @param {boolean} jump 
     */
    constructor(forward = false, shift = false, backward = false, turnRight = false, turnLeft = false, strafeRight = false, strafeLeft = false, jump = false) {
        this.forward = forward;
        this.shift = shift;
        this.backward = backward;
        this.turnRight = turnRight;
        this.turnLeft = turnLeft;
        this.strafeRight = strafeRight;
        this.strafeLeft = strafeLeft;
        this.jump = jump;
    }
    reset() {
        this.forward = false;
        this.shift = false;
        this.backward = false;
        this.turnRight = false;
        this.turnLeft = false;
        this.strafeRight = false;
        this.strafeLeft = false;
        this.jump = false;
    }
    copyFrom(controllerMovementKey) {
        if (!(controllerMovementKey instanceof ControllerMovementKey)) {
            return false;
        }
        this.forward = controllerMovementKey.forward;
        this.shift = controllerMovementKey.shift;
        this.backward = controllerMovementKey.backward;
        this.turnRight = controllerMovementKey.turnRight;
        this.turnLeft = controllerMovementKey.turnLeft;
        this.strafeRight = controllerMovementKey.strafeRight;
        this.strafeLeft = controllerMovementKey.strafeLeft;
        this.jump = controllerMovementKey.jump;
    }
    clone() {
        return new ControllerMovementKey(this.forward, this.shift, this.backward, this.turnRight, this.turnLeft, this.strafeRight, this.strafeLeft, this.jump);
    }
    equals(controllerMovementKey) {
        if (!(controllerMovementKey instanceof ControllerMovementKey)) {
            return false;
        }
        return (
            this.forward == controllerMovementKey.forward &&
            this.shift == controllerMovementKey.shift &&
            this.backward == controllerMovementKey.backward &&
            this.turnRight == controllerMovementKey.turnRight &&
            this.turnLeft == controllerMovementKey.turnLeft &&
            this.strafeRight == controllerMovementKey.strafeRight &&
            this.strafeLeft == controllerMovementKey.strafeLeft &&
            this.jump == controllerMovementKey.jump
        )
    }
    toSource() {
        return `new ControllerMovementKey(${this.forward ? "true" : "false"}, ${this.shift ? "true" : "false"}, ${this.backward ? "true" : "false"}, ${this.turnRight ? "true" : "false"}, ${this.turnLeft ? "true" : "false"}, ${this.strafeRight ? "true" : "false"}, ${this.strafeLeft ? "true" : "false"}, ${this.jump ? "true" : "false"})`;
    }
    toBinary() {
        return this.toInteger().toString(2);
    }
    toInteger() {
        let integer = 0;
        if (this.forward) {
            integer += 1;
        }
        if (this.shift) {
            integer += 2;
        }
        if (this.backward) {
            integer += 4;
        }
        if (this.turnRight) {
            integer += 8;
        }
        if (this.turnLeft) {
            integer += 16;
        }
        if (this.strafeRight) {
            integer += 32;
        }
        if (this.strafeLeft) {
            integer += 64;
        }
        if (this.jump) {
            integer += 128;
        }
        return integer;
    }
    fromBinary(binary) {
        return this.fromInteger(Number.parseInt(binary, 2));
    }
    fromInteger(integer) {
        if (integer > 128) {
            integer -= 128;
            this.jump = true;
        }
        if (integer > 64) {
            integer -= 64;
            this.strafeLeft = true;
        }
        if (integer > 32) {
            integer -= 32;
            this.strafeRight = true;
        }
        if (integer > 16) {
            integer -= 16;
            this.turnLeft = true;
        }
        if (integer > 8) {
            integer -= 8;
            this.turnRight = true;
        }
        if (integer > 4) {
            integer -= 4;
            this.backward = true;
        }
        if (integer > 2) {
            integer -= 2;
            this.shift = true;
        }
        if (integer > 1) {
            integer -= 1;
            this.forward = true;
        }
        return true;
    }
}