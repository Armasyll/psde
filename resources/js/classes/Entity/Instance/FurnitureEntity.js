/**
 * Instanced Furniture Entity
 */
class InstancedFurnitureEntity extends InstancedEntity {
    /**
     * Creates an Instanced Furniture Entity
     * @param {string} id 
     * @param {FurnitureEntity} entity 
     * @param {(CreatureEntity|null)} [owner] 
     */
    constructor(id = "", entity = null, owner = null) {
        super(id, entity);
        if (!(this.entity instanceof Entity)) {
            this.dispose();
            return null;
        }

        this.setOwner(owner);

        this.availableSeats = 0;
        this.usedSeats = [];
        this.entityLocked = false;
        this.key = null;
        this.open = false;

        this.setAvailableSeats(entity.availableSeats);
        InstancedFurnitureEntity.set(this.id, this);
    }

    getFurnitureType() {
        return this.entity.getFurnitureType();
    }
    getAvailableSeats() {
        return this.availableSeats;
    }
    setAvailableSeats(availableSeats) {
        this.availableSeats = Number.parseInt(availableSeats) || 0;
        return 0;
    }
    getCharacters() {
        this._cleanSeats();
        return this.usedSeats;
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
        this.usedSeats.indexOf(characterEntity.id) != -1;
    }
    hasCharacters() {
        this._cleanSeats();
        return this.usedSeats.length;
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
        this.usedSeats.push(characterEntity.id);
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
        delete this.usedSeats.remove(characterEntity.getID());
        return 0;
    }
    _cleanSeats() {
        this.usedSeats.forEach((characterID) => {
            if (CharacterEntity.has(characterID)) {
                if (CharacterEntity.get(characterID).furniture != this.id) {
                    this.usedSeats.remove(characterID);
                }
            }
            else {
                this.usedSeats.remove(characterID);
            }
        });
        return 0;
    }
    clearSeats() {
        this.usedSeats.clear();
        return 0;
    }
    /**
     * Entity lock, not to be confused with the functionality lock.
     * @param {boolean} entityLocked 
     */
    setEntityLocked(entityLocked) {
        this.entityLocked = entityLocked == true;
    }
    isEntityLocked() {
        return this.entityLocked;
    }
    setKey(itemEntity) {
        if (!(itemEntity instanceof ItemEntity)) {
            if (ItemEntity.has(itemEntity)) {
                itemEntity = ItemEntity.get(itemEntity);
            }
            else {
                return 2;
            }
        }
        this.key = itemEntity;
        return 0;
    }
    getKey() {
        return this.key;
    }
    setOpen() {
        this.open = true;
        this.removeHiddenAvailableAction(ActionEnum.CLOSE);
        this.setDefaultAction(ActionEnum.CLOSE);
        this.addHiddenAvailableAction(ActionEnum.OPEN);
    }
    setClose() {
        this.open = false;
        this.removeHiddenAvailableAction(ActionEnum.OPEN);
        this.setDefaultAction(ActionEnum.OPEN);
        this.addHiddenAvailableAction(ActionEnum.CLOSE);
    }
    getOpen() {
        return this.open;
    }


    /**
     * Overrides InstancedEntity.clone
     * @param  {string} id ID
     * @return {InstancedFurnitureEntity} new InstancedFurnitureEntity
     */
    clone(id = "") {
        if (!this.hasEntity()) {
            return 2;
        }
        let clone = new InstancedFurnitureEntity(id, this.entity, this.owner);
        clone.assign(this);
        if (this.hasContainer()) {
            clone.setContainer(this.container.clone(String(clone.id).concat("Container")));
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
    updateID(newID) {
        super.updateID(newID);
        InstancedFurnitureEntity.updateID(this.id, newID);
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
    static updateID(oldID, newID) {
        if (!InstancedFurnitureEntity.has(oldID)) {
            return 1;
        }
        InstancedFurnitureEntity.set(newID, InstancedFurnitureEntity.get(oldID));
        InstancedFurnitureEntity.remove(oldID);
        return 0;
    }
}
InstancedFurnitureEntity.initialize();