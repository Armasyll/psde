class Entity extends AbstractEntity {
    /**
     * Creates an Entity
     * @param  {String} _id          Unique ID
     * @param  {String} _name        Name
     * @param  {String} _description Description
     * @param  {String}  _image      Image path or base64
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = "genericItem") {
        super(_id, _name, _description, _image);
        this.entityType = EntityEnum.ENTITY;
        /**
         * Mass in kilograms
         * @type {Number} 0.001 to Number.MAX_SAFE_INTEGER
         */
        this.mass = 0.001;
        this.durability = new BoundedNumber(100, 0, 100);
        this.meshID = null;
        this.textureID = null;
        this.materialID = null;

        this.addAvailableAction(ActionEnum.LOOK);
        this.addSpecialProperty(SpecialPropertyEnum.EXISTS);

        this.setDefaultAction(ActionEnum.LOOK);

        Game.setEntity(this.id, this);
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

    setDurability(_int) {
        this.durability.set(_int);
        return this;
    }
    addDurability(_int = 1) {
        return this.durability.inc(_int);
    }
    subtractDurability(_int = 1) {
        return this.durability.dec(_int);
    }
    getDurability() {
        return this.durability.value;
    }

    setMaxDurability(_int) {
        this.durability.setMax(_int);
        return this;
    }
    addMaxDurability(_int = 1) {
        return this.durability.incMax(_int);
    }
    subtractMaxDurability(_int = 1) {
        return this.durability.decMax(_int);
    }
    getMaxDurability() {
        return this.durability._max;
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

    /**
     * Adds an available Action when interacting with this Entity
     * @param {String} _action (ActionEnum)
     */
    addAvailableAction(_action, _function = undefined, _runOnce = false) {
        if (_action instanceof ActionData) {
            _action = _action.action;
        }
        else if (!ActionEnum.properties.hasOwnProperty(_action)) {
            return this;
        }
        this.availableActions[_action] = new ActionData(_action, _function, _runOnce);
        return this;
    }
    /**
     * Removes an available Action when interacting with this Entity
     * @param  {String} _action (ActionEnum)
     * @return {Booealn}          Whether or not the Action was removed
     */
    removeAvailableAction(_action) {
        if (_action instanceof ActionData) {
            _action = _action.action;
        }
        else if (!ActionEnum.properties.hasOwnProperty(_action)) {
            return this;
        }
        if (this.availableActions.hasOwnProperty(_action)) {
            if (this.availableActions[_action] instanceof ActionData) {
                this.availableActions[_action].dispose();
            }
            delete this.availableActions[_action];
        }
        return this;
    }
    getAvailableAction(_action) {
        if (_action instanceof ActionData) {
            _action = _action.action;
        }
        else if (!ActionEnum.properties.hasOwnProperty(_action)) {
            return null;
        }
        if (this.availableActions.hasOwnProperty(_action)) {
            return this.availableActions[_action];
        }
    }
    getAvailableActions() {
        return this.availableActions;
    }
    hasAvailableAction(_action) {
        if (_action instanceof ActionData) {
            _action = _action.action;
        }
        else if (!ActionEnum.properties.hasOwnProperty(_action)) {
            return false;
        }
        return this.availableActions.hasOwnProperty(_action);
    }

    /**
     * Adds a Hidden Available Action when interacting with this Entity
     * @param {String} _action (ActionEnum)
     */
    addHiddenAvailableAction(_action) {
        if (_action instanceof ActionData) {
            _action = _action.action;
        }
        _action = this.getAvailableAction(_action);
        if (_action instanceof ActionData) {
            this.hiddenAvailableActions[_action.action] = _action;
        }
        return this;
    }
    /**
     * Removes a Hidden Available Action when interacting with this Entity
     * @param  {String} _action (ActionEnum)
     * @return {Booealn}          Whether or not the Action was removed
     */
    removeHiddenAvailableAction(_action) {
        if (_action instanceof ActionData) {
            _action = _action.action;
        }
        if (this.hasHiddenAvailableAction(_action)) {
            delete this.hiddenAvailableActions[_action];
        }
        return this;
    }
    getHiddenAvailableAction(_action) {
        if (_action instanceof ActionData) {
            _action = _action.action;
        }
        if (this.hiddenAvailableActions.hasOwnProperty(_action)) {
            return this.hiddenAvailableActions[_action];
        }
    }
    getHiddenAvailableActions() {
        return this.hiddenAvailableActions;
    }
    hasHiddenAvailableAction(_action) {
        if (_action instanceof ActionData) {
            _action = _action.action;
        }
        return this.hiddenAvailableActions.hasOwnProperty(_action);
    }

    /**
     * Adds a special property
     * @param {Number} _specialProperty
     */
    addSpecialProperty(_specialProperty) {
        if (isNaN(_specialProperty)) {
            return this;
        }
        this.specialProperties.add(_specialProperty);
        return this;
    }
    /**
     * Removes a special property
     * @param {Number} _specialProperty
     */
    removeSpecialProperty(_specialProperty) {
        if (isNaN(_specialProperty)) {
            return this;
        }
        this.specialProperties.remove(_specialProperty);
        return this;
    }
    /**
     * Returns this Entity's special properties
     * @return {Set} <Number (SpecialPropertyEnum)>
     */
    getSpecialProperties() {
        return this.specialProperties;
    }
    /**
     * Returns whether or not this Entity has the specific special property
     * @param  {Number}  _specialProperty (SpecialPropertyEnum)
     * @return {Boolean} Whether or not this Entity has the specific SpecialPropertyEnum
     */
    hasSpecialProperty(_specialProperty) {
        if (isNaN(_specialProperty)) {
            return false;
        }
        return this.specialProperties.has(_specialProperty);
    }

    setDefaultAction(_action) {
        if (this.hasAvailableAction(_action)) {
            this.defaultAction = _action;
        }
    }
    getDefaultAction() {
        return this.defaultAction;
    }

    createInstance(_id = undefined) {
        _id = Game.filterID(_id);
        if (typeof _id != "string") {
            _id = genUUIDv4();
        }
        return new InstancedEntity(_id, this);
    }
    dispose() {
        Game.removeEntity(this.id);
        super.dispose();
        return undefined;
    }
}