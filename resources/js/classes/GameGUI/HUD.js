/**
 * HUD Game GUI
 */
class HUDGameGUI {
    static getClassName() {
        return "HUDGameGUI";
    }
    static initialize() {
        HUDGameGUI.controller = null;
        HUDGameGUI.initialized = true;
        HUDGameGUI.isVisible = false;
        HUDGameGUI.locked = false;
        HUDGameGUI.interfaceMode = InterfaceModeEnum.CHARACTER;
        
        if (Game.debugMode) BABYLON.Tools.Log("Running HUDGameGUI.initialize()");
        HUDGameGUI.generateController();

        HUDGameGUI.actionTooltip = ActionTooltipGameGUI;
        HUDGameGUI.actionTooltip.initialize();
        HUDGameGUI.crosshair = HUDGameGUI.generateCrosshair();

        HUDGameGUI.playerPortrait = PlayerPortraitGameGUI;
        HUDGameGUI.playerPortrait.initialize();
        HUDGameGUI.targetPortrait = TargetPortraitGameGUI;
        HUDGameGUI.targetPortrait.initialize();

        HUDGameGUI.controller.addControl(HUDGameGUI.crosshair);
        HUDGameGUI.controller.addControl(HUDGameGUI.actionTooltip.getController());
        HUDGameGUI.controller.addControl(HUDGameGUI.playerPortrait.getController());
        HUDGameGUI.controller.addControl(HUDGameGUI.targetPortrait.getController());
        
        HUDGameGUI.controller.isVisible = false;
        HUDGameGUI.resize();
        return 0;
    }
    static generateController() {
        HUDGameGUI.controller = new BABYLON.GUI.Container("HUDGameGUI");
        return 0;
    }
    static getController() {
        return HUDGameGUI.controller;
    }
    static resize() {
        HUDGameGUI.controller.width = "100%";
        HUDGameGUI.controller.height = "100%";
        HUDGameGUI.controller.fontSize = GameGUI.fontSize;
        // Crosshair
        // Tooltip
        HUDGameGUI.playerPortrait.resize();
        HUDGameGUI.targetPortrait.resize();
        return 0;
    }
    static show() {
        if (Game.debugMode) BABYLON.Tools.Log("Running HUDGameGUI.show");
        if (HUDGameGUI.locked) {
            return 0;
        }
        HUDGameGUI.controller.isVisible = true;
        HUDGameGUI.isVisible = true;
        HUDGameGUI.showCrosshair();
        HUDGameGUI.playerPortrait.show();
        return 0;
    }
    static hide() {
        if (Game.debugMode) BABYLON.Tools.Log("Running HUDGameGUI.show");
        if (HUDGameGUI.locked) {
            return 0;
        }
        HUDGameGUI.controller.isVisible = false;
        HUDGameGUI.isVisible = false;
        HUDGameGUI.hideCrosshair();
        HUDGameGUI.actionTooltip.hide();
        HUDGameGUI.playerPortrait.hide();
        HUDGameGUI.targetPortrait.hide();
        return 0;
    }
    static generateCrosshair() {
        if (Game.debugMode) BABYLON.Tools.Log("Running HUDGameGUI.generateCrosshair");
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
        if (HUDGameGUI.locked) {
            return 0;
        }
        HUDGameGUI.crosshair.isVisible = true;
        return 0;
    }
    static hideCrosshair() {
        if (HUDGameGUI.locked) {
            return 0;
        }
        HUDGameGUI.crosshair.isVisible = false;
        return 0;
    }
}