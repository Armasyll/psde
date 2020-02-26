class InstancedItemEntity extends InstancedEntity {
    constructor(id = undefined, itemEntity = undefined, owner = undefined) {
        super(id, itemEntity);
        if (!(this.entity instanceof Entity)) {
            this.dispose();
            return undefined;
        }

        this.setOwner(owner);

        this.stackCount = 1;
        this.inventory = null;

        InstancedItemEntity.set(this.id, this);
    }

    getItemType() {
        return this.entity.getItemType();
    }

    setInventory(inventory) {
        if (!(inventory instanceof Inventory)) {
            if (Inventory.has(inventory)) {
                inventory = Inventory.get(inventory);
            }
            else {
                return 2;
            }
        }
        this.inventory = inventory;
        return 0;
    }
    removeInventory() {
        this.inventory = null;
    }
    getMaxStackCount() {
        return this.entity.getMaxStackCount();
    }
    setStackCount(number) { // TODO: actually implement with inventory later :v
        if (typeof number != "number") {number = Number.parseInt(number) || 1;}
        else {number = number|0}
        if (number < -1 || number == 0) {
            number = 1;
        }
        this.stackCount = number;
        return 0;
    }
    modifyStackCount(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 1;}
        else {number = number|0}
        return this.setStackCount(this.stackCount + number);
    }
    getStackCount() {
        return this.stackCount;
    }

    /**
     * Overrides InstancedEntity.clone
     * @param  {string} id ID
     * @return {InstancedItemEntity} new InstancedItemEntity
     */
    clone(id = "") {
        if (!this.hasEntity()) {
            return this;
        }
        let clone = new InstancedItemEntity(id, this.entity, this.owner);
        clone.assign(this);
        return clone;
    }
    assign(entity, verify = true) {
        if (verify && !(entity instanceof InstancedItemEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        return 0;
    }
    dispose() {
        InstancedItemEntity.remove(this.id);
        if (this.hasInventory()) {
            this.inventory.removeItem(this);
            this.removeInventory();
        }
        super.dispose();
        return undefined;
    }

    static initialize() {
        InstancedItemEntity.instancedItemEntityList = {};
    }
    static get(id) {
        if (InstancedItemEntity.has(id)) {
            return InstancedItemEntity.instancedItemEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return InstancedItemEntity.instancedItemEntityList.hasOwnProperty(id);
    }
    static set(id, instancedItemEntity) {
        InstancedItemEntity.instancedItemEntityList[id] = instancedItemEntity;
        return 0;
    }
    static remove(id) {
        delete InstancedItemEntity.instancedItemEntityList[id];
        return 0;
    }
    static list() {
        return InstancedItemEntity.instancedItemEntityList;
    }
    static clear() {
        for (let i in InstancedItemEntity.instancedItemEntityList) {
            InstancedItemEntity.instancedItemEntityList[i].dispose();
        }
        InstancedItemEntity.instancedItemEntityList = {};
        return 0;
    }
}
InstancedItemEntity.initialize();