class Entity extends AbstractEntity {
    /**
     * Creates an Entity
     * @param  {String} _id           Unique ID
     * @param  {String} _name         Name
     * @param  {String} _description  Description
     * @param  {String}  _image       Image ID
     * @param  {EntityEnum} _itemType EntityEnum
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = "genericItem", _entityType = EntityEnum.ENTITY) {
        super(_id, _name, _description, _image);
        this.entityType = _entityType;;
        /**
         * Weight in kilograms
         * @type {BoundedNumber} 1 to Number.MAX_SAFE_INTEGER
         */
        this.weight = new BoundedNumber(1, 0, Number.MAX_SAFE_INTEGER);
        this.price = new BoundedNumber(0, 0, Number.MAX_SAFE_INTEGER);
        this.health = new BoundedNumber(100, 0, 100);
        this.meshID = null;
        this.textureID = null;
        this.materialID = null;

        this.addAvailableAction(ActionEnum.LOOK);
        this.addSpecialProperty(SpecialPropertyEnum.EXISTS);

        this.setDefaultAction(ActionEnum.LOOK);

        Game.setEntity(this.id, this);
    }

    setWeight(_int) {
        this.weight.set(_int);
        return this;
    }
    getWeight() {
        return this.weight.getValue();
    }

    setPrice(_int) {
        this.price.set(_int);
        return this;
    }
    getPrice() {
        return this.price.getValue();
    }

    setHealth(_int) {
        this.health.set(_int);
        return this;
    }
    addHealth(_int = 1) {
        return this.health.inc(_int);
    }
    subtractHealth(_int = 1) {
        return this.health.dec(_int);
    }
    getHealth() {
        return this.health.value;
    }

    setMaxHealth(_int) {
        this.health.setMax(_int);
        return this;
    }
    addMaxHealth(_int = 1) {
        return this.health.incMax(_int);
    }
    subtractMaxHealth(_int = 1) {
        return this.health.decMax(_int);
    }
    getMaxHealth() {
        return this.health._max;
    }

    setMeshID(_mesh) {
        if (Game.hasMesh(_mesh)) {
            if (_mesh instanceof BABYLON.AbstractMesh) {
                _mesh = _mesh.name;
            }
            this.meshID = _mesh;
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

    clone(_id = undefined) {
        _id = Game.filterID(_id);
        if (typeof _id != "string") {
            _id = genUUIDv4();
        }
        var _entity = new Entity(_id, this.name, this.description, this.image, this.entityType);
        // variables from AbstractEntity
        _entity.availableActions = Object.assign({}, this.availableActions);
        _entity.hiddenAvailableActions = Object.assign({}, this.hiddenAvailableActions);
        _entity.specialProperties = new Set(this.specialProperties);
        _entity.defaultAction = this.defaultAction;
        // variables from Entity
        _entity.weight.copyFrom(this.weight);
        _entity.price.copyFrom(this.price);
        _entity.health.copyFrom(this.health);
        return _entity;
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