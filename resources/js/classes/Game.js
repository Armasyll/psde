class Game {
    constructor() {
        this.initialized = false;
        Game.debugEnabled = false;
    }
    static initialize() {
        this.initialized = false;
        Game.debugEnabled = false;
        this.physicsEnabled = false;

        if (Game.debugEnabled) console.log("Running initialize");
        this.canvas = document.getElementById("canvas");
            this.canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
            this.canvas.exitPointerLock = canvas.exitPointerLock || canvas.mozExitPointerLock;
        this.engine = new BABYLON.Engine(this.canvas, false, null, false);
            this.engine.enableOfflineSupport = false; // Disables .manifest file errors
            this.engine.isPointerLock = false;
        Game.scene = new BABYLON.Scene(this.engine);
            Game.scene.autoClear = false;
            Game.scene.autoClearDepthAndStencil = false;
            Game.scene.gravity = new BABYLON.Vector3(0,-9.81, 0);
            Game.scene.actionManager = new BABYLON.ActionManager(Game.scene);
        if (this.physicsEnabled) {
            Game.initPhysics();
        }
        else {
            Game.scene.collisionsEnabled = true;
            Game.scene.workerCollisions = false;
        }

        this._assignBoundingBoxCollisionQueue = new Set();

        this._filesToLoad = 1;

        /**
         * Map of Mesh file locations per ID
         * eg, {"foxM":"resources/data/characters.babylon"}
         * @type {<String, String>}
         */
        this.meshLocations = {
            "stopSign":"resources/data/misc.babylon",
            "twoByFourByEight":"resources/data/misc.babylon",
            "twoByFourByThree":"resources/data/misc.babylon",
            "twoByFourBySix":"resources/data/misc.babylon",
            "tombstone02":"resources/data/misc.babylon",
            "icosphere30":"resources/data/misc.babylon",
            "scroll01":"resources/data/misc.babylon",
            "displayPlatform":"resources/data/misc.babylon",
            "questionMark":"resources/data/misc.babylon",
            "exclamationMark":"resources/data/misc.babylon",
            "tombstone01":"resources/data/misc.babylon",
            "obelisk02":"resources/data/misc.babylon",
            "obelisk01":"resources/data/misc.babylon",
            "scroll02":"resources/data/misc.babylon",
            "coffinLid01":"resources/data/furniture.babylon",
            "coffin01":"resources/data/furniture.babylon",
            "coffinClosed01":"resources/data/furniture.babylon",
            "bedMattressFrame01":"resources/data/furniture.babylon",
            "bedFrame01":"resources/data/furniture.babylon",
            "mattress01":"resources/data/furniture.babylon",
            "bookshelfThin":"resources/data/furniture.babylon",
            "couch02":"resources/data/furniture.babylon",
            "nightstandDoubleDrawer":"resources/data/furniture.babylon",
            "nightstandSingleDrawer":"resources/data/furniture.babylon",
            "bedsideTableDoubleDrawer":"resources/data/furniture.babylon",
            "chair01":"resources/data/furniture.babylon",
            "loveseat01":"resources/data/furniture.babylon",
            "bookshelf":"resources/data/furniture.babylon",
            "lamp01":"resources/data/furniture.babylon",
            "couch01":"resources/data/furniture.babylon",
            "trashCanLid":"resources/data/furniture.babylon",
            "trashBagFull":"resources/data/furniture.babylon",
            "trashBagInCan":"resources/data/furniture.babylon",
            "trashCan":"resources/data/furniture.babylon",
            "consoleTable":"resources/data/furniture.babylon",
            "sawhorse":"resources/data/furniture.babylon",
            "bedsideTableSingleDrawer":"resources/data/furniture.babylon",
            "diningTable":"resources/data/furniture.babylon",
            "coffeeTable":"resources/data/furniture.babylon",
            "spear01":"resources/data/items.babylon",
            "glaive01":"resources/data/items.babylon",
            "battleaxe01":"resources/data/items.babylon",
            "axe03":"resources/data/items.babylon",
            "axe02":"resources/data/items.babylon",
            "axe01":"resources/data/items.babylon",
            "sword01":"resources/data/items.babylon",
            "heaterShield03":"resources/data/items.babylon",
            "birdMask01":"resources/data/items.babylon",
            "birdMaskJaw01":"resources/data/items.babylon",
            "cameraFocus":"resources/data/items.babylon",
            "cheeseWheel":"resources/data/items.babylon",
            "cheeseWheelSansWedge":"resources/data/items.babylon",
            "cheeseWedge":"resources/data/items.babylon",
            "stick01":"resources/data/items.babylon",
            "stick03":"resources/data/items.babylon",
            "stick04":"resources/data/items.babylon",
            "rock01":"resources/data/items.babylon",
            "glaive01":"resources/data/items.babylon",
            "forgeHammer01":"resources/data/items.babylon",
            "warHammer01":"resources/data/items.babylon",
            "mallet01":"resources/data/items.babylon",
            "pickaxe01":"resources/data/items.babylon",
            "spear01":"resources/data/items.babylon",
            "shortSword01":"resources/data/items.babylon",
            "staff05":"resources/data/items.babylon",
            "wizardHat02":"resources/data/items.babylon",
            "ingot01":"resources/data/items.babylon",
            "dice01":"resources/data/items.babylon",
            "staff04":"resources/data/items.babylon",
            "staff03":"resources/data/items.babylon",
            "staff02":"resources/data/items.babylon",
            "staff01":"resources/data/items.babylon",
            "trumpet01":"resources/data/items.babylon",
            "mountainChocolateBar01":"resources/data/items.babylon",
            "mountainChocolateWrapper01":"resources/data/items.babylon",
            "hornsCurved01":"resources/data/items.babylon",
            "hornsCurved02":"resources/data/items.babylon",
            "hornsCurved03":"resources/data/items.babylon",
            "hornsCurved04":"resources/data/items.babylon",
            "hornsCurved05":"resources/data/items.babylon",
            "hornsCurved07":"resources/data/items.babylon",
            "hornsCurved06":"resources/data/items.babylon",
            "cup01":"resources/data/items.babylon",
            "currencyCoinQuarter":"resources/data/items.babylon",
            "currencyCoinDime":"resources/data/items.babylon",
            "currencyCoinNickel":"resources/data/items.babylon",
            "bottle06":"resources/data/items.babylon",
            "bottle05":"resources/data/items.babylon",
            "bottle04":"resources/data/items.babylon",
            "bottle03":"resources/data/items.babylon",
            "bottle02":"resources/data/items.babylon",
            "bottle01":"resources/data/items.babylon",
            "wand01":"resources/data/items.babylon",
            "wand02":"resources/data/items.babylon",
            "ring03":"resources/data/items.babylon",
            "bookHardcoverOpen01":"resources/data/items.babylon",
            "key99":"resources/data/items.babylon",
            "ring02":"resources/data/items.babylon",
            "barbute01":"resources/data/items.babylon",
            "currencyCoinPenny":"resources/data/items.babylon",
            "currencyNoteDollar":"resources/data/items.babylon",
            "wand03":"resources/data/items.babylon",
            "key01":"resources/data/items.babylon",
            "boneRib01":"resources/data/items.babylon",
            "bone02":"resources/data/items.babylon",
            "bone01":"resources/data/items.babylon",
            "bookHardcoverClosed01":"resources/data/items.babylon",
            "roundShield":"resources/data/items.babylon",
            "parmaShield":"resources/data/items.babylon",
            "heaterShield02":"resources/data/items.babylon",
            "heaterShield01":"resources/data/items.babylon",
            "scutumShield":"resources/data/items.babylon",
            "goblet01":"resources/data/items.babylon",
            "cap01":"resources/data/items.babylon",
            "barbuteHorned01":"resources/data/items.babylon",
            "protohelmet":"resources/data/items.babylon",
            "foxhead01":"resources/data/items.babylon",
            "cross01":"resources/data/items.babylon",
            "gladius":"resources/data/items.babylon",
            "harpe":"resources/data/items.babylon",
            "executionerSword01":"resources/data/items.babylon",
            "cudgel01":"resources/data/items.babylon",
            "morningstar01":"resources/data/items.babylon",
            "glass01":"resources/data/items.babylon",
            "gem03":"resources/data/items.babylon",
            "gem04":"resources/data/items.babylon",
            "gem05":"resources/data/items.babylon",
            "gem06":"resources/data/items.babylon",
            "gem08":"resources/data/items.babylon",
            "plate01":"resources/data/items.babylon",
            "greatSword01":"resources/data/items.babylon",
            "katana01":"resources/data/items.babylon",
            "eye01":"resources/data/items.babylon",
            "eye02":"resources/data/items.babylon",
            "knife01":"resources/data/items.babylon",
            "_cD":"resources/data/items.babylon",
            "foxhead02":"resources/data/items.babylon",
            "ring01":"resources/data/items.babylon",
            "foxhead03":"resources/data/items.babylon",
            "craftsmanWindowDouble":"resources/data/craftsmanWalls.babylon",
            "craftsmanWallNoTrim":"resources/data/craftsmanWalls.babylon",
            "craftsmanWallNoCrown":"resources/data/craftsmanWalls.babylon",
            "craftsmanWallNoBaseboard":"resources/data/craftsmanWalls.babylon",
            "craftsmanStairWallCornerRight":"resources/data/craftsmanWalls.babylon",
            "craftsmanStairWallSideRight":"resources/data/craftsmanWalls.babylon",
            "craftsmanWindowframe":"resources/data/craftsmanWalls.babylon",
            "craftsmanStairWallSideLeft":"resources/data/craftsmanWalls.babylon",
            "craftsmanStairWallCornerLeft":"resources/data/craftsmanWalls.babylon",
            "craftsmanStairs":"resources/data/craftsmanWalls.babylon",
            "craftsmanWall":"resources/data/craftsmanWalls.babylon",
            "craftsmanCorner":"resources/data/craftsmanWalls.babylon",
            "craftsmanDoorway":"resources/data/craftsmanWalls.babylon",
            "craftsmanDoor":"resources/data/craftsmanWalls.babylon",
            "spiritN":"resources/data/characters.babylon",
            "foxF":"resources/data/characters.babylon",
            "foxSkeletonN":"resources/data/characters.babylon",
            "foxM":"resources/data/characters.babylon",
            "spider":"resources/data/arachnids.babylon",
            "borb":"resources/meshes/borb.babylon",
            "animatedPylon01":"resources/meshes/animatedPylon01.babylon",
            "animatedRefrigerator01":"resources/meshes/animatedRefrigerator01.babylon",
            "animatedCoffin01":"resources/meshes/animatedCoffin01.babylon",
            "animatedBarrel01":"resources/meshes/animatedBarrel01.babylon",
            "animatedToilet01":"resources/meshes/animatedToilet01.babylon",
            "animatedDoor01":"resources/meshes/animatedDoor01.babylon"
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
            "packStreetApartmentBuildingGroundFloor":"resources/images/textures/static/packStreetApartmentBuildingGroundFloor.png",
            "carpetPink01":"resources/images/textures/static/carpetPink01.png",
            "noooo":"resources/images/textures/static/noooo.jpg",
            "packStreetChapter23":"resources/images/textures/items/packStreetChapter23.svg",
            "packStreetChapter24":"resources/images/textures/items/packStreetChapter24.svg",
            "foxCorsac":"resources/images/textures/characters/foxCorsac.svg",
            "oblongEye":"resources/images/textures/items/oblongEye.svg",
            "feralEyeYellow":"resources/images/textures/items/feralEyeYellow.svg",
            "feralEyeGreen":"resources/images/textures/items/feralEyeGreen.svg",
            "feralEyeBlue":"resources/images/textures/items/feralEyeBlue.svg",
            "feralEye":"resources/images/textures/items/feralEye.svg",
            "cross01":"resources/images/textures/items/cross01.svg",
            "spirit":"resources/images/textures/characters/spirit.png",
            "woodenFloorDark01":"resources/images/textures/static/woodenFloorDark01.xcf",
            "ring02GoldBrokenRuby":"resources/images/textures/items/ring02GoldBrokenRuby.svg",
            "ring02Gold":"resources/images/textures/items/ring02Gold.svg",
            "ring02Silver":"resources/images/textures/items/ring02Silver.svg",
            "ring02SilverBrokenRuby":"resources/images/textures/items/ring02SilverBrokenRuby.svg",
            "fireSplatter":"resources/images/textures/effects/fireSplatter.svg",
            "fireOpacity":"resources/images/textures/effects/fireOpacity.svg",
            "fireDistortion":"resources/images/textures/effects/fireDistortion.png",
            "bottle03RedSarcophagusJuice":"resources/images/textures/items/bottle03RedSarcophagusJuice.svg",
            "bottle03Red":"resources/images/textures/items/bottle03Red.svg",
            "bottle03Blue":"resources/images/textures/items/bottle03Blue.svg",
            "bottle03Purple":"resources/images/textures/items/bottle03Purple.svg",
            "bottle03White":"resources/images/textures/items/bottle03White.svg",
            "bookshelfBlackPlywood":"resources/images/textures/furniture/bookshelfBlackPlywood.svg",
            "TheMagicalCircleOfKingSolomon":"resources/images/textures/effects/TheMagicalCircleOfKingSolomon.svg",
            "theLesserKeyOfSolomon":"resources/images/textures/items/theLesserKeyOfSolomon.svg",
            "metalIron01":"resources/images/textures/items/metalIron01.png",
            "foxRed":"resources/images/textures/characters/foxRed.svg",
            "foxRinehart":"resources/images/textures/characters/foxRinehart.svg",
            "feralEyeViolet":"resources/images/textures/items/feralEyeViolet.svg",
            "circularEyeViolet":"resources/images/textures/items/circularEyeViolet.svg",
            "circularEyeBlue":"resources/images/textures/items/circularEyeBlue.svg",
            "circularEyeGreen":"resources/images/textures/items/circularEyeGreen.svg",
            "dice":"resources/images/textures/items/dice.svg",
            "vChocolateV":"resources/images/textures/items/vChocolateV.svg",
            "missingTexture":"resources/images/textures/static/missingTexture.svg",
            "woodenMallet":"resources/images/textures/items/woodenMallet.svg",
            "cheeseWheel":"resources/images/textures/items/cheeseWheel.svg",
            "stick01":"resources/images/textures/items/stick01.svg",
            "rock01":"resources/images/textures/items/rock01.png",
            "bone01":"resources/images/textures/items/bone01.svg",
            "icosphere30":"resources/images/textures/static/icosphere30.svg",
            "fireOpacity":"resources/images/textures/effects/fireOpacity.png",
            "fire":"resources/images/textures/effects/fire.png",
            "greenWallpaper":"resources/images/textures/static/greenWallpaper.png",
            "trimWood":"resources/images/textures/static/trimWood.png",
            "plainDoor":"resources/images/textures/static/plainDoor.svg",
            "pinkWallpaperPlainWood":"resources/images/textures/static/pinkWallpaperPlainWood.png",
            "yellowWallpaperPlainWood":"resources/images/textures/static/yellowWallpaperPlainWood.png",
            "stahpSign":"resources/images/textures/items/stahpSign.svg",
            "stopSign":"resources/images/textures/items/stopSign.svg",
            "blackWallpaperPlainWood":"resources/images/textures/static/blackWallpaperPlainWood.png",
            "blueWallpaperPlainWood":"resources/images/textures/static/blueWallpaperPlainWood.png",
            "carpetBlack01":"resources/images/textures/static/carpetBlack01.png",
            "checkerLinoleumFloor01":"resources/images/textures/static/checkerLinoleumFloor01.png",
            "greenWallpaperPlainWood":"resources/images/textures/static/greenWallpaperPlainWood.png",
            "whitePanelGrayStone":"resources/images/textures/static/whitePanelGrayStone.png",
            "whiteWallpaperPlainWood":"resources/images/textures/static/whiteWallpaperPlainWood.png",
            "woodenFloorDark01-BUMP":"resources/images/textures/static/woodenFloorDark01-BUMP.png",
            "woodenFloorDark01-DIFFUSE":"resources/images/textures/static/woodenFloorDark01-DIFFUSE.png",
            "woodenFloorDark01-NORMAL":"resources/images/textures/static/woodenFloorDark01-NORMAL.png",
            "stripped-BUMP":"resources/images/textures/static/stripped-BUMP.png",
            "stripped-NORMAL":"resources/images/textures/static/stripped-NORMAL.png",
            "stoneTexture01":"resources/images/textures/static/stoneTexture01.png",
            "stoneTexture01-NORMAL":"resources/images/textures/static/stoneTexture01-NORMAL.png"
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
            "rosieIcon":"resources/images/icons/characters/rosie.png",
            "charlieIcon":"resources/images/icons/characters/charlie.svg",
            "genericItemIcon":"resources/images/icons/items/genericItem.svg",
            "genericCharacterIcon":"resources/images/icons/characters/genericCharacter.svg",
            "pandorasBoxLocationKeyIcon":"resources/images/icons/items/pandorasBoxLocationKey.svg",
            "keyIcon":"resources/images/icons/items/key.svg",
            "nickWildeIcon":"resources/images/icons/characters/nickWilde.svg",
            "packstreet23StrangeNewDayIcon":"resources/images/icons/items/packstreet23StrangeNewDay.png",
            "cross01Icon":"resources/images/icons/items/cross01.png",
            "ring01SilverIcon":"resources/images/icons/items/ring01Silver.png",
            "ring02SilverIcon":"resources/images/icons/items/ring02Silver.png",
            "ring03SilverDRubyIcon":"resources/images/icons/items/ring03GoldDRuby.png",
            "ring01GoldIcon":"resources/images/icons/items/ring01Gold.png",
            "ring02GoldIcon":"resources/images/icons/items/ring02Gold.png",
            "ring03GoldDRubyIcon":"resources/images/icons/items/ring03GoldDRuby.png",
            "fireIcon":"resources/images/icons/effects/fire.png",
            "bottle05RedSarcophagusJuiceIcon":"resources/images/icons/items/bottle05RedSarcophagusJuice.png",
            "bottle04RedSarcophagusJuiceIcon":"resources/images/icons/items/bottle04RedSarcophagusJuice.png",
            "bottle03RedSarcophagusJuiceIcon":"resources/images/icons/items/bottle03RedSarcophagusJuice.png",
            "bottle03JarateIcon":"resources/images/icons/items/bottle03Jarate.png",
            "theLesserKeyOfSolomonIcon":"resources/images/icons/items/theLesserKeyOfSolomon.png",
            "mountainChocolate01Icon":"resources/images/icons/items/mountainChocolate01.png",
            "knife01Icon":"resources/images/icons/items/knife01.png",
            "missingIcon":"resources/images/icons/static/missingIcon.svg",
            "cudgelIcon":"resources/images/icons/items/cudgel.png",
            "morningstar01Icon":"resources/images/icons/items/morningstar01.png",
            "wizardHat02Icon":"resources/images/icons/items/wizardHat02.png",
            "barbuteHorned01Icon":"resources/images/icons/items/barbuteHorned01.png",
            "heaterShield02Icon":"resources/images/icons/items/heaterShield02.png",
            "heaterShield01Icon":"resources/images/icons/items/heaterShield01.png",
            "roundShieldIcon":"resources/images/icons/items/roundShield.png",
            "parmaShieldIcon":"resources/images/icons/items/parmaShield.png",
            "scutumShieldIcon":"resources/images/icons/items/scutumShield.png",
            "mallet01Icon":"resources/images/icons/items/mallet01.png",
            "pickaxe01Icon":"resources/images/icons/items/pickaxe01.png",
            "warHammer01Icon":"resources/images/icons/items/warHammer01.png",
            "harpeIcon":"resources/images/icons/items/harpe.png",
            "gladiusIcon":"resources/images/icons/items/gladius.png",
            "plate01Icon":"resources/images/icons/items/plate01.png",
            "glass01Icon":"resources/images/icons/items/glass01.png",
            "gem03Icon":"resources/images/icons/items/glass03Icon.png",
            "gem04Icon":"resources/images/icons/items/glass04Icon.png",
            "gem05Icon":"resources/images/icons/items/glass05Icon.png",
            "gem06Icon":"resources/images/icons/items/glass06Icon.png",
            "gem08Icon":"resources/images/icons/items/glass08Icon.png",
            "goblet01Icon":"resources/images/icons/items/goblet01.png",
            "cup01Icon":"resources/images/icons/items/cup01.png",
            "staff01Icon":"resources/images/icons/items/staff01.png",
            "staff04Icon":"resources/images/icons/items/staff04.png",
            "staff02Icon":"resources/images/icons/items/staff02.png",
            "staff03Icon":"resources/images/icons/items/staff03.png",
            "staff05Icon":"resources/images/icons/items/staff05.png",
            "wand01Icon":"resources/images/icons/items/wand01.png",
            "wand02Icon":"resources/images/icons/items/wand02.png",
            "wand03Icon":"resources/images/icons/items/wand03.png",
            "shortSword01Icon":"resources/images/icons/items/shortSword01.png",
            "sword01Icon":"resources/images/icons/items/sword01.png",
            "katana01Icon":"resources/images/icons/items/katana01.png",
            "greatSword01Icon":"resources/images/icons/items/greatSword01.png",
            "executionerSword01Icon":"resources/images/icons/items/executionerSword01.png",
            "key01Icon":"resources/images/icons/items/key01.png",
            "key02Icon":"resources/images/icons/items/key02.png",
            "foxFfoxCorsacIcon":"resources/images/icons/characters/foxFfoxCorsac.png",
            "foxMfoxRedIcon":"resources/images/icons/characters/foxMfoxRed.png",
            "foxMfoxCorsacIcon":"resources/images/icons/characters/foxMfoxCorsac.png",
            "foxFfoxRedIcon":"resources/images/icons/characters/foxFfoxRed.png",
            "aardwolfMfoxCorsacIcon":"resources/images/icons/characters/aardwolfMfoxCorsac.png",
            "spiritNIcon":"resources/images/icons/characters/spiritN.png",
            "skeletonNIcon":"resources/images/icons/characters/skeletonN.png",
            "foxSkeletonHeadIcon":"resources/images/icons/items/foxSkeletonHead.png",
            "foxM01HeadIcon":"resources/images/icons/items/foxM01Head.png",
            "foxM02HeadIcon":"resources/images/icons/items/foxM02Head.png",
            "cap01Icon":"resources/images/icons/items/cap01.png",
            "trumpet01Icon":"resources/images/icons/items/trumpet01.png",
            "birdMask01Icon":"resources/images/icons/items/birdMask01.png",
            "spiderIcon":"resources/images/icons/characters/spider.png",
            "plainDoorIcon":"resources/images/icons/static/plainDoor.png",
            "craftsmanWall01Icon":"resources/images/icons/static/craftsmanWall01.png",
            "yellowWallpaperPlainWoodIcon.craftsmanWall01":"resources/images/icons/static/yellowWallpaperPlainWood.craftsmanWall01.png",
            "greenWallpaperPlainWoodIcon.craftsmanWall01":"resources/images/icons/static/greenWallpaperPlainWood.craftsmanWall01.png",
            "pinkWallpaperPlainWoodIcon.craftsmanWall01":"resources/images/icons/static/pinkWallpaperPlainWood.craftsmanWall01.png",
            "stopSignIcon":"resources/images/icons/items/stopSign.png",
            "frigeratorIcon":"resources/images/icons/items/frigerator.png",
            "cheeseWheelIcon":"resources/images/icons/items/cheeseWheel.png",
            "cheeseWheelSansWedgeIcon":"resources/images/icons/items/cheeseWheelSansWedge.png",
            "cheeseWedgeIcon":"resources/images/icons/items/cheeseWedge.png",
            "stick01Icon":"resources/images/icons/items/stick01.png",
            "stick03Icon":"resources/images/icons/items/stick03.png",
            "stick04Icon":"resources/images/icons/items/stick04.png",
            "rock01Icon":"resources/images/icons/items/rock01.png"
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
         * Map of Lighting that are waiting to be created;
         * it's basically the same as furnitureToCreate :v
         * @type {<String, <String:id, String:name, String:mesh, String:texture, String:type, String:options, String:position, String:rotation, String:scaling, Boolean:createCollisionMesh>}
         */
        this.lightingToCreateCounter = 0;
        this.lightingToCreate = {};
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
        this.attachmentsToCreateCounter = 0;
        this.attachmentsToCreate = {};
        
        this.hasBackloggedEntities = false;

        this.entityControllers = {};
        this.furnitureControllers = {};
        this.lightingControllers = {};
        this.doorControllers = {};
        this.characterControllers = {};
        this.itemControllers = {};

        this.entities = {};
        this.furnitureEntities = {};
        this.lightingEntities = {};
        this.doorEntities = {};
        this.characterEntities = {};
        this.itemEntities = {};
        this.clothingEntities = {};
        this.weaponEntities = {};
        this.keyEntities = {};
        this.spellEntities = {};

        this.instancedEntities = {};
        this.instancedItemEntities = {};
        this.instancedClothingEntities = {};
        this.instancedWeaponEntities = {};

        this.dialogues = {};
        this.cosmetics = {};

        this.entityAnimationBones = {
            "71_punch01":[
                "shoulder.r",
                "upperArm.r",
                "forearm.r",
                "IK.hand.r",
                "wrist.r",
                "fingersMetacarpal.r",
                "fingersProximinalPhalanx.r",
                "fingersMiddlePhalanx.r",
                "fingersDistalPhalanx.r",
                "thumbMetacarpal.r",
                "thumbProximinalPhalanx.r",
                "thumbDistalPhalanx.r",
                "fingersPinkieMetacarpal.r",
                "fingersPinkieProximinalPhalanx.r",
                "fingersPinkieMiddlePhalanx.r",
                "fingersPinkieDistalPhalanx.r",
                "fingersIndexMetacarpal.r",
                "fingersIndexProximinalPhalanx.r",
                "fingersIndexMiddlePhalanx.r",
                "fingersIndexDistalPhalanx.r",
                "POLE.elbow.r"
            ],
            "10_hand.r.grip":[
                "fingersMetacarpal.r",
                "fingersProximinalPhalanx.r",
                "fingersMiddlePhalanx.r",
                "fingersDistalPhalanx.r",
                "thumbMetacarpal.r",
                "thumbProximinalPhalanx.r",
                "thumbDistalPhalanx.r",
                "fingersPinkieMetacarpal.r",
                "fingersPinkieProximinalPhalanx.r",
                "fingersPinkieMiddlePhalanx.r",
                "fingersPinkieDistalPhalanx.r",
                "fingersIndexMetacarpal.r",
                "fingersIndexProximinalPhalanx.r",
                "fingersIndexMiddlePhalanx.r",
                "fingersIndexDistalPhalanx.r",
            ]
        }

        this._finishedInitializing = false;
        this._finishedFirstLoad = false;
        this._finishedScene = false;

        this.keyboardControls = {};
        this.player = undefined;
        this._castRayTargetIntervalFunction = undefined;
        this._castRayTargetInterval = 250;
        this._pointerLockFunction = undefined;
        this.previousSelectedMesh = undefined;
        this.currentSelectedMesh = undefined;
        this._playerPortraitStatsUpdateIntervalFunction = undefined;
        this._playerPortraitStatsUpdateInterval = 100;

        this.enableFirstPerson = true;
        this.enableCameraAvatarRotation = true;

        this.postProcess = {};

        this.highlightEnabled = true;
        this.highlightLayer = new BABYLON.HighlightLayer("hl1", Game.scene);
        this.highlightLayer.outerGlow = true;
        this.highlightLayer.innerGlow = false;
        this.highlightedMesh = undefined;
        this.highlightedColorEnemy = "red";
        this.highlightedColorFriend = "green";
        this.highlightedColorNeutral = "white";

        this.actionUse = new ActionData(ActionEnum.USE, Game.actionUseFunction, false);
        this.actionLay = new ActionData(ActionEnum.LAY, Game.actionLayFunction, false);
        this.actionSit = new ActionData(ActionEnum.SIT, Game.actionSitFunction, false);
        this.actionTake = new ActionData(ActionEnum.TAKE, Game.actionTakeFunction, false);
        this.actionOpen = new ActionData(ActionEnum.OPEN, Game.actionOpenFunction, false);
        this.actionClose = new ActionData(ActionEnum.CLOSE, Game.actionCloseFunction, false);
        this.actionTalk = new ActionData(ActionEnum.TALK, Game.actionTalkFunction, false);
        this.actionEquip = new ActionData(ActionEnum.EQUIP, Game.actionEquipFunction, false);
        this.actionUnequip = new ActionData(ActionEnum.UNEQUIP, Game.actionUnequipFunction, false);
        this.XP_MIN = 0;
        this.XP_MAP = 355000;
        this.LEVEL_MIN = 0;
        this.LEVEL_MAX = 20;

        this.kWeaponSimpleMeleeTypes = new Set(["club","dagger","greatclub","handaxe","javelin","lighthammer","mace","quarterstaff","sickle","spear"]);
        this.kWeaponSimpleRangedTypes = new Set(["lightcrossbow","dart","shortbow","sling"]);
        this.kWeaponMartialMeleeTypes = new Set(["battleaxe","flail","glaive","greataxe","greatsword","halberd","lance","longsword","maul","morningstar","pike","rapier","scimitar","shortsword","trident","warpick","warhammer","whip"]);
        this.kWeaponMartialRangedTypes = new Set(["blowgun","handcrossbow","heavycrossbow","longbow","net"]);
        this.kWeaponMeleeTypes = new Set([...this.kWeaponSimpleMeleeTypes, ...this.kWeaponMartialMeleeTypes]);
        this.kWeaponRangedTypes = new Set([...this.kWeaponSimpleRangedTypes, ...this.kWeaponMartialRangedTypes]);
        this.kWeaponTypes = new Set([...this.kWeaponMeleeTypes, ...this.kWeaponRangedTypes]);

        this.loadDefaultTextures();
        this.loadDefaultMaterials();
        this.loadDefaultMeshes();
        /*
            Which function handles the function of the key presses;
            controlerCharacter, controlMenu
         */
        this.functionControlOnKeyDown = Game.controlCharacterOnKeyDown;
        this.functionControlOnKeyUp = Game.controlCharacterOnKeyUp;
        // TODO: add support for other GUIs (that aren't created yet :v, like HTML instead of BABYLON.GUI)
        this.gui = GameGUI;
        this.gui.initialize();
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
        Game.scene.enablePhysics(Game.scene.gravity, this.physicsPlugin);
        this.physicsEnabled = true;
    }
    static initFollowCamera(_offset = BABYLON.Vector3.Zero()) {
        if (Game.camera instanceof BABYLON.Camera) {
            Game.camera.dispose();
        }
        Game.camera = new BABYLON.ArcRotateCamera(
            "camera",
            -Game.player.getController().getMesh().rotation.y-4.69,
            Math.PI/2.5,
            3,
            Game.player.getController().getBoneByName("FOCUS").getAbsolutePosition(Game.player.getController().getMesh()),
            Game.scene);
        Game.camera.collisionRadius = new BABYLON.Vector3(0.1, 0.1, 0.1);
        Game.camera.checkCollisions = true;
        Game.camera.wheelPrecision = 100;
        Game.camera.upperRadiusLimit = 2;
        Game.camera.lowerRadiusLimit = 0.1;
        Game.camera.keysLeft=[];
        Game.camera.keysRight=[];
        Game.camera.keysUp=[];
        Game.camera.keysDown=[];
        Game.camera.attachControl(this.canvas, false);

        Game.camera.minZ = 0.001;
        Game.camera.lockedTarget = Game.player.getController().focus;
        Game.initPostProcessing();
    }
    static initFreeCamera(_applyGravity = true) {
        if (Game.debugEnabled) console.log("Running initFreeCamera");
        if (Game.camera instanceof BABYLON.Camera) {
            Game.camera.dispose();
        }
        Game.camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(2, 0.8, -20), Game.scene);
        Game.camera.radius = 2;
        Game.camera.minZ = 0.001;
        Game.camera.heightOffset = 1;
        Game.camera.rotationOffset = 0;
        Game.camera.speed = 0.25;
        Game.camera.attachControl(this.canvas, true);
        if (this.physicsEnabled) {}
        else {
            Game.camera.applyGravity = _applyGravity;
            Game.camera.ellipsoid = new BABYLON.Vector3(0.1, 1.1, 0.1);
            Game.camera.checkCollisions = true;
        }
        Game.initPostProcessing();
    }
    static initPlayer(_position = new BABYLON.Vector3(3, 0, -17), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One()) {
        if (Game.debugEnabled) console.log("Running initPlayer");
        var _player = Game.createCharacter(undefined, "Player", undefined, "genericCharacterIcon", 18, SexEnum.MALE, SpeciesEnum.FOX, "foxM", "foxRed", undefined, _position, _rotation, _scaling);
        _player.attachToFOCUS("cameraFocus");
        _player.getMesh().isPickable = false;
        Game.player = _player.entity;
        Game.player.addItem(new InstancedItemEntity(undefined, "woodenMallet"));
        Game.gui.setPlayerPortrait(Game.player);
        Game.initFollowCamera();
        Game.initCastRayInterval();
        Game.initPlayerPortraitStatsUpdateInterval();
        return Game.player;
    }
    static initBaseKeyboardControls() {
        this.chatInputFocusCode = 13;
        this.chatInputSubmitCode = 13;
        this.showMainMenuCode = 27;
    }
    static initQwertyKeyboardControls() {
        Game.initBaseKeyboardControls();
        this.walkCode = 87; // W
        this.walkBackCode = 83; // S
        this.turnLeftCode = 0;
        this.turnRightCode = 0;
        this.strafeLeftCode = 65; // A
        this.strafeRightCode = 68; // D
        this.jumpCode = 32; // Space
        this.interfaceTargetedEntityCode = 70; // F
        this.useTargetedEntityCode = 69; // E
        this.interfaceSelectedItemCode = 0;
        this.useSelectedItemCode = 82; // R
        this.showInventoryCode = 73; // I
        Game._updateMenuKeyboardDisplayKeys();
    }
    static initDvorakKeyboardControls() {
        Game.initBaseKeyboardControls();
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
        Game._updateMenuKeyboardDisplayKeys();
    }
    static initAzertyKeyboardControls() {
        Game.initBaseKeyboardControls();
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
        Game._updateMenuKeyboardDisplayKeys();
    }
    static _updateMenuKeyboardDisplayKeys() {
        Game.gui.setActionTooltipLetter();
    }
    static initPostProcessing() {
        this.postProcess["fxaa"] = new BABYLON.FxaaPostProcess("fxaa", 2.0, Game.camera);
        //this.postProcess["tonemap"] = new BABYLON.TonemapPostProcess("tonemap", BABYLON.TonemappingOperator.Hable, 1.0, Game.camera); // Could be used for darkness, when using too many lights is an issue
    }
    static loadDefaultTextures() {
        Game.loadedTextures["default"] = new BABYLON.Texture(null, Game.scene);
        Game.loadTexture("missingTexture");
    }
    static loadDefaultMaterials() {
        Game.loadMaterial(new BABYLON.StandardMaterial("default", Game.scene));
        Game.loadMaterial(new BABYLON.Material("collisionMaterial", Game.scene));
        Game.loadMaterial(new BABYLON.StandardMaterial("missingMaterial", Game.scene));
        Game.loadMaterial(new BABYLON.StandardMaterial("loadingMaterial", Game.scene));
        Game.loadMaterial("missingMaterial", "missingTexture");
        Game.loadedMaterials["default"].specularColor.set(0,0,0);
        Game.loadedMaterials["missingMaterial"].specularColor.set(0,0,0);
        Game.loadedMaterials["loadingMaterial"].specularColor.set(0,0,0);
        Game.loadedMaterials["loadingMaterial"].diffuseColor.set(1, 0.85, 1);
    }
    static loadDefaultMeshes() {
        Game.loadMesh(BABYLON.MeshBuilder.CreateBox("missingMesh", {height: 0.3, width:0.3, depth:0.3}, Game.scene));
        Game.loadMesh(BABYLON.MeshBuilder.CreateSphere("loadingMesh", {diameter: 0.6}, Game.scene));
        Game.loadedMeshes["missingMesh"].material = Game.loadedMaterials["missingMaterial"];
        Game.loadedMeshes["missingMesh"].setEnabled(false);
        Game.loadedMeshes["loadingMesh"].setEnabled(false);
    }
    static loadTexture(_texture = "", _options = {}) {
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
                if (_options.hasOwnProperty("hasAlpha")) {
                    _newTexture.hasAlpha = _options["hasAlpha"] == true;
                }
                Game.setLoadedTexture(_texture, _newTexture);
                return _newTexture;
            }
        }
        return null;
    }
    static loadMaterial(_material = "", _diffuseTexture = undefined, _bumpTexture = undefined, _options = {}) {
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
            _diffuseTexture = Game.loadTexture(_diffuseTexture);
            _bumpTexture = Game.loadTexture(_bumpTexture);
            if (this.loadedMaterials.hasOwnProperty(_material)) {
                return this.loadedMaterials[_material];
            }
            else if (!(_diffuseTexture instanceof BABYLON.Texture)) {
                _diffuseTexture = Game.loadTexture(_material);
                if (_diffuseTexture instanceof BABYLON.Texture) {
                    _material = _diffuseTexture.name;
                }
            }
            if (!(_diffuseTexture instanceof BABYLON.Texture)) {
                return Game.loadedTextures["missingTexture"];
            }
            var _newMaterial = new BABYLON.StandardMaterial(_material)
            _newMaterial.name = _diffuseTexture.name;
            _newMaterial.diffuseTexture = _diffuseTexture;
            if (_bumpTexture instanceof BABYLON.Texture) {
                _newMaterial.bumpTexture = _bumpTexture;
            }
            _newMaterial.specularColor.set(0,0,0);
            if (typeof _options == "object") {
                if (_options.hasOwnProperty("specularColor")) {
                    _newMaterial.specularColor.set(Game.filterVector(_options["specularColor"]));
                }
            }
            Game.setLoadedMaterial(_material, _newMaterial);
            return _newMaterial;
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
    static importCosmetics() {
        Game.importScript("resources/js/cosmetics.js");
    }
    /**
     * Specific bones used for animations
     */
    static importEntityAnimationBones() {
        Game.importScript("resources/js/entityAnimationBones.js");
    }
    static controlMenuOnKeyDown(event) {
        if (!this.initialized) {
            return undefined;
        }
    }
    static controlMenuOnKeyUp(event) {
        if (!this.initialized) {
            return undefined;
        }
    }
    static controlCharacterOnKeyDown(event) {
        if (Game.debugEnabled) console.log(`Running Game::controlCharacterOnKeyDown(${event})`);
        if (!this.initialized) {
            return undefined;
        }
        if (!Game.player instanceof CharacterEntity || !Game.player.hasController()) {
            return undefined;
        }
        switch (event) {
            case this.jumpCode : {
                Game.player.getController().keyJump(true);
                break;
            }
            case 16 : {
                Game.player.getController().keyShift(true);
                break;
            }
            case this.walkCode : {
                Game.player.getController().keyMoveForward(true);
                break;
            }
            case this.turnLeftCode : {
                Game.player.getController().keyTurnLeft(true);
                break;
            }
            case this.turnRightCode : {
                Game.player.getController().keyTurnRight(true);
                break;
            }
            case this.walkBackCode : {
                Game.player.getController().keyMoveBackward(true);
                break;
            }
            case this.strafeLeftCode : {
                Game.player.getController().keyStrafeLeft(true);
                break;
            }
            case this.strafeRightCode : {
                Game.player.getController().keyStrafeRight(true);
                break;
            }
            case this.chatInputFocusCode : {
                if (Game.gui.getHudVisible()) {
                    if (!Game.gui.getChatInputFocused()) {
                        Game.gui.setChatInputFocused(true);
                    }
                    else {
                        var _text = Game.gui.getChatInput().text.trim();
                        if (_text.length == 0) {
                            return;
                        }
                        if (Client.isOnline()) {
                            Client.sendChatMessage(_text);
                        }
                        else {
                            Game.chatCommands(_text);
                        }
                        Game.gui.chatInputClear();
                    }
                }
                break;
            }
            case this.chatInputSubmitCode : {
                var _text = Game.gui.getChatInput().text.trim();
                if (_text.length == 0) {
                    return;
                }
                if (Client.isOnline()) {
                    Client.sendChatMessage(_text);
                }
                else {
                    Game.chatCommands(_text);
                }
                Game.gui.chatInputClear();
                Game.gui.setChatInputFocused(false);
                break;
            }
            case this.useTargetedEntityCode : {
                /*
                    TODO: on press (which it's being right now) begin a timeout for 1.5 (or w/e) seconds that opens a radial for additional interfacing;
                        if the key is released before then, which should be handled in controlCharacterOnKeyDown's useTargetedEntityCode, delete the timeout function
                        if the key isn't released before then, run the function, which deletes the timeout function, and opens the radial for additional interface
                        
                        _radialBeginInterval() {
                            Game.setInterval(Game.castRayTarget, Game._radianIntervalFunction);
                        }
                        _radialEndInterval() {}
                        _radianIntervalFunction() {}
                 */
                break;
            }
            case this.interfaceTargetedEntityCode : {
                break;
            }
            case this.showInventoryCode : {
                if (Game.gui.getInventoryVisible()) {
                    Game.gui.hideInventory(false);
                    Game.gui.showHUD(false);
                }
                else {
                    Game.gui.showPlayerInventory(false);
                }
                break;
            }
            case this.showMainMenuCode : {
                if (Game.gui.getMenuVisible()) {
                    if (Game.debugEnabled) console.log(`\tShowing HUD`);
                    Game.gui.hideMenu(false);
                    Game.gui.showHUD(false);
                }
                else {
                    if (Game.debugEnabled) console.log(`\tShowing Main Menu`);
                    Game.gui.hideHUD(false);
                    Game.gui.showCharacterChoiceMenu(false);
                }
                break;
            }
            default : {
            }
        }
        Game.player.getController().move = Game.player.getController().anyMovement();
        if (!Game.player.getController().key.equals(Game.player.getController().prevKey)) {
            if (Client.online) {
                Client.updateLocRotScaleSelf();
            }
            Game.player.getController().prevKey.copyFrom(Game.player.getController().key);
        }
    }
    static controlCharacterOnKeyUp(event) {
        if (!this.initialized) {
            return undefined;
        }
        switch (event) {
            case this.jumpCode : {
                Game.player.getController().keyJump(false);
                break;
            }
            case 16 : {
                Game.player.getController().keyShift(false);
                break;
            }
            case this.walkCode : {
                Game.player.getController().keyMoveForward(false);
                break;
            }
            case this.turnLeftCode : {
                Game.player.getController().keyTurnLeft(false);
                break;
            }
            case this.turnRightCode : {
                Game.player.getController().keyTurnRight(false);
                break;
            }
            case this.walkBackCode : {
                Game.player.getController().keyMoveBackward(false);
                break;
            }
            case this.strafeLeftCode : {
                Game.player.getController().keyStrafeLeft(false);
                break;
            }
            case this.strafeRightCode : {
                Game.player.getController().keyStrafeRight(false);
                break;
            }
            case this.useTargetedEntityCode : {
                if (!(Game.player.getController().targetController instanceof EntityController)) {
                    return;
                }
                if (Game.player.getController().targetController.getEntity() instanceof AbstractEntity) {
                    this.doEntityAction(Game.player.getController().targetController.getEntity(), Game.player, Game.player.getController().targetController.getEntity().getDefaultAction());
                }
                break;
            }
            default : {
            }
        }
        Game.player.getController().move = Game.player.getController().anyMovement();
        if (!Game.player.getController().key.equals(Game.player.getController().prevKey)) {
            if (Client.online) {
                Client.updateLocRotScaleSelf();
            }
            Game.player.getController().prevKey.copyFrom(Game.player.getController().key);
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
        _wall.material = Game.loadedMaterials["collisionMaterial"];
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
        var _posY = _posY - 0.125/2;
        var _posZ = (_posStart.z + _posEnd.z) / 2;
        var _floor = BABYLON.MeshBuilder.CreateBox("wall", {height:0.125, depth:_depth, width:_width}, Game.scene);
        _floor.material = Game.loadedMaterials["collisionMaterial"];
        _floor.position.set(_posX,_posY,_posZ);
        if (this.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(_floor, {mass:0});
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
        _ramp.position.set((_posEnd.x + _posStart.x) / 2 - 1,(_posEnd.y + _posStart.y) / 2 - 0.125/2,(_posEnd.z + _posStart.z) / 2 - 1);
        _ramp.rotation.set(_angle, BABYLON.Tools.ToRadians(_rotationY), 0);
        _ramp.material = Game.loadedMaterials["collisionMaterial"];
        if (this.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(_ramp, {mass:0});
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
        _mesh.collisionMesh.material = Game.loadedMaterials["collisionMaterial"];
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
    static addItemMesh(_id = undefined, _meshID = "missingMesh", _texture = "missingMaterial", _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One(), _forceCreateClone = false) {
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
    static addFurnitureMesh(_id = undefined, _meshID = "missingMesh", _texture = "missingMaterial", _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One(), _forceCreateClone = false, _createCollisionMesh = true) {
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
    static addCharacterMesh(_id = undefined, _meshID = "missingMesh", _texture = "missingMaterial", _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One()) {
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
     * @param  {String}  _id               New ID for BABYLON.Mesh and EntityController
     * @param  {String}  _mesh             String ID of Mesh to create
     * @param  {String}  _material         String ID of Material to apply to Mesh
     * @param  {BABYLON.Vector3}  _position         Mesh position
     * @param  {BABYLON.Vector3}  _rotation         Mesh rotation
     * @param  {BABYLON.Vector3}  _scaling          Mesh scaling
     * @param  {Boolean} _forceCreateClone Forces the creation of a clone instead of an instance; workaround for highlighting and attaching to bones.
     * @return {BABYLON.Mesh, BABYLON.InstancedMesh}                    The created mesh
     */
    static createMesh(..._blob) {
        if (Game.debugEnabled) console.log("Running createMesh");
        var _id = undefined;
        var _mesh = undefined;
        var _material = undefined;
        var _position = undefined;
        var _rotation = undefined;
        var _scaling = undefined;
        var _forceCreateClone = false;
        if ((typeof _blob[2] == "string" || _blob[2] == undefined) && _blob[3] instanceof BABYLON.Vector3) {
            _id = Game.filterID(_blob[0]);
            if (_id == undefined) {
                _id = genUUIDv4();
            }
            _mesh = _blob[1] instanceof BABYLON.AbstractMesh ? _blob[1].name : (typeof _blob[1] == "string" ? _blob[1] : "missingMesh");
            _material = _blob[2] instanceof BABYLON.Material ? _blob[2].id : (typeof _blob[2] == "string" ? _blob[2] : "missingMaterial");
            _position = _blob[3] instanceof BABYLON.Vector3 ? _blob[3] : BABYLON.Vector3.Zero();
            _rotation = _blob[4] instanceof BABYLON.Vector3 ? _blob[4] : BABYLON.Vector3.Zero();
            _scaling = _blob[5] instanceof BABYLON.Vector3 ? _blob[5] : BABYLON.Vector3.One();
            _forceCreateClone = _blob[6] == true;
        }
        else if ((typeof _blob[1] == "string" || _blob[1] == undefined) && _blob[2] instanceof BABYLON.Vector3) {
            _id = genUUIDv4();
            _mesh = _blob[0] instanceof BABYLON.AbstractMesh ? _blob[0].name : (typeof _blob[0] == "string" ? _blob[0] : "missingMesh");
            _material = _blob[1] instanceof BABYLON.Material ? _blob[1].name : (typeof _blob[1] == "string" ? _blob[1] : "missingMaterial");
            _position = _blob[2] instanceof BABYLON.Vector3 ? _blob[2] : BABYLON.Vector3.Zero();
            _rotation = _blob[3] instanceof BABYLON.Vector3 ? _blob[3] : BABYLON.Vector3.Zero();
            _scaling = _blob[4] instanceof BABYLON.Vector3 ? _blob[4] : BABYLON.Vector3.One();
            _forceCreateClone = _blob[5] == true;
        }
        else {
            return null;
        }

        var _loadedMesh = Game.loadMesh(_mesh);
        var _loadedMaterial = Game.loadMaterial(_material);
        if (_loadedMesh == Game.loadedMeshes["missingMesh"]) {
            return false;
        }
        else if (_loadedMesh == Game.loadedMeshes["loadingMesh"]) {
            Game.addMeshToCreate(_id, _mesh, _material, _position, _rotation, _scaling, _forceCreateClone);
            return true;
        }

        _mesh = _loadedMesh.name;
        _material = _loadedMaterial.name;

        if (_loadedMesh.skeleton instanceof BABYLON.Skeleton) {
            var _newMesh = _loadedMesh.clone(_id);
            _newMesh.makeGeometryUnique();
            Game.addClonedMesh(_newMesh, _id);
            
            _newMesh.material = _loadedMaterial;
            _newMesh.skeleton = _loadedMesh.skeleton.clone(_id + "Skeleton");
            Game.setLoadedMeshMaterial(_loadedMesh, _loadedMaterial);
            
            _newMesh.name = _loadedMesh.name;
            _loadedMesh = _newMesh;
        }
        else {
            if (!this.loadedMeshMaterials.hasOwnProperty(_mesh)) {
                this.loadedMeshMaterials[_mesh] = {};
            }
            if (!this.loadedMeshMaterials[_mesh].hasOwnProperty(_material)) {
                _loadedMesh = _loadedMesh.clone(_material);
                _loadedMesh.makeGeometryUnique();
                if (Game.debugEnabled) console.log("Creating master clone of " + _mesh + " with " + _material);
                _loadedMesh.material = _loadedMaterial;
                _loadedMesh.name = _mesh;
                _loadedMesh.setEnabled(false);
                _loadedMesh.position.set(0,-4095,0);
                Game.setLoadedMeshMaterial(_loadedMesh, _loadedMaterial);
            }
            if (_forceCreateClone === true) {
                if (Game.debugEnabled) console.log("  Creating clone...");
                _loadedMesh = this.loadedMeshMaterials[_mesh][_material].clone(_id);
                Game.addClonedMesh(_loadedMesh, _id);
            }
            else {
                if (Game.debugEnabled) console.log("  Creating instance...");
                _loadedMesh = this.loadedMeshMaterials[_mesh][_material].createInstance(_id);
                Game.addInstancedMesh(_loadedMesh);
            }
            _loadedMesh.name = _mesh;
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
        Game.meshesToCreateCounter += 1;
        Game.hasBackloggedEntities = true;
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
    static addFurnitureToCreate(_id, _name = "", _mesh = "missingMesh", _texture = "missingMaterial", _type = "", _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One(), _createCollisionMesh = true) {
        if (Game.hasFurnitureToCreate(_id)) {
            return true;
        }
        Game.furnitureToCreate[_id] = {"id":_id, "name":_name, "mesh":_mesh, "texture":_texture, "type":_type, "options":_options, "position":_position, "rotation":_rotation, "scaling":_scaling, "createCollisionMesh":_createCollisionMesh};
        Game.furnitureToCreateCounter += 1;
        Game.hasBackloggedEntities = true;
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
    static addLightingToCreate(_id, _name = "", _mesh = "missingMesh", _texture = "missingMaterial", _type = "", _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One(), _lightingPositionOffset = BABYLON.Vector3.Zero(), _createCollisionMesh = true) {
        if (Game.hasLightingToCreate(_id)) {
            return true;
        }
        Game.lightingToCreate[_id] = {"id":_id, "name":_name, "mesh":_mesh, "texture":_texture, "type":_type, "options":_options, "position":_position, "rotation":_rotation, "scaling":_scaling, "lightingPositionOffset":_lightingPositionOffset, "createCollisionMesh":_createCollisionMesh};
        Game.lightingToCreateCounter += 1;
        Game.hasBackloggedEntities = true;
        return true;
    }
    static removeLightingToCreate(_id) {
        if (!Game.hasLightingToCreate(_id)) {
            return true;
        }
        delete Game.lightingToCreate[_id];
        Game.lightingToCreateCounter -= 1;
        return true;
    }
    static hasLightingToCreate(_id) {
        return Game.lightingToCreateCounter > 0 && Game.lightingToCreate.hasOwnProperty(_id);
    }
    static _createBackloggedLighting() {
        if (Game.lightingToCreateCounter == 0) {
            return true;
        }
        for (var _i in Game.lightingToCreate) {
            if (Game.loadedMeshes.hasOwnProperty(Game.lightingToCreate[_i]["mesh"])) {
                Game.createLighting(
                    Game.lightingToCreate[_i]["id"],
                    Game.lightingToCreate[_i]["name"],
                    Game.lightingToCreate[_i]["mesh"],
                    Game.lightingToCreate[_i]["texture"],
                    Game.lightingToCreate[_i]["type"],
                    Game.lightingToCreate[_i]["options"],
                    Game.lightingToCreate[_i]["position"],
                    Game.lightingToCreate[_i]["rotation"],
                    Game.lightingToCreate[_i]["scaling"],
                    Game.lightingToCreate[_i]["lightingPositionOffset"],
                    Game.lightingToCreate[_i]["createCollisionMesh"]
                );
                Game.removeLightingToCreate(_i);
            }
        }
    }
    static addDoorsToCreate(_id, _name = "", _to = "", _mesh = "missingMesh", _texture = "missingMaterial", _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One()) {
        if (Game.hasDoorsToCreate(_id)) {
            return true;
        }
        Game.doorsToCreate[_id] = {"id":_id, "name":_name, "to":_to, "mesh":_mesh, "texture":_texture, "options":_options, "position":_position, "rotation":_rotation, "scaling":_scaling};
        Game.doorsToCreateCounter += 1;
        Game.hasBackloggedEntities = true;
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
    static addCharacterToCreate(_id, _name = "", _description = "", _image = undefined, _age = 18, _sex = SexEnum.MALE, _species = SpeciesEnum.FOX, _mesh = "missingMesh", _texture = "missingMaterial", _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One()) {
        if (Game.hasCharacterToCreate(_id)) {
            return true;
        }
        Game.charactersToCreate[_id] = {"id":_id, "name":_name, "description":_description, "image":_image, "age":_age, "sex":_sex, "species":_species, "mesh":_mesh, "texture":_texture, "options":_options, "position":_position, "rotation":_rotation, "scaling":_scaling};
        Game.charactersToCreateCounter += 1;
        Game.hasBackloggedEntities = true;
        return true;
    }
    static removeCharacterToCreate(_id) {
        if (!Game.hasCharacterToCreate(_id)) {
            return true;
        }
        delete Game.charactersToCreate[_id];
        Game.charactersToCreateCounter -= 1;
        return true;
    }
    static hasCharacterToCreate(_id) {
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
                Game.removeCharacterToCreate(_i);
            }
        }
    }
    static addItemToCreate(_id, _entity = undefined, _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One()) {
        if (Game.hasItemToCreate(_id)) {
            return true;
        }
        Game.itemsToCreate[_id] = {"id":_id, "entity":_entity, "options":_options, "position":_position, "rotation":_rotation, "scaling":_scaling};
        Game.itemsToCreateCounter += 1;
        Game.hasBackloggedEntities = true;
        return true;
    }
    static removeItemToCreate(_id) {
        if (!Game.hasItemToCreate(_id)) {
            return true;
        }
        delete Game.itemsToCreate[_id];
        Game.itemsToCreateCounter -= 1;
        return true;
    }
    static hasItemToCreate(_id) {
        return Game.itemsToCreateCounter > 0 && Game.itemsToCreate.hasOwnProperty(_id);
    }
    static _createBackloggedItems() {
        if (Game.itemsToCreateCounter == 0) {
            return true;
        }
        for (var _i in Game.itemsToCreate) {
            if (Game.loadedMeshes.hasOwnProperty(Game.itemsToCreate[_i]["mesh"])) {
                Game.createItem(
                    Game.itemsToCreate[_i]["id"],
                    Game.itemsToCreate[_i]["entity"],
                    Game.itemsToCreate[_i]["options"],
                    Game.itemsToCreate[_i]["position"],
                    Game.itemsToCreate[_i]["rotation"],
                    Game.itemsToCreate[_i]["scaling"]
                );
                Game.removeItemToCreate(_i);
            }
        }
    }
    static addAttachmentToCreate(_id, _attachToController, _mesh, _texture, _bone, _position, _rotation, _scaling) {
        if (Game.hasAttachmentToCreate(_id)) {
            return true;
        }
        Game.attachmentsToCreate[_id] = {"id":_id, "attachToController":_attachToController, "mesh":_mesh, "texture":_texture, "bone":_bone, "position":_position, "rotation":_rotation, "scaling":_scaling};
        Game.attachmentsToCreateCounter += 1;
        Game.hasBackloggedEntities = true;
        return true;
    }
    static removeAttachmentToCreate(_id) {
        if (!Game.hasAttachmentToCreate(_id)) {
            return true;
        }
        delete Game.attachmentsToCreate[_id];
        Game.attachmentsToCreateCounter -= 1;
        return true;
    }
    static hasAttachmentToCreate(_id) {
        return Game.attachmentsToCreateCounter > 0 && Game.attachmentsToCreate.hasOwnProperty(_id);
    }
    static _createBackloggedAttachments() {
        if (Game.attachmentsToCreateCounter == 0) {
            return true;
        }
        for (var _i in Game.attachmentsToCreate) {
            if (Game.loadedMeshes.hasOwnProperty(Game.attachmentsToCreate[_i]["mesh"])) {
                Game.attachmentsToCreate[_i]["attachToController"] = Game.getEntityController(Game.attachmentsToCreate[_i]["attachToController"]);
                if (Game.attachmentsToCreate[_i]["attachToController"] instanceof CharacterController) {
                    Game.attachmentsToCreate[_i]["attachToController"].attachToBone(
                        Game.attachmentsToCreate[_i]["mesh"],
                        Game.attachmentsToCreate[_i]["texture"],
                        Game.attachmentsToCreate[_i]["bone"],
                        Game.attachmentsToCreate[_i]["position"],
                        Game.attachmentsToCreate[_i]["rotation"],
                        Game.attachmentsToCreate[_i]["scaling"]
                    );
                }
                Game.removeAttachmentToCreate(_i);
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
                    _meshes[_i].material = Game.loadedMaterials["default"];
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
    static filterFloat(_int) {
        _int = Number.parseFloat(_int);
        if (isNaN(_int)) {
            return 1;
        }
        else if (_int > Number.MAX_SAFE_INTEGER) {
            _int = Number.MAX_SAFE_INTEGER;
        }
        else if (_int < Number.MIN_SAFE_INTEGER) {
            _int = Number.MIN_SAFE_INTEGER;
        }
        return Number(_int.toFixed(4));
    }
    static filterInt(_int) {
        return Math.round(Game.filterFloat(_int));
    }
    static filterNumber(_int) {
        return Game.filterFloat(_int);
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
        else if (_id instanceof AbstractEntity) {
            return _id.getController();
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
        return Game.getEntityController(_id) != undefined;
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
        else if (_id instanceof FurnitureEntity) {
            return _id.getController();
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
        return Game.getFurnitureController(_id) != undefined;
    }
    static getLightingController(_id) {
        if (_id == undefined) {
            return;
        }
        else if (_id instanceof LightingController) {
            return _id;
        }
        else if (_id instanceof LightingEntity) {
            return _id.getController();
        }
        else if (typeof _id == "string" && Game.lightingControllers.hasOwnProperty(_id)) {
            return Game.lightingControllers[_id];
        }
        else if (_id instanceof BABYLON.Mesh && _id.controller instanceof LightingController) {
            return _id.controller;
        }
        else {
            return undefined;
        }
    }
    static hasLightingController(_id) {
        return Game.getLightingController(_id) != undefined;
    }
    static getDoorController(_id) {
        if (_id == undefined) {
            return;
        }
        else if (_id instanceof DoorController) {
            return _id;
        }
        else if (_id instanceof DoorEntity) {
            return _id.getController();
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
        return Game.getDoorController(_id) != undefined;
    }
    static getItemController(_id) {
        if (_id == undefined) {
            return;
        }
        else if (_id instanceof ItemController) {
            return _id;
        }
        else if (_id instanceof InstancedItemEntity) {
            return _id.getController();
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
        return Game.getItemController(_id) != undefined;
    }
    static getCharacterController(_id) {
        if (_id == undefined) {
            return;
        }
        else if (_id instanceof CharacterController) {
            return _id;
        }
        else if (_id instanceof CharacterEntity) {
            return _id.getController();
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
        return Game.getCharacterController(_id) != undefined;
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
        return Game.getEntity(_id) != undefined;
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
        return Game.getProtoItemEntity(_id) != undefined;
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
        return Game.getInstancedItemEntity(_id) != undefined;
    }
    static getItemEntity(_id) {
        return Game.getInstancedItemEntity(_id);
    }
    static hasItemEntity(_id) {
        return Game.hasInstancedItemEntity(_id);
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
        return Game.getCharacterEntity(_id) != undefined;
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
    static createCharacter(_id, _name = "", _description = "", _image = undefined, _age = 18, _sex = SexEnum.MALE, _species = SpeciesEnum.FOX, _mesh = "missingMesh", _texture = "missingMaterial", _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One()) {
        if (typeof _id != "string") {_id = genUUIDv4();}
        _id = Game.filterID(_id);
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
            Game.addCharacterToCreate(_id, _name, _description, _image, _age, _sex, _species, _mesh, _texture, _options, _position, _rotation, _scaling);
            return true;
        }
        _position.y = _position.y + 0.0076; // Characters start sinking into the ground sometimes
        var _entity = new CharacterEntity(_id, _name, _description, _image, undefined, _age, _sex, _species);
        var _loadedMesh = Game.getAbstractMesh(_loadedMesh);
        if (_loadedMesh == undefined) {
            switch (_entity.species) {
                case SpeciesEnum.FOX: {
                    if (_entity.getSex() == SexEnum.MALE) {
                        _loadedMesh = "foxM";
                    }
                    else {
                        _loadedMesh = "foxF";
                    }
                    break;
                }
                case SpeciesEnum.SHEEP: {
                    if (_entity.getSex() == SexEnum.MALE) {
                        _loadedMesh = "sheepM";
                    }
                    else {
                        _loadedMesh = "sheepF";
                    }
                    break;
                }
                case SpeciesEnum.FOXSKELETON: {
                    _loadedMesh = "foxSkeletonN";
                }
                default : {
                    _loadedMesh = "foxSkeletonN";
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
        if (_controller == Game.player.getController()) {return;}
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
        _id = Game.filterID(_id);
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
        var _entity = new DoorEntity(_id, _name, undefined, undefined);
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
     * @param  {Number}  _type                Furniture type
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
        _id = Game.filterID(_id);
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
        return _controller;
    }
    static removeFurniture(_controller) {
        _controller = Game.getFurnitureController(_controller);
        if (_controller == undefined) {return;}
        if (_controller == Game.player.getController()) {return;}
        var _mesh = _controller.getMesh();
        _controller.entity.dispose();
        _controller.dispose();
        _mesh.material.dispose();
        Game.removeMesh(_mesh);
    }
    static createLighting(_id, _name = "", _mesh, _texture, _type, _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One(), _lightingPositionOffset = BABYLON.Vector3.Zero(), _createCollisionMesh = true) {
        if (typeof _id != "string") {_id = genUUIDv4();}
        _id = Game.filterID(_id);
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
        if (!(_lightingPositionOffset instanceof BABYLON.Vector3)) {
            _lightingPositionOffset = Game.filterVector(_scaling);
        }
        if (!(Game.hasLoadedMesh(_mesh))) {
            Game.loadMesh(_mesh);
            Game.addLightingToCreate(_id, _name, _mesh, _texture, _type, _options, _position, _rotation, _scaling, _lightingPositionOffset, _createCollisionMesh);
            return true;
        }
        var _loadedMesh = Game.addFurnitureMesh(_id, _mesh, _texture, _options, _position, _rotation, _scaling, true, _createCollisionMesh);
        _loadedMesh.checkCollisions = true; // _createCollisionMesh doesn't count this :v
        var _entity = new LightingEntity(_id, _name, undefined, undefined, _type);
        var _controller = new LightingController(_id, _loadedMesh, _entity, _type, _lightingPositionOffset);
        _entity.setController(_controller);
        _entity.setMeshID(_loadedMesh);
        _entity.off(); // set because lighting is bad
        _entity.setLocked(true); // set because lighting is bad
        return _controller;
    }
    static removeLighting(_controller) {
        _controller = Game.getLightingController(_controller);
        if (_controller == undefined) {return;}
        if (_controller == Game.player.getController()) {return;}
        var _mesh = _controller.getMesh();
        _controller.entity.dispose();
        _controller.dispose();
        _mesh.material.dispose();
        Game.removeMesh(_mesh);
    }
    static createProtoItem(_id, _name = "", _description = "", _image = "", _mesh = "missingMesh", _texture = "missingMaterial", _itemType = ItemEnum.GENERAL, _itemSubType = 0) {
        if (typeof _id != "string") {_id = genUUIDv4();}
        _id = Game.filterID(_id);
        var _entity = null;
        switch (_itemType) {
            case ItemEnum.GENERAL : {
                _entity = new ItemEntity(_id, _name, _description, _image);
                break;
            }
            case ItemEnum.APPAREL: {
                _entity = new ClothingEntity(_id, _name, _description, _image, _itemSubType);
                break;
            }
            case ItemEnum.WEAPON : {
                _entity = new WeaponEntity(_id, _name, _description, _image, _itemSubType);
                break;
            }
            case ItemEnum.KEY : {
                _entity = new KeyEntity(_id, _name, _description, _image);
                break;
            }
            case ItemEnum.BOOK : {
                //_entity = new BookEntity(_id, _name, _description, _image); // TODO: this :v
            }
            case ItemEnum.CONSUMABLE : {
                //_entity = new ConsumableEntity(_id, _name, _description, _image, _itemSubType); // TODO: this :v
            }
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
        if (typeof _id != "string") {
            _id = genUUIDv4();
        }
        _id = Game.filterID(_id);
        if (_entity instanceof ItemEntity) {
            _entity = _entity.createInstance(_id);
        }
        else if (_entity instanceof InstancedItemEntity) {
            _entity = _entity.clone(_id);
        }
        else if (typeof _entity == "string" && Game.hasProtoItemEntity(_entity)) {
            _entity = Game.getProtoItemEntity(_entity).createInstance(_id);
        }
        else {
            return null;
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
        if (!(Game.hasLoadedMesh(_entity.getMeshID()))) { // Never gonna trigger this, but here it is anyway :V
            Game.loadMesh(_entity.getMeshID());
            Game.addItemToCreate(_id, _entity, _options, _position, _rotation, _scaling);
            return true;
        }
        var _mesh = Game.addItemMesh(_id, _entity.getMeshID(), _entity.getTextureID(), _options, _position, _rotation, _scaling);
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
    static createCosmetic(_id, _name = "", _description = "", _image = "", _mesh = "missingMesh", _texture = "missingMaterial", _equipmentSlot = ApparelSlotEnum.HEAD) {
        return new Cosmetic(_id, _name, _description, _image, _mesh, _texture, _equipmentSlot);
    }
    static getCosmetic(_id) {
        if (_id == undefined) {
            return;
        }
        else if (_id instanceof Cosmetic) {
            return _id;
        }
        else if (typeof _id == "string" && Game.cosmetics.hasOwnProperty(_id)) {
            return Game.cosmetics[_id];
        }
        return null;
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
            if (_mesh.controller.getEntity().getOwner() != Game.player) {
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
        if (!(Game.player.getController() instanceof CharacterController)) {
            return false;
        }
        // Commented out for updating the 'dynamic' action tooltip
        /*if (_controller == Game.player.getController().getTarget()) {
            return null;
        }*/
        if (!(_controller instanceof EntityController) || !_controller.isEnabled()) {
            return null;
        }
        Game.highlightMesh(_controller.mesh);
        Game.player.getController().setTarget(_controller);
        Game.gui.setTargetPortrait(_controller.getEntity());
        Game.gui.showTargetPortrait();
        Game.gui.setActionTooltip(ActionEnum.properties[_controller.getEntity().getDefaultAction()].name);
        Game.gui.showActionTooltip();
    }
    static clearPlayerTarget() {
        if (!(Game.player.getController() instanceof CharacterController)) {
            return false;
        }
        if (Game.player.getController().getTarget() == undefined) {
            return undefined;
        }
        Game.clearHightlightMesh();
        Game.player.getController().clearTarget();
        Game.gui.hideTargetPortrait();
        Game.gui.hideActionTooltip();
    }
    static castRayTarget() {
        if (!(Game.player.getController() instanceof CharacterController)) {
            return false;
        }
        var _ray = Game.camera.getForwardRay(2 * Game.player.getController().getMesh().scaling.y, Game.camera.getWorldMatrix(), Game.player.getController().focus.getAbsolutePosition())
        if (Game.player.getController().targetRay == undefined) {
            Game.player.getController().targetRay = _ray;
        }
        else {
            Game.player.getController().targetRay.origin = _ray.origin;
            Game.player.getController().targetRay.direction = _ray.direction;
        }
        if (Game.debugEnabled) {
            if (Game.player.getController().targetRayHelper != undefined) {
                Game.player.getController().targetRayHelper.dispose();
            }
            Game.player.getController().targetRayHelper = new BABYLON.RayHelper(Game.player.getController().targetRay);
            Game.player.getController().targetRayHelper.show(Game.scene);
        }
        var _hit = Game.scene.pickWithRay(Game.player.getController().targetRay, function(_mesh) {
            if (_mesh.hasOwnProperty("controller") && _mesh != Game.player.getController().getMesh()) {
                return true;
            }
            return false;
        });
        if (_hit.hit) {
            if (_hit.pickedMesh.controller != Game.player.getController().getTarget()) {
                Game.setPlayerTarget(_hit.pickedMesh.controller);
            }
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
    static initPlayerPortraitStatsUpdateInterval() {
        clearInterval(Game._playerPortraitStatsUpdateIntervalFunction);
        Game._playerPortraitStatsUpdateIntervalFunction = setInterval(Game.gui.updatePlayerPortraitStats, Game._playerPortraitStatsUpdateInterval);
    }
    static setPlayerPortraitStatsUpdateInterval(_interval = 100) {
        if (_interval > 0) {
            Game._playerPortraitStatsUpdateInterval = _interval;
        }
        Game.initPlayerPortraitStatsUpdateInterval();
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
                Game.gui.chatOutputAppend("Possible commands are: help, clear, menu, login, logout, quit, save, and load.\n");
                break;
            }
            case "clear" : {
                Game.gui.chatOutputClear();
                break;
            }
            case "menu" : {
                Game.gui.showCharacterChoiceMenu();
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
                Game.gui.chatOutputAppend("\n    :V\n");
            }
            default : {
                Game.gui.chatOutputAppend(`Command "${_command}" not found.\n`);
                return;
            }
        }
    }
    static updateTargetValue() {
        if (!Game.player.getController().hasMesh()) {
            return null;
        }
        if (Game.camera.radius <= 0.5) {
            if (this.enableFirstPerson && Game.player.getController().getMesh().isVisible) {
                Game.player.getController().hideMesh();
                Game.camera.checkCollisions = false;
                Game.camera.inertia = 0.75;
                Game.gui.showCrosshair();
            }
        }
        else {
            if (!Game.player.getController().getMesh().isVisible) {
                Game.player.getController().showMesh();
                Game.camera.checkCollisions = true;
                Game.camera.inertia = 0.9;
                Game.gui.hideCrosshair();
            }
        }
    }
    static doEntityAction(_entity, _subEntity = Game.player, _action) {
        _entity = Game.getEntity(_entity) || Game.getInstancedItemEntity(_entity);
        _subEntity = Game.getEntity(_subEntity) || Game.getInstancedItemEntity(_subEntity);
        if (!_entity.hasAvailableAction(_action)) {
            return;
        }
        if (!(_entity.getAvailableAction(_action) instanceof ActionData) || !_entity.getAvailableAction(_action).hasFunction()) {
            if (_action == ActionEnum.USE) {
                if (_entity instanceof LightingEntity) {
                    _entity.toggle();
                }
            }
            else if (_action == ActionEnum.LAY) {
                Game.actionLayFunction(_entity, _subEntity);
            }
            else if (_action == ActionEnum.SIT) {
                Game.actionSitFunction(_entity, _subEntity);
            }
            else if (_action == ActionEnum.TAKE && _entity instanceof InstancedItemEntity) {
                Game.actionTakeFunction(_entity, _subEntity);
            }
            else if (_action == ActionEnum.OPEN && (_entity instanceof DoorEntity || _entity instanceof FurnitureEntity)) {
                Game.actionOpenFunction(_entity, _subEntity);
            }
            else if (_action == ActionEnum.CLOSE && (_entity instanceof DoorEntity || _entity instanceof FurnitureEntity)) {
                Game.actionCloseFunction(_entity, _subEntity);
            }
            else if (_action == ActionEnum.TALK && _entity instanceof CharacterEntity) {
                Game.actionTalkFunction(_entity, _subEntity);
            }
            else if (_action == ActionEnum.STEAL && _entity instanceof EntityWithStorage) {
                Game.actionTakeFunction(_entity, _subEntity);
            }
            return;
        }
        if (_entity instanceof InstancedEntity) {
            if (_entity.getAvailableAction(_action).overrideParent) {
                _entity.getAvailableAction(_action).execute();
            }
            else if (_entity.getAvailableAction(_action).runBeforeParent) {
                _entity.getAvailableAction(_action).execute();
                _entity.getAvailableAction(_action).execute();
            }
            else {
                _entity.getAvailableAction(_action).execute();
                _entity.getAvailableAction(_action).execute();
            }
        }
        else if (_entity instanceof Entity) {
            if (_entity.getAvailableAction(_action).overrideParent) {
                _entity.getAvailableAction(_action).execute();
            }
        }
    }
    static actionTakeFunction(_instancedItemEntity, _subEntity = Game.player) {
        if (!(_instancedItemEntity instanceof AbstractEntity)) {
            return;
        }
        if (!(_subEntity instanceof EntityWithStorage)) {
            return;
        }
        _subEntity.addItem(_instancedItemEntity);
        Game.removeItemInSpace(_instancedItemEntity);
    }
    static actionDropFunction(_instancedItemEntity, _subEntity = Game.player, _callback = undefined) {
        if (!(_instancedItemEntity instanceof AbstractEntity)) {
            return;
        }
        if (!(_subEntity instanceof EntityWithStorage)) {
            return;
        }
        if (!_subEntity.hasItem(_instancedItemEntity)) {
            if (typeof _callback == "function") {
                _callback();
            }
            return;
        }
        if (_subEntity instanceof CharacterController) {
            _subEntity.unequipEntity(_instancedItemEntity);
        }
        if (_instancedItemEntity.hasController() && _instancedItemEntity.getController().hasMesh()) { // it shouldn't have an EntityController :v but just in case
            _instancedItemEntity.setParent(null);
            _instancedItemEntity.position = _subEntity.getController().getMesh().position.clone.add(
                new BABYLON.Vector3(0, Game.getAbstractMesh(_instancedItemEntity.getMeshID()).getBoundingInfo().boundingBox.extendSize.y, 0)
            );
        }
        else {
            var _item = Game.createItem(undefined, _instancedItemEntity, undefined, _subEntity.getController().getMesh().position.add(
                new BABYLON.Vector3(0, Game.getAbstractMesh(_instancedItemEntity.getMeshID()).getBoundingInfo().boundingBox.extendSize.y, 0)
            ));
        }
        _subEntity.removeItem(_instancedItemEntity);
        if (typeof _callback == "function") {
            _callback();
        }
    }
    static actionCloseFunction(_entity, _subEntity = Game.player) {
        if (!(_entity instanceof AbstractEntity) || !(_entity.getController() instanceof EntityController)) {
            return;
        }
        if (!(_subEntity instanceof CharacterEntity)) {
            return;
        }
        if (_entity.getController() instanceof FurnitureController) {
            _entity.getController().currAnim = _entity.getController().closed;
            _entity.getController().beginAnimation(_entity.getController().close);
            _entity.setDefaultAction(ActionEnum.OPEN);
        }
        else if (_entity.getController() instanceof DoorController) {
            _entity.getController().doClose();
        }
    }
    static actionHoldFunction(_instancedItemEntity, _subEntity = Game.player, _callback = undefined) {
        if (!(_instancedItemEntity instanceof AbstractEntity)) {
            return;
        }
        if (!(_subEntity instanceof EntityWithStorage)) {
            return;
        }
        if (!_subEntity.hasItem(_instancedItemEntity)) {
            if (typeof _callback == "function") {
                _callback();
            }
            return;
        }
        _subEntity.hold(_instancedItemEntity);
        if (typeof _callback == "function") {
            _callback(_instancedItemEntity, undefined, _subEntity);
        }
    }
    static actionEquipFunction(_instancedItemEntity, _subEntity = Game.player, _callback = undefined) {
        if (!(_instancedItemEntity instanceof AbstractEntity)) {
            return;
        }
        if (!(_subEntity instanceof EntityWithStorage)) {
            return;
        }
        if (!_subEntity.hasItem(_instancedItemEntity)) {
            if (typeof _callback == "function") {
                _callback();
            }
            return;
        }
        if (_subEntity instanceof CharacterEntity) {
            _subEntity.equipEntity(_instancedItemEntity);
        }
        if (typeof _callback == "function") {
            _callback(_instancedItemEntity, undefined, _subEntity);
        }
    }
    static actionUnequipFunction(_instancedItemEntity, _subEntity = Game.player, _callback = undefined) {
        if (!(_instancedItemEntity instanceof AbstractEntity)) {
            return;
        }
        if (!(_subEntity instanceof EntityWithStorage)) {
            return;
        }
        if (!_subEntity.hasItem(_instancedItemEntity)) {
            if (typeof _callback == "function") {
                _callback();
            }
            return;
        }
        if (_subEntity instanceof CharacterEntity) {
            _subEntity.unequip(_instancedItemEntity);
        }
        if (typeof _callback == "function") {
            _callback(_instancedItemEntity, undefined, _subEntity);
        }
    }
    static actionReleaseFunction(_instancedItemEntity, _subEntity = Game.player, _callback = undefined) {
        if (!(_instancedItemEntity instanceof AbstractEntity)) {
            return;
        }
        if (!(_subEntity instanceof EntityWithStorage)) {
            return;
        }
        if (!_subEntity.hasItem(_instancedItemEntity)) {
            if (typeof _callback == "function") {
                _callback();
            }
            return;
        }
        _subEntity.unequipEntity(_instancedItemEntity);
        if (typeof _callback == "function") {
            _callback(_instancedItemEntity, undefined, _subEntity);
        }
    }
    static actionOpenFunction(_entity, _subEntity = Game.player) {
        if (!(_entity instanceof AbstractEntity) || !(_entity.getController() instanceof EntityController)) {
            return;
        }
        if (!(_subEntity instanceof CharacterEntity)) {
            return;
        }
        if (_entity.getController() instanceof FurnitureController) {
            _entity.getController().currAnim = _entity.getController().opened;
            _entity.getController().beginAnimation(_entity.getController().open);
            _entity.setDefaultAction(ActionEnum.CLOSE);
        }
        else if (_entity.getController() instanceof DoorController) {
            if (_entity.getLocked()) {
                if (!_subEntity.hasItem(_entity.getKey())) {
                    return;
                }
                _entity.setLocked(false);
            }
            _entity.getController().doOpen();
        }
    }
    static actionUseFunction(_entity, _subEntity = Game.player) {
        if (!(_entity instanceof AbstractEntity) || !(_entity.getController() instanceof EntityController)) {
            return;
        }
        if (!(_subEntity instanceof CharacterEntity)) {
            return;
        }
        if (_entity.getController() instanceof LightingController) {
            _entity.getController().toggle();
        }
    }
    /**
     * Places the subEntity near the Entity, and sets its parent to the Entity
     * TODO: Add actual placement of Characters based on their width
     * @param  {FurnitureEntity} _entity    Furniture
     * @param  {EntityController} _subEntity    Entity to be placed
     */
    static actionSitFunction(_entity, _subEntity = Game.player) {
        if (!(_entity instanceof FurnitureEntity) || !(_entity.getController() instanceof FurnitureController)) {
            return;
        }
        if (!(_subEntity instanceof CharacterEntity) || !(_subEntity.getController() instanceof CharacterController)) {
            return;
        }
        var _seatingBoundingBox = Game.getAbstractMesh(_entity.getController().getMesh().name).getBoundingInfo().boundingBox;
        var _seatingWidth = (_seatingBoundingBox.extendSize.x * _entity.getController().getMesh().scaling.x);
        _subEntity.getController().setParent(_entity.getController().getMesh());
        _subEntity.getController().getMesh().position.set(_seatingWidth / 2, 0.4, -0.0125);
        _subEntity.getController().getMesh().rotation.set(0,0,0);
    }
    static actionTalkFunction(_entity, _subEntity = Game.player) {
        if (!(_entity instanceof CharacterEntity)) {
            return;
        }
        if (!(_subEntity instanceof CharacterEntity)) {
            return;
        }
        if (!(_entity.getDialogue() instanceof Dialogue)) {
            return;
        }
        Game.gui.setDialogue(_entity.getDialogue(), _entity, _subEntity);
        Game.gui.showDialogueMenu();
        /*var _dialogue = _entity.getDialogue().getText();
        if (typeof _dialogue == "string") {
            Game.gui.chatOutputAppend(_entity.getFullName() + ": " + _dialogue);
        }
        else if (typeof _dialogue == "function") {
            Game.gui.chatOutputAppend(_entity.getFullName() + ": " + _dialogue(_entity, _subEntity));
        }*/
    }
    static setEntityController(_id, _entityController) {
        Game.entityControllers[_id] = _entityController;
    }
    static removeEntityController(_id) {
        delete Game.entityControllers[_id];
    }
    static clearyControllers() {
        for (var _i in Game.entityControllers) {
            Game.entityControllers[_i].dispose();
        }
        Game.entityControllers = {};
    }
    static setCharacterController(_id, _characterController) {
        Game.characterControllers[_id] = _characterController;
    }
    static removeCharacterController(_id) {
        delete Game.characterControllers[_id];
    }
    static clearCharacterControllers() {
        for (var _i in Game.characterControllers) {
            Game.characterControllers[_i].dispose();
        }
        Game.characterControllers = {};
    }
    static setFurnitureController(_id, _furnitureController) {
        Game.furnitureControllers[_id] = _furnitureController;
    }
    static removeFurnitureController(_id) {
        delete Game.furnitureControllers[_id];
    }
    static clearFurnitureControllers() {
        for (var _i in Game.furnitureControllers) {
            Game.furnitureControllers[_i].dispose();
        }
        Game.furnitureControllers = {};
    }
    static setLightingController(_id, _lightController) {
        Game.lightingControllers[_id] = _lightController;
    }
    static removeLightingController(_id) {
        delete Game.lightingControllers[_id];
    }
    static clearLightingControllers() {
        for (var _i in Game.lightingControllers) {
            Game.lightingControllers[_i].dispose();
        }
        Game.lightingControllers = {};
    }
    static setDoorController(_id, _doorController) {
        Game.doorControllers[_id] = _doorController;
    }
    static removeDoorController(_id) {
        delete Game.doorControllers[_id];
    }
    static clearDoorControllers() {
        for (var _i in Game.doorControllers) {
            Game.doorControllers[_i].dispose();
        }
        Game.doorControllers = {};
    }
    static setItemController(_id, _itemController) {
        Game.itemControllers[_id] = _itemController;
    }
    static removeItemController(_id) {
        delete Game.itemControllers[_id];
    }
    static clearItemControllers() {
        for (var _i in Game.itemControllers) {
            Game.itemControllers[_i].dispose();
        }
        Game.itemControllers = {};
    }

    static setEntity(_id, _entity) {
        Game.entities[_id] = _entity;
    }
    static removeEntity(_id) {
        delete Game.entityies[_id];
    }
    static clearEntities() {
        for (var _i in Game.entityies) {
            Game.entityies[_i].dispose();
        }
        Game.entityies = {};
    }
    static setCharacterEntity(_id, _characterEntity) {
        Game.characterEntities[_id] = _characterEntity;
    }
    static removeCharacterEntity(_id) {
        delete Game.characterEntities[_id];
    }
    static clearCharacterEntities() {
        for (var _i in Game.characterEntities) {
            Game.characterEntities[_i].dispose();
        }
        Game.characterEntities = {};
    }
    static setItemEntity(_id, _itemEntity) {
        Game.itemEntities[_id] = _itemEntity;
    }
    static removeItemEntity(_id) {
        delete Game.itemEntities[_id];
    }
    static clearItemEntities() {
        for (var _i in Game.itemEntities) {
            Game.itemEntities[_i].dispose();
        }
        Game.itemEntities = {};
    }
    static setClothingEntity(_id, _clothingEntity) {
        Game.clothingEntities[_id] = _clothingEntity;
    }
    static removeClothingEntity(_id) {
        delete Game.clothingEntities[_id];
    }
    static clearClothingEntities() {
        for (var _i in Game.clothingEntities) {
            Game.clothingEntities[_i].dispose();
        }
        Game.clothingEntities = {};
    }
    static setWeaponEntity(_id, _weaponEntity) {
        Game.weaponEntities[_id] = _weaponEntity;
    }
    static removeWeaponEntity(_id) {
        delete Game.weaponEntities[_id];
    }
    static clearWeaponEntities() {
        for (var _i in Game.weaponEntities) {
            Game.weaponEntities[_i].dispose();
        }
        Game.weaponEntities = {};
    }
    static setFurnitureEntity(_id, _furnitureEntity) {
        Game.furnitureEntities[_id] = _furnitureEntity;
    }
    static removeFurnitureEntity(_id) {
        delete Game.furnitureEntities[_id];
    }
    static clearFurnitureEntities() {
        for (var _i in Game.furnitureEntities) {
            Game.furnitureEntities[_i].dispose();
        }
        Game.furnitureEntities = {};
    }
    static setLightingEntity(_id, _lightEntity) {
        Game.lightingEntities[_id] = _lightEntity;
    }
    static removeLightingEntity(_id) {
        delete Game.lightingEntities[_id];
    }
    static clearLightEntities() {
        for (var _i in Game.lightingEntities) {
            Game.lightingEntities[_i].dispose();
        }
        Game.lightingEntities = {};
    }
    static setDoorEntity(_id, _doorEntity) {
        Game.doorEntities[_id] = _doorEntity;
    }
    static removeDoorEntity(_id) {
        delete Game.doorEntities[_id];
    }
    static clearDoorEntities() {
        for (var _i in Game.doorEntities) {
            Game.doorEntities[_i].dispose();
        }
        Game.doorEntities = {};
    }
    static setKeyEntity(_id, _keyEntity) {
        Game.keyEntities[_id] = _keyEntity;
    }
    static removeKeyEntity(_id) {
        delete Game.keyEntities[_id];
    }
    static clearKeyEntities() {
        for (var _i in Game.keyEntities) {
            Game.keyEntities[_i].dispose();
        }
        Game.keyEntities = {};
    }
    static setSpellEntity(_id, _spellEntity) {
        Game.spellEntities[_id] = _spellEntity;
    }
    static removeSpellEntity(_id) {
        delete Game.spellEntities[_id];
    }
    static clearSpellEntities() {
        for (var _i in Game.spellEntities) {
            Game.spellEntities[_i].dispose();
        }
        Game.spellEntities = {};
    }

    static setInstancedEntity(_id, _instancedEntity) {
        Game.instancedEntities[_id] = _instancedEntity;
    }
    static removeInstancedEntity(_id) {
        delete Game.instancedEntities[_id];
    }
    static clearInstancedEntities() {
        for (var _i in Game.instancedEntities) {
            Game.instancedEntities[_i].dispose();
        }
        Game.instancedEntities = {};
    }
    static setInstancedItemEntity(_id, _instancedItemEntity) {
        Game.instancedItemEntities[_id] = _instancedItemEntity;
    }
    static removeInstancedItemEntity(_id) {
        delete Game.instancedItemEntities[_id];
    }
    static clearInstancedItemEntities() {
        for (var _i in Game.instancedItemEntities) {
            Game.instancedItemEntities[_i].dispose();
        }
        Game.instancedItemEntities = {};
    }
    static setInstancedClothingEntity(_id, _instancedClothingEntity) {
        Game.instancedClothingEntities[_id] = _instancedClothingEntity;
    }
    static removeInstancedClothingEntity(_id) {
        delete Game.instancedClothingEntities[_id];
    }
    static clearInstancedClothingEntities() {
        for (var _i in Game.instancedClothingEntities) {
            Game.instancedClothingEntities[_i].dispose();
        }
        Game.instancedClothingEntities = {};
    }
    static setInstancedWeaponEntity(_id, _instancedWeaponEntity) {
        Game.instancedWeaponEntities[_id] = _instancedWeaponEntity;
    }
    static removeInstancedWeaponEntity(_id) {
        delete Game.instancedWeaponEntities[_id];
    }
    static clearInstancedWeaponEntities() {
        for (var _i in Game.instancedWeaponEntities) {
            Game.instancedWeaponEntities[_i].dispose();
        }
        Game.instancedWeaponEntities = {};
    }

    static setDialogue(_id, _dialogue) {
        Game.dialogues[_id] = _dialogue;
    }
    static removeDialogue(_id) {
        delete Game.dialogues[_id];
    }
    static clearDialogues() {
        for (var _i in Game.dialogues) {
            Game.dialogues[_i].dispose();
        }
        Game.dialogues = {};
    }

    static setCosmetic(_id, _cosmetic) {
        Game.cosmetics[_id] = _cosmetic;
    }
    static removeCosmetic(_id) {
        delete Game.cosmetics[_id];
    }
    static clearCosmetics() {
        for (var _i in Game.cosmetics) {
            Game.cosmetics[_i].dispose();
        }
        Game.cosmetics = {};
    }

    static calculateLevel(_int) {
        _int = Game.filterInt(_int);
        if (_int >= Game.XP_MAX) {
            return 20;
        }
        else if (_int >= 305000) {
            return 19;
        }
        else if (_int >= 265000) {
            return 18;
        }
        else if (_int >= 225000) {
            return 17;
        }
        else if (_int >= 195000) {
            return 16;
        }
        else if (_int >= 165000) {
            return 15;
        }
        else if (_int >= 140000) {
            return 14;
        }
        else if (_int >= 120000) {
            return 13;
        }
        else if (_int >= 100000) {
            return 12;
        }
        else if (_int >= 85000) {
            return 11;
        }
        else if (_int >= 64000) {
            return 10;
        }
        else if (_int >= 48000) {
            return 9;
        }
        else if (_int >= 34000) {
            return 8;
        }
        else if (_int >= 23000) {
            return 7;
        }
        else if (_int >= 14000) {
            return 6;
        }
        else if (_int >= 6500) {
            return 5;
        }
        else if (_int >= 2700) {
            return 4;
        }
        else if (_int >= 900) {
            return 3;
        }
        else if (_int >= 300) {
            return 2;
        }
        else if (_int >= 0) {
            return 1;
        }
        return 0;
    }
    static calculateXP(_int) {
        _int = Game.filterInt(_int);
        switch (_int) {
            case (20) : {
                return Game.XP_MAX;
                break;
            }
            case (19) : {
                return 305000;
                break;
            }
            case (18) : {
                return 265000;
                break;
            }
            case (17) : {
                return 225000;
                break;
            }
            case (16) : {
                return 195000;
                break;
            }
            case (15) : {
                return 165000;
                break;
            }
            case (14) : {
                return 140000;
                break;
            }
            case (13) : {
                return 120000;
                break;
            }
            case (12) : {
                return 100000;
                break;
            }
            case (11) : {
                return 85000;
                break;
            }
            case (10) : {
                return 64000;
                break;
            }
            case (9) : {
                return 48000;
                break;
            }
            case (8) : {
                return 34000;
                break;
            }
            case (7) : {
                return 23000;
                break;
            }
            case (6) : {
                return 14000;
                break;
            }
            case (5) : {
                return 6500;
                break;
            }
            case (4) : {
                return 2700;
                break;
            }
            case (3) : {
                return 900;
                break;
            }
            case (2) : {
                return 300;
                break;
            }
            case (1) : {
                return 0;
                break;
            }
            default : {
                return 0;
            }
        }
    }
    static tgm() {
        Game.player.toggleGodMode();
    }

    static areVectorsEqual(v1, v2, p) {
        return ((Math.abs(v1.x - v2.x) < p) && (Math.abs(v1.y - v2.y) < p) && (Math.abs(v1.z - v2.z) < p));
    }
    static arePointsEqual(p1, p2, p) {
        return Math.abs(p1 - p2) < p;
    }
    static verticalSlope(v) {
        return Math.atan(Math.abs(v.y / Math.sqrt(v.x * v.x + v.z * v.z)));
    }
}