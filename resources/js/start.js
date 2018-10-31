window.addEventListener('resize', function(){
    Game.engine.resize();
    GameGUI.resizeText();
});
window.addEventListener("DOMContentLoaded", function() {
    console.log("Initializing game.");
    Game.initialize();

    Game.engine.runRenderLoop(function() {
        Game.scene.render();
        if (!Game.finishedFirstLoad()) {
            if (!Game.finishedInitializing() && Game.finishedLoadingFiles()) {
                if (Game.debugEnabled) console.log("Finished loading assets.");

                Game.loadDefaultTextures();
                Game.loadDefaultMaterials();
                Game.loadDefaultMeshes();
                Game.importProtoItems();
                Game._finishedInitializing = true;

                Game.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
                    Game.controlCharacterOnKeyDown(evt.sourceEvent.keyCode);
                }));
                Game.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
                    Game.controlCharacterOnKeyUp(evt.sourceEvent.keyCode);
                }));
            }
            else if (Game.finishedInitializing() && Game.finishedLoadingFiles()) {
                Game._finishedFirstLoad = true;
                Client.initialize();
                GameGUI.resizeText();
                GameGUI.showCharacterChoiceMenu();
            }
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