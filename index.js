let gameOptions = {
    "useNative": true,
    "debugMode": true,
    "debugVerbosity": 7,
    "rootDirectory": "/home/www/psde.equus.et/html/"
};

_native.whenGraphicsReady().then(function () {
    console.log(typeof Worker == "function");
    //Game.initialize(gameOptions);
});
