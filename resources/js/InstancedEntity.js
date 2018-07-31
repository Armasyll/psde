class InstancedEntity {
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
    constructor(_id, _entity, _name = undefined, _description = undefined, _owner = undefined, _price = undefined, _mass = undefined, _durability = undefined, _durabilityMax = undefined) {
        if (typeof _id != "string") {_id = genUUIDv4();}
        _id = Game.filterID(_id);
        this.id = _id;
        this.entity = undefined;
        this.setEntity(_entity);
        this.name = undefined;
        this.setName(_name || _entity.getName());
        this.description = undefined;
        this.setDescription(_description || _entity.description);
        this.owner = undefined;
        this.setOwner(_owner);
        this.price = 0;
        this.setPrice(_price || _entity.getPrice() || 0);
        this.mass = 0.001;
        this.setMass(_mass || _entity.getMass() || 0.001);
        this.durability = 1;
        this.setDurability(_durability || _entity.getDurability() || 1);
        this.durabilityMax = 1;
        this.setDurabilityMax(_durabilityMax || this.durability);

        /**
         * Actions available to this Entity
         * @type {Set} <Game.kActionTypes>
         */
        this.availableActions = new Set(_entity.getAvailableActions());
        /**
         * Game.kSpecialProperties
         * @type {Set} <Game.kSpecialProperties>
         */
        this.specialProperties = new Set(_entity.getSpecialProperties());

        this.controller = undefined;

        Game.instancedEntities[this.id] = this;
    }

    /**
     * Sets Entity
     * @param {Entity} _entity Entity, or undefined
     */
    setEntity(_entity) {
        this.entity = Game.getEntity(_entity);
        return this;
    }
    getEntity() {
        return this.entity;
    }

    setName(_name) {
        this.name = Game.filterName(_name);
        return this;
    }
    getName() {
        return (this.name || this.entity.getName());
    }
    setDescription(_description) {
        this.description = _description;
        return this;
    }
    getDescription() {
        return (this.description || this.entity.getDescription());
    }
    /**
     * Adds an available Action when interacting with this Entity
     * @param {String} _actions (Game.kActionTypes)
     */
    addAvailableAction(_actions) {
        if (Game.kActionTypes.has(_actions))
            this.availableActions.add(_actions);
        else if (_actions instanceof Array) {
            _actions.forEach(function(_action) {
                Game.kActionTypes.has(_action) && this.availableActions.add(_action);
            }, this);
        }
        return this;
    }
    /**
     * Removes an available Action when interacting with this Entity
     * @param  {String} _actions (Game.kActionTypes)
     * @return {Booealn}          Whether or not the Action was removed
     */
    removeAvailableAction(_actions) {
        if (Game.kActionTypes.has(_actions))
            this.availableActions.delete(_actions);
        else if (_actions instanceof Array) {
            _actions.forEach(function(_action) {
                Game.kActionTypes.has(_action) && this.availableActions.delete(_action);
            }, this);
        }
        return this;
    }
    getAvailableActions() {
        return this.currentActions;
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
        this.durability = _int;
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

    /**
     * Sets Durability
     * @param {Number} _int Integer
     */
    setDurability(_int) {
        _int = Number.parseInt(_int);
        if (isNaN(_int))
            _int = 1;
        else if (_int < 0)
            _int = 1;
        else if (_int > this.durabilityMax)
            _int = this.durabilityMax;
        this.durability = _int;
        return this;
    }
    /**
     * Returns Durability
     * @return {Number} Integer
     */
    getDurability() {
        return this.durability;
    }

    /**
     * Sets Max Durability
     * @param {Number} _int Integer
     */
    setDurabilityMax(_int) {
        _int = Number.parseInt(_int);
        if (isNaN(_int))
            _int = 1;
        else if (_int < 0)
            _int = 1;
        else if (_int > Number.MAX_SAFE_INTEGER)
            _int = Number.MAX_SAFE_INTEGER;
        this.durabilityMax = _int;
        return this;
    }
    /**
     * Returns Max Durability
     * @return {Number} Integer
     */
    getDurabilityMax() {
        return this.durabilityMax;
    }
    setController(_controller) {
        if (!(_controller instanceof ItemController)) {
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
    removeController() {
        this.controller = undefined;
        return this;
    }
    getAvatar() {
        return this.entity.getAvatar();
    }
    getAvatarID() {
        return this.entity.getAvatarID();
    }
    getImage() {
        return this.entity.getImage();
    }
    clone(_id) {
        return new InstancedEntity(_id, this.entity, this.name, this.description, this.owner, this.price, this.mass, this.durability, this.durabilityMax);
    }
    dispose() {
        delete Game.instances[this.id];
        return undefined;
    }
}