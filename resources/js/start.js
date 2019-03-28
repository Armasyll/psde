window.addEventListener('resize', function() {
    if (Game.initialized) {
        Game.engine.resize();
        Game.gui.resizeText();
    }
});
window.addEventListener("DOMContentLoaded", function() {
    console.log("Initializing game.");
    Game.initialize();
    Game.engine.runRenderLoop(Game.renderLoopFunction);
    Game.scene.registerBeforeRender(Game.beforeRenderFunction);
    Game.scene.registerAfterRender(Game.afterRenderFunction);
});