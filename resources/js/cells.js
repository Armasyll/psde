console.log("Loading Scenes");
let apartmentCell = new Cell("apartmentCell");
apartmentCell.addCollisionPlane([-512, -512], [512, 512], -64);
apartmentCell.addCollisionWall([-512, -512, 512], [512, 512, 512]);
apartmentCell.addCollisionWall([512, -512, 512], [512, 512, -512]);
apartmentCell.addCollisionWall([-512, -512, -512], [512, 512, -512]);
apartmentCell.addCollisionWall([-512, -512, -512], [-512, 512, 512]);

apartmentCell.addMaterial("greenWallpaperPlainWood", "greenWallpaperPlainWood", undefined, {"hasAlpha":true});
apartmentCell.addMaterial("yellowWallpaperPlainWood", "yellowWallpaperPlainWood", undefined, {"hasAlpha":true});
apartmentCell.addMaterial("pinkWallpaperPlainWood", "pinkWallpaperPlainWood", undefined, {"hasAlpha":true});
apartmentCell.addMaterial("greenWallpaper", "greenWallpaper");
apartmentCell.addMaterial("whitePanelGrayStone", "whitePanelGrayStone", "stripped-NORMAL");
apartmentCell.addMaterial("pinkCarpetMaterial", "carpet02-pink", "carpet02-NORMAL", {specularColor:[0, 0, 0]});
apartmentCell.addMaterial("blackCarpetMaterial", "carpet02-black", "carpet02-NORMAL", {specularColor:[0, 0, 0]});
//apartmentCell.addMaterial("woodenFloorDark01", "woodenFloorDark01-DIFFUSE", "woodenFloorDark01-NORMAL", {specularColor:[0.1,0.1,0.1]});
apartmentCell.addMaterial("linoleumMaterial", "checkerLinoleumFloor01", "checkerLinoleumFloor01-NORMAL", {specularColor:[0, 0, 0]});

// Ground Floor
apartmentCell.addTiledGround("ozzyBedroomClosetFloor", {xmin:0, zmin:0, xmax: 2, zmax: 2, subdivisions: {w:2, h:2}}, "woodenFloorDark01", [-1, 0, -1]);
apartmentCell.addTiledGround("ozzyHallwayClosetFloor", {xmin:0, zmin:0, xmax: 2, zmax: 2, subdivisions: {w:2, h:2}}, "woodenFloorDark01", [1, 0, -1]);
apartmentCell.addTiledGround("ozzyBathroomFloor", {xmin:0, zmin:0, xmax: 4, zmax: 4, subdivisions: {w:4, h:4}}, "linoleumMaterial", [5, 0, -3]);
apartmentCell.addTiledGround("ozzyBedroomFloor", {xmin:0, zmin:0, xmax: 4, zmax: 6, subdivisions: {w:4, h:6}}, "woodenFloorDark01", [-1, 0, -7]);
apartmentCell.addTiledGround("ozzyHallwayFloor", {xmin:0, zmin:0, xmax: 2, zmax: 8, subdivisions: {w:2, h:8}}, "woodenFloorDark01", [3, 0, -7]);
apartmentCell.addTiledGround("ozzyLivingroomFloor", {xmin:0, zmin:0, xmax: 8, zmax: 6, subdivisions: {w:8, h:6}}, "woodenFloorDark01", [-1, 0, -13]);

apartmentCell.addTiledGround("commonsFloor01a", {xmin:0, zmin:0, xmax: 4, zmax: 14, subdivisions: {w:4, h:14}}, "woodenFloorDark26", [1, 0, -27]);
apartmentCell.addTiledGround("commonsFloor01b", {xmin:0, zmin:0, xmax: 10, zmax: 10, subdivisions: {w:10, h:10}}, "woodenFloorDark26", [5, 0, -27]);
apartmentCell.addTiledGround("commonsFloor01c", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, "woodenFloorDark26", [-1, 0, -27]);
apartmentCell.addTiledGround("commonsFloor01d", {xmin:0, zmin:0, xmax: 2, zmax: 6, subdivisions: {w:2, h:6}}, "woodenFloorDark26", [-1, 0, -19]);

apartmentCell.addTiledCeiling("ceilingMesh01", {xmin:0, zmin:0, xmax: 14, zmax: 28, subdivisions: {w:14, h:28}}, "greenWallpaper", [1, 2.9, -27]);
apartmentCell.addTiledCeiling("ceilingMesh01b", {xmin:0, zmin:0, xmax: 2, zmax: 20, subdivisions: {w:2, h:20}}, "greenWallpaper", [-1, 2.9, -19]);
apartmentCell.addTiledCeiling("ceilingMesh01c", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, "greenWallpaper", [-1, 2.9, -27]);

// Building collision walls
apartmentCell.addCollisionWall([-1, -4, 1], [15, 12.125, 1]); // Back floor wall
apartmentCell.addCollisionWall([-1, -4, 1], [-1, 12.125, -27]); // Left floor wall
apartmentCell.addCollisionWall([15, -4, 1], [15, 12.125, -27]); // Right floor wall
apartmentCell.addCollisionWall([-1, 0, -27], [3, 3, -27]); // Front floor wall, left
apartmentCell.addCollisionWall([5, 0, -27], [15, 3, -27]); // Front floor wall, right
apartmentCell.addCollisionWall([-1, 3, -27], [15, 9.125, -27]); // Front floor wall above ground floor
apartmentCell.addCollisionWall([-1, -4, -27], [15, 0, -27]); // Front floor wall below ground floor

// Ground floor collision walls
apartmentCell.addCollisionWall([1, 0, 1], [1, 3, -1]); // Side wall between Ozzy's bedroom closet and hallway closet
apartmentCell.addCollisionWall([1, 0, -1], [3, 3, -1]); // Front wall between Ozzy's hallway closet and bedroom
apartmentCell.addCollisionWall([3, 0, -3], [3, 3, -7]); // Side wall between Ozzy's bedroom and hallway
apartmentCell.addCollisionWall([-1, 0, -7], [3, 3, -7]); // Front wall between Ozzy's bedroom and livingroom

apartmentCell.addCollisionWall([9, 0, 1], [9, 3, -5]); // Side wall between Ozzy's bathroom and Landlord's apartment
apartmentCell.addCollisionWall([5, 0, -1], [5, 3, -7]); // Side wall between Ozzy's apartment and Landlord's bathroom
apartmentCell.addCollisionWall([7, 0, -7], [7, 3, -13]); // Side wall between Ozzy's and Landord's kitchenettes

apartmentCell.addCollisionWall([5, 0, -3], [9, 3, -3]); // Front wall between Ozzy's and Landlord's bathrooms
apartmentCell.addCollisionWall([5, 0, -7], [9, 3, -7]); // Front wall between Landlord's bathroom and Landlord's and Ozzy's kitchenettes
apartmentCell.addCollisionWall([5, 0, -13], [9, 3, -13]); // Front wall between Landlord's kitchenette and Landlord's entrance

apartmentCell.addCollisionWall([-1, 0, -13], [3, 3, -13]); // Front wall between Commons and Ozzy's apartment
apartmentCell.addCollisionWall([5, 0, -13], [5, 3, -15]); // Side wall between Commons and Landlord's apartment
apartmentCell.addCollisionWall([5, 0, -17], [15, 3, -17]); // Front wall between Commons and Landlord's apartment

apartmentCell.addCollisionWall([5, 0, -25], [5, 3, -27]); // Side wall between Commons and building entrance

// Ozzy Hallway Closet
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [2, 0, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood", [2, 0, 0], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [2, 0, 0], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [2, 0, 0], [0, 270, 0]);

// Ozzy Bedroom Closet
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [0, 0, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [0, 0, 0], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood", [0, 0, 0], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [0, 0, 0], [0, 270, 0]);

// Ozzy Bedroom
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood", [0, 0, -2]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [2, 0, -2]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood", [2, 0, -2], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [2, 0, -4], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [2, 0, -6], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [2, 0, -6], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [0, 0, -6], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [0, 0, -6], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "yellowWallpaperPlainWood", [0, 0, -4], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "yellowWallpaperPlainWood", [0, 0, -4], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [0, 0, -2], [0, 270, 0]);
apartmentCell.addFurniture("ozzyBed", "mattress01", [-0.1, 0, -5.395], undefined, [1.35, 1.35, 1.35]);

// Ozzy Bathroom
apartmentCell.addCollidableMesh("bathroomWall01", "craftsmanWall", "whiteWallpaperPlainWood", [6, 0, 0]);
apartmentCell.addCollidableMesh("bathroomWall02", "craftsmanWall", "whiteWallpaperPlainWood", [8, 0, 0]);
apartmentCell.addCollidableMesh("bathroomWall03", "craftsmanWall", "whiteWallpaperPlainWood", [8, 0, 0], [0, 90, 0]);
apartmentCell.addCollidableMesh("bathroomWall04", "craftsmanWall", "whiteWallpaperPlainWood", [8, 0, -2], [0, 90, 0]);
apartmentCell.addCollidableMesh("bathroomWall05", "craftsmanWall", "whiteWallpaperPlainWood", [8, 0, -2], [0, 180, 0]);
apartmentCell.addCollidableMesh("bathroomWall06", "craftsmanWall", "whiteWallpaperPlainWood", [6, 0, -2], [0, 180, 0]);
apartmentCell.addCollidableMesh("bathroomWall07", "craftsmanWall", "whiteWallpaperPlainWood", [6, 0, -2], [0, 270, 0]);
apartmentCell.addCollidableMesh("bathroomDoorway", "craftsmanDoorway", "whiteWallpaperPlainWood", [6, 0, 0], [0, 270, 0]);
apartmentCell.addFurniture("ozzyBathroomToilet", "animatedToilet01", [8.5, 0, -1], [0, 90, 0]);
apartmentCell.addFurniture("ozzyBathroomSink", "sink01", [8.95, 0, -0.25], [0, 90, 0]);
apartmentCell.addFurniture("ozzyBathroomFaucet", "animatedFaucet01", [8.95, 0, -0.25], [0, 90, 0]);
apartmentCell.addFurniture("ozzyBathroomTub", "bathtub01", [8.85, 0, -2.5], [0, 90, 0]);

// Ozzy Hallway
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "yellowWallpaperPlainWood", [4, 0, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "yellowWallpaperPlainWood", [4, 0, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood", [4, 0, 0], [0, 90, 0]);
apartmentCell.addDoor("ozzyBathroomDoor", "Bathroom", undefined, "craftsmanDoor", "plainDoor", [5, 0, 0], [0, 90, 0], undefined, {opensInward:false});
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [4, 0, -2], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [4, 0, -4], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [4, 0, -6], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [4, 0, -6], [0, -90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [4, 0, -4], [0, -90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood", [4, 0, -2], [0, -90, 0]);
apartmentCell.addDoor("ozzyBedroomDoor", "Bedroom", undefined, "craftsmanDoor", "plainDoor", [3, 0, -2], [0, -90, 0], undefined, {opensInward:false});
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood", [4, 0, 0], [0, -90, 0]);
apartmentCell.addDoor("ozzyHallwayClosetDoor", "Closet", undefined, "craftsmanDoor", "plainDoor", [3, 0, 0], [0, -90, 0], undefined, {opensInward:true});
apartmentCell.addCollidableMesh("bookShelfThinInstance01", "bookshelfThin", "bookshelfBlackPlywood", [4.7, 0, -6], [0, 90, 0]);

// Ozzy Livingroom
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [0, 0, -8]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [2, 0, -8]);
apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "yellowWallpaperPlainWood", [4, 0, -8]);
apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "yellowWallpaperPlainWood", [4, 0, -8], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [6, 0, -8], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [6, 0, -8]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [6, 0, -8], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [6, 0, -10], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [6, 0, -12], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [6, 0, -12], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood", [4, 0, -12], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [2, 0, -12], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [0, 0, -12], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [0, 0, -12], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "yellowWallpaperPlainWood", [0, 0, -10], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "yellowWallpaperPlainWood", [0, 0, -10], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", [0, 0, -8], [0, 270, 0]);
apartmentCell.addFurniture("refrigeratorOzzy", "animatedRefrigerator01", [6.35, 0, -7.75], [0, 90, 0]);
apartmentCell.addCollidableMesh("trashBagFullInstance01", "trashBagFull", undefined, [6.4, 0, -9.8]);
apartmentCell.addCollidableMesh("trashCanInstance01", "trashCan", undefined, [5.8, 0, -10.2]);
apartmentCell.addCollidableMesh("trashBagFullInstance02", "trashBagFull", undefined, [6.5, 0, -10.6], [0, 90, 0]);

// Lobby
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 0, -14]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [2, 0, -14]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [4, 0, -14]);
apartmentCell.addDoor("ozzyApartmentDoor", "Ozzy's Apartment", undefined, "craftsmanDoor", "plainDoor", [4, 0, -13], undefined, undefined, {opensInward:false});
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [4, 0, -14], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [4, 0, -16], [0, 90, 0]);
apartmentCell.addDoor("landlordApartmentDoor", "Landlord's Apartment", undefined, "craftsmanDoor", "plainDoor", [5, 0, -16], [0, 90, 0], undefined, {locked:true, key:"alBuildingLocationKey", opensInward:false});
apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood", [4, 0, -18], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [6, 0, -18]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [8, 0, -18]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [10, 0, -18]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [12, 0, -18]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [14, 0, -18]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [14, 0, -18], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [14, 0, -20], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [14, 0, -22], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood", [14, 0, -24], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood", [14, 0, -24], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [14, 0, -26], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [14, 0, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood", [12, 0, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood", [12, 0, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [10, 0, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood", [8, 0, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood", [8, 0, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [6, 0, -26], [0, 180, 0]);
// Lobby entrance divider
 apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [6, 0, -26], [0, 270, 0]);
 apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood", [4, 0, -24], [0, 180, 0]);
 apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood", [6, 0, -24], [0, 270, 0]);
 apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [4, 0, -26], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [4, 0, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [2, 0, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood", [0, 0, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood", [0, 0, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 0, -26], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 0, -24], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "greenWallpaperPlainWood", [0, 0, -22], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "greenWallpaperPlainWood", [0, 0, -20], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 0, -18], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 0, -16], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 0, -14], [0, 270, 0]);
// Lobby stairwell
 apartmentCell.addCollisionRamp([0, 0, -22.5], [2, 3, -17.5]);
 apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood", [2, 0, -18], [0, 270, 0]);
 apartmentCell.addCollidableMesh(undefined, "craftsmanStairWallSide", "greenWallpaperPlainWood", [2, 0, -20]);
 apartmentCell.addCollidableMesh(undefined, "craftsmanStairWallCorner", "greenWallpaperPlainWood",[2, 0, -22]);
 apartmentCell.addCollidableMesh(undefined, "craftsmanStairs", "greenWallpaperPlainWood", [0, 0, -22]);
 apartmentCell.addCollidableMesh(undefined, "craftsmanStairs", "greenWallpaperPlainWood", [0, 1.5, -20]);
 apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [0, 0, -18], [0, 180, 0]);
 apartmentCell.addMesh(undefined, "craftsmanStairBaseTrimLeftTop", "greenWallpaperPlainWood", [0, 1.5, -20]);
 apartmentCell.addMesh(undefined, "craftsmanStairCrownTrimLeftTop", "greenWallpaperPlainWood", [0, 3, -20]);
 apartmentCell.addMesh(undefined, "craftsmanStairBaseTrimLeftBottom", "greenWallpaperPlainWood", [0, 0, -22]);
 apartmentCell.addMesh(undefined, "craftsmanStairCrownTrimLeftBottom", "greenWallpaperPlainWood", [0, 3, -22]);
 apartmentCell.addDoor("packstreetApt3ApartmentToBasementDoor", "Basement", new TeleportMarker("packstreetApt3Basement", "packstreetApt3BasementCell", [0, 0, -19.5]), "craftsmanDoor", "plainDoor", [0, 0, -19], [0, 180, 0], undefined, {opensInward:true});

apartmentCell.addFurniture("commonsCouch", "couch01", [8.25, 0, -22], [0, -90, 0]);
apartmentCell.addCollidableMesh("commonsTableInstance01", "diningTable", undefined, [10, 0, -22], [0, -90, 0]);
apartmentCell.addItem("knife", "knife01", [9.7, 0.9, -22.5], [180, 0, 0]);
apartmentCell.addItem("cross", "cross01", [10, 0.85, -22]);
apartmentCell.addItem("plateInstance01", "plate01", [9.7, 0.75, -21.5]);
apartmentCell.addItem("cheeseWedgeInstance01", "cheeseWedge", [9.7, 0.775, -21.5]);
apartmentCell.addItem("plateInstance02", "plate01", [10, 0.75, -22.5]);
apartmentCell.addItem("alBuildingLocationKeyInstance", "alBuildingLocationKey", [10, 0.75, -22.75]);
apartmentCell.addItem("packstreet23StrangeNewDayInstance", "packstreet23StrangeNewDay", [10, 0.75, -21.25], [0, 180, 0]);
apartmentCell.addItem("packstreet24PaintJobInstance", "packstreet24PaintJob", [10, 0.75, -21], [0, 180, 0]);

apartmentCell.addLighting("commonsLamp", "lamp01", [-0.5, 0, -26.5]);

apartmentCell.addDoor("apartmentBuildingDoor", "Door", undefined, "craftsmanDoor", "plainDoor", [4, 0, -27], undefined, undefined, {locked:true, key:"alBuildingLocationKey", opensInward:false});

// Second Floor
apartmentCell.addTiledCeiling("ceilingMesh02", {xmin:0, zmin:0, xmax: 14, zmax: 28, subdivisions: {w:14, h:28}}, "greenWallpaper", [1, 5.9, -27]);
apartmentCell.addTiledCeiling("ceilingMesh02b", {xmin:0, zmin:0, xmax: 2, zmax: 20, subdivisions: {w:2, h:20}}, "greenWallpaper", [-1, 5.9, -19]);
apartmentCell.addTiledCeiling("ceilingMesh02c", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, "greenWallpaper", [-1, 5.9, -27]);

// Second Floor Hallway
apartmentCell.addCollisionWall([-1, 3, -13], [3, 6, -13]); // Front hallway wall
apartmentCell.addCollisionWall([5, 3, -13], [5, 6, -21]); // Side hallway wall
apartmentCell.addCollisionWall([5, 3, -23], [5, 6, -27]); // Side hallway wall

apartmentCell.addCollisionRamp([0, 3, -22.5], [2, 6, -17.5]);

apartmentCell.addCollidableMesh(undefined, "craftsmanStairs", "greenWallpaperPlainWood", [0, 3, -22]);
apartmentCell.addCollidableMesh(undefined, "craftsmanStairs", "greenWallpaperPlainWood", [0, 4.5, -20]);

apartmentCell.addTiledGround("commonsFloor02a", {xmin:0, zmin:0, xmax: 4, zmax: 14, subdivisions: {w:4, h:14}}, "pinkCarpetMaterial", [1, 3, -27]);
apartmentCell.addTiledGround("commonsFloor02b", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, "pinkCarpetMaterial", [-1, 3, -27]);
apartmentCell.addTiledGround("commonsFloor02c", {xmin:0, zmin:0, xmax: 2, zmax: 6, subdivisions: {w:2, h:6}}, "pinkCarpetMaterial", [-1, 3, -19]);

apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 3, -14]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [2, 3, -14]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [4, 3, -14]);
apartmentCell.addDoor("chartyApartmentDoor", "Charlie and Marty's Apartment", undefined, "craftsmanDoor", "plainDoor", [4, 3, -13], [0, 0, 0], undefined, {opensInward:false});
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [4, 3, -14], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [4, 3, -16], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [4, 3, -18], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [4, 3, -20], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [4, 3, -22], [0, 90, 0]);
apartmentCell.addDoor("kyleApartmentDoor", "Kyle's Apartment", undefined, "craftsmanDoor", "plainDoor", [5, 3, -22], [0, 90, 0], undefined, {opensInward:false});
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [4, 3, -24], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [4, 3, -26], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood", [4, 3, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood", [4, 3, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [2, 3, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood", [0, 3, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood", [0, 3, -26], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 3, -26], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 3, -24], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "greenWallpaperPlainWood", [0, 3, -22], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "greenWallpaperPlainWood", [0, 3, -20], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 3, -18], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 3, -16], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 3, -14], [0, 270, 0]);

// Charty Apartment
// Charty Livingroom
apartmentCell.addTiledGround("chartyLivingroomFloor", {xmin:0, zmin:0, xmax: 16, zmax: 6, subdivisions: {w:16, h:6}}, "pinkCarpetMaterial", [-1, 3, -13]);
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
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [4, 3, -12], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [2, 3, -12], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 3, -12], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 3, -12], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 3, -10], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 3, -8], [0, 270, 0]);

// Charty Hallway
apartmentCell.addTiledGround("chartyHallwayFloor", {xmin:0, zmin:0, xmax: 4, zmax: 2, subdivisions: {w:4, h:2}}, "pinkCarpetMaterial", [5, 3, -7]);
apartmentCell.addCollisionPlaneByMesh("chartyHallwayFloor");

apartmentCell.addCollisionWall([7, 3, -5], [9, 6, -5]); // Front wall between hallway and bathroom

apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [6, 3, -6]);
apartmentCell.addDoor("chartyBathroomDoor", "Bathroom", undefined, "craftsmanDoor", "plainDoor", [6, 3, -5]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [8, 3, -6]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [8, 3, -6], [0, 90, 0]);
apartmentCell.addDoor("martyBedroomDoor", "Marty's Room", undefined, "craftsmanDoor", "plainDoor", [9, 3, -6], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood", [8, 3, -6], [0, 270, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [6, 3, -6], [0, 180, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [6, 3, -6], [0, 270, 0]);
apartmentCell.addDoor("charlieBedroomDoor", "Charlie's Room", undefined, "craftsmanDoor", "plainDoor",[5, 3, -6], [0, 90, 0], {opensInward:true});

// Charlie bedroom
apartmentCell.addTiledGround("charlieBedroomFloor", {xmin:0, zmin:0, xmax: 6, zmax: 8, subdivisions: {w:6, h:8}}, "blackCarpetMaterial", [-1, 3, -7]);
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

apartmentCell.addTiledGround("commonsFloor02a", {xmin:0, zmin:0, xmax: 4, zmax: 14, subdivisions: {w:4, h:14}}, "pinkCarpetMaterial", [1, 6, -27]);
apartmentCell.addCollisionPlaneByMesh("commonsFloor02a");
apartmentCell.addTiledGround("commonsFloor02b", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, "pinkCarpetMaterial", [-1, 6, -27]);
apartmentCell.addCollisionPlaneByMesh("commonsFloor02b");
apartmentCell.addTiledGround("commonsFloor02c", {xmin:0, zmin:0, xmax: 2, zmax: 6, subdivisions: {w:2, h:6}}, "pinkCarpetMaterial", [-1, 6, -19]);
apartmentCell.addCollisionPlaneByMesh("commonsFloor02c");

apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [0, 6, -14]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [2, 6, -14]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [4, 6, -14]);
apartmentCell.addDoor("twinsApartmentDoor", "Anneke and Wolter's Apartment", undefined, "craftsmanDoor", "plainDoor", [4, 6, -13], [0, 0, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [4, 6, -14], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [4, 6, -16], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [4, 6, -18], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [4, 6, -20], [0, 90, 0]);
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", [4, 6, -22], [0, 90, 0]);
apartmentCell.addDoor("remmyApartmentDoor", "Remmy's Apartment", undefined, "craftsmanDoor", "plainDoor", [5, 6, -22], [0, 90, 0]);
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

apartmentCell.addMaterial("stoneMaterial01", "stoneMaterial01");
apartmentCell.addTiledGround("commonsFloor02a", {xmin:0, zmin:0, xmax: 16, zmax: 4, subdivisions: {w:16, h:4}}, "stoneMaterial", [-1, -0.0625, -31]);
apartmentCell.addCollisionPlaneByMesh("outsideFloorStone");

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
apartmentCell.addCharacter("rinehart", CharacterEntity.get("rinehart"), [3, 0, -20], [0, 180, 0]);
apartmentCell.addCharacter("rosie", CharacterEntity.get("rosie"), [2, 0, -4.5]);
apartmentCell.addCharacter("charlie", CharacterEntity.get("charlie"), [2, 0, -5], [0, 180, 0], [0.9, 0.9, 0.9]);

let packstreetApt3BasementCell = new Cell("packstreetApt3BasementCell");
packstreetApt3BasementCell.addDoor("packstreetApt3BasementToApartmentDoor", "Basement", new TeleportMarker("packstreetApt3", "apartmentCell", [0, 0, -18]), "craftsmanDoor", "plainDoor", [0, 0, -19], [0, 180, 0], undefined, {opensInward:true});
packstreetApt3BasementCell.addCollidableMesh("basementDoorway", "craftsmanDoorway", "greenWallpaperPlainWood", [0, 0, -20]);
 packstreetApt3BasementCell.addCollidableMesh("basementStairwellLeftSidewall", "craftsmanStairWallSideNoTrim", "greenWallpaperPlainWood", [0, 0, -20], undefined, [-1, 1, 1]);
 packstreetApt3BasementCell.addCollidableMesh("basementStairwellLeftSidewallCorner", "craftsmanStairWallCornerNoTrim", "greenWallpaperPlainWood", [0, 0, -22], undefined, [-1, 1, 1]);
 packstreetApt3BasementCell.addCollidableMesh("basementStairwellRightSidewall", "craftsmanStairWallSideNoTrim", "greenWallpaperPlainWood", [0, 0, -20]);
 packstreetApt3BasementCell.addCollidableMesh("basementStairwellRightSidewallCorner", "craftsmanStairWallCornerNoTrim", "greenWallpaperPlainWood", [0, 0, -22]);
 packstreetApt3BasementCell.addMesh("basementStairsCrownTrimLeftBottom", "craftsmanStairCrownTrimLeftBottom", "greenWallpaperPlainWood", [0, 0, -22]);
 packstreetApt3BasementCell.addMesh("basementStairsCrownTrimLeftTop", "craftsmanStairCrownTrimLeftTop", "greenWallpaperPlainWood", [0, 0, -20]);
 packstreetApt3BasementCell.addMesh("basementStairsBaseTrimLeftBottom", "craftsmanStairBaseTrimLeftBottom", "greenWallpaperPlainWood", [0, -3, -22]);
 packstreetApt3BasementCell.addMesh("basementStairsBaseTrimLeftTop", "craftsmanStairBaseTrimLeftTop", "greenWallpaperPlainWood", [0, -1.5, -20]);
 packstreetApt3BasementCell.addMesh("basementStairsCrownTrimRightBottom", "craftsmanStairCrownTrimLeftBottom", "greenWallpaperPlainWood", [0, 0, -22], [0,0,0], [-1, 1, 1]);
 packstreetApt3BasementCell.addMesh("basementStairsCrownTrimRightTop", "craftsmanStairCrownTrimLeftTop", "greenWallpaperPlainWood", [0, 0, -20], [0,0,0], [-1, 1, 1]);
 packstreetApt3BasementCell.addMesh("basementStairsBaseTrimRightBottom", "craftsmanStairBaseTrimLeftBottom", "greenWallpaperPlainWood", [0, -3, -22], [0,0,0], [-1, 1, 1]);
 packstreetApt3BasementCell.addMesh("basementStairsBaseTrimRightTop", "craftsmanStairBaseTrimLeftTop", "greenWallpaperPlainWood", [0, -1.5, -20], [0,0,0], [-1, 1, 1]);
 packstreetApt3BasementCell.addCollidableMesh("basementStairsTop", "craftsmanStairs", "greenWallpaperPlainWood", [0, -3, -22]);
 packstreetApt3BasementCell.addCollidableMesh("basementStairsBottom", "craftsmanStairs", "greenWallpaperPlainWood", [0, -1.5, -20]);
 packstreetApt3BasementCell.addCollidableMesh("basementStairwellWallLeft02", "craftsmanWallNoTrim", "greenWallpaperPlainWood", [0, -3, -22], [0, 270, 0]);
 packstreetApt3BasementCell.addCollidableMesh("basementStairwellWallLeft01", "craftsmanWallNoTrim", "greenWallpaperPlainWood", [0, -3, -20], [0, 270, 0]);
 packstreetApt3BasementCell.addCollidableMesh("basementStairwellWallRight02", "craftsmanWallNoTrim", "greenWallpaperPlainWood", [0, -3, -22], [0, 90, 0]);
 packstreetApt3BasementCell.addCollidableMesh("basementStairwellWallRight01", "craftsmanWallNoTrim", "greenWallpaperPlainWood", [0, -3, -20], [0, 90, 0]);
 packstreetApt3BasementCell.addCollidableMesh("basementStairwellWallLeft03", "craftsmanWall", "greenWallpaperPlainWood", [0, -3, -24], [0, 270, 0]);
 packstreetApt3BasementCell.addCollidableMesh("basementStairwellWall04", "craftsmanWall", "greenWallpaperPlainWood", [0, -3, -24], [0, 180, 0]);
 packstreetApt3BasementCell.addCollidableMesh("basementDoorwayBottom", "craftsmanDoorway", "greenWallpaperPlainWood", [0, -3, -24], [0, 90, 0]);
 packstreetApt3BasementCell.addTiledGround("basementStairwellFloor", {xmin:0, zmin:0, xmax: 2, zmax: 2, subdivisions: {w:2, h:2}}, "woodenFloorDark26", [-1, -3, -25]);
 packstreetApt3BasementCell.addTiledCeiling("basementStairwellCeiling", {xmin:0, zmin:0, xmax: 2, zmax: 2, subdivisions: {w:2, h:2}}, "greenWallpaper", [-1, -0.1, -25]);
 packstreetApt3BasementCell.addDoor("basementDoorBottom", "Door", undefined, "craftsmanDoor", "plainDoor", [1, -3, -24], [0, 90, 0], undefined, {"opensInward":false});

let networkTestCell = new Cell("networkTestCell");
networkTestCell.addCollisionPlane([-5, -25], [11, -9], 0);
networkTestCell.addMesh("stoneFloor", "floor16x16", "stoneMaterial01", [-5, 0, -25]);
networkTestCell.addCollidableMesh("greenWall", "craftsmanWall", "greenWallpaperPlainWood", [1, 0, -22], [0, 180, 0]);
networkTestCell.addCollidableMesh("yellowWall", "craftsmanWall", "yellowWallpaperPlainWood", [3, 0, -22], [0, 180, 0]);
networkTestCell.addCollidableMesh("pinkWall", "craftsmanWall", "pinkWallpaperPlainWood", [5, 0, -22], [0, 180, 0]);
networkTestCell.addCollidableMesh("greenDoorway", "craftsmanDoorway", "greenWallpaperPlainWood", [1, 0, -20], [0, 180, 0]);
networkTestCell.addCollidableMesh("secondGreenWall", "craftsmanWall", "greenWallpaperPlainWood", [-1, 0, -20], [0, 180, 0]);
networkTestCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [-3, 0, -20], [0, 180, 0]); // Third green wall
networkTestCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", [-5, 0, -20], [0, 180, 0]); // Forth green wall
networkTestCell.addCollidableMesh("yellowDoorway", "craftsmanDoorway", "yellowWallpaperPlainWood", [3, 0, -20], [0, 180, 0]);
networkTestCell.addCollidableMesh("pinkDoorway", "craftsmanDoorway", "pinkWallpaperPlainWood", [5, 0, -20], [0, 180, 0]);
networkTestCell.addCollidableMesh("secondPinkWall", "craftsmanWall", "pinkWallpaperPlainWood", [7, 0, -20], [0, 180, 0]);
networkTestCell.addDoor("inwardClosedDoor", "Inward Closed Door", undefined, "craftsmanDoor", "plainDoor", [1, 0, -21], [0, 180, 0], undefined, {"opensInward":true});
networkTestCell.addDoor("outwardClosedDoor", "Outward Closed Door", undefined, "craftsmanDoor", "plainDoor", [3, 0, -21], [0, 180, 0], undefined, {"opensInward":false});
networkTestCell.addDoor("inwardOpenedDoor", "Inward Opened Door", undefined, "craftsmanDoor", "plainDoor", [5, 0, -21], [0, 180, 0], undefined, {"open":true, "opensInward":true});
networkTestCell.addCollidableMesh(undefined, "stick01", "stick01", [0, 0, -17], undefined, [10, 10, 10]);
networkTestCell.addCollidableMesh(undefined, "stopSign", "stopSign", [3, 0, -14]);
networkTestCell.addLighting("commonsLamp", "lamp01", [6, 0, -17]);
networkTestCell.addCharacter("rinehart", CharacterEntity.get("rinehart"), [3, 0, -20], [0, 180, 0]);
networkTestCell.addItem("cheeseWedgeInstance01", "cheeseWedge", [3, 0, -17]);
networkTestCell.addItem("cheeseWheelSansWedgeInstance01", "cheeseWheelSansWedge", [3, 0, -17]);

let debugMovementCell = new Cell("debugMovementCell");
debugMovementCell.addCollisionPlane([-5, -25], [11, -9], 0);
debugMovementCell.addMesh("stoneFloor", "floor16x16", "stoneMaterial01", [-5, 0, -25]);
debugMovementCell.addCollidableMesh("debugMovementStairs", "craftsmanStairs", "missingMaterial", [2, 0, -20], [0, 180, 0]);
debugMovementCell.addItem("cheeseWedgeInstance01", "cheeseWedge", [3, 0, -17]);
