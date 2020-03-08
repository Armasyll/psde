class CharacterEntity extends CreatureEntity {
    /**
     * Creates a CharacterEntity
     * @param  {string} id Unique ID
     * @param  {string} name Name
     * @param  {string} [description] Description
     * @param  {string} [iconID] Icon ID
     * @param  {CreatureTypeEnum} [creatureType] Creature Type
     * @param  {CreatureSubTypeEnum} [creatureSubType] Creature Sub-Type; dependant upon creatureType
     * @param  {SexEnum} [sex] SexEnum
     * @param  {number} [age] Age
     * @param  {CharacterClass} [characterClass] CharacterClass
     */
    constructor(id = "nickWilde", name = "Wilde, Nicholas", description = "", iconID = "genericCharacterIcon", creatureType = CreatureTypeEnum.HUMANOID, creatureSubType = CreatureSubTypeEnum.FOX, sex = SexEnum.MALE, age = 33, characterClass = CharacterClass.get("classless")) {
        super(id, name, description, iconID, creatureType, creatureSubType, sex, age);
        this.entityType = EntityEnum.CHARACTER;
        this.surname = "";
        this.nickname = "";
        this.gender = SexEnum.MALE;
        this.handedness = HandednessEnum.RIGHT;
        /**
         * Attached cosmetics
         * @type {ApparelSlotEnum: [Cosmetics]} Bone ID and Cosmetic
         */
        this.attachedCosmetics = {};
        this.attachedCosmetics[ApparelSlotEnum.HEAD] = [];
        this.attachedCosmetics[ApparelSlotEnum.EAR_L] = [];
        this.attachedCosmetics[ApparelSlotEnum.EAR_R] = [];
        this.attachedCosmetics[ApparelSlotEnum.NECK] = [];
        this.attachedCosmetics[ApparelSlotEnum.SHOULDER_L] = [];
        this.attachedCosmetics[ApparelSlotEnum.SHOULDER_R] = [];
        this.attachedCosmetics[ApparelSlotEnum.FOREARM_L] = [];
        this.attachedCosmetics[ApparelSlotEnum.FOREARM_R] = [];
        this.attachedCosmetics[ApparelSlotEnum.HAND_L] = [];
        this.attachedCosmetics[ApparelSlotEnum.HAND_R] = [];
        this.attachedCosmetics[ApparelSlotEnum.CHEST] = [];
        this.attachedCosmetics[ApparelSlotEnum.PELVIS] = [];
        this.attachedCosmetics[ApparelSlotEnum.LEGS] = [];
        this.attachedCosmetics[ApparelSlotEnum.FOOT_L] = [];
        this.attachedCosmetics[ApparelSlotEnum.FOOT_R] = [];
        /**
         * Equipment
         * @type {<number, AbstractEntity>} Bone ID and AbstractEntity; suppose to be an InstancedItemEntity, but it could be any AbstractEntity :v
         */
        this.equipment = {};
        this.equipment[ApparelSlotEnum.HEAD] = null;
        this.equipment[ApparelSlotEnum.EAR_L] = null;
        this.equipment[ApparelSlotEnum.EAR_R] = null;
        this.equipment[ApparelSlotEnum.NECK] = null;
        this.equipment[ApparelSlotEnum.SHOULDER_L] = null;
        this.equipment[ApparelSlotEnum.SHOULDER_R] = null;
        this.equipment[ApparelSlotEnum.FOREARM_L] = null;
        this.equipment[ApparelSlotEnum.FOREARM_R] = null;
        this.equipment[ApparelSlotEnum.HAND_L] = null;
        this.equipment[ApparelSlotEnum.HAND_R] = null;
        this.equipment[ApparelSlotEnum.CHEST] = null;
        this.equipment[ApparelSlotEnum.PELVIS] = null;
        this.equipment[ApparelSlotEnum.LEGS] = null;
        this.equipment[ApparelSlotEnum.FOOT_L] = null;
        this.equipment[ApparelSlotEnum.FOOT_R] = null;
        this.previousEquipment = Object.assign({}, this.equipment);
        /**
         * Base disposition this CharacterEntity has for others
         * @type {number}  Passion
         * @type {number}  Friendship
         * @type {number}  Playfulness
         * @type {number}  Soulmate
         * @type {number}  Familial
         * @type {number}  Obsession
         * @type {number}  Hate
         */
        this.defaultDisposition = {
            "passion":0,
            "friendship":0,
            "playfulness":0,
            "soulmate":0,
            "familial":0,
            "obsession":0,
            "hate":0
        };
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
         * @type {number} (PawEnum)
         */
        this.pawType = PawEnum.PAD;
        /**
         * Eye type
         * @type {string} (Game.kEyeTypes)
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
         * @type {string} (PeltEnum)
         */
        this.peltType = PeltEnum.FUR;
        /**
         * Characters and this Character's disposition for them
         * @type {object} {CharacterEntity: {string: number}}
         */
        this.characterDisposition = {};
        /**
         * Initial dialogue
         * @type {Dialogue}
         */
        this.dialogue = undefined;

        this.sexualOrientation = SexualOrientationEnum.STRAIGHT;

        /**
         * @type {object} {CharacterClass: number}
         */
        this.characterClasses = {};
        this.primaryCharacterClass = null;

        this.setName(name);
        this.setIcon(iconID);
        this.setClass(characterClass);
        this.setAge(age);
        this.setGender(sex);
        this.addAvailableAction(ActionEnum.ATTACK);
        this.addAvailableAction(ActionEnum.HOLD);
        this.addAvailableAction(ActionEnum.OPEN); // inventory... maybe :v
        this.addAvailableAction(ActionEnum.GIVE);
        this.addAvailableAction(ActionEnum.TAKE);
        this.createInventory();
        this.setClass(characterClass);
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

    getEquipment() {
        return this.equipment;
    }
    equip(instancedItemEntity, equipmentSlot = undefined) {
        /*
        Get an instanced entity out of whatever instancedItemEntity is, otherwise fail
        */
        if (!(instancedItemEntity instanceof AbstractEntity)) {
            if (InstancedItemEntity.has(instancedItemEntity)) {
                instancedItemEntity = InstancedItemEntity.get(instancedItemEntity);
            }
            else {
                return 2;
            }
        }
        if (Game.debugMode) console.log(`Running <CharacterEntity> ${this.id}.equip(${instancedItemEntity.id}, ${equipmentSlot})`);
        /*
        Get an apparel slot out of whatever equipmentSlot is, otherwise fail
         */
        equipmentSlot = Number.parseInt(equipmentSlot);
        if (this.equipment.hasOwnProperty(equipmentSlot)) {}
        else if (ApparelSlotEnum.properties.hasOwnProperty(instancedItemEntity.getEquipmentSlot())) {
            equipmentSlot = instancedItemEntity.getEquipmentSlot();
            if (equipmentSlot == ApparelSlotEnum.HANDS) {
                if (this.handedness == HandednessEnum.LEFT) {
                    if (this.equipment[ApparelSlotEnum.HAND_L] == undefined) {
                        equipmentSlot = ApparelSlotEnum.HAND_L;
                    }
                    else if (this.equipment[ApparelSlotEnum.HAND_R] == undefined) {
                        equipmentSlot = ApparelSlotEnum.HAND_R;
                    }
                    else {
                        equipmentSlot = ApparelSlotEnum.HAND_L;
                    }
                }
                else {
                    if (this.equipment[ApparelSlotEnum.HAND_R] == undefined) {
                        equipmentSlot = ApparelSlotEnum.HAND_R;
                    }
                    else if (this.equipment[ApparelSlotEnum.HAND_L] == undefined) {
                        equipmentSlot = ApparelSlotEnum.HAND_L;
                    }
                    else {
                        equipmentSlot = ApparelSlotEnum.HAND_R;
                    }
                }
            }
            else if (equipmentSlot == ApparelSlotEnum.EARS) {
                if (this.sexualOrientation == SexualOrientationEnum.STRAIGHT || this.sexualOrientation == SexualOrientationEnum.ASEXUAL) {
                    if (this.equipment[ApparelSlotEnum.EAR_L] == undefined) {
                        equipmentSlot = ApparelSlotEnum.EAR_L;
                    }
                    else if (this.equipment[ApparelSlotEnum.EAR_R] == undefined) {
                        equipmentSlot = ApparelSlotEnum.EAR_R;
                    }
                    else {
                        equipmentSlot = ApparelSlotEnum.EAR_L;
                    }
                }
                else {
                    if (this.equipment[ApparelSlotEnum.EAR_R] == undefined) {
                        equipmentSlot = ApparelSlotEnum.EAR_R;
                    }
                    else if (this.equipment[ApparelSlotEnum.EAR_L] == undefined) {
                        equipmentSlot = ApparelSlotEnum.EAR_L;
                    }
                    else {
                        equipmentSlot = ApparelSlotEnum.EAR_R;
                    }
                }
            }
        }
        else {
            if (Game.debugMode) console.log(`\tNo equipment slot was defined.`);
            return 2;
        }
        /*
        Clear out the equipment slot if it's in use, and set its value to _entity
         */
        if (this.equipment[equipmentSlot] == instancedItemEntity.getID()) {}
        else if (InstancedItemEntity.has(this.equipment[equipmentSlot])) {
            this.unequipBySlot(equipmentSlot);
            this.equipment[equipmentSlot] = instancedItemEntity.getID();
        }
        else {
            this.equipment[equipmentSlot] = instancedItemEntity.getID();
        }
        /*
        Flip bits and do tricks
         */
        if (instancedItemEntity instanceof InstancedWeaponEntity && (equipmentSlot == ApparelSlotEnum.HAND_L || equipmentSlot == ApparelSlotEnum.HAND_R)) {
            this.armed = true;
        }
        /*
        If we've got a controller in the world, and it's got an active mesh, attach _entity's mesh to it
         */
        if (this.hasController()) {
            switch (equipmentSlot) {
                case ApparelSlotEnum.HEAD: {
                    this.controller.attachToHead(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.NECK: {
                    this.controller.attachToNeck(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.SHOULDER_L: {
                    this.controller.attachToLeftShoulder(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.SHOULDER_R: {
                    this.controller.attachToRightShoulder(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.FOREARM_L: {
                    this.controller.attachToLeftForearm(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.FOREARM_R: {
                    this.controller.attachToRightForearm(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.HAND_L: {
                    this.controller.attachToLeftHand(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.HAND_R: {
                    this.controller.attachToRightHand(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.CHEST: {
                    this.controller.attachToChest(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.PELVIS: {
                    this.controller.attachToPelvis(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.LEGS: {
                    this.controller.attachToLegs(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.FOOT_L: {
                    this.controller.attachToLeftFoot(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.FOOT_R: {
                    this.controller.attachToRightFoot(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
            }
        }
        return 0;
    }
    unequip(any) {
        if (any instanceof InstancedEntity) {
            return this.unequipByInstancedEntity(any)
        }
        else if (any instanceof Entity) {
            return this.unequipByEntity(any);
        }
        else if (typeof any == "string") {
            if (InstancedEntity.has(any)) {
                return this.unequipByInstancedEntity(InstancedEntity.get(any));
            }
            else if (Entity.has(any)) {
                return this.unequipByEntity(Entity.get(any));
            }
            else if (ApparelSlotEnum.hasOwnProperty(any)) {
                return this.unequipBySlot(ApparelSlotEnum[any]);
            }
        }
        else if (ApparelSlotEnum.properties.hasOwnProperty(any)) {
            return this.unequipBySlot(any);
        }
        return 2;
    }
    unequipByInstancedEntity(instancedEntity, strict = false) {
        for (let slot in this.equipment) {
            if (InstancedEntity.has(this.equipment[slot]) && this.equipment[slot] == instancedEntity.getID()) {
                return this.unequipBySlot(slot);
            }
        }
        if (Game.debugMode) console.log(`\tThe entity (${instancedEntity.id}) was not equipped.`);
        return 0;
    }
    unequipByEntity(entity) {
        for (let slot in this.equipment) {
            if (InstancedEntity.has(this.equipment[slot])) {
                let instancedEntity = InstancedEntity.get(this.equipment[slot]);
                if (instancedEntity.getEntity() == entity) {
                    return this.unequipBySlot(slot);
                }
            }
        }
        if (Game.debugMode) console.log(`\tThe entity (${entity.id}) was not equipped.`);
        return 0;
    }
    unequipBySlot(equipmentSlot) {
        if (this.equipment.hasOwnProperty(equipmentSlot)) {
            equipmentSlot = Number.parseInt(equipmentSlot);
        }
        else if (ApparelSlotEnum.hasOwnProperty(equipmentSlot)) {
            if (equipmentSlot == ApparelSlotEnum.HANDS) {
                this.unequipBySlot(ApparelSlotEnum.HAND_L);
                this.unequipBySlot(ApparelSlotEnum.HAND_R);
                return 0;
            }
            else if (equipmentSlot == ApparelSlotEnum.EARS) {
                this.unequipBySlot(ApparelSlotEnum.EAR_L);
                this.unequipBySlot(ApparelSlotEnum.EAR_R);
            }
            else if (equipmentSlot == ApparelSlotEnum.FINGERS) { // TODO: ugh, this
            }
        }
        else {
            if (Game.debugMode) console.log(`\tNo equipment slot was defined.`);
            return 2;
        }
        if (this.equipment[equipmentSlot] == null) {
            return 0;
        }
        if (!InstancedItemEntity.has(this.equipment[equipmentSlot])) {
            return 1;
        }
        let instancedItemEntity = InstancedItemEntity.get(this.equipment[equipmentSlot]);
        this.equipment[equipmentSlot] = null;
        /*
        Flip bits and do tricks
         */
        if (this.equipment[ApparelSlotEnum.HAND_R] instanceof InstancedWeaponEntity || this.equipment[ApparelSlotEnum.HAND_L] instanceof InstancedWeaponEntity) {
            this.armed = true;
        }
        else {
            this.armed = false;
        }
        if (this.hasController()) {
            switch (equipmentSlot) {
                case ApparelSlotEnum.HEAD: {
                    this.controller.detachFromHead(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.NECK: {
                    this.controller.detachFromNeck(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.SHOULDER_L: {
                    this.controller.detachFromLeftShoulder(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.SHOULDER_R: {
                    this.controller.detachFromRightShoulder(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.FOREARM_L: {
                    this.controller.detachFromLeftForearm(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.FOREARM_R: {
                    this.controller.detachFromRightForearm(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.HAND_L: {
                    this.controller.detachFromLeftHand(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.HAND_R: {
                    this.controller.detachFromRightHand(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.CHEST: {
                    this.controller.detachFromChest(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.PELVIS: {
                    this.controller.detachFromPelvis(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.LEGS: {
                    this.controller.detachFromLegs(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.FOOT_L: {
                    this.controller.detachFromLeftFoot(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
                case ApparelSlotEnum.FOOT_R: {
                    this.controller.detachFromRightFoot(instancedItemEntity.getMeshID(), instancedItemEntity.getTextureID());
                    break;
                }
            }
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
            for (let slot in this.equipment) {
                if (InstancedItemEntity.has(this.equipment[slot])) {
                    let instancedItemEntity = InstancedItemEntity.get(this.equipment[slot]);
                    if (instancedItemEntity.getEntity() == abstractEntity) {
                        return true;
                    }
                }
            }
        }
        else if (abstractEntity instanceof InstancedEntity) {
            for (let slot in this.equipment) {
                if (this.equipment[slot] == abstractEntity.getID()) {
                    return true;
                }
            }
        }
        return false;
    }
    hasHeldItem(abstractEntity) {
        if (!(abstractEntity instanceof AbstractEntity)) {
            if (InstancedItemEntity.has(abstractEntity)) {
                abstractEntity = InstancedItemEntity.get(abstractEntity);
            }
            else {
                return false;
            }
        }
        let slots = {};
        slots[ApparelSlotEnum.HAND_L] = true;
        slots[ApparelSlotEnum.HAND_R] = true;
        if (abstractEntity instanceof Entity) {
            for (let slot in slots) {
                if (InstancedItemEntity.has(this.equipment[slot])) {
                    let instancedItemEntity = InstancedItemEntity.get(this.equipment[slot]);
                    if (instancedItemEntity.getEntity() == abstractEntity) {
                        return true;
                    }
                }
            }
        }
        else if (abstractEntity instanceof InstancedEntity) {
            for (let slot in slots) {
                if (this.equipment[slot] == abstractEntity.getID()) {
                    return true;
                }
            }
        }
        return false;
    }
    getAttachedCosmetics(_bone = undefined) {
        if (_bone instanceof BABYLON.Bone) {
            _bone = _bone.id;
        }
        if (this.attachedCosmetics.has(_bone)) {
            return this.attachedCosmetics[_bone];
        }
        return this.attachedCosmetics;
    }
    attachCosmetic(cosmetic, slot) {
        if (!(cosmetic instanceof Cosmetic)) {
            cosmetic = Cosmetic.get(cosmetic);
            if (!(cosmetic instanceof Cosmetic)) {
                return 2;
            }
        }
        if (this.attachedCosmetics.hasOwnProperty(slot)) {}
        else if (slot instanceof BABYLON.Bone && ApparelSlotEnum.hasOwnProperty(slot.id)) {
            slot = ApparelSlotEnum[slot.id];
        }
        else if (ApparelSlotEnum.hasOwnProperty(slot)) {
            slot = ApparelSlotEnum[slot];
        }
        else {
            return 2;
        }
        if (!this.attachedCosmetics.hasOwnProperty(slot)) {
            return 2;
        }
        this.attachedCosmetics[slot][cosmetic.id] = cosmetic;
        if (this.hasController()) {
            switch (slot) {
                case ApparelSlotEnum.HEAD: {
                    this.controller.attachToHead(cosmetic.getMeshID(), cosmetic.getMaterialID());
                    break;
                }
            }
        }
        return 0;
    }
    detachCosmetic(cosmetic, slot = undefined) {
        if (!(cosmetic instanceof Cosmetic)) {
            cosmetic = Cosmetic.get(cosmetic);
            if (!(cosmetic instanceof Cosmetic)) {
                return 2;
            }
        }
        if (this.attachedCosmetics.hasOwnProperty(slot)) {}
        else if (slot instanceof BABYLON.Bone && ApparelSlotEnum.hasOwnProperty(slot.id)) {
            slot = ApparelSlotEnum[slot.id];
        }
        else if (ApparelSlotEnum.hasOwnProperty(slot)) {
            slot = ApparelSlotEnum[slot];
        }
        else {
            return 2;
        }
        delete this.attachedCosmetics[slot][cosmetic.id];
        if (this.hasController()) { // TODO: is this right?
            this.controller.detachMeshFromBone(cosmetic.getMeshID());
        }
        return 0;
    }

    /**
     * Removes an InstancedItemEntity from this entity's Item array
     * @override
     * @param  {InstancedItemEntity} instancedItemEntity InstancedItemEntity, or ItemEntity, to be removed
     * @return {this}
     */
    removeItem(instancedItemEntity) {
        if (!this.hasInventory()) {
            return 1;
        }
        if (!(instancedItemEntity instanceof InstancedItemEntity)) {
            if (InstancedItemEntity.has(instancedItemEntity)) {
                instancedItemEntity = InstancedItemEntity.get(instancedItemEntity);
            }
            else {
                return false;
            }
        }
        this.unequip(instancedItemEntity);
        super.removeItem(instancedItemEntity);
        return 0;
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
    setCharacterPassion(_character, number) {
        return this.characterDisposition[_character]["passion"] = number;
    }
    getCharacterPassion(_character) {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.characterDisposition[_character]["passion"];
    }
    setCharacterFriendship(_character, number) {
        return this.characterDisposition[_character]["friendship"] = number;
    }
    getCharacterFriendship(_character) {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.characterDisposition[_character]["friendship"];
    }
    setCharacterPlayfulness(_character, number) {
        return this.characterDisposition[_character]["playfulness"] = number;
    }
    getCharacterPlayfulness(_character) {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.characterDisposition[_character]["playfulness"];
    }
    setCharacterSoulmate(_character, number) {
        return this.characterDisposition[_character]["soulmate"] = number;
    }
    getCharacterSoulmate(_character) {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.characterDisposition[_character]["soulmate"];
    }
    setCharacterFamilial(_character, number) {
        return this.characterDisposition[_character]["familial"] = number;
    }
    getCharacterFamilial(_character) {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.characterDisposition[_character]["familial"];
    }
    setCharacterObsession(_character, number) {
        return this.characterDisposition[_character]["obsession"] = number;
    }
    getCharacterObsession(_character) {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.characterDisposition[_character]["obsession"];
    }
    setCharacterHate(_character, number) {
        return this.characterDisposition[_character]["hate"] = number;
    }
    getCharacterHate(_character) {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER; // SO MUCH HATE >:VVVVV
        }
        return this.characterDisposition[_character]["hate"];
    }
    getCharacterDisposition(characterID) {
        if (Game.enableDebug) console.log("Running getCharacterDisposition");
        if (!(CharacterEntity.has(characterID))) {
            return 2;
        }
        if (this.hasCharacterDisposition(characterID)) {
            return this.characterDisposition[characterID];
        }
        else {
            return {
                "passion":0,
                "friendship":0,
                "playfulness":0,
                "soulmate":0,
                "familial":0,
                "obsession":0,
                "hate":0
            };
        }
    }
    hasCharacterDisposition(characterID) {
        if (this.getGodMode()) {
            return true;
        }
        return this.characterDisposition.hasOwnProperty(characterID);
    }
    getCharacterDispositions() {
        return this.characterDisposition;
    }
    hasMet(characterID) {
        return this.hasCharacterDisposition(characterID);
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
    getMainWeapon() {
        if (this.isRightHanded()) {
            return this.equipment[ApparelSlotEnum.HAND_R];
        }
        else {
            return this.equipment[ApparelSlotEnum.HAND_R];
        }
    }
    getSubWeapon() {
        if (this.isRightHanded()) {
            return this.equipment[ApparelSlotEnum.HAND_L];
        }
        else {
            return this.equipment[ApparelSlotEnum.HAND_R];
        }
    }

    hold(_instancedItem, _hand) { // TODO: Separate holding an item from equipping an item to the hand; wearing gloves while holding a cup (or sword :v)
        if (_hand != ApparelSlotEnum.HAND_L && _hand != ApparelSlotEnum.HAND_R) {
            if (this.handedness == HandednessEnum.LEFT) {
                _hand = ApparelSlotEnum.HAND_L;
            }
            else {
                _hand = ApparelSlotEnum.HAND_R;
            }
        }
        return this.equip(_instancedItem, _hand);
    }
    // TODO: remove this
    release(_instancedItemEntity, _hand = undefined) {
        return this.unequip(_instancedItemEntity);
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
        this._leftEyeColourHex = Game.Tools.colourNameToHex(colour.replace(/[^a-z]/g, ""));
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
        this._furColourAHex = Game.Tools.colourNameToHex(colour.replace(/[^a-z]/g, ""));
        return 0;
    }
    setFurColourB(colour = "cream") {
        this.furColourB = colour;
        this._furColourBHex = Game.Tools.colourNameToHex(colour.replace(/[^a-z]/g, ""));
        return 0;
    }
    setFurColour(colourA, colourB = undefined) {
        if (typeof colourB == 'undefined')
            colourB = colourA;
        
        this.setFurColourA(colourA);
        this.setFurColourB(colourB);
        return 0;
    }
    /**
     * Adds a new disposition this character has for the specified character, by their ID.
     * @param {string} characterEntity Character ID
     * @param {number} [passionModifier] 
     * @param {number} [friendshipModifier] 
     * @param {number} [playfulnessModifier] 
     * @param {number} [soulmateModifier] 
     * @param {number} [familialModifier] 
     * @param {number} [obsessionModifier] 
     * @param {number} [hateModifier] 
     */
    addNewDisposition(characterEntity, passionModifier = 0, friendshipModifier = 0, playfulnessModifier = 0, soulmateModifier = 0, familialModifier = 0, obsessionModifier = 0, hateModifier = 0) {
        if (characterEntity instanceof CharacterEntity) {
            characterEntity = characterEntity.getID();
        }
        this.characterDisposition[characterEntity]["passion"] = passionModifier + this.defaultDisposition["passion"];
        this.characterDisposition[characterEntity]["friendship"] = friendshipModifier + this.defaultDisposition["friendship"];
        this.characterDisposition[characterEntity]["playfulness"] = playfulnessModifier + this.defaultDisposition["playfulness"];
        this.characterDisposition[characterEntity]["soulmate"] = soulmateModifier + this.defaultDisposition["soulmate"];
        this.characterDisposition[characterEntity]["familial"] = familialModifier + this.defaultDisposition["familial"];
        this.characterDisposition[characterEntity]["obsession"] = obsessionModifier + this.defaultDisposition["obsession"];
        this.characterDisposition[characterEntity]["hate"] = hateModifier + this.defaultDisposition["hate"];
        return 0;
    }

    hasDialogue() {
        return this.dialogue instanceof Dialogue;
    }
    setDialogue(dialogue) {
        dialogue = Dialogue.get(dialogue);
        if (dialogue instanceof Dialogue) {
            this.dialogue = dialogue;
            this.addAvailableAction(ActionEnum.TALK);
            this.setDefaultAction(ActionEnum.TALK);
        }
        return 0;
    }
    removeDialogue() {
        this.dialogue = undefined;
        this.removeAvailableAction(ActionEnum.TALK);
        this.setDefaultAction(ActionEnum.LOOK);
        return 0;
    }
    getDialogue() {
        return this.dialogue;
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
            level = Game.Tools.filterInteger(level);
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

    resetModifiers() {
        super.resetModifiers();
        return 0;
    }
    /**
     * Generates protections and multipliers; to be run after status effects and equipment are changed
     */
    generateAdditionalStats() {
        this.armourClass = 0;
        for (let slot in this.equipment) {
            if (this.equipment[slot] instanceof InstancedEquipmentEntity) {
                let multiplier = 0.1;
                switch (this.equipment[slot].getEquipmentSlot()) {
                    case ApparelSlotEnum.CHEST: {
                        multiplier = 0.3;
                        break;
                    }
                    case ApparelSlotEnum.HAND_L:
                    case ApparelSlotEnum.HAND_R:
                    case ApparelSlotEnum.HANDS: {
                        multiplier = 0.05;
                    }                      
                }
                let modifier = Game.calculateAbilityModifier(this.getDexterity() - 10);
                switch (this.equipment[slot].getArmourType()) {
                    case ArmourEnum.PADDED:
                    case ArmourEnum.LEATHER:
                    case ArmourEnum.STUDDEDLEATHER: {
                        modifier = Game.calculateAbilityModifier(this.getDexterity());
                        break;
                    }
                    case ArmourEnum.HIDE:
                    case ArmourEnum.CHAINSHIRT:
                    case ArmourEnum.SCALEMAIL:
                    case ArmourEnum.BREASTPLATE:
                    case ArmourEnum.HALFPLATE: {
                        modifier = Game.calculateAbilityModifier(this.getDexterity());
                        if (modifier > 2) {
                            modifier = 2;
                        }
                        break;
                    }
                }
                this.armourClass += this.equipment[slot].getArmourClass() + (modifier * multiplier);
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
                this.predator = true;
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
                this.predator = false;
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
                this.predator = true;
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
                this.predator = true;
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
                this.predator = true;
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
                this.predator = true;
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
                this.predator = false;
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
                this.predator = false;
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
                this.predator = true;
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
                this.predator = true;
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
                this.predator = true;
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
                this.predator = false;
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
                this.predator = false;
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
                this.predator = false;
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
                this.predator = false;
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
        return 0;
    }

    /**
     * Overrides CreatureEntity.clone
     * @param  {string} id ID
     * @return {CharacterEntity} new CharacterEntity
     */
    clone(id = undefined) {
        let clone = new CharacterEntity(id, this.name, this.description, this.icon, this.creatureType, this.creatureSubType, this.sex, this.age, this.characterClass);
        if (this.hasInventory()) {
            clone.setInventory(this.inventory.clone(String(id).concat("Inventory")));
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
        this.gender = entity.gender;
        this.handedness = entity.handedness;
        for (let apparelSlot in entity.attachedCosmetics) {
            if (entity.attachedCosmetics[apparelSlot].length > 0) {
                entity.attachedCosmetics[apparelSlot].forEach((cosmetic) => {
                    this.attachCosmetic(cosmetic);
                });
            }
        }
        for (let i in entity.equipment) {
            let equipment = AbstractEntity.get(entity.equipment[i]);
            if (equipment instanceof AbstractEntity) {
                this.equipment[i] = equipment.clone();
            }
        }
        // ...
        this.previousEquipment = Object.assign({}, entity.previousEquipment);
        this.defaultDisposition = Object.assign({}, entity.defaultDisposition);
        this.furColourA = entity.furColourA;
        this._furColourAHex = entity._furColourAHex;
        this.furColourB = entity.furColourB;
        this._furColourBHex = entity._furColourBHex;
        this.pawType = entity.pawType;
        this.eyeType = entity.eyeType;
        this.eyeColour = entity.eyeColour;
        this._leftEyeColourHex = entity._leftEyeColourHex;
        this._rightEyeColourHex = entity._rightEyeColourHex;
        this.peltType = entity.peltType;
        this.characterDisposition = Object.assign({}, entity.characterDisposition);
        this.dialogue = entity.dialogue;
        this.sexualOrientation = entity.sexualOrientation;
        this.characterClasses = Object.assign({}, entity.characterClasses);
        this.primaryCharacterClass = entity.primaryCharacterClass;
        return 0;
    }
    dispose() {
        if (this == Game.player) {
            return false;
        }
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
}
CharacterEntity.initialize();