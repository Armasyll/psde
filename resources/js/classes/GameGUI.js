class GameGUI {
    constructor() {
        GameGUI.initialized = false;
    }
    static initialize() {
        GameGUI.alpha = "0.75";
        GameGUI.color = "#c3c3c3";
        GameGUI.background = "#0c0c0c";
        GameGUI.backgroundDisabled = "#030c0c";
        GameGUI.focusedBackground = "#3c3c3c";
        GameGUI.focusedBackgroundDisabled = "#0c3c3c";
        GameGUI._menu = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("menu");
        GameGUI._menu.rootContainer.isVisible = false;
        GameGUI._menu.rootContainer.zIndex = 5;
        GameGUI._hud = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("hud");
        GameGUI._hud.rootContainer.isVisible = false;
        GameGUI._hud.rootContainer.zIndex = 3;

        GameGUI._dialogueOptions = new Array();
        GameGUI._crosshair = undefined;
        GameGUI._chat = undefined;
        GameGUI._playerPortrait = undefined;
        GameGUI._targetPortrait = undefined;
        GameGUI._actionTooltip = undefined;
        GameGUI._actionsMenu = undefined;
        GameGUI._actionsMenuOptions = new Array();
        GameGUI._dialogueMenu = undefined;
        GameGUI._initHUD();

        GameGUI._characterChoiceMenu = undefined;
        GameGUI._inventoryMenu = undefined;
        GameGUI._initMenu();

        GameGUI._chatWasFocused = false;

        GameGUI.initialized = true;
    }
    static _initHUD() {
        GameGUI._crosshair = GameGUI._generateCrosshair();
        GameGUI._chat = GameGUI._generateChat();
        GameGUI._playerPortrait = GameGUI._generatePlayerPortrait();
        GameGUI._targetPortrait = GameGUI._generateTargetPortrait();
        GameGUI._actionTooltip = GameGUI._generateTargetActionTooltip();
        GameGUI._actionsMenu = GameGUI._generateActionsRadialMenu();
        GameGUI._dialogueMenu = GameGUI._generateDialogueMenu();
        GameGUI._hud.addControl(GameGUI._crosshair);
        GameGUI._hud.addControl(GameGUI._chat);
        GameGUI._hud.addControl(GameGUI._playerPortrait);
        GameGUI._hud.addControl(GameGUI._targetPortrait);
        GameGUI._hud.addControl(GameGUI._actionsMenu);
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
    static pointerLock() {
        Game.pointerLock();
        window.addEventListener("click", GameGUI._pointerLockEventFunction);
    }
    static pointerRelease() {
        Game.pointerRelease();
        window.removeEventListener("click", GameGUI._pointerLockEventFunction);
    }
    static _pointerLockEventFunction(_event) {
        if (GameGUI._hud.rootContainer.isVisible) {
            Game.pointerLock();
        }
    }
    static showHUD(_updateChild = true) {
        if (Game.debugEnabled) console.log("Running GameGUI::showHUD");
        if (_updateChild === true) {
            GameGUI.hideMenu(false);
        }
        GameGUI._hud.rootContainer.isVisible = true;
        GameGUI.pointerLock();
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
        crosshair.zIndex = 10;
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
            chatOutputContainer.background = GameGUI.background;
            chatOutputContainer.thickness = 0;
            chatOutputContainer.alpha = 0.75;
                var chatOutput = new BABYLON.GUI.TextBlock("chatOutput");
                chatOutput.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
                chatOutput.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                chatOutput.height = 1.0;
                chatOutput.width = 1.0;
                chatOutput.color = GameGUI.color;
                chatOutput.textWrapping = true;
            var chatInput = new BABYLON.GUI.InputText("chatInput");
            chatInput.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            chatInput.height = 0.2;
            chatInput.width = 1.0;
            chatInput.background = GameGUI.background;
            chatInput.focusedBackground = GameGUI.focusedBackground;
            chatInput.color = GameGUI.color;
            chatInput.text = "";
            chatInput.thickness = 1;
            chatInput.alpha = 0.75;
        chatOutputContainer.addControl(chatOutput);
        chatBox.addControl(chatOutputContainer);
        chatBox.addControl(chatInput);
        // TODO: replace with onKeyboardEventProcessedObservable when it becomes available; until then, out-of-focus enters
        // TODO: add support for escape key; until then, you can only enter :v
        chatInput.onBlurObservable.add(function() {
            GameGUI._chatWasFocused = false;
            Game.controlCharacterOnKeyDown(Game.chatInputSubmitCode);
        });
        chatBox.zIndex = 90;
        return chatBox;
    }
    static getChatOutput() {
        return GameGUI._chat.children[0].children[0];
    }
    static getChatInput() {
        return GameGUI._chat.children[1];
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
    static setChatInputFocused(_boolean) {
        GameGUI._chatWasFocused = false;
        if (_boolean === true) {
            GameGUI._hud.moveFocusToControl(GameGUI._chat.children[1]);
        }
        else {
            GameGUI._hud.moveFocusToControl(null);
        }
    }
    static getChatInputFocused() {
        if (GameGUI._chatWasFocused) {
            return true;
        }
        return GameGUI._hud.focusedControl == GameGUI._chat.children[1];
    }
    static _generateCharacterChoiceMenu() {
        var characterChoiceMenuContainer = new BABYLON.GUI.StackPanel("characterChoiceMenu");
            var nameContainer = new BABYLON.GUI.StackPanel();
                var nameLabel = new BABYLON.GUI.TextBlock();
                var nameInput = new BABYLON.GUI.InputText();
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
        buttonKBLayoutContainer.isVertical = false;
            buttonKBLayoutOptions.isVertical = true;
        submitContainer.isVertical = false;

        characterChoiceMenuContainer.zIndex = 90;
        characterChoiceMenuContainer.height = 0.6
        characterChoiceMenuContainer.width = 0.5;
        characterChoiceMenuContainer.background = GameGUI.background;
        characterChoiceMenuContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        characterChoiceMenuContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;

        nameContainer.height = 0.05;
            nameLabel.text = "Name: ";
            nameLabel.width = 0.3;
            nameLabel.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            nameLabel.color = GameGUI.color;

            nameInput.width = 0.7;
            nameInput.color = GameGUI.color;
            nameInput.background = GameGUI.focusedBackground;
            nameInput.text = "Player";

        buttonKBLayoutContainer.height = 0.15;
            buttonKBLayoutLabel.text = "Keyboard Layout: ";
            buttonKBLayoutLabel.width = 0.3;
            buttonKBLayoutLabel.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            buttonKBLayoutLabel.color = GameGUI.color;

            buttonKBLayoutOptions.width = 0.7;
                buttonKBLayoutQwerty.height = 0.3;
                buttonKBLayoutQwerty.background = GameGUI.focusedBackground;
                buttonKBLayoutQwerty.color = GameGUI.color;
                buttonKBLayoutDvorak.height = 0.3;
                buttonKBLayoutDvorak.background = GameGUI.focusedBackground;
                buttonKBLayoutDvorak.color = GameGUI.color;
                buttonKBLayoutAzerty.height = 0.3;
                buttonKBLayoutAzerty.background = GameGUI.focusedBackground;
                buttonKBLayoutAzerty.color = GameGUI.color;

        submitContainer.height = 0.05;
            submitOffline.width = 0.5;
            submitOffline.color = GameGUI.color;
            submitOffline.background = GameGUI.focusedBackground;
            submitOffline.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

            submitOnline.width = 0.5;
            submitOnline.color = GameGUI.color;
            submitOnline.background = GameGUI.focusedBackground;
            submitOnline.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            submitOnline.isEnabled = false;

        buttonKBLayoutQwerty.onPointerUpObservable.add(function() {
            Game.initQwertyKeyboardControls();
        });
        buttonKBLayoutDvorak.onPointerUpObservable.add(function() {
            Game.initDvorakKeyboardControls();
        });
        buttonKBLayoutAzerty.onPointerUpObservable.add(function() {
            Game.initAzertyKeyboardControls();
        });
        submitOnline.onPointerClickObservable.add(function() {
            if (!Game._finishedConfiguring) {
                Game.generateApartment();
                Game._finishedConfiguring = true;
                Game.initPlayer();
                Game.player.setName(nameInput.text);
                GameGUI.setPlayerPortrait(Game.player);
            }
            console.log("Online functionality hasn't been updated in months, sorry :V no multiplayer 4 u");
            /*
            if (!Client.isOnline()) {
                Client.connect();
            }*/
            GameGUI.hideCharacterChoiceMenu();
            GameGUI.hideMenu();
            GameGUI.showHUD();
        });
        submitOffline.onPointerClickObservable.add(function() {
            if (!Game._finishedConfiguring) {
                Game._finishedConfiguring = true;
                Game.generateApartment();
                Game.initPlayer();
                Game.player.setName(nameInput.text);
                GameGUI.setPlayerPortrait(Game.player);
            }
            if (Client.isOnline()) {
                Client.disconnect();
            }
            GameGUI.hideCharacterChoiceMenu();
            GameGUI.hideMenu();
            GameGUI.showHUD();
            console.log("Player Entity:\n\tGame.player");
            console.log("Player 3D Controller:\n\tGame.player.getController()");
            console.log("Player 3D Mesh:\n\tGame.player.getController().getMesh()");
        });

        characterChoiceMenuContainer.addControl(nameContainer);
            nameContainer.addControl(nameLabel);
            nameContainer.addControl(nameInput);
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
        characterChoiceMenuContainer.zIndex = 90;
        return characterChoiceMenuContainer;
    }
    static showCharacterChoiceMenu() {
        GameGUI.showMenu(true);
        GameGUI._hideMenuChildren();
        GameGUI._characterChoiceMenu.isVisible = true;
    }
    static hideCharacterChoiceMenu() {
        GameGUI.pointerLock();
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
            portraitBackground.background = GameGUI.background;
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
                portraitName.color = GameGUI.color;
                var portraitStatsHealthContainer = new BABYLON.GUI.Rectangle("portraitStatsHealthContainer");
                portraitStatsHealthContainer.height = 0.25;
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
                    portraitStatsHealthSlider.height = 1.25;
                    portraitStatsHealthSlider.thumbWidth = 0;
                    portraitStatsHealthSlider.isEnabled = false;
                    portraitStatsHealthSlider.color = "red";
                var portraitStatsManaContainer = new BABYLON.GUI.Rectangle("portraitStatsManaContainer");
                portraitStatsManaContainer.height = 0.25;
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
                    portraitStatsStaminaText.color = GameGUI.color;
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
            portraitBackground.background = GameGUI.background;
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
                portraitName.color = GameGUI.color;
                var portraitStatsHealthContainer = new BABYLON.GUI.Rectangle("portraitStatsHealthContainer");
                portraitStatsHealthContainer.height = 0.25;
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
                    portraitStatsHealthSlider.height = 1.25;
                    portraitStatsHealthSlider.thumbWidth = 0;
                    portraitStatsHealthSlider.isEnabled = false;
                    portraitStatsHealthSlider.scaleX = -1;
                    portraitStatsHealthSlider.color = "red";
                var portraitStatsManaContainer = new BABYLON.GUI.Rectangle("portraitStatsManaContainer");
                portraitStatsManaContainer.height = 0.25;
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
                    portraitStatsStaminaText.color = GameGUI.color;
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
    static setPlayerPortrait(_entity = Game.player) {
        if (!_entity.isEnabled()) {
            return undefined;
        }
        if (_entity instanceof EntityController) {
            _entity = _entity.getEntity();
        }
        else if (!(_entity instanceof AbstractEntity)) {
            return undefined;
        }
        GameGUI.updatePlayerPortraitStats(_entity);
        GameGUI._setPlayerPortraitImage(_entity.getImage());
        GameGUI._setPlayerPortraitName(_entity.getName());
    }
    static updatePlayerPortraitStats(_entity = Game.player) {
        if (!_entity.isEnabled()) {
            return undefined;
        }
        if (_entity instanceof EntityController) {
            _entity = _entity.getEntity();
        }
        else if (!(_entity instanceof AbstractEntity)) {
            return undefined;
        }
        GameGUI._setPlayerPortraitHealthSlider(_entity.getHealth()/_entity.getMaxHealth()*100);
        GameGUI._setPlayerPortraitHealthText(_entity.getHealth() + "/" + _entity.getMaxHealth());
        if (_entity.getMaxMana() == 0) {
            GameGUI._hidePlayerPortraitMana();
        }
        else {
            GameGUI._showPlayerPortraitMana();
            GameGUI._setPlayerPortraitManaSlider(_entity.getMana()/_entity.getMaxMana()*100);
            GameGUI._setPlayerPortraitManaText(_entity.getMana() + "/" + _entity.getMaxMana());
        }
        GameGUI._setPlayerPortraitStaminaSlider(_entity.getStamina()/_entity.getMaxStamina()*100);
        GameGUI._setPlayerPortraitStaminaText(_entity.getStamina() + "/" + _entity.getMaxStamina());
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
            GameGUI._setTargetPortraitHealthSlider(_entity.getHealth()/_entity.getMaxHealth()*100);
            GameGUI._setTargetPortraitHealthText(_entity.getHealth() + "/" + _entity.getMaxHealth());
            if (_entity.getMaxMana() == 0) {
                GameGUI._hideTargetPortraitMana();
            }
            else {
                GameGUI._showTargetPortraitMana();
                GameGUI._setTargetPortraitManaSlider(_entity.getMana()/_entity.getMaxMana()*100);
                GameGUI._setTargetPortraitManaText(_entity.getMana() + "/" + _entity.getMaxMana());
            }
            GameGUI._setTargetPortraitStaminaSlider(_entity.getStamina()/_entity.getMaxStamina()*100);
            GameGUI._setTargetPortraitStaminaText(_entity.getStamina() + "/" + _entity.getMaxStamina());
            GameGUI._showTargetPortraitHealth();
            GameGUI._showTargetPortraitStamina();
        }
        else {
            GameGUI._hideTargetPortraitHealth();
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
    static _setPlayerPortraitHealthSlider(_int = 100) {
        GameGUI._playerPortrait.children[2].children[1].children[0].value = _int;
    }
    static _setPlayerPortraitHealthText(_text = "") {
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
    static _showTargetPortraitHealth() {
        GameGUI._targetPortrait.children[1].children[1].isVisible = true;
    }
    static _hideTargetPortraitHealth() {
        GameGUI._targetPortrait.children[1].children[1].isVisible = false;
    }
    static _setTargetPortraitHealthSlider(_int = 100) {
        GameGUI._targetPortrait.children[1].children[1].children[0].value = _int;
    }
    static _setTargetPortraitHealthText(_text = "") {
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
    static _generateInventoryMenu() {
        var inventory = new BABYLON.GUI.Rectangle("inventory");
            inventory.height = 1.0;
            inventory.width = 0.6;
            inventory.background = GameGUI.background;
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
                selectedName.color = GameGUI.color;
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
                selectedDescription.color = GameGUI.color;
                summary.addControl(selectedDescription);
            var selectedDetails = new BABYLON.GUI.TextBlock("selectedDetails");
                selectedDetails.width = 1.0;
                selectedDetails.height = 0.2;
                selectedDetails.top = "45%";
                selectedDetails.left = 0;
                selectedDetails.color = GameGUI.color;
                summary.addControl(selectedDetails);
        var actions = new BABYLON.GUI.Rectangle("actions");
            actions.height = 0.4;
            actions.width = 0.5;
            actions.top = "30%";
            actions.left = "25%";
            inventory.addControl(actions);
        inventory.isVisible = false;
        inventory.zIndex = 50;
        return inventory;
    }
    /**
     * Returns whether or not the inventory menu is visible.
     * @return {Boolean} Whether or not the inventory menu is visible.
     */
    static getInventoryMenuVisible() {
        return GameGUI._inventoryMenu.isVisible;
    }
    static showInventoryMenu() {
        GameGUI._inventoryMenu.isVisible = true;
    }
    static hideInventoryMenu() {
        GameGUI._inventoryMenu.isVisible = false;
    }
    /**
     * Sets the inventory menu's content using an entity's inventory.
     * @param {Entity} _entity The Entity with the inventory.
     */
    static updateInventoryMenuWith(_entity = Game.player) {
        var _inventory = GameGUI._inventoryMenu.getChildByName("items").children;
        for (var _i = _inventory.length - 1; _i > -1; _i--) {
            GameGUI._inventoryMenu.getChildByName("items").removeControl(_inventory[_i]);
        }
        for (let _key of _entity.getItems().keys()) {
            let _instancedItemEntity = _entity.getItems().get(_key);
            var _button = GameGUI._generateButton(undefined, _instancedItemEntity.getName(), undefined, Game.getIcon(_instancedItemEntity.getImage()));
            _button.width = 1.0;
            _button.height = 0.1;
            _button.onPointerUpObservable.add(function() {
                GameGUI.updateInventoryMenuSelected(_instancedItemEntity.getID(), _entity);
            });
            GameGUI._inventoryMenu.getChildByName("items").addControl(_button);
        };
        GameGUI._clearInventorySelectedItem();
    }
    /**
     * Sets the inventory menu's selected item section.
     * @param {InstancedItemEntity} _instancedItemEntity [description]
     * @param {Entity} _targetEntity        The Entity storing the InstancedItemEntity
     * @param {Entity} _playerEntity        The Entity viewing the item; the player.
     */
    static updateInventoryMenuSelected(_instancedItemEntity, _targetEntity = undefined, _playerEntity = Game.player) {
        _instancedItemEntity = Game.getInstancedItemEntity(_instancedItemEntity);
        if (_instancedItemEntity == undefined) {GameGUI._clearInventorySelectedItem; return;}
        _targetEntity = Game.getEntity(_targetEntity);
        _playerEntity = Game.getEntity(_playerEntity);
        if (_playerEntity == undefined) {_playerEntity = Game.player;}

        var _summary = GameGUI._inventoryMenu.getChildByName("summary");
        _summary.getChildByName("selectedName").text = _instancedItemEntity.getName();
        _summary.getChildByName("selectedImage").source = Game.getIcon(_instancedItemEntity.getImage());
        _summary.getChildByName("selectedDescription").text = _instancedItemEntity.getDescription();
        var _weightString = undefined;
        if (_instancedItemEntity.getWeight() < 1) {
            _weightString = String(_instancedItemEntity.getWeight() * 1000) + "g";
        }
        else {
            _weightString = String(_instancedItemEntity.getWeight()) + "kg";
        }
        _summary.getChildByName("selectedDetails").text = `Price: $${_instancedItemEntity.getPrice()}, Weight: ${_weightString}`;
        var _actions = GameGUI._inventoryMenu.getChildByName("actions");
        for (var _i = _actions.children.length - 1; _i > -1; _i--) {
            _actions.removeControl(_actions.children[_i]);
        }
        for (var _action in _instancedItemEntity.getAvailableActions()) {
            _action = Tools.filterInt(_action);
            var _actionButton = undefined;
            switch (_action) {
                case ActionEnum.DROP : {
                    _actionButton = GameGUI._generateButton(undefined, ActionEnum.properties[_action].name);
                    _actionButton.onPointerUpObservable.add(function() {Game.actionDropFunction(_instancedItemEntity, _playerEntity, GameGUI.updateInventoryMenu);});
                    break;
                }
                case ActionEnum.HOLD : {
                    if (Game.player.hasEquipment(_instancedItemEntity)) {
                        _actionButton = GameGUI._generateButton(undefined, ActionEnum.properties[ActionEnum.RELEASE].name);
                        _actionButton.onPointerUpObservable.add(function() {Game.actionReleaseFunction(_instancedItemEntity, _playerEntity, GameGUI.updateInventoryMenuSelected);});
                    }
                    else {
                        _actionButton = GameGUI._generateButton(undefined, ActionEnum.properties[ActionEnum.HOLD].name);
                        _actionButton.onPointerUpObservable.add(function() {Game.actionHoldFunction(_instancedItemEntity, _playerEntity, GameGUI.updateInventoryMenuSelected);});
                    }
                    break;
                }
                case ActionEnum.LOOK : {
                    _actionButton = GameGUI._generateButton(undefined, ActionEnum.properties[_action].name);
                    break;
                }
                case ActionEnum.PUT : {
                    if (_playerEntity != Game.player) {
                        break;
                    }
                    else if (_targetEntity instanceof EntityWithStorage) {
                        _actionButton = GameGUI._generateButton(undefined, ActionEnum.properties[_action].name);
                    }
                    break;
                }
                case ActionEnum.TAKE : {
                    if (_playerEntity == Game.player) {}
                    else {
                        _actionButton = GameGUI._generateButton(undefined, ActionEnum.properties[_action].name);
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
        for (var _i = _actions.children.length - 1; _i >= 0; _i--) {
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
            _buttonText.color = GameGUI.color;
            _button.addControl(_buttonText);
        return _button;
    }
    static _generateTargetActionTooltip() {
        if (Game.debugEnabled) console.log("Running GameGUI::_generateTargetActionTooltip");
        var tooltip = new BABYLON.GUI.Rectangle("targetActionTooltip");
            tooltip.width = 0.125;
            tooltip.height = 0.075;
            tooltip.top = "3.75%";
            tooltip.left = "6.25%";
            tooltip.background = GameGUI.background;
            tooltip.alpha = 0.5;
            tooltip.isVertical = false;
        var keyName = new BABYLON.GUI.TextBlock();
            keyName.text = "E";
            keyName.top = 0;
            keyName.left = "10%";
            keyName.textHorizontalAlignment = BABYLON.GUI.HORIZONTAL_ALIGNMENT_LEFT;
            keyName.color = GameGUI.color;
        var actionPanelActionName = new BABYLON.GUI.TextBlock();
            actionPanelActionName.text = "";
            actionPanelActionName.height = 0.5;
            //actionPanelActionName.top = "-25%";
            actionPanelActionName.left = "25%";
            actionPanelActionName.color = GameGUI.color;
        var actionPanelTargetName = new BABYLON.GUI.TextBlock();
            actionPanelTargetName.text = "";
            actionPanelTargetName.height = 0.5;
            actionPanelTargetName.top = "25%";
            actionPanelTargetName.left = "25%";
            actionPanelTargetName.color = GameGUI.color;
        tooltip.addControl(keyName);
        tooltip.addControl(actionPanelActionName);
        tooltip.addControl(actionPanelTargetName);
        tooltip.isVisible = false;
        tooltip.zIndex = 12;
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
    static setActionTooltipString(_string = "Use") {
        if (Game.debugEnabled) console.log("Running GameGUI::setActionTooltipString");
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
        GameGUI.setActionTooltipString(_action);
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
    /**
     * A group of circular buttons arranged in a circle.
     * @return {BABYLON.GUI.Container} Circular container of buttons.
     */
    static _generateActionsRadialMenu() {
        if (Game.debugEnabled) console.log("Running GameGUI::_generateActionsRadialMenu");
        var _aRM = new BABYLON.GUI.Ellipse("actionsRadialMenu", 0);
        _aRM.width = String(Game.engine.getRenderWidth() / 4) + "px";
        _aRM.height = _aRM.width;
        _aRM.background = GameGUI.background;
        _aRM.color = GameGUI.color;
        _aRM.alpha = GameGUI.alpha;
        _aRM.isVisible = false;
        _aRM.zIndex = 12;
        return _aRM;
    }
    static populateActionsMenuWith(_controller) {
        _controller = Game.getEntityController(_controller);
        if (!(_controller instanceof EntityController)) {
            return;
        }
        GameGUI._actionsMenuOptions.clear();
        var _actions = _controller.getEntity().getAvailableActions();
        for (var _action in _actions) {
            if (!_controller.getEntity().hasHiddenAvailableAction(_action)) {
                GameGUI.addActionsMenuOption(_actions[_action].action, _controller);
            }
        }
        return true;
    }
    static populateActionsMenuWithTarget () {
        return GameGUI.populateActionsMenuWith(Game.player.getController().getTarget());
    }
    static addActionsMenuOption(_action, _entity) {
        if (_action instanceof ActionData) {
            _action = _action.action;
        }
        if (!ActionEnum.properties.hasOwnProperty(_action)) {
            return;
        }
        _entity = Game.getInstancedEntity(_entity) || Game.getEntity(_entity);
        if (!(_entity instanceof AbstractEntity)) {
            return;
        }
        GameGUI._actionsMenuOptions.push({action:_action,target:_entity});
        if (GameGUI._actionsMenu.isVisible) {
            GameGUI.updateActionsMenu();
        }
        return true;
    }
    static removeActionsMenuOption(_action) {
        if (_action instanceof ActionData) {
            _action = _action.action;
        }
        for (var _i = 0; _i < GameGUI._actionsMenuOptions.length; _i++) {
            if (GameGUI._actionsMenuOptions[_i].action == _action) {
                GameGUI._actionsMenuOptions.splice(_i, 1);
                _i = _actionsMenuOptions.length;
            }
        }
        if (GameGUI._actionsMenu.isVisible) {
            GameGUI.updateActionsMenu();
        }
        return true;
    }
    static clearActionsMenu() {
        for (var _i = GameGUI._actionsMenu.children.length - 1; _i >= 0; _i--) {
            GameGUI._actionsMenu.children[_i].dispose();
        }
        GameGUI._actionsMenuOptions.clear();
        return true;
    }
    static showActionsMenu(_pointerRelease = true, _updateChild = true) {
        if (_updateChild) {
            GameGUI.hideActionTooltip();
        }
        GameGUI._actionsMenu.isVisible = true;
        if (_pointerRelease) {
            GameGUI.pointerRelease();
        }
    }
    static hideActionsMenu(_pointerLock = true, _updateChild = true) {
        GameGUI._actionsMenu.isVisible = false;
        if (_updateChild) {
            GameGUI.showActionTooltip();
        }
        if (_pointerLock) {
            GameGUI.pointerLock();
        }
    }
    static updateActionsMenu() {
        for (var _i = GameGUI._actionsMenu.children.length - 1; _i >= 0; _i--) {
            GameGUI._actionsMenu.children[_i].dispose();
        }
        var _x = 0;
        var _y = 0;
        var _button = new BABYLON.GUI.Button.CreateSimpleButton("closeRadialMenu", "X");
        _button.width = "24px";
        _button.height = "24px";
        _button.color = GameGUI.color;
        _button.background = GameGUI.background;
        _button.onPointerClickObservable.add(function() {GameGUI.hideActionsMenu();GameGUI.pointerLock();});
        _button._moveToProjectedPosition(new BABYLON.Vector2(_x, _y));
        GameGUI._actionsMenu.addControl(_button);
        if (GameGUI._actionsMenuOptions.length > 0) {
            for (let _i = 0; _i < GameGUI._actionsMenuOptions.length; _i++) {
                _x = (GameGUI._actionsMenu.widthInPixels/3) * Math.cos(BABYLON.Tools.ToRadians(360/GameGUI._actionsMenuOptions.length*_i - 90));
                _y = (GameGUI._actionsMenu.widthInPixels/3) * Math.sin(BABYLON.Tools.ToRadians(360/GameGUI._actionsMenuOptions.length*_i - 90));
                _button = new BABYLON.GUI.Button.CreateSimpleButton(undefined, ActionEnum.properties[GameGUI._actionsMenuOptions[_i].action].name);
                _button.width = "96px";
                _button.height = "24px";
                _button.color = GameGUI.color;
                _button.background = GameGUI.background;
                _button._moveToProjectedPosition(new BABYLON.Vector2(_x, _y));
                _button.onPointerClickObservable.add(
                    function() {
                        GameGUI.hideActionsMenu();
                        Game.doEntityAction(GameGUI._actionsMenuOptions[_i].target, Game.player, GameGUI._actionsMenuOptions[_i].action);
                    }
                );
                GameGUI._actionsMenu.addControl(_button);
            }
        }
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
        var _title = new BABYLON.GUI.TextBlock("dialogueTitle");
            _title.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            _title.color = GameGUI.color;
            _title.text = "Title :V";
        var _closeButton = new BABYLON.GUI.Button.CreateSimpleButton("close", "X");
            _closeButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            _closeButton.color = GameGUI.color;
            _closeButton.width = 0.05;
        var _bodyContainer = new BABYLON.GUI.Rectangle("dialogueBodyContainer"); // TODO: Replace with ScrollViewer when it becomes available
            _bodyContainer.width = 1.0;
            _bodyContainer.height = 0.6;
            _bodyContainer.thickness = 0;
            _bodyContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
            _bodyContainer.top = "-10%";
        var _body = new BABYLON.GUI.TextBlock("dialogueBody"); // TODO: Fix text clipping after resizing to larger innerWindow
            _body.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            _body.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            _body.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            _body.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            _body.textWrapping = BABYLON.GUI.TextWrapping.WordWrap;
            _body.resizeToFit = true;
            _body.width = 1.0;
            _body.height = 1.0;
            _body.color = GameGUI.color;
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
        var _optionsColA = new BABYLON.GUI.StackPanel();
            _optionsColA.isVertical = true;
            _optionsColA.width = 0.33;
            _optionsColA.height = 1.0;
        var _optionsColB = new BABYLON.GUI.StackPanel();
            _optionsColB.isVertical = true;
            _optionsColB.width = 0.341;
            _optionsColB.height = 1.0;
        var _optionsColC = new BABYLON.GUI.StackPanel();
            _optionsColC.isVertical = true;
            _optionsColC.width = 0.33;
            _optionsColC.height = 1.0;
        
        _closeButton.onPointerUpObservable.add(function() {
            GameGUI.clearDialogueOptions();
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
        _container.zIndex = 15;
        return _container;
    }
    static showDialogueMenu() {
        GameGUI.pointerRelease();
        GameGUI._dialogueMenu.isVisible = true;
    }
    static hideDialogueMenu() {
        GameGUI.pointerLock();
        GameGUI._dialogueMenu.isVisible = false;
    }
    static setDialogue(_dialogue, _them, _you = Game.player) {
        GameGUI.clearDialogue();
        _dialogue = Game.getDialogue(_dialogue);
        _them = Game.getEntity(_them);
        _you = Game.getEntity(_you);
        GameGUI.setDialogueTitle(_dialogue.getTitle());
        var _text = _dialogue.getText(_them, _you);
        if (typeof _text == "function") {
            GameGUI.setDialogueBody(_text);
        }
        else {
            GameGUI.setDialogueBody(_text);
        }
        if (_dialogue.hasOptions()) {
            for (var _option in _dialogue.getOptions()) {
                if (_dialogue.getOptions()[_option].getCondition(_them, _you)) {
                    GameGUI.addDialogueOption(_dialogue.getOptions()[_option], _them, _you, true);
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
        if (typeof _string != "string") {
            _string = "MISSING DIALOGUE :V";
        }
        GameGUI._dialogueMenu.children[1].children[0].text = _string;
    }
    static appendDialogueBody(_string) {
        GameGUI._dialogueMenu.children[1].children[0].text += _string;
    }
    static clearDialogueBody() {
        GameGUI.setDialogueBody("");
    }
    static addDialogueOption(_dialogueOption, _them, _you = Game.player) {
        if (!(_dialogueOption instanceof DialogueOption)) {
            return undefined;
        }
        if (GameGUI._dialogueOptions.length > 7 || GameGUI._dialogueOptions.hasOwnProperty(_dialogueOption.getDialogue().getID())) {
            return false;
        }
        var _button = new BABYLON.GUI.Button.CreateSimpleButton(_dialogueOption.getDialogue().getID(), _dialogueOption.getTitle());
        _button.color = GameGUI.color;
        _button.width = 1.0;
        _button.height = 0.33;
        _button.onPointerUpObservable.add(function() {
            GameGUI.setDialogue(_dialogueOption.getDialogue().getID(), _them.getID(), _you.getID());
        });
        if (GameGUI._dialogueOptions.length > 5) {
            GameGUI._dialogueMenu.children[2].children[2].addControl(_button);
        }
        else if (GameGUI._dialogueOptions.length > 2) {
            GameGUI._dialogueMenu.children[2].children[1].addControl(_button);
        }
        else {
            GameGUI._dialogueMenu.children[2].children[0].addControl(_button);
        }
        GameGUI._dialogueOptions.push(_dialogueOption);
        return true;
    }
    static removeDialogueOption(_dialogueOption) {
        if (!(_dialogueOption instanceof DialogueOption)) {
            return false;
        }
        for (var _i = 0; _i < GameGUI._dialogueMenu.children[2].children.length; _i++) {
            for (var _j = GameGUI._dialogueMenu.children[2].children[_i].children.length; _j >= 0; _j--) {
                if (GameGUI._dialogueMenu.children[2].children[_i].children[_j] instanceof BABYLON.GUI.Container) {
                    if (GameGUI._dialogueMenu.children[2].children[_i].children[_j].id == _dialogueOption.getID()) {
                        GameGUI._dialogueMenu.children[2].children[_i].children[_j].dispose();
                    }
                }
            }
        }
        if (GameGUI._dialogueOptions.indexOf(_dialogueOption) > -1) {
            GameGUI._dialogueOptions.remove(_dialogueOption);
        }
    }
    static clearDialogueOptions() {
        for (var _i = 0; _i < GameGUI._dialogueMenu.children[2].children.length; _i++) {
            for (var _j = GameGUI._dialogueMenu.children[2].children[_i].children.length; _j >= 0; _j--) {
                if (GameGUI._dialogueMenu.children[2].children[_i].children[_j] instanceof BABYLON.GUI.Container) {
                    GameGUI._dialogueMenu.children[2].children[_i].children[_j].dispose();
                }
            }
        }
        GameGUI._dialogueOptions.clear();
    }
    static clearDialogue() {
        GameGUI.clearDialogueTitle();
        GameGUI.clearDialogueBody();
        GameGUI.clearDialogueOptions();
    }
}