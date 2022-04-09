/**
 * Radial Menu Game GUI
 */
 class RadialMenuGameGUI {
    static getClassName() {
        return "RadialMenuGameGUI";
    }
    static initialize() {
        BABYLON.Tools.Log("Running RadialMenuGameGUI.initialize");
        RadialMenuGameGUI.initialized = false;
        RadialMenuGameGUI.controller = null;
        RadialMenuGameGUI.buttons = {};
        RadialMenuGameGUI.visibleButtons = {};
        RadialMenuGameGUI.targetControllerID = null;
        RadialMenuGameGUI.isVisible = false;
        RadialMenuGameGUI.locked = false;
        RadialMenuGameGUI.interfaceMode = InterfaceModeEnum.RADIAL;

        RadialMenuGameGUI.resetDefaultDimensions();
        RadialMenuGameGUI.generateController();
        RadialMenuGameGUI.hide();
        return 0;
    }
    /**
     * A group of circular buttons arranged in a circle.
     * @return {BABYLON.GUI.Container} Circular container of buttons.
     */
    static generateController() {
        BABYLON.Tools.Log("Running RadialMenuGameGUI.generateController");
        if (RadialMenuGameGUI.controller instanceof BABYLON.GUI.Control) {
            RadialMenuGameGUI.controller.dispose();
        }
        RadialMenuGameGUI.controller = new BABYLON.GUI.Ellipse("actionsRadialMenu", 0);
        RadialMenuGameGUI.controller.width = String(GameGUI.renderWidth / 4) + "px";
        RadialMenuGameGUI.controller.height = RadialMenuGameGUI.controller.width;
        RadialMenuGameGUI.controller.background = GameGUI.background;
        RadialMenuGameGUI.controller.color = GameGUI.color;
        RadialMenuGameGUI.controller.alpha = GameGUI.containerAlpha;
        RadialMenuGameGUI.controller.isVisible = false;
        RadialMenuGameGUI.controller.zIndex = 12;
        RadialMenuGameGUI.generateOptions();
        return RadialMenuGameGUI.controller;
    }
    static generateOptions() {
        BABYLON.Tools.Log("Running RadialMenuGameGUI.generateOptions");
        let button = null;
        let skip = false;
        // Close Button
        button = GameGUI.createSimpleButton("closeRadialMenu", "X");
        button.width = "24px";
        button.height = "24px";
        button.onPointerClickObservable.add(function() {
            RadialMenuGameGUI.hide();
        });
        button.isVisible = false;
        button.isEnabled = false;
        RadialMenuGameGUI.closeButton = button;
        RadialMenuGameGUI.controller.addControl(button);

        // Action Buttons
        for (let i in ActionEnum.properties) {
            i = Number.parseInt(i);
            button = GameGUI.createSimpleButton(String(`action${ActionEnum.properties[i].name}Button`), ActionEnum.properties[i].name);
            button.color = GameGUI.color;
            button.background = GameGUI.background;
            RadialMenuGameGUI.buttons[i] = button;
            RadialMenuGameGUI.controller.addControl(button);
            switch(i) {
                case ActionEnum.USE: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionUse(RadialMenuGameGUI.targetControllerID, Game.playerController);
                        RadialMenuGameGUI.hide();
                    });
                    break;
                }
                case ActionEnum.LOOK: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionLook(RadialMenuGameGUI.targetControllerID, Game.playerController);
                        RadialMenuGameGUI.hide();
                    });
                    break;
                }
                case ActionEnum.READ: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionRead(RadialMenuGameGUI.targetControllerID, Game.playerController);
                        RadialMenuGameGUI.hide();
                    });
                    break;
                }
                case ActionEnum.LAY: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionLay(RadialMenuGameGUI.targetControllerID, Game.playerController);
                        RadialMenuGameGUI.hide();
                    });
                    break;
                }
                case ActionEnum.SIT: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionSit(RadialMenuGameGUI.targetControllerID, Game.playerController);
                        RadialMenuGameGUI.hide();
                    });
                    break;
                }
                case ActionEnum.TAKE: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionTake(RadialMenuGameGUI.targetControllerID, Game.playerController);
                        RadialMenuGameGUI.hide();
                    });
                    break;
                }
                case ActionEnum.OPEN: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionOpen(RadialMenuGameGUI.targetControllerID, Game.playerController);
                        RadialMenuGameGUI.hide();
                    });
                    break;
                }
                case ActionEnum.CONSUME: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionConsume(RadialMenuGameGUI.targetControllerID, Game.playerController);
                        RadialMenuGameGUI.hide();
                    });
                    break;
                }
                case ActionEnum.CLOSE: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionClose(RadialMenuGameGUI.targetControllerID, Game.playerController);
                        RadialMenuGameGUI.hide();
                    });
                    break;
                }
                case ActionEnum.TALK: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionTalk(RadialMenuGameGUI.targetControllerID, Game.playerController);
                        RadialMenuGameGUI.hide();
                    });
                    break;
                }
                case ActionEnum.ATTACK: {
                    button.onPointerClickObservable.add(function() {
                        Game.actionAttack(RadialMenuGameGUI.targetControllerID, Game.playerController);
                        RadialMenuGameGUI.hide();
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
        RadialMenuGameGUI.initialized = true;
        return 0;
    }
    static getController() {
        return RadialMenuGameGUI.controller;
    }
    static resetDefaultDimensions() {
        return 0;
    }
    static resize() {
        return 0;
    }
    static set(entityController) {
        if (!(entityController instanceof EntityController)) {
            if (EntityController.has(entityController)) {
                entityController = EntityController.get(entityController);
            }
            else {
                return 2;
            }
        }
        RadialMenuGameGUI.clear();
        RadialMenuGameGUI.targetControllerID = entityController.id;
        if (Object.keys(entityController.availableActions).length == 0) {
            return 1;
        }
        for (let actionID in entityController.availableActions) {
            if (!entityController.hiddenAvailableActions.hasOwnProperty(actionID)) {
                RadialMenuGameGUI.buttons[actionID].isEnabled = true;
                RadialMenuGameGUI.buttons[actionID].isVisible = true;
                RadialMenuGameGUI.visibleButtons[actionID] = RadialMenuGameGUI.buttons[actionID];
            }
        }
        RadialMenuGameGUI.update();
        return 0;
    }
    static setWithTarget() {
        if (Game.playerController.hasTarget()) {
            return RadialMenuGameGUI.set(Game.playerController.getTarget());
        }
        else {
            RadialMenuGameGUI.clear();
        }
        return 0;
    }
    static clear() {
        for (let i in RadialMenuGameGUI.visibleButtons) {
            delete RadialMenuGameGUI.visibleButtons[i];
        }
        for (let i in RadialMenuGameGUI.buttons) {
            RadialMenuGameGUI.buttons[i].isEnabled = false;
            RadialMenuGameGUI.buttons[i].isVisible = false;
        }
        return 0;
    }
    static show() {
        if (RadialMenuGameGUI.locked) {
            return 0;
        }
        for (let i in RadialMenuGameGUI.visibleButtons) {
            RadialMenuGameGUI.visibleButtons[i].color = GameGUI.color;
            RadialMenuGameGUI.visibleButtons[i].background = GameGUI.background;
        }
        RadialControls.reset();
        GameGUI.windowStack.push(RadialMenuGameGUI);
        RadialMenuGameGUI.controller.isVisible = true;
        RadialMenuGameGUI.isVisible = true;
        GameGUI.afterShow();
    }
    static hide() {
        if (RadialMenuGameGUI.locked) {
            return 0;
        }
        RadialMenuGameGUI.controller.isVisible = false;
        RadialMenuGameGUI.isVisible = false;
        GameGUI.windowStack.remove(RadialMenuGameGUI);
        GameGUI.afterHide();
        return 0;
    }
    static update() {
        if (!AbstractController.has(RadialMenuGameGUI.targetControllerID)) {
            return 1;
        }
        let buttonCount = Object.keys(RadialMenuGameGUI.visibleButtons).length;
        if (buttonCount == 0) {
            return 1;
        }
        let currentCount = 0;
        let xPosition = 0;
        let yPosition = 0;
        RadialMenuGameGUI.closeButton._moveToProjectedPosition(new BABYLON.Vector2(xPosition, yPosition));
        for (let i in RadialMenuGameGUI.visibleButtons) {
            xPosition = (RadialMenuGameGUI.controller.widthInPixels/3) * Math.cos(BABYLON.Tools.ToRadians(360/buttonCount*currentCount - 90));
            yPosition = (RadialMenuGameGUI.controller.widthInPixels/3) * Math.sin(BABYLON.Tools.ToRadians(360/buttonCount*currentCount - 90));
            RadialMenuGameGUI.buttons[i].width = "96px";
            RadialMenuGameGUI.buttons[i].height = "24px";
            //RadialMenuGameGUI.buttons[i]._moveToProjectedPosition(new BABYLON.Vector2(xPosition, yPosition));
            RadialMenuGameGUI.buttons[i].left = xPosition;
            RadialMenuGameGUI.buttons[i].top = yPosition;
            currentCount++;
        }
        return 0;
    }
    static unhighlightButtonIndex(index) {
        if (!Object.keys(RadialMenuGameGUI.visibleButtons).hasOwnProperty(index)) {
            return 0;
        }
        let button = RadialMenuGameGUI.visibleButtons[Object.keys(RadialMenuGameGUI.visibleButtons)[index]];
        button.color = GameGUI.color;
        button.background = GameGUI.background;
        return 0;
    }
    static highlightButtonIndex(index) {
        if (!Object.keys(RadialMenuGameGUI.visibleButtons).hasOwnProperty(index)) {
            return 0;
        }
        let button = RadialMenuGameGUI.visibleButtons[Object.keys(RadialMenuGameGUI.visibleButtons)[index]];
        button.color = GameGUI.colorFocused;
        button.background = GameGUI.backgroundFocused;
        return 0;
    }
}