class AbstractEntity {
    /**
     * Creates an AbstractEntity
     * @param  {String} _id          Unique ID
     * @param  {String} _name        Name
     * @param  {String} _description Description
     * @param  {String}  _image      Image path or base64
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = "genericItem", _type = undefined) {
        _id = Game.filterID(_id);
        if (typeof _id != "string") {
            _id = genUUIDv4();
        }
        this.id = _id;
        this.entityType = Game.EntityEnum.ABSTRACT;
        /**
         * Name
         * @type {String} Can be undefined
         */
        this.name = null;
        this.setName(_name);
        /**
         * Description
         * @type {String} Can be undefined
         */
        this.description = null;
        this.setDescription(_description);
        /**
         * Path to Entity's picture
         * @type {String} Relative path to an image, or base64 encoded String
         */
        this.image = null;
        this.setImage(_image);
        /**
         * Entity's controller
         * @type {CharacterController}
         */
        this.controller = null;
        this.owner = null;

        this._isEnabled = true;
        this._isLocked = false;
    }

    getID() {
        return this.id;
    }
    setName(_name) {
        this.name = Game.filterName(_name);
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
    setImage(_image) {
        if (Game.hasIcon(_image)) {
            this.image = _image;
        }
        else {
            this.image = "missingIcon";
        }
        return this;
    }
    getImage() {
        return this.image;
    }

    isEnabled() {
        return this._isEnabled == true;
    }
    setEnabled(_isEnabled = true) {
        this._isEnabled = (_isEnabled == true);
        return this;
    }

    isLocked() {
        return this._isLocked == true;
    }
    setLocked(_isLocked = true) {
        this._isLocked = (_isLocked == true);
        return this;
    }

    setController(_controller) {
        this.controller = Game.getEntityController(_controller);
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
     * @param {Character} _character Character, or undefined
     */
    setOwner(_character) {
        this.owner = Game.getCharacterEntity(_character);
        return this;
    }
    getOwner() {
        return this.owner;
    }

    dispose() {
        this._isEnabled = false;
        if (typeof this.availableActions == "object") {
            for (var _action in this.availableActions) {
                if (this.availableActions[_action] instanceof ActionData) {
                    this.availableActions[_action].dispose();
                }
            }
        }
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}