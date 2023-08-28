/**
 * Main, static Game class
 */
class Game {
    constructor() {
        this.initialized = false;
        Game.debugMode = false;
    }
    static initialize(options = {}) {
        BABYLON.Tools.Log("Initializing, Phase One; creating variables");
        Game.initialized = false;
        Game.currentFrame = 0;
        Game.options = Object.assign({}, options);
        Game.initializedPhaseTwo = false;
        Game.initializedPhaseThree = false;
        Game.initializedPhaseFour = false;
        Game.initializedPhaseFive = false;
        Game.initializedPhaseSix = false;
        Game.initializingPointerEventListeners = false;
        Game.initializedPointerEventListeners = false;
        Game.rootDirectory = "";
        Game.debugMode = false;
        Game.debugVerbosity = 2;
        Game.useNative = false;
        Game.useRigidBodies = true;
        Game.bUseControllerGroundRay = true;
        Game.useShadows = false;
        Game.physicsEnabled = false;
        Game.physicsForProjectilesOnly = true;
        Game.physicsPlugin = null;
        Game.showCollisionBoxes = false;

        Game.bBeforeRenderForceCameraBounds = true;
        Game.bBeforeRenderUpdateCharacterControllers = true;
        Game.bBeforeRenderUpdateProjectiles = true;
        Game.bBeforeRenderCameraBoundsCheck = true;

        Game.canvas = null;
        Game.engine = null;
        Game.scene = null;
        Game.renderWidth = 80;
        Game.renderHeight = 24;
        Game.camera = null;
        Game.cameraFocus = null;
        Game.cameraRadius = 2.0;
        Game.cameraAlpha = Tools.RAD_90;
        Game.cameraBeta = Tools.RAD_90;
        Game.cameraMinDistance = 0.001;
        Game.cameraFPDistance = 0.087;
        Game.cameraMaxDistance = 3.054;
        Game.cameraInertia = 0.9;
        Game.cameraAngularSensitivityX = 3500;
        Game.cameraAngularSensitivityY = 3500;
        Game.cameraWheelPrecision = 100;
        Game.useCameraRay = false;
        Game.cameraRay = null;
        Game.ambientLight = null;
        Game.sunLight = null;
        Game.skybox = null;
        Game.shadowGenerator = null;

        Game.assignBoundingBoxCollisionQueue = new Set();

        Game.loadedFiles = new Set();

        Game.importingMeshLocations = true;
        /**
         * Map of Mesh file locations per ID
         * eg, {"foxM":"resources/meshes/characters/fox.babylon"}
         * @type {<string, string>}
         */
        Game.meshLocations = {};
        /**
         * Map of Meshes per ID
         * eg, {"ring01":{ring01 Mesh}, "ring02":{...}}
         * @type {<string, BABYLON.Mesh>}
         */
        Game.loadedMeshes = {};
        Game.collisionMeshes = {};
        Game.importingTextureLocations = true;
        /**
         * Map of Texture file locations per ID
         * eg, {"foxRed":"resources/images/textures/characters/foxRed.svg"}
         * @type {<string, string>}
         */
        Game.textureLocations = {};
        Game.loadedSVGDocuments = {};
        Game.loadedImages = {};
        /**
         * Map of Textures per ID
         * eg, {"ring01Silver":{ring01Silver Texture}, "ring01Gold":{...}}
         * @type {<string, BABYLON.Texture>}
         */
        Game.loadedTextures = {};
        /**
         * Map of Materials per ID
         * @type {<string, BABYLON.Material>}
         */
        Game.loadedMaterials = {};
        Game.importingIconLocations = true;
        /**
         * Map of Icon file locations per ID
         * eg, {"rosie":"resources/images/icons/characters/rosie.png"}
         * @type {<string, string>}
         */
        Game.iconLocations = {};
        Game.importingSoundLocations = true;
        /**
         * Map of Sound file locations per ID; one to one
         * eg, {"openDoor":"resources/sounds/Open Door.mp3"}
         * @type {<string, string>}
         */
        Game.soundLocations = {};
        /**
         * Map of Sounds per ID; one to one
         * @type {<string, BABYLON.Sound>}
         */
        Game.loadedSounds = {};
        Game.soundCloneHeap = {};
        /**
         * Map of Video IDs to BABYLON.Sound; one to one
         * @type {<string, [BABYLON.Sound]>}
         */
        Game.importingVideoLocations = true;
        /**
         * Map of Video file locations per ID
         * eg, {"missingVideo":"resources/videos/missingVideo.mp4"}
         * @type {<string, string | [string]>}
         */
        Game.videoLocations = {};
        /**
         * Map of BABYLON.VideoTextures per ID; one to one
         * @type {<string, BABYLON.VideoTexture>}
         */
        Game.loadedVideos = {};
        /**
         * Map of Video IDs to BABYLON.VideoTexture(s); one to many
         * @type {<string, [BABYLON.VideoTexture]>}
         */
        Game.videoClones = {};
        /**
         * Map of Meshes per Texture IDs per Mesh IDs; one to many
         * eg, {"ring01":{"ring01Silver":{ring01 Mesh with ring01Silver Texture}, "ring01Gold":{ring01 Mesh with ring01Gold Texture}}, "ring02":{...}}
         * @type {<string, <string, BABYLON.Mesh>>}
         */
        Game.loadedMeshMaterials = {};
        /**
         * Map of Instanced Meshes per ID; one to one
         * @type {<string, BABYLON.InstancedMesh>}
         */
        Game.instancedMeshes = {};
        /**
         * Map cloned Meshes per ID; one to one
         * @type {<string, BABYLON.Mesh>}
         */
        Game.clonedMeshes = {};
        /**
         * Map of meshMaterials to cloned and instanced meshes; one to many
         * @type {<string, <string, BABYLON.AbstractMesh>>}
         */
        Game.meshMaterialMeshes = {};
        Game.tiledMeshes = {};

        /**
         * Map for createMeshes of Callbacks and an array of their instanced mesh IDs
         * @type {<string, array<string>>}
         */
        Game.createMeshesCallbackInstancedMeshIDs = {};

        Game.soundDumb = null;
        Game.soundMusic = null;
        Game.soundAmbience = null;
        Game.soundEffectEnvironment = {};
        Game.soundEffectCharacters = {};
        Game.soundOptions = {"loop": false, "startDelay": 0, "volume": 1, "playbackRate": 1, "repeat": 0, "loopDelay": 0};
        Game.soundMusicOptions = {"loop": true, "startDelay": 0, "volume": 1, "playbackRate": 1, "repeat": 0, "loopDelay": 0};
        Game.soundAmbienceOptions = {"loop": true, "startDelay": 0, "volume": 1, "playbackRate": 1, "repeat": 0, "loopDelay": 0};
        Game.soundEffectEnvironmentOptions = {"loop": false, "startDelay": 0, "volume": 1, "playbackRate": 1, "repeat": 0, "loopDelay": 0};
        Game.soundEffectCharacterOptions = {"loop": false, "startDelay": 0, "volume": 1, "playbackRate": 1, "repeat": 0, "loopDelay": 0};

        Game.meshToEntityController = {};

        Game.importingMeshProperties = true;
        Game.meshProperties = {};

        Game.functionsToRunBeforeRender = [];

        Game.playerEntityID = null;
        Game.playerController = null;
        Game.selectedCellID = "packstreetApartment3";
        Game.selectedPosition = new BABYLON.Vector3(3, 0, -17);
        Game.currentCellID = null;
        Game.previousCellID = null;
        Game.targetRayEnabled = true;
        Game.targetRayUpdateIntervalFunction = null;
        Game.targetRayUpdateInterval = 100;
        Game.pointerLockTimeoutFunction = null;
        Game.previousSelectedMesh = null;
        Game.currentSelectedMesh = null;
        Game.playerPortraitStatsUpdateIntervalFunction = null;
        Game.playerPortraitStatsUpdateInterval = 100;

        Game.enableFirstPerson = true;
        Game.enableCameraAvatarRotation = true;

        Game.defaultPipeline = null;

        Game.highlightEnabled = false;
        Game.highlightLayer = null;
        Game.highlightedController = null;

        Game.cachedCells = {};
        Game.cachedDialogues = {};
        /**
         * Entity ID:Object of the entity
         * @type {object<string:object<>>}
         */
        Game.cachedEntities = {};

        Game.currentTime = 0;
        Game.currentTick = 0;
        Game.currentRound = 0;
        Game.currentTurn = 0;
        Game.gameTimeMultiplier = 0;
        Game.ticksPerTurn = 0;
        Game.turnsPerRound = 0;
        Game.turnTime = 0;
        Game.roundTime = 0;

        Game.interfaceMode = InterfaceModeEnum.NONE;
        Game.previousInterfaceMode = null;

        /*
            Which function handles the function of the key presses;
            controlerCharacter, controlMenu
         */
        Game.controls = AbstractControls;

        Game.bSkipMainMenu = false;
        Game.bUseGUI = true;
        Game.gui = null;
        Game.bConnectedTickToEntityLogic = false;
        Game.bConnectedTransformsToEntityLogic = false;
        Game.bConnectedEntityLogicToTick = false;
        Game.bConnectedEntityLogicToTransforms = false;
        Game.tickWorker = null;
        Game.transformsWorker = null;
        Game.entityLogicWorker = null;
        Game.entityLogicTickChannel = null;
        Game.entityLogicTransformsChannel = null;
        Game.eventListeners = {};
        Game.sceneExecuteCodeActions = {};
        for (let option in options) {
            switch (option) {
                case "skipMainMenu": {
                    Game.bSkipMainMenu = true;
                    break;
                }
                case "rootDirectory": {
                    Game.rootDirectory = String(options["rootDirectory"]);
                    break;
                }
                case "debugMode": {
                    Game.debugMode = options["debugMode"] === true;
                    break;
                }
                case "debugVerbosity": {
                    Game.debugVerbosity = Number.parseInt(options["debugVerbosity"]) || 2;
                    break;
                }
                case "useNative": {
                    Game.useNative = options["useNative"] === true;
                    break;
                }
                case "useRigidBodies": {
                    Game.useRigidBodies = options["useRigidBodies"] === true;
                    break;
                }
                case "useShadows": {
                    Game.useShadows = options["useShadows"] === true;
                    break;
                }
                case "showCollisionBoxes": {
                    Game.showCollisionBoxes = options["showCollisionBoxes"] === true;
                    break;
                }
                case "meatyThwack": {
                    Game._playSoundTest = true;
                    break;
                }
                case "cell":
                case "cellID": {
                    Game.selectedCellID = options["cellID"];
                    Game.selectedPosition.set(0,0,0);
                    break;
                }
                case "noGUI": {
                    Game.bUseGUI = false;
                    Game.bSkipMainMenu = true;
                    break;
                }
            }
        }
        Game.initializePhaseTwo();
    }
    static initializePhaseTwo() {
        if (Game.initializedPhaseTwo) {
            return 0;
        }
        BABYLON.Tools.Log("Initializing, Phase Two; loading lists of assets");
        Game.initializedPhaseTwo = true;
        Game.importMeshLocations("resources/json/meshLocations.json", Game.initializePhaseThree);
        Game.importMeshProperties("resources/json/meshProperties.json", Game.initializePhaseThree);
        Game.importTextureLocations("resources/json/textureLocations.json", Game.initializePhaseThree);
        Game.importIconLocations("resources/json/iconLocations.json", Game.initializePhaseThree);
        Game.importSoundLocations("resources/json/soundLocations.json", Game.initializePhaseThree);
        Game.importVideoLocations("resources/json/videoLocations.json", Game.initializePhaseThree);
        return 0;
    }
    static initializePhaseThree() {
        if (Game.initializedPhaseThree) {
            return 0;
        }
        if (Game.importingMeshLocations || Game.importingMeshProperties || Game.importingTextureLocations || Game.importingIconLocations || Game.importingSoundLocations || Game.importingVideoLocations) {
            return 1;
        }
        BABYLON.Tools.Log("Initializing, Phase Three; setting up 3D engine");
        Game.initializedPhaseThree = true;

        if (Game.useNative) {
            if (Game.debugMode) BABYLON.Tools.Log("Creating NativeEngine");
            Game.engine = new BABYLON.NativeEngine();
        }
        else {
            Game.canvas = document.getElementById("canvas");
            Game.canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
            Game.canvas.exitPointerLock = canvas.exitPointerLock || canvas.mozExitPointerLock;
            if (Game.debugMode) BABYLON.Tools.Log("Creating Engine");
            Game.engine = new BABYLON.Engine(Game.canvas, false, null, false);
            Game.engine.enableOfflineSupport = false; // Disables .manifest file errors
        }
        if (Game.debugMode) BABYLON.Tools.Log("Creating Scene");
        Game.scene = new BABYLON.Scene(Game.engine);
        Game.scene.autoClear = false;
        Game.scene.autoClearDepthAndStencil = false;
        Game.scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
        Game.scene.actionManager = new BABYLON.ActionManager(Game.scene);
        Game.renderWidth = Game.engine.getRenderWidth();
        Game.renderHeight = Game.engine.getRenderHeight();
        if (Game.physicsEnabled) {
            Game.initializePhysics();
        }
        Game.scene.collisionsEnabled = true;
        Game.scene.workerCollisions = false;
        Game.ambientLight = new BABYLON.HemisphericLight("ambientLight", new BABYLON.Vector3(0, 1, 0), Game.scene);
        Game.ambientLightCeiling = new BABYLON.HemisphericLight("ambientLightCeiling", new BABYLON.Vector3(0, -1, 0), Game.scene);
        Game.ambientLightCeiling.intensity = 0.5;
        if (Game.useShadows) {
            Game.initializeShadows();
        }
        Game.skybox = new BABYLON.MeshBuilder.CreateBox("skybox", {"size":1024.0}, Game.scene);

        Game.loadDefaultAssets();
        Game.loadedDefaultAssetsAfterObservable = false;

        Game.updateMenuKeyboardDisplayKeys();
        /**
         * @type {(GameGUI,NullGUI)} GameGUI; alternative is NullGUI
         */
        Game.gui = null;
        if (Game.bUseGUI) {
            Game.gui = GameGUI;
            Game.gui.initialize(); // Problem in BabylonNative; see CreateFullscreenUI; can't use AdvancedDynamicTexture
        }
        Game.initFreeCamera(false, false);
        Game.initPostProcessing();

        Game.initialized = true;
        Game.initRenderLoops();
        Game.initializePhaseFour();
        return 0;
    }
    static initializePhaseFour() {
        if (Game.initializedPhaseFour) {
            return 0;
        }
        BABYLON.Tools.Log("Initializing, Phase Four; creating workers");
        Game.initializedPhaseFour = true;
        if (Game.useNative) { // Problem in BabylonNative; no support for workers
            return Game.initializePhaseFive();
        }
        Game.tickWorker = new Worker(String(Game.rootDirectory).concat("resources/js/workers/tick.worker.js"));
        Game.tickWorker.onmessage = Game.tickWorkerOnMessage;
        Game.transformsWorker = new Worker(String(Game.rootDirectory).concat("resources/js/workers/transforms.worker.js"));
        Game.transformsWorker.onmessage = Game.transformsWorkerOnMessage;
        Game.entityLogicWorker = new Worker(String(Game.rootDirectory).concat("resources/js/workers/entityLogicOffline.worker.js"));
        Game.entityLogicWorker.onmessage = Game.entityLogicWorkerOnMessage;
        
        if (Game.debugMode) {
            Game.transformsWorker.postMessage({
                "cmd": "setDebugMode",
                "sta": 0,
                "msg": {
                    "debugMode": true
                }
            });
            Game.tickWorker.postMessage({
                "cmd": "setDebugMode",
                "sta": 0,
                "msg": {
                    "debugMode": true
                }
            });
            Game.entityLogicWorker.postMessage({
                "cmd": "setDebugMode",
                "sta": 0,
                "msg": {
                    "debugMode": true
                }
            });
        }
        Game.tickWorker.postMessage({
            "cmd": "useNative",
            "sta": 0,
            "msg": {
                "useNative": Game.useNative
            }
        });
        Game.entityLogicWorker.postMessage({
            "cmd": "useNative",
            "sta": 0,
            "msg": {
                "useNative": Game.useNative
            }
        });

        Game.entityLogicTickChannel = new MessageChannel();
        Game.tickWorkerPostMessage("connectEntityLogic", 0, null, Callback.createDummy(Game.initializePhaseFive), [Game.entityLogicTickChannel.port1]);
        Game.entityLogicWorkerPostMessage("connectTick", 0, null, Callback.createDummy(Game.initializePhaseFive), [Game.entityLogicTickChannel.port2]);
        Game.entityLogicTransformsChannel = new MessageChannel();
        Game.transformsWorkerPostMessage("connectEntityLogic", 0, null, Callback.createDummy(Game.initializePhaseFive), [Game.entityLogicTransformsChannel.port1]);
        Game.entityLogicWorkerPostMessage("connectTransforms", 0, null, Callback.createDummy(Game.initializePhaseFive), [Game.entityLogicTransformsChannel.port2]);
        //Game.initializePhaseFive();
        //setTimeout(() => {Game.initializePhaseFive()}, 2000);
        return 0;
    }
    static initializePhaseFive() {
        if (Game.initializedPhaseFive) {
            return 0;
        }
        if (Game.bConnectedTickToEntityLogic && Game.bConnectedTransformsToEntityLogic && Game.bConnectedEntityLogicToTick && Game.bConnectedEntityLogicToTransforms) {
            Game.initializedPhaseFive = true;
            Game.initializePhaseSix();
        }
        return 0;
    }
    static initializePhaseSix() {
        if (Game.initializedPhaseSix) {
            return 0;
        }
        BABYLON.Tools.Log("Initializing, Phase Six; assuming direct control");
        Game.initializedPhaseSix = true;
        if (Game.bUseGUI) {
            Game.gui.show();
        }
        Game.initPointerEventListeners();
        if (Game.bSkipMainMenu) {
            if (Game.bUseGUI) {
                Game.gui.mainMenu.hide();
                Game.gui.hide();
            }
            Game.loadCellAndSetPlayerAt();
        }
        else {
            if (Game.bUseGUI) {
                Game.gui.mainMenu.show();
            }
        }
        Game.resize(true);
        if (Game._playSoundTest) {
            Game.playAnnoyingMeatyThwack();
        }
        return 0;
    }
    static initializeShadows() {
        if (!Game.useShadows) {
            return 0;
        }
        BABYLON.Tools.Log("Initializing shadows");
        Game.sunLight = new BABYLON.DirectionalLight("sunLight", new BABYLON.Vector3(-1, -1, -1), Game.scene);
        Game.sunLight.intensity = 1;
        Game.sunLight.shadowMinZ = -90 * 2;
        Game.sunLight.shadowMaxZ = 130 * 2;
        Game.shadowGenerator = new BABYLON.CascadedShadowGenerator(1024, Game.sunLight);
        Game.shadowGenerator.usePercentageCloserFiltering = true;
        Game.shadowGenerator.filteringQuality = BABYLON.ShadowGenerator.QUALITY_MEDIUM;
        Game.shadowGenerator.bias = 0.003;
        Game.shadowGenerator.autoCalcDepthBounds = false;
        return 0;
    }
    static setResolution(x, y) {
        Game.renderWidth = Tools.filterInt(x, 480);
        Game.renderHeight = Tools.filterInt(y, 480);
        Game.canvas.width = Game.renderWidth;
        Game.canvas.height = Game.renderHeight;
        Game.resize(false);
        return 0;
    }
    static resize(callEngineResize = true) {
        if (Game.useNative) {}
        else {
            if (callEngineResize) {
                Game.engine.resize();
                Game.renderWidth = Game.engine.getRenderWidth();
                Game.renderHeight = Game.engine.getRenderHeight();
            }
        }
        if (Game.bUseGUI) {
            Game.gui.resize();
        }
        return 0;
    }
    static _renderLoopFunction() {
        if (!Game.initialized) {
            return 1;
        }
        Game.currentFrame += 1;
        if (Game.currentFrame > Math.floor(Game.engine.getFps())) {
            Game.currentFrame = 0;
        }
        Game.scene.render();
        return 0;
    }
    static _beforeRenderFunction() {
        if (!Game.initialized) {
            return 1;
        }
        if (!(Game.hasPlayerEntity()) || !(Game.hasPlayerController())) {
            return 1;
        }
        if (Game.playerController.hasTarget()) {
            if (Game.bUseGUI) {
                Game.gui.hud.actionTooltip.update();
            }
        }
        if (Game.bBeforeRenderForceCameraBounds && Game.camera instanceof BABYLON.ArcRotateCamera) {
            Game.camera.alpha = Tools.moduloRadians(Game.camera.alpha);
            if (Game.camera.beta < Game.cameraFPDistance) {
                Game.camera.beta = Game.cameraFPDistance;
            }
            else if (Game.camera.beta > Game.cameraMaxDistance) {
                Game.camera.beta = Game.cameraMaxDistance;
            }
        }
        for (let characterController in CharacterController.list()) {
            CharacterController.get(characterController).moveAV();
        }
        if (Game.bBeforeRenderUpdateProjectiles) {
            for (let projectile in Projectile.list()) {
                if (Projectile.get(projectile).falling) {
                    Projectile.get(projectile).moveAV();
                }
            }
        }
        return 0;
    }
    static _afterRenderFunction() {
        if (!Game.initialized) {
            return 1;
        }
        for (let characterController in CharacterController.list()) {
            CharacterController.get(characterController).preMoveAV();
        }
        if (Game.bBeforeRenderCameraBoundsCheck && Game.hasPlayerController()) {
            Game.updateCameraTarget();
        }
        if (Game.defaultPipeline instanceof BABYLON.PostProcessRenderPipeline && Game.defaultPipeline.imageProcessing.vignetteEnabled) {
            let character = Game.getCachedEntity(Game.playerEntityID);
            Game.defaultPipeline.imageProcessing.vignetteWeight = 5 + (100 - (character.health / character.maxHealth * 100));
        }
        if (Game.functionsToRunBeforeRender.length > 0) {
            Game.functionsToRunBeforeRender.forEach((nFunction) => {
                nFunction()
            });
        }
        if (Game.bUseGUI) {
            if (Game.gui != null && DebugGameGUI.isVisible) {
                Game.updateDebugCollisionList();
            }
        }
        return 0;
    }

    static importScene(file, parentCallbackID = null) {
        let callback = null;
        if (Callback.has(parentCallbackID)) {
            callback = Callback.get(parentCallbackID)["callback"];
        }
        BABYLON.SceneLoader.ImportMesh(
            undefined,
            file.substr(0, file.lastIndexOf("/") + 1),
            file.substr(file.lastIndexOf("/") + 1),
            Game.scene,
            function (meshes, particleSystems, skeletons) {
                if (typeof callback == "function") {
                    callback(meshes);
                }
            }
        );
        return 0;
    }
    static importMeshes(file = null, meshIDs = null, callbackID = null) {
        if (file == null) {
            return 1;
        }
        if (!meshIDs) {
            Callback.createGroup(file, callbackID);
            if (Game.loadedFiles.has(file)) {
                return 0;
            }
            else {
                Game.loadedFiles.add(file);
            }
        }
        if (Game.debugMode && Game.debugVerbosity > 3) BABYLON.Tools.Log(`Running importMeshes(${file})`);
        let importedMeshes = {};
        BABYLON.SceneLoader.ImportMesh(
            meshIDs, // meshNames
            file.substr(0, file.lastIndexOf("/") + 1), // rootUrl
            file.substr(file.lastIndexOf("/") + 1), // sceneFilename
            Game.scene, // scene
            (meshes, particleSystems, skeletons) => { // onSuccess
                for (let i = 0; i < meshes.length; i++) {
                    meshes[i].name = meshes[i].id;
                    meshes[i].setEnabled(false);
                    meshes[i].material = Game.loadedMaterials["default"];
                    importedMeshes[meshes[i].id] = meshes[i];
                    if (skeletons[i] != undefined) {
                        meshes[i].skeleon = skeletons[i];
                    }
                    Game.loadedMeshes[meshes[i].id] = meshes[i];
                    if (Game.debugMode && Game.debugVerbosity > 4) BABYLON.Tools.Log("Importing mesh " + meshes[i].id + " from " + file + ".");
                    if (meshIDs && callbackID) {
                        Callback.run(callbackID, meshes[i]);
                    }
                }
                if (!meshIDs) {
                    Callback.runGroup(file);
                }
            },
            function () { // onProgress
                if (Game.debugMode && Game.debugVerbosity > 4) BABYLON.Tools.Log("Importing meshes from " + file + "...");
            },
            function () { // onError
                if (Game.debugMode && Game.debugVerbosity > 3) BABYLON.Tools.Error("Error while importing meshes from " + file);
            }
        );
        return 0;
    }

    static initializePhysics() {
        Game.physicsPlugin = new BABYLON.CannonJSPlugin();
        Game.scene.enablePhysics(Game.scene.gravity, Game.physicsPlugin);
        return 0;
    }
    static sceneOnPointerObservable(e) {
        switch (e.type) {
            case BABYLON.PointerEventTypes.POINTERDOWN:
                if (e.event.button == 0) {
                    Game.controls.onMouseDown(e.event);
                }
                else if (e.event.button == 1) { }
                else if (e.event.button == 2) { }
                break;
            case BABYLON.PointerEventTypes.POINTERUP:
                if (e.event.button == 0) {
                    Game.controls.onMouseUp(e.event);
                }
                else if (e.event.button == 1) { }
                else if (e.event.button == 2) { }
                break;
            case BABYLON.PointerEventTypes.POINTERMOVE:
                Game.controls.onMove(e.event);
                break;
            case BABYLON.PointerEventTypes.POINTERWHEEL:
                Game.controls.onScroll(e.event);
                break;
            case BABYLON.PointerEventTypes.POINTERPICK:
                break;
            case BABYLON.PointerEventTypes.POINTERTAP:
                if (e.event.button == 0) {
                    Game.controls.onClick(e.event);
                }
                else if (e.event.button == 1) { }
                else if (e.event.button == 2) {
                    Game.controls.onContext(e.event);
                }
                break;
            case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
                break;
        }
        return 0;
    }
    static initPointerEventListeners() {
        if (Game.initializingPointerEventListeners) {
            return 0;
        }
        else if (Game.initializedPointerEventListeners) {
            return 0;
        }
        Game.initializingPointerEventListeners = true;
        if (!Game.eventListeners.hasOwnProperty("click")) {
            Game.eventListeners['click'] = window.document.addEventListener("click", Game.pointerLock);
        }
        if (!Game.eventListeners.hasOwnProperty("contextmenu")) {
            Game.eventListeners['contextmenu'] = window.document.addEventListener("contextmenu", Game.controls.onContext);
        }
        if (!Game.eventListeners.hasOwnProperty("pointerover")) {
            //Game.eventListenerPointerOver = window.document.addEventListener("pointerover", Game.pointerLockChange);
        }
        if (!Game.eventListeners.hasOwnProperty("pointerout")) {
            Game.eventListeners['pointerout'] = window.document.addEventListener("pointerout", Game.pointerRelease);
        }
        if (!Game.eventListeners.hasOwnProperty("pointerlockerror")) {
            Game.eventListeners['pointerlockerror'] = window.document.addEventListener("pointerlockerror", Game.requestPointerLock);
        }
        // Scene actions
        if (!Game.sceneExecuteCodeActions.hasOwnProperty("keyDown")) {
            Game.sceneExecuteCodeActions["keyDown"] = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
                Game.controls.onKeyDown(evt.sourceEvent);
            });
        }
        Game.scene.actionManager.registerAction(Game.sceneExecuteCodeActions["keyDown"]);
        if (!Game.sceneExecuteCodeActions.hasOwnProperty("keyUp")) {
            Game.sceneExecuteCodeActions["keyUp"] = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
                Game.controls.onKeyUp(evt.sourceEvent);
            });
        }
        Game.scene.actionManager.registerAction(Game.sceneExecuteCodeActions["keyUp"]);
        if (!Game.sceneExecuteCodeActions.hasOwnProperty("longPress")) {
            Game.sceneExecuteCodeActions["longPress"] = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLongPressTrigger, function (evt) {
                Game.controls.onLongPress(evt.sourceEvent);
            });
        }
        Game.scene.actionManager.registerAction(Game.sceneExecuteCodeActions["longPress"]);
        Game.scene.onPointerObservable.add(Game.sceneOnPointerObservable);
        if (Game.bUseGUI) {
            Game.gui.cursor.unlock();
        }
        Game.initializedPointerEventListeners = true;
        Game.initializingPointerEventListeners = false;
        return 0;
    }
    static detachPointerEventListeners() {
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.detachPointerEventListeners()");
        if (Game.initializingPointerEventListeners) {
            return 0;
        }
        else if (!Game.initializedPointerEventListeners) {
            return 0;
        }
        Game.initializedPointerEventListeners = false;
        if (Game.bUseGUI) {
            Game.gui.cursor.lock();
        }
        Game.pointerRelease();
        if (Game.eventListeners.hasOwnProperty('click')) {
            window.document.removeEventListener("click", Game.pointerLock);
            delete Game.eventListeners['click'];
        }
        if (Game.eventListeners.hasOwnProperty('contextmenu')) {
            window.document.removeEventListener("contextmenu", Game.controls.onContext);
            Game.canvas.removeEventListener("contextmenu", Game.controls.onContext);
            delete Game.eventListeners['contextmenu'];
        }
        if (Game.eventListeners.hasOwnProperty('pointerover')) {
            window.document.removeEventListener("pointerover", Game.pointerLockChange);
            delete Game.eventListeners['pointerover'];
        }
        if (Game.eventListeners.hasOwnProperty('pointerout')) {
            window.document.removeEventListener("pointerout", Game.pointerRelease);
            delete Game.eventListeners['pointerout'];
        }
        if (Game.eventListeners.hasOwnProperty('pointerlockerror')) {
            window.document.removeEventListener("pointerlockerror", Game.requestPointerLock);
            delete Game.eventListeners['pointerlockerror'];
        }
        // Scene actions
        if (Game.sceneExecuteCodeActions.hasOwnProperty("keyDown")) {
            Game.scene.actionManager.unregisterAction(Game.sceneExecuteCodeActions["keyDown"]);
        }
        if (Game.sceneExecuteCodeActions.hasOwnProperty("keyUp")) {
            Game.scene.actionManager.unregisterAction(Game.sceneExecuteCodeActions["keyUp"]);
        }
        if (Game.sceneExecuteCodeActions.hasOwnProperty("longPress")) {
            Game.scene.actionManager.unregisterAction(Game.sceneExecuteCodeActions["longPress"]);
        }
        Game.scene.onPointerObservable.remove(Game.sceneOnPointerObservable);
        return 0;
    }
    static preInitCamera() {
        if (Game.camera instanceof BABYLON.Camera) {
            Game.backupCameraTransforms();
            Game.defaultPipeline.removeCamera(Game.camera);
            Game.detachCamera();
        }
        Game.initRenderLoops();
        Game.initPointerEventListeners();
        return 0;
    }
    static postInitCamera() {
        Game.overwriteCameraTransforms();
        return 0;
    }
    static initFollowCamera(offset = BABYLON.Vector3.Zero()) {
        Game.preInitCamera();
        if (!(Game.playerController instanceof EntityController) || !(Game.playerController.getBoneByName("FOCUS") instanceof BABYLON.Bone)) {
            return 1;
        }
        Game.camera = new BABYLON.FollowCamera(
            "camera",
            Game.playerController.focusMesh.getAbsolutePosition(),
            Game.scene
        );
        //Game.camera.collisionRadius = new BABYLON.Vector3(0.1, 0.1, 0.1);
        //Game.camera.checkCollisions = true;
        //Game.camera.wheelPrecision = 100;
        Game.camera.upperRadiusLimit = Game.cameraMaxDistance;
        Game.camera.lowerRadiusLimit = Game.cameraFPDistance;
        //Game.camera.angularSensibilityX = 3500;
        //Game.camera.angularSensibilityY = 3500;
        //Game.camera.keysLeft = [];
        //Game.camera.keysRight = [];
        //Game.camera.keysUp = [];
        //Game.camera.keysDown = [];
        if (Game.useNative) {}
        else {
            Game.camera.attachControl(Game.canvas, false);
        }

        Game.camera.minZ = Game.cameraMinDistance;
        Game.camera.maxZ = Game.cameraMaxDistance;
        Game.camera.lowerHeightOffsetLimit = -2;
        Game.camera.upperHeightOffsetLimit = 2;
        Game.camera.cameraAcceleration = 0.0035;
        Game.camera.maxSpeed = 1;
        Game.camera.lockedTarget = Game.playerController.focusMesh;
        Game.postInitCamera();
        Game.initPostProcessing();
        return 0;
    }
    static initArcRotateCamera(offset = BABYLON.Vector3.Zero()) {
        Game.preInitCamera();
        if (!(Game.playerController instanceof EntityController) || !(Game.playerController.getBoneByName("FOCUS") instanceof BABYLON.Bone)) {
            return 1;
        }
        Game.camera = new BABYLON.ArcRotateCamera(
            "camera",
            -(Game.playerController.getRotation().y + BABYLON.Tools.ToRadians(90)),
            Math.PI / 2.5,
            3,
            Game.playerController.getBoneByName("FOCUS").getAbsolutePosition(Game.playerController.collisionMesh),
            Game.scene);
        Game.camera.collisionRadius = new BABYLON.Vector3(0.1, 0.1, 0.1);
        Game.camera.checkCollisions = false;
        Game.camera.wheelPrecision = 100;
        Game.camera.upperRadiusLimit = Game.cameraMaxDistance;
        Game.camera.lowerRadiusLimit = Game.cameraFPDistance;
        Game.camera.angularSensibilityX = 3500;
        Game.camera.angularSensibilityY = 3500;
        Game.camera.keysLeft = [];
        Game.camera.keysRight = [];
        Game.camera.keysUp = [];
        Game.camera.keysDown = [];
        if (Game.useNative) {}
        else {
            Game.camera.attachControl(Game.canvas, false);
        }

        Game.camera.minZ = Game.cameraMinDistance;
        Game.camera.lockedTarget = Game.playerController.focusMesh;
        if (Game.useCameraRay) {
            Game.cameraRay = new BABYLON.Ray(Game.cameraFocus.absolutePosition, BABYLON.Vector3.Forward());
        }
        Game.postInitCamera();
        Game.initPostProcessing();
        return 0;
    }
    static initFreeCamera(applyGravity = false, updateChild = false) {
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.initFreeCamera");
        Game.preInitCamera();
        if (Game.hasPlayerController() && updateChild) {
            Game.unassignPlayer(!updateChild);
        }
        Game.camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(2, 0.8, -20), Game.scene);
        Game.camera.radius = Game.cameraMaxDistance;
        Game.camera.minZ = Game.cameraMinDistance;
        Game.camera.heightOffset = 1;
        Game.camera.rotationOffset = 0;
        Game.camera.speed = 0.25;
        if (Game.useNative) {}
        else {
            Game.camera.attachControl(Game.canvas, true);
        }
        if (Game.physicsEnabled && !Game.physicsForProjectilesOnly) { }
        else {
            Game.camera.applyGravity = applyGravity;
            Game.camera.ellipsoid = new BABYLON.Vector3(0.1, 1.1, 0.1);
            Game.camera.checkCollisions = false;
        }
        Game.postInitCamera();
        Game.initPostProcessing();
        return 0;
    }
    static detachCamera() {
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.detachCamera()");
        Game.detachRenderLoops();
        if (Game.camera instanceof BABYLON.Camera) {
            Game.defaultPipeline.removeCamera(Game.camera);
            Game.camera.dispose();
            Game.camera = null;
        }
        return 0;
    }
    static initRenderLoops() {
        if (Game.engine._activeRenderLoops.length != 0) {
            return 0;
        }
        Game.engine.runRenderLoop(Game._renderLoopFunction);
        // idk how to check for these :V
        // Game.scene.onBeforeRenderObservable["_observers"][0]["callback"] === Game._beforeRenderFunction
        // too lazy and tired rn :v everything works, gonna push
        Game.scene.registerBeforeRender(Game._beforeRenderFunction);
        Game.scene.registerAfterRender(Game._afterRenderFunction);
        return 0;
    }
    static detachRenderLoops() {
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.detachRenderLoops()");
        Game.scene.unregisterAfterRender(Game._afterRenderFunction);
        Game.scene.unregisterBeforeRender(Game._beforeRenderFunction);
        Game.engine.stopRenderLoop(Game._renderLoopFunction);
        return 0;
    }
    static overwriteCameraTransforms() {
        Game.camera.radius = (Game.cameraRadius || 0.0);
        Game.camera.alpha = (Game.cameraAlpha || 0.0);
        Game.camera.beta = (Game.cameraBeta || 0.0);
        return 0;
    }
    static backupCameraTransforms() {
        Game.cameraRadius = (Game.camera.radius || 0.0);
        Game.cameraAlpha = (Game.camera.alpha || 0.0);
        Game.cameraBeta = (Game.camera.beta || 0.0);
        return 0;
    }
    static updateMenuKeyboardDisplayKeys() {
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.updateMenuKeyboardDisplayKeys()");
        if (Game.initialized && Game.bUseGUI && Game.gui.initialized) {
            Game.gui.hud.actionTooltip.setLetter();
        }
        return 0;
    }
    static initPostProcessing() {
        if (Game.defaultPipeline instanceof BABYLON.PostProcessRenderPipeline) {
            Game.defaultPipeline.dispose();
        }
        Game.defaultPipeline = new BABYLON.DefaultRenderingPipeline("default", false, Game.scene, [Game.camera]);
        Game.defaultPipeline.samples = 2;
        Game.defaultPipeline.fxaaEnabled = true; // if true, breaks on Chrome 80.0.3987.132 with nvidia driver 440 on GNU/Linux
        Game.defaultPipeline.cameraFov = Game.camera.fov;
        Game.defaultPipeline.imageProcessing.vignetteEnabled = true;
        return 0;
    }
    static loadDefaultAssets() {
        Game.loadedDefaultAssetsAfterObservable = false;
        Game.loadDefaultTextures();
        if (!Game.useNative) Game.loadDefaultImages(); // Problem in BabylonNative
        Game.loadDefaultMaterials();
        Game.loadDefaultMeshes();
        Game.importDefaultMaterials();
        Game.importDefaultMeshes();
        return 0;
    }
    static loadDefaultAssetsAfterObservable() {
        if (Game.loadedDefaultAssetsAfterObservable) {
            return 0;
        }
        Game.loadedDefaultAssetsAfterObservable = true;
        if (!Game.useNative) Game.loadDefaultSounds(); // Problem in BabylonNative
        if (!Game.useNative) Game.loadDefaultVideos(); // Problem in BabylonNative
        return 0;
    }
    static loadDefaultImages() {
        Game.loadSVG("missingTexture");
        Game.loadSVG("circularEye");
        Game.loadSVG("feralEye");
        Game.loadSVG("oblongEye");
        return 0;
    }
    static loadDefaultTextures() {
        if (!Game.loadedTextures.hasOwnProperty("default"))
            Game.loadedTextures["default"] = new BABYLON.Texture(null, Game.scene);
        if (!Game.loadedTextures.hasOwnProperty("missingTexture"))
            Game.loadTexture("missingTexture");
        return 0;
    }
    static loadDefaultMaterials() {
        if (!Game.loadedMaterials.hasOwnProperty("default"))
            Game.setLoadedMaterial("default", new BABYLON.StandardMaterial("default", Game.scene));
        if (!Game.loadedMaterials.hasOwnProperty("collisionMaterial")) {
            if (Game.showCollisionBoxes)
                Game.setLoadedMaterial("collisionMaterial", new BABYLON.StandardMaterial("collisionMaterial", Game.scene));
            else
                Game.setLoadedMaterial("collisionMaterial", new BABYLON.Material("collisionMaterial", Game.scene));
        }
        if (!Game.loadedMaterials.hasOwnProperty("missingMaterial"))
            Game.setLoadedMaterial("missingMaterial", new BABYLON.StandardMaterial("missingMaterial", Game.scene));
        if (!Game.loadedMaterials.hasOwnProperty("loadingMaterial"))
            Game.setLoadedMaterial("loadingMaterial", new BABYLON.StandardMaterial("loadingMaterial", Game.scene));
        if (!Game.loadedMaterials.hasOwnProperty("missingMaterial"))
            Game.setLoadedMaterial("missingMaterial", "missingTexture");
        Game.loadedMaterials["default"].specularColor.copyFrom(BABYLON.Color3.Black());
        Game.loadedMaterials["missingMaterial"].specularColor.copyFrom(BABYLON.Color3.Black());
        Game.loadedMaterials["loadingMaterial"].specularColor.copyFrom(BABYLON.Color3.Black());
        Game.loadedMaterials["loadingMaterial"].diffuseColor.copyFrom(new BABYLON.Color3(1, 0.85, 1));
        return 0;
    }
    static loadDefaultMeshes() {
        if (!Game.loadedMeshes.hasOwnProperty("NONE"))
            Game.setLoadedMesh("NONE", BABYLON.MeshBuilder.CreateBox("missingMesh", { height: 0.0125, width: 0.0125, depth: 0.0125 }, Game.scene));
        if (!Game.loadedMeshes.hasOwnProperty("missingMesh"))
            Game.setLoadedMesh("missingMesh", BABYLON.MeshBuilder.CreateBox("missingMesh", { height: 0.3, width: 0.3, depth: 0.3 }, Game.scene));
        if (!Game.loadedMeshes.hasOwnProperty("loadingMesh"))
            Game.setLoadedMesh("loadingMesh", BABYLON.MeshBuilder.CreateSphere("loadingMesh", { diameter: 0.6 }, Game.scene));
        if (!Game.loadedMeshes.hasOwnProperty("cameraFocus"))
            Game.setLoadedMesh("cameraFocus", BABYLON.MeshBuilder.CreateBox("cameraFocus", { height: 0.05, width: 0.05, depth: 0.05 }, Game.scene));
        Game.loadedMeshes["missingMesh"].material = Game.loadedMaterials["missingMaterial"];
        Game.loadedMeshes["missingMesh"].setEnabled(false);
        Game.loadedMeshes["loadingMesh"].setEnabled(false);
        Game.loadedMeshes["cameraFocus"].isVisible = false;
        Game.setMeshMaterial("missingMesh", "missingMaterial");
        return 0;
    }
    static loadDefaultSounds() {
        Game.setLoadedSound("missingSound", new BABYLON.Sound("missingSound", "resources/sounds/Spell Miss.mp3", Game.scene));
        Game.setLoadedSound("hit", new BABYLON.Sound("hit", "resources/sounds/Hit.mp3", Game.scene));
        Game.setLoadedSound("openDoor", new BABYLON.Sound("openDoor", "resources/sounds/Open Door.mp3", Game.scene));
        return 0;
    }
    static loadDefaultVideos() {
        Game.setLoadedVideo("missingVideo", new BABYLON.VideoTexture("missingVideo", ["resources/videos/missingVideo.webm", "resources/videos/missingVideo.mp4"], Game.scene, true, true, BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE, {}));
        return 0;
    }
    /**
     * Loads and creates a BABYLON.Sound
     * @param {string} soundID Sound ID
     * @returns {number} Integer status code
     */
    static loadSound(soundID = "", parentCallbackID) {
        soundID = Tools.filterID(soundID);
        if (soundID.length == 0) {
            return 2;
        }
        if (Game.hasLoadedSound(soundID)) {
            Callback.run(parentCallbackID);
            return 0;
        }
        else if (Game.hasAvailableSound(soundID)) {
            let loadedSound = new BABYLON.Sound(soundID, Game.soundLocations[soundID], Game.scene, ()=>{Callback.run(parentCallbackID)});
            loadedSound.name = soundID;
            Game.setLoadedSound(soundID, loadedSound);
            return 0;
        }
        return 1;
    }
    static setVideoLocation(id, location) {
        Game.videoLocations[id] = location;
        return 0;
    }
    static setVideoLocationsFromJSON(jsonBlob, callback = null) {
        for (let id in jsonBlob) {
            Game.setVideoLocation(id, jsonBlob[id]);
        }
        Game.importingVideoLocations = false;
        if (typeof callback == "function") {
            callback();
        }
        return 0;
    }
    static importVideoLocations(jsonFile = "resources/json/videoLocations.json", callback = null) {
        Game.loadJSON(jsonFile, Game.setVideoLocationsFromJSON, null, callback);
        return 0;
    }
    static setLoadedVideo(videoID, videoTexture) {
        videoID = Tools.filterID(videoID);
        if (videoID.length == 0) {
            return 2;
        }
        if (!(videoTexture instanceof BABYLON.VideoTexture)) {
            return 2;
        }
        Game.loadedVideos[videoID] = videoTexture;
        return 0;
    }
    static getLoadedVideo(videoID) {
        if (!Game.hasLoadedVideo(videoID) && Game.hasAvailableVideo(videoID)) {
            Game.loadVideo(videoID);
        }
        if (!Game.hasLoadedVideo(videoID)) {
            return 2;
        }
        return Game.loadedVideos[videoID];
    }
    static hasAvailableVideo(videoID) {
        if (!Game.initialized) {
            return false;
        }
        return Game.videoLocations.hasOwnProperty(videoID);
    }
    static hasLoadedVideo(videoID) {
        if (!Game.initialized) {
            return false;
        }
        return Game.loadedVideos.hasOwnProperty(videoID);
    }
    static hasVideo(videoID) {
        if (!Game.initialized) {
            return false;
        }
        if (Game.hasLoadedVideo(videoID)) {
            return true;
        }
        else if (Game.hasAvailableVideo(videoID)) {
            Game.loadVideo(videoID);
            return true;
        }
        return false;
    }
    static getVideo(videoID) {
        if (Game.hasLoadedVideo(videoID)) {
            return Game.loadedVideos[videoID];
        }
        else if (Game.hasAvailableVideo(videoID)) {
            Game.loadVideo(videoID);
            return Game.loadedVideos["missingVideo"];
        }
        else {
            return Game.loadedVideos["missingVideo"];
        }
    }
    static loadVideo(videoID = "") {
        videoID = Tools.filterID(videoID);
        if (videoID.length == 0) {
            return 2;
        }
        if (Game.hasLoadedVideo(videoID)) {
            return 0;
        }
        else if (Game.hasAvailableVideo(videoID)) {
            let loadedVideo = new BABYLON.VideoTexture(videoID, Game.videoLocations[videoID], Game.scene);
            loadedVideo.name = videoID;
            Game.setLoadedVideo(videoID, loadedVideo);
            return 0;
        }
        return 1;
    }
    static createVideo(id = "", videoID = "", width = 1.0, height = 1.0) {
        id = Tools.filterID(id, Tools.genUUIDv4());
        videoID = Tools.filterID(videoID);
        if (!Game.hasAvailableVideo(videoID)) {
            return 1;
        }
        let videoTexture = Game.cloneVideo(videoID);
        if (!(videoTexture instanceof BABYLON.VideoTexture)) {
            return 2;
        }
        let videoMaterial = new BABYLON.StandardMaterial(id.concat("Material"), Game.scene);
        videoMaterial.name = id.concat("Material");
        videoMaterial.diffuseTexture = videoTexture;
        videoMaterial.emissiveColor = BABYLON.Color3.White();
        let videoMesh = BABYLON.MeshBuilder.CreatePlane(id.concat("Mesh"), { "width": width, "height": height }, Game.scene);
        videoMesh.name = id.concat("Mesh");
        videoMesh.material = videoMaterial;
        return videoMesh;
    }
    static cloneVideo(videoID = "") {
        if (!Game.hasAvailableVideo(videoID)) {
            return 1;
        }
        let videoTexture = new BABYLON.VideoTexture(videoID, Game.videoLocations[videoID], Game.scene, false, false, BABYLON.Texture.NEAREST_SAMPLINGMODE, { autoplay: false, autoUpdateTexture: true, loop: true });
        Game.setVideoClone(videoID, videoTexture);
        return videoTexture;
    }
    static setVideoClone(videoID = "", videoTextureClone) {
        if (!Game.videoClones.hasOwnProperty(videoID)) {
            Game.videoClones[videoID] = new Array();
        }
        videoTextureClone.name = videoID;
        Game.videoClones[videoID].push(videoTextureClone);
        return 0;
    }
    static removeVideoClone(videoTextureClone) {
        if (!(videoTextureClone instanceof BABYLON.VideoTexture)) {
            return 2;
        }
        if (!Game.videoClones.hasOwnProperty(videoID)) {
            return 1;
        }
        Game.videoClones[videoTextureClone.name].some((videoTexture) => {
            if (videoTextureClone.uid == videoTexture.uid) {
                Game.videoClones[videoTextureClone.name].remove(videoTextureClone);
                return true;
            }
        });
        return 0;
    }
    static loadSVG(imageID) {
        if (Game.useNative) {
            return Game.loadSVGNative(imageID);
        }
        return Game.loadSVGBrowser(imageID);
    }
    static loadSVGNative(imageID) {
        let xhr = new XMLHttpRequest();
        let parser = new DOMParser();
        xhr.overrideMimeType("image/svg+xml");
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState === 4) {
                try {
                    xhr.onreadystatechange = null;
                    Game.loadedSVGDocuments[imageID] = parser.parseFromString(xhr.response, "image/svg+xml");
                }
                catch (e) {
                    Game.textureLocations[imageID] = Game.textureLocations["missingTexture"];
                }
            }
        }, false);
        xhr.open("GET", String("file://").concat(Game.rootDirectory).concat(Game.textureLocations[imageID]), true);
        xhr.send();
        return 0;
    }
    /**
     * Loads and creates an XML(SVG)Document
     * @param {string} imageID Image ID to load, and set the new XML(SVG)Document to
     * @returns {number} Integer status code
     */
    static loadSVGBrowser(imageID) {
        let xhr = new XMLHttpRequest();
        let parser = new DOMParser();
        xhr.open("GET", Game.textureLocations[imageID], true);
        xhr.overrideMimeType("image/svg+xml");
        xhr.onload = (e) => {
            if (e.target.status == 200) {
                Game.loadedSVGDocuments[imageID] = parser.parseFromString(e.target.response, "image/svg+xml");
            }
            else {
                Game.textureLocations[imageID] = Game.textureLocations["missingTexture"];
            }
        };
        xhr.onerror = (e) => {
            if (e.target.status == 404) {
                Game.textureLocations[imageID] = Game.textureLocations["missingTexture"];
            }
        };
        xhr.send();
        return 0;
    }
    /**
     * Modifies a given SVG Document, by ID, and create an IMG
     * @param {string} imageID SVG Document ID
     * @param {string} newImageID new Image ID
     * @param {object} elementStyles eg. {iris:{background:green}, sclera:{background:#fff}}
     * @returns {SVGElement}
     */
    static modifySVG(imageID, newImageID, elementStyles) {
        if (Game.debugMode) BABYLON.Tools.Log(`Running Game.modifySVG(${imageID}, ${newImageID}, ${elementStyles})`);
        if (!Game.loadedSVGDocuments.hasOwnProperty(imageID)) {
            return 2;
        }
        let newSVGDocument = Game.loadedSVGDocuments[imageID].cloneNode(true);
        for (let element in elementStyles) {
            if (newSVGDocument.hasChildNodes(element)) {
                for (let style in elementStyles[element]) {
                    newSVGDocument.getElementById(element).style.setProperty(style, elementStyles[element][style]);
                    newSVGDocument.getElementById(element).setAttribute("fill", elementStyles[element][style]);
                }
            }
        }
        let serializer = new XMLSerializer();
        let markup = serializer.serializeToString(newSVGDocument);
        let encodedData = 'data:image/svg+xml;base64,' + window.btoa(markup);
        Game.setLoadedTexture(newImageID, BABYLON.Texture.LoadFromDataString(newImageID, encodedData, Game.scene));
        return 0;
    }
    /**
     * Loads and creates a BABYLON.Texture
     * @param {string} textureID Texture ID
     * @param {object} options Options
     * @returns {number} Integer status code
     */
    static loadTexture(textureID = "", options = {}) {
        textureID = Tools.filterID(textureID);
        if (textureID.length == 0) {
            return 2;
        }
        if (Game.hasLoadedTexture(textureID)) {
            return 0;
        }
        else if (Game.hasAvailableTexture(textureID)) {
            let loadedTexture = new BABYLON.Texture(Game.textureLocations[textureID], Game.scene);
            loadedTexture.name = textureID;
            if (options.hasOwnProperty("hasAlpha")) {
                loadedTexture.hasAlpha = options["hasAlpha"] == true;
            }
            Game.setLoadedTexture(textureID, loadedTexture);
            return 0;
        }
        return 2;
    }
    /**
     * Loads and creates a BABYLON.Material
     * @param {string} materialID Material ID
     * @param {string} diffuseTextureID Texture ID for diffuse texture
     * @param {string} bumpTextureID Texture ID for bump/normal map
     * @param {object} options Options
     * @returns {number} Integer status code
     */
    static loadMaterial(materialID = "", diffuseTextureID = "", bumpTextureID = "", options = {}, parentCallbackID) {
        materialID = Tools.filterID(materialID);
        if (Game.debugMode) console.group(`Running Game.loadMaterial(${materialID}, ..., ${parentCallbackID})`);
        if (materialID.length == 0) {
            console.warn("Material ID is invalid.");
            console.groupEnd();
            return 2;
        }
        diffuseTextureID = Tools.filterID(diffuseTextureID);
        if (diffuseTextureID.length > 0 && Game.hasAvailableTexture(diffuseTextureID) && !Game.hasLoadedTexture(diffuseTextureID)) {
            Game.loadTexture(diffuseTextureID, options);
        }
        else if (Game.hasAvailableTexture(materialID) || Game.hasLoadedTexture(materialID)) {
            diffuseTextureID = materialID;
        }
        else {
            diffuseTextureID = "missingTexture";
        }
        bumpTextureID = Tools.filterID(bumpTextureID);
        if (bumpTextureID.length > 0 && Game.hasAvailableTexture(bumpTextureID) && !Game.hasLoadedTexture(bumpTextureID)) {
            Game.loadTexture(bumpTextureID);
        }
        let loadedMaterial = new BABYLON.StandardMaterial(materialID)
        loadedMaterial.name = materialID;
        loadedMaterial.diffuseTexture = Game.getLoadedTexture(diffuseTextureID);
        if (Game.hasLoadedTexture(bumpTextureID)) {
            loadedMaterial.bumpTexture = Game.getLoadedTexture(bumpTextureID);
        }
        loadedMaterial.specularColor.copyFrom(BABYLON.Color3.Black());
        if (typeof options == "object") {
            if (options.hasOwnProperty("backFaceCulling")) {
                loadedMaterial.backFaceCulling = options["backFaceCulling"] == true;
            }
            if (options.hasOwnProperty("opacityTexture")) {
                loadedMaterial.opacityTexture = Game.getLoadedTexture(options["opacityTexture"]);
            }
            if (options.hasOwnProperty("specularTexture")) {
                loadedMaterial.specularTexture = Game.getLoadedTexture(options["specularTexture"]);
            }
            if (options.hasOwnProperty("distortionTexture")) {
                loadedMaterial.distortionTexture = Game.getLoadedTexture(options["distortionTexture"]);
            }
            if (options.hasOwnProperty("specularColor")) {
                if (options["specularColor"] instanceof BABYLON.Color3) {
                    loadedMaterial.specularColor.copyFrom(options["specularColor"]);
                }
                else {
                    loadedMaterial.specularColor.copyFrom(BABYLON.Color3.Black());
                }
            }
        }
        Game.setLoadedMaterial(materialID, loadedMaterial);
        if (Callback.has(parentCallbackID)) {
            if (Game.debugMode) console.log(parentCallbackID);
            Callback.run(parentCallbackID);
        }
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    /**
     * 
     * @param {string} materialID Material ID
     * @param {string} replacementMaterialID Material ID
     * @returns {number} Integer status code
     */
    static changeMaterial(materialID, replacementMaterialID) {
        materialID = Tools.filterID(materialID);
        if (!Game.hasMaterial(materialID)) {
            return 1;
        }
        replacementMaterialID = Tools.filterID(replacementMaterialID);
        if (Game.hasMaterial(replacementMaterialID)) {
            Game.loadMaterial(replacementMaterialID);
        }
        else {
            return 2;
        }
        let material = Game.getLoadedMaterial(materialID);
        let replacementMaterial = Game.getLoadedMaterial(replacementMaterialID);
        for (let meshID in Game.meshMaterialMeshes) {
            if (Game.meshMaterialMeshes[meshID].hasOwnProperty(materialID)) {
                if (!Game.meshMaterialMeshes[meshID].hasOwnProperty(replacementMaterialID)) {
                    Game.meshMaterialMeshes[meshID][replacementMaterialID] = {};
                }
                for (let childMeshID in Game.meshMaterialMeshes[meshID][materialID]) {
                    if (Game.meshMaterialMeshes[meshID][materialID][childMeshID] instanceof BABYLON.InstancedMesh) {
                        Game.meshMaterialMeshes[meshID][materialID][childMeshID].sourceMesh.material = replacementMaterial;
                    }
                    else {
                        Game.meshMaterialMeshes[meshID][materialID][childMeshID].material = replacementMaterial;
                    }
                    Game.meshMaterialMeshes[meshID][replacementMaterialID][childMeshID] = Game.meshMaterialMeshes[meshID][materialID][childMeshID];
                    delete Game.meshMaterialMeshes[meshID][materialID][childMeshID];
                }
                delete Game.meshMaterialMeshes[meshID][materialID];
            }
        }
        for (let meshID in Game.clonedMeshes) {
            if (Game.clonedMeshes[meshID].material === material) {
                Game.clonedMeshes[meshID].material = replacementMaterial;
            }
        }
        return 0;
    }
    static changeMeshMaterial() { // TODO: this
        return 0;
    }
    static changeMeshInstanceMaterial() { // TODO: this, too
        return 0;
    }
    /**
     * 
     * @param {string} materialID Material ID
     * @returns {number} Integer status code
     */
    static unloadMaterial(materialID) {
        materialID = Tools.filterID(materialID);
        if (!Game.hasLoadedMaterial(materialID)) {
            return 1;
        }
        Game.changeMaterial(materialID, "missingMaterial");
        let material = Game.loadedMaterials[materialID];
        delete Game.loadedMaterials[materialID];
        material.dispose();
        return 0;
    }
    /**
     * 
     * @param {JSON} jsonBlob 
     * @param {(function|null)} callback 
     * @returns {number} Integer status code
     */
    static setMeshPropertiesFromJSON(jsonBlob, callback = null) {
        for (let id in jsonBlob) {
            Game.meshProperties[id] = Object.assign({}, jsonBlob[id]);
        }
        Game.importingMeshProperties = false;
        if (typeof callback == "function") {
            callback();
        }
        return 0;
    }
    /**
     * 
     * @param {string} jsonFile 
     * @param {(function|null)} [callback] 
     * @returns {number} Integer status code
     */
    static importMeshProperties(jsonFile = "resources/json/meshProperties.json", callback = null) {
        Game.loadJSON(jsonFile, Game.setMeshPropertiesFromJSON, null, callback);
        return 0;
    }
    /**
     * 
     * @param {string} id 
     * @param {string} location 
     * @returns {number} Integer status code
     */
    static setMeshLocation(id, location) {
        Game.meshLocations[id] = location;
        return 0;
    }
    /**
     * 
     * @param {JSON} jsonBlob 
     * @param {(function|null)} [callback] 
     * @returns {number} Integer status code
     */
    static setMeshLocationsFromJSON(jsonBlob, callback = null) {
        for (let id in jsonBlob) {
            Game.setMeshLocation(id, jsonBlob[id]);
        }
        Game.importingMeshLocations = false;
        if (typeof callback == "function") {
            callback();
        }
        return 0;
    }
    /**
     * 
     * @param {string} jsonFile 
     * @param {(function|null)} [callback] 
     * @returns {number} Integer status code
     */
    static importMeshLocations(jsonFile = "resources/json/meshLocations.json", callback = null) {
        Game.loadJSON(jsonFile, Game.setMeshLocationsFromJSON, null, callback);
        return 0;
    }
    /**
     * Loads and create a BABYLON.Mesh
     * @param {string} meshID Mesh ID
     * @param {(string|null)} callbackID 
     * @param {boolean} loadOnlyMesh 
     * @returns {number} Integer status code
     */
    static loadMesh(meshID, callbackID = null, loadOnlyMesh = false) {
        meshID = Tools.filterID(meshID);
        if (meshID.length == 0) {
            return 2;
        }
        if (Game.hasLoadedMesh(meshID)) {
            if (callbackID) {
                Callback.run(callbackID, Game.getLoadedMesh(meshID));
            }
            return 0;
        }
        else if (Game.hasAvailableMesh(meshID)) {
            if (Game.debugMode && Game.debugVerbosity > 3) BABYLON.Tools.Log(`Running Game.loadMesh(${meshID})`);
            switch (meshID) {
                case "aardwolfM":
                case "aardwolfF":
                case "foxM":
                case "foxF":
                case "foxSkeletonN": {
                    Game.importMeshes("resources/meshes/hitboxes/canine.babylon");
                    break;
                }
                case "missingMesh":
                case "loadingMesh":
                case "cameraFocus": {
                    break;
                }
            }
            if (loadOnlyMesh) {
                Game.importMeshes(Game.meshLocations[meshID], [meshID], callbackID);
            }
            else {
                Game.importMeshes(Game.meshLocations[meshID], null, callbackID);
            }
            return 1;
        }
        return 2;
    }
    static loadMeshes(meshIDs, parentCallbackID = null, loadOnlyMeshes = true) {
        if (!(meshIDs instanceof Array)) {
            return 1;
        }
        let nMeshIDs = [];
        for (let i = 0; i < meshIDs.length; i++) {
            nMeshIDs.push(Tools.filterID(meshIDs[i]));
        }
        let callbackID = Tools.genUUIDv4();
        Callback.create(callbackID, parentCallbackID, [nMeshIDs], Game.loadMeshesPhaseTwo);
        for (let i = 0; i < nMeshIDs.length; i++) {
            Game.loadMesh(nMeshIDs[i], callbackID, loadOnlyMeshes);
        }
        return 0;
    }
    static loadMeshesPhaseTwo(meshIDs, ignoreThis, parentCallbackID) {
        let hasLoadedMeshes = true;
        for (let i = 0; i < meshIDs.length; i++) {
            if (!Game.hasLoadedMesh(meshIDs[i])) {
                hasLoadedMeshes = false;
            }
        }
        if (!hasLoadedMeshes) {
            return 1;
        }
        Callback.setRun(parentCallbackID, true);
        Callback.runParent(parentCallbackID, meshIDs);
        return 0;
    }
    /**
     * 
     * @param {string} meshID 
     * @param {BABYLON.AbstractMesh} mesh 
     * @param {(object|null)} [options] 
     * @returns {number} Integer status code
     */
    static setLoadedMesh(meshID, mesh, options = null) {
        meshID = Tools.filterID(meshID);
        if (meshID.length == 0) {
            return 2;
        }
        if (!(mesh instanceof BABYLON.Mesh)) {
            return 2;
        }
        mesh.isVisible = false;
        mesh.setEnabled(false);
        Game.loadedMeshes[meshID] = mesh;
        return 0;
    }
    /**
     * 
     * @param {string} meshID 
     * @returns {(BABYLON.AbstractMesh|null)}
     */
    static getLoadedMesh(meshID) {
        if (!Game.hasLoadedMesh(meshID)) {
            return null;
        }
        return Game.loadedMeshes[meshID];
    }
    /**
     * 
     * @param {string} meshID 
     * @param {object} options 
     * @returns {number} Integer status code
     */
    static updateLoadedMesh(meshID, options) {
        meshID = Tools.filterID(meshID);
        if (meshID.length == 0) {
            return 2;
        }
        if (!Game.loadedMeshes.hasOwnProperty(meshID)) {
            return 2;
        }
        if (!(Game.loadedMeshes[meshID] instanceof BABYLON.Mesh)) {
            return 2;
        }
        let loadedMesh = Game.loadedMeshes[meshID];
        if (typeof options == "object") {
            if (options.hasOwnProperty("billboardMode")) {
                loadedMesh.billboardMode = options["billboardMode"];
            }
            if (options.hasOwnProperty("material")) {
                if (options["material"] instanceof BABYLON.Material) {
                    loadedMesh.material = options["material"];
                }
                else if (Game.hasLoadedMaterial(options["material"])) {
                    loadedMesh.material = Game.getLoadedMaterial(options["material"]);
                }
                else if (Game.hasAvailableMaterial(options["material"])) {
                    Game.loadMaterial(options["material"]);
                    loadedMesh.material = Game.getLoadedMaterial(options["material"]);
                }
            }
        }
        return 0;
    }
    static setSoundLocation(id, location) {
        Game.soundLocations[id] = location;
        return 0;
    }
    static setSoundLocationsFromJSON(jsonBlob, callback = null) {
        for (let id in jsonBlob) {
            Game.setSoundLocation(id, jsonBlob[id]);
        }
        Game.importingSoundLocations = false;
        if (typeof callback == "function") {
            callback();
        }
        return 0;
    }
    static importSoundLocations(jsonFile = "resources/json/soundLocations.json", callback = null) {
        Game.loadJSON(jsonFile, Game.setSoundLocationsFromJSON, null, callback);
        return 0;
    }
    static setLoadedSound(soundID, sound) {
        soundID = Tools.filterID(soundID);
        if (soundID.length == 0) {
            return 2;
        }
        if (!(sound instanceof BABYLON.Sound)) {
            return 2;
        }
        Game.loadedSounds[soundID] = sound;
        return 0;
    }
    static getLoadedSound(soundID) {
        if (!Game.hasLoadedSound(soundID)) {
            return undefined;
        }
        return Game.loadedSounds[soundID];
    }
    static setTextureLocation(id, location) {
        Game.textureLocations[id] = location;
        return 0;
    }
    static setTextureLocationsFromJSON(jsonBlob, callback = null) {
        for (let id in jsonBlob) {
            Game.setTextureLocation(id, jsonBlob[id]);
        }
        Game.importingTextureLocations = false;
        if (typeof callback == "function") {
            callback();
        }
        return 0;
    }
    static importTextureLocations(jsonFile = "resources/json/textureLocations.json", callback = null) {
        Game.loadJSON(jsonFile, Game.setTextureLocationsFromJSON, null, callback);
        return 0;
    }
    static setLoadedTexture(textureID, texture) {
        textureID = Tools.filterID(textureID);
        if (textureID.length == 0) {
            return 2;
        }
        if (!(texture instanceof BABYLON.Texture)) {
            return 2;
        }
        Game.loadedTextures[textureID] = texture;
        return 0;
    }
    static getLoadedTexture(textureID) {
        if (!Game.hasLoadedTexture(textureID) && Game.hasAvailableTexture(textureID)) {
            Game.loadTexture(textureID);
        }
        if (!Game.hasLoadedTexture(textureID)) {
            return 2;
        }
        return Game.loadedTextures[textureID];
    }
    static setLoadedMaterial(materialID, material, options) {
        materialID = Tools.filterID(materialID);
        if (materialID.length == 0) {
            return 2;
        }
        if (!(material instanceof BABYLON.Material)) {
            return 2;
        }
        Game.loadedMaterials[materialID] = material;
        return 0;
    }
    static getLoadedMaterial(materialID) {
        return Game.loadedMaterials[materialID];
    }
    static updateLoadedMaterial(materialID, options) {
        materialID = Tools.filterID(materialID);
        if (materialID.length == 0) {
            return 2;
        }
        if (!Game.loadedMaterials.hasOwnProperty(materialID)) {
            return 2;
        }
        if (!(Game.loadedMaterials[materialID] instanceof BABYLON.Material)) {
            return 2;
        }
        let loadedMaterial = Game.loadedMaterials[materialID];
        if (typeof options == "object") {
            if (options.hasOwnProperty("diffuseTexture")) {
                loadedMaterial.diffuseTexture = Game.getLoadedTexture(options["diffuseTexture"]);
            }
            if (options.hasOwnProperty("opacityTexture")) {
                loadedMaterial.opacityTexture = Game.getLoadedTexture(options["opacityTexture"]);
            }
            if (options.hasOwnProperty("specularTexture")) {
                loadedMaterial.specularTexture = Game.getLoadedTexture(options["specularTexture"]);
            }
            if (options.hasOwnProperty("distortionTexture")) {
                loadedMaterial.distortionTexture = Game.getLoadedTexture(options["distortionTexture"]);
            }
            if (options.hasOwnProperty("speed")) {
                loadedMaterial.speed = options["speed"];
            }
            if (options.hasOwnProperty("specularColor")) {
                if (options["specularColor"] instanceof BABYLON.Color3) {
                    loadedMaterial.specularColor.copyFrom(options["specularColor"]);
                }
                else {
                    loadedMaterial.specularColor.copyFrom(BABYLON.Color3.Black());
                }
            }
        }
        return 0;
    }
    static setMeshMaterial(mesh, material) {
        if (!(mesh instanceof BABYLON.Mesh)) {
            if (Game.hasLoadedMesh(mesh)) {
                mesh = Game.getLoadedMesh(mesh);
            }
            else {
                return 2;
            }
        }
        if (!(material instanceof BABYLON.Material)) {
            if (Game.hasLoadedMaterial(material)) {
                material = Game.getLoadedMaterial(material);
            }
            else {
                return 2;
            }
        }
        if (Game.debugMode && Game.debugVerbosity > 3) BABYLON.Tools.Log(`Running setMeshMaterial(${mesh.name}, ${material.name})`);
        if (!Game.loadedMeshMaterials.hasOwnProperty(mesh.name)) {
            Game.loadedMeshMaterials[mesh.name] = {};
        }
        Game.loadedMeshMaterials[mesh.name][material.name] = mesh;
        mesh.material = material;
        return 0;
    }
    static addClonedMesh(mesh, newMeshID = undefined) {
        newMeshID = Tools.filterID(newMeshID);
        if (!(mesh instanceof BABYLON.Mesh)) {
            return 2;
        }
        if (newMeshID.length == 0) {
            newMeshID = mesh.id;
        }
        Game.clonedMeshes[newMeshID] = mesh;
        return 0;
    }
    static getClonedMesh(meshID) {
        if (Game.hasClonedMesh(meshID)) {
            return Game.clonedMeshes[meshID];
        }
        return 2;
    }
    static hasClonedMesh(meshID) {
        if (!Game.initialized) {
            return false;
        }
        return Game.clonedMeshes.hasOwnProperty(meshID);
    }
    static addInstancedMesh(mesh, newMeshID = undefined) {
        newMeshID = Tools.filterID(newMeshID);
        if (!(mesh instanceof BABYLON.InstancedMesh)) {
            return 2;
        }
        if (newMeshID.length == 0) {
            newMeshID = mesh.id;
        }
        Game.instancedMeshes[newMeshID] = mesh;
        return 0;
    }
    static getInstancedMesh(meshID) {
        if (Game.hasInstancedMesh(meshID)) {
            return Game.instancedMeshes[meshID];
        }
        return 2;
    }
    static hasInstancedMesh(meshID) {
        if (!Game.initialized) {
            return false;
        }
        return Game.instancedMeshes.hasOwnProperty(meshID);
    }
    static addMeshMaterialMeshes(meshID, materialID, childMesh) {
        if (!Game.meshMaterialMeshes.hasOwnProperty(meshID)) {
            Game.meshMaterialMeshes[meshID] = {};
            Game.meshMaterialMeshes[meshID][materialID] = {};
        }
        else if (!Game.meshMaterialMeshes[meshID].hasOwnProperty(materialID)) {
            Game.meshMaterialMeshes[meshID][materialID] = {};
        }
        Game.meshMaterialMeshes[meshID][materialID][childMesh.id] = childMesh;
        return 0;
    }
    static removeMeshMaterialMeshes(meshID, materialID, childMeshID) {
        if (!Game.meshMaterialMeshes.hasOwnProperty(meshID)) {
            return 1;
        }
        if (!Game.meshMaterialMeshes[meshID].hasOwnProperty(materialID)) {
            return 1;
        }
        if (Game.debugMode) BABYLON.Tools.Log(`Running Game.removeMeshMaterialMeshes(${meshID},${materialID},${childMeshID})`);
        if (Game.meshMaterialMeshes.hasOwnProperty(meshID)) {
            if (Game.meshMaterialMeshes[meshID].hasOwnProperty(materialID)) {
                if (Game.meshMaterialMeshes[meshID][materialID].hasOwnProperty(childMeshID)) {}
                else {
                    if (Game.debugMode) BABYLON.Tools.Warn(`${meshID}:${materialID}:${childMeshID} doesn't exist`);
                    return 1;
                }
            }
            else {
                if (Game.debugMode) BABYLON.Tools.Warn(`${meshID}:${materialID} doesn't exist`);
                return 1;
            }
        }
        else {
            if (Game.debugMode) BABYLON.Tools.Warn(`${meshID} doesn't exist`);
            return 1;
        }
        let mesh = Game.meshMaterialMeshes[meshID][materialID][childMeshID];
        if (mesh instanceof BABYLON.InstancedMesh) {
            delete Game.instancedMeshes[childMeshID];
        }
        else if (mesh instanceof BABYLON.Mesh) {
            delete Game.clonedMeshes[childMeshID];
        }
        else {
            return 2; // can't do anything :v
        }
        delete Game.meshMaterialMeshes[meshID][materialID][childMeshID];
        mesh.dispose();
        // Clear empty map entries
        if (Object.keys(Game.meshMaterialMeshes[meshID][materialID]).length == 0) {
            delete Game.meshMaterialMeshes[meshID][materialID];
        }
        if (Object.keys(Game.meshMaterialMeshes[meshID]).length == 0) {
            delete Game.meshMaterialMeshes[meshID];
        }
        return 0;
    }
    static getMeshLocation(meshID) {
        if (Game.meshLocations.hasOwnProperty(meshID)) {
            return Game.meshLocations[meshID];
        }
        else {
            return 2;
        }
    }
    static getMesh(meshID) {
        if (meshID == undefined) {
            return 2;
        }
        else if (meshID instanceof BABYLON.AbstractMesh) {
            return meshID;
        }
        else if (typeof meshID == "string") {
            if (Game.hasLoadedMesh(meshID)) {
                return Game.loadedMeshes[meshID];
            }
            else if (Game.hasClonedMesh(meshID)) {
                return Game.clonedMeshes[meshID];
            }
            else if (Game.hasInstancedMesh(meshID)) {
                return Game.instancedMeshes[meshID];
            }
        }
        return 2;
    }
    static setIconLocation(id, location) {
        Game.iconLocations[id] = location;
        return 0;
    }
    static setIconLocationsFromJSON(jsonBlob, callback = null) {
        for (let id in jsonBlob) {
            Game.setIconLocation(id, jsonBlob[id]);
        }
        Game.importingIconLocations = false;
        if (typeof callback == "function") {
            callback();
        }
        return 0;
    }
    static importIconLocations(jsonFile = "resources/json/iconLocations.json", callback = null) {
        Game.loadJSON(jsonFile, Game.setIconLocationsFromJSON, null, callback);
        return 0;
    }
    static hasIcon(iconID) {
        if (!Game.initialized) {
            return false;
        }
        return Game.iconLocations.hasOwnProperty(iconID);
    }
    static getIcon(iconID) {
        if (Game.iconLocations.hasOwnProperty(iconID)) {
            return Game.iconLocations[iconID];
        }
        else {
            return Game.iconLocations["missingIcon"];
        }
    }
    static filterVector3(vector3, returnOnFail = BABYLON.Vector3.Zero()) {
        if (vector3 instanceof Array) {
            let x = returnOnFail.x;
            let y = returnOnFail.y;
            let z = returnOnFail.z;
            if (vector3.length >= 3) {
                z = Number.parseFloat(vector3[2]);
                if (isNaN(z))
                    z = returnOnFail.z;
            }
            if (vector3.length >= 2) {
                y = Number.parseFloat(vector3[1]);
                if (isNaN(y))
                    y = returnOnFail.y;
            }
            if (vector3.length >= 0) {
                x = Number.parseFloat(vector3[0]);
                if (isNaN(x))
                    x = returnOnFail.x;
            }
            return new BABYLON.Vector3(x, y, z);
        }
        else if (vector3 instanceof BABYLON.Vector3) {
            return Game.filterVector3([vector3.x, vector3.y, vector3.z], returnOnFail);
        }
        else if (vector3 instanceof Object) {
            if (vector3.hasOwnProperty("x") && vector3.hasOwnProperty("y") && vector3.hasOwnProperty("z")) {
                return Game.filterVector3([vector3.x, vector3.y, vector3.z], returnOnFail);
            }
        }
        else if (Number.parseFloat(vector3) != NaN) {
            vector3 = Number.parseFloat(vector3);
            if (isNaN(vector3))
                vector3 = 0;
            return new BABYLON.Vector3(vector3, vector3, vector3);
        }
        return returnOnFail;
    }
    static filterController(blob) {
        if (blob instanceof EntityController) {
            return blob;
        }
        blob = EntityController.get(blob);
        if (blob instanceof EntityController) {
            return blob;
        }
        return null;
    }
    static filterID(string) {
        return Tools.filterID(string, Tools.genUUIDv4());
    }
    static generateMeshID(string, prefix = "", suffix = "") {
        string = Tools.filterID(string, String(prefix).concat(Tools.genUUIDv4()).concat(suffix));
        if (Game.scene.getMeshByID(string) != null) {
            string = String(prefix).concat(string).concat(Tools.genUUIDv4()).concat(suffix);
        }
        return string;
    }
    static generateMaterialID(string, prefix = "", suffix = "") {
        string = Tools.filterID(string, String(prefix).concat(Tools.genUUIDv4()).concat(suffix));
        if (Game.scene.getMaterialByID(string) != null) {
            string = String(prefix).concat(string).concat(Tools.genUUIDv4()).concat(suffix);
        }
        return string;
    }
    /**
     * 
     * @param {string} file 
     * @param {(function|null)} [onload] 
     * @param {(function|null)} [onerror] 
     * @param {(function|null)} [onfinal] 
     */
    static loadJSON(file, onload = null, onerror = null, onfinal = null) {
        if (Game.useNative) {
            return Tools.loadJSONNative(file, onload, onerror, onfinal);
        }
        return Tools.loadJSONBrowser(file, onload, onerror, onfinal);
    }
    /**
     * 
     * @param {string} file 
     * @param {(function|null)} [onload] 
     * @param {(function|null)} [onerror] 
     * @param {(function|null)} [onfinal] 
     */
    static loadScript(file, onload = null, onerror = null, onfinal = null) {
        if (Game.useNative) {
            return Tools.loadScriptNative(file, onload, onerror, onfinal);
        }
        return Tools.loadScriptBrowser(file, onload, onerror, onfinal);
    }
    static importDefaultMaterials() {
        return Game.loadScript("resources/json/materials.js");
    }
    static importDefaultMeshes() {
        return Game.loadScript("resources/json/meshes.js");
    }
    /**
     * 
     * @param {string} id 
     * @param {object} meshOptions 
     * @param {string} material 
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} rotation 
     * @param {BABYLON.Vector3} scaling 
     * @param {object} options 
     */
    static createTiledMesh(id = "", meshOptions = {xmin:0, zmin:0, xmax: 1, zmax: 1, subdivisions: {w:1, h:1}}, materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {"checkCollisions":true}) {
        id = Game.generateMeshID(id, "tiledMesh-");
        materialID = Tools.filterID(materialID, "missingMaterial");
        position = Game.filterVector3(position);
        rotation = Game.filterVector3(rotation);
        scaling = Game.filterVector3(scaling);
        if (Game.debugMode && Game.debugVerbosity > 3) console.group(`Running Game.createTiledMesh(${id}, {...}, ${materialID})`);
        let material = null;
        if (Game.hasLoadedMaterial(materialID)) {
            material = Game.getLoadedMaterial(materialID);
        }
        else if (Game.loadMaterial(materialID) == 0) {
            material = Game.getLoadedMaterial(materialID);
        }
        else {
            material = Game.getLoadedMaterial("missingMaterial");
        }
        let mesh = new BABYLON.MeshBuilder.CreateTiledGround(id, meshOptions, Game.scene);
        if (mesh instanceof BABYLON.AbstractMesh) {
            mesh.material = material;
            mesh.position.copyFrom(position);
            mesh.rotation.copyFrom(rotation);
            mesh.scaling.copyFrom(scaling);
            mesh.checkCollisions = true;
            if (Game.physicsEnabled && !Game.physicsForProjectilesOnly) {
                Game.assignPlanePhysicsToMesh(mesh);
            }
            Game.addMeshMaterialMeshes("tiledMesh", materialID, id);
        }
        Game.tiledMeshes[id] = mesh;
        if (Game.debugMode && Game.debugVerbosity > 3) console.groupEnd();
        return mesh;
    }
    static createTiledGround(...params) {
        return Game.createTiledMesh(...params);
    }
    /**
     * 
     * @param {string} id 
     * @param {object} meshOptions 
     * @param {string} material 
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} rotation 
     * @param {BABYLON.Vector3} scaling 
     * @param {object} options 
     */
    static createTiledCeiling(id = "", meshOptions = {xmin:0, zmin:0, xmax: 1, zmax: 1, subdivisions: {w:1, h:1}}, materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options) {
        scaling = Game.filterVector3(scaling);
        scaling.y *= -1;
        return Game.createTiledMesh(id, meshOptions, materialID, position, rotation, scaling, options);
    }
    /**
     * Creates a primitive wall for collision
     * @param {BABYLON.Vector3} start 
     * @param {BABYLON.Vector3} end 
     * @param {number} yRotation 
     */
    static createCollisionWall(id = "", start = BABYLON.Vector3.Zero(), end = BABYLON.Vector3.Zero(), yRotation = 0) {
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.createCollisionWall");
        id = Game.generateMeshID(id, "wall-");
        if (yRotation != 0 && Tools.isInt(yRotation)) {
            yRotation = BABYLON.Tools.ToRadians(yRotation);
        }
        let wallWidth = 0.125;
        if (start.x == end.x) {
            yRotation += BABYLON.Tools.ToRadians(90);
            wallWidth = Math.abs(end.z - start.z);
        }
        else if (start.z == end.z) {
            wallWidth = Math.abs(end.x - start.x);
        }
        else {
            return 1;
        }
        let xPosition = (start.x + end.x) / 2;
        let yPosition = (start.y + end.y) / 2;
        let zPosition = (start.z + end.z) / 2;
        let wall = BABYLON.MeshBuilder.CreateBox(id, { "height": end.y - start.y, "depth": 0.125, "width": wallWidth }, Game.scene);
        wall.material = Game.loadedMaterials["collisionMaterial"];
        wall.position.set(xPosition, yPosition, zPosition);
        wall.rotation.y = yRotation;
        wall.checkCollisions = true;
        if (Game.physicsEnabled && !Game.physicsForProjectilesOnly) {
            Game.assignPlanePhysicsToMesh(wall, { "mass": 0 });
        }
        Game.collisionMeshes[wall.id] = true;
        return wall;
    }
    static createCollisionWallByMesh(mesh) {
        return 0;
    }
    /**
     * Creates a primitive floor for collision
     * @param {(BABYLON.Vector2|Array)} start 
     * @param {(BABYLON.Vector2|Array)} end 
     * @param {number} yPosition 
     */
    static createCollisionPlane(id = "", start = BABYLON.Vector2.Zero(), end = BABYLON.Vector2.One(), yPosition = 0) {
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.createCollisionPlane");
        id = Game.generateMeshID(id, "plane-");
        if (start instanceof BABYLON.AbstractMesh || typeof start == "string") {
            return Game.createCollisionPlaneByMesh(start);
        }
        if (start instanceof BABYLON.Vector3) {
            start = new BABYLON.Vector2(start.x, start.z);
        }
        else if (start instanceof Array) {
            start = BABYLON.Vector2.FromArray(start);
        }
        if (end instanceof BABYLON.Vector3) {
            end = new BABYLON.Vector2(end.x, end.z);
        }
        else if (end instanceof Array) {
            end = BABYLON.Vector2.FromArray(end);
        }
        let width = Math.abs(end.x - start.x);
        let depth = Math.abs(end.y - start.y);
        let xPosition = (start.x + end.x) / 2;
        yPosition -= 0.06125;
        let zPosition = (start.y + end.y) / 2;
        let floor = BABYLON.MeshBuilder.CreateBox(id, { "height": 0.125, "depth": depth, "width": width }, Game.scene);
        floor.material = Game.loadedMaterials["collisionMaterial"];
        floor.position.set(xPosition, yPosition, zPosition);
        floor.checkCollisions = true;
        if (Game.physicsEnabled && !Game.physicsForProjectilesOnly) {
            Game.assignPlanePhysicsToMesh(floor, { "mass": 0 });
        }
        Game.collisionMeshes[floor.id] = true;
        return floor;
    }
    /**
     * Creates a primitive floor for collision
     * @param {(BABYLON.AbstractMesh|string)} mesh 
     */
    static createCollisionPlaneByMesh(mesh) {
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            if (Game.hasMesh(mesh)) {
                mesh = Game.getMesh(mesh);
            }
            else {
                return 1;
            }
        }
        let xRadius = mesh.getBoundingInfo().boundingBox.extendSize.x * mesh.scaling.x;
        let zRadius = mesh.getBoundingInfo().boundingBox.extendSize.z * mesh.scaling.z;
        let start = new BABYLON.Vector2(mesh.position.x, mesh.position.z);
        let end = new BABYLON.Vector2(mesh.position.x + xRadius * 2, mesh.position.z + zRadius * 2);
        yPosition = mesh.position.y;
        return Game.createCollisionPlane(start, end, yPosition);
    }
    /**
     * Creates a primitive ramp for collision
     * @param {BABYLON.Vector3} start 
     * @param {BABYLON.Vector3} end 
     * @param {number} yPosition 
     */
    static createCollisionRamp(start = BABYLON.Vector3.Zero(), end = BABYLON.Vector3.Zero(), yRotation = 0) {
        if (typeof start != "object" || typeof end != "object" || !start.hasOwnProperty("z") || !end.hasOwnProperty("z")) {
            return 2;
        }
        if (start.x == end.x || start.y == end.y || start.z == end.z) {
            return 1;
        }
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.createCollisionRamp");
        if (start.y > end.y) {
            let tempVector = start;
            start = end;
            end = tempVector;
        }
        let oppositeSide = end.y - start.y;
        let width = 0;
        let adjacentSide = 0;
        if (end.z - start.z > end.x - start.x) { // Z-based ramp
            width = end.x - start.x;
            adjacentSide = end.z - start.z;
        }
        else { // X-based ramp
            width = end.z - start.z;
            adjacentSide = end.x - start.x;
        }
        let hypotenuseAngle = Math.acos(oppositeSide / adjacentSide);
        let hypotenuseSide = oppositeSide * (1 / Math.cos(hypotenuseAngle)); // height
        let ramp = BABYLON.MeshBuilder.CreateBox("ramp", { "height": hypotenuseSide, "depth": 0.125, "width": width }, Game.scene);
        ramp.position.set((end.x + start.x) / 2 - 1, (end.y + start.y) / 2 - 0.125 / 2, (end.z + start.z) / 2 - 1);
        ramp.rotation.set(hypotenuseAngle, BABYLON.Tools.ToRadians(yRotation), 0);
        ramp.material = Game.loadedMaterials["collisionMaterial"];
        ramp.checkCollisions = true;
        if (Game.physicsEnabled && !Game.physicsForProjectilesOnly) {
            Game.assignPlanePhysicsToMesh(ramp, { "mass": 0 });
        }
        Game.collisionMeshes[ramp.id] = true;
        return ramp;
    }
    static assignPlanePhysicsToMesh(mesh) {
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.assignPlanePhysicsToMesh");
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.BoxImpostor, { "mass": 0, "restitution": 0, "disableBidirectionalTransformation": true}, Game.scene);
        return 0;
    }
    static assignCylinderPhysicsToMesh(mesh, options) {
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.assignCylinderPhysicsToMesh");
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        if (typeof options != "object") {
            options = { "mass": 0 };
        }
        mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.CylinderImpostor, options, Game.scene);
        return 0;
    }
    static assignBoxPhysicsToMesh(mesh, options) {
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.assignBoxPhysicsToMesh");
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        if (typeof options != "object") {
            options = { "mass": 0 };
        }
        mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.BoxImpostor, options, Game.scene);
        return 0;
    }
    static assignBoxPhysicsToBone(bone, options) {
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.assignBoxPhysicsToBone");
        if (!(bone instanceof BABYLON.Bone)) {
            return 2;
        }
        if (typeof options != "object") {
            options = { "mass": 0 };
        }
        // bone boxes :v idk yet
        return 2;
    }
    static assignBoxCollisionToMesh(mesh) {
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.assignBoxCollisionToMesh");
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        Game.assignBoundingBoxCollisionQueue.add(mesh);
        return 0;
    }
    static assignBoundingBoxCollisionToMesh(mesh) {
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.assignBoundingBoxCollisionToMesh");
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        Game.assignBoundingBoxCollisionQueue.delete(mesh);
        let collisionMesh = BABYLON.MeshBuilder.CreateBox(mesh.id + "-collisionBox", { width: mesh.getBoundingInfo().boundingBox.vectors[1].x - mesh.getBoundingInfo().boundingBox.vectors[0].x, height: mesh.getBoundingInfo().boundingBox.vectors[1].y - mesh.getBoundingInfo().boundingBox.vectors[0].y, depth: mesh.getBoundingInfo().boundingBox.vectors[1].z - mesh.getBoundingInfo().boundingBox.vectors[0].z }, Game.scene);
        collisionMesh.material = Game.loadedMaterials["collisionMaterial"];
        collisionMesh.checkCollisions = true;
        collisionMesh.setParent(mesh);
        let controller = collisionMesh.controller;
        if (controller instanceof DoorController) {
            if (mesh.collisionMesh.scaling.x > mesh.collisionMesh.scaling.z) {
                mesh.collisionMesh.scaling.z += mesh.collisionMesh.scaling.z * 0.1;
            }
            else {
                mesh.collisionMesh.scaling.x += mesh.collisionMesh.scaling.x * 0.2;
            }
        }
        collisionMesh.setParent(mesh);
        Game.collisionMeshes[collisionMesh.id] = true;
        return 0;
    }
    static removeTexture(texture) {
        if (texture instanceof BABYLON.Texture) {}
        else if (typeof texture == "string") {
            if (Game.loadedTextures.hasOwnProperty(texture)) {
                texture = Game.loadedTextures[texture];
            }
            else {
                return 2;
            }
        }
        else {
            return 2;
        }
        if (!(texture instanceof BABYLON.Texture)) {
            return 1;
        }
        switch (texture.name) {
            case "missingTexture":
            case "circularEye":
            case "feralEye":
            case "oblongEye":
            case "default": {
                return 0;
                break;
            }
        }
        delete Game.loadedTextures[texture.id];
        texture.dispose();
        return 0;
    }
    static removeMaterial(material) {
        if (material instanceof BABYLON.StandardMaterial) {}
        else if (typeof material == "string") {
            if (Game.loadedMaterials.hasOwnProperty(material)) {
                material = Game.loadedMaterials[material];
            }
            else {
                return 2;
            }
        }
        else {
            return 2;
        }
        if (!(material instanceof BABYLON.StandardMaterial)) {
            return 1;
        }
        switch (material.name) {
            case "collisionMaterial":
            case "missingMaterial":
            case "loadingMaterial":
            case "missingMaterial":
            case "default": {
                return 0;
                break;
            }
        }
        delete Game.loadedMaterials[material.id];
        material.dispose();
        return 0;
    }
    static removeInstancedMesh(abstractMesh) {
        return Game.removeMesh(abstractMesh);
    }
    static removeClonedMesh(abstractMesh) {
        return Game.removeMesh(abstractMesh);
    }
    static removeMesh(abstractMesh, updateChild = true) {
        if (abstractMesh instanceof BABYLON.AbstractMesh) {}
        else if (typeof abstractMesh == "string") {
            if (Game.clonedMeshes.hasOwnProperty(abstractMesh)) {
                abstractMesh = Game.clonedMeshes[abstractMesh];
            }
            else if (Game.instancedMeshes.hasOwnProperty(abstractMesh)) {
                abstractMesh = Game.instancedMeshes[abstractMesh];
            }
            else if (Game.loadedMeshes.hasOwnProperty(abstractMesh)) {
                abstractMesh = Game.loadedMeshes[abstractMesh];
            }
            else {
                return 2;
            }
        }
        else {
            return 2;
        }
        switch (abstractMesh.id) {
            case "NONE":
            case "missingMesh":
            case "loadingMesh":
            case "cameraFocus": {
                return 0;
                break;
            }
        }
        if (Game.debugMode) BABYLON.Tools.Log(`Running Game.removeMesh(${abstractMesh.id}`);
        if (abstractMesh == EditControls.pickedMesh) {
            EditControls.reset();
        }
        else if (abstractMesh == EditControls.previousPickedMesh) {
            EditControls.previousPickedMesh = null;
        }
        if (updateChild && abstractMesh.hasController()) {
            abstractMesh.controller.dispose(!updateChild);
        }
        if (Game.collisionMeshes.hasOwnProperty(abstractMesh.id)) {
            delete Game.collisionMeshes[abstractMesh.id];
        }
        if (abstractMesh.skeleton instanceof BABYLON.Skeleton) {
            if (Game.clonedMeshes.hasOwnProperty(abstractMesh.id)) {
                delete Game.clonedMeshes[abstractMesh.id];
            }
            else if (Game.instancedMeshes.hasOwnProperty(abstractMesh.id)) {
                delete Game.instancedMeshes[abstractMesh.id];
            }
            for (let i = abstractMesh.skeleton.getAnimatables().length - 1; i >= 0; i--) {
                abstractMesh.skeleton.getAnimatables()[i].dispose();
            }
            abstractMesh.skeleton.dispose();
        }
        if (Game.meshMaterialMeshes.hasOwnProperty(abstractMesh.name)) {
            if (Game.meshMaterialMeshes[abstractMesh.name].hasOwnProperty(abstractMesh.material.name)) {
                Game.removeMeshMaterialMeshes(abstractMesh.name, abstractMesh.material.name, abstractMesh.id);
            }
        }
        if (Game.loadedMeshes.hasOwnProperty(abstractMesh.id)) {
            delete Game.loadedMeshes[abstractMesh.id];
        }
        abstractMesh.dispose();
        return 0;
    }
    static removeMeshMaterial(meshID, materialID) {
        if (Game.loadedMeshMaterials.hasOwnProperty(meshID) && Game.loadedMeshMaterials[meshID].hasOwnProperty(materialID)) {
            for (let childMeshID in Game.loadedMeshMaterials[meshID][materialID]) {
                Game.removeMeshMaterialMeshes(meshID, materialID, childMeshID);
            }
            Game.loadedMeshMaterials[meshID][materialID].dispose();
            delete Game.loadedMeshMaterials[meshID][materialID];
            if (Object.keys(Game.loadedMeshMaterials[meshID]).length == 0) {
                delete Game.loadedMeshMaterials[meshID];
            }
            return 0;
        }
        return 1;
    }
    static getMeshMaterial(meshID, materialID) {
        if (Game.hasMeshMaterial(meshID, materialID)) {
            return Game.loadedMeshMaterials[meshID][materialID];
        }
        return 2;
    }
    static hasMeshMaterial(meshID, materialID) {
        if (!Game.initialized) {
            return false;
        }
        if (Game.loadedMeshMaterials.hasOwnProperty(meshID)) {
            return Game.loadedMeshMaterials[meshID].hasOwnProperty(materialID);
        }
        return false;
    }
    static hasAvailableMesh(meshID) {
        if (!Game.initialized) {
            return false;
        }
        return Game.meshLocations.hasOwnProperty(meshID);
    }
    static hasLoadedMesh(meshID) {
        if (!Game.initialized) {
            return false;
        }
        return Game.loadedMeshes.hasOwnProperty(meshID);
    }
    static hasMesh(meshID) {
        if (!Game.initialized) {
            return false;
        }
        if (Game.hasLoadedMesh(meshID)) {
            return true;
        }
        else if (Game.hasAvailableMesh(meshID)) {
            return true;
        }
        else if (Game.hasClonedMesh(meshID)) {
            return true;
        }
        else if (Game.hasInstancedMesh(meshID)) {
            return true;
        }
        return false;
    }
    static hasAvailableSound(soundID) {
        if (!Game.initialized) {
            return false;
        }
        return Game.soundLocations.hasOwnProperty(soundID);
    }
    static hasLoadedSound(soundID) {
        if (!Game.initialized) {
            return false;
        }
        return Game.loadedSounds.hasOwnProperty(soundID);
    }
    static hasSound(soundID) {
        if (!Game.initialized) {
            return false;
        }
        if (Game.hasLoadedSound(soundID)) {
            return true;
        }
        else if (Game.hasAvailableSound(soundID)) {
            return true;
        }
        return false;
    }
    static getSound(soundID) {
        if (Game.hasLoadedSound(soundID)) {
            return Game.loadedSounds[soundID];
        }
        else if (Game.hasAvailableSound(soundID)) {
            return Game.loadedSounds["missingSound"];
        }
        else {
            return Game.loadedSounds["missingSound"];
        }
    }
    /**
     * 
     * TODO: What if multiple of the same sound needs to be played :v create a separate method for playing effects
     * @param {string} soundID 
     * @param {object} options 
     * @param {string} [soundUUID] If set, the sound is cloned and assigned this ID in the Game.clonedSounds 'map'
     */
    static playSound(soundID, options = Game.soundOptions, soundUUID = "") {
        if (!Game.hasAvailableSound(soundID)) {
            return 1;
        }
        if (Game.hasLoadedSound(soundID)) {
            Game.playSoundPhaseTwo(soundID, options, soundUUID);
        }
        else {
            let callbackID = "loadSound-" + soundID;
            Callback.create(callbackID, null, [soundID, options, soundUUID], Game.playSoundPhaseTwo);
            Game.loadSound(soundID, callbackID);
        }
        return 0;
    }
    static playSoundPhaseTwo(soundID, options, soundUUID, response, parentCallbackID) {
        let sound = Game.loadedSounds[soundID];
        if (options.hasOwnProperty("loop")) {
            sound.loop = options["loop"] == true;
            if (options["loop"] && soundUUID.length == 0) {
                soundUUID = Tools.genUUIDv4();
            }
        }
        if (soundUUID.length > 0) {
            if (Game.soundCloneHeap.hasOwnProperty(soundUUID)) {
                return 0;
            }
            sound = sound.clone();
            if (!Game.soundCloneHeap.hasOwnProperty(soundID)) {
                Game.soundCloneHeap[soundID] = {};
            }
            Game.soundCloneHeap[soundID][soundUUID] = sound;
        }
        if (options.hasOwnProperty("autoplay")) {
            sound.autoplay = options["autoplay"] == true;
        }
        if (options.hasOwnProperty("volume")) {
            sound.setVolume(options["volume"]);
        }
        if (options.hasOwnProperty("playbackRate")) {
            sound.setPlaybackRate(options["playbackRate"]);
        }
        sound.play();
        return 0;
    }
    static playMusic(soundID, options = Game.soundMusicOptions) {
        if (Game.soundMusic instanceof BABYLON.Sound) {
            Game.stopSound(Game.soundMusic, SoundChannelEnum.MUSIC);
        }
        Game.soundMusic = Game.loadedSounds[soundID];
        return Game.playSound(soundID, options);
    }
    static playAmbience(soundID, options = Game.soundAmbienceOptions) {
        if (Game.soundAmbience instanceof BABYLON.Sound) {
            Game.stopSound(Game.soundAmbience, SoundChannelEnum.MUSIC);
        }
        Game.soundAmbience = Game.loadedSounds[soundID];
        return Game.playSound(soundID, options);
    }
    static playEnvironmentSoundEffect(soundID, options = Game.soundEffectEnvironmentOptions, soundUUID = "") {
        //{"loop": true, "startDelay": 0, "volume": 1, "playbackRate": 1, "repeat": 0, "loopDelay": 0};
        if (soundUUID.size == 0) {
            soundUUID = soundID;
        }
        return Game.playSound(soundID, options, soundUUID);
    }
    static playEnvironmentSoundEffects(soundIDs, options = Game.soundEffectEnvironmentOptions) {
        for (let i = 0; i < soundIDs.length; i++) {
            Game.playSound(soundIDs[i], options, soundIDs[i]);
        }
        return 0;
    }
    static playCharacterSoundEffect(soundID, options = Game.soundEffectCharacterOptions, soundUUID = "") {
        if (soundUUID.size == 0) {
            soundUUID = Tools.genUUIDv4();
        }
        return Game.playSound(soundID, options);
    }
    static stopSound(soundID, soundChannel = SoundChannelEnum.NONE, soundUUID = "") {
        if (!Game.hasSound(soundID)) {
            return 2;
        }
        if (Game.soundCloneHeap.hasOwnProperty(soundID)) {
            for (let soundUUID in Game.soundCloneHeap[soundID]) {
                Game.soundCloneHeap[soundID][soundUUID].stop();
                Game.soundCloneHeap[soundID][soundUUID].dispose();
                delete Game.soundCloneHeap[soundID][soundUUID];
            }
        }
        if (Game.loadedSounds[soundID] instanceof BABYLON.Sound) {
            if (Game.loadedSounds[soundID].isPlaying) {
                Game.loadedSounds[soundID].stop();
            }
        }
        return 0;
    }
    static pauseSound(soundID) {
        if (!Game.hasSound(soundID)) {
            return 2;
        }
        if (Game.loadedSounds[soundID] instanceof BABYLON.Sound) {
            if (Game.loadedSounds[soundID].isPlaying) {
                Game.loadedSounds[soundID].pause();
            }
        }
        return 0;
    }
    static hasAvailableTexture(textureID) {
        if (!Game.initialized) {
            return false;
        }
        return Game.textureLocations.hasOwnProperty(textureID);
    }
    static hasLoadedTexture(textureID) {
        if (!Game.initialized) {
            return false;
        }
        return Game.loadedTextures.hasOwnProperty(textureID);
    }
    static hasTexture(textureID) {
        if (!Game.initialized) {
            return false;
        }
        if (Game.hasLoadedTexture(textureID)) {
            return true;
        }
        else if (Game.hasAvailableTexture(textureID)) {
            Game.loadTexture(textureID);
            return true;
        }
        return false;
    }
    static hasAvailableMaterial(materialID) {
        if (!Game.initialized) {
            return false;
        }
        return Game.hasLoadedMaterial(materialID);
    }
    static hasLoadedMaterial(materialID) {
        if (!Game.initialized) {
            return false;
        }
        return Game.loadedMaterials.hasOwnProperty(materialID);
    }
    static hasMaterial(materialID) {
        if (!Game.initialized) {
            return false;
        }
        return Game.hasLoadedMaterial(materialID);
    }
    /**
     * Filters the creation of a mesh from those stored in loadedMeshes
     * @param  {string} id New ID for BABYLON.Mesh and EntityController
     * @param  {string} meshID String ID of Mesh to create
     * @param  {string} [materialID] String ID of Material to apply to Mesh
     * @param  {BABYLON.Vector3} position Mesh position
     * @param  {BABYLON.Vector3} [rotation] Mesh rotation
     * @param  {BABYLON.Vector3} [scaling] Mesh scaling
     * @param  {object} [options] Options
     * @returns {array}
     */
    static filterCreateMesh(id = "", meshID = "missingMesh", materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        id = Tools.filterID(id, Tools.genUUIDv4());
        if (Game.debugMode && Game.debugVerbosity > 3) BABYLON.Tools.Log(`Running Game.filterCreateMesh(${id}, ${meshID}, ${materialID})`);
        position = Game.filterVector3(position);
        rotation = Game.filterVector3(rotation);
        scaling = Game.filterVector3(scaling);
        if (typeof options != "object") {
            options = {};
        }
        options["filtered"] = true;
        if (options.hasOwnProperty("checkCollisions")) {
            options["checkCollisions"] = options["checkCollisions"] == true;
        }
        else {
            options["checkCollisions"] = false;
        }
        if (options.hasOwnProperty("unique")) {
            options["unique"] = options["unique"] == true;
        }
        else {
            options["unique"] = false;
        }
        if (!Game.hasLoadedMaterial(materialID)) {
            if (!Game.hasAvailableTexture(materialID) && !Game.hasLoadedTexture(materialID)) {
                if (Game.debugMode && Game.debugVerbosity > 3) BABYLON.Tools.Warn(`\tMaterial ${materialID} doesn't exist`);
                materialID = "missingMaterial";
            }
        }
        if (!Game.hasAvailableMesh(meshID) && !Game.hasLoadedMesh(meshID)) {
            if (Game.debugMode && Game.debugVerbosity > 3) BABYLON.Tools.Warn(`\tMesh ${meshID} doesn't exist`);
            meshID = "missingMesh";
        }
        return [id, meshID, materialID, position, rotation, scaling, options];
    }
    /**
     * Creates a billboard mesh
     * @param  {string} id New ID for BABYLON.Mesh and EntityController
     * @param  {string} [materialID] String ID of Material to apply to Mesh
     * @param  {BABYLON.Vector3} position Mesh position
     * @param  {BABYLON.Vector3} [rotation] Mesh rotation
     * @param  {BABYLON.Vector3} [scaling] Mesh scaling
     * @param  {object} [options] Options
     * @returns {BABYLON.AbstractMesh|array|number} The created mesh
     */
    static createBillboard(id = "", materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {"billboardMode":BABYLON.Mesh.BILLBOARDMODE_Y, "backFaceCulling":false}) {
        id = Game.generateMeshID(id, "billboard-");
        let mesh = BABYLON.Mesh.CreatePlane(id, 1, Game.scene);
        mesh.id = id;
        mesh.name = id;
        Game.setLoadedMesh(id, mesh);
        mesh.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
        mesh.backFaceCulling = false;
        Game.setMeshMaterial(mesh, material);
        return mesh;
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
     * @param  {(string|null)} [parentCallbackID] 
     * @returns {BABYLON.AbstractMesh|array|number} The created mesh
     */
    static createMesh(id = "", meshID = "missingMesh", materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}, parentCallbackID = null, _callbackID = Tools.genUUIDv4()) {
        meshID = Tools.filterID(meshID);
        id = Game.generateMeshID(id, meshID);
        materialID = Tools.filterID(materialID);
        position = Game.filterVector3(position);
        rotation = Game.filterVector3(rotation);
        scaling = Game.filterVector3(scaling, BABYLON.Vector3.One());
        if (typeof options != "object") {
            options = {};
        }
        if (Game.debugMode) console.group(`Running Game.createMesh(${id}, ${meshID}, ${materialID}, POT, ROT, SCA, OPT, ${parentCallbackID})`);
        /* I'll make a better way of doing this some day :v */
        switch (meshID) {
            case "cameraFocus": {
                options["unique"] = true;
                break;
            }
        }
        if (!Game.hasLoadedMaterial(materialID)) {
            Callback.create(_callbackID, parentCallbackID, [id, meshID, materialID, position, rotation, scaling, options], Game.createMeshPhaseTwo);
            Game.loadMaterial(materialID, "", "", {}, _callbackID);
            if (Game.debugMode) console.groupEnd();
            return 1;
        }
        Game.createMeshPhaseTwo(id, meshID, materialID, position, rotation, scaling, options, null, Callback.create(String("createMeshPhaseOneStatic-").concat(Tools.genUUIDv4()), parentCallbackID));
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static createMeshPhaseTwo(id, meshID, materialID, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options, response, parentCallbackID, _callbackID = Tools.genUUIDv4()) {
        if (Game.debugMode) console.group(`Running Game.createMeshPhaseTwo(${id}, ${meshID}, ${materialID}, POT, ROT, SCA, OPT, ${parentCallbackID})`);
        if (!Game.hasLoadedMesh(meshID)) {
            Callback.create(_callbackID, parentCallbackID, [id, meshID, materialID, position, rotation, scaling, options], Game.createMeshPhaseThree);
            Game.loadMesh(meshID, _callbackID);
            if (Game.debugMode) console.groupEnd();
            return 1;
        }
        Game.createMeshPhaseThree(id, meshID, materialID, position, rotation, scaling, options, null, Callback.create(String("createMeshPhaseTwoStatic-").concat(Tools.genUUIDv4()), parentCallbackID));
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static createMeshPhaseThree(id, meshID, materialID, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options, response, parentCallbackID) {
        if (Game.debugMode) console.group(`Running Game.createMeshPhaseThree(${id}, ${meshID}, ${materialID}, ..., ${response}, ${parentCallbackID})`);
        let masterMesh = Game.getLoadedMesh(meshID);
        let mesh = null;
        let material = Game.getLoadedMaterial(materialID);
        let flipRun = !(options.hasOwnProperty("skipFlipRun") && options["skipFlipRun"] == true);
        if (options["unique"]) {
            materialID = String(id).concat("-uniqueMaterial");
            material = material.clone(materialID);
            material.id = materialID;
            Game.setLoadedMaterial(materialID, material);
        }
        if (masterMesh.skeleton instanceof BABYLON.Skeleton) {
            if (Game.debugMode) console.info("Mesh has a skeleton.");
            if (Game.debugMode) console.info("Creating a clone of the mesh.");
            mesh = masterMesh.clone(id);
            mesh.makeGeometryUnique();
            mesh.id = id;
            mesh.material = material;
            mesh.name = meshID;
            mesh.skeleton = masterMesh.skeleton.clone(id);
            Game.addClonedMesh(mesh, id);
            Game.setMeshMaterial(mesh, material);
        }
        else {
            if (Game.debugMode) console.info("Mesh doesn't have a skeleton.");
            if (!Game.loadedMeshMaterials.hasOwnProperty(meshID)) {
                Game.loadedMeshMaterials[meshID] = {};
            }
            if (!Game.loadedMeshMaterials[meshID].hasOwnProperty(materialID)) {
                mesh = masterMesh.clone(meshID + materialID);
                mesh.makeGeometryUnique();
                mesh.id = id;
                mesh.material = material;
                mesh.name = meshID;
                if (Game.useShadows) {
                    mesh.receiveShadows = true;
                    Game.shadowGenerator.addShadowCaster(mesh);
                }
                mesh.setEnabled(false);
                mesh.position.set(0, -4095, 0);
                Game.setMeshMaterial(mesh, material);
            }
            if (options["unique"]) {
                if (Game.debugMode) console.info("Creating a unique clone of the mesh.");
                if (Game.debugMode && Game.debugVerbosity > 3) console.log("Creating unique clone...");
                if (Game.hasMeshMaterial(meshID, materialID)) {
                    mesh = Game.getMeshMaterial(meshID, materialID).clone(id);
                }
                else {
                    console.info(`Material ${materialID} is missing.`);
                }
                mesh.id = id;
                mesh.material = material;
                mesh.name = meshID;
                if (Game.useShadows) {
                    mesh.receiveShadows = true;
                    Game.shadowGenerator.addShadowCaster(mesh);
                }
                Game.addClonedMesh(mesh, id);
                Game.addMeshMaterialMeshes(mesh.name, material.name, mesh);
            }
            else {
                if (Game.debugMode) console.info("Creating an instance of the mesh.");
                if (Game.debugMode && Game.debugVerbosity > 3) console.log(`Creating instance of Mesh:(${meshID}), Material:(${materialID})...`);
                if (Game.hasMeshMaterial(meshID, materialID)) {
                    mesh = Game.getMeshMaterial(meshID, materialID).createInstance(id);
                }
                else {
                    console.info(`Material ${materialID} is missing.`);
                }
                mesh.id = id;
                mesh.name = meshID;
                Game.addInstancedMesh(mesh, id);
                Game.addMeshMaterialMeshes(mesh.name, material.name, mesh);
            }
        }
        if (Game.debugMode) console.info("Setting mesh transforms.");
        mesh.isVisible = true;
        mesh.position.copyFrom(position);
        mesh.rotation = new BABYLON.Vector3(BABYLON.Tools.ToRadians(rotation.x), BABYLON.Tools.ToRadians(rotation.y), BABYLON.Tools.ToRadians(rotation.z));
        mesh.scaling.copyFrom(scaling);
        mesh.setEnabled(true);
        if (options["checkCollisions"]) {
            mesh.checkCollisions = true;
        }
        if (options["isHitbox"]) {
            mesh.isHitbox = options["isHitbox"];
        }
        Callback.runNthParent(parentCallbackID, 1, mesh, flipRun);
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static createMeshes(id, meshIDs, materialID, position, rotation, scaling, options, parentCallbackID = null, _callbackID = Tools.genUUIDv4()) {
        if (!(meshIDs instanceof Array)) {
            return 1;
        }
        let nMeshIDs = [];
        for (let i = 0; i < meshIDs.length; i++) {
            nMeshIDs.push(Tools.filterID(meshIDs[i]));
        }
        if (typeof options != "object") {
            options = {};
        }
        options["skipFlipRun"] = true;
        Callback.create(_callbackID, parentCallbackID, [id, nMeshIDs, materialID, position, rotation, scaling, options], Game.createMeshesPhaseTwo);
        if (!Game.createMeshesCallbackInstancedMeshIDs.hasOwnProperty(_callbackID)) {
            Game.createMeshesCallbackInstancedMeshIDs[_callbackID] = [];
        }
        for (let i = 0; i < nMeshIDs.length; i++) {
            if (i == nMeshIDs.length - 1 && options["lastUnique"] == true) {
                options["unique"] = true;
            }
            Game.createMesh(
                (i == 0 ? id : String(id).concat("-").concat(nMeshIDs[i])),
                nMeshIDs[i],
                materialID,
                position,
                rotation,
                scaling,
                options,
                _callbackID);
        }
        return 0;
    }
    static createMeshesPhaseTwo(id, meshIDs, materialID, position, rotation, scaling, options, response, parentCallbackID) {
        Game.createMeshesCallbackInstancedMeshIDs[parentCallbackID].push(response);
        if (meshIDs.length != Game.createMeshesCallbackInstancedMeshIDs[parentCallbackID].length) {
            return 1;
        }
        Callback.setRun(parentCallbackID, true);
        Callback.runParent(parentCallbackID, Game.createMeshesCallbackInstancedMeshIDs[parentCallbackID]);
        delete Game.createMeshesCallbackInstancedMeshIDs[parentCallbackID];
        return 0;
    }
    /**
     * 
     * @param {string} id 
     * @param {string} shape 
     * @param {number} diameter 
     * @param {number} height 
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} [rotation] with CONE, x is incremented by RAD_90, z by RAD_180
     * @param {BABYLON.Vector3} [scaling] 
     */
    static createAreaMesh(id = "", shape = "CUBE", diameter = 1.0, height = 1.0, depth = 1.0, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One()) {
        id = Game.generateMeshID(id, "area-");
        let mesh = null;
        switch (shape) {
            case "CYLINDER": {
                mesh = BABYLON.MeshBuilder.CreateCylinder(id, {"diameter": diameter, "height": height, "tessellation": 8}, Game.scene);
                break;
            }
            case "CONE": {
                mesh = BABYLON.MeshBuilder.CreateCylinder(id, {"diameterTop": diameter, "diameterBottom": 0, "height": height, "tessellation": 8}, Game.scene);
                mesh.rotation.x = BABYLON.Tools.ToRadians(90);
                mesh.rotation.z = BABYLON.Tools.ToRadians(180);
                break;
            }
            case "SPHERE": {
                mesh = BABYLON.MeshBuilder.CreateSphere(id, {"diameter": diameter, "diameterY": height, "diameterZ": depth, "segments": 8}, Game.scene);
                break;
            }
            case "CUBE": {}
            default: {
                mesh = BABYLON.MeshBuilder.CreateBox(id, {"width": diameter, "height": height, "depth": depth}, Game.scene);
            }
        }

        let pivotAt = new BABYLON.Vector3(0, height / 2, 0);
        mesh.bakeTransformIntoVertices(BABYLON.Matrix.Translation(pivotAt.x, pivotAt.y, pivotAt.z));
        
        mesh.id = id;
        mesh.name = id;
        mesh.material = Game.loadedMaterials["collisionMaterial"];
        Game.setLoadedMesh(id, mesh);
        Game.setMeshMaterial(mesh, Game.loadedMaterials["collisionMaterial"]);
        if (position instanceof BABYLON.Vector3) {
            mesh.position.copyFrom(position);
        }
        if (rotation instanceof BABYLON.Vector3) {
            mesh.rotation.addInPlace(rotation);
        }
        if (scaling instanceof BABYLON.Vector3) {
            mesh.scaling.copyFrom(scaling);
        }
        mesh.isVisible = true;
        mesh.setEnabled(true);

        return mesh;
    }
    /**
     * Creates a mesh from those stored in loadedMeshes
     * @param  {string} meshIndexID New ID for BABYLON.Mesh and EntityController
     * @param  {string} meshID String ID of Mesh to create
     * @param  {string} [materialID] String ID of Material to apply to Mesh
     * @param  {BABYLON.Vector3} position Mesh position
     * @param  {BABYLON.Vector3} [rotation] Mesh rotation
     * @param  {BABYLON.Vector3} [scaling] Mesh scaling
     * @param  {object} [options] Options
     * @returns {BABYLON.AbstractMesh} The created mesh
     */
    static createCollidableMesh(meshIndexID = undefined, meshID = "missingMesh", materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        if (typeof options != "object") {
            options = {};
        }
        options["checkCollisions"] = true;
        return Game.createMesh(meshIndexID, meshID, materialID, position, rotation, scaling, options);
    }
    /**
     * 
     * @param {string} meshID 
     * @param {string} materialID 
     * @param {string} boneID 
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} rotation 
     * @param {BABYLON.Vector3} scaling 
     * @param {object} options 
     * @param {AbstractController} controllerID 
     * @param {(string|null)} parentCallbackID 
     */
    static createControllerAttachedMesh(meshID = "missingMesh", materialID = "missingMaterial", boneID = "ROOT", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}, controllerID = null, parentCallbackID = null) {
        if (!AbstractController.has(controllerID)) {
            return 1;
        }
        if (Game.debugMode) console.group(`Running Game.createControllerAttachedMesh(${meshID}, ..., ${rotation}, ..., ${controllerID})`);
        let id = String(meshID).concat("Attachment").concat(controllerID.capitalize()).concat(boneID.capitalize());
        let callbackID = String("createControllerAttachedMeshPhaseOne-").concat(Tools.genUUIDv4());
        Callback.create(callbackID, parentCallbackID, [meshID, materialID, boneID, position, rotation, scaling, options, controllerID], Game.createControllerAttachedMeshPhaseTwo);
        Game.createMesh(id, meshID, materialID, position, rotation, scaling, options, callbackID);
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static createControllerAttachedMeshPhaseTwo(meshID, materialID, boneID, position, rotation, scaling, options, controllerID, response, parentCallbackID) {
        if (Game.debugMode) console.group(`Running Game.createControllerAttachedMeshPhaseTwo(${meshID}, ..., ${parentCallbackID})`);
        /*
        if the mesh is a billboard
         */
        if (response.getBoundingInfo().boundingBox.maximum.z == 0) {
            response.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
            if (bone.name == "hand.r") {
                rotation.y -= BABYLON.Tools.ToRadians(90);
                rotation.z += BABYLON.Tools.ToRadians(90);
            }
            else if (bone.name == "hand.l") {
                rotation.y -= BABYLON.Tools.ToRadians(90);
                rotation.z += BABYLON.Tools.ToRadians(270);
            }
            response.material.backFaceCulling = false;
        }
        /** @type {EntityController} */
        let controller = EntityController.get(controllerID);
        if (!controller.hasBone(boneID)) {
            if (Game.debugMode) console.log(`Bone ${boneID} doesn't exist for Controller ${controllerID}`);
            if (Game.debugMode) console.groupEnd();
            return 1;
        }
        let bone = controller.getBone(boneID);
        controller.attachMeshToBone(response, bone, position, rotation, scaling);
        Callback.runParent(parentCallbackID, response, true, true);
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static replaceControllerMesh(controllerID, meshID, materialID, options, parentCallbackID) {
        if (AbstractController.get(controllerID)?.getMesh()?.name == meshID) {
            return 0;
        }
        Callback.setRun(parentCallbackID);
        if (Game.debugMode) console.group(`Running Game.replaceControllerMesh(${controllerID}, ${meshID}, ${materialID}, ...)`);
        if (!Game.hasLoadedMesh(meshID)) {
            if (Game.debugMode) console.info(`Don't have loaded meshID ${meshID}, loading`);
            let callbackID = String("replaceControllerMeshPhaseOne-").concat(Tools.genUUIDv4());
            Callback.create(callbackID, parentCallbackID, [controllerID, meshID, materialID, options], Game.replaceControllerMeshPhaseTwo);
            Game.loadMesh(meshID, callbackID);
            Game.loadTexture(materialID);
            Game.loadMaterial(materialID);
            if (Game.debugMode) console.groupEnd();
            return 1;
        }
        Game.replaceControllerMeshPhaseTwo(controllerID, meshID, materialID, options, Game.getLoadedMesh(meshID), Callback.create(String("replaceControllerMeshPhaseOneStatic-").concat(Tools.genUUIDv4()), parentCallbackID));
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static replaceControllerMeshPhaseTwo(controllerID, meshID, materialID, options, response, parentCallbackID) {
        Callback.setRun(parentCallbackID);
        if (Game.debugMode) console.group(`Running Game.replaceControllerMeshPhaseTwo(${controllerID}, ...)`);
        let callbackID = String("replaceControllerMeshPhaseTwo-").concat(Tools.genUUIDv4());
        Callback.create(callbackID, parentCallbackID, [controllerID, meshID, materialID, options], Game.replaceControllerMeshPhaseThree);
        let controller = AbstractController.get(controllerID);
        Game.createMesh(String(meshID).concat(controllerID).concat(Tools.genUUIDv4()), meshID, materialID, controller.getPosition(), controller.getRotation(), controller.getScaling(), options, callbackID);
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static replaceControllerMeshPhaseThree(controllerID, meshID, materialID, options, response, parentCallbackID) {
        if (!Game.hasCachedEntity(entityID)) {
            console.error(`The cached entity, ${entityID}, was probably yeeted between then and now. {"callbackID": "${parentCallbackID}"}`);
            return 2;
        }
        /** @type {CharacterController} */
        let controller = AbstractController.get(controllerID);
        controller.setMeshes([response]);
        controller.generateHitboxes();
        /*controller.generateOrganMeshes();
        controller.generateCosmeticMeshes();
        controller.generateEquippedMeshes();*/
        controller.updateTargetRay();
        let scaleAll = entity.height / entity.baseHeight;
        if (scaleAll <= 0) {
            scaleAll = 1.0;
        }
        controller.setScaling(scaleAll);
        if (Game.physicsEnabled && !Game.physicsForProjectilesOnly && controller.hasCollisionMesh()) {
            Game.assignBoxPhysicsToMesh(controller.collisionMesh, options);
        }
        Callback.run(parentCallbackID, controller.getID(), true, true);
        if (Game.debugMode) console.groupEnd();
        return 0;
        return 0;
    }

    /**
     * @module furniture
     */
    /**
     * 
     * @memberof module:furniture
     * @param {string} id 
     * @param {string} meshID 
     * @param {string} materialID 
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} rotation 
     * @param {BABYLON.Vector3} scaling 
     * @param {object} options 
     */
    static createFurnitureMesh(id = "", meshID = "missingMesh", materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = { "unique": false, "checkCollisions": true }) {
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.createFurnitureMesh");
        return Game.createMesh(id, meshID, materialID, position, rotation, scaling, options);
    }
    /**
     * Creates a FurnitureController, FurnitureEntity, and BABYLON.InstancedMesh
     * @memberof module:furniture
     * @param {string} [instanceID] Unique ID, auto-generated if none given
     * @param {string} entityID Furniture ID
     * @param {BABYLON.Vector3} position Position
     * @param {BABYLON.Vector3} [rotation] Rotation
     * @param {BABYLON.Vector3} [scaling] Scaling
     * @param {object} [options] Options
     * @param {(string|null)} [parentCallbackID] 
     * @returns {number} Integer status code
     */
    static createFurniture(instanceID = "", entityID = "", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = { "unique": true, "checkCollisions": true }, parentCallbackID = null) {
        instanceID = Tools.filterID(instanceID, Tools.genUUIDv4());
        position = Game.filterVector3(position);
        rotation = Game.filterVector3(rotation);
        scaling = Game.filterVector3(scaling);
        if (Game.hasCachedEntity(entityID)) {
            Game.createFurniturePhaseTwo(instanceID, entityID, position, rotation, scaling, options, Game.getCachedEntity(entityID));
        }
        else {
            let callbackID = String("createFurniturePhaseOne-").concat(Tools.genUUIDv4());
            Callback.create(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options], Game.createFurniturePhaseTwo);
            Game.getEntity(entityID, callbackID);
        }
        return 0;
    }
    static createFurniturePhaseTwo(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        let entity = Game.getCachedEntity(entityID);
        if (!(Game.hasLoadedMesh(entity["meshIDs"][0]))) {
            let callbackID = String("createFurniturePhaseTwo-").concat(Tools.genUUIDv4());
            Callback.create(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options], Game.createFurniturePhaseThree);
            Game.loadMesh(entity["meshIDs"][0], callbackID);
            Game.loadTexture(entity["textureID"]);
            Game.loadMaterial(entity["textureID"]);
            return 1;
        }
        Game.createFurniturePhaseThree(instanceID, entityID, position, rotation, scaling, options, Game.getLoadedMesh(entity["meshIDs"][0]), parentCallbackID);
        return 0;
    }
    static createFurniturePhaseThree(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        let entity = Game.getCachedEntity(entityID);
        let callbackID = String("createFurniturePhaseThree-").concat(Tools.genUUIDv4());
        Callback.create(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options], Game.createFurniturePhaseFour)
        Game.createMesh(instanceID, entity["meshIDs"][0], entity["textureID"], position, rotation, scaling, options, callbackID);
        return 0;
    }
    static createFurniturePhaseFour(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        let entity = Game.getCachedEntity(entityID);
        let controller = new FurnitureController(instanceID, response, entity);
        controller.assign(entity, false);
        controller.sendTransforms();
        if (options.hasOwnProperty("compoundController")) {
            controller.setCompoundController(options["compoundController"]);
        }
        return 0;
    }
    /**
     * Removes a FurnitureEntity, its FurnitureController, and its BABYLON.InstancedMesh
     * @memberof module:furniture
     * @param {(FurnitureController|string)} controllerID A FurnitureController, or its string ID
     * @returns {number} Integer status code
     */
    static removeFurniture(controllerID) {
        if (!FurnitureController.has(controllerID)) {
            return 1;
        }
        return Game.removeController(controllerID);
    }

    /**
     * @module doors
     * @memberof module:furniture
     */
    /**
     * Creates a DoorController, DoorEntity, and BABYLON.InstancedMesh
     * @memberof module:doors
     * @param  {string} entityID Entity ID
     * @param  {string} [name] Name
     * @param  {TeleportMarker} [teleportMarker] 
     * @param  {string} [meshID] Mesh ID
     * @param  {string} [materialID] Material ID
     * @param  {BABYLON.Vector3} position Position
     * @param  {BABYLON.Vector3} [rotation] Rotation
     * @param  {BABYLON.Vector3} [scaling] Scaling
     * @param  {object} [options] Options
     * @param  {(string|null)} [parentCallbackID]
     * @returns {number} Integer status code
     */
    static createDoor(entityID = "", name, teleportMarker, meshID, materialID, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = { "locked": false, "key": null, "opensInward": false, "open": false, "checkCollisions": true }, parentCallbackID = null) {
        position = Game.filterVector3(position);
        rotation = Game.filterVector3(rotation);
        scaling = Game.filterVector3(scaling);
        if (Game.hasCachedEntity(entityID)) {
            Game.createDoorPhaseTwo(entityID, name, teleportMarker, meshID, materialID, position, rotation, scaling, options, Game.getCachedEntity(entityID));
        }
        else {
            let callbackID = String("createDoorPhaseOne-").concat(Tools.genUUIDv4());
            Callback.create(callbackID, parentCallbackID, [entityID, name, teleportMarker, meshID, materialID, position, rotation, scaling, options], Game.createDoorPhaseTwo);
            Game.getEntity(entityID, callbackID);
        }
        return 0;
    }
    static createDoorPhaseTwo(entityID, name, teleportMarker, meshID, materialID, position, rotation, scaling, options, response, parentCallbackID) {
        if (!(Game.hasLoadedMesh(response["meshIDs"][0]))) {
            let callbackID = String("createDoorPhaseTwo-").concat(Tools.genUUIDv4());
            Callback.create(callbackID, parentCallbackID, [entityID, name, teleportMarker, meshID, materialID, position, rotation, scaling, options], Game.createDoorPhaseThree);
            Game.loadMesh(response["meshIDs"][0], callbackID);
            return 1;
        }
        Game.createDoorPhaseThree(entityID, name, teleportMarker, meshID, materialID, position, rotation, scaling, options, null, parentCallbackID);
        return 0;
    }
    static createDoorPhaseThree(entityID, name, teleportMarker, meshID, materialID, position, rotation, scaling, options, response, parentCallbackID) {
        let entity = Game.getCachedEntity(entityID);
        let radius = Game.getMesh(entity["meshIDs"][0]).getBoundingInfo().boundingBox.extendSize.x * scaling.x;
        let yRotation = rotation.y * Math.PI / 180;
        let xPosition = radius * (Math.cos(yRotation) | 0);
        let yPosition = radius * (Math.sin(yRotation) | 0);
        let callbackID = String("createDoorPhaseThree-").concat(Tools.genUUIDv4());
        position.addInPlace(new BABYLON.Vector3(xPosition, 0, -yPosition));
        Callback.create(callbackID, parentCallbackID, [entityID, name, teleportMarker, meshID, materialID, position, rotation, scaling, options], Game.createDoorPhaseFour);
        Game.createMesh(entityID, entity["meshIDs"][0], entity["materialID"], position, rotation, scaling, options, callbackID);
        return 0;
    }
    static createDoorPhaseFour(entityID, name, teleportMarker, meshID, materialID, position, rotation, scaling, options, response, parentCallbackID) {
        let entity = Game.getCachedEntity(entityID);
        let controller = new DoorController(entityID, response, entity);
        controller.assign(entity, false);
        controller.sendTransforms();
        if (options.hasOwnProperty("compoundController")) {
            controller.setCompoundController(options["compoundController"]);
        }
        return 0;
    }
    /**
     * Removes a DoorEntity, its DoorController, and its BABYLON.InstancedMesh
     * @memberof module:doors
     * @param {(DoorController|string)} controllerID A DoorController, or its string ID
     * @returns {number} Integer status code
     */
    static removeDoor(controllerID) {
        if (!DoorController.has(controllerID)) {
            return 1;
        }
        return Game.removeController(controllerID);
    }

    /**
     * @module displays
     * @memberof module:furniture
     */
    /**
     * 
     * @memberof module:displays
     * @param {string} [instanceID] Unique ID, auto-generated if none given
     * @param {string} entityID Furniture ID
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} [rotation] Rotation
     * @param {BABYLON.Vector3} [scaling] Scaling
     * @param {object} [options] Options
     * @param {(string|null)} [parentCallbackID] 
     * @returns {number} Integer status code
     */
    static createDisplay(instanceID = "", entityID = "", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = { "unique": true, "checkCollisions": true, "videoMeshWidth": 1, "videoMeshHeight": 0.75, "videoMeshPosition": BABYLON.Vector3.Zero() }, parentCallbackID = null) {
        instanceID = Tools.filterID(instanceID, Tools.genUUIDv4());
        position = Game.filterVector3(position);
        rotation = Game.filterVector3(rotation);
        scaling = Game.filterVector3(scaling);
        if (typeof options != "object") {
            options = {};
        }
        options["lastUnique"] = true;
        if (Game.hasCachedEntity(entityID)) {
            Game.createDisplayPhaseTwo(instanceID, entityID, position, rotation, scaling, options, Game.getCachedEntity(entityID));
        }
        else {
            let callbackID = String("createDisplayPhaseOne-").concat(Tools.genUUIDv4());
            Callback.create(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options], Game.createDisplayPhaseTwo);
            Game.getEntity(entityID, callbackID);
        }
        return 0;
    }
    /**
     * Loads meshes, successful response will be an array of filtered meshIDs belonging to entityID
     * @param {*} instanceID 
     * @param {*} entityID 
     * @param {*} position 
     * @param {*} rotation 
     * @param {*} scaling 
     * @param {*} options 
     * @param {*} response 
     * @param {*} parentCallbackID 
     * @returns 
     */
    static createDisplayPhaseTwo(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        let entity = Game.getCachedEntity(entityID);
        let callbackID = String("createDisplayPhaseTwo-").concat(Tools.genUUIDv4());
        Callback.create(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options], Game.createDisplayPhaseThree);
        Game.loadMeshes(entity["meshIDs"], callbackID);
        Game.loadTexture(entity["textureID"]);
        Game.loadMaterial(entity["textureID"]);
        return 0;
    }
    /**
     * 
     * @param {*} instanceID 
     * @param {*} entityID 
     * @param {*} position 
     * @param {*} rotation 
     * @param {*} scaling 
     * @param {*} options 
     * @param {*} response 
     * @param {*} parentCallbackID 
     * @returns 
     */
    static createDisplayPhaseThree(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        Game.updateCachedEntity(instanceID, {"meshIDs":response});
        let entity = Game.getCachedEntity(entityID);
        if (!(Game.hasLoadedVideo(entity["videoID"]))) {
            Game.loadVideo(entity["videoID"]);
        }
        Game.createDisplayPhaseFour(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID);
        return 0;
    }
    static createDisplayPhaseFour(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        let entity = Game.getCachedEntity(entityID);
        let callbackID = String("createDisplayPhaseFour-").concat(Tools.genUUIDv4());
        Callback.create(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options], Game.createDisplayPhaseFive)
        Game.createMeshes(instanceID, entity["meshIDs"], entity["textureID"], position, rotation, scaling, options, callbackID);
        return 0;
    }
    static createDisplayPhaseFive(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        let entity = Game.getCachedEntity(entityID);
        let controller = new DisplayController(instanceID, response, entity);
        controller.assign(entity, false);
        controller.sendTransforms();
        controller.setVideo(Game.getLoadedVideo(entity["videoID"]));
        if (options.hasOwnProperty("compoundController")) {
            controller.setCompoundController(options["compoundController"]);
        }
        return 0;
    }
    /**
     * 
     * @memberof module:displays
     * @param {DisplayController} controllerID 
     * @returns {number} Integer status code
     */
    static removeDisplay(controllerID) {
        if (!DisplayController.has(controllerID)) {
            return 1;
        }
        return Game.removeController(controllerID);
    }

    /**
     * 
     * @module mirrors
     * @memberof module:furniture
     */
    /**
     * 
     * @memberof module:mirrors
     * @param {string} id 
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} rotation 
     * @param {BABYLON.Vector3} scaling 
     * @param {object} options 
     */
    static createMirror(id, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = { width: 5, height: 5 }) {
        id = Tools.filterID(id, Tools.genUUIDv4());
        //Creation of a glass plane
        let abstractMesh = BABYLON.MeshBuilder.CreatePlane(id, { width: options["width"], height: options["height"] }, Game.scene);
        abstractMesh.position.copyFrom(position);
        abstractMesh.rotation.copyFrom(rotation);
        abstractMesh.scaling.copyFrom(scaling);

        //Ensure working with new values for glass by computing and obtaining its worldMatrix
        abstractMesh.computeWorldMatrix(true);

        return Game.createMirrorFrom(abstractMesh, Game.scene.meshes, options);
    }
    /**
     * 
     * @memberof module:mirrors
     * @param {BABYLON.AbstractMesh} abstractMesh 
     * @param {array} renderList 
     * @param {object} options 
     */
    static createMirrorFrom(abstractMesh, renderList = [], options = {}) {
        if (abstractMesh instanceof BABYLON.AbstractMesh) { }
        else {
            return 2;
        }
        //Obtain normals for plane and assign one of them as the normal
        let glass_vertexData = abstractMesh.getVerticesData("normal");
        let glassNormal = new BABYLON.Vector3(glass_vertexData[0], glass_vertexData[1], glass_vertexData[2]);
        //Use worldMatrix to transform normal into its current value
        glassNormal = new BABYLON.Vector3.TransformNormal(glassNormal, abstractMesh.getWorldMatrix())

        //Create reflecting surface for mirror surface
        let reflector = new BABYLON.Plane.FromPositionAndNormal(abstractMesh.position, glassNormal.scale(-1));

        //Create the mirror material
        let mirrorMaterial = new BABYLON.StandardMaterial("mirror", Game.scene);
        mirrorMaterial.reflectionTexture = new BABYLON.MirrorTexture("mirror", 1024, Game.scene, true);
        mirrorMaterial.reflectionTexture.mirrorPlane = reflector;
        mirrorMaterial.reflectionTexture.renderList = renderList;
        mirrorMaterial.reflectionTexture.level = 1;

        abstractMesh.material = mirrorMaterial;

        return abstractMesh;
    }

    /**
     * @module lighting
     * @memberof module:furniture
     */
    /**
     * Creates a LightingController, LightingEntity, and BABYLON.InstancedMesh
     * @memberof module:lighting
     * @param {string} [instanceID] Unique ID, auto-generated if none given
     * @param {string} entityID 
     * @param {BABYLON.Vector3} position Position
     * @param {BABYLON.Vector3} [rotation] Rotation
     * @param {BABYLON.Vector3} [scaling] Scaling
     * @param {object} [options] Options
     * @param {(string|null)} [parentCallbackID] 
     * @returns {number} Integer status code
     */
    static createLighting(instanceID = "", entityID = "", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}, parentCallbackID = null) {
        instanceID = Tools.filterID(instanceID, Tools.genUUIDv4());
        position = Game.filterVector3(position);
        rotation = Game.filterVector3(rotation);
        scaling = Game.filterVector3(scaling);
        if (Game.hasCachedEntity(entityID)) {
            Game.createLightingPhaseTwo(instanceID, entityID, position, rotation, scaling, options, Game.getCachedEntity(entityID));
        }
        else {
            let callbackID = String("createLightingPhaseOne-").concat(Tools.genUUIDv4());
            Callback.create(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options], Game.createLightingPhaseTwo);
            Game.getEntity(entityID, callbackID);
        }
        return 0;
    }
    static createLightingPhaseTwo(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        let entity = Game.getCachedEntity(entityID);
        if (!(Game.hasLoadedMesh(entity["meshIDs"][0]))) {
            let callbackID = String("createLightingPhaseTwo-").concat(Tools.genUUIDv4());
            Callback.create(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options, response], Game.createLightingPhaseThree);
            Game.loadMesh(entity["meshIDs"][0], callbackID);
            Game.loadTexture(entity["textureID"]);
            Game.loadMaterial(entity["textureID"]);
            return 1;
        }
        Game.createLightingPhaseThree(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID);
        return 0;
    }
    static createLightingPhaseThree(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        let entity = Game.getCachedEntity(entityID);
        let callbackID = String("createLightingPhaseThree-").concat(Tools.genUUIDv4());
        Callback.create(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options], Game.createLightingPhaseFour)
        Game.createMesh(instanceID, entity["meshIDs"][0], entity["textureID"], position, rotation, scaling, options, callbackID);
        return 0;
    }
    static createLightingPhaseFour(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        let entity = Game.getCachedEntity(entityID);
        let controller = new LightingController(instanceID, response, entity);
        controller.assign(entity, false);
        controller.sendTransforms();
        if (options.hasOwnProperty("compoundController")) {
            controller.setCompoundController(options["compoundController"]);
        }
        return 0;
    }
    /**
     * Removes a LightingEntity, its LightingController, and its BABYLON.InstancedMesh
     * @memberof module:lighting
     * @param {(LightingController|string)} controllerID A LightingController, or its string ID
     * @returns {number} Integer status code
     */
    static removeLighting(controllerID) {
        if (!LightingController.has(controllerID)) {
            return 1;
        }
        return Game.removeController(controllerID);
    }
   
    /**
     * @module plants
     */
    /**
     * 
     * @memberof module:plants
     * @param {string} instanceID 
     * @param {string} entityID 
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} [rotation] Rotation
     * @param {BABYLON.Vector3} [scaling] Scaling
     * @param {object} [options] Options
     * @param {(string|null)} [parentCallbackID] 
     * @returns {number} Integer status code
     */
    static createPlant(instanceID = "", entityID = "", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = { "unique": false, checkCollisions: true }, parentCallbackID = null) {
        instanceID = Tools.filterID(instanceID, Tools.genUUIDv4());
        position = Game.filterVector3(position);
        rotation = Game.filterVector3(rotation);
        scaling = Game.filterVector3(scaling);
        if (Game.hasCachedEntity(entityID)) {
            Game.createPlantPhaseTwo(instanceID, entityID, position, rotation, scaling, options, Game.getCachedEntity(entityID));
        }
        else {
            let callbackID = String("createPlantPhaseOne-").concat(Tools.genUUIDv4());
            Callback.create(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options], Game.createPlantPhaseTwo);
            Game.getEntity(entityID, callbackID);
        }
        return 0;
    }
    static createPlantPhaseTwo(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        let entity = Game.getCachedEntity(entityID);
        if (!(Game.hasLoadedMesh(entity["meshIDs"][0]))) {
            let callbackID = String("createPlantPhaseTwo-").concat(Tools.genUUIDv4());
            Callback.create(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options, response], Game.createPlantPhaseThree);
            Game.loadMesh(entity["meshIDs"][0][0], callbackID);
            Game.loadTexture(entity["textureID"]);
            Game.loadMaterial(entity["textureID"]);
            return 1;
        }
        Game.createPlantPhaseThree(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID);
        return 0;
    }
    static createPlantPhaseThree(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        let entity = Game.getCachedEntity(entityID);
        let callbackID = String("createPlantPhaseThree-").concat(Tools.genUUIDv4());
        Callback.create(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options], Game.createPlantPhaseFour)
        Game.createMesh(instanceID, entity["meshIDs"][0], entity["textureID"], position, rotation, scaling, options, callbackID);
        return 0;
    }
    static createPlantPhaseFour(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        let entity = Game.getCachedEntity(entityID);
        let controller = new PlantController(instanceID, response, Game.getCachedEntity(entityID));
        controller.assign(entity, false);
        controller.sendTransforms();
        if (options.hasOwnProperty("compoundController")) {
            controller.setCompoundController(options["compoundController"]);
        }
        return 0;
    }
    /**
     * Removes a PlantEntity, its PlantController, and its BABYLON.InstancedMesh
     * @memberof module:plants
     * @param {(PlantController|string)} controllerID A PlantController, or its string ID
     * @returns {number} Integer status code
     */
    static removePlant(controllerID) {
        if (!PlantController.has(controllerID)) {
            return 1;
        }
        return Game.removeController(controllerID);
    }

    /**
     * @module items
     */
    /**
     * 
     * @param {string} instanceID 
     * @param {string} entityID 
     * @param {string} controllerID 
     * @param {BABYLON.Vector3} [rotation] Rotation
     * @param {BABYLON.Vector3} [scaling] Scaling
     * @param {object} [options] Options
     * @param {(string|null)} [parentCallbackID] 
     * @returns {number} Integer status code
     */
    static createItemAtController(instanceID = "", entityID = "", controllerID = "", rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}, parentCallbackID = null) {
        let controller = AbstractController.get(controllerID);
        let position = controller.getPosition();
        if (rotation.equals(BABYLON.Vector3.Zero())) {
            rotation = controller.getRotation();
        }
        Game.createItem(instanceID, entityID, position, rotation, scaling, options, parentCallbackID);
        return 0;
    }
    /**
     * Places, or creates from an ItemEntity, an InstancedItemEntity in the world at the given position.
     * @memberof module:items
     * @param {string} instanceID Unique ID, auto-generated if none given
     * @param {string} entityID Abstract entity; preferably an InstancedItemEntity
     * @param {BABYLON.Vector3} position Position
     * @param {BABYLON.Vector3} [rotation] Rotation
     * @param {BABYLON.Vector3} [scaling] Scaling
     * @param {object} [options] Options
     * @returns {(ItemController|array|number)} An EntityController or an integer status code
     */
    static createItem(instanceID = "", entityID = "", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}, parentCallbackID = null) {
        instanceID = Tools.filterID(instanceID, Tools.genUUIDv4());
        position = Game.filterVector3(position);
        rotation = Game.filterVector3(rotation);
        scaling = Game.filterVector3(scaling);
        if (Game.hasCachedEntity(entityID)) {
            Game.createItemPhaseTwo(instanceID, entityID, position, rotation, scaling, options, Game.getCachedEntity(entityID));
        }
        else {
            let callbackID = String("createItemPhaseOne-").concat(Tools.genUUIDv4());
            Callback.create(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options], Game.createItemPhaseTwo);
            Game.getEntity(entityID, callbackID);
        }
        return 0;
    }
    static createItemPhaseTwo(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        let entity = Game.getCachedEntity(entityID);
        if (!(Game.hasLoadedMesh(entity["meshIDs"][0]))) {
            let callbackID = String("createItemPhaseTwo-").concat(Tools.genUUIDv4());
            Callback.create(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options, response], Game.createItemPhaseThree);
            Game.loadMesh(entity["meshIDs"][0], callbackID);
            Game.loadTexture(entity["textureID"]);
            Game.loadMaterial(entity["textureID"]);
            return 1;
        }
        Game.createItemPhaseThree(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID);
        return 0;
    }
    static createItemPhaseThree(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        let entity = Game.getCachedEntity(entityID);
        let callbackID = String("createItemPhaseThree-").concat(Tools.genUUIDv4());
        Callback.create(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options], Game.createItemPhaseFour)
        Game.createMesh(instanceID, entity["meshIDs"][0], entity["textureID"], position, rotation, scaling, options, callbackID);
        return 0;
    }
    static createItemPhaseFour(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        let entity = Game.getCachedEntity(entityID);
        let controller = new ItemController(instanceID, response, Game.getCachedEntity(entityID));
        controller.assign(entity, false);
        controller.sendTransforms();
        if (Game.physicsEnabled && !Game.physicsForProjectilesOnly && controller.hasCollisionMesh()) {
            Game.assignBoxPhysicsToMesh(controller["collisionMesh"], options);
        }
        if (options.hasOwnProperty("compoundController")) {
            controller.setCompoundController(options["compoundController"]);
        }
        return 0;
    }
    /**
     * Removes an InstancedItemEntity, its ItemController, and its BABYLON.InstancedMesh
     * @memberof module:items
     * @param {(ItemController|string)} controllerID An ItemController, or its string ID
     * @returns {number} Integer status code
     */
    static removeItem(controllerID) {
        if (!ItemController.has(controllerID)) {
            return 1;
        }
        return Game.removeController(controllerID);
    }

    /**
     * @module characters
     */
    /**
     * Creates a character mesh, and controller.
     * @memberof module:characters
     * @param  {string} [instanceID] Unique ID, auto-generated if none given
     * @param  {string} entityID Character entity
     * @param  {BABYLON.Vector3} position Position
     * @param  {BABYLON.Vector3} [rotation] Rotation
     * @param  {BABYLON.Vector3} [scaling] Scale
     * @param  {object} [options] Options
     * @param  {(string|null)} [parentCallbackID] 
     * @returns {number} Integer status code
     */
    static createCharacter(instanceID, entityID, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}, parentCallbackID = null) {
        instanceID = Tools.filterID(instanceID, Tools.genUUIDv4());
        position = Game.filterVector3(position);
        rotation = Game.filterVector3(rotation);
        scaling = Game.filterVector3(scaling, BABYLON.Vector3.One());
        if (Game.debugMode) console.group(`Running Game.createCharacter(${instanceID}, ${entityID}, ${position}, ${rotation}, ${scaling}, ${options}, ${parentCallbackID})`);
        let callbackID = String("createCharacterPhaseOne-").concat(Tools.genUUIDv4())
        Callback.create(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options], Game.createCharacterPhaseTwo);
        Game.getEntity(entityID, callbackID);
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static createCharacterPhaseTwo(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        Callback.setRun(parentCallbackID);
        if (Game.debugMode) console.group(`Running Game.createCharacterPhaseTwo(${instanceID}, ${entityID}, ...)`);
        let entity = Game.getCachedEntity(entityID);
        if (!(Game.hasLoadedMesh(entity["meshIDs"][0]))) {
            if (Game.debugMode) console.info(`Don't have loaded meshID ${entity["meshIDs"][0]}, loading`);
            let callbackID = String("createCharacterPhaseTwo-").concat(Tools.genUUIDv4());
            Callback.create(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options], Game.createCharacterPhaseThree);
            Game.loadMesh(entity["meshIDs"][0], callbackID);
            Game.loadTexture(entity["textureID"]);
            Game.loadMaterial(entity["textureID"]);
            if (Game.debugMode) console.groupEnd();
            return 1;
        }
        Game.createCharacterPhaseThree(instanceID, entityID, position, rotation, scaling, options, Game.getLoadedMesh(entity["meshIDs"][0]), Callback.create(String("createCharacterPhaseTwoStatic-").concat(Tools.genUUIDv4()), parentCallbackID));
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static createCharacterPhaseThree(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        Callback.setRun(parentCallbackID);
        if (Game.debugMode) console.group(`Running Game.createCharacterPhaseThree(${instanceID}, ${entityID}, ...)`);
        let entity = Game.getCachedEntity(entityID);
        let callbackID = String("createCharacterPhaseThree-").concat(Tools.genUUIDv4());
        Callback.create(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options], Game.createCharacterPhaseFour)
        Game.createMesh(instanceID, entity["meshIDs"][0], entity["textureID"], position, rotation, scaling, options, callbackID);
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static createCharacterPhaseFour(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        Callback.setRun(parentCallbackID);
        if (Game.debugMode) console.group(`Running Game.createCharacterPhaseFour(${instanceID}, ...)`);
        if (!(response instanceof BABYLON.AbstractMesh)) {
            if (Game.debugMode) console.warn(`Didn't receive Mesh`);
            if (Game.debugMode) console.groupEnd();
            return 1;
        }
        if (!Game.hasCachedEntity(entityID)) {
            console.error(`The cached entity, ${entityID}, was probably yeeted between then and now. {"callbackID": "${parentCallbackID}"}`);
            return 2;
        }
        /** @type {AbstractEntity} */
        let entity = Game.getCachedEntity(entityID);
        /** @type {CharacterController} */
        let controller = null;
        if (Game.useRigidBodies) {
            controller = new CharacterControllerRigidBody(instanceID, [response], entity);
        }
        else {
            controller = new CharacterControllerTransform(instanceID, [response], entity);
        }
        controller.assign(entity);
        controller.generateAttachedMeshes();
        controller.generateHitboxes();
        controller.updateTargetRay();
        let scaleAll = entity.height / entity.baseHeight;
        if (scaleAll <= 0) {
            scaleAll = 1.0;
        }
        controller.setScaling(scaleAll);
        if (Game.physicsEnabled && !Game.physicsForProjectilesOnly && controller.hasCollisionMesh()) {
            Game.assignBoxPhysicsToMesh(controller.collisionMesh, options);
        }
        Callback.runNthParent(parentCallbackID, 2, controller.getID(), true, true);
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static createCharacterResponse(instanceID, entityID, position, response, parentCallbackID) {
        if (Callback.has(parentCallbackID)) {
            parentCallbackID = Callback.get(parentCallbackID).parent;
        }
        Game.entityLogicWorkerPostMessage("createCharacterResponse", 0, { "controllerID": instanceID }, parentCallbackID);
        return 0;
    }
    /**
     * Removes a CharacterController, and its BABYLON.InstancedMesh(es)
     * @memberof module:characters
     * @param {(CharacterController|string)} controllerID A CharacterController, or its string ID
     * @returns {number} Integer status code
     */
    static removeCharacter(controllerID) {
        if (!CharacterController.has(controllerID)) {
            return 1;
        }
        return Game.removeController(controllerID);
    }

    static removeController(controllerID) {
        if (!AbstractController.has(controllerID)) {
            return 1;
        }
        AbstractController.get(controllerID).dispose();
        return 0;
    }

    /**
     * @module player
     * @memberof module:character
     */
    /*static createPlayer(instanceID, entityID, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}, parentCallbackID = null) {
        let callbackID = String("createPlayer-").concat(Tools.genUUIDv4());
        Callback.create(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options], Game.createPlayerPhaseTwo);
        Game.createCharacter(instanceID, entityID, position, rotation, scaling, options, callbackID);
        return 0;
    }
    static createPlayerPhaseTwo(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        Game.assignPlayer(response, parentCallbackID);
        return 0;
    }
    static createPlayerResponse(blob, response, parentCallbackID) {
        console.log("eggies")
        return 0;
    }*/
    /**
     * 
     * @memberof module:player
     * @param {string} controllerID 
     */
    static assignPlayer(controllerID = "", parentCallbackID = null) {
        if (Game.hasPlayerController() && Game.playerController.id == controllerID) {
            return 0;
        }
        if (Game.debugMode) console.group(`Running Game.assignPlayer(${controllerID}, ${parentCallbackID})`);
        if (!AbstractController.has(controllerID)) {
            if (Game.debugMode) console.warn(`Controller ${controllerID} doesn't exist`);
            if (Game.debugMode) console.groupEnd();
            return 1;
        }
        if (Game.playerController instanceof AbstractController) {
            Game.unassignPlayer();
        }
        let controller = AbstractController.get(controllerID);
        Game.playerController = controller;
        for (let i = 0; i < Game.playerController.meshes.length; i++) {
            Game.playerController.meshes[i].isPickable = false;
        }
        Game.playerController.collisionMesh.isPickable = false;
        Game.playerEntityID = controller.entityID;
        if (Game.bUseGUI) {
            Game.gui.hud.playerPortrait.set(Game.playerController);
            if (Game.gui.hud.isVisible) {
                Game.gui.hud.playerPortrait.show();
            }
        }
        Game.createControllerAttachedMesh("cameraFocus", "missingMaterial", "FOCUS", BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero(), BABYLON.Vector3.One(), {}, controllerID, Callback.create(String("assignPlayerStatic-").concat(Tools.genUUIDv4()), parentCallbackID, [controllerID], Game.assignPlayerPhaseTwo));
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static assignPlayerPhaseTwo(controllerID, response, parentCallbackID) {
        if (Game.debugMode) console.group(`Running Game.assignPlayerPhaseTwo(${controllerID})`);
        Game.cameraFocus = response;
        Game.initArcRotateCamera();
        Game.initCastTargetRayInterval();
        Game.initPlayerPortraitStatsUpdateInterval();
        Game.transformsWorkerPostMessage("setPlayer", 0, [controllerID]);
        Callback.runParent(parentCallbackID, controllerID);
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static assignPlayerResponse(controllerID, response, parentCallbackID) {
        if (Callback.has(parentCallbackID)) {
            parentCallbackID = Callback.get(parentCallbackID).parent;
        }
        Game.entityLogicWorkerPostMessage("assignPlayerResponse", 0, { "controllerID": controllerID }, parentCallbackID);
        return 0;
    }
    /**
     * 
     * @memberof module:player
     */
    static unassignPlayer(parentCallbackID = null) {
        if (Game.debugMode) console.group(`Running Game.unassignPlayer(${parentCallbackID})`);
        Game.transformsWorkerPostMessage("clearPlayer", 0);
        Game.initFreeCamera(false);
        if (Game.bUseGUI) {
            Game.gui.hud.playerPortrait.hide();
        }
        let controllerID = null;
        if (Game.hasPlayerController()) {
            controllerID = Game.playerController.id;
            if (Game.playerController.hasMesh()) {
                Game.playerController.getMesh().isPickable = true;
            }
            Game.playerController.detachFromFOCUS();
        }
        Game.playerEntityID = null;
        Game.playerController = null;
        Game.clearPlayerPortraitStatsUpdateInterval();
        Game.clearTargetRayInterval();
        Game.clearPlayerTarget();
        Callback.run(parentCallbackID, controllerID);
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static unassignPlayerResponse(controllerID, response, parentCallbackID = null) {
        if (Game.debugMode) console.group(`Running Game.unassignPlayerResponse(${controllerID}, ${response}, ${parentCallbackID})`);
        if (Callback.has(parentCallbackID)) {
            parentCallbackID = Callback.get(parentCallbackID).parent;
            if (Game.debugMode) console.info(`Changing parentCallbackID to ${parentCallbackID}`);
        }
        if (Game.debugMode) console.groupEnd();
        Game.entityLogicWorkerPostMessage("unassignPlayerResponse", 0, { "controllerID": controllerID }, parentCallbackID);
        return 0;
    }
    /**
     * 
     * @memberof module:player
     * @param {EntityController} entityController 
     */
    static setPlayerTarget(entityController) {
        if (entityController == Game.playerController) {
            return 0;
        }
        if (Game.debugMode && Game.debugVerbosity > 9) console.group("Running Game.setPlayerTarget()");
        if (!(Game.hasPlayerController())) {
            if (Game.debugMode && Game.debugVerbosity > 9) {
                console.error("Player doesn't have a controller; returning 1");
                console.groupEnd();
            }
            return 1;
        }
        if (!(entityController instanceof EntityController)) {
            if (EntityController.has(entityController)) {
                entityController = EntityController.get(entityController);
            }
            else {
                if (Game.debugMode && Game.debugVerbosity > 9) {
                    console.error("Target doesn't have a controller; returning 1");
                    console.groupEnd();
                }
                Game.clearPlayerTarget();
                return 1;
            }
        }
        if (!entityController.isEnabled()) {
            if (Game.debugMode && Game.debugVerbosity > 9) {
                console.info("Target has a controller, but it is disabled; returning 0");
                console.groupEnd();
            }
            if (entityController == Game.playerController.target) {
                Game.clearPlayerTarget();
            }
            return 0;
        }
        if (entityController == Game.playerController.target) {
            if (Game.debugMode && Game.debugVerbosity > 9) {
                console.groupEnd();
            }
            if (Game.bUseGUI) {
                Game.gui.hud.targetPortrait.update();
            }
            return 0;
        }
        if (Game.highlightEnabled) {
            Game.highlightController(entityController);
        }
        let actionEnum = Tools.filterEnum(entityController.defaultAction, ActionEnum);
        if (actionEnum < 0) {
            actionEnum = 0;
        }
        Game.playerController.setTarget(entityController);
        if (Game.bUseGUI) {
            Game.gui.hud.targetPortrait.set(entityController);
            Game.gui.hud.targetPortrait.show();
            Game.gui.hud.actionTooltip.set(ActionEnum.properties[actionEnum].name);
            Game.gui.hud.actionTooltip.show();
        }
        if (Game.debugMode && Game.debugVerbosity > 9) console.groupEnd();
        return 0;
    }
    /**
     * 
     * @memberof module:player
     */
    static clearPlayerTarget() {
        if (!(Game.playerController instanceof CreatureController)) {
            return 1;
        }
        if (Game.highlightEnabled) {
            Game.clearHighlightedController();
        }
        Game.playerController.clearTarget();
        if (Game.bUseGUI) {
            Game.gui.hud.targetPortrait.hide();
            Game.gui.hud.actionTooltip.hide();
        }
        return 0;
    }
    /**
     * 
     * @memberof module:player
     * @param {string} cellID 
     * @param {(string|null)} [parentCallbackID] 
     */
    static setPlayerCell(cellID, parentCallbackID = null) {
        Game.loadCell(cellID, parentCallbackID);
        return 0;
    }
    /**
     * 
     * @memberof module:player
     */
    static hasPlayerEntity() {
        return Game.playerEntityID != null;
    }
    /**
     * 
     * @memberof module:player
     */
    static hasPlayerController() {
        return Game.playerController instanceof EntityController;
    }
    /**
     * @memberof module:player
     */
    static hasPlayerCell() {
        return Game.currentCellID != null;
    }
    static castTargetRay() {
        if (!(Game.camera instanceof BABYLON.Camera)) {
            return 1;
        }
        if (!Game.targetRayEnabled) {
            return 0;
        }
        if (!Game.hasPlayerController() || !Game.playerController.hasMesh() || !Game.playerController.hasSkeleton()) {
            return 1;
        }
        //console.log("Running Game.castTargetRay()");
        Game.playerController.targetRay = Game.camera.getForwardRay(2 * Game.playerController.meshes[0].scaling.y, Game.camera.getWorldMatrix(), Game.camera.getTarget());
        Game.playerController.targetRay.origin = Game.camera.lockedTarget.absolutePosition;
        if (Game.debugMode) {
            if (Game.playerController.targetRayHelper != null) {
                Game.playerController.targetRayHelper.dispose();
            }
            Game.playerController.targetRayHelper = new BABYLON.RayHelper(Game.playerController.targetRay);
            Game.playerController.targetRayHelper.show(Game.scene);
        }
        let hit = Game.scene.pickWithRay(Game.playerController.targetRay, function (pickedMesh) {
            if (pickedMesh.controller == null || pickedMesh.controller == Game.playerController) {
                return false;
            }
            return true;
        });
        if (hit.hit) {
            Game.setPlayerTarget(hit.pickedMesh.controller);
        }
        else {
            Game.clearPlayerTarget();
        }
        return 0;
    }
    static enableTargetRay() {
        Game.targetRayEnabled = true;
        Game.initCastTargetRayInterval();
        return 0;
    }
    static disableTargetRay() {
        Game.targetRayEnabled = false;
        return 0;
    }
    static initCastTargetRayInterval() {
        if (!Game.targetRayEnabled) {
            return 0;
        }
        clearInterval(Game.targetRayUpdateIntervalFunction);
        Game.targetRayUpdateIntervalFunction = setInterval(Game.castTargetRay, Game.targetRayUpdateInterval);
        return 0;
    }
    static setTargetRayInterval(interval = 250) {
        if (interval > 0) {
            Game.targetRayUpdateInterval = interval;
        }
        Game.initCastTargetRayInterval();
        return 0;
    }
    static clearTargetRayInterval() {
        clearInterval(Game.targetRayUpdateIntervalFunction);
        return 0;
    }
    static initPlayerPortraitStatsUpdateInterval() {
        if (!Game.bUseGUI) {
            return 0;
        }
        clearInterval(Game.playerPortraitStatsUpdateIntervalFunction);
        Game.playerPortraitStatsUpdateIntervalFunction = setInterval(Game.gui.hud.playerPortrait.update, Game.playerPortraitStatsUpdateInterval);
        return 0;
    }
    static setPlayerPortraitStatsUpdateInterval(interval = 100) {
        if (!Game.bUseGUI) {
            return 0;
        }
        if (interval > 0) {
            Game.playerPortraitStatsUpdateInterval = interval;
        }
        Game.initPlayerPortraitStatsUpdateInterval();
        return 0;
    }
    static clearPlayerPortraitStatsUpdateInterval() {
        if (!Game.bUseGUI) {
            return 0;
        }
        clearInterval(Game.playerPortraitStatsUpdateIntervalFunction);
        return 0;
    }
    /**
     * 
     * @returns {(BABYLON.AbstractMesh|null)}
     */
    static pickMesh() {
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.pickMesh()");
        let pick = Game.scene.pickWithRay(Game.camera.getForwardRay(), (mesh) => {
            if (mesh.isHitBox) {
                return false;
            }
            else if (mesh.material instanceof BABYLON.Material && mesh.material.name == "collisionMaterial") {
                return false;
            }
            else if (mesh.hasController() && mesh.controller == Game.playerController) {
                return false;
            }
            else if (mesh == Game.playerController.collisionMesh || mesh == Game.playerController.mesh) {
                return false;
            }
            return true;
        });
        if (pick.hit) {
            return pick.pickedMesh;
        }
        return null;
    }
    /**
     * @returns {(EntityController|null)}
     */
    static pickController() {
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.pickController()");
        let pick = Game.scene.pickWithRay(Game.camera.getForwardRay(), (mesh) => {
            if (mesh.hasController()) {
                if (mesh.controller == Game.playerController) {
                    return false;
                }
                return true;
            }
            return false;
        });
        if (pick.hit && pick.pickedMesh.controller instanceof EntityController) {
            return pick.pickedMesh.controller;
        }
        return null;
    }
    static cameraPointerControlDetach() {
        if (!(Game.camera instanceof BABYLON.Camera)) {
            return 1;
        }
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.cameraPointerControlDetach()");
        if (Game.camera.getClassName() == "ArcRotateCamera") {
            if (Game.camera.inputs.attached.hasOwnProperty("pointers")) {
                Game.camera.inputs.remove(Game.camera.inputs.attached.pointers);
            }
            if (Game.camera.inputs.attached.hasOwnProperty("mousewheel")) {
                Game.camera.inputs.remove(Game.camera.inputs.attached.mousewheel);
            }
        }
        return 0;
    }
    static cameraPointerControlAttach() {
        if (!(Game.camera instanceof BABYLON.Camera)) {
            return 1;
        }
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.cameraPointerControlAttach()");
        if (Game.camera.getClassName() == "ArcRotateCamera") {
            if (!Game.camera.inputs.attached.hasOwnProperty("pointers")) {
                Game.camera.inputs.addPointers();
            }
            if (!Game.camera.inputs.attached.hasOwnProperty("mousewheel")) {
                Game.camera.inputs.addMouseWheel();
            }
            if (Game.camera.inputs.attached.hasOwnProperty("pointers")) {
                Game.camera.inputs.attached.pointers.angularSensibilityX = Game.cameraAngularSensitivityX;
                Game.camera.inputs.attached.pointers.angularSensibilityY = Game.cameraAngularSensitivityY;
            }
            if (Game.camera.inputs.attached.hasOwnProperty("mousewheel")) {
                Game.camera.inputs.attached.mousewheel.wheelPrecision = Game.cameraWheelPrecision;
            }
        }
        return 0;
    }
    static requestPointerLock() {
        if (Game.pointerLockTimeoutFunction == null) {
            if (Game.debugMode) BABYLON.Tools.Log("Running Game.requestPointerLock()");
            Game.pointerLockTimeoutFunction = setTimeout(() => {Game.pointerLock()}, 200);
        }
        return 0;
    }
    static pointerLock(event) {
        if (!Game.initialized) {
            return 1;
        }
        if (Game.engine.isPointerLock) {
            return 0;
        }
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.pointerLock()");
        if (Game.useNative) {}
        else {
            Game.canvas.requestPointerLock();
        }
        Game.afterPointerLock(event);
        return 0;
    }
    static afterPointerLock(event) {
        Game.updateInterfaceMode();
        if (!Game.loadedDefaultAssetsAfterObservable) {
            Game.loadDefaultAssetsAfterObservable();
        }
        return 0;
    }
    static pointerLockChange(event) {
        return 0;
    }
    static pointerRelease(event) {
        if (!Game.initialized) {
            return 1;
        }
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.pointerRelease()");
        if (Game.pointerLockTimeoutFunction != null) {
            clearTimeout(Game.pointerLockTimeoutFunction);
            Game.pointerLockTimeoutFunction = null;
        }
        if (!Game.engine.isPointerLock) {
            return 0;
        }
        if (Game.useNative) {}
        else {
            document.removeEventListener("pointerlockchange", Game.pointerRelease);
            document.exitPointerLock();
        }
        return 0;
    }
    static afterPointerRelease(event) {
        Game.updateInterfaceMode();
        return 0;
    }
    static updateCameraTarget() {
        //if (Game.debugMode) BABYLON.Tools.Log("Running Game.updateCameraTarget()");
        if (Game.camera instanceof BABYLON.ArcRotateCamera) {
            return Game.updateArcRotateCameraTarget()
        }
        else if (Game.camera instanceof BABYLON.FollowCamera) {
            return Game.updateFollowCameraTarget();
        }
        return 0;
    }
    static updateFollowCameraTarget() {
        return 0;
    }
    static updateArcRotateCameraTarget() {
        if (!(Game.playerController instanceof EntityController) || !Game.playerController.hasMesh() || !Game.playerController.hasSkeleton()) {
            return 1;
        }
        if (Game.enableFirstPerson && Game.camera.radius <= 0.5) {
            if (Game.playerController.getMesh().isVisible) {
                if (Game.debugMode) BABYLON.Tools.Log("Running Game.updateArcRotateCameraTarget()");
                Game.playerController.hideMesh();
                Game.camera.checkCollisions = false;
                Game.camera.inertia = 0.75;
                if (Game.bUseGUI) {
                    Game.gui.hud.showCrosshair();
                }
            }
        }
        else if (!Game.playerController.meshes[0].isVisible) {
            if (Game.debugMode) BABYLON.Tools.Log("Running Game.updateArcRotateCameraTarget()");
            Game.playerController.showMesh();
            Game.camera.checkCollisions = false;
            Game.camera.inertia = Game.cameraInertia;
            Game.camera.inputs.attached.pointers.angularSensibilityX = Game.cameraAngularSensitivityX;
            Game.camera.inputs.attached.pointers.angularSensibilityY = Game.cameraAngularSensitivityY;
            if (Game.bUseGUI) {
                Game.gui.hud.hideCrosshair();
            }
        }
        if (Game.useCameraRay) {
            if (Game.playerController.meshes[0].isVisible && Game.cameraRay instanceof BABYLON.Ray) {
                Game.cameraRay.origin = Game.camera.lockedTarget.absolutePosition;
                Game.cameraRay.length = Game.camera.radius;
                Game.cameraRay.direction.copyFrom(Game.camera.position.subtract(Game.camera.lockedTarget.absolutePosition).normalize());
                let hit = Game.scene.pickWithRay(Game.cameraRay, (mesh) => {
                    if (!mesh.checkCollisions || mesh == Game.playerController.collisionMesh) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }, true);
                if (hit.hit) {
                    if (Game.camera.checkCollisions) {
                        Game.camera.position.copyFrom(hit.pickedPoint);
                    }
                }
            }
        }
        return 0;
    }
    static doEntityAction(targetController, actorController = Game.playerController, actionID = null) {
        if (!(targetController instanceof EntityController)) {
            if (EntityController.has(targetController)) {
                targetController = EntityController.get(targetController);
            }
            else {
                return 2;
            }
        }
        if (!(actorController instanceof EntityController)) {
            if (EntityController.has(actorController)) {
                actorController = EntityController.get(actorController);
            }
            else {
                return 2;
            }
        }
        if (!ActionEnum.properties.hasOwnProperty(actionID)) {
            if (ActionEnum.hasOwnProperty(actionID)) {
                actionID = ActionEnum[actionID];
            }
            else {
                actionID = targetController.getDefaultAction();
            }
        }
        else {
            actionID = Number.parseInt(actionID);
        }
        if (Game.debugMode) BABYLON.Tools.Log(`Running Game.doEntityAction(${targetController.id}, ${actorController.id}, ${actionID})`);
        switch (actionID) {
            case ActionEnum.USE: {
                if (targetController instanceof LightingController) {
                    targetController.toggle();
                }
                break;
            }
            case ActionEnum.TOUCH: {
                Game.actionTouch(targetController, actorController);
                break;
            }
            case ActionEnum.LOOK: {
                Game.actionLook(targetController, actorController);
                break;
            }
            case ActionEnum.READ: {
                Game.actionRead(targetController, actorController);
                break;
            }
            case ActionEnum.LAY: {
                Game.actionLay(targetController, actorController);
                break;
            }
            case ActionEnum.SIT: {
                Game.actionSit(targetController, actorController);
                break;
            }
            case ActionEnum.TAKE: {
                if (targetController instanceof ItemController) {
                    Game.actionTake(targetController, actorController);
                }
                break;
            }
            case ActionEnum.OPEN: {
                if (targetController instanceof DoorController || targetController instanceof FurnitureController) {
                    Game.actionOpen(targetController, actorController);
                }
                break;
            }
            case ActionEnum.CONSUME: {
                Game.actionConsume(targetController, actorController);
                break;
            }
            case ActionEnum.CLOSE: {
                if (targetController instanceof DoorController || targetController instanceof FurnitureController) {
                    Game.actionClose(targetController, actorController);
                }
                break;
            }
            case ActionEnum.TALK: {
                if (targetController instanceof CharacterController) {
                    Game.actionTalk(targetController, actorController);
                }
                break;
            }
            case ActionEnum.ATTACK: {
                if (targetController instanceof EntityController) {
                    Game.actionAttack(targetController, actorController);
                }
                break;
            }
        }
        return 0;
    }
    static actionAttack(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        targetController = Game.filterController(targetController);
        actorController = Game.filterController(actorController);
        if (targetController == 1 || actorController == 1) {
            return 1;
        }
        if (Game.debugMode) BABYLON.Tools.Log(`Game.actionAttack(${targetController.id}, ${actorController.id})`);
        let callbackID = String("actionAttack-").concat(Tools.genUUIDv4());
        Callback.create(callbackID, parentCallbackID, [targetController, actorController], Game.actionAttackResponse);
        Game.entityLogicWorkerPostMessage("actionAttack", 0, {"actorID":actorController.id, "targetID":targetController.id}, callbackID);
        actorController.doAttack();
        return 0;
    }
    static actionAttackResponse(targetController, actorController, response, parentCallbackID) {
        if (Game.debugMode) BABYLON.Tools.Log(`Game.actionAttackResponse(${targetController.id}, ${actorController.id})`);
        switch (response) {
            case AttackResponseEnum.FINISH: {
                targetController.doAttacked();
                actorController.doAttackFinished();
                break;
            }
            case AttackResponseEnum.BLOCK: {
                targetController.doBlockAttack();
                actorController.doAttackBlocked();
                break;
            }
            case AttackResponseEnum.PARRY: {
                break;
            }
            case AttackResponseEnum.MISS: {
                break;
            }
        }
        return 0;
    }
    static actionClose(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        targetController = Game.filterController(targetController);
        actorController = Game.filterController(actorController);
        if (targetController == 1 || actorController == 1) {
            return 1;
        }
        if (Game.debugMode) BABYLON.Tools.Log(`Game.actionClose(${targetController.id}, ${actorController.id})`);
        let callbackID = String("actionClose-").concat(Tools.genUUIDv4());
        Callback.create(callbackID, parentCallbackID, [targetController, actorController], Game.actionCloseResponse);
        Game.entityLogicWorkerPostMessage("actionClose", 0, {"actorID":actorController.id, "targetID":targetController.id}, callbackID);
        return 0;
    }
    static actionCloseResponse(targetController, actorController, response, parentCallbackID) {
        if (Game.debugMode) BABYLON.Tools.Log(`Game.actionCloseResponse(${targetController.id}, ${actorController.id})`);
        if (targetController instanceof DoorController || targetController instanceof FurnitureController) {
            if (response === true) {
                targetController.doClose();
            }
        }
        return 0;
    }
    static actionConsume(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        return 0;
    }
    static actionDrop(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        if (Game.hasCachedEntity(targetController)) {}
        else if (targetController instanceof Object && targetController.hasOwnProperty("entityID")) {
            targetController = targetController.id;
        }
        else {
            let tempController = Game.filterController(actorController);
            if (tempController instanceof EntityController) {
                targetController = tempController.id;
            }
            else {
                return 2;
            }
        }
        actorController = Game.filterController(actorController);
        if (Game.debugMode) BABYLON.Tools.Log(`Game.actionDrop(${targetController}, ${actorController.id})`);
        let callbackID = String("actionDrop-").concat(Tools.genUUIDv4());
        Callback.create(callbackID, parentCallbackID, [targetController, actorController], Game.actionDropResponse);
        Game.entityLogicWorkerPostMessage("actionDrop", 0, {"actorID":actorController.id, "targetID":targetController}, callbackID);
        return 0;
    }
    static actionDropResponse(targetController, actorController, response, parentCallbackID) {
        if (response) {
        }
        return 0;
    }
    /**
     * 
     * @param {(EntityController|string)} targetController Can be an EntityController, or an Entity ID
     * @param {(EntityController|string)} actorController 
     * @param {string} [parentCallbackID] 
     */
    static actionEquip(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        if (Game.hasCachedEntity(targetController)) {}
        else if (targetController instanceof Object && targetController.hasOwnProperty("entityID")) {
            targetController = targetController.id;
        }
        else {
            let tempController = Game.filterController(actorController);
            if (tempController instanceof EntityController) {
                targetController = tempController.id;
            }
            else {
                return 2;
            }
        }
        actorController = Game.filterController(actorController);
        Game.entityLogicWorkerPostMessage("actionEquip", 0, {"actorID":actorController.id, "targetID":targetController});
        return 0;
    }
    static actionHold(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        if (Game.hasCachedEntity(targetController)) {}
        else if (targetController instanceof Object && targetController.hasOwnProperty("entityID")) {
            targetController = targetController.id;
        }
        else {
            let tempController = Game.filterController(actorController);
            if (tempController instanceof EntityController) {
                targetController = tempController.id;
            }
            else {
                return 2;
            }
        }
        actorController = Game.filterController(actorController);
        Game.entityLogicWorkerPostMessage("actionHold", 0, {"actorID":actorController.id, "targetID":targetController});
        return 0;
    }
    static actionLay(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        targetController = Game.filterController(targetController);
        actorController = Game.filterController(actorController);
        if (targetController == 1 || actorController == 1) {
            return 1;
        }
        return 0;
    }
    static actionLook(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        targetController = Game.filterController(targetController);
        actorController = Game.filterController(actorController);
        if (targetController == 1 || actorController == 1) {
            return 1;
        }
        if (Game.debugMode) BABYLON.Tools.Log(`Game.actionLook(${targetController?.id}, ${actorController?.id})`);
        let callbackID = String("actionLook-").concat(Tools.genUUIDv4());
        Callback.create(callbackID, parentCallbackID, [targetController, actorController], Game.actionLookResponse);
        Game.entityLogicWorkerPostMessage("actionLook", 0, {"actorID":actorController.id, "targetID":targetController.id}, callbackID);
        return 0;
    }
    static actionLookResponse(targetController, actorController, response, parentCallbackID) {
        Game.gui.chat.appendOutput(response);
        return 0;
    }
    static actionOpen(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        targetController = Game.filterController(targetController);
        actorController = Game.filterController(actorController);
        if (targetController == 1 || actorController == 1) {
            return 1;
        }
        if (Game.debugMode) BABYLON.Tools.Log(`Game.actionOpen(${targetController.id}, ${actorController.id})`);
        let callbackID = String("actionOpen-").concat(Tools.genUUIDv4());
        Callback.create(callbackID, parentCallbackID, [targetController, actorController], Game.actionOpenResponse);
        Game.entityLogicWorkerPostMessage("actionOpen", 0, {"actorID":actorController.id, "targetID":targetController.id}, callbackID);
        return 0;
    }
    static actionOpenResponse(targetController, actorController, response, parentCallbackID) {
        if (Game.debugMode) BABYLON.Tools.Log(`Game.actionOpenResponse(${targetController.id}, ${actorController.id})`);
        Game.playEnvironmentSoundEffects(response["soundEffects"]);
        if (targetController instanceof DoorController || targetController instanceof FurnitureController) {
            Game.actionOpenFurnitureResponse(targetController, actorController, response);
        }
        else if (targetController instanceof CreatureController) {
            Game.actionOpenCreatureResponse(targetController, actorController, response);
        }
        return 0;
    }
    static actionOpenFurnitureResponse(targetController, actorController, response) {
        if (response["isOpened"]) {
            targetController.doOpen();
        }
        return 0;
    }
    static actionRead(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        targetController = Game.filterController(targetController);
        actorController = Game.filterController(actorController);
        if (targetController == 1 || actorController == 1) {
            return 1;
        }
        return 0;
    }
    static actionRelease(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        if (Game.hasCachedEntity(targetController)) {}
        else if (targetController instanceof Object && targetController.hasOwnProperty("entityID")) {
            targetController = targetController.id;
        }
        else {
            let tempController = Game.filterController(actorController);
            if (tempController instanceof EntityController) {
                targetController = tempController.id;
            }
            else {
                return 2;
            }
        }
        actorController = Game.filterController(actorController);
        Game.entityLogicWorkerPostMessage("actionRelease", 0, {"actorID":actorController.id, "targetID":targetController});
        return 0;
    }
    static actionSit(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        targetController = Game.filterController(targetController);
        actorController = Game.filterController(actorController);
        if (targetController == 1 || actorController == 1) {
            return 1;
        }
        return 0;
    }
    static actionTake(targetController, actorController = Game.playerController, parentCallbackID = null) {
        targetController = Game.filterController(targetController);
        actorController = Game.filterController(actorController);
        if (targetController == null || actorController == null) {
            return 1;
        }
        if (Game.debugMode) BABYLON.Tools.Log(`Game.actionTake(${targetController.id}, ${actorController.id})`);
        Game.entityLogicWorkerPostMessage("actionTake", 0, {"actorID":actorController.id, "targetID":targetController.id});
        // TODO: actorController.play("grab");
        return 0;
    }
    static actionTalk(targetController = Game.playerController.getTarget(), actorController = Game.playerController, parentCallbackID = null) {
        targetController = Game.filterController(targetController);
        actorController = Game.filterController(actorController);
        if (targetController == 1 || actorController == 1) {
            return 1;
        }
        if (Game.debugMode) BABYLON.Tools.Log(`Game.actionTalk(${targetController.id}, ${actorController.id})`);
        let callbackID = String("actionTalk-").concat(Tools.genUUIDv4());
        Callback.create(callbackID, parentCallbackID, [targetController, actorController], Game.actionTalkResponse);
        Game.entityLogicWorkerPostMessage("actionTalk", 0, {"actorID":actorController.id, "targetID":targetController.id}, callbackID);
        return 0;
    }
    static actionTalkResponse(targetController, actorController, response, parentCallbackID) {
        if (Game.debugMode) BABYLON.Tools.Log(`Game.actionTalkResponse(${targetController.id}, ${actorController.id}, {}, ${parentCallbackID})`);
        if (Game.bUseGUI) {
            Game.gui.dialogue.set(response, targetController, actorController);
            Game.gui.dialogue.show();
        }
        return 0;
    }
    static actionUnequip(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        if (Game.hasCachedEntity(targetController)) {}
        else if (targetController instanceof Object && targetController.hasOwnProperty("entityID")) {
            targetController = targetController.id;
        }
        else {
            let tempController = Game.filterController(actorController);
            if (tempController instanceof EntityController) {
                targetController = tempController.id;
            }
            else {
                return 2;
            }
        }
        actorController = Game.filterController(actorController);
        let callbackID = String("actionUnequipPhaseOne-").concat(Tools.genUUIDv4());
        Callback.create(callbackID, parentCallbackID, [targetController, actorController], Game.actionUnequipResponsePhaseTwo);
        Game.entityLogicWorkerPostMessage("actionUnequip", 0, {"actorID":actorController.id, "targetID":targetController}, callbackID);
        return 0;
    }
    // TODO
    static actionUnequipResponsePhaseTwo(targetController, actorController, response, parentCallbackID) {
        if (response) {
            let callbackID = String("actionUnequipPhaseTwo-").concat(Tools.genUUIDv4());
            Callback.create(callbackID, parentCallbackID, [targetController, actorController], Game.actionUnequipResponsePhaseThree);
        }
        return 0;
    }
    static actionUnequipResponsePhaseThree(targetController, actorController, response, parentCallbackID) {
        actorController.assign(response);
        actorController.generateEquippedMeshes();
        return 0;
    }
    static actionUse(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        targetController = Game.filterController(targetController);
        actorController = Game.filterController(actorController);
        if (targetController == 1 || actorController == 1) {
            return 1;
        }
        return 0;
    }
    static actionTouch(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        targetController = Game.filterController(targetController);
        actorController = Game.filterController(actorController);
        if (targetController == 1 || actorController == 1) {
            return 1;
        }
        if (Game.debugMode) BABYLON.Tools.Log(`Game.actionTouch(${targetController.id}, ${actorController.id})`);
        let callbackID = String("actionTouch-").concat(Tools.genUUIDv4());
        Callback.create(callbackID, parentCallbackID, [targetController, actorController], Game.actionTouchResponse);
        Game.entityLogicWorkerPostMessage("actionTouch", 0, {"actorID":actorController.id, "targetID":targetController.id}, callbackID);
        return 0;
    }
    // TODO
    static actionTouchResponse(targetController, actorController, response, parentCallbackID) {
        console.log(response);
        console.log(parentCallbackID);
        return 0;
    }

    /**
     * 
     * @param {(string|null)} parentCallbackID 
     * @returns {number}
     */
    static unloadCell(deleteCache = false, parentCallbackID = null) {
        if (Game.debugMode) console.group(`Running Game.unloadCell(${deleteCache}, ${parentCallbackID})`);
        if (Game.currentCellID == null) {
            Callback.run(parentCallbackID);
            return 1;
        }
        if (!Game.cachedCells.hasOwnProperty(Game.currentCellID)) {
            Callback.run(parentCallbackID);
            return 1;
        }
        Game.initFreeCamera(false, false);
        AbstractController.clear();
        AbstractNode.clear();
        let cellID = Game.currentCellID;
        Game.currentCellID = null;
        for (let entityController in EntityController.list()) {
            EntityController.get(entityController).dispose();
        }
        for (let i in Game.cachedCells[cellID].tiledMeshes) {
            Game.removeMesh(Game.cachedCells[cellID].tiledMeshes[i]);
        }
        for (let i in Game.cachedCells[cellID].collisionPlanes) {
            Game.removeMesh(Game.cachedCells[cellID].collisionPlanes[i]);
        }
        for (let i in Game.cachedCells[cellID].collisionRamps) {
            Game.removeMesh(Game.cachedCells[cellID].collisionRamps[i]);
        }
        for (let i in Game.cachedCells[cellID].collisionWalls) {
            Game.removeMesh(Game.cachedCells[cellID].collisionWalls[i]);
        }
        for (let meshID in Game.instancedMeshes) {
            Game.removeMesh(meshID);
            delete Game.instancedMeshes[meshID];
        }
        for (let meshID in Game.clonedMeshes) {
            Game.removeMesh(meshID);
            delete Game.clonedMeshes[meshID];
        }
        for (let i in Game.loadedMeshMaterials) {
            for (let j in Game.loadedMeshMaterials[i]) {
                Game.removeMeshMaterial(i, j);
            }
        }
        for (let meshID in Game.tiledMeshes) {
            Game.tiledMeshes[meshID].dispose();
            delete Game.tiledMeshes[meshID];
        }
        let mesh = null;
        for (let meshID in Game.collisionMeshes) {
            mesh = Game.scene.getMeshByID(meshID);
            if (mesh instanceof BABYLON.AbstractMesh) {
                mesh.dispose();
            }
            mesh = null;
            delete Game.collisionMeshes[meshID];
        }
        if (deleteCache) {
            for (let meshID in Game.loadedMeshes) {
                Game.removeMesh(meshID);
            }
            for (let materialID in Game.loadedMaterials) {
                Game.removeMaterial(materialID);
            }
        }
        Callback.run(parentCallbackID);
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static unloadCellResponse(cellID, response, parentCallbackID = null) {
        if (Game.debugMode) console.group(`Running Game.unloadCellResponse(${cellID}, ${parentCallbackID})`);
        if (Callback.has(parentCallbackID)) {
            parentCallbackID = Callback.get(parentCallbackID).parent;
        }
        if (Game.debugMode) console.groupEnd();
        Game.entityLogicWorkerPostMessage("unloadCellResponse", 0, { "cellID": cellID }, parentCallbackID);
        return 0;
    }
    /**
     * 
     * @param {string} cellID 
     * @param {(string|null)} [parentCallbackID] 
     */
    static loadCell(cellID, parentCallbackID = null) {
        if (Game.debugMode) console.group(`Running Game.loadCell(${cellID}, ${parentCallbackID})`);
        if (cellID == Game.currentCellID) {
            return 0;
        }
        if (Game.hasCachedCell(cellID)) {
            if (Game.debugMode) console.groupEnd();
            return Game.loadCellPhaseTwo(cellID, Game.getCachedCell(cellID), Callback.create(String("loadCellStatic-").concat(Tools.genUUIDv4()), parentCallbackID));
        }
        else {
            let callbackID = String("loadCell-").concat(Tools.genUUIDv4());
            Callback.create(callbackID, parentCallbackID, [cellID], Game.loadCellPhaseTwo);
            Game.getCell(cellID, callbackID);
        }
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static loadCellPhaseTwo(cellID, response, parentCallbackID) {
        if (Game.debugMode) console.group(`Running Game.loadCellPhaseTwo(${cellID}, ${parentCallbackID})`);
        if (!Game.hasCachedCell(cellID)) {
            if (Game.debugMode) console.warn("Doesn't have cached cell");
            if (Game.debugMode) console.groupEnd();
            return 1;
        }
        let cell = Game.getCachedCell(cellID);
        if (cell.id == Game.currentCellID) {
            if (Game.debugMode) console.warn("Cell is already assigned");
            if (Game.debugMode) console.groupEnd();
            return 0;
        }
        Game.previousCellID = Game.currentCellID;
        Game.currentCellID = cellID;
        if (cell.skybox == "dayNightCycle") {
            Game.loadSkyMaterial();
            Game.skybox.material.azimuth = cell.skyboxAzimuth;
            Game.skybox.material.inclination = cell.skyboxInclination;
            Game.ambientLight.intensity = cell.ambientLightIntensity;
        }
        else {
            Game.unloadMaterial("dayNightCycle");
        }
        cell["scenes"].forEach((entry) => {
            if (entry instanceof Array) {
                Game.importScene(...entry);
            }
            else {
                Game.importScene(entry);
            }
        });
        // materials, tiled meshes, collision meshes, meshes, then everything else
        cell["materials"].forEach((entry) => {
            if (entry instanceof Array) {
                Game.loadMaterial(...entry);
            }
            else {
                Game.loadMaterial(entry);
            }
        });
        cell["meshIDs"].forEach((entry) => {
            if (entry instanceof Array) {
                Game.loadMesh(...entry);
            }
            else {
                Game.loadMesh(entry);
            }
        });
        cell["tiledMeshes"].forEach((entry) => {
            Game.createTiledMesh(...entry);
        });
        cell["collisionPlanes"].forEach((entry) => {
            Game.createCollisionPlane(...entry);
        });
        cell["collisionRamps"].forEach((entry) => {
            Game.createCollisionRamp(...entry);
        });
        cell["collisionWalls"].forEach((entry) => {
            Game.createCollisionWall(...entry);
        });
        cell["meshes"].forEach((entry) => {
            Game.createMesh(...entry);
        });
        Callback.runParent(parentCallbackID);
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static loadCellResponse(cellID, response, parentCallbackID) {
        if (Game.debugMode) console.group(`Running Game.loadCellResponse(${cellID}, ..., ${parentCallbackID})`);
        if (Callback.has(parentCallbackID)) {
            parentCallbackID = Callback.get(parentCallbackID).parent;
        }
        if (Game.debugMode) console.groupEnd();
        Game.entityLogicWorkerPostMessage("loadCellResponse", 0, { "cellID": cellID }, parentCallbackID);
        return 0;
    }
    static loadEntitiesByCurrentCell(parentCallbackID) {
        return Game.loadEntitiesByCellID(Game.currentCellID, parentCallbackID);
    }
    static loadEntitiesByCellID(cellID, parentCallbackID) {
        if (Game.hasCachedCell(cellID)) {
            Game.loadEntitiesByCellIDPhaseTwo(cellID, Game.getCachedCell(cellID), Callback.create(String("loadEntitiesByCellIDStatic-").concat(Tools.genUUIDv4()), parentCallbackID));
        }
        else {
            Game.getCell(cellID, Callback.create(String("loadEntitiesByCellIDStatic-getCell-").concat(Tools.genUUIDv4()), parentCallbackID, [cellID], Game.loadEntitiesByCellIDPhaseTwo))
        }
        return 0;
    }
    static loadEntitiesByCellIDPhaseTwo(cellID, response, parentCallbackID) {
        let cell = Game.getCachedCell(cellID);
        cell["doors"].forEach((entry) => {
            Game.createDoor(...entry);
        });
        cell["furniture"].forEach((entry) => {
            Game.createFurniture(...entry);
        });
        cell["lighting"].forEach((entry) => {
            Game.createLighting(...entry);
        });
        cell["displays"].forEach((entry) => {
            Game.createDisplay(...entry);
        });
        cell["creatures"].forEach((entry) => {
            Game.createCreature(...entry);
        });
        cell["characters"].forEach((entry) => {
            Game.createCharacter(...entry);
        });
        cell["items"].forEach((entry) => {
            Game.createItem(...entry);
        });
        Callback.runParent(parentCallbackID);
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static loadEntitiesResponse(blob, response, parentCallbackID) {
        if (Game.debugMode) console.group(`Running Game.loadEntitiesResponse(..., ${parentCallbackID})`);
        if (Callback.has(parentCallbackID)) {
            parentCallbackID = Callback.get(parentCallbackID).parent;
        }
        if (Game.debugMode) console.groupEnd();
        Game.entityLogicWorkerPostMessage("loadEntitiesResponse", 0, null, parentCallbackID);
        return 0;
    }
    static loadCellAndSetPlayerAt(cellID = Game.selectedCellID, position = [0,0,0], rotation = [0,0,0], options = null) {
        Game.entityLogicWorkerPostMessage("loadCellAndSetPlayerAt", 0, { "cellID": cellID, "position": position, "rotation": rotation });
        return 0;
    }
    static loadPlayerAt(position, rotation, options = null) {
        Game.entityLogicWorkerPostMessage("loadPlayerAt", 0, { "position": position, "rotation": rotation });
        return 0;
    }

    static loadSkyMaterial() {
        if (Game.hasLoadedMaterial("dayNightCycle")) {
            return 0;
        }
        let dayNightCycle = new BABYLON.SkyMaterial("dayNightCycle", Game.scene);
        Game.setLoadedMaterial("dayNightCycle", dayNightCycle);
        dayNightCycle.backFaceCulling = false;
        dayNightCycle.azimuth = 0.25;
        dayNightCycle.inclination = 0.0;
        Game.skybox.material = dayNightCycle;
        return 0;
    }
    static setDebugMode(debugMode) {
        Game.debugMode = debugMode == true;
        return 0;
    }
    static enableDebugMode() {
        return Game.setDebugMode(true);
    }
    static disableDebugMode() {
        return Game.setDebugMode(false);
    }
    static setInterfaceMode(interfaceMode = InterfaceModeEnum.NONE) {
        if (InterfaceModeEnum.properties.hasOwnProperty(interfaceMode)) { }
        else if (isNaN(interfaceMode) && InterfaceModeEnum.hasOwnProperty(interfaceMode)) {
            interfaceMode = InterfaceModeEnum[interfaceMode];
        }
        else {
            return 2;
        }
        if (Game.debugMode) BABYLON.Tools.Log(`Running Game.setInterfaceMode(${InterfaceModeEnum.properties[interfaceMode].name})`);
        if (interfaceMode == InterfaceModeEnum.WRITING) {
            Game.interfaceMode = InterfaceModeEnum.WRITING;
            return 0;
        }
        Game.previousInterfaceMode = Game.interfaceMode;
        Game.interfaceMode = interfaceMode;
        Game.updateInterfaceMode();
        return 0;
    }
    static updateInterfaceMode() {
        if (Game.debugMode) console.group("Running Game.updateInterfaceMode()");
        switch (Game.interfaceMode) {
            case InterfaceModeEnum.CHARACTER: {
                Game.cameraPointerControlAttach();
                if (Game.bUseGUI) {
                    Game.gui.hud.actionTooltip.unlock();
                    Game.gui.cursor.hide();
                    Game.gui.hud.show();
                }
                Game.controls = CharacterControls;
                break;
            }
            case InterfaceModeEnum.DIALOGUE: {
                if (Game.bUseGUI) {
                    Game.gui.hud.actionTooltip.lock();
                }
                Game.cameraPointerControlDetach();
                if (Game.bUseGUI) {
                    Game.gui.cursor.show();
                }
                Game.controls = DialogueControls;
                break;
            }
            case InterfaceModeEnum.MENU: {
                if (Game.bUseGUI) {
                    Game.gui.hud.actionTooltip.lock();
                }
                Game.cameraPointerControlDetach();
                if (Game.bUseGUI) {
                    Game.gui.cursor.show();
                }
                Game.controls = MenuControls;
                break;
            }
            case InterfaceModeEnum.RADIAL: {
                if (Game.bUseGUI) {
                    Game.gui.hud.actionTooltip.lock();
                }
                Game.cameraPointerControlDetach();
                RadialControls.reset();
                if (Game.bUseGUI) {
                    Game.gui.cursor.hide();
                    Game.gui.hud.hideCrosshair();
                    Game.gui.hud.actionTooltip.hide();
                }
                Game.controls = RadialControls;
                break;
            }
            case InterfaceModeEnum.EDIT: {
                Game.cameraPointerControlDetach();
                EditControls.reset();
                if (Game.bUseGUI) {
                    Game.gui.cursor.show();
                }
                Game.controls = EditControls;
                break;
            }
        }
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static getInterfaceMode() {
        return Game.interfaceMode;
    }
    static checkAndSetInterfaceMode(interfaceMode = InterfaceModeEnum.CHARACTER) {
        if (!Game.bUseGUI) {
            return 0;
        }
        if (Game.gui.windowStack.length == 0) {
            return Game.setInterfaceMode(interfaceMode);
        }
        let lastWindow = Game.gui.windowStack[Game.gui.windowStack.length - 1];
        if (lastWindow.hasOwnProperty("interfaceMode")) {
            return Game.setInterfaceMode(lastWindow["interfaceMode"]);
        }
        return 0;
    }

    /**
     * 
     * @param {number} diameter 
     * @param {number} force in metres per second
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} rotation 
     * @param {number} distanceLimit 
     * @param {number} hitLimit 
     * @param {string} meshID 
     * @param {string} materialID 
     * @param {(string|null)} parentCallbackID 
     * @param {(function|null)} callback 
     */
    static fireProjectile(diameter, force, position, rotation, distanceLimit = 127.0, hitLimit = 1, meshID, materialID, parentCallbackID, callback = Game.fireProjectileResponse) {
        let callbackID = String("fireProjectile-").concat(Tools.genUUIDv4());
        Callback.create(callbackID, parentCallbackID, [diameter, force, position, rotation, distanceLimit, hitLimit, meshID, materialID], callback);
        Game.transformsWorkerPostMessage("inProjectPath", 0, {"diameter":diameter, "force":force, "position":position, "rotation":rotation, "distanceLimit":distanceLimit, "hitLimit":hitLimit}, callbackID);
        return callbackID;
    }
    static fireProjectileResponse(diamter, force, position, rotation, distanceLimit, hitLimit, meshID, materialID, response, parentCallbackID) {
        return 0;
    }

    static tickWorkerOnMessage(event) {
        if (!event.data.hasOwnProperty("cmd")) {
            return 2;
        }
        let status = event.data["sta"];
        let callbackID = event.data["callbackID"];
        let message = event.data["msg"];
        switch (event.data.cmd) {
            case "connectedToEntityLogic": {
                Game.bConnectedTickToEntityLogic = true;
                Callback.run(callbackID);
                break;
            }
            case "sendInfo": {
                // TODO: recalculate all scheduled events, or find a way so I don't have to (by using ticks, rounds, and turns) :v
                Game.currentTick = message[0];
                Game.gameTimeMultiplier = message[1];
                Game.ticksPerTurn = message[2];
                Game.turnsPerRound = message[3];
                Game.turnTime = message[4];
                Game.roundTime = message[5];
                break;
            }
            case "sendTimestamp": {
                Game.currentTime = message[0];
                if (Game.currentCellID != null) {
                    Game.updateSkybox();
                }
                break;
            }
            case "entityToggler": {
                Game.transformsWorkerPostMessage("toggleEntities");
                break;
            }
            case "triggerScheduledCommand": {
                //BABYLON.Tools.Log(e.data["msg"]);
                break;
            }
            case "tick": {
                Game.currentTick = event.data["msg"][0];
                break;
            }
            case "turn": {
                Game.currentTurn = event.data["msg"][0];
                break;
            }
            case "round": {
                Game.currentRound = event.data["msg"][0];
                break;
            }
        }
        return 0;
    }
    /**
     * 
     * @param {string} command 
     * @param {number} status 
     * @param {(Array<string>|object)} [message] 
     * @param {(string|undefined)} [callbackID] 
     * @param {(object|undefined)} [options] 
     */
    static tickWorkerPostMessage(command, status = 0, message, callbackID = null, options = null) {
        let obj = {"cmd": command, "sta": status, "msg": message};
        if (callbackID) {
            obj["callbackID"] = callbackID;
        }
        if (options) {
            Game.tickWorker.postMessage(obj, options);
        }
        else {
            Game.tickWorker.postMessage(obj);
        }
        return 0;
    }
    static transformsWorkerOnMessage(event) {
        if (!event.data.hasOwnProperty("cmd") || !event.data.hasOwnProperty("msg")) {
            return 2;
        }
        let status = event.data["sta"];
        let callbackID = event.data["callbackID"];
        let message = event.data["msg"];
        switch (event.data["cmd"]) {
            case "connectedToEntityLogic": {
                Game.bConnectedTransformsToEntityLogic = true;
                Callback.run(callbackID);
                break;
            }
            case "enable": {
                if (message.length > 0) {
                    for (let i in message) {
                        if (EntityController.has(message[i])) {
                            EntityController.get(message[i]).setEnabled(true);
                        }
                    }
                }
                break;
            }
            case "disable": {
                if (message.length > 0) {
                    for (let i in message) {
                        if (EntityController.has(message[i])) {
                            EntityController.get(message[i]).setEnabled(false);
                        }
                    }
                }
                break;
            }
            case "createEntity": {
                let controller = EntityController.get(message["id"]);
                if (controller instanceof EntityController) {
                    Game.transformsWorkerPostMessage(
                        "createEntity",
                        0,
                        {
                            "id": controller.id,
                            "width": controller.width,
                            "height": controller.height,
                            "depth": controller.depth,
                            "position": controller.getPosition().toOtherArray(),
                            "rotation": controller.getRotation().toOtherArray()
                        }
                    );
                }
                break;
            }
            case "inProjectPath":
            case "withinRange":
            case "inFrontOf":
            case "inArea": {
                if (Callback.has(callbackID)) {
                    let controllers = [];
                    for (let i in message) {
                        if (EntityController.has(message[i])) {
                            controllers.push(EntityController.get(message[i]));
                        }
                    }
                    Callback.run(callbackID, controllers);
                }
                break;
            }
            case "requestUpdate": {
                break;
            }
        }
        return 0;
    }
    /**
     * 
     * @param {string} command 
     * @param {number} status 
     * @param {(Array<string>|object)} [message] 
     * @param {(string|undefined)} [callbackID] 
     * @param {(object|undefined)} [options] 
     */
    static transformsWorkerPostMessage(command, status = 0, message, callbackID = null, options = null) {
        let obj = {"cmd": command, "sta": status, "msg": message};
        if (callbackID) {
            obj["callbackID"] = callbackID;
        }
        if (options) {
            Game.transformsWorker.postMessage(obj, options);
        }
        else {
            Game.transformsWorker.postMessage(obj);
        }
        return 0;
    }
    static entityLogicWorkerOnMessage(event) {
        if (Game.debugMode) console.group(`Running Game.entityLogicWorkerOnMessage`);
        if (!event.data.hasOwnProperty("cmd") || !event.data.hasOwnProperty("msg")) {
            if (Game.debugMode) console.groupEnd();
            return 2;
        }
        if (event.data["sta"] > 1) {
            if (Game.debugMode) {
                console.warn(`Planned error while attempting command ${event.data["cmd"]} with callback ID ${callbackID}`);
                console.groupEnd();
            }
            return 1;
        }
        if (Game.debugMode) console.info(`with command (${event.data["cmd"]})`);
        let callbackID = event.data["callbackID"];
        if (Game.debugMode) console.info(`and callbackID (${callbackID})`);
        
        if (event.data["msg"] == null) {
            Game._entityLogicWorkerPhaseTwo(event.data["cmd"], {}, event.data["sta"], callbackID)
        }
        else if (typeof event.data["msg"] != "string") {
            if (Game.debugMode) {
                console.warn(`Failed at message; not a string`);
                console.log(event.data["msg"]);
                console.groupEnd();
            }
            return 2;
        }
        let message = {}
        try {
            message = JSON.parse(event.data["msg"]);
        }
        catch (e) {
            if (Game.debugMode) {
                console.warn(`Failed at parsing message; not a JSON string`);
                console.log(event.data["msg"]);
                console.groupEnd();
            }
            return 2;
        }
        if (Game.debugMode && message) console.info(`and message`);
        Game._entityLogicWorkerPhaseTwo(event.data["cmd"], message, event.data["sta"], callbackID)
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    /**
     * 
     * @param {string} command 
     * @param {Object} message 
     * @param {number} status 
     * @param {string} callbackID 
     * @returns 
     */
    static _entityLogicWorkerPhaseTwo(command, message, status, callbackID) {
        switch (command) {
            case "connectedToTick": {
                Game.bConnectedEntityLogicToTick = true;
                Callback.run(callbackID);
                break;
            }
            case "connectedToTransforms": {
                Game.bConnectedEntityLogicToTransforms = true;
                Callback.run(callbackID);
                break;
            }
            case "actionAttack": {
                Callback.run(callbackID, message);
                break;
            }
            case "actionClose": {
                Callback.run(callbackID, message);
                break;
            }
            case "actionDrop": {
                Callback.run(callbackID, message);
                break;
            }
            case "actionEquip": {
                Callback.run(callbackID, message);
                break;
            }
            case "actionHold": {
                Callback.run(callbackID, message);
                break;
            }
            case "actionLook": {
                Callback.run(callbackID, message);
                break;
            }
            case "actionOpen": {
                Callback.run(callbackID, message);
                break;
            }
            case "actionUnequip": {
                Callback.run(callbackID, message);
                break;
            }
            case "actionTouch": {
                Callback.run(callbackID, message);
                break;
            }
            case "actionTalk": {
                Callback.run(callbackID, message);
                break;
            }
            case "assignPlayer": {
                Game.assignPlayer(message["controllerID"], Callback.create(String("entityLogicWorkerOnMessage-assignPlayer-").concat(Tools.genUUIDv4()), callbackID, [message["controllerID"]], Game.assignPlayerResponse));
                break;
            }
            case "clearCache": {
                Game.clearCache(false, Callback.create(String("entityLogicWorkerOnMessage-clearCache-").concat(Tools.genUUIDv4()), callbackID, null, Game.clearCacheResponse));
                break;
            }
            case "purgeCache": {
                Game.purgeCache(Callback.create(String("entityLogicWorkerOnMessage-purgeCache-").concat(Tools.genUUIDv4()), callbackID, null, Game.purgeCacheResponse));
                break;
            }
            case "createCharacter": {
                Game.createCharacter(message["instanceID"], message["entityID"], BABYLON.Vector3.FromArray(message["position"]), null, null, message["options"], Callback.create(String("entityLogicWorkerOnMessage-createCharacter-").concat(Tools.genUUIDv4()), callbackID, [message["instanceID"], message["entityID"], message["position"]], Game.createCharacterResponse));
                break;
            }
            case "createDoor":
            case "createFurniture":
            case "createItem":
            case "createLighting":
            case "createPlant": {
                break;
            }
            case "createItemAtController": {
                Game.createItemAtController(message["entityID"], message["entityID"], message["controllerID"]);
                break;
            }
            case "doDeath": {
                if (EntityController.has(message["controllerID"])) {
                    EntityController.get(message["controllerID"]).doDeath();
                }
                break;
            }
            case "doLay": {
                if (EntityController.has(message["controllerID"])) {
                    EntityController.get(message["controllerID"]).doLay();
                }
                break;
            }
            case "doProne": {
                if (EntityController.has(message["controllerID"])) {
                    EntityController.get(message["controllerID"]).doProne();
                }
                break;
            }
            case "doSit": {
                if (EntityController.has(message["controllerID"])) {
                    EntityController.get(message["controllerID"]).doSit();
                }
                break;
            }
            case "doSpawn": {
                if (EntityController.has(message["controllerID"])) {
                    EntityController.get(message["controllerID"]).doSpawn();
                }
                break;
            }
            case "doStand": {
                if (EntityController.has(message["controllerID"])) {
                    EntityController.get(message["controllerID"]).doStand();
                }
                break;
            }
            case "getDialogue": {
                if (!message.hasOwnProperty("id")) {
                    break;
                }
                Game.setCachedDialogue(message["id"], message);
                Callback.run(callbackID, message);
                break;
            }
            case "getDialogues": {
                for (let entry in message) {
                    Game.setCachedDialogue(entry, message);
                    Callback.run(callbackID, message);
                }
                break;
            }
            case "getEntity": {
                if (!message.hasOwnProperty("id")) {
                    break;
                }
                Game.setCachedEntity(message["id"], message);
                Callback.run(callbackID, message);
                break;
            }
            case "getEntities": {
                for (let entityID in message) {
                    Game.setCachedEntity(entityID, message[entityID]);
                    Callback.run(callbackID, message[entityID]);
                }
                break;
            }
            case "getHeld":
            case "getEquipment": {
                let target = null;
                if (Callback.has(callbackID)) {
                    /** @type {Callback} */
                    let callback = Callback.get(callbackID);
                    if (callback["params"].length == 1 && callback["params"][0].hasOwnProperty("entityID")) {
                        target = callback["params"][0]["entityID"];
                    }
                }
                for (let entry in message) {
                    Game.updateCachedEntity(message["id"], message);
                    if (entry == target) {
                        Callback.run(callbackID, message);
                    }
                }
                break;
            }
            case "getInventory": {
                let target = "";
                if (Callback.has(callbackID)) {
                    /** @type {Callback} */
                    let callback = Callback.get(callbackID);
                    if (callback["params"].length == 1 && callback["params"][0].hasOwnProperty("entityID")) {
                        target = callback["params"][0]["entityID"];
                    }
                }
                if (!message.hasOwnProperty("id")) {
                    break;
                }
                Game.updateCachedEntity(message["id"], message);
                if (message["id"] == target) {
                    Callback.run(callbackID, message);
                }
                break;
            }
            case "getMoney": {
                let amount = Number.parseFloat(message["amount"]) || 0;
                if (Game.bUseGUI) {
                    Game.gui.chat.appendOutput(`${message["targetName"]} has \$${amount}.`);
                }
                break;
            }
            case "getCellResponse": {
                Callback.run(callbackID, message);
                break;
            }
            case "hasItem": {
                Callback.run(callbackID, message);
                break;
            }
            case "hasController": {
                let ids = {};
                message.forEach((id) => {
                    if (EntityController.has(id)) {
                        ids[id] = true;
                    }
                    else {
                        ids[id] = false;
                    }
                });
                Game.entityLogicWorkerPostMessage("hasController", 0, ids, callbackID);
                break;
            }
            case "hasAvailableMesh": {
                let ids = {};
                message.forEach((id) => {
                    if (Game.hasAvailableMesh(id)) {
                        ids[id] = true;
                    }
                    else {
                        ids[id] = false;
                    }
                });
                Game.entityLogicWorkerPostMessage("hasAvailableMesh", 0, ids, callbackID);
                break;
            }
            case "hasAvailableTexture": {
                let ids = {};
                message.forEach((id) => {
                    if (Game.hasAvailableTexture(id)) {
                        ids[id] = true;
                    }
                    else {
                        ids[id] = false;
                    }
                });
                Game.entityLogicWorkerPostMessage("hasAvailableTexture", 0, ids, callbackID);
                break;
            }
            case "hasLoadedMesh": {
                let ids = {};
                message.forEach((id) => {
                    if (Game.hasLoadedMesh(id)) {
                        ids[id] = true;
                    }
                    else {
                        ids[id] = false;
                    }
                });
                Game.entityLogicWorkerPostMessage("hasLoadedMesh", 0, ids, callbackID);
                break;
            }
            case "hasLoadedTexture": {
                let ids = {};
                message.forEach((id) => {
                    if (Game.hasLoadedTexture(id)) {
                        ids[id] = true;
                    }
                    else {
                        ids[id] = false;
                    }
                });
                Game.entityLogicWorkerPostMessage("hasLoadedTexture", 0, ids, callbackID);
                break;
            }
            case "hasMesh": {
                let ids = {};
                message.forEach((id) => {
                    if (Game.hasMesh(id)) {
                        ids[id] = true;
                    }
                    else {
                        ids[id] = false;
                    }
                });
                Game.entityLogicWorkerPostMessage("hasMesh", 0, ids, callbackID);
                break;
            }
            case "hasTexture": {
                let ids = {};
                message.forEach((id) => {
                    if (Game.hasTexture(id)) {
                        ids[id] = true;
                    }
                    else {
                        ids[id] = false;
                    }
                });
                Game.entityLogicWorkerPostMessage("hasTexture", 0, ids, callbackID);
                break;
            }
            case "loadCell": {
                if (!message.hasOwnProperty("cellID")) {
                    break;
                }
                Game.loadCell(message["cellID"], Callback.create(String("entityLogicWorkerOnMessage-loadCell-").concat(Tools.genUUIDv4()), callbackID, [message["cellID"]], Game.loadCellResponse));
                break;
            }
            case "loadEntities": {
                if (!message.hasOwnProperty("entityIDs")) {
                    break;
                }
                Game.loadEntities(message["entityIDs"], Callback.create(String("entityLogicWorkerOnMessage-loadEntities-").concat(Tools.genUUIDv4()), callbackID, message["entityIDs"], Game.loadEntitiesResponse));
                break;
            }
            case "loadEntitiesByCellID": {
                if (!message.hasOwnProperty("cellID")) {
                    break;
                }
                Game.loadEntitiesByCellID(message["cellID"], Callback.create(String("entityLogicWorkerOnMessage-loadEntitiesByCellID-").concat(Tools.genUUIDv4()), callbackID, [message["cellID"]], Game.loadEntitiesResponse));
                break;
            }
            case "removeController": {
                if (!message.hasOwnProperty("controllerID")) {
                    break;
                }
                Game.removeController(message["controllerID"]);
                break;
            }
            case "removeItem": {
                if (message instanceof Array) {
                    message.forEach((entry) => {
                        Game.removeItem(entry);
                    });
                }
                else if (message instanceof Object) {
                    for (let entry in message) {
                        Game.removeItem(message[entry]);
                    }
                }
                else if (typeof message == "string") {
                    Game.removeItem(message);
                }
                break;
            }
            case "setCachedCell": {
                if (!message.hasOwnProperty("id")) {
                    break;
                }
                Game.setCachedCell(message["id"], message, Callback.create(String("entityLogicWorkerOnMessage-setCachedCell-").concat(Tools.genUUIDv4()), callbackID, null, Game.setCachedCellResponse));
                break;
            }
            case "setControllerEntity": {
                if (!(message instanceof Array)) {
                    message.forEach((entry) => {
                        if (EntityController.has(entry["controllerID"])) {
                            EntityController.get(entry["controllerID"]).setEntityID(entry["entityID"].id);
                        }
                    });
                }
                break;
            }
            case "setDialogue": {
                if (!message.hasOwnProperty("id")) {
                    break;
                }
                Game.setCachedDialogue(message["id"], message);
                Callback.run(callbackID, message);
                break;
            }
            case "setMoney": {
                if (Game.bUseGUI) {
                    Game.gui.chat.appendOutput(`${message["targetName"]} has had their money set to \$${message["amount"]}.`);
                }
                break;
            }
            case "unassignPlayer": {
                Game.unassignPlayer(Callback.create("unassignPlayerResponseCallback", callbackID, null, Game.unassignPlayerResponse));
                break;
            }
            case "unloadCell": {
                Game.unloadCell(false, Callback.create("unloadCellResponseCallback", callbackID, null, Game.unloadCellResponse));
                break;
            }
            case "updateEntity": {
                if (!message.hasOwnProperty("id")) {
                    break;
                }
                Game.setCachedEntity(message["id"], message);
                break;
            }
            case "updateInventory": {
                Game.gui.inventoryMenu.update();
                break;
            }
            default: {
                Callback.run(callbackID, message);
            }
        }
        return 0;
    }
    /**
     * 
     * @param {string} command 
     * @param {number} status 
     * @param {(Array<string>|object)} [message] 
     * @param {(string|undefined)} [callbackID] 
     * @param {(object|undefined)} [options] 
     */
    static entityLogicWorkerPostMessage(command, status = 0, message, callbackID = null, options = null) {
        let obj = {"cmd": command, "sta": status, "msg": message};
        if (callbackID) {
            obj["callbackID"] = callbackID;
        }
        if (options) {
            Game.entityLogicWorker.postMessage(obj, options);
        }
        else {
            Game.entityLogicWorker.postMessage(obj);
        }
        return 0;
    }

    static clearCache(includeBaseAssets = false, parentCallbackID = null) {
        for (let cellID in Game.cachedCells) {
            delete Game.cachedCells[cellID];
        }
        for (let entityID in Game.cachedEntities) {
            delete Game.cachedEntities[entityID];
        }
        for (let dialogueID in Game.cachedDialogues) {
            delete Game.cachedDialogues[dialogueID];
        }
        if (includeBaseAssets) {
            for (let i in Game.loadedMeshMaterials) {
                for (let j in Game.loadedMeshMaterials[i]) {
                    Game.removeMeshMaterial(i, j);
                }
            }
            for (let id in Game.loadedMeshes) {
                Game.removeMesh(id);
            }
            for (let id in Game.loadedMaterials) {
                Game.removeMaterial(id);
            }
            for (let id in Game.loadedTextures) {
                Game.removeTexture(id);
            }
            Game.loadDefaultAssets();
            Game.loadDefaultAssetsAfterObservable();
        }
        Callback.run(parentCallbackID);
        return 0;
    }
    static clearCacheResponse(blob, response, parentCallbackID) {
        if (Callback.has(parentCallbackID)) {
            parentCallbackID = Callback.get(parentCallbackID).parent;
        }
        Game.entityLogicWorkerPostMessage("clearCacheResponse", 0, null, parentCallbackID);
        return 0;
    }
    static purgeCache(parentCallbackID = null) {
        for (let cellID in Game.cachedCells) {
            if (cellID != Game.currentCellID) {
                delete Game.cachedCells[cellID];
            }
        }
        let entitySet = new Set();
        for (let controllerID in AbstractController.list()) {
            entitySet.add(AbstractController.get(controllerID).entityID);
        }
        for (let entityID in Game.cachedEntities) {
            if (!entitySet.has(entityID)) {
                delete Game.cachedEntities[entityID];
            }
        }
        for (let dialogueID in Game.cachedDialogues) {
            delete Game.cachedDialogues[dialogueID];
        }
        Callback.run(parentCallbackID, true);
        return 0;
    }
    static purgeCacheResponse(blob, response, parentCallbackID) {
        if (Callback.has(parentCallbackID)) {
            parentCallbackID = Callback.get(parentCallbackID).parent;
        }
        Game.entityLogicWorkerPostMessage("purgeCacheResponse", 0, null, parentCallbackID);
        return 0;
    }
    static getCachedCell(id) {
        if (Game.cachedCells.hasOwnProperty(id)) {
            return Game.cachedCells[id];
        }
        return 1;
    }
    static hasCachedCell(id) {
        return Game.cachedCells.hasOwnProperty(id);
    }
    static removeCachedCell(id) {
        delete Game.cachedCells[id];
        return 0;
    }
    static setCachedCell(cellID, object, parentCallbackID = null) {
        Game.cachedCells[cellID] = object;
        Callback.run(parentCallbackID, cellID);
        return 0;
    }
    static setCachedCellResponse(cellID, response, parentCallbackID = null) {
        if (Callback.has(parentCallbackID)) {
            parentCallbackID = Callback.get(parentCallbackID).parent;
        }
        Game.entityLogicWorkerPostMessage("setCachedCellResponse", 0, { "cellID": cellID }, parentCallbackID);
        return 0;
    }

    static getCachedDialogue(id) {
        if (Game.cachedDialogues.hasOwnProperty(id)) {
            return Game.cachedDialogues[id];
        }
        return 1;
    }
    static getCachedDialogue(id) {
        if (Game.cachedDialogues.hasOwnProperty(id)) {
            return Game.cachedDialogues[id];
        }
        return 1;
    }
    static hasCachedDialogue(id) {
        return Game.cachedDialogues.hasOwnProperty(id);
    }
    static removeCachedDialogue(id) {
        delete Game.cachedDialogues[id];
        return 0;
    }
    static setCachedDialogue(id, object) {
        Game.cachedDialogues[id] = object;
        return 0;
    }

    /**
     * 
     * @param {string} id 
     */
    static getCachedEntity(id) {
        if (Game.cachedEntities.hasOwnProperty(id)) {
            return Game.cachedEntities[id];
        }
        return 1;
    }
    static hasCachedEntity(id) {
        return Game.cachedEntities.hasOwnProperty(id);
    }
    static removeCachedEntity(id) {
        delete Game.cachedEntities[id];
        return 0;
    }
    static updateCachedEntity(id, object) {
        if (Game.debugMode) console.group(`Running Game.updateCachedEntity(${id}, ...)`);
        if (Game.debugMode) console.log(object);
        if (!Game.cachedEntities.hasOwnProperty(id)) {
            if (Game.debugMode) {
                console.info("entity ID doesn't already exist; aborting");
                console.groupEnd();
            }
            return Game.getEntity(id);
        }
        if (AbstractController.has(id)) {
            AbstractController.get(id).assign(object);
        }
        let containerLength = 0; // fug it, create this on every update, i'm too lazy to think rn :v
        if (Game.cachedEntities.hasOwnProperty(id)) {
            if (Game.cachedEntities[id].hasContainer) {
                containerLength = Game.cachedEntities[id]["container"]["size"];
            }
        }
        Object.assign(Game.cachedEntities[id], object);
        if (!Game.hasPlayerController()) {
            if (Game.debugMode) console.groupEnd();
            return 0;
        }
        if (Game.bUseGUI) {
            if (Game.playerController.hasTarget() && Game.playerController.target.id == id) {
                Game.gui.hud.targetPortrait.update();
            }
            else if (Game.gui.inventoryMenu.hasSelected() && Game.gui.inventoryMenu.selectedEntity.id == id) {
                Game.gui.inventoryMenu.updateSelected();
            }
            if (Game.gui.inventoryMenu.isVisible) {
                if (Game.cachedEntities[id].hasContainer) {
                    if (containerLength != Game.cachedEntities[id]["container"]["size"]) {
                        Game.gui.inventoryMenu.update();
                    }
                }
            }
            if (Game.gui.inventoryEquipmentMenu.isVisible) {
                Game.gui.inventoryEquipmentMenu.update();
            }
        }
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static setCachedEntity(id, object) {
        if (Game.debugMode) console.group(`Running Game.setCachedEntity(${id}, ...)`);
        if (Game.cachedEntities.hasOwnProperty(id)) {
            if (Game.debugMode) console.groupEnd();
            return Game.updateCachedEntity(id, object);
        }
        Game.cachedEntities[id] = object;
        let controller = EntityController.get(object.controller);
        if (controller == 1) {
            if (Game.debugMode) console.groupEnd();
            return 0;
        }
        controller.assign(object, false);
        if (Game.debugMode) console.groupEnd();
        return 0;
    }

    static getCell(cellID, parentCallbackID = null) {
        if (Game.debugMode) console.log(`Running Game.getCell(${cellID}, ${parentCallbackID})`);
        Game.entityLogicWorkerPostMessage("getCell", 0, { "cellID": cellID }, Callback.create(String("getCell-").concat(Tools.genUUIDv4()), parentCallbackID, [cellID], Game.getCellResponse));
        return 0;
    }
    static getCellResponse(cellID, response, parentCallbackID) {
        if (Game.debugMode) console.log(`Running Game.getCellResponse(${cellID}, ..., ${parentCallbackID})`);
        Game.setCachedCell(cellID, response);
        return 0;
    }
    static setDialogue(id = "", targetController = Game.playerController.getTarget(), actorController = Game.playerController, parentCallbackID = null) {
        id = Tools.filterID(id);
        targetController = Game.filterController(targetController);
        actorController = Game.filterController(actorController);
        let callbackID = String("setDialogue-").concat(Tools.genUUIDv4());
        Callback.create(callbackID, parentCallbackID, [id, targetController, actorController], Game.setDialoguePhaseTwo)
        Game.entityLogicWorkerPostMessage("setDialogue", 0, {"dialogueID": id, "targetID": targetController.id, "actorID": actorController.id}, callbackID);
        return 0;
    }
    static setDialoguePhaseTwo(id, targetController, actorController, response, parentCallbackID) {
        let json = JSON.parse(response)
        if (Game.bUseGUI) {
            Game.gui.dialogue.set(json);
        }
        return 0;
    }
    static getEntity(id, callbackID) {
        Game.entityLogicWorkerPostMessage("getEntity", 0, {"entityID":id}, callbackID);
        return 0;
    }

    static updateSkybox() {
        if (Game.skybox instanceof BABYLON.AbstractMesh && Game.skybox.material instanceof BABYLON.SkyMaterial) {
            Game.skybox.material.azimuth = (Game.currentTime - 21600) % 86400 / 86400;
            Game.skybox.material.luminance = (2 + Math.cos(4 * Math.PI * ((Game.currentTime - 21600) % 86400 / 86400))) / 5;
        }
        return 0;
    }
    static updateDebugCollisionList(target = Game.playerController) {
        return 0;
    }
    static rayDirectionToRadians(direction = Game.camera.getForwardRay().direction) {
        /*if (direction.x < 0 && direction.z < 0) {
            degree >= 0;
        }
        else if (direction.x < 0 && direction.z > 0) {
            degree >= 90
        }
        else if (direction.x > 0 && direction.z > 0) {
            degree >= 180
        }
        else if (direction.x > 0 && direction.z < 0) {
            degree >= 270
        }*/
         /*
        Uristqerty
        */
        return new BABYLON.Vector3(Math.acos(direction.y) + BABYLON.Tools.ToRadians(90), Math.atan2(direction.x, direction.z), 0);
    }
    static fireProjectileFrom(mesh = "arrow01", position = Game.playerController.targetRay.origin, rotation = Game.rayDirectionToRadians(), power = 10) {
        if (mesh instanceof BABYLON.AbstractMesh) {}
        else if (Game.hasMesh(mesh)) {
            mesh = Game.getMesh(mesh);
        }
        if (Game.debugMode) BABYLON.Tools.Log(`Running Game.fireProjectileFrom(${mesh.id}, ${position}, ${rotation}, ${power})`);
        let projectile = mesh.createInstance();
        return new Projectile(projectile, position, rotation, power);
    }
    static fireProjectileFromController(mesh = "arrow01", controller = Game.playerController, force = 10) {
        controller = Tools.filterClass(controller, EntityController, null);
        if (controller == null) {
            return 1;
        }
        return Game.fireProjectileFrom(mesh, controller.targetRay.origin, Game.rayDirectionToRadians(controller.targetRay.direction), force);
    }

    static playAnnoyingMeatyThwack() {
        setTimeout(function() {Game.playEnvironmentSoundEffect("hit", {"loop": true, "autoplay": true});}, 1169);
        setTimeout(function() {Game.playEnvironmentSoundEffect("hit", {"loop": true, "autoplay": true});}, 2420);
        setTimeout(function() {Game.playEnvironmentSoundEffect("hit", {"loop": true, "autoplay": true});}, 3666);
        return 0;
    }
    /**
     * 
     * @param {string} itemID item ID
     * @param {number} amount amount of items
     * @param {string} target Target entity ID
     */
    static addItem(itemID = "", amount = 1, target = Game.playerEntityID) {
        Game.entityLogicWorkerPostMessage("addItem", 200, {"target": target, "entityID": itemID, "amount": amount});
        return 0;
    }
    /**
     * 
     * @param {string} effectID effect ID
     * @param {number} amount stack of effect
     * @param {string} target Target entity ID
     */
    static addEffect(effectID = "", amount = 1, target = Game.playerEntityID) {
        
        return 0;
    }
}