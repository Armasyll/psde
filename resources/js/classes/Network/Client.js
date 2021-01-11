class Client {
    static initialize() {
        /**
         * Map of Network IDs to CharacterControllers
         * @type {String: CharacterController}
         */
        Client.networkEntries = new BidirectionalMap();
        Client.online = false;
        Client.initialized = true;
        Client.sendCount = 1;
        Client.playersToCreate = {};
        Client.playersToCreateCounter = 0;
        Client.hasBackloggedPlayers = true;
        Client.lockBackloggedPlayerCreation = false;
        Client.networkID = "";
        Client.debugMode = false;
        Client.debugVerbosity = 0;
    }
    static connect() {
        if (!Client.initialized) {
            Client.initialize();
        }
        NetworkController.initialize();
        return 0;
    }
    static disconnect(updateChild = true) {
        var _timestamp = new Date().toLocaleTimeString({ hour12: false });
        Client.removeAllPlayers();
        Client.setOnline(false);
        GameGUI.chatOutputAppend(`${_timestamp} Server: Connection Closed.`);
        if (updateChild) {
            NetworkController.initialized = false;
            NetworkController.socket = undefined;
        }
        return 0;
    }
    static isOnline() {
        return Client.online;
    }
    static setOnline(isOnline) {
        Client.online = (isOnline == true);
        return 0;
    }
    static setPlayerEntry(networkID) {
        console.group(`Running Client.setPlayerEntry(${networkID})`);
        Client.networkID = networkID;
        console.groupEnd();
        return Client.setEntry(networkID, Game.playerController);
    }
    static setEntry(networkID, entityController) {
        console.group(`Running Client.setEntry(${networkID}, ${entityController.id})`);
        Client.networkEntries.set(networkID, entityController);
        entityController.setNetworkID(networkID);
        console.groupEnd();
        return 0;
    }
    static getNetworkID(entityController = Game.playerController) {
        if (entityController instanceof EntityController) {
            if (Client.networkEntries.hasValue(entityController.id)) {
                return Client.networkEntries.getKey(entityController.id);
            }
        }
        else if (EntityController.has(entityController)) {
            if (Client.networkEntries.hasValue(entityController)) {
                return Client.networkEntries.getKey(entityController);
            }
        }
        return null;
    }
    static getOwnNetworkID() {
        return this.networkID;
    }
    static getController(networkID) {
        if (Client.networkEntries.hasKey(networkID)) {
            return Client.networkEntries.getValue(networkID);
        }
        return null;
    }
    static hasNetworkID(networkID) {
        return Client.networkEntries.hasKey(networkID);
    }
    static hasEntity(abstractEntity) {
        return Client.networkEntries.hasValue(abstractEntity);
    }
    static removeEntry(networkID) {
        if (Client.networkEntries.hasKey(networkID)) {
            Client.networkEntries.delete(networkID);
            return 0;
        }
        return 1;
    }
    static getState() {
        if (!Client.online) {
            return "NONE";
        }
        switch (NetworkController.socket.readyState) {
            case 0 : return "CONNECTING";
            case 1 : return "OPEN";
            case 2 : return "CLOSING";
            case 3 : return "CLOSED";
        }
        return "NONE";
    }
    static requestJoinServer() {
        if (!Client.online) {
            return 1;
        }
        NetworkController.postMessage("P_REQUEST_JOIN_SERVER", 0, ["lemme in :v"]);
        return 0;
    }
    static sendChatMessage(stringMessage) {
        if (!Client.online) {
            return 1;
        }
        NetworkController.postMessage("P_CHAT_MESSAGE", 0, [stringMessage]);
        return 0;
    }
    static requestUUID(stringUUID) {
        if (!Client.online) {
            return 1;
        }
        NetworkController.postMessage("P_REQUEST_UUID", 0, [stringUUID]);
        return 0;
    }
    static initializeSelf(stringUUID, networkID) {
        if (!Client.online) {
            return 1;
        }
        console.group(`Running Client.initializeSelf(${stringUUID}, ${networkID})`);
        if (!(Game.playerController instanceof CharacterController)) {
            Client.addPlayerToInitialize("player", stringUUID, networkID);
            console.groupEnd();
            return 1;
        }
        if (!Game.hasCachedEntity(Game.playerEntityID)) {
            console.groupEnd();
            return 1;
        }
        let entityObject = Game.getCachedEntity(Game.playerEntityID);
        NetworkController.postMessage("P_INIT_SELF", 0, [
            Game.playerController.id,
            entityObject.name,
            entityObject.creatureType,
            entityObject.creatureSubType,
            entityObject.sex,
            entityObject.age,
            Game.playerController.mesh.name,
            Game.playerController.material.name,
            Game.playerController.collisionMesh.position.asArray(),
            Game.playerController.collisionMesh.rotation.asArray(),
            Game.playerController.collisionMesh.scaling.asArray(),
            Game.playerController.key.toBinary()
        ]);
        console.groupEnd();
        return 0;
    }
    static updateLocRotScaleSelf() {
        if (!Client.online) {
            return 1;
        }
        NetworkController.postMessage("P_UPDATE_LOCROTSCALE_SELF", 0, [
            Game.playerController.collisionMesh.position.asArray(),
            Game.playerController.collisionMesh.rotation.asArray(),
            Game.playerController.collisionMesh.scaling.asArray(),
            Game.playerController.key.toBinary()
        ]);
        return 0;
    }
    static updateMovementKeysSelf() {
        if (!Client.online) {
            return 1;
        }
        NetworkController.postMessage("P_UPDATE_MOVEMENTKEYS_SELF", 0, [Game.playerController.key.toBinary()]);
        return 0;
    }
    static requestPlayerByNetworkID(networkID) {
        if (!Client.online) {
            return 1;
        }
        console.group(`Running Client.requestPlayerByNetworkID(${networkID})`);
        NetworkController.postMessage("P_REQUEST_PLAYER", 0, [networkID]);
        console.groupEnd();
        return 0;
    }
    static requestAllPlayers() {
        console.group("Running Client.requestAllPlayers()");
        NetworkController.postMessage("P_REQUEST_ALL_PLAYERS");
        console.groupEnd();
        return 0;
    }
    static addPlayerToCreate(characterID, networkID) {
        if (Client.hasPlayerToCreate(characterID)) {
            return 0;
        }
        Client.playersToCreate[characterID] = {
            0:characterID,
            1:networkID
        };
        Client.playersToCreateCounter += 1;
        Client.hasBackloggedPlayers = true;
        return 0;
    }
    static removePlayerToCreate(characterID) {
        if (!Client.hasPlayerToCreate(characterID)) {
            return 0;
        }
        delete Client.playersToCreate[characterID];
        Client.playersToCreateCounter -= 1;
        return 0;
    }
    static hasPlayerToCreate(characterID) {
        return Client.playersToCreateCounter > 0 || Client.playersToCreate.hasOwnProperty(characterID);
    }
    static createBackloggedPlayers() {
        if (Client.playersToCreateCounter == 0 || Client.lockBackloggedPlayerCreation) {
            return 0;
        }
        Client.lockBackloggedPlayerCreation = true;
        for (let i in Client.playersToCreate) {
            if (CharacterEntity.has(Client.playersToCreate[i][0])) {
                let characterEntity = CharacterEntity.get(Client.playersToCreate[i][0]);
                if (characterEntity.hasController()) {
                    Client.setEntry(Client.playersToCreate[i][1], characterEntity);
                    Client.removePlayerToCreate(i);
                }
            }
        }
        Client.hasBackloggedPlayers = false;
        Client.lockBackloggedPlayerCreation = false;
        return 0;
    }
    static removeAllPlayers() {
        Client.networkEntries.forEach((abstractEntity, networkID) => {
            if (abstractEntity instanceof CharacterEntity) {
                Client.removeEntry(networkID);
                Game.removeCharacter(abstractEntity.getController());
            }
        });
        return 0;
    }
    static removeAllEntities() {
        Client.networkEntries.forEach((abstractEntity, networkID) => {
            if (abstractEntity instanceof CharacterEntity) {
                Client.removeEntry(networkID);
                if (abstractEntity instanceof CharacterEntity) {
                    Game.removeCharacter(abstractEntity.getController());
                }
                else if (abstractEntity instanceof InstancedItemEntity) {
                    Game.removeItemInSpace(abstractEntity.getController());
                }
                else if (abstractEntity instanceof InstancedFurnitureEntity) {
                    Game.removeFurniture(abstractEntity.getController());
                }
                else {
                    abstractEntity.dispose();
                }
            }
        });
        return 0;
    }
}