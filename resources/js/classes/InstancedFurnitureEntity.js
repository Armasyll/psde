class InstancedFurnitureEntity extends InstancedEntity {
    constructor(_id = undefined, _entity = undefined, _owner = undefined) {
        super(_id, _entity);
        if (!(this.entity instanceof Entity)) {
            this.dispose();
            return undefined;
        }

        this.setOwner(_owner);
        this.characters = new Set();

        Game.setFurnitureInstance(this.id, this);
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

    clone(_id) {
        _id = Tools.filterID(_id);
        if (typeof _id != "string") {
            _id = Tools.genUUIDv4();
        }
        return new InstancedFurnitureEntity(_id, this.entity, this.owner);
    }
    dispose() {
        Game.removeFurnitureInstance(this.id);
        super.dispose()
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}