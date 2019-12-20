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
        this.hungerOffset = 0;
        /**
         * Physical power
         * @type {number}
         */
        this.strength = 10;
        this.strengthOffset = 0;
        /**
         * Agility
         * @type {number}
         */
        this.dexterity = 10;
        this.dexterityOffset = 0;
        /**
         * Endurance
         * @type {number}
         */
        this.constitution = 10;
        this.constitutionOffset = 0;
        /**
         * Reasoning and memory
         * @type {number}
         */
        this.intelligence = 10;
        this.intelligenceOffset = 0;
        /**
         * Perception and insight
         * @type {number}
         */
        this.wisdom = 10;
        this.wisdomOffset = 0;
        /**
         * Force of personality
         * @type {number}
         */
        this.charisma = 10;
        this.charismaOffset = 0;

        this.armourClass = 0;

        this.level = 1;
        this.experiencePoints = 0;
        /**
         * Like health, but hitting 0 knocks you out instead of killing you.
         */
        this.nonLethalDamage = 0;
        /**
         * Money
         * @type {number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.money = 0;
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
        this.armedOffset = false;

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
        return this.weight;
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
    addMoney(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        return this.setMoney(this.money + number);
    }
    subtractMoney(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        return this.setMoney(this.money - number);
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
    addAge(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        return this.age += number;
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
    addHunger(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.hunger -= number;
        return this;
    }
    subtractHunger(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.hunger -= number;
        return this;
    }
    getHunger() {
        return this.hunger + this.hungerOffset;
    }

    setStrength(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 1;}
        else {number = number|0}
        this.strength = number;
        return this;
    }
    addStrength(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.strength += number;
        return this;
    }
    subtractStrength(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.strength -= number;
        return this;
    }
    getStrength() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.strength + this.strengthOffset;
    }
    setDexterity(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 1;}
        else {number = number|0}
        this.dexterity = number;
        return this;
    }
    addDexterity(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.dexterity += number;
        return this;
    }
    subtractDexterity(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.dexterity -= number;
        return this;
    }
    getDexterity() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.dexterity + this.dexterityOffset;
    }
    setConstitution(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 1;}
        else {number = number|0}
        this.constitution = number;
        return this;
    }
    addConstitution(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.constitution += number;
        return this;
    }
    subtractConstitution(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.constitution -= number;
        return this;
    }
    getConstitution() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.constitution + this.constitutionOffset;
    }
    setIntelligence(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 1;}
        else {number = number|0}
        this.intelligence = number;
        return this;
    }
    addIntelligence(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.intelligence += number;
        return this;
    }
    subtractIntelligence(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.intelligence -= number;
        return this;
    }
    getIntelligence() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.intelligence + this.intelligenceOffset;
    }
    setWisdom(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 1;}
        else {number = number|0}
        this.wisdom = number
        return this;
    }
    addWisdom(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.wisdom += number;
        return this;
    }
    subtractWisdom(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.wisdom -= number;
        return this;
    }
    getWisdom() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.wisdom + this.wisdomOffset;
    }
    setCharisma(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 1;}
        else {number = number|0}
        this.charisma = number;
        return this;
    }
    addCharisma(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.charisma += number;
        return this;
    }
    subtractCharisma(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.charisma -= number;
        return this;
    }
    getCharisma() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.charisma + this.charismaOffset;
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
    addXP(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (number > 0) {
            this.setXP(this.experiencePoints + number);
        }
        return this;
    }
    subtractXP(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (number > 0) {
            this.setXP(this.experiencePoints - number);
        }
        return this;
    }
    getXP() {
        return this.experiencePoints;
    }

    setNonLethalDamage(number = 0) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (this.getGodMode()) {
            this.nonLethalDamage = 0;
            return this;
        }
        this.nonLethalDamage = number;
        if (this.getNonLethalDamage() > this.getHealth()) {
            this.conscious = false;
            if (this.hasController()) {
                this.setStance(StanceEnum.LAY);
                this.controller.doLay();
            }
        }
        return this;
    }
    addNonLethalDamage(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        return this.setNonLethalDamage(this.nonLethalDamage + number);
    }
    subtractNonLethalDamage(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        return this.setNonLethalDamage(this.nonLethalDamage - number);
    }
    getNonLethalDamage() {
        return this.nonLethalDamage;
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

    resetOffsets() {
        super.resetOffsets();
        this.hungerOffset = 0;
        this.strengthOffset = 0;
        this.dexterityOffset = 0;
        this.constitutionOffset = 0;
        this.intelligenceOffset = 0;
        this.wisdomOffset = 0;
        this.charismaOffset = 0;
        return 0;
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
        return this.armed || this.armedOffset;
    }

    isAlerted() {
        return this.alerted;
    }

    dispose() {
        if (this == Game.player) {
            return false;
        }
        this.setLocked(true);
        this.setEnabled(false);
        CreatureEntity.remove(this.id);
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