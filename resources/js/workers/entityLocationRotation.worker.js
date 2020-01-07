importScripts("../../../vendors/babylonjs/babylon.js", "../Overrides.js");
class SimpleEntityController {
    constructor(id, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), timestamp = 0) {
        this.id = id;
        this.position = BABYLON.Vector3.Zero();
        this.setPosition(position);
        this.rotation = BABYLON.Vector3.Zero();
        this.setRotation(rotation);
        this.timestamp = timestamp;
        this.locked = false;
        this.enabled = true;
        SimpleEntityController.set(this.id, this);
    }
    setPosition(position) {
        if (!(position instanceof BABYLON.Vector3)) {
            if (typeof position == "array" && array.length == 3 && typeof array[2] == "number") {
                position = BABYLON.Vector3.FromArray(position);
            }
            else {
                position = BABYLON.Vector3.Zero();
            }
        }
        this.position.copyFrom(position);
        return 0;
    }
    getPosition() {
        return this.position;
    }
    setRotation(rotation) {
        if (!(rotation instanceof BABYLON.Vector3)) {
            if (typeof rotation == "array" && array.length == 3 && typeof array[2] == "number") {
                rotation = BABYLON.Vector3.FromArray(rotation);
            }
            else {
                rotation = BABYLON.Vector3.Zero();
            }
        }
        this.rotation.copyFrom(rotation);
        return 0;
    }
    getRotation() {
        return this.rotation;
    }
    setTimestamp(timestamp) {
        this.timestamp = timestamp;
    }
    getTimestamp() {
        return this.timestamp;
    }

    dispose() {
        this.locked = true;
        this.enabled = false;
        SimpleEntityController.remove(this.id);
        this.position.dispose();
        this.rotation.dispose();
    }
    static initialize() {
        SimpleEntityController.simpleEntityControllerList = new Map();
    }
    static set(id, simpleEntityController) {
        SimpleEntityController.simpleEntityControllerList.set(id, simpleEntityController)
        return 0;
    }
    static get(id) {
        return SimpleEntityController.simpleEntityControllerList.get(id);
    }
    static has(id) {
        return SimpleEntityController.simpleEntityControllerList.has(id);
    }
    static list() {
        return SimpleEntityController.simpleEntityControllerList;
    }
    static remove(id) {
        SimpleEntityController.simpleEntityControllerList.delete(id);
    }
}
SimpleEntityController.initialize();
let player = null;
let entityRadiusToPlayerLimit = 25.0;
let entitiesEnabledByRadius = new Set();
let entitiesDisabledByRadius = new Set();
let entitiesProcessingByRadius = new Set();
function entityToggler() {
    if (player == null) {
        return 1;
    }
    SimpleEntityController.list().forEach((simpleEntityController, id) => {
        if (entitiesProcessingByRadius.has(id)) {
            return 1;
        }
        entitiesProcessingByRadius.add(id);
        if (player.position.equalsWithEpsilon(simpleEntityController.position, entityRadiusToPlayerLimit)) {
            entitiesDisabledByRadius.delete(id);
            entitiesEnabledByRadius.add(id);
            if (!simpleEntityController.enabled) {
                simpleEntityController.enabled = true;
                postMessage({0:0, 1:id});
            }
        }
        else {
            entitiesEnabledByRadius.delete(id);
            entitiesDisabledByRadius.add(id);
            if (simpleEntityController.enabled) {
                simpleEntityController.enabled = false;
                postMessage({0:1, 1:id});
            }
        }
        entitiesProcessingByRadius.delete(id);
    });
}
addEventListener('message', function(event) {
    switch (event.data.cmd) {
        case "toggleEntities": {
            entityToggler();
            break;
        }
        case "set": {
            if (!(event.data.msg instanceof Array) || event.data.msg.length != 4 || typeof event.data.msg[0] != "string" || typeof event.data.msg[1] != "number") {
                return 2;
            }
            if (!SimpleEntityController.has(event.data.msg[0])) {
                new SimpleEntityController(event.data.msg[0], BABYLON.Vector3.FromArray(event.data.msg[2]), BABYLON.Vector3.FromArray(event.data.msg[3]), event.data.msg[1]);
            }
            else {
                let entity = SimpleEntityController.get(event.data.msg[0]);
                entity.setTimestamp(event.data.msg[1]);
                entity.setPosition(BABYLON.Vector3.FromArray(event.data.msg[2]));
                entity.setRotation(BABYLON.Vector3.FromArray(event.data.msg[3]));
            }
            break;
        }
        case "remove":
        case "delete": {
            if (!SimpleEntityController.has(event.data.msg)) {
                return 1;
            }
            SimpleEntityController.remove(event.data.msg);
            break;
        }
        case "setLoc": {
            if (!(event.data.msg instanceof Array) || event.data.msg.length != 4) {
                return 2;
            }
            if (!SimpleEntityController.has(event.data.msg[0])) {
                return 1;
            }
            SimpleEntityController.get(event.data.msg[0]).setPosition(BABYLON.Vector3.FromArray(event.data.msg[1]));
            break;
        }
        case "setRot": {
            if (!(event.data.msg instanceof Array) || event.data.msg.length != 3) {
                return 2;
            }
            if (!SimpleEntityController.has(event.data.msg[0])) {
                return 1;
            }
            SimpleEntityController.get(event.data.msg[0]).setRotation(BABYLON.Vector3.FromArray(event.data.msg[1]));
            break;
        }
        case "setLocRot": {
            if (!(event.data.msg instanceof Array) || event.data.msg.length != 3) {
                return 2;
            }
            if (!SimpleEntityController.has(event.data.msg[0])) {
                return 1;
            }
            let entity = SimpleEntityController.get(event.data.msg[0]);
            entity.setPosition(BABYLON.Vector3.FromArray(event.data.msg[1]));
            entity.setRotation(BABYLON.Vector3.FromArray(event.data.msg[2]));
            break;
        }
        case "setPlayer": {
            if (!SimpleEntityController.has(event.data.msg)) {
                return 1;
            }
            player = SimpleEntityController.get(event.data.msg);
        }
    };
}, false);