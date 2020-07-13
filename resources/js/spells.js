Game.createSpell("fireball", "Fireball", "It's a simple ball of fire.", "fireIcon01", "billboardInside3", "fireEffect01", {
    "spellType": SpellTypeEnum.EVOCATION,
    "spellLevel": 3,
    "spellSlots": 1,
    "damageType": DamageEnum.FIRE,
    "damageRoll": [8, 6],
    "targetRange": 46,
    "targetRadius": 6,
    "targetType": TargetEnum.SPHERE,
    "savingAbility": AbilityEnum.DEXTERITY,
    "castingTime": 1,
    "additionalSlotRolls": {4:[1,6],5:[2,6],6:[3,6],7:[4,6],8:[5,6],9:[6,6]}
});