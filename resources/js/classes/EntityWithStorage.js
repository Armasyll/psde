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
     * Adds the InstancedItemEntity to this entity's Item array
     * @param  {InstancedItemEntity} _abstractEntity       InstancedItemEntity, or ItemEntity, to be added
     * @return {this}
     */
    addItem(_abstractEntity) {
        if (_abstractEntity instanceof InstancedItemEntity) {
            this.items.push(_abstractEntity);
            return this;
        }
        let _instancedItem = Game.getInstancedItemEntity(_abstractEntity);
        if (_instancedItem instanceof InstancedItemEntity) {
            this.items.push(_instancedItem);
            return this;
        }
        _instancedItem = Game.getItemEntity(_abstractEntity);
        if (_instancedItem instanceof ItemEntity) {
            this.items.push(_instancedItem.createInstance());
            return this;
        }
        if (Game.debugEnabled) console.log(`Failed to add item ${_abstractEntity} to ${this.id}`);
        return this;
    }
    /**
     * Removes an InstancedItemEntity from this entity's Item array
     * @param  {InstancedItemEntity} _abstractEntity InstancedItemEntity, or ItemEntity, to be removed
     * @return {this}
     */
    removeItem(_abstractEntity) {
        if (_abstractEntity instanceof InstancedItemEntity) {
            this.items.remove(_abstractEntity);
            return this;
        }
        let _instancedItem = Game.getInstancedItemEntity(_abstractEntity);
        if (_instancedItem instanceof InstancedItemEntity) {
            return this.removeItem(_instancedItem);
        }
        _instancedItem = Game.getItemEntity(_abstractEntity);
        if (_instancedItem instanceof ItemEntity) {
            return this.removeItem(_instancedItem.createInstance());
        }
        if (Game.debugEnabled) console.log(`Failed to remove item ${_abstractEntity} to ${this.id}`);
        return this;
    }
    /**
     * Returns the InstancedItemEntity of a passed ItemInstance or InstancedItemEntity if this entity has it in their Item array
     * @param  {InstancedItemEntity} _abstractEntity The ItemInstance or InstancedItemEntity to search for
     * @return {InstancedItemEntity}               The InstancedItemEntity that is found, or null if it isn't
     */
    getItem(_abstractEntity) {
        if (_abstractEntity instanceof InstancedItemEntity) {
            for (let _i = 0; _i < this.items.length; _i++) {
                if (this.items[_i] == _abstractEntity) {
                    return this.items[_i];
                }
            }
            return null;
        }
        /*
        If the abstract entity wasn't an InstancedItemEntity,
        but was instead a string of the ID of an InstancedItemEntity,
        find that InstancedItemEntity and re-run
        */
        let _instancedItem = Game.getInstancedItemEntity(_abstractEntity);
        if (_instancedItem instanceof InstancedItemEntity) {
            return this.getItem(_instancedItem);
        }
        /*
        If the abstract entity was neither and InstancedItemEntity nor its ID,
        check if it was an ItemEntity, and check the .items for an
        instanced entity whose entity equals that of _abstractEntity
        */
        _instancedItem = Game.getItemEntity(_abstractEntity);
        if (_instancedItem instanceof ItemEntity) {
            for (let _i = 0; _i < this.items.length; _i++) {
                if (this.items[_i].getEntity().getID() === _instancedItem.getID()) {
                    return this.items[_i];
                }
            }
        }
        return null;
    }

    hasItem(_abstractEntity) {
        return this.getItem(_abstractEntity) instanceof InstancedItemEntity;
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
        for (let _i = this.items.length; _i > 0; _i--) {
            this.items[_i].dispose();
        }
        delete this.items;
        super.dispose();
        return undefined;
    }
}
