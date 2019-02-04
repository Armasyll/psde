window.addEventListener('resize', function() {
    if (Game.initialized) {
        Game.engine.resize();
        Game.gui.resizeText();
    }
});
window.addEventListener("DOMContentLoaded", function() {
    console.log("Initializing game.");
    Game.initialize();

    Game.engine.runRenderLoop(function() {
        Game.scene.render();
        if (!Game.finishedFirstLoad()) {
            if (Game.finishedLoadingFiles()) {
                if (!Game.finishedInitializing()) {
                    if (Game.debugEnabled) console.log("Finished loading assets.");
                    Game.importProtoItems();
                    Game.importCosmetics();
                    Game._finishedInitializing = true;

                    Game.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
                        Game.functionControlOnKeyDown(evt.sourceEvent.keyCode);
                    }));
                    Game.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
                        Game.functionControlOnKeyUp(evt.sourceEvent.keyCode);
                    }));
                }
                else if (Game.finishedInitializing()) {
                    Game._finishedFirstLoad = true;
                    Client.initialize();
                    Game.gui.resizeText();
                    Game.gui.showCharacterChoiceMenu();
                }
            }
        }
    });
    Game.scene.registerBeforeRender(function() {
        if (!(Game.player instanceof CharacterController)) {
            return null;
        }
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
        Game._createBackloggedMeshes();
        Game._createBackloggedBoundingCollisions();
        Game._createBackloggedFurniture();
        Game._createBackloggedLighting();
        Game._createBackloggedDoors();
        Game._createBackloggedItems();
        Game._createBackloggedCharacters();
        Game._createBackloggedAttachments();
    })
});