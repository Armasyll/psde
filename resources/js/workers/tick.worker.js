/*
$ let worker = new Worker("/resources/js/workers/tick.worker.js")
undefined
$ worker.addEventListener('message', function(event) {console.log(event)}, false)
undefined
$ worker.postMessage({cmd:"getTCount"})
undefined
[MessageEvent].data.{...}
*/
let currentTime = 1499088900;
let gameTimeMultiplier = 10;
let roundTime = 6 * gameTimeMultiplier;
let turnTime = 60 * gameTimeMultiplier;

function tickFunction() {
    currentTime++;
    if (currentTime % 86400 == 0) {
        postMessage("newDay");
    }
    if (currentTime % turnTime == 0) {
        postMessage("turn");
    }
    else if (currentTime % roundTime == 0) {
        postMessage("round");
    }
}
let tickInterval = setInterval(tickFunction, 1000 / gameTimeMultiplier);
addEventListener('message', function(event) {
    switch (event.data.cmd) {
        case "getDate": {
            postMessage(new Date(currentTime * 1000));
            break;
        }
        case "getEpoch":
        case "getUnixTimestamp": {
            postMessage(currentTime * 1000);
            break;
        }
        case "setGameTimeMutliplier": {
            if (!event.data.hasOwnProperty("msg") || typeof event.data.msg != "array" || isNaN(event.data.msg[0])) {
                break;
            }
            if (event.data.msg[0] == gameTimeMultiplier) {
                break;
            }
            gameTimeMultiplier = event.data.msg[0];
            clearInterval(tickInterval);
            tickInterval = setInterval(tickFunction, 1000 / gameTimeMultiplier);
        }
    };
}, false);