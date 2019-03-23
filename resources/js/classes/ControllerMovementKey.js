class ControllerMovementKey {
    constructor(_forward = false, _shift = false, _backward = false, _turnRight = false, _turnLeft = false, _strafeRight = false, _strafeLeft = false, _jump = false) {
        this.forward = _forward;
        this.shift = _shift;
        this.backward = _backward;
        this.turnRight = _turnRight;
        this.turnLeft = _turnLeft;
        this.strafeRight = _strafeRight;
        this.strafeLeft = _strafeLeft;
        this.jump = _jump;
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
    copyFrom(_key) {
        if (!(_key.hasOwnProperty("forward"))) {
            return undefined;
        }
        this.forward = _key.forward;
        this.shift = _key.shift;
        this.backward = _key.backward;
        this.turnRight = _key.turnRight;
        this.turnLeft = _key.turnLeft;
        this.strafeRight = _key.strafeRight;
        this.strafeLeft = _key.strafeLeft;
        this.jump = _key.jump;
    }
    clone() {
        return new ControllerMovementKey(this.forward, this.shift, this.backward, this.turnRight, this.turnLeft, this.strafeRight, this.strafeLeft, this.jump);
    }
    equals(_key) {
        if (!(_key.hasOwnProperty("forward"))) {
            return undefined;
        }
        return (
            this.forward == _key.forward &&
            this.shift == _key.shift &&
            this.backward == _key.backward &&
            this.turnRight == _key.turnRight &&
            this.turnLeft == _key.turnLeft &&
            this.strafeRight == _key.strafeRight &&
            this.strafeLeft == _key.strafeLeft &&
            this.jump == _key.jump
        )
    }
    toSource() {
        return `new ControllerMovementKey(${this.forward ? "true" : "false"}, ${this.shift ? "true" : "false"}, ${this.backward ? "true" : "false"}, ${this.turnRight ? "true" : "false"}, ${this.turnLeft ? "true" : "false"}, ${this.strafeRight ? "true" : "false"}, ${this.strafeLeft ? "true" : "false"}, ${this.jump ? "true" : "false"})`;
    }
    toInteger() {
        let _h = 0;
        if (this.forward) {
            _h += 1;
        }
        if (this.shift) {
            _h += 2;
        }
        if (this.backward) {
            _h += 4;
        }
        if (this.turnRight) {
            _h += 8;
        }
        if (this.turnLeft) {
            _h += 16;
        }
        if (this.strafeRight) {
            _h += 32;
        }
        if (this.strafeLeft) {
            _h += 64;
        }
        if (this.jump) {
            _h += 128;
        }
        return _h;
    }
    fromInteger() {
        if (_h > 128) {
            _h -= 128;
            this.jump = true;
        }
        if (_h > 64) {
            _h -= 64;
            this.strafeLeft = true;
        }
        if (_h > 32) {
            _h -= 32;
            this.strafeRight = true;
        }
        if (_h > 16) {
            _h -= 16;
            this.turnLeft = true;
        }
        if (_h > 8) {
            _h -= 8;
            this.turnRight = true;
        }
        if (_h > 4) {
            _h -= 4;
            this.backward = true;
        }
        if (_h > 2) {
            _h -= 2;
            this.shift = true;
        }
        if (_h > 1) {
            _h -= 1;
            this.forward = true;
        }
        return true;
    }
}