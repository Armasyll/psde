class Game {
    constructor() {
        this.initialized = false;
        Game.debugMode = false;
        Game.godMode = false;
    }
    static initialize() {
        Game.SECONDS_IN_DAY = 86400;
        Game.SECONDS_IN_HOUR = 3600;
        Game.RAD_0 = 0.0;
        Game.RAD_1_HALF = BABYLON.Tools.ToRadians(1/2);
        Game.RAD_1_3RD = BABYLON.Tools.ToRadians(1/3);
        Game.RAD_1_4TH = BABYLON.Tools.ToRadians(1/4);
        Game.RAD_1 = BABYLON.Tools.ToRadians(1);
        Game.RAD_45 = BABYLON.Tools.ToRadians(45);
        Game.RAD_90 = BABYLON.Tools.ToRadians(90);
        Game.RAD_135 = BABYLON.Tools.ToRadians(135);
        Game.RAD_180 = BABYLON.Tools.ToRadians(180);
        Game.RAD_225 = BABYLON.Tools.ToRadians(225);
        Game.RAD_270 = BABYLON.Tools.ToRadians(270);
        Game.RAD_315 = BABYLON.Tools.ToRadians(315);
        Game.RAD_360 = 6.28318529;
        Game.startTime = new Date("2017-07-03T17:35:00.000Z");
        Game.currentTime = new Date(Game.startTime);
        Game.initialized = false;
        Game.useRigidBodies = false;
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
         * eg, {"foxM":"resources/meshes/characters/fox.babylon"}
         * @type {<string, String>}
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
            "sack01":"resources/data/items.babylon",
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
            "stairsCollision":"resources/data/craftsmanWalls.babylon",
            "aardwolfM":"resources/meshes/characters/aardwolf.babylon",
            "spiritN":"resources/meshes/characters/spiritN.babylon",
            "foxF":"resources/meshes/characters/fox.babylon",
            "foxSkeletonN":"resources/meshes/characters/foxSkeletonN.babylon",
            "foxM":"resources/meshes/characters/fox.babylon",
            "hitbox.canine":"resources/meshes/hitboxes/canine.babylon",
            "hitbox.canine.head":"resources/meshes/hitboxes/canine.babylon",
            "hitbox.canine.neck":"resources/meshes/hitboxes/canine.babylon",
            "hitbox.canine.chest":"resources/meshes/hitboxes/canine.babylon",
            "hitbox.canine.upperArm.l":"resources/meshes/hitboxes/canine.babylon",
            "hitbox.canine.forearm.l":"resources/meshes/hitboxes/canine.babylon",
            "hitbox.canine.hand.l":"resources/meshes/hitboxes/canine.babylon",
            "hitbox.canine.upperArm.r":"resources/meshes/hitboxes/canine.babylon",
            "hitbox.canine.forearm.r":"resources/meshes/hitboxes/canine.babylon",
            "hitbox.canine.hand.r":"resources/meshes/hitboxes/canine.babylon",
            "hitbox.canine.spine":"resources/meshes/hitboxes/canine.babylon",
            "hitbox.canine.pelvis":"resources/meshes/hitboxes/canine.babylon",
            "hitbox.canine.this.l":"resources/meshes/hitboxes/canine.babylon",
            "hitbox.canine.shin.l":"resources/meshes/hitboxes/canine.babylon",
            "hitbox.canine.foot.l":"resources/meshes/hitboxes/canine.babylon",
            "hitbox.canine.this.r":"resources/meshes/hitboxes/canine.babylon",
            "hitbox.canine.shin.r":"resources/meshes/hitboxes/canine.babylon",
            "hitbox.canine.foot.r":"resources/meshes/hitboxes/canine.babylon",
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
            "mushroom02":"resources/meshes/nature.babylon",
            "mushroom03":"resources/meshes/nature.babylon",
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
            "sword01Broken00":"resources/meshes/weapons.babylon",
            "sword01Broken01":"resources/meshes/weapons.babylon",
            "sword01Broken02":"resources/meshes/weapons.babylon",
            "sword01Broken03":"resources/meshes/weapons.babylon",
            "scythe03":"resources/meshes/weapons.babylon",
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
            "apple01":"resources/meshes/fruits.babylon",
            "dekuShield":"resources/meshes/items/dekuShield.babylon",
            "kokiriSword":"resources/meshes/items/kokiriSword.babylon"
        };
        /**
         * Map of Meshes per ID
         * eg, {"ring01":{ring01 Mesh}, "ring02":{...}}
         * @type {<string, BABYLON.Mesh>}
         */
        Game.loadedMeshes = {};
        /**
         * Map of Texture file locations per ID
         * eg, {"foxRed":"resources/images/textures/characters/foxRed.svg"}
         * @type {<string, String>}
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
            "oblongEyeViolet":"resources/images/textures/items/oblongEyeViolet.svg",
            "dekuShield":"resources/images/textures/items/dekuShield.png",
            "kokiriSword":"resources/images/textures/items/kokiriSword.svg"
        };
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
        /**
         * Map of Icon file locations per ID
         * eg, {"rosie":"resources/images/icons/characters/rosie.png"}
         * @type {<string, String>}
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
         * Map of Sound file locations per ID; one to one
         * eg, {"openDoor":"resources/sounds/Open Door.mp3"}
         * @type {<string, String>}
         */
        Game.soundLocations = {
            "openDoor":"resources/sounds/Open Door.mp3",
            "hit":"resources/sounds/Hit.mp3",
            "slice":"resources/sounds/Slice.mp3"
        };
        /**
         * Map of Sounds per ID; one to one
         * @type {<string, BABYLON.Sound>}
         */
        Game.loadedSounds = {};
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
        /**
         * Map of Meshes that are waiting to be created; one to many
         * @type {<string, <Objects...>>}
         */
        Game.meshesToCreate = {};
        Game.meshesToCreateCounter = 0;
        Game.texturesToCreate = {};
        Game.texturesToCreateCounter = 0;
        Game.materialsToCreate = {};
        Game.materialsToCreateCounter = 0;
        /**
         * Map of Furniture that are waiting to be created
         * @type {<string, <string:id, String:name, String:mesh, String:texture, String:type, String:position, String:rotation, String:scaling, object:options>}
         */
        Game.furnitureToCreateCounter = 0;
        Game.furnitureToCreate = {};
        /**
         * Map of Lighting that are waiting to be created;
         * it's basically the same as furnitureToCreate :v
         * @type {<string, <string:id, String:name, String:mesh, String:texture, String:type, String:position, String:rotation, String:scaling, object:options>}
         */
        Game.lightingToCreateCounter = 0;
        Game.lightingToCreate = {};
        /**
         * Map of Doors that are waiting to be created;
         * it's basically the same as furnitureToCreate :v
         * @type {<string, <string:id, String:name, Forgot:to, String:mesh, String:texture, String:position, String:rotation, String:scaling, object:options>}
         */
        Game.doorsToCreateCounter = 0;
        Game.doorsToCreate = {};
        /**
         * Map of Characters that are waiting to be created;
         * it's basically the same as furnitureToCreate :v
         * @type {<string, <string:id, String:name, String:description, String:icon, Number:age, Number:sex, String:species, String:mesh, String:texture, String:options, String:rotation, String:scaling, object:options>}
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

        Game.essentialEntities = new Set();

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
        };
        Game.meshProperties = {
            "animatedCoffin01": {
                usableArea: [
                    [new BABYLON.Vector3(-0.1995, 0.011719, -1.101), new BABYLON.Vector3(1.1995, 0.011719, 1.101)]
                ]
            },
            "chair01": {
                usableArea: [
                    [new BABYLON.Vector3(-0.44505, 0.375, -0.525), new BABYLON.Vector3(0.44505, 0.375, 0.1725)]
                ]
            },
            "chair02": {
                usableArea: [
                    [new BABYLON.Vector3(-0.312497, 0.375, -0.385357), new BABYLON.Vector3(0.312497, 0.375, 0.122455)]
                ]
            },
            "chair03": {
                usableArea: [
                    [new BABYLON.Vector3(-0.312497, 0.375, -0.385357), new BABYLON.Vector3(0.312497, 0.375, 0.122455)]
                ]
            },
            "coffin01": {
                usableArea: [
                    [new BABYLON.Vector3(-0.1995, 0.011719, -1.101), new BABYLON.Vector3(1.1995, 0.011719, 1.101)]
                ]
            },
            "couch01": {
                usableArea: [
                    [new BABYLON.Vector3(-1.2888, 0.375, -0.525), new BABYLON.Vector3(1.2888, 0.375, 0.1725)], // Cushions
                    [new BABYLON.Vector3(-1.4808, 0.675, -0.54), new BABYLON.Vector3(-1.2888, 0.675, 0.1875)], // Left arm
                    [new BABYLON.Vector3(1.2888, 0.675, -0.54), new BABYLON.Vector3(1.4808, 0.675, 0.1875)] // Right arm
                ]
            },
            "couch02": {
                usableArea: [
                    [new BABYLON.Vector3(-1.2888, 0.375, -0.525), new BABYLON.Vector3(1.2888, 0.375, 0.1725)],
                    [new BABYLON.Vector3(-1.4808, 0.675, -0.54), new BABYLON.Vector3(-1.2888, 0.675, 0.1875)],
                    [new BABYLON.Vector3(1.2888, 0.675, -0.54), new BABYLON.Vector3(1.4808, 0.675, 0.1875)]
                ]
            },
            "lovesea01": {
                usableArea: [
                    [new BABYLON.Vector3(-0.82005, 0.375, -0.525), new BABYLON.Vector3(0.82005, 0.375, 0.1725)]
                ]
            },
            "mattress01": {
                usableArea: [
                    [new BABYLON.Vector3(-0.575258, 0.195, -1.10144), new BABYLON.Vector3(0.575258, 0.195, 0.195)]
                ]
            },
            "bedMattressFrame01": {
                usableArea: [
                    [new BABYLON.Vector3(-0.575258, 0.375, -1.10144), new BABYLON.Vector3(0.575258, 0.375, 0.195)]
                ]
            }
        };

        Game._finishedInitializing = false;
        Game._finishedConfiguring = false;

        Game.player = null;
        Game.playerController = null;
        Game.playerCell = null;
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
        Game.highlightedController = undefined;

        Game.xhr = new XMLHttpRequest();
        Game.parser = new DOMParser();
        Game.serializer = new XMLSerializer();
        Game.loadDefaultTextures();
        Game.loadDefaultMaterials();
        Game.loadDefaultMeshes();
        Game.loadDefaultSounds();
        Game.loadDefaultItems();

        Game.skybox = BABYLON.MeshBuilder.CreateBox("skybox", {size:2048.0}, Game.scene);

        /*
            Which function handles the function of the key presses;
            controlerCharacter, controlMenu
         */
        Game.controls = AbstractControls;
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
        // TODO: add support for other GUIs (that aren't created yet :v, like HTML instead of BABYLON.GUI)
        Game.gui = GameGUI;
        Game.gui.initialize();
        Game.initFreeCamera();
        Game.initQwertyKeyboardControls();
        Game.initPostProcessing();
        window.addEventListener("click", Game.controls.onClick);
        window.addEventListener("mousedown", Game.controls.onMouseDown);
        window.addEventListener("mouseup", Game.controls.onMouseUp);
        window.addEventListener("contextmenu", Game.controls.onContext);

        Game.tickWorker = new Worker("resources/js/workers/tick.worker.js");
        Game.tickWorker.onmessage = function(e) {
            //console.log(e.data);
        }
        Game.entityLocRotWorker = new Worker("resources/js/workers/entityLocationRotation.worker.js");
        Game.entityLocRotWorker.onmessage = function(e) {
            //console.log(e.data);
        }
        Game.gameTimeMultiplier = 10;
        Game.roundTime = 6;
        Game.turnTime = 60;
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
                    Game.importMaterials();
                    Game.importTraits();
                    Game.importItems();
                    Game.importCosmetics();
                    Game.importFurniture();
                    Game.importCharacters();
                    Game._finishedInitializing = true;

                    Game.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
                        Game.controls.onKeyDown(evt.sourceEvent);
                    }));
                    Game.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
                        Game.controls.onKeyUp(evt.sourceEvent);
                    }));
                }
                else {
                    Client.initialize();
                    Game.gui.resize();
                    Game._finishedConfiguring = true;
                }
            }
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
        for (let characterController in CharacterController.characterControllerList) {
            if (CharacterController.characterControllerList[characterController]._isAnimated) {
                CharacterController.characterControllerList[characterController].moveAV();
                if (CharacterController.characterControllerList[characterController].propertiesChanged) {
                    CharacterController.characterControllerList[characterController].updateProperties();
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
        if (Game.playerCell instanceof Cell && Game.playerCell.hasBackloggedAdditions) {
            Game.playerCell.createBackloggedAdditions();
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
        if (CharacterEntity.has(characterID)) {
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
            if (!CharacterEntity.has(Game.playerToCreate)) {
                return 2;
            }
            if (Game.assignPlayer(CharacterEntity.get(Game.playerToCreate)) == 0) {
                Game.removePlayerToCreate();
            }
        }
        return 0;
    }
    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} [description] 
     * @param {string} [iconID] Icon ID
     * @param {number} age 
     * @param {SexEnum} sex 
     * @param {SpeciesEnum} species 
     * @param {string} meshID Mesh ID
     * @param {string} [materialID] Material ID
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} [rotation] 
     * @param {BABYLON.Vector3} [scaling] 
     * @param {object} [options] 
     */
    static createPlayer(id = "", name = "", description = "", iconID = undefined, age = 18, sex = SexEnum.MALE, species = SpeciesEnum.FOX, meshID = "missingMesh", materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        if (Game.debugMode) console.log("Running createPlayer");
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        let characterEntity = Game.createCharacterEntity(id, name, description, iconID, age, sex, species, meshID, materialID, options);
        let characterController = Game.createCharacterInstance(id, characterEntity, position, rotation, scaling, options);
        if (characterController instanceof CharacterEntity && characterController.hasController() && characterController.getController().hasMesh()) {
            Game.assignPlayer(characterEntity);
        }
        else {
            Game.addPlayerToCreate(id);
        }
        return 0;
    }
    /**
     * 
     * @param {CharacterEntity} characterEntity 
     */
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
        Game.playerController = Game.player.getController();
        Game.player.getController().attachToFOCUS(Game.cameraFocus); // and reassigning an instanced mesh without destroying it
        Game.player.getController().getMesh().isPickable = false;
        Game.gui.playerPortrait.set(Game.player);
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
     * Loads and creates an XML(SVG)Document
     * @param {string} imageID Image ID to load, and set the new XML(SVG)Document to
     * @returns {number} Integer status code
     */
    static loadSVG(imageID) {
        Game.xhr.open("GET", Game.textureLocations[imageID], true);
        Game.xhr.overrideMimeType("image/svg+xml");
        Game.xhr.onload = (e) => {
            if (e.target.status == 200) {
                Game.loadedSVGDocuments[imageID] = Game.parser.parseFromString(e.target.response, "image/svg+xml");
            }
            else {
                Game.textureLocations[imageID] = Game.textureLocations["missingTexture"];
            }
        };
        Game.xhr.onerror = (e) => {
            if (e.target.status == 404) {
                Game.textureLocations[imageID] = Game.textureLocations["missingTexture"];
            }
        };
        Game.xhr.send();
        return 0;
    }
    /**
     * Modifies a given SVG Document, by ID, and create an IMG
     * @param {string} imageID SVG Document ID
     * @param {string} newImageID new Image ID
     * @param {object} elementStyles eg. {iris:{background:green}, sclera:{background:#fff}}
     * @returns 
     */
    static modifySVG(imageID, newImageID, elementStyles) {
        if (!Game.loadedSVGDocuments.hasOwnProperty(imageID)) {
            return 2;
        }
        let newSVGDocument = Game.loadedSVGDocuments[imageID].cloneNode(true);
        for (let element in elementStyles) {
            if (newSVGDocument.hasChildNodes(element)) {
                for (let style in elementStyles[element]) {
                    newSVGDocument.getElementById(element).style.setProperty(style, elementStyles[element][style]);
                }
            }
        }
        let markup = Game.serializer.serializeToString(newSVGDocument);
        let newImage = new Image();
        newImage.src = 'data:image/svg+xml,' + encodeURIComponent(markup);
        Game.loadedImages[newImageID] = newImage;
        return newImage;
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
            if (Game.debugMode) console.log(`Running Game::loadMesh(${meshID})`);
            switch (meshID) {
                case "aardwolfM":
                case "aardwolfF":
                case "foxM":
                case "foxF":
                case "foxSkeletonN": {
                    Game.importMeshes("resources/meshes/hitboxes/canine.babylon");
                }
            }
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
        mesh.isVisible = false;
        mesh.setEnabled(false);
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
        if (Game.debugMode) console.log(`Running Game::removeMeshMaterialMeshes(${meshID},${materialID},${childMeshID})`);
        Game.meshMaterialMeshes[meshID][materialID][childMeshID] = null;
        delete Game.meshMaterialMeshes[meshID][materialID][childMeshID];
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
    static importMaterials() {
        return Game.importScript("resources/js/materials.js");
    }
    static importTraits() {
        return Game.importScript("resources/js/traits.js");
    }
    static importItems() {
        return Game.importScript("resources/js/items.js");
    }
    static importCharacters() {
        return Game.importScript("resources/js/characters.js");
    }
    static importCosmetics() {
        return Game.importScript("resources/js/cosmetics.js");
    }
    static importFurniture() {
        return Game.importScript("resources/js/furniture.js");
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
    /**
     * 
     * @param {string} itemID 
     * @param {string} meshID 
     * @param {string} materialID 
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} rotation 
     * @param {BABYLON.Vector3} scaling 
     * @param {object} options 
     */
    static createItemMesh(itemID = undefined, meshID = "missingMesh", materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {createClone:false, checkCollisions: true}) {
        if (Game.debugMode) console.log("Running Game::createItemMesh");
        let instancedMesh = Game.createMesh(itemID, meshID, materialID, position, rotation, scaling, options);
        if (!(instancedMesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        if (Game.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(instancedMesh, options);
        }
        return instancedMesh;
    }
    /**
     * 
     * @param {string} furnitureID 
     * @param {string} meshID 
     * @param {string} materialID 
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} rotation 
     * @param {BABYLON.Vector3} scaling 
     * @param {object} options 
     */
    static createFurnitureMesh(furnitureID = undefined, meshID = "missingMesh", materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {createClone:false, checkCollisions: true}) {
        if (Game.debugMode) console.log("Running Game::createFurnitureMesh");
        let instancedMesh = Game.createMesh(furnitureID, meshID, materialID, position, rotation, scaling, options);
        if (!(instancedMesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        return instancedMesh;
    }
    /**
     * 
     * @param {string} characterID 
     * @param {string} meshID 
     * @param {string} materialID 
     * @param {BABYLON.Vector3} position 
     * @param {BABYLON.Vector3} rotation 
     * @param {BABYLON.Vector3} scaling 
     * @param {object} options 
     */
    static createCharacterMesh(characterID = undefined, meshID = "missingMesh", materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {createClone:false, checkCollisions: true}) {
        if (Game.debugMode) console.log(`Running Game::createCharacterMesh(${characterID}, ${meshID}, ${materialID})`);
        if (typeof options != "object") {
            options = {mass:0.8,restitution:0.1};
        }
        let instancedMesh = Game.createMesh(characterID, meshID, materialID, position, rotation, scaling, options);
        if (!(instancedMesh instanceof BABYLON.AbstractMesh)) {
            return 2;
        }
        if (Game.physicsEnabled) {
            Game.assignBoxPhysicsToMesh(instancedMesh, options);
        }
        else {
            if (options.hasOwnProperty("checkCollisions")) {
                //Game.assignBoxCollisionToMesh(instancedMesh);
                instancedMesh.checkCollisions = options["checkCollisions"] == true;
            }
            else {
                instancedMesh.checkCollisions = true;
            }
            /*
                Using X for Z size 'cause the tail throws my collision box size off
             */
            instancedMesh.ellipsoid.set(instancedMesh.getBoundingInfo().boundingBox.extendSize.x * scaling.x, instancedMesh.getBoundingInfo().boundingBox.extendSize.y * scaling.y, instancedMesh.getBoundingInfo().boundingBox.extendSize.x * scaling.z);
            instancedMesh.ellipsoidOffset.set(0, instancedMesh.ellipsoid.y, -0.1);
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
        if (!abstractMesh instanceof BABYLON.AbstractMesh) {
            return 2;
        }
        if (Game.debugMode) console.log(`Running Game::removeMesh(${abstractMesh.id}`);
        if (Game.meshMaterialMeshes.hasOwnProperty(abstractMesh.name)) {
            if (Game.meshMaterialMeshes[abstractMesh.name].hasOwnProperty(abstractMesh.material.name)) {
                abstractMesh = Game.meshMaterialMeshes[abstractMesh.name][abstractMesh.material.name][abstractMesh.id];
                Game.removeMeshMaterialMeshes(abstractMesh.name, abstractMesh.material.name, abstractMesh.id)
            }
        }
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
     * Filters the creation of a mesh from those stored in loadedMeshes
     * @param  {string} id New ID for BABYLON.Mesh and EntityController
     * @param  {string} meshID String ID of Mesh to create
     * @param  {string} [materialID] String ID of Material to apply to Mesh
     * @param  {BABYLON.Vector3} position Mesh position
     * @param  {BABYLON.Vector3} [rotation] Mesh rotation
     * @param  {BABYLON.Vector3} [scaling] Mesh scaling
     * @param  {object} [options] Options
     * @return {array}
     */
    static filterCreateMesh(id = "", meshID = "missingMesh", materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        if (Game.debugMode) console.log(`Running Game::filterCreateMesh(${id}, ${meshID}, ${materialID})`);
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
                if (Game.debugMode) console.log(`\tMaterial ${materialID} doesn't exist`);
                materialID = "missingMaterial";
            }
        }
        if (!Game.hasAvailableMesh(meshID) && !Game.hasLoadedMesh(meshID)) {
            if (Game.debugMode) console.log(`\tMesh ${meshID} doesn't exist`);
            meshID = "missingMesh";
        }
        return [id, meshID, materialID, position, rotation, scaling, options];
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
     * @return {BABYLON.AbstractMesh|array|number} The created mesh
     */
    static createMesh(id = "", meshID = "missingMesh", materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        if (typeof options != "object" || !options.hasOwnProperty("filtered")) {
            let filteredParameters = Game.filterCreateMesh(id, meshID, materialID, position, rotation, scaling, options);
            if (typeof filteredParameters == "number") {
                return 2;
            }
            [id, meshID, materialID, position, rotation, scaling] = filteredParameters;
        }
        if (meshID == "missingMesh") {
            return 1;
        }
        if (!Game.hasLoadedMaterial(materialID)) {
            if (Game.hasAvailableTexture(materialID)) {
                if (!Game.hasLoadedTexture(materialID)) {
                    Game.loadTexture(materialID);
                }
                Game.loadMaterial(materialID, materialID);
            }
            else if (Game.hasLoadedTexture(materialID)) {
                Game.loadMaterial(materialID, materialID);
            }
            else {
                materialID = "missingMaterial";
            }
        }
        if (meshID == "craftsmanStairs") {
            Game.createMesh(id + "-CollisionMesh", "stairsCollision", "collisionMaterial", position, rotation, scaling, {checkCollisions:true});
            options["checkCollisions"] = false;
        }
        if (!Game.hasLoadedMesh(meshID)) {
            if (Game.debugMode) console.log(`\tMesh ${meshID} exists and will be loaded`);
            Game.addMeshToCreate(id, meshID, materialID, position, rotation, scaling, options);
            return [id, meshID, materialID, position, rotation, scaling, options];
        }
        if (Game.debugMode) console.log(`\tMesh ${meshID} exists and is loaded`);
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
                if (Game.debugMode) console.log("Creating master clone of " + meshID + " with " + materialID);
                mesh.setEnabled(false);
                mesh.position.set(0,-4095,0);
                Game.setMeshMaterial(mesh, material);
            }
            if (options["createClone"]) {
                if (Game.debugMode) console.log("  Creating clone...");
                mesh = Game.loadedMeshMaterials[meshID][materialID].clone(id);
                mesh.id = id;
                mesh.material = material;
                mesh.name = meshID;
                Game.addClonedMesh(mesh, id);
                Game.addMeshMaterialMeshes(mesh.name, material.name, mesh);
            }
            else {
                if (Game.debugMode) console.log(`  Creating instance of Mesh:(${meshID}), Material:(${materialID})...`);
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
    /**
     * Creates a mesh from those stored in loadedMeshes
     * @param  {string} meshIndexID New ID for BABYLON.Mesh and EntityController
     * @param  {string} meshID String ID of Mesh to create
     * @param  {string} [materialID] String ID of Material to apply to Mesh
     * @param  {BABYLON.Vector3} position Mesh position
     * @param  {BABYLON.Vector3} [rotation] Mesh rotation
     * @param  {BABYLON.Vector3} [scaling] Mesh scaling
     * @param  {object} [options] Options
     * @return {BABYLON.AbstractMesh} The created mesh
     */
    static createCollidableMesh(meshIndexID = undefined, meshID = "missingMesh", materialID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        if (typeof options != "object") {
            options = {};
        }
        options["checkCollisions"] = true;
        return Game.createMesh(meshIndexID, meshID, materialID, position, rotation, scaling, options);
    }
    static addMeshToCreate(meshIndexID, meshID, materialID, position, rotation, scaling, options) {
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
            6:options
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
                    Game.meshesToCreate[i][6]
                );
                Game.removeMeshToCreate(i);
            }
        }
    }
    static addFurnitureToCreate(furnitureInstanceID, furnitureInstance = undefined, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        if (Game.hasFurnitureToCreate(furnitureInstanceID)) {
            return true;
        }
        if (!(furnitureInstance instanceof InstancedFurnitureEntity) && InstancedFurnitureEntity.has(furnitureInstance)) {
            furnitureInstance = InstancedFurnitureEntity.get(furnitureInstance);
        }
        Game.loadMesh(furnitureInstance.getMeshID());
        Game.furnitureToCreate[furnitureInstanceID] = {
            0:furnitureInstanceID,
            1:furnitureInstance,
            2:position,
            3:rotation,
            4:scaling,
            5:options
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
                    Game.furnitureToCreate[i][4],
                    Game.furnitureToCreate[i][5]
                );
                Game.removeFurnitureToCreate(i);
            }
        }
    }
    static addLightingToCreate(lightingIndexID, name = "", meshID = "missingMesh", textureID = "missingMaterial", lightingType = "", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {checkCollisions: true, lightPositionOffset: BABYLON.Vector3.Zero()}) {
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
            5:position,
            6:rotation,
            7:scaling,
            8:options
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
                    Game.lightingToCreate[i][8]
                );
                Game.removeLightingToCreate(i);
            }
        }
    }
    static addDoorsToCreate(doorIndexID, name = "", to = "", meshID = "missingMesh", textureID = "missingMaterial", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
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
            5:position,
            6:rotation,
            7:scaling,
            8:options
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
    static addCharacterToCreate(id, characterEntity, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        if (Game.hasCharacterToCreate(id)) {
            return true;
        }
        Game.loadMesh(characterEntity.getMeshID());
        Game.charactersToCreate[id] = {
            0:id,
            1:characterEntity,
            2:position,
            3:rotation,
            4:scaling,
            5:options
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
            if (Game.loadedMeshes.hasOwnProperty(Game.charactersToCreate[i][1].getMeshID())) {
                Game.createCharacterInstance(
                    Game.charactersToCreate[i][0],
                    Game.charactersToCreate[i][1],
                    Game.charactersToCreate[i][2],
                    Game.charactersToCreate[i][3],
                    Game.charactersToCreate[i][4],
                    Game.charactersToCreate[i][5]
                );
                Game.removeCharacterToCreate(i);
            }
        }
    }
    static addItemToCreate(itemIndexID, itemEntity = undefined, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        if (Game.hasItemToCreate(itemIndexID)) {
            return true;
        }
        Game.loadMesh(itemEntity.getMeshID());
        Game.itemsToCreate[itemIndexID] = {
            0:itemIndexID,
            1:itemEntity,
            2:position,
            3:rotation,
            4:scaling,
            5:options
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
    static addAttachmentToCreate(attachmentIndexID, attachToController, meshID, materialID, bone, position, rotation, scaling, options) {
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
            7:scaling,
            8:options
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
                        Game.attachmentsToCreate[i][7],
                        Game.attachmentsToCreate[i][8]
                    );
                }
                Game.removeAttachmentToCreate(i);
            }
        }
    }

    static importBabylon(file, callback = undefined) {
        BABYLON.SceneLoader.ImportMesh(
            undefined,
            file.substr(0, file.lastIndexOf("/")+1),
            file.substr(file.lastIndexOf("/")+1),
            Game.scene,
            function(meshes, particleSystems, skeletons) {
                if (typeof callback == "function") {
                    callback(meshes);
                }
            }
        );
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
        Entity.setID(Game.player.getID(), id);
    }
    static updateEntityID(currentID, newID) {
        if (!Entity.has(currentID)) {
            return 1;
        }
        let entity = Entity.get(currentID);
        if (entity.hasController()) {
            entity.getController().setLocked(true);
            entity.getController().setEnabled(false);
        }
        entity.setLocked(true);
        entity.setEnabled(false);
        if (entity instanceof AbstractEntity) {
            AbstractEntity.remove(currentID);
            if (entity instanceof Entity) {
                Entity.remove(currentID);
                if (entity instanceof CharacterEntity) {
                    CharacterEntity.remove(currentID);
                    CharacterEntity.set(newID, entity);
                }
                else if (entity instanceof DoorEntity) {
                    DoorEntity.remove(currentID);
                    DoorEntity.set(newID, entity);
                }
                else if (entity instanceof ItemEntity) {
                    ItemEntity.remove(currentID);
                    ItemEntity.set(newID, entity);
                    if (entity instanceof EquipmentEntity) {
                        /*EquipmentEntity.remove(currentID);
                        EquipmentEntity.set(newID, entity);*/
                        if (entity instanceof ClothingEntity) {
                            ClothingEntity.remove(currentID);
                            ClothingEntity.set(newID, entity);
                        }
                        else if (entity instanceof WeaponEntity) {
                            WeaponEntity.remove(currentID);
                            WeaponEntity.set(newID, entity);
                        }
                    }
                    else if (entity instanceof KeyEntity) {
                        KeyEntity.remove(currentID);
                        KeyEntity.set(newID, entity);
                    }
                }
                else if (entity instanceof FurnitureEntity) {
                    FurnitureEntity.remove(currentID);
                    FurnitureEntity.set(newID, entity);
                    if (entity instanceof LightingEntity) {
                        LightingEntity.remove(currentID);
                        LightingEntity.set(newID, entity);
                    }
                }
                else if (entity instanceof SpellEntity) {
                    SpellEntity.remove(currentID);
                    SpellEntity.set(newID, entity);
                }
                entity.setID(newID);
                Entity.set(newID, entity);
            }
            else if (entity instanceof InstancedEntity) {
                InstancedEntity.remove(currentID);
                if (entity instanceof InstancedFurnitureEntity) {
                    InstancedFurnitureEntity.remove(currentID);
                    InstancedFurnitureEntity.set(newID, entity);
                }
                else if (entity instanceof InstancedItemEntity) {
                    InstancedItemEntity.remove(currentID);
                    InstancedItemEntity.set(newID, entity);
                    if (entity instanceof InstancedEquipmentEntity) {
                        /*InstancedEquipmentEntity.remove(currentID);
                        InstancedEquipmentEntity.set(newID, entity);*/
                        if (entity instanceof InstancedClothingEntity) {
                            InstancedClothingEntity.remove(currentID);
                            InstancedClothingEntity.set(newID, entity);
                        }
                        else if (entity instanceof InstancedWeaponEntity) {
                            InstancedWeaponEntity.remove(currentID);
                            InstancedWeaponEntity.set(newID, entity);
                        }
                    }
                }
                entity.setID(newID);
                Entity.setInstance(newID, entity);
            }
            AbstractEntity.set(newID, entity);
        }
        else {
            return 2;
        }
        if (entity.hasController()) {
            let controller = entity.getController();
            let mesh = controller.getMesh();
            Game.removeMeshToEntityController(mesh.id);
            EntityController.remove(controller.getID());
            if (controller instanceof CharacterController) {
                CharacterController.remove(controller.getID());
                CharacterController.set(newID, controller);
            }
            else if (controller instanceof DoorController) {
                DoorController.remove(controller.getID());
                DoorController.set(newID, controller);
            }
            else if (controller instanceof FurnitureController) {
                FurnitureController.remove(controller.getID());
                FurnitureController.set(newID, controller);
                if (controller instanceof LightingController) {
                    LightingController.remove(controller.getID());
                    LightingController.set(newID, controller);
                }
            }
            else if (controller instanceof ItemController) {
                ItemController.remove(controller.getID());
                ItemController.set(newID, controller);
            }
            controller.setID(newID);
            Entity.setController(newID, controller);
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
    /**
     * 
     * @param {string} id Unique ID, auto-generated if none given
     * @param {string} name Name
     * @param {string} [description] Description
     * @param {string} [iconID] Icon ID
     * @param {number} [age] Age
     * @param {SexEnum} [sex] SexEnum
     * @param {SpeciesEnum} [species] SpeciesEnum
     * @param {string} meshID Mesh ID
     * @param {string} materialID Material ID
     * @param {object} [options] Options
     */
    static createCharacterEntity(id = "", name = "", description = "", iconID = "genericCharacterIcon", age = 18, sex = SexEnum.MALE, species = SpeciesEnum.FOX, meshID = "missingMesh", materialID = "missingMaterial", options = {}) {
        id = Tools.filterID(id);
        if ((id.length == 0)) {
            id = Tools.genUUIDv4();
        }
        if (Game.debugMode) console.log(`Running Game::createCharacterEntity(${id}, ${name}, ${description}, ${iconID}, ${age}, ${sex}, ${species}, ${meshID}, ${materialID})`);
        let characterEntity = new CharacterEntity(id, name, description, iconID, undefined, age, sex, species);
        if (typeof options == "object") {
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
                case SpeciesEnum.CORSAC_FOX: {
                    textureID = "foxCorsac";
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
            characterEntity.setTextureID(textureID);
            Game.loadMaterial(textureID, textureID);
            characterEntity.setMaterialID(textureID);
        }
        return characterEntity;
    }
    /**
     * Filters the creation of a character mesh, and controller.
     * @param  {string} [id] Unique ID, auto-generated if none given
     * @param  {CharacterEntity} characterEntity Character entity
     * @param  {BABYLON.Vector3} position Position
     * @param  {BABYLON.Vector3} [rotation] Rotation
     * @param  {BABYLON.Vector3} [scaling] Scale
     * @param  {object} [options] Options
     * @return {array|number} Character Controller
     */
    static filterCreateCharacterInstance(id, characterEntity, position, rotation, scaling, options) {
        if (!(characterEntity instanceof CharacterEntity)) {
            if (CharacterEntity.has(characterEntity)) {
                characterEntity = CharacterEntity.get(characterEntity);
            }
            else {
                return 2;
            }
        }
        id = Game.Tools.filterID(id);
        if (id.length == 0) {
            id = characterEntity.getID();
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
        if (typeof options != "object") {
            options = {};
        }
        options["filtered"] = true;
        return [id, characterEntity, position, rotation, scaling, options];
    }
    /**
     * Creates a character mesh, and controller.
     * @param  {string} [id] Unique ID, auto-generated if none given
     * @param  {CharacterEntity} characterEntity Character entity
     * @param  {BABYLON.Vector3} position Position
     * @param  {BABYLON.Vector3} [rotation] Rotation
     * @param  {BABYLON.Vector3} [scaling] Scale
     * @param  {object} [options] Options
     * @return {CharacterController} Character Controller
     */
    static createCharacterInstance(id, characterEntity, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        if (typeof options != "object" || !options.hasOwnProperty("filtered")) {
            let filteredParameters = Game.filterCreateCharacterInstance(id, characterEntity, position, rotation, scaling, options);
            if (typeof filteredParameters == "number") {
                return 2;
            }
            [id, characterEntity, position, rotation, scaling, options] = filteredParameters;
        }
        if (!(Game.hasLoadedMesh(characterEntity.getMeshID()))) {
            Game.loadMesh(characterEntity.getMeshID());
            Game.addCharacterToCreate(id, characterEntity, position, rotation, scaling, options);
            return [id, characterEntity, position, rotation, scaling, options];
        }
        let loadedMesh = Game.createCharacterMesh(characterEntity.getID(), characterEntity.getMeshID(), characterEntity.getMaterialID(), position, rotation, scaling, options);
        let characterController = null;
        if (Game.useRigidBodies) {
            characterController = new CharacterControllerRigidBody(characterEntity.getID(), loadedMesh, characterEntity);
        }
        else {
            characterController = new CharacterControllerTransform(characterEntity.getID(), loadedMesh, characterEntity);
        }
        switch (characterEntity.getSpecies()) {
            case SpeciesEnum.SKELETON: {
                characterController.setDeathAnim("91_death99");
            }
        }
        switch (characterEntity.getMeshID()) {
            case "aardwolfM":
            case "aardwolfF":
            case "foxM":
            case "foxF":
            case "foxSkeletonN": {
                characterController.attachToROOT("hitbox.canine", "collisionMaterial");
                characterController.attachToHead("hitbox.canine.head", "collisionMaterial");
                characterController.attachToNeck("hitbox.canine.neck", "collisionMaterial");
                characterController.attachToChest("hitbox.canine.chest", "collisionMaterial");
                characterController.attachToLeftHand("hitbox.canine.hand.l", "collisionMaterial");
                characterController.attachToRightHand("hitbox.canine.hand.r", "collisionMaterial");
                characterController.attachToSpine("hitbox.canine.spine", "collisionMaterial");
                characterController.attachToPelvis("hitbox.canine.pelvis", "collisionMaterial");
                break;
            }
        }
        let newScaling = characterEntity.height/characterEntity.baseHeight;
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
            if (!CharacterController.has(characterController)) {
                return 2;
            }
            characterController = CharacterController.get(characterController);
        }
        if (characterController == Game.player.getController()) {
            return 1;
        }
        let mesh = characterController.getMesh();
        let entity = characterController.getEntity();
        characterController.dispose();
        if (entity instanceof AbstractEntity) {
            entity.dispose();
        }
        if (mesh instanceof BABYLON.InstancedMesh) {
            Game.removeMesh(mesh);
        }
        return 0;
    }
    /**
     * Filters the creation of a DoorController, DoorEntity, and BABYLON.InstancedMesh
     * @param  {string} [id] Unique ID, auto-generated if none given
     * @param  {string} [name] Name
     * @param  {object} [to] Future movement between cells
     * @param  {string} [meshID] Mesh ID
     * @param  {string} [materialID] Texture ID
     * @param  {BABYLON.Vector3} position Position
     * @param  {BABYLON.Vector3} [rotation] Rotation
     * @param  {BABYLON.Vector3} [scaling] Scaling
     * @param  {object} [options] Options
     * @return {array}
     */
    static filterCreateDoor(id = "", name = "Door", to = undefined, meshID = "door", materialID = "plainDoor", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {locked:false, key:null, opensInward:false, open:false, checkCollisions: true}) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        if (Game.debugMode) console.log(`Running Game::filterCreateDoor(${id}, ${meshID}, ${materialID})`);
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
        if (!Game.hasLoadedMaterial(materialID)) {
            if (Game.hasAvailableTexture(materialID)) {
                if (!Game.hasLoadedTexture(materialID)) {
                    Game.loadTexture(materialID);
                }
                Game.loadMaterial(materialID, materialID);
            }
            else {
                materialID = "plainDoor";
            }
        }
        if (!Game.hasAvailableMesh(meshID)) {
            if (Game.debugMode) console.log(`\tMesh ${meshID} doesn't exist`);
            meshID = "door";
        }
        if (typeof options != "object") {
            options = {};
        }
        options["filtered"] = true;
        if (options.hasOwnProperty("locked") && options["locked"] == true) {
            options["locked"] = true;
        }
        else {
            options["locked"] = false;
        }
        if (options.hasOwnProperty("key")) {
            if (options["key"] instanceof ItemEntity) {}
            else if (ItemEntity.has(options["key"])) {
                options["key"] = ItemEntity.get(options["key"]);
            }
            else {
                options["key"] = null;
            }
        }
        else {
            options["key"] = null;
        }
        if (options.hasOwnProperty("opensInward") && options["opensInward"] == true) {
            options["opensInward"] = true;
        }
        else {
            options["opensInward"] = false;
        }
        if (options.hasOwnProperty("open") && options["open"] == true) {
            options["open"] = true;
        }
        else {
            options["open"] = false;
        }
        return [id, name, to, meshID, materialID, position, rotation, scaling, options];
    }
    /**
     * Creates a DoorController, DoorEntity, and BABYLON.InstancedMesh
     * @param  {string} [id] Unique ID, auto-generated if none given
     * @param  {string} [name] Name
     * @param  {object} [to] Future movement between cells
     * @param  {string} [meshID] Mesh ID
     * @param  {string} [materialID] Texture ID
     * @param  {BABYLON.Vector3} position Position
     * @param  {BABYLON.Vector3} [rotation] Rotation
     * @param  {BABYLON.Vector3} [scaling] Scaling
     * @param  {object} [options] Options
     * @return {(EntityController|array)} A DoorController or an integer status code
     */
    static createDoor(id = "", name = "Door", to = undefined, meshID = "door", materialID = "plainDoor", position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {locked:false, key:null, opensInward:false, open:false, checkCollisions: true}) {
        if (typeof options != "object" || !options.hasOwnProperty("filtered")) {
            let filteredParameters = Game.filterCreateDoor(id, name, to, meshID, materialID, position, rotation, scaling, options);
            if (typeof filteredParameters == "number") {
                return 2;
            }
            [id, name, to, meshID, materialID, position, rotation, scaling, options] = filteredParameters;
        }
        if (!(Game.hasLoadedMesh(meshID))) {
            Game.loadMesh(meshID);
            Game.addDoorsToCreate(id, name, to, meshID, materialID, position, rotation, scaling, options);
            return [id, name, to, meshID, materialID, position, rotation, scaling, options];
        }
        let doorEntity = new DoorEntity(id, name, undefined, undefined, options["locked"], options["key"], options["opensInward"], options["open"]);
        let radius = Game.getMesh(meshID).getBoundingInfo().boundingBox.extendSize.x * scaling.x;
        let xPosition = radius * (Math.cos(rotation.y * Math.PI / 180) | 0);
        let yPosition = radius * (Math.sin(rotation.y * Math.PI / 180) | 0);
        let loadedMesh = Game.createMesh(id, meshID, materialID, position.add(new BABYLON.Vector3(xPosition, 0, -yPosition)), rotation, scaling, options);
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
            if (!DoorController.has(doorController)) {
                return 2;
            }
            doorController = Entity.getController(doorController);
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
     * Filters the creation of a FurnitureController, FurnitureEntity, and BABYLON.InstancedMesh
     * @param  {string} [id] Unique ID, auto-generated if none given
     * @param  {FurnitureEntity} furnitureEntity Furniture entity
     * @param  {BABYLON.Vector3} position Position
     * @param  {BABYLON.Vector3} [rotation] Rotation
     * @param  {BABYLON.Vector3} [scaling] Scaling
     * @param  {object} [options] Options
     * @return {(array|number)} A FurnitureController or an integer status code
     */
    static filterCreateFurnitureInstance(id = "", furnitureEntity, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {createClone: false, checkCollisions: true}) {
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
        else if (typeof furnitureEntity == "string" && FurnitureEntity.has(furnitureEntity)) {
            furnitureEntity = FurnitureEntity.get(furnitureEntity).createInstance(id);
        }
        else if (typeof furnitureEntity == "string" && InstancedFurnitureEntity.has(furnitureEntity)) {
            furnitureEntity = InstancedFurnitureEntity.get(furnitureEntity).clone(id);
        }
        else {
            return 2;
        }
        if (Game.debugMode) console.log(`Running Game::filterCreateFurnitureInstance(${id}, ${furnitureEntity.getID()})`);
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
        if (typeof options != "object") {
            options = {};
        }
        options["filtered"] = true;
        return [id, furnitureEntity, position, rotation, scaling, options];
    }
    /**
     * Creates a FurnitureController, FurnitureEntity, and BABYLON.InstancedMesh
     * @param  {string} [id] Unique ID, auto-generated if none given
     * @param  {FurnitureEntity} furnitureEntity Furniture entity
     * @param  {BABYLON.Vector3} position Position
     * @param  {BABYLON.Vector3} [rotation] Rotation
     * @param  {BABYLON.Vector3} [scaling] Scaling
     * @param  {object} [options] Options
     * @return {(FurnitureController|number)} A FurnitureController or an integer status code
     */
    static createFurnitureInstance(id = "", furnitureEntity, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {createClone: false, checkCollisions: true}) {
        if (typeof options != "object" || !options.hasOwnProperty("filtered")) {
            let filteredParameters = Game.filterCreateFurnitureInstance(id, furnitureEntity, position, rotation, scaling, options);
            if (typeof filteredParameters == "number") {
                return 2;
            }
            [id, furnitureEntity, position, rotation, scaling, options] = filteredParameters;
        }
        if (!(Game.hasLoadedMesh(furnitureEntity.getMeshID()))) {
            Game.loadMesh(furnitureEntity.getMeshID());
            Game.loadTexture(furnitureEntity.getTextureID());
            Game.loadMaterial(furnitureEntity.getTextureID()); // TODO: Work out a real system of materials :v
            Game.addFurnitureToCreate(id, furnitureEntity, position, rotation, scaling);
            return [id, furnitureEntity, position, rotation, scaling];
        }
        let loadedMesh = Game.createMesh(id, furnitureEntity.getMeshID(), furnitureEntity.getTextureID(), position, rotation, scaling, options);
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
            if (!FurnitureController.has(furnitureController)) {
                return 2;
            }
            furnitureController = FurnitureController.get(furnitureController);
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
     * Filters the creation of a LightingController, LightingEntity, and BABYLON.InstancedMesh
     * @param {string} [id] Unique ID, auto-generated if none given
     * @param {string} name Name
     * @param {string} meshID Mesh ID
     * @param {string} [materialID] Texture ID
     * @param {number} [lightingType] IDK yet :v; TODO: this
     * @param {BABYLON.Vector3} position Position
     * @param {BABYLON.Vector3} [rotation] Rotation
     * @param {BABYLON.Vector3} [scaling] Scaling
     * @param {object} [options] Options
     * @returns {array}
     */
    static filterCreateLighting(id = "", name = "", meshID, materialID, lightingType, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {createClone: true, checkCollisions: true, lightingPositionOffset: BABYLON.Vector3.Zero()}) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        if (!Game.hasMesh(meshID)) {
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
        if (typeof options != "object") {
            options = {};
            options["lightingPositionOffset"] = BABYLON.Vector3.Zero();
        }
        else if (!options.hasOwnProperty("lightingPositionOffset")) {
            options["lightingPositionOffset"] = BABYLON.Vector3.Zero();
        }
        options["filtered"] = true;
        return [id, name, meshID, materialID, lightingType, position, rotation, scaling, options];
    }
    /**
     * Creates a LightingController, LightingEntity, and BABYLON.InstancedMesh
     * @param {string} [id] Unique ID, auto-generated if none given
     * @param {string} name Name
     * @param {string} meshID Mesh ID
     * @param {string} [materialID] Texture ID
     * @param {number} [lightingType] IDK yet :v; TODO: this
     * @param {BABYLON.Vector3} position Position
     * @param {BABYLON.Vector3} [rotation] Rotation
     * @param {BABYLON.Vector3} [scaling] Scaling
     * @param {object} [options] Options
     * @returns {(LightingController|array|number)} A LightingController or an integer status code
     */
    static createLighting(id = "", name = "", meshID, materialID, lightingType, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {createClone: true, checkCollisions: true, lightingPositionOffset: BABYLON.Vector3.Zero()}) {
        if (typeof options != "object" || !options.hasOwnProperty("filtered")) {
            let filteredParameters = Game.filterCreateLighting(id, name, meshID, materialID, lightingType, position, rotation, scaling, options);
            if (typeof filteredParameters == "number") {
                return 2;
            }
            [id, name, meshID, materialID, lightingType, position, rotation, scaling, options] = filteredParameters;
        }
        if (!(Game.hasLoadedMesh(meshID))) {
            Game.loadMesh(meshID);
            Game.addLightingToCreate(id, name, meshID, materialID, lightingType, position, rotation, scaling, options);
            return [id, name, meshID, materialID, lightingType, position, rotation, scaling, options];
        }
        let loadedMesh = Game.createMesh(id, meshID, materialID, position, rotation, scaling, options);
        let lightingEntity = new LightingEntity(id, name, undefined, undefined, lightingType);
        let lightingController = new LightingController(id, loadedMesh, lightingEntity, lightingType, options["lightingPositionOffset"]);
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
            if (!(LightingController.has(lightingController))) {
                return 2;
            }
            lightingController = LightingController.get(lightingController);
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
            case ItemEnum.SHIELD : {
                itemEntity = new ShieldEntity(id, name, description, iconID);
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
     * Filters the creation of an InstancedItemEntity in the world at the given position.
     * @param {string} [id] Unique ID, auto-generated if none given
     * @param {(AbstractEntity|string)} abstractEntity Abstract entity; preferably an InstancedItemEntity
     * @param {BABYLON.Vector3} position Position
     * @param {BABYLON.Vector3} [rotation] Rotation
     * @param {BABYLON.Vector3} [scaling] Scaling
     * @param {object} [options] Options
     * @returns {(array|number)} An EntityController or an integer status code
     */
    static filterCreateItemInstance(id = "", abstractEntity, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        if (abstractEntity instanceof InstancedItemEntity) {}
        else if (abstractEntity instanceof ItemEntity) {
            abstractEntity = abstractEntity.createInstance(id);
        }
        else if (typeof abstractEntity == "string" ) {
            if (ItemEntity.has(abstractEntity)) {
                abstractEntity = ItemEntity.get(abstractEntity).createInstance(id);
            }
            else if (InstancedItemEntity.has(abstractEntity)) {
                abstractEntity = InstancedItemEntity.get(abstractEntity);
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
        if (typeof options != "object") {
            options = {};
        }
        options["filtered"] = true;
        return [id, abstractEntity, position, rotation, scaling, options];
    }
    /**
     * Places, or creates from an ItemEntity, an InstancedItemEntity in the world at the given position.
     * @param {string} [id] Unique ID, auto-generated if none given
     * @param {(AbstractEntity|string)} abstractEntity Abstract entity; preferably an InstancedItemEntity
     * @param {BABYLON.Vector3} position Position
     * @param {BABYLON.Vector3} [rotation] Rotation
     * @param {BABYLON.Vector3} [scaling] Scaling
     * @param {object} [options] Options
     * @returns {(ItemController|array|number)} An EntityController or an integer status code
     */
    static createItemInstance(id = "", abstractEntity, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {}) {
        if (typeof options != "object" || !options.hasOwnProperty("filtered")) {
            let filteredParameters = Game.filterCreateItemInstance(id, abstractEntity, position, rotation, scaling, options);
            if (typeof filteredParameters == "number") {
                return 2;
            }
            [id, abstractEntity, position, rotation, scaling, options] = filteredParameters;
        }
        if (!(Game.hasLoadedMesh(abstractEntity.getMeshID()))) {
            Game.loadMesh(abstractEntity.getMeshID());
            Game.loadTexture(abstractEntity.getTextureID());
            Game.loadMaterial(abstractEntity.getTextureID()); // TODO: Work out a real system of materials :v
            Game.addItemToCreate(id, abstractEntity, position, rotation, scaling, options);
            if (Game.debugMode) console.log(`\tThe item's mesh needs to be loaded. Inserting it into the qeueu.`);
            return [id, abstractEntity, position, rotation, scaling, options];
        }
        let mesh = Game.createItemMesh(id, abstractEntity.getMeshID(), abstractEntity.getTextureID(), position, rotation, scaling, options);
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
            if (!ItemController.has(itemController)) {
                return 2;
            }
            itemController = ItemController.get(itemController);
        }
        let mesh = itemController.getMesh();
        let entity = itemController.getEntity();
        itemController.dispose();
        if (entity instanceof AbstractEntity) {
            entity.dispose();
        }
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
            instancedItemEntity = InstancedItemEntity.get(instancedItemEntity);
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
    static createMirror(id, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), scaling = BABYLON.Vector3.One(), options = {width:5, height:5}) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        //Creation of a glass plane
        let abstractMesh = BABYLON.MeshBuilder.CreatePlane(id, {width: options["width"], height: options["height"]}, Game.scene);
        abstractMesh.position.copyFrom(position);
        abstractMesh.rotation.copyFrom(rotation);
        abstractMesh.scaling.copyFrom(scaling);
    
        //Ensure working with new values for glass by computing and obtaining its worldMatrix
        abstractMesh.computeWorldMatrix(true);
    
        return Game.createMirrorFrom(abstractMesh, Game.scene.meshes, options);
    }
    static createMirrorFrom(abstractMesh, renderList = [], options = {}) {
        if (abstractMesh instanceof BABYLON.AbstractMesh) {}
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
    static enableHighlighting() {
        Game.highlightEnabled = true;
        Game.initHighlighting();
        return 0;
    }
    static disableHighlighting() {
        Game.clearHighlightedController();
        Game.highlightEnabled = false;
        Game.highlightLayer.dispose();
        return 0;
    }
    static initHighlighting() {
        Game.highlightLayer = new BABYLON.HighlightLayer("hl1", Game.scene);
        Game.highlightLayer.outerGlow = true;
        Game.highlightLayer.innerGlow = false;
        return 0;
    }
    static highlightEntity(abstractEntity) {
        if (!(abstractEntity instanceof AbstractEntity)) {
            return 2;
        }
        if (abstractEntity.hasController()) {
            return highlightController(abstractEntity.getController());
        }
        return 2;
    }
    static highlightController(entityController) {
        if (!(entityController instanceof EntityController)) {
            return 2;
        }
        if (!Game.highlightEnabled || Game.highlightedController == entityController) {
            return 0;
        }
        let color = BABYLON.Color3.Gray();
        if (entityController instanceof CharacterController) {
            color = BABYLON.Color3.White();
        }
        else if (entityController instanceof ItemController) {
            if (entityController.getEntity().getOwner() != Game.player) {
                color = BABYLON.Color3.Red();
            }
            else {
                color = BABYLON.Color3.White();
            }
        }
        entityController.getMeshes().forEach(function(mesh) {
            if (mesh instanceof BABYLON.Mesh) {
                Game.highlightLayer.addMesh(mesh, color)
            }
        });
        Game.highlightedController = entityController;
        return 0;
    }
    static clearHighlightedController() {
        if (!Game.highlightEnabled || !(Game.highlightedController instanceof EntityController)) {
            return 0;
        }
        for (let i in Game.highlightLayer._meshes) {
            Game.highlightLayer.removeMesh(Game.highlightLayer._meshes[i]["mesh"]);
        }
        Game.highlightedController = null;
        return 0;
    }
    static setPlayerTarget(entityController) {
        if (!(Game.player.hasController())) {
            return 1;
        }
        if (!(entityController instanceof EntityController) || !entityController.isEnabled()) {
            return 1;
        }
        if (Game.highlightEnabled) {
            Game.highlightController(entityController);
        }
        Game.player.setTarget(entityController.getEntity());
        Game.gui.targetPortrait.set(entityController.getEntity());
        Game.gui.targetPortrait.show();
        Game.gui.setActionTooltip(ActionEnum.properties[entityController.getEntity().getDefaultAction()].name);
        Game.gui.showActionTooltip();
        return 0;
    }
    static clearPlayerTarget() {
        if (!(Game.player.hasController())) {
            return 1;
        }
        if (!Game.player.hasTarget()) {
            return 0;
        }
        if (Game.highlightEnabled) {
            Game.clearHighlightedController();
        }
        Game.player.clearTarget();
        Game.gui.targetPortrait.hide();
        Game.gui.hideActionTooltip();
        return 0;
    }
    static castRayTarget() {
        if (!Game.player.hasController() || !Game.player.controller.hasMesh() || !Game.player.controller.hasSkeleton()) {
            return 1;
        }
        let ray = Game.camera.getForwardRay(2 * Game.player.controller.mesh.scaling.y, Game.camera.getWorldMatrix(), Game.player.controller.focus.getAbsolutePosition());
        if (Game.player.controller.targetRay == undefined) {
            Game.player.controller.targetRay = ray;
        }
        else {
            Game.player.controller.targetRay.origin = ray.origin;
            Game.player.controller.targetRay.direction = ray.direction;
        }
        if (Game.debugMode) {
            if (Game.player.controller.targetRayHelper != undefined) {
                Game.player.controller.targetRayHelper.dispose();
            }
            Game.player.controller.targetRayHelper = new BABYLON.RayHelper(Game.player.controller.targetRay);
            Game.player.controller.targetRayHelper.show(Game.scene);
        }
        let hit = Game.scene.pickWithRay(Game.player.controller.targetRay, function(pickedMesh) {
            if (pickedMesh.parent instanceof BABYLON.Bone && pickedMesh.parent.getSkeleton() == Game.player.controller.skeleton || pickedMesh == Game.player.controller.mesh) {
                return false;
            }
            return true;
        });
        if (hit.hit) {
            let entityController = null;
            if (hit.pickedMesh.parent instanceof BABYLON.Bone) {
                entityController = Game.getMeshToEntityController(hit.pickedMesh.parent.getSkeleton().id);
            }
            else {
                entityController = Game.getMeshToEntityController(hit.pickedMesh.id);
            }
            if (entityController instanceof EntityController) {
                if (entityController != Game.player.controller.target) {
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
    static parseChat(chatString) {
        if (chatString.slice(0, 1) == "/") {
            return Game.chatCommands(chatString.slice(1));
        }
        else {
            return Game.gui.chat.appendOutput(`${new Date().toLocaleTimeString({ hour12: false })} ${Game.player.name}: ${chatString}`);
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
        command = String(command).toLowerCase();
        let commandArray = command.split(" ");
        if (commandArray.length == 0) {
            commandArray.push("help");
        }
        switch (commandArray[0]) {
            case "help" : {
                Game.gui.chat.appendOutput("Possible commands are: help, clear, menu, login, logout, quit, save, and load.\n");
                break;
            }
            case "clear" : {
                Game.gui.chat.clearOutput();
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
                Game.gui.chat.appendOutput(`Added \$${money} to your wallet.`);
                break;
            }
            case "setmoney" : {
                let money = Tools.filterInt(commandArray[1]) || 1;
                Game.player.setMoney(money);
                Game.gui.chat.appendOutput(`Set your wallet to \$${money}.`);
                break;
            }
            case "getmoney" : {
                Game.gui.chat.appendOutput(`You have \$${Game.player.getMoney()} in your wallet.`);
                break;
            }
            case "kill" : {
                let target = Game.player;
                if (typeof commandArray[1] == "string" && CharacterEntity.has(commandArray[1])) {
                    target = CharacterEntity.get(commandArray[1]);
                }
                target.setHealth(0);
                break;
            }
            case ":v" :
            case "v:" :
            case ":V" :
            case "V:" : {
                Game.gui.chat.appendOutput("\n    :V\n");
                break;
            }
            case "showdebug" : {
                DebugGameGUI.show();
                break;
            }
            default : {
                Game.gui.chat.appendOutput(`Command "${command}" not found.\n`);
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
            abstractEntity = InstancedItemEntity.get(abstractEntity) || Entity.get(abstractEntity);
            if (!(abstractEntity instanceof AbstractEntity)) {
                return 2;
            }
        }
        if (!(subAbstractEntity instanceof AbstractEntity)) {
            subAbstractEntity = InstancedItemEntity.get(subAbstractEntity) || Entity.get(subAbstractEntity);
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
        if (!(subEntity instanceof AbstractEntity && subEntity.hasInventory())) {
            return 2;
        }
        if (subEntity.addItem(instancedItemEntity) == 0) {
            Game.removeItemInSpace(instancedItemEntity);
            return 0;
        }
        return 1;
    }
    static actionAttack(defender = Game.player.getTarget(), attacker = Game.player, callback = undefined) {
        if (!(defender instanceof AbstractEntity)) {
            defender = null;
        }
        if (!(attacker instanceof CharacterEntity)) {
            return 2;
        }
        if (attacker.getController().isAttacking) {
            return 1;
        }
        if (defender instanceof CharacterEntity && attacker instanceof CharacterEntity) {
            if (Game.withinRange(attacker, defender) && Game.inFrontOf(attacker, defender)) {
                let weapon = null;
                if (attacker.isRightHanded() && attacker.getEquipment()[ApparelSlotEnum.HAND_R] instanceof InstancedWeaponEntity) {
                    weapon = attacker.getEquipment()[ApparelSlotEnum.HAND_R] || attacker.getEquipment()[ApparelSlotEnum.HAND_L];
                }
                else if (attacker.isLeftHanded() && attacker.getEquipment()[ApparelSlotEnum.HAND_L] instanceof InstancedWeaponEntity) {
                    weapon = attacker.getEquipment()[ApparelSlotEnum.HAND_L] || attacker.getEquipment()[ApparelSlotEnum.HAND_R];
                }
                let attackRoll = Game.calculateAttack(attacker, weapon);
                if (attackRoll == 1) {}
                else if (attackRoll > defender.getArmourClass()) {
                    if (weapon instanceof InstancedWeaponEntity) {
                        defender.subtractHealth(Game.calculateDamage(defender, attacker, weapon, attackRoll == 20));
                    }
                    else if (attacker.isArmed()) {
                        defender.subtractHealth(Game.calculateDamage(defender, attacker, undefined, attackRoll == 20));
                    }
                    else {
                        defender.addNonLethalDamage(Game.calculateDamage(defender, attacker, weapon, attackRoll == 20));
                    }
                }
            }
        }
        return 0;
    }
    static actionDrop(instancedItemEntity, subEntity = Game.player, callback = undefined) {
        if (!(instancedItemEntity instanceof AbstractEntity)) {
            return 2;
        }
        if (!(subEntity instanceof AbstractEntity && subEntity.hasInventory())) {
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
                Game.createItemInstance(undefined, instancedItemEntity, subEntity.getController().getMesh().position.clone(), subEntity.getController().getMesh().rotation.clone());
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
        if (!(subEntity instanceof AbstractEntity && subEntity.hasInventory())) {
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
        if (!(subEntity instanceof AbstractEntity && subEntity.hasInventory())) {
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
        if (!(subEntity instanceof AbstractEntity && subEntity.hasInventory())) {
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
        if (!(subEntity instanceof AbstractEntity && subEntity.hasInventory())) {
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
        subEntity.setStance(StanceEnum.LAY);
        subEntity.getController().setParent(entity.getController().getMesh());
        if (Game.meshProperties.hasOwnProperty(entity.getController().getMesh().name)) {
            let posArray = Game.meshProperties[entity.getController().getMesh().name]["usableArea"];
            let newPos = new BABYLON.Vector3(0, posArray[0][0].y, 0);
            if (entity.getFurnitureType() == FurnitureEnum.BED) {
                newPos.x = posArray[0][1].x - (0.0625 + subEntity.getController().getMesh().getBoundingInfo().boundingBox.center.z * (entity.getCharacters().size + 1));
            }
            else if (entity.getFurnitureType() == FurnitureEnum.COUCH) {
                newPos.x = posArray[0][1].x - (0.0625 + subEntity.getController().getMesh().getBoundingInfo().boundingBox.center.z * (entity.getCharacters().size + 1));
            }
            subEntity.getController().getMesh().position.copyFrom(newPos);
        }
        else {
            let seatingBoundingBox = Game.getMesh(entity.getController().getMesh().name).getBoundingInfo().boundingBox;
            let seatingWidth = (seatingBoundingBox.extendSize.x * entity.getController().getMesh().scaling.x);
            subEntity.getController().getMesh().position.set(seatingWidth / 2, 0.4, 0);
        }
        subEntity.getController().getMesh().rotation.copyFrom(entity.getController().getMesh().rotation.add(new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(270), 0)));
        subEntity.setFurniture(entity);
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
        subEntity.setStance(StanceEnum.SIT);
        subEntity.getController().setParent(entity.getController().getMesh());
        let seatingBoundingBox = Game.getMesh(entity.getController().getMesh().name).getBoundingInfo().boundingBox;
        let seatingWidth = (seatingBoundingBox.extendSize.x * entity.getController().getMesh().scaling.x);
        subEntity.getController().getMesh().position.set(seatingWidth / 2, 0.4, -0.0125);
        subEntity.getController().getMesh().rotation.set(0,0,0);
        subEntity.setFurniture(entity);
        subEntity.getController().doSit();
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

    static setPlayerCell(cell) {
        if (cell instanceof Cell) {}
        else if (Game.hasCell(cell)) {
            cell = Game.getCell(cell);
        }
        else {
            return 2;
        }
        if (Game.playerCell instanceof Cell) {
            let meshesToRemove = cell.meshIDDifference(Game.playerCell);
            meshesToRemove.forEach(function(meshID) {
                for (let i in Game.meshMaterialMeshes) {
                    if (i == meshID) {
                        for (let j in Game.meshMaterialMeshes[i]) {
                            for (let k in Game.meshMaterialMeshes[i][j]) {
                                Game.removeMesh(Game.meshMaterialMeshes[i][j][k]);
                            }
                        }
                    }
                }
            });
        }
        Game.playerCell = cell;
        return 0;
    }
    static unloadCell(cell) {
        if (!(cell instanceof Cell)) {
            if (Game.hasCell(cell)) {
                cell = Game.getCell(cell);
            }
            else {
                return 2;
            }
        }
        cell.getMeshIDs().forEach(function(meshID) {
            for (let i in Game.meshMaterialMeshes) {
                if (i == meshID) {
                    for (let j in Game.meshMaterialMeshes[i]) {
                        for (let k in Game.meshMaterialMeshes[i][j]) {
                            Game.removeMesh(Game.meshMaterialMeshes[i][j][k]);
                        }
                    }
                }
            }
        });
        return 0;
    }
    static loadCell(cell) {
        if (!(cell instanceof Cell)) {
            if (Game.hasCell(cell)) {
                cell = Game.getCell(cell);
            }
            else {
                return 2;
            }
        }
        cell.createBackloggedAdditions();
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
                Game.controls = EditControls;
                break;
            }
        }
        return 0;
    }
    static getInterfaceMode() {
        return Game.interfaceMode;
    }
    static calculateProficiencyByLevel(level) {
        return Math.floor((level + 7) / 4);
    }
    static calculateProficiencyByExperience(experience) {
        return Game.calculateProficiencyByLevel(Game.calculateLevel(experience));;
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
    static calculateAttack(attacker, weapon = undefined, advantage = undefined) {
        let attackRoll = Game.roll(1, 20);
        if (advantage === true) {
            let tempRoll = Game.roll(1, 20);
            if (tempRoll > attackRoll) {
                attackRoll = tempRoll;
            }
        }
        else if (advantage === false) {
            let tempRoll = Game.roll(1, 20);
            if (tempRoll < attackRoll) {
                attackRoll = tempRoll;
            }
        }
        if (attackRoll == 20) {
            return 20;
        }
        else if (attackRoll == 1) {
            return 1;
        }
        if (weapon == undefined) {
            if (attacker.isRightHanded() && attacker.getEquipment()[ApparelSlotEnum.HAND_R] instanceof InstancedWeaponEntity) {
                weapon = attacker.getEquipment()[ApparelSlotEnum.HAND_R] || attacker.getEquipment()[ApparelSlotEnum.HAND_L];
            }
            else if (attacker.isLeftHanded() && attacker.getEquipment()[ApparelSlotEnum.HAND_L] instanceof InstancedWeaponEntity) {
                weapon = attacker.getEquipment()[ApparelSlotEnum.HAND_L] || attacker.getEquipment()[ApparelSlotEnum.HAND_R];
            }
        }
        if (weapon instanceof InstancedWeaponEntity || weapon instanceof WeaponEntity) {
            if (weapon.getWeaponCategory() == WeaponCategoryEnum.SIMPLE_MELEE || weapon.getWeaponCategory() == WeaponCategoryEnum.MARTIAL_MELEE) {
                attackRoll += Game.calculateAbilityModifier(attacker.getStrength());
            }
            else {
                attackRoll += Game.calculateAbilityModifier(attacker.getDexterity());
            }
            if (attacker.hasProficiency(weapon)) {
                attackRoll += attacker.getProficiencyBonus();
            }
        }
        return attackRoll;
    }
    static calculateDamage(defender, attacker, weapon, critical = false) {
        let damageRollCount = 1;
        let damageRoll = 0;
        if (attacker.isRightHanded() && attacker.getEquipment()[ApparelSlotEnum.HAND_R] instanceof InstancedWeaponEntity) {
            damageRollCount = attacker.getEquipment()[ApparelSlotEnum.HAND_R].getDamageRollCount();
            damageRoll = attacker.getEquipment()[ApparelSlotEnum.HAND_R].getDamageRoll();
            return Game.roll(damageRollCount, damageRoll);
        }
        else if (attacker.isLeftHanded() && attacker.getEquipment()[ApparelSlotEnum.HAND_L] instanceof InstancedWeaponEntity) {
            damageRollCount = attacker.getEquipment()[ApparelSlotEnum.HAND_L].getDamageRollCount();
            damageRoll = attacker.getEquipment()[ApparelSlotEnum.HAND_L].getDamageRoll();
            return Game.roll(damageRollCount, damageRoll);
        }
        else {
            switch (attacker.getSize()) {
                case SizeEnum.FINE:
                case SizeEnum.DIMINUTIVE: {return 0;}
                case SizeEnum.SMALL: {return Game.roll(1, 2)}
                case SizeEnum.MEDIUM: {return Game.roll(1, 3)}
                case SizeEnum.LARGE: {return Game.roll(1, 4)}
                case SizeEnum.HUGE: {return Game.roll(1, 6)}
                case SizeEnum.GARGANTUAN: {return Game.roll(1, 8)}
                case SizeEnum.COLOSSAL: {return Game.roll(2, 6)}
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
            entityA = InstancedEntity.get(entityA) || InstancedEntity.get(entityA);
            if (!(entityA instanceof AbstractEntity)) {
                return false;
            }
        }
        if (!(entityB instanceof AbstractEntity)) {
            entityB = InstancedEntity.get(entityB) || InstancedEntity.get(entityB);
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
            entityA = InstancedEntity.get(entityA) || InstancedEntity.get(entityA);
            if (!(entityA instanceof AbstractEntity)) {
                return false;
            }
        }
        if (!(entityB instanceof AbstractEntity)) {
            entityB = InstancedEntity.get(entityB) || InstancedEntity.get(entityB);
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
    static setGameTimeMultiplier(number) {
        Game.gameTimeMultiplier = Number.parseFloat(number);
        Game.roundTime = Game.gameTimeMultiplier * 6;
        Game.turnTime = Game.gameTimeMultiplier * 60;
    }
    static timeToGameTime(date = new Date()) {
        let seconds = date.getSeconds();
        seconds += date.getMinutes() * 60;
        seconds += date.getHours() * 3600;
        seconds = seconds % (Game.SECONDS_IN_DAY / Game.gameTimeMultiplier) * Game.gameTimeMultiplier;
        let hours = seconds / 3600 | 0;
        seconds -= hours * 3600;
        let minutes = seconds / 60 | 0;
        seconds -= minutes * 60;
        seconds += date.getMilliseconds() / 100 | 0;
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(seconds);
        date.setMilliseconds(0);
        console.log(String(`${hours.toString().length == 1 ? "0" : ""}${hours}:${minutes.toString().length == 1 ? "0" : ""}${minutes}:${seconds.toString().length == 1 ? "0" : ""}${seconds}`));
        return date;
    }
}