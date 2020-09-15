/**
 * Character Class
 */
class CharacterClass {
    /**
     * Creates a Character Class
     * @param {string} id 
     * @param {string} name 
     * @param {string} [description] 
     * @param {string} [iconID] 
     * @param {(CharacterClassEnum|number)} characterClassType 
     */
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

        /**
         * Roll for default hit points
         * @type {Array<number>}
         * @property {number} Dice
         * @property {number} Faces
         */
        this.hitDice = [1,8];
        /**
         * Override for hitDice roll
         * @type {number}
         */
        this.healthInitial = 8;
        /**
         * Roll for incremental hit points per level
         * @type {Array<number>}
         * @property {number} Dice
         * @property {number} Faces
         */
        this.healthPerLevel = [1,8];
        /**
         * Override for healthPerLevel roll
         * @type {number}
         */
        this.optionalHealthPerLevel = 5;
        this.healthAbilityModifier = "CONSTITUTION";

        this.armourProficiencies = [];
        this.armourProficiencyChoices = [];
        this.weaponProficiencies = [];
        this.weaponProficiencyChoices = [];
        /**
         * Guaranteed tool proficiencies
         * @type {Array<ProficiencyEnum>}
         */
        this.toolProficiencies = [];
        /**
         * Array of skill-based proficiencies which include a list of tool-based proficiencies;
         * of each nested array, only one choice may be taken
         * multiple of the same entry may be included to allow for multiple choices
         * So, if ProficiencyEnum.ARTISANS_TOOLS, then the character must choose an entry in ArtisanToolEnum
         * 
         * eg, you could choose any artian tool, or any musical instrument
         * @example [ProficiencyEnum.ARTISANS_TOOLS, ProficiencyEnum.MUSICAL_INSTRUMENTS]
         *
         * eg, You could choose two of any artisan tool, or navigation tools and one of any musical instrument, or one of any artisan tool and one of any musical instrument
         * @example [[ProficiencyEnum.ARTISANS_TOOLS, ProficiencyEnum.NAVIGATORS_TOOLS], [ProficiencyEnum.ARTISANS_TOOLS, ProficiencyEnum.MUSICAL_INSTRUMENTS]]
         * 
         * eg, You could choose one of any artisan tool, and either navigation tools or one of music instrument
         * @example [ProficiencyEnum.ARTISANS_TOOLS, [ProficiancyEnum.NAVIGATORS_TOOLS, ProficiencyEnum.MUSICAL_INSTRUMENTS]]
         * 
         * eg, You could choose one of any artisan tool, or navigation tools, or music instrument, buy only one!
         * @example [[ProficiencyEnum.ARTISANS_TOOLS, ProficiancyEnum.NAVIGATORS_TOOLS, ProficiencyEnum.MUSICAL_INSTRUMENTS]]
         * 
         * @type {Array<(ProficiencyEnum|Array<ProficiencyEnum>)>} Array of ProficiencyEnum, or a nested array of ProficiencyEnum
         */
        this.toolProficiencyChoices = [];
        /**
         * Guaranteed skill proficiencies
         * @type {Array<ProficiencyEnum>}
         */
        this.skillProficiencies = [];
        /**
         * @type {Array<(ProficiencyEnum|Array<ProficiencyEnum>)>} 
         */
        this.skillProficiencyChoices = [];
        /**
         * Guaranteed ability saving throws
         * @type {Array<ProficiencyEnum>} Array of abilities
         */
        this.savingThrowProficiencies = [];
        /**
         * @type {Array<(ProficiencyEnum|Array<ProficiencyEnum>)>} 
         */
        this.savingThrowProficiencyChoices = [];

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
    /**
     * 
     * @param {string|number} characterClass CharacterClassEnum
     * @returns {number}
     */
    setCharacterClassType(characterClass) {
        if (CharacterClassEnum.has(characterClass)) {}
        else if (CharacterClassEnum.properties.has(characterClass)) {
            characterClass = CharacterClassEnum.properties[characterClass].key;
        }
        else {
            return 1;
        }
        this.characterClassType = characterClass;
        return 0;
    }
    /**
     * @returns {number} CharacterClassEnum
     */
    getCharacterClassType() {
        return this.characterClassType;
    }
    /**
     * 
     * @param {number} die 
     * @param {number} faces 
     * @returns {number}
     */
    setHitDice(die, faces) {
        if (die instanceof Array && die.length == 2) {
            faces = Number.parseInt(die[1]) || 8;
            die = Number.parseInt(die[0]) || 1;
        }
        this.hitDice[0] = die;
        this.hitDice[1] = faces;
        return 0;
    }
    /**
     * @returns {number}
     */
    getHitDice() {
        return this.hitDice;
    }
    /**
     * @returns {number}
     */
    rollHitDice() {
        return DND.roll(this.hitDice[0], this.hitDice[1]);
    }
    /**
     * 
     * @param {number} healthInitial 
     * @returns {number}
     */
    setInitialHealth(healthInitial) {
        healthInitial = Number.parseInt(healthInitial) || 10;
        this.healthInitial = healthInitial;
    }
    /**
     * @returns {number}
     */
    getInitialHealth() {
        return this.healthInitial;
    }
    /**
     * 
     * @param {number} die 
     * @param {number} faces 
     * @returns {number}
     */
    setHealthPerLevel(die, faces) {
        if (die instanceof Array && die.length == 2) {
            faces = Number.parseInt(die[1]) || 8;
            die = Number.parseInt(die[0]) || 1;
        }
        this.healthPerLevel[0] = die;
        this.healthPerLevel[1] = faces;
        return 0;
    }
    /**
     * @returns {number}
     */
    getHealthPerLevel() {
        return this.healthPerLevel;
    }
    /**
     * @returns {number}
     */
    rollHealthPerLevel() {
        return DND.roll(this.healthPerLevel[0], this.healthPerLevel[1]);
    }
    /**
     * 
     * @param {number} optionalHealthPerLevel 
     * @returns {number}
     */
    setOptionalHealthPerLevel(optionalHealthPerLevel) {
        this.optionalHealthPerLevel = optionalHealthPerLevel;
        return 0;
    }
    /**
     * @returns {number}
     */
    getOptionalHealthPerLevel() {
        return this.optionalHealthPerLevel;
    }
    /**
     * 
     * @param {string|number} ability 
     * @returns {number}
     */
    setHealthAbilityModifier(ability) {
        if (AbilityEnum.hasOwnProperty(ability)) {}
        else if (AbilityEnum.properties.hasOwnProperty(ability)) {
            ability = AbilityEnum.properties[ability].key;
        }
        else {
            return 2;
        }
        this.healthAbilityModifier = ability;
        return 0;
    }
    /**
     * @returns {number}
     */
    getHealthAbilityModifier() {
        return this.healthAbilityModifier;
    }
    /**
     * 
     * @param {(ProficiencyEnum|Array<ProficiencyEnum>)} proficiency ArmourCategoryEnum
     * @returns {number}
     */
    addArmourProficiencyChoice(proficiency) {
        if (proficiency instanceof Array) {
            let choices = [];
            for (let i in proficiency) {
                if (!ArmourCategoryEnum.hasOwnProperty(proficiency[i])) {
                    if (ArmourCategoryEnum.properties.hasOwnProperty(proficiency[i])) {
                        proficiency[i] = ArmourCategoryEnum.properties[proficiency[i]].key;
                    }
                    else {
                        continue;
                    }
                }
                choices.push(proficiency[i]);
            }
            if (choices.length == 0) {
                return 2;
            }
            this.armourProficiencies.push(choices);
            return 0;
        }
        if (!ArmourCategoryEnum.hasOwnProperty(proficiency)) {
            if (ArmourCategoryEnum.properties.hasOwnProperty(proficiency)) {
                proficiency = ArmourCategoryEnum.properties[proficiency].key;
            }
            else {
                return 2;
            }
        }
        this.armourProficiencies.push(proficiency);
        return 0;
    }
    /**
     * 
     * @param {ProficiencyEnum} proficiency ArmourCategoryEnum
     * @returns {number}
     */
    addArmourProficiency(proficiency) {
        if (ArmourCategoryEnum.hasOwnProperty(proficiency)) {}
        else if (ArmourCategoryEnum.properties.hasOwnProperty(proficiency)) {
            proficiency = ArmourCategoryEnum.properties[proficiency].key;
        }
        else {
            return 2;
        }
        if (this.armourProficiencies.indexOf(proficiency) != -1) {
            return 0;
        }
        this.armourProficiencies.push(proficiency);
        return 0;
    }
    /**
     * 
     * @param {ProficiencyEnum} proficiency 
     * @returns {boolean}
     */
    hasArmourProficiency(proficiency) {
        if (ArmourCategoryEnum.hasOwnProperty(proficiency)) {}
        else if (ArmourCategoryEnum.properties.hasOwnProperty(proficiency)) {
            proficiency = ArmourCategoryEnum.properties[proficiency].key;
        }
        else {
            return false;
        }
        return this.armourProficiencies.indexOf(proficiency) != -1;
    }
    /**
     * 
     * @param {(ProficiencyEnum|Array<ProficiencyEnum>)} proficiency WeaponEnum
     * @returns {number}
     */
    addWeaponProficiencyChoice(proficiency) {
        if (proficiency instanceof Array) {
            let choices = [];
            for (let i in proficiency) {
                if (!WeaponEnum.hasOwnProperty(proficiency[i])) {
                    if (WeaponEnum.properties.hasOwnProperty(proficiency[i])) {
                        proficiency[i] = WeaponEnum.properties[proficiency[i]].key;
                    }
                    else {
                        continue;
                    }
                }
                choices.push(proficiency[i]);
            }
            if (choices.length == 0) {
                return 2;
            }
            this.weaponProficiencyChoices.push(choices);
            return 0;
        }
        if (!WeaponEnum.hasOwnProperty(proficiency)) {
            if (WeaponEnum.properties.hasOwnProperty(proficiency)) {
                proficiency = WeaponEnum.properties[proficiency].key;
            }
            else {
                return 2;
            }
        }
        this.weaponProficiencyChoices.push(proficiency);
        return 0;
    }
    /**
     * 
     * @param {ProficiencyEnum} proficiency 
     * @returns {number}
     */
    addWeaponProficiency(proficiency) {
        if (!WeaponEnum.hasOwnProperty(proficiency)) {
            if (WeaponEnum.properties.hasOwnProperty(proficiency)) {
                proficiency = WeaponEnum.properties[proficiency].key;
            }
            else {
                return 2;
            }
        }
        if (this.weaponProficiencies.indexOf(proficiency) != -1) {
            return 0;
        }
        this.weaponProficiencies.push(proficiency);
    }
    /**
     * 
     * @param {string|numer} proficiency ProficiencyEnum
     * @returns {boolean}
     */
    hasWeaponProficiency(proficiency) {
        if (ProficiencyEnum.hasOwnProperty(proficiency)) {}
        else if (ProficiencyEnum.properties.hasOwnProperty(proficiency)) {
            proficiency = ProficiencyEnum.properties[proficiency].key;
        }
        else {
            return false;
        }
        return this.weaponProficiencies.indexOf(proficiency) != -1;
    }
    /**
     * 
     * @param {(ProficiencyEnum|Array<ProficiencyEnum>)} proficiency ProficiencyEnum
     * @returns {number}
     */
    addToolProficiencyChoice(proficiency) {
        if (proficiency instanceof Array) {
            let choices = [];
            for (let i in proficiency) {
                if (!ToolsAndKitsEnum.hasOwnProperty(proficiency[i])) {
                    if (ToolsAndKitsEnum.properties.hasOwnProperty(proficiency[i])) {
                        proficiency[i] = ToolsAndKitsEnum.properties[proficiency[i]].key;
                    }
                    else {
                        continue;
                    }
                }
                choices.push(proficiency[i]);
            }
            if (choices.length == 0) {
                return 2;
            }
            this.toolProficiencyChoices.push(choices);
            return 0;
        }
        if (!ToolsAndKitsEnum.hasOwnProperty(proficiency)) {
            if (ToolsAndKitsEnum.properties.hasOwnProperty(proficiency)) {
                proficiency = ToolsAndKitsEnum.properties[proficiency].key;
            }
            else {
                return 2;
            }
        }
        this.toolProficiencyChoices.push(proficiency);
        return 0;
    }
    /**
     * 
     * @param {ProficiencyEnum} proficiency 
     * @returns {number}
     */
    addToolProficiency(proficiency) {
        if (!ToolsAndKitsEnum.hasOwnProperty(proficiency)) {
            if (ToolsAndKitsEnum.properties.hasOwnProperty(proficiency)) {
                proficiency = ToolsAndKitsEnum.properties[proficiency].key;
            }
            else {
                return 2;
            }
        }
        if (this.toolProficiency.indexOf(proficiency) != -1) {
            return 0;
        }
        this.toolProficiency.push(proficiency);
        return 0;
    }
    /**
     * 
     * @param {ProficiencyEnum} proficiency 
     * @returns {boolean}
     */
    hasToolProficiency(proficiency) {
        if (ToolsAndKitsEnum.hasOwnProperty(proficiency)) {}
        else if (ToolsAndKitsEnum.properties.hasOwnProperty(proficiency)) {
            proficiency = ToolsAndKitsEnum.properties[proficiency].key;
        }
        else {
            return false;
        }
        return this.toolProficiencies.indexOf(proficiency) != -1;
    }
    /**
     * 
     * @param {(ProficiencyEnum|Array<ProficiencyEnum>)} proficiency SkillEnum
     * @returns {number}
     */
    addSkillProficiencyChoice(proficiency) {
        if (proficiency instanceof Array) {
            let choices = [];
            for (let i in proficiency) {
                if (!SkillEnum.hasOwnProperty(proficiency[i])) {
                    if (SkillEnum.properties.hasOwnProperty(proficiency[i])) {
                        proficiency[i] = SkillEnum.properties[proficiency[i]].key;
                    }
                    else {
                        continue;
                    }
                }
                choices.push(proficiency[i]);
            }
            if (choices.length == 0) {
                return 2;
            }
            this.skillProficiencyChoices.push(choices);
            return 0;
        }
        if (!SkillEnum.hasOwnProperty(proficiency)) {
            if (SkillEnum.properties.hasOwnProperty(proficiency)) {
                proficiency = SkillEnum.properties[proficiency].key;
            }
            else {
                return 2;
            }
        }
        this.skillProficiencyChoices.push(proficiency);
        return 0;
    }
    /**
     * 
     * @param {ProficiencyEnum} proficiency 
     * @returns {number}
     */
    addSkillProficiency(proficiency) {
        if (ProficiencyEnum.hasOwnProperty(proficiency)) {}
        else if (ProficiencyEnum.properties.hasOwnProperty(proficiency)) {
            proficiency = ProficiencyEnum.properties[proficiency].key;
        }
        else {
            return 2;
        }
        if (ProficiencyEnum.properties[proficiency].type != ProficiencyTypeEnum.SKILLS && ProficiencyEnum.properties[proficiency].type != ProficiencyTypeEnum.LANGUAGES) {
            return 1;
        }
        if (this.skillProficiencies.indexOf(proficiency) != -1) {
            return 0;
        }
        this.skillProficiencies.push(proficiency);
        return 0;
    }
    /**
     * 
     * @param {ProficiencyEnum} proficiency 
     * @returns {boolean}
     */
    hasSkillProficiency(proficiency) {
        if (ProficiencyEnum.hasOwnProperty(proficiency)) {}
        else if (ProficiencyEnum.properties.hasOwnProperty(proficiency)) {
            proficiency = ProficiencyEnum.properties[proficiency].key;
        }
        else {
            return false;
        }
        return this.skillProficiencies.indexOf(proficiency) != -1;
    }
    /**
     * 
     * @param {(AbilityEnum|Array<AbilityEnum>)} ability AbilityEnum
     * @returns {number}
     */
    addSavingThrowProficiencyChoice(ability) {
        if (ability instanceof Array) {
            let choices = [];
            for (let i in ability) {
                if (!AbilityEnum.hasOwnProperty(ability[i])) {
                    if (AbilityEnum.properties.hasOwnProperty(ability[i])) {
                        ability[i] = AbilityEnum.properties[ability[i]].key;
                    }
                    else {
                        continue;
                    }
                }
                choices.push(ability[i]);
            }
            if (choices.length == 0) {
                return 2;
            }
            this.savingThrowProficiencyChoices.push(choices);
            return 0;
        }
        if (!AbilityEnum.hasOwnProperty(ability)) {
            if (AbilityEnum.properties.hasOwnProperty(ability)) {
                ability = AbilityEnum.properties[ability].key;
            }
            else {
                return 2;
            }
        }
        this.savingThrowProficiencyChoices.push(ability);
        return 0;
    }
    /**
     * 
     * @param {AbilityEnum} ability 
     * @returns {number}
     */
    addSavingThrowProficiency(ability) {
        if (AbilityEnum.hasOwnProperty(ability)) {}
        else if (AbilityEnum.properties.hasOwnProperty(ability)) {
            ability = AbilityEnum.properties[ability].key;
        }
        else {
            return 1;
        }
        if (this.savingThrowProficiencies.indexOf(ability) != -1) {
            return 0;
        }
        this.savingThrowProficiencies.push(ability);
        return 0;
    }
    /**
     * 
     * @param {AbilityEnum} ability 
     * @returns {boolean}
     */
    hasSavingThrowProficiency(ability) {
        if (AbilityEnum.hasOwnProperty(ability)) {}
        else if (AbilityEnum.properties.hasOwnProperty(ability)) {
            ability = AbilityEnum.properties[ability].key;
        }
        else {
            return false;
        }
        return this.savingThrowProficiencies.indexOf(ability) != -1;
    }
    /**
     * 
     * @param {AbilityEnum} ability Required ability
     * @param {number} score Ability's minimum score
     * @returns {number}
     */
    addMulticlassRequirement(ability, score = 13) {
        if (AbilityEnum.hasOwnProperty(ability)) {}
        else if (AbilityEnum.properties.hasOwnProperty(ability)) {
            ability = AbilityEnum.properties[ability].key;
        }
        else {
            return 1;
        }
        score = Number.parseInt(score) || 13;
        if (score < 1) { 
            return 1;
        }
        else if (score > Number.MAX_SAFE_INTEGER) {
            return 1;
        }
        this.multiclassRequirements[ability] = score;
        return 0;
    }
    /**
     * All requirements must be met, not just one
     * @param {boolean} requiresBoth 
     * @returns {number}
     */
    setMulticlassRequiresBoth(requiresBoth = true) {
        this.multiclassRequiresBoth = requiresBoth == true;
        return 0;
    }

    getClassName() {
        return "CharacterClass";
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