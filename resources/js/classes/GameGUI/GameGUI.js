/**
 * Game GUI
 */
class GameGUI {
    /**
     * 
     */
    constructor() {
        GameGUI.initialized = false;
    }
    static className() {
        return "GameGUI";
    }
    static initialize() {
        GameGUI.fontSizeInPixels = 24;
        GameGUI.fontSizeSpacing = 8;
        GameGUI.fontSize = String(GameGUI.fontSizeInPixels).concat("px");
        GameGUI.fontSizeInPixelsWithSpacing = GameGUI.fontSizeInPixels + GameGUI.fontSizeSpacing;
        GameGUI.fontSizeWithSpacing = String(GameGUI.fontSizeInPixels + GameGUI.fontSizeSpacing).concat("px");
        GameGUI.fontSizeTinyInPixels = GameGUI.fontSizeInPixels - 12;
        GameGUI.fontSizeTiny = String(GameGUI.fontSizeTinyInPixels).concat("px");
        GameGUI.fontSizeSmallInPixels = GameGUI.fontSizeInPixels - 8;
        GameGUI.fontSizeSmall = String(GameGUI.fontSizeSmallInPixels).concat("px");
        GameGUI.fontSizeLargeInPixels = GameGUI.fontSizeInPixels + 8;
        GameGUI.fontSizeLarge = String(GameGUI.fontSizeLargeInPixels).concat("px");
        GameGUI.alpha = 0.75;
        GameGUI.containerAlpha = 0.75;
        GameGUI.color = "#c3c3c3";
        GameGUI.colorDanger = "#ffffff";
        GameGUI.background = "#0c0c0c";
        GameGUI.backgroundDisabled = "#030c0c";
        GameGUI.backgroundDanger = "#dc3545";
        GameGUI.focusedBackground = "#3c3c3c";
        GameGUI.focusedBackgroundDisabled = "#0c3c3c";

        GameGUI._nameInput = "";
        GameGUI._ageInput = "";
        GameGUI.menu = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("menu");
        GameGUI.menu.rootContainer.isVisible = false;
        GameGUI.menu.rootContainer.zIndex = 5;
        GameGUI.hud = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("hud");
        GameGUI.hud.rootContainer.isVisible = false;
        GameGUI.hud.rootContainer.zIndex = 3;

        GameGUI.actionTooltip = null;
        GameGUI.actionTooltipLocked = false;
        GameGUI.radialMenu = null;
        GameGUI.radialMenuOptions = new Array();
        GameGUI.dialogue = null;
        GameGUI._initHUD();

        GameGUI.characterChoiceMenu = null;
        GameGUI.inventoryMenu = null;
        GameGUI.characterStats = null;
        GameGUI._initMenu();
        GameGUI.debugMenu = null;

        GameGUI.locked = false;
        GameGUI.initialized = true;
        GameGUI.resize();
    }
    static _initHUD() {
        GameGUI.crosshair = GameGUI._generateCrosshair();
        GameGUI.actionTooltip = GameGUI._generateTargetActionTooltip();
        GameGUI.radialMenu = GameGUI._generateActionsRadialMenu();
        GameGUI.hud.addControl(GameGUI.crosshair);
        GameGUI.hud.addControl(GameGUI.radialMenu);
        GameGUI.hud.addControl(GameGUI.actionTooltip);

        GameGUI.debugMenu = DebugGameGUI;
        GameGUI.debugMenu.initialize();
        GameGUI.hud.addControl(GameGUI.debugMenu.getSkyboxController());
        GameGUI.chat = ChatGameGUI;
        GameGUI.chat.initialize();
        GameGUI.hud.addControl(GameGUI.chat.getController());
        GameGUI.dialogue = DialogueGameGUI;
        GameGUI.dialogue.initialize();
        GameGUI.hud.addControl(GameGUI.dialogue.getController());
        GameGUI.playerPortrait = PlayerPortraitGameGUI;
        GameGUI.playerPortrait.initialize();
        GameGUI.hud.addControl(GameGUI.playerPortrait.getController());
        GameGUI.targetPortrait = TargetPortraitGameGUI;
        GameGUI.targetPortrait.initialize();
        GameGUI.hud.addControl(GameGUI.targetPortrait.getController());
    }
    static _initMenu() {
        GameGUI.characterChoiceMenu = GameGUI._generateCharacterChoiceMenu()
        GameGUI.menu.addControl(GameGUI.characterChoiceMenu);

        GameGUI.inventoryMenu = InventoryGameGUI;
        GameGUI.inventoryMenu.initialize();
        GameGUI.menu.addControl(GameGUI.inventoryMenu.getController());
        GameGUI.characterStats = CharacterStatsGUI;
        GameGUI.characterStats.initialize();
        GameGUI.menu.addControl(GameGUI.characterStats.getController());
        GameGUI.book = BookGameGUI;
        GameGUI.book.initialize();
        GameGUI.menu.addControl(GameGUI.book.getController());
    }
    static resize() {
        if (!GameGUI.initialized) {
            return;
        }
        GameGUI.fontSizeInPixels = Math.max(Math.floor((Game.renderWidth/16)/5), 24);
        GameGUI.fontSizeSpacing = Math.max(Math.ceil(GameGUI.fontSizeInPixels/3), 8);
        GameGUI.fontSize = String(GameGUI.fontSizeInPixels).concat("px");
        GameGUI.fontSizeInPixelsWithSpacing = GameGUI.fontSizeInPixels + GameGUI.fontSizeSpacing;
        GameGUI.fontSizeWithSpacing = String(GameGUI.fontSizeInPixels + GameGUI.fontSizeSpacing).concat("px");
        GameGUI.fontSizeTinyInPixels = GameGUI.fontSizeInPixels - 12;
        GameGUI.fontSizeTiny = String(GameGUI.fontSizeTinyInPixels).concat("px");
        GameGUI.fontSizeSmallInPixels = GameGUI.fontSizeInPixels - 8;
        GameGUI.fontSizeSmall = String(GameGUI.fontSizeSmallInPixels).concat("px");
        GameGUI.fontSizeLargeInPixels = GameGUI.fontSizeInPixels + 8;
        GameGUI.fontSizeLarge = String(GameGUI.fontSizeLargeInPixels).concat("px");
        GameGUI.hud.rootContainer.fontSize = GameGUI.fontSize;
        GameGUI.menu.rootContainer.fontSize = GameGUI.fontSize;
        GameGUI.inventoryMenu.resize();
        GameGUI.dialogue.resize();
        GameGUI.characterStats.resize();
        GameGUI.book.resize();
    }
    static getFontSizeInPixels(multiplier = 1) {
        return GameGUI.fontSizeInPixels * multiplier;
    }
    static getFontSize(multiplier = 1) {
        if (multiplier == 1 || isNaN(multiplier)) {
            return GameGUI.fontSize;
        }
        else {
            return String(GameGUI.fontSizeInPixels * multiplier).concat("px");
        }
    }
    static showHUD(_updateChild = true) {
        if (Game.debugMode) console.log("Running GameGUI::showHUD");
        if (GameGUI.locked) {
            return;
        }
        Game.setInterfaceMode(InterfaceModeEnum.CHARACTER);
        if (_updateChild === true) {
            GameGUI.hideMenu(false);
        }
        GameGUI.hud.rootContainer.isVisible = true;
    }
    static hideHUD(_updateChild = false) {
        if (Game.debugMode) console.log("Running GameGUI::hideHUD");
        if (GameGUI.locked) {
            return;
        }
        if (_updateChild === true) {
            GameGUI.showMenu(false);
        }
        GameGUI.hud.rootContainer.isVisible = false;
    }
    static _hideHUDChildren() {
        for (var _i = GameGUI.hud.rootContainer.children.length - 1; _i > -1; _i--) {
            GameGUI.hud.rootContainer.children[_i].isVisible = false;
        }
    }
    static isHUDVisible() {
        return GameGUI.hud.rootContainer.isVisible;
    }
    static setHUDVisible(_boolean) {
        if (GameGUI.locked) {
            return;
        }
        if (_boolean === true) {
            GameGUI.hud.rootContainer.isVisible = true;
        }
        else {
            GameGUI.hud.rootContainer.isVisible = false;
        }
    }
    static showMenu(_updateChild = true) {
        if (Game.debugMode) console.log("Running GameGUI::showMenu");
        if (GameGUI.locked) {
            return;
        }
        Game.setInterfaceMode(InterfaceModeEnum.MENU);
        if (_updateChild === true) {
            GameGUI.hideHUD(false);
        }
        GameGUI.menu.rootContainer.isVisible = true;
    }
    static hideMenu(_updateChild = false) {
        if (Game.debugMode) console.log("Running GameGUI::hideMenu");
        if (GameGUI.locked) {
            return;
        }
        Game.setInterfaceMode(InterfaceModeEnum.CHARACTER);
        if (_updateChild === true) {
            GameGUI.showHUD(false);
        }
        GameGUI.menu.rootContainer.isVisible = false;
    }
    static _hideMenuChildren() {
        for (var _i = GameGUI.menu.rootContainer.children.length - 1; _i > -1; _i--) {
            GameGUI.menu.rootContainer.children[_i].isVisible = false;
        }
    }
    static isMenuVisible() {
        return GameGUI.menu.rootContainer.isVisible;
    }
    static setMenuVisible(_boolean) {
        if (GameGUI.locked) {
            return;
        }
        if (_boolean === true) {
            GameGUI.menu.rootContainer.isVisible = true;
        }
        else {
            GameGUI.menu.rootContainer.isVisible = false;
        }
    }
    static _generateCrosshair() {
        if (Game.debugMode) console.log("Running GameGUI::_generateCrosshair");
        let crosshair = new BABYLON.GUI.Ellipse("crosshair");
        crosshair.width = "15px";
        crosshair.background = "white";
        crosshair.height = "15px";
        crosshair.color = "black";
        crosshair.alpha = GameGUI.alpha;
        crosshair.isVisible = false;
        crosshair.zIndex = 10;
        return crosshair;
    }
    static showCrosshair() {
        if (GameGUI.locked) {
            return;
        }
        GameGUI.crosshair.isVisible = true;
    }
    static hideCrosshair() {
        if (GameGUI.locked) {
            return;
        }
        GameGUI.crosshair.isVisible = false;
    }
    static _generateCharacterChoiceMenu() {
        if (Game.debugMode) console.log("Running GameGUI::_generateCharacterChoiceMenu");
        let characterChoiceMenuContainer = new BABYLON.GUI.Grid("characterChoiceMenu");
        let nameLabel = GameGUI.createTextBlock("nameLabel");
        GameGUI._nameInput = GameGUI.createInputText("nameInput");
        let ageLabel = GameGUI.createTextBlock("ageLabel");
        GameGUI._ageInput = GameGUI.createInputText("ageInput");
        let buttonKBLayoutLabel = GameGUI.createTextBlock("kbLayoutLabel");
        let buttonKBLayoutContainer = new BABYLON.GUI.Grid("kbLayoutContainer");
        let buttonKBLayoutQwerty = GameGUI.createSimpleButton("kbLayoutQwerty", "QWERTY");
        let buttonKBLayoutDvorak = GameGUI.createSimpleButton("kbLayoutDvorak", "Dvorak");
        let buttonKBLayoutAzerty = GameGUI.createSimpleButton("kbLayoutAzerty", "AZERTY");
        let submitOnline = GameGUI.createSimpleButton("submitOnline", "Online");
        let submitOffline = GameGUI.createSimpleButton("submitOffline", "Offline");
        let urlLabel = GameGUI.createTextBlock("urlLabel");
        let urlButton = GameGUI.createSimpleButton("urlButton", "https://github.com/armasyll/psde");
        
        characterChoiceMenuContainer.zIndex = 90;
        characterChoiceMenuContainer.height = 0.75;
        characterChoiceMenuContainer.width = 0.75;
        characterChoiceMenuContainer.background = GameGUI.background;
        characterChoiceMenuContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        characterChoiceMenuContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        characterChoiceMenuContainer.addColumnDefinition(0.5, false);
        characterChoiceMenuContainer.addColumnDefinition(0.5, false);
        characterChoiceMenuContainer.addRowDefinition(GameGUI.fontSizeInPixels * 2, true);
        characterChoiceMenuContainer.addRowDefinition(GameGUI.fontSizeInPixels * 2, true);
        characterChoiceMenuContainer.addRowDefinition(GameGUI.fontSizeInPixels * 2, true);
        characterChoiceMenuContainer.addRowDefinition(GameGUI.fontSizeInPixels * 2, true);
        characterChoiceMenuContainer.addRowDefinition(GameGUI.fontSizeInPixels * 2, true);
        buttonKBLayoutContainer.addColumnDefinition(0.3, false);
        buttonKBLayoutContainer.addColumnDefinition(0.3, false);
        buttonKBLayoutContainer.addColumnDefinition(0.3, false);
        buttonKBLayoutContainer.addRowDefinition(1.0, false);

        urlLabel.text = "GitHub: ";
        urlLabel.width = 1.0;

        urlButton.width = 1.0;

        nameLabel.text = "Name: ";
        nameLabel.height = 1.0;
        nameLabel.width = 1.0;

        GameGUI._nameInput.text = "Player";
        GameGUI._nameInput.height = 1.0;
        GameGUI._nameInput.width = 1.0;

        ageLabel.text = "Age: ";
        ageLabel.height = 1.0;
        ageLabel.width = 1.0;

        GameGUI._ageInput.text = "18";
        GameGUI._ageInput.height = 1.0;
        GameGUI._ageInput.width = 1.0;

        buttonKBLayoutLabel.text = "Keyboard Layout: ";
        buttonKBLayoutLabel.height = 1.0;
        buttonKBLayoutLabel.width = 1.0;

        buttonKBLayoutQwerty.height = 1.0;
        buttonKBLayoutQwerty.width = 1.0;
        buttonKBLayoutDvorak.height = 1.0;
        buttonKBLayoutDvorak.width = 1.0;
        buttonKBLayoutAzerty.height = 1.0;
        buttonKBLayoutAzerty.width = 1.0;

        submitOffline.width = 1.0;

        submitOnline.width = 1.0;

        GameGUI._nameInput.onTextChangedObservable.add(function() {
            GameGUI._nameInput.text = Tools.filterID(GameGUI._nameInput.text);
        });
        GameGUI._ageInput.onTextChangedObservable.add(function() {
            GameGUI._ageInput.text = String(Tools.filterInt(GameGUI._ageInput.text));
        });
        buttonKBLayoutQwerty.onPointerUpObservable.add(function() {
            AbstractControls.initQwertyKeyboardControls();
            Game.updateMenuKeyboardDisplayKeys();
        });
        buttonKBLayoutDvorak.onPointerUpObservable.add(function() {
            AbstractControls.initDvorakKeyboardControls();
            Game.updateMenuKeyboardDisplayKeys();
        });
        buttonKBLayoutAzerty.onPointerUpObservable.add(function() {
            AbstractControls.initAzertyKeyboardControls();
            Game.updateMenuKeyboardDisplayKeys();
        });
        urlButton.onPointerUpObservable.add(function() {
            window.open('https://github.com/armasyll/psde', '_blank');
        });
        submitOnline.onPointerClickObservable.add(function() {
            let doNotPassGo = false;
            GameGUI._nameInput.text = Tools.filterID(GameGUI._nameInput.text);
            GameGUI._ageInput.text = Tools.filterInt(GameGUI._ageInput.text)
            if (GameGUI._nameInput.text.length < 1) {
                GameGUI._nameInput.color = GameGUI.colorDanger;
                GameGUI._nameInput.background = GameGUI.backgroundDanger;
                doNotPassGo = true;
            }
            else {
                GameGUI._nameInput.color = GameGUI.color;
                GameGUI._nameInput.background = GameGUI.background;
            }
            if (Number.parseInt(GameGUI._ageInput.text) <= 0) {
                GameGUI._ageInput.color = GameGUI.colorDanger;
                GameGUI._ageInput.background = GameGUI.backgroundDanger;
                doNotPassGo = true;
            }
            else {
                GameGUI._ageInput.color = GameGUI.color;
                GameGUI._ageInput.background = GameGUI.background;
            }
            if (!doNotPassGo) {
                if (!Game.hasPlayerController()) {
                    Game.setPlayerCell("apartmentCell");
                    Game.createPlayer("00000000-0000-0000-0000-000000000000", GameGUI._nameInput.text, "It you :v", "genericCharacterIcon", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FOX, SexEnum.MALE, GameGUI._ageInput.text, "foxM", "foxRed", new BABYLON.Vector3(3, 0, -17), undefined, undefined, {eyes:EyeEnum.CIRCLE, eyesColour:"green"});
                }
                if (!Client.isOnline()) {
                    Client.connect();
                }
                GameGUI.hideCharacterChoiceMenu();
                GameGUI.hideMenu();
                GameGUI.showHUD();
            }
        });
        submitOffline.onPointerClickObservable.add(function() {
            let doNotPassGo = false;
            GameGUI._nameInput.text = Tools.filterID(GameGUI._nameInput.text);
            GameGUI._ageInput.text = Tools.filterInt(GameGUI._ageInput.text)
            if (GameGUI._nameInput.text.length < 1) {
                GameGUI._nameInput.color = GameGUI.colorDanger;
                GameGUI._nameInput.background = GameGUI.backgroundDanger;
                doNotPassGo = true;
            }
            else {
                GameGUI._nameInput.color = GameGUI.color;
                GameGUI._nameInput.background = GameGUI.background;
            }
            if (Number.parseInt(GameGUI._ageInput.text) <= 0) {
                GameGUI._ageInput.color = GameGUI.colorDanger;
                GameGUI._ageInput.background = GameGUI.backgroundDanger;
                doNotPassGo = true;
            }
            else {
                GameGUI._ageInput.color = GameGUI.color;
                GameGUI._ageInput.background = GameGUI.background;
            }
            if (!doNotPassGo) {
                if (!(Game.hasPlayerController())) {
                    Game.setPlayerCell("apartmentCell");
                    Game.createPlayer("00000000-0000-0000-0000-000000000000", GameGUI._nameInput.text, "It you :v", "genericCharacterIcon", CreatureTypeEnum.HUMANOID, CreatureSubTypeEnum.FOX, SexEnum.MALE, GameGUI._ageInput.text, "foxM", "foxRed", new BABYLON.Vector3(3, 0, -17), undefined, undefined, {eyes:EyeEnum.CIRCLE, eyesColour:"green"});
                }
                if (Client.isOnline()) {
                    Client.disconnect();
                }
                GameGUI.hideCharacterChoiceMenu();
                GameGUI.hideMenu();
                GameGUI.showHUD();
            }
        });

        characterChoiceMenuContainer.addControl(nameLabel, 0, 0);
        characterChoiceMenuContainer.addControl(GameGUI._nameInput, 0, 1);
        characterChoiceMenuContainer.addControl(ageLabel, 1, 0);
        characterChoiceMenuContainer.addControl(GameGUI._ageInput, 1, 1);
        characterChoiceMenuContainer.addControl(buttonKBLayoutLabel, 2, 0);
        characterChoiceMenuContainer.addControl(buttonKBLayoutContainer, 2, 1);
            buttonKBLayoutContainer.addControl(buttonKBLayoutQwerty, 0, 0);
            buttonKBLayoutContainer.addControl(buttonKBLayoutDvorak, 0, 1);
            buttonKBLayoutContainer.addControl(buttonKBLayoutAzerty, 0, 2);
        characterChoiceMenuContainer.addControl(submitOffline, 3, 0);
        characterChoiceMenuContainer.addControl(submitOnline, 3, 1);
        characterChoiceMenuContainer.addControl(urlLabel, 4, 0);
        characterChoiceMenuContainer.addControl(urlButton, 4, 1);
        characterChoiceMenuContainer.isVisible = false;
        return characterChoiceMenuContainer;
    }
    static showCharacterChoiceMenu() {
        if (Game.debugMode) console.log("Running GameGUI::showCharacterChoiceMenu");
        if (GameGUI.locked) {
            return;
        }
        GameGUI.hideHUD()
        GameGUI.showMenu();
        GameGUI._hideMenuChildren();
        GameGUI.characterChoiceMenu.isVisible = true;
    }
    static hideCharacterChoiceMenu() {
        if (GameGUI.locked) {
            return;
        }
        GameGUI.characterChoiceMenu.isVisible = false;
    }
    static createSimpleButton(...params) {
        let button = BABYLON.GUI.Button.CreateSimpleButton(...params);
        button.fontSize = GameGUI.fontSize;
        button.color = GameGUI.color;
        button.background = GameGUI.focusedBackground;
        button.thickness = 0;
        button.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        button.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        button.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        return button;
    }
    static createImageButton(...params) {
        let button = BABYLON.GUI.Button.CreateImageButton(...params);
        button.fontSize = GameGUI.fontSize;
        button.color = GameGUI.color;
        button.background = GameGUI.focusedBackground;
        button.thickness = 0;
        button.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        button.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        button.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        return button;
    }
    static createCheckbox(...params) {
        let checkbox = new BABYLON.GUI.Checkbox(...params);
        checkbox.color = GameGUI.color;
        checkbox.disabledColor = GameGUI.background;
        checkbox.disabledColorItem = GameGUI.color;
        checkbox.thickness = 0;
        checkbox.checkSizeRatio = 1.0;
        checkbox.isChecked = false;
        checkbox.background = null;
        return checkbox;
    }
    static createInputText(...params) {
        let inputText = new BABYLON.GUI.InputText(...params);
        inputText.fontSize = GameGUI.fontSize;
        inputText.color = GameGUI.color;
        inputText.focusedBackground = GameGUI.focusedBackground;
        inputText.disabledColorItem = GameGUI.color;
        inputText.thickness = 0;
        inputText.background = null;
        return inputText;
    }
    static createTextBlock(...params) {
        let textBlock = new BABYLON.GUI.TextBlock(...params);
        textBlock.fontSize = GameGUI.fontSize;
        textBlock.color = GameGUI.color;
        textBlock.disabledColorItem = GameGUI.color;
        textBlock.thickness = 0;
        textBlock.background = null;
        return textBlock;
    }
    static createRectangle(...params) {
        let rectangle = new BABYLON.GUI.Rectangle(...params);
        rectangle.color = GameGUI.color;
        rectangle.disabledColorItem = GameGUI.color;
        rectangle.thickness = 0;
        rectangle.background = GameGUI.background;
        return rectangle;
    }
    static createStackPanel(...params) {
        let stackPanel = new BABYLON.GUI.StackPanel(...params);
        stackPanel.color = GameGUI.color;
        stackPanel.disabledColorItem = GameGUI.color;
        stackPanel.thickness = 0;
        stackPanel.background = GameGUI.background;
        return stackPanel;
    }
    /**
     * 
     * @param {string} [id] 
     * @param {string} title 
     * @param {string} [subTitle] 
     * @param {string} [iconPath] 
     */
    static _generateButton(id = "", title = "", subTitle = "", iconPath = null) {
        id = Game.filterID(id);
        let button = new BABYLON.GUI.Button(id);
        button.width = GameGUI.getFontSize(9);
        button.height = GameGUI.getFontSize(2);
        if (typeof iconPath == "string") {
            let buttonImage = new BABYLON.GUI.Image("", iconPath);
            buttonImage.width = GameGUI.getFontSize(2);
            buttonImage.height = GameGUI.getFontSize(2);
            buttonImage.left = "-40%";
            buttonImage.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
            button.addControl(buttonImage);
        }
        let buttonText = new BABYLON.GUI.TextBlock();
        buttonText.width = GameGUI.getFontSize(7);
        buttonText.height = GameGUI.getFontSize(2);
        buttonText.top = "5%";
        buttonText.left = "10%";
        buttonText.text = title;
        buttonText.color = GameGUI.color;
        button.addControl(buttonText);
        return button;
    }
    static _generateTargetActionTooltip() {
        if (Game.debugMode) console.log("Running GameGUI::_generateTargetActionTooltip");
        let tooltip = GameGUI.createRectangle("targetActionTooltip");
            tooltip.width = 0.125;
            tooltip.height = 0.075;
            tooltip.top = "3.75%";
            tooltip.left = "6.25%";
            tooltip.alpha = GameGUI.alpha;
            tooltip.isVertical = false;
        let keyName = GameGUI.createTextBlock();
            keyName.text = "E";
            keyName.top = 0;
            keyName.left = "10%";
            keyName.textHorizontalAlignment = BABYLON.GUI.HORIZONTAL_ALIGNMENT_LEFT;
        let actionPanelActionName = GameGUI.createTextBlock();
            actionPanelActionName.text = "";
            actionPanelActionName.height = 0.5;
            //actionPanelActionName.top = "-25%";
            actionPanelActionName.left = "25%";
        let actionPanelTargetName = GameGUI.createTextBlock();
            actionPanelTargetName.text = "";
            actionPanelTargetName.height = 0.5;
            actionPanelTargetName.top = "25%";
            actionPanelTargetName.left = "25%";
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
    static setActionTooltipLetter(_string = String.fromCharCode(AbstractControls.useTargetedEntityCode)) {
        GameGUI.actionTooltip.children[0].text = _string;
    }
    /**
     * Sets the action tooltip's top right text.
     * @param {String} _string Top right text.
     */
    static setActionTooltipString(_string = "Use") {
        if (Game.debugMode) console.log("Running GameGUI::setActionTooltipString");
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
        if (Game.debugMode) console.log("Running GameGUI::setActionTooltipTarget");
        GameGUI.actionTooltip.children[2].text = _string;
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
        if (GameGUI.locked) {
            return;
        }
        if (!GameGUI.actionTooltipLocked) {
            GameGUI.actionTooltip.isVisible = true;
        }
    }
    /**
     * Hide the action tooltip.
     */
    static hideActionTooltip() {
        if (GameGUI.locked) {
            return;
        }
        if (!GameGUI.actionTooltipLocked) {
            GameGUI.actionTooltip.isVisible = false;
        }
    }
    static lockActionTooltip() {
        GameGUI.actionTooltipLocked = true;
    }
    static unlockActionTooltip() {
        GameGUI.actionTooltipLocked = false;
    }
    /**
     * A group of circular buttons arranged in a circle.
     * @return {BABYLON.GUI.Container} Circular container of buttons.
     */
    static _generateActionsRadialMenu() {
        if (Game.debugMode) console.log("Running GameGUI::_generateActionsRadialMenu");
        let actionsRadialMenu = new BABYLON.GUI.Ellipse("actionsRadialMenu", 0);
        actionsRadialMenu.width = String(Game.renderWidth / 4) + "px";
        actionsRadialMenu.height = actionsRadialMenu.width;
        actionsRadialMenu.background = GameGUI.background;
        actionsRadialMenu.color = GameGUI.color;
        actionsRadialMenu.alpha = GameGUI.containerAlpha;
        actionsRadialMenu.isVisible = false;
        actionsRadialMenu.zIndex = 12;
        return actionsRadialMenu;
    }
    static populateRadialMenuWith(entityController) {
        if (!(entityController instanceof EntityController)) {
            if (EntityController.has(entityController)) {
                entityController = EntityController.get(entityController);
            }
            else {
                return 2;
            }
        }
        GameGUI.radialMenuOptions.clear();
        if (Object.keys(entityController.availableActions).length == 0) {
            return 1;
        }
        for (let actionID in entityController.availableActions) {
            if (!entityController.hasHiddenAvailableAction(actionID)) {
                GameGUI.addRadialMenuOption(actionID, entityController);
            }
        }
        return 0;
    }
    static populateRadialMenuWithTarget() {
        if (Game.playerController.hasTarget()) {
            return GameGUI.populateRadialMenuWith(Game.playerController.getTarget());
        }
        else {
            GameGUI.clearRadialMenu();
        }
        return 0;
    }
    static addRadialMenuOption(actionID, entityController) {
        if (!ActionEnum.properties.hasOwnProperty(actionID)) {
            if (ActionEnum.hasOwnProperty(actionID)) {
                actionID = ActionEnum[actionID];
            }
            else {
                return 2;
            }
        }
        else {
            actionID = Number.parseInt(actionID);
        }
        if (!(entityController instanceof EntityController)) {
            if (EntityController.has(entityController)) {
                entityController = EntityController.get(entityController);
            }
            else {
                return 2;
            }
        }
        GameGUI.radialMenuOptions.push({
            action:actionID,
            target:entityController
        });
        if (GameGUI.radialMenu.isVisible) {
            GameGUI.updateRadialMenu();
        }
        return 0;
    }
    static removeRadialMenuOption(actionID) {
        if (!ActionEnum.properties.hasOwnProperty(actionID)) {
            if (ActionEnum.hasOwnProperty(actionID)) {
                actionID = ActionEnum[actionID];
            }
            else {
                return 2;
            }
        }
        else {
            actionID = Number.parseInt(actionID);
        }
        for (var _i = 0; _i < GameGUI.radialMenuOptions.length; _i++) {
            if (GameGUI.radialMenuOptions[_i].action == actionID) {
                GameGUI.radialMenuOptions.splice(_i, 1);
                _i = _radialMenuOptions.length;
            }
        }
        if (GameGUI.radialMenu.isVisible) {
            GameGUI.updateRadialMenu();
        }
        return 0;
    }
    static clearRadialMenu() {
        for (let i = GameGUI.radialMenu.children.length - 1; i >= 0; i--) {
            GameGUI.radialMenu.children[i].dispose();
        }
        GameGUI.radialMenuOptions.clear();
        return 0;
    }
    static showRadialMenu(pointerRelease = true, updateChild = true) {
        if (GameGUI.locked) {
            return 1;
        }
        if (GameGUI.radialMenuOptions.length == 0) {
            return 1;
        }
        if (updateChild) {
            GameGUI.hideActionTooltip();
            GameGUI.lockActionTooltip();
        }
        GameGUI.radialMenu.isVisible = true;
        return 0;
    }
    static hideRadialMenu(pointerLock = true, updateChild = true) {
        if (GameGUI.locked) {
            return 1;
        }
        GameGUI.radialMenu.isVisible = false;
        if (updateChild) {
            GameGUI.unlockActionTooltip();
            GameGUI.showActionTooltip();
        }
        return 0;
    }
    static updateRadialMenu() {
        for (let i = GameGUI.radialMenu.children.length - 1; i >= 0; i--) {
            GameGUI.radialMenu.children[i].dispose();
        }
        let xPosition = 0;
        let yPosition = 0;
        let button = GameGUI.createSimpleButton("closeRadialMenu", "X");
        button.width = "24px";
        button.height = "24px";
        button.onPointerClickObservable.add(function() {
            GameGUI.hideRadialMenu();
        });
        button._moveToProjectedPosition(new BABYLON.Vector2(xPosition, yPosition));
        GameGUI.radialMenu.addControl(button);
        if (GameGUI.radialMenuOptions.length > 0) {
            let name = "";
            let key = "";
            let value = 0;
            for (let i = 0; i < GameGUI.radialMenuOptions.length; i++) {
                value = GameGUI.radialMenuOptions[i].action;
                name = ActionEnum.properties[GameGUI.radialMenuOptions[i].action].name;
                key = ActionEnum.properties[GameGUI.radialMenuOptions[i].action].key;
                xPosition = (GameGUI.radialMenu.widthInPixels/3) * Math.cos(BABYLON.Tools.ToRadians(360/GameGUI.radialMenuOptions.length*i - 90));
                yPosition = (GameGUI.radialMenu.widthInPixels/3) * Math.sin(BABYLON.Tools.ToRadians(360/GameGUI.radialMenuOptions.length*i - 90));
                button = GameGUI.createSimpleButton(String(`action${name}Button`), name);
                button.width = "96px";
                button.height = "24px";
                button._moveToProjectedPosition(new BABYLON.Vector2(xPosition, yPosition));
                button.onPointerClickObservable.add(function() {
                    GameGUI.hideRadialMenu();
                    Game.doEntityAction(GameGUI.radialMenuOptions[i].target, Game.player, value);
                });
                GameGUI.radialMenu.addControl(button);
            }
        }
    }
    static lock() {
        GameGUI.locked = true;
    }
    static unlock() {
        GameGUI.locked = false;
    }
    static setLocked(locked) {
        if (locked == true) {
            return GameGUI.lock();
        }
        return GameGUI.unlock();
    }
}