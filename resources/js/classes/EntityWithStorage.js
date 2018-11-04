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
        _instancedItem = Game.getInstancedItemEntity(_instancedItem);
        if (_instancedItem == undefined) {return this;}
        this.items.push(_instancedItem);
        return this;
    }
    /**
     * Removes an InstancedItemEntity from this Character
     * @param  {InstancedItemEntity} _instancedItemEntity InstancedItemEntity, or Item, to be removed
     * @return {this}
     */
    removeItem(_instancedItemEntity) {
        _instancedItemEntity = Game.getInstancedItemEntity(_instancedItemEntity);
        if (_instancedItemEntity == undefined) {return this;}
        if (!this.hasItem(_instancedItemEntity)) {
            return this;
        }
        if (this instanceof CharacterEntity) {
            if (this.isWearing(_instancedItemEntity)) {
                this.disrobe(_instancedItemEntity);
                if (this.isWearing(_instancedItemEntity)) {
                    return this;
                }
            }
            if (this.hasEquippedEntity(_instancedItemEntity)) {
                this.unequipEntity(_instancedItemEntity);
                if (this.hasEquippedEntity(_instancedItemEntity)) {
                    return this;
                }
            }
        }
        this.items.remove(_instancedItemEntity);
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
        delete Game.characterEntities[this.id];
        super.dispose();
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}
