class Cell {
    /**
     * Creates a Cell
     * @param  {string} id Unique ID, auto-generated if none given
     * @param  {string} name Name
     */
    constructor(id = "", name = "") {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        this.id = id;
        this.name = null;
        this.setName(name);
        this.owner = null;
        this.hasBackloggedAdditions = false;
        this.backloggedCollisionPlanes = [];
        this.hasBackloggedCollisionPlanes = false;
        this.backloggedCollisionRamps = [];
        this.hasBackloggedCollisionRamps = false;
        this.backloggedCollisionWalls = [];
        this.hasBackloggedCollisionWalls = false;
        this.backloggedMeshes = [];
        this.hasBackloggedMeshes = false;
        this.backloggedDoors = [];
        this.hasBackloggedDoors = false;
        this.backloggedFurniture = [];
        this.hasBackloggedFurniture = false;
        this.backloggedLighting = [];
        this.hasBackloggedLighting = false;
        this.backloggedCharacters = [];
        this.hasBackloggedCharacters = false;
        this.backloggedItems = [];
        this.hasBackloggedItems = false;

        Game.setCell(this.id, this);
    }

    getID() {
        return this.id;
    }
    setID(id) {
        if (this._isLocked) {
            id = Tools.filterID(id);
            if (id.length > 0) {
                this.id = id;
            }
        }
        return this.id;
    }
    setName(name) {
        this.name = Tools.filterName(name);
        return 0;
    }
    getName() {
        return this.name;
    }

    /**
     * Sets Owner
     * @param {CharacterEntity} characterEntity Character, or undefined
     */
    setOwner(characterEntity) {
        if (!(characterEntity instanceof AbstractEntity)) {
            if (Game.hasInstancedEntity(characterEntity)) {
                characterEntity = Game.getInstancedEntity(characterEntity);
            }
            else if (Game.hasEntity(characterEntity)) {
                characterEntity = Game.getEntity(characterEntity);
            }
            else {
                return 2;
            }
        }
        this.owner = characterEntity;
        return 0;
    }
    getOwner() {
        return this.owner;
    }
    hasOwner() {
        return this.owner instanceof AbstractEntity;
    }
    removeOwner() {
        this.owner = null;
        return 0;
    }
    clearOwner() {
        return this.removeOwner();
    }

    addCollisionWall(...parameters) {
        this.backloggedCollisionWalls.push(...parameters);
        this.hasBackloggedCollisionWalls = true;
        this.hasBackloggedAdditions = true;
    }
    addCollisionPlane(...parameters) {
        this.backloggedCollisionPlanes.push(parameters);
        this.hasBackloggedCollisionPlanes = true;
        this.hasBackloggedAdditions = true;
    }
    addCollisionRamp(...parameters) {
        this.backloggedCollisionRamps.push(parameters);
        this.hasBackloggedCollisionRamps = true;
        this.hasBackloggedAdditions = true;
    }
    addMesh(...parameters) {
        this.backloggedMeshes.push(Game.filterCreateMesh(...parameters));
        this.hasBackloggedMeshes = true;
        this.hasBackloggedAdditions = true;
    }
    addCollidableMesh(...parameters) {
        parameters = Game.filterCreateMesh(...parameters);
        parameters[6]["checkCollisions"] = true;
        this.backloggedMeshes.push(parameters);
        this.hasBackloggedMeshes = true;
        this.hasBackloggedAdditions = true;
    }
    addCharacter(...parameters) {
        this.backloggedCharacters.push(Game.filterCreateCharacterInstance(...parameters));
        this.hasBackloggedCharacters = true;
        this.hasBackloggedAdditions = true;
    }
    addDoor(...parameters) {
        this.backloggedDoors.push(Game.filterCreateDoor(...parameters));
        this.hasBackloggedDoors = true;
        this.hasBackloggedAdditions = true;
    }
    addFurniture(...parameters) {
        this.backloggedFurniture.push(Game.filterCreateFurnitureInstance(...parameters));
        this.hasBackloggedFurniture = true;
        this.hasBackloggedAdditions = true;
    }
    addLighting(...parameters) {
        this.backloggedLighting.push(Game.filterCreateLighting(...parameters));
        this.hasBackloggedLighting = true;
        this.hasBackloggedAdditions = true;
    }
    addItem(...parameters) {
        this.backloggedItems.push(Game.filterCreateItemInstance(...parameters));
        this.hasBackloggedItems = true;
        this.hasBackloggedAdditions = true;
    }

    createBackloggedAdditions() {
        if (this.hasBackloggedAdditions) {
            this.hasBackloggedAdditions = false;
            let array = null;
            if (this.hasBackloggedCollisionPlanes) {
                array = this.backloggedCollisionPlanes;
                this.hasBackloggedCollisionPlanes = false;
                this.backloggedCollisionPlanes = [];
                array.forEach(function(addition) {Game.createCollisionPlane(...addition);});
                array.clear();
            }
            if (this.hasBackloggedCollisionRamps) {
                array = this.backloggedCollisionRamps;
                this.hasBackloggedCollisionRamps = false;
                this.backloggedCollisionRamps = [];
                array.forEach(function(addition) {Game.createCollisionRamp(...addition);});
                array.clear();
            }
            if (this.hasBackloggedCollisionWalls) {
                array = this.backloggedCollisionWalls;
                this.hasBackloggedCollisionWalls = false;
                this.backloggedCollisionWalls = [];
                array.forEach(function(addition) {Game.createCollisionWall(...addition);});
                array.clear();
            }
            if (this.hasBackloggedMeshes) {
                array = this.backloggedMeshes;
                this.hasBackloggedMeshes = false;
                this.backloggedMeshes = [];
                array.forEach(function(addition) {Game.createMesh(...addition);});
                array.clear();
            }
            if (this.hasBackloggedDoors) {
                array = this.backloggedDoors;
                this.hasBackloggedDoors = false;
                this.backloggedDoors = [];
                array.forEach(function(addition) {Game.createDoor(...addition);});
                array.clear();
            }
            if (this.hasBackloggedFurniture) {
                array = this.backloggedFurniture;
                this.hasBackloggedFurniture = false;
                this.backloggedFurniture = [];
                array.forEach(function(addition) {Game.createFurnitureInstance(...addition);});
                array.clear();
            }
            if (this.hasBackloggedLighting) {
                array = this.backloggedLighting;
                this.hasBackloggedLighting = false;
                this.backloggedLighting = [];
                array.forEach(function(addition) {Game.createLighting(...addition);});
                array.clear();
            }
            if (this.hasBackloggedCharacters) {
                array = this.backloggedCharacters;
                this.hasBackloggedCharacters = false;
                this.backloggedCharacters = [];
                array.forEach(function(addition) {Game.createCharacterInstance(...addition);});
                array.clear();
            }
            if (this.hasBackloggedItems) {
                array = this.backloggedItems;
                this.hasBackloggedItems = false;
                this.backloggedItems = [];
                array.forEach(function(addition) {Game.createItemInstance(...addition);});
                array.clear();
            }
        }
    }

    dispose() {
        Game.removeCell(this.id);
        return undefined;
    }
}