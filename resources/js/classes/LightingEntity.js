class LightingEntity extends FurnitureEntity {
    /**
     * Creats Lighting
     * @param  {string}  id          Unique ID
     * @param  {string}  name        Name
     * @param  {string}  description Description
     * @param  {string}  iconID       Image ID
     */
    constructor(id = undefined, name = undefined, description = undefined, iconID = undefined, lightingType) {
        super(id, name, description, iconID, FurnitureEnum.LAMP);

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
    
    clone(id = undefined) {
        id = Tools.filterID(id);
        if (typeof id != "string") {
            id = Tools.genUUIDv4();
        }
        return new LightingEntity(id, this.name, this.description, this.icon);
    }
    dispose() {
        this.off();
        Game.removeLightingEntity(this.id);
        super.dispose();
        return undefined;
    }
}