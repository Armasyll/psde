class Spell {
    /**
     * Creates a Spell
     * @param  {string} id Unique ID
     * @param  {string} name Name
     * @param  {string} description Description
     * @param  {string} iconID Image path of base64
     * @param  {SpellTypeEnum} spellType Spell type
     */
    constructor(id, name = "", description = undefined, iconID = undefined, spellType = SpellTypeEnum.UNIVERSAL, spellLevel = 0, spellSlots = 1, ritual = false) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        this.id = id;
        this.name = "";
        this.setName(name);
        this.description = "";
        this.setDescription(description);
        this.iconID = "";
        this.setIcon(iconID);
        this.spellType = SpellTypeEnum.NONE;
        this.spellLevel = 0;
        this.spellSlotsUsed = 1;
        this.prepared = false;
        this.cantrip = false;
        this.ritual = false; // If true, caster's chosen spell slot cannot be higher than spell's
        this.castingTime = 0; // In actions; 0 is instant
        this.reaction = false;
        this.range = 0;
        this.spellComponents = {};
        this.duration = 0; // In actions; 0 is instant
        this.damageRollCount = 0;
        this.damageRollCountModifier = 0;
        this.damageRoll = 0;
        this.damageRollModifier = 0;
        this.damageType = DamageEnum.NONE;
        this.bonusAction = false; // If this is true, ignore castingTime
        this.concentration = false;
        /* 
            If your strength is greater than or equal to 5, you're unaffected; AbilityEnum.STRENGTH, 5, 1.0
        */
        this.savingAbility = AbilityEnum.NONE;
        this.savingAbilityScore = 0;
        this.savingAbilityMultiplier = 0.0;

        this.setSpellType(spellType);
        this.setSpellLevel(spellLevel);
        this.setSpellSlotsUsed(spellSlots);
        this.setRitual(ritual);

        this.generateProperties();

        Spell.set(this.id, this);
    }

    generateProperties() {
    }

    setSpellType(spellType) {
        if (!SpellTypeEnum.properties.hasOwnProperty(spellType)) {
            spellType = SpellTypeEnum.NONE;
        }
        this.spellType = spellType;
        return 0;
    }
    getSpellType() {
        return this.spellType;
    }
    setSpellLevel(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.spellLevel = number;
        return 0;
    }
    getSpellLevel() {
        return this.spellLevel;
    }
    setSpellSlotsUsed(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.spellSlotsUsed = number;
        return 0;
    }
    getSpellSlotsUsed() {
        return this.spellSlotsUsed;
    }
    setRitual(boolean = true) {
        this.ritual = boolean == true;
        return 0;
    }
    getRitual() {
        return this.ritual;
    }
    setCastingTime(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.castingTime = number;
        return 0;
    }
    getCastingTime() {
        return this.castingTime;
    }
    setRange(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.range = number;
        return 0;
    }
    getRange() {
        return this.range;
    }
    getDamageType() {
        return this.damageType;
    }
    getDamageRoll() {
        return (this.damageRoll + this.damageRollModifier);
    }
    getDamageRollCount() {
        return (this.damageRollCount + this.damageRollCountModifier);
    }

    /**
     * 
     * @param {SpellComponentEnum} spellComponent 
     * @param {object} optionalComponents 
     */
    addComponent(spellComponent = SpellComponentEnum.NONE, optionalComponents) {
        if (!SpellComponentEnum.properties.hasOwnProperty(spellComponent)) {
            spellComponent = SpellComponentEnum.NONE;
        }
        if (spellComponent == SpellComponentEnum.NONE) {
            return 0;
        }
        else if (spellComponent == SpellComponentEnum.MATERIAL) {
            this.spellComponents[spellComponent] = optionalComponents; // I'm lazy
        }
        else {
            this.spellComponents[spellComponent] = 0;
        }
        return 0;
    }
    hasComponent(spellComponent) {
        return this.spellComponents.hasOwnProperty(spellComponent);
    }
    getMaterials() {
        if (this.hasComponent(SpellComponentEnum.MATERIAL)) {
            return this.spellComponents[SpellComponentEnum.MATERIAL];
        }
        else {
            return {};
        }
    }

    assign(spell) {
        if (verify && !(spell instanceof Spell)) {
            return 2;
        }
        if (spell.hasOwnProperty("prepared")) this.prepared = spell.prepared;
        if (spell.hasOwnProperty("cantrip")) this.cantrip = spell.cantrip;
        if (spell.hasOwnProperty("castingTime")) this.setCastingTime(spell.castingTime);
        if (spell.hasOwnProperty("reaction")) this.reaction = spell.reaction;
        if (spell.hasOwnProperty("range")) this.setRange(spell.range);
        if (spell.hasOwnProperty("spellComponents")) {
            for (let component in spell.spellComponents) {
                this.addComponent(component, spell.spellComponents[component]);
            }
        }
        if (spell.hasOwnProperty("duration")) this.duration = spell.duration;
        if (spell.hasOwnProperty("damageRollCount")) this.damageRollCount = spell.damageRollCount;
        if (spell.hasOwnProperty("damageRollCountModifier")) this.damageRollCountModifier = spell.damageRollCountModifier;
        if (spell.hasOwnProperty("damageRoll")) this.damageRoll = spell.damageRoll;
        if (spell.hasOwnProperty("damageRollModifier")) this.damageRollModifier = spell.damageRollModifier;
        if (spell.hasOwnProperty("damageType")) this.damageType = spell.damageType;
        if (spell.hasOwnProperty("bonusAction")) this.bonusAction = spell.bonusAction;
        if (spell.hasOwnProperty("concentration")) this.concentration = spell.concentration;
        if (spell.hasOwnProperty("savingAbility")) this.savingAbility = spell.savingAbility;
        if (spell.hasOwnProperty("savingAbilityScore")) this.savingAbilityScore = spell.savingAbilityScore;
        if (spell.hasOwnProperty("savingAbilityMultiplier")) this.savingAbilityMultiplier = spell.savingAbilityMultiplier;
        if (spell.hasOwnProperty("spellType")) this.setSpellType(spell.spellType);
        if (spell.hasOwnProperty("spellLevel")) this.setSpellLevel(spell.spellLevel)
        if (spell.hasOwnProperty("spellSlotsUsed")) this.setSpellSlotsUsed(spell.spellSlotsUsed)
        if (spell.hasOwnProperty("ritual")) this.setRitual(spell.ritual)
        return 0;
    }
    dispose() {
        Spell.remove(this.id);
    }
    getClassName() {
        return "Spell";
    }

    static initialize() {
        Spell.spellList = {};
    }
    static get(id) {
        if (Spell.has(id)) {
            return Spell.spellList[id];
        }
        return 1;
    }
    static has(id) {
        return Spell.spellList.hasOwnProperty(id);
    }
    static set(id, spell) {
        Spell.spellList[id] = spell;
        return 0;
    }
    static remove(id) {
        delete Spell.spellList[id];
        return 0;
    }
    static list() {
        return Spell.spellList;
    }
    static clear() {
        for (let i in Spell.spellList) {
            Spell.spellList[i].dispose();
        }
        Spell.spellList = {};
        return 0;
    }
}
Spell.initialize();