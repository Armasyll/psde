window.document.body.onkeydown = function(e) {
    if (!e.metaKey) {
        e.preventDefault();
    }
}
window.document.body.onkeyup = function(e) {
    if(e.keyCode == '44') {
        body.onkeydown(e);
    }
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