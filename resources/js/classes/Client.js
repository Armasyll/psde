class Client {
	static initialize() {
        /**
         * Map of Network IDs to CharacterControllers
         * @type {String: CharacterController}
         */
        this.networkEntityMap = {};
        this.online = false;
        this.initialized = true;
        this.sendCount = 1;
	}
	static connect() {
		if (!this.initialized) {this.initialize();}
		NetworkController.initialize();
	}
	static disconnect(_updateChild = true) {
        var _timestamp = new Date().toLocaleTimeString({ hour12: false });
        this.removeAllPlayers();
        this.setOnline(false);
        GameGUI.chatOutputAppend(`${_timestamp} Server: Connection Closed.`);
        if (_updateChild) {
            NetworkController.initialized = false;
            NetworkController.socket = undefined;
        }
	}
    static isOnline() {
        return this.online;
    }
	static setOnline(_boolean) {
		this.online = (_boolean === true ? true : false);
	}
    static setPlayerEntry(_networkID) {
    	console.log("Client::setPlayerEntry(" + _networkID + ")");
        this.setEntry(Game.player.controller, _networkID);
    }
    static setEntry(_character, _networkID) {
        if (!(_character instanceof CharacterController)) {
        	_character = Game.getCharacterController(_character.controller);
        	if (!(_character instanceof CharacterController)) {
                return undefined;
            }
        }
        console.log("Client::setEntry(" + _character.id + ", " + _networkID + ")");

        this.removeEntry(_character);
        
        this.networkEntityMap[_networkID] = _character;
        _character.controller.setNetworkID(_networkID);
    }
    static getNetworkID(_character = Game.player.controller) {
    	if (_character instanceof CharacterController) {
    		return _character.networkID;
    	}
        else if (_character instanceof CharacterEntity) {
            return _character.controller.networkID;
        }
        else if (_character instanceof BABYLON.Mesh || _character instanceof BABYLON.InstancedMesh) {
            if (_character.hasOwnProperty("controller") && _character.controller instanceof CharacterController) {
                return _character.controller.networkID;
            }
            else {
                return undefined;
            }
        }
    	else if (typeof _character == "string") {
			return Game.getCharacterController(_character).networkID;
    	}
    	else {
    		return undefined;
    	}
    }
    static getController(_id) {
    	if (Tools.isInt(_id)) {
    		return Client.networkEntityMap[_id];
    	}
    	else {
    		return Game.getEntityController(_id);
    	}
    }
    static removeEntry(_character) {
        if (!(_character instanceof CharacterController)) {
        	_character = Client.getController(_character);
        	if (!(_character instanceof CharacterController)) {
                return undefined;
            }
        }
        delete this.networkEntityMap[_character.networkID];
        _character.networkID = undefined;
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
        return ;
    }
    static sendMessage(_message) {
        if (!Client.online) {
            return null;
        }
        if (!(_message instanceof Object)) {
            return undefined;
        }
        _message.sendCount = Client.sendCount
        NetworkController.socket.send(
            JSON.stringify(_message)
        );
        if (Client.sendCount >= Number.MAX_SAFE_INTEGER) {
        	Client.sendCount = 1;
        }
        else {
	        Client.sendCount++;
	    }
    }
    static requestJoinServer() {
        if (!Client.online) {
            return null;
        }
        Client.sendMessage({
            type: "P_REQUEST_JOIN_SERVER",
            content: "lemme in :v"
        });
    }
    static sendChatMessage(_message) {
        if (!Client.online) {
            return null;
        }
        Client.sendMessage({
            type: "P_CHAT_MESSAGE",
            content: _message
        });
    }
    static requestUUID(_message) {
        if (!Client.online) {
            return null;
        }
        Client.sendMessage({
            type: "P_REQUEST_UUID",
            content: _message
        });
    }
    static initializeSelf() {
        if (!Client.online) {
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
        if (!Client.online) {
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
        if (!Client.online) {
            return null;
        }
        Client.sendMessage({
            type: "P_UPDATE_MOVEMENTKEYS_SELF",
            content: [
                Game.player.controller.key.toNumber()
            ]
        });
    }
    static requestPlayerByNetworkID(_message) {
        if (!Client.online) {
            return null;
        }
        console.log("requestPlayerByNetworkID(" + _message + ")");
        Client.sendMessage({
            type: "P_REQUEST_PLAYER",
            content: _message
        });
    }
    static requestAllPlayers() {
        console.log("requestAllPlayers()");
        Client.sendMessage({
            type: "P_REQUEST_ALL_PLAYERS",
            content: ""
        });
    }
    static removeAllPlayers() {
        for (var _networkID in this.networkEntityMap) {
            if (_networkID != Game.player.controller.networkID) {
                Client.removeEntry(_data.content);
                Game.removeCharacter(_data.content);
            }
        }
    }
}