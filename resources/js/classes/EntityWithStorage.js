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
    setMaxStorageWeight(maxStorageWeight) {
        this.storageWeight.setMax(maxStorageWeight);
        return this;
    }
    getMaxStorageWeight() {
        return this.storageWeight.getMax();
    }
    setMaxStorageSlots(maxStorageSlots) {
        this.maxStorageSlots = Tools.filterInt(maxStorageSlots);
        return this;
    }
    getMaxStorageSlots() {
        return this.maxStorageSlots;
    }
    getAvailableSlots() {
        return this.maxStorageSlots - this.items.size;
    }
    calculateUsedStorageWeight() {
        let weight = 0;
        this.items.forEach(function(item) {
            weight += item.getWeight();
        }, this);
        this.storageWeight.setValue(weight);
        return weight;
    }
    getUsedStorageWeight() {
        return this.storageWeight.getValue();
    }
    getUsedStorageSlots() {
        return this.items.size;
    }
    /**
     * Gets the nth available spot.
     * @param {number} nth Nth
     * @returns {number}
     */
    getAvailableSlot(nth = 0) {
        if (isNaN(nth)) {
            nth = 0;
        }
        nth += 1;
        for (let i = 0; i < this.maxStorageSlots; i++) {
            console.log(`${i}, ${nth}`);
            if (this.items.get(i) == undefined) {
                nth--;
                if (nth <= 0) {
                    return i;
                }
            }
        }
        return -1;
    }
    /**
     * Adds the InstancedItemEntity to this entity's Item array
     * @param  {InstancedItemEntity} any       InstancedItemEntity, or ItemEntity, to be added
     * @return {this}
     */
    addItem(any) {
        let slot = this.getAvailableSlot();
        if (slot == -1) {
            return 2;
        }
        if (any instanceof InstancedItemEntity) {
            this.items.set(slot, any);
            this.storageWeight.inc(any.getWeight());
            return 0;
        }
        let instancedItem = Game.getInstancedItemEntity(any);
        if (instancedItem instanceof InstancedItemEntity) {
            return this.addItem(instancedItem);
        }
        instancedItem = Game.getItemEntity(any);
        if (instancedItem instanceof ItemEntity) {
            return this.addItem(instancedItem.createInstance());
        }
        if (Game.debugMode) console.log(`Failed to add item ${any} to ${this.id}`);
        return 1;
    }
    /**
     * Removes an InstancedItemEntity from this entity's Item array
     * @param  {InstancedItemEntity} any InstancedItemEntity, or ItemEntity, to be removed
     * @return {this}
     */
    removeItem(any) {
        if (any == undefined) {
            return 1;
        }
        /*
        If the parameter is a number, and is a key in this.storage
         */
        if (typeof any == "number" && any >= 0 && this.items.has(any)) {
            let slot = any;
            any = this.items.get(any);
            if (any instanceof InstancedItemEntity) {
                this.storageWeight.dec(any.getWeight());
                this.items.delete(slot);
                return 0;
            }
            return 2;
        }
        /*
        else if the parameter is an InstancedItemEntity
         */
        if (any instanceof InstancedEntity) {
            for (let _i of this.items.keys()) {
                if (this.items.get(_i) == any) {
                    this.storageWeight.dec(any.getWeight());
                    this.items.delete(_i);
                    return 0;
                }
            }
            return 1;
        }
        /*
        else, we have to go hunting
         */
        let instancedItem = Game.getInstancedItemEntity(any);
        if (instancedItem instanceof InstancedItemEntity) {
            return this.removeItem(instancedItem);
        }
        instancedItem = Game.getItemEntity(any);
        if (instancedItem instanceof ItemEntity) {
            return this.removeItem(instancedItem);
        }
        if (Game.debugMode) console.log(`Failed to remove item ${any} to ${this.id}`);
        return 1;
    }
    getSlot(any) {
        let slot = -1;
        if (any instanceof InstancedEntity) {
            slot = this.items.flip().get(any) || -1;
        }
        else if (any instanceof Entity) {
            this.items.forEach(function(val, key) {
                if (val.getEntity() == any) {
                    slot = key;
                }
            });
        }
        else if (typeof any == "string") {
            if (Game.hasInstancedItemEntity(any)) {
                this.items.forEach(function(val, key) {
                    if (val.getID() == any) {
                        slot = key;
                    }
                });
            }
            else if (Game.hasItemEntity(any)) {
                this.items.forEach(function(val, key) {
                    if (val.getEntity().getID() == any) {
                        slot = key;
                    }
                });
            }
        }
        return slot;
    }
    /**
     * Returns the InstancedItemEntity of a passed ItemInstance or InstancedItemEntity, or their string IDs, if this entity has it in their Item array
     * @param  {any} any The ItemInstance or InstancedItemEntity to search for
     * @return {InstancedItemEntity} The InstancedItemEntity that is found, or null if it isn't
     */
    getItem(any) {
        let foundItem = false;
        let item = null;
        if (any instanceof InstancedEntity) {
            this.items.forEach(function(val) {
                if (val == any) {
                    foundItem = true;
                    item = val;
                }
            });
        }
        else if (any instanceof Entity) {
            this.items.forEach(function(val) {
                if (val.getEntity() == any) {
                    foundItem = true;
                    item = val;
                }
            });
        }
        else if (typeof any == "string") {
            if (Game.hasInstancedEntity(any)) {
                this.items.forEach(function(val) {
                    if (val.getID() == any) {
                        foundItem = true;
                        item = val;
                    }
                });
            }
            else if (Game.hasEntity(any)) {
                this.items.forEach(function(val) {
                    if (val.getEntity().getID() == any) {
                        foundItem = true;
                        item = val;
                    }
                });
            }
            else {
                return 2;
            }
        }
        else {
            return 2;
        }
        if (foundItem) {
            return item;
        }
        return 1;
    }
    hasItem(any) {
        let foundItem = false;
        if (any instanceof InstancedItemEntity) {
            foundItem = this.items.flip().has(any);
        }
        else if (any instanceof ItemEntity) {
            this.items.forEach(function(val) {
                if (val.getEntity() == any) {
                    foundItem = true;
                }
            }, this);
        }
        else if (typeof any == "string") {
            if (Game.hasInstancedEntity(any)) {
                this.items.forEach(function(val) {
                    if (val.getID() == any) {
                        foundItem = true;
                    }
                });
            }
            else if (Game.hasEntity(any)) {
                this.items.forEach(function(val) {
                    if (val.getEntity().getID() == any) {
                        foundItem = true;
                    }
                });
            }
        }
        return foundItem;
    }
    getItems() {
        return this.items;
    }
    dispose() {
        if (this == Game.player.entity) {
            return false;
        }
        this.items.forEach(function(val, key) {
            val.dispose();
            this.items.delete(key);
        });
        this.items.clear();
        delete this.storageWeight;
        delete this.maxStorageSlots;
        super.dispose();
        return undefined;
    }
}
