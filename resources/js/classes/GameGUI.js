class GameGUI {
    constructor() {
        GameGUI.initialized = false;
    }
    static initialize() {
        GameGUI.alpha = "0.75";
        GameGUI.color = "white";
        GameGUI.background = "#c3c3c3";
        GameGUI.focusedBackground = "#3c3c3c";
        GameGUI._menu = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("menu");
        GameGUI._menu.rootContainer.isVisible = false;
        GameGUI._hud = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("hud");
        GameGUI._hud.rootContainer.isVisible = false;

        GameGUI._dialogueOptionCount = 0;
        GameGUI._dialogueOptions = {};
        GameGUI._crosshair = undefined;
        GameGUI._chat = undefined;
        GameGUI._playerPortrait = undefined;
        GameGUI._targetPortrait = undefined;
        GameGUI._actionTooltip = undefined;
        GameGUI._dialogueMenu = undefined;
        GameGUI._initHUD();

        GameGUI._characterChoiceMenu = undefined;
        GameGUI._inventoryMenu = undefined;
        GameGUI._initMenu();

        GameGUI.initialized = true;
    }
    static _initHUD() {
        GameGUI._crosshair = GameGUI._generateCrosshair();
        GameGUI._chat = GameGUI._generateChat();
        GameGUI._playerPortrait = GameGUI._generatePlayerPortrait();
        GameGUI._targetPortrait = GameGUI._generateTargetPortrait();
        GameGUI._actionTooltip = GameGUI._generateTargetActionTooltip();
        GameGUI._dialogueMenu = GameGUI._generateDialogueMenu();
        GameGUI._hud.addControl(GameGUI._crosshair);
        GameGUI._hud.addControl(GameGUI._chat);
        GameGUI._hud.addControl(GameGUI._playerPortrait);
        GameGUI._hud.addControl(GameGUI._targetPortrait);
        GameGUI._hud.addControl(GameGUI._actionTooltip);
        GameGUI._hud.addControl(GameGUI._dialogueMenu);
    }
    static _initMenu() {
        GameGUI._characterChoiceMenu = GameGUI._generateCharacterChoiceMenu()
        GameGUI._inventoryMenu = GameGUI._generateInventoryMenu();
        GameGUI._menu.addControl(GameGUI._characterChoiceMenu);
        GameGUI._menu.addControl(GameGUI._inventoryMenu);
    }
    static resizeText() {
        if (!GameGUI.initialized) {
            return;
        }
        GameGUI._hud.rootContainer.fontSize = String(Math.floor(24 * (window.innerWidth / 1920))) + "px";
        GameGUI._menu.rootContainer.fontSize = GameGUI._hud.rootContainer.fontSize;
    }
    static showHUD(_updateChild = true) {
        if (Game.debugEnabled) console.log("Running GameGUI::showHUD");
        if (_updateChild === true) {
            GameGUI.hideMenu(false);
        }
        GameGUI._hud.rootContainer.isVisible = true;
        Game.pointerLock();
        window.addEventListener("click", function(_event) {
            if (GameGUI._hud.rootContainer.isVisible) {
                Game.pointerLock();
            }
        });
    }
    static hideHUD(_updateChild = false) {
        if (Game.debugEnabled) console.log("Running GameGUI::hideHUD");
        if (_updateChild === true) {
            GameGUI.showMenu(true);
        }
        GameGUI._hud.rootContainer.isVisible = false;
    }
    static getHudVisible() {
        return GameGUI._hud.rootContainer.isVisible;
    }
    static setHudVisible(_boolean) {
        if (_boolean === true) {
            GameGUI._hud.rootContainer.isVisible = true;
        }
        else {
            GameGUI._hud.rootContainer.isVisible = false;
        }
    }
    static showMenu(_updateChild = true) {
        if (Game.debugEnabled) console.log("Running GameGUI::showMenu");
        if (_updateChild === true) {
            GameGUI.hideHUD(false);
        }
        Game.pointerRelease();
        GameGUI._menu.rootContainer.isVisible = true;
    }
    static hideMenu(_updateChild = false) {
        if (Game.debugEnabled) console.log("Running GameGUI::hideMenu");
        if (_updateChild === true) {
            GameGUI.showHUD(true);
        }
        GameGUI._menu.rootContainer.isVisible = false;
    }
    static _hideMenuChildren() {
        for (var _i = GameGUI._menu.rootContainer.children.length - 1; _i > -1; _i--) {
            GameGUI._menu.rootContainer.children[_i].isVisible = false;
        }
    }
    static getMenuVisible() {
        return GameGUI._menu.rootContainer.isVisible;
    }
    static setMenuVisible(_boolean) {
        if (_boolean === true) {
            GameGUI._menu.rootContainer.isVisible = true;
        }
        else {
            GameGUI._menu.rootContainer.isVisible = false;
        }
    }
    static _generateCrosshair() {
        if (Game.debugEnabled) console.log("Running GameGUI::_generateCrosshair");
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
        GameGUI._crosshair.isVisible = true;
    }
    static hideCrosshair() {
        GameGUI._crosshair.isVisible = false;
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
        var chatBox = new BABYLON.GUI.Rectangle("chatBox");
        chatBox.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        chatBox.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        chatBox.height = 0.3;
        chatBox.width = 0.4;
        chatBox.isVertical = true;
            var chatOutputContainer = new BABYLON.GUI.Rectangle("chatOutputContainer");
            chatOutputContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            chatOutputContainer.height = 0.8;
            chatOutputContainer.width = 1.0;
            chatOutputContainer.background = "black";
            chatOutputContainer.thickness = 0;
            chatOutputContainer.alpha = 0.75;
                var chatOutput = new BABYLON.GUI.TextBlock("chatOutput");
                chatOutput.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
                chatOutput.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                chatOutput.height = 1.0;
                chatOutput.width = 1.0;
                chatOutput.color = "white";
                chatOutput.textWrapping = true;
            var chatInput = new BABYLON.GUI.InputText("chatInput");
            chatInput.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            chatInput.height = 0.2;
            chatInput.width = 1.0;
            chatInput.background = "black";
            chatInput.focusedBackground = "grey";
            chatInput.color = "white";
            chatInput.text = "";
            chatInput.thickness = 1;
            chatInput.alpha = 0.75;
        chatOutputContainer.addControl(chatOutput);
        chatBox.addControl(chatOutputContainer);
        chatBox.addControl(chatInput);
        chatInput.onBlurObservable.add(function() {
            Game.controlCharacterOnKeyDown(13); // onBlurObservable triggers before ActionManager, so we'll just send the enter key manually
        });
        return chatBox;
    }
    static getChatOutput() {
        return GameGUI._chat.children[0].children[0];
    }
    static getChatInput() {
        return GameGUI._chat.children[1];
    }
    static _generateCharacterChoiceMenu() {
        var characterChoiceMenuContainer = new BABYLON.GUI.StackPanel("characterChoiceMenu");
            var nameContainer = new BABYLON.GUI.StackPanel();
                var nameLabel = new BABYLON.GUI.TextBlock();
                var nameInput = new BABYLON.GUI.InputText();
            var ageContainer = new BABYLON.GUI.StackPanel();
                var ageLabel = new BABYLON.GUI.TextBlock();
                var ageInput = new BABYLON.GUI.InputText();
            var speciesContainer = new BABYLON.GUI.StackPanel();
                var speciesLabel = new BABYLON.GUI.TextBlock();
                var speciesOptions = new BABYLON.GUI.StackPanel();
                    var speciesFox = BABYLON.GUI.Button.CreateSimpleButton("speciesFox", "Fox");
                    var speciesSkeleton = BABYLON.GUI.Button.CreateSimpleButton("speciesSkeleton", "Skeleton");
            var genderContainer = new BABYLON.GUI.StackPanel();
                var genderLabel = new BABYLON.GUI.TextBlock();
                var genderOptions = new BABYLON.GUI.StackPanel();
                    var genderMale = BABYLON.GUI.Button.CreateSimpleButton("genderMale", "Male");
                    var genderFemale = BABYLON.GUI.Button.CreateSimpleButton("genderFemale", "Female");
                    var genderNone = BABYLON.GUI.Button.CreateSimpleButton("genderNone", "None");
            var buttonKBLayoutContainer = new BABYLON.GUI.StackPanel();
                var buttonKBLayoutLabel = new BABYLON.GUI.TextBlock();
                var buttonKBLayoutOptions = new BABYLON.GUI.StackPanel();
                    var buttonKBLayoutQwerty = BABYLON.GUI.Button.CreateSimpleButton("kbLayoutQwerty", "QWERTY");
                    var buttonKBLayoutDvorak = BABYLON.GUI.Button.CreateSimpleButton("kbLayoutDvorak", "Dvorak");
                    var buttonKBLayoutAzerty = BABYLON.GUI.Button.CreateSimpleButton("kbLayoutAzerty", "AZERTY");
            var submitContainer = new BABYLON.GUI.StackPanel();
                var submitOnline = BABYLON.GUI.Button.CreateSimpleButton("submitOnline", "Online");
                var submitOffline = BABYLON.GUI.Button.CreateSimpleButton("submitOffline", "Offline");
        
        characterChoiceMenuContainer.isVertical = true;
        nameContainer.isVertical = false;
        ageContainer.isVertical = false;
        speciesContainer.isVertical = false;
            speciesOptions.isVertical = true;
        genderContainer.isVertical = false;
            genderOptions.isVertical = true;
        buttonKBLayoutContainer.isVertical = false;
            buttonKBLayoutOptions.isVertical = true;
        submitContainer.isVertical = false;

        characterChoiceMenuContainer.zIndex = 90;
        characterChoiceMenuContainer.height = 0.6
        characterChoiceMenuContainer.width = 0.5;
        characterChoiceMenuContainer.background = "black";
        characterChoiceMenuContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        characterChoiceMenuContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;

        nameContainer.height = 0.05;
            nameLabel.text = "Name: ";
            nameLabel.width = 0.3;
            nameLabel.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            nameLabel.color = "white";

            nameInput.width = 0.7;
            nameInput.color = "white";
            nameInput.background = "grey";
            nameInput.text = "Remmy Cormo";

        ageContainer.height = 0.05;
            ageLabel.text = "Age: ";
            ageLabel.width = 0.3;
            ageLabel.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            ageLabel.color = "white";

            ageInput.width = 0.7;
            ageInput.color = "white";
            ageInput.background = "grey";
            ageInput.text = "18";

        speciesContainer.height = 0.10;
            speciesLabel.text = "Species: ";
            speciesLabel.width = 0.3;
            speciesLabel.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            speciesLabel.color = "white";

            speciesOptions.width = 0.7;
                speciesFox.height = 0.5;
                speciesFox.background = "grey";
                speciesFox.color = "white";
                speciesSkeleton.height = 0.5;
                speciesSkeleton.background = "grey";
                speciesSkeleton.color = "white";

        genderContainer.height = 0.15;
            genderLabel.text = "Gender: ";
            genderLabel.width = 0.3;
            genderLabel.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            genderLabel.color = "white";

            genderOptions.width = 0.7;
                genderMale.height = 0.3;
                genderMale.background = "grey";
                genderMale.color = "white";
                genderFemale.height = 0.3;
                genderFemale.background = "grey";
                genderFemale.color = "white";
                genderNone.height = 0.3;
                genderNone.background = "grey";
                genderNone.color = "white";

        buttonKBLayoutContainer.height = 0.15;
            buttonKBLayoutLabel.text = "Keyboard Layout: ";
            buttonKBLayoutLabel.width = 0.3;
            buttonKBLayoutLabel.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            buttonKBLayoutLabel.color = "white";

            buttonKBLayoutOptions.width = 0.7;
                buttonKBLayoutQwerty.height = 0.3;
                buttonKBLayoutQwerty.background = "grey";
                buttonKBLayoutQwerty.color = "white";
                buttonKBLayoutDvorak.height = 0.3;
                buttonKBLayoutDvorak.background = "grey";
                buttonKBLayoutDvorak.color = "white";
                buttonKBLayoutAzerty.height = 0.3;
                buttonKBLayoutAzerty.background = "grey";
                buttonKBLayoutAzerty.color = "white";

        submitContainer.height = 0.05;
            submitOffline.width = 0.5;
            submitOffline.color = "white";
            submitOffline.background = "grey";
            submitOffline.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

            submitOnline.width = 0.5;
            submitOnline.color = "white";
            submitOnline.background = "grey";
            submitOnline.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        buttonKBLayoutQwerty.onPointerUpObservable.add(function() {
            Game.initQwertyKeyboardControls();
        });
        buttonKBLayoutDvorak.onPointerUpObservable.add(function() {
            Game.initDvorakKeyboardControls();
        });
        buttonKBLayoutAzerty.onPointerUpObservable.add(function() {
            Game.initAzertyKeyboardControls();
        });
        submitOnline.onPointerUpObservable.add(function() {
            if (!Game._finishedScene) {
                Game.generateApartment();
                Game._finishedScene = true;
                Game.initPlayer();
                Game.player.entity.setName(nameInput.text);
                GameGUI.setPlayerPortrait(Game.player);
            }
            if (!Client.isOnline()) {
                Client.connect();
            }
            GameGUI.hideMenu();
            GameGUI.showHUD();
        });
        submitOffline.onPointerUpObservable.add(function() {
            if (!Game._finishedScene) {
                Game._finishedScene = true;
                Game.generateApartment();
                Game.initPlayer();
                Game.player.entity.setName(nameInput.text);
                GameGUI.setPlayerPortrait(Game.player);
            }
            if (Client.isOnline()) {
                Client.disconnect();
            }
            GameGUI.hideMenu();
            GameGUI.showHUD();
        });

        characterChoiceMenuContainer.addControl(nameContainer);
            nameContainer.addControl(nameLabel);
            nameContainer.addControl(nameInput);
        characterChoiceMenuContainer.addControl(ageContainer);
            ageContainer.addControl(ageLabel);
            ageContainer.addControl(ageInput);
        characterChoiceMenuContainer.addControl(speciesContainer);
            speciesContainer.addControl(speciesLabel);
            speciesContainer.addControl(speciesOptions);
                speciesOptions.addControl(speciesFox);
                speciesOptions.addControl(speciesSkeleton);
        characterChoiceMenuContainer.addControl(genderContainer);
            genderContainer.addControl(genderLabel);
            genderContainer.addControl(genderOptions);
                genderOptions.addControl(genderMale);
                genderOptions.addControl(genderFemale);
                genderOptions.addControl(genderNone);
        characterChoiceMenuContainer.addControl(buttonKBLayoutContainer);
            buttonKBLayoutContainer.addControl(buttonKBLayoutLabel);
            buttonKBLayoutContainer.addControl(buttonKBLayoutOptions);
                buttonKBLayoutOptions.addControl(buttonKBLayoutQwerty);
                buttonKBLayoutOptions.addControl(buttonKBLayoutDvorak);
                buttonKBLayoutOptions.addControl(buttonKBLayoutAzerty);
        characterChoiceMenuContainer.addControl(submitContainer);
            submitContainer.addControl(submitOffline);
            submitContainer.addControl(submitOnline);
        characterChoiceMenuContainer.isVisible = false;
        return characterChoiceMenuContainer;
    }
    static showCharacterChoiceMenu() {
        GameGUI.showMenu(true);
        GameGUI._hideMenuChildren();
        GameGUI._characterChoiceMenu.isVisible = true;
    }
    static hideCharacterChoiceMenu() {
        GameGUI._characterChoiceMenu.isVisible = false;
    }
    static _generatePlayerPortrait() {
        var portrait = new BABYLON.GUI.Rectangle("playerPortrait");
        portrait.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        portrait.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        portrait.height = 0.12;
        portrait.width = 0.24;
        portrait.top = 0;
        portrait.left = 0;
        portrait.thickness = 0;
            var portraitBackground = new BABYLON.GUI.Rectangle("portraitBackground");
            portraitBackground.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            portraitBackground.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            portraitBackground.height = 1;
            portraitBackground.width = 1;
            portraitBackground.top = 0;
            portraitBackground.left = 0;
            portraitBackground.thickness = 0;
            portraitBackground.background = "black";
            portraitBackground.alpha = 0.5;
            var portraitAvatarContainer = new BABYLON.GUI.Rectangle();
            portraitAvatarContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            portraitAvatarContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            portraitAvatarContainer.height = 1.0;
            portraitAvatarContainer.width = 0.33;
            portraitAvatarContainer.top = 0;
            portraitAvatarContainer.left = 0;
            portraitAvatarContainer.thickness = 0;
                var portraitAvatar = new BABYLON.GUI.Image("portraitAvatar", "resources/images/icons/characters/genericCharacter.svg");
                portraitAvatar.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
            var portraitStats = new BABYLON.GUI.StackPanel("portraitStats");
            portraitStats.isVertical = true;
            portraitStats.height = 1.0;
            portraitStats.width = 0.76;
            portraitStats.top = 0;
            portraitStats.left = "21%";
                var portraitName = new BABYLON.GUI.TextBlock("playerName");
                portraitName.text = "Your Name Here";
                portraitName.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                portraitName.height = 0.25;
                portraitName.width = 1.0;
                portraitName.color = "white";
                var portraitStatsLifeContainer = new BABYLON.GUI.Rectangle("portraitStatsLifeContainer");
                portraitStatsLifeContainer.height = 0.25;
                portraitStatsLifeContainer.width = 0.85;
                portraitStatsLifeContainer.thickness = 0;
                    var portraitStatsLifeText = new BABYLON.GUI.TextBlock("portraitStatsLifeText");
                    portraitStatsLifeText.text = "";
                    portraitStatsLifeText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                    portraitStatsLifeText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                    portraitStatsLifeText.color = "white";
                    var portraitStatsLifeSlider = new BABYLON.GUI.Slider("portraitStatsLife");
                    portraitStatsLifeSlider.minimum = 0;
                    portraitStatsLifeSlider.maximum = 100;
                    portraitStatsLifeSlider.isVertical = false;
                    portraitStatsLifeSlider.displayThumb = false;
                    portraitStatsLifeSlider.left = "16px";
                    portraitStatsLifeSlider.height = 1.25;
                    portraitStatsLifeSlider.thumbWidth = 0;
                    portraitStatsLifeSlider.isEnabled = false;
                    portraitStatsLifeSlider.color = "red";
                var portraitStatsManaContainer = new BABYLON.GUI.Rectangle("portraitStatsManaContainer");
                portraitStatsManaContainer.height = 0.25;
                portraitStatsManaContainer.width = 0.85;
                portraitStatsManaContainer.thickness = 0;
                    var portraitStatsManaText = new BABYLON.GUI.TextBlock("portraitStatsManaText");
                    portraitStatsManaText.text = "";
                    portraitStatsManaText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                    portraitStatsManaText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                    portraitStatsManaText.color = "white";
                    var portraitStatsManaSlider = new BABYLON.GUI.Slider("portraitStatsManaSlider");
                    portraitStatsManaSlider.minimum = 0;
                    portraitStatsManaSlider.maximum = 100;
                    portraitStatsManaSlider.isVertical = false;
                    portraitStatsManaSlider.displayThumb = false;
                    portraitStatsManaSlider.left = "16px";
                    portraitStatsManaSlider.height = 1.25;
                    portraitStatsManaSlider.thumbWidth = 0;
                    portraitStatsManaSlider.isEnabled = false;
                    portraitStatsManaSlider.color = "blue";
                var portraitStatsStaminaContainer = new BABYLON.GUI.Rectangle("portraitStatsStaminaContainer");
                portraitStatsStaminaContainer.height = 0.25;
                portraitStatsStaminaContainer.width = 0.85;
                portraitStatsStaminaContainer.thickness = 0;
                    var portraitStatsStaminaText = new BABYLON.GUI.TextBlock("portraitStatsStaminaText");
                    portraitStatsStaminaText.text = "";
                    portraitStatsStaminaText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                    portraitStatsStaminaText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                    portraitStatsStaminaText.color = "white";
                    var portraitStatsStaminaSlider = new BABYLON.GUI.Slider("portraitStatsStaminaSlider");
                    portraitStatsStaminaSlider.minimum = 0;
                    portraitStatsStaminaSlider.maximum = 100;
                    portraitStatsStaminaSlider.isVertical = false;
                    portraitStatsStaminaSlider.displayThumb = false;
                    portraitStatsStaminaSlider.left = "16px";
                    portraitStatsStaminaSlider.height = 1.25;
                    portraitStatsStaminaSlider.thumbWidth = 0;
                    portraitStatsStaminaSlider.isEnabled = false;
                    portraitStatsStaminaSlider.color = "green";
        portrait.addControl(portraitBackground);
        portrait.addControl(portraitAvatarContainer);
        portraitAvatarContainer.addControl(portraitAvatar);
        portrait.addControl(portraitStats);
        portraitStats.addControl(portraitName);
        portraitStatsLifeContainer.addControl(portraitStatsLifeSlider);
        portraitStatsLifeContainer.addControl(portraitStatsLifeText);
        portraitStats.addControl(portraitStatsLifeContainer);
        portraitStatsManaContainer.addControl(portraitStatsManaSlider);
        portraitStatsManaContainer.addControl(portraitStatsManaText);
        portraitStats.addControl(portraitStatsManaContainer);
        portraitStatsStaminaContainer.addControl(portraitStatsStaminaSlider);
        portraitStatsStaminaContainer.addControl(portraitStatsStaminaText);
        portraitStats.addControl(portraitStatsStaminaContainer);
        return portrait;
    }
    static _generateTargetPortrait() {
        var portrait = new BABYLON.GUI.Rectangle("targetPortrait");
        portrait.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        portrait.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        portrait.height = 0.12;
        portrait.width = 0.24;
        portrait.top = 0;
        portrait.left = "26%";
        portrait.thickness = 0;
        portrait.isVisible = false;
            var portraitBackground = new BABYLON.GUI.Rectangle("portraitBackground");
            portraitBackground.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            portraitBackground.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            portraitBackground.height = 1;
            portraitBackground.width = 1;
            portraitBackground.top = 0;
            portraitBackground.left = 0;
            portraitBackground.thickness = 0;
            portraitBackground.background = "black";
            portraitBackground.alpha = 0.5;
            var portraitAvatarContainer = new BABYLON.GUI.Rectangle();
            portraitAvatarContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            portraitAvatarContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            portraitAvatarContainer.height = 1.0;
            portraitAvatarContainer.width = 0.33;
            portraitAvatarContainer.top = 0;
            portraitAvatarContainer.left = 0;
            portraitAvatarContainer.thickness = 0;
                var portraitAvatar = new BABYLON.GUI.Image("portraitAvatar", "resources/images/icons/characters/genericCharacter.svg");
                portraitAvatar.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
            var portraitStats = new BABYLON.GUI.StackPanel("portraitStats");
            portraitStats.isVertical = true;
            portraitStats.height = 1.0;
            portraitStats.width = 0.76;
            portraitStats.top = 0;
            portraitStats.left = "-21%";
                var portraitName = new BABYLON.GUI.TextBlock("portraitName");
                portraitName.text = "Your Name Here";
                portraitName.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                portraitName.height = 0.25;
                portraitName.width = 0.85;
                portraitName.color = "white";
                var portraitStatsLifeContainer = new BABYLON.GUI.Rectangle("portraitStatsLifeContainer");
                portraitStatsLifeContainer.height = 0.25;
                portraitStatsLifeContainer.width = 0.85;
                portraitStatsLifeContainer.thickness = 0;
                    var portraitStatsLifeText = new BABYLON.GUI.TextBlock("portraitStatsLifeText");
                    portraitStatsLifeText.text = "";
                    portraitStatsLifeText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                    portraitStatsLifeText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                    portraitStatsLifeText.color = "white";
                    var portraitStatsLifeSlider = new BABYLON.GUI.Slider("portraitStatsLife");
                    portraitStatsLifeSlider.minimum = 0;
                    portraitStatsLifeSlider.maximum = 100;
                    portraitStatsLifeSlider.isVertical = false;
                    portraitStatsLifeSlider.displayThumb = false;
                    portraitStatsLifeSlider.left = "16px";
                    portraitStatsLifeSlider.height = 1.25;
                    portraitStatsLifeSlider.thumbWidth = 0;
                    portraitStatsLifeSlider.isEnabled = false;
                    portraitStatsLifeSlider.scaleX = -1;
                    portraitStatsLifeSlider.color = "red";
                var portraitStatsManaContainer = new BABYLON.GUI.Rectangle("portraitStatsManaContainer");
                portraitStatsManaContainer.height = 0.25;
                portraitStatsManaContainer.width = 0.85;
                portraitStatsManaContainer.thickness = 0;
                    var portraitStatsManaText = new BABYLON.GUI.TextBlock("portraitStatsManaText");
                    portraitStatsManaText.text = "";
                    portraitStatsManaText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                    portraitStatsManaText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                    portraitStatsManaText.color = "white";
                    var portraitStatsManaSlider = new BABYLON.GUI.Slider("portraitStatsManaSlider");
                    portraitStatsManaSlider.minimum = 0;
                    portraitStatsManaSlider.maximum = 100;
                    portraitStatsManaSlider.isVertical = false;
                    portraitStatsManaSlider.displayThumb = false;
                    portraitStatsManaSlider.left = "16px";
                    portraitStatsManaSlider.height = 1.25;
                    portraitStatsManaSlider.thumbWidth = 0;
                    portraitStatsManaSlider.isEnabled = false;
                    portraitStatsManaSlider.scaleX = -1;
                    portraitStatsManaSlider.color = "blue";
                var portraitStatsStaminaContainer = new BABYLON.GUI.Rectangle("portraitStatsStaminaContainer");
                portraitStatsStaminaContainer.height = 0.25;
                portraitStatsStaminaContainer.width = 0.85;
                portraitStatsStaminaContainer.thickness = 0;
                    var portraitStatsStaminaText = new BABYLON.GUI.TextBlock("portraitStatsStaminaText");
                    portraitStatsStaminaText.text = "";
                    portraitStatsStaminaText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                    portraitStatsStaminaText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                    portraitStatsStaminaText.color = "white";
                    var portraitStatsStaminaSlider = new BABYLON.GUI.Slider("portraitStatsStaminaSlider");
                    portraitStatsStaminaSlider.minimum = 0;
                    portraitStatsStaminaSlider.maximum = 100;
                    portraitStatsStaminaSlider.isVertical = false;
                    portraitStatsStaminaSlider.displayThumb = false;
                    portraitStatsStaminaSlider.left = "16px";
                    portraitStatsStaminaSlider.height = 1.25;
                    portraitStatsStaminaSlider.thumbWidth = 0;
                    portraitStatsStaminaSlider.isEnabled = false;
                    portraitStatsStaminaSlider.scaleX = -1;
                    portraitStatsStaminaSlider.color = "green";
        portrait.addControl(portraitBackground);
        portrait.addControl(portraitStats);
        portrait.addControl(portraitAvatarContainer);
        portraitAvatarContainer.addControl(portraitAvatar);
        portraitStats.addControl(portraitName);
        portraitStatsLifeContainer.addControl(portraitStatsLifeSlider);
        portraitStatsLifeContainer.addControl(portraitStatsLifeText);
        portraitStats.addControl(portraitStatsLifeContainer);
        portraitStatsManaContainer.addControl(portraitStatsManaSlider);
        portraitStatsManaContainer.addControl(portraitStatsManaText);
        portraitStats.addControl(portraitStatsManaContainer);
        portraitStatsStaminaContainer.addControl(portraitStatsStaminaSlider);
        portraitStatsStaminaContainer.addControl(portraitStatsStaminaText);
        portraitStats.addControl(portraitStatsStaminaContainer);
        return portrait;
    }
    static showPlayerPortrait() {
        GameGUI._playerPortrait.isVisible = true;
    }
    static hidePlayerPortrait() {
        GameGUI._playerPortrait.isVisible = false;
    }
    static showTargetPortrait() {
        GameGUI._targetPortrait.isVisible = true;
    }
    static hideTargetPortrait() {
        GameGUI._targetPortrait.isVisible = false;
    }
    static setPlayerPortrait(_entity = Game.player.getEntity()) {
        if (!_entity.isEnabled()) {
            return undefined;
        }
        if (_entity instanceof EntityController) {
            _entity = _entity.getEntity();
        }
        else if (!(_entity instanceof AbstractEntity)) {
            return undefined;
        }
        GameGUI._setPlayerPortraitLifeSlider(_entity.getLife()/_entity.getLifeMax()*100);
        GameGUI._setPlayerPortraitLifeText(_entity.getLife() + "/" + _entity.getLifeMax());
        if (_entity.getManaMax() == 0) {
            GameGUI._hidePlayerPortraitMana();
        }
        else {
            GameGUI._showPlayerPortraitMana();
            GameGUI._setPlayerPortraitManaSlider(_entity.getMana()/_entity.getManaMax()*100);
            GameGUI._setPlayerPortraitManaText(_entity.getMana() + "/" + _entity.getManaMax());
        }
        GameGUI._setPlayerPortraitStaminaSlider(_entity.getStamina()/_entity.getStaminaMax()*100);
        GameGUI._setPlayerPortraitStaminaText(_entity.getStamina() + "/" + _entity.getStaminaMax());
        GameGUI._setPlayerPortraitImage(_entity.getImage());
        GameGUI._setPlayerPortraitName(_entity.getName());
    }
    static setTargetPortrait(_entity) {
        if (!_entity.isEnabled()) {
            return undefined;
        }
        if (_entity instanceof EntityController) {
            _entity = _entity.getEntity();
        }
        else if (!(_entity instanceof AbstractEntity)) {
            return undefined;
        }
        if (_entity instanceof CharacterEntity) {
            GameGUI._setTargetPortraitLifeSlider(_entity.getLife()/_entity.getLifeMax()*100);
            GameGUI._setTargetPortraitLifeText(_entity.getLife() + "/" + _entity.getLifeMax());
            if (_entity.getManaMax() == 0) {
                GameGUI._hideTargetPortraitMana();
            }
            else {
                GameGUI._showTargetPortraitMana();
                GameGUI._setTargetPortraitManaSlider(_entity.getMana()/_entity.getManaMax()*100);
                GameGUI._setTargetPortraitManaText(_entity.getMana() + "/" + _entity.getManaMax());
            }
            GameGUI._setTargetPortraitStaminaSlider(_entity.getStamina()/_entity.getStaminaMax()*100);
            GameGUI._setTargetPortraitStaminaText(_entity.getStamina() + "/" + _entity.getStaminaMax());
            GameGUI._showTargetPortraitLife();
            GameGUI._showTargetPortraitStamina();
        }
        else {
            GameGUI._hideTargetPortraitLife();
            GameGUI._hideTargetPortraitMana();
            GameGUI._hideTargetPortraitStamina();
        }
        GameGUI._setTargetPortraitImage(_entity.getImage());
        GameGUI._setTargetPortraitName(_entity.getName());
    }
    static _setPlayerPortraitImage(_image = "genericCharacter") {
        GameGUI._playerPortrait.children[1].children[0].domImage.setAttribute("src", Game.getIcon(_image));
    }
    static _setPlayerPortraitName(_string) {
        GameGUI._playerPortrait.children[2].children[0].text = _string;
    }
    static _setPlayerPortraitLifeSlider(_int = 100) {
        GameGUI._playerPortrait.children[2].children[1].children[0].value = _int;
    }
    static _setPlayerPortraitLifeText(_text = "") {
        GameGUI._playerPortrait.children[2].children[1].children[1].text = _text;
    }
    static _setPlayerPortraitStaminaSlider(_int = 100) {
        GameGUI._playerPortrait.children[2].children[3].children[0].value = _int;
    }
    static _setPlayerPortraitStaminaText(_text = "") {
        GameGUI._playerPortrait.children[2].children[3].children[1].text = _text;
    }
    static _showPlayerPortraitMana() {
        GameGUI._playerPortrait.children[2].children[2].isVisible = true;
        GameGUI._playerPortrait.children[2].children[2].isEnabled = true;
    }
    static _hidePlayerPortraitMana() {
        GameGUI._playerPortrait.children[2].children[2].isVisible = false;
        GameGUI._playerPortrait.children[2].children[2].isEnabled = false;
    }
    static _setPlayerPortraitManaSlider(_int = 100) {
        GameGUI._playerPortrait.children[2].children[2].children[0].value = _int;
    }
    static _setPlayerPortraitManaText(_text = "") {
        GameGUI._playerPortrait.children[2].children[2].children[1].text = _text;
    }
    static _setTargetPortraitImage(_image = "genericItem") {
        GameGUI._targetPortrait.children[2].children[0].domImage.setAttribute("src", Game.getIcon(_image));
    }
    static _setTargetPortraitName(_string) {
        GameGUI._targetPortrait.children[1].children[0].text = _string;
    }
    static _showTargetPortraitLife() {
        GameGUI._targetPortrait.children[1].children[1].isVisible = true;
    }
    static _hideTargetPortraitLife() {
        GameGUI._targetPortrait.children[1].children[1].isVisible = false;
    }
    static _setTargetPortraitLifeSlider(_int = 100) {
        GameGUI._targetPortrait.children[1].children[1].children[0].value = _int;
    }
    static _setTargetPortraitLifeText(_text = "") {
        GameGUI._targetPortrait.children[1].children[1].children[1].text = _text;
    }
    static _showTargetPortraitStamina() {
        GameGUI._targetPortrait.children[1].children[3].isVisible = true;
    }
    static _hideTargetPortraitStamina() {
        GameGUI._targetPortrait.children[1].children[3].isVisible = false;
    }
    static _setTargetPortraitStaminaSlider(_int = 100) {
        GameGUI._targetPortrait.children[1].children[3].children[0].value = _int;
    }
    static _setTargetPortraitStaminaText(_text = "") {
        GameGUI._targetPortrait.children[1].children[3].children[1].text = _text;
    }
    static _showTargetPortraitMana() {
        GameGUI._targetPortrait.children[1].children[2].isVisible = true;
    }
    static _hideTargetPortraitMana() {
        GameGUI._targetPortrait.children[1].children[2].isVisible = false;
    }
    static _setTargetPortraitManaSlider(_int = 100) {
        GameGUI._targetPortrait.children[1].children[2].children[0].value = _int;
    }
    static _setTargetPortraitManaText(_text = "") {
        GameGUI._targetPortrait.children[1].children[2].children[1].text = _text;
    }
    static chatInputClear() {
        GameGUI.getChatInput().text = "";
    }
    static chatOutputClear() {
        GameGUI.getChatOutput().text = "";
    }
    static chatOutputAppend(_string) {
        GameGUI.getChatOutput().text += _string + "\n";
    }
    static chatOutputSet(_string) {
        GameGUI._chatOutputClear();
        GameGUI._chatOutputAppend(_string);
    }
    static _generateInventoryMenu() {
        var inventory = new BABYLON.GUI.Rectangle("inventory");
            inventory.height = 1.0;
            inventory.width = 0.6;
            inventory.background = "black";
        var items = new BABYLON.GUI.StackPanel("items");
            items.height = 1.0;
            items.width = 0.475;
            items.left = 0;
            items.horizontalAlignment = BABYLON.GUI.HORIZONTAL_ALIGNMENT_LEFT;
            inventory.addControl(items);
        var scrollbar = new BABYLON.GUI.Rectangle("slider");
            scrollbar.isVertical = true;
            scrollbar.height = 1.0;
            scrollbar.width = 0.025;
            scrollbar.left = "47.5%";
            scrollbar.horizontalAlignment = BABYLON.GUI.HORIZONTAL_ALIGNMENT_LEFT;
            inventory.addControl(scrollbar);
        var summary = new BABYLON.GUI.Rectangle("summary");
            summary.height = 0.6;
            summary.width = 0.5;
            summary.top = "-20%";
            summary.left = "25%";
            summary.isVertical = true;
            inventory.addControl(summary);
            var selectedName = new BABYLON.GUI.TextBlock("selectedName");
                selectedName.width = 1.0;
                selectedName.height = 0.1;
                selectedName.top = "-45%";
                selectedName.left = 0;
                selectedName.color = "white";
                summary.addControl(selectedName);
            var selectedImage = new BABYLON.GUI.Image("selectedImage", "resources/images/blank.svg");
                selectedImage.width = 1.0;
                selectedImage.height = 0.4;
                selectedImage.top = "-20%";
                selectedImage.left = 0;
                selectedImage.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
                summary.addControl(selectedImage);
            var selectedDescription = new BABYLON.GUI.TextBlock("selectedDescription");
                selectedDescription.width = 1.0;
                selectedDescription.height = 0.3;
                selectedDescription.top = "5%";
                selectedDescription.left = 0;
                selectedDescription.paddingLeft = 0.1;
                selectedDescription.paddingRight = 0.1;
                selectedDescription.textWrapping = true;
                selectedDescription.color = "white";
                summary.addControl(selectedDescription);
            var selectedDetails = new BABYLON.GUI.TextBlock("selectedDetails");
                selectedDetails.width = 1.0;
                selectedDetails.height = 0.2;
                selectedDetails.top = "45%";
                selectedDetails.left = 0;
                selectedDetails.color = "white";
                summary.addControl(selectedDetails);
        var actions = new BABYLON.GUI.Rectangle("actions");
            actions.height = 0.4;
            actions.width = 0.5;
            actions.top = "30%";
            actions.left = "25%";
            inventory.addControl(actions);
        inventory.isVisible = false;
        return inventory;
    }
    /**
     * Shows the player's inventory menu.
     */
    static showPlayerInventory() {
        GameGUI._hideMenuChildren();
        GameGUI._setPlayerInventory();
        GameGUI._inventoryMenu.isVisible = true;
        GameGUI.showMenu(true);
    }
    static showTargetInventory() {
        
    }
    /**
     * Hides the inventory menu.
     */
    static hideInventory() {
        GameGUI._inventoryMenu.isVisible = false;
    }
    /**
     * Returns whether or not the inventory menu is visible.
     * @return {Boolean} Whether or not the inventory menu is visible.
     */
    static getInventoryVisible() {
        return GameGUI._inventoryMenu.isVisible;
    }
    static setInventoryVisible(_boolean) {
        if (_boolean === true) {
            GameGUI._inventoryMenu.isVisible = true;
        }
        else {
            GameGUI._inventoryMenu.isVisible = false;
        }
    }
    /**
     * Sets the inventory menu's content using an entity's inventory.
     * @param {Entity} _entity The Entity with the inventory.
     */
    static _setPlayerInventory(_entity = Game.player.getEntity()) {
        var _inventory = GameGUI._inventoryMenu.getChildByName("items").children;
        for (var _i = _inventory.length - 1; _i > -1; _i--) {
            GameGUI._inventoryMenu.getChildByName("items").removeControl(_inventory[_i]);
        }
        _entity.items.forEach(function(_instancedItemEntity) {
            var _button = GameGUI._generateButton(undefined, _instancedItemEntity.getName(), undefined, Game.getIcon(_instancedItemEntity.getImage()));
                _button.width = 1.0;
                _button.height = 0.1;
            _button.onPointerUpObservable.add(function() {
                GameGUI._setInventorySelectedItem(_instancedItemEntity.getID(), _entity);
            });
            GameGUI._inventoryMenu.getChildByName("items").addControl(_button);
        });
        GameGUI._clearInventorySelectedItem();
    }
    /**
     * Sets the inventory menu's selected item section.
     * @param {InstancedItemEntity} _instancedItemEntity [description]
     * @param {Entity} _targetEntity        The Entity storing the InstancedItemEntity
     * @param {Entity} _playerEntity        The Entity viewing the item; the player.
     */
    static _setInventorySelectedItem(_instancedItemEntity, _targetEntity = undefined, _playerEntity = Game.player.getEntity()) {
        _instancedItemEntity = Game.getInstancedItemEntity(_instancedItemEntity);
        if (_instancedItemEntity == undefined) {GameGUI._clearInventorySelectedItem; return;}
        _targetEntity = Game.getEntity(_targetEntity);
        _playerEntity = Game.getEntity(_playerEntity);
        if (_playerEntity == undefined) {_playerEntity = Game.player.getEntity();}

        var _summary = GameGUI._inventoryMenu.getChildByName("summary");
        _summary.getChildByName("selectedName").text = _instancedItemEntity.getName();
        _summary.getChildByName("selectedImage").source = Game.getIcon(_instancedItemEntity.getImage());
        _summary.getChildByName("selectedDescription").text = _instancedItemEntity.getDescription();
        var _massString = undefined;
        if (_instancedItemEntity.getMass() < 1) {
            _massString = String(_instancedItemEntity.getMass() * 1000) + "g";
        }
        else {
            _massString = String(_instancedItemEntity.getMass()) + "kg";
        }
        _summary.getChildByName("selectedDetails").text = `Price: $${_instancedItemEntity.getPrice()}, Weight: ${_massString}`;
        var _actions = GameGUI._inventoryMenu.getChildByName("actions");
        for (var _i = _actions.children.length - 1; _i > -1; _i--) {
            _actions.removeControl(_actions.children[_i]);
        }
        for (var _action in _instancedItemEntity.getAvailableActions()) {
            var _actionButton = undefined;
            switch (_action) {
                case "drop" : {
                    _actionButton = GameGUI._generateButton(undefined, "Drop");
                    _actionButton.onPointerUpObservable.add(function() {Game.actionDropFunction(_instancedItemEntity, _playerEntity.getController(), GameGUI._setPlayerInventory);});
                    break;
                }
                case "hold" : {
                    if (Game.player.getEntity().hasEquippedEntity(_instancedItemEntity)) {
                        _actionButton = GameGUI._generateButton(undefined, "Release");
                        _actionButton.onPointerUpObservable.add(function() {Game.actionReleaseFunction(_instancedItemEntity, _playerEntity.getController(), GameGUI._setInventorySelectedItem);});
                    }
                    else {
                        _actionButton = GameGUI._generateButton(undefined, "Hold");
                        _actionButton.onPointerUpObservable.add(function() {Game.actionHoldFunction(_instancedItemEntity, _playerEntity.getController(), GameGUI._setInventorySelectedItem);});
                    }
                    break;
                }
                case "look" : {
                    _actionButton = GameGUI._generateButton(undefined, "Look");
                    break;
                }
                case "put" : {
                    if (_playerEntity != Game.player.getEntity()) {
                        break;
                    }
                    else if (_targetEntity instanceof EntityWithStorage) {
                        _actionButton = GameGUI._generateButton(undefined, "Put");
                    }
                    break;
                }
                case "take" : {
                    if (_playerEntity == Game.player.getEntity()) {}
                    else {
                        _actionButton = GameGUI._generateButton(undefined, "Take");
                    }
                    break;
                }
            }
            if (_actionButton != undefined) {
                _actions.addControl(_actionButton);
                _actionButton.top = ((_actions.children.length * 10) - 55) + "%";
            }
        }
    }
    /**
     * Clears the inventory menu's selected item section.
     */
    static _clearInventorySelectedItem() {
        var _summary = GameGUI._inventoryMenu.getChildByName("summary");
        _summary.getChildByName("selectedName").text = "";
        _summary.getChildByName("selectedImage").source = "";
        _summary.getChildByName("selectedDescription").text = "";
        var _actions = GameGUI._inventoryMenu.getChildByName("actions");
        for (var _i = _actions.children.length - 1; _i > -1; _i--) {
            _actions.removeControl(_actions.children[_i]);
        }
    }
    static _generateButton(_id = undefined, _title = undefined, _subTitle = undefined, _image = undefined) {
        var _button = new BABYLON.GUI.Button(_id);
            _button.width = 1.0;
            _button.height = 0.1;
        var _buttonImage = new BABYLON.GUI.Image("", _image);
            _buttonImage.width = 0.2;
            _buttonImage.height = 1.0;
            _buttonImage.left = "-40%";
            _buttonImage.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
            _button.addControl(_buttonImage);
        var _buttonText = new BABYLON.GUI.TextBlock();
            _buttonText.width = 0.8;
            _buttonText.height = 1.0;
            _buttonText.top = "5%";
            _buttonText.left = "10%";
            _buttonText.text = _title;
            _buttonText.color = "white";
            _button.addControl(_buttonText);
        return _button;
    }
    static _setTargetInventory(_entity) {
    }
    static _generateTargetActionTooltip() {
        if (Game.debugEnabled) console.log("Running GameGUI::_generateTargetActionTooltip");
        var tooltip = new BABYLON.GUI.Rectangle("targetActionTooltip");
            tooltip.width = 0.125;
            tooltip.height = 0.075;
            tooltip.top = "3.75%";
            tooltip.left = "6.25%";
            tooltip.background = "black";
            tooltip.alpha = 0.5;
            tooltip.isVertical = false;
        var keyName = new BABYLON.GUI.TextBlock();
            keyName.text = "E";
            keyName.top = 0;
            keyName.left = "10%";
            keyName.textHorizontalAlignment = BABYLON.GUI.HORIZONTAL_ALIGNMENT_LEFT;
            keyName.color = "white";
        var actionPanelActionName = new BABYLON.GUI.TextBlock();
            actionPanelActionName.text = "";
            actionPanelActionName.height = 0.5;
            //actionPanelActionName.top = "-25%";
            actionPanelActionName.left = "25%";
            actionPanelActionName.color = "white";
        var actionPanelTargetName = new BABYLON.GUI.TextBlock();
            actionPanelTargetName.text = "";
            actionPanelTargetName.height = 0.5;
            actionPanelTargetName.top = "25%";
            actionPanelTargetName.left = "25%";
            actionPanelTargetName.color = "white";
        tooltip.addControl(keyName);
        tooltip.addControl(actionPanelActionName);
        tooltip.addControl(actionPanelTargetName);
        tooltip.isVisible = false;
        return tooltip;
    }
    /**
     * Sets the action tooltip's letter corresponding to Game.useTargetedEntityCode.
     * @param {string} _string Top left character.
     */
    static setActionTooltipLetter(_string = String.fromCharCode(Game.useTargetedEntityCode)) {
        GameGUI._actionTooltip.children[0].text = _string;
    }
    /**
     * Sets the action tooltip's top right text.
     * @param {String} _string Top right text.
     */
    static setActionTooltipAction(_string = "Use") {
        if (Game.debugEnabled) console.log("Running GameGUI::setActionTooltipAction");
        if (typeof _string != "string") {
            _string = "Use";
        }
        else {
            _string = _string.capitalize();
        }
        GameGUI._actionTooltip.children[1].text = _string;
    }
    /**
     * Sets the action tooltip's bottom text. Not used, I think. :D
     * @param {String} _string Bottom text.
     */
    static setActionTooltipTarget(_string = "") {
        if (typeof _string != "string") {
            _string = "";
        }
        if (Game.debugEnabled) console.log("Running GameGUI::setActionTooltipTarget");
        GameGUI._actionTooltip.children[2].text = _string;
    }
    /**
     * Sets the action tooltip's top right and bottom text.
     * @param {String} _action Top right text.
     * @param {String} _target Bottom text.
     */
    static setActionTooltip(_action, _target = "") {
        GameGUI.setActionTooltipAction(_action);
        GameGUI.setActionTooltipTarget(_target);
    }
    /**
     * Show the action tooltip.
     */
    static showActionTooltip() {
        GameGUI._actionTooltip.isVisible = true;
    }
    /**
     * Hide the action tooltip.
     */
    static hideActionTooltip() {
        GameGUI._actionTooltip.isVisible = false;
    }
    static _generateTargetAvailableActionsRadialMenu() {
        return;
    }
    static _generateTargetAvailableActionsMenu() {
        return;
    }
    static setChatInputFocused(_boolean) {
        if (_boolean === true) {
            GameGUI._hud.moveFocusToControl(GameGUI._chat.children[1]);
        }
        else {
            GameGUI._chat.children[1]._isFocused = false;
        }
    }
    static getChatInputFocused() {
        return GameGUI._chat.children[1]._isFocused;
    }
    static _generateDialogueMenu() {
        /*
            [Image        Name          X]
            [----------------------------]
            [Dialogue                    ]
            [spacing                     ]
            [----------------------------]
            [Options                     ]
         */
        var _container = new BABYLON.GUI.Rectangle("dialogueContainer");
            _container.alpha = GameGUI.alpha;
            _container.width = 0.5;
            _container.height = 0.4;
            _container.background = GameGUI.background;
            _container.thickness = 0;
            _container.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        var _titleBar = new BABYLON.GUI.Rectangle("dialogueTitleBar");
            _titleBar.width = 1.0;
            _titleBar.height = 0.1;
            _titleBar.thickness = 0;
            _titleBar.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            _titleBar.background = "green";
        var _title = new BABYLON.GUI.TextBlock("dialogueTitle");
            _title.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            _title.text = "Title :V";
        var _closeButton = new BABYLON.GUI.Button.CreateSimpleButton("close", "X");
            _closeButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            _closeButton.width = 0.05;
        var _bodyContainer = new BABYLON.GUI.Rectangle("dialogueBodyContainer"); // TODO: Replace with ScrollViewer when it becomes available
            _bodyContainer.width = 1.0;
            _bodyContainer.height = 0.6;
            _bodyContainer.thickness = 0;
            _bodyContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
            _bodyContainer.top = "-10%";
            _bodyContainer.background = "blue";
        var _body = new BABYLON.GUI.TextBlock("dialogueBody");
            _body.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            _body.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            _body.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            _body.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            _body.textWrapping = BABYLON.GUI.TextWrapping.WordWrap;
            _body.resizeToFit = true;
            _body.width = 1.0;
            _body.height = 1.0;
            _body.paddingTop = "8px";
            _body.paddingRight = "8px";
            _body.paddingBottom = "8px";
            _body.paddingLeft = "8px";
            _body.text = "\"Who draw dis? :v\"";
        var _optionsContainer = new BABYLON.GUI.StackPanel("dialogueOptionsContainer");
            _optionsContainer.isVertical = false;
            _optionsContainer.width = 1.0;
            _optionsContainer.height = 0.3;
            _optionsContainer.thickness = 0;
            _optionsContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            _optionsContainer.background = "red";
        var _optionsColA = new BABYLON.GUI.StackPanel();
            _optionsColA.isVertical = true;
            _optionsColA.width = 0.33;
            _optionsColA.height = 1.0;
            _optionsColA.background = "orange";
        var _optionsColB = new BABYLON.GUI.StackPanel();
            _optionsColB.isVertical = true;
            _optionsColB.width = 0.341;
            _optionsColB.height = 1.0;
            _optionsColB.background = "yellow";
        var _optionsColC = new BABYLON.GUI.StackPanel();
            _optionsColC.isVertical = true;
            _optionsColC.width = 0.33;
            _optionsColC.height = 1.0;
            _optionsColC.background = "pink";
        
        _closeButton.onPointerUpObservable.add(function() {
            GameGUI.hideDialogueMenu();
        });
        
        _optionsContainer.addControl(_optionsColA);
        _optionsContainer.addControl(_optionsColB);
        _optionsContainer.addControl(_optionsColC);
        _titleBar.addControl(_title);
        _titleBar.addControl(_closeButton);
        _bodyContainer.addControl(_body);
        _container.addControl(_titleBar);
        _container.addControl(_bodyContainer);
        _container.addControl(_optionsContainer);
        _container.isVisible = false;
        GameGUI._dialogueOptionCount = 0;
        return _container;
    }
    static showDialogueMenu() {
        GameGUI._dialogueMenu.isVisible = true;
    }
    static hideDialogueMenu() {
        GameGUI._dialogueMenu.isVisible = false;
    }
    static setDialogue(_dialogue, _them, _you = Game.player.getEntity()) {
        GameGUI.clearDialogue();
        _dialogue = Game.getDialogue(_dialogue);
        _them = Game.getEntity(_them);
        _you = Game.getEntity(_you);
        GameGUI.setDialogueTitle(_dialogue.getTitle());
        var _text = _dialogue.getText()
        if (typeof _text == "function") {
            GameGUI.setDialogueBody(_text(_them, _you));
        }
        else {
            GameGUI.setDialogueBody(_text);
        }
        if (_dialogue.hasOptions()) {
            for (var _i = 0; _i < _dialogue.getOptions().length; _i++) {
                if (_dialogue.getOptions()[_i].getCondition()) {
                    GameGUI.addDialogueOption(_dialogue.getOptions()[_i], _them, _you, true);
                }
                else {
                    GameGUI.addDialogueOption(_dialogue.getOptions()[_i], _them, _you, false);
                }
            }
        }
    }
    static setDialogueTitle(_string) {
        GameGUI._dialogueMenu.children[0].children[0].text = _string;
    }
    static clearDialogueTitle() {
        GameGUI.setDialogueTitle("");
    }
    static setDialogueBody(_string) {
        GameGUI._dialogueMenu.children[1].children[0].text = _string;
    }
    static appendDialogueBody(_string) {
        GameGUI._dialogueMenu.children[1].children[0].text += _string;
    }
    static clearDialogueBody() {
        GameGUI.setDialogueBody("");
    }
    static addDialogueOption(_dialogueOption, _them, _you = Game.player.getEntity(), _isEnabled = true) {
        if (!(_dialogueOption instanceof DialogueOption)) {
            return undefined;
        }
        if (GameGUI._dialogueOptionCount > 7 || GameGUI._dialogueOptions.hasOwnProperty(_dialogueOption.getDialogue().getID())) {
            return false;
        }
        var _button = new BABYLON.GUI.Button.CreateSimpleButton(_dialogueOption.getDialogue().getID(), _dialogueOption.getTitle());
        _button.width = 1.0;
        _button.height = 0.33;
        _button.background = "purple";
        _button.onPointerUpObservable.add(function() {
            GameGUI.setDialogue(_dialogueOption.getDialogue().getID(), _them.getID(), _you.getID());
        });
        if (!_isEnabled) {
            _button.background = "gray";
        }
        GameGUI._dialogueOptionCount += 1;
        if (GameGUI._dialogueOptionCount > 5) {
            GameGUI._dialogueMenu.children[2].children[2].addControl(_button);
        }
        else if (GameGUI._dialogueOptionCount > 2) {
            GameGUI._dialogueMenu.children[2].children[1].addControl(_button);
        }
        else {
            GameGUI._dialogueMenu.children[2].children[0].addControl(_button);
        }
        GameGUI._dialogueOptions[_dialogueOption.getDialogue().getID()] = _dialogueOption;
        return true;
    }
    static removeDialogueOptions(_dialogueOption) {
        
        GameGUI._dialogueOptionCount -= 1;
    }
    static clearDialogueOptions() {
        if (GameGUI._dialogueOptionCount > 0) {
            var _subControl = undefined;
            for (var _i = 2; _i >= 0; _i--) {
                for (var _j = 2; _j >= 0; _j--) {
                    if (GameGUI._dialogueMenu.children[2].children[_i].children[_j] instanceof BABYLON.GUI.Button) {
                        _subControl = GameGUI._dialogueMenu.children[2].children[_i].children[_j];
                        GameGUI._dialogueMenu.children[2].children[_i].removeControl(_subControl);
                        _subControl.dispose();
                    }
                }
            }
            GameGUI._dialogueOptionCount = 0;
            GameGUI._dialogueOptions = {};
        }
    }
    static clearDialogue() {
        GameGUI.clearDialogueTitle();
        GameGUI.clearDialogueBody();
        GameGUI.clearDialogueOptions();
    }
}