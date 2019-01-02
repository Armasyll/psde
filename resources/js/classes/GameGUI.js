class GameGUI {
    constructor() {
        GameGUI.initialized = false;
    }
    static initialize() {
        GameGUI.menu = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("menu");
        GameGUI.menu.rootContainer.isVisible = false;
        GameGUI.hud = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("hud");
        GameGUI.hud.rootContainer.isVisible = false;

        GameGUI.crosshair = undefined;
        GameGUI.chat = undefined;
        GameGUI.playerPortrait = undefined;
        GameGUI.targetPortrait = undefined;
        GameGUI.actionTooltip = undefined;
        GameGUI.initHUD();

        GameGUI.characterChoiceMenu = undefined;
        GameGUI.inventoryMenu = undefined;
        GameGUI.initMenu();

        GameGUI._chatInputFocused = false;

        GameGUI.initialized = true;
    }
    static initHUD() {
        GameGUI.crosshair = GameGUI._generateCrosshair();
        GameGUI.chat = GameGUI._generateChat();
        GameGUI.playerPortrait = GameGUI._generatePlayerPortrait();
        GameGUI.targetPortrait = GameGUI._generateTargetPortrait();
        GameGUI.actionTooltip = GameGUI._generateTargetActionTooltip();
        GameGUI.hud.addControl(GameGUI.crosshair);
        GameGUI.hud.addControl(GameGUI.chat);
        GameGUI.hud.addControl(GameGUI.playerPortrait);
        GameGUI.hud.addControl(GameGUI.targetPortrait);
        GameGUI.hud.addControl(GameGUI.actionTooltip);
    }
    static initMenu() {
        GameGUI.characterChoiceMenu = GameGUI._generateCharacterChoiceMenu()
        GameGUI.inventoryMenu = GameGUI._generateInventoryMenu();
        GameGUI.menu.addControl(GameGUI.characterChoiceMenu);
        GameGUI.menu.addControl(GameGUI.inventoryMenu);
    }
    static resizeText() {
        if (!GameGUI.initialized) {
            return;
        }
        GameGUI.hud.rootContainer.fontSize = String(Math.floor(24 * (window.innerWidth / 1920))) + "px";
        GameGUI.menu.rootContainer.fontSize = GameGUI.hud.rootContainer.fontSize;
    }
    static showHUD(_updateChild = true) {
        if (Game.debugEnabled) console.log("Running GameGUI::showHUD");
        if (_updateChild === true) {
            GameGUI.hideMenu(false);
        }
        GameGUI.hud.rootContainer.isVisible = true;
        Game.pointerLock();
        window.addEventListener("click", function(_event) {
            if (GameGUI.hud.rootContainer.isVisible) {
                Game.pointerLock();
            }
        });
    }
    static hideHUD(_updateChild = false) {
        if (Game.debugEnabled) console.log("Running GameGUI::hideHUD");
        if (_updateChild === true) {
            GameGUI.showMenu(true);
        }
        GameGUI.hud.rootContainer.isVisible = false;
    }
    static hudVisible() {
        return GameGUI.hud.rootContainer.isVisible;
    }
    static showMenu(_updateChild = true) {
        if (Game.debugEnabled) console.log("Running GameGUI::showMenu");
        if (_updateChild === true) {
            GameGUI.hideHUD(false);
        }
        Game.pointerRelease();
        GameGUI.menu.rootContainer.isVisible = true;
    }
    static hideMenu(_updateChild = false) {
        if (Game.debugEnabled) console.log("Running GameGUI::hideMenu");
        if (_updateChild === true) {
            GameGUI.showHUD(true);
        }
        GameGUI.menu.rootContainer.isVisible = false;
    }
    static hideMenuChildren() {
        for (var _i = GameGUI.menu.rootContainer.children.length - 1; _i > -1; _i--) {
            GameGUI.menu.rootContainer.children[_i].isVisible = false;
        }
    }
    static menuVisible() {
        return GameGUI.menu.rootContainer.isVisible;
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
        GameGUI.crosshair.isVisible = true;
    }
    static hideCrosshair() {
        GameGUI.crosshair.isVisible = false;
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
        chatInput.onFocusObservable.add(function() {
            GameGUI._chatInputFocused = true;
        });
        return chatBox;
    }
    static getChatOutput() {
        return GameGUI.chat.children[0].children[0];
    }
    static getChatInput() {
        return GameGUI.chat.children[1];
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
            }
            Game.initPlayer();
            Game.player.entity.setName(nameInput.text);
            if (!Client.isOnline()) {
                Client.connect();
            }
            GameGUI.hideMenu();
            GameGUI.setPlayerPortrait(Game.player);
            GameGUI.showHUD();
        });
        submitOffline.onPointerUpObservable.add(function() {
            if (!Game._finishedScene) {
                Game.generateApartment();
                Game._finishedScene = true;
            }
            Game.initPlayer();
            Game.player.entity.setName(nameInput.text);
            if (Client.isOnline()) {
                Client.disconnect();
            }
            GameGUI.hideMenu();
            GameGUI.setPlayerPortrait(Game.player);
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
        GameGUI.hideMenuChildren();
        GameGUI.characterChoiceMenu.isVisible = true;
    }
    static hideCharacterChoiceMenu() {
        GameGUI.characterChoiceMenu.isVisible = false;
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
                var portraitStatsLife = new BABYLON.GUI.Slider("portraitStatsLife");
                portraitStatsLife.minimum = 0;
                portraitStatsLife.maximum = 100;
                portraitStatsLife.isVertical = false;
                portraitStatsLife.displayThumb = false;
                portraitStatsLife.height = 0.25;
                portraitStatsLife.width = 0.85;
                portraitStatsLife.left = "-16px";
                portraitStatsLife.thumbWidth = 0;
                portraitStatsLife.isEnabled = false;
                portraitStatsLife.color = "red";
                var portraitStatsMana = new BABYLON.GUI.Slider("portraitStatsMana");
                portraitStatsMana.minimum = 0;
                portraitStatsMana.maximum = 100;
                portraitStatsMana.isVertical = false;
                portraitStatsMana.displayThumb = false;
                portraitStatsMana.height = 0.25;
                portraitStatsMana.width = 0.85;
                portraitStatsMana.left = "-16px";
                portraitStatsMana.thumbWidth = 0;
                portraitStatsMana.isEnabled = false;
                portraitStatsMana.color = "blue";
                var portraitStatsStamina = new BABYLON.GUI.Slider("portraitStatsStamina");
                portraitStatsStamina.minimum = 0;
                portraitStatsStamina.maximum = 100;
                portraitStatsStamina.isVertical = false;
                portraitStatsStamina.displayThumb = false;
                portraitStatsStamina.height = 0.25;
                portraitStatsStamina.width = 0.85;
                portraitStatsStamina.left = "-16px";
                portraitStatsStamina.thumbWidth = 0;
                portraitStatsStamina.isEnabled = false;
                portraitStatsStamina.color = "green";
        portrait.addControl(portraitBackground);
        portrait.addControl(portraitAvatarContainer);
        portraitAvatarContainer.addControl(portraitAvatar);
        portrait.addControl(portraitStats);
        portraitStats.addControl(portraitName);
        portraitStats.addControl(portraitStatsLife);
        portraitStats.addControl(portraitStatsMana);
        portraitStats.addControl(portraitStatsStamina);
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
                portraitName.width = 0.8;
                portraitName.color = "white";
                var portraitStatsLife = new BABYLON.GUI.Slider("portraitStatsLife");
                portraitStatsLife.minimum = 0;
                portraitStatsLife.maximum = 100;
                portraitStatsLife.isVertical = false;
                portraitStatsLife.displayThumb = false;
                portraitStatsLife.height = 0.25;
                portraitStatsLife.width = 0.85;
                portraitStatsLife.left = "16px";
                portraitStatsLife.thumbWidth = 0;
                portraitStatsLife.isEnabled = false;
                portraitStatsLife.scaleX = -1;
                portraitStatsLife.color = "red";
                var portraitStatsMana = new BABYLON.GUI.Slider("portraitStatsMana");
                portraitStatsMana.minimum = 0;
                portraitStatsMana.maximum = 100;
                portraitStatsMana.isVertical = false;
                portraitStatsMana.displayThumb = false;
                portraitStatsMana.height = 0.25;
                portraitStatsMana.width = 0.85;
                portraitStatsMana.left = "16px";
                portraitStatsMana.thumbWidth = 0;
                portraitStatsMana.isEnabled = false;
                portraitStatsMana.scaleX = -1;
                portraitStatsMana.color = "blue";
                var portraitStatsStamina = new BABYLON.GUI.Slider("portraitStatsStamina");
                portraitStatsStamina.minimum = 0;
                portraitStatsStamina.maximum = 100;
                portraitStatsStamina.isVertical = false;
                portraitStatsStamina.displayThumb = false;
                portraitStatsStamina.height = 0.25;
                portraitStatsStamina.width = 0.85;
                portraitStatsStamina.left = "16px";
                portraitStatsStamina.thumbWidth = 0;
                portraitStatsStamina.isEnabled = false;
                portraitStatsStamina.scaleX = -1;
                portraitStatsStamina.color = "green";
        portrait.addControl(portraitBackground);
        portrait.addControl(portraitStats);
        portrait.addControl(portraitAvatarContainer);
        portraitAvatarContainer.addControl(portraitAvatar);
        portraitStats.addControl(portraitName);
        portraitStats.addControl(portraitStatsLife);
        portraitStats.addControl(portraitStatsMana);
        portraitStats.addControl(portraitStatsStamina);
        return portrait;
    }
    static showPlayerPortrait() {
        GameGUI.playerPortrait.isVisible = true;
    }
    static hidePlayerPortrait() {
        GameGUI.playerPortrait.isVisible = false;
    }
    static showTargetPortrait() {
        GameGUI.targetPortrait.isVisible = true;
    }
    static hideTargetPortrait() {
        GameGUI.targetPortrait.isVisible = false;
    }
    static setPlayerPortrait(_image = Game.player, _name = "", _life = 0, _mana = 0, _stamina = 0) {
        if (_image instanceof EntityController) {
            _name = _image.getEntity().getFullName();
            _life = _image.getEntity().getLife()/_image.getEntity().getLifeMax()*100;
            if (_image.getEntity().getManaMax() == 0) {
                GameGUI.hidePlayerPortraitMana();
                _mana = 0;
            }
            else {
                _mana = _image.getEntity().getMana()/_image.getEntity().getManaMax()*100;
            }
            _stamina = _image.getEntity().getStamina()/_image.getEntity().getStaminaMax()*100;
            _image = _image.getEntity().getImage();
        }
        this.setPlayerPortraitImage(_image);
        this.setPlayerPortraitName(_name);
        this.setPlayerPortraitLife(_life);
        this.setPlayerPortraitMana(_mana);
        this.setPlayerPortraitStamina(_stamina);
    }
    static setTargetPortrait(_image = undefined, _name = "", _life = 0, _mana = 0, _stamina = 0) {
        if (_image instanceof EntityController && _image.isEnabled()) {
            if (_image instanceof CharacterController) {
                _name = _image.getEntity().getFullName();
                _life = _image.getEntity().getLife()/_image.getEntity().getLifeMax()*100;
                GameGUI.showTargetPortraitLife();
                if (_image.getEntity().getManaMax() == 0) {
                    GameGUI.hideTargetPortraitMana();
                    _mana = 0;
                }
                else {
                    GameGUI.showTargetPortraitMana();
                    _mana = _image.getEntity().getMana()/_image.getEntity().getManaMax()*100;
                }
                _stamina = _image.getEntity().getStamina()/_image.getEntity().getStaminaMax()*100;
                GameGUI.showTargetPortraitStamina();
                _image = _image.getEntity().getImage();
            }
            else if (_image instanceof ItemController) {
                _name = _image.getEntity().getEntity().getName(); // Image is an ItemController, whose Entity is an InstancedItemEntity, whose Entity is an ItemEntity
                GameGUI.hideTargetPortraitLife();
                GameGUI.hideTargetPortraitMana();
                GameGUI.hideTargetPortraitStamina();
                _image = Game.getIcon(_image.getEntity().getImage());
            }
            else {
                _name = _image.getEntity().getName();
                GameGUI.hideTargetPortraitLife();
                GameGUI.hideTargetPortraitMana();
                GameGUI.hideTargetPortraitStamina();
                _image = Game.getIcon(_image.getEntity().getImage());
            }
        }
        this.setTargetPortraitImage(_image);
        this.setTargetPortraitName(_name);
        this.setTargetPortraitLife(_life);
        this.setTargetPortraitMana(_mana);
        this.setTargetPortraitStamina(_stamina);
    }
    static setPlayerPortraitImage(_image = "genericCharacter") {
        _image = Game.getIcon(_image);
        GameGUI.playerPortrait.children[1].children[0].domImage.setAttribute("src", _image);
    }
    static setPlayerPortraitName(_string) {
        GameGUI.playerPortrait.children[2].children[0].text = _string;
    }
    static setPlayerPortraitLife(_int = 100) {
        GameGUI.playerPortrait.children[2].children[1].value = _int;
    }
    static setPlayerPortraitStamina(_int = 100) {
        GameGUI.playerPortrait.children[2].children[3].value = _int;
    }
    static showPlayerPortraitMana() {
        GameGUI.playerPortrait.children[2].children[2].isVisible = true;
    }
    static hidePlayerPortraitMana() {
        GameGUI.playerPortrait.children[2].children[2].isVisible = false;
    }
    static setPlayerPortraitMana(_int = 100) {
        GameGUI.playerPortrait.children[2].children[2].value = _int;
    }
    static setTargetPortraitImage(_image = "genericItem") {
        _image = Game.getIcon(_image);
        GameGUI.targetPortrait.children[2].children[0].domImage.setAttribute("src", _image);
    }
    static setTargetPortraitName(_string) {
        GameGUI.targetPortrait.children[1].children[0].text = _string;
    }
    static showTargetPortraitLife() {
        GameGUI.targetPortrait.children[1].children[1].isVisible = true;
    }
    static hideTargetPortraitLife() {
        GameGUI.targetPortrait.children[1].children[1].isVisible = false;
    }
    static setTargetPortraitLife(_int = 100) {
        GameGUI.targetPortrait.children[1].children[1].value = _int;
    }
    static showTargetPortraitStamina() {
        GameGUI.targetPortrait.children[1].children[3].isVisible = true;
    }
    static hideTargetPortraitStamina() {
        GameGUI.targetPortrait.children[1].children[3].isVisible = false;
    }
    static setTargetPortraitStamina(_int = 100) {
        GameGUI.targetPortrait.children[1].children[3].value = _int;
    }
    static showTargetPortraitMana() {
        GameGUI.targetPortrait.children[1].children[2].isVisible = true;
    }
    static hideTargetPortraitMana() {
        GameGUI.targetPortrait.children[1].children[2].isVisible = false;
    }
    static setTargetPortraitMana(_int = 100) {
        GameGUI.targetPortrait.children[1].children[2].value = _int;
    }
    static chatInputFocus() {
        GameGUI.hud.moveFocusToControl(GameGUI.getChatInput());
    }
    static chatInputSubmit() {
        GameGUI._chatInputFocused = false;
        var _text = GameGUI.getChatInput().text.trim();
        if (_text.length == 0) {
            return;
        }
        if (Client.isOnline()) {
            Client.sendChatMessage(_text);
        }
        else {
            Game.chatCommands(_text);
        }
        GameGUI.chatInputClear();
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
        GameGUI.chatOutputClear();
        GameGUI.chatOutputAppend(_string);
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
     * Shows the inventory menu.
     */
    static showInventory() {
        GameGUI.showMenu(true);
        GameGUI.hideMenuChildren();
        GameGUI.setPlayerInventory();
        GameGUI.inventoryMenu.isVisible = true;
    }
    /**
     * Hides the inventory menu.
     */
    static hideInventory() {
        GameGUI.inventoryMenu.isVisible = false;
    }
    /**
     * Returns whether or not the inventory menu is visible.
     * @return {Boolean} Whether or not the inventory menu is visible.
     */
    static inventoryVisible() {
        return GameGUI.inventoryMenu.isVisible;
    }
    /**
     * Sets the inventory menu's content using an entity's inventory.
     * @param {Entity} _entity The Entity with the inventory.
     */
    static setPlayerInventory(_entity = Game.player.getEntity()) {
        var _inventory = GameGUI.inventoryMenu.getChildByName("items").children;
        for (var _i = _inventory.length - 1; _i > -1; _i--) {
            GameGUI.inventoryMenu.getChildByName("items").removeControl(_inventory[_i]);
        }
        _entity.items.forEach(function(_instancedItemEntity) {
            var _button = GameGUI._generateButton(undefined, _instancedItemEntity.getName(), undefined, Game.getIcon(_instancedItemEntity.getImage()));
                _button.width = 1.0;
                _button.height = 0.1;
            _button.onPointerUpObservable.add(function() {
                GameGUI.setInventorySelectedItem(_instancedItemEntity.getID(), _entity);
            });
            GameGUI.inventoryMenu.getChildByName("items").addControl(_button);
        });
        GameGUI.clearInventorySelectedItem();
    }
    /**
     * Sets the inventory menu's selected item section.
     * @param {InstancedItemEntity} _instancedItemEntity [description]
     * @param {Entity} _targetEntity        The Entity storing the InstancedItemEntity
     * @param {Entity} _playerEntity        The Entity viewing the item; the player.
     */
    static setInventorySelectedItem(_instancedItemEntity, _targetEntity = undefined, _playerEntity = Game.player.getEntity()) {
        _instancedItemEntity = Game.getInstancedItemEntity(_instancedItemEntity);
        if (_instancedItemEntity == undefined) {GameGUI.clearInventorySelectedItem; return;}
        _targetEntity = Game.getEntity(_targetEntity);
        _playerEntity = Game.getEntity(_playerEntity);
        if (_playerEntity == undefined) {_playerEntity = Game.player.getEntity();}

        var _summary = GameGUI.inventoryMenu.getChildByName("summary");
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
        var _actions = GameGUI.inventoryMenu.getChildByName("actions");
        for (var _i = _actions.children.length - 1; _i > -1; _i--) {
            _actions.removeControl(_actions.children[_i]);
        }
        for (var _action in _instancedItemEntity.getAvailableActions()) {
            var _actionButton = undefined;
            switch (_action) {
                case "drop" : {
                    _actionButton = GameGUI._generateButton(undefined, "Drop");
                    _actionButton.onPointerUpObservable.add(function() {Game.actionDropFunction(_instancedItemEntity, _playerEntity.getController(), GameGUI.setPlayerInventory);});
                    break;
                }
                case "hold" : {
                    if (Game.player.getEntity().hasEquippedEntity(_instancedItemEntity)) {
                        _actionButton = GameGUI._generateButton(undefined, "Release");
                        _actionButton.onPointerUpObservable.add(function() {Game.actionReleaseFunction(_instancedItemEntity, _playerEntity.getController(), GameGUI.setInventorySelectedItem);});
                    }
                    else {
                        _actionButton = GameGUI._generateButton(undefined, "Hold");
                        _actionButton.onPointerUpObservable.add(function() {Game.actionHoldFunction(_instancedItemEntity, _playerEntity.getController(), GameGUI.setInventorySelectedItem);});
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
    static clearInventorySelectedItem() {
        var _summary = GameGUI.inventoryMenu.getChildByName("summary");
        _summary.getChildByName("selectedName").text = "";
        _summary.getChildByName("selectedImage").source = "";
        _summary.getChildByName("selectedDescription").text = "";
        var _actions = GameGUI.inventoryMenu.getChildByName("actions");
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
    static setTargetInventory(_entity) {
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
        GameGUI.actionTooltip.children[0].text = _string;
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
        GameGUI.actionTooltip.children[1].text = _string;
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
        GameGUI.actionTooltip.children[2].text = _string;
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
        GameGUI.actionTooltip.isVisible = true;
    }
    /**
     * Hide the action tooltip.
     */
    static hideActionTooltip() {
        GameGUI.actionTooltip.isVisible = false;
    }
    static _generateTargetAvailableActionsRadialMenu() {
        return;
    }
    static _generateTargetAvailableActionsMenu() {
        return;
    }
}