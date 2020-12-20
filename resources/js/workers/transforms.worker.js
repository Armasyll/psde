importScripts("../../../vendors/babylonjs/babylon.js", "../BabylonOverrides.js", "../Overrides.js", "../classes/Tools.js");
class SimpleEntityController {
    constructor(id, width = 0.0, height = 0.0, depth = 0.0, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero(), timestamp = 0) {
        this.id = id;
        this.width = width;
        this.weight = height;
        this.depth = depth;
        this.position = BABYLON.Vector3.Zero();
        this.setPosition(position);
        this.rotation = BABYLON.Vector3.Zero();
        this.setRotation(rotation);
        this.timestamp = timestamp;
        this.collisionMesh = null;
        this.locked = false;
        this.enabled = true;
        this.createCollisionMesh();
        SimpleEntityController.set(this.id, this);
    }
    setPosition(position) {
        if (!(position instanceof BABYLON.Vector3)) {
            if (typeof position == "array") {
                position = BABYLON.Vector3.FromArray(position);
            }
            else {
                position = BABYLON.Vector3.Zero();
            }
        }
        this.position.copyFrom(position);
        if (this.collisionMesh instanceof BABYLON.AbstractMesh) {
            this.collisionMesh.position.copyFrom(position);
        }
        return 0;
    }
    getPosition() {
        if (this.collisionMesh instanceof BABYLON.AbstractMesh) {
            return this.collisionMesh.position;
        }
        return new BABYLON.Vector3(0, -4096, 0);
    }
    setRotation(rotation) {
        if (!(rotation instanceof BABYLON.Vector3)) {
            if (typeof rotation == "array") {
                rotation = BABYLON.Vector3.FromArray(rotation);
            }
            else {
                rotation = BABYLON.Vector3.Zero();
            }
        }
        this.rotation.copyFrom(rotation);
        if (this.collisionMesh instanceof BABYLON.AbstractMesh) {
            this.collisionMesh.rotation.copyFrom(rotation);
        }
        return 0;
    }
    getRotation() {
        if (this.collisionMesh instanceof BABYLON.AbstractMesh) {
            return this.collisionMesh.rotation;
        }
        return BABYLON.Vector3.Zero();
    }
    setTimestamp(timestamp) {
        this.timestamp = timestamp;
        return 0;
    }
    getTimestamp() {
        return this.timestamp;
    }

    hasCollisionMesh() {
        return this.collisionMesh instanceof BABYLON.AbstractMesh;
    }
    createCollisionMesh() {
        this.collisionMesh = createAreaMesh(this.id, "CUBE", this.width, this.height, this.depth, this.position, this.rotation);
        return 0;
    }

    dispose() {
        this.locked = true;
        this.enabled = false;
        if (this.collisionMesh instanceof BABYLON.AbstractMesh) {
            this.collisionMesh.dispose();
        }
        SimpleEntityController.remove(this.id);
        return undefined;
    }
    static initialize() {
        SimpleEntityController.simpleEntityControllerList = {};
    }
    static set(id, simpleEntityController) {
        delete requestedEntities[id];
        SimpleEntityController.simpleEntityControllerList[id] = simpleEntityController;
        return 0;
    }
    static get(id) {
        return SimpleEntityController.simpleEntityControllerList[id];
    }
    static has(id) {
        return SimpleEntityController.simpleEntityControllerList.hasOwnProperty(id);
    }
    static list() {
        return SimpleEntityController.simpleEntityControllerList;
    }
    static remove(id) {
        delete SimpleEntityController.simpleEntityControllerList[id];
    }
}
SimpleEntityController.initialize();
let player = null;
let entityRadiusToPlayerLimit = 25.0;
let entitiesEnabledByRadius = new Set();
let entitiesDisabledByRadius = new Set();
let entitiesProcessingByRadius = new Set();

let engine = new BABYLON.NullEngine();
let scene = new BABYLON.Scene(engine);
let camera = new BABYLON.UniversalCamera("Camera", BABYLON.Vector3.Zero(), scene); // have to render in order to get intersects >:l
    camera.rotation.x = BABYLON.Tools.ToRadians(90);
    camera.position.y = 255;
let sceneChangedSinceLastRender = true;
let requestedEntities = {};
let entityLogicPort = null;

function renderIfNeeded() {
    if (sceneChangedSinceLastRender) {
        scene.render();
        sceneChangedSinceLastRender = false;
    }
}
function entityToggler() {
    if (!(player instanceof SimpleEntityController)) {
        return 1;
    }
    let enableControllers = [];
    let disableControllers = [];
    for (let id in SimpleEntityController.list()) {
        let simpleEntityController = SimpleEntityController.get(id);
        if (entitiesProcessingByRadius.has(id)) {
            continue;
        }
        entitiesProcessingByRadius.add(id);
        if (player.position.equalsWithEpsilon(simpleEntityController.position, entityRadiusToPlayerLimit)) {
            entitiesDisabledByRadius.delete(id);
            entitiesEnabledByRadius.add(id);
            if (!simpleEntityController.enabled) {
                simpleEntityController.enabled = true;
                enableControllers.push(id);
            }
        }
        else {
            entitiesEnabledByRadius.delete(id);
            entitiesDisabledByRadius.add(id);
            if (simpleEntityController.enabled) {
                simpleEntityController.enabled = false;
                disableControllers.push(id);
            }
        }
        entitiesProcessingByRadius.delete(id);
    };
    postMessage({"cmd":"disable", "sta":0, "msg":[disableControllers]});
    postMessage({"cmd":"enable", "sta":0, "msg":[enableControllers]});
    return 0;
}
function createAreaMesh(id = "", shape = "CUBE", diameter = 1.0, height = 1.0, depth = 1.0, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero()) {
    let mesh = null;
    switch (shape) {
        case "CYLINDER": {
            mesh = BABYLON.MeshBuilder.CreateCylinder(id, {"diameter": diameter, "height": height, "tessellation": 8}, scene);
            break;
        }
        case "CONE": {
            mesh = BABYLON.MeshBuilder.CreateCylinder(id, {"diameterTop": diameter, "diameterBottom": 0, "height": height, "tessellation": 8}, scene);
            mesh.rotation.x = BABYLON.Tools.ToRadians(90);
            mesh.rotation.z = BABYLON.Tools.ToRadians(180);
            break;
        }
        case "SPHERE": {
            mesh = BABYLON.MeshBuilder.CreateSphere(id, {"diameter": diameter, "diameterY": height, "diameterZ": depth, "segments": 8}, scene);
            break;
        }
        case "CUBE": {}
        default: {
            mesh = BABYLON.MeshBuilder.CreateBox(id, {"width": diameter, "height": height, "depth": depth}, scene);
        }
    }

    let pivotAt = new BABYLON.Vector3(0, height / 2, 0);
    mesh.bakeTransformIntoVertices(BABYLON.Matrix.Translation(pivotAt.x, pivotAt.y, pivotAt.z));
    
    if (position instanceof Array) {
        position = BABYLON.Vector3.FromArray(position);
    }
    if (rotation instanceof Array) {
        rotation = BABYLON.Vector3.FromArray(rotation);
    }
    if (position instanceof BABYLON.Vector3) {
        mesh.position.copyFrom(position);
    }
    if (rotation instanceof BABYLON.Vector3) {
        mesh.rotation.addInPlace(rotation);
    }

    return mesh;
}
function withinRange(entityControllerA, entityControllerB, distance = 0.6) {
    distance = Number.parseFloat(distance) || 0;
    if (!SimpleEntityController.has(entityControllerA)) {
        return false;
    }
    else if (!SimpleEntityController.has(entityControllerB)) {
        return false;
    }
    entityControllerA = SimpleEntityController.get(entityControllerA);
    entityControllerB = SimpleEntityController.get(entityControllerB);
    if (distance <= 0) {
        distance = entityControllerA.getHeight();
        if (entityControllerB.getHeight() > distance) {
            distance = entityControllerB.getHeight();
        }
        distance = distance * 0.5;
    }
    let result = entityControllerA.position.equalsWithEpsilon(entityControllerB.position, distance) || false;
    return result;
}
function inFrontOf(entityControllerA, entityControllerB, epsilon = 0.3926991) {
    epsilon = Number.parseFloat(epsilon) || 0;
    if (!SimpleEntityController.has(entityControllerA)) {
        return false;
    }
    else if (!SimpleEntityController.has(entityControllerB)) {
        return false;
    }
    entityControllerA = SimpleEntityController.get(entityControllerA);
    entityControllerB = SimpleEntityController.get(entityControllerB);
    let aPos = new BABYLON.Vector2(entityControllerA.position.x, entityControllerA.position.z);
    let bPos = entityControllerA.calcMovePOV(0, 0, 1);
    bPos = aPos.add(new BABYLON.Vector2(bPos.x, bPos.z));
    let cPos = new BABYLON.Vector2(entityControllerB.position.x, entityControllerB.position.z);
    let bAng = BABYLON.Angle.BetweenTwoPoints(aPos, bPos);
    let aAng = BABYLON.Angle.BetweenTwoPoints(aPos, cPos);
    let result = aAng.radians() - bAng.radians() <= epsilon;
    return result;
}
function inArea(shape, diameter, height, depth, position, rotation) {
    let areaMesh = createAreaMesh(Tools.genUUIDv4() + "-AreaMesh", shape, diameter, height, depth, position, rotation);
    let controllerIDs = [];
    for (let controllerID in SimpleEntityController.list()) {
        let controller = SimpleEntityController.get(controllerID);
        if (controller.enabled) {
            if (areaMesh.intersectsMesh(controller.collisionMesh, true)) {
                controllerIDs.push(controllerID);
            }
        }
    }
    return controllerIDs;
}
function entityLogicWorkerOnMessage(event) {
    switch (event.data["cmd"]) {
        case "inArea": {
            let result = withinRange(...event.data["msg"]);
            entityLogicWorkerPostMessage("inArea", 0, result, event.data["callbackID"]);
            break;
        }
        case "inFrontOf": {
            let result = withinRange(...event.data["msg"]);
            entityLogicWorkerPostMessage("inFrontOf", 0, result, event.data["callbackID"]);
            break;
        }
        case "withinRange": {
            let result = withinRange(...event.data["msg"]);
            entityLogicWorkerPostMessage("withinRange", 0, result, event.data["callbackID"]);
            break;
        }
    }
    return 0;
}
/**
 * 
 * @param {string} command 
 * @param {number} status 
 * @param {(Array<string>|object)} [message] 
 * @param {(string|undefined)} [callbackID] 
 * @param {(object|undefined)} [options] 
 */
function entityLogicWorkerPostMessage(command, status = 0, message, callbackID = null, options = null) {
    let obj = {"cmd": command, "sta": status, "msg": message};
    if (callbackID) {
        obj["callbackID"] = callbackID;
    }
    if (options) {
        entityLogicPort.postMessage(obj, options);
    }
    else {
        entityLogicPort.postMessage(obj);
    }
    return 0;
}
function gameWorkerOnMessage(event) {
    switch (event.data["cmd"]) {
        case "connectEntityLogic": {
            entityLogicPort = event.ports[0];
            entityLogicPort.onmessage = entityLogicWorkerOnMessage;
            break;
        }
        case "toggleEntities": {
            entityToggler();
            break;
        }
        case "updateEntity": {
            if (!(event.data["msg"] instanceof Array)) {}
            else if (!SimpleEntityController.has(event.data["msg"][0])) {
                if (!requestedEntities.hasOwnProperty(event.data["msg"][0])) {
                    let entityID = event.data["msg"][0];
                    requestedEntities[entityID] = true;
                    postMessage({"cmd":"createEntity", "sta":0, "msg":[entityID]});
                }
            }
            else {
                let entity = SimpleEntityController.get(event.data["msg"][0]);
                entity.setTimestamp(event.data["msg"][1]);
                entity.setPosition(BABYLON.Vector3.FromArray(event.data["msg"][2]));
                entity.setRotation(BABYLON.Vector3.FromArray(event.data["msg"][3]));
                sceneChangedSinceLastRender = true;
            }
            break;
        }
        case "createEntity": {
            if (!(event.data["msg"] instanceof Array)) {
                return 2;
            }
            if (!SimpleEntityController.has(event.data["msg"][0])) {
                new SimpleEntityController(event.data["msg"][0], event.data["msg"][1], event.data["msg"][2], event.data["msg"][3], BABYLON.Vector3.FromArray(event.data["msg"][4]), BABYLON.Vector3.FromArray(event.data["msg"][5]));
                sceneChangedSinceLastRender = true;
            }
            break;
        }
        case "withinRange": {
            if (!(event.data["msg"] instanceof Array)) {
                return 2;
            }
            let result = withinRange(event.data["msg"][0], event.data["msg"][1], event.data["msg"][2]);
            postMessage({"cmd":"withinRange", "sta":0, "msg":[event.data["msg"][3], result]});
            break;
        }
        case "inFrontOf": {
            if (!(event.data["msg"] instanceof Array)) {
                return 2;
            }
            let result = inFrontOf(event.data["msg"][0], event.data["msg"][1], event.data["msg"][2]);
            postMessage({"cmd":"inFrontOf", "sta":0, "msg":[event.data["msg"][3], result]});
            break;
        }
        case "inArea": {
            if (!(event.data["msg"] instanceof Array)) {
                return 2;
            }
            let result = inArea(event.data["msg"][0], event.data["msg"][1], event.data["msg"][2], event.data["msg"][3], event.data["msg"][4], event.data["msg"][5])
            postMessage({"cmd":"inArea", "sta":0, "msg":[event.data["msg"][6], result]});
            break;
        }
        case "remove":
        case "delete": {
            if (!SimpleEntityController.has(event.data["msg"])) {
                return 1;
            }
            let controller = SimpleEntityController.get(event.data["msg"]);
            controller.collisionMesh.dispose();
            sceneChangedSinceLastRender = true;
            break;
        }
        case "setLoc": {
            if (!(event.data["msg"] instanceof Array)) {
                return 2;
            }
            if (!SimpleEntityController.has(event.data["msg"][0])) {
                return 1;
            }
            SimpleEntityController.get(event.data["msg"][0]).setPosition(BABYLON.Vector3.FromArray(event.data["msg"][1]));
            sceneChangedSinceLastRender = true;
            break;
        }
        case "setRot": {
            if (!(event.data["msg"] instanceof Array)) {
                return 2;
            }
            if (!SimpleEntityController.has(event.data["msg"][0])) {
                return 1;
            }
            SimpleEntityController.get(event.data["msg"][0]).setRotation(BABYLON.Vector3.FromArray(event.data["msg"][1]));
            sceneChangedSinceLastRender = true;
            break;
        }
        case "setLocRot": {
            if (!(event.data["msg"] instanceof Array)) {
                return 2;
            }
            if (!SimpleEntityController.has(event.data["msg"][0])) {
                return 1;
            }
            let entity = SimpleEntityController.get(event.data["msg"][0]);
            entity.setPosition(BABYLON.Vector3.FromArray(event.data["msg"][1]));
            entity.setRotation(BABYLON.Vector3.FromArray(event.data["msg"][2]));
            sceneChangedSinceLastRender = true;
            break;
        }
        case "setPlayer": {
            if (!SimpleEntityController.has(event.data["msg"][0])) {
                return 1;
            }
            player = SimpleEntityController.get(event.data["msg"][0]);
        }
    };
    renderIfNeeded();
    return 0;
}
addEventListener('message', gameWorkerOnMessage, false);