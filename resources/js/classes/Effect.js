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
         * Pseudo-map of properties to the functions that set them
         * {string: {OperatorEnum: function}}
         * @type {object}
         */
        this.modifiers = {};
        this.statusType = DamageEnum.BLUDGEONING;

        /**
         * How the effect can be triggered; Time-based (INTERVAL,) Action-based (ACTION,) or Area-based (AREA.)
         * TODO: Figure out how to implement area-based triggers :v
         */
        this.trigger = TriggerEnum.INTERVAL;

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
                this.modifiers[property] = {"operation":operation, "modification":modification};
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
        if (!(typeof source[property] == "number")) {
            return value;
        }
        switch (this.modifiers[property]["operation"]) {
            case OperationsEnum.EQUALS: {
                if (typeof this.modifiers[property]["modification"] == "function") {
                    value = this.modifiers[property]["modification"](source);
                }
                else {
                    value = this.modifiers[property]["modification"];
                }
                break;
            }
            case OperationsEnum.ADD: {
                if (typeof this.modifiers[property]["modification"] == "function") {
                    value = source[property] + this.modifiers[property]["modification"](source);
                }
                else {
                    value = source[property] + this.modifiers[property]["modification"];
                }
                break;
            }
            case OperationsEnum.SUBTRACT: {
                if (typeof this.modifiers[property]["modification"] == "function") {
                    value = source[property] - this.modifiers[property]["modification"](source);
                }
                else {
                    value = source[property] - this.modifiers[property]["modification"];
                }
                break;
            }
            case OperationsEnum.MULTIPLY: {
                if (typeof this.modifiers[property]["modification"] == "function") {
                    value = source[property] * this.modifiers[property]["modification"](source);
                }
                else {
                    value = source[property] * this.modifiers[property]["modification"];
                }
                break;
            }
            case OperationsEnum.DIVIDE: {
                if (typeof this.modifiers[property]["modification"] == "function") {
                    value = source[property] / this.modifiers[property]["modification"](source);
                }
                else {
                    value = source[property] / this.modifiers[property]["modification"];
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

    dispose() {
        for (let property in this.modifiers) {
            delete this.modifiers[property]["operation"]
            delete this.modifiers[property]["modification"]
            delete this.modifiers[property];
        }
        Effect.remove(this.id);
        return undefined;
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
    static toJSON(effect) {
        if (effect instanceof Effect) {}
        else if (Effect.has(effect)) {
            effect = Effect.get(effect);
        }
        else {
            return null;
        }
        let jsonObject = JSON.parse(JSON.stringify(effect));
        for (let property in effect.modifiers) {
            jsonObject.modifiers[property]["modification"] = effect.modifiers[property]["modification"].toString();
        }
        return JSON.stringify(jsonObject);
    }
    static fromJSON(json) {
        if (typeof json == "string") {
            console.group(`Running Effect.fromJSON(${json.slice(0,12)}...)`);
            json = JSON.parse(json);
        }
        else {
            console.group("Running Effect.fromJSON(...)");
        }
        if (!(json instanceof Object) || !json.hasOwnProperty("id") || !json.hasOwnProperty("name")) {
            console.warn(`Supplied JSON was not valid.`);
            console.groupEnd();
            return 2;
        }
        console.info("Supplied JSON was valid.");
        let effect = new Effect(json.id, json.name, json.description, json.iconID);
        if (!(effect instanceof Effect)) {
            console.warn(`Could not create a new Effect`);
            console.groupEnd();
            return 1;
        }
        console.info(`Effect (${effect.getID()}) has been created.`);
        if (json.hasOwnProperty("modifiers")) {
            for (let property in json.modifiers) {
                let modification = null;
                switch (typeof json.modifiers[property]["modification"]) {
                    case "number": {
                        modification = typeof json.modifiers[property]["modification"];
                        console.info(`Supplied modifier for (${property}) was a valid number.`);
                        break;
                    }
                    case "boolean": {
                        modification = typeof json.modifiers[property]["modification"];
                        console.info(`Supplied modifier for (${property}) was a valid boolean.`);
                        break;
                    }
                    case "string": {
                        try {
                            // I know it's ugly, but it works.
                            modification = new Function('return ' + json.modifiers[property]["modification"])();
                        }
                        catch (exception) {
                            effect.dispose();
                            console.warn(`Supplied modifier for (${property}) was not a valid function.`);
                            console.groupEnd();
                            return 2;
                        }
                        finally {
                            console.info(`Supplied modifier for (${property}) was a valid functions.`);
                        }
                        break;
                    }
                    default: {
                        effect.dispose();
                        console.warn(`Supplied modifier for (${property}) was not a valid type.`);
                        console.groupEnd();
                        return 2;
                    }
                }
                effect.addModifier(property, json.modifiers[property]["operation"], modification);
            }
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
            effect.setInterval(Number.parseInt(json.intervalNth) || 1);
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
        console.info(`Effect (${effect.getID()}) has been successfully created.`);
        console.groupEnd();
        return effect;
    }
}
Effect.initialize();