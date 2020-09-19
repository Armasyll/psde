class HTMLGUI {
    constructor() {
        HTMLGUI.initialized = false;
    }
    static className() {
        return "HTMLGUI";
    }
    static initialize() {
        HTMLGUI.locked = false;
        HTMLGUI.initialized = true;

        HTMLGUI.debug = DebugHTMLGUI;
        HTMLGUI.debug.initialize();
        HTMLGUI.chat = ChatHTMLGUI;
        HTMLGUI.chat.initialize();
        HTMLGUI.dialogue = DialogueHTMLGUI;
        HTMLGUI.dialogue.initialize();
        HTMLGUI.inventory = InventoryHTMLGUI;
        HTMLGUI.inventory.initialize();
        HTMLGUI.playerPortrait = PlayerPortraitHTMLGUI;
        HTMLGUI.playerPortrait.initialize();
        HTMLGUI.targetPortrait = TargetPortraitHTMLGUI;
        HTMLGUI.targetPortrait.initialize();
        return 0;
    }
    static resize() {
        return 0;
    }
    static showCrosshair() {

    }
    static hideCrosshair() {

    }
    static setActionTooltipLetter(string = String.fromCharCode(AbstractControls.useTargetedEntityCode)) {

    }
    static setActionTooltipString(string = "Use") {

    }
    static setActionTooltipTarget(string = "") {

    }
    static setActionTooltip(actionString = "", targetString = "") {
        HTMLGUI.setActionTooltipString(_action);
        HTMLGUI.setActionTooltipTarget(_target);
    }
    static showActionTooltip() {

    }
    static hideActionTooltip() {

    }
    static lockActionTooltip() {

    }
    static unlockActionTooltip() {

    }
    static addRadialMenuOption(actionID, abstractEntity) {

    }
    static removeRadialMenuOption(actionID) {

    }
    static clearRadialMenu() {

    }
    static showRadialMenu() {

    }
    static hideRadialMenu() {

    }
    static updateRadialMenu() {

    }
    static lock() {
        HTMLGUI.locked = true;
    }
    static unlock() {
        HTMLGUI.locked = false;
    }
    static setLocked(locked) {
        if (locked == true) {
            return HTMLGUI.lock();
        }
        return HTMLGUI.unlock();
    }
    static showCharacterChoiceMenu() {

    }
}