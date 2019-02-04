class LightingController extends FurnitureController {
    constructor(_id, _mesh, _entity, _light = undefined, _lightPositionOffset = BABYLON.Vector3.Zero()) {
        super (_id, _mesh, _entity);

        if (!(_lightPositionOffset instanceof BABYLON.Vector3)) {
            _lightPositionOffset = Game.filterVector3(_lightPositionOffset);
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