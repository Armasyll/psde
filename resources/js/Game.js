class Game {
    constructor() {
        Game.initialized = false;
        Game.debugEnabled = false
    }
    static initialize() {
        this.debugEnabled = false;
        this.physicsEnabled = false;

        if (Game.debugEnabled) console.log("Running initialize");
        this.canvas = document.getElementById("canvas");
        this.engine = new BABYLON.Engine(this.canvas, false, null, false);
            this.engine.enableOfflineSupport = false; // Disables .manifest file errors
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.autoClear = false;
        this.scene.autoClearDepthAndStencil = false;
        if (this.physicsEnabled) {
            this.initPhysics();
        }
        this.scene.gravity = new BABYLON.Vector3(0,-9.81, 0);

        GameGUI.initialize();
        this.initFreeCamera();

        this.scene.actionManager = new BABYLON.ActionManager(this.scene);

        this.surfaceMeshes = undefined;
        this.furnitureMeshes = undefined;
        this.characterMeshes = undefined;
        this.itemMeshes = undefined;
        this.entityMeshInstances = {};
        this.furnitureMeshInstances = {};
        this.characterMeshInstances = {};
        this.itemMeshInstances = {};
        this.controllers = {};
        this.characterControllers = {};
        this.entities = {};
        this.furnitureEntities = {};
        this.characterEntities = {};
        this.itemEntities = {};

        this.characterIDsControllers = {};

        this._loadedFurniture = false;
        this._loadedSurfaces = false;
        this._loadedCharacters = false;
        this._loadedItems = false;
        this._finishedLoading = false;

        this._collisionMaterial = new BABYLON.Material("collisionMaterial", this.scene);
        //this._collisionMaterial = new BABYLON.StandardMaterial("collisionMaterial", this.scene);

        this.keyboardControls = {};
        this.player = undefined;
        this.previousSelectedMesh = undefined;
        this.currentSelectedMesh = undefined;

        this.loadMeshes();
        this.initQwertyKeyboardControls();

        if (this.physicsEnabled) {}
        else {
            this.scene.collisionsEnabled = true;
        }

        this.postProcess = {};
        this.initPostProcessing();

        this.highlightEnabled = true;
        this.highlightLayer = new BABYLON.HighlightLayer("hl1", this.scene);
        this.highlightLayer.innerGlow = false;
        this.highlightedMesh = undefined;
        this.highlightedColorEnemy = "red";
        this.highlightedColorFriend = "green";
        this.highlightedColorNeutral = "white";

        this.MALE = 0, this.FEMALE = 1;
        this.RIGHT_HANDED = 0, this.LEFT_HANDED = 1;
        this.kSpeciesTypes = new Set(["fox","skeleton"]);
        this.kBodyPartTypes = new Set(["ankles","anus","arms","back","breasts","chest","clitoris","feet","fingers","groin","hands","head","knot","leftAnkle","leftArm","leftEar","leftEye","leftFoot","leftHand","leftLeg","leftNipple","leftShoulder","legs","lips","mouth","neck","nose","penis","rear","rightAnkle","rightArm","rightEar","rightEye","rightFoot","rightHand","rightLeg","rightNipple","rightShoulder","shoulders","shoulders","stomach","testicles","toes","tongue","vagina","waist","wrists"]);
        this.kClothingTypes = new Set(["hat","mask","glasses","earPiercingLeft","earPiercingRight","nosePiercing","lipPiercing","tonguePiercing","collar","neckwear","shirt","jacket","belt","gloves","underwear","pants","socks","shoes","bra"]);
        this.kHandTypes = new Set(["fur","pad","hoof","clovenhoof","skin"]);
        this.kFeetTypes = this.kHandTypes;
        this.kEyeTypes = new Set(["circle","slit","rectangle","none"]);
        this.kPeltTypes = new Set(["skin","fur","wool","hair"]);
        this.kLocationTypes = new Set(["general","city","house","apartment","bank","park","store"]);
        this.kRoomTypes = new Set(["hallway","lobby","bedroom","livingroom","bathroom","kitchen","diningroom","closet","basement","extBuilding","street","walkway","lot"]);
        this.kFurnitureTypes = new Set(["chair","recliner","loveseat","couch","bed","table","desk","shelf","cupboard","cabinet","bureau","hook","tv","fridge","oven","microwave","toaster","tub","shower","sink","toilet","mirror","brokenMirror","basket","altar","sculpture"]);
        this.kIntraactionTypes = new Set(["lay","sit","crouch","stand","fly","sleep","move"]);
        this.kInteractionTypes = new Set(["attack","charmed","bite","boop","cast","channel","choke","consume","cut","disrobe","fist","follow","give","grope","hold","hug","kiss","lick","look","massage","masturbate","open","oral","pinch","poke","pray","pull","punch","push","put","rape","release","remove","rub","sex","sit","slap","steal","stroke","suck","take","talk","thrust","touch","use","wear"]);
        this.kActionTypes = new Set([...this.kIntraactionTypes, ...this.kInteractionTypes]);
        this.kConsumableTypes = new Set(["food","drink","medicine","other"]);
        this.kSpecialProperties = new Set(["exists","living","dead","mirror","water","earth","metal","broken","wood","magic","nature","container","charm","bone","jagged","smooth","cursed","blessed","bludgeoning","slashing","piercing","acid","cold","fire","lightning","necrotic","poison"]);

        this.XP_MIN = 0;
        this.XP_MAP = 355000;
        this.LEVEL_MIN = 0;
        this.LEVEL_MAX = 20;

        /**
         * Classless should be a broad description for commoner, expert, and noble; it shouldn't be used, unless I'm lazy.
         * @type {Set}
         */
        this.kCharacterClasses = new Set(["bard","cleric","druid","paladin","ranger","sorcerer","warlock","wizard","classless","commoner","expert","noble"]);

        this.initialized = true;
    }
    static initPhysics() {
        this.physicsPlugin = new BABYLON.CannonJSPlugin();
        this.scene.enablePhysics(this.scene.gravity, this.physicsPlugin);
        this.physicsEnabled = true;
    }
    static initFollowCamera(_offset = {x:0, y:0, z:0}) {
        if (this.camera instanceof BABYLON.Camera) this.camera.dispose();
        this.camera = new BABYLON.ArcRotateCamera(
            "camera",
            -this.player.avatar.rotation.y-4.69,
            Math.PI/2.5,
            3,
            new BABYLON.Vector3(this.player.avatar.position.x, (1.2 * this.player.avatar.scaling.y), this.player.avatar.position.z),
            this.scene);
        this.camera.setPosition(new BABYLON.Vector3(0, 0, 3));
        this.camera.checkCollisions = true;
        this.camera.wheelPrecision = 10;
        this.camera.upperRadiusLimit = 3;
        this.camera.lowerRadiusLimit = 1;
        this.camera.keysLeft=[];
        this.camera.keysRight=[];
        this.camera.keysUp=[];
        this.camera.keysDown=[];
        this.camera.attachControl(this.canvas, false);

        this.camera.minZ = 0.001;
        this.player.getMeshAttachedToBone("FOCUS").position.copyFrom(_offset);
        this.camera.lockedTarget = this.player.getMeshAttachedToBone("FOCUS"); // Why this and not the thirdEye? The third eye causes jittering of the rendered frame 'cause it moves
    }
    static initFreeCamera(_applyGravity = true) {
        if (Game.debugEnabled) console.log("Running initFreeCamera");
        if (this.camera instanceof BABYLON.Camera) this.camera.dispose();
        this.camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(2, 0.8, -20), this.scene);
        this.camera.radius = 2;
        this.camera.minZ = 0.001;
        this.camera.heightOffset = 1;
        this.camera.rotationOffset = 0;
        this.camera.speed = 0.25;
        this.camera.attachControl(this.canvas, true);
        if (this.physicsEnabled) {}
        else {
            this.camera.applyGravity = _applyGravity;
            this.camera.ellipsoid = new BABYLON.Vector3(0.1, 0.2, 0.1);
            this.camera.checkCollisions = true;
        }
    }
    static initPlayer() {
        if (Game.debugEnabled) console.log("Running initPlayer");
        this.player = this.createCharacter(undefined, "Player", 18, "male", "fox", undefined, undefined, {x:3, y:0, z:-17}, undefined, {x:1, y:1, z:1});
        this.player.attachToLeftEye("eye");
        this.player.attachToRightEye("eye");
        this.player.attachToFOCUS("eye");
        this.initFollowCamera();
        if (this.player.hasOwnProperty("entity")) {
            GameGUI.updatePlayerPortrait(
                this.player.entity.image,
                this.player.entity.name,
                Number.parseInt(this.player.entity.life/this.player.entity.lifeMax*100)+"%",
                Number.parseInt(this.player.entity.mana/this.player.entity.manaMax*100)+"%",
                Number.parseInt(this.player.entity.stamina/this.player.entity.staminaMax*100)+"%"
            );
        }

        return this.player;
    }
    static initQwertyKeyboardControls() {
        this.walkCode = 87;
        this.walkBackCode = 83;
        this.turnLeftCode = 65;
        this.turnRightCode = 68;
        this.strafeLeftCode = 0;
        this.strafeRightCode = 0;
        this.jumpCode = 32;
        this.interfaceFocusedEntity = 69;
        this.useFocusedEntity = 0;
        this.interfaceSelectedItem = 0;
        this.useSelectedItem = 82;
    }
    static initDvorakKeyboardControls() {
        this.walkCode = 188;
        this.walkBackCode = 73;
        this.turnLeftCode = 65;
        this.turnRightCode = 69;
        this.strafeLeftCode = 0;
        this.strafeRightCode = 0;
        this.jumpCode = 32;
        this.interfaceFocusedEntity = 190;
        this.useFocusedEntity = 0;
        this.interfaceSelectedItem = 0;
        this.useSelectedItem = 80;
    }
    static initAzertyKeyboardControls() {
        this.walkCode = 90;
        this.walkBackCode = 83;
        this.turnLeftCode = 81;
        this.turnRightCode = 68;
        this.strafeLeftCode = 0;
        this.strafeRightCode = 0;
        this.jumpCode = 32;
        this.interfaceFocusedEntity = 69;
        this.useFocusedEntity = 0;
        this.interfaceSelectedItem = 0;
        this.useSelectedItem = 82;
    }
    static initPostProcessing() {
        this.postProcess["fxaa"] = new BABYLON.FxaaPostProcess("fxaa", 1.0, this.camera);
        //this.postProcess["tonemap"] = new BABYLON.TonemapPostProcess("tonemap", BABYLON.TonemappingOperator.Hable, 0.1, Game.camera); // Could be used for darkness, when using too many lights is an issue
    }
    static controlCharacterOnKeyDown(event) {
        if (event === this.jumpCode)
            this.player.keyJump(true);
        else if (event === 16)
            this.player.keyShift(true);
        else if (event === this.walkCode)
            this.player.keyMoveForward(true);
        else if (event === this.turnLeftCode)
            this.player.keyTurnLeft(true);
        else if (event === this.turnRightCode)
            this.player.keyTurnRight(true);
        else if (event === this.walkBackCode)
            this.player.keyMoveBackward(true);
        else if (event === this.strafeLeftCode)
            this.player.keyStrafeLeft(true);
        else if (event === this.strafeRightCode)
            this.player.keyStrafeRight(true);
        this.player.move = this.player.anyMovement();
        if (Client.online) {
            Client.updateLocRotScaleSelf();
        }
    }
    static controlCharacterOnKeyUp(event) {
        if (event === this.jumpCode)
            this.player.keyJump(false);
        else if (event === 16)
            this.player.keyShift(false);
        else if (event === this.walkCode)
            this.player.keyMoveForward(false);
        else if (event === this.turnLeftCode)
            this.player.keyTurnLeft(false);
        else if (event === this.turnRightCode)
            this.player.keyTurnRight(false);
        else if (event === this.walkBackCode)
            this.player.keyMoveBackward(false);
        else if (event === this.strafeLeftCode)
            this.player.keyStrafeLeft(false);
        else if (event === this.strafeRightCode)
            this.player.keyStrafeRight(false);
        this.player.move = this.player.anyMovement();
        if (Client.online) {
            Client.updateLocRotScaleSelf();
        }
    }
    static addCollisionWall(_posStart = {x:0, y:0, z:0}, _posEnd = {x:0, y:0, z:0}, _rotation = 0, _height = 3) {
        if (Game.debugEnabled) console.log("Running addCollisionWallX");
        if (_rotation != 0 && isInt(_rotation)) {
            _rotation = BABYLON.Tools.ToRadians(_rotation);
        }
        if (_posStart.x == _posEnd.x) {
            _rotation += BABYLON.Tools.ToRadians(90);
        }
        if (_posStart.x == _posEnd.x) {
            var _width = Math.abs(_posEnd.z - _posStart.z);
        }
        else if (_posStart.z == _posEnd.z) {
            var _width = Math.abs(_posEnd.x - _posStart.x);
        }
        else {
            return null;
        }
        var _posX = (_posStart.x + _posEnd.x) / 2;
        var _posY = (_posStart.y + _posEnd.y) / 2 + _height / 2;
        var _posZ = (_posStart.z + _posEnd.z) / 2;
        var _wall = BABYLON.MeshBuilder.CreateBox("wall", {height:_height, depth:0.125, width:_width}, Game.scene);
        _wall.material = Game._collisionMaterial;
        _wall.position.x = _posX;
        _wall.position.y = _posY;
        _wall.position.z = _posZ;
        _wall.rotation.y = _rotation;
        if (this.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(_wall, {mass:0});
        }
        else {
            _wall.checkCollisions = true;
        }
        return _wall;
    }
    static addCollisionPlane(_posStart = {x:0, z:0}, _posEnd = {x:0, z:0}, _posY = 0) {
        if (Game.debugEnabled) console.log("Running addCollisionPlane");
        if (_posStart.x instanceof BABYLON.Mesh || _posStart.x instanceof BABYLON.InstancedMesh) {
            var _zRadius = _posStart.x.getBoundingInfo().boundingBox.extendSize.z * _posStart.x.scaling.z;
            var _xRadius = _posStart.x.getBoundingInfo().boundingBox.extendSize.x * _posStart.x.scaling.x;
            _posStart.z = _posStart.x.position.z - _zRadius;
            _posEnd.z = _posStart.x.position.z + _zRadius;
            _posEnd.x = _posStart.x.position.x + _xRadius;
            _posY = _posStart.x.position.y;
            _posStart.x = _posStart.x.position.x - _xRadius;
        }
        var _width = Math.abs(_posEnd.x - _posStart.x);
        var _depth = Math.abs(_posEnd.z - _posStart.z);
        var _posX = (_posStart.x + _posEnd.x) / 2;
        var _posY = _posY;
        var _posZ = (_posStart.z + _posEnd.z) / 2;
        var _floor = BABYLON.MeshBuilder.CreateBox("wall", {height:0.125, depth:_depth, width:_width}, Game.scene);
        _floor.material = Game._collisionMaterial;
        _floor.position.x = _posX;
        _floor.position.y = _posY;
        _floor.position.z = _posZ;
        if (this.physicsEnabled) {
            this.assignBoxPhysicsToMesh(_floor, {mass:0});
        }
        else {
            _floor.checkCollisions = true;
        }
        return _floor;
    }
    static addCollisionRamp() {
        return null;
    }
    static assignPlanePhysicsToMesh(_mesh) {
        if (Game.debugEnabled) console.log("Running assignPlanePhysicsToMesh");
        if (typeof _options != "object" || typeof _object == "undefined") _options = {mass:0.8,restitution:0.1};
        _mesh.physicsImposter = new BABYLON.PhysicsImpostor(_mesh, BABYLON.PhysicsImpostor.BoxImpostor, {mass:0}, Game.scene);
        return _mesh.physicsImposter;
    }
    static assignCylinderPhysicsToMesh(_mesh, _options = {mass:0.8,restitution:0.1}) {
        if (Game.debugEnabled) console.log("Running assignCylinderPhysicsToMesh");
        if (typeof _options != "object" || typeof _object == "undefined") _options = {mass:0.8,restitution:0.1};
        _mesh.physicsImposter = new BABYLON.PhysicsImpostor(_mesh, BABYLON.PhysicsImpostor.CylinderImpostor, _options, Game.scene);
        return _mesh.physicsImposter;
    }
    static assignBoxPhysicsToMesh(_mesh, _options = {mass:0.8,restitution:0.1}) {
        if (Game.debugEnabled) console.log("Running assignBoxPhysicsToMesh");
        if (typeof _options != "object" || typeof _object == "undefined") _options = {mass:0.8,restitution:0.1};
        _mesh.physicsImposter = new BABYLON.PhysicsImpostor(_mesh, BABYLON.PhysicsImpostor.BoxImpostor, _options, Game.scene);
        return _mesh.physicsImposter;
    }
    static assignBoxPhysicsToBone(_bone, _options = {mass:0.8,restitution:0.1}) {

    }
    static addItemMesh(_id = undefined, _meshID, _options = undefined, _position = {x:0, y:0, z:0}, _rotation = {x:0, y:0, z:0}, _scale = {x:1, y:1, z:1}) {
        if (Game.debugEnabled) console.log("Running addItemMesh");

        _meshID = this.filterID(_meshID); if (_meshID == null || !(Game.scene.getMeshByID(_meshID) instanceof BABYLON.Mesh)) return null;
        if (typeof _id != "string") _id = genUUIDv4();

        var _instance = Game.addMesh(_id, _meshID, _position, _rotation, _scale); if (_instance == null) {return null;}
        Game.itemMeshInstances[_id] = _instance;
        Game.entityMeshInstances[_id] = _instance;
        if (this.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(_instance, _options);
        }
        return _instance;
    }
    static addFurnitureMesh(_id = undefined, _meshID, _options = undefined, _position = {x:0, y:0, z:0}, _rotation = {x:0, y:0, z:0}, _scale = {x:1, y:1, z:1}) {
        if (Game.debugEnabled) console.log("Running addFurnitureMesh");

        _meshID = this.filterID(_meshID); if (_meshID == null || !(Game.scene.getMeshByID(_meshID) instanceof BABYLON.Mesh)) return null;
        if (typeof _id != "string") _id = genUUIDv4();

        var _instance = Game.addMesh(_id, _meshID, _position, _rotation, _scale); if (_instance == null) {return null;}
        Game.furnitureMeshInstances[_id] = _instance;
        Game.entityMeshInstances[_id] = _instance;
        if (this.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(_instance, _options);
        }
        return _instance;
    }
    static addCharacterMesh(_id = undefined, _meshID, _options = {mass:0.8,restitution:0.1}, _position = {x:0, y:0, z:0}, _rotation = {x:0, y:0, z:0}, _scale = {x:1, y:1, z:1}) {
        if (Game.debugEnabled) console.log("Running addCharacterMesh (" + _id + ")");

        _meshID = this.filterID(_meshID); if (_meshID == null || !(Game.scene.getMeshByID(_meshID) instanceof BABYLON.Mesh)) _meshID = "foxSkeletonN";
        if (typeof _id != "string") _id = genUUIDv4();
        if (typeof _options != "object") _options = {mass:0.8,restitution:0.1};

        var _instance = Game.addMesh(_id, _meshID, _position, _rotation, _scale); if (_instance == null) {return null;}
        _instance.setEnabled(true);
        Game.characterMeshInstances[_id] = _instance;
        Game.entityMeshInstances[_id] = _instance;
        if (this.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(_instance, _options);
        }
        else {
            _instance.checkCollisions = true;
            _instance.ellipsoid = new BABYLON.Vector3(0.13 * _scale.x, 1.2 * _scale.y, 0.13 * _scale.z);
            _instance.ellipsoidOffset = new BABYLON.Vector3(0, _instance.ellipsoid.y + (_instance.ellipsoid.y * 0.06), 0);
            _instance.ellipsoid.set(0.13 * _scale.x, 0.6 * _scale.y, 0.13 * _scale.z);
            _instance.ellipsoidOffset.set(0, _instance.ellipsoid.y, 0);
        }
        return _instance;
    }
    static removeMesh(_mesh) {
        if (Game.debugEnabled) console.log("Running removeMesh");
        if (_mesh.collisionMesh != undefined) {
            _mesh.collisionMesh.dispose();
        }
        _mesh.dispose();
    }
    static addMesh(_id = undefined, _mesh, _position = {x:0, y:-4095, z:0}, _rotation = {x:0, y:0, z:0}, _scale = {x:1, y:1, z:1}) {
        if (Game.debugEnabled) console.log("Running addMesh");
        if (_mesh instanceof BABYLON.Mesh || _mesh instanceof BABYLON.InstancedMesh) {
            _mesh.setEnabled(false);
            _mesh.position.y = -4096;
        }
        else {
            _mesh = Game.scene.getMeshByID(_mesh);
        }
        if (typeof _id != "string") _id = genUUIDv4();
        if (_mesh instanceof BABYLON.Mesh || _mesh instanceof BABYLON.InstancedMesh) {
            var _n = undefined;
            if (_mesh.skeleton instanceof BABYLON.Skeleton) {
                _n = _mesh.clone(_id);
                _n.skeleton = _mesh.skeleton.clone(_id + "Skeleton");
                _n.material.unfreeze();
            }
            else {
                _n = _mesh.createInstance(_id);
                _n.material.freeze();
            }
            _n.id = _id;
            _n.name = _mesh.name;
            _n.position = new BABYLON.Vector3(_position.x, _position.y, _position.z);
            _n.rotation = new BABYLON.Vector3(BABYLON.Tools.ToRadians(_rotation.x), BABYLON.Tools.ToRadians(_rotation.y), BABYLON.Tools.ToRadians(_rotation.z));
            _n.scaling = new BABYLON.Vector3(_scale.x, _scale.y, _scale.z);
            //_n.freezeWorldMatrix();
            _n.collisionMesh = undefined;
            return _n;
        }
        else {
            return undefined;
        }
    }
    static getMesh(_mesh) {
        if (_mesh.hasOwnProperty("characterController") && _mesh.characterController instanceof CharacterController) {
            return _mesh;
        }
        else if (_mesh instanceof CharacterController) {
            return _mesh.avatar;
        }
        else if (_mesh instanceof BABYLON.InstancedMesh || _mesh instanceof BABYLON.Mesh) {
            return _mesh;
        }
        else if (Game.scene.getMeshByID(_mesh) instanceof BABYLON.Mesh || Game.scene.getMeshByID(_mesh) instanceof BABYLON.InstancedMesh) {
            return Game.scene.getMeshByID(_mesh);
        }
        else {
            return undefined;
        }
    }

    static importMeshes(_sceneFilename, _meshNames = "", _callback = undefined) {
        if (Game.debugEnabled) console.log("Running importMeshes");
        var _importedMeshes = new Array();
        if (typeof _meshNames == "string") {}
        else if (typeof _meshNames == "array") {
            _meshNames = _meshNames.join('"');
        }
        else {
            _meshNames = "";
        }
        BABYLON.SceneLoader.ImportMesh(
            _meshNames, // meshNames
            "resources/data/", // rootUrl
            _sceneFilename, // sceneFilename
            Game.scene, // scene
            function(_meshes, _particleSystems, _skeletons) { // onSuccess
                for(var _i = 0; _i < _meshes.length; _i++) {
                    _meshes[_i].setEnabled(false);
                    _meshes[_i].position.set(0,-4096,0);
                    _meshes[_i].rotation.set(0,0,0);
                    _meshes[_i].scaling.set(1,1,1);
                    if (!(_meshes[_i].material instanceof BABYLON.Material))
                        _meshes[_i].material = new BABYLON.StandardMaterial("", Game.scene);
                    //_meshes[_i].material.freeze();
                    _importedMeshes[_meshes[_i].id] = _meshes[_i];
                    if (_skeletons[_i] != undefined) {
                        _meshes[_i].skeleton = _skeletons[_i];
                        _meshes[_i].skeleton.position = _meshes[_i].position;
                        _meshes[_i].skeleton.rotation = _meshes[_i].rotation;
                        _meshes[_i].skeleton.scaling = _meshes[_i].scaling;
                    }
                }
                if (_callback == undefined) {}
                else if (window.hasOwnProperty(_callback)) {
                    window[_callback] = true;
                }
                else {
                    unsafeExec(_callback);
                }
            },
            function() { // onProgress

            },
            function() { // onError

            }
        );
        return _importedMeshes;
    }
    static loadMeshes() {
        if (Game.debugEnabled) console.log("Running loadMeshes");
        Game.furnitureMeshes = Game.importMeshes("furniture.babylon", undefined, "Game._loadedFurniture = true;");
        Game.surfaceMeshes = Game.importMeshes("craftsmanWalls.babylon", undefined, "Game._loadedSurfaces = true;");
        Game.characterMeshes = Game.importMeshes("fox.babylon", undefined, "Game._loadedCharacters = true;");
        Game.itemMeshes = Game.importMeshes("items.babylon", undefined, "Game._loadedItems = true;");
        return true;
    }
    static filterID(_id) {
        if (isInt(_id)) {
            return _id;
        }
        else if (typeof _id == "string") {
            return _id.replace(/[^a-zA-Z0-9_\-]/g,"");
        }
    }
    static filterVector(..._vector) {
        if (_vector[0] instanceof BABYLON.Vector3)
            return _vector[0];
        else if (_vector[0] instanceof Array && _vector[0].length == 3)
            return new BABYLON.Vector3(_vector[0][0], _vector[0][1], _vector[0][2]);
        else if (_vector.hasOwnProperty("x") && _vector.hasOwnProperty("y") && _vector.hasOwnProperty("z"))
            return new BABYLON.Vector3(_vector.x, _vector.y, _vector.z);
        else
            return BABYLON.Vector3.Zero();
    }
    static contextMenu(_mesh) {
        if (Game.debugEnabled) console.log("Running contextMenu");
        if (!(_mesh instanceof BABYLON.Mesh || _mesh instanceof BABYLON.InstancedMesh))
            return undefined;
        if (!(_mesh.entity !== undefined && _mesh.entity instanceof Entity))
            return undefined;
        if (_mesh.entity.availableActions.size > 0) {
            _mesh.entity.availableActions.forEach(function(_availableAction) {

            }, this);
        }
    }
    static startMenu() {

    }
    static gameMenu() {

    }

    static controlsDebug() {
        Game.controlsToggleBoundingBoxes();
    }
    static controlsNormal() {
        Game.scene.meshes.forEach(function(_mesh) {_mesh.showBoundingBox = false;});
    }
    static controlsToggleBoundingBoxes() {
        if (!Game.showBoundingBoxes) {
            Game.showBoundingBoxes = true;
            Game.scene.meshes.forEach(function(_mesh) {_mesh.showBoundingBox = true;});
        }
        else {
            Game.showBoundingBoxes = false;
            Game.scene.meshes.forEach(function(_mesh) {_mesh.showBoundingBox = false;});
        }
    }

    static setPlayerID(_id, _updateChild = true) {
        Game.setCharacterID(Game.player, _id, _updateChild);
    }
    // UPDATE SOON
    static setEntityID(_currentID, _newID) {
        // Three things: Mesh, CharacterController, Character
        //   Game.characterMeshInstances
        //   Game.characterControllers
        //   Game.characterEntities
        // They should all share the same ID; need to remove the methods to set the ID; will do that later :v
        console.log("Game::setCharacterID(" + _character.id + "," + _id + ")");
        if (typeof _currentID == "object") {
            if (_currentID instanceof BABYLON.Mesh || _currentID instanceof BABYLON.InstancedMesh) {
                _currentID.id = _newID;
            }
            else if (_currentID instanceof Controller) {
                _currentID.id = _newID;
            }
            else if (_currentID instanceof Entity) {
                _currentID.id = _newID;
            }
            else {
                return null;
            }
        }
        else if (typeof _currentID == "string") {

        }
        else {
            return null;
        }
        Game.meshInstances
    }
    static getEntityController(_id) {
        if (_id instanceof CharacterController) {
            return _id;
        }
        else if (typeof _id == "string" && Game.controllers.hasOwnProperty(_id)) {
            return Game.controllers[_id];
        }
        else if (_id instanceof BABYLON.Mesh && _id.characterController instanceof CharacterController) {
            return _id.characterController;
        }
        else {
            return undefined;
        }
    }
    static getCharacterController(_id) {
        if (_id instanceof CharacterController) {
            return _id;
        }
        else if (typeof _id == "string" && Game.controllers.hasOwnProperty(_id)) {
            return Game.controllers[_id];
        }
        else if (_id instanceof BABYLON.Mesh && _id.characterController instanceof CharacterController) {
            return _id.characterController;
        }
        else {
            return undefined;
        }
    }
    static getEntity(_id) {
        if (_id instanceof Entity) {
            return _id;
        }
        else if (Game.entities.hasOwnProperty(_id)) {
            return Game.entities[_id];
        }
        else if (_id.hasOwnProperty("entity") && _id.entity instanceof Entity) {
            return _id.entity;
        }
        return null;
    }
    static hasEntity(_id) {
        if (!(_id instanceof Entity)) {
            if (Game.entities.hasOwnProperty(_id))
                return true;
            else
                return undefined;
        }
        else if (Game.entities.hasOwnProperty(_id.id)) {
            return true;
        }
        else {
            return false;
        }
    }
    static getCharacter(_id) {
        if (_id instanceof Character) {
            return _id;
        }
        else if (Game.characterEntities.hasOwnProperty(_id)) {
            return Game.characterEntities[_id];
        }
        else if (_id.hasOwnProperty("entity") && _id.entity instanceof Character) {
            return _id.entity;
        }
        return null;
    }
    static hasCharacter(_id) {
        if (!(_id instanceof Character)) {
            if (Game.characterEntities.hasOwnProperty(_id))
                return true;
            else
                return undefined;
        }
        else if (Game.characterEntities.hasOwnProperty(_id.id)) {
            return true;
        }
        else {
            return false;
        }
    }
    static createCharacter(_id = undefined, _name = undefined, _age = 18, _sex = Game.kMale, _species = "fox", _skin = undefined, _options = undefined, _position = {x:0, y:0, z:0}, _rotation = {x:0, y:0, z:0}, _scale = {x:0, y:0, z:0}) {
        if (typeof _id != "string") _id = genUUIDv4();
        _id = _id.toLowerCase();
        var _entity = new Character(_id, _name, undefined, undefined, undefined, _age, _sex, _species);
        var _meshID = "";
        switch (_entity.species) {
            case "fox" : {
                if (_entity.getSex() == 0) {
                    _meshID = "foxM";
                }
                else {
                    _meshID = "foxF";
                }
                break;
            }
            case "skeleton" : {
                if (_entity.getSex() == 0) {
                    _meshID = "foxSkeletonM";
                }
                else {
                    _meshID = "foxSkeletonN";
                }
                break;
            }
            default : {
                if (_entity.getSex() == 0) {
                    _meshID = "foxM";
                }
                else {
                    _meshID = "foxF";
                }
                break;
            }
        }
        var _mesh = Game.addCharacterMesh(_id, _meshID, _options, _position, _rotation, _scale);
        if (typeof _skin == "string" && _skin.length > 5) {
            _mesh.material = new BABYLON.StandardMaterial();
            _mesh.material.diffuseTexture = new BABYLON.Texture("resources/data/" + _skin);
            _mesh.material.specularColor.set(0,0,0);
        }
        var _controller = new CharacterController(_id, _mesh, _entity);
        _entity.setController(_controller);
        _entity.setAvatar(_mesh);
        return _controller;
    }
    static deleteCharacter(_character) {
        _character = Game.getMesh(_character);
        if (_character instanceof CharacterController) {
            _character = _character.avatar;
        }
        else if (!_character.hasOwnProperty("characterController")) {
            return undefined;
        }
        delete Game.characterMeshInstances[_character.id];
        delete Game.characterIDsControllers[_character.id];
        _character.characterController.dispose();
        _character.dispose();
    }
    static highlightMesh(_mesh) {
        if (!(_mesh instanceof BABYLON.Mesh) && !(_mesh instanceof BABYLON.InstancedMesh)) {
            if (_mesh instanceof Entity) {
                _mesh = _mesh.avatar;
            }
            else if (_mesh instanceof EntityController) {
                _mesh = _mesh.avatar;
            }
            else {
                return;
            }
        }
        if (!this.highlightEnabled || _mesh == this.highlightedMesh) {
            return;
        }
        if (this.highlightedMesh != undefined) {
            this.highlightLayer.removeMesh(this.highlightedMesh);
        }
        this.highlightLayer.addMesh(_mesh, BABYLON.Color3.White());
        this.highlightedMesh = _mesh;
    }
}
class GameGUI {
    constructor() {
        GameGUI.initialized = false;
    }
    static initialize() {
        GameGUI.mainMenu = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("mainMenu");
        GameGUI.hud = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("hud");
        GameGUI.initHUD();
        GameGUI.initMainMenu();

        GameGUI.initialized = true;
    }
    static initHUD() {
        GameGUI.hud.addControl(GameGUI._generateCrosshair());
        GameGUI.hud.addControl(GameGUI._generateChat());
        GameGUI.hud.addControl(GameGUI._generatePlayerPortrait());
        GameGUI.hud.addControl(GameGUI._generateTargetPortrait());
        GameGUI.hideHUD();
    }
    static initMainMenu() {
        GameGUI.mainMenu.addControl(GameGUI._generateCharacterChoiceMenu());
        GameGUI.hideMainMenu();
    }
    static showHUD() {
        GameGUI.hud.rootContainer.isVisible = true;
    }
    static hideHUD() {
        GameGUI.hud.rootContainer.isVisible = false;
    }
    static showMainMenu() {
        GameGUI.mainMenu.rootContainer.isVisible = true;
    }
    static hideMainMenu() {
        GameGUI.mainMenu.rootContainer.isVisible = false;
    }
    static _generateCrosshair() {
        if (Game.debugEnabled) console.log("Running showCrosshair");
        var crosshair = new BABYLON.GUI.Ellipse("crosshair");
        crosshair.width = "15px";
        crosshair.background = "white";
        crosshair.height = "15px";
        crosshair.color = "black";
        crosshair.alpha = 0.5;
        crosshair.isVisible = false;
        return crosshair;
    }
    static showCrosshair() {
        GameGUI.hud.rootContainer.getChildByName("crosshair").isVisible = true;
    }
    static hideCrosshair() {
        GameGUI.hud.rootContainer.getChildByName("crosshair").isVisible = false;
    }
    static _generateDemoMenu() {
        var bottomMenuContainer = new BABYLON.GUI.StackPanel("bottomMenuContainer");
        bottomMenuContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        bottomMenuContainer.isVertical = true;
        //GameGUI.gui.addControl(bottomMenuContainer);

        var firstRow = new BABYLON.GUI.StackPanel();
        firstRow.height = "64px";
        firstRow.isVertical = false;
        bottomMenuContainer.addControl(firstRow);
        
        var secondRow = new BABYLON.GUI.StackPanel();
        secondRow.height = "64px";
        secondRow.isVertical = false;
        bottomMenuContainer.addControl(secondRow);

        var thirdRow = new BABYLON.GUI.StackPanel();
        thirdRow.height = "64px";
        thirdRow.isVertical = false;
        bottomMenuContainer.addControl(thirdRow);

        var optionOne = new BABYLON.GUI.Button.CreateSimpleButton("optionOne", "1");
        optionOne.width = "25%";
        firstRow.addControl(optionOne);
        var optionTwo = new BABYLON.GUI.Button.CreateSimpleButton("optionTwo", "2");
        optionTwo.width = "25%";
        firstRow.addControl(optionTwo);
        var optionThree = new BABYLON.GUI.Button.CreateSimpleButton("optionThree", "3");
        optionThree.width = "25%";
        firstRow.addControl(optionThree);
        var optionFour = new BABYLON.GUI.Button.CreateSimpleButton("optionFour", "4");
        optionFour.width = "25%";
        firstRow.addControl(optionFour);

        var optionQ = new BABYLON.GUI.Button.CreateSimpleButton("optionQ", "Q");
        optionQ.width = "25%";
        secondRow.addControl(optionQ);
        var optionW = new BABYLON.GUI.Button.CreateSimpleButton("optionW", "W");
        optionW.width = "25%";
        secondRow.addControl(optionW);
        var optionE = new BABYLON.GUI.Button.CreateSimpleButton("optionE", "E");
        optionE.width = "25%";
        secondRow.addControl(optionE);
        var optionR = new BABYLON.GUI.Button.CreateSimpleButton("optionR", "R");
        optionR.width = "25%";
        secondRow.addControl(optionR);

        var optionA = new BABYLON.GUI.Button.CreateSimpleButton("optionA", "A");
        optionA.width = "25%";
        thirdRow.addControl(optionA);
        var optionS = new BABYLON.GUI.Button.CreateSimpleButton("optionS", "S");
        optionS.width = "25%";
        thirdRow.addControl(optionS);
        var optionD = new BABYLON.GUI.Button.CreateSimpleButton("optionD", "D");
        optionD.width = "25%";
        thirdRow.addControl(optionD);
        var optionF = new BABYLON.GUI.Button.CreateSimpleButton("optionF", "F");
        optionF.width = "25%";
        thirdRow.addControl(optionF);

        return bottomMenuContainer;
    }
    static _generateChat() {
        var chatBox = new BABYLON.GUI.StackPanel("chatBox");
            var chatOutput = new BABYLON.GUI.TextBlock("chatOutput");
            var chatInput = new BABYLON.GUI.InputText("chatInput");

        chatBox.bottom = 0;
        chatBox.left = 0;
        chatBox.isVertical = true;
        chatBox.height = 0.1;
        chatBox.width = 0.2;
        chatOutput.height = 0.8;
        chatOutput.width = 1.0;
        chatInput.height = 0.2;
        chatInput.width = 1.0;
        chatBox.addControl(chatOutput);
        chatBox.addControl(chatInput);
        chatBox.isVisible = false;
        return chatBox;
    }
    static _generateCharacterChoiceMenu() {
        var cNM1 = new BABYLON.GUI.StackPanel("characterChoiceMenu");
            var cNM2 = new BABYLON.GUI.StackPanel();
                var nameInputLabel = new BABYLON.GUI.TextBlock();
                var nameInput = new BABYLON.GUI.InputText();
            var cNM3 = new BABYLON.GUI.StackPanel();
                var ageInputLabel = new BABYLON.GUI.TextBlock();
                var ageInput = new BABYLON.GUI.InputText();
            var cNM4 = new BABYLON.GUI.StackPanel();
                var speciesSelectLabel = new BABYLON.GUI.TextBlock();
                var speciesSelect = new BABYLON.GUI.InputText();
            var cNM5 = new BABYLON.GUI.StackPanel();
                var buttonKBLayoutQwerty = BABYLON.GUI.Button.CreateSimpleButton("kbLayoutQwerty", "QWERTY");
                var buttonKBLayoutDvorak = BABYLON.GUI.Button.CreateSimpleButton("kbLayoutDvorak", "Dvorak");
                var buttonKBLayoutAzerty = BABYLON.GUI.Button.CreateSimpleButton("kbLayoutAzerty", "AZERTY");
            var cNMSubmit = new BABYLON.GUI.StackPanel();
                var submitOnline = BABYLON.GUI.Button.CreateSimpleButton("submitOnline", "Online");
                var submitOffline = BABYLON.GUI.Button.CreateSimpleButton("submitOffline", "Offline");
        
        cNM1.isVertical = true;
        cNM2.isVertical = false;
        cNM3.isVertical = false;
        cNM4.isVertical = false;
        cNM5.isVertical = false;
        cNMSubmit.isVertical = false;

        cNM1.zIndex = 90;
        cNM1.width = "512px";
        cNM1.height = "144px";
        cNM1.background = "black";
        cNM1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        cNM1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;

        nameInputLabel.text = "Name: ";
        nameInputLabel.height = "24px";
        nameInputLabel.width = "128px";
        nameInputLabel.color = "white";

        nameInput.height = "24px";
        nameInput.width = "256px";
        nameInput.color = "white";
        nameInput.background = "grey";
        nameInput.text = "Fox";

        ageInputLabel.text = "Age: ";
        ageInputLabel.height = "24px";
        ageInputLabel.width = "128px";
        ageInputLabel.color = "white";

        ageInput.height = "24px";
        ageInput.width = "256px";
        ageInput.color = "white";
        ageInput.background = "grey";

        speciesSelectLabel.text = "Species: ";
        speciesSelectLabel.height = "24px";
        speciesSelectLabel.width = "128px";
        speciesSelectLabel.color = "white";

        speciesSelect.height = "24px";
        speciesSelect.width = "256px";
        speciesSelect.color = "white";
        speciesSelect.background = "grey";

        buttonKBLayoutQwerty.height = "24px";
        buttonKBLayoutQwerty.width = "128px";
        buttonKBLayoutQwerty.color = "white";
        buttonKBLayoutQwerty.background = "grey";
        buttonKBLayoutDvorak.height = "24px";
        buttonKBLayoutDvorak.width = "128px";
        buttonKBLayoutDvorak.color = "white";
        buttonKBLayoutDvorak.background = "grey";
        buttonKBLayoutAzerty.height = "24px";
        buttonKBLayoutAzerty.width = "128px";
        buttonKBLayoutAzerty.color = "white";
        buttonKBLayoutAzerty.background = "grey";

        submitOffline.height = "24px";
        submitOffline.width = "128px";
        submitOffline.color = "white";
        submitOffline.background = "grey";
        submitOffline.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        submitOnline.height = "24px";
        submitOnline.width = "128px";
        submitOnline.color = "white";
        submitOnline.background = "grey";
        submitOnline.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        buttonKBLayoutQwerty.onPointerDownObservable.add(function() {
            Game.initQwertyKeyboardControls();
        });
        buttonKBLayoutDvorak.onPointerDownObservable.add(function() {
            Game.initDvorakKeyboardControls();
        });
        buttonKBLayoutAzerty.onPointerDownObservable.add(function() {
            Game.initAzertyKeyboardControls();
        });
        submitOnline.onPointerDownObservable.add(function() {
            Game.player.entity.setName(nameInput.text);
            Client.connect();
            GameGUI.hideMainMenu();
            GameGUI.showHUD();
        });
        submitOffline.onPointerDownObservable.add(function() {
            Game.player.entity.setName(nameInput.text);
            GameGUI.hideMainMenu();
            GameGUI.showHUD();
        });

        cNM1.addControl(cNM2);
            cNM2.addControl(nameInputLabel);
            cNM2.addControl(nameInput);
        cNM1.addControl(cNM3);
            cNM3.addControl(ageInputLabel);
            cNM3.addControl(ageInput);
        cNM1.addControl(cNM4);
            cNM4.addControl(speciesSelectLabel);
            cNM4.addControl(speciesSelect);
        cNM1.addControl(cNM5);
            cNM5.addControl(buttonKBLayoutQwerty);
            cNM5.addControl(buttonKBLayoutDvorak);
            cNM5.addControl(buttonKBLayoutAzerty);
        cNM1.addControl(cNMSubmit);
            cNMSubmit.addControl(submitOffline);
            cNMSubmit.addControl(submitOnline);

        return cNM1;
    }
    static _generatePlayerPortrait() {
        var playerPortrait = new BABYLON.GUI.Rectangle("playerPortrait");
        playerPortrait.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        playerPortrait.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        playerPortrait.height = 0.12;
        playerPortrait.width = 0.24;
        playerPortrait.top = 0;
        playerPortrait.left = 0;
        playerPortrait.thickness = 0;
            var playerPortraitAvatarContainer = new BABYLON.GUI.Rectangle();
            playerPortraitAvatarContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            playerPortraitAvatarContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            playerPortraitAvatarContainer.height = 1.0;
            playerPortraitAvatarContainer.width = 0.33;
            playerPortraitAvatarContainer.top = 0;
            playerPortraitAvatarContainer.left = 0;
            playerPortraitAvatarContainer.thickness = 0;
                var playerPortraitAvatar = new BABYLON.GUI.Image("playerPortraitAvatar", "resources/images/characters/genericCharacter.svg");
                playerPortraitAvatar.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
            var playerPortraitStats = new BABYLON.GUI.StackPanel("playerPortraitStats");
            playerPortraitStats.isVertical = true;
            playerPortraitStats.height = 1.0;
            playerPortraitStats.width = 0.76;
            playerPortraitStats.top = 0;
            playerPortraitStats.left = "21%";
                var playerPortraitStatsName = new BABYLON.GUI.TextBlock("playerName");
                playerPortraitStatsName.text = "Your Name Here";
                playerPortraitStatsName.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                playerPortraitStatsName.height = 0.25;
                playerPortraitStatsName.width = 1.0;
                var playerPortraitStatsHealth = new BABYLON.GUI.TextBlock("playerHealth");
                playerPortraitStatsHealth.text = "Health";
                playerPortraitStatsHealth.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                playerPortraitStatsHealth.height = 0.25;
                playerPortraitStatsHealth.width = 1.0;
                var playerPortraitStatsMana = new BABYLON.GUI.TextBlock("playerMana");
                playerPortraitStatsMana.text = "";
                playerPortraitStatsMana.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                playerPortraitStatsMana.height = 0.25;
                playerPortraitStatsMana.width = 1.0;
                var playerPortraitStatsStamina = new BABYLON.GUI.TextBlock("playerStamina");
                playerPortraitStatsStamina.text = "Stamina";
                playerPortraitStatsStamina.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                playerPortraitStatsStamina.height = 0.25;
                playerPortraitStatsStamina.width = 1.0;
        playerPortrait.addControl(playerPortraitAvatarContainer);
        playerPortraitAvatarContainer.addControl(playerPortraitAvatar);
        playerPortrait.addControl(playerPortraitStats);
        playerPortraitStats.addControl(playerPortraitStatsName);
        playerPortraitStats.addControl(playerPortraitStatsHealth);
        playerPortraitStats.addControl(playerPortraitStatsMana);
        playerPortraitStats.addControl(playerPortraitStatsStamina);
        return playerPortrait;
    }
    static _generateTargetPortrait() {
        var targetPortrait = new BABYLON.GUI.Rectangle("targetPortrait");
        targetPortrait.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        targetPortrait.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        targetPortrait.height = 0.12;
        targetPortrait.width = 0.24;
        targetPortrait.top = 0;
        targetPortrait.left = "24%";
        targetPortrait.thickness = 0;
        targetPortrait.isVisible = false;
            var targetPortraitAvatarContainer = new BABYLON.GUI.Rectangle();
            targetPortraitAvatarContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            targetPortraitAvatarContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            targetPortraitAvatarContainer.height = 1.0;
            targetPortraitAvatarContainer.width = 0.33;
            targetPortraitAvatarContainer.top = 0;
            targetPortraitAvatarContainer.left = 0;
            targetPortraitAvatarContainer.thickness = 0;
                var targetPortraitAvatar = new BABYLON.GUI.Image("targetPortraitAvatar", "resources/images/characters/genericCharacter.svg");
                targetPortraitAvatar.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
            var targetPortraitStats = new BABYLON.GUI.StackPanel("targetPortraitStats");
            targetPortraitStats.isVertical = true;
            targetPortraitStats.height = 1.0;
            targetPortraitStats.width = 0.76;
            targetPortraitStats.top = 0;
            targetPortraitStats.left = "-21%";
                var targetPortraitStatsName = new BABYLON.GUI.TextBlock("targetName");
                targetPortraitStatsName.text = "Your Name Here";
                targetPortraitStatsName.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                targetPortraitStatsName.height = 0.25;
                targetPortraitStatsName.width = 1.0;
                var targetPortraitStatsHealth = new BABYLON.GUI.TextBlock("targetHealth");
                targetPortraitStatsHealth.text = "Health";
                targetPortraitStatsHealth.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                targetPortraitStatsHealth.height = 0.25;
                targetPortraitStatsHealth.width = 1.0;
                var targetPortraitStatsMana = new BABYLON.GUI.TextBlock("targetMana");
                targetPortraitStatsMana.text = "";
                targetPortraitStatsMana.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                targetPortraitStatsMana.height = 0.25;
                targetPortraitStatsMana.width = 1.0;
                var targetPortraitStatsStamina = new BABYLON.GUI.TextBlock("targetStamina");
                targetPortraitStatsStamina.text = "Stamina";
                targetPortraitStatsStamina.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                targetPortraitStatsStamina.height = 0.25;
                targetPortraitStatsStamina.width = 1.0;
        targetPortrait.addControl(targetPortraitStats);
        targetPortrait.addControl(targetPortraitAvatarContainer);
        targetPortraitAvatarContainer.addControl(targetPortraitAvatar);
        targetPortraitStats.addControl(targetPortraitStatsName);
        targetPortraitStats.addControl(targetPortraitStatsHealth);
        targetPortraitStats.addControl(targetPortraitStatsMana);
        targetPortraitStats.addControl(targetPortraitStatsStamina);
        return targetPortrait;
    }
    static showPlayerPortrait() {
        GameGUI.hud.rootContainer.getChildByName("playerPortrait").isVisible = true;
    }
    static hidePlayerPortrait() {
        GameGUI.hud.rootContainer.getChildByName("playerPortrait").isVisible = false;
    }
    static showTargetPortrait() {
        GameGUI.hud.rootContainer.getChildByName("targetPortrait").isVisible = true;
    }
    static hideTargetPortrait() {
        GameGUI.hud.rootContainer.getChildByName("targetPortrait").isVisible = false;
    }
    static updatePlayerPortrait(_image = undefined, _name = undefined, _health = undefined, _mana = undefined, _stamina = undefined) {
        this.updatePlayerPortraitImage(_image);
        this.updatePlayerPortraitName(_name);
        this.updatePlayerPortraitHealth(_health);
        this.updatePlayerPortraitMana(_mana);
        this.updatePlayerPortraitStamina(_stamina);
    }
    static updateTargetPortrait(_image = undefined, _name = undefined, _health = undefined, _mana = undefined, _stamina = undefined) {
        this.updateTargetPortraitImage(_image);
        this.updateTargetPortraitName(_name);
        this.updateTargetPortraitHealth(_health);
        this.updateTargetPortraitMana(_mana);
        this.updateTargetPortraitStamina(_stamina);
    }
    static updatePlayerPortraitImage(_image) {
        GameGUI.hud.rootContainer.getChildByName("playerPortrait").children[0].children[0].domImage.setAttribute("src", _image);
    }
    static updatePlayerPortraitName(_string) {
        GameGUI.hud.rootContainer.getChildByName("playerPortrait").children[1].children[0].text = _string;
    }
    static updatePlayerPortraitHealth(_int = 100) {
        GameGUI.hud.rootContainer.getChildByName("playerPortrait").children[1].children[1].text = _int;
    }
    static updatePlayerPortraitStamina(_int = 100) {
        GameGUI.hud.rootContainer.getChildByName("playerPortrait").children[1].children[3].text = _int;
    }
    static showPlayerPortraitMana() {
        GameGUI.hud.rootContainer.getChildByName("playerPortrait").children[1].children[2].isVisible = true;
    }
    static hidePlayerPortraitMana() {
        GameGUI.hud.rootContainer.getChildByName("playerPortrait").children[1].children[2].isVisible = false;
    }
    static updatePlayerPortraitMana(_int = 100) {
        GameGUI.hud.rootContainer.getChildByName("playerPortrait").children[1].children[2].text = _int;
        if (_int == 0 || !isInt(_int)) {
            this.hidePlayerPortraitMana();
        }
        else {
            this.showPlayerPortraitMana();
        }
    }
    static updateTargetPortraitImage(_image) {
        GameGUI.hud.rootContainer.getChildByName("targetPortrait").children[1].children[0].domImage.setAttribute("src", _image);
    }
    static updateTargetPortraitName(_string) {
        GameGUI.hud.rootContainer.getChildByName("targetPortrait").children[0].children[0].text = _string;
    }
    static updateTargetPortraitHealth(_int = 100) {
        GameGUI.hud.rootContainer.getChildByName("targetPortrait").children[0].children[1].text = _int;
    }
    static updateTargetPortraitStamina(_int = 100) {
        GameGUI.hud.rootContainer.getChildByName("targetPortrait").children[0].children[3].text = _int;
    }
    static showTargetPortraitMana() {
        GameGUI.hud.rootContainer.getChildByName("targetPortrait").children[0].children[2].isVisible = true;
    }
    static hideTargetPortraitMana() {
        GameGUI.hud.rootContainer.getChildByName("targetPortrait").children[0].children[2].isVisible = false;
    }
    static updateTargetPortraitMana(_int = 100) {
        GameGUI.hud.rootContainer.getChildByName("targetPortrait").children[0].children[2].text = _int;
        if (_int == 0 || _int == NaN) {
            this.hideTargetPortraitMana();
        }
        else {
            this.showTargetPortraitMana();
        }
    }
}