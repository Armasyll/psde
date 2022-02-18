/**
 * Action Tooltip Class
 */
class ActionTooltipGameGUI {
    static getClassName() {
        return "ActionTooltipGameGUI";
    }
    static initialize() {
        ActionTooltipGameGUI.controller = null;
        ActionTooltipGameGUI.locked = false;

        ActionTooltipGameGUI.generateController();
        return 0;
    }
    static generateController() {
        if (Game.debugMode) BABYLON.Tools.Log("Running ActionTooltipGameGUI.generateController()");
        ActionTooltipGameGUI.controller = GameGUI.createRectangle("targetActionTooltip");
            ActionTooltipGameGUI.controller.widthInPixels = GameGUI.getFontSizeInPixels() * 12;
            ActionTooltipGameGUI.controller.heightInPixels = GameGUI.getFontSizeInPixels() * 3;
            ActionTooltipGameGUI.controller.topInPixels = ActionTooltipGameGUI.controller.heightInPixels / 2;
            ActionTooltipGameGUI.controller.leftInPixels = ActionTooltipGameGUI.controller.widthInPixels / 2;
            ActionTooltipGameGUI.controller.alpha = GameGUI.alpha;
            ActionTooltipGameGUI.controller.isVertical = false;
            ActionTooltipGameGUI.controller.background = GameGUI.focusedBackground;
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
        ActionTooltipGameGUI.controller.addControl(keyName);
        ActionTooltipGameGUI.controller.addControl(actionPanelActionName);
        ActionTooltipGameGUI.controller.addControl(actionPanelTargetName);
        ActionTooltipGameGUI.controller.isVisible = false;
        ActionTooltipGameGUI.controller.zIndex = 12;
        return ActionTooltipGameGUI.controller;
    }
    static getController() {
        return ActionTooltipGameGUI.controller;
    }
    static resize() {
        ActionTooltipGameGUI.controller.widthInPixels = GameGUI.getFontSizeInPixels() * 12;
        ActionTooltipGameGUI.controller.heightInPixels = GameGUI.getFontSizeInPixels() * 3;
        ActionTooltipGameGUI.controller.topInPixels = ActionTooltipGameGUI.controller.heightInPixels / 2;
        ActionTooltipGameGUI.controller.leftInPixels = ActionTooltipGameGUI.controller.widthInPixels / 2;
        ActionTooltipGameGUI.controller.fontSize = GameGUI.getFontSizeInPixels();
        ActionTooltipGameGUI.controller.children[0].fontSize = GameGUI.getFontSizeInPixels();
        ActionTooltipGameGUI.controller.children[1].fontSize = GameGUI.getFontSizeInPixels();
        ActionTooltipGameGUI.controller.children[2].fontSize = GameGUI.getFontSizeInPixels();
        return 0;
    }
    /**
     * Sets the action tooltip's letter corresponding to Game.useTargetedEntityCode.
     * @param {string} letterText Top left character.
     */
    static setLetter(letterText = String.fromCharCode(AbstractControls.useTargetedEntityCode)) {
        ActionTooltipGameGUI.controller.children[0].text = letterText;
        return 0;
    }
    /**
     * Sets the action tooltip's top right text.
     * @param {String} actionText Top right text.
     */
    static setActionText(actionText = "Use") {
        if (Game.debugMode) BABYLON.Tools.Log("Running ActionTooltipGameGUI.setActionText");
        if (typeof actionText != "string") {
            actionText = "Use";
        }
        else {
            actionText = actionText.capitalize();
        }
        ActionTooltipGameGUI.controller.children[1].text = actionText;
        return 0;
    }
    /**
     * Sets the action tooltip's bottom text. Not used, I think. :D
     * @param {String} targetText Bottom text.
     */
    static setTargetText(targetText = "") {
        if (typeof targetText != "string") {
            targetText = "";
        }
        if (Game.debugMode) BABYLON.Tools.Log("Running ActionTooltipGameGUI.setTargetText");
        ActionTooltipGameGUI.controller.children[2].text = targetText;
        return 0;
    }
    /**
     * Sets the action tooltip's top right and bottom text.
     * @param {String} actionText Top right text.
     * @param {String} targetText Bottom text.
     */
    static set(actionText, targetText = "") {
        ActionTooltipGameGUI.setActionText(actionText);
        ActionTooltipGameGUI.setTargetText(targetText);
        return 0;
    }
    static update() {
        if (!Game.playerController.hasTarget()) {
            return 0;
        }
        let actionID = Tools.filterEnum(Game.playerController.getTarget().defaultAction, ActionEnum);
        if (actionID == -1) {
            return 0;
        }
        if (Game.playerController.hasTarget()) {
            return ActionTooltipGameGUI.set(ActionEnum.properties[actionID].name);
        }
        else {
            ActionTooltipGameGUI.clear();
        }
        return 0;
    }
    /**
     * Show the action tooltip.
     */
    static show() {
        if (ActionTooltipGameGUI.locked) {
            return 0;
        }
        ActionTooltipGameGUI.controller.isVisible = true;
        return 0;
    }
    /**
     * Hide the action tooltip.
     */
    static hide() {
        if (ActionTooltipGameGUI.locked) {
            return 0;
        }
        ActionTooltipGameGUI.controller.isVisible = false;
        return 0;
    }
    static lock() {
        ActionTooltipGameGUI.locked = true;
        return 0;
    }
    static unlock() {
        ActionTooltipGameGUI.locked = false;
        return 0;
    }
}