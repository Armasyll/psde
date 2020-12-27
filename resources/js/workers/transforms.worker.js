importScripts("../../../vendors/babylonjs/babylon.js", "../BabylonOverrides.js", "../Overrides.js", "../classes/Tools.js");
class EntityController {
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
        EntityController.set(this.id, this);
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
        this.collisionMesh = Transforms.createAreaMesh(this.id, "CUBE", this.width, this.height, this.depth, this.position, this.rotation);
        return 0;
    }

    dispose() {
        this.locked = true;
        this.enabled = false;
        if (this.collisionMesh instanceof BABYLON.AbstractMesh) {
            this.collisionMesh.dispose();
        }
        EntityController.remove(this.id);
        return undefined;
    }
    static initialize() {
        EntityController.entityController = {};
    }
    static set(id, entityController) {
        delete Transforms.requestedEntities[id];
        EntityController.entityController[id] = entityController;
        return 0;
    }
    static get(id) {
        return EntityController.entityController[id];
    }
    static has(id) {
        return EntityController.entityController.hasOwnProperty(id);
    }
    static list() {
        return EntityController.entityController;
    }
    static remove(id) {
        delete EntityController.entityController[id];
    }
}
EntityController.initialize();
class Transforms {
    static initialize() {
        Transforms.debugMode = false;
        Transforms.debugVerbosity = 0;
        Transforms.entityLogicPort = null;
        Transforms.callbacks = {};

        Transforms.player = null;
        Transforms.entityRadiusToPlayerLimit = 25.0;
        Transforms.entitiesEnabledByRadius = new Set();
        Transforms.entitiesDisabledByRadius = new Set();
        Transforms.entitiesProcessingByRadius = new Set();
        
        Transforms.engine = new BABYLON.NullEngine();
        Transforms.scene = new BABYLON.Scene(Transforms.engine);
        Transforms.camera = new BABYLON.UniversalCamera("Camera", BABYLON.Vector3.Zero(), Transforms.scene); // have to render in order to get intersects >:l
            Transforms.camera.rotation.x = BABYLON.Tools.ToRadians(90);
            Transforms.camera.position.y = 255;
        Transforms.sceneChangedSinceLastRender = true;
        Transforms.requestedEntities = {};
        Transforms.initialized = true;
        addEventListener('message', Transforms.gameWorkerOnMessage, false);
    }

    static renderIfNeeded() {
        if (Transforms.sceneChangedSinceLastRender) {
            Transforms.scene.render();
            Transforms.sceneChangedSinceLastRender = false;
        }
    }

    static gameWorkerOnMessage(event) {
        let status = event.data["sta"];
        let callbackID = event.data["callbackID"];
        let message = event.data["msg"];
        switch (event.data["cmd"]) {
            case "connectEntityLogic": {
                Transforms.entityLogicPort = event.ports[0];
                Transforms.entityLogicPort.onmessage = Transforms.entityLogicWorkerOnMessage;
                break;
            }
            case "toggleEntities": {
                Transforms.entityToggler();
                break;
            }
            case "updateEntity": {
                if (!EntityController.has(message["id"])) {
                    if (!Transforms.requestedEntities.hasOwnProperty(message["id"])) {
                        Transforms.requestedEntities[message["id"]] = true;
                        Transforms.gameWorkerPostMessage("createEntity", 0, {"id":message["id"]}, callbackID);
                    }
                }
                else {
                    let entity = EntityController.get(message["id"]);
                    entity.setTimestamp(message["timestamp"]);
                    entity.setPosition(BABYLON.Vector3.FromArray(message["position"]));
                    entity.setRotation(BABYLON.Vector3.FromArray(message["rotation"]));
                    Transforms.sceneChangedSinceLastRender = true;
                }
                break;
            }
            case "createEntity": {
                if (!EntityController.has(message["id"])) {
                    new EntityController(
                        message["id"],
                        message["width"],
                        message["height"],
                        message["depth"],
                        BABYLON.Vector3.FromArray(message["position"]),
                        BABYLON.Vector3.FromArray(message["rotation"])
                    );
                    Transforms.sceneChangedSinceLastRender = true;
                }
                break;
            }
            case "withinRange": {
                let result = Transforms.withinRange(message["entityControllerA"], message["entityControllerB"], message["distance"]);
                Transforms.gameWorkerPostMessage("withinRange", 0, result, callbackID);
                break;
            }
            case "inFrontOf": {
                let result = Transforms.inFrontOf(message["entityControllerA"], message["entityControllerB"], message["epsilon"]);
                Transforms.gameWorkerPostMessage("inFrontOf", 0, result, callbackID);
                break;
            }
            case "inArea": {
                let result = Transforms.inArea(
                    message["shape"],
                    message["diameter"],
                    message["height"],
                    message["depth"],
                    message["position"],
                    message["rotation"]);
                Transforms.gameWorkerPostMessage("inArea", 0, result, callbackID);
                break;
            }
            case "inProjectilePath": {
                Transforms.gameWorkerPostMessage("inProjectilePath", 0, {}, callbackID);
                break;
            }
            case "remove":
            case "delete": {
                if (!EntityController.has(message)) {
                    return 1;
                }
                let controller = EntityController.get(message);
                controller.collisionMesh.dispose();
                Transforms.sceneChangedSinceLastRender = true;
                break;
            }
            case "setLoc": {
                if (!EntityController.has(message[0])) {
                    return 1;
                }
                EntityController.get(message[0]).setPosition(BABYLON.Vector3.FromArray(message[1]));
                Transforms.sceneChangedSinceLastRender = true;
                break;
            }
            case "setRot": {
                if (!EntityController.has(message[0])) {
                    return 1;
                }
                EntityController.get(message[0]).setRotation(BABYLON.Vector3.FromArray(message[1]));
                Transforms.sceneChangedSinceLastRender = true;
                break;
            }
            case "setLocRot": {
                if (!EntityController.has(message[0])) {
                    return 1;
                }
                let entity = EntityController.get(message[0]);
                entity.setPosition(BABYLON.Vector3.FromArray(message[1]));
                entity.setRotation(BABYLON.Vector3.FromArray(message[2]));
                Transforms.sceneChangedSinceLastRender = true;
                break;
            }
            case "setPlayer": {
                if (!EntityController.has(message[0])) {
                    return 1;
                }
                Transforms.player = EntityController.get(message[0]);
            }
        };
        Transforms.renderIfNeeded();
        return 0;
    }
    static gameWorkerPostMessage(command, status = 0, message, callbackID = null, options = null) {
        let obj = {"cmd": command, "sta": status, "msg": message};
        if (callbackID) {
            obj["callbackID"] = callbackID;
        }
        if (options) {
            postMessage(obj, options);
        }
        else {
            postMessage(obj);
        }
        return 0;
    }

    static entityToggler() {
        if (!(Transforms.player instanceof EntityController)) {
            return 1;
        }
        let enableControllers = [];
        let disableControllers = [];
        for (let id in EntityController.list()) {
            let simpleEntityController = EntityController.get(id);
            if (Transforms.entitiesProcessingByRadius.has(id)) {
                continue;
            }
            Transforms.entitiesProcessingByRadius.add(id);
            if (Transforms.player.position.equalsWithEpsilon(simpleEntityController.position, Transforms.entityRadiusToPlayerLimit)) {
                Transforms.entitiesDisabledByRadius.delete(id);
                Transforms.entitiesEnabledByRadius.add(id);
                if (!simpleEntityController.enabled) {
                    simpleEntityController.enabled = true;
                    enableControllers.push(id);
                }
            }
            else {
                Transforms.entitiesEnabledByRadius.delete(id);
                Transforms.entitiesDisabledByRadius.add(id);
                if (simpleEntityController.enabled) {
                    simpleEntityController.enabled = false;
                    disableControllers.push(id);
                }
            }
            Transforms.entitiesProcessingByRadius.delete(id);
        };
        Transforms.gameWorkerPostMessage("disable", 0, disableControllers);
        Transforms.gameWorkerPostMessage("enable", 0, enableControllers);
        return 0;
    }

    static createAreaMesh(id = "", shape = "CUBE", diameter = 1.0, height = 1.0, depth = 1.0, position = BABYLON.Vector3.Zero(), rotation = BABYLON.Vector3.Zero()) {
        let mesh = null;
        switch (shape) {
            case "CYLINDER": {
                mesh = BABYLON.MeshBuilder.CreateCylinder(id, {"diameter": diameter, "height": height, "tessellation": 8}, Transforms.scene);
                break;
            }
            case "CONE": {
                mesh = BABYLON.MeshBuilder.CreateCylinder(id, {"diameterTop": diameter, "diameterBottom": 0, "height": height, "tessellation": 8}, Transforms.scene);
                mesh.rotation.x = BABYLON.Tools.ToRadians(90);
                mesh.rotation.z = BABYLON.Tools.ToRadians(180);
                break;
            }
            case "SPHERE": {
                mesh = BABYLON.MeshBuilder.CreateSphere(id, {"diameter": diameter, "diameterY": height, "diameterZ": depth, "segments": 8}, Transforms.scene);
                break;
            }
            case "CUBE": {}
            default: {
                mesh = BABYLON.MeshBuilder.CreateBox(id, {"width": diameter, "height": height, "depth": depth}, Transforms.scene);
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
    
    static withinRange(entityControllerA, entityControllerB, distance = 0.6) {
        distance = Number.parseFloat(distance) || 0;
        if (!EntityController.has(entityControllerA)) {
            return false;
        }
        else if (!EntityController.has(entityControllerB)) {
            return false;
        }
        entityControllerA = EntityController.get(entityControllerA);
        entityControllerB = EntityController.get(entityControllerB);
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

    static inFrontOf(entityControllerA, entityControllerB, epsilon = 0.3926991) {
        epsilon = Number.parseFloat(epsilon) || 0;
        if (!EntityController.has(entityControllerA)) {
            return false;
        }
        else if (!EntityController.has(entityControllerB)) {
            return false;
        }
        entityControllerA = EntityController.get(entityControllerA);
        entityControllerB = EntityController.get(entityControllerB);
        let aPos = new BABYLON.Vector2(entityControllerA.position.x, entityControllerA.position.z);
        let bPos = entityControllerA.calcMovePOV(0, 0, 1);
        bPos = aPos.add(new BABYLON.Vector2(bPos.x, bPos.z));
        let cPos = new BABYLON.Vector2(entityControllerB.position.x, entityControllerB.position.z);
        let bAng = BABYLON.Angle.BetweenTwoPoints(aPos, bPos);
        let aAng = BABYLON.Angle.BetweenTwoPoints(aPos, cPos);
        let result = aAng.radians() - bAng.radians() <= epsilon;
        return result;
    }

    static inArea(shape, diameter, height, depth, position, rotation) {
        let areaMesh = Transforms.createAreaMesh(Tools.genUUIDv4() + "-AreaMesh", shape, diameter, height, depth, position, rotation);
        let controllerIDs = [];
        Transforms.scene.render();
        for (let controllerID in EntityController.list()) {
            let controller = EntityController.get(controllerID);
            if (controller.enabled) {
                if (areaMesh.intersectsMesh(controller.collisionMesh, true)) {
                    controllerIDs.push(controllerID);
                }
            }
        }
        return controllerIDs;
    }

    static inProjectilePath() {
        let controllerIDs = [];
        return controllerIDs;
    }

    static entityLogicWorkerOnMessage(event) {
        let status = event.data["sta"];
        let callbackID = event.data["callbackID"];
        let message = event.data["msg"];
        switch (event.data["cmd"]) {
            case "inProjectilePath": {
                let result = Transforms.inProjectilePath(...message);
                Transforms.entityLogicWorkerPostMessage("inProjectilePath", 0, result, event.data["callbackID"]);
                break;
            }
            case "inArea": {
                let result = Transforms.inArea(...message);
                Transforms.entityLogicWorkerPostMessage("inArea", 0, result, event.data["callbackID"]);
                break;
            }
            case "inFrontOf": {
                let result = Transforms.inFrontOf(...message);
                Transforms.entityLogicWorkerPostMessage("inFrontOf", 0, result, event.data["callbackID"]);
                break;
            }
            case "withinRange": {
                let result = Transforms.withinRange(...message);
                Transforms.entityLogicWorkerPostMessage("withinRange", 0, result, event.data["callbackID"]);
                break;
            }
        }
        return 0;
    }

    static entityLogicWorkerPostMessage(command, status = 0, message = [], callbackID = null, options = null) {
        let obj = {"cmd": command, "sta": status, "msg": message};
        if (callbackID) {
            obj["callbackID"] = callbackID;
        }
        if (options) {
            Transforms.entityLogicPort.postMessage(obj, options);
        }
        else {
            Transforms.entityLogicPort.postMessage(obj);
        }
        return 0;
    }
}
Transforms.initialize();