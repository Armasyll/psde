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
     * @param {BABYLON.AbstractMesh} mesh 
     * @param {object} entityObject 
     */
    constructor(id = "", mesh = null, entityObject = {}) {
        if (!(super(id, mesh, entityObject) instanceof EntityController)) {
            if (AbstractController.debugMode) console.group(`Failed to create new CreatureController(${id}, ${mesh.id}, ${entityObject.id})`);
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
        CreatureController.set(this.id, this);
        if (EntityController.debugMode) console.info(`Finished creating new CreatureController(${this.id})`);
        if (EntityController.debugMode) console.groupEnd();
        this.postConstruct();
    }
    postConstruct() {
        if (this.bHasRunPostConstructCreature) {
            return 0;
        }
        super.postConstruct();
        this.bHasRunPostConstructCreature = true;
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

    detachFromAllBones(destroyMesh = true) {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 0;
        }
        for (let boneID in this._organMeshIDsAttachedToBones) {
            for (let meshID in this._organMeshIDsAttachedToBones[boneID]) {
                if (this._bonesAttachedToMeshes.hasOwnProperty(meshID)) {
                    let bone = this.getBone(boneID);
                    this.detachMeshFromBone(this._bonesAttachedToMeshes[meshID], bone, destroyMesh);
                }
                delete this._organMeshIDsAttachedToBones[boneID][meshID];
            }
            delete this._organMeshIDsAttachedToBones[boneID];
        }
        for (let boneID in this._cosmeticMeshIDsAttachedToBones) {
            for (let meshID in this._cosmeticMeshIDsAttachedToBones[boneID]) {
                if (this._bonesAttachedToMeshes.hasOwnProperty(meshID)) {
                    let bone = this.getBone(boneID);
                    this.detachMeshFromBone(this._bonesAttachedToMeshes[meshID], bone, destroyMesh);
                }
                delete this._cosmeticMeshIDsAttachedToBones[boneID][meshID];
            }
            delete this._cosmeticMeshIDsAttachedToBones[boneID];
        }
        super.detachFromAllBones(destroyMesh);
        return 0;
    }
    attachToHead(meshID, textureID, options) {
        return this.attachMeshIDToBone(meshID, textureID, "head", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), this.mesh.scaling.clone(), options);
    }
    detachFromHead() {
        return this.detachAllFromBone("head");
    }
    attachToLeftEye(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "eye.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(270), 0, 0), this.mesh.scaling.clone(), options);
    }
    detachFromLeftEye() {
        return this.detachAllFromBone("eye.l");
    }
    attachToRightEye(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "eye.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(270), 0, 0), this.mesh.scaling.clone(), options);
    }
    detachFromRightEye() {
        return this.detachAllFromBone("eye.r");
    }
    attachToLeftEar(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "ear.l", BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero(), this.mesh.scaling.clone(), options);
    }
    detachFromLeftEar() {
        return this.detachAllFromBone("ear.l");
    }
    attachToRightEar(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "ear.r", BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero(), this.mesh.scaling.clone(), options);
    }
    detachFromRightEar() {
        return this.detachAllFromBone("ear.r");
    }
    attachToNeck(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "neck", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), this.mesh.scaling.clone(), options);
    }
    detachFromNeck() {
        return this.detachAllFromBone("neck");
    }
    attachToLeftShoulder(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "shoulder.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(315), BABYLON.Tools.ToRadians(120)), this.mesh.scaling.clone(), options);
    }
    detachFromLeftShoulder() {
        return this.detachAllFromBone("shoulder.l");
    }
    attachToRightShoulder(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "shoulder.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(225), BABYLON.Tools.ToRadians(60)), this.mesh.scaling.clone(), options);
    }
    detachFromRightShoulder() {
        return this.detachAllFromBone("shoulder.r");
    }
    attachToLeftForearm(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "forearm.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(-90)), this.mesh.scaling.clone(), options);
    }
    detachFromLeftForearm() {
        return this.detachAllFromBone("forearm.l");
    }
    attachToRightForearm(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "forearm.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(120), BABYLON.Tools.ToRadians(-90)), this.mesh.scaling.clone(), options);
    }
    detachFromRightForearm() {
        return this.detachAllFromBone("forearm.r");
    }
    attachToLeftHand(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "hand.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(90)), this.mesh.scaling.clone(), options);
    }
    detachFromLeftHand() {
        return this.detachAllFromBone("hand.l");
    }
    attachToRightHand(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "hand.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(90)), this.mesh.scaling.clone(), options);
    }
    detachFromRightHand() {
        return this.detachAllFromBone("hand.r");
    }
    attachToChest(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "chest", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), this.mesh.scaling.clone(), options);
    }
    detachFromChest() {
        return this.detachAllFromBone("chest");
    }
    attachToSpine(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "spine", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), this.mesh.scaling.clone(), options);
    }
    detachFromSpine() {
        return this.detachAllFromBone("spine");
    }
    attachToPelvis(meshID, textureID = "missingTexture", options) {
        return this.attachMeshIDToBone(meshID, textureID, "pelvis", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180), 0), this.mesh.scaling.clone(), options);
    }
    detachFromPelvis() {
        return this.detachAllFromBone("pelvis");
    }

    attachMeshIDToBone(meshID = "missingMesh", materialID = "missingTexture", boneID = "ROOT", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        return super.attachMeshIDToBone(meshID, materialID, boneID, position, rotation, scaling, options);
    }
    attachMeshToBone(mesh, bone, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options) {
        return super.attachMeshToBone(mesh, bone, position, rotation, scaling, options);
    }

    attachOrganMeshToBone(mesh, boneID, position, rotation, scaling, options) {
        if (!this.hasBone(boneID)) {
            return 1;
        }
        if (!this._organMeshIDsAttachedToBones.hasOwnProperty(boneID)) {
            this._organMeshIDsAttachedToBones[boneID] = {};
        }
        this._organMeshIDsAttachedToBones[boneID][mesh.name] = mesh.material.name;
        let bone = this.getBoneByID(boneID);
        this.attachMeshToBone(mesh, bone, position, rotation, scaling, options);
        return 0;
    }
    attachOrganMeshIDToBone(meshID, materialID, boneID, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        if (AbstractController.debugMode) console.group(`Running {CreatureController} ${this.id}.attachOrganMeshIDToBone(${meshID}, ${materialID}, ${boneID}, ...)`);
        if (!this.hasBone(boneID)) {
            if (AbstractController.debugMode) {
                console.error("Couldn't find bone " + boneID);
                console.groupEnd();
            }
            return 1;
        }
        if (!this._organMeshIDsAttachedToBones.hasOwnProperty(boneID)) {
            this._organMeshIDsAttachedToBones[boneID] = {};
        }
        this._organMeshIDsAttachedToBones[boneID][meshID] = materialID;
        this.attachMeshIDToBone(meshID, materialID, boneID, position, rotation, scaling, options);
        if (AbstractController.debugMode) console.groupEnd();
        return 0;
    }
    detachOrganMeshesFromBone(boneID, destroyMesh = true) {
        let bone = null;
        if (boneID instanceof BABYLON.Bone) {
            bone = boneID;
            boneID = bone.id;
        }
        else if (!this.hasBone(boneID)) {
            return 1;
        }
        else {
            bone = this.getBone(boneID);
        }
        for (let meshID in this._organMeshIDsAttachedToBones[boneID]) {
            if (this._bonesAttachedToMeshes.hasOwnProperty(meshID)) {
                this.detachMeshFromBone(this._bonesAttachedToMeshes[meshID], bone, destroyMesh);
            }
        }
        delete this._organMeshIDsAttachedToBones[boneID];
        return 0;
    }
    detachOrganMeshes(destroyMesh = true) {
        for (let boneID in this._organMeshIDsAttachedToBones) {
            let bone = this.getBone(boneID);
            for (let meshID in this._organMeshIDsAttachedToBones[boneID]) {
                if (this._bonesAttachedToMeshes.hasOwnProperty(meshID)) {
                    this.detachMeshFromBone(this._bonesAttachedToMeshes[meshID], bone, destroyMesh);
                }
                delete this._organMeshIDsAttachedToBones[boneID][meshID];
            }
            delete this._organMeshIDsAttachedToBones[boneID];
        }
        return 0;
    }

    attachCosmeticMeshToBone(mesh, boneID, position, rotation, scaling, options) {
        if (!this.hasBone(boneID)) {
            return 1;
        }
        if (!this._cosmeticMeshIDsAttachedToBones.hasOwnProperty(boneID)) {
            this._cosmeticMeshIDsAttachedToBones[boneID] = {};
        }
        this._cosmeticMeshIDsAttachedToBones[boneID][mesh.name] = mesh.material.name;
        this.attachMeshToBone(mesh, bone, position, rotation, scaling, options);
        return 0;
    }
    attachCosmeticMeshIDToBone(meshID, materialID, boneID, position, rotation, scaling, options) {
        if (!this.hasBone(boneID)) {
            return 1;
        }
        if (!this._cosmeticMeshIDsAttachedToBones.hasOwnProperty(boneID)) {
            this._cosmeticMeshIDsAttachedToBones[boneID] = {};
        }
        this._cosmeticMeshIDsAttachedToBones[boneID][meshID] = materialID;
        this.attachMeshIDToBone(meshID, materialID, boneID, position, rotation, scaling, options);
        return 0;
    }
    detachCosmeticMeshesFromBone(boneID, destroyMesh = true) {
        let bone = null;
        if (boneID instanceof BABYLON.Bone) {
            bone = boneID;
            boneID = bone.id;
        }
        else if (!this.hasBone(boneID)) {
            return 1;
        }
        else {
            bone = this.getBone(boneID);
        }
        for (let meshID in this._cosmeticMeshIDsAttachedToBones[boneID]) {
            if (this._bonesAttachedToMeshes.hasOwnProperty(meshID)) {
                this.detachMeshFromBone(this._bonesAttachedToMeshes[meshID], boneID, destroyMesh)
            }
        }
        delete this._cosmeticMeshIDsAttachedToBones[boneID];
        return 0;
    }
    detachCosmeticMeshes(destroyMesh = true) {
        for (let boneID in this._cosmeticMeshIDsAttachedToBones) {
            let bone = this.getBone(boneID);
            for (let meshID in this._cosmeticMeshIDsAttachedToBones[boneID]) {
                if (this._bonesAttachedToMeshes.hasOwnProperty(meshID)) {
                    this.detachMeshFromBone(this._bonesAttachedToMeshes[meshID], bone, destroyMesh);
                }
                delete this._cosmeticMeshIDsAttachedToBones[boneID][meshID];
            }
            delete this._cosmeticMeshIDsAttachedToBones[boneID];
        }
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
        this.attachOrganMeshIDToBone("eye01", this.sEyeTexture, "eye.l", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(270), 0, 0), this.getScaling());
        this.attachOrganMeshIDToBone("eye01", this.sEyeTexture, "eye.r", BABYLON.Vector3.Zero(), new BABYLON.Vector3(BABYLON.Tools.ToRadians(270), 0, 0), this.getScaling());
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
        animatable = this.createAnimatableFromRangeName("dead", "91_death01");
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
        if (this.locked || !this.enabled) {
            return 0;
        }
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 2;
        }
        for (let bone in this._meshesAttachedToBones) {
            switch (bone) {
                case "FOCUS": case "ROOT": {
                    break;
                }
                case "head": {
                    if (!this.helmetVisible) {
                        break;
                    }
                }
                default: {
                    for (let mesh in this._meshesAttachedToBones[bone]) {
                        if (this._meshesAttachedToBones[bone][mesh] instanceof BABYLON.AbstractMesh) {
                            this._meshesAttachedToBones[bone][mesh].isVisible = true;
                        }
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

    update(controller) {
        super.update(controller);
        let thisEntity = Game.getCachedEntity(this.entityID);
        if (thisEntity.hasOwnProperty("organs") && controller.hasOwnProperty("organs")) {
            for (let cosmeticSlot in thisEntity["organs"]) {
                // TODO: this
            }
        }
        if (thisEntity.hasOwnProperty("cosmetics") && controller.hasOwnProperty("cosmetics")) {
            for (let cosmeticSlot in thisEntity["cosmetics"]) {
                // TODO: this
            }
        }
    }
    assign(objectBlob) {
        super.assign(objectBlob);
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
        if (objectBlob.hasOwnProperty("cosmetics")) {
            for (let boneID in objectBlob["cosmetics"]) {
                if (!(objectBlob["cosmetics"][boneID] instanceof Object)) {
                    this.detachCosmeticMeshesFromBone(boneID, true);
                }
                else {
                    let cosmeticsObject = objectBlob["cosmetics"][boneID];
                    if (cosmeticsObject.hasOwnProperty("meshID")) {
                        meshID = objectBlob.cosmetics[boneID]["meshID"];
                        if (cosmeticsObject.hasOwnProperty("materialID")) {
                            materialID = objectBlob.cosmetics[boneID]["materialID"];
                        }
                        else if (cosmeticsObject.hasOwnProperty("textureID")) {
                            materialID = objectBlob.cosmetics[boneID]["textureID"];
                        }
                        else {
                            material = "missingMaterial";
                        }
                        this.attachCosmeticMeshIDToBone(meshID, materialID, boneID);
                    }
                }
            }
        }
        if (objectBlob.hasOwnProperty("offensiveStance")) this.offensiveStance = objectBlob.offensiveStance;
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
        this.detachCosmeticMeshes(true);
        this.detachOrganMeshes(true);
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