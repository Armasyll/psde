class EntityEffect extends Effect {
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
        return EntityEffect.allowedProperties().indexOf(property) != -1;
    }
}