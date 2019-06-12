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
        Client.playersToInitialize = {};
        Client.playersToInitializeCounter = 0;
        Client.hasBackloggedPlayersToInitialize = true;
        Client.lockBackloggedPlayerToInitialize = false;
        Client.networkID = "";
	}
	static connect() {
		if (!Client.initialized) {
            Client.initialize();
        }
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
        Game.doEntityActionFunction = Game.doEntityAction;
        Game.actionAttackFunction = Game.actionAttack;
        Game.actionCloseFunction = Game.actionClose;
        Game.actionDropFunction = Game.actionDrop;
        Game.actionEquipFunction = Game.actionEquip;
        Game.actionHoldFunction = Game.actionHold;
        Game.actionLayFunction = Game.actionLay;
        Game.actionOpenFunction = Game.actionOpen;
        Game.actionReleaseFunction = Game.actionRelease;
        Game.actionSitFunction = Game.actionSit;
        Game.actionTakeFunction = Game.actionTake;
        Game.actionTalkFunction = Game.actionTalk;
        Game.actionUnequipFunction = Game.actionUnequip;
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
        abstractEntity.getController().setNetworkID(networkID);
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
    static initializeSelf(stringUUID, networkID) {
        if (!Client._isOnline) {
            return 1;
        }
        if (!(Game.player instanceof CharacterEntity)) {
            Client.addPlayerToInitialize("00000000-0000-0000-0000-000000000000", stringUUID, networkID);
            return 1;
        }
        console.log(`Client::initializeSelf(${stringUUID}, ${networkID})`);
        Client.sendMessage({
            type: "P_INIT_SELF",
            content: [
                Game.player.getID(),
            	Game.player.getName(),
                Game.player.getAge(),
                Game.player.getSex(),
                Game.player.getSpecies(),
                Game.player.getMeshID(),
                Game.player.getMaterialID(),
                Game.player.controller.mesh.position,
                Game.player.controller.mesh.rotation,
                Game.player.controller.mesh.scaling,
            	Game.player.controller.key.toInteger()
			]
        });
        return 0;
    }
    static updateLocRotScaleSelf() {
        if (!Client._isOnline) {
            return null;
        }
        Client.sendMessage({
            type: "P_UPDATE_LOCROTSCALE_SELF",
            content: [
                Game.player.controller.mesh.position,
                Game.player.controller.mesh.rotation,
                Game.player.controller.mesh.scaling,
                Game.player.controller.key.toInteger()
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
                Game.player.controller.key.toInteger()
            ]
        });
    }
    static requestPlayerByNetworkID(networkID) {
        if (!Client._isOnline) {
            return null;
        }
        console.log(`Client::requestPlayerByNetworkID(${networkID})`);
        Client.sendMessage({
            type: "P_REQUEST_PLAYER",
            content: networkID
        });
    }
    static requestAllPlayers() {
        console.log("Client::requestAllPlayers()");
        Client.sendMessage({
            type: "P_REQUEST_ALL_PLAYERS",
            content: ""
        });
    }
    static addPlayerToInitialize(characterID, newCharacterID, networkID) {
        console.log(`Client::addPlayerToInitialize(${characterID}, ${newCharacterID}, ${networkID})`);
        if (Client.hasPlayerToUpdate(characterID)) {
            return 0;
        }
        Client.playersToInitialize[characterID] = {
            0:characterID,
            1:newCharacterID,
            2:networkID
        }
        Client.playersToInitializeCounter += 1;
        Client.hasBackloggedPlayersToInitialize = true;
        return 0;
    }
    static removePlayerToUpdate(characterID) {
        if (!Client.hasPlayerToUpdate(characterID)) {
            return 0;
        }
        delete Client.playersToInitialize[characterID];
        Client.playersToInitializeCounter -= 1;
        return 0;
    }
    static hasPlayerToUpdate(characterID) {
        return Client.playersToInitializeCounter > 0 || Client.playersToInitialize.hasOwnProperty(characterID);
    }
    static updateBackloggedPlayers() {
        if (Client.playersToInitializeCounter == 0 || Client.lockBackloggedPlayerUpdate) {
            return true;
        }
        console.log("Client::updateBackloggedPlayers()");
        Client.lockBackloggedPlayerToInitialize = true;
        for (let i in Client.playersToInitialize) {
            if (Game.hasCharacterEntity(Client.playersToInitialize[i][0]) && Game.getCharacterEntity(Client.playersToInitialize[i][0]).hasController()) {
                let oldID = Client.playersToInitialize[i][0];
                let newID = Client.playersToInitialize[i][1];
                let networkID = Client.playersToInitialize[i][2];
                let abstractEntity = Game.getCharacterEntity(oldID);
				Game.setEntityID(oldID, newID);
                if (abstractEntity == Game.player) {
                    Client.setPlayerEntry(networkID);
                }
                else {
                    Client.setEntry(networkID, abstractEntity);
                }
                Client.removePlayerToUpdate(i);
                Client.initializeSelf(newID, networkID);
            }
        }
        Client.hasBackloggedPlayersToInitialize = false;
        Client.lockBackloggedPlayerToInitialize = false;
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
            return true;
        }
        Client.lockBackloggedPlayerCreation = true;
        for (let i in Client.playersToCreate) {
            if (Game.hasCharacterEntity(Client.playersToCreate[i][0])) {
                let characterEntity = Game.getCharacterEntity(Client.playersToCreate[i][0]);
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
    static requestEntityAction(entity, subEntity, actionID) {
        if (!(entity instanceof AbstractEntity) && entity != null) {
            return 2;
        }
        if (!(subEntity instanceof AbstractEntity)) {
            return 2;
        }
        if (!(ActionEnum.properties.hasOwnProperty(actionID))) {
            return 2;
        }
        console.log(`Client::requestEntityAction(${entity.getID()}, ${subEntity.getID()}, ${actionID})`);
        if (entity instanceof AbstractEntity) {
            Client.sendMessage({
                type: "P_REQUEST_ENTITY_ACTION",
                content: [
                    entity.getType(),
                    entity.getID(),
                    subEntity.getType(),
                    subEntity.getID(),
                    actionID
                ]
            });
        }
        else {
            Client.sendMessage({
                type: "P_REQUEST_ENTITY_ACTION",
                content: [
                    EntityEnum.NONE,
                    null,
                    subEntity.getType(),
                    subEntity.getID(),
                    actionID
                ]
            });
        }
        return 0;
    }
    static actionAttack(entity, subEntity, callback) {
        if (!(entity instanceof AbstractEntity) || !(entity.getController() instanceof EntityController)) {
            return 2;
        }
        if (!(subEntity instanceof CharacterEntity)) {
            return 2;
        }
        Client.requestEntityAction(entity, subEntity, ActionEnum.ATTACK);
        return 0;
    }
    static actionClose(entity, subEntity, callback) {
        if (!(entity instanceof AbstractEntity) || !(entity.getController() instanceof EntityController)) {
            return 2;
        }
        if (!(subEntity instanceof CharacterEntity)) {
            return 2;
        }
        Client.requestEntityAction(entity, subEntity, ActionEnum.CLOSE);
        return 0;
    }
    static actionDrop(entity, subEntity, callback) {
        if (!(entity instanceof InstancedItemEntity)) {
            return 2;
        }
        if (!(subEntity instanceof CharacterEntity)) {
            return 2;
        }
        Client.requestEntityAction(entity, subEntity, ActionEnum.DROP);
        return 0;
    }
    static actionEquip(entity, subEntity, callback) {
        if (!(entity instanceof InstancedItemEntity)) {
            return 2;
        }
        if (!(subEntity instanceof CharacterEntity)) {
            return 2;
        }
        Client.requestEntityAction(entity, subEntity, ActionEnum.EQUIP);
        return 0;
    }
    static actionHold(entity, subEntity, callback) {
        if (!(entity instanceof InstancedItemEntity)) {
            return 2;
        }
        if (!(subEntity instanceof CharacterEntity)) {
            return 2;
        }
        Client.requestEntityAction(entity, subEntity, ActionEnum.HOLD);
        return 0;
    }
    static actionLay(entity, subEntity, callback) {
        if (!(entity instanceof AbstractEntity) && entity != null) {
            return 2;
        }
        if (!(subEntity instanceof CharacterEntity)) {
            return 2;
        }
        Client.requestEntityAction(entity, subEntity, ActionEnum.LAY);
        return 0;
    }
    static actionOpen(entity, subEntity, callback) {
        if (!(entity instanceof AbstractEntity) || !(entity.getController() instanceof EntityController)) {
            return 2;
        }
        if (!(subEntity instanceof CharacterEntity)) {
            return 2;
        }
        Client.requestEntityAction(entity, subEntity, ActionEnum.OPEN);
        return 0;
    }
    static actionRelease(entity, subEntity, callback) {
        if (!(entity instanceof InstancedItemEntity)) {
            return 2;
        }
        if (!(subEntity instanceof CharacterEntity)) {
            return 2;
        }
        Client.requestEntityAction(entity, subEntity, ActionEnum.RELEASE);
        return 0;
    }
    static actionSit(entity, subEntity, callback) {
        if (!(entity instanceof AbstractEntity) && entity != null) {
            return 2;
        }
        if (!(subEntity instanceof CharacterEntity)) {
            return 2;
        }
        Client.requestEntityAction(entity, subEntity, ActionEnum.SIT);
        return 0;
    }
    static actionTake(entity, subEntity, callback) {
        if (!(entity instanceof InstancedItemEntity)) {
            return 2;
        }
        if (!(subEntity instanceof CharacterEntity)) {
            return 2;
        }
        Client.requestEntityAction(entity, subEntity, ActionEnum.TAKE);
        return 0;
    }
    static actionTalk(entity, subEntity, callback) {
        return 0;
    }
    static actionUnequip(entity, subEntity, callback) {
        if (!(entity instanceof InstancedItemEntity)) {
            return 2;
        }
        if (!(subEntity instanceof CharacterEntity)) {
            return 2;
        }
        Client.requestEntityAction(entity, subEntity, ActionEnum.UNEQUIP);
        return 0;
    }
}