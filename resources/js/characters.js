let player = EntityLogic.createCharacterEntity("player", "Player", "It you :v", "genericCharacterIcon", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FOX, SexEnum.MALE, 18, "foxM", "foxRed", { "eyes": EyeEnum.CIRCLE, "eyesColour": "green"});
let rinehart = EntityLogic.createCharacterEntity("rinehart", "Rinehart Nye", undefined, "genericCharacterIcon", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FOX, SexEnum.MALE, 30, "foxM", "foxRinehart", { "eyes": EyeEnum.CIRCLE, "eyesColour": "violet" });
let rosie = EntityLogic.createCharacterEntity("rosie", "Rosie", undefined, "genericCharacter", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FOX, SexEnum.FEMALE, 14, "foxF", "foxRed", { "eyes": EyeEnum.CIRCLE, "eyesColour": "blue" });
let charlie = EntityLogic.createCharacterEntity("charlie", "Charlie", undefined, "charlieIcon", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FOX, SexEnum.FEMALE, 28, "foxF", "foxCorsac", { "eyes": EyeEnum.SLIT, "eyesColour": "blue" });
let harley = EntityLogic.createCharacterEntity("harley", "Harley", undefined, "genericRabbit", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FENNECFOX, SexEnum.FEMALE, 23, "foxHarley", { "eyes": EyeEnum.CIRCLE, "eyesColour": "brown" })
let angelThrone = EntityLogic.createCharacterEntity("angelThrone", "Throne", undefined, "genericCharacter", CreatureTypeEnum.CELESTIAL, CreatureSubTypeEnum.NONE, SexEnum.NONE, 18, "angelThroneN", "angelThrone");

/*CharacterController.get("charlie").setIdleAnim("90_idleSquint01", 1, true);
CharacterController.get("charlie").setRunAnim("94_runningKneesBentSquint", 1, true);*/
charlie.setHealth("66");
charlie.setDialogue("charlieTalk");
rosie.setDialogue("rosieTalk");
rinehart.setDialogue("rinehartTalk");
rinehart.addItem("mountainChocolateBar");
rinehart.hold("mountainChocolateBar");