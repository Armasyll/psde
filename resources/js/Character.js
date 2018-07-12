class Character extends EntityWithStorage {
    /**
     * Creates a Character
     * @param  {String} _id      Unique ID
     * @param  {String} _name    Name
     * @param  {String} _description Description
     * @param  {String} _image   Image path
     * @param  {String} _class   Character class
     * @param  {Number} _age     Age
     * @param  {Number} _sex     Sex (0 Male, 1 Female, 2 Herm)
     * @param  {String} _species Species
     */
    constructor(_id = "nickWilde", _name = "Wilde, Nicholas", _description = undefined, _image = undefined, _class = "classless", _age = 33, _sex = 0, _species = "fox") {
        super(_id);
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
        this.class = undefined;
        /**
         * Age
         * @type {Number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.age = 18;
        /**
         * Physical sexual identity
         * @type {Number} 0 - male, 1 - female, 2 - hermaphrodite
         */
        this._sex = Game.MALE;
        /**
         * Personal sexual identity
         * @type {Number} 0 - male, 1 - female, 2 - hermaphrodite
         */
        this.gender = Game.MALE;
        /**
         * Intraactions this Character is currently performing
         * @type {Map} <Game.kIntraactionTypes>
         */
        this.currentActions = {};
        /**
         * Stance this Character is currently performing
         * 0 - Lay, 1 - Sit, 2 - Crouch, 3 - Stand, 4 - Fly
         * @type {Number}
         */
        this.stance = 3;
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
         * @type {String} "leftHand" or "rightHand"
         */
        this.handedness = "rightHand";
        /**
         * Item(s) this Character is holding; will never exceed two (2) Item(s)
         * @type {Array} <ItemInstance>
         */
        this.heldEntities = {
            leftHand:undefined,
            rightHand:undefined
        };
        /**
         * Current Phone this Character is using
         * @type {Phone} Can be undefined
         */
        this.phone = undefined;
        /**
         * Base disposition this Character has for others
         * @type {Number}  Passion
         * @type {Number}  Friendship
         * @type {Number}  Playfulness
         * @type {Number}  Soulmate
         * @type {Number}  Familial
         * @type {Number}  Obsession
         * @type {Number}  Hate
         */
        this.defaultDisposition = {
            passion:0,
            friendship:0,
            playfulness:0,
            soulmate:0,
            familial:0,
            obsession:0,
            hate:0
        };
        /**
         * This Character's love for themself
         * @type {Number} 0 to 100
         */
        this.philautia = 50;
        /**
         * This Character's love for others
         * @type {Number} 0 to 100
         */
        this.agape = 50;
        /**
         * Optimism, carefree attitude, pleasure-seeking; may compliment philautia
         * @type {Number} 0 to 100
         */
        this.sanguine = 0;
        /**
         * Caring, preservation, helpfulness; may compliment agape
         * @type {Number} 0 to 100
         */
        this.phlegmatic = 0;
        /**
         * Practical, logical, asocial
         * @type {Number} 0 to 100
         */
        this.choleric = 0;
        /**
         * Tradition, stability, order
         * @type {Number} 0 to 100
         */
        this.melancholic = 0;
        /**
         * Hunger; may affect health, stamina, and mana regeneration
         * @type {Number} 0 to 100
         */
        this.hunger = 0;
        /**
         * Physical power
         * @type {Number}
         */
        this.strength = 10;
        /**
         * Agility
         * @type {Number}
         */
        this.dexterity = 10;
        /**
         * Endurance
         * @type {Number}
         */
        this.constitution = 10;
        /**
         * Reasoning and memory
         * @type {Number}
         */
        this.intelligence = 10;
        /**
         * Perception and insight
         * @type {Number}
         */
        this.wisdom = 3;
        /**
         * Force of personality
         * @type {Number}
         */
        this.charisma = 10;
        this.experiencePoints = 0;
        this.level = 1;
        /**
         * Max life; should never drop below 1
         * @type {Number} 1 to Number.MAX_SAFE_INTEGER
         */
        this.lifeMax = 100;
        /**
         * Life; should this drop to 0, u ded
         * @type {Number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.life = 100;
        /**
         * Max mana
         * @type {Number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.manaMax = 0;
        /**
         * Mana; should this ever be greater than 0, things will be revealed
         * @type {Number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.mana = 0;
        /**
         * Mana cost offset percentage when casting spells
         * @type {Number} -100 to 100
         */
        this.manaCostOffsetPercent = 0;
        /**
         * Max stamina; should never drop below 1
         * @type {Number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.staminaMax = 100;
        /**
         * Stamina; should this drop to 0, u unconscious
         * @type {Number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.stamina = 100;
        /**
         * Money
         * @type {Number} 0 to Number.MAX_SAFE_INTEGER
         */
        this.money = 0;
        /**
         * Sanity; may affect mana regeneration, mana, manaMax, and manaCostOffsetPercent
         * @type {Number} 0 to 100
         */
        this.sanity = 100;
        /**
         * Lust
         * @type {Number} 0 to 100
         */
        this.lust = 25;
        /**
         * Whether or not this Character is in rut
         * @type {Boolean} True - yes, false - no
         */
        this.rut = false;
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
         * Whether or not this Character is a predator
         * @type {Boolean} True - predator, false - prey
         */
        this.predator = false;
        /**
         * Hand type
         * @type {String} (Game.kHandTypes)
         */
        this.handType = "pad";
        /**
         * Feet type
         * @type {String} (Game.kHandTypes)
         */
        this.feetType = "pad";
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
        this.eyeType = "circle";
        /**
         * Eye colour
         * @type {String}
         */
        this.eyeColour = "green";
        /**
         * Pelt type
         * @type {String} (Game.kPeltTypes)
         */
        this.peltType = "fur";
        /**
         * Pelt trimmed
         * @type {Number} 0 to 100
         */
        this.peltTrimmed = 50;
        /**
         * Penis size in centimeters
         * @type {Number} 0 - none, 100 - Character dies from blood loss
         */
        this.penisSize = 0;
        /**
         * Penis girth in centimeters
         * @type {Number} 0 - none, 100 - Character dies from blood loss
         */
        this.penisGirth = 0;
        /**
         * Vaginal depth in centimeters
         * @type {Number} 0 - none, 100 - Character is basically a trash bag
         */
        this.vaginaSize = 0;
        /**
         * Vaginal girth in centimeters
         * @type {Number} 0 - none, 100 - Character is basically a trash bag
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
         * Number of times this Character has had sex
         * @type {Number}
         */
        this.sexCount = 0;
        /**
         * Map of Characters and the Number of times this Character has had sex with them
         * @type {Map} <Character, integer>
         */
        this.sexCountMap = new Map();
        /**
         * Map of Characters and the Number of times this Character has been refused sex with them
         * @type {Map} <Character, integer>
         */
        this.sexRefusalCountMap = new Map();
        /**
         * Number of times this Character has received vaginal
         * @type {Number}
         */
        this.vaginalReceiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has received vaginal from them
         * @type {Map} <Character, Number>
         */
        this.vaginalReceiveCountMap = new Map();
        /**
         * Number of times this Character has given vaginal
         * @type {Number}
         */
        this.vaginalGiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has given them vaginal
         * @type {Map} <Character, Number>
         */
        this.vaginalGiveCountMap = new Map();
        /**
         * Number of times this Character has received anal
         * @type {Number}
         */
        this.analReceiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has received anal from them
         * @type {Map} <Character, Number>
         */
        this.analReceiveCountMap = new Map();
        /**
         * Number of times this Character has given anal
         * @type {Number}
         */
        this.analGiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has given them anal
         * @type {Map} <Character, Number>
         */
        this.analGiveCountMap = new Map();
        /**
         * Number of times this Character has received cunnilingus
         * @type {Number}
         */
        this.cunnilingusReceiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has received cunnilingus from them
         * @type {Map} <Character, Number>
         */
        this.cunnilingusReceiveCountMap = new Map();
        /**
         * Number of times this Character has given cunnilingus
         * @type {Number}
         */
        this.cunnilingusGiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has given them cunnilingus
         * @type {Map} <Character, Number>
         */
        this.cunnilingusGiveCountMap = new Map();
        /**
         * Number of times this Character has received analingus
         * @type {Number}
         */
        this.analingusReceiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has received analingus from them
         * @type {Map} <Character, Number>
         */
        this.analingusReceiveCountMap = new Map();
        /**
         * Number of times this Character has given analingus
         * @type {Number}
         */
        this.analingusGiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has given them analingus
         * @type {Map} <Character, Number>
         */
        this.analingusGiveCountMap = new Map();
        /**
         * Number of times this Character has received fellatio
         * @type {Number}
         */
        this.fellatioReceiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has received fellatio from them
         * @type {Map} <Character, Number>
         */
        this.fellatioReceiveCountMap = new Map();
        /**
         * Number of times this Character has given fellatio
         * @type {Number}
         */
        this.fellatioGiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has given them fellatio
         * @type {Map} <Character, Number>
         */
        this.fellatioGiveCountMap = new Map();
        /**
         * Number of times this Character has received a handjob
         * @type {Number}
         */
        this.handjobReceiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has received a handjob from them
         * @type {Map} <Character, Number>
         */
        this.handjobReceiveCountMap = new Map();
        /**
         * Number of times this Character has given a handjob
         * @type {Number}
         */
        this.handjobGiveCount = 0;
        /**
         * Map of Characters and the Number of times this Character has given them a handjob
         * @type {Map} <Character, Number>
         */
        this.handjobGiveCountMap = new Map();
        /**
         * Number of times this Character has masturbated
         * @type {Number}
         */
        this.masturbateCount = 0;
        /**
         * Number of times this Character has performed autofellatio
         * @type {Number}
         */
        this.autofellatioCount = 0;
        /**
         * Number of times this Character has performed autocunnilingus
         * @type {Number}
         */
        this.autocunnilingusCount = 0;
        /**
         * Number of times this Character has performed autoanalingus
         * @type {Number}
         */
        this.autoanalingusCount = 0;
        /**
         * The Character this Character is following
         * @type {Character} Can be undefined
         */
        this.following = undefined; // Character
        /**
         * Set of Character(s) this Character is leading
         * @type {Set} <Character>
         */
        this.followers = new Set(); // Set<Character>
        /**
         * Current Furniture this Character is using
         * @type {Furniture} Can be undefined
         */
        this.furniture = undefined;
        /**
         * Clothing this Character is wearing
         * @type {Map} <String, Clothing>
         */
        this.clothing = {
            hat:undefined,
            mask:undefined,
            glasses:undefined,
            earPiercingLeft:undefined,
            earPiercingRight:undefined,
            nosePiercing:undefined,
            lipPiercing:undefined,
            tonguePiercing:undefined,
            neckwear:undefined,
            shirt:undefined,
            jacket:undefined,
            belt:undefined,
            gloves:undefined,
            underwear:undefined,
            pants:undefined,
            socks:undefined,
            shoes:undefined,
            bra:undefined
        };
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
         * Map of Characters and the Number of times this Character has dated them
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
        this.sexualOrientation = 0;
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
        this.exhibitionism = 0;
        /**
         * Preference for sleep sex
         * @type {Number} 0 to 100
         */
        this.somnophilia = 0;
        /**
         * Drunkenness
         * @type {Number} 0 to 100
         */
        this.intoxication = 0;
        /**
         * Alcohol tolerance
         * @type {Number} 0 to 100
         */
        this.alcoholTolerance = 0;
        /**
         * Preference for incest
         * @type {Number} 0 to 100
         */
        this.incestual = 0;

        if (_name.split(", ").length > 1) {
            var tempName = _name.split(", ");
            this.name = tempName[1].replace(/[^0-9a-z]/gi, '');
            this.surname = tempName[0].replace(/[^0-9a-z]/gi, '');
        }
        else if (_name.split(" ").length > 1) {
            var tempName = _name.split(" ");
            this.name = tempName[0].replace(/[^0-9a-z]/gi, '');
            this.surname = tempName[1].replace(/[^0-9a-z]/gi, '');
        }
        else {
            this.name = _name.replace(/[^0-9a-z]/gi, '');
        }
        this.setImage(_image);
        this.setClass(_class);
        this.setAge(_age);
        this.setSex(_sex);
        this.setGender(this._sex);
        this.setSpecies(_species);
        this.addAvailableAction("talk");
        this.addAvailableAction("attack");
        this.addAvailableAction("follow");
        this.addAvailableAction("hold");
        this.addAvailableAction("open"); // inventory... maybe :v
        this.addAvailableAction("give");
        this.addAvailableAction("take");
        this.addAvailableAction("hug");
        this.addAvailableAction("kiss");

        Game.characterEntities[this.id] = this;

        this._generateProperties();
        this.stand();
    }
    
    getFullName() {
        if (this.surname != undefined && this.surname.length > 0)
            return this.name + " " + this.surname;
        else
            return this.name;
    }

    setClass(_class) {
        if (Game.kCharacterClasses.has(_class))
            this.class = _class;
        else
            this.class = "commoner";
        return this;
    }
    getClass() {
        return this.class;
    }

    calculateManaCost(_cost = 0) {
        if (!isNaN(_cost)) {}
        else if (_cost instanceof Spell) {
            _cost = _cost.manaCost;
        }
        else if (Game.spells.has(_cost))
            _cost = Game.spells.get(_cost).manaCost;
        if (this.manaCostOffsetPercent == 0 || _cost == 0)
            return _cost;
        else if (_cost < 0)
            return 0;
        else
            return _cost - (_cost / (100 / this.manaCostOffsetPercent));
    }

    setHandedness(_int) {
        if (_hand == Game.LEFT_HANDED)
            this.handedness = 1;
        else {
            this.handedness = 0;
        }
    }
    getHandedness() {
        return this.handedness;
    }
    setLeftHanded(_bool = true) {
        if (_bool === true)
            this.setHandedness(1);
        else
            this.setHandedness(0);
    }
    setRightHanded(_bool = true) {
        if (_bool === true)
            this.setHandedness(0);
        else
            this.setHandedness(1);
    }

    /**
     * Adds Entity(s) to this Character's heldEntities
     * NOTE: Directly modifies this.currentAction
     * @param  {EntityInstance} _entityInstance The Entity to be held
     * @param  {String} _hand The hand to hold it in; can be "leftHand", "rightHand", or undefined
     * @param {this} This
     */
    addHeldEntity(_entityInstance, _hand = undefined) {
        if (!(_entityInstance instanceof EntityInstance)) {
            if (Game.instances.has(_entityInstance))
                _entityInstance = Game.instances.get(_entityInstance);
            else
                return this;
        }

        if (this.hasHeldEntity(_entityInstance))
            return this;
        if (_hand !== undefined && _hand != "leftHand" && _hand != "rightHand") {
            switch (_hand.slice(0, -1).toLowerCase()) {
                case 0 :
                case "0" :
                case "l" : {
                    _hand = "leftHand";
                    break;
                }
                case 1 :
                case "1" :
                case "r" : {
                    _hand = "rightHand";
                    break;
                }
            }
        }
        if (_hand != "leftHand" && _hand != "rightHand") {
            if (this.hasSomethingInBothHands())
                _hand = this.handedness;
            else
                _hand = this.getFreeHand();
        }
        if (this.heldEntities[_hand] instanceof Entity) {
            if (!this.removeHeldEntity(this.heldEntities[_hand]))
                return this;
        }
        /*if (this.triggerActionEvent("hold", _entityInstance.parent)) {
            this.heldEntities[_hand] = _entityInstance;
            this.currentActions["hold"] = this.heldEntities;
        }*/
        return this;
    }
    /**
     * Removes Entity held in either hand
     * NOTE: Directly modifies this.currentAction
     * @param  {EntityInstance, String} _entityInstance EntityInstance, EntityInstance ID, "leftHand", or "rightHand"
     * @return {this} This
     */
    removeHeldEntity(_entityInstance) {
        if (!(_entityInstance instanceof EntityInstance)) {
            if (Game.instances.has(_entityInstance))
                _entityInstance = Game.instances.get(_entityInstance);
            else if (_entityInstance == "leftHand")
                _entityInstance = this.getEntityInLeftHand();
            else if (_entityInstance == "rightHand")
                _entityInstance = this.getEntityInRightHand();
            else
                return this;
        }
        if (this.hasHeldEntity(_entityInstance) /*&& this.triggerActionEvent("release", _entityInstance.parent)*/) {
            if (this.getEntityInRightHand() == _entityInstance)
                this.removeEntityInRightHand();
            if (this.getEntityInLeftHand() == _entityInstance)
                this.removeEntityInLeftHand();
            this.currentActions["hold"] = this.heldEntities;
        }
        return this;
    }
    hasHeldEntity(_entityInstance) {
        if (!(_entityInstance instanceof EntityInstance)) {
            if (Game.entityInstances.has(_entityInstance))
                _entityInstance = Game.entityInstances.get(_entityInstance);
            else {
                _entityInstance = this.getItem(_entityInstance);
                if (!(_entityInstance instanceof EntityInstance))
                    return undefined;
            }
        }
        return this.heldEntities["leftHand"] == _entityInstance || this.heldEntities["rightHand"] == _entityInstance;
    }
    isHoldingEntity(_entityInstance) {
        return this.hasHeldEntity(_entityInstance);
    }
    isHolding(_entityInstance) {
        return this.hasHeldEntity(_entityInstance);
    }
    hasSomethingInLeftHand() {
        return this.heldEntities["leftHand"] instanceof ItemInstance;
    }
    hasEntityInLeftHand() {
        return this.hasSomethingInLeftHand();
    }
    hasSomethingInRightHand() {
        return this.heldEntities["rightHand"] instanceof ItemInstance;
    }
    hasEntityInRightHand() {
        return this.hasSomethingInRightHand();
    }
    hasSomethingInBothHands() {
        return this.heldEntities["leftHand"] instanceof ItemInstance && this.heldEntities["rightHand"] instanceof ItemInstance;
    }
    handsFull() {
        return this.hasSomethingInBothHands();
    }
    hasSomethingInEitherHand() {
        return this.hasSomethingInRightHand() || this.hasSomethingInLeftHand();
    }
    getEntityInRightHand() {
        if (this.hasSomethingInRightHand())
            return this.heldEntities["rightHand"];
        else
            return undefined;
    }
    getEntityInLeftHand() {
        if (this.hasSomethingInLeftHand())
            return this.heldEntities["leftHand"];
        else
            return undefined;
    }
    getFreeHand() {
        if (this.handedness == "leftHand") {
            if (!this.hasSomethingInLeftHand())
                return "leftHand";
            else if (!this.hasSomethingInRightHand())
                return "rightHand";
        }
        else {
            if (!this.hasSomethingInRightHand())
                return "rightHand";
            else if (!this.hasSomethingInLeftHand())
                return "leftHand";
        }
        return undefined;
    }
    /**
     * Removes Entity in heldEntities["rightHand"]
     * NOTE: Directly modifies this.heldEntities
     * @return {this} This
     */
    removeEntityInRightHand() {
        this.heldEntities["rightHand"] = undefined;
        return this;
    }
    /**
     * Removes Entity in heldEntities["leftHand"]
     * NOTE: Directly modifies this.heldEntities
     * @return {this} This
     */
    removeEntityInLeftHand() {
        this.heldEntities["leftHand"] = undefined;
        return this;
    }

    clean() {
        this.cleanliness = 100;
        this.odorSex = 0;
        this.odorSweat = 0;
        return this;
    }

    setAge(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > 9001)
            _int = 9001
        else
            Number.parseInt(_int);
        this.age = _int;

        if (this.age >= 18) {
            this.addAvailableAction("sex");
            this.addAvailableAction("masturbate");
        }
        else {
            this.removeAvailableAction("sex");
            this.removeAvailableAction("masturbate");
        }

        return this;
    }
    incAge(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;

        return this.setAge(this.age + Number.parseInt(_int));
    }
    addAge(_int) {
        return this.incAge(_int);
    }
    getAge() {
        return this.age;
    }

    setHunger(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > this.hungerMax)
            _int = this.hungerMax;
        this.hunger = _int;
        return this;
    }
    incHunger(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setHunger(this.hunger + Number.parseInt(_int));
    }
    addHunger(_int) {
        return this.incHunger(_int);
    }
    decHunger(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setHunger(this.hunger - Number.parseInt(_int));
    }
    subHunger(_int) {
        return this.decHunger(_int);
    }
    getHunger() {
        return this.hunger;
    }

    setStrength(_int) {
        if (isNaN(_int))
            return this.strength;
        else if (_int < 0)
            _int = 1;
        else if (_int > 100)
            _int = 100;
        this.strength = _int;
        return this;
    }
    incStrength(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setStrength(this.strength + Number.parseInt(_int));
    }
    addStrength(_int) {
        return this.incStrength(_int);
    }
    decStrength(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setStrength(this.strength - Number.parseInt(_int));
    }
    subStrength(_int) {
        return this.decStrength(_int);
    }
    getStrength() {
        return this.strength;
    }
    setDexterity(_int) {
        if (isNaN(_int))
            return this.dexterity;
        else if (_int < 0)
            _int = 1;
        else if (_int > 100)
            _int = 100;
        this.dexterity = _int;
        return this;
    }
    incDexterity(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setDexterity(this.dexterity + Number.parseInt(_int));
    }
    addDexterity(_int) {
        return this.incDexterity(_int);
    }
    decDexterity(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setDexterity(this.dexterity - Number.parseInt(_int));
    }
    subDexterity(_int) {
        return this.decDexterity(_int);
    }
    getDexterity() {
        return this.dexterity;
    }
    setConstitution(_int) {
        if (isNaN(_int))
            return this.constitution;
        else if (_int < 0)
            _int = 1;
        else if (_int > 100)
            _int = 100;
        this.constitution = _int;
        return this;
    }
    incConstitution(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setConstitution(this.constitution + Number.parseInt(_int));
    }
    addConstitution(_int) {
        return this.incConstitution(_int);
    }
    decConstitution(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setConstitution(this.constitution - Number.parseInt(_int));
    }
    subConstitution(_int) {
        return this.decConstitution(_int);
    }
    getConsitution() {
        return this.constitution;
    }
    setIntelligence(_int) {
        if (isNaN(_int))
            return this.intelligence;
        else if (_int < 0)
            _int = 1;
        else if (_int > 100)
            _int = 100;
        this.intelligence = _int;
        return this;
    }
    incIntelligence(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setIntelligence(this.intelligence + Number.parseInt(_int));
    }
    addIntelligence(_int) {
        return this.incIntelligence(_int);
    }
    decIntelligence(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setIntelligence(this.intelligence - Number.parseInt(_int));
    }
    subIntelligence(_int) {
        return this.decIntelligence(_int);
    }
    getIntelligence() {
        return this.intelligence;
    }
    setWisdom(_int) {
        if (isNaN(_int))
            return this.wisdom;
        else if (_int < 0)
            _int = 1;
        else if (_int > 100)
            _int = 100;
        this.wisdom = _int;
        return this;
    }
    incWisdom(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setWisdom(this.wisdom + Number.parseInt(_int));
    }
    addWisdom(_int) {
        return this.incWisdom(_int);
    }
    decWisdom(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setWisdom(this.wisdom - Number.parseInt(_int));
    }
    subWisdom(_int) {
        return this.decWisdom(_int);
    }
    getWisdom() {
        return this.wisdom;
    }
    setCharisma(_int) {
        if (isNaN(_int))
            return this.charisma;
        else if (_int < 0)
            _int = 1;
        else if (_int > 100)
            _int = 100;
        this.charisma = _int;
        return this;
    }
    incCharisma(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setCharisma(this.charisma + Number.parseInt(_int));
    }
    addCharisma(_int) {
        return this.incCharisma(_int);
    }
    decCharisma(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setCharisma(this.charisma - Number.parseInt(_int));
    }
    subCharisma(_int) {
        return this.decCharisma(_int);
    }
    getCharisma() {
        return this.charisma;
    }
    /**
     * Sets Character attributes
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
        return {strength: this.strength, dexterity: this.dexterity, constitution: this.constitution, intelligence: this.intelligence, wisdom: this.wisdom, charisma: this.charisma};
    }
    /**
     * Sets Character attribute
     * @param {String} _string Character attribute
     * @param {Number} _int    Number to set it to
     */
    setAttribute(_string, _int = undefined) {
        _int = Number.parseInt(_int);
        if (isNaN(_int))
            return;
        switch (_string.toLowerCase().slice(0, 2)) {
            case "st" :
                this.setStrength(_int);
                break;
            case "de" :
                this.setDexterity(_int);
                break;
            case "co" :
                this.setConstitution(_int);
                break;
            case "in" :
                this.setIntelligence(_int);
                break;
            case "wi" :
                this.setWisdom(_int);
                break;
            case "ch" :
                this.setCharisma(_int);
                break;
            default :
                return;
        }
        return this;
    }
    getAttribute(_string) {
        switch (_string.toLowerCase().slice(0, 2)) {
            case "st" :
                return this.getStrength();
                break;
            case "de" :
                return this.getDexterity();
                break;
            case "co" :
                return this.getConstitution();
                break;
            case "in" :
                return this.getIntelligence();
                break;
            case "wi" :
                return this.getWisdom();
                break;
            case "ch" :
                return this.getCharisma();
                break;
            default :
                return;
        }
    }
    setLevel(_int = 0) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > Game.kCharacterLevelMax)
            _int = Game.kCharacterLevelMax;
        this.experiencePoints = Game.calculateLevel(_int);
        return this;
    }

    setXP(_int = 0) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > Game.kCharacterXPMax)
            _int = Game.kCharacterXPMax;
        this.experiencePoints = _int;
        return this;
    }
    incXP(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setXP(this.experiencePoints + Number.parseInt(_int));
    }
    addXP(_int) {
        return this.incXP(_int);
    }
    decXP(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setXP(this.experiencePoints - Number.parseInt(_int));
    }
    subXP(_int) {
        return this.decXP(_int);
    }
    getXP() {
        return this.experiencePoints;
    }

    setLife(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > this.lifeMax)
            _int = this.lifeMax;
        this.life = _int;
        return this;
    }
    incLife(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setLife(this.life + Number.parseInt(_int));
    }
    addLife(_int) {
        return this.incLife(_int);
    }
    decLife(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setLife(this.life - Number.parseInt(_int));
    }
    subLife(_int) {
        return this.decLife(_int);
    }
    getLife() {
        return this.life;
    }

    setLifeMax(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        else if (_int > 100)
            _int = 100;
        if (this.life > this.lifeMax)
            this.life = this._int;
        this.lifeMax = _int;
        return this;
    }
    incLifeMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setLifeMax(this.lifeMax + Number.parseInt(_int));
    }
    addLifeMax(_int) {
        return this.incLifeMax(_int);
    }
    decLifeMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setLifeMax(this.lifeMax - Number.parseInt(_int));
    }
    subLifeMax(_int) {
        return this.decLifeMax(_int);
    }
    getLifeMax() {
        return this.lifeMax;
    }

    setMana(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > this.manaMax)
            _int = this.manaMax;
        this.mana = _int;
        return this;
    }
    incMana(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setMana(this.mana + Number.parseInt(_int));
    }
    addMana(_int) {
        return this.incMana(_int);
    }
    decMana(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setMana(this.mana - Number.parseInt(_int));
    }
    subMana(_int) {
        return this.decMana(_int);
    }
    getMana() {
        return this.getMana;
    }

    setManaMax(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > 100)
            _int = 100;
        if (this.mana > this.manaMax)
            this.mana = this._int;
        this.manaMax = _int;
        return this;
    }
    incManaMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setManaMax(this.manaMax + Number.parseInt(_int));
    }
    addManaMax(_int) {
        return this.incManaMax(_int);
    }
    decManaMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setManaMax(this.manaMax - Number.parseInt(_int));
    }
    subManaMax(_int) {
        return this.decManaMax(_int);
    }
    getManaMax() {
        return this.manaMax;
    }

    setManaCostOffsetPercent(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < -100)
            _int = -100;
        else if (_int > 100)
            _int = 100;
        this.manaCostOffsetPercent = _int;
        return this;
    }
    incManaCostOffsetPercent(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setManaCostOffsetPercent(this.manaCostOffsetPercent + Number.parseInt(_int));
    }
    addManaCostOffsetPercent(_int) {
        return this.incManaCostOffsetPercent(_int);
    }
    decManaCostOffsetPercent(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setManaCostOffsetPercent(this.manaCostOffsetPercent - Number.parseInt(_int));
    }
    subManaCostOffsetPercent(_int) {
        return this.decManaCostOffsetPercent(_int);
    }
    getManaCostOffsetPercent() {
        return this.manaCostOffsetPercent;
    }

    setStamina(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > this.staminaMax)
            _int = this.staminaMax;
        this.stamina = _int;
        return this;
    }
    incStamina(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setStamina(this.stamina + Number.parseInt(_int));
    }
    addStamina(_int) {
        return this.incStamina(_int);
    }
    decStamina(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setStamina(this.stamina - Number.parseInt(_int));
    }
    subStamina(_int) {
        return this.decStamina(_int);
    }
    getStamina() {
        return this.stamina;
    }

    setStaminaMax(_int) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        else if (_int > 100)
            _int = 100;
        if (this.stamina > this.staminaMax)
            this.stamina = this._int;
        this.staminaMax = _int;
        return this;
    }
    incStaminaMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setStaminaMax(this.staminaMax + Number.parseInt(_int));
    }
    addStaminaMax(_int) {
        return this.incStaminaMax(_int);
    }
    decStaminaMax(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setStaminaMax(this.staminaMax - Number.parseInt(_int));
    }
    subStaminaMax(_int) {
        return this.decStaminaMax(_int);
    }
    getStaminaMax() {
        return this.getStaminaMax;
    }

    setMoney(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.money = _int;
        return this;
    }
    incMoney(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setMoney(this.money + Number.parseInt(_int));
    }
    addMoney(_int) {
        return this.incMoney(_int);
    }
    decMoney(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setMoney(this.money - Number.parseInt(_int));
    }
    subMoney(_int) {
        return this.decMoney(_int);
    }
    getMoney() {
        return this.money;
    }

    setSanity(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > this.sanityMax)
            _int = this.sanityMax;
        this.sanity = _int;
        return this;
    }
    incSanity(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setSanity(this.sanity + Number.parseInt(_int));
    }
    addSanity(_int) {
        return this.incSanity(_int);
    }
    decSanity(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setSanity(this.sanity - Number.parseInt(_int));
    }
    subSanity(_int) {
        return this.decSanity(_int);
    }
    getSanity() {
        return this.sanity;
    }

    setPhilautia(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.philautia = _int;
        return this;
    }
    incPhilautia(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setPhilautia(this.philautia + Number.parseInt(_int));
    }
    addPhilautia(_int) {
        return this.incPhilautia(_int);
    }
    decPhilautia(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setPhilautia(this.philautia - Number.parseInt(_int));
    }
    subPhilautia(_int) {
        return this.decPhilautia(_int);
    }
    getPhilautia() {
        return this.philautia;
    }

    setAgape(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.agape = _int;
        return this;
    }
    incAgape(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setAgape(this.agape + Number.parseInt(_int));
    }
    addAgape(_int) {
        return this.incAgape(_int);
    }
    decAgape(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setAgape(this.agape - Number.parseInt(_int));
    }
    subAgape(_int) {
        return this.decAgape(_int);
    }
    getAgape() {
        return this.agape;
    }

    setSanguine(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.sanguine = _int;
        return this;
    }
    incSanguine(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setSanguine(this.sanguine + Number.parseInt(_int));
    }
    addSanguine(_int) {
        return this.incSanguine(_int);
    }
    decSanguine(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setSanguine(this.sanguine - Number.parseInt(_int));
    }
    subSanguine(_int) {
        return this.decSanguine(_int);
    }
    getSanguine() {
        return this.sanguine;
    }

    setPhlegmatic(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.phlegmatic = _int;
        return this;
    }
    incPhlegmatic(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setPhlegmatic(this.phlegmatic + Number.parseInt(_int));
    }
    addPhlegmatic(_int) {
        return this.incPhlegmatic(_int);
    }
    decPhlegmatic(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setPhlegmatic(this.phlegmatic - Number.parseInt(_int));
    }
    subPhlegmatic(_int) {
        return this.decPhlegmatic(_int);
    }
    getPhlegmatic() {
        return this.phlegmatic;
    }

    setCholeric(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.choleric = _int;
        return this;
    }
    incCholeric(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setCholeric(this.choleric + Number.parseInt(_int));
    }
    addCholeric(_int) {
        return this.incCholeric(_int);
    }
    decCholeric(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setCholeric(this.choleric - Number.parseInt(_int));
    }
    subCholeric(_int) {
        return this.decCholeric(_int);
    }
    getCholeric() {
        return this.choleric;
    }

    setMelancholic(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        this.melancholic = _int;
        return this;
    }
    incMelancholic(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setMelancholic(this.melancholic + Number.parseInt(_int));
    }
    addMelancholic(_int) {
        return this.incMelancholic(_int);
    }
    decMelancholic(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setMelancholic(this.melancholic - Number.parseInt(_int));
    }
    subMelancholic(_int) {
        return this.decMelancholic(_int);
    }
    getMelancholic() {
        return this.melancholic;
    }

    setLust(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > 100)
            _int = 100;
        this.lust = _int;
        return this;
    }
    incLust(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setLust(this.lust + Number.parseInt(_int));
    }
    addLust(_int) {
        return this.incLust(_int);
    }
    decLust(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setLust(this.lust - Number.parseInt(_int));
    }
    subLust(_int) {
        return this.decLust(_int);
    }
    getLust() {
        return this.lust;
    }

    setExhibitionism(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > 100)
            _int = 100;
        this.exhibitionism = _int;
        return this;
    }
    incExhibitionism(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setExhibitionism(this.exhibitionism + Number.parseInt(_int));
    }
    addExhibitionism(_int) {
        return this.incExhibitionism(_int);
    }
    decExhibitionism(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setExhibitionism(this.exhibitionism - Number.parseInt(_int));
    }
    subExhibitionism(_int) {
        return this.decExhibitionism(_int);
    }
    getExhibitionism() {
        return this.exhibitionlism;
    }

    setSomnophilia(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > 100)
            _int = 100;
        this.somnophilia = _int;
        return this;
    }
    incSomnophilia(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setSomnophilia(this.somnophilia + Number.parseInt(_int));
    }
    addSomnophilia(_int) {
        return this.incSomnophilia(_int);
    }
    decSomnophilia(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setSomnophilia(this.somnophilia - Number.parseInt(_int));
    }
    subSomnophilia(_int) {
        return this.decSomnophilia(_int);
    }
    getSomnophilia() {
        return this.somnophilia;
    }

    setIntoxication(_int) {
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > 100)
            _int = 100;
        this.intoxication = _int;
        return this;
    }
    incIntoxication(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setIntoxication(this.intoxication + Number.parseInt(_int));
    }
    addIntoxication(_int) {
        return this.incIntoxication(_int);
    }
    decIntoxication(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setIntoxication(this.intoxication - Number.parseInt(_int));
    }
    subIntoxication(_int) {
        return this.decIntoxication(_int);
    }
    getIntoxication() {
        return this.intoxication;
    }

    setIncestual(_int) {
        _int = Number.parseInt(_int);
        if (isNaN(_int))
            _int = 0;
        else if (_int < 0)
            _int = 0;
        else if (_int > 100)
            _int = 100;
        this.incestual = _int;
        return this;
    }
    incIncestual(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setIncestual(this.incestual + Number.parseInt(_int));
    }
    addIncestual(_int) {
        return this.incIncestual(_int);
    }
    decIncestual(_int = 1) {
        if (isNaN(_int))
            _int = 1;
        else if (_int < 1)
            _int = 1;
        return this.setIncestual(this.incestual - Number.parseInt(_int));
    }
    subIncestual(_int) {
        return this.decIncestual(_int);
    }
    getIncestual() {
        return this.incestual;
    }

    setRut(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true")
            _bool = true;
        else
            _bool = false;
        this.rut = _bool;
        return this;
    }
    enableRut() {
        this.rut = true;
        return this;
    }
    disableRut() {
        this.rut = false;
        return this;
    }
    toggleRut() {
        this.rut = !this.rut;
        return this;
    }
    getRut() {
        return this.rut;
    }

    setSleep(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true") {
            this.sleep();
            _bool = true;
        }
        else {
            this.wake();
            _bool = false;
        }
        return this;
    }
    getSleep() {
        return this.hasCurrentAction("sleep");
    }

    setLiving(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true")
            _bool = true;
        else
            _bool = false;
        this.living = _bool;
        return this;
    }
    getLiving() {
        return this.living;
    }

    setVirgin(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true")
            _bool = true;
        else
            _bool = false;
        this.virgin = _bool;
        return this;
    }
    getVirgin() {
        return this.virgin;
    }

    setPrefersPredators(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true")
            _bool = true;
        else
            _bool = false;
        this.prefersPredators = _bool;
        return this;
    }
    getPrefersPredators() {
        return this.prefersPredators;
    }

    setAvoidsPredators(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true")
            _bool = true;
        else
            _bool = false;
        this.avoidsPredators = _bool;
        return this;
    }
    getAvoidsPredators() {
        return this.avoidsPredators;
    }

    setPrefersPrey(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true")
            _bool = true;
        else
            _bool = false;
        this.prefersPrey = _bool;
        return this;
    }
    getPrefersPrey() {
        return this.prefersPrey;
    }

    setAvoidsPrey(_bool) {
        if (_bool == true || _bool == 1 || _bool == "on" || _bool == "true")
            _bool = true;
        else
            _bool = false;
        this.avoidsPrey = _bool;
        return this;
    }
    getAvoidsPrey() {
        return this.avoidsPrey;
    }

    setSexualOrientation(_int) {
        if (isNaN(_int)) {
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
        else if (_int >= 0 && _int < 4) {
            _int = Number.parseInt(_int);
        }
        else
            _int = 0;
        this.sexualOrientation = _int;
        return this;
    }
    getSexualOrientation() {
        return this.sexualOrientation == 0 ? "straight" : (this.sexualOrientation == 1 ? "gay" : "bi");
    }

    setSex(_sex) {
        if (_sex == undefined) {
            _sex = 0;
        }
        if (isNaN(_sex)) {
            switch (_sex.slice(0, 1)) {
                case "m" : {
                    _sex = 0;
                    break;
                }
                case "f" : {
                    _sex = 1;
                    break;
                }
                case "h" : {
                    _sex = 2;
                    break;
                }
            }
        }
        else if (_sex >= 0 && _sex < 4) {
            _sex = Number.parseInt(_sex);
        }
        else
            _sex = 0;
        this._sex = _sex;
        return this;
    }
    getSexName() {
        return this.getSex() == Game.MALE ? "male" : (this.getSex() == Game.FEMALE ? "female" : "herm");
    }
    getSex() {
        return this._sex;
    }

    setGender(_gender) {
        if (isNaN(_gender)) {
            switch (_gender.slice(0, 1)) {
                case "m" : {
                    _gender = 0;
                    break;
                }
                case "f" : {
                    _gender = 1;
                    break;
                }
                case "h" : {
                    _gender = 2;
                    break;
                }
            }
        }
        else if (_gender >= 0 && _gender < 4) {
            _gender = Number.parseInt(_gender);
        }
        else
            _gender = 0;
        this.gender = _gender;
        return this;
    }
    getGenderName() {
        return this.gender == 0 ? "male" : (this.gender == 1 ? "female" : "herm");
    }
    getGender() {
        return this.gender;
    }

    getSexualOrientationCompatibility(_character) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return undefined;
        }
        if (this.sexualOrientation == 2) // If you're bi
            return true;
        else if (this.getSex() != _character.getSex() && this.sexualOrientation == 0) // else if you're both opposite sex, and you're straight
            return true;
        else if (this.getSex() == _character.getSex() && this.sexualOrientation == 1) // else if you're both same sex, and you're gay
            return true;
        else // else no
            return false;
    }
    getSexualCompatibility(_character) {
        return this.sexualOrientationCompatibility(_character);
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
    setCharacterDisposition(_character, _passion = undefined, _friendship = undefined, _playfulness = undefined, _soulmate = undefined, _familial = undefined, _obsession = undefined, _hate = undefined) {
        if (Game.enableDebug) console.log("Running setCharacterDisposition");

        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return undefined;
        }
        if (_passion instanceof Object) {
            this.characterDisposition[_character] = {
                passion:(Number.parseInt(_passion.passion) || 0),
                friendship:(Number.parseInt(_passion.friendship) || 0),
                playfulness:(Number.parseInt(_passion.playfulness) || 0),
                soulmate:(Number.parseInt(_passion.soulmate) || 0),
                familial:(Number.parseInt(_passion.familial) || 0),
                obsession:(Number.parseInt(_passion.obsession) || 0),
                hate:(Number.parseInt(_passion.hate) || 0)
            };
        }
        else if (isNaN(_passion) && this.defaultDisposition.hasOwnProperty(_passion) && !isNaN(Number.parseInt(_friendship)))
            this.characterDisposition[_character][_passion] = Number.parseInt(_friendship);
        else {
            this.characterDisposition[_character] = {
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
        return this.setCharacterDisposition(_character, "passion", _int);
    }
    addCharacterPassion(_character, _int) {
        return this.incCharacterPassion(_character, _int);
    }
    incCharacterPassion(_character, _int = 1) {
        return this.setCharacterPassion(_character, this.getCharacterDisposition(_character)["passion"] + Number.parseInt(_int));
    }
    getCharacterPassion(_character) {
        return this.getCharacterDisposition(_character, "passion");
    }
    setCharacterFriendship(_character, _int) {
        return this.setCharacterDisposition(_character, "friendship", _int);
    }
    addCharacterFriendship(_character, _int) {
        return this.incCharacterFriendship(_character, _int);
    }
    incCharacterFriendship(_character, _int = 1) {
        return this.setCharacterFriendship(_character, this.getCharacterDisposition(_character)["friendship"] + Number.parseInt(_int));
    }
    getCharacterFriendship(_character) {
        return this.getCharacterDisposition(_character, "friendship");
    }
    setCharacterPlayfulness(_character, _int) {
        return this.setCharacterDisposition(_character, "playfulness", _int);
    }
    addCharacterPlayfulness(_character, _int) {
        return this.incCharacterPlayfulness(_character, _int);
    }
    incCharacterPlayfulness(_character, _int = 1) {
        return this.setCharacterPlayfulness(_character, this.getCharacterDisposition(_character)["playfulness"] + Number.parseInt(_int));
    }
    getCharacterPlayfulness(_character) {
        return this.getCharacterDisposition(_character, "playfulness");
    }
    setCharacterSoulmate(_character, _int) {
        return this.setCharacterDisposition(_character, "soulmate", _int);
    }
    addCharacterSoulmate(_character, _int) {
        return this.incCharacterSoulmate(_character, _int);
    }
    incCharacterSoulmate(_character, _int = 1) {
        return this.setCharacterSoulmate(_character, this.getCharacterDisposition(_character)["soulmate"] + Number.parseInt(_int));
    }
    getCharacterSoulmate(_character) {
        return this.getCharacterDisposition(_character, "soulmate");
    }
    setCharacterFamilial(_character, _int) {
        return this.setCharacterDisposition(_character, "familial", _int);
    }
    addCharacterFamilial(_character, _int) {
        return this.incCharacterFamilial(_character, _int);
    }
    incCharacterFamilial(_character, _int = 1) {
        return this.setCharacterFamilial(_character, this.getCharacterDisposition(_character)["familial"] + Number.parseInt(_int));
    }
    getCharacterFamilial(_character) {
        return this.getCharacterDisposition(_character, "familial");
    }
    setCharacterObsession(_character, _int) {
        return this.setCharacterDisposition(_character, "obsession", _int);
    }
    addCharacterObsession(_character, _int) {
        return this.incCharacterObsession(_character, _int);
    }
    incCharacterObsession(_character, _int = 1) {
        return this.setCharacterObsession(_character, this.getCharacterDisposition(_character)["obsession"] + Number.parseInt(_int));
    }
    getCharacterObsession(_character) {
        return this.getCharacterDisposition(_character, "obsession");
    }
    setCharacterHate(_character, _int) {
        return this.setCharacterDisposition(_character, "hate", _int);
    }
    addCharacterHate(_character, _int) {
        return this.incCharacterHate(_character, _int);
    }
    incCharacterHate(_character, _int = 1) {
        return this.setCharacterHate(_character, this.getCharacterDisposition(_character)["hate"] + Number.parseInt(_int));
    }
    getCharacterHate(_character) {
        return this.getCharacterDisposition(_character, "hate");
    }
    getCharacterDisposition(_character, _dispositionType = undefined) {
        if (Game.enableDebug) console.log("Running getCharacterDisposition");

        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return undefined;
        }
        if (this.characterDisposition.hasOwnProperty(_character)) {
            if (this.characterDisposition[_character].hasOwnProperty(_dispositionType))
                return this.characterDisposition[_character][_dispositionType];
            else
                return this.characterDisposition[_character];
        }
        else
            return false;
    }
    hasCharacterDisposition(_character) {
        if (Game.enableDebug) console.log("Running hasCharacterDisposition");
        
        if (!(_character instanceof Character))
            _character = Game.hasCharacter(_character) ? Game.getCharacter(_character) : undefined;
        
        return this.characterDisposition.hasOwnProperty(_character);
    }
    getCharacterDispositions() {
        return this.characterDisposition;
    }
    hasMet(_character) {
        return this.hasCharacterDisposition(_character);
    }
    incCharacterAllDispositions(_character, _int) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return undefined;
        }
        if (isNaN(_int)) {
            _int = Number.parseInt(_int);
            if (_isNaN(_int))
                return undefined;
        }
        if (!this.hasCharacterDisposition(_character))
            this.setCharacterDisposition(_character);
        var _disposition = this.getCharacterDisposition(_character);
        this.setCharacterDisposition(_character, _disposition.passion + _int, _disposition.friendship + _int, _disposition.playfulness + _int, _disposition.soulmate + _int, _disposition.familial + _int, _disposition.obsession + _int, _disposition.hate - Number.parseInt(_int));
        return this;
    }
    decCharacterAllDispositions(_character, _int) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return undefined;
        }
        if (isNaN(_int)) {
            _int = Number.parseInt(_int);
            if (_isNaN(_int))
                return undefined;
        }
        if (!this.hasCharacterDisposition(_character))
            this.setCharacterDisposition(_character);
        var _disposition = this.getCharacterDisposition(_character);
        this.setCharacterDisposition(_character, _disposition.passion - _int, _disposition.friendship - _int, _disposition.playfulness - _int, _disposition.soulmate - _int, _disposition.familial - _int, _disposition.obsession - _int, _disposition.hate + Number.parseInt(_int));
        return this;
    }

    addDating(_character, _updateParent = true) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return undefined;
        }
        this._dating.add(_character);
        if (_updateParent)
            _character.addDating(this, false);
        return this;
    }
    dateCharacter(_character, _updateParent = true) {
        return this.addDating(_character, _updateParent);
    }
    addDated(_character, _int = 1, _updateParent = true) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return undefined;
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
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return undefined;
        }

        return this._dating.has(_character);
    }
    isDating(_character) {
        return this.isDatingCharacter(_character);
    }
    hasDatedCharacter(_character) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return undefined;
        }

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
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return undefined;
        }

        if (this.hasDatedCharacter(_character))
            return this._dated.get(_character);
        else
            return 0;
    }
    removeDating(_character, _updateParent) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return undefined;
        }

        if (this.isDating(_character)) {
            this._dating.delete(_character);
            this.hasDatedCharacter(_character);
        }
        if (_updateParent)
            _character.removeDating(this, false);
        return this;
    }
    removeDated(_character, _updateParent) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return undefined;
        }

        if (this.hasDated(_character))
            this._dated.delete(_character);
        if (_updateParent)
            _character.removeDated(this, false);
        return this;
    }

    hasColouration() {
        return typeof this.furColourA != 'undefined';
    }

    hasHat() {
        return this.clothing["hat"] instanceof ItemInstance && this.clothing["hat"].parent instanceof Item;
    }
    getHat() {
        return this.clothing["hat"].parent;
    }

    hasShirt() {
        return this.clothing["shirt"] instanceof ItemInstance && this.clothing["shirt"].parent instanceof Item;
    }
    getShirt() {
        return this.clothing["shirt"].parent;
    }

    hasJacket() {
        return this.clothing["jacket"] instanceof ItemInstance && this.clothing["jacket"].parent instanceof Item;
    }
    getJacket() {
        return this.clothing["jacket"].parent;
    }

    hasNeckwear() {
        return this.clothing["neckwear"] instanceof ItemInstance && this.clothing["neckwear"].parent instanceof Item;
    }
    getNeckwear() {
        return this.clothing["neckwear"].parent;
    }

    hasBra() {
        return this.clothing["bra"] instanceof ItemInstance && this.clothing["bra"].parent instanceof Item;
    }
    getBra() {
        return this.clothing["bra"].parent;
    }

    hasBelt() {
        return this.clothing["belt"] instanceof ItemInstance && this.clothing["belt"].parent instanceof Item;
    }
    getBelt() {
        return this.clothing["belt"].parent;
    }

    hasUnderwear() {
        return this.clothing["underwear"] instanceof ItemInstance && this.clothing["underwear"].parent instanceof Item;
    }
    getUnderwear() {
        return this.clothing["underwear"].parent;
    }

    hasPants() {
        return this.clothing["pants"] instanceof ItemInstance && this.clothing["pants"].parent instanceof Item;
    }
    getPants() {
        return this.clothing["pants"].parent;
    }
    
    hasShoes() {
        return this.clothing["shoe"] instanceof ItemInstance && this.clothing["shoe"].parent instanceof Item;
    }
    getShoes() {
        return this.clothing["shoes"].parent;
    }
    getClothing(_type) {
        if (Game.kClothingTypes.has(_type))
            return this.clothing[_clothing.type];
        else
            return this.clothing;
    }
    setClothing(_itemInstance, _type = undefined) {
        if (!(_itemInstance instanceof ItemInstance) && _itemInstance !== undefined) {
            if (Game.itemInstances.has(_itemInstance))
                _itemInstance = Game.itemInstances.get(_itemInstance);
            else if (_itemInstance instanceof Clothing)
                _itemInstance = new ItemInstance(undefined, _itemInstance);
            else if (Game.clothing.has(_itemInstance))
                _itemInstance = new ItemInstance(undefined, Game.clothing.get(_itemInstance));
            else
                return this;
        }

        if (!(this.containsItem(_itemInstance, true)))
            this.addItem(_itemInstance);

        if (_itemInstance instanceof ItemInstance && Game.kClothingTypes.has(_itemInstance.parent.type))
            this.clothing[Game.kClothingTypes.has(_type) ? _type : _itemInstance.parent.type] = _itemInstance;
        else if (Game.kClothingTypes.has(_type))
            this.clothing[_type] = undefined;
        return this;
    }
    addClothing(_itemInstance, _type) {
        return this.setClothing(_itemInstance, _type);
    }
    removeClothing(_itemInstance, _type = undefined) {
        if (typeof _itemInstance == "string" && Game.kClothingTypes.has(_itemInstance)) {
            this.clothing[_itemInstance] = undefined;
            return this;
        }
        else if (Game.kClothingTypes.has(_type)) {
            this.clothing[_type] = undefined;
            return this;
        }
        if (!(_itemInstance instanceof ItemInstance) && _itemInstance !== undefined) {
            if (Game.itemInstances.has(_itemInstance))
                _itemInstance = Game.itemInstances.get(_itemInstance);
            else if (_itemInstance instanceof Clothing)
                _itemInstance = new ItemInstance(undefined, _itemInstance);
            else if (Game.clothing.has(_itemInstance))
                _itemInstance = new ItemInstance(undefined, Game.clothing.get(_itemInstance));
            else
                return this;
        }

        this.clothing[_itemInstance.parent.type] = undefined;
        return this;
    }

    addCurrentAction(_actionType, _entity = undefined) {
        if (!Game.kActionTypes.has(_actionType))
            return undefined;
        if (!(_entity instanceof Entity) && !(_entity instanceof EntityInstance))
            _entity = Game.hasEntity(_entity) ? Game.getEntity(_entity) : undefined;

        this.currentActions[_actionType] = _entity;
        return this;
    }
    removeCurrentAction(_actionType, _entity = undefined) {
        if (!Game.kActionTypes.has(_actionType))
            return undefined;
        if (!(_entity instanceof Entity) && !(_entity instanceof EntityInstance))
            _entity = Game.hasEntity(_entity) ? Game.getEntity(_entity) : undefined;

        delete this.currentActions[_actionType];
        return this;
    }
    hasCurrentAction(_actionType) {
        if (!Game.kActionTypes.has(_actionType))
            return undefined;
        return this.currentActions.hasOwnProperty(_actionType);
    }
    getCurrentActions() {
        var _currentActions = Object.assign({}, this.currentActions);
        _currentActions[this.getStance()] = this.furniture;
        return _currentActions;
    }
    getCurrentAction(_actionType) {
        if (!Game.kActionTypes.has(_actionType))
            return undefined;
        else if (!this.hasCurrentAction(_actionType))
            return undefined;
        else
            return this.currentActions[_actionType];
    }
    hasCurrentAction(_actionType) {
        return this.currentActions.hasOwnProperty(_actionType);
    }
    getStance(_stance = this.stance) {
    	switch (_stance) {
    		case 0 : {
    			return "lay";
    		}
    		case 1 : {
    			return "sit";
    		}
    		case 2 : {
    			return "crouch";
    		}
    		case 3 : {
    			return "stand";
    		}
    		case 4 : {
    			return "fly";
    		}
    	}
    }
    getStancePresentTense(_stance = this.stance) {
    	switch (_stance) {
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
    hasStance(_actionType) {
        if (Game.kIntraactionTypes.has(_actionType))
            return this.hasCurrentAction(_actionType);
        else
            return false;
    }

    /**
     * Have anal sex with _entity
     * @param  {Entity} _entity [description]
     * @return {Boolean}         [description]
     */
    anal(_entity) {
        if (!(_entity instanceof Character)) {
            if (Game.hasCharacter(_entity))
                _entity = Game.getCharacter(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity;
            else if (Game.entityInstances.has(_entity))
                _entity = Game.entityInstances.get(_entity);
            else
                return undefined;
        }
        this.fuck(_entity);
        return true;
    }
    attack(_entity) {
        if (!(_entity instanceof Entity)) {
            if (Game.hasEntity(_entity))
                _entity = Game.getEntity(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity.parent;
            else if (Game.instances.has(_entity))
                _entity = Game.instances.get(_entity).parent;
            else
                return undefined;
        }

        this.addCurrentAction("attack", _entity);
        return true;
    }
    charmed(_character, _cron = "4m") {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return undefined;
        }
        this.addCurrentAction("charmed", _character);
        //new GameEvent(`${this.id}CharmedRemove`, "charmed", _character, this, undefined, undefined, undefined, undefined, _cron, `${this.id}.removeCurrentAction('charmed')`, true);
        return true;
    }
    consume(_entityInstance) {
        if (!(_entityInstance instanceof EntityInstance)) {
            if (Game.instances.has(_entityInstance))
                _entityInstance = Game.instances.get(_entityInstance);
            else
                return undefined;
        }

        /*if (this.triggerActionEvent("consume", _itemInstance.parent)) {
            this.addCurrentAction("consume", _entityInstance);
            this.items.splice(this.items.indexOf(_itemInstance), 1);
            Game.setTimedFunctionEvent(
                `${this.id}Consume${_entityInstance.parent.id}${Game.roll("1d4")}`,
                `Game.getCharacter('${this.id}').removeCurrentAction('consume', _entityInstance)`,
                "2m",
                true
            );
            return true;
        }
        else
            return false;*/
        return true;
    }
    /**
     * Alias for removeClothing
     * @param  {ItemInstance} _itemInstance Item Instance
     * @return {[type]}               [description]
     */
    disrobe(_itemInstance) {
        return this.removeClothing(_itemInstance);
    }
    /**
     * Have sex with )entity
     * @param  {Entity}  _entity      [description]
     * @param  {Boolean} _updateChild [description]
     * @return {Boolean}               [description]
     */
    fuck(_entity = undefined, _updateChild = true) {
        if (!(_entity instanceof Character)) {
            if (Game.hasCharacter(_entity))
                _entity = Game.getCharacter(_entity);
            else
                return undefined;
        }

        if (_entity.getSex() == Game.FEMALE)
            this.hadSexWithFemale = true;
        else if (_entity.getSex() == Game.MALE)
            this.hadSexWithMale = true;

        this.removeCurrentAction("masturbate");
        this.addCurrentAction("sex");

        this.incSexCount();

        if (_updateChild)
            _entity.fuck(this, false);

        return true;
    }
    follow(_character, _preGeneratedPath = undefined, _updateChild = true) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character)
            else
                return undefined;
        }
        /*if (Game.characterPathes.has(_character))
            this.move();
        else
            this.stand();*/

        if (_character.following == this) {
            this.removeFollower(_character);
            _character.following = undefiend;
        }

        this.following = _character;
        this.addCurrentAction("follow", _character);

        /*var _path = Game._findPathToRoom(Game.getCharacterCurrentRoom(this), Game.getCharacterCurrentRoom(_character));
        Game.characterPathes.set(this, _path);

        if (this.hasFollowers()) {
            this.followers.forEach(function(_follower) {
                if (_follower instanceof Character) {
                    if (!(Game.getCharacterCurrentRoom(_follower) == Game.getCharacterCurrentRoom(this)))
                        _follower.follow(_character, Game._findPathToRoom(Game.getCharacterCurrentRoom(_follower), Game.getCharacterCurrentRoom(_character)));
                    else
                        _follower.follow(_character, _path);
                }
            }, this);
            this.followers.clear();
        }*/
        if (_updateChild) {
            _character.addFollower(this, false);
        }
        return true;
    }
    hold(_entityInstance, _hand = undefined) {
        return this.addHeldEntity(_entityInstance, _hand);
    }
    hug(_entity) {
        if (!(_entity instanceof Entity)) {
            if (Game.hasEntity(_entity))
                _entity = Game.getEntity(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity.parent;
            else if (Game.instances.has(_entity))
                _entity = Game.instances.get(_entity).parent;
            else
                return undefined;
        }

        this.addCurrentAction("hug", _entity);
        return true;
    }
    kiss(_entity) {
        if (!(_entity instanceof Entity)) {
            if (Game.hasEntity(_entity))
                _entity = Game.getEntity(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity.parent;
            else if (Game.instances.has(_entity))
                _entity = Game.instances.get(_entity).parent;
            else
                return undefined;
        }

        this.addCurrentAction("kiss", _entity);
        return true;
    }
    lay(_furniture = undefined, _dontOverride = []) {
        if (!(_furniture instanceof Furniture))
            _furniture = Game.furniture.has(_furniture) ? Game.furniture.get(_furniture) : undefined;
        if (typeof _dontOverride == "undefined")
            _dontOverride = [];
        /*else if (_dontOverride instanceof Set)
            _dontOverride = Array.from(_dontOverride);*/

        this.removeCurrentAction("move");
        /*if (_dontOverride.contains("sleep")) this.removeCurrentAction("sleep");
        if (_dontOverride.contains("masturbate")) this.removeCurrentAction("masturbate");
        if (_dontOverride.contains("sex")) this.removeCurrentAction("sex");*/

        this.stance = 0;

        if (_furniture instanceof Furniture)
            this.furniture = _furniture;
        return true;
    }
    sit(_furniture = undefined, _dontOverride = []) {
        if (!(_furniture instanceof Furniture))
            _furniture = Game.furniture.has(_furniture) ? Game.furniture.get(_furniture) : undefined;
        if (typeof _dontOverride == "undefined")
            _dontOverride = [];
        /*else if (_dontOverride instanceof Set)
            _dontOverride = Array.from(_dontOverride);*/

        this.removeCurrentAction("move");
        /*if (_dontOverride.contains("sleep")) this.removeCurrentAction("sleep");
        if (_dontOverride.contains("masturbate")) this.removeCurrentAction("masturbate");
        if (_dontOverride.contains("sex")) this.removeCurrentAction("sex");*/

        this.stance = 1;
        if (_furniture instanceof Furniture)
            this.furniture = _furniture;
        return true;
    }
    crouch(_entity) {
        if (!(_entity instanceof Entity)) {
            if (Game.hasEntity(_entity))
                _entity = Game.getEntity(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity.parent;
            else if (Game.instances.has(_entity))
                _entity = Game.instances.get(_entity).parent;
            else
                return undefined;
        }

        this.stance = 2;
        return true;
    }
    stand(_dontOverride = []) {
        if (typeof _dontOverride == "undefined")
            _dontOverride = [];
        /*else if (_dontOverride instanceof Set)
            _dontOverride = Array.from(_dontOverride);*/

        this.removeCurrentAction("move");
        /*if (_dontOverride.contains("masturbate")) this.removeCurrentAction("masturbate");
        if (_dontOverride.contains("sex")) this.removeCurrentAction("sex");*/

        this.stance = 3;

        this.furniture = undefined;
        return true;
    }
    fly(_dontOverride = []) {
        if (typeof _dontOverride == "undefined")
            _dontOverride = [];
        this.stance = 4;
        return true;
    }
    look(_entity) {
        if (!(_entity instanceof Entity)) {
            if (Game.hasEntity(_entity))
                _entity = Game.getEntity(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity.parent;
            else if (Game.instances.has(_entity))
                _entity = Game.instances.get(_entity).parent;
            else
                return undefined;
        }

        this.addCurrentAction("look", _entity);
        return true;
    }
    /**
     * Masturbate
     * @param  {Array}  _dontOverride Current actions to not override
     * @return {Boolean}               [description]
     */
    masturbate(_dontOverride = []) {
        if (typeof _dontOverride == "array") {}
        else if (typeof _dontOverride == "undefined")
            _dontOverride = [];
        /*else if (_dontOverride instanceof Set)
            _dontOverride = Array.from(_dontOverride);*/
        else
            _dontOverride = [];

        /*if (_dontOverride.contains("sleep")) this.removeCurrentAction("sleep");
        if (_dontOverride.contains("move")) this.removeCurrentAction("move");
        if (_dontOverride.contains("sex")) this.removeCurrentAction("sex");*/
        return true;
    }
    open(_entity) {
        if (!(_entity instanceof Entity)) {
            if (Game.hasEntity(_entity))
                _entity = Game.getEntity(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity.parent;
            else if (Game.instances.has(_entity))
                _entity = Game.instances.get(_entity).parent;
            else
                return undefined;
        }
        return true;
    }
    /**
     * Have oral sex with _entity
     * @param  {Entity} _entity [description]
     * @return {Boolean}         [description]
     */
    oral(_entity) {
        if (!(_entity instanceof Character)) {
            if (Game.hasCharacter(_entity))
                _entity = Game.getCharacter(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity;
            else if (Game.entityInstances.has(_entity))
                _entity = Game.entityInstances.get(_entity);
            else
                return undefined;
        }
        this.fuck(_entity);
        return true;
    }
    pray(_entity) {
        if (!(_entity instanceof Entity)) {
            if (Game.hasEntity(_entity))
                _entity = Game.getEntity(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity.parent;
            else if (Game.instances.has(_entity))
                _entity = Game.instances.get(_entity).parent;
            else
                return undefined;
        }

        this.addCurrentAction("pray", _entity);
        return true;
    }
    put(_entity, _itemInstance) {
        return this.give(_entity, _itemInstance);
    }
    /**
     * Alias for fuck (for now :v)
     * @param  {Entity} _entity [description]
     * @return {Boolean}         [description]
     */
    rape(_entity) {
        this.fuck(_entity);
    }
    release(_itemInstance, _hand = undefined) {
        return this.removeHeldEntity(_itemInstance, _hand);
    }
    /**
     * Alias for fuck
     * @param  {Entity} _entity [description]
     * @return {Boolean}         [description]
     */
    sex(_entity) {
        return this.fuck(_entity);
    }
    sleep(_furniture = undefined, _dontOverride = []) {
        if (!(_furniture instanceof Furniture))
            _furniture = Game.furniture.has(_furniture) ? Game.furniture.get(_furniture) : undefined;
        if (typeof _dontOverride == "undefined")
            _dontOverride = [];
        /*else if (_dontOverride instanceof Set)
            _dontOverride = Array.from(_dontOverride);*/

        if (_furniture instanceof Furniture && (_furniture.type == "bed" || _furniture.type == "couch"))
            this.lay(_furniture, _dontOverride);

        this.removeCurrentAction("masturbate");
        /*if (_dontOverride.contains("sex")) this.removeCurrentAction("sex");*/
        this.addCurrentAction("sleep");

        if (_furniture instanceof Furniture)
            this.furniture = _furniture;
        return true;
    }
    stay() {
        this.following = undefined;
        this.removeCurrentAction("follow");
        return true;
    }
    steal(_entity, _itemInstance) {
        if (!(_entity instanceof Entity)) {
            if (Game.hasEntity(_entity))
                _entity = Game.getEntity(_entity)
            else
                return undefined;
        }
        if (!(_itemInstance instanceof ItemInstance)) {
            if (Game.itemInstances.has(_itemInstance))
                _itemInstance = Game.itemInstances.get(_itemInstance);
            else
                return;
        }
    }
    /**
     * Alias for oral
     * @param  {Entity} _entity [description]
     * @return {Boolean}         [description]
     */
    suck(_entityInstance) {
        return this.oral(_entityInstance);
    }
    talk(_entity) {
        if (!(_entity instanceof Entity))
            _entity = Game.hasEntity(_entity) ? Game.getEntity(_entity) : undefined;
        this.addCurrentAction("talk", _entity);
        return true;
    }
    /**
     * Have vaginal sex with _entity
     * @param  {Entity} _entity [description]
     * @return {Boolean}         [description]
     */
    vaginal(_entity) {
        if (!(_entity instanceof Character)) {
            if (Game.hasCharacter(_entity))
                _entity = Game.getCharacter(_entity);
            else if (_entity instanceof EntityInstance)
                _entity = _entity;
            else if (Game.entityInstances.has(_entity))
                _entity = Game.entityInstances.get(_entity);
            else
                return undefined;
        }
        this.fuck(_entity);
        return true;
    }
    /**
     * Remove current action "sleep"
     * @return {Boolean} [description]
     */
    wake() {
        this.removeCurrentAction("sleep");
        return true;
    }
    move(_dontOverride = []) {
        if (typeof _dontOverride == "undefined")
            _dontOverride = [];
        /*else if (_dontOverride instanceof Set)
            _dontOverride = Array.from(_dontOverride);*/

        // If not crouching or standing, then stand; maybe I should add a 'crawl' method
        if (this.stance < 2)
        	this.stance = 3;
        /*if (_dontOverride.contains("masturbate")) this.removeCurrentAction("masturbate");
        if (_dontOverride.contains("sex")) this.removeCurrentAction("sex");*/

        this.addCurrentAction("move");

        this.furniture = undefined;
        return true;
    }
    wear(_itemInstance, _type = undefined) {
        return this.setClothing(_itemInstance, _type);
    }

    addSexRefusalCount(_character) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
        if (this.sexRefusalCountMap.has(_character))
            this.sexRefusalCountMap.set(_character, this.sexRefusalCountMap.get(_character) + 1);
        else
            this.sexRefusalCountMap.set(_character, 1);

        return this;
    }
    getSexRefusalCount(_character) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return undefined;
        }
        if (this.sexRefusalCountMap.has(_character))
            return this.sexRefusalCountMap.get(_character);
        else
            return 0;
    }

    isCharmed() {
        return this.hasCurrentAction("charmed");
    }
    isFucking() {
        return this.hasCurrentAction("sex");
    }
    isCrouching() {
        return this.stance == 2;
    }
    isLying() {
        return this.stance == 0;
    }
    isMasturbating() {
        return this.hasCurrentAction("masturbate");
    }
    isSleeping() {
        return this.hasCurrentAction("sleep");
    }
    isSitting() {
        return this.stance == 1;
    }
    isStanding() {
        return this.stance == 3;
    }
    isFlying() {
        return this.stance == 4;
    }

    isClothed() {
        if (this.getSex() == Game.MALE)
            return this.getPants() instanceof Clothing;
        else
            return (this.getShirt() instanceof Clothing && this.getPants() instanceof Clothing);
    }
    isNaked() {
        if (this.isClothed())
            return false;

        return !(this.getUnderwear() instanceof Clothing);
    }
    
    putOn(_itemInstance, _type = undefined) {
        return this.setClothing(_itemInstance, _type);
    }
    takeOff(_itemInstance, _type) {
        return this.removeClothing(_itemInstance);
    }
    isWearing(_itemInstance) {
        if (_itemInstance == undefined) 
            return false;
        var _clothing;
        var _checkInstance = true;
        if (!(_itemInstance instanceof ItemInstance)) {
            if (Game.itemInstances.has(_itemInstance))
                _itemInstance = Game.itemInstances.get(_itemInstance);
            else if (_itemInstance instanceof Clothing) {
                _checkInstance = false;
                _clothing = _itemInstance;
            }
            else if (Game.clothing.has(_itemInstance)) {
                _checkInstance = false;
                _clothing = Game.clothing.get(_itemInstance).parent;
            }
            else
                return undefined;
        }
        else if (!(_itemInstance.parent instanceof Clothing))
            return undefined;
        else
            _clothing = _itemInstance.parent;

        if (_clothing instanceof Clothing) {
            if (Game.kClothingTypes.has(_clothing.type)) {
                if (!(this.clothing[_clothing.type] instanceof ItemInstance))
                    return false;
                if (_checkInstance)
                    return this.clothing[_clothing.type] == _itemInstance;
                else
                    return this.clothing[_clothing.type].parent == _clothing;
            }
        }
        else
            return undefined;
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
        return this.gender == 0 ? "he" : "she";
    }
    objectPronoun() {
        return this.gender == 0 ? "him" : "her";
    }
    possessivePronoun() {
        return this.gender == 0 ? "his" : "hers";
    }
    possessiveAdjective() {
        return this.gender == 0 ? "his" : "her";
    }
    reflexivePronoun() {
        return this.gender == 0 ? "himself" : "herself";
    }
    singularPossessiveName() {
        if (this.name.slice(-1) == 's' || this.name.slice(-1) == 'z')
            return this.name;
        else
            return this.name;
    }
    grammaticalGender() {
        switch (this.species) {
            case "fox" : {
                return this.gender == 0 ? "tod" : "vixen";
            }
            case "wolf" : {
                return this.gender == 0 ? "wolf" : "wolfen";
            }
            case "aardwolf" :
            case "hyena" : {
                return this.gender == 0 ? "brute" : "fae";
            }
            case "sheep" : {
                return this.gender == 0 ? "ram" : "ewe";
            }
            case "stoat" : {
                return this.gender == 0 ? "jack" : "jill";
            }
            case "mouse" :
            case "deer" :
            case "rabbit" :
            case "antelope" : {
                return this.gender == 0 ? "buck" : "doe";
            }
            case "jackal" :
            case "coyote" : {
                return this.gender == 0 ? "dog" : "bitch";
            }
            case "tiger" : {
                return this.gender == 0 ? "tiger" : "tigress";
            }
            case "pig" : {
                return this.gender == 0 ? "boar" : "sow";
            }
            case "horse" : {
                return this.gender == 0 ? "stallion" : "mare";
            }
        }
    }

    getHand() {
        if (this.handType == "fur" || this.handType == "pad" || this.handType == "skin")
            return "paw";
        else
            return "hoof";
    }
    getHands() {
        if (this.handType == "fur" || this.handType == "pad" || this.handType == "skin")
            return "paws";
        else
            return "hooves";
    }
    setHand(_type) {
        if (Game.kHandTypes.has(_type))
            this.handType = _type;
        else
            this.handType = "pad";
        return this;
    }

    setFeet(_type) {
        if (Game.kFeetTypes.has(_type))
            this.feetType = _type;
        else
            this.feetType = "pad";
        return this;
    }

    setEyes(_type) {
        if (Game.kEyeTypes.has(_type))
            this.eyeType = _type;
        else
            this.eyeType = "circle";
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
        if (Game.kPeltTypes.has(_type))
            this.peltType = _type;
        else
            this.peltType = "fur";
        return this;
    }
    setFur(_type) {
        return this.setPelt(_type);
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
        if (Game.kSpeciesTypes.has(_species))
            this.species = _species;
        else
            this.species = "fox";
        return this;
    }
    _generateProperties() {
        var _baseHeight = 0; // Average height in metres at the age of 20
        var _baseMass = 0; // Average mass in kilograms at the age of 20
        this.muscle = 0.5;
        this.fat = 0.25;
        if (this.species == "fox") {
            if (this.getSex() == Game.MALE) {
                this.penisSize = 15;
                this.penisGirth = 10;
                _baseMass = 36;
                _baseHeight = 1.20;
            }
            else {
                this.vaginaSize = 15;
                this.vaginaGirth = 10;
                _baseMass = 32;
                _baseHeight = 1.12;
            }

            this.predator = true;
            this.setFeet("pad");
            this.setHand("pad");
            this.setEyes("circle");
            this.setFur("fur");
        }
        else if (this.species == "wolf") {
            if (this.getSex() == Game.MALE) {
                this.penisSize = 25;
                this.penisGirth = 16;
                _baseMass = 72;
                _baseHeight = 1.9;
            }
            else {
                this.vaginaSize = 25;
                this.vaginaGirth = 16;
                _baseMass = 66;
                _baseHeight = 1.8;
            }

            this.predator = true;
            this.setFeet("pad");
            this.setHand("pad");
            this.setEyes("circle");
            this.setFur("fur");
        }
        else if (this.species == "aardwolf") {
            if (this.getSex() == Game.MALE) {
                this.penisSize = 15;
                this.penisGirth = 10;
                _baseMass = 32;
                _baseHeight = 1.10;
            }
            else {
                this.vaginaSize = 15;
                this.vaginaGirth = 10;
                _baseMass = 28;
                _baseHeight = 1.02;
            }

            this.predator = true;
            this.setFeet("pad");
            this.setHand("pad");
            this.setEyes("circle");
            this.setFur("fur");
        }
        else if (this.species == "hyena") {
            if (this.getSex() == Game.MALE) {
                this.penisSize = 25;
                this.penisGirth = 16;
            }
            else {
                this.vaginaSize = 25;
                this.vaginaGirth = 16;
            }

            this.bodySize = 0.85;
            this.predator = true;
            this.setFeet("pad");
            this.setHand("pad");
            this.setEyes("circle");
            this.setFur("fur");
        }
        else if (this.species == "sheep") {
            if (this.getSex() == Game.MALE) {
                this.penisSize = 19;
                this.penisGirth = 11;
            }
            else {
                this.vaginaSize = 19;
                this.vaginaGirth = 11;
            }
            
            this.bodySize = 0.5;
            this.predator = false;
            this.setFeet("clovenhoof");
            this.setHand("clovenhoof");
            this.setEyes("rectangle");
            this.setFur("wool");
        }
        else if (this.species == "stoat") {
            if (this.getSex() == Game.MALE) {
                this.penisSize = 8;
                this.penisGirth = 7;
            }
            else {
                this.vaginaSize = 8;
                this.vaginaGirth = 7;
            }

            this.bodySize = 0.25;
            this.predator = true;
            this.setFeet("pad");
            this.setHand("pad");
            this.setEyes("circle");
            this.setFur("fur");
        }
        else if (this.species == "deer") {
            if (this.getSex() == Game.MALE) {
                this.penisSize = 22;
                this.penisGirth = 12;
            }
            else {
                this.vaginaSize = 22;
                this.vaginaGirth = 12;
            }
            
            this.bodySize = 0.65;
            this.predator = false;
            this.setFeet("clovenhoof");
            this.setHand("clovenhoof");
            this.setEyes("circle");
            this.setFur("wool");
        }
        else if (this.species == "rabbit") {
            if (this.getSex() == Game.MALE) {
                this.penisSize = 12;
                this.penisGirth = 8;
            }
            else {
                this.vaginaSize = 12;
                this.vaginaGirth = 8;
                this.mass = 14.9;
                this.height = 0.81;
            }
            
            this.bodySize = 0.4;
            this.predator = false;
            this.setFeet("fur");
            this.setHand("fur");
            this.setEyes("circle");
            this.setFur("fur");
        }
        else if (this.species == "jackal") {
            if (this.getSex() == Game.MALE) {
                this.penisSize = 18;
                this.penisGirth = 12;
            }
            else {
                this.vaginaSize = 18;
                this.vaginaGirth = 12;
            }
            
            this.bodySize = 0.5;
            this.predator = true;
            this.setFeet("pad");
            this.setHand("pad");
            this.setEyes("circle");
            this.setFur("fur");
        }
        else if (this.species == "coyote") {
            if (this.getSex() == Game.MALE) {
                this.penisSize = 15;
                this.penisGirth = 10;
            }
            else {
                this.vaginaSize = 15;
                this.vaginaGirth = 10;
            }
            
            this.bodySize = 0.5;
            this.predator = true;
            this.setFeet("pad");
            this.setHand("pad");
            this.setEyes("circle");
            this.setFur("fur");
        }
        else if (this.species == "tiger") {
            if (this.getSex() == Game.MALE) {
                this.penisSize = 28;
                this.penisGirth = 15;
            }
            else {
                this.vaginaSize = 28;
                this.vaginaGirth = 15;
            }
            
            this.bodySize = 1.2;
            this.predator = true;
            this.setFeet("pad");
            this.setHand("pad");
            this.setFur("fur");
        }
        else if (this.species == "antelope") {
            if (this.getSex() == Game.MALE) {
                this.penisSize = 22;
                this.penisGirth = 12;
            }
            else {
                this.vaginaSize = 22;
                this.vaginaGirth = 12;
            }
            
            this.bodySize = 0.65;
            this.predator = false;
            this.setFeet("clovenhoof");
            this.setHand("clovenhoof");
            this.setEyes("rectangle");
            this.setFur("hair");
        }
        else if (this.species == "pig") {
            if (this.getSex() == Game.MALE) {
                this.penisSize = 15;
                this.penisGirth = 10;
            }
            else {
                this.vaginaSize = 15;
                this.vaginaGirth = 10;
            }
            
            this.bodySize = 0.6;
            this.predator = false;
            this.setFeet("clovenhoof");
            this.setHand("clovenhoof");
            this.setEyes("circle");
            this.setFur("skin");
        }
        else if (this.species == "horse") {
            if (this.getSex() == Game.MALE) {
                this.penisSize = 45;
                this.penisGirth = 25;
            }
            else {
                this.vaginaSize = 45;
                this.vaginaGirth = 25;
            }
            
            this.bodySize = 0.85;
            this.predator = false;
            this.setFeet("hoof");
            this.setHand("hoof");
            this.setEyes("rectangle");
            this.setFur("hair");
        }
        else if (this.species == "mouse") {
            if (this.getSex() == Game.MALE) {
                this.penisSize = 1;
                this.penisGirth = 0.5;
            }
            else {
                this.vaginaSize = 1;
                this.vaginaGirth = 0.6;
            }
            
            this.bodySize = 0.05;
            this.predator = false;
            this.setFeet("skin");
            this.setHand("skin");
            this.setEyes("circle");
            this.setFur("fur");
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
     * Increments sex count with Character
     * @param  {Character} _character Character
     * @param {this} This
     */
    incSexCount(_character) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
        this.virgin = false;
        this.sexCount++;
        if (this.sexCountMap.has(_character))
            this.sexCountMap.set(_character, this.sexCountMap.get(_character) + 1);
        else
            this.sexCountMap.set(_character, 1);
        return this;
    }
    /**
     * Wrapper function for this.incSexCount(Character)
     * @param {Character}  _character   Character
     * @param {this} This
     */
    addSexWith(_character, _updateParent = true) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
        this.incSexCount(_character);
        if (_updateParent)
            _character.incSexCount(_character);
        return this;
    }
    /**
     * Increments vaginal receiving count with Character
     * @param  {Character} _character Character
     * @param {this} This
     */
    incVaginalReceiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
        this.vaginalReceiveCount++;
        this.vaginalReceiveCountMap.set(_character, this.vaginalReceiveCountMap.get(_character) + 1);
        return this;
    }
    /**
     * Increments vaginal penetration count with Character
     * @param  {Character} _character Character
     * @param {this} This
     */
    incVaginalGiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
        this.vaginalGiveCount++;
        this.vaginalGiveCountMap.set(_character, this.vaginalGiveCountMap.get(_character) + 1);
        return this;
    }
    /**
     * Increments anal receiving count with Character
     * @param  {Character} _character Character
     * @param {this} This
     */
    incAnalReceiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
        this.analReceiveCount++;
        this.analReceiveCountMap.set(_character, this.analReceiveCountMap.get(_character) + 1);
        return this;
    }
    /**
     * Increments anal penetration count with Character
     * @param  {Character} _character Character
     * @param {this} This
     */
    incAnalGiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
        this.analGiveCount++;
        this.analGiveCountMap.set(_character, this.analGiveCountMap.get(_character) + 1);
        return this;
    }
    incCunnilingusReceiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
        this.cunnilingusReceiveCount++;
        this.cunnilingusReceiveCountMap.set(_character, this.cunnilingusReceiveCountMap.get(_character) + 1);
        return this;
    }
    incCunnilingusGiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
        this.cunnilingusGiveCount++;
        this.cunnilingusGiveCountMap.set(_character, this.cunnilingusGiveCountMap.get(_character) + 1);
        return this;
    }
    incAnalingusReceiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
        this.analingusReceiveCount++;
        this.analingusReceiveCountMap.set(_character, this.analingusReceiveCountMap.get(_character) + 1);
        return this;
    }
    incAnalingusGiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
        this.analingusGiveCount++;
        this.analingusGiveCountMap.set(_character, this.analingusGiveCountMap.get(_character) + 1);
        return this;
    }
    incFellatioReceiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
        this.fellatioReceiveCount++;
        this.fellatioReceiveCountMap.set(_character, this.fellatioReceiveCountMap.get(_character) + 1);
        return this;
    }
    incFellatioGiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
        this.fellatioGiveCount++;
        this.fellatioGiveCountMap.set(_character, this.fellatioGiveCountMap.get(_character) + 1);
        return this;
    }
    incHandjobReceiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
        this.handjobReceiveCount++;
        this.handjobReceiveCountMap.set(_character, this.handjobReceiveCountMap.get(_character) + 1);
        return this;
    }
    incHandjobGiveCount(_character) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
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
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
        this.followers.add(_character);
        if (_updateChild) {
            _character.follow(this, undefined, false);
        }
        return this;
    }
    removeFollower(_character, _updateChild = false) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
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
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return undefined;
        }
        if (typeof this.following == "undefined")
            return false;
        else
            return this.following == _character;
    }

    getSexCount(_character = undefined) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return 0;
        }
        return this.sexCountMap.has(_character) ? this.sexCountMap.get(_character) : 0;
    }

    addFiance(_character, _updateChild = true) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
        if (this.fiance instanceof Character && _character != this.getFiance()) {
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
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
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
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
        if (this.fiance == _character) {
            this.clearFiance();
        }
        if (this.spouse instanceof Character && _character != this.getSpouse()) {
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
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
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
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
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
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
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
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
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
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }
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
     * @param  {Character}  _character Character
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
     * @param  {Character} _character Character
     * @return {Number}            0 - None, 1 - One parent, 2 - Both parents
     */
    calculateBiologicalSiblingRelations(_character) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return 0;
        }
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
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return 0;
        }
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
        if (this.mana >= _spellCost)
            this.decMana(_spellCost);
        return this;
    }

    addPreferredSpecies(_species) {
        if (Game.kSpeciesTypes.has(_species)) {
            _species = _species;
            this.prefersSpecies.add(_species);
        }
        return this;
    }

    addAvoidedSpecies(_species) {
        if (Game.kSpeciesTypes.has(_species)) {
            _species = _species;
            this.avoidsSpecies.add(_species);
        }
        return this;
    }

    addNewDisposition(_character, passionOffset = 0, friendshipOffset = 0, playfulnessOffset = 0, soulmateOffset = 0, familialOffset = 0, obsessionOffset = 0, hateOffset = 0) {
        return this.addNewCharacterDispositionFor(_character, passionOffset, friendshipOffset, playfulnessOffset, soulmateOffset, familialOffset, obsessionOffset, hateOffset);
    }
    addNewCharacterDispositionFor(_character, passionOffset = 0, friendshipOffset = 0, playfulnessOffset = 0, soulmateOffset = 0, familialOffset = 0, obsessionOffset = 0, hateOffset = 0) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return this;
        }

        if (this.prefersSpecies.has(_character.species)) {
            if (this.prefersSex == _character.getSex()) {
                if (this.sexualOrientation == 0 && _character.getSex() != this.getSex() || this.sexualOrientation == 1 && _character.getSex() == this.getSex() || this.sexualOrientation == 2) {
                    if (this.philautia > 74) {
                        if (this.agape > 74)
                            passionOffset += 3;
                        else if (this.agape > 49)
                            passionOffset += 2;
                        else {
                            passionOffset++;
                            obsessionOffset++;
                        }
                        passionOffset++;
                    }
                    else {
                        if (this.agape > 74)
                            passionOffset++;
                        passionOffset += 2;
                    }

                    if (this.prefersPrey && _character.predator == false || this.prefersPredators && _character.predator == true) {
                        passionOffset += 2;
                        obsessionOffset++;
                    }

                    passionOffset++;
                }
            }

            if (this.age >= _character.age + (this.age/10)) {
                if (this.philautia > 74)
                    obsessionOffset++;

                if (this.agape > 74)
                    familialOffset += 3;
                else if (this.agape > 49)
                    familialOffset += 2;

                familialOffset++;
            }

            if (this.philautia > 74 && this.agape > 50) {
                if (this.prefersPrey && _character.predator == false || this.prefersPredators && _character.predator == true) {
                    friendshipOffset++;
                    playfulnessOffset++;
                }

                friendshipOffset++;
                playfulnessOffset += 2;
            }

            playfulnessOffset += 2;
        }
        else if (this.avoidsSpecies.has(_character.species)) {
            if (this.prefersSex == _character.getSex()) {
                if (this.sexualOrientation == 0 && _character.getSex() != this.getSex() || this.sexualOrientation == 1 && _character.getSex() == this.getSex() || this.sexualOrientation == 2) {
                    if (this.philautia > 74) {
                        if (this.agape > 74)
                            passionOffset += 2;
                    }
                    else {
                        if (this.agape > 74)
                            passionOffset++;
                    }

                    if (this.prefersPrey && _character.predator == false || this.prefersPredators && _character.predator == true) {
                        passionOffset++;
                        obsessionOffset++;
                    }
                }
            }

            if (this.age >= _character.age + (this.age/10)) {
                if (this.philautia > 74) {
                    if (this.agape > 74)
                        familialOffset++;
                }
                else {
                    if (this.agape > 74)
                        familialOffset++;
                }
                familialOffset++;
            }

            if (this.philautia > 74 && this.agape > 50) {
                if (this.prefersPrey && _character.predator == false || this.prefersPredators && _character.predator == true) {
                    friendshipOffset++;
                    playfulnessOffset++;
                }

                friendshipOffset++;
                playfulnessOffset += 2;
            }
        }
        else {
            if (this.prefersSex == _character.getSex()) {
                if (this.sexualOrientation == 0 && _character.getSex() != this.getSex() || this.sexualOrientation == 1 && _character.getSex() == this.getSex() || this.sexualOrientation == 2) {
                    if (this.philautia > 74) {
                        if (this.agape > 74)
                            passionOffset += 2;
                        else if (this.agape > 49)
                            passionOffset++;
                        else
                            obsessionOffset++;

                        passionOffset++;
                    }
                    else {
                        if (this.agape > 74)
                            passionOffset++;
                        passionOffset++;
                    }

                    if (this.prefersPrey && _character.predator == false || this.prefersPredators && _character.predator == true) {
                        passionOffset++;
                        obsessionOffset++;
                    }

                    passionOffset++;
                }
            }
        }

        this.setCharacterDisposition(
            _character,
            this.defaultDisposition.passion + passionOffset,
            this.defaultDisposition.friendship + friendshipOffset,
            this.defaultDisposition.playfulness + playfulnessOffset,
            this.defaultDisposition.soulmate + soulmateOffset,
            this.defaultDisposition.familial + familialOffset,
            this.defaultDisposition.obsession + obsessionOffset,
            this.defaultDisposition.hate + hateOffset
        );
        return this;
    }

    hadSexWith(_character) {
        if (!(_character instanceof Character)) {
            if (Game.hasCharacter(_character))
                _character = Game.getCharacter(_character);
            else
                return false;
        }
        return this.getSexCount(_character) > 0;
    }
    calculateChanceToFuck(_character, _ignoreLustAndRut = false) {
        if (!(_character instanceof Character))
            _character = Game.hasCharacter(_character) ? Game.getCharacter(_character) : undefined;
        if (typeof _character == 'undefined')
            return 0;
        if (!_character.characterDisposition.has(this))
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
                if (_character.rut && _character.lust > 98)
                    chance += (_character.rut ? _character.lust/1.5 : _character.lust/2);
                else if (_character.lust > 89)
                    chance += (_character.rut ? _character.lust/2 : _character.lust/4);
                else if (_character.lust > 74)
                    chance += (_character.rut ? _character.lust/4 : _character.lust/8);
                else if (_character.lust > 59)
                    chance += (_character.rut ? _character.lust/8 : _character.lust/12);
                else if (_character.lust > 49)
                    chance += (_character.rut ? _character.lust/12 : _character.lust/16);
                else
                    chance += (_character.rut ? _character.lust/16 : _character.lust/20);
        
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
}