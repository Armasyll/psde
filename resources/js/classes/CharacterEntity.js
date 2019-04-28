class CharacterEntity extends EntityWithStorage {
    /**
     * Creates a CharacterEntity
     * @param  {String} _id           Unique ID
     * @param  {String} _name         Name
     * @param  {String} _description  Description
     * @param  {String}  _image       Image ID
     * @param  {String} _class        Role
     * @param  {Number} _age          Age
     * @param  {Number} sex           Sex (0 Male, 1 Female, 2 Herm)
     * @param  {String} _species      Species
     */
    constructor(_id = "nickWilde", _name = "Wilde, Nicholas", _description = undefined, _image = "genericCharacterIcon", _characterClass = CharacterClassEnum.CLASSLESS, _age = 33, sex = SexEnum.MALE, _species = SpeciesEnum.FOX) {
        super(_id);
        this.entityType = EntityEnum.CHARACTER;
        /**
         * Surname
         * @type {String} Cannot be undefined!
         */
        this.name = undefined;
        this.surname = undefined;
        /**
         * Nickname
         * @type {String} Can be undefined
         */
        this.nickname = undefined;
        /**
         * Class title
         * @type {String}
         */
        this.characterClass = CharacterClassEnum.CLASSLESS;
        /**
         * Age
         * @type {Number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.age = new BoundedNumber(0, 0, Number.MAX_SAFE_INTEGER);
        /**
         * Physical sexual identity
         * @type {Number} 0 - none, 1 - male, 2 - female
         */
        this.sex = new BoundedNumber(0, 0, 2);
        /**
         * Personal sexual identity
         * @type {Number} 0 - none, 1 - male, 2 - female
         */
        this.gender = new BoundedNumber(0, 0, 2);
        /**
         * Intraactions this CharacterEntity is currently performing
         * @type {Map} <ActionEnum>
         */
        this.currentActions = {};
        /**
         * Stance this CharacterEntity is currently performing
         * 0 - Lay, 1 - Sit, 2 - Crouch, 3 - Stand, 4 - Fly
         * @type {Number}
         */
        this.stance = new BoundedNumber(3, 0, 4);
        /**
         * Spells known by this Character
         * @type {Set} <Spell>
         */
        this.spells = new Set();
        /**
         * Dominant hand
         * @type {HandednessEnum} NONE, LEFT, or RIGHT
         */
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
         * @type {Number}  Passion
         * @type {Number}  Friendship
         * @type {Number}  Playfulness
         * @type {Number}  Soulmate
         * @type {Number}  Familial
         * @type {Number}  Obsession
         * @type {Number}  Hate
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
         * Hunger; may affect health, stamina, and mana regeneration
         * @type {Number} 0 to 100
         */
        this.hunger = new BoundedNumber(0, 0, 100);
        /**
         * Physical power
         * @type {Number}
         */
        this.strength = new BoundedNumber(10, 1, 30);
        this.strengthOffset = new BoundedNumber(0, -100, 100);
        /**
         * Agility
         * @type {Number}
         */
        this.dexterity = new BoundedNumber(10, 1, 30);
        this.dexterityOffset = new BoundedNumber(0, -100, 100);
        /**
         * Endurance
         * @type {Number}
         */
        this.constitution = new BoundedNumber(10, 1, 30);
        this.constitutionOffset = new BoundedNumber(0, -100, 100);
        /**
         * Reasoning and memory
         * @type {Number}
         */
        this.intelligence = new BoundedNumber(10, 1, 30);
        this.intelligenceOffset = new BoundedNumber(0, -100, 100);
        /**
         * Perception and insight
         * @type {Number}
         */
        this.wisdom = new BoundedNumber(10, 1, 30);
        this.wisdomOffset = new BoundedNumber(0, -100, 100);
        /**
         * Force of personality
         * @type {Number}
         */
        this.charisma = new BoundedNumber(10, 1, 30);
        this.charismaOffset = new BoundedNumber(0, -100, 100);

        this.physicalMultiplier = new BoundedNumber(0, 1, 10);
        this.magickMultiplier = new BoundedNumber(0, 0, 10);
        this.physicalProtection = new BoundedNumber(0, 0, Number.MAX_SAFE_INTEGER - 1);
        this.magickProtection = new BoundedNumber(0, 0, Number.MAX_SAFE_INTEGER - 1);

        this.experiencePoints = new BoundedNumber(0, 0, Number.MAX_SAFE_INTEGER - 1);
        /**
         * Health; should this drops to 0, u gon' die
         * @type {BoundedNumber} 0 to 100
         */
        this.health.set(100, 0, 100);
        /**
         * Mana; should this ever be greater than 0, things will be revealed
         * @type {Number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.mana = new BoundedNumber(0, 0, 0);
        /**
         * Stamina; should this drop to 0, u unconscious
         * @type {Number} 0 to 100
         */
        this.stamina = new BoundedNumber(100, 0, 100);
        /**
         * Money
         * @type {Number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.money = new BoundedNumber(0, 0, Number.MAX_SAFE_INTEGER - 1);
        /**
         * Living
         * @type {Boolean} True - alive, false - dead
         */
        this.living = true;
        /**
         * Primary fur colour
         * @type {String}
         */
        this.furColourA = "orange";
        /**
         * Primary fur colour hex value
         * @type {String}
         */
        this.furColourAHex = undefined;
        /**
         * Sexondary fur colour
         * @type {String}
         */
        this.furColourB = "cream";
        /**
         * Secondary fur colour hex value
         * @type {[type]}
         */
        this.furColourBHex = undefined;
        /**
         * Average weight, in kilograms, of parent species; updated by this._generateProperties
         * @type {Number}
         */
        this._baseWeight = 36;
        /**
         * Average height, in metres, of parent species; updated by this._generateProperties
         * @type {Number}
         */
        this._baseHeight = 1.20;
        /**
         * Average width, in metres, of parent species; updated by this._generateProperties
         * @type {Number}
         */
        this._baseWidth = 0.4;
        /**
         * Weight, in kilograms
         * @type {Number}
         */
        this.weight = 0;
        /**
         * Height, in mtres
         * @type {Number}
         */
        this.height = 1.2;
        /**
         * Width, in metres
         * @type {Number}
         */
        this.width = 0.34;
        /**
         * Whether or not this CharacterEntity is a predator
         * @type {Boolean} True - predator, false - prey
         */
        this.predator = false;
        /**
         * Paw type
         * @type {Number} (PawEnum)
         */
        this.pawType = PawEnum.PAD;
        /**
         * Eye type
         * @type {String} (Game.kEyeTypes)
         */
        this.eyeType = EyeEnum.CIRCLE;
        /**
         * Eye colour
         * @type {String}
         */
        this.eyeColour = "green";
        /**
         * Pelt type
         * @type {String} (PeltEnum)
         */
        this.peltType = PeltEnum.FUR;
        /**
         * Map of Characters and this Character's disposition for them
         * @type {Map} <Character, Object>
         * 
         * @type {Number}  Passion
         * @type {Number}  Friendship
         * @type {Number}  Playfulness
         * @type {Number}  Souldmate
         * @type {Number}  Familial
         * @type {Number}  Obsession
         * @type {Number}  Hate
         */
        this.characterDisposition = {};
        /**
         * Initial dialogue
         * @type {Dialogue}
         */
        this.dialogue = undefined;
        this.godMode = false;

        this.setName(_name);
        this.setImage(_image);
        this.setClass(_characterClass);
        this.setAge(_age);
        this.setSex(sex);
        this.setGender(sex);
        this.setSpecies(_species);
        this.addAvailableAction(ActionEnum.ATTACK);
        this.addAvailableAction(ActionEnum.HOLD);
        this.addAvailableAction(ActionEnum.OPEN); // inventory... maybe :v
        this.addAvailableAction(ActionEnum.GIVE);
        this.addAvailableAction(ActionEnum.TAKE);
        this._generateProperties();
        this._generateBaseStats();
        this._generateAdditionalStats();
        Game.setCharacterEntity(this.id, this);
    }
    
    setName(_string = "") {
        if (_string.split(", ").length > 1) {
            var tempName = _string.split(", ");
            this.name = tempName[1].replace(/[^0-9a-z]/gi, '');
            this.surname = tempName[0].replace(/[^0-9a-z]/gi, '');
        }
        else if (_string.split(" ").length > 1) {
            var tempName = _string.split(" ");
            this.name = tempName[0].replace(/[^0-9a-z]/gi, '');
            this.surname = tempName[1].replace(/[^0-9a-z]/gi, '');
        }
        else {
            this.name = _string.replace(/[^0-9a-z]/gi, '');
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

    setClass(_characterClass) {
        if (isNaN(_characterClass)) {
            return this;
        }
        if (CharacterClassEnum.properties.hasOwnProperty(_characterClass)) {
            this.characterClass = _characterClass;
        }
        else {
            this.characterClass = CharacterClassEnum.CLASSLESS
        }
        return this;
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
                    return this;
                }
            }
            _entity = _tempEntity;
        }
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
                return this;
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
            return this;
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
        return this;
    }
    unequip(_blob) {
        if (ApparelSlotEnum.hasOwnProperty(_blob) || ApparelSlotEnum.properties.hasOwnProperty(_blob)) {
            return this.unequipBySlot(_blob);
        }
        else {
            return this.unequipByEntity(_blob);
        }
    }
    unequipByEntity(_entity) {
        if (!(_entity instanceof AbstractEntity)) {
            let _tempEntity = Game.getInstancedItemEntity(_entity);
            if (!(_tempEntity instanceof InstancedItemEntity)) {
                _tempEntity = this.getItem(_entity);
                if (!(_tempEntity instanceof InstancedItemEntity)) {
                    return this;
                }
            }
            _entity = _tempEntity;
        }
        let _equipmentSlot = null;
        for (let _slot in this.equipment) {
            if (this.equipment[_slot] instanceof AbstractEntity && this.equipment[_slot] == _entity) {
                _equipmentSlot = _slot;
            }
        }
        return this.unequipBySlot(_equipmentSlot);
    }
    unequipBySlot(_equipmentSlot) {
        if (typeof _equipmentSlot == "string") {
            _equipmentSlot = _equipmentSlot.toUpperCase();
            if (!ApparelSlotEnum.hasOwnProperty(_equipmentSlot)) {
                return this;
            }
        }
        else {
            if (ApparelSlotEnum.properties.hasOwnProperty(_equipmentSlot)) {
                _equipmentSlot = ApparelSlotEnum.properties[_equipmentSlot].key;
            }
            else {
                return this;
            }
        }
        if (!this.equipment.hasOwnProperty(_equipmentSlot)) {
            return this;
        }
        let _entity = this.equipment[_equipmentSlot];
        this.equipment[_equipmentSlot] = null;
        if (_entity instanceof AbstractEntity && this.hasController() && this.controller.hasMesh()) {
            switch (_equipmentSlot) {
                case "HEAD": {
                    this.controller.detachFromHead(_entity.getMeshID(), _entity.getTextureID());
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
        return this;
    }
    hasEquipment(_entity) {
        if (!(_entity instanceof AbstractEntity)) {
            let _tempEntity = Game.getInstancedItemEntity(_entity);
            if (!(_tempEntity instanceof InstancedItemEntity)) {
                _tempEntity = Game.getItemEntity(_entity);
                if (!(_tempEntity instanceof ItemEntity)) {
                    return null;
                }
            }
            _entity = _tempEntity;
        }
        if (_entity instanceof Entity) {
            for (let _slot in this.equipment) {
                if (this.equipment[_slot] instanceof AbstractEntity && this.equipment[_slot].getEntity() == _entity) {
                    return true;
                }
            }
        }
        else if (_entity instanceof InstancedEntity) {
            for (let _slot in this.equipment) {
                if (this.equipment[_slot] instanceof AbstractEntity && this.equipment[_slot] == _entity) {
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
        _cosmetic = Game.getCosmetic(_cosmetic);
        if (_cosmetic == undefined) {
            return this;
        }
        if (_bone instanceof BABYLON.Bone) {
            _bone = _bone.id;
        }
        if (!this.attachedCosmetics.hasOwnProperty(_bone)) {
            return this;
        }
        this.attachedCosmetics[_bone][_cosmetic.id] = _cosmetic;
        if (this.hasController()) {
            if (_bone == "head") {
                this.controller.attachToHead(_cosmetic.getMeshID(), _cosmetic.getMaterialID());
            }
        }
        return this;
    }
    detachCosmetic(_cosmetic, _bone = undefined) { // TODO: this, still :v
        _cosmetic = Game.getCosmetic(_cosmetic);
        if (_cosmetic == undefined) {
            return this;
        }
        if (_bone instanceof BABYLON.Bone) {
            _bone = _bone.id;
        }
        if (!this.attachedCosmetics.hasOwnProperty(_bone)) {
            return this;
        }
        if (this.hasController()) {
            this.controller.detachMeshFromBone(_cosmetic.getMeshID());
        }
        return this;
    }

    /**
     * Removes an InstancedItemEntity from this entity's Item array
     * @override super.removeItem
     * @param  {InstancedItemEntity} _abstractEntity InstancedItemEntity, or ItemEntity, to be removed
     * @return {this}
     */
    removeItem(_abstractEntity) {
        if (_abstractEntity instanceof AbstractEntity) {
            this.unequipByEntity(_abstractEntity);
            super.removeItem(_abstractEntity);
            return this;
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
        return this;
    }

    setAge(_int) {
        this.age.setValue(_int);
        if (this.age.getValue() >= 18) {
            this.addAvailableAction(ActionEnum.SEX);
            this.addAvailableAction(ActionEnum.MASTURBATE);
        }
        else {
            this.removeAvailableAction(ActionEnum.SEX);
            this.removeAvailableAction(ActionEnum.MASTURBATE);
        }
        return this;
    }
    addAge(_int) {
        return this.age.inc(_int);
    }
    getAge() {
        return this.age.getValue();
    }

    setHunger(_int) {
        this.hunger.setValue(_int);
        return this;
    }
    addHunger(_int) {
        return this.hunger.inc(_int);
    }
    subtractHunger(_int) {
        return this.hunger.dec(_int);
    }
    getHunger() {
        return this.hunger.getValue();
    }

    setStrength(_int) {
        this.strength.setValue(_int);
        return this;
    }
    addStrength(_int) {
        return this.strength.inc(_int);
    }
    subtractStrength(_int) {
        return this.strength.dec(_int);
    }
    getStrength() {
        if (this.godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.strength.getValue() + this.strengthOffset.getValue();
    }
    setDexterity(_int) {
        this.dexterity.setValue(_int);
        return this;
    }
    addDexterity(_int) {
        return this.dexterity.inc(_int);
    }
    subtractDexterity(_int) {
        return this.dexterity.dec(_int);
    }
    getDexterity() {
        if (this.godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.dexterity.getValue() + this.dexterityOffset.getValue();
    }
    setConstitution(_int) {
        this.constitution.setValue(_int);
        return this;
    }
    addConstitution(_int) {
        return this.constitution.inc(_int);
    }
    subtractConstitution(_int) {
        return this.constitution.dec(_int);
    }
    getConstitution() {
        if (this.godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.constitution.getValue() + this.constitutionOffset.getValue();
    }
    setIntelligence(_int) {
        this.intelligence.setValue(_int);
        return this;
    }
    addIntelligence(_int) {
        return this.intelligence.inc(_int);
    }
    subtractIntelligence(_int) {
        return this.intelligence.dec(_int);
    }
    getIntelligence() {
        if (this.godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.intelligence.getValue() + this.intelligenceOffset.getValue();
    }
    setWisdom(_int) {
        this.wisdom.setValue(_int);
        return this;
    }
    addWisdom(_int) {
        return this.wisdom.inc(_int);
    }
    subtractWisdom(_int) {
        return this.wisdom.dec(_int);
    }
    getWisdom() {
        if (this.godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.wisdom.getValue() + this.wisdomOffset.getValue();
    }
    setCharisma(_int) {
        this.charisma.setValue(_int);
        return this;
    }
    addCharisma(_int) {
        return this.charisma.inc(_int);
    }
    subtractCharisma(_int) {
        return this.charisma.dec(_int);
    }
    getCharisma() {
        if (this.godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.charisma.getValue() + this.charismaOffset.getValue();
    }
    /**
     * Sets CharacterEntity attributes
     * @param {Number} _str Strength, physical power
     * @param {Number} _dex Dexterity, agility
     * @param {Number} _con Constitution, endurance
     * @param {Number} _int Intelligence, reasoning and memory
     * @param {Number} _wis Wisdom, perception and insight
     * @param {Number} _cha Charisma, force of personality
     */
    setAttributes(_str = 10, _dex = 10, _con = 10, _int = 10, _wis = 12, _cha = 10) {
        this.setStrength(_str);
        this.setDexterity(_dex);
        this.setConstitution(_con);
        this.setIntelligence(_int);
        this.setWisdom(_wis);
        this.setCharisma(_cha);
        return this;
    }
    getAttributes() {
        return {strength: this.strength.getValue(), dexterity: this.dexterity.getValue(), constitution: this.constitution.getValue(), intelligence: this.intelligence.getValue(), wisdom: this.wisdom.getValue(), charisma: this.charisma.getValue()};
    }

    getLevel() {
        return Game.calculateLevel(this.experiencePoints.getValue())
    }
    setXP(_int = 0) {
        this.experiencePoints.setValue(_int);
        return this;
    }
    addXP(_int) {
        return this.experiencePoints.inc(_int);
    }
    subtractXP(_int) {
        return this.experiencePoints.dec(_int);
    }
    getXP() {
        if (this.godMode) {
            return this.experiencePoints.getMax();
        }
        return this.experiencePoints.getValue();
    }

    setHealth(_int) {
        if (this.godMode) {
            return this;
        }
        this.health.setValue(_int);
        if (this._isEssential) {
            if (this.health.getValue() < 1) {
                this.health.setValue(1);
            }
        }
        if (this.health.getValue() <= 0) {
            this.living = false;
            if (this.hasController()) {
                this.controller.doDeath();
            }
        }
        return this;
    }
    addHealth(_int = 1) {
        if (this.godMode) {
            return this.health.getValue();
        }
        return this.health.inc(_int);
    }
    subtractHealth(_int = 1) {
        if (this.godMode) {
            return this.health.getValue();
        }
        return this.health.dec(_int);
    }
    getHealth() {
        if (this.godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.health.getValue();
    }

    setMaxHealth(_int) {
        if (this.godMode) {
            return this;
        }
        this.health.setMax(_int);
        if (this._isEssential) {
            if (this.health.getMax() < 1) {
                this.health.setMax(1);
            }
        }
        return this;
    }
    addMaxHealth(_int = 1) {
        if (this.godMode) {
            return this.health.getMax();
        }
        return this.health.incMax(_int);
    }
    subtractMaxHealth(_int = 1) {
        if (this.godMode) {
            return this.health.getMax();
        }
        return this.health.decMax(_int);
    }
    getMaxHealth() {
        if (this.godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.health.getMax();
    }

    setMana(_int) {
        this.mana.setValue(_int);
        return this;
    }
    addMana(_int = 1) {
        return this.mana.inc(_int);
    }
    subtractMana(_int = 1) {
        return this.mana.dec(_int);
    }
    getMana() {
        if (this.godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.mana.getValue();
    }

    setMaxMana(_int) {
        this.mana.setMax(_int);
        return this;
    }
    addMaxMana(_int = 1) {
        return this.mana.incMax(_int);
    }
    subtractMaxMana(_int = 1) {
        return this.mana.decMax(_int);
    }
    getMaxMana() {
        if (this.godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.mana.getMax();
    }

    setStamina(_int) {
        this.stamina.setValue(_int);
        return this;
    }
    addStamina(_int) {
        return this.stamina.inc(_int);
    }
    subtractStamina(_int) {
        return this.stamina.dec(_int);
    }
    getStamina() {
        if (this.godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.stamina.getValue();
    }

    setMaxStamina(_int) {
        this.stamina.setMax(_int);
        return this;
    }
    addMaxStamina(_int = 1) {
        return this.stamina.incMax(_int);
    }
    subtractMaxStamina(_int) {
        return this.stamina.decMax(_int);
    }
    getMaxStamina() {
        if (this.godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.stamina.getMax();
    }

    setMoney(_int) {
        this.money.setValue(_int);
        return this;
    }
    addMoney(_int) {
        return this.money.inc(_int);
    }
    subtractMoney(_int) {
        return this.money.dec(_int);
    }
    getMoney() {
        if (this.godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.money.getValue();
    }
    getMaxMoney() {
        if (this.godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.money.getMax();
    }

    setSex(_int = SexEnum.MALE) {
        this.sex.setValue(_int);
        return this;
    }
    getSex() {
        return this.sex.getValue();
    }

    setGender(_int = SexEnum.MALE) {
        this.gender.setValue(_int);
        return this;
    }
    getGender() {
        return this.gender.getValue();
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
    setCharacterPassion(_character, _int) {
        return this.characterDisposition[_character]["passion"] = _int;
    }
    getCharacterPassion(_character) {
        if (this.godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.getCharacterDisposition[_character]["passion"];
    }
    setCharacterFriendship(_character, _int) {
        return this.characterDisposition[_character]["friendship"] = _int;
    }
    getCharacterFriendship(_character) {
        if (this.godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.getCharacterDisposition[_character]["friendship"];
    }
    setCharacterPlayfulness(_character, _int) {
        return this.characterDisposition[_character]["playfulness"] = _int;
    }
    getCharacterPlayfulness(_character) {
        if (this.godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.getCharacterDisposition[_character]["playfulness"];
    }
    setCharacterSoulmate(_character, _int) {
        return this.characterDisposition[_character]["soulmate"] = _int;
    }
    getCharacterSoulmate(_character) {
        if (this.godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.getCharacterDisposition[_character]["soulmate"];
    }
    setCharacterFamilial(_character, _int) {
        return this.characterDisposition[_character]["familial"] = _int;
    }
    getCharacterFamilial(_character) {
        if (this.godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.getCharacterDisposition[_character]["familial"];
    }
    setCharacterObsession(_character, _int) {
        return this.characterDisposition[_character]["obsession"] = _int;
    }
    getCharacterObsession(_character) {
        if (this.godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.getCharacterDisposition[_character]["obsession"];
    }
    setCharacterHate(_character, _int) {
        return this.characterDisposition[_character]["hate"] = _int;
    }
    getCharacterHate(_character) {
        if (this.godMode) {
            return Number.MAX_SAFE_INTEGER; // SO MUCH HATE >:VVVVV
        }
        return this.getCharacterDisposition[_character]["hate"];
    }
    getCharacterDisposition(_character, _dispositionType = undefined) {
        if (Game.enableDebug) console.log("Running getCharacterDisposition");
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {
            if (this.characterDisposition[_character].hasOwnProperty(_dispositionType)) {
                return 0;
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
        if (this.characterDisposition.hasOwnProperty(_character)) {
            if (this.characterDisposition[_character].hasOwnProperty(_dispositionType)) {
                if (this.godMode) {
                    return Number.MAX_SAFE_INTEGER;
                }
                return this.characterDisposition[_character][_dispositionType];
            }
            else {
                if (this.godMode) {
                    return {
                        "passion":Number.MAX_SAFE_INTEGER,
                        "friendship":Number.MAX_SAFE_INTEGER,
                        "playfulness":Number.MAX_SAFE_INTEGER,
                        "soulmate":Number.MAX_SAFE_INTEGER,
                        "familial":Number.MAX_SAFE_INTEGER,
                        "obsession":Number.MAX_SAFE_INTEGER,
                        "hate":Number.MIN_SAFE_INTEGER
                    };
                }
                return this.characterDisposition[_character];
            }
        }
        else
            return false;
    }
    hasCharacterDisposition(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {
            return false;
        }
        if (this.godMode) {
            return true;
        }
        return this.characterDisposition.hasOwnProperty(_character);
    }
    getCharacterDispositions() {
        return this.characterDisposition;
    }
    hasMet(_character) {
        return this.hasCharacterDisposition(_character);
    }

    hasColouration() {
        return typeof this.furColourA != 'undefined';
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

    getStance() {
    	return this.stance.getValue();
    }
    isCrouching() {
        return this.stance.getValue() == ActionEnum.CROUCH;
    }
    isLying() {
        return this.stance.getValue() == ActionEnum.LAY;
    }
    isSleeping() {
        return this.sleeping == true;
    }
    isSitting() {
        return this.stance.getValue() == ActionEnum.SIT;
    }
    isStanding() {
        return this.stance.getValue() == ActionEnum.STAND;
    }
    isFlying() {
        return this.stance.getValue() == ActionEnum.FLY;
    }

    setPaws(_type) {
        if (isNaN(_type)) {
            return this;
        }
        if (PawEnum.properties.hasOwnProperty(_type)) {
            this.pawType = _type;
        }
        else {
            this.pawType = PawEnum.PAD;
        }
        return this;
    }

    setEyeType(_type) {
        if (isNaN(_type)) {
            return this;
        }
        if (EyeEnum.properties.hasOwnProperty(_type)) {
            this.eyeType = _type;
        }
        else {
            this.eyeType = EyeEnum.CIRCLE;
        }
        return this;
    }
    getEyeType() {
        return this.eyeType;
    }
    setEyeColour(_colour) {
        if (typeof _colour != "string") {
            _colour = "gray";
        }
        else {
            _colour = _colour.toLowerCase();
        }
        this.eyeColour = _colour;
        this.eyeColourHex = Game.Tools.colourNameToHex(_colour.replace(/[^a-z]/g, ""));
        return this;
    }
    getEyeColour() {
        return this.eyeColour;
    }
    setEyeColourHex(_hexColour) {
        this.eyeColourHex = _hexColour;
        return this;
    }

    setPelt(_type) {
        if (isNaN(_type)) {
            return this;
        }
        if (PeltEnum.properties.hasOwnProperty(_type)) {
            this.peltType = _type;
        }
        else {
            this.peltType = PeltEnum.FUR;
        }
        return this;
    }
    setFurColourA(_colour) {
        this.furColourA = _colour;
        this.furColourAHex = Game.Tools.colourNameToHex(_colour.replace(/[^a-z]/g, ""));
        return this;
    }
    setFurColourB(_colour) {
        this.furColourB = _colour;
        this.furColourBHex = Game.Tools.colourNameToHex(_colour.replace(/[^a-z]/g, ""));
        return this;
    }
    setFurColour(_colourA, _colourB = undefined) {
        if (typeof _colourB == 'undefined')
            _colourB = _colourA;
        
        this.setFurColourA(_colourA);
        this.setFurColourB(_colourB);
        return this;
    }
    setFurColourAHex(_hexColour) {
        this.furColourAHex = _hexColour;
        return this;
    }
    setFurColourBHex(_hexColour) {
        this.furColourBHex = _hexColour;
        return this;
    }
    setFurColourHex(_colourA, _colourB = undefined) {
        if (typeof _colourB == 'undefined')
            _colourB = _colourA;
        
        this.setFurColourAHex(_colourA);
        this.setFurColourBHex(_colourB);
        return this;
    }
    setSpecies(_species) {
        if (isNaN(_species)) {
            return this;
        }
        if (SpeciesEnum.properties.hasOwnProperty(_species)) {
            this.species = _species;
        }
        else {
            this.species = SpeciesEnum.FOX;
        }
        return this;
    }
    _generateProperties() {
        if (this.species == SpeciesEnum.FOX) {
            if (this.getSex() == SexEnum.MALE) {
                this._baseWeight = 36;
                this._baseHeight = 1.20;
                this._baseWidth = 0.4;
            }
            else {
                this._baseWeight = 32;
                this._baseHeight = 1.12;
                this._baseWidth = 0.37;
            }

            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.SHEEP) {
            if (this.getSex() == SexEnum.MALE) {
                this._baseWeight = 34;
                this._baseHeight = 1.35;
                this._baseWidth = 0.45;
            }
            else {
                this._baseWeight = 28;
                this._baseHeight = 1.0;
                this._baseWidth = 0.33;
            }
            
            this.predator = false;
            this.setPaws(PawEnum.HOOF);
            this.setEyeType(EyeEnum.OBLONG);
            this.setPelt(PeltEnum.WOOL);
        }
        else if (this.species == SpeciesEnum.WOLF) {
            if (this.getSex() == SexEnum.MALE) {
                this._baseHeight = 1.9;
                this._baseWidth = 0.63;
            }
            else {
                this._baseWeight = 66;
                this._baseHeight = 1.8;
                this._baseWidth = 0.6;
            }

            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.AARDWOLF) {
            if (this.getSex() == SexEnum.MALE) {
                this._baseWeight = 32;
                this._baseHeight = 1.10;
                this._baseWidth = 0.36;
            }
            else {
                this._baseWeight = 28;
                this._baseHeight = 1.02;
                this._baseWidth = 0.34;
            }

            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.HYENA) {
            if (this.getSex() == SexEnum.MALE) {
                this._baseWeight = 58;
                this._baseHeight = 1.6;
                this._baseWidth = 0.53;
            }
            else {
                this._baseWeight = 62;
                this._baseHeight = 1.75;
                this._baseWidth = 0.58;
            }

            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.STOAT) {
            if (this.getSex() == SexEnum.MALE) {
                this._baseWeight = 10;
                this._baseHeight = 0.6;
                this._baseWidth = 0.2;
            }
            else {
                this._baseWeight = 8;
                this._baseHeight = 0.5;
                this._baseWidth = 0.16;
            }

            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.DEER) {
            if (this.getSex() == SexEnum.MALE) {
                this._baseWeight = 78;
                this._baseHeight = 2.2;
                this._baseWidth = 0.7;
            }
            else {
                this._baseWeight = 60;
                this._baseHeight = 1.9;
                this._baseWidth = 0.6;
            }
            
            this.predator = false;
            this.setPaws(PawEnum.HOOF);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.WOOL);
        }
        else if (this.species == SpeciesEnum.RABBIT) {
            if (this.getSex() == SexEnum.MALE) {
                this._baseWeight = 22;
                this._baseHeight = 0.95;
                this._baseWidth = 0.34;
            }
            else {
                this._baseWeight = 14.9;
                this._baseHeight = 0.81;
                this._baseWidth = 0.3;
            }
            
            this.predator = false;
            this.setPaws(PawEnum.FUR);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.JACKAL) {
            if (this.getSex() == SexEnum.MALE) {
                this._baseWeight = 55;
                this._baseHeight = 1.6;
                this._baseWidth = 0.53;
            }
            else {
                this._baseWeight = 51;
                this._baseHeight = 1.55;
                this._baseWidth = 0.5;
            }
            
            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.COYOTE) {
            if (this.getSex() == SexEnum.MALE) {
                this._baseWeight = 36;
                this._baseHeight = 1.20;
                this._baseWidth = 0.4;
            }
            else {
                this._baseWeight = 32;
                this._baseHeight = 1.12;
                this._baseWidth = 0.37;
            }
            
            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.TIGER) {
            if (this.getSex() == SexEnum.MALE) {
                this._baseWeight = 88;
                this._baseHeight = 2.2;
                this._baseWidth = 0.73;
            }
            else {
                this._baseWeight = 82;
                this._baseHeight = 2.0;
                this._baseWidth = 0.66;
            }
            
            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.ANTELOPE) {
            if (this.getSex() == SexEnum.MALE) {
                this._baseWeight = 68;
                this._baseHeight = 2.0;
                this._baseWidth = 0.66;
            }
            else {
                this._baseWeight = 60;
                this._baseHeight = 1.9;
                this._baseWidth = 0.63;
            }
            
            this.predator = false;
            this.setPaws(PawEnum.HOOF);
            this.setEyeType(EyeEnum.OBLONG);
            this.setPelt(PeltEnum.HAIR);
        }
        else if (this.species == SpeciesEnum.PIG) {
            if (this.getSex() == SexEnum.MALE) {
                this._baseWeight = 46;
                this._baseHeight = 1.3;
                this._baseWidth = 0.54;
            }
            else {
                this._baseWeight = 44;
                this._baseHeight = 1.2;
                this._baseWidth = 0.5;
            }
            
            this.predator = false;
            this.setPaws(PawEnum.HOOF);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.SKIN);
        }
        else if (this.species == SpeciesEnum.HORSE) {
            if (this.getSex() == SexEnum.MALE) {
                this._baseWeight = 82;
                this._baseHeight = 2.0;
                this._baseWidth = 0.66;
            }
            else {
                this._baseWeight = 78;
                this._baseHeight = 1.9;
                this._baseWidth = 0.63;
            }
            
            this.predator = false;
            this.setPaws(PawEnum.HOOF);
            this.setEyeType(EyeEnum.OBLONG);
            this.setPelt(PeltEnum.HAIR);
        }
        else if (this.species == SpeciesEnum.MOUSE) {
            if (this.getSex() == SexEnum.MALE) {
                this._baseWeight = 0.4;
                this._baseHeight = 0.16;
                this._baseWidth = 0.05;
            }
            else {
                this._baseWeight = 0.4;
                this._baseHeight = 0.15;
                this._baseWidth = 0.05;
            }
            
            this.predator = false;
            this.setPaws(PawEnum.SKIN);
            this.setEyeType(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        if (this.age.getValue() > 19) {
            this.height = this._baseHeight;
        }
        else {
            let _addition = 0;
            if (this.age.getValue() > 17) {
                _addition = .45;
            }
            else if (this.age.getValue() > 15) {
                _addition = .35;
            }
            else if (this.age.getValue() > 13) {
                _addition = .25;
            }
            else if (this.age.getValue() > 11) {
                _addition = .15;
            }
            /* I just bullshitted the weight :v */
            let _tempWeight = this._baseWeight*(this.age.getValue()/25);
            _tempWeight = _tempWeight + (_tempWeight * _addition);
            if (_tempWeight < this._baseWeight/6) {
                this.weight = this._baseHeight/6;
            }
            else if (_tempWeight > this._baseWeight) {
                this.weight = this._baseWeight;
            }
            else {
                this.weight = _tempWeight;
            }
            let _tempHeight = this._baseHeight*(this.age.getValue()/25);
            _tempHeight = _tempHeight + (_tempHeight * _addition);
            if (_tempHeight < this._baseHeight/6) {
                this.height = this._baseHeight/6;
            }
            else if (_tempHeight > this._baseHeight) {
                this.height = this._baseHeight;
            }
            else {
                this.height = _tempHeight;
            }
        }
        /**
         * Width is 1/3rd(-ish) of height, times the ratio of weight to base weight
         * @type {Number}
         */
        this.width = (this.height / 3.5294) * (this.weight / this._baseWeight);
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
    _generateBaseStats() {
        this.setMaxHealth(this.getConstitution()/2 + this.getStrength()/2 + (this.getLevel() * this.getConstitution/10));
        this.setMaxMana(this.getIntelligence() * this.magickMultiplier.getValue());
        this.setMaxStamina(this.getStrength() + this.getWisdom() + this.getDexterity() + this.getConstitution());
        this.setHealth(this.getMaxHealth());
        this.setMana(this.getMaxMana());
        this.setStamina(this.getMaxStamina());
    }
    /**
     * Generates protections and multipliers; to be run after status effects and equipment are changed
     */
    _generateAdditionalStats() {
        this.physicalMultiplier = 0;
        this.magickMultiplier = 0;
        for (let _slot in this.equipment) {
            if (this.equipment[_slot] instanceof ClothingEntity) {
                let _multiplier = 0;
                switch (this.equipment[_slot].getEquipmentSlot()) {
                    case ApparelSlotEnum.CHEST: {
                        _multiplier = 0.3;
                        break;
                    }
                    case ApparelSlotEnum.HAND_L:
                    case ApparelSlotEnum.HAND_R:
                    case ApparelSlotEnum.HANDS: {
                        _multiplier = 0.05;
                    }
                    default: {
                        _multiplier = 0.1;
                    }
                }
                this.physicalProtection += this.equipment[_slot].getPhysicalProtection() * _multiplier;
                this.magickProtection += this.equipment[_slot].getMagickProtection() * _multiplier;
            }
        }
    }
    getSpecies() {
        return this.species;
    }

    addSpell(_spell) {
        if (!(_spell instanceof Spell)) {
            if (Game.spells.has(_spell))
                _spell = Game.spells.get(_spell);
            else
                return this;
        }
        this.spells.add(_spell);
        return this;
    }
    removeSpell(_spell) {
        if (!(_spell instanceof Spell)) {
            if (Game.spells.has(_spell))
                _spell = Game.spells.get(_spell);
            else
                return this;
        }
        this.spells.delete(_spell);
        return true;
    }

    addNewDisposition(_character, passionOffset = 0, friendshipOffset = 0, playfulnessOffset = 0, soulmateOffset = 0, familialOffset = 0, obsessionOffset = 0, hateOffset = 0) {
        this.characterDisposition[_character] = {
            passion:_passionOffset + this.defaultDisposition.passion,
            friendship:_friendshipOffset + this.defaultDisposition.friendship,
            playfulness:_playfulnessOffset + this.defaultDisposition.playfulness,
            soulmate:_soulmateOffset + this.defaultDisposition.soulmate,
            familial:_familialOffset + this.defaultDisposition.familial,
            obsession:_obsessionOffset + this.defaultDisposition.obsession,
            hate:_hateOffset + this.defaultDisposition.hate
        }
        return this;
    }

    setDialogue(_dialogue) {
        _dialogue = Game.getDialogue(_dialogue);
        if (_dialogue instanceof Dialogue) {
            this.dialogue = _dialogue;
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
    enableGodMode() {
        this.godMode = true;
    }
    disableGodMode() {
        this.godMode = false;
    }
    hasGodMode() {
        return this.godMode;
    }
    setLiving(_bool = true) {
        this.living = _bool == true;
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
    kill() {
        this.setHealth(0);
        return this;
    }
    resurrect() {
        this.setHealth(this.getHealthMax());
        this.setStamina(this.getStaminaMax());
        this.setMana(this.getMaxMana());
        this.living = true;
        return this;
    }

    dispose() {
        if (this == Game.player.entity) {
            return false;
        }
        Game.removeCharacterEntity(this.id);
        super.dispose();
        for (var _var in this) {
            this[_var] = null;
        }
        return undefined;
    }
}