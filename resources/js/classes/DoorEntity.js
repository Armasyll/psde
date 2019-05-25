class DoorEntity extends Entity {
    constructor(_id = undefined, _name = undefined, _description = undefined, _icon = "plainDoorIcon", _locked = false, _key = undefined, _opensInward = false, _open = false) {
        super(_id, _name, _description, _icon);
        this.entityType = EntityEnum.DOOR;
        this.locked = false;
        this.key = null;
        this.open = false;
        this.opensInward = false;

        this.addAvailableAction(ActionEnum.CLOSE);
        this.addAvailableAction(ActionEnum.OPEN);
        this.addHiddenAvailableAction(ActionEnum.CLOSE);
        this.setDefaultAction(ActionEnum.OPEN);
        this.setLocked(_locked);
        this.setKey(_key);
        this.setOpensInward(_opensInward);
        this.setOpen(_open);

        Game.setDoorEntity(this.id, this);
	}

	setLocked(_bool) {
		this.locked = _bool == true;
	}
	getLocked() {
		return this.locked;
	}
	setKey(_itemEntity) {
		_itemEntity = Game.getItemEntity(_itemEntity);
		if (_itemEntity == undefined) {
            return;
        }
		this.key = _itemEntity;
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