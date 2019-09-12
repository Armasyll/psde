class CharacterEntityTrait extends EntityTrait {
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
        return CharacterEntityTrait.allowedProperties().indexOf(property) != -1;
    }
}