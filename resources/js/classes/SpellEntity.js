class Spell extends Entity {
    /**
     * Creates a Spell
     * @param  {String} _id          Unique ID
     * @param  {String} _name        Name
     * @param  {String} _description Description
     * @param  {String} _image       Image path of base64
     * @param  {String} _school      PSDE.kSpellSchools
     * @param  {Number} _manaCost    Cost of Spell in Mana
     * @param  {Number} _lifeCost    Cost of Spell in Life
     * @param  {Number} _staminaCost Cost of Spell in Stamina
     */
    constructor(_id, _name = "", _description = undefined, _image = undefined, _school = SpellSchoolEnum.UNIVERSAL, _manaCost = 0, _lifeCost = 0, _staminaCost = 0) {
        super(_id, _name, _description, _image);
        this.entityType = EntityEnum.SPELL;

        if (SpellSchoolEnum.has(_school)) {
            this.school = _school;
        }
        else {
            this.school = SpellSchoolEnum.UNIVERSAL;
        }

        if (isNaN(_manaCost)) {
            this.manaCost = 0;
        }
        else {
            this.manaCost = Number.parseInt(_manaCost);
        }

        if (isNaN(_lifeCost)) {
            this.lifeCost = 0;
        }
        else {
            this.lifeCost = Number.parseInt(_lifeCost);
        }

        if (isNaN(_staminaCost)) {
            this.staminaCost = 0;
        }
        else {
            this.staminaCost = Number.parseInt(_staminaCost);
        }

        Game.spellEntities[this.id] = this;
    }
}