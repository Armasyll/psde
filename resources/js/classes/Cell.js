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
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        this.id = id;
        this.name = "limbo";
        this.setName(name);
        this.cellType = CellTypeEnum.NONE;
        this.owner = null;
        this.skybox = "dayNightCycle";
        this.skyboxAzimuth = 0.25;
        this.skyboxInclination = 0.0;
        this.ambientLightIntensity = 0.9;
        this.hasBackloggedAdditions = false;
        this.backloggedCollisionPlanes = [];
        this.hasBackloggedCollisionPlanes = false;
        this.backloggedCollisionRamps = [];
        this.hasBackloggedCollisionRamps = false;
        this.backloggedCollisionWalls = [];
        this.hasBackloggedCollisionWalls = false;
        this.backloggedMaterials = [];
        this.hasBackloggedMaterials = false;
        this.backloggedTiledMeshes = [];
        this.hasBackloggedTiledMeshes = false;
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
        this.meshIDs = new Set();
        this.collisionMeshIDs = new Set();
        this.controllerIDs = new Set();

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
        this.backloggedCollisionWalls.push(parameters);
        this.hasBackloggedCollisionWalls = true;
        this.hasBackloggedAdditions = true;
        return 1;
    }
    addCollisionPlane(...parameters) {
        this.backloggedCollisionPlanes.push(parameters);
        this.hasBackloggedCollisionPlanes = true;
        this.hasBackloggedAdditions = true;
        return 1;
    }
    addCollisionPlaneByMesh(...parameters) {
        this.backloggedCollisionPlanes.push(parameters);
        this.hasBackloggedCollisionPlanes = true;
        this.hasBackloggedAdditions = true;
        return 1;
    }
    addCollisionRamp(...parameters) {
        this.backloggedCollisionRamps.push(parameters);
        this.hasBackloggedCollisionRamps = true;
        this.hasBackloggedAdditions = true;
        return 1;
    }
    addMaterial(...parameters) {
        this.backloggedMaterials.push(parameters);
        this.hasBackloggedMaterials = true;
        this.hasBackloggedAdditions = true;
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
        this.backloggedMeshes.push([id, meshID, materialID, position, rotation, scaling, options]);
        this.hasBackloggedMeshes = true;
        this.hasBackloggedAdditions = true;
        return 1;
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
    addTiledGround(id = "", meshOptions = {xmin:0, zmin:0, xmax: 1, zmax: 1, subdivisions: {w:1, h:1}}, materialID = "missingMaterial", position = [0,0,0], rotation = [0,0,0], scaling = [1,1,1], options = {"checkCollisions":true}) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        this.meshIDs.add(id);
        this.backloggedTiledMeshes.push([id, meshOptions, materialID, position, rotation, scaling, options]);
        this.hasBackloggedTiledMeshes = true;
        this.hasBackloggedAdditions = true;
        return 1;
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
        options["checkCollisions"] = true;
        this.backloggedMeshes.push([id, meshID, materialID, position, rotation, scaling, options]);
        this.hasBackloggedMeshes = true;
        this.hasBackloggedAdditions = true;
        return 1;
    }
    /**
     * Creates a character mesh, and controller.
     * @param  {string} [id] Unique ID, auto-generated if none given
     * @param  {CharacterEntity} entity Character entity
     * @param  {array} position Position
     * @param  {array} [rotation] Rotation
     * @param  {array} [scaling] Scale
     * @param  {object} [options] Options
     * @return {number} Integer status code
     */
    addCharacter(id = "", entity, position = [0,0,0], rotation = [0,0,0], scaling = [1,1,1], options = {}) {
        if (this.backloggedCharacters.indexOf(id) != -1) {
            return 1;
        }
        if (!(entity instanceof CharacterEntity)) {
            if (CharacterEntity.has(entity)) {
                entity = CharacterEntity.get(entity);
            }
            else {
                return 2;
            }
        }
        this.backloggedCharacters.push([id, entity, position, rotation, scaling, options]);
        this.hasBackloggedCharacters = true;
        this.hasBackloggedAdditions = true;
        return 1;
    }
    /**
     * Creates a DoorController, DoorEntity, and InstancedMesh
     * @param  {string} [id] Unique ID, auto-generated if none given
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
    addDoor(id = "", name = "", teleportMarker = null, meshID = "missingMesh", materialID = "missingMaterial", position = [0,0,0], rotation = [0,0,0], scaling = [1,1,1], options = {}) {
        if (this.backloggedDoors.indexOf(id) != -1) {
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
        this.backloggedDoors.push([id, name, teleportMarker, meshID, materialID, position, rotation, scaling, options]);
        this.hasBackloggedDoors = true;
        this.hasBackloggedAdditions = true;
        return 1;
    }
    /**
     * Creates a FurnitureController, FurnitureEntity, and InstancedMesh
     * @param  {string} [id] Unique ID, auto-generated if none given
     * @param  {FurnitureEntity} entity Furniture entity
     * @param  {array} position Position
     * @param  {array} [rotation] Rotation
     * @param  {array} [scaling] Scaling
     * @param  {object} [options] Options
     * @return {number} Integer status code
     */
    addFurniture(id = "", entity, position = [0,0,0], rotation = [0,0,0], scaling = [1,1,1], options = {}) {
        if (this.backloggedFurniture.indexOf(id) != -1) {
            return 1;
        }
        if (!(entity instanceof FurnitureEntity)) {
            if (FurnitureEntity.has(entity)) {
                entity = FurnitureEntity.get(entity);
            }
            else {
                return 2;
            }
        }
        this.meshIDs.add(entity.meshID);
        this.backloggedFurniture.push([id, entity, position, rotation, scaling, options]);
        this.hasBackloggedFurniture = true;
        this.hasBackloggedAdditions = true;
        return 1;
    }
    /**
     * Creates a LightingEntity, LightingEntity, and InstancedMesh
     * @param {string} [id] Unique ID, auto-generated if none given
     * @param {LightingEntity} entity Lighting entity
     * @param {array} position Position
     * @param {array} [rotation] Rotation
     * @param {array} [scaling] Scaling
     * @param {object} [options] Options
     * @returns {number} Integer status code
     */
    addLighting(id = "", entity = "", position = [0,0,0], rotation = [0,0,0], scaling = [1,1,1], options = {}) {
        if (this.backloggedLighting.indexOf(id) != -1) {
            return 1;
        }
        if (!(entity instanceof LightingEntity)) {
            if (LightingEntity.has(entity)) {
                entity = LightingEntity.get(entity);
            }
            else {
                return 2;
            }
        }
        this.meshIDs.add(entity.meshID);
        this.backloggedLighting.push([id, entity, position, rotation, scaling, options]);
        this.hasBackloggedLighting = true;
        this.hasBackloggedAdditions = true;
        return 1;
    }
    /**
     * Places, or creates from an ItemEntity, an InstancedItemEntity in the world at the given position.
     * @param {string} [id] Unique ID, auto-generated if none given
     * @param {(AbstractEntity|string)} entity Abstract entity; preferably an InstancedItemEntity
     * @param {array} position Position
     * @param {array} [rotation] Rotation
     * @param {array} [scaling] Scaling
     * @param {object} [options] Options
     * @returns {number} Integer status code
     */
    addItem(id = "", entity, position = [0,0,0], rotation = [0,0,0], scaling = [1,1,1], options = {}) {
        if (this.backloggedItems.indexOf(id) != -1) {
            return 1;
        }
        if (!(entity instanceof AbstractEntity)) {
            if (AbstractEntity.has(entity)) {
                entity = AbstractEntity.get(entity);
            }
            else {
                return 2;
            }
        }
        this.backloggedItems.push([id, entity, position, rotation, scaling, options]);
        this.hasBackloggedItems = true;
        this.hasBackloggedAdditions = true;
        return 1;
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
            obj[property] = this._objectifyProperty(this[property]);
        }
        return obj;
    }
    _objectifyProperty(property) {
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
        else if (property instanceof CharacterClass) {
            obj = property.id;
        }
        else if (property instanceof Container) {
            obj = this._objectifyProperty(property.items);
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
                obj.push(this._objectifyProperty(entry));
            });
        }
        else if (property instanceof Array) {
            obj = [];
            property.forEach((entry) => {
                obj.push(this._objectifyProperty(entry));
            });
        }
        else if (property instanceof Object) {
            obj = {};
            for (let entry in property) {
                obj[entry] = this._objectifyProperty(property[entry]);
            }
        }
        else {
            obj = property;
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

    static initialize() {
        Cell.debugMode = false;
        Cell.cellList = {};
    }
    static createLimbo() {
        let limbo = new Cell("limbo", "Limbo");
        limbo.addCollisionPlane({x:-512,z:-512}, {x:512,z:512}, 0);
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