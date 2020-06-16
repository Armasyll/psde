class CharacterController extends CreatureController {
    constructor(id, mesh, entity) {
        super(id, mesh, entity);
        if (!this.hasMesh()) {
            return;
        }
        this.attackPunchRH = new AnimData("attackPunchRH");
        this.attackRunningPunchRH = new AnimData("attackPunchRH");
        this.attackThrustRH = new AnimData("attackThrustRH");
        this.attackSlashRH = new AnimData("attackSlashRH");
        this.attackChopRH = new AnimData("attackChopRH");
        this.setAnimData(this.attackPunchRH, "71_punch01", 1, false, false);
        this.setAnimData(this.attackRunningPunchRH, "71_runningPunch01", 1, false, false);
        this.setAnimData(this.attackThrustRH, "71_stab01", 1, false, false);
        this.helmetVisible = true;

        this.generateOrganMeshes();
        this.generateCosmeticMeshes();
        this.generateEquippedMeshes();
        /*
        Standing Idle, Standing Walk, Standing Run
        Crouching Idle, Crouching Walk
        Standing Idle to Crouching Idle
        Crouching Idle to Standing Idle
        */
        CharacterController.set(this.id, this);
    }

    doPunchRH() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return false;
        }
        if (this.attacking) {
            return false;
        }
        this.attacking = true;
        setTimeout(() => {this.attacking = false;}, 800);
        if (this.running) {
            for (let i = 0; i < this.animationBones["rightArm"].length; i++) {
                Game.scene.beginAnimation(this.skeleton.bones[this.animationBones["rightArm"][i]], this.attackRunningPunchRH.from, this.attackRunningPunchRH.to, this.attackRunningPunchRH.loop, this.attackRunningPunchRH.rate);
            }
        }
        else {
            for (let i = 0; i < this.animationBones["rightArm"].length; i++) {
                Game.scene.beginAnimation(this.skeleton.bones[this.animationBones["rightArm"][i]], this.attackPunchRH.from, this.attackPunchRH.to, this.attackPunchRH.loop, this.attackPunchRH.rate);
            }
        }
        return true;
    }
    doThrustRH() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return false;
        }
        if (this.attacking) {
            return false;
        }
        this.attacking = true;
        setTimeout(() => {this.attacking = false;}, 800);
        for (let i = 0; i < this.animationBones["rightArm"].length; i++) {
            Game.scene.beginAnimation(this.skeleton.bones[this.animationBones["rightArm"][i]], this.attackThrustRH.from, this.attackThrustRH.to, this.attackThrustRH.loop, this.attackThrustRH.rate);
        }
        return true;
    }

    hideHelmet() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        if (this._meshesAttachedToBones.hasOwnProperty("head")) {
            for (let mesh in this._meshesAttachedToBones["head"]) {
                if (this._meshesAttachedToBones["head"][mesh] instanceof BABYLON.AbstractMesh) {
                    this._meshesAttachedToBones["head"][mesh].isVisible = false;
                }
            }
        }
        this.helmetVisible = false;
        return this;
    }
    showHelmet() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        if (this._meshesAttachedToBones.hasOwnProperty("head")) {
            for (let mesh in this._meshesAttachedToBones["head"]) {
                if (this._meshesAttachedToBones["head"][mesh] instanceof BABYLON.AbstractMesh) {
                    this._meshesAttachedToBones["head"][mesh].isVisible = true;
                }
            }
        }
        this.helmetVisible = true;
        return this;
    }

    attachToHead(meshID, textureID, options) {
        this.attachMeshIDToBone(meshID, textureID, "head", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), options);
        if (this.helmetVisible) {
            this.showHelmet();
        }
        else {
            this.hideHelmet();
        }
        return this;
    }
    detachFromHead() {
        return this.detachFromBone("head");
    }
    attachToLeftEye(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "eye.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(-90), 0, 0), undefined, options);
    }
    detachFromLeftEye() {
        return this.detachFromBone("eye.l");
    }
    attachToRightEye(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "eye.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(-90), 0, 0), undefined, options);
    }
    detachFromRightEye() {
        return this.detachFromBone("eye.r");
    }
    attachToLeftEar(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "ear.l", undefined, undefined, undefined, options);
    }
    detachFromLeftEar() {
        return this.detachFromBone("ear.l");
    }
    attachToRightEar(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "ear.r", undefined, undefined, undefined, options);
    }
    detachFromRightEar() {
        return this.detachFromBone("ear.r");
    }
    attachToNeck(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "neck", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), undefined, options);
    }
    detachFromNeck() {
        return this.detachFromBone("neck");
    }
    attachToLeftShoulder(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "shoulder.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(315), BABYLON.Tools.ToRadians(120)), undefined, options);
    }
    detachFromLeftShoulder() {
        return this.detachFromBone("shoulder.l");
    }
    attachToRightShoulder(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "shoulder.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(225), BABYLON.Tools.ToRadians(60)), undefined, options);
    }
    detachFromRightShoulder() {
        return this.detachFromBone("shoulder.r");
    }
    attachToLeftForearm(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "forearm.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), undefined, options);
    }
    detachFromLeftForearm() {
        return this.detachFromBone("forearm.l");
    }
    attachToRightForearm(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "forearm.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(120), BABYLON.Tools.ToRadians(-90)), undefined, options);
    }
    detachFromRightForearm() {
        return this.detachFromBone("forearm.r");
    }
    attachToLeftHand(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "hand.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(90)), undefined, options);
    }
    detachFromLeftHand() {
        return this.detachFromBone("hand.l");
    }
    attachToRightHand(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "hand.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(90)), undefined, options);
    }
    detachFromRightHand() {
        return this.detachFromBone("hand.r");
    }
    attachToChest(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "chest", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), undefined, options);
    }
    detachFromChest() {
        return this.detachFromBone("chest");
    }
    attachToSpine(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "spine", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), undefined, options);
    }
    detachFromSpine() {
        return this.detachFromBone("spine");
    }
    attachToPelvis(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "pelvis", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), undefined, options);
    }
    detachFromPelvis() {
        return this.detachFromBone("pelvis");
    }
    /**
     * Generates attached organ meshes :V
     * @returns {null} null
     */
    generateOrganMeshes() {
        if (!this.hasSkeleton()) {
            return;
        }
        let eyeString = new String();
        switch (this.entity.getEyeType()) {
            case EyeEnum.FERAL: {
                eyeString = eyeString.concat("feralEye");
                break;
            }
            case EyeEnum.OBLONG: {
                eyeString = eyeString.concat("oblongEye");
                break;
            }
            case EyeEnum.CIRCLE:
            default: {
                eyeString = eyeString.concat("circularEye");
            }
        }
        switch (this.entity.getEyeColour()) {
            case "yellow": {
                eyeString = eyeString.concat("Yellow");
                break;
            }
            case "brown": {
                eyeString = eyeString.concat("Brown");
                break;
            }
            case "blue": {
                eyeString = eyeString.concat("Blue");
                break;
            }
            case "green": {
                eyeString = eyeString.concat("Green");
                break;
            }
            case "violet": {
                eyeString = eyeString.concat("Violet");
                break;
            }
            case "grey":
            case "gray":
            default: {
            }
        }
        this.detachFromRightEye();
        this.detachFromLeftEye();
        this.attachToRightEye("eye01", eyeString);
        this.attachToLeftEye("eye01", eyeString);
        return this;
    }
    /**
     * Generates attached cosmetic meshes according to entity's cosmetics
     * @returns {null} null
     */
    generateCosmeticMeshes() { // TODO
        if (!this.hasSkeleton()) {
            return;
        }
        return this;
    }
    /**
     * Generated attached equipment meshes according to entity's equipment
     * @returns {null} null
     */
    generateEquippedMeshes() {
        if (!this.hasSkeleton()) {
            return;
        }
        for (let equipmentIndex in this.entity.getEquipment()) {
            switch (equipmentIndex) {
                case "HEAD": {
                    if (this.entity.getEquipment()[equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromHead();
                        this.attachToHead(this.entity.getEquipment()[equipmentIndex].getMeshID(), this.entity.getEquipment()[equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "EAR_L": {
                    if (this.entity.getEquipment()[equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromLeftEar();
                        this.attachToLeftEar(this.entity.getEquipment()[equipmentIndex].getMeshID(), this.entity.getEquipment()[equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "EAR_R": {
                    if (this.entity.getEquipment()[equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromRightEar();
                        this.attachToRightEar(this.entity.getEquipment()[equipmentIndex].getMeshID(), this.entity.getEquipment()[equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "NECK": {
                    if (this.entity.getEquipment()[equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromNeck();
                        this.attachToNeck(this.entity.getEquipment()[equipmentIndex].getMeshID(), this.entity.getEquipment()[equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "SHOULDER_L": {
                    if (this.entity.getEquipment()[equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromLeftShoulder();
                        this.attachToLeftShoulder(this.entity.getEquipment()[equipmentIndex].getMeshID(), this.entity.getEquipment()[equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "SHOULDER_R": {
                    if (this.entity.getEquipment()[equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromRightShoulder();
                        this.attachToRightShoulder(this.entity.getEquipment()[equipmentIndex].getMeshID(), this.entity.getEquipment()[equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "FOREARM_L": {
                    if (this.entity.getEquipment()[equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromLeftForearm();
                        this.attachToLeftForearm(this.entity.getEquipment()[equipmentIndex].getMeshID(), this.entity.getEquipment()[equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "FOREARM_R": {
                    if (this.entity.getEquipment()[equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromRightForearm();
                        this.attachToRightForearm(this.entity.getEquipment()[equipmentIndex].getMeshID(), this.entity.getEquipment()[equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "HAND_L": {
                    if (this.entity.getEquipment()[equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromLeftHand();
                        this.attachToLeftHand(this.entity.getEquipment()[equipmentIndex].getMeshID(), this.entity.getEquipment()[equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "HAND_R": {
                    if (this.entity.getEquipment()[equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromRightHand();
                        this.attachToRightHand(this.entity.getEquipment()[equipmentIndex].getMeshID(), this.entity.getEquipment()[equipmentIndex].getTextureID());
                    }
                    break;
                }
            }
        }
        return this;
    }

    dispose() {
        if (this == Game.player.getController()) {
            return false;
        }
        this.setLocked(true);
        this.setEnabled(false);
        this.detachFromAllBones();
        CharacterController.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "CharacterController";
    }

    static initialize() {
        CharacterController.characterControllerList = {};
    }
    static get(id) {
        if (CharacterController.has(id)) {
            return CharacterController.characterControllerList[id];
        }
        return 1;
    }
    static has(id) {
        return CharacterController.characterControllerList.hasOwnProperty(id);
    }
    static set(id, characterController) {
        CharacterController.characterControllerList[id] = characterController;
        return 0;
    }
    static remove(id) {
        delete CharacterController.characterControllerList[id];
        return 0;
    }
    static list() {
        return CharacterController.characterControllerList;
    }
    static clear() {
        for (let i in CharacterController.characterControllerList) {
            CharacterController.characterControllerList[i].dispose();
        }
        CharacterController.characterControllerList = {};
        return 0;
    }
}
CharacterController.initialize();