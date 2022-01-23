/**
 * Null GUI
 */
class NullGUI {
    /**
     * 
     */
    constructor() {
        NullGUI.initialized = false;
    }
    static className() {
        return "NullGUI";
    }
    static initialize() {
        NullGUI.hud = null;
        NullGUI.cursor = null;
        NullGUI.chat = null;
        NullGUI.mainMenu = null;
        NullGUI.dialogue = null;
        NullGUI.debugMenu = null;
        NullGUI.inventoryMenu = null;
        NullGUI.inventoryEquipmentMenu = null;
        NullGUI.characterStats = null;
        NullGUI.book = null;
        NullGUI.initialized = true;
        return 0;
    }
    static getClassName(...params) {}
    static initialize(...params) {}
    static resize(...params) {}
    static getFontSizeInPixels(...params) {}
    static getFontSize(...params) {}
    static show(...params) {}
    static afterShow(...params) {}
    static hide(...params) {}
    static afterHide(...params) {}
    static hideLastMenuChild(...params) {}
    static afterHideMenuChildren(...params) {}
    static addAndInitializeSubClass(...params) {}
    static createSimpleButton(...params) {}
    static createImageButton(...params) {}
    static createCheckbox(...params) {}
    static createInputText(...params) {}
    static createTextBlock(...params) {}
    static createRectangle(...params) {}
    static createStackPanel(...params) {}
    static createContainedTextBlock(...params) {}
    static removeControl(...params) {}
    static createButton(...params) {}
    static lock(...params) {}
    static unlock(...params) {}
    static setLocked(...params) {}
    static createWindow(...params) {}
}