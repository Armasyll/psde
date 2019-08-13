class InstancedEquipmentEntity extends InstancedItemEntity {
    constructor(_id = undefined, _entity = undefined, _owner = undefined) {
        super(_id, _entity);
        if (!(this.entity instanceof EquipmentEntity)) {
            this.dispose();
            return undefined;
        }

        this.setOwner(_owner);
    }

    getEquipmentSlot() {
        return this.entity.getEquipmentSlot();
    }
    hasAbilityScoreRequirement(...args) {
        return this.entity.hasAbilityScoreRequirement(...args);
    }
    getAbilityScoreRequirement(...args) {
        return this.entity.getAbilityScoreRequirement(...args);
    }
    hasAdvantageOn(...args) {
        return this.entity.hasAdvantageOn(...args);
    }
    getAdvantageOn() {
        return this.entity.getAdvantageOn();
    }
    hasDisadvantageOn(...args) {
        return this.entity.hasDisadvantageOn(...args);
    }
    getDisadvantageOn() {
        return this.entity.getDisadvantageOn();
    }

    clone(id = "") {
        return new InstancedEquipmentEntity(id, this.entity, this.owner);
    }
    dispose() {
        super.dispose()
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}