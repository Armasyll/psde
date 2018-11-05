class WeaponEntity extends ItemEntity {
    /**
     * Creats Weapon
     * @param  {String}  _id          Unique ID
     * @param  {String}  _name        Name
     * @param  {String}  _description Description
     * @param  {String}  _image       Image path or base64
     * @param  {String}  _type        weaponType
     * @param  {Boolean} _plural      Whether or not the item is plural
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _type = "club", _plural = false) {
        super(_id, _name, _description, _image, _plural);

        this.addAvailableAction("equip");
        this.addAvailableAction("unequip");
        this.setType(_type);

        Game.weaponEntities[this.id] = this;
    }
    setType(_type) {
        if (Game.kWeaponTypes.has(_type)) {
            this.type = _type;
        }
        else {
            this.type = "club";
        }
        return this;
    }
    dispose() {
        delete Game.weaponEntities[this.id];
        super.dispose();
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}