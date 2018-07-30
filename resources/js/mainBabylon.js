_map = {};

window.addEventListener('resize', function(){
    Game.engine.resize();
});
window.addEventListener("DOMContentLoaded", function() {
    if (Game.debugEnabled) console.log("Initializing game.");
    Game.initialize();

    Game.engine.runRenderLoop(function() {
        Game.scene.render();
        if (!Game._finishedLoading) {
            if (Game._loadedFurniture && Game._loadedSurfaces && Game._loadedCharacters && Game._loadedItems && Game.initialized && GameGUI.initialized) {
                if (Game.debugEnabled) console.log("Finished loading assets.");

                var _character = Game.characterMeshes["foxSkeletonN"];
                var _animationRange = _character.skeleton.getAnimationRanges();
                for (var _i = 0; _i < _animationRange.length; _i++) {
                    if (_animationRange[_i].to - _animationRange[_i].from > 2) {
                        _animationRange[_i].from += 1;
                        _animationRange[_i].to -= 1;
                    }
                }

                generateApartmentScene();
                Game.initPlayer();
                Game._finishedLoading = true;

                Game.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
                    Game.controlCharacterOnKeyDown(evt.sourceEvent.keyCode);
                }));
                Game.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
                    Game.controlCharacterOnKeyUp(evt.sourceEvent.keyCode);
                }));

                Client.initialize();
                GameGUI.showMainMenu();
            }
        }
    });
    var _rbrCount = 0;
    Game.scene.registerBeforeRender(function() {
        if (!(Game.player instanceof CharacterController))
            return null;
        for (_character in Game.entityControllers) {
            if (Game.entityControllers[_character] instanceof CharacterController) {
                Game.entityControllers[_character].moveAV();
            }
            if (_character.propertiesChanged) {
                _character.updateProperties();
            }
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

function generateApartmentScene() {
    if (Game.debugEnabled) console.log("Running generateApartmentScene");
    if (Game.physicsEnabled) {
        var _ground = BABYLON.Mesh.CreateGround("ground", 1024,  1024, 1, Game.scene);
        _ground.material = new BABYLON.Material();
        _ground.position.y = 0.0;
        _ground.material.alpha = 0;
        Game.assignPlanePhysicsToMesh(_ground);
    }
    else {
        Game.createCollisionPlane({x:-512, z:-512}, {x:512, z:512}, -0.075);
    }

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

    var floorMaterial = new BABYLON.StandardMaterial("floorMaterial", Game.scene);
    floorMaterial.diffuseTexture = new BABYLON.Texture("resources/data/rug.png", Game.scene);
    floorMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    var floorMesh = new BABYLON.MeshBuilder.CreateTiledGround("floorMesh", {xmin:0.0125, zmin:-26, xmax: 16, zmax: 2, subdivisions: {w:8, h:12}}, Game.scene);
    floorMesh.material = floorMaterial;
    floorMesh.position.y = -0.0025;
    floorMesh.position.x -= 1;
    floorMesh.position.z -= 1;
    if (Game.debugEnabled) console.log(floorMesh.getBoundingInfo().boundingBox);

    var ceilingMaterial = new BABYLON.StandardMaterial("ceilingMaterial", Game.scene);
    ceilingMaterial.diffuseTexture = new BABYLON.Texture("resources/data/wall.png", Game.scene);
    ceilingMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ceilingMaterial.backFaceCulling = false;
    var ceilingMesh = new BABYLON.MeshBuilder.CreateTiledGround("ceilingMesh", {xmin:0.0125, zmin:-26, xmax: 16, zmax: 2, subdivisions: {w:8, h:12}}, Game.scene);
    ceilingMesh.material = ceilingMaterial;
    ceilingMesh.position.y = 3;
    ceilingMesh.position.x -= 1;
    ceilingMesh.position.z -= 1;

    Game.createCollisionWall({x:-1, y:0, z:1}, {x:15, y:0, z:1}); // Back floor wall
    Game.createCollisionWall({x:-1, y:0, z:1}, {x:-1, y:0, z:-27}); // Left floor wall
    Game.createCollisionWall({x:15, y:0, z:1}, {x:15, y:0, z:-27}); // Right floor wall
    Game.createCollisionWall({x:-1, y:0, z:-27}, {x:3, y:0, z:-27}); // Front floor wall, left
    Game.createCollisionWall({x:5, y:0, z:-27}, {x:15, y:0, z:-27}); // Front floor wall, right

    Game.createCollisionWall({x:9, y:0, z:1}, {x:9, y:0, z:-5}); // Side wall between Ozzy's bathroom and Landlord's apartment
    Game.createCollisionWall({x:5, y:0, z:-1}, {x:5, y:0, z:-7}); // Side wall between Ozzy's apartment and Landlord's bathroom
    Game.createCollisionWall({x:7, y:0, z:-7}, {x:7, y:0, z:-13}); // Side wall between Ozzy's and Landord's kitchenettes

    Game.createCollisionWall({x:5, y:0, z:-3}, {x:9, y:0, z:-3}); // Front wall between Ozzy's and Landlord's bathrooms
    Game.createCollisionWall({x:5, y:0, z:-7}, {x:9, y:0, z:-7}); // Front wall between Landlord's bathroom and Landlord's and Ozzy's kitchenettes
    Game.createCollisionWall({x:5, y:0, z:-13}, {x:9, y:0, z:-13}); // Front wall between Landlord's kitchenette and Landlord's entrance

    Game.createCollisionWall({x:-1, y:0, z:-13}, {x:3, y:0, z:-13}); // Front wall between Commons and Ozzy's apartment
    Game.createCollisionWall({x:5, y:0, z:-13}, {x:5, y:0, z:-15}); // Side wall between Commons and Landlord's apartment
    Game.createCollisionWall({x:5, y:0, z:-17}, {x:15, y:0, z:-17}); // Front wall between Commons and Landlord's apartment

    Game.createCollisionRamp({x:0, y:0, z:-22}, {x:3, y:3, z:-17});

    Game.createCollisionWall({x:5, y:0, z:-25}, {x:5, y:0, z:-27}); // Side wall between Commons and building entrance

    Game.addMesh(undefined, "floorWoodDark",        {x:0, y:0, z:0});
    Game.addMesh(undefined, "floorWoodDark",        {x:2, y:0, z:0});
    Game.addMesh(undefined, "floorWoodDark",        {x:4, y:0, z:0});
    Game.addMesh(undefined, "frontWallLeftWall",    {x:0, y:0, z:0});
    Game.addMesh(undefined, "wall",                 {x:2, y:0, z:0});
    Game.addMesh(undefined, "frontDoorLeftWall",    {x:4, y:0, z:0}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "frontWallLeftDoor",    {x:6, y:0, z:0});
    Game.addMesh(undefined, "floorLinoleum",        {x:6, y:0, z:0});
    Game.addMesh(undefined, "frontWallLeftWall",    {x:8, y:0, z:0}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "floorLinoleum",        {x:8, y:0, z:0});
    Game.addMesh(undefined, "frontWallLeftWall",    {x:10, y:0, z:0});
    Game.addMesh(undefined, "wall",                 {x:12, y:0, z:0});
    Game.addMesh(undefined, "frontWallLeftWall",    {x:14, y:0, z:0}, {x:0, y:90, z:0});

    Game.addMesh(undefined, "floorWoodDark",        {x:0, y:0, z:-2});
    Game.addMesh(undefined, "floorWoodDark",        {x:2, y:0, z:-2});
    Game.addMesh(undefined, "floorWoodDark",        {x:4, y:0, z:-2});
    Game.addMesh(undefined, "wall",                 {x:0, y:0, z:-2}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall",                 {x:4, y:0, z:-2}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "frontWallLeftWall",    {x:6, y:0, z:-2}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "floorLinoleum",        {x:6, y:0, z:-2});
    Game.addMesh(undefined, "frontWallLeftWall",    {x:8, y:0, z:-2}, {x:0, y:-180, z:0});
    Game.addMesh(undefined, "floorLinoleum",        {x:8, y:0, z:-2});
    Game.addMesh(undefined, "wall",                 {x:10, y:0, z:-2}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall",                 {x:14, y:0, z:-2}, {x:0, y:90, z:0});

    Game.addMesh(undefined, "floorWoodDark",        {x:0, y:0, z:-4});
    Game.addMesh(undefined, "floorWoodDark",        {x:2, y:0, z:-4});
    Game.addMesh(undefined, "floorWoodDark",        {x:4, y:0, z:-4});
    Game.addMesh(undefined, "wall",                 {x:0, y:0, z:-4}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall",                 {x:4, y:0, z:-4}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "frontWallLeftWall",    {x:6, y:0, z:-4});
    Game.addMesh(undefined, "floorLinoleum",        {x:6, y:0, z:-4});
    Game.addMesh(undefined, "frontWallLeftWall",    {x:8, y:0, z:-4}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "floorLinoleum",        {x:8, y:0, z:-4});
    Game.addMesh(undefined, "wall",                 {x:10, y:0, z:-4}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall",                 {x:14, y:0, z:-4}, {x:0, y:90, z:0});

    Game.addMesh(undefined, "floorWoodDark",        {x:0, y:0, z:-6});
    Game.addMesh(undefined, "floorWoodDark",        {x:2, y:0, z:-6});
    Game.addMesh(undefined, "floorWoodDark",        {x:4, y:0, z:-6});
    Game.addMesh(undefined, "wall",                 {x:0, y:0, z:-6}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall",                 {x:4, y:0, z:-6}, {x:0, y:90, z:0});
    Game.addFurnitureMesh("bookShelfThinInstance01", "bookshelfThin", undefined,      {x:4, y:0, z:-6}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "frontWallLeftWall",    {x:6, y:0, z:-6}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "floorLinoleum",        {x:6, y:0, z:-6});
    Game.addMesh(undefined, "frontWallLeftDoor",    {x:8, y:0, z:-6}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "floorLinoleum",        {x:8, y:0, z:-6});
    Game.addMesh(undefined, "doorway",              {x:10, y:0, z:-6}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall",                 {x:14, y:0, z:-6}, {x:0, y:90, z:0});

    Game.addMesh(undefined, "floorWoodDark",        {x:0, y:0, z:-8});
    Game.addMesh(undefined, "floorWoodDark",        {x:2, y:0, z:-8});
    Game.addMesh(undefined, "floorWoodDark",        {x:4, y:0, z:-8});
    Game.addMesh(undefined, "floorWoodDark",        {x:6, y:0, z:-8});
    Game.addMesh(undefined, "wall",                 {x:0, y:0, z:-8}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "corner",               {x:4, y:0, z:-8}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "frontWallLeftWall",    {x:6, y:0, z:-8}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "refrigerator",         {x:6, y:0, z:-8}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "frontWallLeftWall",    {x:8, y:0, z:-8});
    Game.addMesh(undefined, "corner",               {x:10, y:0, z:-8});
    Game.addMesh(undefined, "wall",                 {x:14, y:0, z:-8}, {x:0, y:90, z:0});

    Game.addMesh(undefined, "floorWoodDark",        {x:0, y:0, z:-10});
    Game.addMesh(undefined, "floorWoodDark",        {x:2, y:0, z:-10});
    Game.addMesh(undefined, "floorWoodDark",        {x:4, y:0, z:-10});
    Game.addMesh(undefined, "floorWoodDark",        {x:6, y:0, z:-10});
    Game.addMesh(undefined, "wall",                 {x:0, y:0, z:-10}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall",                 {x:6, y:0, z:-10}, {x:0, y:90, z:0});
    Game.addFurnitureMesh("trashBagFullInstance01", "trashBagFull", {mass:4.5}, {x:6.4, y:0, z:-9.8});
    Game.addFurnitureMesh("trashCanInstance01", "trashCan", {mass:4.0}, {x:5.8, y:0, z:-10.2});
    Game.addFurnitureMesh("trashBagFullInstance02", "trashBagFull", {mass:4.0}, {x:6.5, y:0, z:-10.6}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "wall",                 {x:8, y:0, z:-10}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall",                 {x:14, y:0, z:-10}, {x:0, y:90, z:0});

    Game.addMesh(undefined, "floorWoodDark",        {x:0, y:0, z:-12});
    Game.addMesh(undefined, "floorWoodDark",        {x:2, y:0, z:-12});
    Game.addMesh(undefined, "floorWoodDark",        {x:4, y:0, z:-12});
    Game.addMesh(undefined, "floorWoodDark",        {x:6, y:0, z:-12});
    Game.addMesh(undefined, "frontWallLeftWall",    {x:0, y:0, z:-12}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall",                 {x:2, y:0, z:-12}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "doorway",              {x:4, y:0, z:-12}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "frontWallLeftWall",    {x:6, y:0, z:-12}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "frontWallLeftWall",    {x:8, y:0, z:-12}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "corner",               {x:10, y:0, z:-12}, {x:0, y:270, z:0});
    Game.addMesh(undefined, "wall",                 {x:14, y:0, z:-12}, {x:0, y:90, z:0});

    Game.createDoor("ozzyapartmentdoor", "Ozzy's Apartment", undefined, "door", undefined, undefined, {x:4, y:0, z:-13}, {x:0, y:0, z:0});

    Game.addMesh(undefined, "frontWallLeftWall",    {x:0, y:0, z:-14});
    Game.addMesh(undefined, "wall",                 {x:2, y:0, z:-14});
    Game.addMesh(undefined, "frontWallLeftDoor",    {x:4, y:0, z:-14}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "frontWallLeftWall",    {x:6, y:0, z:-14});
    Game.addMesh(undefined, "wall",                 {x:8, y:0, z:-14});
    Game.addMesh(undefined, "corner",               {x:10, y:0, z:-14});
    Game.addMesh(undefined, "wall",                 {x:14, y:0, z:-14}, {x:0, y:90, z:0});

    Game.addMesh(undefined, "wall",                 {x:0, y:0, z:-16}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "doorway",              {x:4, y:0, z:-16}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "frontDoorLeftWall",    {x:6, y:0, z:-16}, {x:0, y:-90, z:0});
    Game.createDoor("landlordapartmentdoor", "Landlord's Apartment", undefined, "door", undefined, undefined, {x:5, y:0, z:-16}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "wall",                 {x:8, y:0, z:-16}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "wall",                 {x:10, y:0, z:-16}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "wall",                 {x:12, y:0, z:-16}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "frontWallLeftWall",    {x:14, y:0, z:-16}, {x:0, y:180, z:0});

    Game.addMesh(undefined, "wall",                 {x:0, y:0, z:-18}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "corner",               {x:4, y:0, z:-18}, {x:0, y:90, z:0});
    Game.addMesh(undefined, "wall",                 {x:6, y:0, z:-18});
    Game.addMesh(undefined, "wall",                 {x:8, y:0, z:-18});
    Game.addMesh(undefined, "wall",                 {x:10, y:0, z:-18});
    Game.addMesh(undefined, "wall",                 {x:12, y:0, z:-18});
    Game.addMesh(undefined, "frontWallLeftWall",    {x:14, y:0, z:-18}, {x:0, y:90, z:0});

    Game.addMesh(undefined, "wall",                 {x:0, y:0, z:-20}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall",                 {x:14, y:0, z:-20}, {x:0, y:90, z:0});

    Game.addMesh(undefined, "wall",                 {x:0, y:0, z:-22}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall",                 {x:14, y:0, z:-22}, {x:0, y:90, z:0});
    Game.addFurnitureMesh("tableInstance01", "diningTable", {mass:25,restitution:0.1}, {x:10, y:0, z:-22});
    Game.addItemMesh("knifeInstance01", "knife", undefined, {x:9.5, y:0.9, z:-22.5}, {x:180, y:0, z:0});
    Game.addItemMesh("crossInstance01", "cross", undefined, {x:10, y:0.6, z:-22});
    Game.addItemMesh("planeInstance01", "plate", undefined, {x:9.7, y:0.6, z:-21.5});
    Game.addItemMesh("plateInstance02", "plate", undefined, {x:10.3, y:0.6, z:-23});

    Game.createItem("packstreet23StrangeNewDay", Game.createProtoItem("packstreet23StrangeNewDay", "Pack Street Chapter 23", "", "book", "bookHardcoverClosed01"), undefined, {x:10.3, y:0.8, z:-21}, {x:0, y:180, z:0});

    Game.addMesh(undefined, "wall",                 {x:0, y:0, z:-24}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "corner",               {x:4, y:0, z:-24}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "corner",               {x:6, y:0, z:-24}, {x:0, y:270, z:0});
    Game.addMesh(undefined, "wall",                 {x:14, y:0, z:-24}, {x:0, y:90, z:0});

    Game.addMesh(undefined, "frontWallLeftWall",    {x:0, y:0, z:-26}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall",                 {x:2, y:0, z:-26}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "frontDoorLeftWall",    {x:4, y:0, z:-26}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "frontWallLeftWall",    {x:6, y:0, z:-26}, {x:0, y:-90, z:0});
    Game.addMesh(undefined, "wall",                 {x:8, y:0, z:-26}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "wall",                 {x:10, y:0, z:-26}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "wall",                 {x:12, y:0, z:-26}, {x:0, y:180, z:0});
    Game.addMesh(undefined, "frontWallLeftWall",    {x:14, y:0, z:-26}, {x:0, y:180, z:0});

    Game.addMesh(undefined, "wall",                 {x:0, y:0, z:-28});
    Game.addMesh(undefined, "wall",                 {x:2, y:0, z:-28});
    Game.addMesh(undefined, "doorway",              {x:4, y:0, z:-28});
    Game.addMesh(undefined, "wall",                 {x:6, y:0, z:-28});
    Game.addMesh(undefined, "wall",                 {x:8, y:0, z:-28});
    Game.addMesh(undefined, "wall",                 {x:10, y:0, z:-28});
    Game.addMesh(undefined, "wall",                 {x:12, y:0, z:-28});
    Game.addMesh(undefined, "wall",                 {x:14, y:0, z:-28});

    Game.createCharacter("rosie", "Rosie", 14, "f", "fox", undefined, undefined, undefined, {x:2, y:0, z:-19}, undefined, {x:0.7, y:0.7, z:0.7});
    Game.createCharacter("charlie", "Charlie", 28, "f", "fox", "foxF", "foxCorsac", undefined, {x:3, y:0, z:-19}, undefined, {x:0.9, y:0.9, z:0.9});
}