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


        GameGUI.color = "#C3C3C3";
        GameGUI.background = "#0C0C0C";
        GameGUI.backgroundDisabled = "#030303";

        GameGUI.colorDanger = "#FFFFFF";
        GameGUI.backgroundDanger = "#DC3545";
        GameGUI.backgroundDangerDisabled = "#030303";
        
        GameGUI.colorFocused = "#FFFFFF";
        GameGUI.backgroundFocused = "#3C3C3C";
        GameGUI.backgroundFocusedDisabled = "#0C0C0C";

        if (Game.debugMode) BABYLON.Tools.Log("Attempting to create an advanced dynamic texture");
        //GameGUI.controller = new BABYLON.GUI.AdvancedDynamicTexture("menu", Game.renderWidth, Game.renderHeight, Game.scene, false, BABYLON.Texture.NEAREST_SAMPLINGMODE, false);
        GameGUI.controller = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("GameGUI");
        if (Game.debugMode) BABYLON.Tools.Log("Yes! :V");
        GameGUI.controller.rootContainer.isVisible = false;
        GameGUI.controller.rootContainer.zIndex = 5;

        GameGUI.windowStack = new Array();

        GameGUI.locked = false;
        GameGUI.initialized = true;

        GameGUI.addAndInitializeSubClass("hud", HUDGameGUI);
        GameGUI.addAndInitializeSubClass("cursor", CursorGameGUI);
        GameGUI.addAndInitializeSubClass("chat", ChatGameGUI);
        GameGUI.addAndInitializeSubClass("mainMenu", MainMenuGameGUI);
        GameGUI.addAndInitializeSubClass("dialogue", DialogueGameGUI);
        GameGUI.addAndInitializeSubClass("debugMenu", DebugGameGUI);
        GameGUI.addAndInitializeSubClass("inventoryMenu", InventoryGameGUI);
        GameGUI.addAndInitializeSubClass("inventoryEquipmentMenu", InventoryEquipmentGameGUI);
        GameGUI.addAndInitializeSubClass("characterStats", CharacterStatsGameGUI);
        GameGUI.addAndInitializeSubClass("radialMenu", RadialMenuGameGUI);
        GameGUI.addAndInitializeSubClass("book", BookGameGUI);

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
        GameGUI.mainMenu.resize();
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
        GameGUI.controller.rootContainer.isVisible = true;
        return 0;
    }
    static afterShow() {
        Game.checkAndSetInterfaceMode();
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
        GameGUI.radialMenu.hide();
        GameGUI.afterHideMenuChildren();
        return 0;
    }
    static afterHide() {
        Game.checkAndSetInterfaceMode();
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
    static addAndInitializeSubClass(interiorName, classObject) {
        if (!(classObject instanceof Object)) {
            return 1;
        }
        if (!(classObject.hasOwnProperty("initialize")) || typeof classObject.initialize != "function") {
            return 1;
        }
        GameGUI[interiorName] = classObject;
        GameGUI[interiorName].initialize();
        if (classObject.hasOwnProperty("getController")) {
            GameGUI.controller.addControl(GameGUI[interiorName].getController());
        }
        return GameGUI[interiorName];
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
        button.color = GameGUI.colorFocused;
        button.background = GameGUI.backgroundFocused;
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
        button.color = GameGUI.colorFocused;
        button.background = GameGUI.backgroundFocused;
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
        inputText.backgroundFocused = GameGUI.backgroundFocused;
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