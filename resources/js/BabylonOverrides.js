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
BABYLON.AbstractMesh.prototype.hasController = function() {
    if (!this.isEnabled()) return false;
    return this._controller != null;
}
BABYLON.Vector3.prototype.toOtherArray = function() {
    if (typeof this.x == "number") {
        return [this.x, this.y, this.z];
    }
    return [this._x, this._y, this._z];
}
Object.defineProperty(BABYLON.AbstractMesh.prototype, "isHitbox", {
    get: function () {
        return this._isHitbox === true;
    },
    set: function (value) {
        this._isHitbox = value === true;
    },
    enumerable: true,
    configurable: false
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