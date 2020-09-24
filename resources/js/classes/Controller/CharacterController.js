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

    populateFromEntity(entityObject, overwrite = true) {
        if (EntityController.debugMode) console.group(`Running {CharacterController} ${this.id}.populateFromEntity(entityObject)`);
        if (!(entityObject instanceof Object)) {
            if (EntityController.debugMode) console.warn(`entityObject was not an object`);
            if (EntityController.debugMode) console.groupEnd();
            return 2;
        }
        super.populateFromEntity(entityObject);
        let equipmentObject = null;
        let meshID = null;
        let materialID = null;
        if (entityObject.hasOwnProperty("equipment")) {
            for (let boneID in entityObject["equipment"]) {
                if (!(entityObject["equipment"][boneID] instanceof Object)) {
                    if (overwrite) {
                        this.detachEquipmentFromBone(boneID, true);
                    }
                }
                else {
                    equipmentObject = entityObject["equipment"][boneID];
                    if (equipmentObject.hasOwnProperty("meshID")) {
                        meshID = entityObject.equipment[boneID]["meshID"];
                        if (equipmentObject.hasOwnProperty("materialID")) {
                            materialID = entityObject.equipment[boneID]["materialID"];
                        }
                        else if (equipmentObject.hasOwnProperty("textureID")) {
                            materialID = entityObject.equipment[boneID]["textureID"];
                        }
                        else {
                            material = "missingMaterial";
                        }
                        this.attachEquipmentToBone(meshID, materialID, boneID);
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

    attachEquipmentToBone(meshID, materialID, boneID, options) {
        let result = 0;
        switch (boneID) {
            case "head":
            case "HEAD": {
                result = this.attachEquipmentToHead(meshID, materialID, options);
                break;
            }
            case "ear.l":
            case "EAR_L": {
                result = this.attachEquipmentToLeftEar(meshID, materialID, options);
                break;
            }
            case "ear.r":
            case "EAR_R": {
                result = this.attachEquipmentToRightEar(meshID, materialID, options);
                break;
            }
            case "neck":
            case "NECK": {
                result = this.attachEquipmentToNeck(meshID, materialID, options);
                break;
            }
            case "shoulder.l":
            case "SHOULDER_L": {
                result = this.attachEquipmentToLeftShoulder(meshID, materialID, options);
                break;
            }
            case "shoulder.r":
            case "SHOULDER_R": {
                result = this.attachEquipmentToRightShoulder(meshID, materialID, options);
                break;
            }
            case "forearm.l":
            case "FOREARM_L": {
                result = this.attachEquipmentToLeftForearm(meshID, materialID, options);
                break;
            }
            case "forearm.r":
            case "FOREARM_R": {
                result = this.attachEquipmentToRightForearm(meshID, materialID, options);
                break;
            }
            case "hand.l":
            case "HAND_L": {
                result = this.attachEquipmentToLeftHand(meshID, materialID, options);
                break;
            }
            case "hand.r":
            case "HAND_R": {
                result = this.attachEquipmentToRightHand(meshID, materialID, options);
                break;
            }
            default: {
                result = 1;
            }
        }
        return result;
    }
    detachEquipmentFromBone(boneID, destroyMesh = true) {
        let result = 0;
        switch (boneID) {
            case "head":
            case "HEAD": {
                result = this.detachEquipmentFromHead(destroyMesh);
                break;
            }
            case "ear.l":
            case "EAR_L": {
                result = this.detachEquipmentFromLeftEar(destroyMesh);
                break;
            }
            case "ear.r":
            case "EAR_R": {
                result = this.detachEquipmentFromRightEar(destroyMesh);
                break;
            }
            case "neck":
            case "NECK": {
                result = this.detachEquipmentFromNeck(destroyMesh);
                break;
            }
            case "shoulder.l":
            case "SHOULDER_L": {
                result = this.detachEquipmentFromLeftShoulder(destroyMesh);
                break;
            }
            case "shoulder.r":
            case "SHOULDER_R": {
                result = this.detachEquipmentFromRightShoulder(destroyMesh);
                break;
            }
            case "forearm.l":
            case "FOREARM_L": {
                result = this.detachEquipmentFromLeftForearm(destroyMesh);
                break;
            }
            case "forearm.r":
            case "FOREARM_R": {
                result = this.detachEquipmentFromRightForearm(destroyMesh);
                break;
            }
            case "hand.l":
            case "HAND_L": {
                result = this.detachEquipmentFromLeftHand(destroyMesh);
                break;
            }
            case "hand.r":
            case "HAND_R": {
                result = this.detachEquipmentFromRightHand(destroyMesh);
                break;
            }
            default: {
                result = 1;
            }
        }
        return result;
    }
    attachEquipmentToHead(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.equipment["HEAD"][0] == "string") {
            if (this.equipment["HEAD"][0] == meshID && this.equipment["HEAD"][1] == materialID) {
                return 0;
            }
            this.detachEquipmentFromHead();
        }
        this.equipment["HEAD"][0] = meshID;
        this.equipment["HEAD"][1] = materialID;
        return this.attachToHead(meshID, materialID, options);
    }
    detachEquipmentFromHead(destroyMesh = true) {
        let result = this.detachMeshID(this.equipment["HEAD"][0], this.equipment["HEAD"][1], destroyMesh);
        this.equipment["HEAD"][0] = null;
        this.equipment["HEAD"][1] = null;
        return result;
    }
    attachEquipmentToLeftEye(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.equipment["EYE_L"][0] == "string") {
            if (this.equipment["EYE_L"][0] == meshID && this.equipment["EYE_L"][1] == materialID) {
                return 0;
            }
            this.detachEquipmentFromLeftEye();
        }
        this.equipment["EYE_L"][0] = meshID;
        this.equipment["EYE_L"][1] = materialID;
        return this.attachToLeftEye(meshID, materialID, options);
    }
    detachEquipmentFromLeftEye(destroyMesh = true) {
        let result = this.detachMeshID(this.equipment["EYE_L"][0], this.equipment["EYE_L"][1], destroyMesh);
        this.equipment["EYE_L"][0] = null;
        this.equipment["EYE_L"][1] = null;
        return result;
    }
    attachEquipmentToRightEye(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.equipment["EYE_R"][0] == "string") {
            if (this.equipment["EYE_R"][0] == meshID && this.equipment["EYE_R"][1] == materialID) {
                return 0;
            }
            this.detachEquipmentFromRightEye();
        }
        this.equipment["EYE_R"][0] = meshID;
        this.equipment["EYE_R"][1] = materialID;
        return this.attachToRightEye(meshID, materialID, options);
    }
    detachEquipmentFromRightEye(destroyMesh = true) {
        let result = this.detachMeshID(this.equipment["EYE_R"][0], this.equipment["EYE_R"][1], destroyMesh);
        this.equipment["EYE_R"][0] = null;
        this.equipment["EYE_R"][1] = null;
        return result;
    }
    attachEquipmentToLeftEar(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.equipment["EAR_L"][0] == "string") {
            if (this.equipment["EAR_L"][0] == meshID && this.equipment["EAR_L"][1] == materialID) {
                return 0;
            }
            this.detachEquipmentFromLeftEar();
        }
        this.equipment["EAR_L"][0] = meshID;
        this.equipment["EAR_L"][1] = materialID;
        return this.attachToLeftEar(meshID, materialID, options);
    }
    detachEquipmentFromLeftEar(destroyMesh = true) {
        let result = this.detachMeshID(this.equipment["EAR_L"][0], this.equipment["EAR_L"][1], destroyMesh);
        this.equipment["EAR_L"][0] = null;
        this.equipment["EAR_L"][1] = null;
        return result;
    }
    attachEquipmentToRightEar(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.equipment["EAR_R"][0] == "string") {
            if (this.equipment["EAR_R"][0] == meshID && this.equipment["EAR_R"][1] == materialID) {
                return 0;
            }
            this.detachEquipmentFromRightEar();
        }
        this.equipment["EAR_R"][0] = meshID;
        this.equipment["EAR_R"][1] = materialID;
        return this.attachToRightEar(meshID, materialID, options);
    }
    detachEquipmentFromRightEar(destroyMesh = true) {
        let result = this.detachMeshID(this.equipment["EAR_R"][0], this.equipment["EAR_R"][1], destroyMesh);
        this.equipment["EAR_R"][0] = null;
        this.equipment["EAR_R"][1] = null;
        return result;
    }
    attachEquipmentToNeck(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.equipment["NECK"][0] == "string") {
            if (this.equipment["NECK"][0] == meshID && this.equipment["NECK"][1] == materialID) {
                return 0;
            }
            this.detachEquipmentFromNeck();
        }
        this.equipment["NECK"][0] = meshID;
        this.equipment["NECK"][1] = materialID;
        return this.attachToNeck(meshID, materialID, options);
    }
    detachEquipmentFromNeck(destroyMesh = true) {
        let result = this.detachMeshID(this.equipment["NECK"][0], this.equipment["NECK"][1], destroyMesh);
        this.equipment["NECK"][0] = null;
        this.equipment["NECK"][1] = null;
        return result;
    }
    attachEquipmentToLeftShoulder(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.equipment["SHOULDER_L"][0] == "string") {
            if (this.equipment["SHOULDER_L"][0] == meshID && this.equipment["SHOULDER_L"][1] == materialID) {
                return 0;
            }
            this.detachEquipmentFromLeftShoulder();
        }
        this.equipment["SHOULDER_L"][0] = meshID;
        this.equipment["SHOULDER_L"][1] = materialID;
        return this.attachToLeftShoulder(meshID, materialID, options);
    }
    detachEquipmentFromLeftShoulder(destroyMesh = true) {
        let result = this.detachMeshID(this.equipment["SHOULDER_L"][0], this.equipment["SHOULDER_L"][1], destroyMesh);
        this.equipment["SHOULDER_L"][0] = null;
        this.equipment["SHOULDER_L"][1] = null;
        return result;
    }
    attachEquipmentToRightShoulder(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.equipment["SHOULDER_R"][0] == "string") {
            if (this.equipment["SHOULDER_R"][0] == meshID && this.equipment["SHOULDER_R"][1] == materialID) {
                return 0;
            }
            this.detachEquipmentFromRightShoulder();
        }
        this.equipment["SHOULDER_R"][0] = meshID;
        this.equipment["SHOULDER_R"][1] = materialID;
        return this.attachToRightShoulder(meshID, materialID, options);
    }
    detachEquipmentFromRightShoulder(destroyMesh = true) {
        let result = this.detachMeshID(this.equipment["SHOULDER_R"][0], this.equipment["SHOULDER_R"][1], destroyMesh);
        this.equipment["SHOULDER_R"][0] = null;
        this.equipment["SHOULDER_R"][1] = null;
        return result;
    }
    attachEquipmentToLeftForearm(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.equipment["FOREARM_L"][0] == "string") {
            if (this.equipment["FOREARM_L"][0] == meshID && this.equipment["FOREARM_L"][1] == materialID) {
                return 0;
            }
            this.detachEquipmentFromLeftForearm();
        }
        this.equipment["FOREARM_L"][0] = meshID;
        this.equipment["FOREARM_L"][1] = materialID;
        return this.attachToLeftForearm(meshID, materialID, options);
    }
    detachEquipmentFromLeftForearm(destroyMesh = true) {
        let result = this.detachMeshID(this.equipment["FOREARM_L"][0], this.equipment["FOREARM_L"][1], destroyMesh);
        this.equipment["FOREARM_L"][0] = null;
        this.equipment["FOREARM_L"][1] = null;
        return result;
    }
    attachEquipmentToRightForearm(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.equipment["FOREARM_R"][0] == "string") {
            if (this.equipment["FOREARM_R"][0] == meshID && this.equipment["FOREARM_R"][1] == materialID) {
                return 0;
            }
            this.detachEquipmentFromRightForearm();
        }
        this.equipment["FOREARM_R"][0] = meshID;
        this.equipment["FOREARM_R"][1] = materialID;
        return this.attachToRightForearm(meshID, materialID, options);
    }
    detachEquipmentFromRightForearm(destroyMesh = true) {
        let result = this.detachMeshID(this.equipment["FOREARM_R"][0], this.equipment["FOREARM_R"][1], destroyMesh);
        this.equipment["FOREARM_R"][0] = null;
        this.equipment["FOREARM_R"][1] = null;
        return result;
    }
    attachEquipmentToLeftHand(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.equipment["HAND_L"][0] == "string") {
            if (this.equipment["HAND_L"][0] == meshID && this.equipment["HAND_L"][1] == materialID) {
                return 0;
            }
            this.detachEquipmentFromLeftHand();
        }
        this.equipment["HAND_L"][0] = meshID;
        this.equipment["HAND_L"][1] = materialID;
        return this.attachToLeftHand(meshID, materialID, options);
    }
    detachEquipmentFromLeftHand(destroyMesh = true) {
        let result = this.detachMeshID(this.equipment["HAND_L"][0], this.equipment["HAND_L"][1], destroyMesh);
        this.equipment["HAND_L"][0] = null;
        this.equipment["HAND_L"][1] = null;
        return result;
    }
    attachEquipmentToRightHand(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.equipment["HAND_R"][0] == "string") {
            if (this.equipment["HAND_R"][0] == meshID && this.equipment["HAND_R"][1] == materialID) {
                return 0;
            }
            this.detachEquipmentFromRightHand();
        }
        this.equipment["HAND_R"][0] = meshID;
        this.equipment["HAND_R"][1] = materialID;
        return this.attachToRightHand(meshID, materialID, options);
    }
    detachEquipmentFromRightHand(destroyMesh = true) {
        let result = this.detachMeshID(this.equipment["HAND_R"][0], this.equipment["HAND_R"][1], destroyMesh);
        this.equipment["HAND_R"][0] = null;
        this.equipment["HAND_R"][1] = null;
        return result;
    }
    attachEquipmentToChest(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.equipment["CHEST"][0] == "string") {
            if (this.equipment["CHEST"][0] == meshID && this.equipment["CHEST"][1] == materialID) {
                return 0;
            }
            this.detachEquipmentFromChest();
        }
        this.equipment["CHEST"][0] = meshID;
        this.equipment["CHEST"][1] = materialID;
        return this.attachToChest(meshID, materialID, options);
    }
    detachEquipmentFromChest(destroyMesh = true) {
        let result = this.detachMeshID(this.equipment["CHEST"][0], this.equipment["CHEST"][1], destroyMesh);
        this.equipment["CHEST"][0] = null;
        this.equipment["CHEST"][1] = null;
        return result;
    }
    attachEquipmentToSpine(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.equipment["SPINE"][0] == "string") {
            if (this.equipment["SPINE"][0] == meshID && this.equipment["SPINE"][1] == materialID) {
                return 0;
            }
            this.detachEquipmentFromSpine();
        }
        this.equipment["SPINE"][0] = meshID;
        this.equipment["SPINE"][1] = materialID;
        return this.attachToSpine(meshID, materialID, options);
    }
    detachEquipmentFromSpine(destroyMesh = true) {
        let result = this.detachMeshID(this.equipment["SPINE"][0], this.equipment["SPINE"][1], destroyMesh);
        this.equipment["SPINE"][0] = null;
        this.equipment["SPINE"][1] = null;
        return result;
    }
    attachEquipmentToPelvis(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.equipment["PELVIS"][0] == "string") {
            if (this.equipment["PELVIS"][0] == meshID && this.equipment["PELVIS"][1] == materialID) {
                return 0;
            }
            this.detachEquipmentFromPelvis();
        }
        this.equipment["PELVIS"][0] = meshID;
        this.equipment["PELVIS"][1] = materialID;
        return this.attachToPelvis(meshID, materialID, options);
    }
    detachEquipmentFromPelvis(destroyMesh = true) {
        let result = this.detachMeshID(this.equipment["PELVIS"][0], this.equipment["PELVIS"][1], destroyMesh);
        this.equipment["PELVIS"][0] = null;
        this.equipment["PELVIS"][1] = null;
        return result;
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