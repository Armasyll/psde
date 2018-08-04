class Entity {
    /**
     * Creates an Entity
     * @param  {String} _id          Unique ID
     * @param  {String} _name        Name
     * @param  {String} _description Description
     * @param  {String}  _image      Image path of base64
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined) {
        if (typeof _id != "string") {_id = genUUIDv4();}
        _id = Game.filterID(_id);
        /**
         * Identification
         * @type {String} Cannot be undefined!
         */
        this.id = _id;
        /**
         * Name
         * @type {String} Can be undefined
         */
        this.name = undefined;
        this.setName(_name);
        /**
         * Description
         * @type {String} Can be undefined
         */
        this.description = undefined;
        this.setDescription(_description);
        /**
         * Path to Entity's picture
         * @type {String} Relative path to an image, or base64 encoded String
         */
        this.image = undefined;
        this.setImage(_image);
        /**
         * Entity's controller
         * @type {CharacterController}
         */
        this.controller = undefined;

        this.avatarID = undefined;
        this.avatarSkin = undefined;

        /**
         * Actions available to this Entity
         * @type {Set} <Game.kActionTypes>
         */
        this.availableActions = {};
        /**
         * Game.kSpecialProperties
         * @type {Set} <Game.kSpecialProperties>
         */
        this.specialProperties = new Set();

        /**
         * Mass in kilograms
         * @type {Number} 0.001 to Number.MAX_SAFE_INTEGER
         */
        this.defaultMass = 0;

        this.addAvailableAction("look");
        this.addSpecialProperty("exists");

        Game.entities[this.id] = this;
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
        this.image = _image;
        return this;
    }
    getImage() {
        return this.image;
    }
    setAvatarID(_avatar) {
        _avatar = Game.getMesh(_avatar);
        if (_avatar != undefined) {
            this.avatarID = _avatar.name;
        }
        return this;
    }
    getAvatarID() {
        return this.avatarID;
    }
    setAvatar(_avatar) {
        this.setAvatarID(_avatar);
        return this;
    }
    getAvatar() {
        return Game.getMesh(this.avatarID);
    }
    setAvatarSkin(_skin) {
        this.avatarSkin = _skin;
        return this;
    }
    getAvatarSkin() {
        return this.avatarSkin;
    }
    removeAvatarSkin() {
        this.avatarSkin = undefined;
        return this;
    }
    setController(_controller) {
        if (!(_controller instanceof EntityController)) {
            if (Game.hasController(_controller)) {
                Game.getController(_controller);
            }
            else {
                return;
            }
        }
        this.controller = _controller;
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
     * Adds an available Action when interacting with this Entity
     * @param {String} _action (Game.kActionTypes)
     */
    addAvailableAction(_action, _function = undefined, _runOnce = false) {
        if (Game.kActionTypes.has(_action)) {
            this.availableActions[_action] = new ActionData(_action, _function, _runOnce);
        }
        return this;
    }
    /**
     * Removes an available Action when interacting with this Entity
     * @param  {String} _action (Game.kActionTypes)
     * @return {Booealn}          Whether or not the Action was removed
     */
    removeAvailableAction(_action) {
        if (this.availableActions.hasOwnProperty(_action)) {
            if (this.availableActions[_action] instanceof ActionData) {
                this.availableActions[_action].dispose();
            }
            delete this.availableActions[_action];
        }
        return this;
    }
    getAvailableAction(_action) {
        if (this.availableActions.hasOwnProperty(_action)) {
            return this.availableActions[_action];
        }
    }
    getAvailableActions() {
        return this.availableActions;
    }
    hasAvailableAction(_action) {
        return this.availableActions.hasOwnProperty(_action);
    }

    /**
     * Adds a Game.kSpecialProperties
     * @param {String} _specialProperties (Game.kSpecialProperties)
     */
    addSpecialProperty(_specialProperties) {
        if (Game.kSpecialProperties.has(_specialProperties))
            this.specialProperties.add(_specialProperties);
        else if (_specialProperties instanceof Array) {
            _specialProperties.forEach(function(_specialProperties) {
                Game.kSpecialProperties.has(_specialProperties) && this.specialProperties.add(_specialProperties);
            }, this);
        }
        return this;
    }
    /**
     * Returns this Entity's Game.kSpecialProperties
     * @return {Set} <String (Game.kSpecialProperties)>
     */
    getSpecialProperties() {
        return this.specialProperties;
    }
    /**
     * Returns whether or not this Entity has the specified Game.kSpecialProperties
     * @param  {String}  _specialProperties (Game.kSpecialProperties)
     * @return {Boolean}              Whether or not this Entity has the specified Game.kSpecialProperties
     */
    hasSpecialProperty(_specialProperties) {
        if (Game.kSpecialProperties.has(_specialProperties))
            return this.specialProperties.has(_specialProperties);
        else
            return false;
    }

    dispose() {
        delete Game.entities[this.id];
        for (_action in this.availableActions) {
            if (this.availableActions[_action] instanceof ActionData) {
                this.availableActions[_action].dispose();
            }
        }
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}