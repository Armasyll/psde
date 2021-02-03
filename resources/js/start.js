window.document.body.onkeydown = function(e) {
    if (e.metaKey) {}
    else {
        switch (e.keyCode) {
            case 19: // Break
            case 42: // Print
            case 44: // Print Screen
            case 116: // Reload
            case 122: // Full Screen
            case 123: // Inspector
            case 999: {}
            default: {
                e.preventDefault();
            }
        }
    }
    return 0;
}
window.addEventListener('resize', function() {
    if (Game.initialized) {
        Game.resize();
    }
});
window.addEventListener("DOMContentLoaded", function() {
    let gameOptions = {};
    let url = new URL(window.location.href);
    let urlMap = new Map(url.searchParams);
    urlMap.forEach(function(val, key) {
        switch(key) {
            case "debugMode":
            case "debug": {
                gameOptions["debugMode"] = (val == "false" ? false : true);
                break;
            }
            case "debugVerbosity":
            case "debugVerbosityLevel":
            case "debugLevel": {
                gameOptions["debugVerbosity"] = Number.parseInt(val) || 2;
                break;
            }
            case "useRigidBodies": {
                gameOptions["useRigidBodies"] = (val == "false" ? false : true);
                break;
            }
            case "useTransformBodies": {
                gameOptions["useRigidBodies"] = (val == "false" ? false : true);
                break;
            }
            case "useShadows": {
                gameOptions["useShadows"] = (val == "false" ? false : true);
                break;
            }
            case "showCollisionBoxes": {
                gameOptions["showCollisionBoxes"] = (val == "true" ? true : false);
                break;
            }
            case "cell": {
                gameOptions["assumeInitialized"] = true;
                gameOptions["assumePlayerCellID"] = String(val);
                break;
            }
        }
    });
    Game.initialize(gameOptions);
});