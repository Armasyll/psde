/**
 * SoulEntity
 */
class SoulEntity extends AbstractEntity {
    /**
     * Creates a Soul
     * @param  {string} id           Unique ID
     * @param  {string} name         Name
     * @param  {string} description  Description
     * @param  {string} iconID       Icon ID
     */
    constructor(id = undefined, name = undefined, description = undefined) {
        super(id, name, description);
        this.entityType = EntityEnum.SOUL;

        this.abilityScore = {"INTELLIGENCE":10,"WISDOM":10};
        this.gender = SexEnum.MALE;
        this.sexualOrientation = SexualOrientationEnum.STRAIGHT;
        this.creatureType = CreatureTypeEnum.HUMANOID;
        this.creatureSubType = CreatureSubTypeEnum.FOX;
        this.handedness = HandednessEnum.RIGHT;
        /**
         * Base disposition this has for others
         * @type {number}  Passion
         * @type {number}  Friendship
         * @type {number}  Playfulness
         * @type {number}  Soulmate
         * @type {number}  Familial
         * @type {number}  Obsession
         * @type {number}  Hate
         */
        this.defaultDisposition = {"passion":0,"friendship":0,"playfulness":0,"soulmate":0,"familial":0,"obsession":0,"hate":0};
        /**
         * Characters and this Character's disposition for them
         * @type {object} {CharacterEntity: {string: number}}
         */
        this.characterDisposition = {};
        /**
         * Initial dialogue
         * @type {string|null}
         */
        this.dialogue = null;

        SoulEntity.set(this.id, this);
    }

    setIntelligence(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) || 1;}
        else {number = number|0}
        this.abilityScore["INTELLIGENCE"] = number
        return 0;
    }
    modifyIntelligence(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setIntelligence(this.abilityScore["INTELLIGENCE"] + number);
    }
    getIntelligence() {
        if (this.isGod()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.abilityScore["INTELLIGENCE"];
    }
    setWisdom(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) || 1;}
        else {number = number|0}
        this.abilityScore["WISDOM"] = number
        return 0;
    }
    modifyWisdom(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setWisdom(this.abilityScore["WISDOM"] + number);
    }
    getWisdom() {
        if (this.isGod()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.abilityScore["WISDOM"];
    }

    setGender(gender = SexEnum.MALE) {
        if (SexEnum.properties.hasOwnProperty(gender)) {
            this.gender = gender;
            return 0;
        }
        return 2;
    }
    getGender() {
        return this.gender;
    }

    setSexualOrientation(sexualOrientation = SexualOrientationEnum.STRAIGHT) {
        if (SexualOrientationEnum.properties.hasOwnProperty(sexualOrientation)) {
            this.sexualOrientation = sexualOrientation;
            return 0;
        }
        return 2;
    }
    getSexualOrientation() {
        return this.sexualOrientation;
    }

    setDefaultDisposition(passion = 0, friendship = 0, playfulness = 0, soulmate = 0, familial = 0, obsession = 0, hate = 0) {
        this.defaultDisposition["passion"] = Number.parseInt(passion) || 0;
        this.defaultDisposition["friendship"] = Number.parseInt(friendship) || 0;
        this.defaultDisposition["playfulness"] = Number.parseInt(playfulness) || 0;
        this.defaultDisposition["soulmate"] = Number.parseInt(soulmate) || 0;
        this.defaultDisposition["familial"] = Number.parseInt(familial) || 0;
        this.defaultDisposition["obsession"] = Number.parseInt(obsession) || 0;
        this.defaultDisposition["hate"] = Number.parseInt(hate) || 0;
        return 0;
    }
    setCharacterPassion(creatureEntity, number) {
        this.characterDisposition[creatureEntity]["passion"] = number;
        return 0;
    }
    getCharacterPassion(creatureEntity) {
        if (CreatureEntity.has(creatureEntity) && CreatureEntity.get(creatureEntity).isGod()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.characterDisposition[creatureEntity]["passion"];
    }
    setCharacterFriendship(creatureEntity, number) {
        this.characterDisposition[creatureEntity]["friendship"] = number;
        return 0;
    }
    getCharacterFriendship(creatureEntity) {
        if (CreatureEntity.has(creatureEntity) && CreatureEntity.get(creatureEntity).isGod()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.characterDisposition[creatureEntity]["friendship"];
    }
    setCharacterPlayfulness(creatureEntity, number) {
        this.characterDisposition[creatureEntity]["playfulness"] = number;
        return 0;
    }
    getCharacterPlayfulness(creatureEntity) {
        if (CreatureEntity.has(creatureEntity) && CreatureEntity.get(creatureEntity).isGod()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.characterDisposition[creatureEntity]["playfulness"];
    }
    setCharacterSoulmate(creatureEntity, number) {
        this.characterDisposition[creatureEntity]["soulmate"] = number;
        return 0;
    }
    getCharacterSoulmate(creatureEntity) {
        if (CreatureEntity.has(creatureEntity) && CreatureEntity.get(creatureEntity).isGod()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.characterDisposition[creatureEntity]["soulmate"];
    }
    setCharacterFamilial(creatureEntity, number) {
        this.characterDisposition[creatureEntity]["familial"] = number;
        return 0;
    }
    getCharacterFamilial(creatureEntity) {
        if (CreatureEntity.has(creatureEntity) && CreatureEntity.get(creatureEntity).isGod()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.characterDisposition[creatureEntity]["familial"];
    }
    setCharacterObsession(creatureEntity, number) {
        this.characterDisposition[creatureEntity]["obsession"] = number;
        return 0;
    }
    getCharacterObsession(creatureEntity) {
        if (CreatureEntity.has(creatureEntity) && CreatureEntity.get(creatureEntity).isGod()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.characterDisposition[creatureEntity]["obsession"];
    }
    setCharacterHate(creatureEntity, number) {
        this.characterDisposition[creatureEntity]["hate"] = number;
        return 0;
    }
    getCharacterHate(creatureEntity) {
        if (CreatureEntity.has(creatureEntity) && CreatureEntity.get(creatureEntity).isGod()) {
            return Number.MIN_SAFE_INTEGER; // so little hate :o
        }
        return this.characterDisposition[creatureEntity]["hate"];
    }
    getCharacterDisposition(creatureEntity) {
        if (Game.enableDebug) console.log("Running getCharacterDisposition");
        if (this.hasCharacterDisposition(creatureEntity)) {
            return this.characterDisposition[creatureEntity];
        }
        else {
            return {"passion":0,"friendship":0,"playfulness":0,"soulmate":0,"familial":0,"obsession":0,"hate":0};
        }
    }
    hasCharacterDisposition(creatureEntity) {
        return this.characterDisposition.hasOwnProperty(creatureEntity);
    }
    getCharacterDispositions() {
        return this.characterDisposition;
    }
    hasMet(creatureEntity) {
        return this.hasCharacterDisposition(creatureEntity);
    }

    setHandedness(handedness) {
        if (HandednessEnum.properties.has(handedness)) {
            this.handedness = handedness;
            return 0;
        }
        return 2;
    }
    getHandedness() {
        return this.handedness;
    }
    isRightHanded() {
        return this.handedness == HandednessEnum.RIGHT;
    }
    isLeftHanded() {
        return this.handedness == HandednessEnum.LEFT;
    }

    /**
     * Adds a new disposition this character has for the specified character, by their ID.
     * @param {string} creatureEntity Character ID
     * @param {number} [passionModifier] 
     * @param {number} [friendshipModifier] 
     * @param {number} [playfulnessModifier] 
     * @param {number} [soulmateModifier] 
     * @param {number} [familialModifier] 
     * @param {number} [obsessionModifier] 
     * @param {number} [hateModifier] 
     */
    addNewDisposition(creatureEntity, passionModifier = 0, friendshipModifier = 0, playfulnessModifier = 0, soulmateModifier = 0, familialModifier = 0, obsessionModifier = 0, hateModifier = 0) {
        if (creatureEntity instanceof CharacterEntity) {
            creatureEntity = creatureEntity.getID();
        }
        this.characterDisposition[creatureEntity]["passion"] = passionModifier + this.defaultDisposition["passion"];
        this.characterDisposition[creatureEntity]["friendship"] = friendshipModifier + this.defaultDisposition["friendship"];
        this.characterDisposition[creatureEntity]["playfulness"] = playfulnessModifier + this.defaultDisposition["playfulness"];
        this.characterDisposition[creatureEntity]["soulmate"] = soulmateModifier + this.defaultDisposition["soulmate"];
        this.characterDisposition[creatureEntity]["familial"] = familialModifier + this.defaultDisposition["familial"];
        this.characterDisposition[creatureEntity]["obsession"] = obsessionModifier + this.defaultDisposition["obsession"];
        this.characterDisposition[creatureEntity]["hate"] = hateModifier + this.defaultDisposition["hate"];
        return 0;
    }

    hasDialogue() {
        return this.dialogue != null;
    }
    setDialogue(dialogue) {
        if (dialogue instanceof Dialogue) {
            dialogue = dialogue.id;
        }
        else if (Dialoghe.has(dialogue)) {}
        else {
            return 2;
        }
        this.dialogue = dialogue;
        this.addAvailableAction(ActionEnum.TALK);
        this.setDefaultAction(ActionEnum.TALK);
        return 0;
    }
    removeDialogue() {
        this.dialogue = null;
        this.removeAvailableAction(ActionEnum.TALK);
        this.setDefaultAction(ActionEnum.LOOK);
        return 0;
    }
    getDialogue() {
        return this.dialogue;
    }

    /**
     * Overrides AbstractEntity.clone
     * @param  {string} id ID
     * @return {SoulEntity} new SoulEntity
     */
    clone(id = undefined) {
        let clone = new SoulEntity(id, this.name, this.description, this.icon);
        clone.assign(this);
        return clone;
    }
    /**
     * Souls cannot be instanced. Use clone instead.
     * @param {string} id ID
     */
    createInstance(id = "") {
        return this.clone(id);
    }
    /**
     * Clones the soul's values over this
     * @param {SoulEntity} entity 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(entity, verify = true) {
        if (verify && !(entity instanceof SoulEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        if (entity.hasOwnProperty("abilityScore")) {
            this.abilityScore["INTELLIGENCE"] = entity.abilityScore["INTELLIGENCE"];
            this.abilityScore["WISDOM"] = entity.abilityScore["WISDOM"];
        }
        if (entity.hasOwnProperty("gender")) this.gender = entity.gender;
        if (entity.hasOwnProperty("sexualOrientation")) this.sexualOrientation = entity.sexualOrientation;
        if (entity.hasOwnProperty("creatureType")) this.creatureType = entity.creatureType;
        if (entity.hasOwnProperty("creatureSubType")) this.creatureSubType = entity.creatureSubType;
        if (entity.hasOwnProperty("handedness")) this.handedness = entity.handedness;
        if (entity.hasOwnProperty("defaultDisposition")) this.defaultDisposition = Object.assign({}, entity.defaultDisposition);
        if (entity.hasOwnProperty("characterDisposition")) this.characterDisposition = Object.assign({}, entity.characterDisposition);
        if (entity.hasOwnProperty("dialogue")) this.dialogue = entity.dialogue;
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        SoulEntity.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "SoulEntity";
    }

    static initialize() {
        SoulEntity.soulList = {};
    }
    static createSoulless() {
        let soulless = new SoulEntity("soulless", "Soulless", "An empty soul.")
        soulless.abilityScore["INTELLIGENCE"] = 0;
        soulless.abilityScore["WISDOM"] = 0;
        return 0;
    }
    static get(id) {
        if (SoulEntity.has(id)) {
            return SoulEntity.soulList[id];
        }
        return 1;
    }
    static has(id) {
        return SoulEntity.soulList.hasOwnProperty(id);
    }
    static set(id, entity) {
        SoulEntity.soulList[id] = entity;
        return 0;
    }
    static remove(id) {
        delete SoulEntity.soulList[id];
        return 0;
    }
    static list() {
        return SoulEntity.soulList;
    }
    static clear() {
        for (let i in SoulEntity.soulList) {
            SoulEntity.soulList[i].dispose();
        }
        SoulEntity.soulList = {};
        return 0;
    }
}
SoulEntity.initialize();