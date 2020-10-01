class NetworkController {
    constructor() {
        this.socket = null;
        this.initialized = false;
    }
    static initialize(host = window.location.hostname) {
        NetworkController.socket = null;
        NetworkController.initialized = false;
        NetworkController.connectToServer(host);
        return 0;
    }

    static connectToServer(host = window.location.hostname) {
        let protocol = "ws";
        if (NetworkController.socket) {
            NetworkController.close(3001);
        }
        else {
            if (window.location.protocol == "https:") {
                protocol = "wss";
            }
            NetworkController.socket = new WebSocket(protocol + "://" + host + "/nickInThighHighSocks/");
            NetworkController.socket.onopen = function(_event) {NetworkController.onOpen(_event);};
            NetworkController.socket.onmessage = function(_event) {NetworkController.onMessage(_event);};
            NetworkController.socket.onerror = function(_event) {NetworkController.onError(_event);};
            NetworkController.socket.onclose = function(_event) {NetworkController.onClose(_event);};
        }
        return 0;
    }

    static onOpen(event) {
        if (Client.debugMode) console.group("Running NetworkController.onOpen()");
        Client.setOnline(true);
        NetworkController.initialized = true;
        if (Client.debugMode) console.groupEnd();
        return 0;
    }
    static onClose(event) {
        if (Client.debugMode) console.group("Running NetworkController.onClose()");
        if (Client.isOnline()) {
            Client.disconnect(false);
        }
        NetworkController.initialized = false;
        NetworkController.socket = null;
        if (event.code == 3001) {
        }
        else if (event.code == 1006) {
            if (Client.debugMode) console.log("Socket Server is offline.");
        }
        else {
            if (Client.debugMode) console.log("Socket closed unexpectedly.");
        }
        if (Client.debugMode) console.groupEnd();
        return 0;
    }
    static onError(event) {
        if (Client.debugMode) {
            console.group(`NetworkController.onError()`);
            console.info(event);
            console.groupEnd();
        }
        return 0;
    }
    static onMessage(event) {
        if (Client.debugMode && Client.debugVerbosity > 3) console.group(`NetworkController.onMessage()`);
        if (typeof event["data"] != "string") {
            if (Client.debugMode && Client.debugVerbosity > 3) {
                console.log("Missing message.");
                console.groupEnd();
            }
            return 2;
        }
        let status = event["code"];
        let jsonObject = JSON.parse(event["data"]);
        if (!(jsonObject instanceof Object)) {
            if (Client.debugMode && Client.debugVerbosity > 3) {
                console.log("Invalid message.");
                console.groupEnd();
            }
            return 2;
        }
        if (!jsonObject.hasOwnProperty("cmd")) {
            if (Client.debugMode && Client.debugVerbosity > 3) {
                console.log("Missing command.");
                console.groupEnd();
            }
            return 2;
        }
        let command = jsonObject["cmd"];
        status = jsonStrong["sta"];
        let message = jsonObject["msg"];
        switch (command) {
            case "S_ACCEPT_CONNECTION" : {
                if (Client.debugMode && Client.debugVerbosity > 3) console.log("S_ACCEPT_CONNECTION : Connection accepted; Received NID " + message);
                Client.setOnline(true);
                Client.requestJoinServer();
                break;
            }
            case "S_ACCEPT_JOIN_SERVER" : {
                if (Client.debugMode && Client.debugVerbosity > 3) console.log("S_ACCEPT_JOIN_SERVER : Connection accepted; Received UUID " + message);
                Client.requestUUID(message);
                break;
            }
            case "S_DENY_JOIN_SERVER" : {
                if (Client.debugMode && Client.debugVerbosity > 3) console.log("S_DENY_JOIN_SERVER : Connection denied");
                break;
            }
            case "S_ACCEPT_UUID" : {
                if (Client.debugMode && Client.debugVerbosity > 3) console.log("S_ACCEPT_UUID : Connected with UUID " + message["uuid"] + " and NID " + message["nid"]);
                Client.initializeSelf(message.uuid, message.nid);
                break;
            }
            case "S_DENY_UUID" : {
                if (Client.debugMode && Client.debugVerbosity > 3) console.log("S_DENY_NID : Connection denied with UUID " + message["uuid"]);
                break;
            }
            case "S_ACCEPT_INIT_SELF" : {
                if (Client.debugMode && Client.debugVerbosity > 3) console.log("S_ACCEPT_INIT_SELF");
                break;
            }
            case "S_DENY_INIT_SELF" : {
                if (Client.debugMode && Client.debugVerbosity > 3) console.log("S_DENY_INIT_SELF");
                break;
            }
            case "S_SEND_PLAYER" : {
                if (Client.debugMode && Client.debugVerbosity > 3) console.log("S_SEND_PLAYER");
                if (message["nid"] == Client.getOwnNetworkID()) {
                    if (Client.debugMode && Client.debugVerbosity > 3) console.groupEnd();
                    return 0;
                }
                if (Client.hasNetworkID(message[1])) {
                    let characterController = Client.getController(message[1]).getController();
                    characterController.setMovementKey(message[11]);
                    if (characterController.getID() != message[0]) {
                        characterController.updateID(message[0]);
                        characterController.entity.updateID(message[0]);
                    }
                    characterController.collisionMesh.position.copyFrom(BABYLON.Vector3.FromArray(message[8]));
                    characterController.collisionMesh.rotation.copyFrom(BABYLON.Vector3.FromArray(message[9]));
                    characterController.collisionMesh.scaling.copyFrom(BABYLON.Vector3.FromArray(message[10]));
                    characterController.key.fromBinary(message[11]);
                }
                else {
                    if (Client.debugMode && Client.debugVerbosity > 3) console.info(message);
                    let newCallbackID = Tools.genUUIDv4();
                    Game.createCharacterEntity(
                        message[1],
                        message[2],
                        null,
                        "genericRabbit",
                        message[3],
                        message[4],
                        message[5],
                        message[6],
                        message[7],
                        message[8],
                        {"mass":0.8, "restitution":0.1},
                        newCallbackID
                    );
                    Game.createCallback(newCallbackID, null, [message[1], message[1], message[9], message[10], message[11]], Game.createCharacterInstance);
                    Client.addPlayerToCreate(message[1], message[0]);
                }
                break;
            }
            case "S_DESTROY_PLAYER" : {
                if (Client.debugMode && Client.debugVerbosity > 3) console.log(`S_DESTROY_PLAYER (${message})`);
                if (message == Client.getOwnNetworkID()) {
                    if (Client.debugMode && Client.debugVerbosity > 3) console.groupEnd();
                    return 0;
                }
                else {
                    Client.removeEntry(message);
                    Game.removeCharacter(message);
                }
                break;
            }
            case "S_UPDATE_LOCROTSCALES_PLAYERS" : {
                if (Client.debugMode && Client.debugVerbosity > 3) console.log("S_UPDATE_LOCROTSCALES_PLAYERS");
                for (let characterObject in message) {
                    if (message[characterObject][0] == Client.getOwnNetworkID()) {}
                    else if (isNaN(message[characterObject][0])) {}
                    else {
                        if (Client.debugMode && Client.debugVerbosity > 3) console.log("S_UPDATE_LOCROTSCALES_PLAYERS :     Checking for " + message[characterObject][0]);
                        if (Client.hasNetworkID(message[characterObject][0])) {
                            let characterController = Client.getController(message[characterObject][0]).getController();
                            characterController.collisionMesh.position.copyFrom(BABYLON.Vector3.FromArray(message[characterObject][1]));
                            characterController.collisionMesh.rotation.copyFrom(BABYLON.Vector3.FromArray(message[characterObject][2]));
                            characterController.collisionMesh.scaling.copyFrom(BABYLON.Vector3.FromArray(message[characterObject][3]));
                            characterController.key.fromBinary(message[characterObject][4]);
                        }
                        else {
                            Client.requestPlayerByNetworkID(message[characterObject][0]);
                        }
                    }
                }
                break;
            }
            case "S_CHAT_MESSAGE" : {
                let timestamp = new Date(message.time * 1000).toLocaleTimeString({ hour12: false });
                let name = CharacterEntity.get(message.from).name;
                GameGUI.chatOutputAppend(`${timestamp} ${name}: ${message.message}`);
                break;
            }
            case "S_SEND_ALL_PLAYERS" : {
                if (Client.debugMode && Client.debugVerbosity > 3) {
                    console.log("S_REQUEST_ALL_PLAYERS : ");
                    console.log(message);
                }
                break;
            }
            case "S_DO_ENTITY_ACTION" : {
                /**
                 * @typedef {array} message
                 * @property {EntityEnum} [0] Entity's EntityType
                 * @property {EntityController} [1] actor
                 * @property {EntityEnum} [2] target's EntityType
                 * @property {EntityController} [3] target
                 * @property {ActionEnum} [4] Action SubEntity is doing to Entity
                 * @property {number} [5] Depends on the ActionEnum; if it's ActionEnum.ATTACK, then this is the attack damage
                */
                let entityType = Number.parseInt(message[0]);
                let subEntityType = Number.parseInt(message[2]);
                let actionID = Number.parseInt(message[4]);
                if (!Entity.has(message[1]) && !InstancedEntity.has(message[1])) {
                    if (Client.debugMode && Client.debugVerbosity > 3) {
                        console.log(`Entity (${EntityEnum.properties[message[0]].key}:${message[1]}) does not exist!`);
                        console.groupEnd();
                    }
                    return 2;
                }
                if (!Entity.has(message[3]) && !InstancedEntity.has(message[3])) {
                    if (Client.debugMode && Client.debugVerbosity > 3) {
                        console.log(`Sub-Entity (${EntityEnum.properties[message[3]].key}:${message[3]}) does not exist!`);
                        console.groupEnd();
                    }
                    return 2;
                }
                if (!ActionEnum.properties.hasOwnProperty(message[4])) {
                    if (Client.debugMode && Client.debugVerbosity > 3) {
                        console.log(`Action (${message[4]}) does not exist!`);
                        console.groupEnd();
                    }
                    return 2;
                }
                if (Client.debugMode && Client.debugVerbosity > 3) console.log(`S_DO_ENTITY_ACTION ${message.join(',')}`);
                let entity = Entity.get(message[1]) || InstancedEntity.get(message[1]);
                let subEntity = Entity.get(message[3]) || InstancedEntity.get(message[3]);
                if (message[4] == ActionEnum.ATTACK) {
                    Game.actionAttack(entity, subEntity, (message[5] || 0));
                }
                else {
                    Game.doEntityAction(entity, subEntity, message[4]);
                }
                break;
            }
            default : {
                if (Client.debugMode && Client.debugVerbosity > 3) console.log(`Invalid command (${String(command)})`);
            }
        }
        if (Client.debugMode && Client.debugVerbosity > 3) console.groupEnd();
        return 0;
    }

    static postMessage(command, status = 0, message = null, callbackID = null, options = null) {
        if (!NetworkController.initialized) {
            return 1;
        }
        let obj = {"cmd": command, "sta": status};
        if (message) {
            obj["msg"] = message;
        }
        if (callbackID) {
            obj["callbackID"] = callbackID;
        }
        if (options) {
            NetworkController.socket.send(JSON.stringify(obj), options);
        }
        else {
            NetworkController.socket.send(JSON.stringify(obj));
        }
        return 0;
    }
}