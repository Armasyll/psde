class InstancedEntity extends AbstractEntity {
    /**
     * Creates an InstancedEntity
     * @param  {string} id           Unique ID
     * @param  {string} name         Name
     * @param  {string} description  Description
     * @param  {string} iconID       Icon ID
     */
    constructor(id, entity, name = undefined, description = undefined, iconID = undefined) {
        super(id, name, description);
        if (!(entity instanceof Entity)) {
            entity = Game.getEntity(entity);
            if (!(entity instanceof Entity)) {
                return undefined;
            }
        }
        this.entity = entity;
        this.setName(name || this.entity.getName());
        this.setDescription(description || this.entity.getDescription());
        this.setIcon(iconID || this.entity.getIcon());
        this.entityType = this.entity.entityType;
        this.weightOffset = 0;
        this.priceOffset = 0;
        this._useOwnAvailableActions = false;
        this._useOwnDefaultAction = false;
        this._useOwnHiddenAvailableActions = false;
        this._useOwnSpecialProperties = false;
        this._useOwnTraits = false;

        Game.setEntityInstance(this.id, this);
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
        return this.entity.getWeight() + this.weightOffset;
    }
    getPrice() {
        if (!this.hasEntity()) {
            return 0;
        }
        return this.entity.getPrice() + this.priceOffset;
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
        this.availableActions = [];
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
        this.hiddenAvailableActions = [];
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

    setDefaultAction(action) {
        if (!this.hasEntity()) {
            return this;
        }
        if (this.hasAvailableAction(action)) {
            this._useOwnDefaultAction = true;
            this.defaultAction = action;
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

    addTrait(...blob) {
        if (!this._useOwnTraits) {
            this.traits = entity.cloneTraits();
            this._useOwnTraits = true;
        }
        return super.addTrait(...blob);
    }
    removeTrait(...blob) {
        if (!this._useOwnTraits) {
            this.traits = entity.cloneTraits();
            this._useOwnTraits = true;
        }
        return super.removeTrait(...blob);
    }
    getTraits() {
        if (this._useOwnTraits) {
            return this.traits;
        }
        else {
            return this.entity.getTraits();
        }
    }
    
    clone(id = "") {
        if (!this.hasEntity()) {
            return this;
        }
        let instancedEntity = new InstancedEntity(id, this.entity, this.name, this.description, this.iconID);
        // variables from AbstractEntity
        if (this._useOwnAvailableActions) {
            instancedEntity.availableActions = Object.assign({}, this.availableActions);
        }
        if (this._useOwnHiddenAvailableActions) {
            instancedEntity.hiddenAvailableActions = Object.assign({}, this.hiddenAvailableActions);
        }
        if (this._useOwnSpecialProperties) {
            instancedEntity.specialProperties = new Set(this.specialProperties);
        }
        if (this._useOwnDefaultAction) {
            instancedEntity.defaultAction = this.defaultAction;
        }
        if (this._useOwnTraits) {
            instancedEntity.traits = this.cloneTraits();
        }
        instancedEntity.health = this.health;
        instancedEntity.healthOffset = this.healthOffset;
        instancedEntity.healthMax = this.healthMax;
        instancedEntity.healthMaxOffset = this.healthMaxOffset;
        return instancedEntity;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        if (this.hasController) {
            this.controller.dispose();
        }
        Game.removeEntityInstance(this.id);
        if (this._useOwnAvailableActions) {
            for (let action in this.availableActions) {
                if (this.availableActions[action] instanceof ActionData) {
                    this.availableActions[action].dispose();
                }
                delete this.availableActions[action];
            }
            delete this.availableActions;
        }
        if (this._useOwnHiddenAvailableActions) {
            for (let action in this.hiddenAvailableActions) {
                if (this.hiddenAvailableActions[action] instanceof ActionData) {
                    this.hiddenAvailableActions[action].dispose();
                }
                delete this.hiddenAvailableActions[action];
            }
            delete this.hiddenAvailableActions;
        }
        if (this._useOwnSpecialProperties) {
            delete this.specialProperties.clear();
        }
        super.dispose();
        return undefined;
    }
}