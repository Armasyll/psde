// General functions
Object.defineProperty(BABYLON.AbstractMesh.prototype, "controller", {
    get: function () {
        return this._controller;
    },
    set: function (value) {
        if (value && value instanceof EntityController) {
            this._controller = value;
        }
        else {
            this._controller = null;
        }
    },
    enumerable: true,
    configurable: true
});
Object.defineProperty(BABYLON.AbstractMesh.prototype, "isHitbox", {
    get: function () {
        return this._isHitbox === true;
    },
    set: function (value) {
        this._isHitbox = value === true;
    },
    enumerable: true,
    configurable: true
});
BABYLON.Mesh.prototype.showEllipsoid = function(scene) {
    if (!this.isEnabled()) return;

    this.refreshBoundingInfo();    

    var sphere = BABYLON.MeshBuilder.CreateSphere("elli", { 
        diameterX: this.ellipsoid.x * 2,
        diameterZ: this.ellipsoid.z * 2,
        diameterY: this.ellipsoid.y * 2
        },
    scene);

//    sphere.position = this.position.add(this.ellipsoidOffset);
    sphere.position = this.getAbsolutePosition().add(this.ellipsoidOffset);

    this.ellipsoidMesh = sphere;
    // sphere.showBoundingBox = true;
    sphere.material = new BABYLON.StandardMaterial("collider", scene);
    sphere.material.wireframe = true;
    sphere.material.diffuseColor = BABYLON.Color3.Yellow();

    // special barrel ellipsoid checks
    if (this.name == "barrel" || this.name == "barrel2") {
        sphere.material.diffuseColor = BABYLON.Color3.Green();
        console.log("barrel.ellipsoid: ", this.ellipsoid)
        var sbb = sphere.getBoundingInfo().boundingBox;
        console.log("barrel sphere bb.maximum.scale(2): ", sbb.maximum.scale(2));
    }

    sphere.visibility = .1;

    return this;
}
if (!String.prototype.format) {
    String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
        if (args[number] == undefined) {
            return match;
        }
        else {
            return args[number];
        }
    });
  };
}
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
}
Array.prototype.clear = function() {
    this.splice(0, this.length);
}
Array.prototype.contains = function() {
    var a = arguments;
    if (a.length == 0 || this.length == 0) {
        return false;
    }
    return (this.indexOf(a[0]) !== -1);
}
Array.prototype.getRandom = function() {
    if (this.length == 0) {
        return undefined;
    }
    else if (this.length == 1) {
        return this[0];
    }
    else {
        return this[Math.floor(Math.random() * this.length)];
    }
}
Array.prototype.difference = function(_arr) {
    if (!(_arr instanceof Array) || _arr.length == 0 || this.length == 0) {
        return this;
    }
    return this.filter(function(_index) {return _arr.indexOf(_index) < 0;});
}
Array.prototype.intersect = function() {
    var a = arguments;
    if (!(a[0] instanceof Array) || a.length == 0 || this.length == 0) {
        return this;
    }
    var _arr = [];
    var _cmpArr = a[0].slice(0);
    while (_cmpArr.length != 0) {
        this.some(function(_this) {
            if (_this == _cmpArr[_cmpArr.length - 1]) {
                _arr.push(_this);
                return true;
            }
        });
        _cmpArr.pop();
    }
    return _arr;
}
Map.prototype.flip = function() {
    if (!(this instanceof Map)) {
        return undefined;
    }
    var tmpMap = new Map();
    this.forEach(function(val, key) {
        tmpMap.set(val, key);
    });
    return tmpMap;
}
Array.prototype.flip = function() {
    if (!(this instanceof Array)) {
        return undefined;
    }
    var tmpArr = {};
    for (key in this) {
        if (!this.hasOwnProperty(key)) {
            continue;
        }
        tmpArr[this[parseInt(key)]-1] = (key);
    }
    return tmpArr;
}
Array.prototype.compare = function() {
    var args = arguments;
    if (this.length != args[0].length) {
        return false;
    }
    var length = args[0].length;
    for (var i = 0; i < length; i++) {
        if (this[i] !== args[0][i]) {
            return false;
        }
    }
    return true;
}