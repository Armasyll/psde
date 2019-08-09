class DoorEntity extends Entity {
    constructor(id = undefined, name = undefined, description = undefined, iconID = "plainDoorIcon", locked = false, key = undefined, opensInward = false, open = false) {
        super(id, name, description, iconID);
        this.entityType = EntityEnum.DOOR;
        this.doorLocked = false;
        this.key = null;
        this.open = false;
        this.opensInward = false;

        this.addAvailableAction(ActionEnum.CLOSE);
        this.addAvailableAction(ActionEnum.OPEN);
        this.addHiddenAvailableAction(ActionEnum.CLOSE);
        this.setDefaultAction(ActionEnum.OPEN);
        this.setDoorLocked(locked);
        this.setKey(key);
        this.setOpensInward(opensInward);
        this.setOpen(open);

        Game.setDoorEntity(this.id, this);
	}

    /**
     * Door lock, not to be confused with the functionality lock.
     * @param {boolean} isDoorLocked 
     */
	setDoorLocked(isDoorLocked) {
		this.doorLocked = isDoorLocked == true;
	}
	isDoorLocked() {
		return this.doorLocked;
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
    setOpen(open = true) {
        this.open = open == true;
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
    setOpensInward(opensInward = true) {
        this.opensInward = opensInward == true;
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
        this.setLocked(true);
        this.setEnabled(false);
        Game.removeDoorEntity(this.id);
        super.dispose();
        return undefined;
	}
}