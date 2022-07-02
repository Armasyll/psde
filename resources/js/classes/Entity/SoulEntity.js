/**
 * SoulEntity
 */
class SoulEntity extends AbstractEntity {
    /**
     * Creates a Soul Entity
     * @param  {string}  id Unique ID
     * @param  {string}  name Name
     * @param  {string}  [description] Description
     */
    constructor(id = "", name = "", description = "") {
        super(id, name, description);
        this.equipable = true;
        this.holdable = true;
        this.entityType = EntityEnum.SOUL;
        this.age = 18;

        this.abilityScore = {"INTELLIGENCE":10,"WISDOM":10,"CHARISMA":10};
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

    setAge(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        this.age = number;
        return 0;
    }
    modifyAge(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setAge(this.age + number);
    }
    getAge() {
        return this.age;
    }

    setIntelligence(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) || 1;}
        else {number = number|0}
        this.abilityScore["INTELLIGENCE"] = number;
        return 0;
    }
    modifyIntelligence(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setIntelligence(this.abilityScore["INTELLIGENCE"] + number);
    }
    getIntelligence() {
        return this.abilityScore["INTELLIGENCE"];
    }
    setWisdom(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) || 1;}
        else {number = number|0}
        this.abilityScore["WISDOM"] = number;
        return 0;
    }
    modifyWisdom(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setWisdom(this.abilityScore["WISDOM"] + number);
    }
    getWisdom() {
        return this.abilityScore["WISDOM"];
    }
    setCharisma(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) || 1;}
        else {number = number|0}
        this.abilityScore["CHARISMA"] = number;
        return 0;
    }
    modifyCharisma(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        return this.setCharisma(this.abilityScore["CHARISMA"] + number);
    }
    getCharisma() {
        return this.abilityScore["CHARISMA"];
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
        return this.characterDisposition[creatureEntity]["passion"];
    }
    setCharacterFriendship(creatureEntity, number) {
        this.characterDisposition[creatureEntity]["friendship"] = number;
        return 0;
    }
    getCharacterFriendship(creatureEntity) {
        return this.characterDisposition[creatureEntity]["friendship"];
    }
    setCharacterPlayfulness(creatureEntity, number) {
        this.characterDisposition[creatureEntity]["playfulness"] = number;
        return 0;
    }
    getCharacterPlayfulness(creatureEntity) {
        return this.characterDisposition[creatureEntity]["playfulness"];
    }
    setCharacterSoulmate(creatureEntity, number) {
        this.characterDisposition[creatureEntity]["soulmate"] = number;
        return 0;
    }
    getCharacterSoulmate(creatureEntity) {
        return this.characterDisposition[creatureEntity]["soulmate"];
    }
    setCharacterFamilial(creatureEntity, number) {
        this.characterDisposition[creatureEntity]["familial"] = number;
        return 0;
    }
    getCharacterFamilial(creatureEntity) {
        return this.characterDisposition[creatureEntity]["familial"];
    }
    setCharacterObsession(creatureEntity, number) {
        this.characterDisposition[creatureEntity]["obsession"] = number;
        return 0;
    }
    getCharacterObsession(creatureEntity) {
        return this.characterDisposition[creatureEntity]["obsession"];
    }
    setCharacterHate(creatureEntity, number) {
        this.characterDisposition[creatureEntity]["hate"] = number;
        return 0;
    }
    getCharacterHate(creatureEntity) {
        return this.characterDisposition[creatureEntity]["hate"];
    }
    getCharacterDisposition(creatureEntity) {
        if (AbstractEntity.enableDebug) console.log("Running getCharacterDisposition");
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
        /*if (dialogue instanceof Dialogue) {
            dialogue = dialogue.id;
        }
        else if (Dialogue.has(dialogue)) {}
        else {
            return 2;
        }*/
        if (dialogue instanceof Dialogue) {
            this.dialogue = dialogue.id;
        }
        else if (typeof dialogue == "string") {
            this.dialogue = Tools.filterID(dialogue);
        }
        else {
            return 2;
        }
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
    getDialogue(target = null) {
        return this.dialogue;
    }

    /**
     * 
     * @param  {string} id ID
     * @returns {SoulEntity} new SoulEntity
     */
    clone(id = "") {
        let clone = new SoulEntity(id, this.name, this.description);
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
     * @param {SoulEntity} soul 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(soul, verify = true) {
        if (verify && !(soul instanceof SoulEntity)) {
            return 2;
        }
        if (soul.hasOwnProperty("name")) this.name = soul.name;
        if (soul.hasOwnProperty("description")) this.description = soul.description;
        if (soul.hasOwnProperty("age")) this.age = soul.age;
        if (soul.hasOwnProperty("abilityScore")) {
            this.abilityScore["CHARISMA"] = soul.abilityScore["CHARISMA"];
            this.abilityScore["INTELLIGENCE"] = soul.abilityScore["INTELLIGENCE"];
            this.abilityScore["WISDOM"] = soul.abilityScore["WISDOM"];
        }
        if (soul.hasOwnProperty("gender")) this.gender = soul.gender;
        if (soul.hasOwnProperty("sexualOrientation")) this.sexualOrientation = soul.sexualOrientation;
        if (soul.hasOwnProperty("creatureType")) this.creatureType = soul.creatureType;
        if (soul.hasOwnProperty("creatureSubType")) this.creatureSubType = soul.creatureSubType;
        if (soul.hasOwnProperty("handedness")) this.handedness = soul.handedness;
        if (soul.hasOwnProperty("defaultDisposition")) this.defaultDisposition = Object.assign({}, soul.defaultDisposition);
        if (soul.hasOwnProperty("characterDisposition")) this.characterDisposition = Object.assign({}, soul.characterDisposition);
        if (soul.hasOwnProperty("dialogue")) this.dialogue = soul.dialogue;
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        SoulEntity.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        SoulEntity.remove(this.id);
        return undefined;
    }
    getClassName() {
        return "SoulEntity";
    }

    static initialize() {
        SoulEntity.soulEntityList = {};
    }
    static createSoulless() {
        let soulless = new SoulEntity("soulless", "Soulless", "An empty soul.")
        soulless.abilityScore["INTELLIGENCE"] = 0;
        soulless.abilityScore["WISDOM"] = 0;
        return 0;
    }
    static get(id) {
        if (SoulEntity.has(id)) {
            return SoulEntity.soulEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return SoulEntity.soulEntityList.hasOwnProperty(id);
    }
    static set(id, entity) {
        SoulEntity.soulEntityList[id] = entity;
        return 0;
    }
    static remove(id) {
        delete SoulEntity.soulEntityList[id];
        return 0;
    }
    static list() {
        return SoulEntity.soulEntityList;
    }
    static clear() {
        for (let i in SoulEntity.soulEntityList) {
            SoulEntity.soulEntityList[i].dispose();
        }
        SoulEntity.soulEntityList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!SoulEntity.has(oldID)) {
            return 1;
        }
        SoulEntity.set(newID, SoulEntity.get(oldID));
        SoulEntity.remove(oldID);
        return 0;
    }
}
SoulEntity.initialize();
SoulEntity.createSoulless();