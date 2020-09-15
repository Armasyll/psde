/**
 * Spell
 */
class Spell {
    /**
     * Creates a Spell
     * @param {string} id Unique ID
     * @param {string} name Name
     * @param {string} [description] Description
     * @param {string} [iconID] Image path of base64
     * @param {SpellTypeEnum} spellType Spell type
     */
    constructor(id = "", name = "", description = "", iconID = "missingIcon", spellType = SpellTypeEnum.UNIVERSAL, spellLevel = 0, spellSlots = 1, ritual = false) {
        id = Tools.filterID(id);
        if (id.length == 0) {
            id = Tools.genUUIDv4();
        }
        this.id = id;
        this.name = name;
        this.description = description;
        this.iconID = iconID;
        this.spellType = SpellTypeEnum.NONE;
        this.spellLevel = 0;
        this.spellSlotsUsed = 1;
        this.prepared = false;
        this.cantrip = false;
        this.ritual = false; // If true, caster's chosen spell slot cannot be higher than spell's
        this.castingTime = 0; // In actions; 0 is instant
        this.reaction = false;
        this.targetRange = 0;
        this.spellComponents = {};
        this.duration = 0; // In actions; 0 is instant
        this.damageRollCount = 0;
        this.damageRollCountModifier = 0;
        this.damageRollFaces = 0;
        this.damageRollFacesModifier = 0;
        this.damageType = DamageEnum.NONE;
        this.bonusAction = false; // If this is true, ignore castingTime
        this.concentration = false;
        /* 
            If your strength is greater than or equal to 5, you're unaffected; AbilityEnum.STRENGTH, 5, 1.0
        */
        this.savingAbility = AbilityEnum.NONE;
        this.savingAbilityScore = 0;
        this.savingAbilityMultiplier = 0.0;

        this.additionalSlotRolls = {1:[0,0],2:[0,0],3:[0,0],4:[0,0],5:[0,0],6:[0,0],7:[0,0],8:[0,0],9:[0,0]};

        this.targetType = TargetEnum.SELF;
        this.targetRadius = 0.0;

        this.meshID = "missingMesh";
        this.materialID = "missingMaterial";
        this.textureID = "missingTexture";

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
    setTargetRange(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.targetRange = number;
        return 0;
    }
    getTargetRange() {
        return this.targetRange;
    }
    getDamageType() {
        return this.damageType;
    }
    getDamageRollFaces() {
        return (this.damageRollFaces + this.damageRollFacesModifier);
    }
    getDamageRollCount() {
        return (this.damageRollCount + this.damageRollCountModifier);
    }
    /**
     * @returns {array} Returns an array with the number of die and their faces
     */
    getDamageRoll() {
        return [this.getDamageRollCount(), this.getDamageRollFaces()];
    }
    /**
     * Sets the number of die and their faces
     * @param {number|Array} die Can be a number or an array of two numbers
     * @param {number} [faces] 
     */
    setDamageRoll(die = 1, faces = 20) {
        if (die instanceof Array) {
            if (die.length != 2) {
                return 1;
            }
            faces = die[1];
            die = die[0];
        }
        this.damageRollCount = Number.parseInt(die)||1;
        this.damageRollFaces = Number.parseInt(faces)||1;
        return 0;
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
    setTarget(targetType = TargetEnum.SELF, targetRadius = 0.0) {
        this.setTargetType(targetType);
        this.setTargetRadius(targetRadius);
        return 0;
    }
    /**
     * 
     * @param {TargetEnum} targetType 
     */
    setTargetType(targetType = TargetEnum.SELF) {
        if (!TargetEnum.properties.hasOwnProperty(targetType)) {
            if (TargetEnum.hasOwnProperty(targetType)) {
                targetType = TargetEnum[targetType];
            }
        }
        this.targetType = targetType;
        return 0;
    }
    setTargetRadius(radius = 0.0) {
        Number.parseFloat(radius);
        if (radius < 0) {
            radius = 0.0;
        }
        this.targetRadius = radius;
        return 0;
    }
    getTargetType() {
        return this.targetType;
    }
    getTargetRadius() {
        return this.targetRadius;
    }
    /**
     * 
     * @param {number} slot 
     * @param {number|Array} die Can be a number or an array of two numbers
     * @param {number} [faces] 
     */
    setAdditionalSlotRoll(slot, die = 1, faces = 20) {
        slot = Number.parseInt(slot)||1;
        if (slot < 1) {
            slot = 1;
        }
        else if (slot > 9) {
            slot = 9;
        }
        if (die instanceof Array) {
            if (die.length != 2) {
                return 1;
            }
            faces = die[1];
            die = die[0];
        }
        die = Number.parseInt(die)||1;
        if (die < 1) {
            die = 1;
        }
        else if (die > 41) {
            die = 41
        }
        faces = Number.parseInt(faces)||2;
        if (faces < 2) {
            faces = 2;
        }
        else if (faces > 41) {
            faces = 41
        }
        this.additionalSlotRolls[slot] = [die, faces];
        return 0;
    }

    setMeshID(meshID) {
        this.meshID = meshID;
        return 0;
    }
    getMeshID() {
        return this.meshID;
    }
    setTextureID(textureID) {
        this.textureID = textureID;
        return 0;
    }
    getTextureID() {
        return this.textureID;
    }
    setMaterialID(materialID) {
        this.materialID = materialID;
        return 0;
    }
    getMaterialID() {
        return this.materialID;
    }

    assign(spell, verify = false) {
        if (verify && !(spell instanceof Spell)) {
            return 2;
        }
        if (spell.hasOwnProperty("prepared")) this.prepared = spell.prepared;
        if (spell.hasOwnProperty("cantrip")) this.cantrip = spell.cantrip;
        if (spell.hasOwnProperty("castingTime")) this.setCastingTime(spell.castingTime);
        if (spell.hasOwnProperty("reaction")) this.reaction = spell.reaction;
        if (spell.hasOwnProperty("targetRange")) this.setTargetRange(spell.targetRange);
        if (spell.hasOwnProperty("spellComponents")) { // i wish i weren't lazy >:V
            for (let component in spell.spellComponents) {
                this.addComponent(component, spell.spellComponents[component]);
            }
        }
        if (spell.hasOwnProperty("duration")) this.duration = spell.duration;
        if (spell.hasOwnProperty("damageRollCount")) this.damageRollCount = spell.damageRollCount;
        if (spell.hasOwnProperty("damageRollCountModifier")) this.damageRollCountModifier = spell.damageRollCountModifier;
        if (spell.hasOwnProperty("damageRollFaces")) this.damageRollFaces = spell.damageRollFaces;
        if (spell.hasOwnProperty("damageRollModifier")) this.damageRollFacesModifier = spell.damageRollModifier;
        if (spell.hasOwnProperty("damageRoll")) {
            if (spell["damageRoll"] instanceof Array && spell["damageRoll"].length == 2) {
                this.setDamageRoll(spell["damageRoll"]);
            }
        }
        if (spell.hasOwnProperty("damageType")) this.damageType = spell.damageType;
        if (spell.hasOwnProperty("bonusAction")) this.bonusAction = spell.bonusAction;
        if (spell.hasOwnProperty("concentration")) this.concentration = spell.concentration;
        if (spell.hasOwnProperty("savingAbility")) this.savingAbility = spell.savingAbility;
        if (spell.hasOwnProperty("savingAbilityScore")) this.savingAbilityScore = spell.savingAbilityScore;
        if (spell.hasOwnProperty("savingAbilityMultiplier")) this.savingAbilityMultiplier = spell.savingAbilityMultiplier;
        if (spell.hasOwnProperty("spellType")) this.setSpellType(spell.spellType);
        if (spell.hasOwnProperty("spellLevel")) this.setSpellLevel(spell.spellLevel);
        if (spell.hasOwnProperty("spellSlotsUsed")) this.setSpellSlotsUsed(spell.spellSlotsUsed);
        if (spell.hasOwnProperty("ritual")) this.setRitual(spell.ritual);
        if (spell.hasOwnProperty("targetType")) this.setTargetType(spell.targetType);
        if (spell.hasOwnProperty("targetRadius")) this.setTargetRadius(spell.targetRadius);
        if (spell.hasOwnProperty("additionalSlotRolls")) {
            for (let i in spell["additionalSlotRolls"]) {
                this.setAdditionalSlotRoll(i, spell["additionalSlotRolls"][i]);
            }
        }
        if (spell.hasOwnProperty("meshID")) this.setMeshID(spell.meshID);
        if (spell.hasOwnProperty("materialID")) this.setMaterialID(spell.materialID);
        if (spell.hasOwnProperty("textureID")) this.setTextureID(spell.textureID);
        return 0;
    }
    dispose() {
        Spell.remove(this.id);
    }
    getClassName() {
        return "Spell";
    }

    static initialize() {
        Spell.debugMode = false;
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