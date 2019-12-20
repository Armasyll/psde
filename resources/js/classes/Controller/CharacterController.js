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
        this._showHelmet = true;

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
        this._showHelmet = false;
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
        this._showHelmet = true;
        return this;
    }

    attachToHead(_mesh, _texture, options) {
        this.attachMeshIDToBone(_mesh, _texture, "head", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), options);
        if (this._showHelmet) {
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
    attachToLeftEye(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "eye.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(-90), 0, 0), undefined, options);
    }
    detachFromLeftEye() {
        return this.detachFromBone("eye.l");
    }
    attachToRightEye(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "eye.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(-90), 0, 0), undefined, options);
    }
    detachFromRightEye() {
        return this.detachFromBone("eye.r");
    }
    attachToLeftEar(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "ear.l", undefined, undefined, undefined, options);
    }
    detachFromLeftEar() {
        return this.detachFromBone("ear.l");
    }
    attachToRightEar(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "ear.r", undefined, undefined, undefined, options);
    }
    detachFromRightEar() {
        return this.detachFromBone("ear.r");
    }
    attachToNeck(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "neck", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), undefined, options);
    }
    detachFromNeck() {
        return this.detachFromBone("neck");
    }
    attachToLeftShoulder(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "shoulder.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(315), BABYLON.Tools.ToRadians(120)), undefined, options);
    }
    detachFromLeftShoulder() {
        return this.detachFromBone("shoulder.l");
    }
    attachToRightShoulder(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "shoulder.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(225), BABYLON.Tools.ToRadians(60)), undefined, options);
    }
    detachFromRightShoulder() {
        return this.detachFromBone("shoulder.r");
    }
    attachToLeftForearm(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "forearm.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), undefined, options);
    }
    detachFromLeftForearm() {
        return this.detachFromBone("forearm.l");
    }
    attachToRightForearm(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "forearm.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(120), BABYLON.Tools.ToRadians(-90)), undefined, options);
    }
    detachFromRightForearm() {
        return this.detachFromBone("forearm.r");
    }
    attachToLeftHand(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "hand.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(90)), undefined, options);
    }
    detachFromLeftHand() {
        return this.detachFromBone("hand.l");
    }
    attachToRightHand(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "hand.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(90)), undefined, options);
    }
    detachFromRightHand() {
        return this.detachFromBone("hand.r");
    }
    attachToChest(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "chest", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), undefined, options);
    }
    detachFromChest() {
        return this.detachFromBone("chest");
    }
    attachToSpine(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "spine", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), undefined, options);
    }
    detachFromSpine() {
        return this.detachFromBone("spine");
    }
    attachToPelvis(_mesh, _texture = "missingTexture", options) {
        return this.attachMeshIDToBone(_mesh, _texture, "pelvis", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), undefined, options);
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
        let _string = new String();
        switch (this.entity.getEyeType()) {
            case EyeEnum.FERAL: {
                _string = _string.concat("feralEye");
                break;
            }
            case EyeEnum.OBLONG: {
                _string = _string.concat("oblongEye");
                break;
            }
            case EyeEnum.CIRCLE:
            default: {
                _string = _string.concat("circularEye");
            }
        }
        switch (this.entity.getEyeColour()) {
            case "yellow": {
                _string = _string.concat("Yellow");
                break;
            }
            case "brown": {
                _string = _string.concat("Brown");
                break;
            }
            case "blue": {
                _string = _string.concat("Blue");
                break;
            }
            case "green": {
                _string = _string.concat("Green");
                break;
            }
            case "violet": {
                _string = _string.concat("Violet");
                break;
            }
            case "grey":
            case "gray":
            default: {
            }
        }
        this.detachFromRightEye();
        this.detachFromLeftEye();
        this.attachToRightEye("eye01", _string);
        this.attachToLeftEye("eye01", _string);
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
        for (let _equipmentIndex in this.entity.getEquipment()) {
            switch (_equipmentIndex) {
                case "HEAD": {
                    if (this.entity.getEquipment()[_equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromHead();
                        this.attachToHead(this.entity.getEquipment()[_equipmentIndex].getMeshID(), this.entity.getEquipment()[_equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "EAR_L": {
                    if (this.entity.getEquipment()[_equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromLeftEar();
                        this.attachToLeftEar(this.entity.getEquipment()[_equipmentIndex].getMeshID(), this.entity.getEquipment()[_equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "EAR_R": {
                    if (this.entity.getEquipment()[_equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromRightEar();
                        this.attachToRightEar(this.entity.getEquipment()[_equipmentIndex].getMeshID(), this.entity.getEquipment()[_equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "NECK": {
                    if (this.entity.getEquipment()[_equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromNeck();
                        this.attachToNeck(this.entity.getEquipment()[_equipmentIndex].getMeshID(), this.entity.getEquipment()[_equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "SHOULDER_L": {
                    if (this.entity.getEquipment()[_equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromLeftShoulder();
                        this.attachToLeftShoulder(this.entity.getEquipment()[_equipmentIndex].getMeshID(), this.entity.getEquipment()[_equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "SHOULDER_R": {
                    if (this.entity.getEquipment()[_equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromRightShoulder();
                        this.attachToRightShoulder(this.entity.getEquipment()[_equipmentIndex].getMeshID(), this.entity.getEquipment()[_equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "FOREARM_L": {
                    if (this.entity.getEquipment()[_equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromLeftForearm();
                        this.attachToLeftForearm(this.entity.getEquipment()[_equipmentIndex].getMeshID(), this.entity.getEquipment()[_equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "FOREARM_R": {
                    if (this.entity.getEquipment()[_equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromRightForearm();
                        this.attachToRightForearm(this.entity.getEquipment()[_equipmentIndex].getMeshID(), this.entity.getEquipment()[_equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "HAND_L": {
                    if (this.entity.getEquipment()[_equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromLeftHand();
                        this.attachToLeftHand(this.entity.getEquipment()[_equipmentIndex].getMeshID(), this.entity.getEquipment()[_equipmentIndex].getTextureID());
                    }
                    break;
                }
                case "HAND_R": {
                    if (this.entity.getEquipment()[_equipmentIndex] instanceof AbstractEntity) {
                        this.detachFromRightHand();
                        this.attachToRightHand(this.entity.getEquipment()[_equipmentIndex].getMeshID(), this.entity.getEquipment()[_equipmentIndex].getTextureID());
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