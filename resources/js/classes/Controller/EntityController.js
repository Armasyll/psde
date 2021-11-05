/**
 * Entity Controller
 * @class
 * @extends {AbstractController}
 * @typedef {Object} EntityController
 * @property {string} id 
 * @property {string} entityID 
 * @property {string} texture 
 * @property {Object.<number, string>} textureStages 
 * @property {number} currentTextureStage 
 * @property {string} material 
 * @property {Object.<number, string>} materialStages 
 * @property {number} currentMaterialStage 
 * @property {string} mesh 
 * @property {GroundedStateEnum} groundedState 
 * @property {ActionEnum} defaultAction 
 * @property {Object.<ActionEnum, boolean>} availableActions 
 * @property {Object.<ActionEnum, boolean>} hiddenAvailableActions 
 * @property {number} height 
 * @property {number} width 
 * @property {number} depth 
 * @property {BABYLON.Mesh} collisionMesh 
 * @property {Object.<number, string>} meshStages 
 * @property {number} currentMeshStage 
 * @property {string} networkID 
 * @property {boolean} propertiesChanged 
 * @property {Object.<>} animatables 
 * @property {Object.<>} animations 
 * @property {Object.<>} animationGroups 
 * @property {Object.<>} additiveAnimations 
 * @property {(BABYLON.Animation|null)} animationCurrent 
 * @property {(BABYLON.Animation|null)} animationPrevious 
 * @property {(BABYLON.Animation|null)} animationOverride 
 * @property {boolean} bAnimationOverride
 * @property {boolean} bAnimationStopped 
 * @property {number} animationTransitionCount 
 * @property {number} animationTransitionSpeed 
 * @property {(BABYLON.Skeleton|null)} skeleton 
 * @property {boolean} enabled 
 * @property {boolean} locked 
 * @property {boolean} disposing 
 * @property {boolean} animated 
 * @property {BABYLON.Ray} groundRay 
 * @property {number} groundedState 0 falling, 1 grounded, 2 flying
 * @property {Object.<>} bones 
 * @property {BABYLON.Mesh} focusMesh 
 * @property {BABYLON.Mesh} rootMesh 
 * @property {CompoundController} compoundController 
 * @property {number} animationPriority 
 * @property {boolean} animationPriorityUpdated 
 * @property {Object.<>} _meshesAttachedToBones 
 * @property {Object.<>} _bonesAttachedToMeshes 
 * @property {Set.<BABYLON.AbstractMesh>} _attachedMeshes 
 * @property {boolean} bUseAnimationGroups 
 * @property {boolean} bHasRunPostConstructEntity 
 */
class EntityController extends AbstractController {
    /**
     * Creates an Entity Controller
     * @param {string} id 
     * @param {BABYLON.AbstractMesh} mesh 
     * @param {object} entityObject 
     */
    constructor(id = "", mesh = null, entityObject = {}) {
        if (!(super(id, mesh, entityObject) instanceof AbstractController)) {
            return undefined;
        }
        this.textureStages = [];
        this.currentTextureStage = 0;
        this.materialStages = [];
        this.groundedState = 0;
        this.currentMaterialStage = 0;
        this.defaultAction = 0;
        this.availableActions = {};
        this.hiddenAvailableActions = {};
        this.collisionMesh = null;
        this.meshStages = [];
        this.currentMeshStage = 0;
        this.networkID = null;
        this.propertiesChanged = true;
        this.animatables = {};
        this.animations = {};
        this.animationGroups = {};
        this.additiveAnimations = {};
        this.animationCurrent = null;
        this.animationPrevious = null;
        this.animationOverride = null;
        this.bAnimationOverride = false;
        this.animationTransitionCount = 0.0;
        this.animationTransitionSpeed = 0.1;
        this.skeleton = null;
        this.disposing = false;
        this.animated = false;
        this.groundRay = null;
        this.focusMesh = null;
        this.rootMesh = null;
        this.bones = {};
        this.bones["ROOT"] = null;
        this.bones["FOCUS"] = null;
        this.compoundController = null;
        /**
         * Priority for animations to be played; lower is higher priority.
         * 0 is showing all frames of the animations
         * 1 is throttled animations
         * 2 is not playing the animations
         * @type {number}
         */
        this.animationPriority = 0;
        this.animationPriorityUpdated = false;
        /**
         * Map of bone IDs and the mesh attached to them.
         * @type {string, {string, BABYLON.Mesh}}
         */
        this._meshesAttachedToBones = {};
        /**
         * Map of mesh IDs and the bones they're attached to.
         * @type {string, {string, BABYLON.Bone}}
         */
        this._bonesAttachedToMeshes = {};
        this._attachedMeshes = new Set();
        this.bUseAnimationGroups = true;
        this.bHasRunPostConstructEntity = false;
        this.setMesh(mesh);
        EntityController.set(this.id, this);
        if (EntityController.debugMode) console.info(`Finished creating new EntityController(${this.id})`);
        if (EntityController.debugMode) console.groupEnd();
        this.postConstruct();
    }
    postConstruct() {
        if (this.bHasRunPostConstructEntity) {
            return 0;
        }
        super.postConstruct();
        this.bHasRunPostConstructEntity = true;
        return 0;
    }
    getPosition() {
        if (this.collisionMesh instanceof BABYLON.AbstractMesh) {
            return this.collisionMesh.position;
        }
        return BABYLON.Vector3.Zero();
    }
    getRotation() {
        if (this.collisionMesh instanceof BABYLON.AbstractMesh) {
            return this.collisionMesh.rotation;
        }
        return BABYLON.Vector3.Zero();
    }
    getScaling() {
        if (this.collisionMesh instanceof BABYLON.AbstractMesh) {
            return this.collisionMesh.scaling
        }
        return BABYLON.Vector3.One();
    }
    setNetworkID(networkId) {
        this.networkID = networkId;
        return 0;
    }
    getNetworkID() {
        return this.networkID;
    }
    setCollisionMesh(mesh) {
        this.collisionMesh = mesh;
        this.mesh.setParent(this.collisionMesh);
        return 0;
    }
    setMesh(mesh, updateChild = false) {
        if (EntityController.debugMode) console.group(`Running {EntityController} ${this.id}.setMesh(meshObject, ${updateChild})`);
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            if (EntityController.debugMode) console.error(`meshObject wasn't an instance of BABYLON.AbstractMesh`);
            if (EntityController.debugMode) console.groupEnd();
            return 2;
        }
        if (this.mesh instanceof BABYLON.AbstractMesh && this.mesh != mesh) {
            this.unsetMesh(this.mesh);
        }
        this.mesh = mesh;
        if (this.mesh.skeleton instanceof BABYLON.Skeleton) {
            this.setSkeleton(this.mesh.skeleton);
        }
        this.mesh.isPickable = true;
        this.mesh.alwaysSelectAsActiveMesh = true;
        this.mesh.controller = this;
        this.propertiesChanged = true;
        if (this.meshStages.length == 0) {
            this.addMeshStage(mesh.name);
            if (mesh.hasOwnProperty("material") && mesh.material instanceof BABYLON.Material) {
                this.addMaterialStage(mesh.material.name);
                if (mesh.material.hasOwnProperty("diffuseTexture") && mesh.material.diffuseTexture instanceof BABYLON.Texture) {
                    this.addTextureStage(mesh.material.diffuseTexture.name);
                }
                else {
                    this.addTextureStage(mesh.material.name);
                }
            }
            else {
                this.addMaterialStage("missingMaterial");
                this.addTextureStage("missingTexture");
            }
            this.currentMeshStage = 0;
        }
        this._attachedMeshes.add(this.mesh);
        this.height = this.mesh.getBoundingInfo().boundingBox.extendSize.y * 2;
        this.width = this.mesh.getBoundingInfo().boundingBox.extendSize.x * 2;
        this.depth = this.mesh.getBoundingInfo().boundingBox.extendSize.z * 2;
        if (this.hasCollisionMesh()) {
            this.removeCollisionMesh();
        }
        this.createCollisionMesh();
        this.populateAnimatables();
        this.populateAnimationGroups();
        if (EntityController.debugMode) console.groupEnd();
        return 0;
    }
    unsetMesh() {
        if (!(this.mesh instanceof BABYLON.AbstractMesh)) {
            return 0;
        }
        if (this.hasMesh()) {
            this._attachedMeshes.remove(this.mesh);
            this.mesh.controller = null;
            this.mesh.setParent(null);
        }
        this.removeCollisionMesh();
        return 0;
    }
    createCollisionMesh() {
        let collisionMesh = Game.createAreaMesh(String(this.id).concat("-collisionMesh"), "CUBE", this.width, this.height, this.depth, this.getPosition(), this.getRotation());
        if (!(collisionMesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        this.collisionMesh = collisionMesh;
        if (this.hasMesh()) {
            this.collisionMesh.position.copyFrom(this.mesh.position);
            this.collisionMesh.rotation.copyFrom(this.mesh.rotation);
            this.mesh.setParent(this.collisionMesh);
        }
        this.collisionMesh.controller = this;
        this._attachedMeshes.add(this.collisionMesh);
        return 0;
    }
    removeCollisionMesh() {
        if (!(this.hasCollisionMesh())) {
            return 0;
        }
        if (this.hasMesh()) {
            this.mesh.setParent(null);
        }
        this.collisionMesh.controller = null;
        this._attachedMeshes.remove(this.collisionMesh);
        Game.removeMesh(this.collisionMesh);
        this.collisionMesh = null;
        return 0;
    }
    hasCollisionMesh() {
        if (!this.enabled) {
            return false;
        }
        return this.collisionMesh instanceof BABYLON.AbstractMesh;
    }
    createMesh(id = "", stageIndex = this.currentMeshStage, position = this.getPosition(), rotation = this.getRotation(), scaling = this.getScaling()) {
        if (this.mesh instanceof BABYLON.AbstractMesh) {
            return 1;
        }
        id = Tools.filterID(id);
        if (typeof id != "string") {
            id = Tools.genUUIDv4();
        }
        return Game.createMesh(id, this.meshStages[stageIndex], this.materialStages[stageIndex], position, rotation, scaling);
    }
    sendTransforms() {
        if (this.hasCollisionMesh()) {
            Game.transformsWorkerPostMessage(
                "createEntity",
                0,
                {
                    "id": this.id,
                    "width": this.width,
                    "height": this.height,
                    "depth": this.depth,
                    "position": this.collisionMesh.position.toOtherArray(),
                    "rotation": this.collisionMesh.rotation.toOtherArray()
                }
            );
        }
        else if (this.hasMesh()) {
            Game.transformsWorkerPostMessage(
                "createEntity",
                0,
                {
                    "id": this.id,
                    "width": this.width,
                    "height": this.height,
                    "depth": this.depth,
                    "position": this.mesh.position.toOtherArray(),
                    "rotation": this.mesh.rotation.toOtherArray()
                }
            );
        }
        return 0;
    }
    updateTransforms() {
        if (this.hasCollisionMesh()) {
            Game.transformsWorkerPostMessage(
                "updateEntity",
                0,
                {
                    "id": this.id,
                    "timestamp": Game.currentTime,
                    "position": this.collisionMesh.position.toOtherArray(),
                    "rotation": this.collisionMesh.rotation.toOtherArray()
                }
            );
        }
        else if (this.hasMesh()) {
            Game.transformsWorkerPostMessage(
                "updateEntity",
                0,
                {
                    "id": this.id,
                    "timestamp": Game.currentTime,
                    "position": this.mesh.position.toOtherArray(),
                    "rotation": this.mesh.rotation.toOtherArray()
                }
            );
        }
        return 0;
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
    attachMeshIDToBone(meshID = "missingMesh", materialID = "missingTexture", boneID = "ROOT", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        if (EntityController.debugMode) console.log("Running attachMeshIDToBone");
        if (!Game.hasMesh(meshID)) {
            if (EntityController.debugMode) console.log(`Couldn't find mesh:${meshID} to attach to bone:${boneID}`);
            return 2;
        }
        if (!Game.hasLoadedMesh(meshID)) {
            //if (EntityController.debugMode) console.log(`Haven't loaded mesh:${meshID} to attach to bone:${boneID}`);
            //return 1;
        }
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            if (EntityController.debugMode) console.log(`Couldn't find skeleton`);
            return 1;
        }
        if (!this.hasBone(boneID)) {
            if (EntityController.debugMode) console.log(`Couldn't find bone:${boneID}`);
            return 2;
        }
        if (materialID != "collisionMaterial") {
            options["createClone"] = true;
        }
        Game.createControllerAttachedMesh(meshID, materialID, boneID, position, rotation, scaling, options, this.id);
        return 0;
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
        return 0;
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
        mesh.setParent(this.mesh);
        mesh.attachToBone(bone, this.mesh);
        mesh.controller = this;
        mesh.position.copyFrom(position);
        mesh.rotation.copyFrom(rotation);
        if (!(scaling instanceof BABYLON.Vector3)) {
            mesh.scaling.copyFrom(this.scaling);
        }
        else {
            mesh.scaling.copyFrom(scaling);
        }
        if (this.animationPrevious == undefined) {
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
            this.focusMesh = mesh;
            mesh.isVisible = false;
        }
        else if (bone.id == "ROOT") {
            this.rootMesh = mesh;
            mesh.isVisible = false;
        }
        if (mesh.material.name != "collisionMaterial") {
            this._attachedMeshes.add(mesh);
        }
        return 0;
    }
    attachCollisionMeshToBone(mesh, bone, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {"checkCollisions": false}) {
        return this.attachMeshToBone(mesh, bone, position, rotation, scaling, true);
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
            if (attachedMesh instanceof BABYLON.AbstractMesh) {
                if (attachedMesh.name == meshID || attachedMesh.id == meshID) {
                    mesh = attachedMesh;
                    return true;
                }
            }
            else {
                this._attachedMeshes.remove(attachedMesh);
            }
        });
        if (mesh == null) {
            return 1;
        }
        return this.detachMeshFromBone(mesh, null, destroyMesh);
    }
    detachMeshIDFromBone(meshID, boneID = null, destroyMesh = true) {
        if (this._bonesAttachedToMeshes.hasOwnProperty(meshID)) {
            let bone = null;
            if (boneID instanceof BABYLON.Bone) {
                bone = boneID;
            }
            else if (!this.hasBone(boneID)) {
                return 1;
            }
            else {
                bone = this.getBone(boneID);
            }
            return this.detachMeshFromBone(this._bonesAttachedToMeshes[meshID], bone, destroyMesh);
        }
        return 0;
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
            return 0;
        }
        for (let boneID in this._meshesAttachedToBones) {
            if (boneID == "FOCUS" || boneID == "ROOT") {}
            else {
                this.detachAllFromBone(boneID, destroyMesh);
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

    setStage(index = 0) {
        if (!this.meshStages.hasOwnProperty(index)) {
            return 0;
        }
        if (this.currentMeshStage == index) {
            return 0;
        }
        if (!Game.hasLoadedMesh(this.meshStages[index])) {
            Game.addEntityStageToCreate(this.id, index);
            return 0;
        }
        this.setLocked(true);
        let position = this.getPosition();
        let rotation = this.getRotation();
        let scaling = this.getScaling();
        this.currentMeshStage = index;
        this.detachFromAllBones();
        Game.removeMesh(this.mesh);
        let mesh = this.createMesh(undefined, index, position, rotation, scaling);
        this.setMesh(mesh);
        this.generateAttachedMeshes();
        this.setLocked(false);
        return 0;
    }
    addMeshStage(meshID) {
        this.meshStages.push(meshID);
        return 0;
    }
    getMeshStage(index = this.currentMeshStage) {
        if (!this.meshStages.hasOwnProperty(index)) {
            index = this.currentMeshStage;
        }
        return this.meshStages[index];
    }
    addMaterialStage(materialID) {
        this.materialStages.push(materialID);
        return 0;
    }
    getMaterialStage(index = this.currentMaterialStage) {
        if (!this.materialStages.hasOwnProperty(index)) {
            index = this.currentMaterialStage;
        }
        return this.materialStages[index];
    }
    addTextureStage(textureID) {
        this.textureStages.push(textureID);
        return 0;
    }
    getTextureStage(index = this.currentTextureStage) {
        if (!this.textureStages.hasOwnProperty(index)) {
            index = this.currentTextureStage;
        }
        return this.textureStages[index];
    }
    setStages(stages) {
        return this.addStages(stages, true);
    }
    addStages(stages, overwrite = false) {
        if (!(stages instanceof Array)) {
            return 2;
        }
        if (stages.length == 0) {
            return 1;
        }
        if (overwrite) {
            this.meshStages.clear();
            this.materialStages.clear();
            this.textureStages.clear();
        }
        for (let i in stages) {
            if (stages[i] instanceof Array) {
                this.addMeshStage(stages[i][0]);
                if (stages[i].length > 1) {
                    this.addMaterialStage(stages[i][1]);
                }
                else {
                    if (this.meshStages.length == 1) {
                        this.addMaterialStage("missingMaterial");
                    }
                    else {
                        this.addMaterialStage(this.materialStages[i-1]);
                    }
                }
                if (stages[i].length > 2) {
                    this.addTextureStage(stages[i][2]);
                }
                else {
                    if (this.meshStages.length == 1) {
                        this.addTextureStage(this.materialStages[i]);
                    }
                    else {
                        this.addTextureStage(this.textureStages[i-1]);
                    }
                }
            }
        }
        return 0;
    }
    /**
     * Adds an available Action when interacting with this Entity
     * @param {ActionEnum} actionEnum ActionEnum
     * @param {boolean} [runOnce]
     */
    addAvailableAction(actionEnum) {
        actionEnum = Tools.filterEnum(actionEnum, ActionEnum);
        if (actionEnum == -1) {return 1;}
        this.availableActions[actionEnum] = true;
        return 0;
    }
    /**
     * Removes an available Action when interacting with this Entity
     * @param  {ActionEnum} actionEnum (ActionEnum)
     * @return {boolean} Whether or not the Action was removed
     */
    removeAvailableAction(actionEnum) {
        actionEnum = Tools.filterEnum(actionEnum, ActionEnum);
        delete this.availableActions[actionEnum];
        return 0;
    }
    getAvailableAction(actionEnum) {
        actionEnum = Tools.filterEnum(actionEnum, ActionEnum);
        return this.availableActions[actionEnum] || -1;
    }
    getAvailableActions() {
        return this.availableActions;
    }
    hasAvailableAction(actionEnum) {
        actionEnum = Tools.filterEnum(actionEnum, ActionEnum);
        return this.availableActions.hasOwnProperty(actionEnum);
    }

    /**
     * Adds a Hidden Available Action when interacting with this Entity
     * @param {ActionEnum} actionEnum (ActionEnum)
     */
    addHiddenAvailableAction(actionEnum) {
        actionEnum = Tools.filterEnum(actionEnum, ActionEnum);
        if (actionEnum == -1) {
            return 1;
        }
        this.hiddenAvailableActions[actionEnum] = true;
        return 0;
    }
    /**
     * Removes a Hidden Available Action when interacting with this Entity
     * @param  {ActionEnum} actionEnum (ActionEnum)
     * @return {boolean} Whether or not the Action was removed
     */
    removeHiddenAvailableAction(actionEnum) {
        actionEnum = Tools.filterEnum(actionEnum, ActionEnum);
        delete this.hiddenAvailableActions[actionEnum];
        return 0;
    }
    getHiddenAvailableAction(actionEnum) {
        actionEnum = Tools.filterEnum(actionEnum, ActionEnum);
        return this.hiddenAvailableActions[actionEnum] || -1;
    }
    getHiddenAvailableActions() {
        return this.hiddenAvailableActions;
    }
    hasHiddenAvailableAction(actionEnum) {
        actionEnum = Tools.filterEnum(actionEnum, ActionEnum);
        return this.hiddenAvailableActions.hasOwnProperty(actionEnum);
    }
    generateOrganMeshes() {
        if (!this.hasSkeleton()) {
            return 1;
        }
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
        if (EntityController.debugMode) console.group(`Running {EntityController} ${this.id}.populateFromEntity(entityObject)`);
        if (!(entityObject instanceof Object)) {
            if (EntityController.debugMode) console.warn(`entityObject was not an object`);
            if (EntityController.debugMode) console.groupEnd();
            return 2;
        }
        if (EntityController.debugMode) console.info(`Finished running {EntityController} ${this.id}.populateFromEntity(entityObject)`);
        if (EntityController.debugMode) console.groupEnd();
        return 0;
    }
    updateFromEntity(thatEntity) {
        return 0;
    }

    setCompoundController(instancedCompoundController) {
        instancedCompoundController = Tools.filterClass(instancedCompoundController, InstancedCompoundController, null);
        if (instancedCompoundController == null) {
            return 1;
        }
        this.compoundController = instancedCompoundController;
        return 0;
    }
    getCompoundController() {
        return this.compoundController;
    }
    hasCompoundController() {
        return this.compoundController instanceof InstancedCompoundController;
    }
    removeCompoundController(updateChild = true) {
        if (this.compoundController == null) {
            return 0;
        }
        if (typeof controller == "string" && this.controllers.hasOwnProperty(controller)) {
            if (this.controllers[controller] instanceof EntityController) {
                this.controllers[controller].removeCompoundController(this, false);
            }
            delete this.controllers[controller];
            return 0;
        }
        if (updateChild) {
            this.compoundController.removeController(this, false);
        }
        this.compoundController = null;
        return 0;
    }

    setAnimationPriority(number = 0) {
        this.animationPriority = number;
        this.animationPriorityUpdated = true;
        return 0;
    }
    getAnimationPriority() {
        return this.animationPriority;
    }

    doAttacked() {
        return 0;
    }

    /**
     * Returns the primary mesh associated with this controller.
     * @returns {BABYLON.AbstractMesh}
     */
    getMesh() {
        return this.mesh;
    }
    hasMesh() {
        return this.mesh instanceof BABYLON.AbstractMesh;
    }
    setSkeleton(skeleton) {
        if (skeleton instanceof BABYLON.Skeleton) {
            this.skeleton = skeleton;
            this.bones["ROOT"] = this.getBoneByName("ROOT") || null;
            this.bones["FOCUS"] = this.getBoneByName("FOCUS") || null;
            this.animated = true;
        }
        else {
            this.skeleton = null;
            this.bones["ROOT"] = null;
            this.bones["FOCUS"] = null;
            this.animated = false;
        }
        return 0;
    }
    getSkeleton() {
        return this.skeleton;
    }
    hasSkeleton() {
        return this.skeleton instanceof BABYLON.Skeleton;
    }
    setMeshSkeleton(skeleton) {
        if (skeleton instanceof BABYLON.Skeleton) {
            this.skeleton = skeleton;
            this.propertiesChanged = true;
        }
        return 0;
    }
    getMeshSkeleton() {
        return this.skeleton;
    }
    updateProperties() {
        this.propertiesChanged = false;
        return 0;
    }
    setParentByMesh(mesh) {
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            if (Game.hasMesh(mesh)) {
                mesh = Game.getMesh(mesh);
            }
            else {
                return 1;
            }
        }
        this.collisionMesh.setParent(mesh);
        return 0;
    }
    setParent(controller = null) {
        if (controller == null) {
            return this.removeParent();
        }
        if (!(controller instanceof EntityController)) {
            if (EntityController.has(controller)) {
                controller = EntityController.get(controller);
            }
            else {
                return 0;
            }
        }
        this.collisionMesh.setParent(controller.getMesh());
        return 0;
    }
    getParent() {
        return this.collisionMesh.parent;
    }
    removeParent() {
        this.collisionMesh.setParent(null);
        return 0;
    }
    createLookController() {
        return 0;
    }

    hasAnimatable(animatable) {
        return this.animatables.hasOwnProperty(animatable);
    }
    hasAnimation(animation) {
        return this.animations.hasOwnProperty(animation);
    }
    hasAnimationGroup(animationGroup) {
        return this.animationGroups.hasOwnProperty(animationGroup);
    }
    /**
     * 
     * @param {string} id 
     * @param {string} rangeName 
     * @param {boolean} [loopAnimation=true] 
     * @param {number} [speedRatio=1.0] 
     * @returns 
     */
    createAnimatableFromRangeName(id, rangeName, loopAnimation = true, speedRatio = 1.0) {
        if (this.skeleton == null) {
            return 2;
        }
        let animationRange = this.skeleton.getAnimationRange(rangeName);
        if (!(animationRange instanceof BABYLON.AnimationRange)) {
            return 1;
        }
        let to = animationRange.to;
        if (to - animationRange.from > 1) {
            to--;
        }
        return this.createAnimatable(id, animationRange.from, to, loopAnimation, speedRatio);
    }
    /**
     * 
     * @param {string} id 
     * @param {number} fromFrame 
     * @param {number} toFrame 
     * @param {boolean} [loopAnimation=true] 
     * @param {number} [speedRatio=1.0] 
     * @returns 
     */
    createAnimatable(id, fromFrame = 0, toFrame = 0, loopAnimation = true, speedRatio = 1.0) {
        if (this.skeleton == null) {
            return 2;
        }
        let animatable = Game.scene.beginWeightedAnimation(this.skeleton, fromFrame, toFrame, 0.0, loopAnimation, speedRatio);
        this.animatables[id] = animatable;
        return animatable;
    }
    /**
     * 
     * @param {string} id 
     * @param {number} [weight=1.0] 
     * @returns 
     */
    setAnimatableWeight(id, weight = 1.0) {
        if (this.skeleton == null) {
            return 2;
        }
        if (!this.hasAnimatable(id)) {
            return 2;
        }
        this.animations[id].weight = weight;
        return 0;
    }
    /**
     * 
     * @param {string} id name of AnimationGroup to create
     * @param {(string|array)} animatables ID of animation group(s)
     * @param {number} [weight=0.0] 
     * @param {number} [loopAnimation=false] 0 false, 1 true, -1 default
     * @param {number} [speedRatio=-1] -1 default
     * @param {boolean} [start=true] 
     */
    createAnimationGroupFromAnimatables(id, animatables, weight = 0.0, loopAnimation = -1, speedRatio = -1, start = true) {
        let hasValidAnimations = true;
        let animationGroup = new BABYLON.AnimationGroup(id);
        let maxFrameCount = 0;
        let tempFrameCount = 0;
        let maxFrame = 1;
        let minFrame = 0;
        if (!(animatables instanceof Array)) {
            animatables = [animatables];
        }
        for (let i = 0; i < animatables.length; i++) {
            let animatable = animatables[i];
            if (!(animatable instanceof BABYLON.Animation)) {
                if (this.hasAnimatable(animatable)) {
                    animatable = this.animatables[animatable];
                }
                else {
                    hasValidAnimations = false;
                    continue;
                }
            }
            if (i == 0) {
                if (loopAnimation === -1) {
                    loopAnimation = animatable.loopAnimation;
                }
                if (speedRatio === -1) {
                    speedRatio = animatable.speedRatio;
                }
            }
            for (let animation of animatable.getAnimations()) {
                animationGroup.addTargetedAnimation(animation.animation, animation.target);
            }
            tempFrameCount = animatable.toFrame - animatable.fromFrame;
            if (tempFrameCount >= maxFrameCount) {
                maxFrameCount = tempFrameCount;
                minFrame = animatable.fromFrame;
                maxFrame = animatable.toFrame;
            }
        }
        if (!hasValidAnimations) {
            animationGroup.dispose();
            return 1;
        }
        if (loopAnimation === -1) {
            loopAnimation = true;
        }
        if (speedRatio === -1) {
            speedRatio = 1.0;
        }
        animationGroup.normalize(minFrame, maxFrame);
        animationGroup.loopAnimation = loopAnimation == true;
        animationGroup.speedRatio = speedRatio;
        if (start) {
            animationGroup.start(true);
            animationGroup.setWeightForAllAnimatables(weight);
        }
        this.animationGroups[id] = animationGroup;
        return animationGroup;
    }
    clearAnimationGroups() {
        for (let id in this.animationGroups) {
            this.animationGroups[id].dispose();
            delete this.animationGroups[id];
        }
        return 0;
    }
    updateAnimation() {
        let anim = this.animationGroups[Object.keys(this.animationGroups).length - 1];
        switch (this.groundedState) {
            case GroundedStateEnum.FALL: {
                break;
            }
            case GroundedStateEnum.GROUND: {
                break;
            }
            case GroundedStateEnum.FLY: {
                break;
            }
            case GroundedStateEnum.SWIM: {
                break;
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
    /**
     * 
     * @param {(string|null)} animation 
     */
    stopAnimation(animation = null) {
        if (animation == null) {
            this.animation.setWeightForAllAnimatables(0);
        }
        else if (this.hasAnimationGroup(animation)) {
            this.animationGroups[animation].setWeightForAllAnimatables(0);
        }
        else {
            return 1;
        }
        return 0;
    }
    /**
     * 
     * @param {(string|null)} animation 
     */
    forceOverrideAnimation(animation = null) {
        if (animation == null) {
            this.bAnimationOverride = false;
            this.animationOverride = null;
        }
        else if (this.hasAnimationGroup(animation)) {
            this.animationGroups[animation].setWeightForAllAnimatables(1);
            this.animationOverride = animation;
            this.beginAnimation(animation);
        }
        else {
            return 1;
        }
        return 0;
    }
    stopAllAnimations() {
        for (let id in this.animationGroups) {
            this.animationGroups[id].setWeightForAllAnimatables(0);
        }
        return 0;
    }
    pauseAllAnimations() {
        for (let id in this.animationGroups) {
            this.animationGroups[id].pause();
        }
        return 0;
    }
    unpauseAllAnimations() {
        for (let id in this.animationGroups) {
            this.animationGroups[id].play();
        }
        return 0;
    }
    beginAnimation(animation) {
        if (this.bUseAnimationGroups) {
            return this.beginAnimationWithGroups(animation);
        }
        return this.beginAnimationWithAnimatables(animation);
    }
    /**
     * 
     * @param {(string|BABYLON.Animatable)} animation 
     * @returns {number} 
     */
    beginAnimationWithAnimatables(animation) {
        if (this.locked || !this.enabled) {
            return 0;
        }
        if (!(animation instanceof BABYLON.Animatable)) {
            if (this.animatables.hasOwnProperty(animation)) {
                animation = this.animatables[animation];
            }
            else {
                return 1;
            }
        }
        if (animation != this.animationCurrent) {
            /* Prevents an animation from having its weight > 0 when it's swapped out before it reaches 0 */
            if (this.animationPrevious != null && animation != this.animationPrevious) {
                this.animationPrevious.weight = 0.0;
            }
            this.animationPrevious = this.animationCurrent;
            this.animationCurrent = animation;
            this.animationTransitionCount = 0.0;
        }
        if (this.animationTransitionCount < 1) {
            this.animationTransitionCount += this.animationTransitionSpeed;
        }
        if (this.animationTransitionCount > 1) {
            this.animationTransitionCount = 1;
        }
        if (this.animationPrevious instanceof BABYLON.Animatable) {
            let weight = 1 - this.animationTransitionCount;
            if (weight < 0) {
                weight = 0;
            }
            else if (weight > 1) {
                weight = 0;
            }
            this.animationPrevious.weight = weight;
        }
        this.animationCurrent.weight = this.animationTransitionCount;
        return 0;
    }
    /**
     * 
     * @param {(string|BABYLON.Animation)} animation 
     * @returns {number} 
     */
    beginAnimationWithGroups(animation) {
        if (this.locked || !this.enabled) {
            return 0;
        }
        if (this.bAnimationStopped || this.animationPriority >= 2) {
            return 1;
        }
        if (!(animation instanceof BABYLON.AnimationGroup)) {
            if (this.animationGroups.hasOwnProperty(animation)) {
                animation = this.animationGroups[animation];
            }
            else {
                return 1;
            }
        }
        if (animation != this.animationCurrent) {
            /* Prevents an animation from having its weight > 0 when it's swapped out before it reaches 0 */
            if (this.animationPrevious != null && animation != this.animationPrevious) {
                this.animationPrevious.setWeightForAllAnimatables(0.0);
            }
            this.animationPrevious = this.animationCurrent;
            this.animationCurrent = animation;
            this.animationTransitionCount = 0.0;
        }
        if (this.animationTransitionCount > 1) {
            this.animationTransitionCount = 1;
        }
        else if (this.animationTransitionCount < 1) {
            this.animationTransitionCount += this.animationTransitionSpeed;
            if (this.animationPrevious instanceof BABYLON.AnimationGroup) {
                this.animationPrevious.setWeightForAllAnimatables(1 - this.animationTransitionCount);
            }
            this.animationCurrent.setWeightForAllAnimatables(this.animationTransitionCount);
        }
        return 0;
    }
    moveAV() {
        return 0;
    }
    populateAnimatables() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 1;
        }
        if (this.skeleton.getAnimationRange("99_default") != null) {
            this.createAnimatableFromRangeName("default", "99_default", false);
        }
        if (this.skeleton.getAnimationRange("10_closed01") != null) {
            this.createAnimatableFromRangeName("closed", "10_closed01", false);
        }
        if (this.skeleton.getAnimationRange("80_open01") != null) {
            this.createAnimatableFromRangeName("open", "80_open01", false);
        }
        if (this.skeleton.getAnimationRange("10_opened01") != null) {
            this.createAnimatableFromRangeName("opened", "10_opened01", false);
        }
        if (this.skeleton.getAnimationRange("80_close01") != null) {
            this.createAnimatableFromRangeName("close", "80_close01", false);
        }
        return 0;
    }
    populateAnimationGroups() {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 1;
        }
        if (this.hasAnimatable("default"))
            this.createAnimationGroupFromAnimatables("default", "default", 0.0, false);
        if (this.hasAnimatable("opened"))
            this.createAnimationGroupFromAnimatables("opened", "opened", 0.0, false);
        if (this.hasAnimatable("closed"))
            this.createAnimationGroupFromAnimatables("closed", "closed", 0.0, false);
        if (this.hasAnimatable("open"))
            this.createAnimationGroupFromAnimatables("open", "open", 0.0, false);
        if (this.hasAnimatable("close"))
            this.createAnimationGroupFromAnimatables("close", "close", 1.0, false);
        for (let id in this.animationGroups) {
            if (id == "default") {
                continue;
            }
            this.animationGroups[id].setWeightForAllAnimatables(0.0);
            this.animationGroups[id].stop(false);
        }
        return 0;
    }
    doOpen() {
        if (this.animated) {
            if (this.hasAnimationGroup("closed"))
                this.animationGroups["closed"].setWeightForAllAnimatables(0.0);
            if (this.hasAnimationGroup("close")) {
                this.animationGroups["close"].stop(false);
                this.animationGroups["close"].setWeightForAllAnimatables(0.0);
            }
            if (this.hasAnimationGroup("opened"))
                this.animationGroups["opened"].setWeightForAllAnimatables(0.0);
            if (this.hasAnimationGroup("open")) {
                this.animationGroups["open"].setWeightForAllAnimatables(1.0);
                this.animationGroups["open"].play(false);
            }
        }
        this.addHiddenAvailableAction(ActionEnum.OPEN);
        this.removeHiddenAvailableAction(ActionEnum.CLOSE);
        this.setDefaultAction(ActionEnum.CLOSE);
        return 0;
    }
    doClose() {
        if (this.animated) {
            if (this.hasAnimationGroup("opened"))
                this.animationGroups["opened"].setWeightForAllAnimatables(0.0);
            if (this.hasAnimationGroup("open")) {
                this.animationGroups["open"].stop(false);
                this.animationGroups["open"].setWeightForAllAnimatables(0.0);
            }
            if (this.hasAnimationGroup("closed"))
                this.animationGroups["closed"].setWeightForAllAnimatables(0.0);
            if (this.hasAnimationGroup("close")) {
                this.animationGroups["close"].setWeightForAllAnimatables(1.0);
                this.animationGroups["close"].play(false);
            }
        }
        this.addHiddenAvailableAction(ActionEnum.CLOSE);
        this.removeHiddenAvailableAction(ActionEnum.OPEN);
        this.setDefaultAction(ActionEnum.OPEN);
        return 0;
    }

    /**
     * Returns all meshes associated with this controller.
     * @returns {Set<BABYLON.AbstractMesh>}
     */
    getMeshes() {
        return [this.collisionMesh, this.mesh];
    }
    updateGroundRay() {
        if (!(this.hasMesh())) {
            return 0;
        }
        if (!(this.groundRay instanceof BABYLON.Ray)) {
            this.groundRay = new BABYLON.Ray(this.collisionMesh.position, BABYLON.Vector3.Down(), 0.01);
        }
        this.groundRay.origin = this.collisionMesh.position;
        //this.groundRay.direction = this.collisionMesh.position.add(BABYLON.Vector3.Down());
        return 0;
    }

    generateAttachedMeshes() {
        return 0;
    }
    detachFromAllBones() {
        return 0;
    }

    setDefaultAction(actionEnum) {
        actionEnum = Tools.filterEnum(actionEnum, ActionEnum);
        this.defaultAction = actionEnum;
        return 0;
    }
    getDefaultAction() {
        return this.defaultAction;
    }

    isAnimated() {
        return this.animated;
    }
    setAnimated(animated = true) {
        this.animated = animated == true;
        return 0;
    }
    /**
     * Clones the controller's values over this; but not really anything important :v
     * @param {(EntityController|object)} controller 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(controller, verify = true) {
        if (verify && !(controller instanceof EntityController)) {
            return 2;
        }
        super.assign(controller, verify);
        if (EntityController.debugMode) console.group(`Running {EntityController} ${this.id}.assign(controllerObject, ${verify})`);
        if (controller.hasOwnProperty("height")) this.height = controller.height;
        if (controller.hasOwnProperty("width")) this.width = controller.width;
        if (controller.hasOwnProperty("depth")) this.depth = controller.depth;
        if (controller.hasOwnProperty("defaultAction")) this.setDefaultAction(controller.defaultAction);
        if (controller.hasOwnProperty("availableActions")) {
            this.availableActions = {};
            for (let action in controller.availableActions) {
                this.addAvailableAction(action);
            }
        }
        if (controller.hasOwnProperty("hiddenAvailableActions")) {
            this.hiddenAvailableActions = {};
            for (let action in controller.hiddenAvailableActions) {
                this.addHiddenAvailableAction(action);
            }
        }
        if (EntityController.debugMode) console.groupEnd();
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        EntityController.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        this.clearAnimationGroups();
        for (let boneName in this.bones) {
            this.bones[boneName] = null;
        }
        if (EditControls.pickedController == this) {
            EditControls.reset();
        }
        else if (EditControls.previousPickedController == this) {
            EditControls.previousPickedController = null;
        }
        this.propertiesChanged = false;
        if (this.hasCompoundController()) {
            this.removeCompoundController(true);
        }
        this.detachFromAllBones(true);
        EntityController.remove(this.id);
        super.dispose();
        return null;
    }
    getClassName() {
        return "EntityController";
    }

    static initialize() {
        EntityController.entityControllerList = {};
        EntityController.debugMode = false;
        EntityController.debugVerbosity = 2;
    }
    static get(id) {
        if (EntityController.has(id)) {
            return EntityController.entityControllerList[id];
        }
        return 1;
    }
    static has(id) {
        return EntityController.entityControllerList.hasOwnProperty(id);
    }
    static set(id, entityController) {
        EntityController.entityControllerList[id] = entityController;
        return 0;
    }
    static remove(id) {
        delete EntityController.entityControllerList[id];
        return 0;
    }
    static list() {
        return EntityController.entityControllerList;
    }
    static clear() {
        for (let i in EntityController.entityControllerList) {
            EntityController.entityControllerList[i].dispose();
        }
        EntityController.entityControllerList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!EntityController.has(oldID)) {
            return 1;
        }
        EntityController.set(newID, EntityController.get(oldID));
        EntityController.remove(oldID);
        return 0;
    }
    static setDebugMode(debugMode) {
        if (debugMode == true) {
            EntityController.debugMode = true;
            for (let entityController in EntityController.entityControllerList) {
                EntityController.entityControllerList[entityController].debugMode = true;
            }
        }
        else if (debugMode == false) {
            EntityController.debugMode = false;
            for (let entityController in EntityController.entityControllerList) {
                EntityController.entityControllerList[entityController].debugMode = false;
            }
        }
        return 0;
    }
    static getDebugMode() {
        return EntityController.debugMode === true;
    }
}
EntityController.initialize();