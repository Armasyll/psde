/**
 * Class that reprents all EntityInstances
 */
class EntityInstance {
    /**
     * Creates an EntityInstance
     * @param  {UUIDv4} _id            UUID
     * @param  {Entity} _entity         Entity, String ID of Entity, EntityInstance, or String ID of EntityInstance
     * @param  {Character} _owner      Owner
     * @param  {Number} _price         Price, defaults to 0
     * @param  {Number} _mass        Weight, defaults to 0.001
     * @param  {Number} _durability    Durability, defaults to 1
     * @param  {Number} _durabilityMax Max durability, defaults to 1
     */
    constructor(_id, _entity, _owner = undefined, _price = 0, _mass = 1.0, _durability = 1, _durabilityMax = 1) {
        if (_id == undefined)
            _id = uuidv4();
        else if (typeof _id == "string" || typeof _id == "number") {
            _id = _id.replace(/[^0-9a-z\-]/gi, '');
            if (_id.length == 0)
                _id = uuidv4();
        }

        this.id = _id;

        this.name = undefined;
        this.description = undefined;
        this.image = undefined;
        this.child = undefined;
        this.entity = undefined;
        this.owner = undefined;
        this.price = 0;
        this.mass = 1.0;
        this.durability = 1;
        this.durabilityMax = 1;

        this.setOwner(_owner);
        this.setEntity(_entity);
        this.setPrice(_price || _entity.price);
        this.setWeight(_mass || _entity.mass);
        this.setDurability(_durability || 1);
        this.setDurabilityMax(_durabilityMax || this.durability);

        Game.entityInstances[this.id] = this;
    }

    /**
     * Sets Child
     * @param {Entity} _entity Entity, or undefined
     */
    setChild(_entity) {
        if (!(_entity instanceof Entity)){
            if (Game.hasEntity(_entity))
                _entity = Game.getEntity(_entity);
            else
                _entity = undefined;
        }
        this.child = _entity;
        return this;
    }
    getChild() {
        return this.child;
    }

    /**
     * Sets Entity
     * @param {Entity} _entity Entity, or undefined
     */
    setEntity(_entity) {
        if (!(_entity instanceof Entity)){
            if (Game.hasEntity(_entity))
                _entity = Game.getEntity(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity.entity;
            else if (Game.hasInstance(_entity))
                _entity = Game.getInstance(_entity).entity;
            else
                _entity = undefined;
        }
        this.entity = _entity;
        return this;
    }
    getEntity() {
        return this.entity;
    }

    /**
     * Sets Owner
     * @param {Character} _character Character, or undefined
     */
    setOwner(_character) {
        if (!(_character instanceof Character)){
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                _character = undefined;
        }
        this.owner = _character;
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
     * Sets Weight
     * @param {Number} _float Float
     */
    setWeight(_float) {
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
    getWeight() {
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
    incDurability(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setDurability(this.durability + Number.parseInt(_int));
    }
    addDurability(_int) {
        return this.incDurability(_int);
    }
    decDurability(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setDurability(this.durability - Number.parseInt(_int));
    }
    subDurability(_int) {
        return this.decDurability(_int);
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
    incDurabilityMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setDurabilityMax(this.durabilityMax + Number.parseInt(_int));
    }
    addDurabilityMax(_int) {
        return this.incDurabilityMax(_int);
    }
    decDurabilityMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setDurabilityMax(this.durabilityMax - Number.parseInt(_int));
    }
    subDurabilityMax(_int) {
        return this.decDurabilityMax(_int);
    }
    /**
     * Returns Max Durability
     * @return {Number} Integer
     */
    getDurabilityMax() {
        return this.durabilityMax;
    }

    setName(_name) {
        this.name = _name.replace(/[^0-9a-z\-]/gi, '');
    }
    getName() {
        return (this.name || this.entity.getName());
    }
    setDescription(_description) {
        this.description = _description.replace(/[^0-9a-z\-\!\?\,\.\"\'\<\>\/\_]/gi, '');
    }
    getDescription() {
        return (this.description || this.entity.getDescription());
    }

    dispose() {
        delete Game.instances[this.id];
        return undefined;
    }
}