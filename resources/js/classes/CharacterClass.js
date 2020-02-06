class CharacterClass {
    constructor(id = "classless", name = "Classless", description = "Fake it 'til you make it.", iconID = "genericItem", characterClassType = CharacterClassEnum.CLASSLESS) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        this.id = id;
        this.name = name;
        this.description = description;
        this.iconID = iconID;

        this.characterClassType = characterClassType;

        this.hitDice = [1,8];
        this.healthInitial = 8;
        this.healthPerLevel = [1,8];
        this.optionalHealthPerLevel = 5;
        this.healthAbilityModifier = AbilityEnum.CONSTITUTION

        this.armourProficiencies = [ProficiencyEnum.LIGHT_ARMOUR];
        this.armourProficiencyChoices = [];
        this.weaponProficiencies = [ProficiencyEnum.SIMPLE_WEAPONS, ProficiencyEnum.FINESSE_WEAPONS, ProficiencyEnum.IMPROVISED_WEAPONS];
        this.weaponProficiencyChoices = [ProficiencyEnum.MARTIAL_WEAPONS, ProficiencyEnum.SPECIAL_WEAPONS];
        /**
         * All guaranteed proficiencies
         */
        this.toolProficiencies = [];
        /**
         * Array of skill-based proficiencies which include a list of tool-based proficiencies;
         * of each nested array, only one choice may be taken
         * multiple of the same entry may be included to allow for multiple choices
         * So, if ProficiencyEnum.ARTISAN_TOOLS, then the character must choose an entry in ArtisanToolEnum
         * 
         * eg, you could choose any artian tool, or any musical instrument
         * @example [ProficiencyEnum.ARTISAN_TOOLS, ProficiencyEnum.MUSICAL_INSTRUMENTS]
         *
         * eg, You could choose two of any artisan tool, or navigation tools and one of any musical instrument, or one of any artisan tool and one of any musical instrument
         * @example [[ProficiencyEnum.ARTISAN_TOOLS, ProficiencyEnum.NAVIGATORS_TOOLS], [ProficiencyEnum.ARTISAN_TOOLS, ProficiencyEnum.MUSICAL_INSTRUMENTS]]
         * 
         * eg, You could choose one of any artisan tool, and either navigation tools or one of music instrument
         * @example [ProficiencyEnum.ARTISAN_TOOLS, [ProficiancyEnum.NAVIGATORS_TOOLS, ProficiencyEnum.MUSICAL_INSTRUMENTS]]
         * 
         * eg, You could choose one of any artisan tool, or navigation tools, or music instrument, buy only one!
         * @example [[ProficiencyEnum.ARTISAN_TOOLS, ProficiancyEnum.NAVIGATORS_TOOLS, ProficiencyEnum.MUSICAL_INSTRUMENTS]]
         * 
         * @type {array} Array of ProficiencyEnum, or a nested array of ProficiencyEnum
         */
        this.toolProficiencyChoices = [ProficiencyEnum.ARTISAN_TOOLS, [ProficiencyEnum.NAVIGATORS_TOOLS, ProficiencyEnum.POISONERS_KIT, ProficiencyEnum.THIEVES_TOOLS, ProficiencyEnum.LAND_VEHICLES, ProficiencyEnum.WATER_VEHICLES]];
        this.skillProficiencies = [];
        this.skillProficiencyChoices = [SkillEnum.ANY, SkillEnum.ANY];
        /**
         * @type {array} Array of ability enums
         */
        this.savingThrowProficiencies = [AbilityEnum.ANY, AbilityEnum.ANY];

        //

        this.canSpellcast = false;
        this.spellcastingAbility = AbilityEnum.CHARISMA;
        this.spellSaveDCParam = 8;

        /**
         * @type {object} Map of ability enums and their scores
         * @example {AbilityEnum.STRENGTH: 13, AbilityEnum.WISDOM: 16}
         */
        this.multiclassRequirements = {};
        /**
         * If true then require both, not just one
         */
        this.multiclassRequiresBoth = false;

        CharacterClass.set(this.id, this);
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
    setCharacterClassType(characterClassEnum) {
        if (CharacterClassEnum.properties.has(characterClassEnum)) {}
        else if (CharacterClassEnum.has(characterClassEnum)) {
            characterClassEnum = CharacterClassEnum.get(characterClassEnum);
        }
        else {
            return 1;
        }
        this.characterClassType = characterClassEnum;
        return 0;
    }
    getCharacterClassType() {
        return this.characterClassType;
    }
    setHitDice(die, faces) {
        if (die instanceof Array && die.length == 2) {
            faces = Number.parseInt(die[1]) || 8;
            die = Number.parseInt(die[0]) || 1;
        }
        this.hitDice[0] = die;
        this.hitDice[1] = faces;
        return 0;
    }
    getHitDice() {
        return this.hitDice;
    }
    rollHitDice() {
        return Game.roll(this.hitDice[0], this.hitDice[1]);
    }
    setInitialHealth(healthInitial) {
        healthInitial = Game.Tools.filterInteger(healthInitial);
        this.healthInitial = healthInitial;
    }
    getInitialHealth() {
        return this.healthInitial;
    }
    setHealthPerLevel(die, faces) {
        if (die instanceof Array && die.length == 2) {
            faces = Number.parseInt(die[1]) || 8;
            die = Number.parseInt(die[0]) || 1;
        }
        this.healthPerLevel[0] = die;
        this.healthPerLevel[1] = faces;
        return 0;
    }
    getHealthPerLevel() {
        return this.healthPerLevel;
    }
    rollHealthPerLevel() {
        return Game.roll(this.healthPerLevel[0], this.healthPerLevel[1]);
    }
    setOptionalHealthPerLevel(optionalHealthPerLevel) {
        this.optionalHealthPerLevel = optionalHealthPerLevel;
        return 0;
    }
    getOptionalHealthPerLevel() {
        return this.optionalHealthPerLevel;
    }
    setHealthAbilityModifier(abilityEnum) {
        if (AbilityEnum.properties.hasOwnProperty(abilityEnum)) {}
        else if (AbilityEnum.hasOwnProperty(abilityEnum)) {
            abilityEnum = AbilityEnum[abilityEnum];
        }
        else {
            return 2;
        }
        this.healthAbilityModifier = abilityEnum;
        return 0;
    }
    getHealthAbilityModifier() {
        return this.healthAbilityModifier;
    }
    /**
     * 
     * @param {ProficiencyEnum} proficiencyEnum 
     */
    addArmourProficiency(proficiencyEnum) {
        if (ProficiencyEnum.properties.hasOwnProperty(proficiencyEnum)) {}
        else if (ProficiencyEnum.hasOwnProperty(proficiencyEnum)) {
            proficiencyEnum = ProficiencyEnum[proficiencyEnum];
        }
        else {
            return 2;
        }
        if (ProficiencyEnum.properties[proficiencyEnum].type != ProficiencyTypeEnum.ARMOUR) {
            return 1;
        }
        if (this.armourProficiencies.indexOf(proficiencyEnum) != -1) {
            return 0;
        }
        this.armourProficiencies.push(proficiencyEnum);
    }
    hasArmourProficiency(proficiencyEnum) {
        if (ProficiencyEnum.properties.hasOwnProperty(proficiencyEnum)) {}
        else if (ProficiencyEnum.hasOwnProperty(proficiencyEnum)) {
            proficiencyEnum = ProficiencyEnum[proficiencyEnum];
        }
        else {
            return false;
        }
        return this.armourProficiencies.indexOf(proficiencyEnum) != -1;
    }
    /**
     * 
     * @param {ProficiencyEnum} proficiencyEnum 
     */
    addWeaponProficiency(proficiencyEnum) {
        if (ProficiencyEnum.properties.hasOwnProperty(proficiencyEnum)) {}
        else if (ProficiencyEnum.hasOwnProperty(proficiencyEnum)) {
            proficiencyEnum = ProficiencyEnum[proficiencyEnum];
        }
        else {
            return 2;
        }
        if (ProficiencyEnum.properties[proficiencyEnum].type != ProficiencyTypeEnum.WEAPONS && ProficiencyEnum.properties[proficiencyEnum].type != ProficiencyTypeEnum.SKILLS) {
            return 1;
        }
        if (this.weaponProficiencies.indexOf(proficiencyEnum) != -1) {
            return 0;
        }
        this.weaponProficiencies.push(proficiencyEnum);
    }
    hasWeaponProficiency(proficiencyEnum) {
        if (ProficiencyEnum.properties.hasOwnProperty(proficiencyEnum)) {}
        else if (ProficiencyEnum.hasOwnProperty(proficiencyEnum)) {
            proficiencyEnum = ProficiencyEnum[proficiencyEnum];
        }
        else {
            return false;
        }
        return this.weaponProficiencies.indexOf(proficiencyEnum) != -1;
    }
    /**
     * 
     * @param {ProficiencyEnum} proficiencyEnum 
     */
    addToolProficiency(proficiencyEnum) {
        if (ProficiencyEnum.properties.hasOwnProperty(proficiencyEnum)) {}
        else if (ProficiencyEnum.hasOwnProperty(proficiencyEnum)) {
            proficiencyEnum = ProficiencyEnum[proficiencyEnum];
        }
        else {
            return 2;
        }
        if (ProficiencyEnum.properties[proficiencyEnum].type != ProficiencyTypeEnum.TOOLS_AND_KITS) {
            return 1;
        }
        if (this.toolProficiencies.indexOf(proficiencyEnum) != -1) {
            return 0;
        }
        this.toolProficiencies.push(proficiencyEnum);
    }
    hasToolProficiency(proficiencyEnum) {
        if (ProficiencyEnum.properties.hasOwnProperty(proficiencyEnum)) {}
        else if (ProficiencyEnum.hasOwnProperty(proficiencyEnum)) {
            proficiencyEnum = ProficiencyEnum[proficiencyEnum];
        }
        else {
            return false;
        }
        return this.toolProficiencies.indexOf(proficiencyEnum) != -1;
    }
    /**
     * 
     * @param {ProficiencyEnum} proficiencyEnum 
     */
    addSkillProficiency(proficiencyEnum) {
        if (ProficiencyEnum.properties.hasOwnProperty(proficiencyEnum)) {}
        else if (ProficiencyEnum.hasOwnProperty(proficiencyEnum)) {
            proficiencyEnum = ProficiencyEnum[proficiencyEnum];
        }
        else {
            return 2;
        }
        if (ProficiencyEnum.properties[proficiencyEnum].type != ProficiencyTypeEnum.SKILLS && ProficiencyEnum.properties[proficiencyEnum].type != ProficiencyTypeEnum.LANGUAGES) {
            return 1;
        }
        if (this.skillProficiencies.indexOf(proficiencyEnum) != -1) {
            return 0;
        }
        this.skillProficiencies.push(proficiencyEnum);
    }
    hasSkillProficiency(proficiencyEnum) {
        if (ProficiencyEnum.properties.hasOwnProperty(proficiencyEnum)) {}
        else if (ProficiencyEnum.hasOwnProperty(proficiencyEnum)) {
            proficiencyEnum = ProficiencyEnum[proficiencyEnum];
        }
        else {
            return false;
        }
        return this.skillProficiencies.indexOf(proficiencyEnum) != -1;
    }
    /**
     * 
     * @param {AbilityEnum} abilityEnum 
     */
    addSavingThrowProficiency(abilityEnum) {
        if (AbilityEnum.properties.hasOwnProperty(abilityEnum)) {}
        else if (AbilityEnum.hasOwnProperty(abilityEnum)) {
            abilityEnum = AbilityEnum[abilityEnum];
        }
        else {
            return 1;
        }
        if (this.savingThrowProficiencies.indexOf(abilityEnum) != -1) {
            return 0;
        }
        this.savingThrowProficiencies.push(abilityEnum);
    }
    hasSavingThrowProficiency(abilityEnum) {
        if (AbilityEnum.properties.hasOwnProperty(abilityEnum)) {}
        else if (AbilityEnum.hasOwnProperty(abilityEnum)) {
            abilityEnum = AbilityEnum[abilityEnum];
        }
        else {
            return false;
        }
        return this.savingThrowProficiencies.indexOf(abilityEnum) != -1;
    }
    /**
     * Calculates spell save difficulty class
     * @param {creatureEntity} characterEntity 
     */
    calculateSpellSaveDC(creatureEntity) {
        if (creatureEntity instanceof CreatureEntity) {}
        else if (CreatureEntity.has(creatureEntity)) {
            creatureEntity = CreatureEntity.get(creatureEntity);
        }
        else {
            return 0;
        }
        return this.spellSaveDCParam + creatureEntity.getProficiencyBonus() + Game.calculateAbilityModifier(creatureEntity.getAbility(this.spellcastingAbility));
    }
    /**
     * Calculates spell attack modifier
     * @param {creatureEntity} creatureEntity 
     */
    calculateSpellAttackModifier(creatureEntity) {
        if (creatureEntity instanceof CreatureEntity) {}
        else if (CreatureEntity.has(creatureEntity)) {
            creatureEntity = CreatureEntity.get(creatureEntity);
        }
        else {
            return 0;
        }
        return creatureEntity.getProficiencyBonus() + Game.calculateAbilityModifier(creatureEntity.getAbility(this.spellcastingAbility));
    }
    /**
     * 
     * @param {AbilityEnum} abilityEnum Required ability
     * @param {number} score Ability's minimum score
     */
    addMulticlassRequirement(abilityEnum, score) {
        if (AbilityEnum.properties.hasOwnProperty(abilityEnum)) {}
        else if (AbilityEnum.hasOwnProperty(abilityEnum)) {
            abilityEnum = AbilityEnum[abilityEnum];
        }
        else {
            return 1;
        }
        score = Game.Tools.filterInteger(score);
        if (score < 1) { 
            return 1;
        }
        else if (score > Number.MAX_SAFE_INTEGER) {
            return 1;
        }
        this.multiclassRequirements[abilityEnum] = score;
        return 0;
    }
    /**
     * All requirements must be met, not just one
     * @param {boolean} requiresBoth 
     */
    setMulticlassRequiresBoth(requiresBoth = true) {
        this.multiclassRequiresBoth = requiresBoth == true;
        return 0;
    }

    static initialize() {
        CharacterClass.characterClassList = {};
    }
    static get(id) {
        if (CharacterClass.has(id)) {
            return CharacterClass.characterClassList[id];
        }
        return 1;
    }
    static has(id) {
        return CharacterClass.characterClassList.hasOwnProperty(id);
    }
    static set(id, characterClass) {
        CharacterClass.characterClassList[id] = characterClass;
        return 0;
    }
    static list() {
        return CharacterClass.characterClassList;
    }
    static clear() {
        for (let i in CharacterClass.characterClassList) {
            CharacterClass.characterClassList[i].dispose();
        }
        CharacterClass.characterClassList = {};
        return 0;
    }

    static fromJSON(json) {
        if (typeof json == "string") {
            json = JSON.parse(json);
        }
        if (!(json instanceof Object) || !json.hasOwnProperty("id") || !json.hasOwnProperty("name")) {
            return 2;
        }
        let characterClass = new CharacterClass(json.id, json.name, json.description, json.iconID);
        if (!(characterClass instanceof CharacterClass)) {
            return 1;
        }
        if (json.hasOwnProperty("characterClassType")) {
            characterClass.characterClassType = characterClass.setCharacterClassType(json[characterClassType]);
        }
        if (json.hasOwnProperty("hitDice")) {
            characterClass.hitDice = characterClass.setHitDice(json[hitDice]);
        }
        if (json.hasOwnProperty("healthInitial")) {
            characterClass.healthInitial = characterClass.setHealthInitial(json[healthInitial]);
        }
        if (json.hasOwnProperty("healthPerLevel")) {
            characterClass.healthPerLevel = characterClass.setHealthPerLevel(json[healthPerLevel]);
        }
        if (json.hasOwnProperty("optionalHealthPerLevel")) {
            characterClass.optionalHealthPerLevel = characterClass.setOptionalHealthPerLevel(json[optionalHealthPerLevel]);
        }
        if (json.hasOwnProperty("healthAbilityModifier")) {
            characterClass.healthAbilityModifier = characterClass.setHealthAbilityModifier(json[healthAbilityModifier]);
        }
        if (json.hasOwnProperty("armourProficiencies")) {
            characterClass.armourProficiencies = new Set(json[armourProficiencies]);
        }
        if (json.hasOwnProperty("weaponProficiencies")) {
            characterClass.weaponProficiencies = new Set(json[weaponProficiencies]);
        }
        if (json.hasOwnProperty("toolProficiencies")) {
            characterClass.toolProficiencies = new Set(json[toolProficiencies]);
        }
        if (json.hasOwnProperty("savingThrowProficiencies")) {
            characterClass.savingThrowProficiencies = new Set(json[savingThrowProficiencies]);
        }
        if (json.hasOwnProperty("skillProficiencies")) {
            characterClass.skillProficiencies = new Set(json[skillProficiencies]);
        }
        if (json.hasOwnProperty("canSpellcast")) {
            characterClass.canSpellcast = json[canSpellcast];
        }
        if (json.hasOwnProperty("spellcastingAbility")) {
            characterClass.spellcastingAbility = json[spellcastingAbility];
        }
        if (json.hasOwnProperty("spellSaveDCParam")) {
            characterClass.spellSaveDCParam = json[spellSaveDCParam];
        }
        if (json.hasOwnProperty("multiclassRequirements")) {
            characterClass.multiclassRequirements = json[multiclassRequirements];
        }
        if (json.hasOwnProperty("multiclassRequiresBoth")) {
            characterClass.multiclassRequiresBoth = json[multiclassRequiresBoth];
        }
    }
    static toJSON(characterClass) {
        return JSON.stringify(characterClass);
    }
}
CharacterClass.initialize();