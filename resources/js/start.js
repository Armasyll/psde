window.document.body.onkeydown = (e) => {
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
    urlMap.forEach((val, key) => {
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
            case "meatyThwack": {
                gameOptions["meatyThwack"] = true;
                break;
            }
            default: {
                let skip = false;
                switch (typeof val) {
                    case "string": {
                        if (val == "false") {
                            val = false;
                        }
                        else if (val == "true") {
                            val = true;
                        }
                        else if (!isNaN(Number.parseFloat(val))) {
                            val = Number.parseFloat(val);
                        }
                        else if (String(val).length > 0) {
                            val = String(val).replace(/[^a-zA-Z0-9]/, '').slice(0, 64);
                        }
                        else {
                            skip = true;
                        }
                        break;
                    }
                    case "number":
                    case "boolean": {
                    }
                    default: {
                        skip = true;
                    }
                }
                if (!skip) {
                    gameOptions[String(key).replace(/[^a-zA-Z0-9]/, '').slice(0, 64)] = val;
                }
            }
        }
    });
    Game.initialize(gameOptions);
});