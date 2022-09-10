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
     * @param {BABYLON.AbstractMesh} aMeshes 
     * @param {object} entityObject 
     */
    constructor(id = "", aMeshes = [], entityObject = {}) {
        if (EntityController.debugMode) console.group(`Creating new CharacterController(${id}, meshObject, entityObject)`);
        if (!(super(id, aMeshes, entityObject) instanceof CreatureController)) {
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

    _removeMeshReferences(meshID) {
        for (let boneID in this._equipmentMeshIDsAttachedToBones) {
            for (let meshID in this._equipmentMeshIDsAttachedToBones[boneID]) {
                if (this._equipmentMeshIDsAttachedToBones[boneID].hasOwnProperty(meshID)) {
                    delete this._equipmentMeshIDsAttachedToBones[boneID][meshID];
                }
            }
            if (Object.keys(this._equipmentMeshIDsAttachedToBones[boneID]).length == 0) {
                delete this._equipmentMeshIDsAttachedToBones[boneID];
            }
        }
        super._removeMeshReferences(meshID);
        return 0;
    }
    detachFromAllBones(destroyMesh = true) {
        if (!(this.skeleton instanceof BABYLON.Skeleton)) {
            return 0;
        }
        for (let boneID in this._equipmentMeshIDsAttachedToBones) {
            for (let meshID in this._equipmentMeshIDsAttachedToBones) {
                delete this._equipmentMeshIDsAttachedToBones[boneID][meshID];
            }
        }
        super.detachFromAllBones(destroyMesh);
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
        if (!this.hasMesh()) {
            return 1;
        }
        switch (this.meshes[0].name) {
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
    generateAttachedMeshes() {
        super.generateAttachedMeshes();
        this.generateEquippedMeshes();
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

    assign(objectBlob) {
        super.assign(objectBlob);
        if (objectBlob.hasOwnProperty("equipment") && objectBlob["equipment"] instanceof Object) {
            this.assignAttachments(objectBlob["equipment"], this._equipmentMeshIDsAttachedToBones);
        }
        if (objectBlob.hasOwnProperty("held") && objectBlob["held"] instanceof Object) {
            this.assignAttachments(objectBlob["held"], this._equipmentMeshIDsAttachedToBones);
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