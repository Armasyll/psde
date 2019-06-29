class Spell extends AbstractEntity {
    /**
     * Creates a Spell
     * @param  {string} id          Unique ID
     * @param  {string} name        Name
     * @param  {string} description Description
     * @param  {string} iconID       Image path of base64
     * @param  {SpellTypeEnum} spellType      Spell type
     * @param  {number} manaCost    Cost of Spell in Mana
     * @param  {number} healthCost  Cost of Spell in Health
     * @param  {number} staminaCost Cost of Spell in Stamina
     */
    constructor(id, name = "", description = undefined, iconID = undefined, spellType = SpellTypeEnum.UNIVERSAL, manaCost = 0, healthCost = 0, staminaCost = 0) {
        super(id, name, description, iconID);
        this.entityType = EntityEnum.SPELL;
        this.spellType = SpellTypeEnum.NONE;
        if (isNaN(manaCost)) {
            this.manaCost = 0;
        }
        else {
            this.manaCost = Number.parseInt(manaCost);
        }

        if (isNaN(healthCost)) {
            this.healthCost = 0;
        }
        else {
            this.healthCost = Number.parseInt(healthCost);
        }

        if (isNaN(staminaCost)) {
            this.staminaCost = 0;
        }
        else {
            this.staminaCost = Number.parseInt(staminaCost);
        }

        this.setSpellType(spellType);

        Game.setSpellEntity(this.id, this);
    }
    setSpellType(spellType) {
        if (!SpellTypeEnum.properties.hasOwnProperty(spellType)) {
            spellType = SpellTypeEnum.NONE;
        }
        this.spellType = spellType;
    }
    getSpellType() {
        return this.spellType;
    }
    dispose() {
        Game.removeSpellEntity(this.id);
    }
}