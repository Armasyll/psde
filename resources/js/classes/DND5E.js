/**
 * DND 5e methods
 * @class
 * @typedef {Object} DND5E
 * @extends DND
 */
class DND5E extends DND {
    static getSkillAbility(proficiencyEnum) {
        if (!ProficiencyEnum.properties.hasOwnProperty(proficiencyEnum)) {
            if (ProficiencyEnum.hasOwnProperty(proficiencyEnum)) {
                proficiencyEnum = ProficiencyEnum[proficiencyEnum];
            }
            else {
                return 0;
            }
        }
        switch (proficiencyEnum) {
            case ProficiencyEnum.ATHLETICS: {
                return AbilityEnum.STRENGTH;
            }
            case ProficiencyEnum.ACROBATICS:
            case ProficiencyEnum.SLEIGHT_OF_HAND:
            case ProficiencyEnum.STEALTH: {
                return AbilityEnum.DEXTERITY;
            }
            case ProficiencyEnum.ARCANA:
            case ProficiencyEnum.HISTORY:
            case ProficiencyEnum.INVESTIGATION:
            case ProficiencyEnum.NATURE:
            case ProficiencyEnum.RELIGION: {
                return AbilityEnum.INTELLIGENCE;
            }
            case ProficiencyEnum.ANIMAL_HANDLING:
            case ProficiencyEnum.INSIGHT:
            case ProficiencyEnum.MEDICINE:
            case ProficiencyEnum.PERCEPTION:
            case ProficiencyEnum.SURVIVAL: {
                return AbilityEnum.WISDOM;
            }
            case ProficiencyEnum.DECEPTION:
            case ProficiencyEnum.INTIMIDATION:
            case ProficiencyEnum.PERFORMANCE:
            case ProficiencyEnum.PERSUASION: {
                return AbilityEnum.CHARISMA;
            }
        }
        return 0;
    }
    static calculateProficiencyByLevel(level) {
        return Math.floor((level + 7) / 4);
    }
    static calculateProficiencyByExperience(experience) {
        return Game.calculateProficiencyByLevel(Game.calculateLevel(experience));;
    }
    static calculateAbilityModifier(score) {
        return Math.floor((score - 10) / 2);
    }
    static calculateLevel(experiencePoints) {
        experiencePoints = Tools.filterInt(experiencePoints);
        if (experiencePoints >= 355000) {
            return 20;
        }
        else if (experiencePoints >= 305000) {
            return 19;
        }
        else if (experiencePoints >= 265000) {
            return 18;
        }
        else if (experiencePoints >= 225000) {
            return 17;
        }
        else if (experiencePoints >= 195000) {
            return 16;
        }
        else if (experiencePoints >= 165000) {
            return 15;
        }
        else if (experiencePoints >= 140000) {
            return 14;
        }
        else if (experiencePoints >= 120000) {
            return 13;
        }
        else if (experiencePoints >= 100000) {
            return 12;
        }
        else if (experiencePoints >= 85000) {
            return 11;
        }
        else if (experiencePoints >= 64000) {
            return 10;
        }
        else if (experiencePoints >= 48000) {
            return 9;
        }
        else if (experiencePoints >= 34000) {
            return 8;
        }
        else if (experiencePoints >= 23000) {
            return 7;
        }
        else if (experiencePoints >= 14000) {
            return 6;
        }
        else if (experiencePoints >= 6500) {
            return 5;
        }
        else if (experiencePoints >= 2700) {
            return 4;
        }
        else if (experiencePoints >= 900) {
            return 3;
        }
        else if (experiencePoints >= 300) {
            return 2;
        }
        else if (experiencePoints >= 0) {
            return 1;
        }
        return 0;
    }
}