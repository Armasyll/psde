let rinehart = Game.createCharacterEntity("rinehart", "Rinehart Nye", undefined, "genericCharacterIcon", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FOX, SexEnum.MALE, 30, "foxM", "foxRinehart", { eyes: EyeEnum.CIRCLE, eyesColour: "violet" });
let rosie = Game.createCharacterEntity("rosie", "Rosie", undefined, "rosieIcon", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FOX, SexEnum.FEMALE, 14, "foxF", "foxRed", { eyes: EyeEnum.CIRCLE, eyesColour: "blue" });
let charlie = Game.createCharacterEntity("charlie", "Charlie", undefined, "charlieIcon", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FOX, SexEnum.FEMALE, 28, "foxF", "foxCorsac", { eyes: EyeEnum.FERAL, eyesColour: "blue" });
let harley = Game.createCharacterEntity("harley", "Harley", undefined, "harleyIcon", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FENNECFOX, SexEnum.FEMALE, 23, "foxHarley", { eyes: EyeEnum.CIRCLE, eyesColour: "brown" })

/*CharacterController.get("charlie").setIdleAnim("90_idleSquint01", 1, true);
CharacterController.get("charlie").setRunAnim("94_runningKneesBentSquint", 1, true);*/
charlie.setHealth("66");
charlie.setDialogue("charlieTalk");
rosie.setDialogue("rosieTalk");
rinehart.setDialogue("rinehartTalk");
rinehart.addItem("mountainChocolateBar");
rinehart.hold("mountainChocolateBar");