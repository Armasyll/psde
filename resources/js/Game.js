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
            this.scene.workerCollisions = false;
        }

        this._assignBoundingBoxCollisionQueue = new Set();

        this._filesToLoad = 1;
        // Original meshes
        this.entityMeshes = {};
        this.surfaceMeshes = {};
        this.furnitureMeshes = {};
        this.characterMeshes = {};
        this.itemMeshes = {};

        // Instances and copies of original meshes
        this.entityMeshInstances = {};
        this.furnitureMeshInstances = {};
        this.characterMeshInstances = {};
        this.itemMeshInstances = {};

        this.entityControllers = {};
        this.furnitureControllers = {};
        this.doorControllers = {};
        this.characterControllers = {};
        this.itemControllers = {};

        this.entities = {};
        this.furnitureEntities = {};
        this.doorEntities = {};
        this.characterEntities = {};
        this.itemEntities = {};
        this.clothingEntities = {};
        this.keyEntities = {};

        this.instancedEntities = {};
        this.instancedItemEntities = {};

        this._finishedLoading = false;

        this._collisionMaterial = new BABYLON.Material("collisionMaterial", this.scene);
        //this._collisionMaterial = new BABYLON.StandardMaterial("collisionMaterial", this.scene);

        this.keyboardControls = {};
        this.player = undefined;
        this.previousSelectedMesh = undefined;
        this.currentSelectedMesh = undefined;

        this.enableFirstPerson = true;
        this.enableCameraAvatarRotation = true;

        this.postProcess = {};

        this.highlightEnabled = true;
        this.highlightLayer = new BABYLON.HighlightLayer("hl1", this.scene);
        this.highlightLayer.outerGlow = true;
        this.highlightLayer.innerGlow = false;
        this.highlightedMesh = undefined;
        this.highlightedColorEnemy = "red";
        this.highlightedColorFriend = "green";
        this.highlightedColorNeutral = "white";

        this.MALE = 0, this.FEMALE = 1;
        this.skeletonAnimationBonesInUse = {
            "characterSkeleton":{
                "10_blink":[
                    "eyelidTop.r",
                    "eyelidTop.l",
                    "eyelidBot.r",
                    "eyelidBot.l"
                ],
                "10_hand.l.grip":[
                    "wrist.l",
                    "hand.l",
                    "thumbMetacarpal.l",
                    "thumbProximinalPhalanx.l",
                    "thumbDistalPhalanx.l",
                    "fingersIndexMetacarpal.l",
                    "fingersIndexProximinalPhalanx.l",
                    "fingersIndexMiddlePhalanx.l",
                    "fingersIndexDistalPhalanx.l",
                    "fingersMetacarpal.l",
                    "fingersProximinalPhalanx.l",
                    "fingersMiddlePhalanx.l",
                    "fingersDistalPhalanx.l",
                    "fingersPinkieMetacarpal.l",
                    "fingersPinkieProximinalPhalanx.l",
                    "fingersPinkieMiddlePhalanx.l",
                    "fingersPinkieDistalPhalanx.l"
                ],
                "10_hand.r.grip":[
                    "wrist.r",
                    "hand.r",
                    "thumbMetacarpal.r",
                    "thumbProximinalPhalanx.r",
                    "thumbDistalPhalanx.r",
                    "fingersIndexMetacarpal.r",
                    "fingersIndexProximinalPhalanx.r",
                    "fingersIndexMiddlePhalanx.r",
                    "fingersIndexDistalPhalanx.r",
                    "fingersMetacarpal.r",
                    "fingersProximinalPhalanx.r",
                    "fingersMiddlePhalanx.r",
                    "fingersDistalPhalanx.r",
                    "fingersPinkieMetacarpal.r",
                    "fingersPinkieProximinalPhalanx.r",
                    "fingersPinkieMiddlePhalanx.r",
                    "fingersPinkieDistalPhalanx.r"
                ],
                "10_penis.erect":[
                    "penis"
                ],
                "10_penis.flacid":[
                    "penis"
                ],
                "70_reach.forward":[
                    "head",
                    "pelvis",
                    "shoulder.r",
                    "upperArm.r",
                    "forearm.r",
                    "IK.hand.r",
                    "wrist.r",
                    "hand.r",
                    "thumbMetacarpal.r",
                    "thumbProximinalPhalanx.r",
                    "thumbDistalPhalanx.r",
                    "fingersIndexMetacarpal.r",
                    "fingersIndexProximinalPhalanx.r",
                    "fingersIndexMiddlePhalanx.r",
                    "fingersIndexDistalPhalanx.r",
                    "fingersMetacarpal.r",
                    "fingersProximinalPhalanx.r",
                    "fingersMiddlePhalanx.r",
                    "fingersDistalPhalanx.r",
                    "fingersPinkieMetacarpal.r",
                    "fingersPinkieProximinalPhalanx.r",
                    "fingersPinkieMiddlePhalanx.r",
                    "fingersPinkieDistalPhalanx.r"
                ]
            }
        };
        this.characterTextures = {
            "foxM":{
                foxRed:"resources/data/foxRed.svg",
                foxCorsac:"resources/data/foxCorsac.svg"
            },
            "foxF":{
                foxRed:"resources/data/foxRed.svg",
                foxCorsac:"resources/data/foxCorsac.svg"
            }
        };
        this.itemTextures = {
            "bookHardcoverClosed01":{
                packStreetChapter23:"resources/data/packStreetChapter23.svg",
                packStreetChapter24:"resources/data/packStreetChapter24.svg"
            }
        };
        this.kSpeciesTypes = new Set(["fox", "skeleton"]);
        this.kHandTypes = new Set(["fur","pad","hoof","skin"]);
        this.kFeetTypes = this.kHandTypes;
        this.kEyeTypes = new Set(["circle","slit","rectangle","none"]);
        this.kPeltTypes = new Set(["skin","fur","wool","hair"]);
        this.kRoomTypes = new Set(["hallway","lobby","bedroom","livingroom","bathroom","kitchen","diningroom","closet","basement"]);
        this.kFurnitureTypes = new Set(["chair","loveseat","couch","table","shelf","fridge","basket"]);
        this.kIntraactionTypes = new Set(["lay","sit","crouch","stand","fly","sleep","move"]);
        this.kInteractionTypes = new Set(["close","consume","disrobe","drop","hold","look","open","put","release","take","talk","touch","use","wear"]);
        this.kActionTypes = new Set([...this.kIntraactionTypes, ...this.kInteractionTypes]);
        this.kConsumableTypes = new Set(["food","drink","medicine","other"]);
        this.kSpecialProperties = new Set(["exists","living","dead","mirror","water","earth","metal","broken","wood","magic","nature","container","charm","bone","jagged","smooth","cursed","blessed","bludgeoning","slashing","piercing","acid","cold","fire","lightning","necrotic","poison"]);

        this.actionTake = new ActionData("take", Game.actionTakeFunction, false);
        this.actionSit = new ActionData("sit", Game.actionSitFunction, false);
        this.actionOpen = new ActionData("open", Game.actionOpenFunction, false);
        this.actionClose = new ActionData("close", Game.actionCloseFunction, false);
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

        this._filesToLoad -= 1;
        this.initialized = true;
    }
    static initPhysics() {
        this.physicsPlugin = new BABYLON.CannonJSPlugin();
        this.scene.enablePhysics(this.scene.gravity, this.physicsPlugin);
        this.physicsEnabled = true;
    }
    static initFollowCamera(_offset = new BABYLON.Vector3(0, 0, 0)) {
        if (this.camera instanceof BABYLON.Camera) this.camera.dispose();
        this.camera = new BABYLON.ArcRotateCamera(
            "camera",
            -this.player.avatar.rotation.y-4.69,
            Math.PI/2.5,
            3,
            Game.player.getBoneByName("FOCUS").getAbsolutePosition(Game.player.getAvatar()),
            this.scene);
        this.camera.checkCollisions = true;
        this.camera.wheelPrecision = 100;
        this.camera.upperRadiusLimit = 2;
        this.camera.lowerRadiusLimit = 0.1;
        this.camera.keysLeft=[];
        this.camera.keysRight=[];
        this.camera.keysUp=[];
        this.camera.keysDown=[];
        this.camera.attachControl(this.canvas, false);

        this.camera.minZ = 0.001;
        this.camera.lockedTarget = this.player.focus;
        this.initPostProcessing();
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
        this.initPostProcessing();
    }
    static initPlayer(_position = new BABYLON.Vector3(3, 0, -17), _rotation = new BABYLON.Vector3(0,0,0), _scaling = new BABYLON.Vector3(1,1,1)) {
        if (Game.debugEnabled) console.log("Running initPlayer");
        this.player = this.createCharacter(undefined, "Player", undefined, "resources/images/characters/nickWilde.svg", 18, "male", "fox", "foxM", "resources/data/foxRed.svg", undefined, _position, _rotation, _scaling);
        this.player.attachToLeftEye("eye");
        this.player.attachToRightEye("eye");
        this.player.attachToFOCUS("eye");
        this.player.getAvatar().isPickable = false;
        this.initFollowCamera();
        if (this.player.hasOwnProperty("entity")) {
            GameGUI.setPlayerPortrait(this.player);
        }

        return this.player;
    }
    static initBaseKeyboardControls() {
        this.chatInputFocusCode = 13;
        this.chatInputSubmitCode = 13;
        this.showMainMenuCode = 27;
    }
    static initQwertyKeyboardControls() {
        this.initBaseKeyboardControls();
        this.walkCode = 87;
        this.walkBackCode = 83;
        this.turnLeftCode = 0;
        this.turnRightCode = 0;
        this.strafeLeftCode = 65;
        this.strafeRightCode = 68;
        this.jumpCode = 32;
        this.interfaceTargetedEntityCode = 70;
        this.useTargetedEntityCode = 69;
        this.interfaceSelectedItemCode = 0;
        this.useSelectedItemCode = 82;
        this.showInventoryCode = 73;
        this._updateMenuKeyboardDisplayKeys();
    }
    static initDvorakKeyboardControls() {
        this.initBaseKeyboardControls();
        this.walkCode = 188;
        this.walkBackCode = 73;
        this.turnLeftCode = 0;
        this.turnRightCode = 0;
        this.strafeLeftCode = 65;
        this.strafeRightCode = 69;
        this.jumpCode = 32;
        this.interfaceTargetedEntityCode = 85;
        this.useTargetedEntityCode = 190;
        this.interfaceSelectedItemCode = 0;
        this.useSelectedItemCode = 80;
        this.showInventoryCode = 73; // IDK :v maybe 
        this._updateMenuKeyboardDisplayKeys();
    }
    static initAzertyKeyboardControls() {
        this.initBaseKeyboardControls();
        this.walkCode = 90;
        this.walkBackCode = 83;
        this.turnLeftCode = 0;
        this.turnRightCode = 0;
        this.strafeLeftCode = 81;
        this.strafeRightCode = 68;
        this.jumpCode = 32;
        this.interfaceTargetedEntityCode = 70;
        this.useTargetedEntityCode = 69;
        this.interfaceSelectedItemCode = 0;
        this.useSelectedItemCode = 82;
        this.showInventoryCode = 73;
        this._updateMenuKeyboardDisplayKeys();
    }
    static _updateMenuKeyboardDisplayKeys() {
        GameGUI.setActionTooltipLetter();
    }
    static initPostProcessing() {
        this.postProcess["fxaa"] = new BABYLON.FxaaPostProcess("fxaa", 2.0, this.camera);
        //this.postProcess["tonemap"] = new BABYLON.TonemapPostProcess("tonemap", BABYLON.TonemappingOperator.Hable, 1.0, this.camera); // Could be used for darkness, when using too many lights is an issue
    }
    static controlCharacterOnKeyDown(event) {
        if (Game.debugEnabled) console.log(`Running Game::controlCharacterOnKeyDown(${event})`);
        switch (event) {
            case this.jumpCode : {
                this.player.keyJump(true);
                break;
            }
            case 16 : {
                this.player.keyShift(true);
                break;
            }
            case this.walkCode : {
                this.player.keyMoveForward(true);
                break;
            }
            case this.turnLeftCode : {
                this.player.keyTurnLeft(true);
                break;
            }
            case this.turnRightCode : {
                this.player.keyTurnRight(true);
                break;
            }
            case this.walkBackCode : {
                this.player.keyMoveBackward(true);
                break;
            }
            case this.strafeLeftCode : {
                this.player.keyStrafeLeft(true);
                break;
            }
            case this.strafeRightCode : {
                this.player.keyStrafeRight(true);
                break;
            }
            case this.chatInputFocusCode : {
                if (!GameGUI._chatInputFocused) {
                    GameGUI.chatInputFocus();
                }
                else if (GameGUI._chatInputFocused && (this.chatInputFocusCode == this.chatInputSubmitCode)) {
                    GameGUI.chatInputSubmit();
                }
                break;
            }
            case this.chatInputSubmitCode : {
                if (GameGUI._chatInputFocused && (this.chatInputFocusCode == this.chatInputSubmitCode)) {
                    GameGUI.chatInputSubmit();
                }
                break;
            }
            case this.useTargetedEntityCode : {
                if (!(this.player.targetController instanceof EntityController)) {
                    return;
                }
                if (this.player.targetController.getEntity() instanceof InstancedEntity) {
                    this.doEntityAction(this.player.targetController.getEntity(), this.player.getEntity(), this.player.targetController.getDefaultAction());
                }
                else if (this.player.targetController.getEntity() instanceof Entity) {
                    this.doEntityAction(this.player.targetController.getEntity(), this.player.getEntity(), this.player.targetController.getDefaultAction());
                }
                break;
            }
            case this.interfaceTargetedEntityCode : {
                break;
            }
            case this.showInventoryCode : {
                if (GameGUI.inventoryVisible()) {
                    GameGUI.hideInventory(false);
                    GameGUI.showHUD(false);
                }
                else {
                    GameGUI.showInventory(false);
                }
                break;
            }
            case this.showMainMenuCode : {
                if (GameGUI.mainMenuVisible()) {
                    if (Game.debugEnabled) console.log(`\tShowing HUD`);
                    GameGUI.hideMainMenu(false);
                    GameGUI.showHUD(false);
                }
                else {
                    if (Game.debugEnabled) console.log(`\tShowing Main Menu`);
                    GameGUI.hideHUD(false);
                    GameGUI.showCharacterChoiceMenu(false);
                }
                break;
            }
            default : {
            }
        }
        this.player.move = this.player.anyMovement();
        if (Client.online && !this.player.key.equals(this.player.prevKey)) {
            Client.updateLocRotScaleSelf();
            this.player.prevKey.copyFrom(this.player.key);
        }
    }
    static controlCharacterOnKeyUp(event) {
        switch (event) {
            case this.jumpCode : {
                this.player.keyJump(false);
                break;
            }
            case 16 : {
                this.player.keyShift(false);
                break;
            }
            case this.walkCode : {
                this.player.keyMoveForward(false);
                break;
            }
            case this.turnLeftCode : {
                this.player.keyTurnLeft(false);
                break;
            }
            case this.turnRightCode : {
                this.player.keyTurnRight(false);
                break;
            }
            case this.walkBackCode : {
                this.player.keyMoveBackward(false);
                break;
            }
            case this.strafeLeftCode : {
                this.player.keyStrafeLeft(false);
                break;
            }
            case this.strafeRightCode : {
                this.player.keyStrafeRight(false);
                break;
            }
            default : {
            }
        }
        this.player.move = this.player.anyMovement();
        if (Client.online) {
            Client.updateLocRotScaleSelf();
            this.player.prevKey.copyFrom(this.player.key);
        }
    }
    static createCollisionWall(_posStart = new BABYLON.Vector3(0, 0, 0), _posEnd = new BABYLON.Vector3(0, 0, 0), _rotation = 0) {
        if (Game.debugEnabled) console.log("Running createCollisionWallX");
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
        var _posY = (_posStart.y + _posEnd.y) / 2;
        var _posZ = (_posStart.z + _posEnd.z) / 2;
        var _wall = BABYLON.MeshBuilder.CreateBox("wall", {height:_posEnd.y - _posStart.y, depth:0.125, width:_width}, Game.scene);
        _wall.material = Game._collisionMaterial;
        _wall.position.set(_posX,_posY,_posZ);
        _wall.rotation.y = _rotation;
        if (this.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(_wall, {mass:0});
        }
        else {
            _wall.checkCollisions = true;
        }
        return _wall;
    }
    static createCollisionPlane(_posStart = {x:0, z:0}, _posEnd = {x:0, z:0}, _posY = 0) {
        if (Game.debugEnabled) console.log("Running createCollisionPlane");
        if (_posStart instanceof BABYLON.Mesh || _posStart instanceof BABYLON.InstancedMesh) {
            var _xRadius = _posStart.getBoundingInfo().boundingBox.extendSize.x * _posStart.scaling.x;
            var _zRadius = _posStart.getBoundingInfo().boundingBox.extendSize.z * _posStart.scaling.z;
            var _nPosStart = {x:0, z:0};
            _nPosStart.x = _posStart.position.x;
            _nPosStart.z = _posStart.position.z;
            _posEnd.x = _posStart.position.x + _xRadius * 2;
            _posEnd.z = _posStart.position.z + _zRadius * 2;
            _posY = _posStart.position.y;
            _posStart = _nPosStart;
        }
        var _width = Math.abs(_posEnd.x - _posStart.x);
        var _depth = Math.abs(_posEnd.z - _posStart.z);
        var _posX = (_posStart.x + _posEnd.x) / 2;
        var _posY = _posY - 0.06125;
        var _posZ = (_posStart.z + _posEnd.z) / 2;
        var _floor = BABYLON.MeshBuilder.CreateBox("wall", {height:0.125, depth:_depth, width:_width}, Game.scene);
        _floor.material = Game._collisionMaterial;
        _floor.position.set(_posX,_posY,_posZ);
        if (this.physicsEnabled) {
            this.assignBoxPhysicsToMesh(_floor, {mass:0});
        }
        else {
            _floor.checkCollisions = true;
        }
        return _floor;
    }
    static createCollisionRamp(_posStart = new BABYLON.Vector3(0, 0, 0), _posEnd = new BABYLON.Vector3(0, 0, 0), _rotationY = 0) {
        if (typeof _posStart != "object" || typeof _posEnd != "object" || !_posStart.hasOwnProperty("z") || !_posEnd.hasOwnProperty("z")) {
            return null;
        }
        if (_posStart.x == _posEnd.x || _posStart.y == _posEnd.y || _posStart.z == _posEnd.z) {
            return null;
        }
        if (_posStart.y > _posEnd.y) {
            var _temp = _posStart;
            var _posStart = _posEnd;
            var _posEnd = _temp;
        }
        var _opp = _posEnd.y - _posStart.y;
        var _width = 0;
        var _adj = 0;
        if (_posEnd.z - _posStart.z > _posEnd.x - _posStart.x) { // Z-based ramp
            _width = _posEnd.x - _posStart.x;
            _adj = _posEnd.z - _posStart.z;
        }
        else { // X-based ramp
            _width = _posEnd.z - _posStart.z;
            _adj = _posEnd.x - _posStart.x;
        }
        var _angle = Math.acos(_opp / _adj);
        var _hyp = _opp * (1/Math.cos(_angle)); // height
        var _ramp = BABYLON.MeshBuilder.CreateBox("ramp", {height:_hyp, depth:0.125, width:_width}, Game.scene);
        _ramp.position.set((_posEnd.x + _posStart.x) / 2 - 1,(_posEnd.y + _posStart.y) / 2,(_posEnd.z + _posStart.z) / 2 - 1);
        _ramp.rotation.set(_angle, BABYLON.Tools.ToRadians(_rotationY), 0);
        _ramp.material = Game._collisionMaterial;
        if (this.physicsEnabled) {
            this.assignBoxPhysicsToMesh(_ramp, {mass:0});
        }
        else {
            _ramp.checkCollisions = true;
        }
        return _ramp;
    }
    static assignPlanePhysicsToMesh(_mesh) {
        if (Game.debugEnabled) console.log("Running assignPlanePhysicsToMesh");
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
    static assignBoxCollisionToMesh(_mesh) {
        if (Game.debugEnabled) console.log("Running assignBoxCollisionToMesh");
        if (!(_mesh instanceof BABYLON.Mesh) && !(_mesh instanceof BABYLON.InstancedMesh)) {
            return null;
        }
        this._assignBoundingBoxCollisionQueue.add(_mesh);
    }
    static _assignBoundingBoxCollisionToMesh(_mesh) {
        if (Game.debugEnabled) console.log("Running _assignBoundingBoxCollisionToMesh");
        this._assignBoundingBoxCollisionQueue.delete(_mesh);
        var _boundingBox = _mesh.getBoundingInfo().boundingBox;
        _mesh.collisionMesh = BABYLON.MeshBuilder.CreateBox(_mesh.id + "-collisionBox", {width:_boundingBox.vectors[1].x - _boundingBox.vectors[0].x, height:_boundingBox.vectors[1].y - _boundingBox.vectors[0].y, depth:_boundingBox.vectors[1].z - _boundingBox.vectors[0].z}, Game.scene);
        _mesh.collisionMesh.position = _boundingBox.centerWorld.clone();
        _mesh.collisionMesh.rotation = _mesh.rotation.clone();
        _mesh.collisionMesh.scaling = _mesh.scaling.clone();
        _mesh.collisionMesh.material = Game._collisionMaterial;
        _mesh.collisionMesh.checkCollisions = true;
        _mesh.collisionMesh.setParent(_mesh);
        if (_mesh.controller instanceof DoorController) {
            if (_mesh.collisionMesh.scaling.x > _mesh.collisionMesh.scaling.z) {
                _mesh.collisionMesh.scaling.z += _mesh.collisionMesh.scaling.z * 0.1;
            }
            else {
                _mesh.collisionMesh.scaling.x += _mesh.collisionMesh.scaling.x * 0.2;
            }
        }
    }
    static addItemMesh(_id = undefined, _meshID = undefined, _skin = undefined, _options = undefined, _position = undefined, _rotation = undefined, _scale = undefined, _highlightFix = false) {
        if (Game.debugEnabled) console.log("Running addItemMesh");
        var _instance = Game.addMesh(_id, _meshID, _skin, _position, _rotation, _scale, _highlightFix);
        if (_instance == null) {return null;}
        Game.itemMeshInstances[_id] = _instance;
        Game.entityMeshInstances[_id] = _instance;
        if (this.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(_instance, _options);
        }
        else {}
        return _instance;
    }
    static addFurnitureMesh(_id = undefined, _meshID = undefined, _skin = undefined, _options = undefined, _position = undefined, _rotation = undefined, _scale = undefined, _highlightFix = false, _createCollisionMesh = true) {
        if (Game.debugEnabled) console.log("Running addFurnitureMesh");
        var _instance = Game.addMesh(_id, _meshID, _skin, _position, _rotation, _scale, _highlightFix);
        if (_instance == null) {return null;}
        Game.furnitureMeshInstances[_id] = _instance;
        Game.entityMeshInstances[_id] = _instance;
        if (_createCollisionMesh) {
            if (this.physicsEnabled) {
                Game.assignBoxPhysicsToMesh(_instance, _options);
            }
            else {
                Game.assignBoxCollisionToMesh(_instance);
            }
        }
        return _instance;
    }
    static addCharacterMesh(_id = undefined, _meshID = undefined, _skin = undefined, _options = undefined, _position = undefined, _rotation = new BABYLON.Vector3(0,0,0), _scale = new BABYLON.Vector3(1,1,1)) {
        if (Game.debugEnabled) console.log("Running addCharacterMesh");
        if (typeof _options != "object") {_options = {mass:0.8,restitution:0.1};}
        var _instance = Game.addMesh(_id, _meshID, _skin, _position, _rotation, _scale);
        if (_instance == null) {return null;}
        Game.characterMeshInstances[_id] = _instance;
        Game.entityMeshInstances[_id] = _instance;
        if (this.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(_instance, _options);
        }
        else {
            var _boundingBox = _instance.getBoundingInfo().boundingBox;
            _instance.checkCollisions = true;
            /*
                Using X for Z size 'cause the tail throws my collision box size off
             */
            _instance.ellipsoid = new BABYLON.Vector3(_boundingBox.extendSize.x * _scale.x, _boundingBox.extendSize.y * _scale.y, (_boundingBox.extendSize.x * 0.6) * _scale.z);
            _instance.ellipsoidOffset = new BABYLON.Vector3(0, _instance.ellipsoid.y, 0);
        }
        return _instance;
    }
    static removeMesh(_mesh) {
        if (Game.debugEnabled) console.log("Running removeMesh");
        if (!(_mesh instanceof BABYLON.Mesh) && !(_mesh instanceof BABYLON.InstancedMesh)) {
            _mesh = Game.getMesh(_mesh);
            if (!(_mesh instanceof CharacterController)) {return undefined;}
        }
        // Don't delete the original meshes
        if (this.entityMeshes[_mesh.name] == _mesh) {
            return;
        }
        if (_mesh.collisionMesh != undefined) {
            _mesh.collisionMesh.dispose();
        }
        if (_mesh.material instanceof BABYLON.Material) {
            _mesh.material.dispose();
        }
        delete Game.entityMeshInstances[_mesh.id];
        delete Game.furnitureMeshInstances[_mesh.id];
        delete Game.characterMeshInstances[_mesh.id];
        delete Game.itemMeshInstances[_mesh.id];
        _mesh.dispose();
    }
    static addMesh(_id = undefined, _mesh = undefined, _skin = undefined, _position = undefined, _rotation = undefined, _scaling = undefined, _highlightFix = false) {
        if (Game.debugEnabled) console.log("Running addMesh");
        if (typeof _id != "string") {_id = genUUIDv4();}
        _id = this.filterID(_id);
        if (_mesh instanceof BABYLON.Mesh || _mesh instanceof BABYLON.InstancedMesh) {
            _mesh.setEnabled(false);
            _mesh.position.y = -4096;
        }
        else {
            _mesh = this.getMesh(_mesh);
            if (_mesh == undefined) {
                return;
            }
        }
        if (_position == undefined) {
            _position = new BABYLON.Vector3(0, -4095, 0)
        }
        else {
            _position = this.filterVector(_position);
        }
        _rotation = this.filterVector(_rotation);
        _scaling = this.filterVector(_scaling);
        if (_scaling.equals(BABYLON.Vector3.Zero())) {
            _scaling = BABYLON.Vector3.One();
        }
        if (_mesh instanceof BABYLON.Mesh || _mesh instanceof BABYLON.InstancedMesh) {
            var _n = undefined;
            if (_mesh.skeleton instanceof BABYLON.Skeleton) {
                _n = _mesh.clone(_id);
                _n.material = _n.material.clone();
                _n.skeleton = _mesh.skeleton.clone(_id);
                _n.skeleton.name = _mesh.skeleton.name;
                _n.material.unfreeze();
            }
            else {
                if (_highlightFix) {
                    _n = _mesh.clone(_id);
                    _n.material = _n.material.clone();
                }
                else {
                    _n = _mesh.createInstance(_id);
                }
                _n.material.freeze();
            }
            if (_skin == undefined) {}
            else if (typeof _skin == BABYLON.Texture) {
                _n.material.diffuseTexture = _skin;
            }
            else if (typeof _skin == BABYLON.Material) {
                _n.material = _skin.clone();
            }
            else if (typeof _skin == "string") {
                _n.material.diffuseTexture = new BABYLON.Texture(_skin);
                _n.material.specularColor.set(0,0,0);
            }
            _n.id = _id;
            _n.name = _mesh.name;
            _n.position.copyFrom(_position);
            _n.rotation = new BABYLON.Vector3(BABYLON.Tools.ToRadians(_rotation.x), BABYLON.Tools.ToRadians(_rotation.y), BABYLON.Tools.ToRadians(_rotation.z));
            _n.scaling.copyFrom(_scaling);
            //_n.freezeWorldMatrix();
            _n.collisionMesh = undefined;
            _n.isPickable = false;
            this.entityMeshInstances[_n.id] = _n;
            return _n;
        }
        else {
            return undefined;
        }
    }
    static getMesh(_mesh) {
        if (_mesh == undefined) {
            return undefined;
        }
        else if (typeof _mesh == "string") {
            if (this.entityMeshes.hasOwnProperty(_mesh)) {
                return this.entityMeshes[_mesh];
            }
            else if (this.entityMeshInstances.hasOwnProperty(_mesh)) {
                return this.entityMeshInstances[_mesh];
            }
            else {
                return undefined;
            }
        }
        else if (_mesh instanceof EntityController) {
            return _mesh.avatar;
        }
        else if (_mesh instanceof BABYLON.InstancedMesh || _mesh instanceof BABYLON.Mesh) {
            return _mesh;
        }
        else {
            return undefined;
        }
    }
    static getCharacterMesh(_mesh) {
        if (_mesh == undefined) {
            return undefined;
        }
        else if (typeof _mesh == "string") {
            if (this.characterMeshes.hasOwnProperty(_mesh)) {
                return this.characterMeshes[_mesh];
            }
            else if (this.characterMeshInstances.hasOwnProperty(_mesh)) {
                return this.characterMeshInstances[_mesh];
            }
            else {
                return undefined;
            }
        }
        else if (_mesh instanceof EntityController) {
            return _mesh.avatar;
        }
        else if (_mesh instanceof BABYLON.InstancedMesh || _mesh instanceof BABYLON.Mesh) {
            return _mesh;
        }
        else {
            return undefined;
        }
    }

    static importMeshes(_sceneFilename, _meshNames = "", _callback = undefined) {
        if (Game.debugEnabled) console.log("Running importMeshes");
        var _importedMeshes = {};
        if (typeof _meshNames == "string") {}
        else if (typeof _meshNames == "array") {
            _meshNames = _meshNames.join('"');
        }
        else {
            _meshNames = "";
        }
        Game._filesToLoad += 1;
        BABYLON.SceneLoader.ImportMesh(
            _meshNames, // meshNames
            "resources/data/", // rootUrl
            _sceneFilename, // sceneFilename
            Game.scene, // scene
            function(_meshes, _particleSystems, _skeletons) { // onSuccess
                for(var _i = 0; _i < _meshes.length; _i++) {
                    _meshes[_i].name = _meshes[_i].id;
                    _meshes[_i].setEnabled(false);
                    _meshes[_i].position.set(0,-4096,0);
                    _meshes[_i].rotation.set(0,0,0);
                    _meshes[_i].scaling.set(1,1,1);
                    if (!(_meshes[_i].material instanceof BABYLON.Material)) {
                        _meshes[_i].material = new BABYLON.StandardMaterial("", Game.scene);
                    }
                    //_meshes[_i].material.freeze();
                    _importedMeshes[_meshes[_i].id] = _meshes[_i];
                    if (_skeletons[_i] != undefined) {
                        _meshes[_i].skeleton = _skeletons[_i];
                        _meshes[_i].skeleton.position = _meshes[_i].position;
                        _meshes[_i].skeleton.rotation = _meshes[_i].rotation;
                        _meshes[_i].skeleton.scaling = _meshes[_i].scaling;
                    }
                    Game.entityMeshes[_meshes[_i].id] = _meshes[_i];
                }
                Game._filesToLoad -= 1;
                if (typeof _callback == "function") {
                    _callback(_importedMeshes);
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
        Game.furnitureMeshes = Game.importMeshes("furniture.babylon");
        Game.surfaceMeshes = Game.importMeshes("craftsmanWalls.babylon");
        Game.characterMeshes = Game.importMeshes("characters.babylon");
        Game.importMeshes("arachnids.babylon", undefined, function(_meshes) {Game.characterMeshes = Object.assign(Game.characterMeshes, _meshes);});
        Game.itemMeshes = Game.importMeshes("items.babylon");
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
    static filterName(_string) {
        return _string.replace(/[^a-zA-Z0-9_\-\ \'\,\"]/g, '');
    }
    static filterVector(..._vector) {
        if (_vector == undefined || _vector[0] == undefined) {
            return BABYLON.Vector3.Zero();
        }
        else if (_vector[0] instanceof BABYLON.Vector3) {
            return _vector[0];
        }
        else if (typeof _vector[0] == "object" && _vector[0].hasOwnProperty("x") && _vector[0].hasOwnProperty("y") && _vector[0].hasOwnProperty("z") && !isNaN(_vector[0].x) && !isNaN(_vector[0].y) && !isNaN(_vector[0].z)) {
            return new BABYLON.Vector3(_vector[0].x, _vector[0].y, _vector[0].z);
        }
        else if (!isNaN(_vector[0]) && !isNaN(_vector[1]) && !isNaN(_vector[2])) {
            return new BABYLON.Vector3(_vector[0], _vector[1], _vector[2]);
        }
        else if (_vector[0] instanceof Array && _vector[0].length == 3) {
            return new BABYLON.Vector3(_vector[0][0], _vector[0][1], _vector[0][2]);
        }
        else {
            return BABYLON.Vector3.Zero();
        }
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
        if (Game.hasCharacterEntity(_currentID)) {
            Game.characterEntities[_newID] = _temp;
            delete Game.characterEntities[_currentID];
        }
    }
    static getEntityMesh(_id) {
        if (_id == undefined) {
            return;
        }
        else if (_id instanceof BABYLON.Mesh || _id instanceof BABYLON.InstancedMesh) {
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
        if (_id == undefined) {
            return;
        }
        else if (typeof _id == "string" && Game.entityMeshInstances.hasOwnProperty(_id)) {
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
        if (_id == undefined) {
            return;
        }
        else if (typeof _id == "string" && Game.characterMeshInstances.hasOwnProperty(_id)) {
            return true;
        }
        else if ((_id instanceof CharacterEntity || _id instanceof CharacterController || _id instanceof BABYLON.Mesh) && Game.characterMeshInstances.hasOwnProperty(_id.id)) {
            return true;
        }
        else {
            return false;
        }
    }
    static getEntityController(_id) {
        if (_id == undefined) {
            return;
        }
        else if (_id instanceof EntityController) {
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
    static hasEntityController(_id) {
        return this.getEntityController(_id) != undefined;
    }
    /*static getNetworkedCharacterController(_id) {
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
    static getFurnitureController(_id) {
        if (_id == undefined) {
            return;
        }
        else if (_id instanceof FurnitureController) {
            return _id;
        }
        else if (typeof _id == "string" && Game.furnitureControllers.hasOwnProperty(_id)) {
            return Game.furnitureControllers[_id];
        }
        else if (_id instanceof BABYLON.Mesh && _id.controller instanceof FurnitureController) {
            return _id.controller;
        }
        else {
            return undefined;
        }
    }
    static hasFurnitureController(_id) {
        return this.getFurnitureController(_id) != undefined;
    }
    static getDoorController(_id) {
        if (_id == undefined) {
            return;
        }
        else if (_id instanceof DoorController) {
            return _id;
        }
        else if (typeof _id == "string" && Game.doorControllers.hasOwnProperty(_id)) {
            return Game.doorControllers[_id];
        }
        else if (_id instanceof BABYLON.Mesh && _id.controller instanceof DoorController) {
            return _id.controller;
        }
        else {
            return undefined;
        }
    }
    static hasDoorController(_id) {
        return this.getDoorController(_id) != undefined;
    }
    static getItemController(_id) {
        if (_id == undefined) {
            return;
        }
        else if (_id instanceof ItemController) {
            return _id;
        }
        else if (typeof _id == "string" && Game.itemControllers.hasOwnProperty(_id)) {
            return Game.itemControllers[_id];
        }
        else if (_id instanceof BABYLON.Mesh && _id.controller instanceof ItemController) {
            return _id.controller;
        }
        else {
            return undefined;
        }
    }
    static hasItemController(_id) {
        return this.getItemController(_id) != undefined;
    }
    static getCharacterController(_id) {
        if (_id == undefined) {
            return;
        }
        else if (_id instanceof CharacterController) {
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
        return this.getCharacterController(_id) != undefined;
    }
    static getEntity(_id) {
        if (_id == undefined) {
            return;
        }
        else if (_id instanceof Entity) {
            return _id;
        }
        else if (typeof _id == "string" && Game.entities.hasOwnProperty(_id)) {
            return Game.entities[_id];
        }
        else if (_id.hasOwnProperty("entity") && _id.entity instanceof Entity) {
            return _id.entity;
        }
        return null;
    }
    static hasEntity(_id) {
        return this.getEntity(_id) != undefined;
    }
    static getProtoItemEntity(_id) {
        if (_id == undefined) {
            return;
        }
        else if (_id instanceof ItemEntity) {
            return _id;
        }
        else if (typeof _id == "string" && Game.itemEntities.hasOwnProperty(_id)) {
            return Game.itemEntities[_id];
        }
        else if (_id instanceof InstancedItemEntity) {
            return _id.getEntity();
        }
        else if (_id instanceof ItemController && _id.getEntity() instanceof InstancedItemEntity) {
            return _id.getEntity().getEntity();
        }
        return null;
    }
    static hasProtoItemEntity(_id) {
        return this.getProtoItemEntity(_id) != undefined;
    }
    static getInstancedItemEntity(_id) {
        if (_id == undefined) {
            return;
        }
        else if (_id instanceof InstancedItemEntity) {
            return _id;
        }
        else if (typeof _id == "string" && Game.instancedItemEntities.hasOwnProperty(_id)) {
            return Game.instancedItemEntities[_id];
        }
        else if (_id instanceof ItemController && _id.entity instanceof InstancedItemEntity) {
            return _id.entity;
        }
        else if ((_id instanceof BABYLON.Mesh || _id instanceof BABYLON.InstancedMesh) && _id.hasOwnProperty("controller") && _id.controller instanceof ItemController) {
            return _id.controller.entity;
        }
        return null;
    }
    static hasInstancedItemEntity(_id) {
        return this.getInstancedItemEntity(_id) != undefined;
    }
    static getItemEntity(_id) {
        return this.getInstancedItemEntity(_id);
    }
    static hasItemEntity(_id) {
        return this.hasInstancedItemEntity(_id);
    }
    static getCharacterEntity(_id) {
        if (_id == undefined) {
            return;
        }
        else if (_id instanceof CharacterEntity) {
            return _id;
        }
        else if (typeof _id == "string" && Game.characterEntities.hasOwnProperty(_id)) {
            return Game.characterEntities[_id];
        }
        else if (typeof _id == "object" && _id.hasOwnProperty("entity") && _id.entity instanceof CharacterEntity) {
            return _id.entity;
        }
        return null;
    }
    static hasCharacterEntity(_id) {
        if (_id == undefined) {
            return;
        }
        else if (typeof _id == "string" && Game.characterEntities.hasOwnProperty(_id)) {
            return true;
        }
        else if (_id instanceof CharacterEntity) {
            return true;
        }
        else {
            return false;
        }
    }
    static createCharacter(_id = undefined, _name = undefined, _description = "", _image = "resources/images/characters/genericCharacter.svg", _age = 18, _sex = Game.MALE, _species = "fox", _mesh = undefined, _skin = undefined, _options = undefined, _position = undefined, _rotation = undefined, _scale = undefined) {
        if (typeof _id != "string") {_id = genUUIDv4();}
        _id = this.filterID(_id);
        if (!(_position instanceof BABYLON.Vector3)) {_position = this.filterVector(_position);}
        var _entity = new CharacterEntity(_id, _name, _description, _image, undefined, _age, _sex, _species);
        _mesh = Game.getMesh(_mesh);
        if (_mesh == undefined) {
            switch (_entity.species) {
                case "fox" : {
                    if (_entity.getSex() == Game.MALE) {
                        _mesh = "foxM";
                    }
                    else {
                        _mesh = "foxF";
                    }
                    break;
                }
                case "skeleton" : {
                    if (_entity.getSex() == Game.MALE) {
                        _mesh = "foxSkeletonN";
                    }
                    else {
                        _mesh = "foxSkeletonN";
                    }
                    break;
                }
                default : {
                    if (_entity.getSex() == Game.MALE) {
                        _mesh = "foxM";
                    }
                    else {
                        _mesh = "foxF";
                    }
                    break;
                }
            }
            _mesh = Game.addCharacterMesh(_id, _mesh, _skin, _options, _position, _rotation, _scale);
        }
        else {
            _mesh = Game.addCharacterMesh(_id, _mesh.id, _skin, _options, _position, _rotation, _scale);
        }
        var _controller = new CharacterController(_id, _mesh, _entity);
        if (_skin != undefined) {
            _controller.setAvatarSkin(_skin);
        }
        _entity.setController(_controller);
        _entity.setAvatar(_mesh.name);
        return _controller;
    }
    static createCharacterFromEntity(_entity, _options = undefined, _position = undefined, _rotation = undefined, _scale = undefined) {
        _entity = Game.getCharacterEntity(_entity);
        if (_entity == undefined) {return;}
        var _mesh = Game.addCharacterMesh(_entity.getID(), _entity.getAvatarID(), _entity.getAvatarSkin(), _options, _position, _rotation, _scale);
        var _controller = new CharacterController(_entity.getID(), _mesh, _entity);
        _controller.setAvatarSkin(_entity.getAvatarSkin());
        _entity.setController(_controller);
        _entity.setAvatar(_mesh.name);
        return _controller;
    }
    static removeCharacter(_controller) {
        _controller = Game.getCharacterController(_controller);
        if (_controller == undefined) {return;}
        if (_controller == this.player) {return;}
        var _mesh = _controller.getAvatar();
        _controller.entity.dispose();
        _controller.dispose();
        _mesh.material.dispose();
        Game.removeMesh(_mesh);
    }
    /**
     * Is it a Door? Is it Furniture? Or is it just an Entity?
     * @param  {String} _id                 Unique ID, auto-generated if none given
     * @param  {String} _name               Name
     * @param  {Object} _to                 Future movement between cells
     * @param  {String} _mesh               String ID of a Mesh
     * @param  {String} _skin               String, Texture, or Material to be applied to the Mesh
     * @param  {Object} _options            Physics options, if they're enabled
     * @param  {BABYLON.Vector3} _position  Position
     * @param  {BABYLON.Vector3} _rotation  Rotation
     * @param  {BABYLON.Vector3} _scale     Scaling
     * @return {EntityController}           The created EntityController in-game
     */
    static createDoor(_id, _name = "Door", _to = undefined, _mesh = "door", _skin = undefined, _options = undefined, _position = new BABYLON.Vector3(0, 0, 0), _rotation = new BABYLON.Vector3(0, 0, 0), _scale = new BABYLON.Vector3(1, 1, 1)) {
        if (typeof _id != "string") {_id = genUUIDv4();}
        _id = this.filterID(_id);
        if (!(_position instanceof BABYLON.Vector3)) {_position = this.filterVector(_position);}
        if (Game.furnitureMeshes.hasOwnProperty(_mesh)) {}
        else if ((_mesh instanceof BABYLON.Mesh || _mesh instanceof BABYLON.InstancedMesh) && Game.mesh) {
            _mesh = _mesh.name;
        }
        else {
            _mesh = "door";
        }
        var _entity = new DoorEntity(_id, _name);
        _entity.addAvailableAction("close");
        _entity.addAvailableAction("open");
        var _mesh = Game.addFurnitureMesh(_id, _mesh, _skin, _options, _position, _rotation, _scale, true);
        var _radius = Game.getMesh(_mesh.name).getBoundingInfo().boundingBox.extendSize.x * _mesh.scaling.x;
        var _xPos = _radius * (Math.cos(_rotation.y * Math.PI / 180) | 0);
        var _yPos = _radius * (Math.sin(_rotation.y * Math.PI / 180) | 0);
        _mesh.position = _mesh.position.add(new BABYLON.Vector3(_xPos, 0, -_yPos));
        var _controller = new DoorController(_id, _mesh, _entity);
        _entity.setController(_controller);
        _entity.setAvatar(_mesh.name);
        return _controller;
    }
    static removeDoor(_controller) {
        _controller = Game.getEntityController(_controller);
        if (_controller == undefined) {return;}
        var _mesh = _controller.getAvatar();
        _controller.entity.dispose();
        _controller.dispose();
        Game.removeMesh(_mesh);
    }
    /**
     * Created a FurnitureController, FurnitureEntity, and BABYLON.InstancedMesh
     * @param  {String}  _id                  Unique ID, randomly generated if undefined
     * @param  {String}  _name                Name
     * @param  {String}  _type                Furniture type
     * @param  {BABYLON.Mesh}  _mesh          Mesh
     * @param  {BABYLON.Texture}  _skin       Texture
     * @param  {Object}  _options             Physics options
     * @param  {BABYLON.Vector3}  _position   Position
     * @param  {BABYLON.Vector3}  _rotation   Rotation
     * @param  {BABYLON.Vector3}  _scale      Scaling       
     * @param  {Boolean} _createCollisionMesh Whether or not a collisionMesh will be created
     * @return {FurnitureController}          Furniture Controller
     */
    static createFurniture(_id, _name, _type, _mesh, _skin, _options, _position, _rotation, _scale, _createCollisionMesh = true) {
        if (typeof _id != "string") {_id = genUUIDv4();}
        _id = this.filterID(_id);
        if (!(_position instanceof BABYLON.Vector3)) {_position = this.filterVector(_position);}
        if (Game.furnitureMeshes.hasOwnProperty(_mesh)) {}
        else if ((_mesh instanceof BABYLON.Mesh || _mesh instanceof BABYLON.InstancedMesh) && Game.mesh) {
            _mesh = _mesh.name;
        }
        else {
            _mesh = "chair";
        }
        var _entity = new FurnitureEntity(_id, _name, undefined, undefined, _type);
        var _mesh = Game.addFurnitureMesh(_id, _mesh, _skin, _options, _position, _rotation, _scale, true, _createCollisionMesh);
            _mesh.checkCollisions = true; // _createCollisionMesh doesn't count this :v
        var _controller = new FurnitureController(_id, _mesh, _entity);
        _entity.setController(_controller);
        _entity.setAvatar(_mesh.name);
        switch (_entity.getType()) {
            case "chair" :
            case "loveseat" :
            case "couch" : {
                _controller.setDefaultAction("sit");
                break;
            }
            case "bed" : {
                _controller.setDefaultAction("lay");
                break;
            }
            case "desk" :
            case "shelf" :
            case "cupboard" :
            case "cabinet" :
            case "bureau" :
            case "fridge" :
            case "oven" :
            case "microwave" :
            case "toaster" :
            case "basket" : {
                _controller.setDefaultAction("open");
                break;
            }
        }
        return _controller;
    }
    static removeFurniture(_controller) {
        _controller = Game.getFurnitureController(_controller);
        if (_controller == undefined) {return;}
        if (_controller == this.player) {return;}
        var _mesh = _controller.getAvatar();
        _controller.entity.dispose();
        _controller.dispose();
        _mesh.material.dispose();
        Game.removeMesh(_mesh);
    }
    static createProtoItem(_id = undefined, _name = undefined, _description = "", _image = "", _type = "book", _mesh = undefined, _skin = undefined) {
        if (typeof _id != "string") {_id = genUUIDv4();}
        _id = this.filterID(_id);
        var _entity = new ItemEntity(_id, _name, _description, _image);
        _mesh = this.getMesh(_mesh);
        if (_mesh != undefined) {
            _mesh = _mesh.name;
        }
        _entity.setAvatar(_mesh);
        _entity.setAvatarSkin(_skin);
        return _entity;
    }
    static removeProtoItem() {}
    static createItem(_id, _entity, _options = undefined, _position = undefined, _rotation = undefined, _scale = undefined) {
        if (typeof _id != "string") {_id = genUUIDv4();}
        _id = this.filterID(_id);
        if (_entity instanceof ItemEntity) {
            _entity = new InstancedItemEntity(_id, _entity);
        }
        else if (_entity instanceof InstancedItemEntity) {}
        else if (_id instanceof InstancedItemEntity) {
            _entity = _id;
            _id = _entity.getID();
        }
        _entity.addAvailableAction("take");
        var _mesh = this.addItemMesh(_id, _entity.getAvatarID(), _entity.getAvatarSkin(), _options, _position, _rotation, _scale, true);
        var _controller = new ItemController(_id, _mesh, _entity);
        _entity.setController(_controller);
        return _controller;
    }
    static removeItem(_controller) {
        _controller = Game.getItemController(_controller);
        if (_controller == undefined) {return;}
        var _mesh = _controller.getAvatar();
        _controller.entity.dispose();
        _controller.dispose();
        Game.removeMesh(_mesh);
    }
    static removeItemInSpace(_controller) {
        _controller = Game.getItemController(_controller);
        if (_controller == undefined) {return;}
        var _mesh = _controller.getAvatar();
        _controller.dispose();
        Game.removeMesh(_mesh);
    }
    static highlightMesh(_mesh) {
        if (!(_mesh instanceof BABYLON.Mesh)) {
            return;
        }
        if (!this.highlightEnabled || this.highlightedMesh == _mesh) {
            return;
        }
        if (this.highlightedMesh != undefined) {
            this.highlightLayer.removeMesh(this.highlightedMesh);
        }
        var _color = BABYLON.Color3.Gray();
        if (_mesh.controller instanceof CharacterController) {
            _color = BABYLON.Color3.White();
        }
        else if (_mesh.controller.getEntity() instanceof InstancedItemEntity) {
            if (_mesh.controller.getEntity().getOwner() != this.player.getEntity()) {
                _color = BABYLON.Color3.Red();
            }
            else {
                _color = BABYLON.Color3.White();
            }
        }
        this.highlightLayer.addMesh(_mesh, BABYLON.Color3.White());
        this.highlightedMesh = _mesh;
    }
    static clearHightlightMesh() {
        if (!(this.highlightedMesh instanceof BABYLON.Mesh)) {
            return;
        }
        this.highlightLayer.removeMesh(this.highlightedMesh);
        this.highlightedMesh = null;
    }
    static setPlayerTarget(_controller) {
        if (_controller == Game.player.getTarget()) {return;}
        this.highlightMesh(_controller.avatar);
        Game.player.setTarget(_controller);
        GameGUI.setTargetPortrait(_controller);
        GameGUI.showTargetPortrait();
        GameGUI.setActionTooltip(_controller.getDefaultAction());
        GameGUI.showActionTooltip();
    }
    static clearPlayerTarget() {
        if (Game.player.getTarget() == undefined) {
            return undefined;
        }
        this.clearHightlightMesh();
        Game.player.clearTarget();
        GameGUI.hideTargetPortrait();
        GameGUI.hideActionTooltip();
    }
    static castRayTarget() {
        var _ray = Game.camera.getForwardRay(2 * Game.player.getAvatar().scaling.y, Game.camera.getWorldMatrix(), Game.player.focus.getAbsolutePosition())
        if (Game.player.targetRay == undefined) {
            Game.player.targetRay = _ray;
        }
        else {
            Game.player.targetRay.origin = _ray.origin;
            Game.player.targetRay.direction = _ray.direction;
        }
        if (Game.debugEnabled) {
            if (Game.player.targetRayHelper != undefined) {
                Game.player.targetRayHelper.dispose();
            }
            Game.player.targetRayHelper = new BABYLON.RayHelper(Game.player.targetRay);
            Game.player.targetRayHelper.show(Game.scene);
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
                GameGUI.showCharacterChoiceMenu();
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
    static updateTargetValue() {
        if (Game.camera.radius <= 0.75) {
            if (Game.enableFirstPerson) {
                Game.player.avatar.visibility = 0;
                Game.camera.checkCollisions = false;
                Game.camera.inertia = 0.75;
                GameGUI.showCrosshair();
            }
        }
        else {
            Game.player.avatar.visibility = 1;
            Game.camera.checkCollisions = true;
            Game.camera.inertia = 0.9;
            GameGUI.hideCrosshair();
        }
    }
    static doEntityAction(_entity, _subEntity, _action) {
        if (!_entity.hasAvailableAction(_action)) {
            return;
        }
        if (!(_entity.getAvailableAction(_action) instanceof ActionData) || !_entity.getAvailableAction(_action).hasFunction()) {
            if (_action == "take" && _entity instanceof InstancedItemEntity) {
                Game.actionTakeFunction(_entity.getController(), _subEntity.getController());
            }
            else if (_action == "sit" && _entity instanceof FurnitureEntity) {
                Game.actionSitFunction(_entity.getController(), _subEntity.getController());
            }
            else if (_action == "open" && _entity instanceof DoorEntity) {
                Game.actionOpenFunction(_entity.getController(), _subEntity.getController());
            }
            else if (_action == "close" && _entity instanceof DoorEntity) {
                Game.actionCloseFunction(_entity.getController(), _subEntity.getController());
            }
            return;
        }
        if (_entity instanceof InstancedEntity) {
            if (_entity.getAvailableAction(_action).overrideParent) {
                _entity.getAvailableAction(_action).execute();
            }
            else if (_entity.getAvailableAction(_action).runBeforeParent) {
                _entity.getAvailableAction(_action).execute();
                _entity.getEntity().getAvailableAction(_action).execute();
            }
            else {
                _entity.getEntity().getAvailableAction(_action).execute();
                _entity.getAvailableAction(_action).execute();
            }
        }
        else if (_entity instanceof Entity) {
            if (_entity.getAvailableAction(_action).overrideParent) {
                _entity.getAvailableAction(_action).execute();
            }
        }
    }
    static actionTakeFunction(_itemController, _subEntityController = Game.player) {
        if (!(_itemController instanceof ItemController)) {
            return;
        }
        if (!(_subEntityController instanceof EntityController) && !(_subEntityController.getEntity() instanceof EntityWithStorage)) {
            return;
        }
        Game.player.getEntity().addItem(_itemController.getEntity());
        Game.removeItemInSpace(_itemController);
    }
    static actionDropFunction(_instancedItemEntity, _subEntityController = Game.player, _callback = undefined) {
        if (!(_instancedItemEntity instanceof InstancedItemEntity)) {
            return;
        }
        if (!(_subEntityController instanceof EntityController) || !(_subEntityController.getEntity() instanceof EntityWithStorage)) {
            return;
        }
        if (!_subEntityController.getEntity().hasItem(_instancedItemEntity)) {
            if (typeof _callback == "function") {
                _callback();
            }
            return;
        }
        if (_instancedItemEntity.hasController() && _instancedItemEntity.getController().hasAvatar()) { // it shouldn't have an EntityController :v but just in case
            _instancedItemEntity.setParent(null);
            _instancedItemEntity.position = _subEntityController.getAvatar().position.clone.add(
                new BABYLON.Vector3(0, Game.getMesh(_instancedItemEntity.getEntity().getAvatarID()).getBoundingInfo().boundingBox.extendSize.y, 0)
            );
        }
        else {
            var _item = Game.createItem(undefined, _instancedItemEntity, undefined, _subEntityController.getAvatar().position.add(
                new BABYLON.Vector3(0, Game.getMesh(_instancedItemEntity.getEntity().getAvatarID()).getBoundingInfo().boundingBox.extendSize.y, 0)
            ));
        }
        _subEntityController.getEntity().removeItem(_instancedItemEntity);
        if (typeof _callback == "function") {
            _callback();
        }
    }
    static actionCloseFunction(_entityController, _subEntityController = Game.player) {
        if (!(_entityController instanceof DoorController)) {
            return;
        }
        if (!(_subEntityController instanceof CharacterController)) {
            return;
        }
        _entityController.setOpen(false);
    }
    static actionHoldFunction(_instancedItemEntity, _subEntityController = Game.player, _callback = undefined) {
        if (!(_instancedItemEntity instanceof InstancedItemEntity)) {
            return;
        }
        if (!(_subEntityController instanceof EntityController) || !(_subEntityController.getEntity() instanceof EntityWithStorage)) {
            return;
        }
        if (!_subEntityController.getEntity().hasItem(_instancedItemEntity)) {
            if (typeof _callback == "function") {
                _callback();
            }
            return;
        }
        if (_instancedItemEntity.hasController() && _instancedItemEntity.getController().hasAvatar()) {
        }
        else {
            _subEntityController.getEntity().addHeldItem(_instancedItemEntity);
            if (_subEntityController.getEntity().getHeldItemInLeftHand() == _instancedItemEntity) {
                _subEntityController.attachToLeftHand(Game.addMesh(undefined, _instancedItemEntity.getAvatarID(), _instancedItemEntity.getAvatarSkin()));
            }
            else if (_subEntityController.getEntity().getHeldItemInRightHand() == _instancedItemEntity) {
                _subEntityController.attachToRightHand(Game.addMesh(undefined, _instancedItemEntity.getAvatarID(), _instancedItemEntity.getAvatarSkin()));
            }
            else {
                // do nothing :v or maybe something with magic v:
            }
        }
        if (typeof _callback == "function") {
            _callback(_instancedItemEntity, undefined, _subEntityController);
        }
    }
    static actionOpenFunction(_entityController, _subEntityController = Game.player) {
        if (!(_entityController instanceof DoorController)) {
            return;
        }
        if (!(_subEntityController instanceof CharacterController)) {
            return;
        }
        if (_entityController.getEntity().getLocked()) {
            if (!_subEntityController.getEntity().hasItem(_entityController.getEntity().getKey())) {
                return;
            }
            _entityController.getEntity().setLocked(false);
        }
        _entityController.setOpen(true);
    }
    /**
     * Places the subEntity near the Entity, and sets its parent to the Entity
     * TODO: Add actual placement of Characters based on their width
     * @param  {FurnitureController} _entityController    Furniture
     * @param  {EntityController} _subEntityController    Entity to be placed
     */
    static actionSitFunction(_entityController, _subEntityController = Game.player) {
        if (!(_entityController instanceof FurnitureController)) {
            return;
        }
        if (!(_subEntityController instanceof CharacterController)) {
            return;
        }
        var _seatingBoundingBox = this.getMesh(_entityController.getAvatar().name).getBoundingInfo().boundingBox;
        var _seatingWidth = (_seatingBoundingBox.extendSize.x * _entityController.getAvatar().scaling.x);
        _subEntityController.setParent(_entityController.getAvatar());
        _subEntityController.getAvatar().position.set(_seatingWidth / 2, 0, 0.025);
        _subEntityController.getAvatar().rotation.set(0,0,0);
    }
}