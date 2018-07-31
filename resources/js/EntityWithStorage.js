class EntityWithStorage extends Entity {
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined) {
        super(_id, _name, _description, _image);
        /**
         * Item(s) this Character has
         * @type {Array} <InstancedItem>
         */
        this.inventory = new Array();
    }
    /**
     * Adds _instancedItem; creates an InstancedItem if an Item is passed
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
     * Removes an InstancedItem from this Character
     * @param  {InstancedItem} _instancedItem InstancedItem, or Item, to be removed
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
        this.inventory.remove(_instancedItem);
        return this;
    }
    /**
     * Returns the InstancedItem of a passed Item or InstancedItem if this Character has it
     * @param  {InstancedItem} _instancedItem The Item or InstancedItem to search for
     * @return {InstancedItem}               The InstancedItem that is found, or undefined if it isn't
     */
    getItem(_instancedItem) {
        var _foundItem = false;

        _instancedItem = Game.getInstancedItemEntity(_instancedItem);
        if (_instancedItem == undefined) {return null;}

        this.inventory.some(function(__instancedItem) {
            if (__instancedItem.id == _instancedItem.id)
                _foundItem = true;
        });

        if (_foundItem)
            return _instancedItem;
        else
            return null;
    }

    hasItem(_instancedItem) {
        return this.getItem(_instancedItem) instanceof InstancedItem;
    }
    getItems() {
        return this.inventory;
    }
    getNumberOfItems() {
        return this.inventory.length;
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
