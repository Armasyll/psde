let entities = new Map(); // <entity: Entity, <timestamp: Date, position: Vector3, rotation: Vector3>: array>
addEventListener('message', function(event) {
    switch (event.data.cmd) {
        case "set": {
            if (!(event.data.msg instanceof Array) || event.data.msg.length != 4 || typeof event.data.msg[0] != "string" || typeof event.data.msg[1] != "number") {
                return 2;
            }
            if (!entities.has(event.data.msg[0])) {
                entities.set(event.data.msg[0], [event.data.msg[1], event.data.msg[2], event.data.msg[3]]);
            }
            else {
                let array = entities.get(event.data.msg[0]);
                array[0] = event.data.msg[1]; // timestamp
                array[1] = event.data.msg[2]; // position
                array[2] = event.data.msg[3]; // rotation
            }
            break;
        }
        case "get": {
            postMessage(entities.get(event.data.msg));
            break;
        }
        case "has": {
            postMessage(entities.has(event.data.msg));
            break;
        }
        case "delete": {
            if (!entities.has(event.data.msg)) {
                return 1;
            }
            entities.delete(event.data.msg);
            break;
        }
        case "setLoc": {
            if (!(event.data.msg instanceof Array) || event.data.msg.length != 4) {
                return 2;
            }
            if (!entities.has(event.data.msg[0])) {
                return 1;
            }
            let array = entities.get(event.data.msg[0]);
            array[0] = event.data.msg[1];
            array[1] = event.data.msg[2];
            array[2] = event.data.msg[3];
            break;
        }
        case "getLoc": {
            postMessage(entities.get(event.data.msg)[1]);
            break;
        }
        case "setRot": {
            if (!(event.data.msg instanceof Array) || event.data.msg.length != 3) {
                return 2;
            }
            if (!entities.has(event.data.msg[0])) {
                return 1;
            }
            let array = entities.get(event.data.msg[0]);
            array[0] = event.data.msg[1];
            array[2] = event.data.msg[2];
            break;
        }
        case "getRot": {
            postMessage(entities.get(event.data.msg)[2]);
            break;
        }
        case "setLocRot": {
            if (!(event.data.msg instanceof Array) || event.data.msg.length != 4) {
                return 2;
            }
            if (!entities.has(event.data.msg[0])) {
                return 1;
            }
            let array = entities.get(event.data.msg[0]);
            array[0] = event.data.msg[1];
            array[1] = event.data.msg[2];
            array[2] = event.data.msg[3];
            break;
        }
    };
}, false);