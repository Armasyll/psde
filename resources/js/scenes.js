Game.generateApartment = function() {
    console.log("Initializing apartment...");
    
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1024.0}, Game.scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", Game.scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("resources/images/textures/skyboxes/m/skybox", Game.scene, ["_px.svg", "_py.svg", "_pz.svg", "_nx.svg", "_ny.svg", "_nz.svg"]);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;
    Game.createCollisionPlane({x:-512,z:-512}, {x:512,z:512}, -512);
    Game.createCollisionWall(new BABYLON.Vector3(-512, -512, 512), new BABYLON.Vector3(512, 512, 512));
    Game.createCollisionWall(new BABYLON.Vector3(512, -512, 512), new BABYLON.Vector3(512, 512, -512));
    Game.createCollisionWall(new BABYLON.Vector3(-512, -512, -512), new BABYLON.Vector3(512, 512, -512));
    Game.createCollisionWall(new BABYLON.Vector3(-512, -512, -512), new BABYLON.Vector3(-512, 512, 512));

    var _ambientLight = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), Game.scene);
        _ambientLight.intensity = 0.9;

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

    var nooo = new BABYLON.StandardMaterial("", Game.scene);
        nooo.diffuseTexture = new BABYLON.Texture("resources/images/textures/static/noooo.jpg", Game.scene);
        nooo.specularColor = new BABYLON.Color3(0, 0, 0);
        nooo.backFaceCulling = true;
    var noooMesh = new BABYLON.Mesh.CreatePlane("noooMesh", 2, Game.scene);
        noooMesh.position.set(4, 1, -27);
        noooMesh.scaling.x = 0.6;
        noooMesh.material = nooo;

    var pinkCarpetMaterial = new BABYLON.StandardMaterial("pinkCarpetMaterial", Game.scene);
        pinkCarpetMaterial.diffuseTexture = new BABYLON.Texture("resources/images/textures/static/carpetPink01.png", Game.scene);
        pinkCarpetMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    var blackCarpetMaterial = new BABYLON.StandardMaterial("blackCarpetMaterial", Game.scene);
        blackCarpetMaterial.diffuseTexture = new BABYLON.Texture("resources/images/textures/static/carpetBlack01.png", Game.scene);
        blackCarpetMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    var darkWoodMaterial = new BABYLON.StandardMaterial("darkWoodMaterial", Game.scene);
        darkWoodMaterial.diffuseTexture = new BABYLON.Texture("resources/images/textures/static/woodenFloorDark01-DIFFUSE.png", Game.scene);
        darkWoodMaterial.bumpTexture = new BABYLON.Texture("resources/images/textures/static/woodenFloorDark01-NORMAL.png", Game.scene);
        darkWoodMaterial.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    var linoleumMaterial = new BABYLON.StandardMaterial("linoleumMaterial", Game.scene);
        linoleumMaterial.diffuseTexture = new BABYLON.Texture("resources/images/textures/static/checkerLinoleumFloor01.png", Game.scene);
        linoleumMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    // Ground Floor
    var ozzyBedroomClosetFloor = BABYLON.MeshBuilder.CreateTiledGround(undefined, {xmin:0, zmin:0, xmax: 2, zmax: 2, subdivisions: {w:2, h:2}}, Game.scene);
        ozzyBedroomClosetFloor.material = darkWoodMaterial;
        ozzyBedroomClosetFloor.position.set(-1, 0, -1);
    //Game.createCollisionPlane(ozzyBedroomClosetFloor);
    var ozzyHallwayClosetFloor = BABYLON.MeshBuilder.CreateTiledGround(undefined, {xmin:0, zmin:0, xmax: 2, zmax: 2, subdivisions: {w:2, h:2}}, Game.scene);
        ozzyHallwayClosetFloor.material = darkWoodMaterial;
        ozzyHallwayClosetFloor.position.set(1, 0, -1);
    //Game.createCollisionPlane(ozzyHallwayClosetFloor);
    var ozzyBathroomFloor = BABYLON.MeshBuilder.CreateTiledGround(undefined, {xmin:0, zmin:0, xmax: 4, zmax: 4, subdivisions: {w:4, h:4}}, Game.scene);
        ozzyBathroomFloor.material = linoleumMaterial;
        ozzyBathroomFloor.position.set(5, 0, -3);
    //Game.createCollisionPlane(ozzyBathroomFloor);
    var ozzyBedroomFloor = BABYLON.MeshBuilder.CreateTiledGround(undefined, {xmin:0, zmin:0, xmax: 4, zmax: 6, subdivisions: {w:4, h:6}}, Game.scene);
        ozzyBedroomFloor.material = darkWoodMaterial;
        ozzyBedroomFloor.position.set(-1, 0, -7);
    //Game.createCollisionPlane(ozzyBedroomFloor);
    var ozzyHallwayFloor = BABYLON.MeshBuilder.CreateTiledGround(undefined, {xmin:0, zmin:0, xmax: 2, zmax: 8, subdivisions: {w:2, h:8}}, Game.scene);
        ozzyHallwayFloor.material = darkWoodMaterial;
        ozzyHallwayFloor.position.set(3, 0, -7);
    //Game.createCollisionPlane(ozzyHallwayFloor);
    var ozzyLivingroomFloor = BABYLON.MeshBuilder.CreateTiledGround(undefined, {xmin:0, zmin:0, xmax: 8, zmax: 6, subdivisions: {w:8, h:6}}, Game.scene);
        ozzyLivingroomFloor.material = darkWoodMaterial;
        ozzyLivingroomFloor.position.set(-1, 0, -13);
    //Game.createCollisionPlane(ozzyLivingroomFloor);

    var commonsFloor01a = BABYLON.MeshBuilder.CreateTiledGround("commonsFloor01a", {xmin:0, zmin:0, xmax: 4, zmax: 14, subdivisions: {w:4, h:14}}, Game.scene);
        commonsFloor01a.material = pinkCarpetMaterial;
        commonsFloor01a.position.set(1, 0, -27);
    //Game.createCollisionPlane(commonsFloor01a);
    var commonsFloor01b = BABYLON.MeshBuilder.CreateTiledGround("commonsFloor01b", {xmin:0, zmin:0, xmax: 10, zmax: 10, subdivisions: {w:10, h:10}}, Game.scene);
        commonsFloor01b.material = pinkCarpetMaterial;
        commonsFloor01b.position.set(5, 0, -27);
    //Game.createCollisionPlane(commonsFloor01b);
    var commonsFloor01c = BABYLON.MeshBuilder.CreateTiledGround("commonsFloor01c", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, Game.scene);
        commonsFloor01c.material = pinkCarpetMaterial;
        commonsFloor01c.position.set(-1, 0, -27);
    //Game.createCollisionPlane(commonsFloor01c);
    var commonsFloor01d = BABYLON.MeshBuilder.CreateTiledGround("commonsFloor01d", {xmin:0, zmin:0, xmax: 2, zmax: 6, subdivisions: {w:2, h:6}}, Game.scene);
        commonsFloor01d.material = pinkCarpetMaterial;
        commonsFloor01d.position.set(-1, 0, -19);
    //Game.createCollisionPlane(commonsFloor01d);
    Game.createCollisionPlane({x:-1, z:-27}, {x:16, z:1});

    var ceilingMaterial = new BABYLON.StandardMaterial("ceilingMaterial", Game.scene);
        ceilingMaterial.diffuseTexture = new BABYLON.Texture("resources/data/wall.png", Game.scene);
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
    Game.createCollisionWall(new BABYLON.Vector3(-1, -4, 1), new BABYLON.Vector3(15, 12.125, 1)); // Back floor wall
    Game.createCollisionWall(new BABYLON.Vector3(-1, -4, 1), new BABYLON.Vector3(-1, 12.125, -27)); // Left floor wall
    Game.createCollisionWall(new BABYLON.Vector3(15, -4, 1), new BABYLON.Vector3(15, 12.125, -27)); // Right floor wall
    Game.createCollisionWall(new BABYLON.Vector3(-1, 0, -27), new BABYLON.Vector3(3, 3, -27)); // Front floor wall, left
    Game.createCollisionWall(new BABYLON.Vector3(5, 0, -27), new BABYLON.Vector3(15, 3, -27)); // Front floor wall, right
    Game.createCollisionWall(new BABYLON.Vector3(-1, 3, -27), new BABYLON.Vector3(15, 9.125, -27)); // Front floor wall above ground floor
    Game.createCollisionWall(new BABYLON.Vector3(-1, -4, -27), new BABYLON.Vector3(15, 0, -27)); // Front floor wall below ground floor

    // Ground floor collision walls
    Game.createCollisionWall(new BABYLON.Vector3(1, 0, 1), new BABYLON.Vector3(1, 3, -1)); // Side wall between Ozzy's bedroom closet and hallway closet
    Game.createCollisionWall(new BABYLON.Vector3(1, 0, -1), new BABYLON.Vector3(3, 3, -1)); // Front wall between Ozzy's hallway closet and bedroom
    Game.createCollisionWall(new BABYLON.Vector3(3, 0, -3), new BABYLON.Vector3(3, 3, -7)); // Side wall between Ozzy's bedroom and hallway
    Game.createCollisionWall(new BABYLON.Vector3(-1, 0, -7), new BABYLON.Vector3(3, 3, -7)); // Front wall between Ozzy's bedroom and livingroom

    Game.createCollisionWall(new BABYLON.Vector3(9, 0, 1), new BABYLON.Vector3(9, 3, -5)); // Side wall between Ozzy's bathroom and Landlord's apartment
    Game.createCollisionWall(new BABYLON.Vector3(5, 0, -1), new BABYLON.Vector3(5, 3, -7)); // Side wall between Ozzy's apartment and Landlord's bathroom
    Game.createCollisionWall(new BABYLON.Vector3(7, 0, -7), new BABYLON.Vector3(7, 3, -13)); // Side wall between Ozzy's and Landord's kitchenettes

    Game.createCollisionWall(new BABYLON.Vector3(5, 0, -3), new BABYLON.Vector3(9, 3, -3)); // Front wall between Ozzy's and Landlord's bathrooms
    Game.createCollisionWall(new BABYLON.Vector3(5, 0, -7), new BABYLON.Vector3(9, 3, -7)); // Front wall between Landlord's bathroom and Landlord's and Ozzy's kitchenettes
    Game.createCollisionWall(new BABYLON.Vector3(5, 0, -13), new BABYLON.Vector3(9, 3, -13)); // Front wall between Landlord's kitchenette and Landlord's entrance

    Game.createCollisionWall(new BABYLON.Vector3(1, 0, -23), new BABYLON.Vector3(1, 3, -19)); // Side wall between Commons and lower stairwell; blocks railing

    Game.createCollisionWall(new BABYLON.Vector3(-1, 0, -13), new BABYLON.Vector3(3, 3, -13)); // Front wall between Commons and Ozzy's apartment
    Game.createCollisionWall(new BABYLON.Vector3(5, 0, -13), new BABYLON.Vector3(5, 3, -15)); // Side wall between Commons and Landlord's apartment
    Game.createCollisionWall(new BABYLON.Vector3(5, 0, -17), new BABYLON.Vector3(15, 3, -17)); // Front wall between Commons and Landlord's apartment

    Game.createCollisionWall(new BABYLON.Vector3(5, 0, -25), new BABYLON.Vector3(5, 3, -27)); // Side wall between Commons and building entrance

    // Ozzy Hallway Closet
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(2, 0, 0));
    Game.createMesh("doorway", undefined, undefined,           new BABYLON.Vector3(2, 0, 0), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(2, 0, 0), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(2, 0, 0), new BABYLON.Vector3(0, 270, 0));

    // Ozzy Bedroom Closet
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(0, 0, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("doorway", undefined, undefined,           new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 270, 0));

    // Ozzy Bedroom
    Game.createMesh("doorway", undefined, undefined,           new BABYLON.Vector3(0, 0, -2));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(2, 0, -2));
    Game.createMesh("doorway", undefined, undefined,           new BABYLON.Vector3(2, 0, -2), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(2, 0, -4), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(2, 0, -6), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(2, 0, -6), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(0, 0, -6), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(0, 0, -6), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("windowframe", undefined, undefined,       new BABYLON.Vector3(0, 0, -4), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(0, 0, -2), new BABYLON.Vector3(0, 270, 0));

    // Ozzy Bathroom
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(6, 0, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(8, 0, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(8, 0, 0), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(8, 0, -2), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(8, 0, -2), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(6, 0, -2), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(6, 0, -2), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("doorway", undefined, undefined,           new BABYLON.Vector3(6, 0, 0), new BABYLON.Vector3(0, 270, 0));

    // Ozzy Hallway
    Game.createMesh("windowframe", undefined, undefined,       new BABYLON.Vector3(4, 0, 0));
    Game.createMesh("doorway", undefined, undefined,           new BABYLON.Vector3(4, 0, 0), new BABYLON.Vector3(0, 90, 0));
    Game.createDoor("ozzybathroomdoor", "Bathroom", undefined, "door", undefined, undefined, new BABYLON.Vector3(5, 0, 0), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(4, 0, -2), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(4, 0, -4), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(4, 0, -6), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(4, 0, -6), new BABYLON.Vector3(0, -90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(4, 0, -4), new BABYLON.Vector3(0, -90, 0));
    Game.createMesh("doorway", undefined, undefined,           new BABYLON.Vector3(4, 0, -2), new BABYLON.Vector3(0, -90, 0));
    Game.createDoor("ozzybedroomdoor", "Bedroom", undefined, "door", undefined, undefined, new BABYLON.Vector3(3, 0, -2), new BABYLON.Vector3(0, -90, 0));
    Game.createMesh("doorway", undefined, undefined,           new BABYLON.Vector3(4, 0, 0), new BABYLON.Vector3(0, -90, 0));
    Game.createDoor("ozzyhallwayclosetdoor", "Closet", undefined, "door", undefined, undefined, new BABYLON.Vector3(3, 0, 0), new BABYLON.Vector3(0, -90, 0)).setOpensInward();
    Game.addFurnitureMesh("bookShelfThinInstance01", "bookshelfThin", "resources/images/textures/furniture/bookshelfThinBlackPlywood", undefined, new BABYLON.Vector3(4.7, 0, -6), new BABYLON.Vector3(0, 90, 0));

    // Ozzy Livingroom
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(0, 0, -8));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(2, 0, -8));
    Game.createMesh("corner", undefined, undefined,            new BABYLON.Vector3(4, 0, -8));
    Game.createMesh("corner", undefined, undefined,            new BABYLON.Vector3(4, 0, -8), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(6, 0, -8), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(6, 0, -8));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(6, 0, -8), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(6, 0, -10), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(6, 0, -12), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(6, 0, -12), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("doorway", undefined, undefined,           new BABYLON.Vector3(4, 0, -12), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(2, 0, -12), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(0, 0, -12), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(0, 0, -12), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("windowframe", undefined, undefined,       new BABYLON.Vector3(0, 0, -10), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(0, 0, -8), new BABYLON.Vector3(0, 270, 0));
    Game.addFurnitureMesh("refridgeratorInstance01", "refrigerator", undefined, undefined, new BABYLON.Vector3(6.35, 0, -7.75), new BABYLON.Vector3(0, 90, 0));
    Game.addFurnitureMesh("trashBagFullInstance01", "trashBagFull", undefined, {mass:4.5}, new BABYLON.Vector3(6.4, 0, -9.8), undefined, undefined);
    Game.addFurnitureMesh("trashCanInstance01", "trashCan", undefined, {mass:4.0}, new BABYLON.Vector3(5.8, 0, -10.2), undefined, undefined);
    Game.addFurnitureMesh("trashBagFullInstance02", "trashBagFull", undefined, {mass:4.0}, new BABYLON.Vector3(6.5, 0, -10.6), new BABYLON.Vector3(0, 90, 0), undefined);
    
    
    // Landlord Blob
    /*Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(10, 0, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(12, 0, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(14, 0, 0), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(8, 0, -2), new BABYLON.Vector3(0, -180, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(10, 0, -2), new BABYLON.Vector3(0, -90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(14, 0, -2), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(10, 0, -4), new BABYLON.Vector3(0, -90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(14, 0, -4), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(8, 0, -6), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("doorway", undefined, undefined,           new BABYLON.Vector3(10, 0, -6), new BABYLON.Vector3(0, -90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(14, 0, -6), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(8, 0, -8));
    Game.createMesh("corner", undefined, undefined,            new BABYLON.Vector3(10, 0, -8));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(14, 0, -8), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(8, 0, -10), new BABYLON.Vector3(0, -90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(14, 0, -10), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(8, 0, -12), new BABYLON.Vector3(0, -90, 0));
    Game.createMesh("corner", undefined, undefined,            new BABYLON.Vector3(10, 0, -12), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(14, 0, -12), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(6, 0, -14));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(8, 0, -14));
    Game.createMesh("corner", undefined, undefined,            new BABYLON.Vector3(10, 0, -14));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(14, 0, -14), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("doorway", undefined, undefined,           new BABYLON.Vector3(6, 0, -16), new BABYLON.Vector3(0, -90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(8, 0, -16), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(10, 0, -16), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(12, 0, -16), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(14, 0, -16), new BABYLON.Vector3(0, 180, 0));*/

    // Lobby
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(0, 0, -14));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(2, 0, -14));
    Game.createMesh("doorway", undefined, undefined,           new BABYLON.Vector3(4, 0, -14));
    Game.createDoor("ozzyapartmentdoor", "Ozzy's Apartment", undefined, "door", undefined, undefined, new BABYLON.Vector3(4, 0, -13));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(4, 0, -14), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("doorway", undefined, undefined,           new BABYLON.Vector3(4, 0, -16), new BABYLON.Vector3(0, 90, 0));
    Game.createDoor("landlordapartmentdoor", "Landlord's Apartment", undefined, "door", undefined, undefined, new BABYLON.Vector3(5, 0, -16), new BABYLON.Vector3(0, 90, 0));
        Game.getDoorController("landlordapartmentdoor").getEntity().setLocked(true);
    Game.createMesh("corner", undefined, undefined,            new BABYLON.Vector3(4, 0, -18), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(6, 0, -18));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(8, 0, -18));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(10, 0, -18));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(12, 0, -18));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(14, 0, -18));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(14, 0, -18), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(14, 0, -20), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(14, 0, -22), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("windowframe", undefined, undefined,              new BABYLON.Vector3(14, 0, -24), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(14, 0, -26), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(14, 0, -26), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("windowframe", undefined, undefined,              new BABYLON.Vector3(12, 0, -26), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(10, 0, -26), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("windowframe", undefined, undefined,              new BABYLON.Vector3(8, 0, -26), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(6, 0, -26), new BABYLON.Vector3(0, 180, 0));
    // Lobby entrance divider
        Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(6, 0, -26), new BABYLON.Vector3(0, 270, 0));
        Game.createMesh("corner", undefined, undefined,            new BABYLON.Vector3(4, 0, -24), new BABYLON.Vector3(0, 180, 0));
        Game.createMesh("corner", undefined, undefined,            new BABYLON.Vector3(6, 0, -24), new BABYLON.Vector3(0, 270, 0));
        Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(4, 0, -26), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("doorway", undefined, undefined,           new BABYLON.Vector3(4, 0, -26), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(2, 0, -26), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(0, 0, -26), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(0, 0, -26), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(0, 0, -24), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(0, 0, -22), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(0, 0, -20), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(0, 0, -18), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(0, 0, -16), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined,              new BABYLON.Vector3(0, 0, -14), new BABYLON.Vector3(0, 270, 0));
    // Lobby stairwell
        Game.createCollisionRamp(new BABYLON.Vector3(0, 0, -22.5), new BABYLON.Vector3(2, 3, -17.5));
        Game.createMesh("corner", undefined, undefined,            new BABYLON.Vector3(2, 0, -18), new BABYLON.Vector3(0, 270, 0));
        Game.createMesh("stairWallSideRight", undefined, undefined,new BABYLON.Vector3(2, 0, -20));
        Game.createMesh("stairWallCornerRight", undefined, undefined, new BABYLON.Vector3(2, 0, -22));
        Game.createMesh("stairs", undefined, undefined,            new BABYLON.Vector3(0, 0, -22));
        Game.createMesh("stairs", undefined, undefined,            new BABYLON.Vector3(0, 1.5, -20));
        Game.createMesh("doorway", undefined, undefined,           new BABYLON.Vector3(0, 0, -18), new BABYLON.Vector3(0, 180, 0));
        Game.createDoor("packstreetApt3Basement", "Basement", undefined, "door", undefined, undefined, new BABYLON.Vector3(0, 0, -19), new BABYLON.Vector3(0, 180, 0)).setOpensInward();
        Game.createMesh("doorway", undefined, undefined,           new BABYLON.Vector3(0, 0, -20));
        Game.createMesh("stairWallSideLeft", undefined, undefined,new BABYLON.Vector3(0, 0, -20));
        Game.createMesh("stairWallCornerLeft", undefined, undefined, new BABYLON.Vector3(0, 0, -22));

    Game.createFurniture("commonsCouch", "Couch", "couch", "couch01", undefined, undefined, new BABYLON.Vector3(8.5, 0, -22), new BABYLON.Vector3(0, -90, 0), new BABYLON.Vector3(1.5, 1.5, 1.5), false);
    Game.addFurnitureMesh("tableInstance01", "diningTable", undefined, {mass:25,restitution:0.1}, new BABYLON.Vector3(10, 0, -22), new BABYLON.Vector3(0, -90, 0));
    Game.createItem("knife", "knife", undefined, new BABYLON.Vector3(9.7, 0.625, -22.5), new BABYLON.Vector3(180, 0, 0));
    Game.createItem("cross", "cross", undefined, new BABYLON.Vector3(10, 0.6, -22));
    Game.addItemMesh("plateInstance01", "plate", undefined, undefined, new BABYLON.Vector3(9.7, 0.5, -21.5));
    Game.addItemMesh("plateInstance02", "plate", undefined, undefined, new BABYLON.Vector3(10, 0.5, -22.5));

    Game.createItem("alBuildingLocationKey", "alBuildingLocationKey", undefined, new BABYLON.Vector3(10, 0.5, -22.75));
    Game.createItem("packstreet23StrangeNewDay", "packstreet23StrangeNewDay", undefined, new BABYLON.Vector3(10, 0.5, -21.25), new BABYLON.Vector3(0, 180, 0));

    Game.addFurnitureMesh("lamp", "lamp01", undefined, undefined, new BABYLON.Vector3(-0.5, 0, -26.5));

    Game.createDoor("apartmentbuildingdoor", "Door", undefined, "door", undefined, undefined, new BABYLON.Vector3(4, 0, -27));
    Game.getDoorController("apartmentbuildingdoor").getEntity().setLocked(true);
    Game.getDoorController("apartmentbuildingdoor").getEntity().setKey("alBuildingLocationKey");

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
    Game.createCollisionWall(new BABYLON.Vector3(-1, 3, -13), new BABYLON.Vector3(3, 6, -13)); // Front hallway wall
    Game.createCollisionWall(new BABYLON.Vector3(5, 3, -13), new BABYLON.Vector3(5, 6, -21)); // Side hallway wall
    Game.createCollisionWall(new BABYLON.Vector3(5, 3, -23), new BABYLON.Vector3(5, 6, -27)); // Side hallway wall
    
    Game.createCollisionRamp(new BABYLON.Vector3(0, 3, -22.5), new BABYLON.Vector3(2, 6, -17.5));
    
    Game.createMesh("stairs", undefined, undefined,            new BABYLON.Vector3(0, 3, -22));
    Game.createMesh("stairs", undefined, undefined,            new BABYLON.Vector3(0, 4.5, -20));
    
    var commonsFloor02a = BABYLON.MeshBuilder.CreateTiledGround("commonsFloor02a", {xmin:0, zmin:0, xmax: 4, zmax: 14, subdivisions: {w:4, h:14}}, Game.scene);
        commonsFloor02a.material = pinkCarpetMaterial;
        commonsFloor02a.position.set(1, 3, -27);
    Game.createCollisionPlane(commonsFloor02a);
    var commonsFloor02b = BABYLON.MeshBuilder.CreateTiledGround("commonsFloor02b", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, Game.scene);
        commonsFloor02b.material = pinkCarpetMaterial;
        commonsFloor02b.position.set(-1, 3, -27);
    Game.createCollisionPlane(commonsFloor02b);
    var commonsFloor02c = BABYLON.MeshBuilder.CreateTiledGround("commonsFloor02c", {xmin:0, zmin:0, xmax: 2, zmax: 6, subdivisions: {w:2, h:6}}, Game.scene);
        commonsFloor02c.material = pinkCarpetMaterial;
        commonsFloor02c.position.set(-1, 3, -19);
    Game.createCollisionPlane(commonsFloor02c);

    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(0, 3, -14));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(2, 3, -14));
    Game.createMesh("doorway", undefined, undefined, new BABYLON.Vector3(4, 3, -14));
    Game.createDoor("chartyApartmentDoor", "Charlie and Marty's Apartment", undefined, "door", undefined, undefined, new BABYLON.Vector3(4, 3, -13), new BABYLON.Vector3(0, 0, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(4, 3, -14), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(4, 3, -16), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(4, 3, -18), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(4, 3, -20), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("doorway", undefined, undefined, new BABYLON.Vector3(4, 3, -22), new BABYLON.Vector3(0, 90, 0));
    Game.createDoor("kyleApartmentDoor", "Kyle's Apartment", undefined, "door", undefined, undefined, new BABYLON.Vector3(5, 3, -22), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(4, 3, -24), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(4, 3, -26), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(4, 3, -26), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(2, 3, -26), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(0, 3, -26), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(0, 3, -26), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(0, 3, -24), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(0, 3, -22), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(0, 3, -20), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(0, 3, -18), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(0, 3, -16), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(0, 3, -14), new BABYLON.Vector3(0, 270, 0));

    // Charty Apartment
    // Charty Livingroom
    var chartyLivingroomFloor = BABYLON.MeshBuilder.CreateTiledGround("chartyLivingroomFloor", {xmin:0, zmin:0, xmax: 16, zmax: 6, subdivisions: {w:16, h:6}}, Game.scene);
        chartyLivingroomFloor.material = pinkCarpetMaterial;
        chartyLivingroomFloor.position.set(-1, 3, -13);
    Game.createCollisionPlane(chartyLivingroomFloor);

    Game.createCollisionWall(new BABYLON.Vector3(-1, 3, -7), new BABYLON.Vector3(7, 6, -7)); // Front wall between livingroom and Charlie's bedroom
    Game.createCollisionWall(new BABYLON.Vector3(9, 3, -7), new BABYLON.Vector3(15, 6, -7)); // Front wall between livingroom and Marty's bedroom

    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(0, 3, -8));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(2, 3, -8));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(4, 3, -8));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(6, 3, -8));
    Game.createMesh("corner", undefined, undefined, new BABYLON.Vector3(8, 3, -8));
    Game.createMesh("corner", undefined, undefined, new BABYLON.Vector3(8, 3, -8), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(10, 3, -8));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(12, 3, -8));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(14, 3, -8));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(14, 3, -8), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(14, 3, -10), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(14, 3, -12), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(14, 3, -12), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(12, 3, -12), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(10, 3, -12), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(8, 3, -12), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(6, 3, -12), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("doorway", undefined, undefined, new BABYLON.Vector3(4, 3, -12), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(2, 3, -12), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(0, 3, -12), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(0, 3, -12), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(0, 3, -10), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(0, 3, -8), new BABYLON.Vector3(0, 270, 0));

    // Charty Hallway
    var chartyHallwayFloor = BABYLON.MeshBuilder.CreateTiledGround("chartyHallwayFloor", {xmin:0, zmin:0, xmax: 4, zmax: 2, subdivisions: {w:4, h:2}}, Game.scene);
        chartyHallwayFloor.material = pinkCarpetMaterial;
        chartyHallwayFloor.position.set(5, 3, -7);
    Game.createCollisionPlane(chartyHallwayFloor);

    Game.createCollisionWall(new BABYLON.Vector3(7, 3, -5), new BABYLON.Vector3(9, 6, -5)); // Front wall between hallway and bathroom

    Game.createMesh("doorway", undefined, undefined, new BABYLON.Vector3(6, 3, -6));
    Game.createDoor("chartyBathroomDoor", "Bathroom", undefined, "door", undefined, undefined, new BABYLON.Vector3(6, 3, -5));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(8, 3, -6));
    Game.createMesh("doorway", undefined, undefined, new BABYLON.Vector3(8, 3, -6), new BABYLON.Vector3(0, 90, 0));
    Game.createDoor("martyBedroomDoor", "Marty's Room", undefined, "door", undefined, undefined, new BABYLON.Vector3(9, 3, -6), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("corner", undefined, undefined,  new BABYLON.Vector3(8, 3, -6), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(6, 3, -6), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("doorway", undefined, undefined, new BABYLON.Vector3(6, 3, -6), new BABYLON.Vector3(0, 270, 0));
    Game.createDoor("charlieBedroomDoor", "Charlie's Room", undefined, "door", undefined, undefined, new BABYLON.Vector3(5, 3, -6), new BABYLON.Vector3(0, 90, 0)).setOpensInward();

    // Charlie bedroom
    var charlieBedroomFloor = BABYLON.MeshBuilder.CreateTiledGround("charlieBedroomFloor", {xmin:0, zmin:0, xmax: 6, zmax: 8, subdivisions: {w:6, h:8}}, Game.scene);
        charlieBedroomFloor.material = darkWoodMaterial;
        charlieBedroomFloor.position.set(-1, 3, -7);
    Game.createCollisionPlane(charlieBedroomFloor);

    Game.createCollisionWall(new BABYLON.Vector3(1, 3, -1), new BABYLON.Vector3(5, 6, -1)); // Front wall between Charlie's closet and bedroom
    Game.createCollisionWall(new BABYLON.Vector3(5, 3, 1), new BABYLON.Vector3(5, 6, -5)); // Side wall between Charlie's bedroom and bathroom

    Game.createMesh("doorway", undefined, undefined, new BABYLON.Vector3(0, 3, -2));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(2, 3, -2));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(4, 3, -2));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(4, 3, -2), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(4, 3, -4), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("doorway", undefined, undefined, new BABYLON.Vector3(4, 3, -6), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(4, 3, -6), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(2, 3, -6), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(0, 3, -6), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(0, 3, -6), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(0, 3, -4), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(0, 3, -2), new BABYLON.Vector3(0, 270, 0));

    // Charlie Closet
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(0, 3, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(2, 3, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(4, 3, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(4, 3, 0), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(4, 3, 0), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(2, 3, 0), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("doorway", undefined, undefined, new BABYLON.Vector3(0, 3, 0), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(0, 3, 0), new BABYLON.Vector3(0, 270, 0));

    // Charty Bathroom
    var chartyBathroomFloor = BABYLON.MeshBuilder.CreateTiledGround(undefined, {xmin:0, zmin:0, xmax: 4, zmax: 6, subdivisions: {w:4, h:6}}, Game.scene);
        chartyBathroomFloor.material = linoleumMaterial;
        chartyBathroomFloor.position.set(5, 3, -5);
    Game.createCollisionPlane(chartyBathroomFloor);

    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(6, 3, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(8, 3, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(8, 3, 0), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(8, 3, -2), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(8, 3, -4), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(8, 3, -4), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("doorway", undefined, undefined, new BABYLON.Vector3(6, 3, -4), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(6, 3, -4), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(6, 3, -2), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(6, 3, 0), new BABYLON.Vector3(0, 270, 0));

    // Marty bedroom
    var martyBedroomFloor = BABYLON.MeshBuilder.CreateTiledGround("martyBedroomFloor", {xmin:0, zmin:0, xmax: 6, zmax: 8, subdivisions: {w:6, h:8}}, Game.scene);
        martyBedroomFloor.material = darkWoodMaterial;
        martyBedroomFloor.position.set(9, 3, -7);
    Game.createCollisionPlane(martyBedroomFloor);

    Game.createCollisionWall(new BABYLON.Vector3(9, 3, -1), new BABYLON.Vector3(13, 6, -1)); // Front wall between Marty's closet and bedroom
    Game.createCollisionWall(new BABYLON.Vector3(9, 3, 1), new BABYLON.Vector3(9, 6, -5)); // Side wall between Narty's bedroom and bathroom

    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(10, 3, -2));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(12, 3, -2));
    Game.createMesh("doorway", undefined, undefined, new BABYLON.Vector3(14, 3, -2));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(14, 3, -2), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(14, 3, -4), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(14, 3, -6), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(14, 3, -6), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(12, 3, -6), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(10, 3, -6), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("doorway", undefined, undefined, new BABYLON.Vector3(10, 3, -6), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(10, 3, -4), new BABYLON.Vector3(0, 270, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(10, 3, -2), new BABYLON.Vector3(0, 270, 0));

    // Marty Closet
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(10, 3, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(12, 3, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(14, 3, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(14, 3, 0), new BABYLON.Vector3(0, 90, 0));
    Game.createMesh("doorway", undefined, undefined, new BABYLON.Vector3(14, 3, 0), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(12, 3, 0), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(10, 3, 0), new BABYLON.Vector3(0, 180, 0));
    Game.createMesh("wall", undefined, undefined, new BABYLON.Vector3(10, 3, 0), new BABYLON.Vector3(0, 270, 0));

    Game.createCharacter("rinehart", "Rinehart Nye", undefined, "genericCharacter", 30, "m", "fox", "foxM", "foxRinehart", undefined, new BABYLON.Vector3(3, 0, -20), new BABYLON.Vector3(0, 180, 0)).attachToLeftEye("eye", "circularEyeViolet").attachToRightEye("eye", "circularEyeViolet");
    Game.createItem("mountainChocolateBar", "mountainChocolateBar", undefined, new BABYLON.Vector3(3, 0.625, -19.8), new BABYLON.Vector3(55, 90, 0));
    Game.createCharacter("rosie", "Rosie", undefined, "rosie", 14, "f", "fox", "foxF", "foxRed", undefined, new BABYLON.Vector3(2, 3.1, -4.5), undefined, new BABYLON.Vector3(0.7, 0.7, 0.7)).attachToLeftEye("eye", "circularEyeBlue").attachToRightEye("eye", "circularEyeBlue");
    Game.createCharacter("charlie", "Charlie", undefined, "charlie", 28, "f", "fox", "foxF", "foxCorsac", undefined, new BABYLON.Vector3(2, 3.1, -5), new BABYLON.Vector3(0,180,0), new BABYLON.Vector3(0.9,0.9,0.9)).attachToLeftEye("eye", "feralEyeBlue").attachToRightEye("eye", "feralEyeBlue").attachToRightHand("wand02").attachToBone("ring01", "ring02Gold", "thumbProximinalPhalanx.l").attachToBone("ring02", "ring02GoldBrokenRuby", "fingersIndexProximinalPhalanx.l").attachToBone("ring01", "ring02Silver", "fingersPinkieProximinalPhalanx.l").attachToHead("hornsCurved04", "bone01");
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
        function(_them, you) {
            return "You try to give Charlie a kiss on the lips, but she dodges her head aside and glares at you.";
        }
    );
    Game.getDialogue("charlieTalk").addOption("charlieKiss");
    Game.getCharacterEntity("charlie").setDialogue("charlieTalk");

    // Create fire material
    var fire = new BABYLON.FireMaterial("fire", Game.scene);
        fire.opacityTexture = new BABYLON.Texture("resources/images/textures/effects/fireOpacity.png", Game.scene);
        fire.distortionTexture = new BABYLON.Texture("resources/images/textures/effects/fireDistortion.png", Game.scene);
        fire.diffuseTexture = new BABYLON.Texture("resources/images/textures/effects/fire.png", Game.scene);
        fire.speed = 5.0;

    // Create plane to apply the fire material
    var plane = BABYLON.Mesh.CreatePlane("fireplane", 1.5, Game.scene);
        plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
        plane.material = fire;
        plane.scaling.y = 2;

    // Game.scene.getMeshByID("fireplane").attachToBone(Game.player.getBone("hand.r"), Game.player.mesh);
    // Game.scene.getMeshByID("fireplane").rotation.set(0, BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180));
    // Game.scene.getMeshByID("fireplane").scaling.set(0.1, 0.2, 0.1);
}