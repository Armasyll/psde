/**
 * Abstract Entity
 * @class
 * @typedef {Object} AbstractEntity
 * @property {string} id
 * @property {EntityEnum} entityType
 * @property {string} name
 * @property {string} description
 * @property {string} iconID
 * @property {string} meshID
 * @property {string} materialID
 * @property {string} textureID
 * @property {[EntityController | null]} controller
 * @property {number} health
 * @property {number} maxHealth
 * @property {number} maxHealthModifier
 * @property {number} maxHealthOverride
 * @property {number} maxHealthConditionModifier
 * @property {number} maxHealthConditionOverride
 * @property {number} maxHealthEffectModifier
 * @property {SizeEnum} size
 * @property {Object} availableActions
 * @property {Object} hiddenAvailableActions
 * @property {Object} specialProperties
 * @property {[ActionEnum | null]} defaultAction
 * @property {boolean} godMode
 * @property {number} godModeOverride
 * @property {number} godModeConditionOverride
 * @property {number} godModeEffectOverride
 * @property {boolean} enabled
 * @property {boolean} locked
 * @property {boolean} disposing
 * @property {boolean} essential
 * @property {number} essentialOverride
 * @property {number} essentialConditionOverride
 * @property {number} essentialEffectOverride
 * @property {[Container | null]} container
 * @property {boolean} held
 * @property {boolean} holdable
 * @property {boolean} equipped
 * @property {boolean} equipable
 * @property {Object} effects
 * @property {Object} effectsPriority
 * @property {Object} actionEffects
 */
class AbstractEntity {
    /**
     * Creates an Abstract Entity
     * @param  {string}  id Unique ID, auto-generated if none given
     * @param  {string}  name Name
     * @param  {string}  [description] Description
     * @param  {string}  [iconID] Icon ID
     */
    constructor(id = "", name = "", description = "", iconID = "genericItem") {
        /** @type {string} */
        this.id = "";
        this.setID(id);
        /** @type {EntityEnum} */
        this.entityType = EntityEnum.ABSTRACT;
        /** @type {string} */
        this.name = "";
        this.setName(name);
        /** @type {string} */
        this.description = "";
        this.setDescription(description);
        /** @type {string} */
        this.iconID = "genericItem";
        this.setIcon(iconID);
        /** @type {string} */
        this.meshID = "missingMesh";
        /** @type {string} */
        this.materialID = "missingMaterial";
        /** @type {string} */
        this.textureID = "missingTexture";
        /** @type {EntityController | null} */
        this.controller = null;
        /** @type {boolean} */
        this.enabled = true;
        /** @type {boolean} */
        this.locked = false;
        /** @type {boolean} */
        this.disposing = false;

        /** @type {number} */
        this.health = 10;
        /** @type {number} */
        this.maxHealth = 10;
        /** @type {number} */
        this.maxHealthModifier = 0;
        /** @type {number} */
        this.maxHealthOverride = -1;
        /** @type {number} */
        this.maxHealthConditionModifier = 0;
        /** @type {number} */
        this.maxHealthConditionOverride = -1;
        /** @type {number} */
        this.maxHealthEffectModifier = 0;
        /** @type {number} */
        this.maxHealthEffectOverride = -1;
        /** @type {boolean} */
        this.godMode = false;
        /** @type {number} */
        this.godModeOverride = -1;
        /** @type {number} */
        this.godModeConditionOverride = -1;
        /** @type {number} */
        this.godModeEffectOverride = -1;
        /** @type {number} */
        this.essential = false;
        /** @type {number} */
        this.essentialOverride = -1;
        /** @type {number} */
        this.essentialConditionOverride = -1;
        /** @type {number} */
        this.essentialEffectOverride = -1;

        /** @type {SizeEnum} */
        this.size = SizeEnum.SMALL;

        /** @type {Object} */
        this.availableActions = {};
        /** @type {Object} */
        this.hiddenAvailableActions = {};
        /** @type {Object} */
        this.specialProperties = {};
        /** @type {ActionEnum | null} */
        this.defaultAction = null;
        /** @type {Container | null} */
        this.container = null;
        /** @type {boolean} */
        this.held = false;
        /** @type {boolean} */
        this.holdable = false;
        /** @type {boolean} */
        this.equipped = false;
        /** @type {boolean} */
        this.equipable = false;
        /**
         * Stacked effects
         * @type {Object.<string, Object.<number, string>>}
         * @example // Object<EffectID: <"currentStack":StackNumber, "startTime":TimeStart, "endTime":TimeEnd>>
         */
        this.effects = {};
        /** @type {Object.<number, Set<Effect>>} */
        this.effectsPriority = {};
        /**
         * Effects triggered on action
         * @type {Object.<ActionEnum, Object.<Effect, boolean>>}
         */
        this.actionEffects = {};
        AbstractEntity.set(this.id, this);
    }
    /**
     * 
     * @param {string} id 
     */
    setID(id) {
        this.locked = true;
        AbstractEntity.remove(this.id);
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        this.id = id;
        AbstractEntity.set(this.id, this);
        this.locked = false;
        return 0;
    }
    getID() {
        return this.id;
    }
    getType() {
        return this.entityType;
    }
    /**
     * 
     * @param {string} name 
     */
    setName(name) {
        this.name = Tools.filterName(name);
        return 0;
    }
    getName() {
        return this.name;
    }
    /**
     * 
     * @param {string} description 
     */
    setDescription(description) {
        this.description = Tools.filterName(description);
        return 0;
    }
    getDescription() {
        return this.description;
    }
    /**
     * 
     * @param {string} iconID 
     */
    setIcon(iconID) {
        this.iconID = iconID;
        return 0;
    }
    getIcon() {
        return this.iconID;
    }

    /**
     * 
     * @param {SizeEnum} size 
     */
    setSize(size) {
        this.size = Tools.filterEnum(size) || SizeEnum.MEDIUM;
        return 0;
    }
    getSize() {
        return this.size;
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

    isEnabled() {
        return this.enabled == true;
    }
    isDisabled() {
        return this.enabled == false;
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

    getMaterialID() {
        return this.materialID;
    }
    getTextureID() {
        return this.textureID;
    }
    getMeshID() {
        return this.meshID;
    }

    /**
     * 
     * @param {string} entityControllerID 
     */
    setController(entityControllerID) {
        this.controller = entityControllerID;
    }
    getController() {
        return this.controller;
    }
    hasController() {
        return this.controller != null;
    }
    removeController() {
        this.controller = null;
        return 0;
    }

    setEssential(isEssential = true) {
        this.essential = isEssential == true;
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
    addEffect(effect, fromEntity = null, fromSpell = null) { // TODO: fromEntity, fromSpell
        if (!(effect instanceof Effect)) {
            if (Effect.has(effect)) {
                effect = Effect.get(effect);
            }
            else {
                return 2;
            }
        }
        if (AbstractEntity.debugMode) console.log(`Running ${this.getID()}.addEffect(${effect.getID()})`);
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
        if (effect.getDuration() > 0) {
            EntityLogic.addScheduledEffect(effect, this);
        }
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
        if (AbstractEntity.debugMode) console.log(`Running ${this.getID()}.removeEffect(${effect.getID()})`);
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
        if (AbstractEntity.debugMode) console.log(`Running ${this.getID()}.applyEffects()`);
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
        if (AbstractEntity.debugMode) console.log(`Running ${this.getID()}.applyEffect(${effect.getID()})`);
        if (!this.hasEffect(effect)) {
            if (AbstractEntity.debugMode) console.log("\tBut this entity doesn't have the effect.");
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

    hasContainer() {
        return this.container instanceof Container;
    }
    getContainer() {
        return this.container;
    }
    setContainer(container) {
        if (!(container instanceof Container)) {
            if (Container.has(container)) {
                container = Container.get(container);
            }
            else {
                return 2;
            }
        }
        if (this.hasContainer()) {
            if (this.container == container) {
                return 0;
            }
            this.removeContainer();
        }
        if (AbstractEntity.debugMode) console.log(`Running <${this.getClassName()}> ${this.id}.setContainer(${container.id})`);
        this.container = container;
        container.addEntity(this);
        return 0;
    }
    removeContainer() {
        if (!this.hasContainer()) {
            return 1;
        }
        this.container.removeEntity(this, false);
        this.container = null;
        return 0;
    }
    createContainer(maxSize = 9, maxWeight = 10) {
        if (this.hasContainer()) {
            return 0;
        }
        if (AbstractEntity.debugMode) console.log(`Running <${this.getClassName()}> ${this.id}.createContainer(${maxSize}, ${maxWeight})`);
        return this.setContainer(new Container(this.id + "Container", "Container", maxSize, maxWeight));
    }
    /**
     * 
     * @param {(ItemEntity|InstancedItemEntity)} instancedItemEntity 
     * @param {number} [count]
     * @returns {number} 
     */
    addItem(instancedItemEntity, count = 1, tellGameWorker = true) {
        if (!this.hasContainer()) {
            if (this.createContainer() != 0) {
                return 2;
            }
        }
        tellGameWorker = tellGameWorker == true;
        let result = this.container.addItem(instancedItemEntity, count);
        if (result == 0 && tellGameWorker) {
            EntityLogic.sendEntityUpdate(this, "container");
        }
        return result;
    }
    /**
     * 
     * @param {abstractEntity} abstractEntity 
     * @param {number} [count] 
     */
    removeItem(abstractEntity, count = 1, tellGameWorker = true) {
        if (!this.hasContainer()) {
            return 1;
        }
        tellGameWorker = tellGameWorker == true;
        let result = this.container.removeItem(abstractEntity, count, tellGameWorker);
        if (result == 0 && tellGameWorker) {
            EntityLogic.sendEntityUpdate(this, "container");
        }
        return result;
    }
    /**
     * 
     * @param {(ItemEntity|InstancedItemEntity)} instancedItemEntity 
     * @param {number} [count] 
     */
    hasItem(instancedItemEntity, count = 1) {
        if (!this.hasContainer()) {
            return false;
        }
        return this.container.hasItem(instancedItemEntity, count);
    }
    /**
     * 
     * @param {(ItemEntity|InstancedItemEntity)} instancedItemEntity 
     */
    getItem(instancedItemEntity) {
        if (!this.hasContainer()) {
            return 1;
        }
        return this.container.getItem(instancedItemEntity);
    }
    getItems() {
        if (!this.hasContainer()) {
            return 1;
        }
        return this.container.getItems();
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

    stringify(minimal = false) {
        if (minimal) {
            return JSON.stringify(this.objectifyMinimal());
        }
        return JSON.stringify(this.objectify());
    }
    objectify() {
        let obj = {};
        for (let property in this) {
            obj[property] = this._objectifyProperty(this[property]);
        }
        return obj;
    }
    objectifyMinimal() {
        let obj = {};
        obj["availableActions"] = this.availableActions;
        obj["container"] = null;
        obj["controller"] = this.controller;
        obj["defaultAction"] = this.defaultAction;
        obj["description"] = this.getDescription();
        obj["enabled"] = this.enabled;
        obj["equipped"] = false;
        obj["equipable"] = false;
        obj["hasContainer"] = false;
        obj["health"] = this.getHealth();
        obj["held"] = false;
        obj["holdable"] = false;
        obj["iconID"] = this.iconID || "missingIcon";
        obj["id"] = this.id;
        obj["locked"] = this.locked;
        obj["materialID"] = this.materialID || "missingMaterial";
        obj["maxHealth"] = this.getMaxHealth();
        obj["meshID"] = this.meshID || "missingMesh";
        obj["name"] = this.getName();
        obj["textureID"] = this.textureID || "missingTexture";
        obj["size"] = this.size;
        if (this.hasContainer()) {
            obj["container"] = this.container.objectify();
            obj["hasContainer"] = true;
        }
        return obj;
    }
    _objectifyProperty(property) {
        let obj = null;
        if (property instanceof AbstractEntity) {
            obj = {
                "id":property.id,
                "name":property.getName(),
                "description":property.getDescription(),
                "iconID":property.iconID,
                "materialID":property.getMaterialID(),
                "meshID":property.getMeshID(),
                "textureID":property.getTextureID(),
                "className":property.getClassName()
            };
        }
        else if (property instanceof ActionData) {
            obj = property.action;
        }
        else if (property instanceof Cell) {
            obj = {
                "id":property.id,
                "name":property.getName(),
                "description":property.getDescription(),
                "iconID":property.iconID,
                "className":property.getClassName()
            };
        }
        else if (property instanceof CharacterClass) {
            obj = {
                "id":property.id,
                "name":property.getName(),
                "description":property.getDescription(),
                "iconID":property.iconID,
                "className":property.getClassName()
            };
        }
        else if (property instanceof Container) {
            obj = this.container.objectify();
        }
        else if (property instanceof Cosmetic) {
            obj = {
                "id":property.id,
                "name":property.getName(),
                "description":property.getDescription(),
                "iconID":property.iconID,
                "materialID":property.materialID,
                "meshID":property.meshID,
                "textureID":property.textureID,
                "className":property.getClassName()
            };
        }
        else if (property instanceof Dialogue) {
            obj = {
                "id":property.id,
                "name":property.getTitle(),
                "className":property.getClassName()
            };
        }
        else if (property instanceof Effect) {
            obj = {
                "id":property.id,
                "name":property.getName(),
                "description":property.getDescription(),
                "iconID":property.iconID,
                "className":property.getClassName()
            };
        }
        else if (property instanceof Spell) {
            obj = {
                "id":property.id,
                "name":property.getName(),
                "description":property.getDescription(),
                "iconID":property.iconID,
                "className":property.getClassName()
            };
        }
        else if (property instanceof TeleportMarker) {
            obj = {
                "id":property.id,
                "cellID":property.cellID,
                "position":property.position,
                "rotation":property.rotation
            };
        }
        else if (property instanceof Array) {
            obj = [];
            for (let i = 0; i < property.length; i++) {
                obj[i] = this._objectifyProperty(property[i]);
            };
        }
        else if (property instanceof Object) {
            obj = {};
            for (let entry in property) {
                obj[entry] = this._objectifyProperty(property[entry]);
            }
        }
        else {
            obj = property;
        }
        return obj;
    }
    /**
     * Clones
     * @param  {string} id ID
     * @returns {AbstractEntity} new AbstractEntity
     */
    clone(id = "") {
        let clone = new AbstractEntity(id, this.name, this.description, this.icon, this.entityType);
        if (this.hasContainer()) {
            clone.setContainer(this.container.clone(String(id).concat("Container")));
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
        if (entity.hasOwnProperty("actionEffects")) {
            for (let action in entity.actionEffects) {
                for (let effect in entity.actionEffects[action]) {
                    this.addActionEffect(action, effect, entity.actionEffects[action][effect]);
                }
            }
        }
        if (entity.hasOwnProperty("essential")) this.essential = entity.essential;
        if (entity.hasOwnProperty("essentialOverride")) this.essentialOverride = entity.essentialOverride;
        if (entity.hasOwnProperty("effects")) {
            for (let effect in entity.effects) {
                for (let i = 0; i < entity.effects[effect]["currentStack"]; i++) {
                    this.addEffect(effect);
                }
            }
        }
        if (entity.hasOwnProperty("entityType")) this.entityType = entity.entityType;
        if (entity.hasOwnProperty("equipable")) this.equipable = entity.equipable;
        if (entity.hasOwnProperty("equipped")) this.equipped = entity.equipped;
        if (entity.hasOwnProperty("health")) this.health = entity.health;
        if (entity.hasOwnProperty("held")) this.held = entity.held;
        if (entity.hasOwnProperty("holdable")) this.holdable = entity.holdable;
        if (entity.hasOwnProperty("maxHealth")) this.maxHealth = entity.maxHealth;
        if (entity.hasOwnProperty("maxHealthModifier")) this.maxHealthModifier = entity.maxHealthModifier;
        if (entity.hasOwnProperty("maxHealthOverride")) this.maxHealthOverride = entity.maxHealthOverride;
        if (entity.hasOwnProperty("godMode")) this.godMode = entity.godMode;
        if (entity.hasOwnProperty("godModeOverride")) this.godModeOverride = entity.godModeOverride;
        if (entity.hasOwnProperty("size")) this.size = entity.size;
        return 0;
    }
    updateID(newID) {
        this.setLocked(true);
        AbstractEntity.updateID(this.id, newID);
        this.id = newID;
        this.setLocked(false);
        return 0;
    }
    dispose() {
        if (this.disposing) {
            return null;
        }
        else {
            this.disposting = true;
        }
        this.setLocked(true);
        this.setEnabled(false);
        if (this.hasContainer()) {
            this.removeContainer();
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
        AbstractEntity.debugMode = false;
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
    static updateID(oldID, newID) {
        if (!AbstractEntity.has(oldID)) {
            return 1;
        }
        AbstractEntity.set(newID, AbstractEntity.get(oldID));
        AbstractEntity.remove(oldID);
        return 0;
    }
}
AbstractEntity.initialize();