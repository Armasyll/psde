class InstancedFurnitureEntity extends InstancedEntity {
    constructor(id = undefined, entity = undefined, owner = undefined) {
        super(id, entity);
        if (!(this.entity instanceof Entity)) {
            this.dispose();
            return undefined;
        }

        this.setOwner(owner);

        this.seats = [];

        InstancedFurnitureEntity.set(this.id, this);
    }

    getFurnitureType() {
        return this.entity.getFurnitureType();
    }

    getCharacters() {
        this._cleanSeats();
        return this.seats;
    }
    hasCharacter(characterEntity) {
        this._cleanSeats();
        if (!(characterEntity instanceof CharacterEntity)) {
            if (CharacterEntity.has(characterEntity)) {
                characterEntity = CharacterEntity.get(characterEntity);
            }
            else {
                return false;
            }
        }
        this.seats.indexOf(characterEntity.id) != -1;
    }
    hasCharacters() {
        this._cleanSeats();
        return this.seats.length;
    }
    addCharacter(characterEntity) {
        this._cleanSeats();
        if (!(characterEntity instanceof CharacterEntity)) {
            if (CharacterEntity.has(characterEntity)) {
                characterEntity = CharacterEntity.get(characterEntity);
            }
            else {
                return 2;
            }
        }
        this.seats.push(characterEntity.id);
        return 0;
    }
    removeCharacter(characterEntity) {
        this._cleanSeats();
        if (!(characterEntity instanceof CharacterEntity)) {
            if (CharacterEntity.has(characterEntity)) {
                characterEntity = CharacterEntity.get(characterEntity);
            }
            else {
                return 2;
            }
        }
        delete this.seats.remove(characterEntity.getID());
        return 0;
    }
    _cleanSeats() {
        this.seats.forEach((characterID) => {
            if (CharacterEntity.has(characterID)) {
                if (CharacterEntity.get(characterID).furniture != this.id) {
                    this.seats.remove(characterID);
                }
            }
            else {
                this.seats.remove(characterID);
            }
        });
        return 0;
    }
    clearSeats() {
        this.seats.clear();
        return 0;
    }

    /**
     * Overrides InstancedEntity.clone
     * @param  {string} id ID
     * @return {InstancedFurnitureEntity} new InstancedFurnitureEntity
     */
    clone(id = "") {
        let clone = new InstancedFurnitureEntity(id, this.entity, this.owner);
        if (this.hasInventory()) {
            clone.setInventory(this.inventory.clone(String(id).concat("Inventory")));
        }
        return clone;
    }
    assign(entity) {
        if (verify && !(entity instanceof InstancedFurnitureEntity)) {
            return 2;
        }
        super.assign(entity);
        return 0;
    }
    dispose() {
        InstancedFurnitureEntity.remove(this.id);
        this.clearSeats();
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "InstancedFurnitureEntity";
    }

    static initialize() {
        InstancedFurnitureEntity.instancedFurnitureEntityList = {};
    }
    static get(id) {
        if (InstancedFurnitureEntity.has(id)) {
            return InstancedFurnitureEntity.instancedFurnitureEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return InstancedFurnitureEntity.instancedFurnitureEntityList.hasOwnProperty(id);
    }
    static set(id, instancedFurnitureEntity) {
        InstancedFurnitureEntity.instancedFurnitureEntityList[id] = instancedFurnitureEntity;
        return 0;
    }
    static remove(id) {
        delete InstancedFurnitureEntity.instancedFurnitureEntityList[id];
        return 0;
    }
    static list() {
        return InstancedFurnitureEntity.instancedFurnitureEntityList;
    }
    static clear() {
        for (let i in InstancedFurnitureEntity.instancedFurnitureEntityList) {
            InstancedFurnitureEntity.instancedFurnitureEntityList[i].dispose();
        }
        InstancedFurnitureEntity.instancedFurnitureEntityList = {};
        return 0;
    }
}
InstancedFurnitureEntity.initialize();