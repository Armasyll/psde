_map = {};

function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}
function unsafeExec(_executableString = undefined, _param = undefined) {
    if (Game.debugEnabled) console.log("Running unsafeExec");
    var _return = undefined;

    fn = new Function(_executableString);
    try {
        _return = fn();
    }
    catch (err) {
        if (Game.debugEnabled) console.log(err);
    }
    
    if (_return == undefined)
        return true;
    else
        return _return;
}
function genUUIDv4() {
    var uuid = "", i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;

        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += "-"
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid.toUpperCase();
}
BABYLON.Mesh.prototype.showEllipsoid = function(scene) {

    if (!this.isEnabled()) return;

    this.refreshBoundingInfo();    

    var sphere = BABYLON.MeshBuilder.CreateSphere("elli", { 
        diameterX: this.ellipsoid.x * 2,
        diameterZ: this.ellipsoid.z * 2,
        diameterY: this.ellipsoid.y * 2
        },
    scene);

//    sphere.position = this.position.add(this.ellipsoidOffset);
    sphere.position = this.getAbsolutePosition().add(this.ellipsoidOffset);

    this.ellipsoidMesh = sphere;
    // sphere.showBoundingBox = true;
    sphere.material = new BABYLON.StandardMaterial("collider", scene);
    sphere.material.wireframe = true;
    sphere.material.diffuseColor = BABYLON.Color3.Yellow();

    // special barrel ellipsoid checks
    if (this.name == "barrel" || this.name == "barrel2") {
        sphere.material.diffuseColor = BABYLON.Color3.Green();
        console.log("barrel.ellipsoid: ", this.ellipsoid)
        var sbb = sphere.getBoundingInfo().boundingBox;
        console.log("barrel sphere bb.maximum.scale(2): ", sbb.maximum.scale(2));
    }

    sphere.visibility = .1;
}

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
                        _animationRange[_i].to--;
                    }
                }

                generateApartmentScene();
                Game.initPlayer("foxM", 1);
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

    Game.scene.registerBeforeRender(function() {
        if (!(Game.player instanceof CharacterController))
            return null;
        for (_character in Game.entityControllers) {
            if (Game.entityControllers[_character] instanceof CharacterController) {
                Game.entityControllers[_character].moveAV();
            }
        }
    });
});

/*window.addEventListener("click", function (e) {
    var canvas = document.getElementById("canvas");
    canvas.requestPointerLock = canvas.requestPointerLock ||
            canvas.mozRequestPointerLock ||
            canvas.webkitRequestPointerLock;

    // Ask the browser to lock the pointer)
    canvas.requestPointerLock();
    Game.engine.isPointerLock = true;
    e.preventDefault();
    switch (e.which) {
        case 0 :
            break;
        case 1 : { // leftClick
            break;
        }
        case 2 : { // middleClick
            //var _pickResult = Game.scene.pick(Game.scene.pointerX, Game.scene.pointerY);
            var _pickResult = Game.scene.pick(Game.canvas.width / 2, Game.canvas.height / 2);

            if (Game.currentSelectedMesh != undefined && Game.currentSelectedMesh.showBoundingBox)
                Game.currentSelectedMesh.showBoundingBox = false;

            if (_pickResult.pickedMesh != Game.currentSelectedMesh) {
                Game.previousSelectedMesh = Game.currentSelectedMesh;
                Game.currentSelectedMesh = _pickResult.pickedMesh;
                Game.currentSelectedMesh.showBoundingBox = !(Game.currentSelectedMesh.showBoundingBox);
            }
            else {
                Game.previousSelectedMesh = Game.currentSelectedMesh;
                Game.currentSelectedMesh = undefined;
                Game.gui.removeControl(Game.gui._rootContainer.getChildByName("selectedMeshLabel"));
                Game.gui.removeControl(Game.gui._rootContainer.getChildByName("selectedMeshText"));
                Game.gui.removeControl(Game.gui._rootContainer.getChildByName("selectedMeshLine"));
            Game.gui.removeControl(Game.gui._rootContainer.getChildByName("selectedMeshOrigin"));
                return undefined;
            }

            Game.gui.removeControl(Game.gui._rootContainer.getChildByName("selectedMeshLabel"));
            Game.gui.removeControl(Game.gui._rootContainer.getChildByName("selectedMeshText"));
            Game.gui.removeControl(Game.gui._rootContainer.getChildByName("selectedMeshLine"));
            Game.gui.removeControl(Game.gui._rootContainer.getChildByName("selectedMeshOrigin"));

            var labelText = new BABYLON.GUI.TextBlock("selectedMeshText");
            var label = new BABYLON.GUI.Rectangle("selectedMeshLabel");
            var labelLine = new BABYLON.GUI.Line("selectedMeshLine");
            var labelLineStart = new BABYLON.GUI.Ellipse("selectedMeshOrigin");

            label.background = "black"
            label.height = "30px";
            label.alpha = 0.5;
            label.width = "200px";
            label.cornerRadius = 20;
            label.thickness = 1;
            label.linkOffsetY = 30;
            label.top = "10%";
            label.zIndex = 5;
            label.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            Game.gui.addControl(label);

            labelText.text = Game.currentSelectedMesh.name;
            labelText.color = "white";
            label.addControl(labelText);

            labelLine.alpha = 0.5;
            labelLine.lineWidth = 5;
            labelLine.dash = [5, 10];
            Game.gui.addControl(labelLine);
            labelLine.linkWithMesh(Game.currentSelectedMesh);
            labelLine.connectedControl = label;

            labelLineStart.width = "10px";
            labelLineStart.background = "black";
            labelLineStart.height = "10px";
            labelLineStart.color = "white";
            Game.gui.addControl(labelLineStart);
            labelLineStart.linkWithMesh(Game.currentSelectedMesh);
            break;
        }
        case 3 : { // rightClick
            // Setting `dom.event.contextmenu.enabled` to `true` in firefox
            var _pickResult = Game.scene.pick(Game.scene.pointerX, Game.scene.pointerY);
            //var _pickResult = Game.scene.pick(document.getElementById("canvas").width/2, document.getElementById("canvas").height/2);

            if (Game.currentSelectedMesh != undefined && Game.currentSelectedMesh.showBoundingBox)
                Game.currentSelectedMesh.showBoundingBox = false;

            Game.contextMenu(Game.currentSelectedMesh);
            break;
        }
    }
});*/
/*window.addEventListener("keypress", function(e) {
    e.preventDefault();
    switch (e.which) {
        case 96 : Game.controlsDebug(); break;
    }
});*/


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
        Game.addCollisionPlane({x:-512, z:-512}, {x:512, z:512}, -0.075);
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

    Game.addCollisionWall({x:-1, y:0, z:1}, {x:15, y:0, z:1}); // Back floor wall
    Game.addCollisionWall({x:-1, y:0, z:1}, {x:-1, y:0, z:-27}); // Left floor wall
    Game.addCollisionWall({x:15, y:0, z:1}, {x:15, y:0, z:-27}); // Right floor wall
    Game.addCollisionWall({x:-1, y:0, z:-27}, {x:3, y:0, z:-27}); // Front floor wall, left
    Game.addCollisionWall({x:5, y:0, z:-27}, {x:15, y:0, z:-27}); // Front floor wall, right

    Game.addCollisionWall({x:9, y:0, z:1}, {x:9, y:0, z:-5}); // Side wall between Ozzy's bathroom and Landlord's apartment
    Game.addCollisionWall({x:5, y:0, z:-1}, {x:5, y:0, z:-7}); // Side wall between Ozzy's apartment and Landlord's bathroom
    Game.addCollisionWall({x:7, y:0, z:-7}, {x:7, y:0, z:-13}); // Side wall between Ozzy's and Landord's kitchenettes

    Game.addCollisionWall({x:5, y:0, z:-3}, {x:9, y:0, z:-3}); // Front wall between Ozzy's and Landlord's bathrooms
    Game.addCollisionWall({x:5, y:0, z:-7}, {x:9, y:0, z:-7}); // Front wall between Landlord's bathroom and Landlord's and Ozzy's kitchenettes
    Game.addCollisionWall({x:5, y:0, z:-13}, {x:9, y:0, z:-13}); // Front wall between Landlord's kitchenette and Landlord's entrance

    Game.addCollisionWall({x:-1, y:0, z:-13}, {x:3, y:0, z:-13}); // Front wall between Commons and Ozzy's apartment
    Game.addCollisionWall({x:5, y:0, z:-13}, {x:5, y:0, z:-15}); // Side wall between Commons and Landlord's apartment
    Game.addCollisionWall({x:5, y:0, z:-17}, {x:15, y:0, z:-17}); // Front wall between Commons and Landlord's apartment

    Game.addCollisionWall({x:5, y:0, z:-25}, {x:5, y:0, z:-27}); // Side wall between Commons and building entrance

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
    Game.addMesh(undefined, "door",                 {x:6, y:0, z:-16}, {x:0, y:-90, z:0});
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
    Game.addItemMesh("knifeInstance01", "knife", undefined, {x:10, y:2, z:-22});
    Game.addItemMesh("crossInstance01", "cross", undefined, {x:10, y:2, z:-22});
    Game.addItemMesh("planeInstance01", "plate", undefined, {x:9.7, y:2, z:-22});
    Game.addItemMesh("plateInstance02", "plate", undefined, {x:10.3, y:2, z:-22});
    Game.addItemMesh("packstreet23StrangeNewDay", "bookHardcoverClosed01", undefined, {x:10.3, y:1, z:-23}, {x:0, y:180, z:0});

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

    Game.createCharacter("rosie", "Rosie", 14, "f", "fox", undefined, undefined, {x:2, y:0, z:-19}, undefined, {x:0.7, y:0.7, z:0.7});
    Game.createCharacter("charlie", "Charlie", 28, "f", "fox", "foxCorsac.png", undefined, {x:3, y:0, z:-19}, undefined, {x:0.9, y:0.9, z:0.9});
}