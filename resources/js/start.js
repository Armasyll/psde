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
        if (!(Game.player instanceof CharacterEntity) || !(Game.player.getController() instanceof CharacterController)) {
            return null;
        }
        Game.camera.alpha = Game.Tools.moduloRadians(Game.camera.alpha);
        if (Game.player.controller.mesh instanceof BABYLON.AbstractMesh) {
            Game.player.controller.mesh.rotation.y = Game.Tools.moduloRadians(Game.player.controller.mesh.rotation.y);
        }
        for (_entity in Game.characterControllers) {
            if (!Game.entityControllers[_entity]._isAnimated) {
                return null;
            }
            Game.entityControllers[_entity].moveAV();
            if (Game.entityControllers[_entity].propertiesChanged) {
                Game.entityControllers[_entity].updateProperties();
            }
        }
        for (_entity in Game.furnitureControllers) {
            if (!Game.entityControllers[_entity]._isAnimated) {
                return null;
            }
            Game.entityControllers[_entity].moveAV();
        }
    });
    Game.scene.registerAfterRender(function() {
        if (Game.hasBackloggedEntities) {
            Game._createBackloggedMeshes();
            Game._createBackloggedBoundingCollisions();
            Game._createBackloggedFurniture();
            Game._createBackloggedLighting();
            Game._createBackloggedDoors();
            Game._createBackloggedItems();
            Game._createBackloggedCharacters();
            Game._createBackloggedAttachments();
            if (!Game._filesToLoad) {
                Game.hasBackloggedEntities = false;
            }
        }
    });
});