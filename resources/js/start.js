window.addEventListener('resize', function() {
    if (Game.initialized) {
        Game.engine.resize();
        Game.gui.resize();
    }
});
window.addEventListener("DOMContentLoaded", function() {
    console.log("Initializing game.");
    Game.initialize();
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
        }
    });
    if (Game.debugMode) {}
    else {
        Game.gui.showCharacterChoiceMenu();
    }
});