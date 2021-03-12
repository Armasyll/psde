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
            return undefined;
        }

        this.helmetVisible = true;
        /**
         * ApparelSlotEnum key, mesh ID, material ID
         * @type {Object.<string, Object.<meshID: string, materialID:string>>}
         * @example {"HEAD":[meshID, materialID]}
         */
        this.attachedEquipment = {};
        this.attachedEquipment["HEAD"] = {};
        this.attachedEquipment["EAR_L"] = {};
        this.attachedEquipment["EAR_R"] = {};
        this.attachedEquipment["NECK"] = {};
        this.attachedEquipment["SHOULDER_L"] = {};
        this.attachedEquipment["SHOULDER_R"] = {};
        this.attachedEquipment["FOREARM_L"] = {};
        this.attachedEquipment["FOREARM_R"] = {};
        this.attachedEquipment["HAND_L"] = {};
        this.attachedEquipment["HAND_R"] = {};
        this.attachedEquipment["CHEST"] = {};
        this.attachedEquipment["PELVIS"] = {};
        this.attachedEquipment["LEGS"] = {};
        this.attachedEquipment["FOOT_L"] = {};
        this.attachedEquipment["FOOT_R"] = {};

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
            this.createAnimationGroupFromAnimatables("idleLyingDeath01", "idleDeath01", 0, false);
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
    updateFromEntity(thatEntity) {
        super.updateFromEntity(thatEntity);
        let thisEntity = Game.getCachedEntity(this.entityID);
        if (thisEntity.hasOwnProperty("equipment") && thatEntity.hasOwnProperty("equipment")) {
            for (let equipmentSlot in thisEntity.equipment) {
                if (thatEntity["equipment"][equipmentSlot] == null) {
                    this.detachEquipmentFromBone(equipmentSlot);
                }
                else if (thisEntity["equipment"][equipmentSlot] == null) {
                    this.attachEquipmentToBone(thatEntity["equipment"][equipmentSlot]["meshID"], thatEntity["equipment"][equipmentSlot]["materialID"], equipmentSlot);
                }
                else if (thisEntity["equipment"][equipmentSlot]["id"] != thatEntity["equipment"][equipmentSlot]["id"]) {
                    this.detachEquipmentFromBone(equipmentSlot);
                    this.attachEquipmentToBone(thatEntity["equipment"][equipmentSlot]["meshID"], thatEntity["equipment"][equipmentSlot]["materialID"], equipmentSlot);
                }
            }
        }
        return 0;
    }
    doPunchRH() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 2;
        }
        return 0;
    }
    doThrustRH() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 1;
        }
        return 0;
    }

    hideHelmet() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 2;
        }
        if (this._meshesAttachedToBones.hasOwnProperty("head")) {
            for (let mesh in this._meshesAttachedToBones["head"]) {
                if (this._meshesAttachedToBones["head"][mesh] instanceof BABYLON.AbstractMesh) {
                    this._meshesAttachedToBones["head"][mesh].isVisible = false;
                }
            }
        }
        this.helmetVisible = false;
        return 0;
    }
    showHelmet() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 2;
        }
        if (this._meshesAttachedToBones.hasOwnProperty("head")) {
            for (let mesh in this._meshesAttachedToBones["head"]) {
                if (this._meshesAttachedToBones["head"][mesh] instanceof BABYLON.AbstractMesh) {
                    this._meshesAttachedToBones["head"][mesh].isVisible = true;
                }
            }
        }
        this.helmetVisible = true;
        return 0;
    }

    detachFromAllBones(destroyMesh = true) {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 2;
        }
        for (let boneID in this._meshesAttachedToBones) {
            if (this.attachedEquipment.hasOwnProperty(boneID)) {
                this.attachedEquipment[boneID]["meshID"] = null;
                this.attachedEquipment[boneID]["materialID"] = null;
            }
        }
        super.detachFromAllBones(destroyMesh);
        return 0;
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
        if (typeof this.attachedEquipment["HEAD"]["meshID"] == "string") {
            if (this.attachedEquipment["HEAD"]["meshID"] == meshID && this.attachedEquipment["HEAD"]["materialID"] == materialID) {
                return 0;
            }
            this.detachEquipmentFromHead();
        }
        this.attachedEquipment["HEAD"]["meshID"] = meshID;
        this.attachedEquipment["HEAD"]["materialID"] = materialID;
        return this.attachToHead(meshID, materialID, options);
    }
    detachEquipmentFromHead(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedEquipment["HEAD"]["meshID"], destroyMesh);
        this.attachedEquipment["HEAD"]["meshID"] = null;
        this.attachedEquipment["HEAD"]["materialID"] = null;
        return result;
    }
    attachEquipmentToLeftEye(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedEquipment["EYE_L"]["meshID"] == "string") {
            if (this.attachedEquipment["EYE_L"]["meshID"] == meshID && this.attachedEquipment["EYE_L"]["materialID"] == materialID) {
                return 0;
            }
            this.detachEquipmentFromLeftEye();
        }
        this.attachedEquipment["EYE_L"]["meshID"] = meshID;
        this.attachedEquipment["EYE_L"]["materialID"] = materialID;
        return this.attachToLeftEye(meshID, materialID, options);
    }
    detachEquipmentFromLeftEye(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedEquipment["EYE_L"]["meshID"], destroyMesh);
        this.attachedEquipment["EYE_L"]["meshID"] = null;
        this.attachedEquipment["EYE_L"]["materialID"] = null;
        return result;
    }
    attachEquipmentToRightEye(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedEquipment["EYE_R"]["meshID"] == "string") {
            if (this.attachedEquipment["EYE_R"]["meshID"] == meshID && this.attachedEquipment["EYE_R"]["materialID"] == materialID) {
                return 0;
            }
            this.detachEquipmentFromRightEye();
        }
        this.attachedEquipment["EYE_R"]["meshID"] = meshID;
        this.attachedEquipment["EYE_R"]["materialID"] = materialID;
        return this.attachToRightEye(meshID, materialID, options);
    }
    detachEquipmentFromRightEye(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedEquipment["EYE_R"]["meshID"], destroyMesh);
        this.attachedEquipment["EYE_R"]["meshID"] = null;
        this.attachedEquipment["EYE_R"]["materialID"] = null;
        return result;
    }
    attachEquipmentToLeftEar(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedEquipment["EAR_L"]["meshID"] == "string") {
            if (this.attachedEquipment["EAR_L"]["meshID"] == meshID && this.attachedEquipment["EAR_L"]["materialID"] == materialID) {
                return 0;
            }
            this.detachEquipmentFromLeftEar();
        }
        this.attachedEquipment["EAR_L"]["meshID"] = meshID;
        this.attachedEquipment["EAR_L"]["materialID"] = materialID;
        return this.attachToLeftEar(meshID, materialID, options);
    }
    detachEquipmentFromLeftEar(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedEquipment["EAR_L"]["meshID"], destroyMesh);
        this.attachedEquipment["EAR_L"]["meshID"] = null;
        this.attachedEquipment["EAR_L"]["materialID"] = null;
        return result;
    }
    attachEquipmentToRightEar(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedEquipment["EAR_R"]["meshID"] == "string") {
            if (this.attachedEquipment["EAR_R"]["meshID"] == meshID && this.attachedEquipment["EAR_R"]["materialID"] == materialID) {
                return 0;
            }
            this.detachEquipmentFromRightEar();
        }
        this.attachedEquipment["EAR_R"]["meshID"] = meshID;
        this.attachedEquipment["EAR_R"]["materialID"] = materialID;
        return this.attachToRightEar(meshID, materialID, options);
    }
    detachEquipmentFromRightEar(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedEquipment["EAR_R"]["meshID"], destroyMesh);
        this.attachedEquipment["EAR_R"]["meshID"] = null;
        this.attachedEquipment["EAR_R"]["materialID"] = null;
        return result;
    }
    attachEquipmentToNeck(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedEquipment["NECK"]["meshID"] == "string") {
            if (this.attachedEquipment["NECK"]["meshID"] == meshID && this.attachedEquipment["NECK"]["materialID"] == materialID) {
                return 0;
            }
            this.detachEquipmentFromNeck();
        }
        this.attachedEquipment["NECK"]["meshID"] = meshID;
        this.attachedEquipment["NECK"]["materialID"] = materialID;
        return this.attachToNeck(meshID, materialID, options);
    }
    detachEquipmentFromNeck(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedEquipment["NECK"]["meshID"], destroyMesh);
        this.attachedEquipment["NECK"]["meshID"] = null;
        this.attachedEquipment["NECK"]["materialID"] = null;
        return result;
    }
    attachEquipmentToLeftShoulder(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedEquipment["SHOULDER_L"]["meshID"] == "string") {
            if (this.attachedEquipment["SHOULDER_L"]["meshID"] == meshID && this.attachedEquipment["SHOULDER_L"]["materialID"] == materialID) {
                return 0;
            }
            this.detachEquipmentFromLeftShoulder();
        }
        this.attachedEquipment["SHOULDER_L"]["meshID"] = meshID;
        this.attachedEquipment["SHOULDER_L"]["materialID"] = materialID;
        return this.attachToLeftShoulder(meshID, materialID, options);
    }
    detachEquipmentFromLeftShoulder(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedEquipment["SHOULDER_L"]["meshID"], destroyMesh);
        this.attachedEquipment["SHOULDER_L"]["meshID"] = null;
        this.attachedEquipment["SHOULDER_L"]["materialID"] = null;
        return result;
    }
    attachEquipmentToRightShoulder(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedEquipment["SHOULDER_R"]["meshID"] == "string") {
            if (this.attachedEquipment["SHOULDER_R"]["meshID"] == meshID && this.attachedEquipment["SHOULDER_R"]["materialID"] == materialID) {
                return 0;
            }
            this.detachEquipmentFromRightShoulder();
        }
        this.attachedEquipment["SHOULDER_R"]["meshID"] = meshID;
        this.attachedEquipment["SHOULDER_R"]["materialID"] = materialID;
        return this.attachToRightShoulder(meshID, materialID, options);
    }
    detachEquipmentFromRightShoulder(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedEquipment["SHOULDER_R"]["meshID"], destroyMesh);
        this.attachedEquipment["SHOULDER_R"]["meshID"] = null;
        this.attachedEquipment["SHOULDER_R"]["materialID"] = null;
        return result;
    }
    attachEquipmentToLeftForearm(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedEquipment["FOREARM_L"]["meshID"] == "string") {
            if (this.attachedEquipment["FOREARM_L"]["meshID"] == meshID && this.attachedEquipment["FOREARM_L"]["materialID"] == materialID) {
                return 0;
            }
            this.detachEquipmentFromLeftForearm();
        }
        this.attachedEquipment["FOREARM_L"]["meshID"] = meshID;
        this.attachedEquipment["FOREARM_L"]["materialID"] = materialID;
        return this.attachToLeftForearm(meshID, materialID, options);
    }
    detachEquipmentFromLeftForearm(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedEquipment["FOREARM_L"]["meshID"], destroyMesh);
        this.attachedEquipment["FOREARM_L"]["meshID"] = null;
        this.attachedEquipment["FOREARM_L"]["materialID"] = null;
        return result;
    }
    attachEquipmentToRightForearm(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedEquipment["FOREARM_R"]["meshID"] == "string") {
            if (this.attachedEquipment["FOREARM_R"]["meshID"] == meshID && this.attachedEquipment["FOREARM_R"]["materialID"] == materialID) {
                return 0;
            }
            this.detachEquipmentFromRightForearm();
        }
        this.attachedEquipment["FOREARM_R"]["meshID"] = meshID;
        this.attachedEquipment["FOREARM_R"]["materialID"] = materialID;
        return this.attachToRightForearm(meshID, materialID, options);
    }
    detachEquipmentFromRightForearm(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedEquipment["FOREARM_R"]["meshID"], destroyMesh);
        this.attachedEquipment["FOREARM_R"]["meshID"] = null;
        this.attachedEquipment["FOREARM_R"]["materialID"] = null;
        return result;
    }
    attachEquipmentToLeftHand(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedEquipment["HAND_L"]["meshID"] == "string") {
            if (this.attachedEquipment["HAND_L"]["meshID"] == meshID && this.attachedEquipment["HAND_L"]["materialID"] == materialID) {
                return 0;
            }
            this.detachEquipmentFromLeftHand();
        }
        this.attachedEquipment["HAND_L"]["meshID"] = meshID;
        this.attachedEquipment["HAND_L"]["materialID"] = materialID;
        return this.attachToLeftHand(meshID, materialID, options);
    }
    detachEquipmentFromLeftHand(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedEquipment["HAND_L"]["meshID"], destroyMesh);
        this.attachedEquipment["HAND_L"]["meshID"] = null;
        this.attachedEquipment["HAND_L"]["materialID"] = null;
        return result;
    }
    attachEquipmentToRightHand(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedEquipment["HAND_R"]["meshID"] == "string") {
            if (this.attachedEquipment["HAND_R"]["meshID"] == meshID && this.attachedEquipment["HAND_R"]["materialID"] == materialID) {
                return 0;
            }
            this.detachEquipmentFromRightHand();
        }
        this.attachedEquipment["HAND_R"]["meshID"] = meshID;
        this.attachedEquipment["HAND_R"]["materialID"] = materialID;
        return this.attachToRightHand(meshID, materialID, options);
    }
    detachEquipmentFromRightHand(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedEquipment["HAND_R"]["meshID"], destroyMesh);
        this.attachedEquipment["HAND_R"]["meshID"] = null;
        this.attachedEquipment["HAND_R"]["materialID"] = null;
        return result;
    }
    attachEquipmentToChest(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedEquipment["CHEST"]["meshID"] == "string") {
            if (this.attachedEquipment["CHEST"]["meshID"] == meshID && this.attachedEquipment["CHEST"]["materialID"] == materialID) {
                return 0;
            }
            this.detachEquipmentFromChest();
        }
        this.attachedEquipment["CHEST"]["meshID"] = meshID;
        this.attachedEquipment["CHEST"]["materialID"] = materialID;
        return this.attachToChest(meshID, materialID, options);
    }
    detachEquipmentFromChest(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedEquipment["CHEST"]["meshID"], destroyMesh);
        this.attachedEquipment["CHEST"]["meshID"] = null;
        this.attachedEquipment["CHEST"]["materialID"] = null;
        return result;
    }
    attachEquipmentToSpine(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedEquipment["SPINE"]["meshID"] == "string") {
            if (this.attachedEquipment["SPINE"]["meshID"] == meshID && this.attachedEquipment["SPINE"]["materialID"] == materialID) {
                return 0;
            }
            this.detachEquipmentFromSpine();
        }
        this.attachedEquipment["SPINE"]["meshID"] = meshID;
        this.attachedEquipment["SPINE"]["materialID"] = materialID;
        return this.attachToSpine(meshID, materialID, options);
    }
    detachEquipmentFromSpine(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedEquipment["SPINE"]["meshID"], destroyMesh);
        this.attachedEquipment["SPINE"]["meshID"] = null;
        this.attachedEquipment["SPINE"]["materialID"] = null;
        return result;
    }
    attachEquipmentToPelvis(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedEquipment["PELVIS"]["meshID"] == "string") {
            if (this.attachedEquipment["PELVIS"]["meshID"] == meshID && this.attachedEquipment["PELVIS"]["materialID"] == materialID) {
                return 0;
            }
            this.detachEquipmentFromPelvis();
        }
        this.attachedEquipment["PELVIS"]["meshID"] = meshID;
        this.attachedEquipment["PELVIS"]["materialID"] = materialID;
        return this.attachToPelvis(meshID, materialID, options);
    }
    detachEquipmentFromPelvis(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedEquipment["PELVIS"]["meshID"], destroyMesh);
        this.attachedEquipment["PELVIS"]["meshID"] = null;
        this.attachedEquipment["PELVIS"]["materialID"] = null;
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