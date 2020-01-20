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
        this.healthModifier = 0;
        this.maxHealth = 10;
        this.maxHealthModifier = 0;
        this.availableActions = {};
        this.hiddenAvailableActions = {};
        this.specialProperties = new Set();
        this.defaultAction = null;
        this.godMode = false;
        this.godModeModifier = false;
        this.enabled = true;
        this.locked = false;
        this.essential = false;
        this.essentialModifier = false;
        this.inventory = null;
        /**
         * @type {object}
         * Object<Effect: <0:StackNumber, 1:TimeStart, 2:TimeEnd>>
         */
        this.effects = {};
        /**
         * @type {object}
         * Object<number: Set<Effect>
         */
        this.effectsPriority = {};
        /**
         * @type {object}
         * Object<TargetEntity: <ActionEnum:Effect>>
         */
        this.actionEffects = {};
        AbstractEntity.set(this.id, this);
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
        if (number > this.getMaxHealth()) {
            number = this.getMaxHealth();
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
    modifyHealth(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.setHealth(this.health + number);
        return this;
    }
    getHealth() {
        return this.health + this.healthModifier;
    }

    setMaxHealth(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        if (number <= 0) {
            number = 1;
        }
        let oldMaxHealth = this.getMaxHealth();
        this.maxHealth = number;
        if (this.health > this.getMaxHealth()) {
            this.health = this.getMaxHealth();
        }
        this.recalculateHealthByModifiedMaxHealth(oldMaxHealth);
        return this;
    }
    modifyMaxHealth(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.setMaxHealth(this.maxHealth + number);
        return this;
    }
    getMaxHealth() {
        return this.maxHealth + this.maxHealthModifier;
    }
    setMaxHealthModifier(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        let oldMaxHealth = this.getMaxHealth();
        this.maxHealthModifier = number;
        this.recalculateHealthByModifiedMaxHealth(oldMaxHealth);
        return this;
    }
    modifyMaxHealthModifier(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.setMaxHealthModifier(this.maxHealthModifier + number);
        return this;
    }
    recalculateHealthByModifiedMaxHealth(oldMaxHealth) {
        let multiplier = this.getMaxHealth() / oldMaxHealth;
        let health = Math.ceil(this.getHealth() * multiplier);
        if (health > this.getMaxHealth()) {
            health = this.getMaxHealth();
        }
        this.setHealth(health);
        return 0;
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
        return this.godMode || this.godModeModifier;
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
            if (InstancedEntity.has(characterEntity)) {
                characterEntity = InstancedEntity.get(characterEntity);
            }
            else if (Entity.has(characterEntity)) {
                characterEntity = Entity.get(characterEntity);
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
            if (InstancedEntity.has(abstractEntity)) {
                abstractEntity = InstancedEntity.get(characterEntity);
            }
            else if (Entity.has(characterEntity)) {
                abstractEntity = Entity.get(abstractEntity);
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
        return this.essential || this.essentialModifier;
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

    addEffect(effect) {
        if (!(effect instanceof Effect)) {
            if (Effect.has(effect)) {
                effect = Effect.get(effect);
            }
            else {
                return 2;
            }
        }
        if (Game.debugMode) console.log(`Running ${this.getID()}.addEffect(${effect.getID()})`);
        let effectID = effect.getID()
        if (this.effects.hasOwnProperty(effectID)) {
            if (this.effects[effectID][0] < effect.getStackCount()) {
                this.effects[effectID][0] += 1;
            }
        }
        else {
            this.effects[effectID] = {0:1, 1:0, 2:0};
        }
        let i = effect.getPriority();
        if (!this.effectsPriority.hasOwnProperty(i)) {
            this.effectsPriority[i] = new Set();
        }
        this.effectsPriority[i].add(effectID);
        this.applyEffects();
        return 0;
    }
    removeEffect(effect) {
        if (!(effect instanceof Effect)) {
            if (Effect.has(effect)) {
                effect = Effect.get(effect);
            }
            else {
                return 2;
            }
        }
        if (Game.debugMode) console.log(`Running ${this.getID()}.removeEffect(${effect.getID()})`);
        let effectID = effect.getID()
        let i = effect.getPriority();
        if (this.effectsPriority.hasOwnProperty(i)) {
            if (this.effectsPriority[i].has(effectID) && this.effects.hasOwnProperty(effectID)) {
                if (this.effects[effectID][0] == 1) {
                    delete this.effects[effectID][2];
                    delete this.effects[effectID][1];
                    delete this.effects[effectID][0];
                    delete this.effects[effectID];
                    this.effectsPriority[i].delete(effectID);
                }
                else {
                    this.effects[effectID][0] -= 1;
                }
            }
            if (this.effectsPriority[i].size == 0) {
                delete this.effectsPriority[i];
            }
        }
        this.applyEffects();
        for (let modifier in effect.getModifiers()) {
            if (this.hasOwnProperty(modifier)) {
                switch (modifier) {
                    case "healthModifier":
                    case "maxHealthModifier": {
                        if (this.health > this.getMaxHealth()) {this.health = this.getMaxHealth();}
                        break;
                    }
                }
            }
        }
        return 0;
    }
    applyEffects() {
        if (Game.debugMode) console.log(`Running ${this.getID()}.applyEffects()`);
        this.resetModifiers();
        for (let priority in this.effectsPriority) {
            this.effectsPriority[priority].forEach((effectID) => {
                this.applyEffect(effectID);
            });
        }
        return 0;
    }
    applyEffect(effect) {
        if (!(effect instanceof Effect)) {
            if (Effect.has(effect)) {
                effect = Effect.get(effect);
            }
            else {
                return 2;
            }
        }
        if (Game.debugMode) console.log(`Running ${this.getID()}.applyEffect(${effect.getID()})`);
        for (let property in effect.getModifiers()) { // for every property modified
            for (let i = 0; i < this.effects[effect.getID()][0]; i++) { // we apply for each number in the stack
                switch (property) {
                    case "healthModifier": {
                        this.setHealth(effect.applyModifier(property, this));
                        break;
                    }
                    case "maxHealthModifier": {
                        this.setMaxHealthModifier(effect.applyModifier(property, this));
                        break;
                    }
                    default: {
                        effect.applyModifier(property, this, this);
                    }
                }
            }
        }
    }
    getEffects() {
        return this.effects;
    }
    cloneEffects() {
        let obj = {};
        for (let priority in this.effects) {
            obj[priority] = new Map(this.effects[priority]);
        }
        return obj;
    }
    clearEffects() {
        for (let priority in this.effects) {
            obj[priority].clear();
            delete obj[priority];
        }
        this.resetModifiers();
        return 0;
    }

    hasInventory() {
        return this.inventory instanceof Inventory;
    }
    getInventory() {
        return this.inventory;
    }
    setInventory(inventory, updateChild = true) {
        if (this instanceof CharacterEntity || this instanceof InstancedFurnitureEntity) {
            if (inventory instanceof Inventory) {
                this.inventory = inventory;
                if (updateChild) {
                    inventory.addEntity(this);
                }
                return 0;
            }
            return 1;
        }
        else {
            if (Game.debugMode) console.log(`Running <${EntityEnum.properties[this.entityType].name}Entity> ${this.id}.setInventory(${inventory.id}, ${updateChild ? "true" : "false"})`);
            return 1;
        }
    }
    removeInventory(updateChild = true) {
        if (!this.hasInventory()) {
            return 1;
        }
        this.inventory.dispose();
        this.inventory = null;
        if (updateChild) {
            this.inventory.removeEntity(this, false);
        }
        return 0;
    }
    createInventory(maxSize = 9, maxWeight = 10) {
        if (this instanceof CharacterEntity || this instanceof InstancedFurnitureEntity) {
            return this.setInventory(new Inventory(this.id + "Inventory", "Inventory", maxSize, maxWeight));
        }
        else {
            if (Game.debugMode) console.log(`Running <${EntityEnum.properties[this.entityType].name}Entity> ${this.id}.createInventory(${maxSize}, ${maxWeight})`);
            return 1;
        }
    }
    addItem(...parameters) {
        if (!this.hasInventory()) {
            if (this.createInventory() != 0) {
                return 1;
            }
        }
        return this.inventory.addItem(...parameters);
    }
    removeItem(...parameters) {
        if (!this.hasInventory) {
            return 1;
        }
        return this.inventory.removeItem(...parameters);
    }
    hasItem(...parameters) {
        if (!this.hasInventory) {
            return false;
        }
        return this.inventory.hasItem(...parameters);
    }
    getItem(...parameters) {
        if (!this.hasInventory) {
            return 1;
        }
        return this.inventory.getItem(...parameters);
    }
    getItems() {
        if (!this.hasInventory) {
            return 1;
        }
        return this.inventory.getItems();
    }

    resetModifiers() {
        this.godModeModifier = false;
        this.essentialModifier = false;
        this.healthModifier = 0;
        this.maxHealthModifier = 0;
        return 0;
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
        if (this.hasInventory()) {
            this.inventory.removeEntity(this);
        }
        for (let action in this.availableActions) {
            if (this.availableActions[action] instanceof ActionData) {
                this.availableActions[action].dispose();
            }
        }
        AbstractEntity.remove(this.id);
        return undefined;
    }

    static initialize() {
        AbstractEntity.abstractEntityList = {};
    }
    static get(id) {
        if (AbstractEntity.has(id)) {
            return AbstractEntity.abstractEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return AbstractEntity.abstractEntityList.hasOwnProperty(id);
    }
    static set(id, abstractEntity) {
        AbstractEntity.abstractEntityList[id] = abstractEntity;
        return 0;
    }
    static remove(id) {
        delete AbstractEntity.abstractEntityList[id];
        return 0;
    }
    static list() {
        return AbstractEntity.abstractEntityList;
    }
    static clear() {
        for (let i in AbstractEntity.abstractEntityList) {
            AbstractEntity.abstractEntityList[i].dispose();
        }
        AbstractEntity.abstractEntityList = {};
        return 0;
    }
}
AbstractEntity.initialize();