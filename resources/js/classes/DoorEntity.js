class DoorEntity extends Entity {
    constructor(_id = undefined, _name = undefined, _description = undefined, _icon = "plainDoorIcon", _locked = false, _key = undefined, _opensInward = false, _open = false) {
        super(_id, _name, _description, _icon);
        this.entityType = EntityEnum.DOOR;
        this._isDoorLocked = false;
        this.key = null;
        this.open = false;
        this.opensInward = false;

        this.addAvailableAction(ActionEnum.CLOSE);
        this.addAvailableAction(ActionEnum.OPEN);
        this.addHiddenAvailableAction(ActionEnum.CLOSE);
        this.setDefaultAction(ActionEnum.OPEN);
        this.setDoorLocked(_locked);
        this.setKey(_key);
        this.setOpensInward(_opensInward);
        this.setOpen(_open);

        Game.setDoorEntity(this.id, this);
	}

    /**
     * Door lock, not to be confused with the functionality lock.
     * @param {boolean} isDoorLocked 
     */
	setDoorLocked(isDoorLocked) {
		this._isDoorLocked = isDoorLocked == true;
	}
	isDoorLocked() {
		return this._isDoorLocked;
	}
	setKey(itemEntity) {
        if (!(itemEntity instanceof ItemEntity)) {
            if (Game.hasItemEntity(itemEntity)) {
                itemEntity = Game.getItemEntity(itemEntity);
            }
            else {
                return 2;
            }
        }
        this.key = itemEntity;
        return 0;
	}
	getKey() {
		return this.key;
	}
    setOpen(_bool = true) {
        this.open = _bool == true;
        if (this.open) {
            if (this.hasController()) {
                this.controller.doOpen();
            }
            this.removeHiddenAvailableAction(ActionEnum.CLOSE);
            this.setDefaultAction(ActionEnum.CLOSE);
            this.addHiddenAvailableAction(ActionEnum.OPEN);
        }
        else {
            if (this.hasController()) {
                this.controller.doClose();
            }
            this.removeHiddenAvailableAction(ActionEnum.OPEN);
            this.setDefaultAction(ActionEnum.OPEN);
            this.addHiddenAvailableAction(ActionEnum.CLOSE);
        }
    }
    setClose() {
        this.open = false;
        if (this.hasController()) {
            this.controller.doClose();
        }
        this.setDefaultAction(ActionEnum.OPEN);
        this.addHiddenAvailableAction(ActionEnum.CLOSE);
    }
    getOpen() {
        return this.open;
    }
    setOpensInward(_bool = true) {
        this.opensInward = _bool == true;
        if (this.opensInward) {
            if (this.hasController()) {
                this.controller.setOpensInward();
            }
        }
        else {
            if (this.hasController()) {
                this.controller.setOpensOutward();
            }
        }
    }
    setOpensOutward() {
        this.opensInward = false;
        if (this.hasController()) {
            this.controller.setOpensOutward();
        }
    }
    getOpensInward() {
        return this.opensInward;
    }

	dispose() {
        Game.removeDoorEntity(this.id);
        super.dispose();
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
	}
}