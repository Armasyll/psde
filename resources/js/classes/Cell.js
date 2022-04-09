/**
 * Cell
 * @class
 * @typedef {Object} Cell
 */
class Cell {
    /**
     * Creates a Cell
     * @param {string} id Unique ID, auto-generated if none given
     * @param {string} name Name
     */
    constructor(id = "", name = "") {
        id = Tools.filterID(id, Tools.genUUIDv4());
        this.id = id;
        this.name = "limbo";
        this.setName(name);
        this.cellType = CellTypeEnum.NONE;
        this.owner = null;
        this.skybox = "dayNightCycle";
        this.skyboxAzimuth = 0.25;
        this.skyboxInclination = 0.0;
        this.ambientLightIntensity = 0.9;
        this.collisionPlanes = [];
        this.collisionRamps = [];
        this.collisionWalls = [];
        this.materials = [];
        this.tiledMeshes = [];
        this.meshes = [];
        this.doors = [];
        this.furniture = [];
        this.lighting = [];
        this.displays = [];
        this.characters = [];
        this.creatures = [];
        this.items = [];
        this.instancedEntities = [];
        this.meshIDs = new Set();
        this.materialIDs = new Set();
        this.collisionMeshIDs = new Set();

        Cell.set(this.id, this);
    }

    getID() {
        return this.id;
    }
    getType() {
        return this.cellType;
    }
    setType(cellType) {
        if (CellTypeEnum.properties.hasOwnProperty(cellType)) {
            this.cellType = cellType;
        }
        else {
            this.cellType = CellTypeEnum.NONE;
        }
        return 0;
    }
    setName(name) {
        this.name = Tools.filterName(name);
        return 0;
    }
    getName() {
        return this.name;
    }
    getSkybox() {
        return this.skybox;
    }
    setSkybox(skybox) {
        this.skybox = skybox;
        return 0;
    }

    /**
     * Sets Owner
     * @param {CharacterEntity} characterEntity Character, or undefined
     */
    setOwner(characterEntity) {
        if (!(characterEntity instanceof AbstractEntity)) {
            if (InstancedEntity.has(characterEntity)) {
                characterEntity = InstancedEntity.get(characterEntity);
            }
            else if (Entity.has(characterEntity)) {
                characterEntity = Entity.get(characterEntity);
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
        this.collisionWalls.push(parameters);
        return 0;
    }
    addCollisionPlane(...parameters) {
        this.collisionPlanes.push(parameters);
        return 0;
    }
    addCollisionPlaneByMesh(...parameters) {
        this.collisionPlanes.push(parameters);
        return 0;
    }
    addCollisionRamp(...parameters) {
        this.collisionRamps.push(parameters);
        return 0;
    }
    addMaterial(...parameters) {
        this.materials.push(parameters);
        return 0;
    }
    /**
     * Creates a mesh from those stored in loadedMeshes
     * @param  {string} id New ID for Mesh and EntityController
     * @param  {string} meshID String ID of Mesh to create
     * @param  {string} [materialID] String ID of Material to apply to Mesh
     * @param  {array} position Mesh position
     * @param  {array} [rotation] Mesh rotation
     * @param  {array} [scaling] Mesh scaling
     * @param  {object} [options] Options
     * @return {number} Integer status code
     */
    addMesh(id = "", meshID = "missingMesh", materialID = "missingMaterial", position = [0,0,0], rotation = [0,0,0], scaling = [1,1,1], options = {}) {
        this.meshIDs.add(meshID);
        this.materialIDs.add(materialID);
        this.meshes.push([id, meshID, materialID, position, rotation, scaling, options]);
        return 0;
    }
    /**
     * 
     * @param {string} id 
     * @param {(object|array)} meshOptions 
     * @example [1] creats a tiled mesh of 1 x 1 metres, with a subdivision of 1 x 1
     * @example [2, 3] creates a tiled mesh of 2 x 3 metres, with a subdivision of 2 x 3
     * @example [2, 3, 4, 6] creates a tiled mesh of 2 x 3, with a subdivision of 4 x 6
     * @param {string} material 
     * @param {array} position 
     * @param {array} [rotation] 
     * @param {array} [scaling] 
     * @param {object} [options] 
     */
    addTiledGround(id = "", meshOptions = {"xmin":0, "zmin":0, "xmax": 1, "zmax": 1, "subdivisions": {"w":1, "h":1}}, materialID = "missingMaterial", position = [0,0,0], rotation = [0,0,0], scaling = [1,1,1], options = {"checkCollisions":true}) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        this.meshIDs.add(id);
        this.materialIDs.add(materialID);
        if (meshOptions instanceof Array) {
            switch (meshOptions.length) {
                case 1: {
                    meshOptions = {"xmin":0, "zmin":0, "xmax": meshOptions[0], "zmax": meshOptions[0], "subdivisions": {"w":meshOptions[0], "h":meshOptions[0]}};
                    break;
                }
                case 2: {
                    meshOptions = {"xmin":0, "zmin":0, "xmax": meshOptions[0], "zmax": meshOptions[1], "subdivisions": {"w":meshOptions[0], "h":meshOptions[1]}}
                    break;
                }
                case 4: {
                    meshOptions = {"xmin":0, "zmin":0, "xmax": meshOptions[0], "zmax": meshOptions[1], "subdivisions": {"w":meshOptions[2], "h":meshOptions[3]}}
                    break;
                }
                default: {
                    meshOptions = {"xmin":0, "zmin":0, "xmax": 1, "zmax": 1, "subdivisions": {"w":1, "h":1}};
                }
            }
        }
        this.tiledMeshes.push([id, meshOptions, materialID, position, rotation, scaling, options]);
        return 0;
    }
    /**
     * 
     * @param {string} id 
     * @param {object} meshOptions 
     * @param {string} material 
     * @param {array} position 
     * @param {array} [rotation] 
     * @param {array} [scaling] 
     * @param {object} [options] 
     */
    addTiledCeiling(id = "", meshOptions = {xmin:0, zmin:0, xmax: 1, zmax: 1, subdivisions: {w:1, h:1}}, materialID = "missingMaterial", position = [0,0,0], rotation = [0,0,0], scaling = [1,1,1], options) {
        scaling[1] *= -1;
        return this.addTiledGround(id, meshOptions, materialID, position, rotation, scaling, options);
    }
    /**
     * Creates a mesh from those stored in loadedMeshes
     * @param  {string} id New ID for Mesh and EntityController
     * @param  {string} meshID String ID of Mesh to create
     * @param  {string} [materialID] String ID of Material to apply to Mesh
     * @param  {array} position Mesh position
     * @param  {array} [rotation] Mesh rotation
     * @param  {array} [scaling] Mesh scaling
     * @param  {object} [options] Options
     * @return {number} Integer status code
     */
    addCollidableMesh(id = "", meshID = "", materialID = "", position = [0,0,0], rotation = [0,0,0], scaling = [1,1,1], options = {}) {
        this.meshIDs.add(meshID);
        this.materialIDs.add(materialID);
        options["checkCollisions"] = true;
        this.meshes.push([id, meshID, materialID, position, rotation, scaling, options]);
        return 0;
    }
    /**
     * Creates an entry for a Creature controller
     * @param  {string} [instanceID] Unique ID, auto-generated if none given
     * @param  {string} entityID Creature entity
     * @param  {array} position Position
     * @param  {array} [rotation] Rotation
     * @param  {array} [scaling] Scale
     * @param  {object} [options] Options
     * @return {number} Integer status code
     */
    addCreature(instanceID = "", entityID, position = [0,0,0], rotation = [0,0,0], scaling = [1,1,1], options = {}) {
        instanceID = Tools.filterID(instanceID, Tools.genUUIDv4());
        if (this.creatures.indexOf(instanceID) != -1) {
            return 1;
        }
        if (!CreatureEntity.has(entityID)) {
            return 1;
        }
        let entity = CreatureEntity.get(entityID);
        this.meshIDs.add(entity.meshID);
        this.materialIDs.add(entity.materialID);
        this.creatures.push([instanceID, entityID, position, rotation, scaling, options]);
        this.instancedEntities.push(instanceID);
        return 0;
    }
    /**
     * Creates an entry for a Character controller
     * @param  {string} [instanceID] Unique ID, auto-generated if none given
     * @param  {string} entityID Character entity
     * @param  {array} position Position
     * @param  {array} [rotation] Rotation
     * @param  {array} [scaling] Scale
     * @param  {object} [options] Options
     * @return {number} Integer status code
     */
    addCharacter(instanceID = "", entityID, position = [0,0,0], rotation = [0,0,0], scaling = [1,1,1], options = {}) {
        instanceID = Tools.filterID(instanceID, Tools.genUUIDv4());
        if (this.characters.indexOf(instanceID) != -1) {
            return 1;
        }
        if (!CharacterEntity.has(entityID)) {
            return 1;
        }
        let entity = CharacterEntity.get(entityID);
        this.meshIDs.add(entity.meshID);
        this.materialIDs.add(entity.materialID);
        this.characters.push([instanceID, entityID, position, rotation, scaling, options]);
        this.instancedEntities.push(instanceID);
        return 0;
    }
    /**
     * Creates an entry for a Door controller
     * @param  {string} [entityID] Unique ID, auto-generated if none given
     * @param  {string} [name] Name
     * @param  {object} [teleportMarker] Future movement between cells
     * @param  {string} [meshID] Mesh ID
     * @param  {string} [materialID] Texture ID
     * @param  {array} position Position
     * @param  {array} [rotation] Rotation
     * @param  {array} [scaling] Scaling
     * @param  {object} [options] Options
     * @return {number} Integer status code
     */
    addDoor(entityID = "", name = "", teleportMarker = null, meshID = "missingMesh", materialID = "missingMaterial", position = [0,0,0], rotation = [0,0,0], scaling = [1,1,1], options = {}) {
        entityID = Tools.filterID(entityID, Tools.genUUIDv4());
        if (this.doors.indexOf(entityID) != -1) {
            return 1;
        }
        if (!(options instanceof Object)) {
            options = {};
        }
        options["locked"] = options["locked"] == true;
        if (options["key"] == null || options["key"] instanceof AbstractEntity) {}
        else if (AbstractEntity.has(options["key"])) {
            options["key"] = AbstractEntity.get(options["key"]);
        }
        else {
            options["key"] = null;
        }
        options["opensInward"] = options["opensInward"] == true;
        options["open"] = options["open"] == true;
        options["checkCollisions"] = options["checkCollisions"] == true;
        this.meshIDs.add(meshID);
        this.materialIDs.add(materialID);
        this.doors.push([entityID, name, teleportMarker, meshID, materialID, position, rotation, scaling, options]);
        this.instancedEntities.push(entityID);
        return 0;
    }
    /**
     * Creates an entry for a Furniture controller
     * @param  {string} [instanceID] Unique ID, auto-generated if none given
     * @param  {string} entityID Furniture entity
     * @param  {array} position Position
     * @param  {array} [rotation] Rotation
     * @param  {array} [scaling] Scaling
     * @param  {object} [options] Options
     * @return {number} Integer status code
     */
    addFurniture(instanceID = "", entityID, position = [0,0,0], rotation = [0,0,0], scaling = [1,1,1], options = {}) {
        instanceID = Tools.filterID(instanceID, Tools.genUUIDv4());
        if (this.furniture.indexOf(instanceID) != -1) {
            return 1;
        }
        if (!FurnitureEntity.has(entityID)) {
            return 1;
        }
        let entity = FurnitureEntity.get(entityID);
        this.meshIDs.add(entity.meshID);
        this.materialIDs.add(entity.materialID);
        this.furniture.push([instanceID, entityID, position, rotation, scaling, options]);
        this.instancedEntities.push(instanceID);
        return 0;
    }
    /**
     * Creates an entry for a Lighting controller
     * @param {string} [instanceID] Unique ID, auto-generated if none given
     * @param {LightingEntity} entityID Lighting entity
     * @param {array} position Position
     * @param {array} [rotation] Rotation
     * @param {array} [scaling] Scaling
     * @param {object} [options] Options
     * @returns {number} Integer status code
     */
    addLighting(instanceID = "", entityID = "", position = [0,0,0], rotation = [0,0,0], scaling = [1,1,1], options = {}) {
        instanceID = Tools.filterID(instanceID, Tools.genUUIDv4());
        if (this.lighting.indexOf(instanceID) != -1) {
            return 1;
        }
        if (!LightingEntity.has(entityID)) {
            return 1;
        }
        let entity = LightingEntity.get(entityID);
        this.meshIDs.add(entity.meshID);
        this.materialIDs.add(entity.materialID);
        this.lighting.push([instanceID, entityID, position, rotation, scaling, options]);
        this.instancedEntities.push(instanceID);
        return 0;
    }
    /**
     * Creates an entry for a Display controller
     * @param {string} [instanceID] Unique ID, auto-generated if none given
     * @param {string} entityID Display entity
     * @param {array} position Position
     * @param {array} [rotation] Rotation
     * @param {array} [scaling] Scaling
     * @param {object} [options] Options
     * @returns {number} Integer status code
     */
    addDisplay(instanceID = "", entityID = "", position = [0,0,0], rotation = [0,0,0], scaling = [1,1,1], options = {}) {
        instanceID = Tools.filterID(instanceID, Tools.genUUIDv4());
        if (this.lighting.indexOf(instanceID) != -1) {
            return 1;
        }
        if (!DisplayEntity.has(entityID)) {
            return 1;
        }
        let entity = DisplayEntity.get(entityID);
        this.meshIDs.add(entity.meshID);
        this.materialIDs.add(entity.materialID);
        this.displays.push([instanceID, entityID, position, rotation, scaling, options]);
        this.instancedEntities.push(instanceID);
        return 0;
    }
    /**
     * Places, or creates from an ItemEntity, an InstancedItemEntity in the world at the given position.
     * @param {string} [instanceID] Unique ID, auto-generated if none given
     * @param {string} entityID Abstract entity; preferably an InstancedItemEntity
     * @param {array} position Position
     * @param {array} [rotation] Rotation
     * @param {array} [scaling] Scaling
     * @param {object} [options] Options
     * @returns {number} Integer status code
     */
    addItem(instanceID = "", entityID = "", position = [0,0,0], rotation = [0,0,0], scaling = [1,1,1], options = {}) {
        instanceID = Tools.filterID(instanceID, Tools.genUUIDv4());
        if (this.items.indexOf(instanceID) != -1) {
            return 1;
        }
        if (!ItemEntity.has(entityID)) {
            return 1;
        }
        let entity = ItemEntity.get(entityID);
        this.meshIDs.add(entity.meshID);
        this.materialIDs.add(entity.materialID);
        this.items.push([instanceID, entityID, position, rotation, scaling, options]);
        this.instancedEntities.push(instanceID);
        return 0;
    }

    getMeshIDs() {
        return this.meshIDs;
    }
    getCollisionMeshIDs() {
        return this.collisionMeshIDs;
    }
    meshIDDifference(cell) {
        return new Set([cell.getMeshIDs()].filter(meshID => !this.meshIDs.has(meshID)));
    }
    meshIDIntersection(cell) {
        return new Set([cell.getMeshIDs()].filter(meshID => this.meshIDs.has(meshID)));
    }
    createBarrier(limit = 512) {
        this.addCollisionPlane(String(this.id).concat("CeilingBarrier"), [-limit, -limit], [limit, limit], limit);
        this.addCollisionPlane(String(this.id).concat("FloorBarrier"), [-limit, -limit], [limit, limit], -limit);
        this.addCollisionWall(String(this.id).concat("NorthBarrier"), [-limit, -limit, limit], [limit, limit, limit]);
        this.addCollisionWall(String(this.id).concat("EastBarrier"), [limit, -limit, limit], [limit, limit, -limit]);
        this.addCollisionWall(String(this.id).concat("SouthBarrier"), [-limit, -limit, -limit], [limit, limit, -limit]);
        this.addCollisionWall(String(this.id).concat("WestBarrier"), [-limit, -limit, -limit], [-limit, limit, limit]);
    }

    stringify() {
        return JSON.stringify(this.objectify());
    }
    objectifyMinimal() {
        return this.objectify();
    }
    objectify() {
        let obj = {};
        for (let property in this) {
            obj[property] = Cell.objectifyProperty(this[property]);
        }
        return obj;
    }

    dispose() {
        Cell.remove(this.id);
        return undefined;
    }
    getClassName() {
        return "Cell";
    }

    static objectifyProperty(property) {
        let obj = null;
        if (property instanceof AbstractEntity) {
            obj = property.id;
        }
        else if (property instanceof ActionData) {
            obj = property.action;
        }
        else if (property instanceof Cell) {
            obj = property.id;
        }
        else if (property instanceof Container) {
            obj = Cell.objectifyProperty(property.items);
        }
        else if (property instanceof Cosmetic) {
            obj = property.id;
        }
        else if (property instanceof Dialogue) {
            obj = property.id;
        }
        else if (property instanceof Effect) {
            obj = property.id;
        }
        else if (property instanceof Spell) {
            obj = property.id;
        }
        else if (property instanceof Set) {
            obj = [];
            property.forEach((entry) => {
                obj.push(Cell.objectifyProperty(entry));
            });
        }
        else if (property instanceof Array) {
            obj = [];
            property.forEach((entry) => {
                obj.push(Cell.objectifyProperty(entry));
            });
        }
        else if (property instanceof Object) {
            obj = {};
            for (let entry in property) {
                obj[entry] = Cell.objectifyProperty(property[entry]);
            }
        }
        else {
            obj = property;
        }
        return obj;
    }
    static initialize() {
        Cell.debugMode = false;
        Cell.cellList = {};
    }
    static createLimbo() {
        let limbo = new Cell("limbo", "Limbo");
        limbo.createBarrier(32);
        limbo.addCollisionPlane({x:-512,z:-512}, {x:512,z:512}, -0.125);
        limbo.addCollisionWall([-512, -512, 512], [512, 512, 512]);
        limbo.addCollisionWall([512, -512, 512], [512, 512, -512]);
        limbo.addCollisionWall([-512, -512, -512], [512, 512, -512]);
        limbo.addCollisionWall([-512, -512, -512], [-512, 512, 512]);
        return 0;
    }
    static get(id) {
        if (Cell.has(id)) {
            return Cell.cellList[id];
        }
        return 1;
    }
    static has(id) {
        return Cell.cellList.hasOwnProperty(id);
    }
    static set(id, cell) {
        Cell.cellList[id] = cell;
        return 0;
    }
    static remove(id) {
        delete Cell.cellList[id];
        return 0;
    }
    static list() {
        return Cell.cellList;
    }
    static clear() {
        for (let i in Cell.cellList) {
            Cell.cellList[i].dispose();
        }
        Cell.cellList = {};
        return 0;
    }

    static MeshIDDifference(cellA, cellB) {
        return cellA.meshIDDifference(cellB);
    }
    static MeshIDIntersection(cellA, cellB) {
        return cellA.meshIDIntersection(cellB);
    }
}
Cell.initialize();
Cell.createLimbo();