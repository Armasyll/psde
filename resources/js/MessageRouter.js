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
				if (_data.content.nid == Game.player.networkID) {
					return undefined;
				}
				var _character = undefined;
				if (Game.getCharacter(_data.content[0]) instanceof CharacterController) {
					_character = Game.getCharacter(_data.content[0]).avatar;
				}
				else {
					_character = new CharacterController(Game.addCharacterMesh(
						_data.content[3],
						_data.content[0],
						{mass:0.8,restitution:0.1},
						_data.content[4],
						_data.content[5],
						_data.content[6]
					), _data.content[3]);
				}
				_character.setMovementKey(_data.content[7]);
				Game.setCharacterID(_character, _data.content[0]);
				Client.setEntry(_character, _data.content[1]);
				break;
			}
			case "S_DESTROY_PLAYER" : {
				console.log("S_DESTROY_PLAYER");
				if (_data.content == Game.player.networkID) {
					return undefined;
				}
				else {
					_character = Client.getCharacter(_data.content);
					Client.deleteEntry(_character);
					Game.deleteCharacter(_character);
				}
				break;
			}
			case "S_UPDATE_LOCROTSCALES_PLAYERS" : {
				console.log("S_UPDATE_LOCROTSCALES_PLAYERS");
				for (var _character in _data.content) {
					if (_data.content[_character][0] == Game.player.networkID) {}
					else {
						console.log("S_UPDATE_LOCROTSCALES_PLAYERS :     Checking for " + _data.content[_character][0]);
						if (Client.getCharacter(_data.content[_character][0]) instanceof CharacterController) {
							Client.getCharacter(_data.content[_character][0]).avatar.position.copyFrom(
								_data.content[_character][1]
							);
							Client.getCharacter(_data.content[_character][0]).avatar.rotation.copyFrom(
								_data.content[_character][2]
							);
							Client.getCharacter(_data.content[_character][0]).avatar.scaling.copyFrom(
								_data.content[_character][3]
							);
							Client.getCharacter(_data.content[_character][0]).setMovementKey(
								_data.content[_character][4]
							);
						}
						else {
							Client.requestPlayerByNetworkID(_data.content[_character][0]);
						}
					}
				}
				break;
			}
			case "S_PUBLIC_CHAT_MESSAGE" : {
				console.log("S_RECEIVE_PUBLIC_CHAT_MESSAGE : " + _data.content);
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