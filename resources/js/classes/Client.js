class Client {
	static initialize() {
        /**
         * Map of Network IDs to CharacterControllers
         * @type {String: CharacterController}
         */
        Client.networkEntries = new BidirectionalMap();
        Client._isOnline = false;
        Client.initialized = true;
        Client.sendCount = 1;
        Client.playersToCreate = {};
        Client.playersToCreateCounter = 0;
        Client.hasBackloggedPlayers = true;
        Client.lockBackloggedPlayerCreation = false;
        Client.networkID = "";
	}
	static connect() {
		if (!Client.initialized) {Client.initialize();}
		NetworkController.initialize();
	}
	static disconnect(_updateChild = true) {
        var _timestamp = new Date().toLocaleTimeString({ hour12: false });
        Client.removeAllPlayers();
        Client.setOnline(false);
        GameGUI.chatOutputAppend(`${_timestamp} Server: Connection Closed.`);
        if (_updateChild) {
            NetworkController.initialized = false;
            NetworkController.socket = undefined;
        }
	}
    static isOnline() {
        return Client._isOnline;
    }
	static setOnline(isOnline) {
        Client._isOnline = (isOnline == true);
        return 0;
	}
    static setPlayerEntry(networkID) {
        console.log(`Client::setPlayerEntry(${networkID})`);
        Client.networkID = networkID;
        return Client.setEntry(networkID, Game.player);
    }
    static setEntry(networkID, abstractEntity) {
        console.log(`Client::setEntry(${networkID}, ${abstractEntity.id})`);
        Client.networkEntries.set(networkID, abstractEntity);
        return 0;
    }
    static getNetworkID(abstractEntity = Game.player) {
        if (Client.networkEntries.hasValue(abstractEntity)) {
            return Client.networkEntries.getKey(abstractEntity);
        }
        return 1;
    }
    static getOwnNetworkID() {
        return this.networkID;
    }
    static getController(networkID) {
        if (Client.networkEntries.hasKey(networkID)) {
            return Client.networkEntries.getValue(networkID);
        }
        return 1;
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
        if (!Client._isOnline) {
            return "NONE";
        }
        switch (NetworkController.socket.readyState) {
            case 0 : return "CONNECTING";
            case 1 : return "OPEN";
            case 2 : return "CLOSING";
            case 3 : return "CLOSED";
        }
        return ;
    }
    static sendMessage(messageObject) {
        if (!Client._isOnline) {
            return null;
        }
        if (!(messageObject instanceof Object)) {
            return undefined;
        }
        messageObject.sendCount = Client.sendCount
        NetworkController.socket.send(
            JSON.stringify(messageObject)
        );
        if (Client.sendCount >= Number.MAX_SAFE_INTEGER) {
        	Client.sendCount = 1;
        }
        else {
	        Client.sendCount++;
	    }
    }
    static requestJoinServer() {
        if (!Client._isOnline) {
            return null;
        }
        Client.sendMessage({
            type: "P_REQUEST_JOIN_SERVER",
            content: "lemme in :v"
        });
    }
    static sendChatMessage(stringMessage) {
        if (!Client._isOnline) {
            return null;
        }
        Client.sendMessage({
            type: "P_CHAT_MESSAGE",
            content: stringMessage
        });
    }
    static requestUUID(stringUUID) {
        if (!Client._isOnline) {
            return null;
        }
        Client.sendMessage({
            type: "P_REQUEST_UUID",
            content: stringUUID
        });
    }
    static initializeSelf() {
        if (!Client._isOnline) {
            return null;
        }
        Client.sendMessage({
            type: "P_INIT_SELF",
            content: [
            	Game.player.getName(),
                Game.player.getAge(),
                Game.player.getSex(),
                Game.player.getSpecies(),
                Game.player.controller.textureID,
                Game.player.controller.meshID,
                Game.player.controller.mesh.position.x,
                Game.player.controller.mesh.position.y,
                Game.player.controller.mesh.position.z,
                Game.player.controller.mesh.rotation.y,
                Game.player.controller.mesh.scaling.x,
            	Game.player.controller.key.toNumber()
			]
        });
    }
    static updateLocRotScaleSelf() {
        if (!Client._isOnline) {
            return null;
        }
        Client.sendMessage({
            type: "P_UPDATE_LOCROTSCALE_SELF",
            content: [
                Game.player.controller.mesh.position.x,
                Game.player.controller.mesh.position.y,
                Game.player.controller.mesh.position.z,
                Game.player.controller.mesh.rotation.y,
                Game.player.controller.key.toNumber()
            ]
        });
    }
    static updateMovementKeysSelf() {
        if (!Client._isOnline) {
            return null;
        }
        Client.sendMessage({
            type: "P_UPDATE_MOVEMENTKEYS_SELF",
            content: [
                Game.player.controller.key.toNumber()
            ]
        });
    }
    static requestPlayerByNetworkID(networkID) {
        if (!Client._isOnline) {
            return null;
        }
        console.log("requestPlayerByNetworkID(" + networkID + ")");
        Client.sendMessage({
            type: "P_REQUEST_PLAYER",
            content: networkID
        });
    }
    static requestAllPlayers() {
        console.log("requestAllPlayers()");
        Client.sendMessage({
            type: "P_REQUEST_ALL_PLAYERS",
            content: ""
        });
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
        delete Game.playersToCreate[characterID];
        Client.playersToCreateCounter -= 1;
        return 0;
    }
    static hasPlayerToCreate(characterID) {
        return Client.playersToCreateCounter > 0 && Client.playersToCreate.hasOwnProperty(characterID);
    }
    static createBackloggedPlayers() {
        if (Client.playersToCreateCounter == 0 || Client.lockBackloggedPlayerCreation) {
            return true;
        }
        Client.lockBackloggedPlayerCreation = true;
        for (let i in Client.playersToCreate) {
            if (Game.hasCharacterEntity(Client.playersToCreate[i][0])) {
                let characterEntity = Game.getCharacterEntity(Client.playersToCreate[i][0]);
                if (characterEntity.hasController()) {
                    if (characterEntity.getID() != _data.content[1]) {
                        Game.setEntityID(characterEntity, _data.content[1]);
                    }
                    Client.setEntry(_data.content[0], characterEntity);
                }
                Client.removePlayerToCreate(i);
            }
        }
        Client.hasBackloggedPlayers = false;
        Client.lockBackloggedPlayerCreation = false;
        return 0;
    }
    static removeAllPlayers() {
        Client.networkEntries.forEach(function(abstractEntity, networkID) {
            if (abstractEntity instanceof CharacterEntity) {
                Client.removeEntry(networkID);
                Game.removeCharacter(abstractEntity.getController());
            }
        });
    }
    static removeAllEntities() {
        Client.networkEntries.forEach(function(abstractEntity, networkID) {
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
    }
}