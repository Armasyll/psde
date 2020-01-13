class CharacterEntityEffect extends CreatureEntityEffect {
    constructor(id = "", name = "", description = "", iconID = "genericItem") {
        super(id, name, description, iconID);
    }
    static allowedProperties() {
        return super.allowedProperties();
    }
    allowedProperty(property) {
        return CharacterEntityEffect.allowedProperties().indexOf(property) != -1;
    }
}