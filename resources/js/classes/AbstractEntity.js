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
        this.type = null;
        /**
         * Entity's controller
         * @type {CharacterController}
         */
        this.controller = null;

        this.meshID = null;
        this.textureID = null;
        this.materialID = null;
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

        this.owner = null;
        this.price = 0;
        /**
         * Mass in kilograms
         * @type {Number} 0.001 to Number.MAX_SAFE_INTEGER
         */
        this.mass = 0.001;
        this.durability = new BoundedNumber(100, 0, 100);

        this.addAvailableAction("look");
        this.addSpecialProperty("exists");

        this.defaultAction = null;
        this.setDefaultAction("look");

        this._isEnabled = true;
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
    setMeshID(_mesh) {
        var _loadedMesh = Game.loadMesh(_mesh);
        if (_loadedMesh instanceof BABYLON.AbstractMesh) {
            if (_loadedMesh.id == "loadingMesh") {
                if (_mesh instanceof BABYLON.AbstractMesh) {
                    this.meshID = _mesh.id;
                }
                else {
                    this.meshID = _mesh;
                }
            }
            else if (_loadedMesh.id == "missingMesh") {
                this.meshID = "missingMesh";
            }
            else {
                this.meshID = _loadedMesh.name;
            }
        }
        else {
            this.meshID = "missingMesh";
        }
        return this;
    }
    getMeshID() {
        return this.meshID;
    }
    setTextureID(_texture) {
        _texture = Game.loadTexture(_texture);
        if (_texture instanceof BABYLON.Texture) {
            this.textureID = _texture.name;
        }
        else {
            this.textureID = "missingTexture";
        }
        return this;
    }
    getTextureID() {
        return this.textureID;
    }
    setMaterialID(_material) {
        _material = Game.loadMaterial(_material);
        if (_material instanceof BABYLON.Material) {
            this.materialID = _material.name;
        }
        else {
            this.materialID = "missingMaterial";
        }
        return this;
    }
    getMaterialID() {
        return this.materialID;
    }
    setController(_controller) {
        this.controller = Game.getEntityController(_controller);
        return this;
    }
    getType() {
        return this.type;
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

    setDefaultAction(_action) {
        if (this.hasAvailableAction(_action)) {
            this.defaultAction = _action;
        }
    }
    getDefaultAction() {
        return this.defaultAction;
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

    /**
     * Sets Price
     * @param {Number} _int Integer
     */
    setPrice(_int) {
        _int = Number.parseInt(_int);
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > Number.MAX_SAFE_INTEGER)
            _int = Number.MAX_SAFE_INTEGER;
        this.price = _int;
        return this;
    }
    getPrice() {
        return this.price;
    }

    /**
     * Sets Mass
     * @param {Number} _float Float
     */
    setMass(_float) {
        _float = Number.parseFloat(_float);
        if (isNaN(_float))
            _float = 0.001;
        else if (_float < 0)
            _float = 0.001;
        else if (_float > Number.MAX_SAFE_INTEGER)
            _float = Number.MAX_SAFE_INTEGER;
        this.mass = _float;
        return this;
    }
    getMass() {
        return (this.mass || this.entity.mass);
    }

    isEnabled() {
        return this._isEnabled == true;
    }
    setEnabled(_isEnabled = true) {
        this._isEnabled = (_isEnabled == true);
        return this;
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