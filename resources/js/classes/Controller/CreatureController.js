/**
 * Creature Controller
 */
class CreatureController extends EntityController {
    /**
     * Creates a Creature Controller
     * @param {string} id 
     * @param {BABYLON.AbstractMesh} mesh 
     * @param {object} entityObject 
     */
    constructor(id = "", mesh = null, entityObject = {}) {
        if (EntityController.debugMode) console.group(`Creating new CreatureController(${id}, meshObject, entityObject)`);
        super(id, mesh, entityObject);
        if (!this.hasMesh()) {
            return undefined;
        }

        this.targetRayVector3 = BABYLON.Vector3.Zero();
        this.lookController = null;
        this.dead = false;
        this.jumping = false;
        this.standing = true;
        this.crouching = false;
        this.sitting = false;
        this.lying = false;
        this.climbing = false; // Ladder
        this.walking = false; // While Standing or Crouching
        this.running = false; // While Standing
        this.sprinting = false; // While Standing
        this.attacking = false; // While Standing Idle, Crouching Idle, Standing Walking, or Crouching Walking
        this.canTransition = true;

        this.attachedOrgans = {};
        this.attachedOrgans["HEAD"] = {};
        this.attachedOrgans["EAR_L"] = {};
        this.attachedOrgans["EAR_R"] = {};
        this.attachedOrgans["EYE_L"] = {};
        this.attachedOrgans["EYE_R"] = {};
        this.attachedOrgans["NECK"] = {};
        this.attachedOrgans["SHOULDER_L"] = {};
        this.attachedOrgans["SHOULDER_R"] = {};
        this.attachedOrgans["FOREARM_L"] = {};
        this.attachedOrgans["FOREARM_R"] = {};
        this.attachedOrgans["HAND_L"] = {};
        this.attachedOrgans["HAND_R"] = {};
        this.attachedOrgans["CHEST"] = {};
        this.attachedOrgans["PELVIS"] = {};
        this.attachedOrgans["LEGS"] = {};
        this.attachedOrgans["FOOT_L"] = {};
        this.attachedOrgans["FOOT_R"] = {};
        this.attachedCosmetics = {};
        this.attachedCosmetics["HEAD"] = {};
        this.attachedCosmetics["EAR_L"] = {};
        this.attachedCosmetics["EAR_R"] = {};
        this.attachedCosmetics["EYE_L"] = {};
        this.attachedCosmetics["EYE_R"] = {};
        this.attachedCosmetics["NECK"] = {};
        this.attachedCosmetics["SHOULDER_L"] = {};
        this.attachedCosmetics["SHOULDER_R"] = {};
        this.attachedCosmetics["FOREARM_L"] = {};
        this.attachedCosmetics["FOREARM_R"] = {};
        this.attachedCosmetics["HAND_L"] = {};
        this.attachedCosmetics["HAND_R"] = {};
        this.attachedCosmetics["CHEST"] = {};
        this.attachedCosmetics["PELVIS"] = {};
        this.attachedCosmetics["LEGS"] = {};
        this.attachedCosmetics["FOOT_L"] = {};
        this.attachedCosmetics["FOOT_R"] = {};
        this.bones["head"] = null;
        /**
         * @type {EyeEnum}
         */
        this.eyeType = 0;
        this.eyeImageID = "circularEye";
        this.eyeBackground = "#FFFFFF";
        this.eyeColour = "#C3C3C3";

        if (this.skeleton instanceof BABYLON.Skeleton) {
            this.skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
            this.skeleton.animationPropertiesOverride.enableBlending = true;
            this.skeleton.animationPropertiesOverride.blendingSpeed = 1.0;
            this.bones["head"] = this.getBoneByName("head") || null;
        }

        this.key = new ControllerMovementKey();
        this.prevKey = this.key.clone();

        this.target = null;

        this.offensiveStance = OffensiveStanceEnum.MARTIAL;
        CreatureController.set(this.id, this);
        if (EntityController.debugMode) console.info(`Finished creating new CreatureController(${this.id})`);
        if (EntityController.debugMode) console.groupEnd();
    }

    attachToHead(meshID, textureID, options) {
        return this.attachMeshIDToBone(meshID, textureID, "head", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), options);
    }
    detachFromHead() {
        return this.detachAllFromBone("head");
    }
    attachToLeftEye(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "eye.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(-90), 0, 0), undefined, options);
    }
    detachFromLeftEye() {
        return this.detachAllFromBone("eye.l");
    }
    attachToRightEye(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "eye.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(-90), 0, 0), undefined, options);
    }
    detachFromRightEye() {
        return this.detachAllFromBone("eye.r");
    }
    attachToLeftEar(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "ear.l", undefined, undefined, undefined, options);
    }
    detachFromLeftEar() {
        return this.detachAllFromBone("ear.l");
    }
    attachToRightEar(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "ear.r", undefined, undefined, undefined, options);
    }
    detachFromRightEar() {
        return this.detachAllFromBone("ear.r");
    }
    attachToNeck(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "neck", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), undefined, options);
    }
    detachFromNeck() {
        return this.detachAllFromBone("neck");
    }
    attachToLeftShoulder(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "shoulder.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(315), BABYLON.Tools.ToRadians(120)), undefined, options);
    }
    detachFromLeftShoulder() {
        return this.detachAllFromBone("shoulder.l");
    }
    attachToRightShoulder(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "shoulder.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(225), BABYLON.Tools.ToRadians(60)), undefined, options);
    }
    detachFromRightShoulder() {
        return this.detachAllFromBone("shoulder.r");
    }
    attachToLeftForearm(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "forearm.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), undefined, options);
    }
    detachFromLeftForearm() {
        return this.detachAllFromBone("forearm.l");
    }
    attachToRightForearm(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "forearm.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(120), BABYLON.Tools.ToRadians(-90)), undefined, options);
    }
    detachFromRightForearm() {
        return this.detachAllFromBone("forearm.r");
    }
    attachToLeftHand(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "hand.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(90)), undefined, options);
    }
    detachFromLeftHand() {
        return this.detachAllFromBone("hand.l");
    }
    attachToRightHand(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "hand.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(90)), undefined, options);
    }
    detachFromRightHand() {
        return this.detachAllFromBone("hand.r");
    }
    attachToChest(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "chest", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), undefined, options);
    }
    detachFromChest() {
        return this.detachAllFromBone("chest");
    }
    attachToSpine(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "spine", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), undefined, options);
    }
    detachFromSpine() {
        return this.detachAllFromBone("spine");
    }
    attachToPelvis(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "pelvis", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), undefined, options);
    }
    detachFromPelvis() {
        return this.detachAllFromBone("pelvis");
    }

    attachOrganToBone(meshID, materialID, boneID, options) {
        let result = 0;
        switch (boneID) {
            case "head":
            case "HEAD": {
                result = this.attachOrganToHead(meshID, materialID, options);
                break;
            }
            case "ear.l":
            case "EAR_L": {
                result = this.attachOrganToLeftEar(meshID, materialID, options);
                break;
            }
            case "ear.r":
            case "EAR_R": {
                result = this.attachOrganToRightEar(meshID, materialID, options);
                break;
            }
            case "neck":
            case "NECK": {
                result = this.attachOrganToNeck(meshID, materialID, options);
                break;
            }
            case "shoulder.l":
            case "SHOULDER_L": {
                result = this.attachOrganToLeftShoulder(meshID, materialID, options);
                break;
            }
            case "shoulder.r":
            case "SHOULDER_R": {
                result = this.attachOrganToRightShoulder(meshID, materialID, options);
                break;
            }
            case "forearm.l":
            case "FOREARM_L": {
                result = this.attachOrganToLeftForearm(meshID, materialID, options);
                break;
            }
            case "forearm.r":
            case "FOREARM_R": {
                result = this.attachOrganToRightForearm(meshID, materialID, options);
                break;
            }
            case "hand.l":
            case "HAND_L": {
                result = this.attachOrganToLeftHand(meshID, materialID, options);
                break;
            }
            case "hand.r":
            case "HAND_R": {
                result = this.attachOrganToRightHand(meshID, materialID, options);
                break;
            }
            default: {
                result = 1;
            }
        }
        return result;
    }
    detachOrganFromBone(boneID, destroyMesh = true) {
        let result = 0;
        switch (boneID) {
            case "head":
            case "HEAD": {
                result = this.detachOrganFromHead(destroyMesh);
                break;
            }
            case "ear.l":
            case "EAR_L": {
                result = this.detachOrganFromLeftEar(destroyMesh);
                break;
            }
            case "ear.r":
            case "EAR_R": {
                result = this.detachOrganFromRightEar(destroyMesh);
                break;
            }
            case "neck":
            case "NECK": {
                result = this.detachOrganFromNeck(destroyMesh);
                break;
            }
            case "shoulder.l":
            case "SHOULDER_L": {
                result = this.detachOrganFromLeftShoulder(destroyMesh);
                break;
            }
            case "shoulder.r":
            case "SHOULDER_R": {
                result = this.detachOrganFromRightShoulder(destroyMesh);
                break;
            }
            case "forearm.l":
            case "FOREARM_L": {
                result = this.detachOrganFromLeftForearm(destroyMesh);
                break;
            }
            case "forearm.r":
            case "FOREARM_R": {
                result = this.detachOrganFromRightForearm(destroyMesh);
                break;
            }
            case "hand.l":
            case "HAND_L": {
                result = this.detachOrganFromLeftHand(destroyMesh);
                break;
            }
            case "hand.r":
            case "HAND_R": {
                result = this.detachOrganFromRightHand(destroyMesh);
                break;
            }
            default: {
                result = 1;
            }
        }
        return result;
    }
    attachOrganToHead(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedOrgans["HEAD"]["meshID"] == "string") {
            if (this.attachedOrgans["HEAD"]["meshID"] == meshID && this.attachedOrgans["HEAD"]["materialID"] == materialID) {
                return 0;
            }
            this.detachOrganFromHead();
        }
        this.attachedOrgans["HEAD"]["meshID"] = meshID;
        this.attachedOrgans["HEAD"]["materialID"] = materialID;
        return this.attachToHead(meshID, materialID, options);
    }
    detachOrganFromHead(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedOrgans["HEAD"]["meshID"], destroyMesh);
        this.attachedOrgans["HEAD"]["meshID"] = null;
        this.attachedOrgans["HEAD"]["materialID"] = null;
        return result;
    }
    attachOrganToLeftEye(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedOrgans["EYE_L"]["meshID"] == "string") {
            if (this.attachedOrgans["EYE_L"]["meshID"] == meshID && this.attachedOrgans["EYE_L"]["materialID"] == materialID) {
                return 0;
            }
            this.detachOrganFromLeftEye();
        }
        this.attachedOrgans["EYE_L"]["meshID"] = meshID;
        this.attachedOrgans["EYE_L"]["materialID"] = materialID;
        return this.attachToLeftEye(meshID, materialID, options);
    }
    detachOrganFromLeftEye(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedOrgans["EYE_L"]["meshID"], destroyMesh);
        this.attachedOrgans["EYE_L"]["meshID"] = null;
        this.attachedOrgans["EYE_L"]["materialID"] = null;
        return result;
    }
    attachOrganToRightEye(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedOrgans["EYE_R"]["meshID"] == "string") {
            if (this.attachedOrgans["EYE_R"]["meshID"] == meshID && this.attachedOrgans["EYE_R"]["materialID"] == materialID) {
                return 0;
            }
            this.detachOrganFromRightEye();
        }
        this.attachedOrgans["EYE_R"]["meshID"] = meshID;
        this.attachedOrgans["EYE_R"]["materialID"] = materialID;
        return this.attachToRightEye(meshID, materialID, options);
    }
    detachOrganFromRightEye(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedOrgans["EYE_R"]["meshID"], destroyMesh);
        this.attachedOrgans["EYE_R"]["meshID"] = null;
        this.attachedOrgans["EYE_R"]["materialID"] = null;
        return result;
    }
    attachOrganToLeftEar(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedOrgans["EAR_L"]["meshID"] == "string") {
            if (this.attachedOrgans["EAR_L"]["meshID"] == meshID && this.attachedOrgans["EAR_L"]["materialID"] == materialID) {
                return 0;
            }
            this.detachOrganFromLeftEar();
        }
        this.attachedOrgans["EAR_L"]["meshID"] = meshID;
        this.attachedOrgans["EAR_L"]["materialID"] = materialID;
        return this.attachToLeftEar(meshID, materialID, options);
    }
    detachOrganFromLeftEar(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedOrgans["EAR_L"]["meshID"], destroyMesh);
        this.attachedOrgans["EAR_L"]["meshID"] = null;
        this.attachedOrgans["EAR_L"]["materialID"] = null;
        return result;
    }
    attachOrganToRightEar(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedOrgans["EAR_R"]["meshID"] == "string") {
            if (this.attachedOrgans["EAR_R"]["meshID"] == meshID && this.attachedOrgans["EAR_R"]["materialID"] == materialID) {
                return 0;
            }
            this.detachOrganFromRightEar();
        }
        this.attachedOrgans["EAR_R"]["meshID"] = meshID;
        this.attachedOrgans["EAR_R"]["materialID"] = materialID;
        return this.attachToRightEar(meshID, materialID, options);
    }
    detachOrganFromRightEar(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedOrgans["EAR_R"]["meshID"], destroyMesh);
        this.attachedOrgans["EAR_R"]["meshID"] = null;
        this.attachedOrgans["EAR_R"]["materialID"] = null;
        return result;
    }
    attachOrganToNeck(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedOrgans["NECK"]["meshID"] == "string") {
            if (this.attachedOrgans["NECK"]["meshID"] == meshID && this.attachedOrgans["NECK"]["materialID"] == materialID) {
                return 0;
            }
            this.detachOrganFromNeck();
        }
        this.attachedOrgans["NECK"]["meshID"] = meshID;
        this.attachedOrgans["NECK"]["materialID"] = materialID;
        return this.attachToNeck(meshID, materialID, options);
    }
    detachOrganFromNeck(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedOrgans["NECK"]["meshID"], destroyMesh);
        this.attachedOrgans["NECK"]["meshID"] = null;
        this.attachedOrgans["NECK"]["materialID"] = null;
        return result;
    }
    attachOrganToLeftShoulder(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedOrgans["SHOULDER_L"]["meshID"] == "string") {
            if (this.attachedOrgans["SHOULDER_L"]["meshID"] == meshID && this.attachedOrgans["SHOULDER_L"]["materialID"] == materialID) {
                return 0;
            }
            this.detachOrganFromLeftShoulder();
        }
        this.attachedOrgans["SHOULDER_L"]["meshID"] = meshID;
        this.attachedOrgans["SHOULDER_L"]["materialID"] = materialID;
        return this.attachToLeftShoulder(meshID, materialID, options);
    }
    detachOrganFromLeftShoulder(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedOrgans["SHOULDER_L"]["meshID"], destroyMesh);
        this.attachedOrgans["SHOULDER_L"]["meshID"] = null;
        this.attachedOrgans["SHOULDER_L"]["materialID"] = null;
        return result;
    }
    attachOrganToRightShoulder(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedOrgans["SHOULDER_R"]["meshID"] == "string") {
            if (this.attachedOrgans["SHOULDER_R"]["meshID"] == meshID && this.attachedOrgans["SHOULDER_R"]["materialID"] == materialID) {
                return 0;
            }
            this.detachOrganFromRightShoulder();
        }
        this.attachedOrgans["SHOULDER_R"]["meshID"] = meshID;
        this.attachedOrgans["SHOULDER_R"]["materialID"] = materialID;
        return this.attachToRightShoulder(meshID, materialID, options);
    }
    detachOrganFromRightShoulder(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedOrgans["SHOULDER_R"]["meshID"], destroyMesh);
        this.attachedOrgans["SHOULDER_R"]["meshID"] = null;
        this.attachedOrgans["SHOULDER_R"]["materialID"] = null;
        return result;
    }
    attachOrganToLeftForearm(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedOrgans["FOREARM_L"]["meshID"] == "string") {
            if (this.attachedOrgans["FOREARM_L"]["meshID"] == meshID && this.attachedOrgans["FOREARM_L"]["materialID"] == materialID) {
                return 0;
            }
            this.detachOrganFromLeftForearm();
        }
        this.attachedOrgans["FOREARM_L"]["meshID"] = meshID;
        this.attachedOrgans["FOREARM_L"]["materialID"] = materialID;
        return this.attachToLeftForearm(meshID, materialID, options);
    }
    detachOrganFromLeftForearm(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedOrgans["FOREARM_L"]["meshID"], destroyMesh);
        this.attachedOrgans["FOREARM_L"]["meshID"] = null;
        this.attachedOrgans["FOREARM_L"]["materialID"] = null;
        return result;
    }
    attachOrganToRightForearm(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedOrgans["FOREARM_R"]["meshID"] == "string") {
            if (this.attachedOrgans["FOREARM_R"]["meshID"] == meshID && this.attachedOrgans["FOREARM_R"]["materialID"] == materialID) {
                return 0;
            }
            this.detachOrganFromRightForearm();
        }
        this.attachedOrgans["FOREARM_R"]["meshID"] = meshID;
        this.attachedOrgans["FOREARM_R"]["materialID"] = materialID;
        return this.attachToRightForearm(meshID, materialID, options);
    }
    detachOrganFromRightForearm(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedOrgans["FOREARM_R"]["meshID"], destroyMesh);
        this.attachedOrgans["FOREARM_R"]["meshID"] = null;
        this.attachedOrgans["FOREARM_R"]["materialID"] = null;
        return result;
    }
    attachOrganToLeftHand(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedOrgans["HAND_L"]["meshID"] == "string") {
            if (this.attachedOrgans["HAND_L"]["meshID"] == meshID && this.attachedOrgans["HAND_L"]["materialID"] == materialID) {
                return 0;
            }
            this.detachOrganFromLeftHand();
        }
        this.attachedOrgans["HAND_L"]["meshID"] = meshID;
        this.attachedOrgans["HAND_L"]["materialID"] = materialID;
        return this.attachToLeftHand(meshID, materialID, options);
    }
    detachOrganFromLeftHand(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedOrgans["HAND_L"]["meshID"], destroyMesh);
        this.attachedOrgans["HAND_L"]["meshID"] = null;
        this.attachedOrgans["HAND_L"]["materialID"] = null;
        return result;
    }
    attachOrganToRightHand(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedOrgans["HAND_R"]["meshID"] == "string") {
            if (this.attachedOrgans["HAND_R"]["meshID"] == meshID && this.attachedOrgans["HAND_R"]["materialID"] == materialID) {
                return 0;
            }
            this.detachOrganFromRightHand();
        }
        this.attachedOrgans["HAND_R"]["meshID"] = meshID;
        this.attachedOrgans["HAND_R"]["materialID"] = materialID;
        return this.attachToRightHand(meshID, materialID, options);
    }
    detachOrganFromRightHand(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedOrgans["HAND_R"]["meshID"], destroyMesh);
        this.attachedOrgans["HAND_R"]["meshID"] = null;
        this.attachedOrgans["HAND_R"]["materialID"] = null;
        return result;
    }
    attachOrganToChest(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedOrgans["CHEST"]["meshID"] == "string") {
            if (this.attachedOrgans["CHEST"]["meshID"] == meshID && this.attachedOrgans["CHEST"]["materialID"] == materialID) {
                return 0;
            }
            this.detachOrganFromChest();
        }
        this.attachedOrgans["CHEST"]["meshID"] = meshID;
        this.attachedOrgans["CHEST"]["materialID"] = materialID;
        return this.attachToChest(meshID, materialID, options);
    }
    detachOrganFromChest(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedOrgans["CHEST"]["meshID"], destroyMesh);
        this.attachedOrgans["CHEST"]["meshID"] = null;
        this.attachedOrgans["CHEST"]["materialID"] = null;
        return result;
    }
    attachOrganToSpine(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedOrgans["SPINE"]["meshID"] == "string") {
            if (this.attachedOrgans["SPINE"]["meshID"] == meshID && this.attachedOrgans["SPINE"]["materialID"] == materialID) {
                return 0;
            }
            this.detachOrganFromSpine();
        }
        this.attachedOrgans["SPINE"]["meshID"] = meshID;
        this.attachedOrgans["SPINE"]["materialID"] = materialID;
        return this.attachToSpine(meshID, materialID, options);
    }
    detachOrganFromSpine(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedOrgans["SPINE"]["meshID"], destroyMesh);
        this.attachedOrgans["SPINE"]["meshID"] = null;
        this.attachedOrgans["SPINE"]["materialID"] = null;
        return result;
    }
    attachOrganToPelvis(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedOrgans["PELVIS"]["meshID"] == "string") {
            if (this.attachedOrgans["PELVIS"]["meshID"] == meshID && this.attachedOrgans["PELVIS"]["materialID"] == materialID) {
                return 0;
            }
            this.detachOrganFromPelvis();
        }
        this.attachedOrgans["PELVIS"]["meshID"] = meshID;
        this.attachedOrgans["PELVIS"]["materialID"] = materialID;
        return this.attachToPelvis(meshID, materialID, options);
    }
    detachOrganFromPelvis(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedOrgans["PELVIS"]["meshID"], destroyMesh);
        this.attachedOrgans["PELVIS"]["meshID"] = null;
        this.attachedOrgans["PELVIS"]["materialID"] = null;
        return result;
    }

    attachCosmeticToBone(meshID, materialID, boneID, options) {
        let result = 0;
        switch (boneID) {
            case "head":
            case "HEAD": {
                result = this.attachCosmeticToHead(meshID, materialID, options);
                break;
            }
            case "ear.l":
            case "EAR_L": {
                result = this.attachCosmeticToLeftEar(meshID, materialID, options);
                break;
            }
            case "ear.r":
            case "EAR_R": {
                result = this.attachCosmeticToRightEar(meshID, materialID, options);
                break;
            }
            case "neck":
            case "NECK": {
                result = this.attachCosmeticToNeck(meshID, materialID, options);
                break;
            }
            case "shoulder.l":
            case "SHOULDER_L": {
                result = this.attachCosmeticToLeftShoulder(meshID, materialID, options);
                break;
            }
            case "shoulder.r":
            case "SHOULDER_R": {
                result = this.attachCosmeticToRightShoulder(meshID, materialID, options);
                break;
            }
            case "forearm.l":
            case "FOREARM_L": {
                result = this.attachCosmeticToLeftForearm(meshID, materialID, options);
                break;
            }
            case "forearm.r":
            case "FOREARM_R": {
                result = this.attachCosmeticToRightForearm(meshID, materialID, options);
                break;
            }
            case "hand.l":
            case "HAND_L": {
                result = this.attachCosmeticToLeftHand(meshID, materialID, options);
                break;
            }
            case "hand.r":
            case "HAND_R": {
                result = this.attachCosmeticToRightHand(meshID, materialID, options);
                break;
            }
            default: {
                result = 1;
            }
        }
        return result;
    }
    detachCosmeticFromBone(boneID, destroyMesh = true) {
        let result = 0;
        switch (boneID) {
            case "head":
            case "HEAD": {
                result = this.detachCosmeticFromHead(destroyMesh);
                break;
            }
            case "ear.l":
            case "EAR_L": {
                result = this.detachCosmeticFromLeftEar(destroyMesh);
                break;
            }
            case "ear.r":
            case "EAR_R": {
                result = this.detachCosmeticFromRightEar(destroyMesh);
                break;
            }
            case "neck":
            case "NECK": {
                result = this.detachCosmeticFromNeck(destroyMesh);
                break;
            }
            case "shoulder.l":
            case "SHOULDER_L": {
                result = this.detachCosmeticFromLeftShoulder(destroyMesh);
                break;
            }
            case "shoulder.r":
            case "SHOULDER_R": {
                result = this.detachCosmeticFromRightShoulder(destroyMesh);
                break;
            }
            case "forearm.l":
            case "FOREARM_L": {
                result = this.detachCosmeticFromLeftForearm(destroyMesh);
                break;
            }
            case "forearm.r":
            case "FOREARM_R": {
                result = this.detachCosmeticFromRightForearm(destroyMesh);
                break;
            }
            case "hand.l":
            case "HAND_L": {
                result = this.detachCosmeticFromLeftHand(destroyMesh);
                break;
            }
            case "hand.r":
            case "HAND_R": {
                result = this.detachCosmeticFromRightHand(destroyMesh);
                break;
            }
            default: {
                result = 1;
            }
        }
        return result;
    }
    attachCosmeticToHead(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedCosmetics["HEAD"]["meshID"] == "string") {
            if (this.attachedCosmetics["HEAD"]["meshID"] == meshID && this.attachedCosmetics["HEAD"]["materialID"] == materialID) {
                return 0;
            }
            this.detachCosmeticFromHead();
        }
        this.attachedCosmetics["HEAD"]["meshID"] = meshID;
        this.attachedCosmetics["HEAD"]["materialID"] = materialID;
        return this.attachToHead(meshID, materialID, options);
    }
    detachCosmeticFromHead(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedCosmetics["HEAD"]["meshID"], destroyMesh);
        this.attachedCosmetics["HEAD"]["meshID"] = null;
        this.attachedCosmetics["HEAD"]["materialID"] = null;
        return result;
    }
    attachCosmeticToLeftEye(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedCosmetics["EYE_L"]["meshID"] == "string") {
            if (this.attachedCosmetics["EYE_L"]["meshID"] == meshID && this.attachedCosmetics["EYE_L"]["materialID"] == materialID) {
                return 0;
            }
            this.detachCosmeticFromLeftEye();
        }
        this.attachedCosmetics["EYE_L"]["meshID"] = meshID;
        this.attachedCosmetics["EYE_L"]["materialID"] = materialID;
        return this.attachToLeftEye(meshID, materialID, options);
    }
    detachCosmeticFromLeftEye(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedCosmetics["EYE_L"]["meshID"], destroyMesh);
        this.attachedCosmetics["EYE_L"]["meshID"] = null;
        this.attachedCosmetics["EYE_L"]["materialID"] = null;
        return result;
    }
    attachCosmeticToRightEye(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedCosmetics["EYE_R"]["meshID"] == "string") {
            if (this.attachedCosmetics["EYE_R"]["meshID"] == meshID && this.attachedCosmetics["EYE_R"]["materialID"] == materialID) {
                return 0;
            }
            this.detachCosmeticFromRightEye();
        }
        this.attachedCosmetics["EYE_R"]["meshID"] = meshID;
        this.attachedCosmetics["EYE_R"]["materialID"] = materialID;
        return this.attachToRightEye(meshID, materialID, options);
    }
    detachCosmeticFromRightEye(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedCosmetics["EYE_R"]["meshID"], destroyMesh);
        this.attachedCosmetics["EYE_R"]["meshID"] = null;
        this.attachedCosmetics["EYE_R"]["materialID"] = null;
        return result;
    }
    attachCosmeticToLeftEar(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedCosmetics["EAR_L"]["meshID"] == "string") {
            if (this.attachedCosmetics["EAR_L"]["meshID"] == meshID && this.attachedCosmetics["EAR_L"]["materialID"] == materialID) {
                return 0;
            }
            this.detachCosmeticFromLeftEar();
        }
        this.attachedCosmetics["EAR_L"]["meshID"] = meshID;
        this.attachedCosmetics["EAR_L"]["materialID"] = materialID;
        return this.attachToLeftEar(meshID, materialID, options);
    }
    detachCosmeticFromLeftEar(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedCosmetics["EAR_L"]["meshID"], destroyMesh);
        this.attachedCosmetics["EAR_L"]["meshID"] = null;
        this.attachedCosmetics["EAR_L"]["materialID"] = null;
        return result;
    }
    attachCosmeticToRightEar(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedCosmetics["EAR_R"]["meshID"] == "string") {
            if (this.attachedCosmetics["EAR_R"]["meshID"] == meshID && this.attachedCosmetics["EAR_R"]["materialID"] == materialID) {
                return 0;
            }
            this.detachCosmeticFromRightEar();
        }
        this.attachedCosmetics["EAR_R"]["meshID"] = meshID;
        this.attachedCosmetics["EAR_R"]["materialID"] = materialID;
        return this.attachToRightEar(meshID, materialID, options);
    }
    detachCosmeticFromRightEar(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedCosmetics["EAR_R"]["meshID"], destroyMesh);
        this.attachedCosmetics["EAR_R"]["meshID"] = null;
        this.attachedCosmetics["EAR_R"]["materialID"] = null;
        return result;
    }
    attachCosmeticToNeck(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedCosmetics["NECK"]["meshID"] == "string") {
            if (this.attachedCosmetics["NECK"]["meshID"] == meshID && this.attachedCosmetics["NECK"]["materialID"] == materialID) {
                return 0;
            }
            this.detachCosmeticFromNeck();
        }
        this.attachedCosmetics["NECK"]["meshID"] = meshID;
        this.attachedCosmetics["NECK"]["materialID"] = materialID;
        return this.attachToNeck(meshID, materialID, options);
    }
    detachCosmeticFromNeck(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedCosmetics["NECK"]["meshID"], destroyMesh);
        this.attachedCosmetics["NECK"]["meshID"] = null;
        this.attachedCosmetics["NECK"]["materialID"] = null;
        return result;
    }
    attachCosmeticToLeftShoulder(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedCosmetics["SHOULDER_L"]["meshID"] == "string") {
            if (this.attachedCosmetics["SHOULDER_L"]["meshID"] == meshID && this.attachedCosmetics["SHOULDER_L"]["materialID"] == materialID) {
                return 0;
            }
            this.detachCosmeticFromLeftShoulder();
        }
        this.attachedCosmetics["SHOULDER_L"]["meshID"] = meshID;
        this.attachedCosmetics["SHOULDER_L"]["materialID"] = materialID;
        return this.attachToLeftShoulder(meshID, materialID, options);
    }
    detachCosmeticFromLeftShoulder(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedCosmetics["SHOULDER_L"]["meshID"], destroyMesh);
        this.attachedCosmetics["SHOULDER_L"]["meshID"] = null;
        this.attachedCosmetics["SHOULDER_L"]["materialID"] = null;
        return result;
    }
    attachCosmeticToRightShoulder(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedCosmetics["SHOULDER_R"]["meshID"] == "string") {
            if (this.attachedCosmetics["SHOULDER_R"]["meshID"] == meshID && this.attachedCosmetics["SHOULDER_R"]["materialID"] == materialID) {
                return 0;
            }
            this.detachCosmeticFromRightShoulder();
        }
        this.attachedCosmetics["SHOULDER_R"]["meshID"] = meshID;
        this.attachedCosmetics["SHOULDER_R"]["materialID"] = materialID;
        return this.attachToRightShoulder(meshID, materialID, options);
    }
    detachCosmeticFromRightShoulder(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedCosmetics["SHOULDER_R"]["meshID"], destroyMesh);
        this.attachedCosmetics["SHOULDER_R"]["meshID"] = null;
        this.attachedCosmetics["SHOULDER_R"]["materialID"] = null;
        return result;
    }
    attachCosmeticToLeftForearm(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedCosmetics["FOREARM_L"]["meshID"] == "string") {
            if (this.attachedCosmetics["FOREARM_L"]["meshID"] == meshID && this.attachedCosmetics["FOREARM_L"]["materialID"] == materialID) {
                return 0;
            }
            this.detachCosmeticFromLeftForearm();
        }
        this.attachedCosmetics["FOREARM_L"]["meshID"] = meshID;
        this.attachedCosmetics["FOREARM_L"]["materialID"] = materialID;
        return this.attachToLeftForearm(meshID, materialID, options);
    }
    detachCosmeticFromLeftForearm(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedCosmetics["FOREARM_L"]["meshID"], destroyMesh);
        this.attachedCosmetics["FOREARM_L"]["meshID"] = null;
        this.attachedCosmetics["FOREARM_L"]["materialID"] = null;
        return result;
    }
    attachCosmeticToRightForearm(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedCosmetics["FOREARM_R"]["meshID"] == "string") {
            if (this.attachedCosmetics["FOREARM_R"]["meshID"] == meshID && this.attachedCosmetics["FOREARM_R"]["materialID"] == materialID) {
                return 0;
            }
            this.detachCosmeticFromRightForearm();
        }
        this.attachedCosmetics["FOREARM_R"]["meshID"] = meshID;
        this.attachedCosmetics["FOREARM_R"]["materialID"] = materialID;
        return this.attachToRightForearm(meshID, materialID, options);
    }
    detachCosmeticFromRightForearm(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedCosmetics["FOREARM_R"]["meshID"], destroyMesh);
        this.attachedCosmetics["FOREARM_R"]["meshID"] = null;
        this.attachedCosmetics["FOREARM_R"]["materialID"] = null;
        return result;
    }
    attachCosmeticToLeftHand(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedCosmetics["HAND_L"]["meshID"] == "string") {
            if (this.attachedCosmetics["HAND_L"]["meshID"] == meshID && this.attachedCosmetics["HAND_L"]["materialID"] == materialID) {
                return 0;
            }
            this.detachCosmeticFromLeftHand();
        }
        this.attachedCosmetics["HAND_L"]["meshID"] = meshID;
        this.attachedCosmetics["HAND_L"]["materialID"] = materialID;
        return this.attachToLeftHand(meshID, materialID, options);
    }
    detachCosmeticFromLeftHand(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedCosmetics["HAND_L"]["meshID"], destroyMesh);
        this.attachedCosmetics["HAND_L"]["meshID"] = null;
        this.attachedCosmetics["HAND_L"]["materialID"] = null;
        return result;
    }
    attachCosmeticToRightHand(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedCosmetics["HAND_R"]["meshID"] == "string") {
            if (this.attachedCosmetics["HAND_R"]["meshID"] == meshID && this.attachedCosmetics["HAND_R"]["materialID"] == materialID) {
                return 0;
            }
            this.detachCosmeticFromRightHand();
        }
        this.attachedCosmetics["HAND_R"]["meshID"] = meshID;
        this.attachedCosmetics["HAND_R"]["materialID"] = materialID;
        return this.attachToRightHand(meshID, materialID, options);
    }
    detachCosmeticFromRightHand(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedCosmetics["HAND_R"]["meshID"], destroyMesh);
        this.attachedCosmetics["HAND_R"]["meshID"] = null;
        this.attachedCosmetics["HAND_R"]["materialID"] = null;
        return result;
    }
    attachCosmeticToChest(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedCosmetics["CHEST"]["meshID"] == "string") {
            if (this.attachedCosmetics["CHEST"]["meshID"] == meshID && this.attachedCosmetics["CHEST"]["materialID"] == materialID) {
                return 0;
            }
            this.detachCosmeticFromChest();
        }
        this.attachedCosmetics["CHEST"]["meshID"] = meshID;
        this.attachedCosmetics["CHEST"]["materialID"] = materialID;
        return this.attachToChest(meshID, materialID, options);
    }
    detachCosmeticFromChest(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedCosmetics["CHEST"]["meshID"], destroyMesh);
        this.attachedCosmetics["CHEST"]["meshID"] = null;
        this.attachedCosmetics["CHEST"]["materialID"] = null;
        return result;
    }
    attachCosmeticToSpine(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedCosmetics["SPINE"]["meshID"] == "string") {
            if (this.attachedCosmetics["SPINE"]["meshID"] == meshID && this.attachedCosmetics["SPINE"]["materialID"] == materialID) {
                return 0;
            }
            this.detachCosmeticFromSpine();
        }
        this.attachedCosmetics["SPINE"]["meshID"] = meshID;
        this.attachedCosmetics["SPINE"]["materialID"] = materialID;
        return this.attachToSpine(meshID, materialID, options);
    }
    detachCosmeticFromSpine(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedCosmetics["SPINE"]["meshID"], destroyMesh);
        this.attachedCosmetics["SPINE"]["meshID"] = null;
        this.attachedCosmetics["SPINE"]["materialID"] = null;
        return result;
    }
    attachCosmeticToPelvis(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.attachedCosmetics["PELVIS"]["meshID"] == "string") {
            if (this.attachedCosmetics["PELVIS"]["meshID"] == meshID && this.attachedCosmetics["PELVIS"]["materialID"] == materialID) {
                return 0;
            }
            this.detachCosmeticFromPelvis();
        }
        this.attachedCosmetics["PELVIS"]["meshID"] = meshID;
        this.attachedCosmetics["PELVIS"]["materialID"] = materialID;
        return this.attachToPelvis(meshID, materialID, options);
    }
    detachCosmeticFromPelvis(destroyMesh = true) {
        let result = this.detachMeshID(this.attachedCosmetics["PELVIS"]["meshID"], destroyMesh);
        this.attachedCosmetics["PELVIS"]["meshID"] = null;
        this.attachedCosmetics["PELVIS"]["materialID"] = null;
        return result;
    }

    generateOrganMeshes() {
        if (!this.hasSkeleton()) {
            return 1;
        }
        let eyeString = String(this.eyeImageID).concat(this.eyeColour.slice(1)).concat(this.eyeBackground.slice(1));
        if (!Game.hasLoadedTexture(eyeString)) {
            Game.modifySVG(
                this.eyeImageID,
                eyeString,
                {
                    "iris": {"background":this.eyeColour},
                    "sclera": {"background":this.eyeBackground}
                }
            );
        }
        this.attachOrganToRightEye("eye01", eyeString);
        this.attachOrganToLeftEye("eye01", eyeString);
        return 0;
    }
    generateCosmeticMeshes() {
        if (!this.hasSkeleton()) {
            return 1;
        }
        return 0;
    }
    generateEquippedMeshes() {
        if (!this.hasSkeleton()) {
            return 1;
        }
        return 0;
    }
    populateFromEntity(entityObject) {
        if (EntityController.debugMode) console.group(`Running {CreatureController} ${this.id}.populateFromEntity(entityObject)`);
        if (!(entityObject instanceof Object)) {
            if (EntityController.debugMode) console.warn(`entityObject was not an object`);
            if (EntityController.debugMode) console.groupEnd();
            return 2;
        }
        super.populateFromEntity(entityObject);
        if (entityObject.hasOwnProperty("eyeType")) this.eyeType = entityObject.eyeType;
        switch (this.eyeType) {
            case EyeEnum.SLIT: {
                this.eyeImageID = "feralEye";
                break;
            }
            case EyeEnum.OBLONG: {
                this.eyeImageID = "oblongEye";
                break;
            }
            case EyeEnum.CIRCLE:
            default: {
                this.eyeImageID = "circularEye";
            }
        }
        if (entityObject.hasOwnProperty("eyeColour")) {
            if (String(entityObject.eyeColour).slice(0,1) == '#') {
                this.eyeColour = entityObject.eyeColour;
            }
            else {
                this.eyeColour = Tools.colourNameToHex(entityObject.eyeColour);
            }
        }
        if (entityObject.hasOwnProperty("eyeBackground")) {
            if (String(entityObject.eyeBackground).slice(0,1) == '#') {
                this.eyeBackground = entityObject.eyeBackground;
            }
            else {
                this.eyeBackground = Tools.colourNameToHex(entityObject.eyeBackground);
            }
        }
        if (entityObject.hasOwnProperty("cosmetics")) {
            for (let boneID in entityObject["cosmetics"]) {
                if (!(entityObject["cosmetics"][boneID] instanceof Object)) {
                    if (overwrite) {
                        this.detachCosmeticFromBone(boneID, true);
                    }
                }
                else {
                    let cosmeticsObject = entityObject["cosmetics"][boneID];
                    if (cosmeticsObject.hasOwnProperty("meshID")) {
                        meshID = entityObject.cosmetics[boneID]["meshID"];
                        if (cosmeticsObject.hasOwnProperty("materialID")) {
                            materialID = entityObject.cosmetics[boneID]["materialID"];
                        }
                        else if (cosmeticsObject.hasOwnProperty("textureID")) {
                            materialID = entityObject.cosmetics[boneID]["textureID"];
                        }
                        else {
                            material = "missingMaterial";
                        }
                        this.attachCosmeticToBone(meshID, materialID, boneID);
                    }
                }
            }
        }
        this.offensiveStance = entityObject.offensiveStance;
        if (EntityController.debugMode) console.info(`Finished running {CreatureController} ${this.id}.populateFromEntity(entityObject)`);
        if (EntityController.debugMode) console.groupEnd();
        return 0;
    }
    updateFromEntity(thatEntity) {
        super.updateFromEntity(thatEntity);
        let thisEntity = Game.getCachedEntity(this.entityID);
        if (thisEntity.hasOwnProperty("organs") && thatEntity.hasOwnProperty("organs")) {
            for (let cosmeticSlot in thisEntity["organs"]) {
                // TODO: this
            }
        }
        if (thisEntity.hasOwnProperty("cosmetics") && thatEntity.hasOwnProperty("cosmetics")) {
            for (let cosmeticSlot in thisEntity["cosmetics"]) {
                // TODO: this
            }
        }
        return 0;
    }
    hasLookController() {
        if (!this.enabled) {
            return false;
        }
        return this.lookController instanceof BABYLON.BoneLookController;
    }
    createLookController(bone = "head") {
        if (!this.hasBone(bone)) {
            return null;
        }
        let lookController = new BABYLON.BoneLookController(
            this.mesh,
            this.getBoneByName(bone),
            this.targetRayVector3,
            {
                slerpAmount:0.05,
                minPitch:BABYLON.Tools.ToRadians(-45),
                maxPitch:BABYLON.Tools.ToRadians(45),
                minYaw:BABYLON.Tools.ToRadians(-45),
                maxYaw:BABYLON.Tools.ToRadians(45)
            }
        );
        this.lookController = lookController;
        return this.lookController;
    }
    /**
     * @override
     */
    createCollisionMesh() {
        if (this.collisionMesh instanceof BABYLON.AbstractMesh) {
            if (this.hasMesh()) {
                this.mesh.setParent(null);
            }
            Game.removeMesh(this.collisionMesh);
        }
        this.collisionMesh = Game.createAreaMesh(
            String(this.id).concat("-collisionMesh"),
            "CUBE",
            this.mesh.getBoundingInfo().boundingBox.extendSize.x * 2,
            this.mesh.getBoundingInfo().boundingBox.extendSize.y * 2,
            this.mesh.getBoundingInfo().boundingBox.extendSize.x * 2,
            this.mesh.position,
            this.mesh.rotation
        );
        this.collisionMesh.controller = this;
        this.collisionMesh.checkCollisions = true;
        if (this.hasMesh()) {
            this.mesh.setParent(this.collisionMesh);
        }
        this.collisionMesh.ellipsoidOffset.y = this.mesh.getBoundingInfo().boundingBox.extendSize.y;
        this.collisionMesh.ellipsoid.x = this.mesh.getBoundingInfo().boundingBox.extendSize.x;
        this.collisionMesh.ellipsoid.y = this.mesh.getBoundingInfo().boundingBox.extendSize.y;
        this.collisionMesh.ellipsoid.z = this.mesh.getBoundingInfo().boundingBox.extendSize.x;
        return this.collisionMesh;
    }
    createMesh(id = "", stageIndex = this.currentMeshStage, position = this.getPosition(), rotation = this.getRotation(), scaling = this.getScaling()) {
        if (this.mesh instanceof BABYLON.AbstractMesh) {
            return null;
        }
        id = Tools.filterID(id);
        if (typeof id != "string") {
            id = Tools.genUUIDv4();
        }
        return Game.createCharacterMesh(id, this.meshStages[stageIndex], this.materialStages[stageIndex], position, rotation, scaling);
    }

    anyMovement() {
        return (this.key.forward || this.key.backward || this.key.turnLeft || this.key.turnRight || this.key.strafeLeft || this.key.strafeRight);
    }
    getMovementKey() {
        return this.key;
    }
    setMovementKey(key) {
        if (typeof key[0] == "boolean" && typeof key[7] == "boolean") {
            this.key.forward = key[0];
            this.key.shift = key[1];
            this.key.backward = key[2];
            this.key.strafeLeft = key[3];
            this.key.strafeRight = key[4];
            this.key.turnLeft = key[5];
            this.key.turnRight = key[6];
            this.key.jump = key[7];
        }
        return 0;
    }
    keyMoveForward(pressed = true) {
        if (pressed === true) {
            this.key.forward = true;
            this.key.backward = false;
        }
        else {
            this.key.forward = false;
        }
        return 0;
    }
    keyShift(pressed = true) {
        if (pressed === true) {
            this.key.shift = true;
        }
        else {
            this.key.shift = false;
        }
        return 0;
    }
    keyMoveBackward(pressed = true) {
        if (pressed === true) {
            this.key.backward = true;
            this.key.forward = false;
        }
        else {
            this.key.backward = false;
        }
        return 0;
    }
    keyTurnLeft(pressed = true) {
        if (pressed === true) {
            this.key.turnLeft = true;
            this.key.turnRight = false;
        }
        else {
            this.key.turnLeft = false;
        }
        return 0;
    }
    keyTurnRight(pressed = true) {
        if (pressed === true) {
            this.key.turnRight = true;
            this.key.turnLeft = false;
        }
        else {
            this.key.turnRight = false;
        }
        return 0;
    }
    keyStrafeLeft(pressed = true) {
        if (pressed === true) {
            this.key.strafeLeft = true;
            this.key.strafeRight = false;
        }
        else {
            this.key.strafeLeft = false;
        }
        return 0;
    }
    keyStrafeRight(pressed = true) {
        if (pressed === true) {
            this.key.strafeLeft = false;
            this.key.strafeRight = true;
        }
        else {
            this.key.strafeRight = false;
        }
        return 0;
    }
    keyJump(pressed = true) {
        if (pressed === true) {
            this.key.jump = true;
        }
        else {
            this.key.jump = false;
        }
        return 0;
    }

    updateAnimation() {
        let anim = this.animationGroups.idleStanding01;
        if (this.dead) {
            this.setLocked(true);
        }
        else if (this.locked) {
            this.setLocked(false);
        }
        if (this.moving) {
            if (this.falling) {}
            else if (this.crouching) {}
            else if (this.walking) {
                if (this.dead) {
                }
                else {
                    anim = this.animationGroups.walking01;
                }
            }
            else if (this.running) {
                if (this.dead) {
                }
                else {
                    anim = this.animationGroups.running01;
                }
            }
            else if (this.sprinting) {}
            else if (this.climbing) {}
            else if (this.flying) {}
        }
        else {
            if (this.falling) {

            }
            else if (this.crouching) {}
            else if (this.sitting) {
                if (this.dead) {
                }
                else {
                    anim = this.animationGroups.idleSitting01;
                }
            }
            else if (this.lying) {
                if (this.dead) {
                    this.animationGroups.idleLyingDeath01.setWeightForAllAnimatables(1);
                }
                anim = this.animationGroups.idleLying01;
            }
        }
        if (this.dead) { // TODO: complain about my lack of foresight with multiple blended animations
            this.stopAnimation("idleStanding01");
        }
        this.beginAnimation(anim);
        return 0;
    }
    doAttack() {
        this.setAttacking(true);
        return 0;
    }
    doAttackBlocked() {
        this.setAttacking(false);
        return 0;
    }
    doAttackFinished() {
        this.setAttacking(false);
        return 0;
    }
    doCrouch() {
        if (this.crouching) {
            return 1;
        }
        this.standing = false;
        this.crouching = true;
        this.sitting = false;
        this.lying = false;
        this.setLocked(true);
        this.beginAnimation(this.crouch, () => {this.setLocked(false)});
        return 0;
    }
    doDeath() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 1;
        }
        this.lying = true; // TODO: remove later when other death animations are actually implemented
        this.dead = true;
        return 0;
    }
    doLay() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 1;
        }
        this.standing = false;
        this.crouching = false;
        this.sitting = false;
        this.lying = true;
        return 0;
    }
    doSit() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 1;
        }
        this.standing = false;
        this.crouching = false;
        this.sitting = true;
        this.lying = false;
        return 0;
    }
    doStand() {
        if (this.standing) {
            return 1;
        }
        this.standing = true;
        this.crouching = false;
        this.sitting = false;
        this.lying = false;
        //this.setLocked(true);
        //this.beginAnimation(this.stand, () => {this.setLocked(false)});
        return 0;
    }

    setAttacking(bool = true) {
        this.attacking = bool == true;
        if (EntityController.debugMode) console.log(`Running {CreatureController} ${this.id}.setAttacking(${this.attacking ? "true" : "false"})`);
        return 0;
    }

    hideAttachedMeshes() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 2;
        }
        for (let bone in this._meshesAttachedToBones) {
            if (bone == "FOCUS" || bone == "ROOT") {}
            else if (this.helmetVisible && bone == "head") {}
            for (let mesh in this._meshesAttachedToBones[bone]) {
                if (this._meshesAttachedToBones[bone][mesh] instanceof BABYLON.AbstractMesh) {
                    this._meshesAttachedToBones[bone][mesh].isVisible = false;
                }
            }
        }
        return 0;
    }
    showAttachedMeshes() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 2;
        }
        for (let bone in this._meshesAttachedToBones) {
            if (bone == "FOCUS" || bone == "ROOT") {}
            else if (!this.helmetVisible && bone == "head") {}
            else {
                for (let mesh in this._meshesAttachedToBones[bone]) {
                    if (this._meshesAttachedToBones[bone][mesh] instanceof BABYLON.AbstractMesh) {
                        this._meshesAttachedToBones[bone][mesh].isVisible = true;
                    }
                }
            }
        }
        return 0;
    }

    hideMesh() {
        this.mesh.isVisible = false;
        this.hideAttachedMeshes();
        return 0;
    }
    showMesh() {
        this.mesh.isVisible = true;
        this.showAttachedMeshes();
        return 0;
    }

    /**
     * Returns all meshes associated with this controller.
     * @returns {Set<BABYLON.AbstractMesh>}
     */
    getMeshes() {
        return this._attachedMeshes;
    }

    updateTargetRay() {
        if (EntityController.debugMode && EntityController.debugVerbosity > 3) console.info(`${this.id}.updateTargetRay()`);
        if (this.locked || !this.enabled) {
            return 0;
        }
        if (!(this.focusMesh instanceof BABYLON.AbstractMesh)) {
            return 1;
        }
        /* Use this.bones["FOCUS"] instead of this.focusMesh; the position used needs to be relative to the mesh */
        if (!(this.targetRay instanceof BABYLON.Ray)) {
            this.targetRay = new BABYLON.Ray(this.bones["FOCUS"].getAbsolutePosition(), this.bones["FOCUS"].getAbsolutePosition().add(this.collisionMesh.calcMovePOV(0,0,1)), 2 * this.collisionMesh.scaling.y);
        }
        if (!this.hasSkeleton()) {
            this.targetRay.origin = this.collisionMesh.position.add(this.collisionMesh.getBoundingInfo().boundingBox.center);
            return 1;
        }
        this.targetRay.origin = this.collisionMesh.position.add(this.bones["FOCUS"].getAbsolutePosition().multiply(this.collisionMesh.scaling));
        this.targetRay.origin.addToRef(this.targetRay.direction, this.targetRayVector3);
        return 0;
    }
    setTarget(entityController) {
        if (!(entityController instanceof EntityController)) {
            if (EntityController.has(entityController)) {
                entityController = EntityController.get(entityController);
            }
            else {
                return 2;
            }
        }
        this.target = entityController;
        return 0;
    }
    getTarget() {
        return this.target;
    }
    hasTarget() {
        return this.target != null;
    }
    removeTarget() {
        this.target = null;
        return 0;
    }
    clearTarget() {
        return this.removeTarget();
    }

    updateID(newID) {
        super.updateID(newID);
        CreatureController.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        this.detachFromAllBones();
        CreatureController.remove(this.id);
        super.dispose();
        return null;
    }
    getClassName() {
        return "CreatureController";
    }

    static initialize() {
        CreatureController.creatureControllerList = {};
        EntityController.debugMode = false;
    }
    static get(id) {
        if (CreatureController.has(id)) {
            return CreatureController.creatureControllerList[id];
        }
        return 1;
    }
    static has(id) {
        return CreatureController.creatureControllerList.hasOwnProperty(id);
    }
    static set(id, characterController) {
        CreatureController.creatureControllerList[id] = characterController;
        return 0;
    }
    static remove(id) {
        delete CreatureController.creatureControllerList[id];
        return 0;
    }
    static list() {
        return CreatureController.creatureControllerList;
    }
    static clear() {
        for (let i in CreatureController.creatureControllerList) {
            CreatureController.creatureControllerList[i].dispose();
        }
        CreatureController.creatureControllerList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!CreatureController.has(oldID)) {
            return 1;
        }
        CreatureController.set(newID, CreatureController.get(oldID));
        CreatureController.remove(oldID);
        return 0;
    }
    static setDebugMode(debugMode) {
        if (debugMode == true) {
            EntityController.debugMode = true;
            for (let creatureController in CreatureController.creatureControllerList) {
                CreatureController.creatureControllerList[creatureController].debugMode = true;
            }
        }
        else if (debugMode == false) {
            EntityController.debugMode = false;
            for (let creatureController in CreatureController.creatureControllerList) {
                CreatureController.creatureControllerList[creatureController].debugMode = false;
            }
        }
        return 0;
    }
    static getDebugMode() {
        return EntityController.debugMode === true;
    }
}
CreatureController.initialize();