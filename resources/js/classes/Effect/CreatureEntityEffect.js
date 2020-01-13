class CreatureEntityEffect extends EntityEffect {
    constructor(id = "", name = "", description = "", iconID = "genericItem") {
        super(id, name, description, iconID);
    }
    static allowedProperties() {
        return super.allowedProperties().concat([
            "hungerModifier",
            "strengthModifier",
            "dexterityModifier",
            "constitutionModifier",
            "intelligenceModifier",
            "wisdomModifier",
            "charismaModifier",
            "staminaModifier",
            "armedModifier",
            "weightModifier",
            "proficiencyBonusModifier"
        ]);
    }
    allowedProperty(property) {
        return CreatureEntityEffect.allowedProperties().indexOf(property) != -1;
    }
}