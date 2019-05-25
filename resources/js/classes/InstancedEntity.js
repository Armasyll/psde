class InstancedEntity extends AbstractEntity {
    /**
     * Creates an InstancedEntity
     * @param  {UUIDv4} _id            UUID
     * @param  {Entity} _entity        Entity, String ID of Entity, InstancedEntity, or String ID of InstancedEntity
     * @param  {String} _name          Name
     * @param  {Character} _owner      Owner
     * @param  {Number} _price         Price, defaults to 0
     * @param  {Number} _weight        Weight, defaults to 0.001
     * @param  {Number} _health        Health, defaults to 1
     * @param  {Number} _healthMax     Max health, defaults to 1
     */
    constructor(_id, _entity, _name = undefined, _description = undefined, _icon = undefined) {
        super(_id, _name, _description);
        this.entity = Game.getEntity(_entity);
        if (!(this.entity instanceof Entity)) {
            return undefined;
        }

        this.setName(_name || this.entity.getName());
        this.setDescription(_description || this.entity.getDescription());
        this.setIcon(_icon || this.entity.getIcon());
        this.entityType = _entity.entityType;
        this.health = this.entity.health.clone();

        this._useOwnAvailableActions = false;
        this._useOwnHiddenAvailableActions = false;
        this.defaultAction = this.entity.getDefaultAction();
        this._useOwnDefaultAction = false;
        this._useOwnSpecialProperties = false;

        Game.setInstancedEntity(this.id, this);
    }
    getEntity() {
        return this.entity;
    }
    hasEntity() {
        return this.entity instanceof Entity;
    }
    getMeshID() {
        if (!this.hasEntity()) {
            return "missingMesh";
        }
        return this.entity.getMeshID();
    }
    getTextureID() {
        if (!this.hasEntity()) {
            return "missingTexture";
        }
        return this.entity.getTextureID();
    }
    getMaterialID() {
        if (!this.hasEntity()) {
            return "missingMaterial";
        }
        return this.entity.getMaterialID();
    }
    getWeight() {
        if (!this.hasEntity()) {
            return 0;
        }
        return this.entity.getWeight();
    }
    getPrice() {
        if (!this.hasEntity()) {
            return 0;
        }
        return this.entity.getPrice();
    }

    _createOwnSpecialProperties() {
        if (!this.hasEntity()) {
            return this;
        }
        if (this.entity.getSpecialProperties() instanceof Set) {
            this.specialProperties = new Set(this.entity.getSpecialProperties());
        }
        else {
            this.specialProperties = new Set();
        }
        this._useOwnSpecialProperties = true;
    }
    addSpecialProperty(_specialProperty) {
        if (!this.hasEntity()) {
            return this;
        }
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
        if (!this.hasEntity()) {
            return this;
        }
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
        if (!this.hasEntity()) {
            return this.specialProperties;
        }
        if (this._useOwnSpecialProperties) {
            return this.specialProperties;
        }
        else {
            return this.entity.getSpecialProperties();
        }
    }
    hasSpecialProperty(_specialProperty) {
        if (!this.hasEntity()) {
            return false;
        }
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
        if (!this.hasEntity()) {
            return this;
        }
        for (var _action in this.entity.getAvailableActions()) {
            var _availableAction = this.entity.getAvailableAction(_action);
            if (_availableAction instanceof ActionData) {
                this.availableActions[_action] = this.entity.getAvailableAction(_action).clone();
            }
        }
        this._useOwnAvailableActions = true;
    }
    addAvailableAction(_action, _function = undefined, _runOnce = false) {
        if (!this.hasEntity()) {
            return this;
        }
        if (ActionEnum.hasOwnProperty(_action)) {}
        else if (ActionEnum.properties.hasOwnProperty(_action)) {
            _action = ActionEnum.properties[_action].value;
        }
        else {
            return this;
        }
        if (!this._useOwnAvailableActions) {
            this._createOwnAvailableActions();
        }
        this.availableActions[_action] = new ActionData(_action, _function, _runOnce);
        return this;
    }
    removeAvailableAction(_action) {
        if (!this.hasEntity()) {
            return this;
        }
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
        if (!this.hasEntity()) {
            return 0;
        }
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
        if (!this.hasEntity()) {
            return this.availableActions;
        }
        if (this._useOwnAvailableActions) {
            return this.availableActions;
        }
        else {
            return this.entity.getAvailableActions();
        }
    }
    hasAvailableAction(_action) {
        if (!this.hasEntity()) {
            return false;
        }
        if (this._useOwnAvailableActions) {
            return this.availableActions.hasOwnProperty(_action);
        }
        else {
            return this.entity.hasAvailableAction(_action);
        }
    }

    _createOwnHiddenAvailableActions() {
        if (!this.hasEntity()) {
            return this;
        }
        for (var _action in this.entity.getHiddenAvailableActions()) {
            var _availableAction = this.entity.getHiddenAvailableAction(_action);
            if (_availableAction instanceof ActionData) {
                this.hiddenAvailableActions[_action] = this.entity.getHiddenAvailableAction(_action).clone();
            }
        }
        this._useOwnHiddenAvailableActions = true;
    }
    /**
     * Adds a hidden available Action when interacting with this Entity
     * @param {String} _action (ActionEnum)
     */
    addHiddenAvailableAction(_action, _function = undefined, _runOnce = false) {
        if (!this.hasEntity()) {
            return this;
        }
        if (_action instanceof ActionData) {
            _action = _action.action;
        }
        if (!this._useOwnHiddenAvailableActions) {
            this._createOwnHiddenAvailableActions();
        }
        _action = this.getAvailableAction(_action);
        if (_action instanceof ActionData) {
            this.hiddenAvailableActions[_action.action] = _action;
        }
        return this;
    }
    /**
     * Removes a hidden available Action when interacting with this Entity
     * @param  {String} _action (ActionEnum)
     * @return {Booealn}          Whether or not the Action was removed
     */
    removeHiddenAvailableAction(_action) {
        if (!this.hasEntity()) {
            return this;
        }
        if (_action instanceof ActionData) {
            _action = _action.action;
        }
        if (!this._useOwnHiddenAvailableActions) {
            this._createOwnHiddenAvailableActions();
        }
        if (this.hasHiddenAvailableAction(_action)) {
            delete this.hiddenAvailableActions[_action];
        }
        return this;
    }
    getHiddenAvailableAction(_action) {
        if (!this.hasEntity()) {
            return 0;
        }
        if (_action instanceof ActionData) {
            _action = _action.action;
        }
        if (this._useOwnHiddenAvailableActions) {
            if (this.hiddenAvailableActions.hasOwnProperty(_action)) {
                return this.hiddenAvailableActions[_action];
            }
        }
        else {
            return this.entity.getHiddenAvailableAction(_action);
        }
        return 0;
    }
    getHiddenAvailableActions() {
        if (!this.hasEntity()) {
            return this.hiddenAvailableActions;
        }
        if (this._useOwnHiddenAvailableActions) {
            return this.hiddenAvailableActions;
        }
        else {
            return this.entity.getHiddenAvailableActions();
        }
    }
    hasHiddenAvailableAction(_action) {
        if (!this.hasEntity()) {
            return false;
        }
        if (_action instanceof ActionData) {
            _action = _action.action;
        }
        if (this._useOwnHiddenAvailableActions) {
            return this.hiddenAvailableActions.hasOwnProperty(_action);
        }
        else {
            return this.entity.hasHiddenAvailableAction(_action);
        }
    }

    setDefaultAction(_action) {
        if (!this.hasEntity()) {
            return this;
        }
        if (this.hasAvailableAction(_action)) {
            this._useOwnDefaultAction = true;
            this.defaultAction = _action;
        }
    }
    getDefaultAction() {
        if (!this.hasEntity()) {
            return this.defaultAction;
        }
        if (this._useOwnDefaultAction) {
            return this.defaultAction;
        }
        else {
            return this.entity.getDefaultAction();
        }
    }
    
    clone(_id) {
        if (!this.hasEntity()) {
            return this;
        }
        _instancedEntity = new InstancedEntity(_id, this.entity, this.name, this.description, this.icon);
        _instancedEntity.health = this.health.clone();
        _instancedEntity.specialProperties = new Set(this.specialProperties);
        return _instancedEntity;
    }
    dispose() {
        if (!this.hasEntity()) {
            return this;
        }
        for (var _action in this.availableActions) {
            if (this.availableActions[_action] instanceof ActionData) {
                this.availableActions[_action].dispose();
            }
        }
        Game.removeInstancedEntity(this.id);
        super.dispose();
        return undefined;
    }
}