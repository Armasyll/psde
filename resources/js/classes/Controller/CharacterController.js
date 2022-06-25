/**
 * Character Controller
 * @class
 * @extends {CreatureController}
 * @typedef {Object} CharacterController
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
        if (!(super(id, mesh, entityObject) instanceof CreatureController)) {
            return undefined;
        }

        this._equipmentMeshIDsAttachedToBones = {};
        this.helmetVisible = true;
        this.bHasRunPostConstructCharacter = false;
        CharacterController.set(this.id, this);
        if (EntityController.debugMode) console.info(`Finished creating new CharacterController(${this.id})`);
        if (EntityController.debugMode) console.groupEnd();
        this.postConstruct();
    }
    postConstruct() {
        if (this.bHasRunPostConstructCharacter) {
            return 0;
        }
        super.postConstruct();
        this.bHasRunPostConstructCharacter = true;
        return 0;
    }

    detachFromAllBones(destroyMesh = true) {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 0;
        }
        for (let boneID in this._equipmentMeshIDsAttachedToBones) {
            for (let meshID in this._equipmentMeshIDsAttachedToBones[boneID]) {
                if (this._bonesAttachedToMeshes.hasOwnProperty(meshID)) {
                    let bone = this.getBone(boneID);
                    this.detachMeshFromBone(this._bonesAttachedToMeshes[meshID], bone, destroyMesh);
                }
                delete this._equipmentMeshIDsAttachedToBones[boneID][meshID];
            }
            delete this._equipmentMeshIDsAttachedToBones[boneID];
        }
        super.detachFromAllBones(destroyMesh);
        return 0;
    }
    attachEquipmentMeshToBone(mesh, boneID, position, rotation, scaling, options) {
        if (!this.hasBone(boneID)) {
            return 1;
        }
        if (!this._equipmentMeshIDsAttachedToBones.hasOwnProperty(boneID)) {
            this._equipmentMeshIDsAttachedToBones[boneID] = {};
        }
        this._equipmentMeshIDsAttachedToBones[boneID][mesh.name] = mesh.material.name;
        this.attachMeshToBone(mesh, bone, position, rotation, scaling, options);
        return 0;
    }
    attachEquipmentMeshIDToBone(meshID, materialID, boneID, position, rotation, scaling, options) {
        if (!this.hasBone(boneID)) {
            return 1;
        }
        if (!this._equipmentMeshIDsAttachedToBones.hasOwnProperty(boneID)) {
            this._equipmentMeshIDsAttachedToBones[boneID] = {};
        }
        this._equipmentMeshIDsAttachedToBones[boneID][meshID] = materialID;
        this.attachMeshIDToBone(meshID, materialID, boneID, position, rotation, scaling, options);
        return 0;
    }
    detachEquipmentMeshID(meshID) {
        return 0;
    }
    detachEquipmentMesh(mesh) {
        return 0;
    }
    detachEquipmentMeshesFromBone(boneID, destroyMesh = true) {
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
        for (let meshID in this._equipmentMeshIDsAttachedToBones[boneID]) {
            if (this._bonesAttachedToMeshes.hasOwnProperty(meshID)) {
                this.detachMeshFromBone(this._bonesAttachedToMeshes[meshID], boneID, destroyMesh)
            }
        }
        delete this._equipmentMeshIDsAttachedToBones[boneID];
        return 0;
    }
    detachEquipmentMeshes(destroyMesh = true) {
        for (let boneID in this._equipmentMeshIDsAttachedToBones) {
            for (let meshID in this._equipmentMeshIDsAttachedToBones[boneID]) {
                if (this._bonesAttachedToMeshes.hasOwnProperty(meshID)) {
                    let bone = this.getBone(boneID);
                    this.detachMeshFromBone(this._bonesAttachedToMeshes[meshID], bone, destroyMesh);
                }
                delete this._equipmentMeshIDsAttachedToBones[boneID][meshID];
            }
            delete this._equipmentMeshIDsAttachedToBones[boneID];
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
        super.detachFromAllBones(destroyMesh);
        return 0;
    }

    generateHitboxes() {
        switch (this.meshID) {
            case "aardwolfM":
            case "aardwolfF":
            case "foxM":
            case "foxF":
            case "foxSkeletonN": {
                this.attachToROOT("hitbox.canine", "collisionMaterial");
                this.attachToHead("hitbox.canine.head", "collisionMaterial", { isHitbox: true });
                this.attachToNeck("hitbox.canine.neck", "collisionMaterial", { isHitbox: true });
                this.attachToChest("hitbox.canine.chest", "collisionMaterial", { isHitbox: true });
                this.attachToLeftHand("hitbox.canine.hand.l", "collisionMaterial", { isHitbox: true });
                this.attachToRightHand("hitbox.canine.hand.r", "collisionMaterial", { isHitbox: true });
                this.attachToSpine("hitbox.canine.spine", "collisionMaterial", { isHitbox: true });
                this.attachToPelvis("hitbox.canine.pelvis", "collisionMaterial", { isHitbox: true });
                break;
            }
        }
        return 0;
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

    update(objectBlob) {
        super.update(objectBlob);
        let thisEntity = Game.getCachedEntity(this.entityID);
        if (thisEntity.hasOwnProperty("equipment") && objectBlob.hasOwnProperty("equipment")) {
            for (let equipmentSlot in thisEntity.equipment) {
                if (objectBlob["equipment"][equipmentSlot] == null) {
                    this.detachEquipmentMeshesFromBone(equipmentSlot);
                }
                else if (thisEntity["equipment"][equipmentSlot] == null) {
                    this.attachEquipmentMeshToBone(objectBlob["equipment"][equipmentSlot]["meshID"], objectBlob["equipment"][equipmentSlot]["materialID"], equipmentSlot);
                }
                else if (thisEntity["equipment"][equipmentSlot]["id"] != objectBlob["equipment"][equipmentSlot]["id"]) {
                    this.detachEquipmentMeshesFromBone(equipmentSlot);
                    this.attachEquipmentMeshToBone(objectBlob["equipment"][equipmentSlot]["meshID"], objectBlob["equipment"][equipmentSlot]["materialID"], equipmentSlot);
                }
            }
        }
    }
    assign(objectBlob) {
        super.assign(objectBlob);
        let equipmentObject = null;
        let meshID = null;
        let materialID = null;
        if (objectBlob.hasOwnProperty("equipment")) {
            for (let boneID in objectBlob["equipment"]) {
                if (!(objectBlob["equipment"][boneID] instanceof Object)) {
                    this.detachEquipmentMeshesFromBone(boneID, true);
                }
                else {
                    equipmentObject = objectBlob["equipment"][boneID];
                    if (equipmentObject.hasOwnProperty("meshID")) {
                        meshID = objectBlob.equipment[boneID]["meshID"];
                        if (equipmentObject.hasOwnProperty("materialID")) {
                            materialID = objectBlob.equipment[boneID]["materialID"];
                        }
                        else if (equipmentObject.hasOwnProperty("textureID")) {
                            materialID = objectBlob.equipment[boneID]["textureID"];
                        }
                        else {
                            material = "missingMaterial";
                        }
                        this.attachEquipmentMeshIDToBone(meshID, materialID, boneID);
                    }
                }
            }
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
        this.detachEquipmentMeshes(true);
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