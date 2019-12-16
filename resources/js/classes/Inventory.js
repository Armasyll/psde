class Inventory {
    constructor(id = undefined, name = undefined, maxSize = 9, maxWeight = 10) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        this.id = id;
        name = Tools.filterName(name);
        if (name.length == 0) {
            name = id;
        }
        this.name = name;
        /*
        Map of integers, related to item slots, and InstancedItemEntities
         */
        this.inventory = new Map();
        this.weight = 0;
        this.maxWeight = 10;
        this.maxSize = 9;
        this.entities = new Set();

        Inventory.set(this.id, this);
    }
    getID() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getSize() {
        return this.inventory.size;
    }
    getWeight() {
        return this.weight;
    }
    setMaxWeight(maxWeight) {
        this.maxWeight = maxWeight
        return 0;
    }
    getMaxWeight() {
        return this.maxWeight;
    }
    setMaxSize(maxSize) {
        this.maxSize = maxSize;
        return 0;
    }
    getMaxSize() {
        return this.maxSize;
    }
    getAvailableSlots() {
        return this.maxSize - this.inventory.size;
    }
    getAvailableWeight() {
        return this.maxWeight - this.weight;
    }
    calculateUsedWeight() {
        let weight = 0;
        this.inventory.forEach(function(item) {
            weight += item.getWeight();
        }, this);
        return weight;
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
        for (let i = 0; i < this.maxSize; i++) {
            if (this.inventory.get(i) == undefined) {
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
            return this.addItemToSlot(any, this.getAvailableSlot());
        }
        else if (any instanceof Entity) {
            return this.addItemToSlot(any.createInstance(), this.getAvailableSlot());
        }
        else if (typeof any == "string") {
            if (InstancedEntity.has(any)) {
                return this.addItemToSlot(InstancedEntity.get(any), this.getAvailableSlot());
            }
            else if (Entity.has(any)) {
                return this.addItemToSlot(Entity.get(any).createInstance(), this.getAvailableSlot());
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
        else if (this.inventory.get(slot) instanceof InstancedEntity) {
            return 1;
        }
        this.inventory.set(slot, instancedItemEntity);
        this.weight += instancedItemEntity.getWeight();
        return 0;
    }
    swapSlots(slotA, slotB) {
        if (!this.inventory.has(slotA) || !this.inventory.has(slotB)) {
            return 2;
        }
        let tempSlot = this.inventory.get(slotA);
        this.inventory.set(slotA, this.inventory.get(slotB));
        this.inventory.set(slotB, tempSlot);
        return 0;
    }
    /**
     * Removes an InstancedItemEntity from this entity's Item array
     * @param  {InstancedItemEntity} any InstancedItemEntity, or ItemEntity, to be removed
     * @return {this}
     */
    removeItem(any) {
        return this.removeItemFromSlot(this.getSlotByItem(any));
    }
    removeItemFromSlot(number) {
        if (isNaN(number) || number < 0) {
            return 2;
        }
        if (this.inventory.has(number) && this.inventory.get(number) instanceof InstancedEntity) {
            this.weight -= this.inventory.get(number).getWeight();
            this.inventory.delete(number);
        }
        return 0;
    }
    getItemBySlot(number) {
        if (this.inventory.has(number) && this.inventory.get(number) instanceof InstancedEntity) {
            return this.inventory.get(number);
        }
        return 2;
    }
    getSlotByItem(any) {
        let slot = -1;
        if (any instanceof InstancedEntity) {
            this.inventory.forEach((val, key) => {
                if (val == any) {
                    slot = key;
                    return true;
                }
            });
        }
        else if (any instanceof Entity) {
            this.inventory.forEach((val, key) => {
                if (val.getEntity() == any) {
                    slot = key;
                    return true;
                }
            });
        }
        else if (typeof any == "string") {
            if (InstancedEntity.has(any)) {
                this.inventory.forEach((val, key) => {
                    if (val.getID() == any) {
                        slot = key;
                        return true;
                    }
                });
            }
            else if (Entity.has(any)) {
                this.inventory.forEach((val, key) => {
                    if (val.getEntity().getID() == any) {
                        slot = key;
                        return true;
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
        let item = null;
        if (any instanceof InstancedEntity) {
            this.inventory.forEach((val) => {
                if (val == any) {
                    item = val;
                    return true;
                }
            });
        }
        else if (any instanceof Entity) {
            this.inventory.forEach((val) => {
                if (val.getEntity() == any) {
                    item = val;
                    return true;
                }
            });
        }
        else if (typeof any == "string") {
            if (InstancedEntity.has(any)) {
                this.inventory.forEach((val) => {
                    if (val.getID() == any) {
                        item = val;
                        return true;
                    }
                });
            }
            else if (Entity.has(any)) {
                this.inventory.forEach((val) => {
                    if (val.getEntity().getID() == any) {
                        item = val;
                        return true;
                    }
                });
            }
        }
        if (item instanceof AbstractEntity) {
            return item;
        }
        return 1;
    }
    hasItem(any) {
        return (this.getItem(any) instanceof AbstractEntity);
    }
    getItems() {
        return this.inventory;
    }

    hasEntity(abstractEntity) {
        return this.entities.has(abstractEntity);
    }
    addEntity(abstractEntity, updateChild = false) {
        if (!(abstractEntity instanceof AbstractEntity)) {
            return 1;
        }
        this.entities.add(abstractEntity);
        if (updateChild) {
            abstractEntity.setInventory(this, false);
        }
        return 0;
    }
    removeEntity(abstractEntity, updateChild = false) {
        if (!(abstractEntity instanceof AbstractEntity)) {
            return 1;
        }
        this.entities.remove(abstractEntity);
        if (updateChild) {
            abstractEntity.removeInventory(false);
        }
        return 0;
    }
    hasEntities() {
        return this.entities.size > 0;
    }

    clear() {
        this.inventory.forEach((val, key) => {
            val.dispose();
            this.inventory.delete(key);
        });
        this.inventory.clear();
        this.weight = 0;
    }

    dispose() {
        if (this == Game.player.entity) {
            return false;
        }
        this.setLocked(true);
        this.setEnabled(false);
        this.entities.clear();
        this.clear();
        delete this.inventory;
        return undefined;
    }

    static initialize() {
        Inventory.inventoryList = {};
    }
    static get(id) {
        if (Inventory.has(id)) {
            return Inventory.inventoryList[id];
        }
        return 1;
    }
    static has(id) {
        return Inventory.inventoryList.hasOwnProperty(id);
    }
    static set(id, lightEntity) {
        Inventory.inventoryList[id] = lightEntity;
        return 0;
    }
    static remove(id) {
        delete Inventory.inventoryList[id];
        return 0;
    }
    static list() {
        return Inventory.inventoryList;
    }
    static clear() {
        for (let i in Inventory.inventoryList) {
            Inventory.inventoryList[i].dispose();
        }
        Inventory.inventoryList = {};
        return 0;
    }
}
Inventory.initialize();