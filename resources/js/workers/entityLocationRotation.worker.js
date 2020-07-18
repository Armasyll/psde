importScripts("../../../vendors/babylonjs/babylon.js", "../Overrides.js", "../classes/Tools.js");
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
            if (typeof position == "array" && array.length == 3 && typeof array[2] == "number") {
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
            if (typeof rotation == "array" && array.length == 3 && typeof array[2] == "number") {
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

let engine = new BABYLON.NullEngine();
let scene = new BABYLON.Scene(engine);
let camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene); // have to render in order to get intersects >:l
function entityToggler() {
    if (player == null) {
        return 1;
    }
    let enableControllers = [];
    let disableControllers = [];
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
    });
    postMessage({"cmd":"disable", "msg":{"controllerIDs":disableControllers}});
    postMessage({"cmd":"enable", "msg":{"controllerIDs":enableControllers}});
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
            mesh = BABYLON.MeshBuilder.CreateCylinder(id, {"diameterTop": 0, "diameterBottom": diameter, "height": height, "tessellation": 8}, scene);
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
    
    if (position instanceof BABYLON.Vector3) {
        mesh.position.copyFrom(position);
    }
    if (rotation instanceof BABYLON.Vector3) {
        mesh.rotation.copyFrom(rotation);
    }

    return mesh;
}
addEventListener('message', function(event) {
    switch (event.data.cmd) {
        case "toggleEntities": {
            entityToggler();
            break;
        }
        case "updateEntity": {
            if (!(event.data.msg instanceof Array) || event.data.msg.length != 4 || typeof event.data.msg[0] != "string" || typeof event.data.msg[1] != "number") {
                return 2;
            }
            if (!SimpleEntityController.has(event.data.msg[0])) {
                postMessage({"cmd":"requestCreate", "msg":event.data.msg[0]});
                return 1;
            }
            else {
                let entity = SimpleEntityController.get(event.data.msg[0]);
                entity.setTimestamp(event.data.msg[1]);
                entity.setPosition(BABYLON.Vector3.FromArray(event.data.msg[2]));
                entity.setRotation(BABYLON.Vector3.FromArray(event.data.msg[3]));
            }
            break;
        }
        case "createEntity": {
            if (!SimpleEntityController.has(event.data.msg[0])) {
                new SimpleEntityController(event.data.msg[0], event.data.msg[1], event.data.msg[2], event.data.msg[3], BABYLON.Vector3.FromArray(event.data.msg[4]), BABYLON.Vector3.FromArray(event.data.msg[5]));
            }
            break;
        }
        case "getEntitiesInArea": {
            if (!(event.data.msg instanceof Array) || event.data.msg.length != 7) {
                return 2;
            }
            let areaMesh = createAreaMesh(Tools.genUUIDv4(), event.data.msg[1], event.data.msg[2], event.data.msg[3], event.data.msg[4], event.data.msg[5], event.data.msg[6]);
            scene.render();
            let controllerIDs = [];
            for (let controllerID in SimpleEntityController.list()) {
                let controller = SimpleEntityController.get(controllerID);
                if (controller.enabled) {
                    if (areaMesh.intersectsMesh(controller.collisionMesh)) {
                        controllerIDs.push(controllerID);
                    }
                }
            }
            areaMesh.dispose();
            postMessage({"cmd":"entitiesInArea", "msg":{"responseID":event.data.msg[0], "controllerIDs":controllerIDs}});
            break;
        }
        case "remove":
        case "delete": {
            if (!SimpleEntityController.has(event.data.msg)) {
                return 1;
            }
            let controller = SimpleEntityController.get(event.data.msg);
            controller.collisionMesh.dispose();
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