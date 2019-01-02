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

        /**
         * Map of Mesh file locations per ID
         * eg, {"foxM":"resources/data/characters.babylon"}
         * @type {<String, String>}
         */
        this.meshLocations = {
            "foxM":"resources/data/characters.babylon",
            "foxF":"resources/data/characters.babylon",
            "foxSkeletonN":"resources/data/characters.babylon",
            "spiritN":"resources/data/characters.babylon",
            "spider":"resources/data/arachnids.babylon",
            "exclamationMark":"resources/data/misc.babylon",
            "questionMark":"resources/data/misc.babylon",
            "pylon01":"resources/data/misc.babylon",
            "obelisk01":"resources/data/misc.babylon",
            "obelisk02":"resources/data/misc.babylon",
            "tombstone01":"resources/data/misc.babylon",
            "tombstone02":"resources/data/misc.babylon",
            "coffinComplex":"resources/meshes/coffinComplex.babylon",
            "refrigeratorComplex":"resources/meshes/refrigeratorComplex.babylon",
            "borb":"resources/meshes/borb.babylon",
            "pylon":"resources/meshes/pylon.babylon",
            "barrel":"resources/meshes/barrel.babylon"
        };
        /**
         * Map of Meshes per ID
         * eg, {"ring01":{ring01 Mesh}, "ring02":{...}}
         * @type {<String, BABYLON.Mesh>}
         */
        this.loadedMeshes = {};
        /**
         * Map of Texture file locations per ID
         * eg, {"foxRed":"resources/images/textures/characters/foxRed.svg"}
         * @type {<String, String>}
         */
        this.textureLocations = {
            "missingTexture":"resources/images/textures/static/missingTexture.svg",
            "carpetPink01":"resources/images/textures/static/carpetPink01.png",
            "carpetBlack01":"resources/images/textures/static/carpetBlack01.png",
            "checkerLinoleumFloor01":"resources/images/textures/static/checkerLinoleumFloor01.png",
            "woodenFloorDark01-DIFFUSE":"resources/images/textures/static/woodenFloorDark01-DIFFUSE.png",
            "woodenFloorDark01-BUMP":"resources/images/textures/static/woodenFloorDark01-BUMP.png",
            "woodenFloorDark01-NORMAL":"resources/images/textures/static/woodenFloorDark01-NORMAL.png",
            "foxRed":"resources/images/textures/characters/foxRed.svg",
            "foxCorsac":"resources/images/textures/characters/foxCorsac.svg",
            "foxRinehart":"resources/images/textures/characters/foxRinehart.svg",
            "spirit":"resources/images/textures/characters/spirit.png",
            "packStreetChapter23":"resources/images/textures/items/packStreetChapter23.svg",
            "packStreetChapter24":"resources/images/textures/items/packStreetChapter24.svg",
            "oblongEye":"resources/images/textures/items/oblongEye.svg",
            "feralEyeYellow":"resources/images/textures/items/feralEyeYellow.svg",
            "feralEyeGreen":"resources/images/textures/items/feralEyeGreen.svg",
            "feralEyeBlue":"resources/images/textures/items/feralEyeBlue.svg",
            "feralEye":"resources/images/textures/items/feralEye.svg",
            "cross01":"resources/images/textures/items/cross01.svg",
            "ring02GoldBrokenRuby":"resources/images/textures/items/ring02GoldBrokenRuby.svg",
            "ring02Gold":"resources/images/textures/items/ring02Gold.svg",
            "ring02Silver":"resources/images/textures/items/ring02Silver.svg",
            "ring02SilverBrokenRuby":"resources/images/textures/items/ring02SilverBrokenRuby.svg",
            "bottle03RedSarcophagusJuice":"resources/images/textures/items/bottle03RedSarcophagusJuice.svg",
            "bottle03Red":"resources/images/textures/items/bottle03Red.svg",
            "bottle03Blue":"resources/images/textures/items/bottle03Blue.svg",
            "bottle03Purple":"resources/images/textures/items/bottle03Purple.svg",
            "bottle03White":"resources/images/textures/items/bottle03White.svg",
            "theLesserKeyOfSolomon":"resources/images/textures/items/theLesserKeyOfSolomon.svg",
            "metalIron01":"resources/images/textures/items/metalIron01.png",
            "feralEyeViolet":"resources/images/textures/items/feralEyeViolet.svg",
            "circularEyeViolet":"resources/images/textures/items/circularEyeViolet.svg",
            "circularEyeBlue":"resources/images/textures/items/circularEyeBlue.svg",
            "circularEyeGreen":"resources/images/textures/items/circularEyeGreen.svg",
            "vChocolateV":"resources/images/textures/items/vChocolateV.svg",
            "dice":"resources/images/textures/items/dice.svg",
            "bookshelfBlackPlywood":"resources/images/textures/furniture/bookshelfBlackPlywood.svg",
            "woodenMallet":"resources/images/textures/items/woodenMallet.svg",
            "bone01":"resources/images/textures/items/bone01.svg",
            "greenWallpaperPlainWood":"resources/images/textures/static/greenWallpaperPlainWood.png",
            "plainDoor":"resources/images/textures/static/plainDoor.svg"
        };
        /**
         * Map of Textures per ID
         * eg, {"ring01Silver":{ring01Silver Texture}, "ring01Gold":{...}}
         * @type {<String, BABYLON.Texture>}
         */
        this.loadedTextures = {};
        /**
         * Map of Materials per ID
         * @type {<String, BABYLON.Material>}
         */
        this.loadedMaterials = {};
        /**
         * Map of Icon file locations per ID
         * eg, {"rosie":"resources/images/icons/characters/rosie.png"}
         * @type {<String, String>}
         */
        this.iconLocations = {
            "missingIcon":"resources/images/icons/static/missingIcon.svg",
            "genericItem":"resources/images/icons/items/genericItem.svg",
            "pandorasBoxLocationKey":"resources/images/icons/items/pandorasBoxLocationKey.svg",
            "key":"resources/images/icons/items/key.svg",
            "packstreet23StrangeNewDay":"resources/images/icons/items/packstreet23StrangeNewDay.png",
            "cross01":"resources/images/icons/items/cross01.png",
            "ring01Silver":"resources/images/icons/items/ring01Silver.png",
            "ring02Gold":"resources/images/icons/items/ring02Gold.png",
            "ring01Gold":"resources/images/icons/items/ring01Gold.png",
            "bottle05RedSarcophagusJuice":"resources/images/icons/items/bottle05RedSarcophagusJuice.png",
            "bottle04RedSarcophagusJuice":"resources/images/icons/items/bottle04RedSarcophagusJuice.png",
            "bottle03RedSarcophagusJuice":"resources/images/icons/items/bottle03RedSarcophagusJuice.png",
            "bottle03Jarate":"resources/images/icons/items/bottle03Jarate.png",
            "theLesserKeyOfSolomon":"resources/images/icons/items/theLesserKeyOfSolomon.png",
            "mountainChocolate01":"resources/images/icons/items/mountainChocolate01.png",
            "knife":"resources/images/icons/items/knife.png",
            "cudgel":"resources/images/icons/items/cudgel.png",
            "morningstar":"resources/images/icons/items/morningstar.png",
            "wizardHat02":"resources/images/icons/items/wizardHat02.png",
            "barbuteHorned":"resources/images/icons/items/barbuteHorned.png",
            "heatershield02":"resources/images/icons/items/heatershield02.png",
            "heatershield01":"resources/images/icons/items/heatershield01.png",
            "roundshield":"resources/images/icons/items/roundshield.png",
            "parmashield":"resources/images/icons/items/parmashield.png",
            "scutumshield":"resources/images/icons/items/scutumshield.png",
            "mallet":"resources/images/icons/items/mallet.png",
            "warhammer01":"resources/images/icons/items/warhammer01.png",
            "harpe":"resources/images/icons/items/harpe.png",
            "gladius":"resources/images/icons/items/gladius.png",
            "plate":"resources/images/icons/items/plate.png",
            "glass01":"resources/images/icons/items/glass01.png",
            "goblet01":"resources/images/icons/items/goblet01.png",
            "cup01":"resources/images/icons/items/cup01.png",
            "staff01":"resources/images/icons/items/staff01.png",
            "staff04":"resources/images/icons/items/staff04.png",
            "staff02":"resources/images/icons/items/staff02.png",
            "staff03":"resources/images/icons/items/staff03.png",
            "staff05":"resources/images/icons/items/staff05.png",
            "wand01":"resources/images/icons/items/wand01.png",
            "wand02":"resources/images/icons/items/wand02.png",
            "wand03":"resources/images/icons/items/wand03.png",
            "shortsword":"resources/images/icons/items/shortsword.png",
            "sword":"resources/images/icons/items/sword.png",
            "katana":"resources/images/icons/items/katana.png",
            "greatsword":"resources/images/icons/items/greatsword.png",
            "executionersword":"resources/images/icons/items/executionersword.png",
            "key01":"resources/images/icons/items/key01.png",
            "key02":"resources/images/icons/items/key02.png",
            "foxSkeletonHead":"resources/images/icons/items/foxSkeletonHead.png",
            "foxM01Head":"resources/images/icons/items/foxM01Head.png",
            "foxM02Head":"resources/images/icons/items/foxM02Head.png",
            "cap":"resources/images/icons/items/cap.png",
            "trumpet01":"resources/images/icons/items/trumpet01.png",
            "birdMask01":"resources/images/icons/items/birdMask01.png",
            "rosie":"resources/images/icons/characters/rosie.png",
            "charlie":"resources/images/icons/characters/charlie.svg",
            "genericCharacter":"resources/images/icons/characters/genericCharacter.svg",
            "nickWilde":"resources/images/icons/characters/nickWilde.svg",
            "foxFfoxCorsac":"resources/images/icons/characters/foxFfoxCorsac.png",
            "foxMfoxRed":"resources/images/icons/characters/foxMfoxRed.png",
            "foxMfoxCorsac":"resources/images/icons/characters/foxMfoxCorsac.png",
            "foxFfoxRed":"resources/images/icons/characters/foxFfoxRed.png",
            "aardwolfMfoxCorsac":"resources/images/icons/characters/aardwolfMfoxCorsac.png",
            "spiritN":"resources/images/icons/characters/spiritN.png",
            "skeletonN":"resources/images/icons/characters/skeletonN.png",
            "missingIcon":"resources/images/icons/static/missingIcon.svg",
            "fire":"resources/images/icons/effects/fire.png",
            "plainDoor":"resources/images/icons/static/plainDoor.png"
        };
        /**
         * Map of Meshes per Texture IDs per Mesh IDs
         * eg, {"ring01":{"ring01Silver":{ring01 Mesh with ring01Silver Texture}, "ring01Gold":{ring01 Mesh with ring01Gold Texture}}, "ring02":{...}}
         * @type {<String, <String, BABYLON.Mesh>>}
         */
        this.loadedMeshMaterials = {};
        /**
         * Map of Instanced Meshes per ID
         * @type {<String, BABYLON.InstancedMesh>}
         */
        this.instancedMeshes = {};
        /**
         * Map cloned Meshes per ID
         * @type {<String, BABYLON.Mesh>}
         */
        this.clonedMeshes = {};
        this.meshAttachToBoneModifications = {
            "bookHardcoverClosed01":{
                "hand.r":{
                    "position":{
                        "x":0,
                        "y":0,
                        "z":0.125
                    }
                },
                "hand.l":{
                    "position":{
                        "x":0,
                        "y":0,
                        "z":0.125
                    }
                }
            }
        };
        /**
         * Map of Meshes that are waiting to be created
         * @type {<String, <Objects...>>}
         */
        this.meshesToCreateCounter = 0;
        this.meshesToCreate = {};
        this.texturesToCreateCounter = 0;
        this.texturesToCreate = {};
        this.materialsToCreateCounter = 0;
        this.materialsToCreate = {};
        /**
         * Map of Furniture that are waiting to be created
         * @type {<String, <String:id, String:name, String:mesh, String:texture, String:type, String:options, String:position, String:rotation, String:scaling, Boolean:createCollisionMesh>}
         */
        this.furnitureToCreateCounter = 0;
        this.furnitureToCreate = {};
        /**
         * Map of Doors that are waiting to be created;
         * it's basically the same as furnitureToCreate :v
         * @type {<String, <String:id, String:name, Forgot:to, String:mesh, String:texture, String:options, String:position, String:rotation, String:scaling>}
         */
        this.doorsToCreateCounter = 0;
        this.doorsToCreate = {};
        /**
         * Map of Characters that are waiting to be created;
         * it's basically the same as furnitureToCreate :v
         * @type {<String, <String:id, String:name, String:description, String:image, Number:age, Number:sex, String:species, String:mesh, String:texture, String:options, String:position, String:rotation, String:scaling>}
         */
        this.charactersToCreateCounter = 0;
        this.charactersToCreate = {};
        this.itemsToCreateCounter = 0;
        this.itemsToCreate = {};

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
        this.weaponEntities = {};
        this.keyEntities = {};
        this.spellEntities = {};

        this.instancedEntities = {};
        this.instancedItemEntities = {};

        this.dialogues = {};

        this._finishedInitializing = false;
        this._finishedFirstLoad = false;
        this._finishedScene = false;

        this._collisionMaterial = new BABYLON.Material("collisionMaterial", this.scene);
        //this._collisionMaterial = new BABYLON.StandardMaterial("collisionMaterial", this.scene);

        this.keyboardControls = {};
        this.player = undefined;
        this._castRayTargetIntervalFunction = undefined;
        this._castRayTargetInterval = 250;
        this._pointerLockFunction = undefined;
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
        this.kSpeciesTypes = new Set(["fox", "skeleton"]);
        this.kClothingTypes = new Set(["hat","mask","glasses","earPiercingLeft","earPiercingRight","nosePiercing","lipPiercing","tonguePiercing","neckwear","shirt","gloves","underwear","pants","shoes"]);
        this.kHandTypes = new Set(["fur","pad","hoof","skin"]);
        this.kFeetTypes = this.kHandTypes;
        this.kEyeTypes = new Set(["circle","slit","rectangle","none"]);
        this.kPeltTypes = new Set(["skin","fur","wool","hair"]);
        this.kRoomTypes = new Set(["hallway","lobby","bedroom","livingroom","bathroom","kitchen","diningroom","closet","basement"]);
        this.kFurnitureTypes = new Set(["chair","loveseat","couch","table","shelf","refrigerator","basket"]);
        this.kIntraactionTypes = new Set(["lay","sit","crouch","stand","fly","sleep","move"]);
        this.kInteractionTypes = new Set(["close","consume","drop","equip","hold","look","open","release","take","talk","touch","unequip","use"]);
        this.kActionTypes = new Set([...this.kIntraactionTypes, ...this.kInteractionTypes]);
        this.kConsumableTypes = new Set(["food","drink","medicine","other"]);
        this.kSpecialProperties = new Set(["exists","living","dead","mirror","water","earth","metal","broken","wood","magic","nature","container","charm","bone","jagged","smooth","cursed","blessed","bludgeoning","slashing","piercing","acid","cold","fire","lightning","necrotic","poison"]);

        this.actionTake = new ActionData("take", Game.actionTakeFunction, false);
        this.actionSit = new ActionData("sit", Game.actionSitFunction, false);
        this.actionOpen = new ActionData("open", Game.actionOpenFunction, false);
        this.actionClose = new ActionData("close", Game.actionCloseFunction, false);
        this.actionTalk = new ActionData("talk", Game.actionTalkFunction, false);
        this.actionEquip = new ActionData("equip", Game.actionEquipFunction, false);
        this.actionUnequip = new ActionData("unequip", Game.actionUnequipFunction, false);
        this.XP_MIN = 0;
        this.XP_MAP = 355000;
        this.LEVEL_MIN = 0;
        this.LEVEL_MAX = 20;

        /**
         * Classless should be a broad description for commoner, expert, and noble; it shouldn't be used, unless I'm lazy.
         * @type {Set}
         */
        this.kCharacterClasses = new Set(["bard","cleric","druid","paladin","ranger","sorcerer","warlock","wizard","classless","commoner","expert","noble"]);

        this.kSpellSchools = new Set(["abjuration","conjuration","divination","enchantment","evocation","illusion","necromancy","transmutation","universal"]);

        this.kWeaponSimpleMeleeTypes = new Set(["club","dagger","greatclub","handaxe","javelin","lighthammer","mace","quarterstaff","sickle","spear"]);
        this.kWeaponSimpleRangedTypes = new Set(["lightcrossbow","dart","shortbow","sling"]);
        this.kWeaponMartialMeleeTypes = new Set(["battleaxe","flail","glaive","greataxe","greatsword","halberd","lance","longsword","maul","morningstar","pike","rapier","scimitar","shortsword","trident","warpick","warhammer","whip"]);
        this.kWeaponMartialRangedTypes = new Set(["blowgun","handcrossbow","heavycrossbow","longbow","net"]);
        this.kWeaponMeleeTypes = new Set([...this.kWeaponSimpleMeleeTypes, ...this.kWeaponMartialMeleeTypes]);
        this.kWeaponRangedTypes = new Set([...this.kWeaponSimpleRangedTypes, ...this.kWeaponMartialRangedTypes]);
        this.kWeaponTypes = new Set([...this.kWeaponMeleeTypes, ...this.kWeaponRangedTypes]);

        Game.loadDefaultTextures();
        Game.loadDefaultMaterials();
        Game.loadDefaultMeshes();
        // TODO: add support for other GUIs (that aren't created yet :v, like HTML instead of BABYLON.GUI)
        GameGUI.initialize();
        this.initFreeCamera();
        this.importMeshes("resources/data/furniture.babylon");
        this.importMeshes("resources/data/craftsmanWalls.babylon");
        this.importMeshes("resources/data/characters.babylon");
        this.importMeshes("resources/data/items.babylon");
        this.importMeshes("resources/data/misc.babylon");
        this.initQwertyKeyboardControls();
        this.initPostProcessing();

        this._filesToLoad -= 1;
        this.initialized = true;
    }
    static finishedInitializing() {
        return this._finishedInitializing;
    }
    static finishedFirstLoad() {
        return this._finishedFirstLoad;
    }
    static finishedLoadingFiles() {
        return this._filesToLoad == 0;
    }
    static initPhysics() {
        this.physicsPlugin = new BABYLON.CannonJSPlugin();
        this.scene.enablePhysics(this.scene.gravity, this.physicsPlugin);
        this.physicsEnabled = true;
    }
    static initFollowCamera(_offset = BABYLON.Vector3.Zero()) {
        if (this.camera instanceof BABYLON.Camera) this.camera.dispose();
        this.camera = new BABYLON.ArcRotateCamera(
            "camera",
            -this.player.mesh.rotation.y-4.69,
            Math.PI/2.5,
            3,
            Game.player.getBoneByName("FOCUS").getAbsolutePosition(Game.player.getMesh()),
            this.scene);
        this.camera.collisionRadius = new BABYLON.Vector3(0.1, 0.1, 0.1);
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
            this.camera.ellipsoid = new BABYLON.Vector3(0.1, 1.1, 0.1);
            this.camera.checkCollisions = true;
        }
        this.initPostProcessing();
    }
    static initPlayer(_position = new BABYLON.Vector3(3, 0, -17), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One()) {
        if (Game.debugEnabled) console.log("Running initPlayer");
        this.player = Game.createCharacter(undefined, "Player", undefined, "genericCharacter", 18, "male", "fox", "foxM", "foxRed", undefined, _position, _rotation, _scaling);
        this.player.attachToFOCUS("cameraFocus");
        this.player.attachToLeftEye("eye", "feralEyeGreen");
        this.player.attachToRightEye("eye", "feralEyeGreen");
        this.player.getEntity().addItem(new InstancedItemEntity(undefined, "woodenMallet"));
        this.player.getEntity().addItem(new InstancedItemEntity(undefined, "birdMask"));
        this.player.getMesh().isPickable = false;
        Game.initFollowCamera();
        if (this.player.hasOwnProperty("entity")) {
            GameGUI.setPlayerPortrait(this.player);
        }
        Game.initCastRayInterval();
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
    static loadDefaultTextures() {
        Game.loadTexture("missingTexture");
    }
    static loadDefaultMaterials() {
        Game.loadMaterial(new BABYLON.StandardMaterial("default", Game.scene));
        Game.loadMaterial(new BABYLON.Material("collisionMaterial", Game.scene));
        Game.loadMaterial(new BABYLON.StandardMaterial("missingMaterial", Game.scene));
        Game.loadMaterial(new BABYLON.StandardMaterial("loadingMaterial", Game.scene));
        Game.loadMaterial("missingMaterial", "missingTexture");
        Game.loadedMaterials["loadingMaterial"].diffuseColor = new BABYLON.Color3(1, 0.85, 1);
    }
    static loadDefaultMeshes() {
        Game.loadMesh(BABYLON.MeshBuilder.CreateBox("missingMesh", {height: 0.3, width:0.3, depth:0.3}, Game.scene));
        Game.loadMesh(BABYLON.MeshBuilder.CreateSphere("loadingMesh", {diameter: 0.6}, Game.scene));
        Game.loadedMeshes["missingMesh"].material = Game.loadedMaterials["missingMaterial"];
        Game.loadedMeshes["missingMesh"].setEnabled(false);
        Game.loadedMeshes["loadingMesh"].setEnabled(false);
    }
    static loadTexture(_texture = "") {
        if (_texture == undefined) {
            return null;
        }
        else if (_texture instanceof BABYLON.Texture) {
            if (!this.loadedTextures.hasOwnProperty(_texture.name)) {
                this.loadedTextures[_texture.name] = _texture;
            }
            return _texture;
        }
        else if (typeof _texture == "string") {
            if (this.loadedTextures.hasOwnProperty(_texture)) {
                return this.loadedTextures[_texture];
            }
            else if (this.textureLocations.hasOwnProperty(_texture)) {
                var _newTexture = new BABYLON.Texture(this.textureLocations[_texture], Game.scene);
                _newTexture.name = _texture;
                Game.setLoadedTexture(_texture, _newTexture);
                return _newTexture;
            }
        }
        return null;
    }
    static loadMaterial(_material = "", _texture = undefined, _options = {}) {
        if (_material == undefined) {
            return null;
        }
        else if (_material instanceof BABYLON.Material) {
            if (!this.loadedMaterials.hasOwnProperty(_material.name)) {
                Game.setLoadedMaterial(_material.name, _material);
            }
            return _material;
        }
        else if (typeof _material == "string") {
            _texture = Game.loadTexture(_texture);
            if (this.loadedMaterials.hasOwnProperty(_material)) {
                return this.loadedMaterials[_material];
            }
            else if (!(_texture instanceof BABYLON.Texture)) {
                _texture = Game.loadTexture(_material);
                if (_texture instanceof BABYLON.Texture) {
                    _material = _texture.name;
                }
            }
            if (_texture instanceof BABYLON.Texture) {
                var _newMaterial = new BABYLON.StandardMaterial(_material)
                _newMaterial.name = _texture.name;
                _newMaterial.diffuseTexture = _texture;
                _newMaterial.specularColor.set(0,0,0);
                if (typeof _options == "object") {
                    if (_options.hasOwnProperty("specularColor")) {
                        _newMaterial.specularColor.set(Game.filterVector(_options["specularColor"]));
                    }
                }
                Game.setLoadedMaterial(_material, _newMaterial);
                return _newMaterial;
            }
        }
        return null;
    }
    static loadMesh(_mesh = "") {
        if (_mesh == undefined) {
            return null;
        }
        else if (_mesh instanceof BABYLON.Mesh) {
            if (!this.loadedMeshes.hasOwnProperty(_mesh.name)) {
                this.loadedMeshes[_mesh.name] = _mesh;
            }
            return _mesh;
        }
        else if (typeof _mesh == "string") {
            if (this.loadedMeshes.hasOwnProperty(_mesh)) {
                return this.loadedMeshes[_mesh];
            }
            else if (this.meshLocations.hasOwnProperty(_mesh)) {
                Game.importMeshes(this.meshLocations[_mesh]);
                return this.loadedMeshes["loadingMesh"];
            }
            else {
                return this.loadedMeshes["missingMesh"];
            }
        }
        return null;
    }
    static setLoadedMesh(_id, _mesh) {
        _id = Game.filterID(_id);
        if (_id == undefined) {
            return null;
        }
        if (!(_mesh instanceof BABYLON.Mesh)) {
            return null;
        }
        this.loadedMeshes[_id] = _mesh;
    }
    static setLoadedTexture(_id, _texture) {
        _id = Game.filterID(_id);
        if (_id == undefined) {
            return null;
        }
        if (!(_texture instanceof BABYLON.Texture)) {
            return null;
        }
        this.loadedTextures[_id] = _texture;
    }
    static setLoadedMaterial(_id, _material) {
        _id = Game.filterID(_id);
        if (_id == undefined) {
            return null;
        }
        if (!(_material instanceof BABYLON.Material)) {
            return null;
        }
        this.loadedMaterials[_id] = _material;
    }
    static setLoadedMeshMaterial(_mesh, _material) {
        _mesh = Game.loadMesh(_mesh);
        _material = Game.loadMaterial(_material);
        if (!(_mesh instanceof BABYLON.Mesh) || !(_material instanceof BABYLON.Material)) {
            return null;
        }
        if (!this.loadedMeshMaterials.hasOwnProperty(_mesh.name)) {
            this.loadedMeshMaterials[_mesh.name] = {};
        }
        this.loadedMeshMaterials[_mesh.name][_material.name] = _mesh;
    }
    static addClonedMesh(_mesh, _id = undefined) {
        _id = Game.filterID(_id);
        if (!(_mesh instanceof BABYLON.Mesh)) {
            return undefined;
        }
        if (_id == undefined) {
            _id = _mesh.id;
        }
        this.clonedMeshes[_id] = _mesh;
    }
    static addInstancedMesh(_mesh, _id = undefined) {
        _id = Game.filterID(_id);
        if (!(_mesh instanceof BABYLON.InstancedMesh)) {
            return undefined;
        }
        if (_id == undefined) {
            _id = _mesh.id;
        }
        this.instancedMeshes[_id] = _mesh;
    }
    static getAbstractMesh(_mesh) {
        if (_mesh == undefined) {
            return null;
        }
        else if (_mesh instanceof BABYLON.AbstractMesh) {
            return _mesh;
        }
        else if (typeof _mesh == "string") {
            if (this.loadedMeshes.hasOwnProperty(_mesh)) {
                return this.loadedMeshes[_mesh];
            }
            else if (this.clonedMeshes.hasOwnProperty(_mesh)) {
                return this.clonedMeshes[_mesh];
            }
            else if (this.instancedMeshes.hasOwnProperty(_mesh)) {
                return this.instancedMeshes[_mesh];
            }
        }
        return null;
    }
    static hasAbstractMesh(_mesh) {
        return Game.getAbstractMesh(_mesh) != undefined;
    }
    static hasIcon(_icon) {
        return this.iconLocations.hasOwnProperty(_icon);
    }
    static addIcon(_id, _location) {
        if (Game.hasIcon(_id)) {
            return null;
        }
        this.iconLocations[_id] = _location;
    }
    static getIcon(_id) {
        if (Game.hasIcon(_id)) {
            return this.iconLocations[_id];
        }
        else {
            return this.iconLocations["missingIcon"];
        }
    }
    static importScript(_file) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = _file;
        script.onload = function(){
        };
        document.body.appendChild(script);
    }
    static importProtoItems() {
        Game.importScript("resources/js/items.js");
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
                    this.doEntityAction(this.player.targetController.getEntity(), this.player.getEntity(), this.player.targetController.getEntity().getDefaultAction());
                }
                else if (this.player.targetController.getEntity() instanceof Entity) {
                    this.doEntityAction(this.player.targetController.getEntity(), this.player.getEntity(), this.player.targetController.getEntity().getDefaultAction());
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
                if (GameGUI.menuVisible()) {
                    if (Game.debugEnabled) console.log(`\tShowing HUD`);
                    GameGUI.hideMenu(false);
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
    static createCollisionWall(_posStart = BABYLON.Vector3.Zero(), _posEnd = BABYLON.Vector3.Zero(), _rotation = 0) {
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
        if (_posStart instanceof BABYLON.AbstractMesh) {
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
    static createCollisionRamp(_posStart = BABYLON.Vector3.Zero(), _posEnd = BABYLON.Vector3.Zero(), _rotationY = 0) {
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
        if (!(_mesh instanceof BABYLON.AbstractMesh)) {
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
    static _createBackloggedBoundingCollisions() {
        if (this._assignBoundingBoxCollisionQueue.size > 0) {
            this._assignBoundingBoxCollisionQueue.forEach(function(_mesh) {
                Game._assignBoundingBoxCollisionToMesh(_mesh);
            });
        }
        return true;
    }
    static addItemMesh(_id = undefined, _meshID = undefined, _texture = undefined, _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One(), _forceCreateClone = false) {
        if (Game.debugEnabled) console.log("Running addItemMesh");
        var _instance = Game.createMesh(_id, _meshID, _texture, _position, _rotation, _scaling, _forceCreateClone);
        if (!(_instance instanceof BABYLON.AbstractMesh)) {
            return _instance;
        }
        if (this.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(_instance, _options);
        }
        else {}
        return _instance;
    }
    static addFurnitureMesh(_id = undefined, _meshID = undefined, _texture = undefined, _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One(), _forceCreateClone = false, _createCollisionMesh = true) {
        if (Game.debugEnabled) console.log("Running addFurnitureMesh");
        var _instance = Game.createMesh(_id, _meshID, _texture, _position, _rotation, _scaling, _forceCreateClone);
        if (!(_instance instanceof BABYLON.AbstractMesh)) {
            return _instance;
        }
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
    static addCharacterMesh(_id = undefined, _meshID = undefined, _texture = undefined, _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One()) {
        if (Game.debugEnabled) console.log("Running addCharacterMesh");
        if (typeof _options != "object") {_options = {mass:0.8,restitution:0.1};}
        var _instance = Game.createMesh(_id, _meshID, _texture, _position, _rotation, _scaling);
        if (!(_instance instanceof BABYLON.AbstractMesh)) {
            return _instance;
        }
        if (this.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(_instance, _options);
        }
        else {
            var _boundingBox = _instance.getBoundingInfo().boundingBox;
            _instance.checkCollisions = true;
            /*
                Using X for Z size 'cause the tail throws my collision box size off
             */
            _instance.ellipsoid = new BABYLON.Vector3(_boundingBox.extendSize.x * _scaling.x, _boundingBox.extendSize.y * _scaling.y, (_boundingBox.extendSize.x * 0.6) * _scaling.z);
            _instance.ellipsoidOffset = new BABYLON.Vector3(0, _instance.ellipsoid.y, 0);
        }
        return _instance;
    }
    static removeMesh(_mesh) { // TODO: Update this :v
        if (Game.debugEnabled) console.log("Running removeMesh");
        if (!(_mesh instanceof BABYLON.AbstractMesh)) {
            _mesh = Game.getAbstractMesh(_mesh);
            if (!(_mesh instanceof CharacterController)) {
                return undefined;
            }
        }
        // Don't delete the original meshes
        if (this.loadedMeshes[_mesh.name] == _mesh) {
            return undefined;
        }
        
        _mesh.dispose();
    }
    static hasAvailableMesh(_mesh) {
        if (_mesh instanceof BABYLON.AbstractMesh) {
            _mesh = _mesh.name;
        }
        return this.meshLocations.hasOwnProperty(_mesh);
    }
    static hasLoadedMesh(_mesh) {
        if (_mesh instanceof BABYLON.AbstractMesh) {
            _mesh = _mesh.name;
        }
        return this.loadedMeshes.hasOwnProperty(_mesh);
    }
    static hasMesh(_mesh) {
        if (_mesh instanceof BABYLON.AbstractMesh) {
            _mesh = _mesh.name;
        }
        return this.loadedMeshes.hasOwnProperty(_mesh) || this.meshLocations.hasOwnProperty(_mesh);
    }
    static hasAvailableTexture(_texture) {
        if (_texture instanceof BABYLON.Texture) {
            _texture = _texture.id;
        }
        return this.loadedTextures.hasOwnProperty(_texture);
    }
    static hasLoadedTexture(_texture) {
        return Game.hasAvailableTexture(_texture);
    }
    static hasTexture(_texture) {
        if (_texture instanceof BABYLON.Texture) {
            _texture = _texture.id;
        }
        return this.loadedTextures.hasOwnProperty(_texture) || this.textureLocations.hasOwnProperty(_texture);
    }
    static hasAvailableMaterial(_material) {
        if (_material instanceof BABYLON.Material) {
            _material = _material.id;
        }
        return this.loadedMaterials.hasOwnProperty(_material);
    }
    static hasLoadedMaterial(_material) {
        return Game.hasAvailableMaterial(_material);
    }
    static hasMaterial(_material) {
        return Game.hasAvailableMaterial(_material);
    }
    /**
     * Creates a mesh from those stored in loadedMeshes
     * @param  {String}  _mesh             BABYLON.Mesh, or String ID
     * @param  {String}  _material         BABYLON.Material, or String ID
     * @param  {String}  _id               New ID for BABYLON.Mesh and EntityController
     * @param  {BABYLON.Vector3}  _position         Mesh position
     * @param  {BABYLON.Vector3}  _rotation         Mesh rotation
     * @param  {BABYLON.Vector3}  _scaling          Mesh scaling
     * @param  {Boolean} _forceCreateClone Forces the creation of a clone instead of an instance; workaround for highlighting and attaching to bones.
     * @return {BABYLON.Mesh, BABYLON.InstancedMesh}                    The created mesh
     */
    static createMesh(_id = undefined, _mesh = undefined, _material = undefined, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One(), _forceCreateClone = false) {
        if (Game.debugEnabled) console.log("Running createMesh");
        _id = Game.filterID(_id);
        if (_id == undefined) {
            _id = genUUIDv4();
        }

        var _loadedMesh = Game.loadMesh(_mesh);
        var _loadedMaterial = Game.loadMaterial(_material);
        if (!(_loadedMaterial instanceof BABYLON.Material)) {
            _loadedMaterial = Game.loadedMaterials["missingMaterial"];
        }
        if (!(_position instanceof BABYLON.Vector3)) {
            _position = Game.filterVector(_position);
        }
        if (!(_rotation instanceof BABYLON.Vector3)) {
            _rotation = Game.filterVector(_rotation);
        }
        if (!(_scaling instanceof BABYLON.Vector3)) {
            _scaling = Game.filterVector(_scaling);
        }
        if (_scaling.equals(BABYLON.Vector3.Zero())) {
            _scaling = BABYLON.Vector3.One();
        }
        if (!(_forceCreateClone === true)) {
            _forceCreateClone = false;
        }

        if (_loadedMesh == Game.loadedMeshes["missingMesh"]) {
            return false;
        }
        else if (_loadedMesh == Game.loadedMeshes["loadingMesh"]) {
            Game.addMeshToCreate(_id, _mesh, _material, _position, _rotation, _scaling, _forceCreateClone);
            return true;
        }

        _mesh = _loadedMesh.name;
        _material = _loadedMaterial.name;

        var _newMesh = null;
        if (_loadedMesh.skeleton instanceof BABYLON.Skeleton) {
            _newMesh = _loadedMesh.clone(_id);
            Game.addClonedMesh(_newMesh, _id);
            
            _newMesh.material = _loadedMaterial;
            _newMesh.skeleton = _loadedMesh.skeleton.clone(_id + "Skeleton");
            Game.setLoadedMeshMaterial(_newMesh, _loadedMaterial);
            
            _newMesh.name = _loadedMesh.name;
            _loadedMesh = _newMesh;
        }
        else {
            if (!this.loadedMeshMaterials.hasOwnProperty(_loadedMesh.name)) {
                this.loadedMeshMaterials[_loadedMesh.name] = {};
            }
            if (!this.loadedMeshMaterials[_loadedMesh.name].hasOwnProperty(_loadedMaterial.name)) {
                var _newMesh = _loadedMesh.clone(_loadedMesh.name + _loadedMaterial.name);
                _newMesh.material = _loadedMaterial;
                _newMesh.name = _loadedMesh.name;
                _newMesh.setEnabled(false);
                _newMesh.position.set(0,-4095,0);
                Game.setLoadedMeshMaterial(_newMesh, _loadedMaterial);
            }
            if (_forceCreateClone === true) {
                _newMesh = this.loadedMeshMaterials[_loadedMesh.name][_loadedMaterial.name].clone(_id);
                Game.addClonedMesh(_newMesh, _id);
            }
            else {
                _newMesh = this.loadedMeshMaterials[_loadedMesh.name][_loadedMaterial.name].createInstance(_id);
                Game.addInstancedMesh(_newMesh);
            }
            _newMesh.name = _loadedMesh.name;
            _loadedMesh = _newMesh;
        }
        _loadedMesh.isVisible = true;
        _loadedMesh.position.copyFrom(_position);
        _loadedMesh.rotation = new BABYLON.Vector3(BABYLON.Tools.ToRadians(_rotation.x), BABYLON.Tools.ToRadians(_rotation.y), BABYLON.Tools.ToRadians(_rotation.z));
        _loadedMesh.scaling.copyFrom(_scaling);
        _loadedMesh.collisionMesh = undefined;
        _loadedMesh.isPickable = false;
        _loadedMesh.setEnabled(true);
        return _loadedMesh;
    }
    static addMeshToCreate(_id, _mesh, _material, _position, _rotation, _scaling, _forceCreateClone) {
        if (Game.hasMeshToCreate(_id)) {
            return true;
        }
        Game.meshesToCreate[_id] = {"id":_id, "mesh":_mesh, "material":_material, "position":_position, "rotation":_rotation, "scaling":_scaling, "forceCreateClone":_forceCreateClone};
        Game.meshesToCreateCounter += 1
        return true;
    }
    static removeMeshToCreate(_id) {
        if (!Game.hasMeshToCreate(_id)) {
            return true;
        }
        delete Game.meshesToCreate[_id];
        Game.meshesToCreateCounter -= 1;
        return true;
    }
    static hasMeshToCreate(_id) {
        return Game.meshesToCreateCounter > 0 && Game.meshesToCreate.hasOwnProperty(_id);
    }
    static _createBackloggedMeshes() {
        if (Game.meshesToCreateCounter == 0) {
            return true;
        }
        for (var _i in Game.meshesToCreate) {
            if (Game.loadedMeshes.hasOwnProperty(Game.meshesToCreate[_i]["mesh"])) {
                Game.createMesh(
                    Game.meshesToCreate[_i]["id"],
                    Game.meshesToCreate[_i]["mesh"],
                    Game.meshesToCreate[_i]["material"],
                    Game.meshesToCreate[_i]["position"],
                    Game.meshesToCreate[_i]["rotation"],
                    Game.meshesToCreate[_i]["scaling"],
                    Game.meshesToCreate[_i]["forceCreateClone"]
                );
                Game.removeMeshToCreate(_i);
            }
        }
    }
    static addFurnitureToCreate(_id, _name = "", _mesh = undefined, _texture = undefined, _type = "", _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One(), _createCollisionMesh = true) {
        if (Game.hasFurnitureToCreate(_id)) {
            return true;
        }
        Game.furnitureToCreate[_id] = {"id":_id, "name":_name, "mesh":_mesh, "texture":_texture, "type":_type, "options":_options, "position":_position, "rotation":_rotation, "scaling":_scaling, "createCollisionMesh":_createCollisionMesh};
        Game.furnitureToCreateCounter += 1;
        return true;
    }
    static removeFurnitureToCreate(_id) {
        if (!Game.hasFurnitureToCreate(_id)) {
            return true;
        }
        delete Game.furnitureToCreate[_id];
        Game.furnitureToCreateCounter -= 1;
        return true;
    }
    static hasFurnitureToCreate(_id) {
        return Game.furnitureToCreateCounter > 0 && Game.furnitureToCreate.hasOwnProperty(_id);
    }
    static _createBackloggedFurniture() {
        if (Game.furnitureToCreateCounter == 0) {
            return true;
        }
        for (var _i in Game.furnitureToCreate) {
            if (Game.loadedMeshes.hasOwnProperty(Game.furnitureToCreate[_i]["mesh"])) {
                Game.createFurniture(
                    Game.furnitureToCreate[_i]["id"],
                    Game.furnitureToCreate[_i]["name"],
                    Game.furnitureToCreate[_i]["mesh"],
                    Game.furnitureToCreate[_i]["texture"],
                    Game.furnitureToCreate[_i]["type"],
                    Game.furnitureToCreate[_i]["options"],
                    Game.furnitureToCreate[_i]["position"],
                    Game.furnitureToCreate[_i]["rotation"],
                    Game.furnitureToCreate[_i]["scaling"],
                    Game.furnitureToCreate[_i]["createCollisionMesh"]
                );
                Game.removeFurnitureToCreate(_i);
            }
        }
    }
    static addDoorsToCreate(_id, _name = "", _to = "", _mesh = undefined, _texture = undefined, _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One()) {
        if (Game.hasDoorsToCreate(_id)) {
            return true;
        }
        Game.doorsToCreate[_id] = {"id":_id, "name":_name, "to":_to, "mesh":_mesh, "texture":_texture, "options":_options, "position":_position, "rotation":_rotation, "scaling":_scaling};
        Game.doorsToCreateCounter += 1;
        return true;
    }
    static removeDoorsToCreate(_id) {
        if (!Game.hasDoorsToCreate(_id)) {
            return true;
        }
        delete Game.doorsToCreate[_id];
        Game.doorsToCreateCounter -= 1;
        return true;
    }
    static hasDoorsToCreate(_id) {
        return Game.doorsToCreateCounter > 0 && Game.doorsToCreate.hasOwnProperty(_id);
    }
    static _createBackloggedDoors() {
        if (Game.doorsToCreateCounter == 0) {
            return true;
        }
        for (var _i in Game.doorsToCreate) {
            if (Game.loadedMeshes.hasOwnProperty(Game.doorsToCreate[_i]["mesh"])) {
                Game.createDoors(
                    Game.doorsToCreate[_i]["id"],
                    Game.doorsToCreate[_i]["name"],
                    Game.doorsToCreate[_i]["to"],
                    Game.doorsToCreate[_i]["mesh"],
                    Game.doorsToCreate[_i]["texture"],
                    Game.doorsToCreate[_i]["options"],
                    Game.doorsToCreate[_i]["position"],
                    Game.doorsToCreate[_i]["rotation"],
                    Game.doorsToCreate[_i]["scaling"]
                );
                Game.removeDoorsToCreate(_i);
            }
        }
    }
    static addCharactersToCreate(_id, _name = "", _description = "", _image = undefined, _age = 18, _sex = Game.MALE, _species = "fox", _mesh = undefined, _texture = undefined, _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One()) {
        if (Game.hasCharactersToCreate(_id)) {
            return true;
        }
        Game.charactersToCreate[_id] = {"id":_id, "name":_name, "description":_description, "image":_image, "age":_age, "sex":_sex, "species":_species, "mesh":_mesh, "texture":_texture, "options":_options, "position":_position, "rotation":_rotation, "scaling":_scaling};
        Game.charactersToCreateCounter += 1;
        return true;
    }
    static removeCharactersToCreate(_id) {
        if (!Game.hasCharactersToCreate(_id)) {
            return true;
        }
        delete Game.charactersToCreate[_id];
        Game.charactersToCreateCounter -= 1;
        return true;
    }
    static hasCharactersToCreate(_id) {
        return Game.charactersToCreateCounter > 0 && Game.charactersToCreate.hasOwnProperty(_id);
    }
    static _createBackloggedCharacters() {
        if (Game.charactersToCreateCounter == 0) {
            return true;
        }
        for (var _i in Game.charactersToCreate) {
            if (Game.loadedMeshes.hasOwnProperty(Game.charactersToCreate[_i]["mesh"])) {
                Game.createCharacters(
                    Game.charactersToCreate[_i]["id"],
                    Game.charactersToCreate[_i]["name"],
                    Game.charactersToCreate[_i]["description"],
                    Game.charactersToCreate[_i]["image"],
                    Game.charactersToCreate[_i]["age"],
                    Game.charactersToCreate[_i]["sex"],
                    Game.charactersToCreate[_i]["species"],
                    Game.charactersToCreate[_i]["mesh"],
                    Game.charactersToCreate[_i]["texture"],
                    Game.charactersToCreate[_i]["options"],
                    Game.charactersToCreate[_i]["position"],
                    Game.charactersToCreate[_i]["rotation"],
                    Game.charactersToCreate[_i]["scaling"]
                );
                Game.removeCharactersToCreate(_i);
            }
        }
    }
    static addItemsToCreate(_id, _entity = undefined, _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One()) {
        if (Game.hasItemsToCreate(_id)) {
            return true;
        }
        Game.itemsToCreate[_id] = {"id":_id, "entity":_entity, "options":_options, "position":_position, "rotation":_rotation, "scaling":_scaling};
        Game.itemsToCreateCounter += 1;
        return true;
    }
    static removeItemsToCreate(_id) {
        if (!Game.hasItemsToCreate(_id)) {
            return true;
        }
        delete Game.itemsToCreate[_id];
        Game.itemsToCreateCounter -= 1;
        return true;
    }
    static hasItemsToCreate(_id) {
        return Game.itemsToCreateCounter > 0 && Game.itemsToCreate.hasOwnProperty(_id);
    }
    static _createBackloggedItems() {
        if (Game.itemsToCreateCounter == 0) {
            return true;
        }
        for (var _i in Game.itemsToCreate) {
            if (Game.loadedMeshes.hasOwnProperty(Game.itemsToCreate[_i]["mesh"])) {
                Game.createItems(
                    Game.itemsToCreate[_i]["id"],
                    Game.itemsToCreate[_i]["entity"],
                    Game.itemsToCreate[_i]["options"],
                    Game.itemsToCreate[_i]["position"],
                    Game.itemsToCreate[_i]["rotation"],
                    Game.itemsToCreate[_i]["scaling"]
                );
                Game.removeItemsToCreate(_i);
            }
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
            _sceneFilename.substr(0, _sceneFilename.lastIndexOf("/")+1), // rootUrl
            _sceneFilename.substr(_sceneFilename.lastIndexOf("/")+1), // sceneFilename
            Game.scene, // scene
            function(_meshes, _particleSystems, _skeletons) { // onSuccess
                for(var _i = 0; _i < _meshes.length; _i++) {
                    _meshes[_i].name = _meshes[_i].id;
                    _meshes[_i].setEnabled(false);
                    if (!(_meshes[_i].material instanceof BABYLON.Material)) {
                        _meshes[_i].material = Game.missingMaterial;
                    }
                    _importedMeshes[_meshes[_i].id] = _meshes[_i];
                    if (_skeletons[_i] != undefined) {
                        _meshes[_i].skeleon = _skeletons[_i];
                    }
                    Game.loadedMeshes[_meshes[_i].id] = _meshes[_i];
                    if (Game.debugEnabled) console.log("Importing mesh " + _meshes[_i].id + " from " + _sceneFilename + ".");
                }
                Game._filesToLoad -= 1;
                if (typeof _callback == "function") {
                    _callback(_importedMeshes);
                }
            },
            function() { // onProgress
                if (Game.debugEnabled) console.log("Importing meshes from " + _sceneFilename + "...");
            },
            function() { // onError
                if (Game.debugEnabled) console.log("Error while importing meshes from " + _sceneFilename);
                Game._filesToLoad -= 1;
            }
        );
        return _importedMeshes;
    }
    static filterID(_id) {
        if (_id == undefined) {
            return undefined;
        }
        else if (isInt(_id)) {
            return _id;
        }
        else if (typeof _id == "string") {
            return _id.replace(/[^a-zA-Z0-9_\-]/g,"");
        }
    }
    static filterName(_string) {
        if (typeof _string != "string") {
            return "";
        }
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

    static setPlayerID(_id) {
        Game.setEntityID(Game.player, _id);
    }
    static setEntityID(_currentID, _newID) {
        // Three things: Mesh, CharacterController, Character
        //   Game.instancedMeshes
        //   Game.characterControllers
        //      Game.entityControllers
        //   Game.characterEntities
        //      Game.entities
        // They should all share the same ID; need to remove the methods to set the ID; will do that later :v
        if (typeof _currentID == "object") {
            if (_currentID instanceof BABYLON.AbstractMesh) {
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
        _temp = Game.getAbstractMesh(_currentID);
        _temp.id = _newID;
        Game.instancedMeshes[_newID] = _temp;
        delete Game.instancedMeshes[_currentID];
        if (Game.hasAbstractMesh(_currentID)) {
            Game.instancedMeshes[_newID] = _temp;
            delete Game.instancedMeshes[_currentID];
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
        else if ((_id instanceof BABYLON.AbstractMesh) && _id.hasOwnProperty("controller") && _id.controller instanceof ItemController) {
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
        return this.getCharacterEntity(_id) != undefined;
    }
    static getDialogue(_id) {
        if (_id == undefined) {
            return;
        }
        else if (_id instanceof Dialogue) {
            return _id;
        }
        else if (typeof _id == "string" && Game.dialogues.hasOwnProperty(_id)) {
            return Game.dialogues[_id];
        }
        else if (typeof _id == "object" && _id.hasOwnProperty("dialogue") && _id.dialogue instanceof Dialogue) {
            return _id.dialogue;
        }
        return null;
    }
    /**
     * Creates a character mesh, entity, and controller.
     * @param  {String} _id          ID
     * @param  {String} _name        Name
     * @param  {String} _description Description
     * @param  {String} _image       Path to character icon
     * @param  {Number} _age         Age
     * @param  {Boolean} _sex        Sex: 0 - Male, 1 - Female, 2 - Wat
     * @param  {String} _species     Species: fox, skeleton
     * @param  {String} _mesh        String or BABYLON.Mesh: foxM, foxF, foxSkeletonN
     * @param  {String} _texture     String or BABYLON.Texture: foxRed, foxCorsac
     * @param  {Object} _options     Physics options: don't touch 'cause they're not used
     * @param  {BABYLON.Vector3} _position    Position
     * @param  {BABYLON.Vector3} _rotation    Rotation
     * @param  {BABYLON.Vector3} _scaling     Scale
     * @return {CharacterController}          Character Controller
     */
    static createCharacter(_id, _name = "", _description = "", _image = undefined, _age = 18, _sex = Game.MALE, _species = "fox", _mesh = undefined, _texture = undefined, _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One()) {
        if (typeof _id != "string") {_id = genUUIDv4();}
        _id = this.filterID(_id);
        if (!Game.hasMesh(_mesh)) {
            return false;
        }
        if (!(_position instanceof BABYLON.Vector3)) {
            _position = Game.filterVector(_position);
        }
        if (!(_rotation instanceof BABYLON.Vector3)) {
            _rotation = Game.filterVector(_rotation);
        }
        if (!(_scaling instanceof BABYLON.Vector3)) {
            _scaling = Game.filterVector(_scaling);
        }
        if (_scaling.equals(BABYLON.Vector3.Zero())) {
            _scaling = BABYLON.Vector3.One();
        }
        if (!(Game.hasLoadedMesh(_mesh))) {
            Game.loadMesh(_mesh);
            Game.addCharactersToCreate(_id, _name, _description, _image, _age, _sex, _species, _mesh, _texture, _options, _position, _rotation, _scaling);
            return true;
        }
        var _entity = new CharacterEntity(_id, _name, _description, _image, undefined, _age, _sex, _species);
        var _loadedMesh = Game.getAbstractMesh(_loadedMesh);
        if (_loadedMesh == undefined) {
            switch (_entity.species) {
                case "fox" : {
                    if (_entity.getSex() == Game.MALE) {
                        _loadedMesh = "foxM";
                    }
                    else {
                        _loadedMesh = "foxF";
                    }
                    break;
                }
                case "skeleton" : {
                    _loadedMesh = "foxSkeletonN";
                    break;
                }
                case "spirit" : {
                    _loadedMesh = "spiritN";
                    break;
                }
                default : {
                    if (_entity.getSex() == Game.MALE) {
                        _loadedMesh = "foxM";
                    }
                    else {
                        _loadedMesh = "foxF";
                    }
                    break;
                }
            }
            _loadedMesh = Game.addCharacterMesh(_id, _loadedMesh, _texture, _options, _position, _rotation, _scaling);
        }
        else {
            _loadedMesh = Game.addCharacterMesh(_id, _loadedMesh.id, _texture, _options, _position, _rotation, _scaling);
        }
        var _controller = new CharacterController(_id, _loadedMesh, _entity);
        if (_texture != undefined) {
            _controller.setTexture(_texture);
        }
        _entity.setController(_controller);
        _entity.setMeshID(_loadedMesh);
        return _controller;
    }
    static createCharacterFromEntity(_entity, _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One()) {
        _entity = Game.getCharacterEntity(_entity);
        if (_entity == undefined) {return;}
        var _mesh = Game.addCharacterMesh(_entity.getID(), _entity.getMeshID(), _entity.getTextureID(), _options, _position, _rotation, _scaling);
        var _controller = new CharacterController(_entity.getID(), _mesh, _entity);
        _controller.setTexture(_entity.getTextureID());
        _entity.setController(_controller);
        _entity.setMeshID(_mesh);
        return _controller;
    }
    static removeCharacter(_controller) {
        _controller = Game.getCharacterController(_controller);
        if (_controller == undefined) {return;}
        if (_controller == this.player) {return;}
        var _mesh = _controller.getMesh();
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
     * @param  {String} _texture            String, Texture, or Material to be applied to the Mesh
     * @param  {Object} _options            Physics options, if they're enabled
     * @param  {BABYLON.Vector3} _position  Position
     * @param  {BABYLON.Vector3} _rotation  Rotation
     * @param  {BABYLON.Vector3} _scaling   Scaling
     * @return {EntityController}           The created EntityController in-game
     */
    static createDoor(_id, _name = "Door", _to = undefined, _mesh = "door", _texture = "plainDoor", _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One()) {
        if (typeof _id != "string") {_id = genUUIDv4();}
        _id = this.filterID(_id);
        if (!Game.hasMesh(_mesh)) {
            return false;
        }
        if (!(_position instanceof BABYLON.Vector3)) {
            _position = Game.filterVector(_position);
        }
        if (!(_rotation instanceof BABYLON.Vector3)) {
            _rotation = Game.filterVector(_rotation);
        }
        if (!(_scaling instanceof BABYLON.Vector3)) {
            _scaling = Game.filterVector(_scaling);
        }
        if (_scaling.equals(BABYLON.Vector3.Zero())) {
            _scaling = BABYLON.Vector3.One();
        }
        if (!(Game.hasLoadedMesh(_mesh))) {
            Game.loadMesh(_mesh);
            Game.addDoorsToCreate(_id, _name, _to, _mesh, _texture, _options, _position, _rotation, _scaling);
            return true;
        }
        var _entity = new DoorEntity(_id, _name, undefined, _texture);
        var _loadedMesh = Game.addFurnitureMesh(_id, _mesh, _texture, _options, _position, _rotation, _scaling, true);
        var _radius = Game.getAbstractMesh(_loadedMesh.name).getBoundingInfo().boundingBox.extendSize.x * _loadedMesh.scaling.x;
        var _xPos = _radius * (Math.cos(_rotation.y * Math.PI / 180) | 0);
        var _yPos = _radius * (Math.sin(_rotation.y * Math.PI / 180) | 0);
        _loadedMesh.position = _loadedMesh.position.add(new BABYLON.Vector3(_xPos, 0, -_yPos));
        var _controller = new DoorController(_id, _loadedMesh, _entity);
        _entity.setController(_controller);
        _entity.setMeshID(_loadedMesh);
        return _controller;
    }
    static removeDoor(_controller) {
        _controller = Game.getEntityController(_controller);
        if (_controller == undefined) {return;}
        var _mesh = _controller.getMesh();
        _controller.entity.dispose();
        _controller.dispose();
        Game.removeMesh(_mesh);
    }
    /**
     * Created a FurnitureController, FurnitureEntity, and BABYLON.InstancedMesh
     * @param  {String}  _id                  Unique ID, randomly generated if undefined
     * @param  {String}  _name                Name
     * @param  {String}  _type                Furniture type
     * @param  {String}  _mesh                String or Mesh
     * @param  {String}  _texture             String or Texture
     * @param  {Object}  _options             Physics options
     * @param  {BABYLON.Vector3}  _position   Position
     * @param  {BABYLON.Vector3}  _rotation   Rotation
     * @param  {BABYLON.Vector3}  _scaling    Scaling       
     * @param  {Boolean} _createCollisionMesh Whether or not a collisionMesh will be created
     * @return {FurnitureController}          Furniture Controller
     */
    static createFurniture(_id, _name = "", _mesh, _texture, _type = "", _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One(), _createCollisionMesh = true) {
        if (typeof _id != "string") {_id = genUUIDv4();}
        _id = this.filterID(_id);
        if (!Game.hasMesh(_mesh)) {
            return false;
        }
        if (!(_position instanceof BABYLON.Vector3)) {
            _position = Game.filterVector(_position);
        }
        if (!(_rotation instanceof BABYLON.Vector3)) {
            _rotation = Game.filterVector(_rotation);
        }
        if (!(_scaling instanceof BABYLON.Vector3)) {
            _scaling = Game.filterVector(_scaling);
        }
        if (_scaling.equals(BABYLON.Vector3.Zero())) {
            _scaling = BABYLON.Vector3.One();
        }
        if (!(Game.hasLoadedMesh(_mesh))) {
            Game.loadMesh(_mesh);
            Game.addFurnitureToCreate(_id, _name, _mesh, _texture, _type, _options, _position, _rotation, _scaling, _createCollisionMesh);
            return true;
        }
        var _loadedMesh = Game.addFurnitureMesh(_id, _mesh, _texture, _options, _position, _rotation, _scaling, true, _createCollisionMesh);
        _loadedMesh.checkCollisions = true; // _createCollisionMesh doesn't count this :v
        var _entity = new FurnitureEntity(_id, _name, undefined, undefined, _type);
        var _controller = new FurnitureController(_id, _loadedMesh, _entity);
        _entity.setController(_controller);
        _entity.setMeshID(_loadedMesh);
        switch (_entity.getType()) {
            case "chair" :
            case "loveseat" :
            case "couch" : {
                _controller.getEntity().setDefaultAction("sit");
                break;
            }
            case "bed" : {
                _controller.getEntity().setDefaultAction("lay");
                break;
            }
            case "desk" :
            case "shelf" :
            case "cupboard" :
            case "cabinet" :
            case "bureau" :
            case "refrigerator" :
            case "oven" :
            case "microwave" :
            case "toaster" :
            case "basket" : {
                _controller.getEntity().setDefaultAction("open");
                break;
            }
            default : {
                
            }
        }
        return _controller;
    }
    static removeFurniture(_controller) {
        _controller = Game.getFurnitureController(_controller);
        if (_controller == undefined) {return;}
        if (_controller == this.player) {return;}
        var _mesh = _controller.getMesh();
        _controller.entity.dispose();
        _controller.dispose();
        _mesh.material.dispose();
        Game.removeMesh(_mesh);
    }
    static createProtoItem(_id, _name = "", _description = "", _image = "", _mesh = undefined, _texture = undefined, _itemType = "general") {
        if (typeof _id != "string") {_id = genUUIDv4();}
        _id = this.filterID(_id);
        var _entity = null;
        switch (_itemType) {
            case "clothing": {
                _entity = new ClothingEntity(_id, _name, _description, _image);
                break;
            }
            case "key":{
                _entity = new KeyEntity(_id, _name, _description, _image);
            }
            case "general": {}
            default: {
                _entity = new ItemEntity(_id, _name, _description, _image);
            }
        }
        _mesh = Game.getAbstractMesh(_mesh);
        if (_mesh != undefined) {
            _mesh = _mesh.name;
        }
        _entity.setMeshID(_mesh);
        _entity.setTextureID(_texture);
        return _entity;
    }
    static updateProtoItem() {}
    static removeProtoItem() {}
    static createItem(_id, _entity, _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One()) {
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
        else if (typeof _entity == "string" && Game.hasProtoItemEntity(_entity)) {
            _entity = new InstancedItemEntity(_id, Game.getProtoItemEntity(_entity));
        }
        else {
            return null;
        }
        if (!Game.hasMesh(_mesh)) {
            _mesh = Game.getAbstractMesh("missingMesh");
        }
        if (!(_position instanceof BABYLON.Vector3)) {
            _position = Game.filterVector(_position);
        }
        if (!(_rotation instanceof BABYLON.Vector3)) {
            _rotation = Game.filterVector(_rotation);
        }
        if (!(_scaling instanceof BABYLON.Vector3)) {
            _scaling = Game.filterVector(_scaling);
        }
        if (_scaling.equals(BABYLON.Vector3.Zero())) {
            _scaling = BABYLON.Vector3.One();
        }
        if (!(Game.hasLoadedMesh(_mesh))) { // Never gonna trigger this, but here it is anyway :V
            Game.loadMesh(_mesh);
            Game.addItemsToCreate(_id, _entity, _options, _position, _rotation, _scaling);
            return true;
        }
        var _mesh = Game.addItemMesh(_id, _entity.getMeshID(), _entity.getTextureID(), _options, _position, _rotation, _scaling, true);
        var _controller = new ItemController(_id, _mesh, _entity);
        _entity.setController(_controller);
        return _controller;
    }
    static removeItem(_controller) {
        _controller = Game.getItemController(_controller);
        if (_controller == undefined) {return;}
        var _mesh = _controller.getMesh();
        _controller.entity.dispose();
        _controller.dispose();
        Game.removeMesh(_mesh);
    }
    static removeItemInSpace(_controller) {
        _controller = Game.getItemController(_controller);
        if (_controller == undefined) {return;}
        var _mesh = _controller.getMesh();
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
        if (!(Game.player instanceof CharacterController)) {
            return false;
        }
        if (_controller == Game.player.getTarget()) {
            return null;
        }
        if (!(_controller instanceof EntityController) || !_controller.isEnabled()) {
            return null;
        }
        this.highlightMesh(_controller.mesh);
        Game.player.setTarget(_controller);
        GameGUI.setTargetPortrait(_controller);
        GameGUI.showTargetPortrait();
        GameGUI.setActionTooltip(_controller.getEntity().getDefaultAction());
        GameGUI.showActionTooltip();
    }
    static clearPlayerTarget() {
        if (!(Game.player instanceof CharacterController)) {
            return false;
        }
        if (Game.player.getTarget() == undefined) {
            return undefined;
        }
        this.clearHightlightMesh();
        Game.player.clearTarget();
        GameGUI.hideTargetPortrait();
        GameGUI.hideActionTooltip();
    }
    static castRayTarget() {
        if (!(Game.player instanceof CharacterController)) {
            return false;
        }
        var _ray = Game.camera.getForwardRay(2 * Game.player.getMesh().scaling.y, Game.camera.getWorldMatrix(), Game.player.focus.getAbsolutePosition())
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
            if (_mesh.hasOwnProperty("controller") && _mesh != Game.player.mesh) {
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
    static initCastRayInterval() {
        clearInterval(Game._castRayTargetIntervalFunction);
        Game._castRayTargetIntervalFunction = setInterval(Game.castRayTarget, Game._castRayTargetInterval);
    }
    static setCastRayInterval(_interval = 250) {
        if (_interval > 0) {
            Game._castRayTargetInterval = _interval;
        }
        Game.initCastRayInterval();
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
        Game._pointerLockFunction = setTimeout(function() {document.addEventListener("pointerlockchange", Game.pointerRelease);}, 121);
    }
    static pointerRelease(_event) {
        clearTimeout(Game.pointerLockFunction);
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
        if (!Game.player.hasMesh()) {
            return null;
        }
        if (Game.camera.radius <= 0.5) {
            if (Game.enableFirstPerson && Game.player.mesh.isVisible) {
                Game.player.hideMesh();
                Game.camera.checkCollisions = false;
                Game.camera.inertia = 0.75;
                GameGUI.showCrosshair();
            }
        }
        else {
            if (!Game.player.mesh.isVisible) {
                Game.player.showMesh();
                Game.camera.checkCollisions = true;
                Game.camera.inertia = 0.9;
                GameGUI.hideCrosshair();
            }
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
            else if (_action == "talk" && _entity instanceof CharacterEntity) {
                Game.actionTalkFunction(_entity.getController(), _subEntity.getController());
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
        if (_subEntityController instanceof CharacterController) {
            _subEntityController.getEntity().unequipEntity(_instancedItemEntity);
        }
        if (_instancedItemEntity.hasController() && _instancedItemEntity.getController().hasMesh()) { // it shouldn't have an EntityController :v but just in case
            _instancedItemEntity.setParent(null);
            _instancedItemEntity.position = _subEntityController.getMesh().position.clone.add(
                new BABYLON.Vector3(0, Game.getAbstractMesh(_instancedItemEntity.getEntity().getMeshID()).getBoundingInfo().boundingBox.extendSize.y, 0)
            );
        }
        else {
            var _item = Game.createItem(undefined, _instancedItemEntity, undefined, _subEntityController.getMesh().position.add(
                new BABYLON.Vector3(0, Game.getAbstractMesh(_instancedItemEntity.getEntity().getMeshID()).getBoundingInfo().boundingBox.extendSize.y, 0)
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
        _entityController.doClose(false);
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
        _subEntityController.getEntity().hold(_instancedItemEntity);
        if (typeof _callback == "function") {
            _callback(_instancedItemEntity, undefined, _subEntityController);
        }
    }
    static actionEquipFunction(_instancedItemEntity, _subEntityController = Game.player, _callback = undefined) {
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
        if (_subEntityController instanceof CharacterController) {
            _subEntityController.getEntity().equipEntity(_instancedItemEntity);
        }
        if (typeof _callback == "function") {
            _callback(_instancedItemEntity, undefined, _subEntityController);
        }
    }
    static actionUnequipFunction(_instancedItemEntity, _subEntityController = Game.player, _callback = undefined) {
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
        if (_subEntityController instanceof CharacterController) {
            _subEntityController.getEntity().unequip(_instancedItemEntity);
        }
        if (typeof _callback == "function") {
            _callback(_instancedItemEntity, undefined, _subEntityController);
        }
    }
    static actionReleaseFunction(_instancedItemEntity, _subEntityController = Game.player, _callback = undefined) {
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
        _subEntityController.getEntity().unequipEntity(_instancedItemEntity);
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
        _entityController.doOpen(true);
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
        var _seatingBoundingBox = this.getAbstractMesh(_entityController.getMesh().name).getBoundingInfo().boundingBox;
        var _seatingWidth = (_seatingBoundingBox.extendSize.x * _entityController.getMesh().scaling.x);
        _subEntityController.setParent(_entityController.getMesh());
        _subEntityController.getMesh().position.set(_seatingWidth / 2, 0, 0.025);
        _subEntityController.getMesh().rotation.set(0,0,0);
    }
    static actionTalkFunction(_entityController, _subEntityController = Game.player) {
        if (!(_entityController instanceof CharacterController)) {
            return;
        }
        if (!(_subEntityController instanceof CharacterController)) {
            return;
        }
        if (!(_entityController.getEntity().getDialogue() instanceof Dialogue)) {
            return;
        }
        var _dialogue = _entityController.getEntity().getDialogue().getDialogue();
        if (typeof _dialogue == "string") {
            GameGUI.chatOutputAppend(_entityController.getEntity().getFullName() + ": " + _dialogue);
        }
        else if (typeof _dialogue == "function") {
            GameGUI.chatOutputAppend(_entityController.getEntity().getFullName() + ": " + _dialogue(_entityController.getEntity(), _subEntityController.getEntity()));
        }
    }
}