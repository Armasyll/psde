/**
 * Character Entity
 */
class CharacterEntity extends CreatureEntity {
    /**
     * Creates a Character Entity
     * @param  {string}  id Unique ID
     * @param  {string}  name Name
     * @param  {string}  [description] Description
     * @param  {string}  [iconID] Icon ID
     * @param  {CreatureTypeEnum}  [creatureType] Creature Type
     * @param  {CreatureSubTypeEnum}  [creatureSubType] Creature Sub-Type; dependant upon creatureType
     * @param  {SexEnum}  [sex] SexEnum
     * @param  {number}  [age] Age
     * @param  {CharacterClass}  [primaryCharacterClass] CharacterClass
     */
    constructor(id = "nickWilde", name = "Wilde, Nicholas", description = "", iconID = "genericCharacterIcon", creatureType = CreatureTypeEnum.HUMANOID, creatureSubType = CreatureSubTypeEnum.FOX, sex = SexEnum.MALE, age = 33, primaryCharacterClass = CharacterClass.get("classless")) {
        super(id, name, description, iconID, creatureType, creatureSubType, sex, age);
        this.entityType = EntityEnum.CHARACTER;
        this.surname = "";
        this.nickname = "";
        /**
         * Equipment
         * @type {<number, AbstractEntity>} Bone ID and AbstractEntity; suppose to be an InstancedItemEntity, but it could be any AbstractEntity :v
         */
        //this.equipment = {};
        this.equipment["HEAD"] = null;
        this.equipment["EAR_L"] = null;
        this.equipment["EAR_R"] = null;
        this.equipment["NECK"] = null;
        this.equipment["SHOULDER_L"] = null;
        this.equipment["SHOULDER_R"] = null;
        this.equipment["FOREARM_L"] = null;
        this.equipment["FOREARM_R"] = null;
        this.equipment["HAND_L"] = null;
        this.equipment["HAND_R"] = null;
        this.equipment["CHEST"] = null;
        this.equipment["PELVIS"] = null;
        this.equipment["LEGS"] = null;
        this.equipment["FOOT_L"] = null;
        this.equipment["FOOT_R"] = null;
        this.previousEquipment = Object.assign({}, this.equipment);
        this.held = {"HAND_R":null, "HAND_L":null};
        this.previousHeld = Object.assign({}, this.held);
        /**
         * Primary fur colour
         * @type {string}
         */
        this.furColourA = "orange";
        /**
         * Primary fur colour hex value
         * @type {string}
         */
        this._furColourAHex = "#FFA500";
        /**
         * Sexondary fur colour
         * @type {string}
         */
        this.furColourB = "cream";
        /**
         * Secondary fur colour hex value
         * @type {string}
         */
        this._furColourBHex = "#FFFDD0";
        /**
         * Paw type
         * @type {PawEnum} 
         */
        this.pawType = PawEnum.PAD;
        /**
         * Eye type
         * @type {EyeEnum} 
         */
        this.eyeType = EyeEnum.CIRCLE;
        /**
         * Eye colour
         * @type {string}
         */
        this.eyeColour = "green";
        this._leftEyeColourHex = "#00FF00";
        this._rightEyeColourHex = "#00FF00";
        /**
         * Pelt type
         * @type {PeltEnum} 
         */
        this.peltType = PeltEnum.FUR;

        /**
         * @type {object} 
         */
        this.characterClasses = {};
        this.primaryCharacterClass = null;

        this.setName(name);
        this.setIcon(iconID);
        this.setAge(age);
        this.setGender(sex);
        this.addAvailableAction(ActionEnum.ATTACK);
        this.addAvailableAction(ActionEnum.HOLD);
        this.addAvailableAction(ActionEnum.OPEN); // container... maybe :v
        this.addAvailableAction(ActionEnum.GIVE);
        this.addAvailableAction(ActionEnum.TAKE);
        this.createContainer();
        this.setClass(primaryCharacterClass);
        this.generateProperties();
        this.generateBaseStats(true);
        this.generateAdditionalStats();
        CharacterEntity.set(this.id, this);
    }

    setID(id) {
        CharacterEntity.remove(this.id);
        super.setID(id);
        CharacterEntity.set(this.id, this);
        return 0;
    }

    setName(name = "") {
        if (name.split(", ").length > 1) {
            let tempName = name.split(", ");
            this.name = tempName[1].replace(/[^0-9a-z]/gi, '');
            this.surname = tempName[0].replace(/[^0-9a-z]/gi, '');
        }
        else if (name.split(" ").length > 1) {
            let tempName = name.split(" ");
            this.name = tempName[0].replace(/[^0-9a-z]/gi, '');
            this.surname = tempName[1].replace(/[^0-9a-z]/gi, '');
        }
        else {
            this.name = name.replace(/[^0-9a-z]/gi, '');
        }
        return 0;
    }
    getFullName() {
        if (this.surname != undefined && this.surname.length > 0)
            return this.name + " " + this.surname;
        else
            return this.name;
    }
    getFirstName() {
        return this.name || "";
    }
    getLastName() {
        return this.surname || "";
    }
    getSurname() {
        return this.getLastName();
    }

    generateDescription() {
        return String(`A ${this.age} year old ${String(SexEnum.properties[this.sex].name).toLowerCase()} ${String(CreatureTypeEnum.properties[this.creatureType].name).toLowerCase()} ${String(CreatureSubTypeEnum.properties[this.creatureSubType].name).toLowerCase()} with ${this.furColourA}-coloured ${String(PeltEnum.properties[this.peltType].name).toLowerCase()}.`);
    }

    filterEquipmentSlot(equipmentSlot) {
        equipmentSlot = Tools.filterEnum(equipmentSlot, ApparelSlotEnum, false);
        if (equipmentSlot == -1) {
            equipmentSlot = "NONE";
        }
        if (this.equipment.hasOwnProperty(equipmentSlot)) {}
        else if (equipmentSlot == "HANDS") {
            if (this.equipment["HAND_R"] == null) {
                equipmentSlot = "HAND_R";
            }
            else if (this.equipment["HAND_L"] == null) {
                equipmentSlot = "HAND_L";
            }
            else {
                equipmentSlot = "HAND_R";
            }
        }
        else if (equipmentSlot == "EARS") {
            if (this.sexualOrientation == SexualOrientationEnum.STRAIGHT || this.sexualOrientation == SexualOrientationEnum.ASEXUAL) {
                if (this.equipment["EAR_L"] == null) {
                    equipmentSlot = "EAR_L";
                }
                else if (this.equipment["EAR_R"] == null) {
                    equipmentSlot = "EAR_R";
                }
                else {
                    equipmentSlot = "EAR_L";
                }
            }
            else {
                if (this.equipment["EAR_R"] == null) {
                    equipmentSlot = "EAR_R";
                }
                else if (this.equipment["EAR_L"] == null) {
                    equipmentSlot = "EAR_L";
                }
                else {
                    equipmentSlot = "EAR_R";
                }
            }
        }
        else {
            equipmentSlot = "NONE";
        }
        return equipmentSlot;
    }
    getEquipment() {
        return this.equipment;
    }
    getHeld() {
        return {"HAND_R":this.held["HAND_R"], "HAND_L":this.held["HAND_L"]};
    }
    equip(instancedItemEntity, equipmentSlot = "NONE", tellGameWorker = true) {
        tellGameWorker = tellGameWorker == true;
        /*
        Get an instanced entity out of whatever instancedItemEntity is, otherwise fail
        */
        if (!(instancedItemEntity instanceof AbstractEntity)) {
            if (AbstractEntity.has(instancedItemEntity)) {
                instancedItemEntity = AbstractEntity.get(instancedItemEntity);
            }
            else {
                if (AbstractEntity.debugMode) console.log(`\t The item (${instancedItemEntity}) doesn't exist.`);
                return 2;
            }
        }
        if (this.hasItem(instancedItemEntity)) {
            instancedItemEntity = this.getItem(instancedItemEntity);
        }
        else {
            if (AbstractEntity.debugMode) console.log(`\tCharacter (${this.id}) doesn't have the item (${instancedItemEntity.id}).`);
            return 1;
        }
        if (AbstractEntity.debugMode) console.log(`Running <CharacterEntity> ${this.id}.equip(${instancedItemEntity.id}, ${equipmentSlot})`);
        /*
        Get an apparel slot out of whatever equipmentSlot is, otherwise fail
         */
        if (equipmentSlot == "NONE") {
            equipmentSlot = Tools.filterEnum(instancedItemEntity.getEquipmentSlot(), ApparelSlotEnum, false);
        }
        /*
        Clear out the equipment slot if it's in use, and set its value to instancedEntity
         */
        equipmentSlot = this.filterEquipmentSlot(equipmentSlot);
        if (equipmentSlot == "NONE") {
            if (AbstractEntity.debugMode) console.log(`\tNo equipment slot was defined.`);
            return 2;
        }
        if (this.equipment[equipmentSlot] instanceof InstancedItemEntity) {
            this.unequipBySlot(equipmentSlot);
        }
        this.equipment[equipmentSlot] = instancedItemEntity;
        /*
        Maybe tell the frontend
         */
        if (tellGameWorker) {
            EntityLogic.sendEntityUpdate(this, "equipment");
        }
        return 0;
    }
    unequip(any, tellGameWorker = true) {
        tellGameWorker = tellGameWorker == true;
        if (any instanceof InstancedEntity) {
            return this.unequipByInstancedEntity(any, tellGameWorker);
        }
        else if (any instanceof Entity) {
            return this.unequipByEntity(any, tellGameWorker);
        }
        else if (typeof any == "string") {
            if (InstancedEntity.has(any)) {
                return this.unequipByInstancedEntity(InstancedEntity.get(any), tellGameWorker);
            }
            else if (Entity.has(any)) {
                return this.unequipByEntity(Entity.get(any), tellGameWorker);
            }
            else if (ApparelSlotEnum.hasOwnProperty(any)) {
                return this.unequipBySlot(any, tellGameWorker);
            }
        }
        else if (ApparelSlotEnum.properties.hasOwnProperty(any)) {
            return this.unequipBySlot(ApparelSlotEnum.properties[any].key, tellGameWorker);
        }
        return 2;
    }
    unequipByInstancedEntity(instancedEntity, tellGameWorker = true) {
        for (let equipmentSlot in this.equipment) {
            if (this.equipment[equipmentSlot] instanceof AbstractEntity) {
                if (this.equipment[equipmentSlot].getID() == instancedEntity.getID()) {
                    return this.unequipBySlot(equipmentSlot, tellGameWorker);
                }
            }
        }
        if (AbstractEntity.debugMode) console.log(`\tThe entity (${instancedEntity.id}) was not equipped.`);
        return 1;
    }
    unequipByEntity(entity, tellGameWorker = true) {
        for (let equipmentSlot in this.equipment) {
            if (this.equipment[equipmentSlot] instanceof AbstractEntity) {
                if (this.equipment[equipmentSlot].entity == entity) {
                    return this.unequipBySlot(equipmentSlot, tellGameWorker);
                }
            }
        }
        if (AbstractEntity.debugMode) console.log(`\tThe entity (${entity.id}) was not equipped.`);
        return 1;
    }
    unequipBySlot(equipmentSlot, tellGameWorker = true) {
        tellGameWorker = tellGameWorker == true;
        if (this.equipment.hasOwnProperty(equipmentSlot)) {}
        else if (ApparelSlotEnum.hasOwnProperty(equipmentSlot)) {
            switch(equipmentSlot) {
                case "HANDS": {
                    let result = this.unequipBySlot("HAND_L");
                    let result2 = this.unequipBySlot("HAND_R");
                    return result2 || result;
                    break;
                }
                case "EARS": {
                    let result = this.unequipBySlot("EAR_L");
                    let result2 = this.unequipBySlot("EAR_R");
                    return result2 || result;
                    break;
                }
                case "FEET": {
                    let result = this.unequipBySlot("FOOT_L");
                    let result2 = this.unequipBySlot("FOOT_R");
                    return result2 || result;
                    break;
                }
                case "FINGERS": {
                    break;
                }
            }
        }
        else {
            if (AbstractEntity.debugMode) console.log(`\tNo equipment slot was defined.`);
            return 2;
        }
        if (this.equipment[equipmentSlot] == null) {
            return 1;
        }
        else if (!(this.equipment[equipmentSlot] instanceof AbstractEntity)) {
            this.equipment[equipmentSlot] = null;
            return 1;
        }
        this.equipment[equipmentSlot].equipped = false;
        this.equipment[equipmentSlot].held = false;
        this.equipment[equipmentSlot] = null;
        if (tellGameWorker) {
            EntityLogic.sendEntityUpdate(this, "equipment");
        }
        return 0;
    }
    hasEquipment(abstractEntity) {
        if (!(abstractEntity instanceof AbstractEntity)) {
            if (AbstractEntity.has(abstractEntity)) {
                abstractEntity = AbstractEntity.get(abstractEntity);
            }
            else {
                return false;
            }
        }
        if (abstractEntity instanceof Entity) {
            for (let equipmentSlot in this.equipment) {
                if (InstancedItemEntity.has(this.equipment[equipmentSlot])) {
                    let instancedItemEntity = InstancedItemEntity.get(this.equipment[equipmentSlot]);
                    if (instancedItemEntity.getEntity() == abstractEntity) {
                        return true;
                    }
                }
            }
        }
        else if (abstractEntity instanceof InstancedEntity) {
            for (let equipmentSlot in this.equipment) {
                if (this.equipment[equipmentSlot] instanceof InstancedEntity && this.equipment[equipmentSlot].getID() == abstractEntity.getID()) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Removes an InstancedItemEntity from this entity's Item array
     * @override
     * @param  {InstancedItemEntity} instancedItemEntity InstancedItemEntity, or ItemEntity, to be removed
     * @param  {number} [count] 
     * @param  {boolean} [tellGameWorker] 
     * @returns {this}
     */
    removeItem(instancedItemEntity, count = 1, tellGameWorker = true) {
        if (!this.hasContainer()) {
            return 1;
        }
        if (!(instancedItemEntity instanceof InstancedItemEntity)) {
            instancedItemEntity = this.container.getItem(instancedItemEntity);
            if (!(instancedItemEntity instanceof InstancedItemEntity)) {
                return 1;
            }
        }
        tellGameWorker = tellGameWorker == true;
        let result = 0;
        if (this.hasEquipment(instancedItemEntity)) {
            result = this.unequip(instancedItemEntity, tellGameWorker);
            if (result != 0) {
                return result;
            }
        }
        else if (this.hasHeld(instancedItemEntity)) {
            result = this.release(instancedItemEntity, tellGameWorker);
            if (result != 0) {
                return result;
            }
        }
        result = this.container.removeItem(instancedItemEntity, count);
        if (result == 0 && tellGameWorker) {
            EntityLogic.sendEntityUpdate(this, "container");
        }
        return result;
    }

    hasHeld(abstractEntity) {
        if (!(abstractEntity instanceof AbstractEntity)) {
            if (InstancedItemEntity.has(abstractEntity)) {
                abstractEntity = InstancedItemEntity.get(abstractEntity);
            }
            else {
                return false;
            }
        }
        if (abstractEntity instanceof Entity) {
            for (let heldSlot in this.held) {
                if (InstancedItemEntity.has(this.held[heldSlot])) {
                    let instancedItemEntity = InstancedItemEntity.get(this.held[heldSlot]);
                    if (instancedItemEntity.getEntity().getID() == abstractEntity.getID()) {
                        return true;
                    }
                }
            }
        }
        else if (abstractEntity instanceof InstancedEntity) {
            for (let heldSlot in this.held) {
                if (this.held[heldSlot] instanceof InstancedEntity && this.held[heldSlot].getID() == abstractEntity.getID()) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * 
     * @param {InstancedEntity} instancedItemEntity 
     * @param {HandednessEnum} heldSlot 
     */
    hold(instancedItemEntity, heldSlot = "NONE", tellGameWorker = true) {
        tellGameWorker = tellGameWorker == true;
        /*
        Get an instanced entity out of whatever instancedItemEntity is, otherwise fail
        */
        if (!(instancedItemEntity instanceof AbstractEntity)) {
            if (AbstractEntity.has(instancedItemEntity)) {
                instancedItemEntity = AbstractEntity.get(instancedItemEntity);
            }
            else {
                if (AbstractEntity.debugMode) console.log(`\t The item (${instancedItemEntity}) doesn't exist.`);
                return 2;
            }
        }
        if (this.hasItem(instancedItemEntity)) {
            instancedItemEntity = this.getItem(instancedItemEntity);
        }
        else {
            if (AbstractEntity.debugMode) console.log(`\tCharacter (${this.id}) doesn't have the item (${instancedItemEntity.id}).`);
            return 1;
        }
        if (AbstractEntity.debugMode) console.log(`Running <CharacterEntity> ${this.id}.equip(${instancedItemEntity.id}, ${heldSlot})`);
        if (instancedItemEntity instanceof InstancedWeaponEntity && instancedItemEntity.isTwoHanded()) {
            this.held["HAND_R"] = instancedItemEntity;
            this.held["HAND_L"] = instancedItemEntity;
        }
        else {
            /*
            Get an apparel slot out of whatever heldSlot is
             */
            if (heldSlot != "HAND_L" && heldSlot != "HAND_R") {
                if (this.handedness == HandednessEnum.LEFT) {
                    if (this.held["HAND_L"] == null) {
                        heldSlot = "HAND_L";
                    }
                    else if (this.held["HAND_R"] == null) {
                        heldSlot = "HAND_R";
                    }
                    else {
                        heldSlot = "HAND_L";
                    }
                }
                else {
                    if (this.held["HAND_R"] == null) {
                        heldSlot = "HAND_R";
                    }
                    else if (this.held["HAND_L"] == null) {
                        heldSlot = "HAND_L";
                    }
                    else {
                        heldSlot = "HAND_R";
                    }
                }
            }
            /*
            Clear out the equipment slot if it's in use, and set its value to instancedItemEntity
             */
            if (this.held[heldSlot] instanceof InstancedItemEntity) {
                if (this.held[heldSlot].id != instancedItemEntity.id) {
                    this.releaseBySlot(heldSlot, false);
                }
            }
            this.held[heldSlot] = instancedItemEntity;
        }
        /*
        Maybe tell the frontend
         */
        if (tellGameWorker) {
            this.calculateIsArmed();
            EntityLogic.sendEntityUpdate(this, "held");
        }
        return 0;
    }
    release(any, tellGameWorker = true) {
        tellGameWorker = tellGameWorker == true;
        if (any instanceof InstancedEntity) {
            return this.releaseByInstancedEntity(any, tellGameWorker);
        }
        else if (any instanceof Entity) {
            return this.releaseByEntity(any, tellGameWorker);
        }
        else if (typeof any == "string") {
            if (InstancedEntity.has(any)) {
                return this.releaseByInstancedEntity(InstancedEntity.get(any), tellGameWorker);
            }
            else if (Entity.has(any)) {
                return this.releaseByEntity(Entity.get(any), tellGameWorker);
            }
            else if (ApparelSlotEnum.hasOwnProperty(any)) {
                return this.releaseBySlot(any, tellGameWorker);
            }
        }
        else if (ApparelSlotEnum.properties.hasOwnProperty(any)) {
            return this.releaseBySlot(ApparelSlotEnum.properties[any].key, tellGameWorker);
        }
        return 2;
    }
    releaseByInstancedEntity(instancedEntity, tellGameWorker = true) {
        let releasedEntity = false;
        for (let heldSlot in this.held) {
            if (!(this.held[heldSlot] instanceof AbstractEntity)) {
                continue;
            }
            if (this.held[heldSlot].getID() != instancedEntity.getID()) {
                continue;
            }
            releasedEntity = true;
            this.releaseBySlot(heldSlot, tellGameWorker);
        }
        if (releasedEntity) {
            return 0;
        }
        else {
            if (AbstractEntity.debugMode) console.log(`\tThe entity (${instancedEntity.id}) was not held.`);
            return 1;
        }
    }
    releaseByEntity(entity, tellGameWorker = true) {
        let releasedEntity = false;
        for (let heldSlot in this.held) {
            if (!(this.held[heldSlot] instanceof AbstractEntity)) {
                continue;
            }
            if (this.held[heldSlot].entity != entity) {
                continue;
            }
            releasedEntity = true;
            this.releaseBySlot(heldSlot, tellGameWorker);
        }
        if (releasedEntity) {
            return 0;
        }
        else {
            if (AbstractEntity.debugMode) console.log(`\tThe entity (${entity.id}) was not held.`);
            return 1;
        }
    }
    releaseBySlot(heldSlot = "NONE", tellGameWorker = true) {
        tellGameWorker = tellGameWorker == true;
        if (this.held.hasOwnProperty(heldSlot)) {}
        else if (heldSlot == "HANDS") {
            this.releaseBySlot("HAND_L");
            this.releaseBySlot("HAND_R");
            return 0;
        }
        else {
            if (AbstractEntity.debugMode) console.log(`\tNo equipment slot was defined.`);
            return 2;
        }
        if (this.held[heldSlot] == null) {
            return 0;
        }
        else if (!(this.held[heldSlot] instanceof AbstractEntity)) {
            this.held[heldSlot] = null;
            return 0;
        }
        this.held[heldSlot] = null;
        if (tellGameWorker) {
            this.calculateIsArmed();
            EntityLogic.sendEntityUpdate(this, "held");
        }
        return 0;
    }

    setPaws(pawEnum = PawEnum.PAD) {
        if (PawEnum.properties.hasOwnProperty(pawEnum)) {
            this.pawType = pawEnum;
        }
        else {
            this.pawType = PawEnum.PAD;
        }
        return 0;
    }

    setEyeType(eyeEnum = EyeEnum.CIRCLE) {
        if (EyeEnum.properties.hasOwnProperty(eyeEnum)) {
            this.eyeType = eyeEnum;
        }
        else {
            this.eyeType = EyeEnum.CIRCLE;
        }
        return 0;
    }
    getEyeType() {
        return this.eyeType;
    }
    setEyeColour(colour = "brown") {
        if (typeof colour != "string") {
            colour = "gray";
        }
        else {
            colour = colour.toLowerCase();
        }
        this.eyeColour = colour;
        this._leftEyeColourHex = Tools.colourNameToHex(colour.replace(/[^a-z]/g, ""));
        this._rightEyeColourHex = this._leftEyeColourHex;
        return 0;
    }
    getEyeColour() {
        return this.eyeColour;
    }

    setPelt(peltEnum = PeltEnum.FUR) {
        if (PeltEnum.properties.hasOwnProperty(peltEnum)) {
            this.peltType = peltEnum;
        }
        else {
            this.peltType = PeltEnum.FUR;
        }
        return 0;
    }
    setFurColourA(colour = "red") {
        this.furColourA = colour;
        this._furColourAHex = Tools.colourNameToHex(colour.replace(/[^a-z]/g, ""));
        return 0;
    }
    setFurColourB(colour = "cream") {
        this.furColourB = colour;
        this._furColourBHex = Tools.colourNameToHex(colour.replace(/[^a-z]/g, ""));
        return 0;
    }
    setFurColour(colourA, colourB = null) {
        if (colourB == null)
            colourB = colourA;
        
        this.setFurColourA(colourA);
        this.setFurColourB(colourB);
        return 0;
    }

    setClass(characterClass) {
        if (characterClass instanceof CharacterClass) {}
        else if (CharacterClass.has(characterClass)) {
            characterClass = CharacterClass.get(characterClass);
        }
        else {
            return 1;
        }
        if (!this.hasClass(characterClass)) {
            this.addClass(characterClass);
        }
        this.primaryCharacterClass = characterClass;
        return 0;
    }
    addClass(characterClass) {
        if (characterClass instanceof CharacterClass) {}
        else if (CharacterClass.has(characterClass)) {
            characterClass = CharacterClass.get(characterClass);
        }
        else {
            return 1;
        }
        if (this.characterClasses.hasOwnProperty(characterClass)) {
            return 0;
        }
        if (this.primaryCharacterClass == null) {
            this.primaryCharacterClass = characterClass;
        }
        this.characterClasses[characterClass] = 1;
        return 0;
    }
    removeClass(characterClass) {
        if (characterClass instanceof CharacterClass) {}
        else if (CharacterClass.has(characterClass)) {
            characterClass = CharacterClass.get(characterClass);
        }
        else {
            return 1;
        }
        if (characterClass = this.primaryCharacterClass) {
            return 0;
        }
        if (this.characterClasses.hasOwnProperty(characterClass)) {
            delete this.characterClasses[characterClass];
        }
        return 0;
    }
    modifyClassLevel(characterClass, level = 1) {
        if (characterClass instanceof CharacterClass) {}
        else if (CharacterClass.has(characterClass)) {
            characterClass = CharacterClass.get(characterClass);
        }
        else {
            return 1;
        }
        if (this.characterClasses.hasOwnProperty(characterClass)) {
            level = Tools.filterInteger(level);
            let number = this.characterClasses[characterClass] + level;
            if (number < 1) {
                number = 1;
            }
            else if (number > Number.MAX_SAFE_INTEGER) {
                number = Number.MAX_SAFE_INTEGER;
            }
            this.characterClasses[characterClass] = number;
            return 0;
        }
        return 1;
    }
    getClass() {
        return this.primaryCharacterClass;
    }
    /**
     * @returns {object} Classes and their scores
     */
    getClasses() {
        return this.characterClasses;
    }
    getClassLevel(characterClass) {
        if (characterClass instanceof CharacterClass) {}
        else if (CharacterClass.has(characterClass)) {
            characterClass = CharacterClass.get(characterClass);
        }
        else {
            return 0;
        }
        if (this.characterClasses.hasOwnProperty(characterClass)) {
            return this.characterClasses[characterClass];
        }
        return 0;
    }
    hasClass(characterClass) {
        if (characterClass instanceof CharacterClass) {}
        else if (CharacterClass.has(characterClass)) {
            characterClass = CharacterClass.get(characterClass);
        }
        else {
            return 1;
        }
        return this.characterClasses.hasOwnProperty(characterClass);
    }
    clearClasses() {
        for (let characterClass in this.characterClasses) {
            this.removeClass(characterClass);
        }
        delete this.characterClasses[this.primaryCharacterClass];
        this.addClass("classless");
        return 0;
    }
    getSpellcastingAbility() {
        return this.primaryCharacterClass.spellcastingAbility; // TODO: consider multi-class builds
    }
    getSpellcastingAbilityScore() {
        return this.getAbility(this.primaryCharacterClass.spellcastingAbility);
    }
    getSpellcastingAbilityModifier() {
        return DND5E.calculateAbilityModifier(this.primaryCharacterClass.spellcastingAbility);
    }

    calculateIsArmed() {
        let weapon = null;
        if (this.isRightHanded() && this.held["HAND_R"] instanceof InstancedWeaponEntity) {
            weapon = this.held["HAND_R"] || this.held["HAND_L"];
        }
        else if (this.isLeftHanded() && this.held["HAND_L"] instanceof InstancedWeaponEntity) {
            weapon = this.held["HAND_L"] || this.held["HAND_R"];
        }
        else {
            this.armed = false;
            return this.armed;
        }
        if (weapon.entity == WeaponEntity.get("weaponHand") || weapon.entity == WeaponEntity.get("weaponClaw")) {
            this.armed = this.hasProficiency(ProficiencyEnum.MARTIAL);
        }
        else if (weapon instanceof InstancedWeaponEntity) {
            this.armed = true;
        }
        else {
            this.armed = false;
        }
        return this.armed;
    }

    resetModifiers() {
        super.resetModifiers();
        return 0;
    }
    /**
     * Generates protections and multipliers; to be run after status effects and equipment are changed
     */
    generateAdditionalStats() {
        this.armourClass = 0;
        for (let equipmentSlot in this.equipment) {
            if (this.equipment[equipmentSlot] instanceof InstancedClothingEntity) {
                let multiplier = 0.1;
                let nEquipmentSlot = Tools.filterEnum(this.equipment[equipmentSlot].getEquipmentSlot());
                switch (nEquipmentSlot) {
                    case "CHEST": {
                        multiplier = 0.3;
                        break;
                    }
                    case "HAND_L":
                    case "HAND_R":
                    case "HANDS": {
                        multiplier = 0.05;
                        break;
                    }
                }
                let modifier = DND5E.calculateAbilityModifier(this.getDexterity() - 10);
                switch (this.equipment[equipmentSlot].getArmourType()) {
                    case ArmourPropertyEnum.PADDED:
                    case ArmourPropertyEnum.LEATHER:
                    case ArmourPropertyEnum.STUDDEDLEATHER: {
                        modifier = DND5E.calculateAbilityModifier(this.getDexterity());
                        break;
                    }
                    case ArmourPropertyEnum.HIDE:
                    case ArmourPropertyEnum.CHAINSHIRT:
                    case ArmourPropertyEnum.SCALEMAIL:
                    case ArmourPropertyEnum.BREASTPLATE:
                    case ArmourPropertyEnum.HALFPLATE: {
                        modifier = DND5E.calculateAbilityModifier(this.getDexterity());
                        if (modifier > 2) {
                            modifier = 2;
                        }
                        break;
                    }
                }
                this.armourClass += this.equipment[equipmentSlot].getArmourClass() + (modifier * multiplier);
            }
        }
        return 0;
    }
    generateProperties(firstTime = false) {
        if (this.creatureType != CreatureTypeEnum.HUMANOID) {
            return 0;
        }
        switch(this.creatureSubType) {
            case CreatureSubTypeEnum.FOX: {
                if (this.sex == SexEnum.MALE) {
                    this.baseWeight = 36;
                    this.baseHeight = 1.20;
                    this.baseWidth = 0.4;
                }
                else {
                    this.baseWeight = 32;
                    this.baseHeight = 1.12;
                    this.baseWidth = 0.37;
                }
                this.size = SizeEnum.SMALL;
                this.setPredator(true);
                this.setPaws(PawEnum.PAD);
                this.setEyeType(EyeEnum.CIRCLE);
                this.setPelt(PeltEnum.FUR);
                break;
            }
            case CreatureSubTypeEnum.SHEEP: {
                if (this.sex == SexEnum.MALE) {
                    this.baseWeight = 34;
                    this.baseHeight = 1.35;
                    this.baseWidth = 0.45;
                }
                else {
                    this.baseWeight = 28;
                    this.baseHeight = 1.0;
                    this.baseWidth = 0.33;
                }
                this.size = SizeEnum.SMALL;
                this.setPredator(false);
                this.setPaws(PawEnum.HOOF);
                this.setEyeType(EyeEnum.OBLONG);
                this.setPelt(PeltEnum.WOOL);
                break;
            }
            case CreatureSubTypeEnum.WOLF: {
                if (this.sex == SexEnum.MALE) {
                    this.baseHeight = 1.9;
                    this.baseWidth = 0.63;
                }
                else {
                    this.baseWeight = 66;
                    this.baseHeight = 1.8;
                    this.baseWidth = 0.6;
                }
                this.size = SizeEnum.MEDIUM;
                this.setPredator(true);
                this.setPaws(PawEnum.PAD);
                this.setEyeType(EyeEnum.CIRCLE);
                this.setPelt(PeltEnum.FUR);
                break;
            }
            case CreatureSubTypeEnum.AARDWOLF: {
                if (this.sex == SexEnum.MALE) {
                    this.baseWeight = 32;
                    this.baseHeight = 1.10;
                    this.baseWidth = 0.36;
                }
                else {
                    this.baseWeight = 28;
                    this.baseHeight = 1.02;
                    this.baseWidth = 0.34;
                }
                this.size = SizeEnum.SMALL;
                this.setPredator(true);
                this.setPaws(PawEnum.PAD);
                this.setEyeType(EyeEnum.CIRCLE);
                this.setPelt(PeltEnum.FUR);
                break;
            }
            case CreatureSubTypeEnum.HYENA: {
                if (this.sex == SexEnum.MALE) {
                    this.baseWeight = 58;
                    this.baseHeight = 1.6;
                    this.baseWidth = 0.53;
                }
                else {
                    this.baseWeight = 62;
                    this.baseHeight = 1.75;
                    this.baseWidth = 0.58;
                }
                this.size = SizeEnum.MEDIUM;
                this.setPredator(true);
                this.setPaws(PawEnum.PAD);
                this.setEyeType(EyeEnum.CIRCLE);
                this.setPelt(PeltEnum.FUR);
                break;
            }
            case CreatureSubTypeEnum.STOAT: {
                if (this.sex == SexEnum.MALE) {
                    this.baseWeight = 10;
                    this.baseHeight = 0.6;
                    this.baseWidth = 0.2;
                }
                else {
                    this.baseWeight = 8;
                    this.baseHeight = 0.5;
                    this.baseWidth = 0.16;
                }
                this.size = SizeEnum.TINY;
                this.setPredator(true);
                this.setPaws(PawEnum.PAD);
                this.setEyeType(EyeEnum.CIRCLE);
                this.setPelt(PeltEnum.FUR);
                break;
            }
            case CreatureSubTypeEnum.DEER: {
                if (this.sex == SexEnum.MALE) {
                    this.baseWeight = 78;
                    this.baseHeight = 2.2;
                    this.baseWidth = 0.7;
                }
                else {
                    this.baseWeight = 60;
                    this.baseHeight = 1.9;
                    this.baseWidth = 0.6;
                }
                this.size = SizeEnum.MEDIUM;
                this.setPredator(false);
                this.setPaws(PawEnum.HOOF);
                this.setEyeType(EyeEnum.CIRCLE);
                this.setPelt(PeltEnum.WOOL);
                break;
            }
            case CreatureSubTypeEnum.RABBIT: {
                if (this.sex == SexEnum.MALE) {
                    this.baseWeight = 22;
                    this.baseHeight = 0.95;
                    this.baseWidth = 0.34;
                }
                else {
                    this.baseWeight = 14.9;
                    this.baseHeight = 0.81;
                    this.baseWidth = 0.3;
                }
                this.size = SizeEnum.SMALL;
                this.setPredator(false);
                this.setPaws(PawEnum.FUR);
                this.setEyeType(EyeEnum.CIRCLE);
                this.setPelt(PeltEnum.FUR);
                break;
            }
            case CreatureSubTypeEnum.JACKAL: {
                if (this.sex == SexEnum.MALE) {
                    this.baseWeight = 55;
                    this.baseHeight = 1.6;
                    this.baseWidth = 0.53;
                }
                else {
                    this.baseWeight = 51;
                    this.baseHeight = 1.55;
                    this.baseWidth = 0.5;
                }
                this.size = SizeEnum.MEDIUM;
                this.setPredator(true);
                this.setPaws(PawEnum.PAD);
                this.setEyeType(EyeEnum.CIRCLE);
                this.setPelt(PeltEnum.FUR);
                break;
            }
            case CreatureSubTypeEnum.COYOTE: {
                if (this.sex == SexEnum.MALE) {
                    this.baseWeight = 36;
                    this.baseHeight = 1.20;
                    this.baseWidth = 0.4;
                }
                else {
                    this.baseWeight = 32;
                    this.baseHeight = 1.12;
                    this.baseWidth = 0.37;
                }
                this.size = SizeEnum.SMALL;
                this.setPredator(true);
                this.setPaws(PawEnum.PAD);
                this.setEyeType(EyeEnum.CIRCLE);
                this.setPelt(PeltEnum.FUR);
                break;
            }
            case CreatureSubTypeEnum.TIGER: {
                if (this.sex == SexEnum.MALE) {
                    this.baseWeight = 88;
                    this.baseHeight = 2.2;
                    this.baseWidth = 0.73;
                }
                else {
                    this.baseWeight = 82;
                    this.baseHeight = 2.0;
                    this.baseWidth = 0.66;
                }
                this.size = SizeEnum.MEDIUM;
                this.setPredator(true);
                this.setPaws(PawEnum.PAD);
                this.setEyeType(EyeEnum.CIRCLE);
                this.setPelt(PeltEnum.FUR);
                break;
            }
            case CreatureSubTypeEnum.ANTELOPE: {
                if (this.sex == SexEnum.MALE) {
                    this.baseWeight = 68;
                    this.baseHeight = 2.0;
                    this.baseWidth = 0.66;
                }
                else {
                    this.baseWeight = 60;
                    this.baseHeight = 1.9;
                    this.baseWidth = 0.63;
                }
                this.size = SizeEnum.MEDIUM;
                this.setPredator(false);
                this.setPaws(PawEnum.HOOF);
                this.setEyeType(EyeEnum.OBLONG);
                this.setPelt(PeltEnum.HAIR);
                break;
            }
            case CreatureSubTypeEnum.PIG: {
                if (this.sex == SexEnum.MALE) {
                    this.baseWeight = 46;
                    this.baseHeight = 1.3;
                    this.baseWidth = 0.54;
                }
                else {
                    this.baseWeight = 44;
                    this.baseHeight = 1.2;
                    this.baseWidth = 0.5;
                }
                this.size = SizeEnum.SMALL;
                this.setPredator(false);
                this.setPaws(PawEnum.HOOF);
                this.setEyeType(EyeEnum.CIRCLE);
                this.setPelt(PeltEnum.SKIN);
                break;
            }
            case CreatureSubTypeEnum.HORSE: {
                if (this.sex == SexEnum.MALE) {
                    this.baseWeight = 82;
                    this.baseHeight = 2.0;
                    this.baseWidth = 0.66;
                }
                else {
                    this.baseWeight = 78;
                    this.baseHeight = 1.9;
                    this.baseWidth = 0.63;
                }
                this.size = SizeEnum.MEDIUM;
                this.setPredator(false);
                this.setPaws(PawEnum.HOOF);
                this.setEyeType(EyeEnum.OBLONG);
                this.setPelt(PeltEnum.HAIR);
                break;
            }
            case CreatureSubTypeEnum.MOUSE: {
                if (this.sex == SexEnum.MALE) {
                    this.baseWeight = 0.4;
                    this.baseHeight = 0.16;
                    this.baseWidth = 0.05;
                }
                else {
                    this.baseWeight = 0.4;
                    this.baseHeight = 0.15;
                    this.baseWidth = 0.05;
                }
                this.size = SizeEnum.DIMINUTIVE;
                this.setPredator(false);
                this.setPaws(PawEnum.SKIN);
                this.setEyeType(EyeEnum.CIRCLE);
                this.setPelt(PeltEnum.FUR);
            }
        }
        if (this.age > 19) {
            this.height = this.baseHeight;
        }
        else {
            let ageBasedMultiplier = 0;
            if (this.age > 17) {
                ageBasedMultiplier = .45;
            }
            else if (this.age > 15) {
                ageBasedMultiplier = .35;
            }
            else if (this.age > 13) {
                ageBasedMultiplier = .25;
            }
            else if (this.age > 11) {
                ageBasedMultiplier = .15;
            }
            /* I just bullshitted the weight :v */
            let tempWeight = this.baseWeight*(this.age/25);
            tempWeight = tempWeight + (tempWeight * ageBasedMultiplier);
            if (tempWeight < this.baseWeight/6) {
                this.weight = this.baseHeight/6;
            }
            else if (tempWeight > this.baseWeight) {
                this.weight = this.baseWeight;
            }
            else {
                this.weight = tempWeight;
            }
            let tempHeight = this.baseHeight*(this.age/25);
            tempHeight = tempHeight + (tempHeight * ageBasedMultiplier);
            if (tempHeight < this.baseHeight/6) {
                this.height = this.baseHeight/6;
            }
            else if (tempHeight > this.baseHeight) {
                this.height = this.baseHeight;
            }
            else {
                this.height = tempHeight;
            }
        }
        // Width is 1/3rd(-ish) of height, times the ratio of weight to base weight
        this.width = (this.height / 3.5294) * (this.weight / this.baseWeight);
        switch(this.pawType) {
            case PawEnum.FUR: {
                if (this.held["HAND_R"] == null)
                    this.hold(InstancedWeaponEntity.get("weaponPawInstance"), "HAND_R", false);
                if (this.held["HAND_L"] == null)
                    this.hold(InstancedWeaponEntity.get("weaponPawInstance"), "HAND_L", false);
                break;
            }
            case PawEnum.PAD: {
                if (this.held["HAND_R"] == null)
                    this.hold(InstancedWeaponEntity.get("weaponClawInstance"), "HAND_R", false);
                if (this.held["HAND_L"] == null)
                    this.hold(InstancedWeaponEntity.get("weaponClawInstance"), "HAND_L", false);
                break;
            }
            case PawEnum.HOOF: {
                if (this.held["HAND_R"] == null)
                    this.hold(InstancedWeaponEntity.get("weaponHoofInstance"), "HAND_R", false);
                if (this.held["HAND_L"] == null)
                    this.hold(InstancedWeaponEntity.get("weaponHoofInstance"), "HAND_L", false);
                break;
            }
            case PawEnum.SKIN: {
                if (this.held["HAND_R"] == null)
                    this.hold(InstancedWeaponEntity.get("weaponHandInstance"), "HAND_R", false);
                if (this.held["HAND_L"] == null)
                    this.hold(InstancedWeaponEntity.get("weaponHandInstance"), "HAND_L", false);
                break;
            }
        }
        return 0;
    }

    objectifyMinimal() {
        let obj = super.objectifyMinimal();
        obj["age"] = this.age || 18;
        obj["level"] = this.level || 1;
        obj["stamina"] = this.stamina || 0;
        obj["money"] = this.money || 0;
        obj["size"] = this.size || 0;
        obj["baseWeight"] = this.baseWeight || 0;
        obj["baseHeight"] = this.baseHeight || 0;
        obj["baseWidth"] = this.baseWidth || 0;
        obj["weight"] = this.weight || 0;
        obj["height"] = this.height || 0;
        obj["width"] = this.width || 0;
        obj["equipment"] = AbstractEntity.objectifyProperty(this.equipment);
        obj["held"] = AbstractEntity.objectifyProperty(this.held);
        obj["furColourA"] = this.furColourA;
        obj["_furColourAHex"] = this._furColourAHex;
        obj["furColourB"] = this.furColourB;
        obj["_furColourBHex"] = this._furColourBHex;
        obj["pawType"] = this.pawType;
        obj["eyeType"] = this.eyeType;
        obj["eyeColour"] = this.eyeColour;
        obj["_leftEyeColourHex"] = this._leftEyeColourHex;
        obj["_rightEyeColourHex"] = this._rightEyeColourHex;
        obj["peltType"] = this.peltType;
        return obj;
    }

    /**
     * Overrides CreatureEntity.clone
     * @param  {string} id ID
     * @returns {CharacterEntity} new CharacterEntity
     */
    clone(id = "") {
        let clone = new CharacterEntity(id, this.name, this.description, this.icon, this.creatureType, this.creatureSubType, this.sex, this.age, this.characterClass);
        if (this.hasContainer()) {
            clone.setContainer(this.container.clone(String(clone.id).concat("Container")));
        }
        clone.assign(this);
        return clone;
    }
    /**
     * Characters cannot be instanced. Use clone instead.
     * @param {string} id ID
     */
    createInstance(id = "") {
        return this.clone(id);
    }
    /**
     * Clones the entity's values over this
     * @param {CharacterEntity} entity 
     * @param {boolean} [verify] Set to false to skip verification
     */
    assign(entity, verify = true) {
        if (verify && !(entity instanceof CharacterEntity)) {
            return 2;
        }
        super.assign(entity, verify);
        if (entity.hasOwnProperty("equipment")) {
            for (let equipmentSlot in entity.equipment) {
                if (entity.equipment[equipmentSlot] instanceof InstancedItemEntity) {
                    this.equip(entity.equipment[equipmentSlot].clone(), equipmentSlot);
                }
            }
        }
        if (entity.hasOwnProperty("held")) {
            for (let heldSlot in entity.held) {
                if (entity.held[heldSlot] instanceof InstancedItemEntity) {
                    this.equip(entity.held[heldSlot].clone(), heldSlot);
                }
            }
        }
        // ...
        if (entity.hasOwnProperty("previousEquipment")) this.previousEquipment = Object.assign({}, entity.previousEquipment);
        if (entity.hasOwnProperty("previousHeld")) this.previousHeld = Object.assign({}, entity.previousHeld);
        if (entity.hasOwnProperty("furColourA")) this.furColourA = entity.furColourA;
        if (entity.hasOwnProperty("_furColourAHex")) this._furColourAHex = entity._furColourAHex;
        if (entity.hasOwnProperty("furColourB")) this.furColourB = entity.furColourB;
        if (entity.hasOwnProperty("_furColourBHex")) this._furColourBHex = entity._furColourBHex;
        if (entity.hasOwnProperty("pawType")) this.pawType = entity.pawType;
        if (entity.hasOwnProperty("eyeType")) this.eyeType = entity.eyeType;
        if (entity.hasOwnProperty("eyeColour")) this.eyeColour = entity.eyeColour;
        if (entity.hasOwnProperty("_leftEyeColourHex")) this._leftEyeColourHex = entity._leftEyeColourHex;
        if (entity.hasOwnProperty("_rightEyeColourHex")) this._rightEyeColourHex = entity._rightEyeColourHex;
        if (entity.hasOwnProperty("peltType")) this.peltType = entity.peltType;
        if (entity.hasOwnProperty("characterClasses")) this.characterClasses = Object.assign({}, entity.characterClasses);
        if (entity.hasOwnProperty("primaryCharacterClass")) this.primaryCharacterClass = entity.primaryCharacterClass;
        return 0;
    }
    updateID(newID) {
        super.updateID(newID);
        CharacterEntity.updateID(this.id, newID);
        return 0;
    }
    dispose() {
        this.setLocked(true);
        this.setEnabled(false);
        this.clearClasses();
        CharacterEntity.remove(this.id);
        super.dispose();
        return undefined;
    }
    getClassName() {
        return "CharacterEntity";
    }

    static initialize() {
        CharacterEntity.characterEntityList = {};
    }
    static get(id) {
        if (CharacterEntity.has(id)) {
            return CharacterEntity.characterEntityList[id];
        }
        return 1;
    }
    static has(id) {
        return CharacterEntity.characterEntityList.hasOwnProperty(id);
    }
    static set(id, characterEntity) {
        CharacterEntity.characterEntityList[id] = characterEntity;
        return 0;
    }
    static remove(id) {
        delete CharacterEntity.characterEntityList[id];
        return 0;
    }
    static list() {
        return CharacterEntity.characterEntityList;
    }
    static clear() {
        for (let i in CharacterEntity.characterEntityList) {
            CharacterEntity.characterEntityList[i].dispose();
        }
        CharacterEntity.characterEntityList = {};
        return 0;
    }
    static updateID(oldID, newID) {
        if (!CharacterEntity.has(oldID)) {
            return 1;
        }
        CharacterEntity.set(newID, CharacterEntity.get(oldID));
        CharacterEntity.remove(oldID);
        return 0;
    }
}
CharacterEntity.initialize();