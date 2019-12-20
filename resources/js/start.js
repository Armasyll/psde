window.addEventListener('resize', function() {
    if (Game.initialized) {
        Game.engine.resize();
        Game.gui.resize();
    }
});
window.addEventListener("DOMContentLoaded", function() {
    console.log("Initializing game.");
    Game.initialize();
    Game.gui.showCharacterChoiceMenu();
    let url = new URL(window.location.href);
    let urlMap = new Map(url.searchParams);
    urlMap.forEach(function(val, key) {
        switch(key) {
            case "debug": {
                Game.debugMode = true;
                break;
            }
            case "showCollisionBoxes": {
                Game.getLoadedMaterial("collisionMaterial").dispose();
                Game.setLoadedMaterial("collisionMaterial", new BABYLON.StandardMaterial("collisionMaterial", Game.scene));
            }
            case "tgm": {
                Game.toggleGodMode();
                break;
            }
            case "useRigidBodies": {
                Game.useRigidBodies = true;
                break;
            }
            case "debugMovement": {
                if (!(Game.player instanceof AbstractEntity)) {
                    Game.debugMovementScene();
                    Game.createPlayer("00000000-0000-0000-0000-000000000000", "Player", undefined, undefined, CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FOX, SexEnum.MALE, 18, "foxM", "foxRed", new BABYLON.Vector3(3, 0, -17), undefined, undefined, {eyes:EyeEnum.CIRCLE, eyesColour:"green"});
                }
                GameGUI.hideCharacterChoiceMenu(false);
                GameGUI.hideMenu(false);
                GameGUI.hideHUD(false);
                GameGUI.lock();
            }
        }
    });
});