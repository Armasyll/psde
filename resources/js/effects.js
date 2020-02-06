new Effect("godMode", "God", "All powerful.", undefined).addModifier("godMode", OperationsEnum.SET, () => {return true;});
new Effect("essential", "Essential", "Cannot be killed.", undefined).addModifier("essential", OperationsEnum.SET, () => {return true;});
new Effect("healthy", "Healthy", "Increases maximum health.", undefined).addModifier("maxHealthModifier", OperationsEnum.ADD, 5).setStackCount(5);
new Effect("strong", "Strong", "Strong!", undefined).addModifier("strengthModifier", OperationsEnum.ADD, 2);
new Effect("weak", "Weak", "Weak.", undefined).addModifier("strengthModifier", OperationsEnum.SUBTRACT, 2);
new Effect("infiniteDollarBill", "Infinite Dollar Bill", "It's the inifinite dollar bill!", undefined).addModifier("money", OperationsEnum.SET, (characterEntity) => {return (characterEntity.money == 0 ? 1 : characterEntity.money);});

new Effect("heal", "Heal", "Heals and cures the diseases of a target living creature.", undefined).addModifier("health", OperationsEnum.ADD, (creatureEntity) => {
    if (creatureEntity.creatureType == CreatureTypeEnum.CONSTRUCT) {
        return 0;
    }
    else if (creatureEntity.creatureType == CreatureTypeEnum.UNDEAD) {
        return -70;
    }
    return 70;
}).addModifier("conditions", OperationsEnum.SUBTRACT, (creatureEntity) => {
    if (creatureEntity.creatureType == CreatureTypeEnum.CONSTRUCT || creatureEntity.creatureType == CreatureTypeEnum.UNDEAD) {
        return -1
    }
    else {
        return ConditionEnum.BLINDED;
    }
}).addModifier("conditions", OperationsEnum.SUBTRACT, (creatureEntity) => {
    if (creatureEntity.creatureType == CreatureTypeEnum.CONSTRUCT || creatureEntity.creatureType == CreatureTypeEnum.UNDEAD) {
        return -1
    }
    else {
        return ConditionEnum.DEAFENED;
    }
});
new Effect("healingWord", "Healing Word", "Heals a target living creature.", undefined).addModifier("health", OperationsEnum.ADD, (creatureEntity, casterEntity) => {
    if (creatureEntity.creatureType == CreatureTypeEnum.CONSTRUCT) {
        return 0;
    }
    let roll = Game.roll(1, 4);
    //roll += Game.calculateAbilityModifier(casterEntity.getSpellcastingAbility());
    if (creatureEntity.creatureType == CreatureTypeEnum.UNDEAD) {
        return -70;
    }
    return 70;
});