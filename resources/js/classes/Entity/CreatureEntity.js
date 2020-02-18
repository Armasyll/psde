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
        this.cantripsKnown = new Set();
        this.cantripsKnownLimit = 0;
        this.spellsKnown = new Set();
        this.spellsKnownLimit = 0;
        this.spellSlots = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0};
        this.spellSlotsUsed = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0};

        this.alerted = false;
        /**
         * Hunger; may affect health regeneration
         * @type {number} 0 to 100
         */
        this.hunger = 0;
        this.hungerModifier = 0;
        /**
         * Physical power
         * @type {number}
         */
        this.strength = 10;
        this.strengthModifier = 0;
        /**
         * Agility
         * @type {number}
         */
        this.dexterity = 10;
        this.dexterityModifier = 0;
        /**
         * Endurance
         * @type {number}
         */
        this.constitution = 10;
        this.constitutionModifier = 0;
        /**
         * Reasoning and memory
         * @type {number}
         */
        this.intelligence = 10;
        this.intelligenceModifier = 0;
        /**
         * Perception and insight
         * @type {number}
         */
        this.wisdom = 10;
        this.wisdomModifier = 0;
        /**
         * Force of personality
         * @type {number}
         */
        this.charisma = 10;
        this.charismaModifier = 0;

        this.armourClass = 0;

        this.level = 1;
        this.experiencePoints = 0;
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
        this.conscious = true;
        this.paralyzed = false;
        /**
         * Size
         * @type {SizeEnum}
         */
        this.size = SizeEnum.SMALL;
        this.armed = false;
        this.armedModifier = false;

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

        this.conditions = new Set();

        this.setSex(sex);
        this.setCreatureType(creatureType);
        this.createInventory();
        this.generateProperties(true);
        this.generateBaseStats(true);
        this.generateAdditionalStats();
        CreatureEntity.set(this.id, this);
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
        return this;
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
        return this;
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
        return this.armourClass;
    }

    setMoney(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.money = number;
        return this;
    }
    modifyMoney(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        return this.setMoney(this.money + number);
    }
    getMoney() {
        return this.money;
    }

    setAge(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.age = number;
        return this;
    }
    modifyAge(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        return this.setAge(this.age + number);
    }
    getAge() {
        return this.age;
    }

    setHunger(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 0;}
        else {number = number|0}
        this.hunger = number;
        return this;
    }
    modifyHunger(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.setHunger(this.hunger + number);
        return this;
    }
    getHunger() {
        return this.hunger + this.hungerModifier;
    }

    setStrength(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 1;}
        else {number = number|0}
        this.strength = number;
        return this;
    }
    modifyStrength(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.setStrength(this.string + number);
        return this;
    }
    getStrength() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.strength + this.strengthModifier;
    }
    setDexterity(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 1;}
        else {number = number|0}
        this.dexterity = number;
        return this;
    }
    modifyDexterity(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.setDexterity(this.dexterity + number);
        return this;
    }
    getDexterity() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.dexterity + this.dexterityModifier;
    }
    setConstitution(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 1;}
        else {number = number|0}
        this.constitution = number;
        return this;
    }
    modifyConstitution(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.setConstitution(this.constitution + number);
        return this;
    }
    getConstitution() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.constitution + this.constitutionModifier;
    }
    setIntelligence(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 1;}
        else {number = number|0}
        this.intelligence = number;
        return this;
    }
    modifyIntelligence(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.setIntelligence(this.intelligence + number);
        return this;
    }
    getIntelligence() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.intelligence + this.intelligenceModifier;
    }
    setWisdom(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 1;}
        else {number = number|0}
        this.wisdom = number
        return this;
    }
    modifyWisdom(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.setWisdom(this.wisdom + number);
        return this;
    }
    getWisdom() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.wisdom + this.wisdomModifier;
    }
    setCharisma(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 1;}
        else {number = number|0}
        this.charisma = number;
        return this;
    }
    modifyCharisma(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.setCharisma(this.charisma + number);
        return this;
    }
    getCharisma() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.charisma + this.charismaModifier;
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
        return this;
    }
    getAbilityScores() {
        return {
            strength: this.strength,
            dexterity: this.dexterity,
            constitution: this.constitution,
            intelligence: this.intelligence,
            wisdom: this.wisdom,
            charisma: this.charisma
        };
    }

    getLevel() {
        return this.level;
    }
    setXP(number = 0) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.experiencePoints = number;
        this.level = Game.calculateLevel(this.experiencePoints);
        return this;
    }
    modifyXP(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.setXP(this.experiencePoints + number);
        return this;
    }
    getXP() {
        return this.experiencePoints;
    }

    setStamina(number = 0) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (this.getGodMode()) {
            this.stamina = 0;
            return this;
        }
        this.stamina = number;
        if (this.getStamina() > this.getHealth()) {
            this.conscious = false;
            if (this.hasController()) {
                this.setStance(StanceEnum.LAY);
                this.controller.doLay();
            }
        }
        return this;
    }
    modifyStamina(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
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
                return this;
        }
        this.cantripsKnown.add(spell);
        return this;
    }
    removeSpell(spell) {
        if (!(spell instanceof SpellEntity)) {
            if (SpellEntity.has(spell))
                spell = SpellEntity.get(spell);
            else
                return this;
        }
        this.cantripsKnown.delete(spell);
        return true;
    }

    addSpell(spell) {
        if (!(spell instanceof SpellEntity)) {
            if (SpellEntity.has(spell))
                spell = SpellEntity.get(spell);
            else
                return this;
        }
        this.spellsKnown.add(spell);
        return this;
    }
    removeSpell(spell) {
        if (!(spell instanceof SpellEntity)) {
            if (SpellEntity.has(spell))
                spell = SpellEntity.get(spell);
            else
                return this;
        }
        this.spellsKnown.delete(spell);
        return true;
    }
    setLiving(boolean = true) {
        this.living = boolean == true;
        return this;
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
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (!this.spellSlots.hasOwnProperty(spellSlot)) {
            return 2;
        }
        this.spellSlots[spellSlot] = number;
        return 0;
    }
    addSpellSlot(spellSlot, number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (!this.spellSlots.hasOwnProperty(spellSlot)) {
            return 2;
        }
        this.spellSlots[spellSlot] += number;
        return 0;
    }
    removeSpellSlot(spellSlot, number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (!this.spellSlots.hasOwnProperty(spellSlot)) {
            return 2;
        }
        this.spellSlots[spellSlot] -= number;
        return 0;
    }

    setUsedSpellSlot(spellSlot, number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (!this.spellSlotsUsed.hasOwnProperty(spellSlot)) {
            return 2;
        }
        this.spellSlotsUsed[spellSlot] = number;
        return 0;
    }
    addUsedSpellSlot(spellSlot, number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (!this.spellSlotsUsed.hasOwnProperty(spellSlot)) {
            return 2;
        }
        this.spellSlotsUsed[spellSlot] += number;
        return 0;
    }
    removeUsedSpellSlot(spellSlot, number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (!this.spellSlotsUsed.hasOwnProperty(spellSlot)) {
            return 2;
        }
        this.spellSlotsUsed[spellSlot] -= number;
        return 0;
    }
    clearUsedSpellSlots() {
        this.spellSlotsUsed = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0};
    }

    addProficiency(proficiencyEnum) {
        if (!ProficiencyEnum.properties.hasOwnProperty(proficiencyEnum)) {
            return 2;
        }
        this.proficiencies[proficiencyEnum] = true;
        return 0;
    }
    removeProficiency(proficiencyEnum) {
        delete this.proficiencies[proficiencyEnum];
        return 0;
    }
    hasProficiency(proficiencyEnum) {
        return this.proficiencies.hasOwnProperty(proficiencyEnum);
    }
    getSkillScore(proficiencyEnum) {
        if (!this.hasProficiency(proficiencyEnum)) {
            return 0;
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
        this.conditions.add(conditionEnum);
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
        this.conditions.delete(conditionEnum);
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
        return this.conditions.has(conditionEnum);
    }
    clearConditions() {
        this.conditions.clear();
        return 0;
    }

    resetModifiers() {
        super.resetModifiers();
        this.hungerModifier = 0;
        this.strengthModifier = 0;
        this.dexterityModifier = 0;
        this.constitutionModifier = 0;
        this.intelligenceModifier = 0;
        this.wisdomModifier = 0;
        this.charismaModifier = 0;
        this.weightModifier = 0;
        this.proficiencyBonusModifier = 0;
        return 0;
    }
    getProficiencyBonus() {
        return Game.calculateProficiencyByLevel(this.level) + this.proficiencyBonusModifier;
    }
    getAbility(abilityEnum) {
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
        return this.armed || this.armedModifier;
    }

    isAlerted() {
        return this.alerted;
    }

    /**
     * Overrides Entity.clone
     * @param  {string} id          ID
     * @return {Entity}             new CreatureEntity
     */
    clone(id = undefined) {
        let clone = new CharacterEntity(id, this.name, this.description, this.icon, this.creatureType, this.creatureSubType, this.sex, this.age, this.characterClass);
        // variables from AbstractEntity
        clone.availableActions = Object.assign({}, this.availableActions);
        clone.hiddenAvailableActions = Object.assign({}, this.hiddenAvailableActions);
        clone.specialProperties = new Set(this.specialProperties);
        clone.defaultAction = this.defaultAction;
        clone.health = this.health;
        clone.healthModifier = this.healthModifier;
        clone.maxHealth = this.maxHealth;
        clone.maxHealthModifier = this.maxHealthModifier;
        for (effect in this.effects) {
            clone.addEffect(effect);
        }
        // variables from Entity
        clone.weight = this.weight;
        clone.price = this.price;
        // variables from CreatureEntity
        clone.specialCreatureType = this.specialCreatureType;
        clone.specialCreatureSubType = this.specialCreatureSubType;
        clone.cantripsKnown = new Set(this.cantripsKnown);
        clone.cantripsKnownLimit = this.cantripsKnownLimit;
        clone.spellsKnown = new Set(this.spellsKnown);
        clone.spellsKnownLimit = this.spellsKnownLimit;
        clone.spellSlots = Object.assign({}, this.spellSlots);
        clone.spellSlotsUsed = Object.assign({}, this.spellSlotsUsed);
        clone.hunger = this.hunger;
        clone.strength = this.strength;
        clone.dexterity = this.dexterity;
        clone.constitution = this.constitution;
        clone.intelligence = this.intelligence;
        clone.wisdom = this.wisdom;
        clone.charisma = this.charisma;
        clone.level = this.level;
        clone.experiencePoints = this.experiencePoints;
        clone.stamina = this.stamina;
        clone.money = this.money;
        clone.living = this.living;
        clone.conscious = this.conscious;
        clone.paralyzed = this.paralyzed;
        clone.size = this.size;
        clone.baseWeight = this.baseWeight;
        clone.baseHeight = this.baseHeight;
        clone.baseWidth = this.baseWidth;
        clone.weight = this.weight;
        clone.height = this.height;
        clone.width = this.width;
        clone.predator = this.predator;
        clone.proficiencies = new Map(this.proficiencies);
        clone.proficiencyBonusModifier = this.proficiencyBonusModifier;
        clone.conditions = new Set(this.conditions);
        return clone;
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