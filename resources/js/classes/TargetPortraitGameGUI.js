class TargetPortraitGameGUI {
    static initialize() {
        TargetPortraitGameGUI.targetName = null;
        TargetPortraitGameGUI.targetIcon = null;
        TargetPortraitGameGUI.targetHealthBar = null;
        TargetPortraitGameGUI.targetHealthText = null;
        TargetPortraitGameGUI.targetManaBar = null;
        TargetPortraitGameGUI.targetManaText = null;
        TargetPortraitGameGUI.targetStaminaBar = null;
        TargetPortraitGameGUI.targetStaminaText = null;
        TargetPortraitGameGUI.controller = TargetPortraitGameGUI.generateController();
        TargetPortraitGameGUI.initialized = true;
    }
    static generateController() {
        var portrait = new BABYLON.GUI.Rectangle("targetPortrait");
        portrait.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        portrait.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        portrait.height = GameGUI.getFontSizePx(4);
        portrait.width = GameGUI.getFontSizePx(14)
        portrait.top = 0;
        portrait.left = "26%";
        portrait.thickness = 0;
        portrait.isVisible = false;
            var portraitBackground = new BABYLON.GUI.Rectangle("portraitBackground");
            portraitBackground.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            portraitBackground.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            portraitBackground.height = GameGUI.getFontSizePx(4);
            portraitBackground.width = 1;
            portraitBackground.top = 0;
            portraitBackground.left = 0;
            portraitBackground.thickness = 0;
            portraitBackground.background = GameGUI.background;
            portraitBackground.alpha = 0.5;
            var portraitAvatarContainer = new BABYLON.GUI.Rectangle();
            portraitAvatarContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            portraitAvatarContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            portraitAvatarContainer.height = GameGUI.getFontSizePx(4);
            portraitAvatarContainer.width = 0.33;
            portraitAvatarContainer.top = 0;
            portraitAvatarContainer.left = 0;
            portraitAvatarContainer.thickness = 0;
                var portraitAvatar = new BABYLON.GUI.Image("portraitAvatar", "resources/images/icons/characters/genericCharacter.svg");
                portraitAvatar.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
            var portraitStats = new BABYLON.GUI.StackPanel("portraitStats");
            portraitStats.isVertical = true;
            portraitStats.height = GameGUI.getFontSizePx(4);
            portraitStats.width = GameGUI.getFontSizePx(10);
            portraitStats.top = 0;
            portraitStats.left = "-21%";
                var portraitName = new BABYLON.GUI.TextBlock("portraitName");
                portraitName.text = "Your Name Here";
                portraitName.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                portraitName.height = GameGUI.fontSizePx;
                portraitName.width = 0.85;
                portraitName.color = GameGUI.color;
                var portraitStatsHealthContainer = new BABYLON.GUI.Rectangle("portraitStatsHealthContainer");
                portraitStatsHealthContainer.height = GameGUI.fontSizePx;
                portraitStatsHealthContainer.width = 0.85;
                portraitStatsHealthContainer.thickness = 0;
                    var portraitStatsHealthText = new BABYLON.GUI.TextBlock("portraitStatsHealthText");
                    portraitStatsHealthText.text = "";
                    portraitStatsHealthText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                    portraitStatsHealthText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                    portraitStatsHealthText.color = GameGUI.color;
                    var portraitStatsHealthSlider = new BABYLON.GUI.Slider("portraitStatsHealth");
                    portraitStatsHealthSlider.minimum = 0;
                    portraitStatsHealthSlider.maximum = 100;
                    portraitStatsHealthSlider.isVertical = false;
                    portraitStatsHealthSlider.displayThumb = false;
                    portraitStatsHealthSlider.left = "16px";
                    portraitStatsHealthSlider.height = GameGUI.getFontSizePx(1.25);
                    portraitStatsHealthSlider.thumbWidth = 0;
                    portraitStatsHealthSlider.isEnabled = false;
                    portraitStatsHealthSlider.scaleX = -1;
                    portraitStatsHealthSlider.color = "red";
                var portraitStatsManaContainer = new BABYLON.GUI.Rectangle("portraitStatsManaContainer");
                portraitStatsManaContainer.height = GameGUI.fontSizePx;
                portraitStatsManaContainer.width = 0.85;
                portraitStatsManaContainer.thickness = 0;
                    var portraitStatsManaText = new BABYLON.GUI.TextBlock("portraitStatsManaText");
                    portraitStatsManaText.text = "";
                    portraitStatsManaText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                    portraitStatsManaText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                    portraitStatsManaText.color = GameGUI.color;
                    var portraitStatsManaSlider = new BABYLON.GUI.Slider("portraitStatsManaSlider");
                    portraitStatsManaSlider.minimum = 0;
                    portraitStatsManaSlider.maximum = 100;
                    portraitStatsManaSlider.isVertical = false;
                    portraitStatsManaSlider.displayThumb = false;
                    portraitStatsManaSlider.left = "16px";
                    portraitStatsManaSlider.height = GameGUI.getFontSizePx(1.25);
                    portraitStatsManaSlider.thumbWidth = 0;
                    portraitStatsManaSlider.isEnabled = false;
                    portraitStatsManaSlider.scaleX = -1;
                    portraitStatsManaSlider.color = "blue";
                var portraitStatsStaminaContainer = new BABYLON.GUI.Rectangle("portraitStatsStaminaContainer");
                portraitStatsStaminaContainer.height = GameGUI.fontSizePx;
                portraitStatsStaminaContainer.width = 0.85;
                portraitStatsStaminaContainer.thickness = 0;
                    var portraitStatsStaminaText = new BABYLON.GUI.TextBlock("portraitStatsStaminaText");
                    portraitStatsStaminaText.text = "";
                    portraitStatsStaminaText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                    portraitStatsStaminaText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                    portraitStatsStaminaText.color = GameGUI.color;
                    var portraitStatsStaminaSlider = new BABYLON.GUI.Slider("portraitStatsStaminaSlider");
                    portraitStatsStaminaSlider.minimum = 0;
                    portraitStatsStaminaSlider.maximum = 100;
                    portraitStatsStaminaSlider.isVertical = false;
                    portraitStatsStaminaSlider.displayThumb = false;
                    portraitStatsStaminaSlider.left = "16px";
                    portraitStatsStaminaSlider.height = GameGUI.getFontSizePx(1.25);
                    portraitStatsStaminaSlider.thumbWidth = 0;
                    portraitStatsStaminaSlider.isEnabled = false;
                    portraitStatsStaminaSlider.scaleX = -1;
                    portraitStatsStaminaSlider.color = "green";
        portrait.addControl(portraitBackground);
        portrait.addControl(portraitStats);
        portrait.addControl(portraitAvatarContainer);
        portraitAvatarContainer.addControl(portraitAvatar);
        portraitStats.addControl(portraitName);
        portraitStatsHealthContainer.addControl(portraitStatsHealthSlider);
        portraitStatsHealthContainer.addControl(portraitStatsHealthText);
        portraitStats.addControl(portraitStatsHealthContainer);
        portraitStatsManaContainer.addControl(portraitStatsManaSlider);
        portraitStatsManaContainer.addControl(portraitStatsManaText);
        portraitStats.addControl(portraitStatsManaContainer);
        portraitStatsStaminaContainer.addControl(portraitStatsStaminaSlider);
        portraitStatsStaminaContainer.addControl(portraitStatsStaminaText);
        portraitStats.addControl(portraitStatsStaminaContainer);
        portrait.zIndex = 10;
        TargetPortraitGameGUI.targetName = portraitName;
        TargetPortraitGameGUI.targetIcon = portraitAvatar;
        TargetPortraitGameGUI.targetHealthBar = portraitStatsHealthSlider;
        TargetPortraitGameGUI.targetHealthText = portraitStatsHealthText;
        TargetPortraitGameGUI.targetManaBar = portraitStatsManaSlider;
        TargetPortraitGameGUI.targetManaText = portraitStatsManaText;
        TargetPortraitGameGUI.targetStaminaBar = portraitStatsStaminaSlider;
        TargetPortraitGameGUI.targetStaminaText = portraitStatsStaminaText;
        return portrait;
    }
    static show() {
        TargetPortraitGameGUI.controller.isVisible = true;
    }
    static hide() {
        TargetPortraitGameGUI.controller.isVisible = false;
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
        if (abstractEntity instanceof CharacterEntity) {
            TargetPortraitGameGUI.setHealthSlider(abstractEntity.getHealth()/abstractEntity.getMaxHealth()*100);
            TargetPortraitGameGUI.setHealthText(abstractEntity.getHealth() + "/" + abstractEntity.getMaxHealth());
            if (abstractEntity.getMaxMana() == 0) {
                TargetPortraitGameGUI.hideMana();
            }
            else {
                TargetPortraitGameGUI.showMana();
                TargetPortraitGameGUI.setManaSlider(abstractEntity.getMana()/abstractEntity.getMaxMana()*100);
                TargetPortraitGameGUI.setManaText(abstractEntity.getMana() + "/" + abstractEntity.getMaxMana());
            }
            TargetPortraitGameGUI.setStaminaSlider(abstractEntity.getStamina()/abstractEntity.getMaxStamina()*100);
            TargetPortraitGameGUI.setStaminaText(abstractEntity.getStamina() + "/" + abstractEntity.getMaxStamina());
            TargetPortraitGameGUI.showHealth();
            TargetPortraitGameGUI.showStamina();
        }
        else {
            TargetPortraitGameGUI.hideHealth();
            TargetPortraitGameGUI.hideMana();
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
        if (abstractEntity.getMaxMana() == 0) {
            TargetPortraitGameGUI.hideMana();
        }
        else {
            TargetPortraitGameGUI.showMana();
            TargetPortraitGameGUI.setManaSlider(abstractEntity.getMana()/abstractEntity.getMaxMana()*100);
            TargetPortraitGameGUI.setManaText(abstractEntity.getMana() + "/" + abstractEntity.getMaxMana());
        }
        TargetPortraitGameGUI.setStaminaSlider(abstractEntity.getStamina()/abstractEntity.getMaxStamina()*100);
        TargetPortraitGameGUI.setStaminaText(abstractEntity.getStamina() + "/" + abstractEntity.getMaxStamina());
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
    static showMana() {
        TargetPortraitGameGUI.targetManaBar.parent.isVisible = true;
    }
    static hideMana() {
        TargetPortraitGameGUI.targetManaBar.parent.isVisible = false;
    }
    static setManaSlider(int = 100) {
        TargetPortraitGameGUI.targetManaBar.value = int;
    }
    static setManaText(text = "") {
        TargetPortraitGameGUI.targetManaText.text = text;
    }
    static getController() {
        return TargetPortraitGameGUI.controller;
    }
}