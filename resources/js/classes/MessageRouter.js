class MessageRouter {
	static incoming(_data) {
		if (typeof _data.type != "string") {
			console.log("Incorrect incoming data `" + _data + "`");
			return undefined;
		}
		switch (_data.type) {
			case "S_ACCEPT_CONNECTION" : {
				console.log("S_ACCEPT_CONNECTION : Connection accepted; Received NID " + _data.content);
				Client.setOnline(true);
				Client.requestJoinServer();
				break;
			}
			case "S_ACCEPT_JOIN_SERVER" : {
				console.log("S_ACCEPT_JOIN_SERVER : Connection accepted; Received UUID " + _data.content);
				Client.requestUUID(_data.content);
				break;
			}
			case "S_DENY_JOIN_SERVER" : {
				console.log("S_DENY_JOIN_SERVER : Connection denied");
				break;
			}
			case "S_ACCEPT_UUID" : {
				console.log("S_ACCEPT_UUID : Connected with UUID " + _data.content.uuid + " and NID " + _data.content.nid);
				Game.setPlayerID(_data.content.uuid);
				Client.setPlayerEntry(_data.content.nid);

				Client.initializeSelf();
				break;
			}
			case "S_DENY_UUID" : {
				console.log("S_DENY_NID : Connection denied with UUID " + _data.content.uuid);
				break;
			}
			case "S_ACCEPT_INIT_SELF" : {
				console.log("S_ACCEPT_INIT_SELF");
				break;
			}
			case "S_DENY_INIT_SELF" : {
				console.log("S_DENY_INIT_SELF");
				break;
			}
			case "S_SEND_PLAYER" : {
				console.log("S_SEND_PLAYER");
				if (_data.content.nid == Client.getOwnNetworkID()) {
					return undefined;
				}
				if (Client.hasNetworkID(_data.content[1])) {
					let characterController = Client.getController(_data.content[1]).getController();
					characterController.setMovementKey(_data.content["movementKeys"]);
					if (characterController.getID() != _data.content[0]) {
						Game.setEntityID(characterController.getID(), _data.content[0]);
					}
					characterController.mesh.position.copyFrom(
						_data.content[8]
					);
					characterController.mesh.rotation.copyFrom(
						_data.content[9]
					);
					characterController.mesh.scaling.copyFrom(
						_data.content[10]
					);
					characterController.key.copyFrom(_data.content[11]);
				}
				else {
					Game.createCharacter(
						_data.content[0],
						_data.content[2],
						undefined,
						"genericRabbit",
						_data.content[3],
						_data.content[4],
						_data.content[5],
						_data.content[6],
						_data.content[7],
						{mass:0.8,restitution:0.1},
						_data.content[8],
						_data.content[9],
						_data.content[10]
					);
					Client.addPlayerToCreate(_data.content[0], _data.content[1]);
				}
				break;
			}
			case "S_DESTROY_PLAYER" : {
				console.log(`S_DESTROY_PLAYER (${_data.content})`);
				if (_data.content == Game.player.controller.networkID) {
					return undefined;
				}
				else {
					Client.removeEntry(_data.content);
					Game.removeCharacter(_data.content);
				}
				break;
			}
			case "S_UPDATE_LOCROTSCALES_PLAYERS" : {
				console.log("S_UPDATE_LOCROTSCALES_PLAYERS");
				for (let characterObject in _data.content) {
					if (_data.content[characterObject][0] == Game.player.controller.networkID) {}
					else if (isNaN(_data.content[characterObject][0])) {}
					else {
						console.log("S_UPDATE_LOCROTSCALES_PLAYERS :     Checking for " + _data.content[characterObject][0]);
						if (Client.hasNetworkID(_data.content[characterObject][0])) {
							let characterController = Client.getController(_data.content[characterObject][0]).getController();
							characterController.mesh.position.copyFrom(
								_data.content[characterObject][1]
							);
							characterController.mesh.rotation.copyFrom(
								_data.content[characterObject][2]
							);
							characterController.mesh.scaling.copyFrom(
								_data.content[characterObject][3]
							);
							characterController.key.copyFrom(_data.content[characterObject][4]);
						}
						else {
							Client.requestPlayerByNetworkID(_data.content[characterObject][0]);
						}
					}
				}
				break;
			}
			case "S_CHAT_MESSAGE" : {
				var _timestamp = new Date(_data.content.time * 1000).toLocaleTimeString({ hour12: false });
				var _name = Game.getCharacterEntity(_data.content.from).name;
				GameGUI.chatOutputAppend(`${_timestamp} ${_name}: ${_data.content.message}`);
				break;
			}
			case "S_SEND_ALL_PLAYERS" : {
				console.log("S_REQUEST_ALL_PLAYERS : " + _data.content);
				break;
			}
			default : {

			}
		}
	}
}