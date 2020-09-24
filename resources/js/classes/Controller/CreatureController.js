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
            return null;
        }

        this.focus = null;
        this.root = null;
        this.targetRayLength = 2 * this.collisionMesh.scaling.y;
        this.targetRayLengthOverride = -1;
        this.targetRay = new BABYLON.Ray(this.getBoneByName("FOCUS").getAbsolutePosition(), this.getBoneByName("FOCUS").getAbsolutePosition().add(this.collisionMesh.calcMovePOV(0,0,1)), this.targetRayLength);
        this.targetRayHelper = null;
        this.grounded = false;
        this.jumping = false;
        this.falling = false;
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

        if (this.skeleton instanceof BABYLON.Skeleton) {
            this.animated = true;
            this.skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
            this.skeleton.animationPropertiesOverride.enableBlending = true;
            this.skeleton.animationPropertiesOverride.blendingSpeed = 1.0;
        }
        else {
            this.animated = false;
        }
        this.organs = {};
        this.organs["HEAD"] = [];
        this.organs["EAR_L"] = [];
        this.organs["EAR_R"] = [];
        this.organs["EYE_L"] = [];
        this.organs["EYE_R"] = [];
        this.organs["NECK"] = [];
        this.organs["SHOULDER_L"] = [];
        this.organs["SHOULDER_R"] = [];
        this.organs["FOREARM_L"] = [];
        this.organs["FOREARM_R"] = [];
        this.organs["HAND_L"] = [];
        this.organs["HAND_R"] = [];
        this.organs["CHEST"] = [];
        this.organs["PELVIS"] = [];
        this.organs["LEGS"] = [];
        this.organs["FOOT_L"] = [];
        this.organs["FOOT_R"] = [];
        this.cosmetics = {};
        this.cosmetics["HEAD"] = [];
        this.cosmetics["EAR_L"] = [];
        this.cosmetics["EAR_R"] = [];
        this.cosmetics["EYE_L"] = [];
        this.cosmetics["EYE_R"] = [];
        this.cosmetics["NECK"] = [];
        this.cosmetics["SHOULDER_L"] = [];
        this.cosmetics["SHOULDER_R"] = [];
        this.cosmetics["FOREARM_L"] = [];
        this.cosmetics["FOREARM_R"] = [];
        this.cosmetics["HAND_L"] = [];
        this.cosmetics["HAND_R"] = [];
        this.cosmetics["CHEST"] = [];
        this.cosmetics["PELVIS"] = [];
        this.cosmetics["LEGS"] = [];
        this.cosmetics["FOOT_L"] = [];
        this.cosmetics["FOOT_R"] = [];
        /**
         * @type {EyeEnum}
         */
        this.eyeType = 0;
        this.eyeImageID = "circularEye";
        this.eyeBackground = "#FFFFFF";
        this.eyeColour = "#C3C3C3";

        this.key = new ControllerMovementKey();
        this.prevKey = this.key.clone();

        /**
         * Map of bone IDs and the mesh attached to them.
         * @type {String, {String, BABYLON.Mesh}}
         */
        this._meshesAttachedToBones = {};
        /**
         * Map of mesh IDs and the bones they're attached to.
         * @type {String, {String, BABYLON.Bone}}
         */
        this._bonesAttachedToMeshes = {};
        this._attachedMeshes = new Set([this.mesh]);

        this.target = null;

        this.offensiveStance = OffensiveStanceEnum.MARTIAL;
        CreatureController.set(this.id, this);
        if (EntityController.debugMode) console.info(`Finished creating new CreatureController(${this.id})`);
        if (EntityController.debugMode) console.groupEnd();
    }

    hasBone(bone) {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return false;
        }
        if (bone instanceof BABYLON.Bone) {
            return this.skeleton.bones[this.skeleton.getBoneIndexByName(bone.id)] >= 0;
        }
        else if (typeof bone == "string") {
            return this.skeleton.getBoneIndexByName(bone) >= 0;
        }
        else if (typeof bone == "number") {
            return this.skeleton.bones.hasOwnProperty(number);
        }
        return false;
    }
    getBone(bone) {
        if (EntityController.debugMode) console.log("Running getBone");
        if (this.skeleton instanceof BABYLON.Skeleton) {
            if (bone instanceof BABYLON.Bone) {
                return bone;
            }
            else if (typeof bone == "string") {
                return this.getBoneByName(bone);
            }
            else if (typeof bone == "number") {
                return this.getBoneByID(bone);
            }
        }
        return null;
    }
    getBoneByName(string) {
        if (this.skeleton instanceof BABYLON.Skeleton) {
            return this.skeleton.bones[this.skeleton.getBoneIndexByName(string)];
        }
        return null;
    }
    getBoneByID(number) {
        if (this.skeleton instanceof BABYLON.Skeleton) {
            return this.skeleton.bones[number];
        }
        return null;
    }

    /**
     * Attaches a mesh to a bone
     * @param  {string} meshID Mesh ID
     * @param  {string} materialID Texture ID
     * @param  {string} boneID Bone name
     * @param  {BABYLON.Vector3} [position] Mesh position
     * @param  {BABYLON.Vector3} [rotation] Mesh rotation
     * @param  {BABYLON.Vector3} [scaling] Mesh scaling
     * @param  {object} [options] Options
     * @returns {CharacterController} This character controller.
     */
    attachMeshIDToBone(meshID = "missingMesh", materialID = "missingTexture", boneID, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        if (EntityController.debugMode) console.log("Running attachMeshIDToBone");
        if (!Game.hasMesh(meshID)) {
            if (EntityController.debugMode) console.log(`Couldn't find mesh:${meshID} to attach to bone:${boneID}`);
            return 2;
        }
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            if (EntityController.debugMode) console.log(`Couldn't find skeleton`);
            return 1;
        }
        if (!this.hasBone(boneID)) {
            if (EntityController.debugMode) console.log(`Couldn't find bone:${boneID}`);
            return 2;
        }
        let bone = this.getBone(boneID);
        position = Tools.filterVector3(position);
        rotation = Tools.filterVector3(rotation);
        scaling = Tools.filterVector3(scaling);
        if (!(Game.hasLoadedMesh(meshID))) {
            Game.addBackloggedAttachment((this.id + bone.name + meshID), this, meshID, materialID, bone.name, position, rotation, scaling);
            if (EntityController.debugMode) console.log(`Loading mesh:${meshID} hashtag-soon.`)
            return 1;
        }
        if (materialID != "collisionMaterial") {
            options["createClone"] = true;
        }
        let loadedMesh = Game.createMesh(meshID.concat("Attachment").concat(this.id.capitalize()).concat(boneID), meshID, materialID, position, rotation, scaling, options);
        /*
        if the mesh is a billboard
         */
        if (loadedMesh.getBoundingInfo().boundingBox.maximum.z == 0) {
            loadedMesh.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
            if (bone.name == "hand.r") {
                rotation.y -= BABYLON.Tools.ToRadians(90);
                rotation.z += BABYLON.Tools.ToRadians(90);
            }
            else if (bone.name == "hand.l") {
                rotation.y -= BABYLON.Tools.ToRadians(90);
                rotation.z += BABYLON.Tools.ToRadians(270);
            }
            loadedMesh.material.backFaceCulling = false;
        }
        return this.attachMeshToBone(loadedMesh, bone, position, rotation, scaling);
    }
    /**
     * Attaches a collision mesh to a bone
     * @param  {string} meshID Mesh ID
     * @param  {string} materialID Texture ID
     * @param  {string} boneID Bone name
     * @param  {BABYLON.Vector3} [position] Mesh position
     * @param  {BABYLON.Vector3} [rotation] Mesh rotation
     * @param  {BABYLON.Vector3} [scaling] Mesh scaling
     * @param  {object} [options] Options; used
     * @returns {CharacterController} This character controller.
     */
    attachCollisionMeshIDToBone(meshID = "missingMesh", materialID = "missingTexture", boneID, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        if (typeof options != "object") {
            options = {};
        }
        options["checkCollisions"] = true
        this.attachMeshIDToBone(meshID, materialID, boneID, position, rotation, scaling, options);
    }
    /**
     * Attaches a collision mesh to a bone
     * @param  {BABYLON.AbstractMesh} mesh Mesh
     * @param  {BABYLON.Bone} bone Bone
     * @param  {BABYLON.Vector3} [position] Mesh position
     * @param  {BABYLON.Vector3} [rotation] Mesh rotation
     * @param  {BABYLON.Vector3} [scaling] Mesh scaling
     * @param  {object} [options] Options; not used
     * @returns {CharacterController} This character controller.
     */
    attachMeshToBone(mesh, bone, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options) {
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        if (!(bone instanceof BABYLON.Bone)) {
            return 2;
        }
        mesh.attachToBone(bone, this.mesh);
        mesh.controller = this;
        mesh.position.copyFrom(position);
        mesh.rotation.copyFrom(rotation);
        if (!(scaling instanceof BABYLON.Vector3)) {
            mesh.scaling.copyFrom(this.mesh.scaling);
        }
        if (this.prevAnim == undefined) {
            /*
            Because meshes became inverted when they were attached and scaled before actually being rendered for the first time, or something like that :v
             */
            mesh.scalingDeterminant = -1;
        }
        if (!(this._meshesAttachedToBones.hasOwnProperty(bone.id))) {
            this._meshesAttachedToBones[bone.id] = {};
        }
        this._meshesAttachedToBones[bone.id][mesh.id] = mesh;
        if (!(this._bonesAttachedToMeshes.hasOwnProperty(mesh.id))) {
            this._bonesAttachedToMeshes[mesh.id] = {};
        }
        this._bonesAttachedToMeshes[mesh.id][bone.id] = bone;
        if (bone.id == "FOCUS") {
            this.focus = mesh;
            mesh.isVisible = false;
        }
        else if (bone.id == "ROOT") {
            this.root = mesh;
            mesh.isVisible = false;
        }
        if (mesh.material.name != "collisionMaterial") {
            this._attachedMeshes.add(mesh);
        }
        return this;
    }
    attachCollisionMeshToBone(mesh, bone, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {"checkCollisions": false}) {
        this.attachMeshToBone(mesh, bone, position, rotation, scaling, true);
    }
    detachAllFromBone(bone, destroyMesh = true) {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 1;
        }
        if (!(bone instanceof BABYLON.Bone)) {
            if (this.hasBone(bone)) {
                bone = this.getBone(bone);
            }
            else {
                return 2;
            }
        }
        if (!(this._meshesAttachedToBones.hasOwnProperty(bone.id))) {
            return 1;
        }
        for (let meshID in this._meshesAttachedToBones[bone.id]) {
            this.detachMeshFromBone(this._meshesAttachedToBones[bone.id][meshID], bone, destroyMesh);
        }
        return 0;
    }
    detachMeshID(meshID = "missingMesh", destroyMesh = true) {
        if (EntityController.debugMode) console.log("Running detachMeshID");
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 1;
        }
        if (!Game.hasMesh(meshID)) {
            if (EntityController.debugMode) console.log(`Couldn't find {AbstractMesh} ${meshID}`);
            return 2;
        }
        let mesh = null;
        this._attachedMeshes.forEach((attachedMesh) => {
            if (attachedMesh.name == meshID || attachedMesh.id == meshID) {
                mesh = attachedMesh;
                return true;
            }
        });
        if (mesh == null) {
            return 1;
        }
        return this.detachMeshFromBone(mesh, null, destroyMesh);
    }
    detachMeshFromBone(mesh, bone = null, destroyMesh = true) { // TODO: check what happens if we've got 2 of the same meshes on different bones :v srsly, what if
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 1;
        }
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        if (!(this._bonesAttachedToMeshes.hasOwnProperty(mesh.id))) {
            return 1;
        }
        if (!(bone instanceof BABYLON.Bone)) {
            if (this.hasBone(bone)) {
                bone = this.getBone(bone);
            }
            else {
                bone = null;
            }
        }
        if (bone instanceof BABYLON.Bone) {
            this._meshesAttachedToBones[bone.id][mesh.id].controller = null;
            delete this._meshesAttachedToBones[bone.id][mesh.id];
        }
        else {
            for (let boneWithAttachment in this._bonesAttachedToMeshes[mesh.id]) {
                if (this._bonesAttachedToMeshes[mesh.id][boneWithAttachment] instanceof BABYLON.Bone) {
                    this._meshesAttachedToBones[boneWithAttachment][mesh.id].controller = null;
                    delete this._meshesAttachedToBones[boneWithAttachment][mesh.id];
                }
            }
        }
        mesh.controller = null;
        mesh.detachFromBone();
        delete this._bonesAttachedToMeshes[mesh.id];
        this._attachedMeshes.delete(mesh);
        if (destroyMesh) {
            Game.removeMesh(mesh);
        }
        return 0;
    }
    detachFromAllBones(destroyMesh = true) {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        for (let boneID in this._meshesAttachedToBones) {
            if (boneID == "FOCUS" || boneID == "ROOT") {}
            else {
                this.detachAllFromBone(boneID, destroyMesh);
            }
            if (this.organs.hasOwnProperty(boneID)) {
                this.organs[boneID][0] = null;
                this.organs[boneID][1] = null;
            }
            if (this.cosmetics.hasOwnProperty(boneID)) {
                this.cosmetics[boneID][0] = null;
                this.cosmetics[boneID][1] = null;
            }
        }
        return 0;
    }
    attachToROOT(mesh) {
        if (mesh instanceof BABYLON.AbstractMesh) {
            return this.attachMeshToBone(mesh, this.getBone("ROOT"));
        }
        return this.attachMeshIDToBone(mesh, undefined, "ROOT");
    }
    detachFromROOT() {
        return this.detachAllFromBone("ROOT", false)[0];
    }
    attachToFOCUS(mesh) {
        if (mesh instanceof BABYLON.AbstractMesh) {
            return this.attachMeshToBone(mesh, this.getBone("FOCUS"));
        }
        return this.attachMeshIDToBone(mesh, undefined, "FOCUS");
    }
    detachFromFOCUS() {
        return this.detachAllFromBone("FOCUS", false)[0];
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
        if (typeof this.organs["HEAD"][0] == "string") {
            if (this.organs["HEAD"][0] == meshID && this.organs["HEAD"][1] == materialID) {
                return 0;
            }
            this.detachOrganFromHead();
        }
        this.organs["HEAD"][0] = meshID;
        this.organs["HEAD"][1] = materialID;
        return this.attachToHead(meshID, materialID, options);
    }
    detachOrganFromHead(destroyMesh = true) {
        let result = this.detachMeshID(this.organs["HEAD"][0], this.organs["HEAD"][1], destroyMesh);
        this.organs["HEAD"][0] = null;
        this.organs["HEAD"][1] = null;
        return result;
    }
    attachOrganToLeftEye(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.organs["EYE_L"][0] == "string") {
            if (this.organs["EYE_L"][0] == meshID && this.organs["EYE_L"][1] == materialID) {
                return 0;
            }
            this.detachOrganFromLeftEye();
        }
        this.organs["EYE_L"][0] = meshID;
        this.organs["EYE_L"][1] = materialID;
        return this.attachToLeftEye(meshID, materialID, options);
    }
    detachOrganFromLeftEye(destroyMesh = true) {
        let result = this.detachMeshID(this.organs["EYE_L"][0], this.organs["EYE_L"][1], destroyMesh);
        this.organs["EYE_L"][0] = null;
        this.organs["EYE_L"][1] = null;
        return result;
    }
    attachOrganToRightEye(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.organs["EYE_R"][0] == "string") {
            if (this.organs["EYE_R"][0] == meshID && this.organs["EYE_R"][1] == materialID) {
                return 0;
            }
            this.detachOrganFromRightEye();
        }
        this.organs["EYE_R"][0] = meshID;
        this.organs["EYE_R"][1] = materialID;
        return this.attachToRightEye(meshID, materialID, options);
    }
    detachOrganFromRightEye(destroyMesh = true) {
        let result = this.detachMeshID(this.organs["EYE_R"][0], this.organs["EYE_R"][1], destroyMesh);
        this.organs["EYE_R"][0] = null;
        this.organs["EYE_R"][1] = null;
        return result;
    }
    attachOrganToLeftEar(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.organs["EAR_L"][0] == "string") {
            if (this.organs["EAR_L"][0] == meshID && this.organs["EAR_L"][1] == materialID) {
                return 0;
            }
            this.detachOrganFromLeftEar();
        }
        this.organs["EAR_L"][0] = meshID;
        this.organs["EAR_L"][1] = materialID;
        return this.attachToLeftEar(meshID, materialID, options);
    }
    detachOrganFromLeftEar(destroyMesh = true) {
        let result = this.detachMeshID(this.organs["EAR_L"][0], this.organs["EAR_L"][1], destroyMesh);
        this.organs["EAR_L"][0] = null;
        this.organs["EAR_L"][1] = null;
        return result;
    }
    attachOrganToRightEar(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.organs["EAR_R"][0] == "string") {
            if (this.organs["EAR_R"][0] == meshID && this.organs["EAR_R"][1] == materialID) {
                return 0;
            }
            this.detachOrganFromRightEar();
        }
        this.organs["EAR_R"][0] = meshID;
        this.organs["EAR_R"][1] = materialID;
        return this.attachToRightEar(meshID, materialID, options);
    }
    detachOrganFromRightEar(destroyMesh = true) {
        let result = this.detachMeshID(this.organs["EAR_R"][0], this.organs["EAR_R"][1], destroyMesh);
        this.organs["EAR_R"][0] = null;
        this.organs["EAR_R"][1] = null;
        return result;
    }
    attachOrganToNeck(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.organs["NECK"][0] == "string") {
            if (this.organs["NECK"][0] == meshID && this.organs["NECK"][1] == materialID) {
                return 0;
            }
            this.detachOrganFromNeck();
        }
        this.organs["NECK"][0] = meshID;
        this.organs["NECK"][1] = materialID;
        return this.attachToNeck(meshID, materialID, options);
    }
    detachOrganFromNeck(destroyMesh = true) {
        let result = this.detachMeshID(this.organs["NECK"][0], this.organs["NECK"][1], destroyMesh);
        this.organs["NECK"][0] = null;
        this.organs["NECK"][1] = null;
        return result;
    }
    attachOrganToLeftShoulder(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.organs["SHOULDER_L"][0] == "string") {
            if (this.organs["SHOULDER_L"][0] == meshID && this.organs["SHOULDER_L"][1] == materialID) {
                return 0;
            }
            this.detachOrganFromLeftShoulder();
        }
        this.organs["SHOULDER_L"][0] = meshID;
        this.organs["SHOULDER_L"][1] = materialID;
        return this.attachToLeftShoulder(meshID, materialID, options);
    }
    detachOrganFromLeftShoulder(destroyMesh = true) {
        let result = this.detachMeshID(this.organs["SHOULDER_L"][0], this.organs["SHOULDER_L"][1], destroyMesh);
        this.organs["SHOULDER_L"][0] = null;
        this.organs["SHOULDER_L"][1] = null;
        return result;
    }
    attachOrganToRightShoulder(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.organs["SHOULDER_R"][0] == "string") {
            if (this.organs["SHOULDER_R"][0] == meshID && this.organs["SHOULDER_R"][1] == materialID) {
                return 0;
            }
            this.detachOrganFromRightShoulder();
        }
        this.organs["SHOULDER_R"][0] = meshID;
        this.organs["SHOULDER_R"][1] = materialID;
        return this.attachToRightShoulder(meshID, materialID, options);
    }
    detachOrganFromRightShoulder(destroyMesh = true) {
        let result = this.detachMeshID(this.organs["SHOULDER_R"][0], this.organs["SHOULDER_R"][1], destroyMesh);
        this.organs["SHOULDER_R"][0] = null;
        this.organs["SHOULDER_R"][1] = null;
        return result;
    }
    attachOrganToLeftForearm(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.organs["FOREARM_L"][0] == "string") {
            if (this.organs["FOREARM_L"][0] == meshID && this.organs["FOREARM_L"][1] == materialID) {
                return 0;
            }
            this.detachOrganFromLeftForearm();
        }
        this.organs["FOREARM_L"][0] = meshID;
        this.organs["FOREARM_L"][1] = materialID;
        return this.attachToLeftForearm(meshID, materialID, options);
    }
    detachOrganFromLeftForearm(destroyMesh = true) {
        let result = this.detachMeshID(this.organs["FOREARM_L"][0], this.organs["FOREARM_L"][1], destroyMesh);
        this.organs["FOREARM_L"][0] = null;
        this.organs["FOREARM_L"][1] = null;
        return result;
    }
    attachOrganToRightForearm(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.organs["FOREARM_R"][0] == "string") {
            if (this.organs["FOREARM_R"][0] == meshID && this.organs["FOREARM_R"][1] == materialID) {
                return 0;
            }
            this.detachOrganFromRightForearm();
        }
        this.organs["FOREARM_R"][0] = meshID;
        this.organs["FOREARM_R"][1] = materialID;
        return this.attachToRightForearm(meshID, materialID, options);
    }
    detachOrganFromRightForearm(destroyMesh = true) {
        let result = this.detachMeshID(this.organs["FOREARM_R"][0], this.organs["FOREARM_R"][1], destroyMesh);
        this.organs["FOREARM_R"][0] = null;
        this.organs["FOREARM_R"][1] = null;
        return result;
    }
    attachOrganToLeftHand(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.organs["HAND_L"][0] == "string") {
            if (this.organs["HAND_L"][0] == meshID && this.organs["HAND_L"][1] == materialID) {
                return 0;
            }
            this.detachOrganFromLeftHand();
        }
        this.organs["HAND_L"][0] = meshID;
        this.organs["HAND_L"][1] = materialID;
        return this.attachToLeftHand(meshID, materialID, options);
    }
    detachOrganFromLeftHand(destroyMesh = true) {
        let result = this.detachMeshID(this.organs["HAND_L"][0], this.organs["HAND_L"][1], destroyMesh);
        this.organs["HAND_L"][0] = null;
        this.organs["HAND_L"][1] = null;
        return result;
    }
    attachOrganToRightHand(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.organs["HAND_R"][0] == "string") {
            if (this.organs["HAND_R"][0] == meshID && this.organs["HAND_R"][1] == materialID) {
                return 0;
            }
            this.detachOrganFromRightHand();
        }
        this.organs["HAND_R"][0] = meshID;
        this.organs["HAND_R"][1] = materialID;
        return this.attachToRightHand(meshID, materialID, options);
    }
    detachOrganFromRightHand(destroyMesh = true) {
        let result = this.detachMeshID(this.organs["HAND_R"][0], this.organs["HAND_R"][1], destroyMesh);
        this.organs["HAND_R"][0] = null;
        this.organs["HAND_R"][1] = null;
        return result;
    }
    attachOrganToChest(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.organs["CHEST"][0] == "string") {
            if (this.organs["CHEST"][0] == meshID && this.organs["CHEST"][1] == materialID) {
                return 0;
            }
            this.detachOrganFromChest();
        }
        this.organs["CHEST"][0] = meshID;
        this.organs["CHEST"][1] = materialID;
        return this.attachToChest(meshID, materialID, options);
    }
    detachOrganFromChest(destroyMesh = true) {
        let result = this.detachMeshID(this.organs["CHEST"][0], this.organs["CHEST"][1], destroyMesh);
        this.organs["CHEST"][0] = null;
        this.organs["CHEST"][1] = null;
        return result;
    }
    attachOrganToSpine(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.organs["SPINE"][0] == "string") {
            if (this.organs["SPINE"][0] == meshID && this.organs["SPINE"][1] == materialID) {
                return 0;
            }
            this.detachOrganFromSpine();
        }
        this.organs["SPINE"][0] = meshID;
        this.organs["SPINE"][1] = materialID;
        return this.attachToSpine(meshID, materialID, options);
    }
    detachOrganFromSpine(destroyMesh = true) {
        let result = this.detachMeshID(this.organs["SPINE"][0], this.organs["SPINE"][1], destroyMesh);
        this.organs["SPINE"][0] = null;
        this.organs["SPINE"][1] = null;
        return result;
    }
    attachOrganToPelvis(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.organs["PELVIS"][0] == "string") {
            if (this.organs["PELVIS"][0] == meshID && this.organs["PELVIS"][1] == materialID) {
                return 0;
            }
            this.detachOrganFromPelvis();
        }
        this.organs["PELVIS"][0] = meshID;
        this.organs["PELVIS"][1] = materialID;
        return this.attachToPelvis(meshID, materialID, options);
    }
    detachOrganFromPelvis(destroyMesh = true) {
        let result = this.detachMeshID(this.organs["PELVIS"][0], this.organs["PELVIS"][1], destroyMesh);
        this.organs["PELVIS"][0] = null;
        this.organs["PELVIS"][1] = null;
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
        if (typeof this.cosmetics["HEAD"][0] == "string") {
            if (this.cosmetics["HEAD"][0] == meshID && this.cosmetics["HEAD"][1] == materialID) {
                return 0;
            }
            this.detachCosmeticFromHead();
        }
        this.cosmetics["HEAD"][0] = meshID;
        this.cosmetics["HEAD"][1] = materialID;
        return this.attachToHead(meshID, materialID, options);
    }
    detachCosmeticFromHead(destroyMesh = true) {
        let result = this.detachMeshID(this.cosmetics["HEAD"][0], this.cosmetics["HEAD"][1], destroyMesh);
        this.cosmetics["HEAD"][0] = null;
        this.cosmetics["HEAD"][1] = null;
        return result;
    }
    attachCosmeticToLeftEye(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.cosmetics["EYE_L"][0] == "string") {
            if (this.cosmetics["EYE_L"][0] == meshID && this.cosmetics["EYE_L"][1] == materialID) {
                return 0;
            }
            this.detachCosmeticFromLeftEye();
        }
        this.cosmetics["EYE_L"][0] = meshID;
        this.cosmetics["EYE_L"][1] = materialID;
        return this.attachToLeftEye(meshID, materialID, options);
    }
    detachCosmeticFromLeftEye(destroyMesh = true) {
        let result = this.detachMeshID(this.cosmetics["EYE_L"][0], this.cosmetics["EYE_L"][1], destroyMesh);
        this.cosmetics["EYE_L"][0] = null;
        this.cosmetics["EYE_L"][1] = null;
        return result;
    }
    attachCosmeticToRightEye(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.cosmetics["EYE_R"][0] == "string") {
            if (this.cosmetics["EYE_R"][0] == meshID && this.cosmetics["EYE_R"][1] == materialID) {
                return 0;
            }
            this.detachCosmeticFromRightEye();
        }
        this.cosmetics["EYE_R"][0] = meshID;
        this.cosmetics["EYE_R"][1] = materialID;
        return this.attachToRightEye(meshID, materialID, options);
    }
    detachCosmeticFromRightEye(destroyMesh = true) {
        let result = this.detachMeshID(this.cosmetics["EYE_R"][0], this.cosmetics["EYE_R"][1], destroyMesh);
        this.cosmetics["EYE_R"][0] = null;
        this.cosmetics["EYE_R"][1] = null;
        return result;
    }
    attachCosmeticToLeftEar(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.cosmetics["EAR_L"][0] == "string") {
            if (this.cosmetics["EAR_L"][0] == meshID && this.cosmetics["EAR_L"][1] == materialID) {
                return 0;
            }
            this.detachCosmeticFromLeftEar();
        }
        this.cosmetics["EAR_L"][0] = meshID;
        this.cosmetics["EAR_L"][1] = materialID;
        return this.attachToLeftEar(meshID, materialID, options);
    }
    detachCosmeticFromLeftEar(destroyMesh = true) {
        let result = this.detachMeshID(this.cosmetics["EAR_L"][0], this.cosmetics["EAR_L"][1], destroyMesh);
        this.cosmetics["EAR_L"][0] = null;
        this.cosmetics["EAR_L"][1] = null;
        return result;
    }
    attachCosmeticToRightEar(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.cosmetics["EAR_R"][0] == "string") {
            if (this.cosmetics["EAR_R"][0] == meshID && this.cosmetics["EAR_R"][1] == materialID) {
                return 0;
            }
            this.detachCosmeticFromRightEar();
        }
        this.cosmetics["EAR_R"][0] = meshID;
        this.cosmetics["EAR_R"][1] = materialID;
        return this.attachToRightEar(meshID, materialID, options);
    }
    detachCosmeticFromRightEar(destroyMesh = true) {
        let result = this.detachMeshID(this.cosmetics["EAR_R"][0], this.cosmetics["EAR_R"][1], destroyMesh);
        this.cosmetics["EAR_R"][0] = null;
        this.cosmetics["EAR_R"][1] = null;
        return result;
    }
    attachCosmeticToNeck(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.cosmetics["NECK"][0] == "string") {
            if (this.cosmetics["NECK"][0] == meshID && this.cosmetics["NECK"][1] == materialID) {
                return 0;
            }
            this.detachCosmeticFromNeck();
        }
        this.cosmetics["NECK"][0] = meshID;
        this.cosmetics["NECK"][1] = materialID;
        return this.attachToNeck(meshID, materialID, options);
    }
    detachCosmeticFromNeck(destroyMesh = true) {
        let result = this.detachMeshID(this.cosmetics["NECK"][0], this.cosmetics["NECK"][1], destroyMesh);
        this.cosmetics["NECK"][0] = null;
        this.cosmetics["NECK"][1] = null;
        return result;
    }
    attachCosmeticToLeftShoulder(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.cosmetics["SHOULDER_L"][0] == "string") {
            if (this.cosmetics["SHOULDER_L"][0] == meshID && this.cosmetics["SHOULDER_L"][1] == materialID) {
                return 0;
            }
            this.detachCosmeticFromLeftShoulder();
        }
        this.cosmetics["SHOULDER_L"][0] = meshID;
        this.cosmetics["SHOULDER_L"][1] = materialID;
        return this.attachToLeftShoulder(meshID, materialID, options);
    }
    detachCosmeticFromLeftShoulder(destroyMesh = true) {
        let result = this.detachMeshID(this.cosmetics["SHOULDER_L"][0], this.cosmetics["SHOULDER_L"][1], destroyMesh);
        this.cosmetics["SHOULDER_L"][0] = null;
        this.cosmetics["SHOULDER_L"][1] = null;
        return result;
    }
    attachCosmeticToRightShoulder(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.cosmetics["SHOULDER_R"][0] == "string") {
            if (this.cosmetics["SHOULDER_R"][0] == meshID && this.cosmetics["SHOULDER_R"][1] == materialID) {
                return 0;
            }
            this.detachCosmeticFromRightShoulder();
        }
        this.cosmetics["SHOULDER_R"][0] = meshID;
        this.cosmetics["SHOULDER_R"][1] = materialID;
        return this.attachToRightShoulder(meshID, materialID, options);
    }
    detachCosmeticFromRightShoulder(destroyMesh = true) {
        let result = this.detachMeshID(this.cosmetics["SHOULDER_R"][0], this.cosmetics["SHOULDER_R"][1], destroyMesh);
        this.cosmetics["SHOULDER_R"][0] = null;
        this.cosmetics["SHOULDER_R"][1] = null;
        return result;
    }
    attachCosmeticToLeftForearm(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.cosmetics["FOREARM_L"][0] == "string") {
            if (this.cosmetics["FOREARM_L"][0] == meshID && this.cosmetics["FOREARM_L"][1] == materialID) {
                return 0;
            }
            this.detachCosmeticFromLeftForearm();
        }
        this.cosmetics["FOREARM_L"][0] = meshID;
        this.cosmetics["FOREARM_L"][1] = materialID;
        return this.attachToLeftForearm(meshID, materialID, options);
    }
    detachCosmeticFromLeftForearm(destroyMesh = true) {
        let result = this.detachMeshID(this.cosmetics["FOREARM_L"][0], this.cosmetics["FOREARM_L"][1], destroyMesh);
        this.cosmetics["FOREARM_L"][0] = null;
        this.cosmetics["FOREARM_L"][1] = null;
        return result;
    }
    attachCosmeticToRightForearm(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.cosmetics["FOREARM_R"][0] == "string") {
            if (this.cosmetics["FOREARM_R"][0] == meshID && this.cosmetics["FOREARM_R"][1] == materialID) {
                return 0;
            }
            this.detachCosmeticFromRightForearm();
        }
        this.cosmetics["FOREARM_R"][0] = meshID;
        this.cosmetics["FOREARM_R"][1] = materialID;
        return this.attachToRightForearm(meshID, materialID, options);
    }
    detachCosmeticFromRightForearm(destroyMesh = true) {
        let result = this.detachMeshID(this.cosmetics["FOREARM_R"][0], this.cosmetics["FOREARM_R"][1], destroyMesh);
        this.cosmetics["FOREARM_R"][0] = null;
        this.cosmetics["FOREARM_R"][1] = null;
        return result;
    }
    attachCosmeticToLeftHand(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.cosmetics["HAND_L"][0] == "string") {
            if (this.cosmetics["HAND_L"][0] == meshID && this.cosmetics["HAND_L"][1] == materialID) {
                return 0;
            }
            this.detachCosmeticFromLeftHand();
        }
        this.cosmetics["HAND_L"][0] = meshID;
        this.cosmetics["HAND_L"][1] = materialID;
        return this.attachToLeftHand(meshID, materialID, options);
    }
    detachCosmeticFromLeftHand(destroyMesh = true) {
        let result = this.detachMeshID(this.cosmetics["HAND_L"][0], this.cosmetics["HAND_L"][1], destroyMesh);
        this.cosmetics["HAND_L"][0] = null;
        this.cosmetics["HAND_L"][1] = null;
        return result;
    }
    attachCosmeticToRightHand(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.cosmetics["HAND_R"][0] == "string") {
            if (this.cosmetics["HAND_R"][0] == meshID && this.cosmetics["HAND_R"][1] == materialID) {
                return 0;
            }
            this.detachCosmeticFromRightHand();
        }
        this.cosmetics["HAND_R"][0] = meshID;
        this.cosmetics["HAND_R"][1] = materialID;
        return this.attachToRightHand(meshID, materialID, options);
    }
    detachCosmeticFromRightHand(destroyMesh = true) {
        let result = this.detachMeshID(this.cosmetics["HAND_R"][0], this.cosmetics["HAND_R"][1], destroyMesh);
        this.cosmetics["HAND_R"][0] = null;
        this.cosmetics["HAND_R"][1] = null;
        return result;
    }
    attachCosmeticToChest(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.cosmetics["CHEST"][0] == "string") {
            if (this.cosmetics["CHEST"][0] == meshID && this.cosmetics["CHEST"][1] == materialID) {
                return 0;
            }
            this.detachCosmeticFromChest();
        }
        this.cosmetics["CHEST"][0] = meshID;
        this.cosmetics["CHEST"][1] = materialID;
        return this.attachToChest(meshID, materialID, options);
    }
    detachCosmeticFromChest(destroyMesh = true) {
        let result = this.detachMeshID(this.cosmetics["CHEST"][0], this.cosmetics["CHEST"][1], destroyMesh);
        this.cosmetics["CHEST"][0] = null;
        this.cosmetics["CHEST"][1] = null;
        return result;
    }
    attachCosmeticToSpine(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.cosmetics["SPINE"][0] == "string") {
            if (this.cosmetics["SPINE"][0] == meshID && this.cosmetics["SPINE"][1] == materialID) {
                return 0;
            }
            this.detachCosmeticFromSpine();
        }
        this.cosmetics["SPINE"][0] = meshID;
        this.cosmetics["SPINE"][1] = materialID;
        return this.attachToSpine(meshID, materialID, options);
    }
    detachCosmeticFromSpine(destroyMesh = true) {
        let result = this.detachMeshID(this.cosmetics["SPINE"][0], this.cosmetics["SPINE"][1], destroyMesh);
        this.cosmetics["SPINE"][0] = null;
        this.cosmetics["SPINE"][1] = null;
        return result;
    }
    attachCosmeticToPelvis(meshID, materialID, options) {
        if (meshID instanceof BABYLON.AbstractMesh) {
            if (meshID.material instanceof BABYLON.Material) {
                materialID = meshID.material.name;
            }
            meshID = meshID.name;
        }
        if (typeof this.cosmetics["PELVIS"][0] == "string") {
            if (this.cosmetics["PELVIS"][0] == meshID && this.cosmetics["PELVIS"][1] == materialID) {
                return 0;
            }
            this.detachCosmeticFromPelvis();
        }
        this.cosmetics["PELVIS"][0] = meshID;
        this.cosmetics["PELVIS"][1] = materialID;
        return this.attachToPelvis(meshID, materialID, options);
    }
    detachCosmeticFromPelvis(destroyMesh = true) {
        let result = this.detachMeshID(this.cosmetics["PELVIS"][0], this.cosmetics["PELVIS"][1], destroyMesh);
        this.cosmetics["PELVIS"][0] = null;
        this.cosmetics["PELVIS"][1] = null;
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
                    cosmeticsObject = entityObject["cosmetics"][boneID];
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
    hasLookController() {
        if (!this.enabled) {
            return false;
        }
        return this.lookController instanceof BABYLON.BoneLookController;
    }
    createLookController(bone = "head") {
        if (!this.hasBone(bone)) {
            return this;
        }
        let lookController = new BABYLON.BoneLookController(
            this.mesh,
            this.getBoneByName(bone),
            this.targetRay.direction.add(this.targetRay.origin),
            {
                slerpAmount:0.05,
                minPitch:BABYLON.Tools.ToRadians(-45),
                maxPitch:BABYLON.Tools.ToRadians(45),
                minYaw:BABYLON.Tools.ToRadians(-45),
                maxYaw:BABYLON.Tools.ToRadians(45),
            }
        );
        this.lookController = lookController;
        return this;
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
        return this;
    }
    createMesh(id = "", stageIndex = this.currentMeshStage, position = this.getPosition(), rotation = this.getRotation(), scaling = this.getScaling()) {
        if (this.mesh instanceof BABYLON.AbstractMesh) {
            return 1;
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
        return this;
    }
    keyMoveForward(pressed = true) {
        if (pressed === true) {
            this.key.forward = true;
            this.key.backward = false;
        }
        else {
            this.key.forward = false;
        }
        return this;
    }
    keyShift(pressed = true) {
        if (pressed === true) {
            this.key.shift = true;
        }
        else {
            this.key.shift = false;
        }
        return this;
    }
    keyMoveBackward(pressed = true) {
        if (pressed === true) {
            this.key.backward = true;
            this.key.forward = false;
        }
        else {
            this.key.backward = false;
        }
        return this;
    }
    keyTurnLeft(pressed = true) {
        if (pressed === true) {
            this.key.turnLeft = true;
            this.key.turnRight = false;
        }
        else {
            this.key.turnLeft = false;
        }
        return this;
    }
    keyTurnRight(pressed = true) {
        if (pressed === true) {
            this.key.turnRight = true;
            this.key.turnLeft = false;
        }
        else {
            this.key.turnRight = false;
        }
        return this;
    }
    keyStrafeLeft(pressed = true) {
        if (pressed === true) {
            this.key.strafeLeft = true;
            this.key.strafeRight = false;
        }
        else {
            this.key.strafeLeft = false;
        }
        return this;
    }
    keyStrafeRight(pressed = true) {
        if (pressed === true) {
            this.key.strafeLeft = false;
            this.key.strafeRight = true;
        }
        else {
            this.key.strafeRight = false;
        }
        return this;
    }
    keyJump(pressed = true) {
        if (pressed === true) {
            this.key.jump = true;
        }
        else {
            this.key.jump = false;
        }
        return this;
    }

    updateAnimation() {
        let anim = this.animationGroups.idleStanding01;
        if (this.moving) {
            if (this.falling) {}
            else if (this.crouching) {}
            else if (this.walking) {
                anim = this.animationGroups.walking01;
            }
            else if (this.running) {
                anim = this.animationGroups.running01;
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
                anim = this.animationGroups.idleSitting01;
            }
            else if (this.lying) {
                anim = this.animationGroups.idleLying01;
            }
        }
        this.beginAnimation(anim);
        return 0;
    }
    doDeath() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return false;
        }
        this.setLocked(true);
        this.beginAnimation(this.death);
        return true;
    }
    doLay() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return false;
        }
        this.standing = false;
        this.crouching = false;
        this.sitting = false;
        this.lying = true;
        this.beginAnimation(this.lieDown);
        return true;
    }
    doSit() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return false;
        }
        this.standing = false;
        this.crouching = false;
        this.sitting = true;
        this.lying = false;
        this.beginAnimation(this.sitDown);
        return true;
    }
    doStand() {
        if (this.standing) {
            return true;
        }
        this.standing = true;
        this.crouching = false;
        this.sitting = false;
        this.lying = false;
        this.setLocked(true);
        this.beginAnimation(this.stand, () => {this.setLocked(false)});
    }
    doCrouch() {
        if (this.crouching) {
            return this;
        }
        this.standing = false;
        this.crouching = true;
        this.sitting = false;
        this.lying = false;
        this.setLocked(true);
        this.beginAnimation(this.crouch, () => {this.setLocked(false)});
    }

    setAttacking(bool = true) {
        this.attacking = bool == true;
        console.log(`running setAttacking(${this.attacking ? "true" : "false"})`);
    }

    hideAttachedMeshes() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
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
        return this;
    }
    showAttachedMeshes() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
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
        return this;
    }

    hideMesh() {
        this.mesh.isVisible = false;
        this.hideAttachedMeshes();
        return this;
    }
    showMesh() {
        this.mesh.isVisible = true;
        this.showAttachedMeshes();
        return this;
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
        if (!(this.targetRay instanceof BABYLON.Ray)) {
            return 2;
        }
        if (!this.hasSkeleton() || !this.hasBone("FOCUS")) {
            this.targetRay.origin = this.collisionMesh.position.add(this.collisionMesh.getBoundingInfo().boundingBox.center);
            return 1;
        }
        this.targetRay.origin = this.collisionMesh.position.add(this.getBoneByName("FOCUS").getAbsolutePosition().multiply(this.collisionMesh.scaling));
        if (this.targetRayLengthOverride >= 0) {
            this.targetRay.length = this.targetRayLengthOverride;
        }
        else {
            this.targetRay.length = this.targetRayLength;
        }
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
        return undefined;
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