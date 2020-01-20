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
         * Object<string, function>
         */
        this.modifiers = {};
        this.statusType = DamageEnum.BLUDGEONING;
        /**
         * Duration in ticks; -1 is indefinite, 0 is one-and-done
         */
        this.duration = -1;
        /**
         * Only to be set if the duration is greater than 0, or is equal to -1
         * @type {IntervalEnum}
         */
        this.interval = IntervalEnum.ONCE;
        this.priority = 1000;
        this.hidden = false;
        this.stackCount = 1;
        /**
         * Could be set to true if the duration is greater than 0, or is equal to -1
         */
        this.dispellable = false;
        Effect.set(this.id, this);
    }
    addModifier(property, modification) { // TODO: what about unmodifying?
        if (this.allowedProperty(property)) {
            if (typeof modification == "function" && typeof modification(1) != "undefined") {
                this.modifiers[property] = modification;
            }
        }
        return this;
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
    setDuration(number) {
        this.duration = number;
        return 0;
    }
    getDuration() {
        return this.duration;
    }
    setInterval(interval = IntervalEnum.ONCE) {
        if (IntervalEnum.hasOwnProperty(interval)) {
            this.interval = interval;
        }
        else {
            this.interval = IntervalEnum.ONCE;
        }
        return 0;
    }
    getInterval() {
        return this.interval;
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
    setStackCount(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 1;}
        else {number = number|0}
        this.stackCount = number;
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
        if (!json.hasOwnProperty("id") || json.hasOwnProperty("name")) {
            return 2;
        }
        let effect = new Effect(json.id, json.name, json.description, json.iconID);
        if (!(effect instanceof Effect)) {
            return 1;
        }

        if (json.hasOwnProperty("statusType")) {
            effect.setStatusType(json.statusType);
        }
        if (json.hasOwnProperty("duration")) {
            effect.setDuration(json.duration);
        }
        if (json.hasOwnProperty("interval")) {
            effect.setInterval(json.interval);
        }
        if (json.hasOwnProperty("priority")) {
            effect.setPriority(json.priority);
        }
        if (json.hasOwnProperty("hidden")) {
            effect.hidden = json.hidden;
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