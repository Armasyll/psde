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

        this.fullScreenUI = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        this.guis = {};
        this.initGUIs();

        this.initFreeCamera();

        this.scene.actionManager = new BABYLON.ActionManager(this.scene);

        this.surfaceModels = undefined;
        this.furnitureModels = undefined;
        this.characterModels = undefined;
        this.itemModels = undefined;
        this.furnitureInstances = {};
        this.characterInstances = {};
        this.itemInstances = {};

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
        this.showCrosshair();
        this.initKeyboardControls();

        this.initialized = true;

        if (this.physicsEnabled) {}
        else {
            this.scene.collisionsEnabled = true;
        }

        this.postProcess = {};
        this.postProcess["fxaa"] = new BABYLON.FxaaPostProcess("fxaa", 1.0, this.camera);
        //this.postProcess["tonemap"] = new BABYLON.TonemapPostProcess("tonemap", BABYLON.TonemappingOperator.Hable, 0.1, Game.camera); // Could be used for darkness, when using too many lights is an issue
    }
    static initPhysics() {
        this.physicsPlugin = new BABYLON.CannonJSPlugin();
        this.scene.enablePhysics(this.scene.gravity, this.physicsPlugin);
        this.physicsEnabled = true;
    }
    static initFollowCamera() {
        if (this.camera instanceof BABYLON.Camera) this.camera.dispose();
        this.camera = new BABYLON.ArcRotateCamera(
            "camera",
            -this.player.rotation.y-4.69,
            Math.PI/2.5,
            3,
            new BABYLON.Vector3(this.player.position.x, (1.2 * this.player.scaling.y), this.player.position.z),
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
        this.camera.lockedTarget = this.player.characterController.getMeshAttachedToBone("FOCUS"); // Why this and not the thirdEye? The third eye causes jittering of the rendered frame 'cause it moves
        this.hideCrosshair();
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
        this.showCrosshair();
    }
    /**
        if (keys.avancer == 1) { // En avant
            posX = Math.sin(parseFloat(meshPlayer.rotation.y));
            posZ = Math.cos(parseFloat(meshPlayer.rotation.y));
            velocity = new BABYLON.Vector3(parseFloat(posX) / VitessePerso, 0, parseFloat(posZ) / VitessePerso);
            meshPlayer.moveWithCollisions(velocity);
        }
        meshPlayer.rotation.y = 4.69 - cameraArcRotative[0].alpha;
        cameraArcRotative[0].target.x = parseFloat(meshPlayer.position.x);
        cameraArcRotative[0].target.z = parseFloat(meshPlayer.position.z);
        meshPlayer.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
     */
    static initPlayer(_meshID = "foxSkeletonN", _scale = 1) {
        _meshID = this.filterID(_meshID); if (_meshID == null || !(Game.scene.getMeshByID(_meshID) instanceof BABYLON.Mesh)) _meshID = "foxSkeletonN";
        if (Game.debugEnabled) console.log("Running initPlayer");
        this.player = this.addCharacterMesh(_meshID, undefined, undefined, {x:3, y:0, z:-17});
        this.player.characterController.attachToLeftEye("eye");
        this.player.characterController.attachToRightEye("eye");
        this.player.characterController.attachToFOCUS("eye");
        this.initFollowCamera();

        return this.player;
    }
    static initKeyboardControls() {
        if (Game.debugEnabled) console.log("Running initKeyboardControls");
        this.keyboardControls['W'] = "Game.player.characterController.doRunForward()";
        this.keyboardControls['w'] = "Game.player.characterController.doMoveForward(1.2)";
        this.keyboardControls['s'] = "Game.player.characterController.doMoveBackward()";
        //this.keyboardControls['A'] = "Game.player.characterController.doStrafeLeft()";
        this.keyboardControls['a'] = "Game.player.characterController.doTurnLeft()";
        //this.keyboardControls['D'] = "Game.player.characterController.doStrafeRight()";
        this.keyboardControls['d'] = "Game.player.characterController.doTurnRight()";
        this.keyboardControls[' '] = "Game.player.characterController.doJump()";
        this.keyboardControls['Control'] = "Game.player.characterController.controlCrouch()";
    }
    static initGUIs() {
        this.guis["crosshair"] = this._generateGUICrosshair();
        this.guis["characterChoiceMenu"] = this._generateGUICharacterChoiceMenu();
        this.guis["hud"] = this._generateGUIHud();
        this.guis["chat"] = this._generateGUIChat();

        for (var _gui in this.guis) {
            this.fullScreenUI.addControl(this.guis[_gui]);
        }

        this.guis["chat"].isVisible = true;
    }
    static _generateGUICrosshair() {
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
        this.guis["crosshair"].isVisible = true;
    }
    static hideCrosshair() {
        this.guis["crosshair"].isVisible = false;
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
        _mesh.physicsImposter = new BABYLON.PhysicsImpostor(_mesh, BABYLON.PhysicsImpostor.BoxImpostor, {mass:0}, Game.scene);
        return _mesh.physicsImposter;
    }
    static assignCylinderPhysicsToMesh(_mesh, _options = {mass:0.8,restitution:0.1}) {
        if (Game.debugEnabled) console.log("Running assignCylinderPhysicsToMesh");
        _mesh.physicsImposter = new BABYLON.PhysicsImpostor(_mesh, BABYLON.PhysicsImpostor.CylinderImpostor, _options, Game.scene);
        return _mesh.physicsImposter;
    }
    static assignBoxPhysicsToMesh(_mesh, _options = {mass:0.8,restitution:0.1}) {
        if (Game.debugEnabled) console.log("Running assignBoxPhysicsToMesh");
        _mesh.physicsImposter = new BABYLON.PhysicsImpostor(_mesh, BABYLON.PhysicsImpostor.BoxImpostor, _options, Game.scene);
        return _mesh.physicsImposter;
    }
    static assignBoxPhysicsToBone(_bone, _options = {mass:0.03,restitution:0.1}) {

    }
    static addItemMesh(_meshID, _id = undefined, _options = {mass:0.8,restitution:0.1}, _position = {x:0, y:0, z:0}, _rotation = {x:0, y:0, z:0}, _scale = {x:1, y:1, z:1}) {
        if (Game.debugEnabled) console.log("Running addItemMesh");

        _meshID = this.filterID(_meshID); if (_meshID == null || !(Game.scene.getMeshByID(_meshID) instanceof BABYLON.Mesh)) return null;
        if (typeof _id != "string") _id = genUUIDv4();
        if (typeof _options != "object" || typeof _object == "undefined") _options = {mass:0.8,restitution:0.1};

        var _instance = Game.addMesh(_meshID, _id, _position, _rotation, _scale); if (_instance == null) {return null;}
        Game.itemInstances[_id] = _instance;
        if (this.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(_instance, _options);
        }
        return _instance;
    }
    static addFurnitureMesh(_meshID, _id = undefined, _options = {mass:0.8,restitution:0.1}, _position = {x:0, y:0, z:0}, _rotation = {x:0, y:0, z:0}, _scale = {x:1, y:1, z:1}) {
        if (Game.debugEnabled) console.log("Running addFurnitureMesh");

        _meshID = this.filterID(_meshID); if (_meshID == null || !(Game.scene.getMeshByID(_meshID) instanceof BABYLON.Mesh)) return null;
        if (typeof _id != "string") _id = genUUIDv4();

        var _instance = Game.addMesh(_meshID, _id, _position, _rotation, _scale); if (_instance == null) {return null;}
        Game.furnitureInstances[_id] = _instance;
        if (this.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(_instance, _options);
        }
        return _instance;
    }
    static addCharacterMesh(_meshID, _id = undefined, _options = {mass:0.8,restitution:0.1}, _position = {x:0, y:0, z:0}, _rotation = {x:0, y:0, z:0}, _scale = {x:1, y:1, z:1}) {
        if (Game.debugEnabled) console.log("Running addCharacterMesh (" + _id + ")");

        _meshID = this.filterID(_meshID); if (_meshID == null || !(Game.scene.getMeshByID(_meshID) instanceof BABYLON.Mesh)) _meshID = "foxSkeletonN";
        if (typeof _id != "string") _id = genUUIDv4();
        if (typeof _options != "object") _options = {mass:0.8,restitution:0.1};

        var _instance = Game.addMesh(_meshID, _id, _position, _rotation, _scale); if (_instance == null) {return null;}
        _instance.setEnabled(true);
        Game.characterInstances[_id] = _instance;
        if (this.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(_instance, _options);
        }
        else {
            _instance.checkCollisions = true;
            _instance.ellipsoid = new BABYLON.Vector3(0.13 * _scale.x, 1.2 * _scale.y, 0.13 * _scale.z);
            _instance.ellipsoidOffset = new BABYLON.Vector3(0, _instance.ellipsoid.y + (_instance.ellipsoid.y * 0.06), 0);
        }
        _instance.characterController = new CharacterController(_meshID, _instance);
        return _instance;
    }
    static removeMesh(_mesh) {
        if (Game.debugEnabled) console.log("Running removeMesh");
        if (_mesh.collisionMesh != undefined) {
            _mesh.collisionMesh.dispose();
        }
        _mesh.dispose();
    }
    static addMesh(_mesh, _id = undefined, _position = {x:0, y:-4095, z:0}, _rotation = {x:0, y:0, z:0}, _scale = {x:1, y:1, z:1}) {
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
            _n.name = _id;
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
            return _mesh.mesh;
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
        else
            _meshNames = "";
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
                    _importedMeshes.push(_meshes[_i]);
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
        Game.furnitureModels = Game.importMeshes("furniture.babylon", undefined, "Game._loadedFurniture = true;");
        Game.surfaceModels = Game.importMeshes("craftsmanWalls.babylon", undefined, "Game._loadedSurfaces = true;");
        Game.characterModels = Game.importMeshes("fox.babylon", undefined, "Game._loadedCharacters = true;");
        Game.itemModels = Game.importMeshes("items.babylon", undefined, "Game._loadedItems = true;");
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
    static _generateGUIDemoMenu() {
        var bottomMenuContainer = new BABYLON.GUI.StackPanel("bottomMenuContainer");
        bottomMenuContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        bottomMenuContainer.isVertical = true;
        //this.fullScreenUI.addControl(bottomMenuContainer);

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
    static _generateGUIHud() {
        var hud = new BABYLON.GUI.Rectangle("HUD");
        hud.width = 1.0;
        hud.height = 1.0;
        hud.isVisible = false;
        return hud;
    }
    static _generateGUIChat() {
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
    static _generateGUICharacterChoiceMenu() {
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
            var cNMSubmit = new BABYLON.GUI.StackPanel();
                var submitOnline = BABYLON.GUI.Button.CreateSimpleButton("submitOnline", "Online");
                var submitOffline = BABYLON.GUI.Button.CreateSimpleButton("submitOffline", "Offline");
        
        cNM1.isVertical = true;
        cNM2.isVertical = false;
        cNM3.isVertical = false;
        cNM4.isVertical = false;
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

        submitOffline.height = "24px";
        submitOffline.width = "128px";
        submitOffline.color = "white";
        submitOffline.backround = "grey";
        submitOffline.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        submitOnline.height = "24px";
        submitOnline.width = "128px";
        submitOnline.color = "white";
        submitOnline.backround = "grey";
        submitOnline.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        submitOnline.onPointerDownObservable.add(function() {
            Game.player.characterController.setName(nameInput.text);
            Client.connect();
            Game.guis["characterChoiceMenu"].isVisible = false;
        });
        submitOffline.onPointerDownObservable.add(function() {
            Game.player.characterController.setName(nameInput.text);
            Game.guis["characterChoiceMenu"].isVisible = false;
        });

        Game.fullScreenUI.addControl(cNM1);
            cNM1.addControl(cNM2);
                cNM2.addControl(nameInputLabel);
                cNM2.addControl(nameInput);
            cNM1.addControl(cNM3);
                cNM3.addControl(ageInputLabel);
                cNM3.addControl(ageInput);
            cNM1.addControl(cNM4);
                cNM4.addControl(speciesSelectLabel);
                cNM4.addControl(speciesSelect);
            cNM1.addControl(cNMSubmit);
                cNMSubmit.addControl(submitOffline);
                cNMSubmit.addControl(submitOnline);
        cNM1.isVisible = false;

        return cNM1;
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
    static setCharacterID(_character, _id, _updateChild = false) {
        console.log("Game::setCharacterID(" + _character.id + "," + _id + ")");
        if (!(_character instanceof CharacterController)) {
            if (_character.hasOwnProperty("characterController") && _character.characterController instanceof CharacterController) {
                _character = _character.characterController;
            }
            else {
                return undefined;
            }
        }
        if (Game.characterIDsControllers[_id] != undefined && Game.characterInstances[_id] != _character) {
            return undefined;
        }
        if (Game.characterIDsControllers[_character.id] != undefined) {
            delete Game.characterIDsControllers[_character.id];
        }
        Game.characterIDsControllers[_id] = _character;
        if (_updateChild) {
            _character.setID(_id, false);
        }
    }
    static getCharacter(_id) {
        if (typeof _id == "string" && _id.length == 36) {
            return Game.characterIDsControllers[_id];
        }
        else if (_id instanceof BABYLON.Mesh && _id.characterController instanceof CharacterController) {
            return _id.characterController;
        }
        else if (_id instanceof CharacterController) {
            return _id;
        }
        else {
            return undefined;
        }
    }
    static deleteCharacter(_character) {
        _character = Game.getMesh(_character);
        if (!_character.hasOwnProperty("characterController")) {
            return undefined;
        }
        delete Game.characterInstances[_character.id];
        delete Game.characterIDsControllers[_character.id];
        _character.characterController.dispose();
        _character.dispose();
    }
}