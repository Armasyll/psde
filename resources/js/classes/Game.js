class Game {
    constructor() {
        this.initialized = false;
        Game.debugMode = false;
        Game.godMode = false;
    }
    static initialize() {
        Game.initialized = false;
        Game.debugMode = false;
        Game.godMode = false;
        Game.physicsEnabled = false;
        Game.Tools = Tools;

        if (Game.debugMode) console.log("Running initialize");
        Game.canvas = document.getElementById("canvas");
            Game.canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
            Game.canvas.exitPointerLock = canvas.exitPointerLock || canvas.mozExitPointerLock;
        Game.engine = new BABYLON.Engine(Game.canvas, false, null, false);
            Game.engine.enableOfflineSupport = false; // Disables .manifest file errors
            Game.engine.isPointerLock = false;
        Game.scene = new BABYLON.Scene(Game.engine);
            Game.scene.autoClear = false;
            Game.scene.autoClearDepthAndStencil = false;
            Game.scene.gravity = new BABYLON.Vector3(0,-9.81, 0);
            Game.scene.actionManager = new BABYLON.ActionManager(Game.scene);
        if (Game.physicsEnabled) {
            Game.initPhysics();
        }
        else {
            Game.scene.collisionsEnabled = true;
            Game.scene.workerCollisions = false;
        }
        Game.camera = null;
        Game.cameraFocus = null;

        Game.assignBoundingBoxCollisionQueue = new Set();

        Game._filesToLoad = 1;
        Game.loadedFiles = new Set();

        /**
         * Map of Mesh file locations per ID
         * eg, {"foxM":"resources/data/characters.babylon"}
         * @type {<String, String>}
         */
        Game.meshLocations = {
            "missingMesh":null,
            "loadingMesh":null,
            "cameraFocus":null,
            "stopSign":"resources/data/misc.babylon",
            "twoByFourByEight":"resources/data/misc.babylon",
            "twoByFourByThree":"resources/data/misc.babylon",
            "twoByFourBySix":"resources/data/misc.babylon",
            "tombstone02":"resources/meshes/graveyard.babylon",
            "icosphere30":"resources/data/misc.babylon",
            "scroll01":"resources/data/misc.babylon",
            "displayPlatform":"resources/data/misc.babylon",
            "questionMark":"resources/data/misc.babylon",
            "exclamationMark":"resources/data/misc.babylon",
            "tombstone01":"resources/meshes/graveyard.babylon",
            "obelisk02":"resources/meshes/graveyard.babylon",
            "obelisk01":"resources/meshes/graveyard.babylon",
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
            "cheeseWheel":"resources/data/items.babylon",
            "cheeseWheelSansWedge":"resources/data/items.babylon",
            "cheeseWedge":"resources/data/items.babylon",
            "stick01":"resources/data/items.babylon",
            "stick03":"resources/data/items.babylon",
            "stick04":"resources/data/items.babylon",
            "rock01":"resources/data/items.babylon",
            "ingot01":"resources/data/items.babylon",
            "cube":"resources/data/items.babylon",
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
            "ring03":"resources/data/items.babylon",
            "bookHardcoverOpen01":"resources/data/items.babylon",
            "key99":"resources/data/items.babylon",
            "ring02":"resources/data/items.babylon",
            "currencyCoinPenny":"resources/data/items.babylon",
            "currencyNoteDollar":"resources/data/items.babylon",
            "key01":"resources/data/items.babylon",
            "boneRib01":"resources/data/items.babylon",
            "bone02":"resources/data/items.babylon",
            "bone01":"resources/data/items.babylon",
            "bookHardcoverClosed01":"resources/data/items.babylon",
            "goblet01":"resources/data/items.babylon",
            "foxhead01":"resources/data/items.babylon",
            "glass01":"resources/data/items.babylon",
            "gem03":"resources/data/items.babylon",
            "gem04":"resources/data/items.babylon",
            "gem05":"resources/data/items.babylon",
            "gem06":"resources/data/items.babylon",
            "gem08":"resources/data/items.babylon",
            "plate01":"resources/data/items.babylon",
            "eye01":"resources/data/items.babylon",
            "eye02":"resources/data/items.babylon",
            "_cD":"resources/data/items.babylon",
            "foxhead02":"resources/data/items.babylon",
            "ring01":"resources/data/items.babylon",
            "foxhead03":"resources/data/items.babylon",
            "craftsmanDoorwayNoTrim":"resources/data/craftsmanWalls.babylon",
            "craftsmanWindowDouble":"resources/data/craftsmanWalls.babylon",
            "craftsmanWallNoTrim":"resources/data/craftsmanWalls.babylon",
            "craftsmanWallNoCrown":"resources/data/craftsmanWalls.babylon",
            "craftsmanWallNoBaseboard":"resources/data/craftsmanWalls.babylon",
            "craftsmanWindowframeNoTrim":"resources/data/craftsmanWalls.babylon",
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
            "spider":"resources/meshes/arachnids.babylon",
            "borb":"resources/meshes/borb.babylon",
            "animatedPylon01":"resources/meshes/animatedPylon01.babylon",
            "animatedRefrigerator01":"resources/meshes/animatedRefrigerator01.babylon",
            "animatedCoffin01":"resources/meshes/animatedCoffin01.babylon",
            "animatedBarrel01":"resources/meshes/animatedBarrel01.babylon",
            "animatedToilet01":"resources/meshes/animatedToilet01.babylon",
            "animatedSink01":"resources/meshes/animatedSink01.babylon",
            "animatedDoor01":"resources/meshes/animatedDoor01.babylon",
            "chair02":"resources/meshes/furniture.babylon",
            "chair03":"resources/meshes/furniture.babylon",
            "grass01":"resources/meshes/nature.babylon",
            "mushroom01":"resources/meshes/nature.babylon",
            "tombstone03":"resources/meshes/graveyard.babylon",
            "graveyardWallCap01":"resources/meshes/graveyard.babylon",
            "graveyardWallEndShortHalf01":"resources/meshes/graveyard.babylon",
            "graveyardWallEndShort01":"resources/meshes/graveyard.babylon",
            "graveyardWallEndMedium01":"resources/meshes/graveyard.babylon",
            "graveyardWallEndTall01":"resources/meshes/graveyard.babylon",
            "graveyardWallEndVeryTall01":"resources/meshes/graveyard.babylon",
            "graveyardFence01":"resources/meshes/graveyard.babylon",
            "graveyardFenceShort01":"resources/meshes/graveyard.babylon",
            "graveyardFencePike01":"resources/meshes/graveyard.babylon",
            "graveyardFenceWithPillar01":"resources/meshes/graveyard.babylon",
            "graveyardFenceWithPillarShort01":"resources/meshes/graveyard.babylon",
            "graveyardFencePillar01":"resources/meshes/graveyard.babylon",
            "cap01":"resources/meshes/armour.babylon",
            "birdMask01":"resources/meshes/armour.babylon",
            "birdMaskJaw01":"resources/meshes/armour.babylon",
            "wizardHat02":"resources/meshes/armour.babylon",
            "barbute01":"resources/meshes/armour.babylon",
            "roundShield01":"resources/meshes/armour.babylon",
            "parmaShield01":"resources/meshes/armour.babylon",
            "heaterShield01":"resources/meshes/armour.babylon",
            "heaterShield02":"resources/meshes/armour.babylon",
            "heaterShield03":"resources/meshes/armour.babylon",
            "scutumShield01":"resources/meshes/armour.babylon",
            "barbuteHorned01":"resources/meshes/armour.babylon",
            "protohelmet":"resources/meshes/armour.babylon",
            "bracer01.l":"resources/meshes/armour.babylon",
            "bracer01.r":"resources/meshes/armour.babylon",
            "pauldron01.l":"resources/meshes/armour.babylon",
            "pauldron01.r":"resources/meshes/armour.babylon",
            "knife01":"resources/meshes/weapons.babylon",
            "spear01":"resources/meshes/weapons.babylon",
            "glaive01":"resources/meshes/weapons.babylon",
            "battleAxe01":"resources/meshes/weapons.babylon",
            "axe03":"resources/meshes/weapons.babylon",
            "axe02":"resources/meshes/weapons.babylon",
            "axe01":"resources/meshes/weapons.babylon",
            "sword01":"resources/meshes/weapons.babylon",
            "glaive01":"resources/meshes/weapons.babylon",
            "forgeHammer01":"resources/meshes/weapons.babylon",
            "forgeHammer02":"resources/meshes/weapons.babylon",
            "warHammer01":"resources/meshes/weapons.babylon",
            "mallet01":"resources/meshes/weapons.babylon",
            "pickaxe01":"resources/meshes/weapons.babylon",
            "spear01":"resources/meshes/weapons.babylon",
            "shovel01":"resources/meshes/weapons.babylon",
            "shortSword01":"resources/meshes/weapons.babylon",
            "staff05":"resources/meshes/weapons.babylon",
            "staff04":"resources/meshes/weapons.babylon",
            "staff03":"resources/meshes/weapons.babylon",
            "staff02":"resources/meshes/weapons.babylon",
            "staff01":"resources/meshes/weapons.babylon",
            "cross01":"resources/meshes/weapons.babylon",
            "gladius01":"resources/meshes/weapons.babylon",
            "harpe01":"resources/meshes/weapons.babylon",
            "executionerSword01":"resources/meshes/weapons.babylon",
            "cudgel01":"resources/meshes/weapons.babylon",
            "morningstar01":"resources/meshes/weapons.babylon",
            "greatSword01":"resources/meshes/weapons.babylon",
            "katana01":"resources/meshes/weapons.babylon",
            "wand01":"resources/meshes/weapons.babylon",
            "wand02":"resources/meshes/weapons.babylon",
            "wand03":"resources/meshes/weapons.babylon",
            "animatedChest01":"resources/meshes/animatedChest01.babylon",
            "apple01":"resources/meshes/fruits.babylon"
        };
        /**
         * Map of Meshes per ID
         * eg, {"ring01":{ring01 Mesh}, "ring02":{...}}
         * @type {<String, BABYLON.Mesh>}
         */
        Game.loadedMeshes = {};
        /**
         * Map of Texture file locations per ID
         * eg, {"foxRed":"resources/images/textures/characters/foxRed.svg"}
         * @type {<String, String>}
         */
        Game.textureLocations = {
            "packStreetApartmentBuildingGroundFloor":"resources/images/textures/static/packStreetApartmentBuildingGroundFloor.png",
            "carpetPink01":"resources/images/textures/static/carpetPink01.png",
            "noooo":"resources/images/textures/static/noooo.jpg",
            "packStreetChapter23":"resources/images/textures/items/packStreetChapter23.svg",
            "packStreetChapter24":"resources/images/textures/items/packStreetChapter24.svg",
            "foxCorsac":"resources/images/textures/characters/foxCorsac.svg",
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
            "dice":"resources/images/textures/items/dice.svg",
            "vChocolateV":"resources/images/textures/items/vChocolateV.svg",
            "missingTexture":"resources/images/textures/static/missingTexture.svg",
            "woodenMallet":"resources/images/textures/items/woodenMallet.svg",
            "metalTool01":"resources/images/textures/items/metalTool01.svg",
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
            "stoneTexture01-NORMAL":"resources/images/textures/static/stoneTexture01-NORMAL.png",
            "dice01Texture":"resources/images/textures/items/dice01.svg",
            "birdMask01":"resources/images/textures/items/birdMask01.svg",
            "chest01":"resources/images/textures/furniture/chest01.svg",
            "apple01":"resources/images/textures/items/apple01.svg",
            "circularEyeBlue":"resources/images/textures/items/circularEyeBlue.svg",
            "circularEyeGreen":"resources/images/textures/items/circularEyeGreen.svg",
            "circularEyeViolet":"resources/images/textures/items/circularEyeViolet.svg",
            "circularEye":"resources/images/textures/items/circularEye.svg",
            "feralEye":"resources/images/textures/items/feralEye.svg",
            "feralEyeViolet":"resources/images/textures/items/feralEyeViolet.svg",
            "feralEyeBlue":"resources/images/textures/items/feralEyeBlue.svg",
            "feralEyeGreen":"resources/images/textures/items/feralEyeGreen.svg",
            "feralEyeYellow":"resources/images/textures/items/feralEyeYellow.svg",
            "oblongEye":"resources/images/textures/items/oblongEye.svg",
            "circularEyeBrown":"resources/images/textures/items/circularEyeBrown.svg",
            "feralEyeBrown":"resources/images/textures/items/feralEyeBrown.svg",
            "circularEyeYellow":"resources/images/textures/items/circularEyeYellow.svg",
            "oblongEyeYellow":"resources/images/textures/items/oblongEyeYellow.svg",
            "oblongEyeBrown":"resources/images/textures/items/oblongEyeBrown.svg",
            "oblongEyeBlue":"resources/images/textures/items/oblongEyeBlue.svg",
            "oblongEyeGreen":"resources/images/textures/items/oblongEyeGreen.svg",
            "oblongEyeViolet":"resources/images/textures/items/oblongEyeViolet.svg"
        };
        /**
         * Map of Textures per ID
         * eg, {"ring01Silver":{ring01Silver Texture}, "ring01Gold":{...}}
         * @type {<String, BABYLON.Texture>}
         */
        Game.loadedTextures = {};
        /**
         * Map of Materials per ID
         * @type {<String, BABYLON.Material>}
         */
        Game.loadedMaterials = {};
        /**
         * Map of Icon file locations per ID
         * eg, {"rosie":"resources/images/icons/characters/rosie.png"}
         * @type {<String, String>}
         */
        Game.iconLocations = {
            "rosieIcon":"resources/images/icons/characters/rosie.png",
            "charlieIcon":"resources/images/icons/characters/charlie.svg",
            "genericItemIcon":"resources/images/icons/items/genericItem.svg",
            "genericCharacterIcon":"resources/images/icons/characters/genericCharacter.svg",
            "genericRabbitIcon":"resources/images/icons/characters/genericRabbit.svg",
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
            "shovel01Icon":"resources/images/icons/items/shovel01.png",
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
            "stick02Icon":"resources/images/icons/items/stick02.png",
            "rock01Icon":"resources/images/icons/items/rock01.png",
            "sink01Icon":"resources/images/icons/items/sink01.png",
            "toilet01Icon":"resources/images/icons/items/toilet01.png",
            "mattress01Icon":"resources/images/icons/items/mattress01.png",
            "couch01Icon":"resources/images/icons/items/couch01.png",
            "loveseat01Icon":"resources/images/icons/items/loveseat01.png",
            "chair01Icon":"resources/images/icons/items/chair01.png",
            "chair02Icon":"resources/images/icons/items/chair02.png",
            "chair03Icon":"resources/images/icons/items/chair03.png",
            "dice01Icon":"resources/images/icons/items/dice01.png",
            "apple01Icon":"resources/images/icons/items/apple01.png",
            "axe01Icon":"resources/images/icons/items/axe01.png",
            "axe02Icon":"resources/images/icons/items/axe02.png",
            "axe03Icon":"resources/images/icons/items/axe03.png",
            "battleAxe01Icon":"resources/images/icons/items/battleAxe01.png",
            "forgeHammer01Icon":"resources/images/icons/items/forgeHammer01.png",
            "forgeHammer02Icon":"resources/images/icons/items/forgeHammer02.png",
            "cudgel01Icon":"resources/images/icons/items/cudgel01.png"
        };
        /**
         * Map of Sound file locations per ID
         * eg, {"openDoor":"resources/sounds/Open Door.mp3"}
         * @type {<String, String>}
         */
        Game.soundLocations = {
            "openDoor":"resources/sounds/Open Door.mp3",
            "hit":"resources/sounds/Hit.mp3",
            "slice":"resources/sounds/Slice.mp3"
        };
        /**
         * Map of Sounds per ID
         * @type {<String, BABYLON.Sound>}
         */
        Game.loadedSounds = {};
        /**
         * Map of Meshes per Texture IDs per Mesh IDs
         * eg, {"ring01":{"ring01Silver":{ring01 Mesh with ring01Silver Texture}, "ring01Gold":{ring01 Mesh with ring01Gold Texture}}, "ring02":{...}}
         * @type {<String, <String, BABYLON.Mesh>>}
         */
        Game.loadedMeshMaterials = {};
        /**
         * Map of Instanced Meshes per ID
         * @type {<String, BABYLON.InstancedMesh>}
         */
        Game.instancedMeshes = {};
        /**
         * Map cloned Meshes per ID
         * @type {<String, BABYLON.Mesh>}
         */
        Game.clonedMeshes = {};
        /**
         * Map of Meshes that are waiting to be created
         * @type {<String, <Objects...>>}
         */
        Game.meshesToCreateCounter = 0;
        Game.meshesToCreate = {};
        Game.texturesToCreateCounter = 0;
        Game.texturesToCreate = {};
        Game.materialsToCreateCounter = 0;
        Game.materialsToCreate = {};
        /**
         * Map of Furniture that are waiting to be created
         * @type {<String, <String:id, String:name, String:mesh, String:texture, String:type, String:options, String:position, String:rotation, String:scaling, Boolean:createCollisionMesh>}
         */
        Game.furnitureToCreateCounter = 0;
        Game.furnitureToCreate = {};
        /**
         * Map of Lighting that are waiting to be created;
         * it's basically the same as furnitureToCreate :v
         * @type {<String, <String:id, String:name, String:mesh, String:texture, String:type, String:options, String:position, String:rotation, String:scaling, Boolean:createCollisionMesh>}
         */
        Game.lightingToCreateCounter = 0;
        Game.lightingToCreate = {};
        /**
         * Map of Doors that are waiting to be created;
         * it's basically the same as furnitureToCreate :v
         * @type {<String, <String:id, String:name, Forgot:to, String:mesh, String:texture, String:options, String:position, String:rotation, String:scaling>}
         */
        Game.doorsToCreateCounter = 0;
        Game.doorsToCreate = {};
        /**
         * Map of Characters that are waiting to be created;
         * it's basically the same as furnitureToCreate :v
         * @type {<String, <String:id, String:name, String:description, String:icon, Number:age, Number:sex, String:species, String:mesh, String:texture, String:options, String:position, String:rotation, String:scaling>}
         */
        Game.charactersToCreateCounter = 0;
        Game.charactersToCreate = {};
        Game.playerToCreate = null;
        Game.itemsToCreateCounter = 0;
        Game.itemsToCreate = {};
        Game.attachmentsToCreateCounter = 0;
        Game.attachmentsToCreate = {};
        
        Game.hasBackloggedEntities = false;

        Game.meshToEntityController = {};
        Game.entityControllers = {};
        Game.furnitureControllers = {};
        Game.lightingControllers = {};
        Game.doorControllers = {};
        Game.characterControllers = {};
        Game.itemControllers = {};

        Game.abstractNodes = {};

        Game.abstractEntities = {};

        Game.entities = {};
        Game.furnitureEntities = {};
        Game.lightingEntities = {};
        Game.doorEntities = {};
        Game.characterEntities = {};
        Game.itemEntities = {};
        Game.clothingEntities = {};
        Game.weaponEntities = {};
        Game.keyEntities = {};
        Game.spellEntities = {};
        Game.essentialEntities = new Set();

        Game.instancedEntities = {};
        Game.instancedItemEntities = {};
        Game.instancedClothingEntities = {};
        Game.instancedWeaponEntities = {};
        Game.instancedFurnitureEntities = {};

        Game.dialogues = new Map();
        Game.cosmetics = new Map();

        Game.entityAnimationBones = {
            "rightArm":[
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
            "leftArm":[
                "shoulder.l",
                "upperArm.l",
                "forearm.l",
                "IK.hand.l",
                "wrist.l",
                "fingersMetacarpal.l",
                "fingersProximinalPhalanx.l",
                "fingersMiddlePhalanx.l",
                "fingersDistalPhalanx.l",
                "thumbMetacarpal.l",
                "thumbProximinalPhalanx.l",
                "thumbDistalPhalanx.l",
                "fingersPinkieMetacarpal.l",
                "fingersPinkieProximinalPhalanx.l",
                "fingersPinkieMiddlePhalanx.l",
                "fingersPinkieDistalPhalanx.l",
                "fingersIndexMetacarpal.l",
                "fingersIndexProximinalPhalanx.l",
                "fingersIndexMiddlePhalanx.l",
                "fingersIndexDistalPhalanx.l",
                "POLE.elbow.l"
            ],
            "rightHand":[
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
                "fingersIndexDistalPhalanx.r"
            ],
            "eyelids":[
                "eyelidTop.r",
                "eyelidTop.l",
                "eyelidBot.r",
                "eyelidBot.l"
            ]
        }

        Game._finishedInitializing = false;
        Game._finishedConfiguring = false;

        Game.player = undefined;
        Game.castRayTargetIntervalFunction = undefined;
        Game.castRayTargetInterval = 250;
        Game.pointerLockFunction = undefined;
        Game.previousSelectedMesh = undefined;
        Game.currentSelectedMesh = undefined;
        Game.playerPortraitStatsUpdateIntervalFunction = undefined;
        Game.playerPortraitStatsUpdateInterval = 100;

        Game.enableFirstPerson = true;
        Game.enableCameraAvatarRotation = true;

        Game.defaultPipeline = null;

        Game.highlightEnabled = false;
        Game.highlightLayer = undefined;
        Game.highlightedMesh = undefined;

        Game.loadDefaultTextures();
        Game.loadDefaultMaterials();
        Game.loadDefaultMeshes();
        Game.loadDefaultSounds();
        Game.loadDefaultItems();

        /*
            Which function handles the function of the key presses;
            controlerCharacter, controlMenu
         */
        Game.onKeyDownFunction = Game.controlCharacterOnKeyDown;
        Game.onKeyUpFunction = Game.controlCharacterOnKeyUp;
        Game.onClickFunction = Game.controlMetaOnClick;
        Game.onMouseDownFunction = Game.controlMetaOnMouseDown;
        Game.onMouseUpFunction = Game.controlMetaOnMouseUp;
        Game.onContextFunction = Game.controlCharacterOnContext;
        Game.doEntityActionFunction = Game.doEntityAction;
        Game.actionAttackFunction = Game.actionAttack;
        Game.actionCloseFunction = Game.actionClose;
        Game.actionDropFunction = Game.actionDrop;
        Game.actionEquipFunction = Game.actionEquip;
        Game.actionHoldFunction = Game.actionHold;
        Game.actionLayFunction = Game.actionLay;
        Game.actionOpenFunction = Game.actionOpen;
        Game.actionReleaseFunction = Game.actionRelease;
        Game.actionSitFunction = Game.actionSit;
        Game.actionTakeFunction = Game.actionTake;
        Game.actionTalkFunction = Game.actionTalk;
        Game.actionUnequipFunction = Game.actionUnequip;
        Game.mouseDownDate = 0;
        Game.mouseUpDate = 1;
        // TODO: add support for other GUIs (that aren't created yet :v, like HTML instead of BABYLON.GUI)
        Game.gui = GameGUI;
        Game.gui.initialize();
        Game.initFreeCamera();
        Game.initQwertyKeyboardControls();
        Game.initPostProcessing();
        window.addEventListener("click", Game.onClickFunction);
        window.addEventListener("mousedown", Game.onMouseDownFunction);
        window.addEventListener("mouseup", Game.onMouseUpFunction);
        window.addEventListener("contextmenu", Game.onContextFunction);

        Game.entityLocRotWorker = new Worker("resources/js/workers/entityLocationRotation.worker.js");
        Game.entityLocRotWorker.onmessage = function(e) {
            console.log(e.data);
        }
        Game._filesToLoad -= 1;
        Game.interfaceMode = InterfaceModeEnum.NONE;
        Game.initialized = true;
        Game.engine.runRenderLoop(Game._renderLoopFunction);
        Game.scene.registerBeforeRender(Game._beforeRenderFunction);
        Game.scene.registerAfterRender(Game._afterRenderFunction);
    }
    static _renderLoopFunction() {
        Game.scene.render();
        if (!Game._finishedConfiguring) {
            if (Game._filesToLoad == 0) {
                if (!Game._finishedInitializing) {
                    if (Game.debugMode) console.log("Finished loading assets.");
                    Game.importItems();
                    Game.importCosmetics();
                    Game.importFurniture();
                    Game._finishedInitializing = true;

                    Game.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
                        Game.onKeyDownFunction(evt.sourceEvent);
                    }));
                    Game.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
                        Game.onKeyUpFunction(evt.sourceEvent);
                    }));
                }
                else {
                    Client.initialize();
                    Game.gui.resizeText();
                    Game.gui.showCharacterChoiceMenu();
                    Game._finishedConfiguring = true;
                }
            }
            let url = new URL(window.location.href);
            let urlMap = new Map(url.searchParams);
            urlMap.forEach(function(val, key) {
                switch(key) {
                    case "debug": {
                        Game.debugMode = true;
                        break;
                    }
                    case "tgm": {
                        Game.toggleGodMode();
                    }
                }
            });
        }
    }
    static _beforeRenderFunction() {
        if (!(Game.player instanceof CharacterEntity) || !(Game.player.getController() instanceof CharacterController)) {
            return 1;
        }
        if (Game.camera instanceof BABYLON.Camera) {
            Game.camera.alpha = Game.Tools.moduloRadians(Game.camera.alpha);
            if (Game.camera.beta < 0.087) {
                Game.camera.beta = 0.087;
            }
            else if (Game.camera.beta > 3.054) {
                Game.camera.beta = 3.054;
            }
        }
        if (Game.player.controller.mesh instanceof BABYLON.AbstractMesh) {
            Game.player.controller.mesh.rotation.y = Game.Tools.moduloRadians(Game.player.controller.mesh.rotation.y);
        }
        for (let characterController in Game.characterControllers) {
            if (Game.characterControllers[characterController]._isAnimated) {
                Game.characterControllers[characterController].moveAV();
                if (Game.characterControllers[characterController].propertiesChanged) {
                    Game.characterControllers[characterController].updateProperties();
                }
            }
        }
        if (Game.defaultPipeline.imageProcessing.vignetteEnabled) {
            Game.defaultPipeline.imageProcessing.vignetteWeight = 5 + (100 - (Game.player.getHealth() / Game.player.getMaxHealth() * 100));
        }
    }
    static _afterRenderFunction() {
        if (Game.hasBackloggedEntities) {
            Game.createBackloggedMeshes();
            Game.createBackloggedBoundingCollisions();
            Game.createBackloggedFurniture();
            Game.createBackloggedLighting();
            Game.createBackloggedDoors();
            Game.createBackloggedItems();
            Game.createBackloggedCharacters();
            Game.createBackloggedPlayer();
            Game.createBackloggedAttachments();
            if (Game._filesToLoad == 0) {
                Game.hasBackloggedEntities = false;
            }
        }
        if (Client.isOnline()) {
            if (Client.hasPlayerToCreate()) {
                Client.createBackloggedPlayers();
            }
            if (Client.hasPlayerToUpdate()) {
                Client.updateBackloggedPlayers();
            }
        }
    }
    static initPhysics() {
        Game.physicsPlugin = new BABYLON.CannonJSPlugin();
        Game.scene.enablePhysics(Game.scene.gravity, Game.physicsPlugin);
        Game.physicsEnabled = true;
    }
    static initFollowCamera(offset = BABYLON.Vector3.Zero()) {
        if (Game.camera instanceof BABYLON.Camera) {
            Game.camera.dispose();
        }
        if (!(Game.player.getController() instanceof EntityController) || !(Game.player.getController().getBoneByName("FOCUS") instanceof BABYLON.Bone) ) {
            return 1;
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
        Game.camera.angularSensibilityX = 3500;
        Game.camera.angularSensibilityY = 3500;
        Game.camera.keysLeft=[];
        Game.camera.keysRight=[];
        Game.camera.keysUp=[];
        Game.camera.keysDown=[];
        Game.camera.attachControl(Game.canvas, false);

        Game.camera.minZ = 0.001;
        Game.camera.lockedTarget = Game.player.getController().focus;
        Game.initPostProcessing();
    }
    static initFreeCamera(applyGravity = true) {
        if (Game.debugMode) console.log("Running initFreeCamera");
        if (Game.camera instanceof BABYLON.Camera) {
            Game.camera.dispose();
        }
        Game.camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(2, 0.8, -20), Game.scene);
        Game.camera.radius = 2;
        Game.camera.minZ = 0.001;
        Game.camera.heightOffset = 1;
        Game.camera.rotationOffset = 0;
        Game.camera.speed = 0.25;
        Game.camera.attachControl(Game.canvas, true);
        if (Game.physicsEnabled) {}
        else {
            Game.camera.applyGravity = applyGravity;
            Game.camera.ellipsoid = new BABYLON.Vector3(0.1, 1.1, 0.1);
            Game.camera.checkCollisions = true;
        }
        Game.initPostProcessing();
    }
    static addPlayerToCreate(characterID) {
        if (Game.hasPlayerToCreate()) {
            return 0;
        }
        if (Game.characterEntities.hasOwnProperty(characterID)) {
            Game.playerToCreate = characterID;
            return 0;
        }
        return 2;
    }
    static removePlayerToCreate() {
        Game.playerToCreate = null;
        return 0;
    }
    static hasPlayerToCreate() {
        return Game.playerToCreate != null;
    }
    static createBackloggedPlayer() {
        if (Game.hasPlayerToCreate()) {
            if (!Game.hasCharacterEntity(Game.playerToCreate)) {
                return 2;
            }
            if (Game.assignPlayer(Game.getCharacterEntity(Game.playerToCreate)) == 0) {
                Game.removePlayerToCreate();
            }
        }
        return 0;
    }
    static createPlayer(characterID, name = "", description = "", iconID = undefined, age = 18, sex = SexEnum.MALE, species = SpeciesEnum.FOX, meshID = "missingMesh", textureID = "missingMaterial", options = {}, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One()) {
        if (Game.debugMode) console.log("Running initPlayer");
        characterID = Tools.filterID(characterID);
        if (characterID.length == 0) {
            characterID = Tools.genUUIDv4();
        }
        let characterController = Game.createCharacter(characterID, name, description, iconID, age, sex, species, meshID, textureID, options, position, rotation, scaling);
        if (characterController instanceof CharacterEntity && characterController.hasController() && characterController.getController().hasMesh()) {
            Game.assignPlayer(characterController.getEntity());
        }
        else {
            Game.addPlayerToCreate(characterID);
        }
        return 0;
    }
    static assignPlayer(characterEntity) { // TODO: allow for reassigning player :v
        if (!(characterEntity instanceof CharacterEntity)) {
            return 2;
        }
        if (!characterEntity.hasController() || !characterEntity.getController().hasMesh() || !characterEntity.getController().hasSkeleton()) {
            return 1;
        }
        if (Game.player instanceof AbstractEntity) {
            Game.player.getController().detachFromFOCUS();
            Game.player.getController().getMesh().isPickable = true;
        }
        else {
            Game.cameraFocus = Game.createMesh("cameraFocus", "cameraFocus", "collisionMaterial");
        }
        Game.player = characterEntity;
        Game.player.getController().attachToFOCUS(Game.cameraFocus); // and reassigning an instanced mesh without destroying it
        Game.player.getController().getMesh().isPickable = false;
        Game.gui.setPlayerPortrait(Game.player);
        Game.initFollowCamera();
        Game.initCastRayInterval();
        Game.initPlayerPortraitStatsUpdateInterval();
        return 0;
    }
    static initBaseKeyboardControls() {
        Game.chatInputFocusCode = 13;
        Game.chatInputSubmitCode = 13;
        Game.showMainMenuCode = 27;
        return 0;
    }
    static initQwertyKeyboardControls() {
        Game.initBaseKeyboardControls();
        Game.walkCode = 87; // W
        Game.walkBackCode = 83; // S
        Game.turnLeftCode = 0;
        Game.turnRightCode = 0;
        Game.strafeLeftCode = 65; // A
        Game.strafeRightCode = 68; // D
        Game.jumpCode = 32; // Space
        Game.interfaceTargetedEntityCode = 70; // F
        Game.useTargetedEntityCode = 69; // E
        Game.useSelectedItemCode = 82; // R
        Game.showInventoryCode = 73; // I
        Game.UIAccept = 69; // E
        Game.UIAcceptAlt = 13; // Enter
        Game.UIDeny = 81; // Q
        Game.UIDenyAlt = 18; // Alt
        Game.updateMenuKeyboardDisplayKeys();
        return 0;
    }
    static initDvorakKeyboardControls() {
        Game.initBaseKeyboardControls();
        Game.walkCode = 188;
        Game.walkBackCode = 73;
        Game.turnLeftCode = 0;
        Game.turnRightCode = 0;
        Game.strafeLeftCode = 65;
        Game.strafeRightCode = 69;
        Game.jumpCode = 32;
        Game.interfaceTargetedEntityCode = 85;
        Game.useTargetedEntityCode = 190;
        Game.useSelectedItemCode = 80;
        Game.showInventoryCode = 67; // C
        Game.UIAccept = 190; // E
        Game.UIAcceptAlt = 13; // Enter
        Game.UIDeny = 222; // Q
        Game.UIDenyAlt = 18; // Alt
        Game.updateMenuKeyboardDisplayKeys();
        return 0;
    }
    static initAzertyKeyboardControls() {
        Game.initBaseKeyboardControls();
        Game.walkCode = 90;
        Game.walkBackCode = 83;
        Game.turnLeftCode = 0;
        Game.turnRightCode = 0;
        Game.strafeLeftCode = 81;
        Game.strafeRightCode = 68;
        Game.jumpCode = 32;
        Game.interfaceTargetedEntityCode = 70;
        Game.useTargetedEntityCode = 69;
        Game.useSelectedItemCode = 82;
        Game.showInventoryCode = 73;
        Game.UIAccept = 69; // E
        Game.UIAcceptAlt = 13; // Enter
        Game.UIDeny = 65; // A
        Game.UIDenyAlt = 18; // Alt
        Game.updateMenuKeyboardDisplayKeys();
        return 0;
    }
    static updateMenuKeyboardDisplayKeys() {
        Game.gui.setActionTooltipLetter();
        return 0;
    }
    static initPostProcessing() {
        if (Game.defaultPipeline instanceof BABYLON.PostProcessRenderPipeline) {
            Game.defaultPipeline.dispose();
        }
        Game.defaultPipeline = new BABYLON.DefaultRenderingPipeline("default", false, Game.scene, [Game.camera]);
        Game.defaultPipeline.samples = 2;
        Game.defaultPipeline.fxaaEnabled = true;
        Game.defaultPipeline.cameraFov = Game.camera.fov;
        Game.defaultPipeline.imageProcessing.vignetteEnabled = true;
        return 0;
    }
    static loadDefaultTextures() {
        Game.loadedTextures["default"] = new BABYLON.Texture(null, Game.scene);
        Game.loadTexture("missingTexture");
        return 0;
    }
    static loadDefaultMaterials() {
        Game.setLoadedMaterial("default", new BABYLON.StandardMaterial("default", Game.scene));
        Game.setLoadedMaterial("collisionMaterial", new BABYLON.Material("collisionMaterial", Game.scene));
        Game.setLoadedMaterial("missingMaterial", new BABYLON.StandardMaterial("missingMaterial", Game.scene));
        Game.setLoadedMaterial("loadingMaterial", new BABYLON.StandardMaterial("loadingMaterial", Game.scene));
        Game.setLoadedMaterial("missingMaterial", "missingTexture");
        Game.loadedMaterials["default"].specularColor.set(0,0,0);
        Game.loadedMaterials["missingMaterial"].specularColor.set(0,0,0);
        Game.loadedMaterials["loadingMaterial"].specularColor.set(0,0,0);
        Game.loadedMaterials["loadingMaterial"].diffuseColor.set(1, 0.85, 1);
        return 0;
    }
    static loadDefaultMeshes() {
        Game.setLoadedMesh("missingMesh", BABYLON.MeshBuilder.CreateBox("missingMesh", {height: 0.3, width:0.3, depth:0.3}, Game.scene));
        Game.setLoadedMesh("loadingMesh", BABYLON.MeshBuilder.CreateSphere("loadingMesh", {diameter: 0.6}, Game.scene));
        Game.setLoadedMesh("cameraFocus", BABYLON.MeshBuilder.CreateBox("cameraFocus", {height: 0.05, width:0.05, depth:0.05}, Game.scene));
        Game.loadedMeshes["missingMesh"].material = Game.loadedMaterials["missingMaterial"];
        Game.loadedMeshes["missingMesh"].setEnabled(false);
        Game.loadedMeshes["loadingMesh"].setEnabled(false);
        Game.loadedMeshes["cameraFocus"].isVisible = false;
        return 0;
    }
    static loadDefaultSounds() {
        Game.setLoadedSound("missingSound", new BABYLON.Sound("missingSound", "resources/sounds/Spell Miss.mp3", Game.scene));
        Game.setLoadedSound("hit", new BABYLON.Sound("hit", "resources/sounds/Hit.mp3", Game.scene));
        Game.setLoadedSound("openDoor", new BABYLON.Sound("openDoor", "resources/sounds/Open Door.mp3", Game.scene));
        return 0;
    }
    static loadDefaultItems() {
        Game.createItemEntity("genericItem", "Generic Item", "It's so perfectly generic.", "genericItemIcon", "block", "loadingMaterial", ItemEnum.GENERAL);
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
            Game.loadTexture(diffuseTextureID);
        }
        else if (Game.hasAvailableTexture(materialID)) {
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
        loadedMaterial.specularColor.set(0,0,0);
        if (typeof options == "object") {
            if (options.hasOwnProperty("specularColor")) {
                loadedMaterial.specularColor.set(Tools.filterVector(options["specularColor"]));
            }
        }
        Game.setLoadedMaterial(materialID, loadedMaterial);
        return 0;
    }
    /**
     * Loads and create a BABYLON.Mesh
     * @param {string} meshID Mesh ID
     * @returns {number} Integer status code
     */
    static loadMesh(meshID) {
        meshID = Tools.filterID(meshID);
        if (meshID.length == 0) {
            return 2;
        }
        if (Game.hasLoadedMesh(meshID)) {
            return 0;
        }
        else if (Game.hasAvailableMesh(meshID)) {
            Game.importMeshes(Game.meshLocations[meshID]);
            return 1;
        }
        return 2;
    }
    static setLoadedMesh(meshID, mesh) {
        meshID = Tools.filterID(meshID);
        if (meshID.length == 0) {
            return 2;
        }
        if (!(mesh instanceof BABYLON.Mesh)) {
            return 2;
        }
        Game.loadedMeshes[meshID] = mesh;
        return 0;
    }
    static getLoadedMesh(meshID) {
        return Game.loadedMeshes[meshID];
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
        return Game.loadedSounds[soundID];
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
        return Game.loadedTextures[textureID];
    }
    static setLoadedMaterial(materialID, material) {
        materialID = Tools.filterID(materialID);
        if (materialID.length == 0) {
            return 2;
        }
        if (!(material instanceof BABYLON.Material)) {
            return 2;
        }
        Game.loadedMaterials[materialID] = material;
        return 1;
    }
    static getLoadedMaterial(materialID) {
        return Game.loadedMaterials[materialID];
    }
    static setMeshMaterial(mesh, material) {
        if (!(mesh instanceof BABYLON.Mesh) || !(material instanceof BABYLON.Material)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running setMeshMaterial(${mesh.name}, ${material.name})`);
        if (!Game.loadedMeshMaterials.hasOwnProperty(mesh.name)) {
            Game.loadedMeshMaterials[mesh.name] = {};
        }
        Game.loadedMeshMaterials[mesh.name][material.name] = mesh;
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
    static hasClonedMesh(meshID) {
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
    static hasInstancedMesh(meshID) {
        return Game.instancedMeshes.hasOwnProperty(meshID);
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
    static hasIcon(iconID) {
        return Game.iconLocations.hasOwnProperty(iconID);
    }
    static addIcon(iconID, location) {
        if (Game.hasIcon(iconID)) {
            return 2;
        }
        Game.iconLocations[iconID] = location;
        return 0;
    }
    static getIcon(iconID) {
        if (Game.hasIcon(iconID)) {
            return Game.iconLocations[iconID];
        }
        else {
            return Game.iconLocations["missingIcon"];
        }
    }
    static importScript(file) {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = file;
        script.onload = function(){
        };
        document.body.appendChild(script);
        return 0;
    }
    static importItems() {
        return Game.importScript("resources/js/items.js");
    }
    static importCosmetics() {
        return Game.importScript("resources/js/cosmetics.js");
    }
    static importFurniture() {
        return Game.importScript("resources/js/furniture.js");
    }
    static controlCharacterOnKeyDown(keyboardEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(keyboardEvent instanceof KeyboardEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running Game::controlCharacterOnKeyDown(${keyboardEvent.keyCode})`);
        if (!(Game.player instanceof CharacterEntity) || !Game.player.hasController() || !Game.player.getController().hasMesh()) {
            return 2;
        }
        switch (keyboardEvent.keyCode) {
            case Game.jumpCode : {
                Game.player.getController().keyJump(true);
                break;
            }
            case 16 : {
                Game.player.getController().keyShift(true);
                break;
            }
            case Game.walkCode : {
                Game.player.getController().keyMoveForward(true);
                break;
            }
            case Game.turnLeftCode : {
                Game.player.getController().keyTurnLeft(true);
                break;
            }
            case Game.turnRightCode : {
                Game.player.getController().keyTurnRight(true);
                break;
            }
            case Game.walkBackCode : {
                Game.player.getController().keyMoveBackward(true);
                break;
            }
            case Game.strafeLeftCode : {
                Game.player.getController().keyStrafeLeft(true);
                break;
            }
            case Game.strafeRightCode : {
                Game.player.getController().keyStrafeRight(true);
                break;
            }
            case Game.chatInputFocusCode : {
                if (Game.gui.getHudVisible()) {
                    if (!Game.gui.getChatInputFocused()) {
                        Game.gui.setChatInputFocused(true);
                    }
                    else {
                        let chatString = Game.gui.getChatInput().text.trim();
                        if (chatString.length == 0) {
                            return 1;
                        }
                        if (Client.isOnline()) {
                            Client.sendChatMessage(chatString);
                        }
                        else {
                            Game.chatParse(chatString);
                        }
                        Game.gui.chatInputClear();
                    }
                }
                break;
            }
            case Game.chatInputSubmitCode : {
                let chatString = Game.gui.getChatInput().text.trim();
                if (chatString.length == 0) {
                    return 1;
                }
                if (Client.isOnline()) {
                    Client.sendChatMessage(chatString);
                }
                else {
                    Game.chatParse(chatString);
                }
                Game.gui.chatInputClear();
                Game.gui.setChatInputFocused(false);
                break;
            }
            case Game.useTargetedEntityCode : {
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
            case Game.interfaceTargetedEntityCode : {
                if (Game.player.getController().getTarget() instanceof EntityController) {
                    Game.gui.clearActionsMenu();
                    Game.gui.populateActionsMenuWithTarget();
                    Game.gui.updateActionsMenu();
                    Game.gui.showActionsMenu();
                }
                break;
            }
            case Game.showInventoryCode : {
                Game.gui.inventoryMenu.updateWith(Game.player);
                Game.gui.showMenu(true);
                Game.gui.inventoryMenu.show();
                Game.gui.pointerRelease();
                break;
            }
            case Game.showMainMenuCode : {
                if (Game.gui.getMenuVisible()) {
                    if (Game.debugMode) console.log(`\tShowing HUD`);
                    Game.gui.hideMenu(false);
                    Game.gui.showHUD(false);
                }
                else {
                    if (Game.debugMode) console.log(`\tShowing Main Menu`);
                    Game.gui.hideHUD(false);
                    Game.gui.showCharacterChoiceMenu(false);
                }
                break;
            }
        }
        Game.player.getController().move = Game.player.getController().anyMovement();
        if (!Game.player.getController().key.equals(Game.player.getController().prevKey)) {
            if (Client.isOnline()) {
                Client.updateLocRotScaleSelf();
            }
            Game.player.getController().prevKey.copyFrom(Game.player.getController().key);
        }
        return 0;
    }
    static controlCharacterOnKeyUp(keyboardEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(keyboardEvent instanceof KeyboardEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running Game::controlCharacterOnKeyUp(${keyboardEvent.keyCode})`);
        if (!(Game.player instanceof CharacterEntity) || !Game.player.hasController() || !Game.player.getController().hasMesh()) {
            return 2;
        }
        switch (keyboardEvent.keyCode) {
            case 49: case 50: case 51: case 52: case 53:
            case 54: case 55: case 56: case 57: case 49: {
                break;
            }
            case Game.jumpCode : {
                Game.player.getController().keyJump(false);
                break;
            }
            case 16 : {
                Game.player.getController().keyShift(false);
                break;
            }
            case Game.walkCode : {
                Game.player.getController().keyMoveForward(false);
                break;
            }
            case Game.turnLeftCode : {
                Game.player.getController().keyTurnLeft(false);
                break;
            }
            case Game.turnRightCode : {
                Game.player.getController().keyTurnRight(false);
                break;
            }
            case Game.walkBackCode : {
                Game.player.getController().keyMoveBackward(false);
                break;
            }
            case Game.strafeLeftCode : {
                Game.player.getController().keyStrafeLeft(false);
                break;
            }
            case Game.strafeRightCode : {
                Game.player.getController().keyStrafeRight(false);
                break;
            }
            case Game.useTargetedEntityCode : {
                if (Game.player.getTarget() instanceof AbstractEntity) {
                    Game.doEntityActionFunction(Game.player.getTarget(), Game.player, Game.player.getTarget().getDefaultAction());
                }
                break;
            }
        }
        Game.player.getController().move = Game.player.getController().anyMovement();
        if (Client.isOnline()) {
            Client.updateLocRotScaleSelf();
        }
        return 0;
    }
    static controlMetaOnClick(mouseEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(mouseEvent instanceof MouseEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running Game::controlMetaOnClick(${mouseEvent.button})`);
        if (Game.interfaceMode == InterfaceModeEnum.DIALOGUE) {
            return Game.controlDialogueOnClick(mouseEvent);
        }
        else if (Game.interfaceMode == InterfaceModeEnum.MENU) {
            return Game.controlMenuOnClick(mouseEvent);
        }
        return 0;
    }
    static controlMetaOnMouseDown(mouseEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(mouseEvent instanceof MouseEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running Game::controlMetaOnMouseDown(${mouseEvent.button})`);
        if (Game.interfaceMode == InterfaceModeEnum.CHARACTER) {
            if (mouseEvent.button == 0) {
                Game.mouseDownDate = new Date().getTime();
                Game.mouseUpDate = Game.mouseDownDate + 1;
            }
        }
        return 0;
    }
    static controlMetaOnMouseUp(mouseEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(mouseEvent instanceof MouseEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running Game::controlMetaOnMouseUp(${mouseEvent.button})`);
        if (Game.interfaceMode == InterfaceModeEnum.CHARACTER) {
            if (!(Game.player instanceof CharacterEntity) || !Game.player.hasController() || !Game.player.getController().hasMesh()) {
                return 2;
            }
            if (mouseEvent.button == 0) {
                Game.mouseUpDate = new Date().getTime();
                Game.actionAttackFunction(Game.player.getTarget(), Game.player);
                Game.mouseDownDate = 0;
                Game.mouseUpDate = 1;
            }
            else if (mouseEvent.button == 1) {}
            else if (mouseEvent.button == 2) {
                return Game.controlCharacterOnContext(mouseEvent);
            }
        }
        return 0;
    }
    static controlCharacterOnClick(mouseEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(mouseEvent instanceof MouseEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running Game::controlCharacterOnClick(${mouseEvent.button})`);
        return 0;
    }
    static controlCharacterOnContext(mouseEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(mouseEvent instanceof MouseEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running Game::controlCharacterOnContext(${mouseEvent.button})`);
        if (!(Game.player instanceof CharacterEntity) || !Game.player.hasController() || !Game.player.getController().hasMesh()) {
            return 2;
        }
        if (Game.initialized && Game.player instanceof CharacterEntity && Game.player.getTarget() instanceof AbstractEntity) {
            Game.gui.clearActionsMenu();
            Game.gui.populateActionsMenuWithTarget();
            Game.gui.updateActionsMenu();
            Game.gui.showActionsMenu();
        }
        return 0;
    }
    static controlDialogueOnKeyDown(keyboardEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(keyboardEvent instanceof KeyboardEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running Game::controlDialogueOnKeyDown(${keyboardEvent.keyCode})`);
        if (!(Game.player instanceof CharacterEntity) || !Game.player.hasController() || !Game.player.getController().hasMesh()) {
            return 2;
        }
        switch (keyboardEvent.keyCode) {
            case 49: case 50: case 51: case 52: case 53:
            case 54: case 55: case 56: case 57: case 49: {
                break;
            }
            case Game.UIAcceptAlt:
            case Game.UIAccept: {

                break;
            }
            case Game.UIDenyAlt:
            case Game.UIDeny: {
                GameGUI.hideMenu(true);
                break;
            }
        }
        return 0;
    }
    static controlDialogueOnKeyUp(keyboardEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(keyboardEvent instanceof KeyboardEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running Game::controlDialogueOnKeyUp(${keyboardEvent.keyCode})`);
        if (!(Game.player instanceof CharacterEntity) || !Game.player.hasController() || !Game.player.getController().hasMesh()) {
            return 2;
        }
        return 0;
    }
    static controlDialogueOnClick(mouseEvent) {
        return 0;
    }
    static controlDialogueOnContext(mouseEvent) {
        return 0;
    }
    static controlMenuOnKeyDown(keyboardEvent) {
        if (!Game.initialized) {
            return 1;
        }
        if (!(keyboardEvent instanceof KeyboardEvent)) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running Game::controlMenuOnKeyDown(${keyboardEvent.keyCode})`);
        if (!(Game.player instanceof CharacterEntity) || !Game.player.hasController() || !Game.player.getController().hasMesh()) {
            return 2;
        }
        switch (keyboardEvent.keyCode) {
            case Game.showInventoryCode: {
                if (GameGUI.inventoryMenu.isVisible()) {
                    GameGUI.inventoryMenu.hide();
                    GameGUI.hideMenu();
                    GameGUI.showHUD();
                }
                else {
                    Game.gui.inventoryMenu.updateWith(Game.player);
                    Game.gui.inventoryMenu.show();
                }
                break;
            }
            case Game.UIDenyAlt:
            case Game.UIDeny: {
                GameGUI.hideMenu(true);
                break;
            }
        }
        return 0;
    }
    static controlMenuOnKeyUp(keyboardEvent) {
        return 0;
    }
    static controlMenuOnClick(mouseEvent) {
        return 0;
    }
    static controlMenuOnContext(mouseEvent) {
        return 0;
    }
    /**
     * Creates a primitive wall for collision
     * @param {BABYLON.Vector3} start 
     * @param {BABYLON.Vector3} end 
     * @param {number} yRotation 
     */
    static createCollisionWall(start = BABYLON.Vector3.Zero(), end = BABYLON.Vector3.Zero(), yRotation = 0) {
        if (Game.debugMode) console.log("Running Game::createCollisionWallX");
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
        let wall = BABYLON.MeshBuilder.CreateBox("wall", {"height":end.y - start.y, "depth":0.125, "width":wallWidth}, Game.scene);
        wall.material = Game.loadedMaterials["collisionMaterial"];
        wall.position.set(xPosition,yPosition,zPosition);
        wall.rotation.y = yRotation;
        if (Game.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(wall, {mass:0});
        }
        else {
            wall.checkCollisions = true;
        }
        return wall;
    }
    /**
     * Creates a primitive floor for collision
     * @param {BABYLON.Vector3} start 
     * @param {BABYLON.Vector3} end 
     * @param {number} yPosition 
     */
    static createCollisionPlane(start = {x:0, z:0}, end = {x:0, z:0}, yPosition = 0) {
        if (Game.debugMode) console.log("Running Game::createCollisionPlane");
        if (start instanceof BABYLON.AbstractMesh) {
            let xRadius = start.getBoundingInfo().boundingBox.extendSize.x * start.scaling.x;
            let zRadius = start.getBoundingInfo().boundingBox.extendSize.z * start.scaling.z;
            let newStart = {x:0, z:0};
            newStart.x = start.position.x;
            newStart.z = start.position.z;
            end.x = start.position.x + xRadius * 2;
            end.z = start.position.z + zRadius * 2;
            yPosition = start.position.y;
            start = newStart;
        }
        let width = Math.abs(end.x - start.x);
        let depth = Math.abs(end.z - start.z);
        let xPosition = (start.x + end.x) / 2;
        yPosition = yPosition - 0.06125;
        let zPosition = (start.z + end.z) / 2;
        let floor = BABYLON.MeshBuilder.CreateBox("wall", {"height":0.125, "depth":depth, "width":width}, Game.scene);
        floor.material = Game.loadedMaterials["collisionMaterial"];
        floor.position.set(xPosition,yPosition,zPosition);
        if (Game.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(floor, {mass:0});
        }
        else {
            floor.checkCollisions = true;
        }
        return floor;
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
        if (Game.debugMode) console.log("Running Game::createCollisionRamp");
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
        let hypotenuseSide = oppositeSide * (1/Math.cos(hypotenuseAngle)); // height
        let ramp = BABYLON.MeshBuilder.CreateBox("ramp", {"height":hypotenuseSide, "depth":0.125, "width":width}, Game.scene);
        ramp.position.set((end.x + start.x) / 2 - 1,(end.y + start.y) / 2 - 0.125/2,(end.z + start.z) / 2 - 1);
        ramp.rotation.set(hypotenuseAngle, BABYLON.Tools.ToRadians(yRotation), 0);
        ramp.material = Game.loadedMaterials["collisionMaterial"];
        if (Game.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(ramp, {mass:0});
        }
        else {
            ramp.checkCollisions = true;
        }
        return ramp;
    }
    static assignPlanePhysicsToMesh(mesh) {
        if (Game.debugMode) console.log("Running Game::assignPlanePhysicsToMesh");
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        mesh.physicsImposter = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.BoxImpostor, {mass:0}, Game.scene);
        return 0;
    }
    static assignCylinderPhysicsToMesh(mesh, options) {
        if (Game.debugMode) console.log("Running Game::assignCylinderPhysicsToMesh");
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        if (typeof options != "object") {
            options = {mass:0.8,restitution:0.1};
        }
        mesh.physicsImposter = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.CylinderImpostor, options, Game.scene);
        return 0;
    }
    static assignBoxPhysicsToMesh(mesh, options) {
        if (Game.debugMode) console.log("Running Game::assignBoxPhysicsToMesh");
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        if (typeof options != "object") {
            options = {mass:0.8,restitution:0.1};
        }
        mesh.physicsImposter = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.BoxImpostor, options, Game.scene);
        return 0;
    }
    static assignBoxPhysicsToBone(bone, options) {
        if (Game.debugMode) console.log("Running Game::assignBoxPhysicsToBone");
        if (!(bone instanceof BABYLON.Bone)) {
            return 2;
        }
        if (typeof options != "object") {
            options = {mass:0.8,restitution:0.1};
        }
        // bone boxes :v idk yet
        return 2;
    }
    static assignBoxCollisionToMesh(mesh) {
        if (Game.debugMode) console.log("Running Game::assignBoxCollisionToMesh");
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        Game.assignBoundingBoxCollisionQueue.add(mesh);
        return 0;
    }
    static assignBoundingBoxCollisionToMesh(mesh) {
        if (Game.debugMode) console.log("Running Game::assignBoundingBoxCollisionToMesh");
        if (!(mesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        Game.assignBoundingBoxCollisionQueue.delete(mesh);
        let collisionMesh = BABYLON.MeshBuilder.CreateBox(mesh.id + "-collisionBox", {width:mesh.getBoundingInfo().boundingBox.vectors[1].x - mesh.getBoundingInfo().boundingBox.vectors[0].x, height:mesh.getBoundingInfo().boundingBox.vectors[1].y - mesh.getBoundingInfo().boundingBox.vectors[0].y, depth:mesh.getBoundingInfo().boundingBox.vectors[1].z - mesh.getBoundingInfo().boundingBox.vectors[0].z}, Game.scene);
        collisionMesh.material = Game.loadedMaterials["collisionMaterial"];
        collisionMesh.checkCollisions = true;
        collisionMesh.setParent(mesh);
        let controller = Game.getMeshToEntityController(mesh.id);
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
            Game.assignBoundingBoxCollisionQueue.forEach(function(meshID) {
                Game.assignBoundingBoxCollisionToMesh(meshID);
            });
        }
        return 0;
    }
    static createItemMesh(itemID = undefined, meshID = "missingMesh", materialID = "missingMaterial", options = {}, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), forceCreateClone = false) {
        if (Game.debugMode) console.log("Running Game::createItemMesh");
        let instancedMesh = Game.createMesh(itemID, meshID, materialID, position, rotation, scaling, forceCreateClone);
        if (!(instancedMesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        if (Game.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(instancedMesh, options);
        }
        return instancedMesh;
    }
    static createFurnitureMesh(furnitureID = undefined, meshID = "missingMesh", materialID = "missingMaterial", options = {}, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), forceCreateClone = false, createCollisionMesh = true) {
        if (Game.debugMode) console.log("Running Game::createFurnitureMesh");
        let instancedMesh = Game.createMesh(furnitureID, meshID, materialID, position, rotation, scaling, forceCreateClone, createCollisionMesh);
        if (!(instancedMesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        return instancedMesh;
    }
    static createCharacterMesh(characterID = undefined, meshID = "missingMesh", materialID = "missingMaterial", options = {}, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One()) {
        if (Game.debugMode) console.log(`Running Game::createCharacterMesh(${characterID}, ${meshID}, ${materialID})`);
        if (typeof options != "object") {
            options = {mass:0.8,restitution:0.1};
        }
        let instancedMesh = Game.createMesh(characterID, meshID, materialID, position, rotation, scaling);
        if (!(instancedMesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        if (Game.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(instancedMesh, options);
        }
        else {
            instancedMesh.checkCollisions = true;
            /*
                Using X for Z size 'cause the tail throws my collision box size off
             */
            instancedMesh.ellipsoid = new BABYLON.Vector3(instancedMesh.getBoundingInfo().boundingBox.extendSize.x * scaling.x, instancedMesh.getBoundingInfo().boundingBox.extendSize.y * scaling.y, instancedMesh.getBoundingInfo().boundingBox.extendSize.x * scaling.z);
            instancedMesh.ellipsoidOffset = new BABYLON.Vector3(0, instancedMesh.ellipsoid.y, -0.1);
        }
        return instancedMesh;
    }
    static removeInstancedMesh(abstractMesh) {
        return Game.removeMesh(abstractMesh);
    }
    static removeClonedMesh(abstractMesh) {
        return Game.removeMesh(abstractMesh);
    }
    static removeMesh(abstractMesh) {
        if (abstractMesh instanceof BABYLON.InstancedMesh) {
            delete Game.instancedMeshes[abstractMesh.id];
            abstractMesh.dispose();
        }
        else if (abstractMesh instanceof BABYLON.Mesh && Game.hasClonedMesh(abstractMesh.id)) {
            delete Game.clonedMeshes[abstractMesh.id];
            abstractMesh.dispose();
        }
        return 0;
    }
    static removeMeshMaterial(meshID, materialID) {
        if (Game.hasMeshMaterial(meshID, materialID)) {
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
        if (Game.loadedMeshMaterials.hasOwnProperty(meshID)) {
            return Game.loadedMeshMaterials[meshID].hasOwnProperty(materialID);
        }
        return false;
    }
    static hasAvailableMesh(meshID) {
        return Game.meshLocations.hasOwnProperty(meshID);
    }
    static hasLoadedMesh(meshID) {
        return Game.loadedMeshes.hasOwnProperty(meshID);
    }
    static hasMesh(meshID) {
        if (Game.hasLoadedMesh(meshID)) {
            return true;
        }
        else if (Game.hasAvailableMesh(meshID)) {
            Game.loadMesh(meshID);
            return true;
        }
        return false;
    }
    static hasAvailableSound(soundID) {
        return Game.soundLocations.hasOwnProperty(soundID);
    }
    static hasLoadedSound(soundID) {
        return Game.loadedSounds.hasOwnProperty(soundID);
    }
    static hasSound(soundID) {
        if (Game.hasLoadedSound(soundID)) {
            return true;
        }
        else if (Game.hasAvailableSound(soundID)) {
            Game.loadSound(soundID);
            return true;
        }
        return false;
    }
    static addSound(soundID, location) {
        if (!Game.hasSound(soundID)) {
            return 2;
        }
        Game.soundLocations[soundID] = location;
        return 0;
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
    static playSound(soundID) {
        if (!Game.hasSound(soundID)) {
            Game.loadedSounds["missingSound"].play()
            return 2;
        }
        soundID = Game.getSound(soundID);
        if (soundID instanceof BABYLON.Sound && soundID.name != "missingSound") {
            soundID.play();
        }
        return 0;
    }
    static hasAvailableTexture(textureID) {
        return Game.textureLocations.hasOwnProperty(textureID);
    }
    static hasLoadedTexture(textureID) {
        return Game.loadedTextures.hasOwnProperty(textureID);
    }
    static hasTexture(textureID) {
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
        return Game.hasLoadedMaterial(materialID);
    }
    static hasLoadedMaterial(materialID) {
        return Game.loadedMaterials.hasOwnProperty(materialID);
    }
    static hasMaterial(materialID) {
        return Game.hasLoadedMaterial(materialID);
    }
    /**
     * Creates a mesh from those stored in loadedMeshes
     * @param  {string} meshIndexID New ID for BABYLON.Mesh and EntityController
     * @param  {string} meshID String ID of Mesh to create
     * @param  {string} materialID String ID of Material to apply to Mesh
     * @param  {BABYLON.Vector3} position Mesh position
     * @param  {BABYLON.Vector3} rotation Mesh rotation
     * @param  {BABYLON.Vector3} scaling Mesh scaling
     * @param  {boolean} forceCreateClone Forces the creation of a clone instead of an instance; workaround for highlighting and attaching to bones.
     * @return {BABYLON.AbstractMesh} The created mesh
     */
    static createMesh(meshIndexID = undefined, meshID = "missingMesh", materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), forceCreateClone = false, createCollisionMesh = false) {
        meshIndexID = Tools.filterID(meshIndexID);
        if (meshIndexID.length == 0) {
            meshIndexID = Tools.genUUIDv4();
        }
        if (Game.debugMode) console.log(`Running Game::createMesh(${meshIndexID}, ${meshID}, ${materialID})`);
        if (!(position instanceof BABYLON.Vector3)) {
            position = Tools.filterVector(position);
        }
        if (!(rotation instanceof BABYLON.Vector3)) {
            if (typeof rotation == "number") {
                rotation = new BABYLON.Vector3(0, rotation, 0);
            }
            else {
                rotation = Tools.filterVector(rotation);
            }
        }
        if (!(scaling instanceof BABYLON.Vector3)) {
            if (typeof scaling == "number") {
                scaling = new BABYLON.Vector3(scaling, scaling, scaling);
            }
            else {
                scaling = Tools.filterVector(scaling);
            }
        }
        if (scaling.equals(BABYLON.Vector3.Zero())) {
            scaling = BABYLON.Vector3.One();
        }
        if (!Game.hasAvailableMesh(meshID)) {
            if (Game.debugMode) console.log(`\tMesh ${meshID} doesn't exist`);
            return Game.loadedMeshes["missingMesh"];
        }
        else if (!Game.hasLoadedMesh(meshID)) {
            if (Game.debugMode) console.log(`\tMesh ${meshID} exists and will be loaded`);
            Game.addMeshToCreate(meshIndexID, meshID, materialID, position, rotation, scaling, forceCreateClone, createCollisionMesh);
            return Game.loadedMeshes["loadingMesh"];
        }
        if (!Game.hasLoadedMaterial(materialID)) {
            if (Game.hasAvailableTexture(materialID)) {
                if (!Game.hasLoadedTexture(materialID)) {
                    Game.loadTexture(materialID);
                }
                Game.loadMaterial(materialID, materialID);
            }
            else {
                materialID = "missingMaterial";
            }
        }
        if (Game.debugMode) console.log(`\tMesh ${meshID} exists and is loaded`);
        let mesh = Game.getLoadedMesh(meshID);
        let material = Game.getLoadedMaterial(materialID);
        if (mesh.skeleton instanceof BABYLON.Skeleton) {
            let meshSkeleton = mesh.skeleton.clone(meshIndexID);
            mesh = mesh.clone(meshIndexID);
            mesh.makeGeometryUnique();
            mesh.id = meshIndexID;
            mesh.material = material;
            mesh.name = meshID;
            mesh.skeleton = meshSkeleton;
            Game.addClonedMesh(mesh, meshIndexID);
            Game.setMeshMaterial(mesh, material);
        }
        else {
            if (!Game.loadedMeshMaterials.hasOwnProperty(meshID)) {
                Game.loadedMeshMaterials[meshID] = {};
            }
            if (!Game.loadedMeshMaterials[meshID].hasOwnProperty(materialID)) {
                mesh = mesh.clone(meshID + materialID);
                mesh.makeGeometryUnique();
                mesh.id = meshIndexID;
                mesh.material = material;
                mesh.name = meshID;
                if (Game.debugMode) console.log("Creating master clone of " + meshID + " with " + materialID);
                mesh.setEnabled(false);
                mesh.position.set(0,-4095,0);
                Game.setMeshMaterial(mesh, material);
            }
            if (forceCreateClone === true) {
                if (Game.debugMode) console.log("  Creating clone...");
                mesh = Game.loadedMeshMaterials[meshID][materialID].clone(meshIndexID);
                mesh.makeGeometryUnique();
                mesh.id = meshIndexID;
                mesh.material = material;
                mesh.name = meshID;
                Game.addClonedMesh(mesh, meshIndexID);
            }
            else {
                if (Game.debugMode) console.log(`  Creating instance of Mesh:(${meshID}), Material:(${materialID})...`);
                mesh = Game.loadedMeshMaterials[meshID][materialID].createInstance(meshIndexID);
                mesh.id = meshIndexID;
                mesh.name = meshID;
                Game.addInstancedMesh(mesh, meshIndexID);
            }
        }
        mesh.isVisible = true;
        mesh.position.copyFrom(position);
        mesh.rotation = new BABYLON.Vector3(BABYLON.Tools.ToRadians(rotation.x), BABYLON.Tools.ToRadians(rotation.y), BABYLON.Tools.ToRadians(rotation.z));
        mesh.scaling.copyFrom(scaling);
        mesh.setEnabled(true);
        if (createCollisionMesh) {
            if (Game.physicsEnabled) {
                Game.assignBoxPhysicsToMesh(mesh);
            }
            else {
                //Game.assignBoxCollisionToMesh(mesh);
                mesh.checkCollisions = true;
            }
        }
        return mesh;
    }
    static createCollidableMesh(meshIndexID = undefined, meshID = "missingMesh", materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), forceCreateClone = false) {
        return Game.createMesh(meshIndexID, meshID, materialID, position, rotation, scaling, forceCreateClone, true);
    }
    static addMeshToCreate(meshIndexID, meshID, materialID, position, rotation, scaling, forceCreateClone, createCollisionMesh) {
        if (Game.hasMeshToCreate(meshIndexID)) {
            return true;
        }
        Game.loadMesh(meshID);
        Game.meshesToCreate[meshIndexID] = {
            0:meshIndexID, 
            1:meshID, 
            2:materialID, 
            3:position, 
            4:rotation, 
            5:scaling, 
            6:forceCreateClone, 
            7:createCollisionMesh
        };
        Game.meshesToCreateCounter += 1;
        Game.hasBackloggedEntities = true;
        return true;
    }
    static removeMeshToCreate(meshIndexID) {
        if (!Game.hasMeshToCreate(meshIndexID)) {
            return true;
        }
        delete Game.meshesToCreate[meshIndexID];
        Game.meshesToCreateCounter -= 1;
        return true;
    }
    static hasMeshToCreate(meshIndexID) {
        return Game.meshesToCreateCounter > 0 && Game.meshesToCreate.hasOwnProperty(meshIndexID);
    }
    static createBackloggedMeshes() {
        if (Game.meshesToCreateCounter == 0) {
            return true;
        }
        for (let i in Game.meshesToCreate) {
            if (Game.loadedMeshes.hasOwnProperty(Game.meshesToCreate[i][1])) {
                Game.createMesh(
                    Game.meshesToCreate[i][0],
                    Game.meshesToCreate[i][1],
                    Game.meshesToCreate[i][2],
                    Game.meshesToCreate[i][3],
                    Game.meshesToCreate[i][4],
                    Game.meshesToCreate[i][5],
                    Game.meshesToCreate[i][6],
                    Game.meshesToCreate[i][7]
                );
                Game.removeMeshToCreate(i);
            }
        }
    }
    static addFurnitureToCreate(furnitureInstanceID, furnitureInstance = undefined, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One()) {
        if (Game.hasFurnitureToCreate(furnitureInstanceID)) {
            return true;
        }
        if (!(furnitureInstance instanceof InstancedFurnitureEntity) && Game.hasInstancedFurnitureEntity(furnitureInstance)) {
            furnitureInstance = Game.getInstancedFurnitureEntity(furnitureInstance);
        }
        Game.loadMesh(furnitureInstance.getMeshID());
        Game.furnitureToCreate[furnitureInstanceID] = {
            0:furnitureInstanceID,
            1:furnitureInstance,
            2:position,
            3:rotation,
            4:scaling
        };
        Game.furnitureToCreateCounter += 1;
        Game.hasBackloggedEntities = true;
        return true;
    }
    static removeFurnitureToCreate(furnitureInstanceID) {
        if (!Game.hasFurnitureToCreate(furnitureInstanceID)) {
            return true;
        }
        delete Game.furnitureToCreate[furnitureInstanceID];
        Game.furnitureToCreateCounter -= 1;
        return true;
    }
    static hasFurnitureToCreate(furnitureInstanceID) {
        return Game.furnitureToCreateCounter > 0 && Game.furnitureToCreate.hasOwnProperty(furnitureInstanceID);
    }
    static createBackloggedFurniture() {
        if (Game.furnitureToCreateCounter == 0) {
            return true;
        }
        for (let i in Game.furnitureToCreate) {
            if (Game.loadedMeshes.hasOwnProperty(Game.furnitureToCreate[i][1].getMeshID())) {
                Game.createFurnitureInstance(
                    Game.furnitureToCreate[i][0],
                    Game.furnitureToCreate[i][1],
                    Game.furnitureToCreate[i][2],
                    Game.furnitureToCreate[i][3],
                    Game.furnitureToCreate[i][4]
                );
                Game.removeFurnitureToCreate(i);
            }
        }
    }
    static addLightingToCreate(lightingIndexID, name = "", meshID = "missingMesh", textureID = "missingMaterial", lightingType = "", options = {}, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), lightPositionOffset = BABYLON.Vector3.Zero(), createCollisionMesh = true) {
        if (Game.hasLightingToCreate(lightingIndexID)) {
            return true;
        }
        Game.loadMesh(meshID);
        Game.lightingToCreate[lightingIndexID] = {
            0:lightingIndexID,
            1:name,
            2:meshID,
            3:textureID,
            4:lightingType,
            5:options,
            6:position,
            7:rotation,
            8:scaling,
            9:lightPositionOffset,
            10:createCollisionMesh
        };
        Game.lightingToCreateCounter += 1;
        Game.hasBackloggedEntities = true;
        return true;
    }
    static removeLightingToCreate(lightingIndexID) {
        if (!Game.hasLightingToCreate(lightingIndexID)) {
            return true;
        }
        delete Game.lightingToCreate[lightingIndexID];
        Game.lightingToCreateCounter -= 1;
        return true;
    }
    static hasLightingToCreate(lightingIndexID) {
        return Game.lightingToCreateCounter > 0 && Game.lightingToCreate.hasOwnProperty(lightingIndexID);
    }
    static createBackloggedLighting() {
        if (Game.lightingToCreateCounter == 0) {
            return true;
        }
        for (let i in Game.lightingToCreate) {
            if (Game.loadedMeshes.hasOwnProperty(Game.lightingToCreate[i][2])) {
                Game.createLighting(
                    Game.lightingToCreate[i][0],
                    Game.lightingToCreate[i][1],
                    Game.lightingToCreate[i][2],
                    Game.lightingToCreate[i][3],
                    Game.lightingToCreate[i][4],
                    Game.lightingToCreate[i][5],
                    Game.lightingToCreate[i][6],
                    Game.lightingToCreate[i][7],
                    Game.lightingToCreate[i][8],
                    Game.lightingToCreate[i][9],
                    Game.lightingToCreate[i][10]
                );
                Game.removeLightingToCreate(i);
            }
        }
    }
    static addDoorsToCreate(doorIndexID, name = "", to = "", meshID = "missingMesh", textureID = "missingMaterial", options = {}, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One()) {
        if (Game.hasDoorsToCreate(doorIndexID)) {
            return true;
        }
        Game.loadMesh(meshID);
        Game.doorsToCreate[doorIndexID] = {
            0:doorIndexID,
            1:name,
            2:to,
            3:meshID,
            4:textureID,
            5:options,
            6:position,
            7:rotation,
            8:scaling
        };
        Game.doorsToCreateCounter += 1;
        Game.hasBackloggedEntities = true;
        return true;
    }
    static removeDoorsToCreate(doorIndexID) {
        if (!Game.hasDoorsToCreate(doorIndexID)) {
            return true;
        }
        delete Game.doorsToCreate[doorIndexID];
        Game.doorsToCreateCounter -= 1;
        return true;
    }
    static hasDoorsToCreate(doorIndexID) {
        return Game.doorsToCreateCounter > 0 && Game.doorsToCreate.hasOwnProperty(doorIndexID);
    }
    static createBackloggedDoors() {
        if (Game.doorsToCreateCounter == 0) {
            return true;
        }
        for (let i in Game.doorsToCreate) {
            if (Game.loadedMeshes.hasOwnProperty(Game.doorsToCreate[i][3])) {
                Game.createDoor(
                    Game.doorsToCreate[i][0],
                    Game.doorsToCreate[i][1],
                    Game.doorsToCreate[i][2],
                    Game.doorsToCreate[i][3],
                    Game.doorsToCreate[i][4],
                    Game.doorsToCreate[i][5],
                    Game.doorsToCreate[i][6],
                    Game.doorsToCreate[i][7],
                    Game.doorsToCreate[i][8]
                );
                Game.removeDoorsToCreate(i);
            }
        }
    }
    static addCharacterToCreate(characterIndexID, name = "", description = "", iconID = undefined, age = 18, sex = SexEnum.MALE, species = SpeciesEnum.FOX, meshID = "missingMesh", materialID = "missingMaterial", options = {}, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One()) {
        if (Game.hasCharacterToCreate(characterIndexID)) {
            return true;
        }
        Game.loadMesh(meshID);
        Game.charactersToCreate[characterIndexID] = {
            0:characterIndexID,
            1:name,
            2:description,
            3:iconID,
            4:age,
            5:sex,
            6:species,
            7:meshID,
            8:materialID,
            9:options,
            10:position,
            11:rotation,
            12:scaling
        };
        Game.charactersToCreateCounter += 1;
        Game.hasBackloggedEntities = true;
        return true;
    }
    static removeCharacterToCreate(characterIndexID) {
        if (!Game.hasCharacterToCreate(characterIndexID)) {
            return true;
        }
        delete Game.charactersToCreate[characterIndexID];
        Game.charactersToCreateCounter -= 1;
        return true;
    }
    static hasCharacterToCreate(characterIndexID) {
        return Game.charactersToCreateCounter > 0 && Game.charactersToCreate.hasOwnProperty(characterIndexID);
    }
    static createBackloggedCharacters() {
        if (Game.charactersToCreateCounter == 0) {
            return true;
        }
        for (let i in Game.charactersToCreate) {
            if (Game.loadedMeshes.hasOwnProperty(Game.charactersToCreate[i][7])) {
                Game.createCharacter(
                    Game.charactersToCreate[i][0],
                    Game.charactersToCreate[i][1],
                    Game.charactersToCreate[i][2],
                    Game.charactersToCreate[i][3],
                    Game.charactersToCreate[i][4],
                    Game.charactersToCreate[i][5],
                    Game.charactersToCreate[i][6],
                    Game.charactersToCreate[i][7],
                    Game.charactersToCreate[i][8],
                    Game.charactersToCreate[i][9],
                    Game.charactersToCreate[i][10],
                    Game.charactersToCreate[i][11],
                    Game.charactersToCreate[i][12]
                );
                Game.removeCharacterToCreate(i);
            }
        }
    }
    static addItemToCreate(itemIndexID, itemEntity = undefined, options = {}, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One()) {
        if (Game.hasItemToCreate(itemIndexID)) {
            return true;
        }
        Game.loadMesh(itemEntity.getMeshID());
        Game.itemsToCreate[itemIndexID] = {
            0:itemIndexID,
            1:itemEntity,
            2:options,
            3:position,
            4:rotation,
            5:scaling
        };
        Game.itemsToCreateCounter += 1;
        Game.hasBackloggedEntities = true;
        return true;
    }
    static removeItemToCreate(itemIndexID) {
        if (!Game.hasItemToCreate(itemIndexID)) {
            return true;
        }
        delete Game.itemsToCreate[itemIndexID];
        Game.itemsToCreateCounter -= 1;
        return true;
    }
    static hasItemToCreate(itemIndexID) {
        return Game.itemsToCreateCounter > 0 && Game.itemsToCreate.hasOwnProperty(itemIndexID);
    }
    static createBackloggedItems() { // It's InstancedItemEntities :v
        if (Game.itemsToCreateCounter == 0) {
            return true;
        }
        for (let i in Game.itemsToCreate) {
            if (Game.hasLoadedMesh(Game.itemsToCreate[i][1].getMeshID())) {
                Game.createItemInstance(
                    Game.itemsToCreate[i][0],
                    Game.itemsToCreate[i][1],
                    Game.itemsToCreate[i][2],
                    Game.itemsToCreate[i][3],
                    Game.itemsToCreate[i][4],
                    Game.itemsToCreate[i][5]
                );
                Game.removeItemToCreate(i);
            }
        }
    }
    static addAttachmentToCreate(attachmentIndexID, attachToController, meshID, materialID, bone, position, rotation, scaling) {
        if (Game.hasAttachmentToCreate(attachmentIndexID)) {
            return true;
        }
        Game.loadMesh(meshID);
        Game.attachmentsToCreate[attachmentIndexID] = {
            0:attachmentIndexID,
            1:attachToController,
            2:meshID,
            3:materialID,
            4:bone,
            5:position,
            6:rotation,
            7:scaling
        };
        Game.attachmentsToCreateCounter += 1;
        Game.hasBackloggedEntities = true;
        return true;
    }
    static removeAttachmentToCreate(attachmentIndexID) {
        if (!Game.hasAttachmentToCreate(attachmentIndexID)) {
            return true;
        }
        delete Game.attachmentsToCreate[attachmentIndexID];
        Game.attachmentsToCreateCounter -= 1;
        return true;
    }
    static hasAttachmentToCreate(attachmentIndexID) {
        return Game.attachmentsToCreateCounter > 0 && Game.attachmentsToCreate.hasOwnProperty(attachmentIndexID);
    }
    static createBackloggedAttachments() {
        if (Game.attachmentsToCreateCounter == 0) {
            return true;
        }
        for (let i in Game.attachmentsToCreate) {
            if (Game.loadedMeshes.hasOwnProperty(Game.attachmentsToCreate[i][2])) {
                if (Game.attachmentsToCreate[i][1] instanceof CharacterController) {
                    Game.attachmentsToCreate[i][1].attachMeshIDToBone(
                        Game.attachmentsToCreate[i][2],
                        Game.attachmentsToCreate[i][3],
                        Game.attachmentsToCreate[i][4],
                        Game.attachmentsToCreate[i][5],
                        Game.attachmentsToCreate[i][6],
                        Game.attachmentsToCreate[i][7]
                    );
                }
                Game.removeAttachmentToCreate(i);
            }
        }
    }

    static importMeshes(file, meshIDs = undefined, callback = undefined) {
        if (Game.loadedFiles.has(file)) {
            return 0;
        }
        else {
            Game.loadedFiles.add(file);
        }
        if (Game.debugMode) console.log(`Running importMeshes(${file})`);
        let importedMeshes = {};
        Game._filesToLoad += 1;
        BABYLON.SceneLoader.ImportMesh(
            undefined, // meshNames
            file.substr(0, file.lastIndexOf("/")+1), // rootUrl
            file.substr(file.lastIndexOf("/")+1), // sceneFilename
            Game.scene, // scene
            function(meshes, particleSystems, skeletons) { // onSuccess
                for(let i = 0; i < meshes.length; i++) {
                    meshes[i].name = meshes[i].id;
                    meshes[i].setEnabled(false);
                    meshes[i].material = Game.loadedMaterials["default"];
                    importedMeshes[meshes[i].id] = meshes[i];
                    if (skeletons[i] != undefined) {
                        meshes[i].skeleon = skeletons[i];
                    }
                    Game.loadedMeshes[meshes[i].id] = meshes[i];
                    if (Game.debugMode) console.log("Importing mesh " + meshes[i].id + " from " + file + ".");
                }
                Game._filesToLoad -= 1;
                if (typeof callback == "function") {
                    callback(importedMeshes);
                }
            },
            function() { // onProgress
                if (Game.debugMode) console.log("Importing meshes from " + file + "...");
            },
            function() { // onError
                if (Game.debugMode) console.log("Error while importing meshes from " + file);
                Game._filesToLoad -= 1;
            }
        );
        return 0;
    }

    static setPlayerID(id) {
        Game.setEntityID(Game.player.getID(), id);
    }
    static setEntityID(currentID, newID) {
        if (!Game.hasEntity(currentID)) {
            return 1;
        }
        let entity = Game.getEntity(currentID);
        if (entity.hasController()) {
            entity.getController().setLocked(true);
            entity.getController().setEnabled(false);
        }
        entity.setLocked(true);
        entity.setEnabled(false);
        if (entity instanceof AbstractEntity) {
            Game.removeAbstractEntity(currentID);
            if (entity instanceof Entity) {
                Game.removeEntity(currentID);
                if (entity instanceof CharacterEntity) {
                    Game.removeCharacterEntity(currentID);
                    Game.setCharacterEntity(newID, entity);
                }
                else if (entity instanceof DoorEntity) {
                    Game.removeDoorEntity(currentID);
                    Game.setDoorEntity(newID, entity);
                }
                else if (entity instanceof ItemEntity) {
                    Game.removeItemEntity(currentID);
                    Game.setItemEntity(newID, entity);
                    if (entity instanceof EquipmentEntity) {
                        /*Game.removeEquipmentEntity(currentID);
                        Game.setEquipmentEntity(newID, entity);*/
                        if (entity instanceof ClothingEntity) {
                            Game.removeClothingEntity(currentID);
                            Game.setClothingEntity(newID, entity);
                        }
                        else if (entity instanceof WeaponEntity) {
                            Game.removeWeaponEntity(currentID);
                            Game.setWeaponEntity(newID, entity);
                        }
                    }
                    else if (entity instanceof KeyEntity) {
                        Game.removeKeyEntity(currentID);
                        Game.setKeyEntity(newID, entity);
                    }
                }
                else if (entity instanceof FurnitureEntity) {
                    Game.removeFurnitureEntity(currentID);
                    Game.setFurnitureEntity(newID, entity);
                    if (entity instanceof LightingEntity) {
                        Game.removeLightingEntity(currentID);
                        Game.setLightingEntity(newID, entity);
                    }
                }
                else if (entity instanceof SpellEntity) {
                    Game.removeSpellEntity(currentID);
                    Game.setSpellEntity(newID, entity);
                }
                entity.setID(newID);
                Game.setEntity(newID, entity);
            }
            else if (entity instanceof InstancedEntity) {
                Game.removeEntityInstance(currentID);
                if (entity instanceof InstancedFurnitureEntity) {
                    Game.removeFurnitureInstance(currentID);
                    Game.setFurnitureInstance(newID, entity);
                }
                else if (entity instanceof InstancedItemEntity) {
                    Game.removeItemInstance(currentID);
                    Game.setItemInstance(newID, entity);
                    if (entity instanceof InstancedEquipmentEntity) {
                        /*Game.removeEquipmentInstance(currentID);
                        Game.setEquipmentInstance(newID, entity);*/
                        if (entity instanceof InstancedClothingEntity) {
                            Game.removeClothingInstance(currentID);
                            Game.setClothingInstance(newID, entity);
                        }
                        else if (entity instanceof InstancedWeaponEntity) {
                            Game.removeWeaponInstance(currentID);
                            Game.setWeaponInstance(newID, entity);
                        }
                    }
                }
                entity.setID(newID);
                Game.setEntityInstance(newID, entity);
            }
            Game.setAbstractEntity(newID, entity);
        }
        else {
            return 2;
        }
        if (entity.hasController()) {
            let controller = entity.getController();
            let mesh = controller.getMesh();
            Game.removeMeshToEntityController(mesh.id);
            Game.removeEntityController(controller.getID());
            if (controller instanceof CharacterController) {
                Game.removeCharacterController(controller.getID());
                Game.setCharacterController(newID, controller);
            }
            else if (controller instanceof DoorController) {
                Game.removeDoorController(controller.getID());
                Game.setDoorController(newID, controller);
            }
            else if (controller instanceof FurnitureController) {
                Game.removeFurnitureController(controller.getID());
                Game.setFurnitureController(newID, controller);
                if (controller instanceof LightingController) {
                    Game.removeLightingController(controller.getID());
                    Game.setLightingController(newID, controller);
                }
            }
            else if (controller instanceof ItemController) {
                Game.removeItemController(controller.getID());
                Game.setItemController(newID, controller);
            }
            controller.setID(newID);
            Game.setEntityController(newID, controller);
            Game.setMeshToEntityController(mesh.id, controller);
        }
        entity.setEnabled(true);
        entity.setLocked(false);
        if (entity.hasController()) {
            entity.getController().setEnabled(true);
            entity.getController().setLocked(false);
        }
        return 0;
    }
    static getEntityController(id) {
        if (Game.hasEntityController(id)) {
            return Game.entityControllers[id];
        }
        return 2;
    }
    static hasEntityController(id) {
        if (typeof id != "string") {
            return false;
        }
        return Game.entityControllers.hasOwnProperty(id);
    }
    /*static getNetworkedCharacterController(id) {
        if (Game.hasNetworkedCharacterController(id)) {
            return Game.networkedCharacterControllers[id];
        }
        return 2;
    }
    static hasNetworkedCharacterController(id) {
        return Game.networkedCharacterControllers.hasOwnProperty(id);
    }*/
    static getFurnitureController(id) {
        if (Game.hasFurnitureController(id)) {
            return Game.furnitureControllers[id];
        }
        return 2;
    }
    static hasFurnitureController(id) {
        if (typeof id != "string") {
            return false;
        }
        return Game.furnitureControllers.hasOwnProperty(id);
    }
    static getLightingController(id) {
        if (Game.hasLightingController(id)) {
            return Game.lightingControllers[id];
        }
        return 2;
    }
    static hasLightingController(id) {
        if (typeof id != "string") {
            return false;
        }
        return Game.lightingControllers.hasOwnProperty(id);
    }
    static getDoorController(id) {
        if (Game.hasDoorController(id)) {
            return Game.doorControllers[id];
        }
        return 2;
    }
    static hasDoorController(id) {
        if (typeof id != "string") {
            return false;
        }
        return Game.doorControllers.hasOwnProperty(id);
    }
    static getItemController(id) {
        if (Game.hasItemController(id)) {
            return Game.itemControllers[id];
        }
        return 2;
    }
    static hasItemController(id) {
        if (typeof id != "string") {
            return false;
        }
        return Game.itemControllers.hasOwnProperty(id);
    }
    static getCharacterController(id) {
        if (Game.hasCharacterController(id)) {
            return Game.characterControllers[id];
        }
        return 2;
    }
    static hasCharacterController(id) {
        if (typeof id != "string") {
            return false;
        }
        return Game.characterControllers.hasOwnProperty(id);
    }
    /**
     * Tries to return an Entity based on its ID
     * @param {string} id Entity ID
     * @returns {(Entity|number)} An Entity or an integer status code
     */
    static getEntity(id) {
        if (Game.hasEntity(id)) {
            return Game.entities[id];
        }
        return 2;
    }
    /**
     * Whether or not an Entity exists
     * @param {string} id Entity ID
     * @returns {boolean}
     */
    static hasEntity(id) {
        if (typeof id != "string") {
            return false;
        }
        return Game.entities.hasOwnProperty(id);
    }
    /**
     * Tries to return an InstancedEntity based on its ID
     * @param {string} id InstancedEntity ID
     * @returns {(InstancedEntity|number)} An InstancedEntity or an integer status code
     */
    static getInstancedEntity(id) {
        if (Game.hasInstancedEntity(id)) {
            return Game.instancedEntities[id];
        }
        return 2;
    }
    /**
     * Whether or not an InstancedEntity exists
     * @param {string} id InstancedEntity ID
     * @returns {boolean}
     */
    static hasInstancedEntity(id) {
        if (typeof id != "string") {
            return false;
        }
        return Game.instancedEntities.hasOwnProperty(id);
    }
    /**
     * Tries to return an ItemEntity based on its ID
     * @param {string} id ItemEntity ID
     * @returns {(ItemEntity|number)} An ItemEntity or an integer status code
     */
    static getItemEntity(id) {
        if (Game.hasItemEntity(id)) {
            return Game.itemEntities[id];
        }
        return 2;
    }
    /**
     * Whether or not an ItemEntity exists
     * @param {string} id ItemEntity ID
     * @returns {boolean}
     */
    static hasItemEntity(id) {
        if (typeof id != "string") {
            return false;
        }
        return Game.itemEntities.hasOwnProperty(id);
    }
    /**
     * Tries to return an InstancedItemEntity based on its ID
     * @param {string} id InstancedItemEntity ID
     * @returns {(InstancedItemEntity|number)} An InstancedItemEntity or an integer status code
     */
    static getInstancedItemEntity(id) {
        if (Game.hasInstancedItemEntity(id)) {
            return Game.instancedItemEntities[id];
        }
        return 2;
    }
    /**
     * Whether or not an InstancedItemEntity exists
     * @param {string} id InstancedItemEntity ID
     * @returns {boolean}
     */
    static hasInstancedItemEntity(id) {
        if (typeof id != "string") {
            return false;
        }
        return Game.instancedItemEntities.hasOwnProperty(id);
    }
    /**
     * Tries to return a CharacterEntity based on its ID
     * @param {string} id CharacterEntity ID
     * @returns {(CharacterEntity|number)} An CharacterEntity or an integer status code
     */
    static getCharacterEntity(id) {
        if (Game.hasCharacterEntity(id)) {
            return Game.characterEntities[id];
        }
        return 2;
    }
    /**
     * Whether or not a CharacterEntity exists
     * @param {string} id CharacterEntity ID
     * @returns {boolean}
     */
    static hasCharacterEntity(id) {
        if (typeof id != "string") {
            return false;
        }
        return Game.characterEntities.hasOwnProperty(id);
    }
    /**
     * Tries to return a FurnitureEntity based on its ID
     * @param {string} id FurnitureEntity ID
     * @returns {(FurnitureEntity|number)} An FurnitureEntity or an integer status code
     */
    static getFurnitureEntity(id) {
        if (Game.hasFurnitureEntity(id)) {
            return Game.furnitureEntities[id];
        }
        return 2;
    }
    /**
     * Whether or not a FurnitureEntity exists
     * @param {string} id FurnitureEntity ID
     * @returns {boolean}
     */
    static hasFurnitureEntity(id) {
        if (typeof id != "string") {
            return false;
        }
        return Game.furnitureEntities.hasOwnProperty(id);
    }
    /**
     * Tries to return an InstancedFurnitureEntity based on its ID
     * @param {string} id InstancedFurnitureEntity ID
     * @returns {(InstancedFurnitureEntity|number)} An InstancedFurnitureEntity or an integer status code
     */
    static getInstancedFurnitureEntity(id) {
        if (Game.hasInstancedFurnitureEntity(id)) {
            return Game.instancedFurnitureEntities[id];
        }
        return 2;
    }
    /**
     * Whether or not an InstancedFurnitureEntity exists
     * @param {string} id InstancedFurnitureEntity ID
     * @returns {boolean}
     */
    static hasInstancedFurnitureEntity(id) {
        if (typeof id != "string") {
            return false;
        }
        return Game.instancedFurnitureEntities.hasOwnProperty(id);
    }
    /**
     * Tries to return a Dialogue based on its ID
     * @param {string} id Unique ID
     * @returns {(Dialogue|number)} A Dialogue or an integer status code
     */
    static getDialogue(id) {
        if (Game.hasDialogue(id)) {
            return Game.dialogues.get(id);
        }
        return 2;
    }
    static hasDialogue(id) {
        if (typeof id != "string") {
            return false;
        }
        return Game.dialogues.has(id);
    }
    /**
     * Creates a character mesh, entity, and controller.
     * @param  {string} [id] Unique ID, auto-generated if none given
     * @param  {string} name Name
     * @param  {string} [description] Description
     * @param  {string} [iconID] Icon ID
     * @param  {number} age Age
     * @param  {SexEnum} sex SexEnum
     * @param  {SpeciesEnum} species SpeciesEnum
     * @param  {string} [meshID] Mesh ID
     * @param  {string} [materialID] Texture ID
     * @param  {object} [options] Physics options: don't touch 'cause they're not used
     * @param  {BABYLON.Vector3} position Position
     * @param  {BABYLON.Vector3} [rotation] Rotation
     * @param  {BABYLON.Vector3} [scaling] Scale
     * @return {CharacterController} Character Controller
     */
    static createCharacter(id, name = "", description = "", iconID = undefined, age = 18, sex = SexEnum.MALE, species = SpeciesEnum.FOX, meshID = "missingMesh", materialID = "missingMaterial", options = {}, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One()) {
        id = Tools.filterID(id);
        if ((id.length == 0)) {
            id = Tools.genUUIDv4();
        }
        let characterEntity = null;
        if (!Game.hasCharacterEntity(id)) {
            characterEntity = new CharacterEntity(id, name, description, iconID, undefined, age, sex, species);
            if (options instanceof Object) {
                for (let i in options) {
                    switch (i) {
                        case "eye":
                        case "eyes": {
                            characterEntity.setEyeType(options[i]);
                            break;
                        }
                        case "eyeColor":
                        case "eyesColor":
                        case "eyeColour":
                        case "eyesColour": {
                            characterEntity.setEyeColour(options[i]);
                            break;
                        }
                        case "isEssential": {
                            characterEntity.setEssential(options[i]);
                            break;
                        }
                    }
                }
            }
            if (Game.hasAvailableMesh(meshID) && meshID != "missingMesh" && meshID != "loadingMesh") {
                characterEntity.setMeshID(meshID);
            }
            else {
                switch (characterEntity.getSpecies()) {
                    case SpeciesEnum.FOX: {
                        if (characterEntity.getSex() == SexEnum.MALE) {
                            characterEntity.setMeshID("foxM");
                        }
                        else {
                            characterEntity.setMeshID("foxF");
                        }
                        break;
                    }
                    case SpeciesEnum.SKELETON:
                    default : {
                        characterEntity.setMeshID("foxSkeletonN");
                        break;
                    }
                }
            }
            if (Game.hasLoadedMaterial(materialID) && materialID != "missingMaterial" && materialID != "loadingMaterial") {
                characterEntity.setMaterialID(materialID);
                if (Game.getLoadedMaterial(materialID).diffuseTexture instanceof BABYLON.Texture) {
                    characterEntity.setTextureID(Game.getLoadedMaterial(materialID).diffuseTexture.name);
                }
            }
            else if (Game.hasAvailableTexture(materialID)) {
                if (!Game.hasLoadedTexture(materialID)) {
                    Game.loadTexture(materialID);
                }
                characterEntity.setTextureID(materialID);
                Game.loadMaterial(materialID, materialID);
                characterEntity.setMaterialID(materialID);
            }
            else {
                let textureID = "";
                switch (characterEntity.getSpecies()) {
                    case SpeciesEnum.FOX: {
                        textureID = "foxRed";
                        break;
                    }
                    case SpeciesEnum.SKELETON:
                    default : {
                        textureID = "bone01";
                        break;
                    }
                }
                if (!Game.hasLoadedTexture(textureID)) {
                    Game.loadTexture(textureID);
                }
                characterEntity.setMaterialID(textureID);
                Game.loadMaterial(textureID, textureID);
                characterEntity.setTextureID(textureID);
            }
        }
        else {
            characterEntity = Game.getCharacterEntity(id);
        }
        if (!(Game.hasLoadedMesh(characterEntity.getMeshID()))) {
            Game.loadMesh(characterEntity.getMeshID());
            Game.addCharacterToCreate(characterEntity.getID(), characterEntity.getName(), characterEntity.getDescription(), characterEntity.getIcon(), characterEntity.getAge(), characterEntity.getSex(), characterEntity.getSpecies(), characterEntity.getMeshID(), characterEntity.getTextureID(), options, position, rotation, scaling);
            return true;
        }
        let loadedMesh = Game.createCharacterMesh(characterEntity.getID(), characterEntity.getMeshID(), characterEntity.getMaterialID(), options, position, rotation, scaling);
        let characterController = new CharacterController(characterEntity.getID(), loadedMesh, characterEntity);
        switch (characterEntity.getSpecies()) {
            case SpeciesEnum.SKELETON: {
                characterController.setDeathAnim("91_death99");
            }
        }
        let newScaling = characterEntity.height/characterEntity._baseHeight;
        loadedMesh.scaling.set(newScaling,newScaling,newScaling);
        return characterEntity;
    }
    /**
     * Removes a CharacterEntity, its CharacterController, and its BABYLON.InstancedMesh
     * @param {(CharacterController|string)} characterController A CharacterController, or its string ID
     * @returns {number} Integer status code
     */
    static removeCharacter(characterController) {
        if (!(characterController instanceof CharacterController)) {
            if (!Game.hasCharacterController(characterController)) {
                return 2;
            }
            characterController = Game.getCharacterController(characterController);
        }
        if (characterController == Game.player.getController()) {
            return 1;
        }
        let mesh = characterController.getMesh();
        characterController.entity.dispose();
        characterController.dipose();
        if (mesh instanceof BABYLON.InstancedMesh) {
            Game.removeMesh(mesh);
        }
        return 0;
    }
    /**
     * Creates a DoorController, DoorEntity, and BABYLON.InstancedMesh
     * @param  {String} [id] Unique ID, auto-generated if none given
     * @param  {String} name Name
     * @param  {Object} [to] Future movement between cells
     * @param  {String} meshID Mesh ID
     * @param  {String} textureID Texture ID
     * @param  {Object} [options] Physics options, if they're enabled
     * @param  {BABYLON.Vector3} position Position
     * @param  {BABYLON.Vector3} [rotation] Rotation
     * @param  {BABYLON.Vector3} [scaling] Scaling
     * @return {(EntityController|number)} A DoorController or an integer status code
     */
    static createDoor(id, name = "Door", to = undefined, meshID = "door", textureID = "plainDoor", options = {locked:false, key:null, opensInward:false, open:false}, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One()) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        if (!Game.hasMesh(meshID)) {
            return false;
        }
        if (!(position instanceof BABYLON.Vector3)) {
            position = Tools.filterVector(position);
        }
        if (!(rotation instanceof BABYLON.Vector3)) {
            if (typeof rotation == "number") {
                rotation = new BABYLON.Vector3(0, rotation, 0);
            }
            else {
                rotation = Tools.filterVector(rotation);
            }
        }
        if (!(scaling instanceof BABYLON.Vector3)) {
            if (typeof scaling == "number") {
                scaling = new BABYLON.Vector3(scaling, scaling, scaling);
            }
            else {
                scaling = Tools.filterVector(scaling);
            }
        }
        if (scaling.equals(BABYLON.Vector3.Zero())) {
            scaling = BABYLON.Vector3.One();
        }
        if (!(Game.hasLoadedMesh(meshID))) {
            Game.loadMesh(meshID);
            Game.addDoorsToCreate(id, name, to, meshID, textureID, options, position, rotation, scaling);
            return true;
        }
        let locked = false;
        let key = null;
        let opensInward = false;
        let open = false;
        if (options instanceof Object) {
            if (options.hasOwnProperty("locked") && options["locked"] == true) {
                locked = true;
            }
            if (options.hasOwnProperty("key")) {
                key = options["key"];
            }
            if (options.hasOwnProperty("opensInward") && options["opensInward"] == true) {
                opensInward = true;
            }
            if (options.hasOwnProperty("open") && options["open"] == true) {
                open = true;
            }
        }
        let doorEntity = new DoorEntity(id, name, undefined, undefined, locked, key, opensInward, open);
        let radius = Game.getMesh(meshID).getBoundingInfo().boundingBox.extendSize.x * scaling.x;
        let xPosition = radius * (Math.cos(rotation.y * Math.PI / 180) | 0);
        let yPosition = radius * (Math.sin(rotation.y * Math.PI / 180) | 0);
        let loadedMesh = Game.createMesh(id, meshID, textureID, position.add(new BABYLON.Vector3(xPosition, 0, -yPosition)), rotation, scaling, true);
        let doorController = new DoorController(id, loadedMesh, doorEntity);
        return doorController;
    }
    /**
     * Removes a DoorEntity, its DoorController, and its BABYLON.InstancedMesh
     * @param {(DoorController|string)} doorController A DoorController, or its string ID
     * @returns {number} Integer status code
     */
    static removeDoor(doorController) {
        if (!(doorController instanceof DoorController)) {
            if (!Game.hasDoorController(doorController)) {
                return 2;
            }
            doorController = Game.getEntityController(doorController);
        }
        let mesh = doorController.getMesh();
        doorController.entity.dispose();
        doorController.dispose();
        if (mesh instanceof BABYLON.InstancedMesh) {
            Game.removeMesh(mesh);
        }
        return 0;
    }
    /**
     * Creates a FurnitureEntity
     * @param {string} [id] Unique ID
     * @param {string} name Name
     * @param {string} [description] Description
     * @param {string} [iconID] Icon ID
     * @param {string} meshID Mesh ID
     * @param {string} textureID Texture ID
     * @param {FurnitureEnum} furnitureType FurnitureEnum
     * @param {number} weight Weight in kilograms
     * @param {number} price Price, non-decimal
     */
    static createFurnitureEntity(id, name = "", description = "", iconID = "", meshID = "missingMesh", textureID = "missingMaterial", furnitureType = FurnitureEnum.NONE, weight = 1, price = 1) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        let furnitureEntity = new FurnitureEntity(id, name, description, iconID, furnitureType);
        if (furnitureEntity instanceof FurnitureEntity) {
            furnitureEntity.setMeshID(meshID);
            furnitureEntity.setTextureID(textureID);
            furnitureEntity.setPrice(price);
            furnitureEntity.setWeight(weight);
            return furnitureEntity;
        }
        return 2;
    }
    /**
     * Creates a FurnitureController, FurnitureEntity, and BABYLON.InstancedMesh
     * @param  {String} [id] Unique ID, auto-generated if none given
     * @param  {FurnitureEntity} furnitureEntity Furniture entity
     * @param  {BABYLON.Vector3} position Position
     * @param  {BABYLON.Vector3} [rotation] Rotation
     * @param  {BABYLON.Vector3} [scaling] Scaling       
     * @return {(FurnitureController|number)} A FurnitureController or an integer status code
     */
    static createFurnitureInstance(id, furnitureEntity, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One()) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        if (furnitureEntity instanceof FurnitureEntity) {
            furnitureEntity = furnitureEntity.createInstance(id);
        }
        else if (furnitureEntity instanceof InstancedFurnitureEntity) {
            furnitureEntity = furnitureEntity.clone(id);
        }
        else if (typeof furnitureEntity == "string" && Game.hasFurnitureEntity(furnitureEntity)) {
            furnitureEntity = Game.getFurnitureEntity(furnitureEntity).createInstance(id);
        }
        else if (typeof furnitureEntity == "string" && Game.hasInstancedFurnitureEntity(furnitureEntity)) {
            furnitureEntity = Game.getInstancedFurnitureEntity(furnitureEntity).clone(id);
        }
        else {
            return 2;
        }
        if (!(position instanceof BABYLON.Vector3)) {
            position = Tools.filterVector(position);
        }
        if (!(rotation instanceof BABYLON.Vector3)) {
            if (typeof rotation == "number") {
                rotation = new BABYLON.Vector3(0, rotation, 0);
            }
            else {
                rotation = Tools.filterVector(rotation);
            }
        }
        if (!(scaling instanceof BABYLON.Vector3)) {
            if (typeof scaling == "number") {
                scaling = new BABYLON.Vector3(scaling, scaling, scaling);
            }
            else {
                scaling = Tools.filterVector(scaling);
            }
        }
        if (scaling.equals(BABYLON.Vector3.Zero())) {
            scaling = BABYLON.Vector3.One();
        }
        if (!(Game.hasLoadedMesh(furnitureEntity.getMeshID()))) {
            Game.loadMesh(furnitureEntity.getMeshID());
            Game.addFurnitureToCreate(id, furnitureEntity, position, rotation, scaling);
            return 0;
        }
        let loadedMesh = Game.createMesh(id, furnitureEntity.getMeshID(), furnitureEntity.getTextureID(), position, rotation, scaling, true);
        loadedMesh.checkCollisions = true;
        let furnitureController = new FurnitureController(id, loadedMesh, furnitureEntity);
        if (furnitureEntity.hasAvailableAction(ActionEnum.OPEN)) {
            if (furnitureEntity.hasAvailableAction(ActionEnum.CLOSE)) {
                furnitureEntity.addHiddenAvailableAction(ActionEnum.CLOSE);
            }
        }
        return furnitureController;
    }
    /**
     * Removes a FurnitureEntity, its FurnitureController, and its BABYLON.InstancedMesh
     * @param {(FurnitureController|string)} furnitureController A FurnitureController, or its string ID
     * @returns {number} Integer status code
     */
    static removeFurniture(furnitureController) {
        if (!(furnitureController instanceof FurnitureController)) {
            if (!Game.hasFurnitureController(furnitureController)) {
                return 2;
            }
            furnitureController = Game.getFurnitureController(furnitureController);
        }
        let mesh = furnitureController.getMesh();
        furnitureController.entity.dispose();
        furnitureController.dispose();
        if (mesh instanceof BABYLON.InstancedMesh) {
            Game.removeMesh(mesh);
        }
        return 0;
    }
    /**
     * Creates a LightingEntity, LightingEntity, and BABYLON.InstancedMesh
     * @param {string} [id] Unique ID, auto-generated if none given
     * @param {string} name Name
     * @param {string} mesh Mesh ID
     * @param {string} texture Texture ID
     * @param {number} [lightingType] IDK yet :v; TODO: this
     * @param {object} [options] Options
     * @param {BABYLON.Vector3} position Position
     * @param {BABYLON.Vector3} [rotation] Rotation
     * @param {BABYLON.Vector3} [scaling] Scaling
     * @param {BABYLON.Vector3} [lightingPositionOffset] Position offset of the actual light
     * @param {boolean} createCollisionMesh Create a simple collision mesh
     * @returns {(LightingController|number)} A LightingController or an integer status code
     */
    static createLighting(id, name = "", mesh, texture, lightingType, options = {}, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), lightingPositionOffset = BABYLON.Vector3.Zero(), createCollisionMesh = true) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        if (!Game.hasMesh(mesh)) {
            return 2;
        }
        if (!(position instanceof BABYLON.Vector3)) {
            position = Tools.filterVector(position);
        }
        if (!(rotation instanceof BABYLON.Vector3)) {
            if (typeof rotation == "number") {
                rotation = new BABYLON.Vector3(0, rotation, 0);
            }
            else {
                rotation = Tools.filterVector(rotation);
            }
        }
        if (!(scaling instanceof BABYLON.Vector3)) {
            if (typeof scaling == "number") {
                scaling = new BABYLON.Vector3(scaling, scaling, scaling);
            }
            else {
                scaling = Tools.filterVector(scaling);
            }
        }
        if (scaling.equals(BABYLON.Vector3.Zero())) {
            scaling = BABYLON.Vector3.One();
        }
        if (!(lightingPositionOffset instanceof BABYLON.Vector3)) {
            lightingPositionOffset = Tools.filterVector(scaling);
        }
        if (!(Game.hasLoadedMesh(mesh))) {
            Game.loadMesh(mesh);
            Game.addLightingToCreate(id, name, mesh, texture, lightingType, options, position, rotation, scaling, lightingPositionOffset, createCollisionMesh);
            return 0;
        }
        let loadedMesh = Game.createMesh(id, mesh, texture, position, rotation, scaling, true)
        let lightingEntity = new LightingEntity(id, name, undefined, undefined, lightingType);
        let lightingController = new LightingController(id, loadedMesh, lightingEntity, lightingType, lightingPositionOffset);
        lightingEntity.off(); // set because lighting is bad
        return lightingController;
    }
    /**
     * Removes a LightingEntity, its LightingController, and its BABYLON.InstancedMesh
     * @param {(LightingController|string)} lightingController A LightingController, or its string ID
     * @returns {number} Integer status code
     */
    static removeLighting(lightingController) {
        if (!(lightingController instanceof LightingController)) {
            if (!(Game.hasLightingController(lightingController))) {
                return 2;
            }
            lightingController = Game.getLightingController(lightingController);
        }
        let mesh = lightingController.getMesh();
        lightingController.entity.dispose();
        lightingController.dispose();
        if (mesh instanceof BABYLON.InstancedMesh) {
            Game.removeMesh(mesh);
        }
        return 0;
    }
    /**
     * Creates an ItemEntity
     * @param {string} [id] Unique ID, auto-generated if none given
     * @param {string} name Name
     * @param {string} [description] Description
     * @param {string} [iconID] Icon ID
     * @param {string} meshID Mesh ID
     * @param {string} textureID Texture ID
     * @param {ItemEnum} itemType ItemEnum
     * @param {number} [subType] Dependant on itemType
     * @param {number} [weight] Weight in kilograms
     * @param {number} [price] Price, non-decimal
     * @returns {(ItemEntity|number)} An ItemEntity or an integer status code
     */
    static createItemEntity(id, name = "", description = "", iconID = "", meshID = "missingMesh", textureID = "missingMaterial", itemType = ItemEnum.GENERAL, subType = 0, weight = 1, price = 0) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        let itemEntity = null;
        switch (itemType) {
            case ItemEnum.GENERAL : {
                itemEntity = new ItemEntity(id, name, description, iconID);
                break;
            }
            case ItemEnum.APPAREL: {
                itemEntity = new ClothingEntity(id, name, description, iconID, subType);
                break;
            }
            case ItemEnum.WEAPON : {
                itemEntity = new WeaponEntity(id, name, description, iconID, subType);
                break;
            }
            case ItemEnum.KEY : {
                itemEntity = new KeyEntity(id, name, description, iconID);
                break;
            }
            case ItemEnum.BOOK : {
                //itemEntity = new BookEntity(id, name, description, iconID); // TODO: this :v
            }
            case ItemEnum.CONSUMABLE : {
                //itemEntity = new ConsumableEntity(id, name, description, iconID, subType); // TODO: this :v
            }
            default: {
                itemEntity = new ItemEntity(id, name, description, iconID);
            }
        }
        if (itemEntity instanceof ItemEntity) {
            itemEntity.setMeshID(meshID);
            itemEntity.setTextureID(textureID);
            return itemEntity;
        }
        return 2;
    }
    /**
     * Places, or creates from an ItemEntity, an InstancedItemEntity in the world at the given position.
     * @param {string} [id] Unique ID, auto-generated if none given
     * @param {(AbstractEntity|string)} abstractEntity Abstract entity; preferably an InstancedItemEntity
     * @param {Object} [options] Options
     * @param {BABYLON.Vector3} position Position
     * @param {BABYLON.Vector3} [rotation] Rotation
     * @param {BABYLON.Vector3} [scaling] Scaling
     * @returns {(ItemController|number)} An EntityController or an integer status code
     */
    static createItemInstance(id, abstractEntity, options = {}, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One()) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        if (abstractEntity instanceof InstancedItemEntity) {}
        else if (abstractEntity instanceof ItemEntity) {
            abstractEntity = abstractEntity.createInstance(id);
        }
        else if (typeof abstractEntity == "string" ) {
            if (Game.hasItemEntity(abstractEntity)) {
                abstractEntity = Game.getItemEntity(abstractEntity).createInstance(id);
            }
            else if (Game.hasInstancedItemEntity(abstractEntity)) {
                abstractEntity = Game.getInstancedItemEntity(abstractEntity);
            }
            else {
                if (Game.debugMode) console.log(`\tThe abstract entity (${abstractEntity}) couldn't be found.`);
                return 2;
            }
        }
        else {
            if (Game.debugMode) console.log(`\tThe abstract entity was neither a valid string, InstancedItemEntity, or an ItemEntity.`);
            return 2;
        }
        if (!(position instanceof BABYLON.Vector3)) {
            position = Tools.filterVector(position);
        }
        if (!(rotation instanceof BABYLON.Vector3)) {
            if (typeof rotation == "number") {
                rotation = new BABYLON.Vector3(0, rotation, 0);
            }
            else {
                rotation = Tools.filterVector(rotation);
            }
        }
        if (!(scaling instanceof BABYLON.Vector3)) {
            if (typeof scaling == "number") {
                scaling = new BABYLON.Vector3(scaling, scaling, scaling);
            }
            else {
                scaling = Tools.filterVector(scaling);
            }
        }
        if (scaling.equals(BABYLON.Vector3.Zero())) {
            scaling = BABYLON.Vector3.One();
        }
        if (!(Game.hasLoadedMesh(abstractEntity.getMeshID()))) {
            Game.loadMesh(abstractEntity.getMeshID());
            Game.loadTexture(abstractEntity.getTextureID());
            Game.addItemToCreate(id, abstractEntity, options, position, rotation, scaling);
            if (Game.debugMode) console.log(`\tThe item's mesh needs to be loaded. Inserting it into the qeueu.`);
            return 1;
        }
        let mesh = Game.createItemMesh(id, abstractEntity.getMeshID(), abstractEntity.getTextureID(), options, position, rotation, scaling);
        let itemController = new ItemController(id, mesh, abstractEntity);
        return itemController;
    }
    /**
     * Removes an InstancedItemEntity, its ItemController, and its BABYLON.InstancedMesh
     * @param {(ItemController|string)} itemController An ItemController, or its string ID
     * @returns {number} Integer status code
     */
    static removeItemInstance(itemController) {
        if (!(itemController instanceof ItemController)) {
            if (!Game.hasItemController(itemController)) {
                return 2;
            }
            itemController = Game.getItemController(itemController);
        }
        let mesh = itemController.getMesh();
        itemController.entity.dispose();
        itemController.dispose();
        if (mesh instanceof BABYLON.InstancedMesh) {
            Game.removeMesh(mesh);
        }
        return 0;
    }
    /**
     * Removes an InstancedItemEntity's ItemController, and its BABYLON.InstancedMesh
     * @param {(ItemController|string)} instancedItemEntity An ItemController, or its string ID
     * @returns {number} Integer status code
     */
    static removeItemInSpace(instancedItemEntity) {
        if (!(instancedItemEntity instanceof InstancedItemEntity)) {
            if (!Game.hasInstancedItem(instancedItemEntity)) {
                return 2;
            }
            instancedItemEntity = Game.getInstancedItemEntity(instancedItemEntity);
        }
        if (instancedItemEntity.hasController() && instancedItemEntity.getController().hasMesh()) {
            Game.removeMesh(instancedItemEntity.getController().getMesh());
            instancedItemEntity.getController().dispose();
        }
        return 0;
    }
    /**
     * Creates a Cosmetic
     * @param {string} [id] Unique ID, auto-generated if none given
     * @param {string} name Name
     * @param {string} [description] Description
     * @param {string} [iconID] Icon ID
     * @param {string} meshID Mesh ID
     * @param {string} textureID Texture ID
     * @param {ApparelSlotEnum} equipmentSlot ApparelSlotEnum
     * @returns {(Cosmetic|number)} A Cosmetic or an integer status code
     */
    static createCosmetic(id, name = "", description = "", iconID = "", meshID = "missingMesh", textureID = "missingMaterial", equipmentSlot = ApparelSlotEnum.HEAD) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        let cosmetic = new Cosmetic(id, name, description, iconID, meshID, textureID, equipmentSlot);
        if (cosmetic instanceof Cosmetic) {
            return cosmetic;
        }
        return 2;
    }
    /**
     * Tries to return a Cosmetic based on its ID
     * @param {string} id Unique ID
     * @returns {(Cosmetic|number)} A Cosmetic or an integer status code
     */
    static getCosmetic(id) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            return 2;
        }
        else if (id instanceof Cosmetic) {
            return id;
        }
        else if (typeof id == "string" && Game.cosmetics.has(id)) {
            return Game.cosmetics.get(id);
        }
        return 1;
    }
    /**
     * Whether or not a Cosmetic exists
     * @param {string} id Cosmetic ID
     * @returns {boolean}
     */
    static hasCosmetic(id) {
        if (typeof id != "string") {
            return false;
        }
        return Game.cosmetics.has(id);
    }
    static enableHighlighting() {
        Game.highlightEnabled = true;
        Game.initHighlighting();
        return 0;
    }
    static disableHighlighting() {
        Game.highlightEnabled = false;
        return 0;
    }
    static initHighlighting() {
        Game.highlightLayer = new BABYLON.HighlightLayer("hl1", Game.scene);
        Game.highlightLayer.outerGlow = true;
        Game.highlightLayer.innerGlow = false;
        return 0;
    }
    static highlightMesh(mesh) {
        if (!(mesh instanceof BABYLON.Mesh)) {
            return 2;
        }
        if (!Game.highlightEnabled || Game.highlightedMesh == mesh) {
            return 0;
        }
        if (Game.highlightedMesh != undefined) {
            Game.highlightLayer.removeMesh(Game.highlightedMesh);
        }
        let color = BABYLON.Color3.Gray();
        let controller = Game.getMeshToEntityController(mesh.id);
        if (controller instanceof CharacterController) {
            color = BABYLON.Color3.White();
        }
        else if (controller instanceof ItemController) {
            if (controller.getEntity().getOwner() != Game.player) {
                color = BABYLON.Color3.Red();
            }
            else {
                color = BABYLON.Color3.White();
            }
        }
        Game.highlightLayer.addMesh(mesh, color);
        Game.highlightedMesh = mesh;
        return 0;
    }
    static clearHightlightMesh() {
        if (!(Game.highlightedMesh instanceof BABYLON.Mesh)) {
            return 0;
        }
        Game.highlightLayer.removeMesh(Game.highlightedMesh);
        Game.highlightedMesh = null;
        return 0;
    }
    static setPlayerTarget(entityController) {
        if (!(Game.player.getController() instanceof EntityController)) {
            return 1;
        }
        if (!(entityController instanceof EntityController) || !entityController.isEnabled()) {
            return 1;
        }
        Game.highlightMesh(entityController.mesh);
        Game.player.getController().setTarget(entityController);
        Game.player.setTarget(entityController.getEntity());
        Game.gui.setTargetPortrait(entityController.getEntity());
        Game.gui.showTargetPortrait();
        Game.gui.setActionTooltip(ActionEnum.properties[entityController.getEntity().getDefaultAction()].name);
        Game.gui.showActionTooltip();
        return 0;
    }
    static clearPlayerTarget() {
        if (!(Game.player.getController() instanceof CharacterController)) {
            return 1;
        }
        if (!Game.player.getController().hasTarget()) {
            return 0;
        }
        Game.clearHightlightMesh();
        Game.player.getController().clearTarget();
        Game.player.clearTarget();
        Game.gui.hideTargetPortrait();
        Game.gui.hideActionTooltip();
        return 0;
    }
    static castRayTarget() {
        if (!Game.player.hasController() || !Game.player.getController().hasMesh() || !Game.player.getController().hasSkeleton()) {
            return 1;
        }
        let ray = Game.camera.getForwardRay(2 * Game.player.getController().getMesh().scaling.y, Game.camera.getWorldMatrix(), Game.player.getController().focus.getAbsolutePosition())
        if (Game.player.getController().targetRay == undefined) {
            Game.player.getController().targetRay = ray;
        }
        else {
            Game.player.getController().targetRay.origin = ray.origin;
            Game.player.getController().targetRay.direction = ray.direction;
        }
        if (Game.debugMode) {
            if (Game.player.getController().targetRayHelper != undefined) {
                Game.player.getController().targetRayHelper.dispose();
            }
            Game.player.getController().targetRayHelper = new BABYLON.RayHelper(Game.player.getController().targetRay);
            Game.player.getController().targetRayHelper.show(Game.scene);
        }
        let hit = Game.scene.pickWithRay(Game.player.getController().targetRay);
        if (hit.hit) {
            let entityController = Game.getMeshToEntityController(hit.pickedMesh.id);
            if (entityController instanceof EntityController) {
                if (entityController != Game.player.getController().getTarget()) {
                    Game.setPlayerTarget(entityController);
                }
            }
            else {
                Game.clearPlayerTarget();
            }
        }
        else {
            Game.clearPlayerTarget();
        }
        return 0;
    }
    static initCastRayInterval() {
        clearInterval(Game.castRayTargetIntervalFunction);
        Game.castRayTargetIntervalFunction = setInterval(Game.castRayTarget, Game.castRayTargetInterval);
        return 0;
    }
    static setCastRayInterval(interval = 250) {
        if (interval > 0) {
            Game.castRayTargetInterval = interval;
        }
        Game.initCastRayInterval();
        return 0;
    }
    static initPlayerPortraitStatsUpdateInterval() {
        clearInterval(Game.playerPortraitStatsUpdateIntervalFunction);
        Game.playerPortraitStatsUpdateIntervalFunction = setInterval(Game.gui.updatePlayerPortraitStats, Game.playerPortraitStatsUpdateInterval);
        return 0;
    }
    static setPlayerPortraitStatsUpdateInterval(interval = 100) {
        if (interval > 0) {
            Game.playerPortraitStatsUpdateInterval = interval;
        }
        Game.initPlayerPortraitStatsUpdateInterval();
        return 0;
    }
    static pointerLock(event) {
        if (Game.engine.isPointerLock) {
            return 0;
        }
        Game.canvas.requestPointerLock();
        Game.engine.isPointerLock = true;
        Game.pointerLockFunction = setTimeout(function() {document.addEventListener("pointerlockchange", Game.pointerRelease);}, 121);
        return 0;
    }
    static pointerRelease(event) {
        clearTimeout(Game.pointerLockFunction);
        document.removeEventListener("pointerlockchange", Game.pointerRelease);
        document.exitPointerLock();
        Game.engine.isPointerLock = false;
        return 0;
    }
    static chatParse(chatString) {
        if (chatString.slice(0, 1) == "/") {
            return Game.chatCommands(chatString.slice(1));
        }
        else {
            return Game.gui.chatOutputAppend(`${new Date().toLocaleTimeString({ hour12: false })} ${Game.player.name}: ${chatString}`);
        }
    }
    static chatCommands(command, ...parameters) {
        if (command == undefined || typeof command != "string") {
            return 2;
        }
        if (command.slice(0, 1) == "/") {
            command = command.slice(1);
        }
        command = String(command).toLowerCase();
        let commandArray = command.split(" ");
        if (commandArray.length == 0) {
            commandArray.push("help");
        }
        switch (commandArray[0]) {
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
            case "addallitems" : {
                for (let i in Game.itemEntities) {
                    Game.player.addItem(i);
                }
                break;
            }
            case "addallweapons" : {
                for (let i in Game.weaponEntities) {
                    Game.player.addItem(i);
                }
                break;
            }
            case "addallarmour" :
            case "addallarmor" :
            case "addallclothing" : {
                for (let i in Game.clothingEntities) {
                    Game.player.addItem(i);
                }
                break;
            }
            case "addmoney" : {
                let money = Tools.filterInt(commandArray[1]) || 1;
                Game.player.addMoney(money);
                Game.gui.chatOutputAppend(`Added \$${money} to your wallet.`);
                break;
            }
            case "setmoney" : {
                let money = Tools.filterInt(commandArray[1]) || 1;
                Game.player.setMoney(money);
                Game.gui.chatOutputAppend(`Set your wallet to \$${money}.`);
                break;
            }
            case "getmoney" : {
                Game.gui.chatOutputAppend(`You have \$${Game.player.getMoney()} in your wallet.`);
                break;
            }
            case "kill" : {
                if (typeof commandArray[1] == "string" && Game.hasCharacterEntity(commandArray[1])) {
                    Game.player = Game.getCharacterEntity(commandArray[1]);
                }
                Game.player.setHealth(0);
                break;
            }
            case ":v" :
            case "v:" :
            case ":V" :
            case "V:" : {
                Game.gui.chatOutputAppend("\n    :V\n");
                break;
            }
            default : {
                Game.gui.chatOutputAppend(`Command "${command}" not found.\n`);
                return 0;
            }
        }
        return 0;
    }
    static updateCameraTarget() {
        if (!(Game.camera instanceof BABYLON.ArcRotateCamera)) {
            return 2;
        }
        if (!Game.player.hasController() || !Game.player.getController().hasMesh() || !Game.player.getController().hasSkeleton()) {
            return 1;
        }
        if (Game.enableFirstPerson && Game.camera.radius <= 0.5) {
            if (Game.player.getController().getMesh().isVisible) {
                Game.player.getController().hideMesh();
                Game.camera.checkCollisions = false;
                Game.camera.inertia = 0.75;
                Game.gui.showCrosshair();
            }
        }
        else if (!Game.player.getController().getMesh().isVisible) {
            Game.player.getController().showMesh();
            Game.camera.checkCollisions = true;
            Game.camera.inertia = 0.9;
            Game.gui.hideCrosshair();
        }
        return 0;
    }
    static doEntityAction(abstractEntity, subAbstractEntity = Game.player, actionID) {
        if (!(abstractEntity instanceof AbstractEntity)) {
            abstractEntity = Game.getInstancedItemEntity(abstractEntity) || Game.getEntity(abstractEntity);
            if (!(abstractEntity instanceof AbstractEntity)) {
                return 2;
            }
        }
        if (!(subAbstractEntity instanceof AbstractEntity)) {
            subAbstractEntity = Game.getInstancedItemEntity(subAbstractEntity) || Game.getEntity(subAbstractEntity);
            if (!(subAbstractEntity instanceof AbstractEntity)) {
                return 2;
            }
        }
        if (isNaN(actionID)) {
            actionID = Number.parseInt(actionID);
        }
        if (Game.debugMode) console.log(`Running Game::doEntityAction(${abstractEntity.id}, ${subAbstractEntity.id}, ${actionID})`);
        switch (actionID) {
            case ActionEnum.USE: {
                if (abstractEntity instanceof LightingEntity) {
                    abstractEntity.toggle();
                }
                break;
            }
            case ActionEnum.LAY: {
                Game.actionLay(abstractEntity, subAbstractEntity);
                break;
            }
            case ActionEnum.SIT: {
                Game.actionSit(abstractEntity, subAbstractEntity);
                break;
            }
            case ActionEnum.TAKE: {
                if (abstractEntity instanceof InstancedItemEntity) {
                    Game.actionTake(abstractEntity, subAbstractEntity);
                }
                break;
            }
            case ActionEnum.OPEN: {
                if (abstractEntity instanceof DoorEntity || abstractEntity instanceof FurnitureEntity || abstractEntity instanceof InstancedFurnitureEntity) {
                    Game.actionOpen(abstractEntity, subAbstractEntity);
                }
                break;
            }
            case ActionEnum.CLOSE: {
                if (abstractEntity instanceof DoorEntity || abstractEntity instanceof FurnitureEntity || abstractEntity instanceof InstancedFurnitureEntity) {
                    Game.actionClose(abstractEntity, subAbstractEntity);
                }
                break;
            }
            case ActionEnum.TALK: {
                if (abstractEntity instanceof CharacterEntity) {
                    Game.actionTalk(abstractEntity, subAbstractEntity);
                }
                break;
            }
            case ActionEnum.ATTACK: {
                if (abstractEntity instanceof AbstractEntity) {
                    Game.actionAttack(abstractEntity, subAbstractEntity);
                }
                break;
            }
        }
        return 0;
    }
    static actionTake(instancedItemEntity, subEntity = Game.player, callback = undefined) {
        if (!(instancedItemEntity instanceof AbstractEntity)) {
            return 2;
        }
        if (!(subEntity instanceof EntityWithStorage)) {
            return 2;
        }
        if (subEntity.addItem(instancedItemEntity) == 0) {
            Game.removeItemInSpace(instancedItemEntity);
            return 0;
        }
        return 1;
    }
    static actionAttack(entity = Game.player.getTarget(), subEntity = Game.player, damage = 0, callback = undefined) {
        if (!(entity instanceof AbstractEntity)) {
            entity = null;
        }
        if (!(subEntity instanceof CharacterEntity)) {
            return 2;
        }
        if (subEntity.getController().isAttacking()) {
            return 1;
        }
        if (entity instanceof CharacterEntity && subEntity instanceof CharacterEntity) {
            if (damage == 0 && Game.withinRange(subEntity, entity) && Game.inFrontOf(subEntity, entity)) {
                damage = Game.calculateDamage(entity, subEntity);
            }
            if (damage > 0) {
                if (subEntity.getMainWeapon() instanceof InstancedItemEntity) {
                    switch (subEntity.getMainWeapon().getDamageType()) {
                        case DamageEnum.PIERCING: {
                            subEntity.controller.doThrustRH();
                            Game.playSound("slice");
                        }
                        default: {
                            subEntity.controller.doPunchRH();
                            Game.playSound("hit");
                        }
                    }
                }
                else {
                    subEntity.controller.doPunchRH();
                    Game.playSound("hit");
                }
                entity.subtractHealth(damage);
                if (subEntity == Game.player && Game.player.hasTarget()) {
                    Game.gui.setTargetPortrait(Game.player.getTarget());
                }
            }
        }
        return 0;
    }
    static actionDrop(instancedItemEntity, subEntity = Game.player, callback = undefined) {
        if (!(instancedItemEntity instanceof AbstractEntity)) {
            return 2;
        }
        if (!(subEntity instanceof EntityWithStorage)) {
            return 2;
        }
        if (!subEntity.hasItem(instancedItemEntity)) {
            return 1;
        }
        if (subEntity instanceof CharacterController && subEntity.hasEquipment(instancedItemEntity)) {
            if (subEntity.unequip(instancedItemEntity) != 0) {
                if (typeof callback == "function") {
                    callback();
                }
                return 0;
            }
        }
        if (subEntity.removeItem(instancedItemEntity) == 0) {
            if (subEntity == Game.player) {
                Game.gui.inventoryMenu.updateWith(subEntity);
            }
            if (instancedItemEntity.hasController() && instancedItemEntity.getController().hasMesh()) { // it shouldn't have an EntityController :v but just in case
                instancedItemEntity.getController().setParent(null);
                instancedItemEntity.getController().getMesh().position = subEntity.getController().getMesh().position.clone().add(
                    new BABYLON.Vector3(0, Game.getMesh(instancedItemEntity.getMeshID()).getBoundingInfo().boundingBox.extendSize.y, 0)
                );
            }
            else {
                Game.createItemInstance(undefined, instancedItemEntity, undefined, subEntity.getController().getMesh().position.clone(), subEntity.getController().getMesh().rotation.clone());
            }
        }
        if (typeof callback == "function") {
            callback();
        }
        return 0;
    }
    static actionClose(entity = Game.player.getTarget(), subEntity = Game.player, callback = undefined) {
        if (!(entity instanceof AbstractEntity) || !(entity.getController() instanceof EntityController)) {
            return 2;
        }
        if (!(subEntity instanceof CharacterEntity)) {
            return 2;
        }
        if (entity.getController() instanceof FurnitureController) {
            entity.getController().currAnim = entity.getController().closed;
            entity.getController().beginAnimation(entity.getController().close);
            entity.setDefaultAction(ActionEnum.OPEN);
            entity.addHiddenAvailableAction(ActionEnum.CLOSE);
            entity.removeHiddenAvailableAction(ActionEnum.OPEN);
        }
        else if (entity.getController() instanceof DoorController) {
            entity.setClose();
            Game.playSound("openDoor");
        }
        return 0;
    }
    static actionHold(instancedItemEntity, subEntity = Game.player, callback = undefined) {
        if (!(instancedItemEntity instanceof AbstractEntity)) {
            return 2;
        }
        if (!(subEntity instanceof EntityWithStorage)) {
            return 2;
        }
        if (!subEntity.hasItem(instancedItemEntity)) {
            if (typeof callback == "function") {
                callback();
            }
            return 1;
        }
        if (subEntity instanceof CharacterEntity) {
            if (subEntity.hold(instancedItemEntity) != 0) {
                return 1
            }
        }
        if (typeof callback == "function") {
            callback(instancedItemEntity, undefined, subEntity);
        }
        return 0;
    }
    static actionEquip(instancedItemEntity, subEntity = Game.player, callback = undefined) {
        if (!(instancedItemEntity instanceof AbstractEntity)) {
            return 2;
        }
        if (!(subEntity instanceof EntityWithStorage)) {
            return 2;
        }
        if (!subEntity.hasItem(instancedItemEntity)) {
            if (typeof callback == "function") {
                callback();
            }
            return 1;
        }
        if (subEntity instanceof CharacterEntity) {
            if (subEntity.equip(instancedItemEntity) != 0) {
                return 1;
            }
        }
        if (typeof callback == "function") {
            callback(instancedItemEntity, undefined, subEntity);
        }
        return 0;
    }
    static actionUnequip(instancedItemEntity, subEntity = Game.player, callback = undefined) {
        if (!(instancedItemEntity instanceof AbstractEntity)) {
            return 2;
        }
        if (!(subEntity instanceof EntityWithStorage)) {
            return 2;
        }
        if (!subEntity.hasItem(instancedItemEntity)) {
            if (typeof callback == "function") {
                callback();
            }
            return 1;
        }
        if (subEntity instanceof CharacterEntity) {
            if (subEntity.unequip(instancedItemEntity) != 0) {
                return 1;
            }
        }
        if (typeof callback == "function") {
            callback(instancedItemEntity, undefined, subEntity);
        }
        return 0;
    }
    static actionRelease(instancedItemEntity, subEntity = Game.player, callback = undefined) {
        if (!(instancedItemEntity instanceof AbstractEntity)) {
            return 2;
        }
        if (!(subEntity instanceof EntityWithStorage)) {
            return 2;
        }
        if (!subEntity.hasItem(instancedItemEntity)) {
            if (typeof callback == "function") {
                callback();
            }
            return 1;
        }
        if (subEntity instanceof CharacterEntity) {
            if (subEntity.unequip(instancedItemEntity) != 0) {
                return 1;
            }
        }
        if (typeof callback == "function") {
            callback(instancedItemEntity, undefined, subEntity);
        }
        return 0;
    }
    static actionOpen(entity = Game.player.getTarget(), subEntity = Game.player, callback = undefined) {
        if (!(entity instanceof AbstractEntity) || !(entity.getController() instanceof EntityController)) {
            return 2;
        }
        if (!(subEntity instanceof CharacterEntity)) {
            return 2;
        }
        if (entity.getController() instanceof DoorController) {
            if (entity.isDoorLocked()) {
                if (!subEntity.hasItem(entity.getKey())) {
                    return 1;
                }
                entity.setLocked(false);
            }
            entity.setOpen();
            Game.playSound("openDoor");
        }
        else if (entity.getController() instanceof FurnitureController) {
            entity.getController().currAnim = entity.getController().opened;
            entity.getController().beginAnimation(entity.getController().open);
            entity.setDefaultAction(ActionEnum.CLOSE);
            entity.addHiddenAvailableAction(ActionEnum.OPEN);
            entity.removeHiddenAvailableAction(ActionEnum.CLOSE);
        }
        return 0;
    }
    static actionUse(entity = Game.player.getTarget(), subEntity = Game.player, callback = undefined) {
        if (!(entity instanceof AbstractEntity) || !(entity.getController() instanceof EntityController)) {
            return 2;
        }
        if (!(subEntity instanceof CharacterEntity)) {
            return 2;
        }
        if (entity.getController() instanceof LightingController) {
            entity.getController().toggle();
        }
        return 0;
    }
    static actionLay(entity = Game.player.getTarget(), subEntity = Game.player, callback = undefined) {
        if (!(entity instanceof AbstractEntity) || !(entity.getController() instanceof EntityController)) {
            return 2;
        }
        if (!(subEntity instanceof CharacterEntity) || !(subEntity.getController() instanceof CharacterController)) {
            return 2;
        }
        let seatingBoundingBox = Game.getMesh(entity.getController().getMesh().name).getBoundingInfo().boundingBox;
        let seatingWidth = (seatingBoundingBox.extendSize.x * entity.getController().getMesh().scaling.x);
        subEntity.getController().setParent(entity.getController().getMesh());
        subEntity.getController().getMesh().position.set(seatingWidth / 2, 0.4, -0.0125);
        subEntity.getController().getMesh().rotation.copyFrom(entity.getController().getMesh().rotation.add(new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(270), 0)));
        subEntity.setStance(StanceEnum.LAY)
        subEntity.getController().doLay();
        return 0;
    }
    /**
     * Places the subEntity near the Entity, and sets its parent to the Entity
     * TODO: Add actual placement of Characters based on their width
     * @param  {FurnitureEntity} entity    Furniture
     * @param  {EntityController} subEntity    Entity to be placed
     */
    static actionSit(entity = Game.player.getTarget(), subEntity = Game.player, callback = undefined) {
        if (!(entity instanceof AbstractEntity) || !(entity.getController() instanceof FurnitureController)) {
            return 2;
        }
        if (!(subEntity instanceof CharacterEntity) || !(subEntity.getController() instanceof CharacterController)) {
            return 2;
        }
        let seatingBoundingBox = Game.getMesh(entity.getController().getMesh().name).getBoundingInfo().boundingBox;
        let seatingWidth = (seatingBoundingBox.extendSize.x * entity.getController().getMesh().scaling.x);
        subEntity.getController().setParent(entity.getController().getMesh());
        subEntity.getController().getMesh().position.set(seatingWidth / 2, 0.4, -0.0125);
        subEntity.getController().getMesh().rotation.set(0,0,0);
        if (subEntity == Game.player && Game.camera.radius <= 0.5 && Game.enableFirstPerson) {
            Game.camera.alpha = entity.getController().getMesh().rotation.y - BABYLON.Tools.ToRadians(90);
        }
        return 0;
    }
    static actionTalk(abstractEntity = Game.player.getTarget(), subAbstractEntity = Game.player, callback = undefined) {
        if (Game.debugMode) console.log(`Running Game::actionTalk(${abstractEntity.id}, ${subAbstractEntity.id})`);
        if (!(abstractEntity instanceof CharacterEntity)) {
            return 2;
        }
        if (!(subAbstractEntity instanceof CharacterEntity)) {
            return 2;
        }
        if (!(abstractEntity.hasDialogue())) {
            return 2;
        }
        Game.gui.dialogueMenu.setDialogue(abstractEntity.getDialogue(), abstractEntity, subAbstractEntity);
        Game.gui.dialogueMenu.show();
        return 0;
    }
    static setEntityController(id, entityController) {
        Game.entityControllers[id] = entityController;
        return 0;
    }
    static removeEntityController(id) {
        delete Game.entityControllers[id];
    }
    static clearControllers() {
        for (let i in Game.entityControllers) {
            Game.entityControllers[i].dispose();
        }
        Game.entityControllers = {};
        return 0;
    }
    static setCharacterController(id, characterController) {
        Game.characterControllers[id] = characterController;
        return 0;
    }
    static removeCharacterController(id) {
        delete Game.characterControllers[id];
        return 0;
    }
    static clearCharacterControllers() {
        for (let i in Game.characterControllers) {
            Game.characterControllers[i].dispose();
        }
        Game.characterControllers = {};
        return 0;
    }
    static setFurnitureController(id, furnitureController) {
        Game.furnitureControllers[id] = furnitureController;
        return 0;
    }
    static removeFurnitureController(id) {
        delete Game.furnitureControllers[id];
        return 0;
    }
    static clearFurnitureControllers() {
        for (let i in Game.furnitureControllers) {
            Game.furnitureControllers[i].dispose();
        }
        Game.furnitureControllers = {};
        return 0;
    }
    static setLightingController(id, lightController) {
        Game.lightingControllers[id] = lightController;
        return 0;
    }
    static removeLightingController(id) {
        delete Game.lightingControllers[id];
        return 0;
    }
    static clearLightingControllers() {
        for (let i in Game.lightingControllers) {
            Game.lightingControllers[i].dispose();
        }
        Game.lightingControllers = {};
        return 0;
    }
    static setDoorController(id, doorController) {
        Game.doorControllers[id] = doorController;
        return 0;
    }
    static removeDoorController(id) {
        delete Game.doorControllers[id];
        return 0;
    }
    static clearDoorControllers() {
        for (let i in Game.doorControllers) {
            Game.doorControllers[i].dispose();
        }
        Game.doorControllers = {};
        return 0;
    }
    static setItemController(id, itemController) {
        Game.itemControllers[id] = itemController;
        return 0;
    }
    static removeItemController(id) {
        delete Game.itemControllers[id];
        return 0;
    }
    static clearItemControllers() {
        for (let i in Game.itemControllers) {
            Game.itemControllers[i].dispose();
        }
        Game.itemControllers = {};
        return 0;
    }
    static hasMeshToEntityController(meshID) {
        return Game.meshToEntityController.hasOwnProperty(meshID);
    }
    static setMeshToEntityController(meshID, entityController) {
        if (!Game.hasClonedMesh(meshID) && !Game.hasInstancedMesh) {
            return 2;
        }
        if (!(entityController instanceof EntityController)) {
            return 2;
        }
        Game.meshToEntityController[meshID] = entityController;
        return 0;
    }
    static getMeshToEntityController(meshID) {
        if (Game.hasMeshToEntityController(meshID)) {
            return Game.meshToEntityController[meshID];
        }
        return 1;
    }
    static removeMeshToEntityController(meshID) {
        delete Game.meshToEntityController[meshID];
        return 0;
    }
    static clearMeshToEntityControllers() {
        Game.meshToEntityController = {};
        return 0;
    }

    static setAbstractNode(id, abstractNode) {
        Game.abstractNodes[id] = abstractNode;
        return 0;
    }
    static removeAbstractNode(id) {
        delete Game.abstractNodes[id];
        return 0;
    }
    static clearAbstractNodes() {
        for (let i in Game.abstractNodes) {
            Game.abstractNodes[i].dispose();
        }
        Game.abstractNodes = {};
        return 0;
    }

    static setAbstractEntity(id, abstractEntity) {
        Game.abstractEntities[id] = abstractEntity;
        return 0;
    }
    static removeAbstractEntity(id) {
        delete Game.abstractEntities[id];
        return 0;
    }
    static clearAbstractEntities() {
        for (let i in Game.abstractEntities) {
            Game.abstractEntities[i].dispose();
        }
        Game.abstractEntities = {};
        return 0;
    }
    static setEntity(id, entity) {
        Game.entities[id] = entity;
        return 0;
    }
    static removeEntity(id) {
        delete Game.entities[id];
        return 0;
    }
    static clearEntities() {
        for (let i in Game.entities) {
            Game.entities[i].dispose();
        }
        Game.entities = {};
        return 0;
    }
    static setCharacterEntity(id, characterEntity) {
        Game.characterEntities[id] = characterEntity;
        return 0;
    }
    static removeCharacterEntity(id) {
        delete Game.characterEntities[id];
        return 0;
    }
    static clearCharacterEntities() {
        for (let i in Game.characterEntities) {
            Game.characterEntities[i].dispose();
        }
        Game.characterEntities = {};
        return 0;
    }
    static setItemEntity(id, itemEntity) {
        Game.itemEntities[id] = itemEntity;
        return 0;
    }
    static removeItemEntity(id) {
        delete Game.itemEntities[id];
        return 0;
    }
    static clearItemEntities() {
        for (let i in Game.itemEntities) {
            Game.itemEntities[i].dispose();
        }
        Game.itemEntities = {};
        return 0;
    }
    static setClothingEntity(id, clothingEntity) {
        Game.clothingEntities[id] = clothingEntity;
        return 0;
    }
    static removeClothingEntity(id) {
        delete Game.clothingEntities[id];
        return 0;
    }
    static clearClothingEntities() {
        for (let i in Game.clothingEntities) {
            Game.clothingEntities[i].dispose();
        }
        Game.clothingEntities = {};
        return 0;
    }
    static setWeaponEntity(id, weaponEntity) {
        Game.weaponEntities[id] = weaponEntity;
        return 0;
    }
    static removeWeaponEntity(id) {
        delete Game.weaponEntities[id];
        return 0;
    }
    static clearWeaponEntities() {
        for (let i in Game.weaponEntities) {
            Game.weaponEntities[i].dispose();
        }
        Game.weaponEntities = {};
        return 0;
    }
    static setFurnitureEntity(id, furnitureEntity) {
        Game.furnitureEntities[id] = furnitureEntity;
        return 0;
    }
    static removeFurnitureEntity(id) {
        delete Game.furnitureEntities[id];
        return 0;
    }
    static clearFurnitureEntities() {
        for (let i in Game.furnitureEntities) {
            Game.furnitureEntities[i].dispose();
        }
        Game.furnitureEntities = {};
        return 0;
    }
    static setLightingEntity(id, lightEntity) {
        Game.lightingEntities[id] = lightEntity;
        return 0;
    }
    static removeLightingEntity(id) {
        delete Game.lightingEntities[id];
        return 0;
    }
    static clearLightEntities() {
        for (let i in Game.lightingEntities) {
            Game.lightingEntities[i].dispose();
        }
        Game.lightingEntities = {};
        return 0;
    }
    static setDoorEntity(id, doorEntity) {
        Game.doorEntities[id] = doorEntity;
        return 0;
    }
    static removeDoorEntity(id) {
        delete Game.doorEntities[id];
        return 0;
    }
    static clearDoorEntities() {
        for (let i in Game.doorEntities) {
            Game.doorEntities[i].dispose();
        }
        Game.doorEntities = {};
        return 0;
    }
    static setKeyEntity(id, keyEntity) {
        Game.keyEntities[id] = keyEntity;
        return 0;
    }
    static removeKeyEntity(id) {
        delete Game.keyEntities[id];
        return 0;
    }
    static clearKeyEntities() {
        for (let i in Game.keyEntities) {
            Game.keyEntities[i].dispose();
        }
        Game.keyEntities = {};
        return 0;
    }
    static setSpellEntity(id, spellEntity) {
        Game.spellEntities[id] = spellEntity;
        return 0;
    }
    static removeSpellEntity(id) {
        delete Game.spellEntities[id];
        return 0;
    }
    static clearSpellEntities() {
        for (let i in Game.spellEntities) {
            Game.spellEntities[i].dispose();
        }
        Game.spellEntities = {};
        return 0;
    }
    static hasSpellEntity(id) {
        return Game.spellEntities.hasOwnProperty(id);
    }
    static hasSpell(id) {
        return Game.hasSpellEntity(id);
    }
    static getSpellEntity(id) {
        if (Game.hasSpellEntity(id)) {
            return Game.spellEntities[id];
        }
        return 1;
    }
    static getSpell(id) {
        return Game.getSpellEntity(id);
    }
    static setEssentialEntity(abstractEntity) {
        abstractEntity.setEssential(true);
        Game.essentialEntities.add(abstractEntity)
        return 0;
    }
    static removeEssentialEntity(abstractEntity) {
        abstractEntity.setEssential(false);
        Game.essentialEntities.delete(abstractEntity);
        return 0;
    }
    static clearEssentialEntities() {
        Game.essentialEntities.forEach(function(abstractEntity) {
            abstractEntity.setEssential(false);
        });
        Game.essentialEntities.clear();
        return 0;
    }

    static setEntityInstance(id, instancedEntity) {
        Game.instancedEntities[id] = instancedEntity;
        return 0;
    }
    static removeEntityInstance(id) {
        delete Game.instancedEntities[id];
        return 0;
    }
    static clearEntityInstances() {
        for (let i in Game.instancedEntities) {
            Game.instancedEntities[i].dispose();
        }
        Game.instancedEntities = {};
        return 0;
    }
    static setItemInstance(id, instancedItemEntity) {
        Game.instancedItemEntities[id] = instancedItemEntity;
        return 0;
    }
    static removeItemInstance(id) {
        delete Game.instancedItemEntities[id];
        return 0;
    }
    static clearItemInstances() {
        for (let i in Game.instancedItemEntities) {
            Game.instancedItemEntities[i].dispose();
        }
        Game.instancedItemEntities = {};
        return 0;
    }
    static setClothingInstance(id, instancedClothingEntity) {
        Game.instancedClothingEntities[id] = instancedClothingEntity;
        return 0;
    }
    static removeClothingInstance(id) {
        delete Game.instancedClothingEntities[id];
        return 0;
    }
    static clearClothingInstances() {
        for (let i in Game.instancedClothingEntities) {
            Game.instancedClothingEntities[i].dispose();
        }
        Game.instancedClothingEntities = {};
        return 0;
    }
    static setWeaponInstance(id, instancedWeaponEntity) {
        Game.instancedWeaponEntities[id] = instancedWeaponEntity;
        return 0;
    }
    static removeWeaponInstance(id) {
        delete Game.instancedWeaponEntities[id];
        return 0;
    }
    static clearWeaponInstances() {
        for (let i in Game.instancedWeaponEntities) {
            Game.instancedWeaponEntities[i].dispose();
        }
        Game.instancedWeaponEntities = {};
        return 0;
    }
    static setFurnitureInstance(id, instancedFurnitureEntity) {
        Game.instancedFurnitureEntities[id] = instancedFurnitureEntity;
        return 0;
    }
    static removeFurnitureInstance(instancedFurnitureEntity) {
        delete Game.instancedFurnitureEntities[instancedFurnitureEntity];
        return 0;
    }
    static clearFurnitureInstances() {
        for (let i in Game.instancedFurnitureEntities) {
            Game.instancedFurnitureEntities[i].dispose();
        }
        Game.instancedFurnitureEntities = {};
        return 0;
    }
    /**
     * Tries to set a Dialogue
     * @param {Dialogue} dialogue 
     */
    static setDialogue(dialogue) {
        if (!(dialogue instanceof Dialogue)) {
            return 2;
        }
        Game.dialogues.set(dialogue.id, dialogue);
        return 0;
    }
    /**
     * Tries to remove a Dialogue
     * @param {Dialogue} dialogue 
     */
    static removeDialogue(dialogue) {
        if (typeof dialogue == "string" && Game.dialogues.has(dialogue)) {
            dialogue = Game.dialogues.get(id);
        }
        else if (!(dialogue instanceof Dialogue)) {
            return 2;
        }
        dialogue.dispose();
        Game.dialogues.delete(dialogue.id);
        return 0;
    }
    static clearDialogues() {
        Game.dialogues.forEach(function(value) {
            Game.removeDialogue(value);
        });
        return 0;
    }
    /**
     * Tries to set a Cosmetic
     * @param {Cosmetic} cosmetic 
     */
    static setCosmetic(cosmetic) {
        if (!(cosmetic instanceof Cosmetic)) {
            return 2;
        }
        Game.cosmetics.set(cosmetic.id, cosmetic);
        return 0;
    }
    /**
     * Tries to remove a Cosmetic
     * @param {Cosmetic} cosmetic 
     */
    static removeCosmetic(cosmetic) {
        if (typeof cosmetic == "string" && Game.cosmetics.has(cosmetic)) {
            cosmetic = Game.cosmetics.get(id);
        }
        else if (!(cosmetic instanceof Cosmetic)) {
            return 2;
        }
        cosmetic.dispose();
        Game.cosmetics.delete(cosmetic.id);
        return 0;
    }
    static clearCosmetics() {
        Game.cosmetics.forEach(function(value) {
            Game.removeCosmetic(value);
        });
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
        if (InterfaceModeEnum.properties.hasOwnProperty(interfaceMode)) {}
        else if (isNaN(interfaceMode) && InterfaceModeEnum.hasOwnProperty(interfaceMode)) {
            interfaceMode = InterfaceModeEnum[interfaceMode];
        }
        else {
            return 2;
        }
        if (Game.debugMode) console.log(`Running Game::setInterfaceMode(${InterfaceModeEnum.properties[interfaceMode].name})`);
        Game.interfaceMode = interfaceMode;
        switch (Game.interfaceMode) {
            case InterfaceModeEnum.CHARACTER: {
                Game.onKeyDownFunction = Game.controlCharacterOnKeyDown;
                Game.onKeyUpFunction = Game.controlCharacterOnKeyUp;
                Game.onContextFunction = Game.controlCharacterOnContext;
                break;
            }
            case InterfaceModeEnum.DIALOGUE: {
                Game.onKeyDownFunction = Game.controlDialogueOnKeyDown;
                Game.onKeyUpFunction = Game.controlDialogueOnKeyUp;
                Game.onContextFunction = Game.controlDialogueOnContext;
                break;
            }
            case InterfaceModeEnum.MENU: {
                Game.onKeyDownFunction = Game.controlMenuOnKeyDown;
                Game.onKeyUpFunction = Game.controlMenuOnKeyUp;
                Game.onContextFunction = Game.controlMenuOnContext;
                break;
            }
            case InterfaceModeEnum.EDIT: {
                break;
            }
        }
        return 0;
    }
    static getInterfaceMode() {
        return Game.interfaceMode;
    }
    static calculateAbilityModifier(score) {
        return Math.floor((score - 10) / 2);
    }
    static calculateLevel(experiencePoints) {
        experiencePoints = Tools.filterInt(experiencePoints);
        if (experiencePoints >= 355000) {
            return 20;
        }
        else if (experiencePoints >= 305000) {
            return 19;
        }
        else if (experiencePoints >= 265000) {
            return 18;
        }
        else if (experiencePoints >= 225000) {
            return 17;
        }
        else if (experiencePoints >= 195000) {
            return 16;
        }
        else if (experiencePoints >= 165000) {
            return 15;
        }
        else if (experiencePoints >= 140000) {
            return 14;
        }
        else if (experiencePoints >= 120000) {
            return 13;
        }
        else if (experiencePoints >= 100000) {
            return 12;
        }
        else if (experiencePoints >= 85000) {
            return 11;
        }
        else if (experiencePoints >= 64000) {
            return 10;
        }
        else if (experiencePoints >= 48000) {
            return 9;
        }
        else if (experiencePoints >= 34000) {
            return 8;
        }
        else if (experiencePoints >= 23000) {
            return 7;
        }
        else if (experiencePoints >= 14000) {
            return 6;
        }
        else if (experiencePoints >= 6500) {
            return 5;
        }
        else if (experiencePoints >= 2700) {
            return 4;
        }
        else if (experiencePoints >= 900) {
            return 3;
        }
        else if (experiencePoints >= 300) {
            return 2;
        }
        else if (experiencePoints >= 0) {
            return 1;
        }
        return 0;
    }
    static calculateDamage(defender, attacker) { // TODO: Rewrite to include whether or not the left or right handed weapon is used
        let attackRoll = Game.roll(1, 20);
        let didHit = attackRoll > defender.getArmourClass();
        if (didHit) {
            let damageRollCount = 1;
            let damageRoll = 0;
            let damageType = DamageEnum.BLUDGEONING;
            let unarmed = false;
            if (attacker.isRightHanded() && attacker.getEquipment()["HAND_R"] instanceof InstancedWeaponEntity) {
                damageRollCount = attacker.getEquipment()["HAND_R"].getDamageRollCount();
                damageRoll = attacker.getEquipment()["HAND_R"].getDamageRoll();
                damageType = attacker.getEquipment()["HAND_R"].getDamageType();
            }
            else if (attacker.isLeftHanded() && attacker.getEquipment()["HAND_L"] instanceof InstancedWeaponEntity) {
                damageRollCount = attacker.getEquipment()["HAND_L"].getDamageRollCount();
                damageRoll = attacker.getEquipment()["HAND_L"].getDamageRoll();
                damageType = attacker.getEquipment()["HAND_L"].getDamageType();
            }
            else {
                unarmed = true;
            }
            if (unarmed) {
                damageRoll = 1 + Game.calculateAbilityModifier(attacker.getStrength());
                if (damageRoll < 0) {
                    damageRoll = 0;
                }
                return damageRoll;
            }
            else {
                return Game.roll(damageRollCount, damageRoll);
            }
        }
        return 0;
    }
    /**
     * Roll a die
     * @param {number} die Number of times to roll
     * @param {number} faces Number of faces
     * @param {RollEnum} rollType
     */
    static roll(die = 1, faces = 6, rollType = RollEnum.TOTAL) {
        switch (rollType) {
            case RollEnum.TOTAL: {
                let total = 0;
                for (let i = 0; i < die; i++) {
                    total += Math.ceil(Math.random() * faces);
                }
                return Number.parseFloat(total);
            }
            case RollEnum.MIN: {
                let min = 1;
                let roll = 0;
                for (let i = 0; i < die; i++) {
                    roll = Math.ceil(Math.random() * faces);
                    if (roll < min) {
                        min = roll;
                    }
                }
                return Number.parseFloat(min);
            }
            case RollEnum.AVG: {
                let total = 0;
                for (let i = 0; i < die; i++) {
                    total += Math.ceil(Math.random() * faces);
                }
                return Number.parseFloat(total/die);
            }
            case RollEnum.MAX: {
                let max = 1;
                let roll = 0;
                for (let i = 0; i < die; i++) {
                    roll = Math.ceil(Math.random() * faces);
                    if (roll > max) {
                        max = roll;
                    }
                }
                return Number.parseFloat(max);
            }
        }
        return 1.0;
    }
    /**
     * Returns whether or not entityB is within distance of entityA
     * @param {AbstractEntity} entityA The entity, with an EntityController
     * @param {AbstractEntity} entityB Its target, with an EntityController
     * @param {number} distance Distance
     * @returns {boolean} Whether or not they're within smacking distance
     */
    static withinRange(entityA, entityB, distance = 0.6) {
        if (!(entityA instanceof AbstractEntity)) {
            entityA = Game.getInstancedEntity(entityA) || Game.getInstancedEntity(entityA);
            if (!(entityA instanceof AbstractEntity)) {
                return false;
            }
        }
        if (!(entityB instanceof AbstractEntity)) {
            entityB = Game.getInstancedEntity(entityB) || Game.getInstancedEntity(entityB);
            if (!(entityB instanceof AbstractEntity)) {
                return false;
            }
        }
        if (!entityA.hasController() || !entityB.hasController()) {
            return false;
        }
        else if (!entityA.getController().hasMesh() || !entityB.getController().hasMesh()) {
            return false;
        }
        if (distance <= 0) {
            distance = entityA.getHeight();
            if (entityB.getHeight() > distance) {
                distance = entityB.getHeight();
            }
            distance = distance * 0.75; // assuming arm length is half of the body length, idk
        }
        return entityA.controller.mesh.position.equalsWithEpsilon(entityB.controller.mesh.position, distance);
    }
    /**
     * Whether or not entityB is in entityA's point of view (epislon value)
     * @param {AbstractEntity} entityA The entity that's looking, with an EntityController
     * @param {AbstractEntity} entityB Its target, with an EntityController
     * @param {number} epsilon Episode in radians
     * @returns {boolean} Whether or not they're withing the point of view
     */
    static inFrontOf(entityA, entityB, epsilon = 0.3926991) {
        if (!(entityA instanceof AbstractEntity)) {
            entityA = Game.getInstancedEntity(entityA) || Game.getInstancedEntity(entityA);
            if (!(entityA instanceof AbstractEntity)) {
                return false;
            }
        }
        if (!(entityB instanceof AbstractEntity)) {
            entityB = Game.getInstancedEntity(entityB) || Game.getInstancedEntity(entityB);
            if (!(entityB instanceof AbstractEntity)) {
                return false;
            }
        }
        if (!entityA.hasController() || !entityB.hasController()) {
            return false;
        }
        else if (!entityA.getController().hasMesh() || !entityB.getController().hasMesh()) {
            return false;
        }
        let aPos = new BABYLON.Vector2(entityA.controller.mesh.position.x, entityA.controller.mesh.position.z);
        let bPos = entityA.controller.mesh.calcMovePOV(0,0,1);
        bPos = aPos.add(new BABYLON.Vector2(bPos.x, bPos.z));
        let cPos = new BABYLON.Vector2(entityB.controller.mesh.position.x, entityB.controller.mesh.position.z);
        let bAng = BABYLON.Angle.BetweenTwoPoints(aPos, bPos);
        let aAng = BABYLON.Angle.BetweenTwoPoints(aPos, cPos);
        if (aAng.radians() - bAng.radians() <= epsilon) {
            return true;
        }
        return false;
    }
}