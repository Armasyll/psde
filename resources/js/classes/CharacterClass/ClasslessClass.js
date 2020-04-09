class ClasslessClass extends CharacterClass {
    constructor() {
        super("classless", "Classless", "A class for the proper adventurer.", undefined, CharacterClassEnum.CLASSLESS);

        this.setHitDice(1, 8);
        this.setInitialHealth(8);
        this.setHealthPerLevel(1, 8);
        this.setOptionalHealthPerLevel(5);

        this.setHealthAbilityModifier("CONSTITUTION");

        this.addArmourProficiency("LIGHT_ARMOUR");

        this.addWeaponProficiency("SIMPLE_WEAPONS");
        this.addWeaponProficiency("FINESSE_WEAPONS");
        this.addWeaponProficiency("IMPROVISED_WEAPONS");
        this.addWeaponProficiencyChoice("MARTIAL_WEAPONS");
        this.addWeaponProficiencyChoice("SPECIAL_WEAPONS");

        this.addToolProficiencyChoice("ARTISANS_TOOLS");
        this.addToolProficiencyChoice(["NAVIGATORS_TOOLS", "POISONERS_KIT", "THIEVES_TOOLS", "LAND_VEHICLES", "WATER_VEHICLES"]);

        this.addSkillProficiencyChoice("ANY");
        this.addSkillProficiencyChoice("ANY");

        this.addSavingThrowProficiencyChoice("ANY");
        this.addSavingThrowProficiencyChoice("ANY");
    }
}