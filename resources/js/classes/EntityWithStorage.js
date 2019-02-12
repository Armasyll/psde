class EntityWithStorage extends Entity {
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined) {
        super(_id, _name, _description, _image);
        /**
         * Item(s) this Character has
         * @type {Array} <InstancedItemEntity>
         */
        this.items = new Array();
    }
    /**
     * Adds _instancedItem; creates an InstancedItemEntity if an Item is passed
     * @param  {Entity} _entity       _entity to take the _instancedItem from
     * @return {this}
     */
    addItem(_instancedItem) {
        var __instancedItem = Game.getInstancedItemEntity(_instancedItem);
        if (__instancedItem instanceof InstancedItemEntity && __instancedItem.getEntity() instanceof ItemEntity) {
            this.items.push(__instancedItem);
        }
        else {
            this.addProtoItem(_instancedItem);
        }
        return this;
    }
    addProtoItem(_protoItem) {
        _protoItem = Game.getProtoItemEntity(_protoItem);
        if (_protoItem instanceof ItemEntity) {
            var _instancedItem = new InstancedItemEntity(undefined, _protoItem);
            this.items.push(_instancedItem);
            return _instancedItem;
        }
        return null;
    }
    /**
     * Removes an InstancedItemEntity from this Character
     * @param  {_instancedItem} _instancedItem InstancedItemEntity, or Item, to be removed
     * @return {this}
     */
    removeItem(_instancedItem) {
        var _tempItem = Game.getProtoItemEntity(_instancedItem);
        if (_tempItem instanceof ItemEntity) {
            _tempItem = this.getItem(_instancedItem);
        }
        if (!(_tempItem instanceof InstancedItemEntity)) {
            _tempItem = Game.getInstancedItemEntity(_instancedItem);
            if (_tempItem instanceof InstancedItemEntity) {
                return this;
            }
        }
        if (this instanceof CharacterEntity) {
            if (this.hasEquippedEntity(_tempItem)) {
                this.unequipEntity(_tempItem);
                if (this.hasEquippedEntity(_tempItem)) {
                    return this;
                }
            }
        }
        this.items.remove(_tempItem);
        return this;
    }
    /**
     * Returns the InstancedItemEntity of a passed ItemInstance or InstancedItemEntity if this Character has it
     * @param  {InstancedItemEntity} _item The ItemInstance or InstancedItemEntity to search for
     * @return {InstancedItemEntity}               The InstancedItemEntity that is found, or null if it isn't
     */
    getItem(_item) {
        var _foundItem = false;
        var _tempItem = Game.getInstancedItemEntity(_item);
        if (_tempItem == undefined) {
            _item = Game.getProtoItemEntity(_item);
            if (_item == undefined) {return null;}
            this.items.some(function(__instancedItem) {
                if (__instancedItem.getEntity().getID() == _item.getID()) {
                    _item = __instancedItem;
                    _foundItem = true;
                    return true;
                }
            }, this);
        }
        else {
            _item = _tempItem;
            this.items.some(function(__instancedItem) {
                if (__instancedItem.id == _item.id) {
                    _foundItem = true;
                    return true;
                }
            }, this);
        }

        if (_foundItem)
            return _item;
        else
            return null;
    }

    hasItem(_item) {
        return this.getItem(_item) != null;
    }
    getItems() {
        return this.items;
    }
    getNumberOfItems() {
        return this.items.length;
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
