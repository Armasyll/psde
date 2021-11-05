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
        if (Game.debugMode) BABYLON.Tools.Log("Initializing NullGUI");
        NullGUI.chat = ChatNullGUI;
        NullGUI._nameInput = "Player";
        NullGUI._ageInput = "18";
        NullGUI.actionTooltip = null;
        NullGUI.actionTooltipLocked = null;
        NullGUI.radialMenu = null;
        NullGUI.radialMenuOptions = null;
        NullGUI.dialogue = DialogueNullGUI;
        NullGUI.characterChoiceMenu = null;
        NullGUI.inventoryMenu = InventoryNullGUI;
        NullGUI.characterStats = CharacterStatsNullGUI;
        NullGUI.debugMenu = DebugNullGUI;
        NullGUI.locked = true;
        NullGUI.crosshair = null;
        NullGUI.actionTooltip = null;
        NullGUI.radialMenu = null;
        NullGUI.playerPortrait = PlayerPortraitNullGUI;
        NullGUI.targetPortrait = TargetPortraitNullGUI;
        NullGUI.initialized = true;
        return 0;
    }
    static _initHUD(...params) {return 0;}
    static _initMenu(...params) {return 0;}
    static resize(...params) {return 0;}
    static getFontSizeInPixels(...params) {return 0;}
    static getFontSize(...params) {return 0;}
    static showHUD(...params) {return 0;}
    static hideHUD(...params) {return 0;}
    static showMenu(...params) {return 0;}
    static hideMenu(...params) {return 0;}
    static _generateCrosshair(...params) {return 0;}
    static showCrosshair(...params) {return 0;}
    static hideCrosshair(...params) {return 0;}
    static _generateCharacterChoiceMenu(...params) {return 0;}
    static showCharacterChoiceMenu(...params) {return 0;}
    static hideCharacterChoiceMenu(...params) {return 0;}
    static createSimpleButton(...params) {return 0;}
    static createImageButton(...params) {return 0;}
    static createCheckbox(...params) {return 0;}
    static createInputText(...params) {return 0;}
    static createTextBlock(...params) {return 0;}
    static createRectangle(...params) {return 0;}
    static createStackPanel(...params) {return 0;}
    static createContainedTextBlock(...params) {return 0;}
    static removeControl(...params) {return 0;}
    static createButton(...params) {return 0;}
    static _generateTargetActionTooltip(...params) {return 0;}
    static setActionTooltipLetter(...params) {return 0;}
    static setActionTooltipString(...params) {return 0;}
    static setActionTooltipTarget(...params) {return 0;}
    static setActionTooltip(...params) {return 0;}
    static showActionTooltip(...params) {return 0;}
    static hideActionTooltip(...params) {return 0;}
    static lockActionTooltip(...params) {return 0;}
    static unlockActionTooltip(...params) {return 0;}
    static _generateActionsRadialMenu(...params) {return 0;}
    static populateRadialMenuWith(...params) {return 0;}
    static populateRadialMenuWithTarget(...params) {return 0;}
    static addRadialMenuOption(...params) {return 0;}
    static removeRadialMenuOption(...params) {return 0;}
    static clearRadialMenu(...params) {return 0;}
    static showRadialMenu(...params) {return 0;}
    static hideRadialMenu(...params) {return 0;}
    static updateRadialMenu(...params) {return 0;}
    static lock(...params) {return 0;}
    static unlock(...params) {return 0;}
    static setLocked(...params) {return 0;}
    static createWindow(...params) {return 0;}
}