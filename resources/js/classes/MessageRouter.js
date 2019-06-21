class MessageRouter {
	static incoming(_data) {
		if (typeof _data.type != "string") {
			console.log("Incorrect incoming data.");
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
				Client.initializeSelf(_data.content.uuid, _data.content.nid);
				break;
			}
			case "S_DENY_UUID" : {
				console.log("S_DENY_NID : Connection denied with UUID " + _data.content.uuid);
				break;
			}
			case "S_ACCEPT_INIT_SELF" : {
				console.log("S_ACCEPT_INIT_SELF");
				Game.doEntityActionFunction = Client.requestEntityAction;
				Game.actionAttackFunction = Client.actionAttack;
				Game.actionCloseFunction = Client.actionClose;
				Game.actionDropFunction = Client.actionDrop;
				Game.actionEquipFunction = Client.actionEquip;
				Game.actionHoldFunction = Client.actionHold;
				Game.actionLayFunction = Client.actionLay;
				Game.actionOpenFunction = Client.actionOpen;
				Game.actionReleaseFunction = Client.actionRelease;
				Game.actionSitFunction = Client.actionSit;
				Game.actionTakeFunction = Client.actionTake;
				Game.actionTalkFunction = Client.actionTalk;
				Game.actionUnequipFunction = Client.actionUnequip;
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
					characterController.mesh.position.copyFrom(BABYLON.Vector3.FromArray(_data.content[8]));
					characterController.mesh.rotation.copyFrom(BABYLON.Vector3.FromArray(_data.content[9]));
					characterController.mesh.scaling.copyFrom(BABYLON.Vector3.FromArray(_data.content[10]));
					characterController.key.fromBinary(_data.content[11]);
				}
				else {
					console.log(_data.content);
					Game.createCharacter(
						_data.content[1],
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
					Client.addPlayerToCreate(_data.content[1], _data.content[0]);
				}
				break;
			}
			case "S_DESTROY_PLAYER" : {
				console.log(`S_DESTROY_PLAYER (${_data.content})`);
				if (_data.content == Client.getOwnNetworkID()) {
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
					if (_data.content[characterObject][0] == Client.getOwnNetworkID()) {}
					else if (isNaN(_data.content[characterObject][0])) {}
					else {
						console.log("S_UPDATE_LOCROTSCALES_PLAYERS :     Checking for " + _data.content[characterObject][0]);
						if (Client.hasNetworkID(_data.content[characterObject][0])) {
							let characterController = Client.getController(_data.content[characterObject][0]).getController();
							characterController.mesh.position.copyFrom(BABYLON.Vector3.FromArray(_data.content[characterObject][1]));
							characterController.mesh.rotation.copyFrom(BABYLON.Vector3.FromArray(_data.content[characterObject][2]));
							characterController.mesh.scaling.copyFrom(BABYLON.Vector3.FromArray(_data.content[characterObject][3]));
							characterController.key.fromBinary(_data.content[characterObject][4]);
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
				console.log("S_REQUEST_ALL_PLAYERS : ");
				console.log(_data.content);
				break;
			}
			case "S_DO_ENTITY_ACTION" : {
				/*
					0: EntityEnum Entity's EntityType
					1: AbstractEntity Entity
					2: EntityEnum SubEntity's EntityType
					3: AbstractEntity SebEntity
					4: ActionEnum Action SubEntity is doing to Entity
					5: [number] Depends on the ActionEnum; if it's ActionEnum.ATTACK, then this is the attack damage
				*/
				let entityType = Number.parseInt(_data.content[0]);
				let subEntityType = Number.parseInt(_data.content[2]);
				let actionID = Number.parseInt(_data.content[4]);
				if (!Game.hasEntity(_data.content[1]) && !Game.hasInstancedEntity(_data.content[1])) {
					console.log(`\tEntity (${EntityEnum.properties[_data.content[0]].key}:${_data.content[1]}) does not exist!`);
					return 2;
				}
				if (!Game.hasEntity(_data.content[3]) && !Game.hasInstancedEntity(_data.content[3])) {
					console.log(`\tSub-Entity (${EntityEnum.properties[_data.content[3]].key}:${_data.content[3]}) does not exist!`);
					return 2;
				}
				if (!ActionEnum.properties.hasOwnProperty(_data.content[4])) {
					console.log(`\tAction (${_data.content[4]}) does not exist!`);
					return 2;
				}
				console.log(`S_DO_ENTITY_ACTION ${_data.content.join(',')}`);
				let entity = Game.getEntity(_data.content[1]) || Game.getInstancedEntity(_data.content[1]);
				let subEntity = Game.getEntity(_data.content[3]) || Game.getInstancedEntity(_data.content[3]);
				if (_data.content[4] == ActionEnum.ATTACK) {
					Game.actionAttack(entity, subEntity, (_data.content[5] || 0));
				}
				else {
					Game.doEntityAction(entity, subEntity, _data.content[4]);
				}
				break;
			}
			default : {
				console.log(`Incorrect incoming data type (${_data.type})`);
			}
		}
	}
}