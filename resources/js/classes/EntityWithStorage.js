class EntityWithStorage extends Entity {
    constructor(_id = undefined, _name = undefined, _description = undefined, _icon = undefined) {
        super(_id, _name, _description, _icon);
        /*
        Map of integers, related to item slots, and InstancedItemEntities
         */
        this.items = new Map();
        this.storageWeight = new BoundedNumber(0, 0, 10);
        this.maxStorageSlots = 9;
    }
    setMaxStorageWeight(_int) {
        this.storageWeight.setMax(_int);
        return this;
    }
    getMaxStorageWeight() {
        return this.storageWeight.getMax();
    }
    setMaxStorageSlots(_int) {
        this.maxStorageSlots = Tools.filterInt(_int);
        return this;
    }
    getMaxStorageSlots() {
        return this.maxStorageSlots;
    }
    getAvailableSlots() {
        return this.maxStorageSlots - this.items.size;
    }
    calculateUsedStorageWeight() {
        let _weight = 0;
        this.items.forEach(function(_item) {
            _weight += _item.getWeight();
        }, this);
        this.storageWeight.setValue(_weight);
        return _weight;
    }
    getUsedStorageWeight() {
        return this.storageWeight.getValue();
    }
    getUsedStorageSlots() {
        return this.items.size;
    }
    getAvailableSlot() {
        for (let _i = 0; _i < this.maxStorageSlots; _i++) {
            if (this.items.get(_i) == undefined) {
                return _i;
            }
        }
        return -1;
    }
    /**
     * Adds the InstancedItemEntity to this entity's Item array
     * @param  {InstancedItemEntity} _abstractEntity       InstancedItemEntity, or ItemEntity, to be added
     * @return {this}
     */
    addItem(_abstractEntity) {
        let _slot = this.getAvailableSlot();
        if (_slot == -1) {
            return 2;
        }
        if (_abstractEntity instanceof InstancedItemEntity) {
            this.items.set(_slot, _abstractEntity);
            this.storageWeight.inc(_abstractEntity.getWeight());
            return 0;
        }
        let _instancedItem = Game.getInstancedItemEntity(_abstractEntity);
        if (_instancedItem instanceof InstancedItemEntity) {
            return this.addItem(_instancedItem);
        }
        _instancedItem = Game.getItemEntity(_abstractEntity);
        if (_instancedItem instanceof ItemEntity) {
            return this.addItem(_instancedItem.createInstance());
        }
        if (Game.debugMode) console.log(`Failed to add item ${_abstractEntity} to ${this.id}`);
        return 1;
    }
    /**
     * Removes an InstancedItemEntity from this entity's Item array
     * @param  {InstancedItemEntity} _abstractEntity InstancedItemEntity, or ItemEntity, to be removed
     * @return {this}
     */
    removeItem(_abstractEntity) {
        if (_abstractEntity == undefined) {
            return 1;
        }
        /*
        If the parameter is a number, and is a key in this.storage
         */
        if (typeof _abstractEntity == "number" && _abstractEntity >= 0 && this.items.has(_abstractEntity)) {
            let _slot = _abstractEntity;
            _abstractEntity = this.items.get(_abstractEntity);
            if (_abstractEntity instanceof InstancedItemEntity) {
                this.storageWeight.dec(_abstractEntity.getWeight());
                this.items.delete(_slot);
                return 0;
            }
            return 2;
        }
        /*
        else if the parameter is an InstancedItemEntity
         */
        if (_abstractEntity instanceof InstancedEntity) {
            for (let _i of this.items.keys()) {
                if (this.items.get(_i) == _abstractEntity) {
                    this.storageWeight.dec(_abstractEntity.getWeight());
                    this.items.delete(_i);
                    return 0;
                }
            }
            return 1;
        }
        /*
        else, we have to go hunting
         */
        let _instancedItem = Game.getInstancedItemEntity(_abstractEntity);
        if (_instancedItem instanceof InstancedItemEntity) {
            return this.removeItem(_instancedItem);
        }
        _instancedItem = Game.getItemEntity(_abstractEntity);
        if (_instancedItem instanceof ItemEntity) {
            return this.removeItem(_instancedItem);
        }
        if (Game.debugMode) console.log(`Failed to remove item ${_abstractEntity} to ${this.id}`);
        return 1;
    }
    getSlot(_abstractEntity) {
        if (_abstractEntity instanceof InstancedItemEntity) {
            for (let _i of this.items.keys()) {
                if (this.items.get(_i) == _abstractEntity) {
                    return _i;
                }
            }
            return -1;
        }
        let _instancedItem = Game.getInstancedItemEntity(_abstractEntity);
        if (_instancedItem instanceof InstancedItemEntity) {
            return this.getSlot(_instancedItem);
        }
        _instancedItem = Game.getItemEntity(_abstractEntity);
        if (_instancedItem instanceof ItemEntity) {
            for (let _i of this.items.keys()) {
                if (this.items.get(_i).getEntity().getID() == _abstractEntity.getID()) {
                    return _i;
                }
            }
        }
        return -1;
    }
    /**
     * Returns the InstancedItemEntity of a passed ItemInstance or InstancedItemEntity if this entity has it in their Item array
     * @param  {InstancedItemEntity} _abstractEntity The ItemInstance or InstancedItemEntity to search for
     * @return {InstancedItemEntity}               The InstancedItemEntity that is found, or null if it isn't
     */
    getItem(_abstractEntity) {
        if (typeof _abstractEntity == "number" && _abstractEntity >= 0) {
            return this.items.get(_abstractEntity);
        }
        if (_abstractEntity instanceof InstancedItemEntity) {
            for (let _i of this.items.keys()) {
                if (this.items.get(_i) instanceof InstancedEntity && this.items.get(_i) == _abstractEntity) {
                    return this.items.get(_i);
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
            for (let _i of this.items.keys()) {
                if (this.items.get(_i) instanceof InstancedEntity && this.items.get(_i).getEntity() == _instancedItem) {
                    return this.items.get(_i);
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
    dispose() {
        if (this == Game.player.entity) {
            return false;
        }
        this.items.forEach(function(_item) {
            _item.dispose();
        });
        delete this.items;
        this.storageSlots.clear();
        delete this.storageSlots;
        delete this.totalStorageWeight;
        delete this.totalStorageSlots;
        delete this.usedStorageWeight;
        super.dispose();
        return undefined;
    }
}
