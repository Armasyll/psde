/*
$ let worker = new Worker("/resources/js/workers/tick.worker.js")
undefined
$ worker.addEventListener('message', function(event) {console.log(event)}, false)
undefined
$ worker.postMessage({cmd:"getTCount"})
undefined
[MessageEvent].data.{...}
*/
let currentTime = 1499088900; // Seconds, 10 digits; not milliseconds, 13 digits
let gameTimeMultiplier = 10;
let roundTime = 6 * gameTimeMultiplier;
let roundsPerTurn = 10;
let turnTime = roundTime * roundsPerTurn;
let tickInterval = null;

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
function stopFunction() {
    clearInterval(tickInterval);
}
function startFunction() {
    tickInterval = setInterval(tickFunction, 1000 / gameTimeMultiplier);
}

startFunction();
addEventListener('message', (event) => {
    switch (event.data.cmd) {
        case "getDate": {
            postMessage(new Date(currentTime * 1000));
            break;
        }
        case "getSeconds":
        case "getTimestamp": {
            postMessage(currentTime);
            break;
        }
        case "getMilliseconds":
        case "getEpoch":
        case "getUnixTimestamp": {
            postMessage(currentTime * 1000);
            break;
        }
        case "setRoundTimeInSeconds":
        case "setRoundTime": {
            let number = Number.parseInt(event.data.msg);
            if (isNaN(number) || number == roundTime) {
                break;
            }
            roundTime = number * gameTimeMultiplier;
            turnTime = roundTime * roundsPerTurn;
            break;
        }
        case "setTurnTimeInRounds":
        case "setTurnTime": {
            let number = Number.parseInt(event.data.msg);
            if (isNaN(number) || number == roundsPerTurn) {
                break;
            }
            roundsPerTurn = number;
            if (roundsPerTurn < 6) {
                roundsPerTurn = 6;
            }
            turnTime = roundTime * roundsPerTurn;
            break;
        }
        case "setGameTimeMutliplier": {
            if (!event.data.hasOwnProperty("msg")) {
                break;
            }
            let number = Number.parseInt(event.data.msg);
            if (isNaN(number) || number == gameTimeMultiplier) {
                break;
            }
            gameTimeMultiplier = number;
            if (gameTimeMultiplier < 1) {
                gameTimeMultiplier = 1;
            }
            stopFunction();
            startFunction();
            break;
        }
        case "stop": {
            stopFunction();
            break;
        }
        case "start": {
            stopFunction();
            startFunction();
            break;
        }
    };
}, false);