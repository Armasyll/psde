// "effectsPriority": null
// "effectsPriority": ["charm"]
// "effectsPriority": [{"effect":"charm"}]
// "effectsPriority": [{"effect":"charm", "targetType":TargetEnum.SELF}]
// "effectsPriority": {20:["charm"]}
// "effectsPriority": {20:[{"effect":"charm"}]}
// "effectsPriority": {20:[{"effect":"charm", "targetType":TargetEnum.SELF}]}
EntityLogic.createSpell("charm", "Charm", "", "", "", "", {
    "spellType": SpellTypeEnum.ENCHANTMENT,
    "spellLevel": 1,
    "spellSlots": 1,
    "damageType": DamageEnum.NONE,
    "duration": 1,
    "targetRange": 9,
    "targetRadius": 0,
    "targetType": TargetEnum.OTHER,
    "savingAbility": AbilityEnum.WISDOM,
    "castingTime": 1,
    "additionalSlotTargets": {2:1, 3:2, 4:3, 5:4, 6:5, 7:8, 8:7, 9:8, 10:9},
    "effectsPriority": ["charm"]
});
EntityLogic.createSpell("fireball", "Fireball", "It's a simple ball of fire.", "fireIcon01", "billboardInside3", "fireEffect01", {
    "spellType": SpellTypeEnum.EVOCATION,
    "spellLevel": 3,
    "spellSlots": 1,
    "damageType": DamageEnum.FIRE,
    "damageRoll": [8, 6],
    "duration": 0,
    "targetRange": 46,
    "targetRadius": 6,
    "targetType": TargetEnum.SPHERE,
    "savingAbility": AbilityEnum.DEXTERITY,
    "castingTime": 1,
    "additionalSlotRolls": {4:[1,6],5:[2,6],6:[3,6],7:[4,6],8:[5,6],9:[6,6]}
});
EntityLogic.createSpell("firebolt", "Fire Bolt", "", "fireIcon01", "billboardInside3", "fireEffect01", {
    "spellType": SpellTypeEnum.EVOCATION,
    "spellLeve": 0,
    "spellSlots": 1,
    "damageType": DamageEnum.FIRE,
    "damageRoll": [1, 10],
    "duration": 0,
    "targetRange": 36.5,
    "targetRadius": 6,
    "targetType": TargetEnum.SPHERE,
    "casingTime": 1,
    "additionalLevelRolls": {5:[2,10],11:[3,10],17:[4,10]}
});