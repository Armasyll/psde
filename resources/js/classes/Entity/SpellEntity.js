class SpellEntity extends AbstractEntity {
    /**
     * Creates a Spell
     * @param  {string} id          Unique ID
     * @param  {string} name        Name
     * @param  {string} description Description
     * @param  {string} iconID       Image path of base64
     * @param  {SpellTypeEnum} spellType      Spell type
     */
    constructor(id, name = "", description = undefined, iconID = undefined, spellType = SpellTypeEnum.UNIVERSAL, spellLevel = 0, spellSlots = 1, ritual = false) {
        super(id, name, description, iconID);
        this.entityType = EntityEnum.SPELL;
        this.spellType = SpellTypeEnum.NONE;
        this.spellLevel = 0;
        this.spellSlot = 1;
        this.prepared = false;
        this.cantrip = false;
        this.ritual = false; // If true, caster's used spellSlot cannot be higher than spell's
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
        this.setSpellSlots(spellSlots);
        this.setRitual(ritual);

        this.generateProperties();

        SpellEntity.set(this.id, this);
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
    setSpellSlots(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.spellSlot = number;
        return 0;
    }
    getSpellSlots() {
        return this.spellSlot;
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
    getCastingTime(number) {
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
    setComponents(spellComponent = SpellComponentEnum.NONE, optionalComponents) {
        if (!SpellComponentEnum.properties.hasOwnProperty(spellComponent)) {
            spellComponent = SpellComponentEnum.NONE;
        }
        if (spellComponent == SpellComponentEnum.NONE) {
            return 0;
        }
        else if (spellComponent == SpellComponentEnum.MATERIAL) {
            this.component[spellComponent] = optionalComponents; // I'm lazy
        }
        else {
            this.component[spellComponent] = 0;
        }
        return 0;
    }
    hasComponent(spellComponent) {
        return this.component.hasOwnProperty(spellComponent);
    }
    getMaterials() {
        if (this.hasComponent(SpellComponentEnum.MATERIAL)) {
            return this.component[SpellComponentEnum.MATERIAL];
        }
        else {
            return {};
        }
    }
    dispose() {
        SpellEntity.remove(this.id);
    }

    static initialize() {
        SpellEntity.spellEntityList = {};
    }
    static get(id) {
        if (SpellEntity.has(id)) {
            return SpellEntity.spellEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return SpellEntity.spellEntityList.hasOwnProperty(id);
    }
    static set(id, spellEntity) {
        SpellEntity.spellEntityList[id] = spellEntity;
        return 0;
    }
    static remove(id) {
        delete SpellEntity.spellEntityList[id];
        return 0;
    }
    static list() {
        return SpellEntity.spellEntityList;
    }
    static clear() {
        for (let i in SpellEntity.spellEntityList) {
            SpellEntity.spellEntityList[i].dispose();
        }
        SpellEntity.spellEntityList = {};
        return 0;
    }
}
SpellEntity.initialize();