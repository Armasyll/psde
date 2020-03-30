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
        this.spellSlots = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0};
        this.spellSlotsUsed = Object.assign({}, this.spellSlots);

        this.alerted = false;
        /**
         * Hunger; may affect health regeneration
         * @type {number} 0 to 100
         */
        this.hunger = 0;
        this.hungerModifier = 0;

        this.abilityScore = {};
        this.abilityScoreModifier = {};
        /**
         * Physical power
         * @type {number}
         */
        this.abilityScore[AbilityEnum.STRENGTH] = 10;
        this.abilityScoreModifier[AbilityEnum.STRENGTH] = 0;
        /**
         * Agility
         * @type {number}
         */
        this.abilityScore[AbilityEnum.DEXTERITY] = 10;
        this.abilityScoreModifier[AbilityEnum.DEXTERITY] = 0;
        /**
         * Endurance
         * @type {number}
         */
        this.abilityScore[AbilityEnum.CONSTITUTION] = 10;
        this.abilityScoreModifier[AbilityEnum.CONSTITUTION] = 0;
        /**
         * Reasoning and memory
         * @type {number}
         */
        this.abilityScore[AbilityEnum.INTELLIGENCE] = 10;
        this.abilityScoreModifier[AbilityEnum.INTELLIGENCE] = 0;
        /**
         * Perception and insight
         * @type {number}
         */
        this.abilityScore[AbilityEnum.WISDOM] = 10;
        this.abilityScoreModifier[AbilityEnum.WISDOM] = 0;
        /**
         * Force of personality
         * @type {number}
         */
        this.abilityScore[AbilityEnum.CHARISMA] = 10;
        this.abilityScoreModifier[AbilityEnum.CHARISMA] = 0;

        this.exhaustion = 0;
        this.exhaustionConditionModifier = 0;
        this.exhaustionEffectModifier = 0;

        this.charmTarget = null;
        this.canHarmCharmTarget = true;
        this.fearTarget = null;
        this.canHarmFearTarget = true;

        this.armourClass = 0;
        this.armourClassConditionModifier = 0;
        this.armourClassEffectModifier = 0;
        this.armourClassOverride = -1;
        this.armourClassConditionOverride = -1;
        this.armourClassEffectOverride = -1;

        this.movementSpeed = 1;
        this.movementSpeedConditionModifier = 0;
        this.movementSpeedEffectModifier = 0;
        this.movementSpeedOverride = -1;
        this.movementSpeedConditionOverride = -1;
        this.movementSpeedEffectOverride = -1;

        this.standardActionOverride = -1;
        this.movementActionOverride = -1;
        this.bonusActionOverride = -1;
        this.reactionOverride = -1;

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

        this.disadvantageOnAttack = false;
        this.disadvantageAgainstAttack = false;
        this.advantageOnAttack = false;
        this.advantageAgainstAttack = false;

        this.advantageAbilityChecks = {};
        this.advantageAbilityChecks[AbilityEnum.STRENGTH] = false;
        this.advantageAbilityChecks[AbilityEnum.DEXTERITY] = false;
        this.advantageAbilityChecks[AbilityEnum.CONSTITUTION] = false;
        this.advantageAbilityChecks[AbilityEnum.INTELLIGENCE] = false;
        this.advantageAbilityChecks[AbilityEnum.WISDOM] = false;
        this.advantageAbilityChecks[AbilityEnum.CHARISMA] = false;

        this.disadvantageAbilityChecks = {};
        this.disadvantageAbilityChecks[AbilityEnum.STRENGTH] = false;
        this.disadvantageAbilityChecks[AbilityEnum.DEXTERITY] = false;
        this.disadvantageAbilityChecks[AbilityEnum.CONSTITUTION] = false;
        this.disadvantageAbilityChecks[AbilityEnum.INTELLIGENCE] = false;
        this.disadvantageAbilityChecks[AbilityEnum.WISDOM] = false;
        this.disadvantageAbilityChecks[AbilityEnum.CHARISMA] = false;

        this.advantageSenseChecks = {};
        this.advantageSenseChecks[SenseEnum.TOUCH] = false;
        this.advantageSenseChecks[SenseEnum.SIGHT] = false;
        this.advantageSenseChecks[SenseEnum.HEARING] = false;
        this.advantageSenseChecks[SenseEnum.SMELL] = false;
        this.advantageSenseChecks[SenseEnum.TASTE] = false;
        this.advantageSenseChecks[SenseEnum.SPACE] = false;

        this.disadvantageSenseChecks = {};
        this.disadvantageSenseChecks[SenseEnum.TOUCH] = false;
        this.disadvantageSenseChecks[SenseEnum.SIGHT] = false;
        this.disadvantageSenseChecks[SenseEnum.HEARING] = false;
        this.disadvantageSenseChecks[SenseEnum.SMELL] = false;
        this.disadvantageSenseChecks[SenseEnum.TASTE] = false;
        this.disadvantageSenseChecks[SenseEnum.SPACE] = false;

        this.advantageSavingThrows = {};
        this.advantageSavingThrows[AbilityEnum.STRENGTH] = false;
        this.advantageSavingThrows[AbilityEnum.DEXTERITY] = false;
        this.advantageSavingThrows[AbilityEnum.CONSTITUTION] = false;
        this.advantageSavingThrows[AbilityEnum.INTELLIGENCE] = false;
        this.advantageSavingThrows[AbilityEnum.WISDOM] = false;
        this.advantageSavingThrows[AbilityEnum.CHARISMA] = false;

        this.disadvantageSavingThrows = {};
        this.disadvantageSavingThrows[AbilityEnum.STRENGTH] = false;
        this.disadvantageSavingThrows[AbilityEnum.DEXTERITY] = false;
        this.disadvantageSavingThrows[AbilityEnum.CONSTITUTION] = false;
        this.disadvantageSavingThrows[AbilityEnum.INTELLIGENCE] = false;
        this.disadvantageSavingThrows[AbilityEnum.WISDOM] = false;
        this.disadvantageSavingThrows[AbilityEnum.CHARISMA] = false;

        this.failSavingThrows = {};
        this.failSavingThrows[AbilityEnum.STRENGTH] = false;
        this.failSavingThrows[AbilityEnum.DEXTERITY] = false;
        this.failSavingThrows[AbilityEnum.CONSTITUTION] = false;
        this.failSavingThrows[AbilityEnum.INTELLIGENCE] = false;
        this.failSavingThrows[AbilityEnum.WISDOM] = false;
        this.failSavingThrows[AbilityEnum.CHARISMA] = false;

        this.resistanceTo = {};
        this.resistanceTo[DamageEnum.BLUDGEONING] = false;
        this.resistanceTo[DamageEnum.ACID] = false;
        this.resistanceTo[DamageEnum.COLD] = false;
        this.resistanceTo[DamageEnum.FIRE] = false;
        this.resistanceTo[DamageEnum.FORCE] = false;
        this.resistanceTo[DamageEnum.LIGHTNING] = false;
        this.resistanceTo[DamageEnum.NECROTIC] = false;
        this.resistanceTo[DamageEnum.PIERCING] = false;
        this.resistanceTo[DamageEnum.POISON] = false;
        this.resistanceTo[DamageEnum.PSYCHIC] = false;
        this.resistanceTo[DamageEnum.RADIANT] = false;
        this.resistanceTo[DamageEnum.SLASHING] = false;
        this.resistanceTo[DamageEnum.THUNDER] = false;
        this.resistanceTo[DamageEnum.DISEASE] = false; // special

        this.immuneTo = {};
        this.immuneTo[DamageEnum.BLUDGEONING] = false;
        this.immuneTo[DamageEnum.ACID] = false;
        this.immuneTo[DamageEnum.COLD] = false;
        this.immuneTo[DamageEnum.FIRE] = false;
        this.immuneTo[DamageEnum.FORCE] = false;
        this.immuneTo[DamageEnum.LIGHTNING] = false;
        this.immuneTo[DamageEnum.NECROTIC] = false;
        this.immuneTo[DamageEnum.PIERCING] = false;
        this.immuneTo[DamageEnum.POISON] = false;
        this.immuneTo[DamageEnum.PSYCHIC] = false;
        this.immuneTo[DamageEnum.RADIANT] = false;
        this.immuneTo[DamageEnum.SLASHING] = false;
        this.immuneTo[DamageEnum.THUNDER] = false;
        this.immuneTo[DamageEnum.DISEASE] = false; // special

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
        this.abilityScore[AbilityEnum.STRENGTH] = number;
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
        return this.abilityScore[AbilityEnum.STRENGTH] + this.abilityScoreModifier[AbilityEnum.STRENGTH];
    }
    setDexterity(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) || 1;}
        else {number = number|0}
        this.abilityScore[AbilityEnum.DEXTERITY] = number;
        return 0;
    }
    modifyDexterity(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setDexterity(this.abilityScore[AbilityEnum.DEXTERITY] + number);
    }
    getDexterity() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.abilityScore[AbilityEnum.DEXTERITY] + this.abilityScoreModifier[AbilityEnum.DEXTERITY];
    }
    setConstitution(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) || 1;}
        else {number = number|0}
        this.abilityScore[AbilityEnum.CONSTITUTION] = number;
        return 0;
    }
    modifyConstitution(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setConstitution(this.abilityScore[AbilityEnum.CONSTITUTION] + number);
    }
    getConstitution() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.abilityScore[AbilityEnum.CONSTITUTION] + this.abilityScoreModifier[AbilityEnum.CONSTITUTION];
    }
    setIntelligence(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) || 1;}
        else {number = number|0}
        this.abilityScore[AbilityEnum.INTELLIGENCE] = number;
        return 0;
    }
    modifyIntelligence(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setIntelligence(this.abilityScore[AbilityEnum.INTELLIGENCE] + number);
    }
    getIntelligence() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.abilityScore[AbilityEnum.INTELLIGENCE] + this.abilityScoreModifier[AbilityEnum.INTELLIGENCE];
    }
    setWisdom(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) || 1;}
        else {number = number|0}
        this.abilityScore[AbilityEnum.WISDOM] = number
        return 0;
    }
    modifyWisdom(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setWisdom(this.abilityScore[AbilityEnum.WISDOM] + number);
    }
    getWisdom() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.abilityScore[AbilityEnum.WISDOM] + this.abilityScoreModifier[AbilityEnum.WISDOM];
    }
    setCharisma(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) || 1;}
        else {number = number|0}
        this.abilityScore[AbilityEnum.CHARISMA] = number;
        return 0;
    }
    modifyCharisma(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setCharisma(this.abilityScore[AbilityEnum.CHARISMA] + number);
    }
    getCharisma() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.abilityScore[AbilityEnum.CHARISMA] + this.abilityScoreModifier[AbilityEnum.CHARISMA];
    }
    /**
     * Sets CharacterEntity ability scores
     * @param {number} strength Strength, physical power
     * @param {number} dexterity Dexterity, agility
     * @param {number} constitution Constitution, endurance
     * @param {number} intelligence Intelligence, reasoning and memory
     * @param {number} wisdom Wisdom, perception and insight
     * @param {number} charisma Charisma, force of personality
     */
    setAbilityScores(strength = 10, dexterity = 10, intelligence = 10, constitution = 10, wisdom = 12, charisma = 10) {
        this.setStrength(strength);
        this.setDexterity(dexterity);
        this.setConstitution(constitution);
        this.setIntelligence(intelligence);
        this.setWisdom(wisdom);
        this.setCharisma(charisma);
        return 0;
    }
    getAbilityScores() {
        return {
            strength: this.abilityScore[AbilityEnum.STRENGTH],
            dexterity: this.abilityScore[AbilityEnum.DEXTERITY],
            constitution: this.abilityScore[AbilityEnum.CONSTITUTION],
            intelligence: this.abilityScore[AbilityEnum.INTELLIGENCE],
            wisdom: this.abilityScore[AbilityEnum.WISDOM],
            charisma: this.abilityScore[AbilityEnum.CHARISMA]
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
                this.setStance(StanceEnum.LAY);
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
        number += this.getSkillScore(ProficiencyEnum.PERCEPTION);
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
        return roll + this.getSkillScore(ProficiencyEnum.PERCEPTION);
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
        return this.sleeping == true;
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
            this.removeCondition(ConditionEnum.UNCONSCIOUS);
            this.removeCondition(ConditionEnum.INCAPACITATED);
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

    addProficiency(proficiencyEnum) {
        if (!ProficiencyEnum.properties.hasOwnProperty(proficiencyEnum)) {
            if (ProficiencyEnum.hasOwnProperty(proficiencyEnum)) {
                proficiencyEnum = ProficiencyEnum[proficiencyEnum];
            }
            else {
                return false;
            }
        }
        this.proficiencies[proficiencyEnum] = true;
        return 0;
    }
    removeProficiency(proficiencyEnum) {
        delete this.proficiencies[proficiencyEnum];
        return 0;
    }
    hasProficiency(proficiencyEnum) {
        if (!ProficiencyEnum.properties.hasOwnProperty(proficiencyEnum)) {
            if (ProficiencyEnum.hasOwnProperty(proficiencyEnum)) {
                proficiencyEnum = ProficiencyEnum[proficiencyEnum];
            }
            else {
                return false;
            }
        }
        return this.proficiencies.hasOwnProperty(proficiencyEnum);
    }
    getSkillScore(proficiencyEnum) {
        if (!ProficiencyEnum.properties.hasOwnProperty(proficiencyEnum)) {
            if (ProficiencyEnum.hasOwnProperty(proficiencyEnum)) {
                proficiencyEnum = ProficiencyEnum[proficiencyEnum];
            }
            else {
                return false;
            }
        }
        let number = Game.calculateAbilityModifier(this.getAbility(Game.getSkillAbility(proficiencyEnum)));
        if (this.hasProficiency(proficiencyEnum)) {
            number += this.getProficiencyBonus();
        }
        return number;
    }
    clearSkills() {
        this.proficiencies.clear();
        return 0;
    }

    addCondition(conditionEnum) {
        if (ConditionEnum.properties.hasOwnProperty(conditionEnum)) {}
        else if (ConditionEnum.hasOwnProperty(conditionEnum)) {
            conditionEnum = ConditionEnum[conditionEnum];
        }
        else {
            return 1;
        }
        this.conditions[conditionEnum] = true;
        return 0;
    }
    removeCondition(conditionEnum) {
        if (ConditionEnum.properties.hasOwnProperty(conditionEnum)) {}
        else if (ConditionEnum.hasOwnProperty(conditionEnum)) {
            conditionEnum = ConditionEnum[conditionEnum];
        }
        else {
            return 1;
        }
        delete this.conditions[conditionEnum];
        return 0;
    }
    hasCondition(conditionEnum) {
        if (ConditionEnum.properties.hasOwnProperty(conditionEnum)) {}
        else if (ConditionEnum.hasOwnProperty(conditionEnum)) {
            conditionEnum = ConditionEnum[conditionEnum];
        }
        else {
            return false;
        }
        return this.conditions.hasOwnProperty(conditionEnum);
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
        if (this.movementSpeedOverride >= 0) {
            return this.movementSpeedOverride;
        }
        else if (this.movementSpeedConditionOverride >= 0) {
            return this.movementSpeedConditionOverride;
        }
        else if (this.movementSpeedEffectOverride >= 0) {
            return this.movementSpeedEffectOverride;
        }
        return this.movementSpeed + this.movementSpeedConditionModifier + this.movementSpeedEffectModifier
    }

    applyConditions() {
        this.exhaustionConditionModifier = 0;
        for (let condition in this.conditions) {
            switch (condition) {
                case ConditionEnum.BLINDED: {
                    this.disadvantageOnAttack = true;
                    this.disadvantageAgainstAttack = true;
                    this.failOnSightAbilityChecks = true;
                    break;
                }
                case ConditionEnum.CHARMED: {
                    this.canHarmCharmTarget = false;
                    break;
                }
                case ConditionEnum.DEAFENED: {
                    this.failOnHearingAbilityChecks = true;
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
                    this.standardActionOverride = 0;
                    this.reactionOverride = 0;
                    break;
                }
                case ConditionEnum.INVISIBLE: {
                    this.advantageAgainstAttack = true;
                    this.advantageOnAttack = true;
                    break;
                }
                case ConditionEnum.PARALYZED: {
                    this.standardActionOverride = 0;
                    this.reactionOverride = 0;
                    this.canMove = false;
                    this.movementActionOverride = 0;
                    this.canSpeak = false;
                    this.failSavingThrows[AbilityEnum.STRENGTH] = true;
                    this.failSavingThrows[AbilityEnum.DEXTERITY] = true;
                    this.disadvantageAgainstAttack = true;
                    break;
                }
                case ConditionEnum.PETRIFIED: {
                    this.standardActionOverride = 0;
                    this.reactionOverride = 0;
                    this.canMove = false;
                    this.movementActionOverride = 0;
                    this.canSpeak = false;
                    this.canHear = false;
                    this.canSee = false;
                    this.failSavingThrows[AbilityEnum.STRENGTH] = true;
                    this.failSavingThrows[AbilityEnum.DEXTERITY] = true;
                    this.disadvantageAgainstAttack = true;
                    this.resistanceTo[All] = true;
                    this.immuneTo[DamageEnum.POISON] = true;
                    this.immuneTo[DamageEnum.DISEASE] = true;
                    break;
                }
                case ConditionEnum.POISONED: {
                    this.disadvantageOnAttack = true;
                    this.disadvantageAbilityChecks[AbilityEnum.STRENGTH] = true;
                    this.disadvantageAbilityChecks[AbilityEnum.DEXTERITY] = true;
                    this.disadvantageAbilityChecks[AbilityEnum.CONSTITUTION] = true;
                    this.disadvantageAbilityChecks[AbilityEnum.INTELLIGENCE] = true;
                    this.disadvantageAbilityChecks[AbilityEnum.WISDOM] = true;
                    this.disadvantageAbilityChecks[AbilityEnum.CHARISMA] = true;
                    this.disadvantageSenseChecks[SenseEnum.TOUCH] = true;
                    this.disadvantageSenseChecks[SenseEnum.SIGHT] = true;
                    this.disadvantageSenseChecks[SenseEnum.HEARING] = true;
                    this.disadvantageSenseChecks[SenseEnum.SMELL] = true;
                    this.disadvantageSenseChecks[SenseEnum.TASTE] = true;
                    this.disadvantageSenseChecks[SenseEnum.SPACE] = true;
                    break;
                }
                case ConditionEnum.PRONE: {
                    this.disadvantageOnAttack = true;
                    // If an attack is within 5', disadvantageAgainstAttack, otherwise advantageAgainstAttack
                    break;
                }
                case ConditionEnum.RESTRAINED: {
                    this.movementSpeedOverride = 0;
                    this.disadvantageSavingThrows[AbilityEnum.DEXTERITY] = true;
                    this.disadvantageOnAttack = true;
                    this.disadvantageAgainstAttack = true;
                    break;
                }
                case ConditionEnum.STUNNED: {
                    this.standardActionOverride = 0;
                    this.reactionOverride = 0;
                    this.canMove = false;
                    this.movementActionOverride = 0;
                    this.failSavingThrows[AbilityEnum.STRENGTH] = true;
                    this.failSavingThrows[AbilityEnum.DEXTERITY] = true;
                    this.disadvantageAgainstAttack = true;
                    break;
                }
                case ConditionEnum.UNCONSCIOUS: {
                    this.standardActionOverride = 0;
                    this.reactionOverride = 0;
                    this.canMove = false;
                    this.movementActionOverride = 0;
                    this.canSpeak = false;
                    this.canHear = false;
                    this.canSee = false;
                    this.canHold = false;
                    if (this instanceof CharacterEntity) {
                        this.unequipBySlot(ApparelSlotEnum.HAND_L);
                        this.unequipBySlot(ApparelSlotEnum.HAND_R);
                    }
                    this.failSavingThrows[AbilityEnum.STRENGTH] = true;
                    this.failSavingThrows[AbilityEnum.DEXTERITY] = true;
                    this.disadvantageAgainstAttack = true;
                    break;
                }
            }
        }
        this.applyExhaustion();
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
                this.healthMaxConditionOverride = Math.floor(this.getMaxHealth() / 2);
                if (this.health > this.healthMaxConditionOverride) {
                    this.health = this.healthMaxConditionOverride;
                }
            }
            case 3: {
                this.disadvantageOnAttack = true;
                this.disadvantageSavingThrows[AbilityEnum.STRENGTH] = true;
                this.disadvantageSavingThrows[AbilityEnum.DEXTERITY] = true;
                this.disadvantageSavingThrows[AbilityEnum.CONSTITUTION] = true;
                this.disadvantageSavingThrows[AbilityEnum.INTELLIGENCE] = true;
                this.disadvantageSavingThrows[AbilityEnum.WISDOM] = true;
                this.disadvantageSavingThrows[AbilityEnum.CHARISMA] = true;
            }
            case 2: {
                this.movementSpeedConditionOverride = Math.floor((this.movementSpeed + this.movementSpeedConditionModifier + this.movementSpeedEffectModifier) / 2);
            }
            case 1: {
                this.disadvantageAbilityChecks[AbilityEnum.STRENGTH] = true;
                this.disadvantageAbilityChecks[AbilityEnum.DEXTERITY] = true;
                this.disadvantageAbilityChecks[AbilityEnum.CONSTITUTION] = true;
                this.disadvantageAbilityChecks[AbilityEnum.INTELLIGENCE] = true;
                this.disadvantageAbilityChecks[AbilityEnum.WISDOM] = true;
                this.disadvantageAbilityChecks[AbilityEnum.CHARISMA] = true;
            }
        }
    }
    resetConditions() {
        this.canHarmCharmTarget = true;
        this.canHarmFearTarget = true;
        this.armourClassConditionModifier = 0;
        this.armourClassConditionOverride = -1;
        this.movementSpeedConditionModifier = 0;
        this.movementSpeedConditionOverride = -1;
        this.standardActionOverride = -1;
        this.movementActionOverride = -1;
        this.bonusActionOverride = -1;
        this.reactionOverride = -1;

        this.canMove = true;
        this.canHold = true;
        this.canSpeak = true;
        this.canHear = true;
        this.canSee = true;

        this.disadvantageOnAttack = false;
        this.disadvantageAgainstAttack = false;
        this.advantageOnAttack = false;
        this.advantageAgainstAttack = false;

        this.advantageAbilityChecks[AbilityEnum.STRENGTH] = false;
        this.advantageAbilityChecks[AbilityEnum.DEXTERITY] = false;
        this.advantageAbilityChecks[AbilityEnum.CONSTITUTION] = false;
        this.advantageAbilityChecks[AbilityEnum.INTELLIGENCE] = false;
        this.advantageAbilityChecks[AbilityEnum.WISDOM] = false;
        this.advantageAbilityChecks[AbilityEnum.CHARISMA] = false;

        this.disadvantageAbilityChecks[AbilityEnum.STRENGTH] = false;
        this.disadvantageAbilityChecks[AbilityEnum.DEXTERITY] = false;
        this.disadvantageAbilityChecks[AbilityEnum.CONSTITUTION] = false;
        this.disadvantageAbilityChecks[AbilityEnum.INTELLIGENCE] = false;
        this.disadvantageAbilityChecks[AbilityEnum.WISDOM] = false;
        this.disadvantageAbilityChecks[AbilityEnum.CHARISMA] = false;

        this.advantageSenseChecks[SenseEnum.TOUCH] = false;
        this.advantageSenseChecks[SenseEnum.SIGHT] = false;
        this.advantageSenseChecks[SenseEnum.HEARING] = false;
        this.advantageSenseChecks[SenseEnum.SMELL] = false;
        this.advantageSenseChecks[SenseEnum.TASTE] = false;
        this.advantageSenseChecks[SenseEnum.SPACE] = false;

        this.disadvantageSenseChecks[SenseEnum.TOUCH] = false;
        this.disadvantageSenseChecks[SenseEnum.SIGHT] = false;
        this.disadvantageSenseChecks[SenseEnum.HEARING] = false;
        this.disadvantageSenseChecks[SenseEnum.SMELL] = false;
        this.disadvantageSenseChecks[SenseEnum.TASTE] = false;
        this.disadvantageSenseChecks[SenseEnum.SPACE] = false;

        this.advantageSavingThrows[AbilityEnum.STRENGTH] = false;
        this.advantageSavingThrows[AbilityEnum.DEXTERITY] = false;
        this.advantageSavingThrows[AbilityEnum.CONSTITUTION] = false;
        this.advantageSavingThrows[AbilityEnum.INTELLIGENCE] = false;
        this.advantageSavingThrows[AbilityEnum.WISDOM] = false;
        this.advantageSavingThrows[AbilityEnum.CHARISMA] = false;

        this.disadvantageSavingThrows[AbilityEnum.STRENGTH] = false;
        this.disadvantageSavingThrows[AbilityEnum.DEXTERITY] = false;
        this.disadvantageSavingThrows[AbilityEnum.CONSTITUTION] = false;
        this.disadvantageSavingThrows[AbilityEnum.INTELLIGENCE] = false;
        this.disadvantageSavingThrows[AbilityEnum.WISDOM] = false;
        this.disadvantageSavingThrows[AbilityEnum.CHARISMA] = false;

        this.failSavingThrows[AbilityEnum.STRENGTH] = false;
        this.failSavingThrows[AbilityEnum.DEXTERITY] = false;
        this.failSavingThrows[AbilityEnum.CONSTITUTION] = false;
        this.failSavingThrows[AbilityEnum.INTELLIGENCE] = false;
        this.failSavingThrows[AbilityEnum.WISDOM] = false;
        this.failSavingThrows[AbilityEnum.CHARISMA] = false;

        this.resistanceTo[DamageEnum.BLUDGEONING] = false;
        this.resistanceTo[DamageEnum.ACID] = false;
        this.resistanceTo[DamageEnum.COLD] = false;
        this.resistanceTo[DamageEnum.FIRE] = false;
        this.resistanceTo[DamageEnum.FORCE] = false;
        this.resistanceTo[DamageEnum.LIGHTNING] = false;
        this.resistanceTo[DamageEnum.NECROTIC] = false;
        this.resistanceTo[DamageEnum.PIERCING] = false;
        this.resistanceTo[DamageEnum.POISON] = false;
        this.resistanceTo[DamageEnum.PSYCHIC] = false;
        this.resistanceTo[DamageEnum.RADIANT] = false;
        this.resistanceTo[DamageEnum.SLASHING] = false;
        this.resistanceTo[DamageEnum.THUNDER] = false;
        this.resistanceTo[DamageEnum.DISEASE] = false; // special

        this.immuneTo[DamageEnum.BLUDGEONING] = false;
        this.immuneTo[DamageEnum.ACID] = false;
        this.immuneTo[DamageEnum.COLD] = false;
        this.immuneTo[DamageEnum.FIRE] = false;
        this.immuneTo[DamageEnum.FORCE] = false;
        this.immuneTo[DamageEnum.LIGHTNING] = false;
        this.immuneTo[DamageEnum.NECROTIC] = false;
        this.immuneTo[DamageEnum.PIERCING] = false;
        this.immuneTo[DamageEnum.POISON] = false;
        this.immuneTo[DamageEnum.PSYCHIC] = false;
        this.immuneTo[DamageEnum.RADIANT] = false;
        this.immuneTo[DamageEnum.SLASHING] = false;
        this.immuneTo[DamageEnum.THUNDER] = false;
        this.immuneTo[DamageEnum.DISEASE] = false; // special
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
        this.abilityScoreModifier[AbilityEnum.STRENGTH] = 0;
        this.abilityScoreModifier[AbilityEnum.DEXTERITY] = 0;
        this.abilityScoreModifier[AbilityEnum.CONSTITUTION] = 0;
        this.abilityScoreModifier[AbilityEnum.INTELLIGENCE] = 0;
        this.abilityScoreModifier[AbilityEnum.WISDOM] = 0;
        this.abilityScoreModifier[AbilityEnum.CHARISMA] = 0;
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
        return 0;
    }
    getAbility(abilityEnum) {
        if (!AbilityEnum.properties.hasOwnProperty(abilityEnum)) {
            if (AbilityEnum.hasOwnProperty(abilityEnum)) {
                abilityEnum = AbilityEnum[abilityEnum];
            }
            else {
                return 0;
            }
        }
        switch (abilityEnum) {
            case AbilityEnum.STRENGTH: {
                return this.getStrength();
                break;
            }
            case AbilityEnum.DEXTERITY: {
                return this.getDexterity();
                break;
            }
            case AbilityEnum.CONSTITUTION: {
                return this.getConstitution();
                break;
            }
            case AbilityEnum.INTELLIGENCE: {
                return this.getIntelligence();
                break;
            }
            case AbilityEnum.WISDOM: {
                return this.getWisdom();
                break;
            }
            case AbilityEnum.CHARISMA: {
                return this.getCharisma();
                break;
            }
        }
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
        if (entity.hasOwnProperty("standardActionOverride")) this.standardActionOverride = entity.standardActionOverride;
        if (entity.hasOwnProperty("movementActionOverride")) this.movementActionOverride = entity.movementActionOverride;
        if (entity.hasOwnProperty("bonusActionOverride")) this.bonusActionOverride = entity.bonusActionOverride;
        if (entity.hasOwnProperty("reactionOverride")) this.reactionOverride = entity.reactionOverride;
        if (entity.hasOwnProperty("canMove")) this.canMove = entity.canMove;
        if (entity.hasOwnProperty("canHold")) this.canHold = entity.canHold;
        if (entity.hasOwnProperty("canSpeak")) this.canSpeak = entity.canSpeak;
        if (entity.hasOwnProperty("canHear")) this.canHear = entity.canHear;
        if (entity.hasOwnProperty("canSee")) this.canSee = entity.canSee;
        if (entity.hasOwnProperty("disadvantageOnAttack")) this.disadvantageOnAttack = entity.disadvantageOnAttack;
        if (entity.hasOwnProperty("disadvantageAgainstAttack")) this.disadvantageAgainstAttack = entity.disadvantageAgainstAttack;
        if (entity.hasOwnProperty("advantageOnAttack")) this.advantageOnAttack = entity.advantageOnAttack;
        if (entity.hasOwnProperty("advantageAgainstAttack")) this.advantageAgainstAttack = entity.advantageAgainstAttack;
        if (entity.hasOwnProperty("advantageAbilityChecks")) this.advantageAbilityChecks = Object.assign({}, entity.advantageAbilityChecks);
        if (entity.hasOwnProperty("disadvantageAbilityChecks")) this.disadvantageAbilityChecks = Object.assign({}, entity.disadvantageAbilityChecks);
        if (entity.hasOwnProperty("advantageSenseChecks")) this.advantageSenseChecks = Object.assign({}, entity.advantageSenseChecks);
        if (entity.hasOwnProperty("disadvantageSenseChecks")) this.disadvantageSenseChecks = Object.assign({}, entity.disadvantageSenseChecks);
        if (entity.hasOwnProperty("advantageSavingThrows")) this.advantageSavingThrows = Object.assign({}, entity.advantageSavingThrows);
        if (entity.hasOwnProperty("disadvantageSavingThrows")) this.disadvantageSavingThrows = Object.assign({}, entity.disadvantageSavingThrows);
        if (entity.hasOwnProperty("failSavingThrows")) this.failSavingThrows = Object.assign({}, entity.failSavingThrows);
        if (entity.hasOwnProperty("resistanceTo")) this.resistanceTo = Object.assign({}, entity.resistanceTo);
        if (entity.hasOwnProperty("immuneTo")) this.immuneTo = Object.assign({}, entity.immuneTo);
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