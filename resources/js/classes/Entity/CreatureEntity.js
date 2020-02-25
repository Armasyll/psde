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
        /**
         * @type {object} Map of AbilityEnum; "
         */
        this.savingThrows = {};

        this.conditions = {};

        /**
         * @type {InstancedFurnitureEntity}
         */
        this.furniture = null;

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
        return this.armourClass;
    }

    setMoney(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.money = number;
        return 0;
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
        return 0;
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
        return 0;
    }
    modifyHunger(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        return this.setHunger(this.hunger + number);
    }
    getHunger() {
        return this.hunger + this.hungerModifier;
    }

    setStrength(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 1;}
        else {number = number|0}
        this.strength = number;
        return 0;
    }
    modifyStrength(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        return this.setStrength(this.string + number);
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
        return 0;
    }
    modifyDexterity(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        return this.setDexterity(this.dexterity + number);
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
        return 0;
    }
    modifyConstitution(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        return this.setConstitution(this.constitution + number);
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
        return 0;
    }
    modifyIntelligence(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        return this.setIntelligence(this.intelligence + number);
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
        return 0;
    }
    modifyWisdom(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        return this.setWisdom(this.wisdom + number);
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
        return 0;
    }
    modifyCharisma(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        return this.setCharisma(this.charisma + number);
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
        return 0;
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
        return this._level;
    }
    getProficiencyBonus() {
        return this._proficiencyBonus + this.proficiencyBonusModifier;
    }
    setXP(number = 0) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.experiencePoints = number;
        this._level = Game.calculateLevel(this.experiencePoints);
        this._proficiencyBonus = Game.calculateProficiencyByLevel(this._level);
        return 0;
    }
    modifyXP(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        return this.setXP(this.experiencePoints + number);
    }
    getXP() {
        return this.experiencePoints;
    }

    setStamina(number = 0) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (this.getGodMode()) {
            this.stamina = 0;
            return 0;
        }
        this.stamina = number;
        if (this.getStamina() > this.getHealth()) {
            this.conscious = false;
            if (this.hasController()) {
                this.setStance(StanceEnum.LAY);
                this.controller.doLay();
            }
        }
        return 0;
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
    setLiving(boolean = true) {
        this.living = boolean == true;
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
    addSavingThrow(abilityEnum) {
        if (!AbilityEnum.properties.hasOwnProperty(abilityEnum)) {
            if (AbilityEnum.hasOwnProperty(abilityEnum)) {
                abilityEnum = AbilityEnum[abilityEnum];
            }
            else {
                return 2;
            }
        }
        this.savingThrows[abilityEnum] = true;
        return 0;
    }
    removeSavingThrow(abilityEnum) {
        delete this.savingThrows[abilityEnum];
        return 0;
    }
    hasSavingThrow(abilityEnum) {
        if (!AbilityEnum.properties.hasOwnProperty(abilityEnum)) {
            if (AbilityEnum.hasOwnProperty(abilityEnum)) {
                abilityEnum = AbilityEnum[abilityEnum];
            }
            else {
                return false;
            }
        }
        return this.savingThrows.hasOwnProperty(abilityEnum);
    }
    getSavingThrow(abilityEnum) {
        if (!AbilityEnum.properties.hasOwnProperty(abilityEnum)) {
            if (AbilityEnum.hasOwnProperty(abilityEnum)) {
                abilityEnum = AbilityEnum[abilityEnum];
            }
            else {
                return 0;
            }
        }
        let number = Game.calculateAbilityModifier(this.getAbility(abilityEnum));
        if (this.hasSavingThrow(abilityEnum)) {
            number += this.getProficiencyBonus();
        }
        return number;
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
        return this.armed || this.armedModifier;
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
        this.specialCreatureType = entity.specialCreatureType;
        this.specialCreatureSubType = entity.specialCreatureSubType;
        this.cantripsKnown = Object.assign({}, entity.cantripsKnown);
        this.cantripsKnownLimit = entity.cantripsKnownLimit;
        this.spellsKnown = Object.assign({}, entity.spellsKnown);
        this.spellsKnownLimit = entity.spellsKnownLimit;
        this.spellSlots = Object.assign({}, entity.spellSlots);
        this.spellSlotsUsed = Object.assign({}, entity.spellSlotsUsed);
        this.hunger = entity.hunger;
        this.strength = entity.strength;
        this.dexterity = entity.dexterity;
        this.constitution = entity.constitution;
        this.intelligence = entity.intelligence;
        this.wisdom = entity.wisdom;
        this.charisma = entity.charisma;
        this.level = entity._level;
        this.experiencePoints = entity.experiencePoints;
        this.stamina = entity.stamina;
        this.money = entity.money;
        this.living = entity.living;
        this.conscious = entity.conscious;
        this.paralyzed = entity.paralyzed;
        this.size = entity.size;
        this.baseWeight = entity.baseWeight;
        this.baseHeight = entity.baseHeight;
        this.baseWidth = entity.baseWidth;
        this.weight = entity.weight;
        this.height = entity.height;
        this.width = entity.width;
        this.predator = entity.predator;
        this.proficiencies = Object.assign({}, entity.proficiencies);
        this.proficiencyBonusModifier = entity.proficiencyBonusModifier;
        this.conditions = Object.assign({}, entity.conditions);
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