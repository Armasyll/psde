Game.createCharacterEntity("rinehart", "Rinehart Nye", undefined, "genericCharacterIcon", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FOX, SexEnum.MALE, 30, "foxM", "foxRinehart", {eyes:EyeEnum.CIRCLE, eyesColour:"violet"});
Game.createCharacterEntity("rosie", "Rosie", undefined, "rosieIcon", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FOX, SexEnum.FEMALE, 14, "foxF", "foxRed", {eyes:EyeEnum.CIRCLE, eyesColour:"blue"});
Game.createCharacterEntity("charlie", "Charlie", undefined, "charlieIcon", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FOX, SexEnum.FEMALE, 28, "foxF", "foxCorsac", {eyes:EyeEnum.FERAL, eyesColour:"blue"});
Game.createCharacterEntity("harley", "Harley", undefined, "harleyIcon", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FENNECFOX, SexEnum.FEMALE, 23, "foxHarley", {eyes:EyeEnum.CIRCLE, eyesColour:"brown"})

/*CharacterController.get("charlie").setIdleAnim("90_idleSquint01", 1, true);
CharacterController.get("charlie").setRunAnim("94_runningKneesBentSquint", 1, true);*/
CharacterEntity.get("charlie").setHealth("66");
CharacterEntity.get("charlie").setDialogue("charlieTalk");
CharacterEntity.get("rosie").setDialogue("rosieTalk");
CharacterEntity.get("rinehart").setDialogue("rinehartTalk");
CharacterEntity.get("rinehart").addItem("mountainChocolateBar");
CharacterEntity.get("rinehart").hold("mountainChocolateBar");