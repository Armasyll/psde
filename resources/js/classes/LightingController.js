class LightingController extends FurnitureController {
    constructor(id, mesh, entity, light = undefined, lightPositionOffset = BABYLON.Vector3.Zero(), lightRange = 16) {
        super(id, mesh, entity);

        if (!(lightPositionOffset instanceof BABYLON.Vector3)) {
            lightPositionOffset = Tools.filterVector3(lightPositionOffset);
        }
        if (!(light instanceof BABYLON.Light)) {
            light = new BABYLON.PointLight(id, lightPositionOffset, Game.scene);
            light.parent = mesh;
        }
        else {
            light.parent = mesh;
            light.position = lightPositionOffset;
        }
        this.light = light;
        this.light.range = Tools.filterFloat(lightRange);

        Game.setLightingController(this.id, this);
    }

    getLight() {
        return this.light;
    }
    hasLight() {
        return this.light instanceof BABYLON.Light;
    }

    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        this.light.dispose();
        super.dispose();
        Game.removeLightingController(this.id);
        return undefined;
    }
}