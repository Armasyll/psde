class Tools {
    static isInt(n){
        return Number(n) === n && n % 1 === 0;
    }
    static isFloat(n){
        return Number(n) === n && n % 1 !== 0;
    }
    static genUUIDv4() {
        var uuid = "", i, random;
        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i == 8 || i == 12 || i == 16 || i == 20) {
                uuid += "-"
            }
            uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
        }
        return uuid.toUpperCase();
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
    static areVectorsEqual(v1, v2, p) {
        return ((Math.abs(v1.x - v2.x) < p) && (Math.abs(v1.y - v2.y) < p) && (Math.abs(v1.z - v2.z) < p));
    }
    static arePointsEqual(p1, p2, p) {
        return Math.abs(p1 - p2) < p;
    }
    static verticalSlope(v) {
        return Math.atan(Math.abs(v.y / Math.sqrt(v.x * v.x + v.z * v.z)));
    }
    static filterID(_id) {
        if (_id == undefined) {
            return undefined;
        }
        else if (Tools.isInt(_id)) {
            return _id;
        }
        else if (typeof _id == "string") {
            return _id.replace(/[^a-zA-Z0-9_\-]/g,"");
        }
    }
    static filterName(_string) {
        if (typeof _string != "string") {
            return "";
        }
        return _string.replace(/[^a-zA-Z0-9_\-\ \'\,\"]/g, '');
    }
    static filterFloat(_float) {
        _float = Number.parseFloat(_float);
        if (isNaN(_float)) {
            return 0;
        }
        else if (_float > Number.MAX_SAFE_INTEGER) {
            _float = Number.MAX_SAFE_INTEGER;
        }
        else if (_float < Number.MIN_SAFE_INTEGER) {
            _float = Number.MIN_SAFE_INTEGER;
        }
        return Number(_float.toFixed(4));
    }
    static filterInt(_int) {
        _int = Number.parseInt(_int);
        if (isNaN(_int)) {
            return 0;
        }
        else if (_int > Number.MAX_SAFE_INTEGER) {
            _int = Number.MAX_SAFE_INTEGER;
        }
        else if (_int < Number.MIN_SAFE_INTEGER) {
            _int = Number.MIN_SAFE_INTEGER;
        }
        return Math.round(_int);
    }
    static filterNumber(_int) {
        return Tools.filterFloat(_int);
    }
    static filterVector(..._vector) {
        if (_vector == undefined || _vector[0] == undefined) {
            return BABYLON.Vector3.Zero();
        }
        else if (_vector[0] instanceof BABYLON.Vector3) {
            return _vector[0];
        }
        else if (typeof _vector[0] == "object" && _vector[0].hasOwnProperty("x") && _vector[0].hasOwnProperty("y") && _vector[0].hasOwnProperty("z") && !isNaN(_vector[0].x) && !isNaN(_vector[0].y) && !isNaN(_vector[0].z)) {
            return new BABYLON.Vector3(_vector[0].x, _vector[0].y, _vector[0].z);
        }
        else if (!isNaN(_vector[0]) && !isNaN(_vector[1]) && !isNaN(_vector[2])) {
            return new BABYLON.Vector3(_vector[0], _vector[1], _vector[2]);
        }
        else if (_vector[0] instanceof Array && _vector[0].length == 3) {
            return new BABYLON.Vector3(_vector[0][0], _vector[0][1], _vector[0][2]);
        }
        else {
            return BABYLON.Vector3.Zero();
        }
    }
}