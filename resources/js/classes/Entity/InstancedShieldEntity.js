class InstancedShieldEntity extends InstancedClothingEntity {
    constructor(id = undefined, shieldEntity = undefined, owner = undefined) {
        super(id, shieldEntity);
        if (!(this.entity instanceof ShieldEntity)) {
            this.dispose();
            return undefined;
        }

        this.setOwner(owner);

        Game.setShieldInstance(this.id, this);
    }

    clone(id) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        return new InstancedShieldEntity(id, this.entity, owner);
    }
    dispose() {
        Game.removeShieldInstance(this.id);
        super.dispose();
        return undefined;
    }
}