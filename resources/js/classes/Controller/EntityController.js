/**
 * Entity Controller
 */
class EntityController {
    /**
     * 
     * @param {string} id 
     * @param {BABYLON.AbstractMesh} mesh 
     * @param {AbstractEntity} entity 
     */
    constructor(id, mesh, entity) {
        id = Tools.filterID(id);
        if (typeof id != "string" || EntityController.has(id)) {
            id = Tools.genUUIDv4();
        }
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            return null;
        }
        if (!(entity instanceof AbstractEntity)) {
            return null;
        }
        this.id = id;
        this.debugMode = false;
        /**
         * @type AbstractEntity
         */
        this.entity = null;
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
        this.collisionMesh = null;
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
        this.animated = false;
        this.groundRay = null;
        this.currentCell = null;
        this.setEntity(entity);
        this.setMesh(mesh);
        Game.entityLocRotWorker.postMessage({
            cmd:"set",
            msg:[
                this.entity.getID(),
                new Date().getTime(),
                this.mesh.position.asArray(),
                this.mesh.rotation.asArray()
            ]
        });
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
        if (this.mesh instanceof BABYLON.AbstractMesh) {
            return this.mesh.position;
        }
        return BABYLON.Vector3.Zero();
    }
    getRotation() {
        if (this.mesh instanceof BABYLON.AbstractMesh) {
            return this.mesh.rotation;
        }
        return BABYLON.Vector3.Zero();
    }
    getScaling() {
        if (this.mesh instanceof BABYLON.AbstractMesh) {
            return this.mesh.scaling
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
            this.addTextureStage(mesh.material.diffuseTexture.name);
            this.currentMeshStage = 0;
        }
        this.createCollisionMesh();
        this.mesh.setParent(this.collisionMesh);
        if (updateChild && this.hasEntity()) {
            this.entity.setMeshID(mesh.id, false);
        }
        return this;
    }
    createCollisionMesh() {
        //this.collisionMesh = Game.createAreaMesh(String(this.id).concat("-collisionMesh"), "CUBE", this.mesh.getBoundingInfo().boundingBox.extendSize.x * 2, this.mesh.getBoundingInfo().boundingBox.extendSize.y * 2, this.mesh.getBoundingInfo().boundingBox.extendSize.z * 2, this.mesh.position, this.mesh.rotation);
        return this;
    }
    setMeshStage(index = 0, updateChild = false) {
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
        this.currentMeshStage = index;
        let position = this.getPosition();
        let rotation = this.getRotation();
        let scaling = this.getScaling();
        Game.removeMesh(this.mesh);
        let mesh = Game.createCharacterMesh(this.entity.id, this.meshStages[index], this.meshStages[index], position, rotation, scaling);
        this.setMesh(mesh);
        if (updateChild && this.hasEntity()) {
            this.entity.setMeshStage(index, false);
        }
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
    setEntity(entity) {
        if (entity instanceof AbstractEntity) {
            this.entity = entity;
            this.propertiesChanged = true;
            entity.setController(this);
            if (this.mesh instanceof BABYLON.AbstractMesh) {
                entity.setMeshID(this.mesh.name);
            }
            if (entity instanceof Entity) {
                this.meshStages = [...entity.meshStages];
                this.materialStages = [...entity.materialStages];
                this.textureStages = [...entity.textureStages];
                this.setMeshStage(entity.currentMeshStage, false);
            }
        }
        return this;
    }
    getEntity() {
        return this.entity;
    }
    hasEntity() {
        return this.entity instanceof AbstractEntity;
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
        this.mesh.setParent(mesh);
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
        this.mesh.setParent(controller.getMesh());
        return this;
    }
    getParent() {
        return this.mesh.parent;
    }
    removeParent() {
        this.mesh.setParent(null);
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
        let maxFrameCount = 0;
        let minFrameCount = Number.MAX_SAFE_INTEGER;
        let tempFrameCount = 0;
        let maxFrame = 0;
        let minFrame = Number.MAX_SAFE_INTEGER;
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
        return [this.mesh];
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
            this.groundRay = new BABYLON.Ray(this.mesh.position, this.mesh.position.add(BABYLON.Vector3.Down()), 0.01);
        }
        this.groundRay.origin = this.mesh.position;
        this.groundRay.direction = this.mesh.position.add(BABYLON.Vector3.Down());
        return this;
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
    dispose(options = {}) {
        if (this == Game.player.getController()) {
            return false;
        }
        this.setLocked(true);
        this.setEnabled(false);
        if (EditControls.pickedController == this) {
            EditControls.reset();
        }
        else if (EditControls.previousPickedController == this) {
            EditControls.previousPickedController = null;
        }
        this.propertiesChanged = false;
        this.animations.clear();
        if (this.hasEntity) {
            this.entity.removeController();
        }
        /*if (this.mesh instanceof BABYLON.AbstractMesh) {
            this.mesh.controller = null;
            Game.removeMesh(this.mesh);
        }*/
        for (let animation in this.animations) {
            this.animations[animation] = null;
            delete this.animations[animation]
        }
        if (options instanceof Object) {
            if (options.hasOwnProperty("disposeMesh") && options["disposeMesh"] == true) {
                Game.removeMesh(this.mesh);
            }
        }
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