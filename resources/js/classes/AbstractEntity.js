class AbstractEntity {
    /**
     * Creates an AbstractEntity
     * @param  {string} [id] Unique ID, auto-generated if none given
     * @param  {string} name Name
     * @param  {string} [description] Description
     * @param  {string} [icon] Icon ID
     */
    constructor(id = "", name = "", description = "", icon = "genericItem") {
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
        this.setIcon(icon);
        this.controller = null;

        this.owner = null;
        
        this.target = null;

        /**
         * Actions available to this Entity
         * @type {Object} <ActionEnum:ActionData>
         */
        this.availableActions = {};
        /**
         * Hidden actions available to this Entity
         * @type {Object} <ActionEnum:ActionData>
         */
        this.hiddenAvailableActions = {};
        /**
         * Special Properties
         * @type {Set} <SpecialPropertyEnum>
         */
        this.specialProperties = new Set();
        /**
         * Default Action
         * @type {ActionData} <ActionEnum>
         */
        this.defaultAction = null;

        this._isEnabled = true;
        this._isLocked = false;

        this._isEssential = false;
    }

    getID() {
        return this.id;
    }
    setName(_name) {
        this.name = Tools.filterName(_name);
    }
    getName() {
        return this.name;
    }
    setDescription(_description) {
        this.description = _description;
    }
    getDescription() {
        return this.description;
    }
    setIcon(_icon) {
        if (Game.hasIcon(_icon)) {
            this.icon = _icon;
        }
        else {
            this.icon = "missingIcon";
        }
        return this;
    }
    getIcon() {
        return this.icon;
    }

    isEnabled() {
        return this._isEnabled == true;
    }
    setEnabled(isEnabled = true) {
        this._isEnabled = (isEnabled == true);
        return this;
    }

    isLocked() {
        return this._isLocked == true;
    }
    setLocked(isLocked = true) {
        this._isLocked = (isLocked == true);
        return this;
    }

    setController(entityController) {
        this.controller = Game.getEntityController(entityController);
        return this;
    }
    getController() {
        return this.controller;
    }
    hasController() {
        return this.controller instanceof EntityController;
    }
    removeController() {
        this.controller = undefined;
        return this;
    }

    /**
     * Sets Owner
     * @param {CharacterEntity} characterEntity Character, or undefined
     */
    setOwner(characterEntity) {
        if (!(characterEntity instanceof AbstractEntity)) {
            characterEntity = Game.getInstancedEntity(characterEntity) || Game.getEntity(characterEntity);
        }
        this.owner = Game.getCharacterEntity(characterEntity);
        return this;
    }
    getOwner() {
        return this.owner;
    }
    hasOwner() {
        return this.owner instanceof AbstractEntity;
    }
    removeOwner() {
        this.owner = null;
        return this;
    }
    clearOwner() {
        return this.removeOwner();
    }

    setTarget(abstractEntity) {
        if (!(abstractEntity instanceof AbstractEntity)) {
            abstractEntity = Game.getInstancedEntity(abstractEntity) || Game.getEntity(abstractEntity);
        }
        this.target = abstractEntity;
        return this;
    }
    getTarget() {
        return this.target;
    }
    hasTarget() {
        return this.target instanceof AbstractEntity;
    }
    removeTarget() {
        this.target = null;
        return this;
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
    }
    isEssential() {
        return this._isEssential;
    }

    dispose() {
        this._isEnabled = false;
        for (let action in this.availableActions) {
            if (this.availableActions[action] instanceof ActionData) {
                this.availableActions[action].dispose();
            }
        }
        for (let param in this) {
            this[param] = null;
        }
        return undefined;
    }
}