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
        this.items = new Map();
        this.weight = 0;
        this.maxSize = 9;
        this.setMaxSize(maxSize);
        this.maxWeight = 10;
        this.setMaxWeight(maxWeight);
        this.entities = {};
        this.locked = false;
        this.enabled = true;

        Inventory.set(this.id, this);
    }

    setID(id) {
        this.locked = true;
        Inventory.remove(this.id);
        id = Tools.filterID(id);
        this.id = id;
        Inventory.set(this.id, this);
        this.locked = false;
        return 0;
    }
    getID() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getSize() {
        return this.items.size;
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
        return this.maxSize - this.items.size;
    }
    getAvailableWeight() {
        return this.maxWeight - this.weight;
    }
    calculateUsedWeight() {
        let weight = 0;
        this.items.forEach(function(item) {
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
     * @param  {any} any       InstancedItemEntity, or ItemEntity, to be added
     * @return {number}
     */
    addItem(any) {
        if (this.locked || !this.enabled) {
            return 1;
        }
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
        if (this.locked || !this.enabled) {
            return 1;
        }
        if (!(instancedItemEntity instanceof InstancedEntity)) {
            return 2;
        }
        if (isNaN(slot) || slot == -1) {
            return 2;
        }
        else if (this.items.get(slot) instanceof InstancedEntity) {
            return 1;
        }
        this.items.set(slot, instancedItemEntity);
        this.weight += instancedItemEntity.getWeight();
        instancedItemEntity.setInventory(this);
        return 0;
    }
    swapSlots(slotA, slotB) {
        if (this.locked || !this.enabled) {
            return 1;
        }
        if (!this.items.has(slotA) || !this.items.has(slotB)) {
            return 2;
        }
        let tempSlot = this.items.get(slotA);
        this.items.set(slotA, this.items.get(slotB));
        this.items.set(slotB, tempSlot);
        return 0;
    }
    /**
     * Removes an InstancedItemEntity from this entity's Item array
     * @param  {InstancedItemEntity} any InstancedItemEntity, or ItemEntity, to be removed
     * @return {this}
     */
    removeItem(any) {
        if (this.locked || !this.enabled) {
            return 1;
        }
        return this.removeItemFromSlot(this.getSlotByItem(any));
    }
    removeItemFromSlot(number) {
        if (this.locked || !this.enabled) {
            return 1;
        }
        if (isNaN(number) || number < 0) {
            return 2;
        }
        if (this.items.has(number)) {
            let instancedItemEntity = this.items.get(number);
            this.weight -= instancedItemEntity.getWeight();
            this.items.delete(number);
            instancedItemEntity.removeInventory(this);
        }
        return 0;
    }
    getItemBySlot(number) {
        if (this.items.has(number) && this.items.get(number) instanceof InstancedEntity) {
            return this.items.get(number);
        }
        return 2;
    }
    getSlotByItem(any) {
        let slot = -1;
        if (any instanceof InstancedEntity) {
            this.items.forEach((val, key) => {
                if (val == any) {
                    slot = key;
                    return true;
                }
            });
        }
        else if (any instanceof Entity) {
            this.items.forEach((val, key) => {
                if (val.getEntity() == any) {
                    slot = key;
                    return true;
                }
            });
        }
        else if (typeof any == "string") {
            if (InstancedEntity.has(any)) {
                this.items.forEach((val, key) => {
                    if (val.getID() == any) {
                        slot = key;
                        return true;
                    }
                });
            }
            else if (Entity.has(any)) {
                this.items.forEach((val, key) => {
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
            this.items.forEach((val) => {
                if (val == any) {
                    item = val;
                    return true;
                }
            });
        }
        else if (any instanceof Entity) {
            this.items.forEach((val) => {
                if (val.getEntity() == any) {
                    item = val;
                    return true;
                }
            });
        }
        else if (typeof any == "string") {
            if (InstancedEntity.has(any)) {
                this.items.forEach((val) => {
                    if (val.getID() == any) {
                        item = val;
                        return true;
                    }
                });
            }
            else if (Entity.has(any)) {
                this.items.forEach((val) => {
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
        return this.items;
    }

    hasEntity(abstractEntity) {
        if (!(abstractEntity instanceof AbstractEntity)) {
            if (AbstractEntity.has(abstractEntity)) {
                abstractEntity = AbstractEntity.get(abstractEntity);
            }
            else {
                return 2;
            }
        }
        return this.entities.hasOwnProperty(abstractEntity.getID());
    }
    addEntity(abstractEntity, updateChild = false) {
        if (!(abstractEntity instanceof AbstractEntity)) {
            if (AbstractEntity.has(abstractEntity)) {
                abstractEntity = AbstractEntity.get(abstractEntity);
            }
            else {
                return 2;
            }
        }
        this.entities[abstractEntity.getID()] = true;
        if (updateChild) {
            abstractEntity.setInventory(this, false);
        }
        return 0;
    }
    removeEntity(abstractEntity, updateChild = false) {
        if (!(abstractEntity instanceof AbstractEntity)) {
            if (AbstractEntity.has(abstractEntity)) {
                abstractEntity = AbstractEntity.get(abstractEntity);
            }
            else {
                return 2;
            }
        }
        delete this.entities[abstractEntity];
        if (updateChild) {
            abstractEntity.removeInventory(false);
        }
        return 0;
    }
    hasEntities() {
        return Object.keys(this.entities).length > 0;
    }
    clearEntities() {
        for (let entity in this.entities) {
            this.removeEntity(entity, true);
        }
    }

    isEnabled() {
        return this.enabled == true;
    }
    setEnabled(isEnabled = true) {
        this.enabled = (isEnabled == true);
        return 0;
    }

    isLocked() {
        return this.locked == true;
    }
    setLocked(isLocked = true) {
        this.locked = (isLocked == true);
        return 0;
    }

    clear() {
        this.isLocked = true;
        this.items.forEach((instancedItemEntity, slot) => {
            instancedItemEntity.removeInventory();
            instancedItemEntity.dispose();
            this.items.delete(slot);
        });
        this.items.clear();
        this.weight = 0;
        this.isLocked = false;
    }

    clone(id = "") {
        let clone = new Inventory(id, this.name, this.maxSize, this.maxWeight);
        this.items.forEach((value, key) => {
            clone.addItemToSlot(key.clone(), value);
        });
        clone.assign(this);
        return clone;
    }
    /**
     * Clones the inventory's values over this
     * @param {Inventory} inventory 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(inventory, verify = true) {
        if (verify && !(inventory instanceof Inventory)) {
            return 2;
        }
        this.setWeight(inventory.weight);
        this.setMaxSize(inventory.maxSize);
        this.setMaxWeight(inventory.maxWeight);
        return 0;
    }
    dispose() {
        if (this == Game.player.entity) {
            return false;
        }
        this.setLocked(true);
        this.setEnabled(false);
        this.clearEntities();
        this.clear();
        delete this.items;
        delete this.entities;
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