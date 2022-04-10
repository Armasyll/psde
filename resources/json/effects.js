new Effect("godMode", "God", "All powerful.", undefined).addModifier("godModeModifier", OperationsEnum.SET, () => {return true;});
new Effect("essential", "Essential", "Cannot be killed.", undefined).addModifier("essentialModifier", OperationsEnum.SET, () => {return true;});
new Effect("healthy", "Healthy", "Increases maximum health.", undefined).addModifier("maxHealthModifier", OperationsEnum.ADD, 5).setStackCount(5);
new Effect("strong", "Strong", "Strong!", undefined).addModifier("strengthModifier", OperationsEnum.ADD, 2);
new Effect("weak", "Weak", "Weak.", undefined).addModifier("strengthModifier", OperationsEnum.SUBTRACT, 2);
new Effect("infiniteDollarBill", "Infinite Dollar Bill", "It's the inifinite dollar bill!", undefined).addModifier("money", OperationsEnum.SET, (target) => {return (target.money == 0 ? 1 : target.money);});

new Effect("heal", "Heal", "Heals and cures the diseases of a target living creature.", undefined).addModifier("health", OperationsEnum.ADD, (target, actor = null) => {
    // When you cast this spell using a spell slot of 7th level or higher, the amount of Healing increases by 10 for each slot level above 6th.
    if (target.creatureType == CreatureTypeEnum.CONSTRUCT) {
        return 0;
    }
    else if (target.creatureType == CreatureTypeEnum.UNDEAD) {
        return -70;
    }
    return 70;
}).addModifier("conditions", OperationsEnum.SUBTRACT, (target) => {
    if (target.creatureType == CreatureTypeEnum.CONSTRUCT || target.creatureType == CreatureTypeEnum.UNDEAD) {
        return -1
    }
    else {
        return ConditionEnum.BLINDED;
    }
}).addModifier("conditions", OperationsEnum.SUBTRACT, (target) => {
    if (target.creatureType == CreatureTypeEnum.CONSTRUCT || target.creatureType == CreatureTypeEnum.UNDEAD) {
        return -1
    }
    else {
        return ConditionEnum.DEAFENED;
    }
});
new Effect("healingWord", "Healing Word", "Heals a target living creature.", undefined).addModifier("health", OperationsEnum.ADD, (target, actor = null, level = 1) => {
    if (target.creatureType == CreatureTypeEnum.CONSTRUCT) {
        return 0;
    }
    let roll = DND.roll(1, 4);
    //roll += DND5E.calculateAbilityModifier(casterEntity.getSpellcastingAbility());
    if (target.creatureType == CreatureTypeEnum.UNDEAD) {
        return -70;
    }
    return 70;
});
new Effect("foodRegeneration", "Eaten", "You've eaten recently.", undefined).addModifier("health", OperationsEnum.ADD, 1).setDuration(6);
new Effect("theobromineConsumption", "Consumed Theobromine", "You have consumed something with theobromine; maybe it was chocolate?", undefined).addModifier("health", OperationsEnum.ADD, (target, actor) => {
    if (target.creatureType == CreatureTypeEnum.HUMANOID && target.creatureSubType == CreatureSubTypeEnum.FOX) {
        return -1;
    }
    return 1;
}).setDuration(7);
new Effect("charm", "Charmed", undefined).addModifier("charmedBy", OperationsEnum.SET, (target, actor) => {
    target.removeHostileTo(actor);
    target.setCharmedBy(actor);
    return 0;
});