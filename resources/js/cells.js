console.log("Loading Scenes");
let apartmentCell = new Cell("apartmentCell");
apartmentCell.addCollisionPlane({x:-512,z:-512}, {x:512,z:512}, -64);
apartmentCell.addCollisionWall(new BABYLON.Vector3(-512, -512, 512), new BABYLON.Vector3(512, 512, 512));
apartmentCell.addCollisionWall(new BABYLON.Vector3(512, -512, 512), new BABYLON.Vector3(512, 512, -512));
apartmentCell.addCollisionWall(new BABYLON.Vector3(-512, -512, -512), new BABYLON.Vector3(512, 512, -512));
apartmentCell.addCollisionWall(new BABYLON.Vector3(-512, -512, -512), new BABYLON.Vector3(-512, 512, 512));

/*var packStreetApartmentBuildingTexture = new BABYLON.StandardMaterial("packStreetApartmentBuildingTexture", Game.scene);
 packStreetApartmentBuildingTexture.diffuseTexture = new BABYLON.Texture("resources/images/textures/static/packStreetApartmentBuildingGroundFloor.png", Game.scene);
 packStreetApartmentBuildingTexture.specularColor = new BABYLON.Color3(0, 0, 0);
 packStreetApartmentBuildingTexture.backFaceCulling = false;
var packStreetApartmentBuildingMap = new BABYLON.Mesh.CreatePlane("packStreetApartmentBuildingMap", 2, Game.scene);
 packStreetApartmentBuildingMap.position.x = 5.6;
 packStreetApartmentBuildingMap.position.y = 1.5;
 packStreetApartmentBuildingMap.position.z = -17.06;
 packStreetApartmentBuildingMap.scaling.x = 0.6;
 packStreetApartmentBuildingMap.material = packStreetApartmentBuildingTexture;*/

apartmentCell.addMaterial("greenWallpaperPlainWood", "greenWallpaperPlainWood", undefined, {"hasAlpha":true});
apartmentCell.addMaterial("yellowWallpaperPlainWood", "yellowWallpaperPlainWood", undefined, {"hasAlpha":true});
apartmentCell.addMaterial("pinkWallpaperPlainWood", "pinkWallpaperPlainWood", undefined, {"hasAlpha":true});
apartmentCell.addMaterial("greenWallpaper", "greenWallpaper");
apartmentCell.addMaterial("whitePanelGrayStone", "whitePanelGrayStone", "stripped-NORMAL");
apartmentCell.addMaterial("pinkCarpetMaterial", "carpet02-pink", "carpet02-NORMAL", {specularColor:new BABYLON.Color3(0,0,0)});
apartmentCell.addMaterial("blackCarpetMaterial", "carpet02-black", "carpet02-NORMAL", {specularColor:new BABYLON.Color3(0,0,0)});
//apartmentCell.addMaterial("woodenFloorDark01", "woodenFloorDark01-DIFFUSE", "woodenFloorDark01-NORMAL", {specularColor:new BABYLON.Color3(0.1,0.1,0.1)});
apartmentCell.addMaterial("linoleumMaterial", "checkerLinoleumFloor01", "checkerLinoleumFloor01-NORMAL", {specularColor:new BABYLON.Color3(0,0,0)});

// Ground Floor
apartmentCell.addTiledGround("ozzyBedroomClosetFloor", {xmin:0, zmin:0, xmax: 2, zmax: 2, subdivisions: {w:2, h:2}}, "woodenFloorDark01", new BABYLON.Vector3(-1, 0, -1));
apartmentCell.addTiledGround("ozzyHallwayClosetFloor", {xmin:0, zmin:0, xmax: 2, zmax: 2, subdivisions: {w:2, h:2}}, "woodenFloorDark01", new BABYLON.Vector3(1, 0, -1));
apartmentCell.addTiledGround("ozzyBathroomFloor", {xmin:0, zmin:0, xmax: 4, zmax: 4, subdivisions: {w:4, h:4}}, "linoleumMaterial", new BABYLON.Vector3(5, 0, -3));
apartmentCell.addTiledGround("ozzyBedroomFloor", {xmin:0, zmin:0, xmax: 4, zmax: 6, subdivisions: {w:4, h:6}}, "woodenFloorDark01", new BABYLON.Vector3(-1, 0, -7));
apartmentCell.addTiledGround("ozzyHallwayFloor", {xmin:0, zmin:0, xmax: 2, zmax: 8, subdivisions: {w:2, h:8}}, "woodenFloorDark01", new BABYLON.Vector3(3, 0, -7));
apartmentCell.addTiledGround("ozzyLivingroomFloor", {xmin:0, zmin:0, xmax: 8, zmax: 6, subdivisions: {w:8, h:6}}, "woodenFloorDark01", new BABYLON.Vector3(-1, 0, -13));

apartmentCell.addTiledGround("commonsFloor01a", {xmin:0, zmin:0, xmax: 4, zmax: 14, subdivisions: {w:4, h:14}}, "woodenFloorDark26", new BABYLON.Vector3(1, 0, -27));
apartmentCell.addTiledGround("commonsFloor01b", {xmin:0, zmin:0, xmax: 10, zmax: 10, subdivisions: {w:10, h:10}}, "woodenFloorDark26", new BABYLON.Vector3(5, 0, -27));
apartmentCell.addTiledGround("commonsFloor01c", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, "woodenFloorDark26", new BABYLON.Vector3(-1, 0, -27));
apartmentCell.addTiledGround("commonsFloor01d", {xmin:0, zmin:0, xmax: 2, zmax: 6, subdivisions: {w:2, h:6}}, "woodenFloorDark26", new BABYLON.Vector3(-1, 0, -19));
apartmentCell.addCollisionPlane({x:-1, z:-27}, {x:16, z:1});

apartmentCell.addMaterial("ceilingMaterial", "greenWallpaper", undefined, {"specularColor":new BABYLON.Color3(0, 0, 0), "backFaceCulling": false});
apartmentCell.addTiledCeiling("ceilingMesh01", {xmin:0, zmin:0, xmax: 14, zmax: 28, subdivisions: {w:14, h:28}}, "ceilingMaterial", new BABYLON.Vector3(1, 2.9, -27));
apartmentCell.addTiledCeiling("ceilingMesh01b", {xmin:0, zmin:0, xmax: 2, zmax: 20, subdivisions: {w:2, h:20}}, "ceilingMaterial", new BABYLON.Vector3(-1, 2.9, -19));
apartmentCell.addTiledCeiling("ceilingMesh01c", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, "ceilingMaterial", new BABYLON.Vector3(-1, 2.9, -27));

// Building collision walls
apartmentCell.addCollisionWall(new BABYLON.Vector3(-1, -4, 1), new BABYLON.Vector3(15, 12.125, 1)); // Back floor wall
apartmentCell.addCollisionWall(new BABYLON.Vector3(-1, -4, 1), new BABYLON.Vector3(-1, 12.125, -27)); // Left floor wall
apartmentCell.addCollisionWall(new BABYLON.Vector3(15, -4, 1), new BABYLON.Vector3(15, 12.125, -27)); // Right floor wall
apartmentCell.addCollisionWall(new BABYLON.Vector3(-1, 0, -27), new BABYLON.Vector3(3, 3, -27)); // Front floor wall, left
apartmentCell.addCollisionWall(new BABYLON.Vector3(5, 0, -27), new BABYLON.Vector3(15, 3, -27)); // Front floor wall, right
apartmentCell.addCollisionWall(new BABYLON.Vector3(-1, 3, -27), new BABYLON.Vector3(15, 9.125, -27)); // Front floor wall above ground floor
apartmentCell.addCollisionWall(new BABYLON.Vector3(-1, -4, -27), new BABYLON.Vector3(15, 0, -27)); // Front floor wall below ground floor

// Ground floor collision walls
apartmentCell.addCollisionWall(new BABYLON.Vector3(1, 0, 1), new BABYLON.Vector3(1, 3, -1)); // Side wall between Ozzy's bedroom closet and hallway closet
apartmentCell.addCollisionWall(new BABYLON.Vector3(1, 0, -1), new BABYLON.Vector3(3, 3, -1)); // Front wall between Ozzy's hallway closet and bedroom
apartmentCell.addCollisionWall(new BABYLON.Vector3(3, 0, -3), new BABYLON.Vector3(3, 3, -7)); // Side wall between Ozzy's bedroom and hallway
apartmentCell.addCollisionWall(new BABYLON.Vector3(-1, 0, -7), new BABYLON.Vector3(3, 3, -7)); // Front wall between Ozzy's bedroom and livingroom

apartmentCell.addCollisionWall(new BABYLON.Vector3(9, 0, 1), new BABYLON.Vector3(9, 3, -5)); // Side wall between Ozzy's bathroom and Landlord's apartment
apartmentCell.addCollisionWall(new BABYLON.Vector3(5, 0, -1), new BABYLON.Vector3(5, 3, -7)); // Side wall between Ozzy's apartment and Landlord's bathroom
apartmentCell.addCollisionWall(new BABYLON.Vector3(7, 0, -7), new BABYLON.Vector3(7, 3, -13)); // Side wall between Ozzy's and Landord's kitchenettes

apartmentCell.addCollisionWall(new BABYLON.Vector3(5, 0, -3), new BABYLON.Vector3(9, 3, -3)); // Front wall between Ozzy's and Landlord's bathrooms
apartmentCell.addCollisionWall(new BABYLON.Vector3(5, 0, -7), new BABYLON.Vector3(9, 3, -7)); // Front wall between Landlord's bathroom and Landlord's and Ozzy's kitchenettes
apartmentCell.addCollisionWall(new BABYLON.Vector3(5, 0, -13), new BABYLON.Vector3(9, 3, -13)); // Front wall between Landlord's kitchenette and Landlord's entrance

apartmentCell.addCollisionWall(new BABYLON.Vector3(-1, 0, -13), new BABYLON.Vector3(3, 3, -13)); // Front wall between Commons and Ozzy's apartment
apartmentCell.addCollisionWall(new BABYLON.Vector3(5, 0, -13), new BABYLON.Vector3(5, 3, -15)); // Side wall between Commons and Landlord's apartment
apartmentCell.addCollisionWall(new BABYLON.Vector3(5, 0, -17), new BABYLON.Vector3(15, 3, -17)); // Front wall between Commons and Landlord's apartment

apartmentCell.addCollisionWall(new BABYLON.Vector3(5, 0, -25), new BABYLON.Vector3(5, 3, -27)); // Side wall between Commons and building entrance

// Ozzy Hallway Closet
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(2, 0, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood", new BABYLON.Vector3(2, 0, 0), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(2, 0, 0), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(2, 0, 0), new BABYLON.Vector3(0, 270, 0));

// Ozzy Bedroom Closet
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(0, 0, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood", new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 270, 0));

// Ozzy Bedroom
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood", new BABYLON.Vector3(0, 0, -2));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(2, 0, -2));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood", new BABYLON.Vector3(2, 0, -2), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(2, 0, -4), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(2, 0, -6), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(2, 0, -6), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(0, 0, -6), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(0, 0, -6), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "yellowWallpaperPlainWood", new BABYLON.Vector3(0, 0, -4), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "yellowWallpaperPlainWood", new BABYLON.Vector3(0, 0, -4), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(0, 0, -2), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addFurniture("ozzyBed", "mattress01", new BABYLON.Vector3(-0.1, 0, -5.395), undefined, new BABYLON.Vector3(1.35,1.35,1.35));

// Ozzy Bathroom
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "whiteWallpaperPlainWood", new BABYLON.Vector3(6, 0, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "whiteWallpaperPlainWood", new BABYLON.Vector3(8, 0, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "whiteWallpaperPlainWood", new BABYLON.Vector3(8, 0, 0), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "whiteWallpaperPlainWood", new BABYLON.Vector3(8, 0, -2), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "whiteWallpaperPlainWood", new BABYLON.Vector3(8, 0, -2), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "whiteWallpaperPlainWood", new BABYLON.Vector3(6, 0, -2), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "whiteWallpaperPlainWood", new BABYLON.Vector3(6, 0, -2), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "whiteWallpaperPlainWood", new BABYLON.Vector3(6, 0, 0), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addFurniture("ozzyToilet", "animatedToilet01", new BABYLON.Vector3(8.5, 0, -1), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addFurniture("ozzySink", "animatedSink01", new BABYLON.Vector3(8.95, 0, -0.25), new BABYLON.Vector3(0, 90, 0));

// Ozzy Hallway
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "yellowWallpaperPlainWood", new BABYLON.Vector3(4, 0, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "yellowWallpaperPlainWood", new BABYLON.Vector3(4, 0, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood", new BABYLON.Vector3(4, 0, 0), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addDoor("ozzybathroomdoor", "Bathroom", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(5, 0, 0), new BABYLON.Vector3(0, 90, 0), undefined, {opensInward:false});
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(4, 0, -2), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(4, 0, -4), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(4, 0, -6), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(4, 0, -6), new BABYLON.Vector3(0, -90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(4, 0, -4), new BABYLON.Vector3(0, -90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood", new BABYLON.Vector3(4, 0, -2), new BABYLON.Vector3(0, -90, 0));
apartmentCell.addDoor("ozzybedroomdoor", "Bedroom", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(3, 0, -2), new BABYLON.Vector3(0, -90, 0), undefined, {opensInward:false});
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood", new BABYLON.Vector3(4, 0, 0), new BABYLON.Vector3(0, -90, 0));
apartmentCell.addDoor("ozzyhallwayclosetdoor", "Closet", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(3, 0, 0), new BABYLON.Vector3(0, -90, 0), undefined, {opensInward:true});
apartmentCell.addCollidableMesh("bookShelfThinInstance01", "bookshelfThin", "bookshelfBlackPlywood", new BABYLON.Vector3(4.7, 0, -6), new BABYLON.Vector3(0, 90, 0));

// Ozzy Livingroom
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(0, 0, -8));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(2, 0, -8));
apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "yellowWallpaperPlainWood", new BABYLON.Vector3(4, 0, -8));
apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "yellowWallpaperPlainWood", new BABYLON.Vector3(4, 0, -8), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(6, 0, -8), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(6, 0, -8));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(6, 0, -8), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(6, 0, -10), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(6, 0, -12), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(6, 0, -12), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood", new BABYLON.Vector3(4, 0, -12), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(2, 0, -12), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(0, 0, -12), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(0, 0, -12), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "yellowWallpaperPlainWood", new BABYLON.Vector3(0, 0, -10), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "yellowWallpaperPlainWood", new BABYLON.Vector3(0, 0, -10), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(0, 0, -8), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addFurniture("refrigeratorOzzy", "animatedRefrigerator01", new BABYLON.Vector3(6.35, 0, -7.75), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh("trashBagFullInstance01", "trashBagFull", undefined, new BABYLON.Vector3(6.4, 0, -9.8));
apartmentCell.addCollidableMesh("trashCanInstance01", "trashCan", undefined, new BABYLON.Vector3(5.8, 0, -10.2));
apartmentCell.addCollidableMesh("trashBagFullInstance02", "trashBagFull", undefined, new BABYLON.Vector3(6.5, 0, -10.6), new BABYLON.Vector3(0, 90, 0));

// Lobby
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 0, -14));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(2, 0, -14));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 0, -14));
apartmentCell.addDoor("ozzyapartmentdoor", "Ozzy's Apartment", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(4, 0, -13), undefined, undefined, {opensInward:false});
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 0, -14), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 0, -16), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addDoor("landlordapartmentdoor", "Landlord's Apartment", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(5, 0, -16), new BABYLON.Vector3(0, 90, 0), undefined, {locked:true, key:"alBuildingLocationKey", opensInward:false});
apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 0, -18), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(6, 0, -18));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(8, 0, -18));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(10, 0, -18));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(12, 0, -18));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(14, 0, -18));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(14, 0, -18), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(14, 0, -20), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(14, 0, -22), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood", new BABYLON.Vector3(14, 0, -24), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood", new BABYLON.Vector3(14, 0, -24), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(14, 0, -26), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(14, 0, -26), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood", new BABYLON.Vector3(12, 0, -26), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood", new BABYLON.Vector3(12, 0, -26), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(10, 0, -26), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood", new BABYLON.Vector3(8, 0, -26), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood", new BABYLON.Vector3(8, 0, -26), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(6, 0, -26), new BABYLON.Vector3(0, 180, 0));
// Lobby entrance divider
 apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(6, 0, -26), new BABYLON.Vector3(0, 270, 0));
 apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 0, -24), new BABYLON.Vector3(0, 180, 0));
 apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood", new BABYLON.Vector3(6, 0, -24), new BABYLON.Vector3(0, 270, 0));
 apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 0, -26), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 0, -26), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(2, 0, -26), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 0, -26), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 0, -26), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 0, -26), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 0, -24), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 0, -22), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 0, -20), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 0, -18), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 0, -16), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 0, -14), new BABYLON.Vector3(0, 270, 0));
// Lobby stairwell
 apartmentCell.addCollisionRamp(new BABYLON.Vector3(0, 0, -22.5), new BABYLON.Vector3(2, 3, -17.5));
 apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood", new BABYLON.Vector3(2, 0, -18), new BABYLON.Vector3(0, 270, 0));
 apartmentCell.addCollidableMesh(undefined, "craftsmanStairWallSideRight", "greenWallpaperPlainWood", new BABYLON.Vector3(2, 0, -20));
 apartmentCell.addCollidableMesh(undefined, "craftsmanStairWallCornerRight", "greenWallpaperPlainWood",new BABYLON.Vector3(2, 0, -22));
 apartmentCell.addCollidableMesh(undefined, "craftsmanStairs", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 0, -22));
 apartmentCell.addCollidableMesh(undefined, "craftsmanStairs", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 1.5, -20));
 apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 0, -18), new BABYLON.Vector3(0, 180, 0));
 apartmentCell.addDoor("packstreetApt3Basement", "Basement", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(0, 0, -19), new BABYLON.Vector3(0, 180, 0), undefined, {opensInward:true});
 apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 0, -20));
 apartmentCell.addCollidableMesh(undefined, "craftsmanStairWallSideLeft", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 0, -20));
 apartmentCell.addCollidableMesh(undefined, "craftsmanStairWallCornerLeft", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 0, -22));

apartmentCell.addFurniture("commonsCouch", "couch01", new BABYLON.Vector3(8.25, 0, -22), new BABYLON.Vector3(0, -90, 0));
apartmentCell.addCollidableMesh("commonsTableInstance01", "diningTable", undefined, new BABYLON.Vector3(10, 0, -22), new BABYLON.Vector3(0, -90, 0));
apartmentCell.addItem("knife", "knife01", new BABYLON.Vector3(9.7, 0.9, -22.5), new BABYLON.Vector3(180, 0, 0));
apartmentCell.addItem("cross", "cross01", new BABYLON.Vector3(10, 0.85, -22));
apartmentCell.addItem("plateInstance01", "plate01", new BABYLON.Vector3(9.7, 0.75, -21.5));
apartmentCell.addItem("cheeseWedgeInstance01", "cheeseWedge", new BABYLON.Vector3(9.7, 0.775, -21.5));
apartmentCell.addItem("plateInstance02", "plate01", new BABYLON.Vector3(10, 0.75, -22.5));
apartmentCell.addItem("alBuildingLocationKeyInstance", "alBuildingLocationKey", new BABYLON.Vector3(10, 0.75, -22.75));
apartmentCell.addItem("packstreet23StrangeNewDayInstance", "packstreet23StrangeNewDay", new BABYLON.Vector3(10, 0.75, -21.25), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addItem("packstreet24PaintJobInstance", "packstreet24PaintJob", new BABYLON.Vector3(10, 0.75, -21), new BABYLON.Vector3(0, 180, 0));

apartmentCell.addLighting("commonsLamp", "Lamp", "lamp01", undefined, undefined, new BABYLON.Vector3(-0.5, 0, -26.5), undefined, undefined, new BABYLON.Vector3(0, 1.2, 0));

apartmentCell.addDoor("apartmentbuildingdoor", "Door", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(4, 0, -27), undefined, undefined, {locked:true, key:"alBuildingLocationKey", opensInward:false});

// Second Floor
apartmentCell.addTiledCeiling("ceilingMesh02", {xmin:0, zmin:0, xmax: 14, zmax: 28, subdivisions: {w:14, h:28}}, "ceilingMaterial", new BABYLON.Vector3(1, 5.9, -27));
apartmentCell.addTiledCeiling("ceilingMesh02b", {xmin:0, zmin:0, xmax: 2, zmax: 20, subdivisions: {w:2, h:20}}, "ceilingMaterial", new BABYLON.Vector3(-1, 5.9, -19));
apartmentCell.addTiledCeiling("ceilingMesh02c", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, "ceilingMaterial", new BABYLON.Vector3(-1, 5.9, -27));

// Second Floor Hallway
apartmentCell.addCollisionWall(new BABYLON.Vector3(-1, 3, -13), new BABYLON.Vector3(3, 6, -13)); // Front hallway wall
apartmentCell.addCollisionWall(new BABYLON.Vector3(5, 3, -13), new BABYLON.Vector3(5, 6, -21)); // Side hallway wall
apartmentCell.addCollisionWall(new BABYLON.Vector3(5, 3, -23), new BABYLON.Vector3(5, 6, -27)); // Side hallway wall

apartmentCell.addCollisionRamp(new BABYLON.Vector3(0, 3, -22.5), new BABYLON.Vector3(2, 6, -17.5));

apartmentCell.addCollidableMesh(undefined, "craftsmanStairs", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 3, -22));
apartmentCell.addCollidableMesh(undefined, "craftsmanStairs", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 4.5, -20));

apartmentCell.addTiledGround("commonsFloor02a", {xmin:0, zmin:0, xmax: 4, zmax: 14, subdivisions: {w:4, h:14}}, "pinkCarpetMaterial", new BABYLON.Vector3(1, 3, -27));
apartmentCell.addTiledGround("commonsFloor02b", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, "pinkCarpetMaterial", new BABYLON.Vector3(-1, 3, -27));
apartmentCell.addTiledGround("commonsFloor02c", {xmin:0, zmin:0, xmax: 2, zmax: 6, subdivisions: {w:2, h:6}}, "pinkCarpetMaterial", new BABYLON.Vector3(-1, 3, -19));

apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 3, -14));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(2, 3, -14));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 3, -14));
apartmentCell.addDoor("chartyApartmentDoor", "Charlie and Marty's Apartment", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(4, 3, -13), new BABYLON.Vector3(0, 0, 0), undefined, {opensInward:false});
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 3, -14), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 3, -16), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 3, -18), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 3, -20), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 3, -22), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addDoor("kyleApartmentDoor", "Kyle's Apartment", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(5, 3, -22), new BABYLON.Vector3(0, 90, 0), undefined, {opensInward:false});
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 3, -24), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 3, -26), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 3, -26), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 3, -26), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(2, 3, -26), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 3, -26), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 3, -26), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 3, -26), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 3, -24), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 3, -22), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 3, -20), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 3, -18), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 3, -16), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 3, -14), new BABYLON.Vector3(0, 270, 0));

// Charty Apartment
// Charty Livingroom
apartmentCell.addTiledGround("chartyLivingroomFloor", {xmin:0, zmin:0, xmax: 16, zmax: 6, subdivisions: {w:16, h:6}}, "pinkCarpetMaterial", new BABYLON.Vector3(-1, 3, -13));
apartmentCell.addCollisionPlane("chartyLivingroomFloor");

apartmentCell.addCollisionWall(new BABYLON.Vector3(-1, 3, -7), new BABYLON.Vector3(7, 6, -7)); // Front wall between livingroom and Charlie's bedroom
apartmentCell.addCollisionWall(new BABYLON.Vector3(9, 3, -7), new BABYLON.Vector3(15, 6, -7)); // Front wall between livingroom and Marty's bedroom

apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 3, -8));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(2, 3, -8));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 3, -8));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(6, 3, -8));
apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood", new BABYLON.Vector3(8, 3, -8));
apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood", new BABYLON.Vector3(8, 3, -8), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(10, 3, -8));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(12, 3, -8));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(14, 3, -8));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(14, 3, -8), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(14, 3, -10), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(14, 3, -12), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(14, 3, -12), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(12, 3, -12), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(10, 3, -12), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(8, 3, -12), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(6, 3, -12), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 3, -12), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(2, 3, -12), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 3, -12), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 3, -12), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 3, -10), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 3, -8), new BABYLON.Vector3(0, 270, 0));

// Charty Hallway
apartmentCell.addTiledGround("chartyHallwayFloor", {xmin:0, zmin:0, xmax: 4, zmax: 2, subdivisions: {w:4, h:2}}, "pinkCarpetMaterial", new BABYLON.Vector3(5, 3, -7));
apartmentCell.addCollisionPlane("chartyHallwayFloor");

apartmentCell.addCollisionWall(new BABYLON.Vector3(7, 3, -5), new BABYLON.Vector3(9, 6, -5)); // Front wall between hallway and bathroom

apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", new BABYLON.Vector3(6, 3, -6));
apartmentCell.addDoor("chartyBathroomDoor", "Bathroom", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(6, 3, -5));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(8, 3, -6));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", new BABYLON.Vector3(8, 3, -6), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addDoor("martyBedroomDoor", "Marty's Room", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(9, 3, -6), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood", new BABYLON.Vector3(8, 3, -6), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(6, 3, -6), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", new BABYLON.Vector3(6, 3, -6), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addDoor("charlieBedroomDoor", "Charlie's Room", undefined, "craftsmanDoor", "plainDoor",new BABYLON.Vector3(5, 3, -6), new BABYLON.Vector3(0, 90, 0), {opensInward:true});

// Charlie bedroom
apartmentCell.addTiledGround("charlieBedroomFloor", {xmin:0, zmin:0, xmax: 6, zmax: 8, subdivisions: {w:6, h:8}}, "blackCarpetMaterial", new BABYLON.Vector3(-1, 3, -7));
apartmentCell.addCollisionPlane("charlieBedroomFloor");

apartmentCell.addCollisionWall(new BABYLON.Vector3(1, 3, -1), new BABYLON.Vector3(5, 6, -1)); // Front wall between Charlie's closet and bedroom
apartmentCell.addCollisionWall(new BABYLON.Vector3(5, 3, 1), new BABYLON.Vector3(5, 6, -5)); // Side wall between Charlie's bedroom and bathroom

apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "blackWallpaperPlainWood", new BABYLON.Vector3(0, 3, -2));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", new BABYLON.Vector3(2, 3, -2));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", new BABYLON.Vector3(4, 3, -2));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", new BABYLON.Vector3(4, 3, -2), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", new BABYLON.Vector3(4, 3, -4), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "blackWallpaperPlainWood", new BABYLON.Vector3(4, 3, -6), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", new BABYLON.Vector3(4, 3, -6), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", new BABYLON.Vector3(2, 3, -6), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", new BABYLON.Vector3(0, 3, -6), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", new BABYLON.Vector3(0, 3, -6), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", new BABYLON.Vector3(0, 3, -4), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", new BABYLON.Vector3(0, 3, -2), new BABYLON.Vector3(0, 270, 0));

// Charlie Closet
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", new BABYLON.Vector3(0, 3, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", new BABYLON.Vector3(2, 3, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", new BABYLON.Vector3(4, 3, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", new BABYLON.Vector3(4, 3, 0), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", new BABYLON.Vector3(4, 3, 0), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", new BABYLON.Vector3(2, 3, 0), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "blackWallpaperPlainWood", new BABYLON.Vector3(0, 3, 0), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood", new BABYLON.Vector3(0, 3, 0), new BABYLON.Vector3(0, 270, 0));

// Charty Bathroom
apartmentCell.addTiledGround("chartyBathroomFloor", {xmin:0, zmin:0, xmax: 4, zmax: 6, subdivisions: {w:4, h:6}}, "linoleumMaterial", new BABYLON.Vector3(5, 3, -5));
apartmentCell.addCollisionPlane("chartyBathroomFloor");

apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(6, 3, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(8, 3, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(8, 3, 0), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(8, 3, -2), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(8, 3, -4), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(8, 3, -4), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", new BABYLON.Vector3(6, 3, -4), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(6, 3, -4), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(6, 3, -2), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(6, 3, 0), new BABYLON.Vector3(0, 270, 0));

// Marty bedroom
apartmentCell.addTiledGround("martyBedroomFloor", {xmin:0, zmin:0, xmax: 6, zmax: 8, subdivisions: {w:6, h:8}}, "woodenFloorDark01", new BABYLON.Vector3(9, 3, -7));
apartmentCell.addCollisionPlane("martyBedroomFloor");

apartmentCell.addCollisionWall(new BABYLON.Vector3(9, 3, -1), new BABYLON.Vector3(13, 6, -1)); // Front wall between Marty's closet and bedroom
apartmentCell.addCollisionWall(new BABYLON.Vector3(9, 3, 1), new BABYLON.Vector3(9, 6, -5)); // Side wall between Narty's bedroom and bathroom

apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(10, 3, -2));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(12, 3, -2));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", new BABYLON.Vector3(14, 3, -2));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(14, 3, -2), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(14, 3, -4), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(14, 3, -6), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(14, 3, -6), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(12, 3, -6), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(10, 3, -6), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", new BABYLON.Vector3(10, 3, -6), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(10, 3, -4), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(10, 3, -2), new BABYLON.Vector3(0, 270, 0));

// Marty Closet
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(10, 3, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(12, 3, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(14, 3, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(14, 3, 0), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", new BABYLON.Vector3(14, 3, 0), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(12, 3, 0), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(10, 3, 0), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(10, 3, 0), new BABYLON.Vector3(0, 270, 0));

// Kyle's Apartment
apartmentCell.addCollisionPlane({x:5, z:-27}, {x:15, z:-13}, 3);

// Third Floor Hallway
apartmentCell.addCollisionWall(new BABYLON.Vector3(-1, 6, -13), new BABYLON.Vector3(3, 9, -13)); // Front hallway wall
apartmentCell.addCollisionWall(new BABYLON.Vector3(5, 6, -13), new BABYLON.Vector3(5, 9, -21)); // Side hallway wall
apartmentCell.addCollisionWall(new BABYLON.Vector3(5, 6, -23), new BABYLON.Vector3(5, 9, -27)); // Side hallway wall

apartmentCell.addCollisionRamp(new BABYLON.Vector3(0, 6, -22.5), new BABYLON.Vector3(2, 9, -17.5));

apartmentCell.addCollidableMesh(undefined, "craftsmanStairs", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 6, -22));
apartmentCell.addCollidableMesh(undefined, "craftsmanStairs", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 7.5, -20));

apartmentCell.addTiledGround("commonsFloor02a", {xmin:0, zmin:0, xmax: 4, zmax: 14, subdivisions: {w:4, h:14}}, "pinkCarpetMaterial", new BABYLON.Vector3(1, 6, -27));
apartmentCell.addCollisionPlane("commonsFloor02a");
apartmentCell.addTiledGround("commonsFloor02b", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, "pinkCarpetMaterial", new BABYLON.Vector3(-1, 6, -27));
apartmentCell.addCollisionPlane("commonsFloor02b");
apartmentCell.addTiledGround("commonsFloor02c", {xmin:0, zmin:0, xmax: 2, zmax: 6, subdivisions: {w:2, h:6}}, "pinkCarpetMaterial", new BABYLON.Vector3(-1, 6, -19));
apartmentCell.addCollisionPlane("commonsFloor02c");

apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 6, -14));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(2, 6, -14));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 6, -14));
apartmentCell.addDoor("twinsApartmentDoor", "Anneke and Wolter's Apartment", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(4, 6, -13), new BABYLON.Vector3(0, 0, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 6, -14), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 6, -16), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 6, -18), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 6, -20), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 6, -22), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addDoor("remmyApartmentDoor", "Remmy's Apartment", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(5, 6, -22), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 6, -24), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 6, -26), new BABYLON.Vector3(0, 90, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 6, -26), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood", new BABYLON.Vector3(4, 6, -26), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(2, 6, -26), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 6, -26), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 6, -26), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 6, -26), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 6, -24), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 6, -22), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 6, -20), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 6, -18), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 6, -16), new BABYLON.Vector3(0, 270, 0));
apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 6, -14), new BABYLON.Vector3(0, 270, 0));

// 'outside'
apartmentCell.addCollisionWall(new BABYLON.Vector3(15, 0, -27), new BABYLON.Vector3(15, 3, -31));
apartmentCell.addCollisionWall(new BABYLON.Vector3(-1, 0, -27), new BABYLON.Vector3(-1, 3, -31));
apartmentCell.addCollisionWall(new BABYLON.Vector3(-1, 0, -31), new BABYLON.Vector3(15, 3, -31));

apartmentCell.addMaterial("stoneMaterial01", "stoneMaterial01");
apartmentCell.addTiledGround("commonsFloor02a", {xmin:0, zmin:0, xmax: 16, zmax: 4, subdivisions: {w:16, h:4}}, "stoneMaterial", new BABYLON.Vector3(-1, -0.0625, -31));
apartmentCell.addCollisionPlane("outsideFloorStone");

apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(0, 0, -28));
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(2, 0, -28));
apartmentCell.addCollidableMesh(undefined, "craftsmanDoorwayNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(4, 0, -28));
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(6, 0, -28));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(8, 0, -28));
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(10, 0, -28));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(12, 0, -28));
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(14, 0, -28));

apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(0, 3, -28));
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(2, 3, -28));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(4, 3, -28));
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(6, 3, -28));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(8, 3, -28));
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(10, 3, -28));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(12, 3, -28));
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(14, 3, -28));

apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(0, 6, -28));
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(2, 6, -28));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(4, 6, -28));
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(6, 6, -28));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(8, 6, -28));
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(10, 6, -28));
apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(12, 6, -28));
apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone", new BABYLON.Vector3(14, 6, -28));

apartmentCell.addCollidableMesh(undefined, "stopSign", "stopSign", new BABYLON.Vector3(4, 0, -29), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCollidableMesh(undefined, "sawhorse", undefined, new BABYLON.Vector3(3.3, 0, -29), new BABYLON.Vector3(0, 33, 0));
apartmentCell.addCollidableMesh(undefined, "twoByFourByThree", undefined, new BABYLON.Vector3(3, 0, -29.2), new BABYLON.Vector3(30, 33, -5));
apartmentCell.addCollidableMesh(undefined, "twoByFourByThree", undefined, new BABYLON.Vector3(2.9, 0, -29.15), new BABYLON.Vector3(30, 33, -5));

// Misc
apartmentCell.addCharacter("rinehart", CharacterEntity.get("rinehart"), new BABYLON.Vector3(3, 0, -20), new BABYLON.Vector3(0, 180, 0));
apartmentCell.addCharacter("rosie", CharacterEntity.get("rosie"), new BABYLON.Vector3(2, 0, -4.5));
apartmentCell.addCharacter("charlie", CharacterEntity.get("charlie"), new BABYLON.Vector3(2, 0, -5), new BABYLON.Vector3(0,180,0), new BABYLON.Vector3(0.9,0.9,0.9));

let networkTestCell = new Cell("networkTestCell");
networkTestCell.addCollisionPlane({x:-5,z:-25}, {x:11,z:-9}, 0);
networkTestCell.addMesh("stoneFloor", "floor16x16", "stoneMaterial01", new BABYLON.Vector3(-5, 0, -25));
networkTestCell.addCollidableMesh("greenWall", "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(1, 0, -22), new BABYLON.Vector3(0, 180, 0));
networkTestCell.addCollidableMesh("yellowWall", "craftsmanWall", "yellowWallpaperPlainWood", new BABYLON.Vector3(3, 0, -22), new BABYLON.Vector3(0, 180, 0));
networkTestCell.addCollidableMesh("pinkWall", "craftsmanWall", "pinkWallpaperPlainWood", new BABYLON.Vector3(5, 0, -22), new BABYLON.Vector3(0, 180, 0));
networkTestCell.addCollidableMesh("greenDoorway", "craftsmanDoorway", "greenWallpaperPlainWood", new BABYLON.Vector3(1, 0, -20), new BABYLON.Vector3(0, 180, 0));
networkTestCell.addCollidableMesh("secondGreenWall", "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(-1, 0, -20), new BABYLON.Vector3(0, 180, 0));
networkTestCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(-3, 0, -20), new BABYLON.Vector3(0, 180, 0)); // Third green wall
networkTestCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood", new BABYLON.Vector3(-5, 0, -20), new BABYLON.Vector3(0, 180, 0)); // Forth green wall
networkTestCell.addCollidableMesh("yellowDoorway", "craftsmanDoorway", "yellowWallpaperPlainWood", new BABYLON.Vector3(3, 0, -20), new BABYLON.Vector3(0, 180, 0));
networkTestCell.addCollidableMesh("pinkDoorway", "craftsmanDoorway", "pinkWallpaperPlainWood", new BABYLON.Vector3(5, 0, -20), new BABYLON.Vector3(0, 180, 0));
networkTestCell.addCollidableMesh("secondPinkWall", "craftsmanWall", "pinkWallpaperPlainWood", new BABYLON.Vector3(7, 0, -20), new BABYLON.Vector3(0, 180, 0));
networkTestCell.addDoor("inwardClosedDoor", "Inward Closed Door", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(1, 0, -21), new BABYLON.Vector3(0, 180, 0), undefined, {opensInward:true});
networkTestCell.addDoor("outwardClosedDoor", "Outward Closed Door", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(3, 0, -21), new BABYLON.Vector3(0, 180, 0), undefined, {opensInward:false});
networkTestCell.addDoor("inwardOpenedDoor", "Inward Opened Door", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(5, 0, -21), new BABYLON.Vector3(0, 180, 0), undefined, {open:true, opensInward:true});
networkTestCell.addCollidableMesh(undefined, "stick01", "stick01", new BABYLON.Vector3(0, 0, -17), undefined, new BABYLON.Vector3(10, 10, 10));
networkTestCell.addCollidableMesh(undefined, "stopSign", "stopSign", new BABYLON.Vector3(3, 0, -14));
networkTestCell.addLighting("commonsLamp", "Lamp", "lamp01", undefined, undefined, new BABYLON.Vector3(6, 0, -17));
networkTestCell.addCharacter("rinehart", CharacterEntity.get("rinehart"), new BABYLON.Vector3(3, 0, -20), new BABYLON.Vector3(0, 180, 0));
networkTestCell.addItem("cheeseWedgeInstance01", "cheeseWedge", new BABYLON.Vector3(3, 0, -17));
networkTestCell.addItem("cheeseWheelSansWedgeInstance01", "cheeseWheelSansWedge", new BABYLON.Vector3(3, 0, -17));

let debugMovementCell = new Cell("debugMovementCell");
debugMovementCell.addCollisionPlane({x:-5,z:-25}, {x:11,z:-9}, 0);
debugMovementCell.addMesh("stoneFloor", "floor16x16", "stoneMaterial01", new BABYLON.Vector3(-5, 0, -25));
debugMovementCell.addCollidableMesh("debugMovementStairs", "craftsmanStairs", "missingMaterial", new BABYLON.Vector3(2, 0, -20), new BABYLON.Vector3(0, 180, 0));
debugMovementCell.addItem("cheeseWedgeInstance01", "cheeseWedge", new BABYLON.Vector3(3, 0, -17));
