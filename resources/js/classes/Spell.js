/**
 * Spell
 * @class
 * @typedef {Object} Spell
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} iconID
 * @property {string} meshID
 * @property {string} materialID
 * @property {string} textureID
 * @property {SpellTypeEnum} spellType
 * @property {number} spellLevel
 * @property {number} spellSlotsUsed
 * @property {boolean} prepared
 * @property {boolean} cantrip
 * @property {boolean} ritual
 * @property {number} castingTime
 * @property {boolean} reaction
 * @property {number} targetRange
 * @property {Object.<SpellComponentEnum, boolean>} spellComponents
 * @property {array} materialComponents
 * @property {number} duration
 * @property {DamageEnum} damageType
 * @property {number} damageRollCount
 * @property {number} damageRollCountModifier
 * @property {number} damageRollFaces
 * @property {number} damageRollFacesModifier
 * @property {boolean} bonusAction
 * @property {boolean} concentration
 * @property {AbilityEnum} savingAbility
 * @property {number} savingAbilityScore
 * @property {Object.<number, Array.<number>>} additionalSlotRolls
 * @property {Object.<number, Array.<number>>} additionalLevelRolls
 * @property {Object.<number, Array.<number>>} additionalSlotTargets
 * @property {Object.<number, Array.<{effect:Effect, targetType: TargetEnum}>>} effectsPriority
 * @example {20:[{"effect":Fireball, "targetType":0}, {"effect":Fire Bolt, "targetType":0}]}
 * @property {TargetEnum} targetType
 * @property {number} targetRadius
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
        this.spellComponents = {}; // TODO: remember what this is :v
        this.materialComponents = [];
        this.duration = 0; // In actions; 0 is instant
        this.damageType = DamageEnum.NONE;
        this.damageRollCount = 0;
        this.damageRollCountModifier = 0;
        this.damageRollFaces = 0;
        this.damageRollFacesModifier = 0;
        this.bonusAction = false; // If this is true, ignore castingTime
        this.concentration = false;
        /* 
            If your strength is greater than or equal to 5, you're unaffected; AbilityEnum.STRENGTH, 5, 1.0
        */
        this.savingAbility = AbilityEnum.NONE;
        this.savingAbilityScore = 0;

        this.additionalSlotRolls = {};
        for (let i = 0; i < 13; i++) {
            this.additionalSlotRolls[i] = [0,0];
        }
        this.additionalLevelRolls = {};
        for (let i = 1; i < 21; i++) {
            this.additionalLevelRolls[i] = [0,0];
        }
        this.additionalSlotTargets = {};
        for (let i = 0; i < 13; i++) {
            this.additionalSlotTargets[i] = [0,0];
        }
        this.effectsPriority = {};

        this.targetType = TargetEnum.SELF;
        this.targetRadius = 0.0;

        this.meshID = "missingMesh";
        this.materialID = "missingMaterial";
        this.textureID = "missingTexture";
        this.animationID = "00_default";

        this.setSpellType(spellType);
        this.setSpellLevel(spellLevel);
        this.setSpellSlotsUsed(spellSlots);
        this.setRitual(ritual);

        this.generateProperties();

        Spell.set(this.id, this);
    }

    generateProperties() {
        return 0;
    }

    getSavingAbility() {
        return this.savingAbility;
    }
    getSavingAbilityScore() {
        return this.savingAbilityScore;
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
    setDamageType(damageType) {
        damageType = Tools.filterEnum(damageType, DamageEnum);
        if (damageType == DamageEnum.NONE) {
            this.setDamageRoll(0, 0);
        }
        this.damageType = damageType;
        return 0;
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
    addComponent(spellComponent = SpellComponentEnum.NONE, optionalComponents = null) {
        if (!SpellComponentEnum.properties.hasOwnProperty(spellComponent)) {
            spellComponent = SpellComponentEnum.NONE;
        }
        if (spellComponent == SpellComponentEnum.NONE) {
            return 0;
        }
        this.spellComponents[spellComponent] = true;
        if (spellComponent == SpellComponentEnum.MATERIAL) {
            this.addMaterialComponent(optionalComponents);
        }
        return 0;
    }
    hasComponent(spellComponent) {
        return this.spellComponents.hasOwnProperty(spellComponent);
    }
    /**
     * 
     * @param {ItemEntity} entity 
     */
    addMaterialComponent(entity) {
        entity = Tools.filterClass(entity, ItemEntity);
        if (entity == null) {
            return 1;
        }
        this.materialComponents.push(entity);
        return 0;
    }
    getMaterialComponents() {
        return this.materialComponents;
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
    /**
     * 
     * @param {number} slot 
     * @param {number|Array} die Can be a number or an array of two numbers
     * @param {number} [faces] 
     */
    setAdditionalLevelRoll(slot, die = 1, faces = 20) {
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
        this.additionalLevelRolls[slot] = [die, faces];
        return 0;
    }
    setAdditionalSlotTarget(slot = 1, count = 1) {
        slot = Number.parseInt(slot)||1;
        count = Number.parseInt(count)||1;
        if (slot < 0) {
            slot = 0;
        }
        else if (slot > 12) {
            slot = 12;
        }
        this.additionalSlotTargets[slot] = count;
        return 0;
    }
    addEffect(effect, targetType = this.targetType, priority = 20) {
        effect = Tools.filterClass(effect, Effect, null);
        if (effect == null) {
            return 1;
        }
        targetType = Tools.filterEnum(targetType, TargetEnum)||this.targetType;
        priority = Number.parseInt(priority)||20;
        if (!this.effectsPriority.hasOwnProperty(priority)) {
            this.effectsPriority[priority] = [];
        }
        this.effectsPriority[priority].push({"effect":effect, "targetType":targetType});
        return 0;
    }
    getEffects() {
        return this.effectsPriority;
    }

    setMeshID(meshID) {
        this.meshID = MeshID;
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
        if (spell.hasOwnProperty("damageType")) {
            this.setDamageType(spell.damageType);
        }
        if (spell.hasOwnProperty("damageRollCount")) this.damageRollCount = spell.damageRollCount;
        if (spell.hasOwnProperty("damageRollCountModifier")) this.damageRollCountModifier = spell.damageRollCountModifier;
        if (spell.hasOwnProperty("damageRollFaces")) this.damageRollFaces = spell.damageRollFaces;
        if (spell.hasOwnProperty("damageRollModifier")) this.damageRollFacesModifier = spell.damageRollModifier;
        if (spell.hasOwnProperty("damageRoll")) {
            if (spell["damageRoll"] instanceof Array && spell["damageRoll"].length == 2) {
                this.setDamageRoll(spell["damageRoll"]);
            }
        }
        if (spell.hasOwnProperty("bonusAction")) this.bonusAction = spell.bonusAction;
        if (spell.hasOwnProperty("concentration")) this.concentration = spell.concentration;
        if (spell.hasOwnProperty("savingAbility")) this.savingAbility = spell.savingAbility;
        if (spell.hasOwnProperty("savingAbilityScore")) this.savingAbilityScore = spell.savingAbilityScore;
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
        if (spell.hasOwnProperty("additionalLevelRolls")) {
            for (let i in spell["additionalLevelRolls"]) {
                this.setAdditionalLevelRoll(i, spell["additionalLevelRolls"][i]);
            }
        }
        if (spell.hasOwnProperty("additionalSlotTargets")) {
            for (let i in spell["additionalSlotTargets"]) {
                this.setAdditionalSlotTarget(i, spell["additionalSlotTargets"][i]);
            }
        }
        if (spell.hasOwnProperty("effectsPriority")) {
            this.assignEffectsPriority(spell["effectsPriority"]);
        }
        if (spell.hasOwnProperty("meshID")) this.setMeshID(spell.meshID);
        if (spell.hasOwnProperty("materialID")) this.setMaterialID(spell.materialID);
        if (spell.hasOwnProperty("textureID")) this.setTextureID(spell.textureID);
        return 0;
    }
    assignEffectsPriority(effectPriorityBlob = null) {
        if (effectPriorityBlob instanceof Array) {
            effectPriorityBlob.forEach((entry) => {
                if (entry.hasOwnProperty("effect")) {
                    if (entry.hasOwnProperty("targetType")) {
                        this.addEffect(entry["effect"], entry["targetType"]);
                    }
                    else {
                        this.addEffect(entry["effect"], this.targetType);
                    }
                }
                else if (typeof entry == "string" || entry instanceof Effect) {
                    this.addEffect(entry, this.targetType);
                }
            });
        }
        else if (effectPriorityBlob["effectsPriority"] instanceof Object) {
            for (let priority in effectPriorityBlob) {
                if (effectPriorityBlob[priority] instanceof Array) {
                    effectPriorityBlob[priority].forEach((entry) => {
                        if (entry.hasOwnProperty("effect")) {
                            if (entry.hasOwnProperty("targetType")) {
                                this.addEffect(entry["effect"], entry["targetType"]);
                            }
                            else {
                                this.addEffect(entry["effect"], this.targetType);
                            }
                        }
                    });
                }
                else if (typeof effectPriorityBlob[priority] == "string" || effectPriorityBlob[priority] instanceof Effect) {
                    this.addEffect(effectPriorityBlob[priority], this.targetType);
                }
            }
        }
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