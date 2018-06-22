class Client {
	static initialize() {
        this.networkCharacterMap = {};
        this.online = false;
        this.initialized = true;
        this.sendCount = 1;
	}
	static connect() {
		if (!this.initialized) {this.initialize();}
		NetworkController.initialize();
	}
	static disconnect() {

	}
	static getOnline() {
		return this.online;
	}
	static setOnline(_boolean) {
		this.online = (_boolean === true ? true : false);
	}
    static setPlayerEntry(_networkID) {
    	console.log("Client::setPlayerEntry(" + _networkID + ")");
        this.setEntry(Game.player.characterController, _networkID);
    }
    static setEntry(_character, _networkID) {
    	console.log("Client::setEntry(" + _character.id + ", " + _networkID + ")");
        if (!(_character instanceof CharacterController)) {
        	_character = Game.getCharacter(_character);
        	if (!(_character instanceof CharacterController)) {return undefined;}
        }

        this.deleteEntry(_character);
        
        this.networkCharacterMap[_networkID] = _character;
        _character.setNetworkID(_networkID);
    }
    static getNetworkID(_character = Game.player.characterController) {
    	if (_character instanceof CharacterController) {
    		return _character.networkID;
    	}
    	else if (typeof _character == "string" && _character.length == 36) {
			return Client.getCharacterByID(_character).networkID;
    	}
    	else if (_character.hasOwnProperty("characterController") && _character.characterController instanceof CharacterController) {
    		return _character.characterController.networkID;
    	}
    	else {
    		return undefined;
    	}
    }
    static getCharacter(_id) {
    	if (isInt(_id)) {
    		return Client.networkCharacterMap[_id];
    	}
    	else {
    		return Game.getCharacter(_id);
    	}
    }
    static deleteEntry(_character) {
        if (!(_character instanceof CharacterController)) {
        	_character = Client.getCharacter(_character);
        	if (!(_character instanceof CharacterController)) {return undefined;}
        }
        delete this.networkCharacterMap[_character.networkID];
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
    static sendPublicChatMessage(_message) {
        if (!Client.online) {
            return null;
        }
        Client.sendMessage({
            type: "P_PUBLIC_CHAT_MESSAGE",
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
            content: {
            	id:Game.player.characterController.id,
                mesh:Game.player.characterController.meshID,
                position:Game.player.position,
                rotation:Game.player.rotation,
                scaling:Game.player.scaling,
            	moveForward:Game.player.characterController.moveForward,
				moveBackward:Game.player.characterController.moveBackward,
				runForward:Game.player.characterController.runForward,
				runBackward:Game.player.characterController.runBackward,
				strafeRight:Game.player.characterController.strafeRight,
				strafeLeft:Game.player.characterController.strafeLeft,
				turnRight:Game.player.characterController.turnRight,
				turnLeft:Game.player.characterController.turnLeft,
				jump:Game.player.characterController.jump
			}
        });
    }
    static updateLocRotSelf() {
        if (!Client.online) {
            return null;
        }
        Client.sendMessage({
            type: "P_UPDATE_LOCROT_SELF",
            content: [
            	Game.player.position,
            	Game.player.rotation,
            	Game.player.characterController.moveForward,
				Game.player.characterController.moveBackward,
				Game.player.characterController.runForward,
				Game.player.characterController.runBackward,
				Game.player.characterController.strafeRight,
				Game.player.characterController.strafeLeft,
				Game.player.characterController.turnRight,
				Game.player.characterController.turnLeft,
				Game.player.characterController.jump
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
}