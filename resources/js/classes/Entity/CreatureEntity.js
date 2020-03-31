class CreatureEntity extends Entity {
    /**
     * Creates a CreatureEntity
     * @param  {string} id Unique ID
     * @param  {string} name Name
     * @param  {string} [description] Description
     * @param  {string} [iconID] Icon ID
     * @param  {CreatureTypeEnum} [creatureType] Creature Type
     * @param  {CreatureSubTypeEnum} [creatureSubType] Creature Sub-Type; dependant upon creatureType
     * @param  {SexEnum} [sex] SexEnum
     * @param  {number} [age] Age
     */
    constructor(id = "", name = "", description = "", iconID = "genericCharacterIcon", creatureType = CreatureTypeEnum.HUMANOID, creatureSubType = CreatureSubTypeEnum.FOX, sex = SexEnum.MALE, age = 18) {
        super(id, name, description, iconID);
        this.entityType = EntityEnum.CREATURE;

        this.age = 18;
        this.sex = SexEnum.MALE;
        this.creatureType = 0;
        this.creatureSubType = 0;
        /*
         Undead Fox Skeleton is a little hard to write out programatically.
        think of it like a Gnoll: Humanoid, Gnoll, or a Dragon: Dragon, Gold.
        now make the gnoll a zombie; Undead, Zombie, (Gnoll), or Undead, Dragon, (Gold)
        how do I program that without redefining what a zombie is for each race?
        */
        /*
         If creatureType is undead, 
        this should be the creatureType this was before it became undead
        */
        this.specialCreatureType = 0;
        /*
         If the creatureType is undead and creatureSubType is 
        ghost, ghoul, skeleton, or zombie, 
        this should be the creatureSubType it was before it became undead
        */
        this.specialCreatureSubType = 0;
        this.currentActions = {};
        this.stance = ActionEnum.STAND;
        this.cantripsKnown = {};
        this.cantripsKnownLimit = 0;
        this.spellsKnown = {};
        this.spellsKnownLimit = 0;
        this.spellSlots = {"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0};
        this.spellSlotsUsed = Object.assign({}, this.spellSlots);

        this.alerted = false;
        /**
         * Hunger; may affect health regeneration
         * @type {number} 0 to 100
         */
        this.hunger = 0;
        this.hungerModifier = 0;

        /**
         * Ability Score
         * @type {Object.<string, number>}
         */
        this.abilityScore = {};
        this.abilityScoreModifier = {};
        /**
         * Physical power
         * @type {number}
         */
        this.abilityScore["STRENGTH"] = 10;
        this.abilityScoreModifier["STRENGTH"] = 0;
        /**
         * Agility
         * @type {number}
         */
        this.abilityScore["DEXTERITY"] = 10;
        this.abilityScoreModifier["DEXTERITY"] = 0;
        /**
         * Endurance
         * @type {number}
         */
        this.abilityScore["CONSTITUTION"] = 10;
        this.abilityScoreModifier["CONSTITUTION"] = 0;
        /**
         * Reasoning and memory
         * @type {number}
         */
        this.abilityScore["INTELLIGENCE"] = 10;
        this.abilityScoreModifier["INTELLIGENCE"] = 0;
        /**
         * Perception and insight
         * @type {number}
         */
        this.abilityScore["WISDOM"] = 10;
        this.abilityScoreModifier["WISDOM"] = 0;
        /**
         * Force of personality
         * @type {number}
         */
        this.abilityScore["CHARISMA"] = 10;
        this.abilityScoreModifier["CHARISMA"] = 0;

        /**
         * @type {number}
         */
        this.exhaustion = 0;
        /**
         * @type {number}
         */
        this.exhaustionConditionModifier = 0;
        /**
         * @type {number}
         */
        this.exhaustionEffectModifier = 0;

        /**
         * @type {?string}
         */
        this.charmTarget = null;
        /**
         * @type {boolean}
         */
        this.canHarmCharmTarget = false;
        /**
         * @type {?string}
         */
        this.fearTarget = null;
        /**
         * @type {boolean}
         */
        this.canHarmFearTarget = false;

        /**
         * @type {number}
         */
        this.armourClass = 0;
        /**
         * @type {number}
         */
        this.armourClassConditionModifier = 0;
        /**
         * @type {number}
         */
        this.armourClassEffectModifier = 0;
        /**
         * @type {number}
         */
        this.armourClassOverride = -1;
        /**
         * @type {number}
         */
        this.armourClassConditionOverride = -1;
        /**
         * @type {number}
         */
        this.armourClassEffectOverride = -1;

        /**
         * @type {number}
         */
        this.movementSpeed = 1;
        /**
         * @type {number}
         */
        this.movementSpeedConditionModifier = 0;
        /**
         * @type {number}
         */
        this.movementSpeedEffectModifier = 0;
        /**
         * @type {number}
         */
        this.movementSpeedOverride = -1;
        /**
         * @type {number}
         */
        this.movementSpeedConditionOverride = -1;
        /**
         * @type {number}
         */
        this.movementSpeedEffectOverride = -1;

        /**
         * @type {number}
         */
        this.usedStandardActions = 0;
        /**
         * @type {number}
         */
        this.standardActions = 1;
        /**
         * @type {number}
         */
        this.standardActionsModifier = 0;
        /**
         * @type {number}
         */
        this.standardActionsConditionModifier = 0;
        /**
         * @type {number}
         */
        this.standardActionsEffectModifier = 0;
        /**
         * @type {number}
         */
        this.standardActionsOverride = -1;
        /**
         * @type {number}
         */
        this.standardActionsConditionOverride = -1;
        /**
         * @type {number}
         */
        this.standardActionsEffectOverride = -1;
        /**
         * @type {number}
         */
        this.usedMovementActions = 0;
        /**
         * @type {number}
         */
        this.movementActions = 1;
        /**
         * @type {number}
         */
        this.movementActionsModifier = 0;
        /**
         * @type {number}
         */
        this.movementActionsConditionModifier = 0;
        /**
         * @type {number}
         */
        this.movementActionsEffectModifier = 0;
        /**
         * @type {number}
         */
        this.movementActionsOverride = -1;
        /**
         * @type {number}
         */
        this.movementActionsConditionOverride = -1;
        /**
         * @type {number}
         */
        this.movementActionsEffectOverride = -1;
        /**
         * @type {number}
         */
        this.usedBonusActions = 0;
        /**
         * @type {number}
         */
        this.bonusActions = 1;
        /**
         * @type {number}
         */
        this.bonusActionsModifier = 0;
        /**
         * @type {number}
         */
        this.bonusActionsConditionModifier = 0;
        /**
         * @type {number}
         */
        this.bonusActionsEffectModifier = 0;
        /**
         * @type {number}
         */
        this.bonusActionsOverride = -1;
        /**
         * @type {number}
         */
        this.bonusActionsConditionOverride = -1;
        /**
         * @type {number}
         */
        this.bonusActionsEffectOverride = -1;
        /**
         * @type {number}
         */
        this.usedReactions = 0;
        /**
         * @type {number}
         */
        this.reactions = 1;
        /**
         * @type {number}
         */
        this.reactionsModifier = 0;
        /**
         * @type {number}
         */
        this.reactionsConditionModifier = 0;
        /**
         * @type {number}
         */
        this.reactionsEffectModifier = 0;
        /**
         * @type {number}
         */
        this.reactionsOverride = -1;
        /**
         * @type {number}
         */
        this.reactionsConditionOverride = -1;
        /**
         * @type {number}
         */
        this.reactionsEffectOverride = -1;

        this._level = 1;
        this.experiencePoints = 0;
        this._proficiencyBonus = 0;
        /**
         * Like health, but hitting 0 knocks you out instead of killing you.
         */
        this.stamina = 0;
        this.staminaModifier = 0;

        /**
         * Money
         * @type {number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.money = 0;
        this.moneyModifier = 0;
        this.moneyOverride = -1;
        this.proficiencyBonusModifier = 0;
        /**
         * Inspiration; idk how i'll handle this yet :v
         * @type {number}
         */
        this.inspiration = 0;
        /**
         * Living; updated by this.setHealth()
         * @type {boolean} True - living, false - dead
         */
        this.living = true;
        this.stabilized = true;
        this.nearDeathThisWindow = false;
        /**
         * Size
         * @type {SizeEnum}
         */
        this.size = SizeEnum.SMALL;
        this.armed = false;
        this.armedOverride = false;

        /**
         * Average weight, in kilograms, of creature; updated by this.generateProperties()
         * @type {number}
         */
        this.baseWeight = 36;
        /**
         * Average height, in metres, of creature; updated by this.generateProperties()
         * @type {number}
         */
        this.baseHeight = 1.20;
        /**
         * Average width, in metres, of creature; updated by this.generateProperties()
         * @type {number}
         */
        this.baseWidth = 0.4;
        /**
         * Weight, in kilograms; updated by this.generateProperties()
         * @type {number}
         */
        this.weight = 36;
        this.weightModifier = 0;
        /**
         * Height, in mtres; updated by this.generateProperties()
         * @type {number}
         */
        this.height = 1.2;
        /**
         * Width, in metres; updated by this.generateProperties()
         * @type {number}
         */
        this.width = 0.34;
        /**
         * Whether or not this CreatureEntity is a predator
         * @type {boolean} True - predator, false - prey
         */
        this.predator = true;

        /**
         * @type {object} Map of ProficiencyEnum; it's an object so i don't have to go through an array just to check if a known index exists :v
         */
        this.proficiencies = {};

        this.conditions = {};

        /**
         * @type {InstancedFurnitureEntity}
         */
        this.furniture = null;

        this.canMove = true;
        this.canHold = true;
        this.canSpeak = true;
        this.canHear = true;
        this.canSee = true;

        this.vantageOnAttack = 0;
        this.vantageOnAttackConditionOverride = 0;
        this.vantageOnAttackEffectOverride = 0;
        this.vantageAgainstAttack = 0;
        this.vantageAgainstAttackConditionOverride = 0;
        this.vantageAgainstAttackEffectOverride = 0;

        this.vantageAbilityChecks = {};
        this.vantageAbilityChecks["STRENGTH"] = 0;
        this.vantageAbilityChecks["DEXTERITY"] = 0;
        this.vantageAbilityChecks["CONSTITUTION"] = 0;
        this.vantageAbilityChecks["INTELLIGENCE"] = 0;
        this.vantageAbilityChecks["WISDOM"] = 0;
        this.vantageAbilityChecks["CHARISMA"] = 0;
        this.vantageAbilityChecksOverride = Object.assign({}, this.vantageAbilityChecks);
        this.vantageAbilityChecksConditionOverride = Object.assign({}, this.vantageAbilityChecks);
        this.vantageAbilityChecksEffectOverride = Object.assign({}, this.vantageAbilityChecks);

        this.vantageSenseChecks = {};
        this.vantageSenseChecks["TOUCH"] = 0;
        this.vantageSenseChecks["SIGHT"] = 0;
        this.vantageSenseChecks["HEARING"] = 0;
        this.vantageSenseChecks["SMELL"] = 0;
        this.vantageSenseChecks["TASTE"] = 0;
        this.vantageSenseChecks["SPACE"] = 0;
        this.vantageSenseChecksOverride = Object.assign({}, this.vantageSenseChecks);
        this.vantageSenseChecksConditionOverride = Object.assign({}, this.vantageSenseChecks);
        this.vantageSenseChecksEffectOverride = Object.assign({}, this.vantageSenseChecks);

        this.vantageSavingThrows = {};
        this.vantageSavingThrows["STRENGTH"] = 0;
        this.vantageSavingThrows["DEXTERITY"] = 0;
        this.vantageSavingThrows["CONSTITUTION"] = 0;
        this.vantageSavingThrows["INTELLIGENCE"] = 0;
        this.vantageSavingThrows["WISDOM"] = 0;
        this.vantageSavingThrows["CHARISMA"] = 0;
        this.vantageSavingThrowsOverride = Object.assign({}, this.vantageSavingThrows);
        this.vantageSavingThrowsConditionOverride = Object.assign({}, this.vantageSavingThrows);
        this.vantageSavingThrowsEffectOverride = Object.assign({}, this.vantageSavingThrows);

        this.resistanceTo = {};
        this.resistanceTo["BLUDGEONING"] = false;
        this.resistanceTo["ACID"] = false;
        this.resistanceTo["COLD"] = false;
        this.resistanceTo["FIRE"] = false;
        this.resistanceTo["FORCE"] = false;
        this.resistanceTo["LIGHTNING"] = false;
        this.resistanceTo["NECROTIC"] = false;
        this.resistanceTo["PIERCING"] = false;
        this.resistanceTo["POISON"] = false;
        this.resistanceTo["PSYCHIC"] = false;
        this.resistanceTo["RADIANT"] = false;
        this.resistanceTo["SLASHING"] = false;
        this.resistanceTo["THUNDER"] = false;
        this.resistanceTo["DISEASE"] = false; // special
        this.resistanceToConditionOverride = Object.assign({}, this.resistanceTo);
        this.resistanceToEffectOverride = Object.assign({}, this.resistanceTo);

        this.immuneTo = {};
        this.immuneTo["BLUDGEONING"] = false;
        this.immuneTo["ACID"] = false;
        this.immuneTo["COLD"] = false;
        this.immuneTo["FIRE"] = false;
        this.immuneTo["FORCE"] = false;
        this.immuneTo["LIGHTNING"] = false;
        this.immuneTo["NECROTIC"] = false;
        this.immuneTo["PIERCING"] = false;
        this.immuneTo["POISON"] = false;
        this.immuneTo["PSYCHIC"] = false;
        this.immuneTo["RADIANT"] = false;
        this.immuneTo["SLASHING"] = false;
        this.immuneTo["THUNDER"] = false;
        this.immuneTo["DISEASE"] = false; // special
        this.immuneToConditionOverride = Object.assign({}, this.immuneTo);
        this.immuneToEffectOverride = Object.assign({}, this.immuneTo);

        this.setSex(sex);
        this.setCreatureType(creatureType);
        this.createInventory();
        this.generateProperties(true);
        this.generateBaseStats(true);
        this.generateAdditionalStats();
        CreatureEntity.set(this.id, this);
    }

    setID(id) {
        CreatureEntity.remove(this.id);
        super.setID(id);
        CreatureEntity.set(this.id, this);
        return 0;
    }

    setSex(sex = SexEnum.MALE) {
        if (SexEnum.properties.hasOwnProperty(sex)) {
            this.sex = sex;
            return 0;
        }
        return 2;
    }
    getSex() {
        return this.sex;
    }

    getCreatureType() {
        return this.creatureType;
    }
    setCreatureType(creatureType) {
        if (CreatureTypeEnum.properties.hasOwnProperty(creatureType)) {
            this.creatureType = creatureType;
        }
        else {
            this.creatureType = CreatureTypeEnum.HUMANOID;
        }
        return 0;
    }
    getCreatureSubType() {
        return this.creatureSubType;
    }
    setCreatureSubType(creatureSubType) {
        switch (this.creatureType) {
            case CreatureTypeEnum.HUMANOID: {
                if (CreatureSubTypeEnum.properties.hasOwnProperty(creatureSubType)) {
                    this.creatureSubType = creatureSubType;
                }
                else {
                    this.creatureSubType = CreatureSubTypeEnum.FOX;
                }
                break;
            }
            case CreatureTypeEnum.UNDEAD: {
                if (CreatureSubTypeEnum.properties.hasOwnProperty(creatureSubType)) {
                    this.creatureSubType = creatureSubType;
                }
                else {
                    this.creatureSubType = CreatureSubTypeEnum.FOX;
                }
                break;
            }
        }
        return 0;
    }
    getHeight() {
        return this.height;
    }
    getWeight() {
        return this.weight + this.weightModifier;
    }
    getWidth() {
        return this.width;
    }
    getArmourClass() {
        if (this.armourClassEffectOverride >= 0) {
            return this.armourClassEffectOverride;
        }
        else if (this.armourClassConditionOverride >= 0) {
            return this.armourClassConditionOverride;
        }
        else if (this.armourClassOverride >= 0) {
            return this.armourClassOverride;
        }
        return this.armourClass + this.armourClassConditionModifier + this.armourClassEffectModifier;
    }

    setMoney(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        this.money = number;
        return 0;
    }
    modifyMoney(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setMoney(this.money + number);
    }
    getMoney() {
        if (this.moneyOverride >= 0) {
            return this.moneyOverride;
        }
        return this.money + this.moneyModifier;
    }

    setAge(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        this.age = number;
        return 0;
    }
    modifyAge(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setAge(this.age + number);
    }
    getAge() {
        return this.age;
    }

    setHunger(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) || 0;}
        else {number = number|0}
        this.hunger = number;
        return 0;
    }
    modifyHunger(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setHunger(this.hunger + number);
    }
    getHunger() {
        return this.hunger + this.hungerModifier;
    }

    setStrength(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) || 1;}
        else {number = number|0}
        this.abilityScore["STRENGTH"] = number;
        return 0;
    }
    modifyStrength(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setStrength(this.string + number);
    }
    getStrength() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.abilityScore["STRENGTH"] + this.abilityScoreModifier["STRENGTH"];
    }
    setDexterity(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) || 1;}
        else {number = number|0}
        this.abilityScore["DEXTERITY"] = number;
        return 0;
    }
    modifyDexterity(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setDexterity(this.abilityScore["DEXTERITY"] + number);
    }
    getDexterity() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.abilityScore["DEXTERITY"] + this.abilityScoreModifier["DEXTERITY"];
    }
    setConstitution(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) || 1;}
        else {number = number|0}
        this.abilityScore["CONSTITUTION"] = number;
        return 0;
    }
    modifyConstitution(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setConstitution(this.abilityScore["CONSTITUTION"] + number);
    }
    getConstitution() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.abilityScore["CONSTITUTION"] + this.abilityScoreModifier["CONSTITUTION"];
    }
    setIntelligence(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) || 1;}
        else {number = number|0}
        this.abilityScore["INTELLIGENCE"] = number;
        return 0;
    }
    modifyIntelligence(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setIntelligence(this.abilityScore["INTELLIGENCE"] + number);
    }
    getIntelligence() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.abilityScore["INTELLIGENCE"] + this.abilityScoreModifier["INTELLIGENCE"];
    }
    setWisdom(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) || 1;}
        else {number = number|0}
        this.abilityScore["WISDOM"] = number
        return 0;
    }
    modifyWisdom(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setWisdom(this.abilityScore["WISDOM"] + number);
    }
    getWisdom() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.abilityScore["WISDOM"] + this.abilityScoreModifier["WISDOM"];
    }
    setCharisma(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) || 1;}
        else {number = number|0}
        this.abilityScore["CHARISMA"] = number;
        return 0;
    }
    modifyCharisma(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setCharisma(this.abilityScore["CHARISMA"] + number);
    }
    getCharisma() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.abilityScore["CHARISMA"] + this.abilityScoreModifier["CHARISMA"];
    }
    getAbilityScores() {
        return {
            "STRENGTH": this.abilityScore["STRENGTH"],
            "DEXTERITY": this.abilityScore["DEXTERITY"],
            "CONSTITUTION": this.abilityScore["CONSTITUTION"],
            "INTELLIGENCE": this.abilityScore["INTELLIGENCE"],
            "WISDOM": this.abilityScore["WISDOM"],
            "CHARISMA": this.abilityScore["CHARISMA"]
        };
    }

    getLevel() {
        return this._level;
    }
    getProficiencyBonus() {
        return this._proficiencyBonus + this.proficiencyBonusModifier;
    }
    setXP(number = 0) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        this.experiencePoints = number;
        this._level = Game.calculateLevel(this.experiencePoints);
        this._proficiencyBonus = Game.calculateProficiencyByLevel(this._level);
        return 0;
    }
    modifyXP(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setXP(this.experiencePoints + number);
    }
    getXP() {
        return this.experiencePoints;
    }

    setHealth(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        if (this.getGodMode()) {
            this.health = this.getMaxHealth();
            return 0;
        }
        let tempNumber = -Game.calculateAbilityModifier(this.getConstitution());
        if (number > this.getMaxHealth()) {
            number = this.getMaxHealth();
        }
        else if (number < tempNumber) {
            number = tempNumber;
        }
        if (this.isEssential()) {
            if (number < 1) {
                number = 1;
            }
        }
        this.health = number;
        if (this.health <= tempNumber) {
            this.living = false;
            if (!this.nearDeathThisWindow) {
                this.stabilized = false;
                this.addCondition(ConditionEnum.DEAD);
                this.nearDeathThisWindow = true;
            }
            if (this.hasController()) {
                this.controller.doDeath();
            }
        }
        else if (this.health <= 0) {
            this.living = true;
            if (!this.nearDeathThisWindow) {
                this.stabilized = false;
                this.addCondition(ConditionEnum.UNCONSCIOUS);
                this.nearDeathThisWindow = true;
            }
        }
        else {
            this.nearDeathThisWindow = false;
        }
        return 0;
    }

    setStamina(number = 0) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        if (this.getGodMode()) {
            this.stamina = 0;
            return 0;
        }
        this.stamina = number;
        if (this.getStamina() > this.getHealth()) {
            if (this.hasController()) {
                this.setStance("LAY");
                this.controller.doLay();
            }
        }
        return 0;
    }
    modifyStamina(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setStamina(this.stamina + number);
    }
    getStamina() {
        return this.stamina;
    }

    getInspiration() {
        return this.inspiration;
    }
    getPassivePerception(hasAdvantage = false) {
        let number = 10;
        if (hasAdvantage) {
            number += 5;
        }
        number += this.getSkillScore("PERCEPTION");
        // add feats later
        return number;
    }
    getActivePerception(roll = 0) {
        if (typeof roll == "number" && roll > 0) {
            roll = roll|0;
        }
        else {
            roll = Game.roll(1, 20);
        }
        return roll + this.getSkillScore("PERCEPTION");
    }

    setStance(stance = ActionEnum.STAND) {
        if (this.stance == stance) {
            return 0;
        }
        if (ActionEnum.properties.hasOwnProperty(stance)) {
            this.stance = stance;
            if (this.hasController()) {
                if (this.stance == ActionEnum.LAY) {
                    this.controller.setIdleAnim("90_idleLyingDown01", 1, true);
                }
                else if (this.stance == ActionEnum.SIT) {
                    if (this.hasFurniture()) {
                        this.controller.setIdleAnim("90_idleSittingDown01", 1, true);
                    }
                    else {
                        this.controller.setIdleAnim("90_idleSittingOnGround01", 1, true);
                    }
                }
                else if (this.stance == ActionEnum.STAND) {
                    this.controller.setIdleAnim("90_idle01", 1, true);
                }
            }
            return 0;
        }
        return 2;
    }
    getStance() {
        return this.stance;
    }
    isCrouching() {
        return this.stance == ActionEnum.CROUCH;
    }
    isLying() {
        return this.stance == ActionEnum.LAY;
    }
    isSleeping() {
        return this.hasCondition("UNCONSCIOUS");
    }
    isSitting() {
        return this.stance == ActionEnum.SIT;
    }
    isStanding() {
        return this.stance == ActionEnum.STAND;
    }
    isFlying() {
        return this.stance == ActionEnum.FLY;
    }

    addCantrip(spell) {
        if (!(spell instanceof SpellEntity)) {
            if (SpellEntity.has(spell))
                spell = SpellEntity.get(spell);
            else
                return 2;
        }
        if (Object.keys(this.cantripsKnown).length >= this.cantripsKnownLimit) {
            return 1;
        }
        this.cantripsKnown[spell.getID()] = true;
        return 0;
    }
    removeCantrip(spell) {
        if (!(spell instanceof SpellEntity)) {
            if (SpellEntity.has(spell))
                spell = SpellEntity.get(spell);
            else
                return 2;
        }
        delete this.cantripsKnown[spell.getID()];
        return 0;
    }

    addSpell(spell) {
        if (!(spell instanceof SpellEntity)) {
            if (SpellEntity.has(spell))
                spell = SpellEntity.get(spell);
            else
                return 2;
        }
        if (Object.keys(this.spellsKnown).length >= this.spellsKnownLimit) {
            return 1;
        }
        this.spellsKnown[spell.getID()] = true;
        return 0;
    }
    removeSpell(spell) {
        if (!(spell instanceof SpellEntity)) {
            if (SpellEntity.has(spell))
                spell = SpellEntity.get(spell);
            else
                return 2;
        }
        delete this.spellsKnown[spell.getID()];
        return 0;
    }
    kill() {
        this.setHealth(-999);
        return 0;
    }
    resurrect(number = 1, removeIncapacitation = true) {
        if (typeof number != "number") { number = Number.parseInt(number) | 1; }
        else { number = Math.abs(number | 0) || 1 }
        if (removeIncapacitation) {
            this.removeCondition("UNCONSCIOUS");
            this.removeCondition("INCAPACITATED");
        }
        this.stabilized = true;
        this.setHealth(number);
        return 0;
    }
    isLiving() {
        return this.living;
    }
    isDead() {
        return !this.living;
    }
    getSize() {
        return this.size;
    }
    setSpellSlot(spellSlot, number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        if (!this.spellSlots.hasOwnProperty(spellSlot)) {
            return 2;
        }
        this.spellSlots[spellSlot] = number;
        return 0;
    }
    addSpellSlot(spellSlot, number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        if (!this.spellSlots.hasOwnProperty(spellSlot)) {
            return 2;
        }
        this.spellSlots[spellSlot] += number;
        return 0;
    }
    removeSpellSlot(spellSlot, number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        if (!this.spellSlots.hasOwnProperty(spellSlot)) {
            return 2;
        }
        this.spellSlots[spellSlot] -= number;
        return 0;
    }

    setUsedSpellSlot(spellSlot, number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        if (!this.spellSlotsUsed.hasOwnProperty(spellSlot)) {
            return 2;
        }
        this.spellSlotsUsed[spellSlot] = number;
        return 0;
    }
    addUsedSpellSlot(spellSlot, number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        if (!this.spellSlotsUsed.hasOwnProperty(spellSlot)) {
            return 2;
        }
        this.spellSlotsUsed[spellSlot] += number;
        return 0;
    }
    removeUsedSpellSlot(spellSlot, number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        if (!this.spellSlotsUsed.hasOwnProperty(spellSlot)) {
            return 2;
        }
        this.spellSlotsUsed[spellSlot] -= number;
        return 0;
    }
    clearUsedSpellSlots() {
        this.spellSlotsUsed = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0};
        return 0;
    }

    addProficiency(proficiency) {
        if (!ProficiencyEnum.hasOwnProperty(proficiency)) {
            if (ProficiencyEnum.properties.hasOwnProperty(proficiency)) {
                proficiency = ProficiencyEnum.properties[proficiency].key;
            }
            else {
                return false;
            }
        }
        this.proficiencies[proficiency] = true;
        return 0;
    }
    removeProficiency(proficiency) {
        delete this.proficiencies[proficiency];
        return 0;
    }
    hasProficiency(proficiency) {
        if (!ProficiencyEnum.hasOwnProperty(proficiency)) {
            if (ProficiencyEnum.properties.hasOwnProperty(proficiency)) {
                proficiency = ProficiencyEnum.properties[proficiency].key;
            }
            else {
                return false;
            }
        }
        return this.proficiencies.hasOwnProperty(proficiency);
    }
    getSkillScore(proficiency) {
        if (!ProficiencyEnum.hasOwnProperty(proficiency)) {
            if (ProficiencyEnum.properties.hasOwnProperty(proficiency)) {
                proficiency = ProficiencyEnum.properties[proficiency].key;
            }
            else {
                return false;
            }
        }
        let number = Game.calculateAbilityModifier(this.getAbility(Game.getSkillAbility(proficiency)));
        if (this.hasProficiency(proficiency)) {
            number += this.getProficiencyBonus();
        }
        return number;
    }
    clearSkills() {
        this.proficiencies.clear();
        return 0;
    }

    addCondition(condition) {
        if (ConditionEnum.hasOwnProperty(condition)) {}
        else if (ConditionEnum.properties.hasOwnProperty(condition)) {
            condition = ConditionEnum.properties[condition].key;
        }
        else {
            return 1;
        }
        this.conditions[condition] = true;
        return 0;
    }
    removeCondition(condition) {
        if (ConditionEnum.hasOwnProperty(condition)) {}
        else if (ConditionEnum.properties.hasOwnProperty(condition)) {
            condition = ConditionEnum.properties[condition].key;
        }
        else {
            return 1;
        }
        delete this.conditions[condition];
        return 0;
    }
    hasCondition(condition) {
        if (ConditionEnum.hasOwnProperty(condition)) {}
        else if (ConditionEnum.properties.hasOwnProperty(condition)) {
            condition = ConditionEnum.properties[condition].key;
        }
        else {
            return false;
        }
        return this.conditions.hasOwnProperty(condition);
    }
    clearConditions() {
        for (let condition in this.conditions) {
            this.removeCondition(condition);
        }
        return 0;
    }

    getExhaustion() {
        return this.exhaustion + this.exhaustionEffectModifier + this.exhaustionConditionModifier;
    }
    getMovementSpeed() {
        if (this.movementSpeedEffectOverride >= 0) {
            return this.movementSpeedEffectOverride;
        }
        else if (this.movementSpeedConditionOverride >= 0) {
            return this.movementSpeedConditionOverride;
        }
        else if (this.movementSpeedOverride >= 0) {
            return this.movementSpeedOverride;
        }
        return this.movementSpeed + this.movementSpeedConditionModifier + this.movementSpeedEffectModifier
    }

    hasAdvantageOnAbility(ability) {
        if (this.vantageAbilityChecksEffectOverride[ability] > 0) {
            return this.vantageAbilityChecksEffectOverride[ability];
        }
        else if (this.vantageAbilityChecksConditionOverride[ability] > 0) {
            return this.vantageAbilityChecksConditionOverride[ability];
        }
        else if (this.vantageAbilityChecksOverride[ability] > 0) {
            return this.vantageAbilityChecksOverride[ability];
        }
        return this.vantageAbilityChecks[ability] > 0;
    }
    hasDisadvantageOnAbility(ability) {
        if (this.vantageAbilityChecksEffectOverride[ability] < 0) {
            return this.vantageAbilityChecksEffectOverride[ability];
        }
        else if (this.vantageAbilityChecksConditionOverride[ability] < 0) {
            return this.vantageAbilityChecksConditionOverride[ability];
        }
        else if (this.vantageAbilityChecksOverride[ability] < 0) {
            return this.vantageAbilityChecksOverride[ability];
        }
        return this.vantageAbilityChecks[ability] < 0;
    }

    applyConditions() {
        this.resetConditionProperties();
        for (let condition in this.conditions) {
            this.applyCondition(condition);
        }
        this.applyExhaustion();
        return 0;
    }
    applyCondition(condition) {
        switch (condition) {
            case ConditionEnum.BLINDED: {
                this.vantageOnAttackConditionOverride--;
                this.vantageAgainstAttackConditionOverride--;
                this.vantageSenseChecksOverride[SenseEnum.SIGHT]--;
                break;
            }
            case ConditionEnum.CHARMED: {
                this.canHarmCharmTarget = false;
                break;
            }
            case ConditionEnum.DEAFENED: {
                this.vantageSenseChecksOverride[SenseEnum.HEARING]--;
                break;
            }
            case ConditionEnum.FATIGUED: {
                this.exhaustionConditionModifier += 1;
                break;
            }
            case ConditionEnum.FRIGHTENED: {
                break;
            }
            case ConditionEnum.GRAPPLED: {
                this.movementSpeedOverride = 0;
                break;
            }
            case ConditionEnum.INCAPACITATED: {
                this.standardActionsOverride = 0;
                this.reactionsOverride = 0;
                break;
            }
            case ConditionEnum.INVISIBLE: {
                this.vantageAgainstAttackConditionOverride++;
                this.vantageOnAttackConditionOverride++;
                break;
            }
            case ConditionEnum.PARALYZED: {
                this.standardActionsOverride = 0;
                this.reactionsOverride = 0;
                this.canMove = false;
                this.movementActionsOverride = 0;
                this.canSpeak = false;
                this.vantageSavingThrowsOverride["STRENGTH"]--;
                this.vantageSavingThrowsOverride["DEXTERITY"]--;
                this.vantageAgainstAttackConditionOverride--;
                break;
            }
            case ConditionEnum.PETRIFIED: {
                this.standardActionsOverride = 0;
                this.reactionsOverride = 0;
                this.canMove = false;
                this.movementActionsOverride = 0;
                this.canSpeak = false;
                this.canHear = false;
                this.canSee = false;
                this.vantageSavingThrowsOverride["STRENGTH"]--;
                this.vantageSavingThrowsOverride["DEXTERITY"]--;
                this.vantageAgainstAttackConditionOverride--;
                for (let damage in this.resistanceToConditionOverride) {this.resistanceToConditionOverride[damage] = true;}
                this.immuneToConditionOverride["POISON"] = true;
                this.immuneToConditionOverride["DISEASE"] = true;
                break;
            }
            case ConditionEnum.POISONED: {
                this.vantageOnAttackConditionOverride--;
                for (let ability in this.vantageAbilityChecks) {this.vantageAbilityChecks[ability]--;}
                for (let sense in this.vantageSenseChecks) {this.vantageSenseChecks[sense]--;}
                break;
            }
            case ConditionEnum.PRONE: {
                this.vantageOnAttackConditionOverride--;
                // If an attack is within 5', vantageAgainstAttack--, otherwise vantageAgainstAttack++
                break;
            }
            case ConditionEnum.RESTRAINED: {
                this.movementSpeedOverride = 0;
                this.vantageSavingThrows["DEXTERITY"]--;
                this.vantageOnAttackConditionOverride--;
                this.vantageAgainstAttackConditionOverride--;
                break;
            }
            case ConditionEnum.STUNNED: {
                this.standardActionsOverride = 0;
                this.reactionsOverride = 0;
                this.canMove = false;
                this.movementActionsOverride = 0;
                this.vantageSavingThrowsOverride["STRENGTH"]--;
                this.vantageSavingThrowsOverride["DEXTERITY"]--;
                this.vantageAgainstAttackConditionOverride--;
                break;
            }
            case ConditionEnum.UNCONSCIOUS: {
                this.standardActionsOverride = 0;
                this.reactionsOverride = 0;
                this.canMove = false;
                this.movementActionOverrideConditionOverride = 0;
                this.canSpeak = false;
                this.canHear = false;
                this.canSee = false;
                this.canHold = false;
                if (this instanceof CharacterEntity) {
                    this.unequipBySlot(ApparelSlotEnum.HAND_L);
                    this.unequipBySlot(ApparelSlotEnum.HAND_R);
                }
                this.vantageSavingThrowsOverride["STRENGTH"]--;
                this.vantageSavingThrowsOverride["DEXTERITY"]--;
                this.vantageAgainstAttackConditionOverride--;
                break;
            }
        }
        return 0;
    }
    applyExhaustion() {
        switch (this.getExaustion()) {
            case 6: {
                this.health = -Game.calculateAbilityModifier(this.getConstitution());
            }
            case 5: {
                this.movementSpeedConditionOverride = 0;
            }
            case 4: {
                if (this.healthMaxConditionOverride == -1) {
                    this.healthMaxConditionOverride = Math.floor(this.getMaxHealth() / 2);
                }
                if (this.health > this.healthMaxConditionOverride) {
                    this.health = this.healthMaxConditionOverride;
                }
            }
            case 3: {
                this.vantageOnAttackConditionOverride--;
                this.vantageSavingThrows["STRENGTH"]--;
                this.vantageSavingThrows["DEXTERITY"]--;
                this.vantageSavingThrows["CONSTITUTION"]--;
                this.vantageSavingThrows["INTELLIGENCE"]--;
                this.vantageSavingThrows["WISDOM"]--;
                this.vantageSavingThrows["CHARISMA"]--;
            }
            case 2: {
                if (this.movementSpeedConditionOverride != 0) {
                    this.movementSpeedConditionOverride = (this.movementSpeed + this.movementSpeedConditionModifier + this.movementSpeedEffectModifier) / 2;
                }
            }
            case 1: {
                this.vantageAbilityChecks["STRENGTH"]--;
                this.vantageAbilityChecks["DEXTERITY"]--;
                this.vantageAbilityChecks["CONSTITUTION"]--;
                this.vantageAbilityChecks["INTELLIGENCE"]--;
                this.vantageAbilityChecks["WISDOM"]--;
                this.vantageAbilityChecks["CHARISMA"]--;
            }
        }
        return 0;
    }
    resetEffectProperties() {
        super.resetEffectProperties();
        this.exhaustionEffectModifier = 0;
        this.armourClassEffectModifier = 0;
        this.armourClassEffectOverride = -1;
        this.movementSpeedEffectModifier = 0;
        this.movementSpeedEffectOverride = -1;

        this.vantageOnAttackEffectOverride = 0;
        this.vantageAgainstAttackEffectOverride = 0;
        this.vantageOnAttackEffectOverride = 0;
        this.vantageAgainstAttackEffectOverride = 0;

        for (let property in this.vantageAbilityChecksEffectOverride) {this.vantageAbilityChecksEffectOverride[property] = 0;};
        for (let property in this.vantageSenseChecksEffectOverride) {this.vantageSenseChecksEffectOverride[property] = 0;};
        for (let property in this.vantageSavingThrowsEffectOverride) {this.vantageSavingThrowsEffectOverride[property] = 0;};
        for (let property in this.resistanceToEffectOverride) {this.resistanceToEffectOverride[property] = false;};
        for (let property in this.immuneToEffectOverride) {this.immuneToEffectOverride[property] = false;};

        this.movementActionsEffectOverride = -1;
        this.movementActionsEffectModifier = 0;
        this.standardActionsEffectOverride = -1;
        this.standardActionsEffectModifier = 0;
        this.bonusActionsEffectModifier = 0;
        this.bonusActionsEffectOverride = -1;
        this.reactionsEffectModifier = 0;
        this.reactionsEffectOverride = -1;
        return 0;
    }
    resetConditionProperties() {
        super.resetConditionProperties();
        this.armourClassConditionModifier = 0;
        this.armourClassConditionOverride = -1;
        this.movementSpeedConditionModifier = 0;
        this.movementSpeedConditionOverride = -1;
        this.standardActionsConditionOverride = -1;
        this.movementActionsConditionOverride = -1;
        this.bonusActionsConditionOverride = -1;
        this.reactionsConditionOverride = -1;
        this.exhaustionConditionModifier = 0;

        this.canMove = true;
        this.canHold = true;
        this.canSpeak = true;
        this.canHear = true;
        this.canSee = true;

        this.vantageOnAttackConditionOverride = 0;
        this.vantageAgainstAttackConditionOverride = 0;
        this.vantageOnAttackConditionOverride = 0;
        this.vantageAgainstAttackConditionOverride = 0;

        for (let property in this.vantageAbilityChecksConditionOverride) {this.vantageAbilityChecksConditionOverride[property] = 0;};
        for (let property in this.vantageSenseChecksConditionOverride) {this.vantageSenseChecksConditionOverride[property] = 0;};
        for (let property in this.vantageSavingThrowsConditionOverride) {this.vantageSavingThrowsConditionOverride[property] = 0;};
        for (let property in this.resistanceToConditionOverride) {this.resistanceToConditionOverride[property] = false;};
        for (let property in this.immuneToConditionOverride) {this.immuneToConditionOverride[property] = false;};

        this.reactionsConditionOverride = -1;
        this.reactionsConditionModifier = 0;
        this.bonusActionsConditionOverride = -1;
        this.bonusActionsConditionModifier = 0;
        this.movementActionsConditionOverride = -1;
        this.movementActionsConditionModifier = 0;
        this.standardActionsConditionOverride = -1;
        this.standardActionsConditionModifier = 0;        
        return 0;
    }

    getFurniture() {
        return this.furniture;
    }
    hasFurniture() {
        return InstancedFurnitureEntity.has(this.furniture);
    }
    setFurniture(instancedFurnitureEntity) {
        if (instancedFurnitureEntity instanceof InstancedFurnitureEntity) {
            this.furniture = instancedFurnitureEntity.getID();
            instancedFurnitureEntity.addCharacter(this);
        }
        return 0;
    }
    removeFurniture() {
        this.furniture = null;
        return 0;
    }

    resetModifiers() {
        super.resetModifiers();
        this.hungerModifier = 0;
        this.abilityScoreModifier["STRENGTH"] = 0;
        this.abilityScoreModifier["DEXTERITY"] = 0;
        this.abilityScoreModifier["CONSTITUTION"] = 0;
        this.abilityScoreModifier["INTELLIGENCE"] = 0;
        this.abilityScoreModifier["WISDOM"] = 0;
        this.abilityScoreModifier["CHARISMA"] = 0;

        this.exhaustionConditionModifier = 0;
        this.exhaustionEffectModifier = 0;
        this.armourClassConditionModifier = 0;
        this.armourClassEffectModifier = 0;
        this.movementSpeedConditionModifier = 0;
        this.movementSpeedEffectModifier = 0;
        this.staminaModifier = 0;
        this.moneyModifier = 0;
        this.proficiencyBonusModifier = 0;
        this.weightModifier = 0;

        this.bonusActionsModifier = 0;
        this.bonusActionsEffectModifier = 0;
        this.bonusActionsConditionModifier = 0;
        this.reactionsModifier = 0;
        this.reactionsConditionModifier = 0;
        this.reactionsEffectModifier = 0;
        this.movementActionsEffectModifier = 0;
        this.movementActionsConditionModifier = 0;
        this.movementActionsModifier = 0;
        this.standardActionsEffectModifier = 0;
        this.standardActionsConditionModifier = 0;
        this.standardActionsModifier = 0;        
        return 0;
    }
    resetOverrides() {
        super.resetOverrides();
        this.armourClassOverride = -1;
        this.armourClassConditionOverride = -1;
        this.armourClassEffectOverride = -1;
        this.movementSpeedOverride = -1;
        this.movementSpeedConditionOverride = -1;
        this.movementSpeedEffectOverride = -1;
        this.standardActionsOverride = -1;
        this.movementActionsOverride = -1;
        this.bonusActionsOverride = -1;
        this.reactionsOverride = -1;
        this.moneyOverride = -1;
        this.armedOverride = false;

        this.vantageOnAttackConditionOverride = 0;
        this.vantageOnAttackEffectOverride = 0;
        this.vantageAgainstAttackConditionOverride = 0;
        this.vantageAgainstAttackEffectOverride = 0;

        for (let property in this.vantageAbilityChecksEffectOverride) {this.vantageAbilityChecksEffectOverride[property] = 0;};
        for (let property in this.vantageAbilityChecksConditionOverride) {this.vantageAbilityChecksConditionOverride[property] = 0;};
        for (let property in this.vantageAbilityChecksEffectOverride) {this.vantageAbilityChecksEffectOverride[property] = 0;};
        for (let property in this.vantageAbilityChecksOverride) {this.vantageAbilityChecksOverride[property] = 0;};
        for (let property in this.vantageSenseChecksConditionOverride) {this.vantageSenseChecksConditionOverride[property] = 0;};
        for (let property in this.vantageSenseChecksEffectOverride) {this.vantageSenseChecksEffectOverride[property] = 0;};
        for (let property in this.vantageSenseChecksOverride) {this.vantageSenseChecksOverride[property] = 0;};
        for (let property in this.vantageSavingThrowsConditionOverride) {this.vantageSavingThrowsConditionOverride[property] = 0;};
        for (let property in this.vantageSavingThrowsEffectOverride) {this.vantageSavingThrowsEffectOverride[property] = 0;};
        for (let property in this.vantageSavingThrowsOverride) {this.vantageSavingThrowsOverride[property] = 0;};
        for (let property in this.resistanceToConditionOverride) {this.resistanceToConditionOverride[property] = false;};
        for (let property in this.resistanceToEffectOverride) {this.resistanceToEffectOverride[property] = false;};
        for (let property in this.immuneToConditionOverride) {this.immuneToConditionOverride[property] = false;};
        for (let property in this.immuneToEffectOverride) {this.immuneToEffectOverride[property] = false;};

        this.standardActionsOverride = -1;
        this.standardActionsConditionOverride = -1;
        this.standardActionsEffectOverride = -1;
        this.movementActionsOverride = -1;
        this.movementActionsConditionOverride = -1;
        this.movementActionsEffectOverride = -1;
        this.bonusActionsOverride = -1;
        this.bonusActionsConditionOverride = -1;
        this.bonusActionsEffectOverride = -1;
        this.reactionsOverride = -1;
        this.reactionsConditionOverride = -1;
        this.reactionsEffectOverride = -1;
        return 0;
    }
    resetCombatActions() {
        this.usedStandardActions = 0;
        this.usedMovementActions = 0;
        this.usedBonusActions = 0;
        this.usedReactions = 0;
    }
    getAbility(ability) {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        if (!AbilityEnum.hasOwnProperty(ability)) {
            if (AbilityEnum.properties.hasOwnProperty(ability)) {
                ability = AbilityEnum.properties[ability].key;
            }
            else {
                return 0;
            }
        }
        return this.abilityScore[ability] + this.abilityScoreModifier[ability];
    }
    generateProperties(firstTime = false) {
        if (this.creatureType == CreatureType.HUMANOID) {
            return 0;
        }
        return 0;
    }
    generateBaseStats(firstTime = false) {
        let healthFraction = 1;
        if (!firstTime) {
            healthFraction = this.getHealth() / this.getMaxHealth();
        }
        this.setMaxHealth(this.getConstitution()/2 + this.getStrength()/2 + (this.getLevel() * this.getConstitution()/10));
        this.setHealth(this.getMaxHealth() * healthFraction);
        return 0;
    }
    generateAdditionalStats() {
        this.armourClass = 0;
        return 0;
    }

    isArmed() {
        return this.armed || this.armedOverride;
    }

    isAlerted() {
        return this.alerted;
    }

    /**
     * Overrides Entity.clone
     * @param  {string} id ID
     * @return {CreatureEntity} new CreatureEntity
     */
    clone(id = undefined) {
        let clone = new CharacterEntity(id, this.name, this.description, this.icon, this.creatureType, this.creatureSubType, this.sex, this.age, this.characterClass);
        if (this.hasInventory()) {
            clone.setInventory(this.inventory.clone(String(id).concat("Inventory")));
        }
        clone.assign(this);
        return clone;
    }
    /**
     * Creatures cannot be instanced. Use clone instead.
     * @param {string} id ID
     */
    createInstance(id = "") {
        return this.clone(id);
    }
    /**
     * Clones the entity's values over this
     * @param {CreatureEntity} entity 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(entity, verify = true) {
        if (verify && !(entity instanceof CreatureEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        if (entity.hasOwnProperty("specialCreatureType")) this.specialCreatureType = entity.specialCreatureType;
        if (entity.hasOwnProperty("specialCreatureSubType")) this.specialCreatureSubType = entity.specialCreatureSubType;
        if (entity.hasOwnProperty("cantripsKnown")) this.cantripsKnown = Object.assign({}, entity.cantripsKnown);
        if (entity.hasOwnProperty("cantripsKnownLimit")) this.cantripsKnownLimit = entity.cantripsKnownLimit;
        if (entity.hasOwnProperty("spellsKnown")) this.spellsKnown = Object.assign({}, entity.spellsKnown);
        if (entity.hasOwnProperty("spellsKnownLimit")) this.spellsKnownLimit = entity.spellsKnownLimit;
        if (entity.hasOwnProperty("spellSlots")) this.spellSlots = Object.assign({}, entity.spellSlots);
        if (entity.hasOwnProperty("spellSlotsUsed")) this.spellSlotsUsed = Object.assign({}, entity.spellSlotsUsed);
        if (entity.hasOwnProperty("hunger")) this.hunger = entity.hunger;
        if (entity.hasOwnProperty("abilityScore")) this.abilityScore = Object.assign({}, entity.abilityScore);
        if (entity.hasOwnProperty("abilityScoreModifier")) this.abilityScoreModifier = Object.assign({}, entity.abilityScoreModifier);
        if (entity.hasOwnProperty("charmTarget")) this.charmTarget = entity.charmTarget;
        if (entity.hasOwnProperty("canHarmCharmTarget")) this.canHarmCharmTarget = entity.canHarmCharmTarget;
        if (entity.hasOwnProperty("fearTarget")) this.fearTarget = entity.fearTarget;
        if (entity.hasOwnProperty("canHarmFearTarget")) this.canHarmFearTarget = entity.canHarmFearTarget;
        if (entity.hasOwnProperty("armourClassConditionModifier")) this.armourClassConditionModifier = entity.armourClassConditionModifier;
        if (entity.hasOwnProperty("armourClassConditionOverride")) this.armourClassConditionOverride = entity.armourClassConditionOverride;
        if (entity.hasOwnProperty("movementSpeedConditionModifier")) this.movementSpeedConditionModifier = entity.movementSpeedConditionModifier;
        if (entity.hasOwnProperty("movementSpeedConditionOverride")) this.movementSpeedConditionOverride = entity.movementSpeedConditionOverride;
        if (entity.hasOwnProperty("standardActionOverride")) this.standardActionsOverride = entity.standardActionsOverride;
        if (entity.hasOwnProperty("movementActionOverride")) this.movementActionsOverride = entity.movementActionsOverride;
        if (entity.hasOwnProperty("bonusActionOverride")) this.bonusActionsOverride = entity.bonusActionsOverride;
        if (entity.hasOwnProperty("reactionOverride")) this.reactionsOverride = entity.reactionsOverride;
        if (entity.hasOwnProperty("canMove")) this.canMove = entity.canMove;
        if (entity.hasOwnProperty("canHold")) this.canHold = entity.canHold;
        if (entity.hasOwnProperty("canSpeak")) this.canSpeak = entity.canSpeak;
        if (entity.hasOwnProperty("canHear")) this.canHear = entity.canHear;
        if (entity.hasOwnProperty("canSee")) this.canSee = entity.canSee;
        if (entity.hasOwnProperty("vantageOnAttack")) this.vantageOnAttack = entity.vantageOnAttack;
        if (entity.hasOwnProperty("vantageOnAttackConditionOverride")) this.vantageOnAttackConditionOverride = entity.vantageOnAttackConditionOverride;
        if (entity.hasOwnProperty("vantageOnAttackEffectOverride")) this.vantageOnAttackEffectOverride = entity.vantageOnAttackEffectOverride;
        if (entity.hasOwnProperty("vantageAgainstAttack")) this.vantageAgainstAttack = entity.vantageAgainstAttack;
        if (entity.hasOwnProperty("vantageAgainstAttackConditionOverride")) this.vantageAgainstAttackConditionOverride = entity.vantageAgainstAttackConditionOverride;
        if (entity.hasOwnProperty("vantageAgainstAttackEffectOverride")) this.vantageAgainstAttackEffectOverride = entity.vantageAgainstAttackEffectOverride;
        if (entity.hasOwnProperty("vantageAbilityChecks")) this.vantageAbilityChecks = Object.assign({}, entity.vantageAbilityChecks);
        if (entity.hasOwnProperty("vantageAbilityChecksConditionOverride")) this.vantageAbilityChecksConditionOverride = Object.assign({}, entity.vantageAbilityChecksConditionOverride);
        if (entity.hasOwnProperty("vantageAbilityChecksEffectOverride")) this.vantageAbilityChecksEffectOverride = Object.assign({}, entity.vantageAbilityChecksEffectOverride);
        if (entity.hasOwnProperty("vantageAbilityChecksOverride")) this.vantageAbilityChecksOverride = Object.assign({}, entity.vantageAbilityChecksOverride);
        if (entity.hasOwnProperty("vantageSenseChecks")) this.vantageSenseChecks = Object.assign({}, entity.vantageSenseChecks);
        if (entity.hasOwnProperty("vantageSenseChecksConditionOverride")) this.vantageSenseChecksConditionOverride = Object.assign({}, entity.vantageSenseChecksConditionOverride);
        if (entity.hasOwnProperty("vantageSenseChecksEffectOverride")) this.vantageSenseChecksEffectOverride = Object.assign({}, entity.vantageSenseChecksEffectOverride);
        if (entity.hasOwnProperty("vantageSenseChecksOverride")) this.vantageSenseChecksOverride = Object.assign({}, entity.vantageSenseChecksOverride);
        if (entity.hasOwnProperty("vantageSavingThrows")) this.vantageSavingThrows = Object.assign({}, entity.vantageSavingThrows);
        if (entity.hasOwnProperty("vantageSavingThrowsConditionOverride")) this.vantageSavingThrowsConditionOverride = Object.assign({}, entity.vantageSavingThrowsConditionOverride);
        if (entity.hasOwnProperty("vantageSavingThrowsEffectOverride")) this.vantageSavingThrowsEffectOverride = Object.assign({}, entity.vantageSavingThrowsEffectOverride);
        if (entity.hasOwnProperty("vantageSavingThrowsOverride")) this.vantageSavingThrowsOverride = Object.assign({}, entity.vantageSavingThrowsOverride);
        if (entity.hasOwnProperty("resistanceTo")) this.resistanceTo = Object.assign({}, entity.resistanceTo);
        if (entity.hasOwnProperty("resistanceToConditionOverride")) this.resistanceToConditionOverride = Object.assign({}, entity.resistanceToConditionOverride);
        if (entity.hasOwnProperty("resistanceToEffectOverride")) this.resistanceToEffectOverride = Object.assign({}, entity.resistanceToEffectOverride);
        if (entity.hasOwnProperty("immuneTo")) this.immuneTo = Object.assign({}, entity.immuneTo);
        if (entity.hasOwnProperty("immuneToConditionOverride")) this.immuneToConditionOverride = Object.assign({}, entity.immuneToConditionOverride);
        if (entity.hasOwnProperty("immuneToEffectOverride")) this.immuneToEffectOverride = Object.assign({}, entity.immuneToEffectOverride);
        if (entity.hasOwnProperty("level")) this.level = entity._level;
        if (entity.hasOwnProperty("experiencePoints")) this.experiencePoints = entity.experiencePoints;
        if (entity.hasOwnProperty("stamina")) this.stamina = entity.stamina;
        if (entity.hasOwnProperty("money")) this.money = entity.money;
        if (entity.hasOwnProperty("moneyOverride")) this.moneyOverride = entity.moneyOverride;
        if (entity.hasOwnProperty("living")) this.living = entity.living;
        if (entity.hasOwnProperty("size")) this.size = entity.size;
        if (entity.hasOwnProperty("baseWeight")) this.baseWeight = entity.baseWeight;
        if (entity.hasOwnProperty("baseHeight")) this.baseHeight = entity.baseHeight;
        if (entity.hasOwnProperty("baseWidth")) this.baseWidth = entity.baseWidth;
        if (entity.hasOwnProperty("weight")) this.weight = entity.weight;
        if (entity.hasOwnProperty("height")) this.height = entity.height;
        if (entity.hasOwnProperty("width")) this.width = entity.width;
        if (entity.hasOwnProperty("predator")) this.predator = entity.predator;
        if (entity.hasOwnProperty("proficiencies")) this.proficiencies = Object.assign({}, entity.proficiencies);
        if (entity.hasOwnProperty("proficiencyBonusModifier")) this.proficiencyBonusModifier = entity.proficiencyBonusModifier;
        if (entity.hasOwnProperty("conditions")) this.conditions = Object.assign({}, entity.conditions);
        if (entity.hasOwnProperty("usedStandardActions")) this.usedStandardActions = entity.usedStandardActions;
        if (entity.hasOwnProperty("standardActions")) this.standardActions = entity.standardActions;
        if (entity.hasOwnProperty("standardActionsModifier")) this.standardActionsModifier = entity.standardActionsModifier;
        if (entity.hasOwnProperty("standardActionsConditionModifier")) this.standardActionsConditionModifier = entity.standardActionsConditionModifier;
        if (entity.hasOwnProperty("standardActionsEffectModifier")) this.standardActionsEffectModifier = entity.standardActionsEffectModifier;
        if (entity.hasOwnProperty("standardActionsOverride")) this.standardActionsOverride = entity.standardActionsOverride;
        if (entity.hasOwnProperty("standardActionsConditionOverride")) this.standardActionsConditionOverride = entity.standardActionsConditionOverride;
        if (entity.hasOwnProperty("standardActionsEffectOverride")) this.standardActionsEffectOverride = entity.standardActionsEffectOverride;
        if (entity.hasOwnProperty("usedMovementActions")) this.usedMovementActions = entity.usedMovementActions;
        if (entity.hasOwnProperty("movementActions")) this.movementActions = entity.movementActions;
        if (entity.hasOwnProperty("movementActionsModifier")) this.movementActionsModifier = entity.movementActionsModifier;
        if (entity.hasOwnProperty("movementActionsConditionModifier")) this.movementActionsConditionModifier = entity.movementActionsConditionModifier;
        if (entity.hasOwnProperty("movementActionsEffectModifier")) this.movementActionsEffectModifier = entity.movementActionsEffectModifier;
        if (entity.hasOwnProperty("movementActionsOverride")) this.movementActionsOverride = entity.movementActionsOverride;
        if (entity.hasOwnProperty("movementActionsConditionOverride")) this.movementActionsConditionOverride = entity.movementActionsConditionOverride;
        if (entity.hasOwnProperty("movementActionsEffectOverride")) this.movementActionsEffectOverride = entity.movementActionsEffectOverride;
        if (entity.hasOwnProperty("usedBonusActions")) this.usedBonusActions = entity.usedBonusActions;
        if (entity.hasOwnProperty("bonusActions")) this.bonusActions = entity.bonusActions;
        if (entity.hasOwnProperty("bonusActionsModifier")) this.bonusActionsModifier = entity.bonusActionsModifier;
        if (entity.hasOwnProperty("bonusActionsConditionModifier")) this.bonusActionsConditionModifier = entity.bonusActionsConditionModifier;
        if (entity.hasOwnProperty("bonusActionsEffectModifier")) this.bonusActionsEffectModifier = entity.bonusActionsEffectModifier;
        if (entity.hasOwnProperty("bonusActionsOverride")) this.bonusActionsOverride = entity.bonusActionsOverride;
        if (entity.hasOwnProperty("bonusActionsConditionOverride")) this.bonusActionsConditionOverride = entity.bonusActionsConditionOverride;
        if (entity.hasOwnProperty("bonusActionsEffectOverride")) this.bonusActionsEffectOverride = entity.bonusActionsEffectOverride;
        if (entity.hasOwnProperty("usedReactions")) this.usedReactions = entity.usedReactions;
        if (entity.hasOwnProperty("reactions")) this.reactions = entity.reactions;
        if (entity.hasOwnProperty("reactionsModifier")) this.reactionsModifier = entity.reactionsModifier;
        if (entity.hasOwnProperty("reactionsConditionModifier")) this.reactionsConditionModifier = entity.reactionsConditionModifier;
        if (entity.hasOwnProperty("reactionsEffectModifier")) this.reactionsEffectModifier = entity.reactionsEffectModifier;
        if (entity.hasOwnProperty("reactionsOverride")) this.reactionsOverride = entity.reactionsOverride;
        if (entity.hasOwnProperty("reactionsConditionOverride")) this.reactionsConditionOverride = entity.reactionsConditionOverride;
        if (entity.hasOwnProperty("reactionsEffectOverride")) this.reactionsEffectOverride = entity.reactionsEffectOverride;
        return 0;
    }
    dispose() {
        if (this == Game.player) {
            return false;
        }
        this.setLocked(true);
        this.setEnabled(false);
        CreatureEntity.remove(this.id);
        this.clearSkills();
        this.clearConditions();
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "CreatureEntity";
    }

    static initialize() {
        CreatureEntity.creatureEntityList = {};
    }
    static get(id) {
        if (CreatureEntity.has(id)) {
            return CreatureEntity.creatureEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return CreatureEntity.creatureEntityList.hasOwnProperty(id);
    }
    static set(id, characterEntity) {
        CreatureEntity.creatureEntityList[id] = characterEntity;
        return 0;
    }
    static remove(id) {
        delete CreatureEntity.creatureEntityList[id];
        return 0;
    }
    static list() {
        return CreatureEntity.creatureEntityList;
    }
    static clear() {
        for (let i in CreatureEntity.creatureEntityList) {
            CreatureEntity.creatureEntityList[i].dispose();
        }
        CreatureEntity.creatureEntityList = {};
        return 0;
    }
}
CreatureEntity.initialize();