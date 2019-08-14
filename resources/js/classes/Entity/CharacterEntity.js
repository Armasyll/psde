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
         * @type {<String, [Cosmetics]>} Bone ID and Cosmetic
         */
        this.attachedCosmetics = {
            HEAD:[],
            EAR_L:[],
            EAR_R:[],
            NECK:[],
            SHOULDER_L:[],
            SHOULDER_R:[],
            FOREARM_L:[],
            FOREARM_R:[],
            HAND_L:[],
            HAND_R:[],
            CHEST:[],
            PELVIS:[],
            LEGS:[],
            FOOT_L:[],
            FOOT_R:[]
        };
        /**
         * Equipment
         * @type {<String, AbstractEntity>} Bone ID and AbstractEntity; suppose to be an InstancedItemEntity, but it could be any AbstractEntity :v
         */
        this.equipment = {
            HEAD:null,
            EAR_L:null,
            EAR_R:null,
            NECK:null,
            SHOULDER_L:null,
            SHOULDER_R:null,
            FOREARM_L:null,
            FOREARM_R:null,
            HAND_L:null,
            HAND_R:null,
            CHEST:null,
            PELVIS:null,
            LEGS:null,
            FOOT_L:null,
            FOOT_R:null
        };
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
         * Hunger; may affect health and stamina regeneration
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
        /**
         * Stamina; should this drop to 0, u unconscious; updated by this.generateBaseStats()
         * @type {number} 0 to 100
         */
        this.stamina = 1;
        this.staminaOffset = 0;
        this.staminaMax = 1;
        this.staminaMaxOffset = 0;
        /**
         * Money
         * @type {number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.money = 0;
        /**
         * Living; updated by this.setHealth()
         * @type {Boolean} True - alive, false - dead
         */
        this.living = true;
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
         * @type {Boolean} True - predator, false - prey
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

        this.proficiencies = new Set();

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
    equip(_entity, _equipmentSlot = undefined) {
        /*
        Get an instanced entity out of whatever _entity is, otherwise fail
        */
        if (!(_entity instanceof AbstractEntity)) {
            let _tempEntity = Game.getInstancedItemEntity(_entity);
            if (!(_tempEntity instanceof InstancedItemEntity)) {
                _tempEntity = this.getItem(_entity);
                if (!(_tempEntity instanceof InstancedItemEntity)) {
                    return 2;
                }
            }
            _entity = _tempEntity;
        }
        if (Game.debugMode) console.log(`Running <CharacterEntity> ${this.id}.equip(${_entity.id}, ${_equipmentSlot})`);
        /*
        Get an apparel slot out of whatever _equipmentSlot is, otherwise fail
         */
        if (typeof _equipmentSlot == "string") {
            _equipmentSlot = _equipmentSlot.toUpperCase();
            if (!ApparelSlotEnum.hasOwnProperty(_equipmentSlot)) {
                _equipmentSlot = undefined;
            }
        }
        else {
            if (ApparelSlotEnum.properties.hasOwnProperty(_equipmentSlot)) {
                _equipmentSlot = ApparelSlotEnum.properties[_equipmentSlot].key;
            }
            else {
                _equipmentSlot = undefined;
            }
        }
        if (_equipmentSlot == undefined && _entity instanceof InstancedItemEntity) {
            if (ApparelSlotEnum.properties.hasOwnProperty) {
                _equipmentSlot = ApparelSlotEnum.properties[_entity.getEquipmentSlot()].key;
            }
            else {
                if (Game.debugMode) console.log(`\tNo equipment slot was defined.`);
                return 2;
            }
        }
        /*
        Overrides for general slots
         */
        if (_equipmentSlot == "HANDS") {
            if (this.handedness == HandednessEnum.LEFT) {
                _equipmentSlot = "HAND_L";
            }
            else {
                _equipmentSlot = "HAND_R";
            }
        }
        /*
        If the apparel slot isn't an equipment slot, fail
         */
        if (!this.equipment.hasOwnProperty(_equipmentSlot)) {
            if (Game.debugMode) console.log(`\tThe equipment slot (${_equipmentSlot}) doesn't exist.`);
            return 2;
        }
        /*
        Clear out the equipment slot if it's in use, and set its value to _entity
         */
        if (this.equipment[_equipmentSlot] == _entity) {}
        else if (this.equipment[_equipmentSlot] instanceof AbstractEntity) {
            this.unequipBySlot(_equipmentSlot);
            this.equipment[_equipmentSlot] = _entity;
        }
        else {
            this.equipment[_equipmentSlot] = _entity;
        }
        /*
        If we've got a controller in the world, and it's got an active mesh, attach _entity's mesh to it
         */
        if (this.hasController() && this.controller.hasMesh()) {
            switch (_equipmentSlot) {
                case "HEAD": {
                    this.controller.attachToHead(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "NECK": {
                    this.controller.attachToNeck(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "SHOULDER_L": {
                    this.controller.attachToLeftShoulder(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "SHOULDER_R": {
                    this.controller.attachToRightShoulder(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "FOREARM_L": {
                    this.controller.attachToLeftForearm(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "FOREARM_R": {
                    this.controller.attachToRightForearm(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "HAND_L": {
                    this.controller.attachToLeftHand(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "HAND_R": {
                    this.controller.attachToRightHand(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "CHEST": {
                    this.controller.attachToChest(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "PELVIS": {
                    this.controller.attachToPelvis(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "LEGS": {
                    this.controller.attachToLegs(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "FOOT_L": {
                    this.controller.attachToLeftFoot(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "FOOT_R": {
                    this.controller.attachToRightFoot(_entity.getMeshID(), _entity.getTextureID());
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
        else if (typeof _blob == "number" && ApparelSlotEnum.properties.hasOwnProperty(_blob)) {
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
    unequipBySlot(_equipmentSlot) {
        if (typeof _equipmentSlot == "string") {
            _equipmentSlot = _equipmentSlot.toUpperCase();
            if (!ApparelSlotEnum.hasOwnProperty(_equipmentSlot)) {
                if (Game.debugMode) console.log(`\tThe equipment slot (${_equipmentSlot}) doesn't exist.`);
                return 2;
            }
        }
        else {
            if (ApparelSlotEnum.properties.hasOwnProperty(_equipmentSlot)) {
                _equipmentSlot = ApparelSlotEnum.properties[_equipmentSlot].key;
            }
            else {
                if (Game.debugMode) console.log(`\tThe equipment slot (${_equipmentSlot}) doesn't exist.`);
                return 2;
            }
        }
        if (!this.equipment.hasOwnProperty(_equipmentSlot)) {
            if (Game.debugMode) console.log(`\tThough the equipment slot (${_equipmentSlot}) exists, it doesn't for this entity.`);
            return 2;
        }
        let _entity = this.equipment[_equipmentSlot];
        this.equipment[_equipmentSlot] = null;
        if (_entity instanceof AbstractEntity && this.hasController() && this.controller.hasMesh()) {
            switch (_equipmentSlot) {
                case "HEAD": {
                    this.controller.detachFromHead(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "NECK": {
                    this.controller.detachFromNeck(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "SHOULDER_L": {
                    this.controller.detachFromLeftShoulder(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "SHOULDER_R": {
                    this.controller.detachFromRightShoulder(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "FOREARM_L": {
                    this.controller.detachFromLeftForearm(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "FOREARM_R": {
                    this.controller.detachFromRightForearm(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "HAND_L": {
                    this.controller.detachFromLeftHand(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "HAND_R": {
                    this.controller.detachFromRightHand(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "CHEST": {
                    this.controller.detachFromChest(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "PELVIS": {
                    this.controller.detachFromPelvis(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "LEGS": {
                    this.controller.detachFromLegs(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "FOOT_L": {
                    this.controller.detachFromLeftFoot(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "FOOT_R": {
                    this.controller.detachFromRightFoot(_entity.getMeshID(), _entity.getTextureID());
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
        if (abstractEntity instanceof Entity) {
            for (let equipmentSlot in {"HAND_L":null, "HAND_R":null}) {
                if (this.equipment[equipmentSlot] instanceof AbstractEntity && this.equipment[equipmentSlot].getEntity() == abstractEntity) {
                    return true;
                }
            }
        }
        else if (abstractEntity instanceof InstancedEntity) {
            for (let equipmentSlot in {"HAND_L":null, "HAND_R":null}) {
                if (this.equipment[equipmentSlot] instanceof AbstractEntity && this.equipment[equipmentSlot] == abstractEntity) {
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
    attachCosmetic(_cosmetic, _bone) {
        if (!(_cosmetic instanceof Cosmetic)) {
            _cosmetic = Game.getCosmetic(_cosmetic);
            if (!(_cosmetic instanceof Cosmetic)) {
                return 2;
            }
        }
        if (_bone instanceof BABYLON.Bone) {
            _bone = _bone.id;
        }
        if (!this.attachedCosmetics.hasOwnProperty(_bone)) {
            return 2;
        }
        this.attachedCosmetics[_bone][_cosmetic.id] = _cosmetic;
        if (this.hasController()) {
            if (_bone == "head") {
                this.controller.attachToHead(_cosmetic.getMeshID(), _cosmetic.getMaterialID());
            }
        }
        return 0;
    }
    detachCosmetic(_cosmetic, _bone = undefined) { // TODO: this, still :v
        if (!(_cosmetic instanceof Cosmetic)) {
            _cosmetic = Game.getCosmetic(_cosmetic);
            if (!(_cosmetic instanceof Cosmetic)) {
                return 2;
            }
        }
        if (_bone instanceof BABYLON.Bone) {
            _bone = _bone.id;
        }
        if (!this.attachedCosmetics.hasOwnProperty(_bone)) {
            return 2;
        }
        if (this.hasController()) {
            this.controller.detachMeshFromBone(_cosmetic.getMeshID());
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

    setStamina(number) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (this.getGodMode()) {
            this.stamina = this.getMaxStamina();
            return this;
        }
        if (number + this.stamina > this.staminaMax) {
            number = this.staminaMax;
        }
        else if (number + this.stamina < 0) {
            number = 0;
        }
        this.stamina = number;
        return this;
    }
    addStamina(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (number > 0) {
            this.setStamina(this.stamina + number);
        }
        return this;
    }
    subtractStamina(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (number > 0) {
            this.setStamina(this.stamina - number);
        }
        return this;
    }
    getStamina() {
        return this.stamina + this.staminaOffset;
    }

    setMaxStamina(number) {
        if (typeof number != "number") {number = Number.parseInt(number) || 0;}
        else {number = number|0}
        if (number <= 0) {
            number = 1;
        }
        this.staminaMax = number;
        if (this.stamina > this.getMaxStamina()) {
            this.stamina = this.getMaxStamina();
        }
        return this;
    }
    addMaxStamina(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (number > 0) {
            this.setMaxStamina(this.staminaMax + number);
        }
        return this;
    }
    subtractMaxStamina(number = 1) {
        if (typeof number != "number") {number = Number.parseInt(number) | 0;}
        else {number = number|0}
        if (number > 0) {
            this.setMaxStamina(this.staminaMax - number);
        }
        return this;
    }
    getMaxStamina() {
        return this.staminaMax + this.staminaMaxOffset;
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
            return this.getEquipment()["HAND_R"];
        }
        else {
            return this.getEquipment()["HAND_L"];
        }
    }
    getSubWeapon() {
        if (this.isRightHanded()) {
            return this.getEquipment()["HAND_L"];
        }
        else {
            return this.getEquipment()["HAND_R"];
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
        this.strengthOffset = 0;
        this.dexterityOffset = 0;
        this.constitutionOffset = 0;
        this.intelligenceOffset = 0;
        this.wisdomOffset = 0;
        this.charismaOffset = 0;
        this.staminaOffset = 0;
        this.staminaMaxOffset = 0;
    }

    generateProperties() {
        if (this.species == SpeciesEnum.FOX) {
            if (this.getSex() == SexEnum.MALE) {
                this.baseWeight = 36;
                this.baseHeight = 1.20;
                this.baseWidth = 0.4;
            }
            else {
                this.baseWeight = 32;
                this.baseHeight = 1.12;
                this.baseWidth = 0.37;
            }

            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.SHEEP) {
            if (this.getSex() == SexEnum.MALE) {
                this.baseWeight = 34;
                this.baseHeight = 1.35;
                this.baseWidth = 0.45;
            }
            else {
                this.baseWeight = 28;
                this.baseHeight = 1.0;
                this.baseWidth = 0.33;
            }
            
            this.predator = false;
            this.setPaws(PawEnum.HOOF);
            this.setEyeType(EyeEnum.OBLONG);
            this.setPelt(PeltEnum.WOOL);
        }
        else if (this.species == SpeciesEnum.WOLF) {
            if (this.getSex() == SexEnum.MALE) {
                this.baseHeight = 1.9;
                this.baseWidth = 0.63;
            }
            else {
                this.baseWeight = 66;
                this.baseHeight = 1.8;
                this.baseWidth = 0.6;
            }

            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.AARDWOLF) {
            if (this.getSex() == SexEnum.MALE) {
                this.baseWeight = 32;
                this.baseHeight = 1.10;
                this.baseWidth = 0.36;
            }
            else {
                this.baseWeight = 28;
                this.baseHeight = 1.02;
                this.baseWidth = 0.34;
            }

            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.HYENA) {
            if (this.getSex() == SexEnum.MALE) {
                this.baseWeight = 58;
                this.baseHeight = 1.6;
                this.baseWidth = 0.53;
            }
            else {
                this.baseWeight = 62;
                this.baseHeight = 1.75;
                this.baseWidth = 0.58;
            }

            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.STOAT) {
            if (this.getSex() == SexEnum.MALE) {
                this.baseWeight = 10;
                this.baseHeight = 0.6;
                this.baseWidth = 0.2;
            }
            else {
                this.baseWeight = 8;
                this.baseHeight = 0.5;
                this.baseWidth = 0.16;
            }

            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.DEER) {
            if (this.getSex() == SexEnum.MALE) {
                this.baseWeight = 78;
                this.baseHeight = 2.2;
                this.baseWidth = 0.7;
            }
            else {
                this.baseWeight = 60;
                this.baseHeight = 1.9;
                this.baseWidth = 0.6;
            }
            
            this.predator = false;
            this.setPaws(PawEnum.HOOF);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.WOOL);
        }
        else if (this.species == SpeciesEnum.RABBIT) {
            if (this.getSex() == SexEnum.MALE) {
                this.baseWeight = 22;
                this.baseHeight = 0.95;
                this.baseWidth = 0.34;
            }
            else {
                this.baseWeight = 14.9;
                this.baseHeight = 0.81;
                this.baseWidth = 0.3;
            }
            
            this.predator = false;
            this.setPaws(PawEnum.FUR);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.JACKAL) {
            if (this.getSex() == SexEnum.MALE) {
                this.baseWeight = 55;
                this.baseHeight = 1.6;
                this.baseWidth = 0.53;
            }
            else {
                this.baseWeight = 51;
                this.baseHeight = 1.55;
                this.baseWidth = 0.5;
            }
            
            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.COYOTE) {
            if (this.getSex() == SexEnum.MALE) {
                this.baseWeight = 36;
                this.baseHeight = 1.20;
                this.baseWidth = 0.4;
            }
            else {
                this.baseWeight = 32;
                this.baseHeight = 1.12;
                this.baseWidth = 0.37;
            }
            
            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.TIGER) {
            if (this.getSex() == SexEnum.MALE) {
                this.baseWeight = 88;
                this.baseHeight = 2.2;
                this.baseWidth = 0.73;
            }
            else {
                this.baseWeight = 82;
                this.baseHeight = 2.0;
                this.baseWidth = 0.66;
            }
            
            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.ANTELOPE) {
            if (this.getSex() == SexEnum.MALE) {
                this.baseWeight = 68;
                this.baseHeight = 2.0;
                this.baseWidth = 0.66;
            }
            else {
                this.baseWeight = 60;
                this.baseHeight = 1.9;
                this.baseWidth = 0.63;
            }
            
            this.predator = false;
            this.setPaws(PawEnum.HOOF);
            this.setEyeType(EyeEnum.OBLONG);
            this.setPelt(PeltEnum.HAIR);
        }
        else if (this.species == SpeciesEnum.PIG) {
            if (this.getSex() == SexEnum.MALE) {
                this.baseWeight = 46;
                this.baseHeight = 1.3;
                this.baseWidth = 0.54;
            }
            else {
                this.baseWeight = 44;
                this.baseHeight = 1.2;
                this.baseWidth = 0.5;
            }
            
            this.predator = false;
            this.setPaws(PawEnum.HOOF);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.SKIN);
        }
        else if (this.species == SpeciesEnum.HORSE) {
            if (this.getSex() == SexEnum.MALE) {
                this.baseWeight = 82;
                this.baseHeight = 2.0;
                this.baseWidth = 0.66;
            }
            else {
                this.baseWeight = 78;
                this.baseHeight = 1.9;
                this.baseWidth = 0.63;
            }
            
            this.predator = false;
            this.setPaws(PawEnum.HOOF);
            this.setEyeType(EyeEnum.OBLONG);
            this.setPelt(PeltEnum.HAIR);
        }
        else if (this.species == SpeciesEnum.MOUSE) {
            if (this.getSex() == SexEnum.MALE) {
                this.baseWeight = 0.4;
                this.baseHeight = 0.16;
                this.baseWidth = 0.05;
            }
            else {
                this.baseWeight = 0.4;
                this.baseHeight = 0.15;
                this.baseWidth = 0.05;
            }
            
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
        /**
         * Width is 1/3rd(-ish) of height, times the ratio of weight to base weight
         * @type {number}
         */
        this.width = (this.height / 3.5294) * (this.weight / this.baseWeight);
        return 0;
    }
    generateBaseStats(firstTime = false) {
        let healthFraction = 1;
        let staminaFraction = 1;
        if (!firstTime) {
            healthFraction = this.getHealth() / this.getMaxHealth();
            staminaFraction = this.getStamina() / this.getMaxStamina();
        }
        this.setMaxHealth(this.getConstitution()/2 + this.getStrength()/2 + (this.getLevel() * this.getConstitution()/10));
        this.setMaxStamina(this.getStrength() + this.getWisdom() + this.getDexterity() + this.getConstitution());
        this.setHealth(this.getMaxHealth() * healthFraction);
        this.setStamina(this.getMaxStamina() * staminaFraction);
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