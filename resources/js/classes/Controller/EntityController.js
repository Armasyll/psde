/**
 * Entity Controller
 */
class EntityController {
    /**
     * Creates an Entity Controller
     * @param {string} id 
     * @param {BABYLON.AbstractMesh} mesh 
     * @param {object} entityObject 
     */
    constructor(id = "", mesh = null, entityObject = {}) {
        id = Tools.filterID(id);
        if (typeof id != "string" || EntityController.has(id)) {
            id = Tools.genUUIDv4();
        }
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            if (Game.debugMode) console.log("mesh is not a mesh");
            return null;
        }
        if (!(entityObject.hasOwnProperty("id"))) {
            if (Game.debugMode) console.log("entityObject missing ID");
            return null;
        }

        this.id = id;
        this.debugMode = false;
        /**
         * @type string
         */
        this.entityID = entityObject.id;
        this.texture = null;
        this.textureStages = [];
        this.currentTextureStage = 0;
        this.material = null;
        this.materialStages = [];
        this.currentMaterialStage = 0;
        /**
         * @type BABYLON.AbstractMesh
         */
        this.mesh = null;
        /**
         * @type BABYLON.AbstractMesh
         */
        this.defaultAction = 0;
        this.availableActions = {};
        this.hiddenAvailableActions = {};
        this.height = 0.0;
        this.width = 0.0;
        this.depth = 0.0;
        this.collisionMesh = null;
        this.targetRayLength = 1.125;
        this.meshStages = [];
        this.currentMeshStage = 0;
        this.networkID = null;
        this.propertiesChanged = true;
        this.animatables = {};
        this.animations = {};
        this.animationGroups = {};
        this.additiveAnimations = {};
        this.started = false;
        this.stopAnim = false;
        this.currAnim = null;
        this.prevAnim = null;
        this.animationTransitionCount = 0.0;
        this.animationTransitionSpeed = 0.1;
        this.skeleton = null;
        this.enabled = true;
        this.locked = false;
        this.disposing = false;
        this.animated = false;
        this.groundRay = null;
        this.currentCell = null;
        this.assign(entityObject, false);
        this.setMesh(mesh);
        Game.transformsWorkerPostMessage(
            "createEntity",
            0,
            [this.id, this.width, this.height, this.depth, this.getPosition().toOtherArray(), this.getRotation().toOtherArray()]
        );
        Game.entityLogicWorkerPostMessage("setEntityController", 0, {"controllerID": this.id, "entityID": this.entityID});
        EntityController.set(this.id, this);
    }
    setID(id) {
        this.id = id;
        return this;
    }
    getID() {
        return this.id;
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
        return this;
    }
    getNetworkID() {
        return this.networkID;
    }
    setTexture(texture) {
        if (texture instanceof BABYLON.Texture) {
            this.texture = texture;
        }
        return this;
    }
    getTexture() {
        return this.texture;
    }
    setMaterial(material) {
        if (material instanceof BABYLON.Material) {
            this.material = material;
        }
        return this;
    }
    getMaterial() {
        return this.material;
    }
    setCollisionMesh(mesh) {
        this.collisionMesh = mesh;
        this.mesh.setParent(this.collisionMesh);
    }
    setMesh(mesh, updateChild = false) {
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            return this;
        }
        if (this.mesh instanceof BABYLON.AbstractMesh && this.mesh != mesh) {
            this.unsetMesh(this.mesh);
        }
        this.mesh = mesh;
        if (this.mesh.material instanceof BABYLON.Material) {
            this.setMaterial(this.mesh.material);
            this.setTexture(this.mesh.material.diffuseTexture);
        }
        if (this.mesh.skeleton instanceof BABYLON.Skeleton) {
            this.setSkeleton(this.mesh.skeleton);
        }
        this.mesh.isPickable = true;
        this.mesh.alwaysSelectAsActiveMesh = true;
        this.mesh.controller = this;
        this.propertiesChanged = true;
        if (this.meshStages.length == 0) {
            this.addMeshStage(mesh.name);
            this.addMaterialStage(mesh.material.name);
            if (mesh.material.diffuseTexture instanceof BABYLON.Texture) {
                this.addTextureStage(mesh.material.diffuseTexture.name);
            }
            else {
                this.addTextureStage(mesh.material.name);
            }
            this.currentMeshStage = 0;
        }
        let position = this.mesh.position.clone();
        this.createCollisionMesh();
        if (this.hasCollisionMesh()) {
            this.collisionMesh.position.copyFrom(position);
            this.mesh.setParent(this.collisionMesh);
        }
        this.height = this.mesh.getBoundingInfo().boundingBox.extendSize.y * 2;
        this.width = this.mesh.getBoundingInfo().boundingBox.extendSize.x * 2;
        this.width = this.mesh.getBoundingInfo().boundingBox.extendSize.z * 2;
        return this;
    }
    unsetMesh(mesh = this.mesh) {
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            return this;
        }
        if (this.hasMesh()) {
            mesh.controller = null;
            mesh.setParent(null);
        }
        if (this.hasCollisionMesh()) {
            Game.removeMesh(this.collisionMesh);
            this.collisionMesh = null;
        }
        return this;
    }
    createCollisionMesh() {
        //this.collisionMesh = Game.createAreaMesh(String(this.id).concat("-collisionMesh"), "CUBE", this.mesh.getBoundingInfo().boundingBox.extendSize.x * 2, this.mesh.getBoundingInfo().boundingBox.extendSize.y * 2, this.mesh.getBoundingInfo().boundingBox.extendSize.z * 2, this.mesh.position, this.mesh.rotation);
        return this;
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
    setStage(index = 0) {
        if (!this.meshStages.hasOwnProperty(index)) {
            return this;
        }
        if (this.currentMeshStage == index) {
            return this;
        }
        if (!Game.hasLoadedMesh(this.meshStages[index])) {
            Game.addEntityStageToCreate(this.id, index);
            return this;
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
        this.createAttachedMeshes();
        this.setLocked(false);
        return this;
    }
    addMeshStage(meshID) {
        this.meshStages.push(meshID);
        return this;
    }
    getMeshStage(index = this.currentMeshStage) {
        if (!this.meshStages.hasOwnProperty(index)) {
            index = this.currentMeshStage;
        }
        return this.meshStages[index];
    }
    addMaterialStage(materialID) {
        this.materialStages.push(materialID);
        return this;
    }
    getMaterialStage(index = this.currentMaterialStage) {
        if (!this.materialStages.hasOwnProperty(index)) {
            index = this.currentMaterialStage;
        }
        return this.materialStages[index];
    }
    addTextureStage(textureID) {
        this.textureStages.push(textureID);
        return this;
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
        this.skeleton = skeleton;
        return this;
    }
    getSkeleton() {
        return this.skeleton;
    }
    hasSkeleton() {
        return this.skeleton instanceof BABYLON.Skeleton;
    }
    setEntity(id) {
        this.entityID = id;
        return this;
    }
    getEntity() {
        return this.entityID;
    }
    hasEntity() {
        return this.entityID != null;
    }
    setMeshSkeleton(skeleton) {
        if (skeleton instanceof BABYLON.Skeleton) {
            this.skeleton = skeleton;
            this.propertiesChanged = true;
        }
        return this;
    }
    getMeshSkeleton() {
        return this.skeleton;
    }
    updateProperties() {
        this.propertiesChanged = false;
        return this;
    }
    setParentByMesh(mesh) {
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            if (Game.hasMesh(mesh)) {
                mesh = Game.getMesh(mesh);
            }
            else {
                return this;
            }
        }
        this.collisionMesh.setParent(mesh);
        return this;
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
                return this;
            }
        }
        this.collisionMesh.setParent(controller.getMesh());
        return this;
    }
    getParent() {
        return this.collisionMesh.parent;
    }
    removeParent() {
        this.collisionMesh.setParent(null);
        return this;
    }
    createLookController() {
        return false;
    }
    createLookController() {
        return this;
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
    createAnimatableFromRangeName(id, rangeName, loopAnimation = true, speedRatio = 1.0) {
        if (this.skeleton == null) {
            return 2;
        }
        let animationRange = this.skeleton.getAnimationRange(rangeName);
        if (!(animationRange instanceof BABYLON.AnimationRange)) {
            return 1;
        }
        return this.createAnimatable(id, animationRange.from + 1, animationRange.to, loopAnimation, speedRatio);
    }
    createAnimatable(id, fromFrame = 0, toFrame = 0, loopAnimation = true, speedRatio = 1.0) {
        if (this.skeleton == null) {
            return 2;
        }
        //let animatable = new BABYLON.Animatable(Game.scene, this.skeleton, fromFrame, toFrame, loopAnimation, speedRatio);
        let animatable = Game.scene.beginWeightedAnimation(this.skeleton, fromFrame, toFrame, 0.0, loopAnimation, speedRatio);
        this.animatables[id] = animatable;
        return animatable;
    }
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
     * @param {string|array} animatables ID of animation group(s)
     * @param {number} weight 
     * @param {boolean} loop 
     * @param {number} speed 
     * @param {boolean} start 
     */
    createAnimationGroupFromAnimatables(id, animatables, weight = 0.0, loop = -1, speed = -1, start = true) {
        let hasValidAnimations = true;
        let animationGroup = new BABYLON.AnimationGroup(id);
        /*let maxFrameCount = 0;
        let minFrameCount = Number.MAX_SAFE_INTEGER;
        let tempFrameCount = 0;
        let maxFrame = 0;
        let minFrame = Number.MAX_SAFE_INTEGER;*/
        if (typeof animatables != "array") {
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
                    return 2;
                }
            }
            if (i == 0) {
                if (loop == -1) {
                    loop = animatable.loopAnimation;
                }
                if (speed == -1) {
                    speed = animatable._speedRatio;
                }
            }
            for (let animation of animatable.getAnimations()) {
                animationGroup.addTargetedAnimation(animation.animation, animation.target);
            }
            /*tempFrameCount = animatable.toFrame - animatable.fromFrame;
            if (tempFrameCount > maxFrameCount) {
                maxFrameCount = tempFrameCount;
            }
            if (tempFrameCount < minFrameCount) {
                minFrameCount = tempFrameCount;
            }
            if (animatable.toFrame > maxFrame) {
                maxFrame = animatable.toFrame;
            }
            if (animatable.fromFrame < minFrame) {
                minFrame = animatable.fromFrame;
            }*/
            animationGroup.normalize(animatable.fromFrame, animatable.toFrame);
        }
        if (!hasValidAnimations) {
            animationGroup.dispose();
            return 1;
        }
        if (loop === -1) {
            loop = true;
        }
        if (speed === -1) {
            speed = 1.0;
        }
        /*if (maxFrameCount != minFrameCount) {
            animationGroup.normalize(minFrame, maxFrame);
        }*/
        animationGroup.start(start);
        animationGroup.loopAnimation = loop;
        animationGroup.speedRatio = speed;
        if (start) {
            animationGroup.setWeightForAllAnimatables(weight);
        }
        this.animationGroups[id] = animationGroup;
        return animationGroup;
    }
    updateAnimation() {
        return 0;
    }
    /**
     * 
     * @param {BABYLON.Animation} animation 
     * @param {function} [callback] 
     */
    beginAnimation(animation, callback = null) {
        if (this.stopAnim) {
            return false;
        }
        if (!(animation instanceof BABYLON.AnimationGroup)) {
            if (this.hasAnimationGroup(animation)) {
                this.animation = this.animationGroup[animation];
            }
            else {
                return false;
            }
        }
        if (animation != this.currAnim) {
            /* Prevents an animation from having its weight > 0 when it's swapped out before it reaches 0 */
            if (this.prevAnim != null && animation != this.prevAnim) {
                this.prevAnim.setWeightForAllAnimatables(0.0);
            }
            this.prevAnim = this.currAnim;
            this.currAnim = animation;
            this.animationTransitionCount = 0.0;
        }
        if (this.animationTransitionCount < 1) {
            this.animationTransitionCount += this.animationTransitionSpeed;
        }
        if (this.animationTransitionCount > 1) {
            this.animationTransitionCount = 1;
        }
        if (this.prevAnim instanceof BABYLON.AnimationGroup) {
            this.prevAnim.setWeightForAllAnimatables(1 - this.animationTransitionCount);
        }
        this.currAnim.setWeightForAllAnimatables(this.animationTransitionCount);
        return true;
    }
    pauseAnim() {
        this.stopAnim = true;
    }
    resumeAnim() {
        this.stopAnim = false;
    }
    start() {
        if (this.started) {
            return;
        }
        this.started = true;
    }
    stop() {
        if (!this.started) {
            return;
        }
        this.started = false;
        this.prevAnim = null;
    }
    moveAV() {
        return this;
    }
    /**
     * Returns all meshes associated with this controller.
     * @returns {Set<BABYLON.AbstractMesh>}
     */
    getMeshes() {
        return [this.collisionMesh, this.mesh];
    }
    setCell(cell) {
        if (cell instanceof Cell) {
            this.cell = cell;
        }
        else if (Game.hasCell(cell)) {
            this.cell = Game.getCell(cell);
        }
        else {
            return 2;
        }
        return 0;
    }
    getCell() {
        return this.cell;
    }
    hasCell() {
        return this.cell instanceof Cell;
    }
    updateGroundRay() {
        if (!(this.hasMesh())) {
            return this;
        }
        if (!(this.groundRay instanceof BABYLON.Ray)) {
            this.groundRay = new BABYLON.Ray(this.collisionMesh.position, BABYLON.Vector3.Down(), 0.01);
        }
        this.groundRay.origin = this.collisionMesh.position;
        //this.groundRay.direction = this.collisionMesh.position.add(BABYLON.Vector3.Down());
        return this;
    }

    createAttachedMeshes() {
        return this;
    }
    detachFromAllBones() {
        return [];
    }

    setDefaultAction(actionEnum) {
        actionEnum = Tools.filterEnum(actionEnum, ActionEnum);
        this.defaultAction = actionEnum;
        return 0;
    }
    getDefaultAction() {
        return this.defaultAction;
    }

    isEnabled() {
        return this.enabled;
    }
    setEnabled(enabled = true) {
        this.enabled = enabled == true;
        return this;
    }
    isAnimated() {
        return this.animated;
    }
    setAnimated(animated = true) {
        this.animated = animated == true;
        return this;
    }
    isLocked() {
        return this.locked;
    }
    setLocked(locked = true) {
        this.locked = locked == true;
        return this;
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
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        EntityController.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        if (this.disposing) {
            return null;
        }
        else {
            this.disposting = true;
        }
        this.entityID = null;
        this.setLocked(true);
        this.setEnabled(false);
        if (EditControls.pickedController == this) {
            EditControls.reset();
        }
        else if (EditControls.previousPickedController == this) {
            EditControls.previousPickedController = null;
        }
        this.propertiesChanged = false;
        if (this.hasEntity()) {
            Game.entityLogicWorkerPostMessage("removeController", 0, [this.id]);
        }
        for (let animation in this.animations) {
            this.animations[animation] = null;
            delete this.animations[animation]
        }
        Game.removeMesh(this.mesh);
        Game.removeMesh(this.collisionMesh);
        EntityController.remove(this.id);
        return null;
    }
    getClassName() {
        return "EntityController";
    }

    static initialize() {
        EntityController.entityControllerList = {};
        EntityController.debugMode = false;
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