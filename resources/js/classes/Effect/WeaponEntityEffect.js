class WeaponEntityEffect extends EquipmentEntityEffect {
    constructor(id = "", name = "", description = "", iconID = "genericItem") {
        super(id, name, description, iconID);
    }
    static allowedProperties() {
        return super.allowedProperties().concat([
            "damageRollCountOffset",
            "damageRollOffset",
            "silveredOffset"
        ]);
    }
    allowedProperty(property) {
        return WeaponEntityEffect.allowedProperties().indexOf(property) != -1;
    }
}