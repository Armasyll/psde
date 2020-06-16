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
        this.entity = undefined;
        this.texture = null;
        this.material = null;
        this.mesh = undefined;
        this.networkID = null;
        this.propertiesChanged = true;
        this.animations = new Array();
        this.started = false;
        this.stopAnim = false;
        this.currAnim = null;
        this.prevAnim = null;
        this.skeleton = null;
        this.bonesInUse = [];
        /**
         * Array of bones per animation
         * @type {Object} <string:Array>
         */
        this.animationBones = {};
        this.enabled = true;
        this.locked = false;
        this.animated = false;
        this.setMesh(mesh);
        this.setEntity(entity);
        this.entity.setController(this);
        if (this.entity instanceof Entity) {
            this.entity.setMeshID(this.mesh.name);
        }
        Game.entityLocRotWorker.postMessage({
            cmd:"set",
            msg:[
                this.entity.getID(),
                new Date().getTime(),
                this.mesh.position.asArray(),
                this.mesh.rotation.asArray()
            ]
        });
        this.mesh.alwaysSelectAsActiveMesh = true;
        this.groundRay = null;
        this.currentCell = null;
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
        if (this.hasMesh()) {
            return this.mesh.position.clone();
        }
        else {
            return BABYLON.Vector3.Zero();
        }
    }
    getRotation() {
        if (this.hasMesh()) {
            return this.mesh.rotation.clone();
        }
        else {
            return BABYLON.Vector3.Zero();
        }
    }
    getScaling() {
        if (this.hasMesh()) {
            return this.mesh.scaling.clone();
        }
        else {
            return BABYLON.Vector3.One();
        }
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
    setMesh(mesh) {
        if (mesh instanceof BABYLON.AbstractMesh) {
            this.mesh = mesh;
            if (this.mesh.material instanceof BABYLON.Material) {
                this.setMaterial(this.mesh.material);
                this.setTexture(this.mesh.material.diffuseTexture);
            }
            if (this.mesh.skeleton instanceof BABYLON.Skeleton) {
                this.setSkeleton(this.mesh.skeleton);
            }
            this.mesh.isPickable = true;
            this.mesh.controller = this;
            this.propertiesChanged = true;
        }
        return this;
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
        for (let boneGroup in Game.entityAnimationBones) {
            this.animationBones[boneGroup] = new Array();
            for (let i = 0; i < Game.entityAnimationBones[boneGroup].length; i++) {
                this.animationBones[boneGroup].push(this.skeleton.getBoneIndexByName(Game.entityAnimationBones[boneGroup][i]));
            }
        }
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
        }
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

    /**
     * 
     * @param {AnimData} animData 
     * @param {string} rangeName 
     * @param {number} rate 
     * @param {boolean} loop 
     * @param {boolean} standalone 
     */
    setAnimData(animData, rangeName, rate = 1, loop = true, standalone = true) {
        if (this.skeleton == null) {
            return;
        }
        animData.name = rangeName;
        animData.rate = rate;
        animData.loop = loop;
        animData.standalone = standalone;
        if (this.skeleton.getAnimationRange(animData.name) != null) {
            animData.exist = true;
            this.skeleton.getAnimationRange(rangeName).from += 1;
            animData.from = this.skeleton.getAnimationRange(rangeName).from;
            animData.to = this.skeleton.getAnimationRange(rangeName).to;
        }
        else {
            animData.exist = false;
        }
    }
    checkAnims(skeleton) {
        for (let i = 0; i < this.animations.length; i++) {
            let anim = this.animations[i];
            if (skeleton.getAnimationRange(anim.name) != null) {
                anim.exist = true;
            }
        }
    }
    /**
     * 
     * @param {AnimData} animData 
     * @param {function} [callback] 
     */
    beginAnimation(animData, callback = null) {
        if (this.stopAnim) {
            return false;
        }
        else if (!(animData instanceof AnimData)) {
            return false;
        }
        else if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return false;
        }
        else if (this.prevAnim == animData) {
            return false;
        }
        else if (!animData.exist) {
            return false;
        }
        if (this.bonesInUse.length > 0) {
            /*
            Have to cycle through all the bones just so I don't have to animate a handful :L
             */
            this.skeleton.bones.difference(this.bonesInUse).forEach(function(bone) {
                Game.scene.beginAnimation(bone, animData.from, animData.to, animData.loop, animData.rate, callback);
            });
        }
        else {
            this.skeleton.beginAnimation(animData.name, animData.loop, animData.rate, callback);
        }
        this.prevAnim = animData;
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
        EntityController.remove(this.id);
        return null;
    }
    getClassName() {
        return "EntityController";
    }

    static initialize() {
        EntityController.entityControllerList = {};
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
}
EntityController.initialize();