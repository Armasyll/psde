/**
 * HUD Game GUI
 */
class HUDGameGUI {
    static getClassName() {
        return "HUDGameGUI";
    }
    static initialize() {
        HUDGameGUI.controller = new BABYLON.GUI.Container("HUDGameGUI");
        HUDGameGUI.width
        HUDGameGUI.actionTooltip = null;
        HUDGameGUI.actionTooltipLocked = false;
        HUDGameGUI.radialMenu = null;
        HUDGameGUI.radialMenuButtons = {};
        HUDGameGUI.radialTargetControllerID = null;
        HUDGameGUI.initialized = true;
        HUDGameGUI.locked = false;

        if (Game.debugMode) BABYLON.Tools.Log("Running HUDGameGUI.initialize()");
        HUDGameGUI.crosshair = HUDGameGUI.generateCrosshair();
        HUDGameGUI.actionTooltip = HUDGameGUI.generateTargetActionTooltip();
        HUDGameGUI.radialMenu = HUDGameGUI.generateActionsRadialMenu();

        HUDGameGUI.playerPortrait = PlayerPortraitGameGUI;
        HUDGameGUI.playerPortrait.initialize();
        HUDGameGUI.targetPortrait = TargetPortraitGameGUI;
        HUDGameGUI.targetPortrait.initialize();

        HUDGameGUI.controller.addControl(HUDGameGUI.crosshair);
        HUDGameGUI.controller.addControl(HUDGameGUI.actionTooltip);
        HUDGameGUI.controller.addControl(HUDGameGUI.radialMenu);
        HUDGameGUI.controller.addControl(HUDGameGUI.playerPortrait.getController());
        HUDGameGUI.controller.addControl(HUDGameGUI.targetPortrait.getController());
        
        HUDGameGUI.controller.isVisible = false;
        HUDGameGUI.resize();
        return 0;
    }
    static generateController() {
        return 0;
    }
    static getController() {
        return HUDGameGUI.controller;
    }
    static resize() {
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
        HUDGameGUI.showCrosshair();
        HUDGameGUI.playerPortrait.show();
        Game.setInterfaceMode(InterfaceModeEnum.CHARACTER);
        return 0;
    }
    static hide() {
        if (Game.debugMode) BABYLON.Tools.Log("Running HUDGameGUI.show");
        if (HUDGameGUI.locked) {
            return 0;
        }
        HUDGameGUI.controller.isVisible = false;
        HUDGameGUI.hideCrosshair();
        HUDGameGUI.hideActionTooltip();
        HUDGameGUI.hideRadialMenu();
        HUDGameGUI.playerPortrait.hide();
        HUDGameGUI.targetPortrait.hide();
        return 0;
    }
    static isVisible() {
        return HUDGameGUI.controller.isVisible;
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
    static generateTargetActionTooltip() {
        if (Game.debugMode) BABYLON.Tools.Log("Running HUDGameGUI.generateTargetActionTooltip");
        let tooltip = GameGUI.createRectangle("targetActionTooltip");
            tooltip.width = 0.125;
            tooltip.height = 0.075;
            tooltip.top = "3.75%";
            tooltip.left = "6.25%";
            tooltip.alpha = GameGUI.alpha;
            tooltip.isVertical = false;
            tooltip.background = GameGUI.focusedBackground;
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
        HUDGameGUI.actionTooltip.children[0].text = _string;
        return 0;
    }
    /**
     * Sets the action tooltip's top right text.
     * @param {String} _string Top right text.
     */
    static setActionTooltipString(_string = "Use") {
        if (Game.debugMode) BABYLON.Tools.Log("Running HUDGameGUI.setActionTooltipString");
        if (typeof _string != "string") {
            _string = "Use";
        }
        else {
            _string = _string.capitalize();
        }
        HUDGameGUI.actionTooltip.children[1].text = _string;
        return 0;
    }
    /**
     * Sets the action tooltip's bottom text. Not used, I think. :D
     * @param {String} _string Bottom text.
     */
    static setActionTooltipTarget(_string = "") {
        if (typeof _string != "string") {
            _string = "";
        }
        if (Game.debugMode) BABYLON.Tools.Log("Running HUDGameGUI.setActionTooltipTarget");
        HUDGameGUI.actionTooltip.children[2].text = _string;
        return 0;
    }
    /**
     * Sets the action tooltip's top right and bottom text.
     * @param {String} _action Top right text.
     * @param {String} _target Bottom text.
     */
    static setActionTooltip(_action, _target = "") {
        HUDGameGUI.setActionTooltipString(_action);
        HUDGameGUI.setActionTooltipTarget(_target);
        return 0;
    }
    /**
     * Show the action tooltip.
     */
    static showActionTooltip() {
        if (HUDGameGUI.locked) {
            return 0;
        }
        if (!HUDGameGUI.actionTooltipLocked) {
            HUDGameGUI.actionTooltip.isVisible = true;
        }
        return 0;
    }
    /**
     * Hide the action tooltip.
     */
    static hideActionTooltip() {
        if (HUDGameGUI.locked) {
            return 0;
        }
        if (!HUDGameGUI.actionTooltipLocked) {
            HUDGameGUI.actionTooltip.isVisible = false;
        }
        return 0;
    }
    static lockActionTooltip() {
        HUDGameGUI.actionTooltipLocked = true;
        return 0;
    }
    static unlockActionTooltip() {
        HUDGameGUI.actionTooltipLocked = false;
        return 0;
    }
    /**
     * A group of circular buttons arranged in a circle.
     * @return {BABYLON.GUI.Container} Circular container of buttons.
     */
    static generateActionsRadialMenu() {
        if (Game.debugMode) BABYLON.Tools.Log("Running HUDGameGUI.generateActionsRadialMenu");
        if (HUDGameGUI.radialMenu instanceof BABYLON.GUI.Button) {
            HUDGameGUI.radialMenu.dispose();
        }
        HUDGameGUI.radialMenu = new BABYLON.GUI.Ellipse("actionsRadialMenu", 0);
        HUDGameGUI.radialMenu.width = String(Game.renderWidth / 4) + "px";
        HUDGameGUI.radialMenu.height = HUDGameGUI.radialMenu.width;
        HUDGameGUI.radialMenu.background = GameGUI.background;
        HUDGameGUI.radialMenu.color = GameGUI.color;
        HUDGameGUI.radialMenu.alpha = GameGUI.containerAlpha;
        HUDGameGUI.radialMenu.isVisible = false;
        HUDGameGUI.radialMenu.zIndex = 12;
        HUDGameGUI.generateRadialMenuButtons();
        return HUDGameGUI.radialMenu;
    }
    static generateRadialMenuButtons() {
        let button = null;
        let skip = false;
        // Close Button
        button = GameGUI.createSimpleButton("closeRadialMenu", "X");
        button.width = "24px";
        button.height = "24px";
        button.onPointerClickObservable.add(function() {
            HUDGameGUI.hideRadialMenu();
        });
        button.isVisible = false;
        button.isEnabled = false;
        HUDGameGUI.radialMenuCloseButton = button;
        HUDGameGUI.radialMenu.addControl(button);

        // Action Buttons
        for (let i in ActionEnum.properties) {
            i = Number.parseInt(i);
            button = GameGUI.createSimpleButton(String(`action${ActionEnum.properties[i].name}Button`), ActionEnum.properties[i].name);
            HUDGameGUI.radialMenuButtons[i] = button;
            HUDGameGUI.radialMenu.addControl(button);
            switch(i) {
                case ActionEnum.USE: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionUse(HUDGameGUI.radialTargetControllerID, Game.playerController);
                        HUDGameGUI.hideRadialMenu();
                    });
                    break;
                }
                case ActionEnum.LOOK: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionLook(HUDGameGUI.radialTargetControllerID, Game.playerController);
                        HUDGameGUI.hideRadialMenu();
                    });
                    break;
                }
                case ActionEnum.READ: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionRead(HUDGameGUI.radialTargetControllerID, Game.playerController);
                        HUDGameGUI.hideRadialMenu();
                    });
                    break;
                }
                case ActionEnum.LAY: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionLay(HUDGameGUI.radialTargetControllerID, Game.playerController);
                        HUDGameGUI.hideRadialMenu();
                    });
                    break;
                }
                case ActionEnum.SIT: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionSit(HUDGameGUI.radialTargetControllerID, Game.playerController);
                        HUDGameGUI.hideRadialMenu();
                    });
                    break;
                }
                case ActionEnum.TAKE: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionTake(HUDGameGUI.radialTargetControllerID, Game.playerController);
                        HUDGameGUI.hideRadialMenu();
                    });
                    break;
                }
                case ActionEnum.OPEN: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionOpen(HUDGameGUI.radialTargetControllerID, Game.playerController);
                        HUDGameGUI.hideRadialMenu();
                    });
                    break;
                }
                case ActionEnum.CONSUME: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionConsume(HUDGameGUI.radialTargetControllerID, Game.playerController);
                        HUDGameGUI.hideRadialMenu();
                    });
                    break;
                }
                case ActionEnum.CLOSE: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionClose(HUDGameGUI.radialTargetControllerID, Game.playerController);
                        HUDGameGUI.hideRadialMenu();
                    });
                    break;
                }
                case ActionEnum.TALK: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionTalk(HUDGameGUI.radialTargetControllerID, Game.playerController);
                        HUDGameGUI.hideRadialMenu();
                    });
                    break;
                }
                case ActionEnum.ATTACK: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionAttack(HUDGameGUI.radialTargetControllerID, Game.playerController);
                        HUDGameGUI.hideRadialMenu();
                    });
                    break;
                }
                default: {
                    skip = true;
                }
            }
            if (skip) {
                skip = false;
            }
            else {
                button.isVisible = false;
                button.isEnabled = false;
            }
        }
        return 0;
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
        HUDGameGUI.clearRadialMenu();
        HUDGameGUI.radialTargetControllerID = entityController.id;
        if (Object.keys(entityController.availableActions).length == 0) {
            return 1;
        }
        for (let actionID in entityController.availableActions) {
            HUDGameGUI.radialMenuButtons[actionID].isEnabled = true;
            HUDGameGUI.radialMenuButtons[actionID].isVisible = true;
        }
        HUDGameGUI.updateRadialMenu();
        return 0;
    }
    static populateRadialMenuWithTarget() {
        if (Game.playerController.hasTarget()) {
            return HUDGameGUI.populateRadialMenuWith(Game.playerController.getTarget());
        }
        else {
            HUDGameGUI.clearRadialMenu();
        }
        return 0;
    }
    static clearRadialMenu() {
        for (let i in HUDGameGUI.radialMenuButtons) {
            HUDGameGUI.radialMenuButtons[i].isEnabled = false;
            HUDGameGUI.radialMenuButtons[i].isVisible = false;
        }
        return 0;
    }
    static showRadialMenu(updateChild = true) {
        if (HUDGameGUI.locked) {
            return 1;
        }
        if (updateChild) {
            HUDGameGUI.hideActionTooltip();
            HUDGameGUI.lockActionTooltip();
        }
        HUDGameGUI.radialMenu.isVisible = true;
        return 0;
    }
    static hideRadialMenu(updateChild = true) {
        if (HUDGameGUI.locked) {
            return 1;
        }
        HUDGameGUI.radialMenu.isVisible = false;
        if (updateChild) {
            HUDGameGUI.unlockActionTooltip();
            HUDGameGUI.showActionTooltip();
        }
        return 0;
    }
    static updateRadialMenu() {
        let buttonCount = Object.keys(AbstractController.get(HUDGameGUI.radialTargetControllerID).availableActions).length;
        if (buttonCount == 0) {
            return 1;
        }
        let currentCount = 0;
        let xPosition = 0;
        let yPosition = 0;
        HUDGameGUI.radialMenuCloseButton._moveToProjectedPosition(new BABYLON.Vector2(xPosition, yPosition));
        for (let i in HUDGameGUI.radialMenuButtons) {
            if (!HUDGameGUI.radialMenuButtons[i].isVisible) {
                continue;
            }
            xPosition = (HUDGameGUI.radialMenu.widthInPixels/3) * Math.cos(BABYLON.Tools.ToRadians(360/buttonCount*currentCount - 90));
            yPosition = (HUDGameGUI.radialMenu.widthInPixels/3) * Math.sin(BABYLON.Tools.ToRadians(360/buttonCount*currentCount - 90));
            HUDGameGUI.radialMenuButtons[i].width = "96px";
            HUDGameGUI.radialMenuButtons[i].height = "24px";
            //HUDGameGUI.radialMenuButtons[i]._moveToProjectedPosition(new BABYLON.Vector2(xPosition, yPosition));
            HUDGameGUI.radialMenuButtons[i].left = xPosition;
            HUDGameGUI.radialMenuButtons[i].top = yPosition;
            currentCount++;
        }
        return 0;
    }
}