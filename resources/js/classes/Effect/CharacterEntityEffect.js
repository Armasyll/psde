class CharacterEntityEffect extends EntityEffect {
    constructor(id = "", name = "", description = "", iconID = "genericItem") {
        super(id, name, description, iconID);
    }
    static allowedProperties() {
        return super.allowedProperties().concat([
            "hungerOffset",
            "proficiencyOffset",
            "strengthOffset",
            "dexterityOffset",
            "constitutionOffset",
            "intelligenceOffset",
            "wisdomOffset",
            "charismaOffset"
        ]);
    }
    allowedProperty(property) {
        return CharacterEntityEffect.allowedProperties().indexOf(property) != -1;
    }
}