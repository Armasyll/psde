let gameOptions = {
    "useNative": true,
    "debugMode": true,
    "debugVerbosity": 7,
    "rootDirectory": "/home/www/psde.equus.et/html/"
};

_native.whenGraphicsReady().then(function () {
    if (typeof Worker == "function") {
        BABYLON.Tools.Log("WebWorkers implemented.")
    }
    else {
        BABYLON.Tools.Warn("WebWorkers not implemented.")
    }
    Game.initialize(gameOptions);
});
