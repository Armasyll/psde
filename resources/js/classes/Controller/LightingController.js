/**
 * Lighting Controller
 */
class LightingController extends FurnitureController {
    /**
     * Creates a Light Controller
     * @param {string} id 
     * @param {BABYLON.AbstractMesh} mesh 
     * @param {object} entityObject 
     * @param {BABYLON.Light} light 
     * @param {BABYLON.Vector3} lightPositionOffset 
     * @param {number} lightRange 
     */
    constructor(id, mesh, entityObject, light = null, lightPositionOffset = BABYLON.Vector3.Zero(), lightRange = 16) {
        super(id, mesh, entityObject);
        if (!this.hasMesh()) {
            return undefined;
        }

        if (!(lightPositionOffset instanceof BABYLON.Vector3)) {
            lightPositionOffset = Game.filterVector3(lightPositionOffset);
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
        this.light.range = Tools.filterFloat(lightRange) || 16.0;

        this.light.setEnabled(false);

        LightingController.set(this.id, this);
    }

    getLight() {
        return this.light;
    }
    hasLight() {
        return this.light instanceof BABYLON.Light;
    }

    setLightOn(lightOn) {
        if (!this.hasLight()) {
            return 1;
        }
        if (lightOn === true) {
            this.on();
        }
        else {
            this.off();
        }
        return 0;
    }
    getLightOn() {
        if (!this.hasLight()) {
            return false;
        }
        return this.light.isEnabled();
    }
    on() {
        if (!this.hasLight()) {
            return 1;
        }
        this.light.setEnabled(true);
        return 0;
    }
    off() {
        if (!this.hasLight()) {
            return 1;
        }
        this.light.setEnabled(false);
        return 0;
    }
    toggle() {
        if (!this.hasLight()) {
            return 1;
        }
        if (this.light.isEnabled()) {
            this.off();
        }
        else {
            this.on();
        }
        return 0;
    }

    /**
     * Clones the controller's values over this; but not really anything important :v
     * @param {(LightingController|object)} controller 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(controller, verify = true) {
        if (verify && !(controller instanceof LightingController)) {
            return 2;
        }
        super.assign(controller, verify);
        if (controller.hasOwnProperty("lightOn")) this.setLightOn(controller.lightOn);
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        LightingController.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        this.light.dispose();
        LightingController.remove(this.id);
        super.dispose();
        return null;
    }
    getClassName() {
        return "LightingController";
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
    static list() {
        return LightingController.lightingControllerList;
    }
    static clear() {
        for (let i in LightingController.lightingControllerList) {
            LightingController.lightingControllerList[i].dispose();
        }
        LightingController.lightingControllerList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!LightingController.has(oldID)) {
            return 1;
        }
        LightingController.set(newID, LightingController.get(oldID));
        LightingController.remove(oldID);
        return 0;
    }
}
LightingController.initialize();