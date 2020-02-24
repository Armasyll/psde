class InstancedFurnitureEntity extends InstancedEntity {
    constructor(_id = undefined, _entity = undefined, _owner = undefined) {
        super(_id, _entity);
        if (!(this.entity instanceof Entity)) {
            this.dispose();
            return undefined;
        }

        this.setOwner(_owner);
        this.characters = new Set();

        InstancedFurnitureEntity.set(this.id, this);
    }

    getFurnitureType() {
        return this.entity.getFurnitureType();
    }

    getCharacters() {
        return this.characters;
    }
    hasCharacters() {
        return this.characters.size > 0;
    }
    addCharacter(characterEntity) {
        if (characterEntity instanceof CharacterEntity) {
            this.characters.add(characterEntity);
        }
        return this;
    }
    removeCharacter(characterEntity) {
        if (characterEntity instanceof CharacterEntity) {
            this.characters.remove(characterEntity);
        }
        return this;
    }

    /**
     * Overrides InstancedEntity.clone
     * @param  {string} id ID
     * @return {InstancedFurnitureEntity} new InstancedFurnitureEntity
     */
    clone(id = "") {
        return new InstancedFurnitureEntity(id, this.entity, this.owner);
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
        super.dispose()
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
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