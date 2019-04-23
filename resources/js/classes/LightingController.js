class LightingController extends FurnitureController {
    constructor(_id, _mesh, _entity, _light = undefined, _lightPositionOffset = BABYLON.Vector3.Zero(), _lightRange = 16) {
        super(_id, _mesh, _entity);

        if (!(_lightPositionOffset instanceof BABYLON.Vector3)) {
            _lightPositionOffset = Tools.filterVector3(_lightPositionOffset);
        }
        if (!(_light instanceof BABYLON.Light)) {
            _light = new BABYLON.PointLight(_id, _lightPositionOffset, Game.scene);
            _light.parent = _mesh;
        }
        else {
            _light.parent = _mesh;
            _light.position = _lightPositionOffset;
        }
        this.light = _light;
        this.light.range = Tools.filterNumber(_lightRange);

        Game.setLightingController(this.id, this);
    }

    getLight() {
        return this.light;
    }
    hasLight() {
        return this.light instanceof BABYLON.Light;
    }

    dispose() {
        this.light.dispose();
        super.dispose();
        Game.removeLightingController(this.id);
        return undefined;
    }
}