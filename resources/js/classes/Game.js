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
        Game.assumeInitialized = false;
        Game.assumePlayerCellID = null;
        Game.initializedPhaseTwo = false;
        Game.initializedPhaseThree = false;
        Game.initializedPhaseFour = false;
        Game.initializedPhaseFive = false;
        Game.rootDirectory = "";
        Game.debugMode = false;
        Game.debugVerbosity = 2;
        Game.useNative = false;
        Game.useRigidBodies = true;
        Game.useControllerGroundRay = true;
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
        /**
         * Map of Video IDs to BABYLON.Sound; one to one
         * @type {<string, [BABYLON.Sound]>}
         */
        Game.soundCloneHeap = {};
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
         * Map of Meshes that are waiting to be created; one to many
         * @type {<string, <Objects...>>}
         */
        Game.backloggedMeshes = {};
        Game.backloggedTextures = {};
        Game.backloggedMaterials = {};
        Game.backloggedEntityStages = {};
        /**
         * Map of Furniture that are waiting to be created
         * @type {<string, <string:id, string:name, string:mesh, string:texture, string:type, string:position, string:rotation, string:scaling, object:options>}
         */
        Game.backloggedFurniture = {};
        /**
         * Map of Lighting that are waiting to be created;
         * it's basically the same as backloggedFurniture :v
         * @type {<string, <string:id, string:name, string:mesh, string:texture, string:type, string:position, string:rotation, string:scaling, object:options>}
         */
        Game.backloggedLighting = {};
        /**
         * Map of Displays that are waiting to be created;
         * it's basically the same as backloggedFurniture :v
         * @type {<string, <string:id, string:name, string:mesh, string:texture, string:video, string:position, string:rotation, string:scaling, object:options>}
         */
        Game.backloggedDisplays = {};
        /**
         * Map of Plants that are waiting to be created;
         * it's basically the same as backloggedFurniture :v
         * @type {<string, <string:id, string:name, string:mesh, string:texture, string:position, string:rotation, string:scaling, object:options>}
         */
        Game.backloggedPlants = {};
        /**
         * Map of Doors that are waiting to be created;
         * it's basically the same as backloggedFurniture :v
         * @type {<string, <string:id, string:name, Forgot:to, string:mesh, string:texture, string:position, string:rotation, string:scaling, object:options>}
         */
        Game.backloggedDoors = {};
        /**
         * Map of Characters that are waiting to be created;
         * it's basically the same as backloggedFurniture :v
         * @type {<string, <string:id, string:name, string:description, string:icon, Number:age, Number:sex, string:creatureType, string:creatureSubType, string:mesh, string:texture, string:options, string:rotation, string:scaling, object:options>}
         */
        Game.backloggedCharacters = {};
        Game.backloggedItems = {};
        Game.backloggedAttachments = {};

        Game.soundDumb = null;
        Game.soundMusic = null;
        Game.soundAmbience = null;
        Game.soundFXEnvironment = {};
        Game.soundFXCharacters = {};
        Game.soundMusicOptions = {"loop": true, "startDelay": 0, "volume": 1, "playbackRate": 1, "repeat": 0, "loopDelay": 0};
        Game.soundAmbienceOptions = {"loop": true, "startDelay": 0, "volume": 1, "playbackRate": 1, "repeat": 0, "loopDelay": 0};
        Game.soundFXEnvironmentOptions = {"loop": false, "startDelay": 0, "volume": 1, "playbackRate": 1, "repeat": 0, "loopDelay": 0};
        Game.soundFXCharactersOptions = {"loop": false, "startDelay": 0, "volume": 1, "playbackRate": 1, "repeat": 0, "loopDelay": 0};

        Game.meshToEntityController = {};

        Game.groupedCallbacks = [];
        Game.callbacks = {};

        Game.importingMeshProperties = true;
        Game.meshProperties = {};

        Game.functionsToRunBeforeRender = [];

        Game.playerEntityID = null;
        Game.playerController = null;
        Game.playerCellID = null;
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

        Game.gui = null;
        Game.tickWorker = null;
        Game.transformsWorker = null;
        Game.entityLogicWorker = null;
        Game.entityLogicTickChannel = null;
        Game.entityLogicTransformsChannel = null;

        if (options.hasOwnProperty("assumeInitialized")) {
            Game.assumeInitialized = options["assumeInitialized"] === true;
        }
        if (options.hasOwnProperty("assumePlayerCellID")) {
            Game.assumePlayerCellID = String(options["assumePlayerCellID"]);
        }
        if (options.hasOwnProperty("rootDirectory")) {
            Game.rootDirectory = String(options["rootDirectory"]);
        }
        if (options.hasOwnProperty("debugMode")) {
            Game.debugMode = options["debugMode"] === true;
        }
        if (options.hasOwnProperty("debugVerbosity")) {
            Game.debugVerbosity = Number.parseInt(options["debugVerbosity"]) || 2;
        }
        if (options.hasOwnProperty("useNative")) {
            Game.useNative = options["useNative"] === true;
        }
        if (options.hasOwnProperty("useRigidBodies")) {
            Game.useRigidBodies = options["useRigidBodies"] === true;
        }
        if (options.hasOwnProperty("useShadows")) {
            Game.useShadows = options["useShadows"] === true;
        }
        if (options.hasOwnProperty("showCollisionBoxes")) {
            Game.showCollisionBoxes = options["showCollisionBoxes"] === true;
        }
        if (options.hasOwnProperty("meatyThwack")) {
            Game._playSoundTest = true
        }
        Game.initializePhaseTwo();
    }
    static initializePhaseTwo() {
        if (Game.initializedPhaseTwo) {
            return 0;
        }
        BABYLON.Tools.Log("Initializing, Phase Two; loading lists of assets");
        Game.initializedPhaseTwo = true;
        Game.importMeshLocations("resources/js/meshLocations.json", Game.initializePhaseThree);
        Game.importMeshProperties("resources/js/meshProperties.json", Game.initializePhaseThree);
        Game.importTextureLocations("resources/js/textureLocations.json", Game.initializePhaseThree);
        Game.importIconLocations("resources/js/iconLocations.json", Game.initializePhaseThree);
        Game.importSoundLocations("resources/js/soundLocations.json", Game.initializePhaseThree);
        Game.importVideoLocations("resources/js/videoLocations.json", Game.initializePhaseThree);
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
            Game.initPhysics();
        }
        Game.scene.collisionsEnabled = true;
        Game.scene.workerCollisions = false;
        Game.ambientLight = new BABYLON.HemisphericLight("ambientLight", new BABYLON.Vector3(0, 1, 0), Game.scene);
        Game.ambientLightCeiling = new BABYLON.HemisphericLight("ambientLightCeiling", new BABYLON.Vector3(0, -1, 0), Game.scene);
        Game.ambientLightCeiling.intensity = 0.5;
        if (Game.useShadows) {
            Game.sunLight = new BABYLON.DirectionalLight("sunLight", new BABYLON.Vector3(-1, -1, -1), Game.scene);
            Game.sunLight.intensity = 1;
            Game.sunLight.shadowMinZ = -90 * 2;
            Game.sunLight.shadowMaxZ = 130 * 2;
            Game.shadowGenerator = new BABYLON.CascadedShadowGenerator(1024, Game.sunLight);
            Game.shadowGenerator.usePercentageCloserFiltering = true;
            Game.shadowGenerator.filteringQuality = BABYLON.ShadowGenerator.QUALITY_MEDIUM;
            Game.shadowGenerator.bias = 0.003;
            Game.shadowGenerator.autoCalcDepthBounds = false;
        }
        Game.skybox = new BABYLON.MeshBuilder.CreateBox("skybox", {"size":1024.0}, Game.scene);

        Game.loadDefaultTextures();
        if (!Game.useNative) Game.loadDefaultImages(); // Problem in BabylonNative
        Game.loadDefaultMaterials();
        Game.loadDefaultMeshes();
        if (!Game.useNative) Game.loadDefaultSounds(); // Problem in BabylonNative
        if (!Game.useNative) Game.loadDefaultVideos(); // Problem in BabylonNative
        Game.importDefaultMaterials();
        Game.importDefaultMeshes();

        Game.updateMenuKeyboardDisplayKeys();
        /**
         * @type {(GameGUI,NullGUI)} GameGUI; alternative is NullGUI
         */
        Game.gui = GameGUI;
        Game.gui.initialize(); // Problem in BabylonNative; see CreateFullscreenUI; can't use AdvancedDynamicTexture
        Game.initFreeCamera(false, false);
        Game.initPostProcessing();

        Game.initialized = true;
        Game.engine.runRenderLoop(Game._renderLoopFunction);
        Game.scene.registerBeforeRender(Game._beforeRenderFunction);
        Game.scene.registerAfterRender(Game._afterRenderFunction);
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
        Game.tickWorker = new Worker(Game.rootDirectory + "resources/js/workers/tick.worker.js");
        Game.tickWorker.onmessage = Game.tickWorkerOnMessage;
        Game.transformsWorker = new Worker(Game.rootDirectory + "resources/js/workers/transforms.worker.js");
        Game.transformsWorker.onmessage = Game.transformsWorkerOnMessage;
        Game.entityLogicWorker = new Worker(Game.rootDirectory + "resources/js/workers/entityLogicOffline.worker.js");
        Game.entityLogicWorker.onmessage = Game.entityLogicWorkerOnMessage;
        Game.entityLogicTickChannel = new MessageChannel();
        Game.tickWorker.postMessage({"cmd":"connectEntityLogic","sta":0,"msg":null}, [Game.entityLogicTickChannel.port1]);
        Game.entityLogicWorker.postMessage({"cmd":"connectTick","sta":0,"msg":null}, [Game.entityLogicTickChannel.port2]);
        Game.entityLogicTransformsChannel = new MessageChannel();
        Game.transformsWorker.postMessage({"cmd":"connectEntityLogic","sta":0,"msg":null}, [Game.entityLogicTransformsChannel.port1]);
        Game.entityLogicWorker.postMessage({"cmd":"connectTransforms","sta":0,"msg":null}, [Game.entityLogicTransformsChannel.port2]);
        Game.initializePhaseFive();
        return 0;
    }
    static initializePhaseFive() {
        if (Game.initializedPhaseFive) {
            return 0;
        }
        BABYLON.Tools.Log("Initializing, Phase Five; assuming direct control");
        Game.initializedPhaseFive = true;
        window.addEventListener("contextmenu", Game.controls.onContext);
        Game.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
            Game.controls.onKeyDown(evt.sourceEvent);
        }));
        Game.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
            Game.controls.onKeyUp(evt.sourceEvent);
        }));
        Game.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLongPressTrigger, function (evt) {
            Game.controls.onLongPress(evt.sourceEvent);
        }));
        Game.scene.onPointerObservable.add((e) => {
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
        });
        if (Game.assumeInitialized) {
            Game.setPlayerCell(Game.assumePlayerCellID);
            Game.createPlayer("player", "Player", "It you :v", "genericCharacterIcon", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FOX, SexEnum.MALE, 18, "foxM", "foxRed", new BABYLON.Vector3(3, 0, -17), undefined, undefined, {eyes:EyeEnum.CIRCLE, eyesColour:"green"});
            Game.gui.hideCharacterChoiceMenu(true);
            Game.gui.hideMenu(true);
        }
        else {
            Game.gui.showCharacterChoiceMenu();
        }
        Game.gui.resize();
        if (Game._playSoundTest) {
            Game.playAnnoyingMeatyThwack();
        }
        return 0;
    }
    static resize() {
        if (Game.useNative) {}
        else {
            Game.engine.resize();
            Game.renderWidth = Game.engine.getRenderWidth();
            Game.renderHeight = Game.engine.getRenderHeight();
        }
        Game.gui.resize();
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
    }
    static _beforeRenderFunction() {
        if (!Game.initialized) {
            return 1;
        }
        if (!(Game.hasPlayerEntity()) || !(Game.hasPlayerController())) {
            return 1;
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
    }
    static _afterRenderFunction() {
        if (!Game.initialized) {
            return 1;
        }
        Game.createBackloggedEntities();
        if (Game.gui != null && DebugGameGUI.isVisible) {
            Game.updateDebugCollisionList();
        }
    }

    static importScene(file, parentCallbackID = null) {
        let callback = null;
        if (Game.hasCallback(parentCallbackID)) {
            callback = Game.getCallback(parentCallbackID)["callback"];
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
    }
    static importMeshes(file = null, meshIDs = null, callbackID = null) {
        if (file == null) {
            return 1;
        }
        if (!meshIDs) {
            Game.createGroupedCallback(file, callbackID);
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
                        Game.runCallback(callbackID, meshes[i]);
                    }
                }
                if (!meshIDs) {
                    Game.runGroupedCallback(file);
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

    static initPhysics() {
        Game.physicsPlugin = new BABYLON.CannonJSPlugin();
        Game.scene.enablePhysics(Game.scene.gravity, Game.physicsPlugin);
    }
    static initFollowCamera(offset = BABYLON.Vector3.Zero()) {
        if (Game.camera instanceof BABYLON.Camera) {
            Game.camera.dispose();
        }
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
        Game.overwriteCameraTransforms();
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
        Game.initPostProcessing();
    }
    static initArcRotateCamera(offset = BABYLON.Vector3.Zero()) {
        if (Game.camera instanceof BABYLON.Camera) {
            Game.camera.dispose();
        }
        if (!(Game.playerController instanceof EntityController) || !(Game.playerController.getBoneByName("FOCUS") instanceof BABYLON.Bone)) {
            return 1;
        }
        Game.camera = new BABYLON.ArcRotateCamera(
            "camera",
            -Game.playerController.getMesh().rotation.y - 4.69,
            Math.PI / 2.5,
            3,
            Game.playerController.getBoneByName("FOCUS").getAbsolutePosition(Game.playerController.getMesh()),
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
        Game.overwriteCameraTransforms();
        if (Game.useNative) {}
        else {
            Game.camera.attachControl(Game.canvas, false);
        }

        Game.camera.minZ = Game.cameraMinDistance;
        Game.camera.lockedTarget = Game.playerController.focusMesh;
        if (Game.useCameraRay) {
            Game.cameraRay = new BABYLON.Ray(Game.cameraFocus.absolutePosition, BABYLON.Vector3.Forward());
        }
        Game.initPostProcessing();
    }
    static initFreeCamera(applyGravity = false, updateChild = false) {
        if (Game.debugMode) BABYLON.Tools.Log("Running initFreeCamera");
        if (Game.hasPlayerController() && updateChild) {
            Game.unassignPlayer(!updateChild);
        }
        if (Game.camera instanceof BABYLON.Camera) {
            Game.backupCameraTransforms();
            Game.camera.dispose();
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
        Game.initPostProcessing();
    }
    static overwriteCameraTransforms() {
        Game.camera.radius = Game.cameraRadius;
        Game.camera.alpha = Game.cameraAlpha;
        Game.camera.beta = Game.cameraBeta;
        return 0;
    }
    static backupCameraTransforms() {
        Game.cameraRadius = Game.camera.radius;
        Game.cameraAlpha = Game.camera.alpha;
        Game.cameraBeta = Game.camera.beta;
        return 0;
    }
    static updateMenuKeyboardDisplayKeys() {
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.updateMenuKeyboardDisplayKeys()");
        if (Game.initialized && Game.gui.initialized) {
            Game.gui.setActionTooltipLetter();
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
    static loadDefaultImages() {
        Game.loadSVG("missingTexture");
        Game.loadSVG("circularEye");
        Game.loadSVG("feralEye");
        Game.loadSVG("oblongEye");
        return 0;
    }
    static loadDefaultTextures() {
        Game.loadedTextures["default"] = new BABYLON.Texture(null, Game.scene);
        Game.loadTexture("missingTexture");
        return 0;
    }
    static loadDefaultMaterials() {
        Game.setLoadedMaterial("default", new BABYLON.StandardMaterial("default", Game.scene));
        if (Game.showCollisionBoxes) {
            Game.setLoadedMaterial("collisionMaterial", new BABYLON.StandardMaterial("collisionMaterial", Game.scene));
        }
        else {
            Game.setLoadedMaterial("collisionMaterial", new BABYLON.Material("collisionMaterial", Game.scene));
        }
        Game.setLoadedMaterial("missingMaterial", new BABYLON.StandardMaterial("missingMaterial", Game.scene));
        Game.setLoadedMaterial("loadingMaterial", new BABYLON.StandardMaterial("loadingMaterial", Game.scene));
        Game.setLoadedMaterial("missingMaterial", "missingTexture");
        Game.loadedMaterials["default"].specularColor.copyFrom(BABYLON.Color3.Black());
        Game.loadedMaterials["missingMaterial"].specularColor.copyFrom(BABYLON.Color3.Black());
        Game.loadedMaterials["loadingMaterial"].specularColor.copyFrom(BABYLON.Color3.Black());
        Game.loadedMaterials["loadingMaterial"].diffuseColor.copyFrom(new BABYLON.Color3(1, 0.85, 1));
        return 0;
    }
    static loadDefaultMeshes() {
        Game.setLoadedMesh("NONE", BABYLON.MeshBuilder.CreateBox("missingMesh", { height: 0.0125, width: 0.0125, depth: 0.0125 }, Game.scene));
        Game.setLoadedMesh("missingMesh", BABYLON.MeshBuilder.CreateBox("missingMesh", { height: 0.3, width: 0.3, depth: 0.3 }, Game.scene));
        Game.setLoadedMesh("loadingMesh", BABYLON.MeshBuilder.CreateSphere("loadingMesh", { diameter: 0.6 }, Game.scene));
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
    static loadSound(soundID = "") {
        soundID = Tools.filterID(soundID);
        if (soundID.length == 0) {
            return 2;
        }
        if (Game.hasLoadedSound(soundID)) {
            return 0;
        }
        else if (Game.hasAvailableSound(soundID)) {
            let loadedSound = new BABYLON.Sound(soundID, Game.soundLocations[soundID], Game.scene);
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
    static importVideoLocations(jsonFile = "resources/js/videoLocations.json", callback = null) {
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
            // TODO: commented out until VideoTexture.clone() returns a VideoTexture instead of a Texture
            /*let loadedVideo = new BABYLON.VideoTexture(videoID, Game.videoLocations[videoID], Game.scene);
            loadedVideo.name = videoID;
            Game.setLoadedVideo(videoID, loadedVideo);*/
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
    static loadMaterial(materialID = "", diffuseTextureID = "", bumpTextureID = "", options = {}) {
        materialID = Tools.filterID(materialID);
        if (materialID.length == 0) {
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
    static importMeshProperties(jsonFile = "resources/js/meshProperties.json", callback = null) {
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
    static importMeshLocations(jsonFile = "resources/js/meshLocations.json", callback = null) {
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
                Game.runCallback(callbackID, Game.getLoadedMesh(meshID));
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
                    return 1;
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
    static importSoundLocations(jsonFile = "resources/js/soundLocations.json", callback = null) {
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
        if (!Game.hasLoadedSound(soundID) && Game.hasAvailableSound(soundID)) {
            Game.loadSound(soundID);
        }
        if (!Game.hasLoadedSound(soundID)) {
            return 2;
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
    static importTextureLocations(jsonFile = "resources/js/textureLocations.json", callback = null) {
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
        if (!(mesh instanceof BABYLON.Mesh) || !(material instanceof BABYLON.Material)) {
            if (Game.hasLoadedMesh(mesh) && Game.hasLoadedMaterial(material)) {
                mesh = Game.getLoadedMesh(mesh);
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
    static importIconLocations(jsonFile = "resources/js/iconLocations.json", callback = null) {
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
    static filterVector3(...vector3) {
        if (vector3 == undefined) {
            return BABYLON.Vector3.Zero();
        }
        else if (vector3[0] instanceof BABYLON.Vector3) {
            return vector3[0];
        }
        else if (typeof vector3[0] == "object" && vector3[0].hasOwnProperty("x") && vector3[0].hasOwnProperty("y") && vector3[0].hasOwnProperty("z") && !isNaN(vector3[0].x) && !isNaN(vector3[0].y) && !isNaN(vector3[0].z)) {
            return new BABYLON.Vector3(vector3[0].x, vector3[0].y, vector3[0].z);
        }
        else if (!isNaN(vector3[0]) && !isNaN(vector3[1]) && !isNaN(vector3[2])) {
            return new BABYLON.Vector3(vector3[0], vector3[1], vector3[2]);
        }
        else if (vector3[0] instanceof Array && vector3[0].length == 3) {
            return new BABYLON.Vector3(vector3[0][0], vector3[0][1], vector3[0][2]);
        }
        else {
            return BABYLON.Vector3.Zero();
        }
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
    static filterMeshID(id) {
        id = Tools.filterID(id);
        if (!Game.hasLoadedMesh(id)) {
            if (Game.hasAvailableMesh(id)) {
                Game.loadMesh(id);
            }
            else {
                id = "missingMesh";
            }
        }
        return id;
    }
    static filterMaterialID(id) {
        id = Tools.filterID(id);
        if (!Game.hasLoadedMaterial(id)) {
            if (Game.hasAvailableTexture(id)) {
                if (!Game.hasLoadedTexture(id)) {
                    Game.loadTexture(id);
                }
                Game.loadMaterial(id, id);
            }
            else if (Game.hasLoadedTexture(id)) {
                Game.loadMaterial(id, id);
            }
            else {
                id = "missingMaterial";
            }
        }
        return id;
    }
    static filterIconID(id) {
        id = Tools.filterID(id);
        if (!Game.hasIcon(id)) {
            id = "missingIcon";
        }
        return id;
    }
    static filterSoundID(id) {
        id = Tools.filterID(id);
        if (!Game.hasLoadedSound(id)) {
            if (Game.hasAvailableSound(id)) {
                Game.loadSound(id);
            }
            else {
                id = "missingSound";
            }
        }
        return id;
    }
    static filterVideoID(id) {
        id = Tools.filterID(id);
        if (!Game.hasLoadedVideo(id)) {
            if (Game.hasAvailableVideo(id)) {
                Game.loadVideo(id);
            }
            else {
                id = "missingVideo";
            }
        }
        return id;
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
            return Game.loadJSONNative(file, onload, onerror, onfinal);
        }
        return Game.loadJSONBrowser(file, onload, onerror, onfinal);
    }
    static loadJSONNative(file, onload = null, onerror = null, onfinal = null) {
        if (Game.debugMode) BABYLON.Tools.Log("Running loadJSONNative");
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState === 4) {
                try {
                    xhr.onreadystatechange = null;
                    if (onload) {
                        onload(JSON.parse(xhr.responseText), onfinal);
                    }
                }
                catch (e) {
                    if (onerror) {
                        onerror();
                    }
                }
            }
        }, false);
        if (onerror) {
            xhr.onerror = onerror();
        }
        xhr.open("GET", String("file://").concat(Game.rootDirectory).concat(file), true);
        xhr.send();
        return 0;
    }
    static loadJSONBrowser(file, onload = null, onerror = null, onfinal = null) {
        if (Game.debugMode) BABYLON.Tools.Log("Running loadJSONBrowser");
        let xhr = new XMLHttpRequest();
        xhr.onload = (e) => {
            if (e.target.status == 200) {
                if (onload) {
                    onload(JSON.parse(xhr.responseText), onfinal);
                }
            }
        };
        xhr.onerror = (e) => {
            if (e.target.status == 404) {
                if (onerror) {
                    onerror(xhr);
                }
            }
        };
        xhr.open("GET", file, true);
        xhr.send();
        return 0;
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
            return Game.loadScriptNative(file, onload, onerror, onfinal);
        }
        return Game.loadScriptBrowser(file, onload, onerror, onfinal);
    }
    static loadScriptNative(file, onload = null, onerror = null, onfinal = null) {
        return 0;
    }
    static loadScriptBrowser(file, onload = null, onerror = null, onfinal = null) {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = file;
        if (typeof onload == "function") {
            script.onload = onload;
        }
        if (typeof onerror == "function") {
            script.onerror = onerror;
        }
        document.body.appendChild(script);
        if (typeof onfinal == "function") {
            onfinal();
        }
        return 0;
    }
    static importDefaultMaterials() {
        return Game.loadScript("resources/js/materials.js");
    }
    static importDefaultMeshes() {
        return Game.loadScript("resources/js/meshes.js");
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
        id = Tools.filterID(id, Tools.genUUIDv4());
        Game.filterMaterialID(materialID);
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
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = String("wall-").concat(Tools.genUUIDv4());
        }
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
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = String("plane-").concat(Tools.genUUIDv4());
        }
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
        return 0;
    }
    static createBackloggedBoundingCollisions() {
        if (Game.assignBoundingBoxCollisionQueue.size > 0) {
            Game.assignBoundingBoxCollisionQueue.forEach(function (meshID) {
                Game.assignBoundingBoxCollisionToMesh(meshID);
            });
        }
        return 0;
    }
    static removeInstancedMesh(abstractMesh) {
        return Game.removeMesh(abstractMesh);
    }
    static removeClonedMesh(abstractMesh) {
        return Game.removeMesh(abstractMesh);
    }
    static removeMesh(abstractMesh) {
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
        if (Game.debugMode) BABYLON.Tools.Log(`Running Game.removeMesh(${abstractMesh.id}`);
        if (abstractMesh == EditControls.pickedMesh) {
            EditControls.reset();
        }
        else if (abstractMesh == EditControls.previousPickedMesh) {
            EditControls.previousPickedMesh = null;
        }
        if (Game.collisionMeshes.hasOwnProperty(abstractMesh.id)) {
            delete Game.collisionMeshes[abstractMesh.id];
        }
        if (abstractMesh.skeleton instanceof BABYLON.Skeleton) {
            if (Game.clonedMeshes.hasOwnProperty(abstractMesh.id)) {
                delete Game.clonedMeshes[abstractMesh.id];
            }
            abstractMesh.dispose();
        }
        else if (Game.meshMaterialMeshes.hasOwnProperty(abstractMesh.name)) {
            if (Game.meshMaterialMeshes[abstractMesh.name].hasOwnProperty(abstractMesh.material.name)) {
                Game.removeMeshMaterialMeshes(abstractMesh.name, abstractMesh.material.name, abstractMesh.id);
            }
        }
        else {
            abstractMesh.dispose();
        }
        return 0;
    }
    static removeMeshMaterial(meshID, materialID) {
        if (Game.hasMeshMaterial(meshID, materialID)) {
            for (let childMeshID in Game.meshMaterialMeshes[meshID][materialID]) {
                Game.removeMeshMaterialMeshes(meshID, materialID, childMeshID);
            }
            Game.loadedMeshMaterials[meshID][materialID].dispose();
            delete Game.loadedMeshMaterials[meshID][materialID];
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
            Game.loadSound(soundID);
            return true;
        }
        return false;
    }
    static getSound(soundID) {
        if (Game.hasLoadedSound(soundID)) {
            return Game.loadedSounds[soundID];
        }
        else if (Game.hasAvailableSound(soundID)) {
            Game.loadSound(soundID);
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
    static playSound(soundID, options = {}, soundUUID = "") {
        if (!Game.hasSound(soundID)) {
            Game.loadedSounds["missingSound"].play()
            return 1;
        }
        if (!(Game.loadedSounds[soundID] instanceof BABYLON.Sound)) {
            return 2;
        }
        let sound = Game.loadedSounds[soundID];
        if (soundUUID.length > 0) {
            sound = sound.clone();
            Game.soundCloneHeap[soundUUID] = sound;
        }
        if (options.hasOwnProperty("loop")) {
            sound.loop = options["loop"] == true;
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
    static playEnvironmentSoundFX(soundID, options = Game.soundFXEnvironmentOptions, soundUUID = "") {
        //{"loop": true, "startDelay": 0, "volume": 1, "playbackRate": 1, "repeat": 0, "loopDelay": 0};
        if (soundUUID.size == 0) {
            soundUUID = Tools.genUUIDv4();
        }
        return Game.playSound(soundID, options, soundUUID);
    }
    static playCharacterSoundFX(soundID, options = Game.soundFXCharactersOptions, soundUUID = "") {
        if (soundUUID.size == 0) {
            soundUUID = Tools.genUUIDv4();
        }
        return Game.playSound(soundID, options);
    }
    static stopSound(soundID, soundChannel = SoundChannelEnum.NONE, soundUUID = "") {
        if (!Game.hasSound(soundID)) {
            return 2;
        }
        if (Game.loadedSounds[soundID] instanceof BABYLON.Sound) {
            if (Game.loadedSounds[soundID].isPlaying) {
                Game.loadedSounds[soundID].stop();
                Game.loadedSounds[soundID].isPlaying = false;
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
        if (options.hasOwnProperty("createClone")) {
            options["createClone"] = options["createClone"] == true;
        }
        else {
            options["createClone"] = false;
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
    static createBillboard(id = "", materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        id = Tools.filterID(id, Tools.genUUIDv4());
        let mesh = BABYLON.Mesh.CreatePlane(id, 1, Game.scene);
        mesh.id = id;
        mesh.name = name;
        Game.setLoadedMesh(id, mesh);
        mesh.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
        mesh = Game.createMesh(id, id, materialID, position, rotation, scaling, options);
        mesh.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
        mesh.material.backFaceCulling = false;
        if (options["billboardMode"]) {
            mesh.billboardMode = options["billboardMode"];
        }
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
     * @returns {BABYLON.AbstractMesh|array|number} The created mesh
     */
    static createMesh(id = "", meshID = "missingMesh", materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        if (Game.hasAvailableMesh(meshID) && !Game.hasLoadedMesh(meshID)) {
            Game.loadMesh(meshID);
        }
        if (typeof options != "object" || !options.hasOwnProperty("filtered")) {
            let filteredParameters = Game.filterCreateMesh(id, meshID, materialID, position, rotation, scaling, options);
            if (typeof filteredParameters == "number") {
                return 2;
            }
            [id, meshID, materialID, position, rotation, scaling] = filteredParameters;
        }
        if (Game.debugMode && Game.debugVerbosity > 3) console.group(`Running Game.createMesh(${id}, ${meshID}, ${materialID}, ${position.toString()})`);
        Game.filterMaterialID(materialID);
        /* I'll make a better way of doing this some day :v */
        switch (meshID) {
            case "cameraFocus": {
                options["createClone"] = true;
                break;
            }
            case "craftsmanStairs": {
                Game.createMesh(id + "-CollisionMesh", "stairsCollision", "collisionMaterial", position, rotation, scaling, { checkCollisions: true });
                options["checkCollisions"] = false;
                break;
            }
        }
        if (!Game.hasLoadedMesh(meshID)) {
            if (Game.debugMode && Game.debugVerbosity > 3) console.log(`Mesh ${meshID} exists and will be loaded`);
            Game.addBackloggedMesh(id, meshID, materialID, position, rotation, scaling, options);
            if (Game.debugMode && Game.debugVerbosity > 3) console.groupEnd();
            return [id, meshID, materialID, position, rotation, scaling, options];
        }
        if (Game.debugMode && Game.debugVerbosity > 3) console.log(`Mesh ${meshID} exists and is loaded`);
        let mesh = Game.getLoadedMesh(meshID);
        let material = Game.getLoadedMaterial(materialID);
        if (mesh.skeleton instanceof BABYLON.Skeleton) {
            let meshSkeleton = mesh.skeleton.clone(id);
            mesh = mesh.clone(id);
            mesh.makeGeometryUnique();
            mesh.id = id;
            mesh.material = material;
            mesh.name = meshID;
            mesh.skeleton = meshSkeleton;
            Game.addClonedMesh(mesh, id);
            Game.setMeshMaterial(mesh, material);
        }
        else {
            if (!Game.loadedMeshMaterials.hasOwnProperty(meshID)) {
                Game.loadedMeshMaterials[meshID] = {};
            }
            if (!Game.loadedMeshMaterials[meshID].hasOwnProperty(materialID)) {
                mesh = mesh.clone(meshID + materialID);
                mesh.makeGeometryUnique();
                mesh.id = id;
                mesh.material = material;
                mesh.name = meshID;
                if (Game.useShadows) {
                    mesh.receiveShadows = true;
                    Game.shadowGenerator.addShadowCaster(mesh);
                }
                if (Game.debugMode && Game.debugVerbosity > 3) console.log("Creating master clone of " + meshID + " with " + materialID);
                mesh.setEnabled(false);
                mesh.position.set(0, -4095, 0);
                Game.setMeshMaterial(mesh, material);
            }
            if (options["createClone"]) {
                if (Game.debugMode && Game.debugVerbosity > 3) console.log("Creating clone...");
                mesh = Game.loadedMeshMaterials[meshID][materialID].clone(id);
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
                if (Game.debugMode && Game.debugVerbosity > 3) console.log(`Creating instance of Mesh:(${meshID}), Material:(${materialID})...`);
                mesh = Game.loadedMeshMaterials[meshID][materialID].createInstance(id);
                mesh.id = id;
                mesh.name = meshID;
                Game.addInstancedMesh(mesh, id);
                Game.addMeshMaterialMeshes(mesh.name, material.name, mesh);
            }
        }
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
        if (Game.debugMode && Game.debugVerbosity > 3) console.groupEnd();
        return mesh;
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
    static createBackloggedEntities() {
        Game.createBackloggedMeshes();
        Game.createBackloggedBoundingCollisions();
        Game.createBackloggedItems();
        Game.createBackloggedFurniture();
        //Game.createBackloggedPlants();
        Game.createBackloggedLighting();
        Game.createBackloggedDisplays();
        Game.createBackloggedDoors();
        Game.createBackloggedCharacters();
        Game.createBackloggedAttachments();
        return 0;
    }
    static addBackloggedMesh(meshIndexID, meshID, materialID, position, rotation, scaling, options) {
        if (Game.hasBackloggedMesh(meshIndexID)) {
            return true;
        }
        Game.loadMesh(meshID);
        Game.backloggedMeshes[meshIndexID] = {
            0: meshIndexID,
            1: meshID,
            2: materialID,
            3: position,
            4: rotation,
            5: scaling,
            6: options
        };
        return true;
    }
    static removeBackloggedMesh(meshIndexID) {
        if (!Game.hasBackloggedMesh(meshIndexID)) {
            return true;
        }
        delete Game.backloggedMeshes[meshIndexID];
        return true;
    }
    static hasBackloggedMesh(meshIndexID) {
        if (!Game.initialized) {
            return false;
        }
        if (typeof Game.backloggedMeshes != "object") {
            return true;
        }
        return Object.keys(Game.backloggedMeshes).length > 0 && Game.backloggedMeshes.hasOwnProperty(meshIndexID);
    }
    static createBackloggedMeshes() {
        for (let i in Game.backloggedMeshes) {
            if (Game.loadedMeshes.hasOwnProperty(Game.backloggedMeshes[i][1])) {
                Game.createMesh(
                    Game.backloggedMeshes[i][0],
                    Game.backloggedMeshes[i][1],
                    Game.backloggedMeshes[i][2],
                    Game.backloggedMeshes[i][3],
                    Game.backloggedMeshes[i][4],
                    Game.backloggedMeshes[i][5],
                    Game.backloggedMeshes[i][6]
                );
                Game.removeBackloggedMesh(i);
            }
        }
    }

    /**
     * @module entityStages
     */
    /**
     * 
     * @memberof module:entityStages
     * @param {string} entityControllerID 
     * @param {number} stageIndex 
     */
    static addBackloggedEntityStage(entityControllerID, stageIndex) {
        if (Game.hasBackloggedEntityStage(entityControllerID, stageIndex)) {
            return true;
        }
        let meshID = "missingMesh";
        let materialID = "missingMaterial";
        if (EntityController.hasOwnProperty(entityControllerID)) {
            let controller = EntityController.get(entityControllerID);
            meshID = controller.getMeshStage(stageIndex);
            materialID = controller.getMaterialStage(stageIndex);
            Game.loadMesh(meshID);
            if (!Game.hasLoadedMaterial(materialID)) {
                Game.loadMaterial(materialID);
            }
        }
        else {
            return false;
        }
        if (!Game.backloggedEntityStages.hasOwnProperty(entityControllerID)) {
            Game.backloggedEntityStages[entityControllerID] = {};
        }
        Game.backloggedEntityStages[entityControllerID][stageIndex] = {
            0: meshID,
            1: materialID
        };
        return true;
    }
    /**
     * 
     * @param {string} entityControllerID 
     * @param {number} stageIndex 
     */
    static removeBackloggedEntityStage(entityControllerID, stageIndex = 0) {
        if (!Game.hasBackloggedEntityStage(entityControllerID, stageIndex)) {
            return true;
        }
        delete Game.backloggedEntityStages[entityControllerID][stageIndex][1];
        delete Game.backloggedEntityStages[entityControllerID][stageIndex][0];
        delete Game.backloggedEntityStages[entityControllerID][stageIndex];
        if (Object.keys(Game.backloggedEntityStages[entityControllerID]).length == 0) {
            delete Game.backloggedEntityStages[entityControllerID];
        }
        return true;
    }
    /**
     * 
     * @memberof module:entityStages
     * @param {string} entityControllerID 
     * @param {number} stageIndex 
     */
    static hasBackloggedEntityStage(entityControllerID, stageIndex = 0) {
        if (!Game.initialized) {
            return false;
        }
        if (typeof Game.backloggedEntityStages != "object") {
            return true;
        }
        return Object.keys(Game.backloggedEntityStages).length > 0 && Game.backloggedEntityStages.hasOwnProperty(entityControllerID) && Game.backloggedEntityStages[entityControllerID].hasOwnProperty(stageIndex);
    }
    /**
     * 
     * @memberof module:entityStages
     */
    static createBackloggedEntityStages() {
        for (let entityControllerID in Game.backloggedEntityStages) {
            if (EntityController.has(entityControllerID)) {
                let entityController = EntityController.get(entityControllerID);
                for (let stageIndex in Game.backloggedEntityStages[entityControllerID]) {
                    let entry = Game.backloggedEntityStages[entityControllerID][stageIndex];
                    if (Game.loadedMeshes.hasOwnProperty(entry[0])) {
                        entityController.setMeshStage(stageIndex);
                        Game.removeBackloggedEntityStage(entityControllerID, stageIndex);
                    }
                }
            }
        }
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
    static createFurnitureMesh(id = "", meshID = "missingMesh", materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = { createClone: false, checkCollisions: true }) {
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.createFurnitureMesh");
        let instancedMesh = Game.createMesh(id, meshID, materialID, position, rotation, scaling, options);
        if (!(instancedMesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        return instancedMesh;
    }
    /**
     * 
     * @memberof module:furniture
     * @param {string} instanceID 
     * @param {string} entityID 
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} rotation 
     * @param {BABYLON.Vector3} scaling 
     * @param {object} options 
     */
    static addBackloggedFurniture(instanceID, entityID = "", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        if (Game.hasBackloggedFurniture(instanceID)) {
            return true;
        }
        if (!Game.hasCachedEntity(entityID)) {
            Game.getEntity(entityID);
        }
        Game.backloggedFurniture[instanceID] = [
            instanceID,
            entityID,
            position,
            rotation,
            scaling,
            options
        ];
        return true;
    }
    /**
     * 
     * @memberof module:furniture
     * @param {string} furnitureInstanceID 
     */
    static removeBackloggedFurniture(furnitureInstanceID) {
        if (!Game.hasBackloggedFurniture(furnitureInstanceID)) {
            return true;
        }
        delete Game.backloggedFurniture[furnitureInstanceID];
        return true;
    }
    /**
     * 
     * @memberof module:furniture
     * @param {string} furnitureInstanceID 
     */
    static hasBackloggedFurniture(furnitureInstanceID) {
        if (!Game.initialized) {
            return false;
        }
        if (typeof Game.backloggedFurniture != "object") {
            return true;
        }
        return Object.keys(Game.backloggedFurniture).length > 0 && Game.backloggedFurniture.hasOwnProperty(furnitureInstanceID);
    }
    /**
     * 
     * @memberof module:furniture
     */
    static createBackloggedFurniture() {
        for (let i in Game.backloggedFurniture) {
            let cachedEntity = Game.getCachedEntity(Game.backloggedLighting[i][1]);
            if (cachedEntity == 1) {
                continue;
            }
            if (Game.hasLoadedMesh(cachedEntity["meshID"])) {
                Game.createFurnitureInstance(...Game.backloggedFurniture[i]);
                Game.removeBackloggedFurniture(i);
            }
        }
    }
    /**
     * Creates a FurnitureController, FurnitureEntity, and BABYLON.InstancedMesh
     * @memberof module:furniture
     * @param  {string} [instanceID] Unique ID, auto-generated if none given
     * @param  {string} entityID Furniture ID
     * @param  {BABYLON.Vector3} position Position
     * @param  {BABYLON.Vector3} [rotation] Rotation
     * @param  {BABYLON.Vector3} [scaling] Scaling
     * @param  {object} [options] Options
     * @returns {(FurnitureController|number)} A FurnitureController or an integer status code
     */
    static createFurnitureInstance(instanceID = "", entityID = "", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}, parentCallbackID) {
        instanceID = Tools.filterID(instanceID, Tools.genUUIDv4());
        position = Game.filterVector3(position);
        rotation = Game.filterVector3(rotation);
        scaling = Game.filterVector3(scaling);
        if (Game.hasCachedEntity(entityID)) {
            Game.createFurnitureInstanceResponsePhaseOne(instanceID, entityID, position, rotation, scaling, options, Game.getCachedEntity(entityID));
        }
        else {
            let callbackID = Tools.genUUIDv4();
            Game.createCallback(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options], Game.createFurnitureInstanceResponsePhaseOne);
            Game.getEntity(entityID, callbackID);
        }
        return  0;
    }
    static createFurnitureInstanceResponsePhaseOne(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options], Game.createFurnitureInstanceResponsePhaseTwo);
        Game.entityLogicWorkerPostMessage("createFurnitureInstance", 0, {"instanceID": instanceID, "entityID": entityID}, callbackID);
        return 0;
    }
    static createFurnitureInstanceResponsePhaseTwo(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        let entity = Object.assign({}, Game.getCachedEntity(entityID));
        if (!(Game.hasLoadedMesh(entity.meshID))) {
            let callbackID = Tools.genUUIDv4();
            Game.createCallback(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options, response], Game.createFurnitureInstanceResponsePhaseTwo);
            Game.loadMesh(entity.meshID, callbackID);
            Game.loadTexture(entity.textureID);
            Game.loadMaterial(entity.textureID);
            return 1;
        }
        let loadedMesh = Game.createMesh(instanceID, entity.meshID, entity.textureID, position, rotation, scaling, options);
        loadedMesh.checkCollisions = true;
        let controller = new FurnitureController(instanceID, loadedMesh, Object.assign(entity, response));
        controller.updateTransforms();
        if (options.hasOwnProperty("compoundController")) {
            controller.setCompoundController(options["compoundController"]);
        }
        return 0;
    }
    /**
     * Removes a FurnitureEntity, its FurnitureController, and its BABYLON.InstancedMesh
     * @memberof module:furniture
     * @param {(FurnitureController|string)} furnitureController A FurnitureController, or its string ID
     * @returns {number} Integer status code
     */
    static removeFurniture(furnitureController) {
        if (!(furnitureController instanceof FurnitureController)) {
            if (FurnitureController.has(furnitureController)) {
                furnitureController = FurnitureController.get(furnitureController);
            }
            else {
                return 2;
            }
        }
        furnitureController.dispose();
        return 0;
    }

    /**
     * @module doors
     * @memberof module:furniture
     */
    /**
     * 
     * @memberof module:doors
     */
    static addBackloggedDoor(id, name = "", to = "", meshID = "missingMesh", textureID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        if (Game.hasBackloggedDoors(id)) {
            return true;
        }
        Game.loadMesh(meshID);
        Game.backloggedDoors[id] = [
            id,
            name,
            to,
            meshID,
            textureID,
            position,
            rotation,
            scaling,
            options
        ];
        return true;
    }
    /**
     * 
     * @memberof module:doors
     */
    static removeBackloggedDoor(id) {
        if (!Game.hasBackloggedDoors(id)) {
            return true;
        }
        delete Game.backloggedDoors[id];
        return true;
    }
    /**
     * 
     * @memberof module:doors
     */
    static hasBackloggedDoors(id) {
        if (!Game.initialized) {
            return false;
        }
        if (typeof Game.backloggedDoors != "object") {
            return true;
        }
        return Object.keys(Game.backloggedDoors).length > 0 && Game.backloggedDoors.hasOwnProperty(id);
    }
    /**
     * 
     * @memberof module:doors
     */
    static createBackloggedDoors() {
        for (let i in Game.backloggedDoors) {
            if (Game.loadedMeshes.hasOwnProperty(Game.backloggedDoors[i][3])) {
                Game.createDoor(...Game.backloggedDoors[i]);
                Game.removeBackloggedDoor(i);
            }
        }
    }
    /**
     * Creates a DoorController, DoorEntity, and BABYLON.InstancedMesh
     * @memberof module:doors
     * @param  {string} [id] Unique ID, auto-generated if none given
     * @param  {string} [name] Name
     * @param  {object} [teleportMarker] Future movement between cells
     * @param  {string} [meshID] Mesh ID
     * @param  {string} [materialID] Texture ID
     * @param  {BABYLON.Vector3} position Position
     * @param  {BABYLON.Vector3} [rotation] Rotation
     * @param  {BABYLON.Vector3} [scaling] Scaling
     * @param  {object} [options] Options
     * @param  {(string|null)} [parentCallbackID]
     * @returns {number} Integer status code
     */
    static createDoor(id = "", name = "Door", teleportMarker = null, meshID = "door", materialID = "plainDoor", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = { "locked": false, "key": null, "opensInward": false, "open": false, "checkCollisions": true }, parentCallbackID = null) {
        position = Game.filterVector3(position);
        rotation = Game.filterVector3(rotation);
        scaling = Game.filterVector3(scaling);
        if (teleportMarker instanceof Object && teleportMarker.hasOwnProperty("id")) {
            teleportMarker = teleportMarker.id;
        }
        if (!(Game.hasLoadedMesh(meshID))) {
            let callbackID = Tools.genUUIDv4();
            Game.createCallback(callbackID, parentCallbackID, [id, name, teleportMarker, meshID, materialID, position, rotation, scaling, options], Game.createDoorResponsePhaseOne);
            Game.loadMesh(meshID, callbackID);
        }
        else {
            Game.createDoorResponsePhaseOne(id, name, teleportMarker, meshID, materialID, position, rotation, scaling, options);
        }
        return 0;
    }
    static createDoorResponsePhaseOne(id, name, teleportMarker, meshID, materialID, position, rotation, scaling, options, response, parentCallbackID) {
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [id, name, teleportMarker, meshID, materialID, position, rotation, scaling, options], Game.createDoorResponsePhaseTwo);
        Game.entityLogicWorkerPostMessage("createDoorEntity", 0, {
            "id": id,
            "name": name,
            "description": null,
            "iconID": "missingIcon",
            "meshID": meshID,
            "materialID": materialID,
            "locked": options["locked"] == true,
            "key": options["key"],
            "opensInward": options["opensInward"] == true,
            "open": options["open"] == true,
            "teleportMarker": teleportMarker,
            "position": position,
            "rotation": rotation
        }, callbackID);
        return 0;
    }
    static createDoorResponsePhaseTwo(id, name, teleportMarker, meshID, materialID, position, rotation, scaling, options, response, callbackID) {
        let radius = Game.getMesh(meshID).getBoundingInfo().boundingBox.extendSize.x * scaling.x;
        let xPosition = radius * (Math.cos(rotation.y * Math.PI / 180) | 0);
        let yPosition = radius * (Math.sin(rotation.y * Math.PI / 180) | 0);
        let loadedMesh = Game.createMesh(id, meshID, materialID, position.add(new BABYLON.Vector3(xPosition, 0, -yPosition)), rotation, scaling, options);
        let controller = new DoorController(id, loadedMesh, response);
        controller.updateTransforms();
        if (options.hasOwnProperty("compoundController")) {
            controller.setCompoundController(options["compoundController"]);
        }
        return 0;
    }
    /**
     * Removes a DoorEntity, its DoorController, and its BABYLON.InstancedMesh
     * @memberof module:doors
     * @param {(DoorController|string)} doorController A DoorController, or its string ID
     * @returns {number} Integer status code
     */
    static removeDoor(doorController) {
        if (!(doorController instanceof DoorController)) {
            if (DoorController.has(doorController)) {
                doorController = Entity.getController(doorController);
            }
            else {
                return 2;
            }
        }
        doorController.dispose();
        return 0;
    }

    /**
     * @module displays
     * @memberof module:furniture
     */
    /**
     * 
     * @memberof module:displays
     */
    static addBackloggedDisplay(displayIndexID, name = "", meshID = "missingMesh", materialID = "missingMaterial", videoID = "missingVideo", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = { checkCollisions: true, videoMeshWidth: 0, videoMeshHeight: 0, videoMeshPosition: BABYLON.Vector3.Zero() }) {
        if (Game.hasBackloggedDisplay(displayIndexID)) {
            return true;
        }
        Game.loadMesh(meshID);
        Game.backloggedDisplays[displayIndexID] = {
            0: displayIndexID,
            1: name,
            2: meshID,
            3: materialID,
            4: videoID,
            5: position,
            6: rotation,
            7: scaling,
            8: options
        };
        return true;
    }
    /**
     * 
     * @memberof module:displays
     */
    static removeBackloggedDisplay(displayIndexID) {
        if (!Game.hasBackloggedDisplay(displayIndexID)) {
            return true;
        }
        delete Game.backloggedDisplays[displayIndexID];
        return true;
    }
    /**
     * 
     * @memberof module:displays
     */
    static hasBackloggedDisplay(displayIndexID) {
        if (!Game.initialized) {
            return false;
        }
        if (typeof Game.backloggedDisplays != "object") {
            return true;
        }
        return Object.keys(Game.backloggedDisplays).length > 0 && Game.backloggedDisplays.hasOwnProperty(displayIndexID);
    }
    /**
     * 
     * @memberof module:displays
     */
    static createBackloggedDisplays() {
        for (let i in Game.backloggedDisplays) {
            if (Game.loadedMeshes.hasOwnProperty(Game.backloggedDisplays[i][2])) {
                Game.createDisplay(...Game.backloggedDisplays[i]);
                Game.removeBackloggedDisplay(i);
            }
        }
    }
    /**
     * 
     * @memberof module:displays
     * @param {string} id 
     * @param {string} name 
     * @param {string} meshID 
     * @param {string} [materialID] 
     * @param {string} [videoID] 
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} [rotation] 
     * @param {BABYLON.Vector3} [scaling] 
     * @param {object} [options] 
     * @returns {DisplayController}
     */
    static createDisplay(id = "", name = "", meshID, materialID = "missingMaterial", videoID = "missingVideo", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = { createClone: true, checkCollisions: true, videoMeshWidth: 1, videoMeshHeight: 0.75, videoMeshPosition: BABYLON.Vector3.Zero() }) {
        if (!(Game.hasLoadedMesh(meshID))) {
            Game.loadMesh(meshID);
            Game.addBackloggedDisplay(id, name, meshID, materialID, videoID, position, rotation, scaling, options);
            return [id, name, meshID, materialID, videoID, position, rotation, scaling, options];
        }
        let loadedMesh = Game.createMesh(id, meshID, materialID, position, rotation, scaling, options);
        let entity = new DisplayEntity(id, name, undefined, undefined);
        let controller = new DisplayController(id, loadedMesh, entity, videoID, options["videoMeshWidth"], options["videoMeshHeight"], options["videoMeshPosition"]);
        controller.updateTransforms();
        if (options.hasOwnProperty("compoundController")) {
            controller.setCompoundController(options["compoundController"]);
        }
        return controller;
    }
    /**
     * 
     * @memberof module:displays
     * @param {DisplayController} displayController 
     * @returns {number} Integer status code
     */
    static removeDisplay(displayController) {
        if (!(displayController instanceof DisplayController)) {
            if (DisplayController.has(displayController)) {
                displayController = DisplayController.get(displayController);
            }
            else {
                return 2;
            }
        }
        displayController.dispose();
        return 0;
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
     * 
     * @memberof module:lighting
     */
    static addBackloggedLighting(instanceID, entityID, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = { checkCollisions: true, lightPositionOffset: BABYLON.Vector3.Zero() }) {
        if (Game.hasBackloggedLighting(instanceID)) {
            return true;
        }
        Game.loadMesh(meshID);
        Game.backloggedLighting[instanceID] = [
            instanceID,
            entityID,
            position,
            rotation,
            scaling,
            options
        ];
        return true;
    }
    /**
     * 
     * @memberof module:lighting
     */
    static removeBackloggedLighting(instanceID) {
        if (!Game.hasBackloggedLighting(instanceID)) {
            return true;
        }
        delete Game.backloggedLighting[instanceID];
        return true;
    }
    /**
     * 
     * @memberof module:lighting
     */
    static hasBackloggedLighting(instanceID) {
        if (!Game.initialized) {
            return false;
        }
        if (typeof Game.backloggedLighting != "object") {
            return true;
        }
        return Object.keys(Game.backloggedLighting).length > 0 && Game.backloggedLighting.hasOwnProperty(instanceID);
    }
    /**
     * 
     * @memberof module:lighting
     */
    static createBackloggedLighting() {
        for (let i in Game.backloggedLighting) {
            let cachedEntity = Game.getCachedEntity(Game.backloggedLighting[i][1]);
            if (cachedEntity == 1) {
                continue;
            }
            if (Game.hasLoadedMesh(cachedEntity["meshID"])) {
                Game.createLightingInstance(...Game.backloggedLighting[i]);
                Game.removeBackloggedLighting(i);
            }
        }
    }
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
    static createLightingInstance(instanceID = "", entityID = "", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}, parentCallbackID) {
        instanceID = Tools.filterID(instanceID, Tools.genUUIDv4());
        position = Game.filterVector3(position);
        rotation = Game.filterVector3(rotation);
        scaling = Game.filterVector3(scaling);
        if (Game.hasCachedEntity(entityID)) {
            Game.createLightingInstanceResponsePhaseOne(instanceID, entityID, position, rotation, scaling, options, Game.getCachedEntity(entityID));
        }
        else {
            let callbackID = Tools.genUUIDv4();
            Game.createCallback(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options], Game.createLightingInstanceResponsePhaseOne);
            Game.getEntity(entityID, callbackID);
        }
        return  0;
    }
    static createLightingInstanceResponsePhaseOne(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options], Game.createLightingInstanceResponsePhaseTwo);
        Game.entityLogicWorkerPostMessage("createLightingInstance", 0, {"instanceID": instanceID, "entityID": entityID}, callbackID);
        return 0;
    }
    static createLightingInstanceResponsePhaseTwo(instanceID, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        let entity = Object.assign({}, Game.getCachedEntity(entityID));
        if (!(Game.hasLoadedMesh(entity.meshID))) {
            let callbackID = Tools.genUUIDv4();
            Game.createCallback(callbackID, parentCallbackID, [instanceID, entityID, position, rotation, scaling, options, response], Game.createLightingInstanceResponsePhaseTwo);
            Game.loadMesh(entity.meshID, callbackID);
            Game.loadTexture(entity.textureID);
            Game.loadMaterial(entity.textureID);
            return 1;
        }
        let loadedMesh = Game.createFurnitureMesh(instanceID, entity.meshID, entity.textureID, position, rotation, scaling, options);
        loadedMesh.checkCollisions = true;
        let controller = new LightingController(instanceID, loadedMesh, Object.assign(entity, response));
        controller.updateTransforms();
        if (options.hasOwnProperty("compoundController")) {
            controller.setCompoundController(options["compoundController"]);
        }
        return 0;
    }
    /**
     * Removes a LightingEntity, its LightingController, and its BABYLON.InstancedMesh
     * @memberof module:lighting
     * @param {(LightingController|string)} lightingController A LightingController, or its string ID
     * @returns {number} Integer status code
     */
    static removeLightingInstance(lightingController) {
        if (!(lightingController instanceof LightingController)) {
            if (LightingController.has(lightingController)) {
                lightingController = LightingController.get(lightingController);
            }
            else {
                return 2;
            }
        }
        lightingController.dispose();
        return 0;
    }

    
    /**
     * @module plants
     */
    /**
     * 
     * @memberof module:plants
     * @param {string} plantID 
     * @param {string} meshID 
     * @param {string} materialID 
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} rotation 
     * @param {BABYLON.Vector3} scaling 
     * @param {object} options 
     */
    static createPlantMesh(plantID = undefined, meshID = "missingMesh", materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = { createClone: false, checkCollisions: true }) {
        if (Game.debugMode) BABYLON.Tools.Log("Running Game.createPlantMesh");
        let instancedMesh = Game.createMesh(plantID, meshID, materialID, position, rotation, scaling, options);
        if (!(instancedMesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        return instancedMesh;
    }
    /**
     * 
     * @memberof module:plants
     */
    static addBackloggedPlant(plantIndexID, plantEntity = null, stage, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        if (Game.hasBackloggedPlants(plantIndexID)) {
            return true;
        }
        if (Game.debugMode) console.group(`Running Game.addBackloggedPlant(${plantIndexID}, ${plantEntity.id}, ${stage}, ${position.toString()})`)
        Game.loadMesh(plantEntity.meshID);
        Game.backloggedPlants[plantIndexID] = {
            0: plantIndexID,
            1: plantEntity,
            2: stage,
            3: position,
            4: rotation,
            5: scaling,
            6: options
        };
        if (Game.debugMode) console.groupEnd();
        return true;
    }
    /**
     * 
     * @memberof module:plants
     */
    static removeBackloggedPlant(plantIndexID) {
        if (!Game.hasBackloggedPlants(plantIndexID)) {
            return true;
        }
        delete Game.backloggedPlants[plantIndexID];
        return true;
    }
    /**
     * 
     * @memberof module:plants
     */
    static hasBackloggedPlants(plantIndexID) {
        if (!Game.initialized) {
            return false;
        }
        if (typeof Game.backloggedPlants != "object") {
            return true;
        }
        return Object.keys(Game.backloggedPlants).length > 0 && Game.backloggedPlants.hasOwnProperty(plantIndexID);
    }
    /**
     * 
     * @memberof module:plants
     */
    static createBackloggedPlants() {
        if (Game.debugMode) console.group(`Running Game.createBackloggedPlants for ${Object.keys(Game.backloggedPlants).length} plants.`)
        for (let i in Game.backloggedPlants) {
            if (Game.loadedMeshes.hasOwnProperty(Game.backloggedPlants[i][1].meshID)) {
                if (Game.debugMode) console.log(`Creating ${i}`);
                Game.createPlantInstance(
                    Game.backloggedPlants[i][0],
                    Game.backloggedPlants[i][1],
                    Game.backloggedPlants[i][2],
                    Game.backloggedPlants[i][3],
                    Game.backloggedPlants[i][4],
                    Game.backloggedPlants[i][5],
                    Game.backloggedPlants[i][6]
                );
                Game.removeBackloggedPlant(i);
            }
        }
        if (Game.debugMode) console.groupEnd();
    }
    /**
     * Removes a PlantEntity, its PlantController, and its BABYLON.InstancedMesh
     * @memberof module:plants
     * @param {(PlantController|string)} plantController A PlantController, or its string ID
     * @returns {number} Integer status code
     */
    static removePlant(plantController) {
        if (!(plantController instanceof PlantController)) {
            if (PlantController.has(plantController)) {
                plantController = PlantController.get(plantController);
            }
            else {
                return 2;
            }
        }
        plantController.dispose();
        return 0;
    }
    /**
     * 
     * @memberof module:plants
     * @param {string} id 
     * @param {string} plantEntityID 
     * @param {number} stage 
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} [rotation] 
     * @param {BABYLON.Vector3} [scaling] 
     * @param {*} [options] 
     * @returns PlantController
     * @example Game.createPlantInstance("wheatInstance999", "wheat", 0, Game.playerController.getPosition())
     */
    static createPlantInstance(id, plantEntityID, stage, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}, parentCallbackID = null) {
        if (Game.debugMode) console.group(`Running Game.createPlantInstance(${id}, ${plantEntityID}, ${stage}, ${position.toString()}, ROTATION, SCALING, OPTIONS, RESPONSE, ${parentCallbackID})`);
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [id, plantEntityID, stage, position, rotation, scaling, options], Game.createPlantInstanceResponse);
        Game.entityLogicWorkerPostMessage("createPlantInstance", 0, [id, plantEntityID, stage, position, rotation, scaling, options]);
        return 0;
    }
    static createPlantInstanceResponse(id, plantEntityID, stage, position, rotation, scaling, options, response, parentCallbackID = null) {
        Game.setHasRunCallback(callbackID, true);
        if (Game.debugMode) console.group(`Running Game.createPlantInstanceResponse(${id}, ${plantEntityID}, ${stage}, ${position.toString()}, ROTATION, SCALING, OPTIONS, RESPONSE, ${parentCallbackID})`);
        if (!(Game.hasLoadedMesh(plantEntityID.meshID))) {
            Game.loadMesh(plantEntityID.meshID);
            if (Game.debugMode) console.info("Plant mesh isn't loaded yet");
            Game.addBackloggedPlant(id, plantEntityID, stage, position, rotation, scaling, options);
            if (Game.debugMode) console.groupEnd();
            return [id, plantEntityID, stage, position, rotation, scaling, options];
        }
        let loadedMesh = Game.createPlantMesh(response.id, response.meshID, response.materialID, position, rotation, scaling, options);
        let controller = new PlantController(response.id, loadedMesh, response);
        controller.updateTransforms();
        if (options.hasOwnProperty("compoundController")) {
            controller.setCompoundController(options["compoundController"]);
        }
        if (Game.debugMode) console.groupEnd();
        return controller;
    }

    /**
     * @module cosmetics
     */
    /**
     * @memberof module:cosmetics
     */
    static addBackloggedAttachment(attachmentIndexID, attachToController, meshID, materialID, bone, position, rotation, scaling, options) {
        if (!Game.hasMesh(meshID)) {
            return false;
        }
        if (Game.hasBackloggedAttachment(attachmentIndexID)) {
            return true;
        }
        Game.loadMesh(meshID);
        Game.backloggedAttachments[attachmentIndexID] = {
            0: attachmentIndexID,
            1: attachToController,
            2: meshID,
            3: materialID,
            4: bone,
            5: position,
            6: rotation,
            7: scaling,
            8: options
        };
        return true;
    }
    /**
     * @memberof module:cosmetics
     */
    static removeBackloggedAttachment(attachmentIndexID) {
        if (!Game.hasBackloggedAttachment(attachmentIndexID)) {
            return true;
        }
        delete Game.backloggedAttachments[attachmentIndexID];
        return true;
    }
    /**
     * @memberof module:cosmetics
     */
    static hasBackloggedAttachment(attachmentIndexID) {
        if (!Game.initialized) {
            return false;
        }
        return Object.keys(Game.backloggedAttachments).length > 0 && Game.backloggedAttachments.hasOwnProperty(attachmentIndexID);
    }
    /**
     * @memberof module:cosmetics
     */
    static createBackloggedAttachments() {
        for (let i in Game.backloggedAttachments) {
            if (Game.loadedMeshes.hasOwnProperty(Game.backloggedAttachments[i][2])) {
                if (Game.backloggedAttachments[i][1] instanceof CharacterController) {
                    Game.backloggedAttachments[i][1].attachMeshIDToBone(
                        Game.backloggedAttachments[i][2],
                        Game.backloggedAttachments[i][3],
                        Game.backloggedAttachments[i][4],
                        Game.backloggedAttachments[i][5],
                        Game.backloggedAttachments[i][6],
                        Game.backloggedAttachments[i][7],
                        Game.backloggedAttachments[i][8]
                    );
                }
                Game.removeBackloggedAttachment(i);
            }
        }
    }

    /**
     * @module items
     */
    /**
     * 
     * @memberof module:items
     * @param {string} itemID 
     * @param {string} meshID 
     * @param {string} materialID 
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} rotation 
     * @param {BABYLON.Vector3} scaling 
     * @param {object} options 
     */
    static createItemMesh(itemID = undefined, meshID = "missingMesh", materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = { createClone: false }) {
        if (Game.debugMode) console.group(`Running Game.createItemMesh(${itemID}, ${meshID}, ${materialID}, ${position.toString()})`);
        let instancedMesh = Game.createMesh(itemID, meshID, materialID, position, rotation, scaling, options);
        if (!(instancedMesh instanceof BABYLON.AbstractMesh)) {
            if (Game.debugMode) {
                console.error("Failed to create a mesh.");
                console.groupEnd();
            }
            return 2;
        }
        if (Game.debugMode) console.groupEnd();
        return instancedMesh;
    }

    /**
     * 
     * @memberof module:items
     */
    static addBackloggedItem(itemIndexID, itemID = "", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        if (Game.hasBackloggedItem(itemIndexID)) {
            return true;
        }
        if (!Game.hasCachedEntity(itemID)) {
            Game.getEntity(itemID);
        }
        Game.backloggedItems[itemIndexID] = {
            0: itemIndexID,
            1: itemID,
            2: position,
            3: rotation,
            4: scaling,
            5: options
        };
        return true;
    }
    /**
     * 
     * @memberof module:items
     */
    static removeBackloggedItem(itemIndexID) {
        if (!Game.hasBackloggedItem(itemIndexID)) {
            return true;
        }
        delete Game.backloggedItems[itemIndexID];
        return true;
    }
    /**
     * 
     * @memberof module:items
     */
    static hasBackloggedItem(itemIndexID) {
        if (!Game.initialized) {
            return false;
        }
        return Object.keys(Game.backloggedItems).length > 0 && Game.backloggedItems.hasOwnProperty(itemIndexID);
    }
    /**
     * 
     * @memberof module:items
     */
    static createBackloggedItems() { // It's InstancedItemEntities :v
        for (let i in Game.backloggedItems) {
            if (Game.hasLoadedMesh(Game.backloggedItems[i][1].meshID)) {
                Game.createItemInstance(
                    Game.backloggedItems[i][0],
                    Game.backloggedItems[i][1],
                    Game.backloggedItems[i][2],
                    Game.backloggedItems[i][3],
                    Game.backloggedItems[i][4],
                    Game.backloggedItems[i][5]
                );
                Game.removeBackloggedItem(i);
            }
        }
    }
    static createItemInstanceAtController(id = "", entityID, atController, rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}, parentCallbackID = null) {
        atController = Game.filterController(atController);
        if (atController == 1) {
            return 1;
        }
        let position = atController.getPosition();
        if (rotation.equals(BABYLON.Vector3.Zero())) {
            rotation = atController.getRotation();
        }
        Game.createItemInstance(id, entityID, position, rotation, scaling, options, parentCallbackID);
        return 0;
    }
    /**
     * Places, or creates from an ItemEntity, an InstancedItemEntity in the world at the given position.
     * @memberof module:items
     * @param {string} [id] Unique ID, auto-generated if none given
     * @param {(AbstractEntity|string)} entityID Abstract entity; preferably an InstancedItemEntity
     * @param {BABYLON.Vector3} position Position
     * @param {BABYLON.Vector3} [rotation] Rotation
     * @param {BABYLON.Vector3} [scaling] Scaling
     * @param {object} [options] Options
     * @returns {(ItemController|array|number)} An EntityController or an integer status code
     */
    static createItemInstance(id = "", entityID, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}, parentCallbackID = null) {
        if (Game.hasCachedEntity(entityID)) {
            Game.createItemInstanceResponsePhaseOne(id, entityID, position, rotation, scaling, options, Game.getCachedEntity(entityID));
        }
        else {
            let callbackID = Tools.genUUIDv4();
            Game.createCallback(callbackID, parentCallbackID, [id, entityID, position, rotation, scaling, options], Game.createItemInstanceResponsePhaseOne);
            Game.getEntity(entityID, callbackID);
        }
        return 0;
    }
    static createItemInstanceResponsePhaseOne(id, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        entityID = response.id; // why? just in case :v
        if (Game.hasLoadedMesh(response.meshID)) {
            Game.createItemInstanceResponsePhaseTwo(id, entityID, position, rotation, scaling, options, response);
        }
        else {
            let callbackID = Tools.genUUIDv4();
            Game.createCallback(callbackID, parentCallbackID, [id, entityID, position, rotation, scaling, options], Game.createItemInstanceResponsePhaseTwo);
            Game.loadTexture(response.textureID);
            Game.loadMaterial(response.textureID); // TODO: Work out a real system of materials :v
            Game.loadMesh(response.meshID, callbackID);
        }
        return 0;
    }
    static createItemInstanceResponsePhaseTwo(id, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [id, entityID, position, rotation, scaling, options], Game.createItemInstanceResponsePhaseThree);
        Game.entityLogicWorkerPostMessage("createItemInstance", 0, {"entityID": entityID}, callbackID);
        return 0;
    }
    static createItemInstanceResponsePhaseThree(id, entityID, position, rotation, scaling, options, response, parentCallbackID) {
        let mesh = Game.createItemMesh(id, response.meshID, response.textureID, position, rotation, scaling, options);
        let controller = new ItemController(id, mesh, response);
        controller.updateTransforms();
        if (Game.physicsEnabled && !Game.physicsForProjectilesOnly && controller.hasCollisionMesh()) {
            Game.assignBoxPhysicsToMesh(controller.collisionMesh, options);
        }
        if (options.hasOwnProperty("compoundController")) {
            controller.setCompoundController(options["compoundController"]);
        }
        return 0;
    }
    /**
     * Removes an InstancedItemEntity, its ItemController, and its BABYLON.InstancedMesh
     * @memberof module:items
     * @param {(ItemController|string)} itemController An ItemController, or its string ID
     * @returns {number} Integer status code
     */
    static removeItem(itemController) {
        if (!(itemController instanceof ItemController)) {
            if (ItemController.has(itemController)) {
                itemController = ItemController.get(itemController);
            }
            else {
                return 2;
            }
        }
        itemController.dispose();
        return 0;
    }

    /**
     * @module characters
     */
    /**
     * 
     * @memberof module:characters
     * @param {string} characterID 
     * @param {string} meshID 
     * @param {string} materialID 
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} rotation 
     * @param {BABYLON.Vector3} scaling 
     * @param {object} options 
     */
    static createCharacterMesh(characterID = "", meshID = "missingMesh", materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = { createClone: false, checkCollisions: true }) {
        if (Game.debugMode) console.group(`Running Game.createCharacterMesh(${characterID}, ${meshID}, ${materialID})`);
        characterID = Game.filterID(characterID);
        position = Game.filterVector3(position);
        rotation = Game.filterVector3(rotation);
        scaling = Game.filterVector3(scaling);
        if (typeof options != "object") {
            options = { "mass": 0 };
        }
        let instancedMesh = Game.createMesh(characterID, meshID, materialID, position, rotation, scaling, options);
        if (!(instancedMesh instanceof BABYLON.AbstractMesh)) {
            if (Game.debugMode) console.groupEnd();
            return 2;
        }
        /*
        Using X for Z size 'cause the tail throws my collision box size off
        */
        let boundingInfo = instancedMesh.getBoundingInfo();
        instancedMesh.ellipsoid.set(boundingInfo.boundingBox.extendSize.x * scaling.x, boundingInfo.boundingBox.extendSize.y * scaling.y, boundingInfo.boundingBox.extendSize.x * scaling.z);
        //instancedMesh.ellipsoidOffset.set(0, instancedMesh.ellipsoid.y, -0.1);
        if (Game.debugMode) console.groupEnd();
        return instancedMesh;
    }
    /**
     * 
     * @memberof module:characters
     */
    static addBackloggedCharacter(id, characterID, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}, parentCallbackID = null) {
        if (Game.debugMode) console.group(`Running Game.addBackloggedCharacter(${id}, ${characterID}, ${position.toString()})`);
        if (Game.hasBackloggedCharacter(id)) {
            if (Game.debugMode) console.groupEnd();
            return true;
        }
        if (Game.hasCachedEntity(characterID)) {
            Game.loadMesh(Game.getCachedEntity(characterID)["meshID"]);
        }
        else {
            let callbackID = Tools.genUUIDv4();
            Game.createCallback(callbackID, parentCallbackID, [id, characterID, position, rotation, scaling, options], Game.addBackloggedCharacter);
            Game.getEntity(characterID, callbackID);
            if (Game.debugMode) console.groupEnd();
            return true;
        }
        Game.backloggedCharacters[id] = {
            0: id,
            1: characterID,
            2: position,
            3: rotation,
            4: scaling,
            5: options,
            6: parentCallbackID
        };
        if (Game.debugMode) console.groupEnd();
        return true;
    }
    /**
     * 
     * @memberof module:characters
     */
    static removeBackloggedCharacter(characterIndexID) {
        if (!Game.hasBackloggedCharacter(characterIndexID)) {
            return true;
        }
        if (Game.debugMode) console.group(`Running Game.removeBackloggedCharacter(${characterIndexID})`);
        delete Game.backloggedCharacters[characterIndexID];
        if (Game.debugMode) console.groupEnd();
        return true;
    }
    /**
     * 
     * @memberof module:characters
     */
    static hasBackloggedCharacter(characterIndexID) {
        if (!Game.initialized) {
            return false;
        }
        return Object.keys(Game.backloggedCharacters).length > 0 && Game.backloggedCharacters.hasOwnProperty(characterIndexID);
    }
    /**
     * 
     * @memberof module:characters
     */
    static createBackloggedCharacters() {
        for (let i in Game.backloggedCharacters) {
            let characterID = Game.backloggedCharacters[i][1];
            let meshID = null;
            if (Game.hasCachedEntity(characterID)) {
                meshID = Game.getCachedEntity(characterID)["meshID"];
            }
            if (Game.loadedMeshes.hasOwnProperty(meshID)) {
                Game.createCharacterInstance(
                    Game.backloggedCharacters[i][0],
                    Game.backloggedCharacters[i][1],
                    Game.backloggedCharacters[i][2],
                    Game.backloggedCharacters[i][3],
                    Game.backloggedCharacters[i][4],
                    Game.backloggedCharacters[i][5],
                    Game.backloggedCharacters[i][6]
                );
                Game.removeBackloggedCharacter(i);
            }
        }
    }
    /**
     * 
     * @memberof module:characters
     * @param {string} id Unique ID, auto-generated if none given
     * @param {string} name Name
     * @param {string} [description] Description
     * @param {string} [iconID] Icon ID
     * @param {CreatureTypeEnum} [creatureType] Creature Type
     * @param {CreatureSubTypeEnum} [creatureSubType] Creature Sub-Type
     * @param {SexEnum} [sex] SexEnum
     * @param {number} [age] Age
     * @param {string} meshID Mesh ID
     * @param {string} materialID Material ID
     * @param {object} [options] Options
     * @param {(string|null)} [parentCallbackID] 
     */
    static createCharacterEntity(id = "", name = "", description = "", iconID = "genericCharacterIcon", creatureType = CreatureTypeEnum.HUMANOID, creatureSubType = CreatureSubTypeEnum.FOX, sex = SexEnum.MALE, age = 18, meshID = "missingMesh", materialID = "missingMaterial", options = {}, parentCallbackID = null) {
        id = Tools.filterID(id, Tools.genUUIDv4());
        if (Game.debugMode) console.group(`Running Game.createCharacterEntity(${id}, ${name}, ${description}, ${iconID}, ${creatureType}, ${creatureSubType}, ${sex}, ${age}, ${meshID}, ${materialID})`);
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [id, name, description, iconID, creatureType, creatureSubType, sex, age, meshID, materialID, options], Game.createCharacterEntityResponse);
        Game.entityLogicWorkerPostMessage("createCharacterEntity", 0, {
            "id": id,
            "name": name,
            "description": description,
            "iconID": iconID,
            "creatureType": creatureType,
            "creatureSubType": creatureSubType,
            "sex": sex,
            "age": age,
            "meshID": meshID,
            "materialID": materialID,
            "options": options
        }, callbackID);
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static createCharacterEntityResponse(id, name, description, iconID, creatureType, creatureSubType, sex, age, meshID, materialID, options, response, callbackID) {
        Game.setHasRunCallback(callbackID, true);
        if (Game.debugMode) console.group(`Running Game.createCharacterEntityResponse(${id}, ${name}, ${description}, ${iconID})`);
        Game.setCachedEntity(response.id, response);
        Game.runCallbackParent(callbackID, response);
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    /**
     * Creates a character mesh, and controller.
     * @memberof module:characters
     * @param  {string} [id] Unique ID, auto-generated if none given
     * @param  {string} characterID Character entity
     * @param  {BABYLON.Vector3} position Position
     * @param  {BABYLON.Vector3} [rotation] Rotation
     * @param  {BABYLON.Vector3} [scaling] Scale
     * @param  {object} [options] Options
     * @param  {(string|null)} [parentCallbackID] 
     * @returns {number} Integer status code
     */
    static createCharacterInstance(id, characterID, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}, parentCallbackID = null) {
        if (Game.debugMode) console.group(`Running Game.createCharacterInstance(${id}, ${characterID}, ${position.toString()})`)
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [id, characterID, position, rotation, scaling, options], Game.createCharacterInstanceResponsePhaseOne);
        if (!Game.hasCachedEntity(characterID)) {
            if (Game.debugMode) console.warn(`Entity (${characterID}) doesn't exist, attempting to get it.`);
            Game.getEntity(characterID, callbackID);
        }
        else {
            Game.runCallback(callbackID, characterID);
        }
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static createCharacterInstanceResponsePhaseOne(id, characterID, position, rotation, scaling, options, response, parentCallbackID) {
        if (Game.debugMode) console.group(`Running Game.createCharacterInstanceResponsePhaseOne(${id}, ${characterID}, ${position.toString()})`)
        Game.setHasRunCallback(parentCallbackID);
        let character = Game.getCachedEntity(characterID);
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [id, characterID, position, rotation, scaling, options], Game.createCharacterInstanceResponsePhaseTwo);
        if (!(Game.hasLoadedMesh(character.meshID))) {
            if (Game.debugMode) console.warn(`Mesh (${character.meshID}) doesn't exist, attempting to get it.`);
            Game.loadMesh(character.meshID, callbackID);
        }
        else {
            Game.runCallback(callbackID, response);
        }
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static createCharacterInstanceResponsePhaseTwo(id, characterID, position, rotation, scaling, options, response, parentCallbackID) {
        if (Game.debugMode) console.group(`Running Game.createCharacterInstanceResponsePhaseTwo(${id}, ${characterID}, ${position.toString()})`)
        Game.setHasRunCallback(parentCallbackID);
        let cachedEntity = Game.getCachedEntity(characterID);
        let mesh = Game.createCharacterMesh(characterID, cachedEntity.meshID, cachedEntity.materialID, position, rotation, scaling, options);
        let controller = null;
        if (Game.debugMode) console.info("Creating CharacterController");
        if (Game.useRigidBodies) {
            controller = new CharacterControllerRigidBody(characterID, mesh, cachedEntity);
        }
        else {
            controller = new CharacterControllerTransform(characterID, mesh, cachedEntity);
        }
        //characterController.assign(character);
        controller.populateFromEntity(cachedEntity);
        controller.generateOrganMeshes();
        controller.generateCosmeticMeshes();
        controller.generateEquippedMeshes();
        controller.updateTargetRay();
        if (Game.debugMode) console.info(`Telling EntityLogic ${characterID}'s CharacterController is ${characterID}`)
        Game.entityLogicWorkerPostMessage("setController", 0, {"entityID":characterID, "controllerID":characterID});
        switch (cachedEntity.meshID) {
            case "aardwolfM":
            case "aardwolfF":
            case "foxM":
            case "foxF":
            case "foxSkeletonN": {
                controller.attachToROOT("hitbox.canine", "collisionMaterial");
                controller.attachToHead("hitbox.canine.head", "collisionMaterial", { isHitbox: true });
                controller.attachToNeck("hitbox.canine.neck", "collisionMaterial", { isHitbox: true });
                controller.attachToChest("hitbox.canine.chest", "collisionMaterial", { isHitbox: true });
                controller.attachToLeftHand("hitbox.canine.hand.l", "collisionMaterial", { isHitbox: true });
                controller.attachToRightHand("hitbox.canine.hand.r", "collisionMaterial", { isHitbox: true });
                controller.attachToSpine("hitbox.canine.spine", "collisionMaterial", { isHitbox: true });
                controller.attachToPelvis("hitbox.canine.pelvis", "collisionMaterial", { isHitbox: true });
                break;
            }
        }
        let newScaling = cachedEntity.height / cachedEntity.baseHeight;
        mesh.scaling.set(newScaling, newScaling, newScaling);
        if (Game.physicsEnabled && !Game.physicsForProjectilesOnly && controller.hasCollisionMesh()) {
            Game.assignBoxPhysicsToMesh(controller.collisionMesh, options);
        }
        if (Game.debugMode) console.info(`Running callback for ${parentCallbackID}`);
        Game.runCallback(parentCallbackID, controller, true, true);
        if (Game.debugMode) console.info("Done running Game.createCharacterInstanceResponsePhaseTwo");
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    /**
     * Removes a CharacterController, and its BABYLON.InstancedMesh(es)
     * @memberof module:characters
     * @param {(CharacterController|string)} characterController A CharacterController, or its string ID
     * @returns {number} Integer status code
     */
    static removeCharacter(characterController) {
        if (!(characterController instanceof CharacterController)) {
            if (!CharacterController.has(characterController)) {
                return 2;
            }
            characterController = CharacterController.get(characterController);
        }
        if (characterController == Game.playerController) {
            return 1;
        }
        //Game.entityLogicWorkerPostMessage("removeCharacter", 0, [characterController.entityID]);
        characterController.dispose();
        return 0;
    }

    /**
     * @module player
     * @memberof module:character
     */
    /**
     * 
     * @memberof module:player
     * @param {string} id 
     * @param {string} name 
     * @param {string} [description] 
     * @param {string} [iconID] Icon ID
     * @param {CreatureTypeEnum} creatureType Creature Type
     * @param {CreatureSubTypeEnum} creatureSubType Creture Sub-Type
     * @param {SexEnum} sex 
     * @param {number} age 
     * @param {string} meshID Mesh ID
     * @param {string} [materialID] Material ID
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} [rotation] 
     * @param {BABYLON.Vector3} [scaling] 
     * @param {object} [options] 
     * @param {(string|null)} [parentCallbackID] 
     */
    static createPlayer(id = "", name = "", description = "", iconID = "missingIcon", creatureType = CreatureTypeEnum.HUMANOID, creatureSubType = CreatureSubTypeEnum.FOX, sex = SexEnum.MALE, age = 18, meshID = "missingMesh", materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}, parentCallbackID = null) {
        if (Game.debugMode) console.group(`Running Game.createPlayer(${id}, ${name}, ${description}, ${iconID})`);
        id = Tools.filterID(id, Tools.genUUIDv4());
        position = Game.filterVector3(position);
        rotation = Game.filterVector3(rotation);
        scaling = Game.filterVector3(scaling);
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [id, name, description, iconID, creatureType, creatureSubType, sex, age, meshID, materialID, position, rotation, scaling, options], Game.createPlayerResponsePhaseOne);
        Game.createCharacterEntity(id, name, description, iconID, creatureType, creatureSubType, sex, age, meshID, materialID, options, callbackID);
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static createPlayerResponsePhaseOne(id, name, description, iconID, creatureType, creatureSubType, sex, age, meshID, materialID, position, rotation, scaling, options, response, parentCallbackID) {
        Game.setHasRunCallback(parentCallbackID, true);
        if (Game.debugMode) console.group(`Running Game.createPlayerResponsePhaseOne(${id}, ${name}, ${description}, ${iconID})`);
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [id, name, description, iconID, creatureType, creatureSubType, sex, age, meshID, materialID, position, rotation, scaling, options], Game.createPlayerResponsePhaseTwo);
        Game.createCharacterInstance(id, response.id, position, rotation, scaling, options, callbackID);
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static createPlayerResponsePhaseTwo(id, name, description, iconID, creatureType, creatureSubType, sex, age, meshID, materialID, position, rotation, scaling, options, response, parentCallbackID) {
        Game.setHasRunCallback(parentCallbackID, true);
        if (Game.debugMode) console.group(`Running Game.createPlayerResponsePhaseTwo(${id}, ${name}, ${description}, ${iconID})`);
        Game.assignPlayer(response);
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    /**
     * 
     * @memberof module:player
     * @param {CharacterController} characterController 
     */
    static assignPlayer(characterController) {
        if (Game.debug) console.group(`Running Game.assignPlayer(${characterController instanceof Object ? characterController.id : String(characterController)})`)
        if (!(characterController instanceof CharacterController)) {
            if (CharacterController.has(characterController)) {
                characterController = CharacterController.get(characterController);
            }
            else {
                return 2;
            }
        }
        if (Game.playerController == characterController) {
            Game.unassignPlayer();
        }
        else {
            Game.cameraFocus = Game.createMesh("cameraFocus", "cameraFocus", "collisionMaterial");
        }
        Game.playerEntityID = characterController.entityID;
        Game.playerController = characterController;
        Game.playerController.attachToFOCUS(Game.cameraFocus); // and reassigning an instanced mesh without destroying it
        Game.playerController.getMesh().isPickable = false;
        Game.gui.playerPortrait.set(Game.playerController);
        Game.initArcRotateCamera();
        Game.initCastTargetRayInterval();
        Game.initPlayerPortraitStatsUpdateInterval();
        Game.entityLogicWorkerPostMessage("setPlayer", 0, {"entityID": characterController.entityID});
        Game.transformsWorkerPostMessage("setPlayer", 0, [characterController.id]);
        if (Game.debug) console.groupEnd();
        return 0;
    }
    /**
     * 
     * @memberof module:player
     */
    static unassignPlayer(updateChild = true) {
        if (Game.debug) console.group("Running Game.unassignPlayer()");
        Game.overwriteCameraTransforms();
        Game.transformsWorkerPostMessage("clearPlayer", 0);
        Game.initFreeCamera(false, !updateChild);
        Game.gui.playerPortrait.hide();
        Game.playerController.getMesh().isPickable = true;
        Game.playerController.detachFromFOCUS();
        Game.playerEntityID = null;
        Game.playerController = null;
        Game.clearPlayerPortraitStatsUpdateInterval();
        Game.clearTargetRayInterval();
        Game.clearPlayerTarget();
        if (Game.debug) console.groupEnd();
        return 0;
    }
    /**
     * 
     * @memberof module:player
     * @param {EntityController} entityController 
     */
    static setPlayerTarget(entityController) {
        if (entityController == Game.playerController) {
            return;
        }
        if (Game.debugMode) console.group("Running Game.setPlayerTarget()");
        if (!(Game.hasPlayerController())) {
            if (Game.debugMode) {
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
                if (Game.debugMode) {
                    console.error("Target doesn't have a controller; returning 1");
                    console.groupEnd();
                }
                Game.clearPlayerTarget();
                return 1;
            }
        }
        if (!entityController.isEnabled()) {
            if (Game.debugMode) {
                console.info("Target has a controller, but it is disabled; returning 0");
                console.groupEnd();
            }
            if (entityController == Game.playerController.target) {
                Game.clearPlayerTarget();
            }
            return 0;
        }
        if (entityController == Game.playerController.target) {
            if (Game.debugMode) {
                console.groupEnd();
            }
            Game.gui.targetPortrait.update();
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
        Game.gui.targetPortrait.set(entityController);
        Game.gui.targetPortrait.show();
        Game.gui.setActionTooltip(ActionEnum.properties[actionEnum].name);
        Game.gui.showActionTooltip();
        if (Game.debugMode) console.groupEnd();
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
        Game.gui.targetPortrait.hide();
        Game.gui.hideActionTooltip();
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
        return Game.playerCellID != null;
    }
    static castTargetRay() {
        if (!Game.targetRayEnabled) {
            return 0;
        }
        if (!Game.hasPlayerController() || !Game.playerController.hasMesh() || !Game.playerController.hasSkeleton()) {
            return 1;
        }
        Game.playerController.targetRay = Game.camera.getForwardRay(2 * Game.playerController.mesh.scaling.y, Game.camera.getWorldMatrix(), Game.camera.getTarget());
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
    }
    static disableTargetRay() {
        Game.targetRayEnabled = false;
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
        clearInterval(Game.playerPortraitStatsUpdateIntervalFunction);
        Game.playerPortraitStatsUpdateIntervalFunction = setInterval(Game.gui.playerPortrait.update, Game.playerPortraitStatsUpdateInterval);
        return 0;
    }
    static setPlayerPortraitStatsUpdateInterval(interval = 100) {
        if (interval > 0) {
            Game.playerPortraitStatsUpdateInterval = interval;
        }
        Game.initPlayerPortraitStatsUpdateInterval();
        return 0;
    }
    static clearPlayerPortraitStatsUpdateInterval() {
        clearInterval(Game.playerPortraitStatsUpdateIntervalFunction);
        return 0;
    }
    /**
     * 
     * @returns {(BABYLON.AbstractMesh|null)}
     */
    static pickMesh() {
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
    static pointerLock(event) {
        if (Game.engine.isPointerLock) {
            return 0;
        }
        if (Game.useNative) {}
        else {
            Game.canvas.requestPointerLock();
        }
        /*Game.pointerLockTimeoutFunction = setTimeout(function () { document.addEventListener("pointerlockchange", Game.pointerRelease); }, 121);*/
        return 0;
    }
    static pointerRelease(event) {
        if (!Game.engine.isPointerLock) {
            return 0;
        }
        /*clearTimeout(Game.pointerLockTimeoutFunction);
        document.removeEventListener("pointerlockchange", Game.pointerRelease);
        document.exitPointerLock();*/
        if (Game.useNative) {}
        else {
            document.exitPointerLock();
        }
        return 0;
    }
    static parseChat(chatString) {
        if (chatString.slice(0, 1) == "/") {
            return Game.chatCommands(chatString.slice(1));
        }
        else {
            return Game.gui.chat.appendOutput(`${new Date().toLocaleTimeString({ hour12: false })} ${Game.getCachedEntity(Game.playerEntityID).name}: ${chatString}`);
        }
    }
    static sendChatMessage() {
        let chatString = Game.gui.chat.getInput();
        if (chatString.length == 0) {
            return 1;
        }
        if (Client.isOnline()) {
            Client.sendChatMessage(chatString);
        }
        else {
            Game.parseChat(chatString);
        }
        Game.gui.chat.clearInput();
        Game.gui.chat.setFocused(false);
        return 0;
    }
    static chatCommands(command, ...parameters) {
        if (command == undefined || typeof command != "string") {
            return 2;
        }
        if (command.slice(0, 1) == "/") {
            command = command.slice(1);
        }
        let commandArray = command.split(" ");
        if (commandArray.length == 0 || typeof commandArray[0] != "string" || commandArray[0].length <= 0) {
            commandArray.push("help");
        }
        switch (commandArray[0].toLowerCase()) {
            case "help": {
                Game.gui.chat.appendOutput("Possible commands are: help, clear, menu, login, logout, quit, save, and load.\n");
                break;
            }
            case "addallarmour":
            case "addallarmor":
            case "addallclothing": {
                let target = Game.playerEntityID;
                if (commandArray.hasOwnProperty(1)) {
                    target = commandArray[1];
                }
                Game.entityLogicWorkerPostMessage("addAllClothing", 0, {"target": target});
                break;
            }
            case "addallitems": {
                let target = Game.playerEntityID;
                if (commandArray.hasOwnProperty(1)) {
                    target = commandArray[1];
                }
                Game.entityLogicWorkerPostMessage("addAllItems", 0, {"target": target});
                break;
            }
            case "addallkeys": {
                let target = Game.playerEntityID;
                if (commandArray.hasOwnProperty(1)) {
                    target = commandArray[1];
                }
                Game.entityLogicWorkerPostMessage("addAllKeys", 0, {"target": target});
                break;
            }
            case "addallweapons": {
                let target = Game.playerEntityID;
                if (commandArray.hasOwnProperty(1)) {
                    target = commandArray[1];
                }
                Game.entityLogicWorkerPostMessage("addAllWeapons", 0, {"target": target});
                break;
            }
            case "additem": {
                let index = 1;
                let item = commandArray[index];
                index++;
                let amount = 1;
                if (commandArray.hasOwnProperty(index) && typeof commandArray[index] == "number") {
                    amount = commandArray[index];
                    index++;
                }
                let target = Game.playerEntityID;
                if (commandArray.hasOwnProperty(index) && typeof commandArray[index] == "string") {
                    target = commandArray[index];
                }
                Game.entityLogicWorkerPostMessage("addItem", 0, {"entityID": item, "amount": amount, "target": target});
                break;
            }
            case "addmoney": {
                let money = Tools.filterInt(commandArray[1]) || 1;
                let target = Game.playerEntityID;
                if (commandArray.hasOwnProperty(2)) {
                    target = commandArray[2];
                }
                Game.entityLogicWorkerPostMessage("addMoney", 0, {"amount": money, "target": target});
                break;
            }
            case "clear": {
                Game.gui.chat.clearOutput();
                break;
            }
            case "createplayer": {
                let position = new BABYLON.Vector3(commandArray[1] || 0, commandArray[2] || 0, commandArray[3] || 0);
                if (EntityController.has("player")) {
                    Game.initFreeCamera(false, false);
                    EntityController.get("player").dispose();
                }
                Game.createPlayer("player", "Player", "It you :v", "genericCharacterIcon", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FOX, SexEnum.MALE, 18, "foxM", "foxRed", position, undefined, undefined, {eyes:EyeEnum.CIRCLE, eyesColour:"green"});
                Game.initArcRotateCamera();
                break;
            }
            case "exit": {
                break;
            }
            case "getmoney": {
                let target = Game.playerEntityID;
                if (commandArray.hasOwnProperty(1)) {
                    target = commandArray[1];
                }
                Game.entityLogicWorkerPostMessage("getMoney", 0, {"target": target});
                break;
            }
            case "kill": {
                let target = Game.playerEntityID;
                if (commandArray.hasOwnProperty(1)) {
                    target = commandArray[1];
                }
                Game.entityLogicWorkerPostMessage("kill", 0, {"target": target});
                break;
            }
            case "load": {
                break;
            }
            case "loadcell": {
                let cellID = commandArray[1];
                Game.setPlayerCell(cellID);
                break;
            }
            case "login": {
                break;
            }
            case "logout": {
                Client.disconnect();
                break;
            }
            case "menu": {
                Game.gui.showCharacterChoiceMenu();
                break;
            }
            case "quit": {
                break;
            }
            case "save": {
                break;
            }
            case "setmoney": {
                let money = Tools.filterInt(commandArray[1]) || 1;
                let target = Game.playerEntityID;
                if (commandArray.hasOwnProperty(2)) {
                    target = commandArray[2];
                }
                Game.entityLogicWorkerPostMessage("setMoney", 0, {"amount": money, "target": target});
                break;
            }
            case "showdebug": {
                Game.gui.debug.show();
                break;
            }
            case "unloadcell": {
                Game.unloadCell();
                break;
            }
            case ":v":
            case "v:":
            case ":V":
            case "V:": {
                if (Game.controls == EditControls) {
                    Game.gui.chat.appendOutput("\n    Bye, super powers v:\n");
                    Game.setInterfaceMode(InterfaceModeEnum.CHARACTER);
                }
                else {
                    Game.gui.chat.appendOutput("\n    A developer is you :V\n");
                    Game.setInterfaceMode(InterfaceModeEnum.EDIT);
                }
                break;
            }
            default: {
                Game.gui.chat.appendOutput(`Command "${command}" not found.\n`);
                return 0;
            }
        }
        return 0;
    }
    static updateCameraTarget() {
        if (Game.camera instanceof BABYLON.ArcRotateCamera) {
            return Game.updateArcRotateCameraTarget()
        }
        else if (Game.camera instanceof BABYLON.FollowCamera) {
            return Game.updateFollowCameraTarget();
        }
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
                Game.gui.showCrosshair();
            }
        }
        else if (!Game.playerController.mesh.isVisible) {
            if (Game.debugMode) BABYLON.Tools.Log("Running Game.updateArcRotateCameraTarget()");
            Game.playerController.showMesh();
            Game.camera.checkCollisions = false;
            Game.camera.inertia = 0.9;
            Game.gui.hideCrosshair();
        }
        if (Game.useCameraRay) {
            if (Game.playerController.mesh.isVisible && Game.cameraRay instanceof BABYLON.Ray) {
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
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [targetController, actorController], Game.actionAttackResponse);
        Game.entityLogicWorkerPostMessage("actionAttack", 0, {"actorID":actorController.entityID, "targetID":targetController.entityID}, callbackID);
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
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [targetController, actorController], Game.actionCloseResponse);
        Game.entityLogicWorkerPostMessage("actionClose", 0, {"actorID":actorController.entityID, "targetID":targetController.entityID}, callbackID);
        return 0;
    }
    static actionCloseResponse(targetController, actorController, response, parentCallbackID) {
        if (Game.debugMode) BABYLON.Tools.Log(`Game.actionCloseResponse(${targetController.id}, ${actorController.id})`);
        if (targetController instanceof DoorController) {
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
            targetController = targetController.entityID;
        }
        else {
            let tempController = Game.filterController(actorController);
            if (tempController instanceof EntityController) {
                targetController = tempController.entityID;
            }
            else {
                return 2;
            }
        }
        actorController = Game.filterController(actorController);
        if (Game.debugMode) BABYLON.Tools.Log(`Game.actionDrop(${targetController}, ${actorController.id})`);
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [targetController, actorController], Game.actionDropResponse);
        Game.entityLogicWorkerPostMessage("actionDrop", 0, {"actorID":actorController.entityID, "targetID":targetController}, callbackID);
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
            targetController = targetController.entityID;
        }
        else {
            let tempController = Game.filterController(actorController);
            if (tempController instanceof EntityController) {
                targetController = tempController.entityID;
            }
            else {
                return 2;
            }
        }
        actorController = Game.filterController(actorController);
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [targetController, actorController], Game.actionEquipResponsePhaseOne);
        Game.entityLogicWorkerPostMessage("actionEquip", 0, {"actorID":actorController.entityID, "targetID":targetController}, callbackID);
        return 0;
    }
    static actionEquipResponsePhaseOne(targetController, actorController, response, parentCallbackID) {
        if (response) {
            let callbackID = Tools.genUUIDv4();
            Game.createCallback(callbackID, parentCallbackID, [targetController, actorController], Game.actionEquipResponsePhaseTwo);
        }
        return 0;
    }
    static actionEquipResponsePhaseTwo(targetController, actorController, response, parentCallbackID) {
        /*
        TODO: if the inventory selection was the target, update its button
        */
        actorController.populateFromEntity(response);
        actorController.generateEquippedMeshes();
        return 0;
    }
    static actionHold(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        return 0;
    }
    static actionLay(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        return 0;
    }
    static actionLook(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        return 0;
    }
    static actionOpen(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        targetController = Game.filterController(targetController);
        actorController = Game.filterController(actorController);
        if (targetController == 1 || actorController == 1) {
            return 1;
        }
        if (Game.debugMode) BABYLON.Tools.Log(`Game.actionOpen(${targetController.id}, ${actorController.id})`);
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [targetController, actorController], Game.actionOpenResponse);
        Game.entityLogicWorkerPostMessage("actionOpen", 0, {"actorID":actorController.entityID, "targetID":targetController.entityID}, callbackID);
        return 0;
    }
    static actionOpenResponse(targetController, actorController, response, parentCallbackID) {
        if (Game.debugMode) BABYLON.Tools.Log(`Game.actionOpenResponse(${targetController.id}, ${actorController.id})`);
        if (targetController instanceof DoorController) {
            if (response === true) {
                targetController.doOpen();
            }
        }
        return 0;
    }
    static actionRead(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        return 0;
    }
    static actionRelease(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        return 0;
    }
    static actionSit(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        return 0;
    }
    static actionTake(targetController, actorController = Game.playerController, parentCallbackID = null) {
        targetController = Game.filterController(targetController);
        actorController = Game.filterController(actorController);
        if (targetController == 1 || actorController == 1) {
            return 1;
        }
        if (Game.debugMode) BABYLON.Tools.Log(`Game.actionTake(${targetController.id}, ${actorController.id})`);
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [targetController, actorController], Game.actionTakeResponse);
        Game.entityLogicWorkerPostMessage("actionTake", 0, {"actorID":actorController.entityID, "targetID":targetController.entityID}, callbackID);
        // TODO: actorController.play("grab");
        return 0;
    }
    static actionTakeResponse(targetController, actorController, response, parentCallbackID) {
        Game.setHasRunCallback(parentCallbackID, true);
        if (!(actorController instanceof EntityController)) {
            if (EntityController.has(actorController)) {
                actorController = EntityController.get(actorController);
            }
            else {
                return 2;
            }
        }
        if (!(targetController instanceof EntityController)) {
            if (EntityController.has(targetController)) {
                targetController = EntityController.get(targetController);
            }
            else {
                return 2;
            }
        }
        if (Game.debugMode) BABYLON.Tools.Log(`Game.actionTake(${targetController.id}, ${actorController.id})`);
        if (response[0] == true) {
            targetController.dispose();
        }
        else {
            // TODO: actorController.stop("grab");
            // TODO: actorController.play("grabRecoil");
        }
        Game.removeCallback(parentCallbackID);
        return 0;
    }
    static actionTalk(targetController = Game.playerController.getTarget(), actorController = Game.playerController, parentCallbackID = null) {
        targetController = Game.filterController(targetController);
        actorController = Game.filterController(actorController);
        if (targetController == 1 || actorController == 1) {
            return 1;
        }
        if (Game.debugMode) BABYLON.Tools.Log(`Game.actionTalk(${targetController.id}, ${actorController.id})`);
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [targetController, actorController], Game.actionTalkResponse);
        Game.entityLogicWorkerPostMessage("actionTalk", 0, {"actorID":actorController.entityID, "targetID":targetController.entityID}, callbackID);
        return 0;
    }
    static actionTalkResponse(targetController, actorController, response, parentCallbackID) {
        Game.gui.dialogue.set(response, targetController, actorController);
        Game.gui.dialogue.show();
        return 0;
    }
    static actionUnequip(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        if (Game.hasCachedEntity(targetController)) {}
        else if (targetController instanceof Object && targetController.hasOwnProperty("entityID")) {
            targetController = targetController.entityID;
        }
        else {
            let tempController = Game.filterController(actorController);
            if (tempController instanceof EntityController) {
                targetController = tempController.entityID;
            }
            else {
                return 2;
            }
        }
        actorController = Game.filterController(actorController);
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [targetController, actorController], Game.actionUnequipResponsePhaseOne);
        Game.entityLogicWorkerPostMessage("actionUnequip", 0, {"actorID":actorController.entityID, "targetID":targetController}, callbackID);
        return 0;
    }
    static actionUnequipResponsePhaseOne(targetController, actorController, response, parentCallbackID) {
        if (response) {
            let callbackID = Tools.genUUIDv4();
            Game.createCallback(callbackID, parentCallbackID, [targetController, actorController], Game.actionUnequipResponsePhaseTwo);
        }
        return 0;
    }
    static actionUnequipResponsePhaseTwo(targetController, actorController, response, parentCallbackID) {
        actorController.populateFromEntity(response);
        actorController.generateEquippedMeshes();
        return 0;
    }
    static actionUse(targetController = null, actorController = Game.playerController, parentCallbackID = null) {
        return 0;
    }

    /**
     * 
     * @param {(string|null)} parentCallbackID 
     * @returns {number}
     */
    static unloadCell(parentCallbackID = null) {
        if (Game.playerCellID == null) {
            return 1;
        }
        if (!Game.cachedCells.hasOwnProperty(Game.playerCellID)) {
            return 1;
        }
        Game.initFreeCamera(false, false);
        AbstractNode.clear();
        let cellID = Game.playerCellID;
        Game.playerCellID = null;
        for (let entityController in EntityController.list()) {
            EntityController.get(entityController).dispose();
        }
        for (let i in Game.cachedCells[cellID].meshIDs) {
            Game.removeMesh(Game.cachedCells[cellID].meshIDs[i]);
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
        }
        for (let meshID in Game.clonedMeshes) {
            Game.removeMesh(meshID);
        }
        for (let meshID in Game.tiledMeshes) {
            Game.tiledMeshes[meshID].dispose();
        }
        return 0;
    }
    /**
     * 
     * @param {string} cellID 
     * @param {(string|null)} [parentCallbackID] 
     */
    static loadCell(cellID, parentCallbackID = null) {
        let callbackID = Tools.genUUIDv4();
        if (Game.debugMode) console.group(`Running Game.loadCell(${cellID}, ${parentCallbackID})`);
        if (cellID == Game.playerCellID) {
            return 0;
        }
        Game.createCallback(callbackID, parentCallbackID, [cellID], Game.loadCellResponse);
        Game.getCell(cellID, callbackID);
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    static loadCellResponse(cellID, response, parentCallbackID) {
        if (!response.hasOwnProperty("id")) {
            return 2;
        }
        if (response.id == Game.playerCellID) {
            return 0;
        }
        else {
            Game.unloadCell();
        }
        if (Game.debugMode) console.group(`Running Game.loadCellResponse(${cellID}, ${response["id"]}, ${parentCallbackID})`);
        Game.playerCellID = response.id;
        if (response.skybox == "dayNightCycle") {
            Game.loadSkyMaterial();
            Game.skybox.material.azimuth = response.skyboxAzimuth;
            Game.skybox.material.inclination = response.skyboxInclination;
            Game.ambientLight.intensity = response.ambientLightIntensity;
        }
        else {
            Game.unloadMaterial("dayNightCycle");
        }
        // materials, tiled meshes, collision meshes, meshes, then everything else
        response["backloggedMaterials"].forEach((entry) => {
            if (entry instanceof Array) {
                Game.loadMaterial(...entry);
            }
            else {
                Game.loadMaterial(entry);
            }
        });
        response["meshIDs"].forEach((entry) => {
            if (entry instanceof Array) {
                Game.loadMesh(...entry);
            }
            else {
                Game.loadMesh(entry);
            }
        });
        response["backloggedTiledMeshes"].forEach((entry) => {
            Game.createTiledMesh(...entry);
        });
        response["backloggedCollisionPlanes"].forEach((entry) => {
            Game.createCollisionPlane(...entry);
        });
        response["backloggedCollisionRamps"].forEach((entry) => {
            Game.createCollisionRamp(...entry);
        });
        response["backloggedCollisionWalls"].forEach((entry) => {
            Game.createCollisionWall(...entry);
        });
        response["backloggedMeshes"].forEach((entry) => {
            Game.createMesh(...entry);
        });
        response["backloggedDoors"].forEach((entry) => {
            Game.createDoor(...entry);
        });
        response["backloggedFurniture"].forEach((entry) => {
            Game.createFurnitureInstance(...entry);
        });
        response["backloggedLighting"].forEach((entry) => {
            Game.createLightingInstance(...entry);
        });
        response["backloggedCharacters"].forEach((entry) => {
            Game.createCharacterInstance(...entry);
        });
        response["backloggedItems"].forEach((entry) => {
            Game.createItemInstance(...entry);
        });
        if (Game.debugMode) console.groupEnd();
        Game.runCallbackParent(parentCallbackID);
        Game.setHasRunCallback(parentCallbackID, true);
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
    }
    static enableDebugMode() {
        return Game.setDebugMode(true);
    }
    static disableDebugMode() {
        return Game.setDebugMode(false);
    }
    static setInterfaceMode(interfaceMode = InterfaceModeEnum.NONE) {
        if (Game.interfaceMode == interfaceMode) {
            return 0;
        }
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
        switch (Game.interfaceMode) {
            case InterfaceModeEnum.CHARACTER: {
                Game.gui._hideMenuChildren();
                Game.gui.hideMenu();
                Game.gui.showHUD();
                Game.controls = CharacterControls;
                break;
            }
            case InterfaceModeEnum.DIALOGUE: {
                Game.controls = DialogueControls;
                break;
            }
            case InterfaceModeEnum.MENU: {
                Game.controls = MenuControls;
                break;
            }
            case InterfaceModeEnum.EDIT: {
                Game.gui._hideHUDChildren();
                EditControls.clearPickedMesh();
                EditControls.clearPickedController();
                Game.controls = EditControls;
                break;
            }
        }
        return 0;
    }
    static getInterfaceMode() {
        return Game.interfaceMode;
    }
    static setMeshScaling(mesh, scaling = BABYLON.Vector3.One()) {
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            if (!Game.hasMesh(mesh)) {
                return 2;
            }
            mesh = Game.getMesh(mesh);
        }
        mesh.scaling.copyFrom(scaling);
        return 0;
    }
    static setMeshRotation(mesh, rotation = BABYLON.Vector3.Zero()) {
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            if (!Game.hasMesh(mesh)) {
                return 2;
            }
            mesh = Game.getMesh(mesh);
        }
        mesh.rotation.copyFrom(rotation);
        return 0;
    }
    static setMeshPosition(mesh, position = BABYLON.Vector3.Zero()) {
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            if (!Game.hasMesh(mesh)) {
                return 2;
            }
            mesh = Game.getMesh(mesh);
        }
        mesh.position.copyFrom(position);
        return 0;
    }

    /**
     * Returns whether or not entityB is within distance of entityA
     * @param {EntityController} entityControllerA The entity, with an EntityController
     * @param {EntityController} entityControllerB Its target, with an EntityController
     * @param {number} distance Distance
     * @param {string} parentCallbackID 
     * @param {function} callback 
     */
    static withinRange(entityControllerA, entityControllerB, distance = 0.6, parentCallbackID = null, callback = null) {
        if (!(entityControllerA instanceof EntityController)) {
            entityControllerA = EntityController.get(entityControllerA) || EntityController.get(entityControllerA);
            if (!(entityControllerA instanceof EntityController)) {
                return false;
            }
        }
        if (!(entityControllerB instanceof EntityController)) {
            entityControllerB = EntityController.get(entityControllerB) || EntityController.get(entityControllerB);
            if (!(entityControllerB instanceof EntityController)) {
                return false;
            }
        }
        if (distance <= 0) {
            distance = entityControllerA.height;
            if (entityControllerB.height > distance) {
                distance = entityControllerB.height;
            }
            distance = distance * 0.5; // assuming arm length is half of the standard body height, idk
        }
        if (parentCallbackID == null) {
            return entityControllerA.collisionMesh.position.equalsWithEpsilon(entityControllerB.collisionMesh.position, distance);
        }
        else {
            let callbackID = Tools.genUUIDv4();
            Game.createCallback(callbackID, parentCallbackID, [entityControllerA, entityControllerB, distance], callback);
            Game.transformsWorkerPostMessage("withinRange", 0, {"entityControllerA":entityControllerA, "entityControllerB":entityControllerB, "distance":distance})
            return callbackID;
        }
    }
    /**
     * Whether or not entityB is in entityA's point of view (epislon value)
     * @param {EntityController} entityControllerA The entity that's looking, with an EntityController
     * @param {EntityController} entityControllerB Its target, with an EntityController
     * @param {number} epsilon Episode in radians
     * @param {string} parentCallbackID 
     * @param {function} callback 
     */
    static inFrontOf(entityControllerA, entityControllerB, epsilon = 0.3926991, parentCallbackID = null, callback = null) {
        if (!(entityControllerA instanceof EntityController)) {
            entityControllerA = EntityController.get(entityControllerA) || EntityController.get(entityControllerA);
            if (!(entityControllerA instanceof EntityController)) {
                return false;
            }
        }
        if (!(entityControllerB instanceof EntityController)) {
            entityControllerB = EntityController.get(entityControllerB) || EntityController.get(entityControllerB);
            if (!(entityControllerB instanceof EntityController)) {
                return false;
            }
        }
        if (parentCallbackID == null) {
            let aPos = new BABYLON.Vector2(entityControllerA.collisionMesh.position.x, entityControllerA.collisionMesh.position.z);
            let bPos = entityControllerA.collisionMesh.calcMovePOV(0, 0, 1);
            bPos = aPos.add(new BABYLON.Vector2(bPos.x, bPos.z));
            let cPos = new BABYLON.Vector2(entityControllerB.collisionMesh.position.x, entityControllerB.collisionMesh.position.z);
            let bAng = BABYLON.Angle.BetweenTwoPoints(aPos, bPos);
            let aAng = BABYLON.Angle.BetweenTwoPoints(aPos, cPos);
            return aAng.radians() - bAng.radians() <= epsilon;
        }
        else {
            let callbackID = Tools.genUUIDv4();
            Game.createCallback(callbackID, parentCallbackID, [entityControllerA, entityControllerB, epsilon], callback);
            Game.transformsWorkerPostMessage("inFrontOf", 0, {"entityControllerA":entityControllerA, "entityControllerB":entityControllerB, "epsilon":epsilon});
            return callbackID;
        }
    }
    /**
     * 
     * @param {string} shape CYLINDER, CONE, SPHERE, CUBE
     * @param {number} diameter 
     * @param {number} height 
     * @param {number} depth 
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} rotation 
     * @param {(string|null)} parentCallbackID 
     * @param {(function|null)} callback 
     */
    static inArea(shape = "CUBE", diameter = 1.0, height = 1.0, depth = 1.0, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), parentCallbackID = null, callback = Game.inAreaResponse) {
        let callbackID = Tools.genUUIDv4();
        position = Game.filterVector3(position);
        rotation = Game.filterVector3(rotation);
        Game.createCallback(callbackID, parentCallbackID, [shape, diameter, height, depth, position, rotation], callback);
        Game.transformsWorkerPostMessage("inArea", 0, {"shape":shape, "diameter":diameter, "height":height, "depth":depth, "position":position.toOtherArray(), "rotation":rotation.toOtherArray()}, callbackID);
        return callbackID;
    }
    static inAreaResponse(shape, diameter, height, depth, position, rotation, response, parentCallbackID) {
        if (Game.debugMode) BABYLON.Tools.Log(response);
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
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [diameter, force, position, rotation, distanceLimit, hitLimit, meshID, materialID], callback);
        Game.transformsWorkerPostMessage("inProjectPath", 0, {"diameter":diameter, "force":force, "position":position, "rotation":rotation, "distanceLimit":distanceLimit, "hitLimit":hitLimit}, callbackID);
        return callbackID;
    }
    static fireProjectileResponse(diamter, force, position, rotation, distanceLimit, hitLimit, meshID, materialID, response, parentCallbackID) {
        return 0;
    }

    static createGroupedCallback(parentID, callbackID) {
        if (!Game.hasGroupedCallback(parentID)) {
            Game.groupedCallbacks[parentID] = {"callbackIDs":[], "hasRun": false,};
        }
        return Game.setGroupedCallback(parentID, callbackID);
    }
    static setGroupedCallback(parentID, callbackID) {
        if (Game.hasGroupedCallback(parentID)) {
            Game.getGroupedCallback(parentID)["callbackIDs"].push(callbackID);
        }
        return 0;
    }
    static getGroupedCallback(id) {
        if (Game.groupedCallbacks.hasOwnProperty(id)) {
            return Game.groupedCallbacks[id];
        }
        return 1;
    }
    static hasGroupedCallback(id) {
        return Game.groupedCallbacks.hasOwnProperty(id);
    }
    static removeGroupedCallback(id) {
        if (!Game.hasGroupedCallback(id)) {
            return 1;
        }
        delete Game.groupedCallbacks[id]["hasRun"];
        Game.groupedCallbacks[id]["callbackIDs"].clear();
        delete Game.groupedCallbacks[id]["callbackIDs"];
        delete Game.groupedCallbacks[id];
        return 0;
    }
    /**
     * 
     * @param {string} id 
     * @param {(object|null)} [response] 
     */
    static runGroupedCallback(id, response = null) {
        if (!Game.hasGroupedCallback(id)) {
            return 1;
        }
        let groupedCallback = Game.getGroupedCallback(id);
        if (groupedCallback["hasRun"]) {
            return 0;
        }
        groupedCallback["hasRun"] = true;
        if (Game.debugMode) console.group(`Running Game.runGroupedCallback(${id}, ${response})`);
        if (groupedCallback["callbackIDs"].length > 0) {
            groupedCallback["callbackIDs"].forEach((entry) => {
                Game.runCallback(entry, response);
            });
        }
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    /**
     * 
     * @param {string} id Callback ID
     * @param {(string|undefined)} parentID ID of parent callback, if any
     * @param {function} callback Function to call
     * @param {object} params Params to pass
     */
    static createCallback(id = "", parentID = null, params = [], callback = null) {
        id = Tools.filterID(id, Tools.genUUIDv4());
        if (!(params instanceof Array)) {
            params = [params];
        }
        if (Game.debugMode) BABYLON.Tools.Log(`Running Game.createCallback(${id}, ${parentID}, ${params.toString()}, function())`);
        Game.callbacks[id] = {"parent":parentID, "params":params, "callback":callback, "hasRun":false, "status":0};
        return id;
    }
    static removeCallback(id) {
        delete Game.callbacks[id]["parent"];
        delete Game.callbacks[id]["params"];
        delete Game.callbacks[id]["callback"];
        delete Game.callbacks[id]["hasRun"];
        delete Game.callbacks[id];
        return 0;
    }
    static getCallback(id) {
        if (Game.callbacks.hasOwnProperty(id)) {
            return Game.callbacks[id];
        }
        return 1;
    }
    static getCallbacks(parent = null, callback = null, hasRun = null, status = null) {
        let obj = {};
        for (let entry in Game.callbacks) {
            if (
                (parent == null || parent == Game.callbacks[entry]["parent"]) &&
                (callback == null || callback == Game.callbacks[entry]["callback"]) &&
                (hasRun == null || hasRun == Game.callbacks[entry]["hasRun"]) &&
                (status == null || status == Game.callbacks[entry]["status"])
            ) {
                obj[entry] = Game.callbacks[entry];
            }
        }
        return obj;
    }
    static hasCallback(id) {
        return Game.callbacks.hasOwnProperty(id);
    }
    /**
     * 
     * @param {string} id 
     * @param {(object|null)} [response] 
     * @param {boolean} [flipRun] Check and flip run boolean
     */
    static runCallback(id, response = null, flipRun = true, recursive = false) {
        if (!Game.hasCallback(id)) {
            return 1;
        }
        let callback = Game.getCallback(id);
        if (!callback["hasRun"]) {
            if (Game.debugMode) console.group(`Running Game.runCallback(${id}, ${response})`);
            if (typeof callback["callback"] == "function") {
                callback["callback"](...callback["params"], response, id);
            }
            if (flipRun) {
                callback["hasRun"] = true;
            }
        }
        if (recursive) {
            Game.runCallback(callback["parent"], response, flipRun, recursive)
        }
        if (Game.debugMode) console.groupEnd();
        return 0;
    }
    /**
     * 
     * @param {string} id 
     * @param {(object|null)} [response] 
     */
    static runCallbackParent(id, response = null) {
        if (Game.callbacks.hasOwnProperty(id)) {
            if (Game.callbacks.hasOwnProperty(Game.callbacks[id]["parent"])) {
                Game.runCallback(Game.callbacks[id]["parent"], response);
            }
        }
        return 0;
    }
    static hasRunCallback(id) {
        return Game.callbacks.hasOwnProperty(id) && Game.callbacks[id]["hasRun"] === true;
    }
    static setHasRunCallback(id, hasRun = true) {
        if (Game.hasCallback(id)) {
            Game.getCallback(id)["hasRun"] = (hasRun === true);
        }
        return 0;
    }
    static purgeCallbacks() { // TODO: this, occasionally
        for (let callbackID in Game.callbacks) {
            if (Game.callbacks[callbackID].hasRun) {
                Game.removeCallback(callbackID);
            }
        }
    }

    static tickWorkerOnMessage(event) {
        if (!event.data.hasOwnProperty("cmd")) {
            return 2;
        }
        switch (event.data.cmd) {
            case "sendInfo": {
                // TODO: recalculate all scheduled events, or find a way so I don't have to (by using ticks, rounds, and turns) :v
                Game.currentTick = event.data["msg"][0];
                Game.gameTimeMultiplier = event.data["msg"][1];
                Game.ticksPerTurn = event.data["msg"][2];
                Game.turnsPerRound = event.data["msg"][3];
                Game.turnTime = event.data["msg"][4];
                Game.roundTime = event.data["msg"][5];
                break;
            }
            case "sendTimestamp": {
                Game.currentTime = event.data["msg"][0];
                if (Game.playerCellID != null) {
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
                if (Game.callbacks.hasOwnProperty(callbackID)) {
                    let controllers = [];
                    for (let i in message) {
                        if (EntityController.has(message[i])) {
                            controllers.push(EntityController.get(message[i]));
                        }
                    }
                    Game.runCallback(callbackID, controllers);
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
        let status = event.data["sta"];
        if (Game.debugMode) console.info(`with command (${event.data["cmd"]})`);
        let callbackID = event.data["callbackID"];
        if (Game.debugMode) console.info(`and callbackID (${callbackID})`);
        let message = event.data["msg"];
        if (Game.debugMode && message) console.info(`and message`);
        switch (event.data["cmd"]) {
            case "actionAttack":
            case "actionClose":
            case "actionDrop":
            case "actionEquip":
            case "actionOpen":
            case "actionUnequip": {
                Game.runCallback(callbackID, message);
                break;
            }
            case "actionTalk": {
                if (status == 0) {
                    let json = JSON.parse(message);
                    Game.runCallback(callbackID, json);
                }
                else {
                    Game.callbacks[callbackID]["hasRun"] = true;
                    Game.callbacks[callbackID]["status"] = 2;
                }
                break;
            }
            case "createCharacterEntity":
            case "createCharacterInstance":
            case "createDoorEntity":
            case "createFurnitureEntity":
            case "createFurnitureInstance":
            case "createItemInstance":
            case "createLightingEntity":
            case "createLightingInstance":
            case "createPlantInstance": {
                if (status == 0 && message != null) {
                    if (message.hasOwnProperty("id")) {
                        Game.cachedEntities[message.id] = message;
                        Game.runCallback(callbackID, message);
                    }
                    else {
                        Game.callbacks[callbackID]["hasRun"] = true;
                        Game.callbacks[callbackID]["status"] = 2;
                    }
                }
                else if (Game.hasCallback(callbackID)) {
                    Game.callbacks[callbackID]["hasRun"] = true;
                    Game.callbacks[callbackID]["status"] = 1;
                }
                break;
            }
            case "createItemInstanceAtController": {
                Game.createItemInstanceAtController(message["entityID"], message["entityID"], message["controllerID"]);
                break;
            }
            case "doDeath": {
                if (status == 0) {
                    if (EntityController.has(message["controllerID"])) {
                        EntityController.get(message["controllerID"]).doDeath();
                    }
                }
                break;
            }
            case "doLay": {
                if (status == 0) {
                    if (EntityController.has(message["controllerID"])) {
                        EntityController.get(message["controllerID"]).doLay();
                    }
                }
                break;
            }
            case "doProne": {
                if (status == 0) {
                    if (EntityController.has(message["controllerID"])) {
                        EntityController.get(message["controllerID"]).doProne();
                    }
                }
                break;
            }
            case "doSit": {
                if (status == 0) {
                    if (EntityController.has(message["controllerID"])) {
                        EntityController.get(message["controllerID"]).doSit();
                    }
                }
                break;
            }
            case "doStand": {
                if (status == 0) {
                    if (EntityController.has(message["controllerID"])) {
                        EntityController.get(message["controllerID"]).doStand();
                    }
                }
                break;
            }
            case "getCell": {
                for (let cellID in message) {
                    let json = JSON.parse(message[cellID]);
                    Game.setCachedCell(cellID, json);
                    Game.runCallback(callbackID, json);
                }
                break;
            }
            case "getDialogue": {
                if (status == 0) {
                    if (message instanceof Object) {
                        for (let entry in message) {
                            if (typeof message[entry] == "string") {
                                let json = JSON.parse(message[entry]);
                                Game.setCachedDialogue(entry, json);
                                Game.runCallback(callbackID, json);
                            }
                        }
                    }
                    else {
                        if (typeof message == "string") {
                            let json = JSON.parse(message);
                            Game.setCachedDialogue(json.id, json);
                            Game.runCallback(callbackID, json);
                        }
                    }
                }
                break;
            }
            case "getEntity": {
                if (status == 0) {
                    if (typeof message == "string") {
                        let json = JSON.parse(message);
                        Game.setCachedEntity(json.id, json);
                        Game.runCallback(callbackID, json);
                    }
                }
                break;
            }
            case "getEntities": {
                if (status == 0) {
                    if (message instanceof Object) {
                        for (let entry in message) {
                            if (typeof message[entry] == "string") {
                                let json = JSON.parse(message[entry]);
                                Game.setCachedEntity(entry, json);
                                Game.runCallback(callbackID, json);
                            }
                        }
                    }
                }
                break;
            }
            case "getEquipment": {
                if (status == 0) {
                    let target = null;
                    if (Game.hasCallback(callbackID)) {
                        let callback = Game.getCallback(callbackID);
                        if (callback["params"].length == 1 && callback["params"][0].hasOwnProperty("entityID")) {
                            target = callback["params"][0]["entityID"];
                        }
                    }
                    for (let entry in message) {
                        let json = JSON.parse(message[entry]);
                        Game.updateCachedEntity(json.id, json);
                        if (entry == target) {
                            Game.runCallback(callbackID, json);
                        }
                    }
                }
                break;
            }
            case "getInventory": {
                if (status == 0) {
                    let target = null;
                    if (Game.hasCallback(callbackID)) {
                        let callback = Game.getCallback(callbackID);
                        if (callback["params"].length == 1 && callback["params"][0].hasOwnProperty("entityID")) {
                            target = callback["params"][0]["entityID"];
                        }
                    }
                    for (let entry in message) {
                        let json = JSON.parse(message[entry]);
                        Game.updateCachedEntity(json.id, json);
                        if (entry == target) {
                            Game.runCallback(callbackID, json);
                        }
                    }
                }
                break;
            }
            case "getMoney": {
                if (status == 0) {
                    let amount = Number.parseFloat(message["amount"]) || 0;
                    Game.gui.chat.appendOutput(`${message["targetName"]} has \$${amount}.`);
                }
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
            case "loadCellAndSetPlayerAt": {
                let newCallbackID = Tools.genUUIDv4();
                Game.createCallback(newCallbackID, callbackID, ["player", Game.gui._nameInput.text, "It you :v", "genericCharacterIcon", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FOX, SexEnum.MALE, Game.gui._ageInput.text, "foxM", "foxRed", message["position"], message["rotation"], undefined, {eyes:EyeEnum.CIRCLE, eyesColour:"green"}], Game.createPlayer);
                Game.setPlayerCell(message["cellID"], newCallbackID);
                break;
            }
            case "removeItem": {
                if (status == 0) {
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
                }
                break;
            }
            case "setControllerEntity": {
                if (message instanceof Array) {
                    message.forEach((entry) => {
                        if (EntityController.has(entry["controllerID"])) {
                            EntityController.get(entry["controllerID"]).setEntityID(entry["entityID"].id);
                        }
                    });
                }
                break;
            }
            case "setDialogue": {
                if (status == 0) {
                    if (typeof message == "string") {
                        let json = JSON.parse(message);
                        Game.setCachedDialogue(json.id, json);
                        Game.runCallback(callbackID, json);
                    }
                }
                break;
            }
            case "setMoney": {
                if (status == 0) {
                    Game.gui.chat.appendOutput(`${message["targetName"]} has had their money set to \$${message["amount"]}.`);
                }
                break;
            }
            case "updateEntity": {
                if (status == 0) {
                    if (message instanceof Object) {
                        for (let entry in message) {
                            if (typeof message[entry] == "string") {
                                let json = JSON.parse(message[entry]);
                                Game.setCachedEntity(entry, json);
                            }
                        }
                    }
                    else {
                        if (typeof message == "string") {
                            let json = JSON.parse(message);
                            Game.setCachedEntity(json.id, json);
                        }
                    }
                }
                break;
            }
        }
        if (Game.debugMode) console.groupEnd();
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

    static getCachedCell(id) {
        if (Game.cachedCells.hasOwnProperty(id)) {
            return Game.cachedCell[id];
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
    static setCachedCell(id, object) {
        Game.cachedCells[id] = object;
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
        if (!Game.cachedEntities.hasOwnProperty(id)) {
            return Game.getEntity(id);
        }
        if (EntityController.has(id)) {
            EntityController.get(id).updateFromEntity(object);
        }
        let containerLength = 0; // fug it, create this on every update, i'm too lazy to think rn :v
        if (Game.cachedEntities.hasOwnProperty(id)) {
            if (Game.cachedEntities[id].hasContainer) {
                containerLength = Game.cachedEntities[id]["container"]["size"];
            }
        }
        Object.assign(Game.cachedEntities[id], object);
        if (!Game.hasPlayerController()) {
            return 0;
        }
        if (Game.playerController.hasTarget() && Game.playerController.target.id == id) {
            Game.gui.targetPortrait.update();
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
        return 0;
    }
    static setCachedEntity(id, object) {
        if (Game.cachedEntities.hasOwnProperty(id)) {
            return Game.updateCachedEntity(id, object);
        }
        Game.cachedEntities[id] = object;
        let controller = EntityController.get(object.controller);
        if (controller == 1) {
            return 0;
        }
        controller.assign(object, false);
        return 0;
    }

    static getCell(id, callbackID) {
        if (!(id instanceof Object)) {
            id = [id];
        }
        callbackID = Tools.filterID(callbackID);
        Game.entityLogicWorkerPostMessage("getCell", 0, id, callbackID);
        return 0;
    }
    static getDialogue(id = "", targetController = Game.playerController.getTarget(), actorController = Game.playerController, callbackID = null) {
        if (!(id instanceof Object)) {
            id = [id];
        }
        targetController = Game.filterController(targetController);
        actorController = Game.filterController(actorController);
        callbackID = Game.filterID(callbackID);
        Game.entityLogicWorkerPostMessage("getDialogue", 0, {"dialogueID": id, "targetID": targetController.entityID, "actorID": actorController.entityID}, callbackID);
        return 0;
    }
    static setDialogue(id = "", targetController = Game.playerController.getTarget(), actorController = Game.playerController, parentCallbackID = null) {
        id = Tools.filterID(id);
        targetController = Game.filterController(targetController);
        actorController = Game.filterController(actorController);
        parentCallbackID = Game.filterID(parentCallbackID);
        let callbackID = Tools.genUUIDv4();
        Game.createCallback(callbackID, parentCallbackID, [id, targetController, actorController], Game.gui.dialogue.set)
        Game.entityLogicWorkerPostMessage("setDialogue", 0, {"dialogueID": id, "targetID": targetController.entityID, "actorID": actorController.entityID}, callbackID);
        return 0;
    }
    static getEntity(id, callbackID) {
        if (!(id instanceof Object)) {
            id = [id];
        }
        callbackID = Game.filterID(callbackID);
        Game.entityLogicWorkerPostMessage("getEntity", 0, id, callbackID);
        return 0;
    }

    static updateSkybox() {
        if (Game.skybox instanceof BABYLON.AbstractMesh && Game.skybox.material instanceof BABYLON.SkyMaterial) {
            Game.skybox.material.azimuth = (Game.currentTime - 21600) % 86400 / 86400;
            Game.skybox.material.luminance = (2 + Math.cos(4 * Math.PI * ((Game.currentTime - 21600) % 86400 / 86400))) / 5;
        }
    }
    static updateDebugCollisionList(target = Game.playerController) {
        
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
        setTimeout(function() {Game.playEnvironmentSoundFX("hit", {"loop": true, "autoplay": true});}, 1169);
        setTimeout(function() {Game.playEnvironmentSoundFX("hit", {"loop": true, "autoplay": true});}, 2420);
        setTimeout(function() {Game.playEnvironmentSoundFX("hit", {"loop": true, "autoplay": true});}, 3666);
        return 0;
    }
}