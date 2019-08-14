class Spell extends AbstractEntity {
    /**
     * Creates a Spell
     * @param  {string} id          Unique ID
     * @param  {string} name        Name
     * @param  {string} description Description
     * @param  {string} iconID       Image path of base64
     * @param  {SpellTypeEnum} spellType      Spell type
     */
    constructor(id, name = "", description = undefined, iconID = undefined, spellType = SpellTypeEnum.UNIVERSAL, spellLevel = 0, spellSlots = 1) {
        super(id, name, description, iconID);
        this.entityType = EntityEnum.SPELL;
        this.spellType = SpellTypeEnum.NONE;
        this.spellLevel = 0;
        this.spellSlots = 1;

        this.setSpellType(spellType);
        this.setSpellLevel(spellLevel);
        this.setSpellSlots(spellSlots);

        Game.setSpellEntity(this.id, this);
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
        this.spellSlots = number;
        return 0;
    }
    getSpellSlots() {
        return this.spellSlots;
    }
    dispose() {
        Game.removeSpellEntity(this.id);
    }
}