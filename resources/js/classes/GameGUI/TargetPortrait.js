class TargetPortraitGameGUI {
    static getClassName() {
        return "TargetPortraitGameGUI";
    }
    static initialize() {
        if (Game.debugMode && Game.debugVerbosity > 9) BABYLON.Tools.Log("Initializing TargetPortraitGameGUI");
        TargetPortraitGameGUI.targetName = null;
        TargetPortraitGameGUI.targetIcon = null;
        TargetPortraitGameGUI.targetHealthBar = null;
        TargetPortraitGameGUI.targetHealthText = null;
        TargetPortraitGameGUI.targetStaminaBar = null;
        TargetPortraitGameGUI.targetStaminaText = null;
        TargetPortraitGameGUI.controller = TargetPortraitGameGUI.generateController();
        TargetPortraitGameGUI.initialized = true;
        TargetPortraitGameGUI.containerAlpha = 0.75;
        TargetPortraitGameGUI.entityID = null;
        TargetPortraitGameGUI.cachedEntity = null;
        TargetPortraitGameGUI.targetIsCreature = false;
        TargetPortraitGameGUI.isVisible = false;
    }
    static generateController() {
        var portrait = GameGUI.createRectangle("targetPortrait");
        portrait.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        portrait.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        portrait.height = GameGUI.getFontSize(4);
        portrait.width = GameGUI.getFontSize(14);
        portrait.top = 0;
        portrait.left = "26%";
        portrait.isVisible = false;
            var portraitBackground = GameGUI.createRectangle("portraitBackground");
            portraitBackground.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            portraitBackground.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            portraitBackground.height = GameGUI.getFontSize(4);
            portraitBackground.width = 1;
            portraitBackground.top = 0;
            portraitBackground.left = 0;
            portraitBackground.alpha = TargetPortraitGameGUI.containerAlpha;
            var portraitAvatarContainer = GameGUI.createRectangle();
            portraitAvatarContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            portraitAvatarContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            portraitAvatarContainer.height = GameGUI.getFontSize(4);
            portraitAvatarContainer.width = 0.33;
            portraitAvatarContainer.top = 0;
            portraitAvatarContainer.left = 0;
                var portraitAvatar = new BABYLON.GUI.Image("portraitAvatar", "resources/images/icons/characters/genericCharacter.svg");
                portraitAvatar.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
            var portraitStats = new BABYLON.GUI.StackPanel("portraitStats");
            portraitStats.isVertical = true;
            portraitStats.height = GameGUI.getFontSize(4);
            portraitStats.width = GameGUI.getFontSize(10);
            portraitStats.top = 0;
            portraitStats.left = "-21%";
                var portraitName = GameGUI.createTextBlock("portraitName");
                portraitName.text = "Your Name Here";
                portraitName.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                portraitName.height = GameGUI.getFontSize();
                portraitName.width = 0.85;
                var portraitStatsHealthContainer = GameGUI.createRectangle("portraitStatsHealthContainer");
                portraitStatsHealthContainer.height = GameGUI.getFontSize();
                portraitStatsHealthContainer.width = 0.85;
                    var portraitStatsHealthText = GameGUI.createTextBlock("portraitStatsHealthText");
                    portraitStatsHealthText.text = "";
                    portraitStatsHealthText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                    portraitStatsHealthText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                    var portraitStatsHealthSlider = new BABYLON.GUI.Slider("portraitStatsHealth");
                    portraitStatsHealthSlider.minimum = 0;
                    portraitStatsHealthSlider.maximum = 100;
                    portraitStatsHealthSlider.isVertical = false;
                    portraitStatsHealthSlider.displayThumb = false;
                    portraitStatsHealthSlider.left = "16px";
                    portraitStatsHealthSlider.height = GameGUI.getFontSize(1.25);
                    portraitStatsHealthSlider.thumbWidth = 0;
                    portraitStatsHealthSlider.isEnabled = false;
                    //portraitStatsHealthSlider.scaleX = -1;
                    portraitStatsHealthSlider.rotation = BABYLON.Tools.ToRadians(180);
                    portraitStatsHealthSlider.color = "red";
                var portraitStatsStaminaContainer = GameGUI.createRectangle("portraitStatsStaminaContainer");
                portraitStatsStaminaContainer.height = GameGUI.getFontSize();
                portraitStatsStaminaContainer.width = 0.85;
                    var portraitStatsStaminaText = GameGUI.createTextBlock("portraitStatsStaminaText");
                    portraitStatsStaminaText.text = "";
                    portraitStatsStaminaText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                    portraitStatsStaminaText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                    var portraitStatsStaminaSlider = new BABYLON.GUI.Slider("portraitStatsStaminaSlider");
                    portraitStatsStaminaSlider.minimum = 0;
                    portraitStatsStaminaSlider.maximum = 100;
                    portraitStatsStaminaSlider.isVertical = false;
                    portraitStatsStaminaSlider.displayThumb = false;
                    portraitStatsStaminaSlider.left = "16px";
                    portraitStatsStaminaSlider.height = GameGUI.getFontSize(1.25);
                    portraitStatsStaminaSlider.thumbWidth = 0;
                    portraitStatsStaminaSlider.isEnabled = false;
                    //portraitStatsStaminaSlider.scaleX = -1;
                    portraitStatsStaminaSlider.rotation = BABYLON.Tools.ToRadians(180);
                    portraitStatsStaminaSlider.color = "green";
        portrait.addControl(portraitBackground);
        portrait.addControl(portraitStats);
        portrait.addControl(portraitAvatarContainer);
        portraitAvatarContainer.addControl(portraitAvatar);
        portraitStats.addControl(portraitName);
        portraitStatsHealthContainer.addControl(portraitStatsHealthSlider);
        portraitStatsHealthContainer.addControl(portraitStatsHealthText);
        portraitStats.addControl(portraitStatsHealthContainer);
        portraitStatsStaminaContainer.addControl(portraitStatsStaminaSlider);
        portraitStatsStaminaContainer.addControl(portraitStatsStaminaText);
        portraitStats.addControl(portraitStatsStaminaContainer);
        portrait.zIndex = 10;
        TargetPortraitGameGUI.targetName = portraitName;
        TargetPortraitGameGUI.targetIcon = portraitAvatar;
        TargetPortraitGameGUI.targetHealthBar = portraitStatsHealthSlider;
        TargetPortraitGameGUI.targetHealthText = portraitStatsHealthText;
        TargetPortraitGameGUI.targetStaminaBar = portraitStatsStaminaSlider;
        TargetPortraitGameGUI.targetStaminaText = portraitStatsStaminaText;
        return portrait;
    }
    static resize() {
        return 0;
    }
    static show() {
        TargetPortraitGameGUI.controller.isVisible = true;
        return 0;
    }
    static hide() {
        TargetPortraitGameGUI.controller.isVisible = false;
        return 0;
    }
    static clear() {
        TargetPortraitGameGUI.hideHealth();
        TargetPortraitGameGUI.hideStamina();
        TargetPortraitGameGUI.hide();
        TargetPortraitGameGUI.entityID = null;
        TargetPortraitGameGUI.cachedEntity = null;
        TargetPortraitGameGUI.targetIsCreature = false;
    }
    static set(entityController) {
        if (!(entityController instanceof EntityController)) {
            TargetPortraitGameGUI.clear();
            return 2;
        }
        if (!Game.hasCachedEntity(entityController.entityID)) {
            Game.getEntity(entityController.entityID);
            TargetPortraitGameGUI.clear();
            return 1;
        }
        TargetPortraitGameGUI.entityID = entityController.entityID;
        TargetPortraitGameGUI.cachedEntity = Game.getCachedEntity(entityController.entityID);
        if (entityController instanceof CreatureController) {
            TargetPortraitGameGUI.update();
            TargetPortraitGameGUI.showHealth();
            TargetPortraitGameGUI.showStamina();
            TargetPortraitGameGUI.targetIsCreature = true;
        }
        else {
            TargetPortraitGameGUI.hideHealth();
            TargetPortraitGameGUI.hideStamina();
            TargetPortraitGameGUI.targetIsCreature = false;
        }
        TargetPortraitGameGUI.setImage(TargetPortraitGameGUI.cachedEntity.iconID);
        TargetPortraitGameGUI.setName(TargetPortraitGameGUI.cachedEntity.name);
        return 0;
    }
    static update() {
        if (TargetPortraitGameGUI.targetIsCreature) {
            TargetPortraitGameGUI.setHealthSlider(TargetPortraitGameGUI.cachedEntity.health/TargetPortraitGameGUI.cachedEntity.maxHealth*100);
            TargetPortraitGameGUI.setHealthText(TargetPortraitGameGUI.cachedEntity.health + "/" + TargetPortraitGameGUI.cachedEntity.maxHealth);
            TargetPortraitGameGUI.setStaminaSlider((TargetPortraitGameGUI.cachedEntity.health-TargetPortraitGameGUI.cachedEntity.stamina)/TargetPortraitGameGUI.cachedEntity.health*100);
            let number = TargetPortraitGameGUI.cachedEntity.health - TargetPortraitGameGUI.cachedEntity.stamina;
            if (number < 0) {
                number = 0;
            }
            TargetPortraitGameGUI.setStaminaText(number + "/" + TargetPortraitGameGUI.cachedEntity.health);
        }
        return 0;
    }
    static setImage(iconID = "genericItem") {
        TargetPortraitGameGUI.targetIcon.domImage.setAttribute("src", Game.getIcon(iconID));
    }
    static setName(string) {
        TargetPortraitGameGUI.targetName.text = string;
    }
    static showHealth() {
        TargetPortraitGameGUI.targetHealthBar.parent.isVisible = true;
    }
    static hideHealth() {
        TargetPortraitGameGUI.targetHealthBar.parent.isVisible = false;
    }
    static setHealthSlider(int = 100) {
        TargetPortraitGameGUI.targetHealthBar.value = int;
    }
    static setHealthText(text = "") {
        TargetPortraitGameGUI.targetHealthText.text = text;
    }
    static showStamina() {
        TargetPortraitGameGUI.targetStaminaBar.parent.isVisible = true;
    }
    static hideStamina() {
        TargetPortraitGameGUI.targetStaminaBar.parent.isVisible = false;
    }
    static setStaminaSlider(int = 100) {
        TargetPortraitGameGUI.targetStaminaBar.value = int;
    }
    static setStaminaText(text = "") {
        TargetPortraitGameGUI.targetStaminaText.text = text;
    }
    static getController() {
        return TargetPortraitGameGUI.controller;
    }
}