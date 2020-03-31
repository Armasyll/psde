/**
 * Enum for Entities
 * @readonly
 * @enum {number}
 */
let EntityEnum = {
    "ABSTRACT": 0,
    "ENTIY": 1,
    "CHARACTER": 2,
    "ITEM": 3,
    "FURNITURE": 4,
    "DOOR": 5,
    "SPELL": 6,
    "CREATURE": 7,
    /** @type {object} */
    "properties": {
        0: {
            "name": "Abstract",
            "value": 0,
            "key": "ABSTRACT"
        },
        1: {
            "name": "Entity",
            "value": 1,
            "key": "ENTITY"
        },
        2: {
            "name": "Character",
            "value": 2,
            "key": "CHARACTER"
        },
        3: {
            "name": "Item",
            "value": 3,
            "key": "ITEM"
        },
        4: {
            "name": "Furniture",
            "value": 4,
            "key": "FURNITURE"
        },
        5: {
            "name": "Door",
            "value": 5,
            "key": "DOOR"
        },
        6: {
            "name": "Spell",
            "value": 6,
            "key": "SPELL"
        },
        7: {
            "name": "Creature",
            "value": 7,
            "key": "CREATURE"
        }
    }
};
/**
 * Enum for Sexes
 * @readonly
 * @enum {number}
 */
let SexEnum = {
    "NONE": 0,
    "MALE": 1,
    "FEMALE": 2,
    "properties": {
        0: {
            "name": "None",
            "value": 0,
            "key": "NONE"
        },
        1: {
            "name": "Male",
            "value": 1,
            "key": "MALE"
        },
        2: {
            "name": "Female",
            "value": 2,
            "key": "FEMALE"
        }
    }
};
/**
 * Enum for Stances
 * @readonly
 * @enum {number}
 */
let StanceEnum = {
    "LAY": 0,
    "SIT": 1,
    "CROUCH": 2,
    "STAND": 3,
    "FLY": 4,
    "FALL": 5,
    "SWIM": 6,
    "properties": {
        0: {
            "name": "Lay",
            "value": 0,
            "key": "LAY"
        },
        1: {
            "name": "Sit",
            "value": 1,
            "key": "SIT"
        },
        2: {
            "name": "Crouch",
            "value": 2,
            "key": "CROUCH"
        },
        3: {
            "name": "Stand",
            "value": 3,
            "key": "STAND"
        },
        4: {
            "name": "Fly",
            "value": 4,
            "key": "FLY"
        },
        5: {
            "name": "Fall",
            "value": 5,
            "key": "FALL"
        },
        6: {
            "name": "Swim",
            "value": 6,
            "key": "SWIM"
        }
    }
};
/**
 * Enum for Items
 * @readonly
 * @enum {number}
 */
let ItemEnum = {
    "GENERAL": 0,
    "APPAREL": 1,
    "KEY": 2,
    "WEAPON": 3,
    "CONSUMABLE": 4,
    "BOOK": 5,
    "TRASH": 6,
    "SHIELD": 7,
    "properties": {
        0: {
            "name": "General",
            "value": 0,
            "key": "GENERAL"
        },
        1: {
            "name": "Apparel",
            "value": 1,
            "key": "APPAREL"
        },
        2: {
            "name": "Key",
            "value": 2,
            "key": "KEY"
        },
        3: {
            "name": "Weapon",
            "value": 3,
            "key": "WEAPON"
        },
        4: {
            "name": "Consumable",
            "value": 4,
            "key": "CONSUMABLE"
        },
        5: {
            "name": "Book",
            "value": 5,
            "key": "BOOK"
        },
        6: {
            "name": "Trash",
            "value": 6,
            "key": "TRASH"
        },
        7: {
            "name": "Shield",
            "value": 7,
            kay: "SHIELD"
        }
    }
};
/**
 * Enum for Furniture
 * @readonly
 * @enum {number}
 */
let FurnitureEnum = {
    "NONE": 0,
    "CHAIR": 1,
    "LOVESEAT": 2,
    "COUCH": 3,
    "BED": 4,
    "DESK": 5,
    "SHELF": 6,
    "CUPBOARD": 7,
    "CABINET": 8,
    "BUREAU": 9,
    "TELEVISION": 10,
    "REFRIGERATOR": 11,
    "OVEN": 12,
    "MICROWAVE": 13,
    "TOASTER": 14,
    "TUB": 15,
    "SHOWER": 16,
    "SINK": 17,
    "TOILET": 18,
    "MIRROR": 19,
    "BASKET": 20,
    "LAMP": 21,
    "TABLE": 22,
    "properties": {
        0: {
            "name": "None",
            "value": 0,
            "key": "NONE"
        },
        1: {
            "name": "Chair",
            "value": 1,
            "key": "CHAIR"
        },
        2: {
            "name": "Loveseat",
            "value": 2,
            "key": "LOVESEAT"
        },
        3: {
            "name": "Couch",
            "value": 3,
            "key": "COUCH"
        },
        4: {
            "name": "Bed",
            "value": 4,
            "key": "BED"
        },
        5: {
            "name": "Desk",
            "value": 5,
            "key": "DESK"
        },
        6: {
            "name": "Shelf",
            "value": 6,
            "key": "SHELF"
        },
        7: {
            "name": "Cupboard",
            "value": 7,
            "key": "CUPBOARD"
        },
        8: {
            "name": "Cabinet",
            "value": 8,
            "key": "CABINET"
        },
        9: {
            "name": "Bureau",
            "value": 9,
            "key": "BUREAU"
        },
        10: {
            "name": "Television",
            "value": 10,
            "key": "TELEVISION"
        },
        11: {
            "name": "Refrigerator",
            "value": 11,
            "key": "REFRIGERATOR"
        },
        12: {
            "name": "Oven",
            "value": 12,
            "key": "OVEN"
        },
        13: {
            "name": "Microwave",
            "value": 13,
            "key": "MICROWAVE"
        },
        14: {
            "name": "Toaster",
            "value": 14,
            "key": "TOASTER"
        },
        15: {
            "name": "Tub",
            "value": 15,
            "key": "TUB"
        },
        16: {
            "name": "Shower",
            "value": 16,
            "key": "SHOWER"
        },
        17: {
            "name": "Sink",
            "value": 17,
            "key": "SINK"
        },
        18: {
            "name": "Toilet",
            "value": 18,
            "key": "TOILET"
        },
        19: {
            "name": "Mirror",
            "value": 19,
            "key": "MIRROR"
        },
        20: {
            "name": "Basket",
            "value": 20,
            "key": "BASKET"
        },
        21: {
            "name": "Lamp",
            "value": 21,
            "key": "LAMP"
        },
        22: {
            "name": "Table",
            "value": 22,
            "key": "TABLE"
        }
    }
};
/**
 * Enum for Apparel Slots
 * @readonly
 * @enum {number}
 */
let ApparelSlotEnum = {
    "NONE": 0,
    "HEAD": 1,
    "EAR_L": 2,
    "EAR_R": 3,
    "EARS": 4,
    "EYE_L": 5,
    "EYE_R": 6,
    "EYES": 7,
    "NOSE": 8,
    "NECK": 9,
    "SHOULDER_L": 10,
    "SHOULDER_R": 11,
    "SHOULDERS": 12,
    "CHEST": 13,
    "HAND_L": 14,
    "HAND_R": 15,
    "HANDS": 16,
    "PELVIS": 17,
    "LEG_L": 18,
    "LEG_R": 19,
    "LEGS": 20,
    "FOOT_L": 21,
    "FOOT_R": 22,
    "FEET": 23,
    "WRIST_L": 24,
    "WRIST_R": 25,
    "WRISTS": 26,
    "FOREARM_L": 27,
    "FOREARM_R": 28,
    "FOREARMS": 29,
    "THUMB_L": 40,
    "INDEX_L": 41,
    "MIDDLE_L": 42,
    "PINKIE_L": 43,
    "FINGERS_L": 44,
    "THUMB_R": 45,
    "INDEX_R": 46,
    "MIDDLE_R": 47,
    "PINKIE_R": 48,
    "FINGERS_R": 49,
    "FINGERS": 50,
    "properties": {
        0: {
            "name": "None",
            "value": 0,
            "key": "NONE"
        },
        1: {
            "name": "Head",
            "value": 1,
            "key": "HEAD"
        },
        2: {
            "name": "Left Ear",
            "value": 2,
            "key": "EAR_L"
        },
        3: {
            "name": "Right Ear",
            "value": 3,
            "key": "EAR_R"
        },
        4: {
            "name": "Ears",
            "value": 4,
            "key": "EARS"
        },
        5: {
            "name": "Left Eye",
            "value": 5,
            "key": "EYE_L"
        },
        6: {
            "name": "Right Eye",
            "value": 6,
            "key": "EYE_R"
        },
        7: {
            "name": "Eyes",
            "value": 7,
            "key": "EYES"
        },
        8: {
            "name": "Nose",
            "value": 8,
            "key": "NOSE"
        },
        9: {
            "name": "Neck",
            "value": 9,
            "key": "NECK"
        },
        10: {
            "name": "Left Shoulder",
            "value": 10,
            "key": "SHOULDER_L"
        },
        11: {
            "name": "Right Shoulder",
            "value": 11,
            "key": "SHOULDER_R"
        },
        12: {
            "name": "Shoulders",
            "value": 12,
            "key": "SHOULDERS"
        },
        13: {
            "name": "Chest",
            "value": 13,
            "key": "CHEST"
        },
        14: {
            "name": "Left Hand",
            "value": 14,
            "key": "HAND_L"
        },
        15: {
            "name": "Right Hand",
            "value": 15,
            "key": "HAND_R"
        },
        16: {
            "name": "Hands",
            "value": 16,
            "key": "HANDS"
        },
        17: {
            "name": "Pelvis",
            "value": 17,
            "key": "PELVIS"
        },
        18: {
            "name": "Left Leg",
            "value": 18,
            "key": "LEG_L"
        },
        19: {
            "name": "Right Leg",
            "value": 19,
            "key": "LEG_R"
        },
        20: {
            "name": "Legs",
            "value": 20,
            "key": "LEGS"
        },
        21: {
            "name": "Left Foot",
            "value": 21,
            "key": "FOOT_L"
        },
        22: {
            "name": "Right Foot",
            "value": 22,
            "key": "FOOT_R"
        },
        23: {
            "name": "Feet",
            "value": 23,
            "key": "FEET"
        },
        24: {
            "name": "Left Wrist",
            "value": 24,
            "key": "WRIST_L"
        },
        25: {
            "name": "Right Wrist",
            "value": 25,
            "key": "WRIST_R"
        },
        26: {
            "name": "Wrists",
            "value": 26,
            "key": "WRISTS"
        },
        27: {
            "name": "Left Forearm",
            "value": 27,
            "key": "FOREARM_L"
        },
        28: {
            "name": "Right Forearm",
            "value": 28,
            "key": "FOREARM_R"
        },
        29: {
            "name": "Forearms",
            "value": 29,
            "key": "FOREARMS"
        },
        40: {
            "name": "Left Thumb",
            "value": 40,
            "key": "THUMB_L"
        },
        41: {
            "name": "Left Index Finger",
            "value": 41,
            "key": "INDEX_L"
        },
        42: {
            "name": "Left Middle Finger",
            "value": 42,
            "key": "MIDDLE_L"
        },
        43: {
            "name": "Left Pinkie Finger",
            "value": 43,
            "key": "PINKIE_L"
        },
        44: {
            "name": "Left Fingers",
            "value": 44,
            "key": "FINGERS_L"
        },
        45: {
            "name": "Right Thumb",
            "value": 45,
            "key": "THUMB_R"
        },
        46: {
            "name": "Right Index Finger",
            "value": 46,
            "key": "INDEX_R"
        },
        47: {
            "name": "Right Middle Finger",
            "value": 47,
            "key": "MIDDLE_R"
        },
        48: {
            "name": "Right Pinkie Finger",
            "value": 48,
            "key": "PINKIE_R"
        },
        49: {
            "name": "Right Fingers",
            "value": 49,
            "key": "FINGERS_R"
        },
        50: {
            "name": "Fingers",
            "value": 50,
            "key": "FINGERS"
        }
    }
};
/**
 * Enum for Handedness
 * @readonly
 * @enum {number}
 */
let HandednessEnum = {
    "NONE": 0,
    "LEFT": 14,
    "RIGHT": 15,
    "properties": {
        0: {
            "name": "None",
            "value": 0,
            "key": "NONE"
        },
        14: {
            "name": "Left",
            "value": 14,
            "key": "LEFT"
        },
        15: {
            "name": "Right",
            "value": 15,
            "key": "RIGHT"
        }
    }
};
/**
 * Enum for Paws
 * @readonly
 * @enum {number}
 */
let PawEnum = {
    "NONE": 0,
    "FUR": 1,
    "PAD": 2,
    "HOOF": 3,
    "SKIN": 4,
    "properties": {
        0: {
            "name": "None",
            "value": 0,
            "key": "NONE"
        },
        1: {
            "name": "Fur",
            "value": 1,
            "key": "FUR"
        },
        2: {
            "name": "Pad",
            "value": 2,
            "key": "PAD"
        },
        3: {
            "name": "Hoof",
            "value": 3,
            "key": "HOOF"
        },
        4: {
            "name": "Skin",
            "value": 4,
            "key": "SKIN"
        }
    }
};
/**
 * Enum for Eyes
 * @readonly
 * @enum {number}
 */
let EyeEnum = {
    "NONE": 0,
    "CIRCLE": 1,
    "SLIT": 2,
    "OBLONG": 3,
    "properties": {
        0: {
            "name": "None",
            "value": 0,
            "key": "NONE"
        },
        1: {
            "name": "Circle",
            "value": 1,
            "key": "CIRCLE"
        },
        2: {
            "name": "Slit",
            "value": 2,
            "key": "SLIT"
        },
        3: {
            "name": "Oblong",
            "value": 3,
            "key": "OBLONG"
        }
    }
};
/**
 * Enum for Pelts
 * @readonly
 * @enum {number}
 */
let PeltEnum = {
    "NONE": 0,
    "SKIN": 1,
    "FUR": 2,
    "WOOL": 3,
    "HAIR": 4,
    "properties": {
        0: {
            "name": "None",
            "value": 0,
            "key": "NONE"
        },
        1: {
            "name": "Skin",
            "value": 1,
            "key": "SKIN"
        },
        2: {
            "name": "Fur",
            "value": 2,
            "key": "FUR"
        },
        3: {
            "name": "Wool",
            "value": 3,
            "key": "WOOL"
        },
        4: {
            "name": "Hair",
            "value": 4,
            "key": "HAIR"
        }
    }
};
/**
 * Enum for Actions
 * @readonly
 * @enum {number}
 */
let ActionEnum = {
    "NONE": 0,
    "LAY": 1,
    "SIT": 2,
    "CROUCH": 3,
    "STAND": 4,
    "FLY": 5,
    "SLEEP": 6,
    "MOVE": 7,
    "CLOSE": 8,
    "CONSUME": 9,
    "DROP": 10,
    "EQUIP": 11,
    "HOLD": 12,
    "LOOK": 13,
    "OPEN": 14,
    "RELEASE": 15,
    "TAKE": 16,
    "TALK": 17,
    "TOUCH": 18,
    "UNEQUIP": 19,
    "USE": 20,
    "ATTACK": 21,
    "READ": 22,
    "properties": {
        0: {
            "name": "None",
            "value": 0,
            "key": "NONE"
        },
        1: {
            "name": "Lay",
            "value": 1,
            "key": "LAY"
        },
        2: {
            "name": "Sit",
            "value": 2,
            "key": "SIT"
        },
        3: {
            "name": "Crouch",
            "value": 3,
            "key": "CROUCH"
        },
        4: {
            "name": "Stand",
            "value": 4,
            "key": "STAND"
        },
        5: {
            "name": "Fly",
            "value": 5,
            "key": "FLY"
        },
        6: {
            "name": "Sleep",
            "value": 6,
            "key": "SLEEP"
        },
        7: {
            "name": "Move",
            "value": 7,
            "key": "MOVE"
        },
        8: {
            "name": "Close",
            "value": 8,
            "key": "CLOSE"
        },
        9: {
            "name": "Consume",
            "value": 9,
            "key": "CONSUME"
        },
        10: {
            "name": "Drop",
            "value": 10,
            "key": "DROP"
        },
        11: {
            "name": "Equip",
            "value": 11,
            "key": "EQUIP"
        },
        12: {
            "name": "Hold",
            "value": 12,
            "key": "HOLD"
        },
        13: {
            "name": "Look",
            "value": 13,
            "key": "LOOK"
        },
        14: {
            "name": "Open",
            "value": 14,
            "key": "OPEN"
        },
        15: {
            "name": "Release",
            "value": 15,
            "key": "RELEASE"
        },
        16: {
            "name": "Take",
            "value": 16,
            "key": "TAKE"
        },
        17: {
            "name": "Talk",
            "value": 17,
            "key": "TALK"
        },
        18: {
            "name": "Touch",
            "value": 18,
            "key": "TOUCH"
        },
        19: {
            "name": "Unequip",
            "value": 19,
            "key": "UNEQUIP"
        },
        20: {
            "name": "Use",
            "value": 20,
            "key": "USE"
        },
        21: {
            "name": "Attack",
            "value": 21,
            "key": "ATTACK"
        },
        22: {
            "name": "Read",
            "value": 22,
            "key": "READ"
        }
    }
};
/**
 * Enum for Consumables
 * @readonly
 * @enum {number}
 */
let ConsumableEnum = {
    "FOOD": 0,
    "DRINK": 1,
    "MEDICINE": 2,
    "properties": {
        0: {
            "name": "Food",
            "value": 0,
            "key": "FOOD"
        },
        1: {
            "name": "Drink",
            "value": 1,
            "key": "DRINK"
        },
        2: {
            "name": "Medicine",
            "value": 2,
            "key": "MEDICINE"
        }
    }
};
/**
 * Enum for SpecialProperties
 * @readonly
 * @enum {number}
 */
let SpecialPropertyEnum = {
    "EXISTS": 0,
    "LIVING": 2,
    "DEAD": 3,
    "MIRROR": 4,
    "WATER": 5,
    "EARTH": 6,
    "METAL": 7,
    "BROKEN": 8,
    "WOOD": 9,
    "MAGIC": 10,
    "NATURE": 11,
    "CONTAINER": 12,
    "CHARM": 13,
    "BONE": 14,
    "JAGGED": 15,
    "SMOOTH": 16,
    "CURSED": 17,
    "BLESSED": 18,
    "BLUDGEONING": 19,
    "SLASHING": 20,
    "PIERCING": 21,
    "ACID": 22,
    "COLD": 23,
    "FIRE": 24,
    "LIGHTNING": 25,
    "NECROTIC": 26,
    "POISON": 27,
    "properties": {
        0: {
            "name": "Exists",
            "value": 0,
            "key": "EXISTS"
        },
        2: {
            "name": "Living",
            "value": 2,
            "key": "LIVING"
        },
        3: {
            "name": "Dead",
            "value": 3,
            "key": "DEAD"
        },
        4: {
            "name": "Mirror",
            "value": 4,
            "key": "MIRROR"
        },
        5: {
            "name": "Water",
            "value": 5,
            "key": "WATER"
        },
        6: {
            "name": "Earth",
            "value": 6,
            "key": "EARTH"
        },
        7: {
            "name": "Metal",
            "value": 7,
            "key": "METAL"
        },
        8: {
            "name": "Broken",
            "value": 8,
            "key": "BROKEN"
        },
        9: {
            "name": "Wood",
            "value": 9,
            "key": "WOOD"
        },
        10: {
            "name": "Magic",
            "value": 10,
            "key": "MAGIC"
        },
        11: {
            "name": "Nature",
            "value": 11,
            "key": "NATURE"
        },
        12: {
            "name": "Container",
            "value": 12,
            "key": "CONTAINER"
        },
        13: {
            "name": "Charm",
            "value": 13,
            "key": "CHARM"
        },
        14: {
            "name": "Bone",
            "value": 14,
            "key": "BONE"
        },
        15: {
            "name": "Jagged",
            "value": 15,
            "key": "JAGGED"
        },
        16: {
            "name": "Smooth",
            "value": 16,
            "key": "SMOOTH"
        },
        17: {
            "name": "Cursed",
            "value": 17,
            "key": "CURSED"
        },
        18: {
            "name": "Blessed",
            "value": 18,
            "key": "BLESSED"
        },
        19: {
            "name": "Bludgeoning",
            "value": 19,
            "key": "BLUDGEONING"
        },
        20: {
            "name": "Slashing",
            "value": 20,
            "key": "SLASHING"
        },
        21: {
            "name": "Piercing",
            "value": 21,
            "key": "PIERCING"
        },
        22: {
            "name": "Acid",
            "value": 22,
            "key": "ACID"
        },
        23: {
            "name": "Cold",
            "value": 23,
            "key": "COLD"
        },
        24: {
            "name": "Fire",
            "value": 24,
            "key": "FIRE"
        },
        25: {
            "name": "Lightning",
            "value": 25,
            "key": "LIGHTNING"
        },
        26: {
            "name": "Necrotic",
            "value": 26,
            "key": "NECROTIC"
        },
        27: {
            "name": "Poison",
            "value": 27,
            "key": "POISON"
        }
    }
};
/**
 * Enum for CharacterClasses
 * @readonly
 * @enum {number}
 */
let CharacterClassEnum = {
    "CLASSLESS": 0,
    "BARD": 1,
    "CLERIC": 2,
    "DRUID": 3,
    "PALADIN": 4,
    "RANGER": 5,
    "SORCERER": 6,
    "WARLOCK": 7,
    "WIZARD": 8,
    "COMMONER": 9,
    "EXPERT": 10,
    "NOBLE": 11,
    "properties": {
        0: {
            "name": "Classless",
            "value": 0,
            "key": "CLASSLESS"
        },
        1: {
            "name": "Bard",
            "value": 1,
            "key": "BARD"
        },
        2: {
            "name": "Cleric",
            "value": 2,
            "key": "CLERIC"
        },
        3: {
            "name": "Druid",
            "value": 3,
            "key": "DRUID"
        },
        4: {
            "name": "Paladin",
            "value": 4,
            "key": "PALADIN"
        },
        5: {
            "name": "Ranger",
            "value": 5,
            "key": "RANGER"
        },
        6: {
            "name": "Sorcerer",
            "value": 6,
            "key": "SORCERER"
        },
        7: {
            "name": "Warlock",
            "value": 7,
            "key": "WARLOCK"
        },
        8: {
            "name": "Wizard",
            "value": 8,
            "key": "WIZARD"
        },
        9: {
            "name": "Commoner",
            "value": 9,
            "key": "COMMONER"
        },
        10: {
            "name": "Expert",
            "value": 10,
            "key": "EXPERT"
        },
        11: {
            "name": "Noble",
            "value": 11,
            "key": "NOBLE"
        }
    }
};
/**
 * Enum for SpellTypes
 * @readonly
 * @enum {number}
 */
let SpellTypeEnum = {
    "UNIVERSAL": 9,
    "ABJURATION": 1,
    "CONJURATION": 2,
    "DIVINATION": 3,
    "ENCHANTMENT": 4,
    "EVOCATION": 5,
    "ILLUSION": 6,
    "NECROMANCY": 7,
    "TRANSMUTATION": 8,
    "properties": {
        0: {
            "name": "Universal",
            "value": 0,
            "key": "UNIVERSAL"
        },
        1: {
            "name": "Abjuration",
            "value": 1,
            "key": "ABJURATION"
        },
        2: {
            "name": "Conjuration",
            "value": 2,
            "key": "CONJURATION"
        },
        3: {
            "name": "Divination",
            "value": 3,
            "key": "DIVINATION"
        },
        4: {
            "name": "Enchantment",
            "value": 4,
            "key": "ENCHANTMENT"
        },
        5: {
            "name": "Evocation",
            "value": 5,
            "key": "EVOCATION"
        },
        6: {
            "name": "Illusion",
            "value": 6,
            "key": "ILLUSION"
        },
        7: {
            "name": "Necromancy",
            "value": 7,
            "key": "NECROMANCY"
        },
        8: {
            "name": "Transmutation",
            "value": 8,
            "key": "TRANSMUTATION"
        }
    }
};
/**
 * Enum for Armour Categories
 * @readonly
 * @enum {number}
 */
let ArmourCategoryEnum = {
    "LIGHT_ARMOR": 0,
    "LIGHT_ARMOUR": 0,
    "MEDIUM_ARMOR": 1,
    "MEDIUM_ARMOUR": 1,
    "HEAVY_ARMOR": 2,
    "HEAVY_ARMOUR": 2,
    "SHIELD": 3,
    "properties": {
        0: {
            "name": "Light Armour",
            "value": 0,
            "key": "LIGHT_ARMOUR"
        },
        1: {
            "name": "Medium Armour",
            "value": 1,
            "key": "MEDIUM_ARMOUR"
        },
        2: {
            "name": "Heavy Armour",
            "value": 2,
            "key": "HEAVY_ARMOUR"
        },
        3: {
            "name": "Shield",
            "value": 3,
            "key": "SHIELD"
        }
    }
};
/**
 * Enum for Armour Categories
 * @readonly
 * @enum {number}
 */
let ArmorCategoryEnum = ArmourCategoryEnum;
/**
 * Enum for Armours
 * @readonly
 * @enum {number}
 */
let ArmourEnum = {
    "NONE": 0,
    "PADDED": 1,
    "LEATHER": 2,
    "STUDDEDLEATHER": 3,
    "HIDE": 4,
    "CHAINSHIRT": 5,
    "SCALEMAIL": 6,
    "BREASTPLATE": 7,
    "HALFPLATE": 8,
    "RINGMAIL": 9,
    "CHAINMAIL": 10,
    "SPLINT": 11,
    "PLATE": 12,
    "SHIELD": 13,
    "properties": {
        0: {
            "name": "None",
            "value": 0,
        },
        1: {
            "name": "Padded",
            "value": 1,
        },
        2: {
            "name": "Leather",
            "value": 2,
        },
        3: {
            "name": "Studded Leather",
            "value": 3,
        },
        4: {
            "name": "Hide",
            "value": 4,
        },
        5: {
            "name": "Chain Shirt",
            "value": 5,
        },
        6: {
            "name": "Scale Mail",
            "value": 6,
        },
        7: {
            "name": "Breastplate",
            "value": 7,
        },
        8: {
            "name": "Half Plate",
            "value": 8,
        },
        9: {
            "name": "Ring Mail",
            "value": 9,
        },
        10: {
            "name": "Chain Mail",
            "value": 10,
        },
        11: {
            "name": "Splint",
            "value": 11,
        },
        12: {
            "name": "Plate",
            "value": 12,
        },
        13: {
            "name": "Shield",
            "value": 13,
        }
    }
};
/**
 * Enum for Armours
 * @readonly
 * @enum {number}
 */
let ArmorEnum = ArmourEnum;
/**
 * Enum for Damage types
 * @readonly
 * @enum {number}
 */
let DamageEnum = {
    "BLUDGEONING": 0,
    "ACID": 1,
    "COLD": 2,
    "FIRE": 3,
    "FORCE": 4,
    "LIGHTNING": 5,
    "NECROTIC": 6,
    "PIERCING": 7,
    "POISON": 8,
    "PSYCHIC": 9,
    "RADIANT": 10,
    "SLASHING": 11,
    "THUNDER": 12,
    "DISEASE": 13, // special
    "properties": {
        0: {
            "name": "Bludgeoning",
            "value": 0,
            "key": "BLUDGEONING"
        },
        1: {
            "name": "Acid",
            "value": 1,
            "key": "ACID"
        },
        2: {
            "name": "Cold",
            "value": 2,
            "key": "COLD"
        },
        3: {
            "name": "Fire",
            "value": 3,
            "key": "FIRE"
        },
        4: {
            "name": "Force",
            "value": 4,
            "key": "FORCE"
        },
        5: {
            "name": "Lightning",
            "value": 5,
            "key": "LIGHTNING"
        },
        6: {
            "name": "Necrotic",
            "value": 6,
            "key": "NECROTIC"
        },
        7: {
            "name": "Piercing",
            "value": 7,
            "key": "PIERCING"
        },
        8: {
            "name": "Poison",
            "value": 8,
            "key": "POISON"
        },
        9: {
            "name": "Psychic",
            "value": 9,
            "key": "PSYCHIC"
        },
        10: {
            "name": "Radiant",
            "value": 10,
            "key": "RADIANT"
        },
        11: {
            "name": "Slashing",
            "value": 11,
            "key": "SLASHING"
        },
        12: {
            "name": "Thunder",
            "value": 12,
            "key": "THUNDER"
        },
        13: {
            "name": "Disease",
            "value": 13,
            "key": "DISEASE"
        }
    }
};
/**
 * Enum for Weapon Categories
 * @readonly
 * @enum {number}
 */
let WeaponCategoryEnum = {
    "SIMPLE_MELEE": 0,
    "SIMPLE_RANGED": 1,
    "MARTIAL_MELEE": 2,
    "MARTIAL_RANGED": 3,
    "properties": {
        0: {
            "name": "Simple Melee",
            "value": 0,
            "key": "SIMPLE_MELEE"
        },
        1: {
            "name": "Simple Ranged",
            "value": 1,
            "key": "SIMPLE_RANGED"
        },
        2: {
            "name": "Martial Melee",
            "value": 2,
            "key": "MARTIAL_MELEE"
        },
        3: {
            "name": "Martial Ranged",
            "value": 3,
            "key": "MARTIAL_RANGED"
        }
    }
};
/**
 * Enum for Weapons
 * @readonly
 * @enum {number}
 */
let WeaponEnum = {
    "NONE": 0,
    "CLUB": 1,
    "DAGGER": 2,
    "GREAT_CLUB": 3,
    "HANDAXE": 4,
    "JAVELIN": 5,
    "LIGHT_HAMMER": 6,
    "MACE": 7,
    "QUARTERSTAFF": 8,
    "SICKLE": 9,
    "SPEAR": 10,
    "LIGHT_CROSSBOW": 11,
    "DART": 12,
    "SHORTBOW": 13,
    "SLING": 14,
    "HANDGUN": 15,
    "BATTLEAXE": 16,
    "FLAIL": 17,
    "GLAIVE": 18,
    "GREATAXE": 19,
    "GREATSWORD": 20,
    "HALBERD": 21,
    "LANCE": 22,
    "LONGSWORD": 23,
    "MAUL": 24,
    "MORNINGSTAR": 25,
    "PIKE": 26,
    "RAPIER": 27,
    "SCIMITAR": 28,
    "SHORTSWORD": 29,
    "TRIDENT": 30,
    "WARPICK": 31,
    "WARHAMMER": 32,
    "WHIP": 33,
    "BLOWGUN": 34,
    "HAND_CROSSBOW": 35,
    "HEAVY_CROSSBOW": 36,
    "LONGBOW": 37,
    "NET": 38,
    "RIFLE": 39,
    "SHOTGUN": 40,
    "properties": {
        0: {
            "name": "None",
            "value": 0,
            "key": "NONE"
        },
        1: {
            "name": "Club",
            "value": 1,
            "key": "CLUB"
        },
        2: {
            "name": "Dagger",
            "value": 2,
            "key": "DAGGER"
        },
        3: {
            "name": "Great Club",
            "value": 3,
            "key": "GREAT_CLUB"
        },
        4: {
            "name": "Handaxe",
            "value": 4,
            "key": "HANDAXE"
        },
        5: {
            "name": "Javelin",
            "value": 5,
            "key": "JAVELIN"
        },
        6: {
            "name": "Light Hammer",
            "value": 6,
            "key": "LIGHT_HAMMER"
        },
        7: {
            "name": "Mace",
            "value": 7,
            "key": "MACE"
        },
        8: {
            "name": "Quarterstaff",
            "value": 8,
            "key": "QUARTERSTAFF"
        },
        9: {
            "name": "Sickle",
            "value": 9,
            "key": "SICKLE"
        },
        10: {
            "name": "Spear",
            "value": 10,
            "key": "SPEAR"
        },
        11: {
            "name": "Light Crossbow",
            "value": 11,
            "key": "LIGHT_CROSSBOW"
        },
        12: {
            "name": "Dart",
            "value": 12,
            "key": "DART"
        },
        13: {
            "name": "Shortbow",
            "value": 13,
            "key": "SHORTBOW"
        },
        14: {
            "name": "Sling",
            "value": 14,
            "key": "SLING"
        },
        15: {
            "name": "Handgun",
            "value": 15,
            "key": "HANDGUN"
        },
        16: {
            "name": "Battleaxe",
            "value": 16,
            "key": "BATTLEAXE"
        },
        17: {
            "name": "Flail",
            "value": 17,
            "key": "FLAIL"
        },
        18: {
            "name": "Glaive",
            "value": 18,
            "key": "GLAIVE"
        },
        19: {
            "name": "Greataxe",
            "value": 19,
            "key": "GREATAXE"
        },
        20: {
            "name": "Greatsword",
            "value": 20,
            "key": "GREATSWORD"
        },
        21: {
            "name": "Halberd",
            "value": 21,
            "key": "HALBERD"
        },
        22: {
            "name": "Lance",
            "value": 22,
            "key": "LANCE"
        },
        23: {
            "name": "Longsword",
            "value": 23,
            "key": "LONGSWORD"
        },
        24: {
            "name": "Maul",
            "value": 24,
            "key": "MAUL"
        },
        25: {
            "name": "Morningstar",
            "value": 25,
            "key": "MORNINGSTAR"
        },
        26: {
            "name": "Pike",
            "value": 26,
            "key": "PIKE"
        },
        27: {
            "name": "Rapier",
            "value": 27,
            "key": "RAPIER"
        },
        28: {
            "name": "Scimitar",
            "value": 28,
            "key": "SCIMITAR"
        },
        29: {
            "name": "Shortsword",
            "value": 29,
            "key": "SHORTSWORD"
        },
        30: {
            "name": "Trident",
            "value": 30,
            "key": "TRIDENT"
        },
        31: {
            "name": "Warpick",
            "value": 31,
            "key": "WARPICK"
        },
        32: {
            "name": "Warhammer",
            "value": 32,
            "key": "WARHAMMER"
        },
        33: {
            "name": "Whip",
            "value": 33,
            "key": "WHIP"
        },
        34: {
            "name": "Blowgun",
            "value": 34,
            "key": "BLOWGUN"
        },
        35: {
            "name": "Hand Crossbow",
            "value": 35,
            "key": "HAND_CROSSBOW"
        },
        36: {
            "name": "Heavy Crossbow",
            "value": 36,
            "key": "HEAVY_CROSSBOW"
        },
        37: {
            "name": "Longbow",
            "value": 37,
            "key": "LONGBOW"
        },
        38: {
            "name": "Net",
            "value": 38,
            "key": "NET"
        },
        39: {
            "name": "Rifle",
            "value": 39,
            "key": "RIFLE"
        },
        40: {
            "name": "Shotgun",
            "value": 40,
            "key": "SHOTGUN"
        },
    }
};
/**
 * Enum for Weapon Properties
 * @readonly
 * @enum {number}
 */
let WeaponPropertyEnum = {
    "NONE": 0,
    "AMMUNITION": 1,
    "FINESSE": 2,
    "HEAVY": 3,
    "LIGHT": 4,
    "LOADING": 5,
    "RANGE": 6,
    "REACH": 7,
    "SPECIAL": 8,
    "THROWN": 9,
    "TWOHANDED": 10,
    "VERSATILE": 11,
    "properties": {
        0: {
            "name": "None",
            "value": 0,
            "key": "NONE"
        },
        1: {
            "name": "Ammunition",
            "value": 1,
            "key": "AMMUNITION"
        },
        2: {
            "name": "Finesse",
            "value": 2,
            "key": "FINESSE"
        },
        3: {
            "name": "Heavy",
            "value": 3,
            "key": "HEAVY"
        },
        4: {
            "name": "Light",
            "value": 4,
            "key": "LIGHT"
        },
        5: {
            "name": "Loading",
            "value": 5,
            "key": "LOADING"
        },
        6: {
            "name": "Range",
            "value": 6,
            "key": "RANGE"
        },
        7: {
            "name": "Reach",
            "value": 7,
            "key": "REACH"
        },
        8: {
            "name": "Special",
            "value": 8,
            "key": "SPECIAL"
        },
        9: {
            "name": "Thrown",
            "value": 9,
            "key": "THROWN"
        },
        10: {
            "name": "Two-Handed",
            "value": 10,
            "key": "TWOHANDED"
        },
        11: {
            "name": "Versatile",
            "value": 11,
            "key": "VERSATILE"
        }
    }
};
/**
 * Enum for Arcane Foci
 * @readonly
 * @enum {number}
 */
let ArcaneFocusEnum = {
    "NONE": 0,
    "CRYSTAL": 1,
    "ORB": 2,
    "ROD": 3,
    "STAFF": 4,
    "WAND": 5,
    "properties": {
        0: {
            "name": "None",
            "value": 0,
            "key": "NONE"
        },
        1: {
            "name": "Crystal",
            "value": 1,
            "key": "CRYSTAL"
        },
        2: {
            "name": "Orb",
            "value": 2,
            "key": "ORB"
        },
        3: {
            "name": "Rod",
            "value": 3,
            "key": "ROD"
        },
        4: {
            "name": "Staff",
            "value": 4,
            "key": "STAFF"
        },
        5: {
            "name": "Wand",
            "value": 5,
            "key": "WAND"
        }
    }
};
/**
 * Enum for Interface Modes
 * @readonly
 * @enum {number}
 */
let InterfaceModeEnum = {
    "NONE": 0,
    "CHARACTER": 1,
    "DIALOGUE": 2,
    "MENU": 3,
    "EDIT": 4,
    "WRITING": 5,
    "properties": {
        0: {
            "name": "None",
            "value": 0
        },
        1: {
            "name": "Character",
            "value": 1
        },
        2: {
            "name": "Dialogue",
            "value": 2
        },
        3: {
            "name": "Menu",
            "value": 3
        },
        4: {
            "name": "Edit",
            "value": 4
        },
        5: {
            "name": "Writing",
            "value": 5
        }
    }
};
/**
 * Enum for Roll types
 * @readonly
 * @enum {number}
 */
let RollEnum = {
    "TOTAL": 0,
    "MIN": 1,
    "AVG": 2,
    "MAX": 3,
    "properties": {
        0: {
            "name": "Total",
            "value": 0
        },
        1: {
            "name": "Minimum",
            "value": 1
        },
        2: {
            "name": "Average",
            "value": 2
        },
        3: {
            "name": "Maximum",
            "value": 3
        },
    }
};
/**
 * Enum for Conditions
 * @readonly
 * @enum {number}
 */
let ConditionEnum = {
    "BLINDED": 0,
    "CHARMED": 1,
    "DEAFENED": 2,
    "FATIGUED": 3,
    "FRIGHTENED": 4,
    "GRAPPLED": 5,
    "INCAPACITATED": 6,
    "INVISIBLE": 7,
    "PARALYZED": 8,
    "PETRIFIED": 9,
    "POISONED": 10,
    "PRONE": 11,
    "RESTRAINED": 12,
    "STUNNED": 13,
    "UNCONSCIOUS": 14,
    "properties": {
        0: {
            "name": "Blinded",
            "value": 0,
            "key": "BLINDED"
        },
        1: {
            "name": "Charmed",
            "value": 1,
            "key": "CHARMED"
        },
        2: {
            "name": "Deafened",
            "value": 2,
            "key": "DEAFENED"
        },
        3: {
            "name": "Fatigued",
            "value": 3,
            "key": "FATIGUED"
        },
        4: {
            "name": "Frightened",
            "value": 4,
            "key": "FRIGHTENED"
        },
        5: {
            "name": "Grappled",
            "value": 5,
            "key": "GRAPPLED"
        },
        6: {
            "name": "Incapacitated",
            "value": 6,
            "key": "INCAPACITATED"
        },
        7: {
            "name": "Invisible",
            "value": 7,
            "key": "INVISIBLE"
        },
        8: {
            "name": "Paralyzed",
            "value": 8,
            "key": "PARALYZED"
        },
        9: {
            "name": "Petrified",
            "value": 9,
            "key": "PETRIFIED"
        },
        10: {
            "name": "Poisoned",
            "value": 1,
            "key": "POISONED"
        },
        11: {
            "name": "Prone",
            "value": 1,
            "key": "PRONE"
        },
        12: {
            "name": "Restrained",
            "value": 1,
            "key": "RESTRAINED"
        },
        13: {
            "name": "Stunned",
            "value": 1,
            "key": "STUNNED"
        },
        14: {
            "name": "Unconscious",
            "value": 1,
            "key": "UNCONSCIOUS"
        }
    }
};
/**
 * Enum for Cell Types
 * @readonly
 * @enum {number}
 */
let CellTypeEnum = {
    "NONE": 0,
    "OVERWORLD": 1,
    "LIMBO": 2,
    "properties": {
        0: {
            "name": "None",
            "value": 0
        },
        1: {
            "name": "Overworld",
            "value": 1
        },
        2: {
            "name": "Limbo",
            "value": 2
        }
    }
};
/**
 * Enum for Proficiency Types
 * @readonly
 * @enum {number}
 */
let ProficiencyTypeEnum = {
    "ARMOUR": 0,
    "WEAPONS": 1,
    "SKILLS": 2,
    "SAVING_THROWS": 3,
    "TOOLS_AND_KITS": 4,
    "VEHICLES": 5,
    "LANGUAGES": 6,
    "properties": {
        0: {
            "name": "Armor",
            "value": 0,
            "key": "ARMOUR"
        },
        1: {
            "name": "Weapon",
            "value": 1,
            "key": "WEAPONS"
        },
        2: {
            "name": "Skills",
            "value": 2,
            "key": "SKILLS"
        },
        3: {
            "name": "Saving Throws",
            "value": 3,
            "key": "SAVING_THROWS"
        },
        4: {
            "name": "Tools and Kits",
            "value": 4,
            "key": "TOOLS_AND_KITS"
        },
        5: {
            "name": "Vehicles",
            "value": 5,
            "key": "VEHICLES"
        },
        6: {
            "name": "Languages",
            "value": 6,
            "key": "LANGUAGES"
        }
    }
};
/**
 * Enum for Proficiencies
 * @readonly
 * @enum {number}
 */
let ProficiencyEnum = {
    "NONE": 0,
    "ABYSSAL": 1,
    "ACROBATICS": 2,
    "ALCHEMISTS_SUPPLIES": 3,
    "ANIMAL_HANDLING": 4,
    "ARCANA": 5,
    "ATHLETICS": 6,
    "BAGPIPES": 7,
    "BATTLEAXE": 8,
    "BLOWGUN": 9,
    "BREWERS_SUPPLIES": 10,
    "CALLIGRAPHERS_SUPPLIES": 11,
    "CARPENTERS_TOOLS": 12,
    "CARTOGRAPHERS_TOOLS": 13,
    "CELESTIAL": 14,
    "CLUB": 15,
    "COBBLERS_TOOLS": 16,
    "COMMON": 17,
    "COOKS_UTENSILS": 18,
    "DAGGER": 19,
    "DART": 20,
    "DECEPTION": 21,
    "DEEP_SPEECH": 22,
    "DICE_SET": 23,
    "DISGUISE_KIT": 24,
    "DRACONIC": 25,
    "DRAGONCHESS_SET": 26,
    "DRUM": 27,
    "DULCIMER": 28,
    "DWARVISH": 29,
    "ELVISH": 30,
    "FLAIL": 31,
    "FLUTE": 32,
    "FORGERY_KIT": 33,
    "GIANT": 34,
    "GLAIVE": 35,
    "GLASSBLOWERS_TOOLS": 36,
    "GNOMISH": 37,
    "GOBLIN": 38,
    "GREATAXE": 39,
    "GREAT_CLUB": 40,
    "GREATSWORD": 41,
    "HALBERD": 42,
    "HALFLING": 43,
    "HAND_CROSSBOW": 44,
    "HANDAXE": 45,
    "HEAVY_ARMOUR": 46,
    "HEAVY_CROSSBOW": 47,
    "HERBALISM_KIT": 48,
    "HISTORY": 49,
    "HORN": 50,
    "IMPROVISED_WEAPON": 51,
    "INFERNAL": 52,
    "INSIGHT": 53,
    "INTIMIDATION": 54,
    "INVESTIGATION": 55,
    "JAVELIN": 56,
    "JEWELERS_TOOLS": 57,
    "LANCE": 58,
    "LAND_VEHICLES": 59,
    "LEATHERWORKERS_TOOLS": 60,
    "LIGHT_ARMOUR": 61,
    "LIGHT_CROSSBOW": 62,
    "LIGHT_HAMMER": 63,
    "LONGBOW": 64,
    "LONGSWORD": 65,
    "LUTE": 66,
    "LYRE": 67,
    "MACE": 68,
    "MARTIAL_WEAPONS": 69,
    "MASONS_TOOLS": 70,
    "MAUL": 71,
    "MEDICINE": 72,
    "MEDIUM_ARMOUR": 73,
    "MORNINGSTAR": 74,
    "NATURE": 75,
    "NAVIGATORS_TOOLS": 76,
    "NET": 77,
    "ORC": 78,
    "PAINTERS_SUPPLIES": 79,
    "PAN_FLUTE": 80,
    "PERCEPTION": 81,
    "PERFORMANCE": 82,
    "PERSUASION": 83,
    "PIKE": 84,
    "PLAYING_CARD_SET": 85,
    "POISONERS_KIT": 86,
    "POTTERS_TOOLS": 87,
    "PRIMORDIAL": 88,
    "QUARTERSTAFF": 89,
    "RAPIER": 90,
    "RELIGION": 91,
    "SCIMITAR": 92,
    "SHAWM": 93,
    "SHIELDS": 94,
    "SHORTBOW": 95,
    "SHORTSWORD": 96,
    "SICKLE": 97,
    "SIMPLE_WEAPONS": 98,
    "SLEIGHT_OF_HAND": 99,
    "SLING": 100,
    "SMITHS_TOOLS": 101,
    "SPEAR": 102,
    "STEALTH": 103,
    "SURVIVAL": 104,
    "SYLVAN": 105,
    "THIEVES_TOOLS": 106,
    "THREE_DRAGON_ANTE_SET": 107,
    "TINKERS_TOOLS": 108,
    "TRIDENT": 109,
    "UNARMED_STRIKE": 110,
    "UNDERCOMMON": 111,
    "VIOL": 112,
    "WAR_PICK": 113,
    "WARHAMMER": 114,
    "WATER_VEHICLES": 115,
    "WEAVERS_TOOLS": 116,
    "WHIP": 117,
    "WOODCARVERS_TOOLS": 118,
    "FINESSE_WEAPONS": 119,
    "SPECIAL_WEAPONS": 120,
    "ARTISANS_TOOLS": 121,
    "IMPROVISED_WEAPONS": 122,
    "ENDURANCE": 123,
    "STREETWISE": 124,
    "ANY": 252,
    /** @type {object} */
    "properties": {
        0: {
            "name": "None",
            "value": 0,
            "key": "NONE"
        },
        1: {
            "name": "Abyssal",
            "value": 1,
            "key": "ABYSSAL",
            "type": ProficiencyTypeEnum.LANGUAGES
        },
        2: {
            "name": "Acrobatics",
            "value": 2,
            "key": "ACROBATICS",
            "type": ProficiencyTypeEnum.SKILLS
        },
        3: {
            "name": "Alchemist's Supplies",
            "value": 3,
            "key": "ALCHEMISTS_SUPPLIES",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        4: {
            "name": "Animal Handling",
            "value": 4,
            "key": "ANIMAL_HANDLING",
            "type": ProficiencyTypeEnum.SKILLS
        },
        5: {
            "name": "Arcana",
            "value": 5,
            "key": "ARCANA",
            "type": ProficiencyTypeEnum.SKILLS
        },
        6: {
            "name": "Athletics",
            "value": 6,
            "key": "ATHLETICS",
            "type": ProficiencyTypeEnum.SKILLS
        },
        7: {
            "name": "Bagpipes",
            "value": 7,
            "key": "BAGPIPES",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        8: {
            "name": "Battleaxe",
            "value": 8,
            "key": "BATTLEAXE",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        9: {
            "name": "Blowgun",
            "value": 9,
            "key": "BLOWGUN",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        10: {
            "name": "Brewer's Supplies",
            "value": 10,
            "key": "BREWERS_SUPPLIES",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        11: {
            "name": "Calligrapher's Supplies",
            "value": 11,
            "key": "CALLIGRAPHERS_SUPPLIES",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        12: {
            "name": "Carpenter's Tools",
            "value": 12,
            "key": "CARPENTERS_TOOLS",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        13: {
            "name": "Cartographer's Tools",
            "value": 13,
            "key": "CARTOGRAPHERS_TOOLS",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        14: {
            "name": "Celestial",
            "value": 14,
            "key": "CELESTIAL",
            "type": ProficiencyTypeEnum.LANGUAGES
        },
        15: {
            "name": "Club",
            "value": 15,
            "key": "CLUB",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        16: {
            "name": "Cobbler's Tools",
            "value": 16,
            "key": "COBBLERS_TOOLS",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        17: {
            "name": "Common",
            "value": 17,
            "key": "COMMON",
            "type": ProficiencyTypeEnum.LANGUAGES
        },
        18: {
            "name": "Cook's Utensils",
            "value": 18,
            "key": "COOKS_UTENSILS",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        19: {
            "name": "Dagger",
            "value": 19,
            "key": "DAGGER",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        20: {
            "name": "Dart",
            "value": 20,
            "key": "DART",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        21: {
            "name": "Deception",
            "value": 21,
            "key": "DECEPTION",
            "type": ProficiencyTypeEnum.SKILLS
        },
        22: {
            "name": "Deep Speech",
            "value": 22,
            "key": "DEEP_SPEECH",
            "type": ProficiencyTypeEnum.LANGUAGES
        },
        23: {
            "name": "Dice Set",
            "value": 23,
            "key": "DICE_SET",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        24: {
            "name": "Disguise Kit",
            "value": 24,
            "key": "DISGUISE_KIT",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        25: {
            "name": "Draconic",
            "value": 25,
            "key": "DRACONIC",
            "type": ProficiencyTypeEnum.LANGUAGES
        },
        26: {
            "name": "Dragonchess Set",
            "value": 26,
            "key": "DRAGONCHESS_SET",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        27: {
            "name": "Drum",
            "value": 27,
            "key": "DRUM",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        28: {
            "name": "Dulcimer",
            "value": 28,
            "key": "DULCIMER",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        29: {
            "name": "Dwarvish",
            "value": 29,
            "key": "DWARVISH",
            "type": ProficiencyTypeEnum.LANGUAGES
        },
        30: {
            "name": "Elvish",
            "value": 30,
            "key": "ELVISH",
            "type": ProficiencyTypeEnum.LANGUAGES
        },
        31: {
            "name": "Flail",
            "value": 31,
            "key": "FLAIL",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        32: {
            "name": "Flute",
            "value": 32,
            "key": "FLUTE",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        33: {
            "name": "Forgery Kit",
            "value": 33,
            "key": "FORGERY_KIT",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        34: {
            "name": "Giant",
            "value": 34,
            "key": "GIANT",
            "type": ProficiencyTypeEnum.LANGAUGES
        },
        35: {
            "name": "Glaive",
            "value": 35,
            "key": "GLAIVE",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        36: {
            "name": "Glassblower's Tools",
            "value": 36,
            "key": "GLASSBLOWERS_TOOLS",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        37: {
            "name": "Gnomish",
            "value": 37,
            "key": "GNOMISH",
            "type": ProficiencyTypeEnum.LANGUAGES
        },
        38: {
            "name": "Goblin",
            "value": 38,
            "key": "GOBLIN",
            "type": ProficiencyTypeEnum.LANGUAGES
        },
        39: {
            "name": "Greataxe",
            "value": 39,
            "key": "GREATAXE",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        40: {
            "name": "Greatclub",
            "value": 40,
            "key": "GREAT_CLUB",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        41: {
            "name": "Greatsword",
            "value": 41,
            "key": "GREATSWORD",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        42: {
            "name": "Halberd",
            "value": 42,
            "key": "HALBERD",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        43: {
            "name": "Halfling",
            "value": 43,
            "key": "HALFLING",
            "type": ProficiencyTypeEnum.LANGUAGES
        },
        44: {
            "name": "Hand Crossbow",
            "value": 44,
            "key": "HAND_CROSSBOW",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        45: {
            "name": "Handaxe",
            "value": 45,
            "key": "HANDAXE",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        46: {
            "name": "Heavy Armor",
            "value": 46,
            "key": "HEAVY_ARMOUR",
            "type": ProficiencyTypeEnum.ARMOUR
        },
        47: {
            "name": "Heavy Crossbow",
            "value": 47,
            "key": "HEAVY_CROSSBOW",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        48: {
            "name": "Herbalism Kit",
            "value": 48,
            "key": "HERBALISM_KIT",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        49: {
            "name": "History",
            "value": 49,
            "key": "HISTORY",
            "type": ProficiencyTypeEnum.SKILLS
        },
        50: {
            "name": "Horn",
            "value": 50,
            "key": "HORN",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        51: {
            "name": "Improvised Weapon",
            "value": 51,
            "key": "IMPROVISED_WEAPON",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        52: {
            "name": "Infernal",
            "value": 52,
            "key": "INFERNAL",
            "type": ProficiencyTypeEnum.LANGUAGES
        },
        53: {
            "name": "Insight",
            "value": 53,
            "key": "INSIGHT",
            "type": ProficiencyTypeEnum.SKILLS
        },
        54: {
            "name": "Intimidation",
            "value": 54,
            "key": "INTIMIDATION",
            "type": ProficiencyTypeEnum.SKILLS
        },
        55: {
            "name": "Investigation",
            "value": 55,
            "key": "INVESTIGATION",
            "type": ProficiencyTypeEnum.SKILLS
        },
        56: {
            "name": "Javelin",
            "value": 56,
            "key": "JAVELIN",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        57: {
            "name": "Jeweler's Tools",
            "value": 57,
            "key": "JEWELERS_TOOLS",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        58: {
            "name": "Lance",
            "value": 58,
            "key": "LANCE",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        59: {
            "name": "Land Vehicles",
            "value": 59,
            "key": "LAND_VEHICLES",
            "type": ProficiencyTypeEnum.VEHICLES
        },
        60: {
            "name": "Leatherworker's Tools",
            "value": 60,
            "key": "LEATHERWORKERS_TOOLS",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        61: {
            "name": "Light Armor",
            "value": 61,
            "key": "LIGHT_ARMOUR",
            "type": ProficiencyTypeEnum.ARMOUR
        },
        62: {
            "name": "Light Crossbow",
            "value": 62,
            "key": "LIGHT_CROSSBOW",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        63: {
            "name": "Light Hammer",
            "value": 63,
            "key": "LIGHT_HAMMER",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        64: {
            "name": "Longbow",
            "value": 64,
            "key": "LONGBOW",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        65: {
            "name": "Longsword",
            "value": 65,
            "key": "LONGSWORD",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        66: {
            "name": "Lute",
            "value": 66,
            "key": "LUTE",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        67: {
            "name": "Lyre",
            "value": 67,
            "key": "LYRE",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        68: {
            "name": "Mace",
            "value": 68,
            "key": "MACE",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        69: {
            "name": "Martial Weapons",
            "value": 69,
            "key": "MARTIAL_WEAPONS",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        70: {
            "name": "Mason's Tools",
            "value": 70,
            "key": "MASONS_TOOLS",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        71: {
            "name": "Maul",
            "value": 71,
            "key": "MAUL",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        72: {
            "name": "Medicine",
            "value": 72,
            "key": "MEDICINE",
            "type": ProficiencyTypeEnum.SKILLS
        },
        73: {
            "name": "Medium Armor",
            "value": 73,
            "key": "MEDIUM_ARMOUR",
            "type": ProficiencyTypeEnum.ARMOUR
        },
        74: {
            "name": "Morningstar",
            "value": 74,
            "key": "MORNINGSTAR",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        75: {
            "name": "Nature",
            "value": 75,
            "key": "NATURE",
            "type": ProficiencyTypeEnum.SKILLS
        },
        76: {
            "name": "Navigator's Tools",
            "value": 76,
            "key": "NAVIGATORS_TOOLS",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        77: {
            "name": "Net",
            "value": 77,
            "key": "NET",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        78: {
            "name": "Orc",
            "value": 78,
            "key": "ORC",
            "type": ProficiencyTypeEnum.LANGUAGES
        },
        79: {
            "name": "Painter's Supplies",
            "value": 79,
            "key": "PAINTERS_SUPPLIES",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        80: {
            "name": "Pan Flute",
            "value": 80,
            "key": "PAN_FLUTE",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        81: {
            "name": "Perception",
            "value": 81,
            "key": "PERCEPTION",
            "type": ProficiencyTypeEnum.SKILLS
        },
        82: {
            "name": "Performance",
            "value": 82,
            "key": "PERFORMANCE",
            "type": ProficiencyTypeEnum.SKILLS
        },
        83: {
            "name": "Persuasion",
            "value": 83,
            "key": "PERSUASION",
            "type": ProficiencyTypeEnum.SKILLS
        },
        84: {
            "name": "Pike",
            "value": 84,
            "key": "PIKE",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        85: {
            "name": "Playing Card Set",
            "value": 85,
            "key": "PLAYING_CARD_SET",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        86: {
            "name": "Poisoner's kit",
            "value": 86,
            "key": "POISONERS_KIT",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        87: {
            "name": "Potter's Tools",
            "value": 87,
            "key": "POTTERS_TOOLS",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        88: {
            "name": "Primordial",
            "value": 88,
            "key": "PRIMORDIAL",
            "type": ProficiencyTypeEnum.LANGUAGES
        },
        89: {
            "name": "Quarterstaff",
            "value": 89,
            "key": "QUARTERSTAFF",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        90: {
            "name": "Rapier",
            "value": 90,
            "key": "RAPIER",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        91: {
            "name": "Religion",
            "value": 91,
            "key": "RELIGION",
            "type": ProficiencyTypeEnum.SKILLS
        },
        92: {
            "name": "Scimitar",
            "value": 92,
            "key": "SCIMITAR",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        93: {
            "name": "Shawm",
            "value": 93,
            "key": "SHAWM",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        94: {
            "name": "Shields",
            "value": 94,
            "key": "SHIELDS",
            "type": ProficiencyTypeEnum.ARMOUR
        },
        95: {
            "name": "Shortbow",
            "value": 95,
            "key": "SHORTBOW",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        96: {
            "name": "Shortsword",
            "value": 96,
            "key": "SHORTSWORD",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        97: {
            "name": "Sickle",
            "value": 97,
            "key": "SICKLE",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        98: {
            "name": "Simple Weapons",
            "value": 98,
            "key": "SIMPLE_WEAPONS",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        99: {
            "name": "Sleight of Hand",
            "value": 99,
            "key": "SLEIGHT_OF_HAND",
            "type": ProficiencyTypeEnum.SKILLS
        },
        100: {
            "name": "Sling",
            "value": 100,
            "key": "SLING",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        101: {
            "name": "Smith's Tools",
            "value": 101,
            "key": "SMITHS_TOOLS",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        102: {
            "name": "Spear",
            "value": 102,
            "key": "SPEAR",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        103: {
            "name": "Stealth",
            "value": 103,
            "key": "STEALTH",
            "type": ProficiencyTypeEnum.SKILLS
        },
        104: {
            "name": "Survival",
            "value": 104,
            "key": "SURVIVAL",
            "type": ProficiencyTypeEnum.SKILLS
        },
        105: {
            "name": "Sylvan",
            "value": 105,
            "key": "SYLVAN",
            "type": ProficiencyTypeEnum.LANGUAGES
        },
        106: {
            "name": "Thieves' Tools",
            "value": 106,
            "key": "THIEVES_TOOLS",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        107: {
            "name": "Three-Dragon Ante Set",
            "value": 107,
            "key": "THREE_DRAGON_ANTE_SET",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        108: {
            "name": "Tinker's Tools",
            "value": 108,
            "key": "TINKERS_TOOLS",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        109: {
            "name": "Trident",
            "value": 109,
            "key": "TRIDENT",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        110: {
            "name": "Unarmed Strike",
            "value": 110,
            "key": "UNARMED_STRIKE",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        111: {
            "name": "Undercommon",
            "value": 111,
            "key": "UNDERCOMMON",
            "type": ProficiencyTypeEnum.LANGUAGES
        },
        112: {
            "name": "Viol",
            "value": 112,
            "key": "VIOL",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        113: {
            "name": "War Pick",
            "value": 113,
            "key": "WAR_PICK",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        114: {
            "name": "Warhammer",
            "value": 114,
            "key": "WARHAMMER",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        115: {
            "name": "Water Vehicles",
            "value": 115,
            "key": "WATER_VEHICLES",
            "type": ProficiencyTypeEnum.VEHICLES
        },
        116: {
            "name": "Weaver's Tools",
            "value": 116,
            "key": "WEAVERS_TOOLS",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        117: {
            "name": "Whip",
            "value": 117,
            "key": "WHIP",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        118: {
            "name": "Woodcarver's Tools",
            "value": 118,
            "key": "WOODCARVERS_TOOLS",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        119: {
            "name": "Finesse Weapons",
            "value": 119,
            "key": "FINESSE_WEAPONS",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        120: {
            "name": "Special Weapons",
            "value": 120,
            "key": "SPECIAL_WEAPONS",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        121: {
            "name": "Artisan's Tools",
            "value": 121,
            "key": "ARTISANS_TOOLS",
            "type": ProficiencyTypeEnum.TOOLS_AND_KITS
        },
        122: {
            "name": "Improvised Weapons",
            "value": 122,
            "key": "IMPROVISED_WEAPONS",
            "type": ProficiencyTypeEnum.WEAPONS
        },
        123: {
            "name": "Endurance",
            "value": 123,
            "key": "ENDURANCE",
            "type": ProficiencyTypeEnum.SKILLS
        },
        124: {
            "name": "Streetwise",
            "value": 124,
            "key": "STREETWISE",
            "type": ProficiencyTypeEnum.SKILLS
        },
        252: {
            "name": "Pick Any Choice",
            "value": 252,
            "key": "ANY"
        }
    }
};
/**
 * Enum for Ability types
 * @readonly
 * @enum {number}
 */
let AbilityEnum = {
    "STRENGTH": ProficiencyEnum.STRENGTH,
    "DEXTERITY": ProficiencyEnum.DEXTERITY,
    "CONSTITUTION": ProficiencyEnum.CONSTITUTION,
    "INTELLIGENCE": ProficiencyEnum.INTELLIGENCE,
    "WISDOM": ProficiencyEnum.WISDOM,
    "CHARISMA": ProficiencyEnum.CHARISMA,
    /** @type {object} */
    "properties": ProficiencyEnum.properties
};
/**
 * Enum for Artisan Tools
 * @readonly
 * @enum {number}
 */
let ArtisanToolEnum = {
    "ALCHEMISTS_SUPPLIES": ProficiencyEnum.ALCHEMISTS_SUPPLIES,
    "BREWERS_SUPPLIES": ProficiencyEnum.BREWERS_SUPPLIES,
    "CALLIGRAPHERS_SUPPLIES": ProficiencyEnum.CALLIGRAPHERS_SUPPLIES,
    "CARPENTERS_TOOLS": ProficiencyEnum.CARPENTERS_TOOLS,
    "CARTOGRAPHERS_TOOLS": ProficiencyEnum.CARTOGRAPHERS_TOOLS,
    "COBBLERS_TOOLS": ProficiencyEnum.COBBLERS_TOOLS,
    "COOKS_UTENSILS": ProficiencyEnum.COOKS_UTENSILS,
    "GLASSBLOWERS_TOOLS": ProficiencyEnum.GLASSBLOWERS_TOOLS,
    "JEWELERS_TOOLS": ProficiencyEnum.JEWELERS_TOOLS,
    "LEATHERWORKERS_TOOLS": ProficiencyEnum.LEATHERWORKERS_TOOLS,
    "MASONS_TOOLS": ProficiencyEnum.MASONS_TOOLS,
    "PAINTERS_SUPPLIES": ProficiencyEnum.PAINTERS_SUPPLIES,
    "POTTERS_TOOLS": ProficiencyEnum.POTTERS_TOOLS,
    "SMITHS_TOOLS": ProficiencyEnum.SMITHS_TOOLS,
    "TINKERS_TOOLS": ProficiencyEnum.TINKERS_TOOLS,
    "THEIVES_TOOLS": ProficiencyEnum.THIEVES_TOOLS,
    "WEAVERS_TOOLS": ProficiencyEnum.WEAVERS_TOOLS,
    "WOODCARVERS_TOOLS": ProficiencyEnum.WOODCARVERS_TOOLS,
    "ANY": ProficiencyEnum.ANY,
    "properties": ProficiencyEnum.properties
}
/**
 * Enum for Languages
 * @readonly
 * @enum {number}
 */
let LanguageEnum = {
    "ABYSSAL": ProficiencyEnum.ABYSSAL,
    "CELESTIAL": ProficiencyEnum.CELESTIAL,
    "COMMON": ProficiencyEnum.COMMON,
    "DEEP_SPEECH": ProficiencyEnum.DEEP_SPEECH,
    "DRACONIC": ProficiencyEnum.DRACONIC,
    "DWARVISH": ProficiencyEnum.DWARVISH,
    "ELVISH": ProficiencyEnum.ELVISH,
    "GNOMISH": ProficiencyEnum.GNOMISH,
    "GOBLIN": ProficiencyEnum.GOBLIN,
    "HALFLING": ProficiencyEnum.HALFLING,
    "INFERNAL": ProficiencyEnum.INFERNAL,
    "ORC": ProficiencyEnum.ORC,
    "PRIMORDIAL": ProficiencyEnum.PRIMORDIAL,
    "SYLVAN": ProficiencyEnum.SYLVAN,
    "UNDERCOMMON": ProficiencyEnum.UNDERCOMMON,
    "DRUIDIC": ProficiencyEnum.DRUIDIC,
    "ANY": ProficiencyEnum.ANY,
    "properties": ProficiencyEnum.properties
}
/**
 * Enum for Musical Instruments
 * @readonly
 * @enum {number}
 */
let MusicalInstrumentEnum = {
    "BAGPIPES": ProficiencyEnum.BAGPIPES,
    "DRUM": ProficiencyEnum.DRUM,
    "DULCIMER": ProficiencyEnum.DULCIMER,
    "FLUTE": ProficiencyEnum.FLUTE,
    "HORN": ProficiencyEnum.HORN,
    "LUTE": ProficiencyEnum.LUTE,
    "LYRE": ProficiencyEnum.LYRE,
    "PAN_FLUTE": ProficiencyEnum.PAN_FLUTE,
    "SHAWM": ProficiencyEnum.SHAWM,
    "VIOL": ProficiencyEnum.VIOL,
    "properties": ProficiencyEnum.properties
}
/**
 * Enum for Skills
 * @readonly
 * @enum {number}
 */
let SkillEnum = {
    "ACROBATICS": ProficiencyEnum.ACROBATICS,
    "ANIMAL_HANDLING": ProficiencyEnum.ANIMAL_HANDLING,
    "ARCANA": ProficiencyEnum.ARCANA,
    "ATHLETICS": ProficiencyEnum.ATHLETICS,
    "DECEPTION": ProficiencyEnum.DECEPTION,
    "HISTORY": ProficiencyEnum.HISTORY,
    "INSIGHT": ProficiencyEnum.INSIGHT,
    "INTIMIDATION": ProficiencyEnum.INTIMIDATION,
    "INVESTIGATION": ProficiencyEnum.INVESTIGATION,
    "MEDICINE": ProficiencyEnum.MEDICINE,
    "NATURE": ProficiencyEnum.NATURE,
    "PERCEPTION": ProficiencyEnum.PERCEPTION,
    "PERFORMANCE": ProficiencyEnum.PERFORMANCE,
    "PERSUASION": ProficiencyEnum.PERSUASION,
    "RELIGION": ProficiencyEnum.RELIGION,
    "SLEIGHT_OF_HAND": ProficiencyEnum.SLEIGHT_OF_HAND,
    "STEALTH": ProficiencyEnum.STEALTH,
    "SURVIVAL": ProficiencyEnum.SURVIVAL,
    "ENDURANCE": ProficiencyEnum.ENDURANCE,
    "STREETWISE": ProficiencyEnum.STREETWISE,
    "ANY": ProficiencyEnum.ANY,
    "properties": ProficiencyEnum.properties
}
/**
 * Enum for Spell Components
 * @readonly
 * @enum {number}
 */
let SpellComponentEnum = {
    "NONE": 0,
    "VERBAL": 1,
    "SOMATIC": 2,
    "MATERIAL": 3,
    "properties": {
        0: {
            "name": "None",
            "value": 0,
            "key": "NONE"
        },
        1: {
            "name": "Verbal",
            "value": 1,
            "key": "VERBAL"
        },
        2: {
            "name": "Somatic",
            "value": 2,
            "key": "SOMATIC"
        },
        3: {
            "name": "Material",
            "value": 3,
            "key": "MATERIAL"
        },
    }
};
/**
 * Enum for Sizes
 * @readonly
 * @enum {number}
 */
let SizeEnum = {
    "FINE": 0,
    "DIMINUTIVE": 1,
    "TINY": 2,
    "SMALL": 3,
    "MEDIUM": 4,
    "LARGE": 5,
    "FLUFFY": 5,
    "HUGE": 6,
    "GARGANTUAN": 7,
    "COLOSSAL": 8,
    "properties": {
        0: {
            "name": "Fine",
            "value": 0,
            "key": "FINE"
        },
        1: {
            "name": "Diminutive",
            "value": 1,
            "key": "DIMINUTIVE"
        },
        2: {
            "name": "Tiny",
            "value": 2,
            "key": "TINY"
        },
        3: {
            "name": "Small",
            "value": 3,
            "key": "SMALL"
        },
        4: {
            "name": "Medium",
            "value": 4,
            "key": "MEDIUM"
        },
        5: {
            "name": "Large",
            "value": 5,
            "key": "LARGE"
        },
        5: {
            "name": "Fluffy",
            "value": 5,
            "key": "FLUFFY"
        },
        6: {
            "name": "Huge",
            "value": 6,
            "key": "HUGE"
        },
        7: {
            "name": "Gargantuan",
            "value": 7,
            "key": "GARGANTUAN"
        },
        8: {
            "name": "Colossal",
            "value": 8,
            "key": "COLOSSAL"
        }
    }
};
/**
 * Enum for Sexual Orientations
 * @readonly
 * @enum {number}
 */
let SexualOrientationEnum = {
    "STRAIGHT": 0,
    "GAY": 1,
    "BISEXUAL": 2,
    "ASEXUAL": 3,
    "properties": {
        0: {
            "name": "Straight",
            "value": 0,
            "key": "STRAIGHT"
        },
        1: {
            "name": "Gay",
            "value": 1,
            "key": "GAY"
        },
        2: {
            "name": "Bisexual",
            "value": 2,
            "key": "BISEXUAL"
        },
        3: {
            "name": "Asexual",
            "value": 3,
            "key": "ASEXUAL"
        }
    }
};
/**
 * Enum for Creature Types
 * @readonly
 * @enum {number}
 */
let CreatureTypeEnum = {
    "HUMANOID": 0,
    "ABERRATION": 1,
    "BEAST": 2,
    "CELESTIAL": 3,
    "CONSTRUCT": 4,
    "DRAGON": 5,
    "ELEMENTAL": 6,
    "FEY": 7,
    "FIEND": 8,
    "GIANT": 9,
    "MONSTROSITY": 10,
    "OOZE": 11,
    "PLANT": 12,
    "UNDEAD": 13,
    "properties": {
        0: {
            "name": "Humanoid",
            "value": 0,
            "key": "HUMANOID"
        },
        1: {
            "name": "Aberration",
            "value": 1,
            "key": "ABERRATION"
        },
        2: {
            "name": "Beast",
            "value": 2,
            "key": "BEAST"
        },
        3: {
            "name": "Celestial",
            "value": 3,
            "key": "CELESTIAL"
        },
        4: {
            "name": "Construct",
            "value": 4,
            "key": "CONSTRUCT"
        },
        5: {
            "name": "Dragon",
            "value": 5,
            "key": "DRAGON"
        },
        6: {
            "name": "Elemental",
            "value": 6,
            "key": "ELEMENTAL"
        },
        7: {
            "name": "Fey",
            "value": 7,
            "key": "FEY"
        },
        8: {
            "name": "Fiend",
            "value": 8,
            "key": "FIEND"
        },
        9: {
            "name": "Giant",
            "value": 9,
            "key": "GIANT"
        },
        10: {
            "name": "Monstrosity",
            "value": 10,
            "key": "MONSTROSITY"
        },
        11: {
            "name": "Ooze",
            "value": 11,
            "key": "OOZE"
        },
        12: {
            "name": "Plant",
            "value": 12,
            "key": "PLANT"
        },
        13: {
            "name": "Undead",
            "value": 13,
            "key": "UNDEAD"
        }
    }
};
/**
 * Enum for Creature Sub-Types
 * @readonly
 * @enum {number}
 */
let CreatureSubTypeEnum = {
    "FOX": 0,
    "SKELETON": 1,
    "SHEEP": 2,
    "properties": {
        0: {
            "name": "Fox",
            "value": 0,
            "key": "FOX"
        },
        1: {
            "name": "Skeleton",
            "value": 1,
            "key": "SKELETON"
        },
        2: {
            "name": "Sheep",
            "value": 2,
            "key": "SHEEP"
        }
    }
};
/**
 * Enum for Areas
 * @readonly
 * @enum {number}
 */
let AreaEnum = {
    "CONE": 0,
    "CUBE": 1,
    "CYLINDER": 2,
    "LINE": 3,
    "SPHERE": 4,
    "properties": {
        0: {
            "name": "Cone",
            "value": 0,
            "key": "CONE",
        },
        1: {
            "name": "Cube",
            "value": 1,
            "key": "CUBE",
        },
        2: {
            "name": "Cylinder",
            "value": 2,
            "key": "CYLINDER",
        },
        3: {
            "name": "Line",
            "value": 3,
            "key": "LINE",
        },
        4: {
            "name": "Sphere",
            "value": 4,
            "key": "SPHERE",
        }
    }
}
/**
 * Enum for Triggers
 * @readonly
 * @enum {number}
 */
let TriggerEnum = {
    "INTERVAL": 0,
    "ACTION": 1,
    "AREA": 2,
    "properties": {
        0: {
            "name": "Interval",
            "value": 0,
            "key": "INTERVAL"
        },
        1: {
            "name": "Action",
            "value": 1,
            "key": "ACTION"
        },
        2: {
            "name": "Area",
            "value": 1,
            "key": "AREA"
        }
    }
}
/**
 * Enum for Intervals
 * @readonly
 * @enum {number}
 */
let IntervalEnum = {
    "ONCE": 0,
    "SECOND": 0,
    "TICK": 1,
    "TURN": 2,
    "ROUND": 3,
    "properties": {
        0: {
            "name": "Once",
            "value": 0,
            "key": "ONCE"
        },
        1: {
            "name": "Tick",
            "value": 1,
            "key": "TICK"
        },
        2: {
            "name": "Turn",
            "value": 2,
            "key": "TURN"
        },
        3: {
            "name": "Round",
            "value": 3,
            "key": "ROUND"
        }
    }
};
/**
 * Enum for Operations
 * @readonly
 * @enum {number}
 */
let OperationsEnum = {
    "UPDATE": 0,
    "SET": 0,
    "EQUALS": 0,
    "ADD": 1,
    "SUBTRACT": 2,
    "MULTIPLY": 3,
    "DIVIDE": 4,
    "properties": {
        0: {
            "name": "Equals",
            "value": 0,
            "key": "EQUALS"
        },
        1: {
            "name": "Add",
            "value": 1,
            "key": "ADD"
        },
        2: {
            "name": "Subtract",
            "value": 2,
            "key": "SUBTRACT"
        },
        3: {
            "name": "Multiply",
            "value": 3,
            "key": "MULTIPLY"
        },
        4: {
            "name": "Divide",
            "value": 4,
            "key": "DIVIDE"
        }
    }
};
/**
 * Enum for Sense types
 * @readonly
 * @enum {number}
 */
let SenseEnum = {
    "TOUCH": 0,
    "SIGHT": 1,
    "HEARING": 2,
    "SMELL": 3,
    "TASTE": 4,
    "SPACE": 5,
    "properties": {
        0: {
            "name": "Touch",
            "value": 0,
            "key": "TOUCH"
        },
        1: {
            "name": "Sight",
            "value": 1,
            "key": "SIGHT"
        },
        2: {
            "name": "Hearing",
            "value": 2,
            "key": "HEARING"
        },
        3: {
            "name": "Smell",
            "value": 3,
            "key": "SMELL"
        },
        4: {
            "name": "Taste",
            "value": 4,
            "key": "TASTE"
        },
        5: {
            "name": "Space",
            "value": 5,
            "key": "SPACE"
        }
    }
}