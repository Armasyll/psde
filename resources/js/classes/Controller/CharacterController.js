/**
 * Character Controller
 */
class CharacterController extends CreatureController {
    /**
     * Creates a Character Controller
     * @param {string} id 
     * @param {BABYLON.AbstractMesh} mesh 
     * @param {object} entityObject 
     */
    constructor(id = "", mesh = null, entityObject = {}) {
        if (EntityController.debugMode) console.group(`Creating new CharacterController(${id}, meshObject, entityObject)`);
        super(id, mesh, entityObject);
        if (!this.hasMesh()) {
            return null;
        }

        this.helmetVisible = true;
        /**
         * ApparelSlotEnum key, mesh ID, material ID
         * @type {object<string:object<string:string>>}
         * @example {"HEAD":[meshID, materialID]}
         */
        this.equipment = {};
        this.equipment["HEAD"] = [];
        this.equipment["EAR_L"] = [];
        this.equipment["EAR_R"] = [];
        this.equipment["NECK"] = [];
        this.equipment["SHOULDER_L"] = [];
        this.equipment["SHOULDER_R"] = [];
        this.equipment["FOREARM_L"] = [];
        this.equipment["FOREARM_R"] = [];
        this.equipment["HAND_L"] = [];
        this.equipment["HAND_R"] = [];
        this.equipment["CHEST"] = [];
        this.equipment["PELVIS"] = [];
        this.equipment["LEGS"] = [];
        this.equipment["FOOT_L"] = [];
        this.equipment["FOOT_R"] = [];

        /*
        Standing Idle, Standing Walk, Standing Run
        Crouching Idle, Crouching Walk
        Standing Idle to Crouching Idle
        Crouching Idle to Standing Idle
        */
        if (this.animated) {
            this.createAnimatableFromRangeName("idleStanding01", "90_idle01");
            this.createAnimatableFromRangeName("idleSitting01", "90_idleSittingDown01");
            this.createAnimatableFromRangeName("idleLying01", "90_idleLyingDown01");
            this.createAnimatableFromRangeName("idleDeath01", "91_death01");
            this.createAnimatableFromRangeName("walking01", "93_walkingKneesBent");
            this.createAnimatableFromRangeName("running01", "94_runningKneesBent");
            /*this.createAnimatableFromRangeName("stabRight", "71_stabThrust.r");
            this.createAnimatableFromRangeName("punchRight", "71_punch01");*/

            this.createAnimationGroupFromAnimatables("idleStanding01", "idleStanding01", 1.0);
            this.createAnimationGroupFromAnimatables("walking01", "walking01");
            this.createAnimationGroupFromAnimatables("running01", "running01", 0.0, true, (2 * this.getScaling().y));
            this.createAnimationGroupFromAnimatables("idleSitting01", "idleSitting01");
            this.createAnimationGroupFromAnimatables("idleLying01", "idleLying01");
            this.createAnimationGroupFromAnimatables("idleDeath01", "idleDeath01");
            /*this.createAnimationGroupFromAnimatables("punchRight", "punchRight");
            this.createAnimationGroupFromAnimatables("stabRight", "stabRight");*/

            /*this.additiveAnimations["punchRight"] = BABYLON.AnimationGroup.MakeAnimationAdditive(this.animationGroups["punchRight"]);
            this.additiveAnimations["stabRight"] = BABYLON.AnimationGroup.MakeAnimationAdditive(this.animationGroups["stabRight"]);*/
        }
        CharacterController.set(this.id, this);
        if (EntityController.debugMode) console.info(`Finished creating new CharacterController(${this.id})`);
        if (EntityController.debugMode) console.groupEnd();
    }

    populateFromEntity(entityObject) {
        if (EntityController.debugMode) console.group(`Running {CharacterController} ${this.id}.populateFromEntity(entityObject)`);
        if (!(entityObject instanceof Object)) {
            if (EntityController.debugMode) console.warn(`entityObject was not an object`);
            if (EntityController.debugMode) console.groupEnd();
            return 2;
        }
        super.populateFromEntity(entityObject);
        if (entityObject.hasOwnProperty("equipment")) {
            for (let key in entityObject["equipment"]) {
                if (!(entityObject["equipment"][key] instanceof Object)) {
                    continue;
                }
                if (!this.equipment.hasOwnProperty(key)) {
                    continue;
                }
                let equipmentObject = entityObject["equipment"][key];
                if (equipmentObject.hasOwnProperty("meshID")) {
                    if (equipmentObject.hasOwnProperty("materialID")) {
                        this.equipment[key] = [entityObject.equipment[key]["meshID"], entityObject.equipment[key]["materialID"]];
                    }
                    else if (equipmentObject.hasOwnProperty("textureID")) {
                        this.equipment[key] = [entityObject.equipment[key]["meshID"], entityObject.equipment[key]["textureID"]];
                    }
                }
            }
        }
        if (EntityController.debugMode) console.info(`Finished running {CharacterController} ${this.id}.populateFromEntity(entityObject)`);
        if (EntityController.debugMode) console.groupEnd();
        return 0;
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
        //
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
        //
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
            return 1;
        }
        super.generateOrganMeshes();
        return 0;
    }
    /**
     * Generates attached cosmetic meshes according to entity's cosmetics
     * @returns {null} null
     */
    generateCosmeticMeshes() { // TODO
        if (!this.hasSkeleton()) {
            return 1;
        }
        return 0;
    }
    /**
     * Generated attached equipment meshes according to entity's equipment
     * @returns {null} null
     */
    generateEquippedMeshes() {
        if (!this.hasSkeleton()) {
            return 1;
        }
        for (let equipmentSlot in this.equipment) {
            switch (equipmentSlot) {
                case "HEAD": {
                    if (this.equipment[equipmentSlot] instanceof Array && typeof this.equipment[equipmentSlot][0] == "string") {
                        this.detachFromHead();
                        this.attachToHead(this.equipment[equipmentSlot][0], this.equipment[equipmentSlot][1]);
                    }
                    break;
                }
                case "EAR_L": {
                    if (this.equipment[equipmentSlot] instanceof Array && typeof this.equipment[equipmentSlot][0] == "string") {
                        this.detachFromLeftEar();
                        this.attachToLeftEar(this.equipment[equipmentSlot][0], this.equipment[equipmentSlot][1]);
                    }
                    break;
                }
                case "EAR_R": {
                    if (this.equipment[equipmentSlot] instanceof Array && typeof this.equipment[equipmentSlot][0] == "string") {
                        this.detachFromRightEar();
                        this.attachToRightEar(this.equipment[equipmentSlot][0], this.equipment[equipmentSlot][1]);
                    }
                    break;
                }
                case "NECK": {
                    if (this.equipment[equipmentSlot] instanceof Array && typeof this.equipment[equipmentSlot][0] == "string") {
                        this.detachFromNeck();
                        this.attachToNeck(this.equipment[equipmentSlot][0], this.equipment[equipmentSlot][1]);
                    }
                    break;
                }
                case "SHOULDER_L": {
                    if (this.equipment[equipmentSlot] instanceof Array && typeof this.equipment[equipmentSlot][0] == "string") {
                        this.detachFromLeftShoulder();
                        this.attachToLeftShoulder(this.equipment[equipmentSlot][0], this.equipment[equipmentSlot][1]);
                    }
                    break;
                }
                case "SHOULDER_R": {
                    if (this.equipment[equipmentSlot] instanceof Array && typeof this.equipment[equipmentSlot][0] == "string") {
                        this.detachFromRightShoulder();
                        this.attachToRightShoulder(this.equipment[equipmentSlot][0], this.equipment[equipmentSlot][1]);
                    }
                    break;
                }
                case "FOREARM_L": {
                    if (this.equipment[equipmentSlot] instanceof Array && typeof this.equipment[equipmentSlot][0] == "string") {
                        this.detachFromLeftForearm();
                        this.attachToLeftForearm(this.equipment[equipmentSlot][0], this.equipment[equipmentSlot][1]);
                    }
                    break;
                }
                case "FOREARM_R": {
                    if (this.equipment[equipmentSlot] instanceof Array && typeof this.equipment[equipmentSlot][0] == "string") {
                        this.detachFromRightForearm();
                        this.attachToRightForearm(this.equipment[equipmentSlot][0], this.equipment[equipmentSlot][1]);
                    }
                    break;
                }
                case "HAND_L": {
                    if (this.equipment[equipmentSlot] instanceof Array && typeof this.equipment[equipmentSlot][0] == "string") {
                        this.detachFromLeftHand();
                        this.attachToLeftHand(this.equipment[equipmentSlot][0], this.equipment[equipmentSlot][1]);
                    }
                    break;
                }
                case "HAND_R": {
                    if (this.equipment[equipmentSlot] instanceof Array && typeof this.equipment[equipmentSlot][0] == "string") {
                        this.detachFromRightHand();
                        this.attachToRightHand(this.equipment[equipmentSlot][0], this.equipment[equipmentSlot][1]);
                    }
                    break;
                }
            }
        }
        return 0;
    }

    updateID(newID) {
        super.updateID(newID);
        CharacterController.updateID(this.id, newID);
        return 0;
    }
    dispose() {
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
        EntityController.debugMode = false;
        EntityController.debugVerbosity = 2;
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
    static updateID(oldID, newID) {
        if (!CharacterController.has(oldID)) {
            return 1;
        }
        CharacterController.set(newID, CharacterController.get(oldID));
        CharacterController.remove(oldID);
        return 0;
    }
    static setDebugMode(debugMode) {
        if (debugMode == true) {
            EntityController.debugMode = true;
            for (let characterController in CharacterController.characterControllerList) {
                CharacterController.characterControllerList[characterController].debugMode = true;
            }
        }
        else if (debugMode == false) {
            EntityController.debugMode = false;
            for (let characterController in CharacterController.characterControllerList) {
                CharacterController.characterControllerList[characterController].debugMode = false;
            }
        }
        return 0;
    }
    static getDebugMode() {
        return EntityController.debugMode === true;
    }
}
CharacterController.initialize();