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
let paused = false;

function tickFunction() {
    currentTime++;
    sendTimestamp();
    if (currentTime % 86400 == 0) {
        // new day
    }
    if (currentTime % turnTime == 0) {
        // turn
    }
    else if (currentTime % roundTime == 0) {
        // round
    }
}
function stopFunction() {
    paused = true;
    clearInterval(tickInterval);
}
function startFunction() {
    tickInterval = setInterval(tickFunction, 1000 / gameTimeMultiplier);
    paused = false;
}
function sendInfo() {
    postMessage({"cmd":"sendInfo", "msg":{"currentTime":currentTime, "gameTimeMultiplier":gameTimeMultiplier, "roundTime":roundTime, "roundsPerTurn":roundsPerTurn, "turnTime":turnTime}});
}
function sendDate() {
    postMessage({"cmd":"sendDate", "msg":new Date(currentTime * 1000)});
}
function sendTimestamp() {
    postMessage({"cmd":"sendTimestamp", "msg":currentTime});
}
function sendPaused() {
    postMessage({"cmd":"sendPaused", "msg":paused});
}

startFunction();
addEventListener('message', (event) => {
    switch (event.data.cmd) {
        case "getInfo": {
            sendInfo();
            break;
        }
        case "getDate": {
            sendDate();
            break;
        }
        case "getSeconds":
        case "getTimestamp": {
            sendTimestamp();
            break;
        }
        case "setTimestamp": {
            let number = Number.parseInt(event.data.msg);
            if (isNaN(number) || number == currentTime) {
                break;
            }
            currentTime = number;
            sendTimestamp();
        }
        case "setRoundTimeInSeconds":
        case "setRoundTime": {
            let number = Number.parseInt(event.data.msg);
            if (isNaN(number) || number == roundTime) {
                break;
            }
            if (number < 1) {
                number = 1;
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
            postMessage({"cmd":"stop"});
            break;
        }
        case "start": {
            stopFunction();
            startFunction();
            postMessage({"cmd":"start"});
            break;
        }
    };
}, false);