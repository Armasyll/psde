/**
 * Spell Controller
 */
class SpellController extends EntityController {
    /**
     * Creates a Spell Controller
     * @param {string} id 
     * @param {BABYLON.AbstractMesh} aMeshes 
     * @param {object} entityObject 
     */
    constructor(id = "", aMeshes = [], entityObject = {}) {
        super(id, aMeshes, entityObject);
        if (!this.hasMesh()) {
            return undefined;
        }
        this.bHasRunPostConstructSpell = false;
        SpellController.set(this.id, this);
        this.postConstruct();
    }
    postConstruct() {
        if (this.bHasRunPostConstructSpell) {
            return 0;
        }
        super.postConstruct();
        this.bHasRunPostConstructSpell = true;
        return 0;
    }

    updateID(newID) {
        super.updateID(newID);
        SpellController.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        SpellController.remove(this.id);
        super.dispose();
        return null;
    }
    getClassName() {
        return "SpellController";
    }

    static initialize() {
        SpellController.SpellControllerList = {};
    }
    static get(id) {
        if (SpellController.has(id)) {
            return SpellController.SpellControllerList[id];
        }
        return 1;
    }
    static has(id) {
        return SpellController.SpellControllerList.hasOwnProperty(id);
    }
    static set(id, SpellController) {
        SpellController.SpellControllerList[id] = SpellController;
        return 0;
    }
    static remove(id) {
        delete SpellController.SpellControllerList[id];
        return 0;
    }
    static list() {
        return SpellController.SpellControllerList;
    }
    static clear() {
        for (let i in SpellController.SpellControllerList) {
            SpellController.SpellControllerList[i].dispose();
        }
        SpellController.SpellControllerList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!SpellController.has(oldID)) {
            return 1;
        }
        SpellController.set(newID, SpellController.get(oldID));
        SpellController.remove(oldID);
        return 0;
    }
}
SpellController.initialize();