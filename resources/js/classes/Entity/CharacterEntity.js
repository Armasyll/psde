class CharacterEntity extends EntityWithStorage {
    /**
     * Creates a CharacterEntity
     * @param  {string} id Unique ID
     * @param  {string} name Name
     * @param  {string} [description] Description
     * @param  {string} [iconID] Icon ID
     * @param  {CharacterClassEnum} [characterClass] CharacterClassEnum
     * @param  {number} [age] Age
     * @param  {SexEnum} [sex] SexEnum
     * @param  {SpeciesEnum} [species] SpeciesEnum
     */
    constructor(id = "nickWilde", name = "Wilde, Nicholas", description = "", iconID = "genericCharacterIcon", characterClass = CharacterClassEnum.CLASSLESS, age = 33, sex = SexEnum.MALE, species = SpeciesEnum.FOX) {
        super(id);
        this.entityType = EntityEnum.CHARACTER;
        this.name = "";
        this.surname = "";
        this.nickname = "";
        this.characterClass = CharacterClassEnum.CLASSLESS;
        this.age = 18;
        this.sex = SexEnum.MALE;
        this.gender = SexEnum.MALE;
        this.currentActions = {};
        this.stance = ActionEnum.STAND;
        this.cantripsKnown = new Set();
        this.cantripsKnownLimit = 0;
        this.spellsKnown = new Set();
        this.spellsKnownLimit = 0;
        this.spellSlots = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0};
        this.spellSlotsUsed = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0};
        this.handedness = HandednessEnum.RIGHT;
        /**
         * Attached cosmetics
         * @type {<number, [Cosmetics]>} Bone ID and Cosmetic
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
            passion:new BoundedNumber(0, 0, 100),
            friendship:new BoundedNumber(0, 0, 100),
            playfulness:new BoundedNumber(0, 0, 100),
            soulmate:new BoundedNumber(0, 0, 100),
            familial:new BoundedNumber(0, 0, 100),
            obsession:new BoundedNumber(0, 0, 100),
            hate:new BoundedNumber(0, 0, 100)
        };
        /**
         * Hunger; may affect health regeneration
         * @type {number} 0 to 100
         */
        this.hunger = 0;
        this.hungerOffset = 0;
        /**
         * Physical power
         * @type {number}
         */
        this.strength = 10;
        this.strengthOffset = 0;
        /**
         * Agility
         * @type {number}
         */
        this.dexterity = 10;
        this.dexterityOffset = 0;
        /**
         * Endurance
         * @type {number}
         */
        this.constitution = 10;
        this.constitutionOffset = 0;
        /**
         * Reasoning and memory
         * @type {number}
         */
        this.intelligence = 10;
        this.intelligenceOffset = 0;
        /**
         * Perception and insight
         * @type {number}
         */
        this.wisdom = 10;
        this.wisdomOffset = 0;
        /**
         * Force of personality
         * @type {number}
         */
        this.charisma = 10;
        this.charismaOffset = 0;

        this.armourClass = 0;

        this.experienceLevel = 0;
        this.experiencePoints = 0;
        this.nonLethalDamage = 0;
        /**
         * Money
         * @type {number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.money = 0;
        /**
         * Living; updated by this.setHealth()
         * @type {boolean} True - alive, false - dead
         */
        this.living = true;
        this.conscious = true;
        this.paralyzed = false;
        /**
         * Size
         * @type {SizeEnum}
         */
        this.size = SizeEnum.MEDIUM;
        this.armed = false;
        this.armedOffset = false;
        /**
         * Primary fur colour
         * @type {string}
         */
        this.furColourA = "orange";
        /**
         * Primary fur colour hex value
         * @type {string}
         */
        this.furColourAHex = undefined;
        /**
         * Sexondary fur colour
         * @type {string}
         */
        this.furColourB = "cream";
        /**
         * Secondary fur colour hex value
         * @type {string}
         */
        this.furColourBHex = undefined;
        /**
         * Average weight, in kilograms, of parent species; updated by this.generateProperties()
         * @type {number}
         */
        this.baseWeight = 36;
        /**
         * Average height, in metres, of parent species; updated by this.generateProperties()
         * @type {number}
         */
        this.baseHeight = 1.20;
        /**
         * Average width, in metres, of parent species; updated by this.generateProperties()
         * @type {number}
         */
        this.baseWidth = 0.4;
        /**
         * Weight, in kilograms; updated by this.generateProperties()
         * @type {number}
         */
        this.weight = 0;
        /**
         * Height, in mtres; updated by this.generateProperties()
         * @type {number}
         */
        this.height = 1.2;
        /**
         * Width, in metres; updated by this.generateProperties()
         * @type {number}
         */
        this.width = 0.34;
        /**
         * Whether or not this CharacterEntity is a predator
         * @type {boolean} True - predator, false - prey
         */
        this.predator = false;
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
        /**
         * Pelt type
         * @type {string} (PeltEnum)
         */
        this.peltType = PeltEnum.FUR;
        /**
         * Map of Characters and this Character's disposition for them
         * @type {Map} <Character, Object>
         * 
         * @type {number}  Passion
         * @type {number}  Friendship
         * @type {number}  Playfulness
         * @type {number}  Souldmate
         * @type {number}  Familial
         * @type {number}  Obsession
         * @type {number}  Hate
         */
        this.characterDisposition = {};
        /**
         * Initial dialogue
         * @type {Dialogue}
         */
        this.dialogue = undefined;

        this.furniture = null;

        this.sexualOrientation = SexualOrientationEnum.STRAIGHT;

        this.proficiencies = new Set();
        this.proficiencyOffset = 0;

        this.setName(name);
        this.setIcon(iconID);
        this.setClass(characterClass);
        this.setAge(age);
        this.setSex(sex);
        this.setGender(sex);
        this.setSpecies(species);
        this.addAvailableAction(ActionEnum.ATTACK);
        this.addAvailableAction(ActionEnum.HOLD);
        this.addAvailableAction(ActionEnum.OPEN); // inventory... maybe :v
        this.addAvailableAction(ActionEnum.GIVE);
        this.addAvailableAction(ActionEnum.TAKE);
        this.generateProperties();
        this.generateBaseStats(true);
        this.generateAdditionalStats();
        Game.setCharacterEntity(this.id, this);
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
        return this;
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

    setClass(characterClass) {
        if (CharacterClassEnum.properties.hasOwnProperty(characterClass)) {
            this.characterClass = characterClass;
            return 0;
        }
        return 2;
    }
    getClass() {
        return this.characterClass;
    }

    getEquipment() {
        return this.equipment;
    }
    equip(instancedItemEntity, equipmentSlot = undefined) {
        /*
        Get an instanced entity out of whatever instancedItemEntity is, otherwise fail
        */
        if (!(instancedItemEntity instanceof AbstractEntity)) {
            if (Game.hasInstancedItemEntity(instancedItemEntity)) {
                instancedItemEntity = Game.getInstancedItemEntity(instancedItemEntity);
            }
            else {
                return 2;
            }
        }
        if (Game.debugMode) console.log(`Running <CharacterEntity> ${this.id}.equip(${instancedItemEntity.id}, ${equipmentSlot})`);
        /*
        Get an apparel slot out of whatever _equipmentSlot is, otherwise fail
         */
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
            else {
                return 1;
            }
        }
        else {
            if (Game.debugMode) console.log(`\tNo equipment slot was defined.`);
            return 2;
        }
        /*
        Clear out the equipment slot if it's in use, and set its value to _entity
         */
        if (this.equipment[equipmentSlot] == instancedItemEntity) {}
        else if (this.equipment[equipmentSlot] instanceof AbstractEntity) {
            this.unequipBySlot(equipmentSlot);
            this.equipment[equipmentSlot] = instancedItemEntity;
        }
        else {
            this.equipment[equipmentSlot] = instancedItemEntity;
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
    unequip(_blob) {
        if (_blob instanceof InstancedEntity) {
            return this.unequipByInstancedEntity(_blob)
        }
        else if (_blob instanceof Entity) {
            return this.unequipByEntity(_blob);
        }
        else if (typeof _blob == "string") {
            if (Game.hasInstancedEntity(_blob)) {
                return this.unequipByInstancedEntity(Game.getInstancedEntity(_blob));
            }
            else if (Game.hasEntity(_blob)) {
                return this.unequipByEntity(Game.getEntity(_blob));
            }
            else if (ApparelSlotEnum.hasOwnProperty(_blob)) {
                return this.unequipBySlot(ApparelSlotEnum[_blob]);
            }
        }
        else if (ApparelSlotEnum.properties.hasOwnProperty(_blob)) {
            return this.unequipBySlot(_blob);
        }
        return 2;
    }
    unequipByInstancedEntity(instancedEntity, strict = false) {
        for (let slot in this.equipment) {
            if (this.equipment[slot] instanceof AbstractEntity && this.equipment[slot] == instancedEntity) {
                return this.unequipBySlot(slot);
            }
        }
        if (Game.debugMode) console.log(`\tThe entity (${instancedEntity.id}) was not equipped.`);
        return 0;
    }
    unequipByEntity(entity) {
        for (let slot in this.equipment) {
            if (this.equipment[slot] instanceof AbstractEntity && this.equipment[slot].getEntity() == entity) {
                return this.unequipBySlot(slot);
            }
        }
        if (Game.debugMode) console.log(`\tThe entity (${entity.id}) was not equipped.`);
        return 0;
    }
    unequipBySlot(equipmentSlot) {
        if (this.equipment.hasOwnProperty(equipmentSlot)) {}
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
        if (this.equipment[equipmentSlot]) {
            return 0;
        }
        let instancedItemEntity = this.equipment[equipmentSlot];
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
        if (instancedItemEntity instanceof AbstractEntity && this.hasController()) {
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
            let _tempEntity = Game.getInstancedItemEntity(abstractEntity);
            if (!(_tempEntity instanceof InstancedItemEntity)) {
                _tempEntity = Game.getItemEntity(abstractEntity);
                if (!(_tempEntity instanceof ItemEntity)) {
                    return null;
                }
            }
            abstractEntity = _tempEntity;
        }
        if (abstractEntity instanceof Entity) {
            for (let equipmentSlot in this.equipment) {
                if (this.equipment[equipmentSlot] instanceof AbstractEntity && this.equipment[equipmentSlot].getEntity() == abstractEntity) {
                    return true;
                }
            }
        }
        else if (abstractEntity instanceof InstancedEntity) {
            for (let equipmentSlot in this.equipment) {
                if (this.equipment[equipmentSlot] instanceof AbstractEntity && this.equipment[equipmentSlot] == abstractEntity) {
                    return true;
                }
            }
        }
        return false;
    }
    hasHeldItem(abstractEntity) {
        if (!(abstractEntity instanceof AbstractEntity)) {
            let _tempEntity = Game.getInstancedItemEntity(abstractEntity);
            if (!(_tempEntity instanceof InstancedItemEntity)) {
                _tempEntity = Game.getItemEntity(abstractEntity);
                if (!(_tempEntity instanceof ItemEntity)) {
                    return null;
                }
            }
            abstractEntity = _tempEntity;
        }
        if (abstractEntity instanceof InstancedEntity) {
            if (this.equipment[ApparelSlotEnum.HAND_L] == abstractEntity || this.equipment[ApparelSlotEnum.HAND_R] == abstractEntity) {
                return true;
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
            cosmetic = Game.getCosmetic(cosmetic);
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
            cosmetic = Game.getCosmetic(cosmetic);
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
     * @override super.removeItem
     * @param  {InstancedItemEntity} _abstractEntity InstancedItemEntity, or ItemEntity, to be removed
     * @return {this}
     */
    removeItem(_abstractEntity) {
        if (_abstractEntity instanceof AbstractEntity) {
            this.unequipByInstancedEntity(_abstractEntity);
            return super.removeItem(_abstractEntity);
        }
        let _instancedItem = Game.getInstancedItemEntity(_abstractEntity);
        if (_instancedItem instanceof InstancedItemEntity) {
            return this.removeItem(_instancedItem);
        }
        _instancedItem = Game.getItemEntity(_abstractEntity);
        if (_instancedItem instanceof ItemEntity) {
            return this.removeItem(_instancedItem);
        }
        if (Game.debugMode) console.log(`Failed to remove item ${_abstractEntity} to ${this.id}`);
        return 1;
    }

    setAge(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.age = number;
        return this;
    }
    addAge(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        return this.age += number;
    }
    getAge() {
        return this.age;
    }

    setHunger(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 0;}
        else {number = number|0}
        this.hunger = number;
        return this;
    }
    addHunger(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.hunger -= number;
        return this;
    }
    subtractHunger(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.hunger -= number;
        return this;
    }
    getHunger() {
        return this.hunger + this.hungerOffset;
    }

    setStrength(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 1;}
        else {number = number|0}
        this.strength = number;
        return this;
    }
    addStrength(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.strength += number;
        return this;
    }
    subtractStrength(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.strength -= number;
        return this;
    }
    getStrength() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.strength + this.strengthOffset;
    }
    setDexterity(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 1;}
        else {number = number|0}
        this.dexterity = number;
        return this;
    }
    addDexterity(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.dexterity += number;
        return this;
    }
    subtractDexterity(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.dexterity -= number;
        return this;
    }
    getDexterity() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.dexterity + this.dexterityOffset;
    }
    setConstitution(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 1;}
        else {number = number|0}
        this.constitution = number;
        return this;
    }
    addConstitution(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.constitution += number;
        return this;
    }
    subtractConstitution(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.constitution -= number;
        return this;
    }
    getConstitution() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.constitution + this.constitutionOffset;
    }
    setIntelligence(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 1;}
        else {number = number|0}
        this.intelligence = number;
        return this;
    }
    addIntelligence(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.intelligence += number;
        return this;
    }
    subtractIntelligence(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.intelligence -= number;
        return this;
    }
    getIntelligence() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.intelligence + this.intelligenceOffset;
    }
    setWisdom(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 1;}
        else {number = number|0}
        this.wisdom = number
        return this;
    }
    addWisdom(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.wisdom += number;
        return this;
    }
    subtractWisdom(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.wisdom -= number;
        return this;
    }
    getWisdom() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.wisdom + this.wisdomOffset;
    }
    setCharisma(number) {
        if (typeof number != "number") {number = Math.abs(Number.parseInt(number)) | 1;}
        else {number = number|0}
        this.charisma = number;
        return this;
    }
    addCharisma(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.charisma += number;
        return this;
    }
    subtractCharisma(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.charisma -= number;
        return this;
    }
    getCharisma() {
        if (this.getGodMode()) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.charisma + this.charismaOffset;
    }
    /**
     * Sets CharacterEntity ability scores
     * @param {number} strength Strength, physical power
     * @param {number} dexterity Dexterity, agility
     * @param {number} constitution Constitution, endurance
     * @param {number} intelligence Intelligence, reasoning and memory
     * @param {number} wisdom Wisdom, perception and insight
     * @param {number} charisma Charisma, force of personality
     */
    setAbilityScores(strength = 10, dexterity = 10, intelligence = 10, constitution = 10, wisdom = 12, charisma = 10) {
        this.setStrength(strength);
        this.setDexterity(dexterity);
        this.setConstitution(constitution);
        this.setIntelligence(intelligence);
        this.setWisdom(wisdom);
        this.setCharisma(charisma);
        return this;
    }
    getAbilityScores() {
        return {
            strength: this.strength,
            dexterity: this.dexterity,
            constitution: this.constitution,
            intelligence: this.intelligence,
            wisdom: this.wisdom,
            charisma: this.charisma
        };
    }

    getLevel() {
        return this.level;
    }
    setXP(number = 0) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.experiencePoints = number;
        this.level = Game.calculateLevel(this.experiencePoints);
        return this;
    }
    addXP(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (number > 0) {
            this.setXP(this.experiencePoints + number);
        }
        return this;
    }
    subtractXP(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (number > 0) {
            this.setXP(this.experiencePoints - number);
        }
        return this;
    }
    getXP() {
        return this.experiencePoints;
    }

    setNonLethalDamage(number = 0) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (this.getGodMode()) {
            this.nonLethalDamage = 0;
            return this;
        }
        this.nonLethalDamage = number;
        if (this.getNonLethalDamage() > this.getHealth()) {
            this.conscious = false;
            if (this.hasController()) {
                this.setStance(StanceEnum.LAY);
                this.controller.doLay();
            }
        }
        return this;
    }
    addNonLethalDamage(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        return this.setNonLethalDamage(this.nonLethalDamage + number);
    }
    subtractNonLethalDamage(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        return this.setNonLethalDamage(this.nonLethalDamage - number);
    }
    getNonLethalDamage() {
        return this.nonLethalDamage;
    }

    setMoney(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        this.money = number;
        return this;
    }
    addMoney(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        return this.setMoney(this.money + number);
    }
    subtractMoney(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        return this.setMoney(this.money - number);
    }
    getMoney() {
        return this.money;
    }

    setSex(sex = SexEnum.MALE) {
        if (SexEnum.properties.hasOwnProperty(sex)) {
            this.sex = sex;
            return 0;
        }
        return 2;
    }
    getSex() {
        return this.sex;
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

    setDefaultDisposition(_passion = 0, _friendship = 0, _playfulness = 0, _soulmate = 0, _familial = 0, _obsession = 0, _hate = 0) {
        if (!(this.defaultDisposition instanceof Object))
            this.defaultDisposition = {passion:0,friendship:0,playfulness:0,soulmate:0,familial:0,obsession:0,hate:0};
        else if (_passion instanceof Object) {
            this.defaultDisposition = {
                passion:(Number.parseInt(_passion.passion) || 0),
                friendship:(Number.parseInt(_passion.friendship) || 0),
                playfulness:(Number.parseInt(_passion.playfulness) || 0),
                soulmate:(Number.parseInt(_passion.soulmate) || 0),
                familial:(Number.parseInt(_passion.familial) || 0),
                obsession:(Number.parseInt(_passion.obsession) || 0),
                hate:(Number.parseInt(_passion.hate) || 0)
            };
        }
        else if (isNaN(_passion) && this.defaultDisposition.hasOwnProperty(_passion) && typeof Number.parseInt(_friendship) == "number")
            this.defaultDisposition[_passion] = Number.parseInt(_friendship);
        else {
            this.defaultDisposition = {
                passion:(Number.parseInt(_passion) || this.defaultDisposition.passion),
                friendship:(Number.parseInt(_friendship) || this.defaultDisposition.friendship),
                playfulness:(Number.parseInt(_playfulness) || this.defaultDisposition.playfulness),
                soulmate:(Number.parseInt(_soulmate) || this.defaultDisposition.soulmate),
                familial:(Number.parseInt(_familial) || this.defaultDisposition.familial),
                obsession:(Number.parseInt(_obsession) || this.defaultDisposition.obsession),
                hate:(Number.parseInt(_hate) || this.defaultDisposition.hate)
            };
        }

        return this;
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
        if (!(Game.hasCharacterEntity(characterID))) {
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

    setStance(stance = ActionEnum.STAND) {
        if (this.stance == stance) {
            return 0;
        }
        if (ActionEnum.properties.hasOwnProperty(stance)) {
            this.stance = stance;
            if (this.hasController()) {
                if (this.stance == ActionEnum.LAY) {
                    this.controller.setIdleAnim("90_idleLyingDown01", 1, true);
                }
                else if (this.stance == ActionEnum.SIT) {
                    if (this.hasFurniture()) {
                        this.controller.setIdleAnim("90_idleSittingDown01", 1, true);
                    }
                    else {
                        this.controller.setIdleAnim("90_idleSittingOnGround01", 1, true);
                    }
                }
                else if (this.stance == ActionEnum.STAND) {
                    this.controller.setIdleAnim("90_idle01", 1, true);
                }
            }
            return 0;
        }
        return 2;
    }
    getStance() {
    	return this.stance;
    }
    isCrouching() {
        return this.stance == ActionEnum.CROUCH;
    }
    isLying() {
        return this.stance == ActionEnum.LAY;
    }
    isSleeping() {
        return this.sleeping == true;
    }
    isSitting() {
        return this.stance == ActionEnum.SIT;
    }
    isStanding() {
        return this.stance == ActionEnum.STAND;
    }
    isFlying() {
        return this.stance == ActionEnum.FLY;
    }

    setPaws(pawEnum = PawEnum.PAD) {
        if (PawEnum.properties.hasOwnProperty(pawEnum)) {
            this.pawType = pawEnum;
        }
        else {
            this.pawType = PawEnum.PAD;
        }
        return this;
    }

    setEyeType(eyeEnum = EyeEnum.CIRCLE) {
        if (EyeEnum.properties.hasOwnProperty(eyeEnum)) {
            this.eyeType = eyeEnum;
        }
        else {
            this.eyeType = EyeEnum.CIRCLE;
        }
        return this;
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
        this.eyeColourHex = Game.Tools.colourNameToHex(colour.replace(/[^a-z]/g, ""));
        return this;
    }
    getEyeColour() {
        return this.eyeColour;
    }
    setEyeColourHex(number) {
        this.eyeColourHex = number;
        return this;
    }

    setPelt(peltEnum = PeltEnum.FUR) {
        if (PeltEnum.properties.hasOwnProperty(peltEnum)) {
            this.peltType = peltEnum;
        }
        else {
            this.peltType = PeltEnum.FUR;
        }
        return this;
    }
    setFurColourA(colour = "red") {
        this.furColourA = colour;
        this.furColourAHex = Game.Tools.colourNameToHex(colour.replace(/[^a-z]/g, ""));
        return this;
    }
    setFurColourB(colour = "cream") {
        this.furColourB = colour;
        this.furColourBHex = Game.Tools.colourNameToHex(colour.replace(/[^a-z]/g, ""));
        return this;
    }
    setFurColour(colourA, colourB = undefined) {
        if (typeof colourB == 'undefined')
            colourB = colourA;
        
        this.setFurColourA(colourA);
        this.setFurColourB(colourB);
        return this;
    }
    setFurColourAHex(number) {
        this.furColourAHex = number;
        return this;
    }
    setFurColourBHex(number) {
        this.furColourBHex = number;
        return this;
    }
    setFurColourHex(colourA, colourB = undefined) {
        if (typeof colourB == 'undefined')
            colourB = colourA;
        
        this.setFurColourAHex(colourA);
        this.setFurColourBHex(colourB);
        return this;
    }
    getSpecies() {
        return this.species;
    }
    setSpecies(speciesEnum) {
        if (SpeciesEnum.properties.hasOwnProperty(speciesEnum)) {
            this.species = speciesEnum;
        }
        else {
            this.species = SpeciesEnum.FOX;
        }
        return this;
    }
    getHeight() {
        return this.height;
    }
    getWeight() {
        return this.weight;
    }
    getWidth() {
        return this.width;
    }
    getArmourClass() {
        return this.armourClass;
    }

    addCantrip(spell) {
        if (!(spell instanceof Spell)) {
            if (Game.hasSpellEntity(spell))
                spell = Game.getSpellEntity(spell);
            else
                return this;
        }
        this.cantripsKnown.add(spell);
        return this;
    }
    removeSpell(spell) {
        if (!(spell instanceof Spell)) {
            if (Game.hasSpellEntity(spell))
                spell = Game.getSpellEntity(spell);
            else
                return this;
        }
        this.cantripsKnown.delete(spell);
        return true;
    }

    addSpell(spell) {
        if (!(spell instanceof Spell)) {
            if (Game.hasSpellEntity(spell))
                spell = Game.getSpellEntity(spell);
            else
                return this;
        }
        this.spellsKnown.add(spell);
        return this;
    }
    removeSpell(spell) {
        if (!(spell instanceof Spell)) {
            if (Game.hasSpellEntity(spell))
                spell = Game.getSpellEntity(spell);
            else
                return this;
        }
        this.spellsKnown.delete(spell);
        return true;
    }

    addNewDisposition(characterEntity, passionOffset = 0, friendshipOffset = 0, playfulnessOffset = 0, soulmateOffset = 0, familialOffset = 0, obsessionOffset = 0, hateOffset = 0) {
        this.characterDisposition[characterEntity] = {
            passion:passionOffset + this.defaultDisposition.passion,
            friendship:friendshipOffset + this.defaultDisposition.friendship,
            playfulness:playfulnessOffset + this.defaultDisposition.playfulness,
            soulmate:soulmateOffset + this.defaultDisposition.soulmate,
            familial:familialOffset + this.defaultDisposition.familial,
            obsession:obsessionOffset + this.defaultDisposition.obsession,
            hate:hateOffset + this.defaultDisposition.hate
        }
        return this;
    }

    hasDialogue() {
        return this.dialogue instanceof Dialogue;
    }
    setDialogue(dialogue) {
        dialogue = Game.getDialogue(dialogue);
        if (dialogue instanceof Dialogue) {
            this.dialogue = dialogue;
            this.addAvailableAction(ActionEnum.TALK);
            this.setDefaultAction(ActionEnum.TALK);
        }
        return this;
    }
    removeDialogue() {
        this.dialogue = undefined;
        this.removeAvailableAction(ActionEnum.TALK);
        this.setDefaultAction(ActionEnum.LOOK);
        return this;
    }
    getDialogue() {
        return this.dialogue;
    }
    setLiving(boolean = true) {
        this.living = boolean == true;
        return this;
    }
    getLiving() {
        return this.living;
    }
    isAlive() {
        return this.living;
    }
    isDead() {
        return !this.living;
    }
    isUndead() {
        return !this.living && this.getHealth() > 0;
    }
    getSize() {
        return this.size;
    }
    setFurniture(instancedFurnitureEntity) {
        if (instancedFurnitureEntity instanceof InstancedFurnitureEntity) {
            this.furniture = instancedFurnitureEntity;
        }
        return 0;
    }
    getFurniture() {
        return this.furniture;
    }
    hasFurniture() {
        return this.furniture instanceof InstancedFurnitureEntity;
    }
    removeFurniture() {
        this.furniture = null;
        return 0;
    }

    addProficiency(proficiencyEnum) {
        this.proficiencies.add(proficiencyEnum);
        return 1;
    }
    removeProficiency(proficiencyEnum) {
        this.proficiencies.delete(proficiencyEnum);
        return 0;
    }
    hasProficiency(proficiencyEnum) {
        return this.proficiencies.has(proficiencyEnum);
    }
    clearProficiencies() {
        this.proficiencies.clear();
        return 0;
    }

    setSpellSlot(spellSlot, number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (!this.spellSlots.hasOwnProperty(spellSlot)) {
            return 2;
        }
        this.spellSlots[spellSlot] = number;
        return 0;
    }
    addSpellSlot(spellSlot, number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (!this.spellSlots.hasOwnProperty(spellSlot)) {
            return 2;
        }
        this.spellSlots[spellSlot] += number;
        return 0;
    }
    removeSpellSlot(spellSlot, number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (!this.spellSlots.hasOwnProperty(spellSlot)) {
            return 2;
        }
        this.spellSlots[spellSlot] -= number;
        return 0;
    }

    setUsedSpellSlot(spellSlot, number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (!this.spellSlotsUsed.hasOwnProperty(spellSlot)) {
            return 2;
        }
        this.spellSlotsUsed[spellSlot] = number;
        return 0;
    }
    addUsedSpellSlot(spellSlot, number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (!this.spellSlotsUsed.hasOwnProperty(spellSlot)) {
            return 2;
        }
        this.spellSlotsUsed[spellSlot] += number;
        return 0;
    }
    removeUsedSpellSlot(spellSlot, number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (!this.spellSlotsUsed.hasOwnProperty(spellSlot)) {
            return 2;
        }
        this.spellSlotsUsed[spellSlot] -= number;
        return 0;
    }
    clearUsedSpellSlots() {
        this.spellSlotsUsed = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0};
    }

    resetOffsets() {
        super.resetOffsets();
        this.hungerOffset = 0;
        this.proficiencyOffset = 0;
        this.strengthOffset = 0;
        this.dexterityOffset = 0;
        this.constitutionOffset = 0;
        this.intelligenceOffset = 0;
        this.wisdomOffset = 0;
        this.charismaOffset = 0;
    }

    generateProperties() {
        if (this.species == SpeciesEnum.FOX) {
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
        }
        else if (this.species == SpeciesEnum.SHEEP) {
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
        }
        else if (this.species == SpeciesEnum.WOLF) {
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
        }
        else if (this.species == SpeciesEnum.AARDWOLF) {
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
        }
        else if (this.species == SpeciesEnum.HYENA) {
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
        }
        else if (this.species == SpeciesEnum.STOAT) {
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
        }
        else if (this.species == SpeciesEnum.DEER) {
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
        }
        else if (this.species == SpeciesEnum.RABBIT) {
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
        }
        else if (this.species == SpeciesEnum.JACKAL) {
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
        }
        else if (this.species == SpeciesEnum.COYOTE) {
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
        }
        else if (this.species == SpeciesEnum.TIGER) {
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
        }
        else if (this.species == SpeciesEnum.ANTELOPE) {
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
        }
        else if (this.species == SpeciesEnum.PIG) {
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
        }
        else if (this.species == SpeciesEnum.HORSE) {
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
        }
        else if (this.species == SpeciesEnum.MOUSE) {
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
    generateBaseStats(firstTime = false) {
        let healthFraction = 1;
        if (!firstTime) {
            healthFraction = this.getHealth() / this.getMaxHealth();
        }
        this.setMaxHealth(this.getConstitution()/2 + this.getStrength()/2 + (this.getLevel() * this.getConstitution()/10));
        this.setHealth(this.getMaxHealth() * healthFraction);
        return 0;
    }
    /**
     * Generates protections and multipliers; to be run after status effects and equipment are changed
     */
    generateAdditionalStats() {
        this.armourClass = 0;
        for (let slot in this.equipment) {
            if (this.equipment[slot] instanceof ClothingEntity) {
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
                    case PADDED:
                    case LEATHER:
                    case STUDDEDLEATHER: {
                        modifier = Game.calculateAbilityModifier(this.getDexterity());
                        break;
                    }
                    case HIDE:
                    case CHAINSHIRT:
                    case SCALEMAIL:
                    case BREASTPLATE:
                    case HALFPLATE: {
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
    getProficiencyBonus() {
        return Math.floor((this.level + 7) / 4) + this.proficiencyOffset;
    }
    isArmed() {
        return this.armed || this.armedOffset;
    }

    dispose() {
        if (this == Game.player) {
            return false;
        }
        this.setLocked(true);
        this.setEnabled(false);
        Game.removeCharacterEntity(this.id);
        super.dispose();
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}