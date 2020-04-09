class SorcererClass extends CharacterClass {
    constructor() {
        super("sorcerer", "Sorcerer", "Those born with innate magical abilities.", undefined, CharacterClassEnum.SORCERER);
        this.spellcastingAbility = AbilityEnum.CHARISMA;
        this.spellSaveDCParam = 8;

        this.sorceryPointsLevelMap = {
            "1":0,
            "2":2,
            "3":3,
            "4":4,
            "5":5,
            "6":6,
            "7":7,
            "8":8,
            "9":9,
            "10":10,
            "11":11,
            "12":12,
            "13":13,
            "14":14,
            "15":15,
            "16":16,
            "17":17,
            "18":18,
            "19":19,
            "20":20
        };
        this.cantripsLevelMap = {
            "1":4,
            "2":4,
            "3":5,
            "4":5,
            "5":5,
            "6":5,
            "7":5,
            "8":5,
            "9":6,
            "10":6,
            "11":6,
            "12":6,
            "13":6,
            "14":6,
            "15":6,
            "16":6,
            "17":6,
            "18":6,
            "19":6,
            "20":6
        };
        this.spellsKnownLevelMap = {
            "1":2,
            "2":3,
            "3":4,
            "4":5,
            "5":6,
            "6":7,
            "7":8,
            "8":9,
            "9":10,
            "10":11,
            "11":12,
            "12":12,
            "13":13,
            "14":13,
            "15":14,
            "16":14,
            "17":15,
            "18":15,
            "19":15,
            "20":15
        };
        this.spellSlotsPerLevelMap = {
             "1":{"1":2, "2":0, "3":0, "4":0, "5":0, "6":0, "7":0, "8":0, "9":0},
             "2":{"1":3, "2":0, "3":0, "4":0, "5":0, "6":0, "7":0, "8":0, "9":0},
             "3":{"1":4, "2":2, "3":0, "4":0, "5":0, "6":0, "7":0, "8":0, "9":0},
             "4":{"1":4, "2":3, "3":0, "4":0, "5":0, "6":0, "7":0, "8":0, "9":0},
             "5":{"1":4, "2":0, "3":2, "4":0, "5":0, "6":0, "7":0, "8":0, "9":0},
             "6":{"1":4, "2":3, "3":3, "4":0, "5":0, "6":0, "7":0, "8":0, "9":0},
             "7":{"1":4, "2":3, "3":3, "4":1, "5":0, "6":0, "7":0, "8":0, "9":0},
             "8":{"1":4, "2":3, "3":3, "4":2, "5":0, "6":0, "7":0, "8":0, "9":0},
             "9":{"1":4, "2":3, "3":3, "4":3, "5":1, "6":0, "7":0, "8":0, "9":0},
            "10":{"1":4, "2":3, "3":3, "4":3, "5":2, "6":0, "7":0, "8":0, "9":0},
            "11":{"1":4, "2":3, "3":3, "4":3, "5":2, "6":1, "7":0, "8":0, "9":0},
            "12":{"1":4, "2":3, "3":3, "4":3, "5":2, "6":1, "7":0, "8":0, "9":0},
            "13":{"1":4, "2":3, "3":3, "4":3, "5":2, "6":1, "7":1, "8":0, "9":0},
            "14":{"1":4, "2":3, "3":3, "4":3, "5":2, "6":1, "7":1, "8":0, "9":0},
            "15":{"1":4, "2":3, "3":3, "4":3, "5":2, "6":1, "7":1, "8":1, "9":0},
            "16":{"1":4, "2":3, "3":3, "4":3, "5":2, "6":1, "7":1, "8":1, "9":0},
            "17":{"1":4, "2":3, "3":3, "4":3, "5":2, "6":1, "7":1, "8":1, "9":1},
            "18":{"1":4, "2":3, "3":3, "4":3, "5":3, "6":1, "7":1, "8":1, "9":1},
            "19":{"1":4, "2":3, "3":3, "4":3, "5":3, "6":2, "7":1, "8":1, "9":1},
            "20":{"1":4, "2":3, "3":3, "4":3, "5":3, "6":2, "7":2, "8":1, "9":1}
        };
        this.sorceryPointsForSpellSlotsMap = { // spell slot:sorcery points
            "1":2,
            "2":3,
            "3":5,
            "4":6,
            "5":7
        };
        this.spellSlotsForSorceryPointsMap = {
            "1":1,
            "2":2,
            "3":3,
            "4":4,
            "5":5,
            "6":6,
            "7":7,
            "8":8,
            "9":9,
            "10":10,
            "11":11,
            "12":12,
            "13":13,
            "14":14,
            "15":15,
            "16":16,
            "17":17,
            "18":18,
            "19":19,
            "20":20
        };
    }
    /**
     * Calculates spell save difficulty class
     * @param {creatureEntity} characterEntity 
     */
    calculateSpellSaveDC(creatureEntity) {
        if (creatureEntity instanceof CreatureEntity) {}
        else if (CreatureEntity.has(creatureEntity)) {
            creatureEntity = CreatureEntity.get(creatureEntity);
        }
        else {
            return 0;
        }
        return this.spellSaveDCParam + creatureEntity.getProficiencyBonus() + Game.calculateAbilityModifier(creatureEntity.getAbility(this.spellcastingAbility));
    }
    /**
     * Calculates spell attack modifier
     * @param {creatureEntity} creatureEntity 
     */
    calculateSpellAttackModifier(creatureEntity) {
        if (creatureEntity instanceof CreatureEntity) {}
        else if (CreatureEntity.has(creatureEntity)) {
            creatureEntity = CreatureEntity.get(creatureEntity);
        }
        else {
            return 0;
        }
        return creatureEntity.getProficiencyBonus() + Game.calculateAbilityModifier(creatureEntity.getAbility(this.spellcastingAbility));
    }
}