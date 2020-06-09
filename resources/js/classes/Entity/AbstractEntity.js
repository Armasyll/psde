/**
 * Abstract Entity
 */
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
        if (id.length == 0 || AbstractEntity.has(id)) {
            id = Tools.genUUIDv4();
        }
        this.id = id;
        this.entityType = EntityEnum.ABSTRACT;
        this.name = "";
        this.setName(name);
        this.description = "";
        this.setDescription(description);
        this.iconID = "genericItem";
        this.setIcon(iconID);
        this.controller = null;

        this.health = 10;

        this.maxHealth = 10;
        this.maxHealthModifier = 0;
        this.maxHealthOverride = -1;
        this.maxHealthConditionModifier = 0;
        this.maxHealthConditionOverride = -1;
        this.maxHealthEffectModifier = 0;
        this.maxHealthEffectOverride = -1;

        this.availableActions = {};
        this.hiddenAvailableActions = {};
        this.specialProperties = {};
        this.defaultAction = null;
        this.godMode = false;
        this.godModeOverride = -1;
        this.godModeConditionOverride = -1;
        this.godModeEffectOverride = -1;
        this.enabled = true;
        this.locked = false;
        this.essential = false;
        this.essentialOverride = -1;
        this.essentialConditionOverride = -1;
        this.essentialEffectOverride = -1;
        this.inventory = null;
        /**
         * @type {object}
         * Object<EffectID: <"currentStack":StackNumber, "startTime":TimeStart, "endTime":TimeEnd>>
         */
        this.effects = {};
        /**
         * @type {object}
         * Object<number: Set<Effect>
         */
        this.effectsPriority = {};
        /**
         * Effects triggered on action
         * @type {object}
         * {ActionEnum:{Effect:boolean}}
         */
        this.actionEffects = {};
        AbstractEntity.set(this.id, this);
    }

    setID(id) {
        this.locked = true;
        AbstractEntity.remove(this.id);
        id = Tools.filterID(id);
        this.id = id;
        AbstractEntity.set(this.id, this);
        this.locked = false;
        return 0;
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
        if (this.isGod()) {
            this.health = this.getMaxHealth();
            return 0;
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
        return 0;
    }
    modifyHealth(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setHealth(this.health + number);
    }
    getHealth() {
        if (this.isGod()) {
            return this.getMaxHealth();
        }
        return this.health;
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
        return 0;
    }
    modifyMaxHealth(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setMaxHealth(this.maxHealth + number);
    }
    getMaxHealth() {
        if (this.maxHealthEffectOverride >= 0) {
            return this.maxHealthEffectOverride;
        }
        else if (this.maxHealthConditionOverride >= 0) {
            return this.maxHealthConditionOverride;
        }
        else if (this.maxHealthOverride >= 0) {
            return this.maxHealthOverride;
        }
        return this.maxHealth + this.maxHealthConditionModifier + this.maxHealthEffectModifier;
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
        return 0;
    }
    enableGodMode() {
        return this.setGodMode(true);
    }
    disableGodMode() {
        return this.setGodMode(false);
    }
    isGod() {
        if (this.godModeEffectOverride != -1) {
            return this.godModeEffectOverride;
        }
        else if (this.godModeConditionOverride != -1) {
            return this.godModeConditionOverride;
        }
        else if (this.godModeOverride != -1) {
            return this.godModeOverride;
        }
        return this.godMode;
    }
    applyGodMode() {
        if (this.isGod()) {
            // Tell Game.
        }
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
        if (this.essentialEffectOverride != -1) {
            return this.essentialEffectOverride;
        }
        else if (this.essentialConditionOverride != -1) {
            return this.essentialConditionOverride;
        }
        else if (this.essentialOverride != -1) {
            return this.essentialOverride;
        }
        return this.essential;
    }
    applyEssential() {
        if (this.isEssential()) {
            // Tell Game.
        }
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

    hasCondition(conditionEnum) {
        return false;
    }
    addCondition(conditionEnum) {
        return 0;
    }
    removeCondition(conditionEnum) {
        return 0;
    }

    hasEffect(effect) {
        if (!(effect instanceof Effect)) {
            if (Effect.has(effect)) {
                effect = Effect.get(effect);
            }
            else {
                return false;
            }
        }
        return this.effects.hasOwnProperty(effect.id);
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
        let id = effect.getID()
        if (this.effects.hasOwnProperty(id)) {
            if (this.effects[id]["currentStack"] < effect.getStackCount()) {
                this.effects[id]["currentStack"] += 1;
            }
        }
        else {
            this.effects[id] = {"currentStack":1, "timeStart":0, "timeEnd":0};
        }
        let priority = effect.getPriority();
        if (!this.effectsPriority.hasOwnProperty(priority)) {
            this.effectsPriority[priority] = new Set();
        }
        this.effectsPriority[priority].add(id);
        this.applyEffects();
        if (effect.getDuration() <= 0) {
            return 0;
        }
        Game.addScheduledEffect(effect, this);
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
        let id = effect.getID()
        let priority = effect.getPriority();
        if (this.effectsPriority.hasOwnProperty(priority)) {
            if (this.effectsPriority[priority].has(id) && this.effects.hasOwnProperty(id)) {
                if (this.effects[id]["currentStack"] == 1) {
                    delete this.effects[id]["timeEnd"];
                    delete this.effects[id]["timeStart"];
                    delete this.effects[id]["currentStack"];
                    delete this.effects[id];
                    this.effectsPriority[priority].delete(id);
                }
                else {
                    this.effects[id]["currentStack"] -= 1;
                }
            }
            if (this.effectsPriority[priority].size == 0) {
                delete this.effectsPriority[priority];
            }
        }
        this.applyEffects();
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
    /**
     * 
     * @param {Effect} effect 
     */
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
        if (!this.hasEffect(effect)) {
            if (Game.debugMode) console.log("\tBut this entity doesn't have the effect.");
            return 1;
        }
        for (let property in effect.getModifiers()) { // for every property modified
            for (let i = 0; i < this.effects[effect.getID()]["currentStack"]; i++) { // we apply for each number in the stack
                switch (property) {
                    case "healthModifier": {
                        this.setHealth(effect.calculateModifier(property, this));
                        break;
                    }
                    case "maxHealthModifier": {
                        this.setMaxHealthModifier(effect.calculateModifier(property, this));
                        break;
                    }
                    case "conditions": {
                        if (effect.getModifier("conditions").length == 0) {
                            break;
                        }
                        let conditions = effect.getModifier("conditions");
                        for (let j = 0; j < conditions.length; j++) {
                            if (conditions[j].operation == OperationsEnum.SUBTRACT) {
                                if (typeof conditions[j].modification == "function") {
                                    this.removeCondition(conditions[j].modification(this));
                                }
                                else {
                                    this.removeCondition(conditions[j].modification);
                                }
                            }
                            else if (conditions[j].operation == OperationsEnum.ADD) {
                                if (typeof conditions[j].modification == "function") {
                                    this.addCondition(conditions[j].modification(this));
                                }
                                else {
                                    this.addCondition(conditions[j].modification);
                                }
                            }
                        }
                        break;
                    }
                    default: {
                        if (typeof this[property] == "number") {
                            this[property] = effect.calculateModifier(property, this);
                        }
                        else if (typeof this[property] == "boolean") {
                            this[property] = effect.calculateModifier(property, this);
                        }
                        else if (typeof this[property] == "object") {
                            if (effect.modifiers[property]["operation"] == OperationsEnum.ADD) {
                                this[property](effect.modifiers[property]["modification"]);
                            }
                            else if (effect.modifiers[property]["operation"] == OperationsEnum.SUBTRACT) {
                                this[property].delete(effect.modifiers[property]["modification"]);
                            }
                        }
                    }
                }
            }
        }
        if (this.health > this.getMaxHealth()) {
            this.health = this.getMaxHealth();
        }
        return 0;
    }
    getEffects() {
        return this.effects;
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
    setInventory(inventory) {
        if (!(inventory instanceof Inventory)) {
            if (Inventory.has(inventory)) {
                inventory = Inventory.get(inventory);
            }
            else {
                return 2;
            }
        }
        if (this.hasInventory()) {
            if (this.inventory == inventory) {
                return 0;
            }
            this.removeInventory();
        }
        if (Game.debugMode) console.log(`Running <${this.getClassName()}> ${this.id}.setInventory(${inventory.id})`);
        this.inventory = inventory;
        inventory.addEntity(this);
        return 0;
    }
    removeInventory() {
        if (!this.hasInventory()) {
            return 1;
        }
        this.inventory = null;
        this.inventory.removeEntity(this, false);
        return 0;
    }
    createInventory(maxSize = 9, maxWeight = 10) {
        if (this.hasInventory()) {
            return 0;
        }
        if (Game.debugMode) console.log(`Running <${this.getClassName()}> ${this.id}.createInventory(${maxSize}, ${maxWeight})`);
        return this.setInventory(new Inventory(this.id + "Inventory", "Inventory", maxSize, maxWeight));
    }
    addItem(...parameters) {
        if (!this.hasInventory()) {
            if (this.createInventory() != 0) {
                return 2;
            }
        }
        let result = this.inventory.addItem(...parameters);
        if (result.meta.status >= 400) {
            return 2;
        }
        else if (result.meta.status >= 300) {
            /** If the item exists in 3D space, don't do anything */
            if (result.response.hasController()) {
                return 1;
            } /** Else if this, the entity trying to pick it up, has a controller, then create an instance of the item, or its own instance, in 3D space */
            else if (this.hasController()) {
                Game.createItemInstance(result.response.id, result.response, this.getPosition());
            } /** Else, if there were something else, eg. the character was locked and the item doesn't exist, don't do anything 'cause idk how to handle that :v */
            return 0;
        }
        else {
            return 0;
        }
    }
    removeItem(...parameters) {
        if (!this.hasInventory()) {
            return 1;
        }
        let result = this.inventory.removeItem(...parameters);
        if (result.meta.status >= 400) {
            return 2;
        }
        else {
            return 0;
        }
    }
    hasItem(...parameters) {
        if (!this.hasInventory()) {
            return false;
        }
        return this.inventory.hasItem(...parameters);
    }
    getItem(...parameters) {
        if (!this.hasInventory()) {
            return 1;
        }
        return this.inventory.getItem(...parameters);
    }
    getItems() {
        if (!this.hasInventory()) {
            return 1;
        }
        return this.inventory.getItems();
    }

    /**
     * 
     * @param {ActionEnum} action 
     * @param {Effect} effect 
     * @param {boolean} [alwaysTrigger] Whether or not to trigger every time this action is taken; isn't considered when this entity is an instance.
     */
    addActionEffect(action, effect, alwaysTrigger = false) {
        if (ActionEnum.properties.hasOwnProperty(action)) {}
        else if (ActionEnum.hasOwnProperty(action)) {
            action = ActionEnum[action];
        }
        else {
            return 2;
        }
        if (!(effect instanceof Effect)) {
            if (Effect.has(effect)) {
                effect = Effect.get(effect);
            }
            else {
                return 2;
            }
        }
        alwaysTrigger = alwaysTrigger == true;
        if (!this.actionEffects.hasOwnProperty(action)) {
            this.actionEffects[action] = {};
        }
        this.actionEffects[action][effect.getID()] = alwaysTrigger;
        return 0;
    }
    /**
     * 
     * @param {ActionEnum} action 
     * @param {Effect} [effect] 
     */
    removeActionEffect(action, effect) {
        if (ActionEnum.properties.hasOwnProperty(action)) {}
        else if (ActionEnum.hasOwnProperty(action)) {
            action = ActionEnum[action];
        }
        else {
            action = null;
        }
        if (!(effect instanceof Effect)) {
            if (Effect.has(effect)) {
                effect = Effect.get(effect);
            }
            else {
                effect = null;
            }
        }
        if (action == null && effect == null) {
            return 2;
        }
        if (effect instanceof Effect) {
            this.removeActionEffectByEffect(effect.getID());
        }
        else {
            this.removeActionEffectByAction(action);
        }
        return 0;
    }
    /**
     * 
     * @param {ActionEnum} action 
     */
    removeActionEffectByAction(action) {
        if (this.actionEffects.hasOwnProperty(action)) {
            for (let effect in this.actionEffects[action]) {
                delete this.actionEffects[action][effect];
            }
        }
        return 0;
    }
    /**
     * 
     * @param {string} effect 
     */
    removeActionEffectByEffect(effect) {
        for (let action in this.actionEffects) {
            if (this.actionEffects[action].hasOwnProperty(effect)) {
                delete this.actionEffects[action][effect];
            }
            if (Object.keys(this.actionEffects[action]).length == 0) {
                this.removeActionEffectByAction(action);
            }
        }
        return 0;
    }
    /**
     * 
     * @param {ActionEnum} action 
     * @param {Effect} [effect] 
     */
    hasActionEffect(action, effect) {
        if (ActionEnum.properties.hasOwnProperty(action)) {}
        else if (ActionEnum.hasOwnProperty(action)) {
            action = ActionEnum[action];
        }
        else {
            action = null;
        }
        if (!(effect instanceof Effect)) {
            if (Effect.has(effect)) {
                effect = Effect.get(effect);
            }
            else {
                effect = null;
            }
        }
        if (action == null && effect == null) {
            return false;
        }
        if (action != null && effect != null) {
            if (this.actionEffects.hasOwnProperty(action)) {
                return this.actionEffects[action].hasOwnProperty(effect);
            }
            return false;
        }
        else if (effect instanceof Effect) {
            for (let action in this.actionEffects) {
                if (this.actionEffects[action].hasOwnProperty(effect.getID())) {
                    return true;
                }
            }
        }
        return this.actionEffects.hasOwnProperty(action);
    }
    getActionEffects(action) {
        if (this.actionEffects.hasOwnProperty(action)) {
            return this.actionEffects[action];
        }
    }
    clearActionEffects() {
        for (let action in this.actionEffects) {
            this.removeActionEffectByAction(action);
        }
        return 0;
    }

    /**
     * Resets all properties modified by effects
     * @returns {number}
     */
    resetEffectProperties() {
        this.maxHealthEffectModifier = 0;
        this.maxHealthEffectOverride = -1;
        this.godModeEffectOverride = -1;
        this.essentialEffectOverride = -1;
        return 0;
    }
    /**
     * Resets all properties modified by conditions
     * @returns {number}
     */
    resetConditionProperties() {
        this.maxHealthConditionModifier = 0;
        this.maxHealthConditionOverride = -1;
        this.godModeConditionOverride = -1;
        this.essentialConditionOverride = -1;
        return 0;
    }
    /**
     * Resets all modifier properties
     * @returns {number}
     */
    resetModifiers() {
        this.maxHealthModifier = 0;
        this.maxHealthConditionModifier = 0;
        this.maxHealthEffectModifier = 0;
        return 0;
    }
    /**
     * Resets all override properties
     * @returns {number}
     */
    resetOverrides() {
        this.maxHealthOverride = -1;
        this.maxHealthConditionOverride = -1;
        this.maxHealthEffectOverride = -1;
        this.godModeOverride = -1;
        this.godModeConditionOverride = -1;
        this.godModeEffectOverride = -1;
        this.essentialOverride = -1;
        this.essentialConditionOverride = -1;
        this.essentialEffectOverride = -1;
        return 0;
    }

    /**
     * Clones
     * @param  {string} id ID
     * @return {AbstractEntity} new AbstractEntity
     */
    clone(id = undefined) {
        let clone = new AbstractEntity(id, this.name, this.description, this.icon, this.entityType);
        if (this.hasInventory()) {
            clone.setInventory(this.inventory.clone(String(id).concat("Inventory")));
        }
        clone.assign(this);
        return clone;
    }
    /**
     * Clones the entity's values over this
     * @param {AbstractEntity} entity 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(entity, verify = true) {
        if (verify && !(entity instanceof AbstractEntity)) {
            return 2;
        }
        if (entity.hasOwnProperty("entityType")) this.entityType = entity.entityType;
        if (entity.hasOwnProperty("health")) this.health = entity.health;
        if (entity.hasOwnProperty("maxHealth")) this.maxHealth = entity.maxHealth;
        if (entity.hasOwnProperty("maxHealthModifier")) this.maxHealthModifier = entity.maxHealthModifier;
        if (entity.hasOwnProperty("maxHealthOverride")) this.maxHealthOverride = entity.maxHealthOverride;
        if (entity.hasOwnProperty("godMode")) this.godMode = entity.godMode;
        if (entity.hasOwnProperty("godModeOverride")) this.godModeOverride = entity.godModeOverride;
        if (entity.hasOwnProperty("essential")) this.essential = entity.essential;
        if (entity.hasOwnProperty("essentialOverride")) this.essentialOverride = entity.essentialOverride;
        if (entity.hasOwnProperty("effects")) {
            for (let effect in entity.effects) {
                for (let i = 0; i < entity.effects[effect]["currentStack"]; i++) {
                    this.addEffect(effect);
                }
            }
        }
        if (entity.hasOwnProperty("actionEffects")) {
            for (let action in entity.actionEffects) {
                for (let effect in entity.actionEffects[action]) {
                    this.addActionEffect(action, effect, entity.actionEffects[action][effect]);
                }
            }
        }
        this.applyGodMode();
        this.applyEssential();
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
    getClassName() {
        return "AbstractEntity";
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