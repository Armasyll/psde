class WeaponEntityTrait extends EquipmentEntityTrait {
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
        return WeaponEntityTrait.allowedProperties().indexOf(property) != -1;
    }
}