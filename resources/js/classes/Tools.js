class Tools {
    constructor() {
        this.initialized = false;
    }
    static initialize() {
        Tools.MIN_RAD = 0;
        Tools.MAX_RAD = 6.28301077;
        Tools.MIN_DEG = 0;
        Tools.MAX_DEG = 359.99;
        Tools.initialized = true;
    }
    static moduloDegrees(_float) {
        if (_float > 359.99) {
            return _float%360;
        }
        else if (_float < 0) {
            return _float%360+360;
        }
        return _float;
    }
    static moduloRadians(_float) {
        if (_float > 6.28301077) {
            return _float%6.28318530;
        }
        else if (_float < 0) {
            return _float%6.28318530+6.28318530;
        }
        return _float;
    }
}