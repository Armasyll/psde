class CharacterEntityTrait extends EntityTrait {
    constructor(id = "", name = "", description = "", iconID = "genericItem") {
        super(id, name, description, iconID);
    }
    static allowedProperties() {
        return super.allowedProperties().concat([
            "hunger",
            "strengthOffset",
            "dexterityOffset",
            "constitutionOffset",
            "intelligenceOffset",
            "wisdomOffset",
            "charismaOffset",
            "magickMultiplier",
            "armourClass",
            "mana",
            "manaMaxOffset",
            "stamina",
            "staminaMaxOffset",
            "weight"
        ]);
    }
    allowedProperty(property) {
        return CharacterEntityTrait.allowedProperties().indexOf(property) != -1;
    }
}