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
            this.canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
            this.canvas.exitPointerLock = canvas.exitPointerLock || canvas.mozExitPointerLock;
        this.engine = new BABYLON.Engine(this.canvas, false, null, false);
            this.engine.enableOfflineSupport = false; // Disables .manifest file errors
            this.engine.isPointerLock = false;
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.autoClear = false;
        this.scene.autoClearDepthAndStencil = false;
        this.scene.gravity = new BABYLON.Vector3(0,-9.81, 0);
        this.scene.actionManager = new BABYLON.ActionManager(this.scene);
        if (this.physicsEnabled) {
            this.initPhysics();
        }
        else {
            this.scene.collisionsEnabled = true;
        }

        this.entityMeshes = {};
        this.surfaceMeshes = {};
        this.furnitureMeshes = {};
        this.characterMeshes = {};
        this.itemMeshes = {};

        this.entityMeshInstances = {};
        this.furnitureMeshInstances = {};
        this.characterMeshInstances = {};
        this.itemMeshInstances = {};

        this.entityControllers = {};
        this.furnitureControllers = {};
        this.characterControllers = {};
        this.itemControllers = {};

        this.entities = {};
        this.furnitureEntities = {};
        this.characterEntities = {};
        this.itemEntities = {};

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

        this.postProcess = {};

        this.highlightEnabled = true;
        this.highlightLayer = new BABYLON.HighlightLayer("hl1", this.scene);
        this.highlightLayer.innerGlow = false;
        this.highlightedMesh = undefined;
        this.highlightedColorEnemy = "red";
        this.highlightedColorFriend = "green";
        this.highlightedColorNeutral = "white";

        this.kSkins = new Set(["foxRed.svg","foxRed.png","foxCorsac.svg","foxCorsac.png"]);

        this.MALE = 0, this.FEMALE = 1;
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

        GameGUI.initialize();
        this.initFreeCamera();
        this.loadMeshes();
        this.initQwertyKeyboardControls();
        this.initPostProcessing();

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
        this.camera.lockedTarget = this.player.getMeshAttachedToBone("FOCUS");
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
        this.player.avatar.isPickable = false;
        this.initFollowCamera();
        if (this.player.hasOwnProperty("entity")) {
            GameGUI.setPlayerPortrait(this.player);
        }

        return this.player;
    }
    static initBaseKeyboardControls() {
        this.chatInputFocusCode = 13;
        this.chatInputSubmitCode = 13;
    }
    static initQwertyKeyboardControls() {
        this.initBaseKeyboardControls();
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
        this.initBaseKeyboardControls();
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
        this.initBaseKeyboardControls();
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
        this.postProcess["tonemap"] = new BABYLON.TonemapPostProcess("tonemap", BABYLON.TonemappingOperator.Hable, 0.1, Game.camera); // Could be used for darkness, when using too many lights is an issue
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
        else if (event === this.chatInputFocusCode) {
            if (!GameGUI._chatInputFocused) {
                GameGUI.chatInputFocus();
            }
            else if (GameGUI._chatInputFocused && (this.chatInputFocusCode == this.chatInputSubmitCode)) {
                GameGUI.chatInputSubmit();
            }
        }
        else if (event === this.chatInputSubmitCode) {
            if (GameGUI._chatInputFocused && (this.chatInputFocusCode == this.chatInputSubmitCode)) {
                GameGUI.chatInputSubmit();
            }
        }
        else if (event == 27) {
            GameGUI.showMainMenu();
        }
        this.player.move = this.player.anyMovement();
        if (Client.online && !this.player.key.equals(this.player.prevKey)) {
            Client.updateLocRotScaleSelf();
            this.player.prevKey.copyFrom(this.player.key);
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
            this.player.prevKey.copyFrom(this.player.key);
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
            _n.isPickable = false;
            return _n;
        }
        else {
            return undefined;
        }
    }
    static getMesh(_mesh) {
        if (_mesh.hasOwnProperty("controller") && _mesh.controller instanceof CharacterController) {
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
                if (typeof _callback == "function") {
                    _callback();
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
        Game.furnitureMeshes = Game.importMeshes("furniture.babylon", undefined, function(){Game._loadedFurniture = true; Game.entityMeshes = Object.assign(Game.entityMeshes, Game.furnitureMeshes);});
        Game.surfaceMeshes = Game.importMeshes("craftsmanWalls.babylon", undefined, function(){Game._loadedSurfaces = true; Game.entityMeshes = Object.assign(Game.entityMeshes, Game.surfaceMeshes);});
        Game.characterMeshes = Game.importMeshes("fox.babylon", undefined, function(){Game._loadedCharacters = true; Game.entityMeshes = Object.assign(Game.entityMeshes, Game.characterMeshes);});
        Game.itemMeshes = Game.importMeshes("items.babylon", undefined, function(){Game._loadedItems = true; Game.entityMeshes = Object.assign(Game.entityMeshes, Game.itemMeshes);});
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

    static setPlayerID(_id) {
        Game.setEntityID(Game.player, _id);
    }
    // UPDATE SOON
    static setEntityID(_currentID, _newID) {
        // Three things: Mesh, CharacterController, Character
        //   Game.characterMeshInstances
        //      Game.entityMeshInstances
        //   Game.characterControllers
        //      Game.entityControllers
        //   Game.characterEntities
        //      Game.entities
        // They should all share the same ID; need to remove the methods to set the ID; will do that later :v
        if (typeof _currentID == "object") {
            if (_currentID instanceof BABYLON.Mesh || _currentID instanceof BABYLON.InstancedMesh) {
                _currentID = _currentID.id;
            }
            else if (_currentID instanceof EntityController) {
                _currentID = _currentID.id;
            }
            else if (_currentID instanceof Entity) {
                _currentID = _currentID.id;
            }
            else {
                return null;
            }
        }
        else if (typeof _currentID == "string") {
            if (Game.hasEntityController(_currentID)) {
                _currentID = Game.getEntityController(_currentID).id;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
        var _temp = undefined;
        _temp = Game.getEntityMesh(_currentID);
        _temp.id = _newID;
        Game.entityMeshInstances[_newID] = _temp;
        delete Game.entityMeshInstances[_currentID];
        if (Game.hasCharacterMeshInstance(_currentID)) {
            Game.characterMeshInstances[_newID] = _temp;
            delete Game.characterMeshInstances[_currentID];
        }
        _temp = Game.getEntityController(_currentID);
        _temp.id = _newID;
        Game.entityControllers[_newID] = _temp
        delete Game.entityControllers[_currentID];
        if (Game.hasCharacterController(_currentID)) {
            Game.characterControllers[_newID] = _temp;
            delete Game.characterControllers[_currentID];
        }
        _temp = Game.getEntity(_currentID);
        _temp.id = _newID;
        Game.entities[_newID] = _temp;
        delete Game.entities[_currentID];
        if (Game.hasCharacter(_currentID)) {
            Game.characterEntities[_newID] = _temp;
            delete Game.characterEntities[_currentID];
        }
    }
    static getEntityMesh(_id) {
        if (_id instanceof BABYLON.Mesh || _id instanceof BABYLON.InstancedMesh) {
            return _id;
        }
        else if (typeof _id == "string" && Game.entityMeshInstances.hasOwnProperty(_id)) {
            return Game.entityMeshInstances[_id];
        }
        else if ((_id instanceof EntityController || _id instanceof Entity) && (_id.avatar instanceof BABYLON.Mesh || _id.avatar instanceof BABYLON.InstancedMesh)) {
            return _id.avatar;
        }
        else {
            return undefined;
        }
    }
    static hasEntityMeshInstance(_id) {
        if (typeof _id == "string" && Game.entityMeshInstances.hasOwnProperty(_id)) {
            return true;
        }
        else if ((_id instanceof Entity || _id instanceof EntityController || _id instanceof BABYLON.Mesh) && Game.entityMeshInstances.hasOwnProperty(_id.id)) {
            return true;
        }
        else {
            return false;
        }
    }
    static hasCharacterMeshInstance(_id) {
        if (typeof _id == "string" && Game.characterMeshInstances.hasOwnProperty(_id)) {
            return true;
        }
        else if ((_id instanceof Character || _id instanceof CharacterController || _id instanceof BABYLON.Mesh) && Game.characterMeshInstances.hasOwnProperty(_id.id)) {
            return true;
        }
        else {
            return false;
        }
    }
    static getEntityController(_id) {
        if (_id instanceof EntityController) {
            return _id;
        }
        else if (typeof _id == "string" && Game.entityControllers.hasOwnProperty(_id)) {
            return Game.entityControllers[_id];
        }
        else if (_id instanceof BABYLON.Mesh && _id.controller instanceof EntityController) {
            return _id.controller;
        }
        else {
            return undefined;
        }
    }
    /*static hasEntityController(_id) {
        if (typeof _id == "string" && Game.entityControllers.hasOwnProperty(_id)) {
            return true;
        }
        else if ((_id instanceof Entity || _id instanceof EntityController || _id instanceof BABYLON.Mesh) && Game.entityControllers.hasOwnProperty(_id.id)) {
            return true;
        }
        else {
            return false;
        }
    }
    static getNetworkedCharacterController(_id) {
        if (this.networkedCharacterControllers.hasOwnProperty(_id)) {
            return this.networkedCharacterControllers[_id];
        }
        else if (_id instanceof CharacterController && this.networkedCharacterControllers.hasOwnProperty(_id.networkID)) {
            return this.networkedCharacterControllers[_id.networkID];
        }
        else if (this.hasCharacterController(_id)) {
            return this.networkedCharacterControllers[this.getCharacterController(_id).networkID];
        }
        else {
            return undefined;
        }
    }
    static hasNetworkedCharacterController(_id) {
        return this.networkedCharacterControllers.hasOwnProperty(_id);
    }*/
    static getCharacterController(_id) {
        if (_id instanceof CharacterController) {
            return _id;
        }
        else if (typeof _id == "string" && Game.entityControllers.hasOwnProperty(_id)) {
            return Game.entityControllers[_id];
        }
        else if (_id instanceof BABYLON.Mesh && _id.controller instanceof CharacterController) {
            return _id.controller;
        }
        else {
            return undefined;
        }
    }
    static hasCharacterController(_id) {
        if (typeof _id == "string" && Game.characterControllers.hasOwnProperty(_id)) {
            return true;
        }
        else if ((_id instanceof Character || _id instanceof CharacterController || _id instanceof BABYLON.Mesh) && Game.characterControllers.hasOwnProperty(_id.id)) {
            return true;
        }
        else {
            return false;
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
        if (typeof _id == "string" && Game.entities.hasOwnProperty(_id)) {
            return true;
        }
        else if ((_id instanceof Entity || _id instanceof EntityController || _id instanceof BABYLON.Mesh) && Game.entities.hasOwnProperty(_id.id)) {
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
        if (typeof _id == "string" && Game.characterEntities.hasOwnProperty(_id)) {
            return true;
        }
        else if ((_id instanceof Character || _id instanceof CharacterController || _id instanceof BABYLON.Mesh) && Game.entities.hasOwnProperty(_id.id)) {
            return true;
        }
        else {
            return false;
        }
    }
    static createCharacter(_id = undefined, _name = undefined, _age = 18, _sex = Game.MALE, _species = "fox", _skin = undefined, _options = undefined, _position = {x:0, y:0, z:0}, _rotation = {x:0, y:0, z:0}, _scale = {x:0, y:0, z:0}) {
        if (typeof _id != "string") {_id = genUUIDv4()};
        _id = _id.toLowerCase();
        var _entity = new Character(_id, _name, undefined, undefined, undefined, _age, _sex, _species);
        var _meshID = "";
        switch (_entity.species) {
            case "fox" : {
                if (_entity.getSex() == Game.MALE) {
                    _meshID = "foxM";
                }
                else {
                    _meshID = "foxF";
                }
                break;
            }
            case "skeleton" : {
                if (_entity.getSex() == Game.MALE) {
                    _meshID = "foxSkeletonM";
                }
                else {
                    _meshID = "foxSkeletonN";
                }
                break;
            }
            default : {
                if (_entity.getSex() == Game.MALE) {
                    _meshID = "foxM";
                }
                else {
                    _meshID = "foxF";
                }
                break;
            }
        }
        var _mesh = Game.addCharacterMesh(_id, _meshID, _options, _position, _rotation, _scale);
        var _controller = new CharacterController(_id, _mesh, _entity);
        if (_skin != undefined) {
            _controller.setAvatarSkin(_skin);
        }
        _entity.setController(_controller);
        _entity.setAvatar(_mesh);
        return _controller;
    }
    static deleteCharacter(_controller) {
        if (!(_controller instanceof CharacterController)) {
            _controller = Game.getCharacterController(_controller);
            if (!(_controller instanceof CharacterController)) {return undefined;}
        }
        if (_controller == this.player) {
            return false;
        }
        var _id = _controller.id;
        var _mesh = _controller.avatar;
        _controller.entity.dispose();
        _controller.dispose();
        _mesh.dispose();
        delete Game.entityMeshInstances[_id];
        delete Game.characterMeshInstances[_id];
    }
    static createDoor(_id, _name = "Door", _mesh = "door", _skin = undefined, _options = undefined, _position = {x:0, y:0, z:0}, _rotation = {x:0, y:0, z:0}, _scale = {x:0, y:0, z:0}) {
        if (typeof _id != "string") {_id = genUUIDv4()};
        _id = _id.toLowerCase();
        var _entity = new Entity(_id, _name);
        if ((_mesh instanceof BABYLON.Mesh || _mesh instanceof BABYLON.InstancedMesh) && Game.mesh) {
            _meshID = _mesh.name;
        }
        else if (Game.furnitureMeshes.has(_mesh)) {
            _meshID = _mesh;
        }
        else {
            _meshID = "door";
        }
        _mesh = Game.addFurnitureMesh(_id, _meshID, _options, _position, _rotation, _scale);
        _controller = new EntityController(_id, _mesh, _entity);
        if (_skin != undefined) {

        }
    }
    static deleteDoor(_controller) {
        if (!(_door instanceof EntityController)) {
            _door = Game.getEntityController(_door);
            if (!(_door instanceof EntityController)) {return undefined;}
        }
        var _id = _controller.id;
        var _mesh = _controller.avatar;
        _controller.entity.dispose();
        _controller.dispose();
        _mesh.dispose();
        delete Game.entityMeshInstances[_id];
        delete Game.furnitureMeshInstances[_id];
    }
    static highlightMesh(_mesh) {
        if (!this.highlightEnabled || this.highlightLayer.hasMesh(_mesh)) {
            return;
        }
        if (this.highlightedMesh != undefined) {
            this.highlightLayer.removeMesh(this.highlightedMesh);
        }
        this.highlightLayer.addMesh(_mesh, BABYLON.Color3.White());
        this.highlightedMesh = _mesh;
    }
    static clearHightlightMesh() {
        this.highlightLayer.removeMesh(this.highlightedMesh);
    }
    static hasSkin(_string) {
        return this.kSkins.has(_string);
    }
    static setPlayerTarget(_controller) {
        this.highlightMesh(_controller.avatar);
        Game.player.setTarget(_controller);
        GameGUI.setTargetPortrait(_controller);
        GameGUI.showTargetPortrait();
    }
    static clearPlayerTarget() {
        if (Game.player.getTarget() == undefined) {
            return undefined;
        }
        this.clearHightlightMesh();
        Game.player.clearTarget();
        GameGUI.hideTargetPortrait();
    }
    static castRayTarget() {
        var _direction = Game.camera.getDirection(Game.player.focus._absolutePosition.subtract({x:3,y:0,z:0})).negate(); // I don't know why I have to offset the X value by 3; it just works
        if (Game.player.targetRay == undefined) {
            Game.player.targetRay = new BABYLON.Ray(Game.player.focus._absolutePosition, _direction, 6);
        }
        else {
            Game.player.targetRay.origin = Game.player.focus._absolutePosition;
            Game.player.targetRay.direction = _direction;
        }
        if (Game.debugEnabled) {
            var _rayHelper = new BABYLON.RayHelper(Game.player.targetRay);
            _rayHelper.show(Game.scene);
        }
        var _hit = Game.scene.pickWithRay(Game.player.targetRay, function(_mesh) {
            if (_mesh.hasOwnProperty("controller") && _mesh != Game.player.avatar) {
                return true;
            }
            return false;
        });
        if (_hit.hit) {
            Game.setPlayerTarget(_hit.pickedMesh.controller);
        }
        else {
            Game.clearPlayerTarget();
        }
    }
    static castRayFOV(_fov = 90) {
        return undefined;
    }
    static pointerLock(_event) {
        if (Game.engine.isPointerLock) {
            return;
        }
        Game.canvas.requestPointerLock();
        Game.engine.isPointerLock = true;
        setTimeout(
            function() {
                document.addEventListener("pointerlockchange", Game.pointerRelease);
            },
            121 // even would trigger if it were run synchronously; assuming we're running at 60FPS, this should run after 121 frames v:
        );
    }
    static pointerRelease(_event) {
        document.removeEventListener("pointerlockchange", Game.pointerRelease);
        document.exitPointerLock();
        Game.engine.isPointerLock = false;
        GameGUI.showMainMenu();
    }
    static chatCommands(_command, ..._param) {
        if (_command == undefined || typeof _command != "string") {
            return undefined;
        }
        if (_command.slice(0, 1) == "/") {
            _command = _command.slice(1);
        }
        switch (_command) {
            case "help" : {
                GameGUI.chatOutputAppend("Possible commands are: help, clear, menu, login, logout, quit, save, and load.\n");
                break;
            }
            case "clear" : {
                GameGUI.chatOutputClear();
                break;
            }
            case "menu" : {
                GameGUI.showMainMenu();
                break;
            }
            case "login" : {
                break;
            }
            case "logout" : {
                Client.disconnect();
                break;
            }
            case "exit" :
            case "quit" : {
                break;
            }
            case "save" : {
                break;
            }
            case "load" : {
                break;
            }
            case ":v" :
            case "v:" :
            case ":V" :
            case "V:" : {
                GameGUI.chatOutputAppend("\n    :V\n");
            }
            default : {
                GameGUI.chatOutputAppend(`Command "${_command}" not found.\n`);
                return;
            }
        }
    }
}