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
        if (_instancedItem == undefined) {return;}
        this.items.push(_instancedItem);
        return this;
    }
    /**
     * Removes an InstancedItemEntity from this Character
     * @param  {InstancedItemEntity} _instancedItem InstancedItemEntity, or Item, to be removed
     * @return {this}
     */
    removeItem(_instancedItem) {
        _instancedItem = Game.getInstancedItemEntity(_instancedItem);
        if (_instancedItem == undefined) {return;}
        if (!this.hasItem(_instancedItem)) {
            return this;
        }
        if (this instanceof Character) {
            if (this.isWearing(_instancedItem)) {
                this.disrobe(_instancedItem);
                if (this.isWearing(_instancedItem)) {
                    return this;
                }
            }
            if (this.hasHeldEntity(_instancedItem)) {
                this.removeHeldEntity(_instancedItem);
                if (this.hasHeldEntity(_instancedItem)) {
                    return this;
                }
            }
        }
        this.items.remove(_instancedItem);
        return this;
    }
    /**
     * Returns the InstancedItemEntity of a passed Item or InstancedItemEntity if this Character has it
     * @param  {InstancedItemEntity} _instancedItem The Item or InstancedItemEntity to search for
     * @return {InstancedItemEntity}               The InstancedItemEntity that is found, or undefined if it isn't
     */
    getItem(_instancedItem) {
        var _foundItem = false;

        _instancedItem = Game.getInstancedItemEntity(_instancedItem);
        if (_instancedItem == undefined) {return null;}

        this.items.some(function(__instancedItem) {
            if (__instancedItem.id == _instancedItem.id) {
                _foundItem = true;
                return true;
            }
        }, this);

        if (_foundItem)
            return _instancedItem;
        else
            return null;
    }

    hasItem(_item) {
        var _foundItem = false;
        _item = Game.getProtoItemEntity(_item);
        if (!(_item instanceof ItemEntity)) {
            return false;
        }
        this.items.some(function(__instancedItem) {
            if (__instancedItem.getEntity() == _item) {
                _foundItem = true;
                return true;
            }
        }, this);
        return _foundItem;
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
