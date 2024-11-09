/**
 * Lighting Controller
 */
class LightingController extends FurnitureController {
    /**
     * Creates a Light Controller
     * @param {string} id 
     * @param {BABYLON.AbstractMesh} aMeshes 
     * @param {object} entityObject 
     * @param {BABYLON.Light} light 
     * @param {BABYLON.Vector3} lightPositionOffset 
     * @param {number} lightRange 
     */
    constructor(id, aMeshes, entityObject, light = null, lightPositionOffset = BABYLON.Vector3.Zero(), lightRange = 16) {
        super(id, aMeshes, entityObject);
        if (!this.hasMesh()) {
            return undefined;
        }

        if (!(lightPositionOffset instanceof BABYLON.Vector3)) {
            lightPositionOffset = Game.filterVector3(lightPositionOffset);
        }
        if (!(light instanceof BABYLON.Light)) {
            light = new BABYLON.PointLight(id, lightPositionOffset, Game.scene);
            light.parent = aMeshes[0];
        }
        else {
            light.parent = aMeshes[0];
            light.position = lightPositionOffset;
        }
        this.light = light;
        this.light.range = Tools.filterFloat(lightRange) || 16.0;
        this.bHasRunPostConstructLighting = false;
        LightingController.set(this.id, this);
        this.postConstruct();
    }
    postConstruct() {
        if (this.bHasRunPostConstructLighting) {
            return 0;
        }
        super.postConstruct();
        this.bHasRunPostConstructLighting = true;
        if (this.light instanceof BABYLON.Light)
            this.light.setEnabled(false);
        return 0;
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
     * @param {(LightingController|object)} objectBlob 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(objectBlob, verify = true) {
        if (verify && !(objectBlob instanceof LightingController)) {
            return 2;
        }
        super.assign(objectBlob, verify);
        if (objectBlob.hasOwnProperty("lightOn")) this.setLightOn(objectBlob.lightOn);
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
        if (this.light instanceof BABYLON.Light)
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