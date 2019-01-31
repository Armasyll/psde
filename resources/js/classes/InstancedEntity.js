class InstancedEntity extends AbstractEntity {
    /**
     * Creates an InstancedEntity
     * @param  {UUIDv4} _id            UUID
     * @param  {Entity} _entity        Entity, String ID of Entity, InstancedEntity, or String ID of InstancedEntity
     * @param  {String} _name          Name
     * @param  {Character} _owner      Owner
     * @param  {Number} _price         Price, defaults to 0
     * @param  {Number} _mass          Mass, defaults to 0.001
     * @param  {Number} _durability    Durability, defaults to 1
     * @param  {Number} _durabilityMax Max durability, defaults to 1
     */
    constructor(_id, _entity, _name = undefined, _description = undefined, _image = undefined) {
        super(_id, _name, _description);
        this.entity = Game.getEntity(_entity);
        if (!(this.entity instanceof Entity)) {
            return undefined;
        }

        this.setName(_name || this.entity.getName());
        this.setDescription(_description || this.entity.getDescription());
        this.setImage(_image || this.entity.getImage());
        this.durability = this.entity.durability.clone();

        this.availableActions = {};
        this._useOwnAvailableActions = false;
        this.defaultAction = null;
        this._usesOwnDefaultAction = false;
        this.specialProperties = new Set();
        this._useOwnSpecialProperties = false;

        Game.setInstancedEntity(this.id, this);
    }
    getEntity() {
        return this.entity;
    }
    getMeshID() {
        return this.entity.getMeshID();
    }
    getTextureID() {
        return this.entity.getTextureID();
    }
    getMaterialID() {
        return this.entity.getMaterialID();
    }
    getMass() {
        return this.entity.getMass();
    }

    _createOwnSpecialProperties() {
        if (this.entity.getSpecialProperties() instanceof Set) {
            this.specialProperties = new Set(this.entity.getSpecialProperties());
        }
        else {
            this.specialProperties = new Set();
        }
        this._useOwnSpecialProperties = true;
    }
    addSpecialProperty(_specialProperty) {
        if (isNaN(_specialProperty)) {
            return this;
        }
        if (!this._useOwnSpecialProperties) {
            this._createOwnSpecialProperties();
        }
        this.specialProperties.add(_specialProperty);
        return this;
    }
    removeSpecialProperty(_specialProperty) {
        if (isNaN(_specialProperty)) {
            return this;
        }
        if (!this._useOwnSpecialProperties) {
            this._createOwnSpecialProperties();
        }
        this.specialProperties.remove(_specialProperty);
        return this;
    }
    getSpecialProperties() {
        if (this._useOwnSpecialProperties) {
            return this.specialProperties;
        }
        else {
            return this.entity.getSpecialProperties();
        }
    }
    hasSpecialProperty(_specialProperty) {
        if (this._useOwnSpecialProperties) {
            if (isNaN(_specialProperty)) {
                return false;
            }
            return this.specialProperties.has(_specialProperty);
        }
        else {
            return this.entity.hasSpecialProperty(_specialProperty);
        }
    }

    _createOwnAvailableActions() {
        for (var _action in this.entity.getAvailableActions()) {
            var _availableAction = this.entity.getAvailableAction(_action);
            if (_availableAction instanceof ActionData) {
                this.availableActions[_action] = this.entity.getAvailableAction(_action).clone();
            }
        }
        this._useOwnAvailableActions = true;
    }
    addAvailableAction(_action, _function = undefined, _runOnce = false) {
        if (!this._useOwnAvailableActions) {
            this._createOwnAvailableActions();
        }
        if (Game.kActionTypes.has(_action)) {
            this.availableActions[_action] = new ActionData(_action, _function, _runOnce);
        }
        return this;
    }
    removeAvailableAction(_action) {
        if (!this._useOwnAvailableActions) {
            this._createOwnAvailableActions();
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
        if (this._useOwnAvailableActions) {
            if (this.availableActions.hasOwnProperty(_action)) {
                return this.availableActions[_action];
            }
        }
        else {
            return this.entity.getAvailableAction(_action);
        }
    }
    getAvailableActions() {
        if (this._useOwnAvailableActions) {
            return this.availableActions;
        }
        else {
            return this.entity.getAvailableActions();
        }
    }
    hasAvailableAction(_action) {
        if (this._useOwnAvailableActions) {
            return this.availableActions.hasOwnProperty(_action);
        }
        else {
            return this.entity.hasAvailableAction(_action);
        }
    }

    setDefaultAction(_action) {
        this._usesOwnDefaultAction = true;
        if (this.hasAvailableAction(_action)) {
            this.defaultAction = _action;
        }
    }
    getDefaultAction() {
        if (this._usesOwnDefaultAction) {
            return this.defaultAction;
        }
        else {
            return this.entity.getDefaultAction();
        }
    }
    
    clone(_id) {
        _instancedEntity = new InstancedEntity(_id, this.entity, this.name, this.description, this.image);
        _instancedEntity.durability = this.durability.clone();
        _instancedEntity.specialProperties = new Set(this.specialProperties);
        return _instancedEntity;
    }
    dispose() {
        Game.removeInstancedEntity(this.id);
        super.dispose();
        return undefined;
    }
}