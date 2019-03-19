class LightingEntity extends FurnitureEntity {
    /**
     * Creats Lighting
     * @param  {String}  _id          Unique ID
     * @param  {String}  _name        Name
     * @param  {String}  _description Description
     * @param  {String}  _image       Image ID
     */
    constructor(_id = undefined, _name = undefined, _description = undefined, _image = undefined, _lightType) {
        super(_id, _name, _description, _image, FurnitureEnum.LAMP);

        this.lightOn = true;

        this.addAvailableAction(ActionEnum.USE);
        this.setDefaultAction(ActionEnum.USE);

        Game.setLightingEntity(this.id, this);
    }

    on() {
        if (this._isLocked) {
            return this.lightOn;
        }
        this.lightOn = true;
        if (this.hasController()) {
            if (this.controller.hasLight()) {
                this.controller.getLight().setEnabled(true);
            }
        }
    }
    off() {
        if (this._isLocked) {
            return this.lightOn;
        }
        this.lightOn = false;
        if (this.hasController()) {
            if (this.controller.hasLight()) {
                this.controller.getLight().setEnabled(false);
            }
        }
    }
    toggle() {
        if (this._isLocked) {
            return this.lightOn;
        }
        if (this.lightOn) {
            this.off();
            return false;
        }
        else {
            this.on();
            return true;
        }
    }
    
    clone(_id = undefined) {
        _id = Game.filterID(_id);
        if (typeof _id != "string") {
            _id = genUUIDv4();
        }
        return new LightingEntity(_id, this.name, this.description, this.image);
    }
    dispose() {
        Game.removeLightingEntity(this.id);
        super.dispose();
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}