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
        this.cellType = CellTypeEnum.NONE;
        this.owner = null;
        this.skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1024.0}, Game.scene);
        this.skyboxMaterial = new BABYLON.SkyMaterial("skyMaterial", Game.scene);
        this.skyboxMaterial.backFaceCulling = false;
        this.skyboxMaterial.azimuth = 0.25;
        this.skyboxMaterial.inclination = 0.0;
        this.skybox.material = this.skyboxMaterial;
        this.ambientLight = new BABYLON.HemisphericLight("cellAmbientLight", new BABYLON.Vector3(0, 1, 0), Game.scene);
        this.ambientLight.intensity = 0.9;
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
        this.meshIDs = new Set();
        this.collisionMeshIDs = new Set();
        this.meshes = new Array();

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
    getSkyboxMaterial() {
        return this.skyboxMaterial;
    }
    getSkybox() {
        return Game.skybox;
    }
    setSkybox(skyboxMaterial) {
        this.skyboxMaterial = skyboxMaterial;
        Game.skybox.material = skyboxMaterial;
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
        if (Game.playerCell == this) {
            let mesh = Game.createCollisionWall(...parameters);
            if (mesh instanceof BABYLON.AbstractMesh) {
                this.collisionMeshIDs.add(mesh.id);
                this.meshes.push(mesh);
            }
            return 0;
        }
        this.backloggedCollisionWalls.push(parameters);
        this.hasBackloggedCollisionWalls = true;
        this.hasBackloggedAdditions = true;
        return 1;
    }
    addCollisionPlane(...parameters) {
        if (Game.playerCell == this) {
            let mesh = Game.createCollisionPlane(...parameters);
            if (mesh instanceof BABYLON.AbstractMesh) {
                this.collisionMeshIDs.add(mesh.id);
                this.meshes.push(mesh);
            }
            return 0;
        }
        this.backloggedCollisionPlanes.push(parameters);
        this.hasBackloggedCollisionPlanes = true;
        this.hasBackloggedAdditions = true;
        return 1;
    }
    addCollisionRamp(...parameters) {
        if (Game.playerCell == this) {
            let mesh = Game.createCollisionRamp(...parameters);
            if (mesh instanceof BABYLON.AbstractMesh) {
                this.collisionMeshIDs.add(mesh.id);
                this.meshes.push(mesh);
            }
            return 0;
        }
        this.backloggedCollisionRamps.push(parameters);
        this.hasBackloggedCollisionRamps = true;
        this.hasBackloggedAdditions = true;
        return 1;
    }
    /**
     * Creates a mesh from those stored in loadedMeshes
     * @param  {string} id New ID for BABYLON.Mesh and EntityController
     * @param  {string} meshID String ID of Mesh to create
     * @param  {string} [materialID] String ID of Material to apply to Mesh
     * @param  {BABYLON.Vector3} position Mesh position
     * @param  {BABYLON.Vector3} [rotation] Mesh rotation
     * @param  {BABYLON.Vector3} [scaling] Mesh scaling
     * @param  {object} [options] Options
     * @return {number} Integer status code
     */
    addMesh(...parameters) {
        if (Game.debugMode) console.log(`Running Cell(${this.id}).addMesh(${parameters})`);
        parameters = Game.filterCreateMesh(...parameters);
        if (typeof parameters == "number") {
            return 2;
        }
        this.meshIDs.add(parameters[1]);
        if (Game.playerCell == this) {
            if (Game.hasLoadedMesh(parameters[1])) {
                let mesh = Game.createMesh(...parameters);
                if (mesh instanceof BABYLON.AbstractMesh) {
                    this.meshes.push(mesh);
                }
                return 0;
            }
            else {
                Game.loadMesh(parameters[1]);
            }
        }
        this.backloggedMeshes.push(parameters);
        this.hasBackloggedMeshes = true;
        this.hasBackloggedAdditions = true;
        return 1;
    }
    /**
     * Creates a mesh from those stored in loadedMeshes
     * @param  {string} id New ID for BABYLON.Mesh and EntityController
     * @param  {string} meshID String ID of Mesh to create
     * @param  {string} [materialID] String ID of Material to apply to Mesh
     * @param  {BABYLON.Vector3} position Mesh position
     * @param  {BABYLON.Vector3} [rotation] Mesh rotation
     * @param  {BABYLON.Vector3} [scaling] Mesh scaling
     * @param  {object} [options] Options
     * @return {number} Integer status code
     */
    addCollidableMesh(...parameters) {
        parameters = Game.filterCreateMesh(...parameters);
        if (typeof parameters == "number") {
            return 2;
        }
        this.meshIDs.add(parameters[1]);
        if (Game.playerCell == this) {
            if (Game.hasLoadedMesh(parameters[1])) {
                let mesh = Game.createCollidableMesh(...parameters);
                if (mesh instanceof BABYLON.AbstractMesh) {
                    this.meshes.push(mesh);
                }
                return 0;
            }
            else {
                Game.loadMesh(parameters[1]);
            }
        }
        parameters[6]["checkCollisions"] = true;
        this.backloggedMeshes.push(parameters);
        this.hasBackloggedMeshes = true;
        this.hasBackloggedAdditions = true;
        return 1;
    }
    /**
     * Creates a character mesh, and controller.
     * @param  {string} [id] Unique ID, auto-generated if none given
     * @param  {CharacterEntity} characterEntity Character entity
     * @param  {BABYLON.Vector3} position Position
     * @param  {BABYLON.Vector3} [rotation] Rotation
     * @param  {BABYLON.Vector3} [scaling] Scale
     * @param  {object} [options] Options
     * @return {number} Integer status code
     */
    addCharacter(...parameters) {
        if (this.backloggedCharacters.indexOf(parameters[0]) != -1) {
            return 1;
        }
        if (typeof parameters[5] != "object" || !parameters[5].hasOwnProperty("filtered")) {
            parameters = Game.filterCreateCharacterInstance(...parameters);
        }
        if (typeof parameters == "number" || !(parameters[1] instanceof CharacterEntity)) {
            if (CharacterEntity.has(parameters[1])) {
                parameters[1] = CharacterEntity.get(parameters[1]);
            }
            else {
                return 2;
            }
        }
        if (Game.playerCell == this) {
            if (Game.hasLoadedMesh(parameters[1].getMeshID())) {
                let controller = Game.createCharacterInstance(...parameters).getController();
                this.meshes.push(controller.getMesh());
                return 0;
            }
            else {
                Game.loadMesh(parameters[1].getMeshID());
            }
        }
        this.backloggedCharacters.push(parameters);
        this.hasBackloggedCharacters = true;
        this.hasBackloggedAdditions = true;
        return 1;
    }
    /**
     * Creates a DoorController, DoorEntity, and BABYLON.InstancedMesh
     * @param  {string} [id] Unique ID, auto-generated if none given
     * @param  {string} [name] Name
     * @param  {object} [to] Future movement between cells
     * @param  {string} [meshID] Mesh ID
     * @param  {string} [materialID] Texture ID
     * @param  {BABYLON.Vector3} position Position
     * @param  {BABYLON.Vector3} [rotation] Rotation
     * @param  {BABYLON.Vector3} [scaling] Scaling
     * @param  {object} [options] Options
     * @return {number} Integer status code
     */
    addDoor(...parameters) {
        if (this.backloggedDoors.indexOf(parameters[0]) != -1) {
            return 1;
        }
        if (typeof parameters[8] != "object" || !parameters[8].hasOwnProperty("filtered")) {
            parameters = Game.filterCreateDoor(...parameters);
        }
        if (typeof parameters == "number") {
            return 2;
        }
        this.meshIDs.add(parameters[3]);
        if (Game.playerCell == this) {
            if (Game.hasLoadedMesh(parameters[3])) {
                let controller = Game.createDoor(...parameters);
                this.meshes.push(controller.getMesh());
                return 0;
            }
            else {
                Game.loadMesh(parameters[3]);
            }
        }
        this.backloggedDoors.push(parameters);
        this.hasBackloggedDoors = true;
        this.hasBackloggedAdditions = true;
        return 1;
    }
    /**
     * Creates a FurnitureController, FurnitureEntity, and BABYLON.InstancedMesh
     * @param  {string} [id] Unique ID, auto-generated if none given
     * @param  {FurnitureEntity} furnitureEntity Furniture entity
     * @param  {BABYLON.Vector3} position Position
     * @param  {BABYLON.Vector3} [rotation] Rotation
     * @param  {BABYLON.Vector3} [scaling] Scaling
     * @param  {object} [options] Options
     * @return {number} Integer status code
     */
    addFurniture(...parameters) {
        if (this.backloggedFurniture.indexOf(parameters[0]) != -1) {
            return 1;
        }
        if (typeof parameters[5] != "object" || !parameters[5].hasOwnProperty("filtered")) {
            parameters = Game.filterCreateFurnitureInstance(...parameters);
        }
        if (typeof parameters == "number" || !(parameters[1] instanceof InstancedFurnitureEntity)) {
            return 2;
        }
        this.meshIDs.add(parameters[1].getMeshID());
        if (Game.playerCell == this) {
            if (Game.hasLoadedMesh(parameters[1].getMeshID())) {
                let controller = Game.createFurnitureInstance(...parameters);
                this.meshes.push(controller.getMesh());
                return 0;
            }
            else {
                Game.loadMesh(parameters[1].getMeshID());
            }
        }
        this.backloggedFurniture.push(parameters);
        this.hasBackloggedFurniture = true;
        this.hasBackloggedAdditions = true;
        return 1;
    }
    /**
     * Creates a LightingEntity, LightingEntity, and BABYLON.InstancedMesh
     * @param {string} [id] Unique ID, auto-generated if none given
     * @param {string} name Name
     * @param {string} meshID Mesh ID
     * @param {string} [materialID] Texture ID
     * @param {number} [lightingType] IDK yet :v; TODO: this
     * @param {BABYLON.Vector3} position Position
     * @param {BABYLON.Vector3} [rotation] Rotation
     * @param {BABYLON.Vector3} [scaling] Scaling
     * @param {object} [options] Options
     * @returns {number} Integer status code
     */
    addLighting(...parameters) {
        if (this.backloggedLighting.indexOf(parameters[0]) != -1) {
            return 1;
        }
        if (typeof parameters[8] != "object" || !parameters[8].hasOwnProperty("filtered")) {
            parameters = Game.filterCreateLighting(...parameters);
        }
        if (typeof parameters == "number") {
            return 2;
        }
        this.meshIDs.add(parameters[2]);
        if (Game.playerCell == this) {
            if (Game.hasLoadedMesh(parameters[2])) {
                let controller = Game.createLighting(...parameters);
                this.meshes.push(controller.getMesh());
                return 0;
            }
            else {
                Game.loadMesh(parameters[2]);
            }
        }
        this.backloggedLighting.push(parameters);
        this.hasBackloggedLighting = true;
        this.hasBackloggedAdditions = true;
        return 1;
    }
    /**
     * Places, or creates from an ItemEntity, an InstancedItemEntity in the world at the given position.
     * @param {string} [id] Unique ID, auto-generated if none given
     * @param {(AbstractEntity|string)} abstractEntity Abstract entity; preferably an InstancedItemEntity
     * @param {BABYLON.Vector3} position Position
     * @param {BABYLON.Vector3} [rotation] Rotation
     * @param {BABYLON.Vector3} [scaling] Scaling
     * @param {object} [options] Options
     * @returns {number} Integer status code
     */
    addItem(...parameters) {
        if (this.backloggedItems.indexOf(parameters[0]) != -1) {
            return 1;
        }
        if (typeof parameters[5] != "object" || !parameters[5].hasOwnProperty("filtered")) {
            parameters = Game.filterCreateItemInstance(...parameters);
        }
        if (typeof parameters == "number" || !(parameters[1] instanceof InstancedItemEntity)) {
            return 2;
        }
        if (Game.playerCell == this) {
            if (Game.hasLoadedMesh(parameters[1].getMeshID())) {
                let controller = Game.createItemInstance(...parameters);
                this.meshes.push(controller.getMesh());
                return 0;
            }
            else {
                Game.loadMesh(parameters[1].getMeshID());
            }
        }
        this.backloggedItems.push(parameters);
        this.hasBackloggedItems = true;
        this.hasBackloggedAdditions = true;
        return 1;
    }

    createBackloggedAdditions() {
        if (this.hasBackloggedAdditions) {
            this.hasBackloggedAdditions = false;
            let array = null;
            if (this.hasBackloggedCollisionPlanes) {
                array = this.backloggedCollisionPlanes;
                this.hasBackloggedCollisionPlanes = false;
                this.backloggedCollisionPlanes = [];
                array.forEach((addition) => {this.addCollisionPlane(...addition);});
                array.clear();
            }
            if (this.hasBackloggedCollisionRamps) {
                array = this.backloggedCollisionRamps;
                this.hasBackloggedCollisionRamps = false;
                this.backloggedCollisionRamps = [];
                array.forEach((addition) => {this.addCollisionRamp(...addition);});
                array.clear();
            }
            if (this.hasBackloggedCollisionWalls) {
                array = this.backloggedCollisionWalls;
                this.hasBackloggedCollisionWalls = false;
                this.backloggedCollisionWalls = [];
                array.forEach((addition) => {this.addCollisionWall(...addition);});
                array.clear();
            }
            if (this.hasBackloggedMeshes) {
                array = this.backloggedMeshes;
                this.hasBackloggedMeshes = false;
                this.backloggedMeshes = [];
                array.forEach((addition) => {this.addMesh(...addition);});
                array.clear();
            }
            if (this.hasBackloggedDoors) {
                array = this.backloggedDoors;
                this.hasBackloggedDoors = false;
                this.backloggedDoors = [];
                array.forEach((addition) => {this.addDoor(...addition);});
                array.clear();
            }
            if (this.hasBackloggedFurniture) {
                array = this.backloggedFurniture;
                this.hasBackloggedFurniture = false;
                this.backloggedFurniture = [];
                array.forEach((addition) => {this.addFurniture(...addition);});
                array.clear();
            }
            if (this.hasBackloggedLighting) {
                array = this.backloggedLighting;
                this.hasBackloggedLighting = false;
                this.backloggedLighting = [];
                array.forEach((addition) => {this.addLighting(...addition);});
                array.clear();
            }
            if (this.hasBackloggedCharacters) {
                array = this.backloggedCharacters;
                this.hasBackloggedCharacters = false;
                this.backloggedCharacters = [];
                array.forEach((addition) => {this.addCharacter(...addition);});
                array.clear();
            }
            if (this.hasBackloggedItems) {
                array = this.backloggedItems;
                this.hasBackloggedItems = false;
                this.backloggedItems = [];
                array.forEach((addition) => {this.addItem(...addition);});
                array.clear();
            }
        }
    }
    getMeshes() {
        return this.meshes;
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

    updateSkybox() {
        if (this.skybox instanceof BABYLON.AbstractMesh && this.skybox.material instanceof BABYLON.SkyMaterial) {
            this.skybox.material.azimuth = (Game.currentTime - 21600) % 86400 / 86400;
            this.skybox.material.luminance = (2 + Math.cos(4 * Math.PI * ((Game.currentTime - 21600) % 86400 / 86400))) / 5;
        }
    }

    dispose() {
        Cell.remove(this.id);
        return undefined;
    }

    static initialize() {
        Cell.cellList = {};
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