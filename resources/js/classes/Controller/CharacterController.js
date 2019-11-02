/**
 * Heavily referenced, borderline copied, Ssatguru's BabylonJS-CharacterController https://github.com/ssatguru/BabylonJS-CharacterController
 * It's great :v you should check it out.
 * 
 * TODO: Rotate towards velocity
 */
class CharacterController extends EntityController {
    constructor(id, mesh, entity) {
        super(id, mesh, entity);
        if (!this.hasMesh()) {
            return;
        }
        this.focus = undefined;
        this.root = undefined;
        this.targetRay = undefined;
        this.targetRayHelper = undefined;
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

        this.walk = new AnimData("walk");
        this.walkBack = new AnimData("walkBack");
        this.idle = new AnimData("idle");
        this.idleJump = new AnimData("idleJump");
        this.fall = new AnimData("fall");
        this.fallLong = new AnimData("fallLong");
        this.land = new AnimData("land");
        this.landHard = new AnimData("landHard");
        this.rollForward = new AnimData("rollForward");
        this.run = new AnimData("run");
        this.runJump = new AnimData("runJump");
        this.turnLeft = new AnimData("turnLeft");
        this.turnRight = new AnimData("turnRight");
        this.strafeLeft = new AnimData("strafeLeft");
        this.strafeRight = new AnimData("strafeRight");
        this.slideBack = new AnimData("slideBack");
        this.attackPunchRH = new AnimData("attachPunchRH");
        this.attackRunningPunchRH = new AnimData("attachPunchRH");
        this.attackThrustRH = new AnimData("attackThrustRH");
        this.attackSlashRH = new AnimData("attackSlashRH");
        this.attackChopRH = new AnimData("attackChopRH");
        this.lieDown = new AnimData("lieDown");
        this.sitDown = new AnimData("sitDown");
        this.death = new AnimData("death");
        this.animations = this.animations.concat([this.walk, this.walkBack, this.idleJump, this.run, this.runJump, this.fall, this.turnLeft, this.turnRight, this.strafeLeft, this.strafeRight, this.slideBack]);

        this.setIdleAnim("90_idle01", 1, true);
        this.setIdleJumpAnim("95_jump", 1, false);
        this.setWalkAnim("93_walkingKneesBent", 1.2, true);
        this.setRunAnim("94_runningKneesBent", 2, true);
        this.setWalkBackAnim("93_walkingBackwardKneesBent", 1, true);
        this.setTurnLeftAnim("93_walkingKneesBent", 1, true);
        this.setTurnRightAnim("93_walkingKneesBent", 1, true);
        this.setRunJumpAnim("95_jump", 1, false);
        this.setAnimData(this.attackPunchRH, "71_punch01", 1, false, false);
        this.setAnimData(this.attackRunningPunchRH, "71_runningPunch01", 1, false, false);
        this.setAnimData(this.attackThrustRH, "71_stab01", 1, false, false);
        this.setAnimData(this.lieDown, "91_lieDown01", 1, false);
        this.setAnimData(this.sitDown, "91_sitDown01", 1, false);
        this.setDeathAnim("91_death01", 1, false);

        if (this.skeleton instanceof BABYLON.Skeleton) {
            this.checkAnims(this.skeleton);
            this._isAnimated = true;
            this.skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
            this.skeleton.animationPropertiesOverride.enableBlending = true;
            this.skeleton.animationPropertiesOverride.blendingSpeed = 1.0;
        }
        else {
            this._isAnimated = false;
        }

        //this.idleAnim = Game.scene.beginWeightedAnimation(this.skeleton, this.idle.from, this.idle.to, 1.0, this.idle.loop);
        //this.walkAnim = Game.scene.beginWeightedAnimation(this.skeleton, this.walk.from, this.walk.to, 0.0, this.walk.loop);
        //this.runAnim = Game.scene.beginWeightedAnimation(this.skeleton, this.run.from, this.run.to, 0.0, this.run.loop);

        this.key = new ControllerMovementKey();
        this.prevKey = this.key.clone();
        this._showHelmet = true;

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

    setWalkAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.walk, rangeName, rate, loop, standalone);
    }
    setRunAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.run, rangeName, rate, loop, standalone);
        /*if (this.run instanceof AnimData && this.run.exist) {
            this.runAnim = Game.scene.beginWeightedAnimation(this.skeleton, this.run.from, this.run.to, 0.0, this.run.loop, this.run.rate);
            //this.runAnim.syncWith(this.idleAnim);
        }*/
    }
    setWalkBackAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.walkBack, rangeName, rate, loop, standalone);
    }
    setSlideBackAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.slideBack, rangeName, rate, loop, standalone);
    }
    setIdleAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.idle, rangeName, rate, loop, standalone);
        /*if (this.idle instanceof AnimData && this.idle.exist) {
            this.idleAnim = Game.scene.beginWeightedAnimation(this.skeleton, this.idle.from, this.idle.to, 0.0, this.idle.loop, this.idle.rate);
        }*/
    }
    setIdleJumpAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.idleJump, rangeName, rate, loop, standalone);
    }
    setTurnRightAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.turnRight, rangeName, rate, loop, standalone);
    }
    setTurnLeftAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.turnLeft, rangeName, rate, loop, standalone);
    }
    setStrafeRightAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.strafeRight, rangeName, rate, loop, standalone);
    }
    setSrafeLeftAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.strafeLeft, rangeName, rate, loop, standalone);
    }
    setRunJumpAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.runJump, rangeName, rate, loop, standalone);
    }
    setFallAnim(rangeName, rate, loop, standalone = true) {
        this.setAnimData(this.fall, rangeName, rate, loop, standalone);
    }
    setDeathAnim(rangeName, rate, loop = false, standalone = false) {
        this.setAnimData(this.death, rangeName, rate, loop, standalone);
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
        this.setLocked(true);
        this.beginAnimation(this.lieDown, () => {this.setLocked(false)});
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
        this.setLocked(true);
        this.beginAnimation(this.sitDown, () => {this.setLocked(false)});
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
    hideAttachedMeshes() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        for (let bone in this._meshesAttachedToBones) {
            if (bone == "FOCUS" || bone == "ROOT") {}
            else if (this._showHelmet && bone == "head") {}
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
            else if (!this._showHelmet && bone == "head") {}
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

    getBone(bone) {
        if (Game.debugMode) console.log("Running getBone");
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
        if (Game.debugMode) console.log("Running attachMeshIDToBone");
        if (!Game.hasAvailableMesh(meshID)) {
            return this;
        }
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        let bone = this.getBone(boneID);
        if (!(bone instanceof BABYLON.Bone)) {
            return this;
        }
        if (!(position instanceof BABYLON.Vector3)) {
            position = Tools.filterVector(position);
        }
        if (!(rotation instanceof BABYLON.Vector3)) {
            rotation = Tools.filterVector(rotation);
        }
        if (!(scaling instanceof BABYLON.Vector3)) {
            scaling = Tools.filterVector(scaling);
        }
        if (scaling.equals(BABYLON.Vector3.Zero())) {
            scaling = BABYLON.Vector3.One();
        }
        if (!(Game.hasLoadedMesh(meshID))) {
            Game.loadMesh(meshID);
            Game.addAttachmentToCreate((this.id + bone.name + meshID), this, meshID, materialID, bone.name, position, rotation, scaling);
            return this;
        }
        if (materialID != "collisionMaterial") {
            options["createClone"] = true;
        }
        let loadedMesh = Game.createMesh(meshID.concat("Attachment").concat(this.id.capitalize()).concat(boneID), meshID, materialID, position, rotation, scaling, options);
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
    detachFromBone(bone, destroyMesh = true) {
        return this.detachAllFromBone(bone, destroyMesh);
    }
    detachAllFromBone(bone, destroyMesh = true) {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        bone = this.getBone(bone);
        if (!(bone instanceof BABYLON.Bone)) {
            return this;
        }
        if (!(this._meshesAttachedToBones.hasOwnProperty(bone.id))) {
            return this;
        }
        let meshes = new Array();
        for (let meshID in this._meshesAttachedToBones[bone.id]) {
            if (this._meshesAttachedToBones[bone.id][meshID] instanceof BABYLON.AbstractMesh) {
                this._meshesAttachedToBones[bone.id][meshID].detachFromBone();
                meshes.push(this._meshesAttachedToBones[bone.id][meshID]);
                this._attachedMeshes.delete(this._meshesAttachedToBones[bone.id][meshID]);
                delete this._bonesAttachedToMeshes[meshID][bone.id];
            }
        }
        delete this._meshesAttachedToBones[bone.id];
        if (destroyMesh) {
            meshes.forEach(function(mesh) {
                Game.removeMesh(mesh);
            });
            return [];
        }
        return meshes;
    }
    detachMesh(mesh, destroyMesh = true) {
        return this.detachMeshFromBone(mesh, undefined, destroyMesh);
    }
    detachMeshFromBone(mesh, bone = undefined, destroyMesh = true) { // TODO: check what happens if we've got 2 of the same meshes on different bones :v srsly, what if
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        if (!(mesh instanceof AbstractMesh)) {
            mesh = Game.getMesh(mesh);
            if (!(mesh instanceof BABYLON.AbstractMesh)) {
                return this;
            }
        }
        if (!(this._bonesAttachedToMeshes.hasOwnProperty(mesh.id))) {
            return this;
        }
        bone = this.getBone(bone);
        if (bone instanceof BABYLON.Bone) {
            delete this._meshesAttachedToBones[bone.id][mesh.id];
        }
        else {
            for (let boneWithAttachment in this._bonesAttachedToMeshes[mesh.id]) {
                if (this._bonesAttachedToMeshes[mesh.id][boneWithAttachment] instanceof BABYLON.Bone) {
                    delete this._meshesAttachedToBones[boneWithAttachment][mesh.id];
                }
            }
        }
        mesh.detachFromBone();
        delete this._bonesAttachedToMeshes[mesh.id];
        this._attachedMeshes.delete(mesh);
        if (destroyMesh) {
            Game.removeMesh(mesh);
            return [];
        }
        return new Array(mesh);
    }
    detachFromAllBones(destroyMesh = true) {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return this;
        }
        let meshes = new Array();
        for (let bone in this._meshesAttachedToBones) {
            if (bone == "FOCUS" || bone == "ROOT") {}
            else {
                meshes.push(...this.detachAllFromBone(bone, destroyMesh));
            }
        }
        return meshes;
    }
    attachToROOT(mesh) {
        if (mesh instanceof BABYLON.AbstractMesh) {
            return this.attachMeshToBone(mesh, this.getBone("ROOT"));
        }
        return this.attachMeshIDToBone(mesh, undefined, "ROOT");
    }
    detachFromROOT() {
        return this.detachFromBone("ROOT", false)[0];
    }
    attachToFOCUS(mesh) {
        if (mesh instanceof BABYLON.AbstractMesh) {
            return this.attachMeshToBone(mesh, this.getBone("FOCUS"));
        }
        return this.attachMeshIDToBone(mesh, undefined, "FOCUS");
    }
    detachFromFOCUS() {
        return this.detachFromBone("FOCUS", false)[0];
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
    /**
     * Returns all meshes associated with this controller.
     * @returns {Set<BABYLON.AbstractMesh>}
     */
    getMeshes() {
        return this._attachedMeshes;
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