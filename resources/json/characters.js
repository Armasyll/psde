EntityLogic.createCharacterEntity("player", "Player", "It you :v", "genericCharacterIcon", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FOX, SexEnum.MALE, 18, "foxM", "foxRed", { "eyes": EyeEnum.CIRCLE, "eyesColour": "green"});
EntityLogic.createCharacterEntity("rinehart", "Rinehart Nye", undefined, "genericCharacterIcon", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FOX, SexEnum.MALE, 30, "foxM", "foxRinehart", { "eyes": EyeEnum.CIRCLE, "eyesColour": "violet" });
EntityLogic.createCharacterEntity("rosie", "Rosie", undefined, "genericCharacter", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FOX, SexEnum.FEMALE, 14, "foxF", "foxRed", { "eyes": EyeEnum.CIRCLE, "eyesColour": "blue" });
EntityLogic.createCharacterEntity("charlie", "Charlie", undefined, "charlieIcon", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FOX, SexEnum.FEMALE, 28, "foxF", "foxCorsac", { "eyes": EyeEnum.SLIT, "eyesColour": "blue" });
EntityLogic.createCharacterEntity("harley", "Harley", undefined, "genericRabbit", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FENNECFOX, SexEnum.FEMALE, 23, "foxHarley", { "eyes": EyeEnum.CIRCLE, "eyesColour": "brown" })
EntityLogic.createCharacterEntity("angelThrone", "Throne", undefined, "genericCharacter", CreatureTypeEnum.CELESTIAL, CreatureSubTypeEnum.NONE, SexEnum.NONE, 18, "angelThroneN", "angelThrone");

/*CharacterController.get("charlie").setIdleAnim("90_idleSquint01", 1, true);
CharacterController.get("charlie").setRunAnim("94_runningKneesBentSquint", 1, true);*/
CharacterEntity.get("charlie").setHealth("66");
CharacterEntity.get("charlie").setDialogue("charlieTalk");
CharacterEntity.get("rosie").setDialogue("rosieTalk");
CharacterEntity.get("rinehart").setDialogue("rinehartTalk");
CharacterEntity.get("rinehart").addItem(ItemEntity.get("mountainChocolateBar").createInstance("rinehartsChocolateBar"));
CharacterEntity.get("rinehart").hold("mountainChocolateBar");