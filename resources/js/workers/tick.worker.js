/*
$ let worker = new Worker("/resources/js/workers/tick.worker.js")
undefined
$ worker.addEventListener('message', function(event) {console.log(event)}, false)
undefined
$ worker.postMessage({cmd:"getTCount"})
undefined
[MessageEvent].data.{...}
*/
let loc = {x:0.0,y:0.0,z:0.0};
let rot = {y:0.0};
let tCount = 0;

setInterval(
    function() {
        tCount++;
    },
    50
);
addEventListener('message', function(event) {
    switch (event.data.cmd) {
        case "close": {
            postMessage({"meta":{"status":200,"msg":"OK"},"response":{"cmd":"close","msg":"bye"}});
            close();
            break;
        }
        case "open": {
            loc = {x:0.0,y:0.0,z:0.0};
            rot = {y:0.0};
            break;
        }
        case "setLoc": {
            loc = event.data.msg;
            postMessage({"meta":{"status":200,"msg":"OK"},"response":{"cmd":"setLoc","msg":loc}});
            break;
        }
        case "getLoc": {
            postMessage({"meta":{"status":200,"msg":"OK"},"response":{"cmd":"getLoc","msg":loc}});
            break;
        }
        case "setRot": {
            rot = event.data.msg;
            postMessage({"meta":{"status":200,"msg":"OK"},"response":{"cmd":"setRot","msg":rot}});
            break;
        }
        case "getRot": {
            postMessage({"meta":{"status":200,"msg":"OK"},"response":{"cmd":"getRot","msg":rot}});
            break;
        }
        case "getTCount": {
            postMessage({"meta":{"status":200,"msg":"OK"},"response":{"cmd":"getTCount", "msg":tCount}});
            break;
        }
        default: {
        }
    };
}, false);