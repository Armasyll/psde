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
        this.items = {};
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
        return Object.keys(this.items).length;
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
        return this.maxSize - this.getSize();
    }
    getAvailableWeight() {
        return this.maxWeight - this.weight;
    }
    calculateUsedWeight() {
        let weight = 0;
        for (let slot in this.items) {
            weight += InstancedItemEntity.get(this.items[slot]).getWeight();
        }
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
            if (this.items[i] == undefined) {
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
     * @param  {any} abstractEntity       InstancedItemEntity, or ItemEntity, to be added
     * @return {number}
     */
    addItem(abstractEntity) {
        if (this.locked || !this.enabled) {
            return 1;
        }
        if (!(abstractEntity instanceof AbstractEntity)) {
            if (AbstractEntity.has(abstractEntity)) {
                abstractEntity = AbstractEntity.get(abstractEntity);
            }
            else {
                return 2;
            }
        }
        if (abstractEntity instanceof InstancedEntity) {
            return this.addItemToSlot(abstractEntity, this.getAvailableSlot());
        }
        else if (abstractEntity instanceof ItemEntity) {
            return this.addItemToSlot(abstractEntity.createInstance(), this.getAvailableSlot());
        }
        if (Game.debugMode) console.log(`Failed to add item ${abstractEntity} to ${this.id}`);
        return 2;
    }
    addItemToSlot(instancedItemEntity, slot) {
        if (this.locked || !this.enabled) {
            return 1;
        }
        if (!(instancedItemEntity instanceof InstancedItemEntity)) {
            if (InstancedItemEntity.has(instancedItemEntity)) {
                instancedItemEntity = InstancedItemEntity.get(instancedItemEntity);
            }
            else {
                return 2;
            }
        }
        if (typeof slot != "number") {slot = Number.parseInt(slot) || -1;}
        else {slot = slot|0}
        if (isNaN(slot) || slot == -1) {
            return 2;
        }
        else if (this.items[slot] instanceof InstancedEntity) {
            return 1;
        }
        this.items[slot] = instancedItemEntity.getID();
        this.weight += instancedItemEntity.getWeight();
        instancedItemEntity.setInventory(this);
        return 0;
    }
    swapSlots(slotA, slotB) {
        if (this.locked || !this.enabled) {
            return 1;
        }
        /** Can't swap empty slots */
        if (!this.items.hasOwnProperty(slotA) && !this.items.hasOwnProperty(slotB)) {
            return 2;
        }
        this.locked = true;
        let tempSlot = this.items[slotA];
        this.items[slotA] = this.items[slotB];
        this.items[slotB] = tempSlot;
        this.locked = false;
        return 0;
    }
    /**
     * Removes an InstancedItemEntity from this entity's Item array
     * @param  {InstancedItemEntity} instancedItemEntity InstancedItemEntity, or ItemEntity, to be removed
     * @return {this}
     */
    removeItem(instancedItemEntity) {
        if (this.locked || !this.enabled) {
            return 1;
        }
        if (!(instancedItemEntity instanceof InstancedItemEntity)) {
            if (InstancedItemEntity.has(instancedItemEntity)) {
                instancedItemEntity = InstancedItemEntity.get(instancedItemEntity);
            }
            else {
                return 2;
            }
        }
        if (Game.debugMode) console.log(`Running <Inventory> ${this.id}.removeItem(${instancedItemEntity.getID()})`);
        return this.removeItemFromSlot(this.getSlotByItem(instancedItemEntity));
    }
    removeItemFromSlot(slot) {
        if (this.locked || !this.enabled) {
            return 1;
        }
        if (typeof slot != "number") {slot = Number.parseInt(slot) || -1;}
        else {slot = slot|0}
        if (isNaN(slot) || slot == -1) {
            return 2;
        }
        else if (this.items[slot] instanceof InstancedEntity) {
            return 1;
        }
        if (this.items.hasOwnProperty(slot)) {
            if (InstancedItemEntity.has(this.items[slot])) {
                let instancedItemEntity = InstancedItemEntity.get(this.items[slot]);
                this.weight -= instancedItemEntity.getWeight();
                instancedItemEntity.removeInventory(this);
            }
            delete this.items[slot];
        }
        return 0;
    }
    getItemBySlot(number) {
        if (this.items[number] && this.items[number] instanceof InstancedEntity) {
            return this.items[number];
        }
        return 2;
    }
    getSlotByItem(abstractEntity) {
        let slot = -1;
        if (!(abstractEntity instanceof AbstractEntity)) {
            if (AbstractEntity.has(abstractEntity)) {
                abstractEntity = AbstractEntity.get(abstractEntity);
            }
            else {
                return slot;
            }
        }
        if (abstractEntity instanceof InstancedEntity) {
            let instancedItemEntity = "";
            for (let slot in this.items) {
                instancedItemEntity = this.items[slot];
                if (instancedItemEntity == abstractEntity.getID()) {
                    return Number.parseInt(slot);
                }
            };
        }
        else if (abstractEntity instanceof Entity) {
            let instancedItemEntity = "";
            for (let slot in this.items) {
                instancedItemEntity = InstancedEntity.get(this.items[slot]);
                if (instancedItemEntity.getEntity() == abstractEntity) {
                    return Number.parseInt(slot);
                }
            };
        }
        return slot;
    }
    /**
     * Returns the InstancedItemEntity of a passed ItemInstance or InstancedItemEntity, or their string IDs, if this entity has it in their Item array
     * @param  {any} abstractEntity The ItemInstance or InstancedItemEntity to search for
     * @return {InstancedItemEntity} The InstancedItemEntity that is found, or null if it isn't
     */
    getItem(abstractEntity) {
        if (!(abstractEntity instanceof AbstractEntity)) {
            if (AbstractEntity.has(abstractEntity)) {
                abstractEntity = AbstractEntity.get(abstractEntity);
            }
            else {
                return 2;
            }
        }
        if (abstractEntity instanceof InstancedEntity) {
            abstractEntity = abstractEntity.getEntity();
        }
        for (let slot in this.items) {
            let instancedItemEntity = AbstractEntity.get(this.items[slot]);
            if (instancedItemEntity.getEntity() == abstractEntity) {
                return instancedItemEntity;
            }
        }
        return 1;
    }
    hasItem(abstractEntity) {
        return this.getItem(abstractEntity) instanceof AbstractEntity;
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
        for (let slot in this.items) {
            let instancedItemEntity = InstancedItemEntity.get(this.items[slot]);
            instancedItemEntity.dispose();
            delete this.items[slot];
        }
        this.weight = 0;
        this.isLocked = false;
    }

    clone(id = "") {
        let clone = new Inventory(id, this.name, this.maxSize, this.maxWeight);
        for (let slot in this.items) {
            clone.addItemToSlot(InstancedItemEntity.get(this.items[slot]).clone(), slot);
        }
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