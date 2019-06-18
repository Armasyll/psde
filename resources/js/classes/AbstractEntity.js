class AbstractEntity {
    /**
     * Creates an AbstractEntity
     * @param  {string} id Unique ID, auto-generated if none given
     * @param  {string} name Name
     * @param  {string} [description] Description
     * @param  {string} [iconID] Icon ID
     */
    constructor(id = "", name = "", description = "", iconID = "genericItem") {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        this.id = id;
        this.entityType = EntityEnum.ABSTRACT;
        this.name = null;
        this.setName(name);
        this.description = null;
        this.setDescription(description);
        this.icon = null;
        this.setIcon(iconID);
        this.controller = null;
        this.owner = null;
        this.target = null;
        this.availableActions = {};
        this.hiddenAvailableActions = {};
        this.specialProperties = new Set();
        this.defaultAction = null;
        this._isEnabled = true;
        this._isLocked = false;
        this._isEssential = false;
        Game.setAbstractEntity(this.id, this);
    }

    getID() {
        return this.id;
    }
    setID(id) {
        if (this._isLocked) {
            id = Tools.filterID(id);
            if (id.length > 0) {
                this.id = id;
            }
        }
        return this.id;
    }
    getType() {
        return this.entityType;
    }
    setName(name) {
        this.name = Tools.filterName(name);
        return 0;
    }
    getName() {
        return this.name;
    }
    setDescription(description) {
        this.description = Tools.filterName(description);
        return 0;
    }
    getDescription() {
        return this.description;
    }
    setIcon(iconID) {
        if (Game.hasIcon(iconID)) {
            this.icon = iconID;
        }
        else {
            this.icon = "missingIcon";
        }
        return 0;
    }
    getIcon() {
        return this.icon;
    }

    isEnabled() {
        return this._isEnabled == true;
    }
    setEnabled(isEnabled = true) {
        this._isEnabled = (isEnabled == true);
        return 0;
    }

    isLocked() {
        return this._isLocked == true;
    }
    setLocked(isLocked = true) {
        this._isLocked = (isLocked == true);
        return 0;
    }

    setController(entityController) {
        if (entityController instanceof EntityController) {
            this.controller = entityController;
            return 0;
        }
        return 2;
    }
    getController() {
        return this.controller;
    }
    hasController() {
        return this.controller instanceof EntityController;
    }
    removeController() {
        this.controller = undefined;
        return 0;
    }

    /**
     * Sets Owner
     * @param {CharacterEntity} characterEntity Character, or undefined
     */
    setOwner(characterEntity) {
        if (!(characterEntity instanceof AbstractEntity)) {
            if (Game.hasInstancedEntity(characterEntity)) {
                characterEntity = Game.getInstancedEntity(characterEntity);
            }
            else if (Game.hasEntity(characterEntity)) {
                characterEntity = Game.getEntity(characterEntity);
            }
            else {
                return 2;
            }
        }
        this.owner = characterEntity;
        return 0;
    }
    getOwner() {
        return this.owner;
    }
    hasOwner() {
        return this.owner instanceof AbstractEntity;
    }
    removeOwner() {
        this.owner = null;
        return 0;
    }
    clearOwner() {
        return this.removeOwner();
    }

    setTarget(abstractEntity) {
        if (!(abstractEntity instanceof AbstractEntity)) {
            if (Game.hasInstancedEntity(abstractEntity)) {
                abstractEntity = Game.getInstancedEntity(characterEntity);
            }
            else if (Game.hasEntity(characterEntity)) {
                abstractEntity = Game.getEntity(abstractEntity);
            }
            else {
                return 2;
            }
        }
        this.target = abstractEntity;
        return 0;
    }
    getTarget() {
        return this.target;
    }
    hasTarget() {
        return this.target instanceof AbstractEntity;
    }
    removeTarget() {
        this.target = null;
        return 0;
    }
    clearTarget() {
        return this.removeTarget();
    }

    setEssential(isEssential = true) {
        this._isEssential = isEssential == true;
        if (this._isEssential) {
            Game.setEssentialEntity(this);
        }
        else {
            Game.removeEssentialEntity(this);
        }
        return 0;
    }
    isEssential() {
        return this._isEssential;
    }

    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        this.clearTarget();
        if (this.hasController()) {
            this.controller.setLocked(true);
            this.controller.setEnabled(false);
            this.controller.dispose();
        }
        for (let action in this.availableActions) {
            if (this.availableActions[action] instanceof ActionData) {
                this.availableActions[action].dispose();
            }
        }
        Game.removeAbstractEntity(this.id);
        return undefined;
    }
}