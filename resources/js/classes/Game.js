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
            "hit":"resources/sounds/Hit.mp3"
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
                "fingersIndexDistalPhalanx.r"
            ],
            "10_eyes_closed":[
                "eyelidTop.r",
                "eyelidTop.l",
                "eyelidBot.r",
                "eyelidBot.l"
            ],
            "10_eyes_half_opened":[
                "eyelidTop.r",
                "eyelidTop.l",
                "eyelidBot.r",
                "eyelidBot.l"
            ],
            "10_eyes_opened":[
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

        Game.postProcess = {};

        Game.highlightEnabled = false;
        Game.highlightLayer = undefined;
        Game.highlightedMesh = undefined;

        Game.loadDefaultTextures();
        Game.loadDefaultMaterials();
        Game.loadDefaultMeshes();
        Game.loadDefaultSounds();
        /*
            Which function handles the function of the key presses;
            controlerCharacter, controlMenu
         */
        Game.functionControlOnKeyDown = Game.controlCharacterOnKeyDown;
        Game.functionControlOnKeyUp = Game.controlCharacterOnKeyUp;
        Game.functionControlOnClick = Game.controlCharacterOnClick;
        Game.functionControlOnContext = Game.controlCharacterOnContext;
        // TODO: add support for other GUIs (that aren't created yet :v, like HTML instead of BABYLON.GUI)
        Game.gui = GameGUI;
        Game.gui.initialize();
        Game.initFreeCamera();
        Game.initQwertyKeyboardControls();
        Game.initPostProcessing();
        window.addEventListener("click", Game.functionControlOnClick);
        window.addEventListener("contextmenu", Game.functionControlOnContext);

        Game._filesToLoad -= 1;
        Game.initialized = true;
        Game.engine.runRenderLoop(Game.renderLoopFunction);
        Game.scene.registerBeforeRender(Game.beforeRenderFunction);
        Game.scene.registerAfterRender(Game.afterRenderFunction);
    }
    static renderLoopFunction() {
        Game.scene.render();
        if (!Game.finishedConfiguring()) {
            if (Game.finishedLoadingFiles()) {
                if (!Game.finishedInitializing()) {
                    if (Game.debugMode) console.log("Finished loading assets.");
                    Game.importItems();
                    Game.importCosmetics();
                    Game.importFurniture();
                    Game._finishedInitializing = true;

                    Game.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
                        Game.functionControlOnKeyDown(evt.sourceEvent.keyCode);
                    }));
                    Game.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
                        Game.functionControlOnKeyUp(evt.sourceEvent.keyCode);
                    }));
                }
                else {
                    Client.initialize();
                    Game.gui.resizeText();
                    Game.gui.showCharacterChoiceMenu();
                    Game._finishedConfiguring = true;
                }
            }
            let _url = new URL(window.location.href);
            let _map = new Map(_url.searchParams);
            _map.forEach(function(_val, _key) {
                switch(_key) {
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
    static beforeRenderFunction() {
        if (!(Game.player instanceof CharacterEntity) || !(Game.player.getController() instanceof CharacterController)) {
            return null;
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
        for (let _entity in Game.characterControllers) {
            if (Game.characterControllers[_entity]._isAnimated) {
                Game.characterControllers[_entity].moveAV();
                if (Game.characterControllers[_entity].propertiesChanged) {
                    Game.characterControllers[_entity].updateProperties();
                }
            }
        }
        for (let _entity in Game.furnitureControllers) {
            if (Game.furnitureControllers[_entity]._isAnimated) {
                Game.furnitureControllers[_entity].moveAV();
            }
        }
    }
    static afterRenderFunction() {
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
            if (!Game._filesToLoad) {
                Game.hasBackloggedEntities = false;
            }
        }
    }
    static finishedInitializing() {
        return Game._finishedInitializing;
    }
    static finishedLoadingFiles() {
        return Game._filesToLoad == 0;
    }
    static finishedConfiguring() {
        return Game._finishedConfiguring;
    }
    static initPhysics() {
        Game.physicsPlugin = new BABYLON.CannonJSPlugin();
        Game.scene.enablePhysics(Game.scene.gravity, Game.physicsPlugin);
        Game.physicsEnabled = true;
    }
    static initFollowCamera(_offset = BABYLON.Vector3.Zero()) {
        if (Game.camera instanceof BABYLON.Camera) {
            Game.camera.dispose();
        }
        if (!(Game.player.getController() instanceof EntityController) || !(Game.player.getController().getBoneByName("FOCUS") instanceof BABYLON.Bone) ) {
            return;
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
    static initFreeCamera(_applyGravity = true) {
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
            Game.camera.applyGravity = _applyGravity;
            Game.camera.ellipsoid = new BABYLON.Vector3(0.1, 1.1, 0.1);
            Game.camera.checkCollisions = true;
        }
        Game.initPostProcessing();
    }
    static addPlayerToCreate(_id) {
        if (Game.hasPlayerToCreate()) {
            return true;
        }
        _id = Tools.filterID(_id);
        Game.playerToCreate = _id;
        return true;
    }
    static removePlayerToCreate() {
        Game.playerToCreate = null;
        return true;
    }
    static hasPlayerToCreate() {
        return Game.playerToCreate != null;
    }
    static createBackloggedPlayer() {
        if (Game.hasPlayerToCreate() && Game.hasCharacterController(Game.playerToCreate)) {
            if (Game.assignPlayer(Game.playerToCreate)) {
                Game.removePlayerToCreate();
            }
        }
    }
    static createPlayer(_id, _name = "", _description = "", _icon = undefined, _age = 18, _sex = SexEnum.MALE, _species = SpeciesEnum.FOX, _mesh = "missingMesh", _texture = "missingMaterial", _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One()) {
        if (Game.debugMode) console.log("Running initPlayer");
        _id = Tools.filterID(_id);
        if (_id.length == 0) {
            _id = Tools.genUUIDv4();
        }
        let _character = Game.createCharacter(_id, _name, _description, _icon, _age, _sex, _species, _mesh, _texture, _options, _position, _rotation, _scaling);
        if (_character instanceof CharacterEntity && _character.hasController() && _character.getController().hasMesh()) {
            Game.assignPlayer(_character);
        }
        else {
            Game.addPlayerToCreate(_id);
        }
    }
    static assignPlayer(characterEntity) { // TODO: allow for reassigning player :v
        characterEntity = Game.getCharacterEntity(characterEntity);
        if (characterEntity instanceof CharacterEntity) {
            if (!characterEntity.hasController()) {
                return false;
            }
        }
        else if (characterEntity instanceof CharacterController) {
            characterEntity = characterEntity.getEntity();
        }
        else {
            return false;
        }
        if (!characterEntity.hasController() || !characterEntity.getController().hasMesh() || !characterEntity.getController().hasSkeleton()) {
            return false;
        }
        if (Game.player instanceof AbstractEntity) {
            Game.cameraFocus = Game.player.getController().detachFromFOCUS();
            Game.player.getController().getMesh().isPickable = true;
            if (Game.godMode) {
                Game.player.setGodMode(false);
            }
        }
        else {
            Game.cameraFocus = Game.createMesh("cameraFocus", "cameraFocus", "collisionMaterial");
        }
        Game.player = characterEntity;
        Game.player.getController().attachToFOCUS(Game.cameraFocus); // and reassigning an instanced mesh without destroying it
        Game.player.getController().getMesh().isPickable = false;
        if (Game.godMode) {
            Game.player.setGodMode(true);
        }
        Game.gui.setPlayerPortrait(Game.player);
        Game.initFollowCamera();
        Game.initCastRayInterval();
        Game.initPlayerPortraitStatsUpdateInterval();
        return true;
    }
    static initBaseKeyboardControls() {
        Game.chatInputFocusCode = 13;
        Game.chatInputSubmitCode = 13;
        Game.showMainMenuCode = 27;
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
        Game._updateMenuKeyboardDisplayKeys();
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
        Game._updateMenuKeyboardDisplayKeys();
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
        Game._updateMenuKeyboardDisplayKeys();
    }
    static _updateMenuKeyboardDisplayKeys() {
        Game.gui.setActionTooltipLetter();
    }
    static initPostProcessing() {
        Game.postProcess["fxaa"] = new BABYLON.FxaaPostProcess("fxaa", 2.0, Game.camera);
        //this.postProcess["tonemap"] = new BABYLON.TonemapPostProcess("tonemap", BABYLON.TonemappingOperator.Hable, 1.0, Game.camera); // Could be used for darkness, when using too many lights is an issue
    }
    static loadDefaultTextures() {
        Game.loadedTextures["default"] = new BABYLON.Texture(null, Game.scene);
        Game.loadTexture("missingTexture");
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
    }
    static loadDefaultMeshes() {
        Game.setLoadedMesh("missingMesh", BABYLON.MeshBuilder.CreateBox("missingMesh", {height: 0.3, width:0.3, depth:0.3}, Game.scene));
        Game.setLoadedMesh("loadingMesh", BABYLON.MeshBuilder.CreateSphere("loadingMesh", {diameter: 0.6}, Game.scene));
        Game.setLoadedMesh("cameraFocus", BABYLON.MeshBuilder.CreateBox("cameraFocus", {height: 0.05, width:0.05, depth:0.05}, Game.scene));
        Game.loadedMeshes["missingMesh"].material = Game.loadedMaterials["missingMaterial"];
        Game.loadedMeshes["missingMesh"].setEnabled(false);
        Game.loadedMeshes["loadingMesh"].setEnabled(false);
        Game.loadedMeshes["cameraFocus"].isVisible = false;
    }
    static loadDefaultSounds() {
        Game.setLoadedSound("missingSound", new BABYLON.Sound("missingSound", "resources/sounds/Spell Miss.mp3", Game.scene));
        Game.setLoadedSound("hit", new BABYLON.Sound("hit", "resources/sounds/Hit.mp3", Game.scene));
        Game.setLoadedSound("openDoor", new BABYLON.Sound("openDoor", "resources/sounds/Open Door.mp3", Game.scene));
    }
    static loadSound(soundID = "", options = {}) {
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
        return 1
    }
    static loadTexture(textureID = "", options = {}) {
        textureID = Tools.filterID(textureID);
        if (textureID.length == 0) {
            return Game.loadedTextures["missingTexture"];
        }
        else if (textureID instanceof BABYLON.Texture) {
            if (!Game.loadedTextures.hasOwnProperty(textureID.name)) {
                Game.loadedTextures[textureID.name] = textureID;
            }
            return textureID;
        }
        else if (typeof textureID == "string") {
            textureID = Game.Tools.filterID(textureID);
            if (Game.hasLoadedTexture(textureID)) {
                return Game.loadedTextures[textureID];
            }
            else if (Game.hasAvailableTexture(textureID)) {
                let _loadedTexture = new BABYLON.Texture(Game.textureLocations[textureID], Game.scene);
                _loadedTexture.name = textureID;
                if (options.hasOwnProperty("hasAlpha")) {
                    _loadedTexture.hasAlpha = options["hasAlpha"] == true;
                }
                Game.setLoadedTexture(textureID, _loadedTexture);
                return _loadedTexture;
            }
        }
        return Game.loadedTextures["missingTexture"];
    }
    static loadMaterial(materialID = "", diffuseTextureID = "", bumpTextureID = "", options = {}) {
        materialID = Tools.filterID(materialID);
        if (materialID.length == 0) {
            return Game.loadedTextures["missingTexture"];
        }
        diffuseTextureID = Tools.filterID(diffuseTextureID);
        if (diffuseTextureID.length > 0 && Game.hasAvailableTexture(diffuseTextureID) && !Game.hasLoadedTexture(diffuseTextureID)) {
            Game.loadTexture(diffuseTextureID);
        }
        else {
            diffuseTextureID = materialID;
        }
        bumpTextureID = Tools.filterID(bumpTextureID);
        if (bumpTextureID.length > 0 && Game.hasAvailableTexture(bumpTextureID) && !Game.hasLoadedTexture(bumpTextureID)) {
            Game.loadTexture(bumpTextureID);
        }
        let loadedMaterial = new BABYLON.StandardMaterial(materialID)
        loadedMaterial.name = materialID;
        loadedMaterial.diffuseTexture = Game.getLoadedTexture(diffuseTextureID);
        if (bumpTextureID instanceof BABYLON.Texture) {
            loadedMaterial.bumpTexture = bumpTextureID;
        }
        loadedMaterial.specularColor.set(0,0,0);
        if (typeof options == "object") {
            if (options.hasOwnProperty("specularColor")) {
                loadedMaterial.specularColor.set(Tools.filterVector(options["specularColor"]));
            }
        }
        Game.setLoadedMaterial(materialID, loadedMaterial);
        return loadedMaterial;
    }
    static loadMesh(meshID) {
        meshID = Tools.filterID(meshID);
        if (meshID.length == 0) {
            return 2;
        }
        if (Game.loadedMeshes.hasOwnProperty(meshID)) {
            return 0;
        }
        else if (Game.meshLocations.hasOwnProperty(meshID)) {
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
            return null;
        }
    }
    static getMesh(meshID) {
        if (meshID == undefined) {
            return null;
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
        return null;
    }
    static hasIcon(iconID) {
        return Game.iconLocations.hasOwnProperty(iconID);
    }
    static addIcon(iconID, location) {
        if (Game.hasIcon(iconID)) {
            return null;
        }
        Game.iconLocations[iconID] = location;
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
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = file;
        script.onload = function(){
        };
        document.body.appendChild(script);
    }
    static importItems() {
        Game.importScript("resources/js/items.js");
    }
    static importCosmetics() {
        Game.importScript("resources/js/cosmetics.js");
    }
    static importFurniture() {
        Game.importScript("resources/js/furniture.js");
    }
    static controlCharacterOnKeyDown(event) {
        if (Game.debugMode) console.log(`Running Game::controlCharacterOnKeyDown(${event})`);
        if (!Game.initialized) {
            return undefined;
        }
        if (event == undefined) {
            return undefined;
        }
        if (!(Game.player instanceof CharacterEntity) || !Game.player.hasController() || !Game.player.getController().hasMesh()) {
            return undefined;
        }
        switch (event) {
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
                        var _text = Game.gui.getChatInput().text.trim();
                        if (_text.length == 0) {
                            return;
                        }
                        if (Client.isOnline()) {
                            Client.sendChatMessage(_text);
                        }
                        else {
                            Game.chatParse(_text);
                        }
                        Game.gui.chatInputClear();
                    }
                }
                break;
            }
            case Game.chatInputSubmitCode : {
                var _text = Game.gui.getChatInput().text.trim();
                if (_text.length == 0) {
                    return;
                }
                if (Client.isOnline()) {
                    Client.sendChatMessage(_text);
                }
                else {
                    Game.chatParse(_text);
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
                if (Game.gui.getInventoryMenuVisible()) {
                    Game.gui.hideInventoryMenu();
                    Game.gui.hideMenu(true);
                    Game.gui.pointerLock();
                }
                else {
                    Game.gui.updateInventoryMenuWith(Game.player);
                    Game.gui.showMenu(true);
                    Game.gui.showInventoryMenu();
                    Game.gui.pointerRelease();
                }
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
        if (Game.debugMode) console.log(`Running Game::controlCharacterOnKeyUp(${event})`);
        if (!Game.initialized) {
            return undefined;
        }
        if (event == undefined) {
            return undefined;
        }
        if (!(Game.player instanceof CharacterEntity) || !Game.player.hasController() || !Game.player.getController().hasMesh()) {
            return undefined;
        }
        switch (event) {
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
                if (!(Game.player.getTarget() instanceof AbstractEntity)) {
                    return;
                }
                if (Game.player.getTarget() instanceof AbstractEntity) {
                    Game.doEntityAction(Game.player.getTarget(), Game.player, Game.player.getTarget().getDefaultAction());
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
    static controlCharacterOnClick(event) {
        if (!Game.initialized) {
            return undefined;
        }
        if (event == undefined) {
            return undefined;
        }
        if (!(Game.player instanceof CharacterEntity) || !Game.player.hasController() || !Game.player.getController().hasMesh()) {
            return undefined;
        }
        if (event.button == 1) {
            // nothing for middle click :v
            return true;
        }
        else if (event.button == 2) {
            return Game.controlCharacterOnContext(event);
        }
        Game.actionAttackFunction(Game.player.getTarget(), Game.player);
    }
    static controlCharacterOnContext(event) {
        if (!Game.initialized) {
            return undefined;
        }
        if (event == undefined) {
            return undefined;
        }
        if (!(Game.player instanceof CharacterEntity) || !Game.player.hasController() || !Game.player.getController().hasMesh()) {
            return undefined;
        }
        if (Game.initialized && Game.player instanceof CharacterEntity && Game.player.getTarget() instanceof AbstractEntity) {
            Game.gui.clearActionsMenu();
            Game.gui.populateActionsMenuWithTarget();
            Game.gui.updateActionsMenu();
            Game.gui.showActionsMenu();
        }
    }
    static createCollisionWall(_posStart = BABYLON.Vector3.Zero(), _posEnd = BABYLON.Vector3.Zero(), _rotation = 0) {
        if (Game.debugMode) console.log("Running createCollisionWallX");
        if (_rotation != 0 && Tools.isInt(_rotation)) {
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
        if (Game.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(_wall, {mass:0});
        }
        else {
            _wall.checkCollisions = true;
        }
        return _wall;
    }
    static createCollisionPlane(_posStart = {x:0, z:0}, _posEnd = {x:0, z:0}, _posY = 0) {
        if (Game.debugMode) console.log("Running createCollisionPlane");
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
        _floor.material = Game.loadedMaterials["collisionMaterial"];
        _floor.position.set(_posX,_posY,_posZ);
        if (Game.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(_floor, {mass:0});
        }
        else {
            _floor.checkCollisions = true;
        }
        return _floor;
    }
    static createCollisionPlaneV2(start = BABYLON.Vector2.Zero(), end = BABYLON.Vector2.One()) {
        if (Game.debugMode) console.log("Running createCollisionPlane");
        if (start instanceof BABYLON.AbstractMesh) {
            posEnd.set(start.position.x + (start.getBoundingInfo().boundingBox.extendSize.x * start.scaling.x) * 2, start.position.y, start.position.z + (start.getBoundingInfo().boundingBox.extendSize.z * start.scaling.z) * 2)
            start = start.position.clone();
        }
        let floor = BABYLON.MeshBuilder.CreateBox("plane", {"height":0.125, "depth":Math.abs(end.z - start.z), "width":Math.abs(end.x - start.x)}, Game.scene);
        floor.material = Game.loadedMaterials["collisionMaterial"];
        floor.position.set((start.x + start.x) / 2, start.y, (start.z + end.z) / 2);
        if (Game.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(floor, {mass:0});
        }
        else {
            floor.checkCollisions = true;
        }
        return floor;
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
        if (Game.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(_ramp, {mass:0});
        }
        else {
            _ramp.checkCollisions = true;
        }
        return _ramp;
    }
    static assignPlanePhysicsToMesh(_mesh) {
        if (Game.debugMode) console.log("Running assignPlanePhysicsToMesh");
        _mesh.physicsImposter = new BABYLON.PhysicsImpostor(_mesh, BABYLON.PhysicsImpostor.BoxImpostor, {mass:0}, Game.scene);
        return _mesh.physicsImposter;
    }
    static assignCylinderPhysicsToMesh(_mesh, _options = {mass:0.8,restitution:0.1}) {
        if (Game.debugMode) console.log("Running assignCylinderPhysicsToMesh");
        if (typeof _options != "object" || typeof _object == "undefined") _options = {mass:0.8,restitution:0.1};
        _mesh.physicsImposter = new BABYLON.PhysicsImpostor(_mesh, BABYLON.PhysicsImpostor.CylinderImpostor, _options, Game.scene);
        return _mesh.physicsImposter;
    }
    static assignBoxPhysicsToMesh(_mesh, _options = {mass:0.8,restitution:0.1}) {
        if (Game.debugMode) console.log("Running assignBoxPhysicsToMesh");
        if (typeof _options != "object" || typeof _object == "undefined") _options = {mass:0.8,restitution:0.1};
        _mesh.physicsImposter = new BABYLON.PhysicsImpostor(_mesh, BABYLON.PhysicsImpostor.BoxImpostor, _options, Game.scene);
        return _mesh.physicsImposter;
    }
    static assignBoxPhysicsToBone(_bone, _options = {mass:0.8,restitution:0.1}) {

    }
    static assignBoxCollisionToMesh(_mesh) {
        if (Game.debugMode) console.log("Running assignBoxCollisionToMesh");
        if (!(_mesh instanceof BABYLON.AbstractMesh)) {
            return null;
        }
        Game.assignBoundingBoxCollisionQueue.add(_mesh);
    }
    static assignBoundingBoxCollisionToMesh(_mesh) {
        if (Game.debugMode) console.log("Running _assignBoundingBoxCollisionToMesh");
        Game.assignBoundingBoxCollisionQueue.delete(_mesh);
        let _collisionMesh = BABYLON.MeshBuilder.CreateBox(_mesh.id + "-collisionBox", {width:_mesh.getBoundingInfo().boundingBox.vectors[1].x - _mesh.getBoundingInfo().boundingBox.vectors[0].x, height:_mesh.getBoundingInfo().boundingBox.vectors[1].y - _mesh.getBoundingInfo().boundingBox.vectors[0].y, depth:_mesh.getBoundingInfo().boundingBox.vectors[1].z - _mesh.getBoundingInfo().boundingBox.vectors[0].z}, Game.scene);
        _collisionMesh.material = Game.loadedMaterials["collisionMaterial"];
        _collisionMesh.checkCollisions = true;
        _collisionMesh.setParent(_mesh);
        let _controller = Game.getMeshToEntityController(_mesh);
        if (_controller instanceof DoorController) {
            if (_mesh.collisionMesh.scaling.x > _mesh.collisionMesh.scaling.z) {
                _mesh.collisionMesh.scaling.z += _mesh.collisionMesh.scaling.z * 0.1;
            }
            else {
                _mesh.collisionMesh.scaling.x += _mesh.collisionMesh.scaling.x * 0.2;
            }
        }
        _collisionMesh.setParent(_mesh);
    }
    static createBackloggedBoundingCollisions() {
        if (Game.assignBoundingBoxCollisionQueue.size > 0) {
            Game.assignBoundingBoxCollisionQueue.forEach(function(meshID) {
                Game.assignBoundingBoxCollisionToMesh(meshID);
            });
        }
        return true;
    }
    static createItemMesh(itemID = undefined, meshID = "missingMesh", materialID = "missingMaterial", options = {}, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), forceCreateClone = false) {
        if (Game.debugMode) console.log("Running createItemMesh");
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
        if (Game.debugMode) console.log("Running createFurnitureMesh");
        let instancedMesh = Game.createMesh(furnitureID, meshID, materialID, position, rotation, scaling, forceCreateClone, createCollisionMesh);
        if (!(instancedMesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        return instancedMesh;
    }
    static createCharacterMesh(characterID = undefined, meshID = "missingMesh", materialID = "missingMaterial", options = {}, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One()) {
        if (Game.debugMode) console.log(`Running createCharacterMesh(${characterID}, ${meshID}, ${materialID})`);
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
        if (Game.debugMode) console.log(`Running createMesh(${meshIndexID}, ${meshID}, ${materialID})`);
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
                //Game.assignBoxCollisionToMesh(_mesh);
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
        for (var _i in Game.meshesToCreate) {
            if (Game.loadedMeshes.hasOwnProperty(Game.meshesToCreate[_i][1])) {
                Game.createMesh(
                    Game.meshesToCreate[_i][0],
                    Game.meshesToCreate[_i][1],
                    Game.meshesToCreate[_i][2],
                    Game.meshesToCreate[_i][3],
                    Game.meshesToCreate[_i][4],
                    Game.meshesToCreate[_i][5],
                    Game.meshesToCreate[_i][6],
                    Game.meshesToCreate[_i][7]
                );
                Game.removeMeshToCreate(_i);
            }
        }
    }
    static addFurnitureToCreate(_id, _entity = "", _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One()) {
        if (Game.hasFurnitureToCreate(_id)) {
            return true;
        }
        Game.furnitureToCreate[_id] = {
            0:_id,
            1:_entity,
            2:_position,
            3:_rotation,
            4:_scaling
        };
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
    static createBackloggedFurniture() {
        if (Game.furnitureToCreateCounter == 0) {
            return true;
        }
        for (var _i in Game.furnitureToCreate) {
            if (Game.loadedMeshes.hasOwnProperty(Game.getInstancedFurnitureEntity(Game.furnitureToCreate[_i][1]).getMeshID())) {
                Game.createFurnitureInstance(
                    Game.furnitureToCreate[_i][0],
                    Game.furnitureToCreate[_i][1],
                    Game.furnitureToCreate[_i][2],
                    Game.furnitureToCreate[_i][3],
                    Game.furnitureToCreate[_i][4]
                );
                Game.removeFurnitureToCreate(_i);
            }
        }
    }
    static addLightingToCreate(_id, _name = "", _mesh = "missingMesh", _texture = "missingMaterial", _type = "", _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One(), _lightingPositionOffset = BABYLON.Vector3.Zero(), _createCollisionMesh = true) {
        if (Game.hasLightingToCreate(_id)) {
            return true;
        }
        Game.lightingToCreate[_id] = {
            0:_id,
            1:_name,
            2:_mesh,
            3:_texture,
            4:_type,
            5:_options,
            6:_position,
            7:_rotation,
            8:_scaling,
            9:_lightingPositionOffset,
            10:_createCollisionMesh
        };
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
    static createBackloggedLighting() {
        if (Game.lightingToCreateCounter == 0) {
            return true;
        }
        for (var _i in Game.lightingToCreate) {
            if (Game.loadedMeshes.hasOwnProperty(Game.lightingToCreate[_i][2])) {
                Game.createLighting(
                    Game.lightingToCreate[_i][0],
                    Game.lightingToCreate[_i][1],
                    Game.lightingToCreate[_i][2],
                    Game.lightingToCreate[_i][3],
                    Game.lightingToCreate[_i][4],
                    Game.lightingToCreate[_i][5],
                    Game.lightingToCreate[_i][6],
                    Game.lightingToCreate[_i][7],
                    Game.lightingToCreate[_i][8],
                    Game.lightingToCreate[_i][9],
                    Game.lightingToCreate[_i][10]
                );
                Game.removeLightingToCreate(_i);
            }
        }
    }
    static addDoorsToCreate(_id, _name = "", _to = "", _mesh = "missingMesh", _texture = "missingMaterial", _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One()) {
        if (Game.hasDoorsToCreate(_id)) {
            return true;
        }
        Game.doorsToCreate[_id] = {
            0:_id,
            1:_name,
            2:_to,
            3:_mesh,
            4:_texture,
            5:_options,
            6:_position,
            7:_rotation,
            8:_scaling
        };
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
    static createBackloggedDoors() {
        if (Game.doorsToCreateCounter == 0) {
            return true;
        }
        for (var _i in Game.doorsToCreate) {
            if (Game.loadedMeshes.hasOwnProperty(Game.doorsToCreate[_i][3])) {
                Game.createDoor(
                    Game.doorsToCreate[_i][0],
                    Game.doorsToCreate[_i][1],
                    Game.doorsToCreate[_i][2],
                    Game.doorsToCreate[_i][3],
                    Game.doorsToCreate[_i][4],
                    Game.doorsToCreate[_i][5],
                    Game.doorsToCreate[_i][6],
                    Game.doorsToCreate[_i][7],
                    Game.doorsToCreate[_i][8]
                );
                Game.removeDoorsToCreate(_i);
            }
        }
    }
    static addCharacterToCreate(_id, _name = "", _description = "", _icon = undefined, _age = 18, _sex = SexEnum.MALE, _species = SpeciesEnum.FOX, _mesh = "missingMesh", _texture = "missingMaterial", _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One()) {
        if (Game.hasCharacterToCreate(_id)) {
            return true;
        }
        Game.charactersToCreate[_id] = {
            0:_id,
            1:_name,
            2:_description,
            3:_icon,
            4:_age,
            5:_sex,
            6:_species,
            7:_mesh,
            8:_texture,
            9:_options,
            10:_position,
            11:_rotation,
            12:_scaling
        };
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
    static createBackloggedCharacters() {
        if (Game.charactersToCreateCounter == 0) {
            return true;
        }
        for (var _i in Game.charactersToCreate) {
            if (Game.loadedMeshes.hasOwnProperty(Game.charactersToCreate[_i][7])) {
                Game.createCharacter(
                    Game.charactersToCreate[_i][0],
                    Game.charactersToCreate[_i][1],
                    Game.charactersToCreate[_i][2],
                    Game.charactersToCreate[_i][3],
                    Game.charactersToCreate[_i][4],
                    Game.charactersToCreate[_i][5],
                    Game.charactersToCreate[_i][6],
                    Game.charactersToCreate[_i][7],
                    Game.charactersToCreate[_i][8],
                    Game.charactersToCreate[_i][9],
                    Game.charactersToCreate[_i][10],
                    Game.charactersToCreate[_i][11],
                    Game.charactersToCreate[_i][12]
                );
                Game.removeCharacterToCreate(_i);
            }
        }
    }
    static addItemToCreate(_id, _entity = undefined, _options = {}, _position = BABYLON.Vector3.Zero(), _rotation = BABYLON.Vector3.Zero(), _scaling = BABYLON.Vector3.One()) {
        if (Game.hasItemToCreate(_id)) {
            return true;
        }
        Game.itemsToCreate[_id] = {
            0:_id,
            1:_entity,
            2:_options,
            3:_position,
            4:_rotation,
            5:_scaling
        };
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
    static createBackloggedItems() { // It's InstancedItemEntities :v
        if (Game.itemsToCreateCounter == 0) {
            return true;
        }
        for (var _i in Game.itemsToCreate) {
            if (Game.hasLoadedMesh(Game.itemsToCreate[_i][1].getMeshID())) {
                Game.createItemInstance(
                    Game.itemsToCreate[_i][0],
                    Game.itemsToCreate[_i][1],
                    Game.itemsToCreate[_i][2],
                    Game.itemsToCreate[_i][3],
                    Game.itemsToCreate[_i][4],
                    Game.itemsToCreate[_i][5]
                );
                Game.removeItemToCreate(_i);
            }
        }
    }
    static addAttachmentToCreate(_id, _attachToController, _mesh, _texture, _bone, _position, _rotation, _scaling) {
        if (Game.hasAttachmentToCreate(_id)) {
            return true;
        }
        Game.attachmentsToCreate[_id] = {
            0:_id,
            1:_attachToController,
            2:_mesh,
            3:_texture,
            4:_bone,
            5:_position,
            6:_rotation,
            7:_scaling
        };
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
    static createBackloggedAttachments() {
        if (Game.attachmentsToCreateCounter == 0) {
            return true;
        }
        for (var _i in Game.attachmentsToCreate) {
            if (Game.loadedMeshes.hasOwnProperty(Game.attachmentsToCreate[_i][2])) {
                Game.attachmentsToCreate[_i][1] = Game.getEntityController(Game.attachmentsToCreate[_i][1]);
                if (Game.attachmentsToCreate[_i][1] instanceof CharacterController) {
                    Game.attachmentsToCreate[_i][1].attachToBone(
                        Game.attachmentsToCreate[_i][2],
                        Game.attachmentsToCreate[_i][3],
                        Game.attachmentsToCreate[_i][4],
                        Game.attachmentsToCreate[_i][5],
                        Game.attachmentsToCreate[_i][6],
                        Game.attachmentsToCreate[_i][7]
                    );
                }
                Game.removeAttachmentToCreate(_i);
            }
        }
    }

    static importMeshes(_sceneFilename, _meshNames = undefined, _callback = undefined) {
        if (Game.loadedFiles.has(_sceneFilename)) {
            return;
        }
        else {
            Game.loadedFiles.add(_sceneFilename);
        }
        if (Game.debugMode) console.log(`Running importMeshes(${_sceneFilename})`);
        var _importedMeshes = {};
        Game._filesToLoad += 1;
        BABYLON.SceneLoader.ImportMesh(
            undefined, // meshNames
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
                    if (Game.debugMode) console.log("Importing mesh " + _meshes[_i].id + " from " + _sceneFilename + ".");
                }
                Game._filesToLoad -= 1;
                if (typeof _callback == "function") {
                    _callback(_importedMeshes);
                }
            },
            function() { // onProgress
                if (Game.debugMode) console.log("Importing meshes from " + _sceneFilename + "...");
            },
            function() { // onError
                if (Game.debugMode) console.log("Error while importing meshes from " + _sceneFilename);
                Game._filesToLoad -= 1;
            }
        );
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
        _temp = Game.getMesh(_currentID);
        _temp.id = _newID;
        Game.instancedMeshes[_newID] = _temp;
        delete Game.instancedMeshes[_currentID];
        if (Game.hasMesh(_currentID)) {
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
        else if (_id instanceof BABYLON.AbstractMesh) {
            return Game.getMeshToEntityController(_id);
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
        else if (_id instanceof FurnitureEntity || _id instanceof InstancedFurnitureEntity) {
            return _id.getController();
        }
        else if (typeof _id == "string" && Game.furnitureControllers.hasOwnProperty(_id)) {
            return Game.furnitureControllers[_id];
        }
        else if (_id instanceof BABYLON.AbstractMesh) {
            return Game.getMeshToEntityController(_id);
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
        else if (_id instanceof BABYLON.AbstractMesh) {
            return Game.getMeshToEntityController(_id);
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
        else if (_id instanceof BABYLON.AbstractMesh) {
            return Game.getMeshToEntityController(_id)
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
        else if (_id instanceof BABYLON.AbstractMesh) {
            return Game.getMeshToEntityController(_id);
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
        else if (_id instanceof BABYLON.AbstractMesh) {
            return Game.getMeshToEntityController(_id);
        }
        else {
            return undefined;
        }
    }
    static hasCharacterController(_id) {
        return Game.getCharacterController(_id) != undefined;
    }
    /**
     * Tries to return an Entity based on its ID
     * @param {string} id Entity ID
     * @returns {(Entity|number)} An Entity or an integer status code
     */
    static getEntity(id) {
        if (id == undefined) {
            return 2;
        }
        else if (id instanceof Entity) {
            return id;
        }
        else if (typeof id == "string" && Game.entities.hasOwnProperty(id)) {
            return Game.entities[id];
        }
        else if (id.hasOwnProperty("entity") && id.entity instanceof Entity) {
            return id.entity;
        }
        return 1;
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
        if (id == undefined) {
            return 2;
        }
        else if (id instanceof InstancedEntity) {
            return id;
        }
        else if (typeof id == "string" && Game.instancedEntities.hasOwnProperty(id)) {
            return Game.entities[id];
        }
        else if (id.hasOwnProperty("entity") && id.entity instanceof InstancedEntity) {
            return id.entity;
        }
        return 1;
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
        if (id == undefined) {
            return 2;
        }
        else if (id instanceof ItemEntity) {
            return id;
        }
        else if (typeof id == "string" && Game.itemEntities.hasOwnProperty(id)) {
            return Game.itemEntities[id];
        }
        else if (id instanceof InstancedItemEntity) {
            return id.getEntity();
        }
        else if (id instanceof ItemController && id.getEntity() instanceof InstancedItemEntity) {
            return id.getEntity().getEntity();
        }
        return 1;
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
        if (id == undefined) {
            return 2;
        }
        else if (id instanceof InstancedItemEntity) {
            return id;
        }
        else if (typeof id == "string" && Game.instancedItemEntities.hasOwnProperty(id)) {
            return Game.instancedItemEntities[id];
        }
        else if (id instanceof ItemController && id.entity instanceof InstancedItemEntity) {
            return id.entity;
        }
        else if (id instanceof BABYLON.AbstractMesh) {
            let itemController = Game.getMeshToEntityController(id);
            if (itemController instanceof ItemController) {
                return itemController.getEntity();
            }
        }
        return 1;
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
        if (id == undefined) {
            return 2;
        }
        else if (id instanceof CharacterEntity) {
            return id;
        }
        else if (typeof id == "string" && Game.characterEntities.hasOwnProperty(id)) {
            return Game.characterEntities[id];
        }
        else if (id instanceof CharacterController && id.getEntity() instanceof CharacterController) {
            return id.getEntity().getEntity();
        }
        return 1;
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
        if (id == undefined) {
            return 2;
        }
        else if (id instanceof FurnitureEntity) {
            return id;
        }
        else if (typeof id == "string" && Game.furnitureEntities.hasOwnProperty(id)) {
            return Game.furnitureEntities[id];
        }
        else if (id instanceof InstancedFurnitureEntity) {
            return id.getEntity();
        }
        else if (id instanceof FurnitureController && id.getEntity() instanceof InstancedFurnitureEntity) {
            return id.getEntity().getEntity();
        }
        return 1;
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
        if (id == undefined) {
            return 2;
        }
        else if (id instanceof InstancedFurnitureEntity) {
            return id;
        }
        else if (typeof id == "string" && Game.instancedFurnitureEntities.hasOwnProperty(id)) {
            return Game.instancedFurnitureEntities[id];
        }
        else if (id instanceof FurnitureController && id.entity instanceof InstancedFurnitureEntity) {
            return id.entity;
        }
        else if (id instanceof BABYLON.AbstractMesh) {
            let _controller = Game.getMeshToEntityController(id);
            if (_controller instanceof EntityController) {
                return _controller.getEntity();
            }
        }
        return 1;
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
        if (id == undefined) {
            return 2;
        }
        else if (id instanceof Dialogue) {
            return id;
        }
        else if (typeof id == "string" && Game.dialogues.has(id)) {
            return Game.dialogues.get(id);
        }
        return 1;
    }
    /**
     * Creates a character mesh, entity, and controller.
     * @param  {string} [id] Unique ID, auto-generated if none given
     * @param  {string} name Name
     * @param  {string} [description] Description
     * @param  {string} [icon] Icon ID
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
    static createCharacter(id, name = "", description = "", icon = undefined, age = 18, sex = SexEnum.MALE, species = SpeciesEnum.FOX, meshID = "missingMesh", materialID = "missingMaterial", options = {}, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One()) {
        id = Tools.filterID(id);
        if ((id.length == 0)) {
            id = Tools.genUUIDv4();
        }
        let characterEntity = null;
        if (!Game.hasCharacterEntity(id)) {
            characterEntity = new CharacterEntity(id, name, description, icon, undefined, age, sex, species);
            if (options instanceof Object) {
                for (let index in options) {
                    switch (index) {
                        case "eye":
                        case "eyes": {
                            characterEntity.setEyeType(options[index]);
                            break;
                        }
                        case "eyeColor":
                        case "eyesColor":
                        case "eyeColour":
                        case "eyesColour": {
                            characterEntity.setEyeColour(options[index]);
                            break;
                        }
                        case "isEssential": {
                            characterEntity.setEssential(options[index]);
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
        characterEntity.setController(characterController);
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
     * @param  {String} mesh Mesh ID
     * @param  {String} texture Texture ID
     * @param  {Object} [options] Physics options, if they're enabled
     * @param  {BABYLON.Vector3} position Position
     * @param  {BABYLON.Vector3} [rotation] Rotation
     * @param  {BABYLON.Vector3} [scaling] Scaling
     * @return {(EntityController|number)} A DoorController or an integer status code
     */
    static createDoor(id, name = "Door", to = undefined, mesh = "door", texture = "plainDoor", options = {locked:false, key:null, opensInward:false, open:false}, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One()) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        if (!Game.hasMesh(mesh)) {
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
        if (!(Game.hasLoadedMesh(mesh))) {
            Game.loadMesh(mesh);
            Game.addDoorsToCreate(id, name, to, mesh, texture, options, position, rotation, scaling);
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
        var doorEntity = new DoorEntity(id, name, undefined, undefined, locked, key, opensInward, open);
        var radius = Game.getMesh(mesh).getBoundingInfo().boundingBox.extendSize.x * scaling.x;
        var xPosition = radius * (Math.cos(rotation.y * Math.PI / 180) | 0);
        var yPosition = radius * (Math.sin(rotation.y * Math.PI / 180) | 0);
        var loadedMesh = Game.createMesh(id, mesh, texture, position.add(new BABYLON.Vector3(xPosition, 0, -yPosition)), rotation, scaling, true);
        var doorController = new DoorController(id, loadedMesh, doorEntity);
        doorEntity.setController(doorController);
        doorEntity.setMeshID(loadedMesh);
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
     * @param {string} [icon] Icon ID
     * @param {string} mesh Mesh ID
     * @param {string} texture Texture ID
     * @param {FurnitureEnum} furnitureType FurnitureEnum
     * @param {number} weight Weight in kilograms
     * @param {number} price Price, non-decimal
     */
    static createFurnitureEntity(id, name = "", description = "", icon = "", mesh = "missingMesh", texture = "missingMaterial", furnitureType = FurnitureEnum.NONE, weight = 1, price = 1) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        let furnitureEntity = new FurnitureEntity(id, name, description, icon, furnitureType);
        if (furnitureEntity instanceof FurnitureEntity) {
            furnitureEntity.setMeshID(mesh);
            furnitureEntity.setTextureID(texture);
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
            Game.addFurnitureToCreate(id, furnitureEntity.getID(), position, rotation, scaling);
            return 0;
        }
        let loadedMesh = Game.createMesh(id, furnitureEntity.getMeshID(), furnitureEntity.getTextureID(), position, rotation, scaling, true);
        loadedMesh.checkCollisions = true;
        let furnitureController = new FurnitureController(id, loadedMesh, furnitureEntity);
        furnitureEntity.setController(furnitureController);
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
        var mesh = furnitureController.getMesh();
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
        var loadedMesh = Game.createMesh(id, mesh, texture, position, rotation, scaling, true)
        var lightingEntity = new LightingEntity(id, name, undefined, undefined, lightingType);
        var lightingController = new LightingController(id, loadedMesh, lightingEntity, lightingType, lightingPositionOffset);
        lightingEntity.setController(lightingController);
        lightingEntity.setMeshID(loadedMesh);
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
     * @param {string} [icon] Icon ID
     * @param {string} mesh Mesh ID
     * @param {string} texture Texture ID
     * @param {ItemEnum} itemType ItemEnum
     * @param {number} [subType] Dependant on itemType
     * @param {number} [weight] Weight in kilograms
     * @param {number} [price] Price, non-decimal
     * @returns {(ItemEntity|number)} An ItemEntity or an integer status code
     */
    static createItemEntity(id, name = "", description = "", icon = "", mesh = "missingMesh", texture = "missingMaterial", itemType = ItemEnum.GENERAL, subType = 0, weight = 1, price = 0) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        let itemEntity = null;
        switch (itemType) {
            case ItemEnum.GENERAL : {
                itemEntity = new ItemEntity(id, name, description, icon);
                break;
            }
            case ItemEnum.APPAREL: {
                itemEntity = new ClothingEntity(id, name, description, icon, subType);
                break;
            }
            case ItemEnum.WEAPON : {
                itemEntity = new WeaponEntity(id, name, description, icon, subType);
                break;
            }
            case ItemEnum.KEY : {
                itemEntity = new KeyEntity(id, name, description, icon);
                break;
            }
            case ItemEnum.BOOK : {
                //_entity = new BookEntity(_id, _name, _description, _icon); // TODO: this :v
            }
            case ItemEnum.CONSUMABLE : {
                //_entity = new ConsumableEntity(_id, _name, _description, _icon, _subType); // TODO: this :v
            }
            default: {
                itemEntity = new ItemEntity(id, name, description, icon);
            }
        }
        if (itemEntity instanceof ItemEntity) {
            itemEntity.setMeshID(mesh);
            itemEntity.setTextureID(texture);
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
        abstractEntity.setController(itemController);
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
     * @param {(ItemController|string)} itemController An ItemController, or its string ID
     * @returns {number} Integer status code
     */
    static removeItemInSpace(itemController) {
        if (!(itemController instanceof ItemController)) {
            if (!Game.hasItemController(itemController)) {
                return 2;
            }
            itemController = Game.getItemController(itemController);
        }
        let mesh = itemController.getMesh();
        itemController.dispose();
        if (mesh instanceof BABYLON.InstancedMesh) {
            Game.removeMesh(mesh);
        }
        return 0;
    }
    /**
     * Creates a Cosmetic
     * @param {string} [id] Unique ID, auto-generated if none given
     * @param {string} name Name
     * @param {string} [description] Description
     * @param {string} [icon] Icon ID
     * @param {string} mesh Mesh ID
     * @param {string} texture Texture ID
     * @param {ApparelSlotEnum} equipmentSlot ApparelSlotEnum
     * @returns {(Cosmetic|number)} A Cosmetic or an integer status code
     */
    static createCosmetic(id, name = "", description = "", icon = "", mesh = "missingMesh", texture = "missingMaterial", equipmentSlot = ApparelSlotEnum.HEAD) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        let cosmetic = new Cosmetic(id, name, description, icon, mesh, texture, equipmentSlot);
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
    }
    static disableHighlighting() {
        Game.highlightEnabled = false;
    }
    static initHighlighting() {
        Game.highlightLayer = new BABYLON.HighlightLayer("hl1", Game.scene);
        Game.highlightLayer.outerGlow = true;
        Game.highlightLayer.innerGlow = false;
    }
    static highlightMesh(_mesh) {
        if (!(_mesh instanceof BABYLON.Mesh)) {
            return;
        }
        if (!Game.highlightEnabled || Game.highlightedMesh == _mesh) {
            return;
        }
        if (Game.highlightedMesh != undefined) {
            Game.highlightLayer.removeMesh(Game.highlightedMesh);
        }
        let _color = BABYLON.Color3.Gray();
        let _controller = Game.getMeshToEntityController(_mesh);
        if (_controller instanceof CharacterController) {
            _color = BABYLON.Color3.White();
        }
        else if (_controller instanceof ItemController) {
            if (_controller.getEntity().getOwner() != Game.player) {
                _color = BABYLON.Color3.Red();
            }
            else {
                _color = BABYLON.Color3.White();
            }
        }
        Game.highlightLayer.addMesh(_mesh, BABYLON.Color3.White());
        Game.highlightedMesh = _mesh;
    }
    static clearHightlightMesh() {
        if (!(Game.highlightedMesh instanceof BABYLON.Mesh)) {
            return;
        }
        Game.highlightLayer.removeMesh(Game.highlightedMesh);
        Game.highlightedMesh = null;
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
        if (!Game.player.hasController() || !Game.player.getController().hasMesh() || !Game.player.getController().hasSkeleton()) {
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
        if (Game.debugMode) {
            if (Game.player.getController().targetRayHelper != undefined) {
                Game.player.getController().targetRayHelper.dispose();
            }
            Game.player.getController().targetRayHelper = new BABYLON.RayHelper(Game.player.getController().targetRay);
            Game.player.getController().targetRayHelper.show(Game.scene);
        }
        var _hit = Game.scene.pickWithRay(Game.player.getController().targetRay);
        if (_hit.hit) {
            let _controller = Game.getMeshToEntityController(_hit.pickedMesh);
            if (_controller instanceof EntityController) {
                if (_controller != Game.player.getController().getTarget()) {
                    Game.setPlayerTarget(_controller);
                }
            }
            else {
                Game.clearPlayerTarget();
            }
        }
        else {
            Game.clearPlayerTarget();
        }
    }
    static initCastRayInterval() {
        clearInterval(Game.castRayTargetIntervalFunction);
        Game.castRayTargetIntervalFunction = setInterval(Game.castRayTarget, Game.castRayTargetInterval);
    }
    static setCastRayInterval(_interval = 250) {
        if (_interval > 0) {
            Game.castRayTargetInterval = _interval;
        }
        Game.initCastRayInterval();
    }
    static initPlayerPortraitStatsUpdateInterval() {
        clearInterval(Game.playerPortraitStatsUpdateIntervalFunction);
        Game.playerPortraitStatsUpdateIntervalFunction = setInterval(Game.gui.updatePlayerPortraitStats, Game.playerPortraitStatsUpdateInterval);
    }
    static setPlayerPortraitStatsUpdateInterval(_interval = 100) {
        if (_interval > 0) {
            Game.playerPortraitStatsUpdateInterval = _interval;
        }
        Game.initPlayerPortraitStatsUpdateInterval();
    }

    static pointerLock(_event) {
        if (Game.engine.isPointerLock) {
            return;
        }
        Game.canvas.requestPointerLock();
        Game.engine.isPointerLock = true;
        Game.pointerLockFunction = setTimeout(function() {document.addEventListener("pointerlockchange", Game.pointerRelease);}, 121);
    }
    static pointerRelease(_event) {
        clearTimeout(Game.pointerLockFunction);
        document.removeEventListener("pointerlockchange", Game.pointerRelease);
        document.exitPointerLock();
        Game.engine.isPointerLock = false;
    }
    static chatParse(_string) {
        if (_string.slice(0, 1) == "/") {
            return Game.chatCommands(_string.slice(1));
        }
        else {
            return Game.gui.chatOutputAppend(`${new Date().toLocaleTimeString({ hour12: false })} ${Game.player.name}: ${_string}`);
        }
    }
    static chatCommands(_command, ..._param) {
        if (_command == undefined || typeof _command != "string") {
            return undefined;
        }
        if (_command.slice(0, 1) == "/") {
            _command = _command.slice(1);
        }
        _command = String(_command).toLowerCase();
        let _commandSplit = _command.split(" ");
        if (_commandSplit.length == 0) {
            _commandSplit.push("help");
        }
        switch (_commandSplit[0]) {
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
                let _money = Tools.filterInt(_commandSplit[1]) || 1;
                Game.player.addMoney(_money);
                Game.gui.chatOutputAppend(`Added \$${_money} to your wallet.`);
                break;
            }
            case "setmoney" : {
                let _money = Tools.filterInt(_commandSplit[1]) || 1;
                Game.player.setMoney(_money);
                Game.gui.chatOutputAppend(`Set your wallet to \$${_money}.`);
                break;
            }
            case "getmoney" : {
                Game.gui.chatOutputAppend(`You have \$${Game.player.getMoney()} in your wallet.`);
                break;
            }
            case "kill" : {
                let _target = Game.player;
                if (typeof _commandSplit[1] == "string" && Game.hasCharacterEntity(_commandSplit[1])) {
                    _target = Game.getCharacterEntity(_commandSplit[1]);
                }
                _target.setHealth(0);
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
                Game.gui.chatOutputAppend(`Command "${_command}" not found.\n`);
                return;
            }
        }
    }
    static updateCameraTarget() {
        if (!(Game.camera instanceof BABYLON.ArcRotateCamera)) {
            return null;
        }
        if (!Game.player.hasController() || !Game.player.getController().hasMesh() || !Game.player.getController().hasSkeleton()) {
            return null;
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
    }
    static doEntityAction(_entity, _subEntity = Game.player, _action) {
        if (!(_entity instanceof AbstractEntity)) {
            _entity = Game.getInstancedItemEntity(_entity) || Game.getEntity(_entity);
            if (!(_entity instanceof AbstractEntity)) {
                return 2;
            }
        }
        if (!(_subEntity instanceof AbstractEntity)) {
            _subEntity = Game.getInstancedItemEntity(_subEntity) || Game.getEntity(_subEntity);
            if (!(_subEntity instanceof AbstractEntity)) {
                return 2;
            }
        }
        if (_action instanceof ActionData) {
            _action = _action.action;
        }
        if (Game.debugMode) console.log(`Running Game::doEntityAction(${_entity.id}, ${_subEntity.id}, ${_action.action})`);
        switch (_action) {
            case ActionEnum.USE: {
                if (_entity instanceof LightingEntity) {
                    _entity.toggle();
                }
                break;
            }
            case ActionEnum.LAY: {
                Game.actionLayFunction(_entity, _subEntity);
                break;
            }
            case ActionEnum.SIT: {
                Game.actionSitFunction(_entity, _subEntity);
                break;
            }
            case ActionEnum.TAKE: {
                if (_entity instanceof InstancedItemEntity) {
                    Game.actionTakeFunction(_entity, _subEntity);
                }
                break;
            }
            case ActionEnum.OPEN: {
                if (_entity instanceof DoorEntity || _entity instanceof FurnitureEntity || _entity instanceof InstancedFurnitureEntity) {
                    Game.actionOpenFunction(_entity, _subEntity);
                }
                break;
            }
            case ActionEnum.CLOSE: {
                if (_entity instanceof DoorEntity || _entity instanceof FurnitureEntity || _entity instanceof InstancedFurnitureEntity) {
                    Game.actionCloseFunction(_entity, _subEntity);
                }
                break;
            }
            case ActionEnum.TALK: {
                if (_entity instanceof CharacterEntity) {
                    Game.actionTalkFunction(_entity, _subEntity);
                }
                break;
            }
            case ActionEnum.ATTACK: {
                if (_entity instanceof AbstractEntity) {
                    Game.actionAttackFunction(_entity, _subEntity);
                }
                break;
            }
            default: {
                
            }
        }
        return 0;
    }
    static actionTakeFunction(_instancedItemEntity, _subEntity = Game.player) {
        if (!(_instancedItemEntity instanceof AbstractEntity)) {
            return 2;
        }
        if (!(_subEntity instanceof EntityWithStorage)) {
            return 2;
        }
        if (_subEntity.addItem(_instancedItemEntity) == 0) {
            Game.removeItemInSpace(_instancedItemEntity);
        }
        return 0;
    }
    static actionAttackFunction(_entity, _subEntity = Game.player) {
        if (!(_entity instanceof AbstractEntity)) {
            _entity = null;
        }
        if (!(_subEntity instanceof CharacterEntity)) {
            return 2;
        }
        if (_subEntity instanceof CharacterEntity && _subEntity.hasController()) {
            if (_subEntity.controller.doPunchRH()) {
                _subEntity.subtractStamina(2); // TODO: weapon weight or w/e subtracts more stamina
            }
        }
        if (_entity instanceof CharacterEntity) {
            if (Game.withinRange(_subEntity, _entity) && Game.inFrontOf(_subEntity, _entity)) {
                _entity.kill();
                Game.playSound("hit");
            }
        }
        return 0;
    }
    static actionDropFunction(_instancedItemEntity, _subEntity = Game.player, _callback = undefined) {
        if (!(_instancedItemEntity instanceof AbstractEntity)) {
            return 2;
        }
        if (!(_subEntity instanceof EntityWithStorage)) {
            return 2;
        }
        if (!_subEntity.hasItem(_instancedItemEntity)) {
            return 1;
        }
        if (_subEntity instanceof CharacterController && _subEntity.hasEquipment(_instancedItemEntity)) {
            if (_subEntity.unequip(_instancedItemEntity) != 0) {
                if (typeof _callback == "function") {
                    _callback();
                }
                return 0;
            }
        }
        if (_subEntity.removeItem(_instancedItemEntity) == 0) {
            if (_subEntity == Game.player) {
                Game.gui.updateInventoryMenuWith(_subEntity);
            }
            else if (_entity == Game.player) {
                Game.gui.updateInventoryMenuWith(_entity);
            }
            if (_instancedItemEntity.hasController() && _instancedItemEntity.getController().hasMesh()) { // it shouldn't have an EntityController :v but just in case
                _instancedItemEntity.setParent(null);
                _instancedItemEntity.position = _subEntity.getController().getMesh().position.clone.add(
                    new BABYLON.Vector3(0, Game.getMesh(_instancedItemEntity.getMeshID()).getBoundingInfo().boundingBox.extendSize.y, 0)
                );
            }
            else {
                Game.createItemInstance(undefined, _instancedItemEntity, undefined, _subEntity.getController().getMesh().position.clone(), _subEntity.getController().getMesh().rotation.clone());
            }
        }
        if (typeof _callback == "function") {
            _callback();
        }
        return 0;
    }
    static actionCloseFunction(_entity, _subEntity = Game.player) {
        if (!(_entity instanceof AbstractEntity) || !(_entity.getController() instanceof EntityController)) {
            return 2;
        }
        if (!(_subEntity instanceof CharacterEntity)) {
            return 2;
        }
        if (_entity.getController() instanceof FurnitureController) {
            _entity.getController().currAnim = _entity.getController().closed;
            _entity.getController().beginAnimation(_entity.getController().close);
            _entity.setDefaultAction(ActionEnum.OPEN);
            _entity.addHiddenAvailableAction(ActionEnum.CLOSE);
            _entity.removeHiddenAvailableAction(ActionEnum.OPEN);
        }
        else if (_entity.getController() instanceof DoorController) {
            _entity.setClose();
            Game.playSound("openDoor");
        }
        return 0;
    }
    static actionHoldFunction(_instancedItemEntity, _subEntity = Game.player, _callback = undefined) {
        if (!(_instancedItemEntity instanceof AbstractEntity)) {
            return 2;
        }
        if (!(_subEntity instanceof EntityWithStorage)) {
            return 2;
        }
        if (!_subEntity.hasItem(_instancedItemEntity)) {
            if (typeof _callback == "function") {
                _callback();
            }
            return 1;
        }
        if (_subEntity instanceof CharacterEntity) {
            if (_subEntity.hold(_instancedItemEntity) != 0) {
                return 1
            }
        }
        if (typeof _callback == "function") {
            _callback(_instancedItemEntity, undefined, _subEntity);
        }
        return 0;
    }
    static actionEquipFunction(_instancedItemEntity, _subEntity = Game.player, _callback = undefined) {
        if (!(_instancedItemEntity instanceof AbstractEntity)) {
            return 2;
        }
        if (!(_subEntity instanceof EntityWithStorage)) {
            return 2;
        }
        if (!_subEntity.hasItem(_instancedItemEntity)) {
            if (typeof _callback == "function") {
                _callback();
            }
            return 1;
        }
        if (_subEntity instanceof CharacterEntity) {
            if (_subEntity.equip(_instancedItemEntity) != 0) {
                return 1;
            }
        }
        if (typeof _callback == "function") {
            _callback(_instancedItemEntity, undefined, _subEntity);
        }
        return 0;
    }
    static actionUnequipFunction(_instancedItemEntity, _subEntity = Game.player, _callback = undefined) {
        if (!(_instancedItemEntity instanceof AbstractEntity)) {
            return 2;
        }
        if (!(_subEntity instanceof EntityWithStorage)) {
            return 2;
        }
        if (!_subEntity.hasItem(_instancedItemEntity)) {
            if (typeof _callback == "function") {
                _callback();
            }
            return 1;
        }
        if (_subEntity instanceof CharacterEntity) {
            if (_subEntity.unequip(_instancedItemEntity) != 0) {
                return 1;
            }
        }
        if (typeof _callback == "function") {
            _callback(_instancedItemEntity, undefined, _subEntity);
        }
        return 0;
    }
    static actionReleaseFunction(_instancedItemEntity, _subEntity = Game.player, _callback = undefined) {
        if (!(_instancedItemEntity instanceof AbstractEntity)) {
            return 2;
        }
        if (!(_subEntity instanceof EntityWithStorage)) {
            return 2;
        }
        if (!_subEntity.hasItem(_instancedItemEntity)) {
            if (typeof _callback == "function") {
                _callback();
            }
            return 1;
        }
        if (_subEntity instanceof CharacterEntity) {
            if (_subEntity.unequip(_instancedItemEntity) != 0) {
                return 1;
            }
        }
        if (typeof _callback == "function") {
            _callback(_instancedItemEntity, undefined, _subEntity);
        }
        return 0;
    }
    static actionOpenFunction(_entity, _subEntity = Game.player) {
        if (!(_entity instanceof AbstractEntity) || !(_entity.getController() instanceof EntityController)) {
            return 2;
        }
        if (!(_subEntity instanceof CharacterEntity)) {
            return 2;
        }
        if (_entity.getController() instanceof DoorController) {
            if (_entity.getLocked()) {
                if (!_subEntity.hasItem(_entity.getKey())) {
                    return 1;
                }
                _entity.setLocked(false);
            }
            _entity.setOpen();
            Game.playSound("openDoor");
        }
        else if (_entity.getController() instanceof FurnitureController) {
            _entity.getController().currAnim = _entity.getController().opened;
            _entity.getController().beginAnimation(_entity.getController().open);
            _entity.setDefaultAction(ActionEnum.CLOSE);
            _entity.addHiddenAvailableAction(ActionEnum.OPEN);
            _entity.removeHiddenAvailableAction(ActionEnum.CLOSE);
        }
        return 0;
    }
    static actionUseFunction(_entity, _subEntity = Game.player) {
        if (!(_entity instanceof AbstractEntity) || !(_entity.getController() instanceof EntityController)) {
            return 2;
        }
        if (!(_subEntity instanceof CharacterEntity)) {
            return 2;
        }
        if (_entity.getController() instanceof LightingController) {
            _entity.getController().toggle();
        }
        return 0;
    }
    static actionLayFunction(_entity, _subEntity = Game.player) {
        if (!(_entity instanceof AbstractEntity) || !(_entity.getController() instanceof EntityController)) {
            return 2;
        }
        if (!(_subEntity instanceof CharacterEntity) || !(_subEntity.getController() instanceof CharacterController)) {
            return 2;
        }
        var _seatingBoundingBox = Game.getMesh(_entity.getController().getMesh().name).getBoundingInfo().boundingBox;
        var _seatingWidth = (_seatingBoundingBox.extendSize.x * _entity.getController().getMesh().scaling.x);
        _subEntity.getController().setParent(_entity.getController().getMesh());
        _subEntity.getController().getMesh().position.set(_seatingWidth / 2, 0.4, -0.0125);
        _subEntity.getController().getMesh().rotation.set(0,0,0);
        return 0;
    }
    /**
     * Places the subEntity near the Entity, and sets its parent to the Entity
     * TODO: Add actual placement of Characters based on their width
     * @param  {FurnitureEntity} _entity    Furniture
     * @param  {EntityController} _subEntity    Entity to be placed
     */
    static actionSitFunction(_entity, _subEntity = Game.player) {
        if (!(_entity instanceof AbstractEntity) || !(_entity.getController() instanceof FurnitureController)) {
            return 2;
        }
        if (!(_subEntity instanceof CharacterEntity) || !(_subEntity.getController() instanceof CharacterController)) {
            return 2;
        }
        var _seatingBoundingBox = Game.getMesh(_entity.getController().getMesh().name).getBoundingInfo().boundingBox;
        var _seatingWidth = (_seatingBoundingBox.extendSize.x * _entity.getController().getMesh().scaling.x);
        _subEntity.getController().setParent(_entity.getController().getMesh());
        _subEntity.getController().getMesh().position.set(_seatingWidth / 2, 0.4, -0.0125);
        _subEntity.getController().getMesh().rotation.set(0,0,0);
        if (_subEntity == Game.player && Game.camera.radius <= 0.5 && Game.enableFirstPerson) {
            Game.camera.alpha = _entity.getController().getMesh().rotation.y - BABYLON.Tools.ToRadians(90);
        }
        return 0;
    }
    static actionTalkFunction(_entity, _subEntity = Game.player) {
        if (Game.debugMode) console.log(`Running Game::actionTalkFunction(${_entity.id}, ${_subEntity.id})`);
        if (!(_entity instanceof CharacterEntity)) {
            return 2;
        }
        if (!(_subEntity instanceof CharacterEntity)) {
            return 2;
        }
        if (!(_entity.getDialogue() instanceof Dialogue)) {
            return 2;
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
        return 0;
    }
    static setEntityController(_id, _entityController) {
        Game.entityControllers[_id] = _entityController;
    }
    static removeEntityController(_id) {
        delete Game.entityControllers[_id];
    }
    static clearControllers() {
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
    static setMeshToEntityController(_mesh, _entityController) {
        if (_mesh instanceof BABYLON.AbstractMesh) {
            _mesh = _mesh.id;
        }
        Tools.filterID(_mesh);
        if (!(_entityController instanceof EntityController)) {
            return;
        }
        Game.meshToEntityController[_mesh] = _entityController;
    }
    static getMeshToEntityController(_mesh) {
        if (_mesh instanceof BABYLON.AbstractMesh) {
            _mesh = _mesh.id;
        }
        Tools.filterID(_mesh);
        return Game.meshToEntityController[_mesh];
    }
    static removeMeshToEntityController(_mesh) {
        if (_mesh instanceof BABYLON.AbstractMesh) {
            _mesh = _mesh.id;
        }
        Tools.filterID(_mesh);
        delete Game.meshToEntityController[_mesh];
    }
    static clearMeshToEntityControllers() {
        Game.meshToEntityController = {};
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
    static hasSpell(_id) {
        return Game.hasSpellEntity(_id);
    }
    static hasSpellEntity(_id) {
        return Game.spellEntities.hasOwnProperty(_id);
    }
    static getSpell(_id) {
        return Game.getSpellEntity(_id);
    }
    static getSpellEntity(_id) {
        if (Game.hasSpellEntity(_id)) {
            return Game.spellEntities[_id];
        }
        return null;
    }
    static setEssentialEntity(_entity) {
        if (!(_entity instanceof AbstractEntity)) {
            _entity = Game.getInstancedEntity(_entity) || Game.getEntity(_entity);
        }
        if (!(_entity instanceof AbstractEntity)) {
            return null;
        }
        _entity.setEssential(true);
        Game.essentialEntities.add(_entity)
    }
    static removeEssentialEntity(_entity) {
        if (!(_entity instanceof AbstractEntity)) {
            _entity = Game.getInstancedEntity(_entity) || Game.getEntity(_entity);
        }
        if (!(_entity instanceof AbstractEntity)) {
            return null;
        }
        _entity.setEssential(false);
        Game.essentialEntities.delete(_entity);
    }
    static clearEssentialEntities() {
        Game.essentialEntities.forEach(function(_entity) {
            if (_entity instanceof AbstractEntity) {
                _entity.setEssential(false);
            }
        });
        Game.essentialEntities.clear();
    }

    static setEntityInstance(_id, _instancedEntity) {
        Game.instancedEntities[_id] = _instancedEntity;
    }
    static removeEntityInstance(_id) {
        delete Game.instancedEntities[_id];
    }
    static clearEntityInstances() {
        for (var _i in Game.instancedEntities) {
            Game.instancedEntities[_i].dispose();
        }
        Game.instancedEntities = {};
    }
    static setItemInstance(_id, _instancedItemEntity) {
        Game.instancedItemEntities[_id] = _instancedItemEntity;
    }
    static removeItemInstance(_id) {
        delete Game.instancedItemEntities[_id];
    }
    static clearItemInstances() {
        for (var _i in Game.instancedItemEntities) {
            Game.instancedItemEntities[_i].dispose();
        }
        Game.instancedItemEntities = {};
    }
    static setClothingInstance(_id, _instancedClothingEntity) {
        Game.instancedClothingEntities[_id] = _instancedClothingEntity;
    }
    static removeClothingInstance(_id) {
        delete Game.instancedClothingEntities[_id];
    }
    static clearClothingInstances() {
        for (var _i in Game.instancedClothingEntities) {
            Game.instancedClothingEntities[_i].dispose();
        }
        Game.instancedClothingEntities = {};
    }
    static setWeaponInstance(_id, _instancedWeaponEntity) {
        Game.instancedWeaponEntities[_id] = _instancedWeaponEntity;
    }
    static removeWeaponInstance(_id) {
        delete Game.instancedWeaponEntities[_id];
    }
    static clearWeaponInstances() {
        for (var _i in Game.instancedWeaponEntities) {
            Game.instancedWeaponEntities[_i].dispose();
        }
        Game.instancedWeaponEntities = {};
    }
    static setFurnitureInstance(_id, _instancedFurnitureEntity) {
        Game.instancedFurnitureEntities[_id] = _instancedFurnitureEntity;
    }
    static removeFurnitureInstance(instancedFurnitureEntity) {
        delete Game.instancedFurnitureEntities[instancedFurnitureEntity];
    }
    static clearFurnitureInstances() {
        for (var _i in Game.instancedFurnitureEntities) {
            Game.instancedFurnitureEntities[_i].dispose();
        }
        Game.instancedFurnitureEntities = {};
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
    static setGodMode(characterEntity = Game.player, godMode = true) {
        godMode = godMode == true;
        if (characterEntity instanceof CharacterEntity) {
            characterEntity.setGodMode(godMode);
        }
        Game.godMode = godMode;
        return 0;
    }
    static enableGodMode() {
        return Game.setGodMode(Game.player, true);
    }
    static disableGodMode() {
        return Game.setGodMode(Game.player, false);
    }
    static setDebugMode(_bool) {
        Game.debugMode = _bool == true;
    }
    static enableDebugMode() {
        return Game.setDebugMode(true);
    }
    static disableDebugMode() {
        return Game.setDebugMode(false);
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
        return Game.Tools.areVectorsClose(entityA.controller.mesh.position, entityB.controller.mesh.position, distance);
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