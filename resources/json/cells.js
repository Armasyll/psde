let apartmentCell = new Cell("apartmentCell");
apartmentCell.createBarrier(64);

apartmentCell.addMaterial("greenWallpaperPlainWood", "greenWallpaperPlainWood", undefined, {"hasAlpha":true});
apartmentCell.addMaterial("yellowWallpaperPlainWood", "yellowWallpaperPlainWood", undefined, {"hasAlpha":true});
apartmentCell.addMaterial("pinkWallpaperPlainWood", "pinkWallpaperPlainWood", undefined, {"hasAlpha":true});
apartmentCell.addMaterial("whiteWallpaperPlainWood", "whiteWallpaperPlainWood", undefined, {"hasAlpha":true});
apartmentCell.addMaterial("blueWallpaperPlainWood", "blueWallpaperPlainWood", undefined, {"hasAlpha":true});
apartmentCell.addMaterial("greenWallpaper", "greenWallpaper");
apartmentCell.addMaterial("whitePanelGrayStone", "whitePanelGrayStone", "stripped-NORMAL");
apartmentCell.addMaterial("carpet02-pink", "carpet02-pink", "carpet02-NORMAL", {specularColor:[0, 0, 0]});
apartmentCell.addMaterial("carpet02-black", "carpet02-black", "carpet02-NORMAL", {specularColor:[0, 0, 0]});
//apartmentCell.addMaterial("woodenFloorDark01", "woodenFloorDark01-DIFFUSE", "woodenFloorDark01-NORMAL", {specularColor:[0.1,0.1,0.1]});
apartmentCell.addMaterial("linoleumMaterial", "checkerLinoleumFloor01", "checkerLinoleumFloor01-NORMAL", {specularColor:[0, 0, 0]});

// Ozzy Hallway Closet
apartmentCell.addTiledGround("ozzyHallwayClosetFloor", [2, 2], "woodenFloorDark26", [1, 0, -7]);
apartmentCell.addTiledCeiling("ozzyHallwayClosetCeiling", [2, 2], "woodenFloorDark26", [1, 2.9, -7]);
apartmentCell.addCollidableMesh("ozzyHallwayClosetWallN0", "craftsmanWall", "yellowWallpaperPlainWood", [2, 0, -6]);
apartmentCell.addCollidableMesh("ozzyHallwayClosetWallE0Doorway", "craftsmanDoorway", "yellowWallpaperPlainWood", [2, 0, -6], [0, 90, 0]);
apartmentCell.addCollidableMesh("ozzyHallwayClosetWallS0", "craftsmanWall", "yellowWallpaperPlainWood", [2, 0, -6], [0, 180, 0]);
apartmentCell.addCollidableMesh("ozzyHallwayClosetWallW0", "craftsmanWall", "yellowWallpaperPlainWood", [2, 0, -6], [0, 270, 0]);

// Ozzy Bedroom Closet
apartmentCell.addTiledGround("ozzyBedroomClosetFloor", [2, 2], "woodenFloorDark26", [-1, 0, -7]);
apartmentCell.addTiledCeiling("ozzyBedroomClosetCeiling", [2, 2], "woodenFloorDark26", [-1, 2.9, -7]);
apartmentCell.addCollidableMesh("ozzyBedroomClosetWallN0Doorway", "craftsmanDoorway", "yellowWallpaperPlainWood", [0, 0, -6]);
apartmentCell.addCollidableMesh("ozzyBedroomClosetWallE0", "craftsmanWall", "yellowWallpaperPlainWood", [0, 0, -6], [0, 90, 0]);
apartmentCell.addCollidableMesh("ozzyBedroomClosetWallS0", "craftsmanWall", "yellowWallpaperPlainWood", [0, 0, -6], [0, 180, 0]);
apartmentCell.addCollidableMesh("ozzyBedroomClosetWallW0", "craftsmanWall", "yellowWallpaperPlainWood", [0, 0, -6], [0, 270, 0]);

// Ozzy Bedroom
apartmentCell.addTiledGround("ozzyBedroomFloor", [4, 6], "woodenFloorDark01", [-1, 0, -5]);
apartmentCell.addTiledCeiling("ozzyBedroomCeiling", [4, 6], "woodenFloorDark26", [-1, 2.9, -5]);
apartmentCell.addCollidableMesh("ozzyBedroomWallN0", "craftsmanWall", "yellowWallpaperPlainWood", [0, 0, 0]);
apartmentCell.addCollidableMesh("ozzyBedroomWallN1", "craftsmanWall", "yellowWallpaperPlainWood", [2, 0, 0]);
apartmentCell.addCollidableMesh("ozzyBedroomWallE0", "craftsmanWall", "yellowWallpaperPlainWood", [2, 0, 0], [0, 90, 0]);
apartmentCell.addCollidableMesh("ozzyBedroomWallE1Doorway", "craftsmanDoorway", "yellowWallpaperPlainWood", [2, 0, -2], [0, 90, 0]);
apartmentCell.addCollidableMesh("ozzyBedroomWallE2", "craftsmanWall", "yellowWallpaperPlainWood", [2, 0, -4], [0, 90, 0]);
apartmentCell.addCollidableMesh("ozzyBedroomWallS0", "craftsmanWall", "yellowWallpaperPlainWood", [2, 0, -4], [0, 180, 0]);
apartmentCell.addCollidableMesh("ozzyBedroomWallS1Doorway", "craftsmanDoorway", "yellowWallpaperPlainWood", [0, 0, -4], [0, 180, 0]);
apartmentCell.addCollidableMesh("ozzyBedroomWallW0Windowframe", "craftsmanWindowframe", "yellowWallpaperPlainWood", [0, 0, -4], [0, 270, 0]);
apartmentCell.addCollidableMesh("ozzyBedroomWallW0Window", "craftsmanWindowDouble", "yellowWallpaperPlainWood", [0, 0, -4], [0, 270, 0]);
apartmentCell.addCollidableMesh("ozzyBedroomWallW1", "craftsmanWall", "yellowWallpaperPlainWood", [0, 0, -2], [0, 270, 0]);
apartmentCell.addCollidableMesh("ozzyBedroomWallW2", "craftsmanWall", "yellowWallpaperPlainWood", [0, 0, 0], [0, 270, 0]);
apartmentCell.addFurniture("ozzyBed", "mattress01", [-0.1, 0, -3.395], undefined, [1.35, 1.35, 1.35]);

// Ozzy Bathroom
apartmentCell.addTiledGround("ozzyBathroomFloor", [4, 4], "linoleumMaterial", [5, 0, -3]);
apartmentCell.addTiledCeiling("ozzyBathroomCeiling", [4, 4, 1, 1], "californiaKnockdown01", [5, 2.9, -3])
apartmentCell.addCollidableMesh("ozzyBathroomWallN0", "craftsmanWall", "whiteWallpaperPlainWood", [6, 0, 0]);
apartmentCell.addCollidableMesh("ozzyBathroomWallN1Windowframe", "craftsmanWindowframe", "whiteWallpaperPlainWood", [8, 0, 0]);
apartmentCell.addCollidableMesh("ozzyBathroomWallN1Window", "craftsmanWindowDouble", "whiteWallpaperPlainWood", [8, 0, 0]);
apartmentCell.addCollidableMesh("ozzyBathroomWallE0", "craftsmanWall", "whiteWallpaperPlainWood", [8, 0, 0], [0, 90, 0]);
apartmentCell.addCollidableMesh("ozzyBathroomWallE1", "craftsmanWall", "whiteWallpaperPlainWood", [8, 0, -2], [0, 90, 0]);
apartmentCell.addCollidableMesh("ozzyBathroomWallS0", "craftsmanWall", "whiteWallpaperPlainWood", [8, 0, -2], [0, 180, 0]);
apartmentCell.addCollidableMesh("ozzyBathroomWallS1", "craftsmanWall", "whiteWallpaperPlainWood", [6, 0, -2], [0, 180, 0]);
apartmentCell.addCollidableMesh("ozzyBathroomWallW0Doorway", "craftsmanDoorway", "whiteWallpaperPlainWood", [6, 0, -2], [0, 270, 0]);
apartmentCell.addCollidableMesh("ozzyBathroomWallW1", "craftsmanWall", "whiteWallpaperPlainWood", [6, 0, 0], [0, 270, 0]);
apartmentCell.addFurniture("ozzyBathroomToilet", "animatedToilet01", [8.5, 0, -1], [0, 90, 0], 1.5);
apartmentCell.addMesh("ozzyBathroomSink", "sink01Basin", "ceramicsAndPipes", [8.95, 0, 0.125], [0, 90, 0], 1.5);
apartmentCell.addMesh("ozzyBathroomSinkPipes", "sink01Pipes", "ceramicsAndPipes", [8.95, 0, 0.125], [0, 90, 0], 1.5);
apartmentCell.addFurniture("ozzyBathroomSinkFaucet", "animatedSink01Faucet", [8.95, 0, 0.125], [0, 90, 0], 1.5);
apartmentCell.addFurniture("ozzyBathroomTub", "bathtub01", [8.85, 0, -2.25], [0, 90, 0], 1.5);
apartmentCell.addMesh("ozzyBathroomShower", "showerPipes01", "ceramicsAndPipes", [8.85, 0, -2.25], [0, 90, 0], 1.5);

// Ozzy Hallway
apartmentCell.addTiledGround("ozzyHallwayFloor", [2, 6], "woodenFloorDark01", [3, 0, -7]);
apartmentCell.addTiledCeiling("ozzyHallwayCeiling", [2, 6], "woodenFloorDark26", [3, 2.9, -7]);
apartmentCell.addCollidableMesh("ozzyHallwayWallN0", "craftsmanWall", "yellowWallpaperPlainWood", [4, 0, -2]);
apartmentCell.addCollidableMesh("ozzyHallwayWallE0Doorway", "craftsmanDoorway", "yellowWallpaperPlainWood", [4, 0, -2], [0, 90, 0]);
apartmentCell.addDoor("ozzyBathroomDoor", "Bathroom", undefined, "simpleDoor", "simpleDoor", [5, 0, -2], [0, 90, 0], undefined, {opensInward:false});
apartmentCell.addCollidableMesh("ozzyHallwayWallE1", "craftsmanWall", "yellowWallpaperPlainWood", [4, 0, -4], [0, 90, 0]);
apartmentCell.addCollidableMesh("ozzyHallwayWallE2", "craftsmanWall", "yellowWallpaperPlainWood", [4, 0, -6], [0, 90, 0]);
apartmentCell.addCollidableMesh("ozzyHallwayWallW0Doorway", "craftsmanDoorway", "yellowWallpaperPlainWood", [4, 0, -6], [0, 270, 0]);
apartmentCell.addDoor("ozzyHallwayClosetDoor", "Closet", undefined, "simpleDoor", "simpleDoor", [3, 0, -6], [0, 270, 0], undefined, {opensInward:true});
apartmentCell.addCollidableMesh("ozzyHallwayWallW1", "craftsmanWall", "yellowWallpaperPlainWood", [4, 0, -4], [0, -90, 0]);
apartmentCell.addCollidableMesh("ozzyHallwayWallW2Doorway", "craftsmanDoorway", "yellowWallpaperPlainWood", [4, 0, -2], [0, 270, 0]);
apartmentCell.addDoor("ozzyBedroomDoor", "Bedroom", undefined, "simpleDoor", "simpleDoor", [3, 0, -2], [0, 270, 0], undefined, {opensInward:false});

// Ozzy Livingroom
apartmentCell.addTiledGround("ozzyLivingroomFloor", [8, 6], "woodenFloorDark01", [-1, 0, -13]);
apartmentCell.addTiledCeiling("ozzyLivingroomCeiling", [8, 6], "woodenFloorDark26", [-1, 2.9, -13]);
apartmentCell.addCollidableMesh("ozzyLivingroomWallN0", "craftsmanWall", "yellowWallpaperPlainWood", [0, 0, -8]);
apartmentCell.addCollidableMesh("ozzyLivingroomWallN1", "craftsmanWall", "yellowWallpaperPlainWood", [2, 0, -8]);
apartmentCell.addCollidableMesh("ozzyLivingroomWallN2Corner0", "craftsmanCorner", "yellowWallpaperPlainWood", [4, 0, -8]);
apartmentCell.addCollidableMesh("ozzyLivingroomWallN2Corner1", "craftsmanCorner", "yellowWallpaperPlainWood", [4, 0, -8], [0, 90, 0]);
apartmentCell.addCollidableMesh("ozzyLivingroomWallN3", "craftsmanWall", "yellowWallpaperPlainWood", [6, 0, -8]);
apartmentCell.addCollidableMesh("ozzyLivingroomWallE0", "craftsmanWall", "yellowWallpaperPlainWood", [6, 0, -8], [0, 90, 0]);
apartmentCell.addCollidableMesh("ozzyLivingroomWallE1", "craftsmanWall", "yellowWallpaperPlainWood", [6, 0, -10], [0, 90, 0]);
apartmentCell.addCollidableMesh("ozzyLivingroomWallE2", "craftsmanWall", "yellowWallpaperPlainWood", [6, 0, -12], [0, 90, 0]);
apartmentCell.addCollidableMesh("ozzyLivingroomWallS0", "craftsmanWall", "yellowWallpaperPlainWood", [6, 0, -12], [0, 180, 0]);
apartmentCell.addCollidableMesh("ozzyLivingroomWallS1", "craftsmanWall", "yellowWallpaperPlainWood", [4, 0, -12], [0, 180, 0]);
apartmentCell.addCollidableMesh("ozzyLivingroomWallS2Doorway", "craftsmanDoorway", "yellowWallpaperPlainWood", [2, 0, -12], [0, 180, 0]);
apartmentCell.addCollidableMesh("ozzyLivingroomWallS3", "craftsmanWall", "yellowWallpaperPlainWood", [0, 0, -12], [0, 180, 0]);
apartmentCell.addCollidableMesh("ozzyLivingroomWallW0", "craftsmanWall", "yellowWallpaperPlainWood", [0, 0, -12], [0, 270, 0]);
apartmentCell.addCollidableMesh("ozzyLivingroomWallW1Windowframe", "craftsmanWindowframe", "yellowWallpaperPlainWood", [0, 0, -10], [0, 270, 0]);
apartmentCell.addCollidableMesh("ozzyLivingroomWallW1Window", "craftsmanWindowDouble", "yellowWallpaperPlainWood", [0, 0, -10], [0, 270, 0]);
apartmentCell.addCollidableMesh("ozzyLivingroomWallW2", "craftsmanWall", "yellowWallpaperPlainWood", [0, 0, -8], [0, 270, 0]);
apartmentCell.addFurniture("refrigeratorOzzy", "animatedRefrigerator01", [6.35, 0, -7.75], [0, 90, 0]);
apartmentCell.addCollidableMesh("trashBagFullInstance01", "trashBagFull", undefined, [6.4, 0, -9.8]);
apartmentCell.addCollidableMesh("trashCanInstance01", "trashCan", undefined, [5.8, 0, -10.2]);
apartmentCell.addCollidableMesh("trashBagFullInstance02", "trashBagFull", undefined, [6.5, 0, -10.6], [0, 90, 0]);

// Landlord Bedroom
apartmentCell.addTiledGround("landlordBedroomFloor", [6, 6], "woodenFloorDark01", [9, 0, -5]);
apartmentCell.addTiledCeiling("landlordBedroomCeiling", [6, 6], "woodenFloorDark26", [9, 2.9, -5]);
apartmentCell.addCollidableMesh("landlordBedroomWallN0", "craftsmanWall", "blueWallpaperPlainWood", [10, 0, 0]);
apartmentCell.addCollidableMesh("landlordBedroomWallN1", "craftsmanWall", "blueWallpaperPlainWood", [12, 0, 0]);
apartmentCell.addCollidableMesh("landlordBedroomWallN2", "craftsmanWall", "blueWallpaperPlainWood", [14, 0, 0]);
apartmentCell.addCollidableMesh("landlordBedroomWallE0", "craftsmanWall", "blueWallpaperPlainWood", [14, 0, 0], [0, 90, 0]);
apartmentCell.addCollidableMesh("landlordBedroomWallE1", "craftsmanWall", "blueWallpaperPlainWood", [14, 0, -2], [0, 90, 0]);
apartmentCell.addCollidableMesh("landlordBedroomWallE2Windowframe", "craftsmanWindowframe", "blueWallpaperPlainWood", [14, 0, -4], [0, 90, 0]);
apartmentCell.addCollidableMesh("landlordBedroomWallE2Window", "craftsmanWindowDouble", "blueWallpaperPlainWood", [14, 0, -4], [0, 90, 0]);
apartmentCell.addCollidableMesh("landlordBedroomWallS0Doorway", "craftsmanDoorway", "blueWallpaperPlainWood", [14, 0, -4], [0, 180, 0]);
apartmentCell.addCollidableMesh("landlordBedroomWallS1Doorway", "craftsmanDoorway", "blueWallpaperPlainWood", [12, 0, -4], [0, 180, 0]);
apartmentCell.addCollidableMesh("landlordBedroomWallS2", "craftsmanWall", "blueWallpaperPlainWood", [10, 0, -4], [0, 180, 0]);
apartmentCell.addCollidableMesh("landlordBedroomWallW0", "craftsmanWall", "blueWallpaperPlainWood", [10, 0, -4], [0, 270, 0]);
apartmentCell.addCollidableMesh("landlordBedroomWallW1", "craftsmanWall", "blueWallpaperPlainWood", [10, 0, -2], [0, 270, 0]);
apartmentCell.addCollidableMesh("landlordBedroomWallW2", "craftsmanWall", "blueWallpaperPlainWood", [10, 0, 0], [0, 270, 0]);
 // Landlord Bedroom Closet
apartmentCell.addTiledGround("landlordBedroomClosetFloor", [2, 2], "woodenFloorDark01", [13, 0, -7]);
apartmentCell.addTiledCeiling("landlordBedroomClosetCeiling", [2, 2], "woodenFloorDark26", [13, 2.9, -7]);
 apartmentCell.addCollidableMesh("landlordBedroomClosetWallN0Doorway", "craftsmanDoorway", "blueWallpaperPlainWood", [14, 0, -6]);
 apartmentCell.addCollidableMesh("landlordBedroomClosetWallE0", "craftsmanWall", "blueWallpaperPlainWood", [14, 0, -6], [0, 90, 0]);
 apartmentCell.addCollidableMesh("landlordBedroomClosetWallS0", "craftsmanWall", "blueWallpaperPlainWood", [14, 0, -6], [0, 180, 0]);
 apartmentCell.addCollidableMesh("landlordBedroomClosetWallW0", "craftsmanWall", "blueWallpaperPlainWood", [14, 0, -6], [0, 270, 0]);
// Landlord Livingroom
apartmentCell.addTiledGround("landlordLivingroomFloor0", [4, 2], "woodenFloorDark01", [9, 0, -7]);
apartmentCell.addTiledCeiling("landlordLivingroomCeiling0", [4, 2], "woodenFloorDark26", [9, 2.9, -7]);
apartmentCell.addTiledGround("landlordLivingroomFloor1", [8, 6], "woodenFloorDark01", [7, 0, -13]);
apartmentCell.addTiledCeiling("landlordLivingroomCeiling1", [8, 6], "woodenFloorDark26", [7, 2.9, -13]);
apartmentCell.addTiledGround("landlordLivingroomFloor2", [10, 4], "woodenFloorDark01", [5, 0, -17]);
apartmentCell.addTiledCeiling("landlordLivingroomCeiling2", [10, 4], "woodenFloorDark26", [5, 2.9, -17]);
apartmentCell.addCollidableMesh("landlordLivingroomWallN0", "craftsmanWall", "blueWallpaperPlainWood", [8, 0, -8]);
apartmentCell.addCollidableMesh("landlordLivingroomWallN0Corner0", "craftsmanCorner", "blueWallpaperPlainWood", [10, 0, -8]);
apartmentCell.addCollidableMesh("landlordLivingroomWallN1", "craftsmanWall", "blueWallpaperPlainWood", [10, 0, -6]);
apartmentCell.addCollidableMesh("landlordLivingroomWallN2Doorway", "craftsmanDoorway", "blueWallpaperPlainWood", [12, 0, -6]);
apartmentCell.addCollidableMesh("landlordLivingroomWallN3", "craftsmanWall", "blueWallpaperPlainWood", [14, 0, -8]);
apartmentCell.addCollidableMesh("landlordLivingroomWallE0", "craftsmanWall", "blueWallpaperPlainWood", [12, 0, -6], [0, 90, 0]);
apartmentCell.addCollidableMesh("landlordLivingroomWallE0Corner1", "craftsmanCorner", "blueWallpaperPlainWood", [12, 0, -8], [0, 90, 0]);
apartmentCell.addCollidableMesh("landlordLivingroomWallE1", "craftsmanWall", "blueWallpaperPlainWood", [14, 0, -8], [0, 90, 0]);
apartmentCell.addCollidableMesh("landlordLivingroomWallE2Windowframe", "craftsmanWindowframe", "blueWallpaperPlainWood", [14, 0, -10], [0, 90, 0]);
apartmentCell.addCollidableMesh("landlordLivingroomWallE2Window", "craftsmanWindowDouble", "blueWallpaperPlainWood", [14, 0, -10], [0, 90, 0]);
apartmentCell.addCollidableMesh("landlordLivingroomWallE3", "craftsmanWall", "blueWallpaperPlainWood", [14, 0, -12], [0, 90, 0]);
apartmentCell.addCollidableMesh("landlordLivingroomWallE4", "craftsmanWall", "blueWallpaperPlainWood", [14, 0, -14], [0, 90, 0]);
apartmentCell.addCollidableMesh("landlordLivingroomWallE5Windowframe", "craftsmanWindowframe", "blueWallpaperPlainWood", [14, 0, -16], [0, 90, 0]);
apartmentCell.addCollidableMesh("landlordLivingroomWallE5Window", "craftsmanWindowDouble", "blueWallpaperPlainWood", [14, 0, -16], [0, 90, 0]);
apartmentCell.addCollidableMesh("landlordLivingroomWallS0", "craftsmanWall", "blueWallpaperPlainWood", [14, 0, -16], [0, 180, 0]);
apartmentCell.addCollidableMesh("landlordLivingroomWallS1", "craftsmanWall", "blueWallpaperPlainWood", [12, 0, -16], [0, 180, 0]);
apartmentCell.addCollidableMesh("landlordLivingroomWallS2", "craftsmanWall", "blueWallpaperPlainWood", [10, 0, -16], [0, 180, 0]);
apartmentCell.addCollidableMesh("landlordLivingroomWallS3", "craftsmanWall", "blueWallpaperPlainWood", [8, 0, -16], [0, 180, 0]);
apartmentCell.addCollidableMesh("landlordLivingroomWallS4", "craftsmanWall", "blueWallpaperPlainWood", [6, 0, -16], [0, 180, 0]);
apartmentCell.addCollidableMesh("landlordLivingroomWallW0Doorway", "craftsmanDoorway", "blueWallpaperPlainWood", [6, 0, -16], [0, 270, 0]);
apartmentCell.addCollidableMesh("landlordLivingroomWallW1", "craftsmanWall", "blueWallpaperPlainWood", [6, 0, -14], [0, 270, 0]);
apartmentCell.addCollidableMesh("landlordLivingroomWallN4", "craftsmanWall", "blueWallpaperPlainWood", [6, 0, -14]);
 // Landlord Livingroom Divider
 apartmentCell.addCollidableMesh("landlordLivingroomDividerWallN0", "craftsmanWall", "blueWallpaperPlainWood", [8, 0, -14]);
 apartmentCell.addCollidableMesh("landlordLivingroomDividerWallN0Corner0", "craftsmanCorner", "blueWallpaperPlainWood", [10, 0, -14]);
 apartmentCell.addCollidableMesh("landlordLivingroomDividerWallS0Corner0", "craftsmanCorner", "blueWallpaperPlainWood", [10, 0, -12], [0, 270, 0]);
 apartmentCell.addCollidableMesh("landlordLivingroomDividerWallS0", "craftsmanWall", "blueWallpaperPlainWood", [8, 0, -12], [0, 180, 0]);
apartmentCell.addCollidableMesh("landlordLivingroomWallW2", "craftsmanWall", "blueWallpaperPlainWood", [8, 0, -12], [0, 270, 0]);
apartmentCell.addCollidableMesh("landlordLivingroomWallW3", "craftsmanWall", "blueWallpaperPlainWood", [8, 0, -10], [0, 270, 0]);
apartmentCell.addCollidableMesh("landlordLivingroomWallW4", "craftsmanWall", "blueWallpaperPlainWood", [8, 0, -8], [0, 270, 0]);
apartmentCell.addCollidableMesh("landlordLivingroomWallW5Doorway", "craftsmanDoorway", "blueWallpaperPlainWood", [10, 0, -6], [0, 270, 0]);
// Landlord Bathroom
apartmentCell.addTiledGround("landlordBathroomFloor", [4, 4], "linoleumMaterial", [5, 0, -7]);
apartmentCell.addTiledCeiling("landlordBathroomCeiling", [4, 4, 1, 1], "californiaKnockdown01", [5, 2.9, -7])
apartmentCell.addCollidableMesh("landlordBathroomWallN0", "craftsmanWall", "whiteWallpaperPlainWood", [6, 0, -4]);
apartmentCell.addCollidableMesh("landlordBathroomWallN1", "craftsmanWall", "whiteWallpaperPlainWood", [8, 0, -4]);
apartmentCell.addCollidableMesh("landlordBathroomWallE0", "craftsmanWall", "whiteWallpaperPlainWood", [8, 0, -4], [0, 90, 0]);
apartmentCell.addCollidableMesh("landlordBathroomWallE1Doorway", "craftsmanDoorway", "whiteWallpaperPlainWood", [8, 0, -6], [0, 90, 0]);
apartmentCell.addCollidableMesh("landlordBathroomWallS0", "craftsmanWall", "whiteWallpaperPlainWood", [8, 0, -6], [0, 180, 0]);
apartmentCell.addCollidableMesh("landlordBathroomWallS1", "craftsmanWall", "whiteWallpaperPlainWood", [6, 0, -6], [0, 180, 0]);
apartmentCell.addCollidableMesh("landlordBathroomWallW0", "craftsmanWall", "whiteWallpaperPlainWood", [6, 0, -6], [0, 270, 0]);
apartmentCell.addCollidableMesh("landlordBathroomWallW1", "craftsmanWall", "whiteWallpaperPlainWood", [6, 0, -4], [0, 270, 0]);

// Commons 1
apartmentCell.addTiledGround("commons1Floor0", [4, 14], "woodenFloorDark26", [1, 0, -27]);
apartmentCell.addTiledCeiling("commons1Ceiling0", [4, 14], "woodenFloorDark26", [1, 2.9, -27]);
apartmentCell.addTiledGround("commons1Floor2", [10], "woodenFloorDark26", [5, 0, -27]);
apartmentCell.addTiledCeiling("commons1Ceiling2", [10], "woodenFloorDark26", [5, 2.9, -27]);
apartmentCell.addTiledGround("commons1Floor2", [2, 4], "woodenFloorDark26", [-1, 0, -27]);
apartmentCell.addTiledCeiling("commons1Ceiling2", [2, 4], "woodenFloorDark26", [-1, 2.9, -27]);
apartmentCell.addTiledGround("commonsFloor01d", [2, 6], "woodenFloorDark26", [-1, 0, -19]);
apartmentCell.addTiledCeiling("commonsCeiling01d", [2, 6], "woodenFloorDark26", [-1, 2.9, -19]);
apartmentCell.addCollidableMesh("commons1WallN0", "craftsmanWall", "greenWallpaperPlainWood", [0, 0, -14]);
apartmentCell.addCollidableMesh("commons1WallN1Doorway", "craftsmanDoorway", "greenWallpaperPlainWood", [2, 0, -14]);
apartmentCell.addDoor("ozzyApartmentDoor", "Ozzy's Apartment", undefined, "simpleDoor", "simpleDoor", [2, 0, -13], undefined, undefined, { "opensInward":false });
apartmentCell.addCollidableMesh("commons1WallN2", "craftsmanWall", "greenWallpaperPlainWood", [4, 0, -14]);
apartmentCell.addCollidableMesh("commons1WallE0", "craftsmanWall", "greenWallpaperPlainWood", [4, 0, -14], [0, 90, 0]);
apartmentCell.addCollidableMesh("commons1WallE1Doorway", "craftsmanDoorway", "greenWallpaperPlainWood", [4, 0, -16], [0, 90, 0]);
apartmentCell.addDoor("landlordApartmentDoor", "Landlord's Apartment", undefined, "simpleDoor", "simpleDoor", [5, 0, -16], [0, 90, 0], undefined, { "entityLocked":true, "key":"alBuildingLocationKey", "opensInward":false});
apartmentCell.addCollidableMesh("commons1WallE1Corner0", "craftsmanCorner", "greenWallpaperPlainWood", [4, 0, -18], [0, 90, 0]);
apartmentCell.addCollidableMesh("commons1WallN3", "craftsmanWall", "greenWallpaperPlainWood", [6, 0, -18]);
apartmentCell.addCollidableMesh("commons1WallN4", "craftsmanWall", "greenWallpaperPlainWood", [8, 0, -18]);
apartmentCell.addCollidableMesh("commons1WallN5", "craftsmanWall", "greenWallpaperPlainWood", [10, 0, -18]);
apartmentCell.addCollidableMesh("commons1WallN6", "craftsmanWall", "greenWallpaperPlainWood", [12, 0, -18]);
apartmentCell.addCollidableMesh("commons1WallN7", "craftsmanWall", "greenWallpaperPlainWood", [14, 0, -18]);
apartmentCell.addCollidableMesh("commons1WallE2", "craftsmanWall", "greenWallpaperPlainWood", [14, 0, -18], [0, 90, 0]);
apartmentCell.addCollidableMesh("commons1WallE3", "craftsmanWall", "greenWallpaperPlainWood", [14, 0, -20], [0, 90, 0]);
apartmentCell.addCollidableMesh("commons1WallE4", "craftsmanWall", "greenWallpaperPlainWood", [14, 0, -22], [0, 90, 0]);
apartmentCell.addCollidableMesh("commons1WallE5Windowframe", "craftsmanWindowframe", "greenWallpaperPlainWood", [14, 0, -24], [0, 90, 0]);
apartmentCell.addCollidableMesh("commons1WallE5Window", "craftsmanWindowDouble", "greenWallpaperPlainWood", [14, 0, -24], [0, 90, 0]);
apartmentCell.addCollidableMesh("commons1WallE6", "craftsmanWall", "greenWallpaperPlainWood", [14, 0, -26], [0, 90, 0]);
apartmentCell.addCollidableMesh("commons1WallS0", "craftsmanWall", "greenWallpaperPlainWood", [14, 0, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh("commons1WallS1Windowframe", "craftsmanWindowframe", "greenWallpaperPlainWood", [12, 0, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh("commons1WallS1Window", "craftsmanWindowDouble", "greenWallpaperPlainWood", [12, 0, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh("commons1WallS2", "craftsmanWall", "greenWallpaperPlainWood", [10, 0, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh("commons1WallS3Windowframe", "craftsmanWindowframe", "greenWallpaperPlainWood", [8, 0, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh("commons1WallS3Window", "craftsmanWindowDouble", "greenWallpaperPlainWood", [8, 0, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh("commons1WallS4", "craftsmanWall", "greenWallpaperPlainWood", [6, 0, -26], [0, 180, 0]);
// Commons 1 Divider
 apartmentCell.addCollidableMesh("commons1WallS5DividerWall0", "craftsmanWall", "greenWallpaperPlainWood", [6, 0, -26], [0, 270, 0]);
 apartmentCell.addCollidableMesh("commons1WallS5DividerCorner0", "craftsmanCorner", "greenWallpaperPlainWood", [4, 0, -24], [0, 180, 0]);
 apartmentCell.addCollidableMesh("commons1WallS5DividerCorner1", "craftsmanCorner", "greenWallpaperPlainWood", [6, 0, -24], [0, 270, 0]);
 apartmentCell.addCollidableMesh("commons1WallS5DividerWall1", "craftsmanWall", "greenWallpaperPlainWood", [4, 0, -26], [0, 90, 0]);
apartmentCell.addCollidableMesh("commons1WallS5Doorway", "craftsmanDoorway", "greenWallpaperPlainWood", [4, 0, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh("commons1WallS6", "craftsmanWall", "greenWallpaperPlainWood", [2, 0, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh("commons1WallS7Windowframe", "craftsmanWindowframe", "greenWallpaperPlainWood", [0, 0, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh("commons1WallS7Window", "craftsmanWindowDouble", "greenWallpaperPlainWood", [0, 0, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh("commons1WallW0", "craftsmanWall", "greenWallpaperPlainWood", [0, 0, -26], [0, 270, 0]);
apartmentCell.addCollidableMesh("commons1WallW1Windowframe", "craftsmanWindowframe", "greenWallpaperPlainWood", [0, 0, -24], [0, 270, 0]);
apartmentCell.addCollidableMesh("commons1WallW1Window", "craftsmanWindowDouble", "greenWallpaperPlainWood", [0, 0, -24], [0, 270, 0]);
apartmentCell.addCollidableMesh("commons1WallW2", "craftsmanWallNoTrim", "greenWallpaperPlainWood", [0, 0, -22], [0, 270, 0]);
apartmentCell.addCollidableMesh("commons1WallW3", "craftsmanWallNoTrim", "greenWallpaperPlainWood", [0, 0, -20], [0, 270, 0]);
apartmentCell.addCollidableMesh("commons1WallW4Windowframe", "craftsmanWindowframe", "greenWallpaperPlainWood", [0, 0, -18], [0, 270, 0]);
apartmentCell.addCollidableMesh("commons1WallW4Window", "craftsmanWindowDouble", "greenWallpaperPlainWood", [0, 0, -18], [0, 270, 0]);
apartmentCell.addCollidableMesh("commons1WallW5", "craftsmanWall", "greenWallpaperPlainWood", [0, 0, -16], [0, 270, 0]);
apartmentCell.addCollidableMesh("commons1WallW6", "craftsmanWall", "greenWallpaperPlainWood", [0, 0, -14], [0, 270, 0]);
// Commons 1 Stairwell
 apartmentCell.addCollisionRamp([0, 0, -22.5], [2, 3, -17.5]);
 apartmentCell.addCollidableMesh("commons1StairCorner", "craftsmanCorner", "greenWallpaperPlainWood", [2, 0, -18], [0, 270, 0]);
 apartmentCell.addCollidableMesh("commons1StairWallSide", "craftsmanStairWallSide", "greenWallpaperPlainWood", [2, 0, -20]);
 apartmentCell.addCollidableMesh("commons1StairWallCorner", "craftsmanStairWallCorner", "greenWallpaperPlainWood",[2, 0, -22]);
 apartmentCell.addCollidableMesh("commons1Stairs0", "craftsmanStairs", "greenWallpaperPlainWood", [0, 0, -22]);
 apartmentCell.addCollidableMesh("commons1Stairs1", "craftsmanStairs", "greenWallpaperPlainWood", [0, 1.5, -20]);
 apartmentCell.addCollidableMesh("commons1BasementDoorway", "craftsmanDoorway", "greenWallpaperPlainWood", [0, 0, -18], [0, 180, 0]);
 apartmentCell.addCollidableMesh("commons1StairsRailing0", "craftsmanStairsRailingRight", "greenWallpaperPlainWood", [0, 0, -22]);
 apartmentCell.addCollidableMesh("commons1StairsRailing1", "craftsmanStairsRailingRight", "greenWallpaperPlainWood", [0, 1.5, -20]);
 apartmentCell.addMesh("commons1StairBasementBaseTL", "craftsmanStairBaseTrimLeftTop", "greenWallpaperPlainWood", [0, 1.5, -20]);
 apartmentCell.addMesh("commons1StairBasementCrownTL", "craftsmanStairCrownTrimLeftTop", "greenWallpaperPlainWood", [0, 3, -20]);
 apartmentCell.addMesh("commons1StairBasementBaseBL", "craftsmanStairBaseTrimLeftBottom", "greenWallpaperPlainWood", [0, 0, -22]);
 apartmentCell.addMesh("commons1StairBasementCrownBL", "craftsmanStairCrownTrimLeftBottom", "greenWallpaperPlainWood", [0, 3, -22]);
 apartmentCell.addMesh("commons1StairwellFloorGap0", "craftsmanWallCeilingFloorGap", "greenWallpaperPlainWood", [0, 0, -20], [0, 90, 0]);
 apartmentCell.addMesh("commons1StairwellFloorGap1", "craftsmanWallCeilingFloorGap", "greenWallpaperPlainWood", [0, 0, -22], [0, 90, 0]);
 apartmentCell.addDoor("packstreetApt3ApartmentToBasementDoor", "Basement", new TeleportMarker("packstreetApt3Basement", "packstreetApt3BasementCell", [0, 0, -19.5]), "simpleDoor", "simpleDoor", [0, 0, -19], [0, 180, 0], undefined, {opensInward:true});

apartmentCell.addFurniture("commonsCouch", "couch01", [8.25, 0, -22], [0, -90, 0]);
apartmentCell.addCollidableMesh("commonsTableInstance01", "diningTable", "woodenFloorDark26", [10, 0, -22], [0, -90, 0]);
apartmentCell.addItem("knife", "knife01", [9.7, 0.9, -22.5], [180, 0, 0]);
apartmentCell.addItem("cross", "cross01", [10, 0.85, -22]);
apartmentCell.addItem("plateInstance01", "plate01", [9.7, 0.75, -21.5]);
apartmentCell.addItem("cheeseWedgeInstance01", "cheeseWedge", [9.7, 0.775, -21.5]);
apartmentCell.addItem("plateInstance02", "plate01", [10, 0.75, -22.5]);
apartmentCell.addItem("alBuildingLocationKeyInstance", "alBuildingLocationKey", [10, 0.75, -22.75]);
apartmentCell.addItem("packstreet23StrangeNewDayInstance", "packstreet23StrangeNewDay", [10, 0.75, -21.25], [0, 180, 0]);
apartmentCell.addItem("packstreet24PaintJobInstance", "packstreet24PaintJob", [10, 0.75, -21], [0, 180, 0]);

apartmentCell.addLighting("commonsLamp", "lamp01", [-0.5, 0, -26.5]);

apartmentCell.addDoor("apartmentBuildingDoor", "Door", undefined, "craftsmanDoor", "crossPanelDoor", [4, 0, -27], undefined, undefined, { "entityLocked":true, "key":"alBuildingLocationKey", "opensInward":false });

// Second Floor

// Commons 2
apartmentCell.addTiledGround("commons2Floor0", {xmin:0, zmin:0, xmax: 4, zmax: 14, subdivisions: {w:4, h:14}}, "carpet02-pink", [1, 3, -27]);
apartmentCell.addTiledCeiling("commons2Ceiling0", {xmin:0, zmin:0, xmax: 14, zmax: 28, subdivisions: {w:14, h:28}}, "greenWallpaper", [1, 5.9, -27]);
apartmentCell.addTiledGround("commons2Floor1", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, "carpet02-pink", [-1, 3, -27]);
apartmentCell.addTiledCeiling("commons2Ceiling1", {xmin:0, zmin:0, xmax: 2, zmax: 20, subdivisions: {w:2, h:20}}, "greenWallpaper", [-1, 5.9, -19]);
apartmentCell.addTiledGround("commons2Floor2", {xmin:0, zmin:0, xmax: 2, zmax: 6, subdivisions: {w:2, h:6}}, "carpet02-pink", [-1, 3, -19]);
apartmentCell.addTiledCeiling("commons2Ceiling2", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, "greenWallpaper", [-1, 5.9, -27]);
apartmentCell.addCollidableMesh("commons2WallN0", "craftsmanWall", "greenWallpaperPlainWood", [0, 3, -14]);
apartmentCell.addCollidableMesh("commons2WallN1Doorway", "craftsmanDoorway", "greenWallpaperPlainWood", [2, 3, -14]);
apartmentCell.addDoor("chartyApartmentDoor", "Charlie and Marty's Apartment", undefined, "simpleDoor", "simpleDoor", [2, 3, -13], [0, 0, 0], undefined, {opensInward:false});
apartmentCell.addCollidableMesh("commons2WallN2", "craftsmanWall", "greenWallpaperPlainWood", [4, 3, -14]);
apartmentCell.addCollidableMesh("commons2WallE0", "craftsmanWall", "greenWallpaperPlainWood", [4, 3, -14], [0, 90, 0]);
apartmentCell.addCollidableMesh("commons2WallE1Doorway", "craftsmanDoorway", "greenWallpaperPlainWood", [4, 3, -16], [0, 90, 0]);
apartmentCell.addDoor("kyleApartmentDoor", "Kyle's Apartment", undefined, "simpleDoor", "simpleDoor", [5, 3, -16], [0, 90, 0], undefined, {opensInward:false});
apartmentCell.addCollidableMesh("commons2WallE2", "craftsmanWall", "greenWallpaperPlainWood", [4, 3, -18], [0, 90, 0]);
apartmentCell.addCollidableMesh("commons2WallE3", "craftsmanWall", "greenWallpaperPlainWood", [4, 3, -20], [0, 90, 0]);
apartmentCell.addCollidableMesh("commons2WallE4", "craftsmanWall", "greenWallpaperPlainWood", [4, 3, -22], [0, 90, 0]);
apartmentCell.addCollidableMesh("commons2WallE5", "craftsmanWall", "greenWallpaperPlainWood", [4, 3, -24], [0, 90, 0]);
apartmentCell.addCollidableMesh("commons2WallE6", "craftsmanWall", "greenWallpaperPlainWood", [4, 3, -26], [0, 90, 0]);
apartmentCell.addCollidableMesh("commons2WallS0Windowframe", "craftsmanWindowframe", "greenWallpaperPlainWood", [4, 3, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh("commons2WallS0Window", "craftsmanWindowDouble", "greenWallpaperPlainWood", [4, 3, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh("commons2WallS1", "craftsmanWall", "greenWallpaperPlainWood", [2, 3, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh("commons2WallS2Windowframe", "craftsmanWindowframe", "greenWallpaperPlainWood", [0, 3, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh("commons2WallS2Window", "craftsmanWindowDouble", "greenWallpaperPlainWood", [0, 3, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh("commons2WallW0", "craftsmanWall", "greenWallpaperPlainWood", [0, 3, -26], [0, 270, 0]);
apartmentCell.addCollidableMesh("commons2WallW1", "craftsmanWall", "greenWallpaperPlainWood", [0, 3, -24], [0, 270, 0]);
apartmentCell.addCollidableMesh("commons2WallW2", "craftsmanWallNoTrim", "greenWallpaperPlainWood", [0, 3, -22], [0, 270, 0]);
apartmentCell.addCollidableMesh("commons2WallW3", "craftsmanWallNoTrim", "greenWallpaperPlainWood", [0, 3, -20], [0, 270, 0]);
apartmentCell.addCollidableMesh("commons2WallW4", "craftsmanWall", "greenWallpaperPlainWood", [0, 3, -18], [0, 270, 0]);
apartmentCell.addCollidableMesh("commons2WallW5", "craftsmanWall", "greenWallpaperPlainWood", [0, 3, -16], [0, 270, 0]);
apartmentCell.addCollidableMesh("commons2WallW6", "craftsmanWall", "greenWallpaperPlainWood", [0, 3, -14], [0, 270, 0]);
// Commons 2 Stairwell
apartmentCell.addCollisionRamp([0, 3, -22.5], [2, 6, -17.5]);
apartmentCell.addCollidableMesh("commons2Stairs0", "craftsmanStairs", "greenWallpaperPlainWood", [0, 3, -22]);
apartmentCell.addCollidableMesh("commons2Stairs1", "craftsmanStairs", "greenWallpaperPlainWood", [0, 4.5, -20]);
apartmentCell.addCollidableMesh("commons2StairwellRailing0", "craftsmanFloorRailingLeft", "greenWallpaperPlainWood", [-1, 3, -20], [0, 180, 0]);
apartmentCell.addCollidableMesh("commons2StairwellRailing1", "craftsmanFloorRailingRight", "greenWallpaperPlainWood", [1, 3, -22]);
apartmentCell.addCollidableMesh("commons2StairsRailing0", "craftsmanStairsRailingRight", "greenWallpaperPlainWood", [0, 3, -22]);
apartmentCell.addCollidableMesh("commons2StairsRailing1", "craftsmanStairsRailingRight", "greenWallpaperPlainWood", [0, 4.5, -20]);
apartmentCell.addMesh("commons2StairwellFloorGap0", "craftsmanWallCeilingFloorGap", "greenWallpaperPlainWood", [0, 3, -20], [0, 90, 0]);
apartmentCell.addMesh("commons2StairwellFloorGap1", "craftsmanWallCeilingFloorGap", "greenWallpaperPlainWood", [0, 3, -22], [0, 90, 0]);

// Charty Apartment
// Charty Livingroom
apartmentCell.addTiledGround("chartyLivingroomFloor", {xmin:0, zmin:0, xmax: 16, zmax: 6, subdivisions: {w:16, h:6}}, "carpet02-pink", [-1, 3, -13]);
apartmentCell.addCollisionPlaneByMesh("chartyLivingroomFloor");

apartmentCell.addCollisionWall([-1, 3, -7], [7, 6, -7]); // Front wall between livingroom and Charlie's bedroom
apartmentCell.addCollisionWall([9, 3, -7], [15, 6, -7]); // Front wall between livingroom and Marty's bedroom

apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 3, -8]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [2, 3, -8]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [4, 3, -8]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [6, 3, -8]);
apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood", [8, 3, -8]);
apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood", [8, 3, -8], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [10, 3, -8]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [12, 3, -8]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [14, 3, -8]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [14, 3, -8], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [14, 3, -10], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [14, 3, -12], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [14, 3, -12], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [12, 3, -12], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [10, 3, -12], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [8, 3, -12], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [6, 3, -12], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [4, 3, -12], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [2, 3, -12], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 3, -12], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 3, -12], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 3, -10], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 3, -8], [0, 270, 0]);

// Charty Hallway
apartmentCell.addTiledGround("chartyHallwayFloor", {xmin:0, zmin:0, xmax: 4, zmax: 2, subdivisions: {w:4, h:2}}, "carpet02-pink", [5, 3, -7]);
apartmentCell.addCollisionPlaneByMesh("chartyHallwayFloor");

apartmentCell.addCollisionWall([7, 3, -5], [9, 6, -5]); // Front wall between hallway and bathroom

apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [6, 3, -6]);
apartmentCell.addDoor("chartyBathroomDoor", "Bathroom", undefined, "simpleDoor", "simpleDoor", [6, 3, -5]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [8, 3, -6]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [8, 3, -6], [0, 90, 0]);
apartmentCell.addDoor("martyBedroomDoor", "Marty's Room", undefined, "simpleDoor", "simpleDoor", [9, 3, -6], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood", [8, 3, -6], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [6, 3, -6], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [6, 3, -6], [0, 270, 0]);
apartmentCell.addDoor("charlieBedroomDoor", "Charlie's Room", undefined, "simpleDoor", "simpleDoor",[5, 3, -6], [0, 90, 0], {opensInward:true});

// Charlie bedroom
apartmentCell.addTiledGround("charlieBedroomFloor", {xmin:0, zmin:0, xmax: 6, zmax: 8, subdivisions: {w:6, h:8}}, "carpet02-black", [-1, 3, -7]);
apartmentCell.addCollisionPlaneByMesh("charlieBedroomFloor");

apartmentCell.addCollisionWall([1, 3, -1], [5, 6, -1]); // Front wall between Charlie's closet and bedroom
apartmentCell.addCollisionWall([5, 3, 1], [5, 6, -5]); // Side wall between Charlie's bedroom and bathroom

apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "blackWallpaperPlainWood", [0, 3, -2]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", [2, 3, -2]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", [4, 3, -2]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", [4, 3, -2], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", [4, 3, -4], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "blackWallpaperPlainWood", [4, 3, -6], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", [4, 3, -6], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", [2, 3, -6], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", [0, 3, -6], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", [0, 3, -6], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", [0, 3, -4], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", [0, 3, -2], [0, 270, 0]);

// Charlie Closet
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", [0, 3, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", [2, 3, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", [4, 3, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", [4, 3, 0], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", [4, 3, 0], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", [2, 3, 0], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "blackWallpaperPlainWood", [0, 3, 0], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", [0, 3, 0], [0, 270, 0]);

// Charty Bathroom
apartmentCell.addTiledGround("chartyBathroomFloor", {xmin:0, zmin:0, xmax: 4, zmax: 6, subdivisions: {w:4, h:6}}, "linoleumMaterial", [5, 3, -5]);
apartmentCell.addCollisionPlaneByMesh("chartyBathroomFloor");

apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [6, 3, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [8, 3, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [8, 3, 0], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [8, 3, -2], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [8, 3, -4], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [8, 3, -4], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [6, 3, -4], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [6, 3, -4], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [6, 3, -2], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [6, 3, 0], [0, 270, 0]);

// Marty bedroom
apartmentCell.addTiledGround("martyBedroomFloor", {xmin:0, zmin:0, xmax: 6, zmax: 8, subdivisions: {w:6, h:8}}, "woodenFloorDark01", [9, 3, -7]);
apartmentCell.addCollisionPlaneByMesh("martyBedroomFloor");

apartmentCell.addCollisionWall([9, 3, -1], [13, 6, -1]); // Front wall between Marty's closet and bedroom
apartmentCell.addCollisionWall([9, 3, 1], [9, 6, -5]); // Side wall between Narty's bedroom and bathroom

apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [10, 3, -2]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [12, 3, -2]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [14, 3, -2]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [14, 3, -2], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [14, 3, -4], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [14, 3, -6], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [14, 3, -6], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [12, 3, -6], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [10, 3, -6], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [10, 3, -6], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [10, 3, -4], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [10, 3, -2], [0, 270, 0]);

// Marty Closet
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [10, 3, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [12, 3, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [14, 3, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [14, 3, 0], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [14, 3, 0], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [12, 3, 0], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [10, 3, 0], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [10, 3, 0], [0, 270, 0]);

// Kyle's Apartment
//apartmentCell.addCollisionPlane([5, -27], [15, -13], 3);

// Third Floor Hallway
apartmentCell.addCollisionWall([-1, 6, -13], [3, 9, -13]); // Front hallway wall
apartmentCell.addCollisionWall([5, 6, -13], [5, 9, -21]); // Side hallway wall
apartmentCell.addCollisionWall([5, 6, -23], [5, 9, -27]); // Side hallway wall

apartmentCell.addCollisionRamp([0, 6, -22.5], [2, 9, -17.5]);

apartmentCell.addCollidableMesh(undefined, "craftsmanStairs", "greenWallpaperPlainWood", [0, 6, -22]);
apartmentCell.addCollidableMesh(undefined, "craftsmanStairs", "greenWallpaperPlainWood", [0, 7.5, -20]);

apartmentCell.addTiledGround("commonsFloor03a", {xmin:0, zmin:0, xmax: 4, zmax: 14, subdivisions: {w:4, h:14}}, "carpet02-pink", [1, 6, -27]);
apartmentCell.addCollisionPlaneByMesh("commonsFloor03a");
apartmentCell.addTiledGround("commonsFloor03b", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, "carpet02-pink", [-1, 6, -27]);
apartmentCell.addCollisionPlaneByMesh("commonsFloor03b");
apartmentCell.addTiledGround("commonsFloor03c", {xmin:0, zmin:0, xmax: 2, zmax: 6, subdivisions: {w:2, h:6}}, "carpet02-pink", [-1, 6, -19]);
apartmentCell.addCollisionPlaneByMesh("commonsFloor03c");

apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 6, -14]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [2, 6, -14]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [4, 6, -14]);
apartmentCell.addDoor("twinsApartmentDoor", "Anneke and Wolter's Apartment", undefined, "simpleDoor", "simpleDoor", [4, 6, -13], [0, 0, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [4, 6, -14], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [4, 6, -16], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [4, 6, -18], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [4, 6, -20], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [4, 6, -22], [0, 90, 0]);
apartmentCell.addDoor("remmyApartmentDoor", "Remmy's Apartment", undefined, "simpleDoor", "simpleDoor", [5, 6, -22], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [4, 6, -24], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [4, 6, -26], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood", [4, 6, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood", [4, 6, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [2, 6, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood", [0, 6, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood", [0, 6, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 6, -26], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 6, -24], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "greenWallpaperPlainWood", [0, 6, -22], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "greenWallpaperPlainWood", [0, 6, -20], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 6, -18], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 6, -16], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 6, -14], [0, 270, 0]);

// 'outside'
apartmentCell.addCollisionWall([15, 0, -27], [15, 3, -31]);
apartmentCell.addCollisionWall([-1, 0, -27], [-1, 3, -31]);
apartmentCell.addCollisionWall([-1, 0, -31], [15, 3, -31]);

apartmentCell.addTiledGround("outsideFloorStone", {xmin:0, zmin:0, xmax: 16, zmax: 4, subdivisions: {w:16, h:4}}, "stoneMaterial01", [-1, -0.0625, -31]);

apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", [0, 0, -28]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", [2, 0, -28]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorwayNoTrim", "whitePanelGrayStone", [4, 0, -28]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", [6, 0, -28]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", [8, 0, -28]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", [10, 0, -28]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", [12, 0, -28]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", [14, 0, -28]);

apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", [0, 3, -28]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", [2, 3, -28]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", [4, 3, -28]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", [6, 3, -28]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", [8, 3, -28]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", [10, 3, -28]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", [12, 3, -28]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", [14, 3, -28]);

apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", [0, 6, -28]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", [2, 6, -28]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", [4, 6, -28]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", [6, 6, -28]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", [8, 6, -28]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", [10, 6, -28]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", [12, 6, -28]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", [14, 6, -28]);

apartmentCell.addCollidableMesh("stopSignInstance01", "stopSign", "stopSign", [4, 0, -29], [0, 180, 0]);
apartmentCell.addCollidableMesh("sawhorseInstance01", "sawhorse", undefined, [3.3, 0, -29], [0, 33, 0]);
apartmentCell.addCollidableMesh("twoByFourByThreeSr", "twoByFourByThree", undefined, [3, 0, -29.2], [30, 33, -5]);
apartmentCell.addCollidableMesh("twoByFourByThreeJr", "twoByFourByThree", undefined, [2.9, 0, -29.15], [30, 33, -5]);
apartmentCell.addMaterial("brickWall01", "brickWall01", "brickWall01-NORMAL");
apartmentCell.addCollidableMesh("brickWallInstance00", "brickWall01", "brickWall01", [7, 0, -29], [0, 90, 0], [2, 1, 1]);
apartmentCell.addCollidableMesh("brickWallInstance01", "brickWall01", "brickWall01", [6, 0, -30]);
apartmentCell.addCollidableMesh("brickWallInstance02", "brickWall01", "brickWall01", [4, 0, -30]);
apartmentCell.addCollidableMesh("brickWallInstance03", "brickWall01", "brickWall01", [2, 0, -30]);
apartmentCell.addCollidableMesh("brickWallInstance04", "brickWall01", "brickWall01", [0, 0, -30]);
apartmentCell.addCollidableMesh("brickWallInstance05", "brickWall01", "brickWall01", [-1, 0, -29], [0, 90, 0]);
apartmentCell.addCollidableMesh("brickWallInstance06", "brickWall01", "brickWall01", [-1.075, 0, -27.075], [0, 85, 0]);

// Misc
apartmentCell.addCharacter("rinehart", "rinehart", [3, 0, -20], [0, 180, 0]);
apartmentCell.addCharacter("rosie", "rosie", [2, 0, -3.35]);
apartmentCell.addCharacter("charlie", "charlie", [2, 0, -4], [0, 180, 0], [0.9, 0.9, 0.9]);

let packstreetApt3BasementCell = new Cell("packstreetApt3BasementCell");
packstreetApt3BasementCell.createBarrier(32);

packstreetApt3BasementCell.addCollidableMesh("unusableBasementStairsBottom", "craftsmanStairs", "greenWallpaperPlainWood", [0, 0.05, -22]);
packstreetApt3BasementCell.addCollidableMesh("unusableBasementStairsTop", "craftsmanStairs", "greenWallpaperPlainWood", [0, 1.55, -20]);
packstreetApt3BasementCell.addDoor("packstreetApt3BasementToApartmentDoor", "Basement", new TeleportMarker("packstreetApt3", "apartmentCell", [0, 0, -18]), "simpleDoor", "simpleDoor", [0, 0, -19], [0, 180, 0], undefined, {opensInward:true});
packstreetApt3BasementCell.addCollidableMesh("basementDoorway", "craftsmanDoorway", "greenWallpaperPlainWood", [0, 0, -20]);
 packstreetApt3BasementCell.addCollidableMesh("basementStairwellLeftSidewall", "craftsmanStairWallSideNoTrim", "greenWallpaperPlainWood", [0, 0, -20], undefined, [-1, 1, 1]);
 packstreetApt3BasementCell.addCollidableMesh("basementStairwellLeftSidewallCorner", "craftsmanStairWallCornerNoTrim", "greenWallpaperPlainWood", [0, 0, -22], undefined, [-1, 1, 1]);
 packstreetApt3BasementCell.addCollidableMesh("basementStairwellRightSidewall", "craftsmanStairWallSideNoTrim", "greenWallpaperPlainWood", [0.0525, 0, -20.0125]);
 packstreetApt3BasementCell.addCollidableMesh("basementStairwellRightSidewallCorner", "craftsmanStairWallCornerNoTrim", "greenWallpaperPlainWood", [0.0525, 0, -22.0125]);
 packstreetApt3BasementCell.addCollidableMesh("basementStairsTop", "craftsmanStairs", "greenWallpaperPlainWood", [0, -3, -22]);
 packstreetApt3BasementCell.addCollidableMesh("basementStairsBottom", "craftsmanStairs", "greenWallpaperPlainWood", [0, -1.5, -20]);
  // Basement Area
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [0, -3, -14], [0, 270, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [0, -3, -16], [0, 270, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [0, -3, -18], [0, 270, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [0, -3, -20], [0, 270, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [0, -3, -22], [0, 270, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [0, -3, -24], [0, 270, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [0, -3, -26], [0, 270, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [0, -3, -26], [0, 180, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [2, -3, -26], [0, 180, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [4, -3, -26], [0, 180, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [6, -3, -26], [0, 180, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [8, -3, -26], [0, 180, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [10, -3, -26], [0, 180, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [12, -3, -26], [0, 180, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [12, -3, -26], [0, 90, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [12, -3, -24], [0, 90, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [12, -3, -22], [0, 90, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [12, -3, -20], [0, 90, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [12, -3, -18], [0, 90, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [12, -3, -16], [0, 90, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [12, -3, -14], [0, 90, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [12, -3, -14], [0, 0, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [10, -3, -14], [0, 0, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [8, -3, -14], [0, 0, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [6, -3, -14], [0, 0, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [4, -3, -14], [0, 0, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [2, -3, -14], [0, 0, 0]);
 packstreetApt3BasementCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "stoneMaterial01", [0, -3, -14], [0, 0, 0]);

 packstreetApt3BasementCell.addTiledGround("basementStoneFloor", {xmin:0, zmin:0, xmax: 14, zmax: 14, subdivisions: {w:14, h:14}}, "stoneMaterial01", [-1, -3, -27]);
 packstreetApt3BasementCell.addTiledCeiling("basementStoneCeiling01", {xmin:0, zmin:0, xmax: 2, zmax: 6, subdivisions: {w:2, h:6}}, "woodenFloorDark26", [-1, -.05, -19]);
 packstreetApt3BasementCell.addTiledCeiling("basementStoneCeiling02", {xmin:0, zmin:0, xmax: 12, zmax: 14, subdivisions: {w:12, h:14}}, "woodenFloorDark26", [1, -.05, -27]);
 packstreetApt3BasementCell.addTiledCeiling("basementStoneCeiling03", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, "woodenFloorDark26", [-1, -.05, -27]);

/**
 * @type {Cell}
 */
let networkTestCell = new Cell("networkTestCell");
networkTestCell.createBarrier(32);
networkTestCell.addCollidableMesh("stoneFloor", "floor16x16", "stoneMaterial01", [-5, 0, -5]);
networkTestCell.addCollidableMesh("greenWall", "craftsmanWall", "greenWallpaperPlainWood", [1, 0, -2], [0, 180, 0]);
networkTestCell.addCollidableMesh("yellowWall", "craftsmanWall", "yellowWallpaperPlainWood", [3, 0, -2], [0, 180, 0]);
networkTestCell.addCollidableMesh("pinkWall", "craftsmanWall", "pinkWallpaperPlainWood", [5, 0, -2], [0, 180, 0]);
networkTestCell.addCollidableMesh("greenDoorway", "craftsmanDoorway", "greenWallpaperPlainWood", [1, 0, 0], [0, 180, 0]);
networkTestCell.addCollidableMesh("secondGreenWall", "craftsmanWall", "greenWallpaperPlainWood", [-1, 0, 0], [0, 180, 0]);
networkTestCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [-3, 0, 0], [0, 180, 0]); // Third green wall
networkTestCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [-5, 0, 0], [0, 180, 0]); // Forth green wall
networkTestCell.addCollidableMesh("yellowDoorway", "craftsmanDoorway", "yellowWallpaperPlainWood", [3, 0, 0], [0, 180, 0]);
networkTestCell.addCollidableMesh("pinkDoorway", "craftsmanDoorway", "pinkWallpaperPlainWood", [5, 0, 0], [0, 180, 0]);
networkTestCell.addCollidableMesh("secondPinkWall", "craftsmanWall", "pinkWallpaperPlainWood", [7, 0, 0], [0, 180, 0]);
networkTestCell.addDoor("inwardClosedDoor", "Inward Closed Door", undefined, "simpleDoor", "simpleDoor", [1, 0, -1], [0, 180, 0], undefined, {"opensInward":true});
networkTestCell.addDoor("outwardClosedDoor", "Outward Closed Door", undefined, "simpleDoor", "simpleDoor", [3, 0, -1], [0, 180, 0], undefined, {"opensInward":false});
networkTestCell.addDoor("inwardOpenedDoor", "Inward Opened Door", undefined, "simpleDoor", "simpleDoor", [5, 0, -1], [0, 180, 0], undefined, {"open":true, "opensInward":true});
networkTestCell.addCollidableMesh(undefined, "stick01", "stick01", [0, 0, 3], undefined, [10, 10, 10]);
networkTestCell.addCollidableMesh(undefined, "stopSign", "stopSign", [3, 0, 6]);
networkTestCell.addLighting("commonsLamp", "lamp01", [6, 0, 3]);
networkTestCell.addCharacter("rinehart", "rinehart", [3, 0, 0], [0, 180, 0]);
networkTestCell.addItem("cheeseWedgeInstance01", "cheeseWedge", [3, 0, 3]);
networkTestCell.addItem("cheeseWheelSansWedgeInstance01", "cheeseWheelSansWedge", [3, 0, 3]);

let debugMovementCell = new Cell("debugMovementCell");
debugMovementCell.createBarrier(32);
debugMovementCell.addMesh("stoneFloor", "floor16x16", "stoneMaterial01", [-5, 0, -5]);
debugMovementCell.addCollidableMesh("debugMovementStairs", "craftsmanStairs", "missingMaterial", [2, 0, 0], [0, 180, 0]);
debugMovementCell.addItem("cheeseWedgeInstance01", "cheeseWedge", [3, 0, 3]);

let debugDoorCell = new Cell("debugDoorCell");
debugDoorCell.createBarrier(32);
debugDoorCell.addMesh("stoneFloor", "floor16x16", "stoneMaterial01", [-5, 0, -25]);
debugDoorCell.addDoor("aDoor", "A Door", undefined, "simpleDoor", "simpleDoor", [1, 0, -1]);