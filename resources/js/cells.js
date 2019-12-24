Game.generateApartment = function() {
    console.log("Initializing apartment...");

    let apartmentCell = new Cell("apartmentCell");
    /*var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", Game.scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("resources/images/textures/skyboxes/m/skybox", Game.scene, ["_px.svg", "_py.svg", "_pz.svg", "_nx.svg", "_ny.svg", "_nz.svg"]);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;*/
    apartmentCell.addCollisionPlane({x:-512,z:-512}, {x:512,z:512}, -64);
    apartmentCell.addCollisionWall(new BABYLON.Vector3(-512, -512, 512), new BABYLON.Vector3(512, 512, 512));
    apartmentCell.addCollisionWall(new BABYLON.Vector3(512, -512, 512), new BABYLON.Vector3(512, 512, -512));
    apartmentCell.addCollisionWall(new BABYLON.Vector3(-512, -512, -512), new BABYLON.Vector3(512, 512, -512));
    apartmentCell.addCollisionWall(new BABYLON.Vector3(-512, -512, -512), new BABYLON.Vector3(-512, 512, 512));

    var packStreetApartmentBuildingTexture = new BABYLON.StandardMaterial("packStreetApartmentBuildingTexture", Game.scene);
        packStreetApartmentBuildingTexture.diffuseTexture = new BABYLON.Texture("resources/images/textures/static/packStreetApartmentBuildingGroundFloor.png", Game.scene);
        packStreetApartmentBuildingTexture.specularColor = new BABYLON.Color3(0, 0, 0);
        packStreetApartmentBuildingTexture.backFaceCulling = false;
    var packStreetApartmentBuildingMap = new BABYLON.Mesh.CreatePlane("packStreetApartmentBuildingMap", 2, Game.scene);
        packStreetApartmentBuildingMap.position.x = 5.6;
        packStreetApartmentBuildingMap.position.y = 1.5;
        packStreetApartmentBuildingMap.position.z = -17.06;
        packStreetApartmentBuildingMap.scaling.x = 0.6;
        packStreetApartmentBuildingMap.material = packStreetApartmentBuildingTexture;

    Game.loadTexture("greenWallpaperPlainWood", {"hasAlpha":true});
    Game.loadTexture("yellowWallpaperPlainWood", {"hasAlpha":true});
    Game.loadTexture("pinkWallpaperPlainWood", {"hasAlpha":true});
    Game.loadTexture("greenWallpaper");
    Game.loadMaterial("whitePanelGrayStone", "whitePanelGrayStone", "stripped-NORMAL");
    Game.loadMaterial("pinkCarpetMaterial", "carpet02-pink", "carpet02-NORMAL", {specularColor:new BABYLON.Color3(0,0,0)});
    Game.loadMaterial("blackCarpetMaterial", "carpet02-black", "carpet02-NORMAL", {specularColor:new BABYLON.Color3(0,0,0)});
    Game.loadMaterial("darkWoodMaterial", "woodenFloorDark01-DIFFUSE", "woodenFloorDark01-NORMAL", {specularColor:new BABYLON.Color3(0.1,0.1,0.1)});
    Game.loadMaterial("linoleumMaterial", "checkerLinoleumFloor01", "checkerLinoleumFloor01-NORMAL", {specularColor:new BABYLON.Color3(0,0,0)});

    // Ground Floor
    var ozzyBedroomClosetFloor = BABYLON.MeshBuilder.CreateTiledGround(undefined, {xmin:0, zmin:0, xmax: 2, zmax: 2, subdivisions: {w:2, h:2}}, Game.scene);
        ozzyBedroomClosetFloor.material = Game.getLoadedMaterial("darkWoodMaterial");
        ozzyBedroomClosetFloor.position.set(-1, 0, -1);
    //apartmentCell.addCollisionPlane(ozzyBedroomClosetFloor);
    var ozzyHallwayClosetFloor = BABYLON.MeshBuilder.CreateTiledGround(undefined, {xmin:0, zmin:0, xmax: 2, zmax: 2, subdivisions: {w:2, h:2}}, Game.scene);
        ozzyHallwayClosetFloor.material = Game.getLoadedMaterial("darkWoodMaterial");
        ozzyHallwayClosetFloor.position.set(1, 0, -1);
    //apartmentCell.addCollisionPlane(ozzyHallwayClosetFloor);
    var ozzyBathroomFloor = BABYLON.MeshBuilder.CreateTiledGround(undefined, {xmin:0, zmin:0, xmax: 4, zmax: 4, subdivisions: {w:4, h:4}}, Game.scene);
        ozzyBathroomFloor.material = Game.getLoadedMaterial("linoleumMaterial");
        ozzyBathroomFloor.position.set(5, 0, -3);
    //apartmentCell.addCollisionPlane(ozzyBathroomFloor);
    var ozzyBedroomFloor = BABYLON.MeshBuilder.CreateTiledGround(undefined, {xmin:0, zmin:0, xmax: 4, zmax: 6, subdivisions: {w:4, h:6}}, Game.scene);
        ozzyBedroomFloor.material = Game.getLoadedMaterial("darkWoodMaterial");
        ozzyBedroomFloor.position.set(-1, 0, -7);
    //apartmentCell.addCollisionPlane(ozzyBedroomFloor);
    var ozzyHallwayFloor = BABYLON.MeshBuilder.CreateTiledGround(undefined, {xmin:0, zmin:0, xmax: 2, zmax: 8, subdivisions: {w:2, h:8}}, Game.scene);
        ozzyHallwayFloor.material = Game.getLoadedMaterial("darkWoodMaterial");
        ozzyHallwayFloor.position.set(3, 0, -7);
    //apartmentCell.addCollisionPlane(ozzyHallwayFloor);
    var ozzyLivingroomFloor = BABYLON.MeshBuilder.CreateTiledGround(undefined, {xmin:0, zmin:0, xmax: 8, zmax: 6, subdivisions: {w:8, h:6}}, Game.scene);
        ozzyLivingroomFloor.material = Game.getLoadedMaterial("darkWoodMaterial");
        ozzyLivingroomFloor.position.set(-1, 0, -13);
    //apartmentCell.addCollisionPlane(ozzyLivingroomFloor);

    var commonsFloor01a = BABYLON.MeshBuilder.CreateTiledGround("commonsFloor01a", {xmin:0, zmin:0, xmax: 4, zmax: 14, subdivisions: {w:4, h:14}}, Game.scene);
        commonsFloor01a.material = Game.getLoadedMaterial("pinkCarpetMaterial");
        commonsFloor01a.position.set(1, 0, -27);
    //apartmentCell.addCollisionPlane(commonsFloor01a);
    var commonsFloor01b = BABYLON.MeshBuilder.CreateTiledGround("commonsFloor01b", {xmin:0, zmin:0, xmax: 10, zmax: 10, subdivisions: {w:10, h:10}}, Game.scene);
        commonsFloor01b.material = Game.getLoadedMaterial("pinkCarpetMaterial");
        commonsFloor01b.position.set(5, 0, -27);
    //apartmentCell.addCollisionPlane(commonsFloor01b);
    var commonsFloor01c = BABYLON.MeshBuilder.CreateTiledGround("commonsFloor01c", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, Game.scene);
        commonsFloor01c.material = Game.getLoadedMaterial("pinkCarpetMaterial");
        commonsFloor01c.position.set(-1, 0, -27);
    //apartmentCell.addCollisionPlane(commonsFloor01c);
    var commonsFloor01d = BABYLON.MeshBuilder.CreateTiledGround("commonsFloor01d", {xmin:0, zmin:0, xmax: 2, zmax: 6, subdivisions: {w:2, h:6}}, Game.scene);
        commonsFloor01d.material = Game.getLoadedMaterial("pinkCarpetMaterial");
        commonsFloor01d.position.set(-1, 0, -19);
    //apartmentCell.addCollisionPlane(commonsFloor01d);
    apartmentCell.addCollisionPlane({x:-1, z:-27}, {x:16, z:1});

    var ceilingMaterial = new BABYLON.StandardMaterial("ceilingMaterial", Game.scene);
        ceilingMaterial.diffuseTexture = Game.getLoadedTexture("greenWallpaper");
        ceilingMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        ceilingMaterial.backFaceCulling = false;
    var ceilingMesh01 = BABYLON.MeshBuilder.CreateTiledGround("ceilingMesh01", {xmin:0, zmin:0, xmax: 14, zmax: 28, subdivisions: {w:14, h:28}}, Game.scene);
        ceilingMesh01.material = ceilingMaterial;
        ceilingMesh01.position.set(1, 2.9, -27);
        ceilingMesh01.scaling.y *= -1;
    var ceilingMesh01b = BABYLON.MeshBuilder.CreateTiledGround("ceilingMesh01b", {xmin:0, zmin:0, xmax: 2, zmax: 20, subdivisions: {w:2, h:20}}, Game.scene);
        ceilingMesh01b.material = ceilingMaterial;
        ceilingMesh01b.position.set(-1, 2.9, -19);
        ceilingMesh01b.scaling.y *= -1;
    var ceilingMesh01c = BABYLON.MeshBuilder.CreateTiledGround("ceilingMesh01c", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, Game.scene);
        ceilingMesh01c.material = ceilingMaterial;
        ceilingMesh01c.position.set(-1, 2.9, -27);
        ceilingMesh01c.scaling.y *= -1;

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
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(2, 0, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood",            new BABYLON.Vector3(2, 0, 0), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(2, 0, 0), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(2, 0, 0), new BABYLON.Vector3(0, 270, 0));

    // Ozzy Bedroom Closet
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(0, 0, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood",            new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 270, 0));

    // Ozzy Bedroom
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood",            new BABYLON.Vector3(0, 0, -2));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(2, 0, -2));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood",            new BABYLON.Vector3(2, 0, -2), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(2, 0, -4), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(2, 0, -6), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(2, 0, -6), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(0, 0, -6), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(0, 0, -6), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "yellowWallpaperPlainWood",        new BABYLON.Vector3(0, 0, -4), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "yellowWallpaperPlainWood",       new BABYLON.Vector3(0, 0, -4), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(0, 0, -2), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addFurniture("ozzyBed", "mattress01",                                           new BABYLON.Vector3(-0.1, 0, -5.395), undefined, new BABYLON.Vector3(1.35,1.35,1.35));

    // Ozzy Bathroom
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "whiteWallpaperPlainWood",                new BABYLON.Vector3(6, 0, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "whiteWallpaperPlainWood",                new BABYLON.Vector3(8, 0, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "whiteWallpaperPlainWood",                new BABYLON.Vector3(8, 0, 0), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "whiteWallpaperPlainWood",                new BABYLON.Vector3(8, 0, -2), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "whiteWallpaperPlainWood",                new BABYLON.Vector3(8, 0, -2), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "whiteWallpaperPlainWood",                new BABYLON.Vector3(6, 0, -2), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "whiteWallpaperPlainWood",                new BABYLON.Vector3(6, 0, -2), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "whiteWallpaperPlainWood",             new BABYLON.Vector3(6, 0, 0), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addFurniture("ozzyToilet", "animatedToilet01",                                  new BABYLON.Vector3(8.5, 0, -1), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addFurniture("ozzySink", "animatedSink01",                                      new BABYLON.Vector3(8.95, 0, -0.25), new BABYLON.Vector3(0, 90, 0));

    // Ozzy Hallway
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "yellowWallpaperPlainWood",        new BABYLON.Vector3(4, 0, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "yellowWallpaperPlainWood",       new BABYLON.Vector3(4, 0, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood",            new BABYLON.Vector3(4, 0, 0), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addDoor("ozzybathroomdoor", "Bathroom", undefined, "craftsmanDoor", "plainDoor",        new BABYLON.Vector3(5, 0, 0), new BABYLON.Vector3(0, 90, 0), undefined, {opensInward:false});
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(4, 0, -2), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(4, 0, -4), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(4, 0, -6), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(4, 0, -6), new BABYLON.Vector3(0, -90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(4, 0, -4), new BABYLON.Vector3(0, -90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood",            new BABYLON.Vector3(4, 0, -2), new BABYLON.Vector3(0, -90, 0));
    apartmentCell.addDoor("ozzybedroomdoor", "Bedroom", undefined, "craftsmanDoor", "plainDoor",          new BABYLON.Vector3(3, 0, -2), new BABYLON.Vector3(0, -90, 0), undefined, {opensInward:false});
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood",            new BABYLON.Vector3(4, 0, 0), new BABYLON.Vector3(0, -90, 0));
    apartmentCell.addDoor("ozzyhallwayclosetdoor", "Closet", undefined, "craftsmanDoor", "plainDoor",     new BABYLON.Vector3(3, 0, 0), new BABYLON.Vector3(0, -90, 0), undefined, {opensInward:true});
    apartmentCell.addCollidableMesh("bookShelfThinInstance01", "bookshelfThin", "bookshelfBlackPlywood",  new BABYLON.Vector3(4.7, 0, -6), new BABYLON.Vector3(0, 90, 0));

    // Ozzy Livingroom
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(0, 0, -8));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(2, 0, -8));
    apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "yellowWallpaperPlainWood",             new BABYLON.Vector3(4, 0, -8));
    apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "yellowWallpaperPlainWood",             new BABYLON.Vector3(4, 0, -8), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(6, 0, -8), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(6, 0, -8));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(6, 0, -8), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(6, 0, -10), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(6, 0, -12), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(6, 0, -12), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "yellowWallpaperPlainWood",            new BABYLON.Vector3(4, 0, -12), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(2, 0, -12), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(0, 0, -12), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(0, 0, -12), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "yellowWallpaperPlainWood",        new BABYLON.Vector3(0, 0, -10), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "yellowWallpaperPlainWood",       new BABYLON.Vector3(0, 0, -10), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "yellowWallpaperPlainWood",               new BABYLON.Vector3(0, 0, -8), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addFurniture("refrigeratorOzzy", "animatedRefrigerator01",                              new BABYLON.Vector3(6.35, 0, -7.75), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh("trashBagFullInstance01", "trashBagFull", undefined,                  new BABYLON.Vector3(6.4, 0, -9.8));
    apartmentCell.addCollidableMesh("trashCanInstance01", "trashCan", undefined,                          new BABYLON.Vector3(5.8, 0, -10.2));
    apartmentCell.addCollidableMesh("trashBagFullInstance02", "trashBagFull", undefined,                  new BABYLON.Vector3(6.5, 0, -10.6), new BABYLON.Vector3(0, 90, 0));
    
    
    // Landlord Blob
    /*apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(10, 0, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(12, 0, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(14, 0, 0), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(8, 0, -2), new BABYLON.Vector3(0, -180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(10, 0, -2), new BABYLON.Vector3(0, -90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(14, 0, -2), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(10, 0, -4), new BABYLON.Vector3(0, -90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(14, 0, -4), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(8, 0, -6), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood",           new BABYLON.Vector3(10, 0, -6), new BABYLON.Vector3(0, -90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(14, 0, -6), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(8, 0, -8));
    apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood",            new BABYLON.Vector3(10, 0, -8));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(14, 0, -8), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(8, 0, -10), new BABYLON.Vector3(0, -90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(14, 0, -10), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(8, 0, -12), new BABYLON.Vector3(0, -90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood",            new BABYLON.Vector3(10, 0, -12), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(14, 0, -12), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(6, 0, -14));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(8, 0, -14));
    apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood",            new BABYLON.Vector3(10, 0, -14));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(14, 0, -14), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood",           new BABYLON.Vector3(6, 0, -16), new BABYLON.Vector3(0, -90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(8, 0, -16), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(10, 0, -16), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(12, 0, -16), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",              new BABYLON.Vector3(14, 0, -16), new BABYLON.Vector3(0, 180, 0));*/

    // Lobby
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 0, -14));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(2, 0, -14));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood",             new BABYLON.Vector3(4, 0, -14));
    apartmentCell.addDoor("ozzyapartmentdoor", "Ozzy's Apartment", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(4, 0, -13), undefined, undefined, {opensInward:false});
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(4, 0, -14), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood",             new BABYLON.Vector3(4, 0, -16), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addDoor("landlordapartmentdoor", "Landlord's Apartment", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(5, 0, -16), new BABYLON.Vector3(0, 90, 0), undefined, {locked:true, key:"alBuildingLocationKey", opensInward:false});
    apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood",              new BABYLON.Vector3(4, 0, -18), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(6, 0, -18));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(8, 0, -18));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(10, 0, -18));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(12, 0, -18));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(14, 0, -18));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(14, 0, -18), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(14, 0, -20), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(14, 0, -22), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood",         new BABYLON.Vector3(14, 0, -24), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood",        new BABYLON.Vector3(14, 0, -24), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(14, 0, -26), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(14, 0, -26), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood",         new BABYLON.Vector3(12, 0, -26), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood",        new BABYLON.Vector3(12, 0, -26), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(10, 0, -26), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood",         new BABYLON.Vector3(8, 0, -26), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood",        new BABYLON.Vector3(8, 0, -26), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(6, 0, -26), new BABYLON.Vector3(0, 180, 0));
    // Lobby entrance divider
        apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",            new BABYLON.Vector3(6, 0, -26), new BABYLON.Vector3(0, 270, 0));
        apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood",          new BABYLON.Vector3(4, 0, -24), new BABYLON.Vector3(0, 180, 0));
        apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood",          new BABYLON.Vector3(6, 0, -24), new BABYLON.Vector3(0, 270, 0));
        apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",            new BABYLON.Vector3(4, 0, -26), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood",             new BABYLON.Vector3(4, 0, -26), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(2, 0, -26), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood",         new BABYLON.Vector3(0, 0, -26), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood",        new BABYLON.Vector3(0, 0, -26), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 0, -26), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 0, -24), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "greenWallpaperPlainWood",          new BABYLON.Vector3(0, 0, -22), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "greenWallpaperPlainWood",          new BABYLON.Vector3(0, 0, -20), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 0, -18), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 0, -16), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 0, -14), new BABYLON.Vector3(0, 270, 0));
    // Lobby stairwell
        apartmentCell.addCollisionRamp(new BABYLON.Vector3(0, 0, -22.5), new BABYLON.Vector3(2, 3, -17.5));
        apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood",              new BABYLON.Vector3(2, 0, -18), new BABYLON.Vector3(0, 270, 0));
        apartmentCell.addCollidableMesh(undefined, "craftsmanStairWallSideRight", "greenWallpaperPlainWood",  new BABYLON.Vector3(2, 0, -20));
        apartmentCell.addCollidableMesh(undefined, "craftsmanStairWallCornerRight", "greenWallpaperPlainWood",new BABYLON.Vector3(2, 0, -22));
        apartmentCell.addCollidableMesh(undefined, "craftsmanStairs", "greenWallpaperPlainWood",                        new BABYLON.Vector3(0, 0, -22));
        apartmentCell.addCollidableMesh(undefined, "craftsmanStairs", "greenWallpaperPlainWood",                        new BABYLON.Vector3(0, 1.5, -20));
        apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood",             new BABYLON.Vector3(0, 0, -18), new BABYLON.Vector3(0, 180, 0));
        apartmentCell.addDoor("packstreetApt3Basement", "Basement", undefined, "craftsmanDoor", "plainDoor",  new BABYLON.Vector3(0, 0, -19), new BABYLON.Vector3(0, 180, 0), undefined, {opensInward:true});
        apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood",             new BABYLON.Vector3(0, 0, -20));
        apartmentCell.addCollidableMesh(undefined, "craftsmanStairWallSideLeft", "greenWallpaperPlainWood",   new BABYLON.Vector3(0, 0, -20));
        apartmentCell.addCollidableMesh(undefined, "craftsmanStairWallCornerLeft", "greenWallpaperPlainWood", new BABYLON.Vector3(0, 0, -22));

    apartmentCell.addFurniture("commonsCouch", "couch01",                                         new BABYLON.Vector3(8.25, 0, -22), new BABYLON.Vector3(0, -90, 0));
    apartmentCell.addCollidableMesh("commonsTableInstance01", "diningTable", undefined,           new BABYLON.Vector3(10, 0, -22), new BABYLON.Vector3(0, -90, 0));
    apartmentCell.addItem("knife", "knife01",                                                     new BABYLON.Vector3(9.7, 0.9, -22.5), new BABYLON.Vector3(180, 0, 0));
    apartmentCell.addItem("cross", "cross01",                                                     new BABYLON.Vector3(10, 0.85, -22));
    apartmentCell.addItem("plateInstance01", "plate01",                                           new BABYLON.Vector3(9.7, 0.75, -21.5));
    apartmentCell.addItem("cheeseWedgeInstance01", "cheeseWedge",                                 new BABYLON.Vector3(9.7, 0.775, -21.5));
    apartmentCell.addItem("plateInstance02", "plate01",                                           new BABYLON.Vector3(10, 0.75, -22.5));
    apartmentCell.addItem("alBuildingLocationKeyInstance", "alBuildingLocationKey",               new BABYLON.Vector3(10, 0.75, -22.75));
    apartmentCell.addItem("packstreet23StrangeNewDayInstance", "packstreet23StrangeNewDay",       new BABYLON.Vector3(10, 0.75, -21.25), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addItem("packstreet24PaintJobInstance", "packstreet24PaintJob",                 new BABYLON.Vector3(10, 0.75, -21), new BABYLON.Vector3(0, 180, 0));

    apartmentCell.addLighting("commonsLamp", "Lamp", "lamp01", undefined, undefined,              new BABYLON.Vector3(-0.5, 0, -26.5), undefined, undefined, new BABYLON.Vector3(0, 1.2, 0));

    apartmentCell.addDoor("apartmentbuildingdoor", "Door", undefined, "craftsmanDoor", "plainDoor",       new BABYLON.Vector3(4, 0, -27), undefined, undefined, {locked:true, key:"alBuildingLocationKey", opensInward:false});

    // Second Floor
    var ceilingMesh02a = BABYLON.MeshBuilder.CreateTiledGround("ceilingMesh02", {xmin:0, zmin:0, xmax: 14, zmax: 28, subdivisions: {w:14, h:28}}, Game.scene);
        ceilingMesh02a.material = ceilingMaterial;
        ceilingMesh02a.position.set(1, 5.9, -27);
    var ceilingMesh02b = BABYLON.MeshBuilder.CreateTiledGround("ceilingMesh02b", {xmin:0, zmin:0, xmax: 2, zmax: 20, subdivisions: {w:2, h:20}}, Game.scene);
        ceilingMesh02b.material = ceilingMaterial;
        ceilingMesh02b.position.set(-1, 5.9, -19);
    var ceilingMesh02c = BABYLON.MeshBuilder.CreateTiledGround("ceilingMesh02c", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, Game.scene);
        ceilingMesh02c.material = ceilingMaterial;
        ceilingMesh02c.position.set(-1, 5.9, -27);

    // Second Floor Hallway
    apartmentCell.addCollisionWall(new BABYLON.Vector3(-1, 3, -13), new BABYLON.Vector3(3, 6, -13)); // Front hallway wall
    apartmentCell.addCollisionWall(new BABYLON.Vector3(5, 3, -13), new BABYLON.Vector3(5, 6, -21)); // Side hallway wall
    apartmentCell.addCollisionWall(new BABYLON.Vector3(5, 3, -23), new BABYLON.Vector3(5, 6, -27)); // Side hallway wall
    
    apartmentCell.addCollisionRamp(new BABYLON.Vector3(0, 3, -22.5), new BABYLON.Vector3(2, 6, -17.5));
    
    apartmentCell.addCollidableMesh(undefined, "craftsmanStairs", "greenWallpaperPlainWood",                        new BABYLON.Vector3(0, 3, -22));
    apartmentCell.addCollidableMesh(undefined, "craftsmanStairs", "greenWallpaperPlainWood",                        new BABYLON.Vector3(0, 4.5, -20));
    
    var commonsFloor02a = BABYLON.MeshBuilder.CreateTiledGround("commonsFloor02a", {xmin:0, zmin:0, xmax: 4, zmax: 14, subdivisions: {w:4, h:14}}, Game.scene);
        commonsFloor02a.material = Game.getLoadedMaterial("pinkCarpetMaterial");
        commonsFloor02a.position.set(1, 3, -27);
    apartmentCell.addCollisionPlane(commonsFloor02a);
    var commonsFloor02b = BABYLON.MeshBuilder.CreateTiledGround("commonsFloor02b", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, Game.scene);
        commonsFloor02b.material = Game.getLoadedMaterial("pinkCarpetMaterial");
        commonsFloor02b.position.set(-1, 3, -27);
    apartmentCell.addCollisionPlane(commonsFloor02b);
    var commonsFloor02c = BABYLON.MeshBuilder.CreateTiledGround("commonsFloor02c", {xmin:0, zmin:0, xmax: 2, zmax: 6, subdivisions: {w:2, h:6}}, Game.scene);
        commonsFloor02c.material = Game.getLoadedMaterial("pinkCarpetMaterial");
        commonsFloor02c.position.set(-1, 3, -19);
    apartmentCell.addCollisionPlane(commonsFloor02c);

    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 3, -14));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(2, 3, -14));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood",             new BABYLON.Vector3(4, 3, -14));
    apartmentCell.addDoor("chartyApartmentDoor", "Charlie and Marty's Apartment", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(4, 3, -13), new BABYLON.Vector3(0, 0, 0), undefined, {opensInward:false});
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(4, 3, -14), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(4, 3, -16), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(4, 3, -18), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(4, 3, -20), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood",             new BABYLON.Vector3(4, 3, -22), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addDoor("kyleApartmentDoor", "Kyle's Apartment", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(5, 3, -22), new BABYLON.Vector3(0, 90, 0), undefined, {opensInward:false});
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(4, 3, -24), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(4, 3, -26), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood",         new BABYLON.Vector3(4, 3, -26), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood",        new BABYLON.Vector3(4, 3, -26), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(2, 3, -26), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood",         new BABYLON.Vector3(0, 3, -26), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood",        new BABYLON.Vector3(0, 3, -26), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 3, -26), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 3, -24), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "greenWallpaperPlainWood",          new BABYLON.Vector3(0, 3, -22), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "greenWallpaperPlainWood",          new BABYLON.Vector3(0, 3, -20), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 3, -18), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 3, -16), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 3, -14), new BABYLON.Vector3(0, 270, 0));

    // Charty Apartment
    // Charty Livingroom
    var chartyLivingroomFloor = BABYLON.MeshBuilder.CreateTiledGround("chartyLivingroomFloor", {xmin:0, zmin:0, xmax: 16, zmax: 6, subdivisions: {w:16, h:6}}, Game.scene);
        chartyLivingroomFloor.material = Game.getLoadedMaterial("pinkCarpetMaterial");
        chartyLivingroomFloor.position.set(-1, 3, -13);
    apartmentCell.addCollisionPlane(chartyLivingroomFloor);

    apartmentCell.addCollisionWall(new BABYLON.Vector3(-1, 3, -7), new BABYLON.Vector3(7, 6, -7)); // Front wall between livingroom and Charlie's bedroom
    apartmentCell.addCollisionWall(new BABYLON.Vector3(9, 3, -7), new BABYLON.Vector3(15, 6, -7)); // Front wall between livingroom and Marty's bedroom

    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 3, -8));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(2, 3, -8));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(4, 3, -8));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(6, 3, -8));
    apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood",              new BABYLON.Vector3(8, 3, -8));
    apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood",              new BABYLON.Vector3(8, 3, -8), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(10, 3, -8));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(12, 3, -8));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(14, 3, -8));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(14, 3, -8), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(14, 3, -10), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(14, 3, -12), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(14, 3, -12), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(12, 3, -12), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(10, 3, -12), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(8, 3, -12), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(6, 3, -12), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood",             new BABYLON.Vector3(4, 3, -12), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(2, 3, -12), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 3, -12), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 3, -12), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 3, -10), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 3, -8), new BABYLON.Vector3(0, 270, 0));

    // Charty Hallway
    var chartyHallwayFloor = BABYLON.MeshBuilder.CreateTiledGround("chartyHallwayFloor", {xmin:0, zmin:0, xmax: 4, zmax: 2, subdivisions: {w:4, h:2}}, Game.scene);
        chartyHallwayFloor.material = Game.getLoadedMaterial("pinkCarpetMaterial");
        chartyHallwayFloor.position.set(5, 3, -7);
    apartmentCell.addCollisionPlane(chartyHallwayFloor);

    apartmentCell.addCollisionWall(new BABYLON.Vector3(7, 3, -5), new BABYLON.Vector3(9, 6, -5)); // Front wall between hallway and bathroom

    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood",             new BABYLON.Vector3(6, 3, -6));
    apartmentCell.addDoor("chartyBathroomDoor", "Bathroom", undefined, "craftsmanDoor", "plainDoor",      new BABYLON.Vector3(6, 3, -5));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(8, 3, -6));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood",             new BABYLON.Vector3(8, 3, -6), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addDoor("martyBedroomDoor", "Marty's Room", undefined, "craftsmanDoor", "plainDoor",    new BABYLON.Vector3(9, 3, -6), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanCorner", "greenWallpaperPlainWood",              new BABYLON.Vector3(8, 3, -6), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(6, 3, -6), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood",             new BABYLON.Vector3(6, 3, -6), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addDoor("charlieBedroomDoor", "Charlie's Room", undefined, "craftsmanDoor", "plainDoor",new BABYLON.Vector3(5, 3, -6), new BABYLON.Vector3(0, 90, 0), {opensInward:true});

    // Charlie bedroom
    var charlieBedroomFloor = BABYLON.MeshBuilder.CreateTiledGround("charlieBedroomFloor", {xmin:0, zmin:0, xmax: 6, zmax: 8, subdivisions: {w:6, h:8}}, Game.scene);
        charlieBedroomFloor.material = Game.getLoadedMaterial("blackCarpetMaterial");
        charlieBedroomFloor.position.set(-1, 3, -7);
    apartmentCell.addCollisionPlane(charlieBedroomFloor);

    apartmentCell.addCollisionWall(new BABYLON.Vector3(1, 3, -1), new BABYLON.Vector3(5, 6, -1)); // Front wall between Charlie's closet and bedroom
    apartmentCell.addCollisionWall(new BABYLON.Vector3(5, 3, 1), new BABYLON.Vector3(5, 6, -5)); // Side wall between Charlie's bedroom and bathroom

    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "blackWallpaperPlainWood",             new BABYLON.Vector3(0, 3, -2));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood",                new BABYLON.Vector3(2, 3, -2));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood",                new BABYLON.Vector3(4, 3, -2));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood",                new BABYLON.Vector3(4, 3, -2), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood",                new BABYLON.Vector3(4, 3, -4), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "blackWallpaperPlainWood",             new BABYLON.Vector3(4, 3, -6), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood",                new BABYLON.Vector3(4, 3, -6), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood",                new BABYLON.Vector3(2, 3, -6), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood",                new BABYLON.Vector3(0, 3, -6), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood",                new BABYLON.Vector3(0, 3, -6), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood",                new BABYLON.Vector3(0, 3, -4), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood",                new BABYLON.Vector3(0, 3, -2), new BABYLON.Vector3(0, 270, 0));

    // Charlie Closet
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood",                new BABYLON.Vector3(0, 3, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood",                new BABYLON.Vector3(2, 3, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood",                new BABYLON.Vector3(4, 3, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood",                new BABYLON.Vector3(4, 3, 0), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood",                new BABYLON.Vector3(4, 3, 0), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood",                new BABYLON.Vector3(2, 3, 0), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "blackWallpaperPlainWood",             new BABYLON.Vector3(0, 3, 0), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "blackWallpaperPlainWood",                new BABYLON.Vector3(0, 3, 0), new BABYLON.Vector3(0, 270, 0));

    // Charty Bathroom
    var chartyBathroomFloor = BABYLON.MeshBuilder.CreateTiledGround(undefined, {xmin:0, zmin:0, xmax: 4, zmax: 6, subdivisions: {w:4, h:6}}, Game.scene);
        chartyBathroomFloor.material = Game.getLoadedMaterial("linoleumMaterial");
        chartyBathroomFloor.position.set(5, 3, -5);
    apartmentCell.addCollisionPlane(chartyBathroomFloor);

    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(6, 3, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(8, 3, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(8, 3, 0), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(8, 3, -2), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(8, 3, -4), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(8, 3, -4), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood",             new BABYLON.Vector3(6, 3, -4), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(6, 3, -4), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(6, 3, -2), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(6, 3, 0), new BABYLON.Vector3(0, 270, 0));

    // Marty bedroom
    var martyBedroomFloor = BABYLON.MeshBuilder.CreateTiledGround("martyBedroomFloor", {xmin:0, zmin:0, xmax: 6, zmax: 8, subdivisions: {w:6, h:8}}, Game.scene);
        martyBedroomFloor.material = Game.getLoadedMaterial("darkWoodMaterial");
        martyBedroomFloor.position.set(9, 3, -7);
    apartmentCell.addCollisionPlane(martyBedroomFloor);

    apartmentCell.addCollisionWall(new BABYLON.Vector3(9, 3, -1), new BABYLON.Vector3(13, 6, -1)); // Front wall between Marty's closet and bedroom
    apartmentCell.addCollisionWall(new BABYLON.Vector3(9, 3, 1), new BABYLON.Vector3(9, 6, -5)); // Side wall between Narty's bedroom and bathroom

    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(10, 3, -2));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(12, 3, -2));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood",             new BABYLON.Vector3(14, 3, -2));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(14, 3, -2), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(14, 3, -4), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(14, 3, -6), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(14, 3, -6), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(12, 3, -6), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(10, 3, -6), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood",             new BABYLON.Vector3(10, 3, -6), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(10, 3, -4), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(10, 3, -2), new BABYLON.Vector3(0, 270, 0));

    // Marty Closet
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(10, 3, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(12, 3, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(14, 3, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(14, 3, 0), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood",             new BABYLON.Vector3(14, 3, 0), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(12, 3, 0), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(10, 3, 0), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(10, 3, 0), new BABYLON.Vector3(0, 270, 0));
    
    // Kyle's Apartment
    apartmentCell.addCollisionPlane({x:5, z:-27}, {x:15, z:-13}, 3);

    // Third Floor Hallway
    apartmentCell.addCollisionWall(new BABYLON.Vector3(-1, 6, -13), new BABYLON.Vector3(3, 9, -13)); // Front hallway wall
    apartmentCell.addCollisionWall(new BABYLON.Vector3(5, 6, -13), new BABYLON.Vector3(5, 9, -21)); // Side hallway wall
    apartmentCell.addCollisionWall(new BABYLON.Vector3(5, 6, -23), new BABYLON.Vector3(5, 9, -27)); // Side hallway wall
    
    apartmentCell.addCollisionRamp(new BABYLON.Vector3(0, 6, -22.5), new BABYLON.Vector3(2, 9, -17.5));
    
    apartmentCell.addCollidableMesh(undefined, "craftsmanStairs", "greenWallpaperPlainWood",                        new BABYLON.Vector3(0, 6, -22));
    apartmentCell.addCollidableMesh(undefined, "craftsmanStairs", "greenWallpaperPlainWood",                        new BABYLON.Vector3(0, 7.5, -20));
    
    var commonsFloor02a = BABYLON.MeshBuilder.CreateTiledGround("commonsFloor02a", {xmin:0, zmin:0, xmax: 4, zmax: 14, subdivisions: {w:4, h:14}}, Game.scene);
        commonsFloor02a.material = Game.getLoadedMaterial("pinkCarpetMaterial");
        commonsFloor02a.position.set(1, 6, -27);
    apartmentCell.addCollisionPlane(commonsFloor02a);
    var commonsFloor02b = BABYLON.MeshBuilder.CreateTiledGround("commonsFloor02b", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, Game.scene);
        commonsFloor02b.material = Game.getLoadedMaterial("pinkCarpetMaterial");
        commonsFloor02b.position.set(-1, 6, -27);
    apartmentCell.addCollisionPlane(commonsFloor02b);
    var commonsFloor02c = BABYLON.MeshBuilder.CreateTiledGround("commonsFloor02c", {xmin:0, zmin:0, xmax: 2, zmax: 6, subdivisions: {w:2, h:6}}, Game.scene);
        commonsFloor02c.material = Game.getLoadedMaterial("pinkCarpetMaterial");
        commonsFloor02c.position.set(-1, 6, -19);
    apartmentCell.addCollisionPlane(commonsFloor02c);

    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 6, -14));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(2, 6, -14));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood",             new BABYLON.Vector3(4, 6, -14));
    apartmentCell.addDoor("twinsApartmentDoor", "Anneke and Wolter's Apartment", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(4, 6, -13), new BABYLON.Vector3(0, 0, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(4, 6, -14), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(4, 6, -16), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(4, 6, -18), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(4, 6, -20), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorway", "greenWallpaperPlainWood",             new BABYLON.Vector3(4, 6, -22), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addDoor("remmyApartmentDoor", "Remmy's Apartment", undefined, "craftsmanDoor", "plainDoor", new BABYLON.Vector3(5, 6, -22), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(4, 6, -24), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(4, 6, -26), new BABYLON.Vector3(0, 90, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood",         new BABYLON.Vector3(4, 6, -26), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood",        new BABYLON.Vector3(4, 6, -26), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(2, 6, -26), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframe", "greenWallpaperPlainWood",         new BABYLON.Vector3(0, 6, -26), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowDouble", "greenWallpaperPlainWood",        new BABYLON.Vector3(0, 6, -26), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 6, -26), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 6, -24), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "greenWallpaperPlainWood",          new BABYLON.Vector3(0, 6, -22), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "greenWallpaperPlainWood",          new BABYLON.Vector3(0, 6, -20), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 6, -18), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 6, -16), new BABYLON.Vector3(0, 270, 0));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWall", "greenWallpaperPlainWood",                new BABYLON.Vector3(0, 6, -14), new BABYLON.Vector3(0, 270, 0));

    // 'outside'
    apartmentCell.addCollisionWall(new BABYLON.Vector3(15, 0, -27), new BABYLON.Vector3(15, 3, -31));
    apartmentCell.addCollisionWall(new BABYLON.Vector3(-1, 0, -27), new BABYLON.Vector3(-1, 3, -31));
    apartmentCell.addCollisionWall(new BABYLON.Vector3(-1, 0, -31), new BABYLON.Vector3(15, 3, -31));
    
    var stoneMaterial = Game.getLoadedMaterial("stoneMaterial01");
    var outsideFloorStone = BABYLON.MeshBuilder.CreateTiledGround("commonsFloor02a", {xmin:0, zmin:0, xmax: 16, zmax: 4, subdivisions: {w:16, h:4}}, Game.scene);
        outsideFloorStone.material = stoneMaterial;
        outsideFloorStone.position.set(-1, -0.0625, -31);
    apartmentCell.addCollisionPlane(outsideFloorStone);
    
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone",       new BABYLON.Vector3(0, 0, -28));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone",              new BABYLON.Vector3(2, 0, -28));
    apartmentCell.addCollidableMesh(undefined, "craftsmanDoorwayNoTrim", "whitePanelGrayStone",           new BABYLON.Vector3(4, 0, -28));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone",              new BABYLON.Vector3(6, 0, -28));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone",       new BABYLON.Vector3(8, 0, -28));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone",              new BABYLON.Vector3(10, 0, -28));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone",       new BABYLON.Vector3(12, 0, -28));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone",              new BABYLON.Vector3(14, 0, -28));

    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone",       new BABYLON.Vector3(0, 3, -28));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone",              new BABYLON.Vector3(2, 3, -28));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone",       new BABYLON.Vector3(4, 3, -28));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone",              new BABYLON.Vector3(6, 3, -28));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone",       new BABYLON.Vector3(8, 3, -28));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone",              new BABYLON.Vector3(10, 3, -28));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone",       new BABYLON.Vector3(12, 3, -28));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone",              new BABYLON.Vector3(14, 3, -28));

    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone",       new BABYLON.Vector3(0, 6, -28));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone",              new BABYLON.Vector3(2, 6, -28));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone",       new BABYLON.Vector3(4, 6, -28));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone",              new BABYLON.Vector3(6, 6, -28));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone",       new BABYLON.Vector3(8, 6, -28));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone",              new BABYLON.Vector3(10, 6, -28));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWindowframeNoTrim", "whitePanelGrayStone",       new BABYLON.Vector3(12, 6, -28));
    apartmentCell.addCollidableMesh(undefined, "craftsmanWallNoTrim", "whitePanelGrayStone",              new BABYLON.Vector3(14, 6, -28));

    apartmentCell.addCollidableMesh(undefined, "stopSign", "stopSign",                                              new BABYLON.Vector3(4, 0, -29), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCollidableMesh(undefined, "sawhorse", undefined,                                               new BABYLON.Vector3(3.3, 0, -29), new BABYLON.Vector3(0, 33, 0));
    apartmentCell.addCollidableMesh(undefined, "twoByFourByThree", undefined,                                       new BABYLON.Vector3(3, 0, -29.2), new BABYLON.Vector3(30, 33, -5));
    apartmentCell.addCollidableMesh(undefined, "twoByFourByThree", undefined,                                       new BABYLON.Vector3(2.9, 0, -29.15), new BABYLON.Vector3(30, 33, -5));

    // Misc
    apartmentCell.addCharacter("rinehart", CharacterEntity.get("rinehart"), new BABYLON.Vector3(3, 0, -20), new BABYLON.Vector3(0, 180, 0));
    apartmentCell.addCharacter("rosie", CharacterEntity.get("rosie"), new BABYLON.Vector3(2, 0, -4.5));
    apartmentCell.addCharacter("charlie", CharacterEntity.get("charlie"), new BABYLON.Vector3(2, 0, -5), new BABYLON.Vector3(0,180,0), new BABYLON.Vector3(0.9,0.9,0.9));
    /*CharacterController.get("charlie").setIdleAnim("90_idleSquint01", 1, true);
    CharacterController.get("charlie").setRunAnim("94_runningKneesBentSquint", 1, true);*/
    CharacterEntity.get("charlie").setHealth("66");
    new Dialogue(
        "charlieTalk",
        "Talk to Charlie",
        function(_them, _you) {
            return "Greetings" + (_you.getLastName() != undefined && _you.getLastName().length > 0 ? (", " + _you.getLastName()) : "") + ".";
        }
    );
    new Dialogue(
        "charlieKiss",
        "Give Charlie a Kiss",
        function(_them, _you) {
            return "You try to give Charlie a kiss on the lips, but she dodges her head aside and glares at you.";
        }
    );
    new Dialogue(
        "charlieHug",
        "Give Charlie a Hug",
        "You try to give Charlie a hug, but she moves aside and glares at you."
    );
    new Dialogue(
        "rosieTalk",
        "Talk to Rosie",
        function(_them, _you) {
            switch(Math.floor((Math.random() * 5) + 1)) {
                case 1 : return "I'm " + _them.getAge() + ", and what is this?";
                case 2 : return "What?";
                case 3 : return "What is this? I don't even...";
                case 4 : return "Where's Melody?";
                case 5 : return "Where's Stan?";
                default : return "Where's the money, Lebowski?";
            }
        }
    );
    new Dialogue(
        "rinehartTalk",
        "Talk to Rinehart",
        function(_them, _you) {
            if (_them.hasItem("mountainChocolateBar")) {
                return "Oh boy, I love this giant Toblerone.";
            }
            else {
                return "Now we're just lonely people, trying to forget each other's names...";
            }
        }
    );
    new Dialogue(
        "rinehartTakeChocolate",
        "Steal Giant Toblerone",
        function(_them, _you) {
            var _item = _them.getItem("mountainChocolateBar");
            if (_item instanceof InstancedItemEntity) {
                _them.removeItem(_item);
                _you.addItem(_item);
                return "I guess I didn't deserve that giant Toblerone.";
            }
        }
    );
    new Dialogue(
        "rinehartSayHi",
        "Say 'Hi'",
        "He says 'Hi' back."
    );
    new Dialogue(
        "rinehartSayBye",
        "Say 'Bye'",
        "He says 'Bye' back."
    );
    Dialogue.get("charlieTalk").setOption("charlieKissOption", "charlieKiss");
    Dialogue.get("charlieTalk").setOption("charlieHugOption", "charlieHug");
    CharacterEntity.get("charlie").setDialogue("charlieTalk");
    CharacterEntity.get("rosie").setDialogue("rosieTalk");
    Dialogue.get("rinehartTalk").setOption(
        "rinehartTakeChocolateOption",
        "rinehartTakeChocolate",
        undefined,
        function(_them, _you) {
            if (_them instanceof CharacterEntity) {
                return _them.hasItem("mountainChocolateBar");
            }
            return false;
        }
    );
    Dialogue.get("rinehartTalk").setOption("rinehartHiOption", "rinehartSayHi");
    Dialogue.get("rinehartTalk").setOption("rinehartByeOption", "rinehartSayBye");
    CharacterEntity.get("rinehart").setDialogue("rinehartTalk");
    CharacterEntity.get("rinehart").addItem("mountainChocolateBar");
    CharacterEntity.get("rinehart").hold("mountainChocolateBar");

    Game.setPlayerCell(apartmentCell);
}

Game.generateWallScene = function() {
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
    Game.importBabylon("resources/data/_KF/KF.babylon");
    Game.setPlayerCell(networkTestCell);
}

Game.debugMovementScene = function() {
    let debugMovementCell = new Cell("debugMovementCell");
    debugMovementCell.addCollisionPlane({x:-5,z:-25}, {x:11,z:-9}, 0);

    debugMovementCell.addMesh("stoneFloor", "floor16x16", "stoneMaterial01", new BABYLON.Vector3(-5, 0, -25));
    debugMovementCell.addCollidableMesh(undefined, "craftsmanStairs", undefined, new BABYLON.Vector3(2, 0, -20), new BABYLON.Vector3(0, 180, 0));
    Game.setPlayerCell(debugMovementCell);
}