class GameGUI {
    constructor() {
        GameGUI.initialized = false;
    }
    static initialize() {
        GameGUI.mainMenu = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("mainMenu");
        GameGUI.hud = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("hud");
        GameGUI.initHUD();
        GameGUI.initMainMenu();

        GameGUI.initialized = true;
    }
    static initHUD() {
        GameGUI.hud.addControl(GameGUI._generateCrosshair());
        GameGUI.hud.addControl(GameGUI._generateChat());
        GameGUI.hud.addControl(GameGUI._generatePlayerPortrait());
        GameGUI.hud.addControl(GameGUI._generateTargetPortrait());
        GameGUI.hideHUD();
    }
    static initMainMenu() {
        GameGUI.mainMenu.addControl(GameGUI._generateCharacterChoiceMenu());
        GameGUI.hideMainMenu();
    }
    static showHUD() {
        GameGUI.hud.rootContainer.isVisible = true;
    }
    static hideHUD() {
        GameGUI.hud.rootContainer.isVisible = false;
    }
    static showMainMenu() {
        GameGUI.mainMenu.rootContainer.isVisible = true;
    }
    static hideMainMenu() {
        GameGUI.mainMenu.rootContainer.isVisible = false;
    }
    static _generateCrosshair() {
        if (Game.debugEnabled) console.log("Running showCrosshair");
        var crosshair = new BABYLON.GUI.Ellipse("crosshair");
        crosshair.width = "15px";
        crosshair.background = "white";
        crosshair.height = "15px";
        crosshair.color = "black";
        crosshair.alpha = 0.5;
        crosshair.isVisible = false;
        return crosshair;
    }
    static showCrosshair() {
        GameGUI.hud.rootContainer.getChildByName("crosshair").isVisible = true;
    }
    static hideCrosshair() {
        GameGUI.hud.rootContainer.getChildByName("crosshair").isVisible = false;
    }
    static _generateDemoMenu() {
        var bottomMenuContainer = new BABYLON.GUI.StackPanel("bottomMenuContainer");
        bottomMenuContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        bottomMenuContainer.isVertical = true;
        //GameGUI.gui.addControl(bottomMenuContainer);

        var firstRow = new BABYLON.GUI.StackPanel();
        firstRow.height = "64px";
        firstRow.isVertical = false;
        bottomMenuContainer.addControl(firstRow);
        
        var secondRow = new BABYLON.GUI.StackPanel();
        secondRow.height = "64px";
        secondRow.isVertical = false;
        bottomMenuContainer.addControl(secondRow);

        var thirdRow = new BABYLON.GUI.StackPanel();
        thirdRow.height = "64px";
        thirdRow.isVertical = false;
        bottomMenuContainer.addControl(thirdRow);

        var optionOne = new BABYLON.GUI.Button.CreateSimpleButton("optionOne", "1");
        optionOne.width = "25%";
        firstRow.addControl(optionOne);
        var optionTwo = new BABYLON.GUI.Button.CreateSimpleButton("optionTwo", "2");
        optionTwo.width = "25%";
        firstRow.addControl(optionTwo);
        var optionThree = new BABYLON.GUI.Button.CreateSimpleButton("optionThree", "3");
        optionThree.width = "25%";
        firstRow.addControl(optionThree);
        var optionFour = new BABYLON.GUI.Button.CreateSimpleButton("optionFour", "4");
        optionFour.width = "25%";
        firstRow.addControl(optionFour);

        var optionQ = new BABYLON.GUI.Button.CreateSimpleButton("optionQ", "Q");
        optionQ.width = "25%";
        secondRow.addControl(optionQ);
        var optionW = new BABYLON.GUI.Button.CreateSimpleButton("optionW", "W");
        optionW.width = "25%";
        secondRow.addControl(optionW);
        var optionE = new BABYLON.GUI.Button.CreateSimpleButton("optionE", "E");
        optionE.width = "25%";
        secondRow.addControl(optionE);
        var optionR = new BABYLON.GUI.Button.CreateSimpleButton("optionR", "R");
        optionR.width = "25%";
        secondRow.addControl(optionR);

        var optionA = new BABYLON.GUI.Button.CreateSimpleButton("optionA", "A");
        optionA.width = "25%";
        thirdRow.addControl(optionA);
        var optionS = new BABYLON.GUI.Button.CreateSimpleButton("optionS", "S");
        optionS.width = "25%";
        thirdRow.addControl(optionS);
        var optionD = new BABYLON.GUI.Button.CreateSimpleButton("optionD", "D");
        optionD.width = "25%";
        thirdRow.addControl(optionD);
        var optionF = new BABYLON.GUI.Button.CreateSimpleButton("optionF", "F");
        optionF.width = "25%";
        thirdRow.addControl(optionF);

        return bottomMenuContainer;
    }
    static _generateChat() {
        var chatBox = new BABYLON.GUI.StackPanel("chatBox");
            var chatOutput = new BABYLON.GUI.TextBlock("chatOutput");
            var chatInput = new BABYLON.GUI.InputText("chatInput");

        chatBox.bottom = 0;
        chatBox.left = 0;
        chatBox.isVertical = true;
        chatBox.height = 0.1;
        chatBox.width = 0.2;
        chatOutput.height = 0.8;
        chatOutput.width = 1.0;
        chatInput.height = 0.2;
        chatInput.width = 1.0;
        chatBox.addControl(chatOutput);
        chatBox.addControl(chatInput);
        chatBox.isVisible = false;
        return chatBox;
    }
    static _generateCharacterChoiceMenu() {
        var cNM1 = new BABYLON.GUI.StackPanel("characterChoiceMenu");
            var cNM2 = new BABYLON.GUI.StackPanel();
                var nameInputLabel = new BABYLON.GUI.TextBlock();
                var nameInput = new BABYLON.GUI.InputText();
            var cNM3 = new BABYLON.GUI.StackPanel();
                var ageInputLabel = new BABYLON.GUI.TextBlock();
                var ageInput = new BABYLON.GUI.InputText();
            var cNM4 = new BABYLON.GUI.StackPanel();
                var speciesSelectLabel = new BABYLON.GUI.TextBlock();
                var speciesSelect = new BABYLON.GUI.InputText();
            var cNM5 = new BABYLON.GUI.StackPanel();
                var buttonKBLayoutQwerty = BABYLON.GUI.Button.CreateSimpleButton("kbLayoutQwerty", "QWERTY");
                var buttonKBLayoutDvorak = BABYLON.GUI.Button.CreateSimpleButton("kbLayoutDvorak", "Dvorak");
                var buttonKBLayoutAzerty = BABYLON.GUI.Button.CreateSimpleButton("kbLayoutAzerty", "AZERTY");
            var cNMSubmit = new BABYLON.GUI.StackPanel();
                var submitOnline = BABYLON.GUI.Button.CreateSimpleButton("submitOnline", "Online");
                var submitOffline = BABYLON.GUI.Button.CreateSimpleButton("submitOffline", "Offline");
        
        cNM1.isVertical = true;
        cNM2.isVertical = false;
        cNM3.isVertical = false;
        cNM4.isVertical = false;
        cNM5.isVertical = false;
        cNMSubmit.isVertical = false;

        cNM1.zIndex = 90;
        cNM1.width = "512px";
        cNM1.height = "144px";
        cNM1.background = "black";
        cNM1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        cNM1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;

        nameInputLabel.text = "Name: ";
        nameInputLabel.height = "24px";
        nameInputLabel.width = "128px";
        nameInputLabel.color = "white";

        nameInput.height = "24px";
        nameInput.width = "256px";
        nameInput.color = "white";
        nameInput.background = "grey";
        nameInput.text = "Fox";

        ageInputLabel.text = "Age: ";
        ageInputLabel.height = "24px";
        ageInputLabel.width = "128px";
        ageInputLabel.color = "white";

        ageInput.height = "24px";
        ageInput.width = "256px";
        ageInput.color = "white";
        ageInput.background = "grey";

        speciesSelectLabel.text = "Species: ";
        speciesSelectLabel.height = "24px";
        speciesSelectLabel.width = "128px";
        speciesSelectLabel.color = "white";

        speciesSelect.height = "24px";
        speciesSelect.width = "256px";
        speciesSelect.color = "white";
        speciesSelect.background = "grey";

        buttonKBLayoutQwerty.height = "24px";
        buttonKBLayoutQwerty.width = "128px";
        buttonKBLayoutQwerty.color = "white";
        buttonKBLayoutQwerty.background = "grey";
        buttonKBLayoutDvorak.height = "24px";
        buttonKBLayoutDvorak.width = "128px";
        buttonKBLayoutDvorak.color = "white";
        buttonKBLayoutDvorak.background = "grey";
        buttonKBLayoutAzerty.height = "24px";
        buttonKBLayoutAzerty.width = "128px";
        buttonKBLayoutAzerty.color = "white";
        buttonKBLayoutAzerty.background = "grey";

        submitOffline.height = "24px";
        submitOffline.width = "128px";
        submitOffline.color = "white";
        submitOffline.background = "grey";
        submitOffline.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        submitOnline.height = "24px";
        submitOnline.width = "128px";
        submitOnline.color = "white";
        submitOnline.background = "grey";
        submitOnline.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        buttonKBLayoutQwerty.onPointerDownObservable.add(function() {
            Game.initQwertyKeyboardControls();
        });
        buttonKBLayoutDvorak.onPointerDownObservable.add(function() {
            Game.initDvorakKeyboardControls();
        });
        buttonKBLayoutAzerty.onPointerDownObservable.add(function() {
            Game.initAzertyKeyboardControls();
        });
        submitOnline.onPointerDownObservable.add(function() {
            Game.player.entity.setName(nameInput.text);
            Client.connect();
            GameGUI.hideMainMenu();
            GameGUI.showHUD();
        });
        submitOffline.onPointerDownObservable.add(function() {
            Game.player.entity.setName(nameInput.text);
            GameGUI.hideMainMenu();
            GameGUI.showHUD();
        });

        cNM1.addControl(cNM2);
            cNM2.addControl(nameInputLabel);
            cNM2.addControl(nameInput);
        cNM1.addControl(cNM3);
            cNM3.addControl(ageInputLabel);
            cNM3.addControl(ageInput);
        cNM1.addControl(cNM4);
            cNM4.addControl(speciesSelectLabel);
            cNM4.addControl(speciesSelect);
        cNM1.addControl(cNM5);
            cNM5.addControl(buttonKBLayoutQwerty);
            cNM5.addControl(buttonKBLayoutDvorak);
            cNM5.addControl(buttonKBLayoutAzerty);
        cNM1.addControl(cNMSubmit);
            cNMSubmit.addControl(submitOffline);
            cNMSubmit.addControl(submitOnline);

        return cNM1;
    }
    static _generatePlayerPortrait() {
        var playerPortrait = new BABYLON.GUI.Rectangle("playerPortrait");
        playerPortrait.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        playerPortrait.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        playerPortrait.height = 0.12;
        playerPortrait.width = 0.24;
        playerPortrait.top = 0;
        playerPortrait.left = 0;
        playerPortrait.thickness = 0;
            var playerPortraitAvatarContainer = new BABYLON.GUI.Rectangle();
            playerPortraitAvatarContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            playerPortraitAvatarContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            playerPortraitAvatarContainer.height = 1.0;
            playerPortraitAvatarContainer.width = 0.33;
            playerPortraitAvatarContainer.top = 0;
            playerPortraitAvatarContainer.left = 0;
            playerPortraitAvatarContainer.thickness = 0;
                var playerPortraitAvatar = new BABYLON.GUI.Image("playerPortraitAvatar", "resources/images/characters/genericCharacter.svg");
                playerPortraitAvatar.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
            var playerPortraitStats = new BABYLON.GUI.StackPanel("playerPortraitStats");
            playerPortraitStats.isVertical = true;
            playerPortraitStats.height = 1.0;
            playerPortraitStats.width = 0.76;
            playerPortraitStats.top = 0;
            playerPortraitStats.left = "21%";
                var playerPortraitStatsName = new BABYLON.GUI.TextBlock("playerName");
                playerPortraitStatsName.text = "Your Name Here";
                playerPortraitStatsName.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                playerPortraitStatsName.height = 0.25;
                playerPortraitStatsName.width = 1.0;
                var playerPortraitStatsHealth = new BABYLON.GUI.TextBlock("playerHealth");
                playerPortraitStatsHealth.text = "Health";
                playerPortraitStatsHealth.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                playerPortraitStatsHealth.height = 0.25;
                playerPortraitStatsHealth.width = 1.0;
                var playerPortraitStatsMana = new BABYLON.GUI.TextBlock("playerMana");
                playerPortraitStatsMana.text = "";
                playerPortraitStatsMana.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                playerPortraitStatsMana.height = 0.25;
                playerPortraitStatsMana.width = 1.0;
                var playerPortraitStatsStamina = new BABYLON.GUI.TextBlock("playerStamina");
                playerPortraitStatsStamina.text = "Stamina";
                playerPortraitStatsStamina.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                playerPortraitStatsStamina.height = 0.25;
                playerPortraitStatsStamina.width = 1.0;
        playerPortrait.addControl(playerPortraitAvatarContainer);
        playerPortraitAvatarContainer.addControl(playerPortraitAvatar);
        playerPortrait.addControl(playerPortraitStats);
        playerPortraitStats.addControl(playerPortraitStatsName);
        playerPortraitStats.addControl(playerPortraitStatsHealth);
        playerPortraitStats.addControl(playerPortraitStatsMana);
        playerPortraitStats.addControl(playerPortraitStatsStamina);
        return playerPortrait;
    }
    static _generateTargetPortrait() {
        var targetPortrait = new BABYLON.GUI.Rectangle("targetPortrait");
        targetPortrait.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        targetPortrait.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        targetPortrait.height = 0.12;
        targetPortrait.width = 0.24;
        targetPortrait.top = 0;
        targetPortrait.left = "24%";
        targetPortrait.thickness = 0;
        targetPortrait.isVisible = false;
            var targetPortraitAvatarContainer = new BABYLON.GUI.Rectangle();
            targetPortraitAvatarContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            targetPortraitAvatarContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            targetPortraitAvatarContainer.height = 1.0;
            targetPortraitAvatarContainer.width = 0.33;
            targetPortraitAvatarContainer.top = 0;
            targetPortraitAvatarContainer.left = 0;
            targetPortraitAvatarContainer.thickness = 0;
                var targetPortraitAvatar = new BABYLON.GUI.Image("targetPortraitAvatar", "resources/images/characters/genericCharacter.svg");
                targetPortraitAvatar.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
            var targetPortraitStats = new BABYLON.GUI.StackPanel("targetPortraitStats");
            targetPortraitStats.isVertical = true;
            targetPortraitStats.height = 1.0;
            targetPortraitStats.width = 0.76;
            targetPortraitStats.top = 0;
            targetPortraitStats.left = "-21%";
                var targetPortraitStatsName = new BABYLON.GUI.TextBlock("targetName");
                targetPortraitStatsName.text = "Your Name Here";
                targetPortraitStatsName.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                targetPortraitStatsName.height = 0.25;
                targetPortraitStatsName.width = 1.0;
                var targetPortraitStatsHealth = new BABYLON.GUI.TextBlock("targetHealth");
                targetPortraitStatsHealth.text = "Health";
                targetPortraitStatsHealth.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                targetPortraitStatsHealth.height = 0.25;
                targetPortraitStatsHealth.width = 1.0;
                var targetPortraitStatsMana = new BABYLON.GUI.TextBlock("targetMana");
                targetPortraitStatsMana.text = "";
                targetPortraitStatsMana.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                targetPortraitStatsMana.height = 0.25;
                targetPortraitStatsMana.width = 1.0;
                var targetPortraitStatsStamina = new BABYLON.GUI.TextBlock("targetStamina");
                targetPortraitStatsStamina.text = "Stamina";
                targetPortraitStatsStamina.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                targetPortraitStatsStamina.height = 0.25;
                targetPortraitStatsStamina.width = 1.0;
        targetPortrait.addControl(targetPortraitStats);
        targetPortrait.addControl(targetPortraitAvatarContainer);
        targetPortraitAvatarContainer.addControl(targetPortraitAvatar);
        targetPortraitStats.addControl(targetPortraitStatsName);
        targetPortraitStats.addControl(targetPortraitStatsHealth);
        targetPortraitStats.addControl(targetPortraitStatsMana);
        targetPortraitStats.addControl(targetPortraitStatsStamina);
        return targetPortrait;
    }
    static showPlayerPortrait() {
        GameGUI.hud.rootContainer.getChildByName("playerPortrait").isVisible = true;
    }
    static hidePlayerPortrait() {
        GameGUI.hud.rootContainer.getChildByName("playerPortrait").isVisible = false;
    }
    static showTargetPortrait() {
        GameGUI.hud.rootContainer.getChildByName("targetPortrait").isVisible = true;
    }
    static hideTargetPortrait() {
        GameGUI.hud.rootContainer.getChildByName("targetPortrait").isVisible = false;
    }
    static updatePlayerPortrait(_image = undefined, _name = undefined, _health = undefined, _mana = undefined, _stamina = undefined) {
        this.updatePlayerPortraitImage(_image);
        this.updatePlayerPortraitName(_name);
        this.updatePlayerPortraitHealth(_health);
        this.updatePlayerPortraitMana(_mana);
        this.updatePlayerPortraitStamina(_stamina);
    }
    static updateTargetPortrait(_image = undefined, _name = undefined, _health = undefined, _mana = undefined, _stamina = undefined) {
        this.updateTargetPortraitImage(_image);
        this.updateTargetPortraitName(_name);
        this.updateTargetPortraitHealth(_health);
        this.updateTargetPortraitMana(_mana);
        this.updateTargetPortraitStamina(_stamina);
    }
    static updatePlayerPortraitImage(_image) {
        GameGUI.hud.rootContainer.getChildByName("playerPortrait").children[0].children[0].domImage.setAttribute("src", _image);
    }
    static updatePlayerPortraitName(_string) {
        GameGUI.hud.rootContainer.getChildByName("playerPortrait").children[1].children[0].text = _string;
    }
    static updatePlayerPortraitHealth(_int = 100) {
        GameGUI.hud.rootContainer.getChildByName("playerPortrait").children[1].children[1].text = _int;
    }
    static updatePlayerPortraitStamina(_int = 100) {
        GameGUI.hud.rootContainer.getChildByName("playerPortrait").children[1].children[3].text = _int;
    }
    static showPlayerPortraitMana() {
        GameGUI.hud.rootContainer.getChildByName("playerPortrait").children[1].children[2].isVisible = true;
    }
    static hidePlayerPortraitMana() {
        GameGUI.hud.rootContainer.getChildByName("playerPortrait").children[1].children[2].isVisible = false;
    }
    static updatePlayerPortraitMana(_int = 100) {
        GameGUI.hud.rootContainer.getChildByName("playerPortrait").children[1].children[2].text = _int;
        if (_int == 0 || !isInt(_int)) {
            this.hidePlayerPortraitMana();
        }
        else {
            this.showPlayerPortraitMana();
        }
    }
    static updateTargetPortraitImage(_image) {
        GameGUI.hud.rootContainer.getChildByName("targetPortrait").children[1].children[0].domImage.setAttribute("src", _image);
    }
    static updateTargetPortraitName(_string) {
        GameGUI.hud.rootContainer.getChildByName("targetPortrait").children[0].children[0].text = _string;
    }
    static updateTargetPortraitHealth(_int = 100) {
        GameGUI.hud.rootContainer.getChildByName("targetPortrait").children[0].children[1].text = _int;
    }
    static updateTargetPortraitStamina(_int = 100) {
        GameGUI.hud.rootContainer.getChildByName("targetPortrait").children[0].children[3].text = _int;
    }
    static showTargetPortraitMana() {
        GameGUI.hud.rootContainer.getChildByName("targetPortrait").children[0].children[2].isVisible = true;
    }
    static hideTargetPortraitMana() {
        GameGUI.hud.rootContainer.getChildByName("targetPortrait").children[0].children[2].isVisible = false;
    }
    static updateTargetPortraitMana(_int = 100) {
        GameGUI.hud.rootContainer.getChildByName("targetPortrait").children[0].children[2].text = _int;
        if (_int == 0 || _int == NaN) {
            this.hideTargetPortraitMana();
        }
        else {
            this.showTargetPortraitMana();
        }
    }
}