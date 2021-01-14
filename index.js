let gameOptions = {
    "useNative": true,
    "debugMode": true,
    "debugVerbosity": 7
};

_native.whenGraphicsReady().then(function () {
    Game.initialize(gameOptions);
});
