_map = {};

window.addEventListener('resize', function(){
    Game.engine.resize();
    GameGUI.resizeText();
});
window.addEventListener("DOMContentLoaded", function() {
    if (Game.debugEnabled) console.log("Initializing game.");
    Game.initialize();

    Game.engine.runRenderLoop(function() {
        Game.scene.render();
        if (!Game._finishedLoading && Game._filesToLoad == 0) {
            if (Game.debugEnabled) console.log("Finished loading assets.");

            var _character = Game.characterMeshes["foxSkeletonN"];
            var _animationRange = _character.skeleton.getAnimationRanges();
            for (var _i = 0; _i < _animationRange.length; _i++) {
                if (_animationRange[_i].to - _animationRange[_i].from > 2) {
                    _animationRange[_i].from += 1;
                    _animationRange[_i].to -= 1;
                }
            }

            generateApartment();
            Game.initPlayer();
            Game._finishedLoading = true;

            Game.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
                Game.controlCharacterOnKeyDown(evt.sourceEvent.keyCode);
            }));
            Game.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
                Game.controlCharacterOnKeyUp(evt.sourceEvent.keyCode);
            }));

            Client.initialize();
            GameGUI.resizeText();
            GameGUI.showCharacterChoiceMenu();
        }
    });
    var _rbrCount = 0;
    Game.scene.registerBeforeRender(function() {
        if (!(Game.player instanceof CharacterController))
            return null;
        for (_character in Game.characterControllers) {
            if (Game.entityControllers[_character] instanceof CharacterController) {
                Game.entityControllers[_character].moveAV();
            }
            if (_character.propertiesChanged) {
                _character.updateProperties();
            }
        }
        for (_door in Game.doorControllers) {
            Game.doorControllers[_door].moveAV();
        }
    });
    Game.scene.registerAfterRender(function() {
        if (Game._assignBoundingBoxCollisionQueue.size > 0) {
            Game._assignBoundingBoxCollisionQueue.forEach(function(_mesh) {
                Game._assignBoundingBoxCollisionToMesh(_mesh);
            });
        }
        if (_rbrCount >= 10) {
            Game.castRayTarget();
            _rbrCount = 0;
        }
        else {
            _rbrCount++;
        }
    })
});

function generateApartment() {
    if (Game.debugEnabled) console.log("Running generateApartmentScene");
    
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1024.0}, Game.scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", Game.scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("resources/images/skyboxes/m/skybox", Game.scene, ["_px.svg", "_py.svg", "_pz.svg", "_nx.svg", "_ny.svg", "_nz.svg"]);
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
        packStreetApartmentBuildingTexture.diffuseTexture = new BABYLON.Texture("resources/images/packStreetApartmentBuildingGroundFloor.png", Game.scene);
        packStreetApartmentBuildingTexture.specularColor = new BABYLON.Color3(0, 0, 0);
        packStreetApartmentBuildingTexture.backFaceCulling = false;
    var packStreetApartmentBuildingMap = new BABYLON.Mesh.CreatePlane("packStreetApartmentBuildingMap", 2, Game.scene);
        packStreetApartmentBuildingMap.position.x = 5.6;
        packStreetApartmentBuildingMap.position.y = 1.5;
        packStreetApartmentBuildingMap.position.z = -17.06;
        packStreetApartmentBuildingMap.scaling.x = 0.6;
        packStreetApartmentBuildingMap.material = packStreetApartmentBuildingTexture;

    var nooo = new BABYLON.StandardMaterial("", Game.scene);
        nooo.diffuseTexture = new BABYLON.Texture("resources/images/noooo.jpg", Game.scene);
        nooo.specularColor = new BABYLON.Color3(0, 0, 0);
        nooo.backFaceCulling = true;
    var noooMesh = new BABYLON.Mesh.CreatePlane("noooMesh", 2, Game.scene);
        noooMesh.position.set(4, 1, -27);
        noooMesh.scaling.x = 0.6;
        noooMesh.material = nooo;

    var yipyipyipTexture = new BABYLON.StandardMaterial("yipyipyipTexture", Game.scene);
        yipyipyipTexture.diffuseTexture = new BABYLON.VideoTexture("yipyipyipVideo", ["resources/videos/20180420_yipyipyip.mp4", "resources/videos/20180420_yipyipyip.webm"], Game.scene, true);
        yipyipyipTexture.emissiveColor = new BABYLON.Color3(0, 0, 0);
    var yipyipyipMesh = new BABYLON.Mesh.CreatePlane("yipyipyipPlayer", 2, Game.scene);
        yipyipyipMesh.position.set(1, 1.5, -17.06);
        yipyipyipMesh.scaling.set(0.75, 0.5, 0.5);
        yipyipyipMesh.material = yipyipyipTexture;

    var pinkCarpetMaterial = new BABYLON.StandardMaterial("pinkCarpetMaterial", Game.scene);
        pinkCarpetMaterial.diffuseTexture = new BABYLON.Texture("resources/data/rug.png", Game.scene);
        pinkCarpetMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    var darkWoodMaterial = new BABYLON.StandardMaterial("darkWoodMaterial", Game.scene);
        darkWoodMaterial.diffuseTexture = new BABYLON.Texture("resources/data/woodenFloorDark01.png", Game.scene);
        darkWoodMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    var linoleumMaterial = new BABYLON.StandardMaterial("linoleumMaterial", Game.scene);
        linoleumMaterial.diffuseTexture = new BABYLON.Texture("resources/data/checkerLinoleumFloor01.png", Game.scene);
        linoleumMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    // Ground Floor
    var ozzyBedroomClosetFloor = new BABYLON.MeshBuilder.CreateTiledGround(undefined, {xmin:0, zmin:0, xmax: 2, zmax: 2, subdivisions: {w:2, h:2}}, Game.scene);
        ozzyBedroomClosetFloor.material = darkWoodMaterial;
        ozzyBedroomClosetFloor.position.set(-1, 0, -1);
    Game.createCollisionPlane(ozzyBedroomClosetFloor);
    var ozzyHallwayClosetFloor = new BABYLON.MeshBuilder.CreateTiledGround(undefined, {xmin:0, zmin:0, xmax: 2, zmax: 2, subdivisions: {w:2, h:2}}, Game.scene);
        ozzyHallwayClosetFloor.material = darkWoodMaterial;
        ozzyHallwayClosetFloor.position.set(1, 0, -1);
    Game.createCollisionPlane(ozzyHallwayClosetFloor);
    var ozzyBathroomFloor = new BABYLON.MeshBuilder.CreateTiledGround(undefined, {xmin:0, zmin:0, xmax: 4, zmax: 4, subdivisions: {w:4, h:4}}, Game.scene);
        ozzyBathroomFloor.material = linoleumMaterial;
        ozzyBathroomFloor.position.set(5, 0, -3);
    Game.createCollisionPlane(ozzyBathroomFloor);
    var ozzyBedroomFloor = new BABYLON.MeshBuilder.CreateTiledGround(undefined, {xmin:0, zmin:0, xmax: 4, zmax: 6, subdivisions: {w:4, h:6}}, Game.scene);
        ozzyBedroomFloor.material = darkWoodMaterial;
        ozzyBedroomFloor.position.set(-1, 0, -7);
    Game.createCollisionPlane(ozzyBedroomFloor);
    var ozzyHallwayFloor = new BABYLON.MeshBuilder.CreateTiledGround(undefined, {xmin:0, zmin:0, xmax: 2, zmax: 8, subdivisions: {w:2, h:8}}, Game.scene);
        ozzyHallwayFloor.material = darkWoodMaterial;
        ozzyHallwayFloor.position.set(3, 0, -7);
    Game.createCollisionPlane(ozzyHallwayFloor);
    var ozzyLivingroomFloor = new BABYLON.MeshBuilder.CreateTiledGround(undefined, {xmin:0, zmin:0, xmax: 8, zmax: 6, subdivisions: {w:8, h:6}}, Game.scene);
        ozzyLivingroomFloor.material = darkWoodMaterial;
        ozzyLivingroomFloor.position.set(-1, 0, -13);
    Game.createCollisionPlane(ozzyLivingroomFloor);

    var commonsFloor01 = new BABYLON.MeshBuilder.CreateTiledGround("commonsFloor01", {xmin:0, zmin:0, xmax: 4, zmax: 14, subdivisions: {w:4, h:14}}, Game.scene);
        commonsFloor01.material = pinkCarpetMaterial;
        commonsFloor01.position.set(1, 0, -27);
    Game.createCollisionPlane(commonsFloor01);
    var commonsFloor02 = new BABYLON.MeshBuilder.CreateTiledGround("commonsFloor02", {xmin:0, zmin:0, xmax: 10, zmax: 10, subdivisions: {w:10, h:10}}, Game.scene);
        commonsFloor02.material = pinkCarpetMaterial;
        commonsFloor02.position.set(5, 0, -27);
    Game.createCollisionPlane(commonsFloor02);
    var commonsFloor03 = new BABYLON.MeshBuilder.CreateTiledGround("commonsFloor03", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, Game.scene);
        commonsFloor03.material = pinkCarpetMaterial;
        commonsFloor03.position.set(-1, 0, -27);
    Game.createCollisionPlane(commonsFloor03);
    var commonsFloor04 = new BABYLON.MeshBuilder.CreateTiledGround("commonsFloor04", {xmin:0, zmin:0, xmax: 2, zmax: 6, subdivisions: {w:2, h:6}}, Game.scene);
        commonsFloor04.material = pinkCarpetMaterial;
        commonsFloor04.position.set(-1, 0, -19);
    Game.createCollisionPlane(commonsFloor04);

    var ceilingMaterial = new BABYLON.StandardMaterial("ceilingMaterial", Game.scene);
        ceilingMaterial.diffuseTexture = new BABYLON.Texture("resources/data/wall.png", Game.scene);
        ceilingMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        ceilingMaterial.backFaceCulling = false;
    var ceilingMesh01 = new BABYLON.MeshBuilder.CreateTiledGround("ceilingMesh01", {xmin:0, zmin:0, xmax: 14, zmax: 28, subdivisions: {w:14, h:28}}, Game.scene);
        ceilingMesh01.material = ceilingMaterial;
        ceilingMesh01.position.set(1, 2.9, -27);
    var ceilingMesh01b = new BABYLON.MeshBuilder.CreateTiledGround("ceilingMesh01b", {xmin:0, zmin:0, xmax: 2, zmax: 20, subdivisions: {w:2, h:20}}, Game.scene);
        ceilingMesh01b.material = ceilingMaterial;
        ceilingMesh01b.position.set(-1, 2.9, -19);
    var ceilingMesh01c = new BABYLON.MeshBuilder.CreateTiledGround("ceilingMesh01c", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, Game.scene);
        ceilingMesh01c.material = ceilingMaterial;
        ceilingMesh01c.position.set(-1, 2.9, -27);

    // Building collision walls
    Game.createCollisionWall({x:-1, y:-4, z:1}, {x:15, y:12.125, z:1}); // Back floor wall
    Game.createCollisionWall({x:-1, y:-4, z:1}, {x:-1, y:12.125, z:-27}); // Left floor wall
    Game.createCollisionWall({x:15, y:-4, z:1}, {x:15, y:12.125, z:-27}); // Right floor wall
    Game.createCollisionWall({x:-1, y:0, z:-27}, {x:3, y:3, z:-27}); // Front floor wall, left
    Game.createCollisionWall({x:5, y:0, z:-27}, {x:15, y:3, z:-27}); // Front floor wall, right
    Game.createCollisionWall({x:-1, y:3, z:-27}, {x:15, y:9.125, z:-27}); // Front floor wall above ground floor
    Game.createCollisionWall({x:-1, y:-4, z:-27}, {x:15, y:0, z:-27}); // Front floor wall below ground floor

    // Ground floor collision walls
    Game.createCollisionWall({x:1, y:0, z:1}, {x:1, y:3, z:-1}); // Side wall between Ozzy's bedroom closet and hallway closet
    Game.createCollisionWall({x:1, y:0, z:-1}, {x:3, y:3, z:-1}); // Front wall between Ozzy's hallway closet and bedroom
    Game.createCollisionWall({x:3, y:0, z:-3}, {x:3, y:3, z:-7}); // Side wall between Ozzy's bedroom and hallway
    Game.createCollisionWall({x:-1, y:0, z:-7}, {x:3, y:3, z:-7}); // Front wall between Ozzy's bedroom and livingroom

    Game.createCollisionWall({x:9, y:0, z:1}, {x:9, y:3, z:-5}); // Side wall between Ozzy's bathroom and Landlord's apartment
    Game.createCollisionWall({x:5, y:0, z:-1}, {x:5, y:3, z:-7}); // Side wall between Ozzy's apartment and Landlord's bathroom
    Game.createCollisionWall({x:7, y:0, z:-7}, {x:7, y:3, z:-13}); // Side wall between Ozzy's and Landord's kitchenettes

    Game.createCollisionWall({x:5, y:0, z:-3}, {x:9, y:3, z:-3}); // Front wall between Ozzy's and Landlord's bathrooms
    Game.createCollisionWall({x:5, y:0, z:-7}, {x:9, y:3, z:-7}); // Front wall between Landlord's bathroom and Landlord's and Ozzy's kitchenettes
    Game.createCollisionWall({x:5, y:0, z:-13}, {x:9, y:3, z:-13}); // Front wall between Landlord's kitchenette and Landlord's entrance

    Game.createCollisionWall({x:1, y:0, z:-23}, {x:1, y:3, z:-19}); // Side wall between Commons and lower stairwell; blocks railing

    Game.createCollisionWall({x:-1, y:0, z:-13}, {x:3, y:3, z:-13}); // Front wall between Commons and Ozzy's apartment
    Game.createCollisionWall({x:5, y:0, z:-13}, {x:5, y:3, z:-15}); // Side wall between Commons and Landlord's apartment
    Game.createCollisionWall({x:5, y:0, z:-17}, {x:15, y:3, z:-17}); // Front wall between Commons and Landlord's apartment

    Game.createCollisionWall({x:5, y:0, z:-25}, {x:5, y:3, z:-27}); // Side wall between Commons and building entrance

    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:0, y:0, z:0});
    Game.addMesh(undefined, "frontDoorLeftWall", undefined,    {x:0, y:0, z:0}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:2, y:0, z:0});
    Game.addMesh(undefined, "frontWallLeftDoor", undefined,    {x:2, y:0, z:0}, {x:0, y:180, z:0});
    Game.createDoor("ozzyhallwayclosetdoor", "Closet", undefined, "door", undefined, undefined, {x:3, y:0, z:0}, {x:0, y:-90, z:0});
    Game.getDoorController("ozzyhallwayclosetdoor").setOpensInward(false);
    Game.createDoor("ozzybathroomdoor", "Bathroom", undefined, "door", undefined, undefined, {x:5, y:0, z:0}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "frontDoorLeftWall", undefined,    {x:4, y:0, z:0}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "doorway", undefined,              {x:4, y:0, z:0}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "frontWallLeftDoor", undefined,    {x:6, y:0, z:0});
    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:8, y:0, z:0}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:10, y:0, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:12, y:0, z:0});
    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:14, y:0, z:0}, {x:0, y:90, z:0});

    Game.addMesh(undefined, "wall", undefined,                 {x:0, y:0, z:-2}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "doorway", undefined,              {x:0, y:0, z:-2});
    Game.addMesh(undefined, "frontDoorLeftWall", undefined,    {x:2, y:0, z:-2}, {x:0, y:90, z:0});
    Game.createDoor("ozzybedroomdoor", "Bedroom", undefined, "door", undefined, undefined, {x:3, y:0, z:-2}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "doorway", undefined,              {x:4, y:0, z:-2}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:4, y:0, z:-2}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:6, y:0, z:-2}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:8, y:0, z:-2}, {x:0, y:-180, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:10, y:0, z:-2}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:14, y:0, z:-2}, {x:0, y:90, z:0});

    Game.addMesh(undefined, "wall", undefined,                 {x:0, y:0, z:-4}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:2, y:0, z:-4}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:4, y:0, z:-4}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:4, y:0, z:-4}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:6, y:0, z:-4});
    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:8, y:0, z:-4}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:10, y:0, z:-4}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:14, y:0, z:-4}, {x:0, y:90, z:0});

    Game.addMesh(undefined, "wall", undefined,                 {x:0, y:0, z:-6}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:0, y:0, z:-6}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:2, y:0, z:-6}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:4, y:0, z:-6}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:4, y:0, z:-6}, {x:0, y:90, z:0});
    Game.addFurnitureMesh("bookShelfThinInstance01", "bookshelfThin", undefined, undefined, {x:4, y:0, z:-6}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:6, y:0, z:-6}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "frontWallLeftDoor", undefined,    {x:8, y:0, z:-6}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "doorway", undefined,              {x:10, y:0, z:-6}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:14, y:0, z:-6}, {x:0, y:90, z:0});

    Game.addMesh(undefined, "wall", undefined,                 {x:0, y:0, z:-8}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:0, y:0, z:-8});
    Game.addMesh(undefined, "wall", undefined,                 {x:2, y:0, z:-8});
    Game.addMesh(undefined, "corner", undefined,               {x:4, y:0, z:-8});
    Game.addMesh(undefined, "corner", undefined,               {x:4, y:0, z:-8}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:6, y:0, z:-8}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "refrigerator", undefined,         {x:6, y:0, z:-8}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:8, y:0, z:-8});
    Game.addMesh(undefined, "corner", undefined,               {x:10, y:0, z:-8});
    Game.addMesh(undefined, "wall", undefined,                 {x:14, y:0, z:-8}, {x:0, y:90, z:0});

    Game.addMesh(undefined, "wall", undefined,                 {x:0, y:0, z:-10}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:6, y:0, z:-10}, {x:0, y:90, z:0});
    Game.addFurnitureMesh("trashBagFullInstance01", "trashBagFull", undefined, {mass:4.5}, {x:6.4, y:0, z:-9.8}, undefined, undefined);
    Game.addFurnitureMesh("trashCanInstance01", "trashCan", undefined, {mass:4.0}, {x:5.8, y:0, z:-10.2}, undefined, undefined);
    Game.addFurnitureMesh("trashBagFullInstance02", "trashBagFull", undefined, {mass:4.0}, {x:6.5, y:0, z:-10.6}, {x:0, y:90, z:0}, undefined);
    Game.addMesh(undefined, "wall", undefined,                 {x:8, y:0, z:-10}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:14, y:0, z:-10}, {x:0, y:90, z:0});

    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:0, y:0, z:-12}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:2, y:0, z:-12}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "doorway", undefined,              {x:4, y:0, z:-12}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:6, y:0, z:-12}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:8, y:0, z:-12}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "corner", undefined,               {x:10, y:0, z:-12}, {x:0, y:270, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:14, y:0, z:-12}, {x:0, y:90, z:0});

    Game.createDoor("ozzyapartmentdoor", "Ozzy's Apartment", undefined, "door", undefined, undefined, {x:4, y:0, z:-13}, {x:0, y:0, z:0});

    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:0, y:0, z:-14});
    Game.addMesh(undefined, "wall", undefined,                 {x:2, y:0, z:-14});
    Game.addMesh(undefined, "frontWallLeftDoor", undefined,    {x:4, y:0, z:-14}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:6, y:0, z:-14});
    Game.addMesh(undefined, "wall", undefined,                 {x:8, y:0, z:-14});
    Game.addMesh(undefined, "corner", undefined,               {x:10, y:0, z:-14});
    Game.addMesh(undefined, "wall", undefined,                 {x:14, y:0, z:-14}, {x:0, y:90, z:0});

    Game.addMesh(undefined, "wall", undefined,                 {x:0, y:0, z:-16}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "doorway", undefined,              {x:4, y:0, z:-16}, {x:0, y:90, z:0});
    Game.createDoor("packstreetApt3Basement", "Basement", undefined, "door", undefined, undefined, {x:0, y:0, z:-19}, {x:0, y:180, z:0});
    Game.getDoorController("packstreetApt3Basement").setOpensInward(false);
    Game.addMesh(undefined, "frontDoorLeftWall", undefined,    {x:6, y:0, z:-16}, {x:0, y:-90, z:0});
    Game.createDoor("landlordapartmentdoor", "Landlord's Apartment", undefined, "door", undefined, undefined, {x:5, y:0, z:-16}, {x:0, y:90, z:0});
    Game.getDoorController("landlordapartmentdoor").getEntity().setLocked(true);
    Game.addMesh(undefined, "wall", undefined,                 {x:8, y:0, z:-16}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:10, y:0, z:-16}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:12, y:0, z:-16}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:14, y:0, z:-16}, {x:0, y:180, z:0});

    Game.addMesh(undefined, "wall", undefined,                 {x:0, y:0, z:-18}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "doorway", undefined,              {x:0, y:0, z:-18}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "corner", undefined,               {x:2, y:0, z:-18}, {x:0, y:270, z:0});
    Game.addMesh(undefined, "corner", undefined,               {x:4, y:0, z:-18}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:6, y:0, z:-18});
    Game.addMesh(undefined, "wall", undefined,                 {x:8, y:0, z:-18});
    Game.addMesh(undefined, "wall", undefined,                 {x:10, y:0, z:-18});
    Game.addMesh(undefined, "wall", undefined,                 {x:12, y:0, z:-18});
    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:14, y:0, z:-18}, {x:0, y:90, z:0});

    Game.addMesh(undefined, "wall", undefined,                 {x:0, y:0, z:-20}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "stairWallSideRight", undefined,    {x:2, y:0, z:-20});
    Game.addMesh(undefined, "wall", undefined,                 {x:14, y:0, z:-20}, {x:0, y:90, z:0});

    Game.addMesh(undefined, "wall", undefined,                 {x:0, y:0, z:-22}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "stairWallCornerRight", undefined,    {x:2, y:0, z:-22});
    Game.createCollisionRamp({x:0, y:0, z:-22.5}, {x:2, y:3, z:-17.5});
    Game.createFurniture("couch", "Couch", "loveseat", "loveseat", undefined, undefined, new BABYLON.Vector3(8, 0, -21), new BABYLON.Vector3(0, -90, 0), new BABYLON.Vector3(1.5, 1.5, 1.5), false);
    Game.addMesh(undefined, "stairs", undefined,               {x:0, y:0, z:-22});
    Game.addMesh(undefined, "stairs", undefined,               {x:0, y:1.5, z:-20});
    Game.addMesh(undefined, "wall", undefined,                 {x:14, y:0, z:-22}, {x:0, y:90, z:0});
    Game.addFurnitureMesh("tableInstance01", "diningTable", undefined, {mass:25,restitution:0.1}, {x:10, y:0, z:-22});
    Game.createItem("knife", Game.createProtoItem("knife", "Knife", "", "", "weapon", "knife"), undefined, {x:9.5, y:0.9, z:-22.5}, {x:180, y:0, z:0});
    Game.createItem("cross", Game.createProtoItem("cross", "Cross", "", "", "weapon", "cross"), undefined, {x:10, y:0.6, z:-22});
    Game.addItemMesh("planeInstance01", "plate", undefined, undefined, {x:9.7, y:0.6, z:-21.5});
    Game.addItemMesh("plateInstance02", "plate", undefined, undefined, {x:10.3, y:0.6, z:-23});

    Game.createItem("alBuildingLocationKey", Game.createProtoItem("alBuildingLocationKey", "Pack Street Bldg 3 Key", "A simple key to Pack Street Bldg 3", "resources/images/items/key.svg", "key", "key01"), undefined, new BABYLON.Vector3(10, 0.6, -22.5));;
    Game.createProtoItem("pandorasBoxLocationKey", "Key to Pandora's Box", "A complex brass key meant for digitigrade mammals to Pandora's Box.", "resources/images/items/pandorasBoxLocationKey.svg", "key", "key01");
    Game.createItem("packstreet23StrangeNewDay", Game.createProtoItem("packstreet23StrangeNewDay", "Pack Street Chapter 23", "In the wake of Bellwether's arrest, Remmy takes stock of a changed city.", "resources/images/items/packstreet23StrangeNewDay.png", "book", "bookHardcoverClosed01", "resources/data/packStreetChapter23.svg"), undefined, {x:10.3, y:0.8, z:-21}, {x:0, y:180, z:0});

    Game.addMesh(undefined, "wall", undefined,                 {x:0, y:0, z:-24}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "corner", undefined,               {x:4, y:0, z:-24}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "corner", undefined,               {x:6, y:0, z:-24}, {x:0, y:270, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:14, y:0, z:-24}, {x:0, y:90, z:0});

    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:0, y:0, z:-26}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:2, y:0, z:-26}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "frontDoorLeftWall", undefined,    {x:4, y:0, z:-26}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:6, y:0, z:-26}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:8, y:0, z:-26}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:10, y:0, z:-26}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "wall", undefined,                 {x:12, y:0, z:-26}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "frontWallLeftWall", undefined,    {x:14, y:0, z:-26}, {x:0, y:180, z:0});

    Game.createDoor("apartmentbuildingdoor", "Door", undefined, "door", undefined, undefined, new BABYLON.Vector3(4, 0, -27));
    Game.getDoorController("apartmentbuildingdoor").getEntity().setLocked(true);
    Game.getDoorController("apartmentbuildingdoor").getEntity().setKey("alBuildingLocationKey");
    Game.getDoorController("apartmentbuildingdoor").setOpensInward(false);

    Game.addMesh(undefined, "wall", undefined,                 {x:0, y:0, z:-28});
    Game.addMesh(undefined, "wall", undefined,                 {x:2, y:0, z:-28});
    Game.addMesh(undefined, "doorway", undefined,              {x:4, y:0, z:-28});
    Game.addMesh(undefined, "wall", undefined,                 {x:6, y:0, z:-28});
    Game.addMesh(undefined, "wall", undefined,                 {x:8, y:0, z:-28});
    Game.addMesh(undefined, "wall", undefined,                 {x:10, y:0, z:-28});
    Game.addMesh(undefined, "wall", undefined,                 {x:12, y:0, z:-28});
    Game.addMesh(undefined, "wall", undefined,                 {x:14, y:0, z:-28});

    // Second Floor
    var commonsFloor01 = new BABYLON.MeshBuilder.CreateTiledGround("commonsFloor01", {xmin:0, zmin:0, xmax: 4, zmax: 14, subdivisions: {w:4, h:14}}, Game.scene);
        commonsFloor01.material = pinkCarpetMaterial;
        commonsFloor01.position.set(1, 3, -27);
    Game.createCollisionPlane(commonsFloor01);

    var commonsFloor03 = new BABYLON.MeshBuilder.CreateTiledGround("commonsFloor03", {xmin:0, zmin:0, xmax: 2, zmax: 4, subdivisions: {w:2, h:4}}, Game.scene);
        commonsFloor03.material = pinkCarpetMaterial;
        commonsFloor03.position.set(-1, 3, -27);
    Game.createCollisionPlane(commonsFloor03);
    var commonsFloor04 = new BABYLON.MeshBuilder.CreateTiledGround("commonsFloor04", {xmin:0, zmin:0, xmax: 2, zmax: 6, subdivisions: {w:2, h:6}}, Game.scene);
        commonsFloor04.material = pinkCarpetMaterial;
        commonsFloor04.position.set(-1, 3, -19);
    Game.createCollisionPlane(commonsFloor04);

    Game.createCharacter("rosie", "Rosie", undefined, "resources/images/characters/rosie.png", 14, "f", "fox", "foxF", "resources/data/foxRed.svg", undefined, {x:2, y:0, z:-19}, undefined, {x:0.7, y:0.7, z:0.7});
    Game.createCharacter("charlie", "Charlie", undefined, "resources/images/characters/charlie.svg", 28, "f", "fox", "foxF", "resources/data/foxCorsac.svg", undefined, {x:3, y:0, z:-19}, undefined, {x:0.9, y:0.9, z:0.9});
    Game.createCharacter("spider", "Spider", "A giant fucking spider!", undefined, undefined, undefined, undefined, "spider", undefined, undefined, new BABYLON.Vector3(3, 0, -16), undefined, new BABYLON.Vector3(0.05, 0.05, 0.05));
}