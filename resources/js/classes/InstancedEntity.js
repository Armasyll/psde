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
    constructor(_id, _entity, _name = undefined, _description = undefined, _owner = undefined, _price = undefined, _mass = undefined, _durability = undefined, _durabilityMax = undefined) {
        super(_id, _name, _description);
        this.entity = undefined;
        this.setEntity(_entity);
        if (!(this.entity instanceof Entity)) {
            return undefined;
        }
        this.setName(_name || this.entity.getName());
        this.setDescription(_description || this.entity.description);
        this.setOwner(_owner);
        this.setPrice(_price || this.entity.getPrice() || 0);
        this.setMass(_mass || this.entity.getMass() || 0.001);
        this.setDurability(_durability || this.entity.getDurability() || 1);
        this.setDurabilityMax(_durabilityMax || this.entity.getDurabilityMax() || this.durability);

        for (var _action in this.entity.getAvailableActions()) {
            var _availableAction = this.entity.getAvailableAction(_action);
            if (_availableAction instanceof ActionData) {
                this.availableActions[_action] = this.entity.getAvailableAction(_action).clone();
            }
        }
        /**
         * Game.kSpecialProperties
         * @type {Set} <Game.kSpecialProperties>
         */
        this.specialProperties = new Set(this.entity.getSpecialProperties());

        Game.setInstancedEntity(this.id, this);
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
    removeEntity() {
        this.entity = null;
        return this;
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
    getImage() {
        return this.entity.getImage();
    }

    clone(_id) {
        return new InstancedEntity(_id, this.entity, this.name, this.description, this.owner, this.price, this.mass, this.durability, this.durabilityMax);
    }
    dispose() {
        Game.removeInstancedEntity(this.id);
        this.removeEntity();
        super.dispose();
        return undefined;
    }
}