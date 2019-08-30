class AbstractEntity {
    /**
     * Creates an AbstractEntity
     * @param  {string} id Unique ID, auto-generated if none given
     * @param  {string} name Name
     * @param  {string} [description] Description
     * @param  {string} [iconID] Icon ID
     */
    constructor(id = "", name = "", description = "", iconID = "genericItem") {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        this.id = id;
        this.entityType = EntityEnum.ABSTRACT;
        this.name = null;
        this.setName(name);
        this.description = null;
        this.setDescription(description);
        this.iconID = null;
        this.setIcon(iconID);
        this.controller = null;
        this.owner = null;
        this.target = null;
        this.health = 10;
        this.healthOffset = 0;
        this.healthMax = 10;
        this.healthMaxOffset = 0;
        this.availableActions = {};
        this.hiddenAvailableActions = {};
        this.specialProperties = new Set();
        this.defaultAction = null;
        this.godMode = false;
        this.godModeOffset = false;
        this.enabled = true;
        this.locked = false;
        this.essential = false;
        this.essentialOffset = false;
        /**
         * Object<number, Map<Trait, number>>
         * <Priority, <Trait, Stack>>
         */
        this.traits = {};
        Game.setAbstractEntity(this.id, this);
    }

    getID() {
        return this.id;
    }
    setID(id) {
        if (this.locked) {
            id = Tools.filterID(id);
            if (id.length > 0) {
                this.id = id;
            }
            return 0;
        }
        return 1;
    }
    getType() {
        return this.entityType;
    }
    setName(name) {
        this.name = Tools.filterName(name);
        return 0;
    }
    getName() {
        return this.name;
    }
    setDescription(description) {
        this.description = Tools.filterName(description);
        return 0;
    }
    getDescription() {
        return this.description;
    }
    setIcon(iconID) {
        if (Game.hasIcon(iconID)) {
            this.iconID = iconID;
        }
        else {
            this.iconID = "missingIcon";
        }
        return 0;
    }
    getIcon() {
        return this.iconID;
    }

    setHealth(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        if (this.getGodMode()) {
            this.health = this.getMaxHealth();
            return this;
        }
        if (number > this.healthMax) {
            number = this.healthMax;
        }
        else if (number < 0) {
            number = 0;
        }
        if (this.isEssential()) {
            if (number < 1) {
                number = 1;
            }
        }
        this.health = number;
        if (this.health <= 0) {
            this.living = false;
            if (this.hasController()) {
                this.controller.doDeath();
            }
        }
        return this;
    }
    addHealth(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (number > 0) {
            this.setHealth(this.health + number);
        }
        return this;
    }
    subtractHealth(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (number > 0) {
            this.setHealth(this.health - number);
        }
        return this;
    }
    getHealth() {
        return this.health + this.healthOffset;
    }

    setMaxHealth(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        if (number <= 0) {
            number = 1;
        }
        this.healthMax = number;
        if (this.health > this.getMaxHealth()) {
            this.health = this.getMaxHealth();
        }
        return this;
    }
    addMaxHealth(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (number > 0) {
            this.setMaxHealth(this.healthMax + number);
        }
        return this;
    }
    subtractMaxHealth(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (number > 0) {
            this.setMaxHealth(this.healthMax - number);
        }
        return this;
    }
    getMaxHealth() {
        return this.healthMax + this.healthMaxOffset;
    }

    setGodMode(boolean = true) {
        this.godMode = boolean == true;
        return this;
    }
    enableGodMode() {
        this.setGodMode(true);
        return this;
    }
    disableGodMode() {
        this.setGodMode(false);
        return this;
    }
    getGodMode() {
        return this.godMode || this.godModeOffset;
    }

    isEnabled() {
        return this.enabled == true;
    }
    setEnabled(isEnabled = true) {
        this.enabled = (isEnabled == true);
        return 0;
    }

    isLocked() {
        return this.locked == true;
    }
    setLocked(isLocked = true) {
        this.locked = (isLocked == true);
        return 0;
    }

    setController(entityController) {
        if (entityController instanceof EntityController) {
            this.controller = entityController;
            return 0;
        }
        return 2;
    }
    getController() {
        return this.controller;
    }
    hasController() {
        return this.controller instanceof EntityController;
    }
    removeController() {
        this.controller = undefined;
        return 0;
    }

    /**
     * Sets Owner
     * @param {CharacterEntity} characterEntity Character, or undefined
     */
    setOwner(characterEntity) {
        if (!(characterEntity instanceof AbstractEntity)) {
            if (Game.hasInstancedEntity(characterEntity)) {
                characterEntity = Game.getInstancedEntity(characterEntity);
            }
            else if (Game.hasEntity(characterEntity)) {
                characterEntity = Game.getEntity(characterEntity);
            }
            else {
                return 2;
            }
        }
        this.owner = characterEntity;
        return 0;
    }
    getOwner() {
        return this.owner;
    }
    hasOwner() {
        return this.owner instanceof AbstractEntity;
    }
    removeOwner() {
        this.owner = null;
        return 0;
    }
    clearOwner() {
        return this.removeOwner();
    }

    setTarget(abstractEntity) {
        if (!(abstractEntity instanceof AbstractEntity)) {
            if (Game.hasInstancedEntity(abstractEntity)) {
                abstractEntity = Game.getInstancedEntity(characterEntity);
            }
            else if (Game.hasEntity(characterEntity)) {
                abstractEntity = Game.getEntity(abstractEntity);
            }
            else {
                return 2;
            }
        }
        this.target = abstractEntity;
        return 0;
    }
    getTarget() {
        return this.target;
    }
    hasTarget() {
        return this.target instanceof AbstractEntity;
    }
    removeTarget() {
        this.target = null;
        return 0;
    }
    clearTarget() {
        return this.removeTarget();
    }

    setEssential(isEssential = true) {
        this.essential = isEssential == true;
        if (this.essential) {
            Game.setEssentialEntity(this);
        }
        else {
            Game.removeEssentialEntity(this);
        }
        return 0;
    }
    isEssential() {
        return this.essential || this.essentialOffset;
    }

    kill() {
        this.setHealth(0);
        return 0;
    }
    resurrect(number = 1) {
        if (typeof number != "number") { number = Number.parseInt(number) | 1; }
        else { number = Math.abs(number | 0) || 1 }
        this.setHealth(number);
        this.living = true;
        return 0;
    }

    addTrait(trait) {
        if (!(trait instanceof Trait)) {
            if (Game.hasTrait(trait)) {
                trait = Game.getTrait(trait);
            }
            else {
                return 2;
            }
        }
        for (let property in trait.getModifiers()) {
            if (!this.hasOwnProperty(property)) {
                return 1;
            }
        }
        let i = trait.getPriority();
        if (!this.traits.hasOwnProperty(i)) {
            this.traits[i] = new Map();
        }
        if (this.traits[i].has(trait)) {
            if (this.traits[i].get(trait) < trait.getStackCount()) {
                this.traits[i].set(trait, this.traits[i].get(trait) + 1);
            }
        }
        else {
            this.traits[i].set(trait, 1);
        }
        this.applyTraits();
        return 0;
    }
    removeTrait(trait) {
        if (!(trait instanceof Trait)) {
            if (Game.hasTrait(trait)) {
                trait = Game.getTrait(trait);
            }
            else {
                return 2;
            }
        }
        let i = trait.getPriority();
        if (this.traits.hasOwnProperty(i)) {
            if (this.traits[i].has(trait)) {
                if (this.traits[i].get(trait) == 1) {
                    this.traits[i].delete(trait);
                    if (Object.keys(this.traits[i]).length == 0) {
                        delete this.traits[i];
                    }
                }
                else {
                    this.traits[i].set(trait, this.traits[i].get(trait) - 1);
                }
            }
        }
        this.applyTraits();
        return 0;
    }
    applyTraits() {
        this.resetOffsets();
        for (let priority in this.traits) {
            this.traits[priority].forEach((stackCount, trait) => {
                for (let modifier in trait.getModifiers()) {
                    if (this.hasOwnProperty(modifier)) {
                        for (let i = 0; i < stackCount; i++) {
                            this[modifier] = trait.getModifier(modifier)(this);
                        }
                    }
                }
            });
        }
        return 0;
    }
    getTraits() {
        return this.traits;
    }
    cloneTraits() {
        let obj = {};
        for (let priority in this.traits) {
            obj[priority] = new Map(this.traits[priority]);
        }
        return obj;
    }
    clearTraits() {
        for (let priority in this.traits) {
            obj[priority].clear();
            delete obj[priority];
        }
        this.resetOffsets();
        return 0;
    }
    resetOffsets() {
        this.godModeOffset = false;
        this.essentialOffset = false;
        this.healthOffset = 0;
        this.healthMaxOffset = 0;
    }

    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        this.clearTarget();
        if (this.hasController()) {
            this.controller.setLocked(true);
            this.controller.setEnabled(false);
            this.controller.dispose();
        }
        for (let action in this.availableActions) {
            if (this.availableActions[action] instanceof ActionData) {
                this.availableActions[action].dispose();
            }
        }
        Game.removeAbstractEntity(this.id);
        return undefined;
    }
}