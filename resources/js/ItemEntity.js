class ItemEntity extends Entity {
	constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _plural = false, _specialProperties = undefined, _defaultPrice = 0, _defaultWeight = 0.001, _defaultDurability = 1) {
        super(_id, _name, _description, _image);

        this.addAvailableAction("put");
        this.addAvailableAction("take");
        this.addAvailableAction("hold");

        this.addSpecialProperty(_specialProperties);

        if (typeof _plural != "boolean")
            _plural = false;
        this.plural = _plural;

        this.mass = 0.001;
        this.setMass(_defaultWeight);
        this.price = 0;
        this.setPrice(_defaultPrice);
        this.durability = 1;
        this.setDurability(_defaultDurability);

        Game.itemEntities[this.id] = this;
	}
	setMass(_float) {
		if (isNaN(_float)) {
			return;
		}
		this.mass = _float;
	}
	getMass() {
		return this.mass;
	}
	setPrice(_int) {
		if (isNaN(_int)) {
			return;
		}
		this.price = _int;
	}
	getPrice() {
		return this.price;
	}
	setDurability(_int) {
		if (isNaN(_int)) {
			return;
		}
		this.durability = _int;
	}
	getDurability() {
		return this.durability;
	}
	dispose() {
        delete Game.itemEntities[this.id];
        super.dispose();
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
	}
}