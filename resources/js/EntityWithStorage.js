class EntityWithStorage extends Entity {
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined) {
        super(_id, _name, _description, _image);
        /**
         * Item(s) this Character has
         * @type {Array} <ItemInstance>
         */
        this.items = new Array();
    }
    /**
     * Adds _itemInstance; creates an ItemInstance if an Item is passed
     * @param  {Entity} _entity       _entity to take the _itemInstance from
     * @param  {ItemInstance} _itemInstance ItemInstance, or Item, to be added
     * @return {Boolean}               Whether or not _itemInstance was added
     */
    addItem(_itemInstance, _entity = undefined) {
        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else if (_itemInstance instanceof Item)
                _itemInstance = new ItemInstance(undefined, _itemInstance);
            else if (PSDE.items.has(_itemInstance))
                _itemInstance = new ItemInstance(undefined, PSDE.items.get(_itemInstance));
            else
                return undefined;
        }
        if (!(_entity instanceof Entity)) {
            if (PSDE.entities.has(_entity))
                _entity = PSDE.entities.get(_entity);
            else if (_entity instanceof InstancedEntity)
                _entity = _entity.parent;
            else if (PSDE.instances.has(_entity))
                _entity = PSDE.instances.get(_entity).parent;
            else
                _entity = undefined;
        }

        if (this.triggerActionEvent("take", _itemInstance.parent, _entity)) {
            if (!this.containsItem(_itemInstance.id))
                this.items.push(_itemInstance);

            if (this instanceof Character && _itemInstance instanceof PhoneInstance && _itemInstance.owner == this)
                this.phone = _itemInstance;
        }

        return this;
    }
    /**
     * Alias for addItem
     * @param  {Entity} _entity       _entity to take the _itemInstance from
     * @param  {ItemInstance} _itemInstance ItemInstance, or Item, to be added
     * @return {Boolean}               Whether or not _itemInstance was added
     */
    take(_entity, _itemInstance) {
        return this.addItem(_itemInstance, _entity).containsItem(_itemInstance);
    }
    /**
     * Removes an ItemInstance from this Character
     * @param  {ItemInstance} _itemInstance ItemInstance, or Item, to be removed
     * @return {Boolean}               Whether or not _itemInstance was removed
     */
    removeItem(_itemInstance) {
        if (!(_itemInstance instanceof ItemInstance)) {
            _itemInstance = this.getItem(_itemInstance);
            if (typeof _itemInstance == "undefined") return undefined;
        }
        if (!this.hasItem(_itemInstance))
            return false;
        if (this instanceof Character) {
            if (this.isWearing(_itemInstance)) {
                this.disrobe(_itemInstance);
                if (this.isWearing(_itemInstance))
                    return false;
            }
            if (this.hasHeldEntity(_itemInstance)) {
                this.removeHeldEntity(_itemInstance);
                if (this.hasHeldEntity(_itemInstance))
                    return false
            }
        }
        if (this.triggerActionEvent("remove", _itemInstance.parent)) {
            this.items.splice(this.items.indexOf(_itemInstance), 1);
            return true;
        }
        else
            return false;
    }
    /**
     * Alias for removeItem
     * @param  {ItemInstance} _itemInstance ItemInstance, or Item, to be removed
     * @return {Boolean}               Whether or not _itemInstance was removed
     */
    remove(_itemInstance) {
        return !(this.removeItem(_itemInstance, _entity).containsItem(_itemInstance));
    }
    /**
     * Returns the ItemInstance of a passed Item or ItemInstance if this Character has it
     * @param  {ItemInstance} _itemInstance The Item or ItemInstance to search for
     * @return {ItemInstance}               The ItemInstance that is found, or undefined if it isn't
     */
    getItem(_itemInstance) {
        var _foundItem = false;

        if (!(_itemInstance instanceof ItemInstance)) {
            if (PSDE.itemInstances.has(_itemInstance))
                _itemInstance = PSDE.itemInstances.get(_itemInstance);
            else if (_itemInstance instanceof Item) {
                this.items.some(function(__itemInstance) {
                    if (__itemInstance.parent == _itemInstance) {
                        _itemInstance = __itemInstance;
                        _foundItem = true;
                        return true;
                    }
                }, this);
                /**
                 * We've already gone through this.items and found what we were looking for, or not;
                 * no need to continue through the rest of this method.
                 */
                if (_foundItem)
                    return _itemInstance;
                else
                    return false;
            }
            else if (PSDE.items.has(_itemInstance)) {
                _itemInstance = PSDE.items.get(_itemInstance);
                this.items.some(function(__itemInstance) {
                    if (__itemInstance.parent == _itemInstance) {
                        _itemInstance = __itemInstance;
                        _foundItem = true;
                        return true;
                    }
                }, this);
                if (_foundItem)
                    return _itemInstance;
                else
                    return false;
            }
            else
                return undefined;
        }

        this.items.some(function(__itemInstance) {
            if (__itemInstance.id == _itemInstance.id)
                _foundItem = true;
        });

        if (_foundItem)
            return _itemInstance;
        else
            return false;
    }

    containsItem(_itemInstance) {
        return this.getItem(_itemInstance) instanceof ItemInstance;
    }
    hasItem(_itemInstance) {
        return this.getItem(_itemInstance) instanceof ItemInstance;
    }
    getItems() {
        return this.items;
    }
    getNumberOfItems() {
        return this.items.length;
    }
    /**
     * Moves _itemInstance to _entity, triggering disrobe, release, remove, and take events in the process.
     * @param  {Entity} _entity       [description]
     * @param  {ItemInstance} _itemInstance [description]
     * @return {Boolean}               [description]
     */
    give(_entity, _itemInstance) {
        if (!(_entity instanceof Entity)) {
            if (PSDE.entities.has(_entity))
                _entity = PSDE.entities.get(_entity);
            else if (_entity instanceof InstancedEntity)
                _entity = _entity.parent;
            else if (PSDE.instances.has(_entity))
                _entity = PSDE.instances.get(_entity).parent;
            else
                return undefined;
        }
        if (!(_itemInstance instanceof ItemInstance)) {
            _itemInstance = _entity.getItem(_itemInstance);
            if (_itemInstance == undefined) return undefined;
        }
        if (PSDE.enableDebug) console.log("Executing give({0}, {1}) as {2}".format(_entity.id, _itemInstance.parent.id, this.id));
        if (!this.hasItem(_itemInstance))
            return false;
        if (!this.removeItem(_itemInstance))
            return false;
        if (_entity instanceof Character && this.triggerActionEvent("give", _itemInstance.parent, _entity))
            return _entity.take(_entity, _itemInstance);
        else if (this.triggerActionEvent("put", _itemInstance.parent, _entity))
            return _entity.take(_entity, _itemInstance);
        else
            return false;
    }
    dispose() {
        if (this == Game.player.entity) {
            return false;
        }
        super.dispose();
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}
