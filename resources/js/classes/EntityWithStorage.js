class EntityWithStorage extends Entity {
    constructor(id = undefined, name = undefined, description = undefined, iconID = undefined) {
        super(id, name, description, iconID);
        /*
        Map of integers, related to item slots, and InstancedItemEntities
         */
        this.storage = new Map();
        this.storageWeight = 0;
        this.maxStorageWeight = 10;
        this.maxStorageSlots = 9;
    }
    setMaxStorageWeight(maxStorageWeight) {
        this.maxStorageWeight = maxStorageWeight
        return this;
    }
    getMaxStorageWeight() {
        return this.maxStorageWeight;
    }
    getAvailableStorageWeight() {
        return this.maxStorageWeight - this.storageWeight;
    }
    setMaxStorageSlots(maxStorageSlots) {
        this.maxStorageSlots = maxStorageSlots;
        return this;
    }
    getMaxStorageSlots() {
        return this.maxStorageSlots;
    }
    getAvailableStorageSlots() {
        return this.maxStorageSlots - this.storage.size;
    }
    getStorageSlots() {
        return this.storage.size;
    }
    getStorageWeight() {
        return this.storageWeight;
    }
    calculateUsedStorageWeight() {
        let weight = 0;
        this.storage.forEach(function(item) {
            weight += item.getWeight();
        }, this);
        return weight;
    }
    /**
     * Gets the nth available spot.
     * @param {number} nth Nth
     * @returns {number}
     */
    getAvailableStorageSlot(nth = 0) {
        if (isNaN(nth)) {
            nth = 0;
        }
        nth += 1;
        for (let i = 0; i < this.maxStorageSlots; i++) {
            if (this.storage.get(i) == undefined) {
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
     * @param  {any} any       InstancedItemEntity, or ItemEntity, to be added
     * @return {number}
     */
    addItem(any) {
        if (any instanceof InstancedEntity) {
            return this.addItemToSlot(any, this.getAvailableStorageSlot());
        }
        else if (any instanceof Entity) {
            return this.addItemToSlot(any.createInstance(), this.getAvailableStorageSlot());
        }
        else if (typeof any == "string") {
            if (Game.hasInstancedEntity(any)) {
                return this.addItemToSlot(Game.getInstancedEntity(any), this.getAvailableStorageSlot());
            }
            else if (Game.hasEntity(any)) {
                return this.addItemToSlot(Game.getEntity(any).createInstance(), this.getAvailableStorageSlot());
            }
        }
        if (Game.debugMode) console.log(`Failed to add item ${any} to ${this.id}`);
        return 2;
    }
    addItemToSlot(instancedItemEntity, slot) {
        if (!(instancedItemEntity instanceof InstancedEntity)) {
            return 2;
        }
        if (isNaN(slot) || slot == -1) {
            return 2;
        }
        else if (this.storage.get(slot) instanceof InstancedEntity) {
            return 1;
        }
        this.storage.set(slot, instancedItemEntity);
        this.storageWeight += instancedItemEntity.getWeight();
        return 0;
    }
    swapStorageSlots(slotA, slotB) {
        if (!this.storage.has(slotA) || !this.storage.has(slotB)) {
            return 2;
        }
        let tempSlot = this.storage.get(slotA);
        this.storage.set(slotA, this.storage.get(slotB));
        this.storage.set(slotB, tempSlot);
        return 0;
    }
    /**
     * Removes an InstancedItemEntity from this entity's Item array
     * @param  {InstancedItemEntity} any InstancedItemEntity, or ItemEntity, to be removed
     * @return {this}
     */
    removeItem(any) {
        return this.removeItemFromStorageSlot(this.getStorageSlotByItem(any));
    }
    removeItemFromStorageSlot(number) {
        if (isNaN(number) || number < 0) {
            return 2;
        }
        if (this.storage.has(number) && this.storage.get(number) instanceof InstancedEntity) {
            this.storageWeight -= this.storage.get(number).getWeight();
            this.storage.delete(number);
        }
        return 0;
    }
    getItemByStorageSlot(number) {
        if (this.storage.has(number) && this.storage.get(number) instanceof InstancedEntity) {
            return this.storage.get(number);
        }
        return 2;
    }
    getStorageSlotByItem(any) {
        let slot = -1;
        if (any instanceof InstancedEntity) {
            slot = this.storage.flip().get(any);
            if (slot == undefined) {
                return -1;
            }
        }
        else if (any instanceof Entity) {
            this.storage.forEach(function(val, key) {
                if (val.getEntity() == any) {
                    slot = key;
                }
            });
        }
        else if (typeof any == "string") {
            if (Game.hasInstancedEntity(any)) {
                this.storage.forEach(function(val, key) {
                    if (val.getID() == any) {
                        slot = key;
                    }
                });
            }
            else if (Game.hasEntity(any)) {
                this.storage.forEach(function(val, key) {
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
            this.storage.forEach(function(val) {
                if (val == any) {
                    foundItem = true;
                    item = val;
                }
            });
        }
        else if (any instanceof Entity) {
            this.storage.forEach(function(val) {
                if (val.getEntity() == any) {
                    foundItem = true;
                    item = val;
                }
            });
        }
        else if (typeof any == "string") {
            if (Game.hasInstancedEntity(any)) {
                this.storage.forEach(function(val) {
                    if (val.getID() == any) {
                        foundItem = true;
                        item = val;
                    }
                });
            }
            else if (Game.hasEntity(any)) {
                this.storage.forEach(function(val) {
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
        if (any instanceof InstancedEntity) {
            foundItem = this.storage.flip().has(any);
        }
        else if (any instanceof Entity) {
            this.storage.forEach(function(val) {
                if (val.getEntity() == any) {
                    foundItem = true;
                }
            }, this);
        }
        else if (typeof any == "string") {
            if (Game.hasInstancedEntity(any)) {
                this.storage.forEach(function(val) {
                    if (val.getID() == any) {
                        foundItem = true;
                    }
                });
            }
            else if (Game.hasEntity(any)) {
                this.storage.forEach(function(val) {
                    if (val.getEntity().getID() == any) {
                        foundItem = true;
                    }
                });
            }
        }
        return foundItem;
    }
    getItems() {
        return this.storage;
    }
    dispose() {
        if (this == Game.player.entity) {
            return false;
        }
        this.storage.forEach(function(val, key) {
            val.dispose();
            this.items.delete(key);
        });
        this.storage.clear();
        delete this.storageWeight;
        delete this.maxStorageSlots;
        super.dispose();
        return undefined;
    }
}
