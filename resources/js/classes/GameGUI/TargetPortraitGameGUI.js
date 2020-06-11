class TargetPortraitGameGUI {
    static initialize() {
        TargetPortraitGameGUI.targetName = null;
        TargetPortraitGameGUI.targetIcon = null;
        TargetPortraitGameGUI.targetHealthBar = null;
        TargetPortraitGameGUI.targetHealthText = null;
        TargetPortraitGameGUI.targetStaminaBar = null;
        TargetPortraitGameGUI.targetStaminaText = null;
        TargetPortraitGameGUI.isVisible = false;
        TargetPortraitGameGUI.controller = TargetPortraitGameGUI.generateController();
        TargetPortraitGameGUI.initialized = true;
        TargetPortraitGameGUI.containerAlpha = 0.75;
    }
    static generateController() {
        var portrait = GameGUI.createRectangle("targetPortrait");
        portrait.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        portrait.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        portrait.height = GameGUI.getFontSize(4);
        portrait.width = GameGUI.getFontSize(14)
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
    static show() {
        TargetPortraitGameGUI.controller.isVisible = true;
        TargetPortraitGameGUI.isVisible = true;
    }
    static hide() {
        TargetPortraitGameGUI.controller.isVisible = false;
        TargetPortraitGameGUI.isVisible = false;
    }
    static set(abstractEntity) {
        if (abstractEntity instanceof EntityController) {
            abstractEntity = abstractEntity.getEntity();
        }
        else if (!(abstractEntity instanceof AbstractEntity)) {
            return undefined;
        }
        if (!abstractEntity.isEnabled()) {
            return undefined;
        }
        if (abstractEntity instanceof CreatureEntity) {
            TargetPortraitGameGUI.setHealthSlider(abstractEntity.getHealth()/abstractEntity.getMaxHealth()*100);
            TargetPortraitGameGUI.setHealthText(abstractEntity.getHealth() + "/" + abstractEntity.getMaxHealth());
            TargetPortraitGameGUI.setStaminaSlider((abstractEntity.getHealth()-abstractEntity.getStamina())/abstractEntity.getHealth()*100);
            TargetPortraitGameGUI.setStaminaText((abstractEntity.getHealth()-abstractEntity.getStamina()) + "/" + abstractEntity.getHealth());
            TargetPortraitGameGUI.showHealth();
            TargetPortraitGameGUI.showStamina();
        }
        else {
            TargetPortraitGameGUI.hideHealth();
            TargetPortraitGameGUI.hideStamina();
        }
        TargetPortraitGameGUI.setImage(abstractEntity.getIcon());
        TargetPortraitGameGUI.setName(abstractEntity.getName());
    }
    static update() {
        return TargetPortraitGameGUI.updateWith(Game.player);
    }
    static updateWith(abstractEntity = Game.player) {
        if (abstractEntity instanceof EntityController) {
            abstractEntity = abstractEntity.getEntity();
        }
        else if (!(abstractEntity instanceof AbstractEntity)) {
            return undefined;
        }
        if (!abstractEntity.isEnabled()) {
            return undefined;
        }
        TargetPortraitGameGUI.setHealthSlider(abstractEntity.getHealth()/abstractEntity.getMaxHealth()*100);
        TargetPortraitGameGUI.setHealthText(abstractEntity.getHealth() + "/" + abstractEntity.getMaxHealth());
        if (abstractEntity instanceof CreatureEntity) {
            TargetPortraitGameGUI.setStaminaSlider((abstractEntity.getHealth()-abstractEntity.getStamina())/abstractEntity.getHealth()*100);
            let number = abstractEntity.getHealth() - abstractEntity.getStamina();
            if (number < 0) {
                number = 0;
            }
            TargetPortraitGameGUI.setStaminaText(number + "/" + abstractEntity.getHealth());
        }
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