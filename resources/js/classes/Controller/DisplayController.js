/**
 * Display Controller
 */
class DisplayController extends FurnitureController {
    /**
     * 
     * @param {string} id 
     * @param {BABYLON.AbstractMesh} aMeshes 
     * @param {object} entityObject 
     * @param {string} videoID 
     * @param {number} videoWidth 
     * @param {number} videoHeight 
     * @param {number} videoPosition 
     */
    constructor(id, aMeshes = [], entityObject = {}, videoID = "", videoWidth = 0.98, videoHeight = 0.6250, videoPosition = BABYLON.Vector3.Zero()) {
        super(id, aMeshes, entityObject);
        if (!this.hasMesh()) {
            return undefined;
        }

        this.videoMaterial = null;
        this.videoTexture = null;
        this.videoMesh = null;
        if (!(videoPosition instanceof BABYLON.Vector3)) {
            videoPosition = Game.filterVector3(videoPosition);
        }
        if (typeof videoID == "string" && Game.hasVideo(videoID)) {
            this.videoMesh = Game.createVideo(undefined, videoID, videoWidth, videoHeight);
            if (!(this.videoMesh instanceof BABYLON.Mesh)) {
                return null;
            }
            this.videoMesh.position.copyFrom(aMeshes.position);
            this.videoMesh.rotation.copyFrom(aMeshes.rotation);
            this.videoMesh.scaling.copyFrom(aMeshes.scaling);
            this.videoMesh.setParent(aMeshes);
            this.videoMesh.position.copyFrom(videoPosition.multiply(aMeshes.scaling));
            this.videoMaterial = this.videoMesh.material;
            this.videoTexture = this.videoMesh.material.diffuseTexture;
        }
        else {
            return null;
        }
        this.previousVolume = 1.0;
        this.previousVideoTexture = null;
        this.bHasRunPostConstructDisplay = false;
        DisplayController.set(this.id, this);
        this.postConstruct();
    }
    postConstruct() {
        if (this.bHasRunPostConstructDisplay) {
            return 0;
        }
        super.postConstruct();
        this.bHasRunPostConstructDisplay = true;
        return 0;
    }

    play() {
        if (this.videoTexture instanceof BABYLON.VideoTexture) {
            this.videoTexture.video.play();
        }
        else {
            return 1;
        }
        return 0;
    }
    pause() {
        if (this.videoTexture instanceof BABYLON.VideoTexture) {
            this.videoTexture.video.pause();
        }
        else {
            return 1;
        }
        return 0;
    }
    mute() {
        if (this.videoTexture instanceof BABYLON.VideoTexture) {
            this.previousVolume = this.videoTexture.video.volume;
            this.videoTexture.video.volume = 0.0;
        }
        else {
            return 1;
        }
        return 0;
    }
    unmute() {
        if (this.videoTexture instanceof BABYLON.VideoTexture) {
            this.videoTexture.video.volume = this.previousVolume;
        }
        else {
            return 1;
        }
        return 0;
    }
    setVideo(videoTexture) {
        if (videoTexture instanceof BABYLON.Texture) {
            this.videoTexture = videoTexture;
        }
        else {
            return 1;
        }
        return 0;
    }
    getVideo() {
        return this.videoTexture;
    }
    hasVideo() {
        return this.videoTexture instanceof BABYLON.Texture;
    }

    setLocked(locked = true) {
        super.setLocked(locked);
        if (this.locked) {
            this.pause();
        }
        return 0;
    }
    setEnabled(enabled = true) {
        super.setEnabled(enabled);
        if (!this.enabled) {
            this.pause();
        }
        return 0;
    }

    updateID(newID) {
        super.updateID(newID);
        DisplayController.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        this.videoMesh.dispose();
        Game.removeVideoClone(this.videoTexture);
        this.videoTexture.dispose();
        this.videoMaterial.dispose();
        DisplayController.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "DisplayController";
    }

    static initialize() {
        DisplayController.displayControllerList = {};
    }
    static get(id) {
        if (DisplayController.has(id)) {
            return DisplayController.displayControllerList[id];
        }
        return 1;
    }
    static has(id) {
        return DisplayController.displayControllerList.hasOwnProperty(id);
    }
    static set(id, displayController) {
        DisplayController.displayControllerList[id] = displayController;
        return 0;
    }
    static remove(id) {
        delete DisplayController.displayControllerList[id];
        return 0;
    }
    static list() {
        return DisplayController.displayControllerList;
    }
    static clear() {
        for (let i in DisplayController.displayControllerList) {
            DisplayController.displayControllerList[i].dispose();
        }
        DisplayController.displayControllerList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!DisplayController.has(oldID)) {
            return 1;
        }
        DisplayController.set(newID, DisplayController.get(oldID));
        DisplayController.remove(oldID);
        return 0;
    }
}
DisplayController.initialize();