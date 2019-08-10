class CharacterEntityTrait extends EntityTrait {
    constructor(id = "", name = "", description = "", iconID = "genericItem") {
        super(id, name, description, iconID);
    }
    static allowedProperties() {
        return super.allowedProperties().concat([
            "hungerOffset",
            "strengthOffset",
            "dexterityOffset",
            "constitutionOffset",
            "intelligenceOffset",
            "wisdomOffset",
            "charismaOffset",
            "magickMultiplier",
            "armourClass",
            "manaOffset",
            "manaMaxOffset",
            "staminaOffset",
            "staminaMaxOffset",
            "weight"
        ]);
    }
    allowedProperty(property) {
        return CharacterEntityTrait.allowedProperties().indexOf(property) != -1;
    }
}