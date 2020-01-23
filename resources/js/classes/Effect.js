class Effect {
    constructor(id = "", name = "", description = "", iconID = "genericItem") {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        this.id = id;
        this.name = name;
        this.description = description;
        this.iconID = iconID;
        /**
         * Map of properties to the functions that set them
         * Object<string: function>
         * @type {object}
         */
        this.modifiers = {};
        this.statusType = DamageEnum.BLUDGEONING;
        /**
         * Duration in ticks; -1 is indefinite, 0 is one-and-done
         */
        this.duration = -1;
        this.durationInterval = IntervalEnum.SECOND;
        //if false, the duration is prepended with this
        this.durationIncludesTaperIn = true;
        this.taperInDuration = 0;
        this.taperInWeight = 0;
        this.taperInCurve = 0;
        // If false, the duration is postpended with this
        this.durationIncludesTaperOut = true;
        this.taperOutDuration = 0;
        this.taperOutWeight = 0;
        this.taperOutCurve = 0;

        /**
         * Only to be set if the duration is greater than 0, or is equal to -1
         * @type {IntervalEnum}
         */
        this.intervalType = IntervalEnum.ONCE;
        this.intervalNth = 1;
        this.priority = 1000;
        this.hidden = false;
        this.stackCount = 1;
        /**
         * Could be set to true if the duration is greater than 0, or is equal to -1
         */
        this.dispellable = false;
        Effect.set(this.id, this);
    }
    getID() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getIcon() {
        return this.iconID;
    }
    addModifier(property, operation = OperationsEnum.ADD, modification = 1) {
        if (Game.debugMode) console.log(`Running ${this.id}.addModifier(${property}, ${operation}, ${typeof modification == "function" ? "function()" : modification})`);
        if (!OperationsEnum.properties.hasOwnProperty(operation)) {
            if (Game.debugMode) console.log("Incorrect operation");
            return this;
        }
        if (this.allowedProperty(property)) {
            if (typeof modification == "function" && typeof modification(1) != "undefined" || typeof modification == "number") {
                this.modifiers[property] = {0:operation, 1:modification};
            }
        }
        return this;
    }
    /**
     * 
     * @param {string} property 
     * @param {AbstractEntity} source 
     */
    calculateModifier(property, source) {
        if (!this.modifiers.hasOwnProperty(property)) {
            return 0;
        }
        if (!source.hasOwnProperty(property)) {
            return 0;
        }
        if (!(source instanceof AbstractEntity)) {
            return 1;
        }
        let value = 0;
        switch (this.modifiers[property][0]) {
            case OperationsEnum.EQUALS: {
                if (typeof this.modifiers[property][1] == "function") {
                    value = this.modifiers[property][1](source);
                }
                else {
                    value = this.modifiers[property][1];
                }
                break;
            }
            case OperationsEnum.ADD: {
                if (typeof this.modifiers[property][1] == "function") {
                    value = source[property] + this.modifiers[property][1](source);
                }
                else {
                    value = source[property] + this.modifiers[property][1];
                }
                break;
            }
            case OperationsEnum.SUBTRACT: {
                if (typeof this.modifiers[property][1] == "function") {
                    value = source[property] - this.modifiers[property][1](source);
                }
                else {
                    value = source[property] - this.modifiers[property][1];
                }
                break;
            }
            case OperationsEnum.MULTIPLY: {
                if (typeof this.modifiers[property][1] == "function") {
                    value = source[property] * this.modifiers[property][1](source);
                }
                else {
                    value = source[property] * this.modifiers[property][1];
                }
                break;
            }
            case OperationsEnum.DIVIDE: {
                if (typeof this.modifiers[property][1] == "function") {
                    value = source[property] / this.modifiers[property][1](source);
                }
                else {
                    value = source[property] / this.modifiers[property][1];
                }
                break;
            }
        }
        return value;
    }
    getModifier(property) {
        if (this.modifiers.hasOwnProperty(property)) {
            return this.modifiers[property];
        }
        return 1;
    }
    hasModifier(property) {
        return this.modifiers.hasOwnProperty(property);
    }
    getModifiers() {
        return this.modifiers;
    }
    setStatusType(damageEnum) {
        if (DamageEnum.hasOwnProperty(damageEnum)) {
            this.statusType = damageEnum;
        }
        else {
            this.statusType = DamageEnum.BLUDGEONING;
        }
        return 0;
    }
    getStatusType() {
        return this.statusType;
    }
    setDuration(number, interval = IntervalEnum.TICK) {
        this.duration = number;
        this.durationInterval = interval;
        return 0;
    }
    getDuration() {
        return this.duration;
    }
    getDurationInterval() {
        return this.durationInterval;
    }
    setInterval(interval = IntervalEnum.ONCE, nth = 1) {
        if (IntervalEnum.hasOwnProperty(interval)) {
            this.intervalType = interval;
        }
        else {
            this.intervalType = IntervalEnum.ONCE;
        }
        this.intervalNth = nth;
        return 0;
    }
    getIntervalType() {
        return this.intervalType;
    }
    getIntervalNth() {
        return this.intervalNth;
    }
    getPriority() {
        return this.priority;
    }
    setPriority(number) {
        this.priority = number;
        return 0;
    }
    isHidden() {
        return this.hidden;
    }
    setHidden(boolean = true) {
        this.isHidden = boolean == true;
        return 0;
    }
    getStackCount() {
        return this.stackCount;
    }
    setDispel(dispel) {
        this.dispellable = dispel == true;
        return 0;
    }
    canDispel() {
        return this.dispellable;
    }
    /**
     * Sets maximum stack count; -1 for infinite
     * @param {number} stackCount 
     */
    setStackCount(stackCount = 1) {
        if (typeof stackCount != "number") {stackCount = Number.parseInt(stackCount) | 1;}
        else {stackCount = stackCount|0}
        if (stackCount < -1 || stackCount == 0) {
            stackCount = 1;
        }
        this.stackCount = stackCount;
        return this;
    }
    static allowedProperties() {
        return [
            "godMode",
            "essential",
            "weightModifier",
            "priceModifier",
            "health",
            "maxHealthModifier",
            "hungerModifier",
            "strengthModifier",
            "dexterityModifier",
            "constitutionModifier",
            "intelligenceModifier",
            "wisdomModifier",
            "charismaModifier",
            "staminaModifier",
            "armedModifier",
            "proficiencyBonusModifier",
            "damageRollCountModifier",
            "damageRollModifier",
            "silveredModifier"
        ];
    }
    allowedProperty(property) {
        return Effect.allowedProperties().indexOf(property) != -1;
    }

    static initialize() {
        Effect.effectList = {};
    }
    static get(id) {
        if (Effect.has(id)) {
            return Effect.effectList[id];
        }
        return 1;
    }
    static has(id) {
        return Effect.effectList.hasOwnProperty(id);
    }
    static set(id, effect) {
        Effect.effectList[id] = effect;
        return 0;
    }
    static remove(id) {
        delete Effect.effectList[id];
        return 0;
    }
    static list() {
        return Effect.effectList;
    }
    static clear() {
        for (let i in Effect.effectList) {
            Effect.effectList[i].dispose();
        }
        Effect.effectList = {};
        return 0;
    }
    static toJSON() {

    }
    static fromJSON(json) {
        if (typeof json == "string") {
            json = JSON.parse(json);
        }
        if (!(json instanceof Object) || !json.hasOwnProperty("id") || json.hasOwnProperty("name")) {
            return 2;
        }
        let effect = new Effect(json.id, json.name, json.description, json.iconID);
        if (!(effect instanceof Effect)) {
            return 1;
        }
        if (json.hasOwnProperty("modifiers")) {

        }
        if (json.hasOwnProperty("statusType")) {
            effect.setStatusType(json.statusType);
        }
        if (json.hasOwnProperty("duration")) {
            let duration = Number.parseInt(json.duration) || -1;
            if (duration == -1) {}
            else {
                effect.setDuration(duration);
                if (json.hasOwnProperty("durationInterval")) {
                    effect.setDuration(json.durationInterval);
                }
            }
        }
        if (json.hasOwnProperty("interval")) {
            effect.setInterval(json.interval);
        }
        if (json.hasOwnProperty("intervalNth")) {
            let intervalNth = Number.parseInt(json.intervalNth) || 1;
            effect.setInterval(intervalNth);
        }
        if (json.hasOwnProperty("priority")) {
            effect.setPriority(json.priority);
        }
        if (json.hasOwnProperty("hidden")) {
            effect.setHidden(json.hidden);
        }
        if (json.hasOwnProperty("stackCount")) {
            effect.setStackCount(json.stackCount);
        }
        if (json.hasOwnProperty("dispellable")) {
            effect.setDispel(json.dispellable);
        }
        return effect;
    }
}
Effect.initialize();