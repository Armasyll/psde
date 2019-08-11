class EntityTrait extends Trait {
    constructor(id = "", name = "", description = "", iconID = "genericItem") {
        super(id, name, description, iconID);
    }
    static allowedProperties() {
        return super.allowedProperties().concat([
            "weightOffset",
            "priceOffset"
        ]);
    }
    allowedProperty(property) {
        return EntityTrait.allowedProperties().indexOf(property) != -1;
    }
}