/**
 * Container
 * @typedef {Object} Container
 * @property {string} id - ID
 * @property {string} name
 * @property {Object.<number, InstancedItemEntity>} items
 * @property {number} weight
 * @property {number} maxSize
 * @property {number} maxWeight
 * @property {Object.<string, AbstractEntity>} entities
 * @property {boolean} locked
 * @property {boolean} enabled
 */
class Container {
    /**
     * Creates a Container
     * @param {string} id 
     * @param {string} name 
     * @param {number} [maxSize] 
     * @param {number} [maxWeight] 
     */
    constructor(id = "", name = "", maxSize = 9, maxWeight = 10) {
        if (Container.has(id)) {
            id = Tools.genUUIDv4();
        }
        /** @type {string} */
        this.id = "";
        /** @type {string} */
        this.name = "";
        /**
         * Map of integers, related to item slots, and InstancedItemEntities
         * @type {Object.<number, InstancedItemEntity>}
         */
        this.items = {};
        /** @type {number} */
        this.weight = 0;
        /** @type {number} */
        this.maxSize = 9;
        /** @type {number} */
        this.maxWeight = 10;
        /** @type {Object.<string, AbstractEntity>} */
        this.entities = {};
        /** @type {boolean} */
        this.locked = false;
        /** @type {boolean} */
        this.enabled = true;
        this.setID(id);
        this.setName(name);
        this.setMaxSize(maxSize);
        this.setMaxWeight(maxWeight);

        Container.set(this.id, this);
    }

    setID(id) {
        this.locked = true;
        Container.remove(this.id);
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        this.id = id;
        Container.set(this.id, this);
        this.locked = false;
        return 0;
    }
    getID() {
        return this.id;
    }
    setName(name) {
        name = Tools.filterName(name);
        if (name.length == 0) {
            name = this.id;
        }
        return 0;
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
    calculateWeight() {
        let weight = 0;
        for (let slot in this.items) {
            weight += InstancedItemEntity.get(this.items[slot]).getWeight();
        }
        this.weight = weight;
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
     * @param  {InstancedItemEntity} instancedItemEntity InstancedItemEntity, or ItemEntity, to be added
     * @return {number}
     */
    addItem(instancedItemEntity) {
        if (this.locked || !this.enabled) {
            return 1;
        }
        if (!(instancedItemEntity instanceof AbstractEntity)) {
            if (AbstractEntity.has(instancedItemEntity)) {
                instancedItemEntity = AbstractEntity.get(instancedItemEntity);
            }
            else {
                return 2;
            }
        }
        if (instancedItemEntity instanceof InstancedEntity) {
            return this.addItemToSlot(instancedItemEntity, this.getAvailableSlot());
        }
        else if (instancedItemEntity instanceof ItemEntity) {
            return this.addItemToSlot(instancedItemEntity.createInstance(), this.getAvailableSlot());
        }
        if (Container.debugMode) console.log(`Failed to add item ${instancedItemEntity} to ${this.id}`);
        return 0;
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
        this.items[slot] = instancedItemEntity;
        this.weight += instancedItemEntity.getWeight();
        instancedItemEntity.setContainer(this);
        return 0;
    }
    swapSlots(slotA, slotB) {
        if (this.locked || !this.enabled) {
            return 1;
        }
        slotA = Number.parseInt(slotA) || Number.MAX_SAFE_INTEGER;
        slotB = Number.parseInt(slotB) || Number.MAX_SAFE_INTEGER;
        /** Can't swap empty slots */
        if (!this.items.hasOwnProperty(slotA) && !this.items.hasOwnProperty(slotB)) {
            return 2;
        }
        else if (slotA > this.maxSize || slotB > this.maxSize) {
            return 2;
        }
        else if (slotA < 0 || slotB < 0) {
            return 2;
        }
        this.locked = true;
        let tempItem = this.items[slotA];
        this.items[slotA] = this.items[slotB];
        this.items[slotB] = tempItem;
        this.locked = false;
        return 0;
    }
    /**
     * Removes an AbstractEntity from this entity's Item array
     * @param  {AbstractEntity} instancedItemEntity AbstractEntity, or ItemEntity, to be removed
     * @return {this}
     */
    removeItem(instancedItemEntity) {
        if (this.locked || !this.enabled) {
            return 1;
        }
        if (!(instancedItemEntity instanceof AbstractEntity)) {
            if (AbstractEntity.has(instancedItemEntity)) {
                instancedItemEntity = AbstractEntity.get(instancedItemEntity);
            }
            else {
                return 2;
            }
        }
        if (Container.debugMode) console.log(`Running <Container> ${this.id}.removeItem(${instancedItemEntity.getID()})`);
        let slot = this.getSlotByItem(instancedItemEntity);
        if (slot < 0) {
            return 1;
        }
        return this.removeItemFromSlot(slot);
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
        if (this.items.hasOwnProperty(slot)) {
            if (InstancedItemEntity.has(this.items[slot])) {
                let instancedItemEntity = InstancedItemEntity.get(this.items[slot]);
                this.weight -= instancedItemEntity.getWeight();
                instancedItemEntity.removeContainer(this);
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
            let instancedItemEntity = null;
            for (let slot in this.items) {
                instancedItemEntity = this.items[slot];
                if (instancedItemEntity == abstractEntity) {
                    return Number.parseInt(slot);
                }
            };
        }
        else if (abstractEntity instanceof Entity) {
            let instancedItemEntity = null;
            for (let slot in this.items) {
                instancedItemEntity = this.items[slot];
                if (instancedItemEntity instanceof InstancedEntity) {
                    if (instancedItemEntity.getEntity() == abstractEntity) {
                        return Number.parseInt(slot);
                    }
                }
            };
        }
        return slot;
    }
    /**
     * Returns the InstancedItemEntity of a passed ItemInstance or InstancedItemEntity, or their string IDs, if this entity has it in their Item array
     * @param  {(ItemEntity|InstancedItemEntity)} abstractEntity The ItemInstance or InstancedItemEntity to search for
     * @return {InstancedItemEntity} The InstancedItemEntity that is found, or null if it isn't
     */
    getItem(abstractEntity) {
        if (!(abstractEntity instanceof AbstractEntity)) {
            if (AbstractEntity.has(abstractEntity)) {
                abstractEntity = AbstractEntity.get(abstractEntity);
            }
            else {
                return null;
            }
        }
        if (abstractEntity instanceof InstancedEntity) {
            abstractEntity = abstractEntity.getEntity();
        }
        let instancedItemEntity = null;
        for (let slot in this.items) {
            instancedItemEntity = this.items[slot];
            if (instancedItemEntity instanceof InstancedEntity) {
                if (instancedItemEntity.getEntity() == abstractEntity) {
                    return instancedItemEntity;
                }
            }
        }
        return null;
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
            abstractEntity.setContainer(this, false);
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
            abstractEntity.removeContainer(false);
        }
        if (Object.keys(this.entities).length == 0) {
            this.dispose();
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
        return 0;
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

    stringify(minimal = false, filter = 0) {
        return JSON.stringify(this.objectify(filter));
    }
    objectifyMinimal(filter = 0) {
        return this.objectify(filter);
    }
    objectify(filter = 0) {
        filter = Tools.filterInt(filter);
        let obj = {};
        obj["className"] = this.getClassName();
        obj["id"] = this.id;
        obj["name"] = this.name;
        obj["items"] = {};
        for (let slot in this.items) {
            if (this.items[slot] instanceof InstancedItemEntity) {
                if (filter <= 0 || filter == this.items[slot].getItemType()) {
                    obj["items"][slot] = {
                        "id": this.items[slot].id,
                        "name": this.items[slot].getName(),
                        "description": this.items[slot].getDescription(),
                        "iconID": this.items[slot].getIcon(),
                        "meshID": this.items[slot].getMeshID(),
                        "materialID": this.items[slot].getMaterialID(),
                        "textureID": this.items[slot].getTextureID(),
                        "weight": this.items[slot].getWeight(),
                        "price": this.items[slot].getPrice()
                    }
                }
            }
        }
        obj["maxSize"] = this.maxSize;
        obj["maxWeight"] = this.maxWeight;
        obj["size"] = Object.keys(this.items).length;
        obj["weight"] = this.weight;
        return obj;
    }

    clone(id = "") {
        let clone = new Container(id, this.name, this.maxSize, this.maxWeight);
        for (let slot in this.items) {
            if (this.items[slot] instanceof InstancedItemEntity) {
                clone.addItemToSlot(this.items[slot].clone(), slot);
            }
            else {
                console.log(this.items[slot]);
            }
        }
        clone.assign(this);
        return clone;
    }
    /**
     * Clones the container's values over this
     * @param {Container} container 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(container, verify = true) {
        if (verify && !(container instanceof Container)) {
            return 2;
        }
        this.setMaxSize(container.maxSize);
        this.setMaxWeight(container.maxWeight);
        this.calculateWeight();
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        this.clearEntities();
        this.clear();
        delete this.items;
        delete this.entities;
        return null;
    }
    getClassName() {
        return "Container";
    }

    static initialize() {
        Container.containerList = {};
        Container.debugMode = false;
    }
    static get(id) {
        if (Container.has(id)) {
            return Container.containerList[id];
        }
        return 1;
    }
    static has(id) {
        return Container.containerList.hasOwnProperty(id);
    }
    static set(id, lightEntity) {
        Container.containerList[id] = lightEntity;
        return 0;
    }
    static remove(id) {
        delete Container.containerList[id];
        return 0;
    }
    static list() {
        return Container.containerList;
    }
    static clear() {
        for (let i in Container.containerList) {
            Container.containerList[i].dispose();
        }
        Container.containerList = {};
        return 0;
    }
}
Container.initialize();