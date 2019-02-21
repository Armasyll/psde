class CharacterEntity extends EntityWithStorage {
    /**
     * Creates a CharacterEntity
     * @param  {String} _id      Unique ID
     * @param  {String} _name    Name
     * @param  {String} _description Description
     * @param  {String} _image   Image path
     * @param  {String} _class   Role
     * @param  {Number} _age     Age
     * @param  {Number} _sex     Sex (0 Male, 1 Female, 2 Herm)
     * @param  {String} _species Species
     */
    constructor(_id = "nickWilde", _name = "Wilde, Nicholas", _description = undefined, _image = "genericCharacterIcon", _characterClass = CharacterClassEnum.CLASSLESS, _age = 33, _sex = SexEnum.MALE, _species = SpeciesEnum.FOX) {
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
        this._sex = new BoundedNumber(0, 0, 2);
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
         * Locations known by this Character
         * @type {Set} <Location>
         */
        this.knownLocations = new Set();
        /**
         * Spells known by this Character
         * @type {Set} <Spell>
         */
        this.spells = new Set();
        /**
         * Dominant hand
         * @type {String} "hand.l" or "hand.r"
         */
        this.handedness = "hand.r";
        /**
         * Mesh IDs this CharacterEntity has attached; they're really just meshes :l
         * @type {<String, <String, BABYLON.InstancedMesh>>} Bone ID and Mesh ID, and BABYLON.InstancedMesh
         */
        this.attachedCosmetics = {
            "ROOT":{},
            "FOCUS":{},
            "head":{},
            "ear.l":{},
            "ear.r":{},
            "eye.l":{},
            "eye.r":{},
            "neck":{}
        };
        /**
         * Entities this CharacterEntity has equipped
         * @type {<String, InstancedEntity>} Bone ID and InstancedEntity
         */
        this.equippedEntities = {
            "ear.l":null,
            "ear.r":null,
            "hand.l":null,
            "hand.r":null,
            "head":null,
            "neck":null
        };
        /**
         * Current Phone this CharacterEntity is using
         * @type {Phone} Can be undefined
         */
        this.phone = undefined;
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
         * This Character's love for themself
         * @type {Number} 0 to 100
         */
        this.philautia = new BoundedNumber(50, 0, 100);
        /**
         * This Character's love for others
         * @type {Number} 0 to 100
         */
        this.agape = new BoundedNumber(50, 0, 100);
        /**
         * Optimism, carefree attitude, pleasure-seeking; may compliment philautia
         * @type {Number} 0 to 100
         */
        this.sanguine = new BoundedNumber(0, 0, 100);
        /**
         * Caring, preservation, helpfulness; may compliment agape
         * @type {Number} 0 to 100
         */
        this.phlegmatic = new BoundedNumber(0, 0, 100);
        /**
         * Practical, logical, asocial
         * @type {Number} 0 to 100
         */
        this.choleric = new BoundedNumber(0, 0, 100);
        /**
         * Tradition, stability, order
         * @type {Number} 0 to 100
         */
        this.melancholic = new BoundedNumber(0, 0, 100);
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
        /**
         * Agility
         * @type {Number}
         */
        this.dexterity = new BoundedNumber(10, 1, 30);
        /**
         * Endurance
         * @type {Number}
         */
        this.constitution = new BoundedNumber(10, 1, 30);
        /**
         * Reasoning and memory
         * @type {Number}
         */
        this.intelligence = new BoundedNumber(10, 1, 30);
        /**
         * Perception and insight
         * @type {Number}
         */
        this.wisdom = new BoundedNumber(10, 1, 30);
        /**
         * Force of personality
         * @type {Number}
         */
        this.charisma = new BoundedNumber(10, 1, 30);
        this.experiencePoints = new BoundedNumber(0, Game.XP_MIN, Game.XP_MAX);
        this.level = new BoundedNumber(1, Game.LEVEL_MIN, Game.LEVEL_MAX);
        this.durability.set(100, 0, 100);
        /**
         * Mana; should this ever be greater than 0, things will be revealed
         * @type {Number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.mana = new BoundedNumber(0, 0, 0);
        /**
         * Mana cost offset percentage when casting spells
         * @type {Number} -100 to 100
         */
        this.manaCostOffsetPercent = new BoundedNumber(0, -100, 100);
        /**
         * Stamina; should this drop to 0, u unconscious
         * @type {Number} 0 to 100
         */
        this.stamina = new BoundedNumber(100, 0, 100);
        /**
         * Money
         * @type {Number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.money = new BoundedNumber(0, 0, Number.MAX_SAFE_INTEGER);
        /**
         * Sanity; may affect mana regeneration, mana, and manaCostOffsetPercent
         * @type {Number} 0 to 100
         */
        this.sanity = new BoundedNumber(100, 0, 100);
        /**
         * Lust
         * @type {Number} 0 to 100
         */
        this.lust = new BoundedNumber(25, 0, 100);
        /**
         * Whether or not this CharacterEntity is in rut
         * @type {Boolean} True - yes, false - no
         */
        this.rut = false;
        /**
         * Whether or not this CharacterEntity is sleeping
         * @type {Boolean} True - yes, false - no
         */
        this.sleeping = false;
        /**
         * Cleanliness
         * @type {Number} 0 - filthy, 100 clean
         */
        this.cleanliness = 100;
        /**
         * Sex odor
         * @type {Number} 0 - none, 100 reek
         */
        this.odorSex = 0;
        /**
         * Sweat odor
         * @type {Number} 0 - none, 100 reek
         */
        this.odorSweat = 0;
        /**
         * Annoyed
         * @type {Number} 0 - none, 100 agitated
         */
        this.annoyed = 0;
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
         * Size in reference to a tundra wolf
         * @type {Number}
         */
        this.bodySize = 0.5;
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
         * Relatives
         * @type {Array} <Character>
         */
        this.biologicalParents = new Array();
        this.fosterParents = new Array();
        this.biologicalChildren = new Array();
        this.fosterChildren = new Array();

        this.spouse = undefined;
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
         * Pelt trimmed
         * @type {Number} 0 to 100
         */
        this.peltTrimmed = 50;
        /**
         * Penis size in centimeters
         * @type {Number} 0 - none, 100 - CharacterEntity dies from blood loss
         */
        this.penisSize = 0;
        /**
         * Penis girth in centimeters
         * @type {Number} 0 - none, 100 - CharacterEntity dies from blood loss
         */
        this.penisGirth = 0;
        /**
         * Vaginal depth in centimeters
         * @type {Number} 0 - none, 100 - CharacterEntity is basically a trash bag
         */
        this.vaginaSize = 0;
        /**
         * Vaginal girth in centimeters
         * @type {Number} 0 - none, 100 - CharacterEntity is basically a trash bag
         */
        this.vaginaGirth = 0;
        /**
         * Virgin
         * @type {Boolean} True - virgin, false - not a virgin
         */
        this.virgin = true;
        /**
         * Had sex with a male
         * @type {Boolean} True - had sex with a male, false - didn't have sex with a male
         */
        this.hadSexWithMale = false;
        /**
         * Had sex with a female
         * @type {Boolean} True - had sex with a female, false - didn't have sex with a female
         */
        this.hadSexWithFemale = false;
        /**
         * Number of times this CharacterEntity has had sex
         * @type {Number}
         */
        this.sexCount = 0;
        /**
         * Map of Characters and the Number of times this CharacterEntity has had sex with them
         * @type {Map} <Character, integer>
         */
        this.sexCountMap = new Map();
        /**
         * Map of Characters and the Number of times this CharacterEntity has been refused sex with them
         * @type {Map} <Character, integer>
         */
        this.sexRefusalCountMap = new Map();
        /**
         * Number of times this CharacterEntity has received vaginal
         * @type {Number}
         */
        this.vaginalReceiveCount = 0;
        /**
         * Map of Characters and the Number of times this CharacterEntity has received vaginal from them
         * @type {Map} <Character, Number>
         */
        this.vaginalReceiveCountMap = new Map();
        /**
         * Number of times this CharacterEntity has given vaginal
         * @type {Number}
         */
        this.vaginalGiveCount = 0;
        /**
         * Map of Characters and the Number of times this CharacterEntity has given them vaginal
         * @type {Map} <Character, Number>
         */
        this.vaginalGiveCountMap = new Map();
        /**
         * Number of times this CharacterEntity has received anal
         * @type {Number}
         */
        this.analReceiveCount = 0;
        /**
         * Map of Characters and the Number of times this CharacterEntity has received anal from them
         * @type {Map} <Character, Number>
         */
        this.analReceiveCountMap = new Map();
        /**
         * Number of times this CharacterEntity has given anal
         * @type {Number}
         */
        this.analGiveCount = 0;
        /**
         * Map of Characters and the Number of times this CharacterEntity has given them anal
         * @type {Map} <Character, Number>
         */
        this.analGiveCountMap = new Map();
        /**
         * Number of times this CharacterEntity has received cunnilingus
         * @type {Number}
         */
        this.cunnilingusReceiveCount = 0;
        /**
         * Map of Characters and the Number of times this CharacterEntity has received cunnilingus from them
         * @type {Map} <Character, Number>
         */
        this.cunnilingusReceiveCountMap = new Map();
        /**
         * Number of times this CharacterEntity has given cunnilingus
         * @type {Number}
         */
        this.cunnilingusGiveCount = 0;
        /**
         * Map of Characters and the Number of times this CharacterEntity has given them cunnilingus
         * @type {Map} <Character, Number>
         */
        this.cunnilingusGiveCountMap = new Map();
        /**
         * Number of times this CharacterEntity has received analingus
         * @type {Number}
         */
        this.analingusReceiveCount = 0;
        /**
         * Map of Characters and the Number of times this CharacterEntity has received analingus from them
         * @type {Map} <Character, Number>
         */
        this.analingusReceiveCountMap = new Map();
        /**
         * Number of times this CharacterEntity has given analingus
         * @type {Number}
         */
        this.analingusGiveCount = 0;
        /**
         * Map of Characters and the Number of times this CharacterEntity has given them analingus
         * @type {Map} <Character, Number>
         */
        this.analingusGiveCountMap = new Map();
        /**
         * Number of times this CharacterEntity has received fellatio
         * @type {Number}
         */
        this.fellatioReceiveCount = 0;
        /**
         * Map of Characters and the Number of times this CharacterEntity has received fellatio from them
         * @type {Map} <Character, Number>
         */
        this.fellatioReceiveCountMap = new Map();
        /**
         * Number of times this CharacterEntity has given fellatio
         * @type {Number}
         */
        this.fellatioGiveCount = 0;
        /**
         * Map of Characters and the Number of times this CharacterEntity has given them fellatio
         * @type {Map} <Character, Number>
         */
        this.fellatioGiveCountMap = new Map();
        /**
         * Number of times this CharacterEntity has received a handjob
         * @type {Number}
         */
        this.handjobReceiveCount = 0;
        /**
         * Map of Characters and the Number of times this CharacterEntity has received a handjob from them
         * @type {Map} <Character, Number>
         */
        this.handjobReceiveCountMap = new Map();
        /**
         * Number of times this CharacterEntity has given a handjob
         * @type {Number}
         */
        this.handjobGiveCount = 0;
        /**
         * Map of Characters and the Number of times this CharacterEntity has given them a handjob
         * @type {Map} <Character, Number>
         */
        this.handjobGiveCountMap = new Map();
        /**
         * Number of times this CharacterEntity has masturbated
         * @type {Number}
         */
        this.masturbateCount = 0;
        /**
         * Number of times this CharacterEntity has performed autofellatio
         * @type {Number}
         */
        this.autofellatioCount = 0;
        /**
         * Number of times this CharacterEntity has performed autocunnilingus
         * @type {Number}
         */
        this.autocunnilingusCount = 0;
        /**
         * Number of times this CharacterEntity has performed autoanalingus
         * @type {Number}
         */
        this.autoanalingusCount = 0;
        /**
         * The CharacterEntity this CharacterEntity is following
         * @type {Character} Can be undefined
         */
        this.following = undefined; // Character
        /**
         * Set of Character(s) this CharacterEntity is leading
         * @type {Set} <Character>
         */
        this.followers = new Set(); // Set<Character>
        /**
         * Current Furniture this CharacterEntity is using
         * @type {Furniture} Can be undefined
         */
        this.furniture = undefined;
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
         * Set of Characters that are currently being dated
         * @type {Set} <Character>
         */
        this._dating = new Set();
        /**
         * Map of Characters and the Number of times this CharacterEntity has dated them
         * @type {Map} <Character, Number>
         */
        this._dated = new Map();
        /**
         * Preference for species
         * @type {Set}
         */
        this.prefersSpecies = new Set(); // Set<species>
        /**
         * Preference for avoiding species
         * @type {Set}
         */
        this.avoidsSpecies = new Set(); // Set<species>
        /**
         * Sexual orientation
         * @type {Number} 0 - straight, 1 - gay, 2 - bi
         */
        this.sexualOrientation = new BoundedNumber(0, 0, 2);
        /**
         * Preferred penis size in males
         * @type {Number}
         */
        this.preferredPenisSize = 0;
        /**
         * Preferred penis girth in males
         * @type {Number}
         */
        this.preferredPenisGirth = 0;
        /**
         * Preferred breast size in females
         * @type {Number}
         */
        this.preferredBreastSize = 0;
        /**
         * Preference for predators
         * @type {Boolean} True - prefers predators, false - doen't prefer predators
         */
        this.prefersPredators = false;
        /**
         * Preference for avoiding predators
         * @type {Boolean} True - avoids predators, false - doesn't avoid predators
         */
        this.avoidsPredators = false;
        /**
         * Preference for prey
         * @type {Boolean} True - prefers prey, false - doesn't prefer prey
         */
        this.prefersPrey = false;
        /**
         * Preference for avoiding prey
         * @type {Boolean} True - avoids prey, false - Doesn't avoid prey
         */
        this.avoidsPrey = false;
        /**
         * Preference for public sex
         * @type {Number} 0 to 100
         */
        this.exhibitionism = new BoundedNumber(0, 0, 100);
        /**
         * Preference for sleep sex
         * @type {Number} 0 to 100
         */
        this.somnophilia = new BoundedNumber(0, 0, 100);
        /**
         * Drunkenness
         * @type {Number} 0 to 100
         */
        this.intoxication = new BoundedNumber(0, 0, 100);
        /**
         * Alcohol tolerance
         * @type {Number} 0 to 100
         */
        this.alcoholTolerance = new BoundedNumber(0, 0, 100);
        /**
         * Preference for incest
         * @type {Number} 0 to 100
         */
        this.incestual = new BoundedNumber(0, 0, 100);

        /**
         * Initial dialogue
         * @type {Dialogue}
         */
        this.dialogue = undefined;
        this._godMode = false;

        this.setName(_name);
        this.setImage(_image);
        this.setClass(_characterClass);
        this.setAge(_age);
        this.setSex(_sex);
        this.setGender(_sex);
        this.setSpecies(_species);
        this.addAvailableAction(ActionEnum.ATTACK);
        this.addAvailableAction(ActionEnum.HOLD);
        this.addAvailableAction(ActionEnum.OPEN); // inventory... maybe :v
        this.addAvailableAction(ActionEnum.GIVE);
        this.addAvailableAction(ActionEnum.TAKE);

        Game.setCharacterEntity(this.id, this);

        this._generateProperties();
        this.stand();
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

    calculateManaCost(_cost = 0) {
        if (!isNaN(_cost)) {
            _cost = 0;
        }
        else if (_cost instanceof Spell) {
            _cost = _cost.manaCost;
        }
        else if (Game.spells.has(_cost)) {
            _cost = Game.spells.get(_cost).manaCost;
        }
        if (this.manaCostOffsetPercent.get() == 0 || _cost == 0) {
            return _cost;
        }
        else if (_cost < 0 || this.manaCostOffsetPercent.get() == 100) {
            return 0;
        }
        else {
            return _cost - (_cost / (100 / this.manaCostOffsetPercent.get()));
        }
    }

    getEquipment() {
        return this.equippedEntities;
    }
    equipEntity(_entity, _bone = undefined) {
        if (_bone instanceof BABYLON.Bone) {
            _bone = _bone.id;
        }
        _entity = Game.getEntity(_entity);
        if (!(_entity instanceof AbstractEntity)) {
            return this;
        }
        if (!(this.equippedEntities.hasOwnProperty(_bone))) {
            
        }
        this.equippedEntities[_bone] = _entity;
        if (this.controller instanceof CharacterController && this.controller.hasMesh()) {
            switch (_bone) {
                case "head": {
                    this.controller.attachToHead(_entity.getMeshID(), _entity.getTextureID());
                }
                case "hand.r": {
                    this.controller.attachToRightHand(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                case "hand.l": {
                    this.controller.attachToLeftHand(_entity.getMeshID(), _entity.getTextureID());
                    break;
                }
                default: {
                    this.controller.attachToBone(_entity.getMeshID(), _entity.getTextureID(), _bone);
                }
            }
        }
        return this;
    }
    unequipEntity(_blob) {
        if (_blob instanceof BABYLON.Bone || this.equippedEntities.hasOwnProperty(_blob)) {
            return this.unequipByBone(_blob);
        }
        else {
            return this.unequipByEntity(_blob);
        }
    }
    unequipByEntity(_entity) {
        _entity = Game.getEntity(_entity);
        var _bone = null;
        if (_entity instanceof AbstractEntity) {
            for (var _i in this.equippedEntities) {
                if (this.equippedEntities[_i] == _entity) {
                    this.equippedEntities[_i] = null;
                    _bone = _i;
                }
            }
        }
        if (this.controller instanceof CharacterController && this.controller.hasMesh()) {
            this.controller.detachFromBone(_bone);
        }
        return this;
    }
    unequipByBone(_bone) {
        if (_bone instanceof BABYLON.Bone) {
            _bone = _bone.id;
        }
        this.equippedEntities[_bone] = null;
        if (this.controller instanceof CharacterController && this.controller.hasMesh()) {
            this.controller.detachFromBone(_bone);
        }
        return this;
    }
    hasEquippedEntity(_blob) {
        if (_blob instanceof BABYLON.Bone) {
            _blob = _blob.id;
        }
        if (this.equippedEntities.hasOwnProperty(_blob)) {
            return this.equippedEntities[_blob] != null;
        }
        _blob = Game.getEntity(_blob);
        if (!(_blob instanceof AbstractEntity)) {
            return false;
        }
        for (var _bone in this.equippedEntities) {
            if (this.equippedEntities[_bone] instanceof AbstractEntity) {
                if (this.equippedEntities[_bone].id == _blob.id) {
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

    clean() {
        this.cleanliness = 100;
        this.odorSex = 0;
        this.odorSweat = 0;
        return this;
    }

    setAge(_int) {
        this.age.set(_int);
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
        this.hunger.set(_int);
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
        this.strength.set(_int);
        return this;
    }
    addStrength(_int) {
        return this.strength.inc(_int);
    }
    subtractStrength(_int) {
        return this.strength.dec(_int);
    }
    getStrength() {
        if (this._godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.strength.getValue();
    }
    setDexterity(_int) {
        this.dexterity.set(_int);
        return this;
    }
    addDexterity(_int) {
        return this.dexterity.inc(_int);
    }
    subtractDexterity(_int) {
        return this.dexterity.dec(_int);
    }
    getDexterity() {
        if (this._godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.dexterity.getValue();
    }
    setConstitution(_int) {
        this.constitution.set(_int);
        return this;
    }
    addConstitution(_int) {
        return this.constitution.inc(_int);
    }
    subtractConstitution(_int) {
        return this.constitution.dec(_int);
    }
    getConsitution() {
        if (this._godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.constitution.getValue();
    }
    setIntelligence(_int) {
        this.intelligence.set(_int);
        return this;
    }
    addIntelligence(_int) {
        return this.intelligence.inc(_int);
    }
    subtractIntelligence(_int) {
        return this.intelligence.dec(_int);
    }
    getIntelligence() {
        if (this._godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.intelligence.getValue();
    }
    setWisdom(_int) {
        this.wisdom.set(_int);
        return this;
    }
    addWisdom(_int) {
        return this.wisdom.inc(_int);
    }
    subtractWisdom(_int) {
        return this.wisdom.dec(_int);
    }
    getWisdom() {
        if (this._godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.wisdom.getValue();
    }
    setCharisma(_int) {
        this.charisma.set(_int);
        return this;
    }
    addCharisma(_int) {
        return this.charisma.inc(_int);
    }
    subtractCharisma(_int) {
        return this.charisma.dec(_int);
    }
    getCharisma() {
        if (this._godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.charisma.getValue();
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

    setLevel(_int = 0) {
        this.level.set(_int);
        this.experiencePoints.set(Game.calculateXP(_int));
        return this;
    }
    getLevel() {
        if (this._godMode) {
            return this.level.getMax();
        }
        return this.level.getValue();
    }
    setXP(_int = 0) {
        this.experiencePoints.set(_int);
        this.level.set(Game.calculateLevel(_int));
        return this;
    }
    addXP(_int) {
        return this.experiencePoints.inc(_int);
    }
    subtracttractXP(_int) {
        return this.experiencePoints.dec(_int);
    }
    getXP() {
        if (this._godMode) {
            return this.experiencePoints.getMax();
        }
        return this.experiencePoints.getValue();
    }

    setLife(_int) {
        this.durability.set(_int);
        return this;
    }
    addLife(_int = 1) {
        return this.durability.inc(_int);
    }
    subtractLife(_int = 1) {
        return this.durability.dec(_int);
    }
    getLife() {
        if (this._godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.durability.getValue();
    }

    setMaxLife(_int) {
        this.durability.setMax(_int);
        return this;
    }
    addMaxLife(_int = 1) {
        return this.durability.incMax(_int);
    }
    subtractMaxLife(_int = 1) {
        return this.durability.decMax(_int);
    }
    getMaxLife() {
        if (this._godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.durability.getMax();
    }

    setMana(_int) {
        this.mana.set(_int);
        return this;
    }
    addMana(_int = 1) {
        return this.mana.inc(_int);
    }
    subtractMana(_int = 1) {
        return this.mana.dec(_int);
    }
    getMana() {
        if (this._godMode) {
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
        if (this._godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.mana.getMax();
    }

    setManaCostOffsetPercent(_int) {
        this.manaCostOffsetPercent.set(_int);
        return this;
    }
    addManaCostOffsetPercent(_int = 1) {
        return this.manaCostOffsetPercent.inc(_int);
    }
    subtractManaCostOffsetPercent(_int = 1) {
        return this.manaCostOffsetPercent.dec(_int);
    }
    getManaCostOffsetPercent() {
        if (this._godMode) {
            return this.manaCostOffsetPercent.getMax();
        }
        return this.manaCostOffsetPercent.getValue();
    }

    setStamina(_int) {
        this.stamina.set(_int);
        return this;
    }
    addStamina(_int) {
        return this.stamina.inc(_int);
    }
    subtracttractStamina(_int) {
        return this.stamina.dec(_int);
    }
    getStamina() {
        if (this._godMode) {
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
    subtracttractMaxStamina(_int) {
        return this.stamina.decMax(_int);
    }
    getMaxStamina() {
        if (this._godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.stamina.getMax();
    }

    setMoney(_int) {
        this.money.set(_int);
        return this;
    }
    addMoney(_int) {
        return this.money.inc(_int);
    }
    subtractMoney(_int) {
        return this.money.dec(_int);
    }
    getMoney() {
        if (this._godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.money.getValue();
    }
    getMaxMoney() {
        if (this._godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.money.getMax();
    }

    setSanity(_int) {
        this.sanity.set(_int);
        return this;
    }
    addSanity(_int) {
        return this.sanity.inc(_int);
    }
    subtractSanity(_int) {
        return this.sanity.dec(_int);
    }
    getSanity() {
        return this.sanity.getValue();
    }

    setPhilautia(_int) {
        this.philautia.set(_int);
        return this;
    }
    addPhilautia(_int) {
        return this.philautia.inc(_int);
    }
    subtractPhilautia(_int) {
        return this.philautia.dec(_int);
    }
    getPhilautia() {
        return this.philautia.getValue();
    }

    setAgape(_int) {
        this.agape.set(_int);
        return this;
    }
    addAgape(_int) {
        return this.agape.inc(_int);
    }
    subtractAgape(_int) {
        return this.agape.dec(_int);
    }
    getAgape() {
        return this.agape.getValue();
    }

    setSanguine(_int) {
        this.sanguine.set(_int);
        return this;
    }
    addSanguine(_int) {
        return this.sanguine.inc(_int);
    }
    subtractSanguine(_int) {
        return this.sanguine.dec(_int);
    }
    getSanguine() {
        return this.sanguine.getValue();
    }

    setPhlegmatic(_int) {
        this.phlegmatic.set(_int);
        return this;
    }
    addPhlegmatic(_int) {
        return this.phlegmatic.inc(_int);
    }
    subtractPhlegmatic(_int) {
        return this.phlegmatic.dec(_int);
    }
    getPhlegmatic() {
        return this.phlegmatic.getValue();
    }

    setCholeric(_int) {
        this.choleric.set(_int);
        return this;
    }
    addCholeric(_int) {
        return this.choleric.inc(_int);
    }
    subtractCholeric(_int) {
        return this.choleric.dec(_int);
    }
    getCholeric() {
        return this.choleric.getValue();
    }

    setMelancholic(_int) {
        this.melancholic.set(_int);
        return this;
    }
    addMelancholic(_int) {
        return this.melancholic.inc(_int);
    }
    subtractMelancholic(_int) {
        return this.melancholic.dec(_int);
    }
    getMelancholic() {
        return this.melancholic.getValue();
    }

    setLust(_int) {
        this.lust.set(_int);
        return this;
    }
    addLust(_int) {
        return this.lust.inc(_int);
    }
    subtractLust(_int) {
        return this.lust.dec(_int);
    }
    getLust() {
        return this.lust.getValue();
    }

    setExhibitionism(_int) {
        this.exhibitionism.set(_int);
        return this;
    }
    addExhibitionism(_int) {
        return this.exhibitionism.inc(_int);
    }
    subtractExhibitionism(_int) {
        return this.exhibitionism.dec(_int);
    }
    getExhibitionism() {
        return this.exhibitionlism.getValue();
    }

    setSomnophilia(_int) {
        this.somnophilia.set(_int);
        return this;
    }
    addSomnophilia(_int) {
        return this.somnophilia.inc(_int);
    }
    subtractSomnophilia(_int) {
        return this.somnophilia.dec(_int);
    }
    getSomnophilia() {
        return this.somnophilia.getValue();
    }

    setIntoxication(_int) {
        this.intoxication.set(_int);
        return this;
    }
    addIntoxication(_int) {
        return this.intoxication.inc(_int);
    }
    subtractIntoxication(_int) {
        return this.intoxication.dec(_int);
    }
    getIntoxication() {
        return this.intoxication.getValue();
    }

    setIncestual(_int) {
        this.incestual.set(_int);
        return this;
    }
    addIncestual(_int) {
        return this.incestual.inc(_int);
    }
    subtractIncestual(_int) {
        return this.incestual.dec(_int);
    }
    getIncestual() {
        return this.incestual.getValue();
    }

    setRut(_bool) {
        this.rut = (_bool == true);
        return this;
    }
    getRut() {
        return this.rut;
    }

    setSleep(_bool) {
        this.sleeping = (_bool == true);
        return this;
    }
    getSleep() {
        return this.sleeping;
    }

    setLiving(_bool) {
        this.living = (_bool == true);
        return this;
    }
    getLiving() {
        return this.living;
    }

    setVirgin(_bool) {
        this.virgin = (_bool == true);
        return this;
    }
    getVirgin() {
        return this.virgin;
    }

    setPrefersPredators(_bool) {
        this.prefersPredators = (_bool == true);
        return this;
    }
    getPrefersPredators() {
        return this.prefersPredators;
    }

    setAvoidsPredators(_bool) {
        this.avoidsPredators = (_bool == true);
        return this;
    }
    getAvoidsPredators() {
        return this.avoidsPredators;
    }

    setPrefersPrey(_bool) {
        this.prefersPrey = (_bool == true);
        return this;
    }
    getPrefersPrey() {
        return this.prefersPrey;
    }

    setAvoidsPrey(_bool) {
        this.avoidsPrey = (_bool == true);
        return this;
    }
    getAvoidsPrey() {
        return this.avoidsPrey;
    }

    setSexualOrientation(_int) {
        if (_int == undefined) {
            _int = 0;
        }
        else if (isNaN(_int)) {
            switch (_int.slice(0, 1)) {
                case "s" : {
                    _int = 0;
                    break;
                }
                case "g" : {
                    _int = 1;
                    break;
                }
                case "b" : {
                    _int = 2;
                    break;
                }
                default : {
                    _int = 0;
                }
            }
        }
        this.sexualOrientation.set(_int);
        return this;
    }
    getSexualOrientation() {
        return this.sexualOrientation.getValue();
    }

    setSex(_int) {
        if (_int == undefined) {
            _int = 0;
        }
        else if (isNaN(_int)) {
            switch (_int.slice(0, 1)) {
                case "m" : {
                    _int = 1;
                    break;
                }
                case "f" : {
                    _int = 2;
                    break;
                }
                default : {
                    _int = 0;
                }
            }
        }
        this._sex.set(_int);
        return this;
    }
    getSex() {
        return this._sex.getValue();
    }

    setGender(_int) {
        if (_int == undefined) {
            _int = 0;
        }
        else if (isNaN(_int)) {
            switch (_int.slice(0, 1)) {
                case "m" : {
                    _int = 0;
                    break;
                }
                case "f" : {
                    _int = 1;
                    break;
                }
                case "h" : {
                    _int = 2;
                    break;
                }
                default : {
                    _int = 0;
                }
            }
        }
        this.gender.set(_int);
        return this;
    }
    getGender() {
        return this.gender.getValue();
    }

    getSexualCompatibility(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {
            return false;
        }
        if (this.sexualOrientation.getValue() == 2) {
            // If you're bi
            return true;
        }
        else if (this.getSex() != _character._sex.getValue() && this.sexualOrientation.getValue() == 0) {
            // else if you're both opposite sex, and you're straight
            return true;
        }
        else if (this.getSex() == _character._sex.getValue() && this.sexualOrientation.getValue() == 1) {
            // else if you're both same sex, and you're gay
            return true;
        }
        // else no
        return false;
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
        if (this._godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.getCharacterDisposition[_character]["passion"];
    }
    setCharacterFriendship(_character, _int) {
        return this.characterDisposition[_character]["friendship"] = _int;
    }
    getCharacterFriendship(_character) {
        if (this._godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.getCharacterDisposition[_character]["friendship"];
    }
    setCharacterPlayfulness(_character, _int) {
        return this.characterDisposition[_character]["playfulness"] = _int;
    }
    getCharacterPlayfulness(_character) {
        if (this._godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.getCharacterDisposition[_character]["playfulness"];
    }
    setCharacterSoulmate(_character, _int) {
        return this.characterDisposition[_character]["soulmate"] = _int;
    }
    getCharacterSoulmate(_character) {
        if (this._godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.getCharacterDisposition[_character]["soulmate"];
    }
    setCharacterFamilial(_character, _int) {
        return this.characterDisposition[_character]["familial"] = _int;
    }
    getCharacterFamilial(_character) {
        if (this._godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.getCharacterDisposition[_character]["familial"];
    }
    setCharacterObsession(_character, _int) {
        return this.characterDisposition[_character]["obsession"] = _int;
    }
    getCharacterObsession(_character) {
        if (this._godMode) {
            return Number.MAX_SAFE_INTEGER;
        }
        return this.getCharacterDisposition[_character]["obsession"];
    }
    setCharacterHate(_character, _int) {
        return this.characterDisposition[_character]["hate"] = _int;
    }
    getCharacterHate(_character) {
        if (this._godMode) {
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
                if (this._godMode) {
                    return Number.MAX_SAFE_INTEGER;
                }
                return this.characterDisposition[_character][_dispositionType];
            }
            else {
                if (this._godMode) {
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
        if (this._godMode) {
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

    addDating(_character, _updateParent = true) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {
            return this;
        }
        this._dating.add(_character);
        if (_updateParent) {
            _character.addDating(this, false);
        }
        return this;
    }
    dateCharacter(_character, _updateParent = true) {
        return this.addDating(_character, _updateParent);
    }
    addDated(_character, _int = 1, _updateParent = true) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {
            return this;
        }
        if (typeof _int === "boolean") {
            _updateParent = _int;
            if (this._dated.has(_character))
                _int = this._dated.get(_character) + 1;
            else
                _int = 1;
        }
        else if (typeof _int === "undefined") {
            _updateParent = true;
            if (this._dated.has(_character))
                _int = this._dated.get(_character) + 1;
            else
                _int = 1;
        }
        else {
            _int = Number.parseInt(_int);
            if (isNaN(_int) || _int < 0)
                _int = 0;
        }

        this._dated.set(_character, _int);
        if (_updateParent)
            _character.addDated(this, _int, false);
        return this;
    }
    datedCharacter(_character, _int = 0, _updateParent = true) {
        return this.addDated(_character, _int, _updateParent);
    }
    isDatingCharacter(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        return this._dating.has(_character);
    }
    isDating(_character) {
        return this.isDatingCharacter(_character);
    }
    hasDatedCharacter(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        return this._dated.has(_character);
    }
    hasDated(_character) {
        return this.hasDatedCharacter(_character);
    }
    getCurrentDates() {
        return this._dating;
    }
    getPreviousDates() {
        return this._dated;
    }
    getNumberOfDates(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        if (this.hasDatedCharacter(_character))
            return this._dated.get(_character);
        else
            return 0;
    }
    removeDating(_character, _updateParent) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        if (this.isDating(_character)) {
            this._dating.delete(_character);
            this.hasDatedCharacter(_character);
        }
        if (_updateParent)
            _character.removeDating(this, false);
        return this;
    }
    removeDated(_character, _updateParent) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        if (this.hasDated(_character))
            this._dated.delete(_character);
        if (_updateParent)
            _character.removeDated(this, false);
        return this;
    }

    hasColouration() {
        return typeof this.furColourA != 'undefined';
    }

    addCurrentAction(_action, _entity = undefined) {
        if (ActionEnum.hasOwnProperty(_action)) {}
        else if (ActionEnum.properties.hasOwnProperty(_action)) {
            _action = ActionEnum.properties[_action].value;
        }
        else {
            return this;
        }
        if (!(_entity instanceof Entity) && !(_entity instanceof InstancedEntity)) {
            _entity = Game.hasEntity(_entity) ? Game.getEntity(_entity) : undefined;
        }

        this.currentActions[_action] = _entity;
        return this;
    }
    removeCurrentAction(_action, _entity = undefined) {
        if (ActionEnum.hasOwnProperty(_action)) {}
        else if (ActionEnum.properties.hasOwnProperty(_action)) {
            _action = ActionEnum.properties[_action].value;
        }
        else {
            return this;
        }
        if (!(_entity instanceof Entity) && !(_entity instanceof InstancedEntity)) {
            _entity = Game.hasEntity(_entity) ? Game.getEntity(_entity) : undefined;
        }

        delete this.currentActions[_action];
        return this;
    }
    hasCurrentAction(_action) {
        if (ActionEnum.hasOwnProperty(_action)) {}
        else if (ActionEnum.properties.hasOwnProperty(_action)) {
            _action = ActionEnum.properties[_action].value;
        }
        else {
            return undefined;
        }
        return this.currentActions.hasOwnProperty(_action);
    }
    getCurrentActions() {
        var _currentActions = Object.assign({}, this.currentActions);
        _currentActions[this.getStance()] = this.furniture;
        return _currentActions;
    }
    getCurrentAction(_action) {
        if (ActionEnum.hasOwnProperty(_action)) {}
        else if (ActionEnum.properties.hasOwnProperty(_action)) {
            _action = ActionEnum.properties[_action].value;
        }
        else {
            return undefined;
        }
        if (!this.hasCurrentAction(_action)) {
            return undefined;
        }
        else {
            return this.currentActions[_action];
        }
    }
    hasCurrentAction(_action) {
        return this.currentActions.hasOwnProperty(_action);
    }
    getStance() {
    	return this.stance.getValue();
    }
    getStancePresentTense() {
    	switch (this.stance.getValue()) {
    		case 0 : {
    			return "lying";
    		}
    		case 1 : {
    			return "sitting";
    		}
    		case 2 : {
    			return "crouching";
    		}
    		case 3 : {
    			return "standing";
    		}
    		case 4 : {
    			return "flying";
    		}
    	}
    }
    getStancePresentParticiple() {
        return this.positionPresentTense();
    }
    hasStance(_action) {
        if (ActionEnum.hasOwnProperty(_action)) {}
        else if (ActionEnum.properties.hasOwnProperty(_action)) {
            _action = ActionEnum.properties[_action].value;
        }
        else {
            return undefined;
        }
        return this.hasCurrentAction(_action);
    }

    hold(_instancedItem, _hand = undefined) {
        var _tempItem = Game.getInstancedItemEntity(_instancedItem);
        if (!(_tempItem instanceof InstancedItemEntity)) {
            _tempItem = Game.getProtoItemEntity(_instancedItem);
            if (!(_tempItem instanceof ItemEntity)) {
                return null;
            }
        }
        _instancedItem = this.getItem(_tempItem);
        if (!(_instancedItem instanceof AbstractEntity)) {
            return false;
        }
        
        if (_hand != "hand.r" && _hand != "hand.l") {
            _hand = this.handedness;
            if (this.hasEquippedEntity(_hand)) {
                if (_hand == "hand.r") {
                    _hand = "hand.l";
                }
                else {
                    _hand = "hand.r";
                }
            }
        }
        if (this.hasEquippedEntity(_hand)) {
            if (!this.unequipEntity(_hand)) {
                return false;
            }
        }
        return this.equipEntity(_instancedItem, _hand);
    }
    lay(_entity = undefined, _dontOverride = undefined) {
        _entity = Game.getEntity(_entity);
        if (_dontOverride == undefined) {}
        else if (typeof _dontOverride == "string") {
            _dontOverride = _dontOverride.split(/[\s,]+/);
        }
        else if (_dontOverride instanceof Set) {
            _dontOverride = Array.from(_dontOverride);
        }
        else {
            _dontOverride = undefined;
        }

        this.removeCurrentAction(ActionEnum.MOVE);
        this.stance.set(0);
        if (_entity instanceof Furniture) {
            this.furniture = _entity;
        }

        return true;
    }
    sit(_entity = undefined, _dontOverride = undefined) {
        _entity = Game.getEntity(_entity);
        if (_dontOverride == undefined) {}
        else if (typeof _dontOverride == "string") {
            _dontOverride = _dontOverride.split(/[\s,]+/);
        }
        else if (_dontOverride instanceof Set) {
            _dontOverride = Array.from(_dontOverride);
        }
        else {
            _dontOverride = undefined;
        }

        this.removeCurrentAction(ActionEnum.MOVE);
        this.stance.set(1);
        if (_entity instanceof Furniture) {
            this.furniture = _entity;
        }

        return true;
    }
    crouch(_dontOverride = undefined) {
        if (_dontOverride == undefined) {}
        else if (typeof _dontOverride == "string") {
            _dontOverride = _dontOverride.split(/[\s,]+/);
        }
        else if (_dontOverride instanceof Set) {
            _dontOverride = Array.from(_dontOverride);
        }
        else {
            _dontOverride = undefined;
        }

        this.stance.set(2);

        return true;
    }
    stand(_dontOverride = undefined) {
        if (_dontOverride == undefined) {}
        else if (typeof _dontOverride == "string") {
            _dontOverride = _dontOverride.split(/[\s,]+/);
        }
        else if (_dontOverride instanceof Set) {
            _dontOverride = Array.from(_dontOverride);
        }
        else {
            _dontOverride = undefined;
        }

        this.removeCurrentAction(ActionEnum.MOVE);
        /*if (_dontOverride.contains("masturbate")) this.removeCurrentAction(ActionEnum.MASTURBATE);
        if (_dontOverride.contains("sex")) this.removeCurrentAction(ActionEnum.SEX);*/
        this.stance.set(3);
        this.furniture = undefined;

        return true;
    }
    fly(_dontOverride = undefined) {
        if (_dontOverride == undefined) {}
        else if (typeof _dontOverride == "string") {
            _dontOverride = _dontOverride.split(/[\s,]+/);
        }
        else if (_dontOverride instanceof Set) {
            _dontOverride = Array.from(_dontOverride);
        }
        else {
            _dontOverride = undefined;
        }

        this.stance.set(4);

        return true;
    }
    look(_entity) {
        _entity = Game.getEntity(_entity);
        if (_entity == undefined) {return;}

        this.addCurrentAction(ActionEnum.LOOK, _entity);

        return true;
    }
    open(_entity) {
        _entity = Game.getEntity(_entity);
        if (_entity == undefined) {return;}

        return true;
    }
    release(_instancedItemEntity, _hand = undefined) {
        return this.unequipEntity(_instancedItemEntity); // TODO: remove this
    }
    talk(_entity) {
        _entity = Game.getEntity(_entity);

        this.addCurrentAction(ActionEnum.TALK, _entity);

        return true;
    }

    addSexRefusalCount(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        if (this.sexRefusalCountMap.has(_character))
            this.sexRefusalCountMap.set(_character, this.sexRefusalCountMap.get(_character) + 1);
        else
            this.sexRefusalCountMap.set(_character, 1);

        return this;
    }
    getSexRefusalCount(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        if (this.sexRefusalCountMap.has(_character))
            return this.sexRefusalCountMap.get(_character);
        else
            return 0;
    }

    isCharmed() {
        return this.hasCurrentAction(ActionEnum.CHARM);
    }
    isFucking() {
        return this.hasCurrentAction(ActionEnum.SEX);
    }
    isCrouching() {
        return this.stance.getValue() == 2;
    }
    isLying() {
        return this.stance.getValue() == 0;
    }
    isMasturbating() {
        return this.hasCurrentAction(ActionEnum.MASTURBATE);
    }
    isSleeping() {
        return this.sleeping;
    }
    isSitting() {
        return this.stance.getValue() == 1;
    }
    isStanding() {
        return this.stance.getValue() == 3;
    }
    isFlying() {
        return this.stance.getValue() == 4;
    }

    hasKey(_room) {
        if (!(_room instanceof Room))
            _room = Game.rooms.has(_room) ? Game.rooms.get(_room) : undefined;

        if (_room instanceof Room) {
            if (this.containsItem(_room.sid + "Key") || this.containsItem(_room.location.id + "Key") || this.containsItem(_room.cell.location.id + "Key") || this.containsItem("masterKey"))
                return true;
            return false;
        }
        else
            return false;
    }

    subjectPronoun() {
        return this.gender.getValue() == 0 ? "he" : "she";
    }
    objectPronoun() {
        return this.gender.getValue() == 0 ? "him" : "her";
    }
    possessivePronoun() {
        return this.gender.getValue() == 0 ? "his" : "hers";
    }
    possessiveAdjective() {
        return this.gender.getValue() == 0 ? "his" : "her";
    }
    reflexivePronoun() {
        return this.gender.getValue() == 0 ? "himself" : "herself";
    }
    singularPossessiveName() {
        if (this.name.slice(-1) == 's' || this.name.slice(-1) == 'z')
            return this.name;
        else
            return this.name;
    }
    grammaticalGender() {
        switch (this.species) {
            case SpeciesEnum.FOX: {
                return this.gender.getValue() == 0 ? "tod" : "vixen";
            }
            case SpeciesEnum.WOLF: {
                return this.gender.getValue() == 0 ? "wolf" : "wolfen";
            }
            case SpeciesEnum.AARDWOLF:
            case SpeciesEnum.HYENA: {
                return this.gender.getValue() == 0 ? "brute" : "fae";
            }
            case SpeciesEnum.SHEEP: {
                return this.gender.getValue() == 0 ? "ram" : "ewe";
            }
            case SpeciesEnum.STOAT: {
                return this.gender.getValue() == 0 ? "jack" : "jill";
            }
            case SpeciesEnum.MOUSE:
            case SpeciesEnum.DEER:
            case SpeciesEnum.RABBIT:
            case SpeciesEnum.ANTELOPE: {
                return this.gender.getValue() == 0 ? "buck" : "doe";
            }
            case SpeciesEnum.JACKAL:
            case SpeciesEnum.COYOTE: {
                return this.gender.getValue() == 0 ? "dog" : "bitch";
            }
            case SpeciesEnum.TIGER: {
                return this.gender.getValue() == 0 ? "tiger" : "tigress";
            }
            case SpeciesEnum.PIG: {
                return this.gender.getValue() == 0 ? "boar" : "sow";
            }
            case SpeciesEnum.HORSE: {
                return this.gender.getValue() == 0 ? "stallion" : "mare";
            }
        }
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

    setEyes(_type) {
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
    setEyeColour(_colour) {
        this.eyeColour = _colour
        this.eyeColourHex = colourNameToHex(_colour.replace(/[^a-z]/g, ""));
        return this;
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
        this.furColourAHex = colourNameToHex(_colour.replace(/[^a-z]/g, ""));
        return this;
    }
    setFurColourB(_colour) {
        this.furColourB = _colour;
        this.furColourBHex = colourNameToHex(_colour.replace(/[^a-z]/g, ""));
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
        var _baseMass = 36; // Average mass, in kilograms, of NW at the age of 26
        var _baseHeight = 1.20; // Average height, in metres, of NW at the age of 26
        var _baseWidth = 0.4; // Average width, in metres, of NW at the age of 26
        this.muscle = 0.5;
        this.fat = 0.25;
        if (this.species == SpeciesEnum.FOX) {
            if (this.getSex() == SexEnum.MALE) {
                this.penisSize = 15;
                this.penisGirth = 10;
                _baseMass = 36;
                _baseHeight = 1.20;
                _baseWidth = 0.4;
            }
            else {
                this.vaginaSize = 15;
                this.vaginaGirth = 10;
                _baseMass = 32;
                _baseHeight = 1.12;
                _baseWidth = 0.37;
            }

            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyes(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.SHEEP) {
            if (this.getSex() == SexEnum.MALE) {
                this.penisSize = 19;
                this.penisGirth = 11;
                _baseMass = 34;
                _baseHeight = 1.35;
                _baseWidth = 0.45;
            }
            else {
                this.vaginaSize = 19;
                this.vaginaGirth = 11;
                _baseMass = 28;
                _baseHeight = 1.0;
                _baseWidth = 0.33;
            }
            
            this.predator = false;
            this.setPaws(PawEnum.HOOF);
            this.setEyes(EyeEnum.OBLONG);
            this.setPelt(PeltEnum.WOOL);
        }
        else if (this.species == SpeciesEnum.WOLF) {
            if (this.getSex() == SexEnum.MALE) {
                this.penisSize = 25;
                this.penisGirth = 16;
                _baseMass = 72;
                _baseHeight = 1.9;
                _baseWidth = 0.63;
            }
            else {
                this.vaginaSize = 25;
                this.vaginaGirth = 16;
                _baseMass = 66;
                _baseHeight = 1.8;
                _baseWidth = 0.6;
            }

            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyes(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.AARDWOLF) {
            if (this.getSex() == SexEnum.MALE) {
                this.penisSize = 15;
                this.penisGirth = 10;
                _baseMass = 32;
                _baseHeight = 1.10;
                _baseWidth = 0.36;
            }
            else {
                this.vaginaSize = 15;
                this.vaginaGirth = 10;
                _baseMass = 28;
                _baseHeight = 1.02;
                _baseWidth = 0.34;
            }

            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyes(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.HYENA) {
            if (this.getSex() == SexEnum.MALE) {
                this.penisSize = 25;
                this.penisGirth = 16;
                _baseMass = 58;
                _baseHeight = 1.6;
                _baseWidth = 0.53;
            }
            else {
                this.vaginaSize = 25;
                this.vaginaGirth = 16;
                _baseMass = 62;
                _baseHeight = 1.75;
                _baseWidth = 0.58;
            }

            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyes(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.STOAT) {
            if (this.getSex() == SexEnum.MALE) {
                this.penisSize = 8;
                this.penisGirth = 7;
                _baseMass = 10;
                _baseHeight = 0.6;
                _baseWidth = 0.2;
            }
            else {
                this.vaginaSize = 8;
                this.vaginaGirth = 7;
                _baseMass = 8;
                _baseHeight = 0.5;
                _baseWidth = 0.16;
            }

            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyes(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.DEER) {
            if (this.getSex() == SexEnum.MALE) {
                this.penisSize = 22;
                this.penisGirth = 12;
                _baseMass = 78;
                _baseHeight = 2.2;
                _baseWidth = 0.7;
            }
            else {
                this.vaginaSize = 22;
                this.vaginaGirth = 12;
                _baseMass = 60;
                _baseHeight = 1.9;
                _baseWidth = 0.6;
            }
            
            this.predator = false;
            this.setPaws(PawEnum.HOOF);
            this.setEyes(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.WOOL);
        }
        else if (this.species == SpeciesEnum.RABBIT) {
            if (this.getSex() == SexEnum.MALE) {
                this.penisSize = 12;
                this.penisGirth = 8;
                _baseMass = 22;
                _baseHeight = 0.95;
                _baseWidth = 0.34;
            }
            else {
                this.vaginaSize = 12;
                this.vaginaGirth = 8;
                _baseMass = 14.9;
                _baseHeight = 0.81;
                _baseWidth = 0.3;
            }
            
            this.predator = false;
            this.setPaws(PawEnum.FUR);
            this.setEyes(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.JACKAL) {
            if (this.getSex() == SexEnum.MALE) {
                this.penisSize = 18;
                this.penisGirth = 12;
                _baseMass = 55;
                _baseHeight = 1.6;
                _baseWidth = 0.53;
            }
            else {
                this.vaginaSize = 18;
                this.vaginaGirth = 12;
                _baseMass = 51;
                _baseHeight = 1.55;
                _baseWidth = 0.5;
            }
            
            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyes(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.COYOTE) {
            if (this.getSex() == SexEnum.MALE) {
                this.penisSize = 15;
                this.penisGirth = 10;
                _baseMass = 36;
                _baseHeight = 1.20;
                _baseWidth = 0.4;
            }
            else {
                this.vaginaSize = 15;
                this.vaginaGirth = 10;
                _baseMass = 32;
                _baseHeight = 1.12;
                _baseWidth = 0.37;
            }
            
            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyes(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.TIGER) {
            if (this.getSex() == SexEnum.MALE) {
                this.penisSize = 28;
                this.penisGirth = 15;
                _baseMass = 88;
                _baseHeight = 2.2;
                _baseWidth = 0.73;
            }
            else {
                this.vaginaSize = 28;
                this.vaginaGirth = 15;
                _baseMass = 82;
                _baseHeight = 2.0;
                _baseWidth = 0.66;
            }
            
            this.predator = true;
            this.setPaws(PawEnum.PAD);
            this.setEyes(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        else if (this.species == SpeciesEnum.ANTELOPE) {
            if (this.getSex() == SexEnum.MALE) {
                this.penisSize = 22;
                this.penisGirth = 12;
                _baseMass = 68;
                _baseHeight = 2.0;
                _baseWidth = 0.66;
            }
            else {
                this.vaginaSize = 22;
                this.vaginaGirth = 12;
                _baseMass = 60;
                _baseHeight = 1.9;
                _baseWidth = 0.63;
            }
            
            this.predator = false;
            this.setPaws(PawEnum.HOOF);
            this.setEyes(EyeEnum.OBLONG);
            this.setPelt(PeltEnum.HAIR);
        }
        else if (this.species == SpeciesEnum.PIG) {
            if (this.getSex() == SexEnum.MALE) {
                this.penisSize = 15;
                this.penisGirth = 10;
                _baseMass = 46;
                _baseHeight = 1.3;
                _baseWidth = 0.54;
            }
            else {
                this.vaginaSize = 15;
                this.vaginaGirth = 10;
                _baseMass = 44;
                _baseHeight = 1.2;
                _baseWidth = 0.5;
            }
            
            this.predator = false;
            this.setPaws(PawEnum.HOOF);
            this.setEyes(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.SKIN);
        }
        else if (this.species == SpeciesEnum.HORSE) {
            if (this.getSex() == SexEnum.MALE) {
                this.penisSize = 45;
                this.penisGirth = 25;
                _baseMass = 82;
                _baseHeight = 2.0;
                _baseWidth = 0.66;
            }
            else {
                this.vaginaSize = 45;
                this.vaginaGirth = 25;
                _baseMass = 78;
                _baseHeight = 1.9;
                _baseWidth = 0.63;
            }
            
            this.predator = false;
            this.setPaws(PawEnum.HOOF);
            this.setEyes(EyeEnum.OBLONG);
            this.setPelt(PeltEnum.HAIR);
        }
        else if (this.species == SpeciesEnum.MOUSE) {
            if (this.getSex() == SexEnum.MALE) {
                _baseMass = 0.4;
                _baseHeight = 0.16;
                _baseWidth = 0.05;
                this.penisSize = 1;
                this.penisGirth = 0.5;
            }
            else {
                _baseMass = 0.4;
                _baseHeight = 0.15;
                _baseWidth = 0.05;
                this.vaginaSize = 1;
                this.vaginaGirth = 0.6;
            }
            
            this.predator = false;
            this.setPaws(PawEnum.SKIN);
            this.setEyes(EyeEnum.CIRCLE);
            this.setPelt(PeltEnum.FUR);
        }
        if (this.age.getValue() > 25) {
            this.height = _baseHeight;
        }
        else if (this.age.getValue() < 0) {
            this.height = _baseHeight / 20;
        }
        else {
            this.height = _baseHeight / (1 + (_baseHeight / 20) + Math.E^(-0.35 * (this.age.getValue() - 16)));
        }
        this.width = this.height / 2.4;
        return this;
    }
    getSpecies() {
        return this.species;
    }

    setPenisSize(_int) {
        this.penisSize = _int;
        return this;
    }
    getPenisSize() {
        return this.penisSize;
    }

    setPenisGirth(_int) {
        this.penisGirth = _int;
        return this;
    }
    getPenisGirth() {
        return this.penisGirth;
    }

    setVaginaSize(_int) {
        this.vaginaSize = _int;
        return this;
    }
    getVaginaSize() {
        return this.vaginaSize;
    }

    setVaginaGirth(_int) {
        this.vaginaGirth = _int;
        return this;
    }
    getVaginaGirth() {
        return this.vaginaGirth;
    }

    setFollowing(_character) {
        return this.follow(_character);
    }
    clearFollowing() {
        return this.stay();
    }

    /**
     * Increments sex count with CharacterEntity
     * @param  {CharacterEntity} _character CharacterEntity
     * @param {this} This
     */
    incSexCount(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        this.virgin = false;
        this.sexCount++;
        if (this.sexCountMap.has(_character))
            this.sexCountMap.set(_character, this.sexCountMap.get(_character) + 1);
        else
            this.sexCountMap.set(_character, 1);
        return this;
    }
    /**
     * Wrapper function for this.incSexCount(CharacterEntity)
     * @param {CharacterEntity}  _character   CharacterEntity
     * @param {this} This
     */
    addSexWith(_character, _updateParent = true) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        this.incSexCount(_character);
        if (_updateParent)
            _character.incSexCount(_character);
        return this;
    }
    /**
     * Increments vaginal receiving count with CharacterEntity
     * @param  {CharacterEntity} _character CharacterEntity
     * @param {this} This
     */
    incVaginalReceiveCount(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        this.vaginalReceiveCount++;
        this.vaginalReceiveCountMap.set(_character, this.vaginalReceiveCountMap.get(_character) + 1);
        return this;
    }
    /**
     * Increments vaginal penetration count with CharacterEntity
     * @param  {CharacterEntity} _character CharacterEntity
     * @param {this} This
     */
    incVaginalGiveCount(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        this.vaginalGiveCount++;
        this.vaginalGiveCountMap.set(_character, this.vaginalGiveCountMap.get(_character) + 1);
        return this;
    }
    /**
     * Increments anal receiving count with CharacterEntity
     * @param  {CharacterEntity} _character CharacterEntity
     * @param {this} This
     */
    incAnalReceiveCount(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        this.analReceiveCount++;
        this.analReceiveCountMap.set(_character, this.analReceiveCountMap.get(_character) + 1);
        return this;
    }
    /**
     * Increments anal penetration count with CharacterEntity
     * @param  {CharacterEntity} _character CharacterEntity
     * @param {this} This
     */
    incAnalGiveCount(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        this.analGiveCount++;
        this.analGiveCountMap.set(_character, this.analGiveCountMap.get(_character) + 1);
        return this;
    }
    incCunnilingusReceiveCount(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        this.cunnilingusReceiveCount++;
        this.cunnilingusReceiveCountMap.set(_character, this.cunnilingusReceiveCountMap.get(_character) + 1);
        return this;
    }
    incCunnilingusGiveCount(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        this.cunnilingusGiveCount++;
        this.cunnilingusGiveCountMap.set(_character, this.cunnilingusGiveCountMap.get(_character) + 1);
        return this;
    }
    incAnalingusReceiveCount(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        this.analingusReceiveCount++;
        this.analingusReceiveCountMap.set(_character, this.analingusReceiveCountMap.get(_character) + 1);
        return this;
    }
    incAnalingusGiveCount(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        this.analingusGiveCount++;
        this.analingusGiveCountMap.set(_character, this.analingusGiveCountMap.get(_character) + 1);
        return this;
    }
    incFellatioReceiveCount(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        this.fellatioReceiveCount++;
        this.fellatioReceiveCountMap.set(_character, this.fellatioReceiveCountMap.get(_character) + 1);
        return this;
    }
    incFellatioGiveCount(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        this.fellatioGiveCount++;
        this.fellatioGiveCountMap.set(_character, this.fellatioGiveCountMap.get(_character) + 1);
        return this;
    }
    incHandjobReceiveCount(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        this.handjobReceiveCount++;
        this.handjobReceiveCountMap.set(_character, this.handjobReceiveCountMap.get(_character) + 1);
        return this;
    }
    incHandjobGiveCount(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        this.handjobGiveCount++;
        this.handjobGiveCountMap.set(_character, this.handjobGiveCountMap.get(_character) + 1);
        return this;
    }
    incMasturbateCount() {
        this.masturbateCount++;
        return this;
    }
    incAutofellatioCount() {
        this.fellatioGiveCount++;
        this.fellatioReceiveCount++;
        this.masturbateCount++;
        this.autofellatioCount++;
        return this;
    }
    incAutocunnilingusCount() {
        this.cunnilingusGiveCount++;
        this.cunnilingusReceiveCount++;
        this.masturbateCount++;
        this.autocunnilingusCount++;
        return this;
    }
    incAutoanalingusCount() {
        this.analingusGiveCount++;
        this.analingusReceiveCount++;
        this.masturbateCount++;
        this.autoanalingusCount++;
        return this;
    }



    addFollower(_character, _updateChild = false) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        this.followers.add(_character);
        if (_updateChild) {
            _character.follow(this, undefined, false);
        }
        return this;
    }
    removeFollower(_character, _updateChild = false) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        if (this.followers.has(_character)) {
            if (_updateChild) {
                _character.stay();
            }
            this.followers.delete(_character);
        }
        return this;
    }
    clearFollowers(_updateChild = true) {
        this.followers.forEach(function(_character) {
            this.removeFollower(_character, true);
        }, this);
        this.followers.clear();
        return this;
    }
    hasFollowers() {
        return this.followers.size > 0;
    }
    isFollowing(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        if (typeof this.following == "undefined")
            return false;
        else
            return this.following == _character;
    }

    getSexCount(_character = undefined) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return 0;}
        return this.sexCountMap.has(_character) ? this.sexCountMap.get(_character) : 0;
    }

    addFiance(_character, _updateChild = true) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        if (this.fiance instanceof CharacterEntity && _character != this.getFiance()) {
            this.removeFiance(this.getFiance());
        }
        this.spouse = _character;
        if (_updateChild) {
            _character.addFiance(this, false);
        }
        return this;
    }
    getFiance() {
        return this.fiance;
    }
    removeFiance(_character, _updateChild = true) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        if (this.fiance == _character) {
            this.fiance = undefined;
        }
        if (_updateChild) {
            _character.removeFiance(this, false);
        }
        return this;
    }
    clearFiance(_updateChild = true) {
        this.fiance = undefined;
        if (_updateChild) {
            _character.clearFiance(false);
        }
        return this;
    }
    addSpouse(_character, _updateChild = true) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        if (this.fiance == _character) {
            this.clearFiance();
        }
        if (this.spouse instanceof CharacterEntity && _character != this.getSpouse()) {
            this.removeSpouse(this.getSpouse());
        }
        this.spouse = _character;
        if (_updateChild) {
            _character.addSpouse(this, false);
        }
        return this;
    }
    getSpouse() {
        return this.spouse;
    }
    removeSpouse(_character, _updateChild = true) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        if (this.spouse == _character) {
            this.spouse = undefined;
        }
        if (_updateChild) {
            _character.removeSpouse(this, false);
        }
        return this;
    }
    clearSpouse(_updateChild = true) {
        this.spouse = undefined;
        if (_updateChild) {
            _character.clearSpouse(false);
        }
        return this;
    }
    marry(_character) {
        return this.addSpouse(_character);
    }
    divorce(_character) {
        return this.removeSpouse(_character);
    }

    addBiologicalParent(_character, _updateChild = true) {
        if (Game.enableDebug) console.log("Running addBiologicalParent");
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        if (Game.enableDebug) console.log("    Checking if species are same");
        if (_character.getSpecies() != this.getSpecies()) {
            return this;
        }
        if (Game.enableDebug) console.log(`    Checking if parent (${_character.id}) is same-sex as first parent (${this.biologicalParents[0].id})`);
        if (this.biologicalParents.length == 1 && this.biologicalParents[0].getSex() == _character.getSex()) {
            return this;
        }
        else if (this.biologicalParents.length == 2) {
            return this;
        }
        if (Game.enableDebug) console.log(`    Checking if parent (${_character.id}) is a foster parent`);
        if (this.fosterParents.contains(_character)) {
            this.fosterParents.remove(_character);
        }
        if (Game.enableDebug) console.log(`    Checking if parent (${_character.id}) is already assigned to ${this.id}`);
        if (!this.biologicalParents.contains(_character)) {
            this.biologicalParents.push(_character);
        }
        if (_updateChild) {
            _character.addBiologicalChild(this, false);
        }
        return this;
    }
    addFosterParent(_character, _updateChild = true) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        if (this.biologicalParents.contains(_character)) {
            this.biologicalParents.remove(_character);
        }
        if (!this.fosterParents.contains(_character)) {
            this.fosterParents.push(_character);
        }
        if (_updateChild) {
            _character.addFosterChild(this, false);
        }
        return this;
    }
    getParents() {
        return new Array(...this.biologicalParents, ...this.fosterParents);
    }
    hasParent(_character) {
        return this.getParents().contains(_character);
    }
    hasParents() {
        return this.getParents().length > 0;
    }

    getBiologicalParents() {
        return this.biologicalParents;
    }
    hasBiologicalParent(_character) {
        return this.biologicalParents.contains(_character);
    }
    getFosterParents() {
        return this.fosterParents;
    }
    hasFosterParent(_character) {
        return this.fosterParents.contains(_character);
    }

    addBiologicalChild(_character, _updateChild = true) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        if (_character.species != this.species) {
            return this;
        }
        if (this.fosterChildren.contains(_character)) {
            this.fosterChildren.remove(_character);
        }
        if (!this.biologicalChildren.contains(_character)) {
            this.biologicalChildren.push(_character);
        }
        if (_updateChild) {
            _character.addBiologicalParent(this, false);
        }
        return this;
    }
    addFosterChild(_character, _updateChild = true) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return;}
        if (this.biologicalChildren.contains(_character)) {
            this.biologicalChildren.remove(_character);
        }
        if (!this.fosterChildren.contains(_character)) {
            this.fosterChildren.push(_character);
        }
        if (_updateChild) {
            _character.addFosterParent(this, false);
        }
        return this;
    }

    getBiologicalChildren() {
        return this.biologicalChildren;
    }
    hasBiologicalChild(_character) {
        return this.getBiologicalChildren().contains(_character);
    }
    hasBiologicalChildren() {
        return this.getBiologicalChildren().length > 0;
    }
    getFosterChildren() {
        return this.fosterChildren;
    }
    hasFosterChild(_character) {
        return this.getFosterChildren().contains(_character);
    }
    hasFosterChildren() {
        return this.getFosterChildren().length > 0;
    }
    getChildren() {
        return new Array(...this.getBiologicalChildren(), ...this.getFosterChildren());
    }
    hasChild(_character) {
        return this.getChildren().contains(_character);
    }
    hasChildren() {
        return this.getChildren().length > 0;
    }

    getBiologicalSiblings() {
        var _arr = new Array();
        this.getBiologicalParents().forEach(function(_parent) {
            _parent.getBiologicalChildren().forEach(function(_child) {
                if (_child == this || _arr.contains(_child)) {
                    return undefined;
                }
                else {
                    _arr.push(_child);
                }
            }, this);
        }, this);
        return _arr;
    }
    /**
     * Returns whether or not this character is related to another.
     * @param  {CharacterEntity}    _character CharacterEntity
     * @return {Boolean}            Whether or not this character is related to another.
     */
    hasBiologicalSibling(_character) {
        return this.getBiologicalSiblings().contains(_character);
    }
    hasBiologicalSiblings() {
        return this.getBiologicalSiblings().length > 0;
    }
    getSiblings() {
        var _arr = new Array();
        this.getParents().forEach(function(_parent) {
            _parent.getChildren().forEach(function(_child) {
                if (_child == this || _arr.contains(_child)) {
                    return undefined;
                }
                else {
                    _arr.push(_child);
                }
            }, this);
        }, this);
        return _arr;
    }
    hasSibling(_character) {
        return this.getSiblings().contains(_character);
    }
    hasSiblings() {
        return this.getSiblings().length > 0;
    }


    getBiologicalGrandParents() {
        var _arr = new Array();
        this.getBiologicalParents().forEach(function(_parent) {
            _parent.getBiologicalParents().forEach(function(_grandParent) {
                if (_arr.contains(_grandParent)) {
                    return undefined;
                }
                else {
                    _arr.push(_grandParent);
                }
            }, this);
        }, this);
        return _arr;
    }
    getGrandParents() {
        var _arr = new Array();
        this.getParents().forEach(function(_parent) {
            _parent.getParents().forEach(function(_grandParent) {
                if (_arr.contains(_grandParent)) {
                    return undefined;
                }
                else {
                    _arr.push(_grandParent);
                }
            }, this);
        }, this);
        return _arr;
    }

    getBiologicalGrandChildren() {
        var _arr = new Array();
        this.getBiologicalChildren().forEach(function(_children) {
            _children.getBiologicalChildren().forEach(function(_grandChild) {
                if (_arr.contains(_grandChild)) {
                    return undefined;
                }
                else {
                    _arr.push(_grandChild);
                }
            }, this);
        }, this);
        return _arr;
    }
    getGrandChildren() {
        var _arr = new Array();
        this.getChildren().forEach(function(_children) {
            _children.getChildren().forEach(function(_grandChild) {
                if (_arr.contains(_grandChild)) {
                    return undefined;
                }
                else {
                    _arr.push(_grandChild);
                }
            }, this);
        }, this);
        return _arr;
    }

    getParentsBiologicalSiblings() {
        var _arr = new Array();
        this.getBiologicalParents().forEach(function(_parent) {
            _parent.getBiologicalSiblings().forEach(function(_parentSiblings) {
                if (_arr.contains(_parentSiblings)) {
                    return undefined;
                }
                else {
                    _arr.push(_parentSiblings);
                }
            }, this);
        }, this);
        return _arr;
    }
    getParentsSiblings() {
        var _arr = new Array();
        this.getParents().forEach(function(_parent) {
            _parent.getSiblings().forEach(function(_parentSiblings) {
                if (_arr.contains(_parentSiblings)) {
                    return undefined;
                }
                else {
                    _arr.push(_parentSiblings);
                }
            }, this);
        }, this);
        return _arr;
    }

    getBiologicalCousins() {
        var _arr = new Array();
        this.getParentsBiologicalSiblings().forEach(function(_aunctles) {
            _aunctles.getBiologicalChildren().forEach(function(_cousins) {
                if (_arr.contains(_cousins)) {
                    return undefined;
                }
                else {
                    _arr.push(_cousins);
                }
            }, this);
        }, this);
        return _arr;
    }
    getCousins() {
        var _arr = new Array();
        this.getParentsSiblings().forEach(function(_aunctles) {
            _aunctles.getChildren().forEach(function(_cousins) {
                if (_arr.contains(_cousins)) {
                    return undefined;
                }
                else {
                    _arr.push(_cousins);
                }
            }, this);
        }, this);
        return _arr;
    }

    /**
     * Returns an integer based off of the number of direct parents this character has with another.
     * @param  {CharacterEntity} _character CharacterEntity
     * @return {Number}            0 - None, 1 - One parent, 2 - Both parents
     */
    calculateBiologicalSiblingRelations(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return 0;}
        if (this.biologicalParents.length > 0 && _character.biologicalParents.length > 0) {
            var _parentAHasChild = this.biologicalParents[0].hasBiologicalChild(_character);
            if (this.biologicalParents.length == 2) {
                var _parentBHasChild = this.biologicalParents[1].hasBiologicalChild(_character);
                if (_parentAHasChild && _parentBHasChild) {
                    return 2;
                }
                else if (_parentAHasChild || _parentBHasChild) {
                    return 1;
                }
            }
            else if (_parentAHasChild) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    calculateBiologicalRelations(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return 0;}
        // If they're your parent or your child
        if (this.getBiologicalParents().contains(_character) || this.getBiolgoicalChildren().containsCharacter)
            return 1.0;
        // If they're your sibling
        var _siblingCalc = this.calculateBiologicalSiblingRelations(_character);
        if (_siblingCalc > 0) {
            return _siblingCalc;
        }
        // If they're your grand parent or grand child
    }

    addKnownLocation(_location) {
        if (!(_location instanceof Location)) {
            if (Game.locations.has(_location))
                _location = Game.locations.get(_location);
            else
                return this;
        }
        this.knownLocations.add(_location);
        return this;
    }
    addLocation(_location) {
        return this.addKnownLocation(_location);
    }
    removeKnownLocation(_location) {
        if (!(_location instanceof Location)) {
            if (Game.locations.has(_location))
                _location = Game.locations.get(_location);
            else
                return this;
        }
        this.knownLocations.delete(_location);
        return this;
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

    castSpell(_spell) {
        var _cost = 0;
        if (!isNaN(_spell)) {
            _cost = _spell;
        }
        else if (!(_spell instanceof Spell)) {
            if (Game.spells.has(_spell))
                _cost = Game.spells.get(_spell).manaCost;
            else
                return this;
        }
        else
            _cost = _spell.manaCost;
        var _spellCost = this.calculateManaCost(_cost);
        if (this.mana.get() >= _spellCost)
            this.subtractMana(_spellCost);
        return this;
    }

    addPreferredSpecies(_species) {
        if (isNaN(_species)) {
            return this;
        }
        if (SpeciesEnum.properties.hasOwnProperty(_species)) {
            this.prefersSpecies.add(_species);
        }
        return this;
    }

    addAvoidedSpecies(_species) {
        if (isNaN(_species)) {
            return this;
        }
        if (SpeciesEnum.properties.hasOwnProperty(_species)) {
            this.avoidsSpecies.add(_species);
        }
        return this;
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
    
    hadSexWith(_character) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return false;}
        return this.getSexCount(_character) > 0;
    }
    calculateChanceToFuck(_character, _ignoreLustAndRut = false) {
        _character = Game.getCharacterEntity(_character);
        if (_character == undefined) {return 0;}
        if (!_character.characterDisposition.hasOwnProperty(this))
            return 0;
        if (typeof _ignoreLustAndRut != "boolean")
            _ignoreLustAndRut = false;
        
        if (Game.enableDebug) console.log(`Calculating chance for ${_character.name} to fuck ${this.name}`);

        var chance = 0;
        var _disposition = _character.getCharacterDisposition(this);

        // Disposition
        if (_character.hadSexWith(this) && !_character.hasSibling(this)) {
            chance += _disposition.passion / 2 + (_character.getSexCount(this) * 3);
            chance += _disposition.friendship / 4;
        }
        else {
            chance += _disposition.passion / 3;
            chance += _disposition.friendship / 6;
        }
        chance += _disposition.soulmate / 2;
        chance += _disposition.obsession;
        chance -= _disposition.hate;

        if (Game.enableDebug) console.log("\tAfter disposition check: " + Math.ceil(chance));

        // Species Preferences
        if (_character.prefersSpecies.has(this.species))
            chance += 5
        else if (_character.avoidsSpecies.has(this.species))
            chance -= 5;

        if (_character.prefersPrey && this.predator == false || _character.prefersPredators && this.predator == true)
            chance += 5;

        if (_character.avoidsPrey && this.predator == false || _character.avoidsPredators && this.predator == true)
            chance -= 5;

        if (Game.enableDebug) console.log("\tAfter species preference check: " + Math.ceil(chance));

        // Sexual Orientation
        if (_character.sexualOrientation == 0 && this.getSex() != _character.getSex() || _character.sexualOrientation == 1 && this.getSex() == _character.getSex() || _character.sexualOrientation == 2)
            chance += 10;
        else
            chance -= 50;

        if (Game.enableDebug) console.log("\tAfter sexual preference check: " + Math.ceil(chance));

        if (!_ignoreLustAndRut) {
                // Rut and Lust
                if (_character.rut && _character.lust.getValue() > 98)
                    chance += (_character.rut ? _character.lust.getValue()/1.5 : _character.lust.getValue()/2);
                else if (_character.lust.getValue() > 89)
                    chance += (_character.rut ? _character.lust.getValue()/2 : _character.lust.getValue()/4);
                else if (_character.lust.getValue() > 74)
                    chance += (_character.rut ? _character.lust.getValue()/4 : _character.lust.getValue()/8);
                else if (_character.lust.getValue() > 59)
                    chance += (_character.rut ? _character.lust.getValue()/8 : _character.lust.getValue()/12);
                else if (_character.lust.getValue() > 49)
                    chance += (_character.rut ? _character.lust.getValue()/12 : _character.lust.getValue()/16);
                else
                    chance += (_character.rut ? _character.lust.getValue()/16 : _character.lust.getValue()/20);
        
                if (Game.enableDebug) console.log("\tAfter rut and lust check: " + Math.ceil(chance));
        }

        // Exhibitionism
        if (Game.getCharacterCurrentRoom(this) instanceof Room) {
            if (this.room.characters.size > 2){
                if (_character.exhibitionism > 0)
                    chance += ((_character.exhibitionism / 5) * (Game.getCharacterCurrentRoom(this).characters.size - 2));
                else {
                    Game.getCharacterCurrentRoom(this).characters.forEach(function(_this) {
                        if (_this != _character.this && _this != this)
                            chance += _character.hadSexWith(_this) ? 5 : -5;
                    }, this);
                }
            }
        }

        if (Game.enableDebug) console.log("\tAfter Exhibitionism check: " + Math.ceil(chance));

        // Incest
        if (_character.hasSibling(this)) {
            if (_character.incestual > 66)
                chance += _disposition.familial / 3 + (_character.getSexCount(this) * 2);
            else if (_character.incestual > 33)
                chance += _disposition.familial / 4 + (_character.getSexCount(this));
            else if (_character.incestual > 0)
                chance += _disposition.familial / 5 + (_character.getSexCount(this));
            else
                chance -= 50;
        }

        if (Game.enableDebug) console.log("\tAfter incest check: " + Math.ceil(chance));

        // Intoxication
        chance += _character.intoxication/2.5;

        if (Game.enableDebug) console.log("\tAfter intoxication check: " + Math.ceil(chance));

        // Somnophilia
        if (_character.isSleeping()) {
            if (Game.enableRape)
                chance = 100;
            else if (_character.somnophilia > 50 && _character.hadSexWith(this) && _disposition.passion > 75)
                chance += 10;
        }

        if (Game.enableDebug) console.log("\tAfter Somnophilia check: " + Math.ceil(chance));

        return Math.ceil(chance);
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
    toggleGodMode() {
        
    }
    enableGodMode() {
        this._godMode = true;
    }
    disableGodMode() {
        this._godMode = false;
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