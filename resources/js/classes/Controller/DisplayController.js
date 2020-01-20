class DisplayController extends FurnitureController {
    constructor(id, mesh, entity, videoID = undefined, videoWidth = 0.98, videoHeight = 0.6250, videoPosition = BABYLON.Vector3.Zero()) {
        super(id, mesh, entity);
        this.videoMaterial = null;
        this.videoTexture = null;
        this.videoMesh = null;
        if (!(videoPosition instanceof BABYLON.Vector3)) {
            videoPosition = Tools.filterVector3(videoPosition);
        }
        if (typeof videoID == "string" && Game.hasVideo(videoID)) {
            this.videoMesh = Game.createVideo(undefined, videoID, videoWidth, videoHeight);
            if (!(this.videoMesh instanceof BABYLON.Mesh)) {
                return 2;
            }
            this.videoMesh.position.copyFrom(mesh.position);
            this.videoMesh.rotation.copyFrom(mesh.rotation);
            this.videoMesh.scaling.copyFrom(mesh.scaling);
            this.videoMesh.setParent(mesh);
            this.videoMesh.position.copyFrom(videoPosition.multiply(mesh.scaling));
            this.videoMaterial = this.videoMesh.material;
            this.videoTexture = this.videoMesh.material.diffuseTexture;
        }
        else {
            return 2;
        }
        this.previousVolume = 1.0;
        this.previousVideoTexture = null;

        DisplayController.set(this.id, this);
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

    setLocked(_bool = true) {
        super.setLocked(_bool);
        if (this._isLocked) {
            this.pause();
        }
    }
    setEnabled(_bool = true) {
        super.setEnabled(_bool);
        if (!this._isEnabled) {
            this.pause();
        }
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
}
DisplayController.initialize();