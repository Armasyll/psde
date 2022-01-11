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
    static getClassName() {
        return "GameGUI";
    }
    static initialize() {
        if (Game.debugMode) BABYLON.Tools.Log("Initializing GameGUI");
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
        GameGUI.titleBarHeightInPixels = GameGUI.getFontSize(2);
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
        if (Game.debugMode) BABYLON.Tools.Log("Attempting to create an advanced dynamic texture");
        //GameGUI.controller = new BABYLON.GUI.AdvancedDynamicTexture("menu", Game.renderWidth, Game.renderHeight, Game.scene, false, BABYLON.Texture.NEAREST_SAMPLINGMODE, false);
        GameGUI.controller = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("GameGUI");
        if (Game.debugMode) BABYLON.Tools.Log("Yes! :V");
        GameGUI.controller.rootContainer.isVisible = false;
        GameGUI.controller.rootContainer.zIndex = 5;

        GameGUI.windowStack = new Array();

        GameGUI.locked = false;
        GameGUI.initialized = true;

        GameGUI.hud = HUDGameGUI;
        GameGUI.hud.initialize();
        GameGUI.controller.addControl(GameGUI.hud.getController());

        GameGUI.cursor = CursorGameGUI;
        GameGUI.cursor.initialize();
        GameGUI.controller.addControl(GameGUI.cursor.getController());

        GameGUI.chat = ChatGameGUI;
        GameGUI.chat.initialize();
        GameGUI.controller.addControl(GameGUI.chat.getController());

        GameGUI.dialogue = DialogueGameGUI;
        GameGUI.dialogue.initialize();
        GameGUI.controller.addControl(GameGUI.dialogue.getController());

        GameGUI.debugMenu = DebugGameGUI;
        GameGUI.debugMenu.initialize();
        GameGUI.controller.addControl(GameGUI.debugMenu.getSkyboxController());

        GameGUI.inventoryMenu = InventoryGameGUI;
        GameGUI.inventoryMenu.initialize();
        GameGUI.controller.addControl(GameGUI.inventoryMenu.getController());

        GameGUI.inventoryEquipmentMenu = InventoryEquipmentGameGUI;
        GameGUI.inventoryEquipmentMenu.initialize();
        GameGUI.controller.addControl(GameGUI.inventoryEquipmentMenu.getController());

        GameGUI.characterStats = CharacterStatsGameGUI;
        GameGUI.characterStats.initialize();
        GameGUI.controller.addControl(GameGUI.characterStats.getController());

        GameGUI.book = BookGameGUI;
        GameGUI.book.initialize();
        GameGUI.controller.addControl(GameGUI.book.getController());

        GameGUI.characterChoiceMenu = GameGUI._generateCharacterChoiceMenu();
        GameGUI.controller.addControl(GameGUI.characterChoiceMenu);

        GameGUI.resize();
        return 0;
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
        GameGUI.controller.rootContainer.fontSize = GameGUI.fontSize;
        GameGUI.cursor.resize();
        GameGUI.inventoryMenu.resize();
        GameGUI.inventoryEquipmentMenu.resize();
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

    static show() {
        GameGUI.controller.getChildren()[0].isVisible = true;
        return 0;
    }
    static hide() {
        if (Game.debugMode) BABYLON.Tools.Log("Running GameGUI.hide");
        if (GameGUI.locked) {
            return 0;
        }
        for (let i = 0; i < GameGUI.windowStack.length; i++) {
            GameGUI.windowStack[i].hide(false);
        }
        GameGUI.afterHideMenuChildren();
        return 0;
    }

    static hideLastMenuChild() {
        if (GameGUI.windowStack.length > 0) {
            let lastWindow = GameGUI.windowStack[GameGUI.windowStack.length - 1];
            lastWindow.hide(true);
        }
        return 0;
    }
    static afterHideMenuChildren() {
        if (GameGUI.interfaceMode == InterfaceModeEnum.CHARACTER && GameGUI.windowStack.length == 0) {
            GameGUI.hud.show();
        }
        return 0;
    }
    static _generateCharacterChoiceMenu() {
        if (Game.debugMode) BABYLON.Tools.Log("Running GameGUI._generateCharacterChoiceMenu");
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
            /*if (!doNotPassGo) {
                if (!Game.hasPlayerController()) {
                    Game.entityLogicWorkerPostMessage("loadCellAndSetPlayerAt", 0, { "cellID": Game.selectedCellID, "position": [0,0,0] });
                }
                if (!Client.isOnline()) {
                    Client.connect();
                }
                GameGUI.hideCharacterChoiceMenu();
                GameGUI.hide();
                GameGUI.hud.show();
            }*/
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
                    Game.loadCellAndSetPlayerAt();
                }
                if (Client.isOnline()) {
                    Client.disconnect();
                }
                GameGUI.hideCharacterChoiceMenu();
                GameGUI.hide();
                GameGUI.hud.show();
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
        if (Game.debugMode) BABYLON.Tools.Log("Running GameGUI.showCharacterChoiceMenu");
        if (GameGUI.locked) {
            return;
        }
        GameGUI.hud.hide();
        GameGUI.show();
        GameGUI.characterChoiceMenu.isVisible = true;
    }
    static hideCharacterChoiceMenu() {
        if (GameGUI.locked) {
            return;
        }
        GameGUI.characterChoiceMenu.isVisible = false;
    }
    /**
     * 
     * @param {(string|undefined)} [name] 
     * @param {string} [text] 
     * @returns {BABYLON.GUI.Button}
     */
    static createSimpleButton(name, text) {
        name = Tools.filterID(name);
        let button = BABYLON.GUI.Button.CreateSimpleButton(name, text);
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
    /**
     * 
     * @param {(string|undefined)} [name] 
     * @param {string} [text] 
     * @param {string} [imageUri]
     * @returns {BABYLON.GUI.Button}
     */
    static createImageButton(name, text, imageUri) {
        name = Tools.filterID(name);
        let button = BABYLON.GUI.Button.CreateImageButton(name, text, imageUri);
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
    /**
     * 
     * @param {string} [text] 
     * @returns {BABYLON.GUI.Checkbox}
     */
    static createCheckbox(name) {
        name = Tools.filterID(name);
        let checkbox = new BABYLON.GUI.Checkbox(name);
        checkbox.color = GameGUI.color;
        checkbox.disabledColor = GameGUI.background;
        checkbox.disabledColorItem = GameGUI.color;
        checkbox.thickness = 0;
        checkbox.checkSizeRatio = 1.0;
        checkbox.isChecked = false;
        checkbox.background = null;
        return checkbox;
    }
    /**
     * 
     * @param {(string|undefined)} [name] 
     * @param {string} [text] 
     * @returns {BABYLON.GUI.InputText}
     */
    static createInputText(name, text) {
        name = Tools.filterID(name);
        let inputText = new BABYLON.GUI.InputText(name, text);
        inputText.fontSize = GameGUI.fontSize;
        inputText.color = GameGUI.color;
        inputText.focusedBackground = GameGUI.focusedBackground;
        inputText.disabledColorItem = GameGUI.color;
        inputText.thickness = 0;
        inputText.background = null;
        return inputText;
    }
    /**
     * 
     * @param {(string|undefined)} [name] 
     * @param {string} [text] 
     * @returns {BABYLON.GUI.TextBlock}
     */
    static createTextBlock(name, text) {
        name = Tools.filterID(name);
        let textBlock = new BABYLON.GUI.TextBlock(name, text);
        textBlock.fontSize = GameGUI.fontSize;
        textBlock.color = GameGUI.color;
        textBlock.disabledColorItem = GameGUI.color;
        textBlock.thickness = 0;
        textBlock.background = null;
        return textBlock;
    }
    /**
     * 
     * @param {(string|undefined)} [name] 
     * @param {string} [text] 
     * @returns {BABYLON.GUI.Rectangle}
     */
    static createRectangle(name) {
        name = Tools.filterID(name);
        let rectangle = new BABYLON.GUI.Rectangle(name);
        rectangle.color = GameGUI.color;
        rectangle.disabledColorItem = GameGUI.color;
        rectangle.thickness = 0;
        rectangle.background = null;
        return rectangle;
    }
    /**
     * 
     * @param {(string|undefined)} [name] 
     * @returns {BABYLON.GUI.StackPanel}
     */
    static createStackPanel(name) {
        name = Tools.filterID(name);
        let stackPanel = new BABYLON.GUI.StackPanel(name);
        stackPanel.color = GameGUI.color;
        stackPanel.disabledColorItem = GameGUI.color;
        stackPanel.thickness = 0;
        stackPanel.background = null;
        return stackPanel;
    }
    /**
     * 
     * @param {(string|undefined)} [name] 
     * @param {string} [text] 
     * @returns {[BABYLON.GUI.StackPanel, BABYLON.GUI.TextBlock]}
     */
    static createContainedTextBlock(name, text) {
        name = Tools.filterID(name);
        let stackPanel = GameGUI.createStackPanel(String(name).concat("StackPanel"));
        stackPanel.isVertical = true;
        let textBlock = GameGUI.createTextBlock(String(name).concat("TextBlock"));
        textBlock.text = text;
        textBlock.heightInPixels = GameGUI.fontSizeInPixels;
        stackPanel.addControl(textBlock);
        return [stackPanel, textBlock];
    }
    static removeControl(control) {
        if (control.children instanceof Array && control.children.length > 0) {
            for (let i = control.children.length - 1; i >= 0; i--) {
                GameGUI.removeControl(control.children[i]);
            }
        }
        if (control.dispose instanceof Function) {
            control.dispose();
        }
        return 0;
    }
    /**
     * 
     * @param {string} [id] 
     * @param {string} title 
     * @param {string} [subTitle] 
     * @param {string} [iconPath] 
     */
    static createButton(id = "", title = "", subTitle = "", iconPath = null) {
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
    static lock() {
        GameGUI.locked = true;
        return 0;
    }
    static unlock() {
        GameGUI.locked = false;
        return 0;
    }
    static setLocked(locked) {
        if (locked == true) {
            return GameGUI.lock();
        }
        return GameGUI.unlock();
    }
    /**
     * 
     * @param {string} id 
     * @param {string} [titleString] 
     * @param {number} [widthInPixels] 
     * @param {number} [heightInPixels] 
     * @param {number} [bodyContainerType] 0 for ScrollViewer, 1 for Rectangle, 2 for StackPanel
     * @returns {array} [controller, titleBar, title, closeButton, bodyContainer]
     */
    static createWindow(id = "", titleString = "Title :V", widthInPixels = Game.renderWidth, heightInPixels = Game.renderHeight, bodyContainerType = 0) {
        titleString = Tools.filterID(titleString);
        widthInPixels = Tools.filterInt(widthInPixels) || Game.renderWidth;
        heightInPixels = Tools.filterInt(heightInPixels) || Game.renderHeight;
        let controller = GameGUI.createStackPanel(id);
            controller.width = String(widthInPixels).concat("px");
            controller.height = String(heightInPixels).concat("px");
            controller.isVertical = true;
            controller.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            controller.isVisible = false;
            controller.background = GameGUI.background;
        let titleBar = GameGUI.createStackPanel(String(id).concat("TitleBar"));
            titleBar.width = controller.width;
            titleBar.height = GameGUI.titleBarHeightInPixels;
            titleBar.isVertical = false;
            titleBar.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        let title = GameGUI.createTextBlock(String(id).concat("Title"));
            title.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            title.width = String(titleBar.widthInPixels - GameGUI.getFontSizeInPixels(2)).concat("px");
            title.text = titleString;
            titleBar.addControl(title);
        let closeButton = GameGUI.createSimpleButton(String(id).concat("CloseButton"), "X");
            closeButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            closeButton.width = GameGUI.getFontSize(2);
            closeButton.height = GameGUI.getFontSize(2);
            titleBar.addControl(closeButton);
        controller.addControl(titleBar);
        let bodyContainer = null;
        if (bodyContainerType == 0) {
            bodyContainer = new BABYLON.GUI.ScrollViewer(String(id).concat("BodyContainer"));
            bodyContainer._horizontalBarSpace.isVisible = false;
            bodyContainer._horizontalBarSpace.isEnabled = false;
        }
        else if (bodyContainerType == 1) {
            bodyContainer = new BABYLON.GUI.Rectangle(String(id).concat("BodyContainer"));
        }
        else {
            bodyContainer = GameGUI.createStackPanel(String(id).concat("BodyContainer"));
        }
        bodyContainer.width = controller.width;
        bodyContainer.height = String(controller.heightInPixels - GameGUI.getFontSizeInPixels(8)).concat("px");
        bodyContainer.thickness = 0;
        bodyContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        controller.addControl(bodyContainer);
        return [controller,titleBar,title,closeButton,bodyContainer];
    }
}