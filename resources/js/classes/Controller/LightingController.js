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

        LightingController.set(this.id, this);
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
        LightingController.remove(this.id);
        super.dispose();
        return undefined;
    }

    static initialize() {
        LightingController.lightingControllerList = {};
    }
    static get(id) {
        if (LightingController.has(id)) {
            return LightingController.lightingControllerList[id];
        }
        return 1;
    }
    static has(id) {
        return LightingController.lightingControllerList.hasOwnProperty(id);
    }
    static set(id, lightingController) {
        LightingController.lightingControllerList[id] = lightingController;
        return 0;
    }
    static remove(id) {
        delete LightingController.lightingControllerList[id];
        return 0;
    }
    static clear() {
        for (let i in LightingController.lightingControllerList) {
            LightingController.lightingControllerList[i].dispose();
        }
        LightingController.lightingControllerList = {};
        return 0;
    }
}
LightingController.initialize();