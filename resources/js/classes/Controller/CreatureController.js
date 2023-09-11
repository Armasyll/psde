/**
 * Creature Controller
 * @class
 * @extends {EntityController}
 * @typedef {Object} CreatureController
 */
class CreatureController extends EntityController {
    /**
     * Creates a Creature Controller
     * @param {string} id 
     * @param {BABYLON.AbstractMesh} aMeshes 
     * @param {object} entityObject 
     */
    constructor(id = "", aMeshes = [], entityObject = {}) {
        if (!(super(id, aMeshes, entityObject) instanceof EntityController)) {
            if (AbstractController.debugMode) console.group(`Failed to create new CreatureController(${id}, ${aMeshes.id}, ${entityObject.id})`);
            return undefined;
        }

        this.targetRayVector3 = BABYLON.Vector3.Zero();
        this.stance = StanceEnum.STAND;
        this.stanceFrameCount = 0;
        /**
         * @type {number} Minimum frame count before changing animations
         */
        this.stanceFrameCountMin = 50;
        /**
         * @type {number} Don't care to have a number go on forever
         */
        this.stanceFrameCountMax = 1023;
        this.previousStance = null;
        this.previousStanceFrameCount = 0;
        this.otherPreviousStance = null;
        this.otherPreviousStanceFrameCount = 0;
        this.movementPace = MovementPaceEnum.NONE;
        this.canTransition = true;
        this.oOverrideAnimation = null;

        this._organMeshIDsAttachedToBones = {};
        this._cosmeticMeshIDsAttachedToBones = {};

        this.bones["head"] = null;
        /**
         * @type {EyeEnum}
         */
        this.eEyeType = 0;
        this.sEyeType = "circularEye";
        this.sEyeScleraColour = "#FFFFFF";
        this.sEyeIrisColour = "#C3C3C3";
        this.sEyeTexture = "";

        this.key = new ControllerMovementKey();
        this.prevKey = this.key.clone();

        this.target = null;

        this.offensiveStance = OffensiveStanceEnum.MARTIAL;
        this.bHasRunPostConstructCreature = false;
        this.bHasRunAssignCreature = false;
        CreatureController.set(this.id, this);
        if (EntityController.debugMode) console.info(`Finished creating new CreatureController(${this.id})`);
        if (EntityController.debugMode) console.groupEnd();
        this.postConstruct();
    }
    postConstruct() {
        if (this.bHasRunPostConstructCreature) {
            return 0;
        }
        this.bHasRunPostConstructCreature = true;
        super.postConstruct();
        if (this.skeleton instanceof BABYLON.Skeleton) {
            this.skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
            this.skeleton.animationPropertiesOverride.enableBlending = true;
            this.skeleton.animationPropertiesOverride.blendingSpeed = 1.0;
            this.bones["head"] = this.getBoneByName("head") || null;
        }
        this.populateAnimatables();
        this.populateAnimationGroup();
        return 0;
    }

    _removeMeshReferences(meshID) {
        for (let boneID in this._organMeshIDsAttachedToBones) {
            for (let meshID in this._organMeshIDsAttachedToBones[boneID]) {
                if (this._organMeshIDsAttachedToBones[boneID].hasOwnProperty(meshID)) {
                    delete this._organMeshIDsAttachedToBones[boneID][meshID];
                }
            }
            if (Object.keys(this._organMeshIDsAttachedToBones[boneID]).length == 0) {
                delete this._organMeshIDsAttachedToBones[boneID];
            }
        }
        for (let boneID in this._cosmeticMeshIDsAttachedToBones) {
            for (let meshID in this._cosmeticMeshIDsAttachedToBones[boneID]) {
                if (this._cosmeticMeshIDsAttachedToBones[boneID].hasOwnProperty(meshID)) {
                    delete this._cosmeticMeshIDsAttachedToBones[boneID][meshID];
                }
            }
            if (Object.keys(this._cosmeticMeshIDsAttachedToBones[boneID]).length == 0) {
                delete this._cosmeticMeshIDsAttachedToBones[boneID];
            }
        }
        super._removeMeshReferences(meshID);
        return 0;
    }
    attachToHead(meshID, textureID, options) {
        return this.attachMeshIDToBone(meshID, textureID, "head", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), this.baseScaling, options);
    }
    detachFromHead() {
        return this.detachAllFromBone("head");
    }
    attachToLeftEye(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "eye.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(270), 0, 0), this.baseScaling, options);
    }
    detachFromLeftEye() {
        return this.detachAllFromBone("eye.l");
    }
    attachToRightEye(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "eye.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(270), 0, 0), this.baseScaling, options);
    }
    detachFromRightEye() {
        return this.detachAllFromBone("eye.r");
    }
    attachToLeftEar(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "ear.l", BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero(), this.baseScaling, options);
    }
    detachFromLeftEar() {
        return this.detachAllFromBone("ear.l");
    }
    attachToRightEar(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "ear.r", BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero(), this.baseScaling, options);
    }
    detachFromRightEar() {
        return this.detachAllFromBone("ear.r");
    }
    attachToNeck(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "neck", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), this.baseScaling, options);
    }
    detachFromNeck() {
        return this.detachAllFromBone("neck");
    }
    attachToLeftShoulder(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "shoulder.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(315), BABYLON.Tools.ToRadians(120)), this.baseScaling, options);
    }
    detachFromLeftShoulder() {
        return this.detachAllFromBone("shoulder.l");
    }
    attachToRightShoulder(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "shoulder.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(225), BABYLON.Tools.ToRadians(60)), this.baseScaling, options);
    }
    detachFromRightShoulder() {
        return this.detachAllFromBone("shoulder.r");
    }
    attachToLeftUpperArm(meshID = "missingMesh", textureID = "missingTexture", options = {}) {
        return this.attachMeshIDToBone(meshID, textureID, "upperArm.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), this.baseScaling, options);
    }
    detachFromLeftUpperArm() {
        return this.detachAllFromBone("upperArm.l");
    }
    attachToRightUpperArm(meshID = "missingMesh", textureID = "missingTexture", options = {}) {
        return this.attachMeshIDToBone(meshID, textureID, "upperArm.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), this.baseScaling, options);
    }
    detachFromToRightUpperArm() {
        return this.detachAllFromBone("upperArm.r");
    }
    attachToLeftForearm(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "forearm.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), this.baseScaling, options);
    }
    detachFromLeftForearm() {
        return this.detachAllFromBone("forearm.l");
    }
    attachToRightForearm(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "forearm.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(120), BABYLON.Tools.ToRadians(-90)), this.baseScaling, options);
    }
    detachFromRightForearm() {
        return this.detachAllFromBone("forearm.r");
    }
    attachToLeftWrist(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "wrist.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(90)), this.baseScaling, options);
    }
    detachFromLeftWrist() {
        return this.detachAllFromBone("wrist.l");
    }
    attachToRightWrist(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "wrist.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(90)), this.baseScaling, options);
    }
    detachFromRightWrist() {
        return this.detachAllFromBone("wrist.r");
    }
    attachToLeftHand(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "hand.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(90)), this.baseScaling, options);
    }
    detachFromLeftHand() {
        return this.detachAllFromBone("hand.l");
    }
    attachToRightHand(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "hand.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(90)), this.baseScaling, options);
    }
    detachFromRightHand() {
        return this.detachAllFromBone("hand.r");
    }
    attachToLeftPinkieFinger(meshID = "missingMesh", textureID = "missingTexture", options = {}) {
        return this.attachMeshIDToBone(meshID, textureID, "fingersPinkieProximinalPhalanx.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), this.baseScaling, options);
    }
    detachFromLeftPinkieFinger() {
        return this.detachAllFromBone("fingersPinkieProximinalPhalanx.l");
    }
    attachToLeftRingFinger(meshID = "missingMesh", textureID = "missingTexture", options = {}) {
        return this.attachMeshIDToBone(meshID, textureID, "fingersRingProximinalPhalanx.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), this.baseScaling, options);
    }
    detachFromLeftRingFinger() {
        return this.detachAllFromBone("fingersRingProximinalPhalanx.l");
    }
    attachToLeftMiddleFinger(meshID = "missingMesh", textureID = "missingTexture", options = {}) {
        return this.attachMeshIDToBone(meshID, textureID, "fingersRingProximinalPhalanx.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), this.baseScaling, options);
    }
    detachFromLeftMiddleFinger() {
        return this.detachAllFromBone("fingersRingProximinalPhalanx.l");
    }
    attachToLeftIndexFinger(meshID = "missingMesh", textureID = "missingTexture", options = {}) {
        return this.attachMeshIDToBone(meshID, textureID, "fingersIndexProximinalPhalanx.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), this.baseScaling, options);
    }
    detachFromLeftIndexFinger() {
        return this.detachAllFromBone("fingersIndexProximinalPhalanx.l");
    }
    attachToLeftThumb(meshID = "missingMesh", textureID = "missingTexture", options = {}) {
        return this.attachMeshIDToBone(meshID, textureID, "thumbProximinalPhalanx.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), this.baseScaling, options);
    }
    detachFromLeftThumb() {
        return this.detachAllFromBone("thumbProximinalPhalanx.l");
    }
    attachToRightPinkieFinger(meshID = "missingMesh", textureID = "missingTexture", options = {}) {
        return this.attachMeshIDToBone(meshID, textureID, "fingersPinkieProximinalPhalanx.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), this.baseScaling, options);
    }
    detachFromRightPinkieFinger() {
        return this.detachAllFromBone("fingersPinkieProximinalPhalanx.r");
    }
    attachToRightRingFinger(meshID = "missingMesh", textureID = "missingTexture", options = {}) {
        return this.attachMeshIDToBone(meshID, textureID, "fingersRingProximinalPhalanx.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), this.baseScaling, options);
    }
    detachFromRightRingFinger() {
        return this.detachAllFromBone("fingersRingProximinalPhalanx.r");
    }
    attachToRightMiddleFinger(meshID = "missingMesh", textureID = "missingTexture", options = {}) {
        return this.attachMeshIDToBone(meshID, textureID, "fingersProximinalPhalanx.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), this.baseScaling, options);
    }
    detachFromRightMiddleFinger() {
        return this.detachAllFromBone("fingersProximinalPhalanx.r");
    }
    attachToRightIndexFinger(meshID = "missingMesh", textureID = "missingTexture", options = {}) {
        return this.attachMeshIDToBone(meshID, textureID, "fingersIndexProximinalPhalanx.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), this.baseScaling, options);
    }
    detachFromRightIndexFinger() {
        return this.detachAllFromBone("fingersIndexProximinalPhalanx.r");
    }
    attachToRightThumb(meshID = "missingMesh", textureID = "missingTexture", options = {}) {
        return this.attachMeshIDToBone(meshID, textureID, "thumbProximinalPhalanx.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), this.baseScaling, options);
    }
    detachFromRightThumb() {
        return this.detachAllFromBone("thumbProximinalPhalanx.r");
    }
    attachToChest(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "chest", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), this.baseScaling, options);
    }
    detachFromChest() {
        return this.detachAllFromBone("chest");
    }
    attachToSpine(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "spine", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), this.baseScaling, options);
    }
    detachFromSpine() {
        return this.detachAllFromBone("spine");
    }
    attachToPelvis(meshID = "missingMesh", textureID = "missingTexture", options = {}) {
        return this.attachMeshIDToBone(meshID, textureID, "pelvis", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), this.baseScaling, options);
    }
    detachFromPelvis() {
        return this.detachAllFromBone("pelvis");
    }
    attachToTailBase(meshID = "missingMesh", textureID = "missingTexture", options = {}) {
        return this.attachMeshIDToBone(meshID, textureID, "tailBaseMiddle", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), this.baseScaling, options);
    }
    detachFromTailBase() {
        return this.detachAllFromBone("tailBaseMiddle");
    }
    attachToLeftThigh(meshID = "missingMesh", textureID = "missingTexture", options = {}) {
        return this.attachMeshIDToBone(meshID, textureID, "thigh.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), this.baseScaling, options);
    }
    detachFromLeftThigh() {
        return this.detachAllFromBone("thigh.l");
    }
    attachToRightThigh(meshID = "missingMesh", textureID = "missingTexture", options = {}) {
        return this.attachMeshIDToBone(meshID, textureID, "thigh.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), this.baseScaling, options);
    }
    detachFromRightThigh() {
        return this.detachAllFromBone("thigh.r");
    }
    attachToLeftShin(meshID = "missingMesh", textureID = "missingTexture", options = {}) {
        return this.attachMeshIDToBone(meshID, textureID, "shin.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), this.baseScaling, options);
    }
    detachFromLeftShin() {
        return this.detachAllFromBone("shin.l");
    }
    attachToRightShin(meshID = "missingMesh", textureID = "missingTexture", options = {}) {
        return this.attachMeshIDToBone(meshID, textureID, "shin.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), this.baseScaling, options);
    }
    detachFromRightShin() {
        return this.detachAllFromBone("shin.r");
    }
    attachToLeftFoot(meshID = "missingMesh", textureID = "missingTexture", options = {}) {
        return this.attachMeshIDToBone(meshID, textureID, "foot.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), this.baseScaling, options);
    }
    detachFromLeftFoot() {
        return this.detachAllFromBone("foot.l");
    }
    attachToRightFoot(meshID = "missingMesh", textureID = "missingTexture", options = {}) {
        return this.attachMeshIDToBone(meshID, textureID, "foot.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), this.baseScaling, options);
    }
    detachFromRightFoot() {
        return this.detachAllFromBone("foot.r");
    }

    attachMeshIDToBone(meshID = "missingMesh", materialID = "missingTexture", boneID = "ROOT", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        return super.attachMeshIDToBone(meshID, materialID, boneID, position, rotation, scaling, options);
    }
    attachMeshToBone(mesh, bone, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options) {
        return super.attachMeshToBone(mesh, bone, position, rotation, scaling, options);
    }

    generateAttachedMeshes() {
        this.generateOrganMeshes();
        this.generateCosmeticMeshes();
        return 0;
    }
    generateOrganMeshes() {
        if (!this.hasSkeleton()) {
            return 1;
        }
        /** @type {string} */
        this.sEyeTexture = String(this.sEyeType).concat(this.sEyeIrisColour.slice(1)).concat(this.sEyeScleraColour.slice(1));
        if (!Game.hasLoadedTexture(this.sEyeTexture)) {
            Game.modifySVG(
                this.sEyeType,
                this.sEyeTexture,
                {
                    "iris": {"background":this.sEyeIrisColour},
                    "sclera": {"background":this.sEyeScleraColour}
                }
            );
        }
        this.attachMeshIDToBone("eye01", this.sEyeTexture, "eye.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(270), 0, 0), this.getScaling());
        this.attachMeshIDToBone("eye01", this.sEyeTexture, "eye.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(270), 0, 0), this.getScaling());
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
    /**
     * @override
     */
    createCollisionMesh() {
        if (this.hasCollisionMesh()) {
            this.removeCollisionMesh();
        }
        let collisionMesh = Game.createAreaMesh(
            String(this.id).concat("-collisionMesh"),
            "CUBE",
            this.width,
            this.height * 1.1,
            this.width,
            this.meshes[0].position,
            this.meshes[0].rotation,
            BABYLON.Vector3.One()
        );
        if (!(collisionMesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        this.setCollisionMesh(collisionMesh);
        this.collisionMesh.ellipsoidOffset.y = this.height / 2;
        this.collisionMesh.ellipsoid.x = this.width / 2;
        this.collisionMesh.ellipsoid.y = this.height / 2;
        this.collisionMesh.ellipsoid.z = this.width / 2;
        return this.collisionMesh;
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

    populateAnimatables() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 1;
        }
        let animatable = null;
        animatable = this.createAnimatableFromRangeName("standingIdle", "90_idleStanding");
        if (animatable instanceof BABYLON.Animatable)
            animatable.syncWith(null);
        animatable = this.createAnimatableFromRangeName("crouchingIdle", "90_idleCrouching");
        if (animatable instanceof BABYLON.Animatable)
            animatable.syncWith(null);
        animatable = this.createAnimatableFromRangeName("proneIdle", "90_idleProne");
        if (animatable instanceof BABYLON.Animatable)
            animatable.syncWith(null);
        animatable = this.createAnimatableFromRangeName("sitting", "90_idleSitChair");
        if (animatable instanceof BABYLON.Animatable)
            animatable.syncWith(null);
        animatable = this.createAnimatableFromRangeName("lying", "90_idleLyingDown");
        if (animatable instanceof BABYLON.Animatable)
            animatable.syncWith(null);
        animatable = this.createAnimatableFromRangeName("dead", "80_deathPose01");
        if (animatable instanceof BABYLON.Animatable)
            animatable.syncWith(null);
        animatable = this.createAnimatableFromRangeName("walking", "93_walkingKneesBent");
        if (animatable instanceof BABYLON.Animatable)
            animatable.syncWith(null);
        animatable = this.createAnimatableFromRangeName("running", "93_runningKneesBent");
        if (animatable instanceof BABYLON.Animatable)
            animatable.syncWith(null);
        animatable = this.createAnimatableFromRangeName("crouching", "93_crouchingKneesBent");
        if (animatable instanceof BABYLON.Animatable)
            animatable.syncWith(null);
        animatable = this.createAnimatableFromRangeName("prone", "93_proneKneesBent");
        if (animatable instanceof BABYLON.Animatable)
            animatable.syncWith(null);
        animatable = this.createAnimatableFromRangeName("blink", "70_blink");
        if (animatable instanceof BABYLON.Animatable)
            animatable.syncWith(null);
        animatable = this.createAnimatableFromRangeName("blink_half_lidded", "70_blink_half_lidded");
        if (animatable instanceof BABYLON.Animatable)
            animatable.syncWith(null);
        // Punching blends
        animatable = this.createAnimatableFromRangeName("punchRightIdle", "71_rightHandedPunch");
        if (animatable instanceof BABYLON.Animatable)
            animatable.syncWith(this.animatables["standingIdle"]);
        animatable = this.createAnimatableFromRangeName("punchRightWalking", "71_rightHandedPunch");
        if (animatable instanceof BABYLON.Animatable)
            animatable.syncWith(this.animatables["walking"]);
        animatable = this.createAnimatableFromRangeName("punchRightCrouchingIdle", "71_rightHandedPunch");
        if (animatable instanceof BABYLON.Animatable)
            animatable.syncWith(this.animatables["crouchingIdle"]);
        animatable = this.createAnimatableFromRangeName("punchRightCrouching", "71_rightHandedPunch");
        if (animatable instanceof BABYLON.Animatable)
            animatable.syncWith(this.animatables["crouching"]);
        return 0;
    }
    populateAnimationGroup() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 1;
        }
        this.createAnimationGroupFromAnimatables("standingIdle", "standingIdle");
        this.createAnimationGroupFromAnimatables("crouchingIdle", "crouchingIdle");
        this.createAnimationGroupFromAnimatables("proneIdle", "proneIdle");
        this.createAnimationGroupFromAnimatables("walking", "walking");
        this.createAnimationGroupFromAnimatables("running", "running", 0.0, true, (1.8 * this.getScaling().y));
        this.createAnimationGroupFromAnimatables("crouching", "crouching", 0.0, true, 1.5);
        this.createAnimationGroupFromAnimatables("prone", "prone", 0.0, 1.5);
        this.createAnimationGroupFromAnimatables("sitting", "sitting");
        this.createAnimationGroupFromAnimatables("lying", "lying");
        this.createAnimationGroupFromAnimatables("dead", "dead", 0, false);
        return 0;
    }
    updateAnimation() {
        if (this.stanceFrameCount < this.stanceFrameCountMax) {
            this.stanceFrameCount++;
        }
        let anim = "";
        if (this.oOverrideAnimation != null) {
            anim = this.oOverrideAnimation;
        }
        else {
            switch (this.groundedState) {
                case GroundedStateEnum.FALL: {
                    break;
                }
                case GroundedStateEnum.GROUND: {
                    switch (this.stance) {
                        case StanceEnum.STAND: {
                            switch (this.movementPace) {
                                case MovementPaceEnum.NONE: {
                                    anim = "standingIdle";
                                    break;
                                }
                                case MovementPaceEnum.AMBLE: {
                                    anim = "walking";
                                    break;
                                }
                                case MovementPaceEnum.WALK: {
                                    anim = "walking";
                                    break;
                                }
                                case MovementPaceEnum.RUN: {
                                    anim = "running";
                                    break;
                                }
                                case MovementPaceEnum.SPRINT: {
                                    anim = "running";
                                    break;
                                }
                            }
                            break;
                        }
                        case StanceEnum.CROUCH: {
                            switch (this.movementPace) {
                                case MovementPaceEnum.NONE: {
                                    anim = "crouchingIdle";
                                    break;
                                }
                                default: {
                                    anim = "crouching";
                                }
                            }
                            break;
                        }
                        case StanceEnum.PRONE: {
                            switch (this.movementPace) {
                                case MovementPaceEnum.NONE: {
                                    anim = "proneIdle";
                                    break;
                                }
                                default: {
                                    anim = "prone";
                                }
                            }
                            break;
                        }
                    }
                    break;
                }
                case GroundedStateEnum.FLY: {
                    break;
                }
                case GroundedStateEnum.SWIM: {
                    break;
                }
            }
        }
        if (this.animationPriorityUpdated) {
            this.animationPriorityUpdated = false;
            if (this.animationPriority >= 2) {
                this.pauseAllAnimations();
            }
            else if (this.animationPriority == 0) {
                this.unpauseAllAnimations();
            }
        }
        if (this.animationPriority == 0) {
            this.beginAnimation(anim);
        }
        return 0;
    }
    doProne() {
        this.setStance(StanceEnum.PRONE);
        this.oOverrideAnimation = null;
        return 0;
    }
    doCrouch() {
        this.setStance(StanceEnum.CROUCH);
        this.oOverrideAnimation = null;
        return 0;
    }
    doStand() {
        this.setStance(StanceEnum.STAND);
        this.oOverrideAnimation = null;
        return 0;
    }
    doLay() {
        this.setStance(StanceEnum.OVERRIDE);
        this.oOverrideAnimation = this.animationGroups["lying"];
        return 0;
    }
    doSit() {
        this.setStance(StanceEnum.OVERRIDE);
        this.oOverrideAnimation = this.animationGroups["sitting"];
        return 0;
    }
    doAttack() {
        return 0;
    }
    doAttackFinished() {
        return 0;
    }
    doDeath() {
        this.setStance(StanceEnum.OVERRIDE);
        this.oOverrideAnimation = this.animationGroups["dead"];
        return 0;
    }

    setGroundedState(groundedState) {
        this.groundedState = groundedState;
        return 0;
    }
    /**
     * 
     * @param {StanceEnum} stance 
     * @returns {number}
     */
    setStance(stance) {
        if (!StanceEnum.properties.hasOwnProperty(stance)) {
            return 1;
        }
        if (stance != this.stance) {
            if (this.previousStance == stance && this.stanceFrameCount < this.stanceFrameCountMin) {
                this.stanceFrameCount = this.previousStanceFrameCount;
                this.previousStance = this.otherPreviousStance;
                this.previousStanceFrameCount = this.otherPreviousStanceFrameCount;
            }
            else {
                this.otherPreviousStance = this.previousStance;
                this.otherPreviousStanceFrameCount = this.previousStanceFrameCount;
                this.previousStance = this.stance;
                this.previousStanceFrameCount = this.stanceFrameCount;
                this.stanceFrameCount = 0;
            }
        }
        this.stance = stance;
        return 0;
    }
    setMovementPace(movementPace) {
        this.movementPace = Number.parseFloat(movementPace);
        return 0;
    }

    hideAttachedMeshes() {
        if (this.locked || !this.enabled) {
            return 0;
        }
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 2;
        }
        for (let boneID in this._meshesAttachedToBones) {
            if (boneID == "FOCUS" || boneID == "ROOT") {
                continue;
            }
            for (let meshID in this._meshesAttachedToBones[boneID]) {
                if (Game.hasMesh(meshID)) {
                    Game.getMesh(meshID).isVisible = false;
                }
            }
        }
        return 0;
    }
    showAttachedMeshes() {
        if (this.locked || !this.enabled) {
            return 0;
        }
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 2;
        }
        for (let boneID in this._meshesAttachedToBones) {
            if (boneID == "FOCUS" || boneID == "ROOT") {
                continue;
            }
            else if (this.helmetVisible && boneID == "head") {
                continue;
            }
            for (let meshID in this._meshesAttachedToBones[boneID]) {
                if (Game.hasMesh(meshID)) {
                    Game.getMesh(meshID).isVisible = true;
                }
            }
        }
        return 0;
    }

    hideMesh() {
        for (let i = 0; i < this.meshes.length; i++) {
            this.meshes[i].isVisible = false;
        }
        this.hideAttachedMeshes();
        return 0;
    }
    showMesh() {
        for (let i = 0; i < this.meshes.length; i++) {
            this.meshes[i].isVisible = true;
        }
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
        //console.log(`Running <CreatureController> ${this.id}.updateTargetRay()`);
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
        if (this.locked || !this.enabled) {
            return 0;
        }
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

    setAnimationPriority(number = 0) {
        if (this.locked || !this.enabled) {
            return 0;
        }
        this.animationPriority = number;
        this.animationPriorityUpdated = true;
        return 0;
    }

    _filterBoneNames(boneID) {
        let fBoneID = boneID.toLowerCase().replace(/[_\-]+/g, ".");
        switch (fBoneID) {
            case "focus": {
                boneID = "FOCUS";
                break;
            }
            case "head": {
                boneID = "head";
                break;
            }
            case "ear.r": {
                boneID = "ear.r";
                break;
            }
            case "ear.l": {
                boneID = "ear.l";
                break;
            }
            case "neck": {
                boneID = "neck";
                break;
            }
            case "chest": {
                boneID = "chest";
                break;
            }
            case "shoulder.r": {
                boneID = "shoulder.r";
                break;
            }
            case "shoulder.l": {
                boneID = "shoulder.l";
                break;
            }
            case "upperarm.r": {
                boneID = "upperArm.r";
                break;
            }
            case "upperarm.l": {
                boneID = "upperArm.l";
                break;
            }
            case "forearm.r": {
                boneID = "forearm.r";
                break;
            }
            case "forearm.l": {
                boneID = "forearm.l";
                break;
            }
            case "wrist.r": {
                boneID = "wrist.r";
                break;
            }
            case "wrist.l": {
                boneID = "wrist.l";
                break;
            }
            case "hand.r": {
                boneID = "hand.r";
                break;
            }
            case "hand.l": {
                boneID = "hand.l";
                break;
            }
            case "fingerspinkieproximinalphalanx.r":
            case "pinkiefinger.r": {
                boneID = "fingersPinkieProximinalPhalanx.r";
                break;
            }
            case "fingersringproximinalphalanx.r":
            case "ringfinger.r": {
                boneID = "fingersRingProximinalPhalanx.r";
                break;
            }
            case "fingersproximinalphalanx.r":
            case "middlefinger.r": {
                boneID = "fingersProximinalPhalanx.r";
                break;
            }
            case "fingersindexproximinalphalanx.r":
            case "indexfinger.r": {
                boneID = "fingersIndexProximinalPhalanx.r";
                break;
            }
            case "thumbproximinalphalanx.r":
            case "thumb.r": {
                boneID = "thumbProximinalPhalanx.r";
                break;
            }
            
            case "fingerspinkieproximinalphalanx.l":
            case "pinkiefinger.l": {
                boneID = "fingersPinkieProximinalPhalanx.l";
                break;
            }
            case "fingersringproximinalphalanx.l":
            case "ringfinger.l": {
                boneID = "fingersRingProximinalPhalanx.l";
                break;
            }
            case "fingersproximinalphalanx.l":
            case "middlefinger.l": {
                boneID = "fingersProximinalPhalanx.l";
                break;
            }
            case "fingersindexproximinalphalanx.l":
            case "indexfinger.l": {
                boneID = "fingersIndexProximinalPhalanx.l";
                break;
            }
            case "thumbproximinalphalanx.l":
            case "thumb.l": {
                boneID = "thumbProximinalPhalanx.l";
                break;
            }
            case "lowerback":
            case "spine": {
                boneID = "spine";
                break;
            }
            case "pelvis":
            case "hips": {
                boneID = "pelvis";
                break;
            }
            case "thigh.r": {
                boneID = "thigh.r";
                break;
            }
            case "thigh.l": {
                boneID = "thigh.l";
                break;
            }
            case "shin.r": {
                boneID = "shin.r";
                break;
            }
            case "shin.l": {
                boneID = "shin.l";
                break;
            }
            case "foot.r": {
                boneID = "foot.r";
                break;
            }
            case "foot.l": {
                boneID = "foot.l";
                break;
            }
            case "root": {
                boneID = "ROOT";
                break;
            }
            default: {
                boneID = "ROOT";
            }
        }
        return boneID;
    }
    /**
     * 
     * @param {Object.<string, Object.<string, Object<...>>>} attachmentBlob Object-map of bones to objectified entities containing a meshID and materialID
     * @param {Object} [attachmentMap] 
     * @example {"HAND_R": {"meshIDs": ["knife01"], "materialID": "knife01Texture"}}
     * @returns 
     */
    assignAttachments(attachmentBlob, attachmentMap = {}) {
        if (EntityController.debugMode) console.group(`Running <CreatureController> ${this.id}.assignAttachments(...)`)
        let meshID = "";
        let materialID = "";
        let removeAttachment = false;
        if (!(attachmentBlob instanceof Object)) {
            if (EntityController.debugMode) {
                console.log("Attachment parameters aren't an object.");
                console.groupEnd();
            }
            return 1;
        }
        for (let boneID in attachmentBlob) {
            if (attachmentBlob[boneID] == null) {
                if (EntityController.debugMode) console.log(`Attachment bone is null.`)
                removeAttachment = true;
            }
            else if (!(attachmentBlob[boneID] instanceof Object)) {
                if (EntityController.debugMode) console.log(`Attachment bone isn't an object.`)
                removeAttachment = true;
            }
            else {
                removeAttachment = false;
                if (attachmentBlob[boneID].hasOwnProperty("meshIDs")) {
                    meshID = attachmentBlob[boneID]["meshIDs"][0];
                    if (!Game.hasMesh(meshID)) {
                        removeAttachment = true;
                        meshID = "missingMesh";
                    }
                }
                else {
                    removeAttachment = true;
                    meshID = "missingMesh";
                }
                if (meshID == "NONE") { // I feel dirty :V 2022-07-22
                    removeAttachment = true;
                }
                if (attachmentBlob[boneID].hasOwnProperty("materialID")) {
                    materialID = attachmentBlob[boneID]["materialID"];
                }
                else if (attachmentBlob[boneID].hasOwnProperty("textureID")) {
                    materialID = attachmentBlob[boneID]["textureID"];
                }
                else {
                    removeAttachment = true;
                    materialID = "missingMaterial";
                }
            }
            let fBoneID = this._filterBoneNames(boneID);
            if (attachmentMap.hasOwnProperty(fBoneID)) {
                for (let otherMeshID in this._meshesAttachedToBones[fBoneID]) {
                    if (!Game.hasMesh(otherMeshID)) {
                        continue;
                    }
                    let otherMesh = Game.getMesh(otherMeshID);
                    if (attachmentMap[fBoneID].hasOwnProperty("meshID") && otherMesh.name == attachmentMap[fBoneID]["meshID"]) {
                        this.detachMeshFromBone(otherMesh, fBoneID, true);
                    }
                }
            }
            switch (fBoneID) {
                case "FOCUS": {
                    if (removeAttachment) {
                        this.detachFromFOCUS();
                    }
                    else {
                        
                        this.attachToFOCUS(meshID, materialID);
                    }
                    break;
                }
                case "head": {
                    if (removeAttachment) {
                        this.detachFromHead();
                    }
                    else {
                        this.attachToHead(meshID, materialID);
                    }
                    break;
                }
                case "ear.r": {
                    if (removeAttachment) {
                        this.detachFromRightEar();
                    }
                    else {
                        this.attachToRightEar(meshID, materialID);
                    }
                    break;
                }
                case "ear.l": {
                    if (removeAttachment) {
                        this.detachFromLeftEar();
                    }
                    else {
                        this.attachToLeftEar(meshID, materialID);
                    }
                    break;
                }
                case "neck": {
                    if (removeAttachment) {
                        this.detachFromNeck();
                    }
                    else {
                        this.attachToNeck(meshID, materialID);
                    }
                    break;
                }
                case "chest": {
                    if (removeAttachment) {
                        this.detachFromChest();
                    }
                    else {
                        this.attachToChest(meshID, materialID);
                    }
                    break;
                }
                case "shoulder.r": {
                    if (removeAttachment) {
                        this.detachFromRightShoulder();
                    }
                    else {
                        this.attachToRightShoulder(meshID, materialID);
                    }
                    break;
                }
                case "shoulder.l": {
                    if (removeAttachment) {
                        this.detachFromLeftShoulder();
                    }
                    else {
                        this.attachToLeftShoulder(meshID, materialID);
                    }
                    break;
                }
                case "upperArm.r": {
                    if (removeAttachment) {
                        this.detachFromRightUpperArm();
                    }
                    else {
                        this.attachToRightUpperArm(meshID, materialID);
                    }
                    break;
                }
                case "upperArm.l": {
                    if (removeAttachment) {
                        this.detachFromLeftUpperArm();
                    }
                    else {
                        this.attachToLeftUpperArm(meshID, materialID);
                    }
                    break;
                }
                case "forearm.r": {
                    if (removeAttachment) {
                        this.detachFromRightForearm();
                    }
                    else {
                        this.attachToRightForearm(meshID, materialID);
                    }
                    break;
                }
                case "forearm.l": {
                    if (removeAttachment) {
                        this.detachFromLeftForearm();
                    }
                    else {
                        this.attachToLeftForearm(meshID, materialID);
                    }
                    break;
                }
                case "wrist.r": {
                    if (removeAttachment) {
                        this.detachFromRightWrist();
                    }
                    else {
                        this.attachToRightWrist(meshID, materialID);
                    }
                    break;
                }
                case "wrist.l": {
                    if (removeAttachment) {
                        this.detachFromLeftWrist();
                    }
                    else {
                        this.attachToLeftWrist(meshID, materialID);
                    }
                    break;
                }
                case "hand.r": {
                    if (removeAttachment) {
                        this.detachFromRightHand();
                    }
                    else {
                        this.attachToRightHand(meshID, materialID);
                    }
                    break;
                }
                case "hand.l": {
                    if (removeAttachment) {
                        this.detachFromLeftHand();
                    }
                    else {
                        this.attachToLeftHand(meshID, materialID);
                    }
                    break;
                }
                case "fingersPinkieProximinalPhalanx.r": {
                    if (removeAttachment) {
                        this.detachFromRightPinkieFinger();
                    }
                    else {
                        this.attachToRightPinkieFinger(meshID, materialID);
                    }
                    break;
                }
                case "fingersRingProximinalPhalanx.r": {
                    if (removeAttachment) {
                        this.detachFromRightRingFinger();
                    }
                    else {
                        this.attachToRightRingFinger(meshID, materialID);
                    }
                    break;
                }
                case "fingersProximinalPhalanx.r": {
                    if (removeAttachment) {
                        this.detachFromRightMiddleFinger();
                    }
                    else {
                        this.attachToRightMiddleFinger(meshID, materialID);
                    }
                    break;
                }
                case "fingersIndexProximinalPhalanx.r": {
                    if (removeAttachment) {
                        this.detachFromRightIndexFinger();
                    }
                    else {
                        this.attachToRightIndexFinger(meshID, materialID);
                    }
                    break;
                }
                case "thumbProximinalPhalanx.r": {
                    if (removeAttachment) {
                        this.detachFromRightThumb();
                    }
                    else {
                        this.attachToRightThumb(meshID, materialID);
                    }
                    break;
                }
                case "fingersPinkieProximinalPhalanx.l": {
                    if (removeAttachment) {
                        this.detachFromLeftPinkieFinger();
                    }
                    else {
                        this.attachToLeftPinkieFinger(meshID, materialID);
                    }
                    break;
                }
                case "fingersRingProximinalPhalanx.l": {
                    if (removeAttachment) {
                        this.detachFromLeftRingFinger();
                    }
                    else {
                        this.attachToLeftRingFinger(meshID, materialID);
                    }
                    break;
                }
                case "fingersProximinalPhalanx.l": {
                    if (removeAttachment) {
                        this.detachFromLeftMiddleFinger();
                    }
                    else {
                        this.attachToLeftMiddleFinger(meshID, materialID);
                    }
                    break;
                }
                case "fingersIndexProximinalPhalanx.l": {
                    if (removeAttachment) {
                        this.detachFromLeftIndexFinger();
                    }
                    else {
                        this.attachToLeftIndexFinger(meshID, materialID);
                    }
                    break;
                }
                case "thumbProximinalPhalanx.l": {
                    if (removeAttachment) {
                        this.detachFromLeftThumb();
                    }
                    else {
                        this.attachToLeftThumb(meshID, materialID);
                    }
                    break;
                }
                case "spine": {
                    if (removeAttachment) {
                        this.detachFromSpine();
                    }
                    else {
                        this.attachToSpine(meshID, materialID);
                    }
                    break;
                }
                case "pelvis": {
                    if (removeAttachment) {
                        this.detachFromPelvis();
                    }
                    else {
                        this.attachToPelvis(meshID, materialID);
                    }
                    break;
                }
                case "shin.r": {
                    if (removeAttachment) {
                        this.detachFromRightShin();
                    }
                    else {
                        this.attachToRightShin(meshID, materialID);
                    }
                    break;
                }
                case "shin.l": {
                    if (removeAttachment) {
                        this.detachFromLeftShin();
                    }
                    else {
                        this.attachToLeftShin(meshID, materialID);
                    }
                    break;
                }
                case "foot.r": {
                    if (removeAttachment) {
                        this.detachFromRightFoot();
                    }
                    else {
                        this.attachToRightFoot(meshID, materialID);
                    }
                    break;
                }
                case "foot.l": {
                    if (removeAttachment) {
                        this.detachFromLeftFoot();
                    }
                    else {
                        this.attachToLeftFoot(meshID, materialID);
                    }
                    break;
                }
                case "root": {
                    if (removeAttachment) {
                        this.detachFromROOT();
                    }
                    else {
                        this.attachToROOT(meshID, materialID);
                    }
                    break;
                }
                default: {
                    if (EntityController.debugMode) console.log(`Bone "${boneID}" doesn't exist.`)
                    continue;
                }
            }
            if (removeAttachment) {
                if (attachmentMap.hasOwnProperty(fBoneID)) {
                    delete attachmentMap[fBoneID];
                }
            }
            else {
                if (attachmentMap.hasOwnProperty(fBoneID)) {
                    delete attachmentMap[fBoneID];
                }
                attachmentMap[fBoneID] = {"meshID": meshID, "materialID": materialID};
            }
            if (EntityController.debugMode) console.groupEnd();
        }
        return 0;
    }
    update(objectBlob) {
        super.update(objectBlob);
        this.bHasRunAssignCreature = false;
        return 0;
    }
    assign(objectBlob) {
        super.assign(objectBlob);
        if (AbstractController.debugMode) console.group(`Running {CreatureController} ${this.id}.assign(controllerObject)`);
        if (objectBlob.hasOwnProperty("cosmetics") && objectBlob["cosmetics"] instanceof Object) {
            this.assignAttachments(objectBlob["cosmetics"], this._cosmeticMeshIDsAttachedToBones);
        }
        if (this.bHasRunAssignCreature == true) {
            if (AbstractController.debugMode) console.groupEnd();
            return 0;
        }
        this.bHasRunAssignCreature = true;
        if (objectBlob.hasOwnProperty("eyeType")) this.eEyeType = objectBlob.eyeType;
        switch (this.eEyeType) {
            case EyeEnum.SLIT: {
                this.sEyeType = "feralEye";
                break;
            }
            case EyeEnum.OBLONG: {
                this.sEyeType = "oblongEye";
                break;
            }
            case EyeEnum.CIRCLE:
            default: {
                this.sEyeType = "circularEye";
            }
        }
        if (objectBlob.hasOwnProperty("eyeColour")) {
            if (String(objectBlob.eyeColour).slice(0,1) == '#') {
                this.sEyeIrisColour = objectBlob.eyeColour;
            }
            else {
                this.sEyeIrisColour = Tools.colourNameToHex(objectBlob.eyeColour);
            }
        }
        if (objectBlob.hasOwnProperty("eyeBackground")) {
            if (String(objectBlob.eyeBackground).slice(0,1) == '#') {
                this.sEyeScleraColour = objectBlob.eyeBackground;
            }
            else {
                this.sEyeScleraColour = Tools.colourNameToHex(objectBlob.eyeBackground);
            }
        }
        if (objectBlob.hasOwnProperty("offensiveStance")) this.offensiveStance = objectBlob.offensiveStance;
        if (AbstractController.debugMode) console.groupEnd();
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        CreatureController.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        this.removeTarget();
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